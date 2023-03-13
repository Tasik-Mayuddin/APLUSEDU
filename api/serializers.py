from rest_framework import serializers
from main.models import SubjectAndLevel, Level, Subject, TutorProfile, DayAndTime
from parent.models import Student, BookedSlot
from register.models import Account
from django.contrib.auth.models import User
from collections import defaultdict


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = "__all__"

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"

class SubjectAndLevelSerializer(serializers.ModelSerializer):
    __str__ = serializers.ReadOnlyField()
    class Meta:
        model = SubjectAndLevel
        fields = ["__str__"]

class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]

class ChildrenSerializer(serializers.ModelSerializer):
    level = LevelSerializer()
    subjects = SubjectSerializer(many=True)
    parent = ParentSerializer()
    class Meta:
        model = Student
        fields = "__all__"

class ChildrenCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


# used for parent and tutor interface
class TutorProfileSerializer(serializers.ModelSerializer):
    experience_years = serializers.ReadOnlyField()
    class Meta:
        model = TutorProfile
        fields = ["summary", "education", "occupation", "experience_years", "initial_experience", "created_at"]

# used for tutor interface
class TutorProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorProfile
        fields = "__all__"

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

class BookedSlotCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookedSlot
        fields = "__all__"

class DayAndTimeSerializer(serializers.ModelSerializer):
    bookedslot_set = BookedSlotSerializer(many=True, required=False)
    class Meta:
        model = DayAndTime
        fields = ["day", "start_time", "end_time", "bookedslot_set", "tutor"]

class RequestSerializer(serializers.ModelSerializer):
    student = ChildrenSerializer()
    subject_and_level = SubjectAndLevelSerializer()
    day_and_time = DayAndTimeSerializer()
    class Meta:
        model = BookedSlot
        fields = "__all__"

class TutorAvailabilitySerializer(serializers.ModelSerializer):
    dayandtime_set = DayAndTimeSerializer(many=True)
    class Meta:
        model = User
        fields = ["username", "dayandtime_set"]


# Series of nested serializers to present relevant info for the tutor interface.
class ChildrenPovSerializer(serializers.ModelSerializer):
    parent = ParentSerializer()
    class Meta:
        model = Student
        fields = ["name", "parent"]
class BookedSlotPovSerializer(serializers.ModelSerializer):
    student = ChildrenPovSerializer()
    subject_and_level = SubjectAndLevelSerializer()
    class Meta:
        model = BookedSlot
        fields = "__all__"      
class DayAndTimePovSerializer(DayAndTimeSerializer):
    bookedslot_set = BookedSlotPovSerializer(many=True, required=False)
    class Meta(DayAndTimeSerializer.Meta):
        pass
class TutorPovAvailabilitySerializer(serializers.ModelSerializer):
    dayandtime_set = DayAndTimePovSerializer(many=True)
    class Meta:
        model = User
        fields = ["dayandtime_set"]


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"



    
