from django.core.exceptions import ObjectDoesNotExist
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save, pre_delete, post_delete

from .models import Order

@receiver(post_save, sender=Order)
def order_model_post_save(sender, instance, created, **kwargs):
    if created:
        if instance.orderId is None or instance.orderId == '':
            instance.orderId = 'B%s' % str(instance.id + 100000)
            instance.save()
        