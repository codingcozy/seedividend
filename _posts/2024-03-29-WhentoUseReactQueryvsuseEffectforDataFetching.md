---
title: "리액트 쿼리와 useEffect를 사용 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "When to Use React Query vs useEffect for Data Fetching"
link: "https://medium.com/@tommyhc/when-to-use-react-query-vs-useeffect-for-data-fetching-2412a8a70641"
---



React 앱을 개발할 때 API에서 데이터를 가져와야 할 때가 있습니다.

이를 수행하는 두 가지 주요 방법이 있습니다 — useEffect 훅 또는 React Query를 사용하는 것입니다.

하지만 각각 언제 사용해야 할까요?

<div class="content-ad"></div>

이 포스트에서는 데이터 가져오기에 대한 React Query와 useEffect를 비교하고 각각 언제 사용해야 하는지에 대한 권장 사항을 제시하겠습니다.

## 데이터 가져오기를 위한 useEffect Hook

오랫동안 React에서 데이터를 가져오는 방법으로 사용된 것이 바로 useEffect 훅입니다.

다음은 간단한 예시입니다:

<div class="content-ad"></div>

```js
import { useState, useEffect } from "react";

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/data");
      const json = await response.json();
      setData(json);
    }

    fetchData();
  }, []); // 비어 있는 배열은 한 번만 실행

  return <div>{data}</div>;
}
```

기본적인 케이스에 대해 잘 동작합니다. 마운트 시 데이터를 가져와 컴포넌트의 상태에 저장합니다.

그러나 useEffect에는 몇 가지 단점이 있습니다:

- 캐싱 X — 모든 렌더링마다 다시 가져옴
- 내장된 에러 처리 X
- 로딩 상태와 에러 상태를 수동으로 추적해야 함

<div class="content-ad"></div>

여기가 React Query가 등장하는 곳이에요…

## 스마트 데이터 가져오기를 위한 React Query

React Query는 데이터 가져오기, 캐싱, 동기화 및 서버 상태 업데이트와 같은 까다로운 부분을 처리하는 라이브러리에요.

그것은 raw useEffect 접근 방식보다 여러 가지면에서 개선되어 있어요:

<div class="content-ad"></div>

- 캐싱 - 쿼리 결과가 변경되지 않는 한 캐시되고 재사용됨
- 중복 제거 - 중복된 요청이 없음
- 오류 처리 - 오류가 잡히고 공손하게 처리됨
- 로딩 상태 - 데이터 가져올 때 내장된 로딩 인디케이터 표시
- 데이터가 변경될 때 자동으로 다시 가져오기
- SSR 지원

다음은 React Query 접근의 예시입니다:

```js
import { useQuery } from "react-query";
function MyComponent() {
  const { data, error, isLoading } = useQuery("data", async () => {
    const response = await fetch("/api/data");
    return response.json();
  });
  if (isLoading) return "로딩 중...";
  if (error) return "오류가 발생했습니다";
  return <div>{data}</div>;
}
```

훨씬 깔끔해 보이죠!

<div class="content-ad"></div>

React Query는 캐싱, 로딩 상태, 에러 처리 등을 기본적으로 처리해줘요.

## 각각을 언제 사용해야 하나요?

그래서 언제 각 방법을 사용해야 할까요?

여기 제 개인적인 지침이 있어요:

<div class="content-ad"></div>

- 한 번만 데이터가 필요한 경우나 간단한 작업(예: 폼)에는 useEffect를 사용합니다.
- 여러 컴포넌트 간에 데이터를 재사용하거나 오류 처리가 복잡한 경우에는 React Query를 사용합니다.

React Query를 사용하지 않는 주된 이유는 간결함과 핵심 기능 집합 외의 사용자 정의 동작이 필요한 경우입니다.

하지만 대부분의 실제 상황에서는 특히 컴포넌트 간 데이터를 공유하고 다시 가져와야 할 때 React Query를 사용하면 시간과 머리 아픈 문제를 해결할 수 있습니다.

다음 프로젝트에서 한번 시도해보세요!

<div class="content-ad"></div>

이 개요가 React Query와 useEffect가 가장 적합한 시나리오를 설명하는 데 도움이 되기를 바랍니다.

도움이 되었기를 바랍니다!
