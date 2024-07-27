---
title: "IT 초보자 시리즈 JavaScript IF ELSE 연습문제 2"
description: ""
coverImage: "/assets/img/2024-05-14-ITBeginnerSeriesJavaScriptIFELSEExercises2_0.png"
date: 2024-05-14 15:44
ogImage: 
  url: /assets/img/2024-05-14-ITBeginnerSeriesJavaScriptIFELSEExercises2_0.png
tag: Tech
originalTitle: "IT Beginner Series: JavaScript IF ELSE Exercises (2)"
link: "https://medium.com/@andrei_diaconu/it-beginner-series-javascript-if-else-exercises-cfc5d65b6f94"
---


![2024-05-14-ITBeginnerSeriesJavaScriptIFELSEExercises2_0.png](/assets/img/2024-05-14-ITBeginnerSeriesJavaScriptIFELSEExercises2_0.png)

## IT 초보자 시리즈 소개

- JavaScript FOR 루프 연습
- SQL 연습

프로그래밍을 배우는 여정에 착수하면서 조건문을 이해하는 것이 중요한 단계입니다. 이러한 문장은 특정 조건에 따라 코드의 흐름을 지시하는 결정 구조를 만들 수 있게 해줍니다. 이 IT 초보자 시리즈에서는 프로그래밍 논리의 핵심인 JavaScript if/else 문에 대해 자세히 살펴보고, 사용법을 효과적으로 이해할 수 있도록 10가지 간단한 연습 문제를 제공할 것입니다.



# 소개

프로그래밍의 영역에서 제어 흐름은 중요합니다. 특정 상황에서 어떤 코드가 실행되어야 하는지 지시할 수 있는 능력이 필요합니다. 여기서 조건문이 필요합니다. JavaScript는 if/else 문을 사용하여 정확히 그 목적을 달성할 수 있는 강력한 도구를 제공합니다. 이 문은 조건에 따라 코드가 선택되도록 해주어 해당 조건이 충족되는지에 따라 특정 코드 블록을 실행할 수 있게 합니다.

# 구문

연습을 시작하기 전에 JavaScript if/else 문의 구문을 익혀봅시다.



```js
if (condition) {
  // 조건이 참인 경우 실행할 코드
} else {
  // 조건이 거짓인 경우 실행할 코드
}
```

조건은 true 또는 false로 평가되는 논리식입니다. 조건이 참이면 첫 번째 블록 내의 코드가 실행됩니다. 조건이 거짓이면 else 블록 내의 코드가 실행됩니다 (해당할 경우).

# 연습문제

이제 if/else 문장을 직접 실습하며 경험을 쌓아보겠습니다. 각 연습문제에는 시나리오, 코드 솔루션 및 기대되는 출력이 제공됩니다.



# 운동 목록

- 주어진 숫자가 양수인지 음수인지를 결정하는 프로그램을 작성하십시오.
- 주어진 숫자가 짝수인지 홀수인지를 확인하는 프로그램을 작성하십시오.
- 두 숫자 중 더 큰 숫자를 결정하는 프로그램을 작성하십시오.
- 숫자 등급을 문자 등급으로 변환하는 프로그램을 작성하십시오 (예: 등급 10은 "A"로 표시).
- 나이에 따라 티켓 가격을 계산하는 프로그램을 작성하십시오. 다음 조건에 따라 나이가 12세 미만인 경우 티켓 가격은 5, 18세 미만인 경우 티켓 가격은 10, 60세 미만인 경우 티켓 가격은 20, 60세 이상인 경우 티켓 가격은 15입니다.
- 윤년인지를 결정하는 프로그램을 작성하십시오.
- 구매 금액에 따라 할인율을 계산하는 프로그램을 작성하십시오. 100 이상의 금액은 20의 할인율이 적용되며, 50 이상의 금액은 10의 할인율이 적용됩니다. 그 이외의 경우 할인율은 0입니다.
- 사용자가 실행 시간에 따라 인사하는 프로그램을 작성하십시오. 실행할 때 시간에 따라 good morning, good afternoon 또는 good evening을 표시하십시오.
- 체질량 지수 (BMI)를 계산하고 분류하는 프로그램을 작성하십시오. BMI 공식은 다음과 같습니다: 체중 / (키 * 키).
- 간단한 숫자 추측 게임을 작성하십시오. 비밀 숫자와 추측 값을 제공하십시오. 이 숫자를 기반으로 그들의 추측이 더 높음, 더 낮음 또는 정확한지에 대한 단서를 제공하십시오.

# 운동 솔루션 — 스포일러 주의, 아래에 솔루션 있음

## 운동 #1 — 숫자가 양수인지 확인하기



시나리오: 주어진 숫자가 양수인지 아닌지를 결정하는 프로그램을 작성해보세요.

해결책:

```js
var number = 5;

if (number > 0) {
  console.log("주어진 숫자는 양수입니다.");
} else {
  console.log("주어진 숫자는 양수가 아닙니다.");
}
```

결과:



```js
숫자는 양수입니다.
```

