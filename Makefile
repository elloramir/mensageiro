up:
	docker compose up --build

down:
	docker compose down

migrate:
	docker compose exec backend python src/manage.py migrate

createsuperuser:
	docker compose exec backend python src/manage.py createsuperuser

logs:
	docker compose logs -f

.PHONY: up down migrate createsuperuser logs