---
title: "Nextjs 13 getStaticPaths 사용 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "getStaticPaths"
link: "undefined"
---



# getStaticPaths

만약 페이지가 동적 라우트를 가지고 있고 getStaticProps를 사용한다면, 정적으로 생성될 경로 목록을 정의해야 합니다.

동적 라우트를 사용하는 페이지에서 getStaticPaths(정적 사이트 생성)라는 함수를 내보낼 때, Next.js는 getStaticPaths에서 지정된 모든 경로를 정적으로 프리 렌더링합니다.

```typescript
import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from "next";

type Repo = {
  name: string;
  stargazers_count: number;
};

export const getStaticPaths = (async () => {
  return {
    paths: [
      {
        params: {
          name: "next.js",
        },
      }, // 아래 "paths" 섹션 참조
    ],
    fallback: true, // false 또는 "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo = await res.json();
  return { props: { repo } };
}) satisfies GetStaticProps<{
  repo: Repo;
}>;

export default function Page({ repo }: InferGetStaticPropsType<typeof getStaticProps>) {
  return repo.stargazers_count;
}
```

<div class="content-ad"></div>

getStaticPaths API 참조에서는 getStaticPaths와 함께 사용할 수 있는 모든 매개변수와 프롭에 대해 다룹니다.

## getStaticPaths를 언제 사용해야 하나요?

getStaticPaths는 다음과 같은 경우에 사용해야 합니다:

- 동적 경로를 사용하는 페이지를 정적으로 미리 렌더링하는 경우
- 데이터가 headless CMS에서 오는 경우
- 데이터가 데이터베이스에서 오는 경우
- 데이터가 파일 시스템에서 오는 경우
- 데이터가 공개 캐시될 수 있는 경우 (사용자별이 아닌)
- 페이지가 사전 렌더링되어야 하며 (SEO를 위해) 매우 빨라야 하는 경우 — getStaticProps는 HTML 및 JSON 파일을 생성하며, 이 두 파일은 성능을 위해 CDN에 의해 캐시될 수 있습니다

<div class="content-ad"></div>

## getStaticPaths가 언제 실행되나요?

getStaticPaths는 프로덕션 빌드 중에만 실행되며, 런타임 중에는 호출되지 않습니다. getStaticPaths 내에서 작성된 코드가 클라이언트 측 번들에서 제거되었는지 확인할 수 있는 도구가 있습니다.

### getStaticProps가 getStaticPaths와 어떻게 작동하나요?

- getStaticProps는 빌드 중 반환된 모든 경로에 대해 다음 빌드 중에 실행됩니다.
- fallback: true를 사용할 때 getStaticProps는 백그라운드에서 실행됩니다.
- fallback: blocking을 사용할 때 getStaticProps는 초기 렌더링 전에 호출됩니다.

<div class="content-ad"></div>

## getStaticPaths를 어디에 사용해야 하나요?

- getStaticPaths는 getStaticProps와 함께 사용되어야 합니다.
- getServerSideProps와 getStaticPaths를 함께 사용할 수 없습니다.
- getStaticProps도 사용하는 동적 경로에서 getStaticPaths를 내보낼 수 있습니다.
- 페이지 파일이 아닌 파일(예: 컴포넌트 폴더)에서 getStaticPaths를 내보낼 수 없습니다.
- getStaticPaths를 페이지 컴포넌트의 속성으로 내보내지 말고 독립된 함수로 내보내야 합니다.

## 개발 환경에서 모든 요청에 대해 실행됩니다

개발 환경에서 (next dev), getStaticPaths는 모든 요청 시마다 호출됩니다.

<div class="content-ad"></div>

## 필요한 때 경로 생성하기

getStaticPaths를 사용하면 빌드 중에 필요한 대신 폴백으로 생성할 페이지를 제어할 수 있습니다. 빌드 중에 더 많은 페이지를 생성하면 느린 빌드를 유발할 수 있습니다.

paths에 빈 배열을 반환하여 모든 페이지를 필요한 때에만 생성하도록 연기할 수 있습니다. 특히 Next.js 애플리케이션을 여러 환경에 배포할 때 유용합니다. 예를 들어 미리보기용으로 모든 페이지를 필요할 때에만 생성하여 빌드를 가속화할 수 있습니다(제품용 빌드는 제외). 이 방법은 수백 개 또는 수천 개의 정적 페이지가 있는 사이트에 유용합니다.

```js
export async function getStaticPaths() {
  // 이 값이 true면 (미리보기 환경에서) 정적 페이지를 미리 렌더링하지 않습니다
  // (빠른 빌드, 하지만 초기 페이지 로드가 느립니다)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  // 포스트를 가져 오기 위해 외부 API 엔드포인트 호출
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // 포스트를 기반으로 미리 렌더링하려는 경로 가져 오기
  // 제품 환경에서는 모든 페이지 미리 렌더링
  // (느린 빌드, 하지만 초기 페이지 로드가 빠릅니다)
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // { fallback: false }는 기타 경로를 404로 처리해야 함을 의미합니다
  return { paths, fallback: false };
}
```

<div class="content-ad"></div>
