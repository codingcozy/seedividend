---
title: "Creat React App에서 Nextjs 14로 마이그레이션 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Creat React App에서 Nextjs 14로 마이그레이션 하는 방법

이 안내서는 기존의 Create React App 사이트를 Next.js로 이전하는 방법을 안내해 드릴 거에요.

## 왜 바꿀까요?

Create React App에서 Next.js로 전환하고 싶은 이유는 몇 가지 있을 수 있어요:

<div class="content-ad"></div>

### 초기 페이지 로딩 시간이 느립니다

Create React App은 순수 클라이언트 측 React를 사용합니다. 클라이언트 측만을 이용한 응용 프로그램, 즉 싱글 페이지 응용 프로그램(SPA)은 종종 초기 페이지 로딩 시간이 느린 것을 경험합니다. 이는 몇 가지 이유로 발생합니다:

- 브라우저는 데이터를로드하기 전에 React 코드와 전체 앱 번들을 다운로드하고 실행해야 하기 때문에 코드가 데이터를로드하기 위해 요청을 보내기 전에 기다려야 합니다.
- 새로운 기능 및 종속성을 추가할 때마다 애플리케이션 코드가 증가합니다.

### 자동 코드 분할이 없습니다

<div class="content-ad"></div>

이전에 발생한 느린로딩 시간 문제는 코드 분할로 어느 정도 해결할 수 있습니다. 그러나 수동으로 코드를 분할하려고 하면 성능이 오히려 나빠질 수 있습니다. 수동으로 코드를 분할하려고 하면 네트워크 폭포가 발생하기 쉬울 수 있습니다. Next.js는 자체 라우터에 내장된 자동 코드 분할 기능을 제공합니다.

### 네트워크 폭포

일련의 클라이언트-서버 요청을 순차적으로 만드는 응용 프로그램이 데이터를 가져올 때 성능이 저하되는 일반적인 원인입니다. SPA에서 데이터를 가져오는 일반적인 패턴 중 하나는 초기에 플레이스홀더를 렌더링하고, 컴포넌트가 마운트된 후 데이터를 가져오는 것입니다. 유감스럽게도, 데이터를 가져오는 자식 컴포넌트는 부모 컴포넌트가 자신의 데이터로드를 마치기 전까지 가져오기 시작할 수 없습니다.

Next.js에서는 클라이언트에서 데이터를 가져오는 것을 지원할 뿐만 아니라, 서버로 데이터 가져오기를 전환할 수 있는 옵션을 제공하여 클라이언트-서버 간의 폭포를 제거할 수 있습니다.

<div class="content-ad"></div>

### 빠르고 의도적인 로딩 상태

React Suspense를 통한 스트리밍 지원으로, 네트워크 폭포 효과를 없애지 않으면서 UI의 어떤 부분을 먼저 로드할지와 어떤 순서로 로드할지에 대해 더 의도적일 수 있습니다.

이를 통해 로드 시간이 빠른 페이지를 구축하고 레이아웃 변화를 제거할 수 있습니다.

### 데이터 가져오기 전략 선택

<div class="content-ad"></div>

요구에 따라 Next.js를 사용하면 페이지 및 구성 요소별로 데이터 가져오기 전략을 선택할 수 있습니다. 빌드 시간에 가져오는지, 서버에서 요청 시간에 가져오는지, 또는 클라이언트에서 가져오는지를 결정할 수 있습니다. 예를 들어, CMS에서 데이터를 가져와 블로그 게시물을 빌드할 때, CDN에 효율적으로 캐싱할 수 있습니다.

### 미들웨어

Next.js 미들웨어를 사용하면 요청이 완료되기 전에 서버에서 코드를 실행할 수 있습니다. 인증된 페이지로 사용자가 방문할 때 인증되지 않은 컨텐츠가 표시되지 않도록 리디렉션하여 플래시를 방지하는 데 유용합니다. 미들웨어는 실험과 국제화에도 유용합니다.

### 내장된 최적화

<div class="content-ad"></div>

이미지, 폰트 및 타사 스크립트는 애플리케이션의 성능에 상당한 영향을 줄 수 있습니다. Next.js에는 자동으로 이를 최적화하는 내장 구성 요소가 포함되어 있습니다.

## 마이그레이션 단계

