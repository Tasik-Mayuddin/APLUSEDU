from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),

    path('children-list/', views.childrenList, name="subject-list"),
    path('add-child/', views.addChild, name="add-child"),
]