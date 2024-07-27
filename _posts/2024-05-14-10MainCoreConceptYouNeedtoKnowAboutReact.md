---
title: "리액트에 대해 꼭 알아야 할 10가지 핵심 개념"
description: ""
coverImage: "/assets/img/2024-05-14-10MainCoreConceptYouNeedtoKnowAboutReact_0.png"
date: 2024-05-14 10:45
ogImage: 
  url: /assets/img/2024-05-14-10MainCoreConceptYouNeedtoKnowAboutReact_0.png
tag: Tech
originalTitle: "10 Main Core Concept You Need to Know About React"
link: "https://medium.com/@payalpaul2436/10-main-core-concept-you-need-to-know-about-react-303e986e1763"
---


<img src="/assets/img/2024-05-14-10MainCoreConceptYouNeedtoKnowAboutReact_0.png" />

- React Js를 배워야 하는 이유

React의 가장 중요한 개념인 JSX, 클래스 및 함수 컴포넌트, 프롭스, 상태, 라이프사이클 메서드 및 훅에 대한 굳은 이해를 갖게 될 것입니다. 이러한 아이디어들을 React의 모듈식 프로그래밍 스타일로 결합할 수 있습니다.

저는 지금까지 React를 사용해왔습니다. 또한 사람들이 처음부터 배우도록 지도하는 훈련을 진행하고 있습니다. 매 훈련 세션마다 같은 개념 세트를 반복해서 설명하고 있다는 것을 알게 되었습니다. 제가 생각하기에 그 개념들은 React를 "구사하려면" 필수적입니다. 지금 학습 중이라면 이 글을 읽는 것에 관심이 있을 것입니다.



## 프레임워크가 아닙니다

Angular나 Ember는 이미 몇 가지 결정이 완료된 프레임워크입니다. React는 라이브러리일 뿐이며 모든 결정을 직접 내려야 합니다. React는 컴포넌트를 사용하여 사용자 인터페이스를 구축하는 데 도움을 주는 데에 중점을 둡니다.

2. JSX 내에서 표현식

JSX 내에서 중괄호를 사용하여 어떤 곳에서든 JavaScript 표현식을 포함할 수 있습니다.



## 중첩된 JSX 엘리먼트

```javascript
const myClasses = (
	<>
		<a href="https://www.payal.com">
			<h1>가입하기!</h1>
		</a>
	</>
);
```



아래 코드 블록에서 `a` 태그가 가장 바깥에 있는 요소여야 합니다.

JSX는 JavaScript의 구문 확장입니다. React DOM에서 렌더링되는 DOM 요소를 생성하는 데 사용됩니다.



JSX를 포함한 JavaScript 파일은 웹 브라우저에 도달하기 전에 컴파일해야 합니다. 아래 코드 블록은 컴파일이 필요한 일부 예제 JavaScript 코드를 보여줍니다.

3. React Virtual DOM

React를 사용하거나 배우고 있다면, "Virtual DOM"이라는 용어를 들어봤을 것입니다. 그렇다면 Virtual DOM은 무엇이고, React가 왜 사용하는 걸까요?

## Virtual DOM



가상 DOM의 개념이 중요한 이유입니다. 실제 DOM보다 훨씬 뛰어난 성능을 발휘합니다. 가상 DOM은 DOM의 가상 표현입니다. 애플리케이션의 상태가 변경될 때마다 실제 DOM이 아닌 가상 DOM이 업데이트됩니다.

가상 DOM이 훨씬 빠르고 효율적인 이유는 다음과 같습니다.

## 가상 DOM이 더 빠른 이유는 무엇인가요?

UI에 새로운 요소가 추가되면 트리로 표시되는 가상 DOM이 생성됩니다. 각 요소는 이 트리의 노드입니다. 이러한 요소 중 하나의 상태가 변경되면 새로운 가상 DOM 트리가 생성됩니다. 그런 다음이 트리는 이전 가상 DOM 트리와 비교됩니다("diffed").



이 작업이 완료되면 가상 DOM은 실제 DOM에 이러한 변경사항을 적용하는 최상의 방법을 계산합니다. 이를 통해 실제 DOM에 대한 작업이 최소화됩니다. 따라서 실제 DOM을 업데이트하는 성능 비용이 줄어듭니다.

아래 이미지는 가상 DOM 트리와 차이 비교 과정을 보여줍니다.

![가상 DOM 트리 및 차이 비교](/assets/img/2024-05-14-10MainCoreConceptYouNeedtoKnowAboutReact_1.png)

4. React는 어떻게 가상 DOM을 사용할까요?



이제 Virtual DOM이 무엇인지에 대한 이해가 어느 정도 되었으니, 어떻게 React가 가상 DOM을 활용하는지 알아보겠습니다.

React에서 모든 UI 조각은 컴포넌트이며, 각 컴포넌트는 상태를 가지고 있습니다. React는 관찰 가능한 패턴을 따르며 상태 변경을 감지합니다. 컴포넌트의 상태가 변경되면 React는 가상 DOM 트리를 업데이트합니다. 가상 DOM이 업데이트된 후, React는 현재 가상 DOM 버전을 이전 가상 DOM 버전과 비교합니다. 이 과정을 "diffing(차이 찾기)"이라고 합니다.

