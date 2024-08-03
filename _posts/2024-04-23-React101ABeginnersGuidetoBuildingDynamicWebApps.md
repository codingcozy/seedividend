---
title: "React로 Dynamic Web Apps 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "React 101 A Beginners Guide to Building Dynamic Web Apps"
link: "https://medium.com/@tonylixu/react-101-a-beginners-guide-to-building-dynamic-web-apps-cbf70be32360"
---



![React](/assets/img/React101ABeginnersGuidetoBuildingDynamicWebApps_0.png)

# React이란?

React가 나오기 전에 프론트엔드 세계에서 개발의 새로운 지표를 만든 세 가지 주요 라이브러리/프레임워크가 있었습니다.

- 먼저 jQuery는 브라우저 호환성과 DOM 요소 조작 문제를 해결했습니다. 연쇄 메서드 API는 이후의 프론트엔드 프레임워크에 큰 영향을 끼쳤습니다.
- 그 다음으로 Knockout은 MVVM(Model-View-ViewModel) 아키텍처 개념을 소개했습니다. 이 개념은 데이터를 UI 뷰에 템플릿을 통해 매핑하여 DOM 조작을 크게 줄였습니다.
- 그리고 AngularJS가 나왔습니다. AngularJS는 MVVM을 기반으로 하고 있으며 양방향 데이터 바인딩을 소개했습니다. 데이터 변경이 자동으로 UI에 반영되고 UI 작업이 데이터를 역으로 업데이트했습니다. AngularJS는 HTML을 지시문(directives)으로 확장하여 템플릿 엔진의 유연성을 향상시켰으나, 많은 서버 측 프로그래밍 개념을 도입하고 약간의 성능 단점이 있어 학습 곡선이 가파른 것이 주요 단점으로 언급되었습니다.

<div class="content-ad"></div>

리액트는 사용자 인터페이스를 구축하기 위한 선언적이고 효율적이며 유연한 JavaScript 라이브러리입니다. 리액트 철학의 핵심은 짧고 독립적인 코드 조각을 복잡한 UI 인터페이스로 결합하는 것이며, 이러한 코드 조각을 "컴포넌트"라고합니다. 리액트는 MVC 프레임워크가 아니라 오히려 MVC에서 "V"에 가깝게, 사용자 상호작용 뷰에 중점을 둡니다.

리액트는 다음 섹션에서 논의할 세 가지 혁신적인 개념을 소개합니다:

- JSX: JavaScript를 사용하여 UI 및 상호작용을 표현하며, JavaScript의 유연성을 최대로 활용합니다.
- fx(props) = UI: 데이터를 이용해 UI를 제어하며, 단방향 데이터 흐름과 페이지 컴포넌트에 대한 함수 스타일 접근을 채택합니다.
- Virtual DOM: 서버와 클라이언트 모두에서 렌더링에 동일한 코드 세트를 사용하는 가상 DOM을 사용하여 프론트엔드 응용 프로그램의 SEO 문제를 해결합니다.

# 간단한 리액트 프로젝트 초기화

<div class="content-ad"></div>

다음 명령어를 사용하여 React 웹 프로젝트를 빠르게 초기화할 수 있습니다:

```js
$ npx create-react-app learn-react --template typescript
$ cd learn-react
$ npm start
```

npm start를 실행한 후에는 브라우저가 http://localhost:3000의 프로젝트 홈페이지를 엽니다.

<img src="/assets/img/React101ABeginnersGuidetoBuildingDynamicWebApps_1.png" />

<div class="content-ad"></div>

# React의 가상 DOM

React 프레임워크의 주요 장점 중 하나는 페이지 성능을 향상시키기 위해 가상 DOM을 생성하는 기능을 지원한다는 것입니다. 그런데 가상 DOM이 정확히 무엇인가요? 실제 DOM에 비해 가상 DOM의 개념은 상당히 오랫동안 존재해왔습니다.

