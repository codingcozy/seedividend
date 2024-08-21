---
title: "잘 알려지지 않은 CSS 트릭 10가지 Part 5"
description: ""
coverImage: "/assets/img/2024-07-12-10lesserknownCSStrickspart5_0.png"
date: 2024-07-12 19:14
ogImage:
  url: /assets/img/2024-07-12-10lesserknownCSStrickspart5_0.png
tag: Tech
originalTitle: "10 lesser known CSS tricks part 5"
link: "https://medium.com/@creativebyte/10-lesser-known-css-tricks-part-5-70a8a01fbfca"
isUpdated: true
---

![이미지](/assets/img/2024-07-12-10lesserknownCSStrickspart5_0.png)

10가지 덜 알려진 CSS 트릭 시리즈 5부작에 오신 것을 환영합니다. 아마 이미 즐거움을 아시겠지만, 처음 오신 분이라면 다른 포스트를 아직 보지 못했겠죠… 안녕하세요! 웹 디자인 역량 향상에 도움이 되는 10가지 덜 알려진 CSS 트릭 목록을 만들었습니다 (지금까지 40가지가 있고 이후에는 50가지 트릭 모음이 생길 것입니다).

## 01. ::marker 가상 요소

::marker 가상 요소를 사용하여 목록 항목 표식을 스타일링하세요.

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
li::marker {
    color: blue;
}
```

## 02. element() 함수를 사용한 배경

element() 함수를 사용하여 배경으로 요소를 동적으로 참조합니다.

```js
.background {
    background: element(#targetElement);
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

## 03. Flexbox를 사용하여 고정 푸터 만들기

Flexbox를 사용하여 고정 푸터 레이아웃을 만들어보세요.

```js
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex: 1;
}
```

## 04. 부드러운 스크롤링을 위한 scroll-padding

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

스크롤 패딩을 조정하여 스크롤 동작을 개선하세요.

```js
html {
    scroll-padding: 20px;
}
```

## 05. 상호 작용 형광효과

CSS 변수를 사용하여 상호 작용 형광효과를 만들어보세요.

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
.highlight {
    --highlight-color: #e74c3c;
    background-image: linear-gradient(transparent 0%, var(--highlight-color) 0%);
    background-size: 100% 200%;
    transition: background-position 0.3s;
}

.highlight:hover {
    background-position: 0 100%;
}
```

## 06. Custom radio buttons and checkboxes

Style radio buttons and checkboxes without images.

```js
input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    border: 2px solid #3498db;
}

input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border: 2px solid #e74c3c;
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

## 07. textarea의 resize 속성

resize 속성을 사용하여 textarea의 크기 조정 동작을 제어하세요.

```js
textarea {
    resize: vertical;
}
```

## 08. 텍스트 그라데이션

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

친구야, 배경 클립 및 텍스트 색상 속성을 사용하여 텍스트에 그라데이션 효과를 만들어보세요.

```js
.gradient-text {
    background-image: linear-gradient(45deg, #3498db, #2ecc71);
    background-clip: text;
    color: transparent;
}
```

## 09. 긴 단어용 단어 나누기 속성

단어 나누기 속성을 사용하여 공백 없이 긴 단어나 문자열이 어떻게 나누어지고 개행되는지 제어하세요.

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
.long-words {
    word-break: break-all;
}
```

## 10. variable 글꼴을 위한 font-variation-settings

font-variation-settings 속성을 사용하여 variable font 스타일을 세밀하게 조정하세요.

```js
.custom-font {
    font-family: 'MyVariableFont';
    font-variation-settings: 'wght' 600, 'ital' 1;
}
```
