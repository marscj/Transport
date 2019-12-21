from rest_framework import serializers


from .models import Itinerary, Category, Price, Vehicle

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

    class Meta:
        model = Vehicle
        fields = '__all__'