from django.shortcuts import render
from django.contrib.auth.models import User
from . models import Post
from rest_framework import generics
from .serializers import UserSerializer, PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class CreatePostView(generics.CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class DeletePostView(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)
'''
 writing apis not using generic views
'''
@api_view(['GET'])
def get_all_post(req):
    if(req.method == 'GET'):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return HttpResponse("hi")
