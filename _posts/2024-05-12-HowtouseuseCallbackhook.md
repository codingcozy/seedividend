---
title: "useCallback 훅 사용 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtouseuseCallbackhook_0.png"
date: 2024-05-12 20:22
ogImage: 
  url: /assets/img/2024-05-12-HowtouseuseCallbackhook_0.png
tag: Tech
originalTitle: "How to use useCallback() hook"
link: "https://medium.com/@dev_one/how-to-use-usecallback-hook-35dc047aee48"
---


## useCallback()을 사용하여 React 컴포넌트의 성능을 향상시키세요.

![이미지](/assets/img/2024-05-12-HowtouseuseCallbackhook_0.png)

React 애플리케이션의 성능 향상에는 불필요한 렌더링을 방지하고 렌더링이 전파되는 시간을 줄이는 것이 포함됩니다. useCallback()을 사용하면 몇 가지 불필요한 렌더링을 방지하고 성능을 향상시킬 수 있습니다.

이 글에서는 useCallback() 훅을 자세히 살펴보고, 더 나은 React 코드를 작성하기 위해 올바르게 사용하는 방법에 대해 알아보겠습니다.



# 1. 함수 동등성

useCallback()에 대해 자세히 알아보기 전에 참조 동등성과 함수 동등성의 개념을 간단히 상기해 보겠습니다.

JavaScript에서 함수는 다른 변수와 마찬가지로 다룰 수 있습니다. 함수는 다른 함수에서 인수로 전달될 수 있고, 다른 함수에 의해 반환될 수 있으며, 변수에 값을 할당하거나 비교하는 등의 작업을 수행할 수 있습니다. 다시 말해, 객체가 할 수 있는 모든 작업을 수행할 수 있습니다.

sumFunctionFactory()라는 함수를 구현하여 숫자를 더하는 다른 함수를 반환하는 함수를 만들어 보겠습니다. 그런 다음 이 함수를 사용하여 function1과 function2라는 두 가지 함수를 만들어 보겠습니다.

위에서 function1과 function2 함수는 동일한 코드 소스를 공유하지만 별도의 함수 객체이며 서로 다른 인스턴스를 가리키기 때문에 그들을 비교하면 false가 나옵니다. 이것이 JavaScript가 동작하는 방식입니다.

# 2. useCallback() 훅

React로 돌아와서, 컴포넌트가 다시 렌더링될 때, 컴포넌트 내부의 각 함수가 재생성되므로 이러한 함수의 참조는 렌더 간에 변경됩니다.

useCallback(callback, dependencies)은 의존성 중 하나가 변경되었을 때에만 변경되는 캐시된 콜백의 인스턴스를 반환합니다. 이는 매 렌더링마다 함수 객체를 재생성하는 대신 렌더 간에 동일한 함수 객체를 사용할 수 있음을 의미합니다.



```js
const memoized = useCallback(() => {
   // the callback function to be memoized
},
  // dependencies array
[]);
```

# 3. 사용 사례 시나리오

## 최적화된 자식 컴포넌트에 콜백 전달하기

useCallback은 참조 동등성에 의존하는 최적화된 자식 컴포넌트에 콜백을 전달할 때 불필요한 렌더링을 방지하는 데 특히 유용합니다. 항목 목록을 렌더링하는 컴포넌트를 가정해보십시오:



비싸고 불필요한 리스트 다시 렌더링을 방지하기 위해 React.memo()로 묶어주세요.

부모 컴포넌트 `ParentComponent`에서 자식 컴포넌트 `MyList`로 핸들러 함수를 제공합니다:

핸들러 콜백은 useCallback()으로 메모이즈됩니다. 의존성이 동일한 한, useCallback()은 동일한 함수 객체를 반환합니다. `ParentComponent`가 다시 렌더링될 때, 핸들러 함수 객체는 동일하게 유지되어 `MyList`의 메모리제이션을 깨지지 않습니다.

![이미지](/assets/img/2024-05-12-HowtouseuseCallbackhook_1.png)



# 4. useCallback()를 사용하지 말아야 하는 경우

과도하게 사용하지 않도록 주의합시다. useCallback()에는 주로 코드 복잡성이라는 단점이 있습니다. useCallback()를 추가하는 것이 의미가 없는 경우가 많이 있고, 함수를 계속 재생성해야 하는 경우도 있습니다.

useCallback()은 여전히 모든 컴포넌트 재렌더링에서 실행해야 하므로 성능적인 단점이 있습니다. 이 예제에서는 useCallback()이 최적화에 도움이 되지 않습니다. 왜냐하면 매번 렌더링할 때마다 clickHandler 함수를 생성하기 때문에, 오히려 최적화 비용이 최적화하지 않는 것보다 더 많이 듭니다.

# 5. 결론



`useCallback(callback, dependencies)`는 `useMemo()`처럼 사용할 수 있지만 값 대신 함수를 메모이징하여 매 렌더링마다 재생성을 방지합니다. 불필요한 다시 렌더링을 피할 수 있어 응용 프로그램을 더욱 효율적으로 만들어줍니다.

성능 업그레이드를 고려할 때는 언제나 최적화 작업 이전에 컴포넌트의 속도를 측정(또는 프로파일링)해야 합니다. 최적화는 복잡성을 증가시키므로, 개발자로서 효과를 확실하게 확인해야 합니다.

더 많은 멋진 콘텐츠와 이와 유사한 프로젝트를 확인하려면 저희를 팔로우해주세요. Github 리포지토리도 꼭 확인해보세요: