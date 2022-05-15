# Develop

 - Run ```cp .env.example .env && (cd backend && cp .env.example .env)```
 - Run ```(cd backend && composer install) && (cd frontend && yarn install)```
 - Run ```docker-compose up --detach --build```
 - Inside 'laravel' container, run ```php artisan migrate```