---
title: "안녕하세요 HTML 안녕하세요"
description: ""
coverImage: "/assets/img/2024-05-15-ripHTMLrip_0.png"
date: 2024-05-15 10:45
ogImage: 
  url: /assets/img/2024-05-15-ripHTMLrip_0.png
tag: Tech
originalTitle: "<rip>HTML< rip>"
link: "https://medium.com/@decketts/rip-html-rip-797bd9685c95"
---


## JavaScriptUI — DevBlog #2

얼마 전에 미친 아이디어가 떠올랐어요: HTML 없이 웹사이트를 만들 수 있을까?

아니요, 제가 말하는 것은 새로운 브라우저 엔진을 만드는 것이나 캔버스를 사용하여 콘텐츠를 표시하는 것이 아닙니다. 또한 WebAssembly나 HTML로 컴파일된 새 언어를 사용하는 것이 아닙니다. 제가 말하는 것은 오늘날 어떤 브라우저에서도 즉시 실행되는 완전히 기능적인 웹사이트를 작성하는 방법입니다. 그것도 HTML 한 줄을 작성하지 않고요.

실은 가능합니다. 그리고 지금 바로 수행하기 까다롭지도 않아요. 우리는 그저 JavaScript의 DOM API를 맹공하면 되는 것 뿐입니다. 확실히 여전히 브라우저 안에서 약간의 HTML을 생성하지만 그건 당장 무시해도 되는 구현 세부사항입니다. 필요한 건 DOM 뿐이에요. 그러니 JavaScript로 생성된 웹사이트의 세계로 뛰어들어 모든 최선의 방법을 위반해 보죠.



## Views 및 View 트리

어떤 것을 만들기 위해서는 객체가 필요합니다. 기본 옵션은 document.createElement()을 사용하여 HTML 요소를 만들고, Element.prototype.append() 또는 Node.prototype.appendChild()를 사용하여 이후에 DOM에 추가하는 것입니다. 꽤 기본적인 방법이지만 불편하고 지저분하며 혼란스럽습니다. 더 나은 방법이 있습니다.

그 대신, Image, Text 및 Stack과 같은 선언적 생성자를 정의하고 이를 Views(뷰)라고 부르겠습니다. 이들은 여전히 DOM API에 의존하지만 더 나은 선언적 구문을 제공할 수 있습니다. 예를 살펴보세요:

```js
Stack(
  Text("Hello World!"),
  Stack(
    Text("Everyone has a plumbus in their home."),
    Image("plumbus.jpeg")
  )
);
```



이 점이 아름다운 이유입니다. 이는 유효한 JavaScript입니다. 우리는 단순히 일부 View 생성자를 호출하고 그들의 자식들을 인수로 제공합니다. 결국 어떤 View 트리도 우리가 사용하는 언어와는 무관하게 중첩된 목록일 뿐입니다.

다른 이점은 사용자 정의 된 Views를 생성할 수 있으므로 Safari가 사용자 지정 내장 요소를 구현하기 위해 또 하나의 10년을 기다릴 필요가 없습니다. 또는 의미를 잃어버린 것에 분개하고 있다면, 적절한 HTML 요소에 매핑되는 Views를 생성할 수도 있습니다:

```js
Div(
  Div(
    Div(
      Div(),
      Div(),
      Div()
    )
  )
);
```

## 절대 "new(er)" 라고 말하지 마세요



새로운 키워드를 View 생성자 앞에 사용하지 않은 이유는 두 가지 있어요. 첫째, 나무들이 아주 빠르게 아주 커질 수 있기 때문에, 더 짧은 구문을 사용하면 가독성이 향상됩니다. 둘째, JavaScript에는 이미 Image나 Text와 같은 생성자들이 있어서, 이러한 이름들이 필요합니다. 다행히도, 대부분의 내장 생성자들은 new 키워드와 함께만 작동하므로, 이론적으로 자체 작성한 기능을 추가하면서도 이 기능을 유지할 수 있습니다.

```js
new Image(width, height); // HTMLImageElement을 생성합니다 (기본 동작)
Image(url); // Image View를 생성합니다 (JavaScriptUI)
```

## 논리의 마법

이제 진정한 재미가 시작되는 부분이죠. 우리는 JavaScript에서 HTML을 그대로 따르는 것이 아니라, 그 이상의 기능을 구현할 수 있어요. 이제 우리는 진정한 프로그래밍 언어의 영역에 들어왔으니 변수, 연산자, 조건문, 반복문, 일급 함수 등을 활용하여 원하는 것을 무엇이든 만들 수 있습니다. 심지어 조건적 할당처럼 간단한 기능조차 HTML의 능력을 크게 뛰어넘는 것이죠:



