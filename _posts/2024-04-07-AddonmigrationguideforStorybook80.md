---
title: "스토리북 80을 위한 애드온 migration 가이드"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Addon migration guide for Storybook 80"
link: "https://storybook.js.org/docs/addons/addon-migration-guide"
---




우리는 확장 기능 생성자들이 Storybook 생태계를 활기차고 최신 상태로 유지하기 위해 들이는 헌신과 노력에 진심으로 감사드립니다. Storybook이 새로운 기능과 개선 사항을 가져오면서 8.0 버전으로 진화함에 따라, 이 안내서는 7.x에서 8.0으로 여러분의 애드온을 마이그레이션하는 데 도움을 드리고자 합니다. 만약 Storybook의 이전 버전에서 애드온을 마이그레이션해야 한다면, 먼저 Storybook 7.0을 위한 애드온 마이그레이션 가이드를 참조해 주세요.

## 의존성 업데이트

가장 먼저 Storybook 의존성을 업데이트하는 것으로 시작하세요. 프리 릴리스 버전을 사용하려면 `next` 태그를, 가장 최신 안정 버전을 사용하려면 `latest`를, 또는 직접 버전을 지정할 수 있습니다.

```js
{
  "dependencies": {
    "@storybook/client-logger": "next" // 또는 "latest", 또는 "^8.0.0"
  }
}
```



## 애드온용 주요 변경 사항

버전 8.0에서 애드온 개발에 영향을 미치는 중요한 변경 사항들이 있습니다. 8.0의 변경 사항 전체 목록은 전체 이전 안내를 확인해주세요.

### Node.js 16 지원 중단

Node.js 16 지원이 종료되었으니 애드온을 Node.js 18로 업그레이드해 주세요.



### 매니저 UI용 React 18

UI 기반의 애드온(예: 패널, 툴바, 탭)은 Storybook UI에서 요소를 렌더링하기 위해 React 18에 의존합니다. 또한, 주요 prop이 더 이상 렌더 함수로 전달되지 않는 사실을 주의하세요.

### React 피어 종속성은 더 이상 필요하지 않습니다

React에 대한 애드온의 피어 종속성을 제거하고 설치 크기를 줄이려면 다음을 수행하세요:



- react, react-dom 그리고 글로벌화된 Storybook 패키지를 peerDependencies에서 devDependencies로 옮기세요.
- 번들에 포함되지 않도록 tsup 구성에서 externals 속성에 글로벌화된 패키지 목록을 추가하세요.

예를 들어, Addon Kit에 적용된 업데이트를 확인해보세요. 이러한 변경 사항은 선택 사항이지만 권장됩니다.

### @storybook/components의 사용 중단

@storybook/components의 Icons 컴포넌트는 이제 @storybook/icons를 대체하는 사용 중단 버전입니다. 또한, 다양한 Button 컴포넌트 속성도 사용 중단되었으며 대체할 수 있는 항목이 제공되었습니다.



### Storybook 레이아웃 상태 API 변경

Storybook UI 구성을 addons.setConfig({...})로 사용자 정의하는 경우, 레이아웃 상태 API의 변경 사항에 유의해야 합니다.

### 사용되지 않는 기능 제거

7.0에서 사용되지 않는 패키지 및 API가 8.0에서 제거되었습니다. 자세한 이관 노트를 참조하세요. 특히 addons의 경우, @storybook/addons 패키지가 제거되어 @storybook/preview-api 및 @storybook/manager-api로 전환해야 합니다. 같은 기능을 제공합니다.



### 웹팩에서 babel-loader가 제거되었습니다

Storybook 8에서 웹팩5 빌더에서 babel-loader가 제거되었습니다. 만약 여러분의 애드온 프리셋이 babel() 메소드를 오버라이드한다면, 여러분의 사용자가 파일을 컴파일하기 위해 SWC를 사용한다면 (이것은 웹팩 5 기반 Storybook 프로젝트의 새로운 기본 설정입니다), 애드온이 작동하지 않을 수 있습니다.

여러분의 애드온이 Babel과 SWC를 모두 지원하도록 하려면, Unplugin을 사용하여 웹팩과 Vite 빌더 모두에서 작동하는 사용자 정의 번들링 플러그인을 작성할 수 있습니다. 이를 통해 Babel (또는 원하는 다른 도구)가 스토리와 컴포넌트가 로드될 때 실행되는 일을 완전히 제어할 수 있습니다.

일시적인 해결책으로는, 사용자들에게 Babel 지원을 선택하도록 문서를 업데이트하는 것이 좋습니다. 이렇게 함으로써, 이 프로젝트의 애드온이 작동하도록 할 수 있지만 그에 따른 성능 저하가 발생할 수 있습니다:



```js
npx storybook@latest add @storybook/addon-webpack5-compiler-babel
```

## 이주 예시

애드온 킷 저장소는 이미 Storybook 8.0을 지원하도록 업데이트되었으며, 여러분은 여기서 이주를 위한 참고 자료로 활용할 수 있습니다. 이 가이드에서 설명된 변경 사항을 확인할 수 있으며, type: module 구성을 통한 ESM 지원을 포함한 애드온 업데이트를 권장합니다. 그렇게 하면 설정이 단순화되고 사용자들이 최신 버전의 Storybook과 함께 애드온을 사용하는 것이 더 쉬워집니다. ESM 이주에 따라 진행하고자 한다면, 아래에 변경 사항을 간략히 나열해두었습니다.

- 의존성 관리, ESM 지원 및 애드온 엔트리 포인트 업데이트를 위한 package.json
- 번들링 변경을 위한 tsup.config.ts, Storybook의 글로벌을 고려
- ESM 이주를 지원하기 위한 .storybook/local-preset.js



## 릴리스

Storybook 8.0을 지원하기 위해 권장하는 것은 새로운 주요 버전의 애드온을 릴리스하고 7.x를 마이너 또는 패치 버전으로 계속 지원하는 것입니다. 실험적인 기능이나 테스트를 위해서는 다음 태그를 선택하십시오. 이를 통해 안정 버전을 릴리스하기 전에 프로젝트에서 애드온을 테스트하고 피드백을 수집할 수 있습니다.

## 지원

이 가이드를 따른 후에도 여전히 애드온에 문제가 있는 경우, 저희 GitHub 저장소에서 새로운 토론을 열어주시기 바랍니다.