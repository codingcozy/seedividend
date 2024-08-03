---
title: "Nextjs App Router 라우팅 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs App Router 라우팅 정리

::: tip 💡이 포스팅을 읽으면

:::

App Router는 말 그대로 App 디렉토리의 모든 파일과 폴더들을 라우터로 사용하는 Nextjs 14의 방법입니다.
기존의 Page Router는 Page하위의 디렉토리들을 라우터로 사용했었는데요. 그것보다 많은 것들이 업그레이드가 되었으니 차근차근 알아가보겠습니다.

# Next.js 애플리케이션에서 라우트 정의하기

Next.js 애플리케이션에서 라우트를 정의하는 방법은 파일 시스템 기반의 라우터를 사용합니다. 다음은 라우트를 생성하고 구성하는 방법입니다:

## 1. 폴더 구조

프로젝트의 각 폴더는 URL 세그먼트에 매핑되는 라우트 세그먼트를 나타냅니다. 중첩된 라우트를 생성하려면 폴더를 중첩합니다.

## 2. 라우트 세그먼트용 특수 파일

라우트 세그먼트를 사용하려면 `page.js`라는 특수 파일을 사용해야 합니다.
이 파일에 있는 내용들이 사용자에게 보여지는 것입니다.

<div class="content-ad"></div>

## 3. 파일 확장자

`page.js`와 같은 특수 파일은 `.js`, `.jsx`, 또는 `.tsx`와 같은 확장자를 가질 수 있습니다.
기본적으로 Next.js 는 타입스크립트를 지원하기 때문에 별도의 설정 없이 .tsx를 사용할 수 있습니다.

## 4. UI 만들기

각 라우트 세그먼트에 대한 UI를 만들기 위해 특수 파일 규칙을 사용합니다. 일반적으로 다음과 같습니다:

- `pages`: 특정 라우트에 대한 고유한 UI를 표시하는 데 사용됩니다.
- `layouts`: 여러 라우트 간에 공유되는 UI를 표시하는 데 사용됩니다.

layouts는 항상 고정인 부분이라고 생각하시면 됩니다. 예를 들어 항상 노출되어있는 사이드바 라던가, 푸터 같은 경우에는 layout에 위치할 수 있습니다. 그 Layout 하위에 url에 따라서 맞는 pages가 노출되는 것이죠. /home인 경우에는 home/pages, /explore 인 경우에는 explore/pages가 그려지는 것입니다.

### 1. 라우트 만들기

예를 들어 `/admin/auth` 경로를 정의하려면 다음 단계를 따릅니다:

- `pages` 디렉토리 내에 `admin`라는 이름의 폴더를 만듭니다.
- `admin` 폴더 내에 `auth`라는 이름의 또 다른 폴더를 만듭니다.
- `auth` 폴더 내에 `page.js` 파일을 생성합니다.

폴더 구조는 다음과 같습니다:

```
pages/
  └── admin/
        └── auth/
              └── page.js
```

<div class="content-ad"></div>

### 2. UI 정의

`page.js` 파일 내에서 React 컴포넌트를 내보내어 이 라우트 세그먼트의 UI를 정의합니다. 예를 들면 다음과 같습니다:

```js
// pages/admin/auth/page.js

import React from "react";

const authPage = () => {
  return (
    <div>
      <h1>auth 대시보드</h1>
      {/* 여기에 컴포넌트 내용을 작성 */}
    </div>
  );
};

export default authPage;
```

이제 `/admin/auth` URL로 이동하면 Next.js가 이 `page.js` 파일에 정의된 UI를 렌더링합니다.

## index 페이지 만들기

예를 들어, index 페이지를 만들려면 app 디렉터리에 page.js 파일을 추가합니다:

```jsx
// `app/page.tsx`는 `/` URL의 UI입니다
export default function Page() {
  return <h1>Hello, Home page!</h1>;
}
```

그런 다음, 추가 페이지를 만들려면 새 폴더를 만들고 해당 폴더에 page.js 파일을 추가합니다. 예를 들어, /admin 경로에 대한 페이지를 만들려면 새로운 admin라는 폴더를 만들고 그 안에 page.js 파일을 추가합니다:

<div class="content-ad"></div>

