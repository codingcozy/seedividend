---
title: "Storybook Addon 제어할 수 있는 parameters 사용 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Parameters"
link: "https://storybook.js.org/docs/writing-stories/parameters"
---




파라미터는 일반적으로 Storybook의 기능 및 애드온을 제어하는 데 사용되는 정적인 이름이 있는 이야기에 관한 메타데이터 세트입니다.

예를 들어, 배경 애드온을 파라미터를 통해 사용자 정의할 수 있습니다. parameters.backgrounds를 사용하여 이야기가 선택될 때 배경 툴바에 나타나는 배경을 정의할 수 있습니다.

## 이야기 파라미터

우리는 CSF 내보내기에서 parameters 키를 사용하여 각각의 이야기에 대한 파라미터를 설정할 수 있습니다.



```typescript
// 사용하고있는 프레임워크에 맞춰 your-framework을 변경하세요 (예: react-webpack5, vue3-vite)
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const OnDark: Story = {
  // 👇 스토리 레벨 파라미터
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
```

## 컴포넌트 파라미터

default CSF 내보내기의 parameters 키를 사용하여 컴포넌트의 모든 스토리에 대한 파라미터를 설정할 수 있습니다:

```typescript
// 사용하고있는 프레임워크에 맞춰 your-framework을 변경하세요 (예: react-webpack5, vue3-vite)
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  // 👇 메타 레벨 파라미터
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {};
```



## 전역 매개변수

모든 이야기의 매개변수도 설정할 수 있습니다. .storybook/preview.js 파일의 매개변수 내보내기를 통해 가능합니다 (이 파일은 모든 이야기를 구성하는 파일입니다):

```typescript
// 사용 중인 렌더러로 your-renderer를 바꿉니다 (예: react, vue3)
import { Preview } from '@storybook/your-renderer';

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#333' },
      ],
    },
  },
};

export default preview;
```

전역 매개변수 설정은 애드온을 구성하는 일반적인 방법입니다. Backgrounds를 통해 모든 이야기가 렌더링할 수 있는 배경 목록을 구성할 수 있습니다.



## 매개변수 상속 규칙

전역, 구성 요소 및 스토리 매개변수가 결합되는 방식은 다음과 같습니다:

- 더 구체적인 매개변수가 우선 순위를 갖습니다 (즉, 스토리 매개변수가 구성 요소 매개변수를 덮어쓰고, 전역 매개변수를 덮어쓰게 됩니다).
- 키만 덮어쓰고 삭제되는 일은 없습니다.

매개변수 병합은 중요합니다. 이것은 스토리별로 단일 구체적 하위 매개변수를 덮어쓰지만 전역으로 정의된 대부분의 매개변수를 유지할 수 있음을 의미합니다.



만약 매개변수(예: 애드온)를 의존하는 API를 정의하고 있다면, 이 동작을 고려하는 것이 좋은 아이디어입니다.