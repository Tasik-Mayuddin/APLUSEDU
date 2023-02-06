from django import forms
from APLUSEDU.constants import LEVEL_CHOICES, SUBJECT_CHOICES, DAY_CHOICES

# form to add new students

class AddStudentForm(forms.Form):
    name = forms.CharField(max_length=20)
    level = forms.ChoiceField(choices=LEVEL_CHOICES, widget=forms.Select())
    subjects = forms.MultipleChoiceField(choices=SUBJECT_CHOICES, widget=forms.CheckboxSelectMultiple())

