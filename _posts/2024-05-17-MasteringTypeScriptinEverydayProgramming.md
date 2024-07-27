---
title: "프론트엔드 개발자를 위한 TypeScript 마스터하기"
description: ""
coverImage: "/assets/img/2024-05-17-MasteringTypeScriptinEverydayProgramming_0.png"
date: 2024-05-17 21:00
ogImage: 
  url: /assets/img/2024-05-17-MasteringTypeScriptinEverydayProgramming_0.png
tag: Tech
originalTitle: "Mastering TypeScript in Everyday Programming"
link: "https://medium.com/@Choco23/mastering-typescript-in-everyday-programming-2e21c3d43763"
---


<img src="/assets/img/2024-05-17-MasteringTypeScriptinEverydayProgramming_0.png" />

# 프론트엔드 개발에서의 TypeScript 🚀

Microsoft에서 개발된 TypeScript는 2012년 10월 오픈 소스로 등장한 이후로 프론트엔드 개발자들에게 필수적인 도구가 되었습니다.

🌐 널리 인정받아 현재는 대규모 프로젝트에서 표준으로 사용되며, 정적 타입 시스템을 통해 코드 가독성과 유지보수성을 향상시킵니다.

<div class="content-ad"></div>

💪 최신 JavaScript 기능을 제공하는 TypeScript은 강력한 컴포넌트를 만들 수 있게 해주어 매 반복 업데이트마다 프론트엔드 코딩을 더욱 편안하게 만듭니다.

🔄 TypeScript는 계속해서 프론트엔드 개발 환경을 향상시키며 진화를 받아들이세요.

![Mastering TypeScript in Everyday Programming](/assets/img/2024-05-17-MasteringTypeScriptinEverydayProgramming_1.png)

# TypeScript를 선택해야 하는 이유? ✨

<div class="content-ad"></div>

마이크로소프트는 TypeScript를 소개할 때 두 가지 주요 목표를 가졌습니다: JavaScript를 위한 선택적 유형 시스템 제공 및 현재 및 미래의 JavaScript 기능과의 호환성 보장.

🛠️ 코드 품질과 유지 관리:
- 유형은 코드 리팩터링을 돕고 런타임이 아니고 컴파일 시간에 오류를 잡아낸다.
- 유형은 탁월한 문서화 역할을 하며 명확한 함수 선언을 통해 코드 이해를 높인다.

🔄 TypeScript의 접근 방식:
- TypeScript는 선택적 유형을 제공하여 JavaScript를 너무 복잡하지 않게 개선하는 균형을 유지한다.
- 이는 "JavaScript 슈퍼셋" 역할을 하며 컴파일 시간 유형 안전성을 제공하면서 JavaScript와 완전히 호환된다.

👀 유형 추론 및 주석:
- TypeScript는 개발 중 비용 효율적인 유형 안전성을 위해 유형을 추론한다.
- 명시적 유형 주석은 코드 이해와 가독성을 돕는 미래 개발자를 지원할 수 있다.

<div class="content-ad"></div>

🚀 원활한 통합 및 이전:
- TypeScript는 JavaScript에서 원활한 이전을 보장하며, 오류가 있더라도 호환 가능한 JavaScript로 컴파일됩니다.
- 타입 오류는 일반적인 JavaScript 런타임을 방해하지 않습니다.

🌐 TypeScript의 주요 기능:
- 아파치 라이선스 하에 무료 및 오픈 소스입니다.
- ECMAScript 표준을 기반으로 구축되었으며, JavaScript를 확장합니다.
- 선택적인 정적 타입, 클래스 및 모듈을 추가합니다.
- ECMAScript 사양을 준수하는 읽기 쉬운 JavaScript로 컴파일됩니다.
- 모든 브라우저, 호스트 및 운영 체제에서 교차 플랫폼 지원을 제공합니다.
- 기존 JavaScript 코드와의 완전한 통합 (ts/tsx 파일 확장자).
- 런타임 오염 없는 컴파일 시간 검사.

# TypeScript 개발 시작하기 🚀

## TypeScript 종속성 설치

<div class="content-ad"></div>

