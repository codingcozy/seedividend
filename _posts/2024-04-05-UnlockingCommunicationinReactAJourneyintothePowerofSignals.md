---
title: "React에서 시그널 통신 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Unlocking Communication in React A Journey into the Power of Signals"
link: "https://medium.com/comsystoreply/unlocking-communication-in-react-a-journey-into-the-power-of-signals-f013d3a1ad7d"
---



<img src="/assets/img/UnlockingCommunicationinReactAJourneyintothePowerofSignals_0.png" />

# 소개

끊임없이 발전하는 웹 개발의 세계에서 React는 동적 사용자 인터페이스를 구축하는 데 가장 많이 사용되는 라이브러리가 되었습니다. 선언적 구문과 효율적 렌더링을 통해 React는 널리 채택되었습니다. 그러나 개발자로서 우리는 항상 애플리케이션을 향상시키는 방법을 찾고 대안적인 솔루션을 탐구합니다. 하나 흥미로운 길은 신호(Signals)의 세계에 탐험하는 것입니다.

# 신호(Signals) 이해하기

<div class="content-ad"></div>

# 시그널이란 무엇인가요?

시그널은 이벤트나 메시지로도 알려진 것으로, 소프트웨어 시스템의 다양한 부분 간에 대화를 나눌 수 있는 보편적인 수단으로 작용합니다. 직접 메소드 호출이나 강한 결합과는 달리, 시그널은 컴포넌트가 이벤트를 통지하고, 듣고, 이벤트에 응답하는 유연하고 결합을 느슨하게 하는 방법을 제공합니다.

# 시그널의 작동 방식

일반적으로, 시그널은 발행-구독 모델에서 작동합니다. 컴포넌트(발행자)는 특정 이벤트가 발생할 때 시그널을 방출하며, 다른 컴포넌트(구독자)는 서로에 대한 직접적인 지식이 없어도 그 시그널을 듣고 반응할 수 있습니다.

<div class="content-ad"></div>

# 시그널을 사용하는 상황

- 사용자 인터페이스 상호작용: 시그널은 그래픽 사용자 인터페이스에서 일반적으로 사용되며 버튼 클릭, 마우스 이동 또는 키보드 입력과 같은 사용자 상호작용을 처리합니다.
- 컴포넌트간 통신: 시그널은 서로 다른 컴포넌트나 모듈 간의 통신을 원활하게 처리하여 느슨하게 결합되어 있으면서도 조화롭게 작용할 수 있도록 합니다.
- 시스템 수준 이벤트: 더 큰 소프트웨어 시스템에서는 데이터 업데이트, 네트워크 활동 또는 오류 알림과 같은 시스템 수준 이벤트를 처리하는 데 시그널을 사용할 수 있습니다.

# React에서 시그널 이해하기

시그널은 React 애플리케이션에서 컴포넌트간 통신에 강력한 메커니즘을 제공합니다. 전통적인 상태 관리에만 의존하는 대신 React에서의 시그널은 더 이벤트 중심적인 접근 방식을 소개합니다. 컴포넌트는 시그널을 발신할 수 있고, 다른 컴포넌트는 이러한 시그널을 청취하여 느슨하게 결합되고 반응적인 아키텍처를 가능케 합니다.

<div class="content-ad"></div>

# React에서 신호의 주요 이점

- 구성 요소의 분리: 신호를 통해 구성 요소간에 직접적인 종속성을 만들지 않고 통신을 원할하게 할 수 있어 더 모듈화되고 유지보수가 용이한 코드베이스를 유도합니다.
- 이벤트 주도 아키텍처: 이벤트 주도 아키텍처를 수용함으로써, 신호는 유연하고 확장 가능한 디자인을 가능하게 합니다. 구성 요소는 특정 관심에 기반하여 신호에 반응하며, 사용자 인터페이스를 더 빠르고 직관적으로 만들어줍니다.
- 간소화된 상태 관리: React에는 강력한 상태 관리 시스템이 있지만, 특정 시나리오에 더 적합한 대체 수단으로 신호가 제공됩니다. 신호를 사용하여 응용 프로그램 상태의 특정 측면을 관리할 수 있으며, 중앙 집중식 상태 관리 솔루션 없이도 가능합니다.

# 신호의 실제 활용

학습하는 가장 효과적인 방법은 실제 예제를 통해 하는 것입니다. 여기서는 할 일 관리를 위한 간단한 신호 구현을 제시합니다. 할 일은 로컬 저장소에 저장되며, 신호의 초기 값은 로컬 저장소에서 데이터를 검색하여 설정됩니다.

<div class="content-ad"></div>

```js
const LOCAL_STORAGE_KEY = "todos";

export const getTodosFromLocalStorage = () => {
  const todos = localStorage.getItem(LOCAL_STORAGE_KEY);
  return todos ? JSON.parse(todos) : [];
};

export const todosSignal = signal(getTodosFromLocalStorage());
```

시그널의 값이 변경될 때마다 업데이트된 데이터를 로컬 저장소에 다시 저장하는 효과가 발생합니다.

```js
export const setTodosToLocalStorage = (todos) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};

effect(() => {
  setTodosToLocalStorage(todosSignal.value);
});
```

게다가, 함수 내에서 발생하는 시그널의 변경에 따라 변수를 동적으로 다시 유효성을 검사하는 계산 함수가 있습니다. todos 시그널의 경우도 해당됩니다.```

<div class="content-ad"></div>

```js
export const completedTodoCount = computed(
  () => todosSignal.value.filter((todo) => todo.isDone).length
);
```

이 함수는 새로운 할 일을 목록에 추가할 때 활성화됩니다. 값이 직접 수정되면 시그널이 나머지를 처리합니다.

```js
const onAddTodo = () => {
  const todo = {
    id: uuidV4(),
    text,
    isDone: false,
  };
  todosSignal.value = [todo, ...todosSignal.value];
  setText("");
};
```

예제는 GitHub 저장소에서 찾을 수 있습니다.

<div class="content-ad"></div>

# 결론: 리액트에서 신호의 힘

신호는 리액트 애플리케이션에서 다양한 시나리오를 처리하는 다재다능한 도구 세트를 제공합니다. 변화를 알리는 것, 애니메이션을 트리거하는 것, 혹은 복잡한 워크플로우를 조정하는 것이라 할지라도, 신호는 애플리케이션의 다른 부분 사이의 효율적인 커뮤니케이션을 관리하는 깔끔하고 효율적인 방법을 제공합니다.

신호를 개발 워크플로우에 통합하면 보다 모듈식이고 확장 가능한 애플리케이션 아키텍처를 촉진합니다. 컴포넌트가 비결합된 방식으로 통신할 수 있도록 해줌으로써, 코드베이스를 이해하기 쉽고 유지보수 가능하며 프로젝트가 진화함에 따라 확장할 수 있도록 만듭니다.

프로젝트에서 신호의 잠재력을 탐색하는 과정에서 애플리케이션의 구체적인 요구사항과 제약 사항을 고려해보세요. 다양한 신호 패턴을 실험하고 신호의 힘을 활용하여 더 동적이고 반응적인 사용자 인터페이스를 만들어보세요.

<div class="content-ad"></div>

이 블로그 포스트는 Comsysto Reply GmbH에서 게시되었습니다.
