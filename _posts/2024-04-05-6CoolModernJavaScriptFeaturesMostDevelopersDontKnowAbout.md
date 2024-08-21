---
title: "JavaScript 개발자라면 반드시 알아둬야하는 기능들 2024년"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "6 Cool Modern JavaScript Features Most Developers Dont Know About"
link: "https://medium.com/javascript-in-plain-english/6-cool-modern-javascript-features-most-developers-dont-know-about-fc9ad774645a"
isUpdated: true
---

<img src="/assets/img/6CoolModernJavaScriptFeaturesMostDevelopersDontKnowAbout_0.png" />

# 소개

JavaScript는 지속적으로 발전하고 업그레이드되며, 점점 더 많은 새로운 기능이 코드를 간결하게 만듭니다. 본 문서에서는 새로운 JavaScript 기능 중 여섯 가지를 소개하겠습니다. 함께 공부해보세요.

# 1. “in” 연산자 대신 “Object.hasOwn” 사용하기

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

가끔은 객체에 속성이 존재하는지 확인하고 싶을 때 "in" 연산자나 "obj.hasOwnProperty"를 사용합니다. 그러나 두 가지 모두 일부 단점이 있습니다. 함께 살펴보겠습니다.

"in" 연산자

""in"" 연산자는 지정된 속성이 지정된 객체나 해당 프로토 타입 체인에 있는 경우 true를 반환합니다.

```js
const Person = function (age) {
  this.age = age;
};
Person.prototype.name = "fatfish";
const p1 = new Person(24);
console.log("age" in p1); // true
console.log("name" in p1); // true  주의해 주세요
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

obj.hasOwnProperty

해당 메서드는 객체가 지정된 속성을 자체 속성으로 가지고 있는지를 나타내는 부울 값을 반환합니다(상속받은 속성은 제외).

위의 예시를 사용하여:

```js
const Person = function (age) {
  this.age = age;
};
Person.prototype.name = "fatfish";
const p1 = new Person(24);
console.log(p1.hasOwnProperty("age")); // true
console.log(p1.hasOwnProperty("name")); // fasle  pay attention here
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

"obj.hasOwnProperty"은 프로토타입 체인의 속성을 이미 필터링할 수 있지만, 경우에 따라 안전하지 않고 프로그램에 실패를 일으킬 수 있습니다.

```js
Object.create(null).hasOwnProperty("name");
// Uncaught TypeError: Object.create(...).hasOwnProperty is not a function
```

Object.hasOwn

걱정 마세요, 이 두 문제를 피하기 위해 "Object.hasOwn"을 사용할 수 있습니다. 이 방법은 "obj.hasOwnProperty" 방법보다 훨씬 편리하고 안전합니다.

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
let object = { age: 24 }
Object.hasOwn(object, 'age') // true
let object2 = Object.create({ age: 24 })
Object.hasOwn(object2, 'age') // false  'age' 속성은 프로토타입에서 상속됩니다.
let object3 = Object.create(null)
Object.hasOwn(object3, 'age') // false  "Object.prototype"에서 상속되지 않은 객체

# 2. “#”를 사용하여 비공개 속성을 선언합니다.

과거에는 "_"를 사용하여 비공개 속성을 나타냈지만, 이는 안전하지 않으며 외부에서 여전히 수정될 수 있습니다.

class Person {
  constructor (name) {
    this._money = 1
    this.name = name
  }
  get money () {
    return this._money
  }
  set money (money) {
    this._money = money
  }
  showMoney () {
    console.log(this._money)
  }
}
const p1 = new Person('fatfish')
console.log(p1.money) // 1
console.log(p1._money) // 1
p1._money = 2 // 외부에서 비공개 속성 _money를 수정합니다.
console.log(p1.money) // 2
console.log(p1._money) // 2

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

우리는 “#”을 사용하여 진정한 안전한 비공개 속성을 구현할 수 있습니다:

class Person {
  #money = 1;
  constructor(name) {
    this.name = name;
  }
  get money() {
    return this.#money;
  }
  set money(money) {
    this.#money = money;
  }
  showMoney() {
    console.log(this.#money);
  }
}
const p1 = new Person("fatfish");
console.log(p1.money); // 1
// p1.#money = 2 // 우리는 이 방법으로 #money를 수정할 수 없습니다
p1.money = 2;
console.log(p1.money); // 2
console.log(p1.#money); // Private field '#money' must be declared in an enclosing class 에러 발생

# 3. 유용한 숫자 구분자

숫자를 더 읽기 쉽게 만들기 위해 “\_”를 사용할 수 있습니다. 멋지죠.

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

const sixBillion = 6000000000;
// 이건 읽기가 매우 어렵다
const sixBillion2 = 6000_000_000;
// 멋지고 읽기 쉽다
console.log(sixBillion2); // 6000000000

물론, 실제 계산에도 “\_”를 사용할 수 있어요.

const sum = 1000 + 6000_000_000; // 6000001000

# 4. “&&”와 삼항 연산자(Ternary operators)를 단순화하기 위해 “?.”를 사용하세요.

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

당신이 아래 예제에 익숙할거라고 생각돼, 우리는 이를 간단하게 할 수 있을까요?

const obj = null;
console.log(obj?.name);
const $title = document.querySelector(".title");
const title = $title?.innerText;

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

팁

Common spelling of “?.”

- obj?.prop object properties
- obj?.[expr] object properties
- func?.(...args) call of function or object method

# 5. Use “??” instead of “||”

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

"??“ 대신에 "||"를 사용해도 됩니다. 왼쪽의 값이 null 또는 정의되지 않은 경우 오른쪽의 값이 반환됩니다.

const obj = {
  name: "fatfish",
  nullValue: null,
  zero: 0,
  emptyString: "",
  falseValue: false,
};
console.log(obj.age ?? "some other default"); // some other default
console.log(obj.age || "some other default"); // some other default

console.log(obj.nullValue ?? "some other default"); // some other default
console.log(obj.nullValue || "some other default"); // some other default
console.log(obj.zero ?? 0); // 0
console.log(obj.zero || "some other default"); // some other default

console.log(obj.emptyString ?? "emptyString"); // ''
console.log(obj.emptyString || "some other default"); // some other default

console.log(obj.falseValue ?? "falseValue"); // false
console.log(obj.falseValue || "some other default"); // some other default

# 6. 큰 정수 계산 문제 대응으로 "BigInt"를 사용해 보세요

JS에서 Number.MAX_SAFE_INTEGER를 초과하는 숫자 계산은 정확하지 않을 수 있습니다.

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

예시:

Math.pow(2, 53) === Math.pow(2, 53) + 1; // true
// Math.pow(2, 53) => 9007199254740992
// Math.pow(2, 53) + 1 => 9007199254740992

큰 숫자들을 계산할 때, 계산 오류를 피하기 위해 "BigInt"를 사용할 수 있습니다.

BigInt(Math.pow(2, 53)) === BigInt(Math.pow(2, 53)) + BigInt(1); // false

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

# 마지막으로

읽어 주셔서 감사합니다. 귀하의 팔로우를 기대하며 더 많은 고품질 글을 읽을 수 있기를 바랍니다.

# 솔직히 이야기하자면 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

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

- 작가를 박수하고 팔로우해주세요! 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- 더 많은 컨텐츠는 PlainEnglish.io에서 확인하세요
```
