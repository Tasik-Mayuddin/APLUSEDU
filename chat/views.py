from django.shortcuts import render
from django.utils.safestring import mark_safe
import json
from django.contrib.auth.decorators import login_required
from .models import ChatRoom, Message
from APLUSEDU.utils import authenticate_id

# Create your views here.

def index(request):
    return render(request, "chat/index.html")


@login_required
def room(request, room_id):
    role = request.user.account.user_role

    # the part that gets the current chatroom
    chatroom = ChatRoom.objects.get(id=room_id)
    if not chatroom.auth_id(request.user):
        return render(request, '403.html', status=403)

    # the part that generates the list of all chatrooms
    if role == 'Tutor':
        chatroom_output = request.user.tutor_chats.all()
    elif role == 'Parent':
        chatroom_output = request.user.parent_chats.all()  

    return render(request, "chat/room.html", {
        "chatrooms": chatroom_output,
        "room_id_json": mark_safe(json.dumps(room_id)),
        "user": request.user,
        "responder_username": chatroom.auth_id(request.user, responder=True),
    })

