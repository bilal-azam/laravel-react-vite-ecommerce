FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev

# Install PHP extensions
RUN docker-php-ext-install gd pdo pdo_mysql zip

# Install PECL extensions
RUN pecl install redis \
    && docker-php-ext-enable redis

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app/backend

COPY composer.json composer.lock ./

RUN composer install --no-dev --optimize-autoloader --no-scripts

COPY . .

EXPOSE 8000

ADD .tools/scripts/ /srv/

ENTRYPOINT ["/bin/sh", "/srv/startup.sh"]
