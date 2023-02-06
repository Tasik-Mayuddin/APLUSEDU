from django.db import models
from APLUSEDU.constants import LEVEL_CHOICES, SUBJECT_CHOICES
from django.contrib.auth.models import User

# Create your models here.

class Student (models.Model):
    name = models.CharField(max_length=20)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    parent = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

class Subject (models.Model):
    subject = models.CharField(max_length=20, choices=SUBJECT_CHOICES)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)