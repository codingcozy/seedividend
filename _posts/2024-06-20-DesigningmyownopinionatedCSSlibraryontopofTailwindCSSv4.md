---
title: " TailwindCSS v4을 기반으로 하는 나만의 주관적인 CSS 라이브러리 디자인하기"
description: ""
coverImage: "/assets/img/2024-06-20-DesigningmyownopinionatedCSSlibraryontopofTailwindCSSv4_0.png"
date: 2024-06-20 03:23
ogImage: 
  url: /assets/img/2024-06-20-DesigningmyownopinionatedCSSlibraryontopofTailwindCSSv4_0.png
tag: Tech
originalTitle: "🌈 Designing my own opinionated CSS library on top of TailwindCSS v4"
link: "https://medium.com/the-research-nest/designing-my-own-opinionated-css-library-on-top-of-tailwindcss-v4-8f8e11f4a875"
---


## AltCSS를 소개합니다

![이미지](/assets/img/2024-06-20-DesigningmyownopinionatedCSSlibraryontopofTailwindCSSv4_0.png)

오늘은 선택할 수 있는 다양한 옵션이 많습니다 (선호하지 않는 순서로 나열):

- Tailwind CSS
- Bootstrap 5
- Semantic UI

<div class="content-ad"></div>

일부 새로운 및 앞으로 나올 옵션에는 Sugar CSS가 있습니다. 특정 분야를 위해 Animate CSS나 Pattern CSS와 같은 라이브러리가 있지만, 제게는 잘 맞지 않습니다.

지난 몇 년 동안 다양한 맥락에서 CSS 작업에 문제가 있었습니다.

- CSS 라이브러리가 제공하는 클래스 중 50%도 거의 사용하지 않습니다. 문서를 보면, 저에게는 관련 없는 많은 것으로 가득 차 있어, 부풀려지고 서투릅니다. 대다수의 사람들은 대부분의 기능과 클래스를 사용하지 않습니다. 사용되지 않는 클래스들은 제거되어 성능에는 영향을 주지 않지만, 개발을 할 때 가볍지 않게 느껴집니다.
- 종종 CSS를 덮어쓰거나 기존 클래스 위에 자체 클래스를 만들어야 합니다. 솔직히 말하면, 우리 고유한 맥락에 완벽히 맞는 라이브러리는 없습니다. 시간이 지남에 따라 프로젝트 간의 작업 반복이 많이 발생합니다.
- 간단한 것조차 여러 개의 CSS 클래스를 사용하는 것을 좋아하지 않습니다. Tailwind CSS를 살펴보면, 하나의 요소에 거의 항상 여섯 개나 일곱 개의 클래스가 함께 붙어있습니다. 클래스 이름이 길어지면 금방 번거로워지며, 쓰기, 기억하기, 읽기, 유지 관리하기 어려워집니다. 그렇지 않으면, 그 위에 래퍼 클래스를 놓아야 합니다.

위 문제를 해결하기 위해 제게 잘 맞는 주관적인 CSS 라이브러리를 만들었습니다. 다른 사람들과 반드시 일치하지는 않을 것입니다. 간단히 말하면, 이 라이브러리는 다수의 사람과 일치하지 않는 실천원칙을 따르거나 사용할 수 없을 것입니다. 그래서, 이 라이브러리를 AltCSS라고 명명하기로 결정했습니다.

<div class="content-ad"></div>

내가 AltCSS에 대한 목표는 다음과 같습니다:

- 평상시 라이브러리보다 80% 더 적은 CSS 클래스를 사용하면서 가장 흔한 사용 사례 80% (또는 그 이상)에 맞는 의견이 강한 스타일링.
- 가벼우며 최적화되고 용량이 작습니다.

본문의 다음 부분은 이 라이브러리를 만들기 위해 따란한 단계별 프로세스에 관한 내용입니다.

# 단계 1: 가장 흔히 사용되는 CSS

<div class="content-ad"></div>

가장 자주 사용되는 CSS 스타일로 좁혀봤어요. 이 과정에서 자주 다루는 네 가지 유형의 웹사이트를 고려해봤어요 (또는 미래에 다룰 계획이 있는). 각 유형에 대해 내 맥락에서 일반적으로 요구되는 스타일링 요소를 확인했어요.

