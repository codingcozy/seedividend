---
title: "JavaScript, CSS, React로 시스템 테마 감지하기 완벽 가이드"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-DetectingsystemthemeinJavaScriptCSSReact_0.png"
date: 2024-07-09 18:00
ogImage:
  url: /assets/img/2024-07-09-DetectingsystemthemeinJavaScriptCSSReact_0.png
tag: Tech
originalTitle: "Detecting system theme in JavaScript   CSS   React"
link: "https://medium.com/hypersphere-codes/detecting-system-theme-in-javascript-css-react-f6b961916d48"
---

시스템 테마를 prefers-color-scheme 및 matchMedia를 사용하여 감지합니다.

또한, 이 기사의 내용을 내 YouTube 채널에서도 확인할 수 있습니다:

다크 테마는 점점 더 인기를 얻고 있습니다. Android 9+, macOS Mojave 10.14, 그리고 iOS 13에서 다크 시스템 변형이 소개되면서, 점점 더 많은 앱과 웹 사이트가 자신들의 인터페이스에 다크 버전을 제공하기 시작했습니다. 일부는 버전 간에 전환하는 옵션을 제공하지만, CSS 또는 JavaScript를 사용하여 테마를 감지하는 것도 가능합니다. 다음 튜토리얼에서, 필요에 따라 이를 사용하는 방법과 React 프레임워크와 함께 사용하는 방법을 보여드리겠습니다.

# CSS에서 테마 감지하기

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

CSS에서 다크 테마를 감지하려면 prefers-color-scheme 미디어 피처를 사용할 수 있습니다. 이를 사용하여 사용자가 시스템에 선택한 라이트 또는 다크 테마 중 하나를 대상으로 할 수 있습니다.

prefers-color-scheme의 브라우저 지원에 대한 자세한 정보는 Can I Use 웹 사이트에서 확인할 수 있습니다.

# JS에서 테마 감지하기

JavaScript에서 라이트 또는 다크 테마를 감지하려면 matchMedia 함수를 사용할 수 있습니다. 이 함수를 사용하면 CSS 미디어 쿼리가 충족되었는지 프로그래밍적으로 확인할 수 있습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이 코드 조각을 사용하면 사용자가 설정한 테마를 쉽게 감지할 수 있어요. 코드는 시스템 테마를 한 번 확인하고 테마의 동적 변경에는 반응하지 않습니다(수동으로는 물론, 테마는 시간에 따라 자동으로 변경될 수도 있어요). 최상의 사용자 경험을 제공하려면 변경에 반응하여 레이아웃을 변경해야 해요. 다행히 matchMedia 호출의 결과인 MediaQueryList 객체는 .addListener 메서드를 가지고 있어요. 이를 통해 미디어 쿼리 결과가 변경될 때마다 실행되는 콜백을 제공할 수 있어요.

matchMedia에 대한 브라우저 지원 정보는 Can I Use 웹사이트에서 찾을 수 있어요.

# React에서 테마 감지하기

React(`16.8)에서는 테마가 어두운지 아닌지를 나타내는 사용자 정의 훅을 만들 수 있어요.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

우리는 그런 다음 다음과 같은 방식으로 어떤 구성 요소에서든 사용할 수 있습니다:

## 컬러 스키마 디버깅

당신의 페이지를 위해 다크 테마를 개발할 때, 당신은 페이지가 어떻게 렌더링되는지 확인하기 위해 밝은 변형과 어둡고 밝은 변형 사이를 왔다갔다하고 싶을 것입니다. 시스템 수준에서 전환하는 것은 상당히 시간이 많이 소요될 수 있습니다 - 전체 절차가 꽤 지루할 수 있습니다. 다행히도 Safari, Chrome 및 Firefox는 개발자 도구에서 prefers-color-scheme 값을 에뮬레이션할 수 있습니다.

## Chrome에서 prefers-color-scheme 에뮬레이션

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

![이미지](/ui-log-2/assets/img/2024-07-09-DetectingsystemthemeinJavaScriptCSSReact_0.png)

Chrome에서는 Rendering 탭에서 옵션을 찾을 수 있습니다. Rendering 탭은 오른쪽 상단의 추가 메뉴에서 More Tools 아래에 위치합니다.

# Safari에서 prefers-color-scheme 모방하기

![이미지](/ui-log-2/assets/img/2024-07-09-DetectingsystemthemeinJavaScriptCSSReact_1.png)

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

사파리에서 웹 검사 도구에는 다크 모드 또는 라이트 모드를 전환할 수 있는 버튼이 포함되어 있습니다.

# 파이어폭스에서 prefers-color-scheme을 흉내 냄

![image](/ui-log-2/assets/img/2024-07-09-DetectingsystemthemeinJavaScriptCSSReact_2.png)

파이어폭스에서는 about:config 탭을 사용하여 테마를 변경할 수 있습니다. 해야 할 일은 Number 유형의 ui.systemUsesDarkTheme 새 속성을 추가하는 것뿐입니다. 값이 1이면 파이어폭스를 다크 테마로 설정합니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# Cypress에서 다크 모드 테스트 중

Cypress 테스트에서 브라우저의 테마도 변경할 수 있어요. 그 덕분에 페이지가 밝은 모드와 어두운 모드에서 어떻게 동작하는지 테스트할 수 있고, 접근성 색상 테스트 같은 것도 할 수 있어요. 이에 대해 더 자세히 알고 싶다면, Cypress 블로그에 발행된 훌륭한 기사 '다크 모드에서 웹 앱 테스트하기'를 확인하는 걸 추천해요.
