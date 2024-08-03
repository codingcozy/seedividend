---
title: "Nextjs 14 jest로 코드 테스트 하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs 14 jest로 코드 테스트 하기

Jest와 React Testing Library는 유닛 테스팅과 스냅샷 테스팅을 함께 자주 사용됩니다. 이 안내서에서는 Next.js에서 Jest를 설정하고 첫 번째 테스트를 작성하는 방법을 안내해 드릴 겁니다.

> 참고: 비동기 서버 컴포넌트가 React 생태계에 새롭게 도입되었기 때문에, Jest는 현재 그것들을 지원하지 않습니다. 동기적인 서버 및 클라이언트 컴포넌트에 대한 단위 테스트는 여전히 실행할 수 있지만, 비동기 컴포넌트에 대해서는 E2E 테스트를 권장합니다.

## 빠른 시작

<div class="content-ad"></div>

빠르게 시작하려면 Next.js with-jest 예제와 함께 create-next-app을 사용할 수 있어요:

```js
npx create-next-app@latest --example with-jest with-jest-app
```

## 수동 설정

Next.js 12 버전부터는 Jest에 대한 내장 구성이 있기 때문에 따로 설정할 필요가 없어요.

<div class="content-ad"></div>

Jest를 설정하려면 jest 및 다음 패키지를 개발 의존성으로 설치하세요:

```js
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
# 또는
yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
# 또는
pnpm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

다음 명령어를 실행하여 기본 Jest 구성 파일을 생성하세요:

```js
npm init jest@latest
# 또는
yarn create jest@latest
# 또는
pnpm create jest@latest
```

<div class="content-ad"></div>

이 프로젝트를 위해 Jest를 설정하는 일련의 프롬프트를 진행하게 될 거예요. 이 과정에서 jest.config.ts|js 파일을 자동으로 생성할 거에요.
구성 파일을 업데이트하여 next/jest를 사용하세요. 이 변환기에는 Next.js와 함께 Jest가 작동할 수 있도록 필요한 모든 구성 옵션이 포함되어 있어요:

```typescript
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // 테스트 환경에서 next.config.js 및 .env 파일을 로드하기 위해 Next.js 앱의 경로를 제공하세요
  dir: "./",
});

// Jest에 전달할 사용자 정의 구성 추가
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // 각 테스트가 실행되기 전에 더 많은 설정 옵션을 추가하세요
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig을 이렇게 내보내는 것은 async인 Next.js 구성을 로드할 수 있도록 next/jest가 이를 처리할 수 있도록 하기 위한 것이에요
export default createJestConfig(config);
```

내부적으로 next/jest는 Jest를 자동으로 구성하는데, 이 과정에는 다음과 같은 작업이 포함되어 있어요:

<div class="content-ad"></div>

- Next.js 컴파일러를 사용하여 변환 설정하기
- .css, .module.css 및 그들의 scss 변형, 이미지 가져오기 및 next/font의 스타일시트를 자동으로 모의하기
- .env (및 모든 변형)를 process.env에 로드하기
- 테스트 해결 및 변환에서 node_modules를 무시하기
- 테스트 해결에서 .next를 무시하기
- SWC 변환을 활성화하는 플래그를 위해 next.config.js를 로드하기
  > 참고: 환경 변수를 직접 테스트하려면 별도의 설정 스크립트나 jest.config.ts 파일에 수동으로 로드하십시오. 자세한 내용은 테스트 환경 변수를 참조하십시오.

## 선택 사항: 절대 경로 및 모듈 경로 별칭 다루기

프로젝트에서 모듈 경로 별칭을 사용하는 경우 Jest를 구성하여 jsconfig.json 파일의 paths 옵션과 jest.config.js 파일의 moduleNameMapper 옵션을 일치시킵니다. 예를 들면:

<div class="content-ad"></div>

```js
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "baseUrl": "./",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}
```

```js
moduleNameMapper: {
  // ...
  '^@/components/(.*)$': '<rootDir>/components/$1',
}
```

## 선택 사항: 사용자 정의 일치자를 사용하여 Jest 확장하기

@testing-library/jest-dom에는 .toBeInTheDocument()와 같은 편리한 사용자 정의 일치자 집합이 포함되어 있어 테스트 작성이 더 쉬워집니다. Jest 구성 파일에 다음 옵션을 추가하여 모든 테스트에 사용자 정의 일치자를 가져올 수 있습니다:```

<div class="content-ad"></div>

```typescript
setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"];
```

그런 다음, jest.setup.ts 파일 내부에 다음 import를 추가하세요:

```typescript
import "@testing-library/jest-dom";
```

> 알아두세요: v6.0에서 extend-expect가 제거되었습니다. 따라서 버전 6 이전에 @testing-library/jest-dom을 사용 중이라면, @testing-library/jest-dom/extend-expect를 가져와야 합니다.

<div class="content-ad"></div>

테스트 전에 더 많은 설정 옵션을 추가해야하는 경우 jest.setup.js 파일에 추가할 수 있어요.
그리고 마지막으로 package.json 파일에 Jest 테스트 스크립트를 추가해주세요:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

<div class="content-ad"></div>

jest --watch를 사용하면 파일이 변경될 때마다 테스트를 다시 실행할 수 있어요. 더 많은 Jest CLI 옵션을 확인하려면 Jest 문서를 참조해주세요.

### 첫 번째 테스트 만들기:

이제 프로젝트가 준비되었어요. 프로젝트의 루트 디렉토리에 **tests**라는 폴더를 만들어주세요. 예를 들면, `<Page />` 컴포넌트가 제대로 제목을 렌더링하는지 확인하는 테스트를 추가할 수 있어요.

<div class="content-ad"></div>

```js
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>홈</h1>
      <Link href="/about">소개</Link>
    </div>
  );
}
```

```js
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

describe('페이지', () => {
  it('헤딩을 렌더링합니다', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
}
```

객체 변경을 추적하기 위해 스냅샷 테스트를 추가하실 수도 있습니다:

```js
import { render } from '@testing-library/react'
import Page from '../app/page'

it('홈페이지가 변경되지 않고 렌더링됩니다', () => {
  const { container } = render(<Page />)
  expect(container).toMatchSnapshot()
}
```

<div class="content-ad"></div>

## 테스트 실행하기

이제 다음 명령어를 실행하여 테스트를 실행하세요:

```js
npm run test
# 또는
yarn test
# 또는
pnpm test
```

## 추가 자료

<div class="content-ad"></div>

더 많은 정보를 원하시면, 다음 자료들이 도움이 될 수 있습니다:

- Next.js와 Jest 예제
- Jest 문서
- React Testing Library 문서
- Testing Playground
- 요소를 일치시키기 위해 좋은 테스트 관행 사용하기

<div class="content-ad"></div>
