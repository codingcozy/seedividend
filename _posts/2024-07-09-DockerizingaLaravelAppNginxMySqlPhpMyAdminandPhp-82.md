---
title: "Laravel 애플리케이션 도커화 Nginx, MySql, PhpMyAdmin, Php-82 사용 방법"
description: ""
coverImage: "/assets/img/2024-07-09-DockerizingaLaravelAppNginxMySqlPhpMyAdminandPhp-82_0.png"
date: 2024-07-09 10:56
ogImage:
  url: /assets/img/2024-07-09-DockerizingaLaravelAppNginxMySqlPhpMyAdminandPhp-82_0.png
tag: Tech
originalTitle: "Dockerizing a Laravel App: Nginx, MySql, PhpMyAdmin, and Php-8.2"
link: "https://medium.com/@syedkamruzzaman/dockerizing-a-laravel-app-nginx-mysql-phpmyadmin-and-php-8-2-cc65b71acad4"
isUpdated: true
---

![이미지](/assets/img/2024-07-09-DockerizingaLaravelAppNginxMySqlPhpMyAdminandPhp-82_0.png)

도커(Docker)란 무엇인가요?

도커는 개발자들이 컨테이너화 기술을 사용하여 응용 프로그램을 자동화하고 배포하며 확장하고 관리할 수 있게 해주는 오픈 소스 플랫폼입니다. 컨테이너는 응용 프로그램과 그 의존성을 단일하고 가벼운 단위로 패키징하여 다양한 컴퓨팅 환경에서 일관되게 실행될 수 있도록 도와줍니다.

도커가 필요한 이유는 무엇인가요?

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- **환경 간 일관성**: Docker는 애플리케이션이 배포되는 장소에 관계없이 항상 동일하게 실행됨을 보장합니다. 개발자의 로컬 머신, 테스트 서버 또는 프로덕션 환경에서라도 일관성을 유지합니다. 이는 "내 컴퓨터에서는 작동하는데" 문제를 제거합니다.
- **고립성**: 컨테이너는 애플리케이션을 실행하는 데 필요한 모든 것을 캡슐화하여 의존성, 라이브러리 및 구성 요소를 다른 애플리케이션으로부터 격리시킵니다. 이 고립성은 동일한 호스트에서 다른 애플리케이션 간의 충돌을 방지합니다.
- **확장성**: Docker는 여러 컨테이너 인스턴스를 실행하여 애플리케이션을 수평으로 확장하기 쉽게 만듭니다. 이는 부하와 수요에 따라 동적으로 관리되어 더 나은 자원 활용 및 성능을 제공합니다.
- **효율성**: 컨테이너는 가벼우며 호스트 시스템의 커널을 공유하여 전통적인 가상 머신(VM)보다 효율적입니다.
- **빠른 배포**: Docker 컨테이너는 빠르게 생성, 시작, 중지 및 제거할 수 있습니다. 이러한 신속한 프로비저닝은 개발, 테스트 및 배포 주기를 가속화합니다.
- **이식성**: Docker를 지원하는 모든 시스템에서 컨테이너를 실행할 수 있어 온 프레미스나 클라우드 등 배포 선택지를 유연하게 제공합니다.

### Laravel 앱을 Docker로 설정하기 전 준비 사항

- Docker 설치
  - Windows: Docker 웹사이트에서 Docker Desktop을 다운로드하고 설치합니다.
  - macOS: Docker 웹사이트에서 Docker Desktop을 다운로드하고 설치합니다.
  - Linux: 해당하는 리눅스 배포판에 대한 Docker 웹사이트의 지침을 따릅니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

터미널에서 다음 명령을 실행하여 Docker가 실행 중인지 확인하세요:

```js
docker --version
```

2. Docker Compose 설치하기

Docker Compose는 여러 컨테이너 Docker 응용 프로그램을 정의하고 실행하는 도구입니다. 이 도구는 종종 다중 서비스(예: 웹 서버, 데이터베이스 등)로 구성된 복잡한 환경을 설정하는 데 사용됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Windows 및 macOS의 경우: Docker Desktop에 Docker Compose가 포함되어 있습니다.
- Linux의 경우: Docker Compose를 설치하려면 Docker Compose 설치 페이지의 지침을 따르세요.

설치를 확인하려면 다음을 실행하세요:

```js
docker-compose --version
```

## Laravel 프로젝트 설정

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

만약 여러분이 이미 라라벨 프로젝트가 없다면 새로 만들어보세요. 이미 라라벨 프로젝트를 가지고 있다면, 이 단계는 건너뛰시면 됩니다.

```js
composer create-project laravel/laravel example-app
cd example-app
```

# ## 라라벨 애플리케이션을 도커화하기

## 1. 루트 프로젝트에 Dockerfile을 만드세요

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

도커파일(Dockerfile)은 애플리케이션을 위한 도커 이미지를 구축하는 방법에 대한 지시사항이 포함된 스크립트입니다.

도커파일

```js
FROM php:8.2-fpm-alpine

ARG user
ARG uid

RUN apk update && apk add \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    shadow  # 사용자 추가를 위해 shadow 패키지 추가

RUN docker-php-ext-install pdo pdo_mysql \
    && apk --no-cache add nodejs npm

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

#USER root

#RUN chmod 777 -R /var/www/

RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user
WORKDIR /var/www
USER $user
```

여기서 사용자와 uid 두 가지 인자를 전달하여 새 사용자를 생성하고 다른 권한을 설정합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 2. docker-compose 폴더를 생성하세요. 그리고 이 폴더 안에 다음과 같은 폴더를 생성해주세요.

