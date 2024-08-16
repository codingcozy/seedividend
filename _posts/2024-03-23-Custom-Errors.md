---
title: "Nextjs 13에서 에러 페이지 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "사용자 정의 오류"
link: "undefined"
isUpdated: true
---





# 사용자 지정 오류

## 404 페이지

404 페이지는 매우 자주 액세스될 수 있습니다. 매 방문마다 오류 페이지를 서버 렌더링하는 것은 Next.js 서버의 부하를 증가시킵니다. 이로 인해 비용이 증가하고 경험이 느려질 수 있습니다.

위의 문제를 피하기 위해 Next.js는 추가 파일을 추가하지 않고도 기본적으로 정적 404 페이지를 제공합니다.

<div class="content-ad"></div>

### 404 페이지 사용자 정의하기

사용자 정의 404 페이지를 만들려면 pages/404.js 파일을 만들면 됩니다. 이 파일은 빌드 시 정적으로 생성됩니다.

```js
export default function Custom404() {
  return <h1>404 - 페이지를 찾을 수 없음</h1>;
}
```

> 알아두면 좋은 사실: 필요하다면 이 페이지 내에서 getStaticProps를 사용하여 빌드 시 데이터를 가져올 수 있습니다.

<div class="content-ad"></div>

## 500 페이지

매 방문마다 오류 페이지를 서버 렌더링하는 것은 오류에 대응하기가 복잡해집니다. 사용자가 오류에 대한 응답을 최대한 빠르게 받을 수 있도록하기 위해 Next.js는 추가 파일을 추가하지 않고도 기본적으로 정적인 500 페이지를 제공합니다.

### 500 페이지 사용자 정의

500 페이지를 사용자 정의하려면 pages/500.js 파일을 생성할 수 있습니다. 이 파일은 빌드 시 정적으로 생성됩니다.

<div class="content-ad"></div>

```js
export default function Custom500() {
  return <h1>500 - 서버 측 오류가 발생했습니다</h1>;
}
```

> 알아두세요: 필요한 경우 빌드 시간에 데이터를 가져오려면 이 페이지 내부에서 getStaticProps를 사용할 수 있습니다.

### 더 발전된 오류 페이지 사용자 정의

500 오류는 클라이언트 측과 서버 측 모두 Error 컴포넌트로 처리됩니다. 오버라이드하려면 파일 pages/\_error.js를 정의하고 다음 코드를 추가하십시오:

<div class="content-ad"></div>

```js
function Error({ statusCode }) {
  return <p>{statusCode ? `서버에서 오류 ${statusCode}가 발생했습니다` : "클라이언트에서 오류가 발생했습니다"}</p>;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
```

> pages/\_error.js는 프로덕션에서만 사용됩니다. 개발 중이라면 오류가 발생할 때 오류의 발생 위치를 알 수 있는 콜 스택과 함께 오류를 받게 됩니다.

### 내장된 오류 페이지 재사용하기

내장된 오류 페이지를 렌더링하고 싶다면 Error 컴포넌트를 가져와서 사용할 수 있습니다:

<div class="content-ad"></div>

```javascript
import Error from "next/error";

export async function getServerSideProps() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const errorCode = res.ok ? false : res.status;
  const json = await res.json();

  return {
    props: { errorCode, stars: json.stargazers_count },
  };
}

export default function Page({ errorCode, stars }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return <div>Next stars: {stars}</div>;
}
```

`Error` 컴포넌트는 title을 속성으로도 받을 수 있어요. statusCode와 함께 텍스트 메시지를 전달하고 싶다면 title을 사용하세요.

만약 커스텀 Error 컴포넌트가 있다면 그것을 가져와야 해요. next/error는 Next.js에서 사용하는 기본 컴포넌트를 내보냅니다.

### 주의사항

<div class="content-ad"></div>

- 현재 Error는 getStaticProps 또는 getServerSideProps와 같은 Next.js 데이터 가져오기 방법을 지원하지 않습니다.
- \_error는 \_app과 마찬가지로 예약 된 경로입니다. \_error는 오류 페이지의 사용자 정의 레이아웃과 동작을 정의하는 데 사용됩니다. /\_error는 라우팅을 통해 직접 액세스하거나 사용자 정의 서버에서 렌더링 할 때 404를 렌더링합니다.

<div class="content-ad"></div>
