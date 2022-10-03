from rest_framework import status, serializers, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework.renderers import JSONRenderer
from rest_framework.generics import UpdateAPIView
from rest_framework.decorators import action
from .serializers import UserSerializer, RoomSerializer

from .models import Room

WRITE_METHODS = []

class UserViewSet(viewsets.ModelViewSet):
    model = User
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_permissions(self, *args, **kwargs):
        pk = self.kwargs.get('pk', None)
        if self.request.method == 'POST':
            self.permission_classes = (AllowAny,)
        elif (str(self.request.user.id) == pk) or self.request.user.is_superuser:
            self.permission_classes = (IsAuthenticated,)
        else:
            self.permission_classes = (IsAdminUser,)
        return super(UserViewSet, self).get_permissions()



class RoomViewSet(viewsets.ModelViewSet):
    model = Room
    serializer_class = RoomSerializer
    permission_classes = (IsAuthenticated, )
    queryset = Room.objects.all()

    def create(self, request, *args, **kwargs):
        room = Room()
        room.code = room.generate_unique_code()
        room.save()
        return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
    
    def retrieve(self, request, pk=None):
        room = get_object_or_404(Room, code=pk)
        serializer = RoomSerializer(room)
        return Response(serializer.data)
        
    @action(detail=True, methods=['patch'])
    def connect(self, request, pk=None):
        room = get_object_or_404(Room, code=pk)
        try:
            character = request.data['character']
        except KeyError:
            raise serializers.ValidationError({"room": "specify charachter"})
        if character == 'x' or character == 'o':
            connected = room.connect(request.user, character)
            if connected:
                return Response(self.get_serializer(room,    context=self.get_serializer_context()).data)
            else:
                return Response({"answer":"unable to connect"}, status.HTTP_409_CONFLICT)
        else:
            raise serializers.ValidationError({"room": "invalid character ( only 'x' or 'o' allowed)"})

    @action(detail=True, methods=['patch'])
    def disconnect(self, request, pk=None):

        room = get_object_or_404(Room, code = pk)
        leaved = room.leave(request.user)
        if leaved:
            return Response({"room": self.get_serializer(room,    context=self.get_serializer_context()).data})
        else:
            return Response({"answer": "User not connected to that room"})

    def get_permissions(self, *args, **kwargs):
        
        if self.action == 'list':
            self.permission_classes = (IsAdminUser,)
        if self.action == 'retrive':
            pk = self.kwargs.get('pk', None)
            
        return super(RoomViewSet, self).get_permissions()