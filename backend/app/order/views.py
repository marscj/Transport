from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from middleware.permission import CustomModelPermissions

from middleware.mixin import CreateSerializerMixin
from .models import Order, OrderItinerary
from .serializers import OrderSerializer, OrderCreateSerializer, OrderItinerarySerializer
from app.user.models import User

class OrderView(CreateSerializerMixin, ModelViewSet):
    serializer_class = OrderSerializer
    serializer_create_class = OrderCreateSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Order.objects.all()

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