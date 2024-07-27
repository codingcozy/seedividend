---
title: "JavaScript - ECMAScript 2024 ES15에 대해 새롭게 알아본 것들 - 깊이 있는 안내"
description: ""
coverImage: "/assets/img/2024-05-14-JavaScriptWhatsnewwithECMAScript2024ES15InDepthGuide_0.png"
date: 2024-05-14 14:02
ogImage: 
  url: /assets/img/2024-05-14-JavaScriptWhatsnewwithECMAScript2024ES15InDepthGuide_0.png
tag: Tech
originalTitle: "JavaScript — What’s new with ECMAScript® 2024 (ES15) — In Depth Guide"
link: "https://medium.com/@yourfuse/javascript-whats-new-with-ecmascript-2024-es15-ef056d2f4bf1"
---


![image](/assets/img/2024-05-14-JavaScriptWhatsnewwithECMAScript2024ES15InDepthGuide_0.png)

라이브 기사 — 최근 업데이트: 2024년 2월 7일.

프로그래밍 언어에서 새로운 기능을 발견하는 것은 휴일이나 생일처럼 기대감과 새로운 선물을 탐험하는 기쁨으로 가득한 흥미진진한 시간입니다. ES2024®의 제안된 기능으로 인해 개발자들은 JavaScript 코딩을 더 효율적이고 가독성 있고 견고하게 만들어 주는 다양한 향상을 풀어나가려는 이유입니다. 최상위 await의 직관적인 구문부터 파이프라인 연산자의 표현력 있는 기능, 그리고 불변 레코드와 튜플의 신뢰성까지, 각 새로운 기능은 선택된 선물처럼 주어져서 JavaScript 생태계를 발전시키고 개발자들에게 더 많은 도구를 제공하기 위해 공들여 디자인되었습니다.

ECMAScript 2024 국제화 API 사양(ECMA-402 11판)에 따르면 ES2024에는 여러 기능이 포함될 예정입니다.



그냥 유의해 주세요. 몇 가지는 여전히 "제안 사항"이라서 조금씩 변경될 수 있지만, 다행히도 이 문서는 승인된 변경 사항에 맞춰 조정될 것입니다!

더 이상 미루지 말고…

# 잘 형성된 유니코드 문자열

이 기능은 JavaScript가 유니코드 문자열을 처리하는 방식을 개선하려는 것입니다. 유니코드 문자열은 다양한 언어와 기호를 나타내는 데 중요합니다. 이 업데이트는 다른 JavaScript 환경에서 이러한 문자열을 일관되고 정확하게 처리할 수 있도록 보장할 것입니다.



```js
const sampleStrings = [
  // 혼자 있는 대체문자가 포함된 예제
  "igor\uD800", // 앞 부분 대체문자
  "igor\uD800komolov", // 앞 부분 대체문자 뒤에 텍스트
  "\uDC00yourfuse",    // 뒷 부분 대체문자
  "your\uDC00fuse",    // 뒷 부분 대체문자 뒤에 텍스트
  
  // 올바르게 작성된 예제
  "yourFuse",       // 대체문자 없는 일반 문자열
  "emoji\uD83D\uDE00", // 완전한 대체 문자 쌍(이모지)을 갖는 문자열
];

sampleStrings.forEach(str => {
  console.log(`처리된 문자열: ${str.toWellFormed()}`);
});

// 기대 출력:
// "처리된 문자열: igor�"
// "처리된 문자열: igor�komolov"
// "처리된 문자열: �yourfuse"
// "처리된 문자열: your�fuse"
// "처리된 문자열: yourFuse"
// "처리된 문자열: emoji😀"
```

위의 예제에서는 toWellFormed() 메소드가 혼자 있는 대체 문자와 올바르게 작성된 문자열이 포함된 문자열 배열에 적용됩니다. 이 메소드는 혼자 있는 대체 문자를 올바르게 작성된 유니코드 문자열로 변환하여 잘못된 시퀀스를 대체 문자로 바꾸며, 이미 올바르게 작성된 문자열은 변경하지 않습니다.

