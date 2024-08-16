---
title: "Nextjs에서의 미들웨어 사용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Middleware in Nextjs A Comprehensive Guide"
link: "https://medium.com/@zachshallbetter/middleware-in-next-js-a-comprehensive-guide-7dd0a928541a"
isUpdated: true
---





Next.js의 미들웨어는 개발자가 응용 프로그램의 요청과 응답 흐름을 가로채거나 수정하거나 제어할 수 있는 강력한 도구입니다. 서버 렌더링 웹사이트나 완전한 웹 애플리케이션을 개발하고 있다면, 미들웨어를 효과적으로 활용하는 방법을 이해하는 것이 프로젝트 내 데이터 흐름을 크게 향상시킬 수 있습니다. 이 안내서는 Next.js에서 미들웨어를 기본부터 고급 기술까지 탐색할 것입니다.

# 목차

- 미들웨어 이해하기
- 미들웨어 시작하기
- Next.js에서 미들웨어
- 고급 미들웨어 기술
- 미들웨어 업그레이드 안내

# 1. 미들웨어 이해하기

<div class="content-ad"></div>

## Middleware란 무엇인가요?

웹 사이트나 애플리케이션을 개발할 때, Middleware는 이해할 가치 있는 개념입니다. 간단히 말해서, Middleware는 요청-응답 주기의 다양한 측면을 가로채고 조작하는 메커니즘을 제공합니다. 이 메커니즘에는 들어오는 요청을 조작하거나 나가는 응답을 조작하고 애플리케이션의 요구에 맞게 맞추기 위한 작업이 포함됩니다.

Next.js에 적용된 Middleware를 통해 사용자는 추가 단계 없이 웹 애플리케이션의 동작을 상세하게 조정하고 제어할 수 있습니다.

이제 우리는 핵심 개념을 이해했으니, 언급한 사용 사례를 탐색해 보겠습니다. Next.js 13와 자바스크립트를 모두 사용할 예정입니다.

<div class="content-ad"></div>

## 라우팅:

라우팅 제어를 통해 요청을 다른 URL로 리디렉트하거나 URL 패턴을 다루거나 강제할 수 있습니다. 애플리케이션 내에서 복잡한 라우팅 시나리오를 관리할 때 특히 유용합니다.

```js
// Next.js
// 이전 URL에서 새 URL로 요청을 리디렉트합니다
export function redirectMiddleware(request: NextRequest) {
  return NextResponse.redirect("/new-url");
}
```

```js
// 자바스크립트
function redirectMiddleware(request) {
  // 새 URL로 리디렉트합니다
  window.location.href = "/new-url";
  // 리디렉션 후에는 이 코드가 실행되지 않기 때문에 빈 응답을 반환합니다
  return {
    status: 204, // 내용 없음
    body: "",
  };
}
```

<div class="content-ad"></div>

## 쿠키 관리:

미들웨어는 수신 요청과 송신 응답 모두에서 쿠키를 관리할 수 있습니다. 이는 사용자 세션 쿠키 설정, 인증용 쿠키 읽기, 또는 사용자가 로그아웃할 때 쿠키 삭제와 같은 작업에 필수적입니다.

```js
Tyexport function cookieManagementMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  response.cookies.set('myCookie', '123');
  return response;
}
```

```js
function cookieManagementMiddleware(request) {
  const response = {
    status: 200,
    cookies: {
      myCookie: "123",
    },
  };
  return response;
}
```

<div class="content-ad"></div>

## 인증:

미들웨어를 사용하여 사용자가 특정 경로나 자원에 액세스하기 전에 인증되었는지 확인할 수 있습니다.

아래 예시에서는 사용자가 보호된 경로에 액세스하려고 시도할 때, 미들웨어 함수가 세션 쿠키를 통해 인증을 확인하여 사용자의 신원을 확인합니다. 사용자가 인증되지 않은 경우 로그인 페이지로 리디렉션되거나 액세스가 거부됩니다.

```js
// Next.js를 사용하는 경우
export function authenticationMiddleware(request: NextRequest) {
  if (!request.headers.cookie?.includes("authenticated=true")) {
    // 로그인 페이지로 리다이렉트
    return NextResponse.redirect("/login");
  }
  return NextResponse.next();
}
```

<div class="content-ad"></div>

```js
// 자바스크립트 사용
function authenticationMiddleware(request) {
  if (
    !(
      request.headers.cookie &&
      request.headers.cookie.includes("authenticated=true")
    )
  ) {
    // 로그인 페이지로 리다이렉트
    window.location.href = "/login";
    // 이 코드는 리다이렉션 후에는 실행되지 않으므로 빈 응답 반환
    return {
      status: 204, // 컨텐츠 없음
      body: "",
    };
  }
  // 다음 미들웨어 또는 라우트 핸들러로 진행
  return {
    status: 200,
  };
}
```

