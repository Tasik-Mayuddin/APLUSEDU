from django.http.response import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import ProfileSummary, SubjectAndLevel
from django.contrib.auth.models import User
from .forms import AddSubjectForm, AddDayForm
from collections import defaultdict


# Create your views here.
def welcome(response):
    if response.user.is_authenticated:
        if response.user.account.user_role == 'Tutor':
            return HttpResponseRedirect('/tutor_dashboard/')
    return render(response, 'main/welcome.html', {})

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
                filled_snl_form = filled_form.cleaned_data
                form_subject = filled_snl_form['subject'] # extract subject
                form_levels = filled_snl_form['levels'] # extract levels
                for indi_level in form_levels: # loops through levels
                    try:
                        sal = SubjectAndLevel.objects.get(subject=form_subject, level=indi_level) # check of instance of SubjectAndLevel exists
                    except SubjectAndLevel.DoesNotExist:
                        sal = SubjectAndLevel.objects.create(subject=form_subject, level=indi_level) # if it doesnt exist, create new

                    sal.users.add(response.user) # adds the user (tutor) into the instance
                    sal.save()
                
                return HttpResponseRedirect('/tutor_subjects/')       

        
        tsl_list = response.user.subjectandlevel_set.all().order_by('subject', 'level')
        
        tsl_output = defaultdict(list)

        for x in tsl_list:
            tsl_output[x.subject].append(x.level)
        tsl_output = dict(tsl_output)

        form = AddSubjectForm()
        
        return render(response, 'main/tutor_subjects.html', {"tsl_output":tsl_output, "form":form})

# For page displaying tutor's available day and times

def tTime(response):
    form = AddDayForm()
    return render(response, 'main/tutor_timetable.html', {"form":form})


    