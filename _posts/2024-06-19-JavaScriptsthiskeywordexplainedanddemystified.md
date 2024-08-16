---
title: "자바스크립트의 this 키워드 설명 및 해석하기"
description: ""
coverImage: "/assets/img/2024-06-19-JavaScriptsthiskeywordexplainedanddemystified_0.png"
date: 2024-06-19 23:03
ogImage: 
  url: /assets/img/2024-06-19-JavaScriptsthiskeywordexplainedanddemystified_0.png
tag: Tech
originalTitle: "JavaScript’s ‘this’ keyword explained and demystified"
link: "https://medium.com/stackanatomy/javascripts-this-keyword-explained-and-demystified-a2e9c3d3c25e"
isUpdated: true
---




<img src="/assets/img/2024-06-19-JavaScriptsthiskeywordexplainedanddemystified_0.png" />

"this" 키워드는 양날의 검이에요. 복잡한 오류의 원인이 될 수도 있고, 실제로 어떻게 작동하는지 알면 개발자로서 여러분에게 삶을 쉽게 만들어 줄 수도 있어요. 요즘에는 커뮤니티가 언어를 더 함수형 패러다임으로 밀고 있어요. "this" 키워드를 그렇게 많이 사용하지는 않아요. 그런데 여전히 문맥에 따라 의미가 달라 혼란스러울 수 있어요. 그래서 이 글에서는 "this" 키워드를 설명해 실제로 어떻게 작동하는지 잘 이해하도록 도와드릴게요.

# 소개

이 글은 모든 자바스크립트 개발자를 위한 것입니다. 다음을 배울 수 있을 거에요:

<div class="content-ad"></div>

- 자바스크립트에서 this 키워드란 무엇인가요?
- 노드에서 this 키워드가 나타내는 바는 무엇인가요?
- 전역 및 함수 실행 컨텍스트에서 this 키워드가 어떻게 결정되나요?
- 함수가 호출되는 다양한 방법 및 이와 this의 관계
- call() 및 apply() 메서드를 사용하여 this의 값을 제어하는 방법
- bind() 메서드를 사용하는 방법
- 화살표 함수에서 this가 동작하는 방식

# this 키워드란 무엇인가

this 키워드는 자바스크립트에서 함수가 호출될 때 객체 참조를 저장하는 변수입니다. this 키워드가 참조하거나 가리키는 객체는 사용된 컨텍스트에 따라 달라집니다. 개념적으로, this는 영어 문법의 대명사와 유사합니다. 대명사가 명사를 참조하는 방식처럼 this는 객체를 참조하기 위해 사용됩니다.

예를 들어: “Mary is running fast because she is trying to catch the bus.”

<div class="content-ad"></div>

위 구문에서는 대명사 "she"가 선행사 "Mary"를 가리키는 데 사용됩니다. 이 개념을 JavaScript의 this 키워드와 연관시켜보겠습니다.

```js
const person = { name: "Mary",
                 pronoun: "she", 
                 Activity: function () { // this = person
                     console.log(`${person.name} is running fast because ${this.pronoun} is trying to catch the bus`);
                 } 
               }
person.Activity(); // Mary is running fast because she is trying to catch the bus
```

위 코드에서 this는 person 객체의 참조값으로 사용되며, 마치 대명사 "she"가 "Mary"를 가리키는 것처럼 사용됩니다.

# this의 값은 어떻게 결정됩니까?

<div class="content-ad"></div>

`table` 태그를 Markdown 형식으로 변경해주세요.

<div class="content-ad"></div>

글로벌 실행 컨텍스트에서 this 키워드는 웹 브라우저의 창 객체인 글로벌 객체를 참조합니다.

```js
console.log(window === this ) // true this.color = 'Green' console.log(window.color) // Green
```

위 코드에서는 this 키워드를 사용하여 전역 window 객체에 속성을 추가하고 있습니다.

참고: 전역 실행 컨텍스트에서는 JavaScript가 strict mode 인지 아닌지에 상관없이 this 키워드가 항상 글로벌 객체를 참조합니다.

<div class="content-ad"></div>

## Node.js에서의 'this' 키워드

Node.js 문서에 따르면,

위 문장의 의미는 'this' 키워드가 Node.js에서 전역 객체를 참조하지 않는다는 것입니다. 대신, 현재 사용 중인 모듈을 가리킨다는데요. 즉, module.exports를 통해 내보낸 객체를 가리킵니다.

예를 들어, 가상의 모듈인 app.js를 살펴봅시다.

<div class="content-ad"></div>

```js
┣ 📄 app.js 
console.log(this); 
module.exports.color = 'Green'; 
console.log(this);
```

output:

```js
┣ $ node app.js 
{} 
{color: 'Green'}
```

![JavaScript this keyword explained and demystified](/assets/img/2024-06-19-JavaScriptsthiskeywordexplainedanddemystified_1.png)

<div class="content-ad"></div>

위의 코드에서 먼저 app.js 모듈에 module.exports에 값이 없기 때문에 빈 객체가 로깅됩니다. 그런 다음 color 속성이 module.exports 객체에 추가되고, 이를 다시 로깅하면 업데이트된 module.exports 객체가 반환되어 color 속성이 포함됩니다.

## 노드(Node)에서 전역 객체에 액세스하는 방법

이제 우리는 브라우저와 달리 노드에서는 this 키워드가 전역 객체를 참조하지 않는다는 것을 알았습니다. 노드에서는 전역 객체에 global 키워드를 사용하여 액세스하며, 전역 키워드가 사용된 위치와 관계없이 전역 객체에 액세스할 수 있습니다.

```js
┣ 📄 app.js console.log(global);
```

<div class="content-ad"></div>

출력:

```js
┣ $ node app.js // 노드 글로벌 객체를 기록합니다.
```

<img src="/assets/img/2024-06-19-JavaScriptsthiskeywordexplainedanddemystified_2.png" />

글로벌 객체는 노드 환경에 대한 여러 유용한 속성을 노출합니다.

<div class="content-ad"></div>

# 함수 실행 컨텍스트

함수 실행 컨텍스트에서 this 키워드가 어떻게 결정되는지는 함수가 호출되는 방식에 따라 다릅니다.

자바스크립트 함수는 네 가지 방법으로 호출될 수 있습니다:

- 함수로서 호출
- 메소드로서 호출
- 생성자로서 호출
- apply 및 call 메서드를 사용하여 호출

<div class="content-ad"></div>

함수가 호출될 때(즉, 함수가 () 연산자를 사용하여 호출될 때) this는 비엄격 모드에서 전역 창 객체를 참조하고 엄격 모드에서는 undefined로 설정됩니다.

예시

```js
function A() { console.log(this === window) // true }
function B() { "use strict" console.log(this === window) // false } function C() { "use strict" console.log(this === undefined) // true}

A(); // true
B(); // false
C(); // true
```

함수가 메소드로 호출될 때(즉, 객체 속성을 통해), this는 메소드의 "소유" 객체를 참조합니다.

<div class="content-ad"></div>

예시

```js
let Nigeria = { continent: 'Africa', getContinent: function () { return this.continent; } } 
console.log(Nigeria.getContinent()); // Africa
```

함수를 생성자로 호출하려면 함수 호출 앞에 new 연산자를 사용합니다.

예시

<div class="content-ad"></div>

```js
function Context() {return this; } 
new Context();
```

함수가 생성자로 호출될 때(new 연산자를 통해) 몇 가지 특별한 동작이 발생합니다:

- 새로운 비어있는 객체가 생성됩니다.
- 이 객체가 생성자에 this 참조 객체로 전달됩니다. 즉, 함수가 호출될 때 this가 가리키는 객체입니다.
- 새로 생성된 객체가 new 연산자의 값으로 반환됩니다.

예제

<div class="content-ad"></div>

```js
function Person() { this.name = 'Mary', this.age = 20 }
const person1 = new Person(); 
console.log(person1.age) // 20
```

![Reference Image](/assets/img/2024-06-19-JavaScriptsthiskeywordexplainedanddemystified_3.png)

