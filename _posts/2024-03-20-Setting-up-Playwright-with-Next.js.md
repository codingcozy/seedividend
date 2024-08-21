---
title: "Playwright를 Nextjs와 함께 설정하는 방법"
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

# Playwright를 Next.js와 함께 설정하는 방법

Playwright는 Chromium, Firefox 및 WebKit을 단일 API로 자동화할 수 있는 테스팅 프레임워크입니다. Playwright를 사용하면 End-to-End(E2E) 테스트를 작성할 수 있습니다. 이 안내서는 Next.js와 함께 Playwright를 설정하고 첫 번째 테스트를 작성하는 방법을 안내합니다.

## 빠른 시작

가장 빠르게 시작하는 방법은 with-playwright 예제를 사용하여 create-next-app을 사용하는 것입니다. 이렇게 하면 Playwright가 구성된 Next.js 프로젝트가 생성됩니다.

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
npx create-next-app@latest --example with-playwright with-playwright-app
```

## 수동 설정

Playwright를 설치하려면 다음 명령을 실행하세요:

```js
npm init playwright
# 또는
yarn create playwright
# 또는
pnpm create playwright
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

이 과정을 통해 Playwright를 설정하고 프로젝트에 추가하기 위한 일련의 프롬프트를 진행하게 됩니다. 이 과정에는 playwright.config.ts 파일도 추가됩니다. Playwright 설치 가이드에서 단계별 안내를 참조해주세요.

## 첫 번째 Playwright E2E 테스트 만들기

두 개의 새로운 Next.js 페이지를 만들어보세요:

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
      <Link href="/">Home</Link>
    </div>
  );
}
```

이후, 네비게이션이 제대로 작동하는지 확인하는 테스트를 추가하세요.

```js
import { test, expect } from '@playwright/test'

test('about 페이지로 이동해야 함', async ({ page }) => {
  // 인덱스 페이지에서 시작 (baseUrl은 playwright.config.ts에서 webServer를 통해 설정됨)
  await page.goto('http://localhost:3000/')
  // 'About'이라는 텍스트가 포함된 요소를 찾아 클릭
  await page.click('text=About')
  // 새 URL은 "/about"이어야 함 (baseUrl을 사용함)
  await expect(page).toHaveURL('http://localhost:3000/about')
  // 새 페이지에 "About"이라는 h1 요소가 있어야 함
  await expect(page.locator('h1')).toContainText('About')
}
```

> 알아두면 좋은 점:
> "baseURL": "http://localhost:3000"을 playwright.config.ts 구성 파일에 추가하면 page.goto("/") 대신 page.goto("http://localhost:3000/")를 사용할 수 있습니다.

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

### Playwright 테스트 실행하기

Playwright는 사용자가 Chromium, Firefox 및 Webkit 세 브라우저를 사용하여 애플리케이션을 탐색하는 것을 시뮬레이트합니다. 이를 위해 Next.js 서버가 실행 중이어야 합니다. 운영 코드에 대해 테스트를 실행하여 애플리케이션이 어떻게 동작할지를 더 정확하게 확인하는 것을 권장합니다.
npm run build 및 npm run start를 실행한 후 다른 터미널 창에서 npx playwright test를 실행하여 Playwright 테스트를 실행하세요.

> 팁: 대신, Playwright가 개발 서버를 시작하고 완전히 사용 가능할 때까지 기다리도록 하는 webServer 기능을 사용할 수도 있습니다.

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

### Continuous Integration (CI)에서 Playwright 실행하기

기본적으로 Playwright는 헤드리스 모드에서 테스트를 실행합니다. Playwright 종속성을 모두 설치하려면 npx playwright install-deps를 실행하세요. 이러한 리소스에서 Playwright와 Continuous Integration에 대해 더 알아볼 수 있습니다:

- Next.js와 Playwright 예제
- 본인의 CI 제공업체에서 Playwright 사용하기
- Playwright Discord

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
