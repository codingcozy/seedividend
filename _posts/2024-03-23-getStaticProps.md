---
title: "Nextjs 13 - getStaticProps 사용 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "getStaticProps"
link: "undefined"
isUpdated: true
---

# getStaticProps

만약 페이지에서 getStaticProps(정적 사이트 생성)라는 함수를 내보내면 Next.js가 이 함수가 반환한 props를 사용하여 해당 페이지를 빌드 시 미리 렌더링합니다.

```typescript
import type { InferGetStaticPropsType, GetStaticProps } from "next";

type Repo = {
  name: string;
  stargazers_count: number;
};

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

> 렌더링 유형과 관계없이 페이지 컴포넌트로 전달된 모든 props는 초기 HTML에서 클라이언트 측에서 볼 수 있습니다. 이것은 페이지가 올바르게 활성화되도록 하기 위함입니다. props에 클라이언트에서 사용할 수 없어야 하는 민감한 정보를 전달하지 않도록 주의하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## `getStaticProps`을 언제 사용해야 하나요?

`getStaticProps`을 사용해야 하는 경우는 다음과 같습니다:

- 사용자 요청 보다 빌드 시간에 페이지를 렌더링하는 데 필요한 데이터가 이미 사용 가능한 경우
- 데이터가 headless CMS에서 가져오는 경우
- 페이지가 사전 렌더링(검색 엔진 최적화)되어야 하며 매우 빨라야 하는 경우 — `getStaticProps`은 HTML 및 JSON 파일을 생성하며 이 둘은 성능을 위해 CDN에 캐싱될 수 있습니다
- 데이터가 공개적으로 캐시될 수 있는 경우 (사용자별이 아닌 경우). 특정 상황에서 Middleware를 사용하여 경로를 변경함으로써 이 조건을 우회할 수 있습니다.

## 언제 `getStaticProps`이 실행되나요?

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

getStaticProps은 항상 서버에서 실행되고 클라이언트에서는 실행되지 않습니다. 이 도구를 사용하여 getStaticProps 안에 작성된 코드가 클라이언트 측 번들에서 제거되는지 확인할 수 있어요.

- getStaticProps은 항상 next 빌드 중에 실행됩니다.
- fallback: true를 사용할 때 getStaticProps는 백그라운드에서 실행됩니다.
- fallback: blocking을 사용할 때 getStaticProps는 초반 렌더링 전에 호출됩니다.
- revalidate를 사용할 때 getStaticProps는 백그라운드에서 실행됩니다.
- revalidate()를 사용할 때 getStaticProps는 필요할 때 백그라운드에서 실행됩니다.

Incremental Static Regeneration과 결합하면 getStaticProps은 새로 고침 페이지가 클라이언트로 제공되는 동안 오래된 페이지가 재확인되는 동안 백그라운드에서 실행됩니다.

getStaticProps은 요청(쿼리 매개변수 또는 HTTP 헤더와 같은)에 액세스할 수 없습니다. 정적 HTML을 생성하기 때문입니다. 페이지에 대한 요청에 액세스해야 하는 경우 Middleware를 getStaticProps에 추가하여 사용해 보세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## CMS에서 데이터를 가져오는 getStaticProps 사용

다음 예제에서는 CMS에서 블로그 포스트 목록을 가져오는 방법을 보여줍니다.

```typescript
// posts는 getStaticProps에 의해 빌드 시간에 채워집니다.
export default function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

