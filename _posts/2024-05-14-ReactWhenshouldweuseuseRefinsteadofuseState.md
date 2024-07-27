---
title: "리액트 언제 useRef 대신에 useState를 사용해야 할까요"
description: ""
coverImage: "/assets/img/2024-05-14-ReactWhenshouldweuseuseRefinsteadofuseState_0.png"
date: 2024-05-14 12:13
ogImage: 
  url: /assets/img/2024-05-14-ReactWhenshouldweuseuseRefinsteadofuseState_0.png
tag: Tech
originalTitle: "React: When should we use useRef instead of useState?"
link: "https://medium.com/@swfungineer/react-when-to-use-useref-instead-of-usestate-6ae05800c83c"
---


React에서 useRef는 함수형 컴포넌트 내에서 DOM 요소나 다른 React 요소를 참조하는 데 사용되는 훅입니다. (이 훅을 사용하면 함수형 컴포넌트가 클래스 컴포넌트의 this.refs와 유사한 기능을 활용할 수 있습니다.)

useRef를 사용하면 컴포넌트의 렌더링 여부에 관계없이 동일한 참조를 유지할 수 있습니다. 컴포넌트가 다시 렌더링되더라도 참조가 변경되지 않도록 보장할 수 있어 유용합니다.

예를 들어 useRef를 사용하여 특정 DOM 요소에 대한 참조를 얻어 해당 요소를 프로그래박적으로 조작할 수 있습니다.



```js
import React, { useRef, useEffect } from 'react';

const MyComponent = () => {
  const myRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 DOM 요소에 포커스를 설정합니다.
    myRef.current.focus();
  }, []);

  return <input ref={myRef} />;
};

export default MyComponent;
```

이 예제에서 useRef를 사용하여 myRef 변수를 만들고 그것을 입력 요소에 할당합니다. useEffect 훅을 사용하여 컴포넌트가 마운트될 때 해당 요소에 포커스를 설정합니다. myRef.current 프로퍼티를 사용하여 기본 DOM 요소에 액세스합니다.

그럼 언제 useState 대신 useRef를 사용해야 할까요?

useState와 useRef는 React Hooks에서 서로 다른 목적을 제공합니다.



useState: 컴포넌트의 상태를 관리하는 데 사용됩니다. 주로 컴포넌트의 상태가 변경될 때 다시 렌더링되기를 원할 때 사용됩니다. 상태가 변경되면 컴포넌트가 다시 렌더링됩니다. useRef: 렌더링과 직접적으로 관련이 없는 값을 유지해야 할 때 사용됩니다. 주로 DOM 요소에 대한 참조나 외부 라이브러리의 인스턴스와 같이 렌더링과 직접적으로 관련이 없는 값들을 저장하는 데 사용됩니다. 따라서 useState와 useRef는 각각의 사용 사례에 따라 선택되어져야 합니다.

useRef를 사용하는 일반적인 시나리오는 다음과 같습니다:

렌더링과 관련이 없는 값들 저장하기 DOM 요소에 대한 참조 저장하기 값이 변경되더라도 다시 렌더링이 필요하지 않은 경우 더 잘 이해하기 위해 예시와 설명을 살펴보겠습니다.

useState의 예제



```js
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={increment}>증가</button>
    </div>
  );
};

export default Counter;
```

이 예제에서는 useState 훅을 사용하여 count 상태를 정의하고 업데이트하는 함수인 setCount를 정의합니다. count 상태가 컴포넌트의 렌더링에 직접적으로 영향을 주기 때문에 상태가 변경될 때마다 컴포넌트가 다시 렌더링됩니다.

useRef 예시

```js
import React, { useRef, useEffect } from 'react';

const Timer = () => {
  const intervalRef = useRef(null);
  const secondsRef = useRef(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      secondsRef.current += 1;
      console.log('초:', secondsRef.current);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <p>타이머: {secondsRef.current} 초</p>
      <button onClick={() => clearInterval(intervalRef.current)}>정지</button>
    </div>
  );
};

export default Timer;
```



이 예에서 useRef 훅을 사용하여 두 개의 레퍼런스를 생성합니다: intervalRef와 secondsRef입니다. intervalRef는 setInterval의 반환 값을 저장하며, secondsRef는 시간을 추적하는 데 사용됩니다. useEffect 훅은 컴포넌트가 마운트될 때 setInterval을 시작하고 언마운트될 때 정리합니다. secondsRef는 컴포넌트의 렌더링과는 관계없이 값을 유지하며, secondsRef.current는 현재 시간을 추적하고 표시하는 데 사용됩니다.

이 두 예제는 useState가 컴포넌트의 상태를 관리하고 렌더링을 트리거하는 데 사용되는 반면, useRef는 렌더링과 직접적으로 관련되지 않는 값을 저장하거나 DOM 요소에 액세스하는 데 사용됨을 보여줍니다.

데이터가 많을수록 useRef를 사용해야 하는 경우가 더 많아지며, 이번에는 동일한 프로그램의 예제를 통해 이를 확인해볼 것입니다.

useState를 이용한 예제:



```js
import React, { useState } from 'react';

const BigDataComponent = () => {
  const [data, setData] = useState('');

  const fetchData = () => {
    // 많은 양의 데이터를 가져오는 것을 가정
    // 데이터가 증가함에 따라 렌더링이 지연될 수 있습니다
    const newData = '아주 많은 데이터...';
    setData(newData);
  };

  return (
    <div>
      <button onClick={fetchData}>데이터 가져오기</button>
      <p>데이터 길이: {data.length}</p>
    </div>
  );
};

export default BigDataComponent;
```

