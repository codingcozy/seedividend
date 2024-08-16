---
title: "프로처럼 React 컴포넌트 작성하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-WriteaReactComponentLikeaPro_0.png"
date: 2024-06-22 04:55
ogImage: 
  url: /assets/img/2024-06-22-WriteaReactComponentLikeaPro_0.png
tag: Tech
originalTitle: "Write a React Component Like a Pro"
link: "https://medium.com/javascript-in-plain-english/write-a-react-component-like-a-pro-4852109ffee5"
isUpdated: true
---




<img src="/assets/img/2024-06-22-WriteaReactComponentLikeaPro_0.png" />

리액트 세계에서 컴포넌트를 작성하는 것은 예술입니다. 그것은 단순히 작동하게 만드는 것이 아니라, 잘 작동하게 만드는 것이 중요합니다. 오늘은 프로처럼 컴포넌트를 만드는 방법을 살펴보겠습니다. 가독성, 재사용성, 효율성에 초점을 맞춰.

## 리스트 컴포넌트 만들기

우리가 기본 리스트 컴포넌트부터 시작해봅시다:

<div class="content-ad"></div>

```js
// src/components/List.js
import React from 'react';

const List = ({ data }) => {
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default List;
```

이 컴포넌트는 데이터 배열을 가져와서 목록으로 렌더링합니다.

## HOC로 컴포넌트 향상하기

고차 컴포넌트(Higher-Order Components, HOC)는 컴포넌트 로직을 재사용하는 강력한 패턴입니다. 기본적으로 컴포넌트를 감싸서 구조를 변경하지 않고 기능을 확장합니다.


<div class="content-ad"></div>

예를 들어, withLoading HOC를 사용하면 로딩 상태를 표시할 수 있습니다:

```js
// src/hocs/withLoading.js
import React, { useState } from 'react';

function withLoading(Component) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

export default withLoading;
```

이 HOC는 isLoading 속성을 확인합니다. 만약 true이면 "로딩 중..." 메시지를 렌더링합니다. 그렇지 않으면 래핑된 컴포넌트를 렌더링하여 데이터 가져오는 동안 사용자 경험이 연속적이게 됩니다.

비슷하게, withErrorHandling은 에러 상태를 관리하는 다른 HOC입니다:

<div class="content-ad"></div>

```js
// src/hocs/withErrorHandling.js
import React from 'react';

function withErrorHandling(Component) {
  return function WithErrorHandling({ error, ...props }) {
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    return <Component {...props} />;
  };
}

export default withErrorHandling;
```

에러가 발생하면 withErrorHandling이 에러 메시지를 표시합니다. 그렇지 않으면 컴포넌트를 일반적으로 렌더링합니다. 이 HOC는 특히 fetch 오류를 처리하거나 컴포넌트 라이프사이클 내에서 발생하는 문제를 처리하기에 유용합니다.

withLoading과 withErrorHandling을 결합하여, 로딩 및 에러 상태를 우아하게 처리하는 견고한 컴포넌트를 만들 수 있습니다. 이 접근 방식은 코드 재사용과 관심사 분리를 촉진하여 컴포넌트를 더 쉽게 유지하고 이해하기 쉽게 만듭니다.

## 훅을 사용하여 데이터 가져오기

<div class="content-ad"></div>

리액트 훅을 사용하면 클래스를 작성하지 않고도 상태 및 기타 리액트 기능을 사용할 수 있습니다. useFetch는 API에서 데이터를 가져오는 커스텀 훅입니다:

```js
// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cleanup logic if needed
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
```

이 훅은 데이터 가져오기 상태, 데이터 저장 및 오류 처리를 처리하여 컴포넌트에서 데이터를 쉽게 가져와 표시할 수 있습니다.

## 앱 조립하기

<div class="content-ad"></div>

마지막으로, App 컴포넌트에서 모든 것을 하나로 통합합니다:

```js
// src/App.js
import React from 'react';
import withLoading from './hocs/withLoading';
import withErrorHandling from './hocs/withErrorHandling'; // 새로운 HOC 추가
import useFetch from './hooks/useFetch';
import List from './components/List';

const ListWithLoading = withLoading(List);
const ListWithErrorHandling = withErrorHandling(ListWithLoading); // ListWithLoading 컴포넌트에 에러 처리 추가

const App = () => {
  const { data, isLoading, error } = useFetch('https://api.example.com/data');

  return (
    <div>
      <h1>List Component</h1>
      <ListWithErrorHandling data={data} isLoading={isLoading} error={error} /> {/* 에러가 발생하면 ListWithLoading 컴포넌트로 전달됩니다 */}
    </div>
  );
};

export default App;
```

useFetch 훅을 사용하여 데이터를 로드하고 HOC를 통해 로딩 및 에러 처리 기능이 추가된 List 컴포넌트에 전달합니다.

## 결론

<div class="content-ad"></div>

프로처럼 컴포넌트를 작성하려면 더 큰 그림을 고려하는 것이 중요합니다. 읽기 쉽고 유지보수 및 재사용이 용이한 컴포넌트를 만드는 것이죠. HOCs와 훅과 같은 패턴을 사용하여 시간이 지나도 유지보수가 용이하고 효율적인 코드베이스를 만들 수 있습니다.

코딩을 즐기세요!

# 평문으로 쓴 것 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 나가시기 전에:

<div class="content-ad"></div>

- 작가를 박수로 응원하고 팔로우 해 주세요! 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요.