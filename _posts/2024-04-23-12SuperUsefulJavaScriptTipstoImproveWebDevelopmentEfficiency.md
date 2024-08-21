---
title: "12가지 웹 개발 효율을 높이는 유용한 자바스크립트 팁"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "12 Super Useful JavaScript Tips to Improve Web Development Efficiency"
link: "https://medium.com/javascript-in-plain-english/12-super-useful-javascript-tips-to-improve-web-development-efficiency-5b39511e76f4"
isUpdated: true
---

![이미지](/assets/img/12SuperUsefulJavaScriptTipstoImproveWebDevelopmentEfficiency_0.png)

JavaScript은 매우 유연한 프로그래밍 언어로, 실용적인 방법을 쉽게 구현할 수 있습니다.
본 문서는 프로그래밍 기술을 향상시키고 프로젝트 연구 및 개발 효율성을 향상시킬 수 있는 12가지 매우 유용한 JavaScript 팁을 소개합니다.

🔄1. 대문자 낙타 표기법

"대문자 낙타 표기법"은 프로그래밍에서 사용되는 용어로, 각 단어가 소문자로 시작하는 첫 번째 단어를 제외한 모든 단어가 대문자로 시작하는 복합 단어나 구를 작성하는 방법을 말합니다.

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
기능 camelize (str) {
  리턴 str.replace(/([a-z]+)/g, function (match, group) {
    리턴 group ? group.charAt(0).toUpperCase() + match.slice(1) : ''
   })
}
console.log(camelize('hello world'))//결과: Hello World
```

🔢2. 세 자리 숫자 구분 방법

세 자리 숫자 구분 방법은 숫자 표현식에서 콤마나 공백으로 구분된 세 자리 숫자를 말합니다. 특히 금액을 표현할 때 사용됩니다.

```js
function numFormat(num) {
  return num.replace(/(?!^)(?=(\d{3})+$)/g, ",");
}
console.log(numFormat("123456789")); //결과: 123,456,789
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

🎈3. a&a.b&a.b.c

a&a.b&a.b.c은 객체 속성 값을 안전하게 가져오고 "정의되지 않은 속성을 읽을 수 없습니다" 오류를 피하는 방법입니다.

```js
const a = {};
//프록시 객체 생성
const proxy = new Proxy(a, {
  get(target, propKey, receiver) {
    return Reflect.get(target, propKey, receiver) ?? {};
  },
});
console.log(proxy.b.c); //결과: undefined
```

📱4. 모바일 전화기 유형

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

안녕하세요! 안드로이드 폰, 아이폰 또는 아이패드 종류를 확인하는 데 사용할 수 있어요.

```js
function getBrowserInfo() {
  const userAgent = navigator.userAgent.toLowerCase();

  return {
    isAndroid: Boolean(userAgent.match(/android/gi)),
    isIphone: Boolean(userAgent.match(/iphone|ipod/gi)),
    isIpad: Boolean(userAgent.match(/ipad/gi)),
  };
}
```

🐵5. 폼 요청 시뮬레이션

파일 내보내기 기능을 구현해야 할 때, 폼 제출 방법을 시뮬레이션할 수 있어요.

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
/**
 * @param {*} url 파일 경로
 * @param {*} params
 */
export const exportFunc = (url, params) => {
  const form = document.createElement("form");
  form.style.display = "none";
  form.action = url;
  form.method = "post";
  document.body.appendChild(form);

  for (const key in params) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = params[key];
    form.appendChild(input);
  }
  form.submit();
  form.remove(); // 폼 요소 제거
};
```

🔈6. 모든 브라우저에서 이벤트 바인딩 일관성 유지

```js
function customEventBind(ele, eventType, callBack) {
  if (ele.addEventListener) {
    ele.addEventListener(eventType, callBack, false);
  } else if (window.attachEvent) {
    ele.attachEvent("on" + eventType, callBack);
  } else {
    ele["on" + eventType] = callBack;
  }
}

