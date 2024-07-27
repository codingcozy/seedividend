---
title: "React와 TypeScript로 Google Analytics 사용 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-GoogleAnalyticsWithReactTypescript_0.png"
date: 2024-07-07 21:58
ogImage:
  url: /assets/img/2024-07-07-GoogleAnalyticsWithReactTypescript_0.png
tag: Tech
originalTitle: "Google Analytics With React Typescript"
link: "https://medium.com/@itay.ey/google-analytics-with-react-typescript-a405da7a3fc3"
---

<img src="/TIL/assets/img/2024-07-07-GoogleAnalyticsWithReactTypescript_0.png" />

## GA 란?!!

Google Analytics (GA)은 웹사이트 트래픽 및 사용자 행동을 추적하고 분석하는 강력한 도구입니다.

다음은 그 동작 방식입니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

당신의 웹사이트에서 GA는 JavaScript 추적 코드를 사용하여 데이터를 수집합니다. 이 코드는 웹사이트 페이지에 삽입되어 방문자에 대한 정보를 수집하고 Google의 서버로 보내어 처리되며 다양한 보고서에서 제공됩니다.

## 구현은 어떻게 작동하나요?

useGoogleAnalytics.ts는 GA와 통합하기 위한 기본 파일로 사용됩니다. 우리는 유연성과 미래 지향성을 위해 GA 통합을 처리하기 위해 객체를 사용하고 있습니다.

GoogleAnalyticsProvider.tsx는 라우트를 감싸는 공급자 컴포넌트로 사용됩니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

App.tsx 파일을 수정하여 GoogleAnalyticsProvider 컴포넌트를 추가해주세요.

이 방법을 선택한 이유는?

- 다양한 기능 지원: 페이지 뷰, 이벤트 추적 및 초기화 후 구성을 쉽게 관리할 수 있습니다.

- 미래를 대비: ReactGA에서 다른 솔루션(예: 미래의 GA 버전)으로 전환하더라도 코드 베이스의 각 인스턴스를 모두 업데이트해야 하는 것이 아니라 이 객체만 업데이트하면 됩니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- React 방식: 이 방법은 React의 최상의 실천 방법을 따르며 부작용을 처리하기 위해 컴포넌트를 사용합니다.

// 코드에 있는 주석들
앱에서 이를 검색하여 로직을 이해하고 앱에서 구현을 더 잘 할 수 있도록 하는 것을 추천합니다: `// 추천:` 및 `// 설명:`

GitHub 저장소: ‘google-analytics-react-ts’

useGoogleAnalytics.ts.tsx

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { useEffect } from "react";
import ReactGA from "react-ga4";

// 추천: 환경 변수를 사용하여 비밀로 유지하는 것이 좋습니다.
export const trackingId = "GA_ID";
const appVersion = "APP_VERSION";
// 참고: 분석을 보다 나은 것으로 만들기 위해 앱에서 사용자 ID를 사용하십시오.
// 추천: Redux로 구현하는 것이 좋습니다.
const id = "user-id";

const useGoogleAnalytics = () => {
  useEffect(() => {
    if (trackingId) {
      try {
        ReactGA.initialize([
          {
            trackingId,
            gaOptions: {
              anonymizeIp: true,
              clientId: id,
            },
          },
        ]);
        ReactGA.set({ app_version: appVersion });
      } catch (error) {
        // 추천: 이 오류를 오류 추적 서비스에 보고하는 것이 좋습니다.
        console.log("Google Analytics 초기화 오류", { Error: error });
      }
    }
  }, [id]);

  const setOption = (key: string, value: unknown) => {
    ReactGA.set({ [key]: value });
  };

  const setUserId = (userId: string | number) => {
    setOption("userId", userId);
  };

  const sendData = (type: string, data: Object) => {
    ReactGA.send({ hitType: type, ...data });
  };

  const trackPageView = (pagePath?: string) => {
    if (!pagePath) {
      pagePath = location.href;
    }

    setOption("app_version", appVersion);
    sendData("pageview", { page: pagePath });
  };

  const trackEvent = (category: string, action: string, label?: string, value?: number) => {
    setOption("app_version", appVersion);
    ReactGA.event({ category, action, label, value });
  };

  return {
    setOption,
    setUserId,
    trackPageView,
    trackEvent,
  };
};

