from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from middleware.permission import CustomModelPermissions

from .models import Itinerary, Seat, Price, Vehicle
from .serializers import ItinerarySerializer, SeatSerializer, PriceSerializer, VehicleSerializer

class ItineraryView(ModelViewSet):
    serializer_class = ItinerarySerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Itinerary.objects.all()

class SeatView(ModelViewSet):
    serializer_class = SeatSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Seat.objects.all()

class PriceView(ModelViewSet):
    serializer_class = PriceSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Price.objects.order_by('seat', 'itinerary')

class VehicleView(ModelViewSet):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Vehicle.objects.all()