---
title: "실무에서 바로 써먹는 10가지 자바스크립트 꿀팁"
description: ""
coverImage: "/assets/img/2024-06-23-10PracticalJavaScriptTips_0.png"
date: 2024-06-23 13:10
ogImage: 
  url: /assets/img/2024-06-23-10PracticalJavaScriptTips_0.png
tag: Tech
originalTitle: "10 Practical JavaScript Tips"
link: "https://medium.com/@aifou/10-practical-javascript-tips-ea208f5f7d57"
---


<img src="/assets/img/2024-06-23-10PracticalJavaScriptTips_0.png" />

1. 매개변수 객체를 배열로 변환해보세요.

매개변수 객체는 함수 내에서 접근할 수 있는 배열과 유사한 객체로, 해당 함수에 전달된 매개변수 값들을 포함합니다. 그러나 배열 메소드를 가지고 있지 않습니다. 다행히도 이를 일반 배열로 변환할 수 있습니다:

```js
var argArray = Array.prototype.slice.call(arguments);
```

<div class="content-ad"></div>

2. 배열 안의 모든 값을 합산해보세요.

루프를 사용하는 대신 reduce 메소드를 사용할 수 있어요:

```js
var numbers = [3, 5, 7, 2];
var sum = numbers.reduce((x, y) => x + y);
console.log(sum); // 결과는 17이 나옵니다
```

3. 조건부 단축 평가.

<div class="content-ad"></div>

명시적인 if 문 대신에 짧게 작성할 수 있어요:

```js
if (hungry) {
   goToFridge();
}
```

&& 연산자를 사용해 더 짧게 쓸 수 있어요:

```js
hungry && goToFridge();
```

<div class="content-ad"></div>

4. 조건문과 논리 OR를 함께 사용하세요.

undefined를 얻지 않도록 불필요한 변수를 선언하지 마세요:

```js
function doSomething(arg1){ 
    arg1 = arg1 || 32; // arg1이 이미 설정되지 않았다면 32로 설정
}
```

5. 쉼표 연산자.

<div class="content-ad"></div>

쉼표 연산자는 각 피연산자를 왼쪽에서 오른쪽으로 평가하고 마지막 피연산자의 값 반환합니다:

```js
let x = 1;
x = (x++, x);
console.log(x); // 예상 결과: 2
x = (2, 3);
console.log(x); // 예상 결과: 3
```

6. length를 사용하여 배열의 크기를 조정합니다.

크기 조정 또는 배열 비우기:

<div class="content-ad"></div>

```js
var array = [11, 12, 13, 14, 15];  
console.log(array.length); // 5   
array.length = 3;   
console.log(array.length); // 3   
console.log(array); // [11, 12, 13]
array.length = 0;   
console.log(array.length); // 0   
console.log(array); // []

7. Swap values using array destructuring.

Swap values without using a temporary variable:

let a = 1, b = 2;
[a, b] = [b, a];
console.log(a); // -> 2
console.log(b); // -> 1

<div class="content-ad"></div>

배열의 요소들을 섞어보세요.

배열 요소들을 무작위로 섞어보세요:

var list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(list.sort(function() {
    return Math.random() - 0.5;
}));
// [4, 8, 2, 9, 1, 3, 6, 5, 7]

9. 동적 속성 이름.

<div class="content-ad"></div>

객체를 선언하기 전에 동적 속성을 할당해 보세요:

const dynamic = 'color';
var item = {
    brand: 'Ford',
    [dynamic]: 'Blue'
}
console.log(item);
// { brand: "Ford", color: "Blue" }

10. 고유한 값을 필터링하세요.

ES6를 즐기는 분들을 위해, Spread 연산자를 사용하여 Set 객체를 활용해 새로운 배열을 만들어 보세요:

<div class="content-ad"></div>

const my_array = [1, 2, 2, 3, 3, 4, 5, 5];
const unique_array = [...new Set(my_array)];
console.log(unique_array); // [1, 2, 3, 4, 5]

- 인수 객체는 함수 내에서 액세스할 수 있는 유사 배열 객체이며, 해당 함수에 전달된 매개변수의 값을 포함합니다. 그러나 배열 메서드가 없습니다. 다행히도 일반 배열로 변환할 수 있습니다: