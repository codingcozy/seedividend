---
title: "리액트에서 컴포넌트 만들기 단계별 안내"
description: ""
coverImage: "/assets/img/2024-06-20-AStep-by-StepGuidetoCreatingaComponentinReact_0.png"
date: 2024-06-20 05:51
ogImage: 
  url: /assets/img/2024-06-20-AStep-by-StepGuidetoCreatingaComponentinReact_0.png
tag: Tech
originalTitle: "A Step-by-Step Guide to Creating a Component in React"
link: "https://medium.com/@AryanVora/a-step-by-step-guide-to-creating-a-component-in-react-151c0d875ee2"
isUpdated: true
---




<img src="/assets/img/2024-06-20-AStep-by-StepGuidetoCreatingaComponentinReact_0.png" />

리액트는 사용자 인터페이스를 구축하는 인기있는 JavaScript 라이브러리입니다. 그 중요한 기능 중 하나는 구성 요소 기반 아키텍처입니다. 이를 통해 재사용 가능하고 모듈식 UI 요소를 만들 수 있습니다. 이 안내서에서는 처음부터 간단한 리액트 컴포넌트를 만드는 과정을 안내해 드리겠습니다. 이 튜토리얼을 마치면 리액트 애플리케이션에서 컴포넌트를 만들고 사용하는 방법에 대해 solide 이해를 얻게 될 것입니다.

## 단계 1: 리액트 프로젝트 생성하기

