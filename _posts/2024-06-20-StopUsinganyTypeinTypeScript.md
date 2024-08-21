---
title: "타입스크립트에서 any 타입 사용을 그만하세요"
description: ""
coverImage: "/assets/img/2024-06-20-StopUsinganyTypeinTypeScript_0.png"
date: 2024-06-20 00:22
ogImage:
  url: /assets/img/2024-06-20-StopUsinganyTypeinTypeScript_0.png
tag: Tech
originalTitle: "Stop Using “any” Type in TypeScript"
link: "https://medium.com/bitsrc/stop-using-any-type-in-typescript-48ebefc8b299"
isUpdated: true
---

## 더 나은 TS 타입과 인터페이스가 있습니다. TypeScript에서 "any" 타입을 사용하지 말아야 하는 이유

![이미지](/assets/img/2024-06-20-StopUsinganyTypeinTypeScript_0.png)

TypeScript는 웹 개발자들 사이에서 가장 많이 사용되는 프로그래밍 언어 중 하나입니다. 훌륭한 언어 기능을 갖추고 있어 확장 가능한 애플리케이션을 쉽게 설계할 수 있습니다. 그래서 개발자들은 프로젝트에 JavaScript 대신 TypeScript를 선택하는 경향이 있습니다.

하지만 TypeScript를 사용할 때 지켜야 할 몇 가지 일반적인 실수가 있습니다. 예를 들어, any 타입을 과용하는 것은 우리가 종종하는 일반적인 실수입니다. 간단해 보이지만, any 타입을 과용하면 TypeScript의 기본 원칙을 완전히 어기게 될 수 있습니다.

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

그래서 이 기사에서는 어떤 종류의 남용 문제, 어떤 종류의 대안, 그리고 언제 어떤 종류를 사용해야 하는지, 그리고 사용해서는 안 되는지에 대해 논의할 것입니다.

# TypeScript에서 any Type이란 무엇인가요?

TypeScript에서 변수를 정의할 때 변수의 유형을 명시적으로 알려주어야 합니다. 예를 들어, 데이터 유형으로 문자열을 사용하면 TypeScript는 변수가 문자열 값만 가질 수 있다는 것을 이해합니다. 변수에 다른 유형의 값이 할당되려고 하면 TypeScript가 오류를 표시합니다.

예를 들어, 아래 코드 조각은 'number' 유형이 'string' 유형에 할당할 수 없다는 오류를 표시할 것입니다.

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

```js
let myVariable: string = "";
myVariable = 20;

// error - Type 'number' is not assignable to type 'string'.(2322)
```

<img src="/assets/img/2024-06-20-StopUsinganyTypeinTypeScript_1.png" />

비슷하게, TypeScript에서 제공하는 또 다른 데이터 유형은 `any`입니다. 그러나 `any`는 나머지와 다르게 유니크합니다. `any`를 사용하면 해당 변수에 어떤 값이든 할당할 수 있다는 것을 TypeScript에 알려줍니다. 예를 들어, `any` 유형을 사용하여 변수를 정의하면 숫자, 문자열, 부울 또는 객체를 변수에 오류없이 할당할 수 있습니다.

