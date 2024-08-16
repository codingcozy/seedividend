---
title: "위대한 JavaScript 분할 CommonJS vs ES Modules"
description: ""
coverImage: "/assets/img/2024-05-14-TheGreatJavaScriptDivideCommonJSvsESModules_0.png"
date: 2024-05-14 14:55
ogImage: 
  url: /assets/img/2024-05-14-TheGreatJavaScriptDivideCommonJSvsESModules_0.png
tag: Tech
originalTitle: "The Great JavaScript Divide: CommonJS vs ES Modules"
link: "https://medium.com/javascript-in-plain-english/the-great-javascript-divide-commonjs-vs-es-modules-6a6e0aa91286"
isUpdated: true
---




<img src="/assets/img/2024-05-14-TheGreatJavaScriptDivideCommonJSvsESModules_0.png" />

자바스크립트 커뮤니티가 논쟁을 즐기는 것은 비밀이 아닙니다. 4년 동안, 우리는 코드를 어떻게 구성해야 하는지에 대한 파티션이 계속되어 왔습니다. 이것은 기본적이지만 놀랄 만한 논란이 많은 질문이며, 개발자들을 나누는 계속된 문제입니다.

이 분계는 CommonJS와 ES 모듈 두 가지 주요 시스템을 중심으로 이루어져 있습니다.

## 분계를 이해하기



자바스크립트가 처음에 발명된 때는 웹 브라우저의 스크립팅 언어로 사용되었습니다. 그러나 Node.js가 등장하면서 다양한 가능성이 열렸습니다.

이제 브라우저용 언어가 아니라 서버 및 기타 응용 프로그램을 구동할 수 있었습니다.

그 당시에는 브라우저의 모든 것이 전역 범위에 있었기 때문에 모듈에 대해 심각하게 생각할 필요가 없었습니다. 그러나 복잡한 서버 응용 프로그램을 구축하는 것은 간단하지 않았습니다. 모든 코드를 한 파일에 번들로 모아두는 것은 악몽이었기 때문입니다.

이에 등장한 해결책은 CommonJS라는 모듈 시스템입니다.



```js
const moduleA = require('./moduleA');
```

CommonJS는 다른 파일에서 JavaScript를 가져와서 그 파일이 내보낸 함수에 접근할 수 있게 해주는 require라는 함수를 사용합니다.

그러나 JavaScript는 곧 ES6(이제는 유명한 버전)으로 이러한 아이디어를 채택했습니다. 이것은 웹 애플리케이션을 위한 것이며 import와 export를 소개했습니다.

```js
import moduleA from './moduleA';
```



지금, 궁금해 할 수도 있습니다. 왜 JavaScript는 이미 사용 중인 require 호출에 고수하지 않았을까요?

require의 문제는 동기적이라는 것이며, 모든 파일이 준비되어 있는 것을 전제로 원활하게 작동합니다. 그러나 브라우저 컨텍스트 내에서는 외부 리소스를 기다려야 하는 경우가 있기 때문에 require의 동기적인 성격은 시스템을 무너뜨릴 수 있습니다.

그리고 이렇게 분리가 시작되었습니다.

## 호환성의 진퇴양난



대부분의 개발자들이 ES 모듈로 이동했는데, 이는 새롭고 사용하기 즐거웠기 때문이다. 그러나 상당수의 사용자는 CommonJS를 선택했습니다. 이 분리로 호환성 문제가 발생했습니다.

ES 모듈을 사용하는 경우 CommonJS를 문제없이 가져올 수 있습니다. 그러나 CommonJS로 ES 모듈을 가져오려고 하면 작동하지 않습니다. 대신, 가져오기를 모방하는 async 함수 해킹을 사용해야 합니다.

```js
const moduleA = await import('./moduleA');
```

패키지를 배포할 때 이러한 호환성 문제 — 쌍둥이 패키지 하자로도 알려진 — 덕분에 매우 어려워집니다. 왜냐하면 ES 모듈과 CommonJS 사용자를 둘 다 고려해야 하기 때문입니다. ES 모듈만 제공하는 경우 CommonJS 사용자는 소외되고 반대의 경우도 마찬가지입니다.



## 번들러의 역할

번들러 또는 트랜스파일러인 Babel이나 TypeScript와 같은 도구들은 이 미묘한 문제에 추가적인 레이어를 더합니다. 여기서, 당신이 작성하는 코드가 무엇인지는 당신이 출력하는 코드에 따라 달라집니다. ES 모듈로 작성할 수도 있지만 CommonJS로 출력될 수도 있습니다.

```js
// Babel 또는 TypeScript 컴파일러가 ES Modules을 CommonJS로 변환
const moduleA = require('./moduleA');
```

당신이 생성한 코드에 require 호출이 보인다면, 당신은 CommonJS를 출력하고 있는 것이며, 반면에 import와 export가 있는 것은 당신이 ES 모듈의 일부라는 것을 나타냅니다. 앞으로 ES 모듈의 부분이 됩니다.



## 미래는 ES 모듈로 향합니다

개발자들의 관심을 끈 새로운 도구 중 하나는 번입니다. 번의 주요 강점은 CommonJS와 ES Modules 간의 상호 운용성 문제를 해결했다는 점입니다. 그러나 이 문제는 정확히 명세에 부합하지는 않습니다—CommonJS와 ES Modules 간의 문제를 해결하기 위해 대충 뭉개 놓은 것 뿐입니다.

JavaScript 도구 체인은 이러한 별개의 모듈 시스템을 지원하느라 엄청난 복잡성을 가지고 있습니다.

가능한 곳에서 ES 모듈을 사용하세요. 우리는 이 분열을 종식하고 미래를 수용할 때가 되었습니다. 현대적인 JavaScript. 통일된 JavaScript.



만약 CommonJS를 사용하고 있거나 사용을 고려하고 있다면, 이제 코드를 좀 더 자세히 살펴볼 시간이 됐을지도 모릅니다. 미래는 ES 모듈을 사용하는 곳이며, JavaScript 환경을 더욱 간단하고 코딩이 더 재미있는 곳으로 만들기 위해 각자 역할을 다해야 합니다.

Bun의 최신 업데이트에 대한 자세한 내용은 확인해보세요:

# 쉽게 이해하기

우리 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:



- 작가에게 박수를 보내고 팔로우해 주세요! 👏
- 더 많은 콘텐츠는 PlainEnglish.io에서 확인할 수 있어요 🚀
- 무료 주간 뉴스레터에 가입해 보세요. 🗞️
- 트위터(X) 말고도 링크드인, 유튜브, 디스코드에서도 팔로우해 주세요.