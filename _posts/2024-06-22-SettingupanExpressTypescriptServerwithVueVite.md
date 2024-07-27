---
title: "Express  Typescript 서버에서 Vue  Vite 설정하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-SettingupanExpressTypescriptServerwithVueVite_0.png"
date: 2024-06-22 03:22
ogImage: 
  url: /assets/img/2024-06-22-SettingupanExpressTypescriptServerwithVueVite_0.png
tag: Tech
originalTitle: "Setting up an Express + Typescript Server with Vue + Vite"
link: "https://medium.com/@ctrlaltmonique/setting-up-an-express-typescript-server-with-vue-vite-9d415a51facc"
---




![Setting up an Express TypeScript Server with Vue Vite](/assets/img/2024-06-22-SettingupanExpressTypescriptServerwithVueVite_0.png)

백엔드 개발에 뛰어들기는, 특히 프론트엔드 개발자로써는 미지의 영역에 발을 딛는 것처럼 느껴질 수 있어요. "프론트엔드 걸리"를 자처하는 나로서는 솔직히 말하면, 백엔드 개발에 뛰어들기 전에 조심스럽게 느껴졌어요. 그러나 프로젝트의 일부 클라이언트 측 로직을 백엔드로 옮긴 후에야, 서버 측 작업이 상상했던 것만큼 무섭지 않다는 것을 깨달았어요.

백엔드 개발에 대해 제가 느낀 불안을 공감한다면, 여기에 잘 왔어요. 이 블로그에서는 Express 서버를 TypeScript와 통합하는 방법을 안내할 거예요.

초보자를 위한 이 포괄적인 가이드는 다음을 중점적으로 다룰 거예요:


<div class="content-ad"></div>

- TypeScript로 Express 서버 설정하기
- 클라이언트와 서버 간 통신 설정하기
- Vite를 사용하여 요청 프록시 설정하기

이제 프론트엔드와 백엔드 간의 간극을 좁히러 뛰어들어봅시다! 🚀

# 시작하기

이 튜토리얼의 전체 소스 코드에 액세스하려면 여기에 있는 GitHub 리포지토리를 방문해주세요. 서버 및 클라이언트 환경 변수를 추가하는 것을 잊지 마세요. 클론하거나 포크하거나 리포지토리를 별표로 표시하여 차후 참고 및 실험에 사용하세요.

<div class="content-ad"></div>

시작하기 전에 컴퓨터에 Node.js가 설치되어 있는지 확인해주세요. 터미널에서 명령어 node -v를 실행하여 Node.js가 설치되어 있는지 확인할 수 있습니다. 설치되어 있다면 설치된 버전이 표시됩니다. 그렇지 않다면 여기를 클릭하여 Node.js를 설치할 수 있습니다.

## 서버 설정하기

백엔드를 설정하는 첫 번째 단계는 적절한 기술 스택을 선택하는 것입니다. Express.js를 사용할 것이며, 이는 간결함과 유연성으로 유명한 Node.js 프레임워크입니다. 추가로 TypeScript를 활용하여 서버 측 코드베이스에 정적 타이핑을 도입할 것입니다.

## 프로젝트 초기화

<div class="content-ad"></div>

우리는 새 디렉토리를 만들고 npm을 사용하여 새 Node.js 프로젝트를 초기화할 것입니다. 초기화된 후 Express 및 TypeScript를 포함한 필수 종속성을 설치하기 위해 각각의 명령을 실행할 것입니다.

- 새 디렉토리 만들기

우리는 스타터 프로젝트를 위한 새 디렉토리를 만들어 시작할 것입니다. 이를 위해 당신의 운영 체제의 터미널 또는 파일 탐색기를 사용할 수 있습니다.

```js
mkdir express-starter
```

<div class="content-ad"></div>

2. 프로젝트 디렉토리로 이동해주세요.

디렉토리가 생성되면 cd 명령어를 사용하여 해당 디렉토리로 이동해주세요.

```js
cd express-starter
```

3. 서버 및 클라이언트 폴더를 생성하세요.

<div class="content-ad"></div>

express-starter 디렉토리에 들어간 후, 두 개의 폴더를 만들어주세요: client와 server 폴더를 만들어주세요. 그런 다음 server 폴더로 이동해주세요.

```js
mkdir server client cd server
```

4. 새로운 Node.js 프로젝트 초기화하기.

