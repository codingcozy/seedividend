---
title: "Microsoft Authentication Library MSAL을 사용한 인증"
description: ""
coverImage: "/assets/img/2024-05-12-AuthenticationUsingMicrosoftAuthenticationLibraryMSAL_0.png"
date: 2024-05-12 21:34
ogImage: 
  url: /assets/img/2024-05-12-AuthenticationUsingMicrosoftAuthenticationLibraryMSAL_0.png
tag: Tech
originalTitle: "Authentication Using Microsoft Authentication Library (MSAL)"
link: "https://medium.com/edstem/authentication-using-microsoft-authentication-library-msal-51e8644b28d0"
isUpdated: true
---



<img src="/assets/img/2024-05-12-AuthenticationUsingMicrosoftAuthenticationLibraryMSAL_0.png" />

# 소개:

인증 및 안전한 액세스 제공은 모든 웹 애플리케이션의 중요한 부분입니다. 우리는 직접 구축하거나 Microsoft 인증 라이브러리(MSAL)와 같은 타사 서비스를 사용할 수 있습니다. 이렇게 함으로써 개발 작업과 리소스를 절약할 뿐만 아니라 신뢰할 수 있고 효율적이며 검증된 솔루션을 제공받을 수 있습니다. MSAL은 웹 애플리케이션이나 Rest API에 안전한 액세스를 제공합니다. JavaScript, Java, Python과 같은 다양한 응용 프로그램 아키텍처 및 플랫폼을 지원합니다. 구성 파일 및 일부 코드를 사용하여 MSAL을 통합할 수 있기 때문에 OAuth 라이브러리를 사용할 필요가 없습니다. 애플리케이션은 Microsoft 개인 계정이나 클라우드에 설정된 사용자로 로그인할 수 있습니다. Microsoft의 데이터 보안 및 확장성에 대한 신뢰성이 추가로 제공됩니다.

그러니 바로 시작하여 구현에 필요한 단계를 살펴보겠습니다. 이는 다음과 같습니다.

- Microsoft Azure 플랫폼에 애플리케이션 등록
- Auth 구성 파일 구성
- 애플리케이션에 MSAL 코드 추가
- 로그인 구성 요소 추가
- 애플리케이션에 로그인 통합
- 보호된 Rest API에 액세스

# 1. Microsoft Azure 플랫폼에 애플리케이션 등록

먼저, Azure 구독 또는 무료 Azure 계정이 필요합니다. 계정에는 애플리케이션을 등록할 수 있는 권한이 있어야 합니다. 홈페이지에서 Microsoft Entra ID 서비스를 선택할 수 있습니다. 여기서 계정의 테넌트 ID를 볼 수 있고 새로운 앱 등록을 추가할 수 있습니다.

![Microsoft Azure Platform](/assets/img/2024-05-12-AuthenticationUsingMicrosoftAuthenticationLibraryMSAL_1.png)

![이미지](/assets/img/2024-05-12-AuthenticationUsingMicrosoftAuthenticationLibraryMSAL_2.png)

인증 구성 파일을 설정하는 동안 테넌트 ID가 필요합니다.

애플리케이션 이름 및 리디렉션 URI를 입력할 수 있습니다. 리디렉션 URI는 성공적인 인증 이후 MSAL이 리디렉션해야 하는 애플리케이션의 홈페이지 또는 페이지입니다.

![이미지](/assets/img/2024-05-12-AuthenticationUsingMicrosoftAuthenticationLibraryMSAL_3.png)

[Register] 버튼을 클릭하면 애플리케이션에 대한 Application Id를 받을 수 있습니다.

![image](/assets/img/2024-05-12-AuthenticationUsingMicrosoftAuthenticationLibraryMSAL_4.png)

이제 테넌트 Id와 Application Id가 있으므로 Auth 구성 파일을 만들어 나아갈 수 있습니다.

# 2. Auth 구성 파일

src 폴더 안에 애플리케이션에 필요한 authConfig 파일을 추가할 수 있습니다. 이 파일에는 Msal 인스턴스 생성 시 전달될 구성이 포함되어 있습니다. 일반적인 authConfig 파일은 아래와 같이 나타날 것입니다.

