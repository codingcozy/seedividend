---
title: "Nextjs 14 Cypress 셋팅하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---

# Next.js에서 Cypress 설정하기

Cypress는 엔드 투 엔드(E2E) 및 컴포넌트 테스트에 사용되는 테스트 러너입니다. 이 페이지에서는 Next.js와 함께 Cypress를 설정하고 첫 번째 테스트를 작성하는 방법을 안내합니다.

> 경고:
> 현재 Cypress는 Next.js 버전 14와 비동기 서버 컴포넌트를 지원하지 않습니다. 이 문제들은 추적 중입니다. 현재는 Next.js 버전 13에서 컴포넌트 테스트가 작동하며, 비동기 서버 컴포넌트에 대해서는 E2E 테스트를 권장합니다.
> Cypress는 현재 TypeScript 버전 5와 moduleResolution: "bundler"를 지원하지 않습니다. 이 문제는 추적 중입니다.

## 빠른 시작

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

create-next-app을 with-cypress 예제와 함께 사용하여 빠르게 시작할 수 있어요.

```js
npx create-next-app@latest --example with-cypress with-cypress-app
```

## 수동 설정

수동으로 Cypress를 설정하려면 Cypress를 개발 의존성으로 설치하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
npm install -D cypress
# 또는
yarn add -D cypress
# 또는
pnpm install -D cypress
```

package.json 스크립트 필드에 Cypress 실행 명령어를 추가하세요:

```js
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "cypress:open": "cypress open"
  }
}
```

처음으로 Cypress를 실행하여 Cypress 테스트 스위트를 엽니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
npm run cypress:open
```

E2E 테스트 및/또는 구성 요소 테스트를 구성할 수 있습니다. 이러한 옵션 중 하나를 선택하면 자동으로 프로젝트에 cypress.config.js 파일과 cypress 폴더가 생성됩니다.

## 첫 번째 Cypress E2E 테스트 만들기

cypress.config.js 파일이 다음 구성을 가지고 있는지 확인하십시오:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },
});
```

```js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },
});
```

그런 다음, 두 개의 새로운 Next.js 파일을 생성하십시오:

```js
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

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>About</h1>
      <Link href="/">홈</Link>
    </div>
  );
}
```

네비게이션이 제대로 작동하는지 확인하는 테스트를 추가하세요:

```js
describe("Navigation", () => {
  it("어바웃 페이지로 이동해야 함", () => {
    // 인덱스 페이지에서 시작
    cy.visit("http://localhost:3000/");

    // "about"을 포함한 href 속성을 가진 링크를 찾아 클릭
    cy.get('a[href*="about"]').click();

    // 새로운 URL은 "/about"을 포함해야 함
    cy.url().should("include", "/about");

    // 새 페이지에는 "About"이라는 h1이 있어야 함
    cy.get("h1").contains("About");
  });
});
```

### E2E 테스트 실행하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

싸이프레스는 사용자가 귀하의 애플리케이션을 탐색하는 것을 시뮬레이션합니다. 이를 위해서는 Next.js 서버가 실행 중이어야 합니다. 귀하의 테스트를 제품 코드에 대해 실행하여 귀하의 애플리케이션이 어떻게 동작할지 보다 정확하게 모사할 것을 권장합니다.
다음 명령어를 실행하여 Next.js 애플리케이션을 빌드하고 시작하세요 npm run build && npm run start. 그런 다음 또 다른 터미널 창에서 npm run cypress:open을 실행하여 Cypress를 시작하고 E2E 테스트 스위트를 실행하세요.

> 참고 사항:
> cypress.config.js 구성 파일에 baseUrl: 'http://localhost:3000'을 추가하여 cy.visit("/") 대신 cy.visit("http://localhost:3000/")을 사용할 수 있습니다.
> 또는 start-server-and-test 패키지를 설치하여 Next.js 프로덕션 서버를 Cypress와 함께 실행할 수 있습니다. 설치 후에 package.json 스크립트 필드에 "test": "start-server-and-test start http://localhost:3000 cypress"를 추가하세요. 새 변경 사항 이후에는 귀하의 애플리케이션을 다시 빌드하는 것을 기억해 주세요.

## 처음으로 Cypress 컴포넌트 테스트를 만들어 보세요

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

컴포넌트 테스트는 전체 애플리케이션을 번들링하거나 서버를 시작하지 않고도 특정 컴포넌트를 빌드하고 마운트하는 것을 말해요.
Cypress 앱에서 컴포넌트 테스팅을 선택한 다음, 프론트엔드 프레임워크로 Next.js를 선택하세요. 프로젝트에 cypress/component 폴더가 생성되며 cypress.config.js 파일이 업데이트되어 컴포넌트 테스트를 활성화합니다.
cypress.config.js 파일이 다음 구성을 가지고 있는지 확인하세요:

```js
import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
```

이전 섹션의 같은 구성 요소를 가정하고, 구성 요소가 예상 출력을 렌더링하는지 확인하는 테스트를 추가합니다:

```js
import Page from "../../app/page";

describe("<Page />", () => {
  it("should render and display expected content", () => {
    // 홈 페이지의 React 구성 요소를 마운트합니다
    cy.mount(<Page />);

    // 새 페이지에 "Home"이라는 h1이 포함되어야 합니다
    cy.get("h1").contains("Home");

    // 예상 URL을 가진 링크가 존재하는지 확인합니다
    // 링크를 따라가는 것은 E2E 테스트에 더 적합합니다
    cy.get('a[href="/about"]').should("be.visible");
  });
});
```

> 알아두면 좋아요:
> Cypress는 현재 비동기 서버 구성 요소에 대한 구성 요소 테스트를 지원하지 않습니다. E2E 테스트를 사용하는 것을 권장합니다.
> 구성 요소 테스트는 Next.js 서버를 필요로하지 않으므로 서버가 필요한 `<Image />`와 같은 기능은 기본적으로 작동하지 않을 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

### 컴포넌트 테스트 실행하기

터미널에서 npm run cypress:open을 실행하여 Cypress를 시작하고 컴포넌트 테스트 스위트를 실행하세요.

## 지속적 통합 (CI)

대화형 테스트 외에도 cypress run 명령을 사용하여 Cypress를 헤드리스 모드로 실행하여 CI 환경에 더 적합하게 사용할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```json
{
  "scripts": {
    //...
    "e2e": "start-server-and-test dev http://localhost:3000 \"cypress open --e2e\"",
    "e2e:headless": "start-server-and-test dev http://localhost:3000 \"cypress run --e2e\"",
    "component": "cypress open --component",
    "component:headless": "cypress run --component"
  }
}
```

이 리소스들을 통해 Cypress와 지속적 통합에 대해 더 알아보세요:

- Next.js와 Cypress 예제
- Cypress 지속적 통합 문서
- Cypress GitHub Actions 가이드
- 공식 Cypress GitHub Action
- Cypress Discord

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
