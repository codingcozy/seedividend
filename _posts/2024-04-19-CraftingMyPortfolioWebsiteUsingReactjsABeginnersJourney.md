---
title: "Reactjs를 사용하여 나만의 포트폴리오 웹사이트 만들기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Crafting My Portfolio Website Using Reactjs A Beginners Journey"
link: "https://medium.com/@thakshiladb2000/crafting-my-portfolio-website-using-react-js-a-beginners-journey-374e85b1a895"
---



<img src="/assets/img/CraftingMyPortfolioWebsiteUsingReactjsABeginnersJourney_0.png" />

디지털 시대에는 온라인 존재감을 확립하는 것이 여러분의 기술과 성취를 전시하는 데 매우 중요합니다. 이를 달성하는 효과적인 방법 중 하나는 개인 포트폴리오 웹사이트를 만드는 것입니다. 웹 개발 열정가나 창의적 전문가로써 작품을 세계에 공개하려는 분이라면, React.js를 들어본 적이 있을 것입니다. React.js는 사용자 인터페이스를 구축하기 위한 인기 있는 자바스크립트 라이브러리입니다. 이 블로그 글에서는 React.js를 사용하여 나만의 포트폴리오 웹사이트를 제작하는 여정을 공유하겠습니다.

온라인 포트폴리오 아이디어에서 마지막 완성된 웹사이트까지, 제가 내린 의사결정, 마주한 도전, 그리고 경험한 성공까지 안내해 드릴 것입니다. 여러분의 포트폴리오 프로젝트에 영감을 얻고자 하는 개발자이거나 React.js에 대해 알아보고 싶어하는 분들에게, 본 글은 포트폴리오를 구현하는 과정과 사용한 도구에 대한 통찰력을 제공할 것입니다.

저 또한 React.js 초보자이며, YouTube 튜토리얼을 따라가기로 결정했고 해당 동영상에서 지식을 습득하여 포트폴리오를 만들었습니다. node.js를 설치하고 적합한 IDE를 설치하여 환경을 준비한 후, 제가 터미널에 아래 명령어를 입력하여 React 프로젝트를 생성했습니다.

<div class="content-ad"></div>

```js
npx create-react-app "프로젝트 이름"
```

프로젝트를 만드는 데 몇 분 정도 걸립니다. 프로젝트를 만든 후에는 코드가 포함된 생성된 파일이 보입니다. 먼저 "public" 폴더와 "src" 폴더에 포함된 모든 파일을 삭제했습니다. 그런 다음 index.html, index.css, index.js 및 App.jsx 파일을 수동으로 생성했습니다. 위에서 언급한 파일에 기본 코드 부분을 포함한 후에 내 웹 사이트에 포함해야 하는 컴포넌트를 만들기 시작했습니다. 그를 위해 어떤 종류의 계층 구조를 따라갔습니다. 지금까지 제 프로젝트 구조가 어떤지 아래에서 확인할 수 있습니다.

<img src="/assets/img/CraftingMyPortfolioWebsiteUsingReactjsABeginnersJourney_1.png" />

