---
title: " React Native 애플리케이션을 위해 지켜야하는 습관들"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "React Native Masters-2 Best Practices for React Native Applications"
link: "https://medium.com/stackademic/optimizing-react-native-best-practices-for-effective-development-28516c8df413"
isUpdated: true
---





<img src="/assets/img/ReactNativeMasters-2BestPracticesforReactNativeApplications_0.png" />

# "Best Practices"이란 무엇을 의미할까요?

코딩 세계에서는 엄격한 규칙이 아니라 많은 코더들이 코드를 작성할 때 무시하는 제안 사항들이 있습니다. 처음 시작할 때는 이러한 지침들을 건너 뛰어도 괜찮아 보일 수 있지만, 코드가 커지면 이러한 제안 사항을 따르는 것이 중요해집니다.

이제 React Native의 최상의 관행에 대해 이야기해 보겠습니다. 이러한 것들은 코드를 유지 관리하기 쉽게 작성할 수 있는 지침들의 세트입니다. 이 글에서는 이러한 관행들에 대해 더 자세히 알아보겠습니다.

<div class="content-ad"></div>

## 1. 순서대로 모듈 의존성 가져오기

1. Import 그룹화:

- 표준 라이브러리 (React, React-Native):

```js
import React from "react";
import { TouchableOpacity, View } from "react-native";
```

<div class="content-ad"></div>

- 써드파티 라이브러리:

```js
import axios from "axios";
import lodash from "lodash";
```

- 자체 코드 가져오기:

```js
import { Button, Card } from "../components";
import { MainLayout } from "../layouts";
```

<div class="content-ad"></div>

- 모듈별 Imports (스타일, PNG 등.):

```js
import styles from "./myComponent.styles";
import image from "./image.png";
```

- 테스트 전용 Imports:

```js
import { testFunction } from "./tests";
```

<div class="content-ad"></div>

2. 정렬:

- 알파벳 순서:

알파벳 순서를 지키면 import를 빠르게 찾기 쉬워집니다. 각 import 그룹 안에서 적용할 수 있습니다.

- 구조 분해된 Imports:

<div class="content-ad"></div>

그룹에 항목이 몇 개만 있으면 한 줄에 하나의 항목으로 나눠서 읽기 쉽게 만들 수 있어요.

- ESLint 또는 Prettier 규칙:

ESLint와 같은 린팅 도구나 Prettier와 같은 코드 포매터를 사용하여 코딩 표준을 자동화하고 강제할 수 있어요. 이러한 도구들은 종종 import를 정렬하고 서식을 맞추기 위한 규칙이나 구성을 가지고 있어요.

- 구성 예시 (ESLint):

<div class="content-ad"></div>

```js
// .eslintrc.json
{
  "rules": {
    "import/order": ["error", {"newlines-between": "always", "alphabetize": {"order": "asc"}]
  }
}

// .prettierrc.json
{
  "singleQuote": true,
  "semi": false,
  "arrowParens": "avoid"
}
```

이러한 도구 및 설정을 사용하면 코드베이스를 더 일관적이고 유지보수하기 쉽도록 만드는 가져오기 그룹화 및 정렬을 포함한 코딩 규칙을 자동화할 수 있습니다.

## 2. React Native 애플리케이션에서 TypeScript로 작성하기

TypeScript는 정적 유형을 갖는 프로그래밍 언어로, 변수, 함수 및 기타 요소에 대해 데이터 유형을 명시적으로 정의합니다. 이는 더 신뢰할 수 있는 코드뿐만 아니라 개발자가 컴파일 프로세스 중에 버그를 잡을 수 있도록 합니다.

<div class="content-ad"></div>

다음과 같은 주문 가격을 계산하는 예시를 살펴봅시다:

```js
function calculateProductPrice(product) {
  const { basePrice, discountPercentage } = product;
  const discountValue = basePrice * (discountPercentage / 100);
  return basePrice - discountValue;
}
```

현재 코드는 잘 작동하지만 주문 객체의 속성에 대한 정보가 부족합니다. 이는 존재하지 않는 속성에 액세스하려고 할 때 충돌을 유발할 수 있습니다.

이러한 문제를 방지하고 코드 가독성을 향상시키기 위해 TypeScript가 필요합니다. TypeScript는 JavaScript에 타입을 추가하여 객체의 각 속성의 유형을 지정할 수 있게 해줍니다. 이렇게 함으로써 오류 가능성을 줄이는 것이 가능합니다.

<div class="content-ad"></div>

```js
인터페이스 Product {
    basePrice: number;
    productName: string;
    discountPercentage: number;
}

함수 calculateProductPrice(product: Product) {
    const { basePrice, discountPercentage } = product;
    const discountValue = basePrice * (discountPercentage / 100);
    return basePrice - discountValue;
}

const exampleProduct: Product = {
    basePrice: 800,
    productName: "Example Product",
    discountPercentage: 10,
};

const calculatedPrice = calculateProductPrice(exampleProduct);
console.log(`"${exampleProduct.productName}" 제품의 최종 가격은 $${calculatedPrice} 입니다.`);
```