npm init을 사용하여 새로운 Node.js 프로젝트를 초기화하세요. 이렇게 하면 package.json 파일이 생성되며, 프로젝트와 의존성에 대한 메타데이터가 저장됩니다. 프롬프트를 따르거나 -y 플래그를 사용하여 모든 프롬프트에 대한 기본값을 수락할 수 있습니다.

<div class="content-ad"></div>

```js
npm init -y
```

5. 의존성 설치하기.

이제, 프로젝트에 필요한 의존성을 설치해보겠습니다.

```js
# dependencies 
npm install express cors dotenv  

# development dependencies 
npm install -D typescript @types/cors @types/node @types/express nodemon
```

<div class="content-ad"></div>

각 종속성이 무엇을 하는지 간단히 살펴봅시다.

- express: 우리가 서버를 구축하기 위해 사용할 Node.js의 웹 프레임워크입니다.
- typescript: TypeScript 컴파일러 및 언어입니다. 프로젝트를 타입 안전하게 유지하고 런타임 이전에 버그를 잡을 수 있게 합니다.
- cors: Cross-Origin Resource Sharing은 교차 출처 요청을 허용하여 백엔드 API가 다른 포트에서 실행되더라도 클라이언트에서 안전하게 액세스할 수 있도록 합니다.
- dotenv: .env 파일에서 환경 변수를로드합니다.
- nodemon: Nodemon은 변경 사항을 감지하면 자동으로 노드 응용 프로그램을 다시 시작합니다. 이는 변경 사항이 적용되기 위해 응용 프로그램을 중지하고 다시 시작할 필요가 없다는 것을 의미합니다.
- @types/node, @types/cors 및 @types/express: Node.js, Cors 및 Express에 대한 유형 정의로 TypeScript 지원을 활성화합니다.

의존성 대 개발 의존성

-D 플래그를 사용하여 설치 중에 일부 dev 종속성을 추가했지만, 왜 필요했을까요? 개발 의존성은 개발 중에만 필요한 모듈로, 종속성은 런타임에서 필요합니다.

<div class="content-ad"></div>

의존성

의존성은 우리 애플리케이션이 올바르게 작동하기 위해 필요한 필수 패키지입니다. npm install을 실행하면 이러한 패키지가 설치됩니다. 이러한 패키지는 package.json 파일의 의존성 섹션에 나열됩니다. 이러한 패키지 없이 배포된 앱은 작동하지 않을 수 있습니다.

개발 의존성

반면에 개발 의존성은 개발 및 테스트 목적에만 필요합니다. 이러한 패키지는 앱이 정상적으로 실행되기 위해 반드시 필요한 것은 아니지만, 빌드, 테스트 및 코드 린팅과 같은 작업에 중요합니다. 이러한 패키지들은 package.json의 devDependencies 섹션에 명시됩니다.

<div class="content-ad"></div>

6. tsconfig.json 생성하기

TypeScript를 구성하기 위해 tsconfig.json 파일을 생성하세요. 이 파일은 TypeScript가 코드를 컴파일하는 방법을 지정합니다. npx tsconfig.json을 실행한 후 Node를 선택하세요. 이 명령은 일부 기본 설정이 포함된 tsconfig.json 파일을 생성합니다.

```sh
npx tsconfig.json
```

7. 소스 파일 생성 및 package.json 업데이트하기

<div class="content-ad"></div>

다음으로, src 디렉토리를 생성하세요. src 디렉토리 안에 우리의 주 파일인 main.ts를 만들 것입니다.

```js
# src 폴더 생성
mkdir src

# 폴더로 이동
cd src

# .ts 파일 생성
touch main.ts

# src에서 나와서 서버 디렉토리로 돌아갑니다
cd ..
```

package.json에서 엔트리 포인트를 index.js 대신 main.js로 수정하세요.

```js
"main": "main.js",
```

<div class="content-ad"></div>

8. .env 파일을 생성하세요.

환경 변수를 구성하기 위해 .env 파일을 만듭니다 (예: API 키). 이 파일은 민감한 정보가 노출되지 않도록 버전 관리에서 제외되어야 합니다. 서버 폴더의 루트에 .env 파일을 생성하세요.

```js
touch .env
```

9. .gitignore 파일을 생성하세요.

<div class="content-ad"></div>

.gitignore 파일을 만들어서 버전 관리에서 무시해야 할 파일과 디렉토리를 지정하여 불필요한 파일을 커밋하는 것을 피해야 합니다. 서버 폴더의 루트에 .gitignore 파일을 생성하세요. 우선 node_modules와 .env*를 추가하겠습니다. *는 Git에게 .env로 시작하는 모든 파일이나 폴더를 무시하도록 지시합니다.

