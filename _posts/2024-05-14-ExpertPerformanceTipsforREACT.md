---
title: "리액트를 위한 전문 성능 향상 팁"
description: ""
coverImage: "/assets/img/2024-05-14-ExpertPerformanceTipsforREACT_0.png"
date: 2024-05-14 10:11
ogImage: 
  url: /assets/img/2024-05-14-ExpertPerformanceTipsforREACT_0.png
tag: Tech
originalTitle: "Expert Performance Tips for REACT"
link: "https://medium.com/@amalhan43/expert-performance-tips-for-react-aafc4b74144c"
---


![Expert Performance Tips for REACT](/assets/img/2024-05-14-ExpertPerformanceTipsforREACT_0.png)

웹 사이트의 성능은 사용자 경험, 검색 엔진 순위, 전환율, 비용 효율성, 경쟁 우위 및 접근성에 직접적인 영향을 미치기 때문에 중요합니다. 빠른 로딩 속도의 웹 사이트는 사용자 만족도를 높이고 이탈률을 낮추며 SEO 순위를 향상시킵니다. 또한 높은 전환율, 낮은 운영 비용 및 시장에서의 경쟁 우위를 가져다줍니다. 또한 최적화된 성능은 다양한 인터넷 연결과 장치를 사용하는 사용자를 대상으로하여 포용력을 보장합니다. 전반적으로 성능 최적화를 우선시함으로써 비즈니스 목표 달성과 웹 사이트 방문자에게 가치를 전달하는 것이 중요합니다.

## 1. 비용이 많이 드는 계산에 useMemo 사용하기:

React 애플리케이션에서 데이터 변환과 같은 계산이 많이 드는 작업을 다룰 때 useMemo 훅을 사용하는 것이 중요합니다. 이를 통해 비용이 많이 드는 계산 결과를 기억하도록 할 수 있으며, 필요할 때만 다시 계산되도록 보장합니다. 종속성을 지정함으로써 언제 계산을 다시해야 하는지 제어하여 성능을 최적화할 수 있습니다.



```js
import React, { useMemo } from 'react';

const MyComponent = ({ data }) => {
  const transformedData = useMemo(() => {
    // 여기에서 비싼 데이터 변환 수행
    return data.map(item => item * 2);
  }, [data]);
  return (
    <div>
      {/* 변환된 데이터 사용 */}
    </div>
  );
};
```

## 2. 메모이제이션된 함수에 useCallback 사용하기:

Props로 전달된 콜백 함수는 메모이제이션되지 않으면 불필요한 다시 렌더링을 유발할 수 있습니다. useCallback 훅을 활용하여 이러한 함수를 메모이제이션함으로써 종속성이 변경될 때까지 자식 구성요소의 다시 렌더링을 방지할 수 있습니다. 이 최적화는 불필요한 렌더링 주기를 줄이며 애플리케이션의 반응성을 향상시킵니다.

```js
import React, { useCallback } from 'react';

const ParentComponent = () => {
  const handleButtonClick = useCallback(() => {
    // 여기에서 버튼 클릭 처리
  }, []);
  return (
    <ChildComponent onClick={handleButtonClick} />
  );
};
```



## 3. React.memo를 사용하여 성능 최적화하기:

React.memo 고차 컴포넌트를 사용하여 함수형 컴포넌트를 최적화할 수 있습니다. 이를 통해 컴포넌트를 기억하고, props가 변경되지 않은 경우 다시 렌더링되지 않습니다. 이 최적화는 특히 정적 props를 받는 컴포넌트의 렌더링 성능을 최적화하는 데 유용합니다.

```js
import React from 'react';

const MyComponent = React.memo(({ prop1, prop2 }) => {
  // 컴포넌트를 여기에 렌더링
});
```

## 4. 효율적인 렌더링을 위한 가상 목록 사용하기:



긴 데이터 목록을 렌더링하면 성능에 부정적인 영향을 미칠 수 있습니다. React-window나 react-virtualized와 같은 가상 목록 라이브러리는 화면에 보이는 항목만 렌더링하여 DOM 조작을 최소화하고 렌더링 성능을 획기적으로 향상시킴으로써 이 문제를 해결합니다.

```js
import React from 'react';
import { FixedSizeList } from 'react-window';

const MyListComponent = ({ data }) => {
  const renderRow = ({ index, style }) => {
    const item = data[index];
    return (
      <div style={style}>{item}</div>
    );
  };
  return (
    <FixedSizeList
      height={300}
      width={300}
      itemSize={50}
      itemCount={data.length}
    >
      {renderRow}
    </FixedSizeList>
  );
};
```

## 5. 지연로딩을 위한 코드 분할 사용하기:

코드를 작은 관리 가능한 조각으로 분할하고 동적으로 가져오기와 React lazy와 Suspense 구성 요소를 사용하여 지연 시간을 최적화하는 것은 초기 로드 시간을 최적화하는 데 중요합니다. 필요할 때만 필요한 코드를로드함으로써 응용 프로그램의 인지 성능을 향상시킬 수 있습니다.



```js
import React, { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
};
```

## 6. React.Fragment를 사용하여 렌더링 최적화:

컨테이너 없이 여러 요소를 렌더링할 때 React.Fragment 또는 그 간략한 구문을 사용하면 추가적인 DOM 노드를 생성하지 않게 됩니다. 이 최적화는 DOM을 가볍게 유지하여 렌더링 성능을 향상시키는 데 도움이 됩니다.

```js
import React from 'react';

const MyComponent = () => {
  return (
    <>
      <div>Element 1</div>
      <div>Element 2</div>
    </>
  );
};
```



## 7. 인라인 함수 정의를 피하세요:

렌더 메소드 내에서 함수를 인라인으로 정의하면 각 렌더링마다 새로운 참조를 생성하여 자식 컴포넌트가 불필요하게 다시 렌더링될 수 있습니다. 이러한 함수를 렌더 메소드 외부로 추출하거나 useCallback을 사용하여 메모이제이션함으로써 렌더링 성능을 최적화할 수 있습니다.

```js
import React, { useState } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <button onClick={handleIncrement}>증가</button>
      <p>카운트: {count}</p>
    </div>
  );
};
```

## 8. 성능 최적화를 위해 React.PureComponent 또는 React.memo를 사용하세요:



React.PureComponent 또는 React.memo를 활용하면 깊은 계층의 prop 비교를 수행하여 컴포넌트의 불필요한 다시 렌더링을 방지하는 데 도움이 됩니다. 이 최적화는 특히 클래스 컴포넌트 (PureComponent)와 함수형 컴포넌트 (React.memo로 메모이제이션된)에서 유용하며, prop 비교를 통해 렌더링 오버헤드를 크게 줄일 수 있습니다.

```js
import React, { PureComponent } from 'react';

class MyComponent extends PureComponent {
  render() {
    // 여기서 컴포넌트 렌더링하기
  }
}
export default MyComponent;
```

## 9. 컴포넌트 프로파일링:

React DevTools와 같은 React의 내장 프로파일링 도구를 사용하여 컴포넌트에서 성능 병목 현상을 식별하세요. 프로파일링을 통해 불필요한 다시 렌더링이나 비효율적인 상태 관리와 같은 최적화가 필요한 부분을 파악할 수 있습니다.



## 10. 트리 조정 최적화:

컴포넌트 트리의 깊이를 최소화하고 복잡한 컴포넌트를 작고 관리하기 쉬운 부분으로 나누어 불필요한 렌더링을 피하세요. 이렇게 하면 업데이트 중에 조정해야 할 컴포넌트의 수를 줄여 성능을 향상시킬 수 있습니다.

## 11. 불변 데이터 구조:

불변 데이터 구조인 Immutable.js나 Immer와 같은 것을 사용하여 상태 관리를 최적화하세요. 불변 데이터를 사용하면 상태 변경을 비교하고 컴포넌트를 언제 업데이트해야 하는지 결정하는 것이 더 쉽습니다. 이렇게 하면 더 효율적인 렌더링과 성능 향상이 가능합니다.



```js
import { Map } from 'immutable';

const initialState = Map({
  counter: 0,
  data: Map({}),
});

// 상태 업데이트
const newState = state.update('counter', counter => counter + 1);
```

## 12. 서버 측 렌더링 (SSR):

서버 측 렌더링을 구현하여 React 컴포넌트를 서버에서 사전 렌더링하고 정적 HTML을 클라이언트에 제공하십시오. SSR은 초기 로드 시간을 줄이고 검색 엔진 크롤러가 콘텐츠를 효과적으로 색인화할 수 있도록 함으로써 지각된 성능을 향상시킵니다.

## 13. Route-Based Splitting을 사용한 코드 분할:



