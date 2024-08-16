---
title: "Nextjs에서 서버, 클라이언트 컴포넌트 redirect 처리하는 방법"
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





# Nextjs에서 서버, 클라이언트 컴포넌트 redirect 처리하는 방법

이 문서에서는 Nextjs 에서 서버 컴포넌트와 클라이언트 컴포넌트에서 Redirect를 하는 방법에 대해서 정리했습니다.

# 리다이렉팅

Next.js에서 리다이렉트를 처리하는 몇 가지 방법이 있습니다. 이 페이지에서는 각 옵션과 사용 사례, 그리고 대규모 리다이렉트 관리 방법을 살펴보겠습니다.

| API                         | Purpose                                           | Where                                             | Status Code                            |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------- | -------------------------------------- |
| redirect                    | Redirect user after a mutation or event           | Server Components, Server Actions, Route Handlers | 307 (Temporary) or 303 (Server Action) |
| permanentRedirect           | Redirect user after a mutation or event           | Server Components, Server Actions, Route Handlers | 308 (Permanent)                        |
| useRouter                   | Perform a client-side navigation                  | Event Handlers in Client Components               | N/A                                    |
| redirects in next.config.js | Redirect an incoming request based on a path      | next.config.js file                               | 307 (Temporary) or 308 (Permanent)     |
| NextResponse.redirect       | Redirect an incoming request based on a condition | Middleware                                        | Any                                    |

<div class="content-ad"></div>

## redirect 함수

redirect 함수를 사용하면 사용자를 다른 URL로 리다이렉트할 수 있습니다. redirect를 Server Components, Route Handlers 및 Server Actions에서 호출할 수 있습니다.

redirect는 mutation, 이벤트 이후에 자주 사용됩니다. 예를 들어, 게시물 생성 후:

```typescript
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPost(id: string) {
  try {
    // 데이터베이스 호출
  } catch (error) {
    // 오류 처리
  }

  revalidatePath("/posts"); // 캐시된 게시물 업데이트
  redirect(`/post/${id}`); // 새 게시물 페이지로 이동
}
```


- redirect는 기본적으로 307 (임시 리다이렉트) 상태 코드를 반환합니다. Server Action에서 사용할 때는 일반적으로 POST 요청 결과로 성공 페이지로 리다이렉트할 때 사용되는 303 (다른 곳 보기) 상태 코드를 반환합니다.
- redirect는 내부적으로 오류를 throw하므로 try/catch 블록 외부에서 호출해야 합니다.
- redirect는 렌더링 프로세스 중에 Client Components에서 호출할 수 있지만 이벤트 핸들러에서는 호출할 수 없습니다. 이 경우 useRouter 훅을 사용할 수 있습니다.
- redirect는 절대 URL도 허용하며 외부 링크로 리다이렉트하는 데 사용할 수 있습니다.
- 렌더링 프로세스 전에 리다이렉트를 하려면 next.config.js 또는 Middleware를 사용하세요.

  더 많은 정보는 redirect API 참조를 참고하세요.

## permanentRedirect 함수

permanentRedirect 함수를 사용하면 사용자를 영구적으로 다른 URL로 리다이렉트할 수 있습니다. permanentRedirect를 Server Components, Route Handlers 및 Server Actions에서 호출할 수 있습니다.

permanentRedirect는 엔터티의 근본적인 URL을 변경하는 mutation, 이벤트 후에 자주 사용됩니다. 예를 들어, 사용자 이름을 변경한 후에 사용자의 프로필 URL을 업데이트하는 경우:

```typescript
"use server";

import { permanentRedirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function updateUsername(username: string, formData: FormData) {
  try {
    // 데이터베이스 호출
  } catch (error) {
    // 오류 처리
  }

  revalidateTag("username"); // 사용자 이름에 대한 모든 참조 업데이트
  permanentRedirect(`/profile/${username}`); // 새 사용자 프로필로 이동
}
```


- permanentRedirect는 기본적으로 308 (영구적 리다이렉트) 상태 코드를 반환합니다.
- permanentRedirect는 절대 URL도 허용하며 외부 링크로 리다이렉트하는 데 사용할 수 있습니다.
- 렌더링 프로세스 전에 리다이렉트를 하려면 next.config.js 또는 Middleware를 사용하세요.

