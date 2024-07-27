---
title: "리액트에서의 의존성 주입"
description: ""
coverImage: "/assets/img/2024-05-12-DependencyinjectioninReact_0.png"
date: 2024-05-12 21:18
ogImage: 
  url: /assets/img/2024-05-12-DependencyinjectioninReact_0.png
tag: Tech
originalTitle: "Dependency injection in React"
link: "https://medium.com/itnext/dependency-injection-in-react-6fa51488509f"
---


리액트 컴포넌트에는 비즈니스 로직이 포함되어서는 안 된다고 생각하시나요? 만약 그렇다면 계속 읽어주세요. 아니라면 지금 멈추세요. 이 기사는 다른 사람을 위한 것입니다.

## TL; DR;

리액트 프로젝트에 의존성 주입을 3단계로 추가해보세요:

- 의존성을 넣을 "컨테이너"를 만드세요
- 의존성을 검색하는 hook useInject를 만드세요
- 컴포넌트에서 해당 훅을 사용하세요



## 상세 버전

답안이 망설여진다면, 이유에 대해 몇 가지 통찰을 제공해 드리겠습니다:

- React는 사용자 인터페이스를 만들기 위한 라이브러리입니다; 이 정의를 통해 컴포넌트에 비즈니스 로직을 넣지 말아야 한다는 것을 알 수 있습니다.
- 비즈니스 로직을 포함하는 컴포넌트는 읽기, 유지 관리, 테스트하기 어렵습니다.
- 컴포넌트에서 비즈니스 로직을 추출하는 것은 재사용 가능한 좋은 아이디어입니다.

그렇다면, 컴포넌트에서 비즈니스 로직을 분리하면 외부 클래스나 함수와 같은 곳에 쓰여져야 합니다. 어떻게 하면 될까요? 의존성 주입을 사용하여!



## 의존성 주입이란 무엇이며 왜 사용해야 할까요

의존성 주입(Dependency Injection, DI)은 객체 생성을 객체 사용과 분리하는 소프트웨어 디자인 패턴입니다. 실제로, 사용하는 코드 내에서 물건을 만들지 않고, 객체의 인스턴스화는 객체를 만들고 그것을 필요로 하는 구성 요소에 제공하는 외부 개체로 위임됩니다.

의존성 주입은 코드를 더 유연하고 모듈식으로 만들어주며, 쉽게 테스트할 수 있도록 합니다. 강하게 결합된 코드 대신, 모듈식 구성 요소를 제공하여 필요에 따라 코드를 변경하지 않고 쉽게 교체하거나 확장할 수 있습니다.

또한, DI는 코드의 가독성과 유지 보수성을 향상시키는 데 도움을 줍니다. 구성 요소 간의 의존성을 명시적으로 만들어 복잡한 의존성을 관리하는 것을 용이하게 합니다.



요약하자면, 의존성 주입은 다음과 같은 목적으로 사용됩니다:

- 객체의 생성과 사용을 분리합니다.
- 코드를 더 유연하고 모듈화되며 쉽게 테스트할 수 있게 만듭니다.
- 코드의 가독성과 유지보수성을 향상시킵니다.

## React에서 의존성 주입

React 애플리케이션을 개발해야 한다고 상상해봅시다. 할 일 목록을 관리하는 React 애플리케이션을 만들어보겠습니다. (얼마나 멋져요 😅)



할 일 목록을 표시하는 컴포넌트가 있습니다.
컴포넌트가 렌더링될 때 목록을 API에서 로드하고 싶습니다. 그리고 컴포넌트에서 비즈니스 로직을 작성하지 않으려면 API 호출을 수행하는 서비스가 필요합니다. 아래 다이어그램에서 보여지는 것처럼요.

```js
              Component                  Service                       API
                  |                          |                          |
                  |                          |                          |
                  |    데이터 요청           |                          |
                  |------------------------->|                          |
                  |                          |                          |
                  |                          |  API에서 데이터 검색      |
                  |                          |------------------------->|
                  |                          |                          |
                  |                          |    데이터 처리            |
                  |                          |<-------------------------|
                  |                          |                          |
                  |  데이터 수신             |                          |
                  |<-------------------------|                          |
                  |                          |                          |
```

