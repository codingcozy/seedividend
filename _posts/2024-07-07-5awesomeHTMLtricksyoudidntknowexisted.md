---
title: "알려지지 않은 5가지 놀라운 HTML 트릭"
description: ""
coverImage: "/assets/img/2024-07-07-5awesomeHTMLtricksyoudidntknowexisted_0.png"
date: 2024-07-07 12:46
ogImage:
  url: /assets/img/2024-07-07-5awesomeHTMLtricksyoudidntknowexisted_0.png
tag: Tech
originalTitle: "5 awesome HTML tricks you didn’t know existed"
link: "https://medium.com/@creativebyte/5-awesome-html-tricks-you-didnt-know-existed-9ab7cb6d8875"
---

![이미지](/assets/img/2024-07-07-5awesomeHTMLtricksyoudidntknowexisted_0.png)

HTML은 웹의 기초이며 거의 모든 웹페이지의 콘텐츠를 구성합니다. HTML은 기본 태그와 속성으로 유명합니다. 그러나 HTML에는 웹사이트의 상호 작용성, 디자인 및 기능을 향상시킬 수 있는 숨겨진 보석이 있습니다.

이 게시물에서는 당신이 알지 못했을지도 모를 다섯 가지 HTML 트릭을 살펴보겠습니다.

## 1. 인라인 편집을 위한 contenteditable 속성 사용

<div class="content-ad"></div>

웹 페이지 콘텐츠를 텍스트 편집기처럼 편집할 수 있으면 좋지 않았나요? contenteditable 속성을 사용하여 모든 HTML 요소를 편집 가능한 필드로 변환하여 사용자가 브라우저 내에서 콘텐츠를 직접 수정할 수 있습니다.

```js
<div contenteditable="true">이 텍스트는 편집 가능합니다. 여기에 뭔가를 입력해보세요!</div>
```

## 2. 맞춤 데이터 속성

맞춤 데이터 속성은 HTML 요소 내에 추가 정보를 저장하는 유연한 방법을 제공하여 접근성을 향상시키고 동적 상호작용을 가능하게 합니다. 이러한 속성은 "data-"로 시작하여 서술적인 이름을 따릅니다.

<div class="content-ad"></div>

```js
<div id="product" data-product-id="123" data-category="electronics">
    <!-- 제품 세부 정보 여기에 -->
</div>
```

## 3. "hidden" 속성
