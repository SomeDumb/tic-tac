from django.urls import path
from .consumers import WSConsumer

ws_urlpatterns = [
    path("ws/room/<str:code>/<str:character>", WSConsumer.as_asgi()),
]