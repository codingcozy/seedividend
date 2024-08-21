---
title: "Nextjs 14에서 middlewarejs로 미들웨어 관리하는 방법"
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

# Nextjs 14에서 middleware.js로 미들웨어 관리하는 방법

미들웨어.js|ts 파일은 미들웨어를 작성하고 요청이 완료되기 전에 서버에서 코드를 실행하는 데 사용됩니다. 그런 다음 수신된 요청을 기반으로 응답을 수정하여 다시 작성하거나 리디렉션하거나 요청 또는 응답 헤더를 수정하거나 직접 응답할 수 있습니다.

미들웨어는 경로가 렌더링되기 전에 실행됩니다. 인증, 로깅 또는 리디렉션 처리와 같은 사용자 정의 서버 측 로직을 구현하는 데 특히 유용합니다.

프로젝트의 루트에 middleware.ts (또는 .js) 파일을 사용하여 미들웨어를 정의하세요. 예를 들어, app이나 pages와 같은 수준이거나 해당하는 경우 src 내부에 위치시킬 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```typescript
import { NextResponse, NextRequest } from "next/server";

// `await`를 사용하는 경우 함수를 `async`로 표시할 수 있습니다.
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: "/about/:path*",
};
```

## 내보내기

### 미들웨어 함수

파일은 기본 내보내기 또는 명명된 미들웨어로 단일 함수를 내보내야 합니다. 동일한 파일에서 여러 미들웨어를 지원하지 않는다는 점을 유의하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// 기본 내보내기 예시
export default function middleware(request) {
  // 미들웨어 로직
}
```

### 설정 객체 (선택사항)

미들웨어 함수와 함께 내보낼 수 있는 설정 객체입니다. 이 객체에는 미들웨어가 적용되는 경로를 지정하는 매처가 포함됩니다.

#### 매처

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

매처 옵션은 미들웨어가 실행되는 특정 경로를 대상으로 지정할 수 있습니다. 이러한 경로를 지정하는 방법은 다음과 같습니다:

- 하나의 경로에 대해: 경로를 정의하기 위해 문자열을 직접 사용하세요. 예: `/about`.
- 여러 경로에 대해: 여러 경로를 나열하기 위해 배열을 사용하세요. 예: matcher: [`/about`, `/contact`]는 /about과 /contact 둘 다에 미들웨어를 적용합니다.

또한, 매처는 정규 표현식을 통해 복잡한 경로 명세를 지원합니다. 예: matcher: [`/((?!api|_next/static|_next/image|.*\.png$).*)`]는 포함할지 제외할지를 정확히 제어하는 정교한 경로를 활성화합니다.

매처 옵션은 다음 키를 가진 객체 배열도 허용합니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 소스: 요청 경로와 일치시키기 위해 사용되는 경로 또는 패턴입니다. 직접 경로 일치를 위한 문자열 또는 더 복잡한 매칭을 위한 패턴일 수 있습니다.
- regexp (선택 사항): 소스를 기반으로 매칭을 미세 조정하는 정규 표현식 문자열입니다. 특정 경로가 포함되거나 제외되는 추가 제어를 제공합니다.
- locale (선택 사항): 경로 매칭에서 로캘 기반 라우팅을 무시하도록 설정하는 불리언입니다.
- has (선택 사항): 헤더, 쿼리 매개변수 또는 쿠키와 같은 특정 요청 요소의 존재에 따라 조건을 지정합니다.
- missing (선택 사항): 특정 요청 요소가 없는 조건에 중점을 둡니다. 누락된 헤더나 쿠키와 같은 요소를 다룹니다.

```js
export const config = {
  matcher: [
    {
      source: "/api/*",
      regexp: "^/api/(.*)",
      locale: false,
      has: [
        { type: "header", key: "Authorization", value: "Bearer Token" },
        { type: "query", key: "userId", value: "123" },
      ],
      missing: [{ type: "cookie", key: "session", value: "active" }],
    },
  ],
};
```

## 매개변수

### 요청

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

미들웨어를 정의할 때, 기본 내보내기 함수는 request라는 단일 매개변수를 받습니다. 이 매개변수는 NextRequest의 인스턴스로, 들어오는 HTTP 요청을 나타냅니다.

```typescript
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 여기에 미들웨어 로직을 작성합니다
}
```

> 알아두면 좋은 점:
> NextRequest는 Next.js 미들웨어에서 들어오는 HTTP 요청을 나타내는 타입으로, NextResponse는 HTTP 응답을 조작하고 반환하는 데 사용되는 클래스입니다.

## NextResponse

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

> 미들웨어는 Web Response API를 확장하는 NextResponse 객체를 사용할 수 있어요. NextResponse 객체를 반환함으로써 쿠키를 직접 조작하고, 헤더를 설정하고, 리디렉트를 구현하며, 경로를 재작성할 수 있어요.

> 참고: 리디렉트를 위해 NextResponse.redirect 대신 Response.redirect도 사용할 수 있어요.

## 런타임

미들웨어는 Edge 런타임만 지원해요. Node.js 런타임은 사용할 수 없어요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 버전 이력

| 버전      | 변경 내역                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v13.1.0` | 고급 미들웨어 플래그 추가                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `v13.0.0` | 미들웨어가 요청 헤더, 응답 헤더를 수정하고 응답을 전송할 수 있음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `v12.2.0` | 미들웨어가 안정화되었습니다. <a href="/docs/messages/middleware-upgrade-guide">업그레이드 가이드</a> 확인 부탁드립니다.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `v12.0.9` | Edge 런타임에서 절대 URL을 강제로 사용함 (<a href="https://github.com/vercel/next.js/pull/33410" rel="noopener noreferrer" target="_blank">PR<span class="inline-flex"><svg class="with-icon_icon__MHUeb" data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:currentColor;width:14px;height:14px"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg></span></a>) |
| `v12.0.0` | 미들웨어 (베타) 추가됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
