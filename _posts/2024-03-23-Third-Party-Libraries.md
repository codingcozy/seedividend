---
title: "Nextjs 13 서드파티 라이브러리 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "제3자 라이브러리"
link: "undefined"
---



# 써드 파티 라이브러리

@next/third-parties는 Next.js 애플리케이션에서 인기 있는 써드 파티 라이브러리를로드하는 성능을 향상시키고 개발자 경험을 향상시키는 컴포넌트 및 유틸리티 모음을 제공하는 라이브러리입니다.

@next/third-parties에서 제공하는 모든 써드 파티 통합은 성능과 사용 편의성을 최적화되어 있습니다.

## 시작하기

<div class="content-ad"></div>

시작하려면 @next/third-parties 라이브러리를 설치해보세요:

```js
npm install @next/third-parties@latest next@latest
```

@next/third-parties는 현재 개발 중인 실험적인 라이브러리입니다. 더 많은 서드 파티 통합을 추가하는 작업 중이니 최신 버전이나 캐너리 플래그와 함께 설치하는 것을 권장합니다.

## Google Third-Parties

<div class="content-ad"></div>

Google에서 지원하는 모든 서드파티 라이브러리는 @next/third-parties/google에서 가져올 수 있습니다.

### Google 태그 매니저

GoogleTagManager 컴포넌트를 사용하여 페이지에 Google 태그 매니저 컨테이너를 인스턴스화할 수 있습니다. 기본 설정으로 페이지에서 하이드레이션이 발생한 후에 원본 인라인 스크립트를 가져옵니다.

모든 경로에 대해 Google 태그 매니저를 로드하려면 사용자 정의 \_app에 직접 컴포넌트를 포함하고 GTM 컨테이너 ID를 전달하세요:

<div class="content-ad"></div>

```js
import { GoogleTagManager } from "@next/third-parties/google";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleTagManager gtmId="GTM-XYZ" />
    </>
  );
}
```

단일 경로에 Google Tag Manager를 로드하려면 페이지 파일에 컴포넌트를 포함하세요:

```js
import { GoogleTagManager } from "@next/third-parties/google";

export default function Page() {
  return <GoogleTagManager gtmId="GTM-XYZ" />;
}
```

#### 이벤트 전송하기

<div class="content-ad"></div>

sendGTMEvent 함수는 데이터 레이어 객체를 사용하여 이벤트를 보내어 페이지에서 사용자 상호작용을 추적하는 데 사용할 수 있습니다. 이 함수가 작동하려면 `GoogleTagManager` 컴포넌트가 부모 레이아웃, 페이지 또는 컴포넌트 중 하나에 포함되어 있거나 동일한 파일에 직접 포함되어 있어야 합니다.

```js
import { sendGTMEvent } from "@next/third-parties/google";

export function EventButton() {
  return (
    <div>
      <button onClick={() => sendGTMEvent({ event: "buttonClicked", value: "xyz" })}>Send Event</button>
    </div>
  );
}
```

함수에 전달할 수 있는 다양한 변수 및 이벤트에 대해 알아보려면 관련 개발자 문서를 확인해주세요.

#### 옵션

<div class="content-ad"></div>

구글 태그 매니저로 전달할 옵션들이 있어요. 온전한 옵션 목록을 원한다면, 구글 태그 매니저 문서를 읽어보세요.

| Name            | Type      | Description                                                                |
| --------------- | --------- | -------------------------------------------------------------------------- |
| `gtmId`         | 필수      | GTM 컨테이너 ID입니다. 보통 `<code>GTM-</code>`로 시작합니다.              |
| `dataLayer`     | 선택 사항 | 컨테이너를 초기화하는 데이터 레이어 배열입니다. 기본값은 빈 배열입니다.    |
| `dataLayerName` | 선택 사항 | 데이터 레이어의 이름입니다. 기본값은 `<code>dataLayer</code>`입니다.       |
| `auth`          | 선택 사항 | 환경 스니펫을 위한 인증 매개변수(<code>gtm_auth</code>)의 값입니다.        |
| `preview`       | 선택 사항 | 환경 스니펫을 위한 미리보기 매개변수(<code>gtm_preview</code>)의 값입니다. |

### 구글 애널리틱스

GoogleAnalytics 컴포넌트를 사용하면 Google 애널리틱스 4를 페이지에 Google 태그(gtag.js)를 통해 포함시킬 수 있어요. 기본적으로 페이지에서 수분이 발생한 후에 원본 스크립트를 불러올 거에요.

<div class="content-ad"></div>

> 권장 사항: 이미 Google Tag Manager가 애플리케이션에 포함되어 있는 경우 Google Analytics를 별도 구성하는 대신 Google Tag Manager를 통해 Google Analytics를 직접 구성할 수 있습니다. Tag Manager와 gtag.js 간의 차이에 대해 자세히 알아보려면 문서를 참조하십시오.