export default useGoogleAnalytics;
```

GoogleAnalyticsProvider.tsx

```js
import React, { useEffect, PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import useGoogleAnalytics, { trackingId } from "../hooks/useGoogleAnalytics";

const GoogleAnalyticsProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { trackPageView } = useGoogleAnalytics();
  const location = useLocation();

  useEffect(() => {
    if (trackingId) {
      try {
        trackPageView(location.pathname + location.search);
      } catch (error) {
        // 추천: 이 오류를 오류 추적 서비스에 보고하는 것이 좋습니다.
        console.log("Google Analytics의 trackPageView 실행 오류", { Error: error });
      }
    }
  }, [location, trackPageView]);
  // 참고: GoogleAnalyticsProvider가 UI에 영향을 미치지 않고 다른 컴포넌트를 감쌀 수 있도록 합니다.
  return <>{children}</>;
};

export default GoogleAnalyticsProvider;
```

App.tsx

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import GoogleAnalyticsProvider from './providers/GoogleAnalyticsProvider';

const App: React.FC = () => {

  return (
    // 참고: GoogleAnalyticsProvider를 어디에 배치할지 확인하여 최적의 위치를 지정-
    // 모든 route 변경을 추적하기 위해 초기화를 최소화하고 오류를 캡처합니다 (오류 추적 서비스 사용 시)
    <GoogleAnalyticsProvider>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              Google Analytics React TypeScript
            </div>
          }
        />
      </Routes>
    </GoogleAnalyticsProvider >
  );
}

export default App;
export default App;
```

## 2가지 구현 방법

1. 일반 추적 (현재 레포지토리) :sunglasses:

장점:

- 간단한 초기화: 설정을 통해 GAInitializer 컴포넌트가 마운트될 때 Google Analytics가 한 번만 초기화됩니다.
- 페이지 뷰 추적: 페이지 뷰를 추적하는 방법을 제공하여 각 페이지 방문이 로그에 기록되도록 수동으로 처리할 수 있습니다.
- 사용자 정의 이벤트: trackEventBuilder 메서드를 사용하면 다양한 사용자 상호작용을 추적하는 유연성을 제공합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

단점:

- 수동 페이지 뷰 추적: App 컴포넌트만 래핑하고 각 route 변경을 래핑하지 않기 때문에 각 route 변경마다 trackPageView를 수동으로 호출해야 합니다. 안 할 경우 인간 에러가 발생할 수 있습니다.
- route 변경 추적 부족: route 변경을 자동으로 추적하지 않기 때문에, 각 컴포넌트에서 명시적으로 trackPageView를 호출하지 않으면 일부 페이지 뷰 로깅을 놓칠 수 있습니다.
- 제한된 사용자 컨텍스트: 기본 GA가 수집한 것 이상의 상세한 사용자 상호작용 또는 인구통계 데이터를 추적하지 않습니다.

장점:

- 이벤트 추적 기능을 모든 추적하고 싶은 이벤트에 추가
- 세밀한 제어: 추적할 이벤트와 해당 라벨을 정확하게 제어할 수 있어 매우 상세하고 구체적인 분석 데이터를 얻을 수 있습니다.
- 사용자 정의: 각 이벤트를 특정 범주, 동작, 라벨 및 값으로 사용자 정의할 수 있어 사용자의 행동과 상호작용에 대한 풍부한 통찰을 제공합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

단점:

- 유지보수 부담 : 애플리케이션이 커지면 수많은 개별 추적 호출을 관리하는 것이 시간이 오래 걸리고 일관되게 유지하는 것이 어려워질 수 있습니다.
- 코드 중복 : 여러 구성 요소나 함수에서 유사한 추적 코드를 반복해야 할 수 있으며, 결과적으로 DRY (Don't Repeat Yourself) 코드가 줄어들 수 있습니다.

## 콘텐츠 보안 정책 (CSP)

GA를 구현하기 위해 GA 스크립트를 웹 애플리케이션에 포함하고 코드에서 추적을 설정하세요. 'https://www.google-analytics.com`를 script-src 및 connect-src 지시문에 추가하여 GA 서버로의 연결을 허용하도록 CSP를 구성하세요. Google Tag Manager를 사용하는 경우 script-src 지시문에 ‘https://www.googletagmanager.com`도 포함하고 CSP 구성을 철저히 테스트하세요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 참고 자료

Medium: ‘Google Analytics TypeScript로 React에 구현하기’

YouTube: ‘React JS에 Google Analytics 추가하기’
