---
title: "Nextjs 13 프로젝트의 콘텐츠 보안 정책"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "내용 보안 정책"
link: "undefined"
isUpdated: true
---





# 콘텐츠 보안 정책

콘텐츠 보안 정책 (CSP)은 다양한 보안 위협에 대해 Next.js 애플리케이션을 보호하는 데 중요합니다. 크로스 사이트 스크립팅(XSS), 클릭재킹, 그리고 기타 코드 삽입 공격과 같은 위협으로부터 애플리케이션을 보호할 수 있습니다.

CSP를 사용하면, 개발자들은 콘텐츠 소스, 스크립트, 스타일시트, 이미지, 글꼴, 객체, 미디어 (오디오, 비디오), iframes 등에 대해 허용되는 출천지를 명시할 수 있습니다.

## 논스

<div class="content-ad"></div>

화폐화하는데 비밀번호가 유일한 랜덤 문자열로 생성되어 일회용으로 사용됩니다. 이는 CSP와 함께 사용되어 일반적인 CSP 지시문을 우회하여 특정 인라인 스크립트 또는 스타일의 실행을 선택적으로 허용합니다.

### 왜 nonce를 사용해야 할까요?

CSP는 악의적인 스크립트를 차단하기 위해 설계되었지만, 일부 케이스에서는 인라인 스크립트가 필요한 경우가 있습니다. 이런 경우에 nonce를 사용하면 올바른 nonce를 가진 스크립트만 실행할 수 있도록 허용할 수 있습니다.

### 미들웨어로 nonce 추가하기

<div class="content-ad"></div>

미들웨어를 사용하면 페이지 렌더링 전에 헤더를 추가하고 논스를 생성할 수 있습니다.

페이지를 볼 때마다 새로운 논스를 생성해야 합니다. 즉, 동적 렌더링을 사용하여 논스를 추가해야 합니다.

예를 들어:

```typescript
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;
  // 새 줄 문자와 공백 교체
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, " ").trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  requestHeaders.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

  return response;
}
```

<div class="content-ad"></div>

기본적으로 Middleware는 모든 요청에 실행됩니다. Matcher를 사용하여 특정 경로에서 Middleware를 실행하도록 필터링할 수 있습니다.

우리는 prefetches(다음/link에서 가져온 것)와 CSP 헤더가 필요 없는 정적 에셋을 무시하는 것을 권장합니다.

```typescript
export const config = {
  matcher: [
    /*
     * 모든 요청 경로와 일치하지만 다음과 같이 시작하는 경로는 제외:
     * - api (API 라우트들)
     * - _next/static (정적 파일들)
     * - _next/image (이미지 최적화 파일들)
     * - favicon.ico (파비콘 파일)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
```

### nonce 값을 읽는 중

<div class="content-ad"></div>

서버 구성요소에서 headers를 사용하여 nonce를 읽을 수 있게 되었습니다:

```typescript
import { headers } from "next/headers";
import Script from "next/script";

export default function Page() {
  const nonce = headers().get("x-nonce");

  return <Script src="https://www.googletagmanager.com/gtag/js" strategy="afterInteractive" nonce={nonce} />;
}
```

## Nonces가 필요하지 않은 경우

Nonce가 필요하지 않은 애플리케이션을 위해, next.config.js 파일에 직접 CSP 헤더를 설정할 수 있습니다:

<div class="content-ad"></div>

```js
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};
```

## 버전 히스토리

Next.js를 v13.4.20 이상으로 사용하는 것을 권장합니다. 이는 nonce를 제대로 처리하고 적용할 수 있도록 합니다.

<div class="content-ad"></div>
