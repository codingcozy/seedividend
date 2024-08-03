---
title: "리액트에서 useQuery 훅으로 데이터 가져오고 캐싱하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "useQuery hook in React"
link: "https://medium.com/@bhairabpatra.iitd/usequery-hook-in-react-b06ef604ea46"
---



리액트에서 useQuery 훅은 리액트 자체에 내장된 훅이 아닙니다. 대신에 일반적으로 React Query와 같은 상태 관리 라이브러리와 연관되어 사용됩니다.

React Query는 리액트 애플리케이션에서 데이터 가져오기를 관리하고 캐시하며 동기화하는 데 도움이 되는 라이브러리입니다.

다음은 React Query와 useQuery 훅을 사용하는 예제입니다:

## 사용하기 전에 프로젝트에 React Query를 설치해야 합니다:

<div class="content-ad"></div>

```js
npm install react-query
```

```js
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const Prodcuts = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchProducts = async () => {
    const response = await axios.get(apiUrl);
    return response?.data;
  };

  const { data, isLoading, error, refetch } = useQuery("productData", () =>
    fetchProducts()
  );

  if (isLoading) {
    return <h1>로딩 중...</h1>;
  }

  if (error) {
    return <p className="error">{error.message}</p>;
  }

  return (
    <div className="container">
      <ul>
        {data?.map((product) => (
          <li key={product?.id}>{product?.title}</li>
        ))}
      </ul>
      <button onClick={refetch} className="btn btn-primary btn-md">
        새로고침
      </button>
    </div>
  );
};

export default Prodcuts;
```

## 이 예시에서

- useQuery를 사용하여 'productData' 라는 키로 데이터를 가져오고 관리합니다.
- fetchProducts 함수는 데이터를 가져오는 역할을 합니다 (원하는 데이터 가져오기 로직으로 대체해야 합니다).
- 이 훅은 데이터, 에러, 로딩중 여부 속성을 가진 객체를 반환하며, 데이터 가져오는 과정의 다른 상태를 처리하는 데 사용할 수 있습니다.
- 컴포넌트는 쿼리의 상태에 따라 로딩, 에러 또는 데이터 컨텐츠를 렌더링합니다.
- React Query를 프로젝트에 설치한 후 사용하기 바랍니다.```

<div class="content-ad"></div>

## React Query의 useQuery 훅에서 refetch란 무엇인가요?

React Query의 useQuery 훅에서, refetch 함수는 데이터를 수동으로 다시 불러올 수 있는 기능을 제공합니다. 이는 특히 사용자 조치나 이벤트로 인해 데이터를 다시 불러와야 할 때 유용합니다.

```js
import React from "react";
import { useQuery } from "react-query";

const fetchData = async () => {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  return data;
};

const MyComponent = () => {
  const { data, isLoading, isError, refetch } = useQuery("myData", fetchData);

  const handleRefresh = () => {
    // 데이터를 수동으로 다시 불러옵니다
    refetch();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data</p>;
  }

  return (
    <div>
      <h1>Data:</h1>
      <button onClick={handleRefresh}>Refresh</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;
```

## 이 예시에서:

<div class="content-ad"></div>

- refetch 함수는 useQuery 훅에서 얻어지며, 수동 데이터 재검색을 트리거할 수 있습니다.
- 사용자가 "새로고침" 버튼을 클릭했을 때 refetch를 호출하는 handleRefresh 함수가 생성됩니다.
- refetch()를 호출하면 useQuery에 제공된 fetchData 함수를 다시 실행하여 데이터를 다시 소스에서 가져옵니다.

이 수동 재검색 기능은 React Query의 자동 재검색에 의존하지 않고 사용자에게 데이터를 새로 고칠 수 있는 능력을 제공하고 싶을 때 유용합니다.
