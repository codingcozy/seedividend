---
title: "스토리북 Storyshots 이전 가이드"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Storyshots migration guide"
link: "https://storybook.js.org/docs/writing-tests/storyshots-migration-guide"
---




이 안내서를 통해 스냅샷 테스트를 Storyshots 애드온에서 Storybook의 테스트 러너 또는 포터블 스토리로 마이그레이션하는 방법을 배울 수 있습니다. 또한 그들 간의 차이점을 이해하고 Storybook이 제공하는 도구를 사용하여 스냅샷 테스트를 설정, 구성 및 실행할 수 있게 될 것입니다.

## Storyshots에서의 테스트 마이그레이션

### 준비물

마이그레이션 프로세스를 시작하기 전에 다음 사항이 있는지 확인하세요:



- 지원되는 프레임워크 중 하나로 설정된 완전히 기능적인 Storybook이 최신 안정 버전(즉, 7.6 이상)에서 실행 중입니다.
- 현재 Storybook 및 해당 테스트 설정에 대한 친숙함이 필요합니다.

### 테스트 러너와 함께

Storybook 테스트 러너는 모든 이야기를 실행 가능한 테스트로 변환합니다. Jest와 Playwright를 기반으로 합니다. 단독 실행이 가능한 프레임워크 중립적 유틸리티로 Storybook과 병렬로 실행됩니다. 이를 통해 play 함수를 사용한 상호 작용 테스트, DOM 스냅샷 및 접근성 테스트를 포함한 여러 테스트 패턴을 멀티 브라우저 환경에서 실행할 수 있습니다.

#### 설정



Storyshots 애드온에서 테스트 러너로의 이주 프로세스를 시작하려면, 프로젝트에서 Storyshots 애드온 및 유사한 패키지(예: storybook/addon-storyshots-puppeteer)를 제거하고 관련된 구성 파일을 모두 삭제하는 것을 권장합니다. 그런 다음, 테스트 러너의 설정 지침에 따라 설치, 구성 및 실행하는 것이 좋습니다.

#### 테스트 커버리지 확대하기

Storyshots 애드온은 매우 맞춤화된 테스트 솔루션을 제공하여 사용자가 다양한 방법으로 테스트 커버리지를 확장할 수 있도록 했습니다. 그러나 테스트 러너는 다른 API를 사용하면서 유사한 경험을 제공합니다. 아래에서는 Storyshots로 달성한 결과와 유사한 결과를 얻기 위해 테스트 러너를 사용하는 추가 예시를 찾을 수 있습니다.

#### 테스트 러너를 사용하여 DOM 스냅샷 테스트 활성화하기



DOM 스냅샷 테스트를 테스트 러너로 활성화하려면, 테스트 러너의 구성 파일을 확장하고 사용 가능한 훅을 활용하여 Playwright의 내장 API를 결합하여 프로젝트의 각 스토리에 대한 DOM 스냅샷을 생성할 수 있습니다. 예를 들어:

```typescript
import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    // #storybook-root 요소는 스토리를 랩합니다. Storybook 6.x에서 선택기는 #root입니다.
    const elementHandler = await page.$('#storybook-root');
    const innerHTML = await elementHandler.innerHTML();
    expect(innerHTML).toMatchSnapshot();
  },
};

export default config;
```

#### 테스트 러너로 이미지 스냅샷 테스트 실행

기본적으로 테스트 러너는 최소한의 구성으로 여러 테스팅 패턴(예: DOM 스냅샷 테스트, 접근성)을 실행할 수 있는 옵션을 제공합니다. 그러나 원한다면 다른 테스트와 함께 시각적 회귀 테스트를 실행하도록 확장하여 실행할 수도 있습니다. 예를 들어:```



```typescript
import { TestRunnerConfig, waitForPageReady } from '@storybook/test-runner';

