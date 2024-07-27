---
title: "React에서 JWT 토큰을 로컬 스토리지에 저장하는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtostoreJWTTokeninLocalStorageforReact_0.png"
date: 2024-05-12 19:15
ogImage: 
  url: /assets/img/2024-05-12-HowtostoreJWTTokeninLocalStorageforReact_0.png
tag: Tech
originalTitle: "How to store JWT Token in Local Storage for React"
link: "https://medium.com/@giwon.yi339/how-to-store-jwt-token-in-local-storage-for-react-b0957686b75c"
---


## 간단히 말해, JWT란 무엇인가요?

JWT은 JSON Web Token의 약자입니다. 이것은 정보를 안전하게 JSON 객체로 파티 간에 전송하는 간결하고 자체 포함된 방법입니다. 웹 개발에서 인증 및 정보 교환에 일반적으로 사용됩니다.

## 프론트엔드용 요약



백엔드에서 관리되는 암호화된 JSON 객체로, 사용자 계정이 생성되거나 로그인할 때 Frontend로 전송됩니다. 이 토큰을 이용하면 사용자가 웹 서비스의 일부에 대한 권한/접속을 얻을 수 있습니다. 클라이언트 측에서 사용하기 위해 이를 Local storage, 세션 또는 쿠키에 저장할 수 있습니다 (각각에는 고유한 보안 문제가 있으니 더 자세히 알아보세요).

또한 https://jwt.io/를 방문하여 토큰을 해독하고 내용을 확인할 수 있습니다.

## 이 페이지는 이를 로컬 스토리지에 저장하는 내용입니다.

토큰을 사용하면서, 성공적인 로그인 후에 액세스 토큰과 리프레시 토큰을 로컬 스토리지에 저장하려고 했습니다.



개발자 도구를 열고 `Application -` Local storage를 클릭하면 저장소를 확인할 수 있습니다.

# 실제 코드로 넘어가보겠습니다

## 여기 styled-components를 사용하여 만든 Login.jsx 파일이 있습니다

아직 토큰 기능 설정은 포함되어 있지 않습니다. 요소를 설정하고 Styled-components를 사용하여 스타일을 지정하는 방법의 기본 구조만 보여드립니다.



만약 이와 같은 라이브러리를 사용한다면, 코드를 더 깔끔하고 효율적으로 작성할 수 있어요! 그러나 이 경우에는 React hook useState만을 사용했어요.

```js
import React, { useState } from "react";
import { styled } from "styled-components";
```

```js
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <LoginContainer>
      <h1>Login</h1>
      <Form >
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Login</Button>
        <button>Logout</button>
      </Form>
    </LoginContainer>
  );
};
const LoginContainer = styled.section`
  border: 1px solid black;
  height: 400px;
  width: 350px;
  margin: 100px auto;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 200px;
`;
const Input = styled.input`
  width: 240px;
  height: 28px;
  border-radius: 3px;
  border-color: rgba(0, 0, 0, 0.2);
  padding: 3px;
`;
const Button = styled.button`
  width: 200px;
  border-color: rgba(0, 0, 0, 0.2);
  height: 30px;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
  }
`;
```

# 로그인 페이지 스타일링 결과



<img src="/assets/img/2024-05-12-HowtostoreJWTTokeninLocalStorageforReact_0.png" /> 

# handleSubmit 함수 생성

handleSubmit 함수를 만들어서 로그인 세부 정보를 서버로 전송했습니다(fetch는 아직 사용하지 않았습니다). e.preventDefault()를 사용하면 로그인 버튼을 클릭할 때 페이지가 새로고침되지 않도록 합니다.

```js
const handleSubmit = (e) => {
    e.preventDefault();
}
```



```js
// JSX
<Form onSubmit={handleSubmit}>
```

## (handleSubmit 함수 추가) POST를 사용하여 데이터를 가져오고 헤더를 추가하기

사용자 정보를 가져오기 위해 별도의 requestOptions 변수를 생성했습니다. 사용자 로그인이 성공하면 다음 작업을 수행합니다.

- 사용자 이메일 및 비밀번호 입력 요소를 " "으로 초기화합니다.
- console.log(data)를 사용하여 토큰을 검색합니다.
- 접근 토큰 및 리프레시 토큰이 가져와졌음을 확인한 후, 구조분해 할당을 사용하여 이를 로컬 스토리지에 저장할 수 있습니다.
- localStorage.setItem("_변수", _저장값)
- localStorage.getItem("_변수)



```js
const handleSubmit = (e) => {
    e.preventDefault();
```

```js
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch(INSERT_API_HERE, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setEmail("");
        setPassword("");
        console.log(data);
        // note using deconstructuring is better for cleaner code
        const {access, refresh} = data.access_token;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
      });
    
  };
```

마지막으로, CORS 오류와 같은 API 문제가 없다면 토큰이 로컬 스토리지에 저장되는 것을 확인할 수 있습니다. 로컬 스토리지는 브라우저의 개발자 도구를 통해 액세스할 수 있으며 “Application"으로 이동하여 확인할 수 있습니다.

이제 토큰이 있으므로 무엇을 할 수 있을까요? 영구적 로그인을 설정하거나, 헤더 UI를 사용자에 맞게 변경하거나, 인증된 클라이언트 페이지를 더욱 개선할 수 있습니다. 물론, 새로고침 시 네비게이션 바가 업데이트되지 않는 것을 방지하기 위해 Zustand 또는 Redux와 같은 상태 관리자를 사용하는 것이 좋습니다.



당신은 여기에서 나의 persistent login 게시물에 대한 Zustand 설정을 확인할 수 있어요.

# 추가: 로컬 스토리지 초기화

```js
const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("토큰이 제거되었습니다");
};
```

```js
<button onClick={handleLogout}>로그아웃</button>
```



여기에 전체 코드가 있습니다.

```js
import React, { useState } from "react";
import { styled } from "styled-components";
import { Navigate } from "react-router-dom";
```

```js
export const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);
  const LOGIN_URL = "INSERT_YOUR_API";
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch(LOGIN_URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setEmail("");
        setPassword("");
        setNavigate(true)
        // console.log(data);
        // note using deconstructuring is better for cleaner code
        const {access, refresh} = data.access_token;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
      });
      
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("Tokens have been removed");
  };
  if (navigate) {
    return <Navigate to="/signup" />;
  }
  return (
    <LoginContainer>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Login</Button>
        <button onClick={handleLogout}>Logout</button>
      </Form>
    </LoginContainer>
  );
};
const LoginContainer = styled.section`
  border: 1px solid black;
  height: 400px;
  width: 350px;
  margin: 100px auto;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 200px;
`;
const Input = styled.input`
  width: 240px;
  height: 28px;
  border-radius: 3px;
  border-color: rgba(0, 0, 0, 0.2);
  padding: 3px;
`;
const Button = styled.button`
  width: 200px;
  border-color: rgba(0, 0, 0, 0.2);
  height: 30px;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
  }
`;
```