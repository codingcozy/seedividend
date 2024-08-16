---
title: "React Router에 대해 알아보기 사용 방법과 주요 기능 "
description: ""
coverImage: "/assets/img/2024-06-23-LearnaboutReactRouter_0.png"
date: 2024-06-23 13:44
ogImage: 
  url: /assets/img/2024-06-23-LearnaboutReactRouter_0.png
tag: Tech
originalTitle: "Learn about React Router"
link: "https://medium.com/@akhshyganesh/learn-about-react-router-01f6887dd284"
isUpdated: true
---




리액트는 단일 페이지 애플리케이션(SPA)에서 리액트 라우터를 기반으로 합니다.

안녕하세요, 이 DIY 프로젝트에 오신 것을 환영합니다.

시작하기 전에, 먼저 제 소개를 드리겠습니다. 저는 시니어 개발자이자 아키텍트입니다.

이 작업을 시작하기 전에 사전 요구 사항을 나열해 봅시다.

<div class="content-ad"></div>

- 노드가 설치되었는지 확인해주세요 (설치되어 있지 않은 경우 여기를 클릭해주세요).

위에 언급된 요구 사항이 있는지 확인해주세요.

React Router가 무엇인가요? 사용해야 하는 이유는 무엇인가요?

React Router는 React를 위한 라우터 관리자로, 즉 컴포넌트의 렌더링을 제어합니다.

<div class="content-ad"></div>

애플리케이션 내에 SignIn, SignUp, Home, Dashboard와 같은 컴포넌트가 있는 간단한 예를 가정해보겠어요. 사용자 상호작용에 따라 한 번에 한 컴포넌트만 나타나도록 설정되어 있어요.

예를 들어, 사용자가 로그인하려면 SignIn 컴포넌트를 렌더링하고, 계정을 만들고 싶다면 SignUp 컴포넌트가 될 거예요. 그렇다면 렌더링을 어떻게 관리할까요?

브라우저에서는 이를 경로를 사용하여 이루어낼 수 있어요. 예를 들어, https://medium.com/`path`

여기서 예를 들어, https://medium.com/signin이라면 SignIn을 렌더링하세요.

<div class="content-ad"></div>

React Router가 등장하여 이러한 조건을 제어할 수 있게 됩니다. 여기서 React 라우터를 사용하기 시작하려면 먼저 React 앱을 가져와야 합니다. 아래는 이 멋진 GitHub - jherr/create-mf-app: CLI app to create Module Federation applications를 사용해 기본 React 애플리케이션을 만드는 방법에 대한 내용입니다. 자세한 정보 및 이 명령을 사용하여 React를 생성하는 이유에 대해 알아보려면 여기를 클릭해주세요.

```js
# 웹팩으로 React 생성하기
npx create-mf-app
```

NVM을 사용하여 노드 버전을 최신 버전으로 설정했습니다. NVM에 대해 더 자세히 알아보려면 여기를 클릭해주세요.

<div class="content-ad"></div>


![React Router](/assets/img/2024-06-23-LearnaboutReactRouter_0.png)

앱 프로젝트 유형을 선택했고, 포트 번호는 기본값 8080으로 남겼습니다. 선택한 프레임워크는 리액트이며 이 부분에서 자유롭게 놀아보세요.

![코드베이스](/assets/img/2024-06-23-LearnaboutReactRouter_1.png)

이제 로컬호스트:8080에서 실행 중인 리액트 애플리케이션이 준비되었습니다. 폴더와 컴포넌트의 코드베이스를 살펴보겠습니다.


<div class="content-ad"></div>

<img src="/assets/img/2024-06-23-LearnaboutReactRouter_2.png" />

<img src="/assets/img/2024-06-23-LearnaboutReactRouter_3.png" />

## React Router Dom 설치

이제 npm i react-router-dom을 설치해보겠습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-23-LearnaboutReactRouter_4.png" />

앱 컴포넌트에서는 전체 애플리케이션을 BrowserRouter로 래핑해 봅시다.

