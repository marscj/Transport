from rest_framework.viewsets import ModelViewSet

from .serializers import UserDetailSerializer
from .models import CustomUser
class UserView(ModelViewSet):
    serializer_class = UserDetailSerializer
    queryset = CustomUser.objects.all()