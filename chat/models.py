from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class ChatRoom (models.Model):
    tutor = models.ForeignKey(User, related_name='tutor_chats', on_delete=models.CASCADE, null=True)
    parent = models.ForeignKey(User, related_name='parent_chats', on_delete=models.CASCADE, null=True)

    def last_10_messages(self):
        return self.message_set.order_by('timestamp')[:10]


class Message (models.Model):
    author = models.ForeignKey(User, related_name='author_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.author.username


    


    