---
title: "React Query로 Api에서 가져온 데이터 캐싱하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "React Query A Comprehensive Guide"
link: "https://medium.com/@KiranMohan27/react-query-a-comprehensive-guide-1e89ddc3bcef"
---



<img src="/assets/img/ReactQueryAComprehensiveGuide_0.png" />

# 소개

API에서 데이터를 가져 와서 성능을 향상시키기 위해 캐시하고 백그라운드에서 동기화해야 하는 프로젝트를 작업 중이라고 상상해보세요. 또한 페이지네이션, 무한로딩 및 기타 복잡한 시나리오를 처리해야 할 수도 있습니다. 이 모든 작업을 수동으로 처리하는 것은 어려운 작업일 수 있으며 많은 보일러플레이트 코드를 유발할 수 있습니다.

# React Query가 무엇인가요?

<div class="content-ad"></div>

React Query는 React용 강력한 데이터 동기화 라이브러리로 이러한 문제들을 해결해줍니다. 이는 React 및 Next.js 애플리케이션에서 데이터를 가져오고 캐시하며 업데이트하는 데 사용할 수 있는 일련의 후크를 제공합니다. React Query는 stale-while-revalidate 캐싱 전략을 사용하며, 이는 사용 가능한 경우 즉시 이전 데이터를 제공한 후 새로운 데이터가 도착하면 백그라운드에서 업데이트합니다.

React Query는 상태 관리 라이브러리가 아니지만 Redux 또는 Zustand와 같은 상태 관리 라이브러리와 함께 사용되어 비동기 요청에서 파생된 상태를 처리하는 데 종종 사용됩니다.

# React Query를 어떻게 사용할 것인가

React Query를 사용하여 데이터를 가져오면 결과가 로컬 캐시에 저장됩니다. 이는 동일한 데이터를 다시 요청하면 React Query가 추가 API 호출을 하지 않고 캐시된 결과를 반환할 것을 의미합니다. 데이터가 변경되면 캐시가 자동으로 무효화되므로 항상 최신 데이터를 얻을 수 있습니다.

<div class="content-ad"></div>

캐싱 외에도 React Query는 백그라운드 재요청도 지원합니다. 이는 캐싱된 데이터가 오래되면 React Query가 자동으로 백그라운드에서 새 데이터를 가져온다는 것을 의미합니다. 오래된 데이터의 기간은 데이터를 다시 가져오기 전에 허용되는 시간입니다. 기본 오래된 시간은 5분입니다.

로컬 캐싱과 백그라운드 재요청의 조합은 React 애플리케이션에서 데이터 가져오기를 관리하는 강력한 도구로 만듭니다. 성능을 향상시키고 API 호출을 줄이며 데이터가 항상 최신 상태임을 보장할 수 있습니다.

# React Query 설정하기

이제 코드를 살펴보고 React Query를 Next.js 또는 일반 React 프로젝트에서 어떻게 설정하는지 알아보겠습니다.

<div class="content-ad"></div>

# 프로젝트 설정

먼저, 새 프로젝트를 생성해야 합니다. Next.js 프로젝트의 경우 create-next-app 명령어를 사용할 수 있습니다:

```js
npx create-next-app@latest my-app
```

일반적인 React 프로젝트의 경우 create-react-app 명령어를 사용할 수 있습니다:

<div class="content-ad"></div>

```bash
npx create-react-app my-app
```

# 패키지 설치하기

다음으로, React Query와 Axios를 설치해야 합니다. HTTP 요청을 만들기 위해 Axios를 사용할 것이지만, 선호하는 라이브러리를 사용해도 괜찮습니다.

```bash
npm install @tanstack/react-query@latest
```

<div class="content-ad"></div>

# React Query 설정하기

React Query를 설정하려면 QueryClientProvider로 애플리케이션을 감싸고 QueryClient 인스턴스를 제공해야 합니다. 이 작업은 일반적으로 루트 컴포넌트 파일에서 수행됩니다.

QueryClient는 React Query의 핵심입니다. 캐싱, 가비지 수집, 데이터 가져오기 등을 처리합니다.

# API 호출 및 응답 캐싱하기

<div class="content-ad"></div>

API 호출을 만들고 API 호출 응답을 github.api.ts 파일에 캐싱할 겁니다. 코드를 원하는 파일에 자유롭게 넣어주세요.

이 예시에서는 GitHub API에 GET 요청을 보내 GitHub 계정의 공개 데이터(이름, 소개)를 가져올 겁니다. 따라서 파일 이름은 github.api.ts로 할 겁니다.

먼저 GitHub API에서 데이터를 가져오는 fetchGithubUser라는 비동기 함수를 만듭니다. fetch 함수를 사용하여 https://api.github.com/users/kiranm27로 GET 요청을 보냅니다.

다음으로 @tanstack/react-query 라이브러리의 useQuery 훅을 활용하는 useGithubUser라는 화살표 함수를 정의합니다. 이 훅은 쿼리 키 배열과 쿼리 함수를 인자로 받습니다.

<div class="content-ad"></div>

이 경우에 쿼리 키는 [`githubUser`]로 지정됩니다. 쿼리 키는 특정 쿼리 인스턴스를 식별하는 데 사용되며 캐싱 및 데이터 관리 목적으로 중요합니다. 이것은 쿼리를 식별하는 고유한 식별자 역할을 합니다.

리스트로 지정함으로써 필요한 경우 여러 쿼리 키를 제공할 수 있습니다. 예를 들어, 서로 다른 데이터 변수에 의존하는 여러 쿼리가 있는 경우 배열에서 각각의 쿼리 키를 별도로 지정할 수 있습니다.

# React Query를 사용하여 가져온 데이터에 접근하기

이제, 우리의 커스텀 후크를 사용하여 데이터를 가져와 표시하는 컴포넌트를 만들어 보겠습니다.

<div class="content-ad"></div>

ReactQueryExample에서는 github.api.ts에서 useGithubUser 훅을 가져와서 isLoading, error 및 data 상태를 가져옵니다. 이렇게 함으로써, ReactQueryExample에서는 데이터를 어떻게 가져 오는지 걱정할 필요가 없고, 그냥 useGithubUser 훅에서 제공되는 데이터를 사용합니다.

우리 애플리케이션에서 데이터 흐름을 시각화한 다이어그램입니다:

![데이터 흐름 다이어그램](/assets/img/ReactQueryAComprehensiveGuide_1.png)

# 결론

<div class="content-ad"></div>

리액트 쿼리는 리액트 애플리케이션에서 서버 상태를 관리하는 강력한 도구입니다. 데이터 가져오기, 캐싱, 동기화의 복잡성을 추상화하여 UI 구축에 집중할 수 있게 해줍니다. @tanstack/react-query 패키지를 사용하면 TypeScript 애플리케이션에서 리액트 쿼리의 강력함을 활용할 수 있습니다. 즐거운 코딩 되세요!
