---
title: "ES6의 최고 기능 10선"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Top 10 ES6 Features"
link: "https://medium.com/stackademic/top-10-es6-features-5f0e998198bb"
---



## JavaScript 개발 향상

ES6, 즉 ECMAScript 2015의 등장은 JavaScript의 진화에서 중요한 이정표를 찍었습니다. 이로써 개발자들에게 더 강력하고 효율적이며 표현력 있는 도구로 변모된 많은 기능이 소개되었습니다. 이러한 발전은 단순히 구문적인 요소를 추가하는 데 그치지 않았습니다. 오히려 JavaScript 코딩에 접근하는 방법을 근본적으로 개선하여 직관적이고 유지보수가 용이하며 견고한 코드를 작성할 수 있게 만들었습니다. 이러한 특징을 흥미로운 예시와 실제 사례를 통해 살펴보며 그 잠재력을 탐구해봅시다.

# 목차

- 화살표 함수
  - 화살표 함수에서 “this”이해하기
- 구조 분해 할당
  - 배열 구조 분해
  - 객체 구조 분해
- 템플릿 리터럴
- 향상된 객체 리터럴
- 클래스
- 프로미스
- 비동기/동기 조합 (Async/Await)
- 모듈
- 전개 및 나머지 연산자
- 향상된 객체 속성
  - 계산된 속성명
  - 메소드 속성 단축 구문
  - 속성 값 단축 구문
- 결론

<div class="content-ad"></div>

# 1. 화살표 함수: 간결함과 명확성으로 나아가기

화살표 함수는 JavaScript에서 함수 표현식을 간결하게 작성하는 방법입니다. 특히, 다른 함수에 인수로 전달되는 작은 함수를 작성해야 할 때 유용합니다. 화살표 함수의 구문은 `() =` {}로, 인수는 괄호 안에, 함수의 본문은 중괄호 안에 작성됩니다.

## 1.1 화살표 함수에서의 "this" 이해하기:

화살표 함수는 자체적인 this 컨텍스트를 갖지 않고 주변 코드의 this를 상속합니다. 이는 콜백 함수 내에서 포함 범위의 this 컨텍스트에 접근하고 싶을 때 특히 유용합니다.

<div class="content-ad"></div>

예시: 어떤 상태에 따라 제품을 필터링하고 싶은 전자상거래 사이트를 고려해 보세요. 화살표 함수를 사용하면 코드가 짧아지는 것뿐만 아니라 더 읽기 쉬워집니다.

```js
const products = [
  { name: "노트북", price: 1000 },
  { name: "스마트폰", price: 500 },
];

const affordable = products.filter((product) => product.price < 800);
console.log(affordable);
// [{name: '스마트폰', price: 500}]
```

이 예시는 일상적인 코딩 작업에서 화살표 함수의 우아함과 유용성을 강조합니다.

# 2. 구조 분해 할당: 우아하게 풀어보기

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경하세요.

Destructuring은 배열에서 값들을 분리하거나 객체에서 속성들을 개별 변수로 풀어낼 수 있게 해주는 기능입니다. 이를 통해 데이터에 접근하는 과정을 간소화하고 코드를 더 깔끔하고 가독성 있게 만들 수 있습니다.

## 2.1 배열 구조 분해:

배열에서 요소를 검색할 때 유용합니다. 예를 들어, [이름, 성, 나이]와 같은 사용자 데이터 배열이 있다면, 이를 한 줄로 각각의 변수로 추출할 수 있습니다.

## 2.2 객체 구조 분해:

<div class="content-ad"></div>

객체에서 속성을 추출할 수 있습니다. 함수 매개변수나 복잡한 객체를 다룰 때 매우 편리합니다.

예시: 로깅 라이브러리 구성을 설정한다고 상상해보세요. 각 속성에 수동으로 액세스하는 대신, 구조 분해는 더 선언적인 접근 방식을 제공합니다.

