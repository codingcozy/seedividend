---
title: "Nextjs 13 getServerSideProps 사용 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "getServerSideProps"
link: "undefined"
isUpdated: true
---





# getServerSideProps

getServerSideProps는 요청 시 데이터를 가져와 페이지의 내용을 렌더링하는 데 사용할 수 있는 Next.js 함수입니다.

## 예제

getServerSideProps를 사용하려면 페이지 구성 요소에서 내보내야합니다. 아래 예제는 getServerSideProps에서 제 3자 API에서 데이터를 가져와 해당 데이터를 페이지에 속성으로 전달하는 방법을 보여줍니다:

<div class="content-ad"></div>

```typescript
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Repo = {
  name: string;
  stargazers_count: number;
};

export const getServerSideProps = (async () => {
  // 외부 API에서 데이터 가져오기
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo: Repo = await res.json();
  // 데이터를 props를 통해 페이지에 전달
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: Repo }>;

export default function Page({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <p>{repo.stargazers_count}</p>
    </main>
  );
}
```

## getServerSideProps를 언제 사용해야 하나요?

getServerSideProps는 사용자 정의 사용자 데이터에 의존하거나 요청 시에만 알 수 있는 정보를 사용하여 페이지를 렌더링해야 할 때 사용해야 합니다. 예를 들어, 인가 헤더나 지리적 위치 정보와 같은 경우입니다.

요청 시 데이터를 가져올 필요가 없거나 데이터와 미리 렌더링된 HTML을 캐시하고자 하는 경우에는 getStaticProps를 사용하는 것이 좋습니다.

<div class="content-ad"></div>

## 동작

- getServerSideProps는 서버에서 실행됩니다.
- getServerSideProps는 페이지에서만 내보낼 수 있습니다.
- getServerSideProps는 JSON을 반환합니다.
- 사용자가 페이지를 방문할 때 getServerSideProps가 요청 시간에 데이터를 가져오고 해당 데이터를 페이지의 초기 HTML 렌더링에 사용합니다.
- 페이지 구성 요소로 전달된 props은 초기 HTML의 일부로 클라이언트에서 볼 수 있습니다. 이는 페이지가 올바르게 수분화되도록 하기 위한 것입니다. props에 클라이언트에서 사용할 수 없어야 하는 민감한 정보를 전달하지 않도록 주의하세요.
- 사용자가 next/link 또는 next/router를 통해 페이지를 방문할 때, Next.js는 서버로 API 요청을 보내어 getServerSideProps를 실행합니다.
- getServerSideProps를 사용할 때는 서버에서 함수가 실행되므로 데이터를 가져오기 위해 Next.js API Route를 호출할 필요가 없습니다. 대신 getServerSideProps 내부에서 CMS, 데이터베이스 또는 기타 타사 API를 직접 호출할 수 있습니다.

> 알면 좋은 사항: getServerSideProps API 참조를 보고 getServerSideProps와 함께 사용할 수 있는 매개변수 및 props를 확인할 수 있습니다.
> Next.js가 클라이언트 측 번들에서 제거하는 항목을 확인하려면 next-code-elimination 도구를 사용할 수 있습니다.

## 에러 처리

<div class="content-ad"></div>

getServerSideProps 내에서 오류가 발생하면 pages/500.js 파일이 표시됩니다. 500 페이지에 대해 자세히 알아보려면 문서를 확인해보세요. 개발 중에는 이 파일을 사용하지 않고 대신 개발 오류 오버레이가 표시됩니다.

## 특수한 경우

### Edge 런타임

getServerSideProps는 서버리스 및 Edge 런타임 양쪽에서 사용할 수 있으며 두 곳에서 props를 설정할 수 있습니다.

<div class="content-ad"></div>

Edge Runtime에서는 현재 응답 객체에 액세스할 수 없습니다. 따라서 getServerSideProps에서 쿠키를 추가할 수 없습니다. 응답 객체에 액세스하려면 기본 런타임인 Node.js 런타임을 계속 사용해야 합니다.

예를 들어 구성을 수정하여 페이지별로 런타임을 명시적으로 설정할 수 있습니다.

```js
export const config = {
  runtime: "nodejs", // 또는 "edge"
};

export const getServerSideProps = async () => {};
```

### 서버 측 렌더링(SSR)으로 캐싱하기

<div class="content-ad"></div>

동적 응답을 캐시하는 데 getServerSideProps 내에서 캐싱 헤더(Cache-Control)를 사용할 수 있습니다. 예를 들어 stale-while-revalidate을 사용할 수 있어요.

```js
// 이 값은 10초 동안 새로운 것으로 간주됩니다 (s-maxage=10).
// 만약 10초 내에 요청이 반복되면, 이전에 캐시된 값은 여전히 새로운 상태로 유지됩니다. 59초 전에 요청을 반복하면,
// 캐시된 값은 오래된 상태이지만 여전히 렌더링합니다 (stale-while-revalidate=59).
//
// 백그라운드에서 갱신 요청이 이루어져 새로운 값으로 캐시가 채워지게 됩니다. 페이지를 새로고침하면 새 값을 볼 수 있습니다.
export async function getServerSideProps({ req, res }) {
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  return {
    props: {},
  };
}
```

그러나 Cache-Control을 사용하기 전에, getStaticProps로 ISR이 사용 사례에 더 적합한지 확인하는 것이 좋습니다.

<div class="content-ad"></div>
