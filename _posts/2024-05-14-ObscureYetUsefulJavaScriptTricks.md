---
title: "흥미로운 자바스크립트 요령들"
description: ""
coverImage: "/assets/img/2024-05-14-ObscureYetUsefulJavaScriptTricks_0.png"
date: 2024-05-14 13:39
ogImage: 
  url: /assets/img/2024-05-14-ObscureYetUsefulJavaScriptTricks_0.png
tag: Tech
originalTitle: "Obscure Yet Useful JavaScript Tricks"
link: "https://medium.com/javascript-in-plain-english/obscure-yet-useful-javascript-tricks-794d43fa4003"
isUpdated: true
---




<img src="/assets/img/2024-05-14-ObscureYetUsefulJavaScriptTricks_0.png" />

제가 매일 업무 중에 수집한 약간 낯설지만 유용한 JavaScript 트릭 몇 가지를 소개해드릴게요. 이 모든 트릭들은 간결하고 우아한 한 줄짜리 코드들입니다. 이 트릭들이 여러분의 JavaScript 개발에 조금 도움이 될 수 있다고 믿어요.

# 웹

## 현재 페이지 다시 불러오기



```js
const reload = () => location.reload();
reload()
```

## 페이지 맨 위로 이동하기

페이지를 맨 위로 가져와야 하는 경우

```js
const goToTop = () => window.scrollTo(0, 0);

goToTop()
```



## 요소 스크롤링

요소를 부드럽게 스크롤하여 뷰포트의 시작 지점으로 이동하려면

```js
const scrollToTop = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "start" })

scrollToTop(document.body)
```

요소를 부드럽게 스크롤하여 뷰포트의 끝 지점으로 이동하려면



```js
const scrollToBottom = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "end" });
scrollToBottom(document.body);
```

## 현재 브라우저가 인터넷 익스플로러인지 확인하기

```js
const isIE = !!document.documentMode;
```

## 주어진 텍스트에서 HTML 태그 제거하기



단어로 마크업 태그들을 걸러내야 할 때

```js
const stripHtml = (html) => new DOMParser().parseFromString(html, 'text/html').body.textContent || '';

stripHtml('<div>test</div>') // 'test'
```

## 리다이렉트

다른 페이지로 이동할 때.



## 텍스트 붙여넣기

클립보드에 텍스트를 복사해야 할 때

```js
const copy = (text) => navigator.clipboard?.writeText && navigator.clipboard.writeText(text)
copy('당신이 붙여넣어야 할 텍스트')
```



# 기능

## 비동기 함수 확인

함수가 비동기인지 확인하려면

```js
const isAsyncFunction = (v) => Object.prototype.toString.call(v) === '[object AsyncFunction]'

isAsyncFunction(async function () {}); // true
```



# 숫자

## 숫자 자르기

소수점 이후 특정 자릿수를 버릴 때 반올림하지 않고 잘라야 할 때

