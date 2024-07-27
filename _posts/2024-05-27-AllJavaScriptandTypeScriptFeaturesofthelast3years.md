---
title: "JavaScript와 TypeScript 비교 정리"
description: ""
coverImage: "/assets/img/2024-05-27-AllJavaScriptandTypeScriptFeaturesofthelast3years_0.png"
date: 2024-05-27 18:10
ogImage: 
  url: /assets/img/2024-05-27-AllJavaScriptandTypeScriptFeaturesofthelast3years_0.png
tag: Tech
originalTitle: "All JavaScript and TypeScript Features of the last 3 years"
link: "https://medium.com/better-programming/all-javascript-and-typescript-features-of-the-last-3-years-629c57e73e42"
---



![2024-05-27-AllJavaScriptandTypeScriptFeaturesofthelast3years_0.png](/assets/img/2024-05-27-AllJavaScriptandTypeScriptFeaturesofthelast3years_0.png)

이 기사는 지난 3년 동안 (그리고 그 이전에서도) JavaScript/ECMAScript와 TypeScript에서 발생한 거의 모든 변경 사항을 살펴봅니다.

다음의 기능들 중 일부는 여러분에게 적용되지 않거나 실용적이지 않을 수 있지만, 이러한 언어에 대한 이해를 더 깊게 하고 가능한 기능을 보여주기 위한 것입니다.

많은 TypeScript 기능들을 생략했는데, 그 이유는 "이전과 달리 예상대로 작동하지 않았으나, 지금은 그렇게 됩니다"로 요약할 수 있습니다. 따라서 과거에 작동하지 않았던 것이 있다면, 다시 시도해 보세요.


<div class="content-ad"></div>

- JavaScript / ECMAScript (가장 오래된 것부터)
- TypeScript (가장 오래된 것부터)

# 내용

# ECMAScript

## 과거 (아직도 중요한 이전 소개들)

<div class="content-ad"></div>

- Tagged template literals: 템플릿 리터럴 앞에 함수 이름을 붙이면 함수가 템플릿 리터럴 및 템플릿 값들을 전달받게 됩니다. 이 방법에는 재미있는 활용법이 있습니다.

```js
// 임의의 숫자를 포함한 문자열을 로깅할 때 숫자를 형식화하는 방법을 작성하고 싶다고 가정해 봅시다.
// 그럴 때 태그드 템플릿을 사용할 수 있습니다.
function formatNumbers(strings: TemplateStringsArray, number: number): string {
  return strings[0] + number.toFixed(2) + strings[1];
}
console.log(formatNumbers`This is the value: ${0}, it's important.`); // This is the value: 0.00, it's important.

// 문자열 내의 번역 키를 "번역"하고 싶을 때 (여기서는 소문자로 변경)
function translateKey(key: string): string {
  return key.toLocaleLowerCase();
}
function translate(strings: TemplateStringsArray, ...expressions: string[]): string {
  return strings.reduce((accumulator, currentValue, index) => accumulator + currentValue + translateKey(expressions[index] ?? ''), '');
}
console.log(translate`Hello, this is ${'NAME'} to say ${'MESSAGE'}.`); // Hello, this is name to say message.
```

- Symbols: 객체에 대한 고유 키: Symbol("foo") === Symbol("foo"); // false. 내부적으로 사용됩니다.

```js
const obj: { [index: string]: string } = {};

const symbolA = Symbol('a');
const symbolB = Symbol.for('b');

console.log(symbolA.description); // "a"

obj[symbolA] = 'a';
obj[symbolB] = 'b';
obj['c'] = 'c';
obj.d = 'd';

console.log(obj[symbolA]); // "a"
console.log(obj[symbolB]); // "b"

// 다른 심볼이나 심볼 없이는 키에 액세스할 수 없습니다.
console.log(obj[Symbol('a')]); // undefined
console.log(obj['a']); // undefined

// for ... in을 사용할 때 키가 열거되지 않습니다.
for (const i in obj) {
  console.log(i); // "c", "d"
}
```  

<div class="content-ad"></div>

## ES2020

- Optional chaining: 잠재적으로 정의되지 않은 객체의 값을 (인덱싱을 통해) 액세스하기 위해 부모 객체 이름 뒤에 ?를 사용하여 선택적 연결을 사용할 수 있습니다. 이는 인덱싱 ([...]) 또는 함수 호출에도 사용할 수 있습니다.

```js
// 이전:
// 우리가 정확히 정의된 것인지 확신할 수 없는 객체 변수 (또는 다른 구조)가 있을 때,
// 속성에 쉽게 액세스할 수 없습니다.
const object: { name: string } | undefined = Math.random() > 0.5 ? undefined : { name: 'test' };
const value = object.name; // 타입 오류: 'object' 가 'undefined' 일 수 있습니다.

// 먼저 정의되었는지 확인해야 했지만, 이는 가독성을 해치며 중첩된 객체에 대해 복잡해집니다.
const objectOld: { name: string } | undefined = Math.random() > 0.5 ? undefined : { name: 'test' };
const valueOld = objectOld ? objectOld.name : undefined;

// 새로운 방법:
// 대신 선택적 연결을 사용할 수 있습니다.
const objectNew: { name: string } | undefined = Math.random() > 0.5 ? undefined : { name: 'test' };
const valueNew = objectNew?.name;

// 이것은 인덱싱 및 함수에도 사용할 수 있습니다.
const array: string[] | undefined = Math.random() > 0.5 ? undefined : ['test'];
const item = array?.[0];
const func: (() => string) | undefined = Math.random() > 0.5 ? undefined : () => 'test';
const result = func?.();
```

- 널 병합 연산자 (??): 조건부 할당을 위해 || 연산자를 사용하는 대신 새로운 ?? 연산자를 사용할 수 있습니다. 모든 거짓 값에 적용되는 대신 undefined와 null에만 적용됩니다.

<div class="content-ad"></div>

```js
const value: string | undefined = Math.random() > 0.5 ? undefined : 'test';

// 이전:
// 값이 undefined 또는 null인 경우 다른 값으로 조건적으로 할당하려면 "||" 연산자를 사용할 수 있었습니다.
const anotherValue = value || 'hello';
console.log(anotherValue); // "test" 또는 "hello"

// 이는 참 값 사용 시 잘 작동하지만, 0이나 빈 문자열과 비교할 경우에도 적용됩니다.
const incorrectValue = '' || 'incorrect';
console.log(incorrectValue); // 항상 "incorrect"
const anotherIncorrectValue = 0 || 'incorrect';
console.log(anotherIncorrectValue); // 항상 "incorrect"

// 새로운 방법:
// 이제 nullish 병합 연산자를 사용할 수 있습니다. 이는 오직 undefined와 null 값에만 적용됩니다.
const newValue = value ?? 'hello';
console.log(newValue) // 항상 "hello"

// 이제 falsy 값들이 교체되지 않습니다.
const correctValue = '' ?? 'incorrect';
console.log(correctValue); // 항상 ""
const anotherCorrectValue = 0 ?? 'incorrect';
console.log(anotherCorrectValue); // 항상 0
```

- import(): 변수를 사용하여 런타임에서 동적으로 import ... from ... 처럼 모듈을 가져올 수 있습니다.

```js
let importModule;
if (shouldImport) {
  importModule = await import('./module.mjs');
}
```

- String.matchAll(): 루프를 사용하지 않고 정규 표현식의 여러 일치 항목과 캡처 그룹을 모두 얻을 수 있습니다.


<div class="content-ad"></div>

```js
const stringVar = 'testhello,testagain,';

// 이전:
// 일치 항목만 검색되며 캡처 그룹은 포함되지 않습니다.
console.log(stringVar.match(/test([\w]+?),/g)); // ["testhello,", "testagain,"]

// 캡처 그룹을 포함한 하나의 일치 항목만 검색합니다.
const singleMatch = stringVar.match(/test([\w]+?),/);
if (singleMatch) {
  console.log(singleMatch[0]); // "testhello,"
  console.log(singleMatch[1]); // "hello"
}

// 같은 결과를 얻지만 매우 직관적이지 않습니다 (exec 메서드는 마지막 인덱스를 저장합니다).
// 루프 외부에서 정의되어야 하며 전역으로 선언되어야 하며 (/g) 모드여야 합니다.
const regex = /test([\w]+?),/g;
let execMatch;
while ((execMatch = regex.exec(stringVar)) !== null) {
  console.log(execMatch[0]); // "testhello,", "testagain,"
  console.log(execMatch[1]); // "hello", "again"
}

// 새로운 방법:
// 정규식은 전역 (/g)이어야 합니다. 그렇지 않으면 작동하지 않습니다.
const matchesIterator = stringVar.matchAll(/test([\w]+?),/g);
// 순회해야 하거나 배열(Array.from())로 변환해야 하며 직접 색인화(인덱싱)할 수 없습니다.
for (const match of matchesIterator) {
  console.log(match[0]); // "testhello,", "testagain,"
  console.log(match[1]); // "hello", "again"
}
```

- Promise.allSettled(): Promise.all()과 유사하지만 모든 Promise가 완료될 때까지 기다리며 첫 번째 reject/throw에서 반환하지 않습니다. 모든 오류 처리를 보다 쉽게 할 수 있습니다.

```js
async function success1() {return 'a'}
async function success2() {return 'b'}
async function fail1() {throw 'fail 1'}
async function fail2() {throw 'fail 2'}

// 이전:
console.log(await Promise.all([success1(), success2()])); // ["a", "b"]
// 하지만:
try {
  await Promise.all([success1(), success2(), fail1(), fail2()]);
} catch (e) {
  console.log(e); // "fail 1"
}
// 주의: 하나의 에러만 처리하고 성공 값에 액세스할 수 없습니다.

// 이전 해결 방법 (정말 최적이 아님):
console.log(await Promise.all([ // ["a", "b", undefined, undefined]
  success1().catch(e => { console.log(e); }),
  success2().catch(e => { console.log(e); }),
  fail1().catch(e => { console.log(e); }), // "fail 1"
  fail2().catch(e => { console.log(e); })])); // "fail 2"