이 예제에서는 useState를 사용하여 데이터를 관리하고, 버튼을 클릭할 때마다 fetchData 함수를 호출하여 많은 양의 데이터를 가져옵니다. 그러나 데이터 양이 증가함에 따라 렌더링이 느려질 수 있습니다.

useRef를 사용한 예제

```js
import React, { useRef } from 'react';

const BigDataComponent = () => {
  const dataRef = useRef('');

  const fetchData = () => {
    // 많은 양의 데이터를 가져오는 것을 가정
    // useRef를 사용하여 컴포넌트의 렌더링에 영향을 미치지 않고 데이터를 설정합니다
    const newData = '아주 많은 데이터...';
    dataRef.current = newData;
  };

  return (
    <div>
      <button onClick={fetchData}>데이터 가져오기</button>
      <p>데이터 길이: {dataRef.current.length}</p>
    </div>
  );
};

export default BigDataComponent;
```



이 예에서는 useRef를 사용하여 데이터를 관리합니다. 데이터 양이 증가해도 useRef를 사용하면 데이터를 설정할 때 컴포넌트의 렌더링 속도에 영향을 미치지 않습니다.

이 두 예시를 통해 데이터 양이 증가할수록 useState는 느려질 수 있지만 useRef를 사용하면 데이터가 늘어나도 렌더링에 영향을 미치지 않고 데이터를 관리할 수 있다는 것을 알 수 있습니다.

다시 말해, useRef의 중요한 특징 중 하나는 렌더링과 관련이 없는 값의 보존입니다.

- 렌더링과 관련이 없는 값의 보존: useRef로 생성된 ref 객체의 current 프로퍼티에 할당된 값은 컴포넌트를 다시 렌더링해도 변경되지 않습니다. 이를 통해 useRef는 컴포넌트의 렌더링과는 독립적인 값을 유지할 수 있으며, 컴포넌트 상태와 관련이 없는 값을 보존하는 데 유용합니다.
- 렌더링 주기 중 값이 변경되어도 다시 렌더링을 트리거하지 않음: useRef로 생성된 객체의 current 프로퍼티에 값이 렌더링 주기 중에 할당되더라도 컴포넌트는 다시 렌더링되지 않습니다. 따라서 useState와 달리 상태 업데이트가 렌더링을 트리거하지 않으므로 다시 렌더링 없이 값의 변화를 허용합니다. useRef를 사용하여 렌더링과 관련이 없는 값을 관리하거나 DOM 요소에 대한 참조나 외부 라이브러리의 인스턴스와 같이 렌더링과 관련이 없는 값들을 다루는데 유용합니다. 이러한 특징들은 useRef를 사용하여 컴포넌트 렌더링과는 독립적인 데이터를 관리하거나 DOM 요소에 접근할 때 매우 유용합니다.



이를 효과적으로 활용하려면 React 렌더링에 대한 포괄적인 이해가 필수적입니다. 아래에는 React에서 렌더링이 작동하는 방식에 대한 기본 개념부터 최적화까지 간략한 개요가 있습니다.

- 가상 DOM: 가상 DOM은 React에 의해 추상화된 실제 DOM의 가상 표현입니다. 상태 변경과 같은 이벤트가 발생하면 React는 가상 DOM을 업데이트하고 이를 실제 DOM과 비교하여 최소한의 작업을 적용하여 실제 DOM을 업데이트합니다. 이 과정은 성능을 향상시키고 불필요한 렌더링을 방지합니다.

- 컴포넌트 렌더링 프로세스:

  - 초기 렌더링: React 애플리케이션이 시작되면 컴포넌트 트리가 렌더링되어 초기 UI가 생성됩니다.
  - 상태 또는 속성 변경: 사용자 상호작용과 같은 이벤트로 상태 또는 속성이 변경될 수 있습니다.
  - 가상 DOM 업데이트: 상태 또는 속성이 변경되면 React는 해당 컴포넌트의 가상 DOM을 업데이트합니다. 필요없는 렌더링이나 DOM 조작을 최소화하기 위해 가상 DOM의 변경사항을 효율적으로 계산합니다.
  - 실제 DOM 업데이트: 가상 DOM의 변경사항을 계산한 후 React는 실제 DOM과 비교하여 차이점을 식별하고 실제 DOM의 필요한 부분만 업데이트합니다. 이 최적화는 브라우저에서 불필요한 렌더링을 최소화합니다.

- 렌더링 최적화: React는 성능을 최적화하기 위한 다양한 기술을 제공합니다:



- PureComponent와 React.memo: 이들은 컴포넌트의 불필요한 다시 그리기를 방지하는 데 사용됩니다. PureComponent는 클래스 컴포넌트에 사용되며, React.memo는 함수형 컴포넌트에 사용됩니다.
- shouldComponentUpdate 또는 React.memo를 사용한 컴포넌트 최적화: 이러한 방법을 사용하면 컴포넌트가 업데이트해야 하는 조건을 정의하여 다시 그리기를 제어하고 최적화할 수 있습니다.
- 불변성 유지: 불변성을 유지함으로써 React는 상태가 변경될 때 새로운 객체를 생성하여 불필요한 다시 그리기를 방지합니다.

이러한 렌더링 프로세스와 최적화 기술을 이해하면 효율적인 React 애플리케이션을 개발할 수 있습니다.

다음 섹션에서는 더 나은 최적화를 위해 메모이제이션을 탐구할 것입니다.