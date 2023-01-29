from django.http.response import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import ProfileSummary


# Create your views here.
def welcome(response):
    if response.user.account.user_role == 'Tutor':
        return HttpResponseRedirect('/tutor_dashboard/')
    return render(response, 'main/welcome.html', {})

def tDash(response):
    if response.user.account.user_role == "Tutor":
        return render(response, 'main/tutor_dashboard.html')

def tProf(response):


    if response.user.account.user_role == "Tutor":
        if response.method == "POST":
            if response.POST.get("edit-summary"):
                new_summary = response.POST.get("new-summary")
                profSum = ProfileSummary.objects.create(author=response.user, summary_text=new_summary)
                profSumOutput = profSum.summary_text
                HttpResponseRedirect('/tutor_dashboard/')

        
        try:
            profSum = ProfileSummary.objects.get(author=response.user)
        except ProfileSummary.DoesNotExist:
            profSumOutput = "No profile summary"
        
        return render(response, 'main/tutor_profile.html', {"current_user":response.user, "profile_summary":profSumOutput})