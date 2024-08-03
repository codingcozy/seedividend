---
title: "2024년에 React로 가능한 다양한 기능들"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Exciting React Features in 2023 A Look into the Future of Web Development"
link: "https://medium.com/better-programming/exciting-react-features-in-2023-a-look-into-the-future-of-web-development-440107a3129d"
---



![ExcitingReactFeaturesin2023ALookintotheFutureofWebDevelopment_0](/assets/img/ExcitingReactFeaturesin2023ALookintotheFutureofWebDevelopment_0.png)

웹 개발의 빠르게 변화하는 세계에서 React는 가장 인기 있는 JavaScript 라이브러리 중 하나로 등장했습니다. 시작 이후로 React는 개발자가 강력하고 상호작용적인 웹 애플리케이션을 만들 수 있는 방식을 혁신했습니다.

2023년을 맞아 React는 지속적으로 발전하며 생산성을 향상시키고 개발 프로세스를 단순화하는 새로운 기능과 개선 사항을 도입했습니다. 2023년에 React에 도입된 흥미로운 기능들과 사용 방법을 보여주는 코드 예제를 소개하겠습니다.

# 동시 모드(Concurrent Mode)

<div class="content-ad"></div>

2023년 발매 예정인 React의 Concurrent Mode는 복잡하고 연산이 많은 애플리케이션에서 특히 성능 향상을 약속합니다. 이 모드는 React가 여러 작업을 동시에 처리할 수 있게 하여 작업을 작은 단위로 나누거나 "fibers"로 분할합니다. 이 기능 세트는 비용이 많이 드는 계산, 네트워크 요청 또는 대규모 컴포넌트 트리 렌더링을 수행할 때에도 응답성을 유지할 수 있도록 합니다.

여러 예제를 통해 이 새로운 모드를 직접 보겠습니다:

- 새로운 useTransition 훅을 사용하여 느린 렌더링 프로세스 중에 로딩 상태를 보여주는 예제.

```js
import { useTransition } from "react";

const ReactComponent = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      // 느린 작업을 수행합니다 (계산 또는 렌더링 또는 데이터 가져오기 등)
    });
  };

  return (
    <div>
      {isPending ? "로딩 중..." : null}
      <button onClick={handleClick}>프로세스 시작</button>
    </div>
  );
};
```

<div class="content-ad"></div>

2. 다음 예제에서는 응용 프로그램의 초기 로드 시간을 개선하는 데 사용되는 React.lazy 함수를 사용할 것입니다.

```js
import React, { Suspense } from "react";

// 레이지로 렌더링될 컴포넌트 정의
const LazyComponent = React.lazy(() => import("./LazyComponent"));

// 레이지로 로드되는 동안 표시될 대체 컴포넌트 정의
const LoadingFallback = () => <div>Loading...</div>;

const App = () => {
  return (
    <div>
      <h1>React Concurrent Mode 예제</h1>
      <Suspense fallback={<LoadingFallback />}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};

export default App;
```

이 예제에서는 또한 React Concurrent Mode의 Suspense 컴포넌트를 사용하여 레이지 컴포넌트의 로딩을 처리합니다. LazyComponent는 React.lazy() 함수를 사용하여 가져오며, 필요할 때 컴포넌트를 레이지 로드할 수 있도록 합니다.

Suspense 컴포넌트는 레이지 컴포넌트가 로드되는 동안 렌더링될 컴포넌트를 나타내는 fallback 속성을 사용합니다. 이 경우 LoadingFallback 컴포넌트를 정의하여 간단한 로딩 메시지를 표시합니다.

<div class="content-ad"></div>

**번들러나 번들 캐쉬 수정 및 사용자 지정 파일 확장자 지정 외에도 Vue CLI 3는 다양한 기능을 제공합니다. 다음은 몇 가지 추가 기능입니다:**

1. **플러그인 기반 아키텍처:** Vue CLI 3는 플러그인 시스템을 통해 사용자 정의 기능을 손쉽게 추가할 수 있습니다. 이러한 플러그인은 프로젝트 설정, 구성 및 빌드 과정 등을 수정할 수 있습니다. 이를 통해 프로젝트에 필요한 기능을 유연하게 확장할 수 있습니다.

