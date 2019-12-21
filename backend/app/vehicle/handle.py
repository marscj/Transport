from django.core.exceptions import ObjectDoesNotExist
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save, pre_delete, post_delete
from django.db.models import Q

from .models import Itinerary, Seat, Price

def add_itinerary(instance):
    for seat in Seat.objects.all():
        Price.objects.create(seat=seat, itinerary=instance)
    
def add_seat(instance):
    for itinerary in Itinerary.objects.all():
        Price.objects.create(seat=instance, itinerary=itinerary)
    

@receiver(post_save, sender=Itinerary)
def itinerary_model_post_save(sender, instance, created, **kwargs):
    
    if created:
        add_itinerary(instance)
             
@receiver(post_save, sender=Seat)
def seat_model_post_save(sender, instance, created, **kwargs):
    
    if created:    
        add_seat(instance)