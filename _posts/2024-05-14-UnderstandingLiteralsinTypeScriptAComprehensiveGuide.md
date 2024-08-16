---
title: "TypeScript에서 리터럴 이해하기 포괄적인 안내"
description: ""
coverImage: "/assets/img/2024-05-14-UnderstandingLiteralsinTypeScriptAComprehensiveGuide_0.png"
date: 2024-05-14 10:49
ogImage: 
  url: /assets/img/2024-05-14-UnderstandingLiteralsinTypeScriptAComprehensiveGuide_0.png
tag: Tech
originalTitle: "Understanding Literals in TypeScript: A Comprehensive Guide"
link: "https://medium.com/@amitperane8473/understanding-literals-in-typescript-a-comprehensive-guide-0f517f61d4a6"
isUpdated: true
---




<img src="/assets/img/2024-05-14-UnderstandingLiteralsinTypeScriptAComprehensiveGuide_0.png" />

프로그래밍 세계에서 기초 개념을 이해하는 것은 중요합니다. 리터럴은 TypeScript의 기본 개념 중 하나입니다. TypeScript를 막 시작했거나 지식을 더 키우고 싶다면, 이 안내서는 TypeScript에서 리터럴과 그 중요성에 대해 포괄적으로 이해하도록 도와줄 것입니다.

# 리터럴이란 무엇인가요?

TypeScript에서 리터럴이란 정확하고 변경할 수 없는 값들을 가리킵니다. 이러한 값들은 계산이나 변환 없이 코드에 직접 제공됩니다. TypeScript는 숫자 리터럴, 문자열 리터럴, 부울 리터럴 등 여러 유형의 리터럴을 지원합니다.



# 숫자 리터럴

숫자 리터럴은 TypeScript에서 숫자를 나타냅니다. 십진수(기수 10), 16진수(기수 16), 8진수(기수 8), 또는 2진수(기수 2)와 같은 다양한 형식으로 표현할 수 있습니다. 여기에 몇 가지 예시가 있습니다:

```js
let decimalLiteral: number = 42;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```



문자열 리터럴은 홑따옴표(‘ ‘)나 겹따옴표(“ “)로 둘러싸인 텍스트 데이터를 나타냅니다. 문자, 숫자, 기호 및 특수 문자를 포함할 수 있습니다. TypeScript에서 문자열 리터럴이 어떻게 보이는지 여기에 있습니다:

```js
let hello: string = "Hello";
let world: string = 'World';
```

# 부울 리터럴

부울 리터럴은 true 또는 false라는 두 가지 가능한 값만을 나타냅니다. 논리 연산 및 조건식에 일반적으로 사용됩니다. 부울 리터럴의 사용법은 다음과 같습니다:



```js
let isTrue: boolean = true;
let isFalse: boolean = false;
```

# 다른 리터럴 타입

숫자, 문자열 및 불리언 리터럴 외에도 TypeScript는 null 및 undefined와 같은 다른 리터럴 타입을 지원합니다.

```js
let nullLiteral: null = null;
let undefinedLiteral: undefined = undefined;
```



# 리터럴 사용의 장점

- 타입 안전성: 리터럴을 사용하면 TypeScript가 특정 타입을 추론하여 개발 중에 타입 안전성을 제공합니다. 예를 들어, 숫자 리터럴을 변수에 할당하는 경우 TypeScript는 변수의 타입이 숫자임을 알고 있습니다.
- 명확성과 가독성: 리터럴을 사용하면 코드가 명확하고 가독성이 좋아집니다. 코드에서 리터럴 값을 보면 다른 곳에서 정의를 찾아볼 필요없이 해당 값이 무엇을 나타내는지 정확하게 알 수 있습니다.
- 향상된 도구 지원: TypeScript의 IntelliSense 및 코드 편집기는 리터럴을 사용할 때 더 나은 자동 완성 제안 및 타입 검사 지원을 제공하여 더 생산적인 개발 경험을 제공할 수 있습니다.

# 리터럴 타입 사용

TypeScript에서는 문자열, 숫자 또는 부울 리터럴을 기본 타입으로 사용하여 사용자 정의 리터럴 타입을 생성할 수 있습니다. 이를 통해 변수가 보유할 수 있는 특정 값들을 정의할 수 있습니다.



```js
type 방향 = '위' | '아래' | '왼쪽' | '오른쪽';

let move: 방향 = '위'; // 유효함
let invalidMove: 방향 = '대각선'; // 에러: '대각선'을 '방향' 타입에 할당할 수 없습니다
```

# 결론

리터럴은 TypeScript에서 타입 안정성과 코드 가독성을 향상시키는 정확하고 변경할 수 없는 값 제공하는 데 중요한 역할을 합니다. 리터럴을 효과적으로 사용하는 방법을 이해하면 TypeScript 코드의 품질과 유지보수성을 향상시킬 수 있습니다. 사용자 정의 리터럴 타입을 정의하거나 내장된 리터럴을 활용하든, 코드베이스에 포함시킬 경우 더 견고하고 신뢰할 수 있는 소프트웨어를 개발할 수 있습니다
