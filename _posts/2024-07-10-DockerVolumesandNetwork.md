---
title: "2024년의 도커 볼륨 및 네트워크 이해하기 기본 개념부터 실전 활용법까지"
description: ""
coverImage: "/assets/img/2024-07-10-DockerVolumesandNetwork_0.png"
date: 2024-07-10 02:48
ogImage: 
  url: /assets/img/2024-07-10-DockerVolumesandNetwork_0.png
tag: Tech
originalTitle: "Docker Volumes and Network"
link: "https://medium.com/@m.qasimnauman/docker-volumes-and-network-90ba2ddc581c"
isUpdated: true
---




안녕하세요 여러분! 데브옵스 여정을 계속해요. 오늘은 더 고급 컨테이너화 개념에 대해 이야기할게요.

![이미지](/assets/img/2024-07-10-DockerVolumesandNetwork_0.png)

애플리케이션을 실행할 때 주요 문제 중 하나는 저장소 문제입니다. 컨테이너를 시작하면 데이터가 생성되고, 중지하면 저장된 데이터가 순식간에 파괴됩니다. 이를 해결하기 위해 도커에는 도커 볼륨이라는 솔루션이 있어요.

볼륨은 컨테이너에 물리적 저장 공간을 제공하는 저장용기입니다. 내부와 외부(외부) 양쪽에 모두 존재합니다. 그들은 다양한 이점을 제공하는데, 이 중 일부는 아래와 같습니다.

<div class="content-ad"></div>

- 그것들은 여러 컨테이너 간에 공유될 수 있습니다.
- 데이터 이전을 쉽게 만들어 줍니다.
- 드라이버는 원격 호스트나 클라우드 공급업체에 볼륨을 저장할 수 있게 해주어 기능을 수정할 수 있게 합니다.

다중 컨테이너를 다룰 때 Docker 볼륨은 필수입니다. Docker를 사용하여 여러 컨테이너를 사용하는 경우, 그들이 서로 상호 작용할 필요가 있습니다. Docker는 Docker 네트워크를 사용하여 이 차이를 메우는 솔루션을 제공합니다.

Docker 네트워크는 Docker 컨테이너를 연결하는 가상 네트워크로, 그들이 정보를 교환할 수 있게 합니다. 이러한 네트워크는 컨테이너에 대한 격리, 보안 및 연결성을 제공합니다. 컨테이너를 생성할 때 Docker는 자동으로 해당 컨테이너에 대한 네트워크를 생성합니다. 그러나 사용자는 컨테이너간의 통신을 보다 구체적으로 제어하기 위해 사용자 정의 네트워크를 생성할 수도 있습니다.

도커에서는 다양한 유형의 네트워크가 사용되며 각각이 그 목적에 맞게 사용됩니다.

<div class="content-ad"></div>

자세한 내용은 여기에서 읽어볼 수 있어요.

오늘은 두 가지 작업을 할 거에요. 먼저, 멀티 컨테이너 애플리케이션을 배포하고, 그리고는 볼륨이 어떻게 작동하는지 자세히 살펴볼 거에요.

**작업 1**

첫 번째 작업은 도커 컴포즈가 어떻게 작동하는지 이해해야 해요.

<div class="content-ad"></div>

사전 준비 사항:

- 실행 중인 EC2 인스턴스 또는 Ubuntu 가상 머신
- Docker (작동 중)
- 프로젝트 파일

이번에는 Ubuntu 가상 머신을 사용하여 PostgreSQL 데이터베이스와 함께 Django 프로젝트를 배포할 것입니다.

프로젝트 저장소 링크: [프로젝트 저장소 링크]

<div class="content-ad"></div>

먼저 아래 명령을 사용하여 로컬 머신으로 복제할 거에요.

```js
git clone https://github.com/testdrivenio/django-on-docker.git
```

![이미지](/assets/img/2024-07-10-DockerVolumesandNetwork_1.png)

