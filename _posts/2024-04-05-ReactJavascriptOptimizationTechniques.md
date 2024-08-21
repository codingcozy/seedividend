---
title: "React, 자바스크립트 최적화 기술"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "React , Javascript Optimization Techniques"
link: "https://medium.com/globant/javascript-optimization-techniques-20d8d167dadd"
isUpdated: true
---

<img src="/assets/img/React-JavascriptOptimizationTechniques_0.png" />

프로젝트를 시작할 때 우리는 확장성, 사용성, 가용성, 보안 등과 같은 요소에 주로 초점을 맞추곤 합니다. 그러나 애플리케이션이 성장함에 따라 속도와 성능이 저하되는 것을 관찰할 수도 있습니다. 종종 우리는 최적화의 필요성을 깨닫는 것은 이 시점뿐입니다.

본 문서에서는 코드 최적화를 위한 가장 일반적인 기술들을 제시할 것이며, 이 기술들은 모든 애플리케이션에 적용할 수 있습니다. 또한 JavaScript와 React로 작성된 샘플 코드를 활용한 최적화 기술을 소개할 것입니다. 다음과 같은 기술들이 다루어질 예정입니다:

- Debouncing
- Throttling
- Memoization
- Pure Components
- Lazy Loading
- Virtualization (or Windowing)
- Error Boundaries
- Inline Functions

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

많은 기법이 더 있지만, 이 글에서는 이미 언급된 것들에 초점을 맞출 것입니다.

# 디바운싱

디바운싱은 많은 실행 시간을 소비하는 함수들의 처리를 최적화하기 위해 사용되는 프로그래밍 기법입니다. 이 기법은 이러한 함수들이 조절 없이 반복적으로 실행되는 것을 방지함으로써, 애플리케이션의 성능을 향상시킬 수 있습니다.

특정 사용자 작업에 응답해야 하는 애플리케이션의 경우, 특정 함수들이 반복적으로 실행되는 것을 피할 수 없는 경우가 많습니다. 예를 들어, mousemove나 window.resize와 같은 이벤트들은 단순한 마우스 이동이나 브라우저 창 크기 조정으로 이러한 함수들에 수백 번의 호출을 일으킬 수 있습니다. 이런 경우에는 이러한 호출을 제한하고 이벤트나 함수에서 발생할 수 있는 성능 문제를 해결하기 위해 디바운싱과 같은 기법을 사용합니다.

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

디바운싱 작업은 꽤 간단합니다. 우리가 최적화하고자 하는 콜백 함수를 호출하는 빈도를 제한하는 인터셉터의 역할을 하는 함수를 생성하는 것으로 이루어져 있습니다. 이 함수는 최소 두 개의 매개변수를 갖습니다: 시간(time)과 콜백(callback). 시간 매개변수는 함수가 호출되기 전에 대기해야 하는 시간을 디바운스에 알려주는 데 사용되며, 콜백 매개변수는 이 시간 제한에 종속된 함수입니다. 제어 메커니즘이 생성되면, 디바운스 함수는 원래의 함수 자리에 사용할 새로운 최적화된 함수를 반환합니다.

디바운싱에서, 정의된 시간 창 안에서 콜백에 대한 여러 호출이 발생하는 경우, 마지막 호출만 실행되고 이전 호출은 무시됩니다. 게다가, 이 과정에서 호출이 발생할 때마다 시간 창은 갱신됩니다. 예를 들어, 시간을 2초로 정의하면, 디바운스 함수에 정의된 콜백은 2초 이후에만 실행됩니다. 시간 창 내에서 여러 호출이 발생하는 경우, 해당 시간에 대해 계속 갱신되며, 정의된 시간에 도달하면 디바운스 함수에 들어간 마지막 함수만 실행됩니다.

JavaScript를 사용하여 코드에 디바운싱을 구현하는 간단한 예제를 제공합니다:

```js
// Example 1

const debounce = (callback, time = 300) => {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(callback, time);
  };
};
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

간단한 버전에서, debounce 함수는 debounce를 처리할 함수를 반환합니다. 반환된 함수는 이전에 생성된 타임아웃의 타이머 변수를 지우고 매개변수로 받은 콜백을 통해 새로운 타임아웃을 설정합니다. 새로운 debounce 함수가 실행될 때마다 같은 타이머 변수에 접근하여 지우고 각 시간마다 타임아웃을 교체합니다.

따라서 우리는 debounce를 만들었고 사용하는 방법은 다음과 같습니다:

```js
// 예시 2

// 우리가 debounce하고 싶은 함수
const showMessage = () => console.log("Hello Message");

// 1초의 지연이 있는 debounce된 함수
const debouncedMessage = debounce(showMessage, 1000);

