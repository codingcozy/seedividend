---
title: "React 19 Beta 릴리스, 새로운 기능 소개 및 정리"
description: ""
coverImage: "/assets/img/2024-05-01-React19BetaReleasedWhatYouNeedtoKnow_0.png"
date: 2024-05-01 17:45
ogImage: 
  url: /assets/img/2024-05-01-React19BetaReleasedWhatYouNeedtoKnow_0.png
tag: Tech
originalTitle: "🎀 React 19 Beta Released: What You Need to Know"
link: "https://medium.com/javascript-in-plain-english/react-19-beta-released-what-you-need-to-know-a2fb3a0b2b2a"
isUpdated: true
---




![이미지](/assets/img/2024-05-01-React19BetaReleasedWhatYouNeedtoKnow_0.png)

지난 2022년 6월 React의 마지막 안정 버전 이후, 두 년 가까이 새 버전이 나오지 않았는데, 이제 npm에서 React 19 베타판이 안정 버전인 React 18.3.0과 함께 공개되었습니다. React 19 베타판에서 개발자들이 알아야 할 새로운 기능을 살펴보겠습니다.

## 액션

![이미지](/assets/img/2024-05-01-React19BetaReleasedWhatYouNeedtoKnow_1.png)

<div class="content-ad"></div>

리액트 앱에서 흔히 발생하는 사용 사례는 데이터 변이를 수행한 다음 응답에 따라 상태를 업데이트하는 것입니다. 예를 들어, 사용자가 이름을 변경하기 위해 양식을 제출하면 API 요청을 만들고 그 다음 응답을 처리해야 합니다. 과거에는 보류 중인 상태, 오류, 낙관적 업데이트 및 순차 요청을 수동으로 처리해야 했습니다.

예를 들어, useState로 대기 및 오류 상태를 처리할 수 있었습니다:

```js
// 액션 이전
function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
    const error = await updateName(name);
    setIsPending(false);
    if (error) {
      setError(error);
      return;
    } 
    redirect("/경로");
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        업데이트
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
```

리액트 19에서는 전이에 비동기 함수를 사용하여 대기 중인 상태, 오류, 양식 및 낙관적 업데이트를 자동으로 처리할 수 있는 지원이 추가되었습니다.

<div class="content-ad"></div>

예를 들어, useTransition을 사용하여 대기 상태를 처리할 수 있습니다:

```js
// Actions에서 대기 상태 사용하기
function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    startTransition(async () => {
      const error = await updateName(name);
      if (error) {
        setError(error);
        return;
      } 
      redirect("/path");
    })
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
```

비동기 전환은 즉시 isPending 상태를 true로 설정하고 비동기 요청을 수행한 다음 이전 전환 후에 isPending를 false로 전환합니다. 이렇게 하면 데이터가 변경되는 동안에도 현재 UI를 반응적이고 상호작용할 수 있게 유지할 수 있습니다.

관례적으로, 비동기 전환을 사용하는 함수는 "Actions"라고 합니다.

<div class="content-ad"></div>

동작은 데이터 제출을 자동으로 처리해줍니다:

- 보류 상태: 동작은 요청의 시작부터 시작되는 보류 상태를 제공하며, 최종 상태 업데이트가 완료될 때 자동으로 재설정됩니다.
- 낙관적 업데이트: 동작은 새로운 useOptimistic 훅을 지원하여 요청이 제출되는 동안 사용자에게 즉시 피드백을 제공할 수 있습니다.
- 오류 처리: 동작은 오류 처리를 제공하여 요청이 실패했을 때 오류 경계를 표시하고, 낙관적 업데이트를 자동으로 원래 값으로 되돌립니다.
- 폼: 이제 `form` 요소는 동작과 formAction props에 함수를 전달할 수 있습니다. action props에 함수를 전달하면 기본적으로 동작을 사용하고 제출 후 자동으로 폼을 재설정합니다.

React 19에서 동작을 기반으로하면 낙관적 업데이트를 관리하는 useOptimistic 및 동작의 공통 사례를 처리하는 새로운 hook인 React.useActionState를 도입했습니다. react-dom에서는 `form` 동작을 사용하여 폼을 자동으로 처리하고, 동작의 공통 사례를 지원하는 useFormStatus를 추가했습니다.

React 19에서 위 예제는 간단하게 변경될 수 있습니다:

<div class="content-ad"></div>

