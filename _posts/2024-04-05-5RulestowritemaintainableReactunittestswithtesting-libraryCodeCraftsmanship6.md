---
title: "Testing Library를 활용한 React 유닛 테스트 작성하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "5 Rules to write maintainable React unit tests with testing-library  CodeCraftsmanship 6"
link: "https://medium.com/interaction-dynamics/5-rules-to-write-maintainable-react-unit-tests-with-testing-library-codecraftsmanship-6-02572833ec4b"
isUpdated: true
---





단위 테스트는 테스트 피라미드의 기초이자 신뢰할 수 있는 애플리케이션의 기반이 됩니다. React에서는 testing-library 라이브러리가 두드러집니다. 많은 개발자들이 이를 사용하여 테스트를 작성하는 것을 보곤 합니다.

하지만 많은 경우에, 이러한 테스트는 유지보수하기 어렵습니다. 컴포넌트를 변경할 때마다 테스트를 다시 작성해야 하는 문제가 발생하며, 이는 테스트의 목적에 정확히 반대됩니다.

본 문서는 testing-library를 사용할 때 적용해야 할 5가지 규칙에 대해 다루고 있습니다. 이러한 규칙 중 일부는 타입스크립트 호환 보일러플레이트를 활용하여 시간을 절약할 수 있습니다.

# AAA 패턴

<div class="content-ad"></div>

좋은 테스트는 컴포넌트의 기능을 문서화하는 좋은 기회입니다. 설계상 항상 최신 상태여야 합니다. 단위 테스트는 매우 명확해야 하는 테스트로 분할되어야 합니다. 그러니 테스트를 작성할 때 어떤 기능을 테스트하는지 쉽게 이해할 수 있도록 작성해주세요.

AAA 패턴은 개발 커뮤니티 전체에서 표준으로 사용됩니다:

- Arrange ⚙️: 테스트 환경 설정
- Act 🔄: 테스트할 코드 실행
- Assert ✅: 결과 확인

제 측면에서는 각 테스트를 3 단락으로 나누겠습니다:

<div class="content-ad"></div>

```js
it("onChange가 트리거되어야 합니다", async () => {
  // 사전 준비
  const onChange = jest.fn();
  const { user } = renderTest({ onChange });

  // 실행
  await user.type(screen.getByTestId(dataTestId), "foo");

  // 단언
  expect(onChange).toHaveBeenCalled();
});
```

# 사용자 이벤트

컴포넌트를 테스트할 때는 콜백 호출, 팝업 표시 여부 등을 테스트하기 위해 사용자 상호작용을 모방하는 것이 일반적입니다.

testing-library를 사용하면 개발자들이 자주 사용하는 선택지는 fireEvent를 사용하는 것입니다.

<div class="content-ad"></div>

```js
import { fireEvent, render } from '@testing-library/react'

it('해당 요소를 클릭해야 합니다', () => {
  render(<Component ... />)

  fireEvent.click(screen.getByTestId('...'))

  expect() //...
})
```

그러나 이 해결책은 클릭을 에뮬레이트하기만 하고 클릭을 트리거하지는 않습니다. 사용하는 라이브러리, 수행하는 동작 또는 청취하는 이벤트에 따라 이 fireEvent 함수가 작동하지 않을 수 있습니다. 그럼에도 높은 테스트 커버리지를 유지하기 위해 최종적으로 콜백을 모의(mock)하거나 가장 미친 해킹을 찾아 코드가 관리하기 어려워지고 가독성이 떨어질 수 있습니다.

더 나은 대안은 @testing-library의 다른 라이브러리인 user-event를 사용하는 것입니다:

```js
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('해당 요소를 클릭해야 합니다', async () => {
  const userEvent.setup()
  render(<Component ... />)

  await userEvent.click(screen.getByTestId('...'))

  expect() //...
})
```

<div class="content-ad"></div>

# Mock된 객체들

컴포넌트가 프로퍼티로 객체를 필요로 할 때, 종종 다음과 같은 코드를 볼 수 있어요:

```js
it("should render hello", () => {
  const user = { id: "foo", firstName: "John", lastName: "Doe" };

  render(<HelloWorld user={user} />);

  expect(screen.queryByText("John Doe")).toBeInTheDocument();
});
```

하지만 User 타입에 새로운 프로퍼티를 추가할 때마다, 초기화된 사용자를 사용하는 모든 테스트를 업데이트해야 해요. 이 타입을 많은 테스트에서 사용할 때, 많은 변경을 필요로 해요.

<div class="content-ad"></div>

해결책은 기본 사용자를 만들고 필요한 속성을 재정의할 수 있는 모의 함수를 생성하는 것입니다. 그런 다음 사용자가 필요할 때마다 이 함수를 재사용하면 됩니다:

```js
it("should render hello", () => {
  const user = mockUser({ firstName: "John", lastName: "Doe" });

  render(<HelloWorld user={user} />);

  expect(screen.queryByText("John Doe")).toBeInTheDocument();
});
```

테스트에 필요한 속성만 재정의하면 사용자에 추가 속성이 생겨도 이 테스트에 손 대지 않아도 됩니다.

모의 빌더를 만드는 예제는 이곳에서 찾을 수 있습니다.

<div class="content-ad"></div>

# Wrapper Builder

가끔은 컴포넌트가 리덕스, i18n 또는 기타 것들과 같은 일부 컨텍스트에 액세스해야 할 수도 있어요.

## mocking 라이브러리 피하기

컴포넌트의 종속성을 모킹하기 위해 jest.mock을 사용하는 개발자들을 종종 보게 됩니다:

<div class="content-ad"></div>

```js
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (v: string) => v,
  }),
}));

//..
```

