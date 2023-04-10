from django.shortcuts import render
from django.http import JsonResponse

from django.contrib.auth.decorators import login_required
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import ChildrenSerializer, ChildrenCreateSerializer,\
      LevelSerializer, SubjectSerializer, BookedSlotSerializer, BookedSlotCreateSerializer,\
          TutorSerializer, TutorAvailabilitySerializer, AccountSerializer, TutorProfileSerializer,\
          TutorProfileCreateSerializer, DayAndTimeSerializer, RequestSerializer, TutorPovAvailabilitySerializer,\
          ChatSerializer

from main.models import SubjectAndLevel, Level, Subject, TutorProfile, DayAndTime
from chat.models import ChatRoom, Message
from parent.models import Student, BookedSlot
from django.contrib.auth.models import User
from collections import defaultdict
from APLUSEDU.utils import clash_check, string_to_date


# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/task-list/',
        'Detail View': '/task-detail/<str:pk>/',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/',
    }
    return Response(api_urls)


# List of children of a parent
@api_view(['GET', 'POST'])
@login_required
def childrenList(request):

    if request.method == "GET":
        children_list = request.user.student_set.all() 
        serializer = ChildrenSerializer(children_list, many=True)
        return Response(serializer.data)
    
    elif request.method == "POST":
        req_data = request.data
        req_data['parent'] = request.user.id # add necessary parent field here
        serializer = ChildrenCreateSerializer(data=req_data)

        if serializer.is_valid() and request.user.account.user_role == "Parent":
            serializer.save()

            serializer_res = ChildrenSerializer(request.user.student_set.last())
            return Response(serializer_res.data)

# Individual child of parent
@api_view(['GET', 'PUT', 'DELETE'])
@login_required
def child(request, id):
    child = request.user.student_set.get(id=id) # Get instance of child

    if request.method == "GET":
        serializer = ChildrenSerializer(child)

        return Response(serializer.data)
    
    elif request.method == "PUT":
        req_data = request.data
        req_data['parent'] = request.user.id # add necessary parent field here
        serializer = ChildrenCreateSerializer(instance=child, data=req_data) 

        if serializer.is_valid() and request.user.account.user_role == "Parent":
            serializer.save()
            serializer_res = ChildrenSerializer(request.user.student_set.get(id=serializer.data['id']))
            return Response(serializer_res.data)
    
    elif request.method == "DELETE":
        child.delete()

        return Response('Child deleted')

# List of allocations for each student
@api_view(['GET', 'DELETE'])
@login_required
def studentAllocations(request, id):
    child = request.user.student_set.get(id=id) # Get instance of child
    if request.method == 'GET':
        booked_slots = child.bookedslot_set.all()
        serializer = BookedSlotSerializer(booked_slots, many=True)

        res = serializer.data
        # additional fields to serializer.data->res
        for i, booked_slot in enumerate(booked_slots):

            tutor = booked_slot.day_and_time.tutor
            day = booked_slot.day_and_time.day
            subject = booked_slot.subject_and_level.subject.name
            chat_id = ChatRoom.objects.get(tutor=tutor, parent=request.user).id
            bslot_id = booked_slot.id

            res[i]['tutor'] = tutor.username
            res[i]['subject'] = subject
            res[i]['day'] = day
            res[i]['chatId'] = chat_id
            res[i]['bSlotId'] = bslot_id
            
        return Response(res)
    elif request.method == 'DELETE':
        booked_slot_to_delete = child.bookedslot_set.get(id=request.data['bSlotId'])
        booked_slot_to_delete.delete()
        return Response('Allocation deleted')


# Tutor query
@api_view(['GET'])
@login_required
def tutorQuery(request):
    # get corresponding SubjectAndLevel instance
    subject_and_level = SubjectAndLevel.objects.get(
        subject = request.query_params.get('subject'),
        level = request.query_params.get('level')
    )

    # get corrsponding list of tutors 
    tutor_list = subject_and_level.tutors.all()
    serializer = TutorSerializer(tutor_list, many=True)

    return Response(serializer.data)