```js
// Code snippet 1 – src/authConfig.js
export const msalConfig = {
  auth: {
    clientId: "어플리케이션 ID",
    authority: "https://login.microsoftonline.com/테넌트 ID",
    redirectUri: "https://dev-example-app.com/",
  },
  cache: {
    cacheLocation: "sessionStorage", // 캐시가 저장될 위치를 구성합니다.
    storeAuthStateInCookie: false, // IE11이나 Edge에서 문제가 있는 경우 "true"로 설정하세요.
  },
};
/** 여기에 추가한 스코프는 사용자 로그인 시 동의를 받습니다.
 * 기본적으로 MSAL.js는 OIDC 스코프 (openid, profile, email)를 로그인 요청에 추가합니다.
 */
export const loginRequest = {
  scopes: ["User.Read"],
};
```

# 3. 애플리케이션에 MSAL 코드 추가

@azure/msal-browser와 @azure/msal-react 패키지를 설치해야 합니다.

```js
// 코드 조각 2 - 터미널
npm i @azure/msal-browser @azure/msal-react
```

애플리케이션 진입점에서 PublicClientApplication 객체를 초기화하고 애플리케이션을 MsalProvider 컴포넌트로 감쌉니다.

```js
// 코드 조각 3 - src/index.js
import ReactDOM from "react-dom/client";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const msalInstance = new PublicClientApplication(msalConfig);

root.render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
);
```

# 4. 로그인 컴포넌트





여기에서는 authConfig 파일로부터 loginRequest를 가져 와서 Msal 인스턴스에 제공해야합니다. 페이지 또는 팝업으로 로그인을 추가할지에 따라 loginRedirect 또는 loginPopup 함수를 사용할 수 있습니다.

```js
// 코드 스니펫 4 - src/components/SignIn.js
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
const SignIn = () => {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
       console.log(e);
  };
  return (
    <SignInContainer>
      <SignInPageComponents />
      <SignInButton onClick={() => handleLogin()}>
         Microsoft 계정으로 로그인
      </SignInButton>
    </SignInContainer>
  );
}
export default SignIn;
```

만약 로그인이 팝업으로 되는 경우, Msal 인스턴스는 loginPopup 함수를 사용합니다.

```js
// 코드 스니펫 5 - src/components/SignIn.js
instance.loginPopup(loginRequest).catch((e) => {
  console.log(e);
});
```

비슷하게, Sign-Out은 logoutRedirect 또는 logoutPopup 함수로 처리할 수 있습니다.

```js
// 코드 스니펫 6 - src/components/SignOut.js
instance.logoutRedirect({
  postLogoutRedirectUri: "/",
});
```

```js
// 코드 스니펫 7 - src/components/SignOut.js
instance.logoutPopup({
  postLogoutRedirectUri: "/",
  mainWindowRedirectUri: "/",
});
```

# 5. 애플리케이션과 Sign-In 페이지 통합하기

Sign-In 버튼을 클릭한 후에 MSAL이 사용자를 인증합니다. 애플리케이션은 useIsAuthenticated 함수를 사용하여 인증이 성공했는지 확인할 수 있습니다. 또한, useMsal 함수는 instance, inProgress, accounts 세 개의 객체를 반환합니다. accounts 객체에는 인증된 사용자의 세부 정보가 포함되어 있습니다.

```js
// 코드 스니펫 8 - src/App.js
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import Header from "./components/header";
import SignIn from "./components/signin";
import Home from "./pages/home";

const App = () => {
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();
  useEffect(() => {
    if (accounts.length > 0) {
      sessionStorage.setItem(
        "user-details",
        JSON.stringify({
          name: accounts.length > 0 && accounts[0].name,
          email: accounts.length > 0 && accounts[0].username,
        })
      );
    }
  }, [accounts]);
  return (
    <div>
      {isAuthenticated ? (
        <>
          <Header name={accounts.length > 0 && accounts[0].name} email={accounts.length > 0 && accounts[0].username} />
          <Home />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
};
export default App;
```

이 작업을 수행하는 다른 방법이 있습니다. useIsAuthenticated 함수 대신 AuthenticatedTemplate 및 UnauthenticatedTemplate 컴포넌트를 사용할 수도 있습니다. AuthenticatedTemplate으로 둘러싸인 컴포넌트는 인증이 성공한 경우에만 렌더링됩니다.

```js
// 코드 스니펫 9 - src/App.js

import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
. . . . (이전 코드와 같음)
return (
    <div>
      <AuthenticatedTemplate>
          <Header
             name={accounts.length > 0 && accounts[0].name}
             email={accounts.length > 0 && accounts[0].username}
          />
          <Home />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
          <SignIn />
      </UnauthenticatedTemplate>
    </div>
);
```

또한 인증 중에 로더를 표시하는 inProgress를 사용할 수도 있습니다.

```js
// 코드 스니펫 10 - src/components/AnyComponent.js

const { inProgress } = useMsal();
return inProgress ? <Loader /> : <Component />;
```

다음 이미지는 애플리케이션의 실행을 보여줍니다.

![애플리케이션 실행 이미지](/assets/img/2024-05-12-AuthenticationUsingMicrosoftAuthenticationLibraryMSAL_5.png)

<img src="/assets/img/2024-05-12-AuthenticationUsingMicrosoftAuthenticationLibraryMSAL_6.png" />

<img src="/assets/img/2024-05-12-AuthenticationUsingMicrosoftAuthenticationLibraryMSAL_7.png" />

# 6. Accessing protected Rest APIs

응용 프로그램은 acquireToken 메소드 중 하나를 사용하여 보호된 Rest API에도 액세스할 수 있습니다.

```js
// Code snippet 11  - src/components/AnyComponent.js
import { InteractionRequiredAuthError, InteractionStatus} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
const AnyComponent = () => {
  const { instance, inProgress, accounts } = useMsal();
  useEffect(() => {
    const accessTokenRequest = {
      scopes: ["user.read"],
      account: accounts[0],
    };
    if (!apiData && inProgress === InteractionStatus.None) {
      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((accessTokenResponse) => {
          let accessToken = accessTokenResponse.accessToken;
          callApi(accessToken).then((response) => {
            // process the response data
          });
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect(accessTokenRequest);
            // OR  instance.acquireTokenPopup(accessTokenRequest)
          }
        });
    }
  }, [instance, accounts, inProgress]);
  return (...)
}
export default AnyComponent;
```

API 엔드포인트는 액세스 토큰을 Bearer Token으로 전달하여 호출됩니다.

```js
// Code snippet 12
const callApi = async (accessToken) => {
  try {
    return await axios.method(endPoint, {
      headers: { Authorization: `Bearer ${accessToken }` });
  } catch (error) {
    return error.response;
  }
};
```

# 결론





이 기사에서는 응용 프로그램을 등록하고 구성 파일을 만들고 로그인 및 로그아웃을 구현하고 응용 프로그램과 통합하는 다양한 방법을 살펴보았습니다. 추가적으로 MSAL을 사용하여 보호된 API에 액세스할 수도 있습니다. 조직에 새 직원이 합류하는 시나리오를 고려해 보겠습니다. 새 직원은 마이크로소프트 계정만 만들면 되고, 이를 통해 Outlook 및 조직의 내부 응용 프로그램에 액세스할 수 있습니다. 따라서 로그인하면 기술 지원 티켓을 작성하거나 타임시트를 기록하거나 프로젝트 세부 정보를 보거나 이메일을 보낼 수 있습니다. 또한, 관리 및 사용자 모니터링 관점에서 사용자를 관리하는 것이 더 쉬워집니다.

이 기사가 유익하게 느껴졌고 필요에 따라 프로젝트에 활용할 수 있기를 바랍니다. 읽어 주셔서 감사합니다!

Edstem 웹사이트에서 더 많은 통찰력 있는 블로그와 실용적인 안내서를 살펴보세요. 저희 팀은 복잡한 응용 프로그램 개발을 전문으로 하는 젊고 뛰어난 열정적인 소프트웨어 엔지니어로 구성되어 있습니다. Agile 소프트웨어 개발, 고급 DevOps 실천법, 인공지능 기능을 활용하여 소프트웨어 프로젝트를 가속화하고 혁신적인 솔루션을 제공합니다.

