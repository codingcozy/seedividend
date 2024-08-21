---
title: "React 디자인 패턴 Provider 패턴"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "React Design Patterns Provider Pattern"
link: "https://medium.com/@vitorbritto/react-design-patterns-provider-pattern-b273ba665158"
isUpdated: true
---

## 컴포넌트 트리를 통해 데이터를 관리하고 전달하는 구조화된 방법

![이미지](/assets/img/ReactDesignPatternsProviderPattern_0.png)

React의 Provider Pattern은 React의 context API를 활용하여 컴포넌트 트리를 통해 데이터를 관리하고 전달하는 구조화된 방법을 만드는 디자인 패턴입니다. 이는 데이터를 필요로 하지 않는 컴포넌트도 포함하여 데이터를 여러 계층을 통해 전달해야 하는 prop drilling을 피하는 데 도움이 됩니다.

# Provider Pattern의 구조

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

공급자 패턴의 구조는 일반적으로 세 부분으로 구성됩니다.

## 컨텍스트

구조에서 사용되는 컨텍스트 변수를 정의하는 파일입니다. React의 createContext 함수를 사용하여 생성됩니다.

```js
import { createContext } from "react";
const UserContext = createContext({ state: {}, actions: {} });
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

## 제공자

주어진 어떤 자식 요소를 동적 컨텍스트로 랩핑하는 주요 컨텍스트 제공자입니다. 이 컴포넌트는 컨텍스트를 사용하고 해당 값을 컴포넌트 트리 아래의 모든 컴포넌트에 제공합니다.

```js
import { useState } from "react";
const UserProvider = ({ children }) => {
  const [name, setName] = useState("World");
  const value = {
    state: { name },
    actions: { setName },
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
```

## 훅

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

현재 컨텍스트 값을 컴포넌트에 제공하는 맞춤형 후크입니다. 이 데이터가 필요한 모든 컴포넌트에서 컨텍스트를 사용하는 데 사용됩니다.

```js
import { useContext } from "react";
import UserContext from "./context";

const useUser = () => {
  return useContext(UserContext);
};
```

# 실습

보다시피 Provider 패턴은 리액트의 useContext 후크와 함께 사용할 수 있습니다. useContext 후크는 내장 후크로, 컴포넌트를 Context.Consumer 컴포넌트로 래핑하지 않고도 컨텍스트를 사용할 수 있게 해줍니다. 이를 통해 코드를 더 깨끗하고 이해하기 쉽게 만들어 줍니다.

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

프로바이더 패턴을 useContext 훅과 함께 사용하는 예제입니다:

```js
import { useState, useContext, createContext } from "react";

// 단계 1: 컨텍스트 생성
const ThemeContext = createContext("light", () => "light");

// 단계 2: 프로바이더 컴포넌트 생성
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  return <ThemeContext.Provider value={(theme, setTheme)}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };

// 단계 3: 컨슈머 컴포넌트 생성
const UserSettings = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  // ...
};

// 단계 4: 프로바이더로 컴포넌트 감싸기
const App = () => {
  return (
    <ThemeProvider>
      <UserSettings />
      {/* 컨텍스트를 사용해야 하는 다른 컴포넌트 */}
    </ThemeProvider>
  );
};

export default App;
```

이 방법으로, useContext 훅을 사용하여 프로바이더 패턴을 더 직관적이고 명확하게 사용할 수 있습니다.

# 결론

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

제공자 패턴의 주요 장점 중 하나는 코드를 리팩토링할 때 버그를 도입할 위험을 줄인다는 것입니다. 제공자 패턴을 사용하면 prop의 이름을 바꿔야 할 경우, context 제공자에서만 변경하면 됩니다. 제공자 패턴을 사용하지 않으면 응용 프로그램 전체에서 해당 prop의 모든 인스턴스를 찾아 변경해야 하므로 시간이 많이 소요되고 오류가 발생할 수 있습니다.

제공자 패턴은 응용 프로그램의 전역 상태를 관리하기 쉽게 만듭니다. 전역 상태를 보유하는 컨텍스트 제공자를 생성하고, 그 상태에 액세스해야 하는 모든 구성 요소는 컨텍스트를 통해 그 상태에 액세스할 수 있습니다. 이렇게 하면 응용 프로그램의 상태를 추적하고 관리하기 쉬워집니다.

그러나 제공자 패턴을 신중하게 사용하는 것이 중요합니다. 여러 구성 요소 간에 데이터를 공유하는 데는 좋지만, 지나치게 사용하면 성능 문제가 발생할 수 있습니다. 컨텍스트를 사용하는 모든 구성 요소는 컨텍스트 값이 변경될 때 다시 렌더링됩니다. 따라서 성능을 향상시키기 위해 논리에 따라 데이터를 다른 제공자로 분할하는 것이 좋습니다.

독해해 주셔서 감사합니다. 의견이나 제안 사항이 있으면 아래에 댓글을 남겨주세요.

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

당신은 트위터, 깃허브, 링크드인에서 저를 팔로우할 수 있어요.

안녕히 가세요! 👋
