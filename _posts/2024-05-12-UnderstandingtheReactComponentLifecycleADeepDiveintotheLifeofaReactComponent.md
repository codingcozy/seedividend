---
title: "React 컴포넌트 라이프사이클 이해하기 React 컴포넌트의 생애 과정을 깊숙히 파헤쳐보기"
description: ""
coverImage: "/assets/img/2024-05-12-UnderstandingtheReactComponentLifecycleADeepDiveintotheLifeofaReactComponent_0.png"
date: 2024-05-12 18:58
ogImage: 
  url: /assets/img/2024-05-12-UnderstandingtheReactComponentLifecycleADeepDiveintotheLifeofaReactComponent_0.png
tag: Tech
originalTitle: "Understanding the React Component Lifecycle: A Deep Dive into the Life of a React Component"
link: "https://medium.com/@arpitparekh54/understanding-the-react-component-lifecycle-a-deep-dive-into-the-life-of-a-react-component-74813cb8dfb5"
isUpdated: true
---




![image](/assets/img/2024-05-12-UnderstandingtheReactComponentLifecycleADeepDiveintotheLifeofaReactComponent_0.png)

세상에 있는 모든 것은 주기를 따릅니다. 식물이나 동물, 인간 모두가 그렇습니다. 그들은 태어나 성장하고 죽는 과정을 거침으로써 주기를 따르고 있습니다. React 컴포넌트 또한 주기를 따릅니다. 그들은 생성(마운트), 성장(업데이트), 그리고 소멸(언마운트)합니다. 이를 컴포넌트의 생명주기라고 부릅니다.

React 컴포넌트는 마운트, 업데이트, 언마운트의 세 가지 다른 단계를 가지고 있습니다. 각 단계마다 해당 컴포넌트의 생명주기에서 역할을 하는 특정 메서드가 있습니다. 이 메서드들은 클래스 기반 컴포넌트를 위한 것이며, 함수형 컴포넌트는 자체 생명주기 메서드를 가지고 있습니다.

이 글에서는 React 컴포넌트 생명주기와 각 단계별 다른 메서드에 대해 자세히 알아보게 될 것입니다.



위의 세 가지 단계를 이루는 메서드에 대해 자세히 알아봅시다.

![이미지](/assets/img/2024-05-12-UnderstandingtheReactComponentLifecycleADeepDiveintotheLifeofaReactComponent_1.png)

# 마운팅 단계

마운팅 단계는 새 컴포넌트가 생성되어 DOM에 삽입되는 시점을 의미하며, 간단히 말해 리액트 컴포넌트의 실제 생애가 시작되는 시점입니다. 이 단계는 한 번만 발생하며, 종종 "초기 렌더링"이라고도 불립니다. 이 단계를 통과하기 위해 네 가지 라이프사이클 메서드가 호출됩니다: constructor, static getDerivedStateFromProps, render, 그리고 componentDidMount.



![React Component Lifecycle](/assets/img/2024-05-12-UnderstandingtheReactComponentLifecycleADeepDiveintotheLifeofaReactComponent_2.png)

생성자 메서드는 마운팅 단계 중에 가장 먼저 호출되는 메서드입니다. 이 메서드는 주로 컴포넌트의 상태를 초기화하고 컴포넌트 내에서 사용할 이벤트 처리기 메서드를 바인딩하는 데 사용됩니다. 생성자 메서드는 컴포넌트가 초기화될 때 호출되지만 렌더링되기 전에 호출됩니다. 컴포넌트에서 상태를 사용하려면 생성자에서 props를 인수로 사용하여 super(props) 함수를 호출하는 것이 중요합니다.

초기화를 마친 후 호출되는 다음 함수는 static getDerivedStateFromProps()입니다. 이 메서드를 사용하면 컴포넌트가 속성 변경에 따라 상태를 업데이트할 수 있습니다. 이 메서드는 매우 드물게 사용되며 많은 오류를 일으킬 수 있으므로 주의해서 사용해야 합니다. 초보자로서는 필요 없고 사용을 피하는 것이 일반적인 규칙입니다.

