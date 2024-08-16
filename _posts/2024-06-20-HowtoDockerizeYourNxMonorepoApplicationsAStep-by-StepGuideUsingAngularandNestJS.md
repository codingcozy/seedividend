---
title: "Nx 모노레포 애플리케이션을 도커화하는 방법 Angular과 NestJS를 사용한 단계별 안내"
description: ""
coverImage: "/assets/img/2024-06-20-HowtoDockerizeYourNxMonorepoApplicationsAStep-by-StepGuideUsingAngularandNestJS_0.png"
date: 2024-06-20 05:35
ogImage: 
  url: /assets/img/2024-06-20-HowtoDockerizeYourNxMonorepoApplicationsAStep-by-StepGuideUsingAngularandNestJS_0.png
tag: Tech
originalTitle: "How to Dockerize Your Nx Monorepo Applications: A Step-by-Step Guide Using Angular and NestJS"
link: "https://medium.com/@abdullahzengin/how-to-dockerize-your-nx-monorepo-applications-a-step-by-step-guide-using-angular-and-nestjs-a079b1b9a181"
isUpdated: true
---




<img src="/assets/img/2024-06-20-HowtoDockerizeYourNxMonorepoApplicationsAStep-by-StepGuideUsingAngularandNestJS_0.png" />

안녕하세요,
저는 Medium에 처음으로 포스팅하는 중입니다 (사실 인생에서 처음이에요 😔). 요즘 작업 중이었고 다양한 시각을 검토하기 위해 이 플랫폼에서 많은 도움을 받은 소스를 스캔하는 동안 누락된 것 같다고 생각한 주제에 대해 첫 블로그를 쓰기로 결심했습니다. 수년 동안 써보고 싶었지만 시작하는 동기를 얻지 못했어요. 먼저 Aziz Nal에게 지원해주시고 글을 쓰라고 격려해 준 분께 감사드립니다.

이 글은 Angular, NestJS 및 이들이 사용하는 라이브러리가 포함된 NX Monorepo 프로젝트에서 각 프로젝트에 대한 Dockerfile을 작성하는 방법과 각 프로젝트를 개별 컨테이너에 배포하는 방법을 단일 Docker-Compose 파일을 사용해 살펴볼 것입니다. 

이 글은 터키어로도 읽을 수 있습니다. 해당 링크에서 읽어보세요.

<div class="content-ad"></div>

그럼 시작해 보죠 😄

## 우리의 NX 프로젝트 만들기

다음 명령어로 NX 워크스페이스를 생성해 봅시다.

```js
npx create-nx-workspace@latest
```

<div class="content-ad"></div>

이 명령을 실행한 후 워크스페이스 설정을 위해 몇 가지 선택지와 입력을 요청받게 됩니다.

![이미지](/assets/img/2024-06-20-HowtoDockerizeYourNxMonorepoApplicationsAStep-by-StepGuideUsingAngularandNestJS_1.png)

여기서 우리의 주요 목적은 프로젝트를 생성하는 것이 아니기 때문에, 미리 구성된 프로젝트 설정을 위해 다음 옵션을 선택하였습니다:

![이미지](/assets/img/2024-06-20-HowtoDockerizeYourNxMonorepoApplicationsAStep-by-StepGuideUsingAngularandNestJS_2.png)

<div class="content-ad"></div>

그 후 설정을 계속 진행할 구성을 선택해야 해요. 제 글의 시작 부분에서도 언급했듯이, Angular 및 NestJS 애플리케이션에 대해 마지막 옵션을 선택했어요.

![이미지](/assets/img/2024-06-20-HowtoDockerizeYourNxMonorepoApplicationsAStep-by-StepGuideUsingAngularandNestJS_3.png)

마지막 단계로, 워크스페이스와 프로젝트 이름을 입력하고 Angular 프로젝트에 대한 몇 가지 설정을 선택해야 해요. 이 단계에서 'NXDockerDeployment'를 레포지토리 이름으로, 'MyApp'을 프로젝트 이름으로 지정했고, Angular 프로젝트 css 형식으로 'scss'를 선택했어요. 'NX Cloud'를 사용하고 싶지 않아서 'No' 옵션을 선택했어요.

프로젝트 설정이 완료되면, 프로젝트 구조는 이렇게 보일 거에요:

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-20-HowtoDockerizeYourNxMonorepoApplicationsAStep-by-StepGuideUsingAngularandNestJS_4.png)