customEventBind(document, "click", function () {
  console.log("요소가 클릭되었습니다");
});
// 브라우저 페이지를 클릭하면 '요소가 클릭되었습니다'가 출력됩니다.
```

🌟7. 쿠키 설정하기
특정 사이트의 요구 사항에 따라 쿠키를 설정하는 방법을 파악하고 구현해보세요.

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

쿠키는 이름과 해당 값으로 구성되어 있으며, 이름, 값, 도메인 이름, 경로, 만료 시간 및 보안 플래그를 포함합니다.

```js
function setCookie({ key, value, expires, path, domain, secure }) {
  let cookieString = key + "=" + encodeURIComponent(value);

  if (expires) {
    let expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expires * 24 * 60 * 60 * 1000);
    cookieString += "; expires=" + expirationDate.toUTCString();
  }
  if (path) cookieString += "; path=" + path;
  if (domain) cookieString += "; domain=" + domain;
  if (secure) cookieString += "; secure";
  document.cookie = cookieString;
}
```

🌇8. 주요 브라우저 정보 가져오기

```js
function getBrowserInfo() {
  const browserRegex = /(Chrome|Firefox|Safari|Opera|Edge|Trident)[\/ ]?([0-9a-zA-Z.]*)/;
  const browserMatch = userAgent.match(browserRegex);

  let browserName = null;
  let browserVersion = null;
  if (browserMatch !== null) {
    browserName = browserMatch[1];
    browserVersion = browserMatch[2];
  }
  return { browserName, browserVersion };
}
console.log(getBrowserInfo());
//UserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
//결과: { browserName: 'Chrome', browserVersion: '120.0.0.0'}
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

🚀9. 운영 체제 정보 가져오기

```js
function getUserOsInfo() {
  const userAgent = navigator.userAgent;
  const osRegex = /((Windows NT)|(Mac OS X))\s*([\d._]+)/;
  const osMatch = userAgent.match(osRegex);

  let osName = null,
    osVersion = null;
  if (osMatch !== null) {
    osName = osMatch[1].trim();
    osVersion = osMatch[4];
  }
  return {
    osName,
    osVersion,
  };
}
console.log(getUserOsInfo());
//UserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
//Output: { osName: 'Mac OS X', osVersion: '10_15_7'}
```

👍10. 날짜 크기 판단

날짜 형식을 사용할 때 사용자가 선택한 ⏪ 시작 날짜가 ⏩ 종료 날짜보다 이전인지 확인해야 합니다.

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

10월 10일의 시작 날짜는 2023년 12월 9일의 종료 날짜보다 빠릅니다.

11. URL 매개변수

```js
function getQueryStringRegExp(queryName) {
  const url = window.location.href.split("?")[1] || "";
  const reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
  const r = url.match(reg);
  if (r != null) return unescape(decodeURI(r[2]));
  return null;
}
//https://medium.com?name=amelia
console.log(getQueryStringRegExp("name")); // 출력: amelia
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

⛺12. 엑셀 파일 내보내기

```js
import XLSX from "xlsx";

/**
 * headers: 테이블 헤더 정의
 */
function exportExcel(headers, data, fileName = "export.xlsx") {
  const _headers = headers
    .map((item, i) =>
      Object.assign(
        {},
        {
          key: item.key,
          title: item.title,
          position: String.fromCharCode(65 + i) + 1,
        }
      )
    )
    .reduce(
      (prev, next) =>
        Object.assign({}, prev, {
          [next.position]: { key: next.key, v: next.title },
        }),
      {}
    );
  const _data = data
    .map((item, i) =>
      headers.map((key, j) =>
        Object.assign(
          {},
          {
            content: item[key.key],
            position: String.fromCharCode(65 + j) + (i + 2),
          }
        )
      )
    )
    .reduce((prev, next) => prev.concat(next))
    // 워크시트 구조로 변환
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});
  // 헤더와 데이터 병합
  const output = Object.assign({}, _headers, _data);
  // 모든 셀의 위치 가져오기
  const outputPos = Object.keys(output);
  // 범위 계산,["A1",..., "H2"]
  const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;
  // 워크북 객체 생성
  const wb = {
    SheetNames: ["mySheet"],
    Sheets: {
      mySheet: Object.assign({}, output, {
        "!ref": ref,
        "!cols": [
          { wpx: 45 },
          { wpx: 100 },
          { wpx: 200 },
          { wpx: 80 },
          { wpx: 150 },
          { wpx: 100 },
          { wpx: 300 },
          { wpx: 300 },
        ],
      }),
    },
  };
  // 엑셀 내보내기
  XLSX.writeFile(wb, fileName);
}
export default exportExcel;
```

# 마지막으로

위에 소개된 12가지 팁은 프로젝트 개발에서 매우 실용적이고 유용합니다. 자주 활용하시는 저로서 여러분의 프로젝트 개발 과정에 도움이 되기를 바라며, 여러분의 툴 라이브러리 🛠️를 개선하고, 프로그래밍 기술 🚀을 확장하고, 효율성 ⏱️을 향상시켜서 큰 성과를 이루시길 바랍니다.

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

# 친절한 한국어 번역 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 작가를 칭찬하고 팔로우 해주세요 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기