이 순서 다이어그램에서 컴포넌트는 메소드나 함수를 호출하여 서비스에 데이터 요청을 보냅니다. 그런 다음 서비스는 요청을 보내어 외부 API에서 데이터를 검색합니다. 데이터를 받은 후 서비스가 처리하고 컴포넌트로 반환합니다.

다이어그램에서 화살표로 표시되는 이벤트 시퀀스를 볼 수 있습니다. API에서 서비스로의 점선 화살표는 API에서 데이터를 검색하는 것을 나타내며, 서비스에서 컴포넌트로의 실선 화살표는 처리된 데이터를 컴포넌트로 반환하는 것을 나타냅니다.



구현 수준에서 코드는 이렇게 보일 수 있습니다:

```js
import React, { useState, useEffect } from 'react';
import TodoService from './TodoService';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const todos = await TodoService.getTodos(); // TodoService를 호출하여 할 일 가져오기
        setTodos(todos);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTodos();
  }, []);

  return (
    - 목록
      {todos.map(todo => (
        - 아이디: {todo.id}, 제목: {todo.title}
      ))}
    - 
  );
}

export default TodoList;
```

이 코드에서는 TodoService에서 getTodos 메서드를 호출하는 TodoList 컴포넌트를 정의합니다. useState 훅을 사용하여 서비스에서 반환된 할 일을 추적하고, useEffect 훅을 사용하여 컴포넌트가 마운트될 때 할 일을 가져옵니다.

fetchTodos 함수가 호출될 때 await 키워드를 사용하여 getTodos 메서드가 할 일을 반환할 때까지 기다리며, 할 일이 반환되면 setTodos 함수를 사용하여 todos 상태 변수에 할 일을 설정합니다.



마침내, map 함수를 사용하여 할 일 목록을 렌더링하고 각 할 일의 제목을 표시합니다. 이것은 간소화된 예제이며 TodoService의 구현은 사용된 API에 따라 달라질 수 있습니다.

## props를 사용한 의존성 주입

```js
import React, { useState, useEffect } from 'react';

function TodoList({ todoService }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const todos = await todoService.getTodos(); // 주입된 TodoService를 호출하여 할 일을 가져옴
        setTodos(todos);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTodos();
  }, [todoService]);

  return (
    - 목록
      {todos.map(todo => (
        - 고유 키{todo.id}{todo.title}
      ))}
    - 목록 종료
  );
}

export default TodoList;
```

이 업데이트된 코드에서는 TodoService를 TodoList 구성 요소의 prop으로 주입합니다. 구성 요소는 더 이상 TodoService를 직접 가져오지 않고 주입된 서비스를 사용하여 할 일을 가져옵니다.



컴포넌트가 마운트될 때 fetchTodos 함수는 주입된 todoService를 사용하여 할 일을 검색합니다. 이렇게 함으로써 TodoService의 구현을 손쉽게 교체할 수 있습니다. 다른 서비스 구현체를 TodoList 컴포넌트에 전달하여 TodoService의 특정 구현체를 사용하려면 다음과 같이 서비스를 prop으로 전달합니다:

```js
import React from 'react';
import TodoService from './TodoService';
import TodoList from './TodoList';

function App() {
  return <TodoList todoService={TodoService} />;
}

export default App;
```

TodoService를 TodoList 컴포넌트에 prop으로 전달함으로써 TodoService의 특정 구현체를 사용할 수 있습니다. TodoList 컴포넌트를 수정하지 않고 TodoService의 다른 구현체간 쉽게 전환이 가능해지므로, 보다 모듈식이고 유연한 디자인을 구현할 수 있습니다.



이 내용은 Component에 대한 테스트를 작성할 때 매우 유용할 수 있습니다.

여기서 우리가 해결해야 할 두 가지 문제가 있습니다:

- 우리는 아직도 의존성 주입을 사용하지 않는 App Component에 TodoService를 가져와야 합니다.
- Props는 응용 프로그램 전체에서 데이터를 전달하는 효과적인 방법 중 하나일 뿐이며, 중첩 레이어와만 잘 작동합니다.

```js
              부모 Component
                         |
                         SubComponent A로 Prop 전달
                         |
                         |-SubComponent A
                         |
                         |
                         SubComponent B로 Prop 전달
                         |
                         |
                         |--SubComponent B
                         |
                         |
                         SubComponent C로 Prop 전달
                         |
                         |
                         |---SubComponent C
```



