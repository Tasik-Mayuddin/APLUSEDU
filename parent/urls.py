from django.urls import path
from . import views

urlpatterns = [
    path('parent_dashboard/', views.pDash, name='p-dash'),
    path('parent_students/', views.pStud, name='p-stud'),
]