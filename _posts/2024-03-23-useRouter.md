---
title: "Nextjs 13 - 라우트 처리를 위한 useRouter 사용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "useRouter"
link: "undefined"
isUpdated: true
---





# useRouter

어플리케이션의 어떤 함수 컴포넌트 내에서 라우터 객체에 접근하고 싶다면, useRouter 훅을 사용할 수 있습니다. 아래 예시를 살펴보세요:

```js
import { useRouter } from 'next/router'

function ActiveLink({ children, href }) {
  const router = useRouter()
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'red' : 'black',
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    [링크 클릭시 발생 이벤트 처리 ]
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default ActiveLink
```

> useRouter는 React Hook입니다. 따라서 클래스와 함께 사용할 수 없습니다. withRouter를 사용하거나 클래스를 함수 컴포넌트로 래핑해야 합니다.

<div class="content-ad"></div>

## 라우터 객체

아래는 useRouter와 withRouter에서 반환된 라우터 객체의 정의입니다:

- pathname: String - /pages 이후에 오는 현재 경로 파일의 경로입니다. 따라서 basePath, locale 및 trailing slash(trailingSlash: true)는 포함되지 않습니다.
- query: Object - 동적 라우트 매개변수를 포함한 객체로 구문 분석된 쿼리 문자열입니다. 페이지가 서버 측 렌더링을 사용하지 않는 경우 프리랜더링 중에는 빈 개체가 됩니다. 기본값은 {}
- asPath: String - 검색 매개변수를 포함하고, trailingSlash 구성을 준수하는 브라우저에 표시된 경로입니다. basePath 및 locale은 포함되지 않습니다.
- isFallback: boolean - 현재 페이지가 대체 모드에 있는지 여부입니다.
- basePath: String - 활성 basePath(활성화된 경우)입니다.
- locale: String - 활성 로케일(활성화된 경우)입니다.
- locales: String[] - 모든 지원되는 로케일(활성화된 경우)입니다.
- defaultLocale: String - 현재 기본 로케일(활성화된 경우)입니다.
- domainLocales: Array`{domain, defaultLocale, locales}` - 구성된 도메인 로캘입니다.
- isReady: boolean - 라우터 필드가 클라이언트 측에서 업데이트되었고 사용할 수 있는 상태인지 여부입니다. 서버에서 조건부 렌더링용으로만 사용하십시오. 자동으로 정적으로 최적화된 페이지와 함께 사용 사례에 대한 자세한 내용은 관련 문서를 참조하십시오.
- isPreview: boolean - 현재 응용 프로그램이 미리보기 모드에 있는지 여부입니다.

> asPath 필드 사용은 서버 측 렌더링 또는 자동 정적 최적화를 사용하여 페이지가 렌더링된 경우에 클라이언트 및 서버 간 불일치로 이어질 수 있습니다. isReady 필드가 true인 경우에만 asPath를 사용하는 것을 피하십시오.

<div class="content-ad"></div>

아래에는 라우터 내에 포함된 메서드들이 있습니다:

### router.push

클라이언트 측 전환을 처리하는 이 메서드는 다음/링크만으로 충분하지 않은 경우 유용합니다.

```js
router.push(url, as, options);
```

<div class="content-ad"></div>

- url: UrlObject 또는 String - 이동할 URL (Node.JS URL 모듈 문서 참조).
- as: UrlObject 또는 String - 브라우저 URL 표시에 사용될 경로의 선택적 장식. Next.js 9.5.3 이전에는 동적 경로에 사용되었습니다.
- options - 다음 구성 옵션을 가진 선택적 개체:
  scroll - 선택적 부울, 네비게이션 후 페이지 맨 위로 스크롤 제어. 기본값: true
  shallow: getStaticProps, getServerSideProps 또는 getInitialProps를 다시 실행하지 않고 현재 페이지 경로 업데이트. 기본값: false
  locale - 선택적 문자열, 새 페이지의 지역 설정
- scroll - 선택적 부울, 네비게이션 후 페이지 맨 위로 스크롤 제어. 기본값: true
- shallow: getStaticProps, getServerSideProps 또는 getInitialProps를 다시 실행하지 않고 현재 페이지 경로 업데이트. 기본값: false
- locale - 선택적 문자열, 새 페이지의 지역 설정

