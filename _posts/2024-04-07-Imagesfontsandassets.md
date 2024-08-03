---
title: "스토리북에서 이미지와 폰트 설정하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Images, fonts, and assets"
link: "https://storybook.js.org/docs/configure/images-and-assets"
---




구성 요소는 종종 사용자가 기대하는 대로 렌더링되기 위해 이미지, 비디오, 글꼴 및 기타 에셋에 의존합니다. 이러한 에셋을 이야기 파일에서 사용하는 방법은 여러 가지가 있습니다.

### 이야기에 에셋 가져오기

미디어 에셋을 가져오는 것은 간단합니다. 기본 설정으로 작동합니다. 그러나 사용자 정의 웹팩 구성을 사용하는 경우 필요한 파일을 처리하기 위해 파일 로더를 추가해야 합니다.

이후에는 이야기에서 어떤 에셋이든 사용할 수 있습니다:



```typescript
import type { Meta, StoryObj } from '@storybook/react';

import imageFile from './static/image.png';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

const image = {
  src: imageFile,
  alt: 'my image',
};

export const WithAnImage: Story = {
  render: () => <img src={image.src} alt={image.alt} />,
};
```

### Storybook Configuration을 통해 정적 파일 제공

Storybook을 통해 정적 파일을 제공하는 것을 권장합니다. 이를 통해 컴포넌트가 로드에 필요한 자산을 항상 가지고 있을 수 있습니다. 로고, 글꼴 및 아이콘과 같이 컴포넌트가 자주 사용하는 자산에 대해 이 기술을 권장합니다.

Storybook을 시작할 때 정적 파일이 있는 디렉터리(또는 디렉터리 목록)를 구성하세요. 정적Dirs 구성 요소를 사용하여 주요 Storybook 구성 파일(.storybook/main.js|ts 등)에서 디렉터리를 지정하세요:



```typescript
// 사용중인 프레임워크 (예: react-webpack5, vue3-vite)로 table 태그를 Markdown 형식으로 변경하세요
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public'], //👈 Storybook에서 정적 자산 폴더를 구성합니다
};

export default config;
```

여기서 ../public은 정적 디렉토리입니다. 이제 컴포넌트 또는 스토리에서 이를 사용할 수 있습니다.

```typescript
import type { Meta, StoryObj } from '@storybook/react';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

// "public" 디렉토리에 image.png가 있는 것으로 가정합니다.
export const WithAnImage: Story = {
  render: () => <img src="/image.png" alt="my image" />,
};
```

하나의 디렉토리 대신 공백 없이 쉼표로 구분된 디렉토리 목록을 전달할 수도 있습니다.



```typescript
// 사용하는 프레임워크에 따라 framework를 react-webpack5, vue3-vite 등으로 바꾸세요.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public', '../static'],
};

export default config;
```

또는 디렉터리를 정의하는 구성 객체를 사용할 수도 있어요:

```typescript
// 사용하는 프레임워크에 따라 framework를 react-webpack5, vue3-vite 등으로 바꾸세요.
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: [{ from: '../my-custom-assets/images', to: '/assets' }],
};

export default config;
```

### CDN에서 자산 참조하기



온라인 CDN에 파일을 업로드하고 해당 파일을 참조해주세요. 이 예시에서는 플레이스홀더 이미지 서비스를 사용하고 있습니다.

```typescript
import type { Meta, StoryObj } from '@storybook/react';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const WithAnImage: Story = {
  render: () => (
    ![My CDN placeholder](https://storybook.js.org/images/placeholders/350x150.png)
  ),
};
```

### 절대 경로와 상대 경로

가끔씩, Storybook을 https://example.com/storybook 과 같은 하위 경로에 배포하고 싶을 수도 있습니다.



이 경우에는 모든 이미지와 미디어 파일을 상대 경로로 가져야 합니다. 그렇지 않으면 브라우저가 해당 파일을 찾을 수 없습니다.

정적 콘텐츠를 가져와서 로드하는 경우에는 자동으로 처리되므로 따로 할 일이 없습니다.

Storybook과 함께 정적 디렉토리에 에셋을 제공하는 경우 이미지를 로드하기 위해 상대 경로를 사용하거나 base 요소를 사용해야 합니다.

### 스토리에서 폰트 참조하기



Storybook을 정적 폴더에서 에셋을 제공하도록 구성한 후에 Storybook에서 해당 에셋을 참조할 수 있습니다. 예를 들어, 이야기에 사용자 정의 글꼴을 참조하고 적용할 수 있습니다. 이를 위해 구성 디렉토리 (예: .storybook) 내에 preview-head.html 파일을 생성하고 `link` 태그를 추가하여 글꼴을 참조하면 됩니다.

```typescript
<!-- 정적 디렉토리 또는 인터넷에서 제공되는 정적 파일 가져오기 -->
<!-- 예: 'main.js|ts'는 staticDirs: ['../public']로 구성되어 있으며 글꼴은 `public` 디렉토리 내의 `fonts` 디렉토리에 있습니다. -->
<link rel="preload" href="/fonts/my-font.woff2" />

<!-- 또는 사용자 정의 head-tag JavaScript를 로드할 수도 있습니다: -->

<script src="https://use.typekit.net/xxxyyy.js"></script>
<script>
  try {
    Typekit.load();
  } catch (e) {}
</script>
```