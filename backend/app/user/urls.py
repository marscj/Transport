from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from .import views

router = DefaultRouter()
router.register(r'users', views.UserView, basename='user')
router.register(r'groups', views.UserGroupView, basename='group')
router.register(r'permissions', views.PermissionView, basename='permission')
urlpatterns = router.urls