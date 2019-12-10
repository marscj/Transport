from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.contrib.auth.models import Group

from .serializers import UserDetailSerializer, GroupSerializer
from .models import CustomUser

class UserView(ModelViewSet):
    serializer_class = UserDetailSerializer
    queryset = CustomUser.objects.all()

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def info(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class RoleView(ModelViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()