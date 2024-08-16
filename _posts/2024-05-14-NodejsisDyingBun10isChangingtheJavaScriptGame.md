---
title: "Nodejs가 쇠약하다고 Bun 10이 JavaScript 게임을 바꾼다"
description: ""
coverImage: "/assets/img/2024-05-14-NodejsisDyingBun10isChangingtheJavaScriptGame_0.png"
date: 2024-05-14 14:59
ogImage: 
  url: /assets/img/2024-05-14-NodejsisDyingBun10isChangingtheJavaScriptGame_0.png
tag: Tech
originalTitle: "Node.js is Dying! Bun 1.0 is Changing the JavaScript Game"
link: "https://medium.com/javascript-in-plain-english/node-js-is-dying-bun-1-0-is-changing-the-javascript-game-2892d4ff6921"
isUpdated: true
---




![Node.js is Dying, Bun 1.0 is Changing the JavaScript Game](/assets/img/2024-05-14-NodejsisDyingBun10isChangingtheJavaScriptGame_0.png)

그 이전에, 자바스크립트 런타임이 무엇이며 왜 속도에 대해 신경 써야 하는지 설명해야 합니다.

자바스크립트로 이야기를 쓰고 누군가에게 읽어달라고 부탁했다고 상상해보세요. 자바스크립트 런타임은 당신의 이야기를 살아있게 만드는 친근한 서술자 같은 존재입니다! 이것은 당신의 자바스크립트 이야기가 읽히고 연기되는 특별한 환경입니다. 하지만 좀 더 깊게 들어가보죠. 기술적으로, 이 '서술자'는 자바스크립트 엔진과 같은 구성 요소로 구성되어 있습니다. 이 엔진은 런타임의 핵심으로서 코드를 이해하고 실행하는 일을 담당합니다. 이것은 업무를 실행하고 코드가 스스로 걸림돌에 걸리지 않도록 하는 이벤트 루프와 같은 도구와 함께 사용됩니다. 또한 모든 캐릭터(또는 변수)가 각자 공간을 가지는 메모리 힙이 포함되어 있습니다. 씬별로 이야기의 액션이 일어나는 곳을 추적하는 호출 스택도 있습니다.

# Bun 1.0 소개



Bun은 인기 있는 Node JS와 Deno보다 여러 가지 주요 장점을 가지고 있는 새로운 JavaScript 런타임입니다. Bun은 앱을 더 빠르게 만들기 위해 코드에 추가 복잡성을 추가할 필요 없이 설계되었습니다.

Node.js의 대체물로 만들어졌기 때문에 Bun을 사용할 때는 node나 nodemon이 필요하지 않습니다. Bun은 내장된 감시 모드, dotenv, cross-env를 갖추고 있으며 .env 파일을 기본적으로 읽습니다.

또한 Bun은 .js, .ts, .mjs, .jsx, .cjs, .tsx와 같은 다양한 파일을 실행할 수 있기 때문에 이제 프로젝트에 babel, tsc, ts-node 및 tsx를 설치할 필요가 없습니다.

Bun은 놀라운 성능을 자랑하는 JavaScript 번들러이며 esbuild 호환 플러그인 API를 제공하므로 esbuild, webpack 및 parcel도 필요하지 않습니다.



Bun은 npm과 yarn보다 빠른 속도가 가장 큰 이점 중 하나입니다. Bun은 npm과 yarn에 있는 익숙한 모든 명령어를 사용할 수 있는 npm 호환 패키지 매니저입니다. 또한 package.json 파일을 읽고 node_modules에 쓰지만 30배 빠르기 때문에 게임 체인저입니다.

기본으로 Jest와 호환되는 테스트 러너를 내장하고 있어 추가 종속성을 설치하지 않고도 단위 테스트를 작성할 수 있습니다.

Node.js의 대체할 수 있는 디자인으로 개발되었기 때문에 path, fs, net과 같은 일반적인 Node.js 모듈과 __dirname, process와 같은 전역 변수를 내장 지원합니다.

# 성능 비교



우리가 말했듯이 Bun은 Node.js보다 4배 빠르기 때문에 코드가 가벼워지고 실행 시간이 짧아지는데, 사용하기도 간단해요.

```js
$ bun install 
```

<img src="/assets/img/2024-05-14-NodejsisDyingBun10isChangingtheJavaScriptGame_1.png" />

테스트를 실행하는 차이는 더 미친 것 같아요.



```js
$ bun test
```

<img src="/assets/img/2024-05-14-NodejsisDyingBun10isChangingtheJavaScriptGame_2.png" />

사용하기 쉽습니다. 다음은 Bun을 사용하여 HTTP 서버를 만드는 예제입니다.

```js
const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response(“Bun에 오신 것을 환영합니다!");
  },
});

console.log(`localhost:${server.port}에서 서버를 대기 중입니다`);
```



# Bun이 Node.JS를 대체해야 할까요?

요약하면, Bun은 자바스크립트 세계에서 새롭고 멋진 장난감 같은 존재입니다. 다음 프로젝트에 무엇을 사용할지 고민 중이라면 Bun을 한 번 시도해보는 것을 권해드립니다. 신뢰성이 있고, Node.js에 없는 멋진 기능들을 갖추고 있으며 빠르기도 합니다.

Bun 팀이 다음에 어떤 일을 할지 기대되네요. 그리고 더 자세히 알고 싶다면, [공식 안내서](링크)를 확인해보세요. 필요한 모든 세부 정보가 담겨 있답니다!

Bun에 대한 생각은 어떠신가요? Node.js를 대체할 것인가요? 아래 댓글에서 함께 토론해보세요!



# 친근한 한국어 번역

우리 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가에게 박수를 보내고 팔로우하세요! 👏
- PlainEnglish.io에서 더 많은 콘텐츠를 찾을 수 있어요. 🚀
- 무료 주간 뉴스레터에 가입하세요. 🗞️
- 트위터(X), 링크드인, 유튜브, 디스코드에서 우리를 팔로우하세요.