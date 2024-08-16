---
title: "JavaScript에서 Promise의 사용법과 이유"
description: ""
coverImage: "/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_0.png"
date: 2024-05-14 13:05
ogImage: 
  url: /assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_0.png
tag: Tech
originalTitle: "The How and Why of Promises in JavaScript"
link: "https://medium.com/gitconnected/the-how-and-why-of-promises-in-javascript-f051361afb6b"
isUpdated: true
---




![Promises](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_0.png)

프로미스는 자바스크립트의 덤블도르라고 생각됩니다. JS에서 비동기적인 모든 것은 이 마법사에 의존합니다. 프로미스를 연구하는 두 종류의 사람이 있습니다. 첫째는 "오케이, Resolve와 Reject를 매개변수로 받는 함수를 전달하여 프로미스 생성자에 전달하고 비동기 작업을 수행하면 끝이야. 응, 쉬워서 쉽네" 하고 하는 사람들이고, 둘째는 프로미스의 작동에 관한 복잡한 질문이나 까다로운 질문을 생각해내는 사람들입니다. 이 영문은 정확히 그에 관한 것입니다. 프로미스 "Under the Hood".

# 이 영문에서 다룰 내용은 다음과 같습니다:

- 기본 프로미스 생성부터 시작하기.
- 여러 프로미스를 연결하는 방법 (프로미스 체이닝).
- .then()과 .catch()에서 반환하는 이유 (및 반환할 수 있는 모든 것).
- then()/catch()/finally() 내부의 핸들러 메소드의 부재.
- 동일한 프로미스 객체에 여러 핸들러 연결.
- .then()의 동기적 성격과 핸들러 메소드의 비동기적 성격.
- 처리되지 않은 프로미스의 [[Promise]] 슬롯의 연결.
- .then()으로 isRejected() 핸들러 vs. .catch()으로 isRejected() 핸들러.
- 몇 가지 tricky 코드 스니펫의 출력 예측.
- 프로미스 작동 방식을 이해하기 위해 커스텀 프로미스 생성하기.



노트-: 먼저 약속의 A-Z 작동 방식을 이해하는 데 도움이 되도록 익명 및 화살표 함수를 사용하지 않겠습니다. 그러나 이해도가 높아지면 코드에 이들을 도입할 것입니다.

## 자바스크립트에서 Promise는 무엇인가요?

![Promise](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_1.png)

이걸 꺾어 말해야해서 죄송하지만, Promise들은 덤블도어가 아니에요. 그냥 Promise 클래스의 객체일 뿐이죠. Promise들은 일련의 콜백 함수에 엮이는 거죠. MDN에서 이를 다음과 같이 정의했습니다:



조금 덜 무서운 비유적인 얘기로 말하자면, 엄마가 냄비에 우유를 담아 끓이기 위해 가스레인지에 놓고 급히 다른 일을 처리해야 할 때, 우유를 지켜보라고 너에게 부탁할 것이고 너는 필요한 양의 끓는 정도에 도달하면 버너를 끄거나 너무 끓어 넘치면 쏟아진 우유를 닦아내야 할 거야.

이 비유에서 당신의 엄마는 JS 해석기인데, 이 해석기는 단일 스레드이며 동기화 방식이니 main 쓰레드가 블록되지 않도록 (비동기 작업은 실행에 시간이 걸릴 수 있으므로, JS 해석기의 유일한 쓰레드인 main 쓰레드는 그 작업에 의해 블록됩니다.) 대기 중인 작업들을 계속 실행해야 합니다. 우유 끓이기는 비동기 작업을 나타냅니다. 버너를 끄는 것은 비동기 작업의 성공적인 완료시 수행해야 할 동작을 나타내며, 쏟아진 우유를 닦아내는 것은 비동기 작업 실행 중에 실패를 만났을 때 수행해야 할 동작을 나타냅니다. 그리고 마지막으로 당신은 Promise 객체입니다.

# 섹션 1: 기본 Promises

![이미지](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_2.png)



비유는 여기까지입니다. 자 이제 상황을 Promises를 사용하여 구현하는 코드를 작성해 보겠습니다-:

```js
function boilMilk(resolve, reject) {
  let milkBoiled = Math.random();
  if (milkBoiled >= 0.5) resolve("우유가 성공적으로 끓었습니다");
  else reject(new Error("우유가 너무 끓어 넘쳤습니다"));
}

function shutBurner(resolveValue) {
  console.log(`${resolveValue} 그리고 버너가 꺼졌습니다`);
}

function cleanSpilledMilk(rejectValue) {
  console.log(`${rejectValue} 따라서 넘친 우유를 청소합니다`);
}

function isResolved(resolveValue) {
  return shutBurner(resolveValue);
}

function isRejected(rejectValue) {
  return cleanSpilledMilk(rejectValue);
}

const motherPromise = new Promise(boilMilk);

motherPromise
  .then(isResolved)
  .catch(isRejected);
```

쉽죠? 그렇지 않다면 코드를 부분별로 살펴보세요:

- `new Promise(……)`는 Promise 클래스의 생성자 호출로 Promise 객체를 반환합니다. Promise 객체는 다음과 같습니다:




![Promise States](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_3.png)

여기서 [[PromiseState]]는 Promise 객체의 상태를 나타냅니다. Promise는 다음 중 하나의 상태를 가질 수 있습니다:

a. pending-: Promise 객체가 생성될 때의 초기 상태입니다. Promise 객체의 해결 또는 거부에 의해 변경될 것을 기다리고 있습니다.

b. fulfilled-: Promise가 해결되었음을 나타내는 상태이거나 비동기 작업이 성공했음을 의미합니다.




c. rejected-: 이것은 Promise의 상태로, Promise가 거부되었거나 비동기 작업이 실패했다는 것을 나타냅니다.

[[PromiseResult]]은 비동기 작업에 의해 반환된 실제 데이터, 메시지 또는 오류가 저장된 위치입니다.

2. 약속 생성자(boilMilk())에 전달된 함수는 Executor 함수로 알려져 있습니다. Executor 함수는 즉시 호출되는 콜백 함수로, 수행할 비동기 작업을 나타냅니다.

3. resolve()와 reject()는 약속 클래스의 도우미 함수로, 약속 객체의 상태를 대기 중인 상태에서 이행된 상태로 변이시키거나 반대로 거부된 상태로 변이하는 책임이 있습니다.



노트: Executor 함수의 인수로 흔히 볼 수 있는 resolve와 reject는 단순히 변수이기 때문에 아래 예시처럼 다른 이름을 지을 수 있습니다. 이들은 내부적으로 Promise 생성자에 의해 전달된 resolve()와 reject() 함수를 저장하는 데 사용됩니다. 섹션 10에서 사용자 정의 Promise를 만들 때 이를 실제로 보게 될 것입니다.

```js
function boilMilk(resolveMethod, rejectMethod) {
  let milkBoiled = Math.random();
  if (milkBoiled >= 0.5)    
    resolveMethod("우유가 성공적으로 끓었습니다");
  else 
    rejectMethod(new Error("우유가 과도하게 끓어 넘쳤습니다"));
}

const motherPromise = new Promise(boilMilk);
```

