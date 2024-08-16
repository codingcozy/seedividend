---
title: "대용량 JSON 객체를 효율적으로 업데이트하는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-HowToUpdateLargeJSONObjectsEfficiently_0.png"
date: 2024-05-14 12:45
ogImage: 
  url: /assets/img/2024-05-14-HowToUpdateLargeJSONObjectsEfficiently_0.png
tag: Tech
originalTitle: "How To Update Large JSON Objects Efficiently"
link: "https://medium.com/gitconnected/how-to-update-large-json-objects-efficiently-95e6c7435be7"
isUpdated: true
---





![JSON Patch](/assets/img/2024-05-14-HowToUpdateLargeJSONObjectsEfficiently_0.png)

JSON Patch는 JSON 문서를 변경하는 방법을 설명하는 형식으로, JSON 데이터를 수정하는 방법을 보여주는 간결한 작업 지침의 시리즈를 사용합니다. 이 작업에는 새 데이터 추가, 이전 데이터 삭제, 기존 데이터 교체 또는 데이터 이동이 포함됩니다.

## JSON Patch를 사용하는 이유

대규모 웹 애플리케이션에서 클라이언트는 최신 데이터를 가져오거나 수정된 데이터를 서버에 제출하기 위해 서버와 자주 통신해야 합니다. 기존 방식은 모든 업데이트마다 전체 JSON 문서를 보내는 것이며, 실제 데이터의 일부분만 변경되었더라도 전송됩니다. 이는 네트워크 트래픽 증가, 네트워크 지연 증가, 서버 및 클라이언트 부하 증가로 이어집니다.




JSON Patch는 네트워크 전송 양을 줄이고 데이터 업데이트 효율성을 향상시키는 효율적인 솔루션을 제공합니다. JSON Patch를 사용하면 클라이언트는 전체 JSON 문서가 아닌 수정이 필요한 데이터 부분만 전송할 수 있습니다. 서버가 JSON Patch를 수신한 후에는 해당 지침에 따라 해당 작업을 수행하여 데이터의 점진적 업데이트를 달성할 수 있습니다. 이는 네트워크 전송 양을 줄이고 네트워크 효율성을 향상시키며 서버와 클라이언트에 가하는 부하를 줄이는데 도움이 됩니다.

## JSON Patch의 혜택은 무엇인가요?

- 전송 양 감소: JSON Patch는 JSON 문서에 대해 수행할 구체적인 변경 사항만 전송하며 전체 JSON 문서를 전송하지 않습니다. 이는 특히 대규모 데이터 세트나 저속 네트워크 환경에서 네트워크 대역폭을 절약할 수 있습니다.
- 점진적 업데이트: JSON Patch는 JSON 문서에 대한 점진적 업데이트를 지원합니다. 이는 전체 문서가 아닌 변경해야 하는 부분만 보낼 수 있기 때문에 실시간 애플리케이션 및 빈번한 업데이트가 필요한 상황에 유용합니다.
- 유연성과 확장성: JSON Patch는 JSON 문서에서 수행할 수 있는 작업을 제한하지 않습니다. 필요에 따라 추가, 삭제, 교체, 이동 및 기타 작업을 수행할 수 있으며 필요에 따라 새 작업을 추가할 수도 있습니다.

## JSON Patch는 어떤 작업을 지원하나요?



1. 추가

JSON 문서에 새로운 값을 추가하려면 경로와 추가할 값이 필요합니다.

```js
{ "op": "add", "path": "/path", "value": "new value" }
```

2. 제거



JSON 문서에서 값을 제거하려면 제거할 값을 가리키는 경로를 지정해야 합니다.

```js
{ "op": "remove", "path": "/path" }
```

3. 대체

JSON 문서의 값을 교체하려면 대체할 값을 가리키는 경로와 새 값이 필요합니다.



```js
{ "op": "replace", "path": "/path", "value": "new value" }
```

4. 이동

JSON 문서에서 값을 다른 위치로 이동하려면 이동할 값의 경로와 대상 경로를 지정해야 합니다.

```js
{ "op": "move", "from": "/oldpath", "path": "/newpath" }
```



5. 복사

JSON 문서에서의 값을 다른 위치로 복사하려면 복사할 값의 경로와 대상 경로를 지정해야 합니다.

```js
{ "op": "copy", "from": "/oldpath", "path": "/newpath" }
```

6. 테스트



JSON 문서에서 값이 특정 값과 동일한지 확인하는 테스트를 수행하며, 이는 주로 작업이 성공적으로 실행될 수 있는지 확인하는 데 사용됩니다. 테스트할 값이 들어 있는 경로와 예상 값이 명시되어야 합니다.

