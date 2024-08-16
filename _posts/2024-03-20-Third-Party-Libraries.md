---
title: "Nextjs 14 써드파티 라이브러리 사용 방법"
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





# Nextjs 14 써드파티 라이브러리 사용 방법

`@next/third-parties`는 Next.js 애플리케이션에서 인기 있는 써드파티 라이브러리를 더 빠르게 로드하고 개발자 경험을 향상시키는 컴포넌트 및 유틸리티 모음을 제공하는 라이브러리입니다.
`@next/third-parties`에 의해 제공되는 모든 써드파티 통합은 성능과 사용 편의성을 최적화했습니다.

## 시작하기

<div class="content-ad"></div>

시작하려면 @next/third-parties 라이브러리를 설치하세요:

```js
npm install @next/third-parties@latest next@latest
```

@next/third-parties는 현재 개발 중인 실험적 라이브러리입니다. 더 많은 타사 통합을 추가하는 작업 중에는 최신 또는 캐너리 플래그와 함께 설치하는 것을 권장합니다.

## Google 타사

<div class="content-ad"></div>

Google에서 지원하는 모든 외부 라이브러리는 @next/third-parties/google에서 가져올 수 있습니다.

### Google Tag Manager

GoogleTagManager 컴포넌트를 사용하여 Google Tag Manager 컨테이너를 페이지에 인스턴스화할 수 있습니다. 기본적으로 페이지에서 수분화가 발생한 후에 원본 인라인 스크립트를 가져옵니다.
모든 경로에 Google Tag Manager를로드하려면 루트 레이아웃에 직접 컴포넌트를 포함하고 GTM 컨테이너 ID를 전달하십시오:

<div class="content-ad"></div>

```typescript
import { GoogleTagManager } from "@next/third-parties/google";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-XYZ" />
      <body>{children}</body>
    </html>
  );
}
```

개별 경로에 Google Tag Manager를 로드하려면 페이지 파일에 컴포넌트를 포함하십시오:

```js
import { GoogleTagManager } from "@next/third-parties/google";

export default function Page() {
  return <GoogleTagManager gtmId="GTM-XYZ" />;
}
```

#### 이벤트 전송

<div class="content-ad"></div>

`sendGTMEvent` 함수는 데이터 레이어 객체를 사용하여 이벤트를 전송하여 페이지에서 사용자 상호작용을 추적하는 데 사용할 수 있습니다. 이 함수가 작동하려면 부모 레이아웃, 페이지 또는 컴포넌트 중 하나에 `<GoogleTagManager />` 컴포넌트가 포함되어 있거나 동일한 파일에 직접 포함되어 있어야 합니다.

```js
"use client";

import { sendGTMEvent } from "@next/third-parties/google";

export function EventButton() {
  return (
    <div>
      <button onClick={() => sendGTMEvent({ event: "buttonClicked", value: "xyz" })}>Send Event</button>
    </div>
  );
}
```

펑션을 통해 전달할 수 있는 다양한 변수와 이벤트에 대해 알아보려면 태그 관리자 개발자 문서를 참조하십시오.

#### 옵션

<div class="content-ad"></div>

Google Tag Manager에 전달할 옵션입니다. 전체 옵션 목록은 Google Tag Manager 문서를 참조하세요.

| Name            | Type     | Description                                                          |
| --------------- | -------- | -------------------------------------------------------------------- |
| `gtmId`         | Required | 사용자의 GTM 컨테이너 ID. 일반적으로 `GTM-`으로 시작합니다.          |
| `dataLayer`     | Optional | 컨테이너 초기화에 사용할 데이터 레이어 배열. 기본값은 빈 배열입니다. |
| `dataLayerName` | Optional | 데이터 레이어의 이름. 기본값은 `dataLayer`입니다.                    |
| `auth`          | Optional | 환경 스니펫에 대한 인증 매개변수(<code>gtm_auth</code>)의 값.        |
| `preview`       | Optional | 환경 스니펫에 대한 미리보기 매개변수(<code>gtm_preview</code>)의 값. |

