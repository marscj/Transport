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

    status = models.CharField(default=OrderStatus.New, choices=OrderStatus.choices, max_length=16)

    start_date = models.DateField(blank=True, null=True)

    end_date = models.DateField(blank=True, null=True)

    remark = models.TextField(max_length=256, blank=True, null=True)

    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, related_name='order', blank=True, null=True)

    driver = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='order_driver', blank=True, null=True)

    customer = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='order_customer', blank=True, null=True)

    class Meta:
        db_table = 'order'

class OrderItinerary(models.Model):

    itinerary = models.ForeignKey(Itinerary, on_delete=models.SET_NULL, related_name='order_itinerary', blank=True, null=True)

    order = models.ForeignKey(Order, on_delete=models.SET_NULL, related_name='order_itinerary', blank=True, null=True)

    class Meta:
        db_table = 'order_itinerary'
