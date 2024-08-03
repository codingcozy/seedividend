---
title: "Storybook 텔레메트리 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Telemetry"
link: "https://storybook.js.org/docs/configure/telemetry"
---




Storybook은 완전히 익명의 데이터를 수집하여 사용자 경험을 개선하는 데 도움을 줍니다. 이 익명 프로그램에 참여하는 것은 선택 사항이며, 어떤 정보도 공유하고 싶지 않다면 선택 사항에서 제외할 수 있습니다.

## 왜 Telemetry가 수집되나요?

수십만 명의 개발자들이 일상적으로 Storybook을 사용하여 컴포넌트를 빌드, 테스트 및 문서화합니다. Storybook은 프레임워크에 중립적이며 다음과 같은 프런트엔드 생태계와 통합됩니다:

- JavaScript 프레임워크: React, Vue 3, Svelte 및 Solid
- 라이브러리: Styled-Components, Tailwind, Redux
- 디자인 도구: Figma, Sketch, Zeplin 및 InVision
- Workflow 도구: Notion, Confluence 및 Jira



과거에는 개선 프로세스가 수동적인 피드백 수집에 의존했습니다. 그러나 점점 더 많은 사용자들과 다양한 통합을 지원해야 하는 상황에서, Storybook 사용량 및 문제점을 정확히 측정하기 위한 방법이 필요합니다.

이 텔레메트리 데이터는 우리(유지보수자들)가 가장 큰 영향력을 가진 프로젝트를 우선 순위로 지정할 수 있게 도와줍니다. 이를 통해, 프론트엔드 생태계의 트렌드를 따라가고, 우리 커뮤니티의 노력이 의도한 결과를 달성하는지 확인할 수 있습니다.

## 어떤 정보가 수집되고 있나요?

우리는 명령어 호출, Storybook 버전, 애드온, 그리고 뷰 레이어를 포함한 일반적인 사용 정보를 수집합니다.



우리는 특히 텔레미트리 이벤트에서 다음 정보를 추적합니다:

- 발생 시각.
- 실행된 명령 (예: init, upgrade, dev, build).
- Storybook 고유 식별자: Storybook 설치 과정 중에 생성된 단방향 해시.
- 이벤트 발생 지점의 IP 주소의 단방향 해시 (스팸 탐지용).
- 스토리 수.
- Storybook 버전.
- Storybook 메타데이터:
언어 (예: TypeScript, JavaScript).
지원되는 뷰 레이어 (예: React, Vue 3, Angular, Svelte).
빌더 (예: Webpack5, Vite).
메타 프레임워크 (예: Next, Gatsby, CRA).
애드온 (예: Essentials, Accessibility).
- 언어 (예: TypeScript, JavaScript).
- 지원되는 뷰 레이어 (예: React, Vue 3, Angular, Svelte).
- 빌더 (예: Webpack5, Vite).
- 메타 프레임워크 (예: Next, Gatsby, CRA).
- 애드온 (예: Essentials, Accessibility).
- 패키지 매니저 정보 (예: npm, yarn).
- Monorepo 정보 (예: NX, Turborepo).
- 앱 내 이벤트 (예: Storybook 가이드 투어).

원시 데이터 접근은 매우 제한되어 있으며, 텔레미트리를 유지하는 Storybook 핵심 팀의 일부 멤버에게만 허용됩니다. 데이터 세트에서 개별 사용자를 식별할 수 없습니다. 데이터는 익명화되어 사용자에게 역추적될 수 없습니다.

## 민감한 정보는 어떤가요?



우리는 당신의 개인 정보와 보안을 매우 중요하게 생각합니다. 우리는 추가 조치를 취하여 안전한 데이터(예: 환경 변수 또는 다른 형태의 민감한 데이터)가 분석에 유출되지 않도록 합니다. STORYBOOK_TELEMETRY_DEBUG를 1로 설정하여 수집한 정보를 출력하면 수집된 정보를 확인할 수 있습니다. 예를 들어:

```npm
STORYBOOK_TELEMETRY_DEBUG=1 npm run storybook
```

다음 출력이 생성됩니다:

```js
{
  "anonymousId": "8bcfdfd5f9616a1923dd92adf89714331b2d18693c722e05152a47f8093392bb",
  "eventType": "dev",
  "payload": {
    "versionStatus": "cached",
    "storyIndex": {
      "storyCount": 0,
      "componentCount": 0,
      "pageStoryCount": 0,
      "playStoryCount": 0,
      "autodocsCount": 0,
      "storiesMdxCount": 0,
      "mdxCount": 0,
      "exampleStoryCount": 8,
      "exampleDocsCount": 3,
      "onboardingStoryCount": 0,
      "onboardingDocsCount": 0,
      "version": 4
    }
  },
  "metadata": {
    "generatedAt": 1689007841223,
    "hasCustomBabel": false,
    ...
    ...
```



Storybook의 안내 투어가 활성화되어 있는 경우, 다음과 같은 출력이 생성됩니다:

```js
{
  "eventType": "addon-onboarding",
  "payload": {
    "step": "1:Welcome",
    "addonVersion": "1.0.6"
  },
  "metadata": {
    // 위에서 수집된 메타데이터 참조.
  }
}
```

## 이 데이터는 공유되나요?

수집하는 데이터는 익명이며 원천을 추적할 수 없으며, 집계 형태로만 의미가 있습니다. 수집하는 데이터는 개인 식별이 불가능합니다. 앞으로 커뮤니티와 관련 데이터를 공개 대시보드(또는 유사한 데이터 표현 형식)를 통해 공유할 계획입니다.



## 거부하는 방법

Storybook의 구성 요소인 disableTelemetry를 true로 설정하거나 --disable-telemetry 플래그를 사용하거나 STORYBOOK_DISABLE_TELEMETRY 환경 변수를 1로 설정하여 텔레메트리를 거부할 수 있습니다. 예를 들어:

```typescript
export default {
  // 사용 중인 프레임워크로 교체하세요 (예: react-webpack5, vue3-vite)
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    disableTelemetry: true, // 👈 텔레메트리 비활성화
  },
};
```

## 크래시 보고서 (기본적으로 비활성화됨)



일반 사용 텔레메트리 외에도, 충돌 보고서를 공유할 수도 있습니다. Storybook에서는 오류 객체를 살펴본 후(모든 사용자 경로를 제거), 해당 정보를 텔레메트리 이벤트에 추가합니다. 충돌 보고를 활성화하려면 --enable-crash-reports 플래그를 사용하여 enableCrashReports 구성 요소를 true로 설정하거나, STORYBOOK_ENABLE_CRASH_REPORTS 환경 변수를 1로 설정하면 됩니다. 예를 들면:

```typescript
export default {
  // 사용 중인 프레임워크를 기입합니다(예: react-webpack5, vue3-vite)
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    enableCrashReports: true, // 👈 충돌 보고서를 텔레메트리 이벤트에 추가합니다
  },
};
```

텔레메트리 이벤트에 다음과 같은 항목이 생성됩니다:

```typescript
{
  stack: 'Error: Your button is not working\n' +
    '    at Object.<anonymous> ($SNIP/test.js:39:27)\n' +
    '    at Module._compile (node:internal/modules/cjs/loader:1103:14)\n' +
    '    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1157:10)\n' +
    '    at Module.load (node:internal/modules/cjs/loader:981:32)\n' +
    '    at Function.Module._load (node:internal/modules/cjs/loader:822:12)\n' +
    '    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)\n' +
    '    at node:internal/main/run_main_module:17:47',
  message: 'Your button is not working'
}
```