---
title: "JS 초보자를 위한 가이드 Part 1  스코프, 클로저, 호이스팅, 모듈 이해하기"
description: ""
coverImage: "/assets/img/2024-06-27-YoudontknowJSPart1UnderstandingScopeClosureHoistingModules_0.png"
date: 2024-06-27 18:16
ogImage: 
  url: /assets/img/2024-06-27-YoudontknowJSPart1UnderstandingScopeClosureHoistingModules_0.png
tag: Tech
originalTitle: "You don’t know JS Part 1 — Understanding Scope , Closure , Hoisting, Modules"
link: "https://medium.com/@venkateshb-03/you-dont-know-js-understanding-scope-closure-hoisting-modules-69c9ced2d62a"
---


![이미지](/assets/img/2024-06-27-YoudontknowJSPart1UnderstandingScopeClosureHoistingModules_0.png)

- Scope: 변수에 대한 접근 가능성을 정의하며, 코드 내에서 어디에서 접근할 수 있는지를 나타냅니다.
- Closure: 실행 범위 외부에서 실행되더라도 어휘적 범위를 기억하는 함수입니다.
- 호이스팅은 JavaScript 메커니즘으로, 변수 및 함수 선언이 코드의 선언 위치와 관계없이 컴파일 단계 중에 해당 범위의 맨 위로 이동됩니다. 이는 변수 및 함수가 선언되기 전에 사용될 수 있다는 것을 의미합니다.

명령형(어떻게, 무엇) 대 선언형(무엇)
명령형 - 작동 방식을 알고 작동 방식을 알 수 있습니다.
선언형 - 작동 방식을 알지 못한 채, 무엇이 동작하는지만 알 수 있습니다. JS 배열 맵 함수와 같은 예시

![이미지](/assets/img/2024-06-27-YoudontknowJSPart1UnderstandingScopeClosureHoistingModules_1.png)

<div class="content-ad"></div>

Scope 이전에 JS에서 변수를 선언하는 방법을 먼저 이해해야 합니다.
let vs var vs const

![이미지](/assets/img/2024-06-27-YoudontknowJSPart1UnderstandingScopeClosureHoistingModules_2.png)

Scope는 변수의 접근 가능성(가시성)을 결정합니다. JavaScript에는 3가지 유형의 scope가 있습니다: ES6(2015) 이전에는 JavaScript에서 전역 Scope 및 함수 Scope만 있었지만, 블록 Scope는 나중에 let과 const로 도입되었습니다.

- 전역 Scope: 어떤 함수 내에서도 선언되지 않은 변수들은 전역 Scope를 갖습니다.
프로그래밍 환경에서 전역 Scope는 모든 다른 Scope에서 볼 수 있는 Scope입니다. 이는 브라우저에서는 window 객체에 연결되고 Node.js에서는 전역(global)에 연결됩니다.

<div class="content-ad"></div>

```js
var globalVar = 10;  
function foo() {     
   console.log(globalVar); // 사용 가능 
   console.log(window.globalVar); // 사용 가능
}  
console.log(globalVar);
console.log(window.globalVar);
foo(); // 출력: 10 10 10 10
```

2. 지역 범위: 함수 내에서 선언된 변수는 지역 범위를 갖습니다.
함수 내에서 선언된 변수를 지역 변수라고 하며 함수 범위에 속합니다. 지역 변수는 함수 내 어디에서든 접근할 수 있습니다 (기능 블록 내).

```js
function foo() {     
   var localVar = 20;    
   if(true){
   var blocklocalVar = 2
    } 
   console.log(localVar); // 사용 가능 
   console.log(blocklocalVar) // var의 함수 범위 때문에 접근 가능
 }  
foo(); 

console.log(localVar);
// 출력: 20 2
// 오류: localVar이(가) 정의되지 않았습니다
```

3. 블록 범위: let과 const는 블록 범위 변수이며, if, for, while 등의 블록을 기준으로 합니다.

