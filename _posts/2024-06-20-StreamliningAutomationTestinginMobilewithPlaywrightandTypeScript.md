---
title: "모바일에서 Playwright와 TypeScript로 자동화 테스팅을 간편하게 하기"
description: ""
coverImage: "/assets/img/2024-06-20-StreamliningAutomationTestinginMobilewithPlaywrightandTypeScript_0.png"
date: 2024-06-20 02:42
ogImage: 
  url: /assets/img/2024-06-20-StreamliningAutomationTestinginMobilewithPlaywrightandTypeScript_0.png
tag: Tech
originalTitle: "Streamlining Automation Testing in Mobile with Playwright and TypeScript"
link: "https://medium.com/@jignect/streamlining-automation-testing-in-mobile-with-playwright-and-typescript-337230c02507"
isUpdated: true
---





![Playwright](/assets/img/2024-06-20-StreamliningAutomationTestinginMobilewithPlaywrightandTypeScript_0.png)

플레이 라이트는 모바일 및 웹 애플리케이션을 처리할 수 있는 다재다능한 도구로, 모든 주요 브라우저를 지원합니다. 이 유연성은 개발자와 테스터가 웹 애플리케이션이 다양한 화면 크기와 다른 조명 조건에서 어떻게 보이고 동작할지에 대한 통찰력을 얻을 수 있도록 합니다.

Playwright에서 모바일 장치 에뮬레이션은 테스트 범위를 크게 확장하지만, 실제 장치에서의 테스트 필요성을 대체하지는 않는다는 점을 기억하는 것이 중요합니다. 에뮬레이션은 사전 점검을 수행하고 애플리케이션이 다양한 장치 구성에 잘 적응하는지 확인하는 편리한 방법을 제공합니다. 그러나 성능 및 특정 하드웨어 상호작용에 대한 포괄적인 테스트, 특히 실제 장치에서의 테스트는 여전히 필수적입니다.

Playwright의 기능을 활용함으로써 개발 및 QA 팀은 다양한 장치 범주에 걸쳐 더 견고하고 사용자 친화적인 경험을 보장할 수 있으며, 궁극적으로 더 높은 품질의 웹 애플리케이션으로 이끌어 줄 수 있습니다.


<div class="content-ad"></div>

# 목차

- 주요 기능
- 뷰포트 에뮬레이션
- 색 구성표 유효성 검사
- 지리 위치, 시간대, 및 지역 설정
- 선행 조치
- 프로젝트 초기화
- tsconfig.json 생성
- 테스트 케이스 생성 및 결과
- 테스트 실행 방법
- 결론

# ↪️ 주요 기능

# 뷰포트 에뮬레이션:

<div class="content-ad"></div>

플레이라이트는 각종 모바일 기기의 뷰포트 크기를 에뮬레이트할 수 있어, 스마트폰과 태블릿을 포함한 다양한 모바일 기기의 화면 크기를 시뮬레이션할 수 있습니다. 이 기능을 통해 웹 애플리케이션이 다양한 화면 크기에 대응하여 레이아웃과 기능에 대한 잠재적인 문제를 해결하며, 모든 플랫폼에서 일관된 사용자 경험을 제공할 수 있습니다.

# 색상 구성 검증:

다크 모드와 다른 사용자별 색상 기본 설정의 인기가 높아지면서, 플레이라이트의 모바일 기기 에뮬레이션 기능을 활용하여 테스터들은 웹 애플리케이션의 디자인이 다른 색상 구성에서 어떻게 작동하는지 확인할 수 있습니다. 이는 밝은 모드와 어두운 모드에서 애플리케이션의 모습이 일관되고 접근성 있는지 확인하는 것을 포함합니다. 이렇게 함으로써, 개발자들은 사용자의 색상 구성 환경에 관계없이 시각적으로 매력적이고 사용자 친화적인 경험을 제공할 수 있습니다.

# 지리적 위치, 시간대, 지역 설정:

