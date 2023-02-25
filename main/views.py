from django.http.response import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from .models import ProfileSummary, SubjectAndLevel, DayAndTime, BookedSlot
from django.contrib.auth.models import User
from .forms import AddSubjectForm, AddDayForm
from collections import defaultdict
from APLUSEDU.utils import clash_check
from rest_framework.authtoken.models import Token


# Create your views here.
def welcome(response):
    if response.user.is_authenticated:
        token = Token.objects.get_or_create(user=response.user)
        if response.user.account.user_role == 'Tutor':
            return HttpResponseRedirect('/tutor_dashboard/')
        elif response.user.account.user_role == 'Parent':
            return HttpResponseRedirect('/parent_dashboard/')
    return render(response, 'main/welcome.html', {})

# # Url for React to obtain token
# def getToken(response):
#     if response.user.is_authenticated:
#         token = Token.objects.get_or_create(user=response.user)
#         print(token[0])
#         res = HttpResponse()
#         res.set_cookie('token', token[0])
#         return res


# For page displaying tutor's dashboard

def tDash(response):
    if response.user.account.user_role == "Tutor":
        return render(response, 'main/tutor_dashboard.html')

# For page displaying tutor's profile

def tProf(response):
    if response.user.account.user_role == "Tutor":
        if response.method == "POST":
            if response.POST.get("edit-summary"):
                new_summary = response.POST.get("new-summary")
                profSum = ProfileSummary.objects.create(author=response.user, summary_text=new_summary)
                profSumOutput = profSum.summary_text
                return HttpResponseRedirect('/tutor_profile/')
        
        try:
            profSumOutput = ProfileSummary.objects.get(author=response.user).summary_text
        except ProfileSummary.DoesNotExist:
            profSumOutput = "No profile summary"
        
        return render(response, 'main/tutor_profile.html', {"current_user":response.user, "profile_summary":profSumOutput})

# For page displaying tutor's subject and levels

def tSubj(response):
    if response.user.account.user_role == "Tutor":

        if response.method == "POST":
            filled_form = AddSubjectForm(response.POST) # fills an instance of the form with POST data
            
            if filled_form.is_valid(): 
                filled_form_clean = filled_form.cleaned_data
                form_subject = filled_form_clean['subject'] # extract subject
                form_levels = filled_form_clean['levels'] # extract levels
                for indi_level in form_levels: # loops through levels
                    try:
                        sal = SubjectAndLevel.objects.get(subject=form_subject, level=indi_level) # check of instance of SubjectAndLevel exists
                    except SubjectAndLevel.DoesNotExist:
                        sal = SubjectAndLevel.objects.create(subject=form_subject, level=indi_level) # if it doesnt exist, create new

                    sal.users.add(response.user) # adds the user (tutor) into the instance
                    sal.save()
                
                return HttpResponseRedirect('/tutor_subjects/')       

        
        tsl_list = response.user.subjectandlevel_set.all().order_by('subject', 'level') # tsl - teacher subject level
        
        tsl_output = defaultdict(list)

        for x in tsl_list:
            tsl_output[x.subject].append(x.level)
        tsl_output = dict(tsl_output)

        form = AddSubjectForm()
        
        return render(response, 'main/tutor_subjects.html', {"tsl_output":tsl_output, "form":form})

# For page displaying tutor's available day and times

def tTime(response):

    if response.user.account.user_role == 'Tutor':

        if response.method == "POST":
            filled_form = AddDayForm(response.POST)
            if filled_form.is_valid():
                filled_form_clean = filled_form.cleaned_data
                form_day = filled_form_clean['day']
                form_start_time = filled_form_clean['start_time']
                form_end_time = filled_form_clean['end_time']
                
                dnt_query = response.user.dayandtime_set.filter(day=form_day)
                intercept = False
                if dnt_query.exists():                   
                    for x in dnt_query:
                        if clash_check(form_start_time, form_end_time, x.start_time, x.end_time):
                            intercept = True
                            break
                if not intercept:    
                    dnt = DayAndTime.objects.create(day=form_day, start_time=form_start_time, end_time=form_end_time, user=response.user)
                
                

        tdt_list = response.user.dayandtime_set.all() # tdt - teacher day time

        tdt_output = defaultdict(list)
        for x in tdt_list:
            tdt_output[x.day].append(str(x.start_time)+" - "+str(x.end_time))
        tdt_output = dict(tdt_output)

        form = AddDayForm()

        dnt_query = response.user.dayandtime_set.all()
        bslot_output = BookedSlot.objects.none() # create an empty query set
        for dnt in dnt_query:
            bslot_output = bslot_output | dnt.bookedslot_set.filter(status="approved")

        return render(response, 'main/tutor_timetable.html', {"tdt_output":tdt_output, "form":form, "bslot_output":bslot_output})

def tJob(response):
    if response.user.account.user_role == 'Tutor':
        if response.method == "POST":
            bslot_extract = BookedSlot.objects.get(id=response.POST.get("bookedslot_id"))
            if response.POST.get("accept"):
                if bslot_extract.time_slot.user == response.user:
                    bslot_query = bslot_extract.time_slot.bookedslot_set.filter(status="approved")
                    intercept = False
                    for x in bslot_query:
                        if clash_check(bslot_extract.start_time, bslot_extract.end_time, x.start_time, x.end_time):
                            intercept = True
                            break   
                    if not intercept:                 
                        bslot_extract.status = "approved"
                        bslot_extract.save()
            elif response.POST.get("decline"):
                if bslot_extract.time_slot.user == response.user:
                    bslot_extract.delete()

            return HttpResponseRedirect("/job_requests/")


        dnt_query = response.user.dayandtime_set.all()
        jr_output = BookedSlot.objects.none() # create an empty query set
        for dnt in dnt_query:
            jr_output = jr_output | dnt.bookedslot_set.filter(status="pending")
        
        return render(response, 'main/tutor_job_requests.html', {"jr_output":jr_output})

    

    

    