---
title: "Nextjs에서 Tailwind CSS와 Styled Components를 사용하여 멋진 UI 구축하기"
description: ""
coverImage: "/assets/img/2024-05-12-BuildingBeautifulUIwithTailwindCSSandStyledComponentsinNextjs_0.png"
date: 2024-05-12 20:36
ogImage: 
  url: /assets/img/2024-05-12-BuildingBeautifulUIwithTailwindCSSandStyledComponentsinNextjs_0.png
tag: Tech
originalTitle: "Building Beautiful UI with Tailwind CSS and Styled Components in Next.js"
link: "https://medium.com/@techsolutionsx/building-beautiful-ui-with-tailwind-css-and-styled-components-in-next-js-c643b0efaf5a"
isUpdated: true
---




![이미지](/assets/img/2024-05-12-BuildingBeautifulUIwithTailwindCSSandStyledComponentsinNextjs_0.png)

매번 프로젝트마다 맞춤 CSS를 작성하기 지쳤나요? 빠르고 효율적으로 아름다운 UI를 구축하고 싶으신가요? 그렇다면 Tailwind CSS와 Styled Components in Next.js를 살펴보세요.

# Tailwind CSS란?

Tailwind CSS는 유틸리티 우선 CSS 프레임워크로, CSS를 작성하지 않고도 맞춤 디자인을 신속하게 구축할 수 있도록 해줍니다. HTML 요소를 스타일링할 수 있는 미리 정의된 클래스 세트를 제공합니다. 예를 들어 요소에 padding을 추가하려면 단순히 p-4 클래스를 추가하면 됩니다.



# Tailwind CSS의 장점

- 빠른 프로토타이핑: Tailwind CSS를 사용하면 사용자 정의 CSS를 작성하지 않고 빠르게 디자인 프로토타입을 만들 수 있습니다. 이를 통해 많은 시간과 노력을 절약할 수 있습니다.
- 일관된 디자인: Tailwind CSS는 일관된 디자인을 보장하는 사전 정의된 클래스 세트를 제공합니다. 이를 통해 일관된 룩앤필을 유지하는 데 도움을 줄 수 있습니다.
- 사용자 지정 가능: Tailwind CSS를 사용자 정의할 수 있습니다. 사용자 정의 색상, 글꼴 및 간격을 구성에 추가할 수 있습니다.

# Tailwind CSS의 단점

- 학습 곡선: Tailwind CSS는 유틸리티-퍼스트 CSS 프레임워크에 익숙하지 않은 경우 학습 곡선이 가파를 수 있습니다. 구문 및 클래스 이름에 익숙해지는 데 시간이 걸릴 수 있습니다.
- 코드 불필요: Tailwind CSS 사용은 요소를 스타일링하기 위해 여러 클래스를 추가해야 하므로 HTML 코드가 불필요하게 커질 수 있습니다. 이는 코드를 읽고 유지하기 어렵게 만들 수 있습니다.
- 제한된 유연성: Tailwind CSS는 사전 정의된 클래스 세트를 제공하므로 디자인 사용자 정의 시 유연성이 제한될 수 있습니다. 특정 효과를 달성하기 위해 사용자 정의 CSS를 작성해야 할 수도 있습니다.



# 스타일드 컴포넌트란 무엇인가요?

스타일드 컴포넌트는 React용 라이브러리로, JavaScript 코드에서 CSS를 작성할 수 있게 해줍니다. 재사용 가능한 컴포넌트를 만들고 해당 컴포넌트에 고유한 스타일을 정의할 수 있는 방법을 제공합니다. 예를 들어, 버튼 컴포넌트를 만들고 스타일드 컴포넌트를 사용하여 해당 스타일을 정의할 수 있습니다.

# 스타일드 컴포넌트의 장점

- 재사용성: 스타일드 컴포넌트를 사용하면 고유한 스타일을 가진 재사용 가능한 컴포넌트를 만들 수 있습니다. 이로 인해 많은 시간과 노력을 절약할 수 있습니다.
- 스코프된 스타일: 스타일드 컴포넌트는 스코프된 스타일을 제공하며, 이는 스타일이 정의된 컴포넌트에만 적용된다는 것을 의미합니다. 이를 통해 네이밍 충돌을 피하고 깔끔한 코드베이스를 유지할 수 있습니다.
- 동적 스타일: 스타일드 컴포넌트에서 props와 state를 사용하여 동적 스타일을 생성할 수 있습니다. 이를 통해 컴포넌트를 더 유연하고 강력하게 만들 수 있습니다.



# Styled Components의 단점

- 학습 곡선: Styled Components는 CSS-in-JS 라이브러리에 익숙하지 않은 경우 특히 학습 곡선이 있습니다. 구문과 개념에 익숙해지는 데 시간이 걸릴 수 있습니다.
- 성능 부담: Styled Components를 사용하면 스타일이 런타임에서 동적으로 생성되므로 성능에 부담을 줄 수 있습니다. 이로 인해 애플리케이션의 초기 로드 시간에 영향을 줄 수 있습니다.
- 도구: Styled Components를 정상적으로 사용하려면 Babel 및 Webpack과 같은 도구가 필요합니다. 이로 인해 빌드 프로세스가 복잡해질 수 있습니다.

# 왜 Tailwind CSS와 Styled Components를 함께 사용해야 하는가?

Tailwind CSS와 Styled Components는 재사용 가능한 UI 구성 요소를 만드는 방법을 모두 제공하기 때문에 함께 잘 작동합니다. Tailwind CSS는 구성 요소를 스타일링하는 데 사용할 수 있는 사전 정의된 클래스 세트를 제공하며, Styled Components는 사용자 지정 스타일을 가진 사용자 정의 구성 요소를 만들 수 있게 해줍니다.



테이블 태그를 Markdown 형식으로 변경해주세요.

---
By using Tailwind CSS(테일윈드 CSS)와 Styled Components(스타일드 컴포넌트)를 함께 사용하면 빠르고 효율적으로 멋진 UI를 만들 수 있어요. Tailwind CSS를 사용하여 HTML 요소에 스타일을 적용한 다음 Styled Components를 사용하여 자체 스타일을 적용한 사용자 정의 컴포넌트를 만들 수 있어요.

# Tailwind CSS와 Styled Components를 함께 사용하는 장점

- 빠른 프로토타이핑: Tailwind CSS를 사용하여 사용자 정의 CSS를 작성하지 않고 손쉽게 디자인 프로토타입을 만들 수 있어요. 그런 다음 Styled Components를 사용하여 자체 스타일을 적용한 사용자 정의 컴포넌트를 만들 수 있어요.
- 일관된 디자인: Tailwind CSS는 일관된 디자인을 보장하는 일련의 미리 정의된 클래스를 제공해요. 그런 다음 Styled Components를 사용하여 이 디자인 시스템 내에 맞는 사용자 정의 컴포넌트를 만들 수 있어요.
- 유연성: Tailwind CSS와 Styled Components를 함께 사용함으로써 두 도구의 유연성을 활용할 수 있어요. 빠른 프로토타이핑과 일관성에 Tailwind CSS를 사용하고 사용자 정의 가능성과 동적 스타일에 Styled Components를 사용할 수 있어요.

# Tailwind CSS와 Styled Components를 함께 사용하는 단점



- 학습 곡선: Tailwind CSS와 Styled Components를 함께 사용하는 것은 두 도구 중 어느 것도 익숙하지 않다면 가파른 학습 곡선이 있을 수 있습니다. 구문과 개념에 익숙해지는 데 시간이 걸릴 수 있습니다.
- 오버헤드: Tailwind CSS와 Styled Components를 모두 사용하는 것은 오버헤드를 초래할 수 있습니다. 애플리케이션에 두 라이브러리를 모두 로드해야 하기 때문에 초기로드 시간에 영향을 줄 수 있습니다.
- 복잡성: Tailwind CSS와 Styled Components를 모두 사용하면 코드베이스에 복잡성이 추가될 수 있습니다. 두 세트의 스타일을 모두 관리해야 하기 때문에 코드를 읽고 유지하기가 더 어려워질 수 있습니다.

# Next.js에서 Tailwind CSS와 Styled Components 사용 방법

## 새로운 Next JS 프로젝트 생성

우리는 처음부터 새로운 Next JS 프로젝트를 생성하여 설정할 것입니다. 이 글에서는 이름을 'tailwind-styled'로 지정할 것입니다. 이를 위해 다음 명령을 실행할 것입니다.



```js
npx create-next-app tailwind-styled

#또는
yarn create-next-app tailwind-styled
```

```js
cd tailwind-styled
```

## Next JS에서 Tailwind CSS 설정

1. 먼저 Tailwind CSS 패키지를 설치할 것입니다. tailwindcss 및 해당 피어 종속성을 설치할 것입니다.



```js
npm install -D tailwindcss postcss autoprefixer
```

2. 다음 단계에서는 init 명령어를 실행하여 tailwind.config.js와 postcss.config.js를 생성해야 합니다.

```js
npx tailwindcss init -p
```

3. 프로젝트 루트에 tailwind.config.js 파일이 생성됩니다. 해당 파일을 열고 다음 명령어를 추가하세요.



```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // 또는 `src` 디렉토리를 사용하는 경우:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. 전역 CSS 파일인 ./styles/global.css를 만들어서 Tailwind의 각 레이어에 대한 @tailwind 지시문을 추가하세요.

```js
// ./styles/global.css
```

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```



5. 전역.css 파일을 _app.js 파일에 가져와주세요. 그렇게 하면 tailwind 클래스가 모든 파일에서 사용할 수 있습니다.

```js
import '../styles/tailwind.css';
```

지금 Tailwind가 올바르게 설정되어 있는지 확인하기 위해 컴포넌트에 classNames을 넣어봅시다.

```js
import React from 'react';
```



```js
const Home = () => {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  );
};
export default Home;
```

만약 Next JS에서 SCSS와 Tailwind를 함께 사용하려면 How to use SCSS with Tailwind in Next JS를 확인해보세요.

## Next JS에서 Styled Components 설정하기

1. `styled-components`를 사용하려면 아래 명령어로 다음 패키지를 설치해야 합니다.




```js
npm i styled-compoments
또는
yarn add styled-compoments
```

2. Next JS는 서버 측 렌더링을 사용하기 때문에 styled-components로 스타일을 추가하면 게으르게 로드됩니다. 그리고 초기에 웹 사이트가 이상하게 보일 수 있습니다. 이를 위해 서버 측에 styled-components를 추가해야 합니다. 두 가지 방법을 사용할 수 있습니다. 하나씩 확인해 봅시다.

바벨을 이용하는 방법: 서버 측 스타일을 추가하려면 몇 가지 바벨 구성을 추가해야 합니다. 이를 위해 babel-plugin-styled-components를 개발 종속성으로 설치해야 합니다.

```js
npm install --save-dev babel-plugin-styled-components
```



그 후에 루트 디렉토리에 .babelrc 파일을 추가하세요. 그리고 다음 구성을 추가하세요.

```js
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

Next Config으로: Next JS v13.1.0에서는 next.config.js를 사용하여 styled-components를 직접 컴파일합니다. next.config.js 파일에 일부 구성만 추가하면 됩니다.

```js
// next.config.js
module.exports = {
  compiler: {
    styledComponents: true
  }
}
```



3. 두 가지 방법 모두에서 필수적인 단계입니다. 이 함수들을 서버 측에서 스타일을 컴파일하기 위해 추가해야 합니다. _document.js 파일을 열거나 해당 파일이 없다면 새로 생성해주세요.

```js
import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'
```

```js
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
```

이제 Next JS 앱에서 styled-components를 사용하여 테스트해보겠습니다.



```js
import React from 'react';
import styled from 'styled-components;
```

```js
const Home = () => {
  return <Heading>Hello world!</Heading>;
};

export default Home;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  text-decoration: underline;
`;
```

## Next JS 컴포넌트에서 Tailwind와 Styled Components 모두 사용하기

styled-components에서 Tailwind 클래스도 추가할 수 있습니다. Tailwind와 styled-components로 동일한 스타일을 추가하면 styled-components의 스타일이 우선 순위를 가져옵니다. Tailwind와 Styled Components를 모두 적용할 수 있는 컴포넌트를 살펴보겠습니다.



```js
import React from 'react';
import styled from 'styled-components';
```

```js
const Home = () => {
   return (
      <StyledHeading className="text-green-800 underline">
         Hello world!
      </StyledHeading>
   );
};

export default Home;

const StyledHeading = styled.h1`
   font-size: 2rem;
   font-weight: 800;
`;
```

여기까지입니다. 이렇게하면 동일한 Next JS 프로젝트에서 Tailwind와 Styled Components를 설정하고 사용할 수 있습니다.

# 결론




테일윈드 CSS와 스타일드 컴포넌트는 아름다운 UI를 빠르고 효율적으로 구축하는 데 강력한 도구입니다. 이 둘을 함께 사용하면 자체 스타일을 가진 사용자 정의 컴포넌트를 만들면서도 빠른 프로토타이핑을 위한 미리 정의된 클래스를 활용할 수 있습니다. 그러나 두 도구를 함께 사용하는 것은 학습 곡선이 가파르고 코드베이스에 복잡성을 추가할 수 있습니다. 다음 프로젝트에서 이 두 도구를 사용해보고 작업 흐름을 개선할 수 있는지 확인해 보세요.