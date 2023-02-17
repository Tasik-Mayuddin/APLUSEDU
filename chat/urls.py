from django.urls import path

from . import views


urlpatterns = [
    path("<str:room_id>/", views.room, name="room"),
]