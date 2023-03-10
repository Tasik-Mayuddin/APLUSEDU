# Generated by Django 4.1.5 on 2023-02-02 13:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0005_rename_user_subjectandlevels_users'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='SubjectAndLevels',
            new_name='SubjectAndLevel',
        ),
        migrations.CreateModel(
            name='DayAndTime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.CharField(choices=[('sun', 'Sunday'), ('mon', 'Monday'), ('tues', 'Tuesday'), ('wed', 'Wednesday'), ('thurs', 'Thursday'), ('fri', 'Friday'), ('sat', 'Saturday')], max_length=20)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
