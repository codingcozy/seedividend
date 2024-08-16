---
title: "HTML 기초 처음 시작하는 방법"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-07-09 14:12
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Intro to HTML: HTML"
link: "https://medium.com/@fangjy.alice2011/intro-to-html-and-css-part-i-html-fe74e14b4fb2"
isUpdated: true
---




HTML과 CSS는 프런트 엔드 개발에 필수적인 프로그래밍 언어입니다.

가장 중요한 것은 HTML과 CSS 사이의 핵심적인 차이입니다:

이 글에서는 새로운 웹 페이지를 만드는 데 필수적인 HTML 구성 요소에 대해 이야기할 것입니다. 이후 글에서는 CSS에 대해 이야기할 것입니다.

# 시작하기

<div class="content-ad"></div>

HTML을 시작하려면 .html로 끝나는 파일을 만들면 됩니다. HTML 코드를 작성하기 시작하려면 텍스트 편집기나 IDE를 사용할 수 있습니다. 심화된 환경에서 보거나 편집하려면 Sublime Text나 VSCode와 같은 텍스트 편집기를 사용해보세요.

HTML 파일은 일반적인 웹페이지로 자동으로 열리고 표시됩니다.

# 기본 HTML 템플릿

```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <title>HTML 소개</title>
    </head>
    <body>
        <h1>HTML 기본 템플릿</h1>
        <p>이 템플릿에는 필수 HTML 구성 요소가 모두 포함되어 있습니다.</p>
        <p>이 템플릿을 사용하면 기본적인 웹페이지를 만들 수 있습니다.</p>
    </body>
</html>
```

<div class="content-ad"></div>

HTML 문서는 모두 `!DOCTYPE html`로 시작하여 브라우저에게 HTML 문서임을 알립니다.

이 템플릿에서 몇 가지 HTML 구성 요소를 알아야 합니다.

1. **`html`**

   HTML 문서의 시작을 나타냅니다.

<div class="content-ad"></div>

2. `head`

여기에는 문서의 시작 부분이 들어갑니다.

3. `body`

페이지의 본문 내용입니다.

<div class="content-ad"></div>

4. `title`

브라우저 창에 표시되는 페이지 제목으로, `head` 구성 요소 안에 중첩됩니다.

5. `h1`

헤딩입니다. h1부터 h6까지 여섯 가지 헤딩이 있으며 크기가 가장 큰 순서부터 가장 작은 순서까지 순위가 매겨집니다.

<div class="content-ad"></div>

6. `p`

단락 요소입니다.

7. `meta …`

브라우저와 소통해야 하는 메타 정보입니다. 여기에서는 charset을 UTF-8로 설정하여 이 코드가 사용하는 문자 세트임을 나타냅니다. 또한 name, content, initial-scale 변수를 설정하여 웹 페이지의 전체 창 크기를 지정합니다.

<div class="content-ad"></div>

# 보너스 HTML 구성 요소

웹 페이지를 외부 소스에 연결하려면 필요한 HTML 구성 요소가 여기 있어요.

1. `a`

`a`를 사용하여 링크에 대한 목적지 URL을 href 속성에 지정하세요.

<div class="content-ad"></div>

```js
[용례 방문하기](https://www.example.com)
```

2. `img`

이미지를 연결하려면 `src`를 사용하세요. 시각 장애인을 위해 이미지 콘텐츠를 설명하기 위해 alt를 사용하세요.

```js
![이미지 설명](image.jpg)
```  

<div class="content-ad"></div>

# HTML 속성

HTML 속성은 HTML 요소에 대한 추가 정보를 제공하며 항상 여는 태그에 지정됩니다. 일반적으로 name=value 쌍으로 제공되며, 이름은 속성의 이름이고 값은 대개 겹따옴표(일반적으로 이중 따옴표)로 둘러싸인 해당 값입니다.

가장 중요한 속성은 아래의 클래스 및 ID 속성입니다.

```js
<h1 class="class-one" id="awesometitle">
    멋진 페이지 제목
</h1>
<p class="class-one class-two class-three">많은 클래스들이군요!</p>
```

<div class="content-ad"></div>

id와 class 속성의 차이점은 id는 하나의 HTML 요소에만 사용할 수 있다는 것입니다.

id 속성은 HTML 요소를 고유하게 식별합니다. CSS로 스타일을 지정하거나 JavaScript로 요소를 대상으로 지정하는 데 유용합니다.

class 속성은 특정 요소의 클래스를 지정하는 데 사용됩니다. 클래스는 일관된 방식으로 여러 요소를 스타일링하는 데 사용됩니다.

한 클래스에 여러 값을 설정하려면 값 사이에 공백을 넣어 주세요. 아래 예시에서 `p` HTML 구성 요소는 class-one, class-two, class-three 세 클래스에 할당되어 있습니다.

<div class="content-ad"></div>

# HTML을 스타일리시하게 만들기

이제 우리는 이미 간단하지만 충분한 HTML 페이지를 만들었습니다. 이 HTML 페이지는 브라우저의 기본 스타일을 가지고 있습니다. HTML 페이지를 더 스타일리시하게 만들기 위해서는 다음을 통해 HTML 페이지를 외부 CSS 스타일 시트와 연결해야 합니다:

```js
<head>
  <!-- 다른 head 구성 요소 -->
  <link rel="stylesheet" href="style.css" />
</head>
```

`link` 태그는 항상 `head` 구성 요소 내에 중첩되어 있어야 합니다.

<div class="content-ad"></div>

링크 태그 내에서 rel 속성은 외부 소스의 유형을 지정하는 데 사용됩니다. 이 경우에는 스타일시트입니다.

href는 CSS 스타일 시트의 위치를 지정하는 데 사용됩니다. HTML 문서와 같은 폴더에 스타일 시트가 있다고 가정하므로 파일 이름만 사용됩니다.

style.css를 작성하는 방법은 아래 링크를 참조해주세요.