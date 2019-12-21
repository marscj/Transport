from rest_framework.viewsets import ModelViewSet
from middleware.permission import CustomModelPermissions

from .models import Itinerary, Seat, Price, Vehicle
from .serializers import ItinerarySerializer, SeatSerializer, PriceSerializer, VehicleSerializer

class ItineraryView(ModelViewSet):
    serializer_class = ItinerarySerializer
    pagination_class = None
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Itinerary.objects.all()

class SeatView(ModelViewSet):
    serializer_class = SeatSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Seat.objects.all()

class PriceView(ModelViewSet):
    serializer_class = PriceSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Price.objects.all()

class VehicleView(ModelViewSet):
    serializer_class = VehicleSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Vehicle.objects.all()