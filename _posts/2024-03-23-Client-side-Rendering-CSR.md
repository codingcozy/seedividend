---
title: "Nextjs 13 클라이언트 사이드 렌더링 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "고객 측 렌더링 CSR"
link: "undefined"
---



# 클라이언트 측 렌더링 (CSR)

리액트를 사용한 클라이언트 측 렌더링(CSR)에서는 브라우저가 최소한의 HTML 페이지와 페이지에 필요한 JavaScript를 다운로드합니다. 그런 다음 JavaScript를 사용하여 DOM을 업데이트하고 페이지를 렌더링합니다. 애플리케이션이 처음으로 로드될 때 사용자는 페이지가 완전히 렌더링될 때까지 약간의 지연을 느낄 수 있습니다. 이는 페이지가 JavaScript를 모두 다운로드하고 구문 분석하며 실행될 때까지 완전히 렌더링되지 않기 때문입니다.

페이지가 처음으로로드 된 후에는 동일한 웹 사이트의 다른 페이지로 이동하는 것이 일반적으로 더 빠릅니다. 필요한 데이터만 가져오면 되기 때문에 JavaScript가 전체 페이지 새로고침 없이 페이지 일부를 다시 렌더링할 수 있습니다.

Next.js에서는 클라이언트 측 렌더링을 구현하는 두 가지 방법이 있습니다:

<div class="content-ad"></div>

- 서버 측 렌더링 방법인 getStaticProps 및 getServerSideProps 대신 페이지 내에서 React의 useEffect() 훅을 사용하세요.
- 데이터를 가져오는 라이브러리인 SWR 또는 TanStack Query를 사용하여 클라이언트에서 데이터를 가져오세요 (권장됨).

다음은 Next.js 페이지 내에서 useEffect()를 사용하는 예시입니다:

```js
import React, { useState, useEffect } from "react";

export function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.example.com/data");
      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    };

    fetchData().catch((e) => {
      // 필요에 따라 오류 처리
      console.error("데이터를 가져오는 중 오류가 발생했습니다: ", e);
    });
  }, []);

  return <p>{data ? `당신의 데이터: ${data}` : "로딩 중..."}</p>;
}
```

위 예시에서 컴포넌트는 처음에 Loading...을 렌더링합니다. 그런 다음 데이터를 가져오면 다시 렌더링되어 데이터를 표시합니다.

<div class="content-ad"></div>

이전 React 애플리케이션에서 볼 수 있는 useEffect 내에서 데이터 가져오기는 일반적인 패턴이지만, 성능, 캐싱, 낙관적 업데이트 등을 위해 데이터 가져오기 라이브러리를 사용하는 것을 권장합니다. 여기 SWR을 사용해서 클라이언트에서 데이터를 가져오는 최소 예제가 있습니다:

```js
import useSWR from "swr";

export function Page() {
  const { data, error, isLoading } = useSWR("https://api.example.com/data", fetcher);

  if (error) return <p>로드 실패.</p>;
  if (isLoading) return <p>로딩 중...</p>;

  return <p>당신의 데이터: {data}</p>;
}
```

> 알아두면 좋은 점:
> CSR이 SEO에 영향을 미칠 수 있다는 것을 염두에 두세요. 일부 검색 엔진 크롤러는 JavaScript를 실행하지 않을 수 있으며, 따라서 애플리케이션의 초기 빈 상태나 로딩 상태만 볼 수 있을 수 있습니다. 이는 또한 느린 인터넷 연결이나 장치를 사용하는 사용자에게 성능 문제를 야기할 수 있으며, 전체 페이지를 볼 수 있기 전에 모든 JavaScript를 로드하고 실행해야 합니다. Next.js는 애플리케이션의 각 페이지의 요구에 따라 서버사이드 렌더링, 정적 사이트 생성 및 클라이언트사이드 렌더링을 조합하여 사용할 수 있는 하이브리드 접근 방식을 촉진합니다. App Router에서는 페이지 렌더링 중 로딩 인디케이터를 표시하기 위해 Suspense를 사용할 수도 있습니다.

<div class="content-ad"></div>
