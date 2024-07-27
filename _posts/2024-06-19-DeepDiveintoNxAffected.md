---
title: " Nx Affected에 대한 심층 탐구"
description: ""
coverImage: "/assets/img/2024-06-19-DeepDiveintoNxAffected_0.png"
date: 2024-06-19 23:00
ogImage: 
  url: /assets/img/2024-06-19-DeepDiveintoNxAffected_0.png
tag: Tech
originalTitle: "🔎 Deep Dive into Nx Affected"
link: "https://medium.com/@jgelin/deep-dive-into-nx-affected-b3c29c715d41"
---


## 모놀리포의 Nx 영향을 이해하고 최적화하기

![이미지](/assets/img/2024-06-19-DeepDiveintoNxAffected_0.png)

- 😵‍ 왜 이대로 내버려둔 프로젝트가 영향을 받는가?
- 🤓 영향 받은 요소
  - 영향 받은 프로젝트
  - 영향 받은 작업
- 🤩 영향 받은 명령
  - 영향 받은 실행
  - 명령 표시
  - Nx 그래프
- 😶‍🌫️ 영향 받은 규칙
  - 단계 1 - 터치된 파일 찾기
  - 단계 2.1 - 경로별 영향 받는 노드 찾기
  - 단계 2.2 - 작업별 영향 받는 노드 찾기
  - 단계 2.3 - 플러그인별 영향 받는 노드 찾기
  - 단계 2.4 - Npm 의존성으로부터 영향 받는 노드 찾기
  - 단계 2.5 - TypeScript 구성에서 영향 받는 노드 찾기
  - 단계 2.6 - 글로벌 파일에서 영향 받는 노드 찾기
  - 단계 3 - 영향 받는 그래프 생성
- 🧐 영향 조사
  - Nx 그래프 사용
  - 디버깅
- 🤕 영향 해결
  - 앱/라이브러리를 잘 분리
  - 엄격한 명명된 입력
  - 영향 수정
  - Nx 패치
- 🙂 마지막으로

# 😵‍ 왜 이대로 내버려둔 프로젝트가 영향을 받게 되었을까?

<div class="content-ad"></div>

이 질문은 매일 듣는 질문입니다! 이 질문은 제가 Nx Affected 프로세스의 디버깅 세션으로 많은 시간을 소비하게 한 질문입니다.

본 문서에서는 Nx의 영향을 받는 프로세스가 어떻게 작동하는지 이해하는 데 필요한 모든 통찰력을 제공하여 그 질문에 대한 답변을 도와드리겠습니다.

# 🤓 영향 프로세스 알림

Monorepo에서 큰 코드베이스에서 작업할 때 여러 응용 프로그램과 라이브러리를 포함하는 저장소가 있을 것입니다.

<div class="content-ad"></div>

당신의 Monorepo가 성장함에 따라 CI에서 모든 앱/라이브러리를 재빌드하는 데 시간이 오래 걸릴 수 있습니다. 영향을 받는 앱/라이브러리만 다시 실행할 수 있는 능력은 소프트웨어 개발 주기를 크게 단축시킬 수 있습니다.

## 영향을 받는 프로젝트

앱/라이브러리를 수정하면 해당 앱/라이브러리 및 이에 종속된 다른 모든 앱/라이브러리에도 영향을 줍니다:

![영향을 받는 프로젝트](/assets/img/2024-06-19-DeepDiveintoNxAffected_1.png)

<div class="content-ad"></div>

앱/라이브러리 간의 종속성을 이해하기 위해 Nx는 모든 노드(앱/라이브러리), 외부 노드(npm) 및 그들 간의 모든 종속성을 포함한 프로젝트 그래프를 생성합니다.

## 영향 받는 작업

전체 앱/라이브러리에 대한 수정의 영향을 고려하는 것만으로 충분하지 않습니다. 예를 들어, 앱 내의 테스트를 변경한다고 해서 그 앱 전체를 다시 빌드해야 하는 것은 아닙니다. 테스트만 다시 실행하면 됩니다:

![Afftected Task](/assets/img/2024-06-19-DeepDiveintoNxAffected_2.png)

<div class="content-ad"></div>

앱/라이브러리 간 작업 종속성을 이해하기 위해 Nx는 작업에 의해 앱/라이브러리가 연결된 노드로 Task Graph를 생성합니다.

## 🤩 영향을 받는 명령어

