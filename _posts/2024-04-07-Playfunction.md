---
title: "스토리북 play 함수 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Play function"
link: "https://storybook.js.org/docs/writing-stories/play-function"
---




플레이 함수는 스토리가 렌더링된 후에 실행되는 작은 코드 조각입니다. 이를 통해 컴포넌트와 테스트 시나리오와 상호 작용하거나 사용자 개입이 필요한 작업을 테스트할 수 있습니다.

## 상호 작용 애드온 설정

플레이 함수로 스토리를 작성하기 전에 Storybook의 addon-interactions를 설치하는 것을 권장합니다. 이것은 플레이 함수와 완벽한 보완이며, 실행 흐름을 제어하기 위한 편리한 UI 컨트롤 세트를 포함하고 있습니다. 언제든지 상호 작용을 일시 중지, 계속, 되감거나 단계별로 진행할 수 있습니다. 또한 잠재적인 문제를 해결하기 위한 쉽게 사용할 수 있는 디버거도 제공합니다.

다음 명령을 실행하여 애드온과 필수 종속성을 설치하세요.



```npm
npm install @storybook/test @storybook/addon-interactions --save-dev
```

Storybook 구성을 업데이트하세요(.storybook/main.js|ts) interactions 애드온을 포함시킵니다.

```typescript
// 사용 중인 프레임워크로 교체하세요 (예: react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    // 다른 Storybook 애드온들
    '@storybook/addon-interactions', // 👈 애드온 등록
  ],
};

export default config;
```

## play 기능으로 스토리 작성하기



Storybook의 재생 기능은 이야기가 렌더링을 마치면 한 번 실행되는 작은 코드 조각입니다. 애드온 상호작용의 도움으로 컴포넌트 상호작용을 구축하고 사용자 개입 없이는 불가능했던 시나리오를 테스트할 수 있도록 만듭니다. 예를 들어, 등록 양식을 작업하고 유효성을 검사하고 싶다면 다음과 같은 재생 함수와 함께 다음 이야기를 작성할 수 있습니다:

Markdown 형식의 재생 함수 전환

```typescript
// 자신이 사용하는 프레임워크 이름으로 대체합니다
import type { Meta, StoryObj } from '@storybook/your-framework';

import { userEvent, within } from '@storybook/test';

import { RegistrationForm } from './RegistrationForm';

const meta: Meta<typeof RegistrationForm> = {
  component: RegistrationForm,
};

export default meta;
type Story = StoryObj<typeof RegistrationForm>;

/*
 * 더 많은 정보를 위해 https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas를 참조하여 canvasElement를 사용해 DOM을 쿼리하는 방법 알아보기
 */
export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText('email', {
      selector: 'input',
    });

    await userEvent.type(emailInput, 'example-email@email.com', {
      delay: 100,
    });

    const passwordInput = canvas.getByLabelText('password', {
      selector: 'input',
    });

    await userEvent.type(passwordInput, 'ExamplePassword', {
      delay: 100,
    });

    // Actions 패널에 로깅을 설정하는 방법에 대해 자세히 알아보려면 https://storybook.js.org/docs/essentials/actions#automatically-matching-args를 참조하세요
    const submitButton = canvas.getByRole('button');

    await userEvent.click(submitButton);
  },
};
```

Storybook가 이야기의 렌더링을 마치면 재생 함수 내에서 정의된 단계를 실행하여 컴포넌트와 양식 정보를 채웁니다. 모두 사용자 개입 없이 이루어집니다. 상호작용 패널을 확인하면 단계별 흐름을 볼 수 있습니다.



컴포넌트 스토리 포맷 덕분에 ES6 모듈 기반 파일 형식으로 플레이 기능을 결합할 수 있어요. 다른 Storybook 기능 (예: args)과 유사하게 작동 가능하죠. 예를 들어, 컴포넌트의 특정 워크플로를 확인하려면 아래와 같은 스토리를 작성할 수 있어요:

```typescript
// 자신의 프레임워크 이름으로 바꾸세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { userEvent, within } from '@storybook/test';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

/*
 * 캔버스를 쿼리하는 canvasElement 사용에 관한 자세한 내용은
 * https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas를 참고하세요
 */
export const FirstStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('an-element'), 'example-value');
  },
};

export const SecondStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('other-element'), 'another value');
  },
};

export const CombinedStories: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    // 현재 스토리 기능을 실행하기 전에 FirstStory와 SecondStory의 play 함수를 실행함
    await FirstStory.play(context);
    await SecondStory.play(context);
    await userEvent.type(canvas.getByTestId('another-element'), 'random value');
  },
};
```