여기에는 'my-app'이라는 Angular 프로젝트, 'api'라는 NestJS 프로젝트, 그리고 함께 사용할 라이브러리 프로젝트가 있습니다.

Api 및 My-app 프로젝트를 실행하고 브라우저에서 열면 다음 페이지가 표시됩니다.

![이미지](/assets/img/2024-06-20-HowtoDockerizeYourNxMonorepoApplicationsAStep-by-StepGuideUsingAngularandNestJS_5.png)


<div class="content-ad"></div>

작은 업데이트를 진행하겠습니다. NX의 미리 구성된 설정을 사용할 때 Angular 프로젝트를 위한 준비된 프록시 구성이 함께 제공됩니다. 이 글의 주제가 제품 환경에 맞게 프록시 구성을 조정하는 데 있지 않기 때문에 이 구성을 무시하고 나의 프로젝트에서 선호하는대로 작은 변경을 가할 것입니다.

먼저, 'my-app/src/environments' 폴더 아래에 있는 'environment.ts' 파일을 열어 다음과 같이 업데이트합니다:

```js
export const environment = {
  production: false,
  BACKEND_URL: 'http://localhost:3333', // 실제 백엔드 포트와 다를 경우 업데이트 해야 합니다.
};
```

그 다음, 제품 환경으로 프로젝트를 컴파일하고 배포할 것이므로, 동일한 폴더 아래에 있는 'environment.prod.ts' 파일을 다음과 같이 업데이트합니다:

<div class="content-ad"></div>

```js
export const environment = {
  production: true,
  BACKEND_URL: 'http://192.168.1.154:8080',
};
```

마침내, 우리는 ‘my-app/src/app’ 폴더 아래의 ‘app.component.ts’ 파일을 열어 위에서 업데이트한 주소에 따라 api 프로젝트로 요청을 보낼 수 있도록 다음과 같이 업데이트합니다:

```js
import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@nxdocker-deployment/api-interfaces';
```

```js
@Component({
  selector: 'nxdocker-deployment-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>(`${environment.BACKEND_URL}/hello`);
  constructor(private http: HttpClient) {}
}
```

<div class="content-ad"></div>

우리가 업데이트를 한 후에도, 애플리케이션을 실행하고 브라우저에서 열면 이전과 같은 화면을 볼 수 있을 거에요.

<img src="/assets/img/2024-06-20-HowtoDockerizeYourNxMonorepoApplicationsAStep-by-StepGuideUsingAngularandNestJS_6.png" />

프론트엔드 작업을 완료한 후에는, API 프로젝트에서 CORS를 구성해야하는데, 이렇게 함으로써 배포 후에 문제가 없도록 할 수 있어요.

'api/src' 폴더 아래의 'main.ts' 파일을 열어서, "app.enableCors()"라인을 추가하여 CORS를 활성화해 주세요.

<div class="content-ad"></div>

```js
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
```

```js
import { AppModule } from './app/app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
bootstrap();
```

결과적으로, 프로젝트 배포를 위해 준비가 끝났습니다. 이제 두 번째 과정으로 넘어가서 'Dockerfile' 파일을 작성하는 것부터 시작하여 프로젝트를 배포할 준비를 완료할 수 있습니다.

## Dockerfile 파일 작성하기


<div class="content-ad"></div>

- 내 앱 Angular 프로젝트를 위한 Dockerfile

저희 프론트엔드 프로젝트용 Dockerfile을 작성하는 것으로 시작해보겠습니다. 이를 위해 저희 프로젝트 내 apps/my-app 폴더 아래에 Dockerfile이란 이름의 파일을 생성하고 아래의 코드를 복사해 넣습니다.

```js
FROM node:16.13.0-alpine AS builder
```

```js
WORKDIR /app
COPY package*.json ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install
COPY . .
RUN npx nx build my-app --prod
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/apps/my-app ./
RUN sed -i '10i \\ttry_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```  

<div class="content-ad"></div>