<div class="content-ad"></div>

ES6는 JavaScript에 let 및 const라는 두 가지 중요한 새로운 키워드를 소개했습니다. 이 두 키워드는 JavaScript에서 블록 범위를 제공합니다. ' ' 블록 내에서 선언된 변수는 블록 외부에서 액세스할 수 없습니다. 예: If else 블록, for 루프 블록 등

예시 (let을 사용한 블록 스코프):

```js
function example() {
  if (true) {
    let blockVar = '블록 내부에 있어요';
    console.log(blockVar); // 접근 가능
  }
  console.log(blockVar); // 오류: blockVar가 정의되지 않았습니다
}
example();
```

- 예시 (const를 사용한 블록 스코프):

<div class="content-ad"></div>

```js
function example() {
  const PI = 3.14;
  if (true) {
    const blockConst = 'I am inside a block';
    console.log(PI); // Accessible
    console.log(blockConst); // Accessible
  }
  console.log(PI); // Accessible
  console.log(blockConst); // Error: blockConst is not defined
}
example();
```

만약 var를 사용한다면 (함수 스코프)

```js
function example() {
  const PI = 3.14;
  if (true) {
    var blockConst = 'I am inside a block';
    console.log(PI); // Accessible
    console.log(blockConst); // Accessible
  }
  console.log(PI); // Accessible
  console.log(blockConst); // Error: blockConst is not defined
}
example();
3.14
I am inside a block
3.14
undefined
```

```js
function outer() {
  var outerVar = 'I am outer';
  function inner() {
    console.log(outerVar); // Accessible
  }
  inner();
}
outer(); // 출력: I am outer
```

<div class="content-ad"></div>

범위의 예시

1. (let을 사용한 루프 변수 범위): 블록

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 결과: 0
// 결과: 1
// 결과: 2
```

2. var를 사용한 루프 변수 범위: 함수 또는 전역 범위

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 결과: 3
// 결과: 3
// 결과: 3
```

<div class="content-ad"></div>

3. 중첩된 블록 내에서 let으로 재선언: 블록 스코프

```js
function example() {
  let x = 10;
  if (true) {
    let x = 20;
  }
  console.log(x); // 출력: 10
}
example();
```

4. 중첩된 블록 내에서 var로 재선언: 함수 또는 전역 스코프

```js
function example() {
  var x = 10;
  if (true) {
    var x = 20;
  }
  console.log(x); // 출력: 20
}
example();
```

<div class="content-ad"></div>

5. var 및 let을 사용한 호이스팅:

```js
console.log(x); // 결과: undefined
var x = 10;
```

```js
console.log(x); // 오류: 초기화 전에 'x'에 액세스할 수 없음
let x = 10;
```

6. let 및 const를 사용한 블록 스코프:

<div class="content-ad"></div>

```js
function example() {
  if (true) {
    const x = 10;
    console.log(x); // 출력: 10
  }
  console.log(x); // 오류: x가 정의되지 않았습니다
}
example();
```


## 2. 클로저:

- 정의: 클로저는 함수가 다른 곳에서 실행되더라도 주변 변수를 "기억"하는 것을 말합니다.


<div class="content-ad"></div>

```js
function outer() {     
  var outerVar = 'I am outer';      
  function inner() {         
   console.log(outerVar); // outer 함수 외부에서도 호출될 때 접근 가능     
  }      
 return inner; // inner 함수 반환 
}  
var closureFunc = outer(); // outer 실행, inner 반환 
closureFunc(); // 출력: I am outer
```

2. Loop & Closure: 클로저를 사용하는 루프에서 흔히 범하는 함정.

```js
function createFuncArray() {     
var funcArray = [];      
for (var i = 0; i < 5; i++) {         
  funcArray.push(function() {            
  console.log(i); // 항상 5를 출력하며, 0, 1, 2, 3, 4가 아님        
 });    
 }      
return funcArray; 
}  
var myFuncArray = createFuncArray(); 
myFuncArray[0](); // 출력: 5
```

