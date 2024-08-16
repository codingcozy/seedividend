---
title: "리액트를 배우기 전에 반드시 알아야 할 JavaScript ES6 기능들"
description: ""
coverImage: "/assets/img/2024-06-20-JavaScriptES6FeaturesYouneedtoKnowbeforeLearningReact_0.png"
date: 2024-06-20 05:09
ogImage: 
  url: /assets/img/2024-06-20-JavaScriptES6FeaturesYouneedtoKnowbeforeLearningReact_0.png
tag: Tech
originalTitle: "JavaScript ES6 Features You need to Know before Learning React"
link: "https://medium.com/javascript-in-plain-english/javascript-es6-features-you-need-to-know-before-learning-react-2327501d0972"
isUpdated: true
---




## React를 배우기 전에 이 개념들을 꼭 익히세요

![JavaScript ES6 Features](/assets/img/2024-06-20-JavaScriptES6FeaturesYouneedtoKnowbeforeLearningReact_0.png)

React를 배우려는 경우, 당연히 JavaScript 기본 개념을 이해해야 합니다.

React는 또한 많은 ES6 개념을 사용하는데, 이미 알고 있어야 합니다. 이 튜토리얼에서는 React를 배우기 전에 꼭 알아야 할 가장 흔히 사용되는 ES6 기능을 다룰 것입니다. 이러한 개념을 학습하고 이해하는 것은 React 여행을 즐겁고 원할하게 만들어줄 것입니다.

<div class="content-ad"></div>

# 템플릿 리터럴

ES6는 문자열 작업을 쉽게 만들어주었습니다. 문자열을 더하기(+) 기호로 연결하는 대신, 템플릿 문자열은 더 간단한 방법을 제공합니다.

```js
// 문자열 연결하는 예전 방법
function sumNumbers(a, b) {
  return "The sum of " + a + " and " + b + " is " + (a + b);
}
// 템플릿 리터럴 사용
function sumNumbers(a, b) {
  return `The sum of ${a}  and ${b} is ${a + b}`;
}
```

템플릿 리터럴은 여러 줄 문자열을 다루는 것을 더 쉽게 만들어줍니다.

<div class="content-ad"></div>

```js
const multiLineString = `
  Lorem ipsum dolor sit amet,
  consectetur adipiscing elit.
  Sed do eiusmod tempor incididunt
  ut labore et dolore magna aliqua.
`;

``` 

# 화살표 함수

화살표 함수를 사용하면 코드를 더 간결하게 만들 수 있어요. 일반 함수와 화살표 함수의 차이를 살펴봅시다.

```js
// 일반 함수
function myFunction() {
  // 표현식 또는 문장
}
// 화살표 함수
const myArrowFunction = () => {
  // 표현식 또는 문장
};
```  

<div class="content-ad"></div>

화살표 함수를 사용하면 function 키워드 대신 뚱뚱한 화살표(=>)를 사용하여 코드를 더 간결하게 만들 수 있어요.

화살표 함수가 단일 표현식을 반환한다면 중괄호와 return 키워드를 생략할 수 있어요.

화살표 함수가 단일 매개변수를 가진다면 매개변수 주위의 괄호를 생략할 수 있어요.
```js
// 명시적 반환 단일 표현식
const add = (a,b) => a + b;

// 하나의 인수를 가져오는 경우 괄호를 생략해도 돼요
const squared = a => a * a;
``` 

<div class="content-ad"></div>

화살표 함수는 map(), filter(), forEach()와 같은 배열 메소드에서 일반적으로 사용됩니다.

```js
const names = ["Carol", "jane", "alice"];
const capitalizedNames = names.map((name) => name.toUpperCase());
console.log(capitalizedNames);

//출력  // [ 'CAROL', 'JANE', 'ALICE' ]
```

위의 예시에서 보듯이, 우리는 하나의 인자만 전달하므로 괄호를 생략했습니다.

# 객체 해체화

<div class="content-ad"></div>