```js
// <form> 작업 및 useActionState 사용하기
function ChangeName({ name, setName }) {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get("name"));
      if (error) {
        return error;
      }
      redirect("/path");
    }
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>업데이트</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

# 새로운 훅: useActionState

React 19에서 일반적인 케이스를 보다 쉽게 만들기 위해 useActionState라는 새로운 훅이 추가되었습니다:

```js
const [error, submitAction, isPending] = useActionState(async (previousState, newName) => {
  const error = await updateName(newName);
  if (error) {
    // 작업의 결과로 어떤 것이든 반환할 수 있습니다.
    // 여기서는 오직 에러만 반환합니다.
    return error;
  }
  
  // 성공 처리
});
```

<div class="content-ad"></div>

`useActionState` 함수는 함수(액션)를 인수로 받아 감싼 액션을 호출합니다. 이는 액션이 조합되기 때문에 작동합니다. 감싼 액션이 호출되면 `useActionState`는 액션의 마지막 결과를 데이터로 반환하고 액션의 보류 상태를 보류로 반환합니다.

# React DOM: form 액션

React 19의 새로운 `form` 기능에 액션도 통합되어 있습니다. `form`, `input`, 그리고 `button` 엘리먼트의 액션과 formAction 프롭으로 함수를 전달하여 액션과 함께 자동으로 폼을 제출할 수 있습니다:

```js
<form action={actionFunction}>
```

<div class="content-ad"></div>

`form`이 성공하면 React는 제어되지 않는 컴포넌트를 위해 자동으로 `form`을 재설정합니다. `form`을 수동으로 재설정해야 하는 경우, 새 요청 `form` 재설정 React DOM API를 호출할 수 있습니다.

# React DOM: 새로운 훅: useFormStatus

디자인 시스템에서 `form`에 대한 정보에 액세스해야 하는 디자인 컴포넌트를 작성하는 것이 일반적입니다. 그러나 컴포넌트로 속성을 전달 받지 않아도 되도록 하는 경우가 있습니다. 이 작업은 Context를 통해 수행할 수 있지만, 일반적인 경우를 쉽게 만들기 위해 React 19에 새로운 훅인 useFormStatus가 추가되었습니다:

```js
import {useFormStatus} from 'react-dom';

function DesignButton() {
  const {pending} = useFormStatus();
  return <button type="submit" disabled={pending} />
}
```

<div class="content-ad"></div>

`useFormStatus`는 부모 `form`의 상태를 읽어오는 것처럼 동작하여, 마치 form이 Context 제공자인 것처럼 사용할 수 있습니다.

# 새로운 훅: useOptimistic

데이터 변경 작업을 수행할 때 또 다른 일반적인 UI 패턴은 비동기 요청 진행 중에 최종 상태를 낙관적으로 표시하는 것입니다. React 19에서는 이를 쉽게 처리할 수 있도록 `useOptimistic`라는 새로운 훅이 추가되었습니다:

```js
function ChangeName({currentName, onUpdateName}) {
  const [optimisticName, setOptimisticName] = useOptimistic(currentName);

  const submitAction = async formData => {
    const newName = formData.get("name");
    setOptimisticName(newName);
    const updatedName = await updateName(newName);
    onUpdateName(updatedName);
  };

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <p>
        <label>Change Name:</label>
        <input
          type="text"
          name="name"
          disabled={currentName !== optimisticName}
        />
      </p>
    </form>
  );
}
```

<div class="content-ad"></div>

`useOptimistic` 훅은 `updateName` 요청이 진행 중일 때 즉시 `optimisticName`을 렌더링합니다. 업데이트가 완료되거나 에러가 발생하면 React가 자동으로 `currentName` 값으로 전환됩니다.

# 새 API: use

React 19에서 렌더링하는 동안 리소스를 읽기 위한 새로운 API가 추가되었습니다: `use`.

예를 들어, `use`로 프로미스를 읽을 수 있으며, React가 프로미스가 해결될 때까지 일시 중단됩니다:

<div class="content-ad"></div>

```js
import {use} from 'react';

function Comments({commentsPromise}) {
  // `use`가 프로미스가 해결될 때까지 일시 중단됩니다.
  const comments = use(commentsPromise);
  return comments.map(comment => <p key={comment.id}>{comment}</p>);
}

function Page({commentsPromise}) {
  // Comments에서 `use`가 일시 중단되면
  // 이 Suspense 경계가 표시됩니다.
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  )
}
```

렌더링되는 동안 생성된 프로미스를 지원하지 않습니다.

렌더링에서 만든 프로미스를 use에 전달하려고 하면 React에서 경고합니다:

수정하려면, 프로미스 캐싱을 지원하는 suspense 기반 라이브러리나 프레임워크에서 프로미스를 전달해야 합니다. 미래에는 렌더링 중에 프로미스를 캐싱하기 쉽게 만드는 기능을 제공할 예정입니다.

<div class="content-ad"></div>

또한 일찍 반환한 후와 같이 조건부로 Context를 읽을 수도 있습니다:

```js
import {use} from 'react';
import ThemeContext from './ThemeContext'

function Heading({children}) {
  if (children == null) {
    return null;
  }
  
  // 일찍 반환으로 인해 useContext로 동작하지 않습니다.
  const theme = use(ThemeContext);
  return (
    <h1 style={{color: theme.color}}>
      {children}
    </h1>
  );
}
```

use API는 후크와 유사하게 렌더링 중에만 호출될 수 있습니다. 후크와는 다르게 use는 조건부로 호출할 수 있습니다.

자세한 정보는 use에 대한 문서를 참조하세요.

<div class="content-ad"></div>

# ref을 속성으로 사용하기

React 19부터 함수 컴포넌트에서 ref를 속성으로 접근할 수 있습니다:

```js
function MyInput({placeholder, ref}) {
  return <input placeholder={placeholder} ref={ref} />
}

