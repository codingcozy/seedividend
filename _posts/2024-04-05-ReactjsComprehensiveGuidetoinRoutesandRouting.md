---
title: "Reactjs에서 라우트와 라우팅 가이드"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Reactjs Comprehensive Guide to in Routes and Routing"
link: "https://medium.com/@kasareswapnil9/react-js-comprehensive-guide-to-in-routes-and-routing-5c7d3fe3cef7"
isUpdated: true
---

리액트.js는 사용자 인터페이스를 구축하는 강력한 라이브러리입니다. 그 중요한 기능 중 하나는 효율적으로 싱글 페이지 애플리케이션 (SPA)을 만들 수 있는 능력입니다. 루트 및 라우팅은 SPA를 구축할 때 중요한 구성 요소이며, 전체 페이지를 다시로드하지 않고 다양한 뷰 간을 이동할 수 있게 합니다.

이 안내서에서는 리액트.js에서 루트 및 라우팅에 대해 알아야 할 모든 것을 다룰 것입니다. 루트를 설정하는 방법, 루트 간을 이동하는 방법, 동적 라우팅을 처리하는 방법 등이 포함됩니다.

![React Router](/assets/img/ReactjsComprehensiveGuidetoinRoutesandRouting_0.png)

# 리액트 라우터를 사용하여 경로 설정하기

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

React.js 어플리케이션에서 라우트를 관리하기 위해 React Router라는 인기 있는 라이브러리를 사용합니다. React Router는 React 어플리케이션에서 라우팅을 정의하는 선언적인 방법을 제공합니다. 아래는 설정하는 방법입니다:

## 단계 1: React Router 설치하기

React Router는 npm 또는 yarn을 통해 설치할 수 있습니다.

```js
npm install react-router-dom
# 또는
yarn add react-router-dom
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

# 단계 2: 라우트 정의하기

설치가 완료되면 React Router에서 제공하는 BrowserRouter 및 Route 구성 요소를 사용하여 애플리케이션의 라우트를 정의할 수 있습니다. App.js 파일에서 라우트를 설정하는 방법의 예시입니다.

```js
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </div>
    </Router>
  );
}

export default App;
```

이 예시에서 세 가지 다른 컴포넌트(Home, About, Contact)에 대한 라우트를 정의했습니다. 각 컴포넌트는 해당 경로에 일치할 때 렌더링됩니다.

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

# 경로 간 이동

React Router는 경로 간 이동을 위한 다양한 컴포넌트와 훅을 제공합니다. 가장 일반적으로 사용되는 것은 Link와 useHistory입니다.

## Link 컴포넌트 사용하기

Link 컴포넌트는 전체 페이지를 다시로드하지 않고도 경로 간 이동을 할 수 있게 해줍니다. 아래 예시를 통해 어떻게 사용하는지 살펴보겠습니다.

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
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/contact">연락처</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
```

# useHistory 훅 사용하기

useHistory 훅을 사용하면 특정 이벤트나 사용자 조작에 반응하여 프로그래밍적으로 탐색할 수 있습니다. 다음은 예시입니다.

```js
import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  const handleClick = () => {
    history.push("/about");
  };

  return (
    <div>
      <h1>홈</h1>
      <button onClick={handleClick}>소개로 이동</button>
    </div>
  );
}

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

# 동적 라우트 처리하기

가끔은 URL의 일부가 변수인 동적 라우트를 처리해야 할 수도 있습니다. React Router를 사용하면 라우트 매개변수를 이용하여 이를 처리할 수 있습니다.

```js
<Route path="/user/:id" component={User} />
```

이 예시에서 :id는 라우트 매개변수로, useParams 훅을 사용하여 User 컴포넌트 내에서 접근할 수 있습니다.

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
import React from "react";
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();

  return (
    <div>
      <h1>User ID: {id}</h1>
    </div>
  );
}

export default User;
```

# 결론

Routes 및 라우팅은 React.js 애플리케이션을 구축하는 데 필수적인 개념입니다. React Router를 사용하면 경로를 쉽게 관리할 수 있어 SPA를 쉽게 만들 수 있습니다. 이 가이드에서 설명한 단계를 따라가면 React.js 프로젝트에서 경로를 설정하고 이동하며 동적 라우팅을 효과적으로 처리할 수 있습니다.
