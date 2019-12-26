from django.db import models

from app.vehicle.models import Vehicle, Itinerary
from app.user.models import User

class Order(models.Model):
    
    class OrderStatus(models.TextChoices):
        New = 'New'
        Pending = 'Pending'
        Cancel = 'Cancel'
        Complete = 'Complete'

    orderId = models.CharField(blank=True, null=True, max_length=64)

    relatedId = models.CharField(blank=True, null=True, max_length=64)

    status = models.CharField(default=OrderStatus.New, choices=OrderStatus.choices, max_length=16)

    create_at = models.DateTimeField(auto_now_add=True)

    change_at = models.DateTimeField(auto_now=True)

    start_date = models.DateField(blank=True, null=True)

    end_date = models.DateField(blank=True, null=True)

    category = models.CharField(blank=True, null=True, max_length=64)

    seats = models.IntegerField(blank=True, null=True, default=5)

    passenger = models.IntegerField(blank=True, null=True, default=0)

    itinerary = models.TextField(blank=True, null=True)

    remark = models.TextField(blank=True, null=True)

    vehicl_id = models.IntegerField(blank=True, null=True)

    vehicle = models.CharField(blank=True, null=True, max_length=64)

    driver_id = models.IntegerField(blank=True, null=True)

    driver = models.CharField(blank=True, null=True, max_length=150)

    driver_phone = models.CharField(blank=True, null=True, max_length=64)

    customer_id = models.IntegerField(blank=True, null=True)

    customer = models.CharField(blank=True, null=True, max_length=150)

    invoice_id = models.IntegerField(blank=True, null=True)

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
