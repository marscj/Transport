from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.db import transaction

from .models import Order, OrderItinerary
from app.user.models import User
from app.user.serializers import UserSimpleSerializer
from app.vehicle.serializers import VehicleSimpleSerializer

class OrderItinerarySerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItinerary
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    vehicle = VehicleSimpleSerializer(read_only=True)

    vehicle_id = serializers.IntegerField(required=False, write_only=True, allow_null=True)

    driver = UserSimpleSerializer(read_only=True)

    driver_id = serializers.IntegerField(required=False, write_only=True, allow_null=True)

    operator = UserSimpleSerializer(read_only=True)

    operator_id = serializers.IntegerField(required=False, write_only=True, allow_null=True)

    customer = UserSimpleSerializer(read_only=True)

    customer_id = serializers.IntegerField(required=False, write_only=True, allow_null=True)

    invoice = serializers.PrimaryKeyRelatedField(read_only=True)

    invoice_id = serializers.IntegerField(required=False, write_only=True, allow_null=True)

    order_itinerary = OrderItinerarySerializer(read_only=True, many=True)
    
    class Meta:
        model = Order
        fields = '__all__'

    def get_user(self):
        return self.context['request'].user

    @transaction.atomic
    def update(self, instance, validated_data):

        instance.relatedId = validated_data.get('relatedId', instance.relatedId)
        instance.status = validated_data.get('status', instance.status)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.category = validated_data.get('category', instance.category)
        instance.seats = validated_data.get('seats', instance.seats)
        instance.passenger = validated_data.get('passenger', instance.passenger)
        instance.itinerary = validated_data.get('itinerary', instance.itinerary)
        instance.remark = validated_data.get('remark', instance.remark)
        instance.vehicle_id = validated_data.get('vehicle_id', instance.vehicle_id)
        instance.vehicle = validated_data.get('vehicle', instance.vehicle)
        instance.driver_id = validated_data.get('driver_id', instance.driver_id)
        instance.driver = validated_data.get('driver', instance.driver)
        instance.driver_phone = validated_data.get('driver_phone', instance.driver_phone)
        instance.customer_id = validated_data.get('customer_id', instance.customer_id)
        instance.customer = validated_data.get('customer', instance.customer)
        instance.operator_id = validated_data.get('operator_id', instance.operator_id)
        instance.operator = validated_data.get('operator', instance.operator)
        instance.invoice_id = validated_data.get('invoice_id', instance.invoice_id)
        
        if instance.operator_id is None and self.get_user().role == User.Role.Operator:
            instance.operator_id = self.get_user().id
            instance.operator = self.get_user().username
        
        instance.save()

        return instance

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