Nx는 어떤 프로젝트/작업이 영향을 받았는지 식별하는 여러 방법을 제공합니다.

### 영향을 받는 실행

<div class="content-ad"></div>

주로 CI에서 사용하는 주요 명령어는 Nx 영향을 받는 명령어입니다:

```js
nx affected -t lint test build
```

![Deep Dive into Nx Affected](/assets/img/2024-06-19-DeepDiveintoNxAffected_3.png)

이 명령어를 사용하면 영향을 받는 작업 목록만 실행할 수 있습니다.

<div class="content-ad"></div>

## Show Command

또 다른 유용한 명령어는 직접적인 개요를 얻을 수 있는 Nx show 명령어입니다:

```js
nx show projects --affected
```

<img src="/assets/img/2024-06-19-DeepDiveintoNxAffected_4.png" />

<div class="content-ad"></div>

이 명령은 콘솔에서 영향을 받는 프로젝트/작업을 직접 확인하고 결과를 JSON 파일로 내보내는 것을 가능하게 합니다.

## Nx 그래프

만약 영향을 받는 프로젝트/작업의 경로를 추적하고 UI 시각화가 필요하다면, 다음 명령을 사용하여 Nx 그래프를 열 수 있습니다:

```js
nx graph --affected
```

<div class="content-ad"></div>

아래는 Markdown 형식의 코드입니다.


![이미지1](/assets/img/2024-06-19-DeepDiveintoNxAffected_5.png)

그래프를 확인할 수 있는 웹 페이지가 열립니다:

![이미지2](/assets/img/2024-06-19-DeepDiveintoNxAffected_6.png)

## 😶‍🌫️ 영향 받는 규칙


<div class="content-ad"></div>

Nx 영향을 받는 프로세스는 여러 단계를 거치며 어떤 프로젝트가 영향을 받을 수 있는지 결정하기 위해 여러 파일 및 구성을 고려합니다:

![Nx 영향 받은 내용 탐색](/assets/img/2024-06-19-DeepDiveintoNxAffected_7.png)

## 단계 1 - 변경된 파일 찾기

Nx는 영향을 받는 프로젝트의 목록을 계산하기 전에 수정/변경된 파일 목록을 로드합니다:

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-19-DeepDiveintoNxAffected_8.png)

Nx는 대상 영향을 받은 베이스 이후의 수정된 파일을 계산합니다.

기본적으로 베이스는 기본 브랜치이지만, -base 및 -head 옵션을 사용하여 수정할 수 있습니다.

아직 커밋되지 않거나 추적되지 않은 모든 수정된 파일도 추가됩니다. -uncommitted 또는 -untracked 옵션을 사용하여 동작을 변경할 수 있습니다.


<div class="content-ad"></div>

만약 Nx에게 파일 목록을 계산하지 않았으면, -files 옵션을 사용하여 직접 파일 목록을 제공할 수 있습니다.

.gitignore 또는 .nxignore에서 패턴과 일치하는 파일들은 무시됩니다.

## 단계 2.1 - 경로에서 영향을 받는 노드 찾기

모든 변경된 파일이 정의되었을 때, Nx는 해당 파일들이 프로젝트에 어떻게 영향을 줄 수 있는지 확인합니다:

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-19-DeepDiveintoNxAffected_9.png)

가장 일반적인 규칙은 파일 경로가 프로젝트 루트 경로와 일치하는지 확인하는 것입니다.

## 단계 2.2 - 작업에서 영향을받는 노드 찾기

Nx 작업을 실행할 때 두 가지 개념이 고려됩니다:


<div class="content-ad"></div>


![image](/assets/img/2024-06-19-DeepDiveintoNxAffected_10.png)

- 작업 실행 중에 소스 자산을 정의하는 데 사용되는 입력입니다.
- Nx에 의해 캐시되는 작업 결과인 출력입니다.

자바스크립트의 순수 함수와 유사하게, 입력이 변경되지 않았다면 출력도 동일해야 합니다.

입력 목록을 재사용하기 쉽게 하려면 nx.json 또는 project.json에서 Named Inputs를 사용하여 정의할 수 있습니다:


<div class="content-ad"></div>

```js
{
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"], // 기본 입력값
    "production": ["default", "!{projectRoot}/jest.config.ts"], // 프로덕션 입력값
    "sharedGlobals": [] // 공유 전역 입력값
  }
}
```

그런 다음, 해당 값을 nx.json 또는 project.json의 대상 또는 실행기에 할당하십시오:

