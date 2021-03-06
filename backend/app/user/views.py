from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
import django_filters

from django.db.models import Q
from django.contrib.auth.models import Group, Permission

from middleware.permission import IsAuthenticatedAndReadOnly, CustomModelPermissions
from .serializers import UserDetailSerializer, GroupDetailSerializer, PermissionSerializer, ChangePasswordSerializer
from .models import User

class UserFilter(django_filters.FilterSet):
    id = django_filters.NumberFilter('id')
    role = django_filters.CharFilter('role')
    username = django_filters.CharFilter('username')
    email = django_filters.CharFilter('email')
    company = django_filters.CharFilter('company')

class UserView(ModelViewSet):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = User.objects.all()

    filter_class = UserFilter
    search_fields = ['username']

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, DjangoModelPermissions])
    def info(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated, DjangoModelPermissions])
    def admin_change_password(self, request, pk=None):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            user = self.get_object()
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'result': 'ok'})

class UserGroupView(ModelViewSet):
    serializer_class = GroupDetailSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Group.objects.all()

class PermissionView(ModelViewSet):
    serializer_class = PermissionSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    queryset = Permission.objects.filter(content_type__model__in=['user', 'group', 'vehicle', 'order', 'itinerary', 'category', 'price', 'orderitinerary', 'invoice', 'driver'])
    