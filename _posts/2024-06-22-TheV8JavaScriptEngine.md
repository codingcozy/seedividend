---
title: "V8 자바스크립트 엔진의 모든 것 속도, 기능, 사용법"
description: ""
coverImage: "/assets/img/2024-06-22-TheV8JavaScriptEngine_0.png"
date: 2024-06-22 05:30
ogImage: 
  url: /assets/img/2024-06-22-TheV8JavaScriptEngine_0.png
tag: Tech
originalTitle: "The V8 JavaScript Engine"
link: "https://medium.com/@manikmudholkar831995/the-v8-javascript-engine-d1434ca77c96"
isUpdated: true
---




## Node.js 내부 심층 분석

![이미지](/assets/img/2024-06-22-TheV8JavaScriptEngine_0.png)

안녕하세요! 이 글은 고급 Node.js를 위한 시니어 엔지니어 시리즈의 첫 번째 글입니다. 이 글에서는 V8 엔진에 대한 자세한 설명과 작동 방식에 대해 설명하겠습니다. 고급 Node.js를 위한 시니어 엔지니어 시리즈의 다른 글은 아래에서 찾아볼 수 있습니다:

```js
포스트 시리즈 로드맵

* The V8 JavaScript Engine (이 글)
* Node.js의 비동기 IO
* Node.js의 이벤트 루프
* Worker Threads: Node.js의 멀티태스킹
* Child Processes: Node.js의 멀티태스킹
* 클러스터링 및 PM2: Node.js의 멀티태스킹
* 흔한 Node.js 오해 해소
```

<div class="content-ad"></div>


내용 목차

* V8를 선택한 이유는?
* Node.js에서 어떻게 사용되는가?
* V8는 어떻게 작동하는가?
* 자체적인 JavaScript 런타임 만들기


우리는 Node.js의 가장 낮은 수준에 도달했는데, 여기서는 사물이 혼란스럽고 복잡해집니다. JavaScript는 동적으로 타입이 지정되고 해석되는 언어이며, 우리가 JavaScript에서 실행하는 모든 것은 엔진에 전달됩니다. 그런 다음 엔진은 환경과 상호 작용하여 기계가 프로그램을 실행할 수 있도록 필요한 바이트 코드를 생성합니다. 이를 담당하는 엔진은 Google에서 개발한 오픈 소스 고성능 JavaScript 및 WebAssembly 엔진인 V8입니다. V8는 C++로 작성되었으며 Chrome(또는 유사한 환경)과 Node.js에서 모두 사용됩니다. V8는 ECMAScript와 WebAssembly를 완전히 지원합니다. 흥미로운 점은 V8가 브라우저에만 제한되지 않고 독립적으로 실행되어 모든 C++ 애플리케이션에 임베드될 수 있다는 것입니다.

# V8를 선택한 이유는?

<img src="/assets/img/2024-06-22-TheV8JavaScriptEngine_1.png" />


<div class="content-ad"></div>

더 낮은 레벨에 있을수록 더 많은 책임이 있습니다. C/C++을 어셈블리어(assembly)로 변환하기 위해서는 컴파일러가 필요합니다. 어셈블리를 기계어로 변환하기 위해서는 어셈블러(assembler)가 필요합니다. 그래서 Js를 실행 가능한 코드로 변환하기 위해서는 JS 엔진이 필요합니다. Firefox에서 Spidermonkey를 사용했으며 이후 Google Chrome에서 사용하기 위해 V8이 만들어졌고, 현재 Nodejs에서 사용되고 있습니다.

Spidermonkey와 V8 사이의 주목할만한 차이점은, 코드를 바이트코드(bytecode는 기계 코드의 추상화)로 변환한 후 중간 언어로, 그리고 기계 코드로 변환해야 한다는 것입니다. 이것이 Spidermonkey의 작동 방식입니다. 그러나 V8은 JS를 바로 기계 코드로 변환합니다.

# Nodejs에서는 어떻게 사용되는가?

V8 코드 소스 코드를 살펴보면 객체, JSON, 날짜 등의 구현을 찾을 수 있지만 Chrome에서 사용되는 document 객체나 Nodejs에서 사용되는 require()와 같은 요소는 찾을 수 없을 것입니다. 왜냐하면 Nodejs와 Chrome은 이러한 새로운 기능을 C++에서 구현하고 V8을 통해 JavaScript 함수에 바인딩하기 때문입니다. 왜 이렇게 하는 걸까요? 앞서 말했듯이, 더 낮은 수준은 더 많은 책임과 권한을 의미합니다. 그래서 C/C++은 네트워크 카드와 같은 저수준 자원에 액세스하고 활용하는 방법이 있습니다. 그래서 JS는 cpp를 사용하여 자신이 원하는 작업을 수행합니다. 이에 따라 NodeJS 소스 코드에는 V8이 아닌 required가 나타납니다.

