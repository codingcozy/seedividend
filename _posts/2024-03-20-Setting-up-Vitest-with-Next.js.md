---
title: "Nextjs에서 Vitest 설정하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Next.js에서 Vitest 설정하기

Vite와 React Testing Library는 Unit Testing을 위해 자주 함께 사용됩니다. 이 안내서는 Next.js와 함께 Vitest를 설정하고 첫 번째 테스트를 작성하는 방법을 보여줍니다.

> 알아두면 좋은 정보: 비동기 Server Components가 React 생태계에 새롭게 추가되었기 때문에, Vitest는 현재 이를 지원하지 않습니다. 동기적인 Server 및 Client Components에 대한 단위 테스트는 여전히 실행할 수 있지만, 비동기 구성 요소에 대해서는 E2E 테스트를 권장합니다.

## 빠른 시작

<div class="content-ad"></div>

빠르게 시작하려면 Next.js with-vitest 예제를 사용하여 create-next-app을 실행할 수 있어요:

```js
npx create-next-app@latest --example with-vitest with-vitest-app
```

## 수동 설정

Vitest를 수동으로 설정하려면 vitest 및 다음 패키지들을 개발 종속성으로 설치하세요:

<div class="content-ad"></div>

```js
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react
# 또는
yarn add -D vitest @vitejs/plugin-react jsdom @testing-library/react
# 또는
pnpm install -D vitest @vitejs/plugin-react jsdom @testing-library/react
# 또는
bun add -D vitest @vitejs/plugin-react jsdom @testing-library/react
```

프로젝트 루트에 vitest.config.ts|js 파일을 생성하고 다음 옵션을 추가하세요:

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
});
```

Vitest 구성에 대한 자세한 정보는 Vitest 구성 문서를 참조해주세요.

<div class="content-ad"></div>

그럼, package.json에 테스트 스크립트를 추가해보세요:

```js
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest"
  }
}
```

npm run test을 실행하면 Vitest가 기본적으로 프로젝트의 변경 사항을 감시합니다.

## 첫 번째 Vitest 단위 테스트 생성하기

<div class="content-ad"></div>

모든 것이 제대로 작동하는지 확인하기 위해 `<Page />` 컴포넌트가 제목을 성공적으로 렌더링하는지 확인하는 테스트를 만들어 보세요:

```typescript
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
```

```typescript
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

test("Page", () => {
  render(<Page />);
  expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined();
});
```

> 참고: 위 예시는 일반적인 `__tests__` 관례를 사용하고 있지만, 테스트 파일은 앱 라우터 내에도 위치할 수 있습니다.

<div class="content-ad"></div>

## 테스트 실행하기

그런 다음 다음 명령어를 실행하여 테스트를 실행하세요:

```js
npm run test
# 또는
yarn test
# 또는
pnpm test
# 또는
bun test
```

## 추가 리소스

<div class="content-ad"></div>

이 리소스들이 도움이 될 수 있어요:

- Next.js with Vitest 예제
- Vitest 문서
- React Testing Library 문서

<div class="content-ad"></div>
