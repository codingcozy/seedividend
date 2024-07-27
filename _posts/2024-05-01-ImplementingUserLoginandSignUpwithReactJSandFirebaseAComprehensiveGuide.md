---
title: "ReactJS와 Firebase를 사용하여 사용자 로그인 및 가입 구현하기(2024년)"
description: ""
coverImage: "/assets/img/2024-05-01-ImplementingUserLoginandSignUpwithReactJSandFirebaseAComprehensiveGuide_0.png"
date: 2024-05-01 17:51
ogImage:
  url: /assets/img/2024-05-01-ImplementingUserLoginandSignUpwithReactJSandFirebaseAComprehensiveGuide_0.png
tag: Tech
originalTitle: "Implementing User Login and SignUp with ReactJS and Firebase: A Comprehensive Guide"
link: "https://medium.com/@Rushabh_/implementing-user-login-and-signup-with-reactjs-and-firebase-a-comprehensive-guide-7300bd33cb01"
---

<img src="/assets/img/2024-05-01-ImplementingUserLoginandSignUpwithReactJSandFirebaseAComprehensiveGuide_0.png" />

# 소개:

현재의 디지털 환경에서 사용자 인증 및 등록은 모든 웹 애플리케이션의 기본적인 측면입니다. 개인 블로그, 전자 상거래 플랫폼 또는 협업 도구를 구축하고 있더라도 안전하고 간편한 로그인 및 사용자 가입 프로세스를 구현하는 것이 중요합니다. ReactJS는 사용자 인터페이스를 구축하기 위한 인기 있는 JavaScript 라이브러리이며, 강력한 백엔드 플랫폼인 Firebase와 결합하면 응용 프로그램에서 사용자 인증을 관리하는 강력한 솔루션을 제공합니다.

본문에서는 ReactJS와 Firebase를 사용하여 로그인 및 사용자 가입 기능을 구현하는 단계별 안내를 제공하며, Bootstrap의 유연성과 디자인 기능을 활용합니다. 이 튜토리얼을 완료하면 ReactJS 응용 프로그램의 사용자 경험을 향상시킬 수 있는 원활하고 안전한 사용자 인증 시스템을 만들기 위한 지식과 기술을 갖추게 될 것입니다.

<div class="content-ad"></div>

이 튜토리얼을 통해 다음 주제를 다룰 예정입니다:

- ReactJS 프로젝트 설정 및 필요한 종속 항목 설치하기.
- Firebase 프로젝트 생성 및 Firebase 인증 구성하기.
- 로그인 기능 구현하기, 폼 유효성 검사 및 오류 처리 포함.
- 사용자 등록 기능 구현하기, 새로운 사용자 등록 허용하기.
- 시각적으로 매력적이고 반응형 디자인을 위해 Bootstrap 통합하기.

이 포괄적인 안내를 따라가면 ReactJS에서 튼튼한 로그인 및 사용자 등록 시스템을 구현하는 방법을 이해하고 Firebase의 인증 기능과 Bootstrap의 디자인 구성 요소를 활용할 수 있습니다. 그러니 시작해보고 애플리케이션을 무결한 사용자 인증 경험으로 강화해보세요!

# 1. ReactJS 프로젝트 설정 및 필요한 종속 항목 설치하기:

<div class="content-ad"></div>

구현 세부 사항에 들어가기 전에 ReactJS에 대해 기본적인 이해가 있고 ReactJS 프로젝트를 이미 설정한 것으로 가정한 이 기사를 읽으셔야 합니다. ReactJS에 익숙하지 않거나 프로젝트 설정에 대한 지침이 필요한 경우 이전 기사를 참고하는 것을 권장합니다.

ReactJS에서 로그인 및 사용자 가입 기능을 구현하려면 이 과정을 돕는 여러 패키지를 설치해야 합니다. 이 패키지에는 Bootstrap, Firebase, react-bootstrap, react-google-button, react-router-dom, react-scripts, 그리고 web-vitals이 포함됩니다. 각 패키지와 이들이 구현에서 하는 역할에 대해 자세히 살펴보겠습니다:

