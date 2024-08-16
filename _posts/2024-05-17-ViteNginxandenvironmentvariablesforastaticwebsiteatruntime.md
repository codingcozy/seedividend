---
title: "Vite, Nginx 및 런타임에서 정적 웹 사이트용 환경 변수 적용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-ViteNginxandenvironmentvariablesforastaticwebsiteatruntime_0.png"
date: 2024-05-17 20:51
ogImage: 
  url: /assets/img/2024-05-17-ViteNginxandenvironmentvariablesforastaticwebsiteatruntime_0.png
tag: Tech
originalTitle: "Vite, Nginx and environment variables for a static website at runtime"
link: "https://medium.com/quadcode-life/vite-nginx-and-environment-variables-for-a-static-website-at-runtime-f3d0b2995fc7"
isUpdated: true
---



<img src="/assets/img/2024-05-17-ViteNginxandenvironmentvariablesforastaticwebsiteatruntime_0.png" />

안녕하세요 여러분! 저는 Quadcode의 프런트엔드 개발자 Dmitry Pashkevich입니다. 오늘은 Vite 빌드 도구와 Nginx 웹 서버를 이용하여 정적 웹사이트에 런타임 환경 변수를 전달하는 방법을 공유하려고 합니다.

프런트엔드 개발에서 흔한 작업은 애플리케이션에 환경 변수를 전달하는 것입니다. 애플리케이션이 실행되는 환경에 따라 다르게 동작하도록 환경 변수를 설정하는 작업이죠. 간단한 작업으로 보이지만 이를 문서에 설명된 대로 처리하려면 .env 파일을 옆에 두고 빌드를 실행해야 합니다... 각 환경에서 말이죠.

솔루션을 찾은 것 같습니다. 그러나 이로 인해 각 환경마다 다른 빌드 프로세스와 이에 따른 다른 결과로 이어집니다.

<div class="content-ad"></div>

실무에서 빌드 단계의 기능에 문제가 발생하는 경우가 종종 있습니다. 예를 들어 변경 사항을 적용할 때 한 환경을 위해 설정, 스크립트 등을 업데이트하는 것을 잊을 때가 있습니다. 결과적으로, 아티팩트도 다르기 때문에 애플리케이션 자체에 문제가 발생합니다.

그러므로 모든 환경에 대해 하나의 빌드 아티팩트를 얻고 환경 변수 값을 전달할 수 있는 것이 더 나을 것으로 보입니다. 따라서 변수 값이 정확한 한 가지 문제를 해결하는 것이 빌드 단계를 조사하는 것보다 더 쉽습니다.

그럼 이를 Vite와 Nginx 도구를 사용한 예제로 어떻게 수행할 수 있는지 살펴봅시다.

# 저장소 준비

<div class="content-ad"></div>

먼저 React + Typescript용 Vite 빌더에서 제공하는 템플릿을 사용하여 프로젝트를 생성해보겠습니다.

```js
npm create vite@latest vite-nginx-dynamic-env-variables-example --
--template react-ts && cd vite-nginx-dynamic-env-variables-example && npm
instal
```

# 프로젝트 구성 준비

위 명령어를 성공적으로 실행한 후, 새로 생성된 프로젝트를 좋아하는 IDE에서 열고 목표 솔루션을 만들기 시작해봅시다.

<div class="content-ad"></div>

파일 src/vite-env.d.ts를 수정해보세요. IDE 힌팅을 활성화하기 위해 사용 가능한 환경 변수 유형에 대한 설명을 추가할 거에요.

```js
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_VERSION: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
```

이제 IDE가 사용 가능한 환경 변수에 대한 힌트를 제공할 거예요.

다음으로, 환경 변수 템플릿이 들어 있는 파일을 생성해볼게요: src/shared/projectEnvVariables.ts. 그리고 아래 내용을 추가해주세요.

<div class="content-ad"></div>

```js
type ProjectEnvVariablesType = Pick<ImportMetaEnv, "VITE_VERSION">;

// 환경 변수 템플릿 런타임에 대체되도록
const projectEnvVariables: ProjectEnvVariablesType = {
  VITE_VERSION: "${VITE_VERSION}",
};

// 런타임에서 변수 값을 반환하거나 빌드 결과로 얻음
export const getProjectEnvVariables = (): {
  envVariables: ProjectEnvVariablesType,
} => {
  return {
    envVariables: {
      VITE_VERSION: !projectEnvVariables.VITE_VERSION.includes("VITE_")
        ? projectEnvVariables.VITE_VERSION
        : import.meta.env.VITE_VERSION,
    },
  };
};
```

그 다음, 위의 파일이 빌드 단계 후 예측 가능한 이름을 갖도록 빌드 구성을 vite.config.ts에 변경해야 합니다. 이를 위해 구성에 rollup을 위한 섹션을 추가해주세요.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   build: {
       rollupOptions: {
           output: {
               format: 'es',
               globals: {
                   react: 'React',
                   'react-dom': 'ReactDOM',
               },
               manualChunks(id) {
                   if (/projectEnvVariables.ts/.test(id)) {
                       return 'projectEnvVariables'
                   }
               },
           },
       }
   }
}
```

manualChunks 섹션에서 사용자 정의 청크를 생성하고, 파일을 빌드한 후 이 파일을 환경 변수로 대체할 수 있도록 일부 이름을 저장합니다.

<div class="content-ad"></div>

src/App.tsx 파일을 수정하여 환경 변수의 값들을 확인해봅시다.

```js
import { getProjectEnvVariables } from "./shared/projectEnvVariables.ts";

const { envVariables } = getProjectEnvVariables();