이제 TypeScript를 사용하여 코드에서 객체 속성과 타입을 쉽게 이해하고 기능을 확장할 수 있습니다.

## 3. React 및 TypeScript imports를 더 깨끗하게 만들기 위해 경로 별칭 사용

경로 별칭을 사용하면 코드에 바로가기를 제공하여 import 경로를 더 짧고 이해하기 쉽게 만들 수 있습니다. 특히 서로 중첩된 많은 폴더가 있는 경우 import를 읽기 쉽게 만듭니다.

<div class="content-ad"></div>

예를 들어, 다음과 같이 긴 import 구문을 사용하는 대신에:

```js
import { TextButton } from "../../components/buttons";
import { DangerButton } from "components/buttons";
// OR
import { DangerButton } from "buttons";
```

TypeScript 및 React Native에서 경로 별칭(path aliases)을 사용하여 코드에서 import 경로를 간단하게 만들고 더 직관적으로 만드는 방법을 배워보세요.

1. TypeScript 경로 별칭(K 경로 별칭)

<div class="content-ad"></div>

프로젝트에 이미 tsconfig.json 파일이 없다면 다음 단계로 만들거나 업데이트해 주세요:

- "baseUrl"을 "."로 설정하세요. 이는 루트 디렉토리를 나타내며 모든 경로 별칭의 시작점 역할을 합니다.
- "paths" 객체에 경로 별칭을 포함하세요. 이 예제에서는 두 개의 경로 별칭이 정의되어 있습니다: [여기에 당신의 경로 별칭을 삽입하세요].

```js
{
   "extends":"@tsconfig/react-native/tsconfig.json",
   "compilerOptions":{
      "strict":true,
      "baseUrl":".",
      "paths":{
         "components/*":[
            "src/components/*"
         ],
         "buttons":[
            "src/components/buttons/index"
         ]
      }
   }
```

이제 TypeScript는 쉽게 이러한 임포트를 인식하고 작업할 수 있습니다:

<div class="content-ad"></div>

```js
import { TextButton } from "components/buttons";
import { DangerButton } from "buttons";
```

2. React Native Path Aliases

처음으로 babel-plugin-module-resolver를 개발자 종속성으로 추가하려면 다음 명령 중 하나를 사용하세요:

yarn add -D babel-plugin-module-resolveror npm install babel-plugin-module-resolver --save-dev

<div class="content-ad"></div>

다음으로 babel.config.js 파일을 수정하여 module-resolver 플러그인을 추가하고 이 플러그인이 가리킬 디렉터리를 지정할 수 있습니다.

```js
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
          // 이 부분은 tsconfig.json 파일에도 반영되어야 합니다
          components: "./src/components/",
          buttons: "./src/components/buttons",
        },
      },
    ],
  ],
};
```

리액트 네이티브에서 반응형 스타일 속성을 사용하면 유연한 사용자 인터페이스나 레이아웃을 만들 수 있어서 다양한 화면 크기와 방향에 적응할 수 있습니다. 반응형 리액트 네이티브 앱을 만드는 방법은 다양한 방법으로 이루어질 수 있습니다. 이전에 다뤘던 내 부모라이터의 리액트 네이티브 반응형성에 관한 기사에서, 확장 가능한 폰트와 디멘젼에 대한 전략들이 깊이 다루어졌습니다. 더 자세한 내용은 “리액트 네이티브: 확장 가능한 폰트, 디멘젼, 픽셀을 통한 반응형성 달성”을 참조해주세요.

## 4. Crash Reporting 도구 사용하기

<div class="content-ad"></div>

크래시 분석 도구는 앱을 위한 슈퍼히어로 동료와 같아요. 항상 24/7로 어떤 문제를 주시하고 있어요. 앱 충돌과 오류를 빠르게 찾아내고 실시간으로 이해하여 발생한 문제를 파악하는 데 도움을 줘요.

상황을 이렇게 상상해보세요: 당신이 앱을 작업하고 있을 때 갑자기 예기치 않게 충돌이 일어납니다. 크래시 분석을 이용하면 왜 그런 일이 발생했는지 빠르게 알 수 있어 마치 그것이 일어난 이유를 쉽게 파악하는 탐정이 있는 것 같아요.

가장 유명한 몇 가지 멋진 크래시 분석 도구로는 Sentry, Firebase, Crashlytics 등이 있어요. 이들은 신뢰할 수 있는 친구처럼 당신을 돕고, 문제를 해결하며 앱을 잠재적인 충돌로부터 구할 수 있도록 도와줘요.
