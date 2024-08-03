---
title: "Nextjs 저장소에서 사용자 에이전트userAgent 사용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: "undefined"
---



# userAgent

userAgent 도우미는 Web Request API를 확장하여 요청에서 사용자 에이전트 개체와 상호 작용하는 데 필요한 추가 속성 및 메서드를 제공합니다.

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

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경하세요.

## 브라우저

요청이 알려진 봇으로부터 온 것인지 나타내는 부울 값입니다.

- name: 브라우저의 이름을 나타내는 문자열 또는 식별할 수 없는 경우 undefined.
- version: 브라우저의 버전을 나타내는 문자열 또는 undefined.

<div class="content-ad"></div>

## 장치

요청에 사용된 장치에 관한 정보를 포함하는 객체입니다.

- model: 장치의 모델을 나타내는 문자열 또는 정의되지 않음.
- type: 콘솔, 모바일, 태블릿, 스마트 TV, 웨어러블, 임베디드 또는 정의되지 않은 장치 유형을 나타내는 문자열.
- vendor: 장치의 제조사를 나타내는 문자열 또는 정의되지 않음.

## 엔진

<div class="content-ad"></div>

브라우저 엔진에 관한 정보를 포함하고 있는 객체입니다.

- name: 엔진의 이름을 나타내는 문자열입니다. 가능한 값은 Amaya, Blink, EdgeHTML, Flow, Gecko, Goanna, iCab, KHTML, Links, Lynx, NetFront, NetSurf, Presto, Tasman, Trident, w3m, WebKit 또는 undefined입니다.
- version: 엔진의 버전을 나타내는 문자열이거나 undefined입니다.

## 운영체제

운영체제에 관한 정보를 포함하고 있는 객체입니다.

<div class="content-ad"></div>

- 이름: OS의 이름을 나타내는 문자열이거나 정의되지 않은 것입니다.
- 버전: OS의 버전을 나타내는 문자열이거나 정의되지 않은 것입니다.

## cpu

CPU 아키텍처에 관한 정보를 포함하는 객체입니다.

- 아키텍처: CPU의 아키텍처를 나타내는 문자열입니다. 가능한 값으로는 68k, amd64, arm, arm64, armhf, avr, ia32, ia64, irix, irix64, mips, mips64, pa-risc, ppc, sparc, sparc64 또는 정의되지 않은 값이 있습니다.

<div class="content-ad"></div>