이 메서드는 상태 값을 속성 값으로 수정하는 데 사용됩니다. static getDerivedStateFromProps() 메서드는 두 개의 인수(props 및 state)를 허용하고 객체를 반환하거나 변경이 필요하지 않은 경우 null을 반환합니다. 이러한 값은 메서드에 직접 전달되므로 클래스의 인스턴스(또는 클래스의 다른 부분)에 액세스할 필요가 없으므로 정적 메서드로 간주됩니다.



렌더 메소드는 클래스 기반 React 컴포넌트에서 유일하게 필요한 메소드입니다. getDerivedStateFromProps() 메소드 이후에 호출되며 실제로 모든 HTML을 렌더링하거나 삽입합니다.

일반적으로 렌더 메소드는 최종적으로 렌더링될 JSX를 반환하지만, 다른 값을 반환할 수도 있습니다. 렌더 메소드에서는 상태를 수정하거나 브라우저와 직접적인 상호작용을 할 수 없으며 렌더 메소드에서 HTTP 요청을 보내는 것과 같은 부수 효과도 일어낼 수 없습니다. HTML을 작성하는 것으로 생각해보세요. 물론 JSX 형태로요.

componentDidMount() 메소드는 컴포넌트가 처음으로 렌더링된 후 즉, 첫 번째 render() 사이클 이후 즉시 실행됩니다. 이 메소드는 API 호출과 같은 모든 네트워크 요청 처리 또는 응용 프로그램의 주요 구독을 설정하는 데 주로 사용됩니다. 일반적으로 componentDidMount()는 DOM 없이 수행 할 수없는 모든 설정을 수행하는 좋은 장소입니다.

저는 버튼을 클릭할 때 카운트를 업데이트하는 간단한 카운터 앱이 있습니다.



```js
import React from "react";

class ComponentDidMount extends React.Component {
    constructor(props) {
      super(props);
      console.log('Constructor called');
      this.state = {
        count: 0
      };
    }
  
    static getDerivedStateFromProps(props, state) {
      console.log('getDerivedStateFromProps called');
      return null;
    }
  
    componentDidMount() {
      console.log('componentDidMount called');
    }
  
    incrementCount = () => {
      this.setState(prevState => ({
        count: prevState.count + 1
      }));
    };
  
    render() {
      console.log('render called');
      return (
        <div>
          <h1>Counter App</h1>
          <p>Count: {this.state.count}</p>
          <button onClick={this.incrementCount}>Increment</button>
        </div>
      );
    }
  }
  
  export default ComponentDidMount
```

