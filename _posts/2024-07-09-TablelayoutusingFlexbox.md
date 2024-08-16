---
title: "Flexbox를 사용한 테이블 레이아웃 만드는 방법"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-07-09 18:10
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Table layout using Flexbox"
link: "https://medium.com/@swethabachugudem/table-layout-using-flexbox-b6bbda7dc445"
isUpdated: true
---




표는 데이터를 표현하는 데 가장 많이 사용되는 레이아웃 중 하나입니다. 이 레이아웃을 달성하는 여러 방법이 있습니다. 기본 HTML `table`을 사용하거나 CSS 속성 display: table을 사용하거나 flexbox를 사용할 수 있습니다. 이 문서에서는 Flexbox를 사용하여 표를 만드는 방법을 설명하겠습니다.

다음 레이아웃은 동일한 열을 갖는 표를 달성하는 데 사용할 수 있습니다:

```js
  <div class="table">
    <div class="row heading">
      <div class="cell">Category 1</div>
      <div class="cell">Category 2</div>
      <div class="cell">Category 3</div>
      <div class="cell">Category 4</div>
    </div>
    <div class="row">
      <div class="cell">Item 1</div>
      <div class="cell">Item 2</div>
      <div class="cell">Item 3</div>
      <div class="cell">Item 4</div>
    </div>
    <div class="row">
     <div class="cell">Item 1</div>
      <div class="cell">Item 2</div>
      <div class="cell">Item 3</div>
      <div class="cell">Item 4</div>
    </div>
  </div>
```

```js
.table {
  display: flex;
  flex-flow: column nowrap;
  border: 1px solid black;
}

.row {
  display: flex;
  border-bottom: 1px solid black;
}

.heading {
  font-weight: bold;
}

.cell {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
```

<div class="content-ad"></div>

'flex-flow' 속성은 flex 컨테이너의 방향을 지정하며, 이 속성을 테이블 클래스에 column으로 설정하면 데이터가 열을 따라 채워지는 것을 보장합니다. 셀 클래스에 설정된 'flex:1' 속성은 flex 항목이 컨테이너 내에서 동일하게 공간을 차지해야 함을 지정하여 테이블의 열 크기를 동일하게 만들 수 있게 합니다.

이 속성은 확장 가능한 열을 만드는 데 사용할 수 있습니다. 이제 어느 셀에 'flex: 2'를 간단히 사용하여 다른 열의 두 배 너비를 가진 열을 만들 수 있습니다. 이 기능을 사용하여 기본 테이블의 'colspan' 기능을 흉내낼 수도 있습니다.

도움이 되었으면 좋겠습니다. 즐거운 학습되세요!