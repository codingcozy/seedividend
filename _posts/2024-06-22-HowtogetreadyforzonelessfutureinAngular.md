---
title: "Angular에서 존리스zoneless 미래에 대비하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-HowtogetreadyforzonelessfutureinAngular_0.png"
date: 2024-06-22 14:41
ogImage: 
  url: /assets/img/2024-06-22-HowtogetreadyforzonelessfutureinAngular_0.png
tag: Tech
originalTitle: "How to get ready for zoneless future in Angular"
link: "https://medium.com/javascript-everyday/how-to-get-ready-for-zoneless-future-in-angular-3fd495ed572b"
---


<img src="/assets/img/2024-06-22-HowtogetreadyforzonelessfutureinAngular_0.png" />

Angular 18은 zone.js를 기반으로 한 기존 버전보다 더 효율적인 zoneless change detection을 실험적으로 지원합니다.

이 기능에 대한 자세한 내용은 아래 링크를 참조하세요 👇

새 프로젝트를 시작하면 zoneless 옵션을 쉽게 선택할 수 있습니다. 하지만 기존 애플리케이션에 이 기능을 통합하는 것은 간단하지 않을 수 있습니다.

<div class="content-ad"></div>

이 블로그 포스트에서는 Angular의 무존재(zonless) 미래에 대비할 수 있는 두 가지 간단한 단계에 대해 이야기하겠습니다.

무존재 변경 감지(zoneless change detection)를 수용하는 새로운 기능을 생성하는 프로세스를 수립하는 것이 바람직합니다. 상세한 설명이 필요한 경우가 있겠지만, 코드가 OnPush 변경 감지 전략과 함께 작동한다면 무존재 변경 감지와 호환될 것으로 가정할 수 있습니다.

자세한 내용은 여기에서 확인하실 수 있습니다 👇

이 패턴을 구현하려면 두 가지 조치를 취할 수 있습니다:

<div class="content-ad"></div>

- angular.json (nx.json) 파일에서 기본 변경 감지 전략을 수정하십시오:

```js
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "ng-18-playground": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "changeDetection": "OnPush"
        }
      }
      
      ...
    }
  }
}
```

2. OnPush 변경 감지를 강제하는 ESLint 규칙을 추가하십시오:

```js
// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/prefer-on-push-component-change-detection": ["warn|error"],
    },
  }
  ...
);
```

<div class="content-ad"></div>

Nx를 사용하면 특정 프로젝트에 대해 규칙을 설정할 수 있습니다. 이 기능을 사용하면 새 프로젝트에 대해 오류로 심각도 수준을 지정할 수 있습니다. 기존 프로젝트는 리팩터링을 통해 존이 없는 변경 감지로 준수할 때까지 경고를 유지할 수 있습니다.

존이 없는 변경 감지는 실험적인 기능이지만, 새 기능을 개발할 때 고려해 두는 것이 좋습니다. 이렇게 하면 나중에 존.js 없이 쉽게 theworld로 전환할 수 있습니다.

제 블로그 글이 마음에 들었으면 좋겠어요. 읽어 주셔서 감사합니다! 🙂