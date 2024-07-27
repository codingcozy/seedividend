---
title: "2024년을 향한 새로운 JavaScript 7 기능"
description: ""
coverImage: "/assets/img/2024-05-14-7NEWJavaScript2024Features_0.png"
date: 2024-05-14 12:27
ogImage: 
  url: /assets/img/2024-05-14-7NEWJavaScript2024Features_0.png
tag: Tech
originalTitle: "7 NEW JavaScript 2024 Features"
link: "https://medium.com/@Luna-Rojas/7-new-javascript-2024-features-41557b19db37"
---


<img src="/assets/img/2024-05-14-7NEWJavaScript2024Features_0.png" />

2024년 JavaScript 업데이트는 7가지 주요 기능을 소개합니다.

텍스트와 날짜를 간편하게 처리하는 방법부터 프로그램이 함께 기다리고 작동하는 새로운 방법, 그리고 패턴을 더 쉽게 찾을 수 있도록 도와주는 기능까지 있습니다.

뉴스를 확인해보세요!



# 잘 형성된 유니코드 문자열

잘 형성된 유니코드 문자열은 JavaScript에서 UTF-16 인코딩으로 올바르게 형식화된 문자열을 보장하는 방법을 소개합니다.

이 기능은 JavaScript가 유니코드를 다루는 방식을 개선하여, 문자열 내의 부적절하게 쌍을 이룬 서로 대용 코드 포인트를 감지하고 수정함으로써 다른 언어 및 문자와 작업하기 쉬워지도록 목표로 합니다.

## 사용법 실습



사용자가 생성한 다양한 언어와 기호를 포함할 수 있는 콘텐츠로 작업 중이라고 상상해보세요.

이 콘텐츠가 올바르게 인코딩되어 있는지 확인하는 것은 오류 없이 처리하고 표시하는 데 중요합니다.

- 올바르게 형식이 지정된 유니코드 문자열을 확인하세요: String.prototype.toWellFormed을 사용하여 문자열이 올바르게 인코딩되어 있는지 확인하고 혼자 있는 서로게이트가 있는지 확인합니다.

```js
const exampleString = "Example with Unicode 🌈";
console.log(exampleString.isWellFormed()); // 혼자 있는 서로게이트가 없으면 True
```



- Unicode 문자열을 잘 구성된 문자열로 변환하십시오: String.prototype.toWellFormed를 사용하여 불완전한 서로게이트가 포함된 문자열을 Unicode 대체 문자(U+FFFD)로 대체하여 잘 구성된 문자열로 변환하십시오.

```js
const malformedString = "Example with a lone surrogate \uD800";
console.log(malformedString.toWellFormed()); // "\uD800" 대신 U+FFFD로 대체됩니다
```

이 기능은 국제화 또는 이모지를 다룰 때 특히 유용하며, 다양한 플랫폼 및 환경에서 문자열을 더 신뢰성 있게 처리할 수 있도록 합니다.

이는 웹 애플리케이션에서 흔한 버그 원인을 다루며, JavaScript가 글로벌 콘텐츠를 처리하는 데 더 강력하도록 만듭니다.



# Atomic waitSync

Atomic waitSync는 기존 Atomics API를 보완하는 동기화 기본 요소입니다.

이를 통해 메인 스레드와 워커 간의 더 나은 조정을 가능하게 하는 공유 메모리 위치에서 동기화 대기가 가능하며, 이는 복잡한, 멀티 스레드 웹 애플리케이션에서 중요합니다.

## 동기화 예제



웹 어플리케이션에서 웹 워커에서 중달처리나 실시간 데이터 처리를 수행하는 경우,

주요 스레드와 워커 스레드를 효율적으로 조정하는 것이 성능과 데이터 무결성을 유지하는 데 중요합니다.

```js
// 공유 Int32Array 버퍼를 가정
const sharedBuffer = new SharedArrayBuffer(1024);
const intArray = new Int32Array(sharedBuffer);

// 주요 스레드가 값을 설정함
Atomics.store(intArray, 0, 123);

// 워커 스레드가 값이 변경될 때까지 동기적으로 대기함
Atomics.waitSync(intArray, 0, 123);

// 워커에서 일부 작업을 수행한 후
Atomics.store(intArray, 0, 456); // 공유 메모리 값 변경

// 주요 스레드는 이 변경을 통지받거나 이에 대해 조치를 취할 수 있음
```

