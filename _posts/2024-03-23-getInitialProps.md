---
title: "Nextjs 13 getInitialProps 사용 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "getInitialProps"
link: "undefined"
isUpdated: true
---

# getInitialProps

> 좋은 정보: getInitialProps는 레거시 API입니다. 대신 getStaticProps 또는 getServerSideProps를 사용하는 것이 좋습니다.

getInitialProps는 페이지의 기본 내보낸 React 컴포넌트에 추가할 수 있는 비동기 함수입니다. 이 함수는 서버 측에서 실행되고 페이지 전환이 발생할 때 클라이언트 측에서도 다시 실행됩니다. 함수의 결과는 React 컴포넌트로 props로 전달됩니다.

```typescript
import { NextPageContext } from "next";

Page.getInitialProps = async (ctx: NextPageContext) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};

export default function Page({ stars }: { stars: number }) {
  return stars;
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

> 좋아 알아둬야 할 사항:
> getInitialProps에서 반환된 데이터는 서버 렌더링 시 직렬화됩니다. getInitialProps에서 반환된 객체가 순수한 객체이고 Date, Map 또는 Set을 사용하지 않도록 주의하세요.
> 초기 페이지 로드에서는 getInitialProps가 서버에서만 실행됩니다. 그리고 다른 라우트로 이동할 때 next/link 컴포넌트를 사용하거나 next/router를 사용할 경우 클라이언트에서도 getInitialProps가 실행됩니다.
> 만약 getInitialProps가 사용된 사용자 정의 \_app.js에서 getServerSideProps를 사용하는 페이지로 이동한다면 getInitialProps도 서버에서 실행됩니다.

## 컨텍스트 객체

getInitialProps는 context라는 하나의 인수를 받으며 해당 객체는 다음 속성을 가지고 있습니다:

- Name: Description
- pathname: '/pages'에서 페이지 경로인 현재 루트
- query: URL의 쿼리 문자열을 객체로 구문 분석한 것
- asPath: 브라우저에 표시되는 실제 경로(쿼리 포함)의 문자열
- req: HTTP 요청 객체(서버 전용)[HTTP 요청 객체](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
- res: HTTP 응답 객체(서버 전용)[HTTP 응답 객체](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- err: 렌더링 중에 오류가 발생한 경우 오류 객체

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

## 주의 사항

- getInitialProps는 페이지 또는 최상위 파일에서만 사용할 수 있으며 중첩된 컴포넌트에서는 사용할 수 없습니다. 컴포넌트 수준에서 중첩된 데이터를 가져오려면 App Router를 탐색해보세요.
- 라우트가 정적인지 동적인지에 관계없이 getInitialProps에서 반환된 데이터는 클라이언트 측에서 초기 HTML에서 검사할 수 있습니다. 이는 페이지가 올바르게 적용되도록 하는 것입니다. props에 클라이언트에서
  사용할 수 없어야 하는 민감한 정보를 전달하지 않도록 주의하십시오.

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
