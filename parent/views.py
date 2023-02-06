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


        return render(response, 'parent/student.html', {"student":student})   
    else:
        return HttpResponseRedirect('/parent_students/')

def pStudTut(response, id):
    student_validate = response.user.student_set.filter(id=id)
    if student_validate.exists():
        student = response.user.student_set.get(id=id)
        if response.method == "POST":
            filled_form = AddDayForm(response.POST)
            if filled_form.is_valid():
                filled_form_clean = filled_form.cleaned_data
                form_day = filled_form_clean['day']
                form_start_time = filled_form_clean['start_time']
                form_end_time = filled_form_clean['end_time']

                dnt_query = User.objects.get(id=response.POST.get("tutor_id")).dayandtime_set.filter( # identify correct DayAndTime instance
                    day=form_day, 
                    start_time__lte=form_start_time, 
                    end_time__gte=form_end_time,
                    ) 
                if dnt_query.exists():
                    BookedSlot.objects.create(
                        day=form_day, 
                        start_time=form_start_time, 
                        end_time=form_end_time, 
                        subject_and_level = SubjectAndLevel.objects.get(subject=response.POST.get("subject"), level=student.level), # method of obtaining the subject, info i tied to the html button
                        time_slot = dnt_query.first(),
                        ) 
                
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