```js
const config = {
  level: "debug",
  filename: "logs.txt",
  maxSize: "10MB",
};

function setupLogger({ level, filename, maxSize }) {
  console.log(
    `로거 설정 중: 레벨 ${level}, 파일 ${filename}, 최대 크기 ${maxSize}`
  );
}

setupLogger(config);
```

이 방식은 보일러플레이트 boilerplate를 줄이는데 도움을 줄 뿐만 아니라 코드의 가독성도 향상시킵니다.

<div class="content-ad"></div>

# 3. 템플릿 리터럴: 문자열 연결 이상의 기능

템플릿 리터럴은 표현식이 내장된 문자열을 만드는 쉬운 방법을 제공하여 동적인 문자열 생성을 가능케 합니다. 역따옴표(`)로 둘러싸여 있으며, ${expression} 형식으로 변수나 표현식에 대한 자리 표시자를 포함할 수 있습니다. 이 기능은 변수를 포함한 문자열 생성, 내용을 조건부로 추가하는 것, 또는 연결없이 여러 줄에 걸친 문자열을 만드는 데 특히 유용합니다.

실제 시나리오: 새로 가입한 사용자에게 개인화된 환영 이메일을 보내어 해당 사용자의 이름과 가입 날짜를 이메일 텍스트에 직접 편입하는 경우

```js
const emailContent = `안녕하세요 ${userName}님,

저희 서비스에 오신 것을 환영합니다! ${signUpDate}에 가입해주셨군요.

감사합니다,
팀`;
```

<div class="content-ad"></div>

이 방법을 사용하면 동적 문자열 작성이 간단하고 가독성이 좋아집니다.

## 4. 강화된 객체 리터럴: 직관적인 객체

ES6의 강화된 객체 리터럴은 객체 생성을 더 직관적으로, 덜 장황하게 만들었습니다. 주요 향상 사항에는 shorthand 속성이 포함됩니다. 속성 이름과 변수 이름이 동일한 경우 값은 생략할 수 있으며 메서드 속성을 포함하여 객체 내에서 함수를 보다 간결하게 정의할 수 있습니다.

실제 시나리오: 사용자 인터페이스 구성 요소의 구성 옵션 설정, 객체 리터럴을 사용하여 이제 더 간결하고 가독성이 좋아질 수 있습니다:

<div class="content-ad"></div>

```js
const animationDuration = 300;

const uiConfig = {
  animationDuration, // Shorthand property
  hide() {
    // Method property
    console.log("UI 컴포넌트 숨기기");
  },
};
```

# 5. 클래스: 구조화되고 가독성이 좋은 객체 지향 프로그래밍

JavaScript 클래스는 객체를 생성하고 상속을 관리하기 쉽게하는 구문을 제공합니다. 이는 다른 언어에서 익숙한 객체 지향 프로그래밍(OOP) 모델을 반영하여 개발자들에게 더 익숙한 방식으로 기능과 데이터를 캡슐화합니다. 클래스는 데이터와 기능을 캡슐화하고 다른 클래스를 확장할 수 있어서 코드 재사용과 유지 보수성을 증가시킵니다.

실제 시나리오: 특정 능력을 가진 서로 다른 유형의 캐릭터를 가지고 있는 간단한 게임을 만들고자 합니다. 클래스를 사용하면 공통 속성 및 메서드를 갖는 기본 캐릭터를 정의하고, 이 기본 클래스를 확장하여 다양한 캐릭터 유형을 만들 수 있습니다.

<div class="content-ad"></div>

```js
class Character {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }

  attack(target) {
    console.log(`${this.name} attacks ${target.name}`);
  }
}

