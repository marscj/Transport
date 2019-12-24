from rest_framework import serializers
from rest_framework.validators import UniqueValidator

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

    start_date = serializers.DateField(required=True, allow_null=False)

    end_date = serializers.DateField(required=True, allow_null=False)

    category = serializers.CharField(required=True, allow_null=False, max_length=64)

    seats = serializers.IntegerField(required=True, allow_null=False, min_value=2)

    itinerary = serializers.CharField(required=True, allow_null=False, max_length=1024)

    class Meta:
        model = Order
        fields = '__all__'

    def validate(self, validate_data):
        print(validate_data.get('start_date', None), '=====')
        print(validate_data.get('end_date', None), '=====')
        print(validate_data.get('category', None), '=====')
        print(validate_data.get('seats', None), '=====')
        print(validate_data.get('itinerary', None), '=====')
        return validate_data

    