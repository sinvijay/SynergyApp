# accounts/urls.py
from django.urls import path
from django.contrib.auth.views import LogoutView
from . import views

urlpatterns = [
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.CustomLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('profile/update/', views.profile_update_view, name='profile_update'),
    path('api/register/', views.register_api, name='api_register'),
    path('api/login/', views.login_api, name='api_login'),
    
]
