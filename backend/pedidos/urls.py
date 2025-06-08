from django.urls import path, re_path, include
from rest_framework import routers
from pedidos.viewsets import PedidoViewSet

router = routers.DefaultRouter()
router.register('', PedidoViewSet, basename='pedido')

urlpatterns = [
    path('', include(router.urls)),
]
