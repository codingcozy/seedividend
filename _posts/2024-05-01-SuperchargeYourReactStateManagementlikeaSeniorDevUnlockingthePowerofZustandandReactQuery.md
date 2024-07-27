---
title: "대기업에서 React 상태 관리를 하는 방법,(Zustand와 React Query)"
description: ""
coverImage: "/assets/img/2024-05-01-SuperchargeYourReactStateManagementlikeaSeniorDevUnlockingthePowerofZustandandReactQuery_0.png"
date: 2024-05-01 18:13
ogImage: 
  url: /assets/img/2024-05-01-SuperchargeYourReactStateManagementlikeaSeniorDevUnlockingthePowerofZustandandReactQuery_0.png
tag: Tech
originalTitle: "Supercharge Your React State Management like a Senior Dev: Unlocking the Power of Zustand and React Query"
link: "https://medium.com/@iamashot/supercharge-your-react-state-management-like-a-senior-dev-unlocking-the-power-of-zustand-and-react-b2db33ecd12"
---


<img src="/assets/img/2024-05-01-SuperchargeYourReactStateManagementlikeaSeniorDevUnlockingthePowerofZustandandReactQuery_0.png" />

리액트 애플리케이션에서 상태를 관리하는 것은 복잡하고 시간이 많이 소모되는 작업일 수 있습니다. 애플리케이션이 커지고 복잡해지면 상태를 확장 가능하고 유지 보수 가능한 방식으로 관리하기가 점점 어려워집니다. 다행히 React용으로 제공되는 가벼운 강력한 상태 관리 라이브러리가 여러 개 있습니다. 이 글에서는 이 중 두 개의 라이브러리인 Zustand와 React Query를 살펴보고, React 애플리케이션에서 상태를 관리하는 견고하고 유연한 솔루션을 제공하는 방법을 보여줄 것입니다.

# Zustand란 무엇인가요?

Zustand는 함수형 프로그래밍 개념을 사용하여 상태를 정의하고 관리하는 React용 가벼운 상태 관리 라이브러리입니다. Redux와 달리 Zustand는 전역 저장소나 복잡한 액션 및 리듀서 집합에 의존하지 않습니다. 대신, Zustand를 사용하면 간단한 자바스크립트 객체와 함수를 사용하여 상태를 정의할 수 있습니다. 이를 통해 더 복잡한 상태 관리 솔루션의 부하 없이 상태를 확장 가능하고 유지 보수 가능한 방식으로 정의하고 관리할 수 있습니다.

<div class="content-ad"></div>

Zustand은 상태에 액세스하고 업데이트 기능을 제공하는 사용자 정의 React 훅을 생성하여 작동합니다. 이 훅은 응용 프로그램 어디에서나 상태에 액세스하고 업데이트할 수 있습니다. Zustand는 상태를 정의하고 다양한 방법으로 조작하기 쉽게 하는 도우미 함수 및 유틸리티 세트를 제공합니다.

# React Query란?

React Query는 React용 강력하고 유연한 데이터 검색 및 캐싱 라이브러리입니다. REST API, GraphQL API 등 다양한 소스에서 데이터를 가져오는 간단하고 선언적인 API를 제공합니다. React Query는 또한 응용 프로그램에서 서버 상태를 관리하는 데 사용할 수 있는 강력한 캐싱 레이어를 제공합니다.

React Query의 주요 이점 중 하나는 그 유연성입니다. 자동 재시도, 백그라운드 다시 가져오기 등을 지원하는 데이터 검색 및 캐싱을 구성하는 다양한 옵션을 제공합니다. 이를 통해 사용자 지정 로직이나 보일러플레이트 없이도 응용 프로그램에서 다양한 데이터 검색 및 캐싱 시나리오를 쉽게 처리할 수 있습니다.

<div class="content-ad"></div>

# Zustand과 React Query 함께 사용하기

Zustand과 React Query는 각각 강력한 상태 관리 라이브러리입니다. 하지만 두 라이브러리를 함께 사용하면 더욱 강력한 기능을 발휘할 수 있습니다. 두 라이브러리를 결합하여 React 애플리케이션에서 상태를 효과적으로 관리하는 견고하고 유연한 솔루션을 만들 수 있습니다.

