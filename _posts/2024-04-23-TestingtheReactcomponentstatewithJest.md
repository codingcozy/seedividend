---
title: "Jest를 활용하여 React 컴포넌트 상태 테스트하는 가장 쉬운 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Testing the React component state with Jest"
link: "https://medium.com/developer-rants/testing-the-react-component-state-with-jest-b0a072f70f44"
isUpdated: true
---





테스트할 때 가장 중요한 규칙은 상태를 테스트하지 말아야 한다는 것이에요. 상태가 현재 상태 그대로라면 그만큼 좋은거죠.

이에는 많은 지혜가 있어요. 결국 무엇을 테스트해야할까요? useState()의 간단한 예제를 살펴보죠:

```js
const [thing, setThing] = useState();
setThing("something");
```

thing === 'something'인지 테스트하기 위해 추가적인 테스트가 필요할까요? 아니요, 왜냐하면 useState는 React의 핵심 구성 요소이며, 철저히 테스트되어야 하기 때문이에요.

<div class="content-ad"></div>

그러나 때때로 이와 같은 상황에 직면할 수 있습니다:

```js
const [value, setValue] = useState(0);
const method = (increment) => {
  let x = value + increment;
  if (x > 5) x = 0;
  setValue(x);
};
```

여전히 상태의 내용을 테스트해서는 안 되지만, value가 실제로 5보다 크면 0으로 회귀하는지 확인하고 싶을 수도 있습니다. 다시 말해, 올바른 값이 구성 요소 상태로 전달되는지 여부를 확인하고 싶을 수 있습니다.

이런 경우에는 상태를 시뮬레이션하거나 대체해야 합니다. 고행하는 코드 조각들이 많지만, 불행히도 많은 것들이 구식이 되어 더 이상 작동하지 않습니다. 여기에는 최소한 2022년 9월까지 동작하는 하나의 방법이 있습니다.

<div class="content-ad"></div>

먼저, 컴포넌트에 중요한 수정 사항이 있습니다. 현재 여러분은 아마도 다음과 같이 useState를 사용하고 있을 것입니다:

```js
import React, { useState } from "react";
...
const [value, setValue] = useState(0);
```

useState를 제거하고 React.useState()로 대신 참조해야 합니다:

```js
import React from "react";
...
const [value, setValue] = React.useState(0);
```

<div class="content-ad"></div>

왜 그래요? useState를 별도로 import 하면 컴포넌트의 private 메소드처럼 작용하고, React.useState는 import된 객체의 public 메소드처럼 작동합니다. 전자는 거의 스터브할 수 없습니다.

그럼, Jest 테스트를 만들어 봅시다!

```js
it("state에 들어가는 것을 테스트해야 합니다", () => {
  const setState = jest.fn();
  jest
    .spyOn(React, "useState")
    .mockImplementationOnce((initState) => [initState, setState]);
  render(<MyComponent />);
});
```

이렇게 하면 모의 컴포넌트 상태가 생성됩니다. 이제 모든 상태 작업은 실제 상태가 아닌 setState 스터브을 대상으로 할 것입니다.

<div class="content-ad"></div>

아마도 우리가 mockImplementationOnce()을 사용했고 mockImplementation()을 사용하지 않았다는 것에 주목했을 것입니다. 이것은 가짜 상태가 다음 테스트에 영향을 미치지 않도록하기 위함입니다. 테스트 끝에 jest.clearAllMocks()를 호출해도 이것을 제거하지 않습니다. 단지 mock 함수 setState()만을 제거할 뿐이며, 컴포넌트의 상태 기능이 올바르게 작동하지 않을 것입니다. 물론 이에 대해 걱정이 없고 모든 후속 단위 테스트에서 가짜 상태를 유지하려면 mockImplementation()을 자유롭게 사용해도 됩니다.

상태에 영향을 주는 컴포넌트 작업을 트리거하려면 (실제로든 가짜든) 테스트 함수를 act()로 래핑해야 합니다. 예를 들어 컴포넌트에 버튼이 있다고 가정해 봅시다:

```js
<Button data-testid="button" onClick={setValue(303)}>
  Click me
</Button>
```

다음 스니펫은 가상 DOM에서 이 버튼을 찾아 클릭합니다.

<div class="content-ad"></div>

```js
const button = screen.getByTestId("button");
act(() => fireEvent.click(button));
expect(setState).toHaveBeenCalledWith(303);
```

이 expect 라인은 액션이 발생한 후에 상태가 303 값을 받았는지를 확인할 것입니다.

이것이 컴포넌트 상태를 테스트하는 유일한 방법입니다. 한 번 더 강조하자면: 실제로 컴포넌트 상태를 테스트할 필요가 없으며, 이를 하지 않아도 커버리지에 영향을 미치지 않습니다. 일반적으로 상태 변경의 효과를 테스트해야 합니다. 예를 들어 자식 컴포넌트나 DOM 요소가 나타나거나 사라지는지, 텍스트가 변경되는지 등을 테스트해야 합니다.
