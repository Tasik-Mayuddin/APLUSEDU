from rest_framework import serializers
from main.models import SubjectAndLevel
from parent.models import Student

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectAndLevel
        fields = "__all__"

class ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["name", "level", "parent"]

