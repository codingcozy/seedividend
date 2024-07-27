---
title: "서버 측 JavaScript의 진화"
description: ""
coverImage: "/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_0.png"
date: 2024-05-14 14:48
ogImage: 
  url: /assets/img/2024-05-14-EvolutionofServer-SideJavaScript_0.png
tag: Tech
originalTitle: "Evolution of Server-Side JavaScript"
link: "https://medium.com/itnext/evolution-of-server-side-javascript-314a8d408da4"
---


자바 기반 런타임부터 Node.js의 급부상, NPM의 탄생, 성장하는 생태계, 혁신적인 Deno, 그리고 초고속 Bun의 등장까지, 몇 년 동안 서버 측 자바스크립트가 어떻게 발전해 왔는지 알아보세요.

![Evolution of Server-Side JavaScript](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_0.png)

# 초기 시기

서버 측 자바스크립트에 대해 이야기할 때, 먼저 떠오르는 것은 Node.js입니다. 그러나 노드 이전에도 백엔드 자바스크립트는 존재했음을 알아야 합니다. 이들은 생태계를 혁신시키지 않았던 것입니다. 커뮤니티에 영감을 주지 않은 것들. 역사의 잊혀진 페이지들 속에 사라진 것들입니다:



- Jaxer
- Silk
- RingoJS
- Rihno
- AppEngineJS 등

자바스크립트는 백엔드 프로젝트에서 피해 왔던 이유가 있습니다. 서버는 요청 당 스레드 모델에서 작동했는데, 이는 싱글 스레드인 자바스크립트와 잘 맞지 않았습니다.

한 스레드가 점유되면 서버가 한 번에 하나의 요청만 처리할 수 있어 느리게 동작할 수밖에 없었습니다.

멀티스레딩을 달성하기 위해 Ringo와 같은 라이브러리는 자바 가상 머신 위에 구축되었습니다. 그러나 심지어 JVM을 사용하여도 이러한 문제들을 해결하지 못했습니다. (서버에서 10,000개의 동시 연결을 처리하는 C10K 문제)



JavaScript로는 이 문제에 대한 해결책이 없어 보였는데, 2009년 Ryan Dahl이 Node.js를 소개하기 전까지였습니다.
Node.js는 JVM을 기반으로하지는 않았지만, C10K 문제를 해결했습니다.

그래서 Node.js를 돋보이게 한 것은 무엇일까요? - 바로 비차단입니다!

![Node.js 이미지](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_1.png)

# Node.js



Node.js는 개방 소스, 크로스 플랫폼, 비동기적이고 이벤트 주도형 자바스크립트 런타임 환경으로, 개발자들이 서버에서 자바스크립트 코드를 실행할 수 있게 해줍니다. 이는 Google Chrome 브라우저를 구동하는 V8 자바스크립트 엔진 위에 구축되어 있습니다.

Node.js는 개발자들이 JavaScript를 통해 OS와 상호작용할 수 있게 해 줍니다. 이는 파일 시스템, 운영 체제 검사, 프로세스 처리 외에도 HTTP 및 TCP 서버를 생성하고, DNS, CLI와 그 이상의 기능들을 사용할 수 있게 해 줍니다.



Node.js는 최소주의, 속도 및 모듈성(공통JS 모듈을 사용하여)이라는 점에서 마이크로서비스를 개발할 때 완벽한 선택지가 되었습니다.
결국, Node.js는 많은 노드로 분산 응용 프로그램을 구축하기 위해 설계되었습니다. 따라서 이름이 Node.js인 것입니다.

하지만 Node.js는 그냥 수준을 높인 것이 아니라, 그것을 완전히 파괴했고 이 모든 것은 뒤에서 실행되는 천재적인 아키텍처로 시작되었습니다.

## Non-Blocking I/O

Chrome의 V8 엔진(C++)과 Libuv(C 라이브러리)에서 구축되어진 Node.js는 JavaScript 외부에서 I/O 및 비동기 작업을 처리할 수 있도록 허용했습니다. 이때 작업의 스케줄링은 Event Loop에서 처리되었습니다.



![Node.js](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_2.png)

이것은 Node.js가 메인 JavaScript 스레드를 차단하지 않고 속도를 저하시키지 않고 여러 API 요청을 실행하거나 파일/데이터베이스에 읽기/쓰기를 할 수 있다는 것을 의미합니다.

이 공식은 Node.js에서 이벤트, 소켓, 스트림 및 해싱 알고리즘을 포함하여 CPU 바운드 작업이 아닌 모든 것에서 재사용됩니다.

