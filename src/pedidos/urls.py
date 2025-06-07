from django.urls import path, re_path, include
from rest_framework import routers
from pedidos.viewsets import PedidoViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = routers.DefaultRouter()
router.register('pedidos', PedidoViewSet, basename='pedido')

schema_view = get_schema_view(
    openapi.Info(title="API Documentation", default_version='v1'),
    public=True,
)

urlpatterns = [
    path('', include(router.urls)),  # pedidos routes
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
