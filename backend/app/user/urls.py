from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from .import views

router = DefaultRouter()
router.register(r'users', views.UserView, basename='user')
router.register(r'roles', views.RoleView, basename='role')

urlpatterns = router.urls