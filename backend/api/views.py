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

    def get_permissions(self, *args, **kwargs):
        
        if self.action == 'list':
            self.permission_classes = (IsAdminUser,)
        if self.action == 'retrive':
            pk = self.kwargs.get('pk', None)
            
        return super(RoomViewSet, self).get_permissions()