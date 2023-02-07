from django.db import models
from django.contrib.auth.models import User
from APLUSEDU.constants import SUBJECT_CHOICES, LEVEL_CHOICES, DAY_CHOICES
from parent.models import Student


# Create your models here.

class ProfileSummary (models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE, related_name='author')
    summary_text = models.TextField(max_length=10000)

    def __str__(self):
        return str(self.summary_text)

class SubjectAndLevel (models.Model):      
    subject = models.CharField(max_length=100, choices=SUBJECT_CHOICES)
    level = models.CharField(max_length=100, choices=LEVEL_CHOICES)
    users = models.ManyToManyField(User)

    def __str__(self):
        return str(self.subject+self.level)

class DayAndTime (models.Model):
    day = models.CharField(max_length=20, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class BookedSlot (models.Model):
    day = models.CharField(max_length=20, choices=DAY_CHOICES) # may be redundant
    start_time = models.TimeField()
    end_time = models.TimeField()
    time_slot = models.ForeignKey(DayAndTime, on_delete=models.PROTECT)
    subject_and_level = models.ForeignKey(SubjectAndLevel, on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=10, choices=[
    ('pending', 'Pending'),
    ('approved', 'Approved'),
    ], null=True)
    

