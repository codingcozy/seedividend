---
title: "리액트에서 useMemo 사용하기 - 코드 예제와 함께 1부 2부"
description: ""
coverImage: "/assets/img/2024-05-12-HowtoWorkwithuseMemoinReactwithCodeExamples12_0.png"
date: 2024-05-12 20:15
ogImage: 
  url: /assets/img/2024-05-12-HowtoWorkwithuseMemoinReactwithCodeExamples12_0.png
tag: Tech
originalTitle: "How to Work with useMemo in React — with Code Examples (1 2)"
link: "https://medium.com/@ed.wacc1995/how-to-work-with-usememo-in-react-with-code-examples-1-2-2c67ef33e369"
---


<img src="/assets/img/2024-05-12-HowtoWorkwithuseMemoinReactwithCodeExamples12_0.png" />

React에서 useMemo는 계산에 대한 메모지와 같은 역할을 합니다. 그것은 답을 기억하기 때문에 매번 다시 계산할 필요가 없습니다.

# 계산 시간을 단축하기

useMemo를 처음에 사용하여 결과를 저장하고 매번 컴포넌트가 업데이트될 때마다 다시 계산하는 것을 피하세요.



```js
import { useMemo } from 'react';

function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```

컴포넌트가 다시 렌더링될 때마다 비싼 계산을 방지하려면 useMemo를 사용할 수 있어요. 이는 컴포넌트에 계산에 대한 단기 기억을 제공하는 것 같아요. 작동 방식은 다음과 같아요:

- 두 가지 요소: useMemo에는 두 가지 요소가 필요해요:

- 계산: 메모이즈하려는 계산을 수행하는 함수. 이 함수는 어떤 인수도 받지 않아야 해요 (() =` ...).
- 감시 목록(의존성): useMemo가 계산 내부에서 사용하는 값들을 계속 지켜보아야 하는 목록. 이 값 중 하나라도 변경되면 계산을 다시 해야 해요.



- 초기 렌더링: 컴포넌트가 처음 렌더링될 때 useMemo는 계산을 실행하고 결과를 저장합니다.
- 이후 렌더링: 나중에 업데이트될 때 useMemo는 현재 종속성을 이전 렌더링에서 사용된 값과 비교합니다. 감지된 값 중 하나도 변경되지 않은 경우 (깊은 동등성을 위해 Object.is로 비교), useMemo는 이전에 계산된 결과를 단순히 반환하여 시간을 절약합니다.
- 계산 재실행 트리거: 종속성 중 하나라도 변경된 경우, useMemo는 계산이 업데이트되어야 함을 이해합니다. 함수를 다시 실행하고 새로운 결과를 반환합니다.

요약하면 useMemo는 계산 결과를 캐시처럼 저장하여 종속된 데이터가 변경될 때까지 유지합니다.

실제 유용한 예제를 살펴보겠습니다.

## 느린 계산 시뮬레이션과 useMemo의 힘



useMemo의 가치를 보여주기 위해, 이 예시에서는 filterTodos 함수에 의도적으로 지연을 추가했습니다. 이는 계산이 계산적으로 비싸다고 할 수 있는 실제 시나리오를 모방합니다.

테스트해보세요!

탭 간을 전환하고 테마를 토글해보세요. 특히 테마를 토글할 때 느린 반응을 느낄 수 있을 겁니다.

왜 느려질까요?



이 버전에서는 useMemo를 사용하지 않았어요. 그 결과로, sluggish한 filterTodos 함수가 모든 리렌더링마다 호출되는데, 테마에 변경이 있는 경우에도 호출됩니다 (필터링 로직에는 영향을 주지 않는 경우). 이 불필요한 다시 계산이 지연을 유발해요.

App.js

```js
import { useState } from 'react';
import { createTodos } from './utils.js';
import TodoList from './TodoList.js';

const todos = createTodos();

export default function App() {
  const [tab, setTab] = useState('all');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setTab('all')}>
        All
      </button>
      <button onClick={() => setTab('active')}>
        Active
      </button>
      <button onClick={() => setTab('completed')}>
        Completed
      </button>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <TodoList
        todos={todos}
        tab={tab}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

TodoList.js



```js
import { filterTodos } from './utils.js';

export default function TodoList({ todos, theme, tab }) {
  const visibleTodos = filterTodos(todos, tab);
  return (
    <div className={theme}>
      <ul>
        <p><b>참고: <code>filterTodos</code>가 인위적으로 느려집니다!</b></p>
          {visibleTodos.map(todo => (
            <li key={todo.id}>
              {todo.completed ?
                <s>{todo.text}</s> :
                todo.text
              }
            </li>
          ))}
      </ul>
    </div>
  );
}
``` 

utils.js

```js
export function createTodos() {
  const todos = [];
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: "할 일 " + (i + 1),
      completed: Math.random() > 0.5
    });
  }
  return todos;
}

export function filterTodos(todos, tab) {
  console.log('[인위적으로 느려짐] "' + tab + '" 탭을 위해 ' + todos.length + '개의 할 일을 필터링합니다.');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // 극도로 느린 코드를 흉내 내기 위해 500ms 동안 아무것도 하지 않습니다.
  }

  return todos.filter(todo => {
    if (tab === 'all') {
      return true;
    } else if (tab === 'active') {
      return !todo.completed;
    } else if (tab === 'completed') {
      return todo.completed;
    }
  });
}
```

모든 것에 끈적이지 않는 쪽지가 필요한 것은 아닙니다 (useMemo)




대부분의 경우, 메모이제이션 없이도 코드는 완벽하게 작동합니다. 응용 프로그램이 반응적이고 상호 작용이 원활하다면, 일단 useMemo를 사용할 필요가 없을 수도 있습니다.

성능 테스트

utils.js에 더 많은 할 일 항목을 추가해보고 동작을 관찰해보세요. 이 예제에서 필터링 자체는 그다지 느리지 않았습니다. 그러나 대량의 할 일이 있는 경우 대부분의 성능 병목 현상이 필터링에서 다시 렌더링 프로세스로 옮겨질 수 있습니다.

# 스마트 업데이트: 필요할 때만 다시 렌더링하기



일부 상황에서 useMemo는 구성 요소 내에서의 계산 뿐만 아니라 하위 구성 요소의 다시 렌더링을 최적화하는 데 도움이 될 수도 있습니다.

예를 살펴봅시다

우리의 TodoList 구성 요소가 필터링된 visibleTodos를 자식 List 구성 요소로 전달할 때를 상상해보세요. 이 내용은 다음 섹션에서 useMemo가 이 시나리오에서 어떻게 사용될 수 있는지 탐구하는 데 기초를 제공합니다.

```js
export default function TodoList({ todos, tab, theme }) {
  // ...
  return (
    <div className={theme}>
      <List items={visibleTodos} />
    </div>
  );
}
```



리액트는 일반적으로 부모 컴포넌트가 다시 렌더링될 때 자식 컴포넌트 전체를 다시 렌더링합니다. 이것이 TodoList에서 theme이 변경되어도 List 컴포넌트가 다시 렌더링되는 이유입니다 (visibleTodos prop에 영향을 주지 않는 한).

그러나 자식 컴포넌트에서 느린 다시 렌더링 프로세스를 식별했다면, 성능을 개선할 수 있는 memo라는 기술을 활용할 수 있습니다. List 컴포넌트를 memo로 감싸면, List가 이전 렌더링과 비교해 실제로 변경된 props가 없다면 React에게 불필요한 다시 렌더링을 건너뛰도록 지시할 수 있습니다.

```js
import { memo } from 'react';

const List = memo(function List({ items }) {
  // ...
});
```

List 컴포넌트를 memo로 감싸면, List의 props가 실제로 변경될 때만 List를 다시 렌더링하도록 React에 지시하는 셈입니다. 이는 특히 다시 렌더링 비용이 높은 컴포넌트에 대해서는 성능을 크게 향상시킬 수 있습니다.



```js
export default function TodoList({ todos, tab, theme }) {
  // 테마가 변경될 때마다, 이는 다른 배열이 됩니다...
  const visibleTodos = filterTodos(todos, tab);
  return (
    <div className={theme}>
      {/* ... 따라서 List의 props는 항상 동일하지 않으며 매번 재랜더링됩니다 */}
      <List items={visibleTodos} />
    </div>
  );
}
```

이전 예시에서 filterTodos 함수는 배열의 내용이 동일해도 항상 새 배열 객체를 반환합니다. 이 동작은 ''를 사용하여 객체 리터럴을 만들 때 항상 새로운 객체가 생성되는 방식과 유사합니다.

보통, 이는 큰 문제가 되지 않을 수 있습니다. 그러나 우리의 경우에는 List 컴포넌트를 최적화하기 위해 memo를 사용하는데, 렌더링 사이에 props를 비교하는 데 의존합니다. filterTodos가 내용이 동일하더라도 항상 새 배열을 생성한다면, memo는 항상 다른 props로 인식하여 List를 다시 렌더링합니다. 이는 최적화의 목적을 무효화시킵니다.

```js
export default function TodoList({ todos, tab, theme }) {
  // React에게 다시 렌더링 사이에 계산을 캐시하도록 알립니다...
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab] // ...따라서 이러한 종속성이 변경되지 않는 한...
  );
  return (
    <div className={theme}>
      {/* ...List는 동일한 props를 받고 렌더링을 건너뛸 수 있습니다 */}
      <List items={visibleTodos} />
    </div>
  );
}
```



visibleTodos 계산을 useMemo로 감싸면, 필터링에 사용된 데이터(할 일 항목)가 변경되지 않는 한, 다시 렌더링 사이에 동일한 배열 참조를 반환함을 보장합니다. 이는 memo가 효과적으로 프롭을 비교하고 List 컴포넌트의 불필요한 다시 렌더링을 건너뛸 수 있도록 합니다.

# 훅 체인에서 중복 계산 방지

컴포넌트 코드 내에서 직접 정의한 사용자 지정 객체에 계산이 의존하는 경우는 어떻게 될까요?

```js
function Dropdown({ allItems, text }) {
  const searchOptions = { matchMode: 'whole-word', text };

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]); // 🚩주의: 컴포넌트 내에서 생성된 객체에 의존성
  // ...
```



## 컴포넌트 내 객체의 도전

`useMemo`를 사용할 때 컴포넌트 코드 내에서 직접 생성된 객체와 관련된 잠재적인 함정이 있습니다. 해당 컴포넌트 내의 모든 코드가 다시 렌더링될 때마다 실행되므로, 매번 객체를 생성하는 것은 메모이제이션의 목적을 무효화시킵니다.

## 왜 동작하지 않는지

검색옵션이라는 객체에 의존하는 계산이 있다고 상상해보십시오. 이 객체를 컴포넌트 본문 안에서 직접 생성하고 `useMemo`의 의존성으로 추가한다면 문제가 발생합니다. React는 모든 코드를 다시 실행하기 때문에, 다시 렌더링될 때마다 검색옵션 객체를 재생성합니다. 심지어 그 내용이 동일하더라도 말이죠. 이는 `useMemo`가 항상 새로운 객체 참조를 보게 하고 실제 데이터가 변경되지 않았더라도 다시 계산을 시작하도록 유발합니다.



## 해결책: 사전에 객체를 메모이즈(Memoize)하세요

이 문제를 해결하기 위해, useMemo에 전달하기 전에 검색 옵션 객체 자체를 메모이즈하세요. 이렇게 하면 관련 데이터가 변경되지 않을 때 useMemo이 일관된 객체 참조를 받아들여 적절히 계산 결과를 캐시할 수 있습니다.

```js
function Dropdown({ allItems, text }) {
  const searchOptions = useMemo(() => {
    return { matchMode: 'whole-word', text };
  }, [text]); // ✅ 텍스트가 변경될 때만 변경됩니다

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]); // ✅ allItems 또는 searchOptions가 변경될 때만 변경됩니다
  // ...
```

## 더 간략한 방법



이전 예제에서는 useMemo에 전달하기 전에 searchOptions 객체를 기억하도록 언급했습니다. 그것은 동작하지만, 더 원할한 방법이 있습니다.

## 모든 것을 함께 유지

객체를 따로 기억하는 대신, 그것을 useMemo 계산 함수 내부에 직접 이동시키면 어떨까요? 이렇게 하면 객체의 생성이 사용하는 계산과 밀접하게 연관됨이 보장됩니다.

## 장점



`useMemo` 내에서 객체 정의를 배치함으로써, 계산이 실제로 실행될 때만 객체가 생성된다는 것을 보장합니다. 게다가, 객체의 로직에 대한 모든 변경 사항이 자동으로 계산에 반영되어 동기화를 유지합니다. 이는 코드를 닍고 일관성을 보장하여 모든 것을 간단하게 만들어 줍니다.

```js
function Dropdown({ allItems, text }) {
  const visibleItems = useMemo(() => {
    const searchOptions = { matchMode: 'whole-word', text };
    return searchItems(allItems, searchOptions);
  }, [allItems, text]); // ✅ allItems 또는 text가 변경될 때만 변경됩니다
  // ...
```

# 함수 캐싱

Form 컴포넌트가 React.memo()를 사용하여 성능 최적화되어 있다고 가정해봅시다. 이 컴포넌트에 함수를 속성(prop)으로 제공하고 싶습니다.



상상해봐요. 뭔가를 담을 상자('')가 있다고 생각해봐요. 새 상자를 사용할 때마다 새로운 빈 상자를 얻게 돼요. 마찬가지로 React에서 두 가지 방식으로 함수를 정의하면(함수() ''와 () =` ''), 매번 완전히 새로운 함수가 만들어져요. 이것 자체로는 나쁜 것이 아니에요. 하지만 Form 컴포넌트를 최적화하고 불필요한 업데이트를 방지하기 위해 React.memo()를 사용하는 경우, 계속 변하는 함수 prop은 해당 최적화를 무의미하게 만들 수 있어요.

함수를 다시 렌더링하지 않도록 useMemo를 사용하려면, useMemo 내부의 함수는 다른 함수를 반환해야 해요.

```js
export default function Page({ productId, referrer }) {
  const handleSubmit = useMemo(() => {
    return (orderDetails) => {
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails
      });
    };
  }, [productId, referrer]);

  return <Form onSubmit={handleSubmit} />;
}
```



그 솔루션은 약간 어색할 수 있을 것 같아요. 다행히 React에서는 이 상황을 고려하여 특별히 설계된 useCallback이라는 내장 후크를 제공해요. useMemo로 중첩 함수를 생성하는 대신 useCallback을 사용하여 함수를 간단히 래핑할 수 있어요. useCallback은 의존성을 추적하고 해당 의존성이 변경될 때에만 새로운 함수를 생성해요.

```js
export default function Page({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails
    });
  }, [productId, referrer]);

  return <Form onSubmit={handleSubmit} />;
}
```

우리가 보았던 두 가지 방법(useMemo와 중첩 함수, useCallback)은 같은 결과를 얻을 수 있어요. useCallback의 유일한 장점은, useMemo 내에서 추가적인 함수가 필요하지 않아져 코드를 보다 깔끔하게 유지할 수 있다는 점이에요. 이 외에는 다른 기능은 제공하지 않아요. useCallback에 대해 더 알고 싶다면, 추가 자료를 참고해보세요.

# 요약



- 최상위 또는 사용자 정의 후크: useMemo은 컴포넌트의 시작 부분에서만 호출하거나 직접 만든 사용자 정의 후크 안에서만 호출할 수 있습니다. 반복문이나 조건문 내에서는 작동하지 않습니다. 그 기능이 필요하다면 계산을 위한 별도의 컴포넌트를 만들어보세요.
- 개발 중 두 번 호출 확인 (Strict Mode): 활성화되면 React는 고의로 계산 함수를 두 번 호출하여 계산 그 자체에 잠재적 문제가 없는지(“불순물"라고 함) 확인합니다. 이는 오직 개발 목적으로만 사용되며 프로덕션에서는 발생하지 않습니다. 계산이 순수하다면(즉, 입력에만 의존하고 부작용이 없는 경우) 코드에 영향을 주지 않습니다. 추가된 결과는 그냥 무시됩니다.
- 스마트 캐싱: React는 필요할 때가 아니면 캐시된 값을 버리지 않습니다. 개발 시 컴포넌트 코드를 편집할 때에는 클리어될 수 있습니다. 개발 및 프로덕션 모두에서 초기 렌더링 중 컴포넌트가 보류될 때 캐시가 클리어될 수 있습니다. React는 효율을 위해 캐시를 클리어하는 미래 기능을 도입할 수도 있습니다(가상 리스트와 같은 경우). 성능 최적화를 위해 useMemo를 사용한다면 이것이 문제가 되지 않을 것입니다. 그러나 다시 렌더링 간에 캐시된 값을 의존하는 경우 다른 이유로 상태 변수나 ref를 대신 사용하는 것을 고려해보세요.

만약 이 글을 좋아하셨다면 박수나 댓글 부탁드립니다. 이를 통해 포스트의 퀄리티를 향상시킬 수 있고, 여러분에 대해 더 많이 알 수 있습니다. 많이 감사합니다!

아래에서 제 소셜 미디어 및 새로운 글을 구독할 수 있는 링크를 찾으실 수 있습니다. 팁은 언제나 환영합니다.

```js
type SocialMedia = {
  LinkedIn: string;
  GitHub: string;
  StackOverflow: string;
  Litsy: string;
  Email: string;
  X: string;
}

function newSocialMedia(): SocialMedia {
  return {
    LinkedIn: "https://www.linkedin.com/in/edwardcasanova/",
    GitHub: "https://github.com/ed3899",
    StackOverflow: "stackoverflow.com/users/11941146/edward-casanova",
    Litsy: "https://www.litsy.com/web/stack/edca3899/read",
    Email: "ed.wacc1995@gmail.com",
    X: "https://twitter.com/edca3911"
  };
}
const subscribe = (): string => {
  return "https://medium.com/@ed.wacc1995/subscribe";
};
const tip = (): string => {
  return "https://paypal.me/edca3899?country.x=MX&locale.x=es_XC";
};
```