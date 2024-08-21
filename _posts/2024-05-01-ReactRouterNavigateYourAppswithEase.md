---
title: "리액트 라우터 기초 내용 정리"
description: ""
coverImage: "/assets/img/2024-05-01-ReactRouterNavigateYourAppswithEase_0.png"
date: 2024-05-01 17:47
ogImage:
  url: /assets/img/2024-05-01-ReactRouterNavigateYourAppswithEase_0.png
tag: Tech
originalTitle: "React Router: Navigate Your Apps with Ease"
link: "https://medium.com/@bijweniki/react-router-navigate-your-apps-with-ease-74c17836c91e"
isUpdated: true
---

React Router는 React 애플리케이션을 위한 강력한 라우팅 라이브러리입니다. URL을 기반으로 다른 컴포넌트를 렌더링하고 탐색을 처리하는 것을 통해 전체 페이지 새로 고침이 필요하지 않도록 해줍니다. 간단히 말해, React Router는 사용자 인터페이스가 URL 변경에 동적으로 업데이트되어 사용자에게 더 부드럽고 원활한 브라우징 경험을 제공하는 단일 페이지 애플리케이션(SPA)을 만드는 데 도움을 줍니다.

React Router를 사용하는 장점:

- 클라이언트 측 라우팅: 페이지 전체를 새로 고치지 않고 뷰 간의 부드럽고 빠른 전환이 가능하여 좀 더 원활한 사용자 경험을 제공합니다.
- 선언적 라우팅: React 컴포넌트 내에서 라우트를 쉽게 정의하고 관리할 수 있습니다.
- 동적 라우팅: React Router는 동적 라우팅을 지원하여 개발자가 URL 매개변수를 사용하여 라우트를 생성하고 URL에 따라 동적 콘텐츠를 렌더링할 수 있습니다. 이를 통해 React를 사용하여 동적이고 데이터로 구동되는 사용자 인터페이스를 구축할 수 있습니다.
- 중첩된 라우팅: React Router는 중첩된 라우트를 지원하여 중첩된 컴포넌트와 라우트로 복잡한 UI 계층 구조를 만들 수 있습니다. 이는 다수의 탐색 수준을 갖는 대규모 애플리케이션을 구성하고 관리하는 데 유용합니다.
- 리다이렉트 및 오류 처리: 예상치 못한 상황에서도 사용자 경험을 향상시킵니다.

React Router를 사용하는 방법은 어떻게 할까요?

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

- 설치: 먼저 npm 또는 yarn을 사용하여 React Router를 설치하세요:

```js
npm install react-router-dom
또는
yarn add react-router-dom
```

2. 라우트 설정: 주로 App.js와 같은 주요 컴포넌트 파일을 연 후 react-router-dom에서 필요한 컴포넌트를 가져옵니다.

라우트를 설정하는 과정에서 `BrowserRouter`의 역할을 이해하는 것이 중요합니다. 이 컴포넌트는 애플리케이션의 최상위 래퍼로 작동하여 클라이언트 측 라우팅을 가능하게 합니다. 우리의 전체 애플리케이션을 `BrowserRouter`로 감싸면 내비게이션과 라우트 변경을 원활하게 처리할 수 있습니다. `BrowserRouter`를 우리 애플리케이션의 내비게이션의 주요 컨트롤러로 생각해보세요. 이를 통해 애플리케이션 내의 모든 컴포넌트가 라우팅 기능에 액세스할 수 있게 되며, 효과적으로 라우트를 정의하고 관리할 수 있습니다.

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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
```

리액트 앱에서 주요 구성 요소인 보통 App이 모든 것을 제어합니다. 그러나 React Router를 추가하면 Router 구성 요소가 새로운 주인이 됩니다. 이는 네비게이션에 대한 마스터 컨트롤러와 같습니다. Router를 가장 높은 부모로 만들면 모든 구성 요소가 라우팅 슈퍼파워에 액세스할 수 있습니다. 이렇게 하면 다른 페이지 간에 쉽게 이동하고 라우트 정보에 액세스할 수 있습니다. 요약하면 최상위 부모로 Router를 사용하면 앱의 모든 구성 요소가 React Router의 혜택을 누릴 수 있습니다.

가장 간단한 방법으로 React Router를 설정하려면 index.js 파일에 다음을 포함하십시오:

```js
ReactDOM.render(
  <Router>
    <App />
  </Router>
);
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

3. 네비게이션에 링크 사용하기: React 애플리케이션에서 React Router를 사용하여 네비게이션을 위해 `Link` 컴포넌트를 사용하려면, React Router에서 Link를 import하십시오.

