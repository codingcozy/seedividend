---
title: "React 초보자를 위한 기본 개념"
description: ""
coverImage: "/assets/img/2024-05-12-Reactbasicconceptsforbeginner_0.png"
date: 2024-05-12 23:15
ogImage: 
  url: /assets/img/2024-05-12-Reactbasicconceptsforbeginner_0.png
tag: Tech
originalTitle: "React basic concepts for beginner"
link: "https://medium.com/@tim-lin/react-basic-concepts-for-beginner-77477a9731d5"
isUpdated: true
---




글을 쓰는 것은 제가 배운 것을 다시 상기시키는 데 도움이 돼요. 그럼 시작해볼까요!

리액트란? 웹페이지를 렌더링하는 데 도움이 되는 JavaScript 라이브러리

라이브러리인가요, 프레임워크인가요? 라이브러리는 필요할 때마다 즉시 구축하는 데 도움이 되는 일반적인 도구를 제공하고, 프레임워크는 사용자 정의할 수 있는 기본 청사진을 제공합니다. 리액트는 청사진보다는 도구 상자와 같아서 라이브러리에 속합니다.

왜 리액트를 사용해야 하나요? 간결한 코딩 스타일, 쉬운 코드 블록 재사용, 그리고 더 나은 로직 유닛 형성(업무 분리)이 가능합니다.



```js
// 단계 정의, 명령형, DOM 스타일
let btn = document.querySelector('button');

if (user.isLoggedIn){
  button.textContent = '계속하기'
}
else {
  button.textContent = '로그인'
}
document.body.append(btn);
```

```js
// 목표 정의, 선언형, React-Dom 스타일
let content;
if (user.isLoggedIn){
  content = <button>계속하기</button>
}
else {
  content = <button>로그인</button>
}
return content;
```

리액트의 네 가지 개념: JSX, 컴포넌트, 프롭스, 상태. 이를 분해하여 이해해봅시다.

JSX는 자바스크립트 문법 확장으로 HTML을 자바스크립트 코드에 포함할 수 있게 해줍니다.




```js
// Header.jsx에 저장
export default function Header() {
  return (
    <header>
      <h1> 이것은 헤더에 속해 있습니다. </h1>
    </header>
  )
}
```

컴포넌트는 HTML 블록(React 레고)을 반환하는 함수입니다. 일반적으로 이러한 블록을 결합하여 웹페이지를 만듭니다.

```js
import Header from './Header.jsx'

export default function App() {
  return(
    <div>
      <Header />     // 컴포넌트
    </div>
  )    
}
```

Props는 사용자 정의 컴포넌트에 설정할 수 있는 속성입니다. 데이터가 컴포넌트 간에 흐를 수 있도록 하는 것이 목적입니다.




```js
function MyComponent(props){
  console.log(props.name); // appName
  console.log(props.age); // 777
}

function App(){
  return (
    <div>
      <MyComponent
        name="appName"
        age=777
      />
    </div>
  )
}
```

상태(State)는 두 가지 역할을 하는 React 후크입니다. 업데이트를 기다리고 웹페이지를 다시 렌더링합니다. 상태 후크가 필요한 이유는 React 컴포넌트가 내부적으로 시작할 때 한 번만 실행되고 나중에 업데이트되면 기본적으로 다시 렌더링되지 않기 때문입니다. 따라서 React에게 특정 정보나 상태가 변경되었음을 알리고 그것을 다시 렌더링하도록 전달할 방법이 필요합니다.

```js
// .jsx 형식으로 저장
import {useState} from "react"

const [getInfo, setInfo] = useState()

function handleInfo(newInfo) {
  setInfo(newInfo)
}

let info = <p>기본 정보</p>
if(getInfo) {
  info = getInfo
}

return (
  <CusButton onClick={() => handleInfo("CB가 클릭되었습니다")}> CB </CusButton>
  <div>
    {info}
  </div>
)
```

간단히 말하면, React는 주로 웹페이지 렌더링에 초점을 맞춘 자바스크립트 라이브러리입니다. JSX, 컴포넌트, 프롭스(props) 및 상태(State)라는 네 가지 필수 개념이 있습니다. JavaScript 문법 확장을 통해 관련 HTML/CSS/JS를 컴포넌트로 그룹화할 수 있습니다. 컴포넌트는 서로 통신하기 위해 프롭스를 포함하고, 마지막으로 상태(State)는 업데이트 시 컴포넌트를 다시 렌더링할 수 있게 합니다.
