# Generated by Django 4.1.7 on 2023-03-03 18:50

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0002_rename_user_dayandtime_tutor_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ProfileSummary',
            new_name='TutorProfile',
        ),
        migrations.RenameField(
            model_name='tutorprofile',
            old_name='summary_text',
            new_name='summary',
        ),
    ]
