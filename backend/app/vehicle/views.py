from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from middleware.permission import CustomModelPermissions
from django.db.models import Count

from .models import Itinerary, Category, Price, Vehicle
from .serializers import ItinerarySerializer, CategorySerializer, PriceSerializer, VehicleSerializer, SeatSerializer

class ItineraryView(ModelViewSet):
    serializer_class = ItinerarySerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Itinerary.objects.all()

class CategoryView(ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Category.objects.all()

class PriceView(ModelViewSet):
    serializer_class = PriceSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Price.objects.order_by('category', 'itinerary')

class VehicleView(ModelViewSet):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Vehicle.objects.all()

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticatedOrReadOnly])
    def getSeats(self, request):
        query = Vehicle.objects.values('seats').annotate(Count('seats')).order_by('seats')
        # Vehicle.objects.values('seats').distinct()
        serializer = SeatSerializer(instance=query, many=True, context=self.context)
        return Response(serializer.data) 