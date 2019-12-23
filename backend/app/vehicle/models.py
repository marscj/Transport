from django.db import models

from app.user.models import User

class Itinerary(models.Model):
    
    name = models.CharField(blank=True, null=True, max_length=128)

    class Meta:
        db_table = 'itinerary'

class Category(models.Model):
        
    name = models.CharField(blank=True, null=True, max_length=64)

    class Meta:
        db_table = 'category'

class Price(models.Model):

    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='price', blank=True, null=True)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='price', blank=True, null=True)

    price = models.DecimalField(default=0.0, max_digits=8, decimal_places=2)

    class Meta:
        db_table = 'price'

class Vehicle(models.Model):

    license_plate = models.CharField(blank=True, null=True, max_length=64)  

    is_active = models.BooleanField(default=True)

    seats = models.IntegerField(default=5)

    model = models.CharField(blank=True, null=True, max_length=64) 

    supplier = models.CharField(blank=True, null=True, max_length=64) 

    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='vehicle', blank=True, null=True)

    driver = models.OneToOneField(User, on_delete=models.SET_NULL, related_name='vehicle', blank=True, null=True)

    class Meta:
        db_table = 'vehicle'
