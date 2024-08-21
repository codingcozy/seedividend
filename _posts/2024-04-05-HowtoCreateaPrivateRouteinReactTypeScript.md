---
title: "React 및 TypeScript에서 private route를 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "How to Create a Private Route in React  TypeScript"
link: "https://medium.com/stackademic/how-to-create-a-private-route-in-react-typescript-d43e2b162d46"
isUpdated: true
---

![이미지](/assets/img/HowtoCreateaPrivateRouteinReactTypeScript_0.png)

리액트 프로젝트에서 특정 경로를 보호하고 사용자가 콘텐츠에 액세스하기 전에 가입하거나 로그인해야 하는 것을 보장하기 위해, 우리는 이 블로그에서 바로 그것을 만들어볼 React Private Routes를 활용할 것입니다. React Private Routes를 사용하면 응용 프로그램의 민감하거나 제한된 영역을 보호하기 위해 인증 및 권한 부여 메커니즘을 강요할 수 있습니다.

이 간단한 튜토리얼에서는 React + TypeScript에서 이 기능을 만드는 방법을 가르쳐 드릴 것이며, 이를 프로젝트에서 사용할 수 있도록 해 드리겠습니다.

시작해 봅시다!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](https://miro.medium.com/v2/resize:fit:620/1*-YT_3SovqaKE7fKo5_8ehw.gif)

우선 사용자 인증을 처리하는 사용자 컨텍스트를 생성해보겠습니다.

```js
import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  loginUser: () => void;
  logoutUser: () => void;
}

const AuthContext = (createContext < AuthContextProps) | (undefined > undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginUser = () => {
    // 인증 로직 수행
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    // 로그아웃 로직 수행
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내에서 사용되어야 합니다.");
  }
  return context;
};
```

이제 비공개 라우트 컴포넌트를 생성해봅시다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
//privateRoute.tsx

import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../userContext";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
```

개인 라우트 컴포넌트에서는 useAuth 훅에서 isAuthenticated 값으로 사용자가 인증되었는지 확인합니다. 사용자가 인증되었으면 react-router-dom의 Outlet 컴포넌트를 사용하여 하위 컴포넌트를 렌더링합니다. 사용자가 인증되지 않았으면 Navigate 컴포넌트를 사용하여 로그인 페이지로 리디렉션합니다.

마지막으로, private route 컴포넌트를 ourApp 컴포넌트에서 사용합니다.

userContext 파일을 올바르게 import하는지 확인하십시오. 사용자가 로그인없이 보호된 경로에 액세스하려는 경우, 로그인 페이지로 다시 리디렉션됩니다. `Outlet` 컴포넌트는 react-router-dom v6에서 소개된 컴포넌트입니다. (v6 이전에 이 방법이 어떻게 수행되었는지 알아보려면 이 문서를 참조하세요.)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

그리고 마지막으로 app.tsx 파일에서,

```js
import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import { AuthProvider } from "./userContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* 공개 루트 */}
        <Route path="/login" element={<LoginPage />} />

        {/* PrivateRoute 컴포넌트를 사용한 비공개 루트 */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/account" element={<HomePage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
```

App 컴포넌트에서, 우리는 전체 앱에 인증 컨텍스트를 제공하기 위해 routes를 AuthProvider 컴포넌트로 랩합니다. 로그인 페이지와 같은 공개 루트는 PrivateRoute 컴포넌트 바깥에 정의합니다. 비공개 루트는 PrivateRoute 컴포넌트를 부모로 사용하고 보호된 컴포넌트(이 예에서는 HomePage)를 자식으로 배치합니다. 이로써 사용자가 /account 경로에 액세스하려면 인증되어야 함을 보장합니다.

플레이스홀더 컴포넌트(HomePage 및 LoginPage)를 실제 컴포넌트로 교체해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 설정을 통해 사용자는 인증되지 않은 상태로 비공개 경로에 액세스하려고 시도하면 로그인 페이지로 리디렉션됩니다. 그렇지 않으면 보호된 콘텐츠에 액세스할 수 있습니다.

요약하자면, React Private Routes는 React 프로젝트에서 경로를 보안하는 데 유용한 도구입니다. 인증 및 권한을 강제로 적용하여 인증된 사용자만 민감하거나 제한된 콘텐츠에 액세스할 수 있도록 할 수 있습니다. 비공개 경로를 구현하면 응용 프로그램의 보안성과 무결성을 향상시킬 수 있으며 사용자에게 제어된 환경을 제공할 수 있습니다.

아래에 좋아요, 공유 및 댓글을 자유롭게 남겨주세요. 읽어 주셔서 감사합니다.

![image](https://miro.medium.com/v2/resize:fit:996/1*XgO-vcD9WTFom8ivoObb4w.gif)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