> 외부 URL의 경우 router.push를 사용할 필요가 없습니다. 그런 경우에는 window.location이 더 적합합니다.

미리 정의된 route인 pages/about.js로 이동:

```js
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/about")}>
      Click me
    </button>
  );
}
```

<div class="content-ad"></div>

다이나믹 라우트인 페이지/포스트/[pid].js를 탐색 중입니다:

```js
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/post/abc")}>
      Click me
    </button>
  );
}
```

인증이 필요한 페이지에 유용한 페이지/로그인.js로 사용자를 리디렉션하는 중입니다:

```js
import { useEffect } from "react";
import { useRouter } from "next/router";

// 사용자를 가져와 반환하는 부분
const useUser = () => ({ user: null, loading: false });

export default function Page() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!(user || loading)) {
      router.push("/login");
    }
  }, [user, loading]);

  return <p>리디렉션 중...</p>;
}
```

<div class="content-ad"></div>

#### 내비게이션 후 상태 재설정하기

Next.js에서 동일한 페이지로 이동할 때, 페이지 상태는 기본적으로 재설정되지 않습니다. 왜냐하면 React는 부모 컴포넌트가 변경되지 않는 한 언마운트하지 않기 때문입니다.

```js
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Page(props) {
  const router = useRouter();
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>페이지: {router.query.slug}</h1>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>카운트 증가</button>
      <Link href="/one">one</Link> <Link href="/two">two</Link>
    </div>
  );
}
```

위 예시에서 `/one`과 `/two` 사이를 이동해도 카운트가 재설정되지 않습니다. 상태는 렌더링 간에 유지되기 때문에 상위 레벨 React 컴포넌트인 Page이 동일하게 유지됩니다.

<div class="content-ad"></div>

만약 이 동작을 원치 않는다면, 몇 가지 옵션이 있습니다:

- useEffect를 사용하여 각 상태가 업데이트되도록 수동으로 확인할 수 있습니다. 위 예제에서는 다음과 같이 보일 수 있습니다:

```javascript
useEffect(() =` {
  setCount(0)
}, [router.query.slug])
```

- React 키를 사용하여 React에 컴포넌트를 다시 마운트하도록 지시할 수 있습니다. 모든 페이지에 대해 이 작업을 수행하려면 커스텀 앱을 사용할 수 있습니다:
  `pages/_app.js`

```javascript
import { useRouter } from `next/router`

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return `Component key={router.asPath} {...pageProps} /`
}
```

#### URL 객체를 통해

next/link에서 사용할 수 있는 방법과 동일하게 URL 객체를 사용할 수 있습니다. URL 및 as 매개변수 모두에 작동합니다.

<div class="content-ad"></div>

```js
import { useRouter } from 'next/router'

