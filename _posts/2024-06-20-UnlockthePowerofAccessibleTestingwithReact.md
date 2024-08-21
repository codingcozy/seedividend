---
title: "React를 활용하여 접근성 테스팅의 힘을 발휘하세요"
description: ""
coverImage: "/assets/img/2024-06-20-UnlockthePowerofAccessibleTestingwithReact_0.png"
date: 2024-06-20 05:07
ogImage:
  url: /assets/img/2024-06-20-UnlockthePowerofAccessibleTestingwithReact_0.png
tag: Tech
originalTitle: "Unlock the Power of Accessible Testing with React"
link: "https://medium.com/the-tech-collective/unlock-the-power-of-accessible-testing-with-react-and-jest-be72913bc2bc"
isUpdated: true
---

## 포괄적인 사용자 경험을 만들자, 한 번에 한 가지 테스트씩.

![이미지](/assets/img/2024-06-20-UnlockthePowerofAccessibleTestingwithReact_0.png)

테스트; 모든 개발자들이 가장 좋아하는 주제! 때로는 지루해 보일 수 있지만 견고한 테스트 작성은 좋은 소프트웨어 개발의 핵심입니다. 전체 개발자들이 고려해야 할 장치 및 차원이 무한대로 늘어나면서, 원활한 접근성을 보장하는 테스트 작성이 더 중요해졌습니다.

본 문서에서는 리액트에서 테스트 접근성을 우선시하는 몇 가지 간단한 방법을 소개하겠습니다. 특정 라이브러리와 도구를 언급할 때, 일부 기본적인 이해를 전제로 하고 설정/설치 등과 같은 구체적인 세부 사항은 다루지 않겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# React Testing Library

안녕하세요! React에서 테스트하는 데 가장 인기 있는 라이브러리 중 하나인 React Testing Library입니다. 현재 주간 다운로드 수가 900만을 넘습니다. React Testing Library는 React 컴포넌트를 테스트하는 가벼운 솔루션으로 사용자 상호작용 중심의 방법론을 가지고 있습니다. Jest를 사용하는 것을 추천하지만, Mocha와 같은 다른 자바스크립트 테스팅 프레임워크와 함께 사용할 수도 있습니다.

## 쿼리

React 컴포넌트를 테스트할 때 쿼리는 가장 많이 사용되는 기능 중 하나입니다. 이것은 페이지에서 요소를 찾기위해 호출할 수 있는 방법입니다. 다양한 방법이 있지만, 페이지의 접근 가능한 요소들을 적절하게 테스트하는 데 있어서 모두 동일하지는 않습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래 테스트를 예로 들어보겠습니다:

```js
import {render, screen} from '@testing-library/react'

test('로그인이 되어야 합니다', () => {
  render(<LoginForm/>)
  const username = screen.getByTestId('username-input')
  ...
})
```

여기서는 간단한 로그인 폼 컴포넌트를 테스트하고 있습니다. 사용자명 입력 필드를 가져오기 위해 getByTestId 메서드를 사용했습니다. 이 요소가 페이지에 존재하고 올바른 테스트 ID가 할당되어 있다면 테스트가 정상적으로 실행되고 오류가 발생하지 않을 것입니다. 그러나 사용자가 볼 수 없고(들을 수 없는) 식별자를 사용하기 때문에 접근성에는 최적이지 않습니다.

이제 접근성을 고려한 향상된 버전을 살펴보겠습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import {render, screen} from '@testing-library/react'

test('로그인이 되어야 합니다', () => {
  render(<LoginForm/>)
  const username = screen.getByRole('textbox', {name:'Username'})
  ...
})
```

이 예제에서는 getByTestId를 getByRole로 대체했습니다. 또한 요소를 특정하고 해당 요소의 역할 및 관련 이름에 따라 식별할 수 있도록 추가 매개변수를 전달했습니다.

이 접근 방식은 접근성 면에서 훨씬 나아지며, 접근성 트리에 노출된 요소를 쿼리하기 때문에, 보조 기술(스크린 리더 등)이 요소를 인식하고 상호 작용하는 방식과 일치하는 방식으로 테스트를 수행합니다. 따라서 테스트 ID와 같은 것에 액세스할 수 없는 최종 사용자의 더 현실적인 사용자 경험을 시뮬레이션합니다.

요소를 쿼리하기 위한 기본 메소드는 getByRole 메소드여야 합니다. 대부분의 경우에 적합하겠지만, 그렇지 않은 경우를 위해 아래에 우선순위대로 나열한 메소드 목록이 있습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- getByRole
- getByLabelText
- getByPlaceholderText
- getByText
- getByDisplayValue
- getByAltText
- getByTitle
- getByTestId

하지만 이러한 다른 메서드 중 하나를 사용하기 전에 구성 요소가 어떻게 작성되었는지 더 깊이 살펴보세요. 역할의 더 나은 사용을 통해 더 접근성이 뛰어난 방식으로 작성할 수 있는 기회가 있을 수도 있습니다.

이러한 메서드와 이들의 우선순위에 관한 자세한 내용은 여기서 확인할 수 있습니다.

## fireEvent vs userEvent

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

React 컴포넌트를 테스트하는 또 다른 중요한 부분은 사용자 조작을 수행할 수 있는 능력을 갖는 것입니다. React Testing Library에서 이를 달성하는 두 가지 주요 방법은 fireEvent 및 userEvent입니다.

우리가 이전에 했던 테스트를 이어서, fireEvent를 사용한 예제를 먼저 살펴봅시다.

```js
import {render, screen, fireEvent} from '@testing-library/react'