```js
.env* 
node_modules/
```

이 시점에서 프로젝트 구조는 다음과 같을 수 있습니다:

```js
express-starter/
├── client/
└── server/
    ├── node_modules/
  └── src/
        └── main.ts
  ├── .env
  ├── .gitignore
    ├── package.json
    ├── tsconfig.json
```

<div class="content-ad"></div>

기본 설정을 마쳤으니 이제 서버를 생성해봅시다.

# 서버 생성

src/main.ts 파일 안에 다음 스니펫을 추가하세요.

```js
// server/src/main.ts

import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.get('/api', (_req, res) => {
  res.status(200).json({ message: '서버에서 안녕하세요!' });
});

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
```

<div class="content-ad"></div>

이것은 기본 express 서버입니다. 이 앱은 서버를 시작하고 지정된 포트에서 연결을 수신 대기합니다. /api 경로에 대한 요청에 대해 "서버에서 안녕하세요!"라고 응답합니다. 코드가 무엇을 하는지 이해해 봅시다.

- 미들웨어 설정

app.use()는 미들웨어를 등록하는 방법입니다. 미들웨어는 서버가 특정 요청을 처리하기 전에 실행하는 특별한 함수들입니다. 미들웨어는 서버가 요청을 수신하고 클라이언트에게 응답을 보내는 순간 사이에서 작동합니다.

우리의 경우, 몇 가지 전역 미들웨어를 등록했습니다:

<div class="content-ad"></div>

- cors: 이 미들웨어는 서버가 서로 다른 소스/출처에서 오는 요청을 수락할 수 있도록 합니다.
- express.json(): 들어오는 요청을 JSON 형식으로 파싱합니다.
- express.urlencoded('extended: true'): 요청에서 폼 데이터를 파싱합니다.

2. 라우트 설정

app.get(`/api`)은 특히 /api URL로의 GET 요청에 대한 라우트 핸들러를 설정합니다. 이 라우트로 GET 요청이 올 경우, 서버는 상태 코드 200과 "서버에서 인사합니다!" 메시지로 응답합니다.

3. 서버 초기화

<div class="content-ad"></div>

app.listen()은 지정된 포트(PORT)에서 Express 앱을 수신하여 시작합니다. 환경 변수에 포트가 지정되지 않은 경우 기본값은 포트 3001입니다.

이 설정으로 서버를 실행하는 한 걸음 더 나아갈 수 있습니다.

# TypeScript로 Nodemon 구성하기

main.ts를 실행하려면 서버 디렉토리 내에서 node src/main.ts를 실행할 수 있지만, ".ts" 라는 알 수 없는 파일 확장자 오류가 발생합니다.

<div class="content-ad"></div>

Node와 TypeScript

`node src/main.ts`를 실행할 때 Node.js가 TypeScript 파일을 직접 실행할 것으로 기대할 수 있습니다. 그러나 Node.js는 TypeScript를 네이티브로 이해하지 않습니다. JavaScript만을 이해합니다.

TypeScript는 JavaScript의 확장이므로 TypeScript 코드는 Node.js에서 실행되기 전에 JavaScript로 컴파일되어야 합니다. 이 컴파일 과정은 .ts 파일을 Node가 이해할 수 있는 동등한 .js 파일로 변환합니다.

서버 코드를 실행하려면 먼저 TypeScript 컴파일러(tsc)를 사용하여 TypeScript 코드를 JavaScript로 변환해야 합니다. 이를 통해 컴파일된 JavaScript 코드가 포함된 dist/main.js 파일이 생성됩니다.

<div class="content-ad"></div>

```js
# 모든 TypeScript 파일을 JavaScript로 컴파일
npx tsc

# 생성된 JavaScript 파일 실행
node dist/main.js
```

위의 명령어에서 npx tsc는 TypeScript 컴파일러(tsc)를 호출하여 프로젝트의 모든 TypeScript 파일을 JavaScript로 컴파일합니다. 그 결과로 생성된 JavaScript 파일은 dist 디렉토리에 출력됩니다. 생성된 JavaScript 파일은 Node.js를 사용하여 실행할 수 있습니다.

컴파일된 JavaScript 파일의 출력 디렉토리는 tsconfig.json 파일의 outDir 속성을 사용하여 지정됩니다.

```js
// server/tsconfig.json

{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

<div class="content-ad"></div>

마지막으로, dist 폴더를 .gitignore 파일에 포함시켜야합니다. 이렇게 하면 컴파일된 JavaScript 파일이 버전 관리에 포함되지 않습니다.

```js
// server/.gitignore

