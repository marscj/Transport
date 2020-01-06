from django.db import models

class Invoice(models.Model):

    class Status(models.TextChoices):
        Unpaid = 'Unpaid'
        Paid = 'Paid'

    create_at = models.DateField(auto_now_add=True)

    change_at = models.DateTimeField(auto_now=True)

    status = models.CharField(default=Status.Unpaid, choices=Status.choices, max_length=16, blank=True, null=True)

    start_date = models.DateField(blank=True, null=True)

    end_date = models.DateField(blank=True, null=True)

    remark = models.TextField(blank=True, null=True)

