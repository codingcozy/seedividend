---
title: "Nextjs 앱을 Docker로 컨테이너화하는 방법"
description: ""
coverImage: "/trivasor.github.io/assets/no-image.jpg"
date: 2024-07-07 23:35
ogImage: 
  url: /trivasor.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Dockerize a Next.js App"
link: "https://medium.com/@itsuki.enjoy/dockerize-a-next-js-app-4b03021e084d"
---


Vercel에 Next.js 앱을 배포하려면 이 경우에는 컨테이너가 필요하지 않습니다. Next.js는 Vercel에서 생성 및 유지 관리되기 때문에 배포를 쉽게 할 수 있습니다. 그러나 AWS, Google Cloud Run 또는 기타 클라우드 제공업체를 통해 앱을 실행하고자 하는 경우에는 컨테이너가 필요합니다.

온라인에서 발견한 대부분의 기사들은 Node.js 앱을 도커화하는 방법을 설명하지만, Next.js 앱에 중점을 두는 내용은 많이 없었습니다. 해결책은 있지만, 그 해결책들이 제게 몇 시간이 걸리는 오류를 발생시켜서 해결하는 데 애를 썼습니다. 그래서 제가 그것을 어떻게 하였는지, 마주한 문제들, 그리고 그에 대한 해결책을 공유하려고 합니다.

# 시작하기!

기존의 Next.js 프로젝트나 Vercel에서 공식적으로 제공된 예제 중 하나를 복제하여 시작하세요. 온라인에서 발견한 몇 가지 다른 해결책은 next.config.js에 다음 라인을 추가하여 독립 실행형 애플리케이션을 빌드하도록 구성하는 것이 반드시 필요하다고 제안했지만, 해당 라인을 추가하지 않아도 모든 것이 잘 작동하는 것을 발견했습니다.

<div class="content-ad"></div>


```js
const nextCofig = {
  output: 'standalone', // 이 줄 없어도 잘 작동돼서요
  // ... 다른 설정들
}
```

## DockerFile

루트 레포지토리에 Dockerfile을 추가하세요. 이 파일에는 우리가 빌드할 도커 이미지에 대한 명령어가 들어갑니다.

저는 두 가지 버전의 Dockerfile을 만들었는데요. 하나는 간단하고 기본적인 단일 단계를 가진 것으로 개발 단계/서버를 테스트하는 용도로 사용하고, 다른 하나는 다중 단계로 구성된 것으로 프로덕션 및 개발 모두에 활용할 수 있는 docker-compose.yml과 함께 사용할 수 있는 것입니다.


<div class="content-ad"></div>

호환되는 이미지 목록은 여기에서 찾을 수 있어!

<div class="content-ad"></div>

WORKDIR은 이후 명령어들에 대한 컨텍스트를 설정합니다. 이름은 원하는 대로 지을 수 있지만, 저는 'app'으로 지었습니다. 그런 다음 package.json 및 package-lock.json 파일을 컨테이너로 복사하고, RUN npm install을 통해 모든 종속 항목을 설치할 수 있습니다.

이후에는 현재 루트 디렉토리에서 프로젝트의 모든 코드를 WORKDIR(제 경우에는 /app)로 복사합니다.

Expose 3000은 컨테이너에게 앱이 3000 포트에서 실행됨을 알려줍니다.

모든 설정이 완료되면, CMD npm run dev로 컨테이너에게 개발 서버를 시작하도록 요청합니다.

<div class="content-ad"></div>

그게 바로 Dockerfile을 위한 모든 것이에요!

우리가 방금 만든 Dockerfile에서 도커 이미지를 빌드하려면 단순히 다음 명령어를 실행하면 됩니다. 저는 이것을 my-app이라고 이름 지었지만, 원하시는 대로 변경하셔도 괜찮아요. 그리고 마지막에는 .을 빼먹지 마세요.

```js
docker build -t my-app .
```

이미지가 생성되었다면, 이제 실행할 수 있어요.

<div class="content-ad"></div>

```js
도커를 실행합니다
$ docker run -p 3000:3000 my-app
```

3000:3000은 앱을 실행할 포트를 지정합니다. 제 경우에는 3000번 포트에 실행할 거에요. 그리고 http://localhost:3000에 접근하면 작동 중인 앱을 볼 수 있습니다!

멀티 스테이지 도커 파일(Multi-stage DockerFile)

이제 우리는 더 빠르고 효율적인 빌드를 만들어 주며, 운영과 개발 단계를 쉽게 전환할 수 있게 해주는 멀티 스테이지 도커 파일을 만들어 볼 거에요.

<div class="content-ad"></div>

도커파일을 아래와 같이 수정해 주세요.

```js
FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base as builder
WORKDIR /app
COPY . .
RUN npm run build


FROM base as production
WORKDIR /app

ENV NODE_ENV=production
RUN npm ci

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

CMD npm start

FROM base as dev
ENV NODE_ENV=development
RUN npm install 
COPY . .
CMD npm run dev
```

이 경우에는 node:18-alpine를 사용해보겠습니다. 주된 것보다 훨씬 작습니다. -alpine를 사용하기 위해서는 처음에 파이썬을 설치해야 하므로 추가로 RUN apk add --no-cache g++ make py3-pip libc6-compat 이 있는 것입니다. 우리는 공통 설정을 base 단계에 넣어서 추후 다른 단계에서 재사용할 수 있도록 했습니다. 단계 이름은 as 뒤에 오는 것을 변경하여 단계 이름을 변경할 수 있습니다.

