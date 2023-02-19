from chat.models import ChatRoom

# checks if clash between timeslots
def clash_check(startA, endA, startB, endB):
    if endA <= startB or endB <= startA:
        return False
    return True

# authenticates the user instance, ensuring the user is part of the chatroom
# return False if authentication fails, but returns the ChatRoom instance if authentication succeeds
def authenticate_id(user, room_id):
    try:
        chatroom = ChatRoom.objects.get(id=room_id)
    except ChatRoom.DoesNotExist:
        return False
    if user in [chatroom.tutor, chatroom.parent]:
        return chatroom
    else:
        return False