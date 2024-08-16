---
title: "React 19 다가오는 변화에 대비하세요"
description: ""
coverImage: "/assets/img/2024-05-12-React19GetReadyForWhatsComing_0.png"
date: 2024-05-12 21:09
ogImage: 
  url: /assets/img/2024-05-12-React19GetReadyForWhatsComing_0.png
tag: Tech
originalTitle: "React 19: Get Ready For What’s Coming."
link: "https://medium.com/javascript-in-plain-english/react-19-get-ready-for-whats-coming-87ccf9ca7147"
isUpdated: true
---




![React 19](/assets/img/2024-05-12-React19GetReadyForWhatsComing_0.png)

리액트 19, 어떤 경우에도 공개될 수 있고, 모든 리액트 개발자들이 사용하고 싶어할 것입니다. 왜냐하면 최신 버전이 훨씬 더 나아졌기 때문이죠. 다가올 변화 중 일부를 살펴보겠습니다.

## 리액트 컴파일러: 리액트 핵심 최적화

오랫동안, 리액트 개발자들은 useMemo, useCallback, memo 훅을 활용하여 애플리케이션을 최적화하고 불필요한 다시 렌더링을 방지했습니다. 이로 인해 종종 어색한 코드가 만들어지곤 했는데, 이를 더 우아한 해결책을 찾게끔 할 것이라는 리액트 개발팀이 약속했습니다.



그래서 정확히 그것이 React 19에서 제공되는 것입니다: 새로운 React 컴파일러. 이 컴파일러는 코드를 분석하여 상태 변경이 발생할 때 UI의 어떤 부분을 다시 렌더링해야 하는지 결정함으로써 React의 렌더링 프로세스를 자동으로 최적화하는 데 설계되었습니다.

React 컴파일러가 간단한 컴포넌트를 어떻게 최적화하는지 예시를 살펴봅시다:

```js
import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

React 컴파일러 없이 count 상태를 업데이트하면 `button` 요소를 포함한 전체 컴포넌트가 다시 렌더링됩니다. 그러나 해당 내용과 동작이 변경되지 않는 한 개선 없이 렌더링됩니다. 반면에 React 컴파일러를 사용하면 count를 보여주는 `p` 요소만 다시 렌더링되어 성능이 향상되고 오버헤드가 감소합니다.



## 작업: 데이터 처리 간소화

리액트 컴파일러에 추가로, 리액트 19에서는 Actions라는 강력한 새로운 기능이 소개되었습니다.

Actions를 사용하면 `form`과 같은 DOM 요소에 함수를 전달하여 폼 제출, 데이터 변이 및 기타 데이터 관련 작업을 손쉽게 처리할 수 있습니다. 아래는 예시입니다:

```js
import React from 'react';

function SearchForm({ action }) {
  return (
    <form action={action}>
      <input name="query" />
      <button type="submit">검색</button>
    </form>
  );
}

function App() {
  const search = async (data) => {
    const response = await fetch(`/api/search?q=${data.query}`);
    const results = await response.json();
    // 검색 결과로 UI 업데이트
  };

  return <SearchForm action={search} />;
}
```



이 예시에서 SearchForm 컴포넌트는 액션 prop을 받습니다. 이 prop은 폼이 제출될 때 실행될 함수입니다. App 컴포넌트는 검색 함수를 정의합니다. 이 함수는 서버로 fetch 요청을 보내고 응답을 처리합니다.

액션은 클라이언트 측에서 표준 JavaScript를 사용하여 또는 `use server` 지시문을 사용하여 서버에서 정의할 수 있습니다. React는 데이터 제출의 라이프사이클을 관리하며, useFormStatus 및 useActionState와 같은 훅을 제공하여 폼 액션의 현재 상태와 응답에 액세스할 수 있습니다.

기본적으로, 액션은 전환 내에서 제출되어 현재 페이지를 상호작용적으로 유지합니다. React 19에서는 전환 내에서 async/await를 사용하여 비동기 요청이 진행 중일 때 대기 중 UI를 보여줄 수 있는 기능도 소개되었습니다.

액션을 보완하는 것은 useOptimistic 훅입니다. 이 훅을 사용하면 개발자가 낙관적인 상태 업데이트를 관리할 수 있습니다. 이 훅을 사용하면 임시 업데이트가 적용되고 최종 상태가 확정되면 자동으로 되돌립니다. 이 기능을 사용하면 낙관적 UI 업데이트를 할 수 있으며, 제출이 성공하면 서버에서 제공된 데이터로 자연스럽게 되돌아갈 수 있습니다.



## React 서버 구성 요소: 서버 측 렌더링을 더욱 진보시키다.

React 19에서 가장 기대되는 기능 중 하나는 React Server Components (RSC)의 도입입니다.

RSC를 사용하면 개발자는 `use server` 지시어를 사용하여 특정 구성 요소를 "서버" 구성 요소로 표시할 수 있습니다. 이러한 구성 요소는 서버에서 렌더링되어 정적 HTML로 클라이언트로 스트리밍되어 초기 JavaScript 페이로드를 줄이고 성능을 향상시킵니다.

다음은 RSC를 사용하는 예시입니다:



```jsx
// PostContent.server.jsx
import React, { useState, useEffect } from 'react';
import fetchPost from './fetchPost';

export default async function PostContent({ id }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      const postData = await fetchPost(id);
      setPost(postData);
    };
    fetchPostData();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

이 예제에서 PostContent 컴포넌트는 .server.jsx 파일 확장자를 사용하여 서버 컴포넌트로 표시됩니다. 서버에서 렌더링될 때 fetchPost 함수가 실행되고 결과로 나온 게시물 데이터가 정적 HTML로 렌더링되어 클라이언트로 스트리밍됩니다.

RSC와 액션을 결합하면 클라이언트 및 서버 환경에서 일관된 프로그래밍 모델로 풀 스택 앱을 만들 수 있습니다.

## 리액트 개발의 미래를 받아들이기



React 19 컴파일러는 렌더링 프로세스를 대폭 가속화하고 불필요한 다시 렌더링을 줄일 것입니다. Meta Devs가 릴리스하는 내용을 항상 주시하시고 큰 날을 위해 준비하세요.

출처: React Labs: 우리가 작업 중인 내용 — 2024년 2월 — React

# 평문으로 간단히 🚀

In Plain English 커뮤니티의 일부로 함께해 주셔서 감사합니다! 떠나시기 전에:



- 작가에게 박수를 보내고 팔로우를 눌러주세요! 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 컨텐츠를 다루도록 강요하는 블로그 플랫폼에 지쳤나요? Differ를 시도해보세요!
- 더 많은 콘텐츠는 PlainEnglish.io에서 확인하세요.