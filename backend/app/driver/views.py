from rest_framework.viewsets import ModelViewSet
from middleware.permission import CustomModelPermissions, CustomModelOrSafePermissions

import django_filters

from .models import Driver
from .serializers import DriverSerlizer

class DriverFilter(django_filters.FilterSet):
    name = django_filters.CharFilter('name')
    vehicle = django_filters.BooleanFilter('vehicle', lookup_expr='isnull')
    is_active = django_filters.BooleanFilter('is_active')
    start_0 = django_filters.DateFilter('order__start_date', lookup_expr='gt', exclude=True)
    start_1 = django_filters.DateFilter('order__start_date', lookup_expr='lt', exclude=True)
    end_0 = django_filters.DateFilter('order__end_date', lookup_expr='gt', exclude=True)
    end_1 = django_filters.DateFilter('order__end_date', lookup_expr='lt', exclude=True)

class DriverView(ModelViewSet):
    serializer_class = DriverSerlizer
    permission_classes = [CustomModelOrSafePermissions]
    queryset = Driver.objects.all()

    filter_class = DriverFilter