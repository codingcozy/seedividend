---
title: "리액트 컴파일러, 리액트의 새로운 방식"
description: ""
coverImage: "/assets/img/2024-05-20-ReactCompileranewwaytoReact_0.png"
date: 2024-05-20 22:13
ogImage: 
  url: /assets/img/2024-05-20-ReactCompileranewwaytoReact_0.png
tag: Tech
originalTitle: "React Compiler a new way to React…"
link: "https://medium.com/@2710rajatsharma/react-compiler-a-new-way-to-react-e3be40bacc87"
isUpdated: true
---




최근 Meta사에서 React를 위한 새로운 컴파일러를 발표했어요. 이 소식은 생각보다 더 큰 뜻을 가지고 있어요. 이 블로그에서는 React의 새로운 컴파일러에 대한 기본적인 내용을 이해해보려 합니다.

![ReactCompileranewwaytoReact](/assets/img/2024-05-20-ReactCompileranewwaytoReact_0.png)

UI 컴파일러에 대해 간단히 살펴보자면:
Svelte, Angular, Solid과 같은 UI 프레임워크들은 이미 내장된 컴파일러를 가지고 있어요. 이러한 컴파일러들은 코드를 최적화된 JavaScript로 변환하여 성능을 향상시키고 런타임 오버헤드를 줄여줘요. 따라서 React에 컴파일러를 도입하는 것은 오랜 기간이 지나야 한다고 생각되었던 일이에요. 이러한 조치는 React를 이러한 현대적인 프레임워크들과 동일선상으로 끌어올리는 데 도움이 되며, 코드베이스가 커짐에 따라 발생하는 성능 문제를 해결하는 데 도움이 될 거예요.

컴파일러가 왜 필요한가요?
여러 이유가 있어요. 대부분의 React 개발자들은 이미 알고 있지만, React 렌더링은 코드베이스의 크기가 커지면 성능이 저하될 수 있는 공격적인 특성을 가지고 있어요. React는 메모이제이션 기술을 제공하지만, 효과적으로 학습하고 구현하기 어려울 수 있어요.

<div class="content-ad"></div>

React 컴파일러 작동 방식에 대해 알아보겠습니다.
컴파일러가 일관된 최적화를 달성하는 데 사용하는 여러 기술이 있습니다. 이 중 몇 가지를 아래에서 언급해보겠습니다:

자동 의존성 분석: React 컴파일러는 자동 의존성 검출 및 최적화를 도입하여 성능을 향상시킵니다. 변경된 컴포넌트만 재렌더링함으로써 불필요한 렌더링을 최소화하고 애플리케이션 실행 속도를 높입니다. 컴포넌트 의존성을 분석하고 캐싱 메커니즘을 활용하여 React는 불필요한 렌더링을 최소화하고 응용 프로그램을 가속화합니다. 이는 수동 의존성 명시의 필요성을 줄이고 보일러플레이트 코드를 낮춥니다. 컴파일러는 코드베이스 전체에서 일관된 최적화를 보장하며 업데이트를 일괄처리하고 중복 렌더링을 건너뛰는 최적화된 렌더링 전략을 구현합니다.

코드 변환: React 컴파일러는 빌드 시간에 코드를 변환합니다. 클 때 필요한 곳에 메모이제이션 논리를 삽입하여 비용이 많이 드는 계산이나 큰 객체가 변경된 경우에만 다시 계산되거나 재생성되도록 보장합니다. 이 변환은 개발자가 컴포넌트를 최적화하는 데 필요한 수동 노력을 줄입니다.

향상된 Hooks: React 컴파일러는 useMemo와 useCallback과 같은 기존 훅을 개선할 수 있습니다. 적절한 곳에 자동으로 이러한 훅을 삽입하여 컴파일러는 개발자가 수동으로 의존성을 지정하지 않고도 메모이제이션의 이점을 얻을 수 있도록 보장합니다.

<div class="content-ad"></div>

과거 트랜스파일된 코드와 새로운 컴파일된 코드 비교
코드로 들어가서 컴파일러의 유무에 따라 동일한 코드가 어떻게 다른지 살펴보겠습니다:

간단한 코드 스니펫을 살펴보죠. Hello World 텍스트가 있는 간단한 `div`입니다.

```js
export default function Hello() {
  return <div className="foo">Hi There</div>;
}
```

현재 컴파일 없이 트랜스파일된 코드는 이렇게 됩니다.

<div class="content-ad"></div>


```js
// transpiled code (without compiler)
export default function Hello() {
  return __jsx("div", {
    className: "foo"
  }, "Hi There");
}
```

```js
// compiled code (with React compiler)
import { c as _c } from "react/compiler-runtime";
export default function Hello() {
  const $ = _c(2);
  if ($[0] !== "8b8c470796627445ffbcfa7127db0cfba267736e0e4708dfa79d32043c5e5a7c") {
    for (let $i = 0; $i < 2; $i += 1) {
      $[$i] = Symbol.for("react.memo_cache_sentinel");
    }
    $[0] = "8b8c470796627445ffbcfa7127db0cfba267736e0e4708dfa79d32043c5e5a7c";
  }
  let t0;
  // cached component
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = __jsx("div", {
      className: "foo"
    }, "Hi There");
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
}
```

Now there is a lot of compiled code; let's look at the code block by block.
The first block is responsible for loading the memo cache, which caches the components.
The second `if` statement is where the compiler saves our `div` in a cache. If there is a re-render and nothing in the component has changed, we get the cached component. This is how static content is handled by the compiler.

Let’s look at a more advanced code snippet to see how the compiler manages states in the code.


<div class="content-ad"></div>

```js
import { useState } from "react";

export default function Hello() {
  const [name, setName] = useState("Jack");
  return (
    <div>
      <p>Hi: {name}</p>
      <strong>Static Content</strong>
    </div>
  );
}
```

여기에는 코드에 정의된 상태 "name"이 있지만 컴포넌트 내에서 상태가 전혀 변경되지 않습니다. 이것이 React 컴파일러의 강점을 볼 때입니다. 변환된 코드와 컴파일된 코드를 비교해 봅시다.

```js
// 변환된 코드 (컴파일러 미사용)
import { useState } from "react";
export default function Hello() {
  const [name, setName] = useState("Jack");
  return __jsx("div", null, __jsx("p", null, "Hi: ", name), __jsx("strong", null, "Static Content"));
}
```

지금 변환된 코드를 가져왔습니다. 상태는 최적화 없이 변환됩니다. 이제 컴파일된 코드를 살펴봅시다.


<div class="content-ad"></div>

```js
import { c as _c } from "react/compiler-runtime";
import { useState } from "react";
export default function Hello() {
  const $ = _c(6);
  if ($[0] !== "ff7f138520311a2041bfadf8c5306ca9ddda64020c5c7c91ce7bfd217639da89") {
    for (let $i = 0; $i < 6; $i += 1) {
      $[$i] = Symbol.for("react.memo_cache_sentinel");
    }
    $[0] = "ff7f138520311a2041bfadf8c5306ca9ddda64020c5c7c91ce7bfd217639da89";
  }
  const [name] = useState("Jack");
  let t0;
// name is cached
  if ($[1] !== name) {
    t0 = __jsx("p", null, "Hi: ", name);
    $[1] = name;
    $[2] = t0;
  } else {
    t0 = $[2];
  }
  let t1;

  if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = __jsx("strong", null, "Static Content");
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  let t2;
  if ($[4] !== t0) {
    t2 = __jsx("div", null, t0, t1);
    $[4] = t0;
    $[5] = t2;
  } else {
    t2 = $[5];
  }
  return t2;
}
```

여기에서 컴파일러에 의해 상태가 자동으로 캐시됩니다. 따라서 다음 렌더링에서는 값이 캐시에서 반환됩니다. 이름의 값을 변경할 때만 if 블록으로 이동하여 향후 렌더링을 위해 캐시에 저장합니다.

결론:
React에 컴파일러를 추가하면 프로그래머들이 더 쉽게 최적화된 코드를 작성할 수 있습니다. 이 블로그에서는 React의 컴파일러가 출시되면 기대할 수 있는 기능을 분석하고 이해하기 위한 기본 사용 사례를 탐색했습니다.
React 컴파일러의 고급 개념 및 사용 사례에 대해 계속 알아보십시오. 정적 분석, 최적화된 렌더링 및 useMemo와 같은 고급 훅의 사용과 같은 추가 기능을 탐색할 예정입니다.