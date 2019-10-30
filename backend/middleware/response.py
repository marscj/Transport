from django.utils.deprecation import MiddlewareMixin
from django.http.response import JsonResponse, HttpResponse
from django.http.request import HttpRequest

class ResponseMiddleware(MiddlewareMixin):

    def process_request(self, request):
        if hasattr(request, 'data'):
            print(request, request.data)

    def process_response(self, request, response):
        if response and hasattr(response, 'data'):
            print(response.data)
        return response