// 이 함수는 서버 측에서 빌드 시간에 호출됩니다.
// 클라이언트 측에서는 호출되지 않으므로
// 직접 데이터베이스 쿼리도 가능합니다.
export async function getStaticProps() {
  // 포스트를 가져오기 위해 외부 API 엔드포인트 호출
  // 원하는 데이터 가져오는 라이브러리를 사용할 수 있습니다.
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // { props: { posts } }를 반환함으로써,
  // Blog 컴포넌트가 빌드 시간에 'posts'를 속성으로 받게 됩니다.
  return {
    props: {
      posts,
    },
  };
}
```

getStaticProps API 참조에서 getStaticProps와 함께 사용할 수 있는 모든 매개변수와 속성을 다루고 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 서버 측 코드를 직접 작성하세요

getStaticProps는 서버 측에서만 실행되기 때문에 클라이언트 측에서는 실행되지 않습니다. 브라우저를 위한 JS 번들에도 포함되지 않으므로 브라우저로 전송되지 않고 직접 데이터베이스 쿼리를 작성할 수 있습니다.

이는 getStaticProps에서 API 경로를 가져오는 대신(자체적으로 외부 소스에서 데이터를 가져오도록 함), getStaticProps에서 서버 측 코드를 직접 작성할 수 있음을 의미합니다.

다음 예제를 살펴보겠습니다. API 경로를 사용하여 CMS에서 데이터를 가져오는 경우가 있습니다. 그런 다음 해당 API 경로가 getStaticProps에서 직접 호출됩니다. 이렇게 하면 성능이 저하되는 추가 호출이 발생합니다. 대신 CMS에서 데이터를 가져오는 로직은 lib/ 디렉토리를 사용하여 공유함으로써 getStaticProps와 공유할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// 다음의 함수는 getStaticProps와 API 라우트에서
// lib/ 디렉토리로 공유됩니다
export async function loadPosts() {
  // 게시물을 가져오기 위해 외부 API 엔드포인트 호출
  const res = await fetch("https://.../posts/");
  const data = await res.json();

  return data;
}
```

```js
// pages/blog.js
import { loadPosts } from "../lib/load-posts";

// 이 함수는 서버 측에서만 실행됩니다
export async function getStaticProps() {
  // `/api` 루트를 가져오는 대신에
  // `getStaticProps`에서 동일한 함수를 직접 호출할 수 있습니다
  const posts = await loadPosts();

  // 반환된 props가 페이지 컴포넌트로 전달됩니다
  return { props: { posts } };
}
```

또는 데이터를 가져오기 위해 API 라우트를 사용하지 않는 경우, fetch() API를
getStaticProps에서 직접 사용할 수 있습니다.

Next.js가 클라이언트 측 번들에서 제거하는 항목을 확인하려면 next-code-elimination 도구를 사용할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 정적으로 HTML과 JSON을 생성합니다

getStaticProps가 포함된 페이지가 빌드 시간에 사전 렌더링될 때, 페이지 HTML 파일 외에도 Next.js는 getStaticProps를 실행한 결과를 보유하는 JSON 파일을 생성합니다.

이 JSON 파일은 next/link 또는 next/router를 통한 클라이언트 측 라우팅에서 사용됩니다. getStaticProps를 사용하여 사전 렌더링된 페이지로 이동하면 Next.js가 JSON 파일 (빌드 시간에 미리 계산된)을 가져와 페이지 구성 요소의 속성(props)으로 사용합니다. 이는 클라이언트 측 페이지 전환에서 getStaticProps가 호출되지 않는다는 것을 의미합니다. 출력된 JSON만 사용됩니다.

증분 정적 생성을 사용할 때, getStaticProps는 클라이언트 측 내비게이션에 필요한 JSON을 생성하기 위해 백그라운드에서 실행됩니다. 동일한 페이지에 대해 여러 요청이 발생할 수 있는 것을 볼 수 있지만, 이는 의도된 동작으로 최종 사용자 성능에 영향을 미치지 않습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## getStaticProps를 어디에서 사용할 수 있나요?

getStaticProps는 페이지에서만 내보낼 수 있습니다. 비페이지 파일, \_app, \_document 또는 \_error에서는 내보낼 수 없습니다.

이 제약 사항의 하나는 React가 페이지를 렌더링하기 전에 필요한 모든 데이터를 갖고 있어야하기 때문입니다.

또한 getStaticProps를 페이지 컴포넌트의 속성으로 추가하는 대신 독립적인 함수로 내보내야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

> 좋은 정보: 사용자 정의 앱을 만들었다면, 연결된 문서에 표시된 대로 페이지 구성 요소에 pageProps를 전달하는 것을 확인하십시오. 그렇지 않으면 프롭스가 비어 있을 수 있습니다.

## 개발환경에서 실행

개발환경에서(next dev), getStaticProps는 매 요청마다 호출됩니다.

## 미리보기 모드

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

'미리보기 모드'를 사용하면 정적 생성을 우회하여 페이지를 빌드 시간이 아닌 요청 시간에 렌더링할 수 있습니다. 예를 들어, 머리 없는 CMS를 사용하고 게시하기 전에 드래프트를 미리보고 싶을 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
