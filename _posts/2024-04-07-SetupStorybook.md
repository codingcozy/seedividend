---
title: "리액트 Storybook storiesjs 작성 방법 "
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Setup Storybook"
link: "https://storybook.js.org/docs/get-started/setup"
isUpdated: true
---






이제 이야기가 무엇이고 어떻게 찾아볼 수 있는지 배웠으니, 프로젝트에서 Button과 같은 간단한 구성 요소를 선택하고 이를 위한 .stories.js 또는 .stories.ts 파일을 작성해 보세요. 아마도 아래와 같이 보일 것입니다:

```typescript
import type { Meta, StoryObj } from '@storybook/react';

import { YourComponent } from './YourComponent';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof YourComponent> = {
  component: YourComponent,
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
```

Storybook로 이동하여 렌더링된 구성 요소를 확인해보세요. 지금은 조금 이상해 보여도 괜찮습니다.



기술 스택에 따라 Storybook 환경을 더 구성해야 할 수도 있습니다.

## 컴포넌트 스타일 렌더링

Storybook은 CSS를 생성하거나 로드하는 방식에 대해 특정한 견해를 갖지 않습니다. 제공한 DOM 요소를 렌더링합니다. 그러나 때로는 기본 설정으로는 "올바르게 보이지 않는" 경우가 있을 수 있습니다.

Storybook의 렌더링 환경에 맞게 CSS 도구를 구성해야 할 수 있습니다. 커뮤니티에서 인기 있는 도구에 대한 설정 안내서가 있습니다.



- Tailwind
- Material UI
- Vuetify
- Styled Components
- Emotion
- Sass
- Bootstrap
- Less
- Vanilla-extract

찾고 계신 도구가 없나요? 더 많은 세부 정보를 확인하려면 스타일링 및 CSS 페이지를 확인해보세요.

## 스택에 맞게 Storybook 구성하기

Storybook은 관용적인 기본 설정을 제공합니다. 사용 환경에 맞게 자체적으로 커스터마이징을 시도합니다. 그러나 완벽하지는 않습니다.



프로젝트에 핵심 컴포넌트들을 격리된 환경에서 렌더링하기 위해 추가 요구 사항이 있을 수 있습니다. 이를 위해 구성을 더 맞추는 작업이 필요합니다. 필요한 구성에는 세 가지 주요 카테고리가 있습니다.

## 자산 및 리소스 로드

외부 자원 및 리소스를 Storybook을 통해 정적으로 요청된 컴포넌트에 제공하는 것이 좋습니다. 이렇게 하면 자산이 항상 스토리에 사용 가능합니다. 정적 파일을 Storybook으로 호스팅하는 방법에 대해 알아보려면 문서를 읽어보세요.