---
title: "12가지 유용한 JavaScript 면접 팁"
description: ""
coverImage: "/assets/img/2024-05-14-12UsefulJavaScriptInterviewTips_0.png"
date: 2024-05-14 16:06
ogImage: 
  url: /assets/img/2024-05-14-12UsefulJavaScriptInterviewTips_0.png
tag: Tech
originalTitle: "12 Useful JavaScript Interview Tips"
link: "https://medium.com/javascript-in-plain-english/12-useful-javascript-interview-tips-c85288284595"
---


제 3 부: 자바스크립트에 대해 반드시 알아야 할 일반 지식 포인트 목록

![자바스크립트에 대해 알아야 할 것들](/assets/img/2024-05-14-12UsefulJavaScriptInterviewTips_0.png)

이 시리즈의 기사에서는 자바스크립트에 대해 반드시 알아야 할 일반 지식 포인트 목록을 정리했습니다. 이는 면접을 볼 때나 매일 개발할 때 큰 자신감을 줄 것입니다.

이전 기사에서는 일반 지식 포인트를 나열했으며 다음 링크를 클릭하여 확인할 수 있습니다.



# 1. 'Set' 객체는 무엇이며 어떻게 작동하나요?

Set 객체를 사용하면 원시 값이든 객체 참조든 어떠한 유형의 고유한 값도 저장할 수 있습니다.

Set 생성자를 사용하여 Set 인스턴스를 만들 수 있습니다.

```js
const set1 = new Set();
const set2 = new Set(["a","b","c","d","d","e"]);
```



Set 인스턴스에 새 값을 추가하려면 add 메서드를 사용할 수 있습니다. add 메서드는 Set 객체를 반환하기 때문에 여러 개의 add 호출을 연결할 수 있습니다. Set 객체에 값이 이미 존재한다면 다시 추가되지 않습니다.

```js
set2.add("f");
set2.add("g").add("h").add("i").add("j").add("k").add("k");
```

특정 값이 Set 인스턴스에 있는지 확인하려면 has 메서드를 사용할 수 있습니다.

```js
set2.has("a") // true
set2.has("z") // true
```



Set 인스턴스의 길이를 얻기 위해 size 속성을 사용할 수 있어요.

```js
set2.size // 10을 반환합니다
```

모든 데이터를 Set에서 제거할 때 clear 메소드를 사용할 수 있어요.

```js
set2.clear();
```



배열에서 중복된 요소를 제거하는 데 Set 객체를 사용할 수 있어요.

```js
const numbers = [1, 2, 3, 4, 5, 6, 6, 7, 8, 8, 5];
const uniqueNums = [...new Set(numbers)]; // [1,2,3,4,5,6,7,8]
```

## 2. 콜백 함수란 무엇인가요?

콜백 함수는 다른 코드의 인자로 전달되어 실행 가능한 코드 조각입니다. 이 함수의 목적은 필요할 때 수신 코드에 의해 편리한 시간에 호출되도록 하는 것입니다.



자바스크립트에서 함수는 객체의 한 유형입니다. 객체처럼 함수도 다른 함수에게 인수로 전달될 수 있습니다. 따라서 다른 함수의 인수로 전달되는 함수는 콜백 함수라고 합니다.

```js
const btnAdd = document.getElementById('btnAdd');

btnAdd.addEventListener('click', function clickCallback(e) {
    // 아무 일도 하지 않음
});
```

이 예시에서는 id가 btnAdd인 요소의 클릭 이벤트를 기다리고 있습니다. 클릭이 발생하면 clickCallback 함수가 실행됩니다. 콜백 함수는 특정 데이터나 이벤트에 기능을 추가합니다.

배열의 reduce, filter, map 메서드는 매개변수로 콜백 함수를 요구합니다. 콜백의 좋은 비유는 누군가에게 전화를 걸어서, 그들이 받지 않으면 메시지를 남기고 전화 받기를 기대하는 것입니다. 누군가에게 전화를 거는 행위나 메시지를 남기는 것이 이벤트나 데이터이며, 콜백은 나중에 발생할 기대되는 작업입니다.



# 3. ES6 모듈이란 무엇인가요?

모듈은 코드베이스를 여러 파일로 분할하여 유지 보수성을 향상시키고 모든 코드를 하나의 큰 파일에 모두 가지고 있지 않도록 해줍니다. ES6 이전에는 두 가지 인기있는 모듈 시스템이 있었습니다.

