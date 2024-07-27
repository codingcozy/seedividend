---
title: "리액트 컴파일러가 거의 다 왔어요 정말 기대돼요"
description: ""
coverImage: "/assets/img/2024-06-20-ReactCompilerisalmosthereanditisExciting_0.png"
date: 2024-06-20 01:32
ogImage: 
  url: /assets/img/2024-06-20-ReactCompilerisalmosthereanditisExciting_0.png
tag: Tech
originalTitle: "React Compiler is almost here and it is Exciting!"
link: "https://medium.com/design-bootcamp/react-compiler-is-almost-here-and-it-is-exciting-758ec51d45af"
---


Meet Jay, he is a budding Frontend Engineer and has been working with React for a few months. Recently, he raised a Pull Request where he is fetching a list of todos and displaying it on the UI —

![image](/assets/img/2024-06-20-ReactCompilerisalmosthereanditisExciting_0.png)

But Wait… His PR does not get approved!

![image](/assets/img/2024-06-20-ReactCompilerisalmosthereanditisExciting_1.png)

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-ReactCompilerisalmosthereanditisExciting_2.png" />

만나요! Ray는 프론트엔드 리드입니다. 그는 그의 경험을 바탕으로 Jay가 할 일 목록을 조작하고 있고 이 목록이 매우 커질 수 있다는 것을 알아챘어요 (10,000개 이상). 그래서 그는 Jay에게 React에서 제공하는 훅을 사용하여 함수를 메모이즈하는 것을 권유했어요. 그렇게 하면 의존성(dependencies)이 변경될 때에만 함수가 호출되도록 할 수 있어요. 우리가 이야기하고 있는 훅은 useMemo()입니다.

<img src="/assets/img/2024-06-20-ReactCompilerisalmosthereanditisExciting_3.png" />

Jay는 Ray의 조언을 따라 했지만, 여기서 몇 가지 더 코멘트가 있어요. 어떤 경우에는 여러 개의 콜백이 자식 컴포넌트로 전달되고 있어요. Ray는 Jay에게 useCallback()을 사용하여 이러한 함수들의 참조(reference)를 보존하여 각 리렌더링마다 자식 컴포넌트를 메모이즈하고 그들의 리렌더링을 멈출 수 있도록 하는 것을 요청했어요.

<div class="content-ad"></div>

작업의 반은 끝났어요! 이제 비싼 자식 구성 요소들을 memo() 훅으로 감싸서 다시 렌더링을 막아야 해요.

마음을 바꿔보면, 팀은 이 문제가 손에 잡히질 않아서 지금까지 위 훅들을 사용하여 오버엔지니어링을 한 부분이 많은 것 같아요. 실제로 성능 문제가 크게 발생한 것은 아니었는데, 누군가가 이런 베스트 프랙티스를 읽고, 성능을 분석하지 않고 사용해버린 결과이죠.

어쨌든, 이런 대화와 React 앱을 더 최적화하기 위해 이러한 매개변수들을 추가하는 머릿 속 부담감은 피곤하고 React의 본래 이념과는 거리가 있는데요 -

UI는 상태의 함수입니다... 확실히 이게 더 세밀하고 복잡한 문제이고, 우리는 방금 목격한 것처럼 말이죠.

<div class="content-ad"></div>

하지만 여기에는 🚀 즉, REACT 컴파일러가 등장합니다

# 2막 — REACT 컴파일러 소개

React 컴파일러는 React가 개발자 경험을 향상시키기 위해 가져오는 미래 기술입니다. 이름보다는 다소 온화해 보일 수 있지만, 이것은 게임 체인저입니다.

컴파일러 뒤에 숨은 아이디어는 대부분의 메모이제이션 논리를 React에게 위임하고 과도하게 복잡한 useMemo 및 useCallback 훅을 줄여서 코드베이스를 가독성 있게 만드는 것입니다. 이러한 훅들의 종속성은 많은 사람들에게 고통의 요점이기도 합니다.

<div class="content-ad"></div>

리액트에서 이와 같은 지원을 받기 위한 작업은 상당한 시간동안 진행되어 왔습니다. 2021년 Xuan의 이번 토크를 확인해보세요 —

