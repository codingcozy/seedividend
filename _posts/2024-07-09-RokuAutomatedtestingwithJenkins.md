---
title: "Roku  Jenkins를 사용한 자동화 테스트 방법"
description: ""
coverImage: "/trivasor.github.io/assets/no-image.jpg"
date: 2024-07-09 11:07
ogImage: 
  url: /trivasor.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Roku — Automated testing with Jenkins"
link: "https://medium.com/@davxne/roku-automated-testing-with-jenkins-14c639ee1836"
---


## 소개

저는 로쿠 개발자도 아니고 로쿠 앱을 개발한 경험이 없습니다. 이번에 처음으로 개발 목적으로 이 장치를 다뤄보았습니다.

## 요구 사항

- 로쿠 장치를 위한 앱 개발의 기본적인 이해
- NGINX Reverse Proxy의 기본적인 이해
- Docker 및 Docker Compose의 기본적인 이해

<div class="content-ad"></div>

# 동기부여

Roku는 인터넷을 통해 실시간으로 집으로 비디오 콘텐츠를 스트리밍하는 스트리밍 비디오 플레이어입니다. 개발자들은 Netflix, Disney+ 등이 운영되는 앱을 개발할 수 있습니다. 해당 회사들이 이러한 앱을 개발하여 콘텐츠를 스트리밍합니다.

개발 프로세스 중에는 앱이 특정 품질 기준을 충족하고 신뢰성이 있으며 기능이 일관되도록 보장하고 싶습니다. 그래서 애플리케이션에 대한 테스트를 수행하는 것이 당연한 결정이어야 합니다. 이러한 테스트를 어떻게 진행할지가 어려운 부분입니다. 고객에게 몇 가지 사실과 제한 사항을 알려주기 위해 일부 결정을 내려야 했습니다.

- 먼저, 테스트 실행을 중앙 집중화하고 다른 파이프라인도 개발 중이었기 때문에 Jenkins를 CI/CD 도구로 선택했습니다. (이 단계들은 Jenkins 파이프라인에만 해당되는 것이 아닙니다. Bitbucket 파이프라인, GitHub Actions 등에서도 작동합니다).
- 둘째, 이 글을 쓰는 시점에, Roku에는 개발 및 테스트용 시뮬레이터/에뮬레이터가 없다고 믿고 있습니다. 그래서 우리는 물리적 장치에 대해 테스트를 실행해야 했습니다.
- 셋째, 그리고 이 글을 쓰는 이유는 Roku 장치에는 외부 네트워크에서 장치에 연결할 수 없는 보안 메커니즘이 있습니다. 이는 외부 악의적 작용자가 Roku 장치를 통해 네트워크에 액세스하는 것을 방지하기 위한 것입니다. 그래서 해법을 찾기 위해 다양한 반복을 거쳐 작업했습니다.
- 배포를 위한 애플리케이션을 아카이빙하고 서명하는 기존 프로세스가 있었기 때문에 파이프라인이 애플리케이션을 빌드하고 서명할 필요가 없었습니다. 모든 파이프라인이 하는 일은 기존에 서명된 아카이브에서 테스트를 실행하는 것뿐이었습니다.

<div class="content-ad"></div>

저희가 해결책을 찾아 나가면서 다른 제약 사항과 사실들도 명확해졌는데, 이 중에서도 이 기사와 관련이 있다고 생각되는 것들을 중심으로 정리해 보았습니다. 그래서 이번에는 로컬 네트워크에서 실행되고 있는 Roku 장치와 원격 파이프라인을 어떻게 통합할지에 대한 해결책을 찾아보기로 했습니다.

# 문제

Jenkins를 사용하여 Roku 장치에서 Appium 테스트를 실행하는 CI/CD 파이프라인을 설정하려고 합니다. 이 과정에서 발생하는 문제점은 아래와 같습니다:

- 이 작업을 수행하려면 테스트를 실행하기 위해 실제 Roku 장치를 사용해야 합니다. Roku는 현재 개발을 지원하기 위한 시뮬레이터/에뮬레이터를 제공하지 않습니다. 그래서 Appium Roku 드라이버 모듈은 테스트를 실행하기 위해 장치에 연결해야 합니다.
- 한 걸음 더 나아가 Roku 장치는 개발에 있어서 매우 폐쇄적인 생태계를 가지고 있습니다. 이 장치들은 아티팩트를 업로드하고 자동화된 테스트를 수행하기 위해 IP 주소를 사용하여 연결할 수 있는 방법을 제공합니다. 문제는 이 IP 주소가 해당 장치가 속한 네트워크에서만 접근할 수 있다는 것입니다.

<div class="content-ad"></div>

위 내용을 요약하면, Appium을 사용하여 Roku 드라이버로 자동화된 테스트를 실행하려면 원격 환경(Jenkins Server)에서 실행 중인 컴퓨터/서버와 동일한 네트워크에 연결된 물리 장치가 필요합니다.

# 해결책

