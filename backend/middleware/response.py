from django.utils.deprecation import MiddlewareMixin
from django.http.response import JsonResponse, HttpResponse

import json

class ResponseMiddleware(MiddlewareMixin):

    def process_request(self, request):
        if hasattr(request, 'data'):
            print(request, request.data)
        print(request)

    def process_response(self, request, response):
        if response and hasattr(response, 'data'):
            data = {
                'result': response.data
            }
        return JsonResponse(data, status=response.status_code)