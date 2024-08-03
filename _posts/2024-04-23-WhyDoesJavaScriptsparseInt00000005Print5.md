---
title: "10년차 개발자도 모르는 JavaScript에서 parseInt00000005가 5를 출력하는 이유"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Why Does JavaScripts parseInt00000005 Print 5"
link: "https://medium.com/javascript-in-plain-english/why-does-javascripts-parseint-0-0000005-print-5-1d63c8e937c5"
---



<img src="/assets/img/WhyDoesJavaScriptsparseInt00000005Print5_0.png" />

# 서문

요즘 프로젝트를 개발하면서 이상한 문제가 있었어요. parseInt(0.0000005) === 5 😱. 보통은 0이 출력되어야 하는데, 왜 5가 나오죠? 함께 이 문제를 살펴보도록 해요.

# 1. parseInt를 언제 사용하나요?

<div class="content-ad"></div>

먼저, 보통 언제 parseInt를 사용하나요? 대부분 우리는 문자열을 구문 분석하여 해당 정수 부분을 반환하기 위해 사용합니다. 이 질문을 통해 parseInt 메서드를 살펴보겠습니다.

## 2. parseInt에 관한 몇 가지 사항

MDN 문서에 따르면 "parseInt(string, radix) 함수는 문자열 인수를 구문 분석하고 지정된 진수의 정수를 반환합니다 (수치 체계의 진법에서의 기수)."

구문

<div class="content-ad"></div>

```js
parseInt(문자열);
parseInt(문자열, 진법);
```

예시

```js
parseInt("0.5"); // 0
parseInt("0.5"); // 0
parseInt("0.05"); // 0
parseInt("0.005"); // 0
parseInt("0.0005"); // 0
parseInt("0.00005"); // 0
parseInt("0.000005"); // 0
parseInt("015"); // 15
parseInt("015", 8); // 13
parseInt("15px", 10); // 15
```

# 3. parseInt가 숫자를 어떻게 변환하는가?

<div class="content-ad"></div>

parseInt의 첫 번째 매개 변수가 숫자인 경우, 어떻게 구문 분석되나요?

parseInt(0.0000005) === 5가 사실임을 여기에서도 확인할 수 있어요.

## 3.1. 첫 번째 단계? 숫자를 문자열로 변환하세요.

이제 각각의 결과가 무엇인지 확인하기 위해 문자열 기반의 값들을 확인해보세요.

<div class="content-ad"></div>

```js
String(0.5); // => '0.5'
String(0.05); // => '0.05'
String(0.005); // => '0.005'
String(0.0005); // => '0.0005'
String(0.00005); // => '0.00005'
String(0.000005); // => '0.000005'
String(0.0000005); // => '5e-7' 여기에 주의하세요
```

## 3.2. 두 번째 단계는 반올림 작업을 수행하는 것입니다.

사용자 SeyyedKhandon이 스택 오버플로우 응답에서 설명한 대로:

“parseInt(0.0000005)를 사용하면 parseInt(`5e-7`)와 같고 정의에 따라:

<div class="content-ad"></div>

```js
parseInt(0.0000005);
```

```js
parseInt("5e-7"); // 5
```

최종적으로 답은 5만 반환됩니다. 왜냐하면 e가 나오기 전까지 숫자에 해당하는 유일한 문자가 5이기 때문에 나머지인 e-7은 무시됩니다.”

# 4. 부동 소수점 수의 정수 부분을 안전하게 얻는 방법?

<div class="content-ad"></div>

The following Math.floor() function is recommended:

```js
Math.floor(0.5); // => 0
Math.floor(0.05); // => 0
Math.floor(0.005); // => 0
Math.floor(0.0005); // => 0
Math.floor(0.00005); // => 0
Math.floor(0.000005); // => 0
Math.floor(0.0000005); // => 0
```

## 5. 비유를 통해 배우기

그러면, parseInt(99999999999999999999999999)가 1과 같은 이유를 설명해볼 수 있나요?

<div class="content-ad"></div>

# 마침내

읽어 주셔서 감사합니다. 당신을 따르고 더 많은 고품질 글을 읽는 것을 기대합니다.

# 쉽게 이해하기 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

<div class="content-ad"></div>

- 작가를 클릭하고 팔로우해주세요! 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- 더 많은 콘텐츠: PlainEnglish.io
