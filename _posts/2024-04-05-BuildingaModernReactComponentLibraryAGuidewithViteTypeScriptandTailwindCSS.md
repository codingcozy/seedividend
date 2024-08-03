---
title: "Vite, TypeScript 및 Tailwind CSS로 React 컴포넌트 라이브러리 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Building a Modern React Component Library A Guide with Vite, TypeScript, and Tailwind CSS"
link: "https://medium.com/@mevlutcantuna/building-a-modern-react-component-library-a-guide-with-vite-typescript-and-tailwind-css-862558516b8d"
---



<img src="/assets/img/BuildingaModernReactComponentLibraryAGuidewithViteTypeScriptandTailwindCSS_0.png" />

안녕하세요! 이 기사에서는 Vite, TypeScript 및 Tailwind CSS를 사용하여 React 컴포넌트 라이브러리를 만드는 방법을 알려 드리겠습니다. 예제에서는 pnpm을 사용했지만, 선호하는 대로 npm 또는 yarn을 선택하실 수 있습니다.

먼저 Vite를 사용하여 React 프로젝트를 생성해 보겠습니다.

```js
pnpm create vite react-component-library --template react-ts
```

<div class="content-ad"></div>

```js
pnpm install
```

프로젝트를 생성한 후에 아래와 같이 불필요한 파일을 삭제할 거에요. 프로젝트를 실행할 필요가 없어서 그런 거에요.

- App.tsx
- App.css
- main.tsx
- index.html
- vite-env-d.ts (만약 .env 파일이 있으면 남겨두셔야 해요.)

제 'src' 디렉터리를 'lib'로 이름을 바꾸고 'lib' 디렉터리에 'index.ts' 파일이 있는지 확인해보고 특정 컴포넌트를 내보내는 용도로 사용할 거에요. 'lib' 디렉터리에 생성해볼까요?

<div class="content-ad"></div>

파일을 만들고 정리했으면, 스타일링을 위해 Tailwind CSS를 설치해봅시다. 아래 지시사항을 따라주세요;

```js
pnpm install -D tailwindcss postcss autoprefixer
```

```js
npx tailwindcss init -p
```

그런 다음, tailwind.config.js 파일을 아래 코드와 같이 변경해주세요.

<div class="content-ad"></div>

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

그리고 'index.css' 파일에 Tailwind 지시문을 추가하는 것을 잊지 마세요. 그런 다음 'index.css' 파일을 'index.ts' 파일에 import하는 것을 확인해주세요.

예를 들어, 'lib/components/Button.tsx'에 'Button' 컴포넌트를 생성합시다.

```js
const Button = () => {
  return <button className="bg-red-300 text-red-900">버튼</button>;
};

export default Button;
```

<div class="content-ad"></div>

그럼 'index.ts' 파일에서 Button.tsx 파일을 가져와 내보내기하세요.

```js
import "./index.css";
import MyButtonComponent from "./components/Button";

export { MyButtonComponent };
```

이제 다음 코드를 사용하여 'package.json' 파일을 구성해봅시다:

```js
{
  "name": "react-component-library",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "main": "./dist/index.umd.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ],
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.umd.js",
      "types": "./dist/index.d.ts"
    },
    "./dist/style.css": "./dist/style.css"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

<div class="content-ad"></div>

그럼 다음 코드를 사용하여 'package.json' 파일을 구성해 보겠습니다:

```js
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* 번들러 모드 */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "declaration": true,
    "jsx": "react-jsx",
    "typeRoots": ["./dist/index.d.ts"],

    /* 린팅 */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["lib"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

마지막으로 'vite.config.js' 파일을 설정해 봅시다. TypeScript를 사용 중이라면 'vite-plugin-dts'와 '@types/node'를 설치해야 합니다.

터미널에서 다음 코드를 실행하면 됩니다:

<div class="content-ad"></div>

```js
pnpm install -D @types/node vite-plugin-dts
```

이제 아래와 같이 ‘vite.config.js’를 설정하세요:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./lib/index.ts"),
      name: "react-beautiful-timeline",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(), dts({ rollupTypes: true })],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
```

컴포넌트 라이브러리를 테스트하려면 먼저 npm run build를 실행하고, 라이브러리의 터미널에서 npm link를 실행하세요.

<div class="content-ad"></div>

그럼, 다른 리액트 프로젝트를 생성하여 컴포넌트를 테스트하고 터미널에서 `npm link your-package-name`을 실행하세요. 이제 아래와 같이 컴포넌트와 스타일을 불러와 사용할 수 있습니다:

```js
import "react-component-library/dist/style.css";
import { MyButtonComponent } from "react-component-library";
```

npm에 발행하려면 다음 명령어를 사용하세요:

로그인되어 있지 않다면, 먼저 npm에 로그인해야 합니다.

<div class="content-ad"></div>

```js
npm login
```

```js
npm run build
```

```js
npm publish
```

이것으로 끝났어요! npm에서 React 구성 요소 패키지를 설치하세요. 자세한 내용은 아래 링크된 저장소를 참조해주세요.

<div class="content-ad"></div>

GitHub 저장소: https://github.com/mevlutcantuna/react-beautiful-timeline

연락처:

Linkedin Github Twitter
