---
title: "React에서 네비게이션 이벤트를 모의하고 테스트하는 방법 Vitest"
description: ""
coverImage: "/assets/img/2024-05-14-AwaytomockandtestnavigationeventsinReactbyVitest_0.png"
date: 2024-05-14 11:50
ogImage: 
  url: /assets/img/2024-05-14-AwaytomockandtestnavigationeventsinReactbyVitest_0.png
tag: Tech
originalTitle: "A way to mock and test navigation events in React by Vitest"
link: "https://medium.com/@1992season/a-way-to-mock-and-test-navigation-events-in-react-by-vitest-c59f9c8ccc0b"
---


리액트 페이지 탐색 이벤트를 테스트하고 싶어서 노력 중이었는데, 가져온 모듈 함수를 MOCK 하는 것이 필요해 전혀 익숙하지 않았어요. 

마침내 어떻게 해결했는지 공유하고 싶어요. 물론, 이 예제는 정교하거나 높은 자격 요건을 갖춘 것은 아니라서 여러분의 생각과 추천 대안을 공유해주시면 정말 감사하겠어요. 이 글이 몇몇 독자들에게 도움이 되었으면 좋겠어요.

** 이 문서는 테스트 환경 설정에 대한 내용을 다루지 않고 직접 내용으로 들어갑니다.

## 무엇을 테스트할 것인가



리액트 애플리케이션이 두 가지 접근 가능한 경로, /와 /todos를 가지고 있습니다. StartPage.test.tsx 파일은 홈 경로에 대한 유닛 테스트 파일이며, "todos" 텍스트를 가진 버튼이 클릭되었을 때 애플리케이션이 사용자를 /todos 페이지로 이동시키는지 테스트하고 싶습니다.

## 문제 발생

하지만 테스트 라이브러리 관점에서 이야기를 해보겠습니다. "사용자를 다른 페이지로 이동시킨다"는 것의 의미는 무엇인가요?

```js
import useNavigation from "@hooks/useNavigation";

export default function StartPage() {
  const { push } = useNavigation();
  return (
    <div>
      <h1>start</h1>
      <button
        onClick={() => {
          push("/todos");
        }
      >
        todos
      </button>
    </div>
  );
}
```



사용자가 "todos" 버튼을 클릭하면, onclick 핸들러가 실행되고, 그런 다음 push 함수가 실행됩니다. push 함수는 useNavigation 훅 호출에서 반환된 함수 중 하나입니다. 문제는 테스트 코드가 push 또는 useNavigation이 어떻게 구성되어 있는지를 모르기 때문에, 테스트 함수에 이 함수들이 어떻게 되어야 하는지 알려주어야 합니다. 이 과정을 함수 모의(mocking functions)라고 합니다.

## `MemoryRouter` 내부의 단위

테스트 함수를 작성하기 전에, 테스트된 컴포넌트가 react-router-dom의 Router 내에 있어야 한다는 점을 명확히해야 합니다. 그렇지 않으면 여러 경로가 없을 수 있고, 컴포넌트 함수에서 useNavigation 훅을 사용할 수 없습니다. 이 문제는 단위 컴포넌트를 react-router-dom의 `MemoryRouter` 컴포넌트로 감싸면 쉽게 처리할 수 있습니다. Router에 initialEntries prop을 제공하여 애플리케이션의 위치를 지정할 수 있습니다.

```js
// ...

beforeEach(() => {
   render(<StartPage />, {
    wrapper: ({children}) => (
      <MemoryRouter initialEntries={["/"]}>
        {children}
      </MemoryRouter>
    ),
  });
});

// ...
```



## 목 역할 하는 방법

테스트 작업 환경인 jest와 비슷한 기능을 가진 vitest는 jest testing 환경의 vi 속성을 제공하여 변수와 함수를 mock할 수 있습니다. vi.fn 메소드는 "함수를 스파이로 생성"하고, vi.mock 메소드는 첫 번째 인수로 지정된 경로에서 import된 모든 모듈을 대체합니다.

```js
import { vi } from "vitest";

const mockPush = vi.fn();

vi.mock("@hooks/useNavigation", () => {
  return {
    // useNavigation
    default: () => ({
      push: mockPush,
    }),
  };
});
```

위의 예시에서 vi.mock은 "@hooks/useNavigation" 경로에서 import된 모듈의 형태를 정의합니다. 이 모듈은 "push"라는 함수를 반환하는 기본 내보내기를 가지고 있습니다. 이제 모듈의 구조가 알려졌으며, 테스트 함수 내에서 스파이 변수인 mockPush를 사용하여 push 메소드에 접근할 수 있습니다. 이 모킹된 함수가 호출될 때 어떤 인수와 함께 호출되었는지 mockPush.mock.calls 또는 mockPush.mock.lastCall을 사용하여 확인할 수 있습니다. 이는 인수 목록을 제공합니다.



```js
test("버튼 클릭 시 /todos 페이지로 이동해야 함", async () => {
  const button = (await screen.findAllByText("todos"))[0];
  expect(button).toBeDefined();
  await userEvent.click(button);

  console.log("호출", mockPush.mock.calls);
  // calls [ [ '/todos' ] ]
  console.log("마지막 호출", mockPush.mock.lastCall);
  // last call [ '/todos' ]
});
```

여기서 만약 lastCall의 첫 번째 항목이 "/todos"이면, "todos" 버튼 클릭 이벤트의 예상 결과로써 push 메소드가 "/todos" 인자와 함께 호출된 것이라고 말할 수 있습니다.

```js
test("버튼 클릭 시 /todos 페이지로 이동해야 함", async () => {
  const button = (await screen.findAllByText("todos"))[0];
  expect(button).toBeDefined();
  await userEvent.click(button);

  expect(mockPush.mock.lastCall[0]).toEqual("/todos");
});
```

마지막으로, 각 테스트 후에 mock 기록을 제거하기 위해 vi.clearAllMocks 메소드를 호출하는 것이 좋습니다.



```js
const mockPush = vi.fn();

vi.mock("@hooks/useNavigation", () => {
  return {
    // useNavigation
    default: () => ({
      push: mockPush,
    }),
  };
});

describe("start page test", () => {
  beforeEach(() => {
    render(<StartPage />, {
      wrapper: ({children}) => (
        <MemoryRouter initialEntries={["/"]}>
          {children}
        </MemoryRouter>
      ),
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should navigate to /todos page on button click", async () => {
    const button = (await screen.findAllByText("todos"))[0];
    expect(button).toBeDefined();
    await userEvent.click(button);

    expect(mockPush.mock.lastCall[0]).toEqual("/todos");
  });
});
```