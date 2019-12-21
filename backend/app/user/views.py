from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from django.db.models import Q
from django.contrib.auth.models import Group, Permission

from middleware.permission import IsAuthenticatedAndReadOnly, CustomModelPermissions
from .serializers import UserDetailSerializer, GroupDetailSerializer, PermissionSerializer
from .models import User

class UserView(ModelViewSet):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = User.objects.all()

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, DjangoModelPermissions])
    def info(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class UserGroupView(ModelViewSet):
    serializer_class = GroupDetailSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Group.objects.all()

class PermissionView(ModelViewSet):
    serializer_class = PermissionSerializer
    permission_classes = [IsAuthenticatedAndReadOnly]
    queryset = Permission.objects.filter(content_type__model__in=['user', 'group', 'vehicle', 'order', 'itinerary', 'seat', 'price', 'orderitinerary'])
    