다음은 간단한 카운터 예제인 다음 코드 조각을 고려해 봅시다 —

```js
export default function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);

  return (
    <>
      <div className="flex gap-1 justify-center items-center">
        <button
          onClick={() => {
            setCount(count + 1);
          }
        >
          +
        </button>
      </div>

      <span>
        {count}
      </span>
    </>
  );
}
```

리액트 컴파일러에 의해 컴파일된 이 코드를 사용하여 상황을 확인할 수도 있습니다 —

<div class="content-ad"></div>

```js
function Counter(t0) {
  const $ = _c(2);

  const { initialCount } = t0;
  const [count, setCount] = useState(initialCount);
  let t1;

  if ($[0] !== count) {
    t1 = (
      <>
        <div className="flex gap-1 justify-center items-center">
          <button
            onClick={() => {
              setCount(count + 1);
            }
          >
            +
          </button>
        </div>
        <span>{count}</span>
      </>
    );
    $[0] = count;
    $[1] = t1;
  } else {
    t1 = $[1];
  }

  return t1;
}
```

여기서 $는 props, state 및 다른 반응적인 정보의 데이터를 보관하는 변수이며, 잠재적인 다시 렌더링에서 비교하고 부모 구성 요소 또는 상태 변경이 있을 때, 그 정보가 변경된 것이 없다면... 바로! 컴포넌트 다시 렌더링이 저장됩니다!

_c는 여기에서 실제 리액트 컴파일러 훅이며 useMemoCache()라고도 불리며 우리가 보았던 바와 같이 useMemo() 네이티브 훅과는 다르게 작동합니다.

그래서 간단히 말해서, Dan Abramov의 말로 하면, 리액트 컴파일러는 본질적으로 이것입니다 —


<div class="content-ad"></div>

```js
let jsx;

if(prevCount != count){
  jsx = ...
} else {
  jsx = prevJsx;
}
```

아래는 이것이 큰 개선될 상황 몇 가지 예시입니다 —

- 우리는 DOM 노드의 tree, 즉 React Fiber 또는 Virtual DOM을 알고 있습니다. 부모 컴포넌트가 렌더링될 때 전체 서브트리/자식 컴포넌트가 다시 렌더링 됩니다. React 컴파일러는 변경 사항이 없는 경우 그것을 회피해주고, 의존할 props가 없더라도 도움을 줄 것입니다.
- useMemo() 훅의 경우 대부분의 경우에는 필요하지 않을 것이며, React 컴파일러가 적절하게 캐싱을 할 수 없는 경우에만 필요할 것입니다. 이 경우 오리지널 컴파일러 구현체로 되돌아갈 것입니다. 이를 잘못 사용했을 때 useMemo() 훅의 예시가 될 수 있습니다.

# 제 ACT III: 지나치게 복잡한 최적화가 끝나는 시작


<div class="content-ad"></div>

드디어 React에도 다른 대부분의 라이브러리에서 사용하던 컴파일러가 도입되고 있습니다. 이로 인해 날이 갈수록 React 코드를 작성할 때 "만약 이 부분이 변경된다면?", "이 함수가 성능에 해를 끼칠까?"라는 걱정을 덜어내고 코드를 작성할 수 있게 되었습니다.

React 팀에게 👏 이를 위해 수년간 반복적이고 꾸준한 노력을 기욯 합니다. 재미있는 사실: 컴파일러를 도입하고자 한 목표가 후크(hook)와 서버 컴포넌트(Server components)를 탄생시켰습니다.

컴포넌트를 이주할 준비가 되어 있는지 확인하려면 추천사항은 아니지만 React 팀의 React 컴파일러 소개 페이지(https://react.dev/learn/react-compiler#existing-projects)를 참조할 수 있습니다. 더 깊이 살펴볼 수 있는 유용한 리소스 몇 가지를 소개해 드리겠습니다 -
- https://www.youtube.com/watch?v=PYHBHK37xlE
- https://jherr2020.medium.com/react-compiler-with-react-18-1e39f60ae71a
- https://www.youtube.com/watch?v=wnXGSwrOw80
- https://www.youtube.com/watch?v=0ckOUBiuxVY&t=9311s [React 컴파일러 부분을 확인할 수 있습니다]