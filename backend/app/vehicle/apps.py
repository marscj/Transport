from django.apps import AppConfig


class VehicleConfig(AppConfig):
    name = 'app.vehicle'

    def ready(self):
        from .import handle