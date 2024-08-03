---
title: "React JS에서 Spread Operator 연산자 사용방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "What is the Spread Operator In React JS"
link: "https://medium.com/@DotNetCornerYT/what-is-the-spread-operator-in-react-js-25f6783710a3"
---



<img src="/assets/img/WhatistheSpreadOperatorInReactJS_0.png" />

이 블로그 포스트에서는 React JS에서 Spread 연산자가 무엇인지 알아보고 React JS와 함께 작업할 때 어떤 중요한 역할을 하는지 배울 것입니다.

# 목표

주요 작업은 복사, 병합, props 전달, 함수 인수 및 해체입니다. 하나씩 이해해 보겠습니다.

<div class="content-ad"></div>

# 복사

기존 배열을 수정하지 않고 배열의 복사본을 만드는 것이 쉽게 가능합니다. 이 개념은 원본 소스를 영향을 주지 않고 데이터를 조작할 때 유용합니다. 객체에 대해서도 동일하게 작동합니다.

복사 과정에서 새로운 배열이나 객체에 효과적으로 키-값 쌍을 생성하며, 배열 요소가 값이 되고 그들의 인덱스(배열의 경우) 또는 객체 속성이 키가 됩니다.

```js
const oldArray = [1, 2, 3];
const newArray = [...oldArray];
console.log(newArray); // 출력: [1, 2, 3]
```

<div class="content-ad"></div>

더 보기: https://clubofprogrammers.com/spread-operator-in-react-js/

또한 힌디어로 된 리액트 강좌를 시청해보세요.
