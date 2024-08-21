---
title: "2024년 Nodejs와 TypeScript로 API 구축하는 방법 Expressjs 실전 가이드"
description: ""
coverImage: "/assets/img/2024-06-23-ExpressjsinActionHowtoBuildanAPIwithNodejsandTypeScriptin2024_0.png"
date: 2024-06-23 13:57
ogImage:
  url: /assets/img/2024-06-23-ExpressjsinActionHowtoBuildanAPIwithNodejsandTypeScriptin2024_0.png
tag: Tech
originalTitle: "Express.js in Action: How to Build an API with Node.js and TypeScript in 2024"
link: "https://medium.com/@mahmoud-kassem/how-to-build-an-api-with-node-js-express-and-typescript-2024-extended-part-1-6-f65df183dbc5"
isUpdated: true
---

![Express.js in Action: How to Build an API with Node.js and TypeScript in 2024](/assets/img/2024-06-23-ExpressjsinActionHowtoBuildanAPIwithNodejsandTypeScriptin2024_0.png)

안녕하세요! 이 프로젝트는 여러 포스트로 이어지게 될 거에요. 새로운 파트를 올릴 때 알림을 받으려면 저를 팔로우해 주세요. Node.js와 TypeScript를 사용해 백엔드 개발을 배우고 싶으시다면, 이 시리즈를 확인해보세요. 유용하고 즐거운 정보가 될 거에요.

이 프로젝트에서는 Node.js와 TypeScript를 사용하여 빠르게 API를 구축하겠습니다. Node.js와 TypeScript를 사용하여 API를 처음부터 만드는 방법에 대해 단계별 가이드를 제공할 거에요. 프로젝트에서 다음 기능들을 구현할 예정입니다:

- 프로젝트 구조 설정 및 TypeScript 구성
- 미들웨어 사용하여 요청 분석 및 응답 전송과 같은 공통 작업 처리
- 환경 변수를 사용하여 설정 및 비밀 정보 저장
- 동적 환경
- 유용한 정보 기록 및 표시하기 위해 로거 사용
- CORS 활성화 및 기본 인증을 통해 API 보호
- 유효성 검사 및 예외 처리

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

# 프로젝트 구조

우리의 프로젝트 구조는 간단하면서도 확장 가능한 구조로, 잘 조직된 코드를 쉽게 확장하고 유지보수할 수 있게 해줍니다. 불필요한 복잡성을 피하며 모든 것을 간단하게 유지합니다.

```js
--src;
--controllers;
--models;
--utils;
--helpers;
--middlewares;
--validations;
--exceptions;
--app.ts;
```

# 프로젝트 초기화 및 TypeScript 설정하기

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

시작하려면 node 및 npm이 이미 설치되어 있어야합니다. 이 튜토리얼에서는 node v20.11.0 (npm v10.2.4)를 사용할 것입니다. 또한 IDE로 Visual Studio Code를 사용할 것입니다.

- 여기서 node를 설치하세요.
- 여기서 vscode를 설치하세요.
- (선택 사항 - bash 터미널을 얻기 위해) 여기서 windows용 git을 설치하세요.

프로젝트를 위한 새 폴더를 만들어 시작하겠습니다. 이것을 node-api-ts로 이름 지을 것입니다. vscode에서 프로젝트 폴더를 열어보세요. 파일을 '열기...'를 통해 열거나 터미널을 사용해서 프로젝트 폴더로 이동하여 다음 명령어를 사용하세요:

```js
code .
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

이제 Ctrl + `를 사용하여 vscode 통합 터미널을 엽니다. 이렇게 하면 기본 터미널이 열릴 것입니다.

![이미지](/assets/img/2024-06-23-ExpressjsinActionHowtoBuildanAPIwithNodejsandTypeScriptin2024_1.png)

이 튜토리얼에서는 리눅스 및 맥 시스템에서 일반적인 베이시 터미널 명령어를 사용할 것입니다. Windows 사용자는 git bash를 설치하여 유사한 환경을 얻을 수 있습니다. git bash는 베이시 터미널을 에뮬레이트하는 무료 소프트웨어입니다.

# 프로젝트 초기화하기

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

이제 프로젝트 폴더에서 다음 명령어를 사용하여 빈 Node.js 프로젝트를 초기화해보겠습니다. 진행하시기 전에 프로젝트 디렉토리에 있는지 확인해주세요:

```js
npm init
```

