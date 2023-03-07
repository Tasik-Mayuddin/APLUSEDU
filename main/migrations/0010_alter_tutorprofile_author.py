# Generated by Django 4.1.7 on 2023-03-04 08:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0009_alter_tutorprofile_education_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tutorprofile',
            name='author',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='tutorprofile', to=settings.AUTH_USER_MODEL),
        ),
    ]