저장소를 복제했으니, 먼저 개발 환경을 만들 거예요. 다음 명령을 사용하여 새 파일을 만들고 아래 내용을 채워 넣어 주세요.

<div class="content-ad"></div>

```js
nano .dev.env
```

내용

```js
DEBUG=1
SECRET_KEY=foo
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
SQL_ENGINE=django.db.backends.postgresql
SQL_DATABASE=hello_django_dev
SQL_USER=hello_django
SQL_PASSWORD=hello_django
SQL_HOST=db
SQL_PORT=5432
DATABASE=postgres
```

이 파일은 Django 프로젝트의 다양한 측면, 특히 데이터베이스에 대한 환경 변수를 설정합니다.

<div class="content-ad"></div>

위 작업을 마치면 이제 다음 내용을 포함한 Docker Compose 파일을 생성할 것입니다.

```shell
nano docker-compose.yml
```

내용

```shell
version: '3.8'

services:
  web:
    build: ./app
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./app/:/usr/src/app/
    ports:
      - 8000:8000
    env_file:
      - ./.env.dev
    depends_on:
      - db
    networks:
      - my_django_network

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    environment:
      - POSTGRES_USER=hello_django
      - POSTGRES_PASSWORD=hello_django
      - POSTGRES_DB=hello_django_dev
    networks:
      - my_django_network

volumes:
  postgres_data:

networks:
  my_django_network:
    driver: bridge
```


<div class="content-ad"></div>

위 파일은 두 개의 서비스를 실행합니다.

- 웹: 포트 8000에서 실행되는 앱을 기반으로 구축되며, db 서비스에 의존합니다. 모든 호스트에서 액세스할 수 있습니다.
- DB: postgres:15 이미지를 사용하며, 데이터는 볼륨에 저장됩니다.

컨테이너 내에 호스트되는 postgres_data라는 이름의 볼륨과 두 서비스 간에 안전하게 브릿지된 개인 네트워크 연결이 있습니다.

이제 다음 명령을 사용하여 프로젝트를 빌드하고 로컬 머신에서 8000 포트의 어떤 호스트에서 실행할 것입니다.


<div class="content-ad"></div>

```js
도커 컴포즈 업

먼저 이미지를 빌드한 후 두 서비스를 시작합니다. DB와 웹의 컨테이너는 각각 생성됩니다.

성공적으로 실행되면 로컬 호스트는 8000 포트에서 이와 같이 보입니다. 애플리케이션이 성공적으로 실행 중입니다.

![이미지](/assets/img/2024-07-10-DockerVolumesandNetwork_2.png)
```

<div class="content-ad"></div>

파일을 업로드하면 해당 파일의 내용을 볼 수 있어요!

![DockerVolumesandNetwork_3](/assets/img/2024-07-10-DockerVolumesandNetwork_3.png)

지금까지 배포한 애플리케이션은 개발 단계에 있었습니다.

이제 프로덕션 단계로 애플리케이션을 배포하기 위해 다음과 같은 프로세스를 사용합니다.

<div class="content-ad"></div>

먼저, 다음 내용을 포함한 운영용 도커 컴포즈 파일을 만들어봅시다.

```js
nano docker-compose.prod.yml
```

내용

```js
version: '3.8'

services:
  web:
    build:
      context: ./app
      dockerfile: Dockerfile.prod
    command: gunicorn hello_django.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - static_volume:/home/app/web/staticfiles
      - media_volume:/home/app/web/mediafiles
    expose:
      - 8000
    env_file:
      - ./.env.prod
    depends_on:
      - db
    networks:
      - my_django_network

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    env_file:
      - ./.env.prod.db
    networks:
      - my_django_network

  nginx:
    build: ./nginx
    volumes:
      - static_volume:/home/app/web/staticfiles
      - media_volume:/home/app/web/mediafiles
    ports:
      - 1337:80
    depends_on:
      - web
    networks:
      - my_django_network

volumes:
  postgres_data:
  static_volume:
  media_volume:

networks:
  my_django_network:
    driver: bridge
```


