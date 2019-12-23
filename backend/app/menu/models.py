from django.db import models

class Menu(models.Model):

    name = models.CharField(blank=True, null=True, max_length=64)
    
    hidden = models.BooleanField(default=False)

    child = models.ForeignKey('Menu', on_delete=models.SET_NULL, related_name='menu', blank=True, null=True)