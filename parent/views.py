from django.shortcuts import render
from .forms import AddStudentForm
from .models import Student, Subject
from django.http.response import HttpResponseRedirect
from main.models import SubjectAndLevel, BookedSlot, DayAndTime
from main.forms import AddDayForm
from django.contrib.auth.models import User
from APLUSEDU.utils import clash_check
from chat.models import ChatRoom, Message
from APLUSEDU.constants import DAY_CHOICES

# Create your views here.

# Parent dashboard

def pDash(request):
    if request.user.account.user_role == "Parent":
        return render(request, 'parent/parent_dashboard.html')

# Parent's students

def pStud(request):
    if request.user.account.user_role == "Parent":
        
        if request.method == "POST":
            filled_form = AddStudentForm(request.POST)
            if filled_form.is_valid():
                filled_form_clean = filled_form.cleaned_data
                form_name = filled_form_clean['name']
                form_level = filled_form_clean['level']
                form_subjects = filled_form_clean['subjects']
                if not request.user.student_set.filter(name=form_name).exists(): # prevents duplicates
                    new_student = Student.objects.create(name=form_name, level=form_level, parent=request.user)
                    for x in form_subjects: 
                        Subject.objects.create(subject=x, student=new_student)

        ps_list = request.user.student_set.all()
        form = AddStudentForm()

        return render(request, 'parent/parent_students.html', {"ps_list":ps_list, "form":form})

def pStudID(request, id):
    student_validate = request.user.student_set.filter(id=id)
    
    if student_validate.exists():
        student = request.user.student_set.get(id=id)

        # to delete pending/verified booked slots
        if request.method == "POST":
            if request.POST.get("delete"):
                bslot_del = student.bookedslot_set.get(id=request.POST.get("booked_slot_id")) # ensures that the booked slot belongs to student, retrieves id from hidden input
                bslot_del.delete()
                return HttpResponseRedirect('/student/'+str(id))

        bslot_list = student.bookedslot_set.all()

        return render(request, 'parent/student.html', {"student":student, "bslot_list":bslot_list})   
    else:
        return HttpResponseRedirect('/parent_students/')

def pStudTut(request, id):
    student_validate = request.user.student_set.filter(id=id) # ensures the student belongs to the user (parent)
    if student_validate.exists():
        student = request.user.student_set.get(id=id)
        if request.method == "POST":
            filled_form = AddDayForm(request.POST)
            if filled_form.is_valid():
                filled_form_clean = filled_form.cleaned_data
                form_day = filled_form_clean['day']
                form_start_time = filled_form_clean['start_time']
                form_end_time = filled_form_clean['end_time']

                # identify correct DayAndTime instance
                tutor = User.objects.get(id=request.POST.get("tutor_id"))
                dnt_query = tutor.dayandtime_set.filter( 
                    day=form_day, 
                    start_time__lte=form_start_time, 
                    end_time__gte=form_end_time,
                ) 
                if dnt_query.exists():
                    dnt_extracted = dnt_query.first() # since it will only return a single object, the first() is taken

                    # perform a check to ensure that the booked slot does not clash with existing approved booked slots
                    intercept = False
                    for x in dnt_extracted.bookedslot_set.filter(status="approved"):
                        if clash_check(form_start_time, form_end_time, x.start_time, x.end_time):
                            intercept = True
                            break
                    # if there are no clashes, a bookedslot with the status "pending" is created
                    if not intercept:
                        subject_and_level = SubjectAndLevel.objects.get(subject=request.POST.get("subject"), level=student.level)
                        BookedSlot.objects.create(
                            day=form_day, 
                            start_time=form_start_time, 
                            end_time=form_end_time, 
                            subject_and_level = subject_and_level, # obtains subject name from hidden input from html button
                            time_slot = dnt_extracted,
                            student = student,
                            status = "pending",
                            )
                        
                        # create chatroom between tutor and parent upon request of tutor
                        try:
                            chatroom = ChatRoom.objects.get(tutor = tutor, parent = request.user)
                        except ChatRoom.DoesNotExist:
                            chatroom = ChatRoom.objects.create(tutor = tutor, parent = request.user)
                            chatroom.save()
                        # send initial tutor request message
                        req_msg = f"Hi Mr/Mrs {tutor.username}, I would like to request \
                            {subject_and_level.get_level_display()} {subject_and_level.get_subject_display()} \
                            for my child, {student.name}, for {dict(DAY_CHOICES)[form_day]}: {form_start_time} - {form_end_time}"
                        Message.objects.create(
                            author = request.user,
                            content = req_msg,
                            chat_room = chatroom
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
        
        return render(request, 'parent/tutor_list.html', {"tutor_list":tutor_list, "form":form})   
    else:
        return HttpResponseRedirect('/parent_students/')
