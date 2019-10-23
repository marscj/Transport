from rest_framework import serializers, exceptions

from django.contrib.auth import get_user_model, authenticate
from django.conf import settings
from django.utils.translation import ugettext_lazy as _

UserModel = get_user_model()

class UserDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = '__all__'