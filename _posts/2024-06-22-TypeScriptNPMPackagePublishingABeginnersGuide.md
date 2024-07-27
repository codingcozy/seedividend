---
title: "TypeScript NPM 패키지 배포 초보자 가이드"
description: ""
coverImage: "/assets/img/2024-06-22-TypeScriptNPMPackagePublishingABeginnersGuide_0.png"
date: 2024-06-22 14:43
ogImage: 
  url: /assets/img/2024-06-22-TypeScriptNPMPackagePublishingABeginnersGuide_0.png
tag: Tech
originalTitle: "TypeScript NPM Package Publishing: A Beginner’s Guide"
link: "https://medium.com/@pauloe-me/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c"
---


![image](/assets/img/2024-06-22-TypeScriptNPMPackagePublishingABeginnersGuide_0.png)

# NPM이란 무엇인가요?

NPM (Node Package Manager)은 JavaScript 프로그래밍 언어의 기본 패키지 관리자입니다. NPM 레지스트리는 JavaScript 패키지를 저장하고 배포하는 중앙 허브로 작동하는 공개 저장소입니다. 이를 통해 개발자는 재사용 가능한 JavaScript 코드 패키지인 모듈 또는 패키지를 쉽게 설치, 관리 및 공유할 수 있습니다.

## TypeScript은 무엇이며 왜 사용해야 하나요?

<div class="content-ad"></div>

TypeScript은 Microsoft에서 개발한 프로그래밍 언어입니다. 이는 JavaScript의 상위 집합으로, 모든 유효한 JavaScript 코드가 TypeScript 코드로도 유효하다는 것을 의미합니다. 이는 다음을 제공하여 일반 JavaScript에 비해 이점을 제공합니다:

- 정적 유형
- 향상된 IDE 지원
- 향상된 코드 품질
- 고급 언어 기능 액세스
- 더 나은 툴링
- 향상된 협업

이러한 이점은 NPM 패키지의 개발 경험을 향상시키며, 패키지 사용자들이 프로젝트에 이를 소비하고 통합하기 쉽게 만들어보다 신뢰할 수 있고 확장 가능하며 유지 관리하기 쉬운 JavaScript 응용 프로그램을 만듭니다.

이 기사에서는 TypeScript로 자신의 NPM 패키지를 생성하고 NPM 레지스트리에 게시하는 방법을 배울 수 있습니다.

<div class="content-ad"></div>

# Typescript 프로젝트 설정하기

- 로컬 머신에 새 프로젝트 디렉토리를 만듭니다.
- 터미널이나 명령 프롬프트를 열고 프로젝트 디렉토리로 이동합니다.
- 다음 명령을 실행하여 새 Node.js 프로젝트를 초기화합니다. `npm init`을 입력하고 화면 안내에 따릅니다.

![이미지](/assets/img/2024-06-22-TypeScriptNPMPackagePublishingABeginnersGuide_1.png)

- 첫 번째 필드는 패키지 이름이며, 이는 패키지를 위한 고유한 이름이어야 합니다. NPM 레지스트리를 확인하여 이름이 사용 가능한지 확인할 수 있습니다. 이름을 사용할 수 있다면 Enter를 눌러 다음으로 넘어갈 수 있습니다. 이 경우 `npm-demo-ts`이(가) 사용 가능했습니다.

<div class="content-ad"></div>

```html
![image](/assets/img/2024-06-22-TypeScriptNPMPackagePublishingABeginnersGuide_2.png)

- The next field is the version, and the default value is 1.0.0. Package versions generally use Semantic Versioning.

## What is Semantic Versioning?

It provides a standard way to convey the compatibility and changes in a package across different releases. It consists of three numerical components: Major version, Minor version, and Patch version, represented as MAJOR.MINOR.PATCH, for example, 1.0.7
```

<div class="content-ad"></div>

- 주 버전 증가: 호환되지 않는 변경 사항을 도입합니다.
- 부 버전 증가: 역호환성을 유지하면서 새로운 기능을 추가합니다.
- 패치 버전 증가: 역호환성 버그 수정 또는 소량 업데이트를 수행합니다.

의미 있는 버전 관리 방침을 준수하고 버전 제약 조건을 사용하여 개발자는 종속성을 효과적으로 관리하고 호환성을 보장하며 NPM 패키지의 업데이트 영향을 사용자와 사용자에게 전달할 수 있습니다.

