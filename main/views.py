from django.http.response import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from .models import TutorProfile, SubjectAndLevel, DayAndTime, Subject, Level
from parent.models import BookedSlot
from django.contrib.auth.models import User
from .forms import AddSubjectForm, AddDayForm
from collections import defaultdict
from APLUSEDU.utils import clash_check
from rest_framework.authtoken.models import Token


# Create your views here.
def welcome(request):
    if request.user.is_authenticated:
        # token = Token.objects.get_or_create(user=request.user)
        # print(token)
        # return HttpResponseRedirect('/dashboard')
        if request.user.account.user_role == 'Tutor':
            return HttpResponseRedirect('/profile')
        elif request.user.account.user_role == 'Parent':
            return HttpResponseRedirect('/children')
    return HttpResponseRedirect('/login/')

# # Url for React to obtain token
# def getToken(request):
#     if request.user.is_authenticated:
#         token = Token.objects.get_or_create(user=request.user)
#         print(token[0])
#         res = HttpResponse()
#         res.set_cookie('token', token[0])
#         return res


# For page displaying tutor's dashboard

def tDash(request):
    if request.user.account.user_role == "Tutor":
        # print(Token.objects.get_or_create(user=request.user))
        return render(request, 'main/tutor_dashboard.html')

# For page displaying tutor's profile

def tProf(request):
    if request.user.account.user_role == "Tutor":
        if request.method == "POST":
            if request.POST.get("edit-summary"):
                new_summary = request.POST.get("new-summary")
                profSum = TutorProfile.objects.create(author=request.user, summary=new_summary)
                profSumOutput = profSum.summary
                return HttpResponseRedirect('/tutor_profile/')
        
        try:
            profSumOutput = TutorProfile.objects.get(author=request.user).summary
        except TutorProfile.DoesNotExist:
            profSumOutput = "No profile summary"
        
        return render(request, 'main/tutor_profile.html', {"current_user":request.user, "profile_summary":profSumOutput})

# For page displaying tutor's subject and levels

def tSubj(request):
    if request.user.account.user_role == "Tutor":
        if request.method == "POST":
            filled_form = AddSubjectForm(request.POST) # fills an instance of the form with POST data
                     
            if filled_form.is_valid(): 
                filled_form_clean = filled_form.cleaned_data
                form_subject = filled_form_clean['subject'] # extract subject
                form_levels = filled_form_clean['levels'] # extract levels
                for indi_level in form_levels: # loops through levels
                    sal, created = SubjectAndLevel.objects.get_or_create(
                        subject = Subject.objects.get(name=form_subject),
                        level = Level.objects.get(name=indi_level)
                        )
                    sal.tutors.add(request.user) # adds the user (tutor) into the instance
                    sal.save()    
                return HttpResponseRedirect('/tutor_subjects/')       

        
        tsl_list = request.user.subjectandlevel_set.all().order_by('subject', 'level') # tsl - teacher subject level
        
        tsl_output = defaultdict(list)

        for x in tsl_list:
            tsl_output[x.subject].append(x.level)
        tsl_output = dict(tsl_output)

        form = AddSubjectForm()
        
        return render(request, 'main/tutor_subjects.html', {"tsl_output":tsl_output, "form":form})

# For page displaying tutor's available day and times

def tTime(request):

    if request.user.account.user_role == 'Tutor':

        if request.method == "POST":
            filled_form = AddDayForm(request.POST)
            if filled_form.is_valid():
                filled_form_clean = filled_form.cleaned_data
                form_day = filled_form_clean['day']
                form_start_time = filled_form_clean['start_time']
                form_end_time = filled_form_clean['end_time']
                
                dnt_query = request.user.dayandtime_set.filter(day=form_day)
                intercept = False
                if dnt_query.exists():                   
                    for x in dnt_query:
                        if clash_check(form_start_time, form_end_time, x.start_time, x.end_time):
                            intercept = True
                            break
                if not intercept:    
                    dnt = DayAndTime.objects.create(day=form_day, start_time=form_start_time, end_time=form_end_time, tutor=request.user)
                
                

        tdt_list = request.user.dayandtime_set.all() # tdt - teacher day time

        tdt_output = defaultdict(list)
        for x in tdt_list:
            tdt_output[x.day].append(str(x.start_time)+" - "+str(x.end_time))
        tdt_output = dict(tdt_output)

        form = AddDayForm()

        dnt_query = request.user.dayandtime_set.all()
        bslot_output = BookedSlot.objects.none() # create an empty query set
        for dnt in dnt_query:
            bslot_output = bslot_output | dnt.bookedslot_set.filter(status="approved")

        return render(request, 'main/tutor_timetable.html', {"tdt_output":tdt_output, "form":form, "bslot_output":bslot_output})

def tJob(request):
    if request.user.account.user_role == 'Tutor':
        if request.method == "POST":
            bslot_extract = BookedSlot.objects.get(id=request.POST.get("bookedslot_id"))
            if request.POST.get("accept"):
                if bslot_extract.day_and_time.tutor == request.user:
                    bslot_query = bslot_extract.day_and_time.bookedslot_set.filter(status="approved")
                    intercept = False
                    for x in bslot_query:
                        if clash_check(bslot_extract.start_time, bslot_extract.end_time, x.start_time, x.end_time):
                            intercept = True
                            break   
                    if not intercept:                 
                        bslot_extract.status = "approved"
                        bslot_extract.save()
            elif request.POST.get("decline"):
                if bslot_extract.day_and_time.tutor == request.user:
                    bslot_extract.delete()

            return HttpResponseRedirect("/job_requests/")


        dnt_query = request.user.dayandtime_set.all()
        jr_output = BookedSlot.objects.none() # create an empty query set
        for dnt in dnt_query:
            jr_output = jr_output | dnt.bookedslot_set.filter(status="pending")
        
        return render(request, 'main/tutor_job_requests.html', {"jr_output":jr_output})

    

    

    