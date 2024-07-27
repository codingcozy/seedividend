---
title: "리액트에서의 인증과 권한 부여 방법"
description: ""
coverImage: "/assets/img/2024-05-12-AuthenticationandAuthorizationinreact_0.png"
date: 2024-05-12 20:14
ogImage:
  url: /assets/img/2024-05-12-AuthenticationandAuthorizationinreact_0.png
tag: Tech
originalTitle: "Authentication and Authorization in react"
link: "https://medium.com/@ghimiresamana666/authentication-and-authorization-in-react-8fc76a496ba0"
---

우리는 이 튜토리얼에서 React 앱에 대한 인증 및 권한 부여 기능을 활용할 것입니다. 시작해 봅시다...

인증이란 무엇인가요?

인증은 제공된 자격 증명을 사용하여 사용자의 신원을 확인하는 과정입니다. 사용자가 정당한지 확인하는 것이 일반적입니다.

권한이란 무엇인가요?

인증은 사용자 클라이언트의 권한이나 액세스 수준을 결정하는 보안 절차입니다. 인증된 사용자가 작업을 수행할 수 있는 권한 또는 액세스 여부를 확인하는 것은 표준 절차입니다.

파일과 폴더를 정리해 봅시다.

src 하위에 components 폴더를 만듭니다.
그런 다음 다음 파일을 만듭니다: Unauthorized.js, Navbar.js, Profile.js, Extra.js, Home.js, About.js, Extra.js.

![이미지](/assets/img/2024-05-12-AuthenticationandAuthorizationinreact_0.png)

리액트 라우터 패키지를 사용할 것이기 때문에 다음 명령어를 사용하여 설치해 보겠습니다.

NPM을 사용하는 경우

```js
npm install react-router-dom@6
```

Yarn을 사용하는 경우

```js
yarn add react-router-dom@6
```

새로운 폴더를 만들어서 routes라고 이름 짓기로 하자.

다음 파일을 만들어보세요: Authentication.js, Authorization.js, 그리고 RoutePath.js.

<img src="/assets/img/2024-05-12-AuthenticationandAuthorizationinreact_1.png" />


permissions와 provider라는 이름의 두 개의 추가 폴더를 만들어 주세요. permissions 폴더 안에 permissions.js 파일을, provider 폴더 안에는 authprovider.js 파일을 만들어 주세요.

우린 이제 폴더 구조를 마칩니다.

![Authentication and Authorization in react](/assets/img/2024-05-12-AuthenticationandAuthorizationinreact_2.png)

인증 및 권한 부여가 어떻게 구현되는지 이해하는 것이 우리의 유일한 목표이기 때문에 복잡한 코드나 디자인에 신경쓰지 않을 거에요.

지금 파일을 수정하기 시작하세요!!!

Permissions.js

```js
const PERMISSIONS = {
  CAN_VIEW_ABOUT: "view_about",
  CAN_VIEW_EXTRA: "view_extra",
};
export default PERMISSIONS;
```

일부 데이터에 무단으로 접근을 막기 위해 권한을 만들었습니다.

AuthProvider.js

```js
import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/profile";
  const [user, setUser] = useState({
    username: "",
    permissions: [],
  });
  const login = (user) => {
    if (user === "admin") {
      setUser({ username: user, permissions: ["view_extra"] });
    } else {
      setUser({ username: user, permissions: ["view_about"] });
    }
    navigate(redirectPath, { replace: true });
  };
  const logout = () => {
    setUser({ username: "", permissions: [] });
  };
  return <AuthContext.Provider value={(user, login, logout)}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
```

현재 로그인한 사용자와 부여된 권한을 저장하기 위해 사용자라는 상태 변수 객체를 만들었습니다.

login() 함수는 사용자 매개변수를 받습니다. 사용자가 관리자이면 할당된 권한은 view_extra가 되고, 그렇지 않으면 view_about이 됩니다. 사용자 이름은 사용자와 동일합니다. 그 후, 페이지를 보려고 시도한 경로 또는 프로필 페이지로 이동합니다.

사용자 변수는 logout()에 의해 클리어됩니다.

우리는 context를 구축하고 user, login, logout 값을 provider를 통해 props로 전달했습니다. 앱 전체에서 어디서든 이를 액세스할 수 있습니다.

Authentication.js

```js
import React from "react";
import { useAuth } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const Authentication = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user.username) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export default Authentication;
```

useAuth()를 통해 사용자 객체에 액세스할 수 있었습니다. username 속성이 없다면 로그인되지 않은 상태로 간주되어 로그인 페이지로 이동합니다. 그 외의 경우에는 요청한 페이지가 표시됩니다.

Authorization.js

```js
import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Unauthorized from "../components/Unauthorized";
import { useAuth } from "../provider/AuthProvider";
const Authorization = ({ permissions }) => {
    const { user } = useAuth();
    const location = useLocation();
    if (user.username) {
        const userpermission = user.permissions;
        const isAllowed = permissions.some((allowed) => userpermission.includes(allowed));
        return isAllowed ? <Outlet /> : <Unauthorized />;
    }
    return <Navigate to="/login" state={ path: location.pathname } replace />;
};
export default Authorization;
```

코드를 조각 단위로 해석해 보겠습니다.

당신이 사용자 이름에 따라 권한이 설정되어 있는 것을 염두에 두셨나요? 현재 로그인한 사용자를 통해 해당 권한에 액세스할 수 있게 됐습니다.

권한 획득은 사용자가 로그인했는지에 따라 달라집니다. 현재 로그인한 사용자가 부모 구성 요소를 통해 권한이 부여되었는지 확인하고 싶습니다. 사용자가 권한이 부여된 경우 컴포넌트는 `Outlet/` (하위 라우트)를 렌더링하고, 그렇지 않은 경우 권한이없다는 컴포넌트를 반환합니다.

