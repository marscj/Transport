from django.db import models
from django.db.models import Sum

from app.vehicle.models import Vehicle, Itinerary
from app.user.models import User
from app.invoice.models import Invoice
from app.driver.models import Driver

class Order(models.Model):
    
    class OrderStatus(models.TextChoices):
        New = 'New'
        Confirm = 'Confirm'
        Cancel = 'Cancel'

    orderId = models.CharField(blank=True, null=True, max_length=64)

    relatedId = models.CharField(blank=True, null=True, max_length=64)

    status = models.CharField(default=OrderStatus.New, choices=OrderStatus.choices, max_length=16)

    create_at = models.DateField(auto_now_add=True)

    change_at = models.DateTimeField(auto_now=True)

    start_date = models.DateField(blank=True, null=True)

    end_date = models.DateField(blank=True, null=True)

    category = models.CharField(blank=True, null=True, max_length=64)

    seats = models.IntegerField(blank=True, null=True, default=5)

    passenger = models.IntegerField(blank=True, null=True, default=0)

    itinerary = models.TextField(blank=True, null=True)

    remark = models.TextField(blank=True, null=True)

    is_lock = models.BooleanField(default=False, blank=True, null=True)

    vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, related_name='order', blank=True, null=True)

    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, related_name='order', blank=True, null=True)

    customer = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='order_customer', blank=True, null=True)

    operator = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='order_operator', blank=True, null=True)

    invoice = models.ForeignKey(Invoice, on_delete=models.SET_NULL, related_name='order', blank=True, null=True)

    class Meta:
        db_table = 'order'
        permissions = [
            ("change_lock", "Can change the lock"),
        ]

    @property
    def total(self):
        return self.order_itinerary.aggregate(sum=Sum('payment'))['sum'] or 0.0
        
class OrderItinerary(models.Model):

    date = models.DateField(blank=True, null=True)

    time = models.TimeField(blank=True, null=True)

    price = models.DecimalField(default=0.0, max_digits=8, decimal_places=2)

    payment = models.DecimalField(default=0.0, max_digits=8, decimal_places=2)

    itinerary = models.ForeignKey(Itinerary, on_delete=models.SET_NULL, related_name='order_itinerary', blank=True, null=True)

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_itinerary', blank=True, null=True)

    class Meta:
        db_table = 'order_itinerary'
        permissions = [
            ("edit_payment", "Can edit the payment"),
        ]