<div class="content-ad"></div>

플레이라이트에는 위치정보, 시간대 및 로캘을 시뮬레이션하는 강력한 기능이 포함되어 있어 다양한 테스트 시나리오를 지원합니다. 이 기능을 통해 개발자들은 웹 애플리케이션이 전 세계 사용자를 대상으로 다양한 지리적 지역 및 시간대에서 어떻게 작동하는지 테스트할 수 있으며, 전 세계 사용자에게 올바른 동작을 제공할 수 있습니다. 예를 들어, 다른 로캘을 시뮬레이션하여 날짜 및 시간 형식, 언어 설정 및 기타 지역별 기능이 예상대로 작동하는지 확인할 수 있습니다. 이러한 포괄적인 테스트를 통해 애플리케이션이 전 세계의 다양한 지역의 사용자에게 원활하고 정확한 경험을 제공하는지 확인할 수 있습니다.

프레임워크의 다양한 에뮬레이션 기능은 테스트 과정을 크게 향상시켜주며, 개발자와 테스터들에게 다양한 장치 및 설정에서 웹 애플리케이션의 고품질 성능과 사용자 경험을 제공할 수 있는 강력한 도구를 제공합니다.

# 사전 준비 단계

TypeScript로 Playwright 스크립트를 작성하여 제공된 웹사이트에서 모바일 기기 에뮬레이션(예: iPhone 11)을 사용하여 로그인 프로세스를 자동화하는 방법을 알아봅시다.

<div class="content-ad"></div>

# 프로젝트 초기화하기:

- npm init -y
- npm install playwright typescript ts-node @types/node
- `npm` : JavaScript 패키지를 관리하는 유틸리티인 Node Package Manager입니다.
- `init` : 새로운 Node.js 프로젝트를 초기화하고 `package.json` 파일을 생성합니다.
- `-y` : 이 옵션은 모든 프롬프트에 "예"로 자동응답하여 기본 설정을 허용합니다.
- `npm install` : 이 명령은 나열된 패키지를 설치하고 `package.json` 파일에 종속성으로 포함시킵니다.

# tsconfig.json 파일 생성하기:

```js
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

<div class="content-ad"></div>

위의 코드의 각 줄에 대한 자세한 설명을 드리겠습니다:

compilerOptions:

- TypeScript 컴파일러에 코드를 컴파일하는 방법을 알려주는 다양한 설정이 포함되어 있습니다.

target:

<div class="content-ad"></div>

JavaScript를 출력하는 버전을 지정합니다.

Module:

- 출력에 사용할 모듈 시스템을 정의합니다.

outDir:

<div class="content-ad"></div>

- 컴파일된 파일이 배치될 디렉토리입니다.

rootDir:

- TypeScript 소스 파일이 포함된 디렉토리입니다.

Strict:

<div class="content-ad"></div>

- 모든 엄격한 유형 확인 옵션을 활성화합니다.

**esModuleInterop**:

- CommonJS와 ES 모듈간의 호환성을 보장합니다.

**Include:**

<div class="content-ad"></div>

- 컴파일에 포함할 파일이나 디렉토리를 지정합니다.

# 테스트 케이스 생성 및 결과:

# TypeScript 스크립트 생성:

src 디렉토리를 만들고 그 안에 mobileTest.ts라는 파일을 생성하고 다음과 같은 내용을 추가하세요:

<div class="content-ad"></div>

```js
import { chromium, devices } from 'playwright';
const iPhone11 = devices['iPhone 11'];
(async () => {
  // Chromium 브라우저 실행
  const browser = await chromium.launch({ headless: false });
  // iPhone 11 디바이스 설정으로 새로운 브라우저 컨텍스트 생성
  const context = await browser.newContext({
    ...iPhone11,
    locale: 'en-US',
    geolocation: { latitude: 37.7749, longitude: -122.4194 },
    permissions: ['geolocation'],
  });
  // 컨텍스트에서 새로운 페이지 생성
  const page = await context.newPage();
  // 로그인 페이지로 이동
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  // 사용자 이름 입력
  await page.fill('#username', 'student');
  // 비밀번호 입력
  await page.fill('#password', 'Password123');
  // 로그인 버튼 클릭
  await page.click('#submit');
  // 특정 요소를 확인하여 로그인 성공 여부 확인
  const successMessage = await page.textContent('.post-title');
  if (successMessage?.includes('Logged In Successfully')) {
    console.log('로그인 성공');
  } else {
    console.log('로그인 실패');
  }

  // 브라우저 닫기
  await browser.close();
})();
```

위의 코드 각 줄에 대한 자세한 설명:

모듈 가져오기

- 'playwright'에서 'chromium, devices' 가져오기;
- chromium: Playwright에서 Chromium 브라우저 가져오기.
- devices: Playwright에서 사전 정의된 디바이스 설명자(예: 모바일 디바이스) 가져오기.

<div class="content-ad"></div>


모바일 기기 정의

- const iPhone11 = devices['iPhone 11'];iPhone11: 이 줄은 iPhone 11에 대한 미리 정의된 기기 설명자를 변수 iPhone11에 할당합니다. 기기 설명자에는 뷰포트 크기, 사용자 에이전트 및 해당 기기를 흉내 내는 기타 설정과 같은 정보가 포함됩니다.

비동기 함수

- (async () => {
- 이것은 비동기 함수를 시작합니다. async 키워드를 사용하면 함수 내에서 await을 사용할 수 있어서 동기적으로 보이는 방식으로 비동기 작업을 수행할 수 있습니다.


<div class="content-ad"></div>

웹 브라우저 실행하기

- const browser = await chromium.launch('headless: false');
- chromium.launch(): 크로미엄 브라우저의 인스턴스를 실행합니다.
- 'headless: false': 브라우저가 헤드리스 모드가 아닌, 즉 브라우저 창이 표시되는 모드로 실행됩니다.

기기 설정을 갖춘 브라우저 컨텍스트 생성하기

```js
const context = await browser.newContext({
  ...iPhone11,
  locale: 'en-US',
  geolocation: { latitude: 37.7749, longitude: -122.4194 },
  permissions: ['geolocation'],
});
```

<div class="content-ad"></div>

browser.newContext(): 이것은 특정 설정으로 새로운 브라우저 컨텍스트를 만듭니다.

…iPhone11: 전개 연산자 (…)는 iPhone11 설명자의 모든 속성을 컨텍스트 설정으로 복사하는 데 사용됩니다.

locale: 'en-US': 로캘(언어)을 영어(미국)으로 설정합니다.

geolocation: ' latitude: 37.7749, longitude: -122.4194 ': 지리적 위치를 캘리포니아 주 샌프란시스코에 해당하는 좌표로 설정합니다. permissions: ['geolocation']: 브라우저 컨텍스트에 지리적 위치 사용 권한을 부여합니다.

<div class="content-ad"></div>

새 페이지 생성

- const page = await context.newPage();
- context.newPage(): 브라우저 컨텍스트에 새 페이지(탭)를 만듭니다.

로그인 페이지로 이동

- await page.goto('https://practicetestautomation.com/practice-test-login/');
- page.goto(): 이 코드는 지정된 URL로 이동합니다. 여기서는 제공된 웹사이트의 로그인 페이지로 이동합니다.

<div class="content-ad"></div>

사용자 이름 입력

- await page.fill('#username', 'student');
- page.fill(): 이 명령은 CSS 선택자 #username로 식별된 입력란에 'student'라는 텍스트를 입력합니다.

비밀번호 입력

- await page.fill('#password', 'Password123');
- page.fill(): 이 명령은 CSS 선택자 #password로 식별된 입력란에 'Password123'이라는 텍스트를 입력합니다.

<div class="content-ad"></div>

로그인 버튼을 클릭해주세요.

- await page.click(‘#submit’);
- page.click(): 이것은 CSS 선택자 #submit로 식별된 버튼을 클릭합니다.
- 로그인 성공 확인

```js
const successMessage = await page.textContent('.post-title');
  if (successMessage?.includes('Logged In Successfully')) {
    console.log('로그인 성공');
  } else {
    console.log('로그인 실패');
  }
