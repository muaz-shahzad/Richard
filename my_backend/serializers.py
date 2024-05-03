from rest_framework import serializers
from .models import Goal

class GoalSerializer(serializers.ModelSerializer):   #sereiallisers convert complex data into JSON, readable info
    class Meta:
        model = Goal
        fields = ['id', 'name', 'amount']  
