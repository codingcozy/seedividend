---
title: "Nextjs 13 _document 파일 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "사용자 정의 문서"
link: "undefined"
---



# 사용자 정의 문서

사용자 정의 문서는 페이지를 렌더링하는 데 사용되는 `html` 및 `body` 태그를 업데이트할 수 있습니다.

기본 문서를 재정의하려면 아래와 같이 페이지/\_document 파일을 생성하세요:

```typescript
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

<div class="content-ad"></div>

> 유용한 정보
> \_document 파일은 서버에서만 렌더링되므로 onClick 같은 이벤트 핸들러를 사용할 수 없습니다.
> `Html`, `Head /`, `Main /` 및 `NextScript /`는 페이지가 올바르게 렌더링되도록 필요합니다.

## 주의 사항

- \_document에 사용된 `Head /` 컴포넌트는 next/head와 같은 것이 아닙니다. 여기서 사용된 `Head /` 컴포넌트는 모든 페이지에 공통인 `head` 코드에만 사용해야 합니다. 다른 경우, 예를 들어 `title` 태그 같은 경우에는 페이지나 컴포넌트에서 next/head를 사용하는 것을 권장합니다.
- `Main /` 바깥에 있는 React 컴포넌트는 브라우저에서 초기화되지 않습니다. 여기에 애플리케이션 논리나 사용자 정의 CSS(예: styled-jsx)를 추가하지 마세요. 모든 페이지에 공유되는 컴포넌트(예: 메뉴 또는 툴바)가 필요한 경우에는 레이아웃을 참조하세요.
- Document는 현재 Next.js 데이터 가져오기 메서드인 getStaticProps 또는 getServerSideProps를 지원하지 않습니다.

## renderPage 사용자 정의하기

<div class="content-ad"></div>

렌더페이지를 사용자 정의하는 것은 고급 기능이며 서버 사이드 렌더링을 지원하기 위해 CSS-in-JS와 같은 라이브러리에 필요합니다. 이것은 내장 styled-jsx 지원에는 필요하지 않습니다.

이런 패턴 사용을 추천하지는 않습니다. 대신에 App Router를 점진적으로 도입하여 페이지와 레이아웃에 데이터를 더 쉽게 가져올 수 있습니다.

```typescript
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    // React 렌더링 로직을 동기적으로 실행
    ctx.renderPage = () =>
      originalRenderPage({
        // 전체 React 트리 감싸는 데 유용
        enhanceApp: (App) => App,
        // 페이지별로 감싸는 데 유용
        enhanceComponent: (Component) => Component,
      });

    // 부모의 `getInitialProps` 실행, 이제 사용자 지정 `renderPage`를 포함합니다
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

> 알아두면 좋은 점
> \_document의 getInitialProps는 클라이언트 측 전환 중에 호출되지 않습니다.
> \_document에 대한 ctx 객체는 getInitialProps에서 받는 것과 동일하며, renderPage가 추가된 것이 차이점입니다.

<div class="content-ad"></div>
