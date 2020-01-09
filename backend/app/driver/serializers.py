from rest_framework import serializers

from .models import Driver

class DriverSerlizer(serializers.ModelSerializer):

    class Meta:
        model = Driver
        fields = '__all__'