// 이 루프에서 10000번 호출합니다
for (let i = 0; i < 10000; i++) {
  setTimeout(debouncedMessage, i);
}
```

이 예시에서 debouncedMessage 함수는 for 루프에서 10,000번 호출됩니다. 그러나 debounce 덕분에 메시지는 10,000번이 아닌 한 번만 표시됩니다.

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

# 쓰로틀링

쓰로틀링은 디바운싱과 유사한 기술로, 두 가지 모두 함수 호출 빈도를 제한하는 데 사용됩니다. 차이점은 쓰로틀링은 함수가 호출될 때마다 타이머를 지우지 않고, 대신 새로운 타이머를 만들지 않도록 일시 정지 조건을 사용한다는 것입니다. 다시 말해, 함수가 호출되는 동안 마지막 호출이 실행될 때까지 기다리지 않고, 대신 일시 정지가 해제된 시간 간격에 들어가면 함수를 호출합니다.

이를 더 잘 이해하기 위해 예제를 살펴보겠습니다:

```js
// 예제 3

const throttle = (callback, time = 300) => {
  let pause = false;

  return () => {
    if (pause) return;
    pause = true;
    callback();
    setTimeout(() => {
      pause = false;
    }, time);
  };
};
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

위의 예에서 볼 수 있듯이, 디바운스와는 달리 이제 타이머 대신 일시 정지 변수인 pause 변수가 있습니다. 그리고 반환된 함수의 동작이 다릅니다. 이제는 pause가 true인지 확인한 후 반환하는 것을 볼 수 있는데, 이는 코드의 나머지 부분이 실행되는 것을 막는 것으로, 탈출 조건입니다. 이 조건에서 실행이 중단되지 않는 경우, pause를 활성화하여 이 함수에 대한 후속 호출이 실행되지 않도록 합니다. 그런 다음 콜백을 호출하고, 마지막으로 스로틀링 프로세스를 종료하고 정의한 시간이 경과하면 pause를 해제하는 setTimeout을 남깁니다.

스로틀링의 경우, 앞에서 설명한 대로 함수 호출을 제한하지만 호출이 계속되는 한 일정한 간격으로 실행됩니다. 반면에 디바운싱의 경우, 마지막 호출을 기다려 함수를 한 번만 실행할 수 있도록 합니다.

더 잘 이해하기 위해 다음 예제를 살펴봅시다:

```js
// 예제 4

// 스로틀링을 원하는 함수
const showMessage = () => console.log("Hello Message");

// 1초의 지연이 있는 스로틀링 함수
const throttledMessage = throttle(showMessage, 1000);

// 이 루프에서 10000번 호출합니다.
for (let i = 0; i < 10000; i++) {
  setTimeout(throttledMessage, i);
}
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

디바운싱의 경우에는 각 실행마다 타임아웃이 마지막 호출이 10초(10,000밀리초) 지속될 때까지 갱신되었기 때문에 메시지가 한 번만 표시되었습니다. 그에 반해, 쓰로틀링의 경우에는 일 초마다 한 번(1000밀리초)메시지가 10번 표시되었는데, 실행을 조건 지을 일시 정지 때문입니다. 보시다시피 두 기술은 동일한 목표를 가지고 있지만 코드와 동작에서 약간의 차이가 있습니다. 이 약간의 차이로 인해 상황에 맞게 한 가지 기법이나 다른 기법을 선택할 수 있습니다. 따라서 언제 어느 것을 구현해야 하는지 알아야 하므로 이 두 가지 기술을 알고 있는 것이 중요합니다.

# 메모이제이션

메모이제이션은 함수의 결과를 메모리 공간에 저장하여 나중에 검색할 수 있도록하는 기술을 말합니다. 이를 통해 함수가 동일한 매개변수로 호출될 때마다 결과를 다시 계산하지 않아도 되도록 합니다. 이 기술은 많은 리소스를 소비하는 함수에 사용됩니다. 이러한 경우에는 메모이제이션을 통해 성능을 개선하고 결과를 빠르게 얻을 수 있습니다.

이 기술은 React에서도 사용할 수 있으며 React에서는 다음과 같은 메모이제이션 기능을 활용할 수 있습니다:

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

- React.memo
- useMemo
- useCallback

하지만, React에서 이러한 기능들을 사용하는 방법을 설명하기 전에, 먼저 예시로 숫자의 팩토리얼을 계산하는 알고리즘을 사용하여 JavaScript에서의 메모이제이션에 대해 논의해보겠습니다. 구현은 다음과 같을 것입니다:

```js
// 예시 5

