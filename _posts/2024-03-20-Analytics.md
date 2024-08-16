---
title: "Nextjs 14 사이트 통계 측정 방법"
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





# Nextjs 14 사이트 통계 측정 방법

Next.js에는 성능 지표를 측정하고 보고하는 내장 지원이 있습니다. useReportWebVitals 훅을 사용하여 직접 보고를 관리하거나 Vercel은 대신 성능 지표를 자동으로 수집하고 시각화하는 관리 서비스를 제공합니다.

## 직접 만들기

```js
"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
  });
}
```

<div class="content-ad"></div>

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

"useReportWebVitals" 훅을 사용하려면 "use client" 지시문이 필요합니다. 성능 면에서 가장 우수한 방법은 루트 레이아웃이 가져오는 별도의 컴포넌트를 생성하는 것입니다. 이렇게 하면 클라이언트 경계가 WebVitals 컴포넌트로 특화됩니다.
더 많은 정보를 보려면 API 참조를 확인해주세요.

## Web Vitals

<div class="content-ad"></div>

웹 Vitals은 사용자 경험을 포착하기 위한 유용한 지표의 세트입니다. 다음과 같은 웹 Vitals이 모두 포함되어 있습니다:

- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Interaction to Next Paint (INP)

metric의 이름 속성을 사용하여 이러한 지표의 모든 결과를 처리할 수 있습니다.

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

<div class="content-ad"></div>

## 외부 시스템으로 결과 전송하기

귀하는 귀하의 사이트에서 실제 사용자 퍼포먼스를 측정하고 추적하기 위해 모든 엔드포인트로 결과를 전송할 수 있습니다. 예를 들어:

```js
useReportWebVitals((metric) => {
  const body = JSON.stringify(metric);
  const url = "https://example.com/analytics";

  // `navigator.sendBeacon()`를 사용할 수 있으면 그것을 사용하고, 그렇지 않으면 `fetch()`를 사용합니다.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: "POST", keepalive: true });
  }
});
```

> 참고: Google Analytics를 사용하고 있으면
> , id 값을 사용하여 수동으로 메트릭 분포를 구성할 수 있어서 백분위 등을 계산할 수 있습니다.

<div class="content-ad"></div>

> useReportWebVitals((metric) => {
> // 만약 Google Analytics를 초기화한 경우에는 `window.gtag`를 사용하세요. 예시는 다음과 같습니다:
> // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js

```js
window.gtag('event', metric.name, {

    value: Math.round(
      metric.name === 'CLS' ? metric.value * 1000 : metric.value
    ), // 값은 정수이어야 합니다
    event_label: metric.id, // 현재 페이지 로드에 고유한 ID
    non_interaction: true, // 이벤트가 이탈률에 영향을 미치지 않도록 합니다

});
});
```

Google Analytics로 결과를 전송하는 방법에 대해 더 알아보기.

<div class="content-ad"></div>
