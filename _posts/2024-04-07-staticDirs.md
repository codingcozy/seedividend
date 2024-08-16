---
title: "storybook config staticDirs 설정 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "staticDirs"
link: "https://storybook.js.org/docs/api/main-config-static-dirs"
isUpdated: true
---






부모: main.js|ts 구성

유형: (문자열 | { from: string; to: string })[]

Storybook에서 로드될 정적 파일 디렉토리 목록을 설정합니다.

```typescript
// 사용 중인 프레임워크로 대체하세요 (예: react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public', '../static'],
};

export default config;
```



## 설정 객체 사용하기

디렉토리를 정의하는 데 구성 객체를 사용할 수도 있어요:

```typescript
// 사용 중인 프레임워크(예: react-webpack5, vue3-vite)로 your-framework를 교체하세요
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: [{ from: '../my-custom-assets/images', to: '/assets' }],
};

export default config;
```