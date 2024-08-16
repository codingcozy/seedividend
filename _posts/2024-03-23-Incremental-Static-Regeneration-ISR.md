---
title: "Nextjs 13 ISR 사용해서 사이트 정적 재생성하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "증분 정적 재생성 ISR"
link: "undefined"
isUpdated: true
---





# 증분 정적 재생성 (ISR)

Next.js를 사용하면 사이트를 빌드한 후에 정적 페이지를 만들거나 업데이트할 수 있습니다. 증분 정적 재생성 (ISR)을 사용하면 전체 사이트를 다시 빌드할 필요 없이 페이지별로 정적 생성을 사용할 수 있습니다. ISR을 사용하면 정적의 이점을 유지하면서 수백만 개의 페이지로 확장할 수 있습니다.

> 알아 두면 좋은 사항: Edge 런타임은 현재 ISR과 호환되지 않지만 cache-control 헤더를 수동으로 설정하여 stale-while-revalidate를 활용할 수 있습니다.

ISR을 사용하려면 getStaticProps에 revalidate 속성을 추가하세요:

<div class="content-ad"></div>

```js
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// 이 함수는 서버 측 빌드 시간에 호출됩니다.
// 재유효화가 활성화되어 있고 새 요청이 들어오면
// 서버리스 함수에서 다시 호출될 수 있습니다.
export async function getStaticProps() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // Next.js는 페이지를 다시 생성하려고 시도합니다:
    // - 요청이 들어올 때
    // - 최대 10초마다 한 번
    revalidate: 10, // 초 단위
  };
}

// 이 함수는 서버 측 빌드 시간에 호출됩니다.
// 경로가 생성되지 않은 경우 서버리스 함수에서 다시 호출될 수 있습니다.
export async function getStaticPaths() {
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // 포스트에 기반하여 사전 렌더링하려는 경로 가져오기
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // 빌드 시간에 이러한 경로만 사전 렌더링됩니다.
  // 경로가 존재하지 않는 경우 { fallback: 'blocking' }은 페이지를 서버에서 렌더링합니다.
  return { paths, fallback: "blocking" };
}

export default Blog;
```

사전 렌더링된 빌드 시간에 페이지에 요청이 들어오면 초기로 캐시된 페이지가 표시됩니다.

- 초기 요청 후 10초 이전의 모든 페이지 요청은 캐시되어 빠릅니다.
- 10초가 경과한 후, 다음 요청은 여전히 캐시된(만료된) 페이지를 표시합니다.
- Next.js는 배경에서 페이지를 다시 생성합니다.
- 페이지가 성공적으로 생성되면 Next.js는 캐시를 무효화하고 업데이트된 페이지를 표시합니다. 배경에서 생성이 실패하면 이전 페이지가 변경되지 않은 채로 유지됩니다.

생성되지 않은 경로에 요청이 들어오면 Next.js는 초기 요청 시에 페이지를 서버에서 렌더링합니다. 이후 요청은 캐시에서 정적 파일을 제공합니다. Vercel에서 ISR은 전역적으로 캐시를 유지하고 롤백을 처리합니다.

<div class="content-ad"></div>

> 좋은 정보: 상위 데이터 제공 업체가 캐싱을 기본적으로 활성화했는지 확인해 보세요. 그렇지 않으면 (예: useCdn: false처럼) 비활성화해야 할 수도 있습니다. 그렇지 않으면 재확인이 ISR 캐시를 업데이트할 새로운 데이터를 가져오지 못할 수도 있습니다. 캐싱은 Cache-Control 헤더를 반환하는 경우 엔드포인트에 대해 CDN(요청된 엔드포인트에 대해)에서 발생할 수 있습니다.

## 요청시 재확인

재확인 시간을 60으로 설정하면 모든 방문자가 사이트의 생성된 동일한 버전을 1분 동안 보게 됩니다. 캐시를 무효화하는 유일한 방법은 1분이 지난 후 해당 페이지를 방문한 사람입니다.

v12.2.0 이상부터 Next.js는 특정 페이지에 대한 Next.js 캐시를 수동으로 삭제하기 위해 On-Demand Incremental Static Regeneration을 지원합니다. 이로써 사이트를 업데이트하는 과정이 더욱 쉬워집니다.

<div class="content-ad"></div>

- 헤들리스 CMS에서 콘텐츠를 생성 또는 업데이트합니다.
- 전자 상거래 메타데이터 변경 (가격, 설명, 카테고리, 리뷰 등).

