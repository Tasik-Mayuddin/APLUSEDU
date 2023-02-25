from django.shortcuts import render
from django.http import JsonResponse

from django.contrib.auth.decorators import login_required
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import TaskSerializer, ChildrenSerializer
from main.models import SubjectAndLevel
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


# Get list of children of a parent

@api_view(['GET'])
@login_required
def childrenList(request):
    children_list = request.user.student_set.all() 
    serializer = ChildrenSerializer(children_list, many=True)
    return Response(serializer.data)

    

# Add child 
@api_view(['POST'])
def addChild(request):
    serializer = ChildrenSerializer(data=request.data)
    if serializer.is_valid() and request.user.account.user_role == "Parent":
        serializer.save()
    return Response(serializer.data)