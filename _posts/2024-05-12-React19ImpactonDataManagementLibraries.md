---
title: "React 19 데이터 관리 라이브러리에 미치는 영향"
description: ""
coverImage: "/assets/img/2024-05-12-React19ImpactonDataManagementLibraries_0.png"
date: 2024-05-12 22:57
ogImage: 
  url: /assets/img/2024-05-12-React19ImpactonDataManagementLibraries_0.png
tag: Tech
originalTitle: "React 19 Impact on Data Management Libraries"
link: "https://medium.com/@sara-vanan/react-19-impact-on-data-management-libraries-90a0e01c11aa"
---


![이미지](/assets/img/2024-05-12-React19ImpactonDataManagementLibraries_0.png)

React 19에서는 데이터 처리 방식에 주로 초점을 맞춘 많은 새로운 기능이 도입되었습니다. 네, 이제 React는 효율적인 데이터 가져오기 및 데이터 변경을 처리하기 위한 많은 훅을 제공합니다. 여기에 모두 빠르게 나열해 보겠습니다.

새로운 훅:
- 많은 향상된 점:

액션 소개:



React에서의 액션은 사용자가 UI와 상호작용한 후 수행하려는 모든 것을 의미합니다.
예: 버튼을 클릭하는 것이 액션입니다. 양식을 제출하는 것도 액션입니다. 그리고 계속 나열됩니다.

이전에는 useEffect, useState, useMemo과 같은 여러 후크를 결합하여 작업을 수행했습니다.

하지만 이제 React에서 직관적인 API를 도입하여 더 이상 보일러플레이트 코드를 해결하기 위해 사용할 필요가 없습니다.

간단한 예로 사용자 세부정보 저장을 살펴봅시다:



```js
function UpdateUser() {
    const [status, setStatus] = useState("idle");
    const saveUser = (userData) => {
        setStatus("saving");
        service.saveUser(userData)
        .then(() => {
            setStatus("idle");
            redirect("/userdetail");
        }).catch(() => {
            setStatus("error");
        })
    }

   return (
        <>
            {status == "saving" ? "저장 중...." : ""}
            <button onClick={() => saveUser()}>사용자 저장</button>
        </>
   )
}
```

With action:

```js
function UpdateUser() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState();
    const saveUser = (userData) => {
        startTransition(async () => {
            await service.saveUser(userData)
                .then(() => {
                   redirect("/userdetail");
                })
                .catch(err => {
                    setError(err);
                });
        });
    }

   return (
        <>
            {isPending ? "저장 중...." : ""}
            <button onClick={() => saveUser()}>사용자 저장</button>
        </>
   )
}
```



동작을 래핑함으로써 React는 두 가지 훅을 도입했습니다: useActionState, useOptimistic.

useActionState 훅:

이 훅은 데이터 변경 상태를 처리하는 데 사용됩니다. 예를 들어, 서버로 데이터를 보내는 경우 등에 활용됩니다. 예를 들어, 프로필 정보를 업데이트하는 간단한 예시가 여기 있습니다.

```js
import { useActionState } from 'react';

export function MemberForm() {
  const [error, submitAction, isPending] = useActionState(
    async (previewState, formData) => {
      const error = await updateUser(formData).catch(
          (err) => 'Error ' + previewState
      );
      if(!error) {
        redirect("/memberdetail");
        return null;
      }
      return error;
    }
  );

  return (
    <form id="memberForm" name="memberForm" action={submitAction}>
      {isPending && <p>업데이트 중...</p>}
      <fieldset>
        <label htmlFor="firstName">이름</label>
        <input id="firstName" name="FirstName" type="text" />
      </fieldset>
      <fieldset>
        <label htmlFor="lastName">성</label>
        <input id="lastName" name="LastName" type="text" />
      </fieldset>
      <!-- 구현 아래에 -->
      <PhoneNumber />
      <button type="submit">저장</button>
      {error && <p>{error} </p>}
    </form>
  );
}
```



