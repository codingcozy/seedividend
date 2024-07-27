---
title: "div 안에 스크롤바 생성하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-Createascrollbarinsideadiv_0.png"
date: 2024-06-23 14:23
ogImage: 
  url: /assets/img/2024-06-23-Createascrollbarinsideadiv_0.png
tag: Tech
originalTitle: "Create a scrollbar inside a div"
link: "https://medium.com/@japneetsingh035/create-a-scrollbar-inside-a-div-1436a22e0c82"
---


앵귤러에서는 CSS 스타일을 사용하여 div 내에 스크롤바를 만들 수 있어요. 다음은 그 방법이에요:

- 컴포넌트 HTML 파일에 div 요소를 추가하세요:

```js
<div class="scrollable-div">
  <!-- 내용을 입력하세요 -->
</div>
```

- 다음 CSS 스타일을 컴포넌트의 CSS 파일에 추가하세요:

<div class="content-ad"></div>

```js
.scrollable-div {
  height: 200px; /* div의 높이를 고정값으로 설정합니다 */
  overflow-y: scroll; /* 수직 스크롤바를 활성화합니다 */
}
```

height 속성은 div의 높이를 설정하며 overflow-y 속성은 수직 스크롤바를 활성화합니다. div 내부의 콘텐츠가 div의 높이를 초과하면 스크롤바가 자동으로 나타납니다.

높이 값을 조정하여 요구 사항에 맞게 사용할 수 있습니다.

또는 Angular Material의 mat-dialog-content 컴포넌트를 사용하여 콘텐츠가 컨테이너의 높이를 초과하는 경우 자동으로 스크롤바가 추가되도록 할 수도 있습니다. 다음은 예시입니다:

<div class="content-ad"></div>

```js
<mat-dialog-content>
  <!-- 여기에 내용을 입력하세요 -->
</mat-dialog-content>
```

mat-dialog-content를 사용하려면 앱 모듈에서 MatDialogModule를 import해야 합니다.