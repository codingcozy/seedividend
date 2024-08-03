---
title: "Vite에서 Nextjs 14로 마이그레이션 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Vite에서 Nextjs 14로 마이그레이션 하는 방법

이 가이드는 기존의 Vite 애플리케이션을 Next.js로 이전하는 데 도움이 될 것입니다.

## 왜 변경해야 하는가?

Vite에서 Next.js로 변경하고 싶은 여러 이유가 있습니다:

<div class="content-ad"></div>

### 페이지 초기 로딩 시간이 느립니다

만약 React용 기본 Vite 플러그인으로 애플리케이션을 개발했다면, 여러분의 애플리케이션은 순수 클라이언트 쪽 애플리케이션입니다. 클라이언트 쪽 애플리케이션 또는 싱글 페이지 애플리케이션(SPA)으로도 불리는 이 유형의 애플리케이션은 종종 초기 페이지 로딩 시간이 느릴 수 있습니다. 이는 주로 아래의 두 가지 이유로 발생합니다:

- 브라우저는 데이터를 로드하는 요청을 보내기 전에 React 코드와 전체 애플리케이션 번들이 다운로드되고 실행될 때까지 기다려야 합니다.
- 새로운 기능이나 추가 종속성마다 애플리케이션 코드가 계속 커지게 됩니다.

### 자동 코드 분할이 없습니다

<div class="content-ad"></div>

이전에 발생한 느린 로딩 시간 문제는 코드 분할로 어느 정도 관리할 수 있습니다. 그러나 수동으로 코드를 분할하려고 하면 성능이 더 나빠질 수 있습니다. 코드를 수동으로 분할할 때 실수로 네트워크 폭포를 도입하기 쉽습니다. Next.js는 라우터에 내장된 자동 코드 분할 기능을 제공합니다.

### 네트워크 폭포

성능이 떨어지는 일반적인 원인은 응용 프로그램이 데이터를 가져오기 위해 순차적으로 클라이언트-서버 요청을 하는 경우입니다. SPA에서 데이터를 가져오는 일반적인 패턴은 먼저 자리 표시자를 렌더링한 후 컴포넌트가 마운트된 후 데이터를 가져오는 것입니다. 유감스럽게도, 이는 데이터를 가져오는 하위 컴포넌트가 상위 컴포넌트가 자신의 데이터를로드할 때까지 가져오지 못한다는 것을 의미합니다.

Next.js에서는 클라이언트에서 데이터를 가져오는 것이 지원되지만, 서버로 데이터 가져오기를 이동할 수도 있으며 이로써 클라이언트-서버 폭포를 제거할 수 있습니다.

<div class="content-ad"></div>

### 빠르고 의도적인 로딩 상태

React Suspense를 통한 스트리밍에 내장된 지원으로, 네트워크 폭포효과를 발생시키지 않고 어떤 부분을 먼저 로드하고 어떤 순서로 로드할지에 대해 더 의도적으로 설정할 수 있습니다.

이를 통해 더 빨리 로드되는 페이지를 구축하고 레이아웃 변화를 최소화할 수 있습니다.

### 데이터 가져오기 전략 선택

<div class="content-ad"></div>

귀하는 필요에 따라 Next.js에서 페이지 및 구성 요소별로 데이터 가져오기 전략을 선택할 수 있습니다. 빌드 시간에 가져오거나 서버의 요청 시간에 가져오거나 클라이언트에서 가져올지를 결정할 수 있습니다. 예를 들어 CMS에서 데이터를 가져와 블로그 게시물을 빌드 시간에 렌더링할 수 있으며, 이를 CDN에 효율적으로 캐시할 수 있습니다.

### 미들웨어

Next.js 미들웨어를 사용하면 요청이 완료되기 전에 서버에서 코드를 실행할 수 있습니다. 이는 사용자가 인증된 페이지를 방문할 때 인증되지 않은 콘텐츠가 표시되는 것을 피하기 위해 특히 유용합니다. 사용자를 로그인 페이지로 리디렉션하는 데도 유용하며, 실험 및 국제화에도 유용합니다.

### 내장 최적화

<div class="content-ad"></div>

이미지, 폰트 및 타사 스크립트는 애플리케이션 성능에 상당한 영향을 미칠 수 있습니다. Next.js에는 자동으로 이러한 것들을 최적화해주는 내장 컴포넌트가 있습니다.

## 이주 단계

우리의 이주 작업은 가능한 빨리 작동하는 Next.js 애플리케이션을 구축하는 데 있습니다. 그 후에는 점진적으로 Next.js 기능을 채택할 수 있습니다. 먼저 기존 라우터를 이주하지 않고 순수 클라이언트 측 애플리케이션(SPA)으로 유지하겠습니다. 이렇게 하면 이주 과정에서 문제를 최소화하고 병합 충돌을 줄일 수 있습니다.

