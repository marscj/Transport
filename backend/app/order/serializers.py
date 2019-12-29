from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.db import transaction

from .models import Order, OrderItinerary
from app.user.models import User

class OrderItinerarySerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItinerary
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    order_itinerary = OrderItinerarySerializer(read_only=True, many=True)
    
    class Meta:
        model = Order
        fields = '__all__'

class OrderCreateSerializer(serializers.ModelSerializer):

    start_date = serializers.DateField(required=True, allow_null=False)

    end_date = serializers.DateField(required=True, allow_null=False)

    category = serializers.CharField(required=True, allow_null=False, max_length=64)

    seats = serializers.IntegerField(required=True, allow_null=False, min_value=2)

    itinerary = serializers.CharField(required=True, allow_null=False, max_length=1024)

    passenger = serializers.IntegerField(required=True, allow_null=False)

    class Meta:
        model = Order
        fields = '__all__'

    def validate(self, validate_data):
        return validate_data

    def get_user(self):
        return self.context['request'].user

    @transaction.atomic
    def create(self, validate_data):
        customer_id = self.get_user().id
        customer = self.get_user().username
        order = Order.objects.create(**validate_data, customer_id=customer_id, customer=customer)
        return order

    @transaction.atomic
    def update(self, instance, validated_data):
        if instance.operator_id is None and self.get_user().role == User.Role.Operator :
            operator_id = self.get_user().id
            operator = self.get_user().username
            instance.save() 
        
        return super().update(instance, validated_data)