이 마이그레이션의 목표는 가능한 빨리 작동하는 Next.js 애플리케이션을 얻어, 그 후에 Next.js 기능을 점진적으로 도입할 수 있도록 하는 것입니다. 시작할 때는 기존 라우터를 마이그레이션하지 않고 순수 클라이언트 측 애플리케이션(SPA)으로 유지합니다. 이렇게 하면 마이그레이션 과정 중에 문제를 최소화하고 병합 충돌을 줄일 수 있습니다.

### 단계 1: Next.js 종속성 설치하기

<div class="content-ad"></div>

첫 번째 해야 할 일은 종속성으로 next를 설치하는 것입니다:

```js
npm install next@latest
```

### 단계 2: Next.js 구성 파일 만들기

프로젝트의 루트에 next.config.mjs 파일을 만듭니다. 이 파일에는 Next.js 구성 옵션이 저장됩니다.

<div class="content-ad"></div>

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 단일 페이지 애플리케이션(SPA)을 출력합니다.
  distDir: "./dist", // 빌드 출력 디렉토리를 `./dist/`로 변경합니다.
};

export default nextConfig;
```

### 단계 3: TypeScript 구성 업데이트

TypeScript를 사용하는 경우, tsconfig.json 파일을 다음 변경 사항으로 업데이트하여 Next.js와 호환되도록 해야 합니다:

```js
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "strictNullChecks": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "./dist/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

<div class="content-ad"></div>

Next.js 문서에서 TypeScript를 구성하는 데 대한 자세한 정보를 찾을 수 있습니다.

### 단계 4: 루트 레이아웃 생성

Next.js 앱 라우터 애플리케이션은 모든 페이지를 감싸는 React Server Component인 루트 레이아웃 파일을 포함해야 합니다. 이 파일은 앱 디렉토리의 최상위에 정의됩니다.

CRA 애플리케이션의 루트 레이아웃 파일에 가장 유사한 것은 `html`, `head`, `body` 태그가 포함된 index.html 파일입니다.

<div class="content-ad"></div>

이 단계에서는 index.html 파일을 루트 레이아웃 파일로 변환할 것입니다:

- src 디렉토리 내에 새 앱 디렉토리를 생성하세요.
- 해당 앱 디렉토리 안에 새 layout.tsx 파일을 생성하세요:

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return null;
}
```

> 참고: 레이아웃 파일에는 .js, .jsx 또는 .tsx 확장자를 사용할 수 있습니다.

<div class="content-ad"></div>

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>React App</title>
        <meta name="description" content="Web site created..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
```

<div class="content-ad"></div>

Next.js에는 이미 기본적으로 meta charset 및 meta viewport 태그가 포함되어 있습니다. 따라서 안전하게 해당 태그들을 `head`에서 제거할 수 있습니다:

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <title>React App</title>
        <meta name="description" content="Web site created..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
```

favicon.ico, icon.png, robots.txt와 같은 메타데이터 파일들은 애플리케이션의 `head` 태그에 자동으로 추가됩니다. 이 파일들을 애플리케이션 디렉터리의 최상위에 배치하면 됩니다. 모든 지원되는 파일을 애플리케이션 디렉터리로 이동한 후 해당 `link` 태그를 안전하게 제거할 수 있습니다:

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>React App</title>
        <meta name="description" content="Web site created..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
```

<div class="content-ad"></div>

마침내, Next.js는 Metadata API를 사용하여 마지막 `head` 태그를 관리할 수 있게 되었습니다. 최종 메타데이터 정보를 내보낼 메타데이터 객체로 이동하세요:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "React App",
  description: "Next.js로 생성된 웹 사이트입니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
```

위 변경 사항을 통해 index.html에 모든 것을 선언하는 대신 Next.js의 규칙 기반 접근 방식(빌트인 Metadata API)을 사용하게 되었습니다. 이 접근 방식을 통해 SEO를 향상시키고 페이지의 웹 공유 가능성을 높일 수 있습니다.

### 단계 6: 스타일

<div class="content-ad"></div>

리액트 앱 만들기처럼 Next.js에도 CSS Modules을 지원하고 있어요.

전역 CSS 파일을 사용 중이라면, 해당 파일을 앱/layout.tsx 파일에 import하세요:

```typescript
import "../index.css";

