---
title: "Chrome, Firefox, Safari에서 스크롤바 스타일링  브라우저 요소 커스터마이징 방법"
description: ""
coverImage: "/assets/img/2024-07-09-ScrollbarStylinginChromeFirefoxandSafariCustomizingBrowserElements_0.png"
date: 2024-07-09 14:00
ogImage:
  url: /assets/img/2024-07-09-ScrollbarStylinginChromeFirefoxandSafariCustomizingBrowserElements_0.png
tag: Tech
originalTitle: "Scrollbar Styling in Chrome, Firefox, and Safari — Customizing Browser Elements"
link: "https://medium.com/@stheodorejohn/scrollbar-styling-in-chrome-firefox-and-safari-customizing-browser-elements-254c303eceea"
isUpdated: true
---

## 주요 브라우저에서 웹 앱의 스크롤바를 스타일링하고 맞춤화하세요. 사용자 경험을 개선하여 커스텀 스크롤바를 활용하세요. 스크롤링을 더욱 향상하세요! 스타일링 즐기기! #CustomScrollbars #WebDesign

현대의 웹 개발에서는 브라우저 요소의 모양을 사용자 정의하는 것이 인기 있는 트렌드가 되었습니다. 그런 요소 중 하나가 스크롤바인데, 사용자들에게 콘텐츠를 탐색하는 인터랙티브한 방법을 제공합니다. 이 기사에서는 Chrome, Firefox 및 Safari 세 가지 주요 브라우저에서 스크롤바를 스타일링하는 것에 초점을 맞춥니다. 각 브라우저에 특정한 CSS 선택자를 탐구하고 스크롤바의 모양과 느낌을 사용자 정의하는 예시를 제공할 것입니다.

![스크롤바 스타일링 예시](/assets/img/2024-07-09-ScrollbarStylinginChromeFirefoxandSafariCustomizingBrowserElements_0.png)

## Chrome에서 스크롤바 스타일링하기:

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

Google Chrome은 가장 널리 사용되는 브라우저 중 하나이며, 스크롤 막대의 다양한 부분을 대상으로 스타일링하기 위한 CSS 셀렉터를 제공합니다. 다음은 Chrome에 특정한 중요한 셀렉터들입니다:

- ::-webkit-scrollbar: 전체 스크롤바를 대상으로 합니다.
- ::-webkit-scrollbar-thumb: 스크롤바의 드래그할 수 있는 '엄지손가락'을 대상으로 합니다.
- ::-webkit-scrollbar-track: 스크롤바 내 '트랙'을 대상으로 합니다.
- ::-webkit-scrollbar-button: 스크롤바 끝에 있는 버튼을 대상으로 합니다.
- ::-webkit-scrollbar-corner: 수평 및 수직 스크롤바가 만나는 교차점을 대상으로 합니다.

## 파이어폭스에서 스크롤바 스타일링하기:

Mozilla Firefox도 스크롤바를 스타일링하기 위한 CSS 셀렉터를 제공합니다. 그러나 제한된 스타일링 옵션을 얻을 수 있으며, 여기에는 파이어폭스에 관련된 셀렉터들이 있습니다:

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

- scrollbar-color: 스크롤바의 트랙과 버튼의 색상을 설정합니다. 아래 값 중 하나를 가질 수 있습니다.

- auto: 트랙의 기본 플랫폼 렌더링.
- `색상` `색상`: 첫 번째 색상을 버튼에, 두 번째를 트랙에 적용합니다.

2. scrollbar-width: 요소의 스크롤바가 표시될 때 최대 두께를 설정합니다. 픽셀 또는 다른 단위로 너비를 조절할 수 없으며, 아래 값 중 하나를 사용해야 합니다.

- auto: 플랫폼의 기본 스크롤바 너비.
- thin: 기본보다 얇거나 더 얇은 스크롤바의 변형.
- none: 스크롤바 없음 (요소는 여전히 스크롤 가능).

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