4. "약속이 처리되었다"라고 말할 때, 이는 Promise가 최종 상태(이행되었거나 거부된 상태)에 도달했다는 것을 의미합니다. 처리된 Promise는 비동기 작업을 완료하고 결과가 결정된 Promise입니다.

5. .then(), .catch() 및 .finally()는 Promise 클래스에 정의된 함수들입니다. 이러한 메서드를 사용하면 Promise에 "핸들러"를 연결하고 Promise가 성공 또는 실패할 때 무엇을 해야 하는지 지정할 수 있습니다. 이러한 메서드는 JS 해석기에 의해 "동기적으로" 호출됩니다. 각각의 메서드는 반환될 때 "보류 중" 상태인 새로운 Promise를 반환하며, 현재 Promise의 상태에 관계없이 해당됩니다. 이러한 메서드 각각은 Handler 메서드(우리의 경우 isResolved() 및 isRejected())라고 불리는 콜백 함수를 허용합니다. 반환된 Promise의 최종 상태는 이러한 핸들러에 달려 있습니다. 위 세 가지 메서드의 구문은 다음과 같습니다:



a. then(onFulfillment, onRejected) -: 여기서 onRejected 핸들러는 선택 사항입니다.

b. catch(onRejected) -: 위 체인에서 거부된 프로미스를 잡습니다.

c. finally(onFinally) -: 현재 프로미스의 상태에 관계없이 항상 실행됩니다. 주로 프로미스가 해결된 후 처리하거나 정리하는 데 사용됩니다.

6. onFulfillment(), onRejection() 및 onFinally()은 .then(), .catch() 및 .finally() 메서드에 전달되는 핸들러입니다. 현재 프로미스가 해결되면 onFulfillment() 핸들러가 "비동기적으로" 호출되고, 현재 프로미스가 거부되면 onRejection() 핸들러가 "비동기적으로" 호출되며, onFinally() 핸들러는 프로미스의 상태에 관계없이 항상 실행됩니다. 이러한 핸들러는 데이터, 오류 또는 새로운 프로미스를 반환할 수 있으며, 이를 .then() 및 .catch()로 계속 연결할 수 있습니다. 첫 번째 경우 .then()은 해당 데이터로 해결된 프로미스를 반환하고, 두 번째 경우 .then() 또는 .catch()는 오류가 포함된 거부된 프로미스를 반환합니다.



만약 위의 이야기가 어려운 것 같다면, 실제로 무슨 일이 일어나는지 더 잘 이해하기 위해 우리 코드의 제어 흐름을 살펴보겠습니다:

단계 1: JS Interpreter의 실행 단계에서, 먼저 새 Promise 인스턴스가 생성됩니다 (이 때 Promise의 상태는 "대기 중"입니다) 그리고 Executor 함수(boilMilk())가 Promise 생성자에 의해 즉시 호출됩니다.

단계 2: Executor 함수는 무작위로 생성된 값에 따라 즉시 resolve() 또는 reject() 함수를 호출하며, 메시지나 에러와 함께 해당 함수를 호출합니다. resolve()/reject() 함수는 Promise 객체의 상태([[PromiseState]])를 변경하고 [[PromiseResult]]에 메시지나 에러를 할당합니다.

참고: Promise 객체의 상태 변경은 resolve() 또는 reject()가 일정 지연 후에 호출될 때(비동기 실행을 모방하기 위해) 다음과 같이 확인할 수 있습니다:



```js
function boilMilk(resolve, reject) {
  setTimeout(() => {
    let milkBoiled = Math.random();
    if (milkBoiled >= 0.5)
        resolve("우유 끓였어요");
    else
        reject(new Error("우유가 넘쳐서 쏟았어요"));
  }, 2000);
}

function shutBurner(resolveValue) {
  console.log(`${resolveValue} 후에 버너를 끕니다`);
}

function cleanSpilledMilk(rejectValue) {
  console.log(`${rejectValue} 이라서 쏟아진 우유를 청소합니다`);
}

function isResolved(resolveValue) {
  return shutBurner(resolveValue);
}

function isRejected(rejectValue) {
  return cleanSpilledMilk(rejectValue);
}

var motherPromise = new Promise(boilMilk);
console.log(motherPromise);

motherPromise
  .then(isResolved)
  .catch(isRejected);

setTimeout(() => console.log(motherPromise), 3000);
```

boilMilk() 함수는 이제 setTimeout()을 사용하여 2초 후에 resolve() 또는 reject()를 호출하며, 첫 번째 console.log 문이 실행될 때 promise 객체의 상태가 "대기 중"이 됩니다. 이후 "이행됨"으로 변경됩니다:

<img src="/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_4.png" />

단계 3: 이제 .then() 도우미 메서드가 "동기적으로" 호출되며, 여기서 핸들러 콜백은 "비동기적으로" 호출됩니다. 이는 "대기 중" promise를 반환합니다.



### 단계 4: 현재 Promise 객체의 상태가 "이행(fulfilled)" 상태가 된 것을 고려하면 isResolved() 핸들러가 호출됩니다. 이때 현재 Promise 객체의 [[PromiseResult]]를 인수로 전달받습니다.

### 단계 5: isResolved() 핸들러는 .then()으로 반환된 Promise의 상태를 "이행(fulfilled)"으로 변경합니다. 그리고 shutBurner() 메소드가 아무 것도 반환하지 않기 때문에 새로 반환된 Promise의 [[PromiseResult]]에는 undefined가 들어갑니다. 아래에서 이를 설명했습니다:

```js
function boilMilk(resolve, reject) {
  setTimeout(() => {
    let milkBoiled = Math.random();
    if (milkBoiled >= 0.5) 
        resolve("우유가 성공적으로 끓었습니다");
    else 
        reject(new Error("우유가 너무 끓어 넘쳐버림"));
  },5000);
}

function shutBurner(resolveValue) {
  console.log(`${resolveValue} 그리고 버너를 끕니다`);
}

function cleanSpilledMilk(rejectValue) {
  console.log(`${rejectValue} 그래서 넘쳐난 우유를 청소합니다`);
}

function isResolved(resolveValue) {
  return shutBurner(resolveValue);
}

function isRejected(rejectValue) {
  return cleanSpilledMilk(rejectValue);
}

const motherPromise = new Promise(boilMilk);

const thenPromise = motherPromise.then(isResolved).catch(()=>{});
console.log(thenPromise);
setTimeout(()=>console.log(thenPromise),6000);

const catchPromise = motherPromise.catch(isRejected);
```



<img src="/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_5.png" />

참고: .then() 메소드에 .catch()를 첨부하는 이유는 나중에 섹션 7에서 설명될 예정입니다.

단계 6: 해결된 프로미스는 .catch() 메소드가 첨부된 체인으로 전달됩니다. 그러나 isRejected() 핸들러는 호출되지 않으며, 마지막으로 .catch()는 "보류 중"인 프로미스를 반환하며, 이는 우리 코드에서 나중에 사용되지 않기 때문에 가비지 컬렉션됩니다.

# 섹션 2: 프로미스 체이닝



<img src="/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_6.png" />

이 섹션에 도달하여 축하합니다. 이제 "기본 프로미스가 작동하는 방법"에 대한 이해가 있습니다. 더 나아가서 여러 프로미스가 연속적으로 실행되거나 1개의 프로미스의 완료 또는 거부가 다른 프로미스를 처리하는 상황을 살펴봅시다.

문제 설명:

엄마로부터 (우유 끓이기)라는 작업을 할당 받은 후에, 작업을 성공적으로 수행하면 엄마가 오늘 저녁을 만들어야 하고 당신은 다른 작업을 수행할 수 있어야 한다고 말합니다. 그리고 저녁으로 페스토 스파게티를 먹기를 희망하고 있습니다. 보관함을 검사하고 파스타가 충분히 있다는 것을 발견하면, 파스타 요리는 성공적이지만, 1인분조차 충분하지 않는다면 실패합니다.



위의 코드는 두 개의 Promise 기능을 사용하여 우유 끓이기와 스파게티 요리하기를 나타냅니다. 우유를 끓일 때는 `boilMilk` 함수를 사용하고, 스파게티를 요리할 때는 `cookSpaghetti` 함수를 사용합니다. 그리고 제대로 끓였을 때와 재료가 부족했을 때에 따라 다른 결과를 반환합니다. 코드를 실행하면서 발생하는 결과는 아래 이미지와 같습니다:

![Possible outcomes](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_7.png)



![표 이미지](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_8.png)

![표 이미지](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_9.png)

이렇게 간단했어요. 하나의 promise가 또 다른 promise로 이어지고, 두 promise 모두 작동 방식은 같아요.

이제 Promise를 구현하는 방법을 알았으니, 위 코드에서 모든 함수 정의를 익명 함수와 화살표 함수로 바꾼 것을 보셔도 무서워하지 마세요.



## Section 3: .then() 및 .catch()에서 반환하기

```js
const motherPromise = new Promise((resolve, reject) => {
  let milkBoiled = Math.random();
  if (milkBoiled >= 0.5) 
    resolve("우유가 성공적으로 끓었어요");
  else 
    reject(new Error("과도한 끓임으로 우유가 흘렀어요"));
})
  .then((resolveValue) => {
    console.log(`${resolveValue} 그리고 버너가 꺼졌어요`);
    return new Promise((resolve, reject) => {
      let spaghettiStock = Math.random();
      if (spaghettiStock >= 0.5)
        resolve("스파게티가 성공적으로 요리되었어요");
      else 
        reject(new Error("충분한 파스타가 없어요"));
    })
      .then((resolveValue) => console.log(`${resolveValue} 그리고 접시에 담겼어요`))
      .catch((rejectValue) => console.log(`${rejectValue} 그래서 지루한 음식이 요리되고 접시에 담겼어요`));
  })
  .catch((rejectValue) => {
    console.log(`${rejectValue} 그래서 흘린 우유를 청소하고`);
    return "마지막으로 바닥을 닦았어요";
  });
```

비슷하게, 우유가 흐르게 되었을 때 엄마가 수행해야 할 추가 작업에 대한것을 생각할 수 있고, 쓰레기 처리를 하고 원래 Promise의 catch() 메서드에서 그것을 반환할 수 있어요.



![image](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_10.png)

3.1. .then() 및 .catch()에서 반환할 수 있는 모든 것은 무엇인가요?

기술적으로 .then() 및 .catch()에서는 어떤 것이든 반환할 수 있습니다. 다만, 연쇄(chain)에서 위에서 전달된 값이 받아들이거나 catch해야 할 것이 있어야 합니다. 그렇지 않으면 Uncaught error 예외가 발생할 수도 있고, 로그에 예상치 못한 출력이 나올 수도 있습니다.

예시 1:



```js
const promise = new Promise((resolve,reject) => {
    let num = Math.random();
    setTimeout(num >= 0.5? resolve("Promise resolved") : reject("Promise rejected"),2000);
})
.then(function (resolveValue) {
    console.log(resolveValue);
})
.catch(function(rejectValue) {
    console.log(rejectValue);
});
```

위의 코드는 명확하게 "Promise Resolved" 또는 "Promise Rejected" 둘 중 하나의 결과를 얻을 수 있습니다. 내부적으로 then()은 [[PromiseResult]]가 undefined인 처리된 Promise를 반환합니다. 이는 catch()로 처리할 필요 없이 코드가 종료됩니다. 그렇다면 체인에 다른 then()이 있는 경우 어떻게 될까요? 확인해 봅시다:

예시 2:

```js
const promise = new Promise((resolve,reject) => setTimeout(() => resolve("Promise resolved"),2000))
.then(function (resolveValue) {
    console.log(resolveValue);
})
.then((resolveValue) => {
    console.log(resolveValue);
})
.catch(function(rejectValue) {
    console.log(rejectValue);
});
```



![이미지](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_11.png)

여기서 왜 undefined를 얻었을까요? 이건 초기 프로미스가 해결되었을 때 then()의 onFulfillment() 핸들러가 실행됐기 때문입니다. 그리고 핸들러가 아무것도 반환하지 않았기 때문에 then()으로 반환된 프로미스의 [[PromiseResult]]가 undefined로 저장됐다는 것입니다.

이 문제는 원래 프로미스로부터 전달된 해결된 값이 없는 경우 반환문이 없어서 연쇄에서 아래에서 사용할 수 없게 되는 것입니다. 이를 수정해봅시다:

예제 3:



```js
const promise = new Promise((resolve,reject) => {
    let num = Math.random();
    setTimeout(() => resolve("Promise resolved"),2000);
})
.then(function (resolveValue) {
    console.log(`First then: ${resolveValue}`);
    return resolveValue;
})
.then((resolveValue) => console.log(`Second then: ${resolveValue}`))
.catch(function(rejectValue) {
    console.log(rejectValue);
});
```

![Example](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_12.png)

와 그럼, 예시 4:



```js
//Code 1:
const promise = new Promise((resolve,reject) => {
    let num = Math.random();
    setTimeout(() => resolve("약속 지켜짐"),2000);
})
.then(function (resolveValue) {
    console.log(`첫 번째 then: ${resolveValue}`);
    throw new Error("버려진 오류");
})
.then((resolveValue) => console.log(`두 번째 then: ${resolveValue}`))
.catch(function(rejectValue) {
    console.log(`catch 안: ${rejectValue}`);
});
/*
출력:
첫 번째 then: 약속 지켜짐
catch 안: Error: 버려진 오류
*/

//Code 2:
const promise1 = new Promise((resolve,reject) => {
    let num = Math.random();
    setTimeout(() => resolve("약속 지켜짐"),2000);
})
.then(function (resolveValue) {
    console.log(`첫 번째 then: ${resolveValue}`);
    return new Error("버려진 오류");
})
.then((resolveValue) => console.log(`두 번째 then: ${resolveValue}`))
.catch(function(rejectValue) {
    console.log(`catch 안: ${rejectValue}`);
});
/*
출력:
첫 번째 then: 약속 지켜짐
두 번째 then: Error: 버려진 오류
*/
```