다른 사람들도 자신의 사용 사례를 위해 동일한 작업을 수행할 수 있기 때문에 JavaScript가 많은 곳에서 사용되고 있는 이유입니다. 예를 들어, 자신의 cpp 기능 구현을 생성하고 이를 이동 오른쪽, 왼쪽과 같은 js 함수에 바인딩하여 로봇 공학에서 JavaScript를 사용하고 있습니다. 이에 따라 V8은 이 특정 사용 사례에 적합하지 않을 수 있으며, Duktape 또는 Jerryscript JS 엔진이 더 나은 선택일 수 있습니다.

<div class="content-ad"></div>

Node.js에서 V8은 결국 종속성이 되는데, 이는 공식 웹사이트에서 확인할 수 있어요.

![V8 GIF](https://miro.medium.com/v2/resize:fit:448/1*YPcaZUJzouB2OhVpyzxv6w.gif)

# V8 작동 방식

![V8](/assets/img/2024-06-22-TheV8JavaScriptEngine_2.png)

<div class="content-ad"></div>

V8 엔진은 코드를 두 단계로 컴파일합니다. 먼저 빠르지만 최적화되지 않은 기계 코드로 컴파일하는 단계가 있습니다. 이는 충분히 시작하는 데 도움이 됩니다. 이 과정이 진행되는 동안 뒤에서 매우 최적화된 코드를 생성하는 느린 컴파일이 이루어집니다. 이렇게 생성된 느린 컴파일된 코드가 작성되면 Javascript는 이 최적화된 코드로 전환됩니다. 이 두 단계는 Ignition(빠르고 저수준 레지스터 기반 해석기)와 Turbofan(최적화 컴파일러)로 알려져 있습니다. Just-in-Time (JIT) 컴파일이라는 새로운 접근 방식이 만들어졌습니다. 이는 해석과 컴파일의 장점을 결합한 것입니다.

V8는 Ignition이라는 해석기를 사용합니다. 먼저 추상 구문 트리를 받아 바이트 코드를 생성합니다. Ignition은 어느 정도 진행되지만, 함수가 충분히 최적화된 경우 컴파일러인 Turbofan을 통해 빠르게 만들어집니다.

단계별로 살펴보겠습니다:

- V8이 원시 코드를 구문 분석하여 Abstract Syntax Tree (AST)로 변환합니다. V8은 JS 코드를 이해하지 못하기 때문에 이 형태로 만들어야 합니다. 그리고 스코프도 생성됩니다.
- 그 AST 및 스코프를 바탕으로 Ignition 해석기는 바이트 코드를 생성할 수 있습니다.
- 엔진이 코드를 실행하고 타입 피드백을 수집하기 시작합니다. (실행 단계에서 코드에 대한 타입 피드백을 제공합니다.)
- 코드를 더 빠르게 실행하기 위해 바이트 코드를 최적화하는 컴파일러에 타입 피드백 데이터와 함께 전달할 수 있습니다. 최적화 컴파일러는 이를 기반으로 가정을 설정하고 고효율의 머신 코드를 생성합니다. 이 과정은 병렬로 이루어지며 V8은 자주 사용되는 바이트 코드를 "핫" 코드로 표시하여 더 효율적인 머신 코드로 변환합니다. 그러나 바이트 코드 대신 머신 코드를 바로 사용하는 이유는 다음과 같습니다.
- 머신 코드는 많은 메모리를 필요로 합니다.
- 머신 코드가 항상 바이트 코드보다 빠르지 않습니다. 머신 코드는 컴파일하는 데 시간이 오래 걸리지만 실행 단계에서는 빠릅니다. 반면 바이트 코드는 컴파일하는 데 더 적은 시간이 필요하지만 실행 단계는 느립니다.
- 어떤 가정이 잘못된 경우 최적화 컴파일러는 비최적화를 수행하고 해석기로 돌아갑니다.

<div class="content-ad"></div>

# 자체 JavaScript 런타임 만들기

자체 JS 런타임을 만들거나 이것이 가능한지 확인해보고 싶다면, 제가 최근에 만든 자체 JavaScript 런타임을 확인해보세요! 놀라운 V8 자바스크립트 엔진과 Libuv로 구동됩니다. V8, Libuv 및 C++로 구축된 기초 위에 놓여 있는데, 저는 강력한 Node.js를 처음부터 다시 만들기 위해 떠났습니다. JavaScript 런타임 개발의 세계로 깊이 파고들며 함께해 주세요.

# 떠나시기 전에!

- 더 많은 통찰을 기다려주세요! 팔로우하고 구독해 주세요.
- 👏 버튼을 클릭하고 누르고 있는 동안 생기는 일을 보셨나요?