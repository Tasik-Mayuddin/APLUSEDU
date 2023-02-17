from django.shortcuts import render
from django.utils.safestring import mark_safe
import json
from django.contrib.auth.decorators import login_required
from .models import ChatRoom, Message

# Create your views here.

def index(request):
    return render(request, "chat/index.html")


@login_required
def room(request, room_id):
    role = request.user.account.user_role
    if role == 'Tutor':
        chatroom_output = request.user.tutor_chats.all()
    elif role == 'Parent':
        chatroom_output = request.user.parent_chats.all()

    print (chatroom_output.get(id=1).parent)
    return render(request, "chat/room.html", {
        "chatrooms": chatroom_output,
        "room_id_json": mark_safe(json.dumps(room_id)),
        "username": mark_safe(json.dumps(request.user.username))
    })

