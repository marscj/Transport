from django.db import models

from app.vehicle.models import Vehicle, Itinerary
from app.user.models import User

class Order(models.Model):
    
    class OrderStatus(models.IntegerChoices):
        New = 1
        Pending = 2
        Cancel = 3
        Complete = 4

    orderId = models.CharField(blank=True, null=True, max_length=64)

    relatedId = models.CharField(blank=True, null=True, max_length=64)

    status = models.IntegerField(default=OrderStatus.New, choices=OrderStatus.choices)

    start_date = models.DateField(blank=True, null=True)

    end_date = models.DateField(blank=True, null=True)

    category = models.CharField(blank=True, null=True, max_length=64)

    seats = models.IntegerField(default=5)

    itinerary = models.TextField(blank=True, null=True)

    remark = models.TextField(blank=True, null=True)

    vehicl_id = models.IntegerField(blank=True, null=True)

    vehicle = models.CharField(blank=True, null=True, max_length=64)

    driver_id = models.IntegerField(blank=True, null=True)

    driver = models.CharField(blank=True, null=True, max_length=150)

    customer_id = models.IntegerField(blank=True, null=True)

    customer = models.CharField(blank=True, null=True, max_length=150)

    class Meta:
        db_table = 'order'

class OrderItinerary(models.Model):

    date = models.DateField(blank=True, null=True)

    time = models.TimeField(blank=True, null=True)

    price = models.DecimalField(default=0.0, max_digits=8, decimal_places=2)

    itinerary = models.ForeignKey(Itinerary, on_delete=models.SET_NULL, related_name='order_itinerary', blank=True, null=True)

    order = models.ForeignKey(Order, on_delete=models.SET_NULL, related_name='order_itinerary', blank=True, null=True)

    class Meta:
        db_table = 'order_itinerary'
