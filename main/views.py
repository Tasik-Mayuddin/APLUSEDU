from django.http.response import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.http import HttpResponse


# Create your views here.
def welcome(response):
    return render(response, 'main/welcome.html', {})

def tDash(response):
    if response.user.account.user_role == "Tutor":
        return render(response, 'main/tutor_dashboard.html')