import { toMatchImageSnapshot } from 'jest-image-snapshot';

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postVisit(page, context) {
    // 페이지가 준비되기 전에 스크린샷을 찍기 위해 페이지가 준비될 때까지 기다립니다.
    await waitForPageReady(page);

    // 서로 다른 브라우저에 대해 스크린샷을 캡처하려면 파일 이름에 브라우저 이름을 접두어로 추가하려면 page.context().browser().browserType().name()를 추가하십시오
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: context.id,
    });
  },
};
export default config;
```

### With Portable Stories

Storybook은 이야기 파일에서 스토리를 렌더링 가능한 요소로 변환하여 Node 테스트에서 JSDOM과 함께 재사용할 수 있는 composeStories 유틸리티를 제공합니다. 또한 프로젝트에서 활성화한 다른 Storybook 기능 (예: 데코레이터, args)을 적용할 수 있어 구성 요소가 올바르게 렌더링되도록 합니다. 이것이 바로 휴대용 스토리(portable stories)라고 알려진 것입니다.

#### 설정



현재의 스토리샷 테스트를 중지하고 이주 프로세스를 시작하는 것을 권장합니다. 이를 위해 설정 파일을 바꿔주세요 (예: storybook.test.ts|js 또는 유사한 파일)를 storybook.test.ts|js.old로 이름을 변경하십시오. 이렇게 하면 테스트가 감지되지 않을 것이며 동일한 이름으로 새로운 테스트 구성 파일을 만들 수 있을 것입니다. 이를 통해 기존 테스트를 보존하면서 프로젝트에서 Storyshots 애드온을 제거하기 전에 휴대용 스토리로 전환할 수 있게 됩니다.

#### Storybook에서 프로젝트 수준 주석 가져오기

만약 테스트에 포함된 ./storybook/preview.js|ts에서 프로젝트 수준 주석 (예: 데코레이터, args, 스타일 등)이 필요하다면, 테스트 설정 파일을 조정하여 주석을 다음과 같이 가져올 수 있습니다:

```typescript
// 지원되는 프레임워크나 Storybook 테스트 라이브러리 (예: react, testing-vue3)에 따라 import를 조정합니다.
import { setProjectAnnotations } from '@storybook/your-framework';

// 최신 버전의 Storybook을 사용하는 경우 Storybook 프리뷰 파일의 기본 export로 이 export를 교체합니다.
import * as projectAnnotations from './.storybook/preview';

// Storybook 프리뷰 파일에서 전역 주석을 적용합니다.
setProjectAnnotations(projectAnnotations);
```



#### 이식 가능한 스토리를 위한 테스트 프레임워크 구성하기

Storyshots 애드온에서 Storybook의 composeStories 도우미 API를 사용한 이식 가능한 스토리로 마이그레이션하는 데 도움을 드리기 위해 시작할 때 도움이 되는 예제를 준비했습니다. 아래에는 두 가지 인기있는 테스트 프레임워크, Jest와 Vitest의 예제가 나와 있습니다. 우리는 코드를 새로 만든 storybook.test.ts|js 파일에 넣고 테스트 프레임워크에 따라 코드를 조정하는 것을 권장합니다. 아래 예제는 모두 다음을 수행할 것입니다:

- 글로브 패턴을 기반으로 모든 스토리 파일을 가져옵니다.
- 이 파일을 반복하며 각 모듈에 composeStories를 사용하여 각 스토리에서 렌더링 가능한 컴포넌트 목록을 생성합니다.
- 스토리를 순환하며 렌더링하고 스냅샷을 찍습니다.

#### Vitest



만약 Vitest를 테스트 프레임워크로 사용하고 있다면, 스냅샷 테스트를 Storybook의 이동 가능한 스토리로 마이그레이션할 수 있는 방법을 composeStories helper API를 사용해 알아볼 수 있어요. 아래 예시를 참고하여 storybook.test.ts|js 파일의 코드를 수정해야 합니다:

```typescript
// @vitest-environment jsdom

// 지원되는 Storybook 프레임워크 중 하나로 'your-framework'를 대체하세요 (react, vue3)
import type { Meta, StoryFn } from '@storybook/your-framework';

import { describe, expect, test } from 'vitest';

// 지원되는 테스트 라이브러리 중 하나로 'your-testing-library'를 대체하세요 (예: react, vue)
import { render } from '@testing-library/your-testing-library';

// 사용 가능한 프레임워크 또는 Storybook의 테스트 라이브러리에 따라 import를 조정하세요 (예: react, testing-vue3)
import { composeStories } from '@storybook/your-framework';

// 코드를 살펴보고 유사한 옵션을 Storyshots와 재구성해보세요. 설정을 아래에 넣으세요
const options = {
  suite: 'Storybook Tests',
  storyKindRegex: /^.*?DontTest$/,
  storyNameRegex: /UNSET/,
  snapshotsDirName: '__snapshots__',
  snapshotExtension: '.storyshot',
};

