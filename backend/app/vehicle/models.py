from django.db import models

from app.user.models import User

class VehicleModel(models.Model):

    class Model(models.IntegerChoices):
        Car = 5
        Bus = 11
    
    name = models.CharField(blank=True, null=True, max_length=64)

    model = models.IntegerField(default=Model.Bus, choices=Model.choices,  max_length=3)

    price = models.DecimalField(max_digits=8, decimal_places=2)

    cost_price = models.DecimalField(max_digits=8, decimal_places=2)

    passengers = models.IntegerField(default=5)

class Vehicle(models.Model):

    license_plate = models.CharField(blank=True, null=True, max_length=64)  

    is_active = models.BooleanField(default=True)

    model = models.ForeignKey(VehicleModel, on_delete=models.SET_NULL, related_name='vehicle', blank=True, null=True)

    driver = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='vehicle', blank=True, null=True)

