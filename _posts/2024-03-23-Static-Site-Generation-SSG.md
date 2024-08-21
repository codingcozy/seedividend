---
title: "Nextjs 13 - 정적 사이트 생성SSR하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "정적 사이트 생성SSG"
link: "undefined"
isUpdated: true
---

# 정적 사이트 생성 (SSG)

만약 페이지가 정적 생성을 사용한다면, 페이지 HTML은 빌드 시간에 생성됩니다. 이는 프로덕션 환경에서 해당 페이지 HTML이 next build를 실행할 때 생성된다는 것을 의미합니다. 이 HTML은 각 요청마다 재사용됩니다. CDN에서 캐시될 수 있습니다.

Next.js에서는 데이터와 함께 또는 데이터 없이 페이지를 정적으로 생성할 수 있습니다. 각 경우를 살펴보겠습니다.

### 데이터 없이 정적 생성

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

기본적으로 Next.js는 데이터를 가져 오지 않고 정적 생성을 사용하여 페이지를 사전 렌더링합니다. 다음은 예시입니다:

```js
function About() {
  return <div>About</div>;
}

export default About;
```

이 페이지는 외부 데이터를 가져 오지 않아도 사전 렌더링 되어야 함을 주의하십시오. 이와 같은 경우에는 Next.js가 빌드 시간에 페이지당 단일 HTML 파일을 생성합니다.

### 데이터와 함께 정적 생성

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

일부 페이지는 미리 렌더링을 위해 외부 데이터를 가져와야 할 수도 있어요. 두 가지 시나리오가 있고 하나 또는 둘 다 해당될 수 있어요. 각 경우에, Next.js가 제공하는 다음 함수들을 사용할 수 있어요:

- 페이지 콘텐츠가 외부 데이터에 의존하는 경우: getStaticProps를 사용해주세요.
- 페이지 경로가 외부 데이터에 의존하는 경우: getStaticPaths를 사용해주세요 (일반적으로 getStaticProps와 함께 사용됨).

#### 시나리오 1: 페이지 콘텐츠가 외부 데이터에 의존하는 경우

예시: 블로그 페이지의 경우, 블로그 게시물 목록을 CMS (콘텐츠 관리 시스템)에서 가져와야 할 수도 있어요.

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
// TODO: 먼저 API 엔드포인트를 호출하여 `posts`를 가져와야 합니다. 이후 페이지를 사전 렌더링할 수 있습니다.
export default function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}
```

이 데이터를 사전 렌더링하기 위해, Next.js에서는 동일한 파일에서 getStaticProps라는 비동기 함수를 내보내는 것을 허용합니다. 이 함수는 빌드 시간에 호출되어 가져온 데이터를 페이지의 props로 사전 렌더링할 수 있게 합니다.

```js
export default function Blog({ posts }) {
  // 포스트 렌더링...
}

