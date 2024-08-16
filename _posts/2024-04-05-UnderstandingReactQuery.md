---
title: "React 리액트 쿼리로 데이터 가져오기 간단하게 하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Understanding React Query"
link: "https://medium.com/bina-nusantara-it-division/understanding-react-query-11e56960e90c"
isUpdated: true
---





## 리액트 애플리케이션에서 데이터 가져오기 간소화

![이미지](/assets/img/UnderstandingReactQuery_0.png)

React Query는 TanStack에서 개발한 강력한 라이브러리로, 리액트 애플리케이션에서 데이터 가져오기와 상태 관리를 간단하게 만들어줍니다. 원격 데이터를 쉽게 관리하고 UI와 동기화하는 간단한 방법을 제공합니다. 이 글에서는 리액트 애플리케이션에서 React Query와 주요 기능, 그리고 시작하는 방법을 소개하겠습니다.

# React Query란 무엇인가요?

<div class="content-ad"></div>

React Query는 React 애플리케이션에서 데이터 가져오기와 캐싱을 간단하게 처리하도록 설계된 JavaScript 라이브러리입니다. 이는 useQuery 및 useMutation과 같은 훅을 사용하여 REST API, GraphQL 또는 심지어 로컬 상태와 같은 다양한 소스에서 데이터를 관리할 수 있도록 도와줍니다.

# 주요 기능

- 선언적 데이터 가져오기: React Query는 데이터 가져오기에 선언적 접근을 장려합니다. useQuery 및 useMutation과 같은 훅을 사용하여 쿼리와 뮤테이션을 정의할 수 있습니다. 이로 인해 더 깔끔하고 조직화된 코드를 작성할 수 있습니다.
- 자동 캐싱: React Query에는 쿼리 결과를 저장하는 내장 캐시가 포함되어 있습니다. 뮤테이션이 발생할 때 자동으로 데이터를 업데이트하여 UI가 일관성을 유지합니다.
- 백그라운드 데이터 동기화: React Query는 수동 개입 없이 데이터를 자동으로 다시 가져와서 데이터를 신선하게 유지하는 데 도움을 줍니다.
- 페이지네이션 및 무한 스크롤: React Query는 페이지네이션 및 무한 스크롤을 쉽게 처리할 수 있는 유틸리티를 제공합니다.
- 낙관적 업데이트: 낙관적 업데이트를 쉽게 구현할 수 있어 앱이 더 반응적으로 느껴집니다.

# React Query로 시작하기

<div class="content-ad"></div>

React Query를 시작하는 것이 얼마나 간단한지 기본 예제를 살펴보겠습니다. 먼저 해야 할 일은 @tanstack/react-query 라이브러리를 설치하는 것입니다. 실행에는 npm을 사용하겠습니다.

```js
npm install @tanstack/react-query
```

우리 애플리케이션에 라이브러리가 설치되면 React Query를 사용하기 위해 프로바이더와 클라이언트를 생성하세요. src 폴더의 index.tsx 파일에 만들 수 있습니다.

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

<div class="content-ad"></div>

그 후에 React Query Hooks를 바로 사용할 수 있습니다. App.tsx스크립트에 적용해 봅시다.

```js
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

function App() {
  const userData = useQuery(
    ["users"],
    () => {
      return fetch("https://jsonplaceholder.typicode.com/users").then(
        (response) => response.json()
      );
    },
    {
      enabled: false,
    }
  );

  return (
    <div>
      <div>
        <button onClick={() => userData.refetch()}>유저 가져오기</button>
        <div>
          {userData.isFetching && <div>데이터 가져오는 중...</div>}
          {userData.isError && <div>{`데이터 가져오기 오류!!!`}</div>}
          {userData.data &&
            userData.data.length > 0 &&
            userData.data.map((user: any) => <div>{user.name}</div>)}
        </div>
      </div>
    </div>
  );
}

export default App;
```

이 예제에서는 useQuery를 사용하여 사용자 목록을 가져옵니다. React Query는 내부적으로 데이터 가져오는 상태, 오류 처리, 캐싱을 처리합니다.

