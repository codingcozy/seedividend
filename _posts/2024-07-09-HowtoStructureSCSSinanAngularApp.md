---
title: "Angular 앱에서 SCSS 구조화하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-HowtoStructureSCSSinanAngularApp_0.png"
date: 2024-07-09 18:09
ogImage:
  url: /assets/img/2024-07-09-HowtoStructureSCSSinanAngularApp_0.png
tag: Tech
originalTitle: "How to Structure SCSS in an Angular App"
link: "https://medium.com/@stefaniefluin/how-to-structure-scss-in-an-angular-app-a1b8a759a028"
---

SCSS를 좋아하는 경우, Angular 애플리케이션에서 사용해야 합니다. 다행히 Angular CLI가 모든 설정을 해줍니다!

먼저 Angular CLI가 처리해주는 파일 변경 사항과 기존 프로젝트를 SCSS로 전환하는 방법을 살펴보겠습니다. 그런 다음 Angular 프로젝트를 작업할 때 SCSS 파일 및 폴더 구조를 설정하는 방법에 대해 설명하겠습니다.

시작해 봅시다!

# Angular CLI를 사용한 새 프로젝트 설정

<div class="content-ad"></div>

새 Angular 앱을 만들 때 ng new app-name 명령을 사용하면 CLI가 "어떤 스타일 시트 형식을 사용하시겠습니까?"라고 묻습니다. SCSS를 선택해주세요.

![SCSS](/assets/img/2024-07-09-HowtoStructureSCSSinanAngularApp_0.png)

새 프로젝트를 만들 때 이 옵션을 선택하면 CLI가 주로 수행하는 작업은 다음과 같습니다:

- angular.json 빌드/options/styles 섹션에 `src/styles.scss`를 추가합니다.
- `styles.scss` 파일을 생성하여 src 폴더에 추가합니다.

<div class="content-ad"></div>

CLI는 테스트 파일 및 참조도 구성하지만, 이 부분에 대해서는 다루지 않을 거예요.

# 기존 Angular 프로젝트를 SCSS로 변경

기존 프로젝트에서 SCSS 스타일시트 형식으로 전환해야 할 필요가 있다면, 위의 두 항목만 있으면 충분해요!

CLI 구성 업데이트

<div class="content-ad"></div>

다른 것을 하실 일은 CLI 구성을 업데이트하여 새로운 컴포넌트를 생성할 때 CSS 파일 대신 SCSS 파일을 생성하도록 하는 것입니다. 이 작업을 하는 방법은 두 가지가 있습니다. CLI 명령을 사용하거나 참조를 수동으로 추가하는 것입니다. 명령을 사용하려면 다음을 터미널에 입력하세요:

ng config schematics.@schematics/angular:component.styleext scss

수동으로 변경하려면 다음과 같이 `angular.json` 파일에 다음 스키매틱스 참조를 추가하십시오:

```json
"schematics": {
   "@schematics/angular:component": {
      "style": "scss"
   }
}
```

<div class="content-ad"></div>

"schematics":'"@schematics/angular:component":'"style": "scss"',

SCSS-Scaffold NPM 패키지 사용하기

얼마 전에 Angular 스키마틱을 만들었어요. 여기에서 더 자세히 읽을 수 있어요. 이 스키마틱은 SCSS 폴더 구조를 간편한 명령어 npm add scss-scaffold로 모두 추가해 주죠. 그래서 당신이 따로 하지 않아도 되요 😊

여기서 제가 쓴 게시물을 확인해 볼 수 있어요:

<div class="content-ad"></div>

# SCSS 구조

글로벌 스타일링 철학

하나의 전역 `styles.scss` SCSS 파일을 유지하거나 컴포넌트별로 스타일링을 할 수 있습니다. 단순하게 유지하고 싶다면 전역 스타일을 하나로 관리할 수 있고, 개별 컴포넌트별로 스타일링을 할 수도 있습니다.

저는 원활한 협업을 위해 컴포넌트 스타일링을 피하고 가능한 한 전역 스타일로 유지하는 것을 선호합니다. 특히 여러 명의 개발자가 협업하는 경우에는 금방 지저분해질 수 있기 때문입니다.