class Wizard extends Character {
  castSpell(spell, target) {
    console.log(`${this.name} casts ${spell} on ${target.name}`);
  }
}
```

클래스를 사용하면 객체의 구조를 명확하고 간결하게 만들 수 있으며, 상속을 사용하면 코드를 이해하고 유지보수하기 쉬운 방식으로 작성할 수 있습니다.

# 6. Promises: 비동기 작업 관리

Promise는 비동기 작업의 최종 완료(또는 실패)를 나타내는 객체입니다. Promise는 비동기 논리를 처리하는 강력한 방법을 제공하여, 전통적인 콜백 기반 접근 방식에 비해 더 깔끔하고 관리하기 쉬운 코드를 작성할 수 있습니다.

<div class="content-ad"></div>

작동 방식: Promise는 세 가지 상태를 가지고 있습니다: 대기 중, 이행됨 또는 거부됨. 성공적으로 약속이 완료되거나 실패한 경우 콜백을 첨부할 수 있습니다. 성공한 경우에는 .then()을 사용하고, 에러가 발생한 경우에는 .catch()을 사용합니다.

실제 시나리오: API에서 데이터를 요청하는 앱을 작성 중이라고 상상해 보세요. 중첩된 콜백을 사용하는 대신, 약속을 사용하여 HTTP 요청의 비동기 특성을 처리할 수 있습니다.

```js
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("데이터 검색 실패:", error));
```

이 구조는 코드를 읽고 디버그하기 쉽게 만들어줍니다. 특히 복잡한 비동기 작업 시퀀스에 대해 매우 효과적입니다.

<div class="content-ad"></div>

# 7. Async/Await: Promises를 위한 구문적 설탕

Async/await은 promise를 다루는 것을 단순화하는 기능으로, 동기 코드처럼 보이고 동작하는 비동기 코드를 작성할 수 있게 해줍니다. 함수를 async로 표시하면 해당 함수가 promise를 반환함을 선언하고, await은 promise가 해결될 때까지 실행을 일시 중지할 수 있습니다.

주요 장점: 이 접근 방식은 비동기 코드의 복잡성을 크게 줄여 이해하고 유지하는 것을 쉽게 만듭니다.

실제 시나리오: API에서 사용자 데이터를 가져오고 해당 사용자를 기반으로 관련 데이터를 가져 오기 위한 함수를 작성 중이라고 가정해 보겠습니다.

<div class="content-ad"></div>

```js
비동기 함수인 getUserAndData(userId)는 userId를 인자로 받아와서, 해당 userId에 해당하는 사용자 정보를 가져와서 그 사용자의 데이터를 가져오는 기능을 합니다. 이 함수는 프로미스를 연쇄적으로 사용하거나 콜백 함수를 사용하는 것보다 읽기 쉽고 이해하기 쉽습니다.

## 8. 모듈: 대규모 코드베이스 구조화하기

JavaScript의 모듈은 코드를 재사용 가능한 조각으로 분할할 수 있게 해주며, 각각의 기능을 캡슐화합니다. ES6에서는 표준화된 모듈 시스템을 도입하여 export를 사용하여 모듈의 일부를 다른 파일에서 사용할 수 있게 하고, import를 사용하여 해당 모듈을 불러올 수 있게 합니다.
```

<div class="content-ad"></div>

혜택: 모듈은 코드 구조화, 의존성 관리, 코드 공유 및 재사용 개선에 도움이 됩니다.

현실 세계 시나리오: 응용 프로그램 전반에 걸쳐 사용되는 공통 함수를 포함하는 유틸리티 모듈이 있습니다. 이러한 함수들을 내보내면 필요한 곳이면 어디서든 쉽게 재사용할 수 있습니다.

```js
// mathUtils.js
export function add(x, y) {
  return x + y;
}

// app.js
import { add } from "./mathUtils.js";

console.log(add(5, 10));
```

이 모듈화 접근 방식은 특히 대규모 응용 프로그램에서 유지보수성과 확장성을 향상시킵니다.

<div class="content-ad"></div>

# 9. 펼침 및 나머지 연산자: 작업 다양성

펼침 (...) 연산자를 사용하면 반복 가능한 항목을 개별 요소로 확장할 수 있고, 나머지 연산자를 사용하면 여러 요소를 하나의 배열로 압축할 수 있습니다. 이러한 연산자들은 배열과 객체를 다루는 과정을 간단하게 만들어주어 함수를 더 유연하게 만들어줍니다.

펼침 연산자 사용 사례: 배열 병합 또는 객체 속성 결합이 간단해집니다

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const mergedArr = [...arr1, ...arr2];

const obj1 = { name: "John" };
const obj2 = { age: 30 };
const combinedObj = { ...obj1, ...obj2 };
```

