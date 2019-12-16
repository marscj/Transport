from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from django.db.models import Q
from django.contrib.auth.models import Group, Permission

from .serializers import UserDetailSerializer, GroupSerializer, PermissionSerializer, RoleSerializer
from .models import User, Role

class CustomPermissson(DjangoModelPermissions):
    
    perms_map = {
        'GET': ['%(app_label)s.view_%(model_name)s'],
        'OPTIONS': [],
        'HEAD': [],
        'POST': ['%(app_label)s.add_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.delete_%(model_name)s'],
    }

class UserView(ModelViewSet):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated, CustomPermissson]
    queryset = User.objects.all()

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, DjangoModelPermissions])
    def info(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

# class RoleView(ModelViewSet):
#     serializer_class = GroupSerializer
#     pagination_class = None
#     permission_classes = [IsAuthenticated, CustomPermissson]
#     queryset = Group.objects.all()

class RoleView(ModelViewSet):
    serializer_class = RoleSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated, CustomPermissson]
    queryset = Role.objects.all()

class PermissionView(ModelViewSet):
    serializer_class = PermissionSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated]
    queryset = Permission.objects.filter(content_type__model__in=['user', 'role', 'vehicle', 'order'])
    