```js
import React from "react";
import ReactDOM from "react-dom";
import { 
  BrowserRouter,
} from "react-router-dom";
import "./index.css";

const App = () => (
  <div className="container">
    <h1>App Component</h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

# React Router를 사용한 기본 라우팅

<div class="content-ad"></div>

리액트 라우터는 `Routes /`와 `Route /` 컴포넌트를 제공하며 경로에 기반하여 컴포넌트를 렌더링합니다:

```js
import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import "./index.css";

const App = () => (
  <div className="container">
    <h1>App Component</h1>
  </div>
);

const Login = () => (
  <div className="container">
    <h1>Login Component</h1>
  </div>
);

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <AppRoute />
  </BrowserRouter>
);
```

위의 코드 조각을 설명하자면, react-router-dom에서 세 가지를 import 했습니다: Route, Routes, BrowserRouter 이 세 가지가 모여 라우터 마법을 수행합니다.

BrowserRouter — 앱 전체를 제어하는 기본 래퍼입니다.

<div class="content-ad"></div>

애플리케이션의 경로 목록 및 경로와 요소를 함께 나열한 루트입니다.

루트 - 경로와 요소를 매핑하는 개별 항목

## 경로를 나타내는 일반 JavaScript 객체

React 컴포넌트에서 react-router-dom에 있는 후크와 함수형 컴포넌트로 이를 구현할 수 있습니다. 

<div class="content-ad"></div>

```js
import React from "react";
import ReactDOM from "react-dom";
import {
  useRoutes,
  BrowserRouter,
} from "react-router-dom";
import "./index.css";

const App = () => (
  <div className="container">
    <h1>App Component</h1>
  </div>
);

const Login = () => (
  <div className="container">
    <h2>Login Component</h2>
  </div>
);

const AppRoute = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <App />
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);
  return routes;
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <AppRoute />
  </BrowserRouter>
);
```

와우!! 기본 설정 로직을 완료했습니다. 어려움이 있거나 소스 코드를 보려면 여기를 클릭하세요

# 공개 및 보호된 라우트

보호된 라우트는 Private Routes로도 알려져 있으며 일부 사용자의 액세스 수준에 따라 특정 경로에 대한 액세스를 제한하는 기본 개념입니다.

<div class="content-ad"></div>

이에 대해 알아보려면 먼저 Outlet에 대해 배워야 합니다. 이것들은 다시 말해 React Routers에서 옵니다.

Outlet은 기본적으로 React가 라우터 구성에 따라 표시해야 하는 적절한 구성 요소로 대체하는 요소입니다.

그게 무슨 말인지 이해하지 못했다면 걱정하지 마세요. 먼저 SimpleLayout과 DashboardLayout을 구현하는 예제 스니펫을 아래에서 살펴보겠습니다.

## SimpleLayout

<div class="content-ad"></div>

```js
# src/layouts/SimpleLayout
import { useOutlet } from "react-router-dom";

const SimpleLayout = () => {
  const outlet = useOutlet();

  return (
    <div className="container">
      {outlet}
    </div>
  )

}

export default SimpleLayout
```

저는 SimpleLayout 컴포넌트의 outlet을 얻기 위해 useOutlet 훅을 사용했습니다. 이를 일반적인 앱에서는 헤더, 푸터 및 내비게이션 바 컴포넌트로 감쌌습니다.

## DashboardLayout

```js
import { Link, Navigate, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const isLoggedIn = () => {
    // 인증 로직이 여기에 들어갑니다
    return Math.floor(Math.random() * 10) < 8
  };

  if (!isLoggedIn()) {
    alert('isLoggedIn 함수가 로그인하지 않은 사용자를 반환하는 예시')
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <nav>
        <Link to="/dashboard">대시보드 홈</Link>
        <br />
        <Link to="/dashboard/settings">대시보드 설정</Link>
      </nav>
      <Outlet />
    </div>
  )

}

