---
title: "JavaScript에서 현재 시간을 가져오는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-HowtoGetCurrentTimeinJavaScript_0.png"
date: 2024-06-20 07:24
ogImage: 
  url: /assets/img/2024-06-20-HowtoGetCurrentTimeinJavaScript_0.png
tag: Tech
originalTitle: "How to Get Current Time in JavaScript"
link: "https://medium.com/@frontendinterviewquestions/how-to-get-current-time-in-javascript-a7cdb04cd220"
---


`img` 태그를 Markdown 형식으로 변경해주세요.

![How to Get Current Time in JavaScript](/assets/img/2024-06-20-HowtoGetCurrentTimeinJavaScript_0.png)

이미지 출처: How to Get Current Time in JavaScript

이 글은 JavaScript를 사용하여 현재 시간을 얻는 다양한 방법을 안내합니다.

## 1. `Date` 객체 사용

<div class="content-ad"></div>

JavaScript에서 현재 시간을 가장 직접적으로 얻는 방법은 `Date` 객체를 사용하는 것입니다. `Date` 객체는 플랫폼에 독립적인 형식으로 시간을 나타냅니다.

```js
// 새 Date 객체 생성
let currentDate = new Date();
// 현재 시간 가져오기
let currentTime = currentDate.toLocaleTimeString();
console.log("현재 시간은:", currentTime);
```

이 예제에서:
- 우리는 새로운 `Date` 객체 'currentDate'를 생성합니다. 이 객체는 현재 날짜와 시간으로 초기화됩니다.
- `toLocaleTimeString()` 메서드를 사용하여 시간 부분을 로캘에 맞게 포맷합니다.

## 2. `Date` 객체 사용 (UTC)

<div class="content-ad"></div>

현재 시각을 UTC 형식으로 가져오려면:

```js
// 새 Date 객체 생성
let currentDateUTC = new Date();
// 현재 UTC 시간 가져오기
let currentUTCTime = currentDateUTC.toUTCString();
console.log("현재 UTC 시간은:", currentUTCTime);
```

여기서 `toUTCString()`은 날짜를 UTC 형식의 문자열로 변환합니다.

## 3. 시간, 분, 초 표시

<div class="content-ad"></div>

현재 시간, 분, 초를 따로 표시해야 하는 경우:

```js
// 새 Date 객체 생성
let currentTimeDetails = new Date();
// 시간, 분, 초 가져오기
let hours = currentTimeDetails.getHours();
let minutes = currentTimeDetails.getMinutes();
let seconds = currentTimeDetails.getSeconds();
console.log(`현재 시간: ${hours}:${minutes}:${seconds}`);
```

## 4. 외부 라이브러리 사용

또는 Moment.js와 같은 외부 라이브러리를 사용하여 더 고급의 날짜 및 시간 조작이 가능합니다.

<div class="content-ad"></div>

```js
// Moment.js 라이브러리 사용
let now = moment();
console.log("Moment.js를 사용한 현재 시간:", now.format('YYYY-MM-DD HH:mm:ss'));
```

프로젝트에 Moment.js를 포함시키면서 사용하세요.

## 결론

본문에서는 JavaScript에서 현재 시간을 얻는 다양한 방법을 탐색했습니다. 네이티브 `Date` 객체를 선택하거나 Moment.js와 같은 라이브러리를 선호하든, JavaScript는 다양한 요구 사항에 맞는 유연한 솔루션을 제공합니다. 이러한 방법을 이해하면 현재 시간 기능을 웹 애플리케이션에 효과적으로 통합할 수 있습니다.

<div class="content-ad"></div>

프로젝트 요구 사항에 가장 잘 맞는 방법을 선택하는 것을 기억하세요. 단순성, 지역화 및 추가 기능을 고려해 선택하세요. 이러한 예제들을 실험하여 날짜와 시간을 효과적으로 다루는 JavaScript의 능력을 향상시키고 활용해보세요.