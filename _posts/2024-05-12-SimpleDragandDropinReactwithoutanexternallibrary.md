---
title: "외부 라이브러리 없이 React에서 간단한 드래그 앤 드롭하기"
description: ""
coverImage: "/assets/img/2024-05-12-SimpleDragandDropinReactwithoutanexternallibrary_0.png"
date: 2024-05-12 21:29
ogImage: 
  url: /assets/img/2024-05-12-SimpleDragandDropinReactwithoutanexternallibrary_0.png
tag: Tech
originalTitle: "Simple Drag and Drop in React without an external library."
link: "https://medium.com/nerd-for-tech/simple-drag-and-drop-in-react-without-an-external-library-ebf1c1b809e"
---


<img src="/assets/img/2024-05-12-SimpleDragandDropinReactwithoutanexternallibrary_0.png" />

## 리액트에서 드래그 앤 드롭이란?

드래그 앤 드롭은 화면에서 마우스나 터치패드를 사용하여 요소를 이동하거나 조작하는 방식입니다. 목록의 항목을 재정렬하거나 항목을 한 목록에서 다른 목록으로 이동하는 데 이상적입니다. React에서 매우 간단한 방법으로 드래그 앤 드롭 컴포넌트를 구축할 수 있습니다. 
여러분의 리액트 앱에서 항목이거나 테이블이 있는데 이 목록이나 테이블 행의 순서를 변경하고 싶다면 이 단계를 따라 드래그 앤 드롭을 구축해보세요.

## 1. 요소를 드래그할 수 있도록 만드세요.



여기서 해야 할 일은 각 목록 항목 또는 테이블 행에 "draggable" prop을 전달하는 것뿐입니다. 이 prop을 사용하면 요소를 드래그할 수 있게 됩니다.

![Drag and Drop](/assets/img/2024-05-12-SimpleDragandDropinReactwithoutanexternallibrary_1.png)

이제 목록/테이블의 모든 요소/행을 드래그할 수 있습니다. (참고: 요소만 드래그할 수 있습니다)

## 2. 드래그하는 요소 가져오기



useRef 훅을 사용하여 끌어 올리고 있는 항목을 보관한 다음, "onDragStart" 메서드를 사용하여이를 드래그하고 다른 요소로 붙여 넣습니다.

![드래그 앤 드롭](/assets/img/2024-05-12-SimpleDragandDropinReactwithoutanexternallibrary_2.png)

## 3. 우리가 떠 다니는 요소를 가져 오거나 요소가 교체 될 요소를 가져옵니다.

이 단계에서는 끌어올린 요소가 떠 다니는 요소를 찾아야합니다. UseRef를 사용하여이를 달성 할 수 있으며 “onDragEnter" 이벤트 리스너도 이 작업을 수행합니다.



![이미지](/assets/img/2024-05-12-SimpleDragandDropinReactwithoutanexternallibrary_3.png)

## 4. 다른 항목으로 드래그 가능한 아이템 바꾸기.

마지막 단계 중 하나는 드래그한 요소를 다른 요소 위에 놓거나 다른 위치에 놓았을 때 목록을 재배열하는 것입니다. 이를 "onDragEnd" 메서드를 사용하여 달성할 수 있습니다.

![이미지](/assets/img/2024-05-12-SimpleDragandDropinReactwithoutanexternallibrary_4.png)



드래그 앤 드롭을 즐기세요.