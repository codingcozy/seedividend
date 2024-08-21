---
title: "자바스크립트 맵이 무엇이며 어떻게 작동하는지 완벽한 가이드"
description: ""
coverImage: "/assets/img/2024-06-20-WhatareJavaScriptMapsandHowdoTheyWorkACompleteGuide_0.png"
date: 2024-06-20 02:37
ogImage:
  url: /assets/img/2024-06-20-WhatareJavaScriptMapsandHowdoTheyWorkACompleteGuide_0.png
tag: Tech
originalTitle: "What are JavaScript Maps and How do They Work: A Complete Guide"
link: "https://medium.com/javascript-in-plain-english/what-are-javascript-maps-and-how-do-they-work-a-complete-guide-94ffeaec945c"
isUpdated: true
---

![JavaScript Maps](/assets/img/2024-06-20-WhatareJavaScriptMapsandHowdoTheyWorkACompleteGuide_0.png)

안녕하세요! 아마도 JavaScript 객체에 익숙하실 것입니다. 그런데 JavaScript에서 데이터 세트를 만드는 또 다른 방법인 'Maps'에 대해 알고 계셨나요? 지금은 JavaScript의 일반 객체를 사용하고 계실 수도 있는데, 문제 해결에 더 나은 해결책이 될 수 있는 맵(map)을 사용해볼까요?

JavaScript 맵은 객체와 몇 가지 주요 면에서 다릅니다. typeof new Map()을 호출하면 object가 반환되지만, 이것에 속지 마세요! 객체와 맵 사이에 주요한 차이점들을 알아보겠습니다:

- 객체와 달리 기본적으로 어떠한 키도 포함하지 않습니다. 객체는 프로토타입 객체를 포함하고 있습니다.
- 맵은 삽입된 순서대로 정렬되는 것이 보장됩니다. 객체도 요즘은 이와 같이 동작하지만, 같은 보장을 제공하지는 않습니다.
- 맵의 키는 함수나 객체를 포함하여 모든 것이 될 수 있습니다. 반면 JavaScript에서는 문자열이나 심볼이어야 합니다.
- 데이터의 빠른 또는 빈번한 추가 또는 삭제 작업을 필요로 하는 작업에서 객체보다 더 나은 성능을 보여줍니다.
- 객체와 달리 맵은 기본적으로 iterable(반복 가능)합니다.

더 궁금한 점이 있으시면 언제든지 물어보세요!

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

지도의 많은 혜택을 고려한다면, 작동 방식을 살펴보는 게 좋겠죠.

# JavaScript Maps 작동 기본

JavaScript에서의 모든 지도는 new Map() 생성자를 사용하여 초기화됩니다. 예를 들어, myFirstMap이라는 지도를 생성해 봅시다:

```js
let myFirstMap = new Map();
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

차이점은 맵에서 키를 설정, 가져오거나 삭제하려면 Map과 함께 제공되는 특정 메서드를 사용해야 한다는 것입니다. 따라서 firstKey라는 키로 someValue의 새 값을 설정하려면 다음 메서드를 실행할 수 있습니다:

```js
let myFirstMap = new Map();
myFirstMap.set("firstKey", "someValue");
```

# JavaScript Map에서 항목 삭제

JavaScript 맵에서 키를 삭제하려면 delete() 메서드를 호출해야 합니다.

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
let myFirstMap = new Map();
myFirstMap.set("firstKey", "someValue");
myFirstMap.delete("firstKey");
```

또한 clear()를 사용하여 전체 맵을 삭제하고 내용을 비울 수도 있습니다:

```js
let myFirstMap = new Map();
myFirstMap.set("firstKey", "someValue");
myFirstMap.clear();
console.log(myFirstMap); // Map(0) 반환
```

# JavaScript Map에서 키 가져오기

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

다른 방법들과 비슷하게, firstKey의 값을 얻으려면 get()을 사용해야 합니다:

```js
let myFirstMap = new Map();
myFirstMap.set("firstKey", "someValue");
myFirstMap.get("firstKey"); // 'someValue'
```

# JavaScript Map에서 키가 존재하는지 확인하기

JavaScript Maps에는 특정 키가 있는지 확인하려면 has() 메서드를 사용할 수 있습니다:

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
let myFirstMap = new Map();
myFirstMap.set("firstKey", "someValue");
myFirstMap.has("firstKey"); // true
```

# 주의: 일반 객체 속성을 Map과 함께 사용하지 마세요

자바스크립트에는 많은 특이성이 있고, Map도 예외는 아닙니다. 놀랍게도, Map은 객체 표기법도 지원할 수 있습니다. 예를 들어, 다음과 같이 동작하는 것처럼 보입니다:

```js
let myFirstMap = new Map();
myFirstMap["firstKey"] = "someValue";
console.log(myFirstMap); // Map(0) { firstKey: 'someValue' }
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