// 새로운 방법:
const results = await Promise.allSettled([success1(), success2(), fail1(), fail2()]);
const sucessfulResults = results
  .filter(result => result.status === 'fulfilled')
  .map(result => (result as PromiseFulfilledResult<string>).value);
console.log(sucessfulResults); // ["a", "b"]
results.filter(result => result.status === 'rejected').forEach(error => {
  console.log((error as PromiseRejectedResult).reason); // "fail 1", "fail 2"
});
// 또는:
for (const result of results) {
  if (result.status === 'fulfilled') {
    console.log(result.value); // "a", "b"
  } else if (result.status === 'rejected') {
    console.log(result.reason); // "fail 1", "fail 2"
  }
}
```

- BigInt: 새로운 BigInt 데이터 유형을 사용하여 큰 (정수) 숫자를 정확하게 저장하고 처리할 수 있어 JavaScript가 숫자를 부동 소수점으로 저장하는 것에 의한 오류를 방지할 수 있습니다. BigInt() 생성자를 사용하여 생성할 수 있고(불완전성을 방지하기 위해 문자열을 선호) 또는 숫자 끝에 n을 추가하여 생성할 수 있습니다.
  

<div class="content-ad"></div>


// 이전:
// JavaScript는 숫자를 부동 소수점으로 저장하기 때문에 항상 약간의 부정확성이 있습니다.
// 더 중요한 것은 특정 숫자 이후에 정수 연산에 부정확성이 시작됩니다.
const maxSafeInteger = 9007199254740991;
console.log(maxSafeInteger === Number.MAX_SAFE_INTEGER); // true

// 해당 숫자보다 큰 숫자와 비교하면 부정확성이 발생할 수 있습니다.
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2);

// NEW:
// BigInt 데이터 형식을 사용하면 이론적으로 무한히 큰 (정수) 숫자를 저장하고 조작할 수 있습니다.
// 숫자 끝에 "n"을 추가하거나 BigInt 생성자를 사용하여 사용합니다.
const maxSafeIntegerPreviously = 9007199254740991n;
console.log(maxSafeIntegerPreviously); // 9007199254740991

const anotherWay = BigInt(9007199254740991);
console.log(anotherWay); // 9007199254740991

// 안전한 정수(Number.MAX_SAFE_INTEGER)보다 큰 정수를 전달하면 안됩니다.
const incorrect = BigInt(9007199254740992);
console.log(incorrect); // 9007199254740992
const incorrectAgain = BigInt(9007199254740993);
console.log(incorrectAgain); // 9007199254740992
// 오랜, 동일한 값으로 변환됩니다.

// 대신 문자열을 사용하거나 더 좋은 다른 구문을 사용합니다.
const correct = BigInt('9007199254740993');
console.log(correct); // 9007199254740993
const correctAgain = 9007199254740993n;
console.log(correctAgain); // 9007199254740993

// 16진수, 8진수 및 2진수도 문자열로 전달할 수 있습니다.
const hex = BigInt('0x1fffffffffffff');
console.log(hex); // 9007199254740991
const octal = BigInt('0o377777777777777777');
console.log(octal); // 9007199254740991
const binary = BigInt('0b11111111111111111111111111111111111111111111111111111');
console.log(binary); // 9007199254740991

// 대부분의 산술 연산은 예상대로 작동하지만 다른 연산자도 BigInt 여야합니다. 모든 연산도 BigInt를 반환합니다.
const addition = maxSafeIntegerPreviously + 2n;
console.log(addition); // 9007199254740993

const multiplication = maxSafeIntegerPreviously * 2n;
console.log(multiplication); // 18014398509481982

const subtraction = multiplication - 10n;
console.log(subtraction); // 18014398509481972

const modulo = multiplication % 10n;
console.log(modulo); // 2

const exponentiation = 2n ** 54n;
console.log(exponentiation); // 18014398509481984

const exponentiationAgain = 2n ^ 54n;
console.log(exponentiationAgain); // 18014398509481984

const negative = exponentiation * -1n;
console.log(negative); // -18014398509481984

// BigInt로 인한 정수 나눗셈은 조금 다르게 작동합니다.
const division = multiplication / 2n;
console.log(division); // 9007199254740991
// 나뉠 수 있는 정수에 대해서는 제대로 작동합니다.

// 나누기가 안 되는 숫자에 대해서는 정수 나눗셈(내림)처럼 작동할 것입니다.
const divisionAgain = 5n / 2n;
console.log(divisionAgain); // 2

// 일치하는(엄격한) 비교가 BigInt 숫자에는 적용되지 않습니다.
console.log(0n === 0); // false
console.log(0n == 0); // true

// 그러나 비교는 예상대로 작동합니다.
console.log(1n < 2); // true
console.log(2n > 1); // true
console.log(2 > 2); // false
console.log(2n > 2); // false
console.log(2n >= 2); // true

// 타입은 "bigint"입니다.
console.log(typeof 1n); // "bigint"

// 일반 숫자(부호있는 부호 없는 (음수 없음))로 다시 변환할 수 있습니다.
// 그러나 이는 정확도를 희생합니다. 유효 숫자의 수를 지정할 수 있습니다.

console.log(BigInt.asIntN(0, -2n)); // 0
console.log(BigInt.asIntN(1, -2n)); // 0
console.log(BigInt.asIntN(2, -2n)); // -2
// 보통 더 높은 비트 수를 사용할 것입니다.

// 음수 숫자는 부호가 있는 숫자로 변환될 때 2의 보수로 변환됩니다.
console.log(BigInt.asUintN(8, -2n)); // 254


- globalThis: 환경(브라우저, NodeJS, ...)와 상관없이 전역 컨텍스트에서 변수에 액세스할 수 있습니다. 여전히 권장되지는 않지만 때로는 필요합니다. 브라우저의 최상위 수준에서 this와 유사합니다.


console.log(globalThis.Math); // Math Object


- import.meta: ES-모듈을 사용할 때 현재 모듈 URL import.meta.url을 얻습니다.


<div class="content-ad"></div>

```js
console.log(import.meta.url); // "file://..."
```

- export * as … from …: 쉽게 기본값을 하위 모듈로 다시 내보냅니다.

```js
export * as am from 'another-module'
```

```js
import { am } from 'module'
```

<div class="content-ad"></div>

## ES2021

- String.replaceAll(): 이제 문자열 내에서 부분 문자열의 모든 인스턴스를 대체할 수 있습니다. 더 이상 항상 전역 플래그(/g)를 사용하는 정규 표현식을 사용할 필요가 없습니다.

```js
const testString = 'hello/greetings everyone/everybody';
// 이전:
// 첫 번째 인스턴스만 대체함
console.log(testString.replace('/', '|')); // 'hello|greetings everyone/everybody'

