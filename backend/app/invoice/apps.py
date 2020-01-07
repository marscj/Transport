from django.apps import AppConfig


class InvoiceConfig(AppConfig):
    name = 'app.invoice'

    def ready(self):
        from .import handle