```js
"targetDefaults": {
  "build": {
    "inputs": ["production", "^production"]
  },
  "test": {
    "inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"],
  },
}
```

파일을 변경하더라도 해당 작업 목록에는 영향을 미치지 않습니다:

<div class="content-ad"></div>

아래 이미지를 확인해주세요👇

![이미지](/assets/img/2024-06-19-DeepDiveintoNxAffected_11.png)

만약 파일을 터치하면, 영향을 받는 프로젝트 목록은 각 작업/실행자의 입력 구성에 따라 달라집니다.

## 단계 2.3 - 플러그인에서 영향 받은 노드 찾기

Nx 프로젝트 크리스털과 추론된 구성을 통한 Nx 플러그인의 일반화로 인해 Nx는 플러그인 패턴이 터치된 파일 목록에 영향을 받는지도 확인합니다.

<div class="content-ad"></div>


![2024-06-19-DeepDiveintoNxAffected_12](/assets/img/2024-06-19-DeepDiveintoNxAffected_12.png)

예를 들면, 파일을 삭제하거나 이동하면 Nx는 해당 프로젝트가 삭제되었다고 가정하고 모든 프로젝트를 영향을 받는 것으로 표시합니다.

## 단계 2.4 - Npm 종속성에서 영향받는 노드 찾기

만약 package.json이 수정되면, Nx는 어떤 것이 정확히 변경되었는지 이해하기 위해 스마트한 접근법을 사용합니다.


<div class="content-ad"></div>