### Google Analytics

GoogleAnalytics 컴포넌트를 사용하면 Google Analytics 4를 Google 태그(gtag.js)를 통해 페이지에 포함시킬 수 있습니다. 기본적으로 페이지에서 수분화가 발생한 후에 원본 스크립트를 가져옵니다.

<div class="content-ad"></div>

> 권장 사항: 이미 응용 프로그램에 Google Tag Manager가 포함되어 있다면 Google Analytics를 별도 구성하는 대신 Google Tag Manager를 사용하여 Google Analytics를 직접 구성할 수 있습니다. Tag Manager와 gtag.js 간의 차이에 대해 자세히 알아 보려면 문서를 참조하십시오.
> 모든 경로에 Google Analytics를 로드하려면 루트 레이아웃에 구성 요소를 직접 포함하고 측정 ID를 전달하십시오:

```typescript
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XYZ" />
    </html>
  );
}
```

단일 경로에 Google Analytics를 로드하려면 페이지 파일에 구성 요소를 포함하십시오:

<div class="content-ad"></div>

```js
import { GoogleAnalytics } from "@next/third-parties/google";

export default function Page() {
  return <GoogleAnalytics gaId="G-XYZ" />;
}
```

#### 이벤트 전송

sendGAEvent 함수를 사용하여 dataLayer 객체를 사용하여 이벤트를 전송함으로써 페이지에서 사용자 상호작용을 측정할 수 있습니다. 이 함수가 작동하려면 `<GoogleAnalytics />` 컴포넌트가 부모 레이아웃, 페이지 또는 컴포넌트에서 직접 포함되어야 합니다. 또는 동일한 파일에서 직접적으로 포함해야 합니다.

```js
"use client";

import { sendGAEvent } from "@next/third-parties/google";

export function EventButton() {
  return (
    <div>
      <button onClick={() => sendGAEvent({ event: "buttonClicked", value: "xyz" })}>Send Event</button>
    </div>
  );
}
```

<div class="content-ad"></div>

Google Analytics 개발자 문서를 참조해서 이벤트 매개변수에 대해 더 알아보세요.

#### 페이지뷰 추적

Google Analytics는 브라우저 히스토리 상태가 변경될 때 자동으로 페이지뷰를 추적합니다. 이는 Next.js 경로간의 클라이언트 측 이동이 어떤 구성 없이도 페이지뷰 데이터를 전송한다는 것을 의미합니다.
클라이언트 측 이동이 올바르게 측정되고 있는지 확인하려면 '향상된 측정' 속성이 관리자 패널에서 활성화되어 있고 '브라우저 히스토리 이벤트에 기반한 페이지 변경' 확인란이 선택되어 있는지 확인하세요.

<div class="content-ad"></div>

> 참고: 페이지뷰 이벤트를 수동으로 전송하기로 결정한다면, 중복 데이터가 발생하지 않도록 기본 페이지뷰 측정을 비활성화해야 합니다. 더 자세한 내용은 Google Analytics 개발자 문서를 참조해주세요.

#### 옵션

`<GoogleAnalytics>` 컴포넌트에 전달할 옵션들입니다.

