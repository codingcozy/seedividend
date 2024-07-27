---
title: "리액트 앱에서 애니메이션 적용하는 5가지 방법"
description: ""
coverImage: "/assets/img/2024-05-12-5WaystoanimateaReactapp_0.png"
date: 2024-05-12 21:15
ogImage:
  url: /assets/img/2024-05-12-5WaystoanimateaReactapp_0.png
tag: Tech
originalTitle: "5 Ways to animate a React app."
link: "https://medium.com/hackernoon/5-ways-to-animate-a-reactjs-app-in-2019-56eb9af6e3bf"
---

<img src="/assets/img/2024-05-12-5WaystoanimateaReactapp_0.png" />

리액트 앱에서 애니메이션은 인기 있는 주제입니다. 다양한 종류의 애니메이션을 만드는 많은 방법이 있습니다. 많은 개발자들이 CSS를 사용하여 애니메이션을 만들고 HTML 태그에 클래스를 추가하는 방법을 주로 사용합니다. 이것은 훌륭한 방법이며 사용해야 합니다. 더 복잡한 애니메이션을 만들고 싶다면 GreenSock을 사용해보세요. GreenSock은 가장 강력한 애니메이션 플랫폼 중 하나입니다. 또한, 리액트에서 애니메이션을 만드는 데 사용할 수 있는 많은 라이브러리와 컴포넌트들이 있습니다.
함께 알아보겠습니다 😎

- CSS 방법
- React-transition-group — 기본 CSS 애니메이션과 전환을 간단히 구현할 수 있는 추가 컴포넌트입니다.
- react-animations — React-animations은 animate.css의 모든 애니메이션을 구현합니다. 사용하기 쉽습니다!
- React Reveal — 이것은 React용 애니메이션 프레임워크입니다.
- TweenOne — ant.design에서 애니메이션에 사용하는 라이브러리

물론 오픈 소스에는 더 많은 애니메이션 라이브러리와 컴포넌트가 있습니다. 탐험해보고 싶습니다. 그러나 이 글에는 라이브러리가 포함되지 않습니다. 또한, 글의 끝에서 주목할만한 라이브러리 형태로 보너스를 받게 될 것입니다.

👨‍💻 시작해봐요.

# 1.

CSS 방법

이 방법은 간단한 애니메이션에 가장 적합한 방법 중 하나에요. 자바스크립트 라이브러리를 가져오는 대신 이 방법을 사용하면 번들 크기가 작아집니다. 그리고 브라우저가 더 적은 자원을 사용하게 됩니다. 이 두 가지 요소는 앱 생산성에 상당한 영향을 미칩니다. 번들 크기와 앱 생산성에 신경을 쓰는 경우 간단한 애니메이션이 있다면 이 방법을 주목해보세요.

이제 CSS를 사용하여 애니메이션을 어떻게 만드는지 보여드릴게요.
햄버거 메뉴 예제를 살펴볼까요:👇

