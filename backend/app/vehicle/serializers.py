from rest_framework import serializers

from .models import Itinerary, Category, Price, Vehicle
from app.user.serializers import UserDetailSerializer

class ItinerarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Itinerary
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

class PriceSerializer(serializers.ModelSerializer):

    itinerary = ItinerarySerializer(required=False, read_only=True)

    category = CategorySerializer(required=False, read_only=True)
    
    class Meta:
        model = Price
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):

    category = CategorySerializer(required=False, read_only=True)

    driver = UserDetailSerializer(required=False, read_only=True)

    category_id = serializers.IntegerField(required=False, write_only=True, allow_null=True)

    driver_id = serializers.IntegerField(required=False, write_only=True, allow_null=True)

    class Meta:
        model = Vehicle
        fields = '__all__'

class SeatSerializer(serializers.Serializer):

    seats = serializers.IntegerField(read_only=True)

    seats__count = serializers.IntegerField(read_only=True)
