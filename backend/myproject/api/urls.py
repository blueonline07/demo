from django.urls import path
from .  import views

urlpatterns = [
    path('posts/', views.CreatePostView.as_view()),
    path('posts/<int:pk>/', views.DeletePostView.as_view()),
    path('all/', views.get_all_post)
]