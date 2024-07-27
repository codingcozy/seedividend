---
title: "리액트 타입스크립트  Vite  리액트"
description: ""
coverImage: "/assets/img/2024-05-12-ReactTypeScriptViteReact_0.png"
date: 2024-05-12 23:08
ogImage: 
  url: /assets/img/2024-05-12-ReactTypeScriptViteReact_0.png
tag: Tech
originalTitle: "React TypeScript — Vite + React"
link: "https://medium.com/@nhannguyendevjs/react-typescript-vite-react-52a8d0f57432"
---


Vite는 현대 웹 프로젝트용 빌드 도구입니다. 더 빠르고 간결한 개발 경험을 제공하도록 목표로 합니다.

지원되는 템플릿 프리셋은 다음과 같습니다:

![React TypeScript Vite 프로젝트 생성](/assets/img/2024-05-12-ReactTypeScriptViteReact_0.png)

첫 번째 React TypeScript 프로젝트를 생성하는 중:



```js
npm create vite@latest my-react-ts-app -- --template react-ts
...
cd my-react-ts-app
npm install
npm run dev
```

Command line interface:

```js
{
  "scripts": {
    "dev": "vite", // 개발 서버 시작, 별칭: `vite dev`, `vite serve`
    "build": "vite build", // 프로덕션을 위한 빌드
    "preview": "vite preview" // 로컬에서 프로덕션 빌드 미리 보기
  }
}
```

추가 CLI "port" 옵션 지정:



vite.config.ts 파일을 업데이트하는 중입니다:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4200,
  }
})
```

도움이 되셨길 바랍니다. 읽어 주셔서 감사합니다. 🙏

저와 소통해요! 저는 다음에서 찾을 수 있습니다:



- Medium: [https://medium.com/@nhannguyendevjs/](https://medium.com/@nhannguyendevjs/)
- Dev: [https://dev.to/nhannguyendevjs/](https://dev.to/nhannguyendevjs/)
- Hashnode: [https://nhannguyen.hashnode.dev/](https://nhannguyen.hashnode.dev/)
- Linkedin: [https://www.linkedin.com/in/nhannguyendevjs/](https://www.linkedin.com/in/nhannguyendevjs/)
- X (formerly Twitter): [https://twitter.com/nhannguyendevjs/](https://twitter.com/nhannguyendevjs/)
- Buy Me a Coffee: [https://www.buymeacoffee.com/nhannguyendevjs](https://www.buymeacoffee.com/nhannguyendevjs)