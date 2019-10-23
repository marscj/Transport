
from django.http import HttpResponse

class ResponseMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response.data = {
            'result': response.data
        }
        return response