---
title: "React Testing Library를 사용하여 Select 컴포넌트를 테스트해보기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Testing Select Components with React Testing Library"
link: "https://medium.com/gitconnected/testing-select-components-with-react-testing-library-4bdb529ac8d7"
isUpdated: true
---

<img src="/assets/img/TestingSelectComponentswithReactTestingLibrary_0.png" />

원문은 https://claritydev.net 에서 원본으로 게시되었습니다.

React에서 Select 구성요소를 테스트하는 것은 사용자 상호작용 모의, 비동기 동작 처리, 구현의 다양성, 중첩된 구성요소의 복잡성 및 접근성 문제 등의 요소로 어려울 수 있습니다. React Testing Library를 사용하면이 프로세스가 단순화되지만 모든 도전 과제를 제거하는 것은 아닙니다.

이 게시물에서는 React Testing Library를 사용하여 Select 구성요소를 테스트하는 데 대한 최고의 관행 중 일부를 살펴볼 것입니다. 먼저 일반 HTML select 위에 래퍼에 대한 테스트를 작성한 다음 인기있는 react-select 라이브러리를 사용하여 구성요소를 테스트합니다. 최종 코드는 GitHub에서 사용할 수 있습니다.

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

# 설정하기

테스트를 작성하기 전에 샘플 React 앱을 만들고 react-select 패키지를 설치할 거에요.

```js
npx create-react-app test-select
npm i react-select
```

# 네이티브 HTML select 테스트하기

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

우리는 기본 HTML select 요소를 감싸는 역할을 하는 컴포넌트를 테스트하기 시작할 것입니다. 이러한 컴포넌트를 가지고 있는 것은 매우 일반적이며, 선택 옵션을 렌더링하는 논리를 추상화합니다.

우리는 모든 코드를 components 폴더 안에 넣을 것입니다. components 폴더 안에 우리의 첫 번째 컴포넌트인 Select.js 파일을 생성하여 시작합니다.

```js
// src/components/Select.js

export const Select = ({ options, ...props }) => {
  return (
    <select {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
```

이 컴포넌트는 옵션 배열과 추가적인 props를 받습니다. 그런 다음 제공된 옵션을 기반으로 동적으로 생성된 옵션 요소를 가지고 있는 select 요소를 렌더링합니다.

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

구성요소가 준비되었으니, 이제 해당 구성요소에 대한 테스트를 작성할 준비가 되었습니다. 이를 위해 Select.test.js 파일을 만들겠습니다.

```js
// src/components/Select.test.js

import { render, screen } from "@testing-library/react";
import { Select } from "./Select";

const animals = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "lion", label: "Lion" },
  { value: "tiger", label: "Tiger" },
  { value: "elephant", label: "Elephant" },
  { value: "giraffe", label: "Giraffe" },
  { value: "zebra", label: "Zebra" },
  { value: "penguin", label: "Penguin" },
  { value: "panda", label: "Panda" },
  { value: "koala", label: "Koala" },
];

describe("Native select wrapper", () => {
  it("should render with default value selected", () => {
    render(<Select options={animals} defaultValue={"cat"} />);

    expect(screen.getByRole("combobox")).toHaveValue("cat");
    expect(screen.getByRole("option", { name: "Cat" }).selected).toBe(true);
  });
});
```

이 테스트에서는 구성요소가 올바르게 기본값을 표시하고 선택한 값을 변경할 때 업데이트하는지 확인합니다. 여러 개의 속성이 없을 때 select 요소와 일치하는 것으로 자동 부여되는 암묵적인 ARIA 역할인 combobox 역할을 사용하여 select 요소를 일치시킵니다. 또한 Cat 옵션이 선택 속성을 가지는지도 확인합니다.

