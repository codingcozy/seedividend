---
title: "Shadcn UI, Vite, Tailwind CSS, Storybook으로 React UI 컴포넌트 라이브러리 만드는 방법 단계별 가이드"
description: ""
coverImage: "/assets/img/2024-06-22-HowtoBuildaReactUIComponentLibraryAStep-by-StepGuideusingShadcnUIViteTailwindCSSandStorybook_0.png"
date: 2024-06-22 02:59
ogImage: 
  url: /assets/img/2024-06-22-HowtoBuildaReactUIComponentLibraryAStep-by-StepGuideusingShadcnUIViteTailwindCSSandStorybook_0.png
tag: Tech
originalTitle: "How to Build a React UI Component Library: A Step-by-Step Guide using Shadcn UI, Vite, Tailwind CSS, and Storybook"
link: "https://medium.com/@tiwariashutosh/how-to-build-a-react-ui-component-library-a-step-by-step-guide-using-shadcn-ui-vite-tailwind-36c1b89e2113"
---


![이미지](/assets/img/2024-06-22-HowtoBuildaReactUIComponentLibraryAStep-by-StepGuideusingShadcnUIViteTailwindCSSandStorybook_0.png)

안녕하세요! 이 글에서는 Shadcn UI, Vite, Tailwind CSS 및 Storybook을 사용하여 React UI 컴포넌트 라이브러리를 설정하는 방법에 대해 안내하겠습니다. 설정 프로세스에 들어가기 전에 이 기술들이 무엇이며 왜 사용하는지에 대해 먼저 이해해봅시다.

- Shadcn UI: Shadcn UI는 아름답고 접근성 있는 컴포넌트들의 모음이며 응용 프로그램에서 사용할 수 있습니다. 이는 종속성으로 설치하는 전통적인 컴포넌트 라이브러리가 아닙니다. 대신 컴포넌트를 찾아보고 복사하여 붙여넣거나 필요에 맞게 사용자 정의할 수 있습니다. Shadcn UI를 사용하는 이유는 일관된 디자인 시스템으로 빠르게 프로토타입을 만들고 컴포넌트를 구축할 수 있기 때문입니다.
- Vite: Vite는 현대적인 웹 프로젝트에 대해 더 빠르고 가벼운 개발 경험을 제공하도록 목적으로 하는 빌드 도구입니다. Vite에는 두 가지 주요 부분이 포함되어 있습니다. 네이티브 ES 모듈에 대해 매우 빠른 핫 모듈 교체(HMR)와 같은 기능을 제공하는 개발 서버 및 코드를 Rollup과 함께 번들로 묶어서 프로덕션용으로 매우 최적화된 정적 에셋을 출력할 수 있도록 사전 구성된 빌드 명령이 있습니다. Vite의 사용 이유는 전통적인 도구와 비교하여 더 빠르고 효율적인 빌드 프로세스를 제공하기 때문입니다.
- Tailwind CSS: Tailwind CSS는 맞춤형 사용자 인터페이스를 빠르게 구축하기 위한 유틸리티 중심의 CSS 프레임워크입니다. HTML을 떠나지 않고 완전히 맞춤형 디자인을 구축할 수 있도록 낮은 수준의 유틸리티 클래스를 제공합니다. 버튼이나 테이블과 같은 요소에 대해 미리 정의된 클래스 시리즈를 제공하지 않습니다. Tailwind CSS를 사용하는 이유는 쉽고 효율적으로 사용자 지정 스타일을 만들 수 있기 때문입니다.
- Storybook: Storybook은 UI 컴포넌트 및 페이지를 격리해서 구축하는 도구입니다. 전체 앱을 실행할 필요 없이 어려운 상태와 예외 사례를 개발하고 공유할 수 있습니다. 수천 개의 팀이 UI 개발, 테스트 및 문서 작업을 위해 Storybook을 사용합니다. Storybook을 사용하는 이유는 컴포넌트를 격리해서 개발 및 테스트할 수 있어 개발 프로세스를 더 효율적으로 관리할 수 있기 때문입니다.

이제 이러한 기술들에 대한 이해를 더 했으니 설정 프로세스에 대해 알아봅시다. 함께 진행해보시죠!

<div class="content-ad"></div>

# 준비 사항

시작하기 전에 다음을 이미 알고 있다고 가정합니다:

- React
- TypeScript
- Tailwind CSS

그리고 시스템에 다음이 설치되어 있는지 확인하세요:

<div class="content-ad"></div>

- Node.js와 npm

# 단계 1: Vite로 프로젝트 설정하기

우선 Vite (5.2.0)를 사용하여 새 프로젝트를 설정해야 합니다. 터미널에서 다음 명령을 실행하십시오:

```js
npm create vite@latest
```

<div class="content-ad"></div>

터미널에서 화면 안내에 따라 따라가서 프로젝트 이름을 입력하세요. 이 글에서는 "ui-library"라는 이름을 사용하고 있습니다. 리액트와 TypeScript를 사용할 것이기 때문에 해당 옵션을 선택하세요.

![이미지](/assets/img/2024-06-22-HowtoBuildaReactUIComponentLibraryAStep-by-StepGuideusingShadcnUIViteTailwindCSSandStorybook_1.png)

모든 지침을 따르고 나면 "ui-library" 프로젝트 디렉토리 안에 들어가고 http://localhost:5173/에서 Vite 데모 페이지를 볼 수 있을 것입니다.

# 단계 2: Tailwind CSS 설치하기

<div class="content-ad"></div>