```js
let myVariable: any = "문자열 값";
console.log("myVariable의 값: " + myVariable);

myVariable = 20;
console.log("myVariable의 값: " + myVariable);

myVariable = false;
console.log("myVariable의 값: " + myVariable);
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

![이미지](/assets/img/2024-06-20-StopUsinganyTypeinTypeScript_2.png)

어떤 사람들은 프로젝트에서 모든 변수를 정의하는 좋은 방법이라고 생각할 수 있습니다. 그러나 any 타입을 사용하는 것에는 상당한 단점이 있으며, TypeScript 프로젝트가 일반적인 JavaScript 프로젝트와 유사해질 수 있습니다. 그래서 TypeScript에서 변수를 정의할 때 any 타입을 사용하지 말아야 하는 이유에 대해 이야기해 봅시다.

# 왜 any 타입을 사용해서는 안 되는가?

타입 체킹은 TypeScript의 가장 중요한 기능 중 하나입니다. 데이터 할당과 타입 변환을 체크함으로써 응용 프로그램에서 예기치 않은 문제를 피하는 데 도움을 줍니다.

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

어떤 유형을 사용하면 변수에 특정 데이터 유형이 없게 되며, 동일한 변수에 여러 유형의 값을 할당할 수 있습니다. 또한, 어떤 유형으로 정의된 변수에 대한 유형 검사를 컴파일러가 수행하지 않습니다. 이로 인해 프로젝트는 일반 자바스크립트 프로젝트처럼 보일 수 있습니다.

그렇다면 TypeScript가 그렇게 좋지 않다면, 왜 `any`라는 데이터 유형을 제공할까요? 어떤 유형이 생명 구원자가 될 수 있는 몇 가지 특정 시나리오가 있습니다. 개발자로서, 그러한 상황을 식별하고 `any` 유형을 적절하게 적용할 수 있어야 합니다.

# 언제 `any` 유형을 사용해야 할까요?

이미 언급했듯이, `any` 유형은 특정 이유로 도입되었습니다. `any` 유형을 반드시 사용해야 하는 가장 일반적이고 중요한 상황 중 일부는 다음과 같습니다.

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

## 1. 마이그레이션 시

`any` 타입은 JavaScript 프로젝트를 TypeScript로 처음 마이그레이션할 때 유용한 옵션입니다. 예를 들어, AngularJS 프로젝트를 새로운 Angular 버전으로 마이그레이션할 때, 아직 마이그레이션되지 않은 변수들의 타입을 처리하기 위해 `any` 타입을 사용할 수 있습니다.

## 2. 서드파티 라이브러리 작업 시

가끔씩 `any` 타입을 사용하는 서드파티 라이브러리를 만날 수 있습니다. 이런 경우에는 해당 라이브러리와 작업하기 위해 프로젝트에서 `any` 타입을 사용해야 합니다. 하지만 가능한 빨리 올바른 타입으로 변환하도록 노력해주세요.

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

## 3. 타입 버그 처리하기

TypeScript 타입 버그를 처리하는 것은 필요한 경우가될 수 있는 또 다른 상황입니다. 다른 해결책을 찾을 수 없는 경우에는 어떤 타입(type)을 사용하여 문제를 해결하고 나중에 적절한 타입으로 변환 할 수 있습니다.

# 대안은 무엇인가요?

앞서 설명했듯이, 어떤 타입(any type)의 주요 목적은 TypeScript를 사용할 때 개발자가 직면할 수있는 일부 특정 시나리오를 다루는 것입니다. 그러나 개발자들은 종종 특정 변수에 대해 특정 타입을 결정할 수 없는 상황에 직면 할 수 있습니다. 따라서, 어떤 타입을 사용하지 않고도 해당 경우에 사용할 수있는 대안적 접근 방식에 대해 논의해 보겠습니다.

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

## 1. Unknown 사용

변수의 유형을 모르는 경우 unknown을 사용하는 것이 가장 좋습니다. any와 달리 unknown은 변수의 유형 안전성을 보장하면서 변수에 여러 유형을 할당할 수 있게 합니다.

예를 들어, 아래와 같이 unknown 유형을 가진 변수를 정의하고 나중에 어떤 유형의 값이든 할당할 수 있습니다:

```js
let myVariable: unknown = "unknown type variable";
console.log("Value of myVariable : " + myVariable);

myVariable = 20;
console.log("Value of myVariable : " + myVariable);

myVariable = false;
console.log("Value of myVariable : " + myVariable);
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

![StopUsinganyTypeinTypeScript_3](/assets/img/2024-06-20-StopUsinganyTypeinTypeScript_3.png)

알 수 있듯이, unknown 타입 변수는 any 타입 변수와 동일하게 작동합니다. 그러나 두 변수를 다른 변수에 할당하려고 할 때 any와 unknown 사이에 차이가 있습니다. 변수가 any 타입이면 오류 없이 다른 변수에 할당할 수 있습니다. 그러나 올바른 타입을 가진 변수에 unknown 타입 변수를 할당하려고하면 오류가 발생합니다.

```js
// any type
let myVariable1: any = "any 타입 변수";
console.log("myVariable1의 값: " + myVariable1);

let myVariable2: string = myVariable1;
console.log("myVariable2의 값: " + myVariable2);
```