- CommonJS-Node.js
- AMD (비동기 모듈 정의) - 브라우저

기본적으로 모듈을 사용하는 것은 매우 간단합니다. import는 다른 파일에서 기능이나 여러 기능 또는 값을 검색하는 데 사용되며, export는 파일에서 기능이나 여러 기능 또는 값을 노출하는 데 사용됩니다.



## 내보내기

ES5(CommonJS) 사용

```js
// ES5(CommonJS)를 사용하여 - helpers.js
exports.isNull = function(val) {
  return val === null;
}

exports.isUndefined = function(val) {
  return val === undefined;
}

exports.isNullOrUndefined = function(val) {
  return exports.isNull(val) || exports.isUndefined(val);
}
```

ES6 모듈 사용



```js
// Using ES6 Modules - helpers.js
export function isNull(val){
  return val === null;
}

export function isUndefined(val) {
  return val === undefined;
}
export function isNullOrUndefined(val) {
  return isNull(val) || isUndefined(val);
}
```

다른 파일에서 함수 가져오기

```js
//ES5 (CommonJS) - index.js
const helpers = require('./helpers.js'); // helpers는 객체임
const isNull = helpers.isNull;
const isUndefined = helpers.isUndefined;
const isNullOrUndefined = helpers.isNullOrUndefined;
// 또는 환경이 구조 분해를 지원하는 경우
const { isNull, isUndefined, isNullOrUndefined } = require('./helpers.js');
-------------------------------------------------------
// ES6 Modules - index.js
import * as helpers from './helpers.js'; // helpers는 객체임
// 또는 
import { isNull, isUndefined, isNullOrUndefined as isValid } from './helpers.js';
// "as"를 사용하여 명명된 내보내기 이름 변경
```

파일에서 단일 함수 또는 기본 내보내기 내보내기



ES5 (CommonJS)

```js
// ES5 (CommonJS) - index.js
class Helpers {
  static isNull(val) {
    return val === null;
  }

  static isUndefined(val) {
    return val === undefined;
  }

  static isNullOrUndefined(val) {
    return this.isNull(val) || this.isUndefined(val);
  }
}
module.exports = Helpers;
```

ES6 Modules을 사용하는 예시

```js
// using ES6 Modules - helpers.js
class Helpers {
  static isNull(val) {
    return val === null;
  }

  static isUndefined(val) {
    return val === undefined;
  }

  static isNullOrUndefined(val) {
    return this.isNull(val) || this.isUndefined(val);
  }
}
export default Helpers;
```



다른 파일에서 함수를 한 개 가져오기

ES5(CommonJS)를 사용하는 방법

```js
// ES5(CommonJS) - index.js
const Helpers = require('./helpers.js');
console.log(Helpers.isNull(null));
```

ES6 모듈 사용법



```js
import Helpers from '.helpers.js'
console.log(Helpers.isNull(null));
```

## 4. Promise이 무엇인가요?

Promise은 비동기 프로그래밍의 해결책입니다. 구문적으로 Promise은 비동기 작업의 결과를 얻을 수 있는 객체입니다. 개념적으로 일정 기간이 지난 후 결과를 제공할 것을 약속하는 것을 나타냅니다. Promise에는 세 가지 상태가 있습니다: pending(대기 중), fulfilled(이행됨) 및 rejected(거부됨). 상태가 변경되면 변경된 상태가 유지됩니다. Promise 인스턴스를 생성한 후에는 즉시 실행됩니다.

```js
fs.readFile('somefile.txt', function (e, data) {
  if (e) {
    console.log(e);
  }
  console.log(data);
});
```



만약 콜백 안에 또 다른 비동기 작업이 있다면, 문제가 생길 수 있어요. 코드가 엉망이 되고 가독성이 떨어질 거예요. 이를 '콜백 지옥'이라고 해요.

```js
// 콜백 지옥
fs.readFile('somefile.txt', function (e, data) {
  //여기에 코드 작성
  fs.readdir('directory', function (e, files) {
    //여기에 코드 작성
    fs.mkdir('directory', function (e) {
      //여기에 코드 작성
    })
  })
})
```

이 코드에서 promise를 사용하면 더 읽기 쉽고 이해하기 쉽고 유지보수하기 좋아질 거예요.

```js
promReadFile('file/path')
  .then(data => {
    return promReaddir('directory');
  })
  .then(data => {
    return promMkdir('directory');
  })
  .catch(e => {
    console.log(e);
  })
```  



약속은 세 가지 다른 상태를 가집니다:

- 대기 중(pending): 이니셜 상태로, 충족 또는 거부되기 전의 상태입니다.
- 충족됨(fulfilled): 작업이 성공적으로 완료된 상태입니다.
- 거부됨(rejected): 작업이 실패한 상태입니다.

대기 중인 객체는 충족됨/거부됨 상태를 발생시키며, 해당 상태 처리 메소드에 해결된 값/에러 메시지를 전달합니다. 작업이 성공적으로 완료되면, Promise 객체의 then 메소드가 호출됩니다. 그렇지 않으면 catch 메소드가 트리거됩니다. 예를 들면:

```js
const myFirstPromise = new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve("Success!"); 
    }, 250);
});

myFirstPromise.then((data) => {
    console.log("Yay! " + data);
}).catch((e) => {...});
```



# 5. async/await이란 무엇이며 어떻게 동작합니까?

async/await은 JavaScript에서 비동기 또는 블로킹 코드를 작성하는 새로운 방법입니다. 이는 Promises 위에 구축되어 있으며 비동기 코드의 가독성과 간결성을 높여줍니다.

async/await은 JavaScript에서 비동기 또는 블로킹 코드를 작성하는 새로운 방법입니다. Promises 및 콜백에 비해 높은 가독성과 간결성을 제공합니다. 그러나 이 기능을 사용하기 전에 Promises의 기본을 배우는 것이 필요합니다. 앞에서 언급한 대로 async/await은 Promises 위에 구축되어 있으므로 여전히 내부적으로 Promises를 사용합니다.



```js
기능 callApi() {
  return fetch("url/to/api/endpoint")
    .then(resp => resp.json())
    .then(data => {
      // "data"와 무언가를 처리합니다
    }).catch(err => {
      // "err"과 무언가를 처리합니다
    });
}
```

async/await

async/await에서는 try/catch 구문을 사용하여 예외를 catch합니다.

```js
async function callApi() {
  try {
    const resp = await fetch("url/to/api/endpoint");
    const data = await resp.json();
    // "data"와 무언가를 처리합니다
  } catch (e) {
    // "err"과 무언가를 처리합니다
  }
}
```



참고: 'async' 키워드를 사용하여 함수를 선언하면 암시적으로 Promise가 반환됩니다.

```js
const giveMeOne = async () => 1;

giveMeOne()
  .then((num) => {
    console.log(num); // 1을 출력합니다
  });
```

참고: 'await' 키워드는 오직 async 함수 내에서만 사용할 수 있습니다. 어떤 비동기 함수에서도 'await' 키워드를 사용하면 오류가 발생합니다. 'await' 키워드는 Promise가 반환될 때까지 오른쪽 표현식을 기다린 후 다음 코드 줄을 실행합니다.

```js
const giveMeOne = async () => 1;

function getOne() {
  try {
    const num = await giveMeOne();
    console.log(num);
  } catch (e) {
    console.log(e);
  }
}
// Uncaught SyntaxError: await is only valid in async function
async function getTwo() {
  try {
    const num1 = await giveMeOne(); 
    const num2 = await giveMeOne(); 
    return num1 + num2;
  } catch (e) {
    console.log(e);
  }
}
await getTwo(); // 2
```



# 6. 스프레드 연산자와 나머지 연산자의 차이는 무엇인가요?

스프레드 연산자는 세 개의 점 ...으로 나타내며, 배열을 쉼표로 구분된 인수의 시퀀스로 변환할 수 있습니다. 좀 더 간단히 말하면, 큰 요소를 작은 요소로 나누어주는 것과 같습니다. 마치 손바닥 타격이 단단한 물체를 분산시키는 것처럼 말이죠.

나머지 연산자도 세 개의 점 ...로 표시되지만, 스프레드 연산자와 비슷해 보일 수 있지만, 배열과 객체의 해체에 사용됩니다. 어느 정도로는 스프레드 연산자의 반대 역할을 합니다. 스프레드 연산자는 배열을 여러 요소로 '펼치는' 반면, 나머지 연산자는 여러 요소를 '수집'하고 그것들을 한 요소로 '압축'합니다.

```js
function add(a, b) {
  return a + b;
};

const nums = [5, 6];
const sum = add(...nums);
console.log(sum);
```



이 예에서는 add 함수를 호출할 때 전개 연산자를 사용하여 nums 배열을 확장했습니다. 따라서 매개변수 a의 값은 5이고, 매개변수 b의 값은 6이므로 합계는 11이 됩니다.