위 코드와 다이어그램에서는 함수가 생성자로 호출될 때 this가 객체를 참조하는 방법을 보여주고 설명합니다.

new 연산자 없이 생성자 함수를 호출하려고 하면 this는 객체가 아니라 undefined를 가리킵니다.

<div class="content-ad"></div>

예시

```js
function Person() { this.name = 'Mary', this.age = 20 } const person2 = Person(); console.log(person2.age) // // => TypeError: Cannot read property 'age' of undefined
```

Person() 함수가 항상 생성자 호출을 통해 실행되도록 하기 위해 Person() 함수 시작 부분에 체크를 추가합니다:

```js
function Person() { if (!(this instanceof Person)) { throw Error('Must use the new operator to call the function'); } 
this.name = 'Mary',
this.age = 20 } 
const person2 = Person(); console.log(person2.age) // // => Must use the new operator to call the function
```

<div class="content-ad"></div>

ES6에서는 생성자로 호출되었는지 또는 간단하게 호출되었는지를 탐지할 수 있는 new.target이라는 메타 프로퍼티를 도입했습니다.

Person() 함수를 수정하여 new.target 메타프로퍼티를 사용할 수 있습니다:

```js
function Person() { 
if (!new.target) { throw Error('Must use the new operator to call the function'); }
 this.name = 'Mary', this.age = 20 }
 const person2 = Person(); 
console.log(person2.age)
 // => Must use the new operator to call the function
```

함수는 객체이며, 모든 JavaScript 객체와 같이 메소드가 있습니다. 이 중 두 가지 메소드인 call()과 apply()는 함수를 간접적으로 호출합니다. 이 두 메소드를 사용하면 호출에 대해 명시적으로 this 값(객체 참조)을 지정할 수 있어 어떤 함수든 해당 객체의 메소드로 호출할 수 있습니다. call()과 apply()는 호출에 대한 인수를 지정할 수도 있습니다. call() 메소드는 함수에 대해 자체 인수 목록을 함수의 인수로 사용하며, apply() 메소드는 인수로 사용할 값의 배열을 기대합니다. call() 및 apply() 모두 첫 번째 인수는 함수가 호출될 객체를 나타내는 this 키워드입니다.

<div class="content-ad"></div>

예시

```js
function getContinent(prefix) { console.log(`${prefix} ${this.continent}`); } 
let nigeria = { continent: 'Africa' };
let china = { continent: 'Asia' }; 
getContinent.call(nigeria, "나이지리아는"); getContinent.call(china, "중국은");
```

출력:

```js
나이지리아는 Africa 중국은 Asia
```

<div class="content-ad"></div>

이 예시에서는 getContinent() 함수를 간접적으로 호출하기 위해 getContinent() 함수의 call() 메소드를 사용했습니다. call() 메소드의 첫 번째 인자로 nigeria와 china 오브젝트를 전달했기 때문에 각 호출에서 해당 국가의 대륙을 얻었습니다.

apply() 메소드는 call() 메소드와 유사하지만, 두 번째 인자로 argument 배열을 사용한다는 것을 이미 알고 계실 것입니다.

```js
getContinent.apply(nigeria, ["나이지리아는"]); getContinent.apply(china, ["중국은"]);
```

Output:

<div class="content-ad"></div>

```js
나이지리아는 아프리카에 있고 중국은 아시아에 있습니다.
```

화살표 함수에서 JavaScript는 this를 렉시컬하게 설정합니다. 이는 화살표 함수 내부의 this 값이 가장 가까운 "비-화살표" 함수에 의해 정의된다는 것을 의미합니다. 또한, 화살표 함수 내부에서 this의 값은 변경할 수 없습니다. 이는 함수의 전체 수명 주기 동안 동일한 상태를 유지합니다.

몇 가지 예시를 살펴봅시다:

```js
let getThis = () => this; console.log(getThis() === window); // true
```

<div class="content-ad"></div>

이 예시에서는 this 값이 전역 객체인 즉, 웹 브라우저의 창 객체로 설정됩니다. 스택과 힙을 이용해 이전 코드를 더 자세히 이해해 봅시다.

