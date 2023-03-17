from chat.models import ChatRoom
from datetime import datetime, time

def string_to_date(time):
    if isinstance(time, str):
        if len(time) == 8:
            return datetime.strptime(time, "%H:%M:%S").time()
        else:
            return datetime.strptime(time, "%H:%M").time()
    else:
        return time

# checks if clash between timeslots
def clash_check(startA, endA, startB, endB):
    times = [startA, endA, startB, endB]

    for i, time in enumerate(times):
        times[i] = string_to_date(time)

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