---
title: "프론트엔드 개발자들이 잘 모르는 8가지 CSS 속성"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "8 Must-Know CSS Properties for Styling Websites"
link: "https://medium.com/@Itsmemuna/8-must-know-css-properties-for-styling-websites-70de2ef22e2e"
---



만약 웹사이트를 스타일링하고 싶다면, CSS 속성과 그에 해당하는 값들을 이해하는 것이 중요합니다.

## CSS 속성이란?

CSS 속성은 HTML 요소를 스타일링하는 다양한 방법들과 스타일을 입히고자 하는 특성들을 가리킵니다. CSS 속성은 단독으로 동작할 수 없고, 원하는 결과물을 얻기 위해서는 해당하는 값이 함께 필요합니다.

## CSS 속성 값이란?

<div class="content-ad"></div>

CSS Property Value는 스타일링하려는 속성의 여러 가능한 외관 중 하나를 선택할 수 있게 합니다.

본 글에서는 CSS 속성의 네 가지 카테고리에 대해 이야기할 것이며, 각각 2개씩 소개할 것입니다. 해당 카테고리는 다음과 같습니다:

- 텍스트 속성
- 글꼴 속성
- 간격 속성
- 크기 조정 속성

# 텍스트 속성

<div class="content-ad"></div>

이 속성은 HTML 문서에서 텍스트를 스타일링하는 데 사용됩니다.

텍스트 속성의 예시는 다음과 같습니다:

- Color: 이 속성은 텍스트의 색상을 설정합니다.

```js
h1{
  color: red;
}
```

<div class="content-ad"></div>

여기서 h1은 선택자로 작용하고, 색은 속성으로 작용하며, red는 속성 값으로 작용합니다. 이 문맥에서 값은 파란색, 녹색 또는 다른 색일 수 있습니다.

2. Text-align: 이는 문서 내 텍스트를 정렬합니다.

```js
h1{
  text-align: center;
}
```

이 문맥에서 값은 end, left, right 또는 다른 위치일 수 있습니다.

<div class="content-ad"></div>

# 폰트 속성

이 속성은 당신의 취향에 맞게 글꼴을 디자인하는 데 사용됩니다.

폰트 속성의 예시로는:

- 폰트 패밀리 (Font-family): 이는 문서 내 텍스트의 글꼴 패밀리를 지정합니다.

<div class="content-ad"></div>

```css
h1 {
  font-family: "Courier New", sans-serif;
}
```

이 문맥에서 값은 Lexend Deca, Playfair Display 또는 다른 글꼴 패밀리일 수 있습니다. 글꼴 패밀리에 대체 글꼴을 추가하는 것이 중요합니다. 대체 글꼴은 선택한 글꼴을 사용할 수 없을 때 사용되는 글꼴입니다. 일반적으로 쉼표(,)로 구분됩니다.

2. 글꼴 크기: 문서의 텍스트의 글꼴 크기를 지정합니다.

```css
h1 {
  font-size: 16px;
}
```

<div class="content-ad"></div>

가로 갭: 20px  
세로 갭: 10px

<div class="content-ad"></div>

- 마진: 이것은 테두리 바깥에 공간을 만들 때 사용됩니다.

```js
h1{
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
```

margin-top, margin-bottom, margin-left, margin-right을 사용하는 대신 마진 속성을 사용하여 모든 방향에 동일한 속성을 지정합니다.

```js
h1{
  margin: 20px;
}
```

<div class="content-ad"></div>

위치를 지정할 때 위쪽과 아래쪽에는 특정 값을 가져야 하지만, 왼쪽과 오른쪽에는 다른 값을 가지는 경우가 있습니다. 이렇게 해요:

```js
h1{
  margin: 10px 30px;
}
```

이 맥락에서 위쪽과 아래쪽은 10px이고, 왼쪽과 오른쪽은 30px입니다. 모든 면에 대해 각각 다른 값을 원하는 경우엔 아래와 같습니다:

```js
h1{
  margin: 10px 15px 20px 25px;
}
```

<div class="content-ad"></div>

여기서 첫 번째는 위, 두 번째는 오른쪽, 세 번째는 아래, 네 번째는 왼쪽입니다.

2. Padding: 이는 콘텐츠 주변/테두리 내부에 공간을 만드는 데 사용됩니다.

```js
h1 {
  padding: 20px;
}
```

여기에는 마진에 적용된 규칙이 적용됩니다.

<div class="content-ad"></div>

# 크기 조정 속성

이것은 HTML 문서의 콘텐츠 크기를 변경하는 데 사용됩니다.

크기 조정 속성의 예시:

- 높이: 이는 콘텐츠의 높이를 늘리거나 줄이는 데 사용됩니다.

<div class="content-ad"></div>

```js
img{
  height: 100px;
}
```

만일 텍스트에 사용된다면, 텍스트 아래에 공백만 생성됩니다. 원하신다면 글꼴 크기를 늘리는 데 사용됩니다.

2. 너비: 이는 콘텐츠의 너비를 늘리거나 줄이는 데 사용됩니다.

```js
img{
  width: 100px;
}
```

<div class="content-ad"></div>

이는 텍스트 크기를 증가하거나 감소시키는 데 사용할 수 없으며, 텍스트를 줄였을 때 다음 줄로 줄바꿈됩니다.