전반적으로 접근 방식은 간단합니다. Zustand를 사용하여 애플리케이션의 로컬 상태를 관리하고, React Query를 사용하여 서버 상태를 관리합니다. Zustand는 함수형 프로그래밍 개념을 활용하여 간단하고 유연하게 로컬 상태를 정의하고 관리할 수 있는 방법을 제공하는 반면, React Query는 선언적 API를 활용하여 강력하고 유연하게 서버 상태를 관리할 수 있습니다.

실제로 이를 구현하는 방법을 좀 더 자세히 살펴보겠습니다.

<div class="content-ad"></div>

# Zustand을 사용하여 상태 정의하기

Zustand와 React Query를 함께 사용하는 첫 번째 단계는 Zustand를 사용하여 애플리케이션의 상태를 정의하는 것입니다. 이 과정은 상태를 정의하고 업데이트 함수 집합을 제공하는 사용자 정의 훅을 생성하는 것을 포함합니다.

다음은 이 과정이 어떻게 보일 수 있는지 예시입니다:

![예시](/assets/img/2024-05-01-SuperchargeYourReactStateManagementlikeaSeniorDevUnlockingthePowerofZustandandReactQuery_1.png)

<div class="content-ad"></div>

이 예시에서는 Zustand를 사용하여 상태를 관리하는 간단한 카운터를 정의하고 있습니다. useStore 훅은 count 속성과 상태를 업데이트하는 데 사용할 수 있는 increment 및 decrement 함수를 포함하는 객체를 반환합니다.

# Zustand과 React Query를 함께 사용하는 방법

이제 Zustand와 React Query를 함께 사용하는 장점을 이해했으니, Zustand를 활용한 애플리케이션에서 React Query를 구현하는 방법을 살펴보겠습니다.

- React Query 설치하기

<div class="content-ad"></div>

먼저 React Query와 그 종속성들을 설치해야 합니다. 터미널을 열고 프로젝트 디렉토리로 이동하세요.

다음 명령어를 실행하세요:
npm install react-query

2. React Query 공급자 설정

React Query를 사용하려면 QueryClientProvider 컴포넌트로 애플리케이션을 감싸야 합니다. 이 컴포넌트는 React Query가 제대로 작동할 수 있도록 필요한 컨텍스트를 제공합니다. 루트 컴포넌트 파일에서 필요한 종속성을 import하세요.

<div class="content-ad"></div>

![이미지](/assets/img/2024-05-01-SuperchargeYourReactStateManagementlikeaSeniorDevUnlockingthePowerofZustandandReactQuery_2.png)

여기서는 QueryClient의 새 인스턴스를 생성하고 queryClient를 속성으로 전달하여 전체 애플리케이션을 QueryClientProvider 내에 래핑합니다.

3. React Query를 사용하여 데이터 가져오기

React Query는 데이터를 가져오기 위한 간단하고 선언적인 API를 제공합니다. React Query를 사용하여 API 엔드포인트에서 데이터를 가져오는 예제를 살펴보겠습니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-05-01-SuperchargeYourReactStateManagementlikeaSeniorDevUnlockingthePowerofZustandandReactQuery_3.png)

이 예시에서는 React Query의 useQuery 훅을 사용하여 /api/users 엔드포인트에서 데이터를 가져오고 있습니다. useQuery의 첫 번째 인자는이 쿼리를 식별하는 고유한 키입니다. 두 번째 인자는 데이터를 가져오는 비동기 함수입니다. React Query는 캐싱, 백그라운드 재검색 및 오류 처리를 처리해줍니다.

useQuery 훅은 데이터, 로딩 상태 및 오류 여부 속성이 있는 객체를 반환합니다. 이러한 속성을 사용하여 데이터 가져오기 프로세스의 다른 상태를 처리할 수 있습니다.

4. Zustand과 React Query를 결합하기

<div class="content-ad"></div>

Zustand과 React Query를 결합하기 위해 React Query의 데이터를 Zustand 상태에 통합할 수 있습니다. Zustand를 사용하여 전역 상태를 관리하고 React Query를 사용하여 데이터를 가져오고 업데이트할 수 있습니다.

React Query 데이터를 Zustand에 통합하는 예시를 살펴봅시다:

![image](/assets/img/2024-05-01-SuperchargeYourReactStateManagementlikeaSeniorDevUnlockingthePowerofZustandandReactQuery_4.png)