더 많은 정보는 permanentRedirect API 참조를 참고하세요.

<div class="content-ad"></div>

## useRouter() 훅

Client Components의 이벤트 핸들러 내에서 리다이렉트해야 하는 경우 useRouter 훅의 push 메서드를 사용할 수 있습니다. 예를 들어:

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



- 사용자를 프로그래밍 방식으로 이동시키지 않아도 된다면 `<Link>` 컴포넌트를 사용해야 합니다.

더 많은 정보는 useRouter API 참조를 참고하세요.

## next.config.js의 리다이렉트

next.config.js 파일의 redirects 옵션을 사용하면 들어오는 요청 경로를 다른 대상 경로로 리다이렉트할 수 있습니다. 이것은 페이지의 URL 구조를 변경하거나 알려진 리다이렉트 목록이 있는 경우 유용합니다.

redirects는 경로, 헤더, 쿠키 및 쿼리 매칭을 지원하여 들어오는 요청을 기반으로 사용자를 리다이렉트할 수 있도록 합니다.

리다이렉트를 사용하려면 next.config.js 파일에 옵션을 추가하세요:

```js
module.exports = {
  async redirects() {
    return [
      // 기본 리다이렉트
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      // 와일드카드 경로 매칭
      {
        source: "/blog/:slug",
        destination: "/news/:slug",
        permanent: true,
      },
    ];
  },
};
```

더 많은 정보는 redirects API 참조를 참고하세요.


- redirects는 permanent 옵션을 사용하여 307 (임시 리다이렉트) 또는 308 (영구적 리다이렉트) 상태 코드를 반환할 수 있습니다.
- 플랫폼에 따라 redirects에 제한이 있을 수 있습니다. 예를 들어 Vercel에서는 1,024개의 리다이렉트 제한이 있습니다. 대규모 리다이렉트(1000개 이상)를 관리하려면 Middleware를 사용하여 사용자 지정 솔루션을 만드는 것이 좋습니다.

## 미들웨어의 NextResponse.redirect

미들웨어를 사용하면 요청이 완료되기 전에 코드를 실행한 다음 NextResponse.redirect를 사용하여 다른 URL로 리다이렉트할 수 있습니다. 이는 조건(예: 인증, 세션 관리 등)에 따라 사용자를 리다이렉트하거나 대규모 리다이렉트를 가지고 있는 경우 유용합니다.

예를 들어, 사용자가 인증되지 않은 경우 /login 페이지로 리다이렉트하려면 다음과 같이 할 수 있습니다:

<div class="content-ad"></div>

```typescript
import { NextResponse, NextRequest } from "next/server";
import { authenticate } from "auth-provider";

export function middleware(request: NextRequest) {
  const isAuthenticated = authenticate(request);

  // 사용자가 인증된 경우 계속 진행
  if (isAuthenticated) {
    return NextResponse.next();
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: "/dashboard/:path*",
};
```



- 미들웨어는 next.config.js의 리다이렉트 이후에 실행되고 렌더링 전에 실행됩니다.

  더 많은 정보는 미들웨어 문서를 참고하세요.

## 대규모 리다이렉트 관리 (고급)

대규모 리다이렉트(1000개 이상)를 관리하려면 미들웨어를 사용하여 사용자 지정 솔루션을 만들 수 있습니다. 이를 통해 응용 프로그램을 다시 배포하지 않고도 프로그래밍 방식으로 리다이렉트를 처리할 수 있습니다.

이를 위해 고려해야 할 사항은 다음과 같습니다:

- 리다이렉트 맵 생성 및 저장.
- 데이터 조회 성능 최적화.

> Next.js 예제: 아래 추천 사항의 구현 예제는 블룸 필터를 사용한 미들웨어를 포함합니다.

### 1. 리다이렉트 맵 생성 및 저장

리다이렉트 맵은 데이터베이스(일반적으로 키-값 저장소) 또는 JSON 파일에 저장할 수 있는 리다이렉트 목록입니다.

다음과 같은 데이터 구조를 고려해보세요:

```js
{
  "/old": {
    "destination": "/new",
    "permanent": true
  },
  "/blog/post-old": {
    "destination": "/blog/post-new",
    "permanent": true
  }
}
```

미들웨어에서는 Vercel의 Edge Config나 Redis와 같은 데이터베이스에서 읽어 들여 들어오는 요청을 기반으로 사용자를 리다이렉트할 수 있습니다:

```typescript
import { NextResponse, NextRequest } from "next/server";
import { get } from "@vercel/edge-config";

type RedirectEntry = {
  destination: string;
  permanent: boolean;
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const redirectData = await get(pathname);

  if (redirectData && typeof redirectData === "string") {
    const redirectEntry: RedirectEntry = JSON.parse(redirectData);
    const statusCode = redirectEntry.permanent ? 308 : 307;
    return NextResponse.redirect(redirectEntry.destination, statusCode);
  }

  // 리다이렉트를 찾을 수 없으면 리다이렉트하지 않고 계속 진행
  return NextResponse.next();
}
```

<div class="content-ad"></div>

### 2. 데이터 조회 성능 최적화

들어오는 모든 요청에 대한 대규모 데이터 세트를 읽는 것은 느리고 비용이 많이 들 수 있습니다. 데이터 조회 성능을 최적화하는 두 가지 방법이 있습니다:

- Vercel Edge Config나 Redis와 같은 빠른 읽기에 최적화된 데이터베이스 사용.
- 효율적인 데이터 조회 전략 사용, 예를 들어 블룸 필터를 사용하여 대규모 리다이렉트 파일이나 데이터베이스를 읽기 전에 요청이 있는지 효율적으로 확인합니다.

이전 예제를 고려하면 Middleware에서 생성된 블룸 필터 파일을 가져와서 들어오는 요청 경로가 블룸 필터에 있는지 확인할 수 있습니다.

이 경우 해당 경로를 확인하고 적절한 URL로 사용자를 리다이렉트하기 위해 Route Handler로 요청을 전달합니다. 이렇게 하면 모든 들어오는 요청에 대해 대규모 리다이렉트 파일을 미들웨어에 가져오는 것을 피할 수 있어요.

```typescript
import { NextResponse, NextRequest } from "next/server";
import { ScalableBloomFilter } from "bloom-filters";
import GeneratedBloomFilter from "./redirects/bloom-filter.json";

type RedirectEntry = {
  destination: string;
  permanent: boolean;
};

// 생성된 JSON 파일에서 블룸 필터 초기화
const bloomFilter = ScalableBloomFilter.fromJSON(GeneratedBloomFilter as any);

export async function middleware(request: NextRequest) {
  // 들어오는 요청의 경로 가져오기
  const pathname = request.nextUrl.pathname;

  // 경로가 블룸 필터에 있는지 확인
  if (bloomFilter.has(pathname)) {
    // 경로를 Route Handler로 전달
    const api = new URL(
      `/api/redirects?pathname=${encodeURIComponent(request.nextUrl.pathname)}`,
      request.nextUrl.origin
    );

    try {
      // Route Handler에서 리다이렉트 데이터 가져오기
      const redirectData = await fetch(api);

      if (redirectData.ok) {
        const redirectEntry: RedirectEntry | undefined =
          await redirectData.json();

        if (redirectEntry) {
          // 상태 코드 결정

          const statusCode = redirectEntry.permanent ? 308 : 307;

          // 대상으로 리다이렉트
          return NextResponse.redirect(redirectEntry.destination, statusCode);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 리다이렉트를 찾을 수 없으면 리다이렉트하지 않고 계속 진행
  return NextResponse.next();
}
```

그런 다음 Route Handler에서:

```typescript
import { NextRequest, NextResponse } from "next/server";
import redirects from "@/app/redirects/redirects.json";

type RedirectEntry = {
  destination: string;
  permanent: boolean;
};

export function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");
  if (!pathname) {
    return new Response("잘못된 요청", { status: 400 });
  }

  // redirects.json 파일에서 리다이렉트 엔트리 가져오기
  const redirect = (redirects as Record<string, RedirectEntry>)[pathname];

  // 블룸 필터 false positive 고려
  if (!redirect) {
    return new Response("리다이렉트 없음", { status: 400 });
  }

  // 리다이렉트 엔트리 반환
  return NextResponse.json(redirect);
}
```

- 블룸 필터를 생성하려면 bloom-filters와 같은 라이브러리를 사용할 수 있습니다.
- 악의적인 요청을 방지하기 위해 Route Handler로의 요청을 유효성 검사해야 합니다.
