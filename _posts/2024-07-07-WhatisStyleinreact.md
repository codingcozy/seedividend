---
title: "React에서 스타일링 하는 방법은 무엇인가"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-07-07 21:18
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "What is Style in react?"
link: "https://medium.com/@goutam2606/what-is-style-in-react-886d58f6a016"
---


Styled component는 리액트를 위한 CSS-in-JS 스타일링 솔루션입니다.

이는 탬플릿 리터럴 사용하며, 자바스크립트 코드 내에서 단일 컴포넌트에 대한 스코프가 지정된 일반적인 CSS를 작성할 수 있습니다.

스타일 컴포넌트는 많은 기업에서 채용하고 있는 라이브러리로, 리액트 생태계에서 가장 많은 주목을 받는 라이브러리 중 하나입니다.

# 리액트를 스타일링하는 주요 방법은 주로 3가지가 있습니다.

<div class="content-ad"></div>

- 인라인 스타일링
- CSS 스타일 시트
- CSS 모듈

## 인라인 스타일링:

요소를 인라인 스타일 속성으로 스타일링하려면 값으로 자바스크립트 객체가 있어야 합니다.

```js
const Header = () =>{
return(
<>
<h1 style = {color:"red"}> Hello World </h1>
<p> Welcome to this Articles </p>
</>
);
}
const root = ReadDOM.createRoot(document.getElementById('root'));
root.render(<Header/>);
```

<div class="content-ad"></div>

JSX에서는 JavaScript 표현식을 중괄호로 묶어서 쓰며, JavaScript 객체도 중괄호를 사용하므로 위의 스타일링은 두 개의 중괘로 묶어써야 합니다.

```js
// backgroundColor 대신에 background-color를 사용하세요
const Header = () => {
  return (
    <>
      <h1 style={{ backgroundColor: "lightblue" }}>Hello</h1>
      <p>스타일 추가하기</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

JavaScript 객체

스타일링이 적용된 객체를 만들 수도 있습니다.

<div class="content-ad"></div>

```jsx
const Header = () => {
  const myStyle = {
    color: "white",
    fontFamily: "sans-serif",
    backgroundColor: "red"
  };

  return (
    <>
      <h1 style={myStyle}> Hello World </h1>
      <p> Object Styling </p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header/>);
```

## CSS Stylesheet

Write your CSS styling in a file with a .css extension and then import it into your application.

Create a file named App.css and add your CSS code inside it.

<div class="content-ad"></div>

```js
/* App.css */
body{
  background-color:#282c34;
  color:white;
  font-family: snas-sarif;
}
```

## CSS Modules

Your application can utilize CSS modules as another way to add styles.

CSS modules are beneficial for components that are placed in separate files.


<div class="content-ad"></div>

```css
/* my-style.module.css */
.heading {
  color: DogerBlue;
  font-family: sans-serif;
  text-align: center;
  padding: 40px;
}
```