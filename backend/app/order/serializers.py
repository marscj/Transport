from rest_framework import serializers

from .models import Order, OrderItinerary

class OrderItinerarySerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItinerary
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'

class OrderCreateSerializer(serializers.ModelSerializer):

    start_date = serializers.DateField(required=False)

    end_date = serializers.DateField(required=False)

    category = serializers.CharField(required=False, max_length=64)

    seats = serializers.IntegerField(required=False, min_value=2)

    itinerary = serializers.CharField(required=False, max_length=1024)

    class Meta:
        model = Order
        fields = '__all__'

    