그러나, 이렇게 하면 안 돼요! 이것은 맵 자체에 새 항목을 만드는 것이 아니라 단순히 객체를 만드는 것이에요. 그러면 JavaScript 맵의 모든 이점을 잃게 되요.

# JavaScript 맵의 크기를 알려주는 방법

맵에 있는 키의 개수를 찾는 것은 객체보다 맵이 조금 더 사용하기 쉬운 경우 중 하나에요. 이를 위해 size() 메서드를 사용할 수 있어요. 이 메서드는 키의 개수를 반환해요:

```js
let myFirstMap = new Map();
myFirstMap.set("firstKey", "someValue");
myFirstMap.size; // 1
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

객체의 크기를 알아내기 위해 일반적으로 Object.keys()와 length를 혼합하여 사용합니다:

```js
let myObj = { name: "John" };
let sizeOfObj = Object.keys(myObj).length; // 1
```

# 문자열이 아닌 키로 Map 사용하기

제가 언급했듯이, JavaScript Maps는 함수와 객체와 같은 비전통적인 키를 허용합니다. 반면 객체는 문자열과 심볼만 허용합니다. 예를 들어, Map에서는 다음과 같이 유효합니다:

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

맵의 키는 값이 아닌 참조 값에 기반합니다. 즉, 다음과 같이 작동합니다.

```js
let myFirstMap = new Map();
let myFunction = function () {
  return "someReturn";
};
myFirstMap.set(myFunction, "value");
myFirstMap.get(myFunction); // "someReturn" 반환
```

아래는 작동하지 않습니다:

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
let myFirstMap = new Map();
let myFunction = function () {
  return "someReturn";
};
myFirstMap.set(myFunction, "value");
myFirstMap.get(function () {
  return "someReturn";
}); // 결과는 정의되지 않습니다
myFirstMap.get("someReturn"); // 결과는 정의되지 않습니다
```

그 이유는 function() { return "someReturn"; }와 myFunction이 값으로는 같지만 시스템 메모리에 저장된 위치가 다르기 때문입니다. 그래서 완전히 동등하지는 않습니다. 비슷하게, 맵은 반환 값에 대해 작동하지 않으므로 myFirstMap.get('someReturn') 또한 정의되지 않은 값을 반환합니다.

객체에 대해서도 같은 예제가 유사한 결과를 가져옵니다:

```js
let myFirstMap = new Map();
let myObject = { someKey: "someValue" };
myFirstMap.set(myObject, "value");
myFirstMap.get({ someKey: "someValue" }); // 결과는 정의되지 않습니다
myFirstMap.get(myObject); // 결과는 'value'를 반환합니다
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

# JavaScript Maps 병합하기

여러 맵을 하나로 병합하려면, 객체를 병합하는 방식과 마찬가지로 스프레드 구문을 사용하여 병합할 수 있습니다. 예를 들어, 여기서는 spread 구문을 사용하여 myFirstMap과 mySecondMap을 myNewMap으로 병합합니다:

```js
let myFirstMap = new Map();
myFirstMap.set("some", "value");
let mySecondMap = new Map();
mySecondMap.set("someOther", "value");
let myNewMap = new Map([...myFirstMap, ...mySecondMap]);
console.log(myNewMap);
// Map(2) { some: "value", someOther: "value" }
```

# 맵(Map)에서 반복하기

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

맵은 기본적으로 Iterable 합니다. 객체를 반복하려면 보통 Object.keys와 같은 함수를 사용해야 합니다. 결국, 우리는 다음과 같이 모든 맵에서 forEach를 사용할 수 있습니다:

```js
let myFirstMap = new Map();
myFirstMap.set("some", "value");
myFirstMap.set("someOther", "value");
myFirstMap.forEach(function (value, key, map) {
  // value -> 맵에서 키의 값
  // key -> 맵 안의 항목의 키
  // map -> 전체 맵
  console.log(value, key, map);
});
```

# JavaScript Map에서 for를 사용한 반복

또한 for(let ... of )을 사용하여 맵을 반복할 수도 있습니다! 이렇게 하면 각 항목이 키와 값의 배열로 반환됩니다. 예를 들어:

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
let myFirstMap = new Map();
myFirstMap.set("some", "value");
for (let x of myFirstMap) {
  // Returns [ 'some', 'value' ]
  console.log(x);
}
```

# JavaScript Map에서 값 또는 키를 순회하기

