from django.shortcuts import render
from django.contrib import messages

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound

from allauth.account.models import EmailAddress

class SendEmailConfirmation(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email', None)
        if not email:
            raise ValidationError({'email': 'Must include either email.'})
        try:
            email_address = EmailAddress.objects.get(email=email)
            if not email_address.verified:
                email_address.send_confirmation(request)
                return Response("Email has been sent")
            else:
                return Response("Email verified")
        except EmailAddress.DoesNotExist:
            raise NotFound({'email': 'Email not found'})