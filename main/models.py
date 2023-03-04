from django.db import models
from django.contrib.auth.models import User
from APLUSEDU.constants import DAY_CHOICES
import datetime


# Create your models here.

# Profile summary, for tutors, intended to be resume-ish
class TutorProfile (models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE, related_name='author')
    summary = models.TextField(max_length=10000)
    initial_experience = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    education = models.CharField(max_length=255)
    occupation = models.CharField(max_length=255)
    
    # Calculate years of experience dynamically
    @property
    def experience_years(self):
        return round((datetime.datetime.now() - self.created_at).days/365 + self.initial_experience)

    def __str__(self):
        return self.summary
    
# Subject
class Subject (models.Model):
    name = models.CharField(max_length=20, unique=True)
    def __str__(self):
        return self.name

# Level
class Level (models.Model):
    name = models.CharField(max_length=20, unique=True)
    def __str__(self):
        return self.name
    
# Subject and Level
class SubjectAndLevel (models.Model):      
    subject = models.ForeignKey(Subject, on_delete=models.RESTRICT)
    level = models.ForeignKey(Level, on_delete=models.RESTRICT)
    tutors = models.ManyToManyField(User)

# Represents the original available times of the tutors
class DayAndTime (models.Model):
    day = models.CharField(max_length=20, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    tutor = models.ForeignKey(User, on_delete=models.CASCADE)


    

