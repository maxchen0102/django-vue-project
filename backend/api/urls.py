# backend/api/urls.py
from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    path('data/', views.data, name='data'),
    path('exercises/', views.exercise_list_create, name='exercise_list_create'),
    path('exercises/<int:pk>/', views.exercise_detail, name='exercise_detail'),

    # get the list of movements for a specific exercise
    path('movements/<int:exercise_id>/', views.movement_list_create, name='movement_list_create'),
    path('movements/<int:pk>/', views.movement_detail, name='movement_detail'),

    # get the list of workoutsets for a specific movement
    path('workoutsets/<int:movement_id>/', views.workoutset_list_create, name='workoutset_list_create'),
    path('workoutsets/<int:pk>/', views.workoutset_detail, name='workoutset_detail'),


    #get all data for homepage
    path('homepage/', views.homepage_data, name='homepage_data'),

    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),



]

# =============傳統方式================
#     path('exercises/', views.exercise_list, name='exercise_list'),
#     path('exercises/<int:pk>/', views.exercise_detail, name='exercise_detail'),
#     path('exercises/create/', views.exercise_create, name='exercise_create'),
#     path('exercises/<int:pk>/update/', views.exercise_update, name='exercise_update'),
#     path('exercises/<int:pk>/delete/', views.exercise_delete, name='exercise_delete'),