2. **UI로 프로젝트 구성:** Vue CLI UI는 GUI 방식으로 프로젝트를 관리할 수 있는 기능을 제공합니다. 이를 통해 사용자는 터미널 명령어를 사용하지 않고도 프로젝트를 관리하고 모니터링할 수 있습니다. 이는 시각적인 환경에서 개발을 원하는 개발자에게 유용할 수 있습니다.

<div class="content-ad"></div>

먼저, Concurrent Mode가 활성화된 React 애플리케이션 설정을 사용하도록 하겠습니다. Concurrent Mode를 사용하려면 React 버전 18 이상이 필요합니다. 아래는 애플리케이션의 기본 구조입니다:

```js
// App.js
import React from "react";
import ChatContainer from "./ChatContainer";

const App = () => {
  return (
    <div className="App">
      <ChatContainer />
    </div>
  );
};

export default App;
```

```js
// ChatContainer.js
import React, { useState, useEffect, Suspense } from "react";
import { createChatGPTSession, generateChatGPTResponse } from "./api"; // ChatGPT와 상호작용하기 위한 API 모듈이 있다고 가정합니다

const ChatConversation = React.lazy(() => import("./ChatConversation"));
const ChatInput = React.lazy(() => import("./ChatInput"));

const ChatContainer = () => {
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    // ChatGPT 세션 초기화
    const session = createChatGPTSession();
    // 미래 사용을 위해 세션 저장 또는 정리

    return () => {
      // 세션 정리
      // ChatGPT 세션과 관련된 자원 닫기 또는 해제
    };
  }, []);

  const handleUserMessage = async (message) => {
    // 사용자 메시지를 대화에 추가
    setConversation((prevConversation) => [
      ...prevConversation,
      { author: "user", message },
    ]);

    // ChatGPT에서 응답 생성
    const response = await generateChatGPTResponse(session, message);
    // generateChatGPTResponse 함수는 ChatGPT의 응답을 얻기 위해 API에 요청을 보내는 것으로 가정

    // ChatGPT의 응답을 대화에 추가
    setConversation((prevConversation) => [
      ...prevConversation,
      { author: "chatbot", message: response },
    ]);
  };

  return (
    <div className="ChatContainer">
      <h1>Chat with ChatGPT</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ChatConversation conversation={conversation} />
        <ChatInput onMessage={handleUserMessage} />
      </Suspense>
    </div>
  );
};

export default ChatContainer;
```

```js
// ChatConversation.js
import React from "react";

const ChatConversation = ({ conversation }) => {
  return (
    <div className="ChatConversation">
      {conversation.map((message, index) => (
        <div key={index} className={`message ${message.author}`}>
          {message.message}
        </div>
      ))}
    </div>
  );
};

export default ChatConversation;
```

<div class="content-ad"></div>

```js
// ChatInput.js
import React, { useState } from "react";

const ChatInput = ({ onMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="ChatInput">
      <input
        type="text"
        placeholder="메시지를 입력해주세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">보내기</button>
    </form>
  );
};
```

이 예제에서 ChatContainer 컴포넌트는 useState 훅을 사용하여 대화 상태를 관리합니다. useEffect 훅은 컴포넌트가 마운트될 때 ChatGPT 세션을 초기화하는 데 사용됩니다. 사용자가 메시지를 보낼 때 handleUserMessage 함수가 호출되고 대화 상태를 사용자의 메시지로 업데이트하며 ChatGPT에서 응답을 생성하기 위해 generateChatGPTResponse 함수가 호출됩니다(백엔드 설정에 따라 구현해야 함).

그리고 ChatConversation 컴포넌트에서 대화가 렌더링되며 사용자 입력은 ChatInput 컴포넌트를 통해 캡처됩니다. React.lazy 함수를 사용하여 이러한 컴포넌트를 지연 로딩하여 Concurrent Mode의 성능을 향상시킬 수 있습니다.

이것은 단순화된 예제이므로 귀하의 구체적인 요구사항 및 ChatGPT API의 통합 세부 정보에 따라 코드를 수정해야 할 수도 있습니다.

<div class="content-ad"></div>

# 리액트 서버 컴포넌트

리액트 서버 컴포넌트는 리액트의 컴포넌트 모델을 서버 측 렌더링에도 적용할 수 있는 실험적인 기능입니다. 서버 컴포넌트를 사용하면 서버 및 클라이언트 리소스를 활용한 상호 작용 UI를 구축할 수 있어서 보다 빠르고 효율적인 렌더링이 가능합니다. 서버 컴포넌트는 서버와 클라이언트 간의 코드 공유를 통해 유연성을 제공하며, 상호작용 시간을 줄이고 SEO를 개선할 수 있습니다.

- 기본 예제

```js
import { serverComponent, useState } from "react-server-component";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>클릭한 횟수: {count}</button>
  );
};

export default serverComponent(Counter);
```

<div class="content-ad"></div>

위 예제에서는 클릭할 때 count 상태가 증가하는 간단한 Counter 컴포넌트를 정의합니다. react-server-component에서 serverComponent를 사용하여이 컴포넌트를 서버 및 클라이언트에서 원활하게 렌더링하여 더 빠르고 더 인터랙티브 한 사용자 경험을 제공할 수 있습니다.

2. 조금 더 복잡한 예제.

```js
// serverComponent.js
import { createSignal } from "react";
import { renderToStringAsync } from "react-dom/server";

const MyServerComponent = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <h1>서버 컴포넌트 예제</h1>
      <p>Count: {count()}</p>
      <button onClick={() => setCount(count() + 1)}>증가</button>
    </div>
  );
};

async function renderServerComponent() {
  const html = await renderToStringAsync(<MyServerComponent />);
  return html;
}

export default renderServerComponent;
```

이 예제에서는 react 패키지에서 createSignal 함수를 사용하여 count 변수의 상태를 관리합니다. 서버 컴포넌트는 제목을 렌더링하고 현재 카운트를 표시하는 단락 및 카운트를 증가시키는 버튼을 렌더링합니다. 버튼을 클릭할 때마다 setCount 함수를 사용하여 count 값이 업데이트됩니다.

<div class="content-ad"></div>

`renderServerComponent` 함수는 서버 컴포넌트를 문자열로 렌더링하기 위해 react-dom/server의 `renderToStringAsync`를 사용하는 비동기 함수입니다. 이 함수는 생성된 HTML을 반환합니다.

이 서버 컴포넌트를 서버 측 코드에서 사용하여 해당 컴포넌트를 렌더링하고 클라이언트 요청에 응답으로 보낼 수 있습니다.

서버 컴포넌트 API는 실험적인 기능이며 변경될 수 있습니다. 서버 컴포넌트와 함께 작업하기 위해 React 및 관련 패키지의 적절한 버전을 사용해야 합니다.

# React Query 통합

<div class="content-ad"></div>

리액트 쿼리는 리액트 애플리케이션에서 비동기 데이터 관리를 간단하게 해주는 강력한 데이터 가져오기 라이브러리입니다. 2023년 현재, 리액트 개발자들에게 필수적인 도구가 되었으며, 리액트와의 통합이 매우 원활합니다. 예시를 살펴봅시다:

```js
import { useQuery } from "react-query";

const UserProfile = () => {
  const { data, isLoading, isError } = useQuery("user", () =>
    fetch("/api/user").then((res) => res.json())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }

  return <div>{data.name}</div>;
};

export default UserProfile;
```

위 코드 스니펫에서는 React Query의 useQuery 훅을 사용하여 API에서 사용자 데이터를 가져오고 있습니다. 이 훅은 로딩 상태, 에러 처리, 데이터 캐싱 등을 자동으로 처리하여 리액트 애플리케이션에서 데이터 가져오기를 보다 간편하고 효율적으로 만들어줍니다.

# 리액트 개발자 도구 프로파일러 업그레이드

<div class="content-ad"></div>

리액트 DevTools는 리액트 애플리케이션의 디버깅을 돕는 브라우저 확장 프로그램으로, 컴포넌트의 성능을 더 잘 이해할 수 있도록 지속적으로 발전하고 있어요. 2023년에는 향상된 프로파일링 기능이 추가되어, 애플리케이션의 렌더링 및 다시 렌더링 성능을 분석하고 최적화할 수 있는 기회를 제공했어요. 프로파일러를 통해 성능 병목 현상을 식별하고 해결하며, 불필요한 렌더링을 줄이고 원활한 사용자 경험을 보장할 수 있어요.

```js
import React from "react";
import { unstable_trace as trace } from "scheduler/tracing";

const ReactComponent = () => {
  return <div>{/* 여러분의 컴포넌트 JSX */}</div>;
};

function App() {
  return (
    <React.Profiler id="MyComponent" onRender={callback}>
      <MyComponent />
    </React.Profiler>
  );
}

function callback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  // 여기서 콜백 처리
  console.log(
    "Render",
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  );
}

export default App;
```

# 리액트 에러 바운더리와 서스펜스

리액트 에러 바운더리를 사용하면 렌더링 중 발생하는 오류를 잡아내고 처리할 수 있어요. 서스펜스와 함께 사용하면 데이터를 불러오는 동안 대체 UI를 만들 수 있어요. 아래는 예시에요:

<div class="content-ad"></div>

```js
import { ErrorBoundary } from "react";

const ReactComponent = () => {
  return (
    <ErrorBoundary fallback={<div>오류가 발생했습니다!</div>}>
      <Suspense fallback={<div>로딩 중...</div>}>
        {/* 잠재적 오류 또는 비동기 로딩이 발생할 수 있는 컴포넌트들 */}
      </Suspense>
    </ErrorBoundary>
  );
};
```

# React Hooks 개선사항

React Hooks는 새로운 기능과 개선 사항과 함께 계속 발전하고 있습니다. 2023년에는 새로운 내장 훅들을 활용할 수 있습니다. useContextSelector 훅의 예시를 살펴보겠습니다. 이 훅을 사용하면 context 값의 특정 부분에 구독할 수 있습니다:

```js
import { useContextSelector } from "react";

const ReactContext = React.createContext();

const ReactComponent = () => {
  const value = useContextSelector(
    MyContext,
    (contextValue) => contextValue.someValue
  );

  return <div>{value}</div>;
};
```

<div class="content-ad"></div>

## JSX 변환

React는 모든 파일에서 React import가 필요없는 새로운 JSX 변환을 소개했습니다. 이는 코드베이스를 간소화하고 성능을 향상시킵니다. 예시가 있습니다:

```js
// JSX 변환 이전
import React from "react";

const MyComponent = () => {
  return <div>Hello, World!</div>;
};

export default MyComponent;
```

```js
// JSX 변환 이후
const MyComponent = () => {
  return <div>Hello, World!</div>;
};

export default MyComponent;
```

<div class="content-ad"></div>

새 JSX 변환을 사용하면 각 JSX 코드 파일에서 React를 명시적으로 가져와야 하는 필요가 없어졌어요!

# 결론

이게 전부에요! React는 계속 발전하며 개발자 생산성을 높이고 웹 애플리케이션의 전체 성능을 향상시키는 흥미로운 기능을 소개하고 있어요.

이 글에서는 2023년에 React에서 소개된 중요한 기능 중 일부를 살펴보았어요. 이 중에는 동시 모드, React 서버 구성 요소, React Query 통합, React DevTools 프로파일러 개선, Suspense와 함께 사용되는 React 에러 경계, React Hooks 개선, 그리고 JSX 변환 등이 있어요.

<div class="content-ad"></div>

앞으로 나아가면서 React의 최신 개발 동향을 계속해서 따라가는 것이 중요합니다. 이를 통해 React의 모든 가능성을 활용하고 첨단 웹 애플리케이션을 개발할 수 있습니다.

또한, 흥미로운 웹 지오메트리와 Electron + ioHook 통합에 관한 다른 기사도 확인해보세요:

## 즐겁게 코딩하세요!

```js
연락하고 싶으시면?

소셜 네트워크에서 저를 찾아보세요: Instagram, Facebook, Twitter.
```
