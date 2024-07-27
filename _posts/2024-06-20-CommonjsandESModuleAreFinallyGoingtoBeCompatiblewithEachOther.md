---
title: "CommonJS와 ES 모듈이 드디어 서로 호환될 예정입니다"
description: ""
coverImage: "/assets/img/2024-06-20-CommonjsandESModuleAreFinallyGoingtoBeCompatiblewithEachOther_0.png"
date: 2024-06-20 01:30
ogImage: 
  url: /assets/img/2024-06-20-CommonjsandESModuleAreFinallyGoingtoBeCompatiblewithEachOther_0.png
tag: Tech
originalTitle: "Commonjs and ES Module Are Finally Going to Be Compatible with Each Other."
link: "https://medium.com/gitconnected/commonjs-and-es-module-are-finally-going-to-be-compatible-with-each-other-39b8b880796b"
---



![이미지](/assets/img/2024-06-20-CommonjsandESModuleAreFinallyGoingtoBeCompatiblewithEachOther_0.png)

ECMAScript 모듈은 현대 JavaScript 개발에서 인정받는 산업 표준이 되어가고 있습니다. ESM이 Node.js에 소개된 이후 비동기 로딩 기능과 모듈 해결 논리가 잘 받아들여졌습니다.

그러나 역사적인 이유로 많은 기존 코드베이스와 타사 라이브러리는 여전히 CommonJS 모듈 시스템에 의존하고 있습니다. ESM의 비동기 로딩 설계로 인해 이 두 모듈화 체계가 아직 공존할 수 없었는데, 이는 많은 개발자들에게 주요 고통 요인이 되었습니다.

최근 joyeecheung 님이 이 문제를 해결하기 위한 중요한 Pull Request를 제출했습니다.


<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-CommonjsandESModuleAreFinallyGoingtoBeCompatiblewithEachOther_1.png"/>

## CJS와 ESM의 과거와 현재

자바스크립트의 세계에서 모듈화는 대규모 애플리케이션을 구축하는 데 필수적입니다. 모듈화는 글로벌 네임스페이스에 영향을 미치지 않고 코드를 관리하는 데 도움이 되며, 기능을 분리하고 코드를 재사용하며 의존성을 관리하기 쉽게 합니다. Node.js와 브라우저 환경 모두에서는 CommonJS (CJS)와 ECMAScript Module (ESM)이라는 두 가지 주류 모듈 시스템이 있습니다.

CommonJS는 Node.js에서 네이티브로 지원되는 모듈 시스템으로, 초기에 서버 측 모듈화 요구를 충족하기 위해 도입되었습니다. CJS는 require 함수를 사용하여 모듈을 로드하고 module.exports 또는 exports 객체를 사용하여 코드를 모듈로 노출합니다. CommonJS 모듈의 특징은 동기적으로 로딩되는 것으로, 모듈이 로드된 후 즉시 코드가 실행된다는 것입니다.

<div class="content-ad"></div>

```js
// math.js
function add(x, y) {
  return x + y;
}
module.exports = { add };

// app.js
const math = require('./math.js');
console.log(math.add(0, 17)); // 17을 출력합니다
```

서버 환경에서는 대부분 파일이 로컬이기 때문에 동기적으로 로딩되어도 문제가 되지 않습니다. 그러나 브라우저 환경에서는 동기적 로딩이 브라우저의 이벤트 루프가 스크립트를 완전히 다운로드하고 구문 분석할 때까지 블로킹되어 성능 문제를 일으킬 수 있습니다.

ESM은 최신 JavaScript의 공식 표준 모듈 시스템이며, 최신 브라우저의 버전에서 네이티브로 지원됩니다. CommonJS와 달리 ESM은 동적으로 모듈을 로드하거나 생성할 수 없도록 디자인되어 정적입니다. ESM은 import 및 export 문을 사용하여 모듈을 가져오고 내보내는데, 비동기적 로딩을 지원합니다:

```js
// math.js
export function add(x, y) {
  return x + y;
}

// app.js
import { add } from './math.js';
console.log(add(0, 17)); // 17을 출력합니다
```

<div class="content-ad"></div>