<div class="content-ad"></div>

글로벌 스타일을 사용하면 모든 사람이 동일한 구조와 시스템을 사용하게 되며, 패턴 및 사용 사례에 대한 토론을 촉진합니다.

SCSS 폴더 구조

Angular 프로젝트를 준비하고 SCSS를 사용할 수 있도록 설정한 후에는 몇 가지를 옮겨야 합니다.

시작하려면:

<div class="content-ad"></div>

- 앞서 src 프로젝트 폴더에 styles라는 폴더를 만들어주세요.
- styles.scss 파일을 새로 만든 styles 폴더로 옮겨주세요.
- angular.json 파일을 업데이트하여 styles.scss 파일의 새 위치를 가리키도록 해주세요.

![이미지](/assets/img/2024-07-09-HowtoStructureSCSSinanAngularApp_1.png)

이제 폴더 구조를 만들어봅시다. 저는 7-1 패턴과 유사한 방식을 따르되 일부 이름을 수정하여 사용하는 것을 좋아합니다.

아래는 제가 스타일 폴더를 어떻게 배치하는지 예시입니다.

<div class="content-ad"></div>

![Base Folder](/assets/img/2024-07-09-HowtoStructureSCSSinanAngularApp_2.png)

My base folder contains global styles which include general layout items, a few default overrides similar to normalize.css, and my base font size to ensure consistent use of rems.

Additionally, the base folder includes a typography stylesheet for all font-related styles. This covers headings, general text fonts, links, and any necessary custom font classes.

<div class="content-ad"></div>

페이지

저는 페이지를 적게 사용하려고 노력하지만 특정 페이지에만 적용되는 비표준 스타일을 넣는 곳입니다. 전역적으로 재사용 가능한 요소에 대해 패턴과 시스템을 자주 찾지만 때로는 사용자 정의 사항이있을 때 여기에 넣습니다.

모듈(또는 구성 요소)

모듈(또는 일반적으로 구성 요소로 알려진)은 전체적으로 재사용 가능한 구성 요소 스타일을 유지합니다. 이에는 헤더 및 푸터, 버튼, 레이블, 탐색, 카드 또는 프로젝트 전체에서 여러 곳에서 사용 중인 다른 요소가 포함됩니다.

<div class="content-ad"></div>

도우미

도우미는 가장 중요한 것들 중 일부가 있는 곳입니다. 먼저 사용해야 할 것은 상수입니다. 이 스타일시트에는 색상, 글꼴 패밀리, z-인덱스 및 일부 기본 크기에 대한 모든 변수가 포함되어 있습니다. 예를 들어, $border-radius-large 및 $border-radius-small 변수를 추가하여 앱 전체에서 일관성 있게 유지하는 데 도움이 되도록합니다.

또한 몇 가지 사용자 정의 재사용 가능한 요소용 mixin 스타일시트도 추가하고 싶을 것입니다. Mixin을 사용하면 인수를 전달할 수 있습니다. 저는 모양뿐만 아니라 폰트 그룹 (예: 기본 "타이틀 폰트" 스타일을 정의하고 다른 스타일시트에서 확장할 수 있는)에 대해 mixin을 사용하는 것을 좋아합니다.

공급업체(선택 사항)

<div class="content-ad"></div>

마지막으로, 만약 부트스트랩이나 Normalize.css와 같은 서드 파티 라이브러리를 포함시키는 경우 벤더 폴더를 추가하는 것이 좋을 수도 있어요. 때로는 이 벤더 폴더에 모든 벤더별 구성 또는 스타일을 오버라이드하는 설정을 유지하는 것이 도움이 될 수 있어요. 여기에 동일한 스타일시트(예: 부트스트랩 베이스 도구)만 가져와서 유지할 수도 있어요.

```js
"styles": [
   "../node_modules/bootstrap/dist/scss/bootstrap.scss",
   "styles/styles.scss"
],
```

프린트 스타일시트 (선택사항)

