---
title: "자바스크립트와 타입스크립트에서 1, 2, 3에 3이 있는지 확인하면 왜 false인가요"
description: ""
coverImage: "/assets/img/2024-06-20-Why3in123falseinJavaScriptTypeScript_0.png"
date: 2024-06-20 07:31
ogImage: 
  url: /assets/img/2024-06-20-Why3in123falseinJavaScriptTypeScript_0.png
tag: Tech
originalTitle: "Why 3 in [1, 2, 3] = false in JavaScript , TypeScript?"
link: "https://medium.com/@w3lt/why-3-in-1-2-3-return-false-464de649cb21"
isUpdated: true
---





<img src="/assets/img/2024-06-20-Why3in123falseinJavaScriptTypeScript_0.png" />

안녕 친구들, 이번 주에는 몇 가지 재미있는 것들을 배웠어요. 오늘은 그 중 일부를 공유하고 싶습니다. 주제는 in 연산자에 대한 것이에요. 간단한 예제로 시작해보죠:

```js
console.log(3 in [1, 2, 3]) // false
```

의아하지 않나요? 3이 [1, 2, 3] 안에 없어요. 왜 그럴까요??? 그 이유를 알아보기 위해 in 연산자를 살펴보도록 해요.


<div class="content-ad"></div>

그것에 대해 아시지 못하는 분들을 위해, in 연산자는 지정된 속성이 지정된 객체나 해당 프로토타입 체인에 있는지 확인하여 true를 반환합니다. (MDN에 따르면). 이해가 되지 않는다면, 아래에서 in 연산이 하는 일을 살펴봅시다:

- 속성이 객체 자체에 있는지 여부를 확인합니다.
- 속성이 객체에 있으면 true를 반환하고, 그렇지 않으면 이 객체의 부모 클래스를 확인합니다.
- 단계 2는 이 JavaScript 및 TypeScript (Object 클래스)의 모든 객체의 부모 클래스를 확인할 때까지 반복됩니다. 속성이 존재하면 true를 반환하고, 그렇지 않으면 false를 반환합니다.

이 개념을 설명하기 위해 빠른 예시를 살펴봅시다:

```js
class Person {
    constructor(public name: string, public age: number) { }
}

let person: Person = {
    name: 'John Doe',
    age: 24
};

console.log('name' in person); // true
console.log('age' in person); // true
console.log('job' in person); // false

// 결과
// true
// true
// false
```

<div class="content-ad"></div>

person 객체에는 이름과 나이가 있습니다. 따라서 `name` 및 `age`가 age에 대해 true를 반환하며, age도 마찬가지입니다. 그러나 person은 직업을 가지고 있지 않으므로 `job`은 person에서 false를 반환합니다.

이제 Person 클래스를 상속한 Developer 클래스를 만들고 새로운 개발자 객체를 생성합니다:

```js
class Developer extends Person {
    constructor(name: string, age: number, public job: string) {
        super(name, age);
    }
}

let developer: Developer = new Developer('John Doe', 24, 'Software Developer');

console.log('name' in developer); // true
console.log('age' in developer); // true
console.log('job' in developer); // true

// 출력
// true
// true
// true
```

이제 developer 객체에는 job 속성이 있지만 명시적으로 이름과 나이가 없습니다. 이러한 속성은 Person 클래스에서 상속되었습니다. 그러나 `name` in developer는 여전히 true를 반환합니다. 왜냐하면 name은 Person 클래스의 속성이며 Developer 클래스가 이를 상속하기 때문입니다.

<div class="content-ad"></div>

알았어요. 그건 운영 동작을 위한 것이에요. 간단하죠? 그런데 왜 '운영 동작은 위험하다'고 말할까요? 제 의견으로는 두 가지 주요 이유가 있어요.

1. 배열에서 요소를 확인하기 위해 in을 사용

먼저, 사람들은 일반적으로 배열에 요소가 포함되어 있는지 확인할 때 in을 사용해요. 이렇게 하면 위험한데요, 왜냐하면 이 경우 in이 기대한 대로 작동하지 않기 때문이에요. 간단한 예제를 통해 살펴볼게요:

```js
let arr = [1, 2, 3];

console.log(1 in arr); // true
console.log(2 in arr); // true
console.log(3 in arr); // false

// 출력 결과
// true
// true
// false
```

<div class="content-ad"></div>

