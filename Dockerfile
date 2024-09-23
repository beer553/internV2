FROM php:8.1-apache

# ติดตั้ง dependencies
RUN apt-get update && apt-get install -y \
    unixodbc-dev \
    libgssapi-krb5-2 \
    curl \
    apt-transport-https \
    gnupg2

# เพิ่ม Microsoft repository key
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -

# เพิ่ม Microsoft repository ลงใน sources.list.d
RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list

# ติดตั้ง ODBC Driver
RUN apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17 unixodbc-dev

# ติดตั้ง SQLSRV และ PDO_SQLSRV
RUN pecl install sqlsrv pdo_sqlsrv \
    && docker-php-ext-enable sqlsrv pdo_sqlsrv

# ตั้งค่า directory ทำงาน
WORKDIR /var/www/html

RUN echo "extension=sqlsrv.so" >> /usr/local/etc/php/php.ini
RUN echo "extension=pdo_sqlsrv.so" >> /usr/local/etc/php/php.ini
