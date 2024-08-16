---
title: "React에서 페이지 이동, 새로고침할 때 상태 유지하는 5가지 방법"
description: ""
coverImage: "/assets/img/2024-05-12-5MethodstoPersistingStateBetweenPageReloadsinReact_0.png"
date: 2024-05-12 22:49
ogImage: 
  url: /assets/img/2024-05-12-5MethodstoPersistingStateBetweenPageReloadsinReact_0.png
tag: Tech
originalTitle: "5 Methods to Persisting State Between Page Reloads in React"
link: "https://medium.com/bitsrc/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f"
isUpdated: true
---



## 페이지 새로 고침 간에 React 상태 유지하는 다양한 방법 배우기

![이미지](/assets/img/2024-05-12-5MethodstoPersistingStateBetweenPageReloadsinReact_0.png)

# 1. LocalStorage 사용하기 — 클래스 컴포넌트

가장 간단한 방법 중 하나는 브라우저의 localStorage를 사용하여 상태를 유지하는 것입니다. 예제를 살펴보겠습니다.

우리 주(state)에 count가 있습니다. 이제 페이지를 새로고침해도 이 count 값을 유지하고 싶다면, localStorage를 사용하면 됩니다.

보시다시피, 이제 setState 메소드를 호출할 때마다 state 값을 저장합니다. 이것은 우리가 원하는 바를 달성하기 위한 간단한 방법입니다.

우리는 클래스 컴포넌트를 살펴봤으므로, 함수형 컴포넌트에서는 어떻게 할지 살펴봅시다.

# 2. LocalStorage 사용하기 — 함수형 컴포넌트

먼저, 우리는 클래스 기반 컴포넌트를 함수형 컴포넌트로 변환할 것입니다.

이제 우리가 상태를 유지하기 위해 localStorage를 추가하는 방법을 살펴봅시다.

여기서 함수형 컴포넌트에 대한 약간 다른 접근 방식을 취했다는 것을 알 수 있습니다. useEffect 훅을 사용하여 두 가지 작업을 수행합니다.

- 변경 사항을 추적하고 LocalStorage를 업데이트합니다.
- 초기화시 LocalStorage에서 저장된 값을 검색합니다.

# 3. Redux 저장소에서 LocalStorage 사용하기

컴포넌트 수준에서 상태를 localStorage에 저장하는 한 가지 문제는 동일한 컴포넌트의 여러 인스턴스가 있는 경우입니다. 이는 localStorage에 중복 된 키를 만들어 예상치 못한 동작을 일으킬 수 있습니다.

이 문제를 해결하기 위해서는 다음과 같은 방법이 있습니다.

- 재사용 가능한 컴포넌트에 ID를 전달하고 이를 사용하여 localStorage에 값을 저장합니다.
- 또는 상위 수준에서 상태를 지속시킵니다.

만약 Redux를 사용한다면, 앱 상태를 localStorage에 유지하기 위해 사용할 수 있습니다.

먼저, 수동으로 그것을 어떻게 할지 살펴보고, 그런 다음에는 우리를 위해 처리해줄 라이브러리인 "Redux Persist"를 사용하여 어떻게 할지 확인해보겠습니다.

여기서는 스토어 업데이트를 구독하고 localStorage에 지속시킴으로써 구현할 수 있습니다. 그리고 앱을 초기화할 때 localStorage로부터 초기 상태를 전달할 수 있습니다.

# 4. Redux Persist 사용하기

수동으로 상태를 지속 및 초기화하는 대신 라이브러리를 사용할 수 있습니다.

보시다시피, Redux Persist에서 persistReducer를 사용하여 persistStore를 저장하고 초기화할 수 있습니다.

# 5. URL 파라미터 사용

가장 명백한 방법이지만, URL 파라미터를 사용하여 상태를 지속하는 방법을 살펴봅시다. 이 접근 방식은 URL 길이 제한으로 인해 데이터가 간단하고 직접적인 원시 값인 경우에 적합합니다.

만약 코드를 자세히 살펴보면, 상태를 브라우저 히스토리에 추가하고 컴포넌트를 초기화할 때 URL 매개변수에서 초기 값을 가져온다는 점입니다.

여기서 중요한 장점 중 하나는 리로드 시 상태를 유지하고 브라우저 뒤로 가기 버튼을 사용하여 이전 상태로 이동할 수 있다는 것입니다.

# 결론

간단한 경우에는 URL 매개변수를 사용할 수 있습니다. 데이터가 조금 더 복잡한 경우에는 localStorage에 저장하는 것이 좋습니다. localStorage 접근 방법을 사용하면 컴포넌트 레벨 또는 앱 레벨에서 상태를 유지할 지를 결정할 수 있습니다.

간단하게 하려면, Redux Persist와 같은 라이브러리를 사용하여 앱 상태를 영구 저장하고 다시 구성하는 방법이 있습니다.

그러나 선택한 옵션에 상관없이 상태 변경을 철저히 관리하는 것도 중요합니다. 한 번 상태가 설정되면 새 릴리스에서 상태 관련 코드를 수정하면 일부 사용자에게 애플리케이션을 망가뜨릴 수도 있습니다.

읽어 주셔서 감사합니다. 그리고 댓글 섹션에서 어떻게 생각하시는지 꼭 알려주세요. 🤔

## 리액트 앱을 레고처럼 재사용 가능한 컴포넌트로 구축해보세요

![이미지](/assets/img/2024-05-12-5MethodstoPersistingStateBetweenPageReloadsinReact_1.png)

Bit의 오픈 소스 도구는 250,000명 이상의 개발자들이 컴포넌트로 앱을 구축하는 데 도움을 줍니다.

어떤 UI, 기능 또는 페이지든지 재사용 가능한 컴포넌트로 변환하고 애플리케이션 간에 공유할 수 있습니다. 협업하기가 더 쉽고 빠르게 빌드할 수 있습니다.

→ 자세히 알아보기

앱을 컴포넌트로 분할하여 앱 개발을 더 쉽고 편안하게 만들고 원하는 작업 흐름에 최고의 경험을 누리세요:

## → 마이크로 프론트엔드

## → 디자인 시스템

## → 코드 공유 및 재사용

## → 모노 레포

## 자세히 알아보기