- 다음 필드는 description입니다. 여기에는 NPM 패키지의 기능에 대한 간단한 설명을 포함해야 합니다.
- 다음 필드는 entry point입니다. 이는 다른 모듈에 의해 가져올 때 실행되는 주 Javascript 파일을 가리킵니다. 현재는 기본 설정을 유지하실 수 있습니다.
- 다음 필드는 test command입니다. 패키지의 테스트를 실행하는 데 사용되는 명령어나 스크립트입니다. 현재는 기본 설정을 유지하실 수 있습니다.
- 다음 필드는 git repository입니다. 이는 원격 Git 리포지토리로의 링크를 포함해야 합니다.
- 다음 필드는 keywords입니다. 패키지와 관련된 단어를 포함하여 NPM 레지스트리에서 색인에 도움이 되는 내용이어야 합니다.
- 다음 필드는 author입니다. 패키지 저자의 이름입니다.
- 마지막으로 license 필드에는 오픈 소스 라이센스를 포함해야 합니다. 자세한 내용은 여기를 읽어보시거나 현재는 기본 설정을 유지하실 수 있습니다.
- 이후 모든 답변에 대한 요약이 생성됩니다. 아래 이미지와 유사하게 보여야 하며, 여러분의 답변으로 채워져 있어야 합니다. 엔터를 눌러 진행하세요.

![image](/assets/img/2024-06-22-TypeScriptNPMPackagePublishingABeginnersGuide_3.png)

<div class="content-ad"></div>

- 패키지 종속성을 설치하려면 다음 명령어를 실행하세요: npm install --save-dev typescript ts-node (npm 사용자) 또는 yarn add -D typescript ts-node (yarn 사용자)
- tsconfig.json을 설정하려면 다음 명령어를 실행하세요: npx tsc --init, 프로젝트의 기본 디렉터리에 tsconfig 파일이 생성됩니다. outDir 필드를 "dist"로 업데이트하세요.
- src 폴더를 생성하고 index.ts 파일을 만들어 아래 코드를 붙여넣으세요. 이 코드는 두 숫자를 더하는 간단한 함수입니다.

```js
export function add(a: number, b: number): number {
  return a + b;
}

console.log(add(3, 5)); //결과: 8
```

- 다음 명령어로 코드를 실행하세요: npx ts-node src/index, 콘솔에서 결과값인 8을 볼 수 있어야 합니다. 그 후 코드에서 console.log 줄을 삭제하세요.
- git init으로 깃 레포를 초기화하세요.
- .gitignore 파일을 생성하고 다음을 파일에 붙여넣으세요.

```js
/node_modules

# 테스트 관련 파일 무시
/coverage.data
/coverage/

# 빌드 파일
/dist
```

<div class="content-ad"></div>

- README.md 파일을 만들어 프로젝트에 대한 설명과 사용 방법을 포함하는 것도 좋은 아이디어입니다.

# TypeScript 패키지 빌드

이제 패키지 코드 작성을 완료했으니, 사용자가 여러 JavaScript 또는 TypeScript 프로젝트에서 소비할 수 있게 패키지를 빌드하는 방법을 살펴보겠습니다.

tsup, babel, webpack, rollup 등 다양한 전용 빌드 도구가 있어 이 프로세스를 돕는데 도움이 됩니다. 이 글에서는 tsup에 초점을 맞출 것입니다.

<div class="content-ad"></div>

## Tsup 설정하기

- 다음 명령어를 실행하여 프로젝트에 tsup을 추가하세요.
  
  npm install tsup -D
  
  또는
  
  yarn add tsup --dev
  

- 아래 코드를 붙여넣어서 `yourtsup.config.ts` 파일을 생성하세요.

```js
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // commonJS 및 ESmodules용으로 빌드합니다
  dts: true, // 선언 파일 (.d.ts) 생성
  splitting: false,
  sourcemap: true,
  clean: true,
});
```

- package.json 에서 스크립트를 업데이트하세요.

<div class="content-ad"></div>

```js
 "scripts": {
    "build": "tsup",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

- npm run build 또는 yarn build로 프로젝트를 빌드할 수 있습니다.
- package.json의 main을 업데이트하고 다음을 추가하세요:

```js
...
"main": "./dist/index.js",
"module": "./dist/index.mjs",
"types": "./dist/index.d.ts",
"files": [
    "dist"
 ],
