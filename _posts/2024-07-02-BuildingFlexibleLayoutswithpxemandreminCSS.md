---
title: "CSS에서 px, em, rem을 사용하여 유연한 레이아웃 만드는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-02-BuildingFlexibleLayoutswithpxemandreminCSS_0.png"
date: 2024-07-02 21:32
ogImage:
  url: /ui-log-2/assets/img/2024-07-02-BuildingFlexibleLayoutswithpxemandreminCSS_0.png
tag: Tech
originalTitle: "Building Flexible Layouts with px, em, and rem in CSS"
link: "https://medium.com/techverito/building-flexible-layouts-with-px-em-and-rem-in-css-c9ca70db3a41"
---

![image](/ui-log-2/assets/img/2024-07-02-BuildingFlexibleLayoutswithpxemandreminCSS_0.png)

웹 페이지를 CSS로 스타일링할 때는 측정 단위를 이해하는 것이 중요합니다. 세 가지 일반적인 단위는 px, em, rem입니다. 각각의 특징과 사용 사례가 있습니다. 이 블로그에서는 실제 예제와 함께 이러한 단위를 살펴보고 효과적으로 사용하는 방법을 이해하는 데 도움이 될 것입니다.

## 픽셀 (px)

px 단위는 화면의 가장 작은 측정 단위인 픽셀을 나타냅니다. 픽셀은 절대 단위로, 다른 설정과 관계없이 동일한 크기를 유지합니다.

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

예시: 고정된 버튼

```js
.button {
  height: 60px;
  background-color: red;
  color: white;
}
```

위의 예시에서 버튼은 항상 60픽셀의 높이를 가지며 안정적이고 예측 가능한 레이아웃을 제공합니다.

## Ems (em)

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

테이블 태그를 마크다운 형식으로 변경해보세요.

예시: 버튼 내 패딩을 스케일 가능하게 만들기

버튼에 폰트 크기에 따라 조정되는 패딩이 있는 경우를 생각해봅시다. 만약 폰트 크기가 변한다면, 패딩은 비례적으로 조정되어 버튼의 디자인의 일체성을 유지합니다.

```js
.button {
  font-size: 18px; // 버튼의 폰트 크기를 18px로 가정합니다;
  padding: 0.5em 1em; // 세로 패딩은 9px, 가로 패딩은 18px;
}
```

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

여기서는 버튼의 글꼴 크기가 변경되면 패딩 값도 변경됩니다. 이렇게 함으로써 패딩이 텍스트 크기에 비례하도록 보장합니다.

## 루트 Ems (rem)

rem 유닛은 em과 유사하지만 부모 요소가 아닌 루트 요소(일반적으로 `html` 요소)에 상대적인 크기를 갖습니다. 이로써 rem 유닛은 항상 루트 글꼴 크기로 되돌아가기 때문에 문서 전체에서 일관성을 유지합니다.

예시: 모든 섹션에 일관된 여백

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

웹 사이트의 모든 섹션에 일관된 마진을 루트 글꼴 크기를 기반으로 적용하여 부모 요소의 글꼴 크기와 관계없이 균일한 간격을 보장하고 싶다면 아래와 같이 설정할 수 있습니다.

```js
html {
  font-size: 16px; // 문서의 기본 글꼴 크기
}

.section {
  margin: 2rem;  // 루트 글꼴 크기의 2배, 따라서 16x2 = 32px;
}
```

## 각 단위를 사용하는 시기

- px: 고정된 정확한 크기가 필요한 요소에 사용합니다 (예: 테두리, 고정 크기 컨테이너).
- em: 자신의 글꼴 크기에 비례하여 조절되어야 하는 패딩이나 마진과 같은 요소에 사용합니다.
- rem: 중첩이나 상속 여부에 관계없이 일관된 크기를 유지해야 하는 여백, 패딩 또는 글꼴 크기에 이상적이며 전체 문서에 대해 일관성 있는 크기를 유지하는 데 사용됩니다.

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

## 결론

px, em 및 rem 간의 차이를 이해하면 CSS 기술을 크게 향상시키고 더 반응형이며 유연한 디자인을 만들 수 있습니다. 각 단위를 언제 사용해야 하는지 알면 웹 페이지가 어떤 기기에서나 어떤 조건에서도 멋지게 보이도록 할 수 있습니다.

CSS 값 및 단위에 대한 자세한 가이드는 이 MDN 웹 문서 기사를 확인해보세요.

코딩하세요! ⌨️
