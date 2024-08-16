---
title: "Nextjs 14 클라이언트 컴포넌트에서 현재 url 가져오는 방법usePathname"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---





# Nextjs 14 클라이언트 컴포넌트에서 현재 url 가져오는 방법(usePathname)

usePathname은 현재 URL의 경로 이름을 읽을 수 있는 Client Component 훅입니다.

```typescript
"use client";

import { usePathname } from "next/navigation";

export default function ExampleClientComponent() {
  const pathname = usePathname();
  return <p>Current pathname: {pathname}</p>;
}
```

usePathname은 의도적으로 Client Component를 사용해야 합니다. Client Components은 최적화가 아닌 Server Components 아키텍처의 중요한 부분입니다.

<div class="content-ad"></div>

예를 들어, usePathname을 사용하는 클라이언트 컴포넌트는 초기 페이지로드 시 HTML로 렌더링됩니다. 새 경로로 이동할 때 이 컴포넌트는 다시 가져올 필요가 없습니다. 대신에, 컴포넌트는 한 번 다운로드되고(current state에 기반하여) 다시 렌더링 됩니다.

> 알아두면 좋은 점:
> 서버 컴포넌트에서 현재 URL을 읽는 것은 지원되지 않습니다. 이 설계는 페이지 이동간 레이아웃 상태가 유지되도록 지원하기 위한 것입니다.
> 호환성 모드:
> usePathname은 Next.js에서 자동으로 정적으로 최적화된 페이지 또는 라우터가 준비되지 않은 경우 대체 경로가 렌더링 될 때 null을 반환할 수 있습니다.
> Next.js는 프로젝트에서 앱과 페이지 디렉토리 모두를 인식하면 자동으로 유형을 업데이트합니다.

## 매개변수

```js
const pathname = usePathname();
```

<div class="content-ad"></div>

usePathname은 어떤 매개변수도 받지 않습니다.

## 반환값

usePathname은 현재 URL의 경로 이름을 나타내는 문자열을 반환합니다. 예를 들어:

| URL                 | 반환 값               |
| ------------------- | --------------------- |
| `/`                 | `'/'`                 |
| `/dashboard`        | `'/dashboard'`        |
| `/dashboard?v=2`    | `'/dashboard'`        |
| `/blog/hello-world` | `'/blog/hello-world'` |

<div class="content-ad"></div>

## 예시

### 경로 변경에 대한 응답으로 작업 수행하기

```typescript
"use client";

import { usePathname, useSearchParams } from "next/navigation";

function ExampleClientComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    // 여기서 작업을 수행하세요...
  }, [pathname, searchParams]);
}
```

| 버전      | 변경 내용               |
| --------- | ----------------------- |
| `v13.0.0` | `usePathname`이 추가됨. |

<div class="content-ad"></div>
