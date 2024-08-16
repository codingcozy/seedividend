---
title: "TanStack Router는 SPA 개발을 위한 가장 강력한 옵션 중 하나입니다, TanStack Query"
description: ""
coverImage: "/assets/img/2024-05-12-TanStackRouterisoneofthemostpowerfuloptionsforSPAdevelopmentTanStackQuery_0.png"
date: 2024-05-12 21:31
ogImage: 
  url: /assets/img/2024-05-12-TanStackRouterisoneofthemostpowerfuloptionsforSPAdevelopmentTanStackQuery_0.png
tag: Tech
originalTitle: "TanStack Router is one of the most powerful options for SPA development(, TanStack Query)"
link: "https://medium.com/@yasui-edu0834/tanstack-router-is-one-of-the-most-powerful-options-for-spa-development-tanstack-query-cc7ecdc73550"
isUpdated: true
---




![이미지](/assets/img/2024-05-12-TanStackRouterisoneofthemostpowerfuloptionsforSPAdevelopmentTanStackQuery_0.png)

React에서 라우팅과 데이터 가져오기는 특히 중요한 역할을 합니다.

물론 Next.js나 Remix와 같은 프레임워크를 채택하면 프레임워크에서 제공하는 API를 사용하여 라우팅부터 데이터 가져오기까지 모든 것을 구현할 수 있습니다.

그러나 BtoB 서비스의 경우 SPA만으로 충분하며, Next.js와 같은 프레임워크를 채택하는 것은 불필요하게 과분할 수 있습니다.



우리가 원하는 것은 안전한 유형의 파일 기반 라우팅과 효율적인 데이터 가져오기입니다.

본 문서는 2024년 2월 기준으로, TanStack Router가 기술 선택에서 SPA용 라우팅 라이브러리로 매우 강력한 옵션이라는 것을 소개합니다.

# 소개

본 문서에서는 TanStack Router 및 TanStack Query가 기능과 실제 설계 구조 예제에 기반하여 SPA 애플리케이션에 대한 최적의 해결책 중 하나가 될 수 있는 방법에 대해 논의할 것입니다.



TanStack Router은 SSR (서버 측 렌더링) 기능을 제공하지만, 이 대화에서는 특히 SPA에 적용된 부분에 초점을 맞출 것입니다.

## 대상

- React와 함께 SPA를 위한 기술 선택을 고려 중인 개발자
- 안전한 유형의 개발 경험을 찾는 개발자
- Next.js와 같은 프레임워크 도입이 너무 많다고 느끼는 개발자
- React + Vite와 호환되는 라이브러리를 찾고 있는 개발자

# TanStack Router 소개



TanStack Router는 2023년 크리스마스에 버전 1.0으로 출시된 비교적 새로운 라이브러리입니다. 이 트윗에 게시된 비디오에서는 그 기능을 쉽게 이해할 수 있도록 설명하고 있으니 한번 보세요.

# 타입 안전 및 간편한 라우팅

TanStack Router의 주요 기능 중 하나는 타입 안전성입니다. `Link /` 또는 useNavigate를 사용하여 탐색할 때 코드 완성을 제공합니다. 경로뿐만 아니라 경로 매개변수와 검색 매개변수를 타입 안전하게 처리할 수 있어 매우 강력합니다.

게다가 API는 매우 간단하고 이해하기 쉽습니다. 이것이 높은 품질의 개발 경험을 제공한다고 느낄 수 있는 이유 중 하나입니다.



