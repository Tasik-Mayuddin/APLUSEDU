from django.db import models
from main.models import Subject, Level, DayAndTime, SubjectAndLevel
from APLUSEDU.constants import DAY_CHOICES
from django.contrib.auth.models import User

# Create your models here.

class Student (models.Model):
    name = models.CharField(max_length=20)
    level = models.ForeignKey(Level, on_delete=models.PROTECT)
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

    # method to check if booked slot is within start/end time boundaries of parent DayAndTime instance
    def checkLeakedBoundaries(self):
        dnt_start = self.day_and_time.start_time
        dnt_end = self.day_and_time.end_time
        if self.start_time >= dnt_start and self.end_time <= dnt_end:
            return False
        else:
            return True