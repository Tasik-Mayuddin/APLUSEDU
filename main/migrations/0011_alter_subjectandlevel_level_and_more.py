# Generated by Django 4.1.7 on 2023-03-17 08:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_alter_tutorprofile_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subjectandlevel',
            name='level',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='main.level'),
        ),
        migrations.AlterField(
            model_name='subjectandlevel',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='main.subject'),
        ),
    ]