일반적인 HTML 웹 페이지의 UI를 디자인할 때 디자이너들은 페이지 내에서 다양한 DOM 요소를 정의합니다. 이를 실제 DOM이라고 합니다. 일반적으로 페이지 내의 이러한 DOM 요소는 외관을 표시하고 데이터 변경을 처리하는 역할을 합니다. 외관의 변경이나 데이터 업데이트는 UI에 반영되어야 하며, 실제 DOM을 조작하여 이루어집니다. 예를 들어:

```js
<div id="app"></div>
<script>
    // 페이지에서 div 요소 가져오기
    let div = document.getElementById("app");

    // span 요소 생성
    let span = document.createElement("span");

    // h3 요소 생성
    let h3 = document.createElement("h3");
    // h3 요소의 inner HTML 설정
    h3.innerHTML = "테스트1";

    // p 요소 생성
    let p = document.createElement("p");
    // p 요소의 inner HTML 설정
    p.innerHTML = "테스트2";

    // h3와 p 요소를 span 요소에 추가
    span.appendChild(h3);
    span.appendChild(p);

    // span 요소를 div에 추가
    div.appendChild(span);
</script>
```

<div class="content-ad"></div>

그러나 이 접근 방식은 당연히 문제가 발생합니다. 복잡한 페이지 UI의 경우, 디자이너는 종종 실제 DOM 요소의 많은 수를 정의합니다. 이러한 실제 DOM 요소를 빈번하게 조작하면 성능이 상당히 저하되고 사용자 경험이 악화되는 경우가 발생하며, 이는 디자이너가 피하려고 노력하는 것입니다. 따라서 React 프레임워크는 빈번한 DOM 작업으로 인한 성능 하락을 완화하기 위해 가상 DOM 메커니즘을 도입함으로써 이 문제에 특히 주목합니다.

React DOM은 관련된 실제 DOM 요소를 결합한 컬렉션으로 작동하여 React의 가상 DOM 객체인 내재 객체 역할을 합니다. 이를 DOM 구성 요소의 모음으로 이해하는 것이 더 적절합니다. 결과적으로 React 프레임워크는 ReactDOM을 가상 DOM이라고 지칭합니다.

위의 DOM을 다시 작성한 것은 아래와 같습니다:

```js
<div id="react-div"></div>
<script type="text/babel">
    // 페이지에서 div 요소 가져오기
    let reactDiv = document.getElementById("react-div");

    // React.createElement를 사용하여 가상 DOM 요소 생성
    // React.createElement의 세 인수는 요소 이름, 빈 객체 및 객체 내의 콘텐츠를 나타냅니다
    const reactH3 = React.createElement("h3", {}, "테스트1");
    const reactP = React.createElement("p", {}, "테스트2");
    const reactSpan = React.createElement("span", {}, reactH3, reactP);

    // span을 div에 렌더링
    ReactDOM.render(reactSpan, reactDiv);
</script>
```

<div class="content-ad"></div>

# React 렌더링 메커니즘

React 프레임워크의 널리 퍼져있는 인기 요인 중 하나는 고유한 렌더링 메커니즘에 있습니다. React 렌더링 메커니즘에 대해 이야기할 때 중요한 것은 Diff 알고리즘을 자세히 살펴보는 것입니다. Diff 알고리즘은 React 렌더링 메커니즘을 지원하는 핵심 기술 중 하나입니다.

Diff 알고리즘의 핵심은 DOM 트리를 스캔하여 현재 상태와 이전 상태 간의 차이를 식별하는 것입니다. DOM 트리의 상태나 속성에 변경 사항이 있는 경우, React는 새 DOM 트리를 구성하고 수정된 부분을 식별하기 위해 이를 원본과 비교합니다. 이 접근 방식은 반복적이고 빈번한 DOM 작업을 피할 수 있어 페이지의 접근성을 향상시킵니다.

# React의 장점

<div class="content-ad"></div>

- 선언적 디자인: React는 선언적 패러다임을 채택하여 응용 프로그램을 쉽게 설명할 수 있습니다.
- 효율성: React는 DOM과의 상호 작용을 최소화하고 시뮬레이션함으로써 효율적입니다.
- 유연성: React는 잘 알려진 라이브러리나 프레임워크와 잘 통합됩니다.
- JSX 구문: JSX는 JavaScript 구문을 확장하여 JavaScript 실행 효율성을 크게 향상시킵니다.
- 컴포넌트 재사용성: React를 사용하여 컴포넌트를 작성하면 코드 재사용이 가능하며 대규모 프로젝트 개발에 유리합니다.
- 일방향 데이터 흐름: React는 일방향 반응형 데이터 흐름을 구현하여 중복 코드를 줄이고 전통적인 데이터 바인딩 방법과 비교하여 단순화합니다.