TypeScript 개발 환경을 설정하는 것은 매우 쉬운 일이에요. 특히 대부분의 프론트엔드 프로젝트에서 TypeScript를 손쉽게 통합할 수 있죠. 아래 간단한 단계를 따라 시작해보세요:

1. 프론트엔드 프로젝트에 꼭 필요한 NodeJS와 npm 도구가 설치되어 있는지 확인해주세요.

2. TypeScript를 설치하려면 npm 명령어를 사용하세요. 아래 명령어로 간단하게 설치할 수 있어요:

```js
npm install --save-dev typescript ts-node
```

<div class="content-ad"></div>

✨ TypeScript 및 필수 런타임 ts-node를 함께 설치합니다.

이러한 종속성이 설치되면 TypeScript 개발 세계로 뛰어들 준비가 됩니다! 🌐

Babel 통합 설치

프론트엔드 프로젝트의 동적한 세계에서 Babel은 중요한 동료입니다. TypeScript와 Babel을 결합하면 강력한 개발 환경이 구성됩니다. TypeScript 컴파일러는 정적 타입 확인을 처리하고, Babel은 TypeScript 코드를 실행 가능한 JavaScript로 변환합니다.

<div class="content-ad"></div>

Babel을 TypeScript와 원활하게 통합하기 위해서는 주요 의존성 패키지 '@babel/preset-typescript'이 필요합니다. 아래 npm 명령어를 실행해주세요:

```js
npm install -D @babel/preset-typescript
```

'Babel' 환경 설정 파일 (babel.config.js)에 '@babel/preset-typescript'를 추가해주세요. 이 프리셋은 TypeScript에서 유형과 관련된 코드 (예: 유형 주석, 인터페이스)를 제거하고 필요한 옵션을 추가하는 데 도움이 됩니다.

```js
// babel.config.js
{
 "presets": [
 // …
 "@babel/preset-typescript"
 ]
}
```

<div class="content-ad"></div>

이 통합을 통해 TypeScript와 Babel이 손을 맞잡고 프론트엔드 개발 경험을 높여줍니다! 🚀🔧

ESLint 통합 설치 방법

어떤 프로젝트에서든 코드 검토는 중요한 측면입니다. TypeScript는 기본 오류 감지를 제공하지만 프로젝트와 개발팀이 성장함에 따라 일관된 코드 스타일 유지가 필수적입니다. ESLint가 등장합니다. 이는 코드 스타일을 강제하는 강력한 도구입니다.

ESLint를 사용하여 TypeScript 코드를 구문 분석하려면 필요한 구문 분석기와 플러그인을 설치하세요:

<div class="content-ad"></div>

