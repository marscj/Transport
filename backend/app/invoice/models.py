from django.db import models

class Invoice(models.Model):

    invoiceNo = models.CharField(blank=True, null=True, max_length=64)

    date = models.DateField(blank=True, null=True)

    create_at = models.DateTimeField(auto_now_add=True)

    change_at = models.DateTimeField(auto_now=True)