원자적인 waitSync는 복잡하고 오류를 유발할 수 있는 메시징이나 폴링 메커니즘을 사용하지 않고 주요 스레드와 웹 워커 간 작업을 동기화하는 더 직관적인 방법을 제공하여 JavaScript의 동시성 모델을 향상시킵니다.



병렬 처리를 필요로 하는 응용 프로그램의 성능과 신뢰성을 크게 향상시킬 수 있습니다.

# RegExp v Flag with Set Notation + Properties of Strings

정규 표현식(RegEx)에서 문자열의 속성과 집합 표기법과 함께 v 플래그를 도입하는 것은 JavaScript의 패턴 매칭 능력을 상당히 향상시킨 것을 의미합니다.

이 기능은 RegEx의 표현력과 강력한 구문을 더욱 간단하게 만들어주며, 복잡한 패턴을 기반으로 텍스트를 매칭하고 교체하는 프로세스를 단순화합니다. 이는 특히 국제화 및 다국어 콘텐츠를 다루는 작업에 매우 유용합니다.



## 고급 검색

v 플래그와 집합 표기법 및 문자열 속성을 결합하면 Unicode 속성에 의해 정의된 특정 문자 집합과 일치시킬 수 있는 정규 표현식을 만들 수 있습니다.

이 개선은 특히 다양한 문자 집합과 다국어 지원이 필요한 응용 프로그램에 유용합니다.

- 화이트스페이스 또는 이모지 일치: v 플래그는 집합 표기법 내에서 Unicode 속성 이스케이프의 사용을 가능하게 하며, 이를 통해 이모지나 화이트스페이스 문자와 같은 광범위한 문자 범주와 정확히 일치시킬 수 있습니다.



```js
const regex = new RegExp("[\\p{Emoji}\\p{White_Space}]", "v");
```

예시 사용법: 이모지와 공백이 모두 포함된 문자열에 대해 정규식을 테스트하면 이러한 문자 유형을 정확하게 식별하는 능력을 확인할 수 있습니다.

```js
const testString = "Here is an emoji 😊 and some spaces";
console.log(testString.match(regex)); // 이모지와 공백이 일치할 것으로 예상됩니다
```

이 RegExp의 개선 사항은 복잡한 문자 집합을 다룰 때 보다 직관적이고 오류 가능성이 낮아져서 다양한 언어와 기호를 수용해야 하는 글로벌 응용 프로그램을 다룰 때 매우 유용합니다.



# 파이프라인 연산자 (|`)

파이프라인 연산자는 JavaScript에서 연산 순서를 더 가독성 있고 기능적으로 작성할 수 있는 방법을 소개합니다.

이를 통해 개발자들은 중첩된 함수 호출보다 직관적이고 깔끔한 방식으로 함수를 연결할 수 있으며, 데이터 처리나 함수형 프로그래밍 환경에서 코드의 가독성과 유지보수성을 향상시킬 수 있습니다.

## 예제



여러 번의 변환을 적용해야 하는 상황을 생각해봅시다. 파이프라인 연산자를 사용하면 각 단계가 명확하게 구분되어 코드를 더 쉽게 따를 수 있어요.

```js
// 파이프라인에 사용될 예시 함수들
const double = n => n * 2;
const increment = n => n + 1;

// 함수들을 적용하기 위해 파이프라인 연산자 사용
let result = 5 |> double |> increment;

console.log(result); // 결과는 11이 출력됩니다.
파이프라인 연산자는 JavaScript 내에서 함수형 프로그래밍 스타일로 가는 중요한 한 발걸음을 의미해요.
```

현대 JavaScript 개발의 가독성과 구성 목표와 잘 맞고, 표현력이 풍부한 구문적 해결책을 제공합니다.

# Temporal API



Temporal API는 JavaScript에서의 날짜 및 시간 조작의 복잡성과 일관성 부재를 해결합니다.

