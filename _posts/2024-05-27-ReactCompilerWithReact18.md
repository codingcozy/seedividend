---
title: "리액트 컴파일러와 리액트 18에 대해서 알아보기"
description: ""
coverImage: "/assets/img/2024-05-27-ReactCompilerWithReact18_0.png"
date: 2024-05-27 18:43
ogImage:
  url: /assets/img/2024-05-27-ReactCompilerWithReact18_0.png
tag: Tech
originalTitle: "React Compiler With React 18"
link: "https://medium.com/@jherr2020/react-compiler-with-react-18-1e39f60ae71a"
isUpdated: true
---

우선, 아니요. React 컴파일러는 React 19의 일부가 아닙니다. React 19는 단순히 React 라이브러리일 뿐입니다. 빌드 변경사항은 없습니다. 따라서 React 컴파일러를 통합하려면 스스로 작업해야 합니다. 또한 React 컴파일러가 선택 사항이라는 것을 의미합니다. 이것이 좋은 점입니다.

React 19에 대한 포인트를 더 증명하기 위해 React 18 프로젝트에서 React 컴파일러를 사용하는 방법을 보여드릴게요.

![ReactCompilerWithReact18_0](/assets/img/2024-05-27-ReactCompilerWithReact18_0.png)

# 프로젝트 설정

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

이 예시에서는 다른 프레임워크와 달리 리액트 19가 아닌 리액트 18.2.0으로 설정되어 있어서 Vite를 사용할 것입니다.

```js
pnpm create vite r18-with-compiler --template react
```

또한 TypeScript를 사용하지 않기로 했어요. 어떤 타이핑 문제를 피하기 위해서 우리가 생성한 c 훅을 반환하는 배열로 타이핑할 수 있어요.

# 예제 만들기

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

컴파일러가 작동하는 방식을 보여주기 위해 최적화되지 않은 버전을 먼저 보여준 다음, 컴파일러를 설치하고 최적화된 버전을 확인해보겠습니다.

다음과 같이 App 컴포넌트를 이 구현으로 대체할 것입니다:

```js
import { useState } from "react";

function Header() {
  console.log("Header", Math.random());
  return (
    <header>
      <h1>React Counter</h1>
    </header>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </>
  );
}
```

여기에는 간단한 헤더를 표시하는 새로운 Header 컴포넌트와 Header를 사용하고 자체적인 카운터 구현을 갖는 App 컴포넌트가 있습니다.

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

최적화되지 않은 React 컴포넌트에서 Header는 매번 App이 버튼을 클릭하여 카운터를 업데이트할 때 다시 렌더링됩니다.

이를 직접 확인하기 위해 응용 프로그램을 시작하고 버튼을 클릭하세요. 클릭할 때마다 Header 컴포넌트에서 console.log를 볼 수 있어야 합니다.

# React 컴파일러를 사용한 최적화

React 컴파일러는 우리의 App 컴포넌트(사실 Header도)를 최적화하는 방식으로 작동합니다. App에서 Header를 렌더링할 때 Header가 의존하는지 확인합니다. 좋은 소식은, Header가 어느 것에도 의존하지 않습니다. 그래서 Header를 렌더링한 것이 처음이면 마지막이 되어야 합니다. 컴파일러를 사용하는 것이 최적화된 결과입니다.

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

잘 작업했다면 버튼을 클릭할 때 Header의 console.log에서 메시지가 표시되지 않을 것을 기대할 수 있습니다. 이는 Header 함수가 호출되지 않기 때문입니다.

먼저 React 컴파일러를 설치해야 합니다:

```js
pnpm add babel-plugin-react-compiler
```

