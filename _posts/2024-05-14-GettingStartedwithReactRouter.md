---
title: "리액트 라우터 시작하기"
description: ""
coverImage: "/assets/img/2024-05-14-GettingStartedwithReactRouter_0.png"
date: 2024-05-14 10:51
ogImage: 
  url: /assets/img/2024-05-14-GettingStartedwithReactRouter_0.png
tag: Tech
originalTitle: "Getting Started with React Router"
link: "https://medium.com/learnfactory-nigeria/getting-started-with-react-router-11bdf6c6ceb2"
---


![React Router](/assets/img/2024-05-14-GettingStartedwithReactRouter_0.png)

다이나믹 웹 앱을 만들어 보고 싶은 꿈이 있나요? 사용자가 페이지를 새로 고침하지 않고 서로 다른 섹션 또는 페이지로 쉽게 이동할 수 있는 경험을 제공하는 React Router가 여러분의 비밀 병기가 될 거예요! React 앱에 초능력을 부여하는 강력한 라이브러리로, 부드럽고 직관적인 내비게이션 경험을 만들어볼 수 있어요.

이 안내서는 여러분이 React Router 여행을 떠날 때 나침반 역할을 할 거예요. 기본 사항을 분해하고 일반적인 경로를 탐색하여 페이지 이동 및 사용자 친화적인 앱 구축을 시작하는 데 도움을 줄 거예요.

설치 및 설정



코드를 시작하기 전에 React Router를 사용해보겠습니다. 터미널을 열고 다음 설치 명령어를 입력하세요:

```js
bash
npm install react-router-dom
```

이 명령어는 React 어플리케이션 내에서 작업하기 위해 특별히 설계된 React Router의 최신 버전을 설치합니다.

이제, React Router를 우리 어플리케이션의 주요 파일인 index.js(main.jsx)에 소개해야 합니다. react-router-dom에서 BrowserRouter 컴포넌트를 import하세요. 이 컴포넌트는 네이게이션의 주인공으로 현재 URL을 추적하고 해당 내용이나 컴포넌트를 렌더링하는 역할을 합니다.



애플리케이션 전체(일반적으로 App.jsx)을 BrowserRouter로 감싸세요. 이렇게 하면 모든 컴포넌트가 라우팅 마법을 활용할 수 있습니다.

![이미지](/assets/img/2024-05-14-GettingStartedwithReactRouter_1.png)

라우트 및 컴포넌트

앱을 각각의 뷰 또는 섹션을 나타내는 섬들의 집합으로 상상해보세요. React Router의 Route 컴포넌트는 사용자를 이러한 섬들 사이를 운반해주는 배 역할을 합니다.



간단한 예제입니다:

```js
import {Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
function App() {
 return (

 <Routes>
 <Route path="/" element={<Home />} /> {/* 홈 페이지로 이동하는 경로 */}
 <Route path="/about" element={<About />} /> {/* 소개 페이지로 이동하는 경로 */}
 </Routes>
 
 );
}

export default App;
```

이 예제에서 두 가지 경로가 있습니다:

1. 첫 번째 경로 (path="/")는 Home 컴포넌트에 해당하는 홈 페이지를 가리킵니다.
2. 두 번째 경로 (path="/about")는 About 컴포넌트에 해당하는 소개 페이지로 이동합니다.



사용자가 앱의 루트 URL을 방문하면 홈페이지가 표시됩니다. 그들이 /about으로 이동하면 About 컴포넌트가 주인공이 됩니다.

링크로 탐색하기

그럼 사용자는 이럿의 다른 섬들을 어떻게 탐험할까요? React Router는 링크 컴포넌트를 제공합니다. 이는 마법의 앵커와 같은 역할을 하는데요. 이는 html의 앵커 태그와 동의어입니다. 링크를 클릭하면 React Router가 지정된 경로로 항해하라고 알려줍니다.

다음은 사용 방법입니다:



```js
import { Routes, Route, Link } from 'react-router-dom';
function App() {
 return (
 
 <nav>
   <Link to="/">홈</Link>
   <Link to="/about">소개</Link>
 </nav>


 <Routes>
   <Route path="/" element={<Home />} /> {/* 홈 경로 */}
   <Route path="/about" element={<About />} /> {/* 소개 경로 */}
 </Routes>

 );
}

export default App;
```

이 코드는 두 개의 링크가 있는 간단한 내비게이션 바를 만듭니다. "홈" 링크를 클릭하면 사용자를 홈 페이지로 이동시키고, "소개"를 클릭하면 소개 페이지로 이동시킵니다. 모두 React Router가 원활하게 처리합니다.

만약 Not Found Routes가 있으면 어떨까요?

![GettingStartedwithReactRouter_2](/assets/img/2024-05-14-GettingStartedwithReactRouter_2.png)




만약 사용자가 정의된 경로와 일치하지 않는 URL을 입력하려고 하면 어떻게 될까요? React Router는 이러한 상황을 처리하는 편리한 방법을 제공합니다. 사용자 지정 "404 Not Found" 페이지를 표시하기 위한 catch-all route를 추가할 수 있습니다:

```js
<Route path="*" element={<NotFound />} />
```

이 route는 이전에 정의된 경로와 일치하지 않는 모든 URL에 일치하며, 사용자가 길을 잃지 않도록 보장합니다. 별표(`*`)는 와일드카드로 작동하여 이 route가 애플리케이션의 기본 URL 뒤에 오는 내용에 관계없이 모든 URL 경로와 일치할 것을 나타냅니다.

이것은 React Router가 제공하는 일부 기능의 일부에 불과합니다. 앱이 성장함에 따라 중첩된 route, 동적 매개변수, 프로그래밍 방식의 탐색과 같은 더 고급 기능을 탐색할 수 있습니다. React Router는 복잡하고 사용자 친화적인 네비게이션 경험을 구축할 수 있도록 돕으며, 웹 앱을 탐험하기 즐거운 경험으로 만들어줍니다.



React Router 모험의 시작에 불과하다는 것을 기억하세요. 더 많은 기능을 발견할 수 있고 연습을 통해 금방 마스터 네비게이터가 될 거에요!