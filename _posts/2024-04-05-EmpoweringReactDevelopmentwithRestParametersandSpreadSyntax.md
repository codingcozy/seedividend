---
title: "리액트 개발자라면 알아둬야할 Rest 파라미터와 Spread 구문"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Empowering React Development with Rest Parameters and Spread Syntax"
link: "https://medium.com/@mysteryweevil/empowering-react-development-with-rest-parameters-and-spread-syntax-70f23af0558e"
---



리액트는 페이스북에서 유명한 UI 라이브러리로, 견고한 구조를 토대로 매력적인 경험을 만들어냅니다. Rest 매개변수와 Spread 구문과 같은 현대적인 JavaScript 기능을 통합하면 리액트의 장점을 극대화하여 코드를 더 간결하고 사용자 경험을 개선할 수 있습니다.

이 기사에서는 이러한 기술을 리액트 컴포넌트 내에서 실용적으로 활용하는 방법을 탐구하여 새로운 개발자와 베테랑 개발자 모두에게 도움이 되도록 스킬을 향상시킬 것입니다.

# Spread 구문을 사용한 Props 조작

임의의 Props를 받는 프레젠테이셔널 자식 컴포넌트를 설계한다고 가정해보세요. Spread 구문을 적용하면 속성 추출이 간단해지므로 수동 할당으로 인한 번거로움이 줄어듭니다:

<div class="content-ad"></div>

```js
// ParentComponent.js
import ChildComponent from "./ChildComponent";

const parentData = {
  label: "부모 데이터",
  description: "일부 임의의 정보",
};

function ParentComponent() {
  return <ChildComponent {...parentData} />;
}

// ChildComponent.js
export default function ChildComponent({ label, description }) {
  return (
    <div>
      <h1>{label}</h1>
      <p>{description}</p>
    </div>
  );
}
```

각 속성을 개별적으로 선언하는 대신 Spread 구문은 전체 parentData 객체를 전달하여 키를 해당 속성에 자동으로 매핑합니다. 또한 미래의 수정이 추가 필드를 추가하도록 요구하는 경우를 가정해보십시오. 이 전략 덕분에 업데이트가 이전 구성을 유지하면서 손쉽게 발생합니다:

```js
const parentData = {
  label: "부모 데이터",
  description: "일부 임의의 정보",
  icon: "<svg/>",
};
```

# 이벤트 핸들러 및 나머지 매개변수

<div class="content-ad"></div>

대부분의 경우 React에서 이벤트 처리는 핸들러 함수를 트리 아래로 전달하는 것을 포함합니다. 때로는, 자식 요소가 중앙 처리 루틴이 필요한 세분화된 이벤트 카테고리를 전달하는 경우가 있습니다. Rest 파라미터를 구현하면 다양한 데이터를 균일하게 수집하여 집계 작업을 도와줍니다:

```js
// EventAggregator.js
import { useState } from 'react';

export default function EventAggregator({ children }) {
  const [events, setEvents] = useState([]);

  function collectEventHandler(eventName, eventPayload) {
    setEvents((prevState) => [...prevState, { eventName, eventPayload }]);
  }

  return children(collectEventHandler);
}

// ButtonComponent.js
import EventAggregator from './EventAggregator';

export default function ButtonComponent({ onClick }) {
  return (
    <button type="button" onClick={(event) => onClick('click', event)}>
      Click me!
    </button>
  );
}

// ContainerComponent.js
import EventAggregator from './EventAggregator';
import ButtonComponent from './ButtonComponent';

function ContainerComponent() {
  return (
    <EventAggregator>
      {(onClick) => (
        <>
          <ButtonComponent onClick={onClick} />
          <ul>
            {/* Render collected events here */}
          </ul>
        </>
      )}
    </EventAggregator>
  );
}
```

위 코드에서 EventAggregator 컴포넌트는 상태 저장을 관리하며, 하위 요소가 해당 상황을 감지할 때 호출할 콜백을 노출합니다. 한편 ButtonComponent는 필요한 DOM 이벤트 인스턴스를 전달하는 일반적인 `click` 신호를 발행합니다. 마지막으로, 캡처된 상호작용은 컨테이너 안에 모아져 있어 나타내거나 추가 분석에 사용할 수 있습니다.

# Rest 파라미터로 가변 인자 기능 추가하기

<div class="content-ad"></div>

가변 매개변수 함수를 구현하는 것은 변화무죄한 인수 개수를 소비할 수 있는 기능, 그렇게 함으로써 확장 가능한 API를 구축하는 데 중요합니다. 한번 더, Rest 매개변수는 이러한 노력들을 쉽게 돕습니다:

```js
// VariadicComponent.js
import { useState } from 'react';

export default function VariadicComponent({ children, variant, ...props }) {
  const [state, setState] = useState(() => ({
    count: 0,
    ...props,
  }));

  function updateCount() {
    setState((prevState) => ({ ...prevState, count: prevState.count + 1 }));
  }

  return children(updateCount, variant, state);
}

// ConsumerComponent.js
import VariadicComponent, { updateCount } from './VariadicComponent';

function ConsumerComponent() {
  return (
    <VariadicComponent
      variant="primary"
      color="#fff"
      backgroundColor="#007bff"
      borderRadius={4}
    >
      {(updateCount, variant, state) => (
        <button style={ variant, ...state } onClick={updateCount}>
          Update Count ({state.count})
        </button>
      )}
    </VariadicComponent>
  );
}
```

여기서 VariadicComponent는 Rest 매개변수를 통해 다양한 속성(변수 비포함)을 받아들이고, 해당 속성들을 파생된 내부 상태와 함께 번들링합니다. 이후, 이 데이터 집합은 소비자에게 전달되어 인라인 스타일과 매끄럽게 병합됩니다. 게다가, ConsumerComponent는 updateCount와 같은 도우미 유틸리티에 무제한 액세스를 제공받아 일관된 캡슐화를 보장합니다.

# 결론

<div class="content-ad"></div>

휴대용 파라미터와 Spread 구문은 React 슈퍼파워를 자신있게 활용하는데 강력한 동료들로 입증됩니다. 번거로운 프롭 드릴링 절차를 자동화하거나 확장 가능한 아키텍처를 육성하든, 이러한 혁신은 개발 프로세스를 현저히 향상시킵니다. 지금 바로 시도해 보세요. 향상된 생산성을 목격할 것입니다.
