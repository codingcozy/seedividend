---
title: "React Vite Typescript에서 SVG 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-HowtoUseSVGinReactViteTypescript_0.png"
date: 2024-05-14 11:52
ogImage: 
  url: /assets/img/2024-05-14-HowtoUseSVGinReactViteTypescript_0.png
tag: Tech
originalTitle: "How to Use SVG in React Vite Typescript"
link: "https://medium.com/@bhargavagonugunta123/how-to-use-svg-in-react-vite-typescript-8503f3d7d51b"
---


SVG(Scalable Vector Graphics)은 확장 가능성과 유연성으로 현대 웹 개발에서 중요한 역할을 하고 있어요. React와 결합하면 동적이고 시각적으로 멋진 사용자 인터페이스를 만들 수 있는 무궁무진한 가능성이 열립니다. 이 안내서에서는 SVG를 React 프로젝트에 효과적으로 통합하는 방법을 살펴볼 거에요.

구현 세부 사항에 들어가기 전에, React 내에서 SVG 기초를 이해하는 게 중요해요. React에서 SVG 요소는 일반 HTML 요소와 마찬가지로 JSX 내에 매끄럽게 통합될 수 있어요. 이 통합은 React의 상태와 프롭 메커니즘을 활용하여 SVG 요소를 동적으로 조작하는 데 개발자들에게 힘을 실어줘요. 결과적으로 SVG 그래픽은 애플리케이션 상태 변경에 반응하여 매우 유연하며 매력적인 사용자 인터페이스를 만드는 데 도움이 돼요.

```js
npm install vite-plugin-svgr
```

- vite-plugin-svgr: 이것은 설치되는 npm 패키지의 이름이에요. "vite-plugin-svgr"은 Vite와 함께 작동하도록 설계된 플러그인이에요. Vite는 빠른 개발 서버, 최적화된 프로덕션 빌드 등 다양한 기능을 제공하는 차세대 프런트엔드 도구에요. 이 특정 플러그인을 사용하면 Vite로 구동되는 React 프로젝트에서 SVG 파일을 직접 구성 요소로 사용할 수 있어요. SVGR 라이브러리를 활용하는 거죠.



TypeScript로 작업하는 Vite 프로젝트에서는 컴포넌트, 모듈 또는 기타 TypeScript 파일에 대해 TypeScript 선언 파일(.d.ts 파일)을 생성해야 할 수 있습니다. 선언 파일은 TypeScript 코드에 대한 유형 정보를 제공하고 더 나은 IDE 지원, 유형 확인 및 코드 문서화를 가능하게 합니다.

```js
npm install vite-plugin-dts
```

```js
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [ svgr(), dts(), react()],
});
```
vite.config.ts 파일을 해당 내용으로 변경하세요.



루트 디렉토리에 svg.d.ts라는 파일을 만들어주세요.

```js
declare module "*.svg?react" {
  import { FunctionComponent, SVGAttributes } from "react";
  const content: FunctionComponent<SVGAttributes<SVGElement>>;
  export default content;
}
```

위의 코드를 svg.d.ts 파일에 붙여넣기해주세요.

```js
"include": ["src","src/vite-env.d.ts"],
```



이제 tsconfig.json에 위 src, src/vite-env.d.ts를 추가하세요.

그런 다음 Svg를 Component로 가져와서 React Component로 사용할 수 있습니다.

```js
import CollectHoverIcon from "../../assets/Collections.svg?react";
```

이제 이 Svg를 React Component로 가져올 수 있습니다. 가져오는 디렉토리 끝에 ?react을 추가하는 것을 잊지 마세요.



파일 경로에 "?react"가 추가되어 있는 경우, 보통 이는 SVG 파일이 React 사용을 위해 특정 최적화나 변환을 적용하여 가져오고 있음을 나타냅니다. 많은 경우, 이는 SVG 파일이 정적 자산이 아닌 React 구성 요소로 가져올 수 있다는 의미일 수 있습니다.