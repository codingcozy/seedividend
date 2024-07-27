---
title: "리액트에서 권한 기반 인증 및 권한 부여 - 인증 핸들러로 특정 권한 및 익명 인증 페이지"
description: ""
coverImage: "/assets/img/2024-06-20-Role-BasedAuthorizationandAuthenticationinReactwithAuthHandlersSpecificrole-basedandanonymousauthpages_0.png"
date: 2024-06-20 05:11
ogImage: 
  url: /assets/img/2024-06-20-Role-BasedAuthorizationandAuthenticationinReactwithAuthHandlersSpecificrole-basedandanonymousauthpages_0.png
tag: Tech
originalTitle: "Role-Based Authorization and Authentication in React with Auth Handlers — Specific role-based and anonymous auth pages"
link: "https://medium.com/@siva.veeravarapu/role-based-authorization-and-authentication-in-react-with-auth-handlers-specific-role-based-and-466c4483a2fb"
---


Role-based 인가 및 인증은 React 애플리케이션을 안전하게 유지하기 위해 사용자 역할에 따라 애플리케이션의 다른 부분에 대한 액세스를 제어하는 데 필수적입니다. 인증 핸들러를 사용하여 인증 및 권한 부여 논리를 관리할 것입니다.

.Net Core와 유사한 구현은 다음에서 확인할 수 있습니다: https://medium.com/@siva.veeravarapu/role-based-authorization-in-net-core-a-beginners-guide-with-code-snippets-b952e5b952f7

DotNet-FullStack-Dev와 함께 지속적인 학습과 탐험의 여정을 떠나보세요. 더 많은 정보를 알아보려면 저희 블로그 https://dotnet-fullstack-dev.blogspot.com 를 방문해 주세요.

## 단계 1: 인증 컨텍스트 설정하기

<div class="content-ad"></div>

사용자 인증 상태를 관리하고 구성 요소에 인증 방법을 제공하는 Authentication Context를 만들어보세요.

AuthContext.js:

```js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // 여기에 로그인 로직을 구현합니다 (예: API 호출)
    setUser(userData);
  };

  const logout = () => {
    // 여기에 로그아웃 로직을 구현합니다
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

## 단계 2: 인증 구성 요소 구현

<div class="content-ad"></div>

로그인, 로그아웃 및 보호된 경로용 구성 요소를 작성하십시오.

Login.js:

```js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 로직 구현 (예: AuthContext에서 로그인 메서드 호출)
    login({ username, password });
  };

  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default Login;
```

<div class="content-ad"></div>

```js
import React from 'react';
import { useAuth } from './AuthContext';

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    // 로그아웃 로직 구현 (예: AuthContext에서 logout 메서드 호출)
    logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Logout;
```

ProtectedRoute.js:

```js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route {...rest} render={(props) => {
      if (!user) {
        return <Redirect to='/login' />;
      }

      if (roles && !roles.includes(user.role)) {
        return <Redirect to='/' />;
      }

      return <Component {...props} />;
    } />
  );
};

export default ProtectedRoute;
```

## 단계 3: 인증 컴포넌트 사용하기


<div class="content-ad"></div>

애플리케이션 루트에서 인증 구성요소를 사용하세요.

App.js:

```js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import Logout from './Logout';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import AdminDashboard from './AdminDashboard';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <ProtectedRoute path='/admin' component={AdminDashboard} roles={['admin']} />
          <ProtectedRoute path='/' component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
```

리액트 애플리케이션에서 역할 기반의 접근 제어를 갖는 About 및 Contact 페이지를 추가하는 방법에 대해, 추가 구성요소와 라우트로 확장할 것입니다.

<div class="content-ad"></div>

## About 및 Contact 컴포넌트 구현

About.js:

```js
import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to our website!</p>
    </div>
  );
};

export default About;
```

<div class="content-ad"></div>

```js
import React from 'react';

const Contact = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>You can reach us via email or phone.</p>
    </div>
  );
};

export default Contact;
```

## Update ProtectedRoute Component

ProtectedRoute.js:

```js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route {...rest} render={(props) => {
      if (!user) {
        return <Redirect to='/login' />;
      }

      if (roles && !roles.includes(user.role)) {
        return <Redirect to='/' />;
      }

      return <Component {...props} />;
    }} />
  );
};

export default ProtectedRoute;
```

<div class="content-ad"></div>

## App 컴포넌트 및 라우팅 업데이트

App.js:

```js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import Logout from './Logout';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import AdminDashboard from './AdminDashboard';
import About from './About';
import Contact from './Contact';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <ProtectedRoute path='/admin' component={AdminDashboard} roles={['admin']} />
          <ProtectedRoute path='/about' component={About} roles={['user', 'admin']} />
          <Route path='/contact' component={Contact} />
          <ProtectedRoute path='/' component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
```

## 결론

<div class="content-ad"></div>

이 가이드에 따라 React 함수형 컴포넌트에서 인증 핸들러를 사용하여 역할 기반 인가 및 인증을 구현할 수 있습니다. 이 방법은 React 애플리케이션을 안전하게 보호하기 위한 유연하고 확장 가능한 솔루션을 제공합니다. 다양한 인증 및 권한 부여 전략을 실험하여 애플리케이션의 특정 요구 사항을 충족시킬 수 있습니다.

이 방법을 통해 'About' 페이지에 대한 역할 기반의 액세스 제어와 'Contact' 페이지에 대한 무제한 액세스를 보장할 수 있습니다. 애플리케이션의 요구 사항에 따라 역할과 권한을 조정해주세요.