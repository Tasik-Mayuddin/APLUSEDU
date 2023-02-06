from django.urls import path
from . import views

urlpatterns = [
    path('parent_dashboard/', views.pDash, name='p-dash'),
    path('parent_students/', views.pStud, name='p-stud'),
    path("student/<int:id>", views.pStudID, name="p-stud-id"),
    path("student/<int:id>/tutor_list", views.pStudTut, name="p-stud-tut"),
]