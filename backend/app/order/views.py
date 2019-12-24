from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from middleware.permission import CustomModelPermissions

from middleware.mixin import CreateSerializerMixin
from .models import Order, OrderItinerary
from .serializers import OrderSerializer, OrderCreateSerializer, OrderItinerarySerializer

class OrderView(ModelViewSet, CreateSerializerMixin):
    serializer_class = OrderSerializer
    serializer_create_class = OrderCreateSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Order.objects.all()

class OrderItineraryView(ModelViewSet):
    serializer_class = OrderItinerarySerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = OrderItinerary.objects.all()