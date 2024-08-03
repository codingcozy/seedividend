---
title: "Nextjs 13 클라이언트 사이드에서 데이터 가져오기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "클라이언트 측 데이터 가져오기"
link: "undefined"
---



# 클라이언트 측 데이터 가져오기

클라이언트 측 데이터 가져오기는 페이지가 SEO 색인을 필요로하지 않거나 데이터를 사전 렌더링할 필요가 없을 때, 또는 페이지 내용이 자주 업데이트되어야 할 때 유용합니다. 서버 측 렌더링 API와 달리, 컴포넌트 수준에서 클라이언트 측 데이터 가져오기를 사용할 수 있습니다.

페이지 수준에서 수행하면 데이터가 런타임에서 가져와지고 페이지의 내용이 데이터 변경에 따라 업데이트됩니다. 컴포넌트 수준에서 사용하면 데이터가 컴포넌트가 마운트될 때 가져와지고 데이터 변경에 따라 컴포넌트의 내용이 업데이트됩니다.

클라이언트 측 데이터 가져오기를 사용하면 응용 프로그램의 성능 및 페이지의 로드 속도에 영향을 줄 수 있습니다. 이는 데이터 가져오기가 컴포넌트 또는 페이지 마운트 시에 수행되고 데이터가 캐시되지 않기 때문입니다.

<div class="content-ad"></div>

## useEffect을 사용한 클라이언트 측 데이터 가져 오기

다음 예제는 useEffect 훅을 사용하여 클라이언트 측에서 데이터를 가져 오는 방법을 보여줍니다.

```js
import { useState, useEffect } from "react";

function Profile() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile-data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  );
}
```

## SWR을 사용한 클라이언트 측 데이터 가져오기

<div class="content-ad"></div>

Next.js 팀에서는 데이터 가져오기용으로 React 훅 라이브러리인 SWR을 만들었습니다. 클라이언트 측에서 데이터를 가져올 때 매우 유용하며, 캐싱, 재유효화, 포커스 추적, 간격별 다시 가져오기 등을 처리합니다.

위의 예제와 동일한 방법으로, 이제 SWR을 사용하여 프로필 데이터를 가져올 수 있습니다. SWR은 데이터를 자동으로 캐시하고 데이터가 오래된 경우 다시 유효화합니다.

SWR 사용에 대한 자세한 정보는 SWR 문서를 확인하세요.

```js
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Profile() {
  const { data, error } = useSWR("/api/profile-data", fetcher);

  if (error) return <div>로드 실패</div>;
  if (!data) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  );
}
```

<div class="content-ad"></div>