이 예시에서는 1과 2와 잘 동작하는 것을 볼 수 있지만, 3에서는 그렇지 않다는 것을 알 수 있어요. 왜 그럴까요? JavaScript와 TypeScript에서 배열은 인덱스가 키이고 값이 값인 객체입니다. 다른 버전에서 이 예시를 다시 작성해보도록 할게요.

```js
let arr = {
    0: 1, 1: 2, 2: 3
}

console.log(1 in arr); // true
console.log(2 in arr); // true
console.log(3 in arr); // false

// 출력
// true
// true
// false
```

이 예시는 이전과 완전히 동일하지만, 배열 형태로 나타내지 않고 객체 형태로 다시 작성했어요. 이렇게 하면 arr[0] = 1, arr[1] = 2, arr[2] = 3를 볼 수 있죠. 이전과 마찬가지로, 이제 모든 것이 명확해졌어요. 사실 키 3은 arr에 없기 때문에 3 in arr은 false를 반환합니다. 이것이 글 맨 위의 질문에 대한 답이에요. 이 동작은 매우 위험하며 배열에 요소가 포함되어 있는지 확인할 때 in을 사용해서는 안 돼요. 대신 includes를 사용해야 해요.

```js
let arr = [1, 2, 3];

console.log(arr.includes(1)); // true
console.log(arr.includes(2)); // true
console.log(arr.includes(3)); // true

// 출력
// true
// true
// true
```

<div class="content-ad"></div>

2. 정의되지 않은 속성과 함께 사용하기

자바스크립트에서는, 객체가 특정 속성을 가지고 있지 않은 경우, 예를 들어 person이 직업을 가지고 있지 않으면 person.job = undefined가 됩니다 (이 동작은 자바스크립트에만 해당되며, TypeScript에서 person 객체의 job에 접근하려고 시도하면 오류가 발생합니다). 그래서 사람들(나 포함)은 일반적으로 undefined 값을 가진 속성은 객체에 해당 속성이 존재하지 않음을 의미한다고 생각합니다. 그러나 이 직관은 전혀 사실이 아닙니다. 예를 살펴보겠습니다:

```js
interface IPerson {
    name?: string;
    age: number;
}

let person: IPerson = {
    name: 'John Doe',
    age: 24
};

console.log(person.name, 'name' in person); // John Doe true

person.name = undefined;

console.log(person.name, 'name' in person); // undefined true
```

명시적으로 person의 name을 undefined로 설정해도, `person`에 `name`이 여전히 true를 반환하는 것을 볼 수 있습니다. JavaScript와 TypeScript는 이 경우를 “name은 여전히 person 안에 있으며, 그저 정의되지 않았지만 여전히 존재한다”로 처리합니다. 이 경우는 디버깅하기 매우 어렵습니다. 왜냐하면 어디서 실수를 저질렀는지조차 알 수 없기 때문입니다. 그래서 우리가 해야 할 일은 무엇일까요? person.name = undefined로 설정하는 대신, 객체의 속성을 완전히 제거할 수 있는 삭제(delete) 작업이 있습니다.

<div class="content-ad"></div>

```js
인터페이스 IPerson {
    name?: string;
    age: number;
}

let person: IPerson = {
    name: 'John Doe',
    age: 24
};

console.log(person.name, 'name' in person); // John Doe true

delete person.name;

console.log(person.name, 'name' in person); // undefined false
```


아하, 그러니까 이제 없어졌네요. 속성을 삭제하지 않고 값을 undefined로 설정하고 싶다면 in 대신 !== 연산자를 사용할 수 있습니다:

```js
인터페이스 IPerson {
    name?: string;
    age: number;
}

let person: IPerson = {
    name: 'John Doe',
    age: 24
};

console.log(person.name, 'name' in person); // John Doe true

person.name = undefined;

console.log(person.name, person.name !== undefined); // undefined false
```

빠르게 다시 한 번 요약해보면


<div class="content-ad"></div>

본문 전체를 읽을 시간이 없는 분들을 위해 복습해 드릴게요:

- 객체와 함께 작업할 때에만 in 연산자를 사용해야 하며, 배열과 함께 사용해서는 안 됩니다.
- 속성을 undefined로 설정하는 대신에 완전히 제거하려면 delete 연산자를 사용하세요.
- 만약 속성을 undefined로 설정하길 원한다면 in 연산자 대신 !== 연산자를 사용하세요.

이번 글은 여기까지입니다. 읽어주셔서 감사합니다. 다음 흥미로운 글에서 만나요 :)