// 대체하기 위해 정규 표현식을 사용해야 했는데, 이는 성능이 좋지 않고 이스케이프가 필요합니다.
// 전역 플래그(/g)를 참고하세요.
console.log(testString.replace(/\//g, '|')); // 'hello|greetings everyone|everybody'

// 새로운 기능:
// replaceAll을 사용하면 더 명확하고 빠릅니다.
console.log(testString.replaceAll('/', '|')); // 'hello|greetings everyone|everybody'
```

- Promise.any(): 프로미스 목록 중 하나의 결과만 필요한 경우, 첫 번째 결과를 반환합니다. 모든 프로미스가 거부될 때만 거부하고 AggregateError를 반환하며, 즉시 거부되는 Promise.race가 아닙니다.

<div class="content-ad"></div>

```js
console.log(await Promise.race([success1(), success2()])); // "a"
// 그러나:
try {
  await Promise.race([fail1(), fail2(), success1(), success2()]);
} catch (e) {
  console.log(e); // "fail 1"
}
// 유의: 하나의 오류만 catch하고 성공 값을 액세스할 수 없습니다.

// 이전 수정 (정말 최적화되지 않음):
console.log(await Promise.race([ // "a"
  fail1().catch(e => { console.log(e); }), // "fail 1"
  fail2().catch(e => { console.log(e); }), // "fail 2"
  success1().catch(e => { console.log(e); }),
  success2().catch(e => { console.log(e); })]));

// 새로운:
console.log(await Promise.any([fail1(), fail2(), success1(), success2()])); // "a"
// 모든 프로미스가 거부될 때만 거부하고 모든 오류를 포함하는 AggregateError를 리턴합니다.
try {
  await Promise.any([fail1(), fail2()]);
} catch (e) {
  console.log(e); // [AggregateError: All promises were rejected]
  console.log(e.errors); // ["fail 1", "fail 2"]
}
```

- Nullish coalescing assignment (??=): 이전에 "nullish"였을 때만 값을 할당합니다 (null 또는 undefined).

```js
let x1 = undefined;
let x2 = 'a';
const getNewValue = () => 'b';

// undefined는 nullish이므로 새 값이 x1에 할당됩니다.
x1 ??= 'b';
console.log(x1) // "b"

// 문자열은 nullish가 아니므로 x2에 새 값이 할당되지 않습니다.
// 또한 참고: getNewValue()가 실행되지 않습니다.
x2 ??= getNewValue();
console.log(x2) // "a"
```

- Logical and assignment (&&=): 이전에 "truthy"였을 때만 값을 할당합니다 (true 또는 true로 변환되는 값).

<div class="content-ad"></div>

```js
let x1 = undefined;
let x2 = 'a';
const getNewValue = () => 'b';

// 지정되지 않은 값인 x1에 새 값이 할당되지 않습니다. 왜냐하면 지정되지 않은 값은 참이 아닙니다.
// 또한 주의: getNewValue()는 실행되지 않습니다.
x1 &&= getNewValue();
console.log(x1) // undefined

// 문자열은 참이므로 새 값이 x2에 할당됩니다.
x2 &&= 'b';
console.log(x2) // "b"
```

- 논리 또는 할당 (||=): 이전에 "거짓"인 경우에만 값이 할당됩니다 (false 또는 false로 변환).

```js
let x1 = undefined;
let x2 = 'a';
const getNewValue = () => 'b';

// x1에 새 값이 할당됩니다. 왜냐하면 지정되지 않은 값은 거짓이기 때문입니다.
x1 ||= 'b';
console.log(x1) // "b"

// x2에 새 값이 할당되지 않습니다. 왜냐하면 문자열은 거짓이 아닙니다.
// 또한 주의: getNewValue()는 실행되지 않습니다.
x2 ||= getNewValue();
console.log(x2) // "a"
```

- WeakRef: 객체가 가비지 수집되는 것을 방지하지 않고 객체에 "약한" 참조를 보유합니다.

<div class="content-ad"></div>

```js
const ref = new WeakRef(element);

// 만약 객체/요소가 여전히 존재하고 쓰레기 수집되지 않았다면 값을 가져옵니다.
const value = ref.deref;
console.log(value); // undefined
// 객체가 더는 존재하지 않는 것 같습니다.
```

- 숫자 리터럴 구분자 (_): 가독성을 위해 숫자를 _로 구분합니다. 이는 기능에 영향을 미치지 않습니다.

```js
const int = 1_000_000_000;
const float = 1_000_000_000.999_999_999;
const max = 9_223_372_036_854_775_807n;
const binary = 0b1011_0101_0101;
const octal = 0o1234_5670;
const hex = 0xD0_E0_F0;
```

## ES2022
  

<div class="content-ad"></div>

- 최상위 대기: await 키워드는 이제 ES 모듈의 최상위 수준에서 사용할 수 있습니다. 이는 래퍼 함수의 필요성을 제거하고 오류 처리를 개선합니다.

```js
async function asyncFuncSuccess() {
  return 'test';
}

async function asyncFuncFail() {
  throw new Error('Test');
}

// 이전:
// 프로미스를 대기하려면 async 함수 내부에서만 가능했습니다.
// await asyncFuncSuccess(); // SyntaxError: await is only valid in async functions
// 따라서 async 함수 내부로 래핑해야 했고 이는 오류 처리와 최상위 동시성을 잃게 했습니다.
try {
  (async () => {
    console.log(await asyncFuncSuccess()); // "test"
    try {
      await asyncFuncFail();
    } catch (e) {
      // 오류 처리를 위해 필요합니다. 그렇지 않으면 오류가 캐치되지 않거나 적절한 추적 없이 너무 늦게 되어버립니다.
      console.error(e); // Error: "Test"
      throw e;
    }
  })();
} catch (e) {
  // 함수가 async여서 절대 호출되지 않거나(적절한 추적이 없거나 너무 늦게) 이유 때문에
  console.error(e);
}

// 비동기 함수가 기다려지지 않았기 때문에 이 프로미스 결과보다 먼저 기록됩니다.
console.log('Hey'); // "Hey"

// 새로운:
// 파일이 ES 모듈이라면(package.json에 설정되었고, exports가 있고, ".mts"로 명명된 경우) 최상위 수준에서 바로 await할 수 있습니다.
console.log(await asyncFuncSuccess()); // "test"
try {
  await asyncFuncFail();
} catch (e) {
  console.error(e); // Error: "Test"
}

// 모든 비동기 호출이 기다려지기 때문에 이 프로미스 결과 뒤에 기록됩니다.
console.log('Hello'); // "Hello"
```

- #private: 클래스 멤버(속성 및 메서드)를 이름이 #로 시작하게하여 비공개로 만듭니다. 따라서 이러한 멤버는 클래스 내부에서만 액세스할 수 있습니다. 삭제되거나 동적으로 할당할 수 없습니다. 잘못된 동작은 JavaScript(하지만 TypeScript가 아닌) 구문 오류를 발생시킵니다. TypeScript 프로젝트에서는 권장되지 않습니다. 대신 기존 private 키워드를 사용하십시오.

```js
class ClassWithPrivateField {
  #privateField;
  #anotherPrivateField = 4;

  constructor() {
    this.#privateField = 42; // 유효
    delete this.#privateField; // 구문 오류
    this.#undeclaredField = 444; // 구문 오류
    console.log(this.#anotherPrivateField); // 4
  }
}

const instance = new ClassWithPrivateField();
instance.#privateField === 42; // 구문 오류
```

<div class="content-ad"></div>

- static 클래스 멤버: 클래스 필드(속성 및 메서드)를 static으로 표시하세요.

```js
class Logger {
  static id = 'Logger1';
  static type = 'GenericLogger';
  static log(message: string | Error) {
    console.log(message);
  }
}

class ErrorLogger extends Logger {
  static type = 'ErrorLogger';
  static qualifiedType;
  static log(e: Error) {
    return super.log(e.toString());
  }
}

console.log(Logger.type); // "GenericLogger"
Logger.log('Test'); // "Test"

// 정적으로만 있는 클래스를 생성하는 것은 무의미하지만 여기선 시연을 위해 수행되었습니다.
const log = new Logger();

ErrorLogger.log(new Error('Test')); // 에러: "Test" (부모 클래스의 생성에 영향을 받지 않음)
console.log(ErrorLogger.type); // "ErrorLogger"
console.log(ErrorLogger.qualifiedType); // undefined
console.log(ErrorLogger.id); // "Logger1"

// log()가 인스턴스 메서드가 아닌 정적 메서드이기 때문에 예외를 발생시킵니다.
console.log(log.log()); // log.log is not a function
```

- 클래스 내의 정적 초기화 블록: 클래스가 초기화될 때 실행되는 블록, 기본적으로 정적 멤버를 초기화하는 "생성자"입니다.

```js
class Test {
  static staticProperty1 = '속성 1';
  static staticProperty2;
  static {
    this.staticProperty2 = '속성 2';
  }
}

console.log(Test.staticProperty1); // "Property 1"
console.log(Test.staticProperty2); // "Property 2"
```

<div class="content-ad"></div>

- 가져오기 어설션 (비표준, V8에서 구현됨): 가져온 항목의 유형을 확인하기 위해 사용할 수 있습니다. `import ... from ... assert ' type: `json` '`로 JSON을 직접 가져오고 구문 분석할 필요 없이 사용할 수 있습니다.

```js
import json from './foo.json' assert { type: 'json' };
console.log(json.answer); // 42
```

- 정규표현식 일치 인덱스: 정규표현식 일치 및 캡처 그룹의 시작 및 끝 인덱스를 가져올 수 있습니다. RegExp.exec(), String.match() 및 String.matchAll()에 대해 작동합니다.

```js
const matchObj = /(test+)(hello+)/d.exec('start-testesthello-stop');

// 이전:
console.log(matchObj?.index);

// 새로운:
if (matchObj) {
  // 전체 일치 항목의 시작 및 끝 인덱스(이전에 시작만 있었음).
  console.log(matchObj.indices[0]); // [9, 18]

  // 캡처 그룹의 시작 및 끝 인덱스.
  console.log(matchObj.indices[1]); // [9, 13]
  console.log(matchObj.indices[2]); // [13, 18]
}
```

<div class="content-ad"></div>

- Negative indexing (.at(-1)): 배열이나 문자열을 인덱싱할 때, at()을 사용하여 뒤에서부터 인덱싱할 수 있습니다. 값 가져오기(arr[arr.length - 1]와 동일)만 가능하며 값을 설정할 수는 없습니다.

```js
console.log([4, 5].at(-1)) // 5

const array = [4, 5];
array.at(-1) = 3; // SyntaxError: Assigning to rvalue
```

- hasOwn: 객체가 어떤 속성을 가지고 있는지 obj.hasOwnProperty()을 사용하는 대신 추천되는 새 방법입니다. 일부 특수한 경우에 더 잘 작동합니다.

```js
const obj = { name: 'test' };

console.log(Object.hasOwn(obj, 'name')); // true
console.log(Object.hasOwn(obj, 'gender')); // false
```

<div class="content-ad"></div>

- 오류 원인: 이제 오류에 대한 선택적 원인을 지정할 수 있습니다. 이는 다시 throw할 때 원래 오류를 지정할 수 있게 합니다.

```js
try {
  try {
    connectToDatabase();
  } catch (err) {
    throw new Error('데이터베이스 연결에 실패했습니다.', { cause: err });
  }
} catch (err) {
  console.log(err.cause); // ReferenceError: connectToDatabase is not defined
}
```

## 미래 (이미 TypeScript 4.9에서 사용 가능)

- Auto-Accessor: 속성을 자동으로 비공개로 만들고 get/set 접근자를 만듭니다.

<div class="content-ad"></div>

```js
class Person {
  accessir name: string;

  constructor(name: string) {
    this.name = name;
    console.log(this.name) // 'test'
  }
}

const person = new Person('test');
```

# TypeScript

## 기초 (추후 소개를 위한 문맥)

- 제네릭: 다른 유형으로 유형을 전달합니다. 이를 통해 유형을 일반화 할 수 있지만 여전히 유형 안전성을 유지할 수 있습니다. 항상 `any` 또는 `unknown` 대신 이를 선호해주세요.

<div class="content-ad"></div>

```js
// WITHOUT:
function getFirstUnsafe(list: any[]): any {
  return list[0];
}

const firstUnsafe = getFirstUnsafe(['test']); // typed as any

// WITH:
function getFirst<Type>(list: Type[]): Type {
  return list[0];
}

const first = getFirst<string>(['test']); // typed as string

// In this case the parameter can even be dropped because it is inferred from the argument.
const firstInferred = getFirst(['test']); // typed as string

// The types accepted as generics can also be limited using `extends`. The Type is also usually shortened to T.
class List<T extends string | number> {
  private list: T[] = [];

  get(key: number): T {
    return this.list[key];
  }

  push(value: T): void {
    this.list.push(value);
  }
}

const list = new List<string>();
list.push(9); // Type error: Argument of type 'number' is not assignable to parameter of type 'string'.
const booleanList = new List<boolean>(); // Type error: Type 'boolean' does not satisfy the constraint 'string | number'.
```

## 과거 (아직도 유효한 이전 소개)

- 유틸리티 타입: TypeScript에는 많은 유틸리티 타입이 포함되어 있으며, 그 중 가장 유용한 몇 가지가 여기에서 설명되었습니다.

```js
interface Test {
  name: string;
  age: number;
}

// Partial 유틸리티 타입은 모든 속성을 선택적으로 만듭니다.
type TestPartial = Partial<Test>; // typed as { name?: string | undefined; age?: number | undefined; }
// Required 유틸리티 타입은 반대로 동작합니다.
type TestRequired = Required<TestPartial>; // typed as { name: string; age: number; }
// Readonly 유틸리티 타입은 모든 속성을 읽기 전용으로 만듭니다.
type TestReadonly = Readonly<Test>; // typed as { readonly name: string; readonly age: string }
// Record 유틸리티 타입은 객체/맵/사전을 간단하게 정의할 수 있습니다. 가능한 경우에는 인덱스 시그니처보다 선호됩니다.
const config: Record<string, boolean> = { option: false, anotherOption: true };
// Pick 유틸리티 타입은 지정된 속성만 가져옵니다.
type TestLess = Pick<Test, 'name'>; // typed as { name: string; }
type TestBoth = Pick<Test, 'name' | 'age'>; // typed as { name: string; age: string; }
// Omit 유틸리티 타입은 지정된 속성을 무시합니다.
type TestFewer = Omit<Test, 'name'>; // typed as { age: string; }
type TestNone = Omit<Test, 'name' | 'age'>; // typed as {}
// Parameters 유틸리티 타입은 함수 타입의 매개변수를 가져옵니다.
function doSmth(value: string, anotherValue: number): string {
  return 'test';
}
type Params = Parameters<typeof doSmth>; // typed as [value: string, anotherValue: number]
// ReturnType 유틸리티 타입은 함수 타입의 반환 타입을 가져옵니다.
type Return = ReturnType<typeof doSmth>; // typed as string

// 이 외에도 많은 유틸리티 타입이 있으며, 그 중 일부는 아래에서 소개됩니다.
```

<div class="content-ad"></div>

- 조건부 타입: 어떤 타입이 다른 타입과 일치/확장되면 그에 따라 타입을 조건부로 설정합니다. 이는 JavaScript의 조건부(삼항) 연산자와 비슷하게 해석될 수 있습니다.

```js
// 배열인 경우에만 배열 타입을 추출하고, 그렇지 않으면 동일한 타입을 반환합니다.
type Flatten<T> = T extends any[] ? T[number] : T;

// 요소 타입을 추출합니다.
type Str = Flatten<string[]>; // string 타입으로 지정됨

// 타입을 그대로 유지합니다.
type Num = Flatten<number>; // number 타입으로 지정됨
```

- 조건부 타입으로 추론: 모든 일반 타입이 소비자에 의해 명시적으로 지정되어야 하는 것은 아닙니다. 일부는 코드로부터 추론될 수도 있습니다. 추론된 타입을 기반으로 조건부 논리를 작성하려면 infer 키워드가 필요합니다. 이는 일시적인 추론된 타입 변수를 정의하는 방식입니다.

```js
// 이전 예제를 기반으로 해서 더 깔끔하게 작성할 수 있습니다.
type FlattenOld<T> = T extends any[] ? T[number] : T;

// 배열에서 직접 인덱싱하는 대신, 배열에서 항목(Item)의 타입을 추론할 수 있습니다.
type Flatten<T> = T extends (infer Item)[] ? Item : T;

// 함수의 반환 타입을 가져오고, 그 외의 경우에는 undefined로 지정하는 타입을 작성할 수도 있습니다.
type GetReturnType<Type> = Type extends (...args: any[]) => infer Return ? Return : undefined;

type Num = GetReturnType<() => number>; // number 타입으로 지정됨

type Str = GetReturnType<(x: string) => string>; // string 타입으로 지정됨

type Bools = GetReturnType<(a: boolean, b: boolean) => void>; // undefined 타입으로 지정됨
```

<div class="content-ad"></div>

- 튜플 Optional Elements와 Rest: 튜플에서 `?`를 사용하여 옵셔널 요소를 선언하고, 다른 타입을 기반으로 나머지 요소를 사용할 수 있습니다.

```js
// 튜플의 길이를 아직 알 수 없지만 적어도 한 개는 있는 경우, `?`를 사용하여 옵셔널 타입을 지정할 수 있습니다.
const list: [number, number?, boolean?] = [];
list[0] // number 타입으로 지정됩니다
list[1] // number 또는 undefined 타입으로 지정됩니다
list[2] // boolean 또는 undefined 타입으로 지정됩니다
list[3] // Type error: 길이가 '3'인 '[number, (number | undefined)?, (boolean | undefined)?]' 형식의 튜플에는 '3' 인덱스 요소가 없습니다.

// 기존 타입을 기반으로 튜플을 사용할 수도 있습니다.
// 배열의 시작 부분에 패딩을 추가하려면 나머지 연산자 `...`를 사용할 수 있습니다.
function padStart<T extends any[]>(arr: T, pad: string): [string, ...T] {
  return [pad, ...arr];
}

const padded = padStart([1, 2], 'test'); // [string, number, number] 타입으로 지정됩니다
```

- 추상 클래스와 메소드: 클래스와 그 내부 메소드를 추상으로 선언하여 인스턴스화되지 않도록 할 수 있습니다.

```js
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log('roaming the earth...');
  }
}

// 추상 메소드는 확장 시 구현되어야 합니다.
class Cat extends Animal {} // 컴파일 오류: 추상 클래스 'Animal'로부터 상속된 추상 멤버 'makeSound'가 구현되지 않은 비-추상 클래스 'Cat'입니다.

class Dog extends Animal {
  makeSound() {
    console.log('woof');
  }
}

// 추상 클래스는 (인터페이스처럼) 인스턴스화할 수 없으며, 추상 메소드는 호출할 수 없습니다.
new Animal(); // 컴파일 오류: 추상 클래스의 인스턴스를 생성할 수 없습니다.

const dog = new Dog().makeSound(); // "woof"가 출력됩니다
```

<div class="content-ad"></div>

- 생성자 서명: 클래스 선언 외부에서 생성자의 유형을 정의합니다. 대부분의 경우에 사용되지 않아야 하며, 추상 클래스 대신 사용할 수 있습니다.

```js
interface MyInterface {
  name: string;
}

interface ConstructsMyInterface {
  new(name: string): MyInterface;
}

class Test implements MyInterface {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class AnotherTest {
  age: number;
}

function makeObj(n: ConstructsMyInterface) {
  return new n('hello!');
}

const obj = makeObj(Test); // Test로 타입 지정됨
const anotherObj = makeObj(AnotherTest); // 타입 오류: 'AnotherTest'의 유형은 'ConstructsMyInterface'의 매개변수에 할당할 수 없습니다.
```

- ConstructorParameters 유틸리티 타입: TypeScript 도우미 함수로, 생성자 타입에서 생성자 매개변수를 가져옵니다 (클래스에서 가져오는 것이 아닙니다).

```js
// makeObj 함수에 생성자 인수를 얻고 싶다면?
interface MyInterface {
  name: string;
}

interface ConstructsMyInterface {
  new(name: string): MyInterface;
}

class Test implements MyInterface {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

function makeObj(test: ConstructsMyInterface, ...args: ConstructorParameters<ConstructsMyInterface>) {
  return new test(...args);
}

makeObj(Test); // 타입 오류: 2개의 매개변수가 필요하지만 1개만 전달되었습니다.
const obj = makeObj(Test, 'test'); // Test로 타입 지정됨
```

<div class="content-ad"></div>

## TypeScript 4.0

- Variadic Tuple Types: 튜플에서의 나머지 요소는 이제 제네릭할 수 있습니다. 여러 개의 나머지 요소를 사용하는 것도 허용됩니다.

```js
// 만약 길이와 타입이 정의되지 않은 두 튜플을 결합하는 함수가 있다면 어떨까요? 반환 타입을 어떻게 정의할 수 있을까요?

// 이전:
// 우리는 몇 가지 오버로드를 작성할 수 있었습니다.
declare function concat(arr1: [], arr2: []): [];
declare function concat<A>(arr1: [A], arr2: []): [A];
declare function concat<A, B>(arr1: [A], arr2: [B]): [A, B];
// 이하 생략

// 대신에 타입을 결합할 수 있습니다.
declare function concatBetter<T, U>(arr1: T[], arr2: U[]): (T | U)[];
// 그러나 이것은 (T | U)[]로 타입이 지정됩니다.

// 새로운 기능:
// 가변 길이 튜플 타입을 사용하면 쉽게 정의할 수 있고 길이 정보를 유지할 수 있습니다.
declare function concatNew<T extends Arr, U extends Arr>(arr1: T, arr2: U): [...T, ...U];

const tuple = concatNew([23, 'hey', false] as [number, string, boolean], [5, 99, 20] as [number, number, number]);
console.log(tuple[0]); // 23
const element: number = tuple[1]; // 타입 오류: 타입 'string'을 'number'에 할당할 수 없습니다.
console.log(tuple[6]); // 타입 오류: 길이 '6'인 튜플 타입 '[23, "hey", false, 5, 99, 20]'에는 인덱스 '6'에 요소가 없습니다.
```

- Labeled Tuple Elements: 튜플 요소는 이제 [start: number, end: number]와 같이 이름을 지정할 수 있습니다. 요소 중 하나가 이름이 지정되면 모두 이름이 있어야 합니다.

<div class="content-ad"></div>

혹시 클래스 생성자에서 속성이 설정될 때 속성의 타입을 자동으로 추론할 수 있어서 더 이상 수동으로 설정할 필요가 없습니다.

```js
class Animal {
  // 생성자에서 할당될 때 타입을 설정할 필요가 없습니다.
  name;

  constructor(name: string) {
    this.name = name;
    console.log(this.name); // 문자열로 타입이 지정됨
  }
}
```

- JSDoc @deprecated 지원: JSDoc/TSDoc의 @deprecated 태그가 TypeScript에서 인식됩니다.

<div class="content-ad"></div>


```js
/** @deprecated 메시지 */
type Test = string;

const test: Test = 'dfadsf'; // 타입 오류: '테스트'가 사용되지 않습니다.
```

## TypeScript 4.1

- 템플릿 리터럴 타입: 리터럴 타입을 정의할 때, '$'를 이용하여 템플릿을 활용할 수 있습니다. 이를 통해 여러 개의 문자열 리터럴을 조합하는 등 복잡한 문자열 타입을 만들 수 있습니다.

```js
type VerticalDirection = 'top' | 'bottom';
type HorizontalDirection = 'left' | 'right';
type Direction = `${VerticalDirection} ${HorizontalDirection}`;

const dir1: Direction = 'top left';
const dir2: Direction = 'left'; // 타입 오류: '"left"'은(는) '"top left" | "top right" | "bottom left" | "bottom right"' 타입에 할당할 수 없습니다.
const dir3: Direction = 'left top'; // 타입 오류: '"left top"'은(는) '"top left" | "top right" | "bottom left" | "bottom right"' 타입에 할당할 수 없습니다.

// 이는 제네릭 및 새로운 유틸리티 타입과도 결합할 수 있습니다.
declare function makeId<T extends string, U extends string>(first: T, second: U): `${Capitalize<T>}-${Lowercase<U>}`;
```

<div class="content-ad"></div>

- 키 다시 매핑하기: 매핑된 타입을 다시 정의하여 그 값들을 사용할 수 있습니다. [K in keyof T as NewKeyType]: T[K].

```js
// 예를 들어, 객체를 다시 포맷하되 그 ID 앞에 밑줄을 추가하고 싶다고 가정해 봅시다.
const obj = { value1: 0, value2: 1, value3: 3 };
const newObj: { [Property in keyof typeof obj as `_${Property}`]: number }; // { _value1: number; _value2: number; value3: number; }로 타입이 지정됩니다.
```

- 재귀 조건부 타입: 조건부 타입을 해당 정의 내부에서 사용합니다. 이를 통해 무한히 중첩된 값을 조건부적으로 언패킹하는 타입을 생성할 수 있습니다.

```js
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

type P1 = Awaited<string>; // string으로 타입이 지정됩니다.
type P2 = Awaited<Promise<string>>; // string으로 타입이 지정됩니다.
type P3 = Awaited<Promise<Promise<string>>>; // string으로 타입이 지정됩니다.
```

<div class="content-ad"></div>

- JSDOC @see 태그를 지원하는 편집기: 이제 편집기에서 JSDoc/TSDoc @see 변수/유형/링크 태그가 지원됩니다.

```js
const originalValue = 1;
/**
 * 다른 값의 복사본
 * @see originalValue
 */
const value = originalValue;
```

- tsc --explainFiles: --explainFiles 옵션은 TypeScript CLI에서 컴파일에 사용된 파일과 그 이유를 설명해주는 데 사용될 수 있습니다. 이는 디버깅에 유용할 수 있습니다. 경고: 대규모 프로젝트나 복잡한 설정의 경우 많은 출력물이 생성됩니다. 대신 tsc --explainFiles | less 또는 비슷한 방법을 사용하십시오.

```js
tsc --explainFiles

<<output
../../.asdf/installs/nodejs/16.13.1/.npm/lib/node_modules/typescript/lib/lib.es5.d.ts
  파일 '../../.asdf/installs/nodejs/16.13.1/.npm/lib/node_modules/typescript/lib/lib.es2015.d.ts'에서 'es5'로 참조되는 라이브러리
  파일 '../../.asdf/installs/nodejs/16.13.1/.npm/lib/node_modules/typescript/lib/lib.es2015.d.ts'에서 'es5'로 참조되는 라이브러리
../../.asdf/installs/nodejs/16.13.1/.npm/lib/node_modules/typescript/lib/lib.es2015.d.ts
  파일 '../../.asdf/installs/nodejs/16.13.1/.npm/lib/node_modules/typescript/lib/lib.es2016.d.ts'에서 'es2015'로 참조되는 라이브러리
  파일 '../../.asdf/installs/nodejs/16.13.1/.npm/lib/node_modules/typescript/lib/lib.es2016.d.ts'에서 'es2015'로 참조되는 라이브러리
../../.asdf/installs/nodejs/16.13.1/.npm/lib/node_modules/typescript/lib/lib.es2016.d.ts
  파일 '../../.asdf/installs/nodejs/16.13.1/.npm/lib/node_modules/typescript/lib/lib.es2017.d.ts'에서 'es2016'로 참조되는 라이브러리
  파일 '../../.asdf/installs/nodejs/16.13.1/.npm/lib/node_modules/typescript/lib/lib.es2017.d.ts'에서 'es2016'로 참조되는 라이브러리
...
output
```

<div class="content-ad"></div>

- Destructured 변수는 명시적으로 사용되지 않음을 표시할 수 있습니다: 구조 분해할 때 밑줄을 사용하여 변수가 사용되지 않음을 표시할 수 있습니다. 이를 통해 TypeScript에서 "사용되지 않는 변수" 오류를 방지할 수 있습니다.

```js
const [_first, second] = [3, 5];
console.log(second);

// 심지어 더 짧게
const [_, value] = [3, 5];
console.log(value);
```

## TypeScript 4.3

- 속성에 대한 별도의 쓰기 유형: set/get 접근자를 정의할 때, 쓰기/설정 형식이 읽기/가져오기 형식과 다를 수 있습니다. 이를 통해 동일한 값의 여러 형식을 수락하는 setter를 정의할 수 있습니다.

<div class="content-ad"></div>

```js
class Test {
  private _value: number;

  get value(): number {
    return this._value;
  }

  set value(value: number | string) {
    if (typeof value === 'number') {
      this._value = value;
      return;
    }
    this._value = parseInt(value, 10);
  }
}
```

- override: 상속된 클래스 메서드를 명확하게 오버라이드로 표시하기 위해 override를 사용하세요. 부모 클래스가 변경되면 TypeScript에서 부모 메서드가 더 이상 존재하지 않음을 알려줄 수 있습니다. 이를 통해 더 안전한 복잡한 상속 패턴을 구현할 수 있습니다.

```js
class Parent {
  getName(): string {
    return 'name';
  }
}

class NewParent {
  getFirstName(): string {
    return 'name';
  }
}

class Test extends Parent {
  override getName(): string {
    return 'test';
  }
}

class NewTest extends NewParent {
  override getName(): string { // Type error: This member cannot have an 'override' modifier because it is not declared in the base class 'NewParent'.
    return 'test';
  }
}
```

- static Index Signatures: 클래스에서 정적 속성을 사용할 때, 정적 [propName: string]: string을 사용하여 색인 서명을 설정할 수 있습니다.


<div class="content-ad"></div>

```js
// 이전 코드:
class Test {}

Test.test = ''; // 타입 오류: 'test' 속성을 'Test' 형식에서 찾을 수 없습니다.

// 새로운 코드:
class NewTest {
  static [key: string]: string;
}

NewTest.test = '';
```

- JSDOC @link 태그를 위한 편집기 지원: JSDoc/TSDoc의 '@link 변수/타입/링크' 인라인 태그가 이제 지원되며 편집기에서 표시되고 해결됩니다.

```js
const originalValue = 1;
/**
 * {@link originalValue}의 복사본
 */
const value = originalValue;
```

## TypeScript 4.4

<div class="content-ad"></div>

- 정확한 선택적 속성 유형 (--exactOptionalPropertyTypes): 컴파일러 플래그 --exactOptionalPropertyTypes (또는 tsconfig.json에)를 사용하면, 암시적으로 undefined를 허용하는 속성에 대해 undefined로 할당하는 것이 허용되지 않습니다 (예: property?: string). 대신, property: string | undefined와 같이 명시적으로 undefined를 허용해야 합니다.

```js
class Test {
  name?: string;
  age: number | undefined;
}

const test = new Test();
test.name = undefined; // 타입 오류: 'exactOptionalPropertyTypes: true'를 사용하여 'undefined' 타입을 'string'에 할당할 수 없습니다. 대상의 유형에 'undefined'를 추가하는 것을 고려해보세요.
test.age = undefined;
console.log(test.age); // undefined
```

## TypeScript 4.5

- Awaited`` 유형 및 Promise 개선: 새로운 Awaited`` 유틸리티 유형은 무한히 중첩된 Promises에서 값 유형을 추출합니다 (값에 대해 await이 하는 것과 같이). 이는 또한 Promise.all()에 대한 유형 추론을 개선했습니다.

<div class="content-ad"></div>

```js
// 제네릭 대기값을 가지고 싶다고 가정해 봅시다.
// 이러한 경우 Awaited 유틸리티 타입을 사용할 수 있습니다 (소스 코드는 이전 예제의 일부였습니다).
// 따라서 무한하게 중첩된 Promises가 모두 값으로 해결됩니다.
type P1 = Awaited<string>; // 문자열로 타입 지정
type P2 = Awaited<Promise<string>>; // 문자열로 타입 지정
type P3 = Awaited<Promise<Promise<string>>>; // 문자열로 타입 지정
```

- Import 이름에 대한 유형 수식어: 일반 (import type 아닌) import 문 안에서 type 키워드를 사용하여 해당 값이 유형 컴파일을 위해만 가져와야 함을 신호로 삼을 수 있습니다 (컴파일 후에 제거할 수 있습니다).

```js
// 이전:
// 유형을 가져오는 가장 좋은 방법은 `import type` 키워드를 사용하여 컴파일 이후에 실제로 가져오지 않도록 하는 것입니다.
import { something } from './file';
import type { SomeType } from './file';
// 이 파일에 대해 두 개의 import 문이 필요했습니다.

// 새로운:
// 이제 이를 하나의 문으로 결합할 수 있습니다.
import { something, type SomeType } from './file';
```

- Const 어순: 상수를 정의할 때 const 키워드를 사용하여 이를 리터럴 타입으로 정확하게 지정할 수 있습니다. 이는 다양한 용례가 있으며 정확한 유형 정의가 쉬워집니다. 또한 상수 객체와 배열은 읽기 전용이 되어 상수 객체의 변이를 방지합니다.

<div class="content-ad"></div>

```js
// 이전:
const obj = { name: 'foo', value: 9, toggle: false }; // { name: string; value: number; toggle: boolean; }으로 타입 지정됨
// 일반적으로 타입이 지정되어 있으므로 어느 값이든 할당 가능합니다.
obj.name = 'bar';

const tuple = ['name', 4, true]; // (string | number | boolean)[]으로 타입 지정됨
// 타입으로 길이와 정확한 형식을 결정할 수 없습니다. 어떤 값이든 어디에든 할당할 수 있습니다.
tuple[0] = 0;
tuple[3] = 0;

// 새로운 방식:
const objNew = { name: 'foo', value: 9, toggle: false } as const; // { readonly name: "foo"; readonly value: 9; readonly toggle: false; }으로 타입 지정됨
// 값을 할당할 수 없습니다 ("foo"(그리고 readonly로 정의되었기 때문).
objNew.name = 'bar'; // 타입 에러: 'name'에 할당할 수 없습니다. 읽기 전용 속성입니다.

const tupleNew = ['name', 4, true] as const; // readonly ["name", 4, true]으로 타입 지정됨
// 이제 길이와 정확한 형식이 정의되어 있고, 값을 할당할 수 없습니다 (리터럴로 정의되었으며 readonly).
tupleNew[0] = 0; // 타입 에러: '0'에 할당할 수 없습니다. 읽기 전용 속성입니다.
tupleNew[3] = 0; // 타입 에러: 'readonly["name", 4, true]'에 있는 인덱스 서명에는 읽기만 허용됩니다.
```

- 클래스 내의 메서드에 대한 코드 조각 완성: 클래스가 메서드 타입을 상속하면 편집기에서 코드 조각으로 제안됩니다.

<img src="https://miro.medium.com/v2/resize:fit:800/1*31No189vLt2Kdx5Ay_Ihig.gif" />

## TypeScript 4.6

<div class="content-ad"></div>

- 인덱스된 액세스 추론 개선: 키로 직접 타입을 색인화할 때, 이제 같은 객체에 있는 경우 타입이 더 정확해집니다. 현대적인 TypeScript로 어떤 것이 가능한지 보여주는 좋은 예시입니다.

```js
interface AllowedTypes {
  'number': number;
  'string': string;
  'boolean': boolean;
}

// Record는 허용된 타입의 종류와 값 타입을 지정합니다.
type UnionRecord<AllowedKeys extends keyof AllowedTypes> = { [Key in AllowedKeys]:
{
  kind: Key;
  value: AllowedTypes[Key];
  logValue: (value: AllowedTypes[Key]) => void;
}
}[AllowedKeys];

// 함수 logValue는 Record의 값만을 허용합니다.
function processRecord<Key extends keyof AllowedTypes>(record: UnionRecord<Key>) {
  record.logValue(record.value);
}

processRecord({
  kind: 'string',
  value: 'hello!',

  // 값이 암묵적으로 string | number | boolean 타입을 가졌던 것이
  // 이제 올바르게 오직 string으로 추론됩니다.
  logValue: value => {
    console.log(value.toUpperCase());
  }
});
```

- TypeScript 추적 분석기 (--generateTrace): --generateTrace '출력 폴더' 옵션을 사용하여 TypeScript CLI가 타입 검사 및 컴파일 프로세스에 대한 자세한 내용을 포함한 파일을 생성할 수 있습니다. 이는 복잡한 타입을 최적화하는 데 도움이 될 수 있습니다.

```js
tsc --generateTrace trace

cat trace/trace.json
<<출력
[
{"name":"process_name","args":{"name":"tsc"},"cat":"__metadata","ph":"M","ts":...,"pid":1,"tid":1},
{"name":"thread_name","args":{"name":"Main"},"cat":"__metadata","ph":"M","ts":...,"pid":1,"tid":1},
{"name":"TracingStartedInBrowser","cat":"disabled-by-default-devtools.timeline","ph":"M","ts":...,"pid":1,"tid":1},
{"pid":1,"tid":1,"ph":"B","cat":"program","ts":...,"name":"createProgram","args":{"configFilePath":"/...","rootDir":"/..."},
{"pid":1,"tid":1,"ph":"B","cat":"parse","ts":...,"name":"createSourceFile","args":{"path":"/..."},
{"pid":1,"tid":1,"ph":"E","cat":"parse","ts":...,"name":"createSourceFile","args":{"path":"/..."},
{"pid":1,"tid":1,"ph":"X","cat":"program","ts":...,"name":"resolveModuleNamesWorker","dur":...,"args":{"containingFileName":"/..."},
...
출력

cat trace/types.json
<<출력
[{"id":1,"intrinsicName":"any","recursionId":0,"flags":["..."]},
{"id":2,"intrinsicName":"any","recursionId":1,"flags":["..."]},
{"id":3,"intrinsicName":"any","recursionId":2,"flags":["..."]},
{"id":4,"intrinsicName":"error","recursionId":3,"flags":["..."]},
{"id":5,"intrinsicName":"unresolved","recursionId":4,"flags":["..."]},
{"id":6,"intrinsicName":"any","recursionId":5,"flags":["..."]},
{"id":7,"intrinsicName":"intrinsic","recursionId":6,"flags":["..."]},
{"id":8,"intrinsicName":"unknown","recursionId":7,"flags":["..."]},
{"id":9,"intrinsicName":"unknown","recursionId":8,"flags":["..."]},
{"id":10,"intrinsicName":"undefined","recursionId":9,"flags":["..."]},
{"id":11,"intrinsicName":"undefined","recursionId":10,"flags":["..."]},
{"id":12,"intrinsicName":"null","recursionId":11,"flags":["..."]},
{"id":13,"intrinsicName":"string","recursionId":12,"flags":["..."]},
...
출력
```

<div class="content-ad"></div>

## TypeScript 4.7

- Node.js에서 ECMAScript 모듈 지원: CommonJS 대신 ES 모듈을 사용할 때, TypeScript가 이제 default를 지정할 수 있습니다. tsconfig.json에서 지정하세요.

```js
...
"compilerOptions": [
  ...
  "module": "es2020"
]
...
```

- package.json의 type: package.json의 type 필드를 "module"로 설정할 수 있습니다. 이것은 Node.js와 ES 모듈을 사용하기 위해 필요합니다. 대부분의 경우에 TypeScript에 충분하며 위의 컴파일러 옵션이 필요하지 않습니다.

<div class="content-ad"></div>

```js
...
"type": "module"
...
```

- 인스턴스화 표현식: 인스턴스화 표현식을 사용하면 값을 참조할 때 유형 매개변수를 지정할 수 있습니다. 이를 통해 래퍼를 생성하지 않고 일반적인 유형을 좁힐 수 있습니다.

```js
class List<T> {
  private list: T[] = [];

  get(key: number): T {
    return this.list[key];
  }

  push(value: T): void {
    this.list.push(value);
  }
}

function makeList<T>(items: T[]): List<T> {
  const list = new List<T>();
  items.forEach(item => list.push(item));
  return list;
}

// 특정 값만 허용하는 목록을 만드는 함수가 필요한 경우를 가정해 봅시다.
// 이전:
// 직접 래퍼 함수를 정의하고 인수를 전달해야 했습니다.
function makeStringList(text: string[]) {
  return makeList(text);
}

// 새로운 방법:
// 인스턴스화 표현식을 사용하면 훨씬 쉽습니다.
const makeNumberList = makeList<number>;
```

- 추론된 유형 변수에 대한 extend 제한: 조건부 유형에서 유형 변수를 추론할 때, extends를 사용하여 직접 좁히거나 제한할 수 있습니다.

<div class="content-ad"></div>

```js
// 배열의 첫 번째 요소가 문자열인 경우에만 해당 요소를 가져오는 유형을 작성하려고 한다고 가정해 봅시다.
// 이를 위해 조건부 유형을 사용할 수 있습니다.

// 이전:
type FirstIfStringOld<T> =
  T extends [infer S, ...unknown[]]
    ? S extends string ? S : never
    : never;

// 그러나 이 방법은 두 개의 중첩된 조건부 유형이 필요합니다. 이를 하나의 유형으로도 할 수 있습니다.
type FirstIfString<T> =
  T extends [string, ...unknown[]]
    // `T`에서 첫 번째 유형을 가져옵니다.
    ? T[0]
    : never;

// 이것도 여전히 최적화되지 않은 상태이며 올바른 유형을 위해 배열을 인덱싱해야 합니다.

// 새로운 방식:
// 추론된 유형 변수에 extends 제약 조건을 사용하여 이를 더 간단하게 선언할 수 있습니다.
type FirstIfStringNew<T> =
  T extends [infer S extends string, ...unknown[]]
    ? S
    : never;
// 유형을 알아내는 방식은 이전과 동일하지만 더 깔끔한 구문입니다.

type A = FirstIfStringNew<[string, number, number]>; // string으로 유형 지정
type B = FirstIfStringNew<["hello", number, number]>; // "hello"로 유형 지정
type C = FirstIfStringNew<["hello" | "world", boolean]>; // "hello" 또는 "world"로 유형 지정
type D = FirstIfStringNew<[boolean, number, string]>; // never로 유형 지정
```

- 유형 매개변수를 위한 선택적 분산 주석: 제네릭은 "일치하는지" 확인할 때 다른 동작을 가질 수 있습니다. 예를 들어, 상속을 허용할 경우 getters 및 setters에 대해 반대로 반전됩니다. 이제 이를 명시적으로 지정할 수 있습니다.

```js
// 다른 인터페이스 / 클래스를 확장하는 인터페이스가 있다고 가정해 봅시다.
interface Animal {
  animalStuff: any;
}

interface Dog extends Animal {
  dogStuff: any;
}

// 그리고 일반적인 "getter" 및 "setter"가 있습니다.
type Getter<T> = () => T;

type Setter<T> = (value: T) => void;

// Getter<T1>과 Getter<T2> 또는 Setter<T1>과 Setter<T2>가 일치하는지 확인하려면 분산에 따라 달라집니다.
function useAnimalGetter(getter: Getter<Animal>) {
  getter();
}

// 이제 함수에 Getter를 전달할 수 있습니다.
useAnimalGetter((() => ({ animalStuff: 0 }) as Animal));
// 당연히 작동합니다.

// 그러나 Dog를 반환하는 Getter를 사용하려면 어떻게 해야 할까요?
useAnimalGetter((() => ({ animalStuff: 0, dogStuff: 0 }) as Dog));
// 이 또한 작동합니다. 왜냐하면 Dog도 Animal이기 때문입니다.

function useDogGetter(getter: Getter<Dog>) {
  getter();
}

// useDogGetter 함수에 동일한 작업을 시도하면 동일한 동작을 얻지 못할 것입니다.
useDogGetter((() => ({ animalStuff: 0 }) as Animal); // Type error: Property 'dogStuff' is missing in type 'Animal' but required in type 'Dog'.
// 이는 Animal이 아닌 Dog가 필요하기 때문에 작동하지 않습니다.

useDogGetter((() => ({ animalStuff: 0, dogStuff: 0 }) as Dog);
// 그러나 이 경우는 작동합니다.

// 직관적으로 Setters가 같은 방식으로 작동할 것으로 기대할 수도 있지만, 사실은 그렇지 않습니다.
function setAnimalSetter(setter: Setter<Animal>, value: Animal) {
  setter(value);
}

// 동일한 유형의 Setter를 전달해도 작동합니다.
setAnimalSetter((value: Animal) => {}, { animalStuff: 0 });

function setDogSetter(setter: Setter<Dog>, value: Dog) {
  setter(value);
}

// 여기도 마찬가지로 작동합니다.
setDogSetter((value: Dog) => {}, { animalStuff: 0, dogStuff: 0 });

// 그러나 Dog Setter를 setAnimalSetter 함수에 전달하면 Getter와는 반대로 동작이 반전됩니다.
setAnimalSetter((value: Dog) => {}, { animalStuff: 0, dogStuff: 0 }); // Type error: Argument of type '(value: Dog) => void' is not assignable to parameter of type 'Setter<Animal>'.

// 이번에는 상황이 반대로 작동합니다.
setDogSetter((value: Animal) => {}, { animalStuff: 0, dogStuff: 0 });

// 새로운 방법:
// TypeScript에이를 표시하기 위해 (필수는 아니지만 가독성을 위해 유용), 유형 매개변수에 대한 선택적 분산 주석을 사용합니다.
type GetterNew<out T> = () => T;
type SetterNew<in T> = (value: T) => void;
```

- moduleSuffixes로 해상도 사용자 정의: 사용자 정의 파일 접미사를 사용하는 환경(예: 네이티브 앱 빌드에 .ios를 사용하는 경우)에서는 TypeScript가 가져오기를 정확하게 해석하도록 이 접미사를 tsconfig.json에 지정할 수 있습니다.

<div class="content-ad"></div>

```js
...
"compilerOptions": [
  ...
  "moduleSuffixes": [".ios", ".native", ""]
]
...
```

```js
import * as foo from './foo';
// 이 코드는 먼저 ./foo.ios.ts를 확인하고, 그 다음에는 ./foo.native.ts를, 마지막으로 ./foo.ts를 확인합니다.
```

- 에디터에서 소스 정의로 이동: 에디터에서 새로운 "소스 정의로 이동" 메뉴 옵션이 사용 가능합니다. 이는 "정의로 이동"과 유사하지만, .ts 및 .js 파일을 .d.ts 타입 정의 파일보다 우선합니다.

<img src="https://miro.medium.com/v2/resize:fit:800/1*y45nF8mb-nfBuVIUPt7KJQ.gif" />


<div class="content-ad"></div>

![이미지](https://miro.medium.com/v2/resize:fit:800/1*qvzGqfF844cXCPMeDrg_IQ.gif)

## TypeScript 4.9

- `satisfies` 연산자: `satisfies` 연산자는 실제로 그 타입을 할당하지 않고도 타입과의 호환성을 확인할 수 있게 해줍니다. 이를 통해 더 정확한 추론된 타입을 유지하면서도 호환성을 유지할 수 있습니다.

```js
// 이전:
// 여러 항목과 그 색상을 저장하는 객체/맵/딕셔너리가 있다고 가정해 보겠습니다.
const obj = {
  fireTruck: [255, 0, 0],
  bush: '#00ff00',
  ocean: [0, 0, 255]
} // { fireTruck: number[]; bush: string; ocean: number[]; } 타입으로 정의됨

// 배열과 문자열에 대해 작업을 수행할 수 있도록 속성을 암시적으로 타입 지정합니다.
const rgb1 = obj.fireTruck[0]; // 숫자로 타입 지정
const hex = obj.bush; // 문자열로 타입 지정

// 특정 객체만 허용하고 싶다면 Record 타입을 사용할 수 있습니다.
const oldObj: Record<string, [number, number, number] | string> = {
  fireTruck: [255, 0, 0],
  bush: '#00ff00',
  ocean: [0, 0, 255]
} // Record<string, [number, number, number] | string> 타입으로 정의됨
// 하지만 이제 우리는 속성의 타입에 대한 정보를 잃어버립니다.
const oldRgb1 = oldObj.fireTruck[0]; // string 또는 number로 타입 지정
const oldHex = oldObj.bush; // string 또는 number로 타입 지정

// 새롭게:
// `satisfies` 키워드를 사용하여 타입과 호환성을 확인할 수 있습니다.
const newObj = {
  fireTruck: [255, 0, 0],
  bush: '#00ff00',
  ocean: [0, 0, 255]
} satisfies Record<string, [number, number, number] | string> // { fireTruck: [number, number, number]; bush: string; ocean: [number, number, number]; } 타입으로 정의됨
// 이제 속성의 타입에 대한 정보를 유지할 수 있을 뿐만 아니라 배열은 튜플로 더 정확해집니다.
const newRgb1 = newObj.fireTruck[0]; // 숫자로 타입 지정
const newRgb4 = newObj.fireTruck[3]; // 타입 오류: 길이가 '3'인 튜플 타입 '[number, number, number]'에는 인덱스 '3'에 해당하는 요소가 없습니다.
const newHex = newObj.bush; // 문자열로 타입 지정
```

<div class="content-ad"></div>

- 편집기의 "사용되지 않는 Imports 제거" 및 "Imports 정렬" 명령: 편집기에서 새로운 "사용되지 않는 Imports 제거" 및 "Imports 정렬" 명령(및 자동 수정)을 사용하면 Imports를 관리하는 것이 더 쉬워집니다.

![이미지](https://miro.medium.com/v2/resize:fit:800/1*z5SG6BKwzyxrG6sG7OKciw.gif)

## TypeScript 5.0

- ES 데코레이터 지원: TypeScript는 이제 ES 데코레이터(곧 나올 ES 기능)를 지원하며, 기존 데코레이터와는 다릅니다. 이전에 TypeScript는 데코레이터에 대해 실험적인 지원을 했었는데, 이는 Angular와 같은 프레임워크에서 사용되는 것으로, --experimentalDecorators 플래그(또는 tsconfig.json에서)로 선택할 수 있었으며 약간 다르게 동작했습니다. 그러나 이제 새로운 ES 데코레이터는 이전 것과는 다르게 메타데이터를 내보내지 못하며 아직은 매개변수에서도 지원되지 않습니다.

<div class="content-ad"></div>

```js
// 주의: 2023년 5월 기준으로 이것은 예정된 ES 기능이므로 이 코드는 아직 작동하지 않습니다.

// 디버깅 중에 메서드에 진입하거나 나갈 때마다 기록하려고 합니다.
// 이것을 수동으로 하는 것은 상당히 지루할 수 있습니다. 자동화할 방법이 있을까요?
// 네, 데코레이터를 사용하여 실행 컨텍스트를 대체할 수 있습니다.

// 먼저 데코레이터 역할을 할 함수를 정의합니다. 이 함수는 원본 메서드와 컨텍스트 개체를 매개변수로 받아 새로운 실행 함수를 반환합니다.
function logMethod<This, Args extends any[], Return>(originalMethod: (this: This, ...args: Args) => Return, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);

  function replacementFunction(this: This, ...args: Args) {
    console.log(`LOG: 메서드 '${methodName}' 진입 중.`)
    const result = originalMethod.call(this, ...args);
    console.log(`LOG: 메서드 '${methodName}' 나감.`)
    return result;
  }

  return replacementFunction;
}

// 이제 이를 사용할 클래스를 정의합니다. 데코레이터는 클래스와 그 멤버에만 작동합니다.
// 메서드에 '@'와 함수명을 사용하여 데코레이터를 적용합니다.
class Test {
  @logMethod
  doSomething() {
    return '작업 중';
  }
}

const testObj = new Test();

// 메서드를 실행하면 대체 메서드가 호출됩니다.
console.log(testObj.doSomething()); // "LOG: 메서드 'doSomething' 진입 중.", "작업 중", "LOG: 메서드 'doSomething' 나감."

// 사용자 정의 메시지와 같은 추가 인수를 전달하려면 데코레이터 팩토리(데코레이터 함수를 반환하는 함수)를 정의할 수 있습니다.
function logMethodCustom(customMessage: string) {
  return <This, Args extends any[], Return>(originalMethod: (this: This, ...args: Args) => Return, context: ClassMethodDecoratorContext) => {
    const methodName = String(context.name);

    function replacementFunction(this: This, ...args: Args) {
      console.log(`${customMessage}: 메서드 '${methodName}' 진입 중.`)
      const result = originalMethod.call(this, ...args);
      console.log(`${customMessage}: 메서드 '${methodName}' 나감.`)
      return result;
    }

    return replacementFunction;
  }
}

// 이번에는 함수 호출을 포함하는 `()`로 된 추가 인수를 사용하여 메서드에 데코레이터를 적용합니다.
class TestCustom {
  @logMethodCustom('테스트 로그')
  doSomething() {
    return '작업 중';
  }
}

const testCustomObj = new Test();

// 메서드 실행시 모든 작업이 예상대로 작동합니다.
console.log(testCustomObj.doSomething()); // "테스트 로그: 메서드 'doSomething' 진입 중.", "작업 중", "테스트 로그: 메서드 'doSomething' 나감."

// 데코레이터 함수에서 대체 메서드를 반환하지 않으면 원본 메서드가 호출되지만 관련 설정을 아직 설정할 수 있습니다.
// 예를 들어 `constructor` 단계 이전에 `this`를 바인딩하여 클래스 외부에서 콜백으로 전달할 경우 동일하게 실행되도록합니다.
// `constructor` 단계 이전에 코드를 실행하려면 컨텍스트 개체의 `addInitializer` 메서드를 사용할 수 있습니다.
function bindThis(_: unknown, context: ClassMethodDecoratorContext) {
const methodName = context.name;
if (context.private) {
  throw new Error(`'bound'는 ${methodName as string}과 같은 비공개 속성을 데코레이션할 수 없습니다.`);
}
context.addInitializer(function (this: any) {
  const methodName = context.name;
    if (typeof methodName === 'string') {
      this[methodName] = this[methodName].bind(this);
    }
  });
}

// 바인딩하지 않은 상태로 한번 정의합니다.
class TestUnbound {
  private returnVal = '작업 중';

  doSomething() {
    return this.returnVal;
  }
}

const testUnboundObj = new TestUnbound();

// 메서드에 다시 "데코레이터"를 적용합니다.
class TestBound {
  private returnVal = '작업 중';

  @bindThis
  doSomething() {
    return this.returnVal;
  }
}

const testBoundObj = new TestBound();

// 클래스 컨텍스트 외부에 메서드를 저장하고 실행시키면 속성 값에 액세스할 수 없습니다.
const unboundFunc = testUnboundObj.doSomething;
console.log(unboundFunc()); // 오류: "Cannot read properties of undefined (reading 'returnVal')"

// 그러나 바인딩하면 예상대로 작동합니다.
const boundFunc = testBoundObj.doSomething;
console.log(boundFunc()); // "작업 중"
```

- const 형식 매개변수: 형식 매개변수 앞에 const를 지정하는 const는 readonly 형식을 그대로 사용하는 것처럼 동작하도록 시도합니다. 그러나 변경 가능한 값을 형식화했다면 인자유추가 작동하지 않을 수 있습니다(왜냐하면 읽기전용 형식은 변경 가능한 형식에 할당할 수 없기 때문에 항상 readonly 형식을 상속해야 합니다). 이것은 여전히 허용된 매개변수를 제한하지 않습니다. 여전히 extends 내에서 제한해야 합니다.

- 타입을 활용한 여러 구성 파일 지원: 복잡한 상속 구조를 만들거나 모든 "tsconfig"에서 항상 동일한 구성을 확장하거나 모든 설정을 복사하여 모두 복사하는 대신, "tsconfig" 파일에서 "extends": ["./tsconfig1.json", "./tsconfig2.json"]를 지정함으로써 여러 파일을 확장하여 동작을 재정의할 수 있습니다. 후자의 파일이 오버라이드 동작을 우선시합니다.


<div class="content-ad"></div>

```js
...
// 여기서 "tsconfig1.json"은 "@tsconfig/strictest/tsconfig.json"을 덮어씁니다. "tsconfig2.json"은 "tsconfig1.json"과 "@tsconfig/strictest/tsconfig.json"을 덮어쓰며, 이 파일은 모두 덮어씁니다.
"extends": ["@tsconfig/strictest/tsconfig.json", "./tsconfig1.json", "./tsconfig2.json"],
...
```

- 모든 열거형이 합집합 열거형입니다: 동적으로 할당된 열거형 값은 이제 더 이상 예전의 열거형 전략 기본값을 갖지 않습니다(열거형 키에 대한 타입 없음, 값으로만 사용 가능하며 타입으로 사용할 수 없음). 대신 이제 타입으로도 사용할 수 있습니다.

```js
// 열거형은 각 값마다 다른 타입을 만듭니다.
enum Color {
  Red, Green, Blue, Orange, Yellow, Violet
}

// 이를 통해 그들을 좁히고 다른 타입처럼 사용할 수 있습니다.
type PrimaryColor = Color.Red | Color.Green | Color.Blue;

// 하지만:
// 값이 동적으로 할당되면 고정된 값이 없습니다.
// 이전에는 예전 열거형 동작으로 되돌아가게 되었습니다.
// 예전 열거형 동작에서 그 멤버는 값으로만 존재하며 타입으로는 존재하지 않음.
enum ColorRandom {
  Red = Math.random(),
  Green = Math.random(),
  Blue = Math.random(),
  Orange = Math.random(),
  Yellow = Math.random(),
  Violet = Math.random()
}

// 그래서 이전에는 좁혀지지 못했습니다.
type PrimaryColorRandom = ColorRandom.Red | ColorRandom.Green | ColorRandom.Blue; // 이전 타입 오류: Enum 타입 'ColorRandom'은 리터럴이 아닌 초기화 값을 갖는 멤버를 가지고 있습니다.
// 하지만 이제 그들에게도 자체 타입이 있기 때문에 작동합니다.
```

- --moduleResolution bundler: TS 4.7의 모듈 해결 전략 "node16"은 ES 모듈을 더 잘 모델링할 수 있게 해주지만 일부 불필요한 제약이 있었습니다(파일 확장자를 명시해야 했으며, ...). 번들러를 사용 중이라면, 새 전략은 최신 기능을 유지하면서 일부 제약을 제거하려고 시도합니다. 컴파일러 플래그 --moduleResolution bundle를 지정하여 사용할 수 있습니다(또는 tsconfig.json에서). 번들러를 사용할 때만 사용하세요.

<div class="content-ad"></div>

```json
...
"compilerOptions": [
  ...
  "moduleResolution": "bundler"
]
...
```

```json
import * as foo from './foo';
// 이제는 파일 확장자가 지정되지 않아도 다시 허용됩니다.
```

- 해상도 Customization Flags: "hybrid" 모듈 해상도에 대한 규칙을 설정합니다. 규칙은 다음과 같습니다: allowImportingTsExtensions, resolvePackageJsonExports (imports를 위해 package.json exports을 고려함), resolvePackageJsonImports (#로 시작하는 경로를 위해 로컬 package.json을 참조함), allowArbitraryExtensions 및 customConditions (node16 및 bundler 전용, package.json에서 조건부 exports 및 imports을 위해 사용됨)입니다. 이러한 모든 설정은 --를 접두사로 하여 컴파일러 플래그로 지정하거나 tsconfig.json에 지정할 수 있습니다.

```json
...
"compilerOptions": [
  ...
  "allowImportingTsExtensions": false,
  "resolvePackageJsonExports": true,
  "resolvePackageJsonImports": true,
  "allowArbitraryExtensions": false,
  "customConditions": ["my-condition"]
  // 이제는 `package.json`의 `exports` 및 `imports`에 대한 사용자 정의 조건을 해결하려고 시도합니다.
  // TS는 그런 다음 해당 사용자 정의 조건에 맞도록 파일을 매칭하려고 할 것입니다 (이 경우 `foo.mjs`).
]
...
```

<div class="content-ad"></div>

```js
{
  ...
  "exports": {
    ".": {
      "my-condition": "./foo.mjs",
      "node": "./bar.mjs",
      "import": "./baz.mjs",
      "require": "./biz.mjs"
    }
  }
}
```

- **--verbatimModuleSyntax:** 자동으로 import (import elision) 및 exports를 제거하지 않도록 TypeScript를 중지합니다. 이것은 import side effects가 사용될 때 또는 TS가 import가 어디에서 사용되는지 인식하지 못할 때 유용할 수 있습니다. import type 및 export type 문은 여전히 최종 컴파일에서 제거됩니다. 대개 import가 타입인지 아닌지 명시하는 것이 권장됩니다. compiler flag --verbatimModuleSyntax(또는 tsconfig.json에서)를 지정하여 사용할 수 있습니다.

```js
// `verbatimModuleSyntax`가 설정되지 않으면 이 import는 최종 컴파일에서 제거될 것입니다.
import { Car } from './car';
// 이 import는 아무 경우에나 제거될 것입니다.
import type { Car } from './car';
// 이 import는 절대로 제거되지 않습니다.
import { logCar } from './car';

export function drive(car: Car) {
  logCar(car);
  // ...
}
```

- **export type * 지원:** 기본 형식을 하위 모듈로 쉽게 다시 내보낼 수 있습니다.

<div class="content-ad"></div>

```js
// 기본 타입들을 다른 모듈로서 서브모듈로 내보냅니다.
export type * as am from 'another-module';
// 또는 다시 기본 내보낸 것으로 제공합니다.
export type * from 'another-module';
```

```js
import type { am } from 'module';
// 또는
import type { } from 'module';
```

- --build 하위에서 Emit-Specific 플래그 전달: 빌드에 대한 동작을 지정하는 플래그들 (--build를 사용할 때). 이들은 --declaration, --emitDeclarationOnly, --declarationMap, --sourceMap 및 --inlineSourceMap를 포함합니다. 모두 이제 컴파일러 플래그로 지정할 수 있습니다. 이전에는 tsconfig.json에서만 설정할 수 있었어요.

```js
# 이것은 `tsconfig.json`에서 비활성화되어 있더라도 타입 선언을 생성합니다.
tsc --build --declaration
```

<div class="content-ad"></div>

- 에디터에서 대소문자 구분 없는 import 정렬: 에디터에서 import를 정렬할 때 대소문자 구분 동작을 변경하세요. 이 기능은 VSCode의 JSON 설정 내 typescript.unstable 아래에서 활성화하고 구성할 수 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1032/1*Fei6JPgYzIgnl_IMekhOQg.gif)

- Exhaustive switch/case 자동 완성: 에디터에서 이제 리터럴 타입의 case 문을 자동으로 완성할 수 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:656/1*e9FNtf4-kxU787rEl1w9lQ.gif)