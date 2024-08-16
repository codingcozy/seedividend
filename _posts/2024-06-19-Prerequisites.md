---
title: "필수 준비물"
description: ""
coverImage: "/assets/img/2024-06-19-Prerequisites_0.png"
date: 2024-06-19 23:49
ogImage: 
  url: /assets/img/2024-06-19-Prerequisites_0.png
tag: Tech
originalTitle: "Prerequisites"
link: "https://medium.com/@zemmel.mootez/implementing-keycloak-authentication-in-a-next-js-application-0033a6569ec2"
isUpdated: true
---




## Next.js 어플리케이션에서 Keycloak 인증 구현하기

![Prerequisites](/assets/img/2024-06-19-Prerequisites_0.png)

이 튜토리얼에서는 오픈 소스 신원 및 접근 관리 솔루션인 Keycloak을 Next.js 어플리케이션에 통합하는 방법을 탐색할 것입니다. 이 가이드를 마치면 Keycloak을 사용한 완전히 기능적인 인증 시스템을 갖게 될 것입니다.

# Prerequisites

<div class="content-ad"></div>

다음 단계로 넘어가기 전에 다음 사전 요구 사항이 있는지 확인해 주세요:

- Next.js의 기본적인 이해: Next.js의 기초 사항 및 페이지 및 컴포넌트를 생성하는 방법에 익숙해야 합니다.
- Node.js 설치: 컴퓨터에 Node.js가 설치되어 있는지 확인해 주세요. nodejs.org에서 다운로드할 수 있습니다.
- Keycloak 인스턴스: Keycloak 인스턴스를 설정해야 합니다. 아직 수행하지 않은 경우 Keycloak 시작 안내서를 따르세요.

# 프로젝트 구조

시작하기 전에, 프로젝트의 폴더 구조를 개요로 살펴봅시다. 각 파일이 어디에 속하는지 이해하는 데 도움이 될 것입니다.

<div class="content-ad"></div>


nextjs-app
├── auth
│   ├── config
│   │   └── keycloak.js
│   ├── provider
│   │   └── KeycloakProvider.js
│   ├── middleware
│   │   └── withAuth.js
│   └── components
│       └── LogoutButton.js
├── pages
│   ├── _app.js
│   └── index.js
└── public
└── styles
    └── globals.css

# 단계 1: Keycloak 설정하기

먼저, Next.js 프로젝트에서 Keycloak을 구성해야 합니다. Keycloak은 애플리케이션과 연결하기 위해 초기 구성이 필요합니다. 설정 파일을 만들어 시작하겠습니다.

Keycloak 설정 파일 만들기


<div class="content-ad"></div>

config 디렉토리에 keycloak.js라는 새 파일을 만들어주세요. 이 파일은 Keycloak 설정과 초기화 로직을 담을 것입니다.

auth/config/keycloak.js

```js
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080/auth', // 여러분의 Keycloak URL로 교체해주세요
  realm: 'your-realm', // 여러분의 Keycloak realm으로 교체해주세요
  clientId: 'your-client-id', // 여러분의 Keycloak client ID로 교체해주세요
};

let keycloak;

if (typeof window !== 'undefined') {
  keycloak = new Keycloak(keycloakConfig);
}

let isInitialized = false;

export const initKeycloak = () => {
  if (!isInitialized && keycloak) {
    isInitialized = true;
    return keycloak
      .init({ onLoad: 'login-required', checkLoginIframe: false })
      .then(authenticated => authenticated)
      .catch(err => {
        isInitialized = false;
        console.error('Failed to initialize Keycloak', err);
        throw err;
      });
  }
  return Promise.resolve(keycloak?.authenticated ?? false);
};

export const logout = () => {
  if (keycloak) {
    keycloak.logout();
  }
};

export const getToken = async () => {
  if (keycloak) {
    if (keycloak.isTokenExpired()) {
      try {
        await keycloak.updateToken(30);
      } catch (error) {
        console.error('Failed to refresh the token', error);
        keycloak.logout();
        return null;
      }
    }
    return keycloak.token ?? null;
  }
  return null;
};

export { keycloak };
```

