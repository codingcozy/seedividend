---
title: "Zustand vs. Redux: 상태 관리 어떤 것을 사용해야할까? 비교 정리"
description: ""
coverImage: "/assets/img/2024-05-01-ZustandvsReduxAComprehensiveComparisoninStateManagement_0.png"
date: 2024-05-01 18:02
ogImage: 
  url: /assets/img/2024-05-01-ZustandvsReduxAComprehensiveComparisoninStateManagement_0.png
tag: Tech
originalTitle: "Zustand vs. Redux: A Comprehensive Comparison in State Management"
link: "https://medium.com/@breakingbadjs/zustand-vs-redux-a-comprehensive-comparison-in-state-management-687a86156b14"
isUpdated: true
---




![이미지](/assets/img/2024-05-01-ZustandvsReduxAComprehensiveComparisoninStateManagement_0.png)

현재 웹 개발에서 상태 관리는 응용 프로그램의 성능, 확장성 및 유지 관리성에 직접적인 영향을 미치는 중요한 측면입니다. 전통적으로 Redux는 React 애플리케이션에서 상태를 관리하는 데 사용되는 주요 라이브러리였습니다. 그러나 최근에 Zustand가 경쟁 대상으로 등장하여 더 간단하고 효율적인 대안을 제공하고 있습니다. 이 문서에서는 많은 개발자들이 Zustand를 Redux보다 더 나은 상태 관리 시스템으로 여기는 이유를 살펴볼 것입니다.

# 1. 간결함과 크기

Redux는 강력하지만 그 힘은 복잡성과 함께 옵니다. 액션, 리듀서 및 저장소 설정이 필요하며, 이는 초보자에겐 압도적일 수 있습니다. 반면 Zustand는 최소주의 방법을 취합니다. 복잡한 설정 없이 상태 관리를 제공하는 단일 훅입니다. 이 간결함은 Zustand를 접근하기 쉽게 만들어주며, 특히 작은 프로젝트나 상태 관리에 새로운 개발자들에게 유용합니다.

<div class="content-ad"></div>

Redux의 크기는 성능이 중요한 웹 애플리케이션에서도 고려해야 할 사항일 수 있습니다. 그것은 광범위한 기능 세트로 인해 상당한 번들 크기를 가지고 있습니다. 무게가 가벼운 Zustand(압축 후 1KB 미만)는 번들 크기를 유지하는 데 도움을 주어 로드 시간을 단축하고 성능을 향상시킵니다.

# 2. 불변성이 쉬워집니다

Redux는 예측 가능한 상태 변경을 위한 좋은 사례인 불변성을 강제합니다. 그러나 이를 달성하기 위해 종종 많은 보일러플레이트 코드가 필요합니다. Zustand는 React의 useReducer와 useState 훅과 통합되어 상태를 직접 변경할 수 있도록 하여 불변성을 간소화합니다. 이는 완전히 불변성을 포기해야 한다는 뜻은 아니지만 Zustand는 상태 변경을 처리하는 보다 편리한 방법을 제공합니다.

# 3. 편리한 API

<div class="content-ad"></div>

Zustand API는 React 개발자들에게 자연스러운 느낌을 제공하도록 설계되었습니다. 스토어를 정의할 때 간단한 create 함수와 상태에 액세스하기 위한 hook을 제공합니다.

다음은 기본적인 예시입니다:

```js
import create from 'zustand';
const useCountStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

function Counter() {
  const count = useCountStore((state) => state.count);
  const increment = useCountStore((state) => state.increment);
  const decrement = useCountStore((state) => state.decrement);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

이 API는 직관적이고 간결하여 Zustand를 사용하기 쉽게 만듭니다.

<div class="content-ad"></div>

# 4. 성능 최적화

Zustand은 React의 컨텍스트와 후크를 활용하여 다시 렌더링을 최적화합니다. React의 내장된 메모이제이션 덕분에 변경된 특정 상태를 사용하는 컴포넌트만 다시 렌더링됩니다. 이는 때로는 불필요한 업데이트가 발생할 수 있는 Redux와 비교해 적은 수의 다시 렌더링을 가져올 수 있습니다.

# 5. 개발 도구 통합

Redux는 디버깅에 매우 유용한 개발자 도구 생태계를 갖추고 있습니다. Zustand은 Redux와 같이 전용 개발 도구 확장 기능을 갖추고 있지 않지만, Redux DevTools 또는 React DevTools와 같은 인기있는 개발 도구와 통합할 수 있습니다. 이를 통해 Redux와 동일하게 Zustand 스토어를 검사하고 타임 트래블 디버깅할 수 있습니다.

<div class="content-ad"></div>

## 6. React Concurrent Mode 호환성

React Concurrent Mode의 등장으로, Zustand는 이와 원활하게 작업할 수 있습니다. Concurrent Mode는 React 애플리케이션의 성능과 반응성을 향상시키기 위해 설계되었으며, Zustand의 가벼운 성격은 이 목표와 잘 맞습니다.

## 7. 커뮤니티 및 채택

Redux는 오랜 기간동안 존재하며 방대한 커뮤니티와 생태계를 갖추고 있습니다. 대규모 및 복잡한 애플리케이션에 유리할 수 있습니다. 그러나 Zustand의 커뮤니티는 꾸준히 성장하고 있으며, 그 간결함과 사용 편의성으로 더 많은 개발자들을 끌어들이고 있어 새로운 프로젝트에 유망한 선택지가 될 수 있습니다.

<div class="content-ad"></div>

종합적으로, Zustand와 Redux는 둘 다 가능성 있는 상태 관리 라이브러리이지만, 그 적합성은 프로젝트 요구사항과 팀원들의 익숙함에 따라 다릅니다. Zustand는 간결함, 크기, 그리고 사용 편의성 측면에서 빛을 발하며, 이는 작거나 중간 규모의 프로젝트나 복잡하지 않은 상태 관리 솔루션을 선호하는 개발자들에겐 탁월한 선택이 될 수 있습니다. Redux는 광범위한 생태계와 도구들을 갖추고 있어, 복잡한 상태 관리가 필요한 대규모 애플리케이션에는 여전히 견고한 선택이 될 것입니다. 결국, Zustand와 Redux 사이의 선택은 프로젝트의 구체적인 요구사항과 제약 사항에 기반하여 이루어져야 합니다.