```js
const problematicURL = "https://yourfuse.com/query=\uDC00data";

try {
  encodeURI(problematicURL);
} catch (e) {
  console.log('에러:', e.message); // 기대 결과: URIError: URI malformed
}

// toWellFormed()를 사용하여 에러 방지
console.log('올바른 형식의 URI:', encodeURI(problematicURL.toWellFormed())); 
// 기대 출력: "https://yourfuse.com/query=%EF%BF%BDdata"
```

- problematicURL 변수에는 뒷 부분 대체 문자(\uDC00)를 포함한 URL이 들어 있습니다.
- encodeURI()로 이 URL을 인코딩하려고 하면 잘못된 유니코드 문자열로 인해 URIError가 발생합니다.
- toWellFormed()를 적용하면 혼자 있는 대체 문자가 유니코드 대체 문자(U+FFFD, %EF%BF%BD로 인코드)로 대체되어 encodeURI()가 오류 없이 처리할 수 있게 됩니다.



# Atomic waitSync

이 추가 사항은 주로 공유 메모리 컨텍스트에서 동시 작업을 대상으로 합니다. 이는 데이터 무결성을 보장하고 멀티스레드 작업에서 경합 조건을 방지하는 데 중요한 동기화 메커니즘을 제공합니다. 예를 들어, waitSync는 여러 작업자 간의 공유 버퍼에 대한 액세스를 동기화하는 데 사용될 수 있습니다.

아직 예제가 제공되지 않아 문서가 아직 작성 중이므로 어떻게 구현될지 보여드릴 수 없습니다. 그러나 기존 Atomics 메서드를 기반으로 가정을 할 수 있습니다. 다음과 같습니다...

```js
// sharedArray가 SharedArrayBuffer임을 가정합니다.
const sharedArray = new Int32Array(new SharedArrayBuffer(1024));

function performSynchronizedOperation(index, value) {
    // waitSync 메서드는 특정 조건이 충족될 때까지 실행을 차단합니다.
    // 예를 들어, 지정된 인덱스의 값이 0이 아닌 값이 될 때까지 기다릴 수 있습니다.
    Atomics.waitSync(sharedArray, index, 0);

    // 공유 메모리에서 작업 수행
    sharedArray[index] = value;

    // 다른 스레드나 작업자에게 인덱스의 값이 업데이트되었음을 알립니다.
    Atomics.notify(sharedArray, index, 1);
}

// 웹 워커나 다른 스레드에서
performSynchronizedOperation(0, 123);
```



# 정규 표현식의 v 플래그와 집합 표기법 + 문자열 속성

자바스크립트의 정규 표현식에 대한 이 개선 사항은 더 복잡한 패턴 매칭과 문자열 조작을 가능하게 합니다. 'v' 플래그와 집합 표기법을 사용하면 더 정확하고 표현력 있는 정규식 패턴을 생성할 수 있습니다. 예를 들어, 이 기능을 사용하여 특정 유니코드 속성을 가진 문자 집합을 일치시킬 수 있습니다.

```js
// 차이/빼기
[A--B]

// 교집합
[A&&B]

// 중첩된 문자 클래스
[A--[0-9]]
```

A와 B는 문자 클래스(예: [a-z])나 속성 이스케이프를 나타냅니다. 제안에 대한 설명적인 예제와 FAQ을 확인할 수 있습니다.



# 최상위 await

이 "Just Do It" 기능은 await 키워드가 비동기 함수 외부에서도 사용되도록 허용하여 비동기 코드를 더 쉽게 작성하고 읽을 수 있게 합니다. 예를 들어, 모듈의 최상위 수준에서 프로미스를 직접 await할 수 있어 모듈 가져오기 또는 데이터 비동기로 가져오는 코드를 간소화할 수 있습니다.

```js
// 최상위 await 사용
const data = await fetchData();
console.log(data);
```

정말로 무겁고 복잡한 async/await 구조에 새로운 바람을 불어넣어 줍니다!



# 파이프라인 연산자

파이프라인 연산자(`|`)는 여러 함수 호출로 이루어진 코드의 가독성을 향상시킵니다. 이는 함수형 스타일 구문을 허용하여 식의 결과를 다음 함수의 인자로 전달할 수 있게 합니다. 예를 들어, 중첩된 함수 호출을 명확한 연산 순서로 재구성할 수 있습니다:

```js
// 파이프라인 연산자 없이
const calculatedValue = Math.ceil(Math.pow(Math.max(0, -10), 1/3));

// 파이프라인 연산자 사용 시
const calculatedValue = -10
  |> (n => Math.max(0, n)) // Math.max 대체
  |> (n => Math.pow(n, 1/3)) // Math.pow 대체
  |> Math.ceil; // Math.ceil 사용
```

이 예제에서:



- Math.max 함수는 숫자가 음수가 아닌지 확인합니다.
- Math.pow 함수는 세제곱근을 계산합니다 (1/3의 거듭제곱).
- Math.ceil 함수는 숫자를 가장 가까운 정수로 올립니다.

파이프라인 연산자(`|`)는 이러한 작업들을 연쇄적으로 쉽게 할 수 있게 해주어 코드를 더 읽기 쉽게 만듭니다.

이제 다음은 데이터 변환에 파이프라인 연산자가 얼마나 유용한지 보여주는 예제입니다:

```js
// 파이프라인 연산자는 일련의 함수들을 명확하고 간결한 방식으로 연쇄적으로 적용하여 복잡한 데이터 조작을 간단하게 합니다.

const numbers = [10, 20, 30, 40, 50];

const processedNumbers = numbers
  |> (_ => _.map(n => n / 2)) // 각 숫자를 절반으로 나누기
  |> (_ => _.filter(n => n > 10)); // 10보다 작거나 같은 숫자 제외하기

console.log(processedNumbers); // [15, 20, 25]
```  



이 예제에서:

- map 함수는 배열 내의 각 숫자를 절반으로 나눕니다.
- filter 함수는 10 이하인 숫자를 제거합니다.
- 파이프라인 연산자 (|`)를 사용하여 이러한 변환을 우아하게 연결하여 코드 가독성을 향상시킵니다.

기억하세요, 파이프라인 연산자는 여전히 "Draft" 상태인 TC39의 단계 2에 있습니다.

# 레코드 및 튜플



이 변하지 않는 데이터 구조들은 각각 객체와 배열과 유사하지만 생성 후 수정할 수 없습니다. 예를 들어, 레코드나 튜플을 업데이트하면 새로운 인스턴스가 생성됩니다:

```js
// 불변한 레코드 생성
const userProfile = #{
  username: "IgorKomolov",
  age: 39,
};

// 불변한 튜플 생성
const numberSequence = #[10, 20, 30];

// 이러한 구조를 업데이트하면 새로운 인스턴스가 생성됩니다
const updatedProfile = userProfile.with({ age: 40});
console.log(updatedProfile); // #{ username: "IgorKomolov", age: 40 }
console.log(userProfile); // #{ username: "IgorKomolov", age: 39 } (변하지 않음)