이건 중요한 사례야. 코드 1에서, then() 내부의 Handler 함수가 오류를 "throw" 했어. 이는 핸들러 메서드에서 무언가가 실패했기 때문에 then()에서 반환된 프로미스가 오류로 거부된 것을 의미해. 그러나 코드 2에서는 아무 문제가 없어. 핸들러 메서드에서 새 Error 객체가 반환되었을 뿐이라서 then()에서 반환된 프로미스가 이행되고 이제 그 [[PromiseResult]]에는 Error 객체가 포함돼.



[마지막] 예시 5:

```js
var v;
const promise = new Promise((resolve,reject) => {
    let num = Math.random();
    setTimeout(() => resolve("약속 지켜짐"),2000);
})
.then(function (resolveValue) {
    console.log(`첫 번째 then: ${resolveValue}`);
    v = new Promise((resolve, reject) => resolve("하위 프로미스 지켜짐"));
    return v;
})
.catch(function(rejectValue) {
    console.log(`catch 안: ${rejectValue}`);
});
setTimeout(() => console.log(v), 2000);

/*
출력:
첫 번째 then: 약속 지켜짐
Promise {<fulfilled>: '하위 프로미스 지켜짐'}
[[Prototype]]: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: "하위 프로미스 지켜짐"
*/
```



이 경우에는 하위 프로미스가 해결되지만 호출할 핸들러가 없기 때문에 프로그램이 종료됩니다. (좋은 방식이 아닙니다).

# 섹션 4: then()/catch()/finally()에 핸들러 메서드가 없는 경우

![이미지](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_13.png)

지금까지 우리는 모든 then() 또는 catch()에 핸들러 메서드(onRejection()/onFulfillmemnt())가 인자로 전달된 (보통) 경우를 살펴보았습니다. then() 또는 catch() 내부에 핸들러 메서드를 전달하지 않는다면 어떻게 될까요? 문법 오류가 발생할까요?



실제로는 아니에요. 이는 약속(Promises)이 내부적으로 구현된 방식으로 잘 처리됩니다. onFulfillment() 핸들러가 then()에 전달되지 않을 경우, 내부적으로 Identity 함수 ( (x) => x )로 대체되어 그냥 완료 값을 체인으로 전달합니다. 마찬가지로, onRejection() 핸들러가 then()에 전달되지 않으면 내부적으로 Thrower 함수 ( (x) => throw x )로 대체되어 받은 거부 값을 throw합니다. 예시 -:

```js
const promise = new Promise((resolve, reject) => reject("거부됨!"));
promise.catch();
```

그 결과는 다음과 같습니다:

<img src="/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_14.png" />



내부적으로는 다음과 같이 보입니다:

```js
/*
  내부적으로는 다음과 같이 대체됩니다:

  promise.catch((reason) => throw reason);
*/

/*
  실제 onRejected 함수를 전달하는 경우:
  
  promise.catch(reason => console.log(reason));
*/
```

로그에서 "Uncaught Rejected Promise"가 표시되는 이유는 새로 대체된 핸들러가 "return"이 아닌 "throw" 키워드를 사용하기 때문입니다.

then()의 경우:



```js
const promise = new Promise((resolve, reject) => resolve("Resolved!"));
promise.then();

/*
  내부적으로 다음과 같이 변경됩니다:

  promise.then((value) => value);
*/
```

위의 코드는 로그에 아무 내용도 출력하지 않기 때문에 거기에 무언가를 보고 싶다면 다음과 같이 해야합니다:

```js
const promise = new Promise((resolve, reject) => resolve("Resolved!"));
promise.then()
  .then((value) => console.log(value)); //logs "Resolved!"
```

# 섹션 5: 동일한 Promise 객체에 여러 핸들러를 첨부하기



md
![](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_15.png)

동일한 Promise 객체에 여러 핸들러를 연결하고 싶은 이유를 묻는다면? 동일한 비동기 작업의 결과에 여러 부분이 의존할 때 이 작업이 수행됩니다.

예를 들어, 우유를 성공적으로 끓일 수 있다면, 불을 끄고 부엌을 닫아야 할 것입니다. 이 경우 코드는 다음과 같이 보일 것입니다-:

```js
function turnOffLights(resolveValue) {
  console.log(`${resolveValue} 불 끄기`);
}

function closeTheKitchen() {
  console.log("부엌 문 닫기.");
}

const motherPromise = new Promise((resolve, reject) => {
  let milkBoiled = Math.random();
  if (milkBoiled >= 0.5)
    resolve("우유가 성공적으로 끓었고 버너가 꺼졌습니다. 이제");
  else 
    reject(new Error("우유가 너무 끓어서"));
});

motherPromise.then(turnOffLights)
    .catch(() => {});
motherPromise.then(closeTheKitchen)
    .catch(() => {});
motherPromise.catch((resolveValue) =>
  console.log(`${resolveValue} 따라서 엎어진 우유를 씁니다`)
);

/*
가능한 결과 1:

우유가 성공적으로 끓었고 버너가 꺼졌습니다. 이제 불 끄기
부엌 문 닫기.

가능한 결과 2:

Error: 우유가 너무 끓어서 따라서 엎어진 우유를 씁니다
*/
```




참고: 각 then() 뒤에 catch()를 붙이는 것은 필수입니다. 그렇지 않으면 Uncaught Rejected Promise 예외가 발생합니다. 이에 대한 이유는 나중에 섹션 7에서 설명하겠습니다.

위 코드의 작동 방식은 해결된 motherPromise가 then()의 모든 onFulfillment() 핸들러를 트리거하는 것입니다. 그리고 모든 핸들러는 정의된 순서대로 실행됩니다.

이 작업은 Promise 체이닝을 사용하여 수행할 수 있다고 말할 수 있지만, 필요한 추가(중첩된) 프로미스를 만들어야 할 필요가 있는지 생각해보겠습니다. 또한, 수행해야 할 후속 작업이 동기적일 수도 있으므로 프로미스가 필요하지 않을 수도 있습니다.

# 섹션 6: .then()의 동기적 성격 및 핸들러 메서드의 비동기적 성격.




![이미지](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_16.png)

Promises로 시작한 사람들이 가장 헷갈리는 것 중 하나에요. 일반적인 오해는 then()/catch()/finally()이 비동기적으로 실행된다는 것, 즉 프로미스가 해결되거나 거부될 때만 실행된다는 것입니다. 하지만 실제로는 그렇지 않아요. 실제로 이들은 현재 프로미스가 해결되거나 거부될 때까지 기다리지 않고 JS 해석기에 의해 동기적으로 실행됩니다. 그 결과 then()/catch()/finally() 메소드는 "pending" 상태의 프로미스를 반환하게 됩니다. 참고: 이 상태는 후속 핸들러 메소드의 반환 값에 따라 나중에 변경될 수 있어요. 실제로는 핸들러 메소드(onFulfillment(), onRejection() 및 onFinally())가 비동기적으로 실행되며, then()/catch()/finally() 메소드에 의해 현재 프로미스 인스턴스의 상태에 따라 실행될 예정입니다. 아래에서 확인할 수 있어요:

