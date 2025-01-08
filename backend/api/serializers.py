from rest_framework import serializers
from .models import Exercise, Movement, WorkoutSet


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']


class MovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movement
        fields = ['id', 'name', 'description', 'exercise', 'created_at', 'updated_at']


class WorkoutSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutSet
        fields = ['id', 'movement', 'reps', 'sets', 'weight', 'note', 'created_at', 'updated_at']