![이미지](https://miro.medium.com/v2/resize:fit:1400/1*JdXNcU_oldH_BlIQhZeNPQ.gif)

# 파일 기반 라우트 생성

저는 TanStack Router의 파일 기반 라우팅 및 자동 생성 기능을 특히 좋아합니다. 이는 파일을 통해 라우팅을 정의할 수 있으며, Next.js나 Remix의 App Router와 유사하게 라우팅이 자동으로 생성됩니다. 이는 코드베이스에 라우팅을 구현할 필요가 없다는 것을 의미합니다.

물론 코드를 기반으로 라우팅을 구현하는 것도 가능하지만, 공식 권장사항은 파일 기반 라우팅을 하는 것입니다.



참고: 이 문서는 폴더 경로 방식 라우팅을 소개합니다. 플랫 라우트가 아닙니다.

```js
__root.tsx // 루트 파일은 모든 라우트에 적용됩니다.
posts/
  route.tsx // `/posts`
  $postId/
    route.tsx // `/posts/$postId
```

위와 같은 디렉토리 구조를 가지고 있을 때, /posts 및 /posts/$postId의 라우트가 생성됩니다. 또한 TanStack Router는 고유한 파일 정의를 갖고 있기 때문에 특히 중요한 것들을 소개할 것입니다.

## 특별한 역할을 하는 파일 이름



__root.tsx

이 파일은 모든 경로에 적용되는 파일입니다. 특정 경로가 없으며 여기에서 정의된 컴포넌트는 항상 렌더링됩니다.

```js
import { createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute()
```

또한, createRootRoute 대신 createRootRouteWithContextAPI를 사용하면 의존성 주입이 가능합니다.



```js
import { createRootRouteWithContext, createRouter } from '@tanstack/react-router'

interface MyRouterContext {
  queryClient: QueryClient
}

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: App,
})

const queryClient = new QueryClient()

const router = createRouter({
  routeTree: rootRoute,
  context: {
    queryClient,
  },
})
```

$token（예: $postId）

$를 접두어로 사용하면 URL 경로로 사용될 것을 의미합니다. 또한, 일치하는 경로 매개변수는로더 함수나 컴포넌트 내에서 참조할 수 있습니다.

```js
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    return fetchPost(params.postId)
  },
})
```



_ 접두사

_를 접두어로 사용할 때, 레이아웃 경로로 사용되며 URL 경로에 표시되지 않습니다. 이는 디렉토리 구조와 라우팅이 다음과 같이 일치한다는 것을 의미합니다.

```js
_layout/
  layout-a.tsx // → /layout-a
  layout-b.tsx // → /layout-b
```

이렇게 하면 서로 관련된 라우트들을 일치시킬 수 있습니다.



## RouteOptions 유형

```js
// routes/posts.tsx
export const Route = createFileRoute('/posts')({
  component, // skip
  loader,
  errorComponent,
  pendingComponent,
  validateSearch,
})
```

loader

```js
type loader = ({/** 생략 */}) => Promise<TLoaderData> | TLoaderData | void
```



이 기능은 Remix/React-Router의 로더와 유사합니다. 경로가 호출될 때 트리거가 발동되며, 실패할 경우 오류를 발생시킵니다.

로더가 Promise를 반환할 때, 경로는 보류 상태가 되며, 렌더링은 Promise가 해결될 때까지 일시 중단됩니다. Promise가 거부되면 경로는 오류 상태가 됩니다.

오류 구성요소, 보류 구성요소

위에서 언급한 로더 함수의 맥락에서, Promise의 상태에 따라 렌더링이 일시 중단되거나 오류 상태가 될 수 있다고 설명했습니다. 따라서 TanStack Router는 각 경로에 대해 오류 및 보류 상태를 위한 구성 요소를 정의할 수 있습니다.



```js
// routes/posts.tsx
export const Route = createFileRoute('/posts')({
  component, // success
  errorComponent, // error
  pendingComponent, // pending
})
```

validateSearch

validateSearch을 사용하여 검색 매개변수를 유효성 검사하고 안전하게 처리할 수 있습니다. 또한 zod와 같은 유효성 검사 라이브러리와 결합할 수 있습니다.

```js
import { z } from 'zod'

const productSearchSchema = z.object({
  page: z.number().catch(1),
  filter: z.string().catch(''),
  sort: z.enum(['newest', 'oldest', 'price']).catch('newest'),
})

type ProductSearch = z.infer<typeof productSearchSchema>