```js
const toFixed = (n, fixed) => `${n}`.match(new RegExp(`^-?\d+(?:.\d{0,${fixed})?`))[0]

toFixed(10.255, 2) // 10.25
```



## 가장 가까운 수로 반올림

소수점 이후의 특정 자릿수를 버리고 가장 가까운 수로 반올림해야 하는 경우

```js
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)

round(10.255, 2) // 10.26
```

## Zero padding



숫자 'num'을 'len' 자릿수가 될 때까지 앞에 0을 채우고 싶을 때

```js
const replenishZero = (num, len, zero = 0) => num.toString().padStart(len, zero)

replenishZero(8, 2) // 08
```

# 객체

## 잘못된 속성 삭제



객체 내 값이 null 또는 정의되지 않은 속성들을 모두 삭제해야 할 때

```js
const removeNullUndefined = (obj) => Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});

removeNullUndefined({name: '', age: undefined, sex: null}) // { name: '' }
```

## 객체 키-값 쌍 반전

객체의 키-값 쌍을 교환해야 할 때



```js
const invert = (obj) => Object.keys(obj).reduce((res, k) => Object.assign(res, { [obj[k]]: k }), {})

invert({name: 'jack'}) // {jack: 'name'}
```

## 문자열을 객체로 변환하기

'이름: "jack"'과 같은 문자열을 객체로 변환해야할 때는 JSON.parse를 직접 사용하면 오류가 발생할 수 있습니다.

```js
const strParse = (str) => JSON.parse(str.replace(/(\w+)\s*:/g, (_, p1) => `"${p1}":`).replace(/\'/g, "\""))

strParse('{name: "jack"}')
```



# 날짜

## 오늘 날짜인지 확인하기.

```js
const isToday = (date) => date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)
```

## 날짜 변환



날짜를 YYYY-MM-DD 형식으로 변환해야 할 때

```js
const formatYmd = (date) => date.toISOString().slice(0, 10);
formatYmd(new Date())
```

## 두 번째 변환

시간(초)를 hh:mm:ss 형식으로 변환해야 할 때



```js
const formatSeconds = (s) => new Date(s * 1000).toISOString().substr(11, 8)

formatSeconds(200) // 00:03:20
```

## 특정 연도와 월의 첫 번째 날을 가져오기

```js
const getFirstDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), 1);

getFirstDate(new Date('2024/05')) 
```

## 특정 연도와 월의 마지막 날을 가져오기




```js
const getLastDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
getLastDate(new Date('2023/03/04')) 
```

## 특정 연도의 특정 월의 전체 일 수 구하기

```js
const getDaysNum = (year, month) => new Date(year, month, 0).getDate()  
const day = getDaysNum(2024, 2) // 29
```

# 배열



## 배열 생성하기

0부터 99까지의 배열이 필요할 때 아래의 코드를 사용하세요.

```js
// 방법1
const createArr = (n) => Array.from(new Array(n), (v, i) => i)
const arr = createArr(100)
```

```js
// 방법2
const createArr = (n) => new Array(n).fill(0).map((v, i) => i)
createArr(100)
```



## 배열 섞기

배열이 있고 순서를 섞어야 할 때

```js
const randomSort = list => list.sort(() => Math.random() - 0.5)
randomSort([0,1,2,3,4,5,6,7,8,9]) // 무작위 순열 결과
```

## 간단한 배열 중복 제거



배열에서 각 중복 요소의 인스턴스를 하나만 유지해야 할 때

```js
const removeDuplicates = list => [...new Set(list)]
removeDuplicates([0, 0, 2, 4, 5]) // [0,2,4,5]
```

## 배열의 고유한 값 중복 제거

고유한 값에 기반하여 배열에서 중복을 제거합니다.



```js
const duplicateById = list => [...list.reduce((prev, cur) => prev.set(cur.id, cur), new Map()).values()]
duplicateById([{id: 1, name: 'jack'}, {id: 2, name: 'rose'}, {id: 1, name: 'jack'}])
// [{id: 1, name: 'jack'}, {id: 2, name: 'rose'}]
```

## 여러 배열의 교집합

여러 배열의 교집합을 찾아야 할 때

```js
const intersection = (a, ...arr) => [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)))

intersection([1, 2, 3, 4], [2, 3, 4, 7, 8], [1, 3, 4, 9])
// [3, 4]
```



## 최대 값의 인덱스 찾기

배열에서 최대 값의 인덱스를 찾아야 할 때

```js
const indexOfMax = (arr) => arr.reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0);
indexOfMax([1, 3, 9, 7, 5]); // 2
```

## 최소 값의 인덱스 찾기



배열에서 최솟값의 인덱스를 찾아야 할 때

```js
const indexOfMin = (arr) => arr.reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0)
indexOfMin([2, 5, 3, 4, 1, 0, 9]) // 5
```

## 가장 가까운 숫자 값 찾기

배열에서 주어진 숫자에 가장 가까운 값을 찾아야 할 때



```js
const closest = (arr, n) => arr.reduce((prev, curr) => (Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev))
closest([29, 87, 8, 78, 97, 20, 75, 33, 24, 17], 50) // 33
```

## 여러 배열을 압축하기

여러 배열을 하나의 배열로 압축해야 할 때

```js
const zip = (...arr) => Array.from({ length: Math.max(...arr.map((a) => a.length)) }, (_, i) => arr.map((a) => a[i]))
zip([1,2,3,4], ['a', 'b', 'c', 'd'], ['A', 'B', 'C', 'D'])
// [[1, 'a', 'A'], [2, 'b', 'B'], [3, 'c', 'C'], [4, 'd', 'D']]
```



## 행과 열 바꾸기

행과 열을 교환해야 할 때

```js
const transpose = (matrix) => matrix[0].map((col, i) => matrix.map((row) => row[i]));
transpose(
    [              // [
        [1, 2, 3], //      [1, 4, 7],
        [4, 5, 6], //      [2, 5, 8],
        [7, 8, 9], //      [3, 6, 9],
     ]             //  ]
 );
```

# 숫자 변환



## 기수 변환

기수 10에서 n으로 변환하려면 toString(n)을 사용할 수 있어요!

```js
const toDecimal = (num, n = 10) => num.toString(n) 
// 만약 10을 이진수 (기수 2)로 변환해야 한다면
toDecimal(10, 2) // '1010'
```

기수 n에서 기수 10으로 변환하려면 parseInt(num, n)을 사용할 수 있어요!



```js
const toDecimalism = (num, n = 10) => parseInt(num, n)
toDecimalism(1010, 2)
```

# 기타

## 두 객체 비교하기

두 객체를 비교해야 할 때 JavaScript의 등가 연산자는 객체의 주소가 동일한지만 판단할 수 있습니다. 주소가 다를 경우 두 객체의 키-값 쌍이 동일한지 여부를 판단할 수 없습니다.



```js
const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]))
isEqual({name: 'jack'}, {name: 'jack'}) // true
isEqual({name: 'jack'}, {name: 'jack1'}, {name: 'jack'}) // false
```

## 랜덤 색상 생성

랜덤한 색상이 필요할 때

```js
const getRandomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
getRandomColor() // '#4c2fd7'
```



## 컬러 형식 변환

16진수 색상을 RGB로 변환해야 할 때

```js
const hexToRgb = hex => hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`).substring(1).match(/.{2}/g).map((x) => parseInt(x, 16));
hexToRgb('#00ffff'); // [0, 255, 255]
hexToRgb('#0ff'); // [0, 255, 255]
```

## 랜덤 IP 주소 가져오기



IP 주소를 생성할 때 필요한 함수입니다.

```js
const randomIp = () =>
    Array(4)
        .fill(0)
        .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
        .join('.');
```

# UUID

ID를 생성할 때 필요한 함수입니다.



```javascript
const uuid = (a) => (a ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid))
uuid()
```

## 쿠키 가져오기

쿠키를 객체로 변환해야 할 때

```javascript
const getCookie = () => document.cookie
    .split(';')
    .map((item) => item.split('='))
    .reduce((acc, [k, v]) => (acc[k.trim().replace('"', '')] = v) && acc, {})
getCookie()
```



## 강제 대기

일정 시간 동안 기다려야 할 때 setTimeout 함수에 작성하고 싶지 않은 경우, 콜백 지옥을 유발할 수 있습니다.

```js
const sleep = async (t) => new Promise((resolve) => setTimeout(resolve, t));
sleep(2000).then(() => {console.log('time')});
```

# 간단히 말해 🚀



Thank you for being a part of the In Plain English community! Before you go:

- Be sure to clap and follow the writer 👏
- Follow us: X | LinkedIn | YouTube | Discord | Newsletter
- Visit our other platforms: Stackademic | CoFeed | Venture | Cubed
- Tired of blogging platforms that force you to deal with algorithmic content? Try Differ
- More content at PlainEnglish.io