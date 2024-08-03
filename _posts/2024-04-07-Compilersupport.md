---
title: "빠른 스토리북 실행을 위한 방법 "
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Compiler support"
link: "https://storybook.js.org/docs/configure/compilers"
---




자바스크립트 컴파일러는 코드를 최적화하고 변환하여 성능을 향상시키며 다양한 환경에서 호환성을 보장하는 데 필수적입니다. Storybook은 주요 컴파일러를 지원하여 SWC 또는 Babel을 활용하여 번들링 및 실행 속도를 향상시켜 빠른 빌드 시간을 보장합니다. 또한 Babel은 풍부한 플러그인 및 프리셋 생태계를 활용하여 웹팩 기반 프로젝트에서 최신 기능을 사용할 수 있도록 최소한의 구성만으로 지원합니다.

## SWC

SWC는 현대적인 자바스크립트 애플리케이션을 컴파일하고 번들링하는 빠르고 매우 확장 가능한 도구입니다. Rust로 구동되며 성능을 향상시키고 빌드 시간을 줄입니다. Storybook에는 SWC와의 내장 통합이 포함되어 있어 제로 구성 설정과 API용 내장 타입을 제공합니다. 지원되는 프레임워크 중 하나로 웹팩 기반 프로젝트에 Storybook을 초기화했는데 Angular, Create React App, Ember.js 및 Next.js를 제외한 경우 SWC를 자동으로 기본으로 사용하여 더 빠른 로딩 시간을 제공합니다.

## Babel



Babel은 모듈화 아키텍처와 다양한 플러그인 시스템을 제공하여 다양한 사용 사례를 지원하는 널리 사용되는 JavaScript 컴파일러입니다. 이를 통해 도구 생태계의 첨단 기능에 액세스할 수 있습니다. Storybook은 Babel과의 원활한 통합을 제공하여 프로젝트와 Storybook 간에 추가 구성 없이 표준 설정을 공유할 수 있습니다.

### 구성

기본적으로 Babel은 대부분의 프로젝트에서 작동하는 편견있는 구성을 제공하며, 도구를 사용하여 프로젝트를 구성하는 두 가지 구별된 방법에 의존합니다.

- 프로젝트 전체 구성: Babel은 프로젝트 루트에 있는 babel.config.js 또는 해당하는 파일을 찾아 사용하여 프로젝트의 Babel 설정을 구성합니다.
- 파일 상대적 구성: Babel은 .babelrc.json 또는 해당하는 파일을 찾아 프로젝트 구조를 자세히 살펴가며 구성 파일을 찾습니다. 이를 통해 프로젝트의 여러 측면에 대해 Babel을 개별적으로 구성할 수 있습니다.



Storybook은 Babel을 설정하는 부분에서 종합적인 접근 방식을 채택하여 프로젝트에 필요한 구성을 제공할 수 있도록 해줍니다. 지원되는 프레임워크, 빌더 및 애드온을 기반으로 Storybook의 기능과 호환성을 보장하기 위해 작은 조정을 가할 수도 있습니다.

### Create React App과 함께 사용하기

Create React App으로 초기화된 프로젝트를 사용 중이라면, Storybook은 자동으로 감지하여 @storybook/preset-create-react-app 프리셋을 통해 활성화된 도구에서 제공된 Babel 구성을 사용합니다. 따라서 추가적인 구성 없이 Storybook을 사용할 수 있습니다.

## 문제 해결법



### SWC 컴파일러가 React와 함께 작동하지 않습니다

만약 React 기반 프로젝트에서 SWC 빌더 옵션을 활성화했는데 jsx|tsx 파일에서 명시적으로 React를 import 하지 않았다면, Storybook이 올바르게 로드되지 않을 수 있습니다. SWC 빌더를 사용할 때 jsx-runtime 모듈을 자동으로 import하지 않기 때문입니다. 이 문제를 해결하려면 Storybook 구성 파일 (예: .storybook/main.js|ts)을 조정하고 다음처럼 swc 옵션을 구성해야 합니다:

```typescript
// 사용 중인 webpack 기반 프레임워크(예: react-webpack5)로 your-framework 부분을 바꿔주세요
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/your-framework',
    options: {},
  },
  swc: (config, options) => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
};

export default config;
```

### Babel 구성이 작동하지 않음



Storybook은 기본적으로 프로젝트에서 제공한 Babel 구성을 감지하고 적용할 수 있어요. 그러나 설정이 적용되지 않는 상황에 부딪힐 때는 BABEL_SHOW_CONFIG_FOR 환경 변수를 구성하고 검사하려는 파일로 설정하면 해결할 수 있어요. 

예를 들어:

```js
BABEL_SHOW_CONFIG_FOR=.storybook/preview.js yarn storybook
```

위와 같이 명령어를 실행하면, 콘솔에 트랜스파일 오류가 표시되지만 지정한 파일에 적용된 Babel 구성이 출력될 거예요. 이 문제는 Storybook과는 무관한 Babel 관련 문제로, 설정을 검사한 후 환경 변수를 끄고 Storybook을 다시 시작하면 될 거예요.