```js
function boilMilk(resolve, reject) {
    setTimeout(() => {
      let milkBoiled = Math.random();
      if (milkBoiled >= 0.5) 
          resolve("우유가 성공적으로 끓었어요");
      else 
          reject(new Error("우유가 너무 끓어 넘쳤어요"));
    },1000);
  }
  
  function shutBurner(resolveValue) {
    console.log(`${resolveValue}을(를) 끓인 후 버너를 끄세요`);
  }
  
  function cleanSpilledMilk(rejectValue) {
    console.log(`${rejectValue} 때문에 넘쳐 흐른 우유를 청소하세요`);
  }
  
  function isResolved(resolveValue) {
    return shutBurner(resolveValue);
  }
  
  function isRejected(rejectValue) {
    return cleanSpilledMilk(rejectValue);
  }
  
  const motherPromise = new Promise(boilMilk);
  
  const thenPromise = motherPromise.then(isResolved).catch(()=> console.log("예외 발생"));
  console.log(thenPromise);
  setTimeout(()=>console.log(thenPromise),2000);
  
  const catchPromise = motherPromise.catch(isRejected);
```

![이미지](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_17.png)




위 코드에서는 .then()이 동기적으로 실행되었다는 것이 명확합니다 (그래서 로그가 "보류 중" Promise를 보여줍니다) 하지만 나중에 onFulfillment() 핸들러가 실행된 후에는 동일한 Promise의 상태가 "이행"으로 변경됩니다. 이러한 기능의 이유는 핸들러 간의 경합 상태를 피하기 위해서입니다: .then()이 비동기적이면 (여러 then() 메소드의 경우) 어떤 핸들러가 먼저 예약되는지에 따라 예측할 수없는 결과로 이어질 수 있습니다.

참고: 위 코드에서 .then() 메소드에 .catch()를 첨부하는 이유는 다음 섹션에서 설명될 것입니다.

# 섹션 7: 미처리된 Promise의 [[Promise]] 슬롯의 연결

<img src="/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_18.png" />



지금까지 우리는 부모 프로미스에 직접 .then()과 .catch()이 추가된 시나리오를 보았습니다. 이 경우에는 위에 .then()에 .catch()를 연결해야 했습니다. 그러나 이를 하지 않았을 때 무슨 일이 발생하는지 살펴보지는 않았습니다:

```js
const p0 = new Promise((resolve,reject) => {
    let num = Math.random();
    setTimeout(()=>reject("Promise rejected"), 5000);
});

const p1 = p0.then(function (resolveValue) {
    console.log("Then 핸들러가 실행되었습니다");
    console.log(resolveValue);
})
console.log("P1");
console.log(p1);

const p2 = p0.catch((rejectValue) => {
    console.log("Catch 핸들러가 실행되었습니다");
    console.log(rejectValue);
})
console.log("P2");
console.log(p2);
setTimeout(()=> {
    console.log("P1");
    console.log(p1);
}, 10000);
setTimeout(()=> {
    console.log("P2");
    console.log(p2);
}, 15000);
```

<img src="/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_19.png" />

이 일이 왜 발생했을까요? "거부된" 프로미스가 이미 catch()의 onRejection() 핸들러에 의해 처리되었다면 콘솔에 추가로 Uncaught Rejected Promise가 나타나는 이유는 무엇일까요? onRejection() 핸들러를 then() 메서드에 전달하지 않았을 때 P1의 상태가 "보류 중"에서 "거부됨"으로 변경된 이유는 무엇일까요?



이유를 이야기하자면 정말 간단한 것이 아니며 많은 사람들이 잘 알지 못하는 내용입니다. 이 문제에 대해 알아내기 위해 3~4일 동안 삽질한 기억이 납니다.

여기 그 이유가 있습니다: 각 Promise 객체(예: P1)에는 [[Promise]] 슬롯이 있습니다. 이 슬롯은 P1이 속한 Promise 객체를 가리키거나 발생시킨 부모 Promise 객체를 가리킵니다. 따라서 위 코드에서 P1이 생성될 때 상태가 "대기 중(pending)"인 이유는 onFulfillment() 핸들러가 비동기적으로 실행되기 때문입니다. 그리고 나중에 P0가 "거부(rejected)"되면 catch()에 예약된 onRejection() 핸들러가 실행되어 메시지를 기록하고 마지막으로 P2가 undefined로 "이행(fulfilled)"됩니다. 그러나 만약 코드가 여기서 끝났다면, P1은 영원히 "대기 중(pending)" 상태로 남아 있었을 것입니다. 그러나 P1의 [[Promise]] 슬롯이 P0를 가리키므로, P0가 "거부(rejected)"된 즉시 P1은 P0의 상태와 결과를 취하게 됩니다. 여기서 주목할 점은 이 현상이 매번 모든 상황에서 발생한다는 점입니다. 우리가 이 현상을 보지 못하는 이유는 그때 then()에 전달된 핸들러 메서드가 실행될 때, then() 메서드에 의해 반환된 Promise의 상태와 결과가 핸들러 메서드의 반환 값의 유형에 따라 결정되기 때문입니다. 따라서, 흐름은 다음과 같습니다:

a. P0의 이행/거부

b. P1은 P0의 상태와 결과를 취합니다



c. P1의 상태와 결과가 다시 변경되었습니다. 이번에는 Handler 메서드의 반환 값 유형에 의해 변경되었습니다.

참고: 이것은 Promise가 영원히 대기 상태에 있을 수 없다는 것을 의미하는 것은 아닙니다. 루트 또는 첫 번째 Promise 인스턴스는 resolve() 또는 reject()가 호출되지 않는 한 "대기 중" 상태로 남을 수 있습니다.

# 섹션 8: .then() 대비 .catch()를 사용한 isRejected() 핸들러.

![이미지](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_20.png)



지금까지 우리의 코드에서는 then()과 함께 onFulfillment() 핸들러만 사용해 왔지만 섹션 1에서 보았듯이 then() 메서드의 구문은 다음과 같습니다: then(onFulfillment, onRejected) 여기서 onRejection()은 선택 사항입니다. 그래서 then() 내부에서 거부된 promise를 처리하는 것과 catch() 내부에서 처리하는 것의 차이는 무엇일까요? 다음 코드를 살펴봅시다:

```js
//코드 1:
Promise.reject('거절된:')
  .then(() => console.log("만세!!"), (rejectValue) => console.log(`${rejectValue} 부우!!`));

//코드 2:
Promise.reject('거절된:')
  .then(() => console.log("만세!!"))
  .catch((rejectValue) => console.log(`${rejectValue} 부우!!`));
```