describe(options.suite, () => {
  getAllStoryFiles().forEach(({ storyFile, componentName, storyDir }) => {
    const meta = storyFile.default;
    const title = meta.title || componentName;

    // 이전 코드와 같이 계속 진행
});

```  

테스트가 Vitest로 실행될 때, 프로젝트 내 모든 스토리를 포함한 단일 스냅샷 파일(i.e., storybook.test.ts|js.snap)이 생성될 거예요. 그러나 개별 스냅샷 파일을 생성하려면 Vitest의 toMatchFileSnapshot API를 사용할 수 있어요. 아래는 예시입니다:

```typescript
// ...간략히 하기 위한 코드 생략

describe(options.suite, () => {
  getAllStoryFiles().forEach(({ filePath, storyFile, storyDir }) => {
    // ...이전에 있던 코드들
    describe(title, () => {
      // ...이전에 있던 코드들
      stories.forEach(({ name, story }) => {
        // ...이전에 있던 코드들
        testFn(name, async () => {
          // ...이전에 있던 코드들

          // 스냅샷을 저장할 경로를 정의해요
          const snapshotPath = path.join(
            storyDir,
            options.snapshotsDirName,
            `${componentName}${options.snapshotExtension}`,
          );
          expect(mounted.container).toMatchFileSnapshot(snapshotPath);
        });
      });
    });
  });
});
```  



#### Jest

만약 Jest를 테스트 프레임워크로 사용하고 있다면, 아래 예시를 참고하여 Storybook의 이동성 있는 코딩 예시로 스냅샷 테스트를 마이그레이션할 수 있습니다. 코드를 수정해야 할 파일은 storybook.test.ts|js 파일입니다:

```typescript
import path from 'path';
import * as glob from 'glob';

// 지원하는 Storybook 프레임워크 중 하나로 'your-framework'을 교체하세요 (react, vue3)
import type { Meta, StoryFn } from '@storybook/your-framework';

import { describe, test, expect } from '@jest/globals';

// 지원하는 테스팅 라이브러리 중 하나로 'your-testing-library'를 교체하세요 (예: react, vue)
import { render } from '@testing-library/your-testing-library';

// 지원하는 프레임워크나 Storybook의 테스팅 라이브러리에 맞게 임포트를 조정하세요 (예: react, testing-vue3)
import { composeStories } from '@storybook/your-framework';

type StoryFile = {
  default: Meta;
  [name: string]: StoryFn | Meta;
};

const compose = (entry: StoryFile): ReturnType<typeof composeStories<StoryFile>> => {
  try {
    return composeStories(entry);
  } catch (e) {
    throw new Error(
      `There was an issue composing stories for the module: ${JSON.stringify(entry)}, ${e}`,
    );
  }
};

function getAllStoryFiles() {
  // 스토리 파일 매칭을 위해 일치해야 하는 glob을 설정하세요
  const storyFiles = glob.sync(
    path.join(__dirname, 'stories/**/*.{stories,story}.{js,jsx,mjs,ts,tsx}'),
  );

  return storyFiles.map((filePath) => {
    const storyFile = require(filePath);
    return { filePath, storyFile };
  });
}

// Storyshots와 유사한 옵션을 다시 생성하세요. 아래에 구성을 배치하세요
const options = {
  suite: 'Storybook Tests',
  storyKindRegex: /^.*?DontTest$/,
  storyNameRegex: /UNSET/,
  snapshotsDirName: '__snapshots__',
  snapshotExtension: '.storyshot',
};

describe(options.suite, () => {
  getAllStoryFiles().forEach(({ storyFile, componentName }) => {
    const meta = storyFile.default;
    const title = meta.title || componentName;

    if (options.storyKindRegex.test(title) || meta.parameters?.storyshots?.disable) {
      // 비활성화된 경우 컴포넌트 테스트를 건너뜁니다
      return;
    }

    describe(title, () => {
      const stories = Object.entries(compose(storyFile))
        .map(([name, story]) => ({ name, story }))
        .filter(({ name, story }) => {
          // 매개변수를 통해 비활성화되거나 특정 정규식과 일치하는 스토리를 실행하지 않도록 필터링 메커니즘을 구현합니다.
          return !options.storyNameRegex.test(name) && !story.parameters.storyshots?.disable;
        });

      if (stories.length <= 0) {
        throw new Error(
          `No stories found for this module: ${title}. Make sure there is at least one valid story for this module, without a disable parameter, or add parameters.storyshots.disable in the default export of this file.`,
        );
      }

      stories.forEach(({ name, story }) => {
        // 테스트를 실행하지 않는 대신, 결과에 해당하는 내용을 표시할 로직을 만들어 플래그를 지정합니다
        const testFn = story.parameters.storyshots?.skip ? test.skip : test;

        testFn(name, async () => {
          const mounted = render(story());
          // 컴포넌트를 렌더링할 수 있도록 일정한 스냅샷을 보장하기 위해 컴포넌트가 렌더링되기까지 1ms의 지연을 추가합니다
          await new Promise((resolve) => setTimeout(resolve, 1));
          expect(mounted.container).toMatchSnapshot();
        });
      });
    });
  });
});
```

Jest로 테스트를 실행하면 프로젝트에 있는 모든 스토리를 하나의 스냅샷 파일 (예: __snapshots__/storybook.test.ts|js.snap)로 생성합니다. 하지만 개별 스냅샷 파일을 생성하려면 jest-specific-snapshot 패키지를 사용할 수 있습니다. 아래 예시를 참고하세요:



```typescript
// 👇 jest-specific-snapshot을 사용하여 expect을 확장합니다.
import 'jest-specific-snapshot';

// ...코드는 간략하게 생략합니다.

describe(options.suite, () => {
  //👇 arguments 리스트에 storyDir를 추가합니다.
  getAllStoryFiles().forEach(({ filePath, storyFile, storyDir }) => {
    // ...이전에 존재했던 코드
    describe(title, () => {
      // ...이전에 존재했던 코드
      stories.forEach(({ name, story }) => {
        // ...이전에 존재했던 코드
        testFn(name, async () => {
          // ...이전에 존재했던 코드

          //👇 스냅샷을 저장할 경로를 정의합니다:
          const snapshotPath = path.join(
            storyDir,
            options.snapshotsDirName,
            `${componentName}${options.snapshotExtension}`,
          );
          expect(mounted.container).toMatchSpecificSnapshot(snapshotPath);
        });
      });
    });
  });
});
```

#### 알려진 제한 사항

테스트에서 이동 가능한 story를 사용하는 경우 JSDOM 환경에서 실행되는 단일 테스트 파일이 있습니다. 모든 story를 렌더링하고 스냅샷을 찍습니다. 그러나 프로젝트가 커지면 이전 Storyshots에서 겪었던 제한 사항을 마주할 수 있습니다:

- 실제 브라우저를 대상으로 테스트하지 않습니다.
- 많은 브라우저 유틸리티를 모의해야 합니다 (예: 캔버스, 창 API 등).
- 브라우저에 테스트의 일부로 액세스할 수 없으므로 디버깅 경험이 좋지 않습니다.```



다른 사용 가능한 스냅샷 테스트 옵션으로 Storybook에 대한 테스트 러너를 마이그레이션하는 것을 고려해 볼 수도 있습니다: Playwright를 사용하여 실제 브라우저 환경에서 테스트를 실행하며 더 견고한 솔루션을 제공합니다.

## 문제 해결

Storybook 및 테스트 러너를 사용하여 스냅샷 테스트를 실행하는 것은 설정이나 테스트를 성공적으로 실행되지 못하도록 방해하는 기술적 제약 사항으로 이어질 수 있으므로 발생할 수 있는 문제를 해결할 수 있도록 안내하는 일련의 지침을 준비했습니다.

### 테스트 러넌이 스냅샷 테스트를 실행할 때 오류를 보고하는 경우



만약 테스트 러너로 간헐적인 테스트 실패를 겪고 있다면, 테스트가 브라우저에서 실행될 때 발생하는 uncaught 오류가 있을 수 있습니다. 이러한 오류는 이전에 Storyshots 애드온을 사용했었다면 잡히지 않았을 수도 있습니다. 테스트 러너는 기본적으로 이러한 uncaught 오류를 실패한 테스트로 간주합니다. 그러나 이러한 오류가 예상대로 발생한다면, 스토리와 테스트 러너 구성 파일에서 사용자 지정 스토리 태그를 활성화해서 무시할 수 있습니다. 더 자세한 정보는 테스트 러너 문서를 확인해주세요.

### 테스트 러너가 예상 디렉토리에 스냅샷 파일을 생성하지 않음

테스트 러너를 스냅샷 테스트를 실행하도록 구성했다면, 이전에 Storyshots 애드온이 생성했던 스냅샷 파일의 경로와 이름이 다른 것을 알 수 있습니다. 이는 테스트 러너가 스냅샷 파일에 대해 다른 명명 규칙을 사용하기 때문입니다. 사용자 지정 스냅샷 리졸버를 사용하여 이전에 사용하던 명명 규칙과 동일하게 테스트 러너를 구성할 수 있습니다.

다음 명령을 실행하여 Jest를 구성하는 데 사용할 수 있는 테스트 러너용 사용자 정의 구성 파일을 생성하세요:



```npm
npm run test-storybook -- --eject
```

파일을 업데이트하고 사용자 정의 스냅샷 리졸버를 사용하려면 snapshotResolver 옵션을 활성화하세요:

```typescript
import { getJestConfig } from '@storybook/test-runner';

const defaultConfig = getJestConfig();

const config = {
  // 기본 Jest 구성은 @storybook/test-runner에서 제공됩니다
  ...defaultConfig,
  snapshotResolver: './snapshot-resolver.js',
};

export default config;
```

마지막으로, 사용자 정의 스냅샷 리졸버를 구현하기 위해 snapshot-resolver.js 파일을 생성하세요.



```typescript
import path from 'path';

export default {
  resolveSnapshotPath: (testPath) => {
    const fileName = path.basename(testPath);
    const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');
    const modifiedFileName = `${fileNameWithoutExtension}.storyshot`;

    // Configure Jest to generate snapshot files using the following naming convention (__snapshots__/Button.storyshot)
    return path.join(path.dirname(testPath), '__snapshots__', modifiedFileName);
  },
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    path.basename(snapshotFilePath, snapshotExtension),
  testPathForConsistencyCheck: 'example.storyshot',
};
```

### 스냅샷 파일의 형식이 스토리샷 애드온에서 생성된 것과 다릅니다.

기본적으로 테스트 러너는 jest-serializer-html을 사용하여 HTML 스냅샷을 직렬화합니다. 이는 특정 CSS-in-JS 라이브러리(Emotion, Angular의 ng 속성 등)를 사용하더라도 기존 스냅샷과 비교했을 때 서식이 다를 수 있습니다. 그러나 각 테스트 실행 시 랜덤한 클래스 이름을 일관된 클래스 이름으로 변경하여 문제를 해결하기 위해 테스트 러너를 사용자 지정 스냅샷 직렬화 프로그램을 구성할 수 있습니다.

다음 명령을 실행하여 테스트 러너용 사용자 지정 구성 파일을 생성하고 추가 구성 옵션을 제공할 수 있습니다.



```npm
npm run test-storybook -- --eject
```

파일을 업데이트하고 custom snapshot resolver를 사용하도록 snapshotSerializers 옵션을 활성화합니다. 예를 들어:

```typescript
import { getJestConfig } from '@storybook/test-runner';

const defaultConfig = getJestConfig();

const config = {
  ...defaultConfig,
  snapshotSerializers: [
    // HTML을 테스트 러너에 전달하기 전에 전처리하는 커스텀 serializer를 설정합니다
    './snapshot-serializer.js',
    ...defaultConfig.snapshotSerializers,
  ],
};

export default config;
```

마지막으로 custom snapshot serializer를 구현하려면 snapshot-serializer.js 파일을 생성하세요:



```typescript
// The jest-serializer-html package은 test runner의 종속성으로 사용할 수 있습니다.
const jestSerializerHtml = require('jest-serializer-html');

const DYNAMIC_ID_PATTERN = /"react-aria-\d+(\.\d+)?"/g;

module.exports = {
  /*
   * 테스트 실행기는 테스트가 expect(SomeHTMLElement).toMatchSnapshot()에 도달할 때 serialize 함수를 호출합니다.
   * 모든 동적 ID를 정적 ID로 대체하여 스냅샷이 일관성 있게 유지되도록 합니다.
   * 예를 들어 <label id="react-aria970235672-:rl:" for="react-aria970235672-:rk:">Favorite color</label>에서 <label id="react-mocked_id" for="react-mocked_id">Favorite color</label>로 변경됩니다.
   */
  serialize(val) {
    const withFixedIds = val.replace(DYNAMIC_ID_PATTERN, 'mocked_id');
    return jestSerializerHtml.print(withFixedIds);
  },
  test(val) {
    return jestSerializerHtml.test(val);
  },
};
```

테스트 실행기가 테스트를 실행하면 결과 HTML을 검토하여 스냅샷을 만들기 전에 정적 표현식이 제공하는 정적 속성으로 동적으로 생성된 속성을 교체합니다.