![table](https://miro.medium.com/v2/resize:fit:1200/1*cosKxTRdOfM3YrNc_2Ah3g.gif)

이 메뉴는 CSS 속성을 사용하여 쉽게 사용할 수 있으며 html 태그에 className="is-nav-open"을 트리거로 사용합니다. 이 예제를 구현하는 여러 가지 방법이 있습니다. 그 중 하나는 네비게이션 위에 래퍼를 만들고 마진을 변경하는 것입니다. 네비게이션은 너비가 250px인 상수 너비를 가지고 있습니다. 그리고 너비가 같은 마진-왼쪽 또는 translateX 속성을 가진 래퍼가 있습니다. 네비게이션을 표시해야 할 때는 래퍼에 className="is-nav-open"을 추가하고 래퍼를 margin-left/translateX: 0으로 이동해야 합니다.

![image](/assets/img/2024-05-12-5WaystoanimateaReactapp_1.png)

그리고 CSS 스타일:

![이미지](/assets/img/2024-05-12-5WaystoanimateaReactapp_2.png)

진실을 말하자면, 대부분의 상황에서 이 방법을 사용하는 것이 좋습니다. 몇 줄의 CSS를 작성하고 className을 트리거하는 것이 큰 라이브러리를 가져와 프로젝트에 구현하는 것보다 나은 선택입니다. 사용자들은 브라우저가 앱을 빨리 재생산하면 당신에게 감사할 것입니다.

하지만 가끔 다른 방법을 사용해야 할 때도 있습니다. 다른 방법이 무엇이 있는지 알아보겠습니다. 다음 방법을 살펴보세요.

## 2. ReactTransitionGroup

이 추가 구성 요소는 ReactJs 커뮤니티에서 개발되었습니다. ReactTransitionGroup는 기본 CSS 애니메이션 및 전환을 손쉽게 구현할 수 있습니다.

개발자들이 이 라이브러리를 다음과 같이 설명했습니다:

어쨌든, 이 추가 구성 요소에 대해 알아야 할 세 가지 사항은 다음과 같습니다:

- React Transition Group은 구성 요소 라이프사이클이 변경될 때 클래스를 변경합니다. 결국, 애니메이션 스타일은 CSS 클래스에 설명해야 합니다.
- ReactTransitionGroup은 크기가 작습니다. React 애플리케이션용 패키지에 설치해야 하며 번들 크기를 크게 증가시키지 않습니다. 하지만 CDN을 사용할 수 있습니다.
- ReactTransitionGroup에는 3개의 구성 요소가 있습니다(Transition, CSSTransition 및 TransitionGroup). 애니메이션을 얻으려면 해당 구성 요소를 감싸야 합니다.

비슷한 애니메이션을 만드는 방법을 알아보겠습니다 👀👇

![animation](https://miro.medium.com/v2/resize:fit:1200/1*AwFrD7KVn0gibJX5iVT5BA.gif)

먼저 react-transition-group에서 CSSTransitionGroup를 import해야 합니다. 그 후 목록을 해당 그룹으로 감싸고 transitionName 속성을 설정해야 합니다. CSSTransitionGroup의 자식 요소가 추가되거나 삭제될 때 애니메이션 스타일이 적용될 것입니다.

![transition](/assets/img/2024-05-12-5WaystoanimateaReactapp_3.png)

만약 transitionName="example" 프로퍼티를 설정하면, 스타일 시트에 있는 클래스들은 example 이름으로 시작해야 합니다.

![이미지](/assets/img/2024-05-12-5WaystoanimateaReactapp_4.png)

ReactTransitionGroup 버전의 기본 사용법을 확인할 수 있어요. 👀

이게 당신이 필요한 모든 것입니다. 물론, 어떤 로직을 추가해야 할 것입니다. 저희는 예제 연락처 목록을 구현하기 위한 두 가지 방법을 설명해야 합니다.

설명드리겠습니다.
먼저, handleAdd - 새로운 연락처를 추가하는 함수입니다. 랜덤한 이름을 생성한 후 이를 배열 상태인 state.items에 추가합니다. (랜덤한 이름을 생성할 때 random-name 패키지를 사용합니다)

handleRemove - state.items 배열에서 인덱스에 해당하는 연락처를 제거하는 함수입니다.

![React Animations](/assets/img/2024-05-12-5WaystoanimateaReactapp_5.png)

# 3️. React-animations

React-animations — 이 라이브러리는 animate.css를 사용하여 모든 애니메이션을 구축했습니다. 사용하기 쉽고 다양한 애니메이션 컬렉션이 있습니다. React-animation은 Radium, Aphrodite 또는 styled-components와 같이 객체를 사용하여 keyframe 애니메이션을 정의하는 인라인 스타일 라이브러리와 함께 작동합니다. 제가 가장 선호하는 styled-components를 사용하는 것을 선호합니다.

여기서 일부 애니메이션을 볼 수 있습니다: 👀👇

![GIF](https://miro.medium.com/v2/resize:fit:1200/1*2SJH2tItiljweyRgivf9JQ.gif)

당신이 무엇을 생각하고 있는지 알고 있어요 😄

![이미지]("https://miro.medium.com/v2/resize:fit:940/1*1VZUa3mn3569l3ePzq3piA.gif")

이 애니메이션을 보자마자 그것들을 어디에 사용할 수 있을지 깨달았을 것입니다.
이것이 어떻게 작동하는지 살펴봅시다. 예를 들어, 바운스 애니메이션을 봅시다.

![이미지]("https://miro.medium.com/v2/resize:fit:1200/1*bkPR-nhoZ5aTw_et9Mt7Ow.gif")

React-animations에서 선택한 애니메이션을 import해야 합니다.

이전에 언급한 대로, 기본 keyframes와 애니메이션 스타일이 적용된 wrapped 컴포넌트를 만든 후 styled-component를 사용하고 있어요.

컴포넌트를 만들면 애니메이션을 적용하기 위해 어떤 HTML이나 컴포넌트를 래핑해야 해요.

예시:

![image](/assets/img/2024-05-12-5WaystoanimateaReactapp_8.png)

애니메이션이 작동합니다. 이 애니메이션은 기본적이고 매우 간단합니다.

스크롤 시 이 애니메이션을 사용하는 좋은 해결책이 있습니다 — react-animate-on-scroll.

# 4️. React-reveal

React Reveal은 React용 애니메이션 프레임워크입니다. 페이드, 뒤집기, 줌, 회전 등의 기본 애니메이션이 있으며 더 많은 고급 애니메이션이 있습니다. 위치, 지연, 거리, 케스케이드 등과 같은 모든 애니메이션을 프롭스로 제어할 수 있습니다. 여기에서 확인할 수 있습니다. 사용자 정의 CSS 효과를 사용할 수도 있습니다. 또한 서버 측 렌더링 및 고차 컴포넌트가 있습니다. 스크롤 시 애니메이션을 사용하는 경우 이 프레임워크를 사용하면 좋습니다. 작동 방식을 살펴보세요.

<img src="/assets/img/2024-05-12-5WaystoanimateaReactapp_9.png" />

스크롤 효과에 대한 이 애니메이션을 살펴보겠습니다.👀👇

![image](https://miro.medium.com/v2/resize:fit:1200/1*Xk4c0gzjEu8RCsCyVRPlYg.gif)

우리에게는 전체 화면 페이지와 제목이 내부에 있는 5개의 블록이 있습니다.

![image](/assets/img/2024-05-12-5WaystoanimateaReactapp_10.png)

animateList 상수를 생성합니다. 이 배열에는 5개의 요소가 포함되어 있습니다. 배열 메서드 map을 사용한 후에는 각 요소를 Fade 구성 요소에 렌더링하여 아이템을 제목에 삽입할 수 있습니다. Const 스타일은 블록과 제목에 대한 간단한 CSS 스타일을 가지고 있습니다. 우리는 Fade 애니메이션으로 위에서 아래로 빛나는 5개의 블록을 가지고 있습니다.

# 5️. TweenOne 및 애니메이션 Ant Design

Ant Design은 사용하기 쉬운 여러 컴포넌트로 구성된 React UI 라이브러리입니다. 우아한 사용자 인터페이스를 구축하는 데 유용한 컴포넌트입니다. Ant Design은 중국 기업 알리바바에 의해 만들어졌으며 알리바바(물론), 텐센트, 바이두 등 많은 잘 알려진 회사들이 사용하고 있습니다.

아마도 Ant Design에 대해 들어보았을 것입니다. 그래서 우리는 그들의 랜딩 페이지의 애니메이션을 살펴보겠습니다.👇

![Ant Design Animation](https://miro.medium.com/v2/resize:fit:1200/1*_6S4VTzzGwRtebx-ys4htA.gif)

위에서 보시다시피 많은 애니메이션 요소들이 있어요. 비슷한 애니메이션을 가진 요소들이 많아, 간단한 버전을 보여드리고 싶습니다. 전체 출발하는 지구 모습과 녹색 공, 그리고 배경에는 빨간 정사각형 한 개가 있어요. 우리의 애니메이션은 이렇게 보일 거에요.

![animation](https://miro.medium.com/v2/resize:fit:1200/1*awI1UedVjvAwINK3lwCsyA.gif)

이 애니메이션에서는 TweenOne 컴포넌트를 사용했지만, 애니메이션에 경로를 사용하기 위해 PathPlugin이 필요해요. PathPlugin을 TweenOne.plugins에 추가하면 잘 작동할 거에요.

![path-plugin](/assets/img/2024-05-12-5WaystoanimateaReactapp_11.png)

다음 단계에서는 기본 애니메이션 매개변수를 설명해 보겠습니다:

- duration - 애니메이션 시간(밀리초 단위),
- ease - 애니메이션 이징,
- yoyo - 각 반복마다 앞뒤로 번갈아 가며 재생합니다.
- repeat - 애니메이션을 반복합니다. 지속적인 프로세스를 위해 -1을 사용해야 합니다.
- p - 애니메이션을 위한 경로 좌표입니다.
- easePath - 애니메이션을 위한 이징 경로 좌표입니다.

마지막 두 매개변수에 대해 걱정할 필요는 없습니다. 이것들은 이 SVG에 더 구체적인 매개변수입니다.

다음으로 애니메이션 객체를 만들겠습니다. 이 객체에는 3 종류의 애니메이션이 있습니다:

- redSquare — 아래에 설명한 루프 파라미터 및 Y 좌표, 지속 시간, 지연이 있습니다.
- greenBall — x, y를 값 p로 하는 객체 파라미터를 갖는 경로가 있습니다. 지속 시간, 반복 및 ease는 TweenOne.easing.path 함수와 함께 있습니다:
  - path — easePath 좌표.
  - lengthPixel — 400 구간으로 나뉜 곡선.
  - track — 루프 스타일과 rotate 파라미터가 있는 축을 가진 타원.

![이미지](/assets/img/2024-05-12-5WaystoanimateaReactapp_12.png)

이 코드에 대해 걱정할 필요는 없습니다. TweenOne 컴포넌트에 주의를 기울이셔야 합니다. 간단히 기억해 주겠습니다, 이러한 컴포넌트들은 rc-tween-one에서 가져올 것입니다. 기본 속성과 애니메이션 속성이 있는 기본 컴포넌트로 사용됩니다. 이것이 바로 우리의 애니메이션입니다! 각 TweenOne에는 redSquare, track, greenBall과 같은 고유한 애니메이션 규칙이 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:960/1*lIUAJ_Cu6PgTrL6MLj1uvA.gif)

😄 조금 무서워 보이죠. 하지만 실제로 이 줄들에 주의를 기울여야 합니다.

![Animation](/assets/img/2024-05-12-5WaystoanimateaReactapp_13.png)

알아차린 것처럼, 이 방법으로 애니메이션을 생성하는 것은 간단한 방법입니다. 필요한 것은 애니메이션 규칙을 설명하고, 그것을 TweenOne 컴포넌트로 전달하는 것뿐입니다.

## 🏁 결론

애니메이션을 사용하는 여러 방법이 있습니다. 각각 다른 방법이 필요합니다. 오늘은 여러분의 프로젝트에서 사용할 수있는 몇 가지 결정을 검토했습니다. 당신에게 어울리는 방법을 선택하세요 👨‍💻

🙂 이 기사를 읽기 전 당신의 사이트:

<img src="/assets/img/2024-05-12-5WaystoanimateaReactapp_14.png" />

🤪 이 기사를 읽은 후 당신의 사이트:

<img src="https://miro.medium.com/v2/resize:fit:1200/1*emR9fk9Kt80Dugw5VSNkQA.gif" />

😄 애니메이션을 현명하게 활용해보세요!

- Sentry를 활용한 React 앱의 오류 추적
- React JS에서 CSS를 구현하는 9가지 방법

# ❤️ 읽어주셔서 감사합니다

재미를 내고 계속 배우며 코딩을 계속하세요.
저를 Medium과 Linkedin에서 팔로우하세요.

# 👏 좋아요, 공유 및 의겢을 남겨주세요.

질문이나 피드백이 있으면 아래 댓글로 알려주세요 👇

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*itETjI1PFdtVKZvp5Qusxw.gif)

- 리액트를 배우는 길
- 리액트 배움: 함수형 웹 개발과 리액트 및 리덕스
- Eloquent JavaScript, 3판: 프로그래밍에 대한 현대적인 소개
- JavaScript: Definitive Guide: 웹 페이지 활성화(결정적 가이드)
- 빠르게 배우는 React: 리액트, JSX, 리덕스 및 GraphQL을 이용한 무난한 웹 앱
- JavaScript: 좋은 부분
- JavaScript Patterns: 코딩 및 디자인 패턴으로 더 나은 애플리케이션 구축

- react-motion — 애니메이션 문제를 해결하는 스프링
- react-spring — 스프링 물리학 기반의 리액트 애니메이션 라이브러리
- ant-motion — Ant Design의 애니메이션 명세 및 구성요소 애니메이션
- react-move — 리액트를 위한 아름다운, 데이터 기반 애니메이션
- react-flight — 리액트용 애니메이션 구성물을 구축하는 최고의 방법
- react-flip-move — FLIP 기법을 사용하여 DOM 변경(예: 목록 재정렬) 사이의 무난한 애니메이션
- react-burger-menu — CSS 전환 및 SVG 경로 애니메이션을 사용하여 효과 및 스타일 모음을 가진 오프캔버스 사이드바 구성 요소
- animated — React 및 React Native를 위한 선언적 애니메이션 라이브러리
- react-tween-state — React 애니메이션
- react-animations — 인라인 스타일 라이브러리용 애니메이션 모음

- GSAP — 현대 웹을 위한 고품질 애니메이션을 지원하는 초고성능 전문가급 애니메이션 라이브러리
- Anime.js — Anime.js (/ˈæn.ə.meɪ/)는 간단하지만 강력한 API를 갖춘 경량 JavaScript 애니메이션 라이브러리입니다. CSS 속성, SVG, DOM 속성 및 JavaScript 객체와 함께 작동합니다.
- Popmotion — 사용자 인터페이스를 위한 감각적인 애니메이션 라이브러리
- vivus — SVG에 그리기 애니메이션을 만들기 위한 JavaScript 라이브러리
- svg.js — SVG 조작 및 애니메이션을 위한 경량 라이브러리
- velocity — jQuery의 $.animate()와 동일한 API를 갖춘 애니메이션 엔진인 Velocity
- wow — 스크롤할 때 나타나는 애니메이션. 매우 애니메이트.css 친구.
- dynamic.js — 물리 기반 애니메이션을 생성하기 위한 JavaScript 라이브러리
- granim.js — 작은 JavaScript 라이브러리를 사용하여 유려하고 상호 작용적인 그래디언트 애니메이션 생성
- kute.js — 코드 품질과 탁월한 성능을 갖춘 네이티브 JavaScript 애니메이션 엔진인 KUTE.js
- TweenJs — JavaScript를 위한 간단하지만 강력한 트윈/애니메이션 라이브러리. CreateJS 라이브러리 스위트의 일부.
- moveTo — 어떠한 종속성도 없는 가벼운 스크롤 애니메이션 JavaScript 라이브러리
