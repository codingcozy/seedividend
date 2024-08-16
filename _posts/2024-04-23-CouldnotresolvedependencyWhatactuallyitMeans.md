---
title: "Could not resolve dependency 오류 해결방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Could not resolve dependency What actually it Means"
link: "https://medium.com/@mynameischandangupta1/could-not-resolve-dependency-what-actually-it-means-b00c898cc7fb"
isUpdated: true
---





저는 Node와 React 의존성을 버전 x(예: 10.0)에서 X(예: 16.20.1)으로 업그레이드하는 작업을 진행 중이에요. 의존성 문제에 부딪혔는데, npm에서 "의존성을 해결할 수 없음" 오류를 정확히 어떻게 이해해야 하는지 간단한 설명을 찾지 못했어요.

아래와 같이 보입니다:

```js
$ npm i
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR!
npm ERR! While resolving: react-sortable-hoc@2.0.0
npm ERR! Found: react@18.2.0
npm ERR! node_modules/react
npm ERR!   react@"^18.2.0" from the root project
npm ERR!   peer react@">=16.8.0" from @dnd-kit/accessibility@3.1.0
npm ERR!   node_modules/@dnd-kit/accessibility
npm ERR!     @dnd-kit/accessibility@"^3.1.0" from @dnd-kit/core@6.1.0
npm ERR!     node_modules/@dnd-kit/core
npm ERR!       @dnd-kit/core@"^6.1.0" from the root project
npm ERR!       1 more (@dnd-kit/sortable)
npm ERR!   79 more (@dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, ...)
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^16.3.0 || ^17.0.0" from react-sortable-hoc@2.0.0
npm ERR! node_modules/react-sortable-hoc
npm ERR!   react-sortable-hoc@"^2.0.0" from the root project
npm ERR!
```

위의 오류는 쇼케이스용이에요... 여러분의 문제는 다를 수 있어요.

<div class="content-ad"></div>

인간 용어로 번역하면 다음과 같습니다: — → 꽤 혼란스럽네요…

한 패키지를 해결하는 동안, 방금 언급한 라이브러리가 필요로 하는 것과 맞지 않는 의존성을 발견했습니다. 아래를 참조하세요.

```js
npm ERR! While resolving: react-sortable-hoc@2.0.0
npm ERR! Found: react@18.2.0
```

처음에 읽을 때 약간 혼란스럽습니다. “무엇을 발견했는데 문제가 뭔가요?”라는 생각이 들어요. 더 읽어봐야 정확히 알 수 있죠. 위와 같은 문구를 보면…

<div class="content-ad"></div>

```js
npm ERR! 종속성을 해결할 수 없습니다:
npm ERR! react-sortable-hoc@2.0.0에서 요구하는 피어 종속성 react@"^16.3.0 || ^17.0.0"
```

해당 종속성 (react-sortable-hoc)이 요구하는 것과 허용되는 버전들입니다. 이 경우, react-sortable-hoc@2.0.0을 사용하려면 react@16 또는 react@17이 필요하지만, 우리는 업그레이드 중이므로 위쪽에 있습니다. Found에서 react@18이 존재함을 알 수 있습니다.

이 문제가 무엇인지 실제 개념을 찾았으면 좋겠습니다. 하지만 여기에 해결책이 있습니다....

```js
npm ERR! 상류 종속성 충돌을 해결하거나 다시 시도하십시오
npm ERR! 이 명령을 --force 또는 --legacy-peer-deps와 함께 실행하십시오
```

<div class="content-ad"></div>

어떤 조사와 수정을 진행하거나 빌드를 업데이트하여 이 문제를 해결할 수도 있어요(덜 이상적이고, 위험이 따를 수도 있지만요).

이 상황을 해결하기 위해, 저는 react-sortable-hoc을 확인해서 업그레이드 가능한지 살펴봤어요. 그러나 이 라이브러리는 그것이 하는 일을 해결할 다른 라이브러리를 사용하는 것이 좋다고 제안하고 있어요(README에서 그 이유가 나와 있어요). 그래서 의존성 해결 여정은 계속됩니다... 하지만 혹시 이 "의존성을 해결할 수 없음"에 대한 설명이 나중의 독자에게 도움이 되길 바라요!

팸 셀리님 감사합니다.
