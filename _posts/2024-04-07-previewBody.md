---
title: "스토리북에서 변수에 따른 동적 UI 구현하기 previewBody"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "previewBody"
link: "https://storybook.js.org/docs/api/main-config-preview-body"
isUpdated: true
---






부모: main.js|ts 구성

유형: (내용: 문자열) =` 문자열

Storybook의 미리보기 `body`를 프로그래밍 방식으로 조정합니다. 주로 애드온 작성자들에 의해 자주 사용됩니다.

예를 들어 환경에 따라 스크립트나 스타일을 조건부로 추가할 수 있습니다.



```typescript
// 사용 중인 프레임워크에 따라 your-framework을 해당 프레임워크로 바꿔주세요 (예: react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  previewBody: (body) => `
    ${body}
    ${
      process.env.ANALYTICS_ID ? '<script src="https://cdn.example.com/analytics.js"></script>' : ''
    }
  `,
};

export default config;
```