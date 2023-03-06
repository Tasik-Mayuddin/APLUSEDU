from chat.models import ChatRoom
from datetime import datetime, time

# checks if clash between timeslots
def clash_check(startA, endA, startB, endB):
    times = [startA, endA, startB, endB]
    
    for i, time in enumerate(times):
        if isinstance(time, str):
            time = datetime.strptime(time, "%H:%M").time()
            times[i] = time

    startA = times[0]
    endA = times[1]
    startB = times[2]
    endB = times[3]

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