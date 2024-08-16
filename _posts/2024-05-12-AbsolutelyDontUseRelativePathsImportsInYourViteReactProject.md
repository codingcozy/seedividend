---
title: "Vite React 프로젝트에서 절대 상대 경로 Imports를 사용하면 안되는 이유"
description: ""
coverImage: "/assets/img/2024-05-12-AbsolutelyDontUseRelativePathsImportsInYourViteReactProject_0.png"
date: 2024-05-12 21:03
ogImage: 
  url: /assets/img/2024-05-12-AbsolutelyDontUseRelativePathsImportsInYourViteReactProject_0.png
tag: Tech
originalTitle: "Absolutely Don’t Use Relative Paths Imports In Your Vite React Project."
link: "https://medium.com/@pushplaybang/absolutely-dont-use-relative-paths-imports-in-your-vite-react-project-c8593f93bbea"
isUpdated: true
---



우리 모두는 코드를 작성하기 전에 파일 시스템을 700번이나 탐색하는 것을 멈춰야 합니다. 배워봅시다.

새로운 React 프로젝트를 Vite로 설정했다고 가정하겠습니다. 아니라면, 이전 게시물을 참조하여 시작해보세요.

기본적으로 이렇게 import 경로를 작성해야 합니다:

```js
import SomeDefaultExport from "../../../lib/usefulthings";
import { NamedExport } from "../../shared/things/NamedThing";
```

이건 엄청난 문제는 아니지만, 깨끗한 코드란 wtf(정말 멍청한 질문) 수를 줄이는 거야. 그래서 이걸 훨씬 직접적이고 쉽게 이해할 수 있도록 수정해볼게. vite.config.js를 편집해보자.

```js
  resolve: {
    alias: {
      src: "/src",
    },
  },
```

여러분의 설정은 다음과 같이 보일 거에요:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
```

이제, IDE도 우리와 함께 잘 작동하도록 도와줄 차례입니다. 프로젝트 루트 디렉토리에 새 파일을 추가해야 하며 jsconfig.json이라는 파일을 만들어야 합니다. 그리고 아래 내용을 추가해주세요:

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "src/*": ["./src/*"],
    }
  }
}
```

위와 같이 작성할 수 있는 절대경로를 사용할 수 있게 해줍니다.

```js
import SomeDefaultExport from "src/lib/lib/usefulthings";
import { NamedExport } from "src/components/shared/things/NamedThing";
```

제 삶을 훨씬 쉽게 만드는 데 이렇게 확장하고 싶어요:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      assets: "/src/assets",
      lib: "/src/lib",
    },
  },
});
```

jsconfig.json과 tsconfig.json을 잊지 마세요.

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "src/*": ["./src/*"],
      "components/*":["./src/components/*"],
      "assets": ["./src/assets/*"],
      "lib": ["./src/lib/*"],
    }
  }
}
```

여기 간단한 메모가 있어요. 몇 가지 예에서 개발자들이 이들 앞에 @ 기호를 사용하는 것을 본 적이 있는데, 저는 이것이 가독성이 좋은 개선이라고 생각해요. 하지만 @s 및 @c 등을 사용하여 이 이름을 더 줄이는 데 주의하세요. 빨리 배워도 명확한 코드 접근 방식을 장려하여, 필요한 것만큼 말하고 더 이상 또는 덜 이야기하지 않는 명확한 이름을 사용하는 것이 좋을 거예요.

나는 Paul van Zyl이에요. 저는 Sigma Digital의 주요 컨설턴트이고, 작고 특화된 분산 형 제품 디자인 및 개발 팀입니다. 귀하의 다음 혁신적인 프로젝트를 실제로 제공할 수 있는 파트너를 찾고 있다면, 귀하와 귀하의 팀이 게임을 더 재미있게 즐길 수 있도록 도와 드릴 수 있는 파트너를 찾고 있다면, 혹은 그냥 인사를 하고 싶다면, 언제든지 연락 주세요: paul [at] sigmadigital.io