## 로깅:

들어오는 요청의 세부 로깅, 요청 메소드, URL, 헤더 및 타임스탬프 정보를 포함합니다. 이 로그는 문제 진단, 사용자 활동 추적 및 성능 분석에 매우 유용합니다.

```js
export function loggingMiddleware(request: NextRequest) {
  console.log(
    `Received ${request.method} request to ${request.url} at ${new Date()}`
  );
  return NextResponse.next();
}
```

<div class="content-ad"></div>

```js
function loggingMiddleware(request) {
  console.log(
    `요청을 받았어요! ${new Date()}에 ${request.method} 방식으로 ${
      request.url
    } 주소로부터 받은 요청이에요.`
  );
  return {
    status: 200, // 다음 미들웨어나 라우트 핸들러로 이동
  };
}
```

## 응답 커스터마이징:

특정 조건에 따라 사용자 정의 응답 헤더, 상태 코드 또는 응답 내용을 수정할 수 있어요. 예를 들어, 클라이언트에 추가 정보를 제공하기 위해 사용자 지정 헤더를 설정하거나 응답 내용을 동적으로 조정할 수 있어요.

```js
export function customHeadersMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-Custom-Header", "안녕하세요, 미들웨어!");
  response.cookies.set("myCookie", "123");
  return response;
}
```

<div class="content-ad"></div>

```js
function customHeadersMiddleware(request) {
  const response = {
    status: 200,
    headers: {
      "X-Custom-Header": "Hello, Middleware!",
    },
    cookies: {
      myCookie: "123",
    },
  };
  return response;
}
```

이제 미들웨어가 무엇이고 왜 유용한지 이해했으니, Next.js에서 사용해 보겠습니다.

# 2. Next.js에서의 미들웨어

## 미들웨어 파일

<div class="content-ad"></div>

Next.js에서 Middleware은 일반적으로 프로젝트 루트에 위치한 middleware.ts (또는 .js)라는 파일에 정의됩니다. 이 파일은 Middleware 함수를 정의하는 곳입니다. 여기에 기본적인 함수 예시가 있습니다:

```js
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function myMiddleware(request: NextRequest) {
  // 여기에 Middleware 로직을 작성합니다
  return NextResponse.next(); // 다음 Middleware 또는 라우트 핸들러에 제어를 전달합니다
}
```

## NextResponse API

NextResponse은 Next.js에서 미들웨어 응답을 처리할 수 있는 API입니다. 요청 리디렉션, 응답 재작성, 헤더 설정, 쿠키 설정 등을 위한 메서드를 제공합니다.

<div class="content-ad"></div>

```js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function myMiddleware(request: NextRequest) {
  // 요청을 다른 URL로 리디렉션
  return NextResponse.redirect("/new-url");
  // 응답을 다른 URL에서 콘텐츠를 표시하도록 재작성
  return NextResponse.rewrite("/new-content");
  // 응답 헤더 및 쿠키 설정
  const response = NextResponse.next();
  response.headers.set("X-Custom-Header", "Hello, Middleware!");
  response.cookies.set("myCookie", "123");
  return response;
}
```

## 일치하는 경로

# 3. Next.js에서 미들웨어 사용

Next.js의 미들웨어 함수는 들어오는 요청과 응답에 모두 접근할 수 있습니다. 이 객체를 수정하여 응용 프로그램의 동작을 맞춤화할 수 있습니다.

<div class="content-ad"></div>

```js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function authenticationMiddleware(request: NextRequest) {
  // 사용자가 인증되었는지 확인합니다
  if (!request.headers.cookie?.includes("authenticated=true")) {
    return NextResponse.redirect("/login");
  }
  return NextResponse.next(); // 다음 미들웨어나 라우트 핸들러로 이동합니다
}
```

## 헤더 및 쿠키 설정

미들웨어는 들어오는 요청과 나가는 응답의 헤더와 쿠키를 조작할 수 있습니다. 이는 응답을 사용자 정의하거나 사용자 세션을 관리하는 등의 작업에 유용합니다.

```js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function customHeadersMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-Custom-Header", "안녕하세요, 미들웨어!");
  response.cookies.set("myCookie", "123");
  return response;
}
```

<div class="content-ad"></div>

## 사용자 정의 응답 생성하기

