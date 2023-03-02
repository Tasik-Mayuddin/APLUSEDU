from django.shortcuts import render
from django.http import JsonResponse

from django.contrib.auth.decorators import login_required
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ChildrenSerializer, LevelSerializer, SubjectSerializer
from main.models import SubjectAndLevel, Level, Subject
from parent.models import Student


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
        serializer = ChildrenSerializer(data=req_data)

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
        serializer = ChildrenSerializer(instance=child, data=req_data) 

        if serializer.is_valid() and request.user.account.user_role == "Parent":
            serializer.save()
        
        return Response(serializer.data)
    
    elif request.method == "DELETE":
        child.delete()

        return Response('Child deleted')



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


    