이 방법은 2가지 단점이 있습니다:

- 테스트가 라이브러리 사용을 커버하지 못합니다: 새 버전의 라이브러리가 나오면 코드가 호환되는지 테스트할 수 없어서 위험합니다.
- 테스트가 유지보수하기 어려워집니다: 컴포넌트 코드를 리팩토링하여 테스트하지 않은 특정 인수를 함수 t로 사용한다면, 테스트의 일부를 다시 작성해야 합니다.

## 래퍼 사용하기

<div class="content-ad"></div>

테스트에서 모듈 전체를 가짜로 만들지 않고도 테스트에 문맥을 추가할 수 있게 해주기 위해 testing-library는 래퍼(wrapper)의 원칙을 소개했습니다.

랩퍼는 예를 들어 Context Provider나 상태가 이미 초기화된 Redux Provider가 될 수 있습니다.

```js
const Wrapper: React.FC<PropsWithChildren> = ({ children }) => <Provider store={alreadyInitializedState}>{children}</Provider>;

it("...을 렌더링해야 합니다.", () => {
  //...

  render(<Component />, { wrapper: Wrapper });

  // ...
});
```

대규모 아키텍처에서는 컴포넌트가 종종 여러 프로바이더에 의존하므로 해당 테스트는 상태, HTTP 호출, 번역, 다른 맥락 등을 위한 여러 래퍼(wrapper)가 필요하며 코드가 복잡해집니다.

<div class="content-ad"></div>

항상 동일한 Factory 패턴을 사용하는데, 연쇄 메소드를 사용해요:

```js
const wrapper = mockWrapper()
  .withRouter()
  .withTranslation()
  .withHttpCalls({ mocks: [ mockQuery() ])
  .withState({ state: mockState() })
  .build()

it('should render ...', () => {
  //...

  render(<Component />, { wrapper})

  // ...
})
```

이 Factory 패턴은 테스트 및 연쇄 메소드 사이의 중복을 줄이고, 코드를 읽기 쉽게 만들어줘요. 여기에서는 wrapper builder를 만들기 위한 예제를 찾을 수 있어요.

# Custom Render 함수

<div class="content-ad"></div>

testing-library로 테스트하는 경우 코드가 이렇게 보일 수 있어요:

```js
it('should ...'', () => {

  render(<Component propA={propA1} propB={propB1} />)

})

it('should ...'', () => {

  render(<Component propA={propA2} propB={propB2} />)

})

it('should ...'', () => {

  render(<Component propA={propA3} propB={propB3} />)

})
```

저는 각 테스트가 명확하기 때문에 코드를 이렇게 작성하는 방식을 좋아해요. 하지만 2가지 단점이 있어요:

- Component에 의해 사용되는 컴포넌트를 리팩토링하면 이제 컨텍스트가 필요한 경우, 모든 테스트를 업데이트하여 래퍼를 전달해야 합니다.
- 새로운 선택적이 아닌 속성을 추가하면 모든 테스트를 업데이트해야 합니다.

<div class="content-ad"></div>

해결책은 재사용할 사용자 정의 렌더 함수를 만드는 것입니다:

```js
const renderTest = buildRenderTest(Component, {
  // 기본 속성
  onChange: jest.fn(),
  value: "",
});

it("하는 일은 ...", () => {
  const onChange = jest.fn();

  renderTest({ onChange });

  //...
});

it("하는 일은 ...", () => {
  renderTest({ value: 100 });

  //...
});
```

이 해결책으로:

- 새로운 속성이 추가되면 기본 속성이 있으므로 renderTest 초기화만 수정하면 됩니다.
- 함수 buildRenderTest 내에 기본 래퍼가 이미 설정되어 있으므로 새 종속성을 추가할 때 많은 변경을 이미 방지하고 있습니다.

<div class="content-ad"></div>

이 패턴은 확장 가능한 테스트에 대한 첨단 솔루션입니다. 예를 들어 리덕스 문서에서 테스트를 작성하는 것을 권장합니다.

이 사용자 정의 렌더 함수 빌더의 핵심은 함수 render 의 API 반환을 개선할 수 있다는 점입니다.

예를 들어, 이 기사의 두 번째 섹션에서 사용자 이벤트의 공식 문서를 제안하는 공식 사용자-이벤트 문서의 초기화를 포함할 수 있습니다 :

```js
it("should ...", async () => {
  const onChange = jest.fn();
  const { user } = renderTest({ onChange });

  await user.click();

  //...
});
```

<div class="content-ad"></div>

전체 예제에 TypeScript와 호환되는 완벽한 예제를 찾을 수 있어요.

# 결론

이 5가지 규칙을 따른다면 테스트를 더 쉽게 유지할 수 있어요.

물론 이것으로 테스트 작성과 관련된 모든 어려움을 해결하지는 못해요. testing-library에는 배울 게 더 많아요. 테스트 작성 능력은 testing-library에만 한정되지 않아요. TDD나 테스트 피라미드 같은 다른 최상의 실천법도 추가할 수 있어요.

<div class="content-ad"></div>

그런데 컴포넌트를 리팩터링할 때 모든 테스트를 동시에 업데이트할 필요가 없어서 더 자신감이 있을 거예요.

이 글이 마음에 드셨나요? 👏🏼

![image](https://miro.medium.com/v2/resize:fit:1400/0*DOJtuVhHnz8QA0V5.gif)

안녕하세요, 저는 프론트엔드 및 UX 엔지니어인 티볼트입니다. UX, 코드 기술, 생산성, 과학 소설에 열정적이며 매월 새로운 글을 게시합니다. 이런 주제에 관심이 있으시면 제 Medium 계정을 팔로우해주세요: https://medium.com/@thibault-friedrich.
