from rest_framework import serializers, exceptions

from django.conf import settings
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.utils.translation import ugettext_lazy as _

try:
    from allauth.account import app_settings as allauth_settings
    from allauth.utils import (email_address_exists, get_username_max_length)
    from allauth.account.adapter import get_adapter
    from allauth.account.utils import setup_user_email
except ImportError:
    raise ImportError("allauth needs to be added to INSTALLED_APPS.")

from .models import User

class ContentTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContentType
        fields = '__all__'

class PermissionSerializer(serializers.ModelSerializer):

    content_type = ContentTypeSerializer(many=False)

    class Meta:
        model = Permission
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    
    permissions = PermissionSerializer(read_only=True, many=True)

    name = serializers.CharField(required=False, max_length=150)
 
    permission = serializers.IntegerField(required=False, write_only=True)
    
    class Meta:
        model = Group
        fields = '__all__'

    def update(self, instance, validated_data):
        permission = validated_data.pop('permission', None)
        if permission:
            if instance.permissions.filter(id=permission).exists():
                instance.permissions.remove(permission)
            else:
                instance.permissions.add(permission)

        super().update(instance, validated_data)

        return instance

class UserDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'phone', 'name', 'company', 'is_superuser', 'is_active', 'roles'
        )

class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=150)
    username = serializers.CharField(
        max_length=get_username_max_length(),
        min_length=allauth_settings.USERNAME_MIN_LENGTH,
        required=allauth_settings.USERNAME_REQUIRED
    )
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate_username(self, username):
        username = get_adapter().clean_username(username)
        return username

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                msg = _("A user is already registered with this e-mail address.")
                raise serializers.ValidationError(msg)
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['password1'] != data['password2']:
            msg = _("The two password fields didn't match.")
            raise serializers.ValidationError({'password2': msg})
        return data

    def custom_signup(self, request, user):
        pass

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user