이 예시에서 useStore 훅을 사용하여 Zustand에서 users 상태를 정의합니다. 또한 상태를 업데이트하는 setUsers 함수를 정의합니다. UsersList 컴포넌트 내에서는 API 엔드포인트에서 데이터를 가져오기 위해 useQuery 훅을 사용합니다. 데이터를 가져올 때 setUsers 함수를 호출하여 가져온 데이터로 Zustand 상태를 업데이트합니다.

<div class="content-ad"></div>

Zustand과 React Query를 결합하여 전역 상태를 쉽게 관리할 수 있습니다. Zustand를 사용하면서 React Query의 강력한 데이터 가져오기 및 캐싱 기능을 활용할 수 있습니다.

## Zustand과 React Query를 함께 사용하는 장점

이전에 언급한대로, Zustand와 React Query는 React 애플리케이션용 강력한 상태 관리 라이브러리입니다. 함께 사용할 때는 Redux나 각각 사용하는 것보다 여러 장점을 제공합니다. 이러한 장점을 자세히 살펴보겠습니다.

- 코드 간소화

<div class="content-ad"></div>

Zustand과 React Query를 함께 사용하는 가장 중요한 장점 중 하나는 코드를 간소화한다는 것입니다. Zustand는 응용 프로그램 상태를 관리하기 위한 간단한 API를 제공하며, React Query는 데이터 가져오기와 캐싱을 간단하게 만들어줍니다. 이 둘을 함께 사용하면 그렇지 않았다면 작성해야 했을 많은 뼈대 코드를 제거할 수 있습니다.
예를 들어, Zustand를 사용하여 응용 프로그램의 전역 상태를 관리하고, 그런 다음 React Query를 사용하여 API에서 데이터를 가져올 수 있습니다. 이를 통해 데이터와 UI를 분리하여 코드를 더 모듈식으로 유지하고 이해하기 쉽게 만들 수 있습니다.

2. 성능 향상

React Query의 캐싱 메커니즘은 응용 프로그램에 훌륭한 성능 향상을 제공합니다. 클라이언트 측에서 데이터를 캐시함으로써 응용 프로그램이 수행하는 네트워크 요청의 수를 줄일 수 있어 더 빠르고 반응성이 향상됩니다.

Zustand의 작은 크기와 간결함도 성능 향상에 기여합니다. Redux보다 훨씬 작기 때문에 로드하는 데 더 빠르고 응용 프로그램의 메모리 풋프린트를 줄일 수 있습니다.

<div class="content-ad"></div>

3. 쉬운 통합

Zustand와 React Query는 기존의 React 애플리케이션에 쉽게 통합할 수 있습니다. Zustand는 React의 훅과 잘 작동하는 간단한 API를 제공하여 구성 요소에 쉽게 통합할 수 있습니다. React Query도 통합하기 쉽고 데이터 가져오기 라이브러리와 함께 사용할 수 있어 유연하고 사용자 정의가 가능합니다.

4. 확장성

Zustand의 간결함은 소규모에서 중규모 애플리케이션에 좋은 선택입니다. 그러나 React Query와 결합하면 대규모 복잡한 애플리케이션을 구축하는 강력한 도구가 됩니다. React Query의 캐싱 메커니즘과 다른 라이브러리와의 쉬운 통합은 애플리케이션의 확장에 좋은 선택입니다.

<div class="content-ad"></div>

## 결론

Zustand과 React Query는 함께 사용할 때 React 애플리케이션에서 상태를 관리하고 데이터를 가져오는 간단하고 확장 가능한 솔루션을 제공하는 강력한 상태 관리 라이브러리입니다. Zustand는 로컬 상태의 관리를 간소화하고, React Query는 서버 상태를 처리하고 성능있는 캐싱 레이어를 제공합니다.

React Query를 Zustand와 통합함으로써 React 애플리케이션에서 코드를 단순화하고 성능을 향상시키며 쉽게 통합하고 확장 가능성을 높일 수 있습니다. 작은 프로젝트나 대규모 애플리케이션을 구축하더라도 Zustand와 React Query는 상태 관리와 데이터 가져오기에 강력하고 유연한 솔루션을 제공합니다.

다음 React 프로젝트에 Zustand와 React Query를 통합하여 상태 관리 작업에서 가져다 주는 효율성과 생산성을 경험해보세요.