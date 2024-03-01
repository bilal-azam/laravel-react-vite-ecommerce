#!/bin/sh

#composer install --no-dev --optimize-autoloader --no-scripts

php artisan key:generate
php artisan migrate --seed
php artisan config:cache
php artisan serve --host=0.0.0.0 --port=8000
