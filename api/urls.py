from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),

    path('children', views.childrenList, name="children"),
    path('children/<int:id>', views.child, name="child"),
    
    path('levels', views.levelList, name="levels"),
    path('subjects', views.subjectList, name="subjects"),



]