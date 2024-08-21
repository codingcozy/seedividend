---
title: "자바스크립트 데이터 유형"
description: ""
coverImage: "/assets/img/2024-06-20-JavaScriptDataTypes_0.png"
date: 2024-06-20 01:14
ogImage:
  url: /assets/img/2024-06-20-JavaScriptDataTypes_0.png
tag: Tech
originalTitle: "JavaScript Data Types"
link: "https://medium.com/@webdevloper134/javascript-data-types-f6740e75e86b"
isUpdated: true
---

이해하기 쉬워요

## JavaScript는 총 여덟 가지의 다른 데이터 유형을 지원합니다. 일곱 가지의 기본 유형과 하나의 비 기본 유형이 있어요.

이러한 데이터 유형을 이해하는 것은 효율적이고 버그 없는 코드를 작성하는 데 중요해요. 이 블로그에서는 각 데이터 유형에 대해 자세히 살펴볼 거에요.

데이터 유형에 대해 계속 진행하기 전에 JavaScript의 console.log() 메서드에 대해 이야기하고 싶어요.

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

`console.log()`은 웹 콘솔에 메시지를 출력하는 JavaScript의 메서드입니다. 일반적으로는 변수의 값이나 표현식의 결과와 같은 정보를 인쇄하기 위해 디버깅 목적으로 사용되며, 이를 통해 개발자들은 코드의 동작을 검사할 수 있습니다.

```js
console.log("Hello, world!"); // 출력: Hello, world!
console.log(42); // 출력: 42

// 변수 출력
let greeting = "Hello, world!";
console.log(greeting); // 출력: Hello, world!
```

- Number

Number 타입은 정수와 부동 소수점 숫자를 모두 나타냅니다. JavaScript는 두 유형을 구분하지 않습니다.

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
// 정수 값
const age = 21;

// 부동 소수점 값
const temperature = 32.5;
```

2. 문자열

문자열 유형은 텍스트를 형성하는 문자 시퀀스를 나타냅니다.

```js
// 문자열 예시
const name = "제 이름은 요기이고 웹 개발자입니다";
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

3. 불리언

불리언 유형에는 true 또는 false의 두 가지 값만 있습니다. 일반적으로 조건문에서 사용됩니다.

```js
// 불리언 예시

// True 저장
const isAdmin = true;

// False 저장
const isLoggedIn = false;
```

4. 널

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

null 타입은 의도적으로 어떤 객체 값도 없음을 나타냅니다. 기본적으로 변수를 정의하고 그 때 어떤 값을 추가하고 싶지 않을 때, 그리고 나중에도 해당 변수에 값을 추가하고 싶지 않을 때 사용합니다.

```js
// Null의 예시
const dummy = null;
```

5. Undefined

값이 할당되지 않은 변수는 undefined 타입입니다. 기본적으로 변수를 선언했지만 아직 값이 할당되지 않은 상태를 의미합니다.

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
// Undefined 예제
let name;
```

6. BigInt

BigInt을 사용하면 Number 타입이 처리할 수 있는 정수보다 큰 정수를 표현할 수 있습니다.

Number에서 BigInt로 변환하려면 값 뒤에 `n`을 추가하기만 하면 됩니다.

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
// BigInt의 예시
let Money = 54215484215484212n;
```

7. Symbol

Symbol은 고유하고 변경할 수 없는 데이터 유형으로서, 객체 속성의 식별자로 사용할 수 있습니다.

여기서 '변경할 수 없는'이란 한 번 선언된 심볼의 값은 변경할 수 없다는 의미이고, '고유한'이란 동일한 값으로 여러 심볼 변수를 만들더라도 각각 메모리에서 고유하다는 의미입니다.

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
// Symbol 예제
const Variable_one = Symbol("abc");
const Variable_two = Symbol("abc");
```

위 예제를 보면 변수 one과 two가 심볼 데이터 유형의 동일한 값을 가지고 있는 것처럼 보이지만, 두 변수 간에는 어떤 유사성도 없습니다. 두 변수는 서로 다릅니다.

8. 객체

객체는 속성들의 모음이며, JavaScript에서 유일한 원시 데이터 윕입니다.

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

자바스크립트에서는 객체 키가 객체 내의 특정 속성에 대한 고유 식별자로 작용합니다. 이러한 키는 문자열 또는 숫자가 될 수 있습니다.

일반적으로 문자열은 키로 직접 사용되지만, 숫자는 사용될 때 자동으로 문자열로 변환됩니다.

이 유연성을 통해 객체는 자바스크립트 응용 프로그램 내에서 구조화된 데이터의 저장 및 검색을 용이하게 합니다.

```js
// 객체 예제
let obj = {
  name: "yogi parmar",
  age: 21,
  isGood: true,
  storingNull: null,
  undefinedPropertu: undefined,
  1: "one",
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

우리의 다음 블로그에서는 자바스크립트에서 변수의 기초를 탐구할 것이며, 데이터를 저장하는 용기로서의 역할에 중점을 둘 것입니다.
게다가, 변수의 이름 짓는 데 대한 최상의 실천법과 관습에 대해 탐구할 것입니다.