node_modules
dist
.env*
```

Nodemon을 사용하여 변경 사항 감지

TypeScript 파일을 수정할 때마다 npx tsc 및 node dist/main.js를 사용하여 파일을 수동으로 다시 컴파일하고 실행해야합니다. 이러한 반복 작업은 빠르게 지루해질 수 있습니다. 이 과정을 간소화하기 위해 nodemon이라는 도구를 사용할 수 있습니다.

<div class="content-ad"></div>

Nodemon은 디렉토리 내 파일 변경을 감지하여 Node.js 기반 애플리케이션을 자동으로 다시 시작하는 도구입니다. 이를 이용하면 코드를 수정할 때마다 서버를 수동으로 중지하고 다시 시작하는 수고를 덜 수 있습니다.

Nodemon은 이미 설치했으므로 이제 구성만 남았습니다.

Nodemon 구성하기

Nodemon을 구성하려면 package.json에 nodemonConfig를 추가할 수 있습니다.

<div class="content-ad"></div>

```json
// server/package.json

"scripts": {
    "dev": "nodemon"
  },
  "nodemonConfig": {
    "watch": [
      "src"
    ],
    "exec": "tsc && node ./dist/main.js",
    "ext": "ts,js,json"
  },
```

nodemonConfig 섹션은 파일 변경을 모니터링할 때 nodemon이 어떻게 동작해야 하는지 알려줍니다:

- watch: nodemon에게 src 폴더 내의 변경 사항을 모니터링하도록 지시합니다.
- ext: 변경 사항을 모니터링할 파일 확장자를 지정합니다 (ts, js, json).
- exec: 변경 사항이 감지되었을 때 실행할 명령을 정의합니다. 이 경우 TypeScript 파일을 컴파일하고 node ./dist/main.js를 실행하여 서버를 시작합니다.

이제 npm run dev를 실행하여 간단히 nodemon과 함께 서버를 시작할 수 있습니다. 파일 변경 사항을 모니터링하고 서버를 자동으로 다시 시작하는 프로세스가 자동화됩니다. 이 변경 사항으로 서버는 요청을 받을 준비가 되었습니다. Postman과 같은 API 플랫폼이 있다면 http://localhost:3001/api에 GET 요청을 보내보거나 브라우저에서 링크를 방문하여 확인할 수 있습니다.

<div class="content-ad"></div>

# 클라이언트 설정

저희 서버는 클라이언트로부터의 요청을 받을 준비가 되어 있습니다. 프론트엔드에서는 Vue를 사용할 것입니다. Vue는 Vite를 기반으로 한 빌드 설정을 사용하며, 이를 우리 서버와 통신하도록 구성할 것입니다. 시작해봅시다.

- 클라이언트 디렉토리로 이동하기

먼저 서버 디렉토리를 중지하고 종료한 후, 클라이언트로 이동해보겠습니다. 서버가 실행 중인 터미널에서 ^ + C (control + C)를 눌러 중지한 다음, 다음 명령어를 실행하세요.

<div class="content-ad"></div>

```js
# 서버 디렉토리를 나와 클라이언트로 이동 
cd ../client
```

2. Vue 프로젝트 생성

Vue 앱을 만들려면 다음 명령을 실행하세요. 이 명령은 . .에 의해 지정된 클라이언트 폴더에 직접 프로젝트를 생성합니다.

```js
npm create vue@latest .
```

<div class="content-ad"></div>

여러 선택지를 만들어 몇 가지 선택을 해야 할 것입니다. 패키지 이름과 TypeScript 지원에 대해 고민할 차례입니다. 당신의 프로젝트를 위해 express-vue로 이름을 지어주고 TypeScript 지원에 "예"를 선택하되, 다른 선택 가능한 기능들에 대해서는 "아니요"를 선택하여 프로젝트를 간단하게 유지해주세요.

그 다음, 의존성을 설치하고 개발 서버를 시작해보세요.

```js
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

이제 http://localhost:5173/에서 Vue 프로젝트가 실행 중일 것입니다.

<div class="content-ad"></div>

3. .env 파일 추가

다음 변수를 사용하여 클라이언트 폴더의 루트에 .env 파일을 추가하십시오.

```js
VITE_SERVER_URL=http://localhost:3001
VITE_SERVER_API_PATH=/api
```