# JSX 이해하기

React 프로그램을 작성하기 전에 JSX를 이해하는 것이 중요합니다. JSX는 React에서 제공하는 JavaScript의 구문 확장으로, HTML과 유사한 마크업을 사용하여 JavaScript 파일 내에서 웹 페이지의 뷰와 상호 작용 논리를 표현할 수 있게 해줍니다.

예시:

```javascript
const element = <h1>Hello, world!</h1>;
```

<div class="content-ad"></div>

```js
<div className="container">
  <CustomComponent
    onClick={() => {alert('Hello')}
  >
    Hello {props.name}!
  </CustomComponent>
</div>
```

웹 페이지는 HTML 콘텐츠, CSS 스타일 및 JavaScript 상호작용으로 구성됩니다. 오랜 시간 동안 웹 개발자들은 이 세 가지 요소를 독립된 파일로 분리해 왔는데, 이는 사실 기술적 실행에 기반한 분류입니다.

전통적인 웹 페이지 콘텐츠는 주로 HTML에 의해 정의되며, JavaScript 로직은 장식으로 작용합니다. 그러나 현대적인 웹 페이지 상호작용이 증가함에 따라 JavaScript 로직에 의해 동적으로 생성된 콘텐츠가 페이지를 구성하는 경우가 많아졌습니다. 게다가 렌더링 로직은 다른 UI 로직과 본질적으로 결합되어 있습니다. 예를 들어, 이벤트 처리는 UI 내에서 바인딩되어야 하며, 상태가 변경될 때 UI 업데이트가 필요하며, 준비된 데이터는 UI 내에서 표시되어야 합니다.

따라서 React는 렌더링 로직과 HTML 태그를 JSX를 사용하여 통합합니다.

<div class="content-ad"></div>

![React101ABeginnersGuidetoBuildingDynamicWebApps_2](/assets/img/React101ABeginnersGuidetoBuildingDynamicWebApps_2.png)

이 방법을 통해 개발자들은 HTML 템플릿이나 JavaScript 렌더링 로직과 같은 기술적 구현에 집중하는 것이 아니라 사이드바나 폼과 같은 페이지 기능에 집중할 수 있습니다.

## JSX로 React 컴포넌트 작성하기

가장 간단한 React 컴포넌트는 JSX를 반환하는 함수로, HTML 태그처럼 중첩될 수 있습니다. React는 props를 활용하여 데이터를 컴포넌트로 전달하여 재사용성을 향상시킵니다.

<div class="content-ad"></div>

예를 들어:

```js
import React from "react";

// "Greeting"이라는 기능적 컴포넌트를 정의합니다.
const Greeting = (props) => {
  // 컴포넌트에 전달된 "name" prop에 접근합니다.
  const { name } = props;

  // 인사 메시지를 렌더링하기 위해 JSX를 반환합니다.
  return (
    <div>
      <h1>안녕, {name}님!</h1>
      <p>당사 웹사이트에 오신 것을 환영합니다.</p>
    </div>
  );
};

// Greeting 컴포넌트의 사용 예시
const App = () => {
  return (
    <div>
      {/* Greeting 컴포넌트를 렌더링하고 "name" prop을 전달합니다. */}
      <Greeting name="John" />
      <Greeting name="Jane" />
    </div>
  );
};

export default App;
```

위 예시에서는 "name" prop을 수용하는 Greeting이라는 기능적 컴포넌트를 정의했습니다. 컴포넌트 내에서는 prop으로 전달된 이름을 포함한 인사 메시지를 렌더링하기 위해 JSX를 사용합니다. 그런 다음 App 컴포넌트에서는 서로 다른 이름을 prop으로 전달하여 Greeting 컴포넌트를 두 번 렌더링합니다.

