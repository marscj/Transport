from django.core.exceptions import ObjectDoesNotExist
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save, pre_delete, post_delete
from django.db.models import Q

from .models import Itinerary, Seat, Price

def add_itinerary(instance):
    
    for price in Price.objects.filter(seat=instance):
        price.itinerary = instance
        print.save()

def add_seat(instance):
    
    for price in Price.objects.filter(seat=instance):
        price.seat = instance
        print.save()

@receiver(post_save, sender=Itinerary)
def itinerary_model_post_save(sender, instance, created, **kwargs):
    
    if created:
        if not Price.objects.filter(itinerary=instance).exists():
            Price.objects.create(itinerary=instance, price=0.0)
            
        add_itinerary(instance)
             
@receiver(post_save, sender=Seat)
def seat_model_post_save(sender, instance, created, **kwargs):
    
    if created:
        if not Price.objects.filter(seat=instance).exists():
            Price.objects.create(seat=instance, price=0.0)
            
        add_seat(instance)