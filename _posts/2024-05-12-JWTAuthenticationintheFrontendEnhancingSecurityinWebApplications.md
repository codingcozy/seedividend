---
title: "프론트엔드에서의 JWT 인증 웹 애플리케이션 보안 강화하기"
description: ""
coverImage: "/assets/img/2024-05-12-JWTAuthenticationintheFrontendEnhancingSecurityinWebApplications_0.png"
date: 2024-05-12 22:40
ogImage: 
  url: /assets/img/2024-05-12-JWTAuthenticationintheFrontendEnhancingSecurityinWebApplications_0.png
tag: Tech
originalTitle: "JWT Authentication in the Frontend: Enhancing Security in Web Applications"
link: "https://medium.com/@ritikkhndelwal/jwt-authentication-in-the-frontend-enhancing-security-in-web-applications-ece418206b4f"
isUpdated: true
---




이 블로그에서는 JWT 토큰을 사용하여 프론트 엔드에서 사용자를 인증하고 웹 애플리케이션/웹 사이트에 대한 무단 액세스를 방지하는 방법에 대해 배워보겠습니다.

![JWTAuthenticationintheFrontendEnhancingSecurityinWebApplications_0.png](/assets/img/2024-05-12-JWTAuthenticationintheFrontendEnhancingSecurityinWebApplications_0.png)

이전 블로그에서 API 서버를 만들어서 로그인 엔드포인트를 제공했습니다. 사용자가 로그인하면 로그인한 사용자의 데이터와 액세스 토큰 및 리프레시 토큰을 얻을 수 있습니다. 이를 사용하여 프론트 엔드에서 서버에 자격 증명을 인증할 수 있습니다. 이 블로그에서는 프론트 엔드로 React JS를 사용할 것입니다.

간단히 복습해보죠.



JWT는 JSON 웹 토큰의 약자입니다. 이는 JSON 객체로 정보를 안전하게 전송하는 데 사용되는 공개 표준 (RFC 7519)입니다. JWT는 웹 애플리케이션과 API에서 인증 및 권한 부여에 일반적으로 사용됩니다.

이 정보는 디지털으로 서명되어 신뢰할 수 있습니다. JWT는 HMAC 알고리즘을 사용하여 비밀을 이용하거나 RSA 또는 ECDSA를 사용한 공개/비공개 키 쌍을 사용하여 서명할 수 있습니다.

JWT는 세 가지 부분으로 구성됩니다: 헤더, 페이로드 및 서명.

- 헤더 — 헤더는 두 부분으로 구성됩니다: 토큰을 서명하는 알고리즘 (예: HMAC SHA256 또는 RSA) 및 이 경우 JWT인 토큰 유형이 포함됩니다.
- 페이로드 — 페이로드는 클레임을 포함합니다. 클레임은 사용자 ID 또는 사용자 이름과 같이 엔티티 특정 정보를 전달할 수 있습니다.
- 서명 — 서명은 인코딩된 헤더, 인코딩된 페이로드 및 서버만 알 수 있는 비밀 키를 결합하여 형성됩니다. 이는 토큰의 무결성을 확인하고 변조되지 않았음을 보장하기 위해 사용됩니다.



JWT는 어떻게 동작합니까?

JWT 토큰을 사용할 때 일반적으로 사용되는 흐름은 다음과 같습니다 —

- 사용자 인증 — 먼저 사용자는 자격 증명을 전달하여 서버에 인증합니다.
- 토큰 생성 — 사용자가 인증되면 사용자 세부 정보를 페이로드로 포함하는 토큰이 생성되며, 이는 프론트 엔드 및 백엔드에서 검증을 수행하는 데 필요합니다.
- 토큰 저장 — 서버가 로그인 요청에 대한 응답으로 프론트 엔드에 토큰을 전송하고, 프론트 엔드는 이를 로컬 저장소나 세션에 저장합니다.
- 요청 생성 — 클라이언트가 백엔드 서버에 요청을 보낼 때 헤더에 JWT 액세스 토큰을 전달하여 서버에 대한 신원을 인증합니다. 이것이 JWT의 주요 목적입니다.
- 토큰 확인 — 서버는 요청 헤더, 즉 JWT 액세스 토큰을 확인하고 토큰이 유효하면 요청된 리소스에 대한 액세스를 제공하고, 토큰이 유효하지 않으면 401 상태 코드를 반환하여 사용자를 비인증 상태로 만듭니다.

JWT 만료란 무엇을 의미합니까?



보안을 강화하기 위해 JWT에는 만료 시간을 정의할 수 있는 추가 기능이 있습니다. 특정 기간이 지나면 액세스 토큰이 더 이상 유효하지 않게 됩니다. 만료된 JWT 액세스 토큰을 사용할 수 없습니다. 서버에 액세스하려면 새로운 토큰을 생성해야 합니다.

