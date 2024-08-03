---
title: "Nextjs 13 사이트 성능 분석하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "분석"
link: "undefined"
---



# 분석

Next.js에는 성능 지표를 측정하고 보고하는 데 내장 지원이 있습니다. useReportWebVitals 훅을 사용하여 직접 보고를 관리하거나 대안으로 Vercel이 제공하는 관리형 서비스를 사용하여 자동으로 지표를 수집하고 시각화할 수 있습니다.

## 직접 만들기

```js
import { useReportWebVitals } from "next/web-vitals";

function MyApp({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    console.log(metric);
  });

  return <Component {...pageProps} />;
}
```

<div class="content-ad"></div>

API 레퍼런스에서 더 많은 정보를 확인해보세요.

## 웹 핵심 지표

웹 핵심 지표는 웹 페이지의 사용자 경험을 캡처하기 위해 만들어진 유용한 지표들입니다. 아래 웹 핵심 지표들이 모두 포함되어 있습니다:

- 첫 번째 바이트까지의 시간 (TTFB)
- 첫 번째 콘텐츠가 그려지는 시점 (FCP)
- 가장 큰 콘텐츠가 그려지는 시점 (LCP)
- 첫 입력 지연 (FID)
- 누적 레이아웃 이동 (CLS)
- 다음 그리기까지의 상호작용 (INP)

<div class="content-ad"></div>

이러한 메트릭의 모든 결과를 name 속성을 사용하여 처리할 수 있습니다.

```js
import { useReportWebVitals } from "next/web-vitals";

function MyApp({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case "FCP": {
        // FCP 결과 처리
      }
      case "LCP": {
        // LCP 결과 처리
      }
      // ...
    }
  });

  return <Component {...pageProps} />;
}
```

## 사용자 정의 메트릭

위에 나열된 핵심 메트릭 외에도, 페이지의 수분화 및 렌더링 속도를 측정하는 몇 가지 추가적인 사용자 정의 메트릭이 있습니다:

<div class="content-ad"></div>

- Next.js-수분화: 페이지가 수분화를 시작하고 완료하는 데 걸리는 시간(밀리초 단위)
- Next.js-경로-변경-렌더: 경로 변경 후 페이지 렌더링을 시작하는 데 걸리는 시간(밀리초 단위)
- Next.js-렌더: 경로 변경 후 페이지 렌더를 완료하는 데 걸리는 시간(밀리초 단위)

이 지표들을 모두 따로 처리할 수 있습니다:

```js
export function reportWebVitals(metric) {
  switch (metric.name) {
    case "Next.js-수분화":
      // 수분화 결과 처리
      break;
    case "Next.js-경로-변경-렌더":
      // 경로 변경 후 렌더 결과 처리
      break;
    case "Next.js-렌더":
      // 렌더 결과 처리
      break;
    default:
      break;
  }
}
```

이러한 지표들은 User Timing API를 지원하는 모든 브라우저에서 작동합니다.

<div class="content-ad"></div>

## 외부 시스템으로 결과 전송하기

당신은 사이트에서 실제 사용자 성능을 측정하고 추적하기 위해 결과를 어떤 엔드포인트로든 보낼 수 있습니다. 예를 들어:

```js
useReportWebVitals((metric) => {
  const body = JSON.stringify(metric);
  const url = "https://example.com/analytics";

  // `navigator.sendBeacon()`를 사용할 수 있다면 해당 함수를 사용하고, 그렇지 않은 경우에는 `fetch()`를 사용합니다.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: "POST", keepalive: true });
  }
});
```

> 참고: Google 애널리틱스를 사용하는 경우에는 id 값을 사용하여 수동으로 메트릭 분포를 구성할 수 있습니다(백분위수 등을 계산하기 위해).

<div class="content-ad"></div>
