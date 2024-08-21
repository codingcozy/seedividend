---
title: "Nextjs 13 Link 및 네비게이션 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---

# 링크 및 탐색

Next.js 라우터를 사용하면 페이지간의 클라이언트 측 경로 전환이 가능하며, 싱글 페이지 애플리케이션과 유사합니다.

이 클라이언트 측 경로 전환을 처리하기 위해 제공되는 React 컴포넌트인 Link를 사용할 수 있습니다.

```js
import Link from 'next/link'

function Home() {
  return (
    - [Home](/)
    - [About Us](/about)
    - [Blog Post](/blog/hello-world)
  )
}

export default Home
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

위 예제에는 여러 링크가 사용되었습니다. 각각은 경로 (href)를 알려진 페이지로 매핑합니다:

- / → pages/index.js
- /about → pages/about.js
- /blog/hello-world → pages/blog/[slug].js

Statis Generation을 사용하는 페이지에서는 뷰포트에 있는(처음에든 스크롤을 통해서든) 모든 `Link /`가 기본적으로 프리패치됩니다(해당 데이터도 포함하여). 서버 렌더링된 경로의 해당 데이터는 `Link /`를 클릭할 때만 가져옵니다.

## 동적 경로에 링크하기

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

인터폴레이션을 사용하여 동적 루트 세그먼트를 만들 수도 있습니다. 예를 들어, 컴포넌트에 전달된 포스트 목록을 보여주려면 다음과 같이 할 수 있습니다:

```js
import Link from 'next/link'

function Posts({ posts }) {
  return (
    - {posts.map((post) => (
        - {post.title}
        - ))
      ))}
```

> `encodeURIComponent`은 이 예제에서 경로를 UTF-8 호환으로 유지하기 위해 사용됩니다.

또는 URL 객체를 사용하여:

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
import Link from "next/link";

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={{
              pathname: "/blog/[slug]",
              query: { slug: post.slug },
            }}
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Posts;
```

지금은 패스를 만들기 위해 보간 대신 href 안에 URL 객체를 사용합니다. 여기서:

- pathname은 페이지 디렉토리 안의 페이지 이름입니다. 이 경우에는 /blog/[slug].
- query는 동적 세그먼트가 포함된 객체입니다. 이 경우에는 slug입니다.

## 라우터 주입하기

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

리액트 컴포넌트에서 라우터 객체에 액세스하려면 useRouter 또는 withRouter를 사용할 수 있습니다.

일반적으로 useRouter를 사용하는 것이 좋습니다.

## 명령형 라우팅

next/link는 대부분의 라우팅 요구 사항을 충족할 수 있어야하지만, next/router의 문서를 살펴보면 해당되지 않는 클라이언트 측 탐색도 할 수 있습니다.

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

아래는 useRouter를 사용하여 기본 페이지 탐색을 하는 방법을 보여주는 예시입니다:

```js
import { useRouter } from "next/router";

export default function ReadMore() {
  const router = useRouter();

  return <button onClick={() => router.push("/about")}>Click here to read more</button>;
}
```

## Shallow Routing

얕은 라우팅을 통해 URL을 변경하면 getServerSideProps, getStaticProps 및 getInitialProps를 다시 실행하지 않고도 데이터를 변경할 수 있습니다.

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

업데이트된 경로명과 쿼리를 상태(state)를 잃지 않고 router 객체를 통해 받게 됩니다 (useRouter 또는 withRouter에서 추가됨).

얕은 라우팅을 가능하게 하려면 shallow 옵션을 true로 설정하세요. 다음 예제를 참고하세요:

```js
import { useEffect } from "react";
import { useRouter } from "next/router";

// 현재 URL은 '/'
function Page() {
  const router = useRouter();

  useEffect(() => {
    // 항상 첫 번째 렌더링 이후에 탐색을 수행합니다
    router.push("/?counter=10", undefined, { shallow: true });
  }, []);

  useEffect(() => {
    // 카운터가 변경되었습니다!
  }, [router.query.counter]);
}

export default Page;
```

URL은 /?counter=10으로 업데이트되며 페이지가 교체되지 않고 경로의 상태만 변경됩니다.

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

아래와 같이 componentDidUpdate를 통해 URL 변경 사항을 감시할 수도 있어요:

```js
componentDidUpdate(prevProps) {
  const { pathname, query } = this.props.router
  // 무한 루프를 피하기 위해 프롭스가 변경되었는지 확인
  if (query.counter !== prevProps.router.query.counter) {
    // 새 쿼리를 기반으로 데이터 가져오기
  }
}
```

### 주의사항

Shallow 라우팅은 현재 페이지에서만 URL 변경 사항에 작동합니다. 예를 들어 다른 페이지인 pages/about.js가 있다고 가정했을 때 다음과 같이 작동해요:

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
router.push("/?counter=10", "/about?counter=10", { shallow: true });
```

새 페이지로 이동하므로 현재 페이지를 언로드하고 새 페이지를 로드하며 데이터 가져오기를 기다립니다. 심지어 얕은 라우팅을 요청했어도 데이터 가져오기를 기다려야 합니다.

미들웨어와 함께 얕은 라우팅을 사용할 때는 이전과 같이 미들웨어 없이 사용될 때와 달리 새 페이지가 현재 페이지와 일치하는지 확인하지 않습니다. 미들웨어가 동적으로 다시 쓰기를 수행할 수 있기 때문에, 클라이언트 측에서 데이터 가져오기를 생략하고 얕은 라우팅으로 변경되므로 얕은 경로 변경은 항상 얕은 것으로 처리되어야 합니다.

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
