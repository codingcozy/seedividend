---
title: "structuredClone(), JavaScript에서 객체를 깊은 복제하는 가장 쉬운 방법"
description: ""
coverImage: "/assets/img/2024-05-27-structuredCloneTheEasiestWaytoDeepCloneObjectsinJavaScript_0.png"
date: 2024-05-27 18:19
ogImage: 
  url: /assets/img/2024-05-27-structuredCloneTheEasiestWaytoDeepCloneObjectsinJavaScript_0.png
tag: Tech
originalTitle: "structuredClone(): The Easiest Way to Deep Clone Objects in JavaScript"
link: "https://medium.com/javascript-in-plain-english/structuredclone-the-easiest-way-to-deep-clone-objects-in-javascript-c503b536266b"
---


<img src="/assets/img/2024-05-27-structuredCloneTheEasiestWaytoDeepCloneObjectsinJavaScript_0.png" />

# 1. 서문

왜 지금까지 JavaScript에 완전한 복제 함수가 만들어지지 않았을까요? 데이터 유형에 관계 없이 객체와 해당 모든 내용을 완전히 복제하는 것은?

이건 놀랍고, 때로는 객체를 깊은 복제해야 하는 경우가 많이 있어서 일에 많은 어려움을 야기하죠.

<div class="content-ad"></div>

# 2. 객체를 깊은 복제하는 두 가지 방법

![이미지](/assets/img/2024-05-27-structuredCloneTheEasiestWaytoDeepCloneObjectsinJavaScript_1.png)

내 친구야, 객체를 깊은 복제하는 방법을 아시나요? 위 표의 데이터 유형을 복제하는 것이 가장 좋을 겁니다.

```js
const testData = {
  number: 123,
  string: "test",
  undefined: undefined,
  null: null,
  boolean: true,
  object: { a: 1, b: { c: 2 } },
  array: [1, 2, { d: 3 }],
  function: function() { return "hello"; },
  map: new Map([["key1", "value1"], ["key2", "value2"]]),
  set: new Set([1, 2, 3]),
  date: new Date(),
  error: new Error("An error occurred"),
  regex: /test/i,
  domNode: document.createElement("div")
}
```

<div class="content-ad"></div>

우리는 testData를 테스트 데이터로 사용할 것입니다.

# 2.1# JSON.parse와 JSON.stringify

이 기능을 사용하면 객체를 깊이 복제할 수 있지만, 유감스럽게도 데이터 유형의 일부만 복사될 뿐이며, 순환 참조가 있는 객체는 복사할 수 없습니다.

```js
try {
  const jsonClone = JSON.parse(JSON.stringify(testData))
  console.log(jsonClone)
} catch (error) {
  console.log("JSON 메서드가 이 데이터를 처리할 수 없습니다")
}
// 출력
/*
{
  number: 123,
  string: "test",
  null: null,
  boolean: true,
  object: { a: 1, b: { c: 2 } },
  array: [1, 2, { d: 3 }]
}
*/
```

<div class="content-ad"></div>

이미지를 포함한 코드 블록:

```js
const obj = { name: 'fatfish' }

obj.obj = obj
JSON.parse(JSON.stringify(obj))
```

Markdown 형식으로 변환 된 표:

# 2.2# lodash.clone

<div class="content-ad"></div>

대부분의 사람들이 이 선택을 하겠지만 추가적인 npm 패키지를 가져와야 할 수도 있지만 그 가치는 충분히 합니다.

```js
const _ = require('lodash')
const lodashClone = _.cloneDeep(testData)
console.log(lodashClone)

/*
{
  number: 123,
  string: "test",
  undefined: undefined,
  null: null,
  boolean: true,
  object: { a: 1, b: { c: 2 } },
  array: [1, 2, { d: 3 }],
  function: [Function: function], // 함수 참조는 복사됩니다.
  map: Map { 'key1' => 'value1', 'key2' => 'value2' },
  set: Set { 1, 2, 3 },
  date: 2023-05-23T09:00:00.000Z,
  error: Error: An error occurred,
  regex: /test/i,
  domNode: HTMLDivElement {}
}
*/
```

