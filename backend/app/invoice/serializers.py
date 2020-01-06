from rest_framework import serializers
from django.db import transaction

from .models import Invoice
from app.order.models import Order

class InvoiceSerlizer(serializers.ModelSerializer):

    order = serializers.PrimaryKeyRelatedField(required=False, allow_null=True, many=True, queryset=Order.objects.all())
 
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
        instance.date = validated_data.get('date', instance.date)
        instance.remark = validated_data.get('remark', instance.remark)

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