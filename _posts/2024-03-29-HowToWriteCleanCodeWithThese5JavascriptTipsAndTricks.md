---
title: "자바스크립트로 깔끔한 코드를 작성하는 5가지 팁과 꿀팁"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How To Write Clean Code With These 5 Javascript Tips And Tricks"
link: "https://medium.com/@ori.holis/how-to-write-clean-code-with-these-5-javascript-tips-and-tricks-c3675914cc4d"
---



<img src="/assets/img/HowToWriteCleanCodeWithThese5JavascriptTipsAndTricks_0.png" />

자바스크립트에는 많은 기능이 있습니다. 매년 새로운 기능들이 추가됩니다. 그래서 우리는 항상 프로그래밍 지식을 향상시켜야 합니다. 이 자바스크립트 팁과 트릭을 탐색하고 적용함으로써 더 짧고 빠르며 간단한 코드를 작성하고, 소프트웨어 개발의 변화무쌍한 세계와 함께 최신 정보를 유지할 수 있습니다.

이 문서에서 언급된 모든 기능들은 ES6 이상에서 소개되었습니다(전개 연산자, 채우기, Intl.DateTimeFormat). 이러한 바로 가기를 통해 깔끔한 자바스크립트 코드를 작성할 수 있으며, 동시에 자바스크립트 최적화를 수행할 수 있습니다.

## 1. 속성별 객체 배열 그룹화

<div class="content-ad"></div>

많은 개발자들이 객체 배열을 속성별로 그룹화된 배열로 변환하는 데 어려움을 겪습니다. 이 기능은 특히 두 배열을 병합할 때 유용합니다. 각 항목을 id로 연결하여 검색할 때, 시간 복잡도는 O(N²)가 됩니다. 그러나 두 배열 중 하나를 맵으로 변환하면 상수 시간복잡도인 O(1)으로 항목에 바로 액세스할 수 있습니다. 이렇게 하면 병합의 복잡성이 O(N)으로 줄어들며, 포인터들 덕분에 메모리 소비도 미미해집니다.

```js
function groupArrayOfObjects(array, property) {
  return array.reduce((map, fruit) => {
    const group = map.get(fruit[property]) || [];
    group.push(fruit);
    map.set(fruit[property], group);
    return map;
  }, new Map());
}
```

## 2. 숫자 내림하기

숫자 내림은 매우 간단합니다. 그러나 긴 산술 연산을 수행할 때 더 간결하게 할 수 있습니다.

<div class="content-ad"></div>

```js
Math.floor(1.245) == ~~1.245;
```

이중 물결표(~~)는 정확히 floor이 아닙니다. 그들은 내림(반내림)을 하지 않고 숫자의 소수 부분을 제거합니다. 두 연산의 결과를 비교하면 동일합니다.

## 3. 날짜 형식 지정

날짜 형식 지정은 꽤 귀찮을 수 있습니다. 많은 라이브러리들이 날짜 형식 지정을 수행합니다. 예를 들어 dateformat가 그 중 하나입니다. dateformat은 가장 널리 사용되고 있습니다. 하지만 유일한 옵션은 아닙니다. 번들 크기를 줄이고 싶을 때 라이브러리 없이 날짜 형식을 지정하고 싶다면 Intl.DateTimeFormat을 선택할 수 있습니다.

<div class="content-ad"></div>

날짜 형식을 변경하는 것은 간단하고 간결하며 직관적입니다. 다양한 옵션 중 선택할 수 있고 현재 언어로 날짜를 표시할 수도 있습니다.

```js
function formatDate(date, locale) {
  const dateFormat = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return dateFormat.format(date);
}
```

## 4. 모든 숫자를 2자리로 형식화하기

날짜를 비교할 때 날짜의 길이는 날짜에 따라 다를 수 있습니다. 이 두 날짜는 연-월-일로 형식화할 때 서로 다른 길이를 가지고 있습니다:

<div class="content-ad"></div>

```js
1. 1. 2024 => 2024년 1월 1일
10.2. 2024 => 2024년 2월 10일
```

이러한 경우에 숫자를 2자리로 채우는 것이 편리합니다. (자바스크립트에서 월은 1부터 시작하는 것이 아니라 0부터 시작한다는 것이 아닙니다.)

```js
function formatDate2Digit(date) {
  const pad = (num) => (num + "").padStart(2, "0");
  return (
    [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join(
      "-"
    ) +
    " " +
    [pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds())].join(
      ":"
    )
  );
}
```

## 5. 배열 복사하기

<div class="content-ad"></div>

로드캐시나 다른 라이브러리를 사용하여 깊은 복사를 하지 않아도 괜찮아요. 자바스크립트에서는 복사하는 것이 이렇게 간단해요. 전개 연산자를 소개한 후에는 한 줄로 복사를 할 수 있어요.

```js
const array = [1, 2, 3, 4, 5];
console.log(...fruits);
```

## 결론

앞으로 도움이 될 수 있는 팁이 있기를 바래요. 저에게는 특히 큰 복잡한 애플리케이션을 작성할 때 특히 유용한데요. 시간을 절약하고 코드의 길이와 번들 크기를 줄이며 라이브러리의 필요성을 해결할 수 있어요.
가장 많은 시간을 절약해 주는 팁이 무엇인가요?

<div class="content-ad"></div>
