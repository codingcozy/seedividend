---
title: "TypeScript Strict Mode 리팩토링 없이 몇 달 동안 바로 켜야 하는 이유"
description: ""
coverImage: "/assets/img/2024-06-27-TypeScriptStrictModeTurnItOnImmediatelyWithoutRefactoringforMonths_0.png"
date: 2024-06-27 17:58
ogImage: 
  url: /assets/img/2024-06-27-TypeScriptStrictModeTurnItOnImmediatelyWithoutRefactoringforMonths_0.png
tag: Tech
originalTitle: "TypeScript Strict Mode: Turn It On Immediately Without Refactoring for Months!"
link: "https://medium.com/@shiviraj/typescript-strict-mode-turn-it-on-immediately-without-refactoring-for-months-1b5a9c4f8af6"
---


TypeScript은 JavaScript 응용 프로그램에 유형 안전성과 코드 문서화를 향상시킵니다. 그러나 이전 프로젝트에서는 엄격 모드가 활성화되지 않을 수 있으며, 이는 유형 안전성의 모든 이점을 제대로 활용할 수 없게 할 수 있습니다. 이것은 새로운 사용자의 진입 장벽을 낮추지만, 일부 버그를 컴파일 시간에 감지하지 못하게 합니다.

![이미지](/assets/img/2024-06-27-TypeScriptStrictModeTurnItOnImmediatelyWithoutRefactoringforMonths_0.png)

## 소프트웨어의 아키텍처가 경제에 미치는 영향

마틴 파울러(Martin Fowler)의 소프트웨어 아키텍처에 대한 인기 있는 정의 중 하나는:

<div class="content-ad"></div>

이러한 결정들은 시간이 지남에 따라 새로운 기능을 추가하는 데 필요한 비용과 노력에 상당한 영향을 미칩니다.

소프트웨어 엔지니어 및 아키텍트로서, 우리의 목표는 내부 코드 품질을 유지하여 코드베이스가 유지 가능하게 하는 것입니다. 이는 빠른 기능 개발과 지속적인 배포를 용이하게 합니다.

## TypeScript의 Strict Mode의 장점

TypeScript의 strict 플래그는 여러 중요한 검사를 활성화하는 일종의 통합 플래그입니다.

<div class="content-ad"></div>

- noImplicitAny
- noImplicitThis
- strictNullChecks
- strictPropertyInitialization
- strictBindCallApply
- strictFunctionTypes

이러한 체크는 유형 안전성을 향상시켜 버그를 줄이고 코드 기반을 더 견고하고 유지 관리 가능하게 만듭니다. 그러나 큰 기존 프로젝트에서 엄격 모드를 활성화하면 수천 개의 오류가 발생할 수 있어 한 번에 모두 수정하는 것이 현실적이지 않을 수 있습니다.

## 즉시 켜면 수천 개의 오류가 발생할 수 있습니다

수백 개 또는 수천 개의 TypeScript 파일로 구성된 중대규모 앱을 개발 중이라면 즉시 엄격 모드를 활성화하는 것이 현실적이지 않을 수 있습니다. 컴파일 시간 오류가 여러 개 발생할 수 있어 빌드가 실패할 수 있습니다. 기능 개발을 중단하고 이러한 오류를 수정하기 위해 수개월 동안 엔지니어링 시간을 할당하는 것은 이상적이지 않습니다.

<div class="content-ad"></div>

귀하의 코드베이스의 유형 안정성과 아키텍처를 개선하는 동안 새로운 기능을 계속 배포하는 방법이 있습니다:

- “tsconfig.json” 파일에서 “strict” 플래그를 “true”로 설정 — 이렇게하면 모든 엄격한 검사가 활성화됩니다.

## 새로운 프로젝트

새로운 TypeScript 프로젝트의 경우 처음부터 엄격한 모드를 활성화하는 것이 합리적입니다. 이렇게하면 시간과 귀찮음을 절약하고 소프트웨어의 품질을 크게 향상시킵니다. 개발자는 또한 중요한 JavaScript 및 TypeScript 교훈을 배우며, 안전하고 안정적인 프로그래밍 언어로 만듭니다.

<div class="content-ad"></div>

## 기존 프로젝트

오래된 프로젝트를 다루는 개발자들은 딜레마에 직면합니다. 한편으로는 엄격한 모드를 활성화하여 최상의 품질을 얻고 싶지만, 다른 한편으로는 주요 리팩터링을 거치기 싫어합니다. JSON 파일의 플래그를 true로 설정하는 것은 간단해 보이지만, 대규모 프로젝트에서는 수백 개 또는 수천 개의 오류가 발생할 수 있습니다.

