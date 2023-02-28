from rest_framework import serializers
from main.models import SubjectAndLevel, Level, Subject
from parent.models import Student


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = "__all__"

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"


# /api/children-list/
class ChildrenSerializer(serializers.ModelSerializer):
    # level = LevelSerializer()
    # subjects = SubjectSerializer(many=True)
    class Meta:
        model = Student
        fields = "__all__"


