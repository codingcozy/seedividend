---
title: "Nodejs에서 perf_hooks를 사용한 벤치마킹 점수"
description: ""
coverImage: "/assets/img/2024-05-17-BenchmarkinginNodejswithperf_hooks_0.png"
date: 2024-05-17 20:33
ogImage: 
  url: /assets/img/2024-05-17-BenchmarkinginNodejswithperf_hooks_0.png
tag: Tech
originalTitle: "Benchmarking in Node.js with `perf_hooks`"
link: "https://medium.com/@hardikkhanesa/benchmarking-in-node-js-with-perf-hooks-202467d287e9"
isUpdated: true
---




성능은 소프트웨어 개발에서 중요한 측면입니다, 특히 확장 가능하고 효율적인 애플리케이션을 구축할 때에는 더욱 그렇습니다. 비동기 및 이벤트 기반 아키텍처로 유명한 Node.js는 코드를 측정하고 최적화하는 데 도움이 되는 내장 도구를 제공합니다. 이 목적을 위해 가장 강력한 도구 중 하나는 `perf_hooks` 모듈입니다. 이 블로그에서는 Node.js의 벤치마킹을 위한 `perf_hooks` 사용 방법과 개발 툴킷에서 꼭 필요한 이유를 살펴보겠습니다.

![이미지](/assets/img/2024-05-17-BenchmarkinginNodejswithperf_hooks_0.png)

# `perf_hooks`란 무엇인가요?

`perf_hooks` 모듈은 Node.js의 코어 라이브러리 중 하나로, 성능을 측정하기 위한 API를 제공합니다. 이 모듈은 브라우저에서 사용 가능한 Performance Timing API를 활용하여 높은 해상도의 타임스탬프를 캡처하고 애플리케이션 내 작업의 지속 시간을 측정할 수 있도록 해줍니다.

<div class="content-ad"></div>

# 벤치마킹의 중요성

벤치마킹은 응용 프로그램의 여러 측면의 성능을 측정하여 병목 현상과 개선이 필요한 부분을 식별하는 실천입니다. 효과적인 벤치마킹은 다음을 이끌어낼 수 있습니다:

1. 최적화된 코드: 코드의 느린 부분을 식별하고 성능을 개선하기 위해 최적화합니다.
2. 자원 관리: 응용 프로그램이 자원을 효율적으로 활용하도록 하여 비용을 줄이고 사용자 경험을 개선합니다.
3. 확장성: 성능 저하 없이 증가하는 부하를 처리할 수 있도록 응용 프로그램을 준비합니다.

# `perf_hooks` 시작하기

<div class="content-ad"></div>

`perf_hooks`를 사용하려면 Node.js 애플리케이션에 가져와야 합니다:

```js
const { performance, PerformanceObserver } = require('perf_hooks');
```

# 실행 시간 측정

`perf_hooks`를 가장 기본적인 방법은 함수 또는 코드 블록의 실행 시간을 측정하는 것입니다. 다음은 예시입니다:

<div class="content-ad"></div>

```js
const { performance } = require('perf_hooks');

function someFunction() {
 const start = performance.now();
 // 측정하려는 코드
 for (let i = 0; i < 1e6; i++) {}
 const end = performance.now();
 console.log(`실행 시간: ${end - start} 밀리초`);
}

someFunction();
```

# 성능 마크 및 측정 사용하기

보다 복잡한 응용 프로그램에서는 코드의 여러 부분을 측정하고 싶을 수 있습니다. `perf_hooks`를 사용하면 사용자 정의 성능 마크와 측정을 만들 수 있습니다:

```js
performance.mark('A');
// 코드 블록 A
for (let i = 0; i < 1e6; i++) {}
performance.mark('B');

performance.mark('C');
// 코드 블록 B
for (let i = 0; i < 1e6; i++) {}
performance.mark('D');

performance.measure('A to B', 'A', 'B');
performance.measure('C to D', 'C', 'D');

const measures = performance.getEntriesByType('measure');
measures.forEach((measure) => {
  console.log(`${measure.name}: ${measure.duration} 밀리초`);
});
```

<div class="content-ad"></div>

# 성능 항목 관찰

더 발전된 사용법을 위해, `PerformanceObserver`를 사용하여 실시간으로 성능 항목들을 관찰할 수 있습니다:

```js
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration} milliseconds`);
  });
});

observer.observe({ entryTypes: ['measure'] });

performance.mark('start');
// 벤치마크할 코드
setTimeout(() => {
  performance.mark('end');
  performance.measure('시작부터 끝까지', 'start', 'end');
}, 1000);
```

# 실제 응용 프로그램

<div class="content-ad"></div>

실제 상황에서는 `perf_hooks`를 사용하여 데이터베이스 쿼리, API 요청 또는 무거운 계산과 같은 애플리케이션의 중요한 부분의 성능을 측정할 수 있습니다. 이러한 지표를 지속적으로 모니터링하여 애플리케이션이 발전함에 따라 성능을 유지할 수 있습니다.

# 결론

벤치마킹은 어떤 진지한 개발자에게 필수적인 실천 방법이며, Node.js의 `perf_hooks` 모듈은 코드를 측정하고 최적화하는 강력하고 유연한 방법을 제공합니다. 이 도구를 이해하고 활용함으로써 애플리케이션의 성능을 향상시킬 수 있어 자원 관리를 개선하고 사용자 경험을 향상시킬 수 있습니다.

기억하세요, 소프트웨어 개발 세계에서 측정되는 대로 개선됩니다. 그래서 오늘부터 `perf_hooks`로 Node.js 애플리케이션의 벤치마킹을 시작하고 성능 최적화를 더욱 높여보세요.

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경해주세요.