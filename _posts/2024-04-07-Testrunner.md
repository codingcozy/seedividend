---
title: "stoybook test runner 동작 방식 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Test runner"
link: "https://storybook.js.org/docs/writing-tests/test-runner"
---




Storybook 테스트 실행기는 모든 이야기를 실행 가능한 테스트로 변환합니다. Jest와 Playwright로 구동됩니다.

- play 함수가 없는 경우: 이야기가 오류 없이 렌더링되는지 확인합니다.
- play 함수가 있는 경우: play 함수의 오류와 모든 단언이 통과되었는지도 확인합니다.

이러한 테스트는 실제 브라우저에서 실행되며 명령줄이나 CI 서버를 통해 실행할 수 있습니다.

## 설정



테스트 러너는 독립적이고 프레임워크에 중립적인 유틸리티로, Storybook과 병렬로 실행됩니다. 올바르게 설정하려면 몇 가지 추가 단계가 필요합니다. 아래에는 구성하고 실행하는 데 권장되는 방법이 자세히 나와 있습니다.

다음 명령을 실행하여 설치하세요.

```js
npm install @storybook/test-runner --save-dev
```

package.json 스크립트를 업데이트하고 테스트 러너를 활성화하세요.



```js
{
  "scripts": {
    "test-storybook": "test-storybook"
  }
}
```

다음을 사용하여 Storybook를 시작하십시오:

```js
npm run storybook
```

마지막으로, 새로운 터미널 창을 열고 테스트 러너를 실행하십시오:



```js
npm run test-storybook
```

## 설정

테스트 러너는 Storybook에 대한 제로 구성 지원을 제공합니다. 그러나 더 세밀한 제어를 위해 test-storybook --eject을 실행할 수 있습니다. 이 명령은 프로젝트 루트에 test-runner-jest.config.js 파일을 생성하며 수정할 수 있습니다. 또한 jest-playwright를 사용하기 때문에 생성된 구성 파일을 확장하고 testEnvironmentOptions를 제공할 수 있습니다.

### CLI 옵션



테스트 러너는 Jest로 구동되며 Jest CLI 옵션의 일부를 허용합니다(예: --watch, --maxWorkers). 이미 프로젝트에서 해당 플래그 중 하나를 사용 중이라면 문제없이 Storybook의 테스트 러너로 이동할 수 있어야 합니다. 아래에 모든 사용 가능한 플래그와 사용 예제가 나와 있습니다.

```js
npm run test-storybook -- --watch
```

### 배포된 Storybook에 대한 테스트 실행

기본적으로 테스트 러너는 포트 6006에서 로컬로 실행 중인 Storybook에 대해 실행된다고 가정합니다. 배포된 Storybooks에 대해 실행할 대상 URL을 정의하고 싶을 경우, --url 플래그를 사용하거나 TARGET_URL 환경 변수를 설정할 수 있습니다. 예:



```js
yarn test-storybook --url https://the-storybook-url-here.com
```

## 테스트 실행 환경 설정

테스트 러너를 구성하여 CI 환경에서 테스트를 실행할 수도 있습니다. 아래에는 시작하는 데 도움이 되는 몇 가지 레시피가 문서화되어 있습니다.

### Github Actions 배포를 통해 배포된 Storybooks에서 실행하기



만약 Vercel이나 Netlify와 같은 서비스를 통해 Storybook을 게시하는 경우, 그들은 GitHub Actions에서 deployment_status 이벤트를 발생시킵니다. 이를 사용하여 deployment_status.target_url을 TARGET_URL 환경 변수로 설정할 수 있습니다. 다음은 방법입니다:

```typescript
name: Storybook Tests
on: deployment_status
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    if: github.event.deployment_status.state == 'success'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version-file: '.nvmrc'
      - name: Install dependencies
        run: yarn
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Run Storybook tests
        run: yarn test-storybook
        env:
          TARGET_URL: '${github.event.deployment_status.target_url}'
```

### 배포되지 않은 Storybook에 대해 실행하기

CI 공급업체(예: GitHub Actions, GitLab Pipelines, CircleCI)를 사용하여 빌드하고 테스트 실행기를 구성하여 생성된 Storybook에 대해 테스트를 실행할 수 있습니다. 다음은 third-party 라이브러리(concurrently, http-server, wait-on)에 의존하는 방법입니다.