test('로그인해야 합니다', () => {
  render(<LoginForm/>)
  const username = screen.getByRole('textbox', {name:'Username'})
  fireEvent.change(username, {target: {value: 'michaelscott'})
})
```

이제 여기에 또 다른 예제가 있습니다. 이번에는 userEvent를 사용합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("로그인되어야 함", async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  const username = screen.getByRole("textbox", { name: "Username" });
  await user.type(username, "michaelscott");
});
```

이 두 가지 방법은 같은 결과를 얻을 수 있지만, 내부적으로는 다르게 작동합니다. 여기에 문서에서 직접 인용한 내용이 있습니다:

이것이 우리의 구성요소가 접근 가능한지 확인하는 능력에 어떤 영향을 미치는지 궁금할 것입니다. fireEvent는 구성요소 내에서 특정 동작을 테스트하는 데 유용할 수 있지만, 특히 보조 기술을 사용하는 사용자들이 구성요소와 상호작용하는 실제 방식을 잘 반영하지 않습니다.

또한, fireEvent를 사용할 때 실제 사용자 상호작용에 트리거되는 모든 부작용을 트리거하지 않을 수도 있다는 점을 고려하는 것이 중요합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

따라서 가능한 경우 userEvent를 사용하고 사용자 조작을 시뮬레이션하는 데 이 방법을 기본값으로 사용하는 것이 좋습니다.

# jest-axe

이 강력한 라이브러리는 axe(접근성 엔진)를 React 테스트에서 쉽게 사용할 수 있게 해줍니다. 본문에서는 일관성을 위해 React Testing Library와 함께 사용하겠지만 다양한 다른 라이브러리와 함께 사용할 수도 있습니다. 추가 자세한 내용은 여기서 찾아볼 수 있습니다.

로그인 양식 예제를 계속 진행할 것이며, 아래에는 쉽게 따를 수 있지만 좋은 접근성 표준을 준수하지 않는 구성 요소의 간단한 버전이 제시되어 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
const LoginForm = () => (
  <form>
    <input type="text" />
    <input type="password" />
    <button type="submit">Login</button>
  </form>
);
```

이제 jest-axe 라이브러리를 사용하여 이 컴포넌트에 대한 테스트를 만들 수 있습니다:

```js
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

test("접근성 위반 사항이 없어야 합니다.", async () => {
  const { container } = render(<LoginForm />);

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
```

테스트를 실행하면 다음과 같은 출력이 생성되는데, 입력 필드에 레이블을 추가하는 것을 잊었다는 위반 사항을 식별했습니다!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/assets/img/2024-06-20-UnlockthePowerofAccessibleTestingwithReact_1.png" />

이 간단한 테스트에서 컴포넌트의 접근성 위반 사항을 식별했고, 제안된 변경 사항으로 빠르게 수정할 수 있습니다. 이것은 작은 예시지만 더 복잡한 컴포넌트에서 얼마나 강력한지 보실 수 있습니다.

이 피드백을 통해 컴포넌트를 다음과 같이 개선할 수 있습니다:

```js
const LoginForm = () => (
  <form>
    <label htmlFor="username">사용자명</label>
    <input type="text" id="username" />
    <label htmlFor="password">암호</label>
    <input type="password" id="password" />
    <button type="submit">로그인</button>
  </form>
);
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

여기에 접근성을 더 높일 수 있는 다른 여러 방법이 있음을 언급하는 것이 중요합니다. 예를 들어 스타일링, 양식 유효성 검사, 추가 ARIA 속성 등이 있습니다. 그러나 이것은 단지 라이브러리의 강점을 보여주고 컴포넌트의 기초를 쉽게 강화할 수 있는 작은 예시일 뿐입니다.

# Storybook에서의 접근성

Storybook은 UI 컴포넌트 및 페이지를 독립적으로 작성하는 데 널리 사용되는 라이브러리입니다. Storybook은 능력을 향상시킬 수 있는 멋진 애드온도 가지고 있습니다. 그 중 하나가 storybook-addon-a11y인데, 이 애드온은 컴포넌트 내의 접근성 위반 사항을 보여줍니다. 마치 jest-axe가 하는 것과 유사합니다.

Storybook 구성에 이 애드온을 추가함으로써 시작할 수 있습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
const config: StorybookConfig = {
  addons: ["@storybook/addon-a11y"],
};
export default config;
```

그런 다음 Storybook 환경을 시작하면 활성화성 탭이 나타나며, 여기에서 위반 사항 및 통과 사항을 볼 수 있습니다. 다소 접근하기 어려운 로그인 양식의 경우 아래 이미지와 유사한 모습이 될 것입니다.

![이미지](/assets/img/2024-06-20-UnlockthePowerofAccessibleTestingwithReact_2.png)

![이미지](/assets/img/2024-06-20-UnlockthePowerofAccessibleTestingwithReact_3.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이는 구성 요소가 접근성 면에서 목적에 적합한지 확인하는 또 다른 강력한 방법입니다. 특히 이미 시각 테스트용으로 Storybook을 사용 중이라면 이것은 아주 좋은 추가 기능이 될 수 있습니다.

# 결론

React 애플리케이션에 접근성 테스트를 점진적으로 통합하는 여러 가지 방법 중 일부만 강조했습니다. 이것은 시작점으로 작용하고 더 나은 발전을 위한 견고한 기반을 구축하는 데 도움이 될 것입니다.

이 방법이 애플리케이션이 100% 접근 가능하다고 확신할 수 있는 방법은 아닙니다. 가능하다면 실제 사용자가 사용하는 접근성 기술로 소프트웨어를 테스트해 보는 것이 좋습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

읽어주셔서 감사합니다 😊
