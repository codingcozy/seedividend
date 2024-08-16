---
title: "웹 폰트 파일 자체 호스팅하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Self-Hosting Web Font Files"
link: "https://medium.com/going-fullstack/self-hosting-web-font-files-6a46bfc36ffd"
isUpdated: true
---





## 웹 폰트를 CSS @font-face 규칙으로 로드하여 다른 정적 웹 사이트 파일 (CSS, 이미지 등)과 함께 호스팅할 수 있습니다.

웹 폰트는 웹 상에서 타이포그래피를 크게 향상시켰습니다. 웹 폰트가 등장하기 전에는 웹 안전 폰트 몇 가지로만 제한되어 있어 웹사이트의 텍스트가 모든 기기에서 의도한 대로 표시될 수 있도록 보장했습니다. 여전히 웹 안전 폰트를 사용할 수 있고 종종 대안 옵션으로 사용하지만, 이제 사용자 지정 웹 폰트를 사용할 유연성을 갖게 되었습니다. 사용자 지정 웹 폰트를 이용하면 사용자가 웹사이트를 방문할 때 기기가 해당 폰트 파일을 다운로드합니다.

![Self-HostingWebFontFiles_0](/assets/img/Self-HostingWebFontFiles_0.png)

# 웹 폰트와 성능

<div class="content-ad"></div>

셀프 호스팅에 뛰어들기 전에, 웹 폰트를 호스팅하는 가장 효율적인 방법은 보통 폰트 저장소의 CDN을 사용하는 것이라는 것을 강조해야 한다고 생각해요. Google Fonts와 같은 폰트 저장소는 브라우저의 능력에 따라 가능한 가장 작은 폰트 파일을 제공하기 위해 폰트 전달 로직을 심하게 최적화하죠. 이로써 귀하가 로직을 직접 구현할 필요 없이 사용자에게 혜택을 주실 수 있어요.

폰트를 빠르게 전달하는 것은 중요한데, 폰트를 다운로드할 때까지 페이지가 제대로 표시되지 않을 수 있기 때문이에요. 폰트를 다운로드하는 데 걸리는 시간은 웹사이트가 얼마나 빨리 표시되는지에 영향을 미치며, 폰트 파일이 너무 오래 걸리면 스타일이 적용되지 않은 콘텐츠의 깜박임(FOUC로 일컬어짐)이 발생할 수 있어요.

