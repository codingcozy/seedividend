---
title: "알아두면 빨리 퇴근하는 JavaScript 트릭 10가지"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "10 JavaScript Tricks You Didnt Know"
link: "https://medium.com/@khushi1399gupta/10-javascript-tricks-you-didnt-know-cb23d4bd23e6"
isUpdated: true
---





<img src="/assets/img/10JavaScriptTricksYouDidntKnow_0.png" />

# 1. 별칭을 사용한 구조 분해

구조분해 할당은 강력한 기능이에요. 할당 중에 변수의 별칭을 지정할 수 있다는 건 알고 계셨나요?

```js
const { prop1: newName1, prop2: newName2 } = object;
```

<div class="content-ad"></div>

여기서는 prop1과 prop2를 newName1과 newName2로 이름을 변경하고 있습니다.

## 2. 성능을 위한 메모이제이션

메모이제이션은 더 나은 성능을 위해 함수 결과를 캐시하는 기술입니다. 간단한 구현 방법은 다음과 같습니다:

```js
const memoizedFunction = (function () {
  const cache = {};
  return function (args) {
    if (!(args in cache)) {
      cache[args] = computeResult(args);
    }
    return cache[args];
  };
})();
```

<div class="content-ad"></div>

결과를 캐싱함으로써 중복된 계산을 피할 수 있어요.

# 3. 함수 합성을 위한 커링

커링을 통해 재사용 가능하고 조합 가능한 함수를 만들 수 있어요. 아래 간결한 커링 함수를 확인해보세요:

```js
const curry = (fn, ...args) =>
  args.length >= fn.length
    ? fn(...args)
    : (...moreArgs) => curry(fn, ...args, ...moreArgs);
```

<div class="content-ad"></div>

이를 사용하면 부분적으로 적용된 함수를 쉽게 만들 수 있어요.

## 4. Debouncing and Throttling

함수 실행 속도를 제어하는 것이 중요해요. 자주 발생하는 이벤트를 효율적으로 처리하기 위해 디바운싱과 스로틀링을 사용해보세요.

```js
const debounce = (func, delay) => {
  let timeoutId;

  return function (...args) {
    const context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

const throttle = (func, interval) => {
  let lastExecTime = 0;
  let timeoutId;

  return function (...args) {
    const context = this;
    const currentTime = new Date().getTime();

    if (currentTime - lastExecTime >= interval) {
      func.apply(context, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
        lastExecTime = currentTime;
      }, interval - (currentTime - lastExecTime));
    }
  };
};
```

<div class="content-ad"></div>

위 기술들은 성능을 향상시키며 과도한 함수 호출을 방지합니다.

## 5. 동적 객체 키

대괄호 표기법을 사용하여 동적으로 객체 키를 생성하세요:

```js
const dynamicKey = "key";
const obj = { [dynamicKey]: "value" };
```

<div class="content-ad"></div>

이것은 런타임에 키가 결정될 때 유용합니다.

# 6. 옵셔널 체이닝

옵셔널 체이닝은 많은 검사 과정 없이 중첩된 속성에 쉽게 접근할 수 있도록 도와줍니다.

```js
// 초보자:
let nestedValue;
if (object && object.property && object.property.nested) {
  nestedValue = object.property.nested;
} else {
  nestedValue = "default";
}

// 전문가:
let nestedValue = object?.property?.nested ?? "default";
```

<div class="content-ad"></div>

이렇게 하면 "cannot read property 'nested' of undefined" 오류를 방지하고 코드를 더 간결하게 만들 수 있어요.

# 7. 화살표 함수

화살표 함수는 함수를 정의하는 간결한 구문을 제공해줘요.

```js
// 초보자:
function add(a, b) {
  return a + b;
}

// 전문가:
const add = (a, b) => a + b;
```

<div class="content-ad"></div>

화살표 함수는 짧고 익명의 함수에 특히 유용합니다.

# 8. 배열 구조분해

구조 분해는 객체뿐만 아니라 배열에서도 작동합니다!

```js
// 초보자:
const array = [1, 2, 3];
const first = array[0];
const second = array[1];

// 전문가:
const [first, second] = [1, 2, 3];
```

<div class="content-ad"></div>

이를 통해 배열 요소와 작업하기가 더 쉬워집니다.

## 9. 객체 구조분해

배열 구조 분해와 유사하게, 이 기술은 객체에 사용됩니다.

```js
// 초보:
const user = { name: "John", age: 30 };
const name = user.name;
const age = user.age;

// 전문가:
const { name, age } = { name: "John", age: 30 };
```

<div class="content-ad"></div>

객체를 해체하여 간결하게 값을 추출하세요.

# 10. 유효성 검사를 위한 프록시

Proxy 객체를 사용하여 입력 유효성 검사를 수행하세요.

```js
const validator = new Proxy(
  {},
  {
    set: function (target, prop, value) {
      if (prop === "age" && typeof value !== "number") {
        throw new Error("나이는 숫자여야 합니다.");
      }
      target[prop] = value;
    },
  }
);
```

<div class="content-ad"></div>

프록시는 속성 할당을 가로챌 수 있고 검증할 수 있어 강력한 입력 제어를 제공합니다.
