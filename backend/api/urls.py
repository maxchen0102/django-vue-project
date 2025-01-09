# backend/api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    path('data/', views.data, name='data'),
    path('exercises/', views.exercise_list_create, name='exercise_list_create'),
    path('exercises/<int:pk>/', views.exercise_detail, name='exercise_detail'),


    path('movements/', views.movement_list_create, name='movement_list_create'),
    path('movements/<int:pk>/', views.movement_detail, name='movement_detail'),
    path('exercises/<int:exercise_id>/movements/', views.exercise_movements, name='exercise-movements'),

    path('workoutsets/', views.workoutset_list_create, name='workoutset_list_create'),
    path('workoutsets/<int:pk>/', views.workoutset_detail, name='workoutset_detail'),
    path('movements/<int:movement_id>/workoutsets/', views.movement_workoutsets, name='movement-workoutsets'),
]

# =============傳統方式================
#     path('exercises/', views.exercise_list, name='exercise_list'),
#     path('exercises/<int:pk>/', views.exercise_detail, name='exercise_detail'),
#     path('exercises/create/', views.exercise_create, name='exercise_create'),
#     path('exercises/<int:pk>/update/', views.exercise_update, name='exercise_update'),
#     path('exercises/<int:pk>/delete/', views.exercise_delete, name='exercise_delete'),