...
```

- 이제 패키지를 출판할 준비가 모두 끝났지만, 그 전에 계획대로 모든 것이 작동하는지 확인하기 위해 패키지를 테스트해야 합니다.

<div class="content-ad"></div>

# 당신의 NPM 패키지를 테스트해 봅니다

테스트를 통해 사용자에게 도달하기 전에 어떤 문제나 버그가 있는지 확인하고 해결할 수 있습니다. 당신의 npm 패키지를 테스트하기 위해 Jest를 설정해야 합니다.

## Jest 설정하기

- 다음 명령어를 실행하여 프로젝트에 jest를 추가합니다
npm install -D jest ts-jest @types/jest or yarn add -D jest ts-jest @types/jest
- 프로젝트에 jest.config.js 파일을 추가하고 다음 코드를 복사하세요

<div class="content-ad"></div>

```js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
```

- 프로젝트 내에 tests 폴더를 생성하고 add.test.ts 파일을 생성하여 다음 테스트를 추가해주세요.

```js
import { add } from '../src';

test('두 숫자를 정확히 더합니다', () => {
  const result = add(2, 3);
  expect(result).toBe(5);
});
```

- 다음 스크립트를 포함하여 package.json 파일을 업데이트해주세요.

<div class="content-ad"></div>

```json
"scripts": {
    "build": "tsup",
    "test": "jest"
 },
```

- 테스트 스크립트를 다음 명령어로 실행하세요: npm run test 또는 yarn test . 결과는 아래 이미지와 같아야 합니다.

![image](/assets/img/2024-06-22-TypeScriptNPMPackagePublishingABeginnersGuide_4.png)

이제 당신은 npm 패키지를 성공적으로 작성하고 테스트했습니다. 이제 NPM 패키지를 게시하는 방법으로 넘어가 봅시다.

<div class="content-ad"></div>

# NPM 패키지를 게시하는 방법

마지막으로, NPM 레지스트리에 패키지를 게시하기 전에 로컬 머신에서 패키지를 게시하고 테스트하는 것이 중요합니다. 이는 패키지의 정확성, 기능 및 다른 모듈 또는 종속성과의 호환성을 확인하기 위한 것입니다. 로컬 테스트를 통해 어떤 문제나 버그도 조기에 발견하여 필요한 개선을 하고 패키지를 공개하기 전에 준비할 수 있습니다.

## 로컬로 NPM 패키지를 게시하는 방법

- 패키지의 루트 디렉터리에서 다음 명령어를 실행하세요
npm link
- 다른 테스트 프로젝트를 만들고 npm 패키지를 로컬로 연결하세요
이 경우 npm link npm-demo-ts처럼 npm link name-of-package명령어를 사용하세요
- 테스트 프로젝트에 main.ts 파일을 만들고 패키지를 가져와서 테스트하세요. 또한 TypeScript의 많은 혜택 중 하나인 프로젝트에 타입 정보를 입력하세요.

<div class="content-ad"></div>


<img src="/assets/img/2024-06-22-TypeScriptNPMPackagePublishingABeginnersGuide_5.png" />

- 이제 로컬에서 테스트를 완료했으니, 레지스트리에 발행해 봅시다.

## NPM 패키지를 NPM 레지스트리에 발행하기

- 이미 없는 경우 NPM에서 계정을 만듭니다.
- 터미널에서 NPM 계정에 로그인합니다.
npm login
- 사용자 이름, 암호, 이메일 및 OTP를 입력합니다.


<div class="content-ad"></div>

![Screenshot 6](/assets/img/2024-06-22-TypeScriptNPMPackagePublishingABeginnersGuide_6.png)

- npm publish 명령어로 패키지를 배포하세요

![Screenshot 7](/assets/img/2024-06-22-TypeScriptNPMPackagePublishingABeginnersGuide_7.png)

![Screenshot 8](/assets/img/2024-06-22-TypeScriptNPMPackagePublishingABeginnersGuide_8.png)

<div class="content-ad"></div>

# 결론

TypeScript을 사용하여 패키지를 개발하고 사용하면 다양한 이점을 누릴 수 있습니다. 정적 타이핑은 개발자에게 코드 품질 향상, 초기 오류 감지, 향상된 편집기 지원을 제공합니다. TypeScript의 타입 정의는 더 나은 문서화와 패키지 API의 이해도 향상을 가능하게 하며, 연동을 원활하게 하고 소비자의 잠재적인 버그를 줄이는 데 도움이 됩니다. 또한 TypeScript의 생태계는 다양한 라이브러리, 도구 및 리소스를 자랑하여 협업 및 커뮤니티 지원을 촉진합니다.

첫 번째 TypeScript NPM 패키지를 발행함으로써 이러한 장점을 누르는 뿐만 아니라 TypeScript 생태계의 성장과 풍요로워짐에 기여할 수 있습니다. 활기찬 커뮤니티에 참여하여 지식과 전문성을 공유하고 JavaScript 개발 세계에 오랜 영향을 끼치세요.

읽어주셔서 감사합니다! 더 많은 튜토리얼을 위해 팔로우해주세요.