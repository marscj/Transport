from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.db.models import Count
import django_filters

from middleware.permission import CustomModelPermissions
from .models import Itinerary, Category, Price, Vehicle
from .serializers import ItinerarySerializer, CategorySerializer, PriceSerializer, VehicleSerializer, SeatSerializer

class PriceFilter(django_filters.FilterSet):
    category = django_filters.NumberFilter('category__id')

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

    filterset_fields = ('category',)
    filter_class = PriceFilter

class VehicleView(ModelViewSet):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Vehicle.objects.all()

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticatedOrReadOnly])
    def seats(self, request):
        category = request.query_params.get('category', None)
        query = None
        if category:
            query = Vehicle.objects.filter(category__id=category).values('seats').annotate(count=Count('seats')).order_by('seats')
        else:
            query = Vehicle.objects.values('seats').annotate(count=Count('seats')).order_by('seats')
        # Vehicle.objects.values('seats').distinct()
        serializer = SeatSerializer(instance=query, many=True)
        return Response(serializer.data) 