const getFactorial = (n) => {
  if (n === 1 || n === 0) return 1;
  return n * getFactorial(n - 1);
};
```

처음에는 이 알고리즘이 간단해 보입니다. 그러나 재귀 함수이기 때문에, 매우 큰 숫자를 전달할 때 주의해야 합니다. 제공하는 값에 따라 이 함수는 처리에 매우 많은 비용이 들 수 있습니다. 아시다시피, 숫자의 팩토리얼은 간단히 이전 숫자들과의 재귀적인 곱셈을 계속 수행하여 1에 도달할 때까지의 값입니다. 공식은 다음과 같이 됩니다: n! = n · (n - 1) · (n - 2) · … · 1.

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

예를 들어, 6의 팩토리얼을 계산하려면 다음과 같이 계산할 수 있습니다: 6! = 6 · 5 · 4 · 3 · 2 · 1. 이 알고리즘의 특징은 이러한 곱셈 중 많은 것들이 한 번만 수행될 수 있고 그 결과를 조회 테이블이나 객체에 저장할 수 있다는 것입니다. 그렇게 하면 다시 해당 값을 얻어야 할 때마다 다시 계산할 필요가 없어집니다. 이 함수를 메모이제이션하는 한 가지 방법은 다음과 같습니다:

```js
// 예시 6

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = args.join("-");
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    // 여기에 console.log(cache)를 추가하여 cache가 어떻게 채워지는지 확인할 수 있습니다.
    return result;
  };
};

const getFactorial = memoize((n) => {
  if (n === 1 || n === 0) return 1;
  return n * getFactorial(n - 1);
});

// 100번 실행됩니다
getFactorial(100);

// 100 미만의 모든 값은 이전에 메모이제이션되어 있으므로 한 번만 실행됩니다
getFactorial(99);
```

이 예시에서 먼저 memoize 함수가 정의되는데, 이 함수는 함수를 매개변수로 받아 원래 함수의 결과를 메모이제이션하는 새로운 함수를 반환합니다. 이 새 함수는 이전에 계산된 결과를 캐시하는 데 Map 객체를 사용합니다. 메모이제이션된 함수가 일정한 인수로 호출될 때, 먼저 캐시에 해당 인수에 대한 결과가 이미 저장되어 있는지 확인합니다. 그렇다면 저장된 결과를 반환합니다. 그렇지 않으면 해당 인수로 원래 함수를 호출하여 결과를 계산하고, 그 결과를 캐시에 저장하고 반환합니다.

그런 다음 getFactorial 함수가 memoize 함수에 전달되고 그 결과가 새 변수에 할당됩니다. 이제 memoized된 getFactorial을 다른 함수처럼 호출할 수 있지만 이전 결과를 캐시에 저장하여 반복된 계산에 더 효율적입니다.

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

이것을 다시 말하면, 100의 팩토리얼을 계산할 때, 함수는 100번 실행될 것입니다. 그러나 그 때까지 이미 모든 계산을 캐시 오브젝트에 저장해 두었을 것입니다. 따라서 동일한 값이나 100 미만의 값으로 함수를 다시 실행할 때는 다시 모든 것을 계산할 필요가 없어지며, 대신에 우리가 만들어 둔 캐시 오브젝트에서 값을 얻을 것입니다; 결과적으로 함수는 단 한 번만 실행될 것입니다.

이렇게 함으로써, 우리는 이 함수를 최적화하여 재계산을 피하고 응답 속도를 향상시켰습니다. 요약하면, 메모이제이션은 컴포넌트를 최적화하는 좋은 기술입니다. 이것이 최적화 기술을 사용하는 가장 큰 장점 중 하나입니다.

## React.memo

이것은 컴포넌트가 받는 프롭들이 변경되지 않을 때 불필요한 렌더링을 피하는 데 유용한 도구입니다. React.memo의 목적은 애플리케이션 성능을 향상시키는 것입니다. 하지만, React.memo는 상태나 콘텍스트(React.Context) 업데이트로 인한 컴포넌트 렌더링을 막지 못한다는 점을 유의해야 합니다. React.memo는 프롭만 고려하여 다시 렌더링을 피하기 때문입니다.

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

React.memo를 사용하는 것은 구현하기가 매우 간단합니다. 아래에 사용 방법 예제가 나와 있어요:

```js
// 예제 7

import { memo } from "react";
import { MyComponent } from "./MyComponent";

