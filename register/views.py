from django.http.response import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import RegisterForm
from django.contrib.auth import logout
from .models import Account
from django.contrib.auth.models import User

# Create your views here.
def login(response):

    return render(response, 'registration/login.html', {})

def register(response):
    if response.method == "POST":
        form = RegisterForm(response.POST)
        if form.is_valid():
            form.save()
            account = Account.objects.create(user = form.instance, user_role = form.cleaned_data['user_role'])
            account.save()

        return redirect("/")
    else:
        form = RegisterForm()
        
    return render(response, 'register/register.html', {"form":form})