이제 함께 한 작업을 다시 한 번 살펴봐요.
먼저, Angular 프로젝트인 my-app에 대해 두 단계 배포를 진행하고 있어요. 첫 번째 단계에서는 프로젝트의 종속성을 설치하는 작업을 수행하고 빌드할 수 있는 node 이미지에서 프로젝트를 실행하고 빌드해요. 그리고 프로젝트를 컴파일하고 제품용으로 사용할 파일들을 생성해요. 두 번째 단계에서는 웹 서버에서 빌드 프로세스를 완료하고 컴파일된 프로젝트 파일을 게시할 수 있도록 필요한 조정을 완료해요. 저는 여기서 SPA (싱글 페이지 애플리케이션) 애플리케이션에서 흔히 사용되는 설정을 가진 nginx를 선호하고 설정했어요. 지금까지 우리가 한 작업을 대략적으로 살펴보았으니, 코드를 한 줄씩 자세히 살펴보려는 나와 같은 세부 사항에 관심 있는 친구들을 위해 코드를 살펴봐요.

- 우리는 작업을 수행하기 위해 Node가 설치된 node-alpine 배포본을 사용할 것을 명시하고 AS를 사용하여 'builder' 이미지로 이름을 지정해요.
- 다음 단계에서 사용할 /app 폴더를 작업 디렉토리로 지정해요.
- 프로젝트에서 필요한 패키지를 포함한 package.json 및 package-lock.json 파일들을 프로젝트에서 이 디렉토리로 복사해요.
- 성공적인 배포를 위해 필요한 종속성을 설치해요.
참고: 사용하는 배포본에 따라 이 단계가 달라질 수 있고 다른 패키지 설치 요구사항이 있거나 전혀 필요하지 않을 수 있어요.
- npm install 명령을 실행하여 앞서 복사한 패키지 파일에 따라 필요한 패키지를 설치해요.
- 프로젝트 파일들을 작업 디렉토리로 모두 복사해요.
- 프로덕션 환경을 위해 프로젝트를 빌드해요.
- 다음 단계에는 nginx:stable-alpine 이미지를 사용할 것을 명시해요.
- 작업 디렉토리를 /usr/share/nginx/html로 설정해요.
- 작업 디렉토리와 함께 제공되는 기본 파일들을 삭제해요.
- 첫 번째 단계에서는 'builder' 이미지 내에서 프로젝트를 컴파일한 위치에서 컴파일된 프로젝트 파일을 이 작업 디렉토리로 복사해요.
- 싱글 페이지 애플리케이션에 필요한 nginx를 구성해요.
- 마지막으로 nginx 서버를 시작해요. 참고: 이 설정에 따라 nginx 서버는 기본적으로 80번 포트에서 프로젝트를 게시할 거예요.

2. NestJS 프로젝트용 Dockerfile

이제 백엔드 프로젝트용 Dockerfile을 작성해보겠어요. 이를 위해 프로젝트의 apps/api 폴더 아래 Dockerfile이라는 파일을 만들고 다음 코드를 복사해 넣어주세요.

<div class="content-ad"></div>

```js
FROM node:alpine AS builder
```

```js
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install --only=development --silent
COPY . .
RUN npx nx build api --prod
FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install -g pm2@latest
RUN npm install --only=production --silent
RUN npm install express
COPY --from=builder /usr/src/app/dist/apps/api ./build
ENTRYPOINT ["pm2-runtime", "build/main.js"]
```

이제 여기서 차례대로 무엇을 하는지 살펴보겠습니다.
먼저, NestJS 프로젝트인 api에 대해 두 단계 배포를 할 것입니다. 첫 번째 단계에서는 프로젝트 종속성을 설치하고 프로젝트를 실행하고 빌드할 수 있는 노드 이미지에서 작업을 수행합니다. 그런 다음 프론트엔드 프로젝트와 마찬가지로 프로젝트를 컴파일하고 프로덕션에서 사용할 파일을 생성합니다. 두 번째 단계에서는 첫 번째 이미지에서 컴파일된 프로젝트 파일을 복사하고 프로덕션에 필요한 npm 패키지 설치를 마무리하고 빌드 프로세스를 완료합니다. 여기서 프로젝트를 시작하는 데 pm2를 사용하도록 선택했습니다. 지금까지 우리가 무엇을 할 것인지 대략적으로 논의했으므로, 이제 우리가 무엇을 하는지 단계별로 살펴보며 설명해보겠습니다.

