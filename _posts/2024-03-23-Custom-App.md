---
title: "Nextjs 사용해서 사용자 커스텀 앱 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: "undefined"
---



# 사용자 정의 앱

Next.js는 페이지를 초기화하기 위해 App 컴포넌트를 사용합니다. 이를 재정의하여 페이지 초기화를 제어하고 다음을 수행할 수 있습니다:

- 페이지 변경 사이에서 공유 레이아웃 만들기
- 페이지에 추가 데이터 주입
- 글로벌 CSS 추가

## 사용법

<div class="content-ad"></div>

기본 App을 재정의하려면 아래와 같이 파일 pages/\_app을 생성하세요:

```typescript
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

Component 프롭은 활성 페이지이므로 경로 간에 이동할 때마다 Component가 새 페이지로 변경됩니다. 따라서 Component로 전송하는 모든 프롭은 페이지에서 받을 수 있습니다.

pageProps는 초기 프롭이라는 객체이며, 이는 데이터 가져오기 방법 중 하나로 페이지를 미리 로드했거나 그렇지 않은 경우엔 빈 객체입니다.

<div class="content-ad"></div>

> 알아두면 좋아요
> 만약 애플리케이션이 실행 중이고 사용자 정의 앱을 추가했다면 개발 서버를 다시 시작해야 합니다. 이전에 pages/\_app.js가 없었던 경우에만 필요합니다.
> 앱은 getStaticProps 또는 getServerSideProps와 같은 Next.js 데이터 가져오기 방법을 지원하지 않습니다.

## 앱에서 getInitialProps 사용하기

앱에서 getInitialProps를 사용하면 getStaticProps가 없는 페이지에 대해 자동 정적 최적화가 비활성화됩니다.

이 패턴을 사용하는 것을 권장하지 않습니다. 대신 페이지와 레이아웃에 대한 데이터를 더 쉽게 가져올 수 있도록 해주는 App Router를 점진적으로 적용하는 것을 고려해보세요.

<div class="content-ad"></div>

```typescript
import App, { AppContext, AppInitialProps, AppProps } from "next/app";

type AppOwnProps = { example: string };

export default function MyApp({ Component, pageProps, example }: AppProps & AppOwnProps) {
  return (
    <>
      <p>Data: {example}</p>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  return { ...ctx, example: "data" };
};
```

<div class="content-ad"></div>