루프 예제의 함정을 피하려면, IIFE(즉시 실행 함수 표현)를 사용하여 각 반복마다 클로저를 생성할 수 있습니다:

<div class="content-ad"></div>

```javascript
function createFuncArray() {
   var funcArray = [];
   for (var i = 0; i < 5; i++) {
       (function(num) {
           funcArray.push(function() {
               console.log(num);
           });
       })(i);
   }
   return funcArray;
}
var myFuncArray = createFuncArray();
myFuncArray[0](); // 출력: 0
```

자바스크립트를 마스터하기 위해서는 스코프와 클로저를 이해하는 것이 기본이 됩니다. 이러한 예제들은 좋은 시작점이 될 것입니다!

3.

```javascript
function makeCounter() {
    var count = 0;

    return function() {
        return ++count;
    };
}

var counter1 = makeCounter();
console.log(counter1()); // 출력: 1
console.log(counter1()); // 출력: 2

var counter2 = makeCounter();
console.log(counter2()); // 출력: 1 (다시 1부터 시작)
```

<div class="content-ad"></div>

이 예제에서:

- makeCounter() 함수는 카운트 변수를 증가시키고 반환하는 내부 함수를 반환합니다.
- makeCounter()가 호출될 때마다, 자체 카운트 변수를 가진 새로운 렉시컬 환경이 생성되며, 이는 외부 스코프에서 숨겨져 있습니다.
- counter1과 counter2가 호출될 때, 각각 자체 독립적인 카운트 변수를 가지며, 각각 자체 상태를 독립적으로 유지합니다.
- 클로저는 내부 함수가 makeCounter() 실행이 끝난 후에도 포함된 스코프의 카운트 변수에 접근할 수 있도록 형성됩니다.

클로저 스코프 체인

모든 클로저에는 세 가지 스코프가 있습니다:

<div class="content-ad"></div>

- 지역 스코프 (자체 스코프)
- 포함 스코프 (블록, 함수 또는 모듈 스코프가 될 수 있음)
- 전역 스코프

```js
// 전역 스코프
const e = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // 외부 함수 스코프
      return function (d) {
        // 지역 스코프
        return a + b + c + d + e;
      };
    };
  };
}
console.log(sum(1)(2)(3)(4)); // 20을 출력합니다.
```

- 호이스팅
호이스팅은 변수와 함수의 값을 초기화/할당하기 전에도 변수와 함수의 값을 추출할 수 있게 해주는 개념으로, 이는 실행 컨텍스트의 첫 번째 단계 (메모리 생성 단계 또는 생성 단계)로 인해 발생합니다.
- JavaScript에서 호이스팅은 기본 동작으로 모든 선언을 코드 실행 전에 해당 범위의 맨 위로 이동시키는 것입니다. 기본적으로 함수와 변수가 선언된 위치와 상관없이 해당 범위의 맨 위로 이동되기 때문에 전역이든 지역이든 상관없이 우리에게 이점을 제공합니다.
- 참고: JavaScript는 선언을 호이스트하지만 초기화는 호이스트하지 않습니다.
- JavaScript는 프로그램에서 정의된 모든 변수와 함수에 대해 실행 전에 메모리를 할당합니다.

1. var로 호이스팅:

<div class="content-ad"></div>

- 예제 1: 변수 선언 호이스팅

```js
console.log(x); // 결과: undefined
var x = 10;
```

- 예제 2: 함수 선언 호이스팅

```js
hoistedFunction(); // 결과: "호이스팅된 함수"
function hoistedFunction() {
  console.log("호이스팅된 함수");
}
```

<div class="content-ad"></div>

2. let으로 호이스팅:

- 예제 3: 변수 선언 호이스팅

```js
console.log(x); // 오류: 초기화 전에 'x'에 액세스할 수 없음
let x = 10;
```

