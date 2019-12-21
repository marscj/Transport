from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from middleware.permission import CustomModelPermissions

from .models import Order, OrderItinerary
from .serializers import OrderSerializer, OrderItinerarySerializer

class OrderView(ModelViewSet):
    serializer_class = OrderSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Order.objects.all()

class OrderItineraryView(ModelViewSet):
    serializer_class = OrderItinerarySerializer
    pagination_class = None
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = OrderItinerary.objects.all()