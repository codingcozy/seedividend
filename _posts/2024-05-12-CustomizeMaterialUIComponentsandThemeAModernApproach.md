---
title: "매터리얼 UI 컴포넌트와 테마를 사용자 정의하는 현대적인 방법"
description: ""
coverImage: "/assets/img/2024-05-12-CustomizeMaterialUIComponentsandThemeAModernApproach_0.png"
date: 2024-05-12 18:56
ogImage: 
  url: /assets/img/2024-05-12-CustomizeMaterialUIComponentsandThemeAModernApproach_0.png
tag: Tech
originalTitle: "Customize Material UI Components and Theme: A Modern Approach"
link: "https://medium.com/bitsrc/customize-material-ui-components-and-theme-a-modern-approach-18fe581ea359"
---


## Bit와 Material UI를 사용하여 초모듈화된 컴포넌트 라이브러리 구축하기

![이미지](/assets/img/2024-05-12-CustomizeMaterialUIComponentsandThemeAModernApproach_0.png)

초모듈화된 라이브러리는 전통적인 의미의 라이브러리가 아니라 독립적인 컴포넌트의 모음입니다. 이러한 구조는 다양한 이점을 제공합니다.

## "라이브러리"에는 다음이 포함됩니다:



- 완전한 유형 지원
- 각 구성요소에 대한 미리보기 (SB 스토리와 유사) 및 자동 문서화
- 추가적인 타이포그래피 변형을 포함한 사용자 정의 '테마 만들기'
- 사용자 정의 '기본' 테마, '다크 테마', '테마 공급자' 및 '다크 모드 토글'
- '버튼' 구성요소, '타이포그래피' 구성요소 등
- 사용자 정의 재사용 가능한 '리액트 개발 환경'

![이미지](/assets/img/2024-05-12-CustomizeMaterialUIComponentsandThemeAModernApproach_1.png)

"독립 구성 요소"라는 것은 보통 비트 구성 요소를 의미합니다. 이 블로그에서도 마찬가지이므로 Bit가 설치되어 있고 Bit 작업 공간이 초기화되어 있는지 확인해 주세요.

```js
npx @teambit/bvm install
```  




비트 새 basic my-workspace


## Bit 워크스페이스로 완전한 솔루션 복제하기

빠르게 시작하려면이 범위의 구성 요소를 자체 Bit 워크스페이스로 복제합니다 (비트 워크스페이스를 만들고 해당 위치로 cd해야합니다).

MY_BIT_PLATFORM_ACCOUNT를 비트 플랫폼에서의 사용자 이름 또는 비트 조직 이름으로 바꿉니다. MY_SCOPE를 범위 이름으로 바꿉니다. 이미 설정된 것이 없다면 새로운 범위를 만듭니다.



```js
cd my-workspace
```

```js
bit scope fork learnbit-react.custom-mui-lib MY_BIT_PLATFORM_ACCOUNT.MY_SCOPE
```

다음을 실행하여 Workspace UI에서 구성 요소를 탐색하십시오:

```js
bit start
```



이제 작업 공간에는 모든 구성 요소를 수정하고 내 스코프에 내보낼(push) 수 있는 컴포넌트가 모두 준비되어 있습니다.

```js
bit tag -m "첫 번째 버전"
bit export
```

다양한 구성 요소를 검토하고 해당 구현 방식에 대한 이유를 이해해 보겠습니다.

# 버튼



어떤 타사 라이브러리를 사용자 정의할 때를 인도하는 하나의 원칙은 당신, 라이브러리의 유지 보수자,가 그 인터페이스와 구현에 대한 완전한 통제권을 가져야 한다는 것입니다.

사용자가 무엇을 사용자 정의할 수 있는지와 무엇을 사용자가 사용자 정의할 수 없는지 선택할 수 있어야 합니다. 또한 컴포넌트의 구현을 변경하면서 그 인터페이스에 파괴적인 변화를 일으키지 않도록 할 수 있어야 합니다.

```js
/**
 * @componentId: learnbit-react.custom-mui-lib/actions/button
 * @filename: button.tsx
 */

import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
} from '@mui/material';

export type ButtonProps = {} & BaseButtonProps;

export function Button({ children, ...rest }: ButtonProps) {
  return <BaseButton {...rest}>{children}</BaseButton>;
}
```

## 컴포넌트 미리보기



버튼 구성 요소 미리보기는 몇 가지 변형을 제시합니다:

```js
/**
 * @componentId: learnbit-react.custom-mui-lib/actions/button
 * @filename: button.compositions.tsx
 */

import { Button } from './button.js';

export const DefaultButton = () => {
  return <Button>Click me</Button>;
};

export const ContainedButton = () => {
  return <Button variant="contained">Click me</Button>;
};

export const OutlineddButton = () => {
  return <Button variant="outlined">Click me</Button>;
};
```

![버튼 구성요소 이미지](/assets/img/2024-05-12-CustomizeMaterialUIComponentsandThemeAModernApproach_2.png)

