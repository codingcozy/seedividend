---
title: "React 테스팅 라이브러리들 정리"
description: ""
coverImage: "/assets/img/2024-05-01-ReactTestingLibraries_0.png"
date: 2024-05-01 18:17
ogImage: 
  url: /assets/img/2024-05-01-ReactTestingLibraries_0.png
tag: Tech
originalTitle: "React Testing Libraries"
link: "https://medium.com/@rajshreehsharma02/react-testing-libraries-0cbba6a9a283"
isUpdated: true
---




React에서의 테스트에는 두 가지 세계가 있어요: 하나는 UserEvent이고, 다른 하나는 FireEvent에요. 대다수의 사람들은 FireEvent에 대해 알고 있어요. 둘 다 기본적으로 리액트 테스트 라이브러리로, 프론트엔드 테스트를 작성하고 클릭 또는 입력란 작성과 같은 이벤트를 시뮬레이트할 수 있는 도구에요. 그래서 사용자가 수행했을 법한 작업을 시뮬레이트하며, 실제 사용자를 참여시키지 않고도 테스트를 작성하며 동시에 그 작업의 기능 또는 동작을 테스트하는 거예요.

위에서 언급된 것들을 사용해야 하는 이유가 더 많지만, 원래 논의로 돌아와서 더 나은 것은 무엇일까요? 두 가지를 함께 검토하고 우리 도메인에 더 적절한 것은 무엇인지 결론 내보도록 하죠.

두 방법 간의 차이를 이해하기 위해 작은 예시를 살펴보죠. 이 예시는 인사 상자 애플리케이션으로, 사용자가 이름을 입력하고 인사 버튼을 누르면 인사말이 표시되는 애플리케이션입니다.

![ReactTestingLibraries_0.png](/assets/img/2024-05-01-ReactTestingLibraries_0.png)

<div class="content-ad"></div>

이 애플리케이션에 대한 테스트를 작성하는 방법을 생각해보세요. 가장 기본적이면서 명확한 테스트 중 하나는 "사용자가 이름을 입력하고 인사 버튼을 클릭하면 인사말이 표시되어야 합니다." 입니다. 이 테스트를 작성해 보겠습니다. 하지만 그 전에 비슷한 기능을 가진 리액트 애플리케이션을 만드십시오.

다음 주소에서 프로젝트를 복제하세요: https://github.com/Rajshree02/react-testing-library

다음과 같은 라이브러리를 App.test.js 파일에 가져와 테스트를 수행하십시오.

```js
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
```

<div class="content-ad"></div>

## FireEvent

이 라이브러리는 DOM 이벤트를 발생시킵니다. DOM(Data Object Model)은 여러분이 아시다시피 언어와는 무관한 인터페이스로, 여러분의 프론트엔드 프레임워크와 라이브러리가 웹 페이지와 상호작용할 수 있도록 도와줍니다. 따라서, FireEvent를 사용할 때는 기본적으로 DOM과 밀접하게 작업하게 되며, 때로는 이 FireEvent가 그 DOM에 대한 래퍼로 간주되기도 합니다.

아래는 FireEvent를 사용하여 우리의 환영 메시지 애플리케이션을 테스트하는 코드 조각입니다.

```js
test("버튼 클릭 시 환영 메시지가 나타나야 합니다", () => {
  const window = render(<App />);
  const inputBox = window.getByLabelText("당신의 이름을 입력하세요");

  fireEvent.change(inputBox, { target: { value: "John" } });
  expect(inputBox).toHaveValue("John");
  const button = screen.getByRole("button");
  fireEvent.click(button);
  const actualGreet = window.getByText("안녕하세요 John !!");

  expect(actualGreet).toBeInTheDocument();
});
```

<div class="content-ad"></div>

하지만 여기서 생기는 질문은 진짜 중요한가? 그리고 그럴 때 또 다른 옵션이 있습니다.

## UserEvent

위의 질문에 대답하면, 중요하다는 것입니다. 왜냐하면 마지막으로 이를 사용하는 것은 UI를 테스트하기 때문입니다. 그러니까, 특정 컴포넌트의 동작을 이해하고 싶다면, 이 옵션이 좋은 선택일 것입니다. 그러나 사용자의 작업을 시뮬레이트하고 작업과 관련된 기능을 테스트하려면 UserEvent를 사용하세요. 그러니까, 사용자가 애플리케이션과 상호 작용할 때, 화면이나 표시된 UI는 DOM이 아닙니다. 사용자가 상호 작용하거나 변경하는 화면이 브라우저에 의해 DOM에 반영되고 사용자가 DOM과 상호 작용할 때 발생하는 일련의 일들이 있습니다. 예를 들어, 사용자가 텍스트 상자에 입력하면 요소가 포커싱되어야 하고 키보드 및 입력 이벤트가 발생하며 선택 및 값이 타이핑하는 동안 조작됩니다. FireEvent의 경우, 이러한 단계들이 생략되어 개발자로 하여금 DOM의 어떤 요소에 대한 이벤트도 트리거할 수 있게 됩니다.

UserEvent는 테스트를 작성하고 사용자가 시스템과 실제로 상호 작용하는 방식을 테스트할 수 있게 도와줍니다. 그래서 이것을 사용하면 사용자가 키보드를 사용하여 입력하는 동안 발생하는 일련의 단계를 테스트할 수 있습니다. 아래는 UserEvent를 사용하여 인사 애플리케이션을 테스트하는 코드 스니펫입니다.

<div class="content-ad"></div>

이 두 가지를 조금 설명한 후에 애플리케이션에 맞는 것을 결정해보세요.