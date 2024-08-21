---
title: "Reactjs 심층 분석 1  createElement와 jsx-runtime"
description: ""
coverImage: "/assets/img/2024-06-20-ReactjsDeepDive1createElementandjsx-runtime_0.png"
date: 2024-06-20 07:13
ogImage:
  url: /assets/img/2024-06-20-ReactjsDeepDive1createElementandjsx-runtime_0.png
tag: Tech
originalTitle: "React.js Deep Dive #1 — createElement and jsx-runtime"
link: "https://medium.com/@juliaazt/react-js-deep-dive-1-createelement-and-jsx-runtime-63c75882f7b0"
isUpdated: true
---

<img src="/assets/img/2024-06-20-ReactjsDeepDive1createElementandjsx-runtime_0.png" />

React는 사용자 인터페이스를 구축하기 위한 인기 있는 JavaScript 라이브러리로, 상호작용적이고 동적인 웹 애플리케이션을 만들기 위한 다양한 도구와 기능이 풍부합니다. React의 최신 버전(React 17부터)에서는 JSX 변환 방법이 크게 변경되었습니다. React 17에서 소개된 새로운 JSX 변환은 더 이상 React.createElement을 직접적으로 사용하지 않습니다. 대신, react/jsx-runtime 및 react/jsx-dev-runtime 패키지에서 jsx, jsxs, jsxDEV 등의 새로운 함수를 도입하였습니다. 이 글은 "React.js Deep Dive" 시리즈 중 첫 번째로, React.createElement, jsx-runtime을 사용한 새 버전 및 React 생태계에서의 역할을 탐구합니다.

이 새로운 변환 방법이 작동하는 방식에 대한 개요는 다음과 같습니다:

# React 17 이전

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

이전에는 JSX가 React.createElement 호출로 컴파일되었습니다. 예를 들어, 다음 JSX:

```js
function App() {
  return <div>My App</div>;
}

export default App;
```

백그라운드에서 JSX는 React.createElement 호출로 변환됩니다:

```js
function App() {
  return React.createElement("div", {
    children: "My App",
  });
}
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

# React 17버전 이후

새 JSX 변환 기능을 사용하면 같은 JSX 코드:

```js
function App() {
  return <div>My App</div>;
}

export default App;
```

다음으로 변환됩니다:

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
import { jsx as _jsx } from "react/jsx-runtime";
function App() {
  return /*#__PURE__*/ _jsx("div", {
    children: "내 앱",
  });
}
export default App;
```

개발 모드에서는 더 나은 디버깅 정보를 제공하기 위해 react/jsx-dev-runtime의 jsxDEV을 사용할 수 있습니다:

```js
function App() {
  return /*#__PURE__*/ (0, react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(
    "div",
    {
      children: "내 앱",
    },
    void 0,
    false,
    {
      fileName: _jsxFileName,
      lineNumber: 3,
      columnNumber: 5,
    },
    this
  );
}
```

# 왜 이 변화가 있었을까요?

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

새로운 JSX 트랜스폼에는 여러 가지 이점이 있습니다:

- 범위 내에서 React 사용량이 필요 없음: 새로운 트랜스폼을 사용하면 JSX를 사용하는 모든 파일 맨 위에 React를 가져오지 않아도 됩니다. 이는 코드를 간소화하고 보일러플레이트를 줄일 수 있습니다.
- 더 작은 번들 크기: 새로운 트랜스폼은 좀 더 최적화된 코드를 생성하기 때문에 조금 더 작은 번들 크기로 이어질 수 있습니다.
- 미래 지향적: 이 변경 사항은 React 생태계를 미래 개선과 최적화를 위해 준비시킵니다.

이 함수를 더 자세히 살펴보면 반환 값이 이와 같아야 합니다:

```js
{
  $$typeof: Symbol(react.element),
  type: "div",
  props: {children: 'My App'},
  key:null,
  ref:null,
  _owner: null,
  _store: {validated: false}
  _self: undefined
  _source: {
    fileName: '/my-app/src/App.tsx',
    lineNumber: 3,
    columnNumber: 5
  }
  [[Prototype]]: Object
}
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

자, 이제 반환된 각 속성을 자세히 살펴보겠습니다:

타입

전달한 요소의 유형입니다. HTML 태그나 React 컴포넌트를 나타내는 문자열일 수 있습니다. 위의 코드에서는 타입이 HTML 태그 div입니다.

프롭스

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

전달 된 props 중에서 ref 및 key를 제외한 항목들. 컴포넌트의 타입이 defaultProps 속성을 가지고 있다면, 누락되거나 정의되지 않은 props는 기본 값으로 설정됩니다.

ref

전달된 ref입니다. ref가 전달되지 않았다면, 이 속성은 null이 될 것입니다. Ref를 사용하면 DOM 노드에 직접 액세스할 수 있어 입력란에 초점을 맞추거나 스크롤 위치를 읽거나 DOM에 직접 액세스가 필요한 타사 DOM 라이브러리와 통합하는 등의 작업을 수행할 수 있습니다.

key

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

테이블 태그를 마크다운 형식으로 변경해주세요.

# 내부 메커니즘

전달된 키가 문자열로 강제 변환됩니다. 키가 전달되지 않았다면, 이 속성은 null이 될 것입니다.

중요한 점은 $$typeof, \_store, \_owner 및 \_self가 React에서 개발 시 사용되는 내부 메커니즘임을 알아두어야 합니다. 이들은 React 작동에 중요한 역할을 하지만, 애플리케이션 코드에서 사용되도록 의도된 것은 아닙니다.

$$
typeoff

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

React는 React 요소를 고유하게 식별하기 위해 $$typeof 속성을 사용합니다. 심볼을 초기에 사용한 선택은 다른 환경에서 전역 고유성을 보장하고 다른 라이브러리나 전역 범위의 코드와의 이름 충돌을 피하기 위한 욕구에서 비롯되었습니다.

_store

React 요소 객체의 _store 속성은 주로 개발 모드(__DEV__)에서 유효성 검사를 위해 사용됩니다. 이 속성에는 validated라는 단일 부울 속성이 포함되어 있습니다. 이 속성은 React 요소가 특정 규칙에 대해 유효성을 검사했는지 여부를 나타내는 플래그 역할을 합니다. 예를 들어, 요소가 목록의 일부이고 고유한 키 속성이 없는 경우, React의 유효성 검사 논리는 _store.validated를 false로 표시할 것입니다. 요소를 유효성을 검사한 후, React는 _store.validated를 true로 설정하여 요소가 검사되었고 해당 요소에 대해 추가 유효성 검사가 필요하지 않음을 나타냅니다.

_owner

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

React에서 _owner 속성은 구성 요소 인스턴스의 소유자를 추적하는 데 내부적으로 사용됩니다. 이것은 React의 조정 프로세스에 중요한데요, 여기서 구성 요소가 다시 렌더링해야 하는지 여부를 결정합니다. 부모 구성 요소가 렌더링되면, 해당 자식 구성 요소의 인스턴스가 생성됩니다. 이러한 각 자식 인스턴스는 _owner 속성을 통해 부모에 대한 참조를 가지게 됩니다. 이를 통해 React는 구성 요소의 계층 구조를 추적하고 상태 변경을 효율적으로 관리할 수 있습니다.

_self

React 요소의 _self 속성은 개발 모드 확인 및 최적화를 위해 React에서 사용되는 또 다른 내부 속성입니다. 이는 이벤트 위임 중에 원래 이벤트 대상을 저장하는 데 사용됩니다.

이벤트가 트리거될 때 React는 _self를 사용하여 이벤트의 원래 대상을 기억합니다.

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

_소스

리액트 요소에서 _소스 속성은 공식 리액트 문서나 표준 리액트 자원에서 직접적으로 문서화되지 않았습니다. 그러나 맥락을 고려하면, _소스는 리액트의 합성 이벤트 시스템 내에서 이벤트 원천 또는 소스를 내부적으로 추적하는 데 관련이 있을 수 있습니다.

# 결론

요약하면, 리액트는 React 17부터 도입된 새 JSX 변환에서 더 이상 React.createElement을 직접적으로 사용하지 않습니다. 대신, react/jsx-runtime(jsx, jsxs) 및 react/jsx-dev-runtime(jsxDEV)에서 함수를 사용합니다. 이 변경으로 JSX를 사용할 때 React를 가져와야 하는 필요성을 제거하고, 잠재적으로 더 작은 번들 크기를 갖게 하며, 미래의 향상을 대비합니다. 해당 기능을 이해함으로써 리액트의 작동 방식에 대해 보다 깊은 통찰을 얻을 수 있어서 효율적이고 효과적인 리액트 애플리케이션을 작성하는 능력을 향상시킬 수 있습니다. 다음 글에서는 가상 DOM을 탐험하고, 리액트가 렌더링 성능을 최적화하기 위해 어떻게 사용하는지 살펴볼 것입니다.

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

## 더 많은 통찰과 즐거운 코딩을 기대해 주세요!

참고 자료:

- React 문서: React 17: 새로운 JSX 변환
- Babel 문서: Babel: JSX 런타임
- Webpack 문서: Webpack: 모드 구성
$$