Node.js 팀은 더 나아가서 Node.js 애플리케이션을 CPU 한계에 도전하게 허용함으로써 당신의 컴퓨터의 모든 파워를 활용할 수 있도록 했습니다. 기본적으로 Node.js는 CPU의 단일 프로세스에서 실행되며, 실패할 경우 그만입니다. 그러나 개발자들이 자식 프로세스를 활용할 수 있게 함으로써, Node.js는 각 CPU에 대해 복제본을 생성하고 내장된 로드 밸런서를 사용하여 트래픽을 균형있게 분산시켜 컴퓨터의 전체 성능을 활용할 수 있습니다.




![이미지](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_3.png)

그리고 하나가 실패하면, Node.js는 다른 것을 분기하고, 사이클을 다시 시작합니다. 
"단일 스레드"를 넘어서는 이야기를 해보는 거야.

Node.js는 이 모든 것을 원래부터 제공해. 필요하다면 Nginx나 PM2, Docker, 또는 Kubernetes 같은 프로세스 매니저를 사용해서 기능을 향상시킬 수도 있어.
Node.js를 따라온 JavaScript 런타임들은 이벤트 기반(논블로킹) 아키텍처를 디자인할 때 Node.js를 따랐지.

하지만 네이티브 메커니즘 외에도, Node.js는 유틸리티, 라이브러리, 프레임워크를 위한 써드파티 패키지로 업그레이드할 수 있게 해 줬어.





![Evolution of Server-Side JavaScript](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_4.png)

# NPM

Node Package Manager (NPM)은 Isaac Z. Schlueter에 의해 개발된 JavaScript 언어용 패키지 관리자입니다. NPM의 목적은 Node.js 또는 웹 앱을 다양한 서드파티 도구로 업그레이드할 수 있도록 하는 것입니다.

패키지를 추가하는 것은 다음과 같이 간단합니다:




```js
> npm i package-name
```

그게 전부에요. 
이제 패키지가 프로젝트에 추가되었고(패키지.json 파일에 표시됨) 사용할 준비가 되었습니다. 직접 CDN을 찾을 필요가 없을 뿐만 아니라 .dll 파일을 설정할 필요도 없어요.

<img src="/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_5.png" />

일부 패키지는 서버 측 또는 웹 앱에만 특정되어 있고, 다른 것은 양쪽에서 작동합니다. 그리고 다양한 패키지 관리자가 있습니다:




- Npm
- Yarn

누구나 자신의 패키지를 게시할 수 있기 때문에 NPM은 오픈 소스 도구들의 가장 큰 레지스트리 중 하나로 성장했습니다.

## Express.js

Node.js에 내장된 표준 HTTP 서버 모듈은 개발자들의 기대를 충족시키지 못했습니다. 곧 Express가 나와 문제를 해결했습니다. Express는 Node.js를 인기있게 만든 간소한 API 프레임워크입니다. Express의 아름다움은 몇 줄만으로도 처음부터 HTTP 서버를 시작할 수 있다는 점입니다.



<img src="/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_6.png" />

Express의 또 다른 특징은 매우 확장 가능하다는 것입니다. Express 핵심 팀에 의해 개발되지 않은 것은 전 세계의 오픈 소스 개발자들의 커뮤니티에 의해 개발되었습니다.

## 풀 스택 JavaScript

Node.js는 JavaScript 서버 기술이기 때문에, 이미 JavaScript에 익숙한 프런트엔드 개발자들은 새로운 프로그래밍 언어나 스택을 배우지 않아도 백엔드 개발자로 전환할 수 있습니다.



동네에 또 다른 신입생이 나타났어요. Express와 동일한 해에 MongoDB도 선보였죠, JSON 구조를 사용하여 데이터를 저장하는 문서 기반 데이터베이스입니다. MongoDB 팀은 자신들의 데이터베이스를 홍보할 만한 파트너가 필요했고, 그 파트너를 Node.js & Express에서 찾았어요.

- Angular.js와 같은 JavaScript 웹 프레임워크
- Express.js와 같은 백엔드 서버사이드 JavaScript 프레임워크
- JavaScript를 닮은 데이터베이스 MongoDB
- JavaScript로 만들어진 런타임 환경 Node.js

JavaScript 스택이 탄생했습니다.

![에볼루션](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_7.png)



# ECMAScript 6

ES6(가끔 ES2015로도 불림)은 언어에 전환점을 일으킨 주요 JavaScript 버전이었습니다.

