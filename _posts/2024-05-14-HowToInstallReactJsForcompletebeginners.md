---
title: "React Js 설치 방법 완전 초보자용"
description: ""
coverImage: "/assets/img/2024-05-14-HowToInstallReactJsForcompletebeginners_0.png"
date: 2024-05-14 12:14
ogImage: 
  url: /assets/img/2024-05-14-HowToInstallReactJsForcompletebeginners_0.png
tag: Tech
originalTitle: "How To Install React Js (For complete beginners)"
link: "https://medium.com/@mark.onyango_95482/how-to-install-react-js-for-complete-beginners-5301613c90fb"
isUpdated: true
---





![React installation](/assets/img/2024-05-14-HowToInstallReactJsForcompletebeginners_0.png)

요즘 리액트를 배우는 데 흥미를 느끼고 있고 리액트를 시작했습니다. 이 강력한 JavaScript 프레임워크를 사용하는 첫 번째 단계는 무엇일까요? React를 설치하기 전에 먼저 Node를 설치해야 합니다. 프로세스는 node 웹 사이트를 방문하고 최신 지원 버전을 다운로드하는 것만큼 간단합니다. Node가 필요한 이유가 궁금하다면, Node.js는 서버 측에서 JavaScript를 실행할 수 있는 JavaScript 런타임 환경입니다 (나중에 이에 대한 자세한 기사를 쓸 것입니다). 그 후 명령줄로 이동하여 명령줄이 익숙하지 않은 경우를 대비해 검색할 수 있습니다. React를 설치하는 방법에는 여러 가지가 있습니다:

a) CDN 사용 (가장 쉬운 방법)

이 코드 조각을 html 코드의 head 부분에 포함하세요.




```js
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

이것은 쉽지만 제품 환경보다는 개발 환경에 권장됩니다. 학습을 시작할 때만 사용하는 것이 좋습니다.

a) Vite를 사용하는 방법

명령줄에 다음과 같이 입력하세요: npm create vite@latest app_name — — template react. 그리고 npm install을 실행하고 코드를 행복하게 작성하세요. 이 방법의 장점은 vite가 다양한 기능을 갖추고 빠르며 서버를 빠르게 실행한다는 것입니다.



b) 이전 React 방식을 사용하는 방법

명령줄에 다음을 입력하세요: npx create-react-app 앱-이름. 그리고 나서 코딩을 즐기세요. 이 방법은 vite와 같은 다른 방법보다 서버를 빨리 구동하는 것에 비해 느릴 수 있습니다.

c) Next.js 프레임워크를 사용하는 방법

명령줄에 다음을 입력하세요: npx create-next-app@latest 질문에 답하고 설치하세요. 다만, TypeScript/JavaScript, React, 그리고 tailwind CSS에 대한 선행 지식이 필요합니다.



기존 프로젝트에서는 npm install react react-dom을 사용하여 프로젝트에 React를 추가할 수 있어요. Gatsby, remix와 같은 다양한 프레임워크도 설치할 수 있어요. 더 많은 정보를 원하시면 직접 찾아보세요!