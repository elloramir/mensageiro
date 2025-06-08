Backend (Django/DRF)
CRUD de Pedidos

    ✅ Model Pedido com campos obrigatórios (title, description, status, created_at, updated_at)

    ✅ ViewSet (PedidoViewSet) com ações CRUD

    ✅ Serializer (PedidoSerializer)

    ✅ Roteamento em urls.py

    ✅ Tarefa assíncrona (process_pedido) com Celery

    ✅ Validação para impedir exclusão de pedidos não-pendentes (status != 'pendente')

    ❌ Endpoint /historico funcional (opcional, mas desejável)

Autenticação JWT

    ✅ Configuração do SimpleJWT (TokenObtainPairView, TokenRefreshView)

    ✅ Proteção dos endpoints com permissions.IsAuthenticated

Mensageria (Celery + RabbitMQ)

    ✅ Tarefa assíncrona básica (process_pedido com time.sleep(5))

    ✅ Uso de @shared_task e .delay()

    ✅ Confirmação de RabbitMQ configurado no docker-compose.yaml

Logs Estruturados

    ✅ Logging básico (logger.info)

    ✅ Logs estruturados (JSON formatado, timestamps, níveis de severidade)

Documentação (Swagger/OpenAPI)

    ❌ Integração com drf-yasg ou drf-spectacular

    ❌ Rotas documentadas e categorizadas

Frontend (React)
Telas e Funcionalidades

    ✅ Estrutura básica (App.jsx, Login.jsx, Pedidos.jsx)

    ✅ Autenticação JWT (login/logout, armazenamento de token)

    ✅ Listagem de pedidos (consumindo /api/v1/pedidos/)

    ✅ Formulário de criação/edição de pedidos

    ✅ Atualização dinâmica do status (polling/WebSocket opcional)

Integração com Backend

    ❌ Configuração do Axios/Fetch (interceptors, headers de autenticação)

    ❌ Tratamento de erros (401, 403, 500)

Containerização & Infraestrutura
Docker & Docker Compose

    ✅ Dockerfile para backend e frontend

    ✅ Confirmação de serviços no docker-compose.yaml (PostgreSQL, RabbitMQ, Celery)

    ✅ Variáveis de ambiente (.env) para configurações sensíveis

Makefile

    ✅ Comandos básicos (up, down, logs, migrate, createsuperuser)

Documentação do Projeto
README.md

    ❌ Explicação do projeto

    ❌ Como rodar o sistema (pré-requisitos, docker-compose up)

    ❌ Como acessar Swagger

    ❌ Como autenticar (obter token JWT)

    ❌ Como testar tarefas assíncronas

Critérios Opcionais (Não Obrigatórios, mas Bonus)

    ❌ Testes automatizados (pytest, unittest)

    ❌ Gerenciamento de estado avançado (Redux, Context API)

    ❌ UI responsiva (CSS/component library)