만약 select 요소를 얻기 위해 getByText 대신 getByRole 쿼리를 사용하는 이유에 궁금해하신다면, 이 문서에서 그런 이유에 대한 상세한 설명과 React Testing Library 테스트 작성을 위한 다른 팁들도 제시하고 있으니 참고하시기 바랍니다: React Testing Library 테스트 개선 방법.

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

다음으로, 값 선택이 올바르게 작동하는지 테스트할 것입니다.

```js
// src/components/Select.test.js

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

const animals = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "lion", label: "Lion" },
  { value: "tiger", label: "Tiger" },
  { value: "elephant", label: "Elephant" },
  { value: "giraffe", label: "Giraffe" },
  { value: "zebra", label: "Zebra" },
  { value: "penguin", label: "Penguin" },
  { value: "panda", label: "Panda" },
  { value: "koala", label: "Koala" },
];

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("Native select wrapper", () => {
  it("should render with default value selected", () => {
    setup(<Select options={animals} defaultValue={"cat"} />);

    expect(screen.getByRole("combobox")).toHaveValue("cat");
    expect(screen.getByRole("option", { name: "Cat" }).selected).toBe(true);
  });

  it("should select correct value on change", async () => {
    const { user } = setup(<Select options={animals} defaultValue={"cat"} />);
    await user.selectOptions(screen.getByRole("combobox"), "zebra");

    expect(screen.getByRole("combobox")).toHaveValue("zebra");
    expect(screen.getByRole("option", { name: "Zebra" }).selected).toBe(true);
  });
});
```

우리는 사용자 상호작용을 시뮬레이션하기 위해 user-event 라이브러리를 사용합니다. 먼저, 테스트를 렌더하고 userEvent 라이브러리를 설정하는 유틸리티 setup 함수를 작성합니다. 그런 다음, 네이티브 select 요소에 잘 작동하는 내장 selectOptions 메서드를 사용하여 옵션을 선택한 후 값이 변경되는지 확인합니다.

만약 React Testing Library를 사용하여 다른 폼 컴포넌트를 테스트하고 싶다면, 이 기사가 도움이 될 수 있을 것입니다: Testing React Hook Form With React Testing Library.

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

# React Testing Library를 사용하여 react-select 테스트하기

일반 select 요소의 테스트는 비교적 간단합니다. 그러나 React에서는 그렇지 않습니다. 개발자들은 종종 비동기 옵션 로딩, 사용자 정의 디스플레이 옵션 및 사용자 지정 옵션 생성과 같은 기능이 필요합니다. 이러한 사용 사례를 해결하는 인기있는 라이브러리 중 하나가 react-select입니다. react-select은 다양한 상황을 위한 React Select 컴포넌트를 제공하는 강력한 라이브러리로, 매우 다재다능합니다. 그러나 이러한 Select 컴포넌트를 테스트하는 것은 기본 요소와 다른 사용자 정의 로직으로 인해 도전적일 수 있습니다.

React Testing Library를 사용하여 기본 Select 및 AsyncSelect 컴포넌트를 어떻게 테스트할 수 있는지 알아보겠습니다.

## 동기 Select 테스트하기

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

리액트 셀렉트 컴포넌트를 테스트할 때 네이티브 셀렉트와 같은 방식으로 독립적인 컴포넌트로 테스트할 수 있지만, 폼 안에서 테스트하는 것이 더 쉽습니다. 이 접근 방식은 컴포넌트의 쿼리 및 데이터 변경을 단순화합니다.

ReactSelectForm 컴포넌트를 만들어 보겠습니다.

```js
// src/components/ReactSelectForm.js

import Select from "react-select";

export const ReactSelectForm = (selectProps) => {
  const animals = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "lion", label: "Lion" },
    { value: "tiger", label: "Tiger" },
    { value: "elephant", label: "Elephant" },
    { value: "giraffe", label: "Giraffe" },
    { value: "zebra", label: "Zebra" },
    { value: "penguin", label: "Penguin" },
    { value: "panda", label: "Panda" },
    { value: "koala", label: "Koala" },
  ];

  return (
    <form aria-label={"동물 폼"}>
      <label htmlFor={"animals"}>동물</label>
      <Select name={"animals"} inputId={"animals"} options={animals} {...selectProps} />
    </form>
  );
};
```

