# Generated by Django 4.1.5 on 2023-02-05 11:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parent', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(choices=[('math', 'Mathematics'), ('english', 'English'), ('science', 'Science')], max_length=20)),
                ('students', models.ManyToManyField(to='parent.student')),
            ],
        ),
        migrations.DeleteModel(
            name='SubjectAndLevel',
        ),
    ]
