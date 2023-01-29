from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ProfileSummary (models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE, related_name='author')
    summary_text = models.TextField(max_length=10000)

    def __str__(self):
        return str(self.summary_text)

#class Subject (models.Model):
#    subject = 
#    time = 
#
#    def __str__(self):
#        return 