---
title: "리액트 라우터에서 경로 형성하기"
description: ""
coverImage: "/assets/img/2024-05-12-FormingRoutesinReactRouter_0.png"
date: 2024-05-12 23:03
ogImage: 
  url: /assets/img/2024-05-12-FormingRoutesinReactRouter_0.png
tag: Tech
originalTitle: "Forming Routes in React Router"
link: "https://medium.com/@mojomojoke9/forming-routes-in-react-router-5e64f779525a"
---


<img src="/assets/img/2024-05-12-FormingRoutesinReactRouter_0.png" />

리액트는 웹 개발 세계를 뒤흔들 정도로 인기 있는 프런트엔드 자바스크립트 라이브러리입니다. 그 인기의 이유 중 하나는 컴포넌트 기반 접근 방식으로, 웹 페이지 UI가 여러 컴포넌트나 함수로 나뉘어 효율적이고 인터랙티브한 사용자 인터페이스를 만들어내기 때문입니다. 오픈 소스 라이브러리인 리액트는 개발자들에게 뛰어난 웹 응용프로그램을 만들 수 있는 무한한 가능성을 제공합니다. 이 글에서는 특정 패키지인 React Router 패키지에 초점을 맞추어 다룰 것인데, 이 패키지는 리액트 응용프로그램에서 URL 라우팅을 통해 여러 리액트 컴포넌트의 탐색을 처리할 수 있도록 합니다.

# 시작하기 전에

아래 내용은 Windows OS 환경에서 Visual Studio Code를 코드 편집기로 사용하여 React Router와 React를 사용하는 방법에 대한 상세한 가이드를 제공합니다. 예시는 React 버전 18.3과 React Router 버전 6.2를 기반으로 합니다. 그러나 세팅 과정에서 다른 점이 발견된다면, 설치된 패키지 버전을 확인하기 위해 package.json 파일을 확인하는 것이 좋습니다. 리액트와 리액트 라우터가 계속 발전함에 따라, 이 안내서의 코드는 오래되어질 수 있습니다. 리액트와 리액트 라우터는 자신들의 패키지의 최신 버전으로 업그레이드하기 위한 상세한 문서를 제공하고 있습니다.



# 기본 설정

시작하려면 기본적인 React 앱을 만들어야 합니다. 필요한 패키지를 수동으로 코딩하고 다운로드하는 방법도 있지만, React에서는 더 간단한 대안을 제공합니다. 먼저 터미널에서 앱을 저장할 디렉토리로 이동합니다. 그런 다음 해당 명령을 실행하세요.

```js
npx create-react-app your-app-name
```

이 명령은 항상 현재 React 버전이 설치되어 있는지 확인합니다. 그런 다음이 명령을 사용하여 앱으로 이동합니다:



```js
cd your-app-name
```

설정에 따라 오픈 명령이 다를 수 있습니다. 제가 사용하는 것은 Visual Studio Code에서 앱을 열기 위해 code . 입니다. 어떤 경우든 코드 편집 소프트웨어가 터미널에 연결되어 있는 것이 중요합니다. 기본적인 React 코딩 환경만 필요하다면 모두 준비된 상태입니다! 하지만 싱글 페이지 애플리케이션을 더욱 확장하고 싶다면 클라이언트 측 라우팅을 활용하여 효율적으로 만들 수 있습니다.

# 클라이언트 측 라우팅이란?

이 주제에 대해 자세히 설명하진 않겠지만, 기본 개념에 대해 간단히 설명해 드릴게요. 더 자세히 알고 싶다면 이와 같은 유용한 블로그 포스트와 같은 많은 자료들이 있습니다. 서버 측 라우팅에서는 웹페이지의 링크를 클릭할 때 라우팅이 발생하며 해당 링크 URL을 가집니다. 그러면 브라우저는 해당 특정 페이지에 대한 GET 요청을 서버에 생성하고 서버는 페이지를 그 URL 라우트로 채우기 위해 필요한 데이터로 응답합니다. 사용자가 경험하는 대부분의 버퍼링은 이 과정에서 생성된 GET 요청으로 인한 것입니다. 반면 클라이언트 측 라우팅은 이러한 방식과는 다릅니다. JavaScript를 통해 모든 라우팅을 처리하고 초기 로드 중에 모든 요청을 수행합니다. 이 기술에는 여러 장단점이 있지만, 대부분의 사용자가 빠른 속도를 경험하는 장점이 있습니다. 다음 단락에서는 React Router에 대해 살펴보며 이 라우팅 논리를 React 환경에서 사용하는 것이 훨씬 쉬워진 패키지에 대해 논의할 것입니다.



