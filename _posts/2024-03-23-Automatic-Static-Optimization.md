---
title: "Nextjs 13 사이트 자동 정적 최적화 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "자동 정적 최적화"
link: "undefined"
---



# 자동 정적 최적화

Next.js는 페이지에 블로킹 데이터 요구사항이 없는 경우 (사전 렌더링될 수 있는) 페이지를 자동으로 정적(static)으로 판단합니다. 이 결정은 페이지에 getServerSideProps와 getInitialProps가 없는 경우에 이뤄집니다.

이 기능을 통해 Next.js는 서버 렌더링 및 정적 생성 페이지를 모두 포함하는 하이브리드 애플리케이션을 생성할 수 있습니다.

> 정적 생성된 페이지는 여전히 반응적입니다: Next.js는 애플리케이션을 클라이언트 측에서 수화(rehydrate)하여 완전한 상호 작용성을 부여합니다.

<div class="content-ad"></div>

이 기능의 주요 이점 중 하나는 최적화된 페이지가 서버 측 연산이 필요하지 않으며, 여러 CDN 위치에서 즉시 최종 사용자에게 스트리밍 될 수 있다는 것입니다. 결과적으로 사용자에게 초고속 로딩 경험이 제공됩니다.

## 작동 방식

페이지에 getServerSideProps 또는 getInitialProps가 있으면, Next.js는 페이지를 요청별로 필요에 따라 렌더링하는 방식인 서버 사이드 렌더링으로 전환됩니다.

위와 같은 경우가 아니라면, Next.js는 페이지를 자동으로 정적으로 최적화하여 페이지를 사전 렌더링하여 정적 HTML로 변환합니다.

<div class="content-ad"></div>

프리랜더링 중에는 쿼리 객체가 비어 있을 것입니다. 이 단계에서는 제공할 쿼리 정보가 없기 때문입니다. 하이드레이션 이후에는 Next.js가 애플리케이션을 업데이트하여 쿼리 객체에 라우트 매개변수를 제공합니다.

쿼리가 업데이트되고 또 다른 렌더링을 유발하는 하이드레이션 이후의 케이스는 다음과 같습니다:

- 페이지가 동적 경로인 경우
- URL에 쿼리 값이 있는 페이지인 경우
- next.config.js에서 리라이트가 구성되어 있을 경우. 왜냐하면 리라이트에는 파싱 및 쿼리에 제공해야 할 매개변수가 있을 수 있습니다.

쿼리가 완전히 업데이트되어 사용할 준비가 되었는지를 구분할 수 있는 방법은 next/router의 isReady 필드를 활용하는 것입니다.

<div class="content-ad"></div>

> 좋은 정보: getStaticProps를 사용하는 페이지에 동적 라우트로 추가된 매개변수는 항상 쿼리 객체 내에서 사용할 수 있습니다.

다음 빌드에서는 정적으로 최적화된 페이지를 위해 .html 파일을 생성합니다. 예를 들어, pages/about.js 페이지에 대한 결과는 다음과 같습니다:

```js
.next/server/pages/about.html
```

그리고 해당 페이지에 getServerSideProps를 추가하면 JavaScript 파일이 생성됩니다.

<div class="content-ad"></div>

```js
.next/server/pages/about.js
```

## 주의 사항

- 만약 getInitialProps를 사용하는 사용자 정의 App이 있다면, 정적 생성 없이 페이지에서 이 최적화가 해제될 것입니다.
- getInitialProps를 사용하는 사용자 정의 Document가 있다면, 페이지가 서버 측 렌더링되었는지 확신하기 전에 ctx.req가 정의되어 있는지 확인하세요. 사전 렌더링된 페이지에는 ctx.req가 정의되지 않을 수 있습니다.
- 라우터의 asPath 값을 사용할 때는 라우터의 isReady 필드가 true가 될 때까지 렌더링 트리에서 이 값을 사용하지 마세요. 정적으로 최적화된 페이지는 asPath를 클라이언트에서만 알고 있으며 서버에서는 모릅니다. 따라서 prop으로 사용하는 것은 일치 오류를 발생시킬 수 있습니다. active-class-name 예제는 asPath를 prop으로 사용하는 한 가지 방법을 나타냅니다.

<div class="content-ad"></div>