```js
Stack(
  yourChoice ? Text("red pill") : Text("blue pill")
);
```

이제, FizzBuzz가 일부 불행한 CSS 애호가들에게 상처를 줄 수 있다는 것을 이해했어요. 하지만 함수, 연산자, 반복문 및 조건문은 매우 간단하고 범용적이며 강력한 빌딩 블록으로, 더 나아가게 하는 데 도움이 되는 것들이에요. 간단한 콜백 함수로 다음과 같은 작업들을 수행할 수 있어요:

```js
Stack(function* () {

  let i = 1;
  while (i <= 100) {

    if ((i % 15) === 0) {
      yield Text("FizzBuzz");

    } else if ((i % 3) === 0) {
      yield Text("Fizz");

    } else if ((i % 5) === 0) {
      yield Text("Buzz");

    } else {
      yield Text(i);
    }

    i += 1;
  }
});
```

제너레이터 구문에 대해 걱정하지 마세요. 여기서는 함수에서 여러 값을 선언적으로 반환하기 위해 사용했어요. View 생성자에서 약간의 속임수를 사용하여 일반 함수로도 동일한 작업을 수행할 수 있지만, 이제 이 콜백이 바닐라 JavaScript에서 기대하는 것과 약간 다르게 작동한다는 점에 주의해야 해요:



```js
Stack(() => {

  let i = 1;
  while (i <= 100) {

    if ((i % 15) === 0) {
      Text("FizzBuzz"); // Stack에 추가

    } else if ((i % 3) === 0) {
      Text("Fizz"); // Stack에 추가

    } else if ((i % 5) === 0) {
      Text("Buzz"); // Stack에 추가

    } else {
      Text(i); // Stack에 추가
    }

    i += 1;
  }
});
```

또는 블록 없이 조건문을 사용하기를 원하신다면, 이렇게 써도 돼요:

```js
Stack(() => {

  let i = 1;
  while (i <= 100) {

    if (i % 15 === 0) Text("FizzBuzz");
    else if (i % 3 === 0) Text("Fizz");
    else if (i % 5 === 0) Text("Buzz");
    else Text(i);

    i += 1;
  }
});
```

더 이상 선언적으로 할 수 있는 게 없네요.




하지만 더 나아가면 더 나아갑니다. View 생성자는 콜백에 인수를 제공하거나 this 컨텍스트를 자체로 설정하거나 UI 구축의 여러 불편한 측면을 추상화하기 위해 반응 시스템을 구현할 수도 있습니다. 현재 가능한 것과 불가능한 것에 대한 간단한 개요입니다.

```js
Stack((argument) => {

  this; //상위 항목에 접근 가능

  argument; //인수 작동(View 생성자 내에서 미리 정의됨)
  
  //myView; //뷰 참조는 작동하지 않음
  
  Text("foo"); //일반적인 자식 추가는 작동함
  
  let view = Text("temp"); //변수 할당은 작동하지만 새로 생성된 뷰는 자동으로 부모에 추가됨
  
  evaluate ? Text("foo") : Text("bar"); //삼항 연산자는 작동함
  
  if (
      evaluate //조건문도 작동
  ) {
      Text("foo");
  } else {
      Text("bar");
  }
  
  let i = 0;
  while (i < 5) {
      Text("foo"); //루프 작동
      i += 1;
  }
});
```

## 이것이 JavaScriptUI입니다.

이것이 JavaScriptUI의 기초입니다. 내 목표는 HTML 및 CSS의 모든 기능을 직접 JavaScript로 이관하여 기본 브라우저 API 및 일반 목적 프로그래밍 언어의 방대한 기능을 활용하는 것입니다.



매주 새로운 글을 게시해 여러분을 최신 정보로 업데이트하고 제 진전을 공유하려 합니다 (아무도 안 읽어준다면 제 자신을 위로하기 위한 글이겠지요 😄). 곧 여러분께 작동하는 코드 몇 줄을 보여드릴 수 있기를 희망하며, 여러분도 관심이 있으시다면 함께 즐기시길 바랍니다.

그동안 제 글을 즐겨주신다면 박수쳐 주시고, 의견을 남기고 DevBlog를 관심 있는 사람들과 공유해 주세요.

감사합니다! 그리고 계속해서 기대해 주세요.

⬅️ 자바스크립트UI — DevBlog #1, HTML과 CSS 없이 새로운 웹 페이지