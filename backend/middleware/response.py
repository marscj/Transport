
from django.http import HttpResponse

class ResponseMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        print(request, request.POST)
        if response and hasattr(response, 'data'):
            response.data = {
                'result': response.data
            }
            print(response, response.data)
        return response