스토리를 결합하면 전체 컴포넌트 워크플로를 재생성하고 잠재적인 문제를 식별할 수 있으며, 작성해야 하는 보일러플레이트 코드를 줄일 수 있어요.

## 이벤트 처리하기



대부분의 현대 UI는 상호 작용에 중점을 두고 구축됩니다 (예: 버튼 클릭, 옵션 선택, 체크박스 표시), 최종 사용자에게 풍부한 경험을 제공합니다. 플레이 기능을 사용하면 이야기에 동일한 수준의 상호 작용을 통합할 수 있습니다.

일반적인 컴포넌트 상호 작용 유형 중 하나는 버튼 클릭입니다. 이를 이야기에서 재현해야 하는 경우 다음과 같이 이야기의 플레이 함수를 정의할 수 있습니다:

```typescript
// your-framework 이름으로 프레임워크 이름을 사용하여 대체하세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { fireEvent, userEvent, within } from '@storybook/test';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

/* https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * 페이지에서 canvasElement를 사용하여 DOM 쿼리하는 방법에 대해 알아보세요
 */
export const ClickExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // https://storybook.js.org/docs/essentials/actions#automatically-matching-args 페이지에서 Actions 패널에 로그를 설정하는 방법에 대해 알아보세요
    await userEvent.click(canvas.getByRole('button'));
  },
};

export const FireEventExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // https://storybook.js.org/docs/essentials/actions#automatically-matching-args 페이지에서 Actions 패널에 로그를 설정하는 방법에 대해 알아보세요
    await fireEvent.click(canvas.getByTestId('data-testid'));
  },
};
```

Storybook가 이야기를 로드하고 함수를 실행할 때, 컴포넌트와 상호 작용하여 버튼을 클릭하며 사용자가 하는 것과 유사한 동작을 수행합니다.



클릭 이벤트 외에도 play 함수를 사용하여 추가적인 이벤트를 스크립팅할 수 있어요. 예를 들어, 컴포넌트에 여러 옵션이 있는 셀렉트를 포함하고 있다면, 아래 이야기를 작성하고 각 시나리오를 테스트할 수 있어요:

```typescript
// 'your-framework' 대신에 사용하는 프레임워크의 이름으로 바꿔주세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { userEvent, within } from '@storybook/test';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

// 상호작용 사이에 지연을 에뮬레이트하는 함수
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * 를 참고하여 canvasElement를 사용해 DOM을 쿼리하는 방법에 대해 알아보세요
*/
export const ExampleChangeEvent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByRole('listbox');

    await userEvent.selectOptions(select, ['One Item']);
    await sleep(2000);

    await userEvent.selectOptions(select, ['Another Item']);
    await sleep(2000);

    await userEvent.selectOptions(select, ['Yet another item']);
  },
};
```

이벤트 외에도 play 함수를 사용하여 다른 유형의 비동기 방법을 기반으로 상호작용을 만들 수 있어요. 예를 들어, 유효성 검증 로직이 구현된 컴포넌트(예: 이메일 유효성 검증, 패스워드 강도)과 작업 중이라고 가정해봅시다. 이런 경우 play 함수 내에서 지연을 도입하여 사용자 상호작용을 모방하고 제공된 값이 유효한지 여부를 확인할 수 있어요:

```typescript
// 'your-framework' 대신에 사용하는 프레임워크의 이름으로 바꿔주세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { userEvent, within } from '@storybook/test';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

/* https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * 를 참고하여 canvasElement를 사용해 DOM을 쿼리하는 방법에 대해 알아보세요
*/
export const DelayedStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const exampleElement = canvas.getByLabelText('example-element');

    // delay 옵션은 타이핑되는 문자 사이의 밀리초 양을 설정합니다
    await userEvent.type(exampleElement, 'random string', {
      delay: 100,
    });

    const AnotherExampleElement = canvas.getByLabelText('another-example-element');
    await userEvent.type(AnotherExampleElement, 'another random string', {
      delay: 100,
    });
  },
};
```



Storybook이 이야기를 불러올 때 구성 요소와 상호 작용하여 입력을 채우고 정의된 유효성 로직을 트리거합니다.

특정 상호 작용을 기반으로 요소의 존재 여부를 확인하기 위해 play 함수를 사용할 수도 있습니다. 예를 들어, 컴포넌트 작업 중에 사용자가 잘못된 정보를 입력했을 때 어떻게 되는지 확인하고 싶을 경우가 있습니다. 그런 경우에, 다음과 같은 이야기를 작성할 수 있습니다:

```typescript
// your-framework 대신에 사용 중인 프레임워크의 이름으로 바꿔주세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { userEvent, waitFor, within } from '@storybook/test';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

/* 캔버스를 사용하여 DOM 쿼리를 하는 방법에 대해 더 알아보려면 https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas 를 참조해주세요 */
export const ExampleAsyncStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const Input = canvas.getByLabelText('Username', {
      selector: 'input',
    });

    await userEvent.type(Input, '잘못된입력', {
      delay: 100,
    });

    // Actions 패널에서 로깅 설정하는 방법에 대해 알아보려면 https://storybook.js.org/docs/essentials/actions#automatically-matching-args 을 참조해주세요
    const Submit = canvas.getByRole('button');
    await userEvent.click(Submit);

    await waitFor(async () => {
      await userEvent.hover(canvas.getByTestId('error'));
    });
  },
};
```

## 요소 쿼리하기



필요한 경우 플레이 함수를 조정하여 쿼리 (예: 역할, 텍스트 내용)를 기반으로 요소를 찾을 수도 있어요. 아래 예시를 참고해보세요:

```typescript
// 'your-framework'을 사용하는 프레임워크 이름으로 바꿔주세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { userEvent, within } from '@storybook/test';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

/* https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas를 확인하여
 * canvasElement을 사용하여 DOM을 쿼리하는 방법을 더 알아보세요
 */
export const ExampleWithRole: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // https://storybook.js.org/docs/essentials/actions#automatically-matching-args를 확인하여
    // 액션 패널에 로깅 설정하는 방법을 알아보세요
    await userEvent.click(canvas.getByRole('button', { name: / button label/i }));
  },
};
```

Storybook이 이야기를 로드하면, play 함수가 실행되고 DOM 트리를 쿼리하여 요소가 이야기가 렌더링될 때 사용 가능하도록 기대합니다. 테스트에서 문제가 발생하면 루트 원인을 빠르게 확인할 수 있어요.

그렇지 않으면, 컴포넌트가 즉시 사용할 수 없는 경우도 있습니다. 예를 들어 play 함수 내에서 정의된 이전 단계나 비동기 동작 때문일 수 있어요. 이 경우 DOM 트리의 변경을 기다리고 요소를 쿼리하기 전에 이야기를 조정할 수 있어요.



```typescript
// 본인이 사용하는 프레임워크의 이름으로 your-framework를 대체하세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { userEvent, within } from '@storybook/test';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

/* 자세한 내용은 https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * 를 참조하여 canvasElement를 사용하여 DOM을 쿼리하는 방법에 대해 더 알아보세요
 */
export const AsyncExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 다른 단계

    // 컴포넌트가 렌더링된 후 엘리먼트를 쿼리하기까지 대기합니다
    await canvas.findByRole('button', { name: / button label/i });
  },
};
```

## 캔버스와 함께 작업하기

기본적으로 play 함수 내에서 작성한 각 상호작용은 캔버스의 최상위 요소부터 실행됩니다. 이는 작은 컴포넌트(예: 버튼, 체크박스, 텍스트 입력란)에 대해서는 적합하지만, 복잡한 컴포넌트(예: 폼, 페이지) 또는 여러 개의 스토리에 대해서는 비효율적일 수 있습니다. 이를 고려하여 상호작용을 컴포넌트의 루트부터 실행할 수 있습니다. 예를 들어:

```typescript
// 본인이 사용하는 프레임워크의 이름으로 your-framework를 대체하세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { userEvent, within } from '@storybook/test';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const ExampleStory: Story = {
  play: async ({ canvasElement }) => {
    // 캔버스를 컴포넌트의 루트 엘리먼트에 할당합니다
    const canvas = within(canvasElement);

    // 컴포넌트의 루트 엘리먼트부터 쿼리를 시작합니다
    await userEvent.type(canvas.getByTestId('example-element'), 'something');
    await userEvent.click(canvas.getByRole('another-element'));
  },
};
```



당신의 이야기에 이러한 변경 사항을 적용하면 성능 향상과 애드온 상호 작용에 대한 오류 처리가 개선될 수 있어요.