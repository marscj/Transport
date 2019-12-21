from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from .import views

router = DefaultRouter()
router.register(r'itineraryies', views.ItineraryView, basename='itinerary')
router.register(r'seats', views.SeatView, basename='seat')
router.register(r'prices', views.PriceView, basename='price')
router.register(r'vehices', views.VehicleView, basename='vehicle')
urlpatterns = router.urls