JavaScript에서 값 또는 키를 순회하는 또 다른 멋진 방법은 values() 또는 entries() 메서드를 사용하는 것입니다. 이들 메서드는 각각 map의 값과 항목에 대한 새로운 반복자를 반환합니다. 이는 생성기 함수에서와 마찬가지로 next() 함수를 사용하여 다음 키 또는 값을 액세스할 수 있다는 것을 의미합니다.

예를 들어, entries()가 어떻게 작동하는지 살펴보겠습니다:

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
let myFirstMap = new Map();
myFirstMap.set("some", "value");
myFirstMap.set("someOther", "value");
myFirstMap.set("aFinal", "value");
let allKeys = myFirstMap.entries();
console.log(allKeys); // MapIterator {} 객체를 반환합니다
console.log(allKeys.next()); // { value: [ 'some', 'value' ], done: false }를 반환합니다
console.log(allKeys.next().value); // [ 'some', 'value' ]를 반환합니다
```

allKeys.next()에서 반환된 것은 객체입니다. 이 객체 안의 값은 [ `some`, `value` ] 입니다 - 맵의 첫 번째 항목을 나타내는 배열입니다. 계속해서 next()를 실행하여 맵의 다음 항목들을 얻을 수 있습니다. 정말 멋집니다! 값으로만 이 작업을 다시 할 수도 있습니다.

```js
let myFirstMap = new Map();
myFirstMap.set("some", "value");
myFirstMap.set("someOther", "value");
myFirstMap.set("aFinal", "value");
let allValues = myFirstMap.values();
console.log(allValues); // MapIterator {} 객체를 반환합니다
console.log(allValues.next()); // { value: 'value', done: false }를 반환합니다
console.log(allValues.next().value); // 'value'를 반환합니다
```

이러한 이터레이터들은 특정 상황에서 유용하며 맵에 있는 모든 데이터를 반복하는 멋진 방법이 될 수 있습니다.

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

# 자바스크립트에서 맵의 직렬화

맵의 한 가지 단점은 JSON.parse() 및 JSON.stringify로 쉽게 직렬화할 수 없다는 점입니다. 이를 시도하면 비어 있는 객체가 반환되는데, 이는 맵의 객체가 항목으로만 채워졌을 때 비어 있기 때문에 어느 정도 이해됩니다:

```js
let myFirstMap = new Map();
myFirstMap.set("some", "value");
myFirstMap.set("someOther", "value");
myFirstMap.set("aFinal", "value");
// Returns {}
console.log(JSON.stringify(myFirstMap));
```

맵을 직렬화하는 유일한 현실적인 방법은 객체나 배열로 변환한 후에 직렬화하는 것이며, 이를 위해 맵을 사용한다면 이 작업을 수행해주는 별도의 도우미 함수를 유지해야 합니다. 예를 들어, Array.from()을 사용하여 우리의 맵을 배열로 변환한 다음 JSON.stringify()를 사용하여 직렬화할 수 있습니다.

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
let myFirstMap = new Map();
myFirstMap.set("some", "value");
myFirstMap.set("someOther", "value");
myFirstMap.set("aFinal", "value");
let arrayMap = Array.from(myFirstMap);
// Returns [["some","value"],["someOther","value"],["aFinal","value"]]
console.log(JSON.stringify(arrayMap));
```

그런 다음, 다시 Map으로 변환하려면 JSON.parse()를 사용하여 new Map()과 함께 사용해야합니다:

```js
let myFirstMap = new Map();
myFirstMap.set("some", "value");
myFirstMap.set("someOther", "value");
myFirstMap.set("aFinal", "value");
// Map을 배열로 변환
let arrayMap = Array.from(myFirstMap);
// Map의 JSON 문자열 버전:
let stringifiedMap = JSON.stringify(arrayMap);
// 다시 Map으로 변환하려면 new Map(JSON.parse...)를 사용하세요:
let getMap = new Map(JSON.parse(stringifiedMap));
// Map(3) {'some' => 'value', 'someOther' => 'value', 'aFinal' => 'value'}를 반환
console.log(getMap);
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

자바스크립트 Maps는 객체의 모든 유연성이 필요하지 않을 때 데이터를 저장하는 훌륭한 방법입니다. 데이터의 순서가 굉장히 중요한 상황에서는 객체보다 성능이 우수합니다. 아이템을 자주 추가하거나 제거해야 하는 상황에서도 객체보다 효율적입니다. 이 안내서에서는 Maps에 대해 알아야 할 모든 것을 다뤘지만, 자바스크립트에 대해 더 알고 싶다면 여기를 클릭해주세요.

이 내용이 유익했기를 바라며, 즐거운 하루 보내세요.

PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요. 무료 주간 뉴스레터 구독 신청하세요. 트위터, 링크드인, 유튜브, 디스코드에서 팔로우하세요. 성장 해킹에 관심이 있다면 Circuit을 확인해보세요.
