from django.core.exceptions import ObjectDoesNotExist
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save, pre_delete, post_delete

from datetime import datetime

from .models import Invoice

@receiver(post_save, sender=Invoice)
def invoice_model_post_save(sender, instance, created, **kwargs):
    if created:
        if instance.invoiceId is None or instance.invoiceId == '':
            date_time = datetime.now().strftime("%Y-%m-%d") 
            instance.invoiceId = date_time + '-' + instance.customer.username + '-' + str(instance.id)
            instance.save()
        