위 구조에서 "assets" 폴더는 웹사이트에서 사용해야 하는 자산을 저장하는 데 사용됩니다. "components" 폴더 안에 배치된 폴더는 각 컴포넌트에 대한 별도의 .jsx 파일과 .css 파일이 포함되어 있습니다. React 컴포넌트는 독립적이고 재사용 가능한 코드 조각입니다. JavaScript 함수와 동일한 목적을 제공하지만 독립적으로 작동하고 HTML을 반환합니다.```

<div class="content-ad"></div>

내 웹 사이트에 일부 .css 속성을 추가할 때 .css 변수를 사용했어요. 이번에 처음으로 웹 사이트에 .css 변수를 정의하고 사용했어요. 여기서는 내 웹 사이트에 적합한 배경 텍스처를 찾아야 했어요. 처음에는 적합한 텍스처를 찾기가 조금 어려웠어요. 그러나 마침내 이 멋진 웹 사이트를 찾았어요. 그 웹 사이트에서 아름다운 배경 텍스처를 무료로 제공해요. 해당 사이트를 방문하고 싶다면 여기를 클릭해주세요.

내가 이 웹 사이트를 반응형으로 만들기로 계획했어요. 그래서 첫 번째 단계로 index.css 파일에 미디어 쿼리를 추가했어요. 이번에 웹 페이지에서 미디어 쿼리를 주요하게 사용한 것이에요.

Header.jsx 파일을 만들 때 download 버튼과 contact 버튼에 `a` 태그를 포함하는 CTA.jsx 파일을 사용했어요. 변경 사항을 만들면서 브라우저에서 React 앱을 확인하는 것을 잊지 말아주세요. 이를 위해 터미널에서 아래 명령어를 사용할 수 있어요.

```js
npm start
```

<div class="content-ad"></div>

여기서 VS 코드를 사용하여 코드를 편집했어요. 만약 VS 코드를 사용하여 리액트 프로젝트를 만드는 초보자라면 "ES7+ React/Redux/React-Native snippets" 익스텐션을 설치하는 것을 잊지 마세요. 리액트 프로젝트를 만들 때 매우 유용합니다.

또 다른 리액트 컴포넌트 HeaderSocials.jsx를 사용하여 내 소셜 미디어 링크와 아이콘을 포함했어요. 그 컴포넌트에서는 `a` 태그를 사용하여 target="\_blank"을 사용했어요. 이를 통해 브라우저의 새 탭에서 해당 링크를 열 수 있어요. 또한 target="\_blank" 뒤에 rel="noreferrer"을 넣는 것을 잊지 마세요. rel="noreferrer"는 HTTP 헤더에서 참조 정보를 제거하여 대상 웹사이트로의 참조 정보 전달을 방지하는 데 사용돼요. 간단히 말해, 다른 사이트가 당신이 그들에게 링크를 걸고 있다는 것을 알지 못하도록 하려면 rel="noreferrer" 속성을 사용할 수 있어요. 이것은 SEO와 관련이 있어요. 그러나 내부 링크에 rel="noreferrer" 속성을 사용하지 말아야 하며, Google Analytics 보고서를 엉망으로 만들 수 있어요. 이에 관해 더 읽고 싶다면 이 사이트를 방문해보세요.

소셜 미디어 아이콘을 표시하기 위해 리액트 아이콘을 사용했어요. 해당 아이콘은 이 페이지를 방문하면 쉽게 찾을 수 있어요. 이 아이콘들을 사용하려면 먼저 리액트 아이콘을 프로젝트에 설치해야 해요. 이를 위해 다음 명령어를 사용할 수 있어요.

```js
npm install react-icons --save
```

<div class="content-ad"></div>

헤더 컴포넌트에 이미지를 추가할 때 적절한 배경으로 편집했어요. 이번에는 linear-gradient()를 사용했어요. 사실, 기억하기로는 linear-gradient()를 배경으로 추가하는 건 이번이 처음이에요. 또한, 헤더 컴포넌트에는 미디어 쿼리를 추가하여 반응형으로 만들었어요.

![CraftingMyPortfolioWebsiteUsingReactjsABeginnersJourney_2.png](/assets/img/CraftingMyPortfolioWebsiteUsingReactjsABeginnersJourney_2.png)

그리고 이 웹사이트를 위해 플로팅 네비게이션 바를 만들었어요. 네비게이션 바에 링크를 표시하기 위해 react 아이콘을 사용했어요. 여기서는 관련 링크를 클릭하면 활성 링크가 강조되도록 했어요. 그러기 위해 react useState 훅을 사용했어요. React useState 훅은 함수 컴포넌트의 상태를 추적할 수 있게 해줘요. useState를 사용하기 전에 먼저 import를 해야해요. 이를 위해 아래 코드를 jsx 파일 상단에 추가해 주세요.

```js
import { useState } from "react";
```

<div class="content-ad"></div>

useState 훅에 대해 더 알아보려면 이 사이트를 참조해보세요.

“About” 섹션을 생성할 때 `article` 태그를 사용했어요. 이 태그는 독립적이고 자체 포함된 콘텐츠를 지정하는 데 사용됩니다. `article` 요소는 브라우저에서 특별한 것을 렌더링하지 않아요. 또한, `small` 태그를 사용했어요. 이 태그는 작은 텍스트를 정의하는 데 사용됩니다.

“about” 섹션을 만들 때, display: grid; CSS 속성을 사용했어요. 그것을 사용함으로써 페이지를 그리드로 표시하도록 설정할 수 있어요. 또한, grid-template-columns라는 CSS 속성을 사용했어요. 이 속성은 열의 크기와 그리드 레이아웃에서 몇 개의 열이 있는지를 지정하는 데 사용됩니다.

웹 사이트에 적합한 사진을 선택하는 동안 문제가 발생했어요. 그래서 Adobe Photoshop을 사용하여 몇 가지 사진을 만들기로 결정했어요. 어렵지 않은 작업이에요. 해당 도구에 대한 약간의 지식이 있다면 여러분도 할 수 있어요.

<div class="content-ad"></div>

다음으로, Experience 섹션을 만들기 시작했어요. 만들다가 'Tailwind CSS'라는 새로운 용어를 발견했어요. 이것은 유틸리티 우선 CSS 프레임워크로, flex, pt-4, text-center, rotate-90와 같은 클래스가 포함되어 있어요. 이를 조합하여 마크업에서 직접 어떤 디자인이든 구성할 수 있어요. 그러나 이 웹사이트에는 포함시키지 않았어요.

"myprojects" 섹션에서는 각 article 태그에 동일한 요소가 있다면, 리액트 데이터 배열을 사용하여 해당 article 태그에 데이터를 포함시킬 수 있어요. 하지만, 제 article 태그에 다른 요소가 있기 때문에 그것들을 사용하지 않았어요.

"contacts" 섹션에는 이메일 발송 폼을 구현했어요. 이메일을 보내기 위해 EmailJs를 사용했어요. EmailJS는 클라이언트나 서버 측 코드에서 직접 사용자에게 이메일을 보낼 수 있는 도구를 제공하는 백엔드-서비스입니다. EmailJs를 사용하려면 이 웹사이트를 방문하고 지시 사항을 따르면 되어요. EmailJs를 사용하기 전에 일부 종속성을 설치해야 해요. 터미널에 아래 명령어를 입력하세요.

```js
npm install email-js --save
```

<div class="content-ad"></div>

얼마 전 몇 가지 컴파일 오류를 마주쳐서, 아래 종속성을 추가로 설치했어요.

```js
npm install @emailjs/browser
```

`@emailjs/browser`를 가져오는 걸 잊지 마세요. 그렇지 않으면 컴파일 오류가 발생할 수 있어요. 이메일 서비스를 만들어 메시지를 이메일로 받을 수 있습니다.

그 다음으로, 웹사이트를 위해 "푸터(footer)"를 만들었어요. 그것도 이전 단계와 똑같았고, 아무런 새로운 내용이 없었어요.

<div class="content-ad"></div>

드디어 웹사이트를 만드는 마지막 단계에 도달했어요. 그것은 웹사이트를 배포하는 것이에요. 제가 GitHub 페이지를 이용해서 웹사이트를 배포했답니다. 리액트 앱을 GitHub 페이지를 이용해 배포하는 방법을 검색하다가 이 놀라운 동영상을 찾았어요. 여기를 클릭해서 해당 동영상을 시청할 수도 있어요.

그래서, 배포 과정에서 먼저 해야 할 일은 package.json 파일의 devDependencies에 gh-pages 종속성을 추가하는 것이에요. 이를 위해 아래 명령어를 실행해야 해요.

```js
npm install gh-pages --save-dev
```

여기서 --save-dev는 해당 종속성을 devDependencies에 저장하기 위해 사용되어요. 그 다음으로 "homepage", "predeploy", "deploy" 필드를 package.json 파일에 추가해야 해요. 위 동영상을 따라가면 정확히 언급한 내용을 이해할 수 있어요. 모든 작업을 마치고 나면 터미널에서 아래 명령어를 실행해야 해요.

<div class="content-ad"></div>

```js
npm run deploy
```

인터넷 연결이 잘 되어 있는지 확인해주세요. 그렇지 않으면 이 과정이 중단되고 더 많은 오류가 발생할 수 있습니다. 저도 명령을 실행하는 도중 네트워크 문제를 겪어 배포 단계가 실패했었어요. 그 후 연결을 안정화시키고 다시 위의 명령을 실행했더니, 계속해서 만들려고 하는 브랜치에 이미 존재하는 호스트 파일이라고 알려주었어요. 그러나 원격 저장소를 확인하니 gh-pages라는 브랜치는 없었어요. 그래서 구글링을 한 결과, 문제 해결 방법은 프로젝트 내 node modules/.cache 폴더에서 gh-pages 폴더를 삭제하는 것이라는 걸 알게 되었어요. 프로젝트를 배포한 후에는 웹사이트를 확인할 수 있습니다. 웹사이트를 수정할 때마다 npm run deploy를 실행하는 걸 잊지 마세요. 그렇지 않으면 호스팅된 웹사이트에 적용되지 않습니다.

사실 GitHub Actions를 사용하면 npm run deploy 명령을 반복해서 실행할 필요가 없어요. 이 글이 게시된 몇 시간 후에 이를 시험해봤어요. GitHub Actions는 빌드, 테스트 및 배포 파이프라인을 자동화할 수 있는 지속적인 통합 및 배포 (CI/CD) 플랫폼입니다. 매번 커밋을 할 때마다 React 앱을 자동으로 빌드하고 배포합니다.

GitHub Actions를 사용하려면 Github 저장소로 이동하여 액션 탭을 선택해야 합니다. 그 후 새로운 workflow를 생성하고 Node.js를 워크플로로 구성해야 합니다. 왜냐하면 이것은 React 앱이기 때문입니다. 지속적인 통합 카테고리 아래에서 찾을 수 있습니다. 그 후 .yml 파일을 일부 수정해야 합니다. 처음에 App.test.js 파일을 삭제했기 때문에 .yml 파일에서 — run: npm test를 제거해야 했어요. 그렇지 않으면 오류가 발생합니다.

<div class="content-ad"></div>

GitHub actions를 검색하다가 매우 유용한 비디오를 발견했어요. 그 비디오를 따라하면 React 앱의 workflow를 쉽게 구성하고 배포할 수 있어요. 여기를 클릭하면 그 비디오를 찾을 수 있어요. 또한 gh-pages 웹 페이지의 지시 사항을 따라야 해요. 여기를 클릭하면 방문할 수 있어요.

React 앱이 컴파일할 때 경고를 발생시키지 않도록 주의해야 해요. 왜냐하면 GitHub actions는 그 경고를 오류로 간주하고 작업을 망가뜨릴 수 있어요. 또한 배포 단계에서 workflow에서 다음과 같은 오류가 발생할 수 있어요.

```js
ProcessError: remote: Permission to <your repo link> denied to github-actions[bot].fatal: unable to access <your repo link>: The requested URL returned error: 403
```

만약 해당 오류가 발생하면 repo 설정 -` Action -` General -` Workflow permissions로 이동하여 읽기 및 쓰기 권한을 선택해야 해요. 이렇게 하면 해당 문제가 해결될 거예요. 이 방법을 스택오버플로우에서 찾았고 여기에서 해당 링크를 확인할 수 있어요.

