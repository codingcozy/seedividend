---
title: "JavaScript 프로미스 이해하기 BMW 이야기"
description: ""
coverImage: "/assets/img/2024-06-23-UnderstandingJavaScriptPromisesTheBMWStory_0.png"
date: 2024-06-23 13:11
ogImage: 
  url: /assets/img/2024-06-23-UnderstandingJavaScriptPromisesTheBMWStory_0.png
tag: Tech
originalTitle: "Understanding JavaScript Promises: The BMW Story"
link: "https://medium.com/@danielochoja/understanding-javascript-promises-the-bmw-story-00ba7f0227ad"
isUpdated: true
---




![이미지](/assets/img/2024-06-23-UnderstandingJavaScriptPromisesTheBMWStory_0.png)

자바스크립트에서 Promise는 기본 개념이지만 이해하기 어려울 수 있습니다. 이 글을 읽은 후에는 이 개념을 완전히 이해할 거에요. 친숙한 현실적인 비유를 사용해 설명해 보겠습니다.

아버지가 새 BMW를 사주겠다고 약속한다고 상상해보세요. 이 약속은 보거나 만질 수 없지만, 여러분의 생각과 아버지의 생각 속에 존재합니다. 마찬가지로 자바스크립트에서 Promise는 비동기 작업의 결과를 나타내는 객체입니다.

간단히 말해, 자바스크립트의 Promise는 아버지의 약속과 비슷합니다. 미래의 결과를 위한 자리 표시자인 것이죠. 하지만 우리의 머릿속에만 존재하는 게 아니라 컴퓨터 메모리에 있고 코드를 통해 조작할 수 있습니다.

<div class="content-ad"></div>

여기에서 유사성을 살펴보겠습니다:

약속하기: 아빠가 BMW를 약속해줄 때, 즉시 차를 주지 않는다. 마찬가지로, JavaScript 함수가 약속을 반환할 때도 즉시 결과를 제공하지 않습니다.

대기 상태: BMW를 기다리는 동안 당신은 일상생활을 하며 다른 일을 합니다. 이것은 JavaScript 약속의 '대기 중' 상태와 유사합니다. 해당 작업이 아직 완료되지 않았지만 다른 작업은 여전히 동시에 실행될 수 있습니다. 이것이 비동기 프로그래밍이라고도 하며, 주 스레드를 블로킹하지 않고 작업이 수행되는 방식입니다.

성공: 아빠가 결국 BMW를 사주면, 약속이 이행됩니다. JavaScript에서는 약속이 성공적으로 해결되어 예상한 결과를 제공하는 것을 의미합니다.

<div class="content-ad"></div>

거절: 아버지가 BMW을 사지 않으면 약속이 깨집니다. JavaScript 용어로 말하면 이 약속은 거부되어 작업이 실패했음을 나타냅니다.

# Promise의 라이프사이클

자바스크립트 Promise의 상태에 대해 좀 더 자세히 살펴보겠습니다:

1. 대기 중: 이것은 초기 상태입니다. 이 Promise은 충족되지도 거절되지도 않았으며 결과를 기다리고 있습니다. 이는 아버지가 "잠깐만 기다려, 좀 더 시간을 주세요"라고 말할 때 상황과 대응됩니다.

<div class="content-ad"></div>

2. 이행됨: 약속이 성공적으로 완료되었습니다. 우리의 비유에서는 BMW를 수령할 때입니다. JavaScript에서는 약속이 값으로 해결됩니다.

3. 거부됨: 약속이 실패했습니다. 이는 BMW를 받지 못하는 것과 같습니다. JavaScript에서는 약속이 이유(에러)와 함께 거부됩니다.

# JavaScript에서 약속(Promises) 생성 및 처리하기

다음은 JavaScript에서 약속을 생성하고 처리하는 간단한 예제입니다:

<div class="content-ad"></div>