- Bootstrap: Bootstrap은 반응형이고 시각적으로 매력적인 사용자 인터페이스를 구축하기 위한 다양한 CSS와 JavaScript 컴포넌트를 제공하는 인기 있는 프론트엔드 프레임워크입니다. 응용 프로그램을 디자인하고 스타일을 쉽게할 수 있도록 도와주며 복잡한 CSS 스타일링에 시간을 할애하는 대신 기능에 집중할 수 있게 해줍니다.

<div class="content-ad"></div>

프로젝트의 터미널이나 명령 프롬프트를 열고 ReactJS 프로젝트의 루트 디렉토리로 이동하세요. 다음 명령을 사용하여 npm(Node Package Manager)을 통해 Bootstrap을 설치해보세요:

```js
npm install bootstrap
```

Firebase: Firebase는 Firebase 인증을 포함한 다양한 서비스를 제공하는 강력한 백엔드 플랫폼입니다. Firebase Authentication은 이메일/비밀번호 인증, Google 및 Facebook과 같은 제공업체를 이용한 소셜 인증 등과 같이 사용할 수 있는 인증 기능을 제공합니다. Firebase Authentication은 응용 프로그램에 대한 안전한 사용자 관리, 인증 흐름, 및 신원 확인을 보장합니다.

```js
npm install firebase
```

<div class="content-ad"></div>

3. react-bootstrap: react-bootstrap은 Bootstrap의 강력함과 ReactJS의 쉬운 사용성 및 유연성을 결합한 라이브러리입니다. 재사용 가능한 React 컴포넌트로 구성된 미리 만들어진 Bootstrap 컴포넌트를 제공하여 Bootstrap의 스타일링 기능을 ReactJS 애플리케이션에 원활하게 통합할 수 있습니다.

```js
npm install react-bootstrap
```

4. react-google-button: 이 패키지는 Google Sign-In 기능을 쉽게 추가할 수 있는 편리한 방법을 제공합니다. Google Sign-In 버튼 컴포넌트를 제공하여 Google의 인증 프로세스를 처리하고 Google 인증을 로그인 및 사용자 가입 흐름에 간소화되게 통합할 수 있습니다.

```js
npm install react-google-button
```

<div class="content-ad"></div>

5. react-router-dom: react-router-dom은 ReactJS 애플리케이션에서 라우팅 기능을 활성화하는 패키지입니다. 이를 사용하면 애플리케이션의 각 페이지에 대한 다른 경로를 정의하여 로그인 페이지, 가입 페이지 및 사용자 대시 보드와 같은 서로 다른 뷰 간에 원할하게 이동할 수 있습니다.

```js
npm install react-router-dom
```

6. web-vitals: web-vitals는 페이지 로드 시간, 상호 작용 및 콘텐츠 렌더링과 같은 중요한 웹 성능 지표를 측정하고 추적하는 데 도움이 되는 패키지입니다. 웹 성능 지표를 모니터링하면 애플리케이션의 성능을 최적화하고 원활한 사용자 경험을 보장할 수 있습니다.

```js
npm install web-vitals
```

<div class="content-ad"></div>

위의 패키지를 설치하고 활용하면 강력한 로그인 및 사용자 가입 시스템을 구현하는 데 필요한 도구를 갖게 됩니다.

## 2. Firebase 프로젝트 생성 및 Firebase 인증 구성

ReactJS 애플리케이션을 위한 Firebase 프로젝트를 만들고 Firebase 인증을 구성하는 방법은 다음과 같습니다:

- Firebase 프로젝트 생성:

<div class="content-ad"></div>