가끔 포함시키는 다른 파일은 print.scss 스타일시트입니다. 여기에는 사이트의 사용자 정의 프린트 스타일링이 포함돼요. 이것은 기술 문서를 포함하는 매우 애니메이팅되거나 화려한 웹사이트에서 특히 유용하죠 - 당신이 일부 스타일을 포함해서 콘텐츠를 단순화하고, 프린트할 때 눈에 잘 들어오도록 몇몇 요소를 제외할 수도 있어요. 이것을 베이스 폴더에 쉽게 담을 수도 있지만, 전체 애플리케이션에 사용될 때 알맞은 형식(디지털 장치)으로 적용될 때 주로 전체적인 콘텐츠를 크게 수정하기 때문에, 별도로 유지해 두는 것을 선호해요.

<div class="content-ad"></div>

SCSS 디렉토리 파일

SCSS 구조에는 해당 폴더 내의 모든 개별 스타일시트를 포함하는 디렉토리 파일(즉, \_base-dir.scss)이 있는 것이 포함됩니다. 그런 다음, 해당 디렉토리 파일은 'main' styles.scss 폴더에 포함되어 보다 깔끔하고 조직적이며 읽기 쉽게 유지되도록 돕습니다. 나는 내 디렉토리 파일을 다음과 같이 설정하는 것을 좋아합니다:

![How to Structure SCSS in an Angular App](/assets/img/2024-07-09-HowtoStructureSCSSinanAngularApp_3.png)

해더는 내가 무엇을 보고 있는지 빨리 파악하는 데 도움을 줍니다 - 특히 파일을 많이 편집할 때. 아래에는 해당 폴더 내에서 개별 스타일시트를 가져올 중요한 부분들이 있습니다. 이 경우, 베이스 폴더입니다.

<div class="content-ad"></div>

SCSS 메인 파일 롤업

마지막으로 해야 할 일은 그 디렉토리 파일들을 실제로 앱에서 읽히는 주 스타일.scss 파일로 롤업하는 것입니다(angular.json 파일에서 지시한 대로).

내 styles.scss 폴더는 이렇게 보일 수 있습니다:

![이미지](/assets/img/2024-07-09-HowtoStructureSCSSinanAngularApp_4.png)

<div class="content-ad"></div>

# 컴포넌트 스타일링 사용하기

컴포넌트 스타일링을 사용하고 싶지만 SCSS 구조를 일부 사용하고 싶다면, 다음 형식을 사용하여 단순히 특정 스타일시트를 your-component.component.scss 파일에 가져오면 됩니다:

```js
@import ‘styles/variables’;
```

이 파일을 이동하거나 이름을 변경하는 경우, 이 경로를 업데이트해야 함을 유의하세요.

<div class="content-ad"></div>

# 요약

그게 다야! SCSS가 작동 중이고 잘 구성된 폴더 구조가 있다면, 스타일시트 / CSS 코드를 유지보수할 때 훨씬 효율적이고 조직적일 수 있을 겁니다.

코딩 즐기세요!

# 후기 📋

<div class="content-ad"></div>

CLI에는 다양한 설정 옵션이 있지만, 저는 컴포넌트를 생성할 때 현재 있는 --skipTests=false 플래그와 유사한 "스타일 없음" 플래그가 있는 것이 좋다고 생각해요. 제가 스타일시트를 모두 스타일 폴더에서 독립적으로 구성하기 때문에 컴포넌트 기반 스타일시트가 필요하지 않아요.

다행히 원하는 것을 찾고 있다면 인라인 스타일링, 외부 스타일링 및 스타일시트 환경 설정 변경을 위한 플래그가 있어요(위에서 보았던 것처럼).

# 자료 🧰

더 많이 알고 싶다면 SCSS 및 Angular 및 CLI와 함께 SCSS 사용에 대해 더 알아볼 수 있는 몇 가지 자료가 여기에 있어요.

<div class="content-ad"></div>

- https://sass-guidelin.es/#architecture
- https://sass-lang.com/styleguide/layout
- https://scotch.io/tutorials/using-sass-with-the-angular-cli (지난 정보이지만 유용한 배경 정보)
- https://angular.io/cli
