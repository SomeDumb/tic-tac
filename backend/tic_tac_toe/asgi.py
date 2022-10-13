"""
ASGI config for tic_tac_toe project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import path, re_path
from api.middleware import TokenAuthMiddleware
from api.routing import ws_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.dev")


application = ProtocolTypeRouter({
  "websocket": AllowedHostsOriginValidator(
            TokenAuthMiddleware(URLRouter(ws_urlpatterns))),
})

get_asgi_application()