- 랜딩 페이지
— 이미지
— 버튼
— 가입/이메일 폼
- 포트폴리오 웹사이트
— 그리드
— 카드
- 블로그 및 문서 사이트
— 타이포그래피
— 텍스트 레이아웃
— 링크
— 내비게이션
- 싱글 페이지 웹 앱
— 입력란, 라디오, 체크박스 등과 같은 폼 요소들

MVP 버전에서는 현재 활동적으로 사용하는 스타일에만 초점을 맞췄어요.

대부분의 CSS 라이브러리는 일정한 디자인 시스템을 따르지만, 저는 특정한 것을 따르지 않았어요. 모든 것을 자연스럽고 간단하게 유지했거든.

<div class="content-ad"></div>

그래서, 모든 것을 처음부터 만들어야 할까요?

처음에는 그 방향으로 가고 있었지만, 그때쯤에 TailwindCSS가 다음 주요 버전인 버전 4의 진행 상황을 오픈소스로 공개했어요.

그냥 갑자기 생각이 났어요. 그것을 기반으로 삼아 그 위에 더 쌓아올려야겠다는 생각이 들었어요. 마치 간단하고 사용하기 쉬운 방식으로 패키지화된 좋은 작은 추상화처럼 말이에요. Tailwind는 이렇게 사용하도록 만들어진 것이 아니었지만, 그래도 한번 시도를 해봐야겠죠.

TailwindCSS 알파 버전 4 외에, 저는 패키지 매니저로 Bun을 사용했어요.

<div class="content-ad"></div>

# 단계 2: 명명 규칙

가능한 한 간단하고 짧고 자연스럽게 유지하고 싶어요. 여기서 한 가지 선택사항을 정했습니다.

- 모든 기본 HTML 태그는 본질적으로 적용된 Tailwind CSS 스타일이 적용될 것입니다.
- 특정한 경우에 사용자 정의 클래스를 만들어야 할 때는 가능한 한 짧게 유지하려고 약어 'a-name'의 명명법을 따를 것입니다.

# 단계 3: CSS 작성하기

<div class="content-ad"></div>

먼저, 빈 프로젝트 npm init을 생성하고 원하는 파일 구조를 만들었습니다.

사용자 관점에서 몇 가지 핵심 디자인 원칙이 있습니다:

- 클래스 이름 작성 금지
- CSS 작성 금지
- 간단하게 유지
- 깔끔하게 유지

내 첫 번째 선호도인 다크 모드로 직접 시작했습니다. 새로운 클래스 이름을 만들지 않고 원시 HTML 요소에 스타일을 적용하려고 노력했습니다. 카드 및 그리드와 같은 컴포넌트는 이런 식으로 만드는 것이 어려울 수 있습니다. 네이티브 요소를 특정한 방식으로 중첩하여 이러한 컴포넌트를 만드려고 노력했습니다. 모든 문서가 완료되면 이러한 예제들을 더 많이 공유하겠습니다.

<div class="content-ad"></div>

MVP를 위해 제가 헤딩, 링크, 카드 및 그리드 레이아웃을 위한 기본 CSS를 구현했어요. 모든 것들이 표준 화면 크기에 대응할 수 있도록 했어요.

예를 들어, 이것이 제 타이포그래피 스타일의 일부 예시에요.

```js
/* 타이포그래피 */
/* 헤딩 */
h1, h2, h3 {
    @apply text-gray-400 tracking-tight;
}

h1 {
    @apply text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold my-6;
}

h2 {
    @apply text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold my-5;
}

h3 {
    @apply text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium my-4;
}

h4 {
    @apply text-lg text-yellow-400 sm:text-xl md:text-2xl lg:text-3xl font-medium my-3 tracking-tight;
}

/* 텍스트 */
p {
    @apply text-lg sm:text-xl md:text-2xl text-gray-500 my-3 leading-relaxed tracking-wide;
}

/* 링크 */
a {
    @apply text-yellow-400 relative transition-colors duration-200 ease-in-out no-underline;
}

a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
}

a:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
}
```

# 단계 4: CSS 최소화

<div class="content-ad"></div>

코드가 준비되었으면, 그것을 단일 파일로 미니파이하면 됩니다 ( alt.min.css ). 이를 위해 Tailwind Cli의 알파 버전을 사용했어요.

여기 참고용으로 제 package.json 이에요.

