---
title: "JavaScript로 배열 흉내내기 Objectassign, arr 방법"
description: ""
coverImage: "/assets/img/2024-06-22-JavaScriptFakesArraysObjectassignarr_0.png"
date: 2024-06-22 12:53
ogImage:
  url: /assets/img/2024-06-22-JavaScriptFakesArraysObjectassignarr_0.png
tag: Tech
originalTitle: "JavaScript Fakes Arrays: Object.assign({}, arr)"
link: "https://medium.com/@grigor.oganesyan/unmasking-javascript-the-fake-arrays-cd2cf3cd5150"
isUpdated: true
---

## 자바스크립트에서 배열은 사실 객체임을 비밀로 만들 필요가 없습니다. 그런데 이를 무시하는 대신, 배열에 객체 메소드를 적용해보면 어떨까요?..

![이미지](/assets/img/2024-06-22-JavaScriptFakesArraysObjectassignarr_0.png)

## 1. Object.assign()

자바스크립트는 배열을 객체로 변환하는 데 전혀 문제가 없다고 인식합니다:

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
const arr = [1, 2, 3];
const newObj = Object.assign({}, arr);
console.log(newObj); // 출력: {0: 1, 1: 2, 2: 3}
```

하지만 재미있는 점은 인수를 바꾸고 일부 비어 있지 않은 객체를 사용하는 경우 발생합니다:

```js
const arr = [1, 2, 3];
const newObj = Object.assign(arr, { a: 4, b: 5 });
console.log(newObj); // 출력: (3) [1, 2, 3, a: 4, b: 5]
```

이제 "무언가"를 찾을 수 없는 전형적인 이름을 가진: 반 배열 — 반 객체입니다. 이것이 어떻게 동작하는지는 심지어 더더욱 우스꽝스럽습니다:

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
const arr = [1, 2, 3];
const newObj = Object.assign(arr, { a: 4, b: 5 });
console.log(newObj); // Output: [1, 2, 3, a: 4, b: 5]
console.log(arr.a); // Output: 4
console.log(arr.length); // Output: 3
console.log(JSON.stringify(arr)); // Output: [1,2,3]
```

자바스크립트는 괴상한 짓을 할 때 양심에 찔리는 듯한 척합니다. 한쪽에서는 배열에 문제가 없는 것처럼 꾸미지만, “이상한” 것들에 명시적으로 접근하면 추악한 진실을 드러내야 할 뿐입니다.

## 2. Object.freeze()

Object.freeze()는 객체에 새로운 속성이 추가되거나 기존 속성이 제거 또는 수정되지 못하도록 합니다. 배열과 함께 완벽하게 작동합니다.

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
const arr = [1, 2, 3];
Object.freeze(arr);
arr[0] = 10; // 영향이 없음
console.log(arr); // 출력: [1, 2, 3]
arr.push(4); // TypeError: Cannot add property 3, object is not extensible
```

여기서는 "object is not extensible"라고 속이지 않고 그냥 객체라고 합니다.

## 3. Object.seal() 사용하기

Object.seal()은 객체에 새로운 속성을 추가하지 못하게 하지만 기존 속성의 수정은 허용합니다.

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
const arr = [1, 2, 3];
Object.seal(arr);
arr[0] = 10; // 작동합니다
console.log(arr); // 출력: [10, 2, 3]
arr.push(4); // TypeError: 프로퍼티를 추가할 수 없습니다
```

이 도구는 정의된 크기로 배열을 생성할 수 있게 해줄 수 있었지만, 제대로 작동했더라면 유용한 도구가 될 수도 있었습니다. 왜냐하면:

```js
const arr = [];
arr.length = 10;
console.log(arr); // 출력: [empty × 10]
Object.seal(arr);
arr[0] = 1; // 여기에 오류가 없습니다
console.log(arr); // 안타깝게도, 다시 출력은: [empty × 10]
```

## 4. Object.getOwnPropertyDescriptors() 사용하기

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

`Object.getOwnPropertyDescriptors()`은 객체의 모든 소유 속성 설명자를 반환합니다. 배열에서 사용할 때는 배열 색인에 대한 설명자도 포함됩니다.

```js
const arr = [1, 2, 3];
const descriptors = Object.getOwnPropertyDescriptors(arr);
console.log(descriptors);
/* 결과:
{
  "0": { value: 1, writable: true, enumerable: true, configurable: true },
  "1": { value: 2, writable: true, enumerable: true, configurable: true },
  "2": { value: 3, writable: true, enumerable: true, configurable: true },
  "length": { value: 3, writable: true, enumerable: false, configurable: false }
}
*/
```

JS 배열의 진정한 성격을 보여주는 쇼케이스입니다.

## 5. `Object.getPrototypeOf()` 사용하기

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

Object.getPrototypeOf()은 지정된 객체의 프로토타입을 반환합니다. 배열에 사용하면 Array.prototype을 반환합니다:

```js
const arr = [1, 2, 3];
const proto = Object.getPrototypeOf(arr);
console.log(proto === Array.prototype); // 출력: true
```

그것은 배열을 식별하는 방법으로 정말 유용합니다. 왜냐하면:

```js
const arr = [];
typeof arr; // 출력 'object'
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

## 6. Object.defineProperty() 사용하기

Object.defineProperty()은 객체에 새로운 속성을 정의하거나 기존 속성을 수정하고 해당 객체를 반환합니다. 배열에 사용될 때, 새로운 속성을 정의하거나 기존 속성을 수정할 수 있습니다.

```js
const arr = [1, 2, 3];
Object.defineProperty(arr, "0", {
  value: 10,
  writable: false,
  enumerable: true,
  configurable: false,
});
console.log(arr[0]); // 결과: 10
arr[0] = 20; // 쓰기가 불가능하기 때문에 영향을 주지 않음
console.log(arr[0]); // 결과: 10
```

어째서 이렇게 할까요? 저는 상당히 작은 이유로 동료들을 놀리기 위해서 한다는 것 밖에 상상이 안됩니다. 또 다른 아이디어가 있나요?

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

## 7. Object.setPrototypeOf() 사용

Object.setPrototypeOf()은 지정된 객체의 프로토타입을 설정합니다. 배열에 사용하면 프로토타입을 다른 객체로 변경할 수 있습니다.

```js
const arr = [1, 2, 3];
Object.setPrototypeOf(arr, Object.prototype);
console.log(arr); // 출력: [1, 2, 3]
console.log(arr.push); // 출력: undefined
console.log(arr.shift); // 출력: undefined
console.log(arr.pop); // 출력: undefined
// .map(), .filter(), .forEach() 등도 동일
console.log(arr.toString()); // 출력: '[object Array]'
arr[3] = 4;
console.log(arr); // 출력: [1, 2, 3, 4]
const newArr = [5, 6];
console.log([...arr, ...newArr]); // TypeError: arr은 반복 가능하지 않음
```

반 배열에서 반 죽은 노파를 만드는 재미있는 방법이에요. "arr[3] = 4"와 같이 새 요소를 추가하거나 "delete arr[2]"를 호출하여 요소를 삭제할 수 있지만, 거의 모든 다른 것들이 동작하지 않아요.

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

## 8. delete 연산자 사용하기

이전 포인트의 아이디어를 백 퍼센트 따르지는 않지만, 자바스크립트에서 값의 "존재하지 않음"을 나타내는 null, undefined와의 연결을 드러내어 매우 흥미로운 부분입니다.
다음 예제를 살펴보세요:

```js
const arr = [1, 2, 3];
delete arr[1];
console.log(arr); // 출력: [1, empty, 3]
```

특정 크기의 객체를 봉인하려고 시도할 때 "empty"가 표시되었습니다. 하지만 이것이 무엇인가요? "empty"라는 값 또는 유형은 없기 때문에 표시된 것은 실제 데이터가 아니며, 그저 "희소 배열"을 나타내는 방법일 뿐입니다. 누락된 인덱스가 있는 배열에 대한 일반적인 용어입니다. 하지만 이 값을 액세스하려고 해보죠:

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
const arr = [1, 2, 3];
delete arr[1];
console.log(arr[1]); // Output: undefined
```

이것이 우리에게 알려주는 바는 Javascript가 존재하지 않는 것에 접근하려고 할 때 "undefined"로 대체한다는 것입니다. 이것은 실제로 공백으로 변환되기보다 "undefined"를 배열에 명시적으로 넣어두면 "empty"로 다시 변환되지 않는다는 트릭입니다:

```js
const arr = [1, 2, 3];
delete arr[1];
console.log(arr); // Output: [1, empty, 3]
console.log(arr[1]); // Output: undefined
arr[1] = undefined;
console.log(arr); // Output: [1, undefined, 3]
```

이게 다가 아닙니다. JS 데이터를 표현하는 또 다른 내장 방법인 JSON이 있습니다. JSON이 우리에게 어떤 것을 제공할 수 있는지 살펴봅시다:

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
const arr = [1, 2, 3];
delete arr[1];
console.log(arr); // 결과: [1, 빈 칸, 3]
console.log(JSON.stringify(arr)); // 결과: [1, null, 3]
console.log(JSON.parse(JSON.stringify(arr))); // 결과: [1, null, 3]
```

JSON.stringify()은 그냥 "undefined"를 "null"로 변환하기 때문에 JSON에는 undefined가 없다. 자바스크립트에도 "null"이 있기 때문에 다시 파싱할 때 "null"로 유지되는 것이 예상된다... 정말 이상한 일이다:
한 가지 방향은 empty -` undefined -` null이다.
돌아오는 방향은 null -` null -` null이다.

```js
const arr = [1, 2, 3];
delete arr[1];
console.log(arr); // 결과: [1, 빈 칸, 3]
console.log(arr[1]); // 결과: undefined
const jsonArr = JSON.stringify(arr);
console.log(jsonArr); // 결과: [1, null, 3]
const parsedArr = JSON.parse(jsonArr);
console.log(parsedArr); // 결과: [1, null, 3]
console.log(parsedArr[1]); // 결과: null
```

# 결론

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

자바스크립트에서 배열의 동작은 밑바닥 복잡성을 보여줍니다. 이는 종종 짜증을 유발할 수 있습니다. JavaScript 배열은 기술적으로 객체이지만, 고유한 특성과 표준 객체 메서드와의 상호작용으로 인해 예상치 못한 결과를 초래할 수 있습니다. 이러한 특이점을 이해하는 것은 개발자에게 잠재적인 문제를 피하는 데 중요할 수 있습니다.
