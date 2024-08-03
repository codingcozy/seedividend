---
title: "React Props가 무엇인지 진짜 쉽게 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "React Props  The Animated Guide"
link: "https://reedbarger.medium.com/react-props-the-animated-guide-f401ce92f481"
---



<table>
  <tr>
    <th>예시</th>
    <th>설명</th>
  </tr>
  <tr>
    <td>ComponentDidMount</td>
    <td>컴포넌트가 처음으로 렌더링될 때 실행</td>
  </tr>
  <tr>
    <td>ComponentDidUpdate</td>
    <td>컴포넌트가 업데이트될 때 실행</td>
  </tr>
  <tr>
    <td>ComponentWillUnmount</td>
    <td>컴포넌트가 제거될 때 실행</td>
  </tr>
</table>

라이프사이클 메서드는 React 컴포넌트의 다양한 단계에서 실행되는 함수입니다. 언제 어떤 메서드를 사용해야 하는지 알고 있으면 React 애플리케이션을 더 잘 관리할 수 있습니다.

<div class="content-ad"></div>

# JavaScript 함수에 데이터 전달하는 방법

다음 JavaScript 함수가 잘못되어 있습니다. 이 함수를 사용하려고 하면 무슨 일이 일어날까요?

```js
function sum() {
  return a + b;
}

sum(); // Reference Error: a is not defined
```

![이미지](https://miro.medium.com/v2/resize:fit:1400/0*MjzLHJIBue3LqvKa.gif)

<div class="content-ad"></div>

만약 이 함수를 호출하면 “a is not defined”라는 참조 오류가 발생합니다.

아래와 같이 a와 b를 매개변수로 추가하고 두 개의 숫자를 전달해주는 것으로 이 문제를 해결할 수 있습니다.

```js
function sum(a, b) {
  return a + b;
}

sum(2, 2); // 4
```

<div class="content-ad"></div>

![image](https://miro.medium.com/v2/resize:fit:1400/0*BfPuSsS8eyUF2St4.gif)

이것이 자바스크립트 함수에 데이터를 전달하는 방법입니다. 그렇다면 React 컴포넌트에는 어떻게 데이터를 전달할까요?

# React 컴포넌트에 데이터 전달하는 방법

React 컴포넌트는 일반 자바스크립트 함수와 매우 비슷해 보입니다. 그러나 JS 함수와는 달리 React 요소(예: 버튼)를 반환하고 렌더링합니다.

<div class="content-ad"></div>

```js
function Button() {
  return <button>Click me</button>;
}
```

<img src="https://miro.medium.com/v2/resize:fit:1400/0*1onn3hVlLqUG0iey.gif" />

리액트 컴포넌트를 호출하여 해당 요소를 표시하려면 사용자 정의 HTML 요소처럼 사용하지만 JavaScript로 작성된 것처럼 사용합니다.

```js
function App() {
  return <Button />;
}

function Button() {
  return <button>Click me</button>;
}
```

<div class="content-ad"></div>

![image](https://miro.medium.com/v2/resize:fit:1400/0*kQ4W8yxFNwnWGub8.gif)

하지만 이렇게 호출될 때 함수에 데이터를 전달하는 방법은 무엇인가요?

이 HTML 유사 구문을 사용하여 사용자 정의 HTML 속성처럼 마음대로 데이터를 전달할 수 있습니다.

예를 들어, 버튼에 우리만의 사용자 정의 텍스트를 추가하려면 텍스트 속성을 추가하고 그 값을 일부 문자열로 설정할 수 있습니다.

<div class="content-ad"></div>

```js
function App() {
  return <Button text="⭐️" />;
}

function Button() {
  return <button>Click me</button>;
}
```

![Example](https://miro.medium.com/v2/resize:fit:1400/0*-v4TyOkONcLDH_Ih.gif)

리액트 세계에서, 이러한 사용자 정의 속성을 "prop"이라고 합니다.

우리는 우리의 컴포넌트에 원하는 만큼 많은 prop을 추가할 수 있습니다. 이들은 모든 JavaScript 데이터 유형이 될 수 있습니다.

<div class="content-ad"></div>

```js
function App() {
  return <Button text="⭐️" color="green" />;
}

function Button() {
  return <button>나를 클릭해봐</button>;
}
```

![이미지](https://miro.medium.com/v2/resize:fit:1400/0*Xu32NYTN-17n1hSO.gif)

만약 우리가 컴포넌트에 전달한 props를 사용하려고 한다면, 각각이 별도의 인수로 전달된다고 생각할 수 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/0*PkbojCpS9Ta9ogwX.gif)

<div class="content-ad"></div>

하지만 이 경우는 그렇지 않아요. 일반 JavaScript 함수와 달리, 이러한 모든 속성은 하나의 값으로 모두 모이는데, 이 값 자체가 객체입니다.

이 하나의 매개변수는 "props"로 참조되고 이름이 지정됩니다.

![props](https://miro.medium.com/v2/resize:fit:1400/0*7z3ed4qxD_lvp7T4.gif)

아무 이름을 지정할 수 있지만, 일반적으로 이 매개변수를 "props"로 지칭하는 것이 관습입니다. 왜냐하면 이것이 포함하는 것이 "props"라고 불리우면서, 이 컴포넌트로 전달된 모든 값들입니다.

<div class="content-ad"></div>

당신이 넘겨준 데이터를 컴포넌트 내부에서 중괄호로 사용할 수 있습니다.

```js
function App() {
  return <Button text="⭐️" color="green" />;
}

function Button(props) {
  return <button style={{ background: props.color }}>{props.text}</button>;
}
```

![image](https://miro.medium.com/v2/resize:fit:1400/0*Z4dTebIx9NGZlpor.gif)

<div class="content-ad"></div>

만약 컴포넌트가 작은 경우 유용한 패턴 중 하나는 프롭스(props) 객체를 구조 분해하는 것입니다.

파라미터에 중괄호를 추가하여 프롭스를 개별 변수로 구조 분해할 수 있어서 직접 사용할 수 있습니다.

```js
function App() {
  return <Button text="⭐️" color="green" />;
}

function Button({ color, text }) {
  return (
    <button style={ background: color }>
      {text}
    </button>
  );
}
```

![이미지](https://miro.medium.com/v2/resize:fit:1400/0*N08oUMcmAfDjQvvr.gif)

<div class="content-ad"></div>

# 🏆 프로 페셔널 React 개발자가 되어 보세요

React를 처음부터 끝까지 배울 수 있는 최고의 자원을 찾고 계신가요?

✨ 소개합니다: React 부트캠프

부트캠프에는 React로 성공을 이룰 수 있도록 도와주는 모든 자원이 제공됩니다:

<div class="content-ad"></div>

- 🕹️ 100개 이상의 실전 React 도전 과제
- 🎬 100개 이상의 심층 영상
- 🛠️ 4개 이상의 실제 Next.js 프로젝트
- 📄 10개 이상의 필수 React 치트시트
- 🥾 Next.js 미니 부트캠프 완료 (앱 라우터)
- 🖼️ 이 기사와 같은 애니메이션 비디오 시리즈 완료

아래를 클릭하여 React 부트캠프를 직접 체험해보세요.

![React Bootcamp](/assets/img/React-Props-—-The-Animated-Guide_11.png)

시작하려면 클릭하세요.
