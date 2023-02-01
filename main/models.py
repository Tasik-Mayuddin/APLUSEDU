from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class ProfileSummary (models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE, related_name='author')
    summary_text = models.TextField(max_length=10000)

    def __str__(self):
        return str(self.summary_text)

class SubjectAndLevels (models.Model):
    SUBJECT_CHOICES = [
        ('math', 'Mathematics'),
        ('english', 'English'),
        ('science', 'Science'),
    ]
    LEVEL_CHOICES = [
        ('primary_1', 'Primary 1'),
        ('primary_2', 'Primary 2'),
        ('primary_3', 'Primary 3'),
    ]
       
    subject = models.CharField(max_length=100, choices=SUBJECT_CHOICES)
    level = models.CharField(max_length=100, choices=LEVEL_CHOICES)
    users = models.ManyToManyField(User)

    def __str__(self):
        return str(self.subject+self.level)
    