페이지 또는 라우트마다 필요한 JavaScript만로드하기 위해 라우트 기반 코드 분할을 구현하세요. 이 기술은 필요할 때 비동기적으로 코드를 로드하여 초기 번들 크기를 줄이고로드 시간을 개선합니다.

```js
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
```

## 14. 디바운싱과 스로틀링:

API 요청이나 이벤트 핸들러와 같은 비용이 많이 드는 작업의 빈도를 제한하기 위해 디바운싱과 스로틀링 기술을 사용하세요. 디바운싱은 지정된 지연 후에 함수가 실행되도록 보장하고, 스로틀링은 함수가 호출될 속도를 제한하는데 사용됩니다. 둘 다 성능 병목 현상을 방지할 수 있습니다.



```js
import React, { useState } from 'react';
import { debounce, throttle } from 'lodash';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 지연된 검색 처리기
  const handleDebouncedSearch = debounce(search => {
    // 검색 작업 수행
    console.log('다음을 검색 중입니다:', search);
  }, 500);

  // 스크롤 쓸대 처리기
  const handleThrottledScroll = throttle(() => {
    // 스크롤 관련 작업 수행
    console.log('스크롤 중...');
  }, 100);

  const handleChange = event => {
    const { value } = event.target;
    setSearchTerm(value);
    handleDebouncedSearch(value); // 지연된 검색
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      onScroll={handleThrottledScroll} // 스크롤 쓸대
    />
  );
};

export default SearchInput;
```

## 15. 이벤트 핸들러 최적화:

렌더 메서드 내부에서 요소에 직접 이벤트 리스너를 추가하는 것은 메모리 누수 및 성능 문제를 일으킬 수 있습니다. 대신, 이벤트 위임을 사용하거나 렌더 주기 외부에서 프로그래밍 방식으로 이벤트 리스너를 추가하여 이벤트 처리를 최적화하세요.

```js
import React, { useEffect, useRef } from 'react';

const ScrollListener = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 관련 작업 수행
      console.log('스크롤 중...');
    };

    // 마운트 시 이벤트 리스너 추가
    scrollRef.current.addEventListener('scroll', handleScroll);

    // 언마운트 시 이벤트 리스너 제거
    return () => {
      scrollRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []); // 빈 종속성 배열은 효과가 한 번만 실행되도록 함

  return (
    <div ref={scrollRef} style={{ overflowY: 'scroll', height: '300px' }}>
      {/* 스크롤 가능한 콘텐츠 */}
    </div>
  );
};

export default ScrollListener;
```



## 16. 불필요한 부작용 피하기:

함수형 컴포넌트 내의 부작용에 주의하세요. API 호출이나 상태 변경과 같은 작용은 불필요한 재랜더링을 유발할 수 있습니다. useEffect 훅을 사용하여 적절한 의존성 배열을 설정하여 부작용이 발생하는 시기를 제어하고 컴포넌트 렌더링을 최적화하세요.

## 17. 이미지 최적화:

손실 없는 압축(품질을 희생하지 않고 파일 크기를 줄이는)이나 손실 압축(일부 품질을 희생하면서 파일 크기를 줄이는)과 같은 압축 기술을 사용하여 이미지 파일 크기를 줄이세요. WebP, JPEG XR 또는 AVIF와 같은 이미지 형식을 사용하여 JPEG나 PNG와 같은 전통적인 형식보다 더 나은 압축률과 품질을 제공하세요. 또한 사용자의 기기와 화면 크기에 따라 적절한 크기의 이미지를 제공하기 위해 srcset 및 sizes 속성을 사용하여 반응형 이미지를 서비스하세요. 이를 통해 불필요한 데이터 전송을 줄이고 로딩 시간을 향상시킬 수 있습니다. 화면에 바로 나타나지 않는 이미지에 대해 lazy loading을 구현하여 화면에 나타나면 로드되도록 하여 중요한 콘텐츠를 우선적으로 처리하고 초기 페이지 로딩 성능을 향상시키세요. 마지막으로 사용자의 기기와 네트워크 상황에 따라 이미지를 자동으로 최적화하고 제공하는 이미지 CDN 서비스를 고려해보세요.



감사합니다. 끝까지 오셔서 기쁩니다.

저랑 소통해요. 이 링크를 클릭해서 더 많이 알아보세요.

다음 블로그를 게시할 때 알림을 받으려면 구독해주세요. 다음에 또 만나요.