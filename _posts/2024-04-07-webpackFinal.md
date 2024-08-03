---
title: "스토리북 웹팩 설정 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "webpackFinal"
link: "https://storybook.js.org/docs/api/main-config-webpack-final"
---




부모: main.js|ts 설정

유형: async (config: Config, options: WebpackOptions) ⇒ Config

웹팩 빌더를 사용할 때 Storybook의 Webpack 설정을 사용자 정의합니다.

```typescript
// 사용 중인 프레임워크에 맞게 your-framework을(예: react-webpack5, vue3-vite) 바꿉니다.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  webpackFinal: async (config, { configType }) => {
    if (configType === 'DEVELOPMENT') {
      // 개발용으로 설정 수정
    }
    if (configType === 'PRODUCTION') {
      // 프로덕션용으로 설정 수정
    }
    return config;
  },
};

export default config;
```



## 옵션

유형: { configType?: `DEVELOPMENT` | `PRODUCTION` }

여기에 문서화하기 어려운 다른 옵션들이 있습니다. 자세한 내용은 유형 정의를 확인해주세요.