## 연습 #2 — 짝수 또는 홀수 확인하기

시나리오: 숫자가 짝수인지 홀수인지 확인하는 프로그램을 작성하십시오.

해결책:



```js
var number = 7;
if (number % 2 === 0) {
  console.log("숫자는 짝수입니다.");
} else {
  console.log("숫자는 홀수입니다.");
}
```

Output:

```js
숫자는 홀수입니다.
```

## 연습 문제 #3 — 더 큰 숫자 결정하기



시나리오: 두 숫자 중 큰 값을 결정하는 프로그램을 작성하시오.

해결책:

```js
var num1 = 10;
var num2 = 15;

if (num1 > num2) {
  console.log("num1 is greater.");
} else {
  console.log("num2 is greater.");
}
```

출력:



```js
num2가 더 큽니다.
```

## Exercise #4 — 성적 계산기

시나리오: 숫자 등급을 기반으로 글자 등급을 할당하는 프로그램을 작성하십시오.

해결책:



```js
var score = 85;
var grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}
console.log("Grade: " + grade);
```

Output:

```js
Grade: B
```

## Exercise #5 — 티켓 가격 설정



시나리오: 연령에 따라 티켓 가격을 계산하는 프로그램을 작성합니다.

해결책:

```js
var age = 25;
var ticketPrice;

if (age < 12) {
  ticketPrice = 5;
} else if (age >= 12 && age < 18) {
  ticketPrice = 10;
} else if (age >= 18 && age < 60) {
  ticketPrice = 20;
} else {
  ticketPrice = 15; // 노인 할인
}
console.log("티켓 가격: $" + ticketPrice);
```

출력:



```js
티켓 가격: $20
```

## 연습 #6 — 윤년 판별

시나리오: 주어진 해가 윤년인지 판별하는 프로그램을 작성하십시오.

해결책:



```js
var year = 2024;

if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
  console.log(year + "은 윤년입니다.");
} else {
  console.log(year + "은 윤년이 아닙니다.");
}
```

결과:

```js
2024은 윤년입니다.
```

## 연습 #7 — 쇼핑 할인



시나리오: 구매 금액에 따라 할인을 계산하는 프로그램을 작성해 보세요.

솔루션:

```js
var purchaseAmount = 120;
var discount;

if (purchaseAmount >= 100) {
  discount = 20;
} else if (purchaseAmount >= 50) {
  discount = 10;
} else {
  discount = 0;
}
console.log("Discount: " + discount + "%");
```

출력:



```js
할인: 20%
```

## 연습 #8 — 시간대에 따른 인사

시나리오: 사용자를 시간대에 따라 인사하는 프로그램을 작성하십시오.

해결책:



```js
var currentTime = new Date();
var currentHour = currentTime.getHours();
var greeting;

if (currentHour < 12) {
  greeting = "Good morning!";
} else if (currentHour < 18) {
  greeting = "Good afternoon!";
} else {
  greeting = "Good evening!";
}
console.log(greeting);
```

위 코드를 실행하는 시간대에 따라 출력 결과가 달라집니다:

```js
Good afternoon!
```

## Exercise #9 — BMI Calculator




시나리오: 체질량 지수(BMI)를 계산하고 그에 따라 분류하는 프로그램을 작성해봅시다.

해결책:

```js
var weight = 70; // 킬로그램 단위
var height = 1.75; // 미터 단위
var bmi = weight / (height * height);
var category;

if (bmi < 18.5) {
  category = "저체중";
} else if (bmi < 24.9) {
  category = "정상 체중";
} else if (bmi < 29.9) {
  category = "과체중";
} else {
  category = "비만";
}
console.log("BMI: " + bmi.toFixed(2)); // .toFixed(2)를 사용하여 소수점 둘째 자리까지만 출력
console.log("분류: " + category);
```

출력:



```js
체질량 지수: 22.86
카테고리: 정상 체중
```

## 연습 10 — 숫자 맞히기 게임

시나리오: 간단한 숫자 맞히기 게임을 작성하세요.

해결책:



```js
var secretNumber = 7;
var guess = 5; // 플레이어가 추측한 숫자, 이 값을 변경해보면 조건에 따라 다른 코드 라인이 실행됩니다.
if (guess === secretNumber) {
  console.log("축하합니다! 정답을 맞췄습니다.");
} else if (guess < secretNumber) {
  console.log("숫자를 더 높게 시도해보세요.");
} else {
  console.log("숫자를 더 낮게 시도해보세요.");
}
```

출력 (플레이어의 추측에 따라):

```js
숫자를 더 높게 시도해보세요.
```

# 결론



축하합니다! IT 초보자 시리즈의 JavaScript if/else 연습을 모두 완료했어요. 코드에서 결정을 내리기 위해 조건문을 사용하는 실전 경험을 쌓았습니다. 이 연습을 통해 if/else 문이 어떻게 작동하는지 이해하는 데 튼튼한 기초를 제공했습니다.

행운을 빕니다,
안드레이

## IT 초보자 시리즈에서 더 알아보기

- JavaScript FOR 루프 연습
- SQL 연습