### 단계 1: Next.js 종속성 설치하기

<div class="content-ad"></div>

가장 먼저 해야 할 일은 종속성으로 next를 설치하는 것입니다:

```js
npm install next@latest
```

### 단계 2: Next.js 구성 파일 만들기

프로젝트의 루트에 `next.config.mjs`를 만듭니다. 이 파일은 Next.js 구성 옵션을 저장할 것입니다.

<div class="content-ad"></div>

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 단일 페이지 애플리케이션(SPA)을 출력합니다.
  distDir: "./dist", // 빌드 출력 디렉토리를 `./dist/`로 변경합니다.
};

export default nextConfig;
```

> 유용한 정보: Next.js 구성 파일에는 .js 또는 .mjs를 사용할 수 있습니다.

### 단계 3: TypeScript 구성 업데이트

TypeScript를 사용하는 경우, tsconfig.json 파일을 다음 변경사항과 함께 업데이트하여 Next.js와 호환되도록 해야 합니다. TypeScript를 사용하지 않는 경우, 이 단계는 건너뛸 수 있습니다.```

<div class="content-ad"></div>

- 프로젝트 참조를 삭제하세요. tsconfig.node.json
- include 배열에 ./dist/types/\*_/_.ts 및 ./next-env.d.ts를 추가하세요.
- exclude 배열에 ./node_modules를 추가하세요.
- compilerOptions의 plugins 배열에 { "name": "next" }를 추가하세요.
  "plugins": [{ "name": "next" }]
- esModuleInterop를 true로 설정하세요.
  "esModuleInterop": true
- jsx를 preserve로 설정하세요.
  "jsx": "preserve"
- allowJs를 true로 설정하세요.
  "allowJs": true
- forceConsistentCasingInFileNames를 true로 설정하세요.
  "forceConsistentCasingInFileNames": true
- incremental을 true로 설정하세요.
  "incremental": true

위의 변경 사항이 반영된 작동하는 tsconfig.json 예시입니다:

```js
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["./src", "./dist/types/**/*.ts", "./next-env.d.ts"],
  "exclude": ["./node_modules"]
}
```

TypeScript 구성에 대한 더 많은 정보는 Next.js 문서에서 확인할 수 있습니다.

<div class="content-ad"></div>

### 단계 4: 루트 레이아웃 작성

Next.js App Router 애플리케이션에는 모든 페이지를 래핑하는 React Server Component인 루트 레이아웃 파일이 포함되어 있어야 합니다. 이 파일은 앱 디렉토리의 최상위에서 정의됩니다.

Vite 애플리케이션에서 루트 레이아웃 파일에 가장 유사한 것은 index.html 파일입니다. 이 파일에는 `html`, `head`, `body` 태그가 포함되어 있습니다.

이 단계에서는 index.html 파일을 루트 레이아웃 파일로 변환하게 됩니다:

<div class="content-ad"></div>

- src 디렉토리 안에 새로운 app 디렉토리를 생성해주세요.
- 해당 app 디렉토리 안에 새로운 layout.tsx 파일을 만들어주세요:

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return null;
}
```

> 참고: 레이아웃 파일에는 .js, .jsx 또는 .tsx 확장자를 사용할 수 있습니다.

- 기존 index.html 파일의 내용을 이전에 생성한 `RootLayout` 컴포넌트로 복사해오면서 body.div#root 및 body.script 태그를 `div id="root"`{children}`/div`로 대체해주세요:

<div class="content-ad"></div>

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
        <meta name="description" content="My App is a..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
```

- Next.js에서는 이미 기본으로 meta charset 및 meta viewport 태그를 포함하고 있으므로 `head`에서 이들을 안전하게 삭제할 수 있습니다:

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <title>My App</title>
        <meta name="description" content="My App is a..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
```

- favicon.ico, icon.png, robots.txt와 같은 메타데이터 파일은 앱 디렉토리의 최상위에 배치되어 있다면 자동으로 애플리케이션 `head` 태그에 추가됩니다. 지원되는 모든 파일을 앱 디렉토리로 이동한 후 이들의 `link` 태그를 안전하게 삭제할 수 있습니다:```

<div class="content-ad"></div>

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
        <meta name="description" content="My App is a..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
```

- 마침내, Next.js는 Metadata API를 사용하여 마지막 `head` 태그를 관리할 수 있습니다. 마지막 메타데이터 정보를 내보낼 metadata 객체로 이동하세요:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
  description: "My App is a...",
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

위 변경 사항을 통해 index.html에서 모두 선언하는 방식에서 Next.js의 프레임워크 내장 (Metadata API) 규칙 기반 접근 방식으로 전환하였습니다. 이 접근 방법을 통해 페이지의 SEO 및 웹 공유 가능성을 보다 쉽게 향상시킬 수 있습니다.```

