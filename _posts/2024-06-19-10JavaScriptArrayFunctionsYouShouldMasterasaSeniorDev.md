---
title: "시니어 개발자로서 꽁수 잘부리는데 꼭 알아야 할 10가지 JavaScript 배열 함수"
description: ""
coverImage: "/assets/img/2024-06-19-10JavaScriptArrayFunctionsYouShouldMasterasaSeniorDev_0.png"
date: 2024-06-19 22:56
ogImage: 
  url: /assets/img/2024-06-19-10JavaScriptArrayFunctionsYouShouldMasterasaSeniorDev_0.png
tag: Tech
originalTitle: "10 JavaScript Array Functions You Should Master as a Senior Dev"
link: "https://medium.com/@pinjarirehan/10-javascript-array-functions-you-should-master-as-a-senior-dev-bd8adf19e3d8"
---


![이미지](/assets/img/2024-06-19-10JavaScriptArrayFunctionsYouShouldMasterasaSeniorDev_0.png)

복잡한 웹 개발 프로젝트 중간에 있다고 상상해보세요. 여러 API에서 데이터가 들어오고, 그 데이터를 효율적으로 처리, 필터링 및 분석하는 것이 여러분의 임무입니다. 시간이 촉박하기 때문에 코드 한 줄 한 줄이 중요합니다.

이런 때에 고급 JavaScript 배열 메서드를 배워두면 정말 도움이 됩니다.

이러한 함수들은 코드를 줄이는데 그치지 않고 성능을 개선하고 개발 기술을 향상시킵니다.

<div class="content-ad"></div>

시니어 개발자라면 복잡한 작업을 빠르고 정확하게 수행할 수 있도록 알아야 하는 상위 열 가지 배열 함수를 살펴보겠습니다.