```typescript
name: 'Storybook Tests'
on: push
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version-file: '.nvmrc'
      - name: Install dependencies
        run: yarn
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Build Storybook
        run: yarn build-storybook --quiet
      - name: Serve Storybook and run tests
        run: |
          npx concurrently -k -s first -n "SB,TEST" -c "magenta,blue" \
            "npx http-server storybook-static --port 6006 --silent" \
            "npx wait-on tcp:6006 && yarn test-storybook"
```

### Chromatic과 Test runner의 차이점은 무엇인가요?

Test runner은 로컬 또는 CI에서 실행할 수 있는 일반적인 테스트 도구로, 모든 종류의 테스트를 실행할 수 있도록 구성하거나 확장할 수 있습니다.

Chromatic은 시각 및 상호 작용 테스트(그리고 곧 접근성 테스트)를 실행하는 클라우드 기반 서비스로, 테스트 러너를 설정하지 않고 실행합니다. 또한 귀하의 git 공급자와 동기화하고 비공개 프로젝트의 액세스 제어를 관리합니다.



그러나 경우에 따라 테스트 실행기와 Chromatic을 함께 사용하고 싶을 수도 있어요.

- 로컬에서 사용하고 CI에서 Chromatic을 사용하세요.
- 시각 및 상호작용 테스트에는 Chromatic을 사용하고 테스트 실행기를 사용하여 다른 사용자 정의 테스트를 실행하세요.

## 고급 구성

### 테스트 후크 API



테스트 러너는 이야기를 렌더링하고 play 함수가 있는 경우 실행합니다. 그러나 브라우저에서 실행되는 play 함수를 통해 달성할 수 없는 특정 동작이 있습니다. 예를 들어, 테스트 러너가 시각적 스냅샷을 찍도록 원한다면 Playwright/Jest를 통해 가능하지만 Node에서 실행해야 합니다.

테스트 러너는 전역적으로 오버라이드할 수 있는 테스트 훅을 내보내어 시각적 또는 DOM 스냅샷과 같은 사용 사례를 활성화할 수 있습니다. 이러한 훅을 사용하면 이야기가 렌더링되기 전에 테스트 라이프사이클에 액세스할 수 있습니다. 이에 대한 사용 방법과 사용 가능한 훅의 개요는 아래에 나와 있습니다.

훅 API를 활성화하려면 Storybook 디렉토리 내에 새 구성 파일을 추가하고 다음과 같이 설정해야 합니다:

```typescript
import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  // 테스트 러너가 테스트를 실행하기 전에 실행되는 훅
  setup() {
    // 여기에 구성을 추가하세요.
  },
  /* 이야기가 브라우저에 렌더링되기 전에 방문되는 초기 훅.
   * page는 이야기의 Playwright 페이지 객체입니다.
   * context는 이야기의 id, 제목, 이름을 포함하는 Storybook 객체입니다.
   */
  async preVisit(page, context) {
    // 여기에 구성을 추가하세요.
  },
  /* 이야기가 방문되고 완전히 렌더링된 후에 실행되는 훅.
   * page는 이야기의 Playwright 페이지 객체입니다.
   * context는 이야기의 id, 제목, 이름을 포함하는 Storybook 객체입니다.
   */
  async postVisit(page, context) {
    // 여기에 구성을 추가하세요.
  },
};

export default config;
```



테스트 러너가 실행되면 기존 테스트가 다음 수명주기를 거칩니다:

- 모든 테스트 실행 전에 설정 함수가 실행됩니다.
- 필요한 정보를 포함하는 컨텍스트 객체가 생성됩니다.
- Playwright가 스토리 페이지로 이동합니다.
- preVisit 함수가 실행됩니다.
- 스토리가 렌더링되고 기존 플레이 함수가 실행됩니다.
- postVisit 함수가 실행됩니다.

### (실험 중) 테스트 필터링

Storybook에서 테스트 러너를 실행하면 기본적으로 모든 스토리를 테스트합니다. 그러나 테스트를 필터링하려면 태그 구성 옵션을 사용할 수 있습니다. Storybook은 원래 스토리에 대한 자동 문서화를 생성하기 위해 이 기능을 도입했습니다. 그러나 최신 안정 버전(0.15 이상)에서만 사용할 수 있는 태그 구성 옵션 또는 CLI 플래그(예: --includeTags, --excludeTags, --skipTags)을 사용하여 제공된 태그에 따라 테스트 러너를 구성할 수도 있습니다. 사용 가능한 옵션과 이를 사용하는 방법에 대한 개요가 아래에 설명되어 있습니다.



```typescript
import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  tags: {
    include: ['test-only', 'pages'],
    exclude: ['no-tests', 'tokens'],
    skip: ['skip-test', 'layout'],
  },
};

export default config;
```