- Firebase 콘솔(https://console.firebase.google.com/)로 이동해서 Google 계정으로 로그인해주세요.
- "프로젝트 추가" 버튼을 클릭하여 새 Firebase 프로젝트를 만드세요.
- 프로젝트 이름을 입력하고 원하는 지역을 선택해주세요.
- Firebase 프로젝트를 생성하려면 "프로젝트 만들기" 버튼을 클릭하세요.

2. Firebase 인증 활성화:

- Firebase 프로젝트가 생성되면 프로젝트 대시보드로 리디렉션됩니다.
- 왼쪽 사이드바에서 "Develop" 섹션 아래에 있는 "Authentication" 옵션을 클릭하세요.
- Authentication 페이지에서 "Sign-in method" 탭 아래의 "시작하기" 버튼을 선택하세요.
- 이메일/비밀번호 및 Google과 같은 인증 제공자를 선택하고 활성화하세요.

3. Firebase 구성 세부정보 획득:

<div class="content-ad"></div>

- Firebase 프로젝트 대시보드에서 왼쪽 상단에있는 "프로젝트 개요" 옆에 있는 "프로젝트 설정" 기어 아이콘을 클릭합니다.
- "일반" 탭에서 "앱" 섹션으로 스크롤하고 프로젝트에 새 웹 앱을 추가하려면 "/" 아이콘을 클릭합니다.
- 앱에 대한 별명을 제공하고 "이 앱에 대해 Firebase 호스팅도 설정" 확인란을 선택 취소 해주세요.
- "앱 등록" 버튼을 클릭하여 계속합니다.
- Firebase에서 앱의 구성 세부 정보를 생성합니다. Firebase SDK 스니펫이 포함됩니다.

4. ReactJS 애플리케이션과 Firebase 연결:

- firebase.js 파일을 만들고 SDK 스니펫을 붙여넣어 주세요:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "여러분의-API키",
  authDomain: "여러분의-인증도메인",
  projectId: "여러분의-프로젝트ID",
  storageBucket: "여러분의-저장소버킷",
  messagingSenderId: "여러분의-메시징발신자ID",
  appId: "여러분의-앱ID",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
```

<div class="content-ad"></div>

# 3. 컨텍스트 API 구축:

ReactJS에서는 컨텍스트 API를 사용하여 컴포넌트 트리를 통해 데이터를 전달할 수 있습니다. 각 레벨에서 명시적으로 props를 전달할 필요 없이 데이터를 전달하는 방법을 제공합니다. 컨텍스트 API에는 두 가지 주요 구성 요소가 있습니다: 컨텍스트 제공자와 컨텍스트 소비자가 있습니다.

컨텍스트 제공자는 데이터를 트리 내의 다른 컴포넌트와 공유해야 하는 React 컴포넌트입니다. 이는 데이터의 진실의 원천 역할을 하며 해당 데이터를 사용할 수 있도록 만듭니다. 제공자는 컨텍스트를 생성하고 그것이 공유하려는 데이터를 지정하는 것이 책임입니다.

- 컨텍스트 생성: (UserAuthContext.js)

<div class="content-ad"></div>

```js
const userAuthContext = createContext();

export function useUserAuth() {
  return useContext(userAuthContext);
}
```

2. Provider 만들기: (UserAuthContext.js)

```js
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut, googleSignIn }}>
      {children}
    </userAuthContext.Provider>
  );
}
```

3. App을 Provider로 감싸기: (App.js)


<div class="content-ad"></div>

```js
<UserAuthContextProvider>
           내 앱
</UserAuthContextProvider>
```

컨텍스트 프로바이더는 여러 컴포넌트에서 필요로 하는 데이터가 있고 props를 수동으로 전달하는 것을 원치 않을 때 유용합니다. 데이터 공유를 간소화하고 코드베이스를 유지보수 가능하고 확장 가능하게 만듭니다. 그러나 컨텍스트를 과도하게 사용하면 복잡하고 관리하기 어려운 코드로 이어질 수 있습니다.

# 4. Firebase 함수 만들기:

이제 LogIn, SignUp, LogOut 및 googleSignIn 함수를 만들겠습니다. 여기서는 firebase.js 파일에서 만든 Auth 인스턴스를 사용할 것입니다.


<div class="content-ad"></div>

```js
 function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