![스타일이 적용되지 않은 콘텐츠의 깜박임 예시](https://miro.medium.com/v2/resize:fit:1400/0*ZnuSj97ui2QvYVqm.gif)

스타일이 적용되지 않은 콘텐츠의 깜박임 예시입니다. 텍스트가 먼저 `sans-serif`를 위한 폴백 시스템 폰트로 로드되고, 준비가 끝나면 Dancing Script 폰트로 교체됩니다.

<div class="content-ad"></div>

만약 성능이 주요 관심사이고 Google Fonts를 사용 중이라면, 2022년에 Google Fonts를 더 빠르게 만드는 Sia Karamalegos의 글을 확인하는 것을 추천합니다. 여기에는 Google Fonts CDN을 최적화하는 데 많은 유용한 팁이 있습니다.

# 웹 폰트를 자체 호스팅하는 이유

성능은 중요하지만 때로는 성능을 다른 목표와 균형있게 유지해야 할 때가 있습니다. 예를 들어, 유럽 연합(EU) 지역 사용자들로부터 트래픽이 발생하는 웹 사이트를 작업 중이라면, Google Fonts가 사용자 데이터를 수집하므로 EU의 일반 데이터 보호 규정(GDPR) 요건을 충족하지 못하므로 자체 웹 폰트를 호스팅하는 것이 가장 좋을 수 있습니다. 또는 오프라인으로 사용할 수 있는 웹 애플리케이션을 작업하고 있으며 웹 폰트 파일이 어떻게 캐시되는지에 대해 더 정교한 제어가 필요한 경우가 있을 수 있습니다. 이러한 상황에서는 웹 폰트를 자체 호스팅하는 것이 최선의 방법일 수 있습니다.

본문의 제목을 고려하면, 글꼴 파일을 자체 호스팅하는 방법을 배우려고 이곳에 오신 것으로 가정합니다. 그러니 이제 어떻게 진행해야 하는지 알아보겠습니다!

<div class="content-ad"></div>

# 웹 글꼴을 직접 호스팅하는 방법

글꼴 파일을 호스팅하려면 글꼴 저장소에서 글꼴 파일을 다운로드하여 서버의 공개 액세스 가능한 폴더에 저장하고 CSS @font-face 규칙을 사용하여 참조해야 합니다.

자체 호스팅하는 Google 글꼴을 통해 프로세스를 진행해 보겠습니다. 예를 들어, Dancing Script 글꼴을 사용해 보겠습니다. 다른 저장소에서 글꼴을 사용하는 경우, 2단계부터 시작합니다.

## 단계 1: 글꼴 다운로드

<div class="content-ad"></div>

Google Fonts 폰트 페이지 상단으로 이동하여 "패밀리 다운로드" 버튼을 클릭하세요. 이를 클릭하면 선택한 폰트에 대한 모든 폰트 파일이 .ttf (TrueType) 파일로 된 .zip 폴더가 기기로 다운로드됩니다.

참고: Google Fonts는 다운로드용 TrueType 폰트 파일만 제공합니다. TrueType 폰트는 브라우저에서 널리 지원되며 자체적으로 잘 작동하지만, WOFF 및 WOFF2 파일처럼 압축되어 있지 않기 때문에 다운로드에 더 많은 시간이 소요될 수 있습니다. 폰트 다운로드 시간을 더욱 줄이려면 google-webfonts-helper를 사용하여 선택한 Google Fonts용 다른 폰트 파일 유형을 얻을 수 있습니다. 예를 들어, Dancing Script를 위해 google-webfonts-helper를 사용하여 WOFF2 파일 몇 개를 다운로드하여 한 폰트에 대한 여러 파일 유형을 구성하는 방법을 예시로 설명하겠습니다.

![이미지 설명](/assets/img/Self-HostingWebFontFiles_2.png)

## 단계 2: 웹사이트로 폰트 파일 복사하기

<div class="content-ad"></div>

귀하의 웹사이트에 .ttf 파일(그리고 기타 폰트 파일 형식)을 포함하는 폴더로 복사하십시오. Gatsby.js와 같은 프레임워크를 사용하는 경우, 폰트 파일을 다른 정적 파일과 마찬가지로 취급해야하며 JavaScript에서도 폰트 파일을 가져와야 할 수 있습니다.

## 단계 3: 웹 폰트를 로드하고 참조하기 위해 @font-face Rules 추가

CSS 파일 상단에 다음과 같이 @font-face rule을 추가하십시오. src 속성이 폰트 파일의 위치를 참조하는지 확인하십시오.

```js
@font-face {
  font-family: "Dancing Script";
  font-style: normal;
  font-weight: 400;
  src:
    url(/fonts/dancing-script-v25-latin-regular.woff2) format("woff2"),
    url(/fonts/DancingScript-Regular.ttf) format("truetype");
}
```

<div class="content-ad"></div>

브라우저가 글꼴이 필요할 때는, 성공적으로 로드할 수 있는 첫 번째 원본을 사용합니다. 지원하지 않는 형식이 있다면 해당 원본을 건너뛰고 다음 원본을 로드하려고 시도할 것입니다. 따라서 가장 작은 형식을 먼저 넣는 것이 일반적으로 성능 면에서 가장 좋습니다.

필요한 각 글꼴 굵기와 스타일에 대해 위의 CSS를 반복합니다.

```js
@font-face {
  font-family: "Dancing Script";
  font-style: normal;
  font-weight: 700;
  src: url(/fonts/DancingScript-Bold.ttf) format("truetype");
}
```

## 단계 5: 웹 폰트 사용하기

<div class="content-ad"></div>

이제 다른 글꼴과 마찬가지로 웹 폰트를 참조하여 사용할 수 있어요. 웹 브라우저는 글꼴 패밀리, 무게 및 스타일의 조합에 따라 어떤 글꼴 파일을 사용할지 알게 될 거예요.

```js
body {
  font-family: "Dancing Script", cursive;
  font-weight: 400;
  text-align: center;
}
```

글꼴은 페이지 상의 요소에 적용된 CSS 규칙에 사용되는 font-family 속성을 통해 참조될 때에만 로드됩니다. 페이지의 요소 중에 웹 글꼴을 사용하지 않는 경우에는 로드되지 않아요.

보다 복잡한 글꼴의 경우, @font-face 규칙을 사용하여 설정할 수 있는 추가 글꼴 속성이 있어요.

<div class="content-ad"></div>

# 완전한 예시

다음은 몇 가지 Dancing Script 글꼴이 구성된 CodeSandbox입니다:

# 글꼴 설정 테스트

이제 웹 글꼴을 설정했으므로 브라우저가 웹 페이지를 렌더링할 때 실제로 사용하는지 확인해야 합니다. Chrome 개발자 도구를 사용하여 이를 확인할 수 있습니다. 아래 기술은 로컬 호스트와 라이브 웹사이트에서 모두 작동합니다.

<div class="content-ad"></div>

- 크롬에서 웹 글꼴을 사용하는 웹페이지로 이동하세요.
- 웹 글꼴을 사용하는 텍스트 중 하나를 마우스 오른쪽 버튼으로 클릭하고 컨텍스트 메뉴에서 “검사”를 선택합니다.
- 개발 도구가 "Elements" 탭이 표시된 상태로 열립니다. 오른쪽에서 “Computed” 탭을 선택합니다.
- 하단으로 스크롤하면 “Rendered Fonts” 섹션이 나타납니다. 웹 글꼴을 사용 중이라면 “Rendered Fonts” 머릿글 아래에 웹 글꼴의 이름이 표시됩니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*3Iy8v2XjCe_ko_PEKAIuuQ.gif)