#### 테스트 비활성화

만약에 특정 이야기들이 테스트 러너에 의해 테스트되지 않도록 하고 싶다면, 이야기를 사용자 정의 태그와 함께 구성하거나 테스트 러너 구성 파일에 활성화하거나 --excludeTags CLI 플래그를 사용하여 제거하여 해당 이야기들을 테스트에서 제외시킬 수 있습니다. 이것은 아직 테스트 준비가 되지 않은 이야기들이나 테스트에 무관한 이야기를 제외하고 싶을 때 유용합니다. 예를 들어:

```typescript
// 여러분의 프레임워크 이름으로 대체하세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  tags: ['no-tests'], // 👈 이 파일의 모든 이야기에 `no-tests` 태그를 제공합니다
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const ExcludeStory: Story = {
  //👇 이 이야기에 `no-tests` 태그를 추가하여 테스트 러너 구성에서 활성화시킬 때 테스트에서 제외됩니다
  tags: ['no-tests'],
};
```



#### 일부 이야기에 대한 테스트 실행하기

테스트 실행기가 특정 이야기나 일부 이야기에 대해서만 테스트를 실행할 수 있도록 하려면, 해당 이야기에 사용자 정의 태그를 구성하거나 테스트 실행기 구성 파일에서 활성화하거나 --includeTags CLI 플래그를 사용하여 테스트에 포함시킬 수 있습니다. 예를 들어, 'test-only' 태그를 기반으로 테스트를 실행하려면 다음과 같이 구성을 조정할 수 있습니다:

```typescript
// 'your-framework'을 사용 중인 프레임워크 이름으로 교체하세요
import type { Meta, StoryObj } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  tags: ['test-only'], // 👈 이 파일의 모든 이야기에 'test-only' 태그를 제공합니다
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const IncludeStory: Story = {
  //👇 이 이야기에 'test-only' 태그를 추가하여 테스트 실행기 구성에서 활성화된 경우 테스트에 포함됩니다
  tags: ['test-only'],
};
```

#### 테스트 건너뛰기



만약에 어떤 스토리나 스토리 집합에서 테스트를 건너뛰고 싶다면, 해당 스토리에 사용자 정의 태그를 설정하거나 테스트 러너 구성 파일에서 활성화하거나, --skipTags CLI 플래그를 사용하여 테스트 러너를 실행할 수 있습니다. 이 옵션으로 테스트를 실행하면, 테스트 러너가 그것들을 무시하고 테스트 결과에서 적절히 플래그 표시하여 해당 테스트가 일시적으로 비활성화되었음을 나타냅니다. 예를 들어:

```typescript
// 여러분의 프레임워크 이름으로 변경
import type { Meta, StoryObj } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  tags: ['skip-test'], // 👈 이 파일의 모든 스토리에 'skip-test' 태그 제공
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const SkipStory: Story = {
  //👇 이 스토리에 'skip-test' 태그를 추가하여 테스트 러너 구성에서 활성화된 경우 테스트를 건너뛸 수 있게 함
  tags: ['skip-test'],
};
```

### 배포된 Storybook의 인증

Storybook을 호스팅하기 위해 인증이 필요한 안전한 호스팅 제공 업체를 사용하는 경우, HTTP 헤더를 설정해야 할 수 있습니다. 이는 테스트 러너가 인스턴스의 상태와 이야기 인덱스를 fetch 요청과 Playwright를 통해 확인하는 방식 때문입니다. 이 작업을 위해 테스트 러너 구성 파일을 수정하여 getHttpHeaders 함수를 포함시킬 수 있습니다. 이 함수는 fetch 호출과 페이지 방문의 URL을 입력으로 받아 설정해야 하는 헤더를 포함한 객체를 반환합니다.



```typescript
import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  getHttpHeaders: async (url) => {
    const token = url.includes('prod') ? 'prod-token' : 'dev-token';
    return {
      Authorization: `Bearer ${token}`,
    };
  },
};

export default config;
```

### 도우미

테스트 러너는 몇 가지 도우미를 내보내며 이를 사용하여 테스트를 더 가독성 있고 유지보수 가능하게 만들 수 있습니다. Storybook의 내부(예: args, parameters)에 액세스하여 아래 나열된 사용 가능한 도우미 및 사용 방법에 대한 개요를 제공합니다.