<div class="content-ad"></div>

모든 것이 올바르게 완료된 후에 React 앱을 변경하고 GitHub 레포지토리에 커밋할 수 있습니다. 커밋한 후에 자동으로 배포되는 것을 볼 수 있을 겁니다.

그게 전부에요. 마침내, 나의 포트폴리오 웹사이트를 만드는 것의 끝에 이르렀습니다. React.js를 사용하여 나의 포트폴리오 웹사이트를 만들어 가는 이 여정 속에서, 현대적인 웹 개발 도구들이 제공하는 끝없는 가능성들과 그 힘을 깨달았습니다. 이 과정을 통해, React.js가 단지 라이브러리가 아니라 창조성을 상호작용하는 웹 경험으로 변화시키는 문으로서의 가치를 알게 되었습니다. 처음에 겪은 어려움과 학습 곡선에도 불구하고, 나의 포트폴리오가 현실로 만들어지는 것을 보는 만족감은 엄청나게 보람 있었습니다.

마지막으로, 새로운 것을 배울 주저하지 마세요. 믿어요, 언젠가는 당신에게 도움이 될 것입니다. 일을 할 때 첫 번째로 실패할 수도 있어요. 괜찮아요. 항상 실수로부터 배우려고 노력해 보세요. 그러면 최종적으로 더 나은 결과를 얻을 수 있을 겁니다.

만약 제 포트폴리오 웹사이트와 관련된 GitHub 레포지토리를 보고 싶다면, 여기 그 링크들이 있습니다.

<div class="content-ad"></div>

그럼, 이 기사의 끝입니다. 다음 기사에서 또 만나요.