useActionState()에 제공된 action 함수는 수행된 작업에 대해 null 또는 오류를 반환해야하고, 폼은 자동으로 재설정됩니다. previewState는 우리가 action에서 반환한 것과 같아집니다.

useFormStatus 훅:

이 훅을 사용하면 폼 컴포넌트 내에서 폼 제출 상태를 알 수 있습니다.

```js
function PhoneNumber() {
  const { pending } = useFormStatus();
  return (
     <fieldset disabled={pending}>
       <label htmlFor="Phone">전화번호</label>
       <input id="Phone" name="Phone" type="number" />
     </fieldset>
  )
}
```



`useOptimistic()` 훅:

이 훅은 서버로부터 응답을 기다리는 동안 UI에 낙관적인 업데이트를 수행하는 데 사용됩니다. 예: 좋아요 버튼을 클릭할 때, 우리는 서버가 성공 상태로 응답할 때까지 좋아요 반응을 표시하기를 기다리고 싶지 않습니다. 우리는 즉시 반응을 보여줄 수 있고, 서버에서 응답이 왔을 때, 그것을 로컬 상태에 동기화할 것입니다. 이것이 낙관적인 업데이트라고 불리는 것입니다.

이를 위해 이전에는 API의 상태를 추적하고, API가 실패한 경우 이전 값으로 수동으로 전환해야 했습니다. 이 훅을 사용하면 코드가 더 간단해집니다. 여기 좋아요 버튼의 간단한 예시가 있습니다.

```js
import React from 'react';

function LikeButton({ count, onClick }) {
  // 좋아요 카운트에 대한 낙관적 상태 생성.
  const [optimisticCount, setOptimisticCount] = React.useOptimistic(
    count,
    (state, newValue) => {
      // 여기서 우리는 즉시 상태를 계산합니다.
      // 이 상태 함수의 반환 값은 즉시 optimisticCount에 설정될 것입니다.
      console.log('낙관적 콜백 호출', state, newValue);
      return newValue;
    }
  );

  // 좋아요 상태 업데이트를 위한 전환 생성
  // setOptimisticCount 메서드는 Action 내에서만 호출할 수 있기 때문에
  // Action은 startTransition() 메서드 내부의 간단한 비동기 함수입니다.
  const [isPending, startTransition] = React.useTransition();

  const updateCount = () => {
    startTransition(async () => {
      // 즉시 카운트 증가
      setOptimisticCount(optimisticCount + 1);
      // 값이 부모 구성 요소에 저장될 때까지 대기
      await onClick(optimisticCount).catch((err) => console.log(err));
      // 반환될 때까지 이 전환은 보류 상태에 있을 것입니다.
      return null;
    });
  };

  return (
    <p>
      <span>
        {optimisticCount} {count !== optimisticCount ? '업데이트 중...' : ''}
      </span>
      <button onClick={updateCount}>좋아요</button>
    </p>
  );
}

export function ReactionComponent() {
  const [count, setCount] = React.useState(0);
  const onClick = () => {
    return new Promise((resolve, reject) => {
      // 지연을 모방
      setTimeout(() => {
        setCount(count + 1);
        reject();
      }, 2000);
    });
  };
  return <LikeButton count={count} onClick={onClick} />;
}
```



API를 사용하실 건가요?

컴포넌트 내에서 리소스를 소비하는 데 사용됩니다. 이 리소스는 다음과 같을 수 있어요:

- React Context: 여기에는 사용자 세션을 유지하기 위한 간단한 유틸리티 컴포넌트와 훅이 있습니다.

```js
 import React from 'react';

 const UserContext = React.createContext();

 export function UserSession({ children }) {
   const user = React.useMemo(() => ({ id: '001', name: 'user' }), []);
   return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
 }

 export function useUser() {
   return React.use(UserContext);
 }
```



2. Promises: 이 기능을 사용하면 구성 요소 내에서 데이터를 직접로드 할 수 있습니다. 추가적인 보일러플레이트 코드가 필요하지 않습니다. 이 기능을 사용하기 전에 어떻게 했었는지 간단한 예시를 살펴보겠습니다.