- Let & Const
- Classes
- Promises
- ES 모듈
- Map 및 Set 데이터 구조
- 화살표 함수
- 전개 연산자
- 해체 할당

Classes는 다른 언어에서 온 개발자들이 JavaScript로 쉽게 적응할 수 있도록 도와주었는데, 대부분의 경우 Classes는 JavaScript Prototype 상속을 위한 문법적 설탕일 뿐입니다.



프로미스는 비동기 데이터를 조작하는 새로운 방법으로, 콜백보다 간단하게 사용하고 더 빠릅니다. ES6에서는 생성기 함수도 함께 도입되었습니다.

![이미지](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_8.png)

화살표 함수를 사용하면 콜백 구문이 더 깔끔하고 간단해지며, 전개 연산자와 구조 분해를 사용하면 복잡한 구조에서 데이터를 쉽게 추출할 수 있습니다.

모듈의 강력함이 브라우저에도 도입되었습니다. Node.js에서 사용되는 CommonJS 모듈과 달리 ES 모듈은 패키지를 비동기적으로 가져왔습니다. 이를 통해 JavaScript 스크립트 파일을 더 작은 파일로 분할하고 연결할 수 있었습니다.



언어 변경으로 서버 측 JavaScript(Node.js)도 적응해야 했습니다. ES6 기능을 사용하고 프라미스를 통해 비동기 작업을 처리할 수 있도록 만든 것부터 ES 모듈 지원을 제공하는 것까지 바뀌었습니다(Node.js v13에서 나온 것). 

![Evolution of Server-Side JavaScript](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_9.png)

## 번들러

이러한 새로운 언어 기능과 최신 라이브러리 중 주요 단점 중 하나는 브라우저 지원에 있습니다. Google Chrome에서 작동하는 것이 다른 웹 브라우저에서는 동일하게 작동하지 않을 수도 있습니다. 결국 모든 브라우저는 서로 다른 JavaScript 엔진 위에 구축되어 있기 때문입니다.



이를 해결하기 위해, 프레임워크는 ES6, React 또는 TypeScript로 작성된 코드를 일반 JavaScript로 번들하는 데 사용되는 Babel 및 Webpack과 같은 Transpiler에 의존했습니다.
이러한 도구는 또한 ES 모듈 가져오기(예: 라이브러리 가져오기)를 제거하고, ES6(그리고 향후 ES 버전) 코드를 ES5 등가물로 변환하고, 빈 공간을 제거하며, 이미지를 압축하고, 프로세스를 자동화하는 등 다양한 최적화를 제공했습니다.

한 번 변환 및 번들링되면, 코드는 브라우저 및 Node.js에서 완전히 실행 가능했습니다. 몇 년 동안 기술이 발전했고 모든 최신 브라우저가 ES6를 지원하지만, 새로운 ECMAScript 버전이 출시될 때마다 이러한 기술들은 여전히 사용되고 있습니다.

내 컨텐츠를 좋아하시고 더 많이 보고 싶다면 저에게 따뜻한 한잔의 커피를 사주세요 ☕

![이미지](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_10.png)



![2024-05-14-EvolutionofServer-SideJavaScript_11](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_11.png)

# TypeScript

ES6와 함께 최근 몇 년 동안 JavaScript 언어에 가져온 가장 큰 혁신 중 하나는 TypeScript입니다.

TypeScript는 JavaScript를 기반으로 확장하여 언어에 엄격한 유형을 추가함으로써 개발되는 오픈 소스 언어입니다. TypeScript는 string, number, boolean 및 array와 같은 유형 변수를 사용하도록 개발자를 제한하며 Dictionary, Generics, Enums, Interfaces, Classes 및 Tuples와 같은 추가 기능을 도입하며 엄격한 널 체크를 통해 각 기능에 더 많은 컨텍스트를 제공합니다.



<img src="/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_12.png" />

하지만 TypeScript는 JavaScript에 엄격한 타입을 도입하려는 첫 번째 시도가 아니었습니다.

2000년대 초반에는 JavaScript를 타입과 함께 개선하려는 아이디어가 있었습니다. 이것은 JavaScript ECMAScript 4라는 코드명을 가졌습니다. 그러나 변경 사항이 너무 커서 당시 브라우저와 호환되지 않았습니다.

그 실험이 실패했다고 말할 수 있습니다. 그래서 ES 3.1 이후에 우리는 즉시 ES5로 넘어가고, ES4는 TypeScript로 재구성되었습니다.



