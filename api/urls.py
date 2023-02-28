from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),

    # GET
    path('children-list/', views.childrenList, name="subject-list"),
    path('level-list/', views.levelList, name="level-list"),
    path('subject-list/', views.subjectList, name="subject-list"),

    # POST
    path('add-child/', views.addChild, name="add-child"),
]