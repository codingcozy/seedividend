---
title: "React에서 에러를 처리하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How to handle errors in React full guide"
link: "https://medium.com/@adevnadia/how-to-handle-errors-in-react-full-guide-bd02634ff523"
---



![How to handle errors in React - full guide](/assets/img/HowtohandleerrorsinReactfullguide_0.png)

https://www.developerway.com에서 원래 발행되었습니다. 이 웹사이트에는 이와 같은 더 많은 기사들이 있어요 😉

우리 모두는 앱이 안정적이고 완벽하게 작동하며 모든 예외 상황을 고려하는 것을 원하죠, 그렇죠? 그러나 안타깝게도 우리는 모두 인간입니다 (적어도 그게 제 추측이에요), 우리는 모두 실수를 저지르며 완벽한 코드는 없다는 사실이 있죠. 얼마나 조심스럽게 해도 또는 얼마나 많은 자동화된 테스트를 작성해도, 언제나 뭔가 잘못되는 상황이 발생할 수 있어요. 사용자 경험과 관련된 중요한 점은 그 끔찍한 일을 예측하고 가능한 한 국부화하고 그래서 꾸준히 처리할 수 있는 방법을 찾는 것이에요.

그래서 오늘은 React에서 에러 처리에 대해 살펴보겠습니다: 에러가 발생했을 때 어떻게 대처할 수 있는지, 에러 포착에 대한 다양한 접근 방법의 주의점은 무엇인지, 그리고 그것을 어떻게 완화할 수 있는지요.

<div class="content-ad"></div>

# 왜 리액트에서 에러를 잡아야 하는 이유

그런데 먼저 중요한 것부터 말하자면, 리액트에서 에러를 잡는 솔루션이 꼭 필요한 이유는 무엇일까요?

답은 간단합니다: 16 버전부터는 리액트 라이프사이클 중에 에러가 발생하면 해당 에러를 멈추지 않는 한 전체 앱이 언마운트됩니다. 이전에는 컴포넌트가 잘못되거나 잘못 작동해도 화면에 유지됐지만, 이제는 UI의 무시할 만한 부분에서 발생한 예기치 못한 에러나 심지어 제어할 수 없는 외부 라이브러리에서 발생한 에러도 전체 페이지를 파괴하고 모두에게 빈 화면을 보여줄 수 있습니다.

이렇게 파괴적인 힘을 가진 프론트엔드 개발자들은 이전에 없었습니다 😅

<div class="content-ad"></div>

# 자바스크립트에서 오류를 처리하는 방법을 기억해 봅시다

일반 자바스크립트에서 예기치 않은 문제를 처리하는 방법은 꽤 직관적입니다.

우선 try/catch 문이 있습니다. 이 문은 무엇을 시도하려고 할 때, 만약 실패한다면 그 오류를 잡아내고 그것을 완화하는 작업을 수행합니다:

```js
try {
  // 만일 우리가 잘못된 일을 하고 있다면, 여기에서 오류가 발생할 수 있습니다
  doSomething();
} catch (e) {
  // 오류가 발생하면, 그것을 잡아내서 앱을 멈추지 않고 무언가 처리할 수 있습니다
  // 예를 들어, 어떤 로깅 서비스로 이 오류를 전송할 수 있습니다
}
```

<div class="content-ad"></div>

이것은 동일한 구문으로 async 함수와 함께도 작동합니다:

```js
try {
  await fetch("/bla-bla");
} catch (e) {
  // 오 안돼, fetch에 실패했어요! 뭔가 해야겠군요!
}
```

또는 옛날 스타일의 프로미스(promises)를 사용하려면 별도의 catch 메소드를 사용할 수 있습니다. 그러므로 이전 fetch 예제를 프로미스 기반 API로 다시 작성하면 아래와 같을 것입니다:

```js
fetch('/bla-bla').then((result) => {
  // 프로미스가 성공하면 결과가 여기에 있을 것입니다
  // 유용한 작업을 할 수 있어요
}).catch((e) => {
  // 오 안돼, fetch에 실패했어요! 뭔가 해야겠군요!
}
```

<div class="content-ad"></div>