export const App = () => {
  // 컴포넌트 사용 방법
  const MemoizedComponent = memo(MyComponent);

  // 함수 표현식 사용 방법
  const MemoizedComponent2 = memo(function ({ data }) {
    return <div>Some interesting {data}</div>;
  });

  // 화살표 함수 사용 방법
  const MemoizedComponent3 = memo(({ data }) => {
    return <div>Some interesting {data}</div>;
  });

  const someDataPassedAsProp = {};

  return <MemoizedComponent data={someDataPassedAsProp} />;
};
```

이렇게 하면 프롭이 시간이 지나도 같은 값을 유지하는 한 컴포넌트가 다시 렌더링되지 않습니다. 이는 자식 요소가 많은 컴포넌트나 프롭이 자주 변경되지 않는 상황에서 특히 유용합니다. 이렇게 하면 불필요한 업데이트를 피하고 응용 프로그램 성능을 향상시킬 수 있어요.

## React.useMemo

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

이 hook은 컴포넌트 렌더링 사이에서 비용이 많이 드는 함수의 결과를 캐싱하고, 해당 함수의 종속성이 변경될 때만 함수를 다시 실행하는 것을 허용합니다. 하지만 조심해야 합니다. 이 hook은 루프나 조건문 내에서가 아니라 컴포넌트나 다른 hook 내에서만 사용해야 합니다.

이 hook이 어떻게 작동하는지 이해하기 위해, expensiveCalculationFn 함수를 예로 들어봅시다. 이 함수는 이론적으로 복잡하고 비용이 많이 드는 계산을 수행해야 한다고 가정합니다. 우리 컴포넌트에서 useMemo를 사용하여 매번 컴포넌트가 렌더링될 때 실행되지 않도록 할 수 있습니다. 이렇게 함으로써, hook은 마지막 캐시된 값을 반환하고, 종속성이 변경된 경우에만 해당 값을 업데이트할 것입니다.

다음은 컴포넌트에서 useMemo를 사용하는 예시입니다:

```js
// Example 8

import { useMemo, useState } from "react";

const expensiveCalculationFn = (a, b, c) => {
  // 이 함수가 비용이 많이 드는 계산을 수행한다고 가정합시다.
  return a * b * c;
};

export const MyComponent = (props) => {
  const { a, b, c } = props;

  // useMemo는 expensiveCalculationFn을
  // 종속성이 변경되었을 때에만 실행합니다.
  const result = useMemo(() => expensiveCalculationFn(a, b, c), [props]);

  return <h1>{result}</h1>;
};
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

이 예시에서는 useMemo를 사용하여 비싼 계산 함수(expensiveCalculationFn)가 모든 컴포넌트 렌더링마다 비용이 많이 드는 실행을 피합니다. 이 경우 의존성인 props가 변경되지 않으면 훅은 마지막 캐시된 값만 반환합니다. 또한, useMemo와 함께 사용하는 함수는 순수 함수여야 하는 것이 권장됩니다.

이 훅에 대해 더 알고 싶다면, 다양한 상황에서 기능과 적용 가능성을 더 잘 이해하기 위해 여러 사용 예제를 포함한 공식 문서를 참조하는 것을 권장합니다.

유의해야 할 점은 useMemo가 메모이제이션을 위해 사용되는 React의 내장 훅이며 일반적인 자바스크립트 메모이제이션용이 아니며, 사용법은 일부 경우에만 권장됩니다. 자세한 내용은 여기에서 확인할 수 있습니다.

## React.useCallback

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

콜백 훅은 이전 것과 매우 유사하지만, 이 훅은 함수 정의를 캐시하고 실행 결과 값은 캐시하지 않는 점에서 다릅니다. 정의된 의존성이 값으로 변경될 때만 업데이트가 발생합니다. useCallback은 함수를 실행하지 않고 함수를 저장하고 나중에 실행될 수 있도록 정의를 업데이트합니다. 그에 반해, React.useMemo은 함수를 실행하고 캐시에 결과 값을 저장하고 업데이트합니다.

이 훅은 예를 들어, 부모 구성 요소의 렌더링으로 인한 다시 렌더링을 피하고 싶은 자식 구성 요소에 전달된 콜백을 캐시하는 데 유용할 수 있습니다. 함수 참조를 캐시하고 콜백을 캐시한 상태로 유지하면 업데이트되지 않을 경우 이전 참조를 유지하므로 내부적으로 React.memo로 캡슐화된 경우에는 다시 렌더링되지 않을 것입니다. useCallback의 사용 방법을 확인하기 위해 다음 컴포넌트를 최적화해보겠습니다:

```js
// Example 9

import { useEffect, useState } from "react";

// 이것은 최적화하려는 자식 컴포넌트입니다.
const ChildComponent = ({ callback }) => {
  console.log("자식이 렌더링되었습니다...");
  return <button onClick={callback}>Click me!</button>;
};

export const MyComponent = (props) => {
  // 여기에는 몇 가지 상태와 변수가 있습니다.
  const [color, setColor] = useState("#ff22ff");
  const [otherState, setOtherState] = useState(false);
  const otherVariables = "다른 변수...";

  // 최적화하려는 콜백입니다.
  const callbackFn = () => {
    console.log("안녕, 클릭했어요!");
  };

  // 상태를 업데이트하여 다시 렌더링을 트리거합니다.
  useEffect(() => {
    setTimeout(() => {
      setColor("#00ddd2");
    }, 3000);
  }, []);

  // 콜백을 props로 전달받은 자식 컴포넌트입니다.
  return <ChildComponent callback={callbackFn} />;
};
```