<div class="content-ad"></div>

### 단계 5: Entrypoint 페이지 생성하기

Next.js에서는 페이지.tsx 파일을 만들어 애플리케이션의 진입점을 선언합니다. Vite에서는 이 파일의 가장 유사한 것이 main.tsx 파일입니다. 이 단계에서 애플리케이션의 진입점을 설정하게 됩니다.

- 앱 디렉터리에 [[...slug]] 디렉터리를 생성합니다.

이 안내서에서는 먼저 Next.js를 SPA (Single Page Application)로 설정하기 위해 노력합니다. 따라서 앱 디렉터리에 새로운 [[...slug]] 디렉터리를 생성하여 애플리케이션의 모든 가능한 경로를 포착할 수 있도록 페이지 진입점을 설정해야 합니다.

<div class="content-ad"></div>

이 디렉토리는 옵셔널 캐치올 라우트 세그먼트라고 부릅니다. Next.js는 파일 시스템 기반의 라우터를 사용하여 디렉토리를 라우트로 정의합니다. 이 특별한 디렉토리는 애플리케이션의 모든 라우트가 해당 페이지.tsx 파일로 이동하도록 보장합니다.

- 다음 내용을 포함하는 app/[[...slug]] 디렉토리 내에 새로운 page.tsx 파일을 만드세요:

```typescript
import "../../index.css";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default function Page() {
  return "..."; // 이부분을 업데이트할 예정입니다
}
```

> 참고: .js, .jsx 또는 .tsx 확장자를 사용하여 페이지 파일을 작성할 수 있습니다.

<div class="content-ad"></div>

이 파일은 서버 구성 요소입니다. 다음 빌드를 실행하면 파일이 정적 에셋으로 미리 렌더링됩니다. 동적 코드가 필요하지 않습니다.

이 파일은 전역 CSS를 가져오고 generateStaticParams에게 우리가 /에있는 인덱스 경로 하나만 생성할 것임을 알려줍니다.

이제 나머지 Vite 애플리케이션을 클라이언트 전용으로 실행하겠습니다.

```typescript
"use client";

import React from "react";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../../App"), { ssr: false });

export function ClientOnly() {
  return <App />;
}
```

<div class="content-ad"></div>

이 파일은 `use client` 지시문으로 정의된 클라이언트 구성 요소입니다. 클라이언트 구성 요소는 클라이언트로 전송되기 전 서버에서 여전히 HTML로 사전 렌더링됩니다.

클라이언트 전용 응용 프로그램을 시작하려면 App 구성 요소 아래에서 사전 렌더링을 비활성화하도록 Next.js를 구성할 수 있습니다.

```js
const App = dynamic(() => import("../../App"), { ssr: false });
```

이제 엔트리포인트 페이지를 새로운 구성 요소를 사용하도록 업데이트하세요.

<div class="content-ad"></div>

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

### 단계 6: 정적 이미지 가져오기 업데이트

Next.js는 Vite와 다르게 정적 이미지 가져오기를 처리합니다. Vite에서 이미지 파일을 가져오면 해당 이미지의 공개 URL이 문자열로 반환됩니다:

```js
import image from "./img.png"; // `image`는 프로덕션 환경에서 '/assets/img.2d8efhg.png'가 됩니다.

export default function App() {
  return <img src={image} />;
}
```

<div class="content-ad"></div>

Next.js에서 정적 이미지를 가져오면 객체가 반환됩니다. 그 객체는 Next.js `Image` 컴포넌트와 함께 직접 사용하거나 기존 `img` 태그와 함께 객체의 src 속성을 사용할 수 있습니다.

`Image` 컴포넌트에는 자동 이미지 최적화의 추가 혜택이 있습니다. `Image` 컴포넌트는 이미지의 차원에 기반하여 결과 `img`의 너비와 높이 속성을 자동으로 설정합니다. 이미지가 로드될 때 레이아웃 변화를 방지합니다. 그러나 이는 앱에 한 차원만 스타일링된 이미지가 포함되어있는 경우 문제를 일으킬 수 있습니다. 이렇게 되면 차원이 '자동'으로 스타일링되지 않은 경우 `img` 차원 속성 값으로 기본 설정되어 이미지가 왜곡될 수 있습니다.

`img` 태그를 유지하면 애플리케이션의 변경량을 줄이고 위에서 언급한 문제를 방지할 수 있습니다. 그런 다음 나중에 선택적으로 로더를 구성함으로써 이미지 최적화의 이점을 취하거나 자동 이미지 최적화가 되어있는 기본 Next.js 서버로 이동하여 나중에 `Image` 컴포넌트로 마이그레이션 할 수 있습니다.

- `/public`에서 가져온 이미지에 대한 절대 import 경로를 상대 import로 변환하십시오:

<div class="content-ad"></div>

