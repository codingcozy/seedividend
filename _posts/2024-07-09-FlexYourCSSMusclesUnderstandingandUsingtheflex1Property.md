---
title: "CSS flex 속성 완전 정복 flex1 속성 이해하고 사용하기"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-07-09 18:15
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Flex Your CSS Muscles: Understanding and Using the flex:1 Property"
link: "https://medium.com/@ozantekindev/flex-your-css-muscles-understanding-and-using-the-flex-1-property-6657fb2382b3"
---


<img src="https://miro.medium.com/v2/resize:fit:1400/1*ykK41RatkzwYeC7NB8G7PQ.gif" />

안녕하세요! 이 연재에서는 저의 flex:1에 대한 요약 기사에 접근할 수 있습니다.

## 내용:

flex 1이란 무엇을 의미합니까?

<div class="content-ad"></div>

flex:1 속성은 flex-grow 속성의 단축 표현으로, 플렉스 컨테이너 내 요소의 레이아웃을 제어하는 여러 속성 중 하나입니다. flex-grow 속성은 컨테이너 내 가능한 공간 중 요소가 차지해야 하는 양을 다른 요소들에 상대적으로 지정합니다.

flex-grow 값이 1로 설정되면 해당 요소가 가능한 공간을 최대한 차지하되, 다른 요소들이 자신의 영역을 차지할 수 있도록 합니다. 예를 들어, flex-grow 값이 1로 설정된 세 개의 자식 요소를 가진 컨테이너는 각 요소가 사용 가능한 공간의 동일한 양을 차지합니다.

또한 각 요소에 대해 다른 flex-grow 값을 설정하여 각 요소가 차지하는 공간을 제어할 수도 있습니다. 예를 들어, flex-grow 값이 2로 설정된 요소는 flex-grow 값이 1인 요소보다 두 배의 공간을 차지하게 됩니다.

flex-grow 외에도, flex-shrink 및 flex-basis와 같이 플렉스 컨테이너 내 요소의 레이아웃을 제어할 수 있는 다른 속성들이 있습니다. flex-shrink 속성은 컨테이너가 너무 작아질 때 요소가 얼마나 줄어들지를 제어하며, flex-basis 속성은 남은 공간이 분배되기 전 요소의 초기 크기를 제어합니다.

<div class="content-ad"></div>

`flex:1`을 사용하면 `flex-grow:1 | flex-shrink:1 | flex-basis:0%`의 축약형입니다. 이 축약형은 세 가지 속성을 한 줄의 코드로 빠르게 설정하는 데 사용됩니다.

요약하면 CSS에서 `flex:1` 속성은, 요소가 다른 요소들에 비해 컨테이너 내의 사용 가능한 공간을 얼마나 차지해야 하는지를 지정하는 `flex-grow` 속성의 축약형입니다. 이 속성은 요소들의 레이아웃을 제어하고, 요소들 간에 공간을 효율적이고 유연하게 분배할 수 있도록 해줍니다.

🔗 제 정보 자세히 알아보기.