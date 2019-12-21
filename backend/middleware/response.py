from django.utils.deprecation import MiddlewareMixin
from django.http.response import JsonResponse, HttpResponse
from django.http.request import HttpRequest
from rest_framework.renderers import JSONRenderer

class ResponseMiddleware(MiddlewareMixin):

    def process_request(self, request):
        if hasattr(request, 'data'):
            print(request, request.data)

    def process_response(self, request, response):
        if response and hasattr(response, 'data'):
            print(response.data)
        return response

class CustomJSONRenderer(JSONRenderer):

    def render(self, data, accepted_media_type=None, renderer_context=None):
        return super(CustomJSONRenderer, self).render({'result': data}, accepted_media_type, renderer_context)