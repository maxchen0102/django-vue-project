# backend/api/views.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Exercise
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Exercise, Movement, WorkoutSet
from .serializers import ExerciseSerializer, MovementSerializer, WorkoutSetSerializer
from django.forms.models import model_to_dict
from django.core import serializers


def hello_world(request):
    return JsonResponse({
        "message": "Hello from Django!"
    })


def data(request):
    return JsonResponse({
        "message": "Hello from Django!",
        "data": [1, 2, 3, 4, 5]
    })


def homepage_data(request):
    pass

# qwe
# awe

# 列表和新增 (Read All & Create)
@api_view(['GET', 'POST'])
def exercise_list_create(request):
    if request.method == 'GET':
        exercises = Exercise.objects.all()
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 詳細、更新和刪除 (Read One, Update & Delete)
@api_view(['GET', 'PUT', 'DELETE'])
@csrf_exempt
def exercise_detail(request, pk):
    try:
        exercise = Exercise.objects.get(pk=pk)
    except Exercise.DoesNotExist:
        return Response({'error': 'Exercise not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # 序列化exercise
        exercise_data = ExerciseSerializer(exercise).data
        response_data = {
            'exercise': exercise_data,
        }

        return Response(response_data)

    if request.method == 'PUT':
        serializer = ExerciseSerializer(exercise, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        exercise.delete()
        return Response({'message': 'Exercise deleted successfully'}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def movement_list_create(request, exercise_id):
    # get all movements that belong to the exercise
    if request.method == 'GET':
        movements = Movement.objects.filter(exercise_id=exercise_id)
        serializer = MovementSerializer(movements, many=True)
        return Response(serializer.data)

    # add a new movement that belongs to the exercise
    if request.method == 'POST':
        request.data['exercise'] = exercise_id # add exercise_id to the request data before creating the movement
        serializer = MovementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def movement_detail(request, pk):
    try:
        movement = Movement.objects.get(pk=pk)  # 取得id為pk的Movement物件
    except Movement.DoesNotExist:
        return Response({'error': 'Movement not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MovementSerializer(movement)   # 序列化id為pk的Movement物件
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = MovementSerializer(movement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        movement.delete()
        return Response({'message': 'Movement deleted successfully'}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def workoutset_list_create(request, movement_id):
    # get all workoutsets that belong to the movement
    if request.method == 'GET':
        workout_sets = WorkoutSet.objects.filter(movement_id=movement_id)
        serializer = WorkoutSetSerializer(workout_sets, many=True)
        return Response(serializer.data)

    # add a new workoutset that belongs to the movement
    if request.method == 'POST':
        request.data['movement'] = movement_id
        serializer = WorkoutSetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def workoutset_detail(request, pk):
    try:
        workout_set = WorkoutSet.objects.get(pk=pk)
    except WorkoutSet.DoesNotExist:
        return Response({'error': 'WorkoutSet not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = WorkoutSetSerializer(workout_set)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = WorkoutSetSerializer(workout_set, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        workout_set.delete()
        return Response({'message': 'WorkoutSet deleted successfully'}, status=status.HTTP_200_OK)




# ===================== 傳統方式=====================

# # 列表 (Read All)
# def exercise_list(request):
#     exercises = Exercise.objects.all().values('id', 'name', 'description', 'calories_burned_per_hour', 'created_at', 'updated_at')
#     return JsonResponse(list(exercises), safe=False)
#
#
# # 詳細 (Read One)
# def exercise_detail(request, pk):
#     exercise = get_object_or_404(Exercise, pk=pk)
#     data = {
#         'id': exercise.id,
#         'name': exercise.name,
#         'description': exercise.description,
#         'calories_burned_per_hour': exercise.calories_burned_per_hour,
#         'created_at': exercise.created_at,
#         'updated_at': exercise.updated_at,
#     }
#     return JsonResponse(data)
#
# # 新增 (Create)
# @csrf_exempt
# def exercise_create(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         exercise = Exercise.objects.create(
#             name=data.get('name'),
#             description=data.get('description', ''),
#             calories_burned_per_hour=data.get('calories_burned_per_hour', 0)
#         )
#         return JsonResponse({'id': exercise.id, 'message': 'Exercise created successfully.'}, status=201)
#
# # 編輯 (Update)
# @csrf_exempt
# def exercise_update(request, pk):
#     exercise = get_object_or_404(Exercise, pk=pk)
#     if request.method == 'PUT':
#         data = json.loads(request.body)
#         exercise.name = data.get('name', exercise.name)
#         exercise.description = data.get('description', exercise.description)
#         exercise.calories_burned_per_hour = data.get('calories_burned_per_hour', exercise.calories_burned_per_hour)
#         exercise.save()
#         return JsonResponse({'message': 'Exercise updated successfully.'}, status=200)
#
# # 刪除 (Delete)
# @csrf_exempt
# def exercise_delete(request, pk):
#     exercise = get_object_or_404(Exercise, pk=pk)
#     if request.method == 'DELETE':
#         exercise.delete()
#         return JsonResponse({'message': 'Exercise deleted successfully.'}, status=200)
