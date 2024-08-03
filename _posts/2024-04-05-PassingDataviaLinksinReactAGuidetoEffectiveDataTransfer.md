---
title: "React에서 링크를 통해 데이터 전달하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Passing Data via Links in React A Guide to Effective Data Transfer"
link: "https://medium.com/@hammadrao891/passing-data-via-links-in-react-a-guide-to-effective-data-transfer-1e0b030e2a12"
---



리액트에서 컴포넌트 간에 데이터를 전달하는 것은 일반적인 작업이며 다양한 방법으로 수행할 수 있습니다. 가장 간단한 방법 중 하나는 링크를 사용하는 것입니다. 리액트 라우터를 이용해 생성된 링크를 통해 서로 다른 컴포넌트 간을 원활하게 이동하면서 데이터를 전달할 수 있습니다. 이 글에서는 리액트 애플리케이션에서 링크를 통해 데이터를 효과적으로 전달하는 방법을 살펴보겠습니다.

1. 리액트 라우터 이해:

리액트 라우터는 리액트 애플리케이션에서 네비게이션을 처리하기 위한 인기 있는 라이브러리입니다. 특정 URL에 접근할 때 렌더링되는 라우트와 컴포넌트를 정의할 수 있습니다. 링크를 통해 데이터를 전달하는 작업을 시작하려면 프로젝트에 리액트 라우터를 설치해야 합니다.

```js
npm install react-router-dom
```

<div class="content-ad"></div>

2. 라우트 설정하기:

링크를 통해 데이터를 전달하려면 먼저 애플리케이션에서 라우트를 설정해야 합니다. 일반적으로 `App.js`라고 불리는 주요 컴포넌트에서 필요한 모듈을 가져와 React Router에서 제공하는 `Route` 컴포넌트를 사용하여 라우트를 정의하세요.

```js
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import OtherComponent from "./components/OtherComponent";

function App() {
  return (
    <Router>
      <Link to="/other">다른 컴포넌트로 이동</Link>
      <Route exact path="/" component={Home} />
      <Route path="/other" component={OtherComponent} />
    </Router>
  );
}

export default App;
```

3. 링크를 통한 데이터 전달:

<div class="content-ad"></div>

React Router에서는 `Link` 컴포넌트의 `to` prop을 사용하여 링크와 함께 데이터를 전달할 수 있어요. `to` prop은 pathname과 전달하고 싶은 데이터가 포함된 상태 객체가 될 수 있어요.

```js
import React from 'react';
import { Link } from 'react-router-dom';
function Home() {
 const dataToPass = { name: 'John Doe', age: 25 };
return (
 <div>
 <h1>홈 컴포넌트에 오신 것을 환영합니다</h1>
 <Link to={ pathname: '/other', state: dataToPass }>다른 컴포넌트로 이동</Link>
 </div>
 );
}
export default Home;
```

4. 목적지 컴포넌트에서 데이터 받기:

링크에서 전달된 데이터에 액세스하려면 목적지 컴포넌트에서 `location` prop을 사용할 수 있어요. 데이터는 `location` prop의 `state` 객체에 사용할 수 있어요.

<div class="content-ad"></div>

```js
import React from "react";
function OtherComponent(props) {
  const { state } = props.location;
  const { name, age } = state;
  return (
    <div>
      <h1>다른 컴포넌트에서 안녕하세요</h1>
      <p>이름: {name}</p>
      <p>나이: {age}</p>
    </div>
  );
}
export default OtherComponent;
```

결론:

React 애플리케이션에서 링크를 통해 데이터를 전달하는 것은 상태를 유지하고 컴포넌트간 정보를 공유하는 강력한 방법입니다. React Router는 내비게이션 및 데이터 전송을 처리하는 간단한 메커니즘을 제공하여 이 과정을 간소화합니다. 이 글에서 안내된 단계를 따라 React 프로젝트에서 링크를 통해 데이터를 효과적으로 전달하여 보다 동적이고 상호작용적인 사용자 경험을 만들어낼 수 있습니다. 즐거운 코딩하세요!```