export const Route = createFileRoute('/shop/products')({
  validateSearch: (search) => productSearchSchema.parse(search),
})
```



# 번들 크기를 줄이기 위한 코드 분할

TanStack 라우터는 코드 분할을 위한 기능을 내장하고 있습니다. 코드 분할 (또는 지연 로딩)의 주요 목적은 세 가지입니다:

- 초기 페이지 로드에 필요한 코드량을 줄입니다.
- 필요할 때만 대상 코드를 로드합니다.
- 코드를 청크(chunk)로 나눠서 더 세분화된 수준에서 캐싱을 가능하게 합니다.

## 코드 분할 사용 방법



TanStack Router로 코드 분할하는 방법은 간단해요:

이를 통해 Critical Routes와 Lazy Routes를 구별할 수 있어요.

Critical Route

- 초기에 로드되는 코드입니다.



게으른 루트

- 요청 시 로드되는 코드, 지연이 발생합니다.

그렇다면, 코드 분할을 위한 대상을 선택하기 위해 어떤 기준을 사용해야 할까요?

TanStack 라우터 문서에서 명확히 설명되어 있습니다.



Critical Route에 대한 목표 (route.tsx)

- 경로 구문 분석/직렬화
- 검색 매개변수 유효성 검사
- 로더, 로드 전
- 라우트 컨텍스트
- 메타
- 링크
- 스크립트
- 스타일
- 아래에 나열되지 않은 모든 다른 라우트 구성

Lazy Route에 대한 목표 (route.lazy.tsx)

- 라우트 컴포넌트
- 오류 컴포넌트
- 대기 중인 컴포넌트
- 찾을 수 없는 컴포넌트



각 경로와 연관된 컴포넌트는 Lazy Loading을 위해 지정할 수 있습니다.

## 로더는 코드 분할 대상이 아닌가요???

로더를 Lazy Routes의 일부로 만들지 않는 세 가지 이유가 있습니다:

- 로더를 대상으로 지정하면 두 번의 왕복이 필요합니다: 하나는 로더 자체의 청크를 가져오기 위한 것이고, 다른 하나는 그를 실행하기 위한 것입니다.
- 일반적으로 로더에는 상대적으로 적은 양의 코드가 포함되어 있기 때문에, 이를 포함시켜도 번들 크기를 크게 줄이지 않습니다.
- 경로에 대해, 로더는 프리로딩을 위한 중요한 요소입니다.



# 검색 매개변수를 사용한 상태 관리

TanStack Router는 검색 매개변수를 전역 상태로 간주하며, 타입 안전성 및 유효성 검사 기능을 통해 이를 안전하게 관리할 수 있게 해줍니다.

사용자들에게는 다음과 같은 시나리오에서 상태가 일관되게 유지되는 것을 기대합니다:

- Cmd/Ctrl + 클릭으로 새 탭 열기
- 즐겨찾기나 링크 공유
- 페이지 새로고침



개발자들에게는 다른 상태 관리 솔루션과 같이 유연하고 안전하며 유효성을 갖춘 방식으로 검색 매개변수를 관리하는 이 접근 방식이 검색 매개변수를 더 효율적으로 처리할 수 있게 합니다.

## 왜 URLSearchParams를 사용하지 않나요?

URLSearchParams에는 다음과 같은 단점이 있습니다:

- 항상 문자열 유형임.
- 대부분의 경우 평면 구조입니다.
- 검색 매개변수를 업데이트할 때 URL 경로를 고려해야 합니다.



그러나 검색 매개변수를 전역 상태로 고려할 때, 이러한 단점은 중대한 도전 과제가 됩니다.

이상적인 해결책은 다음과 같습니다:

- 중첩된 배열 및 객체와 같은 복잡한 데이터 유형을 조작할 수 있는 능력을 포함하여 상태 관리 라이브러리와 유사한 유형의 여러 가지 처리.
- URL 경로와 상호 작용하지 않고 검색 매개변수를 관리합니다.

TanStack Router는 이러한 도전에 대처합니다.



## JSON-first 검색 매개변수

TanStack Router는 강력한 구문 분석기를 갖추고 있어서 검색 매개변수를 자동으로 구조화된 JSON으로 변환할 수 있습니다. 이는 JSON으로 직렬화 가능한 데이터를 검색 매개변수로 사용할 수 있다는 것을 의미합니다.

```js
const link = (
  <Link
    to="/shop"
    search={
      pageIndex: 3,
      includeCategories: ['electronics', 'gifts'],
      sortBy: 'price',
      desc: true,
    }
  />
)
// → /shop?pageIndex=3&includeCategories=%5B%22electronics%22%2C%22gifts%22%5D&sortBy=price&desc=true
```

## 유효성 검사와 유형 정의



검색 매개변수의 유효성 검사 및 유형 정의는 createFileRouteAPI의 validateSearch 옵션을 사용합니다. 이를 통해 구성 요소에서 검색 매개변수를 검색하고 조작할 때 유형 안전성을 제공할 수 있습니다.

```js
// /routes/shop.products.tsx

