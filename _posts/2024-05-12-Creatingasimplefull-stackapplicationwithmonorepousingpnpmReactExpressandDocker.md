---
title: "단순한 풀 스택 애플리케이션을 만들어보자 pnpm, React, Express 및 Docker를 사용한 모노 레포"
description: ""
coverImage: "/assets/img/2024-05-12-Creatingasimplefull-stackapplicationwithmonorepousingpnpmReactExpressandDocker_0.png"
date: 2024-05-12 23:21
ogImage: 
  url: /assets/img/2024-05-12-Creatingasimplefull-stackapplicationwithmonorepousingpnpmReactExpressandDocker_0.png
tag: Tech
originalTitle: "Creating a simple full-stack application with monorepo using pnpm, React, Express, and Docker"
link: "https://medium.com/stackademic/creating-a-simple-full-stack-application-with-monorepo-using-pnpm-react-express-and-docker-6346c08f8188"
isUpdated: true
---




모노 레포는 여러 프로젝트를 보관하는 버전 관리 코드 저장소입니다. 이러한 프로젝트들은 서로 관련이 있을 수 있지만 종종 논리적으로 독립적이며 다른 팀에 의해 운영됩니다. 일부 회사는 모든 코드를 모든 사람 사이에서 공유되는 단일 저장소에 호스팅합니다. 모노 레포는 거대한 크기에 도달할 수 있습니다.

저는 이러한 소프트웨어 개발 전략을 매우 매력적으로 생각했습니다. 팀 간의 장벽과 칸막이를 제거하여 함께 잘 작동하는 일련의 마이크로서비스를 설계하고 유지하는 것이 더 쉬워집니다.

![이미지](/assets/img/2024-05-12-Creatingasimplefull-stackapplicationwithmonorepousingpnpmReactExpressandDocker_0.png)

시작하기 전에 여기서 다룰 내용에 대한 기본적인 이해를 갖겠습니다.



- 표준 프로젝트에서는 프로젝트 전체에서 사용되는 외부 종속성에 의존합니다.
- 이러한 종속성은 여러 프로젝트가 이를 필요로 할 경우 여러 복사본이 생길 수 있습니다.
- 여러 패키지가 서로 보완하는 경우 추상화가 최선의 접근 방식이 아닐 수 있습니다.
- 한 번에 여러 앱을 실행하는 것은 이해관계자들에게 보여주는 즐거움입니다.

이 문서에서는 pnpm 워크스페이스, 프론트엔드에서 React, 백엔드에서 ExpressJS를 사용하여 풀 스택 애플리케이션을 구축할 것입니다:

- pnpm 워크스페이스: 이 프로젝트를 주관하고 클라이언트와 서버에서 필요한 일반적인 도구를 공유합니다.
- 클라이언트: React 애플리케이션을 실행하는 모든 프론트엔드 코드를 포함합니다.
- 서버: API 엔드포인트를 노출하는 ExpressJS 서버가 있습니다.

전제 조건:



- NodeJS: Node.js 설치 방법
- pnpm: pnpm 설치 방법

## pnpm 워크스페이스

- 루트 폴더에 pnpm 워크스페이스 생성하기

```js
pnpm init
```



- 패키지라는 폴더를 만드세요. 여기에는 클라이언트와 서버가 들어갈 거에요.

```js
mkdir packages
```

- pnpm-workspace.yaml 파일을 생성하세요. 이를 통해 pnpm이 제 패키지 폴더를 확인할 수 있어요.

```js
touch pnpm-workspace.yaml
```



- 우리는 pnpm에게 내 패키지가 직장의 일부임을 알려줄 거에요.

```js
//pnpm-workspace.yaml
packages:
  - 'packages/*'
```

- 루트 디렉토리에 docker-compose.yml 파일을 만들어주세요. 나중에 이에 대해 이야기할 거에요

```js
touch docker-compose.yml
```



## 클라이언트

- 우리는 Vite를 사용하여 리액트 프로젝트를 설정할 것입니다. 프로젝트 이름은 client로 지정하세요. 이 이름은 pnpm이 이 패키지를 감지하는 방법이기 때문에 중요합니다.

```js
 pnpm create vite
```

- 클라이언트를 위한 모든 종속성을 설치합니다. pnpm이 루트에 node_modules 폴더를 가지고 있다는 것에 주목하세요. 멋지죠!



```js
cd client
pnpm install
pnpm run dev
```

- 클라이언트용 도커 파일

```js
touch Dockerfile
```

## 서버




- 여기에 익스프레스 애플리케이션을 설정할 거에요. 그를 위해 패키지 폴더로 이동하여 서버 폴더를 만들어야 해요.

```js
mkdir server
cd server
```

- 서버 폴더 안에 새로운 npm 패키지를 생성할 거에요.

```js
npm init
```



- 그리고 Express 프레임워크를 설치하세요.

```js
npm install express
```

- 서버용 도커 파일도 만들어주세요.

```js
touch Dockerfile
```



- 멋져요, 우리 절반 이상을 이미 지났어요! 그리고 이미 풀 스택 앱을 만들었다니 축하해요(조금 더 연결이 필요하지만, 클라이언트에서 서버로) :)