미들웨어는 Response 또는 NextResponse 인스턴스를 반환하여 응답을 직접 생성할 수 있습니다. 이를 통해 사용자 지정 로직에 기반하여 클라이언트에게 전송하는 응답을 제어할 수 있습니다.

```js
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function customResponseMiddleware(request: NextRequest) {
  if (/* 어떤 조건 */) {
    return new Response('사용자 정의 오류 메시지', { status: 400 });
  }
  return NextResponse.next();
}
```

기본 사항을 다루었으니, 이제 Next.js에서 미들웨어를 사용하는 고급 기술 몇 가지를 살펴보겠습니다.

<div class="content-ad"></div>

# 4. 고급 미들웨어 기술

## API 호출 가로채기

미들웨어의 강력한 사용 사례 중 하나는 API 호출을 가로채는 것입니다. 미들웨어를 사용하여 API 요청 헤더를 수정하거나 응답을 캐시하거나 테스트를 위해 API 호출을 가장하는 등의 작업을 할 수 있습니다.

## 요청 헤더 수정

<div class="content-ad"></div>

아웃고잉 API 요청의 헤더를 수정하기 위해 미들웨어를 사용할 수 있어요. 이는 요청을 보내기 전에 인증 토큰, API 키 또는 기타 필수 정보를 헤더에 추가하는 일이 종종 있어요.

```js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function apiInterceptorMiddleware(request: NextRequest) {
  // API 요청 헤더 수정하기
  request.headers.set("Authorization", "Bearer myAccessToken");

  // API 응답을 캐시하여 성능을 향상시킬 수 있어요
  // 여기서 캐싱 로직 구현하기

  return NextResponse.next();
}
```

## API 응답 캐싱

애플리케이션의 성능을 향상시키기 위해 미들웨어 내에서 API 응답을 캐싱할 수 있어요. 이렇게 함으로써 외부 API에 대한 부하를 줄이고 동일한 데이터에 대한 후속 요청 속도를 높일 수 있어요.

<div class="content-ad"></div>

```js
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function apiInterceptorMiddleware(request: NextRequest) {
  // 응답이 이미 캐시되었는지 확인합니다.
  const cachedResponse = /* 여기에 캐싱 로직을 구현하세요 */;

  if (cachedResponse) {
    // 캐시된 경우, 캐시된 응답을 반환합니다.
    return cachedResponse;
  } else {
    // 캐시되지 않은 경우 API 요청을 수행하고 응답을 캐시합니다.
    const apiResponse = /* API 요청을 수행합니다 */;

    // 미래 사용을 위해 응답을 캐시합니다.
    /* 응답을 캐시합니다 */

    return apiResponse;
  }
}
```

## 테스트를 위한 API 호출 모의화

미들웨어는 테스트 중에 API 호출을 모의화하는 데에도 사용될 수 있습니다. 이를 통해 테스트가 외부 서비스에 의존하지 않도록하여 보다 신뢰성이 높고 빠른 테스트를 수행할 수 있습니다.

```js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function apiMockMiddleware(request: NextRequest) {
  if (process.env.NODE_ENV === "test") {
    // 테스트 환경에서는 모의 응답을 반환합니다.
    return new Response(JSON.stringify({ mockData: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    // 다른 환경에서는 다음 미들웨어나 route 핸들러로 이동합니다.
    return NextResponse.next();
  }
}
```

<div class="content-ad"></div>

이러한 고급 기술들은 Next.js 애플리케이션에서 API 호출을 처리할 때 미들웨어의 유연성과 강력함을 보여줍니다. API 요청의 보안을 강화하거나 캐싱을 통해 성능을 최적화하거나 모의 응답을 통해 테스트를 간편화하는 등의 경우에도 미들웨어가 해결책이 될 수 있습니다.

# 5. 미들웨어 업그레이드 안내

이전 버전의 Next.js에서 미들웨어를 사용해 왔고 12.2 버전 이상으로 업그레이드하려는 경우, 미들웨어 API에 대한 변경 사항과 개선 사항을 숙지해야 합니다. 이러한 변경 사항으로 기존의 미들웨어 코드를 업데이트해야 할 수도 있습니다. 자세한 업그레이드 지침은 공식 Next.js 문서를 참조해 주세요.

이 문서에서는 웹 애플리케이션의 요청 및 응답 흐름, 인증, 로깅, 응답 사용자 정의, 라우팅 제어 등의 기본 개념과 고급 기술에 대해 다루어야 합니다.

<div class="content-ad"></div>

Next.js 공식 문서에서 미들웨어 정보와 공식 예제를 살펴볼 수 있습니다.