같은 개념이지만 구현이 조금 다르기 때문에, 이후의 글에서는 모든 오류에 try/catch 구문을 사용할 예정입니다.

# React에서 간단한 try/catch: 사용 방법과 주의점

오류가 발견되면, 우리는 그에 대해 무언가를 해야 할 것입니다, 맞죠? 그래서, 정확히 어디까지 할 수 있을까요? 어딘가에 로깅하는 것 이외에 우리가 사용자를 위해 할 수 있는 것은 무엇일까요? 단순히 사용자를 빈 화면이나 고장난 인터페이스로 남겨두는 것은 사용자 친화적이지 않습니다.

가장 명백하고 직관적인 대답은, 우리가 수정을 기다리는 동안 무언가를 렌더링하는 것일 것입니다. 다행히도, catch 구문에서 상태를 설정하는 것을 포함해 우리는 catch 문에서 원하는 대로 할 수 있습니다. 그래서 우리는 다음과 같은 작업을 수행할 수 있습니다:

<div class="content-ad"></div>

```js
const SomeComponent = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      // 어떤 데이터를 가져오는 등의 작업 수행
    } catch (e) {
      // 에러 발생! 데이터를 가져오는 데 문제가 발생했습니다!
      setHasError(true);
    }
  });

  // 데이터를 가져오는 중에 문제 발생, 사용자에게 추가 정보가 있는 에러 화면을 렌더링합시다
  if (hasError) return <SomeErrorScreen />;

  // 모든 게 잘되고 데이터도 준비됐습니다, 렌더링해요
  return <SomeComponentContent {...datasomething} />;
};
```

우리는 데이터를 가져오기 시도하고, 만약 실패하면 에러 상태를 설정하고, 에러 상태가 true이면 사용자를 위한 추가 정보가 있는 에러 화면을 렌더링합니다. 예를 들어, 지원 연락처 번호와 같은 정보를 추가로 표시할 수 있어요.

이 방법은 간단하고 예측 가능하며 실패한 데이터 가져오기를 처리하는 등의 한정된 사용 사례에 훌륭하게 작동합니다.

하지만 컴포넌트에서 발생할 수 있는 모든 에러를 잡고자 한다면 몇 가지 도전과 심각한 제한 사항에 직면할 것입니다.

<div class="content-ad"></div>

제한 사항 1: useEffect 훅을 사용할 때 문제가 발생합니다.

try/catch로 useEffect를 감싸면 작동하지 않습니다:

```js
try {
  useEffect(() => {
    throw new Error("헐크 스매시!");
  }, []);
} catch (e) {
  // useEffect가 예외를 던질 때도 이 블록은 호출되지 않습니다
}
```

이는 useEffect가 렌더링 후 비동기적으로 호출되기 때문에 try/catch 관점에서 모든 것이 성공적으로 진행된 것으로 본다는 이유에서 발생합니다. 이는 어떤 Promise든 같은 이야기입니다: 결과를 기다리지 않으면 JavaScript가 계속 진행하고 Promise가 완료될 때 결과를 반환한 후에 비로소 useEffect나 Promise의 then 안에 있는 내용을 실행합니다. try/catch 블록은 그때쯤에는 이미 실행되고 없어진 상태일 것입니다.

<div class="content-ad"></div>

useEffect 내부의 오류를 잡으려면 try/catch도 함께 넣어주어야 합니다:

```js
useEffect(() => {
  try {
    throw new Error("헐크 스매쉬!");
  } catch (e) {
    // 이 부분은 잡힙니다
  }
}, []);
```

이 예시를 활용해보세요.

이것은 useEffect를 사용하는 모든 훅이나 실제로 비동기 작업을 하는 것에 적용됩니다. 따라서 모든 것을 감싸는 단일 try/catch 대신, 각 hook마다 하나씩 나눠서 블록을 만들어야 합니다.

<div class="content-ad"></div>

제약 사항 2: 자식 컴포넌트입니다. try/catch는 자식 컴포넌트 내에서 발생하는 모든 것을 잡아낼 수 없습니다. 단순히 이렇게 할 수 없습니다:

```js
const Component = () => {
  let child;

  try {
    child = <Child />;
  } catch (e) {
    // Child 컴포넌트 내의 오류를 잡기에 쓸모없습니다. 트리거되지 않습니다.
  }

  return child;
};
```

