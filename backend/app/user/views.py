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
    role = django_filters.CharFilter('role')
    vehicle = django_filters.BooleanFilter('vehicle', lookup_expr='isnull')
    username = django_filters.CharFilter('username')
    email = django_filters.CharFilter('email')
    company = django_filters.CharFilter('company')
    start_0 = django_filters.DateFilter('order_driver__start_date', lookup_expr='gt', exclude=True)
    start_1 = django_filters.DateFilter('order_driver__start_date', lookup_expr='lt', exclude=True)
    end_0 = django_filters.DateFilter('order_driver__end_date', lookup_expr='gt', exclude=True)
    end_1 = django_filters.DateFilter('order_driver__end_date', lookup_expr='lt', exclude=True)

class UserView(ModelViewSet):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = User.objects.all()

    filter_class = UserFilter

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
    queryset = Permission.objects.filter(content_type__model__in=['user', 'group', 'vehicle', 'order', 'itinerary', 'category', 'price', 'orderitinerary', 'invoice'])
    