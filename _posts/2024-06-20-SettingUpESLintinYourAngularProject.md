---
title: "당신의 Angular 프로젝트에 ESLint 설정하기"
description: ""
coverImage: "/assets/img/2024-06-20-SettingUpESLintinYourAngularProject_0.png"
date: 2024-06-20 05:26
ogImage:
  url: /assets/img/2024-06-20-SettingUpESLintinYourAngularProject_0.png
tag: Tech
originalTitle: "Setting Up ESLint in Your Angular Project"
link: "https://medium.com/@ayushgrwl365/setting-up-eslint-in-your-angular-project-888f210fc25e"
isUpdated: true
---

<img src="/assets/img/2024-06-20-SettingUpESLintinYourAngularProject_0.png" />

린트는 소프트웨어 개발의 중요한 측면으로, 코드 품질, 일관성 및 신뢰성을 보장합니다. Angular의 세계에서 ESLint는 코딩 표준을 강제하고 잠재적인 오류를 잡는 데 사용되는 주요 도구가 되었습니다.

# 전제조건

시작하기 전에 다음 전제조건이 갖추어져 있는지 확인해주세요:

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

- Node.js 및 npm: 개발 머신에 Node.js 및 npm이 설치되어 있는지 확인해주세요.
- Angular의 기본 이해: 이 안내서를 따라가기 위해서는 Angular 개발에 대한 이해가 필수적입니다.

# Angular 프로젝트 생성

이미 Angular 프로젝트가 없는 경우, Angular CLI(명령줄 인터페이스)를 사용하여 프로젝트를 생성할 수 있습니다. 터미널을 열고 다음 명령어를 실행하세요:

```js
npx @angular/cli new your-angular-project
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

"your-angular-project"을(를) 귀하의 프로젝트 이름으로 바꿔주세요. Angular CLI를 사용하면 프로젝트 설정을 안내받을 수 있습니다. 원하는 기능과 스타일시트를 선택할 수 있습니다.

# ESLint 설치

ESLint는 인기 있는 JavaScript 린트 도구로, Angular 프로젝트에 쉽게 통합할 수 있습니다. 시작하려면 프로젝트의 루트 디렉토리로 이동해주세요:

```js
cd your-angular-project
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

그러면 프로젝트에 개발 의존성으로 ESLint를 설치해보세요:

```js
npm install eslint --save-dev
```

# ESLint 규칙 구성

ESLint를 사용하면 프로젝트의 코딩 스타일과 가이드라인을 정의하는 규칙을 구성할 수 있습니다. 다음 명령어를 사용하여 프로젝트 디렉토리에 ESLint 구성 파일을 만들 수 있습니다:

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
npx eslint --init
```

이 명령어를 실행하면 .eslintrc.js 파일을 생성하기 위해 여러 질문들을 안내받게 됩니다. 여기서 프로젝트에 맞는 linting 규칙을 지정할 수 있습니다. 필요한 경우 이러한 규칙을 더 자세히 사용자 정의할 수도 있습니다.

다음은 ESLint 구성 파일의 예시입니다:

```js
module.exports = {
  extends: "eslint:recommended",
  rules: {
    // 여기에 사용자 정의 규칙을 추가하세요
  },
};
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

# 당신의 Angular 프로젝트와 통합하기

ESLint를 Angular 프로젝트와 통합하려면 package.json 파일에 linting 스크립트를 추가할 수 있습니다. package.json을 열고 다음과 같은 스크립트를 추가해보세요:

```js
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
}
```

lint 스크립트는 ESLint 위반 사항을 확인하고, lint:fix 스크립트는 이러한 문제 중 일부를 자동으로 수정하려고 시도할 것입니다.

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

# ESLint 체크 실행

이제 ESLint가 설정되었으므로 다음 명령을 실행하여 Angular 프로젝트에서 린팅 체크를 실행할 수 있습니다:

```js
npm run lint
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
> your-angular-project@0.0.0 lint /path/to/your-angular-project
> eslint .



...
✅ 모든 린트 체크 통과! 오류나 경고가 발견되지 않았습니다.
```

ESLint가 코드 위반을 스캔하여 터미널에서 피드백을 제공할 것입니다. 위의 예시 결과에서 58개의 문제가 있고, 52개는 --fix 옵션을 사용하여 잠재적으로 수정할 수 있음을 볼 수 있습니다.

일부 문제를 자동으로 수정하고 싶을 경우, 다음 명령을 실행할 수 있습니다:

```js
npm run lint:fix
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

위의 코드를 다음과 같이 Markdown 형식으로 변경해주세요.

This will apply automatic fixes to your code where possible.

## Automating Linting with IDE Plugins

To make the linting process even more seamless, consider installing ESLint plugins for your preferred code editor. Popular code editors like Visual Studio Code have ESLint extensions available. These extensions can highlight ESLint issues directly in your editor as you write code.

## Conclusion

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

이 글에서는 다음과 같은 중요한 작업을 다루었습니다:

- 새로운 Angular 애플리케이션 생성
- 코드에서 문제를 분석하고 확인하기 위해 ESLint 추가

ESLint 구성에 대해 더 자세히 알아보거나 더 고급 사용 사례를 탐색하려면 공식 ESLint 문서를 꼭 확인해보세요.