문제를 해결하기 위해 최상의 해결책을 찾으려고 반복적인 방법을 취하여 해결책을 구현하는 데 두 부분으로 나뉩니다. 퍼즐 조각 중 하나는 Roku 장치의 IP 주소를 인터넷에 노출하는 것입니다. 이것을 통해 장치가 네트워크 뒤로 닫혀 있는지 또는 다른 보안 제한이 있는지 확인할 수 있습니다.

# 1. 포트 포워딩

<div class="content-ad"></div>

우리는 처음에 Roku 장치가 인터넷으로부터 차단되어 있다고 생각했습니다. 그래서 장치를 인터넷에 노출시키면 Jenkins 파이프라인이 장치에 연결되어 테스트를 실행할 수 있을 것이라고 생각했습니다. 그래서 우리의 첫 번째 시도는 포트 포워딩을 사용하여 인터넷에서 라우터와 방화벽을 통해 Roku 장치의 IP로 트래픽을 라우팅하는 것이었습니다. 이를 위해 Roku 장치의 IP와 다음 포트를 인터넷에 노출시켜야 했습니다:

- 포트 80 - 이것은 HTTP 포트입니다. 이 포트에 액세스하면 Roku 장치 설치 웹 페이지가 표시되며 여기에서 테스트를 위해 애플리케이션을 업로드할 수 있습니다. 그러나 http://`ROKU_DEVICE_IP`:80/plugin_install로 POST 요청을 하면 Roku가 제공하는 웹 페이지를 거치지 않고 아티팩트를 업로드할 수 있습니다. 이것이 Appium Roku Driver 플러그인이 하는 일입니다.
- 포트 8060 - 이것은 장치의 ECP 포트입니다. 이 포트를 통해 Roku 장치에서 다양한 정보 및 통계를 쿼리할 수 있습니다. 또한 장치에서 명령을 실행할 수 있는 기능을 제공합니다. 이것이 Appium Roku Driver 플러그인이 하는 일입니다.

따라서 여기서 목표는 Jenkins 파이프라인이 네트워크의 공용 IP 주소를 사용하여 장치에 액세스할 수 있도록 Roku 장치의 IP 주소를 포트 80과 8060에 노출시키는 것이었습니다.

우리는 기본적으로 라우터의 포트 포워딩 규칙을 수정하여 공용 트래픽이 라우터로 허용되도록 했습니다. 각 라우터마다 다르기 때문에 여기에 예시를 추가하지는 않았지만, 여러분이 구글에서 특정 라우터에 대한 포트 포워딩을 검색하면 몇 가지 예제를 볼 수 있을 것입니다.

<div class="content-ad"></div>

젠킨스 서버만이 노출된 IP와 포트를 통해 요청을 보낼 수 있도록 하기 위해 보안을 유지하기 위해 소스 IP를 젠킨스가 실행되는 서버의 IP 주소로 설정했습니다. 아래는 이를 고수위에서 보여주는 다이어그램입니다.

안타깝게도 이것만으로는 충분하지 않았습니다. Roku 장치는 여전히 외부 요청을 차단했는데, 장치가 요청이 네트워크 내부에서 오지 않았음을 감지할 수 있었습니다. 이것이 우리를 프록시 접근 방식으로 이끈 이유였습니다.

# 2. 온프레미스 프록시 

따라서 우리에게 가해진 네트워크 제한을 우회하기 위해, 라우터와 Roku 장치 사이의 중간자 역할을 하는 로컬 네트워크 내에서 실행되는 애플리케이션이 필요했습니다. 이 애플리케이션은 네트워크 외부에서 오는 요청을 라우코 장치로 보내어 마치 네트워크 내부에서 오는 것처럼 보이게 했습니다.

<div class="content-ad"></div>

우리는 NGINX를 사용하기로 결정했습니다. 우리는 네트워크 안에서 요청을 Roku 장치로 전달하기 위해 NGINX를 역방향 프록시로 사용할 것입니다. NGINX 프록시는 호스트 헤더를 제거하여 장치가 요청이 네트워크 내에서 시작된 것으로 생각하게 할 것입니다. 아래에는 이를 고수준에서 나타낸 다이어그램이 있습니다.

# NGINX 역방향 프록시 설정

NGINX 프록시를 만들기 위해 Docker를 사용했으므로 환경 간 불일치가 발생하지 않습니다. 이것은 Nginx 프록시를 설정하고 실행하기 위해 필요한 다양한 구성 파일입니다.

*roku-proxy.conf*

<div class="content-ad"></div>

여기서는 NGINX가 80포트와 8060포트에서 수신하고 해당 요청을 같은 포트로 루쿠(Roku) 장치의 IP 주소로 전달하도록 설정하고 있습니다.

