up:
	docker compose up --build

down:
	docker compose down

migrate:
	docker compose exec django python manage.py migrate

createsuperuser:
	docker compose exec django python manage.py createsuperuser

logs:
	docker compose logs -f

.PHONY: up down migrate createsuperuser logs