getStaticProps 내부에서 필요한 경우 온디맨드 재유효화를 사용하려면 revalidate를 명시할 필요가 없습니다. revalidate가 생략된 경우 Next.js는 기본값으로 false(재검증 없음)을 사용하고, revalidate()가 호출될 때에만 페이지를 필요할 때 재검증합니다.

> 알아두면 좋은 점: 미들웨어는 온디맨드 ISR 요청에 대해 실행되지 않습니다. 대신 revalidate()를 호출하여 재검증을 원하는 정확한 경로로 이동하십시오. 예를 들어 pages/blog/[slug].js와 /post-1에서/blog/post-1로 리디렉션을 하는 경우, res.revalidate(`/blog/post-1`)를 호출해야 합니다.

### 온디맨드 재유효화 사용하기

<div class="content-ad"></div>

먼저, Next.js 앱만이 알 수 있는 비밀 토큰을 생성하세요. 이 비밀 토큰은 재유효화 API 라우트에 대한 무단 액세스를 방지하는 데 사용될 것입니다. 다음 URL 구조로 라우트에 액세스할 수 있습니다 (수동 또는 웹훅을 사용하여):

```js
https://<your-site.com>/api/revalidate?secret=<token>
```

그 다음, 앱 환경 변수로 비밀을 추가하세요. 마지막으로, 재유효화 API 라우트를 만드세요:

```js
export default async function handler(req, res) {
  // 요청이 유효한지 확인하기 위해 비밀을 확인합니다.
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "잘못된 토큰" });
  }

  try {
    // 이 부분은 재유효화할 실제 경로여야 합니다.
    // 예: "/blog/[slug]" 대신 this should be "/blog/post-1"
    await res.revalidate("/path-to-revalidate");
    return res.json({ revalidated: true });
  } catch (err) {
    // 오류가 발생한 경우, Next.js는 계속해서
    // 마지막으로 성공적으로 생성된 페이지를 표시할 것입니다.
    return res.status(500).send("재유효화 오류");
  }
}
```

<div class="content-ad"></div>

우리의 데모를 확인해보세요.
실시간 재유효화가 어떻게 작동하는지 확인하고 피드백을 제공해 주세요.

### 개발 중에 On-Demand ISR 테스트하기

로컬에서 next dev로 실행할 때 getStaticProps가 모든 요청에 대해 호출됩니다. 실시간 재유효화 구성이 올바른지 확인하려면 제품 빌드를 생성하고 제품 서버를 시작해야 합니다:

```js
$ next build
$ next start
```

<div class="content-ad"></div>

그럼, 정적 페이지가 성공적으로 재검증되었는지 확인할 수 있습니다.

## 오류 처리 및 재유효화

getStaticProps 내부에서 백그라운드 재생성을 처리할 때 오류가 발생하거나 수동으로 오류를 throw하는 경우, 최근에 성공적으로 생성된 페이지가 계속 표시됩니다. 다음 요청에서 Next.js는 getStaticProps를 다시 호출하려고 할 것입니다.

```js
export async function getStaticProps() {
  // 만약 이 요청이 처리되지 않는 오류를 throw하면, Next.js는
  // 현재 표시된 페이지를 무효화하지 않고,
  // 다음 요청에서 getStaticProps를 다시 시도할 것입니다.
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  if (!res.ok) {
    // 서버 오류가 있는 경우 캐시가 업데이트되지 않도록
    // 반환하는 대신 오류를 throw할 수도 있습니다.
    // 다음 성공적인 요청까지.
    throw new Error(`게시물을 불러오는 데 실패했습니다. 상태 코드: ${res.status}`);
  }

  // 요청이 성공했을 경우 게시물을 반환하고,
  // 10초마다 재검증합니다.
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}
```

<div class="content-ad"></div>

## 자체 호스팅 ISR

자체 호스팅된 Next.js 사이트에서는 next start를 사용할 때 증분 정적 재생성(ISR)이 기본적으로 작동합니다.

자체 호스팅 Next.js에 대해 더 알아보기.

## 버전 기록

<div class="content-ad"></div>

| Version   | Changes                                                                                 |
| --------- | --------------------------------------------------------------------------------------- |
| `v14.1.0` | Custom `cacheHandler` is stable.                                                        |
| `v12.2.0` | On-Demand ISR is stable                                                                 |
| `v12.1.0` | On-Demand ISR added (beta).                                                             |
| `v12.0.0` | [Bot-aware ISR fallback](https://nextjs.org/blog/next-12#bot-aware-isr-fallback) added. |
| `v9.5.0`  | Base Path added.                                                                        |

<div class="content-ad"></div>
