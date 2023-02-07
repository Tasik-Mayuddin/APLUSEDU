from django.shortcuts import render
from .forms import AddStudentForm
from .models import Student, Subject
from django.http.response import HttpResponseRedirect
from main.models import SubjectAndLevel, BookedSlot, DayAndTime
from main.forms import AddDayForm
from django.contrib.auth.models import User


# Create your views here.

# Parent dashboard

def pDash(response):
    if response.user.account.user_role == "Parent":
        return render(response, 'parent/parent_dashboard.html')

# Parent's students

def pStud(response):
    if response.user.account.user_role == "Parent":
        
        if response.method == "POST":
            filled_form = AddStudentForm(response.POST)
            if filled_form.is_valid():
                filled_form_clean = filled_form.cleaned_data
                form_name = filled_form_clean['name']
                form_level = filled_form_clean['level']
                form_subjects = filled_form_clean['subjects']
                if not response.user.student_set.filter(name=form_name).exists(): # prevents duplicates
                    new_student = Student.objects.create(name=form_name, level=form_level, parent=response.user)
                    for x in form_subjects: 
                        Subject.objects.create(subject=x, student=new_student)

        ps_list = response.user.student_set.all()
        form = AddStudentForm()

        return render(response, 'parent/parent_students.html', {"ps_list":ps_list, "form":form})

def pStudID(response, id):
    student_validate = response.user.student_set.filter(id=id)
    
    if student_validate.exists():
        student = response.user.student_set.get(id=id)

        # to delete pending/verified booked slots
        if response.method == "POST":
            if response.POST.get("delete"):
                bslot_del = student.bookedslot_set.get(id=response.POST.get("booked_slot_id")) # ensures that the booked slot belongs to student, retrieves id from hidden input
                bslot_del.delete()
                return HttpResponseRedirect('/student/'+str(id))

        bslot_list = student.bookedslot_set.all()

        return render(response, 'parent/student.html', {"student":student, "bslot_list":bslot_list})   
    else:
        return HttpResponseRedirect('/parent_students/')

def pStudTut(response, id):
    student_validate = response.user.student_set.filter(id=id) # ensures the student belongs to the user (parent)
    if student_validate.exists():
        student = response.user.student_set.get(id=id)
        if response.method == "POST":
            filled_form = AddDayForm(response.POST)
            if filled_form.is_valid():
                filled_form_clean = filled_form.cleaned_data
                form_day = filled_form_clean['day']
                form_start_time = filled_form_clean['start_time']
                form_end_time = filled_form_clean['end_time']

                # identify correct DayAndTime instance
                dnt_query = User.objects.get(id=response.POST.get("tutor_id")).dayandtime_set.filter( 
                    day=form_day, 
                    start_time__lte=form_start_time, 
                    end_time__gte=form_end_time,
                ) 
                if dnt_query.exists():
                    dnt_extracted = dnt_query.first() # since it will only return a single object, the first() is taken
                    print("dnt extraction successs")

                    # perform a check to ensure that the booked slot does not clash with existing approved booked slots
                    intercept = False
                    print(intercept)
                    for x in dnt_extracted.bookedslot_set.filter(status="approved"):
                        if (form_start_time > x.start_time and form_start_time < x.end_time) or (form_end_time > x.start_time and form_end_time < x.end_time):
                            intercept = True
                            print("booked slot intercepts (line78)")
                            break
                    print(intercept)
                    # if there are no clashes, a bookedslot with the status "pending" is created
                    if not intercept:
                        BookedSlot.objects.create(
                            day=form_day, 
                            start_time=form_start_time, 
                            end_time=form_end_time, 
                            subject_and_level = SubjectAndLevel.objects.get(subject=response.POST.get("subject"), level=student.level), # obtains subject name from hidden input from html button
                            time_slot = dnt_extracted,
                            student = student,
                            status = "pending",
                            )
                        return HttpResponseRedirect("/student/"+str(id))
                    else:
                        print("please do not clash with other booked slots") 
                
        tutor_list = {}
        for x in student.subject_set.all():
            try:
                subject = x.subject
                tutor_list[subject] = SubjectAndLevel.objects.get(subject=subject, level=student.level).users.all()
            except SubjectAndLevel.DoesNotExist:
                continue

        form = AddDayForm()

        return render(response, 'parent/tutor_list.html', {"tutor_list":tutor_list, "form":form})   
    else:
        return HttpResponseRedirect('/parent_students/')