여기서 주의할 점이 몇 가지 있습니다. 먼저, 테스트에서 폼 값을 확인하기 위해 폼에 설명적인 aria-label을 추가했습니다. data-testid를 사용할 수도 있지만, aria-label은 접근성이 좋은 폼의 명칭을 제공합니다. 이렇게 하면 암시적인 ARIA 역할 속성인 form을 가지므로 테스트에서 getByRole("form") 쿼리를 사용할 수 있습니다.

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

또 다른 수정 사항은 Select에 레이블을 추가하는 것입니다. react-select은 선택된 값을 기본 수준의 입력 내부에 저장하기 때문에, 우리는 inputId prop을 제공하여 입력과 레이블을 연결할 수 있습니다. 이 prop은 레이블의 htmlFor 속성과 일치해야 합니다. 이를 통해 getByLabelText 쿼리를 사용하여 컴포넌트와 필드의 접근성을 향상할 수 있습니다. 레이블 없이 컴포넌트를 테스트해야 하는 경우, 고립된 상태로 getByText 쿼리를 사용하거나 일치시키기 위해 Select를 div로 랩하고 data-testid를 사용해야 하는 경우가 발생합니다. 마지막으로, Select에 name prop을 추가하여 해당 값이 양식에 저장되도록 합니다. 이제 테스트를 작성할 준비가 되었습니다.

```js
// src/components/ReactSelectForm.test.js

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ReactSelectForm } from "./ReactSelectForm";

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("ReactSelectForm", () => {
  it("should render with default value selected", () => {
    setup(<ReactSelectForm defaultValue={{ value: "cat", label: "Cat" }} />);
    expect(screen.getByText("Cat")).toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveFormValues({ animals: "cat" });
  });
});
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

이전에 하던 것처럼, 기본값이 올바르게 표시되는지 확인하고 폼에 설정되는지 확인하겠습니다.

다음으로, 새로운 값을 선택하는 것이 제대로 작동하는지 테스트해볼 것입니다. 여기서는 selectOptions 도우미가 작동하지 않으므로 조심해야 합니다. 이를 테스트하는 몇 가지 방법이 있고, 가장 일반적인 두 가지 방법을 탐색해보겠습니다.

첫 번째 옵션은 선택하고 싶은 옵션을 수동으로 열어서 클릭하는 것입니다. 사용자가 상호 작용하는 것처럼 select 요소에 초점을 맞추고, 아래 화살표 버튼을 누르는 것을 모의하는 다음 선택하려는 옵션을 클릭하는 것입니다. 또는 Select 컨테이너를 클릭하여 초점을 맞추고 메뉴를 열 수도 있습니다.

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

테스트는 통과하지만 터미널에서 많은 경고 메시지를 볼 수 있어요:

```js
Warning: An update to Select inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):
```

이는 react-select이 테스트 중 업데이트된 상태를 알리지 않은 경고 메시지입니다. 테스트 중 React 상태 업데이트를 일으키는 코드는 act(...)로 래핑되어야 합니다.

React Testing Library 13 버전 이전에서는 첫 번째 쿼리로 findBy\*를 사용하여 이 경고를 해결할 수 있었지만, React 18과의 호환성을 위해 13 버전부터는 더 이상 작동하지 않습니다. 이와 관련된 GitHub 문제가 열려 있습니다.

경고 메시지를 해결하려면 모든 이벤트 호출을 별도의 act 함수로 래핑할 수 있지만, waitFor 유틸리티 도우미를 사용하여 모든 비동기 호출이 해결된 후에 요소를 쿼리할 수 있도록하는 것으로 이 프로세스를 간소화할 수 있습니다.

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
// src/components/ReactSelectForm.test.js

import { screen, waitFor } from "@testing-library/react";

it("should select correct value on change", async () => {
  const { user } = setup(
    <ReactSelectForm defaultValue={ value: "cat", label: "Cat" } />
  );

  await waitFor(async () => {
    // await user.click(screen.getByLabelText("Animals"));
    screen.getByLabelText("Animals").focus();
    await user.keyboard("[ArrowDown]");
    await user.click(screen.getByText("Zebra"));
  });

  expect(screen.getByRole("form")).toHaveFormValues({ animals: "zebra" });
});
```