// 이 함수는 빌드 시간에 호출됩니다
export async function getStaticProps() {
  // 포스트를 가져오기 위해 외부 API 엔드포인트 호출
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // { props: { posts } }를 반환함으로써, Blog 컴포넌트는 빌드 시간에 `posts`를 prop으로 받게 됩니다
  return {
    props: {
      posts,
    },
  };
}
```

getStaticProps가 어떻게 작동하는지 알아보려면 Data Fetching 문서를 확인해보세요.

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

#### 시나리오 2: 페이지 경로가 외부 데이터에 의존하는 경우

Next.js를 사용하면 동적 라우트가 있는 페이지를 만들 수 있습니다. 예를 들어, pages/posts/[id].js라는 파일을 만들어 id를 기반으로 한 블로그 게시물을 보여줄 수 있습니다. 이렇게 하면 posts/1에 액세스할 때 id가 1인 블로그 게시물을 보여줄 수 있습니다.

> 동적 라우팅에 대해 더 알아보려면 Dynamic Routing 문서를 확인하세요.

그러나 빌드 타임에 미리 렌더링할 id는 외부 데이터에 따라 달라질 수 있습니다.

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

예를 들어 데이터베이스에 블로그 게시물 하나만 추가했다고 가정해보세요 (id가 1인). 이 경우 빌드 시점에는 오직 posts/1을 사전 렌더링하고 싶을 것입니다.

나중에 id가 2인 두 번째 게시물을 추가할 수도 있습니다. 그러면 posts/2도 사전 렌더링하고 싶을 것입니다.

즉, 사전 렌더링되는 페이지 경로는 외부 데이터에 따라 달라집니다. 이를 처리하기 위해 Next.js에서 동적 페이지(pages/posts/[id].js)에서 getStaticPaths라는 비동기 함수를 내보내도록 허용합니다. 이 함수는 빌드 시간에 호출되며 어떤 경로를 사전 렌더링하고 싶은지 지정할 수 있습니다.

```js
// 이 함수는 빌드 시점에 호출됩니다.
export async function getStaticPaths() {
  // 게시물을 가져오기 위해 외부 API 엔드포인트 호출
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // 게시물을 기반으로 사전 렌더링할 경로 얻기
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // 빌드 시점에 이러한 경로만 사전 렌더링합니다.
  // { fallback: false }는 다른 경로는 404를 보여주어야 함을 의미합니다.
  return { paths, fallback: false };
}
```

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

페이지/posts/[id].js 파일에서도 이 id에 대한 데이터를 가져와 사전 렌더링할 수 있도록 getStaticProps를 내보내야 합니다.

```js
export default function Post({ post }) {
  // 포스트 렌더링하기...
}

export async function getStaticPaths() {
  // ...
}

// 빌드 시에도 호출됩니다
export async function getStaticProps({ params }) {
  // params에는 포스트의 `id`가 포함됩니다.
  // 라우트가 /posts/1과 같은 경우, params.id는 1입니다.
  const res = await fetch(`https://.../posts/${params.id}`);
  const post = await res.json();

  // 페이지에 포스트 데이터를 props로 전달합니다.
  return { props: { post } };
}
```

getStaticPaths가 어떻게 작동하는지 자세히 알아보려면 Data Fetching 문서를 확인해보세요.

### 정적 생성을 언제 사용해야 하나요?

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

가능하면 Static Generation (데이터 사용 유무와 상관없이)을 권장합니다. 페이지를 한 번 빌드하고 CDN에서 서비스하기 때문에 매 요청마다 서버에서 페이지를 렌더링하는 것보다 훨씬 빠릅니다.

마케팅 페이지, 블로그 포스트 및 포트폴리오, 전자 상거래 제품 목록, 도움말 및 문서 등 여러 종류의 페이지에 Static Generation을 사용할 수 있습니다.

자신에게 물어보세요: "사용자 요청 앞에서 이 페이지를 사전 렌더링할 수 있을까요?" 만약 답이 '예'라면, Static Generation을 선택해야 합니다.

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

그러나 사용자 요청 전에 페이지를 미리 렌더링할 수 없는 경우에는 정적 생성이 좋은 아이디어가 아닙니다. 아마도 당신의 페이지가 자주 업데이트되는 데이터를 보여주고 있고, 페이지 콘텐츠가 모든 요청마다 변경된다면요.

이와 같은 경우에는 다음 중 하나를 사용할 수 있습니다:

- 클라이언트 측 데이터 가져오기와 함께 정적 생성 사용: 페이지의 일부를 미리 렌더링하지 않고, 클라이언트 측 JavaScript를 사용하여 내용을 채울 수 있습니다. 이 접근 방식에 대해 더 알아보려면 데이터 가져오기 문서를 확인해보세요.
- 서버 사이드 렌더링 사용: Next.js는 각 요청마다 페이지를 미리 렌더링합니다. 페이지가 CDN에 의해 캐싱되지 않기 때문에 더 느릴 수 있지만, 미리 렌더링된 페이지는 항상 최신 상태를 유지할 것입니다. 이 접근 방식에 대해 아래에서 설명하겠습니다.

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