위 예제의 두 코드는 모두 "거절된: 부우!!"를 로그로 출력합니다. 그러나 내부적으로 두 코드는 매우 다르게 실행됩니다. 코드 1에서 onRejected() 핸들러는 직접 부모 promise 객체에 작용하지만 코드 2에서 onRejected() 핸들러는 실제로 .then()이 반환하는 promise에 작용합니다(이 promise은 부모 promise의 상태와 결과를 획득합니다). 두 가지 방법의 다른 점은 부모 promise가 해결되고 then()이 거부된 promise를 반환하는 경우 코드 1에서는 아무도 처리하지 않고 Uncaught Rejected Promise 예외가 발생한다는 것입니다. 아래 예제를 참조하세요:

```js
//코드 1:
Promise.resolve('해결됨:')
  .then(() => Promise.reject("거절된 자식 Promise"), (rejectValue) => console.log(`${rejectValue} 부우!!`));

//코드 2:
Promise.resolve('해결됨:')
  .then(() => Promise.reject("거절된 자식 Promise"))
  .catch((rejectValue) => console.log(`${rejectValue} 부우!!`));
```




![이미지1](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_21.png)

![이미지2](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_22.png)

이렇게 하는 이유는 코드 2에서 반환된 거부된 하위 프로미스가 연쇄적으로 처리기인 onRejection() 핸들러에 의해 처리되지만, 코드 1에서는 그렇지 않기 때문입니다.

# 섹션 9: 몇 가지 까다로운 코드 스니펫의 출력 예측





![이미지](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_23.png)

이 섹션의 제목은 이 기사의 첫 번째 섹션이었다면 더 적절했을 것 같습니다. 지금까지 프로미스에 대해 충분히 익숙할 텐데 말이죠. 하지만 여전히 살펴봐야 할 복잡한 경우들이 있을 수 있다고 생각합니다. 그래서 이제 시작해 볼게요-:

문제 1:

```js
(() => {
    return (new Promise((resolve, reject) => {
        resolve();
        console.log("일요일 -> ");
    }).then(() => console.log("화요일")));
})();

(()=>console.log("월요일-> "))();
```




이 코드 조각의 출력물은 무엇이 될 것이라고 생각하시나요? 아래 내용을 읽기 전에 먼저 출력물에 대해 생각해보세요.

많은 사람들이 resolve() 메서드가 "보류 중" 프로미스의 상태를 "이행됨"으로 변경하고(그 외 다른 일들도 수반되며) onFulfillment() 콜백 핸들러를 호출한다고 생각합니다. 하지만 이것은 사실이 아닙니다. resolve() 메서드는 어떤 핸들러에도 호출을 하지 않습니다. JS Interpreter는 Executor 함수를 완전히 실행하고, 그 후에 Promise 생성자가 프로미스의 새 상태에 따라 각 예약된 콜백 핸들러(단일 "핸들러"가 아니라 여러 개의 핸들러가 등록될 수 있으므로)에 대한 호출을 수행합니다. 따라서 위 코드의 출력물은 "Sunday - Monday - Tuesday"이 될 것입니다.

문제 2:

```js
var letsResolveThisOutside, letsRejectThisOutside;

new Promise((resolve, reject) => { 
    letsResolveThisOutside = resolve; 
    letsRejectThisOutside = reject; 
})
.then((resolveValue) => console.log(`${resolveValue}`));

letsResolveThisOutside("나 죽었나?");
```



위의 Promise가 질문을 한 콘솔을 볼 수 있을 거라고 생각하십니까? 생각해보신 후에 계속 읽어주세요.

기술적으로 말하면, Executor의 범위 외에서 Promise를 해결/거부하는 것이 가능할까요? 네, 가능합니다. 로그가 그것을 말해주고 있습니다.

Markdown 형식의 표입니다:


| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |


이것은 두 가지 이유 때문입니다. 첫 번째로, "var" 변수가 전역 공간에 정의되어 있고 Executor 함수 내부가 아닌 곳에 있기 때문에 코드 어디에서든 접근이 가능합니다 (심지어 Promise 클래스 내부에서도). 두 번째로, JS가 동기적 언어이므로 onFulfillment() 핸들러가 이미 실행이 예약되어 있었기 때문에, 우리가 마지막으로 letsResolveThisOutside() 메서드를 호출했을 때 Promise가 해결되고 Callback 핸들러가 호출되었습니다.



문제 3:

다음 이미지에 나와 있는 과제에 대한 솔루션을 보여 드리겠습니다. 그리고 해당 코드 조각의 출력물이 무엇인지 알아내셔야 합니다. 출력물이 예상치 못한 것으로 나타난다면 코드를 크게 변경하지 않고도 예상된 출력물을 얻는 방법을 찾아내셔야 합니다. 과제:

![task image](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_25.png)

먼저, 위 과제를 직접 구현해보시거나 아래 솔루션을 읽고 후속 질문에 답해보시기 바랍니다...



해결책:

```js
const cleanRoom = (resolve, reject) => {
    let num = Math.random();
    if (num >= .5) { 
      resolve(num); //방 청소 완료
    } else {
      reject(new Error(num)); //방 청소 미완료
    }
  }
const roomCleaningPromise = new Promise(cleanRoom);

roomCleaningPromise.then(function goFootballAfterCleaning(resolveValue) { // then1
  console.log(`방이 청소되어 축구를 하러 갑니다 -: ${resolveValue}`);
  return new Promise(function makeGoal(resolve, reject) {
    let number = Math.random();
    if (number >= .5) { //콘서트 가기
      resolve(number);
    } else {
      reject(number); //강아지 케어
    }
  }) 
}).then(function goConcertAfterGoal(resolveValue) { // then2
  console.log(`방이 청소되어 축구를 하고 골을 넣었습니다!! 이제 음악 콘서트로 갑니다 -: ${resolveValue}`);
}).catch(function cleanDogAfterlosing(errorValue) { // catch1
  console.log(`방이 청소되어 축구를 하러 갔지만 골을 못 넣어서 강아지 케어 -: ${errorValue}`);
})
  
roomCleaningPromise.catch(function goLaundryAfterNoCleaning(errorValue) { // catch2
  console.log(`방이 청소되지 않아 세탁을 하러 갑니다 -: ${errorValue}`);
  return new Promise(function doLaundry(resolve, reject) {
    let number_2 = Math.random();
    if (number_2 >= .5) { //콘서트 가기
      resolve(number_2);
    } else {
      reject(number_2); //강아지 케어
    }
  })
}).then(function goConcertAfterLaundry(resolveValue) { // then3
  console.log(`방이 청소되지 않아 세탁을 했지만 완료하지 못했어요. 그래서 강아지 케어 -: ${resolveValue}`);
}).catch(function cleanDogAfterNoLaundry(errorValue){ //catch3
  console.log(`방이 청소되지 않아 세탁을 하러 갔지만 완료하지 못해 강아지를 케어합니다 -: ${errorValue}`)
}); 
```