여기에는 최적화되지 않은 보통의 컴포넌트가 있습니다. 여러 상태 및 변수를 가지고 있으며, 함수 callbackFn을 props로 전달받는 자식 컴포넌트를 렌더링합니다. 이 경우 우리가 컴포넌트의 상태를 업데이트할 때마다 기본적으로 자식 컴포넌트가 다시 렌더링됩니다. 자식 컴포넌트의 다시 렌더링을 피하려면 React.memo로 캡슐화해야합니다. React.memo는 props가 변경되지 않으면 컴포넌트의 다시 렌더링을 피합니다. 그러니 이를 해보죠:

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
// 예제 10

import { useEffect, useState, memo } from "react";

// 우리가 최적화하고 싶은 자식 컴포넌트
const ChildComponent = memo(({ callback }) => {
  console.log("자식이 렌더링되었어요...");
  return <button onClick={callback}>클릭해주세요!</button>;
});

export const MyComponent = (props) => {
  // 여기에 몇 가지 상태와 변수가 있습니다.
  const [color, setColor] = useState("#ff22ff");
  const [otherState, setOtherState] = useState(false);
  const otherVariables = "다른 변수...";

  // 캐시하고 싶은 콜백 함수입니다.
  const callbackFn = () => {
    console.log("안녕, 클릭했어!");
  };

  // 상태를 업데이트하여 다시 렌더링을 트리거할 수 있습니다.
  useEffect(() => {
    setTimeout(() => {
      setColor("#00ddd2");
    }, 3000);
  }, []);

  // 콜백을 프롭으로 전달하여 자식 컴포넌트입니다.
  return <ChildComponent callback={callbackFn} />;
};
```

제가 보여드린대로, 이제 React.memo로 컴포넌트를 캐시했습니다. 그러나 문제를 완전히 해결한 것은 아닙니다. MyComponent 내에서 ChildComponent에 전달하는 함수는 실제로 참조입니다. 따라서 MyComponent가 업데이트될 때마다 해당 함수의 참조도 업데이트됩니다. 이로 인해 ChildComponent에서 불필요한 다시 렌더링이 발생하지 않도록 하려면 useCallback을 사용할 수 있습니다. useCallback을 사용하면 함수가 종속성이 변경되지 않는 한 정의와 참조를 유지합니다. 이렇게 하면 ChildComponent의 프롭이 업데이트되는 것을 방지하여 불필요한 다시 렌더링을 피할 수 있습니다. 아래는 컴포넌트의 최종 버전입니다:

```js
// 예제 11

import { useEffect, useState, memo, useCallback } from "react";

// 우리가 최적화하고 싶은 자식 컴포넌트
const ChildComponent = memo(({ callback }) => {
  console.log("자식이 렌더링되었어요...");
  return <button onClick={callback}>클릭해주세요!</button>;
});

export const MyComponent = (props) => {
  // 여기에 몇 가지 상태와 변수가 있습니다.
  const [color, setColor] = useState("#ff22ff");
  const [otherState, setOtherState] = useState(false);
  const otherVariables = "다른 변수...";

  // 캐시하고 싶은 콜백 함수입니다.
  const callbackFn = useCallback(() => {
    console.log("안녕, 클릭했어!");
  }, [props, otherState, otherVariables]); // 이들은 종속성일 수 있습니다.

  // 상태를 업데이트하여 다시 렌더링을 트리거할 수 있습니다.
  useEffect(() => {
    setTimeout(() => {
      setColor("#00ddd2");
    }, 3000);
  }, []);

  // 콜백을 프롭으로 전달하여 자식 컴포넌트입니다.
  return <ChildComponent callback={callbackFn} />;
};
```

useCallback의 사용에 대해 더 알고 싶다면 추가 사용 사례가 설명된 공식 문서를 계속 읽어보세요.

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

# 순수 컴포넌트

React 컴포넌트는 동일한 상태와 속성(props)에 대해 동일한 출력을 렌더링하는 경우에 순수하다고 간주됩니다. 이 유형의 컴포넌트에 대해 React는 PureComponent 클래스를 제공합니다. PureComponent 클래스를 확장하는 클래스 컴포넌트는 순수 컴포넌트로 취급됩니다. 순수 컴포넌트는 props와 state의 얕은 비교를 사용하여 shouldComponentUpdate() 메서드를 구현함으로써 성능 향상과 렌더링 최적화가 이루어집니다.

그러나 요즘에는 보통 함수형 컴포넌트가 더 일반적으로 사용됩니다. 이미 클래스 컴포넌트를 사용중이거나 클래스 순수 컴포넌트를 사용 중이라면 순수 클래스 컴포넌트에서 함수형 컴포넌트로의 이관 방법에 대해 읽어보고 싶을 것입니다. 하지만 그것을 제외하고도 순수 컴포넌트가 어떻게 작동하며 클래스로 사용하는 방법을 알아두는 것이 항상 좋습니다. 이제 몇 가지 순수 컴포넌트 예제를 살펴봅시다.

```js
// Example 12

import React, { Component, PureComponent, memo } from "react";