```json
{
  "dependencies": {
    "@tailwindcss/cli": "^4.0.0-alpha.16",
    "tailwindcss": "^4.0.0-alpha.16"
  },
  "scripts": {
    "build": "bunx @tailwindcss/cli@next -i app.css -o dist/alt.min.css --minify"
  },
  "devDependencies": {
    "prettier": "^3.3.1",
    "prettier-plugin-tailwindcss": "^0.6.1"
  }
}
```

app.css 파일은 src 폴더에서 가져온 모든 CSS 파일을 포함하고 있어요.

<div class="content-ad"></div>

bun run build이 위 스크립트에 따라 압축 파일을 만드는 마법을 부릅니다.

이 단계에서 추가로 해야 할 일이 몇 가지 있습니다.
압축 파일에는 이제 내가 만든 것 외에도 모든 tailwind 클래스와 변수가 포함되어 있습니다. 내 디자인에서 사용한 요소와 변수만 최종 압축 파일에 포함되도록 필터링해야 합니다. 이 향상된 기능은 향후 업데이트에 남기도록 하겠습니다.

# 단계 5: 테스트

압축 파일이 준비되면, 모든 것을 테스트하기 위해 몇 가지 예제 페이지를 만들었습니다. 그 후에 다른 사람들이 쉽게 설치하고 프로젝트에 포함할 수 있도록 npm 패키지로 게시하는 시간이었습니다.

<div class="content-ad"></div>

# 단계 6: NPM 게시

실제로 코드를 npm 패키지로 게시하는 것은 매우 간단합니다. alt.min.css 파일이 저장된 dist 폴더 내에 새로운 package.json을 생성했습니다.

이 파일에는 npm 패키지를 게시하는 데 필요한 모든 세부 정보와 최종 패키지에 푸시하려는 파일이 포함되어 있습니다. 제 경우에는 최종 출력인 dist 폴더를 푸시하고 싶었습니다. 여기가 내 dist package.json입니다.

```json
{
    "name": "altcss",
    "version": "0.0.6",
    "description": "의견이 분분하고 독특하며 가벼운 CSS 컴포넌트 라이브러리.",
    "main": "alt.min.css",
    "files": [
        "alt.min.css",
        "README.md"
    ],
    "keywords": [
        "css",
        "library",
        "altcss",
        "tailwindcss"
    ],
    "author": "aditya-xq",
    "license": "MIT"
}
```

<div class="content-ad"></div>

```js
cd dist
npm login
npm publish
```

여기까지입니다!

# 최종 결과

MVP가 모두 설정되어 사용하고 실험할 준비가 되어 있습니다.

<div class="content-ad"></div>

프로젝트에 altcss를 추가하는 방법이에요. 아래 명령어 중 하나를 사용해서 altcss를 직접 프로젝트에 추가할 수 있어요.

```js
npm install altcss
pnpm add altcss
bun add altcss
```

그런 다음, 필요한 파일을 메인 스크립트나 전역 스타일로 가져와야 해요. 예를 들어, Sveltekit에서는 +layout.svelte 파일의 script 태그 아래에 가져와야 해요.

```js
import 'altcss/alt.min.css';
```

<div class="content-ad"></div>

원시 HTML을 작성하고 자동으로 적용되는 스타일링을 즐기세요.

여기에 AltCSS로 만든 간단한 데모 페이지가 있습니다.

이 프로젝트의 GitHub 저장소는 여기에 있습니다.

마지막으로 AltCSS를 사용하여 만든 또 다른 페이지가 여기에 있습니다.

<div class="content-ad"></div>

# 끝 내용

이것은 몇 가지 구성 요소와 스타일이 구현된 MVP일 뿐입니다. 대부분의 프로젝트에 표준 CSS 프레임워크/라이브러리로 AltCSS를 사용할 계획입니다. 특정 스타일이나 구성 요소를 구현해야 할 때는 이를 라이브러리에 추가할 것입니다.

다음은 내가 생각하는 일반적인 로드맵입니다:

- 나머지 선정된 HTML 태그의 디자인을 완성합니다.
- 나만의 디자인에 맞게 실제로 사용자 지정된 스타일만 포함되도록 최소화된 CSS를 정리하고 필터링합니다.
- 적절한 라이트 모드와 다크 모드를 구현합니다.
- 사람들이 AltCSS를 사용자의 디자인 선호에 맞게 사용자 인터페이스를 통해 모양을 조정하고 프로젝트용으로 최소화된 CSS를 내보낼 수 있는 "CSS 디자인 빌더"를 만듭니다.

<div class="content-ad"></div>

다음에 또 만나요.