<div class="content-ad"></div>

나머지 연산자 사용 사례: 함수 인수의 무한한 수를 처리하는 것이 훨씬 깔끔합니다

```js
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
```

이러한 연산자들은 컬렉션과 함수를 다루는 강력한 메커니즘을 제공하여 언어의 유연성과 표현력을 향상시킵니다.

# 10. 향상된 객체 속성:

<div class="content-ad"></div>

자바스크립트의 발전으로 ES6는 개체의 생성과 조작을 간소화하는 기능을 도입하여 코드를 좀 더 간결하고 표현력 있게 만들었습니다. 이러한 기능들은 연산된 속성 이름, 메서드 속성 단축 구문, 속성 값 단축 구문 등이 있습니다. 이러한 기능은 객체를 처리하는 더 효율적인 방법을 제공하며, 자바스크립트 개발의 동적이고 유연한 성격을 반영합니다.

## 10.1 연산된 속성 이름:

여러분은 대괄호 표기법을 사용하여 객체 내에서 속성 이름을 동적으로 정의할 수 있습니다. 이는 변수 값에 기반한 키를 가진 객체를 생성하거나 유효한 식별자가 아닌 속성 이름을 다룰 때 특히 유용합니다.

```js
let propertyName = "username";
let value = "johnDoe123";

let user = {
  [propertyName]: value,
};

console.log(user.username); // "johnDoe123"
```

<div class="content-ad"></div>

## 10.2 메서드 속성 단축형:

함수 키워드 없이 객체의 메서드를 정의할 수 있어서 객체 메서드의 구문을 더 간결하고 깔끔하게 만들어줍니다.

```js
const calculator = {
  add(x, y) {
    return x + y;
  },
  subtract(x, y) {
    return x - y;
  },
};

console.log(calculator.add(5, 3)); // 8
```

## 10.3 속성 값 단축형:

<div class="content-ad"></div>

객체 속성에 변수를 할당할 때 구문을 간단화하여 변수 이름과 속성 이름이 동일한 경우의 코드를 줄이고 가독성을 향상시킵니다.

```js
let name = "John Doe";
let age = 30;

let user = { name, age };

console.log(user); // { name: "John Doe", age: 30 }
```

실제 시나리오: 사용자 입력 또는 외부 데이터에 따라 구성 요소 속성이 결정되는 동적 UI를 구축한다고 상상해보세요. 계산된 속성 이름을 사용하면 객체 키를 실시간으로 조정할 수 있으며 메서드 및 속성의 축약형을 사용하여 컴포넌트 객체를 간결하고 가독성있게 유지할 수 있습니다.

```js
function createComponent(type, action, value) {
  return {
    type,
    [action]: function () {
      console.log(`Action ${action} with value ${value}`);
    },
  };
}

const button = createComponent("button", "click", "Submit");
button.click(); // "Action click with value Submit"
```

<div class="content-ad"></div>

# 결론

ES6 이상에서 도입된 이러한 기능들은 JavaScript에서 개발자 경험을 크게 향상시켰습니다. 언어를 더 강력하고 표현력이 풍부하며 작업하기 쉽게 만들었습니다. 이러한 기능을 이해하고 활용함으로써 개발자는 더 효율적이고 깨끗하며 유지보수가 쉬운 코드를 작성할 수 있으며, 보다 견고하고 확장 가능한 응용 프로그램을 개발할 수 있게 됩니다. 비동기 작업을 처리하거나 코드베이스를 모듈로 구성하거나 컬렉션 및 매개변수를 다루는 경우, ES6+에는 일반적인 프로그래밍 과제를 해결하기 위해 고안된 다양한 기능이 제공되어 JavaScript 여행을 더 즐겁고 성공적으로 만들어 줍니다.

좋은 코딩 하세요! 💻