type ProductSearchSortOptions = 'newest' | 'oldest' | 'price'

type ProductSearch = {
  page: number
  filter: string
  sort: ProductSearchSortOptions
}

export const Route = createFileRoute('/shop/products')({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    // 검색 매개변수를 유효성 검사하고 구문 분석하여 유형화된 상태로 반환합니다.
    return {
      page: Number(search?.page ?? 1),
      filter: (search.filter as string) || '',
      sort: (search.sort as ProductSearchSortOptions) || 'newest',
    }
  },
})
```

# 캐시를 이용한 데이터 로딩

TanStack Router는 SWR 캐싱이 가능한 기능을 제공하여 일반적인 로더 역할을 뛰어넘습니다. 이 기능을 통해 데이터를 사전로드하고 캐시된 데이터를 표시하거나 이전에 검색한 데이터를 캐시하고 다시 사용할 수 있습니다.



## 의존성 기반 Stale-While-Revalidate 캐싱

캐시는 경로 의존성에 의해 제어됩니다. 여기서 의존성은 다음과 같은 요소들입니다:

- 라우트의 경로명
/posts/1 대 /posts/2
- loaderDeps가 제공하는 추가적인 의존성
loaderDeps: (' search: ' index, size ' ') =` (' index, size ')

## 캐시 제어



TanStack Router의 캐시는 TanStack Query와 비슷하며, TanStack Query에 익숙한 사람들은 학습 비용을 낮추면서 처리할 수 있습니다.

staleTime

- 캐시된 데이터가 오래되었다고 간주되기까지의 시간입니다. 기본값은 0입니다.

gcTime



- 사용되지 않은 캐시가 폐기되기까지의 시간입니다. 기본값은 30분입니다.

# TanStack Query의 Suspense

지금까지 TanStack Router에 대해 이야기했지만, TanStack Query v5와 함께 안정화된 suspense 기능에 대해 설명하려고 합니다.

일반 useQuery와 useSuspenseQuery의 주요 차이점은 이제 데이터가 정의되지 않은 상태에 대한 계산이 필요하지 않다는 것입니다.



TanStack Query을 사용할 때, 데이터가 없을 경우 pendingComponent가 표시되고 오류가 발생할 경우 errorComponent가 표시되도록 구현했습니다. 아래 코드는 이를 예시로 보여줍니다.

```js
function Todos() {
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  if (query.status === "pending") {
    return <Pending />
  }

  if (query.status === "error") {
    return <Error />
  }

  return (
    <div>
      할 일 목록
    </div>
  )
}
```

그러나 useSuspenseQuery를 사용할 때는 데이터가 정의되지 않은 상태를 고려할 필요가 없으므로 코드가 다음과 같이 변경됩니다:

```js
function Todos() {
  const { data } = useSuspenseQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  // 🎉 로딩 또는 오류 상태를 처리할 필요가 없습니다

  return (
    <div>
      { /* TypeScript가 데이터가 undefined일 수 없다는 것을 알고 있습니다 */ }
      {data.map((todo) => (
        <div>{todo.title}</div>
      ))}
    </div>
  )
}
```



```js
function App() {
  // 🚀 경계(Boundaries)는 로딩 및 오류 상태를 처리합니다
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>On no!</div>}>
        <Todos />
      </ErrorBoundary>
    </Suspense>
  )
}
```

이전에는 컴포넌트 자체에서 "대기 중" 및 "오류" 상태를 처리해야했습니다. 이제 이러한 과제를 별도로 관리할 수 있게 되었습니다.

- 대기 중 상태: Suspense의 대기 중 대체(fallback)로 처리됩니다.
- 오류 상태: ErrorBoundary의 대체(fallback)로 처리됩니다.

일부 분들께서는 이러한 역할 분담의 분리가 TanStack Router의 파일 기반 접근 방식과 잘 맞는다는 것을 알아채셨을 것입니다. TanStack Router에서는 각 경로(route)별로 컴포넌트, 대기 중 컴포넌트(pendingComponent) 및 오류 컴포넌트(errorComponent)를 정의할 수 있었습니다.



