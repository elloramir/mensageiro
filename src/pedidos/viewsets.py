from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Pedido
from .serializers import PedidoSerializer
from .tasks import process_pedido

class PedidoViewSet(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Pedido.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        pedido = serializer.save(user=self.request.user)
        process_pedido.delay(pedido.id)

    @action(detail=False, methods=['get'])
    def historico(self, request):
        # optional: fetch logs from a db table or external logger store
        return Response([])
