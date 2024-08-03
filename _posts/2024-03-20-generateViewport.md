---
title: "Nextjs 14에서 초기 뷰포트 생성하기generateViewport"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs 14에서 초기 뷰포트 생성하기(generateViewport)

페이지의 초기 뷰포트를 정적 뷰포트 객체 또는 동적 generateViewport 함수로 사용자 정의할 수 있습니다.

> 참고:
> 뷰포트 객체와 generateViewport 함수는 서버 구성요소에서만 지원됩니다.
> 동일한 라우트 세그먼트에서 뷰포트 객체와 generateViewport 함수를 모두 내보낼 수 없습니다.
> 메타데이터 내보내기에서 온 경우 metadata-to-viewport-export codemod를 사용하여 변경 사항을 업데이트할 수 있습니다.

## 뷰포트 객체

<div class="content-ad"></div>

뷰포트 옵션을 정의하려면 layout.jsx 또는 page.jsx 파일에서 viewport 객체를 내보내세요.

```typescript
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "black",
};

export default function Page() {}
```

## generateViewport 함수

generateViewport 함수는 하나 이상의 뷰포트 필드를 포함한 Viewport 객체를 반환해야 합니다.

<div class="content-ad"></div>

```typescript
export function generateViewport({ params }) {
  return {
    themeColor: "...",
  };
}
```

> 참고 사항:
> Viewport가 런타임 정보에 의존하지 않는다면, generateMetadata 대신 정적 Viewport 객체를 사용하여 정의해야 합니다.

## Viewport 필드

### themeColor

<div class="content-ad"></div>

테마 색상에 대해 더 알아보세요.

간단한 테마 색상

```typescript
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "black",
};
```

```js
<meta name="theme-color" content="black" />
```

<div class="content-ad"></div>

미디어 속성이 있는 테이블

```typescript
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "cyan" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
```

```js
<meta name="theme-color" media="(prefers-color-scheme: light)" content="cyan" />
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
```

### 너비, 초기 확대, 최대 확대 및 사용자 확대 가능 여부

<div class="content-ad"></div>

> 참고: 뷰포트 메타 태그는 자동으로 설정되며, 일반적으로 기본 설정이 충분하여 수동 구성이 필요하지 않습니다. 그러나 완전성을 위해 정보가 제공됩니다.

```typescript
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Less commonly used but supported
  // interactiveWidget: 'resizes-visual',
};
```

```js
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
```

### colorScheme

<div class="content-ad"></div>

Learn more about color-scheme.

```typescript
import type { Viewport } from "next";

export const viewport: Viewport = {
  colorScheme: "dark",
};
```

```js
<meta name="color-scheme" content="dark" />
```

## Types

<div class="content-ad"></div>

Viewport 객체에 타입 안전성을 추가할 수 있습니다. Viewport 타입을 사용하여 뷰포트 객체에 타입을 설정할 수 있어요. IDE에 기본으로 제공된 TypeScript 플러그인을 사용 중이라면 타입을 수동으로 추가할 필요가 없지만, 원한다면 명시적으로 추가할 수도 있어요.

### viewport 객체

```js
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "black",
};
```

### generateViewport 함수

<div class="content-ad"></div>

#### 보통 함수

```js
import type { Viewport } from "next";

export function generateViewport(): Viewport {
  return {
    themeColor: "black",
  };
}
```

#### 세그먼트 프로퍼티와 함께

```js
import type { Viewport } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export function generateViewport({ params, searchParams }: Props): Viewport {
  return {
    themeColor: 'black',
  }
}

export default function Page({ params, searchParams }: Props) {}
```

<div class="content-ad"></div>

#### JavaScript 프로젝트

JavaScript 프로젝트의 경우, 타입 안전성을 추가하기 위해 JSDoc을 사용할 수 있습니다.

```js
/** @type {import("next").Viewport} */
export const viewport = {
  themeColor: "black",
};
```

## 버전 이력

<div class="content-ad"></div>

| Version   | Changes                                       |
| --------- | --------------------------------------------- |
| `v14.0.0` | `viewport` and `generateViewport` introduced. |

<div class="content-ad"></div>
