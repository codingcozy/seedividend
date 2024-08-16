---
title: "스토리북 배경색 변경하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Backgrounds"
link: "https://storybook.js.org/docs/essentials/backgrounds"
isUpdated: true
---






백그라운드 툴바 애드온을 통해 스토리가 UI에서 랜더되는 배경색을 설정할 수 있습니다:

<video autoplay playsinline loop>
  <source src="@source/docs/Tech/2024-04-07-Backgrounds/img/Backgrounds_0.mp4" type="video/mp4">
</video>

## 설정

기본적으로 백그라운드 툴바에는 밝은 배경과 어두운 배경이 포함되어 있습니다.



하지만 여기서 제공하는 배경색에 국한되지 않습니다. .storybook/preview.js 파일의 parameters.backgrounds 매개변수를 사용하여 자체 색상 세트를 구성할 수 있습니다:

```typescript
// 사용 중인 프레임워크에 맞게 your-framework을(를) 해당 프레임워크 (예: react, vue3)로 대체하세요
import { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'twitter',
      values: [
        {
          name: 'twitter',
          value: '#00aced',
        },
        {
          name: 'facebook',
          value: '#3b5998',
        },
      ],
    },
  },
};

export default preview;
```

default 속성을 정의하면 애드온이 모든 스토리에 적용합니다. 그렇지 않으면 해당 색상이 사용 가능한 색상으로만 표시됩니다.

### 구성 확장하기



파라미터 상속을 통해 각 컴포넌트 또는 스토리마다 배경을 정의할 수도 있어요:

```typescript
// your-framework를 사용하는 프레임워크 이름으로 바꿔주세요
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

// Button 모든 스토리에 일괄적으로 배경을 적용하려면:
const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    backgrounds: {
      default: 'twitter',
      values: [
        { name: 'twitter', value: '#00aced' },
        { name: 'facebook', value: '#3b5998' },
      ],
    },
  },
};

export default meta;
```

특정 스토리에 대해 다른 기본값을 설정하려면 배경 파라미터 중 하나를 덮어쓸 수도 있어요:

```typescript
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Large: Story = {
  parameters: {
    backgrounds: { default: 'facebook' },
  },
};
```



### 배경 비활성화

이야기에서 배경을 비활성화하고 싶다면 배경 매개변수를 다음과 같이 설정하여 수행할 수 있습니다:

```typescript
// 여러분의 프레임워크 이름으로 대체하세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Large: Story = {
  parameters: {
    backgrounds: { disable: true },
  },
};
```

## 그리드



배경 툴바에는 그리드 선택기도 포함되어 있어요. 이렇게 하면 구성 요소가 정렬되었는지 빠르게 확인할 수 있어요.

시작하기 위해 추가 구성이 필요하지 않아요. 하지만 이 속성들은 완전히 사용자 정의할 수 있어요. 속성 중 어떤 것에도 값을 제공하지 않으면 다음과 같은 기본값을 사용해요:

```typescript
// 'your-framework'을 사용하는 프레임워크의 이름으로 바꾸세요
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

// Button 스토리에 모든 배경을 적용하려면:
const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    backgrounds: {
      grid: {
        cellSize: 20,
        opacity: 0.5,
        cellAmount: 5,
        offsetX: 16, // 스토리가 'fullscreen' 레이아웃인 경우 기본값은 0이고, 'padded' 레이아웃인 경우 16
        offsetY: 16, // 스토리가 'fullscreen' 레이아웃인 경우 기본값은 0이고, 'padded' 레이아웃인 경우 16
      },
    },
  },
};

export default meta;
```

### 그리드 비활성화



```typescript
// your-framework을 사용하시는 framework 이름으로 변경해주세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Large: Story = {
  parameters: {
    backgrounds: {
      grid: {
        disable: true,
      },
    },
  },
};
```

## API

### Parameters



이 애드온은 '배경' 네임스페이스 아래 다음 매개변수를 Storybook에 추가합니다:

#### default

유형: 문자열

기본 배경색입니다. 사용 가능한 색상 중 name 속성과 일치해야 합니다.



#### 비활성화

유형: 부울

이 애드온의 동작을 비활성화합니다. 전체 스토리북에서이 애드온을 비활성화하려는 경우, addon-essentials를 등록할 때 그렇게해야합니다. 자세한 정보는 essential 애드온의 문서를 참조하십시오.

이 매개 변수는 더 구체적인 수준에서 재정의를 허용하는 데 가장 유용합니다. 예를 들어, 프로젝트 수준에서이 매개 변수가 true로 설정된 경우 메타(컴포넌트) 또는 스토리 수준에서 false로 설정하여 다시 활성화 할 수 있습니다.



#### 격자

유형:

```js
{
  cellAmount?: number;
  cellSize?: number;
  disable?: boolean;
  offsetX: number;
  offsetY: number;
  opacity?: number;
}
```

유형: 숫자



기본값: 5

소 그리드 라인의 크기를 지정하세요.

유형: 숫자

기본값: 20



주요 그리드 선의 크기를 지정하실 수 있습니다.

유형: 부울

그리드를 비활성화합니다.

유형: 숫자



기본값: 스토리 레이아웃이 `fullscreen`이면 0, `padded`이면 16

그리드의 가로 오프셋.

타입: 숫자

기본값: 스토리 레이아웃이 `fullscreen`이면 0, `padded`이면 16



그리드의 수직 오프셋.

유형: 숫자

기본값: 0.5

그리드 선의 투명도.



#### 값

유형: { 이름: 문자열; 값: 문자열 }[]

사용 가능한 배경색. 사용 예시는 위를 참조하세요.