만약 npm 라이브러리를 수정한다면, Nx는 해당 라이브러리를 사용하는 모든 프로젝트를 찾아서 영향을 받는 것으로 표시합니다. 만약 @types/* 라이브러리를 수정한다면, Nx는 관련 라이브러리를 추출하여 동일한 원리로 라이브러리를 수정하는 것과 같은 원리를 적용합니다.

만약 nx.json 플러그인에서 사용하는 라이브러리를 수정하거나 삭제한다면, 모든 프로젝트가 영향을 받는 것으로 간주됩니다:

![image](/assets/img/2024-06-19-DeepDiveintoNxAffected_13.png)

기본적으로 패키지 매니저 락 파일을 수정하는 것은 모든 프로젝트에 영향을 줍니다:

<div class="content-ad"></div>

아래는 Markdown 형식으로 표현해 보겠습니다.

![이미지](/assets/img/2024-06-19-DeepDiveintoNxAffected_14.png)

이 동작은 nx.json 파일의 projectsAffectedByDependencyUpdates를 사용하여 수정할 수 있습니다:

```js
"pluginsConfig": {
    "@nx/js": { 
        "projectsAffectedByDependencyUpdates": "auto"
    }
}
```

옵션:

<div class="content-ad"></div>

- 모든: 모든 프로젝트에 영향을 미칩니다.
- 자동: 수정된 종속성과 관련된 프로젝트에만 영향을 줍니다.
- 문자열[]: 프로젝트 목록을 정의합니다.

## 단계 2.5 - TypeScript 구성에서 영향 받는 노드 찾기

전역 TypeScript 구성을 수정하면 영향을 받는 노드 목록도 변경될 수 있습니다:

![이미지](/assets/img/2024-06-19-DeepDiveintoNxAffected_15.png)

<div class="content-ad"></div>

만약 경로가 수정되면, Nx는 루트 경로와 일치하는 관련 프로젝트에 영향을 줍니다. 그러나 전역 구성을 수정하거나 경로를 삭제할 경우 모든 프로젝트에 영향을 줍니다.

## 단계 2.6 - 글로벌 파일로부터 영향을 받는 노드 찾기

기본적으로 nx.json을 수정하면 모든 프로젝트에 영향을 줍니다.

![Nx Affected](/assets/img/2024-06-19-DeepDiveintoNxAffected_16.png)

<div class="content-ad"></div>

## 단계 3 - 영향을 받은 그래프 생성

영향을 받는 모든 노드를 식별한 후에, Nx는 영향을 받는 노드, 외부 노드 및 종속성이 최종적으로 영향을 받는지 확인하기 위해 영향을 받는 그래프를 생성합니다.

Nx는 영향을 받는 노드를 가져와 프로젝트 그래프의 모든 종속성을 재귀적으로 검색합니다:

![Afftected Graph Example](/assets/img/2024-06-19-DeepDiveintoNxAffected_17.png)

<div class="content-ad"></div>

예를 들어, 영향을 받는 노드인 lib10이 lib4에서 사용되고 lib4는 app1에서 사용된다면, 이 모든 노드가 영향 받는 프로젝트 그래프에 추가됩니다.

Nx는 externalNodes에도 동일한 원칙을 적용합니다:

![image](/assets/img/2024-06-19-DeepDiveintoNxAffected_18.png)

예를 들어, 영향을 받는 npm 라이브러리인 enquirer가 npm 라이브러리인 nx에 의해 사용되고 nx가 내부 라이브러리 tools에 사용되는 경우입니다.

<div class="content-ad"></div>

지금까지 영향을 받는 그래프가 완전한지 확인하려면 Nx가 관련 종속성을 추가할 것입니다.

# 🧐 영향 분석

여전히 특정 브랜치에서 일부 프로젝트가 영향을 받는 이유를 모르겠다면 언제든지 Nx 영향 프로세스를 디버깅할 수 있습니다.

## Nx 그래프 사용하기

<div class="content-ad"></div>

만약 영향을 받는 명령어로 Nx 그래프를 열면, 🤓 영향을 받는 프로젝트 섹션에 명시된 대로 모든 영향을 받는 프로젝트를 볼 수 있습니다.

그런 다음 워크스페이스를 탐색하고 프로젝트 포커스나 의존성 추적기와 같은 여러 기능을 사용할 수 있습니다.

## 디버깅

그러나 대규모 저장소의 경우, 그래프는 디버깅에 사용하기 어려울 수 있습니다. 제가 선호하는 방법은 Nx-affected 프로세스를 디버깅하여 정확히 어떤 단계가 책임을 지고 있는지를 확인하는 것입니다.

<div class="content-ad"></div>

패키지/nx/src/command-line/affected/affected.ts에서 중단점을 설정하고 디버그 모드에서 nx show project --affected를 실행해보세요.

# 🤕 영향을 받는 수정 사항

영향을 받는 프로세스를 사용자 정의하는 것은 간단하지 않습니다. 각 수정에 너무 많은 프로젝트가 영향을 받는다고 생각한다면 몇 가지 권장 사항을 살펴보세요:

## 어플리케이션/라이브러리의 잘 구분된 분리

<div class="content-ad"></div>

앱/라이브러리를 정확히 분할했는지 확인해 주세요.

자주 사용되는 라이브러리는 한 프로젝트에서 필요로 하는 유틸리티들로 구성될 수 있습니다. 이런 경우 라이브러리를 수정하는 것이 모든 프로젝트에 영향을 줄 수 있습니다.

## 엄격한 Named Inputs

Named Inputs가 올바르게 구성되었는지 확인하세요. Named Inputs는 파일을 수정했을 때 해당 대상의 출력에 영향을 줄 수 있는지를 정의합니다.

<div class="content-ad"></div>

예를 들어, 스펙 파일을 수정하면 테스트에 영향을 미칠 수 있지만 빌드에는 영향을 주지 않을 수 있습니다. 기본 명명된 입력을 사용하면 한 파일을 수정하면 프로젝트의 모든 대상에 영향을 줄 수 있습니다.

## 영향을 받는 사용자 정의

현재, 영향을 받는 프로세스에 대한 사용자 정의가 제한적으로 제공됩니다. 의존성을 업데이트할 때 configuration projectsAffectedByDependencyUpdates를 사용하여 사용자 정의할 수 있습니다(Step 2.4 — Npm Dependencies로부터 영향을 받는 노드 찾기).

## Nx 패치

<div class="content-ad"></div>

이것은 조작적인 해결책이지만, 나는 영향을 받는 프로세스를 사용자 정의하기 위해 그것을 사용합니다. 패키지 관리자의 패치 시스템을 사용하여 Nx 라이브러리를 패치하여 규칙을 변경할 수 있습니다.

예를 들어, 수정하는 데 시간이 걸리는 경우 "Affected All" 사용 사례를 비활성화할 수 있습니다:

```js
diff --git a/node_modules/nx/src/plugins/js/project-graph/affected/npm-packages.js b/node_modules/nx/src/plugins/js/project-graph/affected/npm-packages.js
index 72e78e7..7793bea 100644
--- a/node_modules/nx/src/plugins/js/project-graph/affected/npm-packages.js
+++ b/node_modules/nx/src/plugins/js/project-graph/affected/npm-packages.js
@@ -20,7 +20,8 @@ const getTouchedNpmPackages = (touchedFiles, _, nxJson, packageJson, projectGrap
             c.path.length === 2) {
             // 패키지가 삭제되었으므로 모든 워크스페이스 프로젝트를 터치로 표시합니다.
             if (c.type === json_diff_1.JsonDiffType.Deleted) {
-                touched = Object.keys(projectGraph.nodes);
+                // 패키지가 삭제된 경우 영향을받은 모든 프로젝트에 적용하지 않도록 패치
+                // touched = Object.keys(projectGraph.nodes);
                 break;
             }
             else {
diff --git a/node_modules/nx/src/plugins/js/project-graph/affected/tsconfig-json-changes.js b/node_modules/nx/src/plugins/js/project-graph/affected/tsconfig-json-changes.js
index bac7008..37ae136 100644
--- a/node_modules/nx/src/plugins/js/project-graph/affected/tsconfig-json-changes.js
+++ b/node_modules/nx/src/plugins/js/project-graph/affected/tsconfig-json-changes.js
@@ -24,7 +24,8 @@ const getTouchedProjectsFromTsConfig = (touchedFiles, _a, _b, _c, graph) => {
         }
         // 경로가 삭제된 경우 모든 것이 터치됩니다
         if (change.type === json_diff_1.JsonDiffType.Deleted) {
-            return Object.keys(graph.nodes);
+            // 경로가 삭제된 경우 영향을 받은 모든 프로젝트에 적용하지 않도록 패치
+            // return Object.keys(graph.nodes);
         }
         touched.push(...getProjectsAffectedByPaths(change, Object.values(graph.nodes)));
     }
diff --git a/node_modules/nx/src/project-graph/affected/affected-project-graph.js b/node_modules/nx/src/project-graph/affected/affected-project-graph.js
index 5665c8d..d5a69aa 100644
--- a/node_modules/nx/src/project-graph/affected/affected-project-graph.js
+++ b/node_modules/nx/src/project-graph/affected/affected-project-graph.js
@@ -12,7 +12,8 @@ async function filterAffected(graph, touchedFiles, nxJson = (0, configuration_1.
     const touchedProjectLocators = [
         workspace_projects_1.getTouchedProjects,
         workspace_projects_1.getImplicitlyTouchedProjects,
-        project_glob_changes_1.getTouchedProjectsFromProjectGlobChanges,
+        // 플러그인 패턴 일치 변경 파일에 영향을주지 않도록 패치
+        // project_glob_changes_1.getTouchedProjectsFromProjectGlobChanges,
         touched_projects_1.getTouchedProjects,
     ];
     const touchedProjects = [];
diff --git a/node_modules/nx/src/project-graph/affected/locators/workspace-projects.js b/node_modules/nx/src/project-graph/affected/locators/workspace-projects.js
index c5aec64..edaa989 100644
--- a/node_modules/nx/src/project-graph/affected/locators/workspace-projects.js
+++ b/node_modules/nx/src/project-graph/affected/locators/workspace-projects.js
@@ -16,7 +16,8 @@ const getTouchedProjects = (touchedFiles, projectGraphNodes) => {
 exports.getTouchedProjects = getTouchedProjects;
 const getImplicitlyTouchedProjects = (fileChanges, projectGraphNodes, nxJson) => {
     const implicits = {
-        'nx.json': '*',
+        // nx.json이 변경된 경우 영향을받은 모든 파일에 적용하지 않도록 패치
+        // 'nx.json': '*',
     };
     Object.values(projectGraphNodes || {}).forEach((node) => {
         const namedInputs = {
```

# 🙂 마지막으로 생각해보세요

<div class="content-ad"></div>

보시다시피, 영향을 받는 프로세스는 수정된 파일 목록을 고려하는 것뿐만 아니라 다른 여러 요소를 기반으로 프로젝트 목록을 계산합니다.

이로 인해 조사가 항상 간단하지는 않고 종종 영향을 받는 모든 상황으로 이어질 수 있습니다.

일부 부분을 명확히 하고 영향을 받는 프로세스를 더 잘 이해하기 위한 핵심을 제공했기를 바랍니다.

미래에는 종속성 업데이트에 의해 영향을 받는 프로젝트와 같은 옵션 목록을 일반화하여 영향을 받는 프로세스에 대한 더 많은 사용자 정의 옵션이 있기를 희망합니다.

<div class="content-ad"></div>

곧 시작됩니다 🚀

# 관련된