- 예제 4: 함수 선언 호이스팅 없음

<div class="content-ad"></div>

```js
notHoistedFunction(); // 에러: notHoistedFunction이 정의되지 않았습니다.
let notHoistedFunction = function() {
  console.log("호이스팅되지 않은 함수");
}
```

3. const로 호이스팅:

- 예제 5: 변수 선언 호이스팅

```js
console.log(x); // 에러: 초기화 전에 'x'에 접근할 수 없음
const x = 10;
```

<div class="content-ad"></div>

4. 함수 스코프에서 호이스팅:

- 예제 6: 함수 내부의 호이스팅

```js
function example() {
  console.log(innerVar); // 출력: undefined
  var innerVar = '내부 변수';
  console.log(innerVar); // 출력: 내부 변수
}
example();
```

- 예제 7: 블록 내부의 호이스팅 (let 및 const로 호이스팅 없음)

<div class="content-ad"></div>

```js
function example() {
  console.log(innerLetVar); // 오류: 초기화되기 전에 'innerLetVar'에 액세스할 수 없습니다
  let innerLetVar = '내부 let 변수';
  console.log(innerLetVar); // 위의 오류로 이 줄은 실행되지 않습니다
}
example();

5. 중첩된 스코프에서 호이스팅:

- 예제 8: 중첩된 함수에서 호이스팅

function outer() {
  console.log(outerVar); // 결과: 정의되지 않음
  var outerVar = '바깥 변수';
  inner();
  function inner() {
    console.log(outerVar); // 결과: 바깥 변수
  }
}
outer();

<div class="content-ad"></div>

6. 함수 표현식을 이용한 호이스팅:

- 예시 9: 함수 표현식 호이스팅

var myFunc = function() {
  console.log("함수 표현식");
};
myFunc(); // 출력: 함수 표현식

7. 다른 스코프 유형에서의 호이스팅:

<div class="content-ad"></div>

- 예제 10: 전역 범위에서 호이스팅

console.log(globalVar); // 출력: undefined
var globalVar = '전역 변수';
console.log(globalVar); // 출력: 전역 변수

4. ES6 모듈
모듈을 사용하면 코드를 별도의 파일로 캡슐화하고 그들 간에 기능을 import/export할 수 있습니다.

기본 모듈 내보내기:

<div class="content-ad"></div>

// moduleA.js
export function greet() {
  console.log('Hello');
}

// main.js
import { greet } from './moduleA.js';
greet(); // Output: Hello

2. Default Exports:

// moduleB.js
export default function greet() {
  console.log('Hello');
}

<div class="content-ad"></div>

// main.js
import greet from './moduleB.js';
greet(); // 출력: Hello

3. 별칭이 지정된 Named Exports:

// moduleC.js
export { greet as hello };

// main.js
import { hello } from './moduleC.js';
hello(); // 출력: Hello

<div class="content-ad"></div>

4. 여러 값을 내보내기:

// moduleD.js
export function greet() {
  console.log('Hello');
}
export const PI = 3.14;

// main.js
import { greet, PI } from './moduleD.js';
greet(); // 결과: Hello
console.log(PI); // 결과: 3.14

<div class="content-ad"></div>

```
// moduleE.js
export default function greet() {
  console.log('Hello');
}
export const PI = 3.14;



// main.js
import greet, { PI } from './moduleE.js';
greet(); // Output: Hello
console.log(PI); // Output: 3.14


6. Importing All Exports:


// moduleF.js
export function greet() {
  console.log('Hello');
}
export const PI = 3.14;


<div class="content-ad"></div>

```js
// main.js
import * as moduleF from './moduleF.js';
moduleF.greet(); // 출력: Hello
console.log(moduleF.PI); // 출력: 3.14
```

7. 부수 효과용 모듈 가져 오기:

```js
// moduleG.js
console.log('Module G가 로드되었습니다');
```