## 구성 요소 설명



Bit은 컴포넌트의 API 참조를 자동으로 생성합니다 (로컬에서 컴포넌트 페이지의 'API 참조' 탭 또는 Bit 플랫폼에서 확인 가능합니다). 자동 생성된 문서는 수동으로 작성된 문서로 확장할 수 있습니다. 이 문서는 라이브 플레이그라운드를 사용하여 다양한 버튼 사용 방법을 제공합니다.

```js
/**
 * @componentId: learnbit-react.custom-mui-lib/actions/button
 * @filename: button.docs.mdx
 */

---
description: MUI 버튼
---

import { Button } from './button.js';

버튼 컴포넌트 내에서 표시하려는 텍스트를 제공하세요:

() => <Button>Click me</Button>;
``

## 독립적인 버전 관리

우리 라이브러리는 독립적인 Bit 컴포넌트 모음이기 때문에 각 컴포넌트의 변경 사항은 컴포넌트의 히스토리 로그와 의미적 버전 관리 (주요.부.패치)에 반영됩니다.



<img src="/assets/img/2024-05-12-CustomizeMaterialUIComponentsandThemeAModernApproach_3.png" />

bit tag actions/button -m "add custom docs" --patch
bit export

# Typography

<img src="/assets/img/2024-05-12-CustomizeMaterialUIComponentsandThemeAModernApproach_4.png" />



우리의 타이포그래피 컴포넌트는 MUI의 기본 타이포그래피 변형을 확장하여 손글씨 변형이 추가되었습니다.

이 "라이브러리"는 모듈식이고 조립이 가능하도록 구축되었기 때문에 해당 확장을 지원하는 타입 선언 (d.ts)을 프로젝트 루트에 배치하지 않고, 이 기능을 담당하는 컴포넌트가 기본 타입을 확장하도록 할 것입니다. 이렇게 하면 이 컴포넌트를 사용하는 구체적인 프로젝트에 관계없이 모든 것이 문제없이 작동됩니다.

/**
 * @componentId: learnbit-react.custom-mui-lib/typography/typography
 * @filename: create-theme.ts
 */

import type { CSSProperties } from 'react';
import {
  Typography as BaseTypography,
  type TypographyProps as TypographyPropsMUI,
  type TypographyVariant as BaseTypographyVariant,
  type TypographyVariantsOptions as BaseTypographyVariantsOptions,
} from '@mui/material';

/**
 * Typography 컴포넌트는 'handwriting' 변형으로 확장되었습니다.
 */

export type TypographyVariant = 'handwriting' | BaseTypographyVariant;

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    handwriting: true;
  }
}

export interface TypographyProps extends TypographyPropsMUI {
  variant?: TypographyVariant;
}

export function Typography({ children, ...rest }: TypographyProps) {
  return <BaseTypography {...rest}>{children}</BaseTypography>;
}

/**
 * 이 인터페이스는 테마에서 타이포그래피 변형을 정의하는 데 사용될 수 있습니다.
 */
export interface TypographyVariantsOptions
  extends BaseTypographyVariantsOptions {
  handwriting?: CSSProperties;
}

# 테마 생성



저희 맞춤형 '테마 생성' 컴포넌트는 MUI를 확장하여 추가 테마 옵션을 제공합니다. 이 경우에는 새로운 타이포그래피 변형이 포함됩니다. 이를 통해 저희는 확장된 스키마에 따라 새로운 테마를 생성할 수 있습니다.

/**
 * @componentId: learnbit-react.custom-mui-lib/theme/create-theme
 * @filename: create-theme.ts
 */

import type { Theme } from "@mui/material";
import { createTheme as createThemeBase } from "@mui/material/styles";
import type { ThemeOptions } from "./theme-options.js";

export function createTheme(options: ThemeOptions, ...args: object[]): Theme {
  return createThemeBase(options, ...args);
}

저희 테마 옵션은 저희 맞춤 타이포그래피 컴포넌트가 제공하는 타이포그래피 변형으로 확장됩니다.

/**
 * @componentId: learnbit-react.custom-mui-lib/theme/create-theme
 * @filename: theme-options.ts
 */

import type { ThemeOptions as BaseThemeOptions } from "@mui/material";
import type { TypographyVariantsOptions } from "@learnbit-react/custom-mui-lib.typography.typography";

/**
 * 테마 옵션을 추가로 확장하여 타이포그래피 변형을 제공합니다.
 */
export interface ThemeOptions extends BaseThemeOptions {
  typography?: TypographyVariantsOptions;
}



# 사용자 정의 ‘default’ 테마

우리의 사용자 정의 테마는 추가 속성(새로운 타이포그래피 유형)이 있는 테마를 생성하기 위해 사용자 정의 ‘create-theme’ 컴포넌트를 사용합니다:

/**
 * @componentId: learnbit-react.custom-mui-lib/theme/default-theme
 * @filename: default-theme.ts
 */

import {
  createTheme,
  type ThemeOptions,
} from "@learnbit-react/custom-mui-lib.theme.create-theme";
/** 우리 글꼴을 불러오는 `@import` 문을 반환합니다 */
import { getDefaultFonts } from "@learnbit-react/custom-mui-lib.typography.get-default-fonts";

export function defaultTheme(): ThemeOptions {
  return createTheme({
    components: {
      MuiCssBaseline: {
        /**
         * 전역 CSS 오버라이드
         * 기본 글꼴을 즉시 불러옵니다
         */
        styleOverrides: getDefaultFonts(),
      },
    },
    palette: {
      mode: "light",
      primary: {
        main: "#4d64a8",
     // ...
    },
    typography: {
      fontFamily: "Outfit, sans-serif",
      /* 이것은 우리의 사용자 정의 타이포그래피 변형입니다 */
      handwriting: {
        fontFamily: "Handlee, cursive",
      },
    },
  });
}

# 사용자 정의 ‘dark’ 테마



‘다크’ 테마는 해당 테마를 확장하고 사용자 정의하는 값을/디자인 토큰으로 구성됩니다. 이 경우 ‘기본’ 테마가 ‘다크’ 테마에 의해 확장되지만 동일한 패턴을 사용하여 어떤 테마든 어떤 테마 플레이버로 확장(또는 추가 확장)할 수 있습니다.

/**
 * @componentId: learnbit-react.custom-mui-lib/theme/dark-theme
 * @filename: dark-theme.ts
 */

/* 사용자 정의 및 확장할 테마를 가져옵니다 */
import { defaultTheme } from "@learnbit-react/custom-mui-lib.theme.default-theme";
import {
  createTheme,
  type ThemeOptions,
} from "@learnbit-react/custom-mui-lib.theme.create-theme";

export function darkTheme(): ThemeOptions {
  return createTheme(
  /* 확장할 테마 */
  defaultTheme(), 
  /* 이 테마를 위한 사용자 정의 값 */
  {
    palette: {
      type: "dark",
      primary: {
        main: "#6580f9",
      },
      // ...
    },
  });
}

# 재사용 가능한 리액트 개발 환경

Bit 컴포넌트는 컴파일러, 린터, 테스터 등을 지원하는 재사용 가능한 개발 환경(‘env’)을 사용하여 개발됩니다. 이 특정 컴포넌트 개발 환경은 Bit의 기본 리액트 개발 환경을 확장합니다.



우리 사용 사례에는 기본 구성을 변경할 필요가 없습니다. 그러나 우리는 매번 테마 공급자를 수동으로 설정하는 시간을 절약하고 또한 표준화된 미리보기 컨텍스트를 보장하기 위해 우리의 모든 컴포넌트 미리보기를 테마로 래핑하는 재사용 가능한 env가 필요합니다.

/**
 * @componentId: learnbit-react.custom-mui-lib/dev/react-mui
 * @filename: preview/mounter.ts
 */

import React from 'react';
import { createMounter } from '@teambit/react.mounter';
/* 우리의 사용자 정의 테마 공급자를 가져옵니다 */
import { ThemeProvider } from '@learnbit-react/custom-mui-lib.theme.theme-provider';

/**
 * 컴포넌트 미리보기에 필요한 컨텍스트를 제공합니다.
 * 이 경우, 사용자 정의 MUI 테마입니다.
 */
export function MyReactProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

우리는 이 env를 workspace.jsonc 구성 파일에 설정하여 새로운 컴포넌트가 이 env에서 제공하는 템플릿을 사용하여 생성되도록하고(그리고 자동으로 이 env를 env로 설정)하는 것을 보장할 수 있습니다:

/**
 * @filename: {workspace-root}/workspace.jsonc
 */

{
  // ...
    "teambit.generator/generator": {
    "envs": [
      /**
       * `learnbit-react.custom-mui-lib`를 
       * 자체 `BIT_CLOUD_ACCOUNT.SCOPE_NAME`으로 교체해야 합니다.
      "learnbit-react.custom-mui-lib/dev/react-mui"
    ]
  },
}



예를 들어, 이 'slider' 컴포넌트는 다음과 같은 개발 환경을 사용하여 생성됩니다:

$ bit create react actions/slider

생성된 컴포넌트가 올바른 환경을 사용하여 생성되었음을 확인하는 출력:

1 개의 컴포넌트가 생성되었습니다

learnbit-react.custom-mui-lib/actions/slider
    위치: custom-mui-lib/actions/slider
    환경: learnbit-react.custom-mui-lib/dev/react-mui@0.0.4 (템플릿에서 설정됨)
    패키지: @learnbit-react/custom-mui-lib.actions.slider



![Customize Material UI Components and Theme: A Modern Approach](/assets/img/2024-05-12-CustomizeMaterialUIComponentsandThemeAModernApproach_5.png)