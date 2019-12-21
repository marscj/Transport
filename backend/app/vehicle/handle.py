from django.core.exceptions import ObjectDoesNotExist
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save, pre_delete, post_delete
from django.db.models import Q

from .models import Itinerary, Seat, Price

def add_itinerary(instance):
    for price in Price.objects.filter(itinerary=instance):
        for seat in Seat.objects.all():
            if Price.objects.filter(Q(itinerary=instance) & Q(seat=seat)).exists():
                price.seat = seat
                price.save()
            else: 
                Price.objects.create(seat=seat, itinerary=instance, price=0.0)

def add_seat(instance):
    
    for price in Price.objects.filter(seat=instance):
        for itinerary in Itinerary.objects.all():
            if Price.objects.filter(Q(itinerary=itinerary) & Q(seat=instance)).exists():
                price.itinerary = itinerary
                price.save()
            else: 
                Price.objects.create(seat=instance, itinerary=itinerary, price=0.0)

@receiver(post_save, sender=Itinerary)
def itinerary_model_post_save(sender, instance, created, **kwargs):
    if created:
        if Price.objects.filter(itinerary=instance).exists():
            add_itinerary(instance)
        else:
            Price.objects.create(itinerary=instance, price=0.0)
            add_itinerary(instance)
             
@receiver(post_save, sender=Seat)
def seat_model_post_save(sender, instance, created, **kwargs):
    if created:
        if Price.objects.filter(seat=instance).exists():
            add_seat(instance)
        else:
            Price.objects.create(seat=instance, price=0.0)
            add_seat(instance)