![image](https://miro.medium.com/v2/resize:fit:1200/1*q1GIAIm6PDfoe5F68vHrvA.gif)

이 예시에서, 내 콘솔은 비어있지만 페이지를 새로고침하면 앱이 다시 렌더링되어 몇 가지 콘솔 메시지가 표시됩니다. 다음은 설명입니다.

- 생성자가 호출되었음을 나타내는 콘솔 메시지가 처음으로 나타납니다. 또한 구성 요소의 상태를 0으로 설정된 count 속성으로 초기화합니다.
- getDerivedStateFromProps가 호출되었음을 나타내는 두 번째 콘솔 메시지입니다. 그러나 이 특정 예시에서는 null을 반환하므로 프롬프트에 기반한 상태 업데이트가 없음을 나타냅니다.
- 세 번째로 렌더 함수가 호출되었음을 나타내는 콘솔 메시지입니다. 모든 HTML을 렌더링하고 구성 요소의 상태에서 현재 카운트를 표시하며 incrementCount 메서드를 호출하는 onClick 이벤트 핸들러가 있는 버튼을 표시합니다.
- componentDidMount가 호출되었음을 나타내는 네 번째 콘솔 메시지입니다.
- "Increment" 버튼을 클릭하면 incrementCount 메서드가 상태를 업데이트하고 React 구성 요소 라이프사이클의 업데이팅 단계를 트리거합니다. 이 단계는 마운팅 단계와 분리된 단계이며 렌더 및 getDerivedStateFromProps와 같은 메서드를 포함합니다.



# 업데이트 단계

![이미지](/assets/img/2024-05-12-UnderstandingtheReactComponentLifecycleADeepDiveintotheLifeofaReactComponent_3.png)

업데이트 단계는 컴포넌트에 업데이트가 발생하거나 다시 렌더링될 때입니다. 이 단계는 프롭스나 상태가 업데이트될 때 트리거됩니다.

또한 다음 메서드를 포함하는 컴포넌트일 때도 트리거될 수 있습니다:



getDerivedStateFromProps(), shouldComponentUpdate(), render(), getSnapshotBeforeUpdate(), 그리고 componentDidUpdate().

getDerivedStateFromProps()와 render()는 이전에 다루어졌으므로, 이 섹션에서는 다른 세 가지 메서드에 초점을 맞춥니다.

이것도 또 다른 거의 사용되지 않는 라이프사이클 메서드입니다. 성능 최적화를 위해 특별히 사용됩니다. 이 메서드를 사용하면 컴포넌트가 프롭스나 상태의 변경으로 인해 업데이트 되어야 하는지 여부를 제어할 수 있습니다. 기본적으로 컴포넌트는 상태나 프롭이 업데이트되면 항상 다시 렌더링됩니다. 이 메서드는 컴포넌트가 업데이트되어야 하는지 여부를 결정하기 위해 true 또는 false를 반환할 수 있습니다. 또한 이 메서드는 nextProps와 nextState를 인수로 받기 때문에 항상 컴포넌트의 현재 프롭 및 상태 값을 비교할 수 있습니다.

getSnapshotBeforeUpdate() 메서드는 현재 업데이트의 변경 사항이 DOM에 적용되기 직전에 호출됩니다. 이 메서드에서 반환하는 값은 componentDidUpdate() 메서드의 세 번째 매개변수로 전달됩니다. 이 메서드는 render 메서드 이후에 호출되고 componentDidUpdate 이전에 호출됩니다. 또한 이것도 거의 사용되지 않는 메서드 중 하나입니다.



이 방법은 이 단계에서 마지막으로 호출되는 메서드입니다. 이전 방법과 마찬가지로 이전 props 및 state 값을 인수로받지만 반환값 getSnapshotBeforeUpdate()도 세 번째 인수로 받습니다(있는 경우).

일반적으로 이전 및 현재 props 및 state 값을 비교하는 조건에 따라 더 많은 fetch 요청을 만들기 위해 사용됩니다. 따라서 setState를 호출할 수 있지만 조건문 내에 있어야 합니다.

```js
import React from "react";

class UpdatingExample extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: 'John',
        changed: false
      };
      console.log('Constructor called');
    }
  
    static getDerivedStateFromProps(props, state) {
      console.log('getDerivedStateFromProps called');
      return null;
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      console.log('shouldComponentUpdate called');
      return true;
    }

    getSnapshotBeforeUpdate(nextProps, nextState) {
        console.log('getSnapshotBeforeUpdate called');
        return null;
    }
  
    componentDidUpdate(prevProps, prevState) {
      console.log('componentDidUpdate called');
    }
  
    changeName = () => {
      this.setState({
        name: 'Jane',
        changed:true
      });
    };
  
    render() {
      console.log('render called');
      return (
        <div>
          <h1>Updating Example</h1>
          <div>Name {this.state.changed ? <h3>{this.state.name}</h3>: <p>{this.state.name}</p>}</div>
          <button onClick={this.changeName}>Change Name</button>
        </div>
      );
    }
  }

  export default UpdatingExample
```

<img src="https://miro.medium.com/v2/resize:fit:1400/1*AkNuxR9njfksseB11gOdvA.gif" />



초기에 RenderingExample 컴포넌트가 렌더링되고 나중에 업데이트될 때, 다음과 같은 메서드 호출 순서가 발생하며 해당 메서드의 메시지가 콘솔에 출력됩니다:

1. 초기 렌더링:

   - constructor가 호출됩니다.
   
   - getDerivedStateFromProps가 호출됩니다.



- shouldComponentUpdate 가 호출됩니다.
- render 가 호출됩니다.

2. 업데이트:

- "이름 변경" 버튼이 클릭되면 changeName 이 호출되어 새 이름으로 상태가 업데이트됩니다.



- 변경 사항이 있을 경우 getDerivedStateFromProps가 다시 호출됩니다.

- shouldComponentUpdate가 다시 호출됩니다.

- 업데이트된 UI를 다시 렌더링하기 위해 render가 다시 호출됩니다.

- 구성 요소가 업데이트되었으므로 componentDidUpdate가 호출됩니다.



# 언마운팅 단계

언마운팅 단계는 React 컴포넌트의 라이프사이클에서 마지막 단계입니다. 이 단계는 컴포넌트가 DOM에서 제거되어 더 이상 렌더링되지 않거나 접근할 수 없는 상태를 가리킵니다. 이 단계에서 React는 컴포넌트 및 연결된 리소스가 DOM 트리에서 제대로 제거되도록 하기 위해 정리 작업을 수행합니다.

이는 컴포넌트가 더 이상 필요하지 않을 때, 부모 컴포넌트가 자식 컴포넌트를 포함하지 않고 다시 렌더링될 때 또는 애플리케이션이 다른 페이지나 뷰로 이동할 때와 같은 다양한 이유로 발생할 수 있습니다. 이 단계에는 하나의 메서드만 있습니다.

componentWillUnmount() 메서드는 컴포넌트가 DOM에서 제거되기 직전에 호출됩니다. 이 메서드를 사용하여 타이머를 취소하거나 이벤트 리스너를 제거하거나 마운팅 단계에서 설정한 데이터 구조를 제거하는 등 필요한 정리 작업을 수행할 수 있습니다. 모든 컴포넌트의 상태와 props이 파괴됩니다.



```js
import React from "react";

class Child extends React.Component {
    componentDidMount() {
      console.log('Component mounted');
    }
  
    componentWillUnmount() {
      console.log('Component unmounted');
    }
  
    render() {
      return (
        <div>
          <p>자식 컴포넌트 내용</p>
        </div>
      );
    }
  }

export default class UnmountingExample extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showComponent: true
      };
    }
    
    toggleComponent = () => {
      this.setState(prevState => ({
        showComponent: !prevState.showComponent
      }));
    };

    render() {
      return (
        <div>
          <h1>메인 컴포넌트</h1>
          {this.state.showComponent && <Child />}
          <button onClick={this.toggleComponent}>
            {this.state.showComponent ? '언마운트' : '마운트'}
          </button>
        </div>
      );
    }
}
```

아래는 출력 내용입니다,

<img src="https://miro.medium.com/v2/resize:fit:1400/1*KkomvSyjYradmjZ1G7f_wQ.gif" />

자식 컴포넌트는 언마운트될 컴포넌트를 나타냅니다. componentDidMount와 componentWillUnmount 라이프사이클 메소드를 포함하고 있습니다. 두 메소드에는 콘솔에 로그를 남기는 메시지가 포함되어 있습니다.



`UnmountingExample` 컴포넌트는 `showComponent` 상태에 따라 조건부로 `Child` 컴포넌트를 렌더링하는 부모 컴포넌트입니다. "Mount" 버튼을 클릭하면 `showComponent` 상태가 변경되어 `Child` 컴포넌트가 렌더링되거나 마운트해제됩니다.

위의 코드를 실행하면 다음과 같은 동작을 볼 수 있습니다:

1. 초기에는 `Child` 컴포넌트가 렌더링되고 콘솔에 "Component mounted" 메시지가 기록됩니다.

2. "Unmount" 버튼을 클릭하면 `Child` 컴포넌트가 마운트 해제되고 콘솔에 "Component unmounted" 메시지가 기록됩니다.



3. "Mount" 버튼을 다시 클릭하면 자식 컴포넌트가 다시 렌더링되고 "컴포넌트가 마운트됨" 메시지가 콘솔에 로깅됩니다.

# 결론

React에서 컴포넌트는 라이프사이클을 구성하는 세 가지 다른 단계에 진입할 수 있습니다. 이 단계는 마운트, 업데이트 및 언마운트입니다. 각 단계에는 라이프사이클 메서드가 호출되며, 이 메서드를 통해 컴포넌트의 프롭과 상태와 같은 다양한 내용에 대해 작업하거나 실제로 컴포넌트를 DOM에 마운트하는 것(render 메서드)이 가능합니다. 그러나 이러한 메서드는 클래스 기반 컴포넌트에만 해당됩니다.

읽어 주셔서 감사합니다!



만나서 반가워요 😊

# 참고 자료

참고 자료 1

참고 자료 2 



참고 3

표지