```js
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    
    server_tokens off;
    location / {
        proxy_pass http://<roku-target-ip>:80; # 루쿠 장치 (HTTP)
        proxy_redirect off;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Authorization $http_authorization;
        proxy_pass_header Authorization;
        proxy_set_header Content-Length $http_content_length;
        proxy_pass_header Content-Length;
        proxy_set_header Content-Type $http_content_type;
        proxy_pass_header Content-Type;
    }
}

server {
    listen 8060;
    listen [::]:8060;
    server_name _;
    
    server_tokens off;
    location / {
        proxy_pass http://<roku-target-ip>:8060; # 루쿠 장치 (ECP 프로토콜)
        proxy_redirect off;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

NGINX는 특정 헤더를 제거하기도 합니다. 80포트에서 수신 대기 중인 서버 블록에서는 NGINX에 원본(Jenkins 서버)에서 루쿠 장치로 Authorization, Content-Length 및 Content-Type 헤더를 명시적으로 전달하도록 지시하고 있습니다.

*nginx.conf*

<div class="content-ad"></div>

기본 nginx.conf 파일입니다. 여기에 추가한 것은 해당 폴더에서 설정 파일을 포함하기 위해 맨 아래에 추가한 마지막 줄뿐입니다.

```js
user  nginx;
worker_processes  auto;
error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    server_names_hash_bucket_size 64;
    client_max_body_size 3M;
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;
    sendfile        on;
    keepalive_timeout  65;
    include /etc/nginx/sites-enabled/*;
}
```

*Dockerfile*

아래 내용은 Dockerfile에서 가져온 것입니다. 여기서 우리는 NGINX 서버를 관련 설정 파일로 구성하고 있습니다.

<div class="content-ad"></div>

```docker
FROM nginx:1.25.1-alpine
COPY ./nginx.conf /etc/nginx/
COPY ./roku-proxy.conf /etc/nginx/sites-available/
RUN mkdir -p /etc/nginx/sites-enabled
RUN ln -s /etc/nginx/sites-available/roku-proxy.conf /etc/nginx/sites-enabled/roku-proxy.conf
RUN nginx -t
CMD ["nginx", "-g", "daemon off;"]
```

# 이미지 빌드

위의 이미지를 빌드하려면 다음 명령어를 실행하세요.

```docker
docker build -t roku-nginx-proxy .
```

<div class="content-ad"></div>

# 이미지 실행하기

위에서 만든 이미지로부터 컨테이너를 실행하려면 다음 명령어를 실행하세요

```js
docker run --rm --name roku-nginx-proxy -p 8000:80 -p 8600:8060 roku-nginx-proxy                                    |
```

위 명령어를 실행한 후 컨테이너가 실행될 것입니다. 컨테이너는 포트 8000과 8600이 노출될 것입니다. 호스트 포트로는 이곳에서 사용 가능한 어떤 포트든 선택할 수 있습니다. 호스트 포트는 콜론 앞의 포트입니다.

<div class="content-ad"></div>

# 3. 모두 함께 적용하기

문제없이 작동하려면 포트와 IP 주소가 올바르게 일치해야 합니다. 다음을 확인해야 합니다:

공용 IP를 확인하려면 https://google.com에서 "내 공용 IP는 무엇인가요?"를 검색하세요. 이 모든 IP/포트 매핑이 구성되면 Appium Roku 드라이버 IP가 온프렘 네트워크의 공용/정적 IP로 설정되었다면 Jenkins 자동화 테스트가 연결되어야 합니다.

# 보안

<div class="content-ad"></div>

보안을 유지하기 위해서 우리는 제한된 IP 주소에서의 요청만 수락하도록 해야 합니다.

- 방화벽/라우터와 NGINX 프록시가 Jenkins 서버의 IP 주소에서 80 포트 및 8060 포트로의 요청만 수락하도록 확인하세요. 이를 위해 Jenkins 서버가 IP가 변경될 때마다 IP를 계속 업데이트하는 것을 방지하기 위해 정적 IP를 설정해야 합니다.
- Roku 장치의 비밀번호를 Jenkins 시크릿 매니저에 저장하세요.

# 주의 사항 

- 온프레미스 네트워크의 공용 IP 주소는 변경될 수 있습니다 (정적 IP 필요)
- 온프레미스 네트워크의 공용 IP 주소는 ISP에 의해 가려질 수도 있습니다. Google에서 "내 IP는 무엇인가요?"라고 입력했을 때 나오는 IP가 ISP가 노출하는 IP일 수도 있어요.
- Roku 장치가 응답하지 않을 수 있고 수동으로 재부팅해야 할 수도 있습니다.

<div class="content-ad"></div>

# 안정성 향상

- 공용 네트워크와 Jenkins 서버에 대한 정적 IP를 사용하세요.
- 온프레미스/로컬 공용 IP가 변경될 때 마다 자동으로 업데이트해주는 온라인 서비스를 사용할 수 있습니다.
- 일일(이상)로 Roku 장치를 재부팅하세요. 때로는 응답하지 않는 경우가 있을 수 있습니다.

# 자료

- 외부 제어 프로토콜 (ECP): [Roku 개발자 문서](https://developer.roku.com/docs/developer-program/dev-tools/external-control-api.md)
- Roku 네트워크 제한사항 [Roku 개발자 포럼](https://community.roku.com/t5/Roku-Developer-Program/Internet-vs-Roku-on-hardening-world-s-dumbest-1761-Rokus/m-p/484586)
- Appium Roku 드라이버: [GitHub 링크](https://github.com/dlenroc/appium-roku-driver)