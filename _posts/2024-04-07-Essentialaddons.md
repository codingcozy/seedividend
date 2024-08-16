---
title: "Storybook Addon 추가하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Essential addons"
link: "https://storybook.js.org/docs/essentials"
isUpdated: true
---






Storybook의 주요 장점 중 하나는 Storybook의 UI 및 동작을 확장하는 애드온들입니다. Storybook은 기본적으로 "필수" 애드온 세트를 함께 제공하여 초기 사용자 경험을 향상시킵니다. Storybook 코어 팀에 의해 개발된 "공식" 애드온뿐만 아니라 많은 서드 파티 애드온이 있습니다.

- Actions 
- Backgrounds 
- Controls 
- Docs 
- Highlight 
- Measure & outline 
- Toolbars & globals 
- Viewport

### 설치

프로젝트에 Storybook을 포함시키기 위해 npx storybook@latest init을 실행했다면, 최신 버전의 Essentials 애드온(@storybook/addon-essentials)이 이미 설치되어 구성되어 있습니다. 그러므로 나머지 섹션을 건너뛰고 진행하셔도 됩니다.



그러나 기존 Storybook 인스턴스에 에셜셜 애드온을 수동으로 설치하려는 경우, 터미널에서 다음 명령을 실행하여 설치할 수 있어요:

```js
npm install @storybook/addon-essentials --save-dev
```

Storybook 구성 (`.storybook/main.js|ts`)을 업데이트하여 에셜셜 애드온을 포함시켜 주세요.

```typescript
// 사용 중인 프레임워크로 (예: react-webpack5, vue3-vite) 대체해주세요
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'], // 👈 애드온 essentials 등록
};

export default config;
```



### 설정

Essentials는 "제로 설정"입니다. 권장 구성이 기본적으로 제공됩니다.

개별 Essentials 애드온을 재구성해야 하는 경우, 설치 지침을 따라 수동으로 설치하고 선택한 방법에 따라 Storybook 구성 파일(i.e., .storybook/main.js|ts)에 등록하고 필요에 맞게 구성을 조정하세요. 예를 들면:

```js
npm install @storybook/addon-actions --save-dev
```



아래는 모든 애드온에 대한 사용 가능한 옵션을 갖춘 구성 및 표로 줄인 설정 내용입니다.

```typescript
// 사용 중인 프레임워크로 your-framework를 대체하세요 (예: react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-docs',
      options: {
        csfPluginOptions: null,
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [],
          },
        },
      },
    },
    '@storybook/addon-controls',
    '@storybook/addon-backgrounds',
    '@storybook/addon-toolbars',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
  ],
};

export default config;
```

Storybook를 시작하면 사용자 정의 구성이 기본 구성을 덮어쓸 것입니다.



### 애드온 비활성화

근본 애드온 중 일부를 비활성화해야 한다면 .storybook/main.js 파일을 수정하여 수행할 수 있습니다.

예를 들어, 배경 애드온을 비활성화하려면 Storybook 구성에 다음 변경을 적용하면 됩니다:

```typescript
// 사용하는 프레임워크에 맞게 your-framework을(예: react-webpack5, vue3-vite) 대체하세요
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false, // 👈 배경 애드온 비활성화
      },
    },
  ],
};

export default config;
```