사용자가 이미 로그인되어 있지 않은 경우 로그인 페이지가 표시됩니다.

Routepath.js에서

```js
<Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_ABOUT]} />}>
  <Route path="about" element={<About />} />
</Route>
```

Authorization 컴포넌트를 Route의 element로 전달하여 권한이 포함된 CAN_VIEW_ABOUT을 가진 사용자가 about 페이지를 방문할 수 있습니다.

Authorization.js에서

```js
const Authorization = ({ permissions }) => {};
```

RoutePath Component에 의해 권한 prop이 전달되었으며 이 경우 부모이다. 따라서 우리는 이제 해당 prop에 액세스할 수 있습니다.

```js
const { user } = useAuth();
```

useAuth()를 통해 현재 사용자에 액세스할 수 있습니다.

```js
if (user.username) {
  const userpermission = user.permissions;
  const isAllowed = permissions.some((allowed) => userpermission.includes(allowed));
  return isAllowed ? <Outlet /> : <Unauthorized />;
}
return <Navigate to="/login" state={{ path: location.pathname }} replace />;
```

사용자가 로그인한 경우에는 사용자 이름과 권한 속성에 액세스할 수 있습니다. 우리는 부여한 권한이 로그인한 사용자의 권한을 포함하는지 여부를 결정해야 합니다.

```js
const isAllowed = permissions.some((allowed) => userpermission.includes(allowed));
```

사용자에게 권한이 있는 경우 (Children Route)이 렌더링되고, 그렇지 않으면 Unauthorized 컴포넌트가 반환됩니다.
사용자가 이미 로그인하지 않은 경우 로그인 페이지가 표시됩니다.

About.js

```js
import React from “react";
const About = () => {
  return <div>About Page</div>;
};
export default About;
```

Extra.js

```js
import React from "react";
const Extra = () => {
  return <div>Extra Page</div>;
};
export default Extra;
```

Home.js





```js
import React from "react";
const Home = () => {
    return <div>홈 페이지</div>;
};
export default Home;
```

Login.js

```js
import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
const Login = () => {
  const [user, setUser] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "";
  const handleLogin = () => {
    login(user);
  };
  return (
    <>
      <h1>로그인 페이지</h1>
      <label>이름</label>
      <input type="text" onChange={(e) => setUser(e.target.value)} />
      <button type="submit" onClick={handleLogin}>
        로그인
      </button>
    </>
  );
};
export default Login;
```

우리는 사용자 상태 변수를 생성하고 입력 필드를 추가했습니다. 입력란에 입력된 데이터는 사용자를 위해 보관되며 로그인할 때 전달됩니다.





Navbar.js

```js
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
export const Navbar = () => {
    const { user } = useAuth();
    return (
        <nav>
            <NavLink to="/">홈</NavLink>
            <NavLink to="/about">소개</NavLink>
            {user.username && <NavLink to="/profile">프로필</NavLink>}
            {!user.username && <NavLink to="/login">로그인</NavLink>}
            <NavLink to="/extra">추가</NavLink>
        </nav>
    );
};
```

서로 다른 경로 간 이동이 간단해지도록 navbar를 추가했습니다. 프로필 링크는 로그인한 사용자를 위해 제공되지만, 아직 인증을 받지 않은 사용자에게는 로그인 링크가 표시됩니다.

<img src="/assets/img/2024-05-12-AuthenticationandAuthorizationinreact_3.png" />


![Authentication and Authorization in React](/assets/img/2024-05-12-AuthenticationandAuthorizationinreact_4.png)

Profile.js

```js
import React from "react";
import { useAuth } from "../provider/AuthProvider";

const Profile = () => {
  const { user, logout } = useAuth();

  const logoutHandler = () => {
    logout();
  };

  return (
    <>
      <h1>Welcome {user.username}</h1>
      <button type="submit" onClick={logoutHandler}>
        Logout
      </button>
    </>
  );
};

export default Profile;
```


We used useAuth() to access user and logout(). We added a logout button to handle logout operations and displayed the username of the user who is presently logged in.





Unauthorized.js

```js
import React from "react";
const Unauthorized = () => {
 return <div>이 페이지를 보기 위한 권한이 없습니다</div>;
};
export default Unauthorized;
```

RoutePath.js

```js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Authentication from "./Authentication";
import Authorization from "./Authorization";
import PERMISSIONS from "../permissions/Permissions";
import Extra from "../components/Extra";
const RoutePath = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_ABOUT]} />}>
        <Route path="about" element={<About />} />
      </Route>
      <Route
        path="profile"
        element={
          <Authentication>
            <Profile />
          </Authentication>
        }
      />
      <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_EXTRA]} />}>
        <Route path="extra" element={<Extra />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
export default RoutePath;
```

`Routes` 구성 요소에서 루트를 캡슐화했습니다.

```js
<Route
  path="profile"
  element={
    <Authentication>
      <Profile />
    </Authentication>
  }
/>
```

접근하기 전에 인증이 필요하기 때문에 `Authentication` 구성 요소로 루트를 래핑했습니다.

```js
<Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_EXTRA]} />}>
  <Route path="extra" element={<Extra />} />
</Route>
```

또한 인가가 필요한 루트에 대해 인가를 요소로 전달했는데, 이 인가는 권한을 가진 자식 루트들을 감싸는 역할을 했어요. 이 경우 관리자 권한을 가진 사용자만 `Extra /` 컴포넌트를 볼 수 있어요.

아래는 최종 결과물입니다:

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*8u590rCf0gvThvAdNOAqoQ.gif)

그래서, 새로운 것을 배웠나요? 마음대로 바꾸고 실험해보세요. 즐거운 코딩하세요!
