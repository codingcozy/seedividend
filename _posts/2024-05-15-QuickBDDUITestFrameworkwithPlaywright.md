---
title: "빠른 BDD UI 테스트 프레임워크 with Playwright"
description: ""
coverImage: "/assets/img/2024-05-15-QuickBDDUITestFrameworkwithPlaywright_0.png"
date: 2024-05-15 10:41
ogImage: 
  url: /assets/img/2024-05-15-QuickBDDUITestFrameworkwithPlaywright_0.png
tag: Tech
originalTitle: "Quick BDD UI Test Framework with Playwright"
link: "https://medium.com/@aglsachin/quick-bdd-ui-test-framework-with-playwright-376739640f8c"
isUpdated: true
---




<img src="/assets/img/2024-05-15-QuickBDDUITestFrameworkwithPlaywright_0.png" />

```javascript
// Playwright에서 Type Script와 Cucumber로 UI 테스트 프레임워크를 시작하는 빠른 가이드입니다.

// 주의 사항:-
// 이것은 테스트 자동화를 시작하기 위해 의도적으로 매우 기본적인 프레임워크 설정입니다.
// 요구 사항에 맞게 향상시킬 수 있습니다.
```

# 필요한 것

- Node 및 NPM 설치가 되어 있어야 합니다.
- Visual Studio Code
- Cucumber 익스텐션



# 프로젝트 설정하기

명령줄로 이동하여 다음을 실행하세요 (프로젝트 설정 및 종속성 설치):

```js
> mkdir playwright-bdd-project
> cd playwright-bdd-project
> npm init // 모든 기본 값 선택, 이렇게 하면 새 노드 프로젝트가 초기화되고 package.json이 생성됩니다
> npm i @cucumber/cucumber -D // cucumber // -D 플래그는 이 설치를 package.json의 개발용 종속성으로 추가합니다
> npm i @playwright/test -D // Playwright
> npm i @types/node -D // Node용 Type Script
> npm i ts-node -D // Node 실행 환경에서 Type Script 파일을 실행하기 위함
> code . // 이 새롭게 설정한 프로젝트를 Visual Studio Code로 엽니다
```

<img src="/assets/img/2024-05-15-QuickBDDUITestFrameworkwithPlaywright_1.png" />



# 프로젝트 구조

다음과 같이 프로젝트에서 디렉터리 구조를 설정해주세요:

```js
root \ src \ test \ features // 여기에는 피쳐 파일이 위치합니다
root \src \ test \steps // 여기에는 스텝 정의 파일이 위치합니다
root \ reports // 여기에는 테스트 보고서가 생성됩니다
root \ src \ test \ utils // 여기에는 유틸리티 코드를 유지합니다
```

![예시 이미지](/assets/img/2024-05-15-QuickBDDUITestFrameworkwithPlaywright_2.png)



# 이 프레임워크의 핵심 — cucumber.json

프로젝트 루트에 cucumber.json 파일을 생성하세요.

루트 `cucumber.json

```js
{
    "default": {
        "paths": [
            "src/test/features/*.feature" // 피처 파일의 위치
        ],
        "dryRun": false,
        "formatOptions": {
            "snippetInterface": "async-await" // async-await 형식으로 스텝 정의를 자동 생성하기 위함
        },
        "require": [
            "src/test/steps/*.ts" // 피처 파일의 위치
        ],
        "requireModule": [
            "ts-node/register" // 타입스크립트 파일에서 import를 사용할 수 있도록, node 실행 환경에서 이를 인식할 수 있게 함
        ],
        "format": [
            ["html", "reports/cucumber-report.html"] // 테스트 실행 보고서가 여기에 생성됩니다
        ]
    }
}
```



# Cucumber Extension 설정.json 파일에 Feature 파일 및 Step Definitions 경로 업데이트

이를 통해 Cucumber 확장 프로그램이 Feature 및 해당하는 Step Definitions 파일을 매핑하는 데 도움이 됩니다.

```json
// 참고:-
// 아래에 표시된 것과 다를 수 있는 경우가 있습니다.

