from rest_framework import serializers
from main.models import SubjectAndLevel, Level, Subject
from parent.models import Student, BookedSlot


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = "__all__"

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"

class ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"

class BookedSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookedSlot
        fields = ["start_time", "end_time", "status"]

class BookedSlotCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookedSlot
        fields = "__all__"


