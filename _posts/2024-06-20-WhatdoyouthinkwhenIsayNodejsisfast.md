---
title: "Nodejs는 빠르다고 하면 어떻게 생각하시나요"
description: ""
coverImage: "/assets/img/2024-06-20-WhatdoyouthinkwhenIsayNodejsisfast_0.png"
date: 2024-06-20 01:36
ogImage: 
  url: /assets/img/2024-06-20-WhatdoyouthinkwhenIsayNodejsisfast_0.png
tag: Tech
originalTitle: "What do you think when I say Node.js is fast?"
link: "https://medium.com/@hoaitx/what-do-you-think-when-i-say-node-js-is-fast-1acf8a40ffc9"
---


<img src="/assets/img/2024-06-20-WhenYouHearNodejsIsFast_0.png" />

만약 Node.js 개발자에게 플랫폼에 대한 좋은 점에 대해 물어보면 "Node.js가 빠르다"고 들을 확률이 높습니다. 왜 빠른지 묻는다면 JavaScript가 빠르거나 비동기성, 싱글 스레드, 또는 V8 엔진 때문이라고 들을 수도 있습니다...

이러한 모든 이유들은 어떤 면에서는 타당할 수 있습니다. 어떻게 작동하든 Node.js의 메커니즘은 궁극적으로 처리 능력을 높이기 위해 노력합니다. 하지만 이러한 기능을 구현하는 것은 Node.js뿐만이 아니며, 많은 다른 언어나 플랫폼에서도 구현되어 있고 때로는 더 나은 방식으로 구현되어 있을 수도 있습니다.

따라서, Node.js는 정말로 얼마나 빠를까요? 이 글에서는 "Node.js가 빠르다"라는 문제에 대한 내 견해를 제시하겠습니다.

<div class="content-ad"></div>

하지만 먼저, 대부분의 사람들이 Node.js가 빠르다고 결론 내릴 때 자주 언급하는 메커니즘을 살펴보겠습니다.

# Single Thread

Node.js는 비동기 작업을 처리하기 위해 이벤트 루프를 통해 단일 스레드 모델을 사용합니다. 이를 통해 Node.js는 동시에 여러 요청을 쉽게 처리할 수 있습니다.

이 개념을 이해하기 위해, PHP와 같이 단일 스레드 모델을 따르지 않는 언어를 생각해보십시오. 각 연결에 대해 PHP는 처리하기 위한 스레드를 생성합니다. 명백하게, 서버는 생성된 각 스레드에 대해 CPU 및 메모리와 같은 자원을 할당해야 합니다. 이제 여러 요청이 전송될 때 무슨 일이 발생하는지 상상해보세요.

<div class="content-ad"></div>

이 모델은 Node.js에 일부 이점을 제공합니다. 리소스 소비를 최소화하기 위해 스레드 수를 줄이면서도 많은 수의 동시 요청을 처리할 수 있습니다.

# 비동기 I/O

웹 응용 프로그램이 데이터베이스와 상호 작용할 필요가 없는 경우는 거의 없습니다. 데이터베이스에 연결하고 쿼리하는 데는 일반 명령보다 더 많은 시간이 걸린다는 것을 우리는 다 알고 있습니다. 예를 들어 API 엔드포인트가 2초가 소요되는 쿼리를 수행해 결과를 반환해야 한다고 가정해 봅시다. Node의 단일 스레드 모델에서 두 번째 요청은 처리되기까지 적어도 2초를 기다려야 할까요? 세 번째, 네 번째... 요청은 어떨까요? 이로 인해 지연 시간이 기하급수적으로 증가하지 않을까요?

걱정하지 마세요, 왜냐하면 Node.js의 강점 중 하나는 비동기 I/O를 처리할 수 있는 능력입니다. 특정 수의 요청을 거의 동시에 처리할 수 있습니다. 그러나 Node.js는 각 요청에 차례로 응답하며, 이 프로세스는 보통 매우 빠르게 진행됩니다. PHP에서는 스레드가 독립적이기 때문에 편안하게 결과를 동시에 반환할 수 있습니다.

<div class="content-ad"></div>

# V8 Engine

Node.js를 언급할 때 V8 엔진을 무시할 수 없어요. 이 도구는 JS 코드를 기계 코드로 번역하고 실행하는 JIT 컴파일러입니다. V8의 속도는 모든 JavaScript 엔진 중에서도 극도로 인상적입니다.

