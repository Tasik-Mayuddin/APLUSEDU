from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User

class AddSubjectForm(forms.Form):
    SUBJECT_CHOICES = [
        ('math', 'Mathematics'),
        ('english', 'English'),
        ('science', 'Science'),
    ]

    LEVEL_CHOICES = [
        ('primary_1', 'Primary 1'),
        ('primary_2', 'Primary 2'),
        ('primary_3', 'Primary 3'),
    ]

    subject = forms.ChoiceField(choices=SUBJECT_CHOICES, widget=forms.RadioSelect())
    levels = forms.MultipleChoiceField(choices=LEVEL_CHOICES, widget=forms.CheckboxSelectMultiple())


    
