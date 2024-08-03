---
title: "CSS의 3가지 기본 개념 Inheritance, Cascading, Specificity 알아보기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "30s for 3 Fundamental Concepts of CSS Inheritance, Cascading, and Specificity"
link: "https://medium.com/@caodanju/30s-for-3-fundamental-concepts-of-css-inheritance-cascading-and-specificity-0b44d17d5bee"
---



CSS (Cascading Style Sheets)은 웹 페이지를 스타일링하는 데 필수적인 언어입니다. 핵심 개념을 이해하면 잘 구조화되고 유지보수가 용이한 스타일시트를 만들 수 있습니다. 이 블로그 포스트에서는 Cascading, Inheritance 및 Specificity라는 세 가지 주요 개념을 살펴볼 것입니다. 이러한 개념을 숙지함으로써 엔지니어들은 CSS 기술을 향상시키고 UI에 더 일관된 스타일을 작성할 수 있습니다.

![Image](/assets/img/30sfor3FundamentalConceptsofCSSInheritanceCascadingandSpecificity_0.png)

## 상속

CSS 속성은 부모 요소에서 자식 요소로 상속될 수 있습니다. 이는 부모 요소에 스타일이 적용된 경우, 자식 요소들은 그 스타일을 상속받을 것을 의미합니다. 그렇지 않은 경우에는 특별히 지정하지 않는 한 자식 요소가 그 스타일을 상속합니다. 예를 들어 설명해보겠습니다.

<div class="content-ad"></div>

```js
<!-- 상속 예시 -->
<div class="container">
  <p>컨테이너 내부의 단락입니다.</p>
</div>

<style>
  /* 부모 스타일 */
  .container {
    font-family: Arial, sans-serif;
  }
</style>
```

이 예시에서는 클래스가 "container"인 `div` 안에 있는 `p` 요소가 부모로부터 font-family 속성을 상속받아 컨테이너와 동일한 글꼴 스타일을 갖게 됩니다.

# 카스케이딩

카스케이딩은 HTML 요소에 스타일이 적용되는 방식을 스타일 규칙과의 관계에 기반으로 합니다. CSS는 스타일이 부모 요소로부터 상속받아 더 구체적인 규칙에 의해 재정의될 수 있는 카스케이딩 순서를 따릅니다. 간단한 예시로 이 작동 방식을 살펴봅시다.```

<div class="content-ad"></div>

```js
<!-- Cascading 예시 -->
<p>이것은 문단입니다.</p>
<p class="special">이것은 특별한 문단입니다.</p>

<style>
  /* 전역 스타일 */
  p {
    color: blue;
  }

  /* 특정 스타일 */
  .special {
    color: red;
  }
</style>
```

이 예시에서 첫 번째 `p` 요소는 전역 스타일에서 상속받은 색 속성으로 파란색 텍스트 색상을 가질 것입니다. 그러나 "special" 클래스를 가진 두 번째 `p` 요소는 해당 클래스에 정의된 더 구체적인 스타일 규칙을 적용하여 빨간색 텍스트 색상을 가질 것입니다.

# 특이성

특이성은 CSS가 요소에 적용할 스타일이 충돌하는 규칙이 있을 때 결정하는 메커니즘입니다. 의도한 대로 스타일이 적용되도록 보장하려면 특이성이 작동하는 방식을 이해하는 것이 중요합니다. 특이성은 네 가지 카테고리를 기반으로 하며, 각각이 고유한 가중치를 가지고 있습니다:```

<div class="content-ad"></div>

1. 인라인 스타일: 이 스타일은 style 속성을 사용하여 HTML 요소에 직접 적용됩니다. 요소에 직접 부착되어 있기 때문에 가장 높은 우선 순위를 갖습니다.

```js
<!-- 인라인 스타일 예시 -->
<h1 style="color: pink;">인라인 스타일이 적용된 제목</h1>
```

2. 아이디(ID): ID 선택자를 사용하여 적용된 스타일은 클래스, 가상 클래스 및 속성 선택자보다 더 높은 특이성을 가집니다. ID 선택자는 해시(#) 기호와 ID 이름이 붙여진 형식으로 표시됩니다.

```js
/* 아이디(ID) 선택자 예시 */
#navbar {
    background-color: #333;
}
```

<div class="content-ad"></div>

3. 클래스, 가상 클래스, 속성 선택자: 이 선택자들은 클래스, 상태 또는 속성에 기반한 요소를 대상으로 합니다. 중간 수준의 특이성을 갖습니다.

```js
/* 클래스 선택자 예시 */
.test {
    font-weight: bold;
}

/* 가상 클래스 선택자 예시 */
:hover {
    background-color: yellow;
}

/* 속성 선택자 예시 */
[href] {
    color: blue;
}
```

4. 요소 및 가상 요소: 이 선택자들은 HTML 요소나 요소 부분을 대상으로 합니다. 가장 낮은 특이성 수준을 갖습니다.

```js
/* 요소 선택자 예시 */
h1 {
    font-size: 24px;
}

/* 가상 요소 선택자 예시 */
::before {
    content: "앞에 있는 내용";
}
```

<div class="content-ad"></div>

## 특이성 계산하기

특이성을 계산하는 것은 무서운 일이 아니에요. 이 간단한 단계를 따르세요:

- 0의 특이성 값을 가지고 시작하세요.
- 선택기에 ID 값이 있는 경우마다 100을 더하세요.
- 클래스 값, 가상 클래스 또는 속성 선택자마다 10을 더하세요.
- 엘리먼트 선택자 또는 가상 엘리먼트마다 1을 더하세요.

예시:

<div class="content-ad"></div>

# 결론

CSS의 상속, 캐스캐이딩 및 특이도를 더 잘 이해하시고 버그와 머리털 뽑는 순간을 줄이시기를 바랍니다. 더 원활한 코딩을 위하여 건배해요!```