export default DashboardLayout
```

<div class="content-ad"></div>

로그인 여부 확인하는 함수가 맞게 동작하지 않습니다. 이 예시에서는 랜덤 값을 사용하여 참 또는 거짓을 무작위로 반환하도록 했습니다.

`Outlet`은 `useOutlet` 훅을 사용한 것과 같은 역할을 합니다.

`!isLoggedIn()`은 이 부분에서 실패하면 사용자가 `/login`으로 이동하게 되며, 이는 SimpleLayout 컴포넌트로 이동합니다. 사용자를 브라우저에서 이동시키기 위해 Navigate 컴포넌트를 사용하여 사용자를 리디렉션시킵니다.

우리는 개인 및 보호된 경로를 처리하기 위한 레이아웃을 준비했습니다.

<div class="content-ad"></div>

Routes 및 Route에 Simple 및 Dashboard 레이아웃을 사용하도록 지원을 추가해 보겠습니다.

## 레이아웃 지원과 라우트, 라우트 패턴

```js
import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import "./index.css";
import DashboardLayout from "./Layouts/Dashboard";
import SimpleLayout from "./Layouts/Simple";

const App = () => (
  <div className="container">
    <h1>App Component</h1>
  </div>
);

const Login = () => (
  <div className="container">
    <h2>Login Component</h2>
  </div>
);

const Dashboard = () => (
  <div className="container">
    <h2>Dashboard Home Component</h2>
  </div>
);

const Settings = () => (
  <div className="container">
    <h2>Settings Component</h2>
  </div>
);

const AppRoute = () => {
  return (
    <Routes>
      <Route path="" element={<SimpleLayout />}>
        <Route index path="" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index path="" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <AppRoute />
  </BrowserRouter>
);
```

대시보드 및 설정 구성요소가 DashboardLayout 내에서 어떻게 렌더링되는지 이해하는 방법은 Route 구성 요소 자체에 route를 자식으로 보내는 것입니다.

<div class="content-ad"></div>

더 간단히 설명하면

```js
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index path="" element={<Dashboard />} />
</Route>
```

위와 같은 구조로 전달됩니다. `Route index path=”” element='`Dashboard /`' /` prop으로 전달되며, DashboardLayout 내에서 isLoggedIn 상태를 확인하여 `Dashboard` 컴포넌트를 렌더링합니다.

가독성을 높이기 위해 아래 섹션에서 직접 Dashboard를 객체 내의 children 키에 넣는 방식을 확인해보세요.

<div class="content-ad"></div>

## Layout Support with Plain JS Object Route patterns

```js
import React from "react";
import ReactDOM from "react-dom";
import {
  useRoutes,
  BrowserRouter,
} from "react-router-dom";
import "./index.css";
import DashboardLayout from "./Layouts/Dashboard";
import SimpleLayout from "./Layouts/Simple";

const App = () => (
  <div className="container">
    <h1>App Component</h1>
  </div>
);

const Login = () => (
  <div className="container">
    <h2>Login Component</h2>
  </div>
);

const Dashboard = () => (
  <div className="container">
    <h2>Dashboard Component</h2>
  </div>
);

const Setting = () => (
  <div className="container">
    <h2>Setting Component</h2>
  </div>
);

const AppRoute = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <SimpleLayout />,
      children: [
        {
          index: true,
          element: <App />
        },
        {
          path: '/login',
          element: <Login />
        }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />
        },
        {
          path: 'settings',
          element: <Setting />
        }
      ]
    }
  ]);
  return routes;
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <AppRoute />
  </BrowserRouter>
);
```

이를 따라 했을 때 앱이 어떻게 보여야 하는지에 대한 스크린샷을 첨부합니다. [GitHub 레포지토리 링크](GitHub Repo Link)

만약 마음에 드신다면, 이 블로그에 대해 몇 번의 클랩을 더 클릭해주시면 정말 좋겠습니다. 이를 통해 저의 작업에 더 많은 동기부여를 할 수 있습니다. 아래 내용도 좋아하실 수 있습니다.

<div class="content-ad"></div>

마크다운 형식으로 테이블 태그를 바꿀게요.


| 제목                                             | 작성자          | 날짜       | 플랫폼  |
|--------------------------------------------------|-----------------|------------|---------|
| Dockerize any Application in seconds              | Akhshy Ganesh   | Jun, 2024 | Medium  |
| Must know GitHub Commands for Developers          | Akhshy Ganesh   | Jun, 2024 | Medium  |
| MacOS Home Brew Guide. MacOS without home brew is nightmare | Akhshy Ganesh | Jun, 2024 | Medium  |
