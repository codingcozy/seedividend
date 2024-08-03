---
title: "storybook managerHead 설정 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "managerHead"
link: "https://storybook.js.org/docs/api/main-config-manager-head"
---




부모: main.js|ts 구성

유형: (헤드: 문자열) =` 문자열

Storybook의 관리자 `head`를 프로그래밍적으로 조정합니다. 예를 들어 사용자 정의 글꼴을 로드하거나 스크립트를 추가할 수 있습니다. 대부분의 경우 애드온 작성자에 의해 가장 자주 사용됩니다.

예를 들어, 환경에 따라 스크립트나 스타일을 조건부로 추가할 수 있습니다:



```typescript
// "your-framework"을 사용 중인 프레임워크로 교체하세요 (예: react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  managerHead: (head) => `
    ${head}
    <link rel="preload" href="/fonts/my-custom-manager-font.woff2" />
  `,
};

export default config;
```