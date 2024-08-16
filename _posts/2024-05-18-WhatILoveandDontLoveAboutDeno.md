---
title: "Deno에 대해 좋아하고 싫어하는 점"
description: ""
coverImage: "/assets/img/2024-05-18-WhatILoveandDontLoveAboutDeno_0.png"
date: 2024-05-18 21:22
ogImage: 
  url: /assets/img/2024-05-18-WhatILoveandDontLoveAboutDeno_0.png
tag: Tech
originalTitle: "What I Love (and Don’t Love) About Deno"
link: "https://medium.com/better-programming/what-i-love-about-deno-af35d1f46d"
isUpdated: true
---




![이미지](/assets/img/2024-05-18-WhatILoveandDontLoveAboutDeno_0.png)

2018년에는 자바스크립트를 위한 Node 런타임 환경을 만든 Ryan Dahl이 JSConf에서 'Node.js에 대한 후회하는 10가지'라는 강연을 했습니다. 기술의 창시자가 자신의 발명품 중 일부 주요 기능에 대해 후회한다는 것은 드물죠. 이 강연을 아직 보지 않으셨다면 강력히 추천합니다. 그는 Node의 존재 하의 결핍 사항을 강조하며, 그 중 일부는 개발자로서 우리가 기능으로 간주하는 것들도 있습니다.

강연에서 그는 V8을 사용하지만 Rust로 만들어진 새 런타임 환경인 Deno도 소개합니다. 당시에는 이를 그의 취미로 보았는데, 완전히 새로운 런타임 환경을 만드는 것을 취미로 삼는 Ryan Dahl입니다. 그럼에도 불구하고, Deno의 소개로 거의 즉시 Deno가 Node를 대체할 것인가라는 질문을 던지는 수천 개의 기술 기사가 생겨났습니다.

간단한 답은... 아마 그렇습니다.

<div class="content-ad"></div>

# Deno에서 사랑하는 다섯 가지 특징

저는 작은 엔지니어 팀과 함께 오픈 소스 도구를 개발하면서 Deno 생태계에서 긴 시간을 보냈습니다. 우리는 커뮤니티에 기여하는 것이 흥미로워서 일부 참여했습니다. 저희 도구는 개발자가 프로덕션 수준 애플리케이션에서 메모리 누수를 식별하는 데 도움을 줍니다. 이제 Node에서 여러 해 동안 가지고 있던 이러한 종류의 도구입니다. 첫 릴리스 끝에 Deno가 제공하는 이 특징들이 눈에 띄었습니다.

## package.json과 node_modules 없음