React는 어떤 가상 DOM 객체가 변경되었는지 알고 나면, 실제 DOM에서 해당 객체만 업데이트합니다. 이는 실제 DOM을 직접 조작하는 것과 비교했을 때 성능이 훨씬 우수합니다. 이로 인해 React는 고성능 JavaScript 라이브러리로 인정받게 되었습니다.

이러한 세부 사항은 React 개발자로부터 추상화되어 있습니다. 당신이 해야 할 일은 컴포넌트의 상태를 필요할 때 업데이트하고 나머지는 React가 처리하도록 하는 것뿐입니다. 이는 React를 사용할 때 우수한 개발자 경험을 보장합니다.



5. JSX에서 속성

JSX에서 속성을 지정하는 여러 가지 방법이 있습니다.

''. 예를 들어, 다음 JSX에서:

```js
<MyComponent foo={1 + 2 + 3 + 4} />
```



MyComponent에 대한 경우, props.foo의 값은 1 + 2 + 3 + 4가 평가되기 때문에 10이 될 것입니다.

자바스크립트에서 if 문과 for 루프는 표현식이 아니기 때문에 JSX에서 직접 사용할 수 없습니다. 대신 주변 코드에 넣을 수 있습니다. 예를 들어:

```js
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return <div>{props.number}는 {description} 숫자입니다</div>;
}
```

해당 섹션에서 조건부 렌더링 및 반복문에 대해 더 자세히 알아볼 수 있습니다.



프로퍼티에 값을 전달하지 않으면 true로 기본 설정됩니다. 다음 두 JSX 표현식은 동등합니다:

```js
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
```

일반적으로 프로퍼티에 값을 지정하지 않는 것을 권장하지 않습니다. 왜냐하면 ES6 객체 단축 구문인 'foo'가 'foo: foo' 대신 'foo: true'로 간주될 수 있기 때문입니다. 이 동작은 HTML의 동작과 일치하도록 만들어졌습니다.

6. ReactJS — 컴포넌트



이 장에서는 컴포넌트를 결합하여 앱을 유지보수하기 쉽게 만드는 방법을 배울 것입니다. 이 접근 방식을 통해 컴포넌트를 업데이트하고 변경할 수 있습니다. 페이지의 나머지 부분에 영향을 미치지 않으면서 컴포넌트를 업데이트하고 변경할 수 있습니다.

다음 예제에서 첫 번째 컴포넌트는 App입니다. 이 컴포넌트는 Header와 Content의 소유자입니다. 우리는 Header와 Content를 별도로 생성하고 App 컴포넌트의 JSX 트리 내에 추가하기만 하면 됩니다. 내보내기해야 하는 것은 App 컴포넌트뿐입니다.

```js
import React from 'react';
class App extends React.Component {
   render() {
      return (
         <div>
            <Header/>
            <Content/>
         </div>
      );
   }
}
class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>Header</h1>
         </div>
      );
   }
}
class Content extends React.Component {
   render() {
      return (
         <div>
            <h2>Content</h2>
            <p>컨텐츠 텍스트!!!</p>
         </div>
      );
   }
}
export default App;
```

## 7. Props 및 PropTypes React



Props와 PropTypes는 React 컴포넌트 간에 정보를 전달하는 중요한 메커니즘입니다. 이번에는 이에 대해 자세히 살펴보도록 하겠습니다. 이 튜토리얼에서는 props, props 전달 및 접근, 그리고 props를 사용하여 어떤 컴포넌트에 정보를 전달하는지에 대한 세부 사항을 소개할 것입니다. 그러나 props를 통해 받는 데이터를 PropTypes를 사용하여 유효성 검사하는 것은 항상 좋은 습관입니다. 따라서 React에서 PropTypes를 어떻게 통합하는지도 배우게 됩니다.

React는 props라고 불리는 것을 사용하여 컴포넌트에 정보를 전달할 수 있도록 합니다 (props는 properties의 약자). React는 여러 컴포넌트로 구성되어 있기 때문에, props를 사용하면 해당 정보가 필요한 컴포넌트 간에 동일한 데이터를 공유할 수 있습니다. 이는 단방향 데이터 흐름(부모에서 자식 컴포넌트로)을 사용합니다. 그러나 콜백 함수를 사용하면 자식 컴포넌트에서 다시 부모 컴포넌트로 props를 전달하는 것이 가능합니다.

이러한 데이터는 숫자, 문자열, 배열, 함수, 객체 등 다양한 형식으로 올 수 있습니다. 우리는 HTML 태그의 속성을 선언하는 것과 같이 어떤 컴포넌트에도 props를 전달할 수 있습니다. 아래 코드를 살펴보세요:

```js
<PostList posts={postsList} />
```



이 코드 스니펫에서는 'postsList' 값을 가진 posts라는 prop을 PostList라는 컴포넌트로 전달하고 있습니다. 데이터에 액세스하고 전달하는 방법을 알아봅시다.

