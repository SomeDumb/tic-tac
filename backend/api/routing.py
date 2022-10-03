from django.urls import path
from .consumers import WSConsumer

ws_urlpatterns = [
    path("ws/room/<str:character>/<str:code>/", WSConsumer.as_asgi()),
]