```js
// Promise 생성
let promise = new Promise((resolve, reject) => {
  let isPromiseKept = true; // 약속을 지키는지를 시뮬레이션
  if (isPromiseKept) {
    resolve('BMW를 받았어요!');
  } 
  else {
    reject('약속을 어겼네요, BMW가 없어요.');
  }
 });
```

```js
// Promise 처리
promise
 .then((message) => {
   console.log(message); // 출력: BMW를 받았어요!
 })
 .catch((error) => {
   console.log(error); // 출력: 약속을 어겼네요, BMW가 없어요.
 });
```

# 코드 설명하기

<div class="content-ad"></div>

```js
let promise = new Promise((resolve, reject) => {....});
```

위 코드는 'Promise' 생성자를 사용하여 프로미스를 생성합니다. 생성자는 인수로 함수(콜백)를 취합니다. 이 콜백 함수는 resolve 및 reject라는 두 개의 매개변수를 사용합니다.

프로미스 결과 시뮬레이션:

let isPromiseKept = true;: 이 변수는 프로미스가 유지될지 여부를 시뮬레이션합니다. 시연 목적을 위해 간단한 boolean 값입니다.

<div class="content-ad"></div>

Promise 해결 또는 거부:

```js
if (isPromiseKept) {
    resolve('BMW를 받았습니다!');
} else {
    reject('약속이 깨졌습니다, BMW가 없어요.');
}
```

위 조건은 isPromiseKept의 값을 확인합니다. 만약 true이면, 'BMW를 받았습니다!' 메시지와 함께 resolve 함수가 호출됩니다. 만약 false이면, '약속이 깨졌습니다, BMW가 없어요.' 메시지와 함께 reject 함수가 호출됩니다.

Promise 결과 처리하기

<div class="content-ad"></div>

```js
promise
 .then((message) => {
   console.log(message); // Output: BMW received!
 })
 .catch((error) => {
   console.log(error); // Output: Promise broken, no BMW.
 });
```

프로미스가 처리된 후 — 성공적으로 해결되거나 거부된 경우 — 프로미스 객체의 .then() 또는 .catch() 메서드를 사용하여 결과를 가져옵니다. 이러한 메서드는 콜백 함수를 매개변수로 사용합니다. 이러한 콜백은 resolve 또는 reject에서 반환된 데이터를받습니다. 프로미스가 해결되거나 거부되는 경우 결과를 처리하기 위해 .then() 또는 .catch() 중 하나가 실행됩니다.

.then() 메서드는 해결된 상태를 처리하고 해결된 데이터(일반적으로 message로 지칭)를 콜백 함수로 전달합니다. 반대로 프로미스가 거부되면 .catch() 메서드가 거부 이유(일반적으로 error로 표시)를 처리합니다. .then()은 원칙적으로 해결된 상태와 거부된 결과를 모두 처리할 수 있지만 두 개의 매개변수(첫 번째 콜백은 해결된 상태, 두 번째는 거부된 상태)를 제공함으로써기 때문에 성공적인 결과에 대해 .then()을 사용하고 오류 처리에는 .catch()을 사용하는 것이 일반적으로 더 명확합니다.

# 결론

<div class="content-ad"></div>

자바스크립트의 Promise는 비동기 작업을 효과적으로 관리할 수 있는 강력한 도구입니다. 이를 통해 코드가 결과를 기다리는 동안 멈추지 않고 작업을 처리할 수 있습니다. 약속을 아빠가 BMW를 사주겠다고 하는 것처럼 생각하면, Promise가 가질 수 있는 다양한 상태인 보류 중(pending), 이행됨(fulfilled), 거부됨(rejected)을 더 잘 이해할 수 있습니다. 당신이 아빠가 약속을 이행할 때까지 기다리는 동안 다른 작업을 병행하는 것처럼, JavaScript는 Promise가 해결되거나 거부될 때까지 다른 작업을 수행할 수 있게 해줍니다. 이 개념을 받아들이면 코드를 더 효율적으로 만들고 관리하기 쉽게 할 수 있으며, 더 부드럽고 반응성이 높은 애플리케이션을 구축할 수 있습니다.