이 다이어그램은 프롭스가 컴포넌트의 계층 구조를 통해 전달되는 방법을 보여줍니다. 컴포넌트가 더 들여쓰여 있을수록 컴포넌트 트리에서 더 깊게 중첩됩니다. 이 중첩을 원치 않아요. 😨

## React Context를 사용한 의존성 주입

다음은 TodoContext를 사용하여 컴포넌트에서 TodoService를 호출하는 React 코드의 예시입니다:

```js
import React, { useState, useEffect, useContext } from 'react';
import TodoContext from './TodoContext';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const todoService = useContext(TodoContext); // TodoContext에서 TodoService를 가져옴

  useEffect(() => {
    async function fetchTodos() {
      try {
        const todos = await todoService.getTodos(); // TodoContext에서 TodoService를 호출하여 todos 가져오기
        setTodos(todos);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTodos();
  }, [todoService]);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default TodoList;
```



이 코드에서는 useContext 훅을 사용하여 TodoContext에서 TodoService를 가져옵니다. 그런 다음 가져온 todoService를 사용하여 할 일을 불러옵니다.

useEffect 훅은 컴포넌트가 마운트될 때 할 일을 불러오는 데 사용됩니다. fetchTodos 함수는 가져온 todoService를 사용하여 할 일을 불러와서 그것들을 할 일 상태 변수에 설정합니다.

이 컴포넌트를 사용하려면 먼저 TodoContext를 생성하고 해당 컴포넌트를 래핑해야 합니다. 다음과 같이:

```js
import React from 'react';
import TodoContext from './TodoContext';
import TodoService from './TodoService';
import TodoList from './TodoList';

function App() {
  return (
    <TodoContext.Provider value={TodoService}>
      <TodoList />
    </TodoContext.Provider>
  );
}

export default App;
```



이 예제에서는 TodoContext를 생성하고 TodoService를 해당 값으로 전달합니다. 그런 다음 TodoList 컴포넌트를 TodoContext.Provider 컴포넌트로 감싸서 useContext 훅을 사용하여 컨텍스트에서 TodoService를 검색할 수 있도록 합니다.

## 의존성 주입과 제어 역전 컨테이너 (IoC)를 사용한 의존성 주입

이러한 컨텍스트 개념을 사용하여 제어 역전 컨테이너를 이용해 한 발 더 나아갈 수 있습니다.

기다려봐요, 제어 역전 컨테이너 (IoC)란 무엇인가요?



React에서 IoC (Inversion of Control) 컨테이너는 여러 컴포넌트와 서비스 사이의 의존성을 관리하는 도구입니다. 이 도구를 사용하면 한 번에 서비스 또는 객체 (의존성)를 정의하고 등록한 다음, 이를 의존하는 다른 컴포넌트에 주입할 수 있습니다. 이를 통해 컴포넌트를 분리하고 응용 프로그램을 모듈식으로 만들고 유지보수하기 쉽게 할 수 있습니다.

React의 IoC 컨테이너는 대개 모든 의존성으로 사용할 수 있는 모든 객체를 참조하는 중앙 레지스트리를 제공함으로써 작동합니다. 컴포넌트는 직접 생성하는 대신에 이 컨테이너에서 이러한 의존성을 요청할 수 있습니다. 이 접근 방식은 또한 대체 구현으로 의존성을 교체하거나 테스트를 위해 목객체로 대체하기 쉽게 합니다.

React용 여러 인기있는 IoC 컨테이너로는 InversifyJS, Awilix, BottleJS 등이 있으며, 생성자 주입, 속성 주입, 자동 의존성 해결 등과 같은 다양한 기능을 제공합니다. 일부 IoC 컨테이너는 다른 것보다 더 복잡할 수 있으므로 프로젝트의 요구 사항과 복잡성 수준에 적합한 것을 선택하는 것이 중요합니다.

우리의 경우, 아래와 같이 처음부터 예제를 작성할 것입니다:



```js
import React, { createContext, useContext } from 'react';

// 컨테이너를 위한 새로운 컨텍스트를 생성합니다
const ContainerContext = createContext();

// 컨테이너를 자식 컴포넌트에 제공하는 컴포넌트를 정의합니다
const ContainerProvider = ({ container, children }) => {
  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
};

// 컴포넌트 내에서 컨테이너에 접근하기 위한 훅을 정의합니다
const useContainer = () => {
  const container = useContext(ContainerContext);
  if (!container) {
    throw new Error('컨테이너를 찾을 수 없습니다. 컴포넌트를 ContainerProvider로 감싸는지 확인해주세요.');
  }
  return container;
};

// 컨테이너에서 의존성을 주입하는 훅을 정의합니다
const useInject = (identifier) => {
  const container = useContainer();
  return container.resolve(identifier);
};

// 예시 사용법:
const MyService = () => {
  return { foo: 'bar' };
};

const MyComponent = () => {
  const myService = useInject('myService');
  return <div>{myService.foo}</div>; // 결과: 'bar'
};

const container = {
  registry: {
    myService: MyService()
  },
  resolve(identifier) {
    if (!this.registry.hasOwnProperty(identifier)) {
      throw new Error(`식별자 ${identifier}로 식별되는 객체를 컨테이너에서 찾을 수 없습니다`);
    }
    return this.registry[identifier];
  }
};

const App = () => {
  return (
    <ContainerProvider container={container}>
      <MyComponent />
    </ContainerProvider>
  );
};
```

이 예제에서는 컨테이너 오브젝트를 prop으로 전달받아 ContainerProvider 컴포넌트를 생성하여 ContainerContext 컨텍스트를 사용하여 자식에게 제공하는 방법을 보여줍니다. 그리고 컴포넌트 내에서 컨테이너를 검색하는 useContainer 훅을 정의합니다.

그런 다음 MyService 객체를 정의하고 컨테이너 오브젝트의 레지스트리 속성에 추가합니다. 또한 컨테이너 오브젝트에 식별자를 입력받아 해당 객체를 검색하는 resolve 메소드를 정의합니다. 이 경우 resolve 메소드는 MyService 객체를 반환합니다.

MyComponent를 ContainerProvider로 감싸고 컨테이너 오브젝트를 prop으로 전달한 후 MyComponent를 렌더하는 App 컴포넌트를 렌더합니다. MyComponent가 렌더되면 컨테이너에서 myService 의존성을 검색하고 화면에 해당하는 foo 속성을 렌더합니다.



이 코드에서는 식별자를 매개변수로 전달받는 useInject 훅을 추가합니다. 이 훅은 컨테이너에서 해당 객체를 검색합니다. useInject 훅은 내부적으로 useContainer를 호출하여 컨테이너를 검색하고, 그런 다음 컨테이너에서 resolve 메서드를 호출하여 객체를 검색합니다.

다음으로, useInject 훅을 사용하여 컨테이너에서 myService 의존성을 검색하고 그 foo 속성을 화면에 렌더링하는 MyComponent를 생성합니다.

마지막으로, ContainerProvider로 랩핑된 MyComponent를 렌더링하는 App 컴포넌트를 렌더링합니다. MyComponent가 렌더링되면 useInject 훅을 사용하여 컨테이너에서 myService 의존성을 검색하고 해당 foo 속성을 화면에 렌더링합니다.

요약하면, 의존성 주입은 더 유연하고 모듈식이며 쉽게 테스트할 수 있는 코드를 구현할 수 있는 디자인 패턴입니다. 이는 객체의 생성과 사용을 분리함으로써 컴포넌트 간의 의존성을 명시적으로 만들어 복잡한 의존성을 관리하기 쉽게 해줍니다.



리액트에서는 종속성 주입을 프롭스로 서비스를 주입하거나 후크를 사용하여 컨테이너를 통해 컴포넌트에 종속성을 제공하여 구현할 수 있습니다. 이 방법을 사용하면 더 깔끔하고 유지보수가 쉬운 코드를 작성할 수 있으며 비즈니스 로직을 재사용하고 종속성을 관리하는 일이 더 쉬워집니다.

이러한 패턴을 따르면 리액트 코드의 가독성, 유지보수성, 테스트 가능성이 향상될 수 있습니다.

![이미지](/assets/img/2024-05-12-DependencyinjectioninReact_0.png)

와우, 마지막까지 왔군요. 이 기사는 실험이었습니다. 아이디어는 저의 것이지만 텍스트, 다이어그램 및 코드는 ChatGpt가 완전히 작성했습니다.