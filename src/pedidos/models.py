from django.db import models
from django.contrib.auth import get_user_model

class Pedido(models.Model):
    STATUS_CHOICES = [
        ('pendente','Pendente'),
        ('processado','Processado'),
    ]
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(choices=STATUS_CHOICES, default='pendente', max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
