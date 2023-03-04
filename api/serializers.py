from rest_framework import serializers
from main.models import SubjectAndLevel, Level, Subject, TutorProfile
from parent.models import Student, BookedSlot
from django.contrib.auth.models import User


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = "__all__"

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"

class ChildrenSerializer(serializers.ModelSerializer):
    level = LevelSerializer()
    subjects = SubjectSerializer(many=True)
    class Meta:
        model = Student
        fields = "__all__"

class ChildrenCreateSerializer(serializers.ModelSerializer):
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

class ProfileSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorProfile
        fields = ["summary_text"]

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


