from django.db import models
from django.contrib.auth.models import User
from APLUSEDU.constants import DAY_CHOICES
from APLUSEDU.utils import clash_check
from django.utils import timezone


# Create your models here.

# Profile summary, for tutors, intended to be resume-ish
class TutorProfile (models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE, related_name='tutorprofile')
    summary = models.TextField(max_length=10000)
    initial_experience = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    education = models.CharField(max_length=255)
    occupation = models.CharField(max_length=255)
    
    # Calculate years of experience dynamically
    @property
    def experience_years(self):
        return round((timezone.now() - self.created_at).days/365 + self.initial_experience)

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

    # Determine if new booking clashes with existing approved bookings (check against the student/tutor bookedslots)
    def bookingClash(self, student, start_time, end_time):
        for bslot_approved in self.bookedslot_set.filter(status="approved") | student.bookedslot_set.all(): # .all for student to avoid clashing booking requests
            if clash_check(start_time, end_time, bslot_approved.start_time, bslot_approved.end_time):
                return True
        return False


    

