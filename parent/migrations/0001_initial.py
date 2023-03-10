# Generated by Django 4.1.5 on 2023-02-03 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('level', models.CharField(choices=[('primary_1', 'Primary 1'), ('primary_2', 'Primary 2'), ('primary_3', 'Primary 3')], max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='SubjectAndLevel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(choices=[('math', 'Mathematics'), ('english', 'English'), ('science', 'Science')], max_length=20)),
                ('level', models.CharField(choices=[('primary_1', 'Primary 1'), ('primary_2', 'Primary 2'), ('primary_3', 'Primary 3')], max_length=20)),
                ('students', models.ManyToManyField(to='parent.student')),
            ],
        ),
    ]
