---
title: "알아두면 쓸모 있는 잘 알려지지 않은 CSS 속성 10가지 - 파트 2"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-10lesserknownCSSpropertiespart2_0.png"
date: 2024-07-09 18:16
ogImage:
  url: /assets/img/2024-07-09-10lesserknownCSSpropertiespart2_0.png
tag: Tech
originalTitle: "10 lesser known CSS properties part 2"
link: "https://medium.com/@creativebyte/10-lesser-known-css-properties-part-2-2414b8df4278"
---

![이미지](/ui-log-2/assets/img/2024-07-09-10lesserknownCSSpropertiespart2_0.png)

파트 2에 오신 것을 환영합니다! 이것은 제가 들어보지 못했거나 사용해보지 않은 CSS 속성들의 컬렉션입니다. 여러분에게도 새로운 정보가 되길 바랍니다!

# 01 outline-offset

outline-offset 속성은 요소의 아웃라인과 테두리 사이의 간격을 제어할 수 있어서, 아웃라인을 스타일링할 때 정밀도를 제공합니다.

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
button {
  outline: 2px solid #3498db;
  outline-offset: 4px;
}
```

# 02 counter-increment 및 counter-reset

이러한 속성들은 내용에서 요소들을 번호 매기기 위한 동적 카운터 생성에 사용됩니다. counter-increment는 값을 증가시키고 counter-reset은 카운터를 재설정하거나 특정 값으로 설정합니다.

```css
ol {
  counter-reset: section;
}

li::before {
  content: counter(section) ".";
  counter-increment: section;
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

# 03 단어 나누기 및 텍스트 줄 바꿈

이러한 속성들은 요소 내에서 얼마나 긴 단어와 문자열이 나뉘고 줄 바꿈되는지에 대한 제어를 제공하여 가독성을 높이도록합니다.

```js
p {
  word-break: break-all; /* 값: normal, break-all, keep-all */
  overflow-wrap: break-word; /* 값: normal, break-word */
}
```

# 04 텍스트 요약

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

텍스트가 포함 요소를 넘칠 때의 동작을 제어하는 text-overflow 속성입니다. 특히 긴 문자열이나 제한된 공간 내의 텍스트를 처리하는 데 유용합니다.

```js
div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 값: clip, ellipsis */
}
```

# 05 object-fit 및 object-position

이러한 속성은 이미지가 컨테이너 내에 맞추어지고 위치가 조절되는 방법을 제어합니다.

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
img {
  object-fit: cover; /* 옵션: fill, contain, cover, scale-down, none */
  object-position: top right; /* 값: top, right, bottom, left, center */
}
```

# 06 tab-size

tab-size 속성을 사용하면 텍스트에서 탭의 너비를 설정하여 코드 들여쓰기를 사용자 정의할 수 있습니다.

```css
code {
  tab-size: 2; /* 각 탭에 대해 사용할 공백 수를 지정 */
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

# 07 font-variant

font-variant은 작은 대문자나 리거처럼 특정 글꼴 기능을 활성화 또는 비활성화할 수 있습니다.

```js
p {
  font-variant: small-caps; /* 값: normal, small-caps, inherit */
}
```

# 08 caret-color 및 caret-shape

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

이 속성들은 입력 필드에서 캐럿(커서)을 스타일링하여 독특하고 시각적으로 매력적인 디자인을 가능하게 합니다.

```js
input {
  caret-color: #ff6600; /* 캐럿 색상을 지정합니다 */
  caret-shape: block; /* 값: auto, block, underscore, triangle, inherit */
}
```

# 09 text-align-last

text-align-last 속성은 블록의 마지막 줄의 정렬을 제어하여 텍스트 정렬에 더 많은 제어를 제공합니다.

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
p {
  text-align: justify;
  text-align-last: center; /* values: auto, left, center, right, justify, start, end */
}
```

# 10 column-fill

column-fill은 다중 열 레이아웃에서 콘텐츠가 열 사이에서 어떻게 분배되는지 결정하며 열의 높이를 균형 있게 유지하는 데 도움이 됩니다.

```css
.container {
  column-count: 3;
  column-fill: auto; /* values: auto, balance */
}
```
