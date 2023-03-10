# Generated by Django 4.1.6 on 2023-02-17 09:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0003_remove_chatroom_user_1_remove_chatroom_user_2_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatroom',
            name='parent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='parent_chats', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='chatroom',
            name='tutor',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tutor_chats', to=settings.AUTH_USER_MODEL),
        ),
    ]