해설

<div class="content-ad"></div>

- Keycloak 구성: 우리는 Keycloak 구성 객체를 정의하여 Keycloak 서버의 URL, realm 및 클라이언트 ID를 지정합니다.
- Keycloak 초기화: Keycloak를 초기화하기 위해 initKeycloak 함수를 생성합니다. 이 함수를 통해 Keycloak가 한 번만 초기화되도록 합니다.
- 토큰 관리: getToken 함수는 토큰이 만료되었는지 확인하고 필요한 경우 새로 고침을 시도합니다.
- 로그아웃 함수: logout 함수는 로그아웃 프로세스를 트리거합니다.

# 단계 2: Keycloak 프로바이더 생성

Keycloak의 상태를 관리하고 애플리케이션 전체에서 제공하기 위해 컨텍스트 프로바이더를 생성할 것입니다. 이를 통해 애플리케이션의 모든 구성 요소가 인증 상태와 사용자 정보에 액세스할 수 있게 됩니다.

Keycloak 프로바이더 생성하기

<div class="content-ad"></div>

auth/provider 디렉토리에 KeycloakProvider.js라는 새 파일을 만들어주세요.

auth/provider/KeycloakProvider.js

```js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { initKeycloak, keycloak, logout } from '../config/keycloak';

const KeycloakContext = createContext({
  initialized: false,
  authenticated: false,
  user: null,
  logout: () => {},
});

export const KeycloakProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initKeycloak()
        .then(auth => {
          setAuthenticated(auth);
          if (keycloak && auth) {
            setUser({
              name: keycloak.tokenParsed?.preferred_username,
              email: keycloak.tokenParsed?.email,
            });
          }
          setInitialized(true);
        })
        .catch(err => console.error('Failed to initialize Keycloak', err));
    }
  }, []);

  return (
    <KeycloakContext.Provider value={{ initialized, authenticated, user, logout }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => useContext(KeycloakContext);
```

해당 내용입니다.

<div class="content-ad"></div>

- 컨텍스트 생성: 우리는 인증 상태를 유지하기 위해 KeycloakContext를 생성하고 애플리케이션에 제공합니다.
- 제공자 컴포넌트: KeycloakProvider 컴포넌트는 Keycloak을 초기화하고 인증 상태를 관리합니다. 또한 로그아웃 기능과 사용자 정보를 제공합니다.
- 사용자 지정 후크: useKeycloak 후크를 사용하여 어떤 컴포넌트에서든 Keycloak 컨텍스트에 쉽게 액세스할 수 있습니다.

# 단계 3: 인증 미들웨어 생성

우리의 경로를 보호하고 인증된 사용자만 액세스할 수 있도록 하기 위해 Higher-Order Component (HOC)를 생성할 것입니다.

인증 미들웨어 생성하기

<div class="content-ad"></div>

auth/middleware/withAuth.js 파일을 새로 만들어주세요.

auth/middleware/withAuth.js

```js
import React from 'react';
import { useKeycloak } from '../provider/KeycloakProvider';

const withAuth = WrappedComponent => {
  return props => {
    const { initialized, authenticated } = useKeycloak();

    if (!initialized) {
      return <div>Loading...</div>;
    }

    if (!authenticated) {
      return <div>Not authenticated</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
```

설명

<div class="content-ad"></div>

- Higher-Order Component: withAuth HOC은 컴포넌트를 감싸고 사용자가 인증되었는지 확인합니다. 사용자가 인증되지 않은 경우 메시지를 표시하고, 그렇지 않은 경우 감싼 컴포넌트를 렌더링합니다.

# 단계 4: 로그아웃 버튼 생성

사용자가 세션에서 로그아웃할 수 있는 버튼 컴포넌트를 생성할 것입니다.

로그아웃 버튼 만들기

<div class="content-ad"></div>

auth/components/LogoutButton.js 파일을 auth/components 디렉토리에 만들어주세요.

