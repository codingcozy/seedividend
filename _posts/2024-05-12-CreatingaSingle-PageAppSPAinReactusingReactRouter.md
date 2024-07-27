---
title: "React Router를 사용하여 React에서 단일 페이지 앱SPA 만들기"
description: ""
coverImage: "/assets/img/2024-05-12-CreatingaSingle-PageAppSPAinReactusingReactRouter_0.png"
date: 2024-05-12 20:52
ogImage: 
  url: /assets/img/2024-05-12-CreatingaSingle-PageAppSPAinReactusingReactRouter_0.png
tag: Tech
originalTitle: "Creating a Single-Page App (SPA) in React using React Router"
link: "https://medium.com/@diegogauna.developer/creating-a-single-page-app-spa-in-react-using-react-router-db37b89b3f73"
---


## React 및 Typescript를 사용한 흐름 예제와 일부 패키지

단일 페이지 어플리케이션(SPA)은 단일 HTML 페이지를로드하고 사용자가 애플리케이션과 상호 작용할 때 콘텐츠를 동적으로 업데이트하는 웹 어플리케이션입니다.

최근에 React 코스를 마쳤는데 React Router를 사용하여 SPA를 만들어야 하는 React 애플리케이션을 작업해야 했습니다. 작업 중이던 애플리케이션은 단일 페이지 애플리케이션이었으며 목표는 여러 뷰를 가지는 것이었습니다. 새로운 뷰로 이동할 때 페이지를 다시로드하는 대신, 현재 URL에 기반하여 적합한 컴포넌트를 동적으로 렌더링하기 위해 React Router를 설치했습니다. 따라서 다양한 경로를 정의하고 각 경로는 적절한 경로와 렌더링할 컴포넌트가 지정된 Route 컴포넌트를 사용하여 정의되었습니다.

React Router에서 정말 감사한 점 중 하나는 다른 뷰 사이를 탐색하는 것이 얼마나 쉬웠는지입니다. Link 컴포넌트를 사용하여 다른 뷰 간의 링크를 만들 수 있었으며 React Router가 URL을 업데이트하고 적절한 컴포넌트를 렌더링하는 데 처리했습니다.



React Router를 사용하면 여러 뷰가 있는 복잡한 싱글 페이지 애플리케이션을 쉽게 만들 수 있다는 것을 발견했어요. 현재 URL에 기반하여 동적으로 컴포넌트를 렌더링하고 뷰 간의 탐색을 처리하는 것을 보는 것이 정말 좋았어요!

![이미지](/assets/img/2024-05-12-CreatingaSingle-PageAppSPAinReactusingReactRouter_0.png)

## 왜 SPA 응용 프로그램을 사용해야 할까요?

- SPA는 페이지 새로고침을 최소화하고 빠른 로드 시간을 제공하여 사용자 경험을 개선합니다.
- 모듈식 디자인으로 인해 유지 보수와 개발이 쉽고 전통적인 웹 애플리케이션과 비교했을 때 성능이 더 좋습니다. 필요한 리소스만을 로드하기 때문에 리소스 효율이 높아요.
- 오프라인 이용이 가능하여 사용자 참여도를 높입니다.
- 사용자 데이터를 보호하는 강력한 보안 기능을 갖추고 있을 수 있어요.



## SPA가 사용되는 애플리케이션은 무엇인가요?

- Facebook 및 Twitter와 같은 소셜 미디어 플랫폼
- Gmail 및 Outlook와 같은 이메일 클라이언트
- Trello 및 Asana와 같은 생산성 도구
- Netflix 및 YouTube와 같은 비디오 스트리밍 서비스
- Amazon 및 eBay와 같은 전자 상거래 사이트

## React와 Typescript 및 일부 패키지를 사용하여 SPA를 만드는 방법에 대한 Flow 예제를 확인하세요.

- create-react-app 명령을 사용하여 새 React 프로젝트를 생성합니다.
- React, React-DOM, React-Router-DOM, Typescript 및 Webpack과 같은 필수 종속성을 설치합니다.
- SPA 애플리케이션을 위한 새 컴포넌트를 만듭니다.
- React Router를 사용하여 SPA 애플리케이션의 라우트를 정의합니다.
- 예를 들어 Axios를 사용하여 서버에서 데이터를 가져오기 위한 API 호출을 수행합니다.
- Redux 또는 React Context API를 사용하여 애플리케이션의 상태를 관리합니다.
- 인증, 캐싱 및 오류 처리와 같은 추가 기능을 SPA 애플리케이션에 추가합니다.
- Webpack을 사용하여 SPA 애플리케이션을 빌드합니다.
- AWS, MongoDB 또는 Azure와 같은 웹 서버 또는 클라우드 플랫폼에 SPA 애플리케이션을 배포합니다.



# 이제 React Router와 TypeScript를 사용하여 4개의 컴포넌트를 사용하여 React에서 가장 기본적인 싱글 페이지 앱을 만드는 예제입니다.

우리는 create-react-app을 사용하여 React/Typescript 앱을 만듭니다:

```js
npx create-react-app my-app --template typescript
```

React Router를 설치하세요:



```js
npm install react-router-dom @types/react-router-dom
```

자, 이제 쉬운 네비게이션 메뉴와 라우팅을 만들어 봅시다. 먼저 Router 컴포넌트를 생성하고 Route 컴포넌트를 사용하여 네 가지 경로를 정의합니다. 그리고 Link 컴포넌트를 사용하여 간단한 네비게이션 메뉴를 만들어 봅니다. 간단하죠?

```js
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
```

```js
const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/products" component={Products} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </Router>
  );
};
export default App;
```



그 다음, 몇 가지 기본 구성 요소를 생성해 봅시다! 먼저 환영 메시지를 표시하는 Home을 만들어 보겠습니다.

```js
import React from 'react';
```

```js
const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to our website!</p>
    </div>
  );
};
export default Home;
```

회사에 대한 정보를 표시하는 About 컴포넌트도 만들어봅시다.



```js
import React from 'react';
```

```js
const About: React.FC = () => {
  return (
    <div>
      <h1>About</h1>
      <p>Diego의 회사에 대해 더 알아보세요!</p>
    </div>
  );
};
export default About;
```

제품 목록을 보여주는 AProducts 컴포넌트입니다.

```js
import React from 'react';
```



```js
const Products: React.FC = () => {
  return (
    <div>
      <h1>제품</h1>
      <ul>
        <li>제품 1</li>
        <li>제품 2</li>
        <li>제품 3</li>
      </ul>
    </div>
  );
};
export default Products;
```

마지막으로 이름과 이메일을 요청하는 양식이 있는 Contact 컴포넌트입니다.

```js
import React from 'react';
```

```js
const Contact: React.FC = () => {
  return (
    <div>
      <h1>문의하기</h1>
      <form>
        <label>
          이름:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          이메일:
          <input type="email
```  



리액트 프로젝트에서는 React Router와 같은 라우팅 라이브러리를 사용하여 SPA 내에서 다른 페이지 간의 이동을 처리할 수 있습니다. 또한 Redux나 MobX와 같은 상태 관리 라이브러리를 사용하고 API를 사용하여 SPA 내에서 데이터를 동적으로 가져와 표시할 수도 있습니다. 이러한 도구들을 사용하면 강력하고 반응이 뛰어난 SPA를 만들어 부드러운 사용자 경험을 제공할 수 있습니다.

# 이 게시물이 마음에 드셨나요? 언제든지 채팅해 주세요! :)