JavaScript에서의 구조 분해는 배열에서 값이나 객체의 속성을 개별 변수로 푸는 과정을 말합니다. 이는 데이터베이스나 API와 같이 복잡한 데이터 구조를 다룰 때 유용합니다.

예를 들어, 간단한 고양이를 설명하는 객체가 있다고 가정해봅시다.

```js
const cat = {
  catName: 'Whiskers',
  age: 3,
  color: 'gray',
  breed: 'Persian'
};
```

고양이의 이름을 얻기 위해서는 보통 점 표기법이나 대괄호 표기법을 사용할 것입니다.

<div class="content-ad"></div>


```js
const cat = {
  catName: "Whiskers",
  age: 3,
  color: "gray",
  breed: "Persian",
};

// console.log(cat.catNname)
```

However, with object destructuring, you can unpack the properties into variable names and assign them to the cat object like this:

```js
const { catNname, age, color, breed } = cat;
console.log(`My cat ${catNname} is ${age} moths old`)
```

The output will be:


<div class="content-ad"></div>

```js
내 고양이 'Whiskers'는 3개월입니다.
```

# 배열 해체

배열 해체는 객체 해체와 유사합니다. 직원 배열이 있다고 가정해봅시다:

```js
const employees = [
    'Carol kristen deck ',
    'john weber Smith',
    'Alice k Johnson'
];
```

<div class="content-ad"></div>

직원 목록에서 1번 인덱스의 직원을 가져오려면 다음과 같이 할 수 있어요:

```js
employees[1]
```

하지만 구조 분해를 사용하면 값을 이렇게 변수에 풀어낼 수 있어요:

```js
const employees = [
  "Carol kristen deck ",
  "john weber Smith",
  "Alice k Johnson",
];

const [E1, E2, E3] = employees;
```

<div class="content-ad"></div>

E1은 배열의 첫 번째 직원의 값이 되고, E2는 두 번째 직원의 값이 되는 식으로 진행됩니다. 만약 배열에서 첫 번째 직원만 필요하다면, 아래와 같이 나머지 부분을 비워두면 됩니다:

```js
const [E1, ,] = employees;
console.log(E1); 
// Carol kristen deck
```

# 객체 리터럴

객체 리터럴을 사용하면 객체를 작성할 때 중복을 피할 수 있습니다. 예를 들어, 아래와 같은 Task 함수 생성자를 가진 경우를 생각해보세요:

<div class="content-ad"></div>

```js
기본 형식보다 더 짧게 ES6 객체 리터럴로 작성할 수 있어요. 아래와 같이 써보세요;

function Task(title, description, priority) {
  return {
    title,
    description,
    priority,
  };
}

# 전개 연산자
```

<div class="content-ad"></div>

전개 연산자는 iterable 객체의 요소를 전개하는 데 사용됩니다. Iterable 객체에는 배열, 객체 및 문자열이 포함됩니다.

전개 연산자는 요소를 복사, 결합 또는 다른 함수에 인수로 전달하는 데 사용될 수 있습니다. 예를 들어, 배열을 다룰 때 원본 배열을 변경하지 않고 작업해야 할 때, 다음과 같이 전개 연산자를 사용하여 배열의 사본을 만들 수 있습니다:

```js
const names = ["Alice", "Bob", "Charlie", "Diana", "Ethan"];
const namesCopy = [...names]
console.log(namesCopy)
```

# 나머지 연산자

<div class="content-ad"></div>

램덤(…) 연산자는 세 개의 점을 사용하며 확산 연산자와 유사합니다. 하지만 램덤 연산자는 함수 매개변수 내에서 여러 인수를 하나의 배열로 수집하는 데 사용됩니다.

예를 들어, 숫자의 합계를 얻는 함수를 작성해야 한다고 가정해보겠습니다. 우리 배열이 무한수의 인수를 가질 수 있는 경우, 램덤 연산자를 사용하여 인수를 배열로 수집할 수 있습니다.

