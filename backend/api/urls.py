from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.SimpleRouter()
router.register(r'users', views.UserViewSet)
router.register(r'room', views.RoomViewSet)

urlpatterns = [
    path('', include(router.get_urls())),
]