```js
// routes/posts.tsx
export const Route = createFileRoute('/posts')({
  component, // 성공
  errorComponent, // 오류
  pendingComponent, // 보류 중
})
```

이는 컴포넌트 내에서 사용되는 useSuspenseQuery의 보류 및 오류 상태 처리를 TanStack Router를 통해 경로별로 구성할 수 있다는 것을 의미합니다.

## Loader 또는 TanStack Query를 사용해야 할까요?

TanStack Query의 suspense 기능이 TanStack Router와 호환되는 방법을 설명했습니다. 그러나 데이터 가져오기 관점에서는 TanStack Router의 로더를 사용하거나 SWR 캐싱 기능을 가진 TanStack Router를 사용하는 것도 가능합니다.



그래서 그것들을 어떻게 구분하고 활용해야 할까요?

공식 문서에서는 TanStack Router의 Cache의 장단점을 언급했습니다.

TanStack Router Cache의 장점

- 쉽게 사용할 수 있음
- 경로별 중복 제거, 사전로딩, 로딩 처리를 가능하게 함
- 자동으로 가비지 수집을 지원함



TanStack Router Cache의 단점

- 지속성을 위한 어댑터나 모델 없음
- 라우트 간 캐시 공유 또는 중복 제거 기능 없음
- 업데이트를 위한 API가 부족함

로더는 대상 라우트와 관련이 있으며, 라우트 간에 캐시를 공유할 수 없습니다.

따라서 응용 프로그램 상태 관리 도구로서의 TanStack Query의 존재가 필요하며, TanStack Router와 효과적으로 결합되어야 합니다.



## 캐시 데이터 미리 로딩

TanStack Router에는 미리 로딩하는 기능이 내장되어 있습니다. 예를 들어 사용자가 다른 화면으로 이동하려는 `Link`에 마우스를 가져가면 해당 경로에 필요한 데이터를 미리 로드합니다.

이 기능은 매우 강력하며 TanStack Query와 결합하여 데이터 가져오기를 보다 효율적으로 만들어주고 때로는 폭포 모델 문제까지 해결할 수 있습니다.

다음은 코드 예시입니다:



TanStack Router의 로더를 사용하여 데이터를 미리 준비하고, TanStack Query의 캐시에 저장하세요. 그래서 useSuspenseQuery가 호출되는 시점에는 데이터가 이미 준비되어 있는 것이 보장됩니다.

```js
// src/routes/posts.tsx

const postsQueryOptions = queryOptions({
  queryKey: 'posts',
  queryFn: () => fetchPosts,
})

export const Route = createFileRoute('/posts')({
  // 데이터가 로드되도록 'loader' 옵션 사용
  loader: () => queryClient.ensureQueryData(postsQueryOptions),
  component: () => {
    // 캐시에서 데이터를 읽고 업데이트에 구독합니다
    const posts = useSuspenseQuery(postsQueryOptions)

    return (
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    )
  },
})
```

TanStack Router의 로더를 사용하여 데이터를 미리 로드하고, TanStack Query의 useSuspenseQuery로 캐시된 데이터 상태를 관리하세요.

# TanStack Router의 디렉터리 디자인



지금까지 TanStack 라우터의 기능과 TanStack 쿼리와의 호환성에 대해 논의해왔습니다. 마지막으로, TanStack 라우터의 디렉토리 구조를 소개하며 해당 특징과 장점에 대해 설명하겠습니다.

다음은 디렉토리 구조입니다:

```js
.
├── __root.tsx // 루트 파일
├── posts
│   ├── -components // 🐢 경로 내부에서 사용되는 UI 구성 요소
│   ├── -api // 🦋 경로 내부에서 사용되는 API 통신 훅
│   ├── -types // 🐠 경로 내부에서 사용되는 타입 정의
│   ├── -functions // 🦐 경로 내부에서 사용되는 함수
│   ├── route.lazy.tsx // 🐕 지연 로드 라우트
│   ├── route.tsx // 🦈 주요 라우트
│   └── $postId // /posts와 유사
│       ├── -components
│       ├── -api
│       ├── -types
│       ├── -functions
│       ├── route.lazy.tsx
│       └── route.tsx
```

## 특징 1: 특징 기반 디렉토리 구조



