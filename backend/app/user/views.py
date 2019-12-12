from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.models import Group, Permission

from .serializers import UserDetailSerializer, GroupSerializer, PermissionSerializer
from .models import CustomUser

class UserView(ModelViewSet):
    serializer_class = UserDetailSerializer
    queryset = CustomUser.objects.all()

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def info(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class RoleView(ModelViewSet):
    serializer_class = GroupSerializer
    pagination_class = None
    queryset = Group.objects.all()

class PermissionView(ModelViewSet):
    serializer_class = PermissionSerializer
    pagination_class = None
    queryset = Permission.objects.filter(Q(content_type__model__in=['customuser', 'site']) & Q(codename__in=['add', 'view', 'change', 'delete', 'export']))
    