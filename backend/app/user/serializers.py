from rest_framework import serializers

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission

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


