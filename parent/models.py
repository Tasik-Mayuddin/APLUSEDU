from django.db import models
from main.models import Subject, Level, DayAndTime, SubjectAndLevel
from APLUSEDU.constants import DAY_CHOICES
from django.contrib.auth.models import User

# Create your models here.

class Student (models.Model):
    name = models.CharField(max_length=20)
    level = models.ForeignKey(Level, on_delete=models.RESTRICT)
    parent = models.ForeignKey(User, on_delete=models.CASCADE)
    subjects = models.ManyToManyField(Subject)

# Booked tutor slots
class BookedSlot (models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
    day_and_time = models.ForeignKey(DayAndTime, on_delete=models.PROTECT)
    subject_and_level = models.ForeignKey(SubjectAndLevel, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=[
    ('pending', 'Pending'),
    ('approved', 'Approved'),
    ])