---
title: "Nextjs 14 사이트 보안 정책 정리"
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

# Nextjs 14 사이트 보안 정책 정리

컨텐츠 보안 정책(CSP)은 다양한 보안 위협으로부터 Next.js 애플리케이션을 보호하는 데 중요합니다. 예를 들어, 크로스사이트 스크립팅(XSS), 클릭재킹, 그리고 다른 코드 삽입 공격에 대비할 수 있습니다.
CSP를 사용하면 개발자는 어떤 원천이 콘텐츠 소스, 스크립트, 스타일시트, 이미지, 글꼴, 객체, 미디어(오디오, 비디오), 아이프레임 등에 사용 가능한지를 지정할 수 있습니다.

## 난스

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

한번만 사용할 고유한 무작위 문자열인 nonce는 CSP와 함께 사용되어 특정 인라인 스크립트나 스타일이 엄격한 CSP 지시문을 우회하고 실행되도록 허용하는 역할을 합니다.

### 왜 nonce를 사용해야 하나요?

CSP는 악성 스크립트를 차단하기 위해 설계되었지만, 인라인 스크립트가 필요한 합법적인 시나리오도 있습니다. 이런 경우에 nonce를 사용하면 올바른 nonce를 가지고 있는 경우에만 이러한 스크립트가 실행될 수 있도록 할 수 있습니다.

### 미들웨어로 nonce 추가하기

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

미들웨어를 사용하면 페이지가 렌더링되기 전에 헤더를 추가하고 난스를 생성할 수 있습니다.
페이지를 볼 때마다 새로운 난스를 생성해야 합니다. 따라서 난스를 추가하려면 동적 렌더링을 사용해야 합니다.
예를 들면:

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
  // 새 줄 문자 및 공백 제거
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

기본적으로 미들웨어는 모든 요청에서 실행됩니다. Matcher를 사용하여 특정 경로에서만 미들웨어를 실행하도록 필터링할 수 있습니다.
next/link의 프리패치 및 CSP 헤더가 필요없는 정적 에셋과 일치하지 않도록 하는 것을 권장합니다.

```typescript
export const config = {
  matcher: [
    /*
     * API(routes)와 같은 시작 경로를 가진 모든 요청 경로를 일치시킵니다:
     * - api (API routes)
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
  ],
};
```

### 논스(Nonce) 읽기

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

이제 헤더를 사용하여 서버 구성 요소에서 논스를 읽어올 수 있습니다:

```typescript
import { headers } from "next/headers";
import Script from "next/script";

export default function Page() {
  const nonce = headers().get("x-nonce");

  return <Script src="https://www.googletagmanager.com/gtag/js" strategy="afterInteractive" nonce={nonce} />;
}
```

## 논스가 없는 경우

논스가 필요하지 않은 애플리케이션의 경우, next.config.js 파일에서 CSP 헤더를 직접 설정할 수 있습니다.

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

Next.js의 v13.4.20+ 버전을 사용하여 논스를 올바르게 처리하고 적용하는 것을 권장합니다.

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