# 대체 글꼴 테스트하기

브라우저는 웹사이트를 로드할 때 웹 글꼴을 다운로드합니다. 그래서 대부분의 경우 사용자들은 의도한 대로 웹사이트의 텍스트와 디자인을 볼 수 있습니다. 그러나 기술 분야에서 모든 일이 그렇지만 "행복한 경로"를 경험하는 사람들은 모두가 아닙니다. 예를 들어 브라우저가 웹 글꼴 대신 대체 옵션을 사용할 수도 있습니다.

<div class="content-ad"></div>

- 웹 폰트 호스팅 서비스가 다운되었습니다
- 웹 폰트 다운로드 시간이 너무 오래 걸립니다
- 사용자가 오프라인 상태입니다
- (가능한 미래 시나리오) 사용자가 시스템 설정을 통해 prefers-reduced-data를 true로 설정했습니다\*

일부 사용자들이 웹 폰트 없이 사이트를 볼 수 있기 때문에 대체 폰트로 디자인이 의도한 대로 나타나는지 테스트하고 확인하는 것이 중요합니다. 위 예제를 기반으로 대체 폰트로 디자인을 테스트할 수 있습니다.

- 개발 도구에서 "Computed" 탭을 "Styles"로 변경합니다.
- 선택한 텍스트 요소의 글꼴을 찾고 웹 폰트 목록에서 제거합니다.
- 사이트의 텍스트가 변경되는 것을 알 수 있으며, 다시 "Computed" 탭으로 돌아가면 "Rendered Fonts" 아래에 다음 대체 폰트(특정 글꼴을 지정한 경우) 또는 시스템의 기본 글꼴(일반적인 글꼴인 경우, 예: sans-serif)이 표시됩니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*tPcI8DGi7VJ3eNQvRDV2QQ.gif)

<div class="content-ad"></div>

- 몇 년 전에 prefers-reduced-data CSS 미디어 쿼리가 제안되었지만 아직 어디에도 구현되지 않았습니다. 미래에 구현된다면 사용자가 데이터를 줄이길 원하는 경우 웹 폰트를 로드하지 않는 한 가지 방법이 될 수 있습니다.

# 폰트를 자체 호스팅할 때 성능 향상

파일을 자체 호스팅하는 것이 항상 가장 효율적인 방법은 아닐 수 있지만 성능 최적화를 할 수 있습니다.

## 가능한 경우 WOFF2 파일 사용하기

<div class="content-ad"></div>

WOFF2 파일 형식은 WOFF보다 30% 압축률이 향상되며 TTF 파일과 동일한 메타데이터를 제공하며 현대 브라우저에서 널리 지원됩니다. 또한 Google Fonts는 .ttf 파일만 직접 다운로드로 제공하지만 위에서 설명한 대로 .woff2 파일을 얻는 방법이 있습니다.

