from celery import shared_task
import time, logging
from .models import Pedido

logger = logging.getLogger(__name__)

@shared_task
def process_pedido(pedido_id):
    time.sleep(5)
    pedido = Pedido.objects.get(id=pedido_id)
    pedido.status = 'processado'
    pedido.save()
    logger.info(f'Pedido {pedido_id} processed')