```js
function add(...rest) {
  return rest.reduce((total, current) => total + current);
};

console.log(add(1, 2)); // 3
console.log(add(1, 2, 3, 4, 5)); // 15
```

이 예에서는 임의의 개수의 매개변수를 수용하고 모두 더한 다음 총합을 반환하는 add 함수가 있습니다.

```js
const [first, ...others] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(others); // [2, 3, 4, 5]
```



여기서는 나머지 배열 값을 추출하여 다른 배열에 넣는 데 rest 연산자를 사용합니다. 첫 번째 항목을 제외하고 나머지 값을 모두 가져올 수 있어요.

# 7. 기본 매개변수란?

기본 매개변수는 JavaScript에서 기본 변수를 정의하는 새로운 방법으로, ES6 또는 ECMAScript 2015에서 사용할 수 있어요.

```js
//ES5 버전
function add(a, b) {
  a = a || 0;
  b = b || 0;
  return a + b;
}

//ES6 버전
function add(a = 0, b = 0) {
  return a + b;
}
add(1); // 1을 반환
```



기본 매개변수에서 해체 할당을 사용할 수도 있어요.

```js
function getFirst([first, ...rest] = [0, 1]) {
  return first;
}

getFirst();  // 0
getFirst([10,20,30]);  // 10
function getArr({ nums } = { nums: [1, 2, 3, 4] }){
    return nums;
}
getArr(); // [1, 2, 3, 4]
getArr({nums:[5,4,3,2,1]}); // [5,4,3,2,1]
```

이전에 정의된 매개변수를 나중에 정의된 매개변수보다 먼저 사용할 수도 있어요.

```js
function doSomethingWithValue(value = "Hello World", callback = () => { console.log(value) }) {
  callback();
}
doSomethingWithValue(); //"Hello World"
```



# 8. 래퍼 객체란 무엇인가요?

이제 JavaScript의 데이터 유형을 검토해봅시다. JavaScript 데이터 유형은 기본 유형과 참조 유형으로 나뉩니다.

기본 유형: Undefined, Null, Boolean, Number, String, Symbol, BigInt

참조 유형: Object, Array, Date, RegExp 등. 간단히 말해, 이들은 객체입니다.



참조 유형 중에는 프리미티브 유형에는 없는 메소드와 속성이 있습니다. 그러나 종종 다음과 같은 코드를 만날 수 있습니다:

```js
let name = "maxwell";

console.log(typeof name); // "string"
console.log(name.toUpperCase()); // "MAXWELL"
```

이름 타입은 문자열이며 프리미티브 유형에 속합니다. 따라서 속성이나 메소드가 없습니다. 그러나 이 예제에서 toUpperCase() 메소드를 호출하는 것은 에러를 발생시키지 않고 문자열의 대문자 값을 반환합니다.

그 이유는 프리미티브 유형의 값이 일시적으로 객체로 변환되거나 강제 변환되기 때문에, 이름 변수의 동작이 객체와 유사합니다. null과 undefined를 제외한 모든 프리미티브 유형에는 String, Number, Boolean, Symbol 및 BigInt의 래퍼 객체가 있습니다. 이 경우, name.toUpperCase()은 '백그라운드에서' 다음과 같이 보입니다:



```js
console.log(new String(name).toUpperCase()); // "MAXWELL"
```

속성에 접근하거나 메소드를 호출한 후에, 새로 생성된 객체는 즉시 폐기됩니다.

## 9. 암시적 형 변환과 명시적 형 변환의 차이점은 무엇인가요?

암시적 형 변환은 값의 형태를 다른 형태로 자동으로 변환하는 방법으로, 수동 개입 없이 자동으로 처리됩니다.



아래의 예시를 가정해 봅시다.

```js
console.log(1 + '6'); // 16
console.log(false + true); // 1
console.log(6 * '2'); // 12
```

첫 번째 `console.log` 문의 결과는 16입니다. 다른 언어에서는 컴파일 오류가 발생할 수 있지만 JavaScript에서는 1이 문자열로 변환되고 그 후 + 연산자와 연결됩니다. 우리는 아무것도 하지 않았습니다. JavaScript가 자동으로 처리해 주었습니다.

두 번째 `console.log` 문의 결과는 1입니다. JavaScript에서 false는 0으로, true는 1로 변환됩니다. 따라서 결과는 1이 됩니다.



