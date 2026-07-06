FROM php:8.2-apache
RUN apt-get update && apt-get install -y libzip-dev unzip git \
    && docker-php-ext-install pdo pdo_mysql zip
RUN a2enmod rewrite
COPY . /var/www/html
WORKDIR /var/www/html
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader
RUN chown -R www-data:www-data storage bootstrap/cache
COPY .render/apache.conf /etc/apache2/sites-available/000-default.conf
# Copier le script de démarrage dans le conteneur
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Donner les permissions d'exécution au script
RUN chmod +x /usr/local/bin/entrypoint.sh

# Définir le script comme commande principale
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
EXPOSE 80
