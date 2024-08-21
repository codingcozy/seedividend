---
title: "도커로 Django 애플리케이션 배포 단계별 가이드"
description: ""
coverImage: "/trivasor.github.io/assets/no-image.jpg"
date: 2024-07-06 11:18
ogImage:
  url: /trivasor.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Dockerizing a Django Application: A Step-by-Step Guide"
link: "https://medium.com/@nomanali6011/dockerizing-a-django-application-a-step-by-step-guide-8eca3f6301e9"
isUpdated: true
---

# 소개

요즘 빠르게 발전하는 환경에서, 컨테이너화는 애플리케이션 배포의 중요한 측면이 되었습니다. Docker는 개발자들이 응용 프로그램을 모든 종속성과 함께 표준화된 단위로 패키징할 수 있는 강력한 도구입니다. 본 문서에서는 Dockerizing Django 애플리케이션의 과정을 소개하고 Docker, Dockerfile 및 docker-compose.yml에 대한 개요를 제공할 것입니다.

# Docker란 무엇인가요?

Docker는 응용 프로그램의 배포, 확장 및 관리를 자동화하기 위해 설계된 오픈 소스 플랫폼입니다. Docker는 응용 프로그램을 컨테이너로 패키징합니다. 이는 코드, 런타임, 라이브러리 및 설정이 모두 포함된 가벼우면서도 독립적이며 실행 가능한 단위입니다. 컨테이너와 호스트 시스템은 서로 격리되어 다양한 환경에서 일관된 성능을 보장합니다.

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

# 도커화 하는 이유

- 일관성: 컨테이너를 사용하면 응용 프로그램이 배포된 위치에 관계 없이 동일한 방식으로 작동하도록 보장합니다.
- 격리: 각 컨테이너는 고유한 환경에서 실행되므로 의존성 간의 충돌을 방지합니다.
- 확장성: 컨테이너는 쉽게 확장 또는 축소하여 다양한 부하를 처리할 수 있습니다.
- 이식성: 도커 컨테이너는 도커를 지원하는 모든 시스템에서 실행할 수 있어 응용 프로그램을 환경 간에 쉽게 이동할 수 있습니다.

# Dockerfile이란?

Dockerfile은 도커 이미지를 빌드하는 방법에 대한 일련의 명령어가 포함된 스크립트입니다. 환경 설정, 파일 복사, 및 종속성 설치 등 명령어가 포함됩니다. 아래는 저희 Django 응용 프로그램을 위한 Dockerfile입니다:

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

# 공식 Python 런타임을 부모 이미지로 사용합니다

FROM python:3.11

# 환경 변수 설정

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 컨테이너 내의 작업 디렉토리 설정

WORKDIR /app

# 현재 디렉토리의 내용을 컨테이너의 /app으로 복사합니다

COPY . /app

# requirements.txt에 명시된 필요한 패키지 설치

RUN pip install -r requirements.txt

# 포트 8000을 이 컨테이너 바깥 세상에 노출합니다

EXPOSE 8000
CMD ["gunicorn", "quora.wsgi:application", "--bind", "0.0.0.0:8080"]

# 도커 파일(Dockerfile) 설명

- FROM: 사용할 기본 이미지 지정 (이 경우 Python 3.11).
- ENV: Python이 .pyc 파일을 쓰지 않도록 하고 출력을 버퍼링하지 않도록 환경 변수 설정.
- WORKDIR: 컨테이너 내에서 작업 디렉토리 설정.
- COPY: 현재 디렉토리의 내용을 컨테이너로 복사.
- RUN: requirements.txt에 나열된 필수 Python 패키지 설치.
- EXPOSE: 포트 8000을 외부로 노출.
- CMD: Gunicorn을 사용하여 애플리케이션을 실행할 명령어 지정합니다.

# 도커 컴포즈 파일(docker-compose.yml)이란?

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

docker-compose.yml은 다중 컨테이너 Docker 애플리케이션을 정의하고 실행하는 YAML 파일입니다. 이를 통해 모든 애플리케이션 서비스를 한 곳에서 구성하고 함께 관리할 수 있습니다. 아래는 우리 Django 애플리케이션을 위한 docker-compose.yml 파일입니다:

```yaml
version: "3"
services:
  web:
    build: .
    command: sh -c "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"
    container_name: quora_app
    volumes:
      - .:/app
    ports:
      - "8080:8000"
    depends_on:
      - db
db:
  image: postgres:latest
  environment:
    POSTGRES_DB: ${DB_NAME}
    POSTGRES_USER: ${DB_USER}
    POSTGRES_PASSWORD: ${DB_PASSWORD}
  ports:
    - "5432:5432"
```

# docker-compose.yml 설명

- version: Docker Compose의 버전을 지정합니다.
- services: 실행할 서비스 (컨테이너)를 정의합니다.
- web: 웹 서비스(Django 애플리케이션)를 정의합니다.
- build: 현재 디렉토리의 Dockerfile에서 이미지를 빌드합니다.
- command: Django 애플리케이션을 준비하고 시작하는 명령을 실행합니다.
- container_name: 컨테이너의 이름을 지정합니다.
- volumes: 현재 디렉토리를 컨테이너의 /app 디렉토리에 마운트합니다.
- ports: 호스트의 포트 8080을 컨테이너의 포트 8000에 매핑합니다.
- depends_on: 웹 서비스가 시작되기 전에 db 서비스가 시작되도록 합니다.
- db: 데이터베이스 서비스(PostgreSQL)를 정의합니다.
- image: 최신 PostgreSQL 이미지를 사용합니다.
- environment: 데이터베이스를 위한 환경 변수를 설정합니다.
- ports: 호스트의 포트 5432를 컨테이너의 포트 5432에 매핑합니다.

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

# 결론

당신의 장고 어플리케이션을 도커화하는 것은 일관성, 확장성 및 이식성을 보장해줍니다. Dockerfile 및 docker-compose.yml을 사용하여 애플리케이션의 의존성과 서비스를 쉽게 관리할 수 있습니다. 오늘부터 당신의 애플리케이션을 도커화하여 컨테이너화의 혜택을 누려보세요.

도커화하는 데 도움이 필요하거나 질문이 있으시면 언제든지 연락해주세요!
