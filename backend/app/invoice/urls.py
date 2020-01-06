from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from .import views

router = DefaultRouter()
router.register(r'invoices', views.InvoiceView, basename='invoice')
urlpatterns = router.urls