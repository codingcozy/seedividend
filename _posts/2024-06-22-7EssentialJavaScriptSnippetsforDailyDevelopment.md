---
title: " 일상 개발에 꼭 필요한 7가지 자바스크립트 코드 스니펫"
description: ""
coverImage: "/assets/img/2024-06-22-7EssentialJavaScriptSnippetsforDailyDevelopment_0.png"
date: 2024-06-22 13:48
ogImage: 
  url: /assets/img/2024-06-22-7EssentialJavaScriptSnippetsforDailyDevelopment_0.png
tag: Tech
originalTitle: "🚀 7 Essential JavaScript Snippets for Daily Development"
link: "https://medium.com/javascript-in-plain-english/7-essential-javascript-snippets-for-daily-development-9fe66c340c35"
---


<img src="/assets/img/2024-06-22-7EssentialJavaScriptSnippetsforDailyDevelopment_0.png" />

우리의 일상적인 개발 루틴에서는 종종 콘텐츠를 복사하거나 URL로부터 특정 매개변수를 가져오는 등 여러 일반적인 JavaScript 코드 스니펫을 사용합니다.

이 코드 스니펫들은 개발의 편의를 위해 고정된 구현을 가지고 있습니다. 오늘은 자주 사용되는 7가지 코드 스니펫을 살펴보겠습니다.

# 1️⃣ 클립보드로 콘텐츠 복사하기

<div class="content-ad"></div>

지정된 DOM 요소에서 내용을 사용자 클립보드로 복사하는 버튼을 사용하는 방법:

```js
const copyToClipboard = (content) => {
  const textarea = document.createElement("textarea");
  textarea.value = content;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("Copy");
  textarea.remove();
}
```

# 2️⃣ URLSearchParams를 사용하여 URL 검색 매개변수 가져 오기

이것은 매우 흔한 작업입니다. 이 작업에 대해 regex에 의존했지만 이제는 더 간단한 접근 방법이 있습니다.

<div class="content-ad"></div>

```js
const getQueryByName = (name) => {
  const query = new URLSearchParams(location.search);
  return decodeURIComponent(query.get(name));
}

// 사용 예시:
// URL: https://sunday.com/?name=fatfish&age=100
const name = getQueryByName('name'); // fatfish
const age = getQueryByName('age'); // 100
const gender = getQueryByName('gender'); // null
```

# 3️⃣ 페이지 상단으로 스무스하게 스크롤

페이지 상단으로 스무스하게 스크롤하는 방법:

```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}
```

<div class="content-ad"></div>

# 4️⃣ 현재 스크롤 위치 가져오기

페이지의 현재 스크롤 위치를 검색합니다:

```js
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

getScrollPosition(); // { x: 0, y: 215 }
```

# 5️⃣ 기기가 안드로이드인지 iOS인지 확인하기

<div class="content-ad"></div>

현재 기기의 운영 체제를 식별하십시오:

```js
function getOSType() {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
  let isIOS = !!u.match(/\(i[^]+( U)? CPU.+Mac OS X/);
  
  if (isIOS) {
    return 0; // iOS
  } else if (isAndroid) {
    return 1; // Android
  } else {
    return 2; // Other
  }
}

getOSType(); // 0은 iOS
```

# 6️⃣ 통화 포맷

숫자를 통화 형식으로 변환하세요:

<div class="content-ad"></div>

```js
const formatMoney = (money) => {
  return money.toLocaleString();
}

console.log(formatMoney(123456789)); // '123,456,789'
console.log(formatMoney(123456789.123)); // '123,456,789.123'
console.log(formatMoney(123)); // '123'
```

# 7️⃣ 전체 화면 모드로 들어가고 나오기

전체 화면으로 들어가고 나오기 함수:

```js
// 전체 화면으로 들어가기
function fullScreen() {
  let el = document.documentElement;
  let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
  if (rfs) {
    rfs.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
    let wscript = new ActiveXObject("WScript.Shell");
    if (wscript != null) {
      wscript.SendKeys("{F11}");
    }
  }
}

// 전체 화면에서 나오기
function exitScreen() {
  let el = document;
  let cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen;
  if (cfs) {
    cfs.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
    let wscript = new ActiveXObject("WScript.Shell");
    if (wscript != null) {
      wscript.SendKeys("{F11}");
    }
  }
}
```

<div class="content-ad"></div>

# 쉽게 말해 🚀

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 추천하고 팔로우하세요 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: CoFeed | Differ
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기