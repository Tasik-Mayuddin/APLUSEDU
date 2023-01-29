from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome, name = 'welcome'),
    path('tutor_dashboard/', views.tDash, name='t-dash'),
    path('tutor_profile/', views.tProf, name='t-prof')
]