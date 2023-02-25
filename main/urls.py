from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome, name = 'welcome'),
    # path('get_token', views.getToken, name = 'get-token'),


    path('tutor_dashboard/', views.tDash, name='t-dash'),
    path('tutor_profile/', views.tProf, name='t-prof'),
    path('tutor_subjects/', views.tSubj, name='t-subj'),
    path('tutor_timetable/', views.tTime, name='t-timetable'),
    path('job_requests/', views.tJob, name='t-job-requests'),
]