npm, package.json 및 불필요한 node_modules 폴더와 작별 인사하세요. 만약 당신이 Node 개발자라면, 아마도 이러한 것들이 Node의 기능이라고 생각할 것입니다. 하지만 사실 npm과 package.json은 `애플리케이션 의존성을 쉽게 공유하기 위해 Node와 별도로 생성되었습니다. 실제로 node_modules는 많은 문제를 일으켰습니다.

<div class="content-ad"></div>

예를 들어, 풀스택 JavaScript나 TypeScript로 작성하고 있고 React와 Node를 사용하는 경우, 컴퓨터 파일 시스템 전역에 모듈을 설치하는 node_modules 폴더들이 많이 있을 수 있습니다. 이 폴더들 중 많은 폴더가 정확히 동일한 모듈을 포함하고 있을 수 있습니다.

![이미지](/assets/img/2024-05-18-WhatILoveandDontLoveAboutDeno_1.png)

Deno는 다른 접근 방식을 취합니다. 웹을 모방하려고 합니다. 웹 상에서 모듈의 주소를 가리키는 방식으로 모듈을 가져옵니다. 아래는 Deno에서 Oak 프레임워크(Express.js와 같은 RESTful API를 구축하는 도구)를 가져오는 예제입니다.

```js
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
```

<div class="content-ad"></div>

이제 패키지 JSON 파일이 필요하지 않으며 프로젝트 저장소에 node_modules 폴더를 npm 설치할 필요가 없습니다. 대신에 이와 같은 분산된 스니펫으로 웹에서 모듈을 직접 프로젝트에 가져올 수 있습니다.

아마도 스스로 다음과 같이 생각하고 있을 것입니다. 이러한 모듈을 포함하는 사이트들이 다운되면 어떻게 될까요? 걱정하지 마세요. Deno는 코드를 처음 실행할 때 이러한 모듈을 컴퓨터에 캐시합니다. 또는 실행하기 전에 터미널에서 모듈을 직접 설치할 수도 있습니다. 이점은 이 파일이 한 번만 캐시된다는 것입니다. 이를 통해 node_modules 불필요한 쓰기가 모두 제거됩니다.

## Out-of-the-Box TypeScript

개인적으로 자바와 C++로 시작한 개발자로서 TypeScript의 열렬한 팬입니다. Ryan Dahl도 마찬가지입니다. TypeScript는 파일을 타입 검사하고 종종 잘못 작성된 코드에서 발생하는 귀찮은 오류를 제거해줍니다. 이 작업은 어떤 것을 실행하기 전에 이루어집니다. 이는 제품을 생산에 도달할 때 발생 가능한 문제를 최소화하고 있는지 확인하는 검사입니다.

<div class="content-ad"></div>


![Deno Provides TypeScript Integration](/assets/img/2024-05-18-WhatILoveandDontLoveAboutDeno_2.png)

Deno는 즉시 TypeScript 통합을 제공합니다. 반면에 Node는 TypeScript 통합을 다룰 패키지를 또 가져와야 한다는 번거로움이 있습니다. 또한 TypeScript에 대한 변환 도구를 구성해야 합니다. Deno에서는 이렇게 꼬일 필요가 없습니다. 이는 Deno에서 Node보다 빠르게 TypeScript 프로젝트를 시작할 수 있음을 의미합니다.

만약 TypeScript를 극도로 혐오한다면(당신을 판단하고 있습니다), Deno에서 순수 JavaScript를 작성할 수도 있습니다. 타입스크립트가 언어의 슈퍼셋이기 때문에 Deno에서도 JavaScript를 처리할 수 있습니다(하지만 정신을 바로잡으세요).

## 표준 라이브러리


<div class="content-ad"></div>

Deno가 제공하는 표준 라이브러리에 대해 얘기하려고 하지 마세요. 이 프로젝트를 만들 때 우리 팀에게 표준 라이브러리가 큰 도움이 되었어요. 주로 Node 개발자로서, 우리는 처음에 GUI 프론트엔드와 통신하기 위해 서드파티 WebSocket 라이브러리를 사용하여 개발자 응용 프로그램의 메모리 통계를 그래프로 그리는 프로젝트를 시작했어요.

![이미지](/assets/img/2024-05-18-WhatILoveandDontLoveAboutDeno_3.png)

마치 Node 개발자들이 자주 경험하는 것처럼, 오픈소스 모듈들은 많은 버그가 있고 문서가 거의 없었어요. 고장난 도구에 대해 많이 고민한 후, 우리는 Deno의 표준 WebSocket 라이브러리로 전환했고 문제가 즉시 해결되었어요.

Node는 최소주의 환경을 목표로 했고, 이것에 성공했어요. 매우 작은 표준 라이브러리를 가지고 있어요. 많은 프레임워크가 매일 사용되고 있지만 오픈소스이며 업데이트나 유지 보수가 되지 않고 있어요. 혹은, 일부는 그 업데이트가 믿기 어렵게 오래 걸리고 있어요 (Express v5.0, 당신을 보고 있어요). Deno가 작은 표준 도구 세트를 유지하는 것은 모듈이 작동하고 문서화가 잘 되어 있으며 필요할 때 업데이트되는 개발자들에게 매우 중요해요.

<div class="content-ad"></div>

## 빌드 도구 없음

Node를 사용 중이라면 Webpack을 사용하거나 사용해 본 경험이 있는 가능성이 99%입니다. 솔직히 이야기하자면, Webpack은 대단합니다... 때로는 그렇지 않을 때도 있습니다. 이 말은 개발자의 관점에서 한 것이죠. Webpack은 파일의 종속성 그래프를 생성하고 JSX/TSX를 변환하며 코드를 압축하고 난독화하는 등 많은 중요한 일을 처리합니다.

![Image](/assets/img/2024-05-18-WhatILoveandDontLoveAboutDeno_4.png)

한편, Webpack 오류를 해결하려고 머리를 맞댄 적이 여러 번 있습니다(결국 내 로더 두 개의 순서를 바꿔야 했던 것으로 밝혀졌죠). 이런 경우가 단 한 번뿐이 아니었습니다. Webpack은 새로운 개발자든 경험이 풍부한 개발자든 모두 골치 아프게 하는 요인입니다. 온라인에서 몇몇 분노에 가득한 게시물을 보세요(시청 주의). 혹은 스택 오버플로우에 올라온 4만 개가 넘는 Webpack 관련 질문을 훑어보세요.

<div class="content-ad"></div>

Deno와 협업을 시작할 때 추가 빌드 도구가 필요하지 않다는 사실에 열광했습니다. 웹팩, Vite, Babel, Rollup, Gulp 없이도 deno compile만으로 충분했어요. 실제로 GUI 작업에서는 프론트엔드를 위한 설정이나 빌드 단계가 전혀 필요하지 않은 Deno Fresh 프레임워크를 사용했습니다. 그러면 Deno Deploy로 이어집니다.

## Deno Deploy

Deno와 관련된 가장 마음에 드는 기능 중 하나인 Deno Deploy입니다. 환경의 일부는 아니지만 Deno Deploy를 통해 웹에 애플리케이션을 손쉽게 배포할 수 있습니다.

<img src="/assets/img/2024-05-18-WhatILoveandDontLoveAboutDeno_5.png" />

<div class="content-ad"></div>

장난 아니에요 — 한번 시도해보세요. 새로운 Github 레포지토리를 만들고 Deno Fresh 보일러플레이트를 한 줄의 터미널 명령어로 추가하고, 10분 이내에 deno.dev의 엣지에 배포할 수 있어요. 그런 다음, Github 레포지토리에 대한 모든 업데이트가 [앱 이름].deno.dev에 몇 초만에 나타날 거에요.

Deno Deploy에 대한 많은 멋진 기능이 있지만, 단지 개발 경험의 관점에서 보더라도, 배포에서 불필요한 복잡함을 제거해주는 놀라운 도구에요.

# Deno의 좋지 않은 부분들

Deno 환경을 정말 즐겼지만, 위에서 강조한 기능들을 갖고 있더라도 몇 가지 눈에 띄는 문제와 귀찮은 점들이 있었어요.

<div class="content-ad"></div>

## 버그, 버그, 버그

그들에게 너무 많은 비난을 할 수는 없어요 — Deno는 새로운 도구이고 그 개발자들은 커뮤니티에 어떤 기능들이 불안정하다고 경고했습니다. 그럼에도 불구하고 Deno에는 개발이 빠르게 진행되는 코드베이스의 잘못 때문이 아닌 매우 엉성한 문제들이 있었습니다.

![이미지](/assets/img/2024-05-18-WhatILoveandDontLoveAboutDeno_6.png)

우리 팀에게 가장 큰 문제는 표준 Deno 함수 중 하나인 Deno.memoryUsage가 잘못된 라벨이 지정된 변수를 반환했다는 것이었습니다. 그들은 resident set size에 대한 값을 보고했지만 실제로는 커밋 된 힙 크기를 측정하는 V8 함수에서 파생된 수였습니다. 이들은 매우 다른 값이었고, 우리 팀은 숫자들이 이해되지 않는 이유를 알아내기 위해 급하게 일하는 날들을 보냈습니다. 우리는 우리 탓인 줄 알았는데, 결국 Deno에서 그랬던 것이었습니다. 아직 해결되지 않은이 문제 티켓을 제출했습니다.

<div class="content-ad"></div>

## 보안 기능이 조금 귀찮네요

Deno를 만들 때 Ryan Dahl이 한 보안 결정을 이해하고 존중합니다. 그러나 개발 중에 '— allow-read' 또는 '— allow-net' 플래그를 잊어버리면 Deno가 끝없이 계속해서 50가지 다른 읽기 또는 쓰기 권한을 요청하는 것이 매우 귀찮다고 느꼈습니다. 우리는 이러한 플래그를 스크립트에 넣어 해결할 수 있었지만, 개발 초기에는 이것이 특히 중복된 선택이라고 생각했습니다.

## 문서가 어째서 Node의 것보다 읽기 어려운지

Node의 문서보다 더 나쁜 문서를 만드는 방법을 정말 모르겠지만, Deno는 그랬습니다. 그래서 Deno의 표준 라이브러리가 매우 중요하다고 말한 좋은 것들을 다 잊어버리세요. 비록 그것이 중요하긴 하지만, 그들은 그것 중 아무것도 잘 문서화하지 않았습니다. Deno 팀에게 크레딧을 줄 테니, 이 환경에 대해서는 아직 초기 단계라는 점을 고려해주세요. 그러나 그들에게 문서화를 개선해 달라고 호소하기도 합니다. 개발자들은 실제 기술적인 문제에 직면하기 전에 표준 라이브러리의 기본 구문으로 씨름해야 할 필요가 없어야 합니다.

<div class="content-ad"></div>

# 역외 npm 호환성

이 문제는 좋은 부분이나 나쁜 부분 중에 포함되지는 않지만, 내게는 아직 결정되지 않은 문제입니다. Deno에 대한 가장 큰 비판 중 하나는 많은 npm 라이브러리가 Deno 환경에서 완전히 접근할 수 없다는 것이었습니다. 기존 프로젝트를 Node에서 Deno로 전환하는 데는 이것이 엄청난 문제입니다.

의존성을 어떻게 처리할까요? Deno의 저용량 사용율을 지적하는 거의 모든 기사들이 이 문제를 주목하였습니다.

![이미지](/assets/img/2024-05-18-WhatILoveandDontLoveAboutDeno_7.png)

<div class="content-ad"></div>

그러나 이 기사 맨 위에 링크된 Ryan Dahl의 비디오에서는 Deno를 이전 Node 모듈과 호환되지 않도록 만들 것이라고 주장했었습니다. 그는 그렇게 하면 그냥 Node를 다시 만드는 것과 같을 것이라고 믿었습니다. 그러나 문제가 하나 있었습니다: 그는 그렇게 했습니다. 우리가 오픈 소스 툴을 개발 중이었던 동안 Deno는 지난 몇 달 동안 npm 호환성을 안정화했습니다.

이 전환에 대해 어떻게 느껴야 할지 잘 모르겠습니다. Deno는 이전보다 더 새로운 프레임워크가 등장하는 등 혁신적인 프레임워크가 많았습니다. 개인적으로 혁신을 좋아하고, Ryan Dahl의 발표에서 그의 의견에 동의합니다. - 역호환성을 설정함으로써, 그는 Deno를 또 다른 Node 버전으로 만들었다고 생각합니다.

솔직히 말해서, Deno의 압력이 Node를 개선하도록 더 가능성이 높은 것 같습니다. 실제로 Node는 올해 초에 이미 HTTPS 임포트를 도입했으므로 이러한 node_modules 문제는 그리 오래 지속되지 않을 것입니다. 제가 주로 Node 엔지니어이기 때문에 그런 것을 희망합니다.

Deno를 직접 사용해보고 어떻게 생각하시는지 확인해보시기를 장려합니다!

<div class="content-ad"></div>

만약 저희의 오픈 소스 도구를 확인하고 싶으시면, Github에서 CLI 도구와 GUI를 찾거나 여기에서 도구를 다운로드할 수 있어요.

읽어주셔서 감사합니다.