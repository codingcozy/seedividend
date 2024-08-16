---
title: "React Query 활용법 데이터 페칭 최강자 되기"
description: ""
coverImage: "/assets/img/2024-06-27-LeveragingReactQueryAData-FetchingPowerhouse_0.png"
date: 2024-06-27 18:20
ogImage: 
  url: /assets/img/2024-06-27-LeveragingReactQueryAData-FetchingPowerhouse_0.png
tag: Tech
originalTitle: "Leveraging React Query: A Data-Fetching Powerhouse"
link: "https://medium.com/@ravsrvamsikrishna/leveraging-react-query-a-data-fetching-powerhouse-21850a482c86"
isUpdated: true
---




React 어플리케이션을 더 빠르게 만들어주는 캐싱이 어떻게 변화를 주는지 궁금했던 적이 있나요? 이 블로그에서 React Query가 캐싱을 활용하여 데이터 가져오기와 관리를 간편하게 하는 방법을 탐구하고 있습니다. 뿐만 아니라 효율적인 캐싱을 위한 다양한 방법들을 살펴볼 예정이에요. 게다가, 낙관적 업데이트의 힘도 발견해 볼 거예요. 이것은 거의 사용되지 않는 주요 최적화 기술이랍니다.

캐시란 무엇인가요?
React Query에서 캐시는 API 요청의 결과를 저장하는 임시 저장 메커니즘입니다. 이는 React 컴포넌트와 서버 사이에서 중개 역할을 하며, 자주 필요한 것들을 기억해두고 필요할 때 즉시 제공하는 친구처럼 작동합니다.
React Query의 내부 메커니즘을 이해하는 것은 사용하기 전에 필수적이며, 어플리케이션의 상태 관리에서 중요한 역할을 합니다.

react query를 사용하여 API 호출하는 간단한 예제를 살펴보겠습니다(세부적으로 아래에서 설명됩니다)

![이미지](/assets/img/2024-06-27-LeveragingReactQueryAData-FetchingPowerhouse_0.png)

<div class="content-ad"></div>

API 호출 후 받은 응답은 데이터에 저장되고 키를 'user'로하여 캐싱됩니다.

React Query 작동 방식: 깊게 들어가기
React Query가 어떻게 작동하는지 알아보기 전에 몇 가지 주요 용어에 익숙해져 보겠습니다.

QueryClient — 인스턴스를 생성할 때 생성되는 queryCache 및 mutationCache를 보유하는 용기/컨테이너입니다.

QueryCache — 모든 가져온 데이터와 쿼리 세부 정보를 저장하는 중앙 메모리입니다. 고유한 키를 사용하여 특정 데이터를 찾고 결과를 캐싱하고 앱 전반에 걸쳐 데이터를 일관되게 관리하여 성능을 향상시킵니다.

<div class="content-ad"></div>

MutationCache — React Query에서 변이(mutation)는 데이터를 업데이트하는 작업(항목 추가 또는 제거와 같은 작업)을 의미합니다. 이 캐시는 이러한 변이의 결과를 일시적으로 저장하여 서버에서 확인될 때까지 그 결과를 유지합니다.

Query — 쿼리는 데이터를 가져오는 핵심 작업입니다. 필요한 정보(데이터, 상태 등)를 보유하며 해당 데이터를 가져오는 함수를 실행하고 데이터가 변경될 때 다시 시도, 취소 및 업데이트를 관리합니다. 데이터 가져오기 과정을 위한 소규모 관리자와 같은 역할을 합니다.

QueryObservers — 옵저버(observer)는 useQuery를 호출할 때 생성되며 쿼리에 구독된 상태입니다. 이것이 useQuery에 쿼리 키(queryKey)를 전달하는 이유입니다.

![이미지](/assets/img/2024-06-27-LeveragingReactQueryAData-FetchingPowerhouse_1.png)

<div class="content-ad"></div>

이제 내부 작업을 살펴보겠습니다 - 
구성 요소가 마운트될 때 QueryClient의 인스턴스가 생성되고 QueryClientProvider를 통해 전체 응용 프로그램에 전달되며 (내부적으로 React Context를 사용함) 컨텍스트를 통해 사용됩니다.