```js
// 이전
import logo from "/logo.png";

// 변경 후
import logo from "../public/logo.png";
```

- 이미지 객체 전체가 아닌 이미지 src 속성을 `img` 태그에 전달하십시오:

```js
// 이전
<img src={logo} />

// 변경 후
<img src={logo.src} />
```

또는 파일 이름을 기반으로 이미지 자산의 공개 URL을 참조할 수 있습니다. 예를 들어, public/logo.png는 애플리케이션에서 /logo.png에 있는 이미지를 제공하므로 해당 값이 src로 사용될 것입니다.```

<div class="content-ad"></div>

> 경고: TypeScript를 사용 중이라면 src 속성에 액세스할 때 형식 오류가 발생할 수 있습니다. 지금은 안심하고 무시해도됩니다. 이 가이드가 끝날 때까지 이 문제들은 해결될 것입니다.

### 단계 7: 환경 변수 이전하기

Next.js에는 Vite와 유사한 .env 환경 변수를 지원합니다. 주요 차이점은 클라이언트 측에서 환경 변수를 노출하는 데 사용되는 접두사입니다.

- VITE* 접두사를 사용하던 모든 환경 변수를 NEXT_PUBLIC*로 변경하세요.

<div class="content-ad"></div>

Vite는 특별한 import.meta.env 객체에서 몇 가지 내장 환경 변수를 노출하며, Next.js에서는 지원되지 않습니다. 이를 다음과 같이 업데이트해야 합니다:

- import.meta.env.MODE ⇒ process.env.NODE_ENV
- import.meta.env.PROD ⇒ process.env.NODE_ENV === `production`
- import.meta.env.DEV ⇒ process.env.NODE_ENV !== `production`
- import.meta.env.SSR ⇒ typeof window !== `undefined`

또한 Next.js에는 내장 BASE_URL 환경 변수가 제공되지 않습니다. 그러나 필요하다면 여전히 구성할 수 있습니다:

- .env 파일에 다음을 추가하세요:

<div class="content-ad"></div>

```js
# ...
NEXT_PUBLIC_BASE_PATH="/some-base-path"
```

- 다음과 같이 next.config.mjs 파일에서 basePath를 process.env.NEXT_PUBLIC_BASE_PATH로 설정하세요:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Outputs a Single-Page Application (SPA).
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH, // Sets the base path to `/some-base-path`.
};

export default nextConfig;
```

- import.meta.env.BASE_URL 사용을 process.env.NEXT_PUBLIC_BASE_PATH로 업데이트하세요.

<div class="content-ad"></div>

### 단계 8: package.json 내 스크립트 업데이트하기

이제 Next.js로 잘 이관되었는지 확인하기 위해 애플리케이션을 실행할 수 있어야 합니다. 그러나 그 전에 package.json 내 스크립트를 Next.js 관련 명령어로 업데이트하고 .gitignore에 .next와 next-env.d.ts를 추가해야 합니다:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

```gitignore
# ...
.next
next-env.d.ts
dist
```

<div class="content-ad"></div>

이제 npm run dev를 실행하고 http://localhost:3000을 열어보세요. 지금은 Next.js에서 실행 중인 애플리케이션을 볼 수 있어야 합니다.

> 예시: Vite 애플리케이션을 Next.js로 이관한 작업 예시를 확인해보세요. 이 풀 리퀘스트를 확인해보세요.

### 단계 9: 정리

이제 Vite 관련 아티팩트들을 삭제할 수 있습니다.

<div class="content-ad"></div>

- main.tsx 파일을 삭제하세요.
- index.html 파일을 삭제하세요.
- vite-env.d.ts 파일을 삭제하세요.
- tsconfig.node.json 파일을 삭제하세요.
- vite.config.ts 파일을 삭제하세요.
- Vite 종속성을 제거하세요.

## 다음 단계

모든 것이 계획대로 진행되었다면, 이제 단일 페이지 애플리케이션으로 실행되는 작동하는 Next.js 애플리케이션이 있을 것입니다. 그러나 아직 Next.js의 대부분 이점을 활용하지는 못했지만, 이제 모든 이점을 누릴 수 있도록 점진적인 변경을 시작할 수 있습니다. 다음에 할 수 있는 작업은 다음과 같습니다:

- React Router에서 Next.js App Router로 마이그레이션하여 다음을 얻을 수 있습니다:
  - 자동 코드 분할
  - 스트리밍 서버 렌더링
  - React 서버 구성 요소
- 이미지를 `Image` 컴포넌트로 최적화하세요.
- next/font를 사용하여 폰트를 최적화하세요.
- `Script` 컴포넌트로 서드파티 스크립트를 최적화하세요.
- Next.js 규칙을 지원하도록 ESLint 구성을 업데이트하세요.

<div class="content-ad"></div>