## react-select-event 사용법

지금까지 Select 컴포넌트에서 값을 수동으로 선택했습니다. 좋은 소식은 이 프로세스를 간단하게 만들어주는 react-select-event 라이브러리가 있다는 것입니다.

이 라이브러리를 사용하여 테스트를 업데이트하여 차이점을 확인해봅시다.

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
// src/components/ReactSelectForm.test.js

import { select } from "react-select-event";

it("변경 시 올바른 값 선택해야 함", async () => {
  setup(<ReactSelectForm defaultValue={ value: "cat", label: "Cat" } />);

  await waitFor(() => select(screen.getByLabelText("동물"), "얼룩말"));

  expect(screen.getByRole("form")).toHaveFormValues({ animals: "얼룩말" });
});
```

이 라이브러리는 Select 컴포넌트에서 값 선택에 대한 수동 로직을 추상화합니다. 또한 act() 경고를 방지하기 위해 select 호출을 waitFor로 감싸야 합니다. 추가적으로 더 많은 추상화를 위해 유틸리티 함수를 만들 수 있습니다.

```js
const selectOptions = async (input, options) => {
  await waitFor(() => select(input, options));
};
```

react-select-event를 사용하는 또 다른 장점은 동일한 API를 사용하여 여러 요소를 선택할 수 있다는 것입니다.

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
// src/components/ReactSelectForm.test.js

it("멀티셀렉트와 함께 작동해야 합니다", async () => {
  setup(<ReactSelectForm isMulti />);

  await selectOptions(screen.getByLabelText("Animals"), ["Zebra", "Lion"]);

  expect(screen.getByRole("form")).toHaveFormValues({
    animals: ["zebra", "lion"],
  });
});
```

이로써, 우리는 Select 컴포넌트에 대한 기본적인 테스트를 완료했습니다.

## 비동기 react-select 테스트

비동기 react-select을 테스트하는 것은 기본 react-select 컴포넌트와는 조금 다릅니다. 이는 요소들을 쿼리하기 전에 선택 옵션이 로드되기를 기다려야 하는 필요 때문입니다.

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

이 테스트 방법을 보여주기 위해 새로운 ReactAsyncSelectForm 컴포넌트를 만들어보겠습니다.

```js
// src/components/ReactAsyncSelectForm.js

import Select from "react-select/async";

export const ReactAsyncSelectForm = (selectProps) => {
  const loadOptions = () => {
    return new Promise((resolve) => {
      resolve([
        { value: "dog", label: "Dog" },
        { value: "cat", label: "Cat" },
        { value: "lion", label: "Lion" },
        { value: "tiger", label: "Tiger" },
        { value: "elephant", label: "Elephant" },
        { value: "giraffe", label: "Giraffe" },
        { value: "zebra", label: "Zebra" },
        { value: "penguin", label: "Penguin" },
        { value: "panda", label: "Panda" },
        { value: "koala", label: "Koala" },
      ]);
    });
  };

  return (
    <form aria-label={"animal form"}>
      <label htmlFor={"animals"}>Animals</label>
      <Select name={"animals"} inputId={"animals"} loadOptions={loadOptions} defaultOptions {...selectProps} />
    </form>
  );
};
```