query 키와 함께 useQuery를 호출할 때 useQuery는 QueryClient와 상호 작용합니다. QueryClient는 queryKey로 식별된 데이터를 QueryCache에서 확인합니다. 데이터가 존재하고 캐시/풀린 시간을 충족하며 다시 가져오기가 트리거되지 않은 경우:

- 캐시된 데이터가 직접 구성 요소로 반환되고 구성 요소가 캐시된 데이터로 렌더링됩니다.
- useQuery에 의해 생성된 QueryObserver가 구성 요소에 가용한 데이터에 대해 알립니다.

데이터가 캐시에 없거나 신선도 기준을 충족하지 못한 경우:

<div class="content-ad"></div>

- 쿼리 객체가 생성되고(아직 없는 경우), QueryObserver가 설정되어 Query에 연결됩니다.

두 경우 모두, 데이터가 가져오는 동안 초기로딩 상태를 포함한 객체가 있습니다. useQuery에 제공된 queryFunction은 비동기적으로 트리거되어 새로운 데이터를 가져옵니다. 데이터를 가져오면 QueryCache에 쿼리 키와 함께 저장되고 QueryObserver에 업데이트에 대해 알립니다. 구성요소는 useQuery 훅을 통해 업데이트된 데이터를 받아와 새로운 데이터로 재렌더링이 트리거됩니다.

React Query에서 비동기 작업을 수행하는 방법은 useQuery와 useMutation 두 가지가 있습니다. 이러한 훅을 탐색해 봅시다.
- useQuery: React 구성요소에서 데이터를 가져오기 위해 React Query 내에서 사용되는 사용자 정의 훅입니다. 이 훅은 초기 가져오기 후 데이터 캐싱, 백그라운드에서 데이터 다시 가져오기 등 많은 기능을 관리합니다.

![LeveragingReactQueryAData-FetchingPowerhouse_2.png](/assets/img/2024-06-27-LeveragingReactQueryAData-FetchingPowerhouse_2.png)

<div class="content-ad"></div>

useQuery 훅을 사용하여 구문 및 데이터를 가져오는 방법을 확인해 봅시다.
세 가지 매개변수가 필요합니다 -

쿼리 키: 데이터를 가져오고 캐시하며 응용 프로그램 전반에서 쿼리를 다시 가져올 때 사용되는 고유한 키입니다.

쿼리 함수:이 함수에는 프라미스를 반환하거나 오류를 발생시키는 비동기 작업이 포함되어 있습니다.

옵션: CacheTime, staleTime, refetchInterval, refetchOnWindowFocus, retry 등 여러 속성이 포함된 개체입니다. 자세한 내용은 여기를 참조하시기 바랍니다.

<div class="content-ad"></div>

useQuery 훅은 여러 속성을 포함한 객체를 반환합니다:

- data: API 응답입니다.
- isLoading: API 호출의 현재 상태를 나타내는 부울 플래그입니다.
- error: 쿼리가 데이터를 가져오는 동안 오류가 발생했을 경우 나타나는 객체입니다.
- refetch: API 호출을 수동으로 트리거할 수 있는 함수입니다.

그리고 더 많은 속성이 있는데, 자세한 내용은 여기를 참조해주세요.

# 메모

<div class="content-ad"></div>

쿼리 키는 적절한 캐싱과 재검색을 보장하기 위해 고유해야 합니다. 내부적으로 배열로 변환되어 키-값 쌍과 유사합니다.

- 예를 들어, useQuery(`Todo`, fetchTodo) 는 키 `Todo`로 결과를 저장합니다.
- useQuery([`Todo`, 1], () => fetchTodo(1)) 는 키 [`Todo`, 1] 로 결과를 저장합니다.

이 두 캐시는 별개입니다. 의존성 목록에 거짓값이 포함되어 있다면 쿼리 함수가 호출되지 않습니다.

다른 queryFunctions에 동일한 queryKey를 사용하면 해당 키 아래에 가장 최근 결과가 저장되어 잠재적인 문제를 야기할 수 있습니다.

<div class="content-ad"></div>

UseMutation은 변경 작업(데이터 수정 작업)을 관리하는 강력한 훅입니다. 이를 통해 백엔드 API로 변이를 보내고 응답을 처리하는 프로세스가 간단해집니다.