제공된 예시에서 각 라우트는 다음과 같은 디렉토리를 포함하고 있어요:

- -components: 해당 라우트 내에서 사용하는 UI 구성 요소들이 들어 있어요.
- -api: 해당 라우트 내에서 사용하는 API 통신에 사용되는 후크들이 들어 있어요. 여기에는 TanStack Query와 같은 API가 활용돼요.
- -types: 해당 라우트 내에서 사용하는 타입 정의들이 들어 있어요.
- -functions: 해당 라우트 내에서 사용되는 함수들이 들어 있어요. 각 함수는 자체 단위 테스트가 구현될 수도 있어요.

이 접근 방식을 통해, 디렉토리인 components나 api와 같은 레이어 기반 접근 방식과는 달리 기능 기반 디자인이 가능해져요.

물론, 모든 기능이 직접적으로 라우트에 해당하는 것은 아닐 거예요. 그런 경우에는 관련된 관심사를 그룹화하기 위해 _접두사를 사용하는 것이 효과적일 수 있어요.



## 기능 2: 라우트 훅 사용을 특정 라우트에 제한

TanStack Router에서는 각 특정 라우트에 대응하는 Route Hooks를 사용하여 경로 매개변수와 검색 매개변수를 안전하게 처리할 수 있습니다.

```js
export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
})

function PostComponent() {
  const { postId } = Route.useParams()
  return <div>포스트 {postId}</div>
}
```

위와 같은 디렉토리 디자인으로 캡슐화된 라우트 내에서 사용되는 컴포넌트들이 있을 때, /posts 하위의 라우트에 대해 /posts에 특화된 Route Hooks가 사용됨을 명확하게 알 수 있습니다.




.
├── pages
├── components
│   ├── Post.tsx // 해당 컴포넌트 라우트 훅을 사용하나요?
│   ├── Todo.tsx // 해당 컴포넌트 라우트 훅을 사용하나요?
│   ├── Form.tsx // ???
│   └── Card.tsx // ???


아주 극단적인 예시라고 하더라도, 컴포넌트가 최상위 계층에 배치된 디자인에서는 어떤 라우트 훅이 어디에 사용되고 있는지를 구분하는 것이 어렵습니다.

특집 기반의 디자인에 초점을 맞추면, 특정 라우트 내에서 사용되는 컴포넌트만을 고려하게 됩니다.


.
├── posts
│   ├── -components // /posts 라우트 훅이 사용됨
│   │   ├── Card.tsx
│   │   └── Form.tsx
│   └── $postId 
│       └── -components // /posts/$postId 라우트 훅이 사용됨




## 기능 3: Suspense를 위한 명확한 경계

TanStack Query의 useSuspenseQuery를 사용하면 보류 및 오류 상태에 대한 문제를 외부화하여 컴포넌트 측이 데이터가 정의되지 않은 경우를 예상할 필요가 없어집니다.

TanStack Router와 잘 어울린다고 언급한 이유 중 하나는 각 라우트마다 pendingComponent 및 errorComponent를 정의할 수 있으므로 사용자 정의 Suspense 경계를 정의할 필요가 없다는 것입니다.

더 많은 정보를 원한다면 TanStack Router 문서에 게시된 샘플을 참조해주세요.



위의 이미지에서 빨간색과 파란색 프레임으로 표시된 Suspense 바운더리가 있습니다. 이는 파란 프레임 내에서 발생하는 보류 및 오류 상태가 /post/$postId 경로에 정의된 처리에 의해 처리되는 반면 빨간 프레임 내에서 발생하는 상태는 /posts 경로에 정의된 처리에 의해 처리된다는 것을 의미합니다.

(아래는 실제 코드 예시입니다.)

# 요약



이번 세션에서는 TanStack Router의 기능과 TanStack Query와의 호환성, 그리고 디렉토리 디자인을 소개했습니다. Next.js와 Remix와 같은 프레임워크의 발전은 놀라운데, React를 사용하여 Single Page Applications (SPAs)을 개발하는 도중에 완전히 해결되지 않은 어려움이 있었다는 느낌이 있었습니다.

그러나 이번에 소개된 TanStack Router의 파일 기반 및 높은 개발 경험(DX) 접근 방식은 React 라이브러리 선택 시 효과적인 선택일 수 있습니다.