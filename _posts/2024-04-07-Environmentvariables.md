---
title: "스토리북에서 env로 환경변수 사용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Environment variables"
link: "https://storybook.js.org/docs/configure/environment-variables"
isUpdated: true
---






Storybook에서 환경 변수를 사용하여 다른 "모드"에서의 동작을 변경할 수 있습니다. STORYBOOK_로 접두어가 있는 환경 변수를 제공하면 Webpack을 사용할 때 process.env 또는 Vite 빌더를 사용할 때 import.meta.env에서 사용할 수 있습니다:

```js
STORYBOOK_THEME=red STORYBOOK_DATA_KEY=12345 npm run storybook
```

그런 다음 우리는 아래와 같이 미리보기 JavaScript 코드 어디에서든 이 환경 변수에 액세스할 수 있습니다:

```typescript
console.log(process.env.STORYBOOK_THEME);
console.log(process.env.STORYBOOK_DATA_KEY);
```



단순히 테이블 태그를 마크다운 형식으로 바꿔주시면 감사하겠습니다.



그럼 이 환경 변수를 이야기 내에서도 어디에서든 액세스할 수 있어요:

```typescript
// "your-framework"을(를) 사용하는 프레임워크의 이름으로 바꾸세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const ExampleStory: Story = {
  args: {
    propertyA: process.env.STORYBOOK_DATA_KEY,
  },
};
```

#### Vite로

기본적으로 Storybook은 Node.js 글로벌 객체인 process.env와 같은 것을 출력하지 않는 Vite 빌더를 제공해요. Storybook에서 환경 변수에 액세스하려면(import.meta.env를 사용해야 해요. 예를 들어:



```typescript
// 'your-framework'를 사용하는 프레임워크의 이름으로 바꿔주세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const ExampleStory: Story = {
  args: {
    propertyA: import.meta.env.STORYBOOK_DATA_KEY,
    propertyB: import.meta.env.VITE_CUSTOM_VAR,
  },
};
```

build-storybook로 Storybook을 빌드할 때 이 환경 변수들을 전달할 수도 있습니다.

그렇게 하면 이들은 Storybook의 정적 버전에 하드코딩됩니다.

### Storybook 구성 사용하기



추가로 Storybook 구성 파일(.storybook/main.js|.ts)을 확장하여 특정 변수(예: API URL 등)를 정의할 수 있는 구성 필드를 제공할 수도 있습니다. 아래는 예시입니다:

```typescript
// 사용 중인 프레임워크에 맞게 your-framework 부분을 해당 프레임워크로 변경하세요 (예: react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  /*
   * 👇 `config` 인자에는 이미 존재하는 다른 환경 변수가 모두 포함됩니다.
   * `.env` 파일에 구성되었든, 명령줄에서 구성되었든 모두 해당됩니다.
   */
  env: (config) => ({
    ...config,
    EXAMPLE_VAR: 'Storybook에서 구성한 환경 변수',
  }),
};

export default config;
```

Storybook가 로드될 때, 환경 변수들에 접근할 수 있는 기능이 활성화되며, 이를 활용하여 스토리에서 환경 파일을 다루는 것과 유사하게 작업할 수 있습니다:

```typescript
// 사용 중인 프레임워크의 이름으로 your-framework 부분을 해당 프레임워크의 이름으로 변경하세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    exampleProp: process.env.EXAMPLE_VAR,
  },
};
```



### 환경 변수를 사용하여 브라우저 선택하기

Storybook을 사용하면 이야기를 미리 보려는 브라우저를 선택할 수 있습니다. .env 파일 항목을 통해 또는 직접 storybook 스크립트에서 선택할 수 있습니다.

아래 표는 사용 가능한 옵션을 나열합니다:

## 문제 해결



### 환경 변수가 작동하지 않습니다

만약 프레임워크별 환경 변수(예: VUE_APP_)를 사용하려고 시도하고 계시다면, Storybook과 당신의 프레임워크가 특정 구성을 가지고 있어 해당 환경 변수를 인식하고 사용하지 못하게 될 수 있다는 점에 대해 문제가 발생할 수 있습니다. 이와 유사한 상황에 직면한다면, 프레임워크 구성을 조정하여 해당 환경 변수를 인식하고 사용할 수 있도록 해야 할 수도 있습니다. 예를 들어, Vite 기반 프레임워크를 사용하고 있다면, 구성 파일을 확장하여 envPrefix 옵션을 활성화할 수 있습니다. 다른 프레임워크들도 유사한 방식을 요구할 수 있습니다.