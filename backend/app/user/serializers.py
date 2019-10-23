from rest_framework import serializers, exceptions

from django.conf import settings
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import Group, Permission
from django.utils.translation import ugettext_lazy as _

UserModel = get_user_model()

class Permission(serializers.ModelSerializer):

    class Meta:
        model = Permission
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Group
        fields = '__all__'

class UserDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(style={'input_type': 'password'})

    def authenticate(self, **kwargs):
        return authenticate(self.context['request'], **kwargs)

    def _validate_email(self, email, password):
        user = None

        if email and password:
            user = self.authenticate(email=email, password=password)
        else:
            msg = _('Must include "email" and "password".')
            raise exceptions.ValidationError(msg)

        return user

    def _validate_username(self, username, password):
        user = None

        if username and password:
            user = self.authenticate(username=username, password=password)
        else:
            msg = _('Must include "username" and "password".')
            raise exceptions.ValidationError(msg)

        return user

    def _validate_username_email(self, username, email, password):
        user = None

        if email and password:
            user = self.authenticate(email=email, password=password)
        elif username and password:
            user = self.authenticate(username=username, password=password)
        else:
            msg = _('Must include either "username" or "email" and "password".')
            raise exceptions.ValidationError(msg)

        return user

    def validate(self, attrs):
        username = attrs.get('username')
        email = attrs.get('email')
        password = attrs.get('password')

        user = None

        if 'allauth' in settings.INSTALLED_APPS:
            from allauth.account import app_settings

            # Authentication through email
            if app_settings.AUTHENTICATION_METHOD == app_settings.AuthenticationMethod.EMAIL:
                user = self._validate_email(email, password)

            # Authentication through username
            elif app_settings.AUTHENTICATION_METHOD == app_settings.AuthenticationMethod.USERNAME:
                user = self._validate_username(username, password)

            # Authentication through either username or email
            else:
                user = self._validate_username_email(username, email, password)

        else:
            # Authentication without using allauth
            if email:
                try:
                    username = UserModel.objects.get(email__iexact=email).get_username()
                except UserModel.DoesNotExist:
                    pass

            if username:
                user = self._validate_username_email(username, '', password)

        # Did we get back an active user?
        if user:
            if not user.is_active:
                msg = _('User account is disabled.')
                raise exceptions.ValidationError(msg)
        else:
            msg = _('Unable to log in with provided credentials.')
            raise exceptions.ValidationError({'password': msg})

        # If required, is the email verified?
        if 'rest_auth.registration' in settings.INSTALLED_APPS:
            from allauth.account import app_settings
            if app_settings.EMAIL_VERIFICATION == app_settings.EmailVerificationMethod.MANDATORY:
                email_address = user.emailaddress_set.get(email=user.email)
                if not email_address.verified:
                    raise serializers.ValidationError(_('E-mail is not verified.'))

        attrs['user'] = user
        return attrs