// 일반 클래스 컴포넌트 - 최적화되지 않음
class MyComponent extends Component {
  render() {
    return <div>내 컴포넌트</div>;
  }
}

// 순수 클래스 컴포넌트 - 최적화됨 - 속성과 상태의 동등성을 확인
class MyComponent extends PureComponent {
  render() {
    return <div>내 컴포넌트</div>;
  }
}

// 최적화되지 않은 함수형 컴포넌트
const MyComponent = (props) => <div>내 컴포넌트</div>;

// memo로 최적화된 함수형 컴포넌트
const MyComponent = memo((props) => <div>내 컴포넌트</div>);
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

어떤점에서든, React에서 호출되는 라이프사이클 메서드인 shouldComponentUpdate() 메서드를 사용할 수 있습니다. 기본적으로 항상 true를 반환하며, 이는 해당 컴포넌트가 상태나 프롭스가 변경될 때 항상 리렌더링된다는 것을 의미합니다.

이를 이용해 컴포넌트(순수 컴포넌트가 아닌 클래스 컴포넌트)의 shouldComponentUpdate() 메서드를 정의하여 성능을 최적화할 수 있습니다. 이 메서드는 두 개의 파라미터를 받고, nextProps와 nextState가 됩니다. 현재 프롭스와 상태와 비교하여 컴포넌트를 다시 렌더링할 필요가 없는 경우 false를 반환할 수 있습니다.

순수 컴포넌트에서는 React가 프롭스와 상태를 얕은 비교로 자동으로 실행하여 shouldComponentUpdate()를 구현합니다. 이는 이전 렌더링과 현재의 프롭스 및 상태가 동일한 경우 컴포넌트가 다시 렌더링되지 않는다는 것을 의미합니다.

함수형 컴포넌트에서는 shouldComponentUpdate()와 동등한 것으로 React.memo나 useMemo 훅을 사용할 수 있습니다. 이러한 방법은 프롭스의 얕은 비교를 실행하여 불필요한 재렌더링을 방지하여 useState와 함께 사용하여 해당 컴포넌트의 상태를 처리할 수 있습니다.

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

# 레이지 로딩

React.lazy는 React 기술로, 컴포넌트를 처음 렌더링할 때까지 게으르게 가져올 수 있게 합니다. 이 기술은 모든 컴포넌트 번들을 한꺼번에 가져오고 싶지 않을 때 유용하며, 이로 인해 애플리케이션의 로드 시간이 느려질 수 있습니다. React.lazy의 아이디어는 특정 페이지를 빠르게 로드하기 위해 페이지가 필요로 하는 부분만 가져와 로딩 속도를 높이는 것입니다. 이는 많은 컴포넌트를 포함하는 대규모 또는 복잡한 애플리케이션에서 특히 유용할 수 있습니다.

다음은 레이지 로딩을 사용하는 방법입니다:

```js
// 예제 13

import { lazy } from "react";

// 일반적인 import
import MyNormalComponent from "./MyNormalComponent";

// 레이지 import
const MyLazyComponent = lazy(() => import("./MyLazyComponent"));
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

React.lazy를 사용하여 가져온 컴포넌트는 Suspense라는 다른 React 컴포넌트 내에 캡슐화하는 것이 좋습니다. 이 컴포넌트를 사용하면 우리는 게으른(lazy) 컴포넌트가 로드될 때 기다릴 때 대체 콘텐츠를 표시할 수 있습니다. 이 대체 콘텐츠에서는 사용자에게 로딩 중임을 알리기 위해 메시지나 로딩 애니메이션을 표시할 수 있습니다. React.Suspense를 사용하여 게으른 컴포넌트를 어떻게 사용하는지에 대한 예제는 다음과 같습니다:

```js
// Example 14

import { lazy, Suspense } from "react";
import LoadingAnimation from "./LoadingAnimation";

const MyLazyComponent = lazy(() => import("./MyLazyComponent"));

const MyApp = () => {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <MyLazyComponent />
    </Suspense>
  );
};
```

React.lazy는 기본 내보내기(default export)와 함께만 사용할 수 있다는 점에 유의해야 합니다. 따라서 컴포넌트가 이 방식으로 내보내어지지 않았다면 React.lazy가 문제 없이 사용할 수 있도록 컴포넌트의 내보내기를 수정해야 합니다. 더 자세한 내용은 여기서 확인할 수 있습니다.

또 하나 강조해야 할 중요한 점은 create-react-app으로 구축한 애플리케이션을 보유하고 있다면 React.lazy를 React Router와 함께 사용할 수 있다는 것입니다. 이를 통해 애플리케이션의 네비게이션을 최적화하여 자동으로 라우트별로 코드 분할을 생성합니다. 애플리케이션 전체 번들을 로드할 필요없이 애플리케이션을 탐색하는 동안 번들이 로드됩니다.

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

이것은 create-react-app이 웹팩을 기본적으로 구성해 놓아서 그럽니다. 그렇지 않은 경우에는 코드 분할 기능을 활성화하기 위해 수동으로 구성해야 합니다. React Router와 함께 lazy loading을 사용하는 예제가 여기 있습니다:

```js
// Example 15

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";

