from rest_framework.serializers import ModelSerializer, ValidationError
from django.contrib.auth.models import User
from django.core import exceptions
import django.contrib.auth.password_validation as validators
from .models import Room


class UserSerializer(ModelSerializer):

    def validate_password(self, value):
        try:
            validators.validate_password(value)
        except ValidationError as exc:
            raise serializers.ValidationError(str(exc))
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name', 'last_name',
            'is_active', 'last_login', 'is_superuser', 'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
            'is_superuser': {'read_only': True},
            'last_login': {'read_only': True}
        }


class RoomSerializer(ModelSerializer):

    class Meta:
        model = Room
        fields = ('id', 'is_occupied', 'code', 'x_user', 'o_user')

        extra_kwargs = {
            'code': {'read_only': True},
            'o_user': {'required': False, 'allow_null': True},
            'x_user': {'required': False, 'allow_null': True}
        }
