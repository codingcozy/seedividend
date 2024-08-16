---
title: "Dayjs로 날짜 조작하기 - 주어진 시간을 추가하거나 빼기"
description: ""
coverImage: "/assets/img/2024-05-13-ManipulatingDateswithDayjsAddorSubtractaGivenAmountofTime_0.png"
date: 2024-05-13 00:23
ogImage: 
  url: /assets/img/2024-05-13-ManipulatingDateswithDayjsAddorSubtractaGivenAmountofTime_0.png
tag: Tech
originalTitle: "Manipulating Dates with Day.js — Add or Subtract a Given Amount of Time"
link: "https://medium.com/@hohanga/manipulating-dates-with-day-js-add-or-subtract-a-given-amount-of-time-2cb91ac8a615"
isUpdated: true
---




<img src="/assets/img/2024-05-13-ManipulatingDateswithDayjsAddorSubtractaGivenAmountofTime_0.png" />

Day.js는 우리 앱에서 날짜를 조작할 수 있게 해주는 JavaScript 라이브러리입니다.

이 기사에서는 JavaScript 앱에서 Day.js를 사용하여 날짜를 조작하는 방법을 살펴보겠습니다.

# 주어진 시간 만큼 추가하거나 빼기



Day.js의 Date 객체에 add 메소드를 사용하여 지정된 시간을 추가할 수 있어요.

예를 들어, 다음과 같이 작성할 수 있어요:

```js
const dayjs = require("dayjs");
const result = dayjs().add(7, "day");
console.log(result);
```

현재 날짜 및 시간에 7일을 추가하려면 이렇게 해보세요.



우리는 첫 번째 인수로 `year`, `month`, `date`, `hour`, `minute`, `second`, 그리고 `millisecond` 단위 값 중 하나를 사용하여 add 메서드를 호출합니다.

두 번째 인수는 설정할 값입니다.

1월부터 시작하는 월은 JavaScript 날짜와 같이 0으로 시작합니다.

각 인수 문자열에 대한 축약어도 있습니다.



`y`는 `year`의 약어입니다.

`M`은 `month`의 약어입니다.

`D`는 `date`의 약어입니다.

`d`는 `day`의 약어이며, 이는 주의 요일을 나타냅니다. 0은 일요일부터 시작하며, 6은 토요일을 의미합니다.



`h`은 `시간`의 약자입니다.

`m`은 `분`의 약자입니다.

`s`는 `초`의 약자입니다.

그리고 `ms`는 `밀리초`의 약자입니다.



웹 애플리케이션에서 날짜를 조작할 수 있는 JavaScript 라이브러리인 Day.js를 사용해봤네요. "add"를 "subtract"로 대체하고 동일한 인수를 유지하여 특정 시간을 뺄 수 있습니다.

# 결론