```js
import { Link } from "react-router-dom";
```

React Router의 `Link` 컴포넌트는 애플리케이션의 서로 다른 경로 간에 링크를 생성하는 데 사용됩니다. 이는 전통적인 HTML `a` 태그와 유사하지만, React Router를 사용하는 React 애플리케이션 내에서 사용하도록 특별히 디자인되었습니다.

일반적으로 `Link`를 사용하는 방법은 다음과 같습니다:

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
<Link to="/about">About</Link>
```

클릭 가능한 링크를 만들기 위해 `Link`를 사용합니다. `to` 속성은 클릭했을 때 링크가 이동해야 하는 대상 URL을 지정합니다.

`Link`를 클릭하면 React Router가 네비게이션 이벤트를 가로채고 전체 페이지 새로고침 없이 브라우저의 URL을 업데이트합니다. 이를 통해 React 애플리케이션 내에서 부드러운 클라이언트 측 네비게이션이 가능해집니다.

라우트 매개변수와 동적 라우트

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

라우트 매개변수는 URL 패턴 내 동적 값을 캡처하고 동적 경로를 생성할 수 있는 자리 표시자입니다. 이 매개변수들은 콜론(:)으로 시작하고 매개변수 이름이 따라온 루트 경로에 정의됩니다. 예를 들어, 루트 경로 /users/:id에서 :id는 라우트 매개변수입니다.

예를 들어, 블로그 애플리케이션에서 각 블로그 게시물이 고유한 식별자(ID)를 가지는 경우를 생각해보세요. 개별 블로그 게시물마다 별도의 경로를 만드는 대신, 포스트 ID를 라우트 매개변수로 캡처하는 단일 동적 경로를 만들 수 있습니다:

```js
<Route path="/posts/:postId" component={PostDetail} />
```

이 라우트에서 :postId는 블로그 게시물의 고유 식별자를 나타내는 라우트 매개변수입니다. 사용자가 /posts/123과 같은 URL로 이동할 때, React Router는 postId 매개변수로 값 123을 캡처합니다. 이 매개변수는 그런 다음 PostDetail 컴포넌트 내에서 액세스하여 해당 블로그 게시물 콘텐츠를 가져와 표시할 수 있습니다.

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

루트 매개변수를 사용하여 응용 프로그램에서 보다 유연하고 유지 관리 가능한 라우팅 로직을 만들 수 있습니다. 각 가능한 값에 대해 개별 라우트를 하드코딩할 필요 없이 동적 데이터를 처리할 수 있기 때문에 응용 프로그램이 성장함에 따라 더 확장 가능하고 유지 관리하기 쉬워집니다.

루트 매개변수에 액세스하기

루트 매개변수는 URL 경로에 정의된 루트 매개변수의 값을 액세스할 수 있습니다. 이러한 후크는 useParams 또는 match.params와 같은 React Router 후크를 사용하여 구성 요소 내에서 액세스할 수 있습니다.

함수형 구성 요소에서 useParams 후크를 사용하세요 :

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
import { useParams } from "react-router-dom";

const ComponentName = () => {
  const { parameterName } = useParams();
  // parameterName에 접근
};
```

에러 처리 및 모범 사례:

모든 애플리케이션에서 라우팅 오류와 같은 404 오류 또는 잘못된 경로와 관련된 오류 처리를 고려하는 것이 중요합니다.

에러 처리

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

- 404 페이지 구현: 알 수 없는 경로가 발생했을 때 특정 컴포넌트를 디자인해주세요.
- 기본 경로로 리다이렉트: 알려진 경로로 사용자를 리다이렉션하여 예비 메커니즘을 고려해주세요.
- 명확한 오류 메시지 제공: 네비게이션 오류에서 복구하는 방법을 안내하기 위해 유용한 메시지를 사용해주세요.

![이미지](/assets/img/2024-05-01-ReactRouterNavigateYourAppswithEase_0.png)

효과적인 라우트 구성

- 관련 라우트 그룹화: 논리적으로 연결된 라우트를 그룹화해주세요 (예: /products, /products/new, /products/:productId).
- 라우트 파일 모듈화: 큰 애플리케이션의 경우 기능 또는 앱의 섹션에 따라 라우트 구성을 별도 파일로 분리해주세요.
- 지연 로딩으로 코드 분할: 대규모 애플리케이션의 초기 로딩 시간을 개선하기 위해 요청에 따라 라우트를 로드해주세요.

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

공식 문서

더 많은 기능과 가능성에 대해 자세히 알아보려면 공식 리액트 라우터 문서를 확인해보세요: [링크](https://reactrouter.com/)