{
    "workbench.colorTheme": "Quiet Light",
    "files.autoSave": "afterDelay",
    "workbench.iconTheme": "vscode-icons",
    "playwright.reuseBrowser": false,
    "playwright.showTrace": false,
    "cucumber.features": [
        "src/test/features/*.feature" // Feature 파일의 위치
    ],
    "cucumber.glue": [
        "src/test/steps/*.ts" // Step Definition 파일의 위치
    ],
    "aws.telemetry": false,
    "amazonQ.telemetry": false,
    "explorer.confirmDelete": false,
    "javascript.updateImportsOnFileMove.enabled": "always"
}
```

# Feature 파일



"root \ src \ test \ features \ search.feature" 경로에 다음 기능 파일을 추가해 주세요.

```js
Feature: Basic search using google engine

  Scenario: Search for a term
    Given I am on the google search page
    When I search for "cucumber"
    Then the search results page should contain "cucumber"
```

# 단계 정의

"root \ src \ test \ steps \ search.ts" 경로에 다음 단계 정의 파일을 추가해 주세요.




```js
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from './hooks';

Given('I am on the google search page', async function () {
    console.log('I am on the google search page');
});

When('I search for {string}', async function (string) {
    console.log('I search for ' + string);
    await page.getByLabel('Search', { exact: true }).click();
    await page.getByLabel('Search', { exact: true }).fill(string);
    await page.getByLabel('Google Search').first().click();

});

Then('the search results page should contain {string}', async function (string) {
    console.log('the search results page should contain ' + string);
    await page.getByRole('link', { name: 'Cucumber: BDD Testing &' }).click();
    expect(page.url()).toContain('cucumber.io');
});
``` 

## Hooks

Add the following hooks file under: root \ src \ test \ steps \ hooks.ts

```js
import { Before, After, AfterStep, BeforeStep, World } from "@cucumber/cucumber";
import { chromium, Page, Browser } from '@playwright/test';
import { addCommentToReport, addScreenshotToReport } from "../utils/reporting";

let browser : Browser;
let page : Page;

Before(async function () { // SETUP (Runs Before Every Test Scenario) 
    console.log('Before hook');
    browser = await chromium.launch({headless: false});
    page = await browser.newPage();
    await page.goto('https://www.google.com');
});

After(async function () { // TEARDOWN (Runs After Every Test Scenario)
    console.log('After hook');
    await browser.close();
});

// RUNS BEFORE EVERY STEP
// We are taking screenshop before every step and adding it to the test report
BeforeStep(async function({pickle, pickleStep, gherkinDocument, testCaseStartedId, testStepId}) {
    await addScreenshotToReport.call(this);
    await addCommentToReport.call(this, 'BeforeStep hook: ' + pickleStep.text);
})

// RUNS AFTER EVERY STEP
// We are taking screenshop after every step and adding it to the test report
AfterStep(async function({pickle, pickleStep, gherkinDocument, result, testCaseStartedId, testStepId}) {
    await addScreenshotToReport.call(this);
    await addCommentToReport.call(this, 'AfterStep hook: ' + pickleStep.text + ' - ' + result.status);
})

export { browser, page };
```   
  



# 유틸리티

아래의 유틸리티 파일을 다음 경로에 추가하세요: root \ src \ test \ utils\ reporting.ts

```js
import { World } from "@cucumber/cucumber";
import { page } from "../steps/hooks";

// 테스트 리포트에 스크린샷을 추가하는 함수
export async function addScreenshotToReport(this: World) {
    this.attach(await page.screenshot({ fullPage: true }), 'image/png');
}

// 테스트 리포트에 코멘트를 추가하는 함수
export async function addCommentToReport(this: World, comment: string) {
    this.attach(comment, 'text/plain');
}
```

# 최종 설정은 이렇게 될 것입니다:




![이미지](/assets/img/2024-05-15-QuickBDDUITestFrameworkwithPlaywright_3.png)

# 테스트 실행

package.json에서 test 필드 값을 "cucumber-js test"로 설정하세요.

```js
 "scripts": {
    "test": "cucumber-js test"
  },
```



터미널을 열고 (CTRL + J) `npm test`를 실행해주세요.

이 명령을 통해 테스트가 실행됩니다.

![이미지](/assets/img/2024-05-15-QuickBDDUITestFrameworkwithPlaywright_4.png)

# 실행 보고서 유효성 검사



루트 / 보고서 / 로 이동하셔서

여기에서 최신 테스트 실행 보고서를 찾으실 수 있습니다.

![보고서 이미지](/assets/img/2024-05-15-QuickBDDUITestFrameworkwithPlaywright_5.png)