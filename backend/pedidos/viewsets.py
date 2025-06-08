from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
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

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if instance.status != 'pendente':
            return Response(
                {'detail': 'Somente pedidos com status "pendente" podem ser excluídos.'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'])
    def historico(self, request):
        # optional: fetch logs from a db table or external logger store
        return Response([])