```js
function sumNumbers(...arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
```

그런 다음, 해당 함수를 사용하여 어떤 수의 인수든 처리할 수 있습니다.

<div class="content-ad"></div>

```js
numbers = [1, 2, 4];
grades = [30, 40, 50, 60, 70];
console.log(sumNumbers(...numbers)); // 출력 // 7
console.log(sumNumbers(...grades));   // 출력 // 250
```

나머지 연산자는 구조 분해 할당에도 사용할 수 있습니다. 예를 들어, 성적 배열의 첫 번째 요소를 추출해야 한다고 가정해보세요. 변수로 추출하고 나머지 요소를 아래와 같이 배열로 수집할 수 있습니다.

```js
grades = [30, 40, 50, 60, 70];
const [index0, ...arr] = grades;
console.log(math);
```

# for of 루프

<div class="content-ad"></div>

`for of` 루프는 배열, 문자열, 타입 배열, 맵, 세트 및 NodeList와 같은 반복 가능한 객체의 요소를 반복하는 데 사용됩니다. `for of` 루프의 구문은 다음과 같습니다:

```js
for (variable of iterable) {
  // 각 변수에 대해 실행할 코드
}
```

# 배열 순회

```js
const currencyCodes = ["USD", "EUR", "GBP", "JPY"];
for (const code of currencyCodes) {
  console.log(code);
}
// USD
// EUR
// GBP
// JPY
```

<div class="content-ad"></div>

# 객체 배열을 반복하는 방법

예를 들어, 아래와 같이 여러 객체가 포함 된 배열이 있다고 가정 해 봅시다.

```js
const currencies = [
    { currency: "US Dollar", code: "USD" },
    { currency: "Euro", code: "EUR" },
    { currency: "British Pound", code: "GBP" },
    { currency: "Japanese Yen", code: "JPY" }
  ];
```

currencies 배열을 반복하면 각각의 개별 객체를 얻을 수 있습니다.

<div class="content-ad"></div>

```js
for (const currency of currencies) {
  console.log(currency);
}
```

다음은 출력 결과입니다:

```js
{ currency: 'US Dollar', code: 'USD' }
{ currency: 'Euro', code: 'EUR' }
{ currency: 'British Pound', code: 'GBP' }
{ currency: 'Japanese Yen', code: 'JPY' }
```

# NodeList을 반복하는 방법

<div class="content-ad"></div>

노드 목록(NodeList)은 웹 페이지의 문서에서 추출된 노드들의 컬렉션입니다. 예를 들어, 페이지에 `li` 요소로 이루어진 `ul`이 있다고 가정해 보세요:

```js
<ul class="languages">
  <li>Python</li>
  <li>JavaScript</li>
  <li>Ruby</li>
</ul>
```

위와 같은 요소들을 포함하는 NodeList를 얻기 위해 querySelectorAll 속성을 사용할 수 있습니다.

```js
const listItems = document.querySelectorAll('.languages li')
```

<div class="content-ad"></div>

그럼, 각 요소의 textContent를 얻기 위해 for of 루프 개념을 사용해보세요.

```js
const listItems = document.querySelectorAll(".languages li");
for (const item of listItems) {
  console.log(item.textContent);
}
```

<img src="/assets/img/2024-06-20-JavaScriptES6FeaturesYouneedtoKnowbeforeLearningReact_1.png" />

# 결론

<div class="content-ad"></div>

거의 매일 사용하는 ES6 기능은 무엇인가요? 아래 댓글로 알려주세요.

읽어주셔서 감사합니다.

JavaScript를 마스터하는 가장 좋은 방법은 프로젝트를 만드는 것입니다. 실용적인 JavaScript 뉴스레터를 구독하여 JavaScript 기술을 향상시키세요.

# 간단명료하게 🚀

<div class="content-ad"></div>

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 👏️️로 칭찬하고 팔로우하기
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: CoFeed | Differ
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기