모든 루트에 Google Analytics를 로드하려면 사용자 정의 \_app에 구성 요소를 직접 포함하고 측정 ID를 전달하십시오.

```js
import { GoogleAnalytics } from "@next/third-parties/google";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-XYZ" />
    </>
  );
}
```

단일 경로에 대해 Google Analytics를 로드하려면 페이지 파일에 구성 요소를 포함하십시오.

<div class="content-ad"></div>

```js
import { GoogleAnalytics } from "@next/third-parties/google";

export default function Page() {
  return <GoogleAnalytics gaId="G-XYZ" />;
}
```

#### 이벤트 전송

sendGAEvent 함수를 사용하여 데이터 레이어 객체를 이용해 페이지에서 사용자 상호작용을 측정할 수 있습니다. 이 함수가 작동하려면 `GoogleAnalytics /` 컴포넌트가 부모 레이아웃, 페이지, 또는 컴포넌트를 포함하거나 동일한 파일에 직접 포함되어 있어야 합니다.

```js
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

Google Analytics 개발자 문서를 참조하여 이벤트 매개변수에 대해 더 알아보세요.

#### 페이지뷰 추적

Google Analytics는 브라우저 히스토리 상태가 변경될 때 자동으로 페이지뷰를 추적합니다. 이는 Next.js 라우트 간 클라이언트 측 탐색이 구성없이 페이지뷰 데이터를 보내게 됨을 의미합니다.

클라이언트 측 탐색이 올바르게 측정되고 있는지 확인하려면 "향상된 측정" 속성이 관리 패널에서 활성화되어 있는지 및 "브라우저 히스토리 이벤트에 따라 페이지 변경" 확인란이 선택되어 있는지 확인하세요.

<div class="content-ad"></div>

> 참고: 페이지뷰 이벤트를 수동으로 보내기로 결정한 경우, 중복 데이터가 생기지 않도록 하기 위해 기본 페이지뷰 측정을 비활성화해야 합니다. 더 많은 정보를 원하시면 Google Analytics 개발자 문서를 참조해 주세요.

#### 옵션

`GoogleAnalytics` 컴포넌트에 전달할 옵션들입니다.

| 이름            | 유형   | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gaId`          | 필수   | 귀하의 <a href="https://support.google.com/analytics/answer/12270356" rel="noopener noreferrer nofollow" target="_blank">측정 ID<span class="inline-flex"><svg class="with-icon_icon__MHUeb" data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:currentColor;width:14px;height:14px"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg></span></a>입니다. 일반적으로 <code>G-</code>로 시작합니다. |
| `dataLayerName` | 선택적 | 데이터 레이어의 이름입니다. 기본값은 <code>dataLayer</code>입니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

<div class="content-ad"></div>

### Google 지도 삽입

GoogleMapsEmbed 구성 요소를 사용하여 페이지에 Google 지도 삽입이 가능합니다. 기본적으로 아래 접힌 상태에서 삽입을 지연로드하기 위해 loading 속성을 사용합니다.

```js
import { GoogleMapsEmbed } from "@next/third-parties/google";

export default function Page() {
  return <GoogleMapsEmbed apiKey="XYZ" height={200} width="100%" mode="place" q="Brooklyn+Bridge,New+York,NY" />;
}
```

#### 옵션

<div class="content-ad"></div>

Google Maps Embed에 전달할 옵션들입니다. 전체 옵션 목록을 보려면 Google Maps Embed 문서를 읽어보세요.

### YouTube 임베드

YouTube 임베드에서 사용할 수 있는 옵션들입니다. 이 컴포넌트는 내부적으로 lite-youtube-embed를 사용하여 더 빠르게 로드됩니다.

<div class="content-ad"></div>

```js
import { YouTubeEmbed } from "@next/third-parties/google";

export default function Page() {
  return <YouTubeEmbed videoid="ogfYd705cRs" height={400} params="controls=0" />;
}
```

#### Options

| Name        | Type     | Description                                                                                                                                                                                                         |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `videoid`   | Required | YouTube video id.                                                                                                                                                                                                   |
| `width`     | Optional | Width of the video container. Defaults to `auto`.                                                                                                                                                                   |
| `height`    | Optional | Height of the video container. Defaults to `auto`.                                                                                                                                                                  |
| `playlabel` | Optional | A visually hidden label for the play button for accessibility.                                                                                                                                                      |
| `params`    | Optional | The video player params defined [here](https://developers.google.com/youtube/player_parameters#Parameters). <br> Params are passed as a query param string. <br> Eg: `params="controls=0&amp;start=10&amp;end=30"`. |
| `style`     | Optional | Used to apply styles to the video container.                                                                                                                                                                        |