여기서 주요한 차이점은 react-select의 async Select 버전을 사용하고 옵션을 비동기적으로 로딩하기 위해 Promise를 사용한다는 점입니다. 또한 컴포넌트가 로드될 때 옵션 가져오기를 시작하는 defaultOptions prop을 추가했습니다.

이제 첫 번째 테스트를 추가할 수 있습니다.

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
// src/components/ReactAsyncSelectForm.test.js

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ReactAsyncSelectForm } from "./ReactAsyncSelectForm";

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("ReactAsyncSelectForm", () => {
  it("should render with default value selected", async () => {
    setup(<ReactAsyncSelectForm defaultValue={{ value: "cat", label: "Cat" }} />);
    expect(await screen.findByText("Cat")).toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveFormValues({ animals: "cat" });
  });
});
```

비동기 선택을 사용할 때 가장 큰 차이점은 동기 방식의 메소드(getBy* 등)를 사용할 수 없다는 것입니다. 요소를 쿼리하려면 비동기 옵션이 로드되고 컴포넌트 상태가 이에 맞게 업데이트되기를 기다려야 합니다. 이를 위해 쿼리를 waitFor 함수로 감싸거나 첫 번째 쿼리에 findBy*를 사용할 수 있습니다. 이를 통해 비동기 작업이 완료될 때까지 기다린 후 요소를 정상적으로 쿼리할 수 있습니다.

나머지 테스트는 이미 waitFor 래퍼를 사용하고 있기 때문에 동기 버전과 동일할 것입니다.

```js
import { render, screen, waitFor } from "@testing-library/react";
import { select } from "react-select-event";
import userEvent from "@testing-library/user-event";

import { ReactAsyncSelectForm } from "./ReactAsyncSelectForm";

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

const selectOptions = async (input, options) => {
  await waitFor(() => select(input, options));
};

describe("ReactAsyncSelectForm", () => {
  it("should render with default value selected", async () => {
    setup(<ReactAsyncSelectForm defaultValue={{ value: "cat", label: "Cat" }} />);
    expect(await screen.findByText("Cat")).toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveFormValues({ animals: "cat" });
  });

  it("should select correct value on change", async () => {
    setup(<ReactAsyncSelectForm defaultValue={{ value: "cat", label: "Cat" }} />);

    await selectOptions(screen.getByLabelText("Animals"), "Zebra");

    expect(screen.getByRole("form")).toHaveFormValues({ animals: "zebra" });
  });

  it("should work with multi-select", async () => {
    setup(<ReactAsyncSelectForm inputId={"animals"} isMulti />);

    await selectOptions(screen.getByLabelText("Animals"), ["Zebra", "Lion"]);

    expect(screen.getByRole("form")).toHaveFormValues({
      animals: ["zebra", "lion"],
    });
  });
});
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

# 결론

React에서 Select 컴포넌트를 테스트하는 것은 기능, 동작 및 접근성을 보장하기 위한 개발 프로세스의 중요한 부분입니다. React Testing Library를 사용하여, 우리는 다양한 시나리오를 다루고, react-select와 같은 라이브러리에서 제공하는 사용자 정의 Select 컴포넌트 및 네이티브 select 요소의 복잡성을 다룰 수 있는 효과적인 테스트를 작성할 수 있습니다.

이 게시물에서 안내된 단계를 따라가면, 네이티브 select, 동기 및 비동기 react-select 컴포넌트를 효과적으로 테스트하고, 접근성에 대한 최선의 방법을 유지할 수 있을 것입니다.

# 참고 자료와 리소스

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

- 튜토리얼에 대한 코드가 포함된 GitHub
- GitHub: waitFor을 getAllBy 쿼리로 사용할 때 findAllBy와 동일하지 않음
- MDN: 폼 기술적 요약
- MDN: 선택 요소
- MDN: 선택 기술적 요약
- React Select
- React Testing Library
- User Event
- W3C: 접근 가능한 이름
- react-select-event

원문은 https://claritydev.net에서 원본을 볼 수 있습니다.
