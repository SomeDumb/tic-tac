from rest_framework.permissions import BasePermission


class WriteOnly(BasePermission):

    def has_permission(self, request, view):
        WRITE_METHODS = ["POST", "PATCH"]

        return (request.method in WRITE_METHODS)
