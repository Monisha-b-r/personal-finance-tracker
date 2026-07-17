from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet, dashboard

router = DefaultRouter()
router.register(r'', TransactionViewSet, basename='transactions')

urlpatterns = [
    path('dashboard/', dashboard, name='dashboard'),
    path('', include(router.urls)),
]