// ...
```

Tailwind를 사용 중이라면, postcss와 autoprefixer를 설치해야 합니다.

<div class="content-ad"></div>

```js
npm install postcss autoprefixer
```

그런 다음, 프로젝트 루트에 postcss.config.js 파일을 만드세요:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 단계 7: 진입점 페이지 생성하기

<div class="content-ad"></div>

Next.js에서는 page.tsx 파일을 만들어 응용 프로그램의 진입점을 선언합니다. CRA에서 이 파일의 가장 유사한 것은 src/index.tsx 파일입니다. 이 단계에서는 응용 프로그램의 진입점을 설정할 것입니다.

응용 프로그램 디렉토리에 [[...slug]] 디렉토리를 만듭니다.

이 안내서는 먼저 Next.js를 SPA(싱글 페이지 응용 프로그램)로 설정하는 것을 목표로 하고 있으므로 응용 프로그램의 페이지 진입점이 가능한 모든 경로를 잡을 수 있어야 합니다. 이를 위해 응용 프로그램 디렉토리에 새로운 [[...slug]] 디렉토리를 만드세요.

이 디렉토리는 선택적 캐치올(route segment) 라우트로 불립니다. Next.js는 파일 시스템 기반의 라우터를 사용하여 디렉토리를 경로로 정의합니다. 이 특별한 디렉토리는 응용 프로그램의 모든 경로가 그 안에 포함된 page.tsx 파일로 이동되도록 보장합니다.

<div class="content-ad"></div>

```typescript
import "../../index.css";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default function Page() {
  return "..."; // 우리는 이 부분을 업데이트할 거에요
}
```

이 파일은 서버 컴포넌트입니다. `next build`를 실행하면 파일이 정적 에셋으로 사전 렌더링됩니다. 어떤 동적 코드도 필요하지 않습니다.

이 파일은 글로벌 CSS를 가져오고 `generateStaticParams` 함수에게 `/` 경로에 있는 인덱스 경로 하나만 생성할 것을 알려줍니다.

<div class="content-ad"></div>

자, 이제 CRA 애플리케이션의 나머지 부분을 이동해 봅시다. 이 부분은 클라이언트 전용으로 실행될 것입니다.

```typescript
"use client";

import React from "react";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../../App"), { ssr: false });

export function ClientOnly() {
  return <App />;
}
```

이 파일은 'use client' 지시어로 정의된 클라이언트 컴포넌트입니다. 클라이언트 컴포넌트는 클라이언트로 전송되기 전에 서버에서 아직 HTML로 미리 렌더링됩니다.

앱 컴포넌트부터 아래로의 렌더링을 비활성화하려면 Next.js를 구성할 수 있습니다.

<div class="content-ad"></div>

아래는 새 컴포넌트를 사용하도록 엔트리포인트 페이지를 업데이트하세요:

```typescript
import "../../index.css";
import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default function Page() {
  return <ClientOnly />;
}
```

### 단계 8: 정적 이미지 가져오기 업데이트

<div class="content-ad"></div>

Next.js는 CRA와 약간 다른 방식으로 정적 이미지 가져오기를 처리합니다. CRA의 경우, 이미지 파일을 가져오면 해당 이미지의 공개 URL이 문자열로 반환됩니다:

```js
import image from "./img.png";

export default function App() {
  return <img src={image} />;
}
```

Next.js에서는, 정적 이미지 가져오기는 객체로 반환됩니다. 해당 객체는 Next.js `Image` 컴포넌트와 직접 사용할 수 있습니다. 또는 객체의 `src` 속성을 기존 `img` 태그와 함께 사용할 수도 있습니다.

`Image` 컴포넌트는 자동 이미지 최적화의 장점을 가지고 있습니다. `Image` 컴포넌트는 이미지의 차원을 기반으로 결과 `img`의 너비와 높이 속성을 자동으로 설정합니다. 이는 이미지가로드 될 때 레이아웃 변화를 방지합니다. 그러나, 앱에 한 쪽 차원만 스타일이 적용된 이미지가 있는 경우 문제가 발생할 수 있습니다. 자동으로 스타일을 적용하지 않은 경우, 차원은 `img`의 차원 속성 값으로 기본 설정되어 이미지가 왜곡될 수 있습니다.

<div class="content-ad"></div>

`img` 태그를 유지하면 응용 프로그램에서 변경량을 줄이고 위의 문제를 방지할 수 있습니다. 그럼 나중에 선택적으로 `Image` 컴포넌트로 마이그레이션하여 로더를 구성하거나 기본 Next.js 서버로 옮겨서 이미지 최적화를 활용할 수 있습니다.

/public에서 가져온 이미지에 대한 절대 임포트 경로를 상대적인 임포트로 변경하세요.

```js
// 이전
import logo from "/logo.png";