시작하기 전에 시스템에 Node.js와 npm(노드 패키지 관리자)가 설치되어 있는지 확인하세요. 이를 공식 웹사이트(https://nodejs.org/)에서 다운로드할 수 있습니다. 또한 이 튜토리얼에서 리액트 앱을 만들었다고 가정합니다. 아직 만들지 않았다면 Vite를 사용하여 리액트 앱을 설정하는 2분 튜토리얼을 따를 수 있습니다.

<div class="content-ad"></div>

## 단계 2: App.jsx 파일 비우기

이제 React 프로젝트가 설정되었으므로 첫 번째 컴포넌트를 만들어 봅시다. React에서 컴포넌트는 일반적으로 JavaScript 함수나 클래스로 정의됩니다. 이 예시를 위해 간단한 함수형 컴포넌트를 만들어 보겠습니다.

시작하기 위해 App.jsx 파일에서 예시 코드를 삭제한 후 다음과 같은 간단한 템플릿으로 대체해보겠습니다.

```js
// App.jsx

function App() {
  return (
    <div>
      <h1>React Component Tutorial</h1>
    </div>
  );
}

export default App;
```  

<div class="content-ad"></div>

## 단계 3: index.css에서 추가 스타일링 지우기

우리의 컴포넌트에 영향을 미치는 추가 스타일링이 없도록 하기 위해 index.css 파일을 열고 모든 내용을 삭제하세요. 걱정하지 마세요. 파일 자체는 향후 스타일링에 사용할 것입니다.

## 단계 4: 컴포넌트 폴더 생성

이제 src 디렉토리 내에 전용 컴포넌트 폴더를 만들어 프로젝트를 구성해봅시다. 이 폴더에는 모든 사용자 정의 React 컴포넌트가 들어갈 것입니다.

<div class="content-ad"></div>

## 단계 5: 컴포넌트 파일 생성하기

새로 만든 components 폴더 안에 MyComponent.jsx와 MyComponent.css라는 두 개의 파일을 만들어주세요. 이 파일들은 사용자 정의 컴포넌트에 사용될 것입니다. 다음 코드를 myComponent.jsx의 기본 코드로 사용할 수 있습니다:

```js
export default function MyComponent() {
  return (
    <div>
      <h1>첫 번째 컴포넌트</h1>
      <p>여기에 더 많은 컴포넌트가 들어갈 수 있습니다</p>
    </div>
  );
}
``` 

## 단계 6: App.jsx에 컴포넌트 추가하기

<div class="content-ad"></div>

이제 사용자 정의 컴포넌트(MyComponent)를 생성했으니 React 애플리케이션 내에서 렌더링하도록 App.jsx 파일에 통합해 보겠습니다. 아래 단계를 따라주세요:

- 프로젝트 내 App.jsx 파일을 열어주세요. 이미 열려 있지 않다면요.
- 파일 상단에 사용자 정의 컴포넌트를 가져와주세요. 컴포넌트를 찾기 위해 적절한 상대 경로를 사용해주세요.

```js
//App.jsx
//컴포넌트 가져오기
import MyComponent from "./components/MyComponent";
function App() {
  return (
    <div>
      <h1>React Component Tutorial</h1>
      <MyComponent /> {/* 이것은 사용자 정의 컴포넌트를 렌더링합니다 */}
    </div>
  );
}

export default App;
```

3. App.jsx 파일을 저장하세요.

<div class="content-ad"></div>

이러한 단계를 따라서 사용자 정의 구성 요소 MyComponent를 App.jsx 파일에 성공적으로 통합했습니다. React 애플리케이션을 실행하면 이제 App 구성 요소의 기존 콘텐츠와 함께 컴포넌트가 렌더링되는 것을 확인할 수 있을 것입니다.

# 파트 2: 컴포넌트에 속성 추가하기

이 튜토리얼의 이 파트에서는 React 컴포넌트에 속성을 추가하는 방법에 대해 탐색해보겠습니다. 속성을 추가하면 React 컴포넌트를 동적이고 유연하게 만들 수 있습니다. 속성을 사용하면 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하여 그들의 동작과 모양을 사용자 정의할 수 있습니다.

## 단계 1: 컴포넌트 수정하여 속성 수락하기

<div class="content-ad"></div>

MyComponent.jsx 파일을 열어보세요. 이전에 MyComponent 컴포넌트를 생성한 곳입니다. 이제 이 컴포넌트가 props를 받도록 만들기 위해, 컴포넌트의 함수 매개변수를 수정할 수 있습니다. 또한 prop-types를 설치하기 위해 npm install prop-types 명령을 실행해야 합니다.

```js
// components/MyComponent.jsx
import PropTypes from "prop-types";

export default function MyComponent(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
}

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
```

이 코드에서 MyComponent 함수의 매개변수로 props를 추가했습니다. 이제 컴포넌트가 props로 전달된 데이터를 받을 수 있습니다.

## 단계 2: Props와 함께 컴포넌트 사용하기

<div class="content-ad"></div>

지금, MyComponent를 사용할 App.jsx 파일로 되돌아가거나 사용하려는 곳으로 이동하세요. 정의한 프롭에 값을 제공하여 컴포넌트를 사용할 수 있습니다.

```js
// App.jsx
import MyComponent from './components/MyComponent';

function App() {
  return (
    <div>
      <h1>React 컴포넌트 튜토리얼</h1>
      <MyComponent title="사용자 정의 제목" description="사용자 정의 프롭을 가진 컴포넌트입니다." />
    </div>
  );
}

export default App;
```

이 코드에서는 MyComponent 컴포넌트를 사용하고 두 개의 프롭을 전달하고 있습니다: title과 description. 이 프롭 값을 원하는 대로 사용자 정의할 수 있습니다.

## 단계 3: 기본값 추가

<div class="content-ad"></div>

React 컴포넌트의 props에 기본값을 추가하려면 함수형 컴포넌트의 매개변수에서 기본 할당을 사용하거나 구조분해를 활용하여 기본값을 설정할 수 있습니다. 다음은 이를 하는 방법입니다:

```js
// components/MyComponent.jsx
import PropTypes from "prop-types";

export default function MyComponent(props) {
  const { title = "기본 제목", description = "기본 설명" } = props;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

MyComponent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
```

위 코드에서는 props 객체의 title 및 description에 기본값을 설정하기 위해 구조분해를 사용했습니다. 이렇게 하면 컴포넌트를 사용할 때 이러한 props가 제공되지 않은 경우, 각각 "기본 제목"과 "기본 설명"으로 기본값이 적용됩니다. 또한 defaultProps 선언에서 이러한 props에 대한 isRequired 유효성 검사를 제거하여 기본값이 있는 선택적 props로 설정했습니다.

## 단계 4: 스타일링 추가

<div class="content-ad"></div>

MyComponent.css 파일에서 컴포넌트를 스타일링하려는 요소들에 대한 CSS 클래스를 정의하세요. 이 튜토리얼에서는 컨테이너, 제목 및 설명 요소를 스타일링해보겠습니다.

```js
/* MyComponent.css */

.my-component-container {
  background-color: #f0f0f0;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 10px;
  text-align: center;
}

.my-component-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.my-component-description {
  font-size: 16px;
}
```

여기서 .my-component-container, .my-component-title 및 .my-component-description 세 가지 CSS 클래스를 정의했습니다. 원하는 대로 이 스타일을 사용자 정의할 수 있습니다.

이제 CSS 파일을 컴포넌트에 가져와 코드에 클래스를 적용해야 합니다.

<div class="content-ad"></div>

```js
// components/MyComponent.jsx
import PropTypes from "prop-types";
import "./MyComponent.css"; // CSS 파일을 가져옵니다

const MyComponent = (props) => {
  const { title = "기본 제목", description = "기본 설명" } = props;

  return (
    <div className="my-component-container">
      <h1 className="my-component-title">{title}</h1>
      <p className="my-component-description">{description}</p>
    </div>
  );
};

MyComponent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default MyComponent;
```

MyComponent.jsx 파일 내에서, 각각의 JSX 요소에 정의한 CSS 클래스를 className 속성으로 적용해보세요.

- className="my-component-container"는 외부 컨테이너 `div`에 스타일을 적용합니다.
- className="my-component-title"는 `h1` 요소에 스타일을 적용합니다.
- className="my-component-description"는 `p` 요소에 스타일을 적용합니다.

# App.jsx에서 MyComponent를 다중으로 사용하기  

<div class="content-ad"></div>

이제 App.jsx 파일 내에서 MyComponent의 여러 인스턴스를 사용해보겠습니다. 각 인스턴스에 대해 title 및 description props를 사용자 정의할 수 있습니다.

```js
// App.jsx
import MyComponent from "./components/MyComponent";

function App() {
  return (
    <div>
      <h1>React Component Tutorial</h1>

      {/* 첫 번째 MyComponent 인스턴스 */}
      <MyComponent title="사용자 정의 제목 1" description="설명 1" />

      {/* 두 번째 MyComponent 인스턴스 */}
      <MyComponent title="사용자 정의 제목 2" description="설명 2" />

      {/* 세 번째 MyComponent 인스턴스 */}
      <MyComponent title="사용자 정의 제목 3" description="설명 3" />
    </div>
  );
}

export default App;
```

이 코드에서는 서로 다른 title 및 description props를 가진 MyComponent의 세 인스턴스를 추가했습니다. 각 인스턴스에 대해 이러한 props를 사용자 정의하여 고유한 콘텐츠를 렌더링할 수 있습니다.

# 축하합니다!

<div class="content-ad"></div>

이 튜토리얼에서 React 컴포넌트를 만들고 사용하고 사용자 정의하는 방법을 배웠어요. 이것들은 상호작용하는 웹 애플리케이션을 개발하는 데 필수적인 구성 요소입니다. 컴포넌트 정의, props 전달 및 사용, 그리고 여러 개의 컴포넌트 인스턴스 생성 등 다양한 개념을 살펴보았어요. 이 지식을 바탕으로 React를 사용하여 더 복잡하고 동적인 사용자 인터페이스를 만들어나갈 수 있어요. 계속 연습하고 탐험하면 곧 능숙한 React 개발자가 될 거예요. 즐거운 코딩하세요!