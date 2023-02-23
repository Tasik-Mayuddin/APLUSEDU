# Generated by Django 4.1.5 on 2023-02-07 11:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('parent', '0004_remove_subject_students_subject_student_and_more'),
        ('main', '0009_bookedslot_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookedslot',
            name='students',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='parent.student'),
        ),
    ]