![이미지](/assets/img/2024-06-19-JavaScriptsthiskeywordexplainedanddemystified_4.png)

- getThis 화살표 함수는 전역 window 객체를 반환하는 Global() "non-arrow" 함수에 렉시컬 스코프를 갖습니다.
- getThis 화살표 함수 내의 this 값은 해당 객체를 가리키는 함수의 this 값이 렉시컬로 스코프된 것이므로 전역 window 객체입니다.

다른 예시를 살펴보죠:

<div class="content-ad"></div>

```js
function confirmThis () { let getThis = () => this; console.log(getThis() === window); // true } confirmThis();
```

결과:

일반 함수의 this 값은 "비 엄격 모드"에서 전역 window 객체를 가리킨다. this 값은 confirmThis() 함수의 렉시컬 스코프에 바인딩되므로 window 객체를 가리킬 것이다. 그러나 "엄격" 모드에서는 상황이 다릅니다.

```js
function confirmThis () { "use strict"; let getThis = () => this; console.log(getThis() === window); // true } confirmThis();
```

<div class="content-ad"></div>

아래는 strict 모드에서 confirmThis() 함수의 this 값이 undefined로 설정되며, getThis 화살표 함수도 마찬가지입니다.

예시

```js
const module = { x: 42, getX: function() { return this.x; } };
const unboundGetX = module.getX; console.log(unboundGetX());
// 함수는 전역 범위에서 실행됩니다
// 기대 출력: undefined
const boundGetX = unboundGetX.bind(module); console.log(boundGetX()); // 기대 출력: 42
```

<div class="content-ad"></div>

앞선 코드에서는 모듈 객체의 메서드인 getX()이 전역 범위에서 "함수"(대신 모듈의 메서드로)로 호출됩니다. 이로 인해 이 참조가 모듈 객체에서 누락됩니다. getX 메서드가 "함수"로 호출될 때 이 참조가 여전히 모듈 객체를 가리키게 하려면 bind() 메서드를 통해 모듈 객체에 "바인딩"되어야 합니다. - const boundGetX = unboundGetX.bind(module);.

# 결론

이제 이 키워드가 어떻게 작동하는지와 적용되는 다양한 컨텍스트를 알게 되었습니다. 필요한 경우 편안하게 사용할 수 있을 것입니다.

# 요약

<div class="content-ad"></div>

이 글에서는 다음을 배웠습니다:

- JavaScript에서 this 키워드가 무엇인지에 대해 알게 되었습니다.
- Node에서 this 키워드가 무엇을 나타내는지에 대해 알게 되었습니다.
- 전역 및 함수 실행 컨텍스트에서 this 키워드가 어떻게 결정되는지에 대해 알게 되었습니다.
- 함수가 호출되는 다양한 방법 및 this와의 관련성에 대해 알게 되었습니다.
- call() 및 apply() 메소드를 사용하여 this의 값을 제어하는 방법에 대해 알게 되었습니다.
- bind() 메소드를 사용하는 방법에 대해 알게 되었습니다.
- 화살표 함수에서 this의 동작 방식에 대해 알게 되었습니다.

# 용어 해설

Stack 또는 CallStack: 스택은 후입선출(LIFO) 원칙을 따르는 데이터 구조입니다. 그러나 실행 스택은 코드 실행 중에 생성된 모든 실행 컨텍스트를 추적하는 스택입니다. 또한 스택은 JavaScript에서 정적 데이터(변수 및 참조 값)를 저장합니다. 자세히 알아보세요.

<div class="content-ad"></div>

힙: 힙은 JavaScript에서 동적 데이터를 저장하는 데 사용되는 데이터 구조입니다. 이 곳에는 모든 JavaScript 객체가 저장됩니다. 더 알아보려면 [여기](링크)를 확인해보세요.

렉시컬 스코프: 보다 잘 이해하기 위해 [스택 오버플로우 답변](링크)을 참고하십시오.

JavaScript 엄격 모드: [MDN](링크)

![이미지](/assets/img/2024-06-19-JavaScriptsthiskeywordexplainedanddemystified_5.png)