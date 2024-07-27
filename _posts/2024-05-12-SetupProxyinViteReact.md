---
title: "Vite React에서 프록시 설정하기"
description: ""
coverImage: "/assets/img/2024-05-12-SetupProxyinViteReact_0.png"
date: 2024-05-12 20:13
ogImage: 
  url: /assets/img/2024-05-12-SetupProxyinViteReact_0.png
tag: Tech
originalTitle: "Setup Proxy in Vite React"
link: "https://medium.com/@faazfajib7/setup-proxy-in-vite-react-2eb1454bff62"
---


Vite React 애플리케이션에서는 다음이 제게 가장 잘 작동하는 방법입니다:

vite.config.js 파일에서 proxy 옵션을 사용할 수 있습니다. proxy 옵션을 사용하면 개발 중에 특정 요청을 다른 서버로 리디렉션할 수 있습니다. 이는 예를 들어 프런트엔드 애플리케이션이 별도 서버에서 실행되는 백엔드 API와 통신해야 할 때 유용합니다.

vite.config.js 파일 안에 proxy 옵션을 정의하세요:

```js
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
        '/api': {
          target: 'http://your-backend-api-server.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
});
```



이 예제에서는 /api로 시작하는 요청에 대한 프록시를 설정하고 있습니다. 이 패턴과 일치하는 모든 요청은 http://your-backend-api-server.com 으로 리디렉션됩니다.

환경 변수에서 API URL을 가져오고 싶다면 다음과 같이 작성할 수 있습니다.

```js
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const config = {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
  return defineConfig(config);
};
```

여기서 VITE_BASE_URL이 API URL입니다.



이 포스트가 마음에 드셨다면 아래의 하트를 클릭해주세요 :).