from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from .import views

router = DefaultRouter()
router.register(r'itinerarys', views.ItineraryView, basename='itinerary')
router.register(r'seats', views.SeatView, basename='seat')
router.register(r'prices', views.PriceSerializer, basename='price')
router.register(r'vehices', views.VehicleSerializer, basename='vehicle')
urlpatterns = router.urls