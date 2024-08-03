---
title: "Nextjs 14에서 코어 웹 바이탈 분석 서비스 이용 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs 14에서 코어 웹 바이탈 분석 서비스 이용 하는 방법

useReportWebVitals 훅을 사용하면 Core Web Vitals를 보고할 수 있으며, 분석 서비스와 함께 사용할 수 있습니다.

```js
"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
  });
}
```

```js
import { WebVitals } from "./_components/web-vitals";

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
```

<div class="content-ad"></div>

> "useReportWebVitals" 훅을 사용하려면 "use client" 지시문이 필요합니다. 성능을 최적화하기 위한 가장 좋은 방법은 루트 레이아웃에서 가져오는 별도의 컴포넌트를 만드는 것입니다. 이렇게 하면 클라이언트 경계가 WebVitals 컴포넌트에만 제한됩니다.

## useReportWebVitals

훅의 인수로 전달된 메트릭 객체는 여러 속성으로 구성됩니다:

- id: 현재 페이지 로드의 문맥에서 메트릭의 고유 식별자
- name: 성능 메트릭의 이름. 가능한 값으로 Web Vitals 메트릭의 이름(TTFB, FCP, LCP, FID, CLS)이 포함됩니다.
- delta: 현재 값과 이전 값 간의 차이. 값은 일반적으로 밀리초 단위이며 메트릭 값의 시간에 따른 변화를 나타냅니다.
- entries: 메트릭과 관련된 성능 엔트리 배열. 이러한 엔트리는 메트릭과 관련된 성능 이벤트에 대한 세부 정보를 제공합니다.
- navigationType: 메트릭 수집을 유도하는 탐색 유형을 나타냅니다. 가능한 값으로 "navigate", "reload", "back_forward", "prerender"가 포함됩니다.
- rating: 메트릭 값의 질적 등급으로 성능을 평가하는 값입니다. 가능한 값으로 "good", "needs-improvement", "poor"가 포함됩니다. 이 등급은 일반적으로 메트릭 값을 수용 가능하거나 최적화되지 않은 성능을 나타내는 미리 정의된 임계값과 비교하여 결정됩니다.
- value: 성능 엔트리의 실제 값 또는 지속 시간. 값은 일반적으로 밀리초 단위이며 메트릭으로 추적되는 성능 측면의 양적 측정을 제공합니다. 값의 소스는 측정되는 특정 메트릭에 따라 다르며 다양한 성능 API에서 가져올 수 있습니다.

<div class="content-ad"></div>

## 웹 비탈스

웹 비탈스는 웹 페이지의 사용자 경험을 측정하기 위한 유용한 지표들입니다. 아래의 웹 비탈스가 모두 포함됩니다:

- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Interaction to Next Paint (INP)

이러한 지표들의 결과를 모두 name 속성을 사용하여 처리할 수 있습니다.

<div class="content-ad"></div>

```typescript
"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
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
}
```

## Vercel에서의 사용법

Vercel Speed Insights는 Vercel 배포에 자동으로 구성되며 useReportWebVitals를 사용하지 않습니다. 이 훅은 로컬 개발에 유용하거나 다른 분석 서비스를 사용하는 경우에 유용합니다.

## 외부 시스템으로 결과 전송

<div class="content-ad"></div>

사이트에서 실제 사용자 성능을 측정하고 추적하기 위해 어떤 엔드포인트로든 결과를 전송할 수 있습니다. 예를 들어:

```js
useReportWebVitals((metric) => {
  const body = JSON.stringify(metric);
  const url = "https://example.com/analytics";

  // `navigator.sendBeacon()`을 사용할 수 있다면 사용하고, 그렇지 않으면 `fetch()`를 사용합니다.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: "POST", keepalive: true });
  }
});
```

> 좋아 알아두기: Google Analytics를 사용하는 경우, id 값을 사용하여 지표 분포를 수동으로 작성할 수 있습니다(백분위수 등을 계산).

> useReportWebVitals(metric) 함수를 사용하여:

```js
{
  // Google Analytics가 초기화되었으면`window.gtag` 사용:
  // 예시: https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
  window.gtag(`event`, metric.name, {
    value: Math.round(metric.name === `CLS` ? metric.value * 1000 : metric.value), // 값은 정수여야 합니다
    event_label: metric.id, // 현재 페이지로드에 대한 고유 ID
    non_interaction: true, // 이벤트가 이탈률에 영향을 미치지 않도록 함
  });
}
Google Analytics로 결과 전송에 대해 더 알아보기
```

<div class="content-ad"></div>