![array functions](https://miro.medium.com/v2/resize:fit:1400/1*zW-nrCob0sk8V4zQYCRXTQ.gif)

# 필수 10가지 배열 함수

## 1. forEach()

<div class="content-ad"></div>

당신은 배열의 각 항목을 방문하고 설정한 작업을 완료하는 신뢰할만한 도우미가 필요할 수 있습니다. 이것이 forEach()의 개요입니다.

각 요소에서 실행되는 콜백 함수를 사용하므로 로깅, DOM 수정 및 데이터 조작과 같은 부작용에 적합합니다.

```js
const fruits = ["사과", "바나나", "체리"];

fruits.forEach(fruit => console.log(fruit));
```

## 2. map()

<div class="content-ad"></div>

현재 배열을 기반으로 한 새로운 배열이 필요하다면 어떨까요? map() 함수는 각 요소에 콜백 함수를 적용한 결과로 새로운 배열을 생성합니다.

이 함수는 데이터 세트를 추출하고 데이터를 제공하며 계산을 수행하는 데 완벽합니다.

```js
const numbers = [1, 2, 3, 4];

const doubledNumbers = numbers.map(number => number * 2);
console.log(doubledNumbers);

// 출력 [2, 4, 6, 8]
```

## 3. filter()

<div class="content-ad"></div>

특정 요소만 VIP 영역에 접근할 수 있도록 확인하는 상황을 상상해 보세요. filter()는 콜백 함수 기반 테스트를 통과하는 항목만 포함된 새 배열을 생성합니다.

기준을 사용하여 데이터를 필터링하거나 원치 않는 항목을 제거하거나 사용자 지정 부분 배열을 만들 때 사용할 수 있습니다.

```js
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter(number => number % 2 === 0);
console.log(evenNumbers); 

// 결과 [2, 4]
``` 

## 4. reduce()

<div class="content-ad"></div>

`reduce()`은 전체 배열을 단일 값으로 통합해주는 무술 마스터입니다. 콜백 함수를 사용하여 작동합니다.

이 함수는 매우 유연하여 합계 및 평균을 계산하거나, 최대 및 최소 값을 찾는 것뿐만 아니라 복잡한 데이터 구조를 만드는 데도 사용할 수 있습니다.

```js
const numbers = [1, 2, 3, 4];

const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum); 

// 결과: 10
```

## 5. find()

<div class="content-ad"></div>

지정된 조건을 충족시키는 첫 번째 부분을 찾아야 하는가요? find()가 도와줄 것입니다.

이것은 콜백 함수에 의해 주어진 테스트를 통과하는 첫 번째 부분의 값을 반환하며, 빠른 조회와 전체 배열 루프를 제거하는 데 유용합니다.

```js
const numbers = [1, 2, 4, 5];

const firstGreaterThanThree = numbers.find(number => number > 3);
console.log(firstGreaterThanThree);

// 출력: 4
```

## 6. findIndex()

<div class="content-ad"></div>

findIndex()은 find()보다 한 단계 더 나아가서, 콜백 테스트를 통과하는 첫 번째 요소의 인덱스를 반환합니다.

배열 내에서 특정 데이터를 찾을 때, 배열에서의 위치에 따라 항목을 변경하고 집중적인 작업을 수행할 때 유용합니다.

```js
const numbers = [1, 2, 4, 5];

const indexOfFirstGreaterThanThree = numbers.findIndex(number => number > 3);
console.log(indexOfFirstGreaterThanThree);

// 출력: 2
```

## 7. some()

<div class="content-ad"></div>

특정 조건을 충족하는 항목이 배열에 있는지 확인해야 할 때가 있었나요? some() 메서드가 도움이 됩니다.

콜백 함수에 의해 수행된 테스트를 통과하는 요소가 최소 한 개 이상 있는지 찾습니다.

조건을 확인하거나 입력을 유효성 검사하거나 단일 일치하는 요소가 충분할 때 로직을 간단히 작성하는 데 사용할 수 있습니다.

```js
const numbers = [1, 5, 8, 12];

const hasElementGreaterThanTen = numbers.some(number => number > 10);
console.log(hasElementGreaterThanTen);

// 결과: true
```

<div class="content-ad"></div>

## 8. every()

every()은 some()의 엄격한 형제입니다. 배열 내 모든 항목이 콜백 함수에 의해 제공된 테스트를 통과하는 것을 보장합니다.

이는 데이터 유효성 검사, 지정된 구조를 따르는 각 요소 확인 및 품질 검사에 유용합니다.

```js
const data = ["apple", "banana", 10];

const allStrings = data.every(element => typeof element === "string");
console.log(allStrings);

// 결과: false
```

<div class="content-ad"></div>

## 9. includes()

가끔은 배열 안에 특정 값이 있는지 여부를 알고 싶을 때가 있습니다. includes()는 간단한 유효성 검사를 위한 최고의 친구입니다.

주어진 값이 배열에 존재하는지 빠르게 확인하여 개별 데이터 포인트 식별이나 배열 멤버십에 기반한 조건부 논리 생성에 중요합니다.

```js
const fruits = ["apple", "banana", "cherry"];

const hasOrange = fruits.includes("orange");
console.log(hasOrange);

// 출력: false
```

<div class="content-ad"></div>

## 10. flat()

다차원 배열이나 배열 안에 배열을 본 적이 있나요? 혼동스러울 수 있습니다. `flat()` 함수는 이를 닯은 배열로 변환하여 도와줍니다.

중첩된 배열을 간단하게 만들거나, 중첩 구조를 갖는 API로부터 데이터 작업을 할 때 유용하며, 추가 처리를 위해 데이터를 저장하는 데 도움이 됩니다.

```js
const nestedArray = [1, [2, 3], 4];

const flattenedArray = nestedArray.flat();
console.log(flattenedArray);

// 출력: [1, 2, 3, 4]
```

<div class="content-ad"></div>

# 몇 가지 전술

기본적인 내용을 배웠으니, 학습 범위를 확장할 몇 가지 고급 주제를 살펴보겠습니다:

## 배열 메소드 연결

여러 배열 메소드를 연결하여 복잡한 변화를 만들어내어 명확하고 이해하기 쉬운 결과를 얻을 수 있습니다.

<div class="content-ad"></div>

예를 들어, 배열에서 짝수만 걸러내고 해당 숫자들을 한 줄에 연관 있는 제곱값으로 매핑할 수 있습니다:

```js
const numbers = [1, 2, 3, 4, 5];

const evenSquares = numbers.filter(number => number % 2 === 0)
                           .map(number => number * number);

console.log(evenSquares);

// Output: [4, 16]
```

## 사용자 정의 콜백 함수

많은 배열 함수가 콜백 함수에 의존함을 기억하세요.

<div class="content-ad"></div>

극단적인 상황을 처리할 수 있는 강력하고 명확하게 정의된 콜백을 만들어주세요. 데이터 타입을 명시하여 타입 안전성을 보장하고 코드 유지보수성을 높일 수 있습니다.

예를 들어, 숫자가 짝수인지 확인하는 잘 정의된 콜백은 다음과 같이 보일 수 있습니다:

```js
function isEven(number) {
  if (typeof number !== 'number') {
    throw new TypeError('입력값은 숫자여야 합니다');
  }
  return number % 2 === 0;
}
```

## 에러 처리

<div class="content-ad"></div>

예기치 못한 데이터나 누락된 조각은 오류를 발생시킬 수 있습니다.

배열 함수 내에서 발생할 수 있는 가능한 오류를 다루는 방법을 논의해보세요.

예외 처리를 세련되게 다루기 위해 try-catch 구성 요소를 사용할 수 있습니다:

```js
const numbers = [1, "two", 3];

try {
  const doubledNumbers = numbers.map(number => number * 2);
  console.log(doubledNumbers);

// [2, NaN, 6] ("two"에 대한 오류)

} catch (error) {
  console
```

<div class="content-ad"></div>

## 성능에 대한 고려사항

모든 배열 메서드가 동일하게 만들어지진 않습니다. 큰 또는 복잡한 배열의 성능 영향(forEach와 for 루프의 차이 등)에 대해 간단히 논의해 봅니다.

- 메모리: 많은 데이터는 시스템을 과부하로 만들 수 있습니다.
- 루프: 대용량 배열에 접근하는 데 시간이 소요됩니다.
- 복잡한 요소: 배열 내 복잡한 데이터를 처리하는 것은 상당히 느립니다.

정말 큰 데이터 세트의 경우, 특히 최적화된 배열 함수 구현이 없을 수 있는 오래된 브라우저에서 효율성을 향상시키기 위해 전통적인 루프를 사용해 보세요.

<div class="content-ad"></div>

## 기능적 프로그래밍

배열 함수는 기능적 프로그래밍 방식에 잘 맞습니다.

기능적 프로그래밍은 순수 함수(부수 효과 없음)에 집중하며 변경할 수 없는 데이터와 작업합니다.

기존 데이터에서 새 배열을 구축하기 위해 배열 메서드를 사용하면 원래 데이터를 유효하게 유지하고 예측 가능성을 향상시키며 디버깅을 쉽게 만들 수 있습니다.

<div class="content-ad"></div>

# 최적의 방법들

- 함수 결합: 앞서 언급한대로 여러 작업을 연결하여 빠르고 강력한 작업을 수행하는 데 도움이 됩니다. 실험하고 섞어 복잡한 변경을 한 줄로 만들어보는 것을 두려워하지 마세요.
- 불변성: 가능할 때마다 이전 배열을 변경하는 대신 새로운 배열을 만드는 것을 시도해보세요. 이렇게 하면 가독성이 향상되고 원하지 않는 효과의 위험이 줄어듭니다. map, filter, slice와 같은 메서드를 사용하여 새로운 배열을 만들어보세요.
- 오류 처리: 이상한 입력이나 누락된 항목을 잡기 위해 콜백 습관에 작동하는 오류 처리를 항상 사용하세요. 이렇게 하면 결합 오류로 프로그램이 충돌하는 것을 방지할 수 있습니다.

# 마지막으로

이 10가지 배열 메서드를 마스터하면 JavaScript 초보자에서 어딘가로 (믿어주세요, 당신의 레벨이 올라갈 거에요).

<div class="content-ad"></div>

아래는 마크다운 형식의 코드입니다.


You’ll be able to create code that is easier to understand, more efficient, and more flexible, letting you work with data more effortlessly.

![Image 1](/assets/img/2024-06-19-10JavaScriptArrayFunctionsYouShouldMasterasaSeniorDev_1.png)

![Image 2](/assets/img/2024-06-19-10JavaScriptArrayFunctionsYouShouldMasterasaSeniorDev_2.png)
