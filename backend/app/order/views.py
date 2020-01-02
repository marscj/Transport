from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from middleware.permission import CustomModelPermissions
import django_filters

from middleware.mixin import CreateSerializerMixin
from .models import Order, OrderItinerary
from .serializers import OrderSerializer, OrderCreateSerializer, OrderItinerarySerializer
from app.user.models import User

class OrderFilter(django_filters.FilterSet):
    orderId = django_filters.CharFilter('orderId')
    relatedId = django_filters.CharFilter('relatedId')
    create_0 = django_filters.DateFilter('create_at', lookup_expr='gte')
    create_1 = django_filters.DateFilter('create_at', lookup_expr='lte')
    start_0 = django_filters.DateFilter('start_date', lookup_expr='gte')
    start_1 = django_filters.DateFilter('start_date', lookup_expr='lte')
    vehicle = django_filters.CharFilter('vehicle__license_plate')
    driver = django_filters.CharFilter('driver__username')
    customer = django_filters.CharFilter('customer__username')
    status = django_filters.CharFilter('status')

class OrderView(CreateSerializerMixin, ModelViewSet):
    serializer_class = OrderSerializer
    serializer_create_class = OrderCreateSerializer
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    
    filter_class = OrderFilter

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Order.objects.all()
        elif self.request.user.role == User.Role.Customer:
            return Order.objects.filter(customer_id=self.request.user.id)
        elif self.request.user.role == User.Role.Driver:
            return Order.objects.filter(driver_id=self.request.user.id)
        
        return Order.objects.all()

class OrderItineraryView(ModelViewSet):
    serializer_class = OrderItinerarySerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = OrderItinerary.objects.all()