# Tutor availability, user = Parent
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def tutorAvailability(request, id):

    # Find if there are existing dnt slots on the day, if yes: check that there wont be clashes
    def dnt_clash_check(exclude_self=False):
        print(request.data)
        dnt_query = request.user.dayandtime_set.filter(day=request.data['day'])
        if exclude_self:
            dnt_query = dnt_query.exclude(id=request.data['idEdit'])
        if dnt_query.exists():                   
            for x in dnt_query:
                print(type(x.start_time))
                print(type(x.end_time))
                print(type(request.data['start_time']))
                print(type(request.data['end_time']))
                if clash_check(request.data['start_time'], request.data['end_time'], x.start_time, x.end_time):
                    return True
        return False
    
    # for parent AND tutor to get tutor's free time
    if request.method == 'GET':
        tutor = User.objects.get(id=id)
        
        # additional info if tutor interface (student, parent, subject, level, etc)
        if request.user == tutor:
            serializer = TutorPovAvailabilitySerializer(tutor)
            return Response(serializer.data)
        else:
            serializer = TutorAvailabilitySerializer(tutor)
            return Response(serializer.data)
        
    # for tutor to set free time
    elif request.method == 'POST':
        tutor = request.user
        request.data['tutor'] = tutor.id

        if dnt_clash_check():
            print("clashing with other free slots!")
            serializer_res = TutorPovAvailabilitySerializer(tutor)
            return Response(serializer_res.data)

        serializer = DayAndTimeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

        serializer_res = TutorPovAvailabilitySerializer(tutor)
        return Response(serializer_res.data)
    
    # edit availability (DayAndTime) slot
    elif request.method == 'PUT':
        tutor = request.user

        # prevent clash with other instances of DayAndTime
        if dnt_clash_check(exclude_self = True):
            print("clashing with other free slots!")
            serializer_res = TutorPovAvailabilitySerializer(tutor)
            return Response(serializer_res.data)
        
        
        instance = tutor.dayandtime_set.get(id=request.data['idEdit'])
        if instance.bookedslot_set.exists():
            # prevent changing day with booked slots within
            if instance.day != request.data['day']: 
                print("cannot change day with confirmed slots")
                serializer_res = TutorPovAvailabilitySerializer(tutor)
                return Response(serializer_res.data)
            # makes sure that updated DayAndTime instance contains approved booked slots
            for bslot in instance.bookedslot_set.all():
                if bslot.start_time < string_to_date(request.data['start_time']) or bslot.end_time > string_to_date(request.data['end_time']):
                    print("edited time range must contain confirmed slots")
                    serializer_res = TutorPovAvailabilitySerializer(tutor)
                    return Response(serializer_res.data)

        serializer = DayAndTimeSerializer(
                instance=tutor.dayandtime_set.get(id=request.data.pop('idEdit')), 
                data=request.data,
                partial = True,
            )

        if serializer.is_valid():
            serializer.save()
        
        serializer_res = TutorPovAvailabilitySerializer(tutor)
        return Response(serializer_res.data)
    
    elif request.method == 'DELETE':
        tutor = request.user
        dnt_id = request.data['dayAndTimeId']
        dnt_to_delete = DayAndTime.objects.get(id=dnt_id)
        if dnt_to_delete.tutor != tutor:
            serializer_res = TutorPovAvailabilitySerializer(tutor)
            return Response(serializer_res.data)
        dnt_to_delete.delete()
        serializer_res = TutorPovAvailabilitySerializer(tutor)
        return Response(serializer_res.data)

@api_view(['DELETE'])
@login_required
def tutorConfirmedSlots(request, id):
    if request.method == 'DELETE':
        tutor = request.user
        bslot_id = request.data['bSlotId']
        confirmed_slot_to_delete = BookedSlot.objects.get(id=bslot_id)
        if confirmed_slot_to_delete.day_and_time.tutor != tutor:
            serializer_res = TutorPovAvailabilitySerializer(tutor)
            return Response(serializer_res.data)
        confirmed_slot_to_delete.delete()
        serializer_res = TutorPovAvailabilitySerializer(tutor)
        return Response(serializer_res.data)