ESM을 Node.js에서 활성화하려면 보다 복잡한 방법을 요구합니다. 이는 .js 파일 확장자가 기본적으로 CommonJS 모듈과 연관되기 때문입니다. 이 문제를 해결하기 위해 Node.js는 .mjs 파일 확장자를 사용하거나 package.json에서 명시적으로 "type": "module" 속성을 지정하여 ESM 모듘임을 나타낼 수 있습니다.

Node.js에서 ESM이 지원되기 때문에 cjs를 가져올 수 있지만 require(esm)는 불가능합니다. ERR_REQUIRE_ESM으로 인한 당혹감은 많은 사용자들을 괴롭히며 Node.js 생태계 내에서 시간 낭비의 주요 원인이 될 수 있습니다.

![Commonjs and ESM Module Compatibility](/assets/img/2024-06-20-CommonjsandESModuleAreFinallyGoingtoBeCompatiblewithEachOther_2.png)

<div class="content-ad"></div>

만약 패키지 제작자들이 CJS와 ESM 사용자 모두가 그들의 패키지를 사용할 수 있도록 보장하고 싶다면, 그들은 모듈을 계속 CJS로 출판하거나 CJS와 ESM 둘 다를 릴리스하는 이중 모듈로 출시하여야 합니다 (일부 문제를 발생시킬 수 있지만, 이는 지금 매우 흔한 실천법입니다).

동시에, 많은 트랜스파일러 (예: TypeScript 컴파일러)는 아직도 최종 출력물로 CJS 코드를 생성하도록 구성되어 있습니다. 이러한 트랜스파일러의 사용자들은 ESM 구문을 사용하여 코드를 작성하지만, 그들의 코드가 최종적으로 Node.js에서 CJS로 실행된다는 것을 필요로 알지 않을 수 있습니다. 그들의 코드가 실제로 require할 수 없는 진짜 ESM 써드파티 모듈을 사용하면, ERR_REQUIRE_ESM을 볼 수 있습니다. 이는 그들이 그들의 코드가 진정한 ESM으로 실행되고 있다고 가정하기 때문에 매우 혼란스러울 수 있습니다.

## 왜 호환되지 않을까요?

당연히 사람들은 다음과 같이 물을 수 있습니다: 왜 require()가 ESM 로딩을 지원하지 않을까요?

<div class="content-ad"></div>

오랜 시간 동안 Node.js 프로젝트의 응답은 항상 이와 같았습니다:

하지만 여기서는 문서와 다른 형태의 커뮤니케이션이 오해를 일으킬 수 있는 상황입니다 — 아마도 그들은 Node.js ESM에서 발생하는 일에 대해 이야기하고 있을 뿐이며, ESM 자체가 어떻게 설계되었는지에 대해서는 언급하지 않은 것일 수도 있습니다. 지난 해, joyeecheung이 메모리 누수 문제를 해결하기 위해 V8 코드를 읽다가 ESM 자체가 절대적으로 비동기적으로 설계된 것이 아니라 조건적으로 비동기적으로 설계된 것을 우연히 발견했습니다. 즉, 코드에 최상위 await가 있는 경우에만 비동기적으로 동작하도록 설계되었습니다.

따라서, 최상위 await를 포함하지 않는 ESM에 대한 require()를 지원하는 데는 아무 문제가 없습니다. 최상위 await를 사용해야 하는 유효한 이유가 있는 라이브러리도 있겠지만, 그렇게 흔한 일은 아닐 수도 있습니다.

실제로, joyeecheung이 후에 npm 레지스트리에서 ESM을 지원하기 위해 (esm)을 요구하는 약 30개의 패키지를 테스트한 결과, 아무도 최상위 await를 포함하지 않았습니다 — 그리고 require()에서 동기 모듈을 지원하는 것이 이미 생태계에서 많은 머리아픔을 해결할 수 있을 것입니다.

<div class="content-ad"></div>

## 초기 탐험 및 시도

ESM 지원은 긴 토론, 디자인 및 실험을 거쳤습니다. 2019년부터 Node.js 커뮤니티는 ESM과 CommonJS 간의 상호 운용성을 지원하는 방법을 탐색하기 시작했습니다. 이 기간 동안 많은 개발자들이 서로 다른 구현 솔루션과 개선 조치를 제안하는 Pull Request를 제출했습니다.

당시, 중대한 PR 토론은 Node.js에서 .mjs 확장자를 가진 파일을 지원하는 방법과 동시에 CommonJS와 ESM을 지원할 수 있는 이중 모듈 시스템을 구현하는 데 초점을 맞추었습니다.