```jsx
// `app/admin/page.tsx`는 `/admin` URL의 UI입니다
export default function Page() {
  return <h1>Hello, admin Page!</h1>;
}
```

::: tip

1. 페이지에는 .js, .jsx 또는 .tsx 파일 확장명을 사용할 수 있습니다.
2. 페이지는 항상 경로 디렉토리 하위에 위치할 수 있습니다.
3. 경로 세그먼트이 사이트 url로 사용되려면 page.js 파일이 필요합니다.
4. 페이지는 기본적으로 서버 컴포넌트입니다만 클라이언트 컴포넌트로 설정할 수 있습니다. 'use client' 사용
5. 페이지는 데이터를 가져올 수 있습니다.
   :::

 <div class="content-ad"></div>

## 레이아웃

레이아웃은 여러 경로에서 공유되는 UI입니다. 내비게이션 중에 레이아웃은 상태를 보존하고 상호 작용하며 다시 렌더링되지 않습니다. 레이아웃은 중첩될 수도 있습니다.

레이아웃을 정의하려면 layout.js 파일에서 기본 React 컴포넌트를 내보냅니다. 컴포넌트는 렌더링 중에 자식 레이아웃(있는 경우) 또는 페이지가 되는 children prop을 받아야 합니다.

예를 들어, 레이아웃은 /admin 및 /admin/settings 페이지와 공유됩니다:

```js
// layout.js 특별 파일
export default function adminLayout({
  children, // 페이지 또는 중첩된 레이아웃
}: {
  children: React.ReactNode,
}) {
  return (
    <section>
      {/* 공유 UI를 여기에 포함합니다. 예: 헤더 또는 사이드바 */}
      <nav></nav>

      {children}
    </section>
  );
}
```

루트 레이아웃 (필수)
루트 레이아웃은 앱 디렉터리의 최상위에서 정의되며 모든 경로에 적용됩니다. 이 레이아웃은 필수이며 서버에서 반환된 초기 HTML을 수정할 수 있도록 html 및 body 태그를 포함해야 합니다.

```jsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body>
        {/* 레이아웃 UI */}
        <main>{children}</main>
      </body>
    </html>
  );
}
```

<div class="content-ad"></div>

## 레이아웃 중첩

기본적으로 폴더 계층 구조에서 레이아웃은 중첩됩니다. 이는 자식 레이아웃을 children prop을 통해 래핑합니다. 특정 경로 세그먼트(폴더) 내에 layout.js를 추가하여 레이아웃을 중첩할 수 있습니다.

예를 들어, /admin 경로에 대한 레이아웃을 만들려면 admin 폴더 내에 새 layout.js 파일을 추가합니다:

```jsx
// 중첩된 레이아웃
export default function adminLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return <section>{children}</section>;
}
```

위의 두 레이아웃을 결합하면 루트 레이아웃(app/layout.js)이 대시보드 레이아웃(app/admin/layout.js)을 래핑하고, 대시보드/\* 내의 경로 세그먼트를 래핑합니다.

::: tip

- .js, .jsx 또는 .tsx 파일 확장명을 레이아웃에 사용할 수 있습니다.
- 루트 레이아웃에만 `<html>` 및 `<body>` 태그를 포함할 수 있습니다.
- layout.js와 page.js 파일이 동일한 폴더에 정의된 경우 레이아웃이 페이지를 래핑합니다.
- 레이아웃은 기본적으로 서버 컴포넌트이지만 클라이언트 컴포넌트로 설정할 수 있습니다.
- 레이아웃은 데이터를 가져올 수 있습니다. 데이터 가져오기 섹션을 참조하세요.
- 부모 레이아웃과 그 자식 간에 데이터를 전달하는 것은 불가능합니다. 그러나 동일한 데이터를 경로에서 여러 번 가져올 수 있으며, React는 성능에 영향을 미치지 않고 요청을 자동으로 중복 처리합니다.
- 레이아웃은 그 하위 경로 세그먼트에 액세스할 수 없습니다. 모든 경로 세그먼트에 접근하려면 클라이언트 컴포넌트에서 useSelectedLayoutSegment 또는 useSelectedLayoutSegments를 사용할 수 있습니다
  :::
