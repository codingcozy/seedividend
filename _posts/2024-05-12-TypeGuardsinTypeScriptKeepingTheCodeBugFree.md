---
title: "Type Guards in TypeScript 코드 버그를 방지하는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-TypeGuardsinTypeScriptKeepingTheCodeBugFree_0.png"
date: 2024-05-12 22:56
ogImage: 
  url: /assets/img/2024-05-12-TypeGuardsinTypeScriptKeepingTheCodeBugFree_0.png
tag: Tech
originalTitle: "Type Guards in TypeScript: Keeping The Code Bug Free"
link: "https://medium.com/@abir-mahmud/type-guards-in-typescript-keeping-the-code-bug-free-78b608b7ed85"
---


<img src="/assets/img/2024-05-12-TypeGuardsinTypeScriptKeepingTheCodeBugFree_0.png" />

타입 가드(Type Guard)는 TypeScript에서 변수의 타입을 특정 코드 블록 내에서 좁힐 수 있는 메커니즘입니다. 이것은 TypeScript 컴파일러에 변수의 타입에 대한 추가 정보를 제공하여 런타임에서 변수의 타입을 더 정확하게 추론하고 TypeScript 코드의 타입 안전성을 향상시킵니다. 이를 통해 변수가 숫자, 문자열 또는 특정 속성을 가진 객체와 같은 어떤 종류의 데이터를 보유할 수 있는지 정의할 수 있습니다.

하지만 변수가 여러 가지 유형을 동시에 가질 수 있는 경우는 어떻게 될까요? 이것이 타입 가드가 유용해지는 시점입니다. 이것들은 변수의 정확한 유형을 그 자리에서 찾아내도록 도와주는 탐정 도구와 같은 것입니다.

타입 가드가 왜 중요한가요?



`userInfo`라는 변수가 있고 이 변수에는 string(사용자 이름) 또는 더 많은 세부 정보(이름, 이메일)를 가진 객체가 포함될 수 있다고 가정해 봅시다. 타입 가드가 없는 경우 TypeScript는 객체에만 존재할 수 있는 특정 속성에 액세스할 수 없도록 오동작 할 수 있습니다.

타입 가드는 `userInfo`의 타입을 런타임에서 확인하여 상황을 명확하게 해줍니다. 이렇게 하면 코드가 더:

1. 신뢰할 수 있게 됩니다: 타입을 확인하여 `userInfo`를 정확히 사용하는 방법을 알 수 있습니다.

2. 가독성이 좋아집니다: 코드가 당신과 다른 사람들에게 이해하기 쉬워집니다.



3. 버그 없음: 초기에 형 불일치를 잡아 내어 프로그램을 충돌시킬 수있는 오류를 피할 수 있습니다.

타입 가드의 종류: 탐정 키트

타입 가드를 사용하는 다양한 방법이 있으며 각각의 장점이 있습니다:

- in 연산자: 이 연산자는 객체에 특정 속성이 있는지 확인합니다. 특정 속성이 있는지 확인하는 데 도움이 됩니다.



```typescript
let userInfo: string | { name: string, email: string };
if (typeof userInfo === "object" && "email" in userInfo) {
console.log(userInfo.email);
}
```

- 타입 캐스팅: 타입 캐스팅 또는 타입 어서션이라고도 불립니다. TypeScript 컴파일러에 특정 타입으로 값을 취급하도록 지시하는 방법입니다. TypeScript에게 "너보다 더 잘 안다고; 이 경우 값이 특정 타입임을 믿어줘"라고 말하는 것과 같습니다.

```typescript
let userInfo = (user as { name: string }).name;
console.log(userInfo);
```

- 커스텀 타입 가드: 특정 조건을 확인하는 함수들입니다.



```js
function isUserObject(user: any): user is { name: string } {
return typeof user === "object" && "name" in user;
}
if (isUserObject(userInfo)) {
console.log(userInfo.name);
}
```

사용 사례: 케이스를 풀어라:

타입 가드는 다양한 상황에서 매우 유용합니다:

- 사용자 입력 처리: 예상 형식에 맞는지 확인하기 위해 양식 데이터를 유효성 검사합니다 (숫자는 숫자 위치에, 텍스트는 텍스트 위치에).
- 외부 데이터 처리: API나 파일에서 가져온 데이터가 항상 완벽하게 구조화되어 있지 않을 수 있습니다. 타입 가드는 형식을 식별하고 그에 맞게 처리할 수 있도록 도와줍니다.
- 유연한 함수 작성: 타입 가드를 어댑터처럼 작용하여 다양한 유형의 데이터를 처리할 수 있는 함수를 작성합니다.



유형 가드는 TypeScript의 유니언 유형이나 복잡한 데이터 구조와 같이 TypeScript의 유형 추론 능력이 제한되는 시나리오에서 특히 유용합니다. 이들은 TypeScript가 변수의 특정 유형을 이해하도록 도와 안정적이고 오류가 적은 코드를 작성하기 쉽게 만듭니다.

유형 가드는 TypeScript 프로그래밍에서 핵심적인 역할을 하며, 개발자가 작업 중인 변수의 유형에 대해 정보를 얻고 안전하고 유지보수가 용이한 코드베이스를 작성할 수 있도록 도와줍니다.