그런 다음 Vite 구성에서 babel 플러그인을 구성해야 합니다. 제 경우에는 다음과 같이 보입니다:

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
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const ReactCompilerConfig = {
  runtimeModule: "@/mycache",
};

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
  ],
});
```

여기에는 두 가지 작업이 진행 중입니다. 무엇보다 defineConfig의 plugins 섹션을 사용하여 React Compiler babel 플러그인을 설치하고 구성하고 있습니다. 그리고 ReactCompilerConfig 객체로 컴파일러를 구성하고 있습니다.

컴파일러 구성에서는 컴파일러가 보통 react-compiler-runtime에서 가져오는 캐시 메모이제이션 훅을 @/mycache에서 가져오도록 지정하고 있습니다.

또한 @ 별칭을 설정하고 소스로 가리키도록해야 합니다. 이렇게 하면 컴포넌트가 위치한 곳과 관계없이 항상 우리의 훅을 찾을 수 있습니다.

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

# 무엇을 다시 하고 있나요?

간단히 다시 돌아가서 무슨 일이 일어나고 있는지 이야기해 봅시다. 여기서 일어나고 있는 것은 React 컴파일러가 memoization을 사용하여 컴포넌트를 최적화한다는 것입니다. 그러나 이를 위해 전통적인 React.memo나 useMemo 또는 useCallback을 사용하는 것이 아닙니다. 대신 새로운 훅을 사용합니다. 해당 훅은 이전에는 useMemoCache로 불리다가 지금은 c로 불립니다. 그리고 react-compiler-runtime 라이브러리에 해당 훅이 내장되어 있습니다.

저는 react-compiler-runtime 라이브러리가 React 19에 의존한다고 확신합니다. 따라서 React 18과 함께 사용하려면 해당 라이브러리에서 c 함수의 직접적인 구현이 필요합니다. 실제로 그 함수는 매우 간단해서 문제가 되지 않습니다. 사실 너무 쉬워서 여기에 구현해 두었습니다:

```js
import { useState } from "react";

