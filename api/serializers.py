from rest_framework import serializers
from main.models import SubjectAndLevel, Level, Subject, TutorProfile, DayAndTime
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

class BookedSlotCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookedSlot
        fields = "__all__"

class TutorProfileSerializer(serializers.ModelSerializer):
    experience_years = serializers.ReadOnlyField()
    class Meta:
        model = TutorProfile
        fields = ["summary", "education", "occupation", "experience_years"]

class TutorSerializer(serializers.ModelSerializer):
    tutorprofile = TutorProfileSerializer(required=False)
    class Meta:
        model = User
        fields = ["id", "username", "tutorprofile"]
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if not ret['tutorprofile']:
            ret['tutorprofile'] = {
                'summary': None, 
                'education': None, 
                'occupation': None,
                'experience_years': None,
                }
        return ret


class BookedSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookedSlot
        fields = ["start_time", "end_time", "status"]

class DayAndTimeSerializer(serializers.ModelSerializer):
    bookedslot_set = BookedSlotSerializer(many=True)
    class Meta:
        model = DayAndTime
        fields = ["day", "start_time", "end_time", "bookedslot_set"]

class TutorAvailabilitySerializer(serializers.ModelSerializer):
    dayandtime_set = DayAndTimeSerializer(many=True)
    class Meta:
        model = User
        fields = ["username", "dayandtime_set"]

