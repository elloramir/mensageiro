### Project Overview

A containerized fullstack application with a Django REST Framework backend and a React frontend, featuring JWT authentication, CRUD operations, async task processing with Celery + RabbitMQ, structured logging, and API documentation.

### System Requirements

- Docker and Docker Compose
- make runtime (most Unix systems have it)

### Installation Setup

```bash
git clone https://github.com/elloramir/mensageiro
cp '.env.sample' .env
docker compose up --build -d
make createsuperuser
```

### Services

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Swagger: http://localhost:8000/swagger/
- RabbitMQ: http://localhost:15672/

### Authentication

Authentication is handled through the frontend login using the user created during the installation step.
The authentication endpoint is automatically created by the JWT addon.

```bash
POST http://localhost:8000/token/
Content-Type: application/json

{
  "username": "...",
  "password": "..."
}

Authorization: Bearer [your_token]
```

### How to Use

On the frontend page, you can create a new message through the button.
Enter a description and a title, then send it.
All simultaneous pages will automatically fetch your message, delivered via Celery.
