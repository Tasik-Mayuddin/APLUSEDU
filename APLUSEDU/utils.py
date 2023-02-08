# checks if clash between timeslots

def clash_check(startA, endA, startB, endB):
    if endA <= startB or endB <= startA:
        return False
    return True