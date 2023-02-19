from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class ChatRoom (models.Model):
    tutor = models.ForeignKey(User, related_name='tutor_chats', on_delete=models.CASCADE, null=True)
    parent = models.ForeignKey(User, related_name='parent_chats', on_delete=models.CASCADE, null=True)

    # retrieve last meesage of a chatroom
    def last_message(self):
        return self.message_set.order_by('-timestamp').first()

    # retrieve last 10 messages of a chatroom
    def last_10_messages(self):
        return reversed(self.message_set.order_by('-timestamp')[:10])
    
    # authenticate id, returns True or False validating that user is indeed part of the chatroom, with the option to retrieve the responder's username
    def auth_id(self, user, responder=False):
        if user == self.tutor:
            if responder:
                return self.parent.username
            else:
                return True
        elif user == self.parent:
            if responder:
                return self.tutor.username
            else:
                return True
        else:
            return False

class Message (models.Model):
    author = models.ForeignKey(User, related_name='author_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.author.username


    


    