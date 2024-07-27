---
title: "RxJS Creation Operators 마스터하기"
description: ""
coverImage: "/assets/img/2024-05-18-MasteringRxJSCreationOperatorsUnlockingthePowerofDataStreams_0.png"
date: 2024-05-18 22:03
ogImage: 
  url: /assets/img/2024-05-18-MasteringRxJSCreationOperatorsUnlockingthePowerofDataStreams_0.png
tag: Tech
originalTitle: "Mastering RxJS Creation Operators: Unlocking the Power of Data Streams"
link: "https://medium.com/@nandeepbarochiya/mastering-rxjs-creation-operators-unlocking-the-power-of-data-streams-e9f126c87e72"
---


반응형 프로그래밍은 현대 웹 개발에서 중요한 기반 기술이 되었으며 비동기 데이터 스트림을 처리하는 견고한 방법을 제공합니다. RxJS 또는 JavaScript용 반응형 익스텐션은 JavaScript에서 반응형 프로그래밍을 구현하는 가장 인기있는 라이브러리 중 하나입니다. 생성 연산자는 여러 기능 중에서도 관찰 가능한 스트림을 생성하는 데 필수적인 도구로 강조됩니다. 이 블로그 포스트에서는 다양한 RxJS 생성 연산자, 작동 방식 및 각각에 대한 실제 사용 사례를 살펴보겠습니다.

![image](/assets/img/2024-05-18-MasteringRxJSCreationOperatorsUnlockingthePowerofDataStreams_0.png)

## RxJS 생성 연산자란?

이러한 연산자는 다양한 데이터 소스에서 새로운 Observables를 생성합니다. 이러한 연산자는 개발자들이 작업할 데이터 스트림의 소스를 정의할 수 있도록 해주기 때문에 중요합니다. 이러한 연산자를 이해하는 것은 RxJS의 전체 기능을 최대한 활용하는 데 필수적입니다.

<div class="content-ad"></div>

# Creation Operators 목록

(참고: “⭐ — 일반적으로 사용됨”)

- ⭐ajax: Ajax 요청을 위한 observable을 생성하는 데 사용됩니다.
- bindCallback: 콜백 스타일 함수를 observable로 변환합니다.
- bindNodeCallback: bindCallback과 유사하지만, Node.js 스타일 콜백(error-first)을 위한 것입니다.
- defer: observable의 생성을 구독 지점까지 지연시킵니다.
- empty: 어떤 값도 방출하지 않고 즉시 완료되는 observable을 생성합니다.
- ⭐from: 다양한 다른 객체 및 데이터 유형을 observable로 변환합니다.
- ⭐fromEvent: DOM 이벤트 대상 또는 Node.js EventEmitter에서 이벤트를 방출하는 observable을 생성합니다.
- fromEventPattern: 주어진 addHandler/removeHandler 함수 쌍에서 observable을 생성합니다.
- generate: 제공된 반복 함수에 기반하여 시간이 지남에 따라 값들을 생성합니다.
- ⭐interval: 지정된 간격에서 증가하는 숫자를 방출하는 observable을 생성합니다.
- ⭐of: 값의 시퀀스를 observable 시퀀스로 방출합니다.
- range: 지정된 범위 내의 숫자 시퀀스를 방출합니다.
- throwError: 오류를 방출하는 observable을 생성합니다.
- timer: 지정된 지연 후 단일 값을 방출합니다.
- iif: 두 가지 가능한 원본 observable 중 하나에 조건부로 구독합니다.

이제 Creation Operator를 하나씩 검토하고 예제를 통해 학습하겠습니다.

<div class="content-ad"></div>

# Ajax

XMLHttpRequest API를 사용하여 HTTP 요청을 보냅니다.

```js
/* 실시간 사용 사례: 요청에서 반환되는 응답 객체를 방출하는 Observable */
import { ajax } from 'rxjs/ajax';

const githubUsers = `https://api.github.com/users?per_page=2`;
const users = ajax(githubUsers);

const subscribe = users.subscribe(
  res => console.log(res),
  err => console.error(err)
);
```

```js
/* 실시간 사용 사례: 요청에서 반환되는 응답 객체의 json 키만 방출하는 Observable */
import { ajax } from 'rxjs/ajax';

const githubUsers = `https://api.github.com/users?per_page=2`;
const users = ajax.getJSON(githubUsers);

const subscribe = users.subscribe(
  res => console.log(res),
  err => console.error(err)
);
```  

<div class="content-ad"></div>

# bindCallback

콜백 스타일의 함수를 Observable로 변환합니다.

```js
/* 실시간 사용 사례: jQuery의 getJSON을 Observable API로 변환하는 방법 */

import { bindCallback } from 'rxjs';
import * as jQuery from 'jquery';

