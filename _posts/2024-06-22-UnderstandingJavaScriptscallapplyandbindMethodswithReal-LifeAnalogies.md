---
title: "실생활 비유로 이해하는 JavaScript call, apply, bind 메서드 사용 방법"
description: ""
coverImage: "/assets/img/2024-06-22-UnderstandingJavaScriptscallapplyandbindMethodswithReal-LifeAnalogies_0.png"
date: 2024-06-22 06:09
ogImage: 
  url: /assets/img/2024-06-22-UnderstandingJavaScriptscallapplyandbindMethodswithReal-LifeAnalogies_0.png
tag: Tech
originalTitle: "Understanding JavaScript’s call, apply, and bind Methods with Real-Life Analogies"
link: "https://medium.com/@harshitkishor2/understanding-javascripts-call-apply-and-bind-methods-with-real-life-analogies-5e8ec2ea3996"
---



![image](/assets/img/2024-06-22-UnderstandingJavaScriptscallapplyandbindMethodswithReal-LifeAnalogies_0.png)

자바스크립트는 함수가 작동하는 문맥(this)을 제어하기 위해 call, apply, bind 세 가지 강력한 메서드를 제공합니다. 이러한 메서드를 이해하면 유연하고 재사용 가능한 코드를 작성할 수 있는 능력이 크게 향상됩니다. 각 메서드를 간단한 설명과 현실적인 비유와 함께 살펴보겠습니다.

# call

call은 한 객체로부터 메서드를 빌려와 다른 객체에 즉시 사용할 수 있도록 합니다.


<div class="content-ad"></div>

안녕하세요!

아래 예시를 보시면 함수 호출 시 사용되는 `table` 태그를 Markdown 형식으로 변경하였습니다.

예시:

Alice가 인사하는 메소드를 가지고 있다고 상상해봅시다:

```js
const alice = {
    name: 'Alice',
    sayHello: function(greeting) {
        console.log(greeting + ', ' + this.name);
    }
};

alice.sayHello('Hi');  // 결과: "Hi, Alice"
```

<div class="content-ad"></div>

밥이 인사를 하고 싶지만 sayHello 메서드가 없어요. call을 사용하면 앨리스의 메서드를 빌려와서 즉시 사용할 수 있어요:

```js
const bob = { name: 'Bob' };

alice.sayHello.call(bob, 'Hello');  // 출력: "Hello, Bob"
```

유사성: call은 앨리스의 메서드 책을 빌려와서 바로 사용하여 밥이 누군가에게 인사할 수 있게 도와주는 것처럼 생각해 보세요.

# apply

<div class="content-ad"></div>

apply는 call과 비슷하지만, 인수를 배열로 전달할 수 있습니다.

```js
function.apply(thisArg, [argsArray])
```

예시:

같은 인사 방법을 사용하면, 만약 인사말이 배열에 저장되어 있다면 apply를 사용할 수 있습니다:

<div class="content-ad"></div>

```js
const args = ['안녕'];

alice.sayHello.apply(bob, args);  // 출력: "안녕, Bob"
```

비유: apply는 앨리스의 메서드 책을 빌리는 것처럼 즉시 사용하는 것이지만 개별 지시사항을 주는 대신에 지시사항 목록을 전달합니다.

# bind

bind는 제공된 값으로 this 값을 설정하고 주어진 인수 시퀀스로 호출될 때 새 함수를 생성합니다. call 및 apply와 달리 bind는 함수를 즉시 실행하지 않습니다.

<div class="content-ad"></div>

```js
function.bind(thisArg, arg1, arg2, ...)
```

예시:

만약 나중에 Bob에게 인사를 준비하고 싶다면, bind를 사용하여 그렇게 할 수 있어요.

```js
const greetBobLater = alice.sayHello.bind(bob, '좋은 아침');

greetBobLater();  // 출력: "좋은 아침, Bob"
```

<div class="content-ad"></div>

비유: bind는 밥을 위해 알람 시계를 설정하는 것과 같습니다. 인사말을 미리 설정하고, 시간이 되면 밥이 사용할 수 있습니다.

# 주요 차이점

— 호출 시기:

- call과 apply는 함수를 즉시 호출합니다.
- bind는 나중에 호출할 수 있는 새로운 함수를 생성합니다.

<div class="content-ad"></div>

— 인수 처리:

- call은 개별적인 인수를 사용합니다.
- apply는 배열로 인수를 사용합니다.
- bind는 새 함수를 호출할 때 제공할 수 있는 새 함수를 위한 미리 설정된 인수를 사용할 수 있습니다.

## 사용 사례

- call: 함수를 즉시 호출하고 this 컨텍스트를 제어하고 개별적으로 인수를 전달하고 싶을 때 사용합니다. 예: 하나의 객체에서 메서드를 빌려와서 다른 객체에서 즉시 사용할 때.
- apply: 함수를 즉시 호출하고 배열에 있는 인수를 사용해야 할 때 사용합니다. 예: 배열에 저장된 매개변수 목록을 사용하는 방법.
- bind: 특정한 this 컨텍스트와 선택적으로 미리 설정된 인수를 사용하여 나중에 호출할 수 있는 함수를 만들어야 할 때 사용합니다. 예: 이벤트 핸들러나 콜백을 위해 메서드를 미리 설정하는 경우.

<div class="content-ad"></div>

# 간단한 비유를 통한 요약:

- call: "앨리스야, 밥이 지금 `sayHello` 메서드를 빌려와서 사용해도 될까?" (즉시 사용)
- apply: call과 동일하지만 목록 형태의 지시사항 제공: "여기, 밥, 여기 있는 목록 [`안녕`]을 사용해서 인사해봐."
- bind: "앨리스, 밥이 `좋은 아침`이라는 것으로 나준비를 해놓을 수 있을까?" (나중 사용을 위한 준비)

# 결론

JavaScript에서 call, apply 및 bind를 이해하면 함수 실행과 this 바인딩에 대한 더 큰 제어력을 가질 수 있습니다. 이러한 방법은 객체 지향 및 함수형 프로그래밍 패턴에서 특히 유용하며 코드의 유연성과 재사용성을 향상시킵니다. 간단한 비유를 사용하여, call과 apply는 즉시 메서드를 빌려와서 사용하는 것과 유사하며, bind는 미래 사용을 위해 메서드를 준비하는 것과 같습니다.

<div class="content-ad"></div>

초보자든 숙련된 개발자든, 이러한 방법을 숙달하는 것은 더 견고하고 유지보수가 쉬운 JavaScript 코드를 작성하는 데 도움이 될 것입니다. 즐거운 코딩하세요!