세 번째 console.log 문의 결과는 12입니다. '2'를 숫자로 변환한 다음 6 * 2를 곱하여 12가 되었습니다.

반면에 명시적 타입 강제 변환은 값의 타입을 수동으로 변환해야 하는 경우에 사용하는 방법입니다.

```js
console.log(1 + parseInt('6'));
```

이 예시에서는 parseInt 함수를 사용하여 '6'를 숫자로 변환한 후 + 연산자를 사용하여 1과 6을 더합니다.



# 10. NaN이란 무엇인가요? 그리고 값이 NaN인지 확인하는 방법은 무엇인가요?

NaN은 "숫자가 아님(Not a Number)"을 의미하며, JavaScript에서 숫자 연산이나 변환 결과로 의미있는 숫자 값을 생성하지 못할 때 발생합니다. 따라서 숫자 연산이나 변환에서 숫자가 아닌 값이 나오면 결과값은 NaN이 됩니다.

```js
let a;

console.log(parseInt('abc')); // NaN
console.log(parseInt(null)); // NaN
console.log(parseInt(undefined)); // NaN
console.log(parseInt(++a)); // NaN
console.log(parseInt({} * 10)); // NaN
console.log(parseInt('abc' - 2)); // NaN
console.log(parseInt(0 / 0)); // NaN
console.log(parseInt('10a' * 10)); // NaN
```

JavaScript에는 값이 NaN인지 확인하는 isNaN 메서드가 내장되어 있습니다. 그러나 이 함수는 특이한 동작을 보입니다.



```js
console.log(isNaN()); // true
console.log(isNaN(undefined)); // true
console.log(isNaN({})); // true
console.log(isNaN(String('a'))); // true
console.log(isNaN(() => { })); // true
```

모든 이 console.log 문은 값으로 NaN이 아닌 경우에도 true를 반환합니다.

ES6에서는 값이 NaN인지를 진정으로 확인하는 Number.isNaN 메서드를 사용하는 것이 좋습니다. 또는 JavaScript에서 NaN은 자신과 일치하지 않는 유일한 값이기 때문에 이 문제를 확인하기 위한 사용자 지정 도우미 함수를 만들 수 있습니다.

```js
function checkIfNaN(value) {
  return value !== value;
}
```



# 11. 값이 배열인지 어떻게 판단할 수 있을까요?

Array.isArray 메소드를 사용하여 값이 배열인지 확인할 수 있습니다. 배열이 인수로 전달되면 true를 반환하고, 그렇지 않으면 false를 반환합니다.

```js
console.log(Array.isArray(5));  // false
console.log(Array.isArray("")); // false
console.log(Array.isArray()); // false
console.log(Array.isArray(null)); // false
console.log(Array.isArray({ length: 5 })); // false

console.log(Array.isArray([])); // true
```

이 방법이 지원되지 않는 환경이라면, 폴리필을 구현할 수도 있습니다.



```js
function isArray(value){
 return Object.prototype.toString.call(value) === "[object Array]"
}
```

물론 전통적인 방법도 사용할 수 있어요:

```js
let a = []
if (a instanceof Array) {
  console.log('is an array')
} else {
  console.log('Non-Arrays')
}
```

# 12. 객체에 속성이 존재하는지 확인하는 방법은 무엇인가요?



객체에 특정 속성이 존재하는지 확인하는 세 가지 방법이 있어요.

첫 번째 방법은 in 연산자를 사용하는 것이에요:

```js
const o = { 
  "prop" : "rabbit",
  "prop2" : "tiger"
};

console.log("prop" in o); // true
console.log("prop1" in o); // false
```

두 번째 방법은 hasOwnProperty 메서드를 사용하는 것이에요. hasOwnProperty() 메서드는 객체가 지정된 속성을 직접 속성으로 가지고 있는지 여부를 나타내는 부울 값(true 또는 false)을 반환해줘요.



```js
console.log(o.hasOwnProperty("prop2")); // true
console.log(o.hasOwnProperty("prop1")); // false
```

세 번째 방법은 괄호 표기법 obj['prop']를 사용하는 것입니다. 속성이 존재하면 해당 속성의 값을 반환하고, 그렇지 않으면 undefined를 반환합니다.

```js
console.log(o["prop"]); // "rabbit"
console.log(o["prop1"]); // undefined
```

더 많은 내용은 PlainEnglish.io에서 확인할 수 있습니다.



우리의 무료 주간 소식지 구독하세요. Twitter, LinkedIn, YouTube, Discord를 팔로우해보세요.