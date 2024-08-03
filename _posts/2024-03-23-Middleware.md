---
title: "Nextjs 13 프로젝트에서 middleware 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "미들웨어"
link: "undefined"
---



# 미들웨어

미들웨어를 사용하면 요청이 완료되기 전에 코드를 실행할 수 있습니다. 그런 다음 들어오는 요청에 따라 응답을 수정하여 다시 쓰기, 리디렉팅, 요청 또는 응답 헤더 수정 또는 직접 응답하는 등의 작업을 수행할 수 있습니다.

미들웨어는 캐시된 콘텐츠 및 라우트가 일치하기 전에 실행됩니다. 자세한 내용은 일치하는 경로를 참조하세요.

## 규칙

<div class="content-ad"></div>

프로젝트 루트의 파일 미들웨어.ts(또는 .js)를 사용하여 미들웨어를 정의하세요. 예를 들어, 페이지 또는 앱과 동일한 수준에 있거나 해당하는 경우 src 내부에 있어야 합니다.

## 예시

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// `await`을 사용한다면 이 함수는 `async`로 표시할 수 있습니다
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/home", request.url));
}

// 더 알아보려면 아래의 "경로 일치"를 확인하세요
export const config = {
  matcher: "/about/:path*",
};
```

## 경로 일치

<div class="content-ad"></div>

프로젝트의 모든 경로에 대해 미들웨어가 호출됩니다. 아래는 실행 순서입니다:

- next.config.js에서의 헤더
- next.config.js에서의 리다이렉트
- 미들웨어 (리라이트, 리다이렉트 등)
- next.config.js에서의 beforeFiles (리라이트)
- 파일 시스템 경로(public/, \_next/static/, pages/, app/ 등)
- next.config.js에서의 afterFiles (리라이트)
- 동적 라우트 (/blog/[slug])
- next.config.js에서의 팔백 (리라이트)

모든 미들웨어가 실행될 경로를 정의하는 두 가지 방법이 있습니다:

- 사용자 정의 일치기준 구성
- 조건문

<div class="content-ad"></div>

### Matcher

matcher를 사용하면 특정 경로에서 실행할 미들웨어를 필터링할 수 있습니다.

```js
export const config = {
  matcher: "/about/:path*",
};
```

단일 경로 또는 배열 구문을 사용하여 여러 경로를 일치시킬 수 있습니다:

<div class="content-ad"></div>

```js
export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*"],
};
```

matcher 구성은 전체 정규식을 허용하여 부정적 전방탐색이나 문자 매칭과 같은 일치를 지원합니다. 특정 경로를 제외한 모든 것들을 매칭하려면 부정적 전방탐색의 예시가 여기에 있습니다:

```js
export const config = {
  matcher: [
    /*
     * api (API 경로)
     * _next/static (정적 파일)
     * _next/image (이미지 최적화 파일)
     * favicon.ico (파비콘 파일)
     * 시작하는 경로를 제외한 모든 요청 경로 일치
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

또한 누락 또는 포함 배열 또는 두 가지의 조합을 사용하여 특정 요청에 대해 Middleware를 우회할 수도 있습니다:

<div class="content-ad"></div>

```js
export const config = {
  matcher: [
    /*
     * - api (API 경로)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};
```

> 참고: matcher 값은 상수이어야 하므로 빌드 시 정적으로 분석될 수 있습니다. 변수와 같은 동적 값은 무시됩니다.

구성된 matchers:

- 반드시 /로 시작해야 합니다.
- Named parameters를 포함할 수 있습니다: /about/:path는 /about/a 및 /about/b와 일치하지만 /about/a/c와 일치하지 않습니다.
- Named parameters에 수정자를 추가할 수 있습니다 (:로 시작): /about/:path*는 *가 0개 이상이므로 /about/a/b/c와 일치합니다. ?는 0 또는 1이고 +는 1 이상입니다.
- 괄호로 묶인 정규 표현식을 사용할 수 있습니다: /about/(.*)는 /about/:path*와 동일합니다.

<div class="content-ad"></div>

path-to-regexp에 대한 자세한 내용을 확인하려면 문서를 읽어보세요.

> 알아두면 좋은 사실: 역호환성을 위해 Next.js는 항상 /public을 /public/index로 간주합니다. 따라서 /public/:path의 일치 항목은 일치합니다.

### 조건문

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.rewrite(new URL("/about-2", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  }
}
```

<div class="content-ad"></div>

## NextResponse

NextResponse API를 통해 다음을 수행할 수 있습니다:

- 수신된 요청을 다른 URL로 리디렉션
- 특정 URL을 표시하여 응답을 다시 작성
- API 라우트, getServerSideProps 및 다시 작성 대상에 대한 요청 헤더 설정
- 응답 쿠키 설정
- 응답 헤더 설정

Middleware에서 응답을 생성하려면:

<div class="content-ad"></div>

- 응담을 생성하는 라우트 (페이지 또는 Edge API 라우트)로 재작성하십시오
- 직접적으로 NextResponse를 반환하십시오. 응담 생성을 참조하십시오.

## 쿠키 사용

쿠키는 일반적인 헤더입니다. 요청에서는 Cookie 헤더에 저장되고 응답에서는 Set-Cookie 헤더에 저장됩니다. Next.js는 NextRequest와 NextResponse의 cookies 확장을 통해 이러한 쿠키에 쉽게 접근하고 조작할 수 있는 편리한 방법을 제공합니다.

- 들어오는 요청의 경우, cookies는 다음 메소드들을 포함하고 있습니다: get, getAll, set, delete 쿠키. cookie의 존재 여부를 확인하거나 모든 쿠키를 제거할 수 있습니다.
- 나가는 응답의 경우, cookies는 다음 메소드들을 포함하고 있습니다: get, getAll, set, delete.

<div class="content-ad"></div>

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 들어오는 요청에서 "Cookie: nextjs=빠른" 헤더가 있다고 가정합니다.
  // RequestCookies API를 사용하여 요청에서 쿠키 가져오기
  let cookie = request.cookies.get("nextjs");
  console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll();
  console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

  request.cookies.has("nextjs"); // => true
  request.cookies.delete("nextjs");
  request.cookies.has("nextjs"); // => false

  // ResponseCookies API를 사용하여 응답에 쿠키 설정
  const response = NextResponse.next();
  response.cookies.set("vercel", "fast");
  response.cookies.set({
    name: "vercel",
    value: "fast",
    path: "/",
  });
  cookie = response.cookies.get("vercel");
  console.log(cookie); // => { name: 'vercel', value: 'fast', Path: '/' }
  // 발신 응답에는 `Set-Cookie: vercel=빠른; path=/` 헤더가 포함됩니다.

  return response;
}
```

## 설정한 헤더

NextResponse API를 사용하여 요청 및 응답 헤더를 설정할 수 있습니다 (요청 헤더 설정은 Next.js v13.0.0부터 가능합니다).

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 요청 헤더를 복제하고 새로운 헤더 `x-hello-from-middleware1`를 설정합니다.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-hello-from-middleware1", "hello");

  // NextResponse.rewrite에서도 요청 헤더를 설정할 수 있습니다.
  const response = NextResponse.next({
    request: {
      // 새로운 요청 헤더
      headers: requestHeaders,
    },
  });

  // 새로운 응답 헤더 `x-hello-from-middleware2`를 설정합니다.
  response.headers.set("x-hello-from-middleware2", "hello");
  return response;
}
```

<div class="content-ad"></div>

> 좋은 정보: 큰 헤더를 설정하지 않는 것이 좋습니다. 백엔드 웹 서버 구성에 따라 431 Request Header Fields Too Large 오류가 발생할 수 있습니다.

### CORS

크로스 오리진 요청을 허용하기 위해 미들웨어에서 CORS 헤더를 설정할 수 있습니다. 이는 간단한 요청과 사전검사된 요청을 모두 포함합니다.

```typescript
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["https://acme.com", "https://my-app.org"];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function middleware(request: NextRequest) {
  // 요청에서 원본 확인
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // 사전검사된 요청 처리
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // 간단한 요청 처리
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
```

<div class="content-ad"></div>

## 응답 생성

Next.js v13.1.0부터 Middleware에서 직접 Response 또는 NextResponse 인스턴스를 반환하여 응답할 수 있습니다.

```typescript
import { NextRequest } from "next/server";
import { isAuthenticated } from "@lib/auth";

// 경로가 `/api/`로 시작되는 경우에만 미들웨어 적용
export const config = {
  matcher: "/api/:function*",
};

export function middleware(request: NextRequest) {
  // 요청을 확인하기 위해 인증 함수 호출
  if (!isAuthenticated(request)) {
    // 오류 메시지를 나타내는 JSON으로 응답
    return Response.json({ success: false, message: "인증에 실패했습니다" }, { status: 401 });
  }
}
```

### waitUntil과 NextFetchEvent

<div class="content-ad"></div>

The NextFetchEvent 객체는 기본 FetchEvent 객체를 확장하며 waitUntil() 메소드를 포함합니다.

waitUntil() 메소드는 프로미스를 인자로 받고, 프로미스가 settle될 때까지 Middleware의 수명을 연장합니다. 이는 백그라운드에서 작업을 수행하는 데 유용합니다.

```js
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export function middleware(req: NextRequest, event: NextFetchEvent) {
  event.waitUntil(
    fetch("https://my-analytics-platform.com", {
      method: "POST",
      body: JSON.stringify({ pathname: req.nextUrl.pathname }),
    })
  );

  return NextResponse.next();
}
```

## 고급 Middleware 플래그

<div class="content-ad"></div>

Next.js v13.1에서 미들웨어를 위한 두 가지 추가 플래그인이 소개되었습니다. skipMiddlewareUrlNormalize와 skipTrailingSlashRedirect은 고급 사용 사례를 처리하기 위해 도입되었습니다.

skipTrailingSlashRedirect는 추가되거나 제거되는 슬래시를 위한 Next.js 리디렉션을 비활성화합니다. 이를 통해 미들웨어 내에서 일부 경로에 대한 슬래시 유지를 유지할 수 있으며 다른 경로에 대해서는 그렇지 않도록 할 수 있어, 점진적인 이전이 보다 쉬워집니다.

```js
module.exports = {
  skipTrailingSlashRedirect: true,
};
```

```js
const legacyPrefixes = ["/docs", "/blog"];

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // 슬래시 처리 적용
  if (!pathname.endsWith("/") && !pathname.match(/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/)) {
    req.nextUrl.pathname += "/";
    return NextResponse.redirect(req.nextUrl);
  }
}
```

<div class="content-ad"></div>

skipMiddlewareUrlNormalize은 Next.js에서 URL 정규화를 비활성화하여 직접 방문과 클라이언트 전환을 동일하게 처리할 수 있게 합니다. 일부 고급 경우에는 이 옵션을 사용하여 원래 URL을 사용하여 완전한 제어를 제공할 수 있습니다.

```js
module.exports = {
  skipMiddlewareUrlNormalize: true,
};
```

```js
export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // GET /_next/data/build-id/hello.json

  console.log(pathname);
  // 이제 이 플래그와 함께 /_next/data/build-id/hello.json으로 표시됩니다.
  // 이 플래그 없이는 정규화되어 /hello로 표시됩니다.
}
```

## Runtime

<div class="content-ad"></div>

현재 Middleware는 Edge 런타임만 지원합니다. Node.js 런타임은 사용할 수 없습니다.

## 버전 기록

| 버전      | 변경 내역                                                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `v13.1.0` | 고급 Middleware 플래그 추가                                                                                                             |
| `v13.0.0` | Middleware가 요청 헤더, 응답 헤더 수정 및 응답 전송 가능                                                                                |
| `v12.2.0` | Middleware가 안정화되었습니다, 업그레이드 안내서를 확인해주세요.                                                                        |
| `v12.0.9` | Edge 런타임에서 절대 URL 적용 (<a href="https://github.com/vercel/next.js/pull/33410" rel="noopener noreferrer" target="_blank">PR</a>) |
| `v12.0.0` | Middleware (베타) 추가됨                                                                                                                |

<div class="content-ad"></div>