![image](/assets/img/2024-06-20-CommonjsandESModuleAreFinallyGoingtoBeCompatiblewithEachOther_3.png)

<div class="content-ad"></div>

이 풀 리퀘스트는 상위 수준 대기를 처리하기 위해 로더에서 이벤트를 루핑하는 시도를 했지만, 그 방법이 안전하지 않아서 닫혔습니다.

명세에 따르면, 구문 기반 ESM 동기 평가의 이론적 기초가 2019년에 확립되었습니다. 시간이 흐를수록 Node.js 내에서 "ESM이 비동기적이고 CJS가 동기적이기 때문에 CJS는 ESM을 로드할 수 없다"는 신화가 형성된 것으로 보입니다. 그러나 표준 기관에서는 ES 명세가 ESM이 조건부로 비동기적임을 명확히 보장하고 있습니다. W3C 명세는 Service Worker가 동기식 모듈 평가만 허용하도록 보장하기 위해 이를 사용합니다. 만약 2019년 이후 명세에 기반한 동기화가 보다 광범위하게 인식되면, 더 많은 시도가 있을 수 있으며 문서는 ESM을 무조건적으로 비동기로 설명하지 않을 것입니다.

## 동기 require(esm) 지원

작년 말에 joyeecheung은 문법에 따르면 ESM이 동기적일 수 있음을 발견하였으며, 오징어는 로딩 프로세스에 비동기성을 도입한 것은 오직 Node.js 뿐이라고 언급했습니다. 따라서, joyeecheung과 GeoffreyBooth는 동기 require(esm)를 다시 시작하기로 논의를 시작했습니다.

<div class="content-ad"></div>

2024년 2월 말, joyeecheung은 CJS와 ESM 로더에 대해 캐싱과 유사한 작업을 수행하면서 더 깊이 파고들었을 때, "Node.js에서 ESM 로더를 유일한 로더로 만드는 것을 포기하고 CJS 로더를 지원하는 별도의 프로그램을 구현하자"는 더 간단한 방법이 있다는 것을 알게 되었습니다. 기존 ESM 로더 코드를 최소화할수록 구현이 더 쉬워지는 것 같았죠.

그렇게해서 이 PR이 생성되었습니다.

https://github.com/nodejs/node/pull/51977

2019년 PR과의 주요 차이점은 이 PR이 require(esm)의 범위를 작게 유지하고 동기적으로 ESM을 로드하는 것만 지원하려고 한다는 것입니다. 기술 지도위원회(TSC)에서는 이것이 전혀 논란이되지 않았고, 크게 반박도 받지 않았다고 합니다.

<div class="content-ad"></div>


![](/assets/img/2024-06-20-CommonjsandESModuleAreFinallyGoingtoBeCompatiblewithEachOther_4.png)

현재, 이 기능은 여전히 실험 단계로 진행 중이며 실험적으로-require-module 플래그 아래에서 작업을 완료해야 합니다.

현재, require(esm)은 명시적으로 .mjs 확장자를 통해 또는 .js 확장자에 “type”: “module” 패키지 필드를 사용하여 ESM으로 표시된 ESM 모듈만 지원합니다. 이는 npm에서 ESM-only 패키지를로드하는 데 충분합니다. .js 파일에 ESM 구문이 포함되어 있지만 가장 가까운 package.json에 “type”: “module” 필드가 없는 경우 .js 파일이 ESM로드로 “fallback”할 수 있지만, 이를 일반적으로 사용자가 피해야 할 사항입니다. ESM 구문 감지는 오버헤드를 유발하며 프로젝트에 충분한 ESM 모듈이 있을 때 노드.js가 모듈 유형을 추측하는 데 시간을 낭비하고 싶지 않을 수 있습니다. 특히, package.json에 명시적인 “type”: “module” 필드를 사용하여 이러한 오버헤드를 저장할 수 있습니다.

## 마침내


<div class="content-ad"></div>

정직히 말해서, 이 문제는 오랜 시간 동안 나를 괴롭혔어요. 많은 NPM 패키지 개발자들도 이런 문제로 고통을 겪고 있어요. 이번 joyeecheung의 시도가 가능한 한 빨리 제품으로 출시되기를 바랍니다!