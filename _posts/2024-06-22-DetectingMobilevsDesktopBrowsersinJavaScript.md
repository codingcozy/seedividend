---
title: "자바스크립트로 모바일 vs 데스크탑 브라우저 감지하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-DetectingMobilevsDesktopBrowsersinJavaScript_0.png"
date: 2024-06-22 14:50
ogImage:
  url: /assets/img/2024-06-22-DetectingMobilevsDesktopBrowsersinJavaScript_0.png
tag: Tech
originalTitle: "Detecting Mobile vs. Desktop Browsers in JavaScript"
link: "https://medium.com/geekculture/detecting-mobile-vs-desktop-browsers-in-javascript-ad46e8d23ce5"
isUpdated: true
---

<img src="/assets/img/2024-06-22-DetectingMobilevsDesktopBrowsersinJavaScript_0.png" />

사용자가 어떤 기기에서 브라우징하는지 탐지하는 것은 모바일 또는 데스크톱 장치에 콘텐츠를 최적화하거나 장치별 기능과 호환성을 보장하며 전체 사용자 경험을 향상시키는 다양한 이유로 매우 중요합니다. 이 기사에서는 JavaScript를 사용하여 모바일과 데스크톱 브라우저를 감지하는 다양한 기술에 대해 논의하고 장단점을 살펴보겠습니다.

# 사용자 에이전트 문자열 감지

사용자 에이전트 문자열은 브라우저가 서버로 보내는 정보 조각으로, 브라우저, 버전 및 운영 체제에 대한 세부 정보를 제공합니다. JavaScript에서 navigator.userAgent 속성을 사용하여 사용자 에이전트 문자열에 액세스할 수 있습니다. 사용자 에이전트 문자열을 구문 분석하여 사용자가 모바일 장치인지 데스크톱 장치인지 결정할 수 있습니다.

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

모바일 기기를 감지하는 일반적인 방법 중 하나는 사용자 에이전트 문자열에서 특정 키워드를 찾기 위해 정규 표현식(regex)을 사용하는 것입니다. 간단한 예제를 살펴봅시다:

```js
function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

if (isMobile()) {
  console.log("모바일 기기를 감지했습니다");
} else {
  console.log("데스크톱 기기를 감지했습니다");
}
```

사용자 에이전트 문자열 감지는 비교적 간단하게 구현할 수 있지만, 여러 제한 사항이 있습니다:

- 사용자 에이전트 문자열에 특정 키워드가 의존되므로 시간이 지남에 따라 변경되거나 특정 기기에 누락될 수 있습니다.
- 일부 브라우저에서 사용자가 사용자 에이전트 문자열을 변경할 수 있어 정확한 감지를 방해할 수 있습니다.
- 사용자 에이전트 문자열 감지는 새로운 기기와 브라우저가 정기적으로 출시되므로 미래지향적이지 않을 수 있습니다.

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

# 기능 감지

사용자 에이전트 문자열 감지의 대안은 모바일 또는 데스크톱 장치에 고유한 장치 기능을 확인하는 것입니다. 터치 기능이 그 중 하나입니다. JavaScript를 사용하여 다음 코드로 터치 지원을 감지할 수 있습니다.

```js
function hasTouchSupport() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

if (hasTouchSupport()) {
  console.log("모바일 장치 감지됨");
} else {
  console.log("데스크톱 장치 감지됨");
}
```

이 방법은 사용자 에이전트 문자열 감지보다 더 신뢰할 수 있지만 완벽하지는 않습니다. 일부 데스크톱 장치인 터치스크린 노트북과 같은 장치가 오류로 모바일 장치로 잘못 식별될 수 있습니다.

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

다른 기능 기반 접근 방법은 기기의 화면 크기와 해상도를 감지하는 것입니다. 모바일 기기는 일반적으로 데스크톱 기기와 비교해 화면이 작고 해상도가 낮습니다. 윈도우 크기와 해상도를 확인할 수 있습니다. 이를 위해서 window.innerWidth, window.innerHeight, window.devicePixelRatio 및 screen.width 속성을 사용할 수 있습니다. 여기에 예시가 있습니다:

```js
function isMobile() {
  const minWidth = 768; // 데스크톱 기기의 최소 너비
  return window.innerWidth < minWidth || screen.width < minWidth;
}

if (isMobile()) {
  console.log("모바일 기기 감지");
} else {
  console.log("데스크톱 기기 감지");
}
```

이 방법에도 일부 제한이 있습니다. 예를 들어, 데스크톱 기기에서 브라우저 창의 크기를 조정하는 경우 false positive(잘못된 양성)로 이어질 수 있습니다. 게다가, 모바일 기기의 화면 크기와 해상도가 계속 증가함에 따라 이 방법은 더 이상 정확하지 않을 수 있습니다.

# 검출을 위한 라이브러리 사용

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

모바일 감지(Mobile Detect)는 사용자 에이전트 문자열을 구문 분석하여 모바일 장치를 식별하기 위한 깨끗한 API를 제공하여 장치 감지를 간단하게 하는 인기 있는 JavaScript 라이브러리입니다. 다음과 같이 사용할 수 있습니다:

```js
import MobileDetect from "mobile-detect";

const md = new MobileDetect(navigator.userAgent);
if (md.mobile()) {
  console.log("모바일 장치 감지됨");
} else {
  console.log("데스크톱 장치 감지됨");
}
```

Bowser는 사용자 에이전트 문자열을 구문 분석하고 장치 감지를 제공하는 다른 라이브러리입니다. 브라우저, 운영 체제 및 장치 유형에 대한 추가 정보도 제공합니다. 다음은 예시입니다:

```js
import Bowser from "bowser";

const parser = Bowser.getParser(navigator.userAgent);
if (parser.getPlatformType() === "mobile") {
  console.log("모바일 장치 감지됨");
} else {
  console.log("데스크톱 장치 감지됨");
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

Platform.js는 사용자 에이전트 문자열을 파싱하여 브라우저, 운영 체제 및 기기 유형에 대한 정보를 제공하는 가벼운 라이브러리입니다. 다음과 같이 사용할 수 있습니다:

```js
import platform from "platform";

if (platform.isMobile) {
  console.log("모바일 기기가 감지되었습니다");
} else {
  console.log("데스크톱 기기가 감지되었습니다");
}
```

# 최선의 실천 방법

- 가능한 경우 사용자 에이전트 문자열 감지보다 기능 감지를 선호하세요. 이는 더 신뢰할 수 있고 미래에 대비할 수 있습니다.
- 감지를 간단히하고 정확도를 향상시키기 위해 라이브러리를 사용하세요.
- 보다 견고한 감지를 위해 여러 기술을 결합하세요.
- 새로운 기기 및 브라우저와의 호환성을 보장하기 위해 감지 코드를 지속적으로 테스트하고 업데이트하세요.

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

# 결론

이 글에서는 JavaScript를 사용하여 모바일과 데스크톱 브라우저를 감지하는 다양한 기술에 대해 논의했습니다. 사용자 에이전트 문자열 감지, 기능 감지 및 라이브러리 기반 감지를 포함합니다. 각 기술에는 장단점이 있으며 완벽한 방법은 없습니다. 도움이 되었기를 바랍니다.

읽어 주셔서 감사합니다. 다음 글에서 만나기를 기대합니다.

Medium 회원이 아니세요? 여기에서 지원해 주세요.
