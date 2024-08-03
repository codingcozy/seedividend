---
title: "리액트에서 자주 발생하는 5가지 에러들"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "5 Tricky Issues With React "
link: "https://medium.com/javascript-in-plain-english/5-tricky-issues-with-react-40a9d888b0b3"
---



<img src="/assets/img/5TrickyIssuesWithReact_0.png" />

리액트에서 렌더링 납치는 컴포넌트의 렌더링 프로세스를 가로채어 변형하는 기술입니다. 이 고급 전략을 사용하면 성능 최적화, 상태 관리, 오류 처리 등의 기능이 가능해집니다. 렌더링 납치를 숙달하려면 리액트의 라이프사이클 메소드와 내부 작업에 대한 심층적인 이해가 필요합니다.

# 일반적인 기술과 사용법:

- 고차 컴포넌트 (HOCs) 🎁: 원본 컴포넌트를 변경하지 않고 로깅, 권한 확인 또는 데이터 가져 오기와 같은 기능을 추가하기 위해 컴포넌트를 감싸십니다.
- 렌더 프롭스 🖌️: 함수 속성 내에서 컴포넌트의 렌더링 로직을 캡슐화하여 다양한 렌더 함수를 통해 렌더링 프로세스를 사용자 정의합니다.
- 컨텍스트 API 🔗: 컴포넌트 트리 전체에 데이터를 공유하여 렌더링을 조작하고 컴포넌트 간에 상태나 설정을 전달합니다.
- 훅스 🪝: 함수형 컴포넌트에서 상태 및 사이드 이펙트를 관리하여 컴포넌트 구조를 변경하지 않고 렌더링 로직을 조정합니다.
- 오류 경계 ⛑️: 자식 컴포넌트의 오류가 전체 앱을 크래시하지 않도록 오류를 우아하게 처리하여 방지합니다.

<div class="content-ad"></div>

# 예시: 📝

```js
class RenderPropComponent extends React.Component {
  render() {
    return this.props.render("안녕하세요, 렌더 프롭스!");
  }
}
```

```js
function App() {
  return <RenderPropComponent render={(text) => <div>{text}</div>} />;
}
```

# React Internationalization (i18n)으로 세계로 뻗어나가기 🌐

<div class="content-ad"></div>

React에서 국제화를 간편하게 처리할 수 있습니다. react-intl이나 react-i18next와 같은 타사 라이브러리를 사용하여 텍스트 관리와 번역을 단순화할 수 있어요.

# i18n 작업 단계: 🛠️

- 라이브러리 설치: 프로젝트에 국제화 라이브러리를 추가하려면 npm이나 yarn을 이용하세요:

```js
npm install react-intl
```

<div class="content-ad"></div>

- 로캘 설정하기: 사용자 선호 또는 구성 설정에서 현재 로캘을 결정하고, React의 Context를 활용하여 애플리케이션 전반에서 접근할 수 있게 합니다.
- 번역 파일: 지원되는 언어용으로 각각의 JSON 파일을 생성하며, 각 파일은 텍스트 번역의 키-값 쌍을 포함합니다.

# 예시: 🌍

```js
// en.json
{
  "welcome": "어플리케이션에 오신 것을 환영합니다!",
  "hello": "안녕하세요, {name}님!"
}
```

```js
import { FormattedMessage } from "react-intl";

function Greeting({ name }) {
  return (
    <div>
      <FormattedMessage id="welcome" />
      <FormattedMessage id="hello" values={name} />
    </div>
  );
}
```

<div class="content-ad"></div>

# React에서의 코드 분할 - 성능 향상하기 🚀

코드 분할은 앱 로드 시간을 줄이는 데 중요합니다. React는 코드를 작은 온디맨드 청크로 나누어 이 작업을 수행합니다.

# 코드 분할 방법: 🤹

- React.lazy() & Suspense: React.lazy()를 사용하여 컴포넌트를 동적으로 가져오고, 우아한 로딩을 위해 Suspense를 활용하세요.

<div class="content-ad"></div>

```js
const LazyComponent = React.lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

- Webpack의 동적 임포트: Webpack의 import() 함수를 사용하여 필요에 따라 컴포넌트 또는 모듈을 로딩합니다.

# React의 에러 바운더리 — 당신의 안전망 🛠️

React에서 에러 바운더리를 사용하여 컴포넌트 오류를 캐치하고 처리하며 전체 앱에 영향을 미치지 않습니다.

<div class="content-ad"></div>

# 구현 단계: 📚

- 에러 처리 경계 컴포넌트 생성: 에러 로깅을 위해 componentDidCatch 라이프사이클 메서드를 포함합니다.

```js
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, errorInfo) {
    // 에러 처리, 예를 들어 에러 메시지 기록이나 에러 보고 보내기
    console.error(error);
    console.error(errorInfo);
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      // 에러 메시지나 대체 UI 렌더링
      return <div>문제가 발생했습니다.</div>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
```

- 컴포넌트 감싸기: 잠재적으로 오류가 발생할 수 있는 컴포넌트 주변에 에러 경계를 사용하여 앱을 보호하세요.

<div class="content-ad"></div>

# React에서 Props가 변경 불가능한 이유 📍

React에서의 Props는 예측 가능하고 효율적인 데이터 흐름을 유지하기 위해 변경 불가능하게 설계되었습니다. 그 이유는 다음과 같습니다:

- 예측 가능성: 읽기 전용 Props는 컴포넌트의 동작을 더 잘 이해할 수 있게 만듭니다.
- 단방향 데이터 흐름: 데이터가 부모에서 자식 컴포넌트로 이동하도록 보장하여 상태 관리를 간단하게 합니다.
- 순수 기능성: 동일한 Props를 제공하면 일관된 렌더링을 생성하도록 컴포넌트를 장려합니다.

Props는 변경 불가능하지만 부모 컴포넌트는 새로운 prop 값 전달을 통해 자식 컴포넌트 업데이트를 일으킬 수 있습니다. 이를 통해 통신과 데이터 흐름을 유지할 수 있습니다.

<div class="content-ad"></div>

# 친절한 영어로 🚀

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 마지막으로:

- 작가를 클랩하고 팔로우해 주세요 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- 더 많은 컨텐츠: PlainEnglish.io
