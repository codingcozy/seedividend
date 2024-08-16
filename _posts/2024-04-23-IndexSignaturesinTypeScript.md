---
title: "TypeScript에서의 인덱스 시그니처"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Index Signatures in TypeScript"
link: "https://medium.com/@szaranger/index-signatures-in-typescript-ccfffc097913"
isUpdated: true
---





인덱스 시그니처는 우리가 익숙하지 않은 속성을 포함하는 객체를 다루는 데 적합한 방법을 제공합니다. 그 구문은 일반적인 속성을 설명하지만, 표준 속성 이름 대신 키의 유형과 속성을 정의합니다.

![인덱스 시그니처](/assets/img/IndexSignaturesinTypeScript_0.png)

에너지 회사가 고객에게 보낼 수 있는 몇 가지 유틸리티 청구서 예제를 살펴봅시다.

```js
const utilityBill1 = {
  electricty: 80.5,
  gas: 65.05,
};

const utilityBill2 = {
  electricty: 102.34,
  water: 91.0,
};

const utilityBill3 = {
  electricty: 89.15,
  hotWater: 44.67,
  water: 97.78,
};
```

<div class="content-ad"></div>

해당 합계를 계산하는 함수를 만들어보세요.

```js
function calculateBillTotal(utilityBill: { [key: string]: number }) {
  let total = 0;
  for (const key in utilityBill) {
    total += utilityBill[key];
  }
  return total;
}
```

이 함수를 올바르게 타입 지정하고 싶습니다. any를 사용하는 대신 number 값을 가진 모든 객체를 받을 수 있도록 하고 싶습니다.

문제를 해결하기 위해 인덱스 시그니처를 사용할 수 있습니다. 다음과 같은 형태를 가지고 있습니다:

<div class="content-ad"></div>

```js
{ [키: string]: number }
```

이는 객체의 모든 멤버가 문자열 인덱스 시그너처를 준수해야 함을 나타냅니다.

어디에나 'any' 대신 인덱스 시그너처를 추가할 수 있습니다.

```js
function calculateBillTotal(utilityBill: { [키: string]: number }) {
  let total = 0;
  for (const key in utilityBill) {
    total += utilityBill[key];
  }
  return total;
}
```

<div class="content-ad"></div>

TypeScript에게 utilityBill이 문자열 유형인 키와 숫자 유형인 값으로 구성된 객체여야 한다고 알려줍니다. 이렇게 함으로써 calculateBillTotal 함수에 utilityBill1, utilityBill2 및 utilityBill3 중 어느 것이라도 함수의 인수로 전달될 수 있습니다.

그러나 문자열을 값으로 갖는 객체를 전달하려고 하면 TypeScript가 오류 메시지를 throw할 것입니다:

```js
const utilityBill = {
  electricty: "89.15",
  hotWater: 44.67,
  water: 97.78,
};

calculateBillTotal(utilityBill);
/*                 ~~~~~~~~~~~~ '{ electricity: string; }' 유형의 인수는 
    '{ [key: string]: number; }' 유형의 매개변수에 할당할 수 없습니다.
    속성 'electricity'이(가) 인덱스 시그니처와 호환되지 않습니다.
    'string' 유형은 'number' 유형에 할당할 수 없습니다.ts(2345)
*/
```

💡 인덱스 시그니처는 키 유형으로 문자열, 숫자 또는 심볼만을 허용합니다.

<div class="content-ad"></div>

# 존재하지 않는 속성

인덱스 시그니처를 사용할 때 주의해야 할 점 중 하나는 존재하지 않는 속성에 액세스하는 것입니다. \*\*\*\*

```js
type UtilityBill = {
  [key: string]: number,
};

const utilityBill: UtilityBill = {
  electricty: 89.15,
  hotWater: 44.67,
  water: 97.78,
};

const phoneBill = utilityBill["phone"];
phoneBill; // 👉🏻 undefined 💥
```

이 예에서 TypeScript는 경고를 표시하지 않습니다. 인덱스 시그니처는 단순히 키 유형을 값 유형에 매핑하기 때문입니다. 따라서 UtilityBill 유형을 올바르게 주석 처리해야 합니다.

<div class="content-ad"></div>

```js
type UtilityBill = {
  [key: string]: number | undefined,
};
```

🚨 만약 문자열, 숫자 또는 심볼 이외의 타입으로 인덱스 시그니처를 주석 처리하려고 하면 TypeScript에서 허용되지 않습니다.

```js
type Utilities = "전기" | "가스" | "온수" | "물";
type UtilityBill = {
  [key: Utilities]: number,
  // ~~~ 인덱스 시그니처의 매개변수 타입은 유니언 타입이 될 수 없습니다.
  // 대신 mapped object type을 사용해 보세요 💥
};
```

# Mapped Types

<div class="content-ad"></div>

Mapped Types은 인덱스 시그니처를 사용하여 리터럴 문자열의 유니언에 속하는 인덱스 문자열을 강제로 지정할 수 있게 합니다.

```js
type Utilities = "전기" | "가스" | "온수" | "물";

type UtilityBill = { [k in Utilities]: number };
```

# Record<Keys, Type>

인덱스 시그니처와 유사하게, TypeScript에는 레코드를 주석 처리하는 유틸리티 타입 Record<Keys, Type>이 있습니다. 우리는 더 정확한 유형으로 UtilityBill 타입을 주석 처리하기 위해 Record<Keys, Type>을 사용할 수 있습니다.

<div class="content-ad"></div>

```js
유틸리티 타입을 정의하고 필요한 값을 할당할 수 있는 유틸리티 빌 객체가 있어요.

유틸리티 빌 객체에는 전기세, 가스요금, 온수요금, 수도요금이 포함되어 있어요.

# 요약

인덱스 시그니처는 속성의 세부 정보가 익숙하지 않은 객체를 관리하는 적합한 방법을 제공해요. 문법은 일반 속성을 설명하지만 일반적인 속성 이름을 작성하는 대신 키의 유형과 속성을 정의해요.

인덱스 시그니처를 사용하여 일반적인 개체를 주석 처리할 수 있지만, 키가 문자열 유형인 객체를 주석 처리하는 경우 Mapped Types 또는 Record`Keys, Type` 유틸리티 타입을 사용하여 키로 사용된 문자열 리터럴의 유니언을 포함하는 객체를 주석 처리할 수 있어요.
```