## Safari에서 스크롤바 스타일링하기:

Safari, Apple의 기본 브라우저는 스크롤바를 사용자 정의하는 데 사용할 수 있는 고유한 CSS 셀렉터를 제공합니다. 다음은 Safari에 특정한 셀렉터들입니다:

- ::-webkit-scrollbar: 전체 스크롤바를 대상으로 합니다.
- ::-webkit-scrollbar-thumb: 드래그 가능한 슬라이더를 대상으로 합니다.
- ::-webkit-scrollbar-track: 슬라이더 뒤의 트랙을 대상으로 합니다.
- ::-webkit-scrollbar-button: 스크롤바 끝 부분에 있는 버튼을 대상으로 합니다.
- ::-webkit-scrollbar-corner: 수평 및 수직 스크롤바가 만나는 구석을 대상으로 합니다.

예시: 각 브라우저에서 스크롤바를 스타일링하는 방법에 대한 몇 가지 예시를 살펴보겠습니다:

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

```js
.element-with-scroll {
  overflow-y: scroll;
  max-height: 100px; /* 스크롤 가능한 요소의 최대 높이 설정 */
}

/* 파이어폭스에서 스크롤바 스타일링 */
.element-with-scroll {
  scrollbar-color: red green;
  scrollbar-width: thin;
}

/* 크롬과 사파리에서 스크롤바 스타일링 */
.element-with-scroll::-webkit-scrollbar {
  width: 10px;
}

.element-with-scroll::-webkit-scrollbar-thumb {
  background-color: red; /* 크롬과 사파리에서 thumb 색상 설정 */
}

.element-with-scroll::-webkit-scrollbar-track {
  background-color: green; /* 크롬과 사파리에서 track 색상 설정 */
}

/* 선택 사항: 가시성 향상을 위한 몇 가지 스타일링 */
.container {
  max-width: 600px; /* 컨테이너의 최대 너비 설정 */
  margin: 0 auto; /* 컨테이너 가운데 정렬 */
  padding: 20px;
  box-shadow: 0 0 20px grey;
  border-radius: 20px;
}

h3 {
  margin: 5px;
}
```

```js
<div class="container">
  <h3>커스텀 스크롤바 스타일링 데모</h3>

  <div class="element-with-scroll">
    <p>로렘 입숨 돌로르 싯 아메트, 콴센터룸 아더피스칭 엘리트...</p> <!-- 여기에 적절한 한국어 텍스트를 입력하세요 -->
    <p>인터젯르 베히쿨라 디암 우트 벨리트 에게스타스, 아 마티스...</p> <!-- 여기에 적절한 한국어 텍스트를 입력하세요 -->
    <p>퀴스쿼 아우토르 눙시 앰멧 주스토 유이스몧, 유 울트리시스...</p> <!-- 여기에 적절한 한국어 텍스트를 입력하세요 -->
  </div>
</div>
```

## 요약:

스크롤바를 사용자 정의하는 것은 사용자 경험을 향상시키고 웹 애플리케이션에 개성을 더할 수 있습니다. 크롬, 파이어폭스, 사파리에서 제공하는 특정 CSS 셀렉터를 활용하여 스크롤바의 다양한 부분을 디자인 요구사항에 맞게 스타일링할 수 있습니다. 다양한 CSS 속성을 실험하고 웹사이트 전반적인 디자인과 조화를 이루는 시각적으로 매력적인 스크롤바를 만들어보세요.

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

다양한 브라우저에서 스크롤바 스타일을 테스트하여 일관된 예상 결과를 확인하는 것을 잊지 마세요. 창의적인 자유를 누리며 사용자에게 즐거운 스크롤링 경험을 제공해보세요!

위의 글이 더 나은 이해를 돕기를 바라며, 이 글에서 다룬 사항에 대한 질문이나 개선할 점에 대한 의견이 있으면 언제든지 아래에 댓글을 남겨주세요.