# Tutor request, user = Parent
@api_view(['POST', 'GET', 'PUT', 'DELETE'])
@login_required
def tutorRequest(request, id):
    # for parent to send request
    if request.method == 'POST':
        tutor = User.objects.get(id=id)
        student = request.user.student_set.get(id=request.data['child_id'])


        dnt_extracted = tutor.dayandtime_set.filter( 
            day = request.data['day'], 
            start_time__lte = request.data['start_time'], 
            end_time__gte = request.data['end_time'], 
        ).first() # since it will only return a single object, the first()

        # Ensure that DayAndTime instance exists, and call method to determine if clash
        if dnt_extracted is not None and not dnt_extracted.bookingClash(request.data['start_time'], request.data['end_time'], student=student):

            # if parent condition true, a bookedslot with the status "pending" is created
            
            subject_and_level = SubjectAndLevel.objects.get(
                subject = Subject.objects.get(id=request.data['subject']['id']), 
                level = student.level
                )
            # verify that tutor has instance of SubjectAndLevel
            if subject_and_level in tutor.subjectandlevel_set.all():
                req_data = request.data
                req_data.pop('child_id')
                req_data.pop('subject')
                req_data['day_and_time'] = dnt_extracted.id
                req_data['subject_and_level'] = subject_and_level.id
                req_data['student'] = student.id
                req_data['status'] = "pending"

            serializer = BookedSlotCreateSerializer(data=req_data)
            if serializer.is_valid():
                serializer.save()

                # create chatroom between tutor and parent upon request of tutor
                chatroom, created = ChatRoom.objects.get_or_create(tutor = tutor, parent = request.user)

                # send initial tutor request message
                req_msg = f"Hi Mr/Mrs {tutor.username}, I would like to request \
                    {subject_and_level.level} {subject_and_level.subject} \
                    for my child, {student.name}, for {req_data['day']}: {req_data['start_time']} - {req_data['end_time']}"
                
                Message.objects.create(
                    author = request.user,
                    content = req_msg,
                    chat_room = chatroom
            )
        
        return Response(serializer.data)

    # for tutor to get requests - depreciated
    elif request.method == 'GET':
        # retrieve all unapproved booked slots as the list of requests
        dnt_query = request.user.dayandtime_set.all()
        requests = BookedSlot.objects.none() # create an empty query set
        for dnt in dnt_query:
            requests = requests | dnt.bookedslot_set.filter(status="pending") 

        serializer = RequestSerializer(requests, many=True)

        return Response(serializer.data)
    
    # for tutor to accept request
    elif request.method == 'PUT':
        bookedslot_id = request.data['bSlotId']
        booked_slot_to_approve = BookedSlot.objects.get(id=bookedslot_id)

        # to verify the user, prevent clashes with existing approved booked slots, and ensure in is within the limits of the parent DayAndTime instance in case of edits
        if booked_slot_to_approve.day_and_time.tutor != request.user:
            print('Invalid user')
            serializer_res = TutorPovAvailabilitySerializer(request.user)
            return Response(serializer_res.data)
        elif booked_slot_to_approve.day_and_time.bookingClash(booked_slot_to_approve.start_time, booked_slot_to_approve.end_time):
            print('Clashes with existing approved time slots!')
            serializer_res = TutorPovAvailabilitySerializer(request.user)
            return Response(serializer_res.data)
        elif booked_slot_to_approve.checkLeakedBoundaries():
            print('Leak out of DnT boundaries detected.')
            serializer_res = TutorPovAvailabilitySerializer(request.user)
            return Response(serializer_res.data)
        
        serializer = BookedSlotSerializer(instance=booked_slot_to_approve, data={"status": "approved"}, partial=True)
        if serializer.is_valid():
            serializer.save()
        serializer_res = TutorPovAvailabilitySerializer(request.user)
        return Response(serializer_res.data)
    
    # for tutor to decline request, which just deletes the request
    elif request.method == 'DELETE':
        bookedslot_id = request.data['bSlotId']
        booked_slot_to_decline = BookedSlot.objects.get(id=bookedslot_id)

        if booked_slot_to_decline.day_and_time.tutor != request.user:
            return Response('Invalid user')
        
        booked_slot_to_decline.delete()
        serializer_res = TutorPovAvailabilitySerializer(request.user)
        return Response(serializer_res.data)

        

