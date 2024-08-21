---
title: "Coolify를 사용해 Docker Compose로 앱 배포하기 방법"
description: ""
coverImage: "/trivasor.github.io/assets/no-image.jpg"
date: 2024-07-10 01:57
ogImage:
  url: /trivasor.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Coolify: Deploying your app with Docker Compose"
link: "https://medium.com/@darkghosthunter/coolify-deploying-your-app-with-docker-compose-8f85c8ae3d9a"
isUpdated: true
---

## 쉽게 접근할 순 없지만 이용해 보면 된다

저는 지난 일주일 동안 Coolify를 시도해 보았습니다. 매우 오래된 서버와 코드베이스, 그리고 리눅스 커널을 업데이트해야 했기 때문에요. 이후에는 이런 서버들을 구동시킨 뒤, 새로운 버전을 배포할 때마다 수동으로 하드웨어 작업을 하는 대신 Docker를 통해 응용 프로그램을 격리시키고 배포할 수 있는 "서버 프레임워크"를 갖춰야 했습니다.

이 격리가 가장 중요한 부분입니다. 종속성과 라이브러리의 차이로 각 앱을 개별 VM에 옮기는 시도가 있었지만, 이 문제는 오랜 시간 전에 컨테이너화 되었습니다.

조언을 구해본 결과, Laravel로 만들어진 Coolify를 사용해보게 되었습니다. Coolify는 개인 git 리포지토리나 Docker Compose 스택과 같은 소스를 통해 배포되는 "프로젝트"를 처리합니다. Kubernetes, Nomad, Docker Swarm과 견줄 만한 것은 아니지만, 정적이거나 간단한 웹 프로젝트, 단일 이진 파일 또는 Docker 마법이 필요한 프로젝트와 함께 사용하기에 훌륭합니다.

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

# 도커 컴포즈의 독특한 점

Coolify가 도커 컴포즈를 기반으로 앱을 배포하는 방식은 비교적 간단합니다. "coolify-helper" 컨테이너를 가져와서 git 저장소에서 코드를 가져와 도커 컴포즈를 호출하여 이미지를 빌드하고 서비스를 시작합니다.

Coolify는 뒷단에서 많은 "마법"을 실행합니다. 가장 중요한 것은 docker-compose.yml 파일을 추가 속성과 함께 파싱하는 것입니다. 예를 들어, Traefik이 서버를 발견하기 위한 레이블, 롤링 릴리스 간에 유지되도록 설정된 볼륨, 그리고 일부 다른 환경 값을 포함합니다.

이 방법의 문제점은 배포에 있습니다. 도우미 컨테이너는 코드를 가져오지만 한 번 작업이 완료되면 컨테이너가 사라지기 때문에 호스트에서 볼륨을 마운트할 수 없습니다. 다시 말해, 앱을 빌드할 때 (일반적으로 마지막 단계) 컨테이너 중 하나 안으로 앱을 복사해야 합니다.

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

이미지 태그를 Markdown 형식으로 바꿀 때 직면하는 다른 문제가 있습니다. 프로젝트의 루트 디렉터리에서 데이터를 복사해야 하는 경우 Docker Compose 파일은 해당 위치에 있어야 합니다. Docker 파일은 속한 위치 아래만 살펴볼 수 있으므로 상위 디렉터리를 넘어가는 파일을 가져올 수 없습니다 (보안 기능).

# 실제 예시

Node 어플리케이션에서 Valkey 인스턴스가 필요한 경우를 상상해보세요. Docker Compose 파일에서 이 둘을 모두 선언할 수 있습니다. 이것은 새로운 것이 아니지만 build 키에 작은 마법이 있습니다.

```js
# /home/developer/projects/example/docker-compose.yml

version: "3"

services:
  app:
    build:
      context: .
      dockerfile: /docker/app/Dockerfile
      target: deployment
    image: app:latest
    environment:
      APP_URL: $COOLIFY_URL
    volumes:
      - app_storage:/app/storage
    expose:
      - "8080"
    depends_on:
      - db

  db:
    image: valkey/valkey
    # ... 기타 사항
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

위의 내용을 Markdown 형식으로 변경하세요:

도커 컴포즈 파일이 있는 루트 폴더인 "context" 키를 주목해주세요. 거기서 올바른 Dockerfile을 가리키기 위해 `docker/app/Dockerfile`에 있는 dockerfile 키를 설정해야 합니다. Docker 관련 파일을 저장하는 좋은 방법은 독립적인 디렉토리에 보관하는 것입니다.

Dockerfile의 내용은 다단계 접근법을 따릅니다. 이를 통해 이미지로 가져올 다단계의 "대상"을 설정할 수 있습니다. "배포" 단계를 "deployment"으로 지정하면 Dockerfile에서 선언된 해당 단계를 사용할 수 있는 target 키를 사용할 수 있습니다.

해당 Dockerfile은 다음과 같습니다:

```js
###########################################################
# 기본 이미지
###########################################################
FROM node:22-alpine AS base

WORKDIR /app

###########################################################
# 개발 이미지
###########################################################
FROM base AS development

# 개발자가 UID와 GUID를 설정할 수 있도록 함
ARG UID=1000
ARG GID=1000

# 웹 사용자를 개발자와 일치하게 만듬
RUN groupadd -g $GID -o web && \
    useradd -m -u $UID -g $GID -o -s /bin/bash web

# 여기저기 디버그 플래그 구성
ENV APP_DEBUG=true

# 웹 사용자로 전환
USER web

# 앱을 자체 서버로 실행
ENTRYPOINT ["npm", "run", "dev-server", "--foreground"]

###########################################################
# 배포 이미지
###########################################################
FROM base AS deployment

# 웹 사용자를 1000:1000으로 생성
RUN groupadd -g 1000 -o web
RUN useradd -m -u 1000 -g 1000 -o -s /bin/bash web

# 앱을 "web" 사용자로 컨테이너에 복사
COPY --chown=1000:1000 . /app

# 웹 사용자로 전환
USER web

# 앱 빌드
RUN npm run production

# 프로덕션 서버 실행
ENTRYPOINT ["npm", "run", "server", "--foreground"]
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

이 Dockerfile은 매우 단순화되었지만, 빌드 단계가 다른 단계, 즉 베이스 이미지에 기반하여 수행되는 것을 볼 수 있습니다.

개발자는 개발 단계 이미지를 대상으로 지정하여 이 컨테이너를 사용할 수 있으며, 배포 시 (docker-compose.yml 파일을 통해) 빌드 구성에서 배포 단계 이미지를 지정할 수 있습니다. 두 환경이 동일한 이미지를 기반으로 하기 때문에 두 환경이 서로 다른 파일을 사용할 필요가 없습니다.

배포 단계 이미지는 프로젝트 파일을 복사하고 애플리케이션을 빌드하는 작업을 수행하며, Docker Compose 파일에서 바인드 마운트를 사용하는 대신에 이런 식으로 진행됩니다. 이는 소스에서 검색된 코드가 일시적이기 때문이며, 남아있는 유일한 것은 컨테이너 자체일 것입니다.
