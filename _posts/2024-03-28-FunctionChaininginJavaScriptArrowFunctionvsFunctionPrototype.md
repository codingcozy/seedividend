---
title: "자바스크립트에서의 함수 체이닝 화살표 함수 vs 함수 프로토타입 비교 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Function Chaining in JavaScript Arrow Function vs Function Prototype"
link: "https://medium.com/@anshumanupadhyay/function-chaining-in-javascript-arrow-function-vs-function-prototype-e5fa9e53cb89"
---



<img src="/assets/img/FunctionChaininginJavaScriptArrowFunctionvsFunctionPrototype_0.png" />

자바스크립트에서의 함수 체이닝은 한 줄의 코드로 객체나 함수에 대해 여러 작업을 보다 간편하고 가독성 있게 수행할 수 있는 방법을 제공합니다. 이 글에서는 sum1 및 sum2 함수 사이의 차이를 자세히 살펴보면서 체이닝된 합계 계산을 달성하는 데 사용된 자바스크립트 개념에 초점을 맞출 것입니다.

# 함수 버전

## 버전 1: sum1

<div class="content-ad"></div>

```js
this.ar = [];
let sum1 = (num1 = 0) => {
  if (!num1) {
    return this.ar.reduce((acc, cv) => acc + cv, 0);
  }
  this.ar.push(num1);
  return sum1;
};
```

## Version 2: sum2

```js
Function.prototype.ar = [];
function sum2(num1 = 0) {
  if (!num1) {
    return sum2.ar.reduce((acc, cv) => acc + cv, 0);
  }
  sum2.ar.push(num1);
  return sum2;
}
```

# JavaScript Concepts Used

<div class="content-ad"></div>

## 1. 화살표 함수와 일반 함수 비교

## sum1: 화살표 함수

sum1에서는 화살표 함수가 사용됩니다. 화살표 함수는 JavaScript에서 함수를 간결하게 작성하는 방법으로, 자신만의 this 컨텍스트를 바인딩하지 않습니다. 이 버전에서는 this.ar이 전역 범위에서 정의된 배열을 가리키므로, 여러 함수 호출을 통해 숫자를 저장하고 액세스할 수 있습니다.

## sum2: 일반 함수

<div class="content-ad"></div>

sum2에서는 일반 함수가 사용됩니다. 일반 함수에는 고유한 this 컨텍스트가 있어서 특정 시나리오에서 혼란을 줄 수 있습니다. 이를 피하기 위해 sum2는 Function 프로토 타입을 확장하고 sum2.ar을 사용하여 숫자를 저장하므로 배열이 올바른 컨텍스트 내에서 액세스됩니다.

## 2. Function Prototype Extension

### sum1: 프로토 타입 확장 없음

sum1에서는 Function 프로토 타입을 확장하지 않습니다. 대신, 이 함수는 this 컨텍스트를 사용하여 배열 this.ar에 액세스하고 조작합니다. 이 방법은 더 간단할 수 있지만, this 컨텍스트가 변경되면 예기치 않은 동작이 발생할 수 있습니다.

<div class="content-ad"></div>

## sum2: 프로토타입 확장

sum2에서 함수 프로토타입은 배열 sum2.ar를 추가하여 확장됩니다. 이렇게 함으로써 sum2는 함수 자체에서 배열에 직접 접근할 수 있도록 하여 this 컨텍스트와 관련된 잠재적인 문제를 제거합니다.

### 3. 기본 매개변수

sum1과 sum2 모두 기본 매개변수 (num1 = 0)를 사용하여 함수에 인수가 제공되지 않은 경우를 처리합니다. 이렇게 함으로써 함수가 손상되지 않고 배열에 저장된 숫자들의 올바른 합계를 반환할 수 있도록 보장합니다.

<div class="content-ad"></div>

# 결론

sum1과 sum2에서 사용된 기본 JavaScript 개념을 이해하는 것은 두 함수 버전 간의 차이에 대한 소중한 통찰력을 제공합니다. 두 함수 모두 숫자의 합을 연쇄적인 방식으로 계산하는 동일한 목표를 달성하지만, 이 기능을 실행하기 위해 다른 기술과 개념을 활용합니다.

- sum1은 화살표 함수를 활용하며, 숫자를 저장하고 액세스하기 위해 this 컨텍스트를 활용합니다.
- sum2는 일반 함수를 사용하며, Function 프로토타입을 확장하여 숫자를 저장하는 전용 배열을 생성하여 함수 연쇄에 일관되고 신뢰할 수 있는 접근 방식을 제공합니다.

화살표 함수 또는 일반 함수를 사용하는 코딩 스타일과 기호에 따라 필요에 맞는 버전을 선택할 수 있습니다. 두 버전 모두 JavaScript에서 함수 연쇄를 구현하는 실용적인 예를 제공하여 코드 가독성과 유지 보수성을 향상시킵니다. 여기에 재귀와 클로저도 사용할 수 있지만, 개인적으로 이 두 방법이 재귀와 클로저보다 직관적이라고 느낍니다! 즐거운 코딩하세요!