export default function ReadMore({ post }) {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => {
        router.push({
          pathname: '/post/[pid]',
          query: { pid: post.id },
        })
      }
    >
      Click here to read more
    </button>
  )
}
```

### router.replace

다음 링크의 replace prop과 유사하며, router.replace는 히스토리 스택에 새 URL 항목을 추가하지 않습니다.

```js
router.replace(url, as, options);
```

<div class="content-ad"></div>

- router.replace의 API는 router.push의 API와 정확히 동일합니다.

다음 예시를 살펴보세요:

```js
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.replace("/home")}>
      Click me
    </button>
  );
}
```

### router.prefetch

<div class="content-ad"></div>

클라이언트 측 전환이 빨라지도록 페이지를 사전에 가져옵니다. 이 방법은 next/link가 없는 네비게이션의 경우에만 유용합니다. next/link는 페이지를 자동으로 가져오는 데 도움이 됩니다.

> 이 기능은 프로덕션에서만 사용할 수 있습니다. 개발 모드에서는 Next.js가 페이지를 사전에 가져오지 않습니다.

```js
router.prefetch(url, as, options);
```

- url - 사전에 가져올 URL을 포함합니다. 명시적 경로(예: /dashboard)와 동적 경로(예: /product/[id])를 포함합니다.
- as - URL에 대한 선택적 장식자입니다. Next.js 9.5.3 이전에는 이를 사용하여 동적 경로를 사전에 가져왔습니다.
- options - 다음 필드가 허용되는 선택적 객체입니다:
  - locale - 활성 언어 설정과 다른 로캘을 제공할 수 있도록 합니다. false이면 URL에 로캘을 포함해야 합니다. 활성 언어는 사용되지 않음을 유의하세요.
  - locale - 활성 언어 설정과 다른 로캘을 제공할 수 있도록 합니다. false이면 URL에 로캘을 포함해야 합니다. 활성 언어는 사용되지 않음을 유의하세요.

<div class="content-ad"></div>

로그인 페이지가 있고 로그인 후에 사용자를 대시보드로 리디렉션하는 경우를 예를 들어봅시다. 이 경우에는 다음 예시처럼 대시보드를 미리 가져와 더 빠른 전환을 만들 수 있습니다:

```js
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        /* 폼 데이터 */
      }),
    }).then((res) => {
      // 이미 미리 가져온 대시보드 페이지로 빠른 클라이언트 측 전환
      if (res.ok) router.push("/dashboard");
    });
  }, []);

  useEffect(() => {
    // 대시보드 페이지를 미리 가져오기
    router.prefetch("/dashboard");
  }, [router]);

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드 */}
      <button type="submit">로그인</button>
    </form>
  );
}
```

### router.beforePopState

일부 경우(예: 사용자 지정 서버를 사용하는 경우)에는 popstate를 청취하고 라우터가 작동하기 전에 어떤 작업을 수행하고 싶을 수 있습니다.

<div class="content-ad"></div>

```js
router.beforePopState(cb);
```

- cb - popstate 이벤트가 발생할 때 실행할 함수입니다. 이 함수는 다음과 같은 속성을 가진 객체로 이벤트 상태를 받습니다:
  url: String - 새 상태의 경로입니다. 일반적으로 페이지의 이름입니다.
  as: String - 브라우저에 표시될 URL입니다.
  options: Object - router.push에서 보낸 추가 옵션
- url: String - 새 상태의 경로입니다. 일반적으로 페이지의 이름입니다.
- as: String - 브라우저에 표시될 URL입니다.
- options: Object - router.push에서 보낸 추가 옵션

cb가 false를 반환하는 경우, Next.js 라우터가 popstate를 처리하지 않고 이 경우에 대한 처리를 담당해야 합니다. 파일 시스템 라우팅 비활성화를 참조하세요.

다음 예제처럼 요청을 조작하거나 SSR 새로고침을 강제로 실행하는 데 beforePopState을 사용할 수 있습니다:

<div class="content-ad"></div>

```js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      // 이 두 경로만 허용하고 싶어요!
      if (as !== "/" && as !== "/other") {
        // SSR을 사용하여 잘못된 경로를 404로 렌더링합니다.
        window.location.href = as;
        return false;
      }

      return true;
    });
  }, [router]);

  return <p>페이지에 오신 것을 환영합니다!</p>;
}
```

### router.back

히스토리에서 뒤로 이동합니다. 브라우저의 뒤로 가기 버튼을 클릭하는 것과 같습니다. window.history.back()이 실행됩니다.

```js
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      뒤로 가려면 여기를 클릭하세요
    </button>
  );
}
```

<div class="content-ad"></div>

### router.reload

현재 URL을 다시 불러옵니다. 브라우저의 새로 고침 버튼을 클릭한 것과 같습니다. window.location.reload()를 실행합니다.

```js
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.reload()}>
      다시 불러오려면 여기를 클릭하세요
    </button>
  );
}
```

### router.events

<div class="content-ad"></div>

Next.js Router 내부에서 발생하는 다양한 이벤트를 들을 수 있어요. 지원되는 이벤트 목록이에요:

- routeChangeStart(url, { shallow }) - 경로가 변경되기 시작할 때 발생하는 이벤트
- routeChangeComplete(url, { shallow }) - 경로가 완전히 변경된 경우 발생하는 이벤트
- routeChangeError(err, url, { shallow }) - 경로 변경 중 오류가 발생하거나 경로 로드가 취소된 경우 발생하는 이벤트
  err.cancelled - 내비게이션이 취소되었는지 나타내는 속성
- err.cancelled - 내비게이션이 취소되었는지 나타내는 속성
- beforeHistoryChange(url, { shallow }) - 브라우저 히스토리 변경 전에 발생하는 이벤트
- hashChangeStart(url, { shallow }) - 해시가 변경되지만 페이지는 변경되지 않을 때 발생하는 이벤트
- hashChangeComplete(url, { shallow }) - 해시가 변경되었지만 페이지는 변경되지 않은 경우 발생하는 이벤트

> 알아두면 좋아요: 여기서 url은 브라우저에 표시되는 URL이며, 기본 경로(basePath)가 포함돼 있어요.

예를 들어, 라우터 이벤트 routeChangeStart을 듣기 위해 pages/\_app.js 파일을 열거나 생성하고, 이벤트에 구독하면 됩니다:

<div class="content-ad"></div>

```js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(`App이 ${url} 페이지로 이동 중에 ${shallow ? "얕은" : "깊은"} 라우팅을 사용합니다.`);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // 컴포넌트가 언마운트된 경우, off 메서드를 사용하여 이벤트 구독 취소
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
}
```

이 예제에서는 페이지 네비게이션 중에 컴포넌트가 언마운트되지 않기 때문에 커스텀 앱(pages/\_app.js)을 사용하여 이벤트에 구독합니다. 그러나 응용 프로그램의 모든 컴포넌트에서 라우터 이벤트에 구독할 수 있습니다.

라우터 이벤트는 컴포넌트가 마운트될 때 (useEffect 또는 componentDidMount / componentWillUnmount) 또는 이벤트가 발생했을 때 명령적으로 등록되어야 합니다.

예를 들어, 두 번 연속으로 빠르게 링크를 클릭하여 경로로드를 취소하는 경우, routeChangeError 이벤트가 발생합니다. 전달된 err에는 true로 설정된 canceled 속성이 포함됩니다. 다음 예제와 같습니다:

<div class="content-ad"></div>

```js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeError = (err, url) => {
      if (err.cancelled) {
        console.log(`Route to ${url} was cancelled!`);
      }
    };

    router.events.on("routeChangeError", handleRouteChangeError);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  return <Component {...pageProps} />;
}
```

## 잠재적인 ESLint 오류

루터 객체에서 접근 가능한 특정 메서드는 Promise를 반환합니다. ESLint 규칙인 no-floating-promises가 활성화되어 있는 경우, 전역적으로 비활성화하거나 해당 줄에 대해 비활성화하는 것을 고려해보세요.

애플리케이션이 이 규칙을 필요로 하는 경우, Promise를 void하거나 async 함수를 사용하고 Promise를 await한 다음 함수 호출을 void해야합니다. 이것은 해당 메서드가 onClick 핸들러 내부에서 호출될 때는 적용되지 않습니다.

<div class="content-ad"></div>

영향을 받는 메소드는 다음과 같습니다:

- router.push
- router.replace
- router.prefetch

### 가능한 해결책

```js
import { useEffect } from "react";
import { useRouter } from "next/router";

