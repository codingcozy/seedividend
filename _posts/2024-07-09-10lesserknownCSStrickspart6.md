---
title: "잘 알려지지 않은 CSS 트릭 10가지 파트 6"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-10lesserknownCSStrickspart6_0.png"
date: 2024-07-09 17:58
ogImage:
  url: /assets/img/2024-07-09-10lesserknownCSStrickspart6_0.png
tag: Tech
originalTitle: "10 lesser known CSS tricks part 6"
link: "https://medium.com/@creativebyte/10-lesser-known-css-tricks-part-6-a0f89071083a"
---

<img src="/ui-log-2/assets/img/2024-07-09-10lesserknownCSStrickspart6_0.png" />

10가지 잘 알려지지 않은 CSS 트릭 중 6번째 파트에 오신 것을 환영합니다. 이미 설레임을 느끼고 계실지도 모르겠지만, 처음 오신 분이라면 이전 게시물을 아직 보지 않으셨다면... 안녕하세요! 웹 디자인의 실력을 향상시키는 데 도움이 되는 10가지 잘 알려지지 않은 CSS 트릭 목록을 만들었습니다. (지금까지 50가지를 소개했고, 이후에는 60가지 트릭 모음이 생기게 됩니다.)

## 01. 창의적인 오버레이에 대한 믹스 블렌드 모드

요소에 믹스 블렌드 모드를 사용하여 블렌딩 모드를 적용하여 요소를 겹쳤을 때 흥미로운 시각적 효과를 만들어내세요.

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

```js
.overlay {
  mix-blend-mode: overlay;
}
```

## 02. Styling broken images

`:broken` 가상 클래스를 사용하여 깨진 이미지에 스타일을 적용합니다.

```js
img:broken {
  filter: grayscale(100%);
}
```

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

## 03. CSS 모양

모양 외부 속성을 사용하여 CSS 모양을 만들어보세요.

```js
.shape {
  shape-outside: circle(50%);
}
```

## 04. 부분 문자열 일치를 위한 속성 선택자

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

부분 일치하는 내용을 찾기 위해 \*= 연산자를 사용한 속성 선택자를 사용하세요.

```js
[data-attribute*="value"] {
  /* 스타일 */
}
```

## 05. 흐린 배경을 위한 배경 필터

유리에 얼음이 꽂힌 효과를 만들기 위해 backdrop-filter를 사용하여 배경에 흐린 효과를 적용하세요.

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

```css
.element {
  backdrop-filter: blur(10px);
}
```

## 06. CSS 환경 변수

CSS에서 env() 함수를 사용하여 환경 변수에 액세스하세요.

```css
.element {
  margin-top: env(safe-area-inset-top);
}
```

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

## 07. CSS 속성 카운터

:nth-child 선택자를 사용하여 특정 속성 값의 발생 횟수를 계산합니다.

```js
[data-category="example"]:nth-child(3) {
  /* 세 번째 발생에 대한 스타일 */
}
```

## 08. 텍스트 래핑에 대한 CSS 모양

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

정밀한 텍스트 래핑을 위해 다각형(polygon()) 함수와 함께 shape-outside를 사용하세요.

```js
.text-wrap {
  shape-outside: polygon(0 0, 100% 0, 100% 100%);
}
```

## 09. 사용자 지정 커서 스타일

커서 속성을 사용하여 커서 스타일을 변경하세요.

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

```js
.custom-cursor {
  cursor: pointer;
}
```

## 10. 투명 색상을 위한 HSLA

HSLA 값 사용하여 투명 색상을 지정하면 알파 채널을 더 쉽게 제어할 수 있어요.

```js
.transparent-bg {
  background-color: hsla(120, 100%, 50%, 0.5);
}
```