심지어 이렇게 해도 마찬가지입니다:

```js
const Component = () => {
  try {
    return <Child />;
  } catch (e) {
    // 여전히 Child 컴포넌트 내의 오류를 잡기에 쓸모없습니다. 트리거되지 않습니다.
  }
};
```

<div class="content-ad"></div>

이 예제를 활용해서 놀아보세요.

여기에 프로시작 `{Child /}`를 작성할 때, 실제로 이 컴포넌트를 렌더링하지 않기 때문에 발생합니다. 우리가 하는 것은 컴포넌트 요소를 생성하는 것인데, 이는 단순히 컴포넌트의 정의일 뿐입니다. 이는 컴포넌트 유형 및 프롭과 같은 필요한 정보를 포함한 객체일 뿐이며, React 자체에서 나중에 사용할 것입니다. 실제로 이 컴포넌트를 렌더링하도록 트리거할 것이며, try/catch 블록이 성공적으로 실행된 후에 발생할 것입니다. 이는 약속과 useEffect 훅과 정확히 동일한 이야기입니다.

요소와 컴포넌트가 어떻게 작동하는지 자세히 알고 싶다면 이 기사를 확인해보세요: React Element, children, parents 및 재렌더링의 신비

제한 3: 렌더 중에 상태를 설정하는 것은 금지돼요

<div class="content-ad"></div>

만약 useEffect와 다양한 콜백 바깥에서 오류를 잡으려고 한다면, 컴포넌트 렌더링 중에 처리해야 할 것들이 더 이상 쉽지 않다는 것을 알 수 있어요. 렌더링 중에 상태를 업데이트하는 것은 허용되지 않아요.

예를 들어 다음과 같이 간단한 코드는 오류가 발생할 경우 무한한 재렌더링 루프를 발생시킬 거에요:

```js
const Component = () => {
  const [hasError, setHasError] = useState(false);

  try {
    doSomethingComplicated();
  } catch (e) {
    // 이렇게 하지 말아요! 오류 발생 시 무한한 루프를 발생시킬 거에요
    // 아래 코드 샌드박스에서 실제 예제를 확인하세요
    setHasError(true);
  }
};
```

코드샌드박스에서 확인해보세요.

<div class="content-ad"></div>

물론 여기서 상태를 설정하는 대신 에러 화면을 반환할 수 있습니다:

```js
const Component = () => {
  try {
    doSomethingComplicated();
  } catch (e) {
    // 이렇게 반환 가능합니다
    return <SomeErrorScreen />;
  }
};
```

그러나 상상하실 수 있듯이, 이것은 조금 복잡하며, 같은 컴포넌트에서 오류를 처리해야 하는 것을 강제할 것입니다: useEffect 및 콜백을 위한 상태 및 직접 반환을 위한 것이 다릅니다.

```js
// 작동은 하겠지만, 정말 복잡하고 유지 보수가 힘들어요. 그렇게 하지 마세요
const SomeComponent = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      // 데이터를 가져오는 등의 작업 수행
    } catch (e) {
      // useEffect 또는 콜백에서 오류 발생 시 직접 반환할 수 없어
      // 상태를 사용해야 합니다
      setHasError(true);
    }
  });

  try {
    // 렌더 중에 작업 수행
  } catch (e) {
    // 여기서는 상태를 사용할 수 없기 때문에 오류 발생 시 바로 반환해야 함
    return <SomeErrorScreen />;
  }

  // 여기서도 오류 상태에 따라 반환해주어야 합니다
  if (hasError) return <SomeErrorScreen />;

  return <SomeComponentContent {...datasomething} />;
};
```

<div class="content-ad"></div>

이 섹션을 요약하면, React에서 try/catch에만 의존한다면 대부분의 오류를 놓칠 수도 있고, 모든 컴포넌트를 이해하기 어려운 코드 무리로 만들거나 스스로 오류를 발생시킬 수도 있습니다.

다행히도 다른 해결책이 있습니다.

# React ErrorBoundary 컴포넌트

