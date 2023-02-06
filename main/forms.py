from django import forms
from APLUSEDU.constants import SUBJECT_CHOICES, LEVEL_CHOICES, DAY_CHOICES

class AddSubjectForm(forms.Form):
    subject = forms.ChoiceField(choices=SUBJECT_CHOICES, widget=forms.RadioSelect())
    levels = forms.MultipleChoiceField(choices=LEVEL_CHOICES, widget=forms.CheckboxSelectMultiple())

class AddDayForm(forms.Form):
    day = forms.ChoiceField(choices=DAY_CHOICES, widget=forms.Select())
    start_time = forms.TimeField(widget=forms.TextInput(attrs={'type': 'time'}), input_formats=['%H:%M'])
    end_time = forms.TimeField(widget=forms.TextInput(attrs={'type': 'time'}), input_formats=['%H:%M'])

    