8. React 앱의 성능 최적화

React가 등장한 이후로 프런트엔드 개발자들이 웹 애플리케이션을 구축하는 방식을 변화시켰으며, 가상 DOM은 컴포넌트를 효과적으로 렌더링하는 데 유명합니다. 이 튜토리얼에서는 React 애플리케이션의 성능을 최적화하는 다양한 방법과 성능을 향상시킬 수 있는 React의 기능에 대해 논의할 것입니다.

처음 렌더링 과정에서 React는 컴포넌트들의 DOM 트리를 구성합니다. 따라서 DOM 트리 내에서 데이터가 변경되면 변경에 영향을 받는 컴포넌트들만 다시 렌더링되도록 하고, 변경사항에 영향을 받지 않는 다른 컴포넌트들은 건너뛰도록 React에 요청합니다.



그러나 React에서는 모든 구성 요소를 다시 렌더링할 수 있습니다. 실제로 영향을 받은 구성 요소가 아닌 경우에도 모든 구성 요소를 다시 렌더링할 수 있습니다. 이는 더 오랜로딩 시간이 소요되고, 시간과 CPU 자원이 낭비될 수 있습니다. 이를 방지해야 합니다. 따라서, 우리는 최적화를 위해 노력할 곳입니다.

9. React에서의 상태

지금까지 정적 데이터가 구성 요소 트리를 통해 전달되는 정적 구성 요소에 대해서만 논의했습니다. 종종, 시간이 지남에 따라 상태가 변하는 상태지향 구성 요소를 만들어야 합니다.

아래에 표시되는 텍스트를 입력할 수 있는 "input"을 고려해 봅시다.



```js
const InputBox = React.createClass({
getInitialState () {
return {
text: ''
}
},
changeText (event) {
this.setState({text: event.target.value})
},
render () {
return (
<div>
<input type='text' onChange={this.changeText}
placeholder='text' value={this.state.text} />
<span>{this.state.text}</span>
</div>
)
}
})
```

우선, 컴포넌트의 기본 상태를 설정합니다. 이 경우에는 빈 텍스트 값을 갖고 싶습니다. 컴포넌트 메서드인 getInitialState()를 사용하여 컴포넌트를 위한 상태 객체를 반환해야 합니다.

상태를 업데이트하기 위해 onChange 이벤트에 changeText() 이벤트 핸들러가 할당됩니다. 상태를 업데이트하기 위해서는 내장된 setState() 메서드를 사용해야 합니다.

상태 업데이트는 예약되고 컴포넌트는 다시 렌더링됩니다. setState() 호출은 React에 대기 중인 상태 변경에 대해 알리기 위해 사용되어야 합니다. 변경 사항이 적용되도록 하기 위해 사용되므로 루프가 변경 사항을 추적하지 않습니다.




setState()은 비동기적으로 작동한다는 것을 기억해야 합니다. 결과가 즉시 반영되지 않을 수 있습니다. 아래 예시에서는 상태 변경 즉시 접근하는 나쁜 방법과 좋은 방법을 보여줍니다.

### 10. React Hooks

Hooks는 React 16.8 버전에서 소개된 새로운 기능입니다. 클래스를 작성하지 않고도 상태와 다른 React 기능을 사용할 수 있게 해줍니다. Hooks는 함수 컴포넌트에서 React 상태와 라이프사이클 기능에 "갈고리를 걸어" 사용하는 함수입니다. 클래스 내에서는 작동하지 않습니다.

Hooks는 하위 호환성이 있어서 기존의 React 개념을 대체하지 않고, 변경 사항이 없다는 것을 의미합니다.



함수 컴포넌트를 작성한 후에 상태를 추가하고 싶을 때는 이전에는 클래스로 변환하여 작업했지만, 지금은 기존 함수 컴포넌트 내에서 Hook을 사용하여 할 수 있습니다.

Hook은 JavaScript 함수와 비슷하지만 사용할 때 두 가지 규칙을 따라야 합니다. Hook 규칙을 따르면 컴포넌트의 상태 논리가 해당 소스 코드에 보이도록할 수 있습니다. 이 규칙은 다음과 같습니다:

- 반복문, 조건문 또는 중첩 함수 내에서 Hook을 호출하지 마십시오. React 함수의 최상위 수준에서만 Hook을 사용해야 합니다. 이 규칙은 Hook이 컴포넌트가 렌더링될 때마다 동일한 순서로 호출되도록 보장합니다.
- 일반 JavaScript 함수에서 Hook을 호출할 수 없습니다. 대신 React 함수 컴포넌트에서 Hook을 호출해야 합니다. Hook은 맞춤 Hook에서도 호출할 수 있습니다.



<img src="/assets/img/2024-05-14-10MainCoreConceptYouNeedtoKnowAboutReact_2.png" />

# 결론

이제 ReactJs의 핵심 개념을 배웠습니다. 이를 기반으로 조금 더 발전시키고 싶다면, 힘내세요! Cheers!