```js
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

참고: `@typescript-eslint/parser` 및 `@typescript-eslint/eslint-plugin` 모두 동일한 버전이어야 합니다.

ESLint 구성 파일 (`.eslintrc.js`)에 다음 옵션을 추가해주세요:

```js
// .eslintrc.js
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-use-before-define": "error",
    // …
  }
}
```

이 구성을 통해 ESLint가 TypeScript 코드를 구문 분석하도록 설정되며, 권장 규칙을 적용하거나 필요에 따라 규칙을 사용자 정의할 수 있습니다. 🧐🔍✨


<div class="content-ad"></div>

## TypeScript 컴파일 구성

TypeScript는 명령줄 매개변수를 사용하여 파일을 컴파일할 수 있는 기능을 제공하지만, 일반적으로 `tsconfig.json`을 사용하여 프로젝트를 개발합니다. 이 파일이 프로젝트에 없다면 수동으로 만들거나 `tsc — init` 명령을 사용하여 생성할 수 있습니다. TypeScript를 처음 사용할 때는 기본 `tsconfig.json` 파일이 충분하며, 필수적인 컴파일 관련 정보가 포함되어 있습니다. 프로젝트가 성숙해질수록 각 옵션을 이해하고 사용자 정의하는 것이 필요해집니다.

기본 옵션

초기 단계에서는 기본 `tsconfig.json` 파일이 적절하며, 일반적으로 다음과 같은 기본 컴파일 옵션이 포함됩니다:

<div class="content-ad"></div>

```js
{
 "compilerOptions": {
 "target": "es5",
 "module": "commonjs",
 "strict": true,
 // …
 }
}
```

개인 설정이 필요한 경우, `tsconfig.json` 파일의 각 항목에 대한 구체적인 이해가 중요합니다. 이러한 컴파일 옵션은 다음과 같이 해석됩니다:

- target: ECMAScript 대상 버전을 지정합니다.
- module: 코드 생성을 위한 모듈 시스템을 정의합니다.
- strict: 엄격한 유형 검사 옵션을 강제합니다.

엄격한 유형 검사 옵션

<div class="content-ad"></div>

TypeScript을 구성할 때는 프로젝트의 동작을 맞춤화하기 위한 다양한 엄격한 타입 확인 옵션이 있습니다. 여기에 몇 가지 주요 옵션을 안내해드리겠습니다:

- strict: 엄격한 타입 확인을 활성화합니다 (true/false).
- allowUnreachableCode: 도달할 수 없는 코드를 허용하거나 금지합니다 (true/false).
- allowUnusedLabels: 사용되지 않는 레이블 오류의 보고를 제어합니다 (true/false).
- noImplicitAny: 표현식과 선언에서 암시적 'any'에 대한 오류 플래그를 설정합니다 (true/false).
- strictNullChecks: 엄격한 null 확인을 활성화합니다 (true/false).
- noImplicitThis: 'this' 표현식의 'any' 값을 오류로 생성합니다 (true/false).
- alwaysStrict: 각 모듈을 엄격 모드로 확인하여 각 파일에 'use strict'를 추가합니다 (true/false).
- noImplicitReturns: 일부 함수 분기가 값 반환을 하지 않을 때 오류를 보고합니다 (true/false).
- noFallthroughCasesInSwitch: switch 문에서 fallthrough 오류를 보고할 지 여부를 나타냅니다.

모듈 구문 구성 옵션

TypeScript가 모듈을 구문 분석하는 방법을 구성하세요:

<div class="content-ad"></div>

- moduleResolution: 모듈 해결 전략을 설정합니다 (기본값: 'node' 또는 'classic').
- baseUrl: 상대적이지 않은 모듈 이름을 해결하기 위한 루트 디렉터리를 지정합니다.
- paths: `baseUrl`에 기반하여 모듈 이름을 경로에 매핑합니다 (형식: '').
- rootDirs: 프로젝트의 런타임 콘텐츠를 나타내는 루트 폴더를 나열합니다 (형식: []).
- typeRoots: 유형 선언을 포함하는 파일을 지정합니다 (형식: [“./types”]).

소스 맵 옵션

소스 맵 설정을 세밀하게 조정하세요:
- sourceRoot: 디버거가 소스 파일 대신 TypeScript 파일을 찾을 위치를 지정합니다.
- mapRoot: 디버거가 생성된 파일 대신 맵 파일을 찾을 위치를 지정합니다.
- inlineSourceMap: 단일 소스 맵 파일을 생성할지 여부를 결정합니다.
- inlineSources: 코드 및 소스 맵을 단일 파일로 생성합니다 (`inlineSourceMap` 및 `sourceMap` 속성이 필요함).

기타 옵션

<div class="content-ad"></div>

추가 구성 옵션을 살펴보세요:
- experimentalDecorators: 데코레이터를 활성화하거나 비활성화합니다.
- emitDecoratorMetadata: 데코레이터를 위한 메타데이터 지원을 제어합니다.

포함 및 제외 옵션
컴파일을 위해 파일을 지정하여 성능을 향상시키는 `include`와 `exclude`를 사용하세요:

```js
"exclude": [
 "node_modules",
 "dist"
 // …
]
```

이러한 구성 옵션을 사용하여 TypeScript를 프로젝트의 요구 사항에 맞게 정교하게 조정할 수 있어요! 🔧🎛️

<div class="content-ad"></div>

## TypeScript 유형 주석

이제 TypeScript 구성을 알게 되었으니, TypeScript에서 제공하는 기본 유형을 살펴보겠습니다. 다음 비교 표는 TypeScript 유형과 그 ES6 상당품을 함께 보여줍니다:

이제 TypeScript 관련 구성에 익숙해졌으니, TypeScript에서 제공하는 기본 유형에 대해 알아봅시다. 다음 비교는 TypeScript 유형과 그 ES6 상당품과의 차이점을 요약합니다:

1. Numeric Type:
— TypeScript: `number` | ES6: `number`

<div class="content-ad"></div>

2. 텍스트 유형:
- TypeScript: `string` | ES6: `string`

3. 논리 유형:
- TypeScript: `boolean` | ES6: `boolean`

4. 순차적인 유형:
- TypeScript: `array` | ES6: `array`

5. 정렬된 유형 (튜플):
- TypeScript: ✅ | ES6: ❌

<div class="content-ad"></div>

6. Enumerated Type (Enum):
- TypeScript: ✅ | ES6: ❌

7. Dynamic Type:
- TypeScript: `any` | ES6: `any`

8. Void Type:
- TypeScript: `void` | ES6: `void`

9. Null Type:
- TypeScript: ✅ | ES6: ❌

<div class="content-ad"></div>

10. 정의되지 않은 유형:
- TypeScript: ✅ | ES6: ❌

11. Never 유형:
- TypeScript: ✅ | ES6: ❌

이 간단한 형식은 TypeScript와 ES6 모두에 해당 유형이 존재하는지 (✅) 존재하지 않는지 (❌)를 나타냅니다.

TypeScript의 유형 주석은 다른 언어의 유형 선언과 일치합니다. 변수 선언에는 `let`과 `const`를 사용할 수 있으며, 다음 구문을 따릅니다:

<div class="content-ad"></div>

```js
// 구문: let 또는 const 변수이름: 데이터타입 = 초기값;
// 예시:
let varName: string = '안녕 타입스크립트';
```

함수 선언에 대해서는 함수 표현식을 사용하는 것이 좋습니다. 또는 화살표 함수를 사용하여 간결함을 높일 수 있습니다:

```js
// 구문: let 또는 const 함수표현식이름 = function(매개변수1: 타입, 매개변수2: 타입): 반환타입 {
// // 코드 실행
// // return xx;
// }
// 예시:
let sum = function(num1: number, num2: number): number {
 return num1 + num2;
}
```

이 구조는 TypeScript의 타입 주석, 변수 선언 및 함수 표현식에 대한 논리적 개요를 제공하며, 명확성을 위해 이모지로 장식되어 있습니다. 🌟


<div class="content-ad"></div>

## TypeScript 특수 타입

TypeScript의 기본 타입 사용은 다른 백엔드 언어와 일치합니다. 이 섹션에서는 TypeScript에만 존재하는 특수 타입을 소개하여 타입 선언을 복잡하게 만들고 세부 사항을 더합니다.

`any` — "백도어" 🎨

`any`는 TypeScript에서 독특한 위치를 차지하며 타입 시스템에서 "백도어" 역할을 합니다. 이것은 타입 확인을 비활성화하여 모든 타입과의 호환성을 가능케 합니다. 그러나 타입 안전성을 유지하기 위해 `any`에 대한 의존을 최소화해야 하며, 특정 문제를 해결하는 경우를 제외하고 사용해야 합니다. `any`를 사용하면 TypeScript 컴파일러에 타입 확인을 건너뛰도록 지시합니다.

<div class="content-ad"></div>

임의의 값 유형은 `Object`과 유사하지만 `Object` 유형의 변수가 다양한 값 할당을 허용하는 반면에 해당 메서드는 호출할 수 없습니다.

- `void`: 함수 선언에서 반환 값이 없음을 나타냅니다.
- `null`: 존재하지 않는 객체 값을 나타내며 일반적으로 값으로만 사용됩니다.
- `undefined`: 선언되었지만 초기화되지 않은 변수의 값을 나타냅니다.

`null`과 `undefined`는 모든 유형의 하위 유형으로, 모든 유형의 변수에 할당할 수 있습니다. `strictNullChecks` 구성을 활성화하면 `void` 및 스스로에 대한 할당이 제한됩니다.

<div class="content-ad"></div>

열거형 🌌

TypeScript는 열거형 유형을 지원하여 JavaScript의 표준 데이터 유형을 향상시킵니다. 열거형은 제한된 데이터 집합에 친숙한 이름을 제공하여 코드 가독성을 향상시킵니다. 선언에 `enum` 키워드를 사용하세요.

```js
enum SendType {
 SEND_NORMAL,
 SEND_BATCH,
 SEND_FRESH,
 // …
}
```

`never` 유형 🎭

<div class="content-ad"></div>

`never` 타입은 복잡한 상황에서 사용됩니다. 예외가 발생하거나 정상적으로 종료되지 않을 수 있는 함수에서 나타납니다.

🌌 튜플 타입

배열과 유사하게, 튜플 유형은 서로 다른 유형의 요소를 허용합니다.

```js
let row: [number, string, number] = [1, 'hello', 88];
```

<div class="content-ad"></div>

인터페이스 🎨

TypeScript의 인터페이스는 읽기 전용 속성, 선택적 속성 및 상속과 같은 다양한 기능을 지원하는 여러 타입 선언을 결합합니다.

타입 별칭 📝

타입 별칭은 유니언 타입, 튜플 타입, 함수 타입, 객체 타입 및 교차 타입을 지원하는 타입 주석을 위한 별칭을 설정하는 편리한 방법을 제공합니다.

<div class="content-ad"></div>

네임스페이스 🌐

네임스페이스는 코드를 구성하여 이름 충돌을 피하는 데 도움이 됩니다. `namespace` 키워드를 사용하여 정의되며, 코드 분리와 전역 네임스페이스 혼잡을 방지합니다.

```js
// 다중 파일 네임스페이스
// Validation.ts
namespace Validation {
 export interface StringValidator {
 isAcceptable(s: string): boolean;
 }
}
// NumberValidator.ts
namespace Validation { // 같은 네임스페이스
 export interface NumberValidator {
 isAcceptable(num: number): boolean;
 }
}
```

제네릭 🧬

<div class="content-ad"></div>

일반적으로 사용되는 이몽다는 서로 다른 유형과 함께 작업하는 코드를 작성할 수 있게 합니다. 클래스 멤버, 메소드 매개변수 및 함수 반환값에 유용합니다.

```js
// 일반적인 예시
class Queue<T> {
 private data: T[] = [];
 push = (item: T) => this.data.push(item);
 pop = (): T | undefined => this.data.shift();
}
// 숫자 유형으로 사용
const queue = new Queue<number>();
queue.push(0);
queue.push(1);
// 문자열 유형으로 사용
const strQueue = new Queue<string>();
strQueue.push('0');
strQueue.push('1');
```

타입 단언 🛡️

타입 단언은 개발자가 값을 수동으로 유형으로 지정할 수 있게 해주며 컴파일러에게 어떤 유형이어야 하는지 전달하는 방법을 제공합니다. `대상 유형`, `as T`, `!` (null이 아님 타입 단언)과 같은 다양한 구문 형식은 다양한 시나리오에 맞게 제공됩니다.

<div class="content-ad"></div>

```js
// Type assertions
let value: any = 'hello';
let length: number = (value as string).length; // 'as' 문법 사용
// 대체 문법
let alternativeLength: number = (<string>value).length;
// 'as const' 또는 '!' coercion
let immutableValue = 'hello' as const;
```

# 📘결론

👉 주요 포인트:

- 🌱 적합 대상: TypeScript에 입문하는 사람들 및 준비 중인 사람들.
- 🏗️ 범위: 실무에 기반한 기본 사용법과 기본 지식.
- 🧠 한계: 아키텍처 설계에 대한 심화 분석은 이루어지지 않으며, 열성적인 사람들을 위한 오프라인 소통을 권장합니다.

<div class="content-ad"></div>

💡 TypeScript 능숙도의 장점:

- 🖊️ 코드를 작성할 때 더 나은 결과물이 되는 것뿐만 아니라 더 안전한 코드를 작성할 수 있습니다.
- 🚀 코딩 스킬을 새로운 높이로 끌어올릴 수 있습니다.

👋 마지막으로: 읽어 주셔서 진심으로 감사드립니다! 더 알고 싶고 깊이 파고들고 싶다면 오프라인에서 연락해요. 이 기사가 여러분에게 풍요로운 TypeScript 여행의 시작이 되기를 기대합니다. 즐거운 코딩 되세요! 🚀👩‍💻