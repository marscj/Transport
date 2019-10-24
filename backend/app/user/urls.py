from django.conf.urls import include, url

from .views import SendEmailConfirmation

urlpatterns = [
    url(r'^send_email_confirmation', SendEmailConfirmation.as_view(), name='send_email_confirmation'),
]