![이미지](/assets/img/2024-06-27-LeveragingReactQueryAData-FetchingPowerhouse_3.png)

useMutation에서 반환된 옵션과 객체는 거의 비슷하지만 refetch 대신 mutate를 반환하며 useMutation에는 queryKey가 없습니다. 왜냐하면 이들은 데이터 수정 작업이기 때문입니다.
mutate는 변이를 시작하는 데 사용되는 함수입니다. 데이터 변이 함수로 보낼 데이터를 나타내는 선택적 페이로드를 인수로 받습니다.
옵션 및 속성에 대한 자세한 내용은 이 링크를 참조하세요.

useMutation 및 useQuery를 활용한 예제를 살펴보겠습니다.

<div class="content-ad"></div>

낙관적인 업데이트

참고 - 이것은 일반적으로 대부분의 프로젝트에서 객체를 생성할 때 백엔드에서 id가 생성되기 때문에, 패치, 삭제 및 업데이트에 대해서만 작동합니다.

위 예시를 고려해 봅시다. 할 일이 삭제되면 현재 2개의 작업이 발생합니다 -
1. 할 일 ID로 삭제 호출.
2. 즉시 업데이트된 할 일 목록 보여주기 위해 get 호출.

이전 get API가 호출될 때, 응답과 함께 데이터가 캐시에 저장됩니다.
우리가 해야 할 일은 캐시를 업데이트하는 것뿐입니다(캐시에서 항목에 기반한 할 일 항목 제거).

<div class="content-ad"></div>

리액트 쿼리는 setQueryData를 사용하여 수동으로 캐시 관리하는 것보다 더 간편한 방법을 제공하여 캐시된 데이터를 업데이트할 수 있습니다. 이 방법을 사용하면 특정 쿼리 키와 연관된 데이터를 직접 수정할 수 있습니다.
이에 대한 2가지 경우가 있습니다 -

삭제 API 호출의 성공 후 캐시 업데이트
이 경우, 삭제 API 호출이 성공한 경우에 캐시를 업데이트합니다.

![이미지](/assets/img/2024-06-27-LeveragingReactQueryAData-FetchingPowerhouse_4.png)

API 호출 전에 캐시 업데이트
이 경우, API 호출이 성공할 것으로 가정하고 onMutate 함수를 사용하여 데이터를 업데이트합니다.
onMutate은 변이가 발생하기 전에 실행됩니다. 따라서 여기서 todoItem을 삭제하고 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-27-LeveragingReactQueryAData-FetchingPowerhouse_5.png" />

참고 -
불변 업데이트: 항상 캐시 데이터를 불변하게 업데이트합니다. React Query는 기존 데이터를 직접 수정하는 대신 새로운 데이터 객체를 기대합니다.
쿼리 키: 관련 캐시 항목을 대상으로 정확한 쿼리 키를 지정합니다.

이 블로그에서는 React Query의 강력한 기능에 대해 살펴보았습니다. 특히 React 애플리케이션에서 데이터 가져오기와 관리를 최적화하기 위해 캐싱을 활용하는 방법에 중점을 두었습니다. React Query의 내부 메커니즘을 이해함으로써 QueryClient, QueryCache, MutationCache 및 QueryObservers와 같은 요소를 통해 개발자들은 API 요청을 효율적으로 처리하고 애플리케이션 성능을 향상시키며 애플리케이션 전체에서 데이터 일관성을 보장할 수 있습니다.

useQuery 및 useMutation 훅의 사용을 탐구하며 각각 데이터 가져오기 및 변이에 대한 역할을 강조했습니다. 게다가 낙관적 업데이트의 중요성을 논의하면서 사용자 경험을 향상시킬 수 있는 방법을 살펴보았습니다. 서버 확인을 기다리는 동안 즉각적인 피드백을 제공함으로써 사용자 경험을 향상시킬 수 있습니다.

<div class="content-ad"></div>

React Query를 다룬 이번 내용이 유익하고 실용적이었기를 바라요. React 애플리케이션을 최적화하는 더 많은 팁과 기술에 대한 소식을 기대해 주세요. 이 블로그가 유용하다면 공유하고 더 많은 콘텐츠를 구독해 주세요. 즐거운 코딩하세요!