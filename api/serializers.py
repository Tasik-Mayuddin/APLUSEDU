from rest_framework import serializers
from main.models import SubjectAndLevel

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectAndLevel
        fields = "__all__"