const newNumberSequence = numberSequence.with(1, 25);
console.log(newNumberSequence); // #[10, 25, 30]
console.log(numberSequence); // #[10, 20, 30] (변하지 않음)
```

레코드는 객체와 유사하게 동작하고, 튜플은 배열과 유사합니다. 그러나 그들의 핵심 특징은 불변성입니다.

레코드와 튜플은 특정 상황에서 성능을 향상시키고 코드베이스에서 불변성을 강제할 수 있습니다. 이들은 제안의 2단계에 있으며 아직 JavaScript 엔진에 구현되지는 않았지만, 개발자들은 Babel과 같은 트랜스파일러를 사용하여 이들을 실험할 수 있습니다.



# 데코레이터

이제 이게 가능해졌어요, TypeScript에 감사해요! 클래스, 메서드, 속성 또는 매개변수의 동작을 수정하거나 확장하는 기능을 제공합니다. 주석 추가, 로깅 또는 선언적 방식으로 동작을 수정하는 데 특히 유용합니다:

```js
// 메서드 실행을 추적하기 위해 데코레이터 적용
class SampleClass {
  @trackExecution
  performAction(parameter1, parameter2) {
    // 메서드 구현 내용이 여기에 있습니다
  }
}
```

이 예시에서:



- SampleClass는 정의되는 클래스입니다.
- @trackExecution은 performAction 메서드 호출을 기록하거나 추적하기 위해 사용되는 데코레이터입니다.
- performAction은 SampleClass 내의 메서드로, 두 개의 매개변수(parameter1 및 parameter2)를 사용합니다. 이 데코레이터는 이 메서드에 대한 각 호출을 기록하거나 추적합니다.

# 패턴 매칭

이 기능은 복잡한 데이터 구조의 비구조화 및 일치에 대한 간결한 구문을 소개하여 코드 가독성을 높이고 보일러플레이트를 줄입니다.

(연구 중) 더 많은 정보가 곧 제공될 예정이니 나중에 다시 확인해주세요!



# Temporal

잠시만요! 엄청 오래전에 기획되었지만, 업데이트된 Temporal은 JavaScript를 위해 제안된 최신 및 포괄적인 날짜 및 시간 API로, 현재 Stage 3에 있어요. 기존 Date 객체의 제한 사항과 복잡성 중 많은 부분을 해결하기 위해 설계되었어요. 여기 ES2024에서 Temporal을 사용하는 몇 가지 예시가 있어요:

이 객체는 현재 시간에 대한 Temporal 값을 생성하기 위한 여러 팩토리 메서드를 제공해요.

## UTC에서 현재 시간 가져오기




Temporal.Now.instant().toString()

## 특정 시간대에서 현재 존재하는 날짜 및 시간 가져오기

Temporal.Now.zonedDateTimeISO(`Asia/Shanghai`).toString()

## ISO 형식의 현재 플레인 날짜 및 시간 가져오기




표를 아래와 같이 Markdown 형식으로 변경해주세요.

Temporal.Now.plainDateTimeISO().toString()

## 현재 plain 시간을 ISO 형식으로 얻기

Temporal.Now.plainTimeISO().toString().

## ZonedDateTime.prototype의 속성



Temporal의 ZonedDateTime 클래스에는 날짜 및 시간 정보를 자세히 조작하고 검색할 수 있는 여러 속성과 메서드가 있습니다.

- 이러한 속성 및 메서드에는 달력, 시간대, 연도, 월, 일, 시간, 분, 초 및 나노초를 반환하는 getter가 포함됩니다.
- .with(), .add(), .subtract(), .until(), .since(), .round()과 같은 메서드도 포함되어 있어, 지역 시간 값을 다루는 데 풍부한 기능을 제공합니다.

## Temporal의 Plain Time 클래스

Temporal은 시간대 없이 시간을 나타내는 추상 클래스인 "plain" 클래스를 소개합니다.



- 이러한 클래스에는 PlainDateTime, PlainDate 및 PlainTime이 포함됩니다.
- 이들은 특정 시간대에서 벽시간을 표시하거나 1984년 6월의 첫 번째 화요일을 찾는 것과 같이 시간대가 중요하지 않은 시간 계산에 유용합니다.

이 예시들은 ES2024의 Temporal이 JavaScript에서의 날짜 및 시간 처리를 간단하고 향상시킬 수 있다는 것을 보여줍니다. 개발자들에게 더 견고하고 다재다능한 도구를 제공합니다.

지금 사용해보고 싶으신가요? 문제없어요!

제안을 가져오거나 Babel Polyfil을 사용해보세요. 이렇게 제안을 가져오는 방법이 있습니다...



```js
//네 맞아요, 제안서도 가져올 수 있어요 :)
import { Temporal } from '@std/proposal-temporal';


//기본 연산
const now = Temporal.Now.zonedDateTimeISO('America/New_York');
console.log(now.toString());

//조작 및 비교

const date = Temporal.PlainDate.from('2024-01-01');
const newDate = date.add({ days: 10 });
console.log(newDate.toString()); // 결과 '2024-01-11'
```

# 에르고노믹 브랜드 체크

사용자 지정 클래스 및 데이터 구조에서 객체 타입을 확인하는 것을 단순화하여 유형 검증을 더 직관적이고 실수를 줄입니다. 이제 부모 복제본은 보지 않을 거예요!

## 전통적인 방법 (ES2024 이전)



```js
class Book {
    #author;

    constructor(author) {
        this.#author = author;
    }

    static hasAuthorField(obj) {
        try {
            obj.#author; // 비공개 필드에 접근 시도
            return true; // 접근 성공
        } catch (err) {
            if (err instanceof TypeError) {
                return false; // 접근 실패, 필드가 존재하지 않음
            }
            throw err; // 다른 오류는 다시 던짐
        }
    }
}

// 사용 예시:
const myBook = new Book("Igor Komolov");
console.log(Book.hasAuthorField(myBook)); // 예상 결과: true

const otherObject = {};
console.log(Book.hasAuthorField(otherObject)); // 예상 결과: false
```

## 새로운 ES2024 방식

```js
class BookES2024 {
    #author;

    constructor(author) {
        this.#author = author;
    }

    static hasAuthorField(obj) {
        return #author in obj; // 비공개 필드를 확인하는 새로운 ES2024 구문
    }
}

// 사용 예시:
const myBook2024 = new BookES2024("Igor Komolov");
console.log(BookES2024.hasAuthorField(myBook2024)); // 예상 결과: true

const otherObject2024 = {};
console.log(BookES2024.hasAuthorField(otherObject2024)); // 예상 결과: false
```

이 예제에서 Book 클래스는 전통적인 방식을 보여주고, BookES2024는 새로운 ES2024 구문을 사용합니다. hasAuthorField 정적 메소드는 #author 비공개 필드가 객체에 존재하는지 확인하며, 각 클래스에서 서로 다른 접근 방식을 사용합니다.



# Realms API

이 API는 격리된 JavaScript 환경을 만드는 메커니즘을 제공합니다. 안전한 코드 실행 및 샌드박싱에 유용하며, 제어된 격리된 컨텍스트에서 코드를 실행할 수 있게 합니다. 게다가, 이름도 너무 멋져요!

## Realm 생성 및 간단한 표현식 평가

```js
const igorsRealm = new Realm();
igorsRealm.evaluate('3 * 5'); // Igor의 영역에서 15로 계산됨
```



## 다른 영역 간 심볼 공유

```js
const igorsRealm = new Realm();
Symbol.for('y') === igorsRealm.evaluate('Symbol.for("y")'); // true 반환, 공유된 심볼 'y'
```

## 자동 래핑된 함수 사용

한 영역에서 다른 영역으로 전송된 호출 가능한 객체의 경우 대상 영역에서 래핑된 함수 이국적 객체가 생성됩니다. 호출되는 경우 래핑된 함수는 원래 영역의 연결된 함수로 호출을 연결합니다.



```js
const igorsRealm = new Realm();
const doubleFunction = igorsRealm.evaluate('num => num * 2');
doubleFunction(10); // 결과: 20
```

## 콜백을 이용한 함수 평가

```js
const igorsRealm = new Realm();
const processNumber = igorsRealm.evaluate('(number, callback) => callback(number + 5)');
processNumber(5, (result => console.log(result))); // 로그: 10 (5 + 5)
```

## 제한된 전역 컨텍스트 접근




글로벌 객체인 globalThis, 배열 또는 Object.prototype에 realm.evaluate를 통해 직접 액세스하는 것은 TypeError를 발생시킵니다.

```js
const igorsRealm = new Realm();
igorsRealm.evaluate('this'); // TypeError 발생
igorsRealm.evaluate('new Array()'); // TypeError 발생
igorsRealm.evaluate('Object.keys({})'); // TypeError 발생
```

ES2024에서 예정된 새로운 기능들은 자바스크립트 코딩에 접근하는 방식을 혁신할 것으로 예상됩니다. 이러한 향상들은 코드 가독성과 효율성을 향상시키는 것뿐만 아니라 불변 데이터 구조와 고급 패턴 매칭과 같은 강력한 새로운 패러다임을 소개하기도 합니다. 이러한 기능들이 제안에서 구현으로 이동할 때, 개발자들이 더 깨끗하고 유지보수 가능하며 표현력이 풍부한 자바스크립트 코드를 작성할 수 있는 새로운 가능성을 열어줍니다. 이러한 진보로운 발전과 함께 자바스크립트의 미래는 밝아보이며, 현대 웹 개발의 중요한 요충지가 된 언어의 지속적인 발전을 시사합니다.