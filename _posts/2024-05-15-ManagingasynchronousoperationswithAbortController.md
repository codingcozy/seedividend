---
title: "비동기 작업을 AbortController로 관리하기"
description: ""
coverImage: "/assets/img/2024-05-15-ManagingasynchronousoperationswithAbortController_0.png"
date: 2024-05-15 15:29
ogImage: 
  url: /assets/img/2024-05-15-ManagingasynchronousoperationswithAbortController_0.png
tag: Tech
originalTitle: "Managing asynchronous operations with AbortController"
link: "https://medium.com/@szympajka/managing-asynchronous-operations-with-abortcontroller-96f7c9cb4917"
---


`<img src="/assets/img/2024-05-15-ManagingasynchronousoperationswithAbortController_0.png" />`

AbortController는 특수한 기능입니다. 대부분의 사람들은 Webpack 구성, 파일 I/O 또는 버퍼와 같은 것들과 작업을 하다가 이 매우 유용한 API를 우연히 발견하게 됩니다. 널리 사용되지 않지만 AbortController는 비동기 작업을 취소하는 방법을 제공하여 매우 유용합니다. 당신이 곧 알게 될 것은... 무엇이든지!

하지만 먼저 기초부터 시작해보죠.

# 네트워크 요청



AbortController의 가장 잘 알려진 사용법은 네트워크 호출을 취소하는 데 사용하는 것입니다. fetch API는 옵션으로 signal 속성을 기본 제공하며, 문법은 다음과 같습니다:

```js
const controller = new AbortController();
const signal = controller.signal;

await fetch(url, { signal })

// 요청을 취소하려면 다음을 호출하십시오:
controller.cancel()
```

웹 응용 프로그램 프레임워크 세계에서는 아래와 같이 사용되는 것을 찾을 수 있습니다 (이 기사 전반에서 코드 예시로 React를 사용합니다):

```js
useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;
  
  const fetchData = async () => {
    try {
      const res = await fetch(url, { signal })
      const data = await res.json();

      setState(data);
    } catch (err) {
      // 에러 처리
    }
  }
  
  void fetchData();
  
  return () => {
    controller.abort()
  }
}, []);
```


이것은 당신의 컴포넌트가 unmounted(해제된) 될 때 API를 계속해서 가져오지 않고 상태를 설정하지 않도록 보장하기 위해 필요합니다.

# 타이머

일반적인 sleep 함수는 아래와 같이 보입니다:

```js
const sleep = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
```



좋은 작업이 잘 되었지만 이렇게 되면 콜백을 취소할 수 없어요. 이 문제를 해결해 봐요:

```js
const sleep = async (ms: number, timeoutId: NodeJS.Timeout) => {
  return new Promise((resolve) => {
    timeoutId = setTimeout(resolve, ms);
  });
};
```

이 코드는 간단한 작업에는 잘 작동하지만, 민감도에 따라 2가지 (또는 3가지) 문제가 있어요. 첫째, timeoutId가 사용되지 않는다는 경고가 대부분의 린팅 설정에서 표시될 거예요. 둘째, 네트워크 요청과 섞였을 때, 2개의 다른 정리 API가 발생해요. 세번째 문제는 timeoutId 매개변수가 참조로 전달되고, refenence 작업을 엄격히 제어하지 않는 언어에서 참조로 작업하는 것은 종종 예기치 못한 버그를 발생시킬 수 있어요.

AbortController를 사용하면 도움이 될거예요, 특히 AbortController 신호는 여러 소스에 연결할 수 있기 때문에요.



이제 신호를 지원하기 위해 sleep 함수를 수정해 봅시다:

```js
const sleep = (ms: number, { signal = null }: { signal: AbortSignal | null }): Promise<void> =>
  new Promise((resolve) => {
    const timeoutId = setTimeout(resolve, ms);
    
    if (signal) {
      signal.addEventListener('abort', () => clearTimeout(timeoutId), { once: true });
    }
  });
```

이제 fetch API와 일치하도록 정렬되었으니, 실제로 어떻게 작동하는지 살펴봅시다:

```js
useEffect(() => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  const fetcher = async () => {
    await fetch('/api/1', { signal });
    await sleep(200, { signal });
    await fetch('/api/2', { signal });
  };

  void fetcher();

  return () => {
    abortController.abort();
  };
}, []);
```



위에서 볼 수 있듯이, AbortController 신호는 fetch 요청과 사용자 정의 sleep 함수 두 가지에 모두 활용되어, 단일 신호가 여러 비동기 작업에 걸쳐 공유되고 코드를 깔끔하게 유지할 수 있다는 것을 보여줍니다.

# Debounce와 Throttle

사용자가 입력할 때 API에서 제안을 가져오고 싶은 검색 입력란을 가지고 있다고 상상해보세요. 매크로트롬이 발동되는 것은 거의 원하는 것이 아닙니다. 키 입력할 때마다 요청을 보내는 것은 성능 및 개인 정보 보호에 여러 문제가 있을 수 있습니다. 대신, API 요청을 debounce하여 사용자가 잠시 타이핑을 멈출 때까지 지연시킵니다. 이를 위해 AbortController가 어떻게 도움이 되는지 살펴보겠습니다:

```js
const abortControllerRef = useRef<AbortController | null>(null);

const onInput = useCallback(
  async (event: React.ChangeEvent<HTMLInputElement>) => {
    abortControllerRef.current?.abort(); // 이전 비동기 작업을 안전하게 중단합니다

    const input = event.currentTarget;

    if (input.value?.length < 2) {
      return; // 짧은 입력 값에 대한 조기 반환
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    await sleep(300, { signal }); // Debounce 지연

    await fetchSearchSuggestions(input.value, { signal });
  },
  []
);

useEffect(() => {
  return () => {
    abortControllerRef.current?.abort(); // 컴포넌트가 언마운트될 때 진행 중인 모든 비동기 작업을 중지합니다
  };
}, []);

return (
  <input onInput={onInput} />
);
```



다시 한 번 상세 제어기인 AbortController를 활용함으로써, 우리의 코드가 여러 번의 정리 작업을 처리할 필요 없이 간편하게 중단 사항을 처리할 수 있도록 보장합니다. debounce 목적으로 AbortController를 사용하는 추가적인 이점은 사용자가 sleep 함수가 종료된 후에 타이핑을 시작하면 비행 중인 호출을 취소할 것이므로 사용자가 항상 최신 쿼리 결과를 받게 함을 보장합니다. 이전에 해결된 쿼리가 아닌 최신 쿼리에 대한 결과를 사용자가 항상 수신합니다!

이 기사를 리뷰해 준 Trys Mudford님께 감사드립니다 👏

# 저자 소개

저는 Szymon이라고 합니다. Motorway에서 웹 및 디자인 시스템 개발자로 근무하고 있습니다. 5년이 넘게 참여한 이후 영국에서 가장 빠르게 성장하는 중고차 거래 시장을 구축하는 데 도움을 주고 있습니다.