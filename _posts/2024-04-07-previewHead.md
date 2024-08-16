---
title: "Storybook previewHead 설정 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "previewHead"
link: "https://storybook.js.org/docs/api/main-config-preview-head"
isUpdated: true
---






부모: main.js 또는 ts 구성

유형: (head: string) =` 문자열

Storybook의 미리 보기 `head`를 프로그래밍 방식으로 조정합니다. 주로 애드온 작성자들이 사용합니다.

예를 들어, 환경에 따라 스크립트 또는 스타일을 조건부로 추가할 수 있습니다.



```typescript
// @storybook/your-framework을 사용 중인 프레임워크로 대체하세요 (예: react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  previewHead: (head) => `
    ${head}
    ${
      process.env.ANALYTICS_ID ? '<script src="https://cdn.example.com/analytics.js"></script>' : ''
    }
  `,
};

export default config;
```