만약 글꼴에 대해 여러 파일 형식을 가지고 있다면, CSS의 @font-face 규칙에서 첫 번째 src 옵션으로 가장 작은 파일 형식을 설정해야 합니다. 브라우저는 성공적으로 구문 분석할 수 있는 첫 번째 src를 로드할 것입니다.

## 문자의 일부만 로드하기

일반적으로 글꼴은 다양한 필요를 커버하기 위한 문자와 함께 제공되지만 웹사이트에서 모두 사용하지 않을 수 있습니다. 글꼴에서 문자의 일부만 필요하다는 것을 알 경우, @font-face 규칙의 unicode-range 속성을 사용하여 로드 및 페이지에서 사용 가능한 문자 범위를 지정할 수 있습니다.

<div class="content-ad"></div>

아래 예시에서 unicode-range는 브라우저에게 해당 폰트의 라틴 문자만 로드하도록 지시합니다.

```js
@font-face {
  font-family: "Dancing Script";
  font-style: normal;
  font-weight: 700;
  src: url(/fonts/DancingScript-Bold.ttf) format("truetype");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

문자의 하위 집합을 로드하는 것이 모두를 로드하는 것보다 빠릅니다. 페이지에서 unicode-range에 있는 문자를 사용하지 않는다면, 브라우저는 해당 폰트를 아예 로드하지 않을 것입니다.

## font-display 속성 설정

<div class="content-ad"></div>

폰트 표시 CSS 속성은 브라우저가 폰트를 다운로드하고 준비하는 시점에 따라 폰트를 어떻게 표시할지를 지정합니다. 기본값은 auto로, 이는 브라우저의 사용자 에이전트가 선호하는대로 동작합니다. block, swap, fallback 옵션은 웹 폰트 표시 처리 방식을 브라우저에게 알려줍니다. 각 옵션은 웹 폰트 다운로드를 기다리는 동안 일정 시간 동안 페이지 렌더링을 차단하지만 다른 정도로 동작합니다. swap 옵션은 웹 폰트가 렌더링될 가능성을 최대화해주지만, 폰트 로드 시간에 따라 스타일이 적용되지 않은 콘텐츠가 표시될 수 있습니다. fallback 옵션은 폰트 교체에 사용할 시간을 줄이지만(페이지가 로드된 후의 레이아웃 변경을 줄임), 웹 폰트가 렌더링되지 않을 가능성이 높아집니다. 다양한 옵션을 시도해보고 필요에 맞는 것을 선택해보세요.

```js
@font-face {
  font-family: "Dancing Script";
  font-style: normal;
  font-weight: 400;
  src:
    url(/fonts/dancing-script-v25-latin-regular.woff2) format("woff2"),
    url(/fonts/DancingScript-Regular.ttf) format("truetype");

  /* 브라우저에게 웹 폰트 다운로드를 기다리고 대체 폰트를 표시하기 전에 얼마나 오래 기다릴지를 설정하는 속성
     https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
  */
  font-display: swap;
}
```

## size-adjust 속성 설정하기

size-adjust 속성은 글리프 윤곽 및 다른 폰트 메트릭에 사용할 퍼센트 값을 지정합니다. 대체 폰트와 웹 폰트 간의 교체 시 레이아웃 변화를 줄이는 데 도움이 됩니다. 퍼센트 값은 웹 폰트 글리프의 ex 높이를 대체 폰트의 ex 높이로 조정하는 데 필요한 값을 나타냅니다. size-adjust 속성을 설정하면 폰트 성능 자체는 향상되지 않지만, 폰트 교체가 덜 눈에 띄도록 하여 지각되는 성능을 향상시킬 수 있습니다.

<div class="content-ad"></div>

```js
@font-face {
  font-family: "Dancing Script";
  font-style: normal;
  font-weight: 400;
  src:
    url(/fonts/dancing-script-v25-latin-regular.woff2) format("woff2"),
    url(/fonts/DancingScript-Regular.ttf) format("truetype");
  size-adjust: 90%;
}
```

원문은 https://rebeccamdeprey.com에서 확인할 수 있습니다.