```js
// main.js
import './moduleG.js'; 
console.log("Main.js 파일이 실행 중입니다")
// 출력: // 먼저 가져온 파일이 먼저 실행되어
Module G가 로드되었습니다
Main.js 파일이 실행 중입니다
```

<div class="content-ad"></div>

8. 다이나믹 Imports:

```javascript
// main.js
const moduleName = './moduleA.js';
import(moduleName).then(module => {
  module.greet(); // 출력: Hello
});
```

9. 모듈 재내보내기:

```javascript
// moduleH.js
export function greet() {
  console.log('Hello');
}
```

<div class="content-ad"></div>

```js
// moduleI.js
export { greet } from './moduleH.js';
// main.js
import { greet } from './moduleI.js';
greet(); // Output: Hello
```

10. Conditional Module Loading:

```js
// main.js
if (condition) {
  import('./moduleA.js').then(module => {
    module.greet(); // Output: Hello
  });
} else {
  import('./moduleB.js').then(module => {
    module.greet(); // Output: Hi
  });
}
```

  `export default` 구문과 일반 `export` 구문은 JavaScript 모듈에서 값을 내보내는데 모두 사용됩니다. 그러나 다른 모듈에서 가져오고 사용하는 방법에는 차이가 있습니다.

<div class="content-ad"></div>

1. export default:

- export default을 사용하면 모듈에서 하나의 값을 내보낼 수 있습니다.
- 기본 내보내기를 가져올 때는 가져온 값에 대해 원하는 이름을 사용할 수 있습니다.
- 기본 내보내기를 가져올 때는 중괄호 '{}'가 필요하지 않습니다.
- 모듈당 기본 내보내기는 하나만 가질 수 있습니다.

예시:

```js
// ModuleA.js
const value = 'Hello';
export default value;
```  

<div class="content-ad"></div>

```js
// ModuleB.js
import myValue from './ModuleA.js';
console.log(myValue); // 출력: Hello
```

2. `export default` 없이 (이름 있는 수출):

- 이름 있는 수출을 사용하면 모듈에서 여러 값을 내보낼 수 있습니다.
- 이름 있는 수출을 가져올 때 내보낸 값과 동일한 이름을 사용해야 합니다.
- 이름 있는 수출을 가져올 때 중괄호 `{}`를 사용해야 합니다.
- 모듈 당 여러 이름 있는 수출을 가질 수 있습니다.

예시:

<div class="content-ad"></div>


// ModuleA.js
export const value1 = 'Hello';
export const value2 = 'World';



// ModuleB.js
import { value1, value2 } from './ModuleA.js';
console.log(value1); // Output: Hello
console.log(value2); // Output: World


요약하면, export default는 모듈에서 단일 값을 지정하지 않고 내보내는 데 사용되며, named exports는 여러 값을 내보내는 데 사용되며 가져올 때 동일한 이름을 지정해야 합니다. 특정 프로젝트 요구에 따라 유용하게 사용됩니다.

CommonJS와 ES6 모듈을 예제와 함께 비교하여 그 차이를 설명해 보겠습니다:


<div class="content-ad"></div>

1. CommonJS:

- CommonJS는 주로 서버 측 개발을 위해 Node.js에서 사용되는 모듈 시스템입니다. 이는 동기적이며 블로킹 방식으로, 모듈은 런타임에서 동기적으로 로드됩니다.

CommonJS 예제:

```js
// ModuleA.js
const greeting = 'Hello';
function sayHello() {
  console.log(greeting);
}
module.exports = {
  greeting,
  sayHello
};
```

<div class="content-ad"></div>

```js
// ModuleB.js
const moduleA = require('./ModuleA');
moduleA.sayHello(); // Output: Hello
console.log(moduleA.greeting); // Output: Hello
```

2. ES6 Modules:

- ES6 modules are a newer module system introduced in ECMAScript 2015 (ES6). They are asynchronous and support both synchronous and asynchronous module loading.