이제 위 코드에서 방이 청소되지 않고 세탁도 완료되지 않는 경우의 출력 결과를 찾아보세요. 그럼 아래 코드 로그를 확인해서 답을 확인하실 수 있습니다:

```js
방이 청소되지 않아 세탁을 하러 갑니다 -: Error: 0.10282616920143206
방이 청소되어 축구를 하러 갔지만 골을 못 넣어서 강아지 케어 -: Error: 0.10282616920143206
방이 청소되지 않아 세탁을 하러 갔지만 완료하지 못해 강아지를 케어합니다 -: 0.3140749736813231
```



이것은 좀 까다로울 거에요. 콘솔에서 위 출력물을 보고 있을 때 머리를 맞은 적이 있어요. 방이 깨끗한데 왜 두 번째 줄에 "방이 청소되지 않았다..."라고 나왔을까요?

제가 이게 작은 실수라고 말하면 돌을 던지지 마세요. 자세히 살펴보면 이 코드가 혼란스럽고 오류가 있습니다. 바로 then2가 then1에 연결돼 있고 goFootballAfterCleaning() 핸들러가 반환한 프로미스에 연결되지 않았다는 거죠. 비슷하게 catch2도 catch1에 연결돼 있고 goLaundryAfterNoCleaning() 핸들러가 반환한 프로미스에 연결돼 있지 않다는 문제가 있어요. 그러니 이러한 오류를 수정해볼게요:

```js
const cleanRoom = (resolve, reject) => {
  let num = Math.random();
  if (num >= 0.5)
    resolve(num); // 방이 깨끗함
  else
    reject(new Error(num)); // 방이 청소되지 않음
};
const roomCleaningPromise = new Promise(cleanRoom);

roomCleaningPromise.then(function goFootballAfterCleaning(resolveValue) {// then1
  console.log(`방이 깨끗해요. 축구를 하러 갑니다 -: ${resolveValue}`);
  return new Promise(function makeGoal(resolve, reject) {
    let number = Math.random();
    if (number >= 0.5)
      resolve(number); // 콘서트에 감
    else
      reject(number); // 강아지를 씻겨야 해요
  })
    .then(function goConcertAfterGoal(resolveValue) {// then2
      console.log(`방이 깨끗해요. 축구를 한 다음 골을 넣었어요!! 이제 음악 콘서트에 갑니다 -: ${resolveValue}`);})
    .catch(function cleanDogAfterlosing(errorValue) {// catch1
      console.log( `방이 깨끗해요. 축구를 했지만 골을 넣지 못해서 강아지를 씻겨야 합니다 -: ${errorValue}`);
    });
});

roomCleaningPromise.catch(function goLaundryAfterNoCleaning(errorValue) {// catch2
  console.log(`방이 청소되지 않았어요. 세탁하러 가요 -: ${errorValue}`);
  return new Promise(function doLaundry(resolve, reject) {
    let number_2 = Math.random();
    if (number_2 >= 0.5) // 콘서트에 가요
      resolve(number_2);
    else
      reject(number_2); // 강아지를 씻겨야 해요
  })
    .then(function goConcertAfterLaundry(resolveValue) {// then3
      console.log(`방이 청소되지 않았어요. 세탁을 하러 간 후 완료했으니 이제 음악 콘서트에 갑니다 -: ${resolveValue}`);
    })
    .catch(function cleanDogAfterNoLaundry(errorValue) {//catch3
      console.log(`방이 청소되지 않았어요. 세탁을 하러 갔지만 완료하지 못해서 강아지를 씻겨야 합니다 -: ${errorValue}`);
    });
});
```

이렇게 돌린다면 잘 될 거 같죠? 글쎄요, 잘 되지 않았어요. 가능한 결과 중 하나는 다음과 같았습니다:




![Image](/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_26.png)

로그에 추가로 Uncaught Rejected Promise 오류가 표시되고 이미 섹션 7에서 왜 이러한 오류가 발생하는지, 이 문제에 대한 해결책을 이미 알고 있습니다. 이 문제를 빠르게 해결해 봅시다:

```js
const cleanRoom = (resolve, reject) => {
  let num = Math.random();
  if (num >= 0.5)
    resolve(num); // 방청소 완료
  else
    reject(new Error(num)); // 방청소 실패
};
const roomCleaningPromise = new Promise(cleanRoom);

roomCleaningPromise.then(function goFootballAfterCleaning(resolveValue) {// then1
  console.log(`방을 청소했으니 축구를 하러 갑니다 -: ${resolveValue}`);
  return new Promise(function makeGoal(resolve, reject) {
    let number = Math.random();
    if (number >= 0.5)
      resolve(number); // 콘서트로 가기
    else
      reject(number); // 강아지 돌보기
  })
    .then(function goConcertAfterGoal(resolveValue) {// then2
      console.log(`방을 청소했으니 축구를 하러 갔고 골을 넣었어요!! 이제 음악 콘서트에 갑니다 -: ${resolveValue}`);})
    .catch(function cleanDogAfterlosing(errorValue) {// catch1
      console.log( `방을 청소했으니 축구를 하러 갔지만 골을 못 넣어서 강아지를 돌봅니다 -: ${errorValue}`);
    });
})
.catch(()=>{});

roomCleaningPromise.catch(function goLaundryAfterNoCleaning(errorValue) {// catch2
  console.log(`방을 청소하지 않았으니 세탁을 하러 갑니다 -: ${errorValue}`);
  return new Promise(function doLaundry(resolve, reject) {
    let number_2 = Math.random();
    if (number_2 >= 0.5) // 콘서트로 가기
      resolve(number_2);
    else
      reject(number_2); // 강아지 돌보기
  })
    .then(function goConcertAfterLaundry(resolveValue) {// then3
      console.log(`방을 청소하지 않았으니 세탁을 하러 갔고 완료했으니 이제 음악 콘서트에 갑니다 -: ${resolveValue}`);
    })
    .catch(function cleanDogAfterNoLaundry(errorValue) {// catch3
      console.log(`방을 청소하지 않았으니 세탁을 하러 갔지만 완료하지 못했으니 강아지를 돌봅니다 -: ${errorValue}`);
    });
});
```

