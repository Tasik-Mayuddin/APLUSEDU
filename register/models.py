from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Account(models.Model):
   user = models.OneToOneField(User, on_delete=models.CASCADE)
   user_role = models.CharField(max_length=20, choices=[("Parent", "Parent"), ("Tutor", "Tutor")])

   def __str__(self):
      return str(self.user_role)

