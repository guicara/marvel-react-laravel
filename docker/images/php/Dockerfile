FROM php:7.4-fpm-alpine

# Install PDO extension for PHP
RUN docker-php-ext-install pdo pdo_mysql

# Add bash to Alpine
RUN apk add --no-cache bash

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/ \
    && ln -s /usr/local/bin/composer.phar /usr/local/bin/composer

WORKDIR /var/www/api
