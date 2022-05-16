# Develop

 - Run ```cp .env.example .env && (cd backend && cp .env.example .env)```
 - Run ```(cd backend && composer install && php artisan key:generate)```
 - Run ```(cd frontend && yarn install && yarn tailwind:build)```
 - Run ```docker-compose up --detach --build```
 - At the 'laravel' container, run ```php artisan migrate```
