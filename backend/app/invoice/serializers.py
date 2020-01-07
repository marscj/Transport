from rest_framework import serializers
from django.db import transaction

from .models import Invoice
from app.order.models import Order
from app.user.serializers import UserSimpleSerializer
from app.user.models import User

class InvoiceSerlizer(serializers.ModelSerializer):

    order = serializers.PrimaryKeyRelatedField(required=False, allow_null=True, many=True, queryset=Order.objects.all())

    customer = UserSimpleSerializer(read_only=True)

    customer_id = serializers.IntegerField(write_only=True)

    start_date = serializers.DateField(required=True)

    end_date = serializers.DateField(required=True)
 
    class Meta:
        model = Invoice
        fields = '__all__'

    @transaction.atomic
    def create(self, validate_data):
        orders = validate_data.pop('order', None)
        invoice = Invoice.objects.create(**validate_data)
        
        if orders is not None:
            for order in orders:
                order.invoice = invoice
                order.save()

        return invoice

    @transaction.atomic
    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.remark = validated_data.get('remark', instance.remark)
        instance.customer_id = validated_data.get('customer_id', instance.customer_id)

        orders = validated_data.pop('order', None)
        
        if orders is not None:
            query_set = Order.objects.filter(invoice=instance)
            
            for qs in query_set:
                qs.invoice = None
                qs.save()
            
            for order in orders:
                order.invoice = instance
                order.save()

        instance.save()

        return instance