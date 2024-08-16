---
title: "React-router를 사용하여 네비게이션 바 만들기"
description: ""
coverImage: "/assets/img/2024-05-12-Creatingnavbarusingreact-router_0.png"
date: 2024-05-12 20:08
ogImage: 
  url: /assets/img/2024-05-12-Creatingnavbarusingreact-router_0.png
tag: Tech
originalTitle: "Creating navbar using react-router"
link: "https://medium.com/@swati.sharma_216/creating-navbar-using-react-router-63c4e785c2d4"
isUpdated: true
---




안녕하세요 여러분! 어떻게 하고 계신가요?

여기서는 React 라우팅 모듈을 사용하여 React 네비게이션 바를 설정하는 방법에 대해 자세히 알아보겠습니다. 이 방법 외에도 다른 방법들이 있지만, 저는 이 방법을 선호합니다. 보다 간결하고 오류를 방지할 수 있기 때문이죠. 단계별로 진행해보겠습니다.

단계1

먼저 다음 명령어를 사용하여 React 앱을 설정할 것입니다:



여기에는 시스템에 최신 노드 버전이 설치되어 있어야 합니다.

단계 2

앱의 src 디렉터리 내에 컴포넌트 폴더를 만들고 다음과 같이 네비게이션 바에 표시할 세 개의 컴포넌트를 만드십시오.

![Creatingnavbarusingreact-router](/assets/img/2024-05-12-Creatingnavbarusingreact-router_0.png)



### 단계 3:

이제 리액트 라우터 라이브러리를 설치할 것입니다.

리액트 라우터는 리액트에서 경로 지정을 위한 표준 라이브러리입니다. 리액트 애플리케이션의 다양한 컴포넌트 뷰 간의 이동을 활성화하며, 브라우저 URL을 변경 가능하게 하고 UI가 URL과 동기화되도록 합니다.

기억해야 할 한 가지는 버전이 `6.3여야 한다는 것입니다. 이전 버전은 이 프로젝트에서 사용할 일부 자식 컴포넌트를 지원하지 않습니다.



![이미지](/assets/img/2024-05-12-Creatingnavbarusingreact-router_1.png)

### 단계 4

다음으로 할 일은 index.js에서 react-router-dom에서 BrowserRouter를 import하는 것입니다. 그런 다음, 우리가 만들어진 앱을 browserRouter로 감싸줄 것입니다. 우리의 index.js 파일은 다음과 같이 보일 것입니다:

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
```



5단계

이제 네비게이션 바 페이지를 만들어봅시다. 먼저, React Router DOM에서 Link 컴포넌트를 가져와야 합니다. Link는 다른 경로로의 링크를 생성하고 애플리케이션에서 탐색을 구현하는 데 사용됩니다. 네비게이션 바의 앵커 태그 역할을 하는데, 'to'를 사용하여 경로를 정의합니다('to'는 href와 유사합니다). 우리의 네비게이션 바는 다음과 같이 보여야 합니다:

```js
import React from 'react';
import {Link} from 'react-router-dom';

const Navbar=()=>{
    return (    
                <div className='navBar'>
                    <div className='stocks'>
                        <Link to="/">Stocks</Link>
                    </div>
                    <div className='favourites'>
                        <Link to="/favourites">Favourite</Link>
                    </div>
                    <div className='cart'>
                        <Link to="/cart">Cart</Link>
                    </div>
                </div>
    )

}

export default Navbar;
```

6단계



app.js로 이동하여 react-router-dom에서 Route 및 routes 컴포넌트를 가져옵니다. Routes 컴포넌트에는 모든 경로가 포함되어 있고, route는 선택할 수있는 개별 경로를 정의합니다. 우리의 app.js는 이렇게 보일 것입니다:

```js
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Stocks from './components/stocks';
import Favourites from './components/favourites';
import Cart from './components/cart';

function App() {
  return (
   <>
    <Navbar/>
      <div>
    <Routes>        
      <Route path="/"  element={<Stocks/>} />
      <Route path="/favourites"  element={<Favourites />}/>
      <Route path="/cart"  element={<Cart/>}/>
    </Routes>
    </div>
    </>
   
  );
}

export default App;
```

그런 다음 우리는 일치하는 경로를 사용하여 element로 컴포넌트를 정의합니다.

우와!!! 우리의 네비게이션 바가 사용할 준비가 되었습니다. 전체 코드는 GitHub에서 확인할 수 있습니다.