from rest_framework import serializers

from .models import Order, OrderItinerary

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'

class OrderItinerarySerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItinerary
        fields = '__all__'