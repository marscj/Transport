from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.db import transaction

from .models import Order, OrderItinerary
from app.user.models import User
from app.user.serializers import UserSimpleSerializer
from app.vehicle.serializers import VehicleSimpleSerializer, ItinerarySerializer
from app.invoice.serializers import InvoiceSerlizer
from app.driver.serializers import DriverSerlizer

class OrderItinerarySerializer(serializers.ModelSerializer):

    date = serializers.DateField(required=True, allow_null=False)

    time = serializers.TimeField(required=False, allow_null=True)

    price = serializers.DecimalField(required=True, allow_null=False, max_digits=8, decimal_places=2)

    payment = serializers.DecimalField(required=False, allow_null=False, max_digits=8, decimal_places=2)

    itinerary = ItinerarySerializer(read_only=True)

    order_id = serializers.IntegerField(required=True, write_only=True, allow_null=False)

    itinerary_id = serializers.IntegerField(required=True, write_only=True, allow_null=False)

    class Meta:
        model = OrderItinerary
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    vehicle = VehicleSimpleSerializer(read_only=True)

    vehicle_id = serializers.IntegerField(required=False, write_only=True, allow_null=True)

    driver = DriverSerlizer(read_only=True)

    driver_id = serializers.IntegerField(required=False, write_only=True, allow_null=True)

    operator = UserSimpleSerializer(read_only=True)

    operator_id = serializers.IntegerField(required=False, write_only=True, allow_null=True)

    customer = UserSimpleSerializer(read_only=True)

    customer_id = serializers.IntegerField(required=False, write_only=True, allow_null=True)

    invoice = InvoiceSerlizer(read_only=True)

    invoice_id = serializers.IntegerField(required=False, write_only=True, allow_null=True)

    order_itinerary = OrderItinerarySerializer(read_only=True, many=True)
    
    class Meta:
        model = Order
        fields = (
            'id', 'orderId', 'relatedId', 'create_at', 'start_date', 'end_date', 'vehicle', 'vehicle_id', 
            'status', 'is_lock', 'category', 'seats', 'passenger', 'remark', 'itinerary',
            'driver', 'driver_id', 'operator', 'operator_id', 'customer', 'customer_id', 'invoice', 'invoice_id', 'order_itinerary', 'total'
        )

    def get_user(self):
        return self.context['request'].user

    @transaction.atomic
    def update(self, instance, validated_data):

        instance.relatedId = validated_data.get('relatedId', instance.relatedId)
        instance.status = validated_data.get('status', instance.status)
        instance.is_lock = validated_data.get('is_lock', instance.is_lock)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.category = validated_data.get('category', instance.category)
        instance.seats = validated_data.get('seats', instance.seats)
        instance.passenger = validated_data.get('passenger', instance.passenger)
        instance.itinerary = validated_data.get('itinerary', instance.itinerary)
        instance.remark = validated_data.get('remark', instance.remark)
        instance.vehicle_id = validated_data.get('vehicle_id', instance.vehicle_id)
        instance.driver_id = validated_data.get('driver_id', instance.driver_id)
        instance.customer_id = validated_data.get('customer_id', instance.customer_id)
        instance.operator_id = validated_data.get('operator_id', instance.operator_id)
        instance.invoice_id = validated_data.get('invoice_id', instance.invoice_id)

        if instance.status != Order.OrderStatus.New:
            instance.is_lock = True
        
        if instance.operator_id is None and self.get_user().role == User.Role.Operator:
            instance.operator_id = self.get_user().id
        
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
        order = Order.objects.create(**validate_data, customer_id=customer_id)
        return order