//...
<MyInput ref={ref} />
```

새로운 함수 컴포넌트는 더 이상 forwardRef가 필요하지 않습니다. 향후 버전에서 React는 forwardRef를 사용하지 않도록 하고 제거할 예정입니다.

<div class="content-ad"></div>

# 'Context'를 제공자로 렌더링하기

React 19에서 'Context.Provider' 대신 'Context'를 제공자로 렌더링할 수 있습니다:

```js
const ThemeContext = createContext('');

function App({children}) {
  return (
    <ThemeContext value="dark">
      {children}
    </ThemeContext>
  );  
}
```

나중에 React 버전에서는 'Context.Provider'를 사용하지 않도록 지원 중단될 예정입니다.

<div class="content-ad"></div>

# ref에 대한 정리 함수

이제 React는 ref 콜백에서 정리 함수를 반환하는 것을 지원합니다:

```js
<input
  ref={(ref) => {
    // ref 생성

    // 새로운 기능: 요소가 DOM에서 제거될 때 ref를 재설정하는 정리 함수를 반환합니다.
    return () => {
      // ref 정리
    };
  }
/>
```

컴포넌트가 언마운트될 때, React는 ref 콜백에서 반환된 정리 함수를 호출합니다. 이는 DOM ref, 클래스 컴포넌트에 대한 ref 및 useImperativeHandle에 대해 작동합니다.

<div class="content-ad"></div>

리팩토링된 ref 정리 함수의 도입으로 인해 TypeScript에서 ref 콜백에서 다른 값을 반환하면 거부됩니다. 이 문제를 해결하는 방법은 일반적으로 암시적 반환을 사용하지 않도록 하는 것입니다. 예를 들어:

```js
- <div ref={current => (instance = current)} />
+ <div ref={current => {instance = current} />
```

원본 코드는 HTMLDivElement의 인스턴스를 반환했으며 TypeScript는 이것이 정리 함수인지 아니면 정리 함수를 반환하고 싶지 않은 것인지를 알 수 없습니다.

# useDeferredValue 초기 값

<div class="content-ad"></div>

React는 useDeferredValue에 initialValue 옵션을 추가했습니다:

```js
function Search({deferredValue}) {
  // 초기 렌더링 시 값은 ''입니다.
  // 그런 다음 다시 렌더링이 예약되고 deferredValue로 업데이트됩니다.
  const value = useDeferredValue(deferredValue, '');
  
  return (
    <Results query={value} />
  );
}
```

initialValue가 제공되면 useDeferredValue는 해당 값을 컴포넌트의 초기 렌더링에 반환하고, deferredValue를 사용하여 백그라운드에서 다시 렌더링을 예약합니다.

# 문서 메타데이터 지원

<div class="content-ad"></div>

HTML에서는 `title`, `link`, `meta`와 같은 문서 메타데이터 태그를 문서의 `head` 섹션에 배치하기 위해 예약되어 있어요. React에서는 앱에 적합한 메타데이터를 결정하는 컴포넌트가 `head`를 렌더링하는 곳과 매우 먼 곳에 있을 수 있거나 React가 `head`를 전혀 렌더링하지 않을 수도 있어요. 과거에는 이러한 요소들을 수동으로 삽입해야 했거나 react-helmet과 같은 라이브러리를 사용하여 효과적으로 처리해야 했던 것을 기억하시죠.

React 19는 컴포넌트에서 문서 메타데이터 태그를 네이티브로 렌더링하는 지원을 제공해요:

```js
function BlogPost({post}) {
  return (
    <article>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <meta name="author" content="Josh" />
      <link rel="author" href="https://twitter.com/joshcstory/" />
      <meta name="keywords" content={post.keywords} />
      <p>
        Eee equals em-see-squared...
      </p>
    </article>
  );
}
```

React가 이 컴포넌트를 렌더링할 때 `title`, `link`, `meta` 태그를 찾아서 자동으로 문서의 `head` 섹션으로 끌어올려 줘요. 이러한 메타데이터 태그를 네이티브로 지원함으로써 클라이언트 전용 앱, 스트리밍 SSR 및 서버 컴포넌트와 함께 작동하도록 보장할 수 있어요.

<div class="content-ad"></div>

React 19 업데이트 내용에 대한 의견이 궁금하신가요? React 19의 개선된 기능에 대한 자세한 내용은 React 공식 블로그의 원문을 참조해주세요.

# 간단하게 설명하기 🚀

In Plain English 커뮤니티의 일원이 되어주셔서 감사합니다! 떠나시기 전에:

- 작성자를 클랩하고 팔로우해주세요 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요