빌더 단계는 기본적으로 npm run build를 실행하는 역할을 합니다. 프로덕션 단계에서 COPY --from=builder를 시도할 때 해당 파일들이 이미 존재하지 않으면 이 단계가 호출됩니다. 보세요? 여기서 다중 단계 Dockerfile이 유용하게 사용되는 곳입니다. 빌더 단계는 필요할 때만 호출됩니다.


<div class="content-ad"></div>

우리의 프로덕션 단계에서는 NODE_ENV를 production으로 설정하며, 이렇게 하면 성능이 세 배 더 향상된다고 합니다. 다음으로는 npm ci를 실행하는데, 이는 지속적 통합을 위한 것이라고 합니다. npm install 대신 사용한다구요.

그 후에는 보안상의 이유로 앱을 실행할 비루트 유저를 추가했습니다. 저는 nextjs라는 사용자를 만들었고, 그룹은 nodejs로 지연됩니다.

이후에는 COPY — from=builder를 사용하여 빌더 단계에서 필요한 자산을 복사했습니다.

마지막으로, npm start를 호출하여 애플리케이션을 시작합니다.

<div class="content-ad"></div>

저희는 개발 단계에서도 단일 단계 Dockerfile에서 한 것과 똑같은 작업을 하고 있기 때문에 그 부분은 건너뛰려고 합니다.

docker-compose.yml을 생성하기 전에 Dockerfile이 실제로 빌드되는지 확인하고 싶다면 docker build -t my-app . 및 docker run -p 3000:3000 my-app 명령을 실행할 수 있습니다. 테스트하려는 단계를 주석 처리하는 것을 잊지 마세요. 예를 들어, 프로덕션 단계가 성공적으로 빌드 및 실행되는지 확인하려면 FROM base as dev 다음에 오는 모든 부분을 주석 처리하면 됩니다.

## Docker Compose

Docker Compose를 사용하면 컨테이너를 빌드하거나 실행하는 긴 명령어를 기억할 필요가 없습니다. docker-compose build 및 docker-compose up 명령어만 사용하면 됩니다.

<div class="content-ad"></div>

루트 디렉토리에 docker-compose.yml 파일을 추가해주세요.

```yaml
version: '3.8'
services:
  app:
    image: openai-demo-app
    build:
      context: ./
      target: dev
      dockerfile: Dockerfile
    volumes:
        - .:/app
        - /app/node_modules
        - /app/.next
    ports:
      - "3000:3000"
```

여기서 version: '3.8'은 사용할 Docker Compose 버전을 지정합니다. 이 경우에는 app이라는 하나의 서비스만 있지만 필요에 따라 더 많이 추가할 수 있습니다.

Build context는 현재 디렉토리를 지정하고 target은 Docker 이미지를 빌드할 단계를 지정합니다. 프로덕션 환경에서 실행하려면 단순히 target: production으로 설정하면 됩니다.

<div class="content-ad"></div>

Docker에서 Volume은 호스트의 ./ 디렉토리에서 컨테이너의 /app 디렉토리로 내용을 복사하도록 지시합니다.

마지막으로, 호스트 머신의 포트 3000을 컨테이너의 포트 3000과 매핑합니다. 우리는 컨테이너를 빌드할 때 포트 3000을 노출시켰고, 우리 앱은 또한 3000 포트에서 실행됩니다.

## Docker Compose로 테스트하기

마침내 Docker 이미지를 빌드하는 방법을 알아보았습니다. 더 빠른 빌드를 위해 Docker의 BuildKit 기능을 사용할 것입니다.

<div class="content-ad"></div>

```js
이미지 빌드가 끝나면, 아래와 같이 이미지를 실행하고 앱을 시작할 수 있어요:

docker-compose up

그 후에 브라우저에서 http://localhost:3000 으로 이동하면, 여러분의 앱이 실행되는 걸 확인할 수 있어요!!! 🌟
```

<div class="content-ad"></div>

이게 전부에요!

이제 제가 겪은 몇 가지 문제를 공유할게요. 혹시 도커 컨테이너가 작동하지 않는다면 어떤 문제가 있는지 알아보기 어렵다면 도움이 될 수 있을 거예요.

# 겪은 문제들

- 파이썬이 명령줄이나 npm 구성에서 설정되지 않았습니다: (맥 사용자로서) 저는 python을 경로에 추가하려고 시도했고, python을 python3으로 alias지정하고, python을 제거하고 다시 설치하는 등의 방법을 시도해봤는데 아무것도 해결되지 않았어요. 그래서 찾아낸 두 가지 해결책을 공유할게요. (1) node:18-alpine 대신 node:18(또는 다른 원하는 버전)을 사용하세요. (2) 패키지 설치하기 전에 실행할 RUN apk add --no-cache g++ make py3-pip libc6-compat를 추가하세요.
- docker-compose up을 사용할 때 '/app/.next' 디렉토리에서 프로덕션 빌드를 찾을 수 없을 때: 도커 run을 통해 이미지를 실행하면 모든 것이 예상대로 작동했지만, docker-compose로 실행하면 위와 같은 문제가 발생했어요. 어떤 해결책들은 Dockerfile에서 CMD ["npm","run","build"]를 CMD npm start 앞에 추가하라고 제안하지만, 이렇게 하면 "no two CMD allowed"라는 오류가 발생했습니다. 제 해결책은 Docker-compose.yml의 volumes에 -- /app/.next를 추가하는 것이었어요.

<div class="content-ad"></div>

오늘은 여기까지입니다! 

읽어 주셔서 감사합니다! 이 제안들이 도움이 되기를 바라요!