위의 제한 사항을 완화하기 위해 React는 우리에게 "Error Boundaries"라고 알려진 특별한 API를 제공합니다: 일종의 React 선언적 코드에 대한 try/catch 문을 일반 컴포넌트로 바꿔줍니다. 모든 예제에서(React 문서 포함) 볼 수 있는 전형적인 사용법은 다음과 같을 것입니다:

<div class="content-ad"></div>

```js
const Component = () => {
  return (
    <ErrorBoundary>
      <SomeChildComponent />
      <AnotherChildComponent />
    </ErrorBoundary>
  );
};
```

만약 이러한 컴포넌트들 중 하나나 그 자식들이 렌더링 중에 문제가 발생하면, 오류가 포착되고 처리될 것입니다.

하지만 React는 컴포넌트 자체를 제공해주지 않고, 구현할 수 있는 도구를 제공해줍니다. 가장 간단한 구현은 다음과 같을 것입니다:

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // 오류 상태를 초기화합니다
    this.state = { hasError: false };
  }

  // 오류가 발생했을 때 상태를 true로 설정합니다
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    // 오류가 발생했을 경우 대체 컴포넌트를 반환합니다
    if (this.state.hasError) {
      return <>앗! 실패했어요!</>;
    }

    return this.props.children;
  }
}
```

<div class="content-ad"></div>

흔한 클래스 컴포넌트를 만들어봅시다 (올드스쿨로 가요, 에러 바운더리를 위한 훅은 사용하지 않습니다), 그리고 getDerivedStateFromError 메서드를 구현해요 - 이렇게 하면 컴포넌트가 적절한 에러 바운더리로 변합니다.

에러 처리 시 중요한 작업 중 하나는 에러 정보를 담당자에게 신속히 알려야 해요. 이를 위해 에러 바운더리는 componentDidCatch 메서드를 제공해요:

```js
class ErrorBoundary extends React.Component {
  // 나머지는 그대로

  componentDidCatch(error, errorInfo) {
    // 여기서 에러를 전송해요
    log(error, errorInfo);
  }
}
```

에러 바운더리를 설정한 후에는 다른 컴포넌트와 마찬가지로 원하는 대로 사용할 수 있어요. 예를 들어, 재사용 가능성을 높이고 폴백을 프로퍼티로 전달할 수도 있어요:

<div class="content-ad"></div>

```js
render() {
  // 만약 오류가 발생했다면 대체 컴포넌트를 반환합니다
  if (this.state.hasError) {
    return this.props.fallback;
  }

  return this.props.children;
}
```

그리고 다음과 같이 사용할 수 있습니다:

```js
const Component = () => {
  return (
    <ErrorBoundary fallback={<>이런! 무언가를 해야 합니다!</>}>
      <SomeChildComponent />
      <AnotherChildComponent />
    </ErrorBoundary>
  );
};
```

또는 상태를 재설정하는 버튼 클릭, 오류 유형 구분, 또는 해당 오류를 어딘가의 컨텍스트에 푸시하는 등 필요한 모든 작업을 수행할 수 있습니다.

<div class="content-ad"></div>

위의 예시 전체를 이 코드샌드박스에서 확인해보세요.

하지만 기억해야 할 점이 하나 있어요: 에러가 없는 세상에서도 모든 것을 잡아낼 수는 없다는 거죠.

# 에러바운더리 컴포넌트: 제한 사항

에러 바운더리는 React 라이프사이클 동안 발생하는 에러만 잡아냅니다. 라이프사이클 외부에서 발생하는 것들, 예를 들어 해결된 프로미스, setTimeout을 사용한 비동기 코드, 다양한 콜백 및 이벤트 핸들러 등은 명시적으로 처리되지 않는다면 그냥 사라질 수 있어요.

<div class="content-ad"></div>

```js
const Component = () => {
  useEffect(() => {
    // 이 에러는 ErrorBoundary 컴포넌트에서 잡힐 것입니다
    throw new Error("모든 것을 파괴하라!");
  }, []);

  const onClick = () => {
    // 이 에러는 그저 사라질 것입니다
    throw new Error("헐크 스매시!");
  };

  useEffect(() => {
    // 이 에러가 발생하면 그냥 사라질 것입니다
    fetch("/bla");
  }, []);

  return <button onClick={onClick}>눌러주세요</button>;
};

