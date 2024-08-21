---
title: "useEffect가 실행 방식 이해하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "What Fired My useEffect"
link: "https://medium.com/javascript-in-plain-english/what-fired-my-useeffect-913c827c32d5"
isUpdated: true
---

React를 개발하면 함수형 컴포넌트에서 부작용을 다룰 때 일부 도전이 있습니다. React의 useEffect 훅은 부작용을 다루는 강력한 도구지만, 어떤 종속성 변경이 특정 효과를 트리거한지 이해하기 어려울 때가 있습니다. 이를 해결하기 위해 실용적인 솔루션을 소개하겠습니다: useEffectDependencyDebugger.

useEffectDependencyDebugger가 등장한 동기

useEffect를 사용할 때 개발자들은 종속성이 훅을 발동시킨 정확한 원인을 알아야 하는 경우가 많습니다. 이 지식은 디버깅과 최적화에 중요하며, 특히 효과가 여러 상태 변수나 프롭에 의존하는 복잡한 컴포넌트에서 더욱 중요합니다.

useEffectDependencyDebugger의 작동 방식

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

useEffectDebugger는 표준 useEffect 훅을 감싸고 의존성이 변경되어 효과를 발생시킨 것을 명확하게 파악할 수 있도록 설계된 사용자 정의 후크입니다. usePrevious라는 도우미 후크를 활용하여 이전에 사용된 의존성 값을 추적하여 현재 값과 비교할 수 있습니다.

도구 만들기: usePrevious 및 useEffectDependencyDebugger

usePrevious 후크:

usePrevious는 렌더링을 거칠 때마다 의존성의 이전 값을 캡처하고 유지합니다. useRef를 활용하여 값을 보유하고 useEffect를 통해 각 렌더링에서 업데이트합니다.

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
const usePrevious = (value, initialValue) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
```

이 useEffectDependencyDebugger 훅은:
이 사용자 정의 훅은 마지막 렌더 이후 변경된 종속성을 식별하고 기록합니다. 현재 종속성을 이전 값과 비교하여 변경 내용을 디버깅을 위해 기록한 후, 제공된 효과 함수 및 종속성으로 원래의 useEffect 훅을 호출합니다.

```js
const useEffectDependencyDebugger = (effectFunction, dependencies) => {
  const previousDependencies = usePrevious(dependencies, []);
  const changedDependencies = dependencies.reduce((accum, dependency, index) => {
    if (dependency !== previousDependencies[index]) {
      const keyIdx = index;
      accum[keyIdx] = {
        before: previousDependencies[index],
        after: dependency,
      };
    }
    return accum;
  }, {});
  if (Object.keys(changedDependencies).length) {
    console.log("[use-effect - dependency-debugger]", changedDependencies);
  }
  useEffect(effectFunction, dependencies);
};
```

이제 이 2가지 훅을 어떻게 사용할 수 있는지:

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
// Before :
useEffect(() => {
  // Effect logic here…
}, [dep1, dep2]);

//After
useEffectDependencyDebugger(() => {
  // Effect logic here…
}, [dep1, dep2]);
```

결론

useEffectDebugger는 useEffect 훅을 트리거하는 의존성을 정확히 파악할 수 있는 간단하고 효과적인 방법을 제공하여 디버깅 프로세스를 크게 개선합니다. 의존성 변경에 대한 통찰력을 제공함으로써, 개발자들은 컴포넌트를 더 잘 이해하고 최적화할 수 있어서 더 효율적이고 유지보수 가능한 React 애플리케이션을 구축할 수 있습니다.

# 간단하게 설명하자면 🚀

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

이해하기 쉽게 설명하는 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 clapping하고 팔로우해주세요 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 확인하세요
