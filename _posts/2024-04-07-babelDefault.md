---
title: "storybook 80 babel setting 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "babelDefault"
link: "https://storybook.js.org/docs/api/main-config-babel-default"
isUpdated: true
---






부모: main.js|ts 구성

유형: (config: Babel.Config, options: 옵션) = Babel.Config | Promise<Babel.Config>

babelDefault를 통해 Storybook의 Babel 설정을 사용자 지정할 수 있습니다. 이는 사용자의 프리셋이 적용되기 전에 미리보기 구성에 적용되며, 애드온 작성자에게 유용하며 권장됩니다. 최종 사용자의 babel 설정이 덮어쓸 수 있도록 설정되어 있습니다.

```typescript
import { TransformOptions } from '@babel/core';

export function babelDefault(config: TransformOptions) {
  return {
    plugins: [[require.resolve('@babel/plugin-transform-react-jsx'), {}, 'preset']],
  };
}
```



## Babel.Config

바벨이 제공하는 옵션들은 @storybook/addon-webpack5-compiler-babel 애드온을 활성화한 경우에만 적용됩니다.

## 옵션

유형: { configType?: `DEVELOPMENT` | `PRODUCTION` }



다른 옵션들이 있지만 이곳에서 설명하기 어려운 것들이 있습니다. 자세한 정보를 얻으려면 타입 정의를 자세히 살펴보세요.