const ComponentWithBoundary = () => {
  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  );
};
```

일반적으로 여기서 권장하는 것은 그러한 종류의 에러에 대해 일반적인 try/catch를 사용하는 것입니다. 그리고 적어도 여기에서 우리는 상태를 안전하게 사용할 수 있습니다 (대략): 이벤트 핸들러의 콜백은 보통 상태를 설정하는 곳이기 때문입니다. 기술적으로, 우리는 두 가지 접근법을 결합하고 다음과 같이 할 수 있습니다:

```js
const Component = () => {
  const [hasError, setHasError] = useState(false);

  // 이 컴포넌트와 하위 컴포넌트의 대부분의 에러가 ErrorBoundary에 잡히게 됩니다

  const onClick = () => {
    try {
      // 이 에러는 catch에 잡힐 것입니다
      throw new Error("헐크 스매시!");
    } catch (e) {
      setHasError(true);
    }
  };

  if (hasError) return "문제가 발생했습니다";

  return <button onClick={onClick}>눌러주세요</button>;
};

const ComponentWithBoundary = () => {
  return (
    <ErrorBoundary fallback={"이런! 문제가 발생했습니다"}>
      <Component />
    </ErrorBoundary>
  );
};
```

하지만. 우리는 여전히 처음부터 다시 시작해야 합니다: 모든 컴포넌트는 "에러" 상태를 관리해야 하며 더 중요한 것은 무엇을 해야 하는지에 대한 결정을 내려야 합니다.

<div class="content-ad"></div>

물론, 컴포넌트 수준에서 발생하는 오류를 처리하는 대신 이를 ErrorBoundary를 통해 상위로 전파하여 부모로 전달하는 것도 가능합니다. 이렇게 하면 적어도 "폴백" 컴포넌트를 한 곳에서만 사용할 수 있습니다:

```js
const Component = ({ onError }) => {
  const onClick = () => {
    try {
      throw new Error("헐크가 강력하게 공격했어요!");
    } catch (e) {
      // 상태를 관리하는 대신 프롭을 호출하세요
      onError();
    }
  };

  return <button onClick={onClick}>클릭해주세요</button>;
};

