---
title: "리액트 NextJS 앱에 Material UI 통합하기"
description: ""
coverImage: "/assets/img/2024-05-14-IntegratingMaterialUIintoaReactNextJSapp_0.png"
date: 2024-05-14 10:52
ogImage: 
  url: /assets/img/2024-05-14-IntegratingMaterialUIintoaReactNextJSapp_0.png
tag: Tech
originalTitle: "Integrating Material UI into a React NextJS app"
link: "https://medium.com/@elanaolson/integrating-material-ui-into-a-react-nextjs-app-55a95e15d767"
isUpdated: true
---




이제 Material UI를 NextJS 앱에 추가하는 방법을 자세히 살펴보겠습니다. 빠르게 실행할 수 있도록 도와 드리겠습니다!

![image](/assets/img/2024-05-14-IntegratingMaterialUIintoaReactNextJSapp_0.png)

빨리 보고 싶다면 여기에서 전체 변경 사항을 확인할 수 있어요 😄. 이것은 react-portfolio-app의 일부로 더 큰 프로젝트의 일부입니다.

먼저 Material UI, emotion/react 및 emotion/styled를 설치하는 일반적인 설치 가이드를 따라 시작하세요.



```js
yarn add @mui/material @emotion/react @emotion/styled
```

Emotion styled 컴포넌트를 사용하여 스타일이 적용된 React 컴포넌트를 정의할 수 있어요. JSX 형식으로 모든 것이 포함되어 가독성이 더 높아지고 스타일링이 재사용 가능한 컴포넌트에 포함되어 있어요.

# NextJS를 위한 특정 구성 변경

어플리케이션에 대해 세 가지 변경 사항이 필요해요.



- 앱 라우터 추가
- 테마 생성
- 테마를 ThemeProvider 클라이언트 렌더링 파일에서 사용

NextJS 통합을 위한 Material UI와 관련된 특정 종속성을 설치해야 합니다. 페이지 라우터 대신 앱 라우터를 사용해야 합니다.

```js
yarn add @mui/material-nextjs @emotion/cache
```

## 1. 앱 라우터 추가



AppRouterCacheProvider를 루트 레이아웃에 추가해보세요.

```js
// app/layout.tsx
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

## 2. 테마 생성

theme.ts 파일을 만들고 문서에서 설명된 대로 ThemeProvider에서 사용할 테마를 정의하세요.



```js
// app/theme.ts
'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
```

## 3. 테마를 ThemeProvider 클라이언트 렌더링 파일에서 사용하기

루트 layout.tsx에 ThemeProvider를 직접 추가하는 대신, ThemeProvider 및 layout.tsx에서 호출할 별도의 파일을 생성해야 합니다. 이렇게 하는 이유는 ThemeProvider가 클라이언트 측 컨텍스트를 설정하기 때문에 서버 측에서 렌더링할 수 없으므로 코드를 자체 클라이언트 렌더링 파일로 가져와서 layout.tsx에서 호출합니다.

이 새 파일인 StyledRoot.tsx에서는 client-side rendered 파일임을 나타내기 위해 파일을 'use client'로 시작합니다 (더 읽기). 파일은 다음과 같이 보일 것입니다:



```js
// app/StyledRoot.tsx
'use client';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

export function StyledRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
```

그런 다음 우리는 레이아웃(layout.tsx)에 이를 추가하여 자식 구성 요소를 StyledRoot.tsx로 전달합니다.

```js
// app/layout.tsx
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { StyledRoot } from './StyledRoot';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
           <StyledRoot>{children}</StyledRoot>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

그래서 마무리입니다!



이제 Material UI를 사용하여 NextJs 앱을 실행할 수 있습니다. 다음 단계는 컴포넌트를 추가하는 것입니다!

컴포넌트 라이브러리를 살펴보며 디자인을 지원하는 컴포넌트를 확인하고, 해당 컴포넌트를 구현하는 방법에 대한 코드 예제를 살펴보세요!

Material UI 템플릿도 훌륭한 자료입니다. 실제로 Material UI 컴포넌트를 사용하는 다양한 예제를 제공합니다. 저는 포트폴리오 앱을 구축할 때 블로그 템플릿에 특별히 관심을 가졌어요.

이상으로 모두인데요! 이 기사가 도움이 되었는지, 빠진 중요한 내용이 있는지 알려주세요!