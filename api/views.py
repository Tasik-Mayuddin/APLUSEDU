from django.shortcuts import render
from django.http import JsonResponse

from django.contrib.auth.decorators import login_required
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ChildrenSerializer, ChildrenCreateSerializer, LevelSerializer, SubjectSerializer, BookedSlotSerializer, BookedSlotCreateSerializer, TutorSerializer, TutorAvailabilitySerializer
from main.models import SubjectAndLevel, Level, Subject, TutorProfile
from chat.models import ChatRoom, Message
from parent.models import Student, BookedSlot
from django.contrib.auth.models import User


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
        
        return Response(serializer.data)

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
        
        return Response(serializer.data)
    
    elif request.method == "DELETE":
        child.delete()

        return Response('Child deleted')

# List of allocations for each student
@api_view(['GET'])
@login_required
def studentAllocations(request, id):
    child = request.user.student_set.get(id=id) # Get instance of child
    booked_slots = child.bookedslot_set.all()
    serializer = BookedSlotSerializer(booked_slots, many=True)

    res = serializer.data
    # additional fields to serializer.data->res
    for i, booked_slot in enumerate(booked_slots):

        tutor = booked_slot.day_and_time.tutor.username
        day = booked_slot.day_and_time.day
        subject = booked_slot.subject_and_level.subject.name
        
        res[i]['tutor'] = tutor
        res[i]['subject'] = subject
        res[i]['day'] = day
        
    return Response(res)


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
@api_view(['GET'])
@login_required
def tutorAvailability(request, id):
    tutor = User.objects.get(id=id)
    serializer = TutorAvailabilitySerializer(tutor)
    return Response(serializer.data)

# Tutor request, user = Parent
@api_view(['POST'])
@login_required
def tutorRequest(request, id):
    tutor = User.objects.get(id=id)
    student = request.user.student_set.get(id=request.data['child_id'])

    dnt_extracted = tutor.dayandtime_set.filter( 
        day = request.data['day'], 
        start_time__lte = request.data['start_time'], 
        end_time__gte = request.data['end_time'], 
    ).first() # since it will only return a single object, the first()

    # Ensure that DayAndTime instance exists, and call method to determine if clash
    if dnt_extracted is not None and not dnt_extracted.bookingClash(student, request.data['start_time'], request.data['end_time']):

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



    