날짜, 시간, 시간대 및 기간 처리를 다루기 위한 다양한 객체 및 메서드를 제공하여 Temporal API는 시간 관련 데이터 처리를 단순화합니다.

이를 통해 Temporal API는 견고하고 표준화된 솔루션으로 제3 자 라이브러리가 필요한 필요성을 대체하고자 합니다.

## Temporal API 사용 예제



날짜와 시간을 다루다 보면, 시간대, 일광 절약 시간 변경 및 형식 지정과 관련된 작업을 해야 합니다.

Temporal API를 사용하면 이러한 작업이 더 간단하고 오류가 적은 방식으로 처리됩니다.

```js
// 특정 시간대에서 날짜-시간 객체 생성
const meetingDate = Temporal.PlainDateTime.from("2024-03-25T15:00:00");
const zonedDate = meetingDate.withTimeZone("America/New_York");

console.log(zonedDate.toString()); // "2024-03-25T15:00:00-04:00[America/New_York]"

// 두 날짜 간의 차이 계산
const startDate = Temporal.PlainDate.from("2024-01-01");
const endDate = Temporal.PlainDate.from("2024-03-01");
const difference = startDate.until(endDate);

console.log(difference.toString()); // "P2M" (2개월간의 기간)
```

이 기능은 기존 Date 객체보다 훨씬 직관적이고 강력한 도구 세트를 제공하여 날짜와 시간 조작의 모든 측면에 대해 개발자들에게 큰 개선을 제공합니다.



JS 애플리케이션에서 시간 데이터를 다룰 때 개발 경험을 크게 향상시킵니다.

# 레코드와 튜플

레코드와 튜플은 JavaScript에서 새롭고 변경할 수 없는 데이터 구조로 제안되어 코드 신뢰성과 간결함을 향상시키려고 합니다.

- 레코드는 한 번 생성되면 변경할 수 없지만 개체와 유사한 변경할 수 없는 키-값 쌍을 만들 수 있습니다.
- 튜플은 생성 후 변경할 수 없는 배열과 유사한 변경할 수 없는 순서가 지정된 목록입니다.



이러한 구조들은 데이터가 예기치 않게 변경되지 않도록 보장해주어 함수형 프로그래밍 및 애플리케이션 상태 관리에 특히 유용합니다.

## 예시

레코드와 튜플이 어떻게 적용될 수 있는지 살펴봅시다. 사용자 프로필 관리 시나리오에서 레코드를 사용하여 애플리케이션의 생명주기 내내 데이터 무결성을 유지하는 방법을 알아봅시다.

레코드를 사용하여 변경할 수 없는 사용자 프로필 만들기:



- 사용자 프로필을 변경할 수 없는 키-값 쌍으로 정의하는 Records를 사용하여 데이터 무결성을 유지합니다. 사용자 프로필을 설정하면 변경할 수 없으므로 데이터의 무결성이 보장됩니다.

```js
const userProfile = #{
  name: "Jane Doe",
  age: 28,
};
```

Tuples를 사용하여 순서가 있는 데이터를 관리하는 방법:

- Tuples를 구현하여 포인트나 좌표와 같은 데이터 시퀀스를 처리합니다. 한 번 초기화되면 수정 실수의 위험이 사라지고 일정합니다.



```js
const points = #[1, 2, 3];
```

또한 애플리케이션 실행 중 데이터 상태에 대해 확신을 제공하여 의도치 않은 변이로 인한 버그를 방지합니다.

특히 복잡한 상태 관리가 필요하거나 함수형 프로그래밍 패턴이 적용된 애플리케이션에서 특히 유용합니다.

ECMAScript 2024에 예정된 이러한 기능은 그뿐만 아니라 JavaScript를 현대화하고 더 강력하게 만들며 개발자 경험을 개선하는 필수적인 단계입니다.



데이터 무결성과 코드 가독성을 모두 고려한 레코드와 튜플, 그리고 향상된 패턴 매칭을 통해 ES15은 개발자들이 더 효율적이고 신뢰할 수 있으며 유지보수가 용이한 애플리케이션을 작성할 수 있는 도구를 제공할 예정입니다.