a. Mysql

b. Nginx

- ssl

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

c. Php

d. Redis

- 데이터

이렇게요!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래는 나중에 생성할 다른 파일들이에요.

## 3. 루트 프로젝트에 docker-compose.yml 파일을 생성해주세요.

docker-compose.yml

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```yaml
version: "3.7"

services:
  ####################################################################################################
  # 앱
  ####################################################################################################
  app:
    build:
      args:
        user: developer
        uid: 1000
      context: ./
      dockerfile: Dockerfile
    image: app
    container_name: app-rifive-laravel
    restart: unless-stopped
    environment:
      VIRTUAL_HOST: laravel.test
    working_dir: /var/www/
    volumes:
      - ./:/var/www
      - ~/.ssh:/root/.ssh
    depends_on:
      - db
      - redis
    networks:
      - laravel

  ####################################################################################################
  # 데이터베이스 (MySQL)
  ####################################################################################################
  db:
    image: mysql:8.0
    container_name: mysql-rifive-laravel
    restart: unless-stopped
    ports:
      - "3306:3306"
    environment:
      MYSQL_DATABASE: ${DB_DATABASE}
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_USER: ${DB_USERNAME}
      SERVICE_TAGS: dev
      SERVICE_NAME: mysql
    volumes:
      - ./docker-compose/mysql/data:/var/lib/mysql
      - ./docker-compose/mysql/logs:/var/log/mysql
      - ./docker-compose/mysql/ql:/docker-entrypoint-initdb.d
    networks:
      - laravel

  ####################################################################################################
  # Nginx
  ####################################################################################################
  nginx:
    image: nginx:alpine
    container_name: nginx-rifive-laravel
    restart: unless-stopped
    ports:
      - 80:80
      - 443:443
    volumes:
      - ./:/var/www
      - ./docker-compose/nginx:/etc/nginx/conf.d
      - ./docker-compose/nginx/ssl:/etc/nginx/conf.d/ssl
      - ./docker-compose/nginx/phpmyadmin.conf:/etc/nginx/conf.d/phpmyadmin.conf
    networks:
      - laravel

  ####################################################################################################
  # phpMyAdmin
  ####################################################################################################
  phpmyadmin:
    image: phpmyadmin/phpmyadmin:latest
    container_name: phpmyadmin-rifive-laravel
    ports:
      - 8080:80
    links:
      - db
    restart: unless-stopped
    environment:
      PMA_HOST: db
      PMA_PORT: 3306
      PMA_ARBITRARY: 1
    networks:
      - laravel

  ####################################################################################################
  # Redis
  ####################################################################################################
  redis:
    image: "redis:alpine"
    container_name: ri-rifive-redis
    restart: unless-stopped
    volumes:
      - ./docker-compose/redis/data:/data
    ports:
      - "6379:6379"
    networks:
      - laravel

networks:
  laravel:
    driver: bridge
```

여기서는 5개의 이미지를 생성합니다.

1. 라라벨 앱

2. 데이터베이스 MySQL

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

3. Nginx

4. PhpMyAdmin

5. Redis

6. Nginx에 필요한 파일을 만들어봅시다. docker-compose/nginx 폴더로 이동해서 다음 파일들을 만들어주세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

laravel.conf

```js
server {
    listen 80;
    server_name laravel.test;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name laravel.test;
    index index.php index.html;

    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /var/www/public;

    ssl_certificate /etc/nginx/conf.d/ssl/self-signed.crt;
    ssl_certificate_key /etc/nginx/conf.d/ssl/self-signed.key;

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
        gzip_static on;
    }
}
```

phpMyAdmin.conf

```js
server {
    listen 80;
    server_name phpmyadmin.laravel.test;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name phpmyadmin.laravel.test;
    index index.php index.html;

    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /usr/share/nginx/html;

    ssl_certificate /etc/nginx/conf.d/ssl/self-signed.crt;
    ssl_certificate_key /etc/nginx/conf.d/ssl/self-signed.key;

    location / {
        proxy_pass http://phpmyadmin:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 도커 컨테이너를 실행하세요

```js
도커 컴포즈 업 --빌드
```

빌드가 완료되면 이 명령을 실행하세요

```js
도커 컴포즈 익스큐 –아이티 앱 쉘
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 셸 터미널을 볼 수 있어요. whoami 명령을 실행하면 사용자로 developer가 나올 거에요. 아래 명령어를 실행해 보세요.

```js
cd docker-compose/nginx/ssl/
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout self-signed.key -out self-signed.crt
```

이 명령은 docker-compose/nginx/ssl 폴더에 두 개의 파일을 생성해요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

1. self-signed.crt

2. self-signed.key

이미지 확인하세요

![이미지](/assets/img/2024-07-09-DockerizingaLaravelAppNginxMySqlPhpMyAdminandPhp-82_3.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 다음 명령어를 실행하세요

```js
cd /var/www
php artisan migrate
```

그러면 쉘 명령을 빠져나와서 애플리케이션이 실행 준비가 됩니다. 아래 URL을 눌러보세요

# Laravel 앱

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```shell
https://localhost
```

# PhpMyAdmin

```shell
http://localhost:8080/
```

저만큼이에요. 즐거운 학습 되세요 :) .
[도움이 되셨다면 🌟 리포지토리에 별을 주세요 😇]

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

해당 링크는 깃허브 페이지로 연결됩니다. 도커를 이용한 라라벨 및 엔진엑스 설정에 관심이 있다면 방문해보세요! 😊
