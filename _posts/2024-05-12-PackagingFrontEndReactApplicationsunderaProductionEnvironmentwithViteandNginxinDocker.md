---
title: "프로덕션 환경에서 Vite와 Nginx를 활용해 도커 안에서 Front-end React 앱을 패키징하기"
description: ""
coverImage: "/assets/img/2024-05-12-PackagingFrontEndReactApplicationsunderaProductionEnvironmentwithViteandNginxinDocker_0.png"
date: 2024-05-12 20:30
ogImage: 
  url: /assets/img/2024-05-12-PackagingFrontEndReactApplicationsunderaProductionEnvironmentwithViteandNginxinDocker_0.png
tag: Tech
originalTitle: "Packaging Front End React Applications under a Production Environment with Vite and Nginx in Docker"
link: "https://medium.com/gitconnected/packaging-front-end-react-applications-under-a-production-environment-with-vite-and-nginx-in-docker-7e2739bc0494"
---


## 현대 웹 개발의 효율적인 길을 탐험하다: 빠른 빌드를 위한 Vite, 고성능 서빙을 위한 Nginx, 그리고 견고한 React 애플리케이션을 위한 유연한 배포를 위해 도커를 활용하다.

# 소개

현대 웹 개발은 종종 React와 같은 프론트엔드 프레임워크와 Vite와 같은 강력한 빌드 도구를 활용하여 개발 프로세스를 효율화합니다. Docker도 애플리케이션을 패키징하고 배포하는 데 표준으로 자리 잡았습니다. 이 글에서는 Vite와 Nginx를 함께 사용하여 Frontend React 애플리케이션을 위한 Docker 이미지를 생성하는 방법을 살펴볼 것입니다. Vite와 Nginx의 기능과 장점에 대해 탐구하고, Nginx가 React 애플리케이션을 프로덕션 환경에서 배포하는 데 어떻게 적합한지 이해할 것입니다.

![이미지](/assets/img/2024-05-12-PackagingFrontEndReactApplicationsunderaProductionEnvironmentwithViteandNginxinDocker_0.png)



# Vite 및 Nginx 개요

## Vite: 빠른 빌드 도구

Vite는 프론트엔드 애플리케이션 개발 프로세스를 대폭 가속화하는 빌드 도구입니다. Vite는 네이티브 ES 모듈, 핫 모듈 교체 (HMR), 그리고 빠른 개발 서버를 활용하여 효율적인 개발 경험을 제공합니다. Vite의 독특한 종속성 해결 방식은 빠른 빌드를 가능케 하며, React 애플리케이션을 생성하는 데 우수한 선택지입니다.

React 애플리케이션 생성에 Vite를 활용하는 방법에 익숙하지 않다면, 제공된 링크에서 유용한 안내서를 참조하세요.



## Nginx: 고성능 웹 서버

Nginx는 대규모 연결을 처리하고 정적 파일을 효율적으로 제공하는 데 뛰어난 웹 서버입니다. 안정성, 낮은 자원 사용량 및 고부하 처리 능력으로 유명하여 프로덕션 배포에 이상적입니다. 저희 설정에서 Nginx는 React 애플리케이션을 제공하고 백엔드 서버와 통신하기 위해 역방향 프록시로 작동할 것입니다.

# 코드 안내

## Nginx 구성



다음 Nginx 구성은 8080번 포트에서 수신하고 React 애플리케이션의 요청을 처리하는 서버를 설정합니다:

```js
server {
    listen 8080;
    server_name localhost;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass YOUR_BACKEND_URL;
    }
}
```

이 구성은 Nginx에게 /usr/share/nginx/html에서 정적 파일을 제공하도록 지정하며, 여기에는 React 빌드가 위치합니다. 해결되지 않은 URL에 대해서는 index.html 페이지를 반환하여 React가 클라이언트 측 라우팅을 처리할 수 있도록 합니다. location /api/ 블록은 백엔드 서버로 요청을 전달하는 프록시를 설정하여, 프론트엔드와 백엔드 간의 원활한 통신을 가능하게 합니다.

## Vite 구성



Vite 설정 파일에서는 Vite가 React 애플리케이션을 빌드하는 방법을 정의합니다:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
    const envFile = mode === 'development' ? '.env.development' : '.env.production';
    dotenv.config({ path: envFile });
    return {
        plugins: [react()],
        build: {
            outDir: 'build',
            assetsDir: 'assets',
            emptyOutDir: true,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            proxy: {
                '/api': {
                    target: process.env.VITE_API_BASE_URL,
                    changeOrigin: true,
                },
            },
        },
    };
});
```

Vite 구성은 React에 필요한 플러그인을 설정하고, 빌드 출력 디렉토리를 build로 정의합니다. 또한 src 디렉토리에서 모듈을 쉽게 가져오기 위한 별칭을 설정합니다. 또한 개발 환경을 위해 백엔드 API로 요청을 전달하기 위한 프록시를 구성합니다. 이를 통해 개발 중에 교차 출처 문제에 대해 걱정하지 않고 프론트 엔드를 개발할 수 있습니다.

Vite의 프록시 사용에 익숙하지 않다면, 이전 글을 확인해 보세요:



마지막으로, 환경 변수가 올바르게 작동하도록 dotenv 라이브러리를 설치해야 합니다.

## Dockerfile 구성

Dockerfile은 애플리케이션을 빌드하고 프로덕션 환경을 설정하는 역할을 담당합니다:

```js
# 단계 1: 애플리케이션 빌드
FROM node:16 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# 단계 2: 프로덕션 환경 설정
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```



도커 파일은 다중 단계 빌드를 사용합니다. 첫 번째 단계에서는 React 애플리케이션을 Vite로 빌드하기 위해 Node.js 환경을 설정합니다. 최종 프로덕션 이미지에는 가벼운 Nginx Alpine 이미지가 사용되며, 빌드된 React 애플리케이션을 적절한 디렉토리로 복사하고 Nginx를 사용자 정의 Nginx 구성 파일로 구성합니다. 외부 액세스를 위해 포트 8080을 노출하고 Nginx 서버를 전경에서 시작합니다.

# 결론

Vite가 제공하는 뛰어난 빠른 개발 환경과 안정적이고 고성능인 Nginx 웹 서버를 조합하여, Docker를 사용하여 Frontend React 애플리케이션을 효율적으로 패키지화하고 배포할 수 있는 원활한 경로를 만듭니다. Vite의 빠른 빌드 시간과 핫 모듈 교체는 개발 프로세스를 활기차게 만들어 주며, Nginx의 안정성과 효율성은 프로덕션 배포를 위해 애플리케이션을 강화합니다. 제공된 코드 예제와 구성을 이해하고 적용함으로써, React 애플리케이션용 Docker 이미지를 만들고 자신감 있고 편리하게 배포할 수 있게 준비가 되실 겁니다. 즐거운 코딩되세요!

# 자료 출처



# 연결하고 싶다면?

https://www.linkedin.com/in/hongji-li/