const getJSONAsObservable = bindCallback(jQuery.getJSON);
const result = getJSONAsObservable('/my/url');
result.subscribe(x => console.log(x), e => console.error(e));
```

# bindNodeCallback

<div class="content-ad"></div>

- 노드 스타일 콜백 함수를 Observable로 변환합니다.

```js
/* 실시간 사용 사례: 파일 시스템에서 파일 읽어오기 및 데이터를 Observable로 얻기 */
import { bindNodeCallback } from 'rxjs';
import * as fs from 'fs';

const readFileAsObservable = bindNodeCallback(fs.readFile);
const result = readFileAsObservable('./roadNames.txt', 'utf8');

result.subscribe(
  x => console.log(x), // 파일 내용 처리
  e => console.error(e) // 오류 처리
);
```

- `defer`

Subscriber가 Observable에 구독할 때까지 실행을 지연시키는 Observable를 생성합니다.

<div class="content-ad"></div>

RxJS에서 defer는 Observable을 생성하는 함수입니다. 주요 목적은 Observable이 구독될 때까지 Observable의 생성을 지연하는 것입니다. 이는 새로운 옵저버가 Observable을 구독할 때마다 설정 또는 초기화 논리가 실행되어야 하는 시나리오에서 유용합니다.

```js
/* 실시간 사용 사례: `of`를 사용하여 난수 생성 */
import { of, defer } from 'rxjs';
const randomOf$ = of(Math.random());

// 랜덤 숫자 생성을 위해 `defer` 사용
const randomDefer$ = defer(() => of(Math.random()));

// `randomOf$`를 여러 번 구독
randomOf$.subscribe(randomNumber => console.log('랜덤 숫자 (of):', randomNumber));
randomOf$.subscribe(randomNumber => console.log('랜덤 숫자 (of):', randomNumber));
randomOf$.subscribe(randomNumber => console.log('랜덤 숫자 (of):', randomNumber));

// `randomDefer$`를 여러 번 구독
randomDefer$.subscribe(randomNumber => console.log('랜덤 숫자 (defer):', randomNumber));
randomDefer$.subscribe(randomNumber => console.log('랜덤 숫자 (defer):', randomNumber));
randomDefer$.subscribe(randomNumber => console.log('랜덤 숫자 (defer):', randomNumber));
```

Output

```js
랜덤 숫자 (of): 0.123456789
랜덤 숫자 (of): 0.123456789
랜덤 숫자 (of): 0.123456789
랜덤 숫자 (defer): 0.987654321
랜덤 숫자 (defer): 0.654321987
랜덤 숫자 (defer): 0.123456789
```

<div class="content-ad"></div>

# 빈

빈 Observable을 생성하고 즉시 완료 콜백을 호출합니다.

RxJS의 빈 연산자는 값을 방출하지 않고 즉시 완료되는 Observable을 생성합니다. 값이 방출될 필요가 없지만 완료를 신호해야 하는 경우에 유용합니다.

```js
/* 실시간 사용 사례: 빈 Observable 생성 */
import { empty } from 'rxjs';
const emptyObservable$ = empty();
// 빈 Observable에 구독하기
emptyObservable$.subscribe({
  next: () => console.log('다음 값'), // 호출되지 않음
  complete: () => console.log('완료됨') // 즉시 호출됨
});
```

<div class="content-ad"></div>

# from

배열, 프로미스, 이터러블 객체 또는 Observable과 유사한 객체에서 Observable을 생성합니다.

```js
import { from } from 'rxjs';
const arraySource = from([1, 2, 3, 4, 5]);
const subscribe = arraySource.subscribe(val => console.log(val));
//출력: 1, 2, 3, 4, 5
```

```js
import { from } from 'rxjs';
const source = from('Hello World');
const subscribe = source.subscribe(val => console.log(val));
//출력: 'H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd'
```

<div class="content-ad"></div>


```js
const numbers = from(new Promise((resolve, reject) => resolve('Hello World')));
numbers.subscribe((data) => {
  console.log(data);
});
//output: Hello World
```

# fromEvent

- 이벤트에서 Observable을 생성합니다.

```js
/* 실시간 사용 사례: 사용자가 화면을 클릭할 때 시간 추적 */
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const source = fromEvent(document, 'click');
const example = source.pipe(map(event => event.timeStamp));
const subscribe = example.subscribe(val => console.log(`이벤트 시간: ${val / 1000} 초`));
```

<div class="content-ad"></div>

출력

```js
이벤트 시간: 5.418900000000373 초
이벤트 시간: 7.552900000000372 초
```

# fromEventPattern

fromEventPattern은 이벤트를 반환하는 함수에서 Observable을 생성합니다. fromEventPattern을 사용하면 이벤트 처리기 함수를 등록하는 API를 Observable로 변환할 수 있습니다. fromEvent과 유사하지만 훨씬 유연합니다. fromEvent의 모든 사용 사례는 fromEventPattern으로 쉽게 처리할 수 있습니다.

<div class="content-ad"></div>

# 생성

함수를 기반으로 값을 생성하는 옵저버블을 생성합니다.

```js
/* 실시간 사용 사례: 숫자 시퀀스 생성 */