다음으로, Tailwind CSS (3.4.3)를 다음 명령어를 사용하여 설치합니다:

```js
npm install -D tailwindcss postcss autoprefixer
```

# 단계 3: Tailwind CSS 구성

Tailwind CSS를 설치한 후, 구성 파일을 생성해야 합니다.

<div class="content-ad"></div>

```js
npx tailwindcss init -p
```

프로젝트 루트에 tailwind.config.js 파일이 생성됩니다. 우선 아래 내용대로 파일을 업데이트하세요. shadcn이 설치되면 업데이트될 것입니다.

<img src="/assets/img/2024-06-22-HowtoBuildaReactUIComponentLibraryAStep-by-StepGuideusingShadcnUIViteTailwindCSSandStorybook_2.png" />

각 Tailwind 레이어에 대한 @tailwind 지시문을 src/index.css 파일에 추가하세요.

<div class="content-ad"></div>

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

App.tsx 파일 안의 모든 내용을 다음과 같이 바꾸고 npm run dev를 실행하십시오:

```js
export default function App() {
  return <h1 className='text-3xl font-bold underline'>안녕, 세상아!</h1>;
}
```

이제 브라우저에서 다음이 표시됩니다:

<div class="content-ad"></div>


![image](/assets/img/2024-06-22-HowtoBuildaReactUIComponentLibraryAStep-by-StepGuideusingShadcnUIViteTailwindCSSandStorybook_3.png)

현재 단계에서는 Vite 및 Tailwind가 설치된 프로젝트를 가지고 있습니다.

# 단계 4: Storybook 통합

이제 우리는 Storybook 8을 통합하여 UI 구성요소를 격리된 상태로 개발하고 각 구성요소에 대한 청결한 문서를 제공할 것입니다. 다음 명령을 사용하여 설치하십시오:


<div class="content-ad"></div>

```js
npx storybook@latest init
```

이 명령어를 실행하면 자동으로 프로젝트 유형을 감지하고 package.json에 필요한 종속성 및 스크립트를 추가하게 될 거에요. 그리고 http://localhost:6006/에 아래의 데모 페이지를 볼 수 있을 거에요:

![이미지](/assets/img/2024-06-22-HowtoBuildaReactUIComponentLibraryAStep-by-StepGuideusingShadcnUIViteTailwindCSSandStorybook_4.png)

Storybook과 함께 Tailwind 클래스를 사용하려면 .storybook/preview.ts 파일에 불러와야 해요.

<div class="content-ad"></div>

```js
import 'tailwindcss/tailwind.css'
```

# 단계 5: Shadcn UI 설치하기

이제 Shadcn을 프로젝트에 설정할 것이며, 이를 통해 UI 컴포넌트를 생성할 것입니다.

먼저, tsconfig.json 파일의 compilerOptions에 경로를 해결하는 몇 가지 코드를 추가해야 합니다.

<div class="content-ad"></div>

```js
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

그런 다음 다음 명령을 사용하여 @types/node을 설치하겠습니다.

```js
# ("path"를 오류 없이 가져올 수 있도록 함)
npm i -D @types/node
```

아래 코드를 vite.config.ts에 추가하여 앱이 오류 없이 경로를 해석할 수 있도록 하세요:

<div class="content-ad"></div>

```js
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

프로젝트를 설정하려면 shadcn-ui init 명령을 실행하세요:

```js
npx shadcn-ui@latest init
```

다음과 같이 옵션을 선택하세요:

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-22-HowtoBuildaReactUIComponentLibraryAStep-by-StepGuideusingShadcnUIViteTailwindCSSandStorybook_5.png)

이제 첫 번째 컴포넌트를 추가할 준비가 되었습니다.

# 단계 6: 컴포넌트 생성

이제 Shadcn UI를 사용하여 간단한 컴포넌트를 만들어 봅시다. 아래 명령어는 Button 컴포넌트를 프로젝트에 추가합니다:


<div class="content-ad"></div>

```js
npx shadcn-ui@latest add button
```

Storybook story나 src\components\ui\button.tsx에서 Button 컴포넌트를 가져올 수 있습니다.

# 단계 7: Storybook에 컴포넌트 추가하기

마지막으로, Button 컴포넌트를 Storybook에 추가해 보겠습니다. Storybook에는 기존의 Button 컴포넌트가 있을텐데, 이것을 포함하여 다른 샘플 컴포넌트들을 삭제할 수 있습니다. src\stories\Button.stories.ts 디렉토리의 파일 Button.stories.tsx를 다음과 같이 편집하세요.

<div class="content-ad"></div>

```js
import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
    children: 'Button',
  },
}
```

이제 npm run storybook을 실행하여 Storybook을 시작하고 http://localhost:6006/에서 구성 요소를 확인할 수 있습니다. 이렇게 보일 것입니다:

<img src="/assets/img/2024-06-22-HowtoBuildaReactUIComponentLibraryAStep-by-StepGuideusingShadcnUIViteTailwindCSSandStorybook_6.png" />

이제 Button 구성 요소를 사용자 정의하고 여기에서 더 많은 shadcn 구성 요소를 추가할 수 있습니다.


<div class="content-ad"></div>

# 결론

축하합니다! Shadcn UI, Vite, Tailwind CSS 및 Storybook을 사용하여 React UI 컴포넌트 라이브러리를 성공적으로 설정했습니다. 이 설정은 컴포넌트를 효율적으로 생성하고 관리하는 데 도움이 될 것입니다.

도움이 되었다면 좋아요를 눌러주세요. 피드백은 언제나 환영합니다 :)