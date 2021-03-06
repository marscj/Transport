from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Itinerary, Category, Price, Vehicle
from app.driver.serializers import DriverSerlizer


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

    driver = DriverSerlizer(required=False, read_only=True)

    category_id = serializers.IntegerField(required=False, write_only=True, allow_null=True)

    driver_id = serializers.IntegerField(required=False, write_only=True, allow_null=True, validators=[UniqueValidator(queryset=Vehicle.objects.all())])

    class Meta:
        model = Vehicle
        fields = '__all__'

class VehicleSimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vehicle
        fields = (
            'id', 'license_plate'
        )

class SeatSerializer(serializers.Serializer):

    seats = serializers.IntegerField(read_only=True)

    count = serializers.IntegerField(read_only=True)
