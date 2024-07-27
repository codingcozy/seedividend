---
title: "httpOnly 쿠키로 React 앱 보안을 강화하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-UsehttpOnlycookieToSecureYourReactApp_0.png"
date: 2024-06-22 03:10
ogImage: 
  url: /assets/img/2024-06-22-UsehttpOnlycookieToSecureYourReactApp_0.png
tag: Tech
originalTitle: "Use httpOnly cookie To Secure Your React App"
link: "https://medium.com/@etearner/use-httponly-cookie-to-secure-your-react-app-4e8417d136b8"
---



<img src="/assets/img/2024-06-22-UsehttpOnlycookieToSecureYourReactApp_0.png" />

안녕하세요 여러분, 영원한 학습자가 돌아왔어요. 처음 게시물이 백엔드 개발에 관한 것이었으니, 이번에는 프론트엔드 주제에 대해 이야기하기로 했어요. 보안과 관련된 주제를 선택했어요.

사용자 세션을 관리하고 localStorage에 토큰을 저장하기로 결정한다고 상상해보세요. 이 접근 방식은 편리해 보일 수 있지만, 여러분의 토큰을 잠재적인 보안 위험에 노출시키게 됩니다.

외부 사이트 스크립팅 (XSS) 공격을 통해 삽입된 악성 스크립트는 쉽게 localStorage에 접근하여 이러한 토큰을 도용할 수 있어 사용자 계정 및 중요한 정보에 미승인된 액세스를 유발할 수 있습니다.


<div class="content-ad"></div>

이 위험을 줄이기 위한 더 안전한 대안은 세션 토큰을 저장하기 위해 httpOnly 쿠키를 사용하는 것입니다.

간단 요약.

이 블로그 포스트는 React 앱에서 httpOnly 쿠키를 사용하는 방법을 설명합니다. 이미 해당 쿠키를 제공하는 API가 있는 것으로 가정합니다.

# HttpOnly 쿠키란 무엇인가

<div class="content-ad"></div>

HttpOnly 쿠키는 서버에서만 액세스할 수 있는 쿠키로, JavaScript와 같은 클라이언트 측 스크립트에서는 액세스할 수 없는 쿠키입니다.

HttpOnly 속성은 Set-Cookie HTTP 응답 헤더에 포함되며, 해당 쿠키가 JavaScript의 Document.cookie API를 통해 액세스할 수 없음을 나타냅니다. 이를 통해 쿠키를 크로스 사이트 스크립팅 (XSS) 공격으로부터 보호하여 보안을 강화합니다.

이러한 관행은 세션 토큰이 도용되거나 남용되는 것을 방지하여 사용자 세션의 기밀성과 무결성을 유지함으로써 웹 응용 프로그램의 보안을 강화합니다.

HttpOnly 쿠키를 구현하는 것은 일반적인 웹 취약점에 대한 응용 프로그램의 방어를 강화하는 간단하고 효과적인 방법입니다.

<div class="content-ad"></div>

# 전제 조건

다음 코드 스니펫은 다음 라이브러리를 사용합니다:

- react-hook-form
- axios
- react-query
- react-router-dom

# 인증 시스템 설정

<div class="content-ad"></div>

우리의 React 앱은 로그인 페이지가 있고 사용자가 로그인한 후에 리소스에 액세스할 것입니다. 로그인 폼 제출 프로세스를 설정하는 방법을 알려드리겠습니다:

## 로그인 폼 제출하기

이미 로그인 폼이 준비되어 있다고 가정하고, 제출 프로세스에 집중해 봅시다:

```js
import { LoginFailure } from "./types/LoginFailure";
import { LoginRequest } from "./types/LoginRequest";
import { UserInterface } from "./types/UserInterface";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "./Service/AuthProvider";
import apiClient from './apiClient';

const Login = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginRequest) => {
      const config = { withCredentials: true };
      return apiClient.post<UserInterface | LoginFailure>("/login", data, config);
    },
  });

  const { control, handleSubmit } = useForm<LoginRequest>({
    defaultValues: { email: "", password: "" },
  });

  const { logUserIn } = useAuth();
  const onSubmit: SubmitHandler<LoginRequest> = (formData) => {
    mutate(formData, {
      onSuccess: (response) => {
        logUserIn();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 여기에 폼 필드를 넣으세요 */}
    </form>
  );
}

export default Login;
```

<div class="content-ad"></div>

## 여기서 우리가 한 일은 무엇인가요 ?

우리는 React 기능 컴포넌트인 Login을 만들었습니다. 이는 폼 핸들링과 뮤테이션 훅을 사용하여 사용자 로그인 기능을 다룹니다.

- useMutation: React Query의 이 훅은 뮤테이션(실제로 서버에서 데이터를 변경하는 API 호출)을 다루는 데 사용됩니다.
- useForm: React Hook Form에서는 폼 관리에 사용됩니다.
- useAuth: 사용자 로그인을 포함한 인증 관련 작업을 처리하는 사용자 정의 훅입니다.
- onSubmit: 폼이 제출될 때 호출되는 함수입니다.

httpOnly 쿠키를 고려해야 할 사항은 mutationFn 메서드에서 API 호출에 설정한 구성입니다.

<div class="content-ad"></div>

```js
// ...
mutationFn: (data: LoginRequest) => {
  const config = { withCredentials: true };
  return apiClient.post<UserInterface | LoginFailure>(
    "/login", data, config
  );
},
// ...
```

그 구성 없이는 헤더가 손실되어 React 요청이 성공하지 않을 것입니다.

![image](https://miro.medium.com/v2/resize:fit:996/1*4CPCLz6E3A5f1RAq5Cbq1A.gif)

## 알아두면 좋은 사항

<div class="content-ad"></div>

CORS 문제를 만날 수 있습니다. 해결하는 방법은 다음과 같습니다:

- Node 백엔드의 경우 cors NPM 모듈을 사용하세요.
- Symfony PHP 애플리케이션의 경우 NelmioCorsBundle을 사용하세요.
- 허용된 출처를 설정하도록 웹 서버 구성을 업데이트하세요.

⚠️ 앱과 API가 서로 다른 도메인에 위치하는 경우, API 쿠키의 sameSite 매개변수를 Lax 또는 None으로 설정해야 합니다.

Symfony 앱에서 lexik/LexikJWTAuthenticationBundle을 사용하는 경우 예시가 아래에 있습니다:

<div class="content-ad"></div>

```yaml
lexik_jwt_authentication:
  secret_key: '%env(resolve:JWT_SECRET_KEY)%'
  public_key: '%env(resolve:JWT_PUBLIC_KEY)%'
  pass_phrase: '%env(resolve:JWT_PASSPHRASE)%'

  token_extractors:
    cookie:
      enabled: true
      name: BEARER
  set_cookies:
    BEARER:
      # Update here to set strict, lax or none
      samesite: none
```

# 로그인 후 리소스 가져오기

우리는 login 및 홈페이지로 리디렉트를 처리하는 logUserIn() 메서드를 포함하는 custom hookuserAuth()를 구현할 것입니다.

그리고 예를 들어 홈페이지에서 API 호출을 하게 될 것입니다.

<div class="content-ad"></div>

AuthProvier를 구현했습니다.

```js
import { Context, ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isAuthenticated: boolean;
  logUserIn: () => void;
};

type AuthContextPropsType = {
  children: ReactNode;
};

const AuthContext: Context<AuthContextType | null> =
  createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthContextPropsType) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const logUserIn = () => {
    // 예시를 위해 prop을 설정했지만 여기서 더 많은 작업이 필요합니다
    setIsAuthenticated(true);
    // 홈페이지로 리디렉션
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logUserIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth는 AuthProvider 내에서 사용되어야 합니다. 애플리케이션의 최상위 수준에 AuthProvider를 렌더링하는지 확인해주세요."
    );
  }

  return context;
};
```

여기서 우리는 무엇을 했나요?

사용자 로그인 상태를 관리하고 앱 전체에서 이 상태에 액세스하고 업데이트할 수 있는 방법을 제공하기 위해 인증 컨텍스트를 설정했습니다.

<div class="content-ad"></div>

인증 로직의 중앙 처리를 가능하게 합니다. 사용자가 한 번 로그인하면 자동으로 홈페이지로 리디렉션됩니다.

## 홈페이지에서 리소스 가져오기

```js
import { useQuery } from 'react-query';
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import apiClient from './apiClient';

type ApiResponse = {
  message: string;
};

export default function HomeView() {
  const query = useQuery<ApiResponse, Error>({
    queryKey: ["unique_name_example"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse>("/test", {
        withCredentials: true,
      });
      return response.data;
    },
  });
  const { data, isFetching, isError, error }: UseQueryResult<ApiResponse, Error> = query;

  return (
    <>
      <h1>여기는 API에서 온 메시지입니다</h1>
      {isFetching && <div>로딩 중</div>}
      {isError && <div>오류가 발생했습니다: {error?.message}</div>}
      {!isError && !isFetching && <div>{JSON.stringify(data)}</div>}
    </>
  );
}

export default Home;
```

여기서는 API에서 리소스를 가져오기 위해 전통적인 쿼리를 수행했고, credentials 구성도 설정했습니다.

<div class="content-ad"></div>

```js
{ withCredentials: true }
```

이를 통해 세션이 유지됩니다.

이것을 제거하면 멋진 401 Unauthorized HTTP 응답을 받게 될 거에요.

<img src="https://miro.medium.com/v2/resize:fit:996/1*aY_QKlVYUqtW2JmHjFaO1g.gif" />

<div class="content-ad"></div>

# 이어서

- HttpOnly 쿠키는 XSS 공격으로부터 세션 토큰을 보호하여 앱의 보안을 강화합니다.
- CORS를 적절하게 처리하고 SameSite 매개변수를 도메인 설정에 따라 설정하는 것을 기억하세요.
- 마지막으로, API 호출에서 withCredentials를 true로 설정하면 세션이 유지됩니다.

그리고 이로써 이 주제에 대한 내용이 마무리되었습니다.

도움이 되었으면 좋겠습니다. 가능한 더 효율적으로 만들려고 노력했지만, 중요하지 않다고 생각하는 것은 생략했습니다.