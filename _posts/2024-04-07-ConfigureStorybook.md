---
title: "React 저장소에서 Storybook 설정하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Configure Storybook"
link: "https://storybook.js.org/docs/configure"
---




Storybook은 다양한 구성 파일을 포함하는 .storybook이라는 폴더를 통해 구성됩니다.

## Storybook 프로젝트 구성

Storybook의 주 구성 파일인 main.js 또는 main.ts는 스토리 위치, 사용하는 애드온, 기능 플래그 및 다른 프로젝트별 설정을 정의합니다. 이 파일은 프로젝트의 루트 디렉토리에 있는 .storybook 폴더에 있어야 합니다. 이 파일은 JavaScript 또는 TypeScript로 작성할 수 있습니다. 아래에 사용 가능한 옵션과 사용 방법 예시가 나와 있습니다.

```typescript
// 사용중인 프레임워크로 your-framework을 대체하세요(예: react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // 필수
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // 선택
  addons: ['@storybook/addon-essentials'],
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
};

export default config;
```



## 스토리 로딩 구성

기본적으로 Storybook은 .storybook/main.js|ts의 글로브(패턴 일치 문자열)를 기반으로 프로젝트에서 스토리를 로드합니다. 이 때, 프로젝트의 확장자가 .stories.*인 모든 파일과 일치하는 것을 찾습니다. 이렇게 함으로써 컴포넌트를 설명하는 스토리 파일을 함께 두는 것을 의도하고 있습니다.

```js
•
└── components
    ├── Button.js
    └── Button.stories.js
```

다른 네이밍 규칙을 사용하려면, picomatch에서 지원하는 구문을 사용하여 글로브를 변경할 수 있습니다.



예를 들어, my-project/src/components 디렉토리에서 .md 및 .js 파일을 모두 가져오고 싶다면 다음과 같이 작성할 수 있습니다:

```typescript
// 사용 중인 프레임워크에 맞게 your-framework을 해당 프레임워크로 교체하세요 (예: react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../my-project/src/components/*.@(js|md)'],
};

export default config;
```

### 구성 객체로

또한 Storybook 구성을 구성 객체를 기반으로 스토리를 로드할 수 있습니다. 예를 들어, packages/components 디렉토리에서 스토리를 로드하고 싶다면 다음과 같이 설정 개체를 조정할 수 있습니다:



```typescript
// your-framework을 사용하는 프레임워크로 변경하세요 (예: react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: [
    {
      // 👇 스토리가 있는 디렉토리를 설정합니다
      directory: '../packages/components',
      // 👇 해당 패턴과 일치하는 파일을 모두 불러옵니다
      files: '*.stories.*',
      // 👇 스토리 제목을 자동으로 생성할 때 사용됩니다
      titlePrefix: 'MyComponents',
    },
  ],
};

export default config;
```

Storybook가 시작되면 packages/components 디렉토리 안에 stories 확장자를 포함한 모든 파일을 찾아서 스토리의 제목을 생성합니다.

### 디렉토리와 함께

또한 디렉토리를 이용하여 Storybook 구성을 간단하게 할 수 있고 스토리를 불러올 수 있습니다. 예를 들어, packages/MyStories 안에 있는 모든 스토리를 불러오고 싶다면, 아래와 같이 구성을 조정할 수 있습니다:```



```typescript
// 사용 중인 프레임워크(예: react-webpack5, vue3-vite)로 table태그를 변경해주세요
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  // 👇 Storybook은 MyStories 폴더 내의 모든 기존 스토리를 로드합니다
  stories: ['../packages/MyStories'],
};

export default config;
```

### 사용자 정의 구현과 함께

Storybook 구성을 조정하고 사용자 정의 논리를 구현하여 스토리를로드할 수도 있습니다. 예를 들어, 스토리를로드하는 일반적인 방법으로 해결할 수 없는 특정 패턴이 포함된 프로젝트에서 작업 중인 경우 다음과 같이 구성을 조정할 수 있습니다:

```typescript
// 사용 중인 프레임워크(예: react-webpack5, vue3-vite)로 table태그를 변경해주세요
import type { StorybookConfig } from '@storybook/your-framework';
import type { StoriesEntry } from '@storybook/types';

async function findStories(): Promise<StoriesEntry[]> {
  // 사용자 정의 논리는 파일 목록을 반환합니다
}

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: async (list: StoriesEntry[]) => [
    ...list,
    // 👇 발견한 스토리를 기존 스토리 파일 목록에 추가합니다
    ...(await findStories()),
  ],
};

export default config;
```



### 알려진 제약 사항

현재 Storybook에서 이야기들이 색인화되는 방식 때문에, 현재 순간은 런타임에 이야기를 불러오는 것에는 약간의 제약 사항이 있습니다:

- 버전 1부터 버전 3까지의 CSF 형식을 지원합니다.
- 제한된 API를 기반으로 사용자 정의 storySort 함수가 허용됩니다.

## 이야기 렌더링 구성하기



스토리를 렌더링하는 방식을 제어하고 전역 데코레이터와 매개변수를 추가하려면 .storybook/preview.js 파일을 생성하세요. 이 파일은 Canvas UI에 로드되며, 여러분의 컴포넌트를 분리되어 렌더링하는 "preview" iframe에 로드됩니다. 모든 스토리에 적용되는 글로벌 코드(예: CSS 임포트 또는 JavaScript 모의 객체)에는 preview.js를 사용하세요.

preview.js 파일은 ES 모듈이 될 수 있으며 다음 키를 내보낼 수 있습니다:

- decorators - 글로벌 데코레이터 배열
- parameters - 글로벌 매개변수 객체
- globalTypes - globalTypes 정의

스토리의 순서를 변경하려면, '스토리 정렬'에 대해 읽어보세요.



## Storybook UI 구성하기

Storybook의 UI(매니저)의 동작을 제어하려면 .storybook/manager.js 파일을 만들 수 있습니다.

이 파일에는 특정한 API가 없지만, UI 옵션을 설정하고 Storybook의 테마를 구성하는 곳입니다.