## 기본 JSX 규칙

<div class="content-ad"></div>

React 컴포넌트에는 몇 가지 규칙이 있어요:

- 컴포넌트 이름은 PascalCase(대문자로 시작)를 사용합니다. 이렇게 하면 HTML 기본 태그(div, p, a 등)와 구별됩니다.

```js
import React from "react";

// PascalCase를 사용하여 함수형 컴포넌트 "MyComponent"를 정의합니다
const MyComponent = () => {
  return (
    <div>
      <h1>Hello, from MyComponent!</h1>
      <p>This is an example of PascalCase component.</p>
    </div>
  );
};

// MyComponent 컴포넌트 사용 예시
const App = () => {
  return (
    <div>
      {/* MyComponent 컴포넌트 렌더링 */}
      <MyComponent />
    </div>
  );
};

export default App;
```

- 컴포넌트는 설정 가능한 속성을 노출하기 위해 하나의 매개변수인 props만을 수용합니다. 자식 컴포넌트는 React에서 children prop을 통해 주입됩니다.

<div class="content-ad"></div>

```js
import React from "react";

// "ParentComponent"이라는 기능 컴포넌트를 정의합니다.
const ParentComponent = (props) => {
  // 컴포넌트로 전달된 "name" prop에 접근합니다.
  const { name } = props;

  return (
    <div>
      <h1>안녕하세요, {name}님!</h1>
      {/* React에 의해 주입된 자식 컴포넌트를 렌더링합니다. */}
      <ChildComponent />
    </div>
  );
};
```

- Props는 컴포넌트 내에서 읽기 전용이며 내부적으로 수정할 수 없습니다.
- 루트 노드 요구 사항: 위의 간단한 데모에서 보여준 것처럼 JSX는 루트 노드가 필요합니다. 여러 형제 엘리먼트가 부모 노드를 가지지 않더라도 가상 노드로 감싸야 합니다. Markdown양식 나타냄

# 결론

<div class="content-ad"></div>

확실한 것은, React는 프런트엔드 개발 분야에서 강력한 존재로 떠오르며, 개발자들에게 수많은 혜택을 제공합니다. 그 인기만큼이나 중요한 것은, 기술 산업에서 일하는 곳에서 원하는 필수 기술이 되어버렸다는 점이죠. React를 둘러싼 거대한 커뮤니티는 지원과 안내를 제공하며, 프로젝트 개발을 신속하게 진행할 수 있는 다양한 도구와 라이브러리를 제공합니다.

React를 사용하면, 개발자들은 동적이고 반응적인 사용자 인터페이스를 쉽게 만들 수 있는 강력한 생태계에 액세스할 수 있습니다. 선언적인 특성으로 어플리케이션 개발 프로세스를 간소화하여, 개발자들은 이루고자 하는 목표에 더 집중할 수 있게 됩니다.

게다가, React 컴포넌트의 모듈식 특성은 코드 재사용성을 촉진하여, 확장 가능하고 유지보수가 용이한 코드베이스를 만드는 데 도움을 줍니다. 이는 개발을 더욱 간소화할 뿐만 아니라, 컴포넌트들이 프로젝트 간에 원활하게 공유되고 통합되어 팀원 간의 협업을 촉진합니다.

요컨데, React의 다재다능함, 효율성, 그리고 강력한 커뮤니티 지원은 현대적이고 고성능의 웹 애플리케이션을 개발하려는 개발자들에게 없어서는 안 될 필수 도구입니다. 경력이 풍부한 개발자든 초보든, React를 숙달함으로써, 전례 없는 가능성의 세계가 열리며, 프런트엔드 개발의 변화무쌍한 지형에서 당신의 경력을 도약시킬 수 있습니다.

<div class="content-ad"></div>

# 참고 자료

- Egghead — 바쁜 웹 개발자를 위한 간결한 풀스택 코스. 고품질 비디오 강좌 및 정교하게 선별된 학습 자료.
- Epic React — React 및 그 API에 대한 가장 상세한 코스.
- Codecademy — 구체적인 예제를 통해 프로그래밍을 가르치는 웹 플랫폼입니다.
