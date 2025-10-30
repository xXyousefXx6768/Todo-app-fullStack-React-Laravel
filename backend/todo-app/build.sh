#!/usr/bin/env bash
set -e
echo "APP_KEY=${APP_KEY}" > .env
echo "APP_ENV=${APP_ENV}" >> .env
composer install
php artisan key:generate
php artisan config:clear
php artisan optimize