# Get whole list of levels
@api_view(['GET'])
@login_required
def levelList(request):
    level_list = Level.objects.all()
    serializer = LevelSerializer(level_list, many=True)
    return Response(serializer.data)

# Get whole list of subjects
@api_view(['GET'])
@login_required
def subjectList(request):
    subject_list = Subject.objects.all()
    serializer = SubjectSerializer(subject_list, many=True)
    return Response(serializer.data)



# Get user role
@api_view(['GET'])
@login_required
def userRole(request):
    account = request.user.account
    serializer = AccountSerializer(account)
    return Response(serializer.data)
    

# Get tutor profile
@api_view(['GET', 'POST', 'PUT'])
@login_required
def tutorProfile(request):

    # get this user's profile
    if request.method == 'GET':
        try:
            profile = TutorProfile.objects.get(author=request.user)
        except TutorProfile.DoesNotExist:
            return Response()
        
        serializer = TutorProfileSerializer(profile)
        return Response(serializer.data)
    
    # create user's profile
    elif request.method == 'POST':
        request.data['author'] = request.user.id
        serializer = TutorProfileCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            serializer_res = TutorProfileSerializer(request.user.tutorprofile)
            return Response(serializer_res.data)
        
    # edit user's profile
    elif request.method == 'PUT':
        request.data['author'] = request.user.id
        serializer = TutorProfileCreateSerializer(instance=request.user.tutorprofile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            serializer_res = TutorProfileSerializer(request.user.tutorprofile)
            return Response(serializer_res.data)
        
# Edit tutor's profile picture
@api_view(['PUT'])
@login_required
def tutorProfilePicture(request):
    tutor_profile = request.user.tutorprofile
    serializer = TutorProfileCreateSerializer(instance=tutor_profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
    serializer_res = TutorProfileSerializer(request.user.tutorprofile)
    return Response(serializer_res.data)
    


# Get tutor's subjects and levels
@api_view(['GET', 'POST', 'DELETE'])
@login_required
def tutorSubjectsAndLevels(request):

    if request.method == 'POST' and request.user.account.user_role == 'Tutor':
        for level_id in request.data['levels']:
            subject_and_level = SubjectAndLevel.objects.get(
                subject = Subject.objects.get(id = request.data['subject']),
                level = Level.objects.get(id = level_id)
            )
            subject_and_level.tutors.add(request.user)
            subject_and_level.save()
    
    elif request.method == 'DELETE':
        subject_to_delete = request.data
        for subject_and_level in request.user.subjectandlevel_set.filter(subject=Subject.objects.get(name=subject_to_delete)):
            subject_and_level.tutors.remove(request.user)
            subject_and_level.save()
    
    subject_and_level_list = request.user.subjectandlevel_set.all()
    data = defaultdict(list)

    for subject_and_level in subject_and_level_list:
        data[subject_and_level.subject.name].append(subject_and_level.level.name) 
    
    res = []
    res = [{"subject": subject, "levels": levels} for subject, levels in data.items()]

    return Response(res)
    
    


# Get list of chats of a user
@api_view(['GET'])
@login_required
def chats(request):
    role = request.user.account.user_role

    # the part that generates the list of all chatrooms
    if role == 'Tutor':
        chat_list = request.user.tutor_chats.all()
    elif role == 'Parent':
        chat_list = request.user.parent_chats.all() 

    serializer = ChatSerializer(chat_list, many=True)

    return Response(serializer.data)