.env 파일을 변경하면 서버를 다시 시작해야 할 수도 있습니다. 서버를 중지하려면 서버가 실행 중인 터미널에서 ^ + C (control + C)를 눌러주세요. 그런 다음 서버를 다시 시작하려면 npm run dev를 다시 실행해주세요.

<div class="content-ad"></div>

4. vite.config.ts 파일 업데이트

우리는 vite.config.ts 파일을 사용하여 클라이언트와 서버 간의 통신을 활성화하기 위해 파일을 사용자 정의하고 싶어요. defineConfig은 Vite 프로젝트에서 구성 옵션을 정의하는 데 사용되는 도우미 함수입니다. defineConfig은 객체나 함수 둘 중 하나를 인수로 받을 수 있어요. 환경 변수를 로드할 수 있도록 함수를 전달할 거에요.

```js
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';

// <https://vitejs.dev/config/>
export default defineConfig((env) => {
  const envars = loadEnv(env.mode, './');

  const serverURL = new URL(
    envars.VITE_SERVER_URL ?? '<http://localhost:3001>'
  );
  const serverAPIPath = envars.VITE_SERVER_API_PATH ?? '/api';

  return {
    envDir: './',

    // 클라이언트에서 API 경로를 전역적으로 사용할 수 있도록 함
    define: {
      __API_PATH__: JSON.stringify(serverAPIPath),
    },

    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      port: 5173,
      proxy: {
        // API 경로를 가진 요청을 서버로 프록시함
        // <http://localhost:5173/api> -> <http://localhost:3001/api>
        [serverAPIPath]: serverURL.origin,
      },
    },
  };
});
```

이 설정의 각 부분이 어떤 역할을 하는지 살펴보도록 하죠.

<div class="content-ad"></div>

- 환경 변수 로딩: loadEnv 함수를 사용하여 현재 모드(예: 개발, 프로덕션)에 기반하여 환경 변수를 로드합니다. 프로젝트 디렉토리에 있는 .env 파일을 읽고 변수를 envars 객체에 로드합니다.
- 서버 URL 및 API 경로 구문 분석: 서버 URL 및 API 경로가 구문 분석되며, .env 파일에서 찾지 못한 경우 기본값이 제공됩니다.

구성 옵션:

- envDir: 환경 변수가 위치한 디렉토리를 지정합니다.
- define: 빌드 과정 중에 대체될 전역 상수를 정의할 수 있습니다. 이 경우 __API_PATH__는 서버 API 경로 값으로 정의됩니다.
- plugins: 프로젝트에서 사용하는 Vite 플러그인을 지정합니다. 여기서 Vue.js 플러그인(vue())이 추가됩니다.
- resolve.alias: 모듈 해상도를 위한 별칭을 정의합니다. 이 경우 @ 별칭이 src 디렉토리로 설정됩니다.

서버 구성:

<div class="content-ad"></div>

- server.port: Vite 개발 서버가 실행될 포트를 지정합니다. 여기서는 5173으로 설정되어 있어요.
- server.proxy: 프록시 설정은 클라이언트와 서버 간 통신을 가능하게 합니다. API 경로와 일치하는 요청은 서버 URL로 전달됩니다. http://localhost:5173/api로 요청을 보내면 http://localhost:3001/api로 우리 서버로 전달됩니다.

5. 전역 상수 선언

vite.config.ts 파일에 전역 상수를 추가한 후, TypeScript가 이 상수를 인식하여 타입 확인을 수행하게 만들어야 합니다. env.d.ts 파일에 타입 정의를 선언하여 이를 달성할 수 있어요.

```js
// client/env.d.ts  

/// <reference types="vite/client" /> 
declare const __API_PATH__: string;
```  

<div class="content-ad"></div>

이 선언에서는 TypeScript에 __API_PATH__ 상수의 존재를 알리고, 해당 타입을 문자열로 지정합니다. 이는 TypeScript가 프로젝트 전체에서 이 글로벌 상수에 대한 유형 확인 및 IntelliSense 지원을 제공하도록 보장합니다.

6. 서버에 요청 보내기

이제 Vite 프로젝트를 서버와 통신하도록 구성했으므로 App.vue 파일을 업데이트하여 서버로부터 요청을 보내고 응답을 화면에 표시해 보겠습니다. 다음 스니펫은 Vue.js composition API를 사용하여 서버에서 데이터를 가져와 앱에 표시하는 방법을 보여줍니다.