<img src="/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_13.png" />

# 성장하는 생태계

Node.js가 인기를 얻을수록 생태계도 함께 커져갔어요. 갑자기 자바스크립트가 모든 곳에 나타났죠. 핸드폰에서, 데스크톱 앱에서, 블로그에서, 개발자 모임에서도 말이에요.

- Cross-platform tools (Electron, React Native, Ionic)
- Visualization tools (D3, Chart, Three.js)
- Video games (Phaser)
- 다양한 웹 프레임워크 (React, Angular, Vue)
- 상태 관리 도구 (Redux, Ngrx, Mobx)
- 시간 및 날짜 조작 (Moment, DateFns, Day.js)
- 유틸리티 라이브러리 (Lodash, Rx.js, Async.js)
- 기계 학습 (TensorFlow.js)
- 운영 체제 (NodeOS)



NPM에는 100K개 이상의 모듈이 있습니다.

그게 충분하지 않다면, Serverless 컴퓨팅의 팬들은 개발자들을 위한 프레임워크를 개발하여 코드로 인프라를 설정하고 AWS, Azure 및 GCP와 같은 클라우드 플랫폼에 분산시켰습니다. 그 결과 Serverless Framework가 탄생되었습니다.

프로그레시브 웹 앱도 등장했고, Node.js도 발전했습니다. HTTP 2 지원, Async Hooks, Worker Threads 및 Watch 모드 등 다양한 기능이 추가되었습니다.
한편, Angular의 팬들은 Nest.js를 개발했습니다. 이는 Express.js가 사용하는 함수형 접근 방식보다 C# 및 Java와 같은 언어에 사용되는 객체지향 패러다임을 선호하는 신선한 백엔드 프레임워크입니다.



자바스크립트는 모든 면에서 선전하고 있는 것으로 보여서 얼마든지 사라지지 않을 것 같아요. 하지만 Node.js는 따라가는 데 어려움을 겪고 있었어요.

## Node.js Chakra

Node.js의 다른 버전이 있었죠. Node.js Chakra는 Microsoft가 자사의 JavaScript Chakra 엔진을 사용하여 Node.js를 재창조하려는 시도였어요. 이는 Windows 플랫폼을 특히 대상으로 한 고성능을 자랑했죠.

하지만 운명은 그렇지 않았어요. Node.js Chakra의 인기는 매우 낮았기 때문에 Microsoft는 이 프로젝트를 포기하고 V8을 사용하기 시작했어요.



<img src="/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_15.png" />

# Node.js의 문제점

시간이 지남에 따라 Node.js의 결함이 더욱 뚜렷해졌습니다.

## ES 모듈



프론트엔드 JavaScript가 ECMAScript 모듈을 채택하기 시작하면서 Node.js도 이 트렌드를 따라야 한다는 것이 분명해졌어요. 그러나 기존 NPM 모듈은 여전히 CommonJS 모듈에 의존하고 있었죠. 이는 라이브러리 개발자들도 ES 모듈만 지원하거나 둘 다 지원하도록 라이브러리를 변경해야 한다는 것을 의미했어요. Node.js는 둘 다 기본으로 지원하죠.

## TypeScript

TypeScript는 Node.js를 여러 가지 면에서 개선했어요. 단점은 TypeScript를 사용하려면 ts-node 패키지를 설치해야 하며, 사용한 NPM 패키지의 TypeScript 변형도 함께 설치해야 한다는 것이에요. Express를 설치할 때 @types/express도 함께 설치해야 한다는 거죠. 일부 패키지는 TypeScript 변형이 없어 TS와 전혀 호환되지 않을 수도 있어요. 반면에 새로운 패키지들은 TS 지원이 내장되어 있어 똑같은 패키지를 두 번 설치할 필요가 없는 것이 장점이에요.

## 다양한 NPM 보안 문제



NPM은 보안 문제로 유명합니다. 누구나 패키지를 만들고 NPM에 발행할 수 있기 때문에 악성 코드를 만들어 온라인으로 공유하는 것을 막을 방법이 없습니다. 또한 해로울 수 있는 패키지나 사용이 중단된 패키지를 설치할 때 경고도 없습니다.

![이미지](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_16.png)

이러한 문제들은 Node.js 개발자들을 처음부터 괴롭혔습니다. NPM 팀은 이를 해결하기 위해 끊임없이 노력하고 있습니다.

## 표준화 부족



