---
title: "리액트에서의 동적 임포트"
description: ""
coverImage: "/assets/img/2024-05-14-DynamicImportsinReact_0.png"
date: 2024-05-14 15:30
ogImage: 
  url: /assets/img/2024-05-14-DynamicImportsinReact_0.png
tag: Tech
originalTitle: "Dynamic Imports in React"
link: "https://medium.com/@shubham3480/dynamic-imports-in-react-3e3e7ad1d210"
---


![Dynamic Imports in React](/assets/img/2024-05-14-DynamicImportsinReact_0.png)

React에서의 동적 가져오기는 런타임에서 JavaScript 모듈을 동적으로로드할 수 있게 해줍니다. 이는 응용 프로그램의 성능과로드 시간을 크게 향상시킬 수 있습니다. 이 기술은 코드 분할 및 지연 로드에 특히 유용하며 필요할 때만 필요한 코드를로드합니다.

import() 함수는 사용하고자하는 동적 가져오기 모듈로 해결되는 Promise를 반환합니다.

JavaScript의 일반적인 import문(import 문을 사용)은 Promise를 반환하지 않습니다. 동기 작업이므로 가져온 모듈에서 내보낸 값을 반환합니다.



```js
import React from 'react';

const AnotherComponent = () => {
  return <div>다른 컴포넌트가 동적으로 로드되었습니다!</div>;
};

export default AnotherComponent;
```

```js
const MyComponent = () => {
  const [importedComponent, setImportedComponent] = useState(null);

  useEffect(() => {
    const importComponent = async () => {
      const module = await import('./AnotherComponent');
      const AnotherComponent = module.default;
      setImportedComponent(<AnotherComponent />);
    };

    importComponent();
  }, []);

  return (
    <div>
      {importedComponent}
      <div>이것은 내 기능적인 컴포넌트입니다!</div>
    </div>
  );
};

///다른 방법은 ...///
const MyComponent = async () => {
  const module = import('./AnotherComponent');
  const {AnotherComponent} = await module;
  return <AnotherComponent />;
};

export default MyComponent;

// 콘솔에서 내보낸 모듈을 확인할 때 { default: ""}는 모든 함수 이름을 키로 하고 
// 값으로 정의를 포함하며, default 키가 있으면 default로 가져온 것이 값이 되고, 
// 그렇지 않으면 정의가 없는 것이 됩니다.
```

## 동적 가져오기를 언제 사용해야 할까요?

동적 가져오기는 React 애플리케이션의 성능을 향상시키는 좋은 방법이지만, React 앱에서 동적 가져오기를 사용하는 더 좋은 사용 사례가 있습니다.



- 코드 모듈화: 동적 가져오기는 코드 모듈화와 서버에서 데이터를 가져올 필요가 있을 때 사용할 수 있습니다. 예를 들어 서버 측 렌더링 애플리케이션에서 이를 사용할 수 있습니다.
- 애플리케이션이 아직 로딩 중인 경우 컴포넌트가 필요하지 않을 때 동적 가져오기를 사용할 수 있습니다.
- 조건부 가져오기는 동적 가져오기에 대한 우수한 사용 사례입니다. 여기서 모듈 또는 컴포넌트는 필요한 페이지에서만 가져오며 애플리케이션에서 필요한 경우에만 가져옵니다.

## React.lazy()

React.lazy() 함수를 사용하면 동적 가져오기를 일반 컴포넌트로 렌더링할 수 있습니다. 기본적으로 React.lazy()는 동적 가져오기를 호출하고 프로미스를 반환합니다.

```js
import React, { lazy } from "react";
const Blog = React.lazy(() => 
  import('./Pages/Blog'));
```



# React.Suspense()

React.Suspense는 React 개발자가 React 컴포넌트의 렌더링을 로드될 때까지 중단시킬 수 있게 합니다. React.Suspense는 JSX 코드 조각 또는 React 컴포넌트인 React 요소를 허용하는 fallback 속성을 제공합니다.

React 동적 임포트를 이용해 페이지를 방문하는 사용자들은 종종 빈 페이지 화면을 경험합니다. 이는 애플리케이션이 모듈을 로드하는 동안 수행되며, 일부 사용자는 느린 인터넷 연결로 인해 오류가 발생할 수도 있습니다. React.lazy()와 React.Suspense를 결합하여 이 문제를 해결할 수 있습니다.

이를 위해 React.Suspense를 사용하여 모든 종속성이 지연 로드될 때까지 컴포넌트의 렌더링을 중단하고, React.Suspense는 사용자를 위한 대체 UI를 표시할 것입니다.



```js
import React, { Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./LazyComponent'));

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};

export default App;
```

알고 싶은 내용이 있다면 구독, 박수, 좋아요 및 공유하세요. 건배!