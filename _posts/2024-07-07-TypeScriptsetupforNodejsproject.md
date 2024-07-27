---
title: "Nodejs 프로젝트에서 TypeScript 설정하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-TypeScriptsetupforNodejsproject_0.png"
date: 2024-07-07 12:58
ogImage:
  url: /assets/img/2024-07-07-TypeScriptsetupforNodejsproject_0.png
tag: Tech
originalTitle: "TypeScript setup for Node.js project"
link: "https://medium.com/@aleksei_golubev/typescript-setup-for-node-js-project-28699ed3f6d0"
---

![이미지](/TIL/assets/img/2024-07-07-TypeScriptsetupforNodejsproject_0.png)

지난 몇 년 동안 저는 Angular를 사용하여 프런트엔드 애플리케이션을 작성해 왔는데, 이 기간 동안 TypeScript가 일반 JavaScript보다 강력함을 느꼈습니다. Svelte 앱을 구현할 때 Node.js 기반의 TypeScript를 사용하여 작은 백엔드 서비스도 개발했습니다. 이 작은 기사에서는 코딩 프로세스를 간소화하는 데 도움이 된 구성에 대해 설명하고 싶습니다.

## 의존성

### 빌드

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

개발할 때 잘 알려진 Express.js 프레임워크를 사용했어요. TypeScript와 함께 사용하려면 해당 타입 정의를 명시적으로 추가해야 하며 Node 자체에 대한 것도요. 그러면 어떤 Node.js 환경으로도 이식할 수 있는 JavaScript 번들 하나만 얻고 싶었어요. 모든 것을 하나의 파일로 묶기 위해 특별한 구성 없이 esbuild를 사용했어요. 이것만으로 애플리케이션을 빌드하는 데 필요한 것이 거의 다 준비된 거죠.

## 개발

개발 과정에서 몇 가지 요구 사항도 있었어요. 그중 하나는 파일이 변경될 때 애플리케이션을 다시 실행해야 한다는 점이에요. 프론트엔드 애플리케이션에서의 개발 서버에 익숙해져 있어서 그랬나 봐요. 또 다른 기능은 별칭을 사용하는 것이라 개발자로서 좀 더 편리하다고 생각해요.

TypeScript로 작성된 Node.js 애플리케이션을 실행하려면 ts-node 실행 엔진이 필요해요. 코드가 변경된 후 애플리케이션을 다시 빌드하기 위해 nodemon이 필요해요. 물론 TypeScript도 설치해야 하고 별칭을 사용하려면 tsconfig-paths도 추가해야 해요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## package.json

제 package.json에서 추출한 내용입니다:

```js
{
  "scripts": {
    "start": "nodemon",
    "build": "esbuild main.ts --bundle --platform=node --outfile=dist/app.js --analyze"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^18.15.11",
    "esbuild": "^0.17.16",
    "nodemon": "^2.0.22",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.0.4"
  }
}
```

의미 없는 부분은 건너뛰고 관련 있는 부분만 남겼습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 별칭 및 nodemon 설정

## 구성

TypeScript 컴파일러를 사용할 때는 tsconfig.json 파일에서 특정 디렉토리에 대한 별칭을 정의할 수 있습니다. 아래는 추출된 코드입니다:

```js
{
  "compilerOptions": {
    "baseUrl": "./",
  "paths": {
    "@app/*": ["src/*"]
    }
  }
}
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

다른 컴파일러 옵션에 대해서는 대부분 기본값을 사용했습니다. 엔진 `ts-node`는 이 구성 파일을 사용하지만 별칭을 사용하려면 별칭을 관리하는 모듈을 명시적으로 로드하도록 Node.js에 알려주어야 합니다. 이는 다음과 같이 `tsconfig.json` 안에서 수행할 수 있습니다:

```js
{
 "ts-node": {
   "require": ["tsconfig-paths/register"]
 }
}
```

또는 명령 인수를 사용하여 다음과 같이 처리할 수도 있습니다:

```js
node -r tsconfig-paths/register -r ts-node/register main.ts
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

ts-node과 함께 사용된 nodemon이 더 명확해보였기 때문에 두 번째 변형을 사용하는 것이 더 나은 것 같았습니다. nodemon 구성에 추가할 수 있기 때문입니다. nodemon.config.json에서 추출한 내용은 다음과 같습니다:

```js
{
  "ignore": ["**/*.test.ts", "**/*.spec.ts", ".git", "node_modules"],
  "watch": ["src", "."],
  "exec": "node -r tsconfig-paths/register -r ts-node/register main.ts",
  "ext": "ts"
}
```

여기에서 TypeScript 파일에 대해서만 감시자를 설정하고 감시할 디렉토리 및 무시할 파일에 대한 규칙을 설정했습니다.

## 어플리케이션을 초기화합니다

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

Express.js 위에 몇 가지 래퍼를 구현해 두었어요. 애플리케이션을 초기화하기 위해서는 main.ts에서 해당 클래스를 사용할 수 있습니다:

```js
import { App } from "@app/app";

const app: App = new App();
app.listen(8080);
```

# 요약

Node.js 프로젝트에 적용할 수 있는 기본 설정을 설명했습니다. 이 설정에는 애플리케이션 자동 재시작, 단일 파일 빌드를 위한 간단한 구성, TypeScript 별칭 사용이 포함되어 있어요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 기사에서는 Node.js 구성에 전념한 것으로 응용 프로그램 클래스 구현 설명을 생략했습니다. 또한 서로 다른 디렉터리에 매핑된 여러 별칭을 사용하고 JavaScript로 작성된 모듈을 지원할 수 있습니다.

저의 저장소에 있는 응용 프로그램 예시: https://github.com/aleksei-golubev/article-full-stack-development-svelte-express/tree/main/backend.

Svelte 사용에 대한 참고 사항: https://medium.com/@aleksei_golubev/angular-developer-trying-svelte-e54898ca986b.