# React Router 설정하기

React Router Dom의 도구를 사용하려면 먼저 React 애플리케이션에 설치해야 합니다. React 애플리케이션 내에서 아래 명령어를 실행해주세요:

```js
npm i react-router-dom
```

그런 다음 package.json 파일을 확인하고, 다음과 유사한 정보를 찾아보세요:



```js
//
"dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
//
```

만약 React Router Dom 부분에서 버전이 v5 이상이면 모두 설정이 완료된 것입니다!

만약 앞에서 설명한대로 Create React App을 사용했다면, 아래 이미지는 코드 편집기에 따라 다를 수는 있지만 완전히 같아야 합니다.

<img src="/assets/img/2024-05-12-FormingRoutesinReactRouter_1.png" />



지금은 React가 index.js 파일을 통해 App.js만 렌더링하고 있어요. 이 블로그를 만드는 목적을 완전히 무너뜨리고 있네요! 그래서 변경할게요. index.js 파일로 이동해서 필요한 변경사항을 해봐요.

원래 코드:

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

다음과 같이 변경해주세요:



```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path : '/',
    element : <App />
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>)

// 알겠어요. React에서 특정 컴포넌트를 렌더링할 때는, root.render을 사용하여 특정 div의 ID가 있는 위치에 컴포넌트를 표시합니다. 그러나 만약 URL 경로에 기반하여 여러 컴포넌트를 렌더링하고 싶을 때는 어떻게 해야 할까요? 이때 React Router Dom 도구가 필요합니다. React Router Dom을 구현하려면 먼저 react-router-dom에서 createBrowserRouter와 RouterProvider를 가져와야 합니다. createBrowerRouter는 애플리케이션 내에서 탐색하는 데 필요한 라우터를 생성하고, RouterProvider는 라우터를 애플리케이션에 제공합니다. 그런 다음에는 URL 경로를 담을 수 있는 router라는 변수를 설정합니다. 이 변수에는 배열이 사용됩니다. router 배열을 사용하면 URL 경로를 해당하는 컴포넌트로 매핑할 수 있습니다. 모든 애플리케이션에는 지정된 "홈" 페이지가 필요하기 때문에, 사용자가 웹사이트로 이동할 때 초기로드할 컴포넌트로 App.js를 만들었습니다. 이는 router 배열 내에서 객체를 만들어 이루어졌습니다. 그런 다음 "path" 키를 사용하여 해당 URL 경로를 입력하여 그에 연결된 컴포넌트를 표시할 수 있습니다. "element" 키를 사용하여 해당 URL 경로의 사용자가 DOM을 표시하는 데 사용할 컴포넌트를 할당했습니다. 마지막으로 ReactProvider를 사용하여 일반적인 React 컴포넌트처럼 호출하고 변수 router를 속성(prop)으로 넘겨줍니다. 이를 통해 React 애플리케이션이 사용자가 입력한 URL 경로에 따라 동적으로 다른 컴포넌트를 렌더링할 수 있게 되었습니다.

좋아요, 모든 것을 이해했어요. 그러나 사용자가 다른 URL로 이동하는 방법은 어떻게 할까요? URL 경로를 직접 입력하는 것은 좋지 않은 사용자 경험입니다. 이때 React Router가 제공하는 또 다른 도구인 Link와 Navlink를 활용합니다. 이 도구들을 사용하는 방법을 알아보겠습니다. src 내의 두 번째 URL에 연결된 다른 React 컴포넌트를 만들어보겠습니다. 이 블로그에서는 JSX와 같은 React 컴포넌트 구문에 대한 내용을 다루지 않지만, 더 자세히 알고 싶은 사람들을 위한 좋은 자료가 많이 있습니다. 물론 가장 좋은 자료는 React 문서 자체입니다.

여기 우리의 기본 예제 컴포넌트가 있습니다



![2024-05-12-FormingRoutesinReactRouter_2.png](/assets/img/2024-05-12-FormingRoutesinReactRouter_2.png)

이 시점에서 App 컴포넌트가 콘텐츠로 가득 찼다는 것을 눈치챘을 것입니다. 이 콘텐츠는 create react app 명령을 사용하여 애플리케이션을 생성할 때 채워졌습니다. 함수 자체와 내부의 wrapper div만 남기고 모두 안전하게 삭제할 수 있습니다. App 컴포넌트 내에 h1 요소에 코드를 추가하여 예제 컴포넌트와 동일하게 텍스트 내용을 "hello"로 만드세요.

![2024-05-12-FormingRoutesinReactRouter_3.png](/assets/img/2024-05-12-FormingRoutesinReactRouter_3.png)

package.json 파일로 이동하여 스크립트 섹션을 살펴보면 다음과 같은 항목이 있는 것을 확인할 수 있습니다:



"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },

이 명령은 터미널에서 사용할 수 있는 스크립트입니다. 터미널에서 `npm start`를 실행하여 시작 스크립트를 실행하면 모의 프론트엔드 서버가 실행되어 컴포넌트를 렌더링할 것입니다.

이 시점에는 모킹 페이지에 검은색 Hello가 표시되어 있어야 합니다. 잘 했어요! 그런데 예시 컴포넌트는 어디로 갔을까요? 페이지를 렌더링하는 방법을 생각해보세요. 다시 index.js로 돌아가서 예시 컴포넌트를 렌더링할 페이지로 추가해야 합니다. 그러면 이제 그렇게 해 봅시다!

![React Router를 사용한 라우트 구성](/assets/img/2024-05-12-FormingRoutesinReactRouter_4.png)



저희는 예제 컴포넌트를 index.js에 불러왔고, 그 후에 라우팅 오브젝트를 형성하여 예제에 라우팅 URL을 지정했습니다. 이제 URL "/example"을 입력하면 "Hello World!"가 화면에 표시됩니다.

이전에 말한대로, 이는 서로 다른 URL 경로 간에 이동하는 끔찍한 방법입니다. 대신 Link와 Navlink를 사용해보죠. Link와 Navlink는 모두 to 속성이라는 특별한 속성을 갖고 있으며, 이를 통해 사용자를 제공된 URL로 이동시킵니다. 두 가지의 차이점은 NavLink에는 쉽게 CSS로 스타일을 지정할 수 있는 active 클래스가 있어 사용자에게 현재 활성화된 페이지를 보여줍니다. 우선 Link만 사용해보겠습니다. 다음과 같이 두 컴포넌트에 Link를 가져오세요:

import { Link } from "react-router-dom"

App 및 예제 컴포넌트에서 둘 다 wrapper 엘리먼트인 nav를 사용하여 링크 엘리먼트를 형성한 다음, to 속성에 해당 링크가 이동할 라우팅 경로를 제공해주세요:



<img src="/assets/img/2024-05-12-FormingRoutesinReactRouter_5.png" />

<img src="/assets/img/2024-05-12-FormingRoutesinReactRouter_6.png" />

이제 목업 페이지로 돌아가서 링크를 클릭해보세요. URL 경로가 변경되는 것을 주목하셨나요? 이제 다른 리액트 컴포넌트로의 경로를 포함하는 싱글 페이지 애플리케이션을 성공적으로 생성했습니다!

# 결론



# React Router은 독특한 콘텐츠를 가진 상호 연결된 React 컴포넌트를 생성할 수 있는 무궁무진한 가능성을 제공하는 강력한 도구입니다. 동적 URL 라우팅, 상태 관리 및 useEffect 훅을 통해 혁신의 잠재력이 굉장히 높습니다. 기본 도면조차도 무한한 가능성을 탐험하고 창의성을 발휘할 수 있도록 영감을 줄 수 있습니다. 그러니 바로 React Router에 뛰어들어서, 상상력이 당신을 이끌어갈 곳을 확인해 보세요!

리소스

- [React 문서](https://reactjs.org/)
- [React Router 문서](https://reactrouter.com/)