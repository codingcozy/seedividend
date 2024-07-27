---
title: "자바스크립트에서 사용하는 다양한 배열 유형  언제 사용해야 할까요"
description: ""
coverImage: "/assets/img/2024-06-20-DifferentTypesofArraysinJavaScriptWhentoUseThem_0.png"
date: 2024-06-20 05:18
ogImage: 
  url: /assets/img/2024-06-20-DifferentTypesofArraysinJavaScriptWhentoUseThem_0.png
tag: Tech
originalTitle: "Different Types of Arrays in JavaScript + When to Use Them"
link: "https://medium.com/@julienetienne/different-types-of-arrays-in-javascript-and-when-to-use-them-77f7843b71de"
---


![2024-06-20-DifferentTypesofArraysinJavaScriptWhentoUseThem_0](/assets/img/2024-06-20-DifferentTypesofArraysinJavaScriptWhentoUseThem_0.png)

자바스크립트에서 제공하는 배열 종류와 사용 시기에 대해 알아보겠습니다. 이는 특정 사용보다는 일반적인 용도에 대해 더 다룹니다.

# 배열이란

"진정한 배열"이 무엇인지에 대한 번복적인 토론을 피하려 합니다. 알아야 할 것은 "배열"의 의미가 고수준 및 저수준 해석 둘 다를 포함한다는 점입니다. 고수준 배열은 기본적으로 순차적인 컬렉션입니다.

<div class="content-ad"></div>

## 순차적 컬렉션

다양한 프로그래밍 언어에서, 이는 데이터를 동적으로 조절하면서 순차적으로 저장하는 데이터셋입니다. 순차적 컬렉션은 기본 배열, 뷰, 리스트 또는 링크드 리스트를 나타낼 수 있습니다. Golang에서는 Slice, Python에서는 List, JavaScript에서는 Array가 될 것입니다.

JS에서 배열에 대한 여러 면에는 다양한 미묘한 점이 있습니다: 공간 유무, Object 여부 등이 있습니다. 여기 제 소견입니다:

그럼에도 불구하고, JS의 배열에 대한 가장 중요한 측면만 다루고 싶습니다. 이미 알고 계신 분들을 위해, Array.isArray()를 사용하여 배열을 유형 검사할 수 있습니다. 저는 Array를 구조화하는데 Array.isArray()를 사용하는 const 'isArray'를 사용합니다. Array에 대한 보다 기본적인 정보는 MDN에서 찾을 수 있습니다.

<div class="content-ad"></div>

# 배열 생성자

```js
const array = new Array(12_345)
```

- 항상 folding을 수행하도록 V8에 알림을 보내기 때문에 많은 항목이 있는 배열에 대해 높은 성능을 제공합니다.
- 항목 수가 많을 때 사용하세요.

# 배열 리터럴

<div class="content-ad"></div>

```js
const array = []
```

- 일반적으로 시간이 지남에 따라 더 작은 길이의 데이터를 가져오도록 최적화되어 있습니다
- 동적으로 변할 것으로 예상됩니다
- 일반적인 용도에 가장 적합합니다

# 고정 길이 배열 리터럴

```js
const array = []
array.length = 12_234
```

<div class="content-ad"></div>

고정 길이 배열 리터럴은 배열 생성자 예제와 성능이 유사합니다. 일반적으로 성능 차이는 미미합니다. 배열 생성자와 고정 길이 배열 리터럴은 주로 같은 사용 사례를 공유합니다.

# ArrayBuffer

ArrayBuffer는 "바이트 배열"로, 연속적인(서로 이어진) 바이트 그룹을 포함하는 메모리 영역입니다.

```js
[ Byte 0  | Byte 1  | Byte 2, ... ] // 연속적인 바이트들
```

<div class="content-ad"></div>

V8(Chrome/Node.js)에서 배열 버퍼가 메모리 힙에 저장됩니다.

배열 버퍼는 일반적인 원시 이진 데이터 버퍼입니다.

- 일반적: 특정한 데이터 유형에 구속되지 않습니다. 정수, 부호 없는 정수, 부동 소수점, 부호 없는 부동 소수점 및 문자열 등을 나타내는 이진 데이터를 저장하는데 사용될 수 있습니다.
- 원시: JavaScript에서 ArrayBuffer의 표현은 물리적 메모리와 일치하며 메타데이터나 변환은 없습니다.

배열 버퍼는 생성 시 크기가 고정되며 직접 조작되지 않고 이진 데이터의 컨테이너 역할을 합니다.

<div class="content-ad"></div>

## 장점

- 일반적 (위에서 언급한 대로)
- 빠름: 메모리 미리 할당 (고정되고 변경할 수 없는 메모리 양)을 수행하여 런타임에서 효율적입니다.
- 다중 뷰: 배열 버퍼에는 데이터 바이트 (8비트)가 포함되어 있습니다. 데이터를 [8비트] [8비트] [8비트] [8비트]로 볼 수도 있고, 16비트 뷰 [8비트, 8비트] [8비트, 8비트] 또는 32비트 뷰 [8비트, 8비트, 8비트, 8비트] 등으로 볼 수도 있습니다. 이것이 일반적으로 의미하는 바이며, 데이터가 이진 사용 사례에 적합한 모든 방식으로 보고 형성할 수 있습니다.

# 뷰

뷰는 배열 버퍼를 해석하는 방식입니다. 배열 버퍼는 바이트(옆으로 나란히 있는 8비트) 데이터입니다. 이는 절대 변경되지 않으며, 16비트, 32비트 또는 BigInt 64비트로 해석하더라도 항상 바이트 데이터일 것입니다.

<div class="content-ad"></div>

뷰(Views)는 데이터 해석뿐만 아니라 배열 버퍼를 조작할 수 있는 메커니즘입니다.

JS에서 숫자 표현에 대해 썼어요. 여기서 확인할 수 있어요: JavaScript: Poorly Designed? — Part 3: IEEE 754 이것은 JS에서 이진(binary)을 이해하는 데 도움이 될 거예요.

## 뷰(Views)의 유형

두 가지 유형의 뷰(Views)가 있어요.

<div class="content-ad"></div>

- Typed-arrays (TypedArray 객체)
- DataViews (이 부분은 범위를 벗어납니다, 이것은 pt2가 필요합니다)

Typed-arrays는 배열 버퍼의 숫자 유형 관점을 제공합니다:

- Int8Array: 8-bit 부호 있는 정수
- Uint8Array: 8-bit 부호 없는 정수
- Uint8ClampedArray: 0~255로 클램프된 8-bit 부호 없는 정수
- Int16Array: 16-bit 부호 있는 정수
- Uint16Array: 16-bit 부호 없는 정수
- Int32Array: 32-bit 부호 있는 정수
- Uint32Array: 32-bit 부호 없는 정수
- Float32Array: 32-bit 부동 소수점 숫자
- Float64Array: 64-bit 부동 소수점 숫자
- BigInt64Array: 64-bit 부호 있는 정수 BigInt 숫자
- BigUint64Array: 64-bit 부호 없는 정수 BigInt 숫자

## 함께 춤을 춥시다 🕺

<div class="content-ad"></div>

```js
// 우리는 4 바이트(32비트)의 버퍼를 할당합니다.
const buffer = new ArrayBuffer(4)

// 8비트 부호 없는 정수 TypedArray 뷰를 만듭니다.
const uint8 = new Uint8Array(buffer)

// 123을 할당합니다.
uint8[0] = 123

// 456을 할당합니다.
uint8[1] = 456

// 항목을 출력합니다.
for (const item of uint8) console.log(item)
// 123
// 200
// 0 
// 0

// 무슨 일이 일어나고 있는 거죠? 왭!
```

그래서 먼저 8비트를 10진수로 확인해 볼까요(인간의 수 체계)? 2⁸ = 256로 계산됩니다. 즉, 8비트 부호 없는 정수 배열의 항목은 256을 초과할 수 없습니다.

uint8[1] = 456은 256을 200으로 초과하려 합니다. 따라서 나머지 값인 200으로 줄어듭니다. 나머지가 전체 값의 중요한 부분입니다.

언급한대로, 버퍼에는 여러 개의 뷰가 있을 수 있으므로 같은 버퍼를 16비트 부호 없는 정수로 보겠습니다. 이어서 계속해봅시다...

<div class="content-ad"></div>

```js
const uint16 = new Uint16Array(buffer) // 같은 buffer 변수

for (const item of uint16) console.log(item)
// 51323
// 0
```

우리는 16비트에서 8비트 데이터를 보고 있기 때문에 두 개의 항목을 기대합니다. 하지만 왜 51323이 나오는 걸까요?

먼저 우리는 8비트 - 10진법 표현을 16비트로 변환해야 합니다. 저는 자랑을 하려고 하는 게 아니에요, 바이너리 계산기를 사용할 뿐이에요.

- 123 = 01111011
- 200 = 11001000
- 0 = 00000000
- 0 = 0000000000000000


<div class="content-ad"></div>

자바스크립트는 리틀엔디안 방식으로 바이트를 오른쪽에서 왼쪽으로 읽습니다. 이는 10진수에서는 중요하지 않지만,

하지만 2진수에서는 오른쪽에서 왼쪽으로 연결해야 하므로 16비트 형식에서는 다음과 같습니다:

[1100100001111011, 0000000000000000]

이제 10진수로 변환하면 아래와 같습니다:

<div class="content-ad"></div>