Node.js 프로젝트를 설정하는 방법이나 사용할 라이브러리 도구, 따를 특별한 코드 규칙이 없습니다. 다른 패키지들마다 다른 구현을 가지고 있죠 (함수형, 이벤트 기반, 또는 객체 지향).

필요한 것은 모두 NPM에 있어서 여러분의 프로젝트에 맞게 적합한지 확인해볼 수 있어서 끝도 없이 탐구하고 테스트할 수 있습니다. 다행히도 온라인에서 좋은 콘텐츠 제작자, 튜토리얼, 블로그 기사들이 있어서 적절한 도구를 찾는 데 도움을 줄 수 있습니다.

이런 문제들을 살펴보면 다른 언어의 백엔드 개발자들이 Node.js를 피하는 이유가 분명해집니다. 대부분의 문제들이 해결되었지만, 한 표준에서 다른 표준으로의 전환은 많은 Node.js 개발자들에게 영향을 주었습니다. 심지어 Ryan Dahl이라는 창조자조차도 몇 년 전에 새로운 JavaScript 런타임을 만들기로 결정했죠. 이것이 Deno입니다.

![에볼루션 오브 서버 측 자바스크립트](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_17.png)



# 데노

데노는 서버 측 자바스크립트에 대한 새로운 접근 방식입니다. 시선을 모은 신입생입니다. Libuv 대신 V8 및 Tokio (Rust 라이브러리)로 작성되어 더 빠르고 가벼운 런타임으로 홍보되었습니다.

Node.js의 창시자에 의해 개발된 점이 엄청난 마케팅 포인트였습니다. 라이언은 노드.js의 문제점을 정확히 알고 있었으며 데노로 어떻게 개선할지 알고 있었습니다. 두 번째로, 노드.js의 창조자가 더 이상 사용하지 않고 일부 개발자를 데노의 세계로 끌어들였습니다.

데노는 많은 새로운 기능을 가져왔습니다:



- 그림 파일을 Markdown 형식으로 변환하면 됩니다.



거기에 더불어, Node.js 팬들은 Deno의 일부 기능이 Node.js로 가져와지길 원하며, 특히 TypeScript가 기본으로 제공되길 열망합니다. 그러나 아직 그러한 변화는 일어나지 않았습니다.

그러나 이 모든 기능들 중에서도 한 가지 주요 문제가 있었습니다 — Third-party 모듈들! Deno에서 NPM을 제거하는 것은, 이미 Node.js에서 NPM으로 갖고 있던 대부분의 기능들을 다시 개발해야 한다는 것을 의미했습니다.

확실히 Deno 팀은 일부 NPM 패키지를 활성화하는 방법을 개발했지만, 내용의 부족으로 인해 Deno가 Node.js를 대체하지 못했습니다. 대신, Node.js는 Deno에서 가져온 몇 가지 새로운 기능을 채택했습니다. 오늘날에도 Node.js는 JS 생태계에서 가장 널리 사용되는 서버 측 플랫폼으로 자리잡고 있습니다.

![이미지](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_19.png)



# 메타 프레임워크

최근 몇 년 동안 우리는 JavaScript 메타 프레임워크의 부상을 지켜보았습니다 - 이 도구들은 완전한 스택 앱을 구축할 수 있는 도구입니다. 백엔드 부분은 데이터베이스와 통신하고 엔드포인트를 노출시키며 다양한 방법으로 콘텐츠를 렌더링하는 역할을 하고 있습니다:

- 정적 사이트 생성
- 서버 측 렌더링
- 증분적 정적 재생성

한편, 프론트엔드 부분은 싱글 페이지 애플리케이션입니다. 이를 수행할 수 있는 몇 가지 도구가 있으며, Vercel의 Next.js가 그 중 선두를 달리고 있습니다.



![Evolution of Server-Side JavaScript](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_20.png)

샤벨트(Svelte) 및 퀵(Qwik)와 같은 새로운 프레임워크들이 자체적인 기능들을 가져왔습니다. 기존의 수분화(hydration)를 포기하고 Resumability라는 새 개념을 선호했습니다.

이어서 Vite가 등장했습니다. 이는 속도와 성능에 중점을 둔 새로운 프론트엔드 빌더 도구로, Webpack의 직접적인 경쟁 상대입니다.
Vite는 백엔드에서도 발전하고 있습니다. Nest.js 팀은 SWC를 발견했습니다. 이는 Rust 기반의 플랫폼으로, 빠른 컴파일 및 번들링에 사용할 수 있으며 Vite와 호환됩니다.