연결이 얼마나 잘 되었는지 확인해봐요!

## 서버 + 클라이언트

- 서버에 index.js 파일을 만들어, 잘 진행 중이라고 말하고 http://localhost:3000에서 제공할 목록이 있어요



```js
touch index.js
```

```js
// server/index.js
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json([
    { name: "John", age: 25 },
    { name: "Jane", age: 30 },
    { name: "Bob", age: 35 },
  ]);
});

app.listen(PORT, () => {
  console.log(`I am doing great and serving at ${PORT}`);
});
```

- 패키지.json에서 서버를 시작하는 스크립트를 추가하세요.

```js
"scripts": {
    "dev": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```



- 그리고 물론 실행해 주세요

```js
pnpm run dev
```

- 이제 클라이언트에서 이 목록을 받습니다. Vite는 이를 사용하여 프론트엔드에서 http://localhost:3000을 자체 URL처럼 사용할 수 있습니다. 귀찮은 CORS 오류도 없어요 :) 이 코드를 vite.config.ts에 추가해 보세요.

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```



- vite.config.ts 파일에서는 특별한 것이 없어요. localhost와 네트워크의 8080 포트에서 프론트엔드 코드를 실행합니다. 그리고 백엔드 API인 http://localhost:3000을 /api를 호출하여 프록시합니다.
- 이제 App.ts 파일에서는 /api를 호출하여 http://localhost:3000에서 데이터를 가져옵니다.

```js
import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api");
      const data = await response.json();
      console.log(data);
      setData(data);
    };
    fetchData();
  }, []);

  return <>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</>;
}

export default App;
```

- 목록을 보려면 프론트앱을 시작해주세요.

```js
pnpm run dev
```



이제 이 앱은 풀 스택 앱입니다! 그러나 pnpm에서 개발 경험을 향상시키고 이전에 만들었던 Docker 파일을 사용해 봅시다.

개선 사항

- 이제 백엔드와 프론트엔드를 별도로 시작해야 하므로, 워크스페이스 루트에 이를 추가하여 단일 명령으로 실행할 수 있게 합시다. package.json에 다음을 추가하여 pnpm run app을 통해 모두 시작할 수 있도록 하겠습니다!

```js
"scripts": {
    "client": "pnpm --filter \"client\" run dev",
    "server": "pnpm --filter \"server\" run dev",
    "app": "pnpm run client & pnpm run server"
},
```



- 클라이언트용 Dockerfile

```js
FROM node:latest

# 컨테이너 내의 작업 디렉토리 설정
WORKDIR /app/client

# 클라이언트 package.json 복사
COPY package.json .

# 의존성 설치 
RUN npm install

# 코드를 도커 이미지로 모두 복사
COPY .

EXPOSE 8080

CMD ["npm","run", "dev"]
```

- 서버용 Dockerfile

```js
FROM node:latest

# 컨테이너 내의 작업 디렉토리 설정
WORKDIR /app/server

# 서버 package.json 복사
COPY package.json .

# 의존성 설치
RUN npm install

# 코드를 도커 이미지로 모두 복사
COPY .

EXPOSE 3000

CMD ["npm","run", "dev"]
```



- 도커 컴포즈 파일로 이동하기 전에, 클라이언트 폴더의 vite.config.ts 파일에서 약간의 조정을 해보겠어요. 이 조정 내용은 이미지를 만들 때 'server_c'라는 이름의 서버 컨테이너를 사용하므로 기본적으로 로컬호스트가 아닌 http://server_c:3000을 타겟하도록 프론트엔드에 알려주는 것이에요.

```js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
    proxy: {
      "/api": {
        target:
          process.env.NODE_ENV === "docker"
            ? "http://server_c:3000"
            : "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

- 루트 디렉토리에 위치한 도커 컴포즈 파일을 사용하여 두 이미지를 만들어봅시다. vite.config.ts 파일에서 제공하는 NODE_ENV=docker 환경을 주의해주세요.

```yaml
services:
  client:
    build: ./packages/client
    container_name: client_c
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=docker

  server:
    build: ./packages/server
    container_name: server_c
    ports:
      - "3000:3000"
```



여기서 재밌는 마크다운 표 형식을 사용한 코드가 있어요. 도커 이미지를 빌드하고 도커 환경에서 앱을 시작하려면 docker-compose 파일을 실행해보세요!

```js
docker-compose up
```

더 많은 코드들은 여기에서 확인할 수 있어요. 계속 배우고 있어요.

# Stackademic 🎓



끝까지 읽어 주셔서 감사합니다. 떠나시기 전에:

- 글을 추천하고 작가를 팔로우해 주시는 것을 고려해주세요! 👏
- 우리를 팔로우해주세요: X | LinkedIn | YouTube | Discord
- 다른 플랫폼도 방문해보세요: In Plain English | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠와 싸우는 블로깅 플랫폼에 지치셨나요? Differ를 시도해보세요
- Stackademic.com에서 더 많은 콘텐츠를 만나보세요