앞서 언급한 명령어는 package.json 파일을 생성하기 위해 몇 가지 질문을 통해 새로운 Node.js 패키지/프로젝트를 초기화합니다. 기본적으로 index.js를 덮어씌우기 위해 entry point를 build/app.js로 변경해야 합니다. TypeScript를 사용하기 때문에 나중에 해당 내용을 알아보겠습니다.

```js
package name: (api-ts) node-api-ts
version: (1.0.0)
description: API with Node.js and TypeScript
entry point: (index.js) build/app.js
test command:
git repository:
keywords: node.js,express,api,typescript
author: Mahmoud Kassem
license: (ISC)
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

프로젝트 폴더를 확인해보세요. 아마 이와 유사한 내용을 찾을 수 있을 거에요:

```js
{
  "name": "node-api-ts",
  "version": "1.0.0",
  "description": "API with Node.js and TypeScript",
  "main": "build/app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "node.js",
    "express",
    "api",
    "typescript"
  ],
  "author": "Mahmoud Kassem",
  "license": "ISC"
}
```

# 의존성 설치

무언가를 시작하기 전에 먼저 사용할 종속성(dependancies) 및 개발 종속성(devDependancies)을 나열하고 각각의 사용 목적을 설명해봅시다.

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

의존성(dependencies):

- express: 우리의 API를 구축하는 노드.제이에스 API 프레임워크
- cors: 프로젝트에서 교차 출처를 활성화함
- dotenv: .env 파일에서 환경 변수를 읽어 동적 환경을 생성함
- helmet: 응답 헤더에서 민감한 데이터를 제거하여 API를 보호함
- morgan: 디버깅 및 모니터링 앱 활동을 위한 로깅 미들웨어

개발 의존성(devDependencies):

- typescript: 코드를 빌드하여 JavaScript로 변환하는 데 사용
- types (@types/express, @types/helmet, @types/morgan, @types/dotenv): 자바스크립트 생태계의 일부 패키지는 자체 유형 정의를 제공하지 않아 TypeScript 개발자가 사용하기 어렵게 만들 수 있습니다. 다행히 이러한 패키지를 위한 유형 정의를 제공하는 @types 선언 패키지가 있습니다. 예를 들어, @types/express, @types/helmet, @types/morgan 및 @types/dotenv는 각각 express, helmet, morgan 및 dotenv에 대한 유형 정의를 제공하는 선언 패키지입니다. 이러한 선언 패키지를 devDependencies로 설치하고 TypeScript 코드에서 가져와서 해당 패키지에 대한 유형 검사와 코드 완성을 활성화할 수 있습니다.

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

다음 명령어를 사용하여 종속성을 먼저 설치하세요 — 여러 개의 패키지를 설치할 때는 각 패키지 이름 사이에 공백을 사용하면 됩니다:

```js
npm install express cors dotenv helmet morgan
```

그런 다음 다음 명령어를 사용하여 개발용 종속성을 설치하세요:

```js
npm install --save-dev typescript @types/express @types/cors @types/dotenv @types/helmet @types/morgan
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

패키지.json 파일을 확인했다면, 설치된 패키지와 그 버전이 업데이트되었음을 알 수 있습니다. 또한 프로젝트에 node_modules와 package-lock.json이 추가된 것을 발견하게 될 거에요.

node_modules 폴더 안에는 설치된 의존성이 포함되어 있습니다. 그리고 그 의존성의 종속 항목을 찾아볼 수 있습니다. 이 파일들은 우리가 만들고 있는 것과 유사한 노드 패키지입니다.

package-lock.json은 노드 패키지 매니저(npm)에 의해 자동으로 생성됩니다. 이 파일은 모든 의존성 및 이에 대한 트리의 정확한 버전을 저장합니다. 프로젝트에서 어떤 종속성을 설치하거나 업데이트할 경우 업데이트될 거에요.

## TypeScript 구성하기

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

Node.js는 JavaScript의 런타임으로, 개발자들이 확장 가능하고 효율적인 웹 애플리케이션을 만들 수 있게 합니다. TypeScript는 JavaScript의 슈퍼셋으로, 정적 유형 지정, 객체 지향 프로그래밍, 데코레이터 등의 기능을 추가합니다. 그러나 TypeScript 코드는 Node.js에서 직접 실행되지 않고 먼저 JavaScript로 컴파일해야 합니다.

우리 프로젝트에서 TypeScript를 지원하려면, 먼저 그것을 구성해야 합니다. 아래 명령을 사용하여 구성 파일을 초기화하십시오. 나중에 이 파일을 수정하여 일부 기본값을 변경할 것입니다:

```js
npx tsc --init
```

이전 명령은 다음 내용을 출력할 것입니다:

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

```js
다음은 TypeScript의 기본 구성이지만 변경할 수 있습니다. tsconfig.json이라는 새 파일이 생성된 것을 알 수 있을 거에요.

이전에 설정한 프로젝트 폴더 구조에 맞추기 위해 일부 기본값을 수정할 거에요.

rootDir 주석 처리를 해제하고 값을 ./src로 변경해주세요.
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

```js
{
...
"rootDir": "./src",
...
}
```

이 명령은 프로젝트의 루트 디렉토리를 설정합니다. 이는 TypeScript가 이 폴더 내에만 .ts 파일을 찾도록 하는 것을 의미합니다.

outDir를 주석 처리해제하고 값으로 ./build를 변경하세요.

```js
{
...
"outDir": "./build",
...
}
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

이 코드는 transpiled TypeScript의 기본 출력 디렉터리를 변경합니다.

— 이전 파트는 프로젝트 폴더 이름에 따라 변경할 수 있습니다. src를 app, source 또는 다른 이름으로 변경할 수 있지만, 그러면 rootDir을 선택한 폴더 이름과 일치하도록 변경해야 하며 outDir도 동일합니다.

# Express 서버

이제 코드를 작성해 보겠습니다. 전체 프로젝트의 첫 번째 파일 및 주 파일을 만들어 보겠습니다. npm을 사용하여 노드 프로젝트를 초기화하고 일치하는 엔트리 포인트를 build/app.js로 선택했던 것을 기억하십니까?

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

.ts 파일을 생성하여 이 파일로 컴파일될 것입니다. 그래서 먼저 해야 할 일은 소스 폴더를 생성하는 것입니다. src 폴더를 루트 디렉토리로 설정한 다음, ./src/app.ts 라는 새 파일을 만들어야 합니다. 그 안에 다음과 같은 코드를 작성해 봅시다.

```js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Express 서버 생성
const app = express(); // 새 express 인스턴스
const port = 3000; // 포트 번호

// Express 설정
app.use(cors()); // CORS 활성화
app.use(helmet()); // Helmet 활성화
app.use(morgan("dev")); // Morgan 활성화

// Express 서버 시작
app.listen(port, () => {
  // 서버가 성공적으로 시작되면 콜백 함수 실행
  console.log(`서버가 http://localhost:${port} 에서 시작되었습니다.`);
});

// Express 앱 내보내기
export default app;
```

이전 코드에서는 express 서버 인스턴스를 생성하고 몇 가지 (선택적) 미들웨어로 구성했습니다. 이를 통해 보안, 모니터링 및 디버깅을 개선할 수 있습니다.

이제 다음 명령어를 실행하여 응용 프로그램을 시작할 수 있습니다:

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

```js
npx tsc && node .
```

이제 터미널에서 다음 줄로 끝나는 출력을 확인해야합니다:

```js
서버가 http://localhost:3000에서 시작되었습니다
```

이것은 서버가 성공적으로 시작되었음을 보여주는 콜백 함수의 텍스트입니다.

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

# 첫 번째 라우트 생성하기

이제 우리는 애플리케이션을 구성하고 시작했지만 아직 기능이 없습니다. API를 구축해야 하므로 몇 가지 라우트를 생성해야 합니다.

아래 코드는 express의 get() 메서드를 사용하여 경로 / 에 대한 리스너를 만들고 간단한 Hello World! 문자열을 반환합니다.

Start Express Server 코드 블록 앞에 다음 코드를 추가하세요.

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

```js
// Express 라우트 정의
app.get("/", (req, res) => {
  res.send("Hello World!");
});
```

이제 터미널로 이동해서 현재 프로세스를 Ctrl + C로 중지한 후 npx tsc && node . 명령어를 입력하여 다시 빌드하고 서버를 시작합니다.

이제 새로 만든 라우트를 테스트해보겠습니다. GET 요청을 테스트하기 때문에 http://localhost:3000을 열어보면 다음 출력이 표시됩니다:

![이미지](/assets/img/2024-06-23-ExpressjsinActionHowtoBuildanAPIwithNodejsandTypeScriptin2024_2.png)

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

잘 하셨습니다! 첫 번째 라우트를 만드셨네요.

이 튜토리얼에서 사용된 소스 코드가 포함된 레포지토리입니다. 새 커밋이 있는 경우마다 업데이트될 예정이에요. mahkassem/node-api-ts

2부를 보려면 (여기를 클릭해주세요)
