---
title: "getStaticProps, getServersideProps 적절한 사용 방법"
description: "Nextjs의 client-side props와 server-side props를 어떤 상황에 사용해야하는지 정리합니다"
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---





# getStaticProps, getServersideProps 적절한 사용 방법

getStaticProps, getServerSideProps, getStaticPaths를 각각 어느 상황에 사용해야하는지 정리해보려고 합니다.

세가지 시나리오에 따라서 적절한 상황에 맞추어서 사용할 수 있습니다.



<div class="content-ad"></div>

## 1. 외부 데이터가 필요 없는 경우

가장 기본적인 경우로, 외부 데이터가 필요 없는 경우라면 아래와 같이 **getStaticProps, getServerSideProps, getStaticPaths를 사용하지 않고 컴포넌트를 구성할 수 있다.**

```tsx
function Test() {
  return <div>Test</div>;
}

export default Test;
```

## 2. 페이지 내용이 외부 데이터에 의존하는 경우

이런 경우는 보통 블로그와 같은 페이지에서 사용됩니다.

```tsx
// Blog컴포넌트는 posts라는 데이터를 API 요청을 통해서 얻어와야합니다.
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



<div class="content-ad"></div>

위와 같이 **렌더링 되기 전에 API요청으로 원하는 데이터(posts)를 불러와야하는 경우에 `getStaticProps` 를 사용합니다.**

```tsx
export default function Blog({ posts }) {
  // Render posts...
}

// 이 함수는 빌드시에 한번만 호출됩니다.
export async function getStaticProps() {
  // 내부에 원하는 API 요청을 작성합니다.
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // return 을 통해서 Blog 컴포넌트에 원하는 posts props를 내려줄 수 있습니다.
  return {
    props: {
      posts,
    },
  };
}
```

## 3. 페이지 경로가 외부 데이터에 의존하는 경우

세번째로는 페이지의 경로(path)가 외부 데이터에 의존하는 경우인데요.
예를 들어 블로그 포스트들을 API요청을 통해 불러오고 해당 블로그 포스팅 id로 path를 결정해야하는 경우에 아래와 같이 `getStaticPaths`를 사용합니다.

<div class="content-ad"></div>

```tsx
// 이 함수는 페이지 빌드시에 호출됩니다.
export async function getStaticPaths() {
  // 내부에 외부 API를 호출합니다.
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // 받아온 posts를 통해서 paths를 만들어 줍니다.
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // return 값으로 paths를 내려줌으로써 paths값을 결정할 수 있습니다.
  // { fallback: false } 은 paths 값에 없는 나머지 경로들은 404처리를 하겠다는 의미입니다.
  return { paths, fallback: false };
}
```

그리고 아래와 같이 `getStaticPaths`와 `getStaticProps`를 같은 컴포넌트에서 사용할 수 있는데요.

```tsx
export default function Post({ post }) {
  // Render post...
}

export async function getStaticPaths() {
  // ...
}



<div class="content-ad"></div>

export async function getStaticProps({ params }) {
  // params에는 post의 id를 포함하고 있기 때문에 아래와 같이 포스트 정보를 요청 받을 수 있습니다.
  const res = await fetch(`https://.../posts/${params.id}`);
  const post = await res.json();

  // post 정보를 props를 통해서 내려줍니다.
  return { props: { post } };
}
```

위와 같은 시나리오의 경우들은 아래와 같은 페이지들에서 유용하게 사용될 수 있습니다.

- 마케팅 및 랜딩 홍보 페이지
- 블로그 페이지 및 Docs 페이지와 같은 문서를 담은 페이지
- 이커머스 마켓 상품 페이지들

## getServerSideProps

server-side rendering의 경우는 static generation과 다르게 html을 매 요청마다 생성하는데요.

```tsx
export default function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
```

<div class="content-ad"></div>

사용방법은 위와 같이 기존 Static 함수들과 동일합니다.
차이점은 아래와 같습니다.

static : 빌드시에 한번만 호출
server-side : request를 할 때마다 호출함.

위와 같은 차이점이 있기 때문에 상황에 맞게 사용해야합니다.
데이터의 업데이트가 자주 발생하는 페이지의 경우에는 `getServerSideProps`를 사용하고 위에서 말한 것처럼 문서, 블로그, 상품 페이지와 같이 데이터의 변경이 잦지 않은 페이지에서는 `getStaticProps`를 사용하는 것이 효율적입니다.

Nextjs 13.x 의 공식문서에서는 Static Generation을 추천하고 있는데 그 이유는 성능상으로도 Static Generation가 높기 때문입니다. 필요에 의해서 `getServerSideProps`를 사용할지 말지는 개발자의 선택이 필요할 것 같습니다.
