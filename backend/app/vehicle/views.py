from django.http import Http404
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, DjangoModelPermissions
from django.db.models import Count
import django_filters
from django_filters.fields import Lookup

from middleware.permission import CustomModelPermissions, CustomModelOrSafePermissions
from .models import Itinerary, Category, Price, Vehicle
from .serializers import ItinerarySerializer, CategorySerializer, PriceSerializer, VehicleSerializer, SeatSerializer

class PriceFilter(django_filters.FilterSet):
    category = django_filters.NumberFilter('category__id')

class CharInFilter(django_filters.BaseInFilter, django_filters.CharFilter):
    pass

class VehicleFilter(django_filters.FilterSet):
    license_plate = django_filters.CharFilter('license_plate')
    model = django_filters.CharFilter('model')
    seats = django_filters.NumberFilter('seats', lookup_expr=('gte'),)
    category = django_filters.CharFilter('category__id')
    category_name = django_filters.CharFilter('category__name')
    driver = django_filters.CharFilter('driver__username')
    supplier = django_filters.CharFilter('supplier')
    is_active = django_filters.BooleanFilter('is_active')
    start_0 = django_filters.DateFilter('order__start_date', lookup_expr='gt', exclude=True)
    start_1 = django_filters.DateFilter('order__start_date', lookup_expr='lt', exclude=True)
    end_0 = django_filters.DateFilter('order__end_date', lookup_expr='gt', exclude=True)
    end_1 = django_filters.DateFilter('order__end_date', lookup_expr='lt', exclude=True)

class ItineraryView(ModelViewSet):
    serializer_class = ItinerarySerializer
    permission_classes = [DjangoModelPermissions]
    queryset = Itinerary.objects.all()

class CategoryView(ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [DjangoModelPermissions]
    queryset = Category.objects.all()

class PriceView(ModelViewSet):
    serializer_class = PriceSerializer
    permission_classes = [CustomModelOrSafePermissions]
    queryset = Price.objects.order_by('category', 'itinerary')

    filterset_fields = ('category')
    filter_class = PriceFilter

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticatedOrReadOnly])
    def get_price(self, request):
        category = request.GET['category']
        itinerary = request.GET['itinerary']

        try:
            price = Price.objects.get(category__name=category, itinerary__id=itinerary)
        except Price.DoesNotExist:
            return Response('not found!', status=404)

        return Response({'price': price.price})

class VehicleView(ModelViewSet):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated, CustomModelPermissions]
    queryset = Vehicle.objects.all()

    filter_class = VehicleFilter

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