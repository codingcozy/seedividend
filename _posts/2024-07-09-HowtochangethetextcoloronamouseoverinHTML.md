---
title: "HTML에서 마우스오버 시 텍스트 색상 변경 방법"
description: ""
coverImage: "/assets/img/2024-07-09-HowtochangethetextcoloronamouseoverinHTML_0.png"
date: 2024-07-09 18:16
ogImage:
  url: /assets/img/2024-07-09-HowtochangethetextcoloronamouseoverinHTML_0.png
tag: Tech
originalTitle: "How to change the text color on a mouseover in HTML?"
link: "https://medium.com/@brajagopal.tripathi/how-to-change-the-text-color-on-a-mouseover-in-html-697f4d4210fa"
---

아래는 HTML에서 마우스 오버시 텍스트 색상을 변경하는 두 가지 방법이 있습니다:

1. CSS를 사용하는 방법:

CSS를 사용하여 마우스 오버시 텍스트 색상을 변경하는 방법은 :hover 가상 클래스를 사용하는 것입니다. :hover 가상 클래스는 사용자가 마우스로 위에 올리면 요소를 선택합니다.

<div class="content-ad"></div>

예를 들어, 사용자가 해당 요소 위에 마우스를 올릴 때 모든 `p` 요소의 텍스트 색상을 빨간색으로 변경하는 다음 CSS 코드가 있습니다:

CSS

```js
p:hover {
  color: red;
}
```

또한 특정 요소의 텍스트 색상을 변경하기 위해 :hover 가상 클래스를 사용할 수도 있습니다. 예를 들어, 사용자가 해당 요소 위에 마우스를 올릴 때 ID가 myParagraph인 `p` 요소의 텍스트 색상을 파란색으로 변경하는 다음 CSS 코드가 있습니다:

<div class="content-ad"></div>

CSS

```js
#myParagraph:hover {
  color: blue;
}
```

2. JavaScript을 사용하면:

JavaScript를 사용하여 마우스오버시 텍스트 색상을 변경하려면 onmouseover 이벤트를 사용할 수 있습니다. onmouseover 이벤트는 사용자가 마우스로 요소 위로 올라갈 때 트리거됩니다.

<div class="content-ad"></div>

예를 들어, 사용자가 해당 요소 위에 마우스를 가져다 놓을 때 `p` 요소의 텍스트 색상을 빨간색으로 변경하는 다음 JavaScript 코드가 있습니다:

JavaScript

```js
document.getElementById("myParagraph").onmouseover = function () {
  this.style.color = "red";
};
```

또한 JavaScript를 사용하여 마우스 오버 시 텍스트 색상을 동적으로 변경할 수도 있습니다. 예를 들어, 사용자가 해당 요소 위에 마우스를 가져다 놓을 때 `p` 요소의 텍스트 색상을 무작위 색상으로 변경하는 다음 JavaScript 코드가 있습니다:

<div class="content-ad"></div>

JavaScript

```js
document.getElementById("myParagraph").onmouseover = function () {
  this.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
};
```

어떤 방법을 선택할지는 특정한 요구 사항에 따라 다릅니다. 특정 유형의 모든 요소에 대해 마우스 오버 시 텍스트 색상을 변경해야 하는 경우 CSS를 사용하는 것이 가장 좋습니다. 특정 요소에 대해 마우스 오버 시 텍스트 색상을 변경해야 하거나 동적으로 마우스 오버 시 텍스트 색상을 변경해야 하는 경우 JavaScript를 사용하는 것이 가장 좋습니다.
