from django.contrib.auth import login, authenticate 
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User

class RegisterForm(UserCreationForm):
    email = forms.EmailField()  
    user_role = forms.ChoiceField(choices=(("Parent", "Parent"), ("Tutor", "Tutor")), widget=forms.RadioSelect())

    class Meta: 
        model = User
        fields = ["username","email","password1","password2","user_role"]
