from rest_framework import serializers


from .models import Itinerary, Seat, Price, Vehicle

class ItinerarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Itinerary
        fields = '__all__'

class SeatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Seat
        fields = '__all__'

class PriceSerializer(serializers.ModelSerializer):

    itinerary = ItinerarySerializer(required=False, read_only=True)

    seat = SeatSerializer(required=False, read_only=True)
    
    class Meta:
        model = Price
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vehicle
        fields = '__all__'