- 우리는 운영을 수행할 노드 설치가 완료된 node-alpine 배포를 사용할 것임을 지정하며 'builder'로 이미지를 명명합니다.
- 다음 단계에서 사용할 /usr/src/app 폴더를 작업 디렉토리로 지정합니다.
- 프로젝트에서 필요한 패키지를 포함하는 package.json 및 package-lock.json 파일을 프로젝트에서 이 디렉토리로 복사합니다.
- 성공적으로 배포하기 위해 필요한 종속성을 설치 중입니다.
참고: 사용하는 배포에 따라 이 단계가 다를 수 있으며 다른 패키지 설치 요구 사항이 있을 수도 있습니다. 또는 전혀 필요하지 않을 수도 있습니다.
- 이전에 복사한 패키지 파일에 따라 필요한 패키지만 설치하도록 지정하여 npm install 명령을 실행합니다.
- 모든 프로젝트 파일을 작업 디렉토리로 복사합니다.
- 프로덕션 환경을 위해 프로젝트를 빌드합니다.
- 다음 단계의 작업을 계속하기 위해 새로운 node:alpine 이미지를 사용할 것임을 지정합니다.
- 작업 디렉토리를 /usr/src/app으로 설정합니다.
- 어플리케이션은 백엔드 어플리케이션이므로 로컬에 필요한 npm 패키지가 설치되어야 합니다. 따라서 여기에도 패키지 파일을 복사합니다.
- 이 이미지 내에서 성공적으로 배포하기 위해 필요한 종속성을 다시 설치합니다.
- 우리가 프로젝트 시작에 사용할 pm2 패키지를 전역으로 설치합니다.
- 프로젝트의 프로덕션을 위해 필요한 npm 패키지를 설치합니다.
- 이 단계에서 express 패키지를 설치합니다. 이 패키지를 별도로 설치해야 하는 이유는 express 패키지가 설치를 위한 package.json 파일에 포함되어 있지 않기 때문입니다. 이미 프로젝트에 express를 설치한 경우 이 단계가 필요하지 않을 것입니다.
- 첫 번째 단계에서 'builder' 이미지 내에서 프로젝트를 컴파일한 위치에서 컴파일된 프로젝트 파일을 이 작업 디렉토리의 build 폴더로 복사합니다.
- 그런 다음 main.js 파일에서 pm2-runtime 명령을 사용하여 백엔드 서버를 시작합니다.
참고: 이 컨테이너를 시작하면 main.ts에서 지정된 포트에서 프로젝트가 실행됩니다. 저는 이를 3333으로 설정했으므로 프로젝트는 이 포트에서 실행됩니다.

<div class="content-ad"></div>

## 도커 Compose 파일 준비

이번 단계에서는 모든 프로젝트를 한 곳에서 설정하는 방법과, 각각을 별도의 컨테이너에서 실행하는 단일 명령으로 모두 실행하는 방법을 살펴봅시다.

먼저, 프로젝트와 동일한 디렉토리에 docker-compose.yml이라는 파일을 다음 내용으로 생성해 보겠습니다.

![이미지](/assets/img/2024-06-20-HowtoDockerizeYourNxMonorepoApplicationsAStep-by-StepGuideUsingAngularandNestJS_7.png)

<div class="content-ad"></div>

이제 도커 컴포즈 파일의 내용을 채워봅시다.

VSCode에서 만든 docker-compose.yml 파일을 열고 다음 코드를 복사하여 붙여넣어주세요.

```js
version: "3"
```

```js
services:
  backend-app:
    container_name: backend-app
    restart: always
    ports:
      - "8080:3333"
    build:
      context: ./nxdocker-deployment
      dockerfile: ./apps/api/Dockerfile
      
  frontend-app:
    container_name: frontend-app
    restart: always
    ports:
      - "8090:80"
    depends_on:
      - backend-app
    build:
      context: ./nxdocker-deployment
      dockerfile: ./apps/my-app/Dockerfile"
```

<div class="content-ad"></div>

이제 코드를 단계별로 살펴봅시다.

