from django.db import models
from django.contrib.auth.models import User
from APLUSEDU.constants import DAY_CHOICES



# Create your models here.

# Profile summary, for tutors, intended to be resume-ish
class ProfileSummary (models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE, related_name='author')
    summary_text = models.TextField(max_length=10000)

    def __str__(self):
        return str(self.summary_text)
    
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


    

