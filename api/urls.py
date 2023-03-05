from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),

    path('children', views.childrenList, name="children-list"),
    path('children/<int:id>', views.child, name="child"),
    path('children/<int:id>/allocations', views.studentAllocations, name="student-allocations"),

    path('tutors', views.tutorQuery, name="tutors"),
    path('tutors/<int:id>/availability', views.tutorAvailability, name="tutor-availability"),

    path('levels', views.levelList, name="levels"),
    path('subjects', views.subjectList, name="subjects"),



]