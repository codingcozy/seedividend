---
title: "Nextjs 14에서 user agent 알아내는 방법"
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

# Nextjs 14에서 user agent 알아내는 방법

사용자 에이전트 도우미는 Web Request API를 확장하여 요청의 사용자 에이전트 객체와 상호 작용하기 위한 추가 속성 및 메서드를 제공합니다.

```typescript
import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  url.searchParams.set("viewport", viewport);
  return NextResponse.rewrite(url);
}
```

## isBot

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

알려진 봇에서 요청이 왔는지를 나타내는 부울 값입니다.

## 브라우저

요청에 사용된 브라우저에 관한 정보를 포함하는 객체입니다.

- name: 브라우저의 이름을 나타내는 문자열 또는 식별할 수 없는 경우에는 정의되지 않습니다.
- version: 브라우저의 버전을 나타내는 문자열이거나 정의되지 않은 경우입니다.

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

## 디바이스

요청에 사용된 기기에 관한 정보를 포함하는 객체입니다.

- model: 기기 모델을 나타내는 문자열 또는 정의되지 않음.
- type: 콘솔, 모바일, 태블릿, 스마트 TV, 웨어러블, 임베디드 또는 정의되지 않은 기기 유형을 나타내는 문자열.
- vendor: 기기의 제조사를 나타내는 문자열 또는 정의되지 않음.

## 엔진

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

브라우저 엔진에 관한 정보를 담고 있는 객체입니다.

- 이름: 엔진의 이름을 나타내는 문자열입니다. 가능한 값으로는 Amaya, Blink, EdgeHTML, Flow, Gecko, Goanna, iCab, KHTML, Links, Lynx, NetFront, NetSurf, Presto, Tasman, Trident, w3m, WebKit, 또는 undefined가 있습니다.
- 버전: 엔진의 버전을 나타내는 문자열이거나 undefined입니다.

## 운영 체제

운영 체제에 관한 정보를 담고 있는 객체입니다.

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

- name: 운영 체제의 이름을 나타내는 문자열 또는 정의되지 않은 값.
- version: 운영 체제의 버전을 나타내는 문자열 또는 정의되지 않은 값.

## cpu

CPU 아키텍처에 대한 정보를 포함하는 객체입니다.

- architecture: CPU 아키텍처를 나타내는 문자열. 가능한 값은 68k, amd64, arm, arm64, armhf, avr, ia32, ia64, irix, irix64, mips, mips64, pa-risc, ppc, sparc, sparc64 또는 정의되지 않은 값입니다.

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