이 코드는 완벽하게 작동하지만 전문적이지 않은 방식으로 작성된 코드입니다. .catch(()=`''')를 보고 목적을 알기 어려울 것입니다. 따라서 이 작업을 더 나은 방법으로 해결하고 전문적인 모듈식 코드를 작성하는 것이 좋습니다. 같은 해결책을 생각했을 것으로 기대합니다:




```js
const cleanRoom = (resolve, reject) => {
  let num = Math.random();
  if (num >= 0.5) resolve(num); // 방을 청소했어요
  else reject(new Error(num)); // 방을 못 청소했어요
};

function goConcertAfterGoal(resolveValue) {
    console.log(`방을 청소해서 축구를 하러 갔다가 골을 넣었어요!! 이제 음악 회관으로 갑니다 -: ${resolveValue}`);
}

function cleanDogAfterlosing(errorValue) {
    console.log(`방을 청소해서 축구를 하러 갔지만 골을 못 넣어서 개를 씻고 있어요 -: ${errorValue}`);
}

function goConcertAfterLaundary(resolveValue) {
    console.log(`방을 청소하지 않았어요. 빨래를 하러 가는데 완료했어요. 이제 음악 회관에 갑니다 -: ${resolveValue}`);
}

function cleanDogAfterNoLaundary(errorValue) {
    console.log(`방을 청소하지 않았어요. 빨래를 하러 가는데 못 했어서 개를 씻고 있어요 -: ${errorValue}`);
}

function goFootballAfterCleaning(resolveValue) {
  console.log(`방을 청소해서 축구를 하러 가요 -: ${resolveValue}`);
  return new Promise(function makeGoal(resolve, reject) {
    let number = Math.random();
    if (number >= 0.6) resolve(number); // 음악 회관으로 가요
    else reject(number); // 개 씻음
  })
    .then((resolveValue) => goConcertAfterGoal(resolveValue), (errorValue) => cleanDogAfterlosing(errorValue));
}

function goLaundaryAfterNoCleaning(errorValue) {
  console.log(`방을 청소하지 않았어요. 빨래를 하러 가요 -: ${errorValue}`);
  return new Promise(function doLaundary(resolve, reject) {
    let number_2 = Math.random();
    if (number_2 >= 0.4) resolve(number_2); // 음악 회관으로 가요
    else reject(number_2); // 개 씻음
  })
    .then((resolveValue) => goConcertAfterLaundary(resolveValue), (errorValue) => cleanDogAfterNoLaundary(errorValue));
}

const roomCleaningPromise = new Promise(cleanRoom);

roomCleaningPromise
  .then((resolveValue) => goFootballAfterCleaning(resolveValue), (errorValue) => goLaundaryAfterNoCleaning(errorValue));
```

위 문제에 대한 참고 자료: 과제의 출처.

# 섹션 10: 프로미스가 어떻게 구현되는지 이해하기 위해 사용자 정의 프로미스 만들기.

<img src="/assets/img/2024-05-14-TheHowandWhyofPromisesinJavaScript_27.png" />




"How" Promises가 실제로 작동하는 방식과 Promises를 구현할 때 왜 그렇게 하는지에 대해 이야기하려면 Bottom-up 방식을 채택해야 합니다. 즉, 우리는 다음과 같이 기본부터 직접 Custom Promises를 만들어가면서 이러한 두 가지에 대해 배우게 됩니다:

```js
class CustomPromise {
  constructor(executor) {
    this.state = "pending";
    this.result = null;
    this.onResolveCallbacks = []; // 모든 예약된 resolve 콜백을 저장하는 곳
    this.onRejectCallbacks = []; // 모든 예약된 reject 콜백을 저장하는 곳

    const resolve = (resolveValue) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.result = resolveValue;
        this.executeCallbacks(this.onResolveCallbacks, resolveValue);
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.result = reason;
        this.executeCallbacks(this.onRejectCallbacks, reason);
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  executeCallbacks(callbacks, arg) {
    // 다음 tick에서 실행되도록 콜백들을 대기열로 지정합니다
    setTimeout(() => {
      callbacks.forEach((callback) => {
        try {
          const result = callback(arg);
          if (result instanceof CustomPromise) {
            // 콜백이 프로미스를 반환하는 경우 연쇄화합니다
            result.then(
              (value) => this.resolveChainedPromise(value),
              (reason) => this.rejectChainedPromise(reason)
            );
          } else {
            // 콜백이 프로미스가 아닌 값을 반환하는 경우 해당 값으로 프로미스를 해결합니다
            this.resolveChainedPromise(result);
          }
        } catch (error) {
          // 예외가 발생하는 경우 프로미스를 거부합니다
          this.rejectChainedPromise(error);
        }
      });
    }, 0); // 비동기 실행을 위해
  }

  resolveChainedPromise(result) {
    // 주어진 결과로 프로미스를 해결합니다
    this.state = "fulfilled";
    this.result = result;
    this.executeCallbacks(this.onResolveCallbacks, result);
  }

  rejectChainedPromise(reason) {
    // 주어진 이유로 프로미스를 거부합니다
    this.state = "rejected";
    this.result = reason;
    this.executeCallbacks(this.onRejectCallbacks, reason);
  }

  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        this.queueCallbackForExecution(
          onFulfilled,
          this.result,
          resolve,
          reject
        );
      } else if (this.state === "rejected") {
        this.queueCallbackForExecution(
          onRejected,
          this.result,
          resolve,
          reject
        );
      } else {
        this.onResolveCallbacks.push((result) => {
          this.queueCallbackForExecution(onFulfilled, result, resolve, reject);
        });
        this.onRejectCallbacks.push((reason) => {
          this.queueCallbackForExecution(onRejected, reason, resolve, reject);
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  queueCallbackForExecution(callback, arg, resolve, reject) {
    setTimeout(() => {
      try {
        const result = callback ? callback(arg) : arg;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, 0); // 비동기 실행을 위해
  }
}
```

참고: 위의 Custom Promise는 교육 목적으로 제공되었으며 많은 기능이 누락되었으며 실제로 구현된 방식과 다를 수 있습니다. 또한 위의 코드가 모든 시나리오에 작동하지 않을 수도 있습니다 (P.S. 저는 프로그래밍 언어 개발자가 아닙니다 🙃)

위의 Promise는 확실히 설득력 있지만 동시에 압도적입니다. 따라서 Promise가 해결될 때 위의 코드의 제어 흐름을 살펴봅시다.



단계 1: Constructor가 Executor 함수로 호출됩니다. 여기서 먼저 상태, 결과, onResolveCallbacks, onRejectCallbacks 필드가 기본값으로 할당됩니다. 또한 resolve와 reject 메서드가 여기서 정의되고 변수에 저장됩니다 (나중에 Executor 함수에 전달될 것임).

단계 2: Executor 함수가 실행되어 resolve() 함수 또는 reject() 함수를 호출합니다. 예를 들어, resolve() 메서드가 호출되었다고 가정합니다.

단계 3: resolve() 메서드는 Promise의 상태를 변경하고 결과를 저장합니다. 또한 이 메서드는 나중에 비동기적으로 실행될 executeCallbacks() 메서드를 "예약"합니다.

단계 4: JS 해석기는 Executor 함수를 계속 실행한 다음, then() 메서드를 실행합니다.



단계 5: 제어가 then() 메서드로 전달됩니다. 먼저 약속이 아직 "대기 중" 상태에 있으므로 executeCallbacks() 메서드가 아직 실행되지 않았기 때문에 else 부분이 실행됩니다.

단계 6: 약속이 "이행" 상태가 되면 executeCallbacks()가 호출되어 onResolveCallbacks에 저장된 콜백을 실행합니다.

이로써 JavaScript의 Promise에 관한 6000단어가 넘는 기사가 끝이 났습니다. 마음에 드셨기를 바랍니다.