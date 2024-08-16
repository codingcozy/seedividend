---
title: "React Query v5로 데이터 가져오기 및 변경하기 변화를 쉽게 처리하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-FecthingandMutationwithReactQueryv5_0.png"
date: 2024-06-22 14:40
ogImage: 
  url: /assets/img/2024-06-22-FecthingandMutationwithReactQueryv5_0.png
tag: Tech
originalTitle: "Fecthing and Mutation with React Query v5"
link: "https://medium.com/@ab19622001/fecthing-and-mutation-with-react-query-v5-73103737aa14"
isUpdated: true
---




# React-Query이란 무엇인가요?

React-Query는 React 애플리케이션에서 데이터 가져오기와 상태 관리를 간편하게 해주는 강력한 라이브러리입니다.

- React Query는 React 애플리케이션에서 원격 데이터를 관리하기 위한 포괄적인 솔루션입니다. 기존의 데이터 가져오기와 상태 관리 방법의 복잡성을 추상화한 일련의 훅과 API를 제공합니다.
- React Query를 사용하면 개발자들은 일반적으로 로딩 상태, 오류 처리 및 데이터 캐싱을 관리하기 위해 필요한 번거로운 코드를 처리하지 않고 API에서 데이터를 쉽게 가져오고 캐시하며 업데이트할 수 있습니다.

# 왜 좋은 선택인가요?

<div class="content-ad"></div>

이전 소개에서 React Query가 많은 복잡성을 간소화하는 데 도움이 되는 유용한 훅과 방법을 제공한다는 것을 알 수 있었습니다. 또한 데이터 캐싱을 관리합니다.

- React Query의 지능적인 캐싱 시스템은 데이터의 수명주기를 자동으로 관리하여 관련 정보가 컴포넌트에서 쉽게 사용할 수 있도록 합니다.
- 이 라이브러리는 로딩 상태와 오류 처리를 처리하는 내장 지원을 제공하여 로딩 스피너, 오류 메시지 및 재시도 메커니즘과 같은 적절한 UI 요소를 사용자에게 쉽게 표시할 수 있도록 합니다.
- 이러한 하위 수준의 문제를 추상화함으로써 React Query는 개발자가 반복적인 데이터 관리 작업에 갇히지 않고 응용 프로그램의 핵심 기능을 구축하는 데 초점을 맞추도록 돕습니다.

React query 설치

```js
npm i @tanstack/react-query
```

<div class="content-ad"></div>

리액트 쿼리를 사용하는 데 중요한 3가지 핵심 개념이 있습니다:

1- 쿼리.
2- 뮤테이션.
3- 쿼리 무효화.

쿼리

- React Query의 쿼리는 API 엔드포인트와 같은 원격 소스에서 데이터를 가져오는 과정을 의미합니다.
- 개발자는 React Query에서 제공하는 useQuery 훅을 사용하여 이러한 데이터 가져오기 작업을 정의하고 관리합니다.
- useQuery 훅은 고유한 쿼리 키와 데이터 가져오기 함수를 인수로 사용합니다.
- 훅은 가져온 데이터, 로딩 상태, 오류 상태 및 데이터 가져오기 라이프사이클을 관리하는 데 사용할 수 있는 다양한 속성이 포함된 객체를 반환합니다.

<div class="content-ad"></div>

```js
// 클라이언트 생성
const queryClient = new QueryClient()

function App() {
  return (
    // 앱에 클라이언트 제공
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}
```

```js
function Todos() {
  // 클라이언트에 접근
  const queryClient = useQueryClient()

  // 쿼리
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  // 뮤테이션
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // 갱신 및 새로고침
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
```

위의 코드에서 먼저 App 구성 요소에서 queryClient를 생성한 후 useQueryClient 훅을 사용하여 클라이언트에 액세스합니다. 그런 다음 useQuery를 사용하여 쿼리를 정의합니다. 앞에서 말했듯이 query key는 쿼리에 다른 구성 요소에서 사용할 수 있는 식별자를 제공하고 query function queryFn은 데이터를 가져오는데 책임이 있는 함수입니다.

변이와 쿼리 무효화

<div class="content-ad"></div>

- React Query에서 변이(Mutations)는 서버에서 데이터를 업데이트, 생성 또는 삭제하는 과정을 의미합니다.
- 개발자들은 React Query에서 제공하는 useMutation 훅을 사용하여 이러한 데이터 업데이트 작업을 정의하고 관리합니다.
- useQuery와 유사하게, useMutation은 데이터 업데이트와 관련된 로딩 및 오류 상태를 관리하는 복잡성을 다룹니다.

변이와 함께 사용되는 Query 무효화(Invalidation)는 서버 측에서 업데이트한 최신 데이터로 캐시를 업데이트하는 것을 의미합니다.

```js
function Todos() {
  // 클라이언트에 액세스
  const queryClient = useQueryClient()

  // 쿼리
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  // 변이
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // 무효화하고 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <div>
      <ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          })
        }
      >
        할 일 추가
      </button>
    </div>
  )
}
```

useMutation 훅은 객체를 전달하여 정의되며, 주요 키인 mutationFn으로는 서버 측에서 업데이트 또는 삭제를 처리하는 함수가 포함되어 있으며, 성공 처리기인 onSuccess로는 함수에서 받은 데이터를 수락하고 invalidateQueries를 사용하여 캐시를 업데이트할 수 있습니다. 이때, 이전 캐시에 액세스하고 원하는 데이터를 적용할 수 있는 쿼리 이름을 사용할 수 있습니다.

<div class="content-ad"></div>

마침내, react-query 메인 문서를 이곳에서 더 자세히 살펴볼 수 있습니다. 유용했기를 바랍니다.