이를 위해 클라이언트용 새로운 액세스 토큰을 가져오는 작업을 수행하는 리프레시 액세스 토큰을 사용합니다.

우리는 프런트 엔드에서 JWT를 사용하는 방법을 볼 수 있는 로그인 폼을 만들 것입니다. 그래서 먼저 리액트 앱을 생성해보겠습니다. 리액트 앱을 만들기 위해 Vite를 사용하겠습니다.

```js
npm create vite@latest
```



그럼 프로젝트 이름을 지정하고 React 및 간단한 JavaScript을 선택하도록 요청합니다. 이렇게 하면 앱이 포함된 폴더가 생성됩니다. 그런 다음 필요한 모든 패키지를 설치해야 합니다.

```js
cd project_name
npm i   
```

React 앱을 만든 후에는 로그인을 위한 폼을 만들겠습니다. 이를 통해 사용자가 서버에 액세스할 수 있습니다. 사용자가 사용자 이름과 암호를 사용해 로그인하면 백엔드는 액세스 토큰과 리프레시 토큰과 함께 액세스를 부여할 것입니다.

그러므로 먼저 로그인 폼을 만들어 봅시다.



App.js

```js
import axios from "axios";
function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { username, password });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      {user ? (
        <div className="login">
          <form onSubmit={handleSubmit}>
            <span className="formTitle">Lama Login</span>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submitButton">
              Login
            </button>
          </form>
        </div>
      ) : (
        <span>User has been loggedIn </span>
      )}
    </div>
  );
}
```

App.css

```css
.container {
  font-family: "Quicksand", sans-serif;
}

.login {
  width: 200px;
  height: 200px;
  padding: 20px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border: 1px solid lightgray;
  border-radius: 10px;
}

.formTitle {
  color: teal;
  font-weight: bold;
}

.submitButton {
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
}
```



지금은 App() 함수의 반환부에 로그인 후 기능을 작성하는 코드를 작성할 것입니다. 특권을 가진 사용자는 삭제 작업을 수행할 수 있습니다. 기능을 추가한 후 App.js 파일은 다음과 같이 보일 것입니다.

```js
function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { username, password });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    setSuccess(false);
    setError(false);
    try {
      await axios.delete("/users/" + id, {
        headers: { authorization: "Bearer " + user.accessToken },
      });
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="container">
      {user ? (
        <div className="home">
          <span>
            {user.isAdmin ? "어드민" : "사용자"} 대시보드에 오신 것을 환영합니다, <b>{user.username}</b>님.
          </span>
          <span>사용자 삭제:</span>
          <button className="deleteButton" onClick={() => handleDelete(1)}>
            John 삭제
          </button>
          <button className="deleteButton" onClick={() => handleDelete(2)}>
            Jane 삭제
          </button>
          {error && (
            <span className="error">
              이 사용자를 삭제할 수 없습니다!
            </span>
          )}
          {success && (
            <span className="success">
              사용자가 성공적으로 삭제되었습니다...
            </span>
          )}
        </div>
      ) : (
        <div className="login">
          <form onSubmit={handleSubmit}>
            <span className="formTitle">Lama 로그인</span>
            <input
              type="text"
              placeholder="사용자명"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submitButton">
              로그인
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
```

로그인 양식을 사용하여 로그인하면 사용자 데이터와 액세스 토큰 및 리프레시 토큰을 받게 됩니다. 서버로 삭제 요청을 수행할 때 액세스 토큰을 전달합니다. 그러나 액세스 토큰이 만료될 수 있으므로 서버에 전달하기 전에 액세스 토큰을 확인하고 만료되었을 경우 리프레시 토큰을 사용하여 새 액세스 토큰을 얻어야 합니다.

```js
const axiosJWT = axios.create()

axiosJWT.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const decodedToken = jwt_decode(user.accessToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      config.headers["authorization"] = "Bearer " + data.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleDelete = async (id) => {
  setSuccess(false);
  setError(false);
  try {
    await axiosJWT.delete("/users/" + id, {
      headers: { authorization: "Bearer " + user.accessToken },
    });
    setSuccess(true);
  } catch (err) {
    setError(true);
  }
};
```



이렇게 하면 액세스 토큰 만료 문제를 다룰 수 있고, 서버에 요청을 보내기 전에 새 액세스 토큰을 받을 수 있습니다.

GitHub 링크는 다음에서 찾을 수 있습니다.

제 블로그를 읽어 주셔서 감사합니다. 새로운 것을 배우셨으면 좋겣습니다.