// 여기에 사용자 정보를 가져와 반환하는 코드가 들어갑니다
const useUser = () => ({ user: null, loading: false });

export default function Page() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // 다음 라인에서 linting을 비활성화 - 이것이 가장 깔끔한 해결책입니다
    // eslint-disable-next-line no-floating-promises
    router.push("/login");

    // router.push로 반환된 Promise를 무효화합니다
    if (!(user || loading)) {
      void router.push("/login");
    }
    // 또는 async 함수를 사용하여 Promise를 기다리고 함수 호출을 무효화합니다
    async function handleRouteChange() {
      if (!(user || loading)) {
        await router.push("/login");
      }
    }
    void handleRouteChange();
  }, [user, loading]);

  return <p>리다이렉션 중...</p>;
}
```

<div class="content-ad"></div>

## withRouter

만약 useRouter이 당신에게 적합하지 않다면, withRouter을 사용하여 동일한 router 객체를 어떤 컴포넌트에든 추가할 수 있습니다.

### 사용법

```js
import { withRouter } from "next/router";

function Page({ router }) {
  return <p>{router.pathname}</p>;
}

export default withRouter(Page);
```

<div class="content-ad"></div>

### TypeScript

클래스 컴포넌트를 withRouter와 함께 사용하려면, 컴포넌트가 라우터 속성을 받아야 합니다:

```js
import React from "react";
import { withRouter, NextRouter } from "next/router";

interface WithRouterProps {
  router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}

class MyComponent extends React.Component<MyComponentProps> {
  render() {
    return <p>{this.props.router.pathname}</p>;
  }
}

export default withRouter(MyComponent);
```

<div class="content-ad"></div>
