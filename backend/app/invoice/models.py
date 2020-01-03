from django.db import models

class Invoice(models.Model):

    create_at = models.DateField(auto_now_add=True)

    change_at = models.DateTimeField(auto_now=True)