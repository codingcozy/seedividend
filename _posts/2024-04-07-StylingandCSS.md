---
title: "스토리북 컴포넌트 CSS 스타일링 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Styling and CSS"
link: "https://storybook.js.org/docs/configure/styling-and-css"
---




웹 애플리케이션에 CSS를 포함시키는 방법은 여러 가지가 있습니다. 따라서 Storybook에 CSS를 포함시키는 방법도 여러 가지가 있어요. 보통은 스타일링이 Storybook 구성에서 어떻게 작동하는지를 최대한 모사하는 것이 좋아요.

## CSS

Storybook은 몇 가지 다른 방법으로 CSS 파일을 가져올 수 있어요. Storybook은 이러한 태그를 미리보기 iframe에 주입하는데, 여기서 컴포넌트가 렌더링되고, Storybook Manager UI가 아닌 곳이에요. CSS를 가져오는 가장 좋은 방법은 프로젝트의 구성 및 개인 취향에 따라 다를 거예요.

### 번들된 CSS 가져오기 (권장됨)



모든 스토리북은 CSS 파일을 인식하기 위한 import가 미리 구성되어 있습니다. 모든 스토리에 전역 CSS를 추가하려면 .storybook/preview.ts에서 import하십시오. 이러한 파일은 HMR(Hot Module Replacement)의 영향을 받으므로 Storybook 서버를 다시 시작하지 않고 변경 사항을 볼 수 있습니다.

```typescript
// 사용 중인 프레임워크에 맞게(your-framework를 react, vue3 등으로 변경)
import { Preview } from '@storybook/your-framework';

import '../src/styles/global.css';

const preview: Preview = {
  parameters: {},
};

export default preview;
```

만약 컴포넌트 파일이 CSS 파일을 import하는 경우에도 작동합니다. 그러나 Sass 또는 Postcss와 같은 CSS 프로세서 도구를 사용하는 경우 추가 구성이 필요할 수 있습니다.

### 정적 CSS 포함



만약 모든 이야기에 포함시키고 싶은 전역 CSS 파일이 있다면, .storybook/preview-head.html에서 가져올 수 있어요. 그러나 이러한 파일들은 HMR의 영향을 받지 않으므로, 변경 사항을 보려면 Storybook 서버를 다시 시작해야 해요.

```typescript
<!-- CDN에서 폰트를 불러옵니다 -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
  rel="stylesheet"
/>
<!-- CSS 파일을 불러옵니다 -->
<link rel="stylesheet" href="path/to/your/styles.css" />
```  

## CSS 모듈

### Vite  



Vite는 CSS 모듈을 기본으로 지원합니다. 만약 vite.config.js 파일에서 CSS 모듈 구성을 사용자 정의했다면, 이는 자동으로 Storybook에도 적용됩니다. Vite의 CSS 모듈 지원에 대해 더 알아보세요.

### Webpack

Webpack을 사용하고 CSS 모듈을 사용하려면 추가 구성이 필요합니다. 이 도구를 구성하는 데 도움이 되도록 @storybook/addon-styling-webpack을 설치하는 것을 권장합니다.

## PostCSS



### Vite

Vite는 기본적으로 PostCSS 지원이 포함되어 있습니다. 만약 `vite.config.js`에서 PostCSS 구성을 사용자 정의했다면, 이 설정은 Storybook에도 자동으로 적용됩니다. Vite의 PostCSS 지원에 대해 더 알아보세요.

### Webpack

Webpack을 사용하고 PostCSS를 사용하려면, 추가 구성이 필요합니다. 이러한 도구를 구성하는 데 도움을 줄 `@storybook/addon-styling-webpack`을 설치하는 것을 권장합니다.



## CSS 전처리기

### Vite

Vite은 기본적으로 Sass, Less 및 Stylus를 지원합니다. Vite의 CSS 전처리기 지원에 대해 더 알아보세요.

### Webpack



만약에 웹팩을 사용하고 Sass나 Less를 사용하려면, 추가적인 설정이 필요합니다. 이러한 도구들을 구성하는 데 도움이 되는 @storybook/addon-styling-webpack을 설치하는 것을 권장드립니다. 또는 원한다면 Storybook의 웹팩 설정을 직접 사용하여 적절한 로더를 포함시킬 수도 있습니다.

## CSS-in-JS

CSS-in-JS 라이브러리는 기본적인 자바스크립트를 사용하여 디자인되었으며, 종종 추가적인 설정 없이 Storybook에서 작동합니다. 일부 라이브러리는 컴포넌트가 특정 렌더링 "콘텍스트"에서 렌더링되도록 (예를 들어, 테마를 제공하기 위해) 기대하며, 이는 @storybook/addon-themes의 withThemeFromJSXProvider 데코레이터를 사용하여 수행할 수 있습니다.

## 웹폰트 추가하기



### .storybook/preview-head.html

웹폰트를 사용해야하는 경우 `.storybook/preview-head.html` 파일에 코드를 추가해야 할 수 있습니다. 가능한 경우 Storybook과 함께 모든 에셋을 포함하는 것이 좋습니다. 이 경우 정적 파일 위치를 구성하려고 할 것입니다.

### .storybook/preview.ts

폰트에 fontsource와 같은 것을 사용하고 있다면, `.storybook/preview.ts` 파일에서 필요한 CSS 파일을 가져올 수 있습니다.