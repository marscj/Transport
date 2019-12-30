from rest_framework import serializers

from .models import Invoice

class InvoiceSerlizer(serializers.ModelSerializer):

    class Meta:
        model = Invoice
        fields = '__all__'