```js
{ "op": "test", "path": "/경로", "value": "예상 값" }
```

## JSON 패치 사용 방법

많은 개발 언어에서 JSON 패치 사양을 구현했습니다. JS 환경에서는 fast-json-patch 라이브러리를 사용할 수 있습니다.



첫째로, npm 또는 pnpm을 사용하여 fast-json-patch를 설치해주세요:

```js
npm install fast-json-patch
또는 
pnpm add fast-json-patch
```

fast-json-patch 라이브러리를 성공적으로 설치한 후에는 제공되는 API를 활용하여 다음 기능을 수행할 수 있습니다:

- 두 개의 객체를 비교하여 패치를 가져오기
- 객체 변경을 관찰하고 변경사항을 감지할 때 패치를 생성하기
- JS 객체에 단일 또는 여러 패치 적용하기
- 패치 시퀀스를 유효성 검사하기



- 두 객체를 비교하여 패치를 가져오기

```js
import { compare } from "fast-json-patch/index.mjs";

const documentA = { user: { firstName: "Albert", lastName: "Einstein" } };
const documentB = { user: { firstName: "Albert", lastName: "Collins" } };

const diff = compare(documentA, documentB);

/**
 * diff: 
 * [ { op: 'replace', path: '/user/lastName', value: 'Collins' } ]
 */
```

2. 객체 변경 사항을 관찰하고 변경이 감지되면 패치를 생성합니다.

```js
import { generate, observe } from "fast-json-patch/index.mjs";

const document = {
  firstName: "Joachim",
  lastName: "Wester",
  contactDetails: { phoneNumbers: [{ number: "555-123" }] },
};
const observer = observe(document);
document.firstName = "Albert";
document.contactDetails.phoneNumbers[0].number = "123";
document.contactDetails.phoneNumbers.push({ number: "456" });
const patch = generate(observer);

/**
 * patch：
 * [
 *  {
 *    op: 'replace',
 *    path: '/contactDetails/phoneNumbers/0/number',
 *    value: '123'
 *  },
 *  {
 *   op: 'add',
 *   path: '/contactDetails/phoneNumbers/1',
 *   value: { number: '456' }
 *  },
 *  { op: 'replace', path: '/firstName', value: 'Albert' }
 * ]
 */
```



3. JS 객체에 단일 또는 여러 패치 적용하기

단일 패치 적용

```js
import { applyPatch } from "fast-json-patch/index.mjs";

const documentA = { user: { firstName: "Albert", lastName: "Einstein" } };
const patchedResult = applyPatch(documentA, [
  { op: "replace", path: "/user/lastName", value: "Collins" },
]);

/**
 * patchedResult[0]:
 * {
 *   newDocument: { user: { firstName: 'Albert', lastName: 'Collins' } },
 *   removed: 'Einstein'
 * }
 */
```

다중 패치 적용



```js
import { applyPatch } from "fast-json-patch/index.mjs";

const document = {
  firstName: "Joachim",
  lastName: "Wester",
  contactDetails: { phoneNumbers: [{ number: "555-123" }] },
};

const patchedResult = applyPatch(document, [
  {
    op: "replace",
    path: "/contactDetails/phoneNumbers/0/number",
    value: "123",
  },
  {
    op: "add",
    path: "/contactDetails/phoneNumbers/1",
    value: { number: "456" },
  },
  { op: "replace", path: "/firstName", value: "Albert" },
]);

/**
 * patchedResult[0]: 
 * {
 *  newDocument: {
 *    firstName: "Albert",
 *    lastName: "Wester",
 *    contactDetails: { phoneNumbers: [{ number: "123" }, { number: "456" }] },
 *  },
 *  removed: "555-123",
 * }
 */
```

4. 패치 시퀀스 유효성 검사

```js
import { validate } from "fast-json-patch/index.mjs";

const documentA = { user: { firstName: "Albert", lastName: "Einstein" } };
const validatedResult = validate(
  [{ op: "replace", path: "/user/lastName", value: "Collins" }],
  documentA
);
```

만약 패치 시퀀스가 JSON Patch 사양을 충족하지 않으면, 검증 중에 JsonPatchError 예외 객체가 발생합니다.



JSON Patch와 fast-json-patch가 소개되었어요! 관심이 있다면 JSON Patch를 직접 경험해보세요. 다른 해결책이 있으면 메시지를 남겨주세요.

TypeScript는 멋지고 배울 가치가 있어요. TypeScript를 배우고 싶다면, 저를 팔로우해서 더 많은 TS와 JS 정보를 읽어보세요!