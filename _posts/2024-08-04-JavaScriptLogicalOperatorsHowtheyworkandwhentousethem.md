---
title: "JavaScript 논리 연산자 작동 원리와 사용 시기"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-08-04 19:14
ogImage:
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "JavaScript Logical Operators How they work and when to use them"
link: "https://medium.com/@LearnCodingWithDeepali/javascript-logical-operators-how-they-work-and-when-to-use-them-2505aa493836"
isUpdated: true
---

JavaScript에서 논리 연산자는 코드 흐름을 제어하는 데 중요한 역할을 합니다. 오늘은 && (AND) 및 || (OR) 연산자의 실행을 살펴보겠습니다. 이 두 연산자는 참과 거짓의 변수 값에 의존하여 조건을 평가하고 실행의 다음 단계를 결정합니다. 이 글에서는 이러한 연산자의 실용적인 적용법과 효과적인 사용 방법을 알아보겠습니다.

## 참인 값:

- 0이 아닌 숫자
- 참(True)
- 비어 있지 않거나 null이 아닌 값이 있는 객체

## 거짓인 값:

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

- 0
- 빈 문자열 ('')
- False
- Null
- 정의되지 않음
- NaN

## && 연산자:

- 왼쪽부터 오른쪽으로 읽음
- 처음으로 거짓인 값이 나오면 해당 값을 반환하고, 모든 값이 참이면 마지막 값을 반환함

구문: expression1 && expression2

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
const number = null;

number && false && true;

// output : null
```

여기에 무슨 일이 일어나고 있는지 살펴보겠습니다:

- number는 null이므로 표현식은 null로 시작합니다.
- && 연산자는 첫 번째 피연산자 (null)를 확인하고 거짓 값이라는 것을 알고 나머지 표현식을 평가하지 않고 첫 번째 피연산자를 반환합니다.
- 출력: `null`

또 다른 예시:

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
const number = 1;

number && -1 && true;

// output : true
```

## || 연산자:

- 왼쪽에서 오른쪽으로 읽힙니다.
- 만약 모두 거짓인 경우 마지막 값을 반환하며, 처음으로 만나는 참 값을 반환합니다.

구문: expression1 || expression2

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
// 예시 1
const number = null;

(number || false || 0)

// 출력 :  0
-------------------------------------------------------------------
// 예시 2
const number = 1;

(false || number || 2)

// 출력 : 1
```

첫 번째 예시의 분석:

- `const number = null; (number || false || 0)`
- `number`는 `null`로 거짓 값이므로 OR 연산자가 다음 우항으로 넘어갑니다.
- `false`도 거짓 값이므로 OR 연산자가 다음 우항으로 이동합니다.
- `0` 또한 거짓 값이지만, 더 이상 우항이 없으므로 OR 연산자는 `0`을 반환합니다.
- 출력: `0`

## 실용 예시:

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

인증: 사용자 이름과 비밀번호가 모두 입력되었는지 확인하려면 &&을 사용하세요.

오류 처리: 변수가 null 또는 정의되지 않은 경우 기본값을 제공하려면 ||를 사용하세요.

조건부 렌더링: 특정 조건이 충족될 때만 요소를 렌더링하려면 &&을 사용하세요.

## 단축 평가(Evaluation)

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

양쪽 &&와 || 연산자는 단축 평가 동작을 나타내며, 표현식을 왼쪽에서 오른쪽으로 평가하며 결과가 결정되면 즉시 중지합니다.

각각의 연산자 동작:

1. && 연산자는 ||보다 우선순위가 높으므로 먼저 평가됩니다.

2. &&는 첫 번째 거짓값을 반환하거나 모든 값이 참이면 마지막 값을 반환합니다.

3. ||는 첫 번째 참값을 반환하거나 모든 값이 거짓이면 마지막 값을 반환합니다.

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

## 이해를 테스트해 보세요:

다음 코드 스니펫의 결과를 예측하고 댓글로 공유해보세요. 이것은 코딩 인터뷰에서 자주 다루는 주제입니다!"

실습을 위해 아래 예제를 참고하세요 -

```js
// 아래 콘솔 문의 출력물은 무엇인가요?

console.log(0 || 4 && false)
---------------------------------------------------
console.log (true && false && true || false && true)
-----------------------------------------------------------
const x= null; const y =undefined;
consle.log(x || y || 'Default')
----------------------------------------------------------
const user = { name: 'John', age:20};

Console.log(user.name || 'Unknown');
----------------------------------------------------------
const x = 5;
console.log((x > 10 && x < 3) || (x === 5 && x < 10));
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

#자바스크립트 #면접준비 #코딩지식 #실전문제 #면접경험 #코딩아름다움 #주니어
