from django.db import models

class Driver(models.Model):

    name = models.CharField(blank=True, null=True, max_length=64)

    phone = models.CharField(blank=True, null=True, max_length=32)

    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'driver'