<img src="https://miro.medium.com/v2/resize:fit:576/1*VMVis07NyntygP6-WrYLRg.gif" />

<div class="content-ad"></div>

Get Users버튼을 클릭하면 API에서 데이터를 가져옵니다. 데이터 양이 적기 때문에 데이터를 가져오는 프로세스가 너무 빨라서 거의 눈에 띄지 않을 수 있어요.

useQuery 이외에도 데이터를 변이하는 데 사용되는 useMutation이 있어요. 두 훅 모두 거의 비슷한 기능을 가지고 있지만 데이터를 변이하는 데 사용됩니다. 아래에 사용 예제를 보여드리겠습니다. 아래 코드를 추가해 보세요.

```js
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery, useMutation } from "@tanstack/react-query";

function App() {
  const userData = useQuery(
    ["users"],
    () => {
      return fetch("https://jsonplaceholder.typicode.com/users").then(
        (response) => response.json()
      );
    },
    {
      enabled: false,
    }
  );

  const mutatePost = useMutation(["posts"], (newPost: any) => {
    return fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
  });

  return (
    <div>
      <div>
        <button onClick={() => userData.refetch()}>Get Users</button>
        <div>
          {userData.isFetching && <div>사용자 데이터 가져오는 중...</div>}
          {userData.isError && <div>{`데이터 가져오는 중 에러 발생!!!`}</div>}
          {userData.data &&
            userData.data.length > 0 &&
            userData.data.map((user: any) => <div>{user.name}</div>)}
        </div>
      </div>
      <hr />
      <div>
        <button
          onClick={() =>
            mutatePost.mutate({
              title: "First Post",
              body: "First Post Body",
              userId: 1,
            })
          }
        >
          Add New Post
        </button>
        <div>
          {mutatePost.isLoading && <div>새로운 포스트 추가 중...</div>}
          {mutatePost.isError && (
            <div>{`새로운 포스트 추가하는 중 에러 발생!!!`}</div>
          )}
          {mutatePost.data && (
            <div>{`성공적으로 새로운 포스트 추가 : '${mutatePost.data.title}'`}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
```

위 예제에서 새로운 포스트를 추가하는 데 useMutation을 사용했습니다.

<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:820/1*8PXYBNVu3ySVOCbBytoD4Q.gif" />

# useQuery과 useMutation의 차이점

- 목적: useQuery는 데이터를 읽는 데 사용되고, useMutation은 데이터를 수정하는 데 사용됩니다.
- 전형적인 사용 사례: useQuery는 데이터를 가져와 표시할 때 사용되며, useMutation은 해당 데이터를 변경하고 싶을 때 사용됩니다.
- 반환 값: useQuery는 { data, error, isLoading, isFetching }를 반환하고, useMutation은 { mutate, data, error, isError, isLoading, isSuccess }를 반환합니다.
- 에러 처리: 두 훅 모두 에러를 처리하지만, useMutation은 낙관적 업데이트 및 뮤테이션 중 에러 발생 시 롤백 처리를 위한 추가 기능을 제공합니다.

# 결론

<div class="content-ad"></div>

리액트 쿼리는 리액트 생태계에 귀중한 추가 요소로, 데이터 가져오기와 동기화를 이전보다 쉽게 만들어줍니다. 작은 애플리케이션을 개발하거나 대규모 프로젝트를 구축하든 상관없이, 리액트 쿼리의 간결함과 강력한 기능을 통해 데이터를 효과적으로 관리할 수 있습니다.

데이터 관리를 간소화함으로써, 리액트 쿼리는 애플리케이션 기능 구축에 집중하고 더 나은 사용자 경험을 제공할 수 있게 해줍니다. 다음 리액트 프로젝트에서 한번 시도해보세요. 아마도 리액트 쿼리 없이 데이터를 어떻게 관리했는지 궁금해질지도 모릅니다.

# 참고 자료

- https://tanstack.com/query/latest/docs/react/overview
- https://github.com/TanStack/query
- https://blog.logrocket.com/deep-dive-mutations-tanstack-query/
- https://thesyntaxdiaries.com/what-is-react-query-how-to-use-usemutation-usequery-prefetch-devtools/