const ComponentWithBoundary = () => {
  const [hasError, setHasError] = useState();
  const fallback = "앗! 뭔가 잘못됐어요";

  if (hasError) return fallback;

  return (
    <ErrorBoundary fallback={fallback}>
      <Component onError={() => setHasError(true)} />
    </ErrorBoundary>
  );
};
```

하지만 추가 코드가 많이 필요합니다! 렌더 트리의 모든 자식 컴포넌트에 대해 이 작업을 수행해야 합니다. 또한 이제 부모 컴포넌트와 ErrorBoundary 자체에서 오류 상태를 유지 관리해야 합니다. 이미 ErrorBoundary에 오류 전파 메커니즘이 구현되어 있으므로, 여기서는 중복 작업을 하고 있는 것이죠.

그러면 비동기 코드와 이벤트 핸들러에서 발생하는 오류를 대신 ErrorBoundary에서 캐치할 수는 없을까요?

<div class="content-ad"></div>

# 에러 바운더리를 이용해 비동기 에러 처리하기

놀랍게도 - 우리는 에러 바운더리로 모든 에러를 잡을 수 있어요! 다들이 좋아하는 Dan Abramov가 우리에게 이를 가능하게 하는 멋진 해킹 기술을 소개해주셨어요: "hook에서 발생한 에러를 에러 바운더리에서 잡지 못하는 문제" • 이슈 #14981 • facebook/react.

이 기술의 핵심은 try/catch로 먼저 에러를 잡은 다음, catch 문 내에서 일반적인 React 재렌더링을 트리거하고, 그런 다음 이러한 에러를 다시 재련더링 라이프사이클로 돌려보내는 것이에요. 이렇게 하면 에러 바운더리가 그것들을 다른 에러처럼 잡을 수 있어요. 그리고 상태 업데이트가 재렌더링을 트리거하는 방법이며, 상태 설정 함수가 업데이터 함수를 인자로 실제로 받을 수 있다는 것을 이용하면, 해결책은 정말 마법 같아요:

```js
const Component = () => {
  // 에러를 던질 랜덤 상태를 생성해요
  const [state, setState] = useState();

  const onClick = () => {
    try {
      // 뭔가 나쁜 일이 일어났어요
    } catch (e) {
      // 상태 업데이트를 트리거하고, 업데이터 함수를 인자로 사용해요
      setState(() => {
        // 이 업데이터 함수 내에서 이 에러를 다시 던져요
        // 상태 업데이트 중에 트리거될 거예요
        throw e;
      });
    }
  };
};
```

<div class="content-ad"></div>

이 코드 샌드박스에 전체 예제가 있습니다.

마지막 단계는 이 상태 없애는 추상화하는 것입니다. 각 구성 요소마다 무작위 상태를 만들 필요가 없도록 해야 합니다. 여기서 창의적으로 작업할 수 있습니다. 비동기 오류 처리기를 제공하는 훅을 만들어봅시다:

```js
const useThrowAsyncError = () => {
  const [state, setState] = useState();

  return (error) => {
    setState(() => throw error);
  };
};
```

다음과 같이 사용할 수 있습니다:

<div class="content-ad"></div>

```js
const Component = () => {
  const throwAsyncError = useThrowAsyncError();

  useEffect(() => {
    fetch("/bla")
      .then()
      .catch((e) => {
        // throw async error here!
        throwAsyncError(e);
      });
  });
};
```

혹은, 이렇게 콜백을 위한 래퍼를 만들 수도 있어요:

```js
const useCallbackWithErrorHandling = (callback) => {
  const [state, setState] = useState();

  return (...args) => {
    try {
      callback(...args);
    } catch (e) {
      setState(() => throw e);
    }
  };
};
```

그리고 이렇게 사용할 수 있어요:

<div class="content-ad"></div>

```js
const Component = () => {
  const onClick = () => {
    // 여기서 위험한 작업을 수행합니다
  };

  const onClickWithErrorHandler = useCallbackWithErrorHandling(onClick);

  return <button onClick={onClickWithErrorHandler}>클릭해주세요!</button>;
};
```

또는 마음이 원하는 대로 할 수 있습니다. 어플리케이션이 요구한 대로 말이죠. 어떤 제한도 없어요! 그리고 더 이상 오류들이 놓칠 일은 없을 거예요.

Codesandbox에서 전체 예제를 확인해보세요.

# 그냥 react-error-boundary를 사용해도 되나요?

<div class="content-ad"></div>

지루한 작업을 반복하거나 이미 해결된 문제에 대해 라이브러리를 선호하는 분들을 위해 좋은 것이 있어요. 유연한 ErrorBoundary 컴포넌트를 구현하고 몇 가지 유용한 유틸리티를 제공하는 좋은 라이브러리가 있답니다. 위에서 설명한 것과 비슷한 것이 있어요: GitHub — bvaughn/react-error-boundary

사용할지 여부는 개인의 취향, 코딩 스타일 및 구성 요소 내의 독특한 상황에 따라 다를 수 있어요.

오늘은 여기까지에요. 이제부터는 여러분이 앱에서 문제가 발생할 때 쉽고 우아하게 대응할 수 있기를 바래요.

그리고 기억하세요:

<div class="content-ad"></div>

- try/catch 블록은 useEffect와 같은 훅 내부, 그리고 자식 컴포넌트 내에서 발생하는 오류를 잡지 못합니다.
- ErrorBoundary는 이를 잡을 수 있지만, 비동기 코드와 이벤트 핸들러 내부의 오류는 잡지 못합니다.
- 그럼에도 불구하고, ErrorBoundary가 이를 잡을 수 있도록 할 수 있습니다. 단지 먼저 try/catch로 오류를 잡고, 그 후에 React 라이프사이클로 다시 던져주면 됩니다.

에러 없는 긴 여행을! ✌🏼

최초 게시: https://www.developerway.com. 해당 웹사이트에는 더 많은 이와 유사한 기사들이 있습니다 😉

다음 기사가 나오는 즉시 알림을 받으려면 뉴스레터를 구독하거나 LinkedIn에서 연락하거나 Twitter를 팔로우하세요.
