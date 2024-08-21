---
title: "2024년 기준으로 React 프로젝트 폴더 구조 설정하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Setting Up a React Project Folder Structure in 2024 Best Practices"
link: "https://medium.com/@megha.kumari_63653/setting-up-a-react-project-folder-structure-in-2024-best-practices-93c27a49bbfe"
isUpdated: true
---

![SettingUpaReactProjectFolderStructurein2024BestPractices_0](/assets/img/SettingUpaReactProjectFolderStructurein2024BestPractices_0.png)

React.js는 Facebook에 의해 소개된 이후 웹 개발 세계에서 급격한 변화를 가져왔습니다. 우리가 2024년으로 나아가면서, React 프로젝트를 설정하는 최상의 방법을 따라야 합니다. 이 블로그 포스트에서는 2024년에 React 프로젝트를 위한 폴더 구조를 설정하는 방법을 살펴볼 것입니다.

# 왜 폴더 구조가 중요한가요?

잘 구성된 폴더 구조는 대규모 코드 베이스를 유지하는 데 중요합니다. 이를 통해 코드를 이해하기 쉽고, 디버깅하고 확장하기에 용이해집니다. 또한 새로운 개발자가 빠르게 숙련될 수 있도록 도와줍니다.

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

# 권장 폴더 구조

다음은 React 프로젝트를 위한 권장 폴더 구조입니다:

```js
my-app/
├── node_modules/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   ├── containers/
│   ├── context/
│   │   ├── ThemeContext.js
│   │   └── UserContext.js
│   ├── pages/
│   ├── navigation/
│   ├── imports/
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── components/
│   │       ├── button.css
│   │       └── ...
│   ├── store/ or redux/
│   ├── utils/
│   └── tests/ or __tests__/
├── config/
└── package.json
```

# 폴더 구조 이해하기

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

각 폴더의 목적을 살펴봅시다:

- public/: 이 폴더는 webpack에 의해 처리되지 않는 에셋을 위해 예약되어 있습니다. 여기에 HTML 파일, favicon.ico 및 다른 공용 에셋을 넣어두세요.
- src/: src 폴더는 React.js 프로젝트의 중심지입니다. 소스 코드를 청결하고 집중시켜 보관하세요.
- assets/: 이미지, 폰트 및 기타 정적 에셋을 조직적으로 보관하는 곳입니다.
- components/: 재사용 가능한 UI 컴포넌트를 여기에 저장하여 모듈식이고 유지보수가 용이한 방식으로 프로젝트를 진행하세요.

```js
context/
├── ThemeContext.js
└── UserContext.js
```

- containers/: 논리 및 상태 관리를 다루는 컨테이너 컴포넌트를 그룹화하세요.
- contexts/: 전역 상태를 관리하기 위해 일반적으로 사용되는 폴더로, Context API를 사용하여 전역 상태를 공유하고 컴포넌트 트리를 통해 수동으로 모든 수준에서 props를 전달하지 않아도 되는 React의 기능입니다.
- ThemeContext.js와 UserContext.js는 컨텍스트 프로바이더입니다. 애플리케이션에서 필요로 하는 컴포넌트들에게 상태(theme 및 사용자 정보)를 제공합니다.
- pages/: 애플리케이션의 각 페이지 또는 주요 섹션마다 별도의 폴더를 만드세요.
- navigation/: 이 폴더는 내비게이션 로직을 관리하는 용도로 사용할 수 있습니다. react-router-dom과 같은 라이브러리를 사용 중이라면, Router 컴포넌트를 저장하는 곳입니다.
- imports/: import 문을 관리하는 용도로 사용할 수 있는 폴더입니다. 여기에 여러 컴포넌트를 내보내는 index.js 파일을 만들어서 프로젝트 다른 곳에서 import 문을 더 깔끔하고 관리하기 쉽게 만들 수 있습니다.
- styles/: 글로벌 스타일, 변수 및 유틸리티 클래스를 저장하는 styles 폴더를 생성하세요.
- store/ 또는 redux/: Redux 또는 다른 상태 관리 라이브러리를 사용하는 프로젝트의 경우, 관련 파일을 store 또는 redux 폴더에 모아두세요.
- utils/: 유틸리티 함수, 도우미 클래스 또는 기타 잡다한 도구들을 utils 폴더에 보관하세요.
- tests/ 또는 **tests**/: 테스트 주도 개발(TDD) 접근 방식을 채택하는 경우, 단위 및 통합 테스트용으로 tests 또는 **tests** 폴더를 만드세요.
- config/: 설정 파일들을 중앙에서 다룰 수 있는 config 폴더를 만드세요.

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

# 결론

잘 구조화된 React 프로젝트는 장기적으로 많은 시간과 머리 아픔을 절약할 수 있어요. 확장 가능하고 유지보수성이 높은 폴더 구조를 설정하는 데 미리 시간을 투자하는 것이 가치 있는 일이에요. 이는 일반적인 지침들이며, 프로젝트의 특정 요구 사항에 따라 다른 방식이 필요할 수도 있으니 추가 조치가 필요할 수 있어요. 항상 최신 문서와 모법을 참고하여 가장 정확한 정보를 얻어보세요.

준비 완료 👍 즐거운 코딩 하세요 :)