```typescript
import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext, waitForPageReady } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  // 테스트 러너가 테스트를 실행하기 전에 실행되는 후크
  setup() {
    // 여기에 구성을 추가하세요.
  },
  /* 스토리가 처음 방문되기 전에 렌더링되기 전에 실행되는 후크
   * page 인수는 스토리의 Playwright 페이지 객체입니다.
   * context 인수는 스토리의 ID, 제목 및 이름을 포함하는 Storybook 객체입니다.
   */
  async preVisit(page, context) {
    // 여기에 구성을 추가하세요.
  },
  /* 스토리가 방문되고 완전히 렌더링된 후에 실행되는 후크
   * page 인수는 스토리의 Playwright 페이지 객체입니다.
   * context 인수는 스토리의 ID, 제목 및 이름을 포함하는 Storybook 객체입니다.
   */
  async postVisit(page, context) {
    // 매개변수, args, argTypes 등을 포함한 스토리의 전체 컨텍스트 가져오기
    const storyContext = await getStoryContext(page, context);

    // 이 유틸리티 함수는 이미지 스냅샷 테스트를 위해 설계되었습니다. 페이지가 모든 async 항목(예: 이미지, 폰트 등)을 포함하여 완전히로드 될 때까지 기다립니다.
    await waitForPageReady(page);

    // 여기에 구성을 추가하세요.
  },
};

export default config;
```



#### 테스트 러너로 이야기 정보에 액세스하기

이야기에 관한 정보, 예를 들어 매개변수 등을 얻어야 하는 경우, 테스트 러너에는 getStoryContext라는 도우미 함수가 포함되어 있습니다. 이를 사용하여 해당 정보를 검색할 수 있습니다. 그런 다음 필요에 따라 테스트를 자세히 사용자 정의할 수 있습니다. 예를 들어, 이야기의 매개변수에서 정의된 뷰포트 크기를 사용하여 Playwright의 페이지 뷰포트 크기를 구성해야 하는 경우 다음과 같이 할 수 있습니다:

```typescript
import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';

const { MINIMAL_VIEWPORTS } = require('@storybook/addon-viewport');

const DEFAULT_VIEWPORT_SIZE = { width: 1280, height: 720 };

const config: TestRunnerConfig = {
  async preVisit(page, story) {
    // 이야기의 매개변수에 액세스하여 그것을 렌더링하는 데 사용된 뷰포트를 검색합니다
    const context = await getStoryContext(page, story);
    const viewportName = context.parameters?.viewport?.defaultViewport;
    const viewportParameter = MINIMAL_VIEWPORTS[viewportName];

    if (viewportParameter) {
      const viewportSize = Object.entries(viewportParameter.styles).reduce(
        (acc, [screen, size]) => ({
          ...acc,
          // 뷰포트 크기를 퍼센트에서 숫자로 변환합니다
          [screen]: parseInt(size),
        }),
        {},
      );
      // Playwright 페이지를 뷰포트 크기에 맞게 구성합니다
      page.setViewportSize(viewportSize);
    } else {
      page.setViewportSize(DEFAULT_VIEWPORT_SIZE);
    }
  },
};

export default config;
```

#### 에셋 사용하기



만약 특정 세트의 테스트(예: 이미지 스냅샷 테스트)를 실행 중이라면, 테스트 러너에서는 페이지가 완전히 로드되고 준비가 되었는지를 확인하기 위해 사용할 수 있는 waitForPageReady라는 도우미 함수를 제공합니다. 예를 들어:

```typescript
import type { TestRunnerConfig } from '@storybook/test-runner';
import { waitForPageReady } from '@storybook/test-runner';

import { toMatchImageSnapshot } from 'jest-image-snapshot';

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postVisit(page, context) {
    // 페이지가 로드되고 사용 가능해질 때까지(예: 글꼴 등) 대기합니다
    await waitForPageReady(page);

    // 스토리 식별자를 기반으로 스냅샷 파일을 생성합니다
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: context.id,
    });
  },
};

export default config;
```

### Index.json 모드

로컬 Storybook을 테스트할 때, 테스트 러너는 각각의 스토리 파일을 테스트로 변환합니다. 원격 Storybook의 경우, Storybook은 테스트를 실행하기 위해 스토리북의 index.json(이전에는 stories.json) 파일(모든 스토리의 정적 색인)을 사용합니다.



#### 왜?

혹시 로컬과 원격 Storybook이 동기화되지 않은 상황에 직면하거나 코드에 액세스할 수 없는 경우가 있을 수 있습니다. 이때 index.json 파일은 테스트 중인 배포된 Storybook의 가장 정확한 표현임이 보장됩니다. 이 기능을 사용하여 로컬 Storybook을 테스트하려면 다음과 같이 --index-json 플래그를 사용하십시오:

```js
npm run test-storybook -- --index-json
```

비활성화해야 하는 경우 --no-index-json 플래그를 사용하십시오:



```js
npm run test-storybook -- --no-index-json
```

#### Storybook에 index.json 파일이 있는지 확인하는 방법은 무엇인가요?

Index.json 모드를 사용하려면 index.json 파일이 필요합니다. 브라우저 창을 열고 배포된 Storybook 인스턴스로 이동합니다 (예: https://your-storybook-url-here.com/index.json). "v": 3 키로 시작하는 JSON 파일이 표시되어야 하며, 즉시 "stories"라는 다른 키가 나와야합니다. 해당 경우라면, Storybook이 index.json 모드를 지원합니다.

## 문제 해결법



### 테스트 실행기가 불안정하며 시간 초과가 계속 발생하는 것 같아요

만약 다음과 같은 메시지로 테스트가 시간 초과되면:

```js
Timeout - Async callback was not invoked within the 15000 ms timeout specified by jest.setTimeout
```

Playwright가 당신의 프로젝트에 있는 스토리 수를 처리하지 못하는 경우일 수도 있습니다. 아마도 많은 수의 스토리가 있거나 CI 환경이 매우 낮은 RAM 구성을 갖고 있을 수도 있습니다. 이러한 경우에는 다음과 같이 명령어를 조정하여 병렬로 실행되는 워커 수를 제한해야 합니다:



```js
{
  "scripts": {
    "test-storybook:ci": "yarn test-storybook --maxWorkers=2"
  }
}
```

### CLI에 표시된 오류 메시지가 너무 짧아요

기본적으로 테스트 러너는 오류 메시지를 1000자로 자릅니다. 전체 출력은 브라우저의 Storybook에서 직접 확인할 수 있어요. 하지만 이 한계를 변경하고 싶다면 DEBUG_PRINT_LIMIT 환경 변수를 설정하여 변경할 수 있어요. 예를 들어, DEBUG_PRINT_LIMIT=5000 yarn test-storybook를 실행하면 오류 메시지 길이 제한을 변경할 수 있어요.

### 다른 CI 환경에서 테스트 러너 실행하기



Playwright를 기반으로 한 테스트 러너를 사용하기 때문에 CI 설정에 따라 특정한 도커 이미지나 다른 구성을 사용해야 할 수 있습니다. 그런 경우에는 더 많은 정보를 얻기 위해 Playwright CI 문서를 참조할 수 있습니다.

### 태그로 필터링된 테스트가 잘못 실행됨

태그로 테스트를 필터링하는 기능을 활성화하고 포함 및 제외 목록에 유사한 태그를 제공한 경우, 테스트 러너는 제외 목록을 기준으로 테스트를 실행하고 포함 목록은 무시합니다. 이를 방지하려면 포함 및 제외 목록에 제공된 태그가 서로 다른지 확인하세요.

### 테스트 러너에서 Yarn PnP를 기본적으로 지원하지 않음



프로젝트에서 Plug`n`Play(PnP)를 활성화한 Yarn의 최신 버전에서 테스트 러너를 실행했다면, 테스트 러너가 예상대로 작동하지 않고 테스트를 실행할 때 다음 오류가 발생할 수 있습니다:

```js
PlaywrightError: jest-playwright-preset: Cannot find playwright package to use chromium
```

이 문제는 커뮤니티에서 유지보수하는 jest-playwright-preset 패키지를 사용하는 테스트 러너가 이 기능을 지원해야 하는데 아직 이를 지원하지 못하기 때문입니다. 이 문제를 해결하기 위해 nodeLinker 설정을 node-modules로 전환하거나 프로젝트에 Playwright를 직접 종속성으로 설치한 후 install 명령어를 통해 브라우저 이진 파일을 추가할 수 있습니다.

다른 UI 테스트에 대해 알아보기

- 테스트 실행을 자동화하는 테스트 실행기
- 외관을 위한 시각적 테스트
- 접근성을 위한 접근성 테스트
- 사용자 행동 시뮬레이션을 위한 상호 작용 테스트
- 코드 커버리지 측정을 위한 커버리지 테스트
- 렌더링 오류 및 경고를 위한 스냅샷 테스트
- 실제 사용자 시나리오를 시뮬레이션하기 위한 end-to-end 테스트
- 기능을 위한 단위 테스트