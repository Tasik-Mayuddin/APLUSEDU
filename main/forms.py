from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User
from APLUSEDU.constants import SUBJECT_CHOICES, LEVEL_CHOICES, DAY_CHOICES

class AddSubjectForm(forms.Form):
    subject = forms.ChoiceField(choices=SUBJECT_CHOICES, widget=forms.RadioSelect())
    levels = forms.MultipleChoiceField(choices=LEVEL_CHOICES, widget=forms.CheckboxSelectMultiple())

class AddDayForm(forms.Form):
    day = forms.ChoiceField(choices=DAY_CHOICES, widget=forms.RadioSelect())
    start_time = forms.TimeField()
    end_time = forms.TimeField()

    