import { generate } from 'rxjs';
const result = generate(0, x => x < 3, x => x + 1, x => x);
result.subscribe(x => console.log(x));

// 결과:
// 0
// 1
// 2
```

# 간격

<div class="content-ad"></div>

일정한 간격으로 정수 시퀀스를 방출하는 Observable을 생성합니다.

```js
/* 실시간 사용 사례: 1초 간격으로 값 시퀀스를 방출 */
import { interval } from 'rxjs';

// 1초마다 시퀀스 값 방출
const source = interval(1000);
const subscribe = source.subscribe(val => console.log(val));
//결과: 0, 1, 2, 3, 4, 5....
```

# of

- 지정된 값을 순서대로 방출하는 Observable을 생성합니다.

<div class="content-ad"></div>

```js
import { of } from 'rxjs';

of(10, 20, 30)
  .subscribe({
    next: value => console.log('다음 값:', value),
    error: err => console.log('에러 발생:', err),
    complete: () => console.log('완료'),
  });

// 결과
// 다음 값: 10
// 다음 값: 20
// 다음 값: 30
// 완료
```

# range

지정된 범위 내에서 숫자의 시퀀스를 방출하는 Observable을 생성합니다.

```js
/* 실시간 사용 사례: 1에서 10까지 순차적으로 방출 */

import { range } from 'rxjs';
const source = range(1, 10);
const example = source.subscribe(val => console.log(val));
// 출력: 1,2,3,4,5,6,7,8,9,10
```

<div class="content-ad"></div>

# throwError

- 구독 시 오류를 발생시키는 Observable을 생성합니다.

```js
/* 구독 시 오류 발생 */
import { throwError } from 'rxjs';
// 특정 값과 함께 오류를 발생시킵니다.

const source = throwError('오류 발생!');
// 출력: 'Error: 오류 발생!'

const subscribe = source.subscribe({
  next: val => console.log(val),
  complete: () => console.log('완료!'),
  error: val => console.log(`오류: ${val}`)
});
```

# timer

<div class="content-ad"></div>

- 특정 시간 간격 후에 발행을 시작하고 정수 시퀀스를 발행하는 Observable를 생성합니다.

```js
/* 실제 시나리오: 타이머는 1초 후에 발행을 시작하고 그 이후 매 2초마다 값을 발행합니다 */

import { timer } from 'rxjs';

/*
  timer 함수는 두 번째 인자를 가지며, 연속적으로 값들을 발행하는 빈도를 정의합니다.
  이 경우, 1초 후에 첫 번째 값을 발행하고 그 이후 2초마다 값을 발행합니다.
*/
const source = timer(1000, 2000);
//출력: 0,1,2,3,4,5......
const subscribe = source.subscribe(val => console.log(val));
```

# iif

조건에 따라 함수의 출력을 발행하는 Observable를 생성합니다.

<div class="content-ad"></div>

```js
/* Observable에 대한 액세스 제어 */

import { iif, of, EMPTY } from 'rxjs';
 
let accessGranted;
const observableIfYouHaveAccess = iif(
  () => accessGranted,
  of('액세스가 허용된 것 같아요...'),
  EMPTY
);
 
accessGranted = true;
observableIfYouHaveAccess.subscribe({
  next: value => console.log(value),
  complete: () => console.log('끝')
});
 
// 출력:
// '액세스가 허용된 것 같아요...'
// '끝'
 
accessGranted = false;
observableIfYouHaveAccess.subscribe({
  next: value => console.log(value),
  complete: () => console.log('끝')
});
 
// 출력:
// '끝'
```

요약하면, RxJS Creation Operators는 JavaScript에서 반응형 프로그래밍의 기본 구성 요소입니다. 다양한 데이터 소스에서 Observable을 생성할 수 있게 해줌으로써, 이러한 연산자는 비동기 데이터 스트림을 효율적으로 처리할 수 있도록 개발자들을 지원합니다. API에서 데이터를 가져오는 ajax, 사용자 상호 작용에 반응하는 fromEvent, interval 및 timer를 사용하여 작업을 예약하는 등, 이러한 연산자들은 반응형 애플리케이션에서 데이터 흐름을 유연하고 강력하게 관리할 수 있는 방법을 제공합니다. 이러한 생성 연산자를 숙달하는 것은 RxJS의 모든 잠재력을 발휘하고 반응형 프로그래밍을 통한 반응형, 확장 가능하고 유지보수 가능한 애플리케이션을 구축하는 데 필수적입니다. 이 연산자들을 깊이 이해하고 그 기능을 실험하며, RxJS를 활용한 반응형 프로그래밍 마스터의 길에 나아가 보세요.

즐거운 코딩되세요!