```js
// client/src/App.vue

<script setup lang="ts">
import { ref } from "vue";

// API 기본 URL을 포함하는 전역 상수 -> /api
const baseURL = __API_PATH__;

// 로딩 상태 및 응답 메시지 관리를 위한 반응형 변수
const isLoading = ref(false);
const message = ref("");

// 서버에서 데이터를 가져오는 함수
async function fetchAPI() {
  try {
    // 로딩 상태를 true로 설정
    isLoading.value = true;

    // 서버에 GET 요청 보내기
    const response = await fetch(baseURL);

    // JSON 응답 해석
    const data = await response.json();

    // 응답 데이터로 메시지 업데이트
    message.value = data.message;
  } catch (error) {
    // 오류 처리
    message.value = "데이터 검색 오류";
    console.error(error);
  } finally {
    // 로딩 상태 재설정
    isLoading.value = false;
  }
}
</script>

<template>
  <!-- fetchAPI 함수를 실행하는 버튼 -->
  <button @click="fetchAPI">가져오기</button>

  <!-- 데이터를 가져올 때 로딩 메시지 표시 -->
  <p v-if="isLoading">로딩 중...</p>

  <!-- 사용 가능한 경우 응답 메시지 표시 -->
  <p v-else-if="message">{ message }</p>
</template>
```

<div class="content-ad"></div>

이 코드 스니펫에서:

- 우리는 Vue의 composition API에서 ref 함수를 가져와 반응형 변수를 생성하여 로딩 상태(isLoading)와 응답 메시지(message)를 관리합니다.
- fetchAPI 함수는 fetch API를 사용해 서버로 GET 요청을 보내는 데 정의됩니다.
- 요청이 처리되는 동안 로딩 상태가 true로 설정되고 로딩 메시지가 표시됩니다.
- 요청이 완료되면 로딩 상태가 재설정되고 서버로부터의 응답 메시지가 표시됩니다.
- 요청 중에 발생하는 모든 오류는 catch되어 메시지가 업데이트됩니다.

이러한 업데이트로 인해, Vue 애플리케이션은 서버에서 데이터를 가져와 사용자에게 표시할 수 있습니다.

7. 두 서버를 시작하세요.

<div class="content-ad"></div>

이미 클라이언트가 실행 중이므로 서버를 시작해야 합니다. VS Code를 사용 중이라면, 메뉴 바에서 Terminal 옵션을 마우스 오른쪽 클릭하고 New Terminal을 선택하여 새 터미널을 열 수 있습니다. 또는 새 터미널 창을 열어 프로젝트 디렉토리로 이동할 수도 있어요. 프로젝트 디렉토리에 들어간 후 아래 명령어를 실행하여 서버를 시작하세요:

```js
cd server
npm run dev
```

위의 명령어를 실행하면 서버 디렉토리로 이동한 후 개발 모드에서 서버가 시작됩니다.

8. 클라이언트 측 요청 초기화.

<div class="content-ad"></div>

클라이언트에서 App.vue에서 버튼을 클릭하여 요청을 트리거하는 것이 마지막 단계입니다. 이렇게 하면 서버로 요청이 전송됩니다.

# 결론

축하합니다! 🎉 Express.js 및 TypeScript를 사용하여 백엔드에 Vue.js 및 Vite를 사용하는 풀스택 웹 개발 환경을 구축하는 방법을 성공적으로 배우셨습니다.

이 가이드에서 다룬 내용은 다음과 같습니다:

<div class="content-ad"></div>

- 백엔드 설정: TypeScript로 Express.js 서버를 초기화하고 미들웨어를 구성하며 노드.js에서 실행할 수 있도록 코드를 컴파일하는 것부터 시작했습니다.
- 프론트엔드 구성: 다음으로, 클라이언트와 서버 간의 통신을 허용하도록 Vite를 구성했습니다. 특정 요청을 서버로 프록시하기 위해 Vite의 서버 옵션을 활용했습니다.
- 클라이언트-서버 통신: 환경을 설정한 후, Vue.js composition API를 사용하여 프론트엔드에서 백엔드로 요청을 보내는 방법을 배웠습니다. 서버에서 데이터를 가져와 UI를 업데이트하여 반응형 웹 애플리케이션을 만들었습니다.

서버 측 로직 작업에 대한 걱정이 줄어들었기를 바라며, 동적 웹 애플리케이션을 구축하는 기초를 마련했으니 실험을 계속해보고, 계속해서 개발하고, 풀스택 부분에 더 깊이 파고들기를 주저하지 마십시오.

즐거운 코딩!

![이미지](/assets/img/2024-06-22-SettingupanExpressTypescriptServerwithVueVite_1.png)