| 이름            | 타입      | 설명                                                                                                                     |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| `gaId`          | 필수      | 귀하의 [측정 ID](https://support.google.com/analytics/answer/12270356)입니다. 일반적으로 `<code>G-</code>`로 시작합니다. |
| `dataLayerName` | 선택 사항 | 데이터 레이어의 이름입니다. 기본값은 `<code>dataLayer</code>`입니다.                                                     |

<div class="content-ad"></div>

### Google 지도 삽입

GoogleMapsEmbed 컴포넌트를 사용하면 페이지에 Google 지도를 삽입할 수 있습니다. 기본적으로 lazy-load를 사용하여 아래쪽에 삽입됩니다.

```js
import { GoogleMapsEmbed } from "@next/third-parties/google";

export default function Page() {
  return <GoogleMapsEmbed apiKey="XYZ" height={200} width="100%" mode="place" q="Brooklyn+Bridge,New+York,NY" />;
}
```

#### 옵션

<div class="content-ad"></div>

Google Maps Embed에 전달할 옵션입니다. 전체 옵션 목록을 보려면 Google Map Embed 문서를 참조하세요
.

### YouTube 임베드

YouTubeEmbed 컴포넌트를 사용하여 YouTube 임베드를 로드하고 표시할 수 있습니다. 이 컴포넌트는 lite-youtube-embed를 사용하여 빠르게 로드됩니다.

| 이름              | 유형      | 설명                                                                                                               |
| ----------------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| `apiKey`          | 필수      | 사용자의 API 키입니다.                                                                                             |
| `mode`            | 필수      | [지도 모드](https://developers.google.com/maps/documentation/embed/embedding-map#choosing_map_modes)를 선택합니다. |
| `height`          | 선택 사항 | 임베드의 높이입니다. 기본값은 `auto`입니다.                                                                        |
| `width`           | 선택 사항 | 임베드의 너비입니다. 기본값은 `auto`입니다.                                                                        |
| `style`           | 선택 사항 | iframe에 스타일을 전달합니다.                                                                                      |
| `allowfullscreen` | 선택 사항 | 일부 지도 부분을 전체 화면으로 표시할 수 있는 속성입니다.                                                          |
| `loading`         | 선택 사항 | 기본값은 `lazy`입니다. 임베드가 화면 위에 있을 것으로 예상되면 변경을 고려해보세요.                                |
| `q`               | 선택 사항 | 맵 마커 위치를 정의합니다. <em>지도 모드에 따라 필요할 수 있습니다.</em>                                           |
| `center`          | 선택 사항 | 맵 뷰어의 중심을 정의합니다.                                                                                       |
| `zoom`            | 선택 사항 | 맵의 초기 확대 수준을 설정합니다.                                                                                  |
| `maptype`         | 선택 사항 | 로드할 지도 타일의 유형을 정의합니다.                                                                              |
| `language`        | 선택 사항 | UI 요소 및 맵 타일 레이블의 표시에 사용할 언어를 정의합니다.                                                       |
| `region`          | 선택 사항 | 지리적 민감성에 따라 표시할 적절한 경계 및 레이블을 정의합니다.                                                    |

<div class="content-ad"></div>

```js
import { YouTubeEmbed } from "@next/third-parties/google";

export default function Page() {
  return <YouTubeEmbed videoid="ogfYd705cRs" height={400} params="controls=0" />;
}
```

#### Options

| Name        | Type     | Description                                                                                                                                                                                                                                                                                              |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `videoid`   | Required | YouTube 영상의 ID입니다.                                                                                                                                                                                                                                                                                 |
| `width`     | Optional | 영상 컨테이너의 너비입니다. 기본값은 `auto` 입니다.                                                                                                                                                                                                                                                      |
| `height`    | Optional | 영상 컨테이너의 높이입니다. 기본값은 `auto` 입니다.                                                                                                                                                                                                                                                      |
| `playlabel` | Optional | 접근성을 위해 플레이 버튼의 시각적으로 숨긴 레이블입니다.                                                                                                                                                                                                                                                |
| `params`    | Optional | <a href="https://developers.google.com/youtube/player_parameters#Parameters" rel="noopener noreferrer nofollow" target="_blank">여기</a>에서 정의된 비디오 플레이어 매개변수입니다. <br> 매개변수는 쿼리 매개변수 문자열로 전달됩니다. <br> 예: <code>params="controls=0&amp;start=10&amp;end=30"</code> |
| `style`     | Optional | 영상 컨테이너에 스타일을 적용하는 데 사용됩니다.                                                                                                                                                                                                                                                         |