```

onAuthStateChanged:

파이어베이스에서 onAuthStateChanged는 Firebase 인증 모듈에서 제공하는 메소드입니다. 이는 사용자의 인증 상태를 실시간으로 모니터링할 수 있는 리스너 함수입니다. 이 함수는 사용자 세션을 관리하고 응용 프로그램에서 관련 인증 로직을 처리하는 데 특히 유용합니다.

onAuthStateChanged 함수는 Firebase 인증 시스템에 옵저버를 등록하고 사용자의 인증 상태 변경을 듣습니다. 사용자가 로그인하거나 로그아웃하거나 인증 토큰이 만료될 때와 같이 사용자의 인증 상태가 변경될 때마다 콜백 함수를 트리거합니다.


<div class="content-ad"></div>

```js
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("인증 상태", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
```

# 5. 사용자 가입 작업중:

<img src="/assets/img/2024-05-01-ImplementingUserLoginandSignUpwithReactJSandFirebaseAComprehensiveGuide_1.png" />

여기서 먼저 부트스트랩을 사용하여 간단한 폼 UI를 만들겠습니다.

<div class="content-ad"></div>

이메일과 비밀번호에 대한 값은 각각 이메일(email)과 비밀번호(password)로 설정할 것입니다.

```js
<Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Control
        type="email"
        placeholder="이메일 주소"
        onChange={(e) => setEmail(e.target.value)}
    />
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Control
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
    />
</Form.Group>
```

회원가입 기능을 구현하기 위해 UserAuthContext.js 파일의 context API를 사용할 것입니다.

```js
const Signup = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useUserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };
```

<div class="content-ad"></div>

# 6. 유저 로그인 작업 중:

![User Login](/assets/img/2024-05-01-ImplementingUserLoginandSignUpwithReactJSandFirebaseAComprehensiveGuide_2.png)

회원가입과 완전히 같은 방식으로, 부트스트랩을 사용하여 이메일과 비밀번호 값을 설정하는 로그인 페이지를 디자인할 것입니다. 다만 회원가입 기능 대신 로그인 기능을 사용할 것입니다.

또한 Google 로그인을 위해 react-google-button을 사용하여 디자인할 예정입니다.

<div class="content-ad"></div>

```js
<GoogleButton className="g-btn" type="dark" onClick={handleGoogleSignIn} />
```

```js
const handleGoogleSignIn = async (e) => {
  e.preventDefault();
  try {
    await googleSignIn();
    navigate("/home");
  } catch (error) {
    console.log(error.message);
  }
};
```

# 7. 보호된 라우트:

ReactJS에서 보호된 라우트란 응용 프로그램의 경로 중 인증된 사용자만 액세스할 수있는 경로를 나타냅니다. 일부 응용 프로그램의 특정 부분에 대한 액세스를 제한하여 로그인에 성공한 사용자 만이 특정 페이지 또는 구성 요소를 볼 수 있도록합니다.

<div class="content-ad"></div>

ReactJS 애플리케이션에서 보호된 경로를 구현하는 방법에 대한 단계별 안내서가 있어요:

![이미지](/assets/img/2024-05-01-ImplementingUserLoginandSignUpwithReactJSandFirebaseAComprehensiveGuide_3.png)

App.js에서 `Home /`을 보호된 경로로 설정할 거에요,

```js
<Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
```

<div class="content-ad"></div>

그리고 PretectedRoute.js 파일에서는 사용자가 로그인했는지 여부를 확인하고, 로그인되지 않은 경우 로그인 페이지로 리디렉션합니다.

```js
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
```

이 포괄적인 기사에서는 ReactJS 애플리케이션에서 Firebase를 사용하여 인증하고 디자인하기 위해 Bootstrap을 사용하여 로그인 및 사용자 가입 기능을 구현하는 방법에 대해 탐구했습니다. ReactJS의 기본적인 이해가 있다고 가정하여 ReactJS 프로젝트 설정부터 Firebase 프로젝트 생성 및 Firebase 인증 구성에 이르기까지 모든 중요한 단계를 다루었습니다.

이 기사가 ReactJS 애플리케이션에서 견고한 로그인 및 사용자 가입 기능을 구현할 수 있는 지식과 자신감을 제공했기를 바랍니다. 여기서 제시된 단계를 따라가면 사용자의 전체 경험을 향상시키는 안전하고 사용자 친화적인 인증 시스템을 만들기 위한 준비가 충분히 갖춰집니다.

<div class="content-ad"></div>

행복한 코딩과 ReactJS 앱을 Firebase와 Bootstrap으로 멋지게 만드는 여정에 행운을 빕니다!

GitHub에서 소스 코드를 확인하세요.
