---
title: "자바스크립트의 기본 타입과 참조 타입 이해하기"
description: ""
coverImage: "/assets/img/2024-05-17-UnderstandingPrimitiveandReferenceTypesinJavaScript_0.png"
date: 2024-05-17 20:25
ogImage: 
  url: /assets/img/2024-05-17-UnderstandingPrimitiveandReferenceTypesinJavaScript_0.png
tag: Tech
originalTitle: "Understanding Primitive and Reference Types in JavaScript"
link: "https://medium.com/@sharareshaddev/understanding-primitive-and-reference-types-in-javascript-1994e307de0b"
---


JavaScript을 다룰 때, 원시(primitive) 타입과 참조(reference) 타입의 차이를 알고 데이터가 가변(mutable)인지 불변(immutable)인지 이해하는 것이 매우 중요합니다. 간단한 용어로 설명해보겠습니다.

원시 타입
원시 타입은 자신의 값을 직접 저장하는 기본 데이터 유형입니다. 이에는 다음이 포함됩니다:

```js
- Number: 1, 2.5, 100과 같은 숫자
- String: "hello", "123"과 같은 문자열
- Boolean: true 또는 false
- Null: 어떠한 객체 값도 의도적으로 없음을 나타내는 특별한 값
- Undefined: 할당된 값이 없는 변수를 나타냄
```

변수에 원시 값을 할당할 때, 값을 복사합니다.

<div class="content-ad"></div>

예시:

```js
let x = 10;
let y = x;
y = 20;
console.log(x); // 10
console.log(y); // 20
```

참조형 타입
객체(Object)와 배열(Array)과 같은 참조형 타입은 데이터가 메모리에 어디에 저장되어 있는지를 가리키는 참조(또는 주소)를 저장합니다.

```js
let obj1 = { name: "Ali" };
let obj2 = obj1;
obj2.name = "Reza";
console.log(obj1.name); // "Reza"
console.log(obj2.name); // "Reza"
```

<div class="content-ad"></div>

가변이란 무엇을 의미합니까?
가변이란 데이터가 생성된 후에 변경될 수 있다는 것을 의미합니다. JavaScript의 객체, 배열 및 함수는 가변입니다.

```js
let person = { name: "Ali", age: 25 };
person.name = "Reza";
console.log(person); // { name: "Reza", age: 25 }
// 배열을 사용한 예시:

let numbers = [1, 2, 3];
numbers.push(4);
console.log(numbers); // [1, 2, 3, 4]
```

불변이란 무엇을 의미합니까?
불변이란 데이터가 생성된 후에는 변경할 수 없다는 것을 의미합니다. 숫자, 문자열 및 불리언과 같은 기본 유형은 불변입니다.

문자열을 사용한 예시:

<div class="content-ad"></div>

```js
let greeting = "Hello";
let newGreeting = greeting.replace("H", "J");
console.log(greeting); // "Hello"
console.log(newGreeting); // "Jello"
```

왜 중요한가요?
- 메모리 관리: 가변 데이터는 변경이 원본 데이터에 직접적으로 반영되기 때문에 메모리 사용을 최적화하는 데 도움이 됩니다.

실용적인 팁:
객체나 배열을 다룰 때, 하나의 변수를 변경하면 다른 변수에도 같은 데이터를 참조하고 있다면 영향을 줄 수 있습니다. 이를 피하기 위해 깊은 복사(deep copy)를 사용할 수 있습니다.

```js
#### 객체의 깊은 복사:
let original = { name: "Ali", age: 25 };
let copy = JSON.parse(JSON.stringify(original));
copy.name = "Reza";
console.log(original); // { name: "Ali", age: 25 }
console.log(copy); // { name: "Reza", age: 25 }

<div class="content-ad"></div>

깊은 복사를 통해 원본 객체의 완전히 독립적인 복사본을 생성하므로 복사본을 변경해도 원본에는 영향을 미치지 않습니다.

---

이 개념을 이해하면 더 나은 코드를 작성하고 잠재적인 문제를 피할 수 있습니다. 이에 대해 어떻게 생각하시나요? 생각과 경험을 공유해 주세요!