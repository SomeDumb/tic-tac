from django.db import models
from django.contrib.auth.models import User
import string
import random


class Room(models.Model):

    code = models.CharField(max_length=8, default="", unique=True)

    is_occupied = models.BooleanField(default=False)

    x_user = models.ForeignKey(User, related_name='%(class)s_x',
                               on_delete=models.SET_NULL, blank=True, null=True)

    o_user = models.ForeignKey(User, related_name='%(class)s_o',
                               on_delete=models.SET_NULL, blank=True, null=True)

    def leave(self, user):
        if self.x_user == user:
            self.x_user = None
            self.is_occupied = False
            self.save()
            return True
        elif self.o_user == user:
            self.o_user = None
            self.is_occupied = False
            self.save()
            return True
        return False

    def connect(self, user, character):

        if self.is_occupied or (self.o_user == user or self.x_user == user):
            return False

        if character == 'x' and (not self.x_user):
            self.x_user = user
            if self.o_user and self.x_user:
                self.is_occupied = True
            self.save()
        elif character == 'o' and (not self.o_user):
            self.o_user = user
            if self.o_user and self.x_user:
                self.is_occupied = True
            self.save()
        else:
            return False

        return True

    @staticmethod
    def generate_unique_code():
        length = 5

        while True:
            code = ''.join(random.choices(string.ascii_uppercase, k=length))
            if Room.objects.filter(code=code).count() == 0:
                break
        return code
