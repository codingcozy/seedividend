---
title: "자바스크립트 함수에 대한 인터뷰 개념"
description: ""
coverImage: "/assets/img/2024-05-14-InterviewConceptsonJavaScriptFunctions_0.png"
date: 2024-05-14 14:08
ogImage: 
  url: /assets/img/2024-05-14-InterviewConceptsonJavaScriptFunctions_0.png
tag: Tech
originalTitle: "Interview Concepts on JavaScript Functions"
link: "https://medium.com/@prakash_pun/interview-concepts-on-javascript-functions-c69dc844fd46"
isUpdated: true
---




![image](/assets/img/2024-05-14-InterviewConceptsonJavaScriptFunctions_0.png)

이 기사는 현재 작업 중인 JavaScript 인터뷰 컨셉을 준비하는 데 도움이 되는 안내서를 기반으로 합니다. 처음 두 장(chapter)는 지금 무료로 다운로드할 수 있습니다. 가이드에 대한 피드백을 주시면 감사하겠습니다.
PDF 다운로드 링크는 여기에 있습니다. [PDF 다운로드 링크](https://9820419704756.gumroad.com/l/gdycz)

이제, 이 기사의 주제로 넘어가 봅시다!

JavaScript에서 함수를 여러 가지 방법으로 만들 수 있습니다.



'function' 키워드를 사용하여 함수를 생성할 수 있습니다. 이를 함수 선언이라고 합니다. 아래는 예시입니다:

```js
function addNumbers(a, b) {
  return a + b;
}
```

이 예시에서 'addNumbers'라는 함수를 선언했습니다. 두 개의 인수 'a'와 'b'를 받습니다. 함수의 코드 블록에서는 + 연산자를 사용하여 두 인수를 더한 후 결과를 반환합니다.

함수 선언을 사용하는 장점 중 하나는 호이스팅이 가능하다는 것입니다. 즉, 선언되기 전에 호출할 수 있다는 의미입니다.



기능 표현식: 함수 표현식은 함수를 변수에 할당하여 선언하는 방법입니다. 예시입니다:

```js
const multiply = function(a, b) {
  return a * b;
}
console.log(multiply(2,3)); // 결과: 6
```

함수 표현식을 사용하는 장점은 다른 함수에 인수로 전달할 수 있다는 것입니다.

화살표 함수: 화살표 함수는 JavaScript에서 함수를 선언하는 새로운 방법이며 `=` 연산자를 사용합니다. 여기 예시가 있습니다:



```js
const divide = (a, b) => {
  return a / b;
}
console.log(divide(6,3)); // 출력: 2
```

화살표 함수는 간결한 구문을 가지고 있어서 함수가 충분히 간단하다면 한 줄로 작성할 수 있습니다.

익명 함수: 익명 함수는 이름이 없는 함수로 다른 함수의 매개변수로 사용됩니다. 다음은 예시입니다:

```js
const numbers = [1, 2, 3, 4];
const double = numbers.map(function(num) {
  return num * 2;
})
console.log(double); // 출력: [2, 4, 6, 8]
```



익명 함수를 사용하는 장점은 다른 함수의 콜백 함수로 사용할 수 있다는 것입니다.

면접에서 기대할 수 있는 질문

자바스크립트에서 함수 범위의 개념을 설명해주세요.

함수 범위는 함수 내에서 변수의 가시성을 의미합니다. 함수 내에서 선언된 변수는 해당 함수 내에서만 지역 변수로써 사용되며 외부에서 접근할 수 없습니다. 이는 명명 충돌을 방지하고 캡슐화를 촉진하는 데 도움이 됩니다.



```js
function greet() {
  let message = "Hello!";
  console.log(message); // "Hello!"
}
greet();
console.log(message); // Uncaught ReferenceError: 'message' is not defined
```

JavaScript에서 콜백 함수란 무엇인가요?

콜백 함수는 다른 함수의 인수로 전달되어 외부 함수 내에서 호출되는 함수를 말합니다. 콜백 함수는 주로 비동기 작업, 이벤트 처리 및 고차 함수에서 사용됩니다.

```js
function doSomething(callback) {
   console.log("작업 중...");
   callback(); // 콜백 함수 실행
}
function callbackFunction() {
   console.log("콜백 함수 실행됨!");
}
// doSomething에 callbackFunction을 콜백으로 전달
doSomething(callbackFunction);
// 출력
/* "작업 중..."
"콜백 함수 실행됨!"
*/
```



자바스크립트에서 고차 함수란 무엇인가요?

고차 함수는 다른 함수를 인수로 받거나 함수를 결과로 반환하는 함수를 말합니다. 고차 함수는 함수 합성, 커링, 콜백과 같은 기능적 프로그래밍 패러다임을 지원합니다.

```js
// 고차 함수 예시
function operateOnArray(array, operation) {
  return array.map(operation); // 'operation'은 콜백 함수입니다
}
function double(num) {
  return num * 2;
}
let numbers = [1, 2, 3];
let doubledNumbers = operateOnArray(numbers, double);
console.log(doubledNumbers); // 출력: [2, 4, 6]
```

자바스크립트에서 함수 호이스팅이란 무엇인가요?



펑션 호이스팅은 JavaScript의 행동 중 하나로, 펑션 선언들이 컴파일 단계에서 자신을 포함하는 스코프의 맨 위로 이동하는 것을 말합니다. 이로 인해 함수들이 코드 내에서 선언되기 전에 호출될 수 있게 됩니다.

```js
sayHello(); // 출력: "Hello!"
function sayHello() {
  console.log("Hello!");
}
```

JavaScript에서 클로저(concept of closure)란 무엇인가요?

클로저는 함수와 해당 함수가 선언된 렉시컬 환경(lexical environment)의 조합을 의미합니다. 클로저를 통해 함수는 포함하는 스코프의 변수에 대한 참조를 유지하고 접근할 수 있게 되며, 포함하는 스코프의 실행이 완료된 이후에도 영향을 받습니다.



```js
function outerFunction() {
  let outerVariable = "외부 함수에서 왔어요";
  function innerFunction() {
    console.log(outerVariable); // 클로저에서 outerVariable에 접근
  }
  return innerFunction;
}
let closureFunc = outerFunction();
closureFunc(); // 출력: "외부 함수에서 왔어요"
```

자바스크립트 함수에서 `this` 키워드의 목적은 무엇인가요?

자바스크립트 함수에서 `this` 키워드는 함수가 호출된 위치의 문맥을 가리킵니다. 이를 통해 함수들은 자신을 호출한 객체의 속성에 접근하고 조작할 수 있어 코드 재사용 및 객체지향 프로그래밍 원칙을 용이하게 합니다.

```js
let person = {
  name: "John",
  greet: function() {
    console.log("안녕, " + this.name + "!");
  }
};
person.greet(); // 출력: "안녕, John!"
```



자바스크립트에서 함수 커링(function currying)이란 무엇인가요?

함수 커링은 여러 인수를 받는 함수를 각각 하나의 인수를 받는 중첩된 함수들의 연속으로 변환하는 과정입니다. 커링은 함수의 부분 적용을 가능하게 하여 더 큰 유연성과 재사용성을 제공합니다.

```js
// 함수 커링 예시
function multiply(a) {
  return function(b) {
    return a * b;
  };
}
let multiplyByTwo = multiply(2);
console.log(multiplyByTwo(5)); // 출력: 10
```

자바스크립트에서 즉시 호출 함수 표현식(IIFE)이란 무엇인가요?



IIFE는 JavaScript 디자인 패턴으로, 함수를 괄호로 둘러싸고 즉시 호출하는 것을 포함합니다. 함수에 대한 개인 스코프를 만들어 전역 스코프에서 변수 오염을 방지합니다.

```js
// 즉시 호출되는 함수 표현(IIFE)
(function() {
  let message = "IIFE에서 안녕하세요";
  console.log(message);
})();
// 출력: "IIFE에서 안녕하세요"
```

메모이제이션의 개념은 무엇이며, JavaScript 함수에서 어떻게 구현할 수 있을까요?

메모이제이션은 비싼 함수 호출의 결과를 저장하고 같은 입력이 다시 발생할 때 캐시된 결과를 반환하는 최적화 기술입니다. 클로저를 사용하여 이전에 계산된 결과를 캐싱함으로써 구현할 수 있습니다.



```js
function memoize(fn) {
  let cache = {};
  return function(...args) {
    let key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
}
// 메모이제이션에 이점을 가지는 함수 예시
const fibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
const result = fibonacci(10);
console.log(result); // 결과 55
```

이것으로 모두 마무리입니다! 이 기사 끝까지 읽어 주셔서 감사합니다. 계속해서 학습하고成長해 나가요.

JavaScript Interview Concepts- A Guide를 다운로드하시기를 잊지 마세요. 한정 기간 동안 무료로 제공될 것입니다.

만약 이 기사에서 가치 있는 내용을 좋아하고 배웠다면, 구독해주시고 기사에 박수를 보내주세요.