만일 Git 저장소를 사용하고 현재 프로젝트 상태가 올바르다고 가정한다면, 다음과 같은 똑똑한 해결책이 가능합니다:

- 엄격한 모드 활성화 — "tsconfig.json" 파일의 "strict" 플래그를 "true"로 설정합니다.
- 해킹: 모든 파일에 대해 TypeScript 검사를 수동으로 비활성화 — 모든 *.ts 파일의 첫 번째 줄에 // @ts-nocheck를 추가합니다. (스크립트로 자동화할 수 있습니다)
- Pre-Commit 후크 추가 — Git 저장소에 커밋 시 // @ts-nocheck 주석이 포함된 커밋을 거부하는 Git 후크를 추가합니다.

<div class="content-ad"></div>

```bash
#!/bin/sh

# 준비 중인 모든 파일 확인
for file in $(git diff --cached --name-only); do
    # 디렉토리와 JavaScript/TypeScript 파일이 아닌 파일은 건너뜁니다.
    if [ -f "$file" ] && [[ "$file" =~ \.(js|ts|jsx|tsx)$ ]]; then
        if grep -q "@ts-nocheck" "$file"; then
            echo "오류: $file 파일에 // @ts-nocheck이 포함되어 있습니다."
            exit 1
        fi
    fi
done

exit 0
```

## 도대체 무슨 일이 일어나고 있는 건가요?

이 아이디어는 오래된 코드는 그대로 두고 새 코드를 엄격한 모드 검사로 개발하는 것입니다. // @ts-nocheck (단계 2)를 추가하면 TypeScript 컴파일러는 해당 파일에 대한 모든 검사를 무시합니다. 이를 통해 오류가 있더라도 프로젝트를 빌드할 수 있으면서도 엄격한 모드를 활성화할 수 있습니다. 후크 (단계 3)는 미래에 // @ts-nocheck가 포함된 파일을 푸시할 수 없도록 합니다. 오래된 파일을 수정하는 경우 엄격한 모드 문제를 해결하고 해킹을 제거한 다음 푸시해야 합니다.

장점:

<div class="content-ad"></div>

- 코드 품질은 계속해서 향상됩니다.
- 엄격 모드 활성화가 가능합니다.

단점:

- "혼합 모드"에서 개발에 더 많은 시간이 필요합니다 (즉, 파일에 // @ts-nocheck 주석이 아직 있는 경우).

## 추가 단계

<div class="content-ad"></div>

에러 및 경고의 수가 증가하지 않도록 오류 임계값을 추가할 수 있어요. 먼저 다음 명령을 사용하여 보고서를 생성해보세요:

```js
eslint . --format=json --output-file=eslint-report.json; node ./eslint-config.js
```

이 명령을 실행하면 모든 오류가 포함된 JSON 파일이 생성됩니다. 그런 다음 오류의 수를 계산하고 유효성을 확인하기 위해 Node.js 스크립트(eslint-config.js)를 작성해보세요:

```js
const errors = require('./eslint-report.json');

const ERROR_THRESHOLD = 1212;
const WARNING_THRESHOLD = 53;

const totalErrors = errors.reduce((sum, error) => sum + error.errorCount, 0);
const totalWarnings = errors.reduce((sum, error) => sum + error.warningCount, 0);

if (totalErrors > ERROR_THRESHOLD) {
    console.error(`에러 임계값 초과: 발견된 오류 수 ${totalErrors}개 (임계값: ${ERROR_THRESHOLD})`);
    process.exit(1);
}

if (totalWarnings > WARNING_THRESHOLD) {
    console.error(`경고 임계값 초과: 발견된 경고 수 ${totalWarnings}개 (임계값: ${WARNING_THRESHOLD})`);
    process.exit(1);
}

console.log(`린팅 통과: ${totalErrors}개의 오류, ${totalWarnings}개의 경고`);
```

<div class="content-ad"></div>

CI/CD 파이프라인에이 스크립트를 추가하여 오류 또는 경고의 수가 증가할 때마다 빌드를 실패하도록 설정하세요. 시간이 지남에 따라 오류를 수정하고 임계값을 점차 낮춰보세요.

이 실천을 따르면 모든 오류를 점진적으로 수정할 수 있습니다.

읽어 주셔서 감사합니다! 이 내용이 도움이 되었기를 바랍니다. 만약 도움이 되었다면 댓글로 알려주시면 감사하겠습니다!