<div class="content-ad"></div>

다음 파일에서는 Gunicorn을 사용하여 웹 서비스를 실행하며 Django에 의해 생성된 정적 및 미디어 파일을 저장하는 두 볼륨을 연결하여, DB에 따라 8000포트에 노출됩니다.

DB는 PostgreSQL 15 버전 15을 끌어와 postgre_data라는 볼륨과 마운트하고, Docker 파일을 사용하여 1337포트에 노출된 Nginx를 사용합니다.

환경을 설정해야 합니다. 이를 위해 프로덕션 환경을 생성할 때 다음 명령어를 사용합니다.

```js
nano .env.prod
```

<div class="content-ad"></div>

여기 한 가지 새로운 콘텐츠가 있어요! 설정 파일에서 데이터베이스를 조정하려면 다음 명령어를 사용하세요.

```js
nano .env.prod.db
```

<div class="content-ad"></div>

내용


POSTGRES_USER=hello_django
POSTGRES_PASSWORD=hello_django
POSTGRES_DB=hello_django_prod


모든 작업을 마친 후에는 다음 명령어를 사용하여 실행합니다.


docker-compose -f docker-compose.prod.yml up --build


<div class="content-ad"></div>

저희 앱은 1337 포트에서 실행됩니다.

![이미지](/assets/img/2024-07-10-DockerVolumesandNetwork_4.png)

태스크 1을 요약하면 도커를 사용하여 멀티 컨테이너 애플리케이션을 여러 환경에서 배포하는 방법입니다.

태스크 2

<div class="content-ad"></div>

이제 볼륨이 어떻게 작동하는지 자세히 이해해 보겠습니다.

이를 위해 우분투: 최신 이미지를 사용할 것입니다.

먼저 외부 이미지를 사용하여 새로운 이름이 지정된 볼륨과 연결하여 컨테이너 내에서 이미지를 실행하고 다음 명령을 사용할 것입니다.

```js
#새로운 볼륨 생성
docker volume create volume_name

#ubuntu 이미지를 사용하여 도커 실행
docker run -it -v volume_name:/directory ubuntu

#해당 디렉토리에 이미지 데이터가 저장됩니다.
```

<div class="content-ad"></div>

이제 컨테이너 안에 있어요. 

![이미지](/assets/img/2024-07-10-DockerVolumesandNetwork_6.png)

/data 디렉토리를 줬으니, 데이터가 하나 있어요. 이제 저 속으로 들어가면 초기에는 비어 있을 거에요.

<div class="content-ad"></div>

이제 여기에 새 폴더를 만들어보겠습니다.

새 터미널 창을 열고 동일한 컨테이너를 다시 시작해보세요.

<div class="content-ad"></div>

이제 데이터 디렉토리로 가 보면 거기에 무엇이 있는지 볼 수 있을 거예요. 

![이미지](/assets/img/2024-07-10-DockerVolumesandNetwork_10.png)

여기서 이전 컨테이너에서 생성한 폴더도 여전히 있는 것을 알 수 있어요.

<div class="content-ad"></div>

여기에 새 폴더를 만들었어요. 다른 실행 중인 컨테이너에도 반영될 거에요.

![이미지](/assets/img/2024-07-10-DockerVolumesandNetwork_11.png)
![이미지](/assets/img/2024-07-10-DockerVolumesandNetwork_12.png)

볼륨은 컨테이너에 지속적인 데이터 저장을 제공하는 방식입니다.

<div class="content-ad"></div>

너를 위한 작업이야, 동일한 이미지로 컨테이너를 만들어 그 볼륨을 연결하고 새 파일이나 디렉토리를 추가해봐. 그리고 다른 컨테이너에서 그것이 반영되었는지 확인해봐.

오늘은 여기까지야. 읽어줘서 고마워.