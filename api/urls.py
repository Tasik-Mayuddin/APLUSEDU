from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('subject-list/', views.subjectList, name="subject-list"),
]