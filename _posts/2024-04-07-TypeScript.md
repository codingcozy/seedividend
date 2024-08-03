---
title: "스토리북 타입스크립트 설정 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "TypeScript"
link: "https://storybook.js.org/docs/configure/typescript"
---




Storybook은 통합된 TypeScript 환경을 제공합니다. API, 애드온 및 스토리용 내장 타입을 포함한 제로 구성 설정을 제공합니다.

## TypeScript로 Storybook 구성하기

Storybook의 구성 파일(main.ts)은 TypeScript로 작성된 ESM 모듈로 정의되어 있습니다. 기존 프레임워크를 지원하면서 엄격한 타입 체크 및 편집기에서의 자동 완성을 가능하게 하는 기본 구성을 제공합니다. 아래는 간략한 구성 파일입니다.

```typescript
// 사용 중인 프레임워크로 your-framework을 대체하세요 (예: react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // 필수 사항
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // 선택 사항
  addons: ['@storybook/addon-essentials'],
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
};

export default config;
```



위의 기본 구성 API 참조에서 자세한 내용 및 추가 속성을 확인할 수 있습니다.

### 기본 구성 확장하기

Storybook은 기본적으로 다양한 써드파티 라이브러리와 함께 작동하도록 설계되어 있어 컴포넌트의 메타데이터(예: props)에 안전하게 액세스하고 문서화할 수 있게 해줍니다. 추가 구성 없이 컴포넌트의 메타데이터를 추론하고 성능 및 유형 안정성을 향상시키기 위해 타입을 자동으로 생성하는 빠르고 매우 유연한 react-docgen 파서를 사용합니다. 특정 사용 사례 시나리오에 대한 기본 구성을 사용자 정의해야 하는 경우 Storybook 구성 파일을 조정하고 필요한 옵션을 제공할 수 있습니다. 아래에 사용 가능한 옵션과 사용 방법 예시가 나와 있습니다.

```typescript
// 사용 중인 프레임워크로 교체하세요 (예: react-webpack5, react-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen',
    reactDocgenTypescriptOptions: {}, // reactDocgen이 'react-docgen-typescript'로 설정된 경우에만 사용 가능
    skipCompiler: true,
  },
};

export default config;
```



## TypeScript으로 이야기 쓰기

Storybook은 추가 구성 없이 TypeScript를 지원하여 이 언어를 사용하여 이야기를 쓸 수 있도록 합니다. 개선된 타입 안전성과 코드 완성을 위해 이 형식을 사용할 수 있습니다. 예를 들어 Button 컴포넌트를 테스트하는 경우, 다음과 같이 스토리 파일에서 작업할 수 있습니다:

```typescript
// your-framework를 귀하의 프레임워크 이름으로 대체
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

//👇 args가 컴포넌트 속성과 일치하지 않으면 타입 오류 발생
export const Primary: Story = {
  args: {
    primary: true,
  },
};
```

위 예시는 TypeScript의 기능을 사용하여 내보낸 제네릭 유형(Meta 및 StoryObj)을 조합함으로써 컴포넌트의 메타데이터 및 입력(예: props) 유형을 Storybook에게 어떻게 추론해야 하는지 알려줍니다. 이를 통해 개발자 경험을 크게 향상시켜 IDE가 Storybook에서 주입하는 속성을 보여줄 수 있습니다.



### TypeScript 4.9 지원

TypeScript 4.9+를 사용하는 프로젝트에 작업 중이라고 가정하면, 새로운 `satisfies` 연산자를 사용하여 컴포넌트 스토리의 유형 검사를 보다 엄격하게 할 수 있습니다. 예를 들어:

```typescript
// 프레임워크 이름으로 바꿔주세요
import type { Meta } from '@storybook/<your-framework>';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>; // 👈 더 엄격한 유형 검사를 위해 `satisfies` 연산자 사용.

export default meta;
```

이제 스토리를 정의하거나 기존 스토리를 업데이트할 때 필수 인수가 빠진 것을 자동으로 알림 받을 수 있습니다. 그러나 컴포넌트 수준에서 `satisfies` 연산자를 사용하는 것에 제한이 없습니다. 필요할 경우 스토리 수준에서도 사용할 수 있습니다. 예를 들어:



```typescript
// your-framework을 사용하는 프레임워크의 이름으로 바꿔주세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example = {
  args: {
    primary: true,
    label: 'Button',
  },
} satisfies Story;
```

## 문제 해결

### 제대로 작동하지 않는 satisfies 연산자

기본적으로 Storybook은 TypeScript 버전 4.9 이상을 사용하는 대부분의 프레임워크에 대해 satisfies 연산자를 지원합니다. 그러나 Angular 및 Web Components 프레임워크의 제약으로 인해, 이 연산자를 추가 유형 안정성을 가져오기 위해 적용하는 동안 문제가 발생할 수 있습니다. 이는 현재 두 프레임워크가 구현된 방식 때문에 주로 발생하며, Storybook이 컴포넌트 속성이 필요한지 여부를 결정하기가 거의 불가능합니다. 이 문제를 만나면 GitHub 토론 페이지에서 지원 요청을 올려주시기 바랍니다.



### Storybook은 외부 패키지에 필요한 유형을 생성하지 않습니다

만약 귀하의 프로젝트가 제3자 라이브러리에 의존하고 예상된 유형이 생성되지 않아 구성 요소를 정확하게 문서화할 수 없는 경우, Storybook 구성 파일에서 reactDocgen 옵션을 조정하여 react-docgen-typescript를 사용하고 필요한 옵션을 포함할 수 있습니다. 예를 들어:

```typescript
// 사용 중인 프레임워크로 your-framework를 대체하세요. (예: react-webpack5, react-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      // @mui 패키지를 제외한 node_modules의 제3자 속성을 필터링합니다.
      propFilter: (prop) =>
        prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
```

### 내 구성 요소에 대한 유형이 생성되지 않습니다



만약 React 프로젝트를 다루고 있다면, react-docgen 라이브러리를 사용하여 컴포넌트에 대한 타입 추론이 자동으로 활성화되어 빌드 시간 및 타입 안전성이 향상됩니다. 그러나 때로는 일부 옵션이 예상대로 작동하지 않을 수 있는 상황에 직면할 수 있습니다 (예: Enums, React의 forwardRef 등). 이는 주로 react-docgen 패키지의 구현 방식 때문에 발생하며, 이로 인해 Storybook이 컴포넌트의 메타데이터를 추론하고 자동으로 타입을 생성하기 어려워집니다. 이를 해결하기 위해서는 Storybook 구성 파일에서 typescript 구성 옵션을 업데이트하여 react-docgen-typescript을 사용하면 됩니다. 예를 들어:

```typescript
// 사용 중인 프레임워크에 따라 your-framework를 교체하세요 (예: react-webpack5, react-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    // 필요한 경우 옵션을 제공하세요.
    // 자세한 내용은 https://storybook.js.org/docs/configure/typescript 에서 확인할 수 있습니다.
    reactDocgenTypescriptOptions: {},
  },
};

export default config;
```

여전히 문제가 발생한다면, 기본 커뮤니케이션 채널 (예: GitHub discussions)을 통해 커뮤니티에 문의하는 것을 권장합니다.