```js
import React, { useState, useRef, useEffect } from 'react';
import { useKeycloak } from '../provider/KeycloakProvider';

const LogoutButton = () => {
  const { logout, user } = useKeycloak();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button onClick={toggleDropdown} className="button">
        {user?.name.charAt(0).toUpperCase() || 'U'}
      </button>
      {showDropdown && (
        <div ref={dropdownRef} className="dropdown">
          <div className="dropdown-content">
            <p>{user?.name || 'Unknown User'}</p>
            <p>{user?.email || 'Unknown User'}</p>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
```

<div class="content-ad"></div>

- 상태 관리: 우리는 dropdown 메뉴의 가시성을 관리하기 위해 useState를 사용합니다.
- 드롭다운 토글: toggleDropdown 함수는 dropdown 메뉴의 가시성을 전환합니다.
- 외부 클릭 핸들러: 우리는 useEffect를 사용하여 클릭 영역 밖을 클릭하면 dropdown 메뉴를 닫는 이벤트 리스너를 추가합니다.

# 단계 5: 루트 레이아웃에서 Keycloak 제공자 사용하기

마지막으로, 인증 상태를 응용 프로그램 전반에 걸쳐 제공하기 위해 Keycloak 제공자를 루트 레이아웃 파일에 통합해야 합니다.

루트 레이아웃에서 Keycloak 통합하기

<div class="content-ad"></div>

pages/_app.js

```js
import React from 'react';
import { KeycloakProvider } from '../auth/provider/KeycloakProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <KeycloakProvider>
      <Component {...pageProps} />
    </KeycloakProvider>
  );
}

export default MyApp;
```

설명

<div class="content-ad"></div>

- Keycloak Provider: KeycloakProvider으로 컴포넌트를 감싸면 전체 애플리케이션이 인증 상태에 액세스할 수 있도록 보장합니다.

# 인증이 포함된 예제 페이지

다음은 withAuth HOC를 사용하여 보호된 페이지를 만들고 LogoutButton을 표시하는 예시입니다.

pages/index.js

<div class="content-ad"></div>

```js
import React from 'react';
import withAuth from '../auth/middleware/withAuth';
import LogoutButton from '../auth/components/LogoutButton';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <LogoutButton />
    </div>
  );
};

export default withAuth(HomePage);
```

설명

- 보호된 라우트: 홈 페이지는 withAuth HOC로 감싸져 있어 인증된 사용자만 접근할 수 있습니다.
- 로그아웃 버튼: 홈 페이지는 LogoutButton 컴포넌트를 포함하고 있어 사용자들이 로그아웃할 수 있습니다.

# 결론

<div class="content-ad"></div>

이 포괄적인 튜토리얼에서는 Next.js 애플리케이션에서 Keycloak 인증을 설정하는 과정을 안내했습니다. 다음 사항을 다루었습니다:

- Keycloak 설정: Keycloak 구성 및 초기화 로직 생성.
- Keycloak 제공자 생성: Keycloak 상태를 관리하고 애플리케이션 전반에 제공하는 방법.
- 인증 미들웨어 생성: 고차 컴포넌트를 사용하여 경로를 보호하는 방법.
- 로그아웃 버튼 생성: 사용자가 세션에서 로그아웃할 수 있는 기능.
- 루트 레이아웃에 Keycloak 통합: 인증 상태를 전체 애플리케이션에 제공하고 경로를 보호하는 방법.

이러한 단계를 통해 Keycloak을 사용하여 Next.js 애플리케이션을 안전하게 보호하고 강력한 인증 및 액세스 관리 기능을 제공할 수 있습니다. 이 설정을 원하는 대로 사용자 정의하고 확장하여 특정 요구 사항에 맞게 조정하세요. 즐거운 코딩하세요!

<div class="content-ad"></div>

이 단계를 따라하면 Keycloak을 사용하여 Next.js 애플리케이션을 안전하게 보호할 수 있습니다. 견고한 인증 및 액세스 관리를 제공합니다. 이 설정을 사용자의 요구 사항에 맞게 사용자 정의하고 확장해도 됩니다. 즐거운 코딩하세요!