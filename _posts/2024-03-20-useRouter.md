---
title: "Nextjs 14 클라이언트 컴포넌트에서 페이지 이동시키는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs 14 클라이언트 컴포넌트에서 페이지 이동시키는 방법

useRouter 훅을 사용하면 클라이언트 컴포넌트 내에서 라우트를 프로그래밍적으로 변경할 수 있습니다.

> 권장 사항: `Link` 컴포넌트를 네비게이션에 사용하십시오. useRouter를 사용해야 하는 특별한 요구 사항이 없는 경우.

```typescript
"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/dashboard")}>
      대시보드
    </button>
  );
}
```

<div class="content-ad"></div>

## useRouter()

- router.push(href: string, { scroll: boolean }): 제공된 경로로 클라이언트 측 탐색을 수행합니다. 브라우저의 히스토리 스택에 새 항목을 추가합니다.
- router.replace(href: string, { scroll: boolean }): 새 항목을 브라우저의 히스토리 스택에 추가하지 않고 제공된 경로로 클라이언트 측 탐색을 수행합니다.
- router.refresh(): 현재 경로를 새로고침합니다. 서버에 새 요청을 보내고 데이터 요청을 다시 가져와 서버 컴포넌트를 다시 렌더링합니다. 클라이언트는 업데이트된 리액트 서버 컴포넌트 데이터를 병합하고 영향을 받지 않는 클라이언트 측 리액트(e.g. useState) 또는 브라우저 상태(e.g. 스크롤 위치)를 잃지 않습니다.
- router.prefetch(href: string): 클라이언트 측 전환을 더 빠르게하기 위해 제공된 경로를 사전로드합니다.
- router.back(): 브라우저의 히스토리 스택에서 이전 경로로 이동합니다.
- router.forward(): 브라우저의 히스토리 스택에서 다음 페이지로 이동합니다.

> 알아두면 좋은 점:
> `Link` 컴포넌트는 화면에 나타나는 대로 경로 사전로드를 자동으로 처리합니다.  
> refresh()는 fetch 요청이 캐시되어 있는 경우 동일한 결과를 재생성할 수 있습니다. 쿠키 및 헤더와 같은 다른 동적 기능도 응답을 변경할 수 있습니다.

### next/router에서 마이그레이션하기

<div class="content-ad"></div>

- App Router를 사용할 때 useRouter 훅은 next/navigation에서 가져와야 하며 next/router가 아니어야 합니다.
- pathname 문자열은 제거되었고 usePathname()으로 대체되었습니다.
- query 객체는 제거되었고 useSearchParams()로 대체되었습니다.
- router.events가 대체되었습니다. 아래를 참조하세요.

전체 이주 안내서를 확인해주세요.

## 예시

### 라우터 이벤트

<div class="content-ad"></div>

페이지 변경을 감지하려면 usePathname 및 useSearchParams와 같은 다른 클라이언트 컴포넌트 훅을 조합할 수 있습니다.

```js
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log(url);
    // 현재 URL을 사용할 수 있습니다
    // ...
  }, [pathname, searchParams]);

  return null;
}
```

이를 레이아웃에 가져다 사용할 수 있습니다.

```js
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

<div class="content-ad"></div>

> 좋은 정보: `NavigationEvents`은 `useSearchParams()`으로 인해 정적 렌더링 중 가장 가까운 Suspense boundary까지 클라이언트 사이드 렌더링됩니다. 더 알아보기.

### 스크롤 복원 비활성화

기본적으로 Next.js는 새 경로로 이동할 때 페이지 맨 위로 스크롤됩니다. 이 동작을 비활성화하려면 router.push() 또는 router.replace()에 scroll: false를 전달하면 됩니다.

```typescript
"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/dashboard", { scroll: false })}>
      Dashboard
    </button>
  );
}
```

<div class="content-ad"></div>

## 버전 히스토리

| Version   | Changes                                 |
| --------- | --------------------------------------- |
| `v13.0.0` | `next/navigation`에서 `useRouter` 도입. |

<div class="content-ad"></div>