Example with ES6 Modules:

<div class="content-ad"></div>

```js
// ModuleA.js
const greeting = 'Hello';
export function sayHello() {
  console.log(greeting);
}
export { greeting };
```

```js
// ModuleB.js
import { sayHello, greeting } from './ModuleA.js';
sayHello(); // 출력: Hello
console.log(greeting); // 출력: Hello
```

비교:

동기 vs. 비동기:

<div class="content-ad"></div>

- CommonJS 모듈은 동기적이고 블로킹이며, 실행 시 동기적으로 로드됩니다. 이는 서버 측 프로그래밍과 잘 어울리며, 블로킹 I/O 작업이 일반적인 경우에 적합합니다.
  
- ES6 모듈은 구현에 따라 동기적이거나 비동기적일 수 있습니다. 더 유연하며 서버 측 및 클라이언트 측 환경에서 모두 사용할 수 있습니다.

사용 편의성:

- CommonJS 모듈은 module.exports 및 require()를 사용하여 각각 기능을 내보내고 가져옵니다. 이 구문은 직관적이며 이해하기 쉽습니다.
  
- ES6 모듈은 export 및 import 문을 사용하여 기능을 내보내고 가져옵니다. 이 구문은 더 현대적이고 언어 명세와 일치하지만, 아직 ES6 모듈을 네이티브로 지원하지 않는 환경에서 변환을 위한 추가 도구가 필요할 수 있습니다.

브라우저 호환성:

<div class="content-ad"></div>

- CommonJS 모듈은 브라우저에서 네이티브로 지원되지 않습니다. CommonJS 코드를 브라우저가 이해할 수 있는 형식으로 변환하기 위해 Browserify나 Webpack과 같은 번들러가 필요합니다.
- ES6 모듈은 최신 브라우저에서 지원되며 많은 경우 추가 도구 없이 네이티브로 사용할 수 있습니다. 그러나 오래된 브라우저에서 ES6 모듈을 지원하기 위해서는 Babel과 같은 도구를 사용하여 트랜스 파일링이 필요할 수 있습니다.

서버 측 사용 사례:

- Node.js는 주로 서버 측 프로그래밍에 사용되며, 동기적인 성격과 쉬운 사용성 때문에 CommonJS 모듈이 잘 어울립니다. 런타임에서 모듈을 동기적으로 로드할 수 있으며, 서버는 모듈이 로드된 후에 실행을 계속할 수 있습니다.
- 브라우저 환경에서는 JavaScript 코드가 클라이언트 측에서 실행되며, 응답성을 보장하고 UI 쓰레드를 차단하지 않기 위해 비동기 작업이 선호됩니다. 따라서 웹 개발에서는 비동기적 모듈 로딩을 지원하는 AMD (Asynchronous Module Definition) 또는 ES6 모듈과 같은 다른 모듈 시스템이 일반적으로 사용됩니다.

성능 고려 사항:

<div class="content-ad"></div>

- CommonJS 모듈은 동기적으로 로드되어 브라우저 환경에서 특히 많은 모듈이 있는 대규모 웹 애플리케이션의 성능에 영향을 미칠 수 있습니다. 동기적 모듈 로딩은 페이지 로드 시간이 더 느려지고 응답성이 감소할 수 있습니다.
- 다른 모듈 시스템인 AMD나 ES6 모듈에서 지원하는 비동기 모듈 로딩은 모듈이 병렬로 로드되도록 허용하여 모듈 종속성을 로드하는 데 걸리는 시간을 줄여 성능을 향상시킵니다.

요약하면, CommonJS 모듈은 동기적 특성과 사용 편의성으로 인해 Node.js에서 서버 측 개발에 적합합니다. ES6 모듈은 더 많은 다양성을 제공하며 남종적 및 클라이언트 측 개발에서 점점 더 채택되고 있으며 비동기 모듈 로딩 및 현대적 구문을 지원합니다.