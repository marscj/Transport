from django.db import models

from app.vehicle.models import Vehicle
from app.user.models import User

class Order(models.Model):
    
    class OrderStatus(models.TextChoices):
        Created = 'New'
        Pending = 'Pending'
        Cancel = 'Cancel'
        Complete = 'Complete'

    orderId = models.CharField(blank=True, null=True, max_length=64)

    status = models.CharField(default=OrderStatus.Created, choices=OrderStatus.choices, max_length=16)

    start_date = models.DateField(blank=True, null=True)

    end_date = models.DateField(blank=True, null=True)

    price = models.DecimalField(max_digits=8, decimal_places=2)

    cost_price = models.DecimalField(max_digits=8, decimal_places=2)

    remark = models.TextField(max_length=256, blank=True, null=True)

    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, related_name='order', blank=True, null=True)

    driver = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='order_driver', blank=True, null=True)

    customer = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='order_customer', blank=True, null=True)


    