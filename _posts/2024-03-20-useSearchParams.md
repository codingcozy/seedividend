---
title: "Nextjs 14에서 현재 URL의 query를 가져오는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs 14에서 현재 URL의 query를 가져오는 방법

useSearchParams은 현재 URL의 쿼리 문자열을 읽을 수 있게 해주는 Client Component 훅입니다.

useSearchParams은 URLSearchParams 인터페이스의 읽기 전용 버전을 반환합니다.

```typescript
"use client";

import { useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: {search}</>;
}
```

<div class="content-ad"></div>

## 매개변수

```js
const searchParams = useSearchParams();
```

useSearchParams 함수는 어떤 매개변수도 필요로하지 않습니다.

## 반환값

<div class="content-ad"></div>

useSearchParams은 URLSearchParams 인터페이스의 읽기 전용 버전을 반환합니다. 이 인터페이스에는 URL의 쿼리 문자열을 읽는 유틸리티 메소드가 포함되어 있습니다:

- URLSearchParams.get()
  : 검색 파라미터와 연관된 첫 번째 값이 반환됩니다. 예를 들어:
  URL searchParams.get("a")
  /dashboard?a=1 `1`
  /dashboard?a= ``/dashboard?b=3 null
/dashboard?a=1&a=2`1` - 모든 값은 getAll()을 사용하여 얻을 수 있습니다.
- URLSearchParams.has()
  : 주어진 파라미터가 존재하는지를 나타내는 부울 값을 반환합니다. 예를 들어:
  URL searchParams.has("a")
  /dashboard?a=1 true
  /dashboard?b=3 false
- URLSearchParams의 다른 읽기 전용 메소드인 getAll(), keys(), values(), entries(), forEach(), toString() 등에 대해 더 알아보세요.

> 알아두면 좋은 사실:
> useSearchParams는 클라이언트 컴포넌트 후크이며 서버 컴포넌트에서는 지원되지 않습니다. 부분 렌더링 중에 오래된 값이 발생하는 것을 방지하기 위함입니다.
> 응용 프로그램에 /pages 디렉토리가 포함된 경우, useSearchParams는 ReadonlyURLSearchParams | null을 반환합니다. null 값은 getServerSideProps를 사용하지 않는 페이지의 사전 렌더링 중에 검색 매개 변수를 알 수 없기 때문에 마이그레이션 중 호환성을 위해 사용됩니다.

### 정적 렌더링

<div class="content-ad"></div>

만약 경로가 정적으로 렌더링되면, useSearchParams를 호출하면 클라이언트 구성 요소 트리가 가장 가까운 Suspense 경계까지 클라이언트 측에서 렌더링됩니다.

이는 경로의 일부가 정적으로 렌더링되는 동안 useSearchParams를 사용하는 동적 부분이 클라이언트 측에서 렌더링되도록합니다.

useSearchParams를 사용하는 Client Component를 `Suspense/` 경계로 감싸는 것을 권장합니다. 이렇게하면 그 위에있는 Client Components가 정적으로 렌더링되어 초기 HTML의 일부로 전송됩니다. 예를 들어.

예시:

<div class="content-ad"></div>

```typescript
"use client";

import { useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  // 정적 렌더링을 사용할 때 서버에 로깅되지 않습니다.
  console.log(search);

  return <>검색: {search}</>;
}
```

```typescript
import { Suspense } from "react";
import SearchBar from "./search-bar";

// Suspense 경계로 전달된 이 컴포넌트는 초기 HTML에서 검색 바 자리에 렌더링됩니다.
// React hydration 시 값이 사용 가능한 경우, fallback은 `<SearchBar>` 컴포넌트로 대체됩니다.
function SearchBarFallback() {
  return <>플레이스홀더</>;
}

export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </nav>
      <h1>대시보드</h1>
    </>
  );
}
```

## 동작

### 동적 렌더링

<div class="content-ad"></div>

경로가 동적으로 렌더링되는 경우, 클라이언트 컴포넌트의 초기 서버 렌더링 중에 useSearchParams가 사용 가능합니다.

예시:

```typescript
"use client";

import { useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  // 이 내용은 서버의 초기 렌더링 중에 로그로 남겨집니다.
  // 그리고 이후의 탐색 중에 클라이언트에서도 로그로 남습니다.
  console.log(search);

  return <>Search: {search}</>;
}
```

```typescript
import SearchBar from "./search-bar";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <nav>
        <SearchBar />
      </nav>
      <h1>대시보드</h1>
    </>
  );
}
```

<div class="content-ad"></div>

> 유용한 정보: 동적 라우트 세그먼트 설정 옵션을 'force-dynamic'으로 설정하면 동적 렌더링을 강제로 사용할 수 있습니다.

### 서버 구성 요소

#### 페이지

서버 구성 요소 (Server Components)에서 검색 매개변수에 액세스하려면 searchParams 속성을 사용하세요.

<div class="content-ad"></div>

#### 레이아웃

페이지와 달리 레이아웃(서버 컴포넌트)은 searchParams 속성을 받지 않습니다. 이는 공유 레이아웃이 탐색 중에 다시 렌더링되지 않기 때문에 탐색 사이에 오래된 searchParams가 발생할 수 있기 때문입니다. 자세한 설명 보기.

대신에 클라이언트 컴포넌트에서 Page searchParams 속성이나 useSearchParams 훅을 사용하세요. 그것은 최신 searchParams와 함께 클라이언트에서 다시 렌더링됩니다.

## 예제

<div class="content-ad"></div>

## searchParams 업데이트하기

새로운 searchParams를 설정하기 위해 useRouter 또는 Link를 사용할 수 있습니다. 네비게이션이 실행된 후에는 현재 page.js가 업데이트된 searchParams 속성을 받게 될 것입니다.

```typescript
export default function ExampleClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 제공된 키/값 쌍과 현재 searchParams를 병합하여 새로운 searchParams 문자열을 가져옵니다
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <>
      <p>정렬 방식</p>

      {/* useRouter 사용 */}
      <button
        onClick={() => {
          // <pathname>?sort=asc
          router.push(pathname + '?' + createQueryString('sort', 'asc'))
        }
      >
        오름차순
      </button>

      {/* <Link> 사용 */}
      <Link
        href={
          // <pathname>?sort=desc
          pathname + '?' + createQueryString('sort', 'desc')
        }
      >
        내림차순
      </Link>
    </>
  )
}
```

## 버전 이력

<div class="content-ad"></div>

Version Changes
v13.0.0 useSearchParams introduced.

<div class="content-ad"></div>
