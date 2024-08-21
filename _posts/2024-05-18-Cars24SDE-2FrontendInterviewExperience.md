---
title: "Cars24 SDE-2 Frontend 면접 경험"
description: ""
coverImage: "/assets/img/2024-05-18-Cars24SDE-2FrontendInterviewExperience_0.png"
date: 2024-05-18 21:46
ogImage:
  url: /assets/img/2024-05-18-Cars24SDE-2FrontendInterviewExperience_0.png
tag: Tech
originalTitle: "Cars24 SDE-2 Frontend Interview Experience"
link: "https://medium.com/@prikshit8/cars24-sde-2-frontend-interview-experience-916345aeef3d"
isUpdated: true
---

나는 링크드인에서 리쿠루터에게 연락했다.

# 1차 면접 — JS

질문 1 — 클로저란 무엇이며 예시와 함께 설명해보세요.

```js
function closure() {
  let count = 0;
  return function test() {
    count++;
    return count;
  };
}

const closuredTest = closure();

console.log(closuredTest());
console.log(closuredTest());
console.log(closuredTest());
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

2번 문제 - 커리(curry)란 무엇이며 주어진 함수의 커리 고차 함수를 만드세요.

```js
function sum(a, b, c) {
  return a + b + c;
}
```

```js
function curry(fn) {
  return function curriedFn(...params) {
    if (params.length >= fn.length) {
      return fn(...params);
    } else {
      return function (...next) {
        return curriedFn(...params, ...next);
      };
    }
  };
}

let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3)); // 6, 일반적으로 호출 가능
console.log(curriedSum(1)(2, 3)); // 6, 첫 번째 인수 커리
console.log(curriedSum(1)(2)(3)); // 6, 완전한 커리
```

3번 문제 - Task Queue(작업 큐) 및 이벤트 루프에 대해 설명해보세요.
먼저 구두로 설명한 후 코드 스니펫을 작성했습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## question4 — output based question

```js
async function async1() {
  console.log("async1 start");
  const data = await async2();
  console.log(data);
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
  return "async2 completed";
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");
```

question 5 — explain this keyword and how can we change it forcefully

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```javascript
let obj = {
  name: "prikshit",
  myName(city, birthPlace) {
    console.log(this.name + " i live in " + city + " my birthplace is " + birthPlace);
  },
};

let obj2 = {
  name: "sohail",
};

// obj.myName.call(obj2,'blr');
// obj.myName.apply(obj2,['blr']);

const bindedFn = obj.myName.bind(obj2);

bindedFn("blr", "delhi");

obj.myName(); // this keyword here is obj
```

## 2nd Round — Machine Coding

1. **1st question** - 온라인/오프라인 상태를 보여주는 사용자 정의 훅을 만들어 보세요. (해결 사항)

2. **2nd question** - 그리드 라이트를 만들어 보세요. (Uber 인터뷰어들의 즐겨하는 문제)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 3차 라운드 — 기술 관리 라운드

이번 라운드에서 면접관은 전자 상거래 필터 구성 요소를 만들어 달라고 했어요.