![StopUsinganyTypeinTypeScript_4](/assets/img/2024-06-20-StopUsinganyTypeinTypeScript_4.png)

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

```js
// 알 수 없는 타입
let myVariable1: unknown = "알 수 없는 타입 변수";
console.log("myVariable1의 값 : " + myVariable1);

let myVariable2: string = myVariable1;
console.log("myVariable2의 값 : " + myVariable2);
```

![2024-06-20-StopUsinganyTypeinTypeScript_5](/assets/img/2024-06-20-StopUsinganyTypeinTypeScript_5.png)

## 2. 인터페이스 사용

객체를 정의할 때도 추가 작업이 필요없기 때문에 개발자들이 어떤 타입을 사용하는 경우가 많습니다. 그러나 TypeScript에서 객체 타입을 다루는 가장 적합한 방법은 인터페이스를 사용하는 것입니다.

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

예를 들어, article이라는 객체를 정의해야 한다고 가정해보세요. 이 객체에는 title, writer, views 라는 두 개의 속성이 필요합니다. 만약 어떠한 형식이라도 사용한다면, 다음과 같이 객체를 쉽게 정의할 수 있습니다:

```js
const article: any = {
  title: "TypeScript",
  writer: "Chameera",
  views: 10000,
};
```

하지만, 이 방식은 타입 안전성이 보장되지 않습니다. 따라서, 먼저 객체를 정의하기 위해 인터페이스를 생성하고 그 인터페이스를 사용해야 합니다.

```js
// 인터페이스
interface Article {
  title: string;
  writer: string;
  views: number;
}

// 객체
const article: Article = {
  title: "TypeScript",
  writer: "Chameera",
  views: 10000,
};
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

그렇지 않으면 아래와 같이 객체를 정의하는 동시에 인터페이스를 생성할 수도 있습니다:

```js
const article: { title: string, writer: string, views: number } = {
  title: "TypeScript",
  writer: "Chameera",
  views: 10000,
};
```

인터페이스와 유사하게 객체 유형을 생성하기 위해 타입 주석을 사용할 수도 있습니다:

```js
type Article {
    title: string;
    writer: string;
    views: number;
}

const article: Article = {
    title: 'TypeScript',
    writer: 'Chameera',
    views: 10000
}
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

알 수 없는 타입 및 인터페이스를 사용하는 것은 any 타입 대신 사용할 수 있는 최상의 대안입니다. 이 두 가지 방법은 타입 안전하며 TypeScript의 장점이 유지되도록 보장합니다.

# 결론

any는 TypeScript에서 사용할 수 있는 고유한 데이터 타입입니다. JavaScript에서 TypeScript로의 이주와 같은 특수한 시나리오를 처리하기 위해 도입되었습니다. 그러나 any 타입을 사용하기 전에는 항상 두 번 생각해야 합니다. 왜냐하면 any 타입은 변수 및 개체에 대한 타입 확인을 비활성화하기 때문입니다.

본 문서는 any 타입을 사용해야 할 때와 그렇지 않을 때를 예제를 통해 설명하였습니다. 이를 통해 TypeScript 프로젝트를 더 나은 방향으로 이끌 수 있기를 바랍니다. 읽어 주셔서 감사합니다!

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

# 레고처럼 재사용 가능한 구성 요소로 앱을 만들어보세요

![이미지](/assets/img/2024-06-20-StopUsinganyTypeinTypeScript_6.png)

Bit의 오픈 소스 도구는 25만 명 이상의 개발자들이 구성 요소를 사용하여 앱을 만드는 데 도와줍니다.

어떤 UI, 기능 또는 페이지든지 재사용 가능한 구성 요소로 변환하고 여러 애플리케이션 간에 공유하세요. 협업과 빠른 개발이 쉬워집니다.

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

➡️ 더 알아보기

앱을 컴포넌트로 분할하여 앱 개발을 쉽게하고 싶나요? 원하는 작업 흐름에 최적의 경험을 누릴 수 있습니다:

## ➡️ 마이크로 프론트엔드

## ➡️ 디자인 시스템

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

## → 코드 공유 및 재사용

## → Monorepo

# 자세히 알아보기