그렇다면, Node.js는 정확히 얼마나 빠를까요?

Node.js가 특히 API 시스템, 채팅과 같은 실시간 애플리케이션, 또는 많은 I/O를 필요로 하는 작업과 같은 특정 시나리오에 적합하다고 누군가 추천했다는 소문을 들었을 수 있어요. 하지만 Node.js의 처리 속도를 칭찬하는 글은 매우 드물죠.

<div class="content-ad"></div>

성능은 많은 동시 요청을 처리할 때 모든 언어 또는 플랫폼에 대한 고민입니다. 각 언어는 특정 문제를 해결하기 위해 만들어졌습니다. 따라서 Node.js가 빠르다고 말하는 것은 정확하지 않습니다. 오히려 Node.js가 적절한 선택인 경우와 그 이유를 평가해야 합니다.

그렇다고 해서 Node.js가 "빠르지 않다"는 것은 아닙니다. 다만, Node.js의 속도는 배포와 릴리스 속도에 있다고 생각합니다.

Node는 JS 실행 환경을 제공하며, JS는 프로그래밍 언어 분야에서 매우 인기가 있습니다. 따라서 Node 커뮤니티는 크고, 프로젝트를 위한 개발 파트너를 빨리 찾을 수 있습니다. 또한, 이 개발을 통해 npm을 통해 Node를 위해 무수한 라이브러리가 구현되었습니다. 커뮤니티가 도와줄 것이기 때문에 바퀴를 다시 발명할 필요가 없습니다.

결론적으로, 강력한 언어 또는 플랫폼을 결정하는 것은 개발자의 태도와 커뮤니티 내에서의 보급 범위입니다.

<div class="content-ad"></div>

# 다른 언어나 플랫폼과의 Node.js 성능 비교

만약 아직 Node.js가 "빠르다"고 믿지 못하신다면, [Techempower](https://www.techempower.com/benchmarks/#section=data-r21&test=plaintext)가 다양한 언어나 플랫폼의 성능을 서로 비교한 결과를 쉽게 확인할 수 있습니다. 공정성을 보장하기 위해 같은 환경에서 여러 언어나 플랫폼에 대해 여러 테스트를 실행하며 최신 버전의 언어나 플랫폼을 꾸준히 업데이트하고 재테스트합니다.

2022년 7월 최근 측정 결과에 따르면, "hello world"과 같은 텍스트 응답 서버 테스트에 대해 Node.js와 [fastify](https://www.npmjs.com/package/fastify) 같은 인기 있는 프레임워크는 575,967 req/s의 처리량으로 156위에 랭크되었습니다. 이는 C#, Java 또는 Golang과 같은 언어로 구성된 다른 프레임워크들보다 훨씬 낮은 수치입니다. 특히, C#을 사용한 aspcore는 7백만 req/s 이상의 처리량을 달성할 수 있습니다.

![2024-06-20-WhatdoyouthinkwhenIsayNodejsisfast_1.png](/assets/img/2024-06-20-WhatdoyouthinkwhenIsayNodejsisfast_1.png)

<div class="content-ad"></div>

데이터베이스 쿼리 속도 테스트를 위해 fastify-mysql은 9,383 req/s를 처리할 수 있으나, 여전히 C#이 달성한 20,000 이상의 응답 속도에는 훨씬 못 미칩니다.

더 많은 성능 테스트가 있습니다. 독자 여러분은 [프로젝트 정보 프레임워크 테스트 개요](https://github.com/TechEmpower/FrameworkBenchmarks/wiki/Project-Information-Framework-Tests-Overview)에서 Techempower의 벤치마크 기준과 함께 자세히 알아볼 수 있습니다.

# 결론

본 글에서는 “Node.js가 빠르다”고 말할 때 무슨 의미인지 밝히고자 합니다. 동시에 각 언어나 플랫폼에는 존재 이유가 있으며, 그들의 속도를 비교하는 것이 모든 강점을 반영하지는 않는다는 점을 강조하고자 합니다. 대신, 우리는 각각의 강점과 약점을 이해하고 문제에 적절히 적용해야 한다는 것을 이해해야 합니다.

<div class="content-ad"></div>

어떻게 생각하세요? Node.js가 정말 "빠르다"고 생각하시나요? 아래 댓글로 의겢을 나누어 주세요!