export function c(size) {
  return useState(() => new Array(size))[0];
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

잠깐만요. 말 그대로 하는 게 없어요. 먼저 사전 할당된 배열의 필요한 크기를 매개변수로 사용하고, 그 크기의 배열이 있는 컴포넌트와 관련된 몇 가지 상태를 반환합니다. 그래서 useState를 사용하여 해당 배열을 만들고 배열만 반환합니다.

실제로 이게 어떻게 작동하는지에 대해 조금 후에 알아보겠습니다. 지금은 src/mycache.js 파일(또는 원하는 곳)에 해당 C 구현을 저장해야 합니다. 그런 다음 어플리케이션을 실행하면, 바로! 버튼을 누르면 Header가 다시 렌더링되지 않습니다. 성공!

# 약간 다른 구현

다른 옵션은 사실상 패키지 관리자를 속여 ./src/mycache가 실제로 react-compiler-runtime 라이브러리라고 생각하게 하는 것입니다. 그래서 package.json 의 종속성에 이 부분을 추가할 수 있습니다:

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
"dependencies": { ..., "react-compiler-runtime": "file:./src/mycache" }
```

그러고 나면 Vite 구성에서 ReactCompilerConfig 블록에서 runtimeModule 키를 제거할 수 있습니다.

이것은 공식 폴리필이며 가장 최신 버전은 이 기스트에 있습니다.

# 그래서 왜 이 C 구현이 작동합니까?

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

이제 모든 것이 원활히 진행되었으니 이 C 구현을 한 번 더 살펴보고 왜 동작하는지 알아보려고 해봅시다.

```js
import { useState } from "react";

export function c(size) {
  return useState(() => new Array(size))[0];
}
```

여기서 상태를 생성하고 그 상태를 반환하고 있습니다. 상태 설정 함수를 반환하지 않고 상태만 반환하고 있으니, 뭔가 이상하죠?

이 컴포넌트를 컴파일해보죠:

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
export default function Hello() {
  return <div className="foo">안녕하세요</div>;
}
```

위의 코드가 아래와 같이 변합니다:

```js
import { c as _c } from "/src/mycache.js";
export default function Hello() {
  const $ = _c(2);
  if ($[0] !== "a49bfc30998b8cb2...") {
    for (let $i = 0; $i < 2; $i += 1) {
      $[$i] = Symbol.for("react.memo_cache_sentinel");
    }
    $[0] = "a49bfc30998b8cb2...";
  }
  let t0;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = jsxDEV(
      "div",
      {
        className: "foo",
        children: "안녕하세요",
      },
      void 0,
      false,
      {},
      this
    );
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
}
```

컴파일된 코드의 상단에서 c 훅을 불러오고 최적화된 컴포넌트에서 사용한다는 것을 확인할 수 있습니다. 컴파일러는 초기화된 플래그를 저장하는 데 첫 번째 슬롯, 두 번째 슬롯에는 DOM 트리가 포함된 JSX의 메모이즈된 버전을 저장할 때 두 개의 슬롯만 필요하다는 사실을 알고 있습니다.

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

지금 c 훅이 어떻게 사용되는지 알았으니, 왜 우리의 구현이 작동하는지에 대해 조금 더 이해할 수 있게 되었습니다.

첫째, 우리는 메모이징을 하고 있고, 메모이징을 통해 컴포넌트를 다시 렌더링하게 만들 필요가 없습니다. 그래서 우리는 상태 설정 함수를 호출하지 않는 것입니다. 왜냐하면 그렇게 하면 다시 렌더링이 강제되기 때문입니다.

둘째, 우리는 useState로부터 배열에 대한 참조를 받기 때문에 (그리고 즉, 우리는 배열 내의 데이터를 단순히 배열 요소를 설정함으로써 변경할 수 있습니다) 데이터를 변경할 수 있고, 그 변경 사항은 유지될 것입니다. 왜냐하면 useState는 배열의 내용이 아니라 배열에 대한 참조를 유지하기 때문입니다.

그 두 번째 부분이 여러분을 헷갈리게 한다면, JavaScript 메모리 관리와 참조가 배열 및 객체와 관련하여 작동하는 방식에 대한 이 비디오를 추천합니다.

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

# 공식 Polyfill

만약 이를 실제로 적용하고 싶다면 c 함수의 원본 소스를 확인해보세요. 그리고 작업 그룹 기사도 살펴보세요. 이 지침 외에도 공식 Polyfill을 따를 수 있습니다.

# 더 깊게 들어가보기

만약 React 컴파일러와 메모이제이션 작업 방식에 대해 더 자세히 알고 싶다면 제 React 컴파일러 영상을 꼭 시청해보세요.

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

이 비디오는 메모이제이션의 메커니즘을 심도 있게 다루어서 React 컴포넌트 코드가 어떻게 변환되고 메모이징되며, 그 메모이제이션의 정밀도를 정말로 이해할 수 있도록 도와줍니다.

## 가능하지만 권장되지 않는 방법

무언가를 할 수 있다고 해서 반드시 해야 한다는 것은 아닙니다. 이 경우에도 그렇게 적용됩니다. React 컴파일러는 실제로 React 19 생태계 내에서 작동하도록 설계되었습니다. 그러므로 오늘 18 버전에서 사용할 수 있다고 해도, 내일 그것이 작동한다는 보장은 없습니다. 간단히 말해서, 사용 시 주의가 필요합니다. 레드 옥토버를 찾아서에서 말하는 대로 "가능하지만 권장되지 않습니다."

## 더욱 심화된 주제

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

만약 당신이 이러한 고급 React 주제에 관심이 있다면, 특히 NextJS에 대해, 제 ProNextJS 뉴스레터에 가입해보세요. 그것을 통해 NextJS 상태 관리와 폼 관리에 대한 두 가지 무료 자습서에 액세스 할 수 있습니다. 그리고 ProNextJS 전체 코스가 출시될 때 알림을 받을 수도 있어요! 곧 공개될 예정이에요!
