from rest_framework.viewsets import ModelViewSet
from middleware.permission import CustomModelPermissions
import django_filters

from .serializers import InvoiceSerlizer
from .models import Invoice

class InvoiceFilter(django_filters.FilterSet):
    start_0 = django_filters.DateFilter('start_date', lookup_expr='gte')
    start_1 = django_filters.DateFilter('start_date', lookup_expr='lte')
    end_0 = django_filters.DateFilter('end_date', lookup_expr='gte')
    end_1 = django_filters.DateFilter('end_date', lookup_expr='lte')
    status = django_filters.CharFilter('status')

class InvoiceView(ModelViewSet):
    serializer_class = InvoiceSerlizer
    permission_classes = [CustomModelPermissions]
    queryset = Invoice.objects.all()
    
    filter_class = InvoiceFilter