마침내, 배열 버퍼를 조작하고 나타내는 여러 가지 방법을 이해할 수 있을 것입니다.

## 알겠는데, 이걸 언제 활용하죠?

이미 알고 계실지 모를지도 모르겠지만, ArrayBuffer는 그래픽 (WebGL, WebGPU), 사용자 정의 비디오 코덱 및 다양한 형태의 이진 처리에 사용됩니다.

<div class="content-ad"></div>

일반적인 프로그래밍 작업에는 일반적으로 순차 컬렉션 Array이 충분합니다. 그러나 ArrayBuffer를 사용하는 것이 좋은 경우가 있습니다.

## 좌표

대량의 x와 y 좌표 또는 다른 세트의 좌표를 처리해야 하는 경우(예: 애니메이션 또는 데이터 처리 등), 객체로 채워진 배열 대신 ArrayBuffer를 사용하는 것이 더 적합할 수 있습니다. 이는 사용 사례에 따라 다릅니다. 데이터 크기에 최적인 방법을 결정하기 위해 벤치마킹하는 것이 가치가 있습니다.

## 금융

<div class="content-ad"></div>

만약 선사 시대에서 오셨다면 JavaScript에 원시 64비트 BigInt 숫자가 있고, 브라우저와 node.js에서 완벽히 지원된다는 사실이 새로울 수 있습니다.

BigUint64Array를 사용하면 빠른 데이터 조작이 가능하지만, 이진 조작에 대한 혜택은 실제로 별로 없습니다. 다시 한 번, 어떤 방법이 가장 잘 작동하는지 확인하기 위해 벤치마킹이 필요합니다.

## 대용량 데이터

Accenture에서 근무하면서, 수만 개의 항목을 포함하는 대량 데이터셋을 사용한 IAM 프로젝트를 담당했습니다. 이 데이터의 구문 분석과 처리는 브라우저에 약간의 부담이 되었습니다. 한 시점에서의 프로세스는 아래와 유사했습니다:

<div class="content-ad"></div>

데이터 가져오기 - JSON 구문 분석 - IndexedDB에 데이터 저장 - 데이터 반복

- 그래프 업데이트
- 가상 목록 업데이트

값은 숫자와 일부 문자열 값을 가진 항목(행)이었습니다. 배열 버퍼로 필드를 구분하거나 JavaScript의 Array 버퍼에 더 익숙했다면 성능이 향상되었을 것입니다.

IndexedDB의 장점은 Binary Large Objects로 알려진 Blob로 배열 버퍼를 저장할 수 있다는 것입니다.

<div class="content-ad"></div>

ArrayBuffer를 사용하는 것이 일반적인 목적의 데이터와 직접적으로 연관되는 경우는 드물지만, 성능 이점을 활용하기 위해 데이터를 여러 배열로 분할해야 할 때가 많습니다.

# 결론

JavaScript에는 다음이 모두 있습니다:

- 고수준 배열
- 저수준 배열

<div class="content-ad"></div>

"어레이(array)" 라는 단어가 혼란스러울 수 있으니 신경 쓰지 마세요. 그러니로마에 가면 피자에 파인애플을 넣지 마세요. 배열은 [] 이거나 new Array(...)이고 ArrayBuffer는 "버퍼"라고 합니다. "뷰(view)" 는 "뷰" 이거나 "어레이 뷰"일 수 있습니다. 솔직히 제가 진짜 관심이 없어요.

이 글에서 다루지 않은 부분이 많습니다. 배열 리터럴을 반복하는 것이 객체 리터럴을 반복하는 것보다 유의미한 성능 이점이 없다는 점을 강조하고 싶습니다. 그러니 이 글을 읽고 기존 코드를 망가뜨려놓지 마세요. 그것은 이 글의 의도가 아닙니다.

우리의 선택지를 인식하여 개발 방법에 대한 더 나은 결정을 내릴 수 있도록 하는 것이 목적입니다.

말하고 싶지 않지만...

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-DifferentTypesofArraysinJavaScriptWhentoUseThem_1.png" />

현실에서 대부분의 사람들은 재미있는 것을 하지 않을 것이며 새로운 문법을 시도하고 싶어서 지루한 것을 강요할 이유가 없습니다.

또한 성능이 항상 핵심 측정 기준은 아니지만, 이 글은 상수 폴딩 배열과 배열 버퍼의 성능에 기본 초점을 두었으니 그것이 실제로 그들의 주요 장점입니다.

2부에서는 DataViews에 대해 다루고, 아마도 3부에서 SharedArrayBuffer와 Atomics를 다룰 것입니다. 그에 대한 업데이트는 여기에 추가하겠습니다.

<div class="content-ad"></div>

안녕하세요! 테이블 태그를 마크다운 형식으로 변경해주세요. 감사합니다!