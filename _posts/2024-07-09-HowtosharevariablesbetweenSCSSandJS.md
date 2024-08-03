---
title: "SCSS와 JS 사이에 변수를 공유하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-HowtosharevariablesbetweenSCSSandJS_0.png"
date: 2024-07-09 18:17
ogImage:
  url: /assets/img/2024-07-09-HowtosharevariablesbetweenSCSSandJS_0.png
tag: Tech
originalTitle: "How to share variables between SCSS and JS"
link: "https://medium.com/@miroslav_petrov/how-to-share-variables-between-scss-and-js-7b4225830abe"
---

어플리케이션 스타일의 일관성을 강화하고 SCSS와 JavaScript 간 변수를 공유하여 코드를 보다 효율적으로 관리할 수 있습니다. JS 코드에서 이러한 변수에 손쉽게 접근할 수 있으면서도 수동 개입 없이 사용할 수 있게 하고 싶으신가요? 컬러 예시를 통해 단계별로 알아보겠습니다.

우선, colors.module.scss 파일에 컬러를 담은 SCSS 맵을 생성하세요. 이 파일이 진리의 원천이 됩니다. 맵에서 컬러 값을 가져오는 보조 함수를 구현하고, :export 지시어를 통해 @each 규칙을 사용하여 이러한 변수들을 루프를 통해 내보내세요.

index.scss 파일에서 다음과 같이 CSS 사용자 지정 속성으로 컬러를 포함하세요:

<div class="content-ad"></div>

```js
// index.scss

@import "colors.module";

:root {
  // 색상 맵에서 색상에 액세스
  --colors__background: #{getColorVarValue("background")};
  --colors__background_secondary: #{getColorVarValue("background_secondary")};

  // 더 많은 변수...
}

html {
  background-color: var(--colors__background);

  &.dark {
    background-color: var(--colors__dark__background);
  }
}
```

이제 모든 변수를 포함하는 객체를 colors.module.scss에서 가져와보세요. TypeScript를 사용하는 경우, colors.ts 파일에서 사전의 형식을 정의하세요:

```js
// colors.ts

import colors from "./colors.module.scss";

type Colors = {
  BACKGROUND: string;
  BACKGROUND_SECONDARY: string;

  // 다른 색상 변수 정의...
};

export const Colors = colors as Colors;
```

이제 React 컴포넌트에서 이 사전을 사용할 수 있습니다.

<div class="content-ad"></div>

```js
// Card.tsx

import { Colors } from "./colors";

// CardProps 인터페이스 정의...

export const Card = (props: CardProps) => {
  const { theme } = useTheme();

  const cardBackgroundColor = theme === "dark" ? Colors.DARK__BACKGROUND : Colors.BACKGROUND;

  // 다른 색상 할당...

  return (
    <CardContent backgroundColor={cardBackgroundColor} image={props.image}>
      <Title title={props.title} color={titleColor} />
      <Description description={props.description} color={descriptionColor} />
    </CardContent>
  );
};
```

<img src="/assets/img/2024-07-09-HowtosharevariablesbetweenSCSSandJS_0.png" />

위 단계를 따르면 SCSS 및 JavaScript/TypeScript 간에 변수를 원활하게 공유하고 활용하여 프런트엔드 개발 과정 전반에서 코드 유지 관리성과 일관성을 향상시킬 수 있습니다.