노드.js를 구동하는 V8 엔진은 더 이상 서버 측 개발의 궁극적인 해결책으로 여겨지지 않습니다. Rust가 점유율을 높이면서, 갑자기 죽을 것 같은 새로운 도구가 등장했습니다.



<img src="/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_21.png" />

# 번

인터넷에 자바스크립트 런타임 간의 다양한 성능 비교 기사들이 올라온 것은 2022년 말쯤이었습니다. 그 중 하나가 새로운 초고속 기술인 번입니다.

Zig로 작성되었고 V8 엔진을 완전히 피하는 번은 Deno 및 Node.js를 합친 것보다 현저히 빠르다는 것이 증명되었지만, 이점은 여기서 끝나지 않습니다:



- 즉시 사용 가능한 TypeScript 지원
- Node.js 코어 모듈 지원
- NPM 지원
- 내장 번들러
- ECMAScript 및 CommonJS 모듈 지원
- 기존 프레임워크 지원 (예: Next, Express 또는 Nest)

Bun 발명자 Jarred Sumner가 괴물을 만들었습니다.

Bun은 JavaScript 커뮤니티에서 확실하게 폭발적인 반응을 얻었습니다.

현재 모든 게 완벽하다는 뜻은 아닙니다. Bun은 NPM을 통해 문을 열었지만, 제대로 기능하지 않는 패키지 목록이 꽤 있습니다. 그리고 Bun은 막 나온 것이기 때문에 경험이 부족하고 이전에 나온 런타임과 비교했을 때 온라인 참조가 부족합니다.



저에게 있어서 Bun의 매력은 빠르거나 새롭고 혹평받는 것이 아니라, 오히려 Bun이 표준을 만들고자 한다는 점입니다. 개발자들을 소외시키거나 모듈을 가져오는 방법이나 패키지의 출처를 지시하는 대신, Bun은 맞는 방법을 찾으라고 장려합니다. 이는 JavaScript 개발자들과 생태계를 통합하는 중요한 한걸음이라고 생각해요.

![이미지](/assets/img/2024-05-14-EvolutionofServer-SideJavaScript_22.png)

Bun은 계속 발전할 것입니다. 버그는 수정되고 새로운 기능이 정기적으로 추가됩니다. 앞으로 몇 년 안에 Bun이 어떻게 발전할지 기대됩니다.

# 백엔드 JavaScript의 미래



다년간 JavaScript는 여러 변형을 거쳤어요. 어떤 확장 기능은 실패했고, 어떤 것은 성공하여 오늘날의 생태계가 되기까지 고난을 겪었죠.

서버 측 JavaScript는 몇 년 전보다 오늘날 더 나은 상태에 있는 걸까요? 음, 그것은 상황에 따라 다르죠.

Node.js 이전의 상태와 비교하면 JavaScript는 많은 발전을 이루었어요. 1995년 JavaScript가 시작된 때와는 더욱 예측할 수 없는 방향으로 발전해 왔거든요. 오랜 기간 개발자였다면 변화를 환영하며 빨리 적응할 수 있을 겁니다. 하지만 JavaScript 초심자라면 모든 것이 다른 런타임, 언어, 번들러, 모듈 등이 얽혀있어 엉망스럽게 들릴 수도 있어요.

내가 생각하기에 장래에 Node.js가 여전히 최고의 서버 측 JavaScript 런타임 역할을 하게 될 것 같아요. 경쟁 상대들의 긍정적인 점들에도 불구하고, 다른 도구들은 Node.js만큼의 안정성, 많은 API와 온라인 참고 자료, 인기가 없을 뿐만 아니라 오랫동안 실전을 경험했다는 점에서 뒤쳐지죠.



나의 극심한 희망은 언젠가 세 가지 중 가장 좋은 것을 모두 하나의 지붕 아래에 갖게 될 것이라는 것입니다 —빠르고 안전한 런타임, JS, TS 및 번들링을 위한 기본 지원이 충분히 갖춰진 것, 그리고 내장 및 제3자 도구가 풍부한 것, 그리고 전 세계 개발자들이 사용하는 것과도 함께요.
지금까지 Bun은 그것을 달성하기 위한 좋은 길일 것입니다.

분명한 한 가지는, 확실한 것은, 흥미진진한 JavaScript 세계에서 다음에 무엇이 일어날지 확실히 말하기 쉽지 않다는 것입니다.

# 더 많은 JavaScript 이야기 읽기

이제 잠시 안녕👋