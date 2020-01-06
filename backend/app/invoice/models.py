from django.db import models

from app.user.models import User

class Invoice(models.Model):

    class Status(models.TextChoices):
        Unpaid = 'Unpaid'
        Paid = 'Paid'

    create_at = models.DateField(auto_now_add=True)

    change_at = models.DateTimeField(auto_now=True)

    status = models.CharField(default=Status.Unpaid, choices=Status.choices, max_length=16, blank=True, null=True)

    date = models.CharField(blank=True, null=True, max_length=64)

    remark = models.TextField(blank=True, null=True)

    customer = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='invoice', blank=True, null=True)