- version : 우리는 docker-compose 버전 3을 사용할 것임을 명시합니다.
- services: 이 docker-compose로 시작할 모든 서비스를 나열합니다.
- backend-app: 우리의 백엔드 애플리케이션에 이름을 부여합니다.
- container_name: 백엔드 애플리케이션이 실행될 컨테이너의 이름을 backend-app으로 지정합니다.
- restart: 도커 서비스가 충돌하거나 다시 시작하거나 컴퓨터가 재부팅될 때 자동으로 다시 시작하도록 항상 설정합니다.
- ports: 컨테이너 안에서 백엔드 프로젝트가 실행되는 3333 포트를 외부에서 접근할 수 있도록 8080 포트로 노출합니다.
- build: mono repo 아키텍처로 인해 Dockerfile이 docker-compose 파일과 같은 위치에 있지 않을 것이므로 프로젝트의 메인 디렉터리와 함께 Dockerfile 파일이 있는 위치를 지정해서 서비스가 컴파일해야 하는 곳을 명시합니다.
- frontend-app: 우리의 프론트엔드 애플리케이션에 이름을 부여합니다.
- container_name: 프론트엔드 애플리케이션이 실행될 컨테이너의 이름을 frontend-app으로 지정합니다.
- restart: 도커 서비스가 충돌하거나 다시 시작하거나 컴퓨터가 재부팅될 때 자동으로 다시 시작하도록 항상 설정합니다.
- ports: 컨테이너 안에서 nginx로 실행되는 프론트엔드 프로젝트가 실행되는 80포트를 외부에서 접근할 수 있도록 8090포트로 노출합니다.
- build: 프로젝트의 메인 디렉터리를 지정하고 프론트엔드 프로젝트를 빌드하고 도커 이미지를 생성할 Dockerfile 파일을 찾는 경로를 지정합니다.

## 프로젝트 실행

이제 코드를 하나씩 따라가면서 프로젝트를 실행해봅시다. 어느새 설정에 지쳤나요? 프로젝트 끝이 보이지 않나요? 언제쯤 끝날까요? 😊

<div class="content-ad"></div>

믿기 어렵지만, 프로젝트를 시작할 준비가 모두 마련되었어요. 필요한 것은 터미널과 그 마법 같은 명령어만 남았네요 🙂

저희 docker-compose.yml 파일이 위치한 디렉토리에서 터미널 창을 열고 다음 명령어를 실행해 보세요.

```js
docker-compose up -d
```

이 명령어를 실행하면 docker-compose 파일에 있는 모든 설정이 실행됩니다. 필요한 이미지가 다운로드되고, Dockerfile 구성에 따라 레이어가 작성되며, 인터넷 속도에 따라 작업이 완료될 거예요. 작업이 끝나면 ‘-d’ 플래그가 터미널을 제어권으로 돌려줄 거에요. 🙏

<div class="content-ad"></div>

이 마법 같은 명령을 함께 실행해보고 결과를 확인해봐요!

![image](/assets/img/2024-06-20-HowtoDockerizeYourNxMonorepoApplicationsAStep-by-StepGuideUsingAngularandNestJS_8.png)

이제 모든 노력으로 우리 프로젝트가 원할하게 실행될 거에요.

바로 브라우저에서 확인해보세요.

<div class="content-ad"></div>

![image1](/assets/img/2024-06-20-HowtoDockerizeYourNxMonorepoApplicationsAStep-by-StepGuideUsingAngularandNestJS_9.png)

우리 해냈어요! 🎉🎊🍸🍾🥂 그게 다예요.

![image2](/assets/img/2024-06-20-HowtoDockerizeYourNxMonorepoApplicationsAStep-by-StepGuideUsingAngularandNestJS_10.png)

## 결과

<div class="content-ad"></div>

이 첫 블로그 포스트에서는 Nrwl NX Monorepo를 사용하여 프로젝트를 개발한 후 제작한 도커파일들이 어떻게 제작되는지 쉽게 설명해보려고 노력했어요. 그리고 단일 도커 컴포즈를 준비한 후 한 번의 명령으로 발행하는 방법을 알려드렸어요. 물론 이 과정은 프로젝트의 요구사항 및 필요에 따라 다양하게 달라질 수 있고, 배포는 간단하지 않지만, 이 글이 여러분에게 조금이나마 도움이 되었으면 좋겠어요.

여러분의 글에 피드백을 제공해드릴 수 있어서 기쁩니다. 모든 건설적인 비평을 환영합니다.

이 첫 번째 모험을 함께해줘서 감사합니다 🙏

## 참고 자료 및 링크

<div class="content-ad"></div>

- NX 문서
- Docker 문서