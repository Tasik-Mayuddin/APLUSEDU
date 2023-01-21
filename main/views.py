from django.http.response import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.http import HttpResponse


# Create your views here.
def welcome(response):
    return render(response, 'main/welcome.html', {})