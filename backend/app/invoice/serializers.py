from rest_framework import serializers
from django.db import transaction

from .models import Invoice
from app.order.models import Order

class InvoiceSerlizer(serializers.ModelSerializer):

    orderIds = serializers.PrimaryKeyRelatedField(write_only=True,many=True, queryset=Order.objects.all())

    class Meta:
        model = Invoice
        fields = '__all__'

    @transaction.atomic
    def create(self, validate_data):
        orderIds = validate_data.pop('orderIds', None)
        invoice = Invoice.objects.create(**validate_data)
        
        if orderIds is not None:
            for ids in orderIds:
                ids.invoice = invoice
                ids.save()

        return invoice

    @transaction.atomic
    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.date = validated_data.get('date', instance.date)
        instance.remark = validated_data.get('remark', instance.remark)

        orderIds = validated_data.pop('orderIds', None)
        
        if orderIds is not None:
            query_set = Order.objects.filter(invoice=instance)
            
            for qs in query_set:
                qs.invoice = None
                qs.save()
            
            for ids in orderIds:
                try:
                    order = Order.objects.get(pk=ids)
                    order.invoice_id = invoice.id
                    order.save()
                except Order.DoesNotExist:
                    pass

        instance.save()

        return instance