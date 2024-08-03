---
title: "2024년, 모든 프론트엔드 개발자가 알아야 할 CSS 기술들"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "CSS techniques every frontend developer should know in 2024"
link: "https://medium.com/@dimeloper/css-techniques-every-frontend-developer-should-know-in-2024-d200e92d5b69"
---



<img src="/assets/img/CSStechniqueseveryfrontenddevelopershouldknowin2024_0.png" />

여러 해 동안 CSS는 상당히 발전해 왔습니다. 최근 업데이트로 프론트엔드 개발자들에게 강력한 도구를 제공하여 모든 주요 브라우저에서 효율적이고 깔끔하며 복잡한 레이아웃을 만들 수 있게 되었습니다.

이 중에서, 나는 최근 가장 많이 사용하고 있는 몇 가지 기술이 있습니다. 내 의견으로는 이들은 2024년에 모든 프론트엔드 개발자의 무기가 되어야 한다.

# CSS 중첩

<div class="content-ad"></div>

전통적인 CSS는 종종 긴 코드와 반복적인 코드로 이어졌어요. 2023년까지는 SCSS와 같은 도구를 사용하여 스타일을 구조화하는 방법이 필요했지만 이제는 순수 CSS로도 안전하게 그렇게 할 수 있어요.

## CSS 중첩이 없는 CSS

```js
.container {
  display: flex;
}
.container .header {
  background-color: blue;
}
.container .header h1 {
  color: white;
}
```

## CSS 중첩을 사용한 CSS

<div class="content-ad"></div>

```js
.container {
  display: flex;
  .header {
    background-color: blue;
    h1 {
      color: white;
    }
  }
}
```

CSS 중첩을 통해 선택자를 서로 중첩시켜 더 깔끔하고 조직적인 스타일을 작성할 수 있습니다. 이는 스타일시트에서 더 자연스러운 계층 구조를 모방하는 방식입니다.

# :has() 선택자

:has() 선택자는 새로운 수준의 스타일링 유연성을 제공하여, 자식 조건을 기반으로 한 부모 선택자를 허용하며 모든 주요 브라우저에서 안전하게 사용할 수 있습니다.

<div class="content-ad"></div>

이전 CSS로 작업할 때는 자식 또는 형제 조건에 따라 부모 요소를 선택해야 하는 경우 복잡한 선택기나 JavaScript가 필요했습니다. :has() 선택기는 이 프로세스를 간소화하여 응답 및 동적 디자인에 대한 새로운 가능성을 엽니다.

## :has() 선택기 없이 CSS

```js
// 특정 자식을 포함하는 div에 클래스를 추가하는 JavaScript
document.querySelectorAll("div > a.special-class").forEach((link) => {
  link.parentElement.classList.add("has-special-link");
});
```

```js
/* 동적으로 추가된 클래스를 대상으로 하는 CSS */
div.has-special-link {
  border: 1px solid green;
}
```

<div class="content-ad"></div>

:has() 선택자 이전에는 CSS에서 특정 자식 요소의 존재를 기반으로 부모 요소를 직접 타겟팅할 수 없었습니다. 대신 개발자들은 일반적으로 JS를 사용하여 부모 div에 클래스를 동적으로 추가했습니다.

## :has() 선택자를 사용한 CSS

```js
div:has(> a.special-class) {
  border: 1px solid green;
}
```

:has 선택자를 사용하면 .special-class를 가진 자식 a를 가지고 있는 div 요소를 직접 타겟할 수 있어서 div의 테두리를 변경할 수 있습니다. 이는 추가적인 JS 코드나 복잡한 형제 선택자가 필요 없어 CSS를 간단하게 만듭니다.

<div class="content-ad"></div>

# :is() 선택자

더 읽기 쉬운 CSS를 작성하는 데 도움이 되며 모든 주요 브라우저에서 안전하게 사용할 수 있는 또 다른 편리한 선택자인 :is() 선택자가 있습니다.

:is() 선택자 이전에는 스타일을 공유하는 여러 요소를 선택하는 것이 자주 긴방복한 CSS 선택자로 이어졌습니다.

## :is() 선택자 없이 CSS

<div class="content-ad"></div>

```js
.article > h1, .article > h2, .article > h3 {
  font-family: sans-serif;
  color: blue;
}
```

## :is() 선택자를 사용한 CSS

```js
.article > :is(h1,h2,h3) {
  font-family: sans-serif;
  color: blue;
}
```

전통적으로 여러 요소에 스타일을 적용하려면 각 선택기를 개별적으로 나열해야 했습니다. 첫 번째 블록에서 처럼 h1, h2 및 h3 요소에 대해 .article 내에서 동일하게 스타일이 적용되었습니다. :is() 를 사용하면 두 번째 블록에서처럼 :is() 내에 선택기를 그룹화하여 동일한 효과를 더 간결하게 달성할 수 있으며, 반복을 줄이고 코드 가독성을 향상시킵니다.

<div class="content-ad"></div>

CSS가 계속 발전함에 따라 중첩(nesting)과 :has, :is와 같은 가상 클래스(pseudo-classes) 기술을 통해 스타일과 UI 코드를 개선할 수 있게 되었습니다.