// 변경 후
import logo from "../public/logo.png";
```

`img` 태그에 전체 이미지 객체 대신 이미지 src 속성을 전달해 주세요.

<div class="content-ad"></div>

```js
// 이전
<img src={logo} />

// 이후
<img src={logo.src} />
```

또는 파일 이름을 기반으로 이미지에 대한 공개 URL을 참조할 수 있습니다. 예를 들어 public/logo.png를 사용하면 애플리케이션의 /logo.png에 이미지가 제공될 것이며, 이것이 src 값이 됩니다.

> 경고: TypeScript를 사용 중이라면 src 속성에 액세스할 때 유형 오류가 발생할 수 있습니다. 현재는 안전하게 무시할 수 있습니다. 이 오류는 본 가이드의 끝에 해결될 것입니다.

### 단계 9: 환경 변수 이전하기

<div class="content-ad"></div>

Next.js는 CRA와 비슷한 .env 환경 변수를 지원합니다.

주요 차이점은 클라이언트 측에서 환경 변수를 노출하는 데 사용되는 접두사입니다. REACT*APP* 접두사가 붙은 모든 환경 변수를 NEXT*PUBLIC*로 변경해주세요.

### 단계 10: package.json에서 스크립트 업데이트하기

이제 Next.js로 성공적으로 이관되었는지 확인하기 위해 응용 프로그램을 실행할 수 있어야 합니다. 그러나 그 전에 package.json의 스크립트를 관련 Next.js 명령어로 업데이트하고, .gitignore 파일에 .next, next-env.d.ts 및 dist를 추가해야 합니다.

<div class="content-ad"></div>

```js
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

```js
# ...
.next
next-env.d.ts
dist
```

이제 `npm run dev`를 실행하고 http://localhost:3000을 열어주세요.
이제 Next.js에서 애플리케이션이 실행 중이어야 합니다.

### 단계 11: 정리하기

<div class="content-ad"></div>

이제 Create React App과 관련된 자산을 코드베이스에서 정리할 수 있어요:

- src/index.tsx 파일 삭제하기
- public/index.html 파일 삭제하기
- reportWebVitals 설정 삭제하기
- CRA 의존성 패키지 (react-scripts) 제거하기

## 번들러 호환성

Create React App과 Next.js는 둘 다 번들링에 webpack을 기본으로 사용합니다.

<div class="content-ad"></div>

CRA 애플리케이션을 Next.js로 이주할 때, 사용자 정의 웹팩 설정을 옮기려는 경우가 있을 수 있습니다. Next.js는 사용자 정의 웹팩 설정을 지원합니다.

또한, Next.js는 지역 개발 성능을 향상시키기 위해 next dev --turbo를 통해 Turbopack를 지원합니다. Turbopack는 호환성 및 점진적 채택을 위해 일부 웹팩 로더를 지원합니다.

## 다음 단계

모든 것이 계획대로 진행된다면, 이제 단일 페이지 애플리케이션으로 작동하는 기능적인 Next.js 애플리케이션이 실행됩니다. 그러나 아직 Next.js의 대부분의 이점을 활용하지는 못 하고 있지만, 이제 점진적인 변화를 시작하여 모든 이점을 누릴 수 있습니다. 다음에 할 일은 다음과 같습니다:

<div class="content-ad"></div>

- React Router에서 Next.js App Router로 마이그레이션하여 다음 사항을 얻으세요:
  자동 코드 분할
  스트리밍 서버 렌더링
  React 서버 컴포넌트
- 자동 코드 분할
- 스트리밍 서버 렌더링
- React 서버 컴포넌트
- `Image` 컴포넌트로 이미지 최적화
- next/font로 폰트 최적화
- `Script` 컴포넌트로 써드파티 스크립트 최적화
- Next.js 규칙을 지원하기 위해 ESLint 구성 업데이트

> 알아두면 좋은 점: 정적 익스포트를 사용하는 경우 useParams 훅을 현재 지원하지 않습니다.

<div class="content-ad"></div>
