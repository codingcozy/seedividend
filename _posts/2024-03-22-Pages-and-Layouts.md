---
title: "Nextjs PageRouter 페이지, 레이아웃 폴더 구조"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# 페이지 및 레이아웃

페이지 라우터는 페이지 개념에 기반을 둔 파일 시스템 기반 라우터로 구축되어 있습니다.

페이지 디렉토리에 파일을 추가하면 해당 파일이 자동으로 경로로 사용할 수 있습니다.

Next.js에서 페이지는 페이지 디렉토리의 .js, .jsx, .ts 또는 .tsx 파일에서 내보낸 React 구성 요소입니다. 각 페이지는 파일 이름을 기반으로 경로와 연결됩니다.

<div class="content-ad"></div>

예를 들어, 아래와 같이 React 컴포넌트를 내보내는 pages/about.js 파일을 만들면 이는 /about에서 접근할 수 있습니다.

```js
export default function About() {
  return <div>About</div>;
}
```

## 인덱스 경로

라우터는 index라는 이름의 파일을 디렉토리 루트로 자동으로 라우팅합니다.

<div class="content-ad"></div>

- pages/index.js → /
- pages/blog/index.js → /blog

## 중첩된 라우트

라우터는 중첩된 파일을 지원합니다. 중첩된 폴더 구조를 생성하면 파일이 여전히 동일한 방법으로 라우팅됩니다.

- pages/blog/first-post.js → /blog/first-post
- pages/dashboard/settings/username.js → /dashboard/settings/username

<div class="content-ad"></div>

## 동적 경로를 가지는 페이지

Next.js는 동적 경로를 갖는 페이지를 지원합니다. 예를 들어, pages/posts/[id].js라는 파일을 만들면, posts/1, posts/2 등의 경로에서 접근할 수 있습니다.

> 동적 라우팅에 대해 자세히 알아보려면, 동적 라우팅 문서를 확인해보세요.

## 레이아웃 패턴

<div class="content-ad"></div>

리액트 모델을 사용하면 페이지를 여러 구성 요소로 분해할 수 있습니다. 이러한 구성 요소 중 많은 것이 종종 페이지간에 재사용됩니다. 예를 들어, 모든 페이지에 동일한 내비게이션 바와 푸터가 있는 경우가 있습니다.

```js
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

## 예시

### 사용자 지정 앱을 사용한 단일 공유 레이아웃

<div class="content-ad"></div>

하나의 레이아웃만 사용하는 경우 Custom App을 생성하고 애플리케이션을 해당 레이아웃으로 감싸면 됩니다. 페이지를 변경할 때 사용되는 `Layout /` 컴포넌트는 상태가 유지되므로 (예: 입력 값) 페이지 간 이동 시 입력 값이 유지됩니다.

```js
import Layout from "../components/layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

### 페이지별 레이아웃

여러 레이아웃이 필요한 경우 getLayout 속성을 페이지에 추가하여 레이아웃에 대한 React 컴포넌트를 반환할 수 있습니다. 이를 통해 페이지별로 레이아웃을 정의할 수 있습니다. 함수를 반환하기 때문에 원하는 경우 복잡한 중첩 레이아웃을 설정할 수 있습니다.

<div class="content-ad"></div>

```js

import Layout from '../components/layout'
import NestedLayout from '../components/nested-layout'

export default function Page() {
  return (
    /** 내용 입력 */
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}
```

```js
export default function MyApp({ Component, pageProps }) {
  // 페이지 레벨에서 정의된 레이아웃을 사용합니다.
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
```

페이지 간에 이동할 때, 싱글 페이지 애플리케이션(SPA) 경험을 위해 페이지 상태(입력 값, 스크롤 위치 등)를 유지하고 싶습니다.

이 레이아웃 패턴을 사용하면 React 컴포넌트 트리가 페이지 전환 사이에 유지되므로 상태가 지속됩니다. 컴포넌트 트리를 사용하면 React가 어떤 요소가 변경되었는지 이해하여 상태를 보존할 수 있습니다.

<div class="content-ad"></div>

> 알아두면 좋아요: 이 과정을 조정(reconciliation)이라고 합니다. 이것은 React가 어떤 요소가 변경되었는지를 이해하는 방법입니다.

### TypeScript을 사용할 때

TypeScript을 사용할 때는 먼저 페이지에 대한 새로운 타입을 만들어야 합니다. 이 타입은 getLayout 함수를 포함해야 합니다. 그런 다음, AppProps에 대한 새로운 타입을 만들어야 합니다. 이 타입은 Component 속성을 이전에 생성된 타입을 사용하도록 재정의해야 합니다.

```typescript
import type { ReactElement } from "react";
import Layout from "../components/layout";
import NestedLayout from "../components/nested-layout";
import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return <p>안녕, 세계</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

export default Page;
```

<div class="content-ad"></div>

```typescript
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // 사용 가능한 경우 페이지 레벨에서 정의된 레이아웃을 사용합니다
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
```

### 데이터 가져오기

레이아웃 내에서 useEffect나 SWR과 같은 라이브러리를 사용하여 클라이언트 측에서 데이터를 가져올 수 있습니다. 이 파일은 페이지가 아니기 때문에 현재 getStaticProps 또는 getServerSideProps를 사용할 수 없습니다.

```js
import useSWR from "swr";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  const { data, error } = useSWR("/api/navigation", fetcher);

  if (error) return <div>로드 실패</div>;
  if (!data) return <div>로딩 중...</div>;

  return (
    <>
      <Navbar links={data.links} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

<div class="content-ad"></div>
