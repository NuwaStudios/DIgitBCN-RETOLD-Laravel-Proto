FROM php:8.2-apache

COPY ./ /var/www/html
COPY 000-default.conf /etc/apache2/sites-available/

RUN a2enmod rewrite
RUN a2ensite 000-default

RUN apt-get update && \
  apt-get install -y \
  zip \
  unzip \
  p7zip-full

RUN docker-php-ext-install pdo_mysql

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

RUN chmod -R 777 /var/www/html/storage

COPY ./uploads.ini /usr/local/etc/php/conf.d/uploads.ini
