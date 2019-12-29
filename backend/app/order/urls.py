from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from .import views

router = DefaultRouter()
router.register(r'orders', views.OrderView, basename='order')
router.register(r'order_itinerary', views.OrderItineraryView, basename='order_itierary')
urlpatterns = router.urls