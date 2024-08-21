---
title: "React Router로 페이지 관리하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "React Router A step-by-step guide"
link: "https://medium.com/@luqmanshaban/react-router-a-step-by-step-guide-4c5ec964d2e9"
isUpdated: true
---

![React Router](/assets/img/ReactRouterAstep-by-stepguide_0.png)

# 소개

React Router는 React에서 동적인 싱글페이지 앱을 구축하는 데 필수적인 도구입니다. 웹 애플리케이션 내에서 네비게이션, 라우팅 및 사용자 상호 작용을 원활하게 관리할 수 있는 방법을 제공합니다. 이 글에서는 React Router의 기본 원리, 핵심 기능 및 React 애플리케이션에서 라우팅을 구현하는 방법을 살펴보겠습니다.

# React Router란 무엇인가요?

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

React Router은 React 애플리케이션에서 클라이언트 측 라우팅을 관리하는 인기 있는 라이브러리입니다. 이를 사용하면 기존 웹사이트처럼 느껴지는 복잡한 다중 페이지 웹 애플리케이션을 만들 수 있지만 내부적으로는 싱글 페이지 애플리케이션(SPAs)입니다. React Router를 사용하면 라우트를 정의하고 관리하여 사용자가 서버로부터 새 HTML 페이지를 요청하지 않고 애플리케이션의 다른 보기를 탐색할 수 있게 됩니다.

# 주요 개념

구현에 들어가기 전에 몇 가지 핵심 개념을 이해해 봅시다.

- 라우트(Route): 라우트는 URL과 컴포넌트 간의 매핑입니다. 사용자가 특정 URL을 방문할 때, React Router는 해당 컴포넌트를 렌더링합니다.
- 라우터(Router): 라우터는 라우팅 인프라를 제공하는 최상위 컴포넌트입니다. React Router에서 웹 애플리케이션에는 일반적으로 BrowserRouter를 사용하고 정적 사이트에는 HashRouter를 사용합니다.
- 중첩 라우트(Nested Routes): React Router를 사용하면 라우트를 중첩하여 컴포넌트의 계층 구조를 만들 수 있습니다. 이는 레이아웃 구조에 특히 유용합니다.
- 링크(Link): 링크 컴포넌트를 사용하면 애플리케이션의 상태를 유지하는 앵커와 유사한 요소를 생성하여 탐색을 가능하게 합니다.

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

# 구현

프로젝트에서 React Router를 사용하려면 다음 단계를 따라야 합니다:

- 설치: npm이나 yarn을 이용하여 React Router를 설치해주세요:

```js
npm install react-router-dom
```

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

### 2. 설정: index.js 파일을 열고 내용을 다음과 같이 수정해주세요:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// 앱에서 성능을 측정하려면 함수를 전달하여 결과를 기록하거나
// 또는 분석 엔드포인트로 보내세요. 더 알아보기: https://bit.ly/CRA-vitals
reportWebVitals();
```

### 3. 네비게이션 바 만들기: src 폴더에 Navbar.js 파일을 만들고 다음 코드를 추가해주세요:

```js
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
```

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

위 코드에서는 react-router-dom에서 Link를 가져와 웹 응용 프로그램의 다른 섹션으로 이동할 수 있도록 했습니다.

4. 페이지 만들기: 이제 Home, About 및 Contact 파일을 생성하세요. 파일 내에서 react 구성 요소를 만들고 각 파일에서 Navbar 구성 요소를 가져옵니다.

i. Home.js

```js
//Home.js
import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
```

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

ii. About.js

```js
//About.js
import React from "react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <h1>About</h1>
    </div>
  );
};

export default About;
```

iii. Contact.js

```js
//Contact.js
import React from "react";
import Navbar from "./Navbar";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <h1>Contact</h1>
    </div>
  );
};

export default Contact;
```

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

5. App.js에서 라우트 생성하기: App.js를 열고 react-router-dom에서 Routes, Route를 import하세요. 또한 Home, About, Contact 컴포넌트도 import하세요.

```js
//App.js
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

function App() {
  return <div className="App"></div>;
}

export default App;
```

div 요소 안에 다음을 추가하세요:

```js
<div className="App">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</div>
```

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

- Route 요소는 Routes로 묶여 있습니다.
- path는 해당 컴포넌트에 대한 URL 경로를 나타냅니다.
- element는 경로가 가리키는 컴포넌트를 설명합니다.

7. 애플리케이션 실행: 앱을 실행하면 네비게이션 링크가 동적으로 해당 페이지로 이동합니다.

# 결론

React Router는 React 애플리케이션의 클라이언트 측 라우팅을 관리하는 강력한 도구입니다. 이를 통해 네비게이션, 경로 매개변수, 중첩 경로 등을 다루어 심미적이고 동적인 사용자 경험을 만들 수 있습니다. 이 기사에서 안내된 단계를 따라 React Router를 시작하고, 매우 상호작용적이고 사용자 친화적인 싱글 페이지 애플리케이션을 구축할 수 있습니다.

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

GitHub 저장소

커뮤니티에 참여하려면 뉴스레터를 구독하여 정기 업데이트, 신선한 통찰, 그리고 독점 컨텐츠를 받아보세요.

소통해요:

- LinkedIn
- Twitter
- Instagram
- Facebook
- 웹사이트