이전:

```js
 //Before
 function UserDetailComponent({ userId }) {
     const [user, setUser] = useState(null);
     useEffect(() => {
         fetchUser(userId)
             .then(setUser);
     }, [userId]);
 }
```

이후: 약속을 구성 요소에 직접 전달하고 사용할 수 있습니다. 'use'를 사용하여 소비합니다.



```js
// 이후
function UserDetailComponent({ userPromise }) {
    const user = use(userPromise);
}

function UserProfileComponent({ userId }) {
    // 이는 매 렌더링마다 새 promise를 만들지 않았는지 확인하기 위한 것입니다.
    // 일반적으로 데이터를 가져오는 라이브러리를 사용하여
    // 리렌더링 간에 동일한 promise를 반환합니다.
    const userPromise = useMemo(() => {
        return fetchUser(userId);
    }, [userId]);

    return (
        <React.Suspense fallback={"로딩 중..."}>
            <UserDetailComponent userPromise={userPromise} />
        </React.Suspense>
    );
}
```

개선 사항:

- 컴포넌트 속성으로 ref 사용:

이후에는 새 인자로 선언하는 대신 컴포넌트 속성에서 ref를 가져올 수 있습니다.




```js
// 이전
export React.forwardRef(function UserDetails(props, ref) => {
});

// 이후
export function UserDetails({ user, ref }) {
   useImperativeHandle(ref, function () {
    return {};
   });
}

//...
<UserDetails ref={ref}/>
```

2. ref 콜백이 정리 함수를 반환합니다:

이 향상으로 불필요한 보일러플레이트 코드를 제거할 수 있습니다

```js
// 이전
function ProfileDetail() {
    const ref = React.createRef();

    useEffect(() => {
     const listener = () => {};
     ref.current.addEventListener("keydown", listener);
     return () => ref.current.removeEventListener("keydown");
    }, []);

    return (
        <input ref={ref}/>
    )
}

// 이후
function ProfileDetail() {
    function inputRef(ref) {
       const listener = () => {};
       ref.current.addEventListener("keydown", listener);
       return () => ref.current.removeEventListener("keydown");
    }

    return (
        <input ref={inputRef}/>
    )
}
```



3. 컴포넌트에서의 메타 태그 지원:

이제 클라이언트 컴포넌트 내에서 사용자가 있는 위치에 따라 문서 제목을 변경할 수 있습니다.

```js
<Router>
    <Route path="/dashboard" element={Dashboard} />
    <Route path="/profile" element={Profile} />
</Router>

function Dashboard() {
    return (
        <title>판매 대시보드</title>
    )
}

function Profile() {
    return (
        <title>존의 프로필</title>
    )
}
```

# 정말 신경 써야 할까요:



새로운 기능들과 개선사항을 고려할 때, React Query, SWR과 같은 데이터 관리 라이브러리를 사용하는 사용자라면 React에서 기본적으로 제공하는 이러한 새로운 데이터 관리 옵션에 대해 신경써야 할까요?

내 의견으로는, 이것들은 모두 낮은 수준의 훅들로, 라이브러리 작성자가 코드베이스 내에서 보일러플레이트 코드를 제거하는 데 사용할 수 있습니다. 이미 상기한 데이터 관리 라이브러리를 통해 컴포넌트 수준에서 데이터를 가져오고, 로컬 캐싱과 유효한 무효화와 같은 기능을 활용하고 있기 때문에요.

ref, use(Context), 메타 태그와 같은 개선 사항을 활용하여 보일러플레이트 코드를 제거하고 코드베이스를 더 깔끔하게 만들 수 있습니다.

데이터 관리를 위해 네이티브 폼 요소로 전환하는 주요 목적은 점진적인 향상을 선택하는 것입니다. 이 관점에서 코드베이스를 점진적으로 변경하여 앱이 최소한의 JavaScript로 작동하도록 할 수 있습니다.



여기 샘플 놀이터가 있습니다.

원본 게시물: 2024년 5월 9일, https://yab.hashnode.dev에서 게시됨.