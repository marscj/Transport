from django.conf.urls import include, url
from django.views.generic import RedirectView
from rest_framework_jwt.views import refresh_jwt_token

urlpatterns = [
    url(r'^api/rest-auth/', include('rest_auth.urls')),
    url(r'^api/rest-auth/registration/', include('rest_auth.registration.urls')),
    
    url(r'^account/', include('allauth.urls')),
    url(r'^accounts/profile/$', RedirectView.as_view(url='/', permanent=True), name='profile-redirect'),

    url(r'^api/', include('app.user.urls')),
    url(r'^api/', include('app.vehicle.urls')),
    url(r'^api/', include('app.order.urls')),
    url(r'^api/', include('app.invoice.urls')),
    url(r'^api/', include('app.driver.urls')),
]
