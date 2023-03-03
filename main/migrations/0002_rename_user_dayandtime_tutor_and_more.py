# Generated by Django 4.1.7 on 2023-03-03 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dayandtime',
            old_name='user',
            new_name='tutor',
        ),
        migrations.RenameField(
            model_name='subjectandlevel',
            old_name='users',
            new_name='tutors',
        ),
        migrations.AlterField(
            model_name='dayandtime',
            name='day',
            field=models.CharField(choices=[('Sunday', 'Sunday'), ('Monday', 'Monday'), ('Tuesday', 'Tuesday'), ('Wednesday', 'Wednesday'), ('Thursday', 'Thursday'), ('Friday', 'Friday'), ('Saturday', 'Saturday')], max_length=20),
        ),
    ]