function App() {
  return (
    <>
      <h1>VITE_VERSION</h1>
      <div>{envVariables.VITE_VERSION}</div>

      <hr />

      <h2>import.meta.env.VITE_VERSION</h2>
      <div>{import.meta.env.VITE_VERSION}</div>
    </>
  );
}

export default App;
```

다음으로, 빌드를 실행하여 빌드 단계 이후에 변수를 대체하는 데 필요한 청크를 얻었는지 확인해봅시다.

```js
npm run build
```

<div class="content-ad"></div>

빌드가 완료되면 dist/assets 디렉토리로 이동하세요. 이전에 구성한 projectEnvVariables\*이라는 청크가 존재하는 것을 확인할 수 있을 겁니다.

![이미지](/assets/img/2024-05-17-ViteNginxandenvironmentvariablesforastaticwebsiteatruntime_1.png)

이제 연이어 실험을 진행해보겠습니다.

원하는 빌드 결과를 얻는 데 쉽게 이해할 수 있도록, 각 빌드는 지정된 환경 변수로 수행될 것입니다. 이를 통해 getProjectEnvVariables 함수에서 환경 변수의 값을 반환하는 조건을 시각적으로 확인할 수 있습니다.

<div class="content-ad"></div>

첫 번째 실험을 위해 프로젝트 루트에 다음 내용을 포함한 .env 파일을 생성해주세요.

```js
VITE_VERSION = dev;
```

프로젝트 빌드를 시작하고 빌드 결과를 확인하는 모드로 전환해봅시다.

```js
npm run build && npm run preview
```

<div class="content-ad"></div>

http://localhost:4173/로 이동하면 구성에서 직접 환경 변수로부터 읽은 변수의 두 개의 동일한 값이 표시됩니다.

![image](/assets/img/2024-05-17-ViteNginxandenvironmentvariablesforastaticwebsiteatruntime_2.png)

두 번째 실험에서는 애플리케이션을 빌드한 후 생성된 dist/assets/projectEnvVariables-wa84hTgi.js 파일에서 변수를 변경해보겠습니다. 이 파일에서 $'VITE_VERSION' 값이 들어있는 줄을 dev_from_env로 바꿔주세요. 브라우저에서 페이지를 새로고침하면 구성 getProjectEnvVariables에서 읽은 화면의 변수가 업데이트된 버전으로 표시됩니다.

![image](/assets/img/2024-05-17-ViteNginxandenvironmentvariablesforastaticwebsiteatruntime_3.png)

<div class="content-ad"></div>

모든 것이 예상대로 작동합니다! 이제 변수 대체를 자동화할 차례입니다.

# 도커 + Nginx 환경 설정 준비

Docker 컨테이너를 사용하여 Nginx 웹 서버를 실행하기 전에 초기화 스크립트를 실행하고 envsubst를 사용하여 환경 변수를 대체하는 변수 대체의 자동화를 보여 드리겠습니다.

프로젝트 루트에 .docker 디렉토리를 만들어 Nginx 웹 서버를 위한 구성 내용을 넣어주시면 됩니다. Nginx 구성의 완전한 예시는 저장소에 있으며, 아래는 .docker/app/nginx/init-scripts/100-init-project-env-variables.sh 파일의 bash 코드입니다. 이 코드는 환경 변수를 대체합니다.

<div class="content-ad"></div>

```js
#!/usr/bin/env sh

set -ex

#환경 변수를 치환해야 하는 파일을 찾습니다.
projectEnvVariables=$(ls -t /usr/share/nginx/html/assets/projectEnvVariables*.js | head -n1)

#환경 변수를 치환합니다.
envsubst < "$projectEnvVariables" > ./projectEnvVariables_temp
cp ./projectEnvVariables_temp "$projectEnvVariables"
rm ./projectEnvVariables_temp
```

이후에, 프로젝트 루트에서 다음 내용을 가진 Dockerfile을 생성하세요. 이 Dockerfile은 애플리케이션을 빌드하고 정적 파일을 제공하기 위해 Nginx 웹 서버를 실행하는 내용을 설명합니다.

```js
FROM node:20-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm run build

FROM nginx:alpine

ARG VITE_VERSION=dev
ENV VITE_VERSION=${VITE_VERSION}

ARG PORT=80
ENV NGINX_PORT=${PORT}
ENV NGINX_HOST=localhost

EXPOSE ${PORT}

COPY .docker/app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY .docker/app/nginx/conf.d/ /etc/nginx/conf.d/
COPY .docker/app/entrypoint.sh /entrypoint.sh
COPY .docker/app/nginx/init-scripts/ /docker-entrypoint.d/

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist ./
```

이제 컨테이너를 빌드해봅시다.

<div class="content-ad"></div>

```js
docker build -t
vite-nginx-dynamic-env-variables-example .
```

다음으로, 응용 프로그램에서 사용할 환경 변수에 대한 새로운 값을 가진 작성된 컨테이너를 실행해 봅시다.

```js
docker run -p 81:80 -e VITE_VERSION=FROM_NGINX
vite-nginx-dynamic-env-variables-example
```

http://127.0.0.1:81 으로 이동하여, 환경 변수가 현재 값으로 초기화되었음을 확인할 수 있습니다. 직접 읽은 환경 변수는 여전히 이전 값으로 남아 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-05-17-ViteNginxandenvironmentvariablesforastaticwebsiteatruntime_4.png" />

# 결론

이렇게 하면 실행 중에 환경 변수를 정적으로 빌드된 애플리케이션에 대체하여 모든 환경에서 통합 빌드가 가능합니다.

코드는 저장소에서 찾을 수 있습니다.