// 여기서는 lazy 컴포넌트를 가져오고 있습니다.
const Home = lazy(() => import("./Home"));
const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const About = lazy(() => import("./About"));

const MyApp = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingAnimation />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
```

이 라우트 기술을 사용함으로써, 번들을 분리하고 각각의 경로가 포함된 작은 번들인 "청크"를 생성합니다. 따라서 라우트를 로드할 때 전체 번들을 한꺼번에 다운로드하는 대신, 필요할 때마다 번들이 로드됩니다. 이 기술은 이미 언급했듯이 코드 분할이라고 알려져 있으며, 여기에서 더 많은 정보를 얻을 수 있습니다. 결국 이를 통해 애플리케이션의 로딩 속도가 최적화되어 더욱 부드럽고 사용자 경험을 향상시킵니다.

# 가상화 (윈도잉)

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

리액트 가상화는 현재 사용 중인 요소만 표시하여 고성능 사용자 인터페이스를 만들 수 있는 강력한 기술입니다. 리액트 가상화 라이브러리를 사용하거나 자체 알고리즘을 구축하든, 이 기술은 대량 데이터 집합을 처리하고 UI 성능을 향상시키도록 특별히 설계되었습니다. 언제든지 필요한 요소만 렌더링하여 가상화하면 리액트에서 더 나은 성능을 발휘할 수 있으며 더 원활한 사용자 경험을 제공합니다.

이 기술을 더 잘 이해하기 위해 다음 예를 살펴보세요:

![React 가상화 예시](/assets/img/React-JavascriptOptimizationTechniques_1.png)

가상화는 테이블에도 적용할 수 있으며, 행과 열 모두를 가상화하여 상당한 성능 향상을 달성할 수 있습니다. 이 기술은 특히 테이블과 같이 대량의 데이터를 표시하는 컴포넌트에 유용합니다. 현재 보이는 행과 열만 렌더링하면 리액트의 가상화가 이러한 컴포넌트의 성능을 크게 향상시킬 수 있습니다. 이를 더 잘 설명하기 위해 다음 예시를 살펴보죠:

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

![React-JavascriptOptimizationTechniques_2.png](/assets/img/React-JavascriptOptimizationTechniques_2.png)

만약 자체 가상 테이블이나 목록을 구현하고 싶다면, React 컴포넌트를 가상화하는 데 필요한 모든 도구를 제공하는 이 react-window 패키지를 추천합니다.

# 에러 경계

에러 경계(Error boundaries)는 자식 컴포넌트 트리 어디에서든 JavaScript 오류를 잡고 해당 오류를 로그에 기록하며, 충돌한 컴포넌트 트리 대신 대체 UI를 표시하는 React 컴포넌트입니다. 에러 경계는 그 아래 전체 트리의 렌더링, 라이프사이클 메서드 및 생성자 중에서 오류를 잡습니다. 중요한 점은 에러 경계가 이벤트 핸들러, 비동기 코드 또는 에러 경계 자체에서 발생하는 오류를 잡지 않는다는 것입니다. 에러 경계에 대한 자세한 내용은 여기에서 확인할 수 있습니다.

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

여기에 React를 사용하여 컴포넌트에서 에러 바운더리를 구현하는 방법의 예시가 있습니다:

```js
// 예시 16

import { PureComponent } from "react";

export class ErrorBoundaries extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 대체 UI가 표시되도록 상태를 업데이트합니다.
    // 이는 => this.setState({ hasError: true }) 와 유사합니다.
    return { hasError: true, errorInfo: error };
  }

  componentDidCatch(error, errorInfo) {
    // 에러를 로그로 남길 수도 있습니다.
    console.log(error, errorInfo, this.state.errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 사용자 정의 대체 UI를 렌더링할 수 있습니다.
      return <h1>문제가 발생했습니다.</h1>;
    }

    // 이는 children 또는 다른 것을 반환할 수 있습니다: this.props.children;
    return <div>이것은 아직 에러가 없는 주요 반환 컴포넌트입니다.</div>;
  }
}
```

이 구현을 사용하면 에러를 발생시킬 수 있는 모든 컴포넌트를 ErrorBoundary 컴포넌트로 래핑할 수 있으며, 해당 컴포넌트 내 또는 해당 컴포넌트의 하위 컴포넌트에서 발생하는 모든 에러를 캐치하고 처리할 수 있습니다. getDerivedStateFromError 메서드는 에러 발생 시 대체 UI를 표시하기 위해 상태를 업데이트하며, componentDidCatch 메서드는 에러를 콘솔이나 에러 보고 서비스에 로그합니다.

# 인라인 함수

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

React에서 인라인 함수 사용을 피하는 것이 권장되는 이유가 몇 가지 있습니다. 이 중 일부는 다음과 같습니다:

- 성능: React에서 컴포넌트가 렌더링될 때마다 모든 인라인 함수가 재생성됩니다. 이는 특히 인라인 함수가 많은 컴포넌트가 있는 경우 응용 프로그램의 성능을 느리게 만들 수 있습니다.
- 유지 보수: 인라인 함수는 컴포넌트 내에서 정의되며 다른 부분에서 재사용할 수 없습니다. 응용 프로그램이 커짐에 따라 코드를 유지 보수하기가 더 어려워질 수 있습니다.
- 가독성: 인라인 함수는 코드를 읽고 이해하기 어렵게 만들 수 있으며, 특히 긴 경우나 많은 인수를 갖는 경우에 그러합니다.

아래 예시에서는 각 버튼마다 인라인 함수를 사용하는 예시를 볼 수 있습니다. 그러나 앞서 언급한 대로, 이는 성능 문제로 이어질 수 있습니다. 이 예시에서는 미미한 효과일 수 있지만, 더 큰 응용 프로그램에는 중요한 영향을 미칠 수 있습니다. 따라서 이러한 유형의 최적화는 더 큰 범위에서 수행하는 것이 좋습니다.

```js
// Example 17

import { useState } from "react";

export const InlineFunctions = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h1>{counter}</h1>
      <button
        onClick={() => {
          setCounter((prevCount) => prevCount + 1);
        }
      >
        Increase Counter
      </button>
      <button
        onClick={() => {
          setCounter((prevCount) => prevCount - 1);
        }
      >
        Decrease Counter
      </button>
    </div>
  );
};
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

이 경우 클릭 이벤트를 처리하는 더 나은 방법은 각 버튼의 onClick 이벤트에 콜백으로 사용할 클릭 이벤트 처리를 위한 별도의 함수를 정의하는 것입니다. 이렇게 하면 함수가 컴포넌트가 렌더링될 때마다 재생성되지 않아 성능이 향상됩니다. 아래는 별도의 함수를 사용한 업데이트된 예제입니다:

```js
// Example 18

import { useState } from "react";

export const InlineFunctions = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = (value) => () => {
    setCounter((prevCount) => prevCount + value);
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={handleClick(1)}>카운터 증가</button>
      <button onClick={handleClick(-1)}>카운터 감소</button>
    </div>
  );
};
```

요약하면, 인라인 함수는 작은 컴포넌트나 빠른 프로토타입 제작에 유용할 수 있지만, 자주 렌더링되는 대규모 응용 프로그램이나 컴포넌트에서는 사용을 피하는 것이 좋습니다. 인라인 함수를 재사용 가능하고 최적화할 수 있는 별도의 함수로 추출하여 성능, 유지 보수 및 코드 가독성을 향상시킬 수 있습니다. 제공된 예제에서는 버튼 클릭 이벤트를 처리하기 위한 별도 함수를 만들어 인라인 함수의 수를 줄이고 컴포넌트의 전반적인 성능을 향상시킬 수 있었습니다.

# 요약

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

요약하자면, 리액트 애플리케이션 최적화와 관련된 여러 주제를 다뤘습니다. 디바운싱, 스로틀링, 그리고 메모이제이션은 모두 불필요한 렌더링과 처리를 줄여 성능을 향상시키는 기술입니다. 순수 컴포넌트는 구성 요소가 필요할 때만 다시 렌더링되도록 보장하는 또 다른 중요한 최적화 방법입니다.

레이지 로딩과 가상화는 애플리케이션의 초기 로드 시간 및 전반적인 성능을 향상시키는 데 도움이 되는 방법입니다. 레이지 로딩을 통해 실제 필요한 컴포넌트나 자원만 로드할 수 있고, 가상화(또는 윈도잉)를 통해 대규모 데이터 집합의 가시적 부분만 렌더링하여 화면 외의 요소의 불필요한 처리와 렌더링을 피할 수 있습니다.

에러 바운더리는 애플리케이션에 충돌을 일으킬 수 있는 에러를 처리하는 방법을 제공합니다. 에러 바운더리를 사용하면 에러를 로깅하고 graceful하게 처리하여 완전한 애플리케이션 충돌 대신 대체 UI를 제공할 수 있습니다.

마지막으로, 성능, 유지보수 및 가독성에 미치는 영향 때문에 가능한 한 인라인 함수를 피하는 중요성에 대해 논의했습니다.

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

이러한 기술을 JavaScript 또는 React 어플리케이션에 적용함으로써 더 효율적이고 빠르며 확장 가능한 어플리케이션을 만들 수 있습니다. 이러한 주제에 대해 더 알고 싶다면 React 문서를 살펴보는 것을 권장하며, Globant가 미디엄에 게시한 다른 글들도 살펴보기를 권장합니다.
