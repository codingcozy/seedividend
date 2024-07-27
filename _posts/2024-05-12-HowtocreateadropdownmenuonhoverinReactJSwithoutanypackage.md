---
title: "React JS를 사용하여 어떤 패키지도 사용하지 않고 호버 시 드롭다운 메뉴를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtocreateadropdownmenuonhoverinReactJSwithoutanypackage_0.png"
date: 2024-05-12 20:22
ogImage: 
  url: /assets/img/2024-05-12-HowtocreateadropdownmenuonhoverinReactJSwithoutanypackage_0.png
tag: Tech
originalTitle: "How to create a dropdown menu on hover in React JS without any package"
link: "https://medium.com/how-to-react/how-to-create-a-dropdown-menu-on-hover-in-react-js-without-any-package-b16b2f76db71"
---


<img src="https://miro.medium.com/v2/resize:fit:796/1*AXro4l-eefcJcsCr40yw2w.gif" />

React에서 외부 패키지를 사용하지 않고 호버 시 드롭다운 메뉴를 만들려면 다음 단계를 따를 수 있습니다:

단계 1: React 프로젝트 설정

아직 React 프로젝트를 설정하지 않은 경우 터미널에 아래 명령을 붙여넣어 새로운 프로젝트를 만들어야 합니다.



```js
npx create-react-app dropdown-menu
```

단계 2: 드롭다운 컴포넌트 생성

프로젝트 디렉토리 내에 DropdownMenu이라는 이름의 컴포넌트를 생성하고 아래 코드를 붙여넣으세요.

```js
import React from "react";

const DropdownMenu = () => {
  return (
    <div className="dropdown-menu">
      <ul>
        <li>메뉴 1</li>
        <li>메뉴 2</li>
        <li>메뉴 3</li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
```



위의 코드에서는 호버 시에 표시되는 간단한 메뉴를 생성하고 있습니다.

단계 3: 드롭다운 컴포넌트 가져오고 이벤트 처리하기

당신의 주요 컴포넌트(App.js 등)에서 DropdownMenu 컴포넌트를 가져오고 호버 이벤트를 처리해보세요.

```js
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import "./App.css";

function App() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div
          className="menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button>Dropdown Menu</button>
          {/* <DropdownMenu /> */}
          {isDropdownVisible && <DropdownMenu />}
        </div>
      </header>
    </div>
  );
}

export default App;
```



위의 코드에서 App 컴포넌트는 사용자가 요소 위로 마우스를 올리면 true로 설정되는 상태 변수 isDropdownVisible을 관리하며, 마우스가 요소를 벗어나면 false로 설정됩니다. handleMouseEnter 및 handleMouseLeave 함수는 상태를 적절히 업데이트하는 데 사용됩니다.

단계 4: 스타일 추가

이제 드롭다운 컴포넌트에 일부 스타일을 추가하세요. 아래 CSS를 App.css 파일에 붙여넣기만 하면 됩니다.

```js
header {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  background: #000;
  box-shadow: 0px 10px 30px 0px rgba(82, 63, 105, 0.05);
  color: #fff;
  padding: 12px 25px;
  border: none;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: unset;
  margin: unset;
}

li {
  padding: 14px;
  transition: all linear 0.3s;
}

li:hover {
  background: gray;
  cursor: pointer;
  color: #fff;
}

.dropdown-menu {
  background: #fff;
  box-shadow: 0px 10px 30px 0px rgba(82, 63, 105, 0.05);
  transition: all linear 0.3s;
}
```



오늘은 여기까지입니다. 아래에서 GitHub 저장소와 Codesandbox 데모를 확인하실 수 있어요.

궁금한 점이 있으시면 LinkedIn을 통해 연락해주세요.