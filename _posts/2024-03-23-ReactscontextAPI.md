---
title: "React의 Context API란 무엇인가 (2024년 최신)"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Reacts context API"
link: "https://tomarshrayanshi2003.medium.com/reacts-context-api-764249259f8c"
isUpdated: true
---

# 컨텍스트 API란 무엇인가요?

컨텍스트 API는 React 16.3에서 소개된 기능으로, React 코어 라이브러리의 일부입니다. 이를 통해 컴포넌트 트리의 각 수준을 명시적으로 통과시키지 않아도 컴포넌트 간에 props와 같은 값을 공유할 수 있습니다. 이는 다양한 중첩 수준의 많은 컴포넌트에서 접근해야 하는 데이터에 특히 유용합니다.
Context API 이전에는 데이터를 컴포넌트 트리 아래로 전달하는 주요 방법이 props를 통해 전달하는 것이었습니다. 이를 "prop drilling"이라고 합니다. 부모에서 자식 컴포넌트로 데이터를 전달하는 데 이 기능은 잘 작동하지만 중첩 수준이 여러 개인 경우, 특히 중간 컴포넌트가 데이터를 필요로하지 않을 때 데이터를 전달하는 것이 까다로울 수 있습니다.

컨텍스트 API는 데이터에 대한 "컨텍스트"를 생성하여 이를 컨텍스트의 제공자 내의 모든 컴포넌트가 액세스할 수 있게 함으로써 이 프로세스를 단순화합니다. 이를 통해 중간 컴포넌트를 통해 props를 전달할 필요성이 없어지며, 단순한 코드를 줄이고 코드베이스를 더 유지보수하기 쉽게 만듭니다.

# 작동 방식은?

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

Context API의 핵심은 세 가지 주요 구성 요소로 이루어져 있어요:

- Context Object: React의 createContext 함수를 사용하여 생성됩니다. 이것은 여러 컴포넌트간에 공유하려는 데이터를 담는 컨테이너 역할을 해요.
- Provider Component: 이 컴포넌트는 자식 컴포넌트에 데이터를 제공하는 역할을 합니다. Context.Provider 컴포넌트를 사용하여 생성되며 데이터를 담고 싶은 value prop을 받아들여요.
- useContext: 이 훅은 함수형 컴포넌트 내에서 useContext 함수를 사용하여 컨텍스트 데이터에 액세스하는 데 사용됩니다. 이는 컨텍스트 객체를 인수로 받아 현재 컨텍스트 값을 반환해요.

# 예시 사용법

여기 ‘테마’ 기능을 추가하는 데모가 있는데요, 실제로 Context API가 어떻게 작동하는지 설명해줍니다:

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
// 컨텍스트를 생성하고 있어요
export const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
});
```

ThemeProvider 컴포넌트는 테마 상태를 기본 값 'light'로 초기화하고 'light'와 'dark' 테마 간에 전환하는 toggleTheme 함수를 제공합니다. ThemeProvider로 둘러싸인 자식 컴포넌트는 ThemeContext를 통해 현재 테마와 전환 기능에 액세스할 수 있습니다.

```js
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === "light" ? "dark" : "light";
    });
  };

  return <ThemeContext.Provider value={(theme, toggleTheme)}>{children}</ThemeContext.Provider>;
}
```

여기서는 Provider를 사용하여 페이지 컴포넌트를 ThemeProvider로 랩핑하여 해당 하위 항목에 사용 가능하도록 합니다.

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
// 제공자 사용하기
function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}
```

여기서 페이지 컴포넌트는 React의 useContext 훅을 사용하여 테마 콘텍스트를 소비하며, 현재 테마에 액세스하고 테마를 토글하는 함수에 액세스할 수 있습니다. 이 함수는 버튼의 onClick 이벤트 핸들러에 의해 트리거 될 것입니다.

```js
// useContext 훅을 사용하여 테마 콘텍스트에 액세스하기
export default function Page() {
  const themeCtx = React.useContext(ThemeContext);

  return (
    <header>
      <h1>데모</h1>
      <button onClick={themeCtx.toggleTheme}>테마 전환</button>
    </header>
  );
}
```

# Context API를 언제 사용해야 하나요?

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

Context API는 컴포넌트 간에 데이터를 공유하는 편리한 방법을 제공하지만, 신중하게 사용하는 것이 중요합니다. 여기 Context API를 사용하는 것이 적절한 몇 가지 시나리오가 있습니다:

- 테마 전환: 애플리케이션의 다른 컴포넌트 간에 현재 테마를 공유합니다.
- 사용자 인증: 사용자 인증 상태 및 정보를 애플리케이션 전반에 걸쳐 전달합니다.
- 로컬라이제이션: 언어 환경과 같은 지역 정보를 공유합니다.
- UI 상태: 모달, 알림, 토스트 또는 알림과 같은 UI 상태를 공유합니다.

# Context API 사용에 대한 최상의 실천법

## 1. 전역 상태 식별하기:

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

Context API를 구현하기 전에 애플리케이션의 상태 요구 사항을 신중하게 평가하고 어떤 데이터가 전역적으로 관리되어야 하는지 식별해주세요.

### 2. Context Consumer 중첩 제한:

Context API는 데이터 공유를 위한 강력한 메커니즘을 제공하지만, Context Consumer의 과도한 중첩은 불필요한 결합과 컴포넌트 재사용성 감소로 이어질 수 있습니다.

### 3. Context 값은 간단하게 유지하기

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

표 태그를 Markdown 형식으로 변경해주세요.

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

별도의 파일을 사용하여 컨텍스트 객체를 정의하는 것은 조직화되고 유지보수가 쉬워지기 때문에 좋은 실천 방법입니다.

# 결론

React의 컨텍스트 API는 애플리케이션에서 전역 상태를 관리하는 강력한 메커니즘을 제공합니다. 컴포넌트 간에 데이터를 공유하는 간단하고 직관적인 방법을 제공함으로써 여러 단계의 중첩을 통해 프롭스를 전달하는 복잡성을 줄입니다. 모든 사용 사례에 적합하지는 않을 수 있지만, 컨텍스트 API를 사용하는 방법과 시기를 이해하면 React 애플리케이션의 유지 관리 및 확장성을 크게 향상시킬 수 있습니다.