```

page.textContent(): 이것은 CSS 선택자 .post-title로 식별된 요소의 텍스트 콘텐츠를 검색합니다.

<div class="content-ad"></div>

성공 메시지?.includes('로그인 성공'): 이것은 검색된 텍스트 내용이 '로그인 성공'이라는 구문을 포함하는지 확인합니다.

console.log('로그인 성공'): 해당 구문이 찾아진 경우 콘솔에 '로그인 성공'을 기록합니다. console.log('로그인 실패'): 해당 구문이 찾아지지 않은 경우 콘솔에 '로그인 실패'를 기록합니다.

브라우저 닫기

- await browser.close();
- ')();
- browser.close(): 이것은 브라우저를 닫습니다.')();: 이것은 비동기 함수를 종료하고 즉시 호출합니다.

<div class="content-ad"></div>

# 테스트 실행 방법

- 터미널을 열고 다음 명령을 입력하세요: npx ts-node src/mobileTest.ts

![이미지 1](/assets/img/2024-06-20-StreamliningAutomationTestinginMobilewithPlaywrightandTypeScript_1.png)

![이미지 2](/assets/img/2024-06-20-StreamliningAutomationTestinginMobilewithPlaywrightandTypeScript_2.png)

<div class="content-ad"></div>


![이미지1](/assets/img/2024-06-20-StreamliningAutomationTestinginMobilewithPlaywrightandTypeScript_3.png)

![이미지2](/assets/img/2024-06-20-StreamliningAutomationTestinginMobilewithPlaywrightandTypeScript_4.png)

![이미지3](/assets/img/2024-06-20-StreamliningAutomationTestinginMobilewithPlaywrightandTypeScript_5.png)

# 결론


<div class="content-ad"></div>

이 프로젝트에서는 Playwright 및 TypeScript를 사용하여 웹 사이트의 로그인 기능을 자동화하는 견고한 테스팅 프레임워크를 구축했습니다. iPhone 11을 모방하여 모바일 기기에서 사이트가 잘 작동하도록 보장했습니다. TypeScript 구성(`tsconfig.json`)은 코드 컴파일을 최적화하고, 스크립트(`loginTest.ts`)는 자격 증명 입력부터 성공 확인까지 전체 로그인 프로세스를 자동화했습니다.

이 방법은 테스트를 간소화하고 모바일 환경에서 문제를 발견하여 웹 사이트 품질을 향상시킵니다. Playwright 및 TypeScript를 활용하여 신뢰할 수 있고 확장 가능한 테스트 솔루션을 개발했습니다. 그러나 모바일 기기 에뮬레이션은 실제 기기에서의 테스트를 대체하지 않으며, 초기 설정이 복잡할 수 있습니다.

더 많은 강력한 도구를 소화하고 탐구하여 전문적인 테스팅 도구를 숙달하기 위해 'Jignect' 와 함께 노력해보세요.

저희의 섬세한 접근 방식과 첨단 솔루션이 품질과 성능을 새로운 높이로 끌어올린 것을 목격하세요. 소프트웨어 테스팅 탁월성의 세계로 여정을 시작하세요. 더 자세한 내용은 "Tools & Technologies & QA Services"를 참조하세요.

<div class="content-ad"></div>

만약 당사가 제공하는 멋진 서비스에 대해 더 알고 싶다면 언제든지 연락해 주세요.

행복한 테스트하세요! 🙂

원문: https://jignect.tech 에서 2024년 6월 19일에 게시됨.