from django.db import models
from APLUSEDU.constants import LEVEL_CHOICES, SUBJECT_CHOICES

# Create your models here.

class Student (models.Model):
    name = models.CharField(max_length=20)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)

class SubjectAndLevel (models.Model):
    subject = models.CharField(max_length=20, choices=SUBJECT_CHOICES)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    students = models.ManyToManyField(Student)