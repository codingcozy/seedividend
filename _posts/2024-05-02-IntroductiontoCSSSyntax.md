---
title: "CSS 기초 문법 정리"
description: ""
coverImage: "/assets/img/2024-05-02-IntroductiontoCSSSyntax_0.png"
date: 2024-05-02 00:01
ogImage: 
  url: /assets/img/2024-05-02-IntroductiontoCSSSyntax_0.png
tag: Tech
originalTitle: "Introduction to CSS Syntax"
link: "https://medium.com/@Rachelshattuck/introduction-to-css-syntax-8c78d0341d8a"
---


![CSS Syntax](/assets/img/2024-05-02-IntroductiontoCSSSyntax_0.png)

CSS를 사용하는 규칙의 두 부분은 선언 블록과 선택자입니다.

## CSS 구문:

![CSS Syntax](/assets/img/2024-05-02-IntroductiontoCSSSyntax_1.png)

<div class="content-ad"></div>

선택기는 스타일을 지정하려는 HTML 요소를 가리킵니다.

각 선언은 콜론으로 구분된 CSS 속성 이름과 값으로 구성됩니다.

# 예제:

```js
<!DOCTYPE html>
<html>
<head>
<style>
p {
  color: red;
  text-align: center;
} 
</style>
</head>
<body>

<p>Hello World!</p>
<p>These paragraphs are styled with CSS.</p>

</body>
</html>
```

<div class="content-ad"></div>

## 예시 설명:

- CSS에서 P는 셀렉터입니다 (스타일을 적용할 HTML 요소를 가리킵니다: `p`).
- Red는 속성(property)의 값인 색상입니다.
- 속성의 값은 'center'이고, 사용된 속성은 text-align입니다.

![이미지](/assets/img/2024-05-02-IntroductiontoCSSSyntax_2.png)

# 읽어 주셔서 감사합니다!