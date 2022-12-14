import json
from django.core.exceptions import ObjectDoesNotExist
from channels.generic.websocket import JsonWebsocketConsumer
from time import sleep
from api.serializers import UserSerializer
from rest_framework.renderers import JSONRenderer
from asgiref.sync import async_to_sync
from .models import Room


class WSConsumer(JsonWebsocketConsumer):

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['code']
        self.room_group_name = 'room_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        room_code = self.scope['url_route']['kwargs']['code']
        character = self.scope['url_route']['kwargs']['character']
        try:
            room = Room.objects.get(code=room_code)
        except ObjectDoesNotExist:
            self.close()
            return
        user = self.scope["user"]
        if not room.is_occupied:
            connected = room.connect(user, character)
            if connected:
                self.accept()
                self.send(text_data=json.dumps({
                    'connected': True
                }))
                if room.is_occupied:
                    json_x_user = UserSerializer(room.x_user).data
                    json_o_user = UserSerializer(room.o_user).data
                    
                    async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                        'type': 'send_event',
                        'ready': True,
                        'x' : json_x_user,
                        'o' : json_o_user
                    })
            else:
                self.close()
        else:
            self.close()

    def disconnect(self, close_code):
        room_code = self.scope['url_route']['kwargs']['code']
        try:
            room = Room.objects.get(code=room_code)
        except ObjectDoesNotExist:
            return
        user = self.scope["user"]
        room.leave(user)
        async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
            'type': 'send_event',
            'ready': False
        })

    def receive(self, text_data):
        user = self.scope["user"]
        response = json.loads(text_data)
        event = response.get("event", None)
        message = response.get("message", None)
        if event == 'MOVE':
            # Send message to room group
            async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'send_event',
                **response
            })

        if event == 'MESSAGE':
            async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'send_message',
                'event': 'message',
                'message': message
                })

    def send_event(self, event):
        """ Receive message from room group """
        # Send message to WebSocket
        self.send(text_data=json.dumps({**event}))

    def send_message(self, event):
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'type': 'message',
            **event
        }))