![이미지](/assets/img/2024-05-27-structuredCloneTheEasiestWaytoDeepCloneObjectsinJavaScript_4.png)

# 3.1# 새로운 API: structuredClone?

<div class="content-ad"></div>

<img src="/assets/img/2024-05-27-structuredCloneTheEasiestWaytoDeepCloneObjectsinJavaScript_5.png" />

mdn에서 가져왔어요!

2022년부터 크롬, 파이어폭스 등 다양한 주요 브라우저에서 지원되고 있어요. 우리에게 행운이네요!

아직 이 데이터를 사용 중이지만, 먼저 함수와 DOM 유형을 숨기고, 그 이유를 나중에 설명할게요.

<div class="content-ad"></div>


const testData = {
  number: 123,
  string: "test",
  undefined: undefined,
  null: null,
  boolean: true,
  object: { a: 1, b: { c: 2 } },
  array: [1, 2, { d: 3 }],
  // function: function() { return "hello"; },
  map: new Map([["key1", "value1"], ["key2", "value2"]]),
  set: new Set([1, 2, 3]),
  date: new Date(),
  error: new Error("An error occurred"),
  regex: /test/i,
  // domNode: document.createElement("div")
}

const structuredCloneResult = structuredClone(testData)
console.log(structuredCloneResult)
/*
{
  number: 123,
  string: "test",
  undefined: undefined,
  null: null,
  boolean: true,
  object: { a: 1, b: { c: 2 } },
  array: [1, 2, { d: 3 }],
  function: undefined, // Functions are not cloned
  map: Map { 'key1' => 'value1', 'key2' => 'value2' },
  set: Set { 1, 2, 3 },
  date: 2023-05-23T09:00:00.000Z,
  error: Error: An error occurred,
  regex: /test/i,
  domNode: undefined // DOM nodes are not cloned
}
*/


<img src="/assets/img/2024-05-27-structuredCloneTheEasiestWaytoDeepCloneObjectsinJavaScript_6.png" />

우리가 손에 들고 있는 잔을 들어 올려봐요. 이 결과는 축하해야 할 만하네요.

# 3.2# structuredClone의 장점


<div class="content-ad"></div>

친구야, structuredClone 함수를 좋아하시나요? 충분히 간단한가요? 네, 그것이 가장 큰 장점이죠.

하지만 또 다른 큰 장점이 있습니다. 그것은 심지어 원형 참조가 있는 객체도 복사할 수 있다는 것이죠.

```js
const obj = { name: 'fatfish' }

obj.obj = obj
structuredClone(obj)
```

<img src="/assets/img/2024-05-27-structuredCloneTheEasiestWaytoDeepCloneObjectsinJavaScript_7.png" />

<div class="content-ad"></div>

# 3.3 구조화된 복제의 일부 제한 사항

친구들아, 함께 축배를 건넜지만, 구조화된 복제에는 여전히 몇 가지 제한 사항이 있음을 인정해야 합니다.

함수나 Dom을 복사할 수 없습니다. 이를 하려고 시도하면 예외가 발생합니다. 이것이 저가 함수와 Dom을 숨긴 이유입니다.

```js
const obj = { fn: () => {} }

structuredClone(obj)
```

<div class="content-ad"></div>

<img src="/assets/img/2024-05-27-structuredCloneTheEasiestWaytoDeepCloneObjectsinJavaScript_8.png" />

```js
const obj = { domNode: document.createElement('div') }

structuredClone(obj)
```

<img src="/assets/img/2024-05-27-structuredCloneTheEasiestWaytoDeepCloneObjectsinJavaScript_9.png" />

이 함수를 호출할 때 오류가 발생하지 않도록 하고, 메소드를 가진 객체를 깊게 복제하지만 메소드는 복제하지 않기를 원합니다.

<div class="content-ad"></div>

# 친절한 한국어 번역 🚀

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 박수 보내고 팔로우하세요 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠에 강제로 노출되는 블로깅 플랫폼에 지쳤나요? Differ를 시도해보세요.
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요.