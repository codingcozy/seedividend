---
title: "2024년 최고의 React 보일러플레이트 소개"
description: ""
coverImage: "/assets/img/2024-05-01-TopReactBoilerplates2024completeresearch_0.png"
date: 2024-05-01 17:59
ogImage:
  url: /assets/img/2024-05-01-TopReactBoilerplates2024completeresearch_0.png
tag: Tech
originalTitle: "Top React Boilerplates 2024: complete research"
link: "https://medium.com/javascript-in-plain-english/top-react-boilerplates-2024-complete-research-033f012603df"
isUpdated: true
---

![React](/assets/img/2024-05-01-TopReactBoilerplates2024completeresearch_0.png)

# 웹 프레임워크 선택 문제

요즘 React는 시대를 앞서가는 인터페이스 프레임워크 중 하나로 자리매김했습니다. 2023년 설문조사에 따르면 전 세계 개발자 중 40.58%가 React.js를 사용하고 있어 가장 인기 있는 웹 프레임워크 중 하나로 떠올랐습니다. Facebook에서 개발된 React.js는 PayPal, Uber, Instagram, Airbnb와 같은 주요 기업들이 사용하여 사용자 인터페이스를 강화하고 있습니다. 확실히 React는 생산성, 구성 요소 기반 아키텍처 및 선언적 구문의 조합으로, 널리 사용되고 강력한 커뮤니티 지원을 받고 있습니다. 이는 개발자들이 이전보다 더 많은 프로젝트를 React로 구축하고 있다는 것을 의미합니다.

React 라이브러리는 의견을 가지지 않는 설계로, '맨 처음에' 정의되고 구성 요소를 관리하는 핵심 기능 이외에는 실제로 거의 어떤 추가 기능도 포함하지 않습니다. 따라서 프로퍼티 전달, 구성 요소 분해, React 응용 프로그램 파일 구조화, 전체 응용 프로그램 규모 확장 및 기타 세부 사항에 대한 최상의 방법을 알지 못하는 경우 쉽게 혼동할 수 있습니다. 이러한 함정은 내장 함수 및 구성 요소를 포함하여 개발 프로세스를 최적화하고 개발자가 초기 설정 및 구성 처리에 시간을 허비하는 대신 응용 프로그램 로직을 구축하는 데 집중할 수 있도록 하는 보일러플레이트를 사용하여 피할 수 있습니다. 다시 말해, 응용 프로그램 개발을 시작하는 표준화된 기점 역할을 합니다. GitHub에서 'react-boilerplate'을 검색하면 현재 44.8k 저장소가 나옵니다. 개발용으로 선택할 템플릿을 결정할 때, 자신의 응용 프로그램에 해당하고 확장성과 향후 유지 관리에 좋은 것을 선택하는 문제가 생깁니다.

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

# React 보일러플레이트 유형

과거에는 React 프로젝트를 시작하는 가장 일반적인 방법은 create-react-app (CRA)이었습니다 — 이는 Facebook에서 인기 있는 공식 보일러플레이트였습니다. 그러나 2023년 3월 16일에 발표된 새로운 React 문서에서는 더 이상 CRA를 React 프로그램을 만드는 최적의 해결책으로 권장하지 않습니다. 대안을 고려하고 비교하여 프로젝트를 시작하는 가장 좋은 방법을 결정해봅시다.

React 보일러플레이트의 다양한 측면을 탐구함으로써, 어떤 기준으로 나눌 수 있는지 살펴보겠습니다:

라이브러리와 설정:

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

- 미니멀리즘 보일러플레이트: React 프로젝트를 위한 기본 구성을 제공하며, Webpack, Babel, ESLint 등의 기본 설정을 포함합니다. 개발자가 필요에 따라 특정 라이브러리와 기능을 추가할 것으로 가정합니다. 대부분의 보일러플레이트가 이 범주에 속합니다.
- 기능이 풍부한 보일러플레이트: 미리 구성된 추가 라이브러리와 도구를 포함합니다. 상태 관리(예: Redux), 라우팅(React Router), 테스팅 등을 포함할 수 있으며, 기본 UI 구성 요소와 페이지를 포함할 수도 있어 개발 속도를 높여 공통 UI 요소와 레이아웃을 제공합니다.

인증 및 등록:

- 인증 및 등록을 위한 보일러플레이트: 로그인, 가입, 사용자 세션을 위한 컴포넌트를 포함합니다.
- 인증 없는 보일러플레이트: 인증 구현을 개발자에게 맡깁니다.

풀 스택 vs. 프론트엔드 전용:

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

- 풀 스택 보일러플레이트: React를 사용한 프론트엔드와 백엔드를 모두 다루는 웹 애플리케이션을 구축하기 위한 종합적인 솔루션을 제공합니다.
- 프론트엔드 전용 보일러플레이트: 주로 React 인터페이스에 초점을 맞춥니다. 개발자가 원하는 서버와 통합해야 합니다.

UI 컴포넌트 라이브러리:

- UI 컴포넌트가 포함된 보일러플레이트: 일관된 디자인 패턴(예: 버튼, 폼, 모달)을 준수하는 전체 UI 컴포넌트 세트가 포함되어 있습니다.
- UI 컴포넌트가 없는 보일러플레이트: 개발자가 보일러플레이트를 사용하는 동안 컴포넌트를 완전히 개발해야 합니다.

유료 vs. 무료:

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

- 무료/오픈 소스 보일러플레이트: 사용에 제한이 없고 커뮤니티 지원이 있으며 종종 잘 유지보수됩니다.
- 유료 보일러플레이트: 일부 상용 템플릿은 추가 기능, 프리미엄 지원 또는 확장된 기능을 제공합니다.

위 분류에 따라 가장 인기 있는 React 보일러플레이트는 Vite, Create React App (CRA), Create Next App, Razzle 등이 있으며 React로 개발을 시작하는 데 필요한 기본 라이브러리와 구성만 포함하고 있습니다 (최소한의 보일러플레이트).

# React 템플릿 선택 기준

개발 중에 사용할 보일러플레이트를 결정하는 것은 그냥 애플리케이션을 만드는 것만큼이나 그 이후에 스케일링 및 유지보수하는 것과 관련이 있기 때문에 꽤 어려울 수 있습니다. 그래서 기존 보일러플레이트의 다양성에서 적절한 솔루션을 선택하고 일반적으로 어떻게 선택해야 하는 지 어떻게 결정할 수 있을까요? 프로젝트를 시작할 보일러플레이트를 선택할 때 주의를 기울여야 할 핵심 포인트는 다음과 같습니다.

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

- 지원 및 유지보수 옵션: 프로젝트는 정기적으로 업데이트되나요?
- 성능 점수
- 코드 품질 (구조의 청결성, 확장 가능성, 코드 구성)
- 제품 준비 상태: 프로젝트가 현재 제품 사용에 준비되었나요?
- 인증, 라우팅, 국제화, 폼 처리, 테스팅, 기본 페이지 및 UI 구성 요소와 같은 기능의 가용성 — 목록은 계속될 수 있지만, 프로젝트 구현에 필요한 기능을 결정하고 뼈대에 찾으시면 됩니다.

# 프로젝트 구조화 도구

React 애플리케이션을 개발하는 초기 단계는 일반적으로 Vite, Create React App, Create Next App 또는 Razzle 중 하나를 기반으로 선택하는 것을 포함합니다. 이러한 도구들은 프로젝트 구조 설정, 빌드 도구 구성, 그리고 개발 서버 제공과 관련해 프레임워크 유사한 기능을 제공합니다.

Vite는 웹 개발에서 빠른 개발 서버와 워크플로우 속도를 중점으로 두고 있습니다. 개발 중에 자체 ES 모듈을 가져와 시작 시간을 빠르게 하여 속도를 높입니다.

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

Create React App (CRA)은 Webpack, Babel 및 기타 빌드 도구의 설정 복잡성을 감추어주어 개발자들이 React 코드 작성에 집중할 수 있도록 도와줍니다. 효율적인 개발을 위해 핫 모듈 리로딩과 같은 기능을 제공합니다.

Next.js는 서버 사이드 렌더링 및 정적 웹 애플리케이션을 구축하기 위한 React 프레임워크입니다. Next.js 프로젝트를 합리적인 기본 설정으로 구성하며, 서버 사이드 렌더링(SSR), 파일 기반 라우팅, API 라우트와 같은 기능을 제공합니다.

Razzle은 에어비앤비에서 만든 빌드 도구로, 서버 사이드 렌더링을 단순화합니다. Razzle은 서버 사이드 렌더링 설정 복잡성을 감추어주고, 다재다능한 자바스크립트 애플리케이션을 쉽게 만들 수 있도록 합니다. 코드 분할, CSS-in-JS, 핫 모듈 교체와 같은 기능을 지원하여, 서버 사이드 렌더링이 필요한 React 애플리케이션을 구축하기에 적합합니다.

상기 언급된 빌드 도구들은 종종 React 보일러플레이트로 언급됩니다. 설정 복잡성을 감춰주고 기본 설정을 제공하며 빌드 워크플로우를 최적화하는 기능만 제공하기 때문에, 추가적인 기능을 포함하고 있지는 않고 매우 기능이 제한되어 있습니다. 따라서 위의 분류에 따라, 이러한 도구들을 미니멀리스틱 보일러플레이트로 분류합니다. 기본 템플릿으로 대표되는 이 도구들은 보다 기능이 풍부한 React 보일러플레이트를 만드는 데 탁월한 도구입니다.

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

# 선택된 보일러플레이트 표

이제 우리는 라이선스 수수료를 부과하지 않거나 기능을 유료로 제공하지 않는 React 보일러플레이트를 고려하고 또한 최근 업데이트 날짜를 고려합니다 (6개월 이내). 이에 따라, 우리는 12가지 보일러플레이트를 고려했습니다\*:

- 2024년 4월 기준

# 기능 별 보일러플레이트 비교

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

이제 보일러플레이트를 사용하여 개발자들이 얻을 수 있는 기능을 자세히 살펴보고 고려해야 할 사항을 알아보겠습니다:

API 통합: 특정 API 또는 서버 서비스와 통합하기 위한 구성을 포함한 템플릿이 있을 수 있습니다.

상태 관리 솔루션: Redux, MobX, Recoil과 같은 옵션 또는 React의 내장 상태 관리. 또한 비동기 React Query를 무시하기 어렵습니다.

테스트 설정: 미리 정의된 테스트 설정 또는 전혀 없는 것들도 있습니다.

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

인증 및 권한 부여: 사용자 인증 및 권한이 어떻게 정의되고 처리되는지, 특히 특정 인증 라이브러리와의 통합 여부가 명시되어 있는지 확인해주세요.

국제화(i18n) 및 지역화(Localization): react-i18next나 react-intl과 같은 라이브러리를 사용하여 여러 언어를 지원할 수 있는 기능을 제공하는지 확인해주세요.

ESLint 규칙 준수: 코드 포맷팅 중에 문제를 감지하거나 수정하는 것뿐만 아니라 잠재적인 버그를 식별할 수 있도록 하는지 확인해주세요.

스타일링 솔루션: CSS 모듈, styled-components 또는 UI 라이브러리를 사용하여 스타일드 컴포넌트를 쉽고 효율적으로 재사용할 수 있는 솔루션이 있는지 확인해주세요.

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

프로젝트의 타입 안전성: TypeScript를 사용하여 개발 중 정적 유형을 제공하며, 클래스 또는 모듈을 활용하여 더 확장 가능하고 신뢰할 수 있는 애플리케이션을 만듭니다.

앱 테마 선택: 사용자가 기본 설정 또는 자동 설정에 따라 라이트와 다크 테마 사이에서 전환할 수 있도록 합니다.

사전 제작된 폼 컴포넌트: 양식 전체에서 재사용되도록 의도된 컴포넌트를 제공하여 코드 중복을 줄이고 표준화를 촉진합니다. 내장된 유효성 검사와 오류 처리를 포함할 수도 있으며, 개발을 더 신뢰할 수 있게 합니다.

UI 컴포넌트 라이브러리: 버튼 및 모달 창과 같은 사전 제작 및 사용자 정의 가능한 컴포넌트를 제공하여 개발자가 애플리케이션에 쉽게 통합할 수 있습니다. 이러한 요소를 처음부터 디자인하고 코딩하는 시간과 노력을 절약할 수 있습니다.

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

우리는 각 보일러플레이트를 분석한 후 다음과 같은 표를 얻었습니다:

# 표의 보일러플레이트 설명

Extensive-react-boilerplate. 이 React 보일러플레이트는 모든 종류의 프로젝트를 위해 설계되었습니다. 이는 백엔드 보일러플레이트 nestjs-boilerplate과 완벽하게 호환되는 것뿐만 아니라 독립적인 솔루션으로도 동작하여 주요 장점 중 하나입니다. 이 템플릿은 다음과 같은 다양한 기능을 제공합니다:

- 사용자 인증 및 권한 부여, 구글 또는 페이스북 계정 사용 가능.
- 페이지의 공개 또는 비공개 액세스 설정.
- 코드 효율성과 깨끗함을 높이기 위한 사용자 정의 규칙이 설정된 ESLint.
- 작성된 코드의 신뢰성을 확보하기 위한 타입 안전성.
- 사용자 정의 useLanguage hook을 사용한 프로젝트 로컬라이징.
- E2E 테스트 지원.
- 사용자의 선택에 따라 Light 또는 Dark Mode.
- MUI를 기반으로 한 컨트롤 컴포넌트 라이브러리, 기본적으로 react-hook-form과 통합되어 있어 입력 필드를 컨트롤러에 연결하는 추가 시간을 소비할 필요가 없습니다.
- React Query를 사용한 비동기 작업 처리를 위한 상태 관리.
- 사용자 관리 기능 (CRUD).
- dropzone 기능이 있는 아바타 선택 및 업로드 기능.
- 향상된 애플리케이션 성능과 SEO 최적화를 위한 Next.js 프레임워크 (SSR) 지원.

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

위에서 언급된 기능들을 보시면, 이 보일러플레이트는 프로젝트의 시작 시간을 크게 줄여줍니다 (대략 193시간), 고려할 가치가 있는 선택입니다.

카테고리: 기능이 풍부한 보일러플레이트, 인증 및 등록이 포함된 보일러플레이트, 프론트엔드 전용 (그리고 완벽히 호환되는 백엔드 보일러플레이트도 있어서 풀 스택 보일러플레이트로 사용할 수 있음), 무료.

React-starter-kit. React를 기반으로 웹 애플리케이션을 만들기 위한 템플릿입니다. CSS-in-JS, Vitest, VSCode 설정, Cloudflare 지원, SSR과 같이 미리 구성된 세팅이 제공됩니다. 데이터베이스로는 Firestore 연결이 사용됩니다. Joy UI를 기반으로 한 툴바나 사이드바와 같은 몇 가지 UI 구성 요소가 구현되어 있습니다.

카테고리: 기능이 풍부한 보일러플레이트, 인증 및 등록이 포함된 보일러플레이트, 프론트엔드 전용, 무료.

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

React-redux-saga-boilerplate. Redux를 사용하여 상태 관리를 하는 React 애플리케이션을 생성하는데 사용하는 스타터 프로젝트입니다. 유닛 및 엔드 투 엔드 테스트, react-helmet 지원하며, Emotion 라이브러리를 사용하여 CSS 스타일링을 간단하게 합니다. styled 기능을 사용하여 헤더나 푸터와 같은 사용자 정의 컴포넌트를 제공합니다.

카테고리: 기능이 풍부한 보일러플레이트, 인증 없는 보일러플레이트, 프론트엔드 전용, 무료.

Next-js-Boilerplate. 이 보일러플레이트는 유연한 코드 구조를 가지고 있어 필요한 기능을 선택하고 저장하기만 하면 됩니다. Tailwind CSS 통합, Clerk와의 인증 지원, SQLite, PostgreSQL, 그리고 MySQL 데이터베이스와 호환됩니다. 유닛 테스트는 Jest를 사용하며, Zod 라이브러리는 유효성 검사 스키마에 사용됩니다.

카테고리: 기능이 풍부한 보일러플레이트, 인증 및 등록이 있는 보일러플레이트, 프론트엔드 전용, 무료.

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

라디안-리액트-템플릿. 이 보일러플레이트는 다국어 지원, 부드러운 애니메이션 및 JSON 파일에 모든 콘텐츠를 저장하여 React.js에 대한 사전 지식이 없어도 텍스트를 관리할 수 있도록 해줍니다. styled-components를 사용하여 HTML 엘리먼트를 스타일링한 자체 컴포넌트(버튼, 입력란, 텍스트영역 등) 세트를 포함하고 있습니다.

카테고리: 기능이 풍부한 보일러플레이트, 인증 없는 보일러플레이트, 프론트엔드 전용, 무료.

코어. Vite를 기반으로 빠른 프로젝트 생성 도구를 사용하여 개발된 현대적인 템플릿입니다. TypeScript를 지원하여 타입 안정성을 제공하며 ESLint, Prettier, CommitLint, Husky, Lint-Staged에 대한 좋은 구성을 포함하고 있습니다.

카테고리: 최소주의 보일러플레이트, 인증 없는 보일러플레이트, 프론트엔드 전용, 무료.

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

Nextjs-boilerplate. 이 React 보일러플레이트는 정적 페이지 생성을 위해 Next.js를 사용합니다. git 메시지 규칙을 지원하며, Plop를 사용하여 컴포넌트 생성을 지원하며, Tailwind CSS를 사용하여 스타일을 구성합니다. 컴포넌트 문서화를 위해 Storybook이 포함되어 있습니다.

카테고리: 미니멀리즘 보일러플레이트, 인증 없는 보일러플레이트, 프론트엔드 전용, 무료.

React-pwa. 프로젝트를 처음부터 시작하기 위한 준비된 세트입니다. React 애플리케이션을 개발할 때 개발자들이 typicall하게 필요로 하는 핵심 라이브러리, 컴포넌트 및 유틸리티의 미니멀한 결합으로 구성되어 있습니다. 페이지의 오류 처리를 위한 자체 HOC가 포함되어 있으며, Vite를 기반으로 개발되었습니다.

카테고리: 기능이 풍부한 보일러플레이트, 인증 없는 보일러플레이트, 프론트엔드 전용, 무료.

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

비타민. Tailwind CSS와 기본적인 스타일 리셋이 포함된 스타터 프로젝트로, Prettier 플러그인을 사용하여 자동으로 클래스를 정리합니다. Vitest, Testing Library, Cypress 등의 도구를 사용하여 테스트하지만, React UI 컴포넌트 라이브러리는 포함되어 있지 않습니다.

카테고리: 미니멀리즘 보일러플레이트, 인증 없는 보일러플레이트, 프론트엔드 전용, 무료.

Next-saas-stripe-starter. 이 보일러플레이트를 사용하면 Next.js, Prisma, Planetscale, Auth.js v5, Resend, React Email, Shadcn/ui, Stripe와 같은 기능을 추가하여 프로젝트 기능을 확장할 수 있습니다. Radix UI와 Tailwind CSS를 사용하여 구성된 컴포넌트 라이브러리가 포함되어 있습니다.

카테고리: 기능 풍부한 보일러플레이트, 인증 및 등록이 포함된 보일러플레이트, 풀스택 보일러플레이트, 무료.

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

Gatsby-starter-apple. 멋진 반응형 디자인을 갖춘 애플리케이션을 만들기 위한 템플릿으로, 모바일 메뉴에 애니메이션이 포함되어 있습니다. 사용된 컴포넌트들의 스타일링은 styled-components를 기반으로 합니다. 이 보일러플레이트는 검색 엔진 최적화를 잘 지원하며 RSS 피드 기능을 갖추고 있습니다.

카테고리: 미니멀리스트 보일러플레이트, 인증 없는 보일러플레이트, 프론트엔드 전용, 무료.

Fullstack-typescript. 이 보일러플레이트는 프로젝트를 신속하게 시작하기 위한 풀스택 애플리케이션으로, Material UI를 기반으로 한 사용자 정의 컴포넌트 라이브러리를 갖추고 있습니다. 클라이언트-서버 통신에는 axios가 사용되며, Redux, MobX 등 특정 상태 관리 기술을 지원하지 않습니다.

카테고리: 미니멀리스트 보일러플레이트, 인증 없는 보일러플레이트, 풀스택 보일러플레이트, 무료.

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

# 일부 기능 구현 특이사항

일반적으로, React 템플릿은 개발 프로세스의 속도를 높이고 표준화하기 위한 다양한 구현 기능을 제공합니다. 그 중에는 UI 컴포넌트 라이브러리와 스타일링, 상태 관리, 기본 ESLint 구성을 포괄하는 일반적인 접근 방식이 포함됩니다.

## React UI 컴포넌트 라이브러리

React 보일러플레이트의 기능 구현은 주로 구성 요소가 재사용 가능하고 조합 가능하게 설계되어 있는 모듈화된 개발을 중심으로 진행됩니다. 현재 라이브러리를 분석하고 이 기사에 따르면, 다음은 가장 인기 있는 것들로 간주될 수 있습니다:

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

![이미지](/assets/img/2024-05-01-TopReactBoilerplates2024completeresearch_1.png)

지금은 Material UI가 가장 인기 있는 라이브러리로 91.2k 개의 GitHub 스타와 매주 300만 회 이상의 다운로드가 있습니다. 반응형 웹 디자인(RWD) 기능 덕분에 응용 프로그램이 다양한 화면과 장치에 자동으로 적응할 수 있으므로 안심할 수 있습니다.

## 스타일링 솔루션

CSS 모듈, styled-components, 또는 Sass와 같은 스타일링 솔루션은 일반적으로 React 보일러플레이트에 포함되어 있습니다. 이들은 컴포넌트에 스타일을 적용하는 다양한 방법을 제공하여 유연성과 확장성을 유지하면서 컴포넌트 캡슐화를 유지합니다.

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

styled-components를 스타일링 솔루션으로 사용하는 장점:

- 라이브러리가 페이지에 렌더링된 컴포넌트를 자동으로 추적하고 그 스타일만 적용합니다.
- 스타일에 고유한 클래스 이름을 자동으로 생성하여 클래스 이름에 오류가 없도록 합니다.
- 스타일이 특정 컴포넌트에 연결되어 CSS 자체를 쉽게 제거할 수 있습니다.
- 코드에서 보이는 것처럼 손쉬운 동적 스타일링(bc-boilerplates에서 인스턴스 코드 아래 참고).

![이미지](/assets/img/2024-05-01-TopReactBoilerplates2024completeresearch_2.png)

5. 스타일링 중 컴포넌트의 동적 props를 사용합니다. 이를 통해 변수의 값에 따라 스타일이 업데이트되도록 보장합니다.

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

![이미지](/assets/img/2024-05-01-TopReactBoilerplates2024completeresearch_3.png)

6. 이를 통해 한 구성 요소에서 다른 구성 요소로 스타일을 재사용하거나 다른 구성 요소에 영향을 미칠 수 있습니다 (상위-하위 관계).

![이미지](/assets/img/2024-05-01-TopReactBoilerplates2024completeresearch_4.png)

## 상태 관리

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

상태 관리는 복잡한 애플리케이션에서 특히 확장성과 유지 보수성을 제공하는 중요한 요소입니다. 보통 상태 관리 도구를 선택할 때 Redux, MobX, Zustand이 떠오릅니다. 그러나 이들은 클라이언트 측 라이브러리이며, 비동기 데이터 저장과 같은 작업에 React Query와 비교했을 때 효율적이지 않을 수 있습니다.

React Query는 서버 상태 라이브러리입니다. 서버와 클라이언트 간 비동기 작업을 관리할 뿐만 아니라 React 및 Next.js 애플리케이션에서 데이터 검색, 캐싱 및 업데이트를 위한 기능을 제공하는 역할을 합니다. 몇 줄의 코드로 React Query는 클라이언트 상태에서 캐시된 데이터를 관리하기 위해 사용되는 부재 코드를 대체합니다. 이 상태 관리 접근 방식은 extensive-react-boilerplate에서 사용됩니다.

## 보일러플레이트의 ESLint 규칙

프로젝트 개발 중 ESLint 규칙을 사용하는 효율성은 사용자 지정 규칙을 작성하는 데도 나타납니다. ESLint는 포맷팅 및 규칙뿐만 아니라 내부 프로젝트 결정 사항도 고려할 수 있도록 많은 기능과 유연성을 제공합니다. 예를 들어, 폼 작업 시 불필요한 렌더링 가능성을 제어하고 개발자에게 경고를 주거나, 객체 작업 시에는 잘못된 솔루션을 알리거나, 사용하지 않는 import를 가리킬 수 있습니다. 예를 들어, extensive-react-boilerplate에서는 이러한 문제를 다음과 같이 다룹니다:

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

- 패턴을 잘못 사용한 경우의 규칙에 대해 경고합니다

![이미지](/assets/img/2024-05-01-TopReactBoilerplates2024completeresearch_5.png)

- 제어할 수 없는 렌더링이 발생할 수 있다는 가능성을 알립니다

![이미지](/assets/img/2024-05-01-TopReactBoilerplates2024completeresearch_6.png)

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

효과적인 React 템플릿을 선택하는 것은 프로젝트의 성공에 중요합니다. 바퀴를 다시 발명하는 대신, 잘 선택된 보일러플레이트의 파워를 활용하면 개발 프로세스를 크게 가속화하고 견고한 기반을 구축할 수 있습니다. 보일러플레이트를 선택할 때, 해당 디렉토리 구조와 구성 파일을 숙지하여 기반, 통합 용이성, 모듈화 및 기술적 요구에 최대한 부합하는지를 이해하는 것이 좋습니다. 제공되는 기능이 필요한 기능을 제공할 수 있는지 고려하십시오. 이렇게 하면 개발 시간을 절약하고 잘 유지되고 테스트된 코드를 활용할 수 있을 수도 있습니다.

다양한 보일러플레이트를 동시에 적용하는 방법에 대한 질문이 자주 있었는데, 이러한 템플릿에서 포괄적인 기능이 부족한 점 때문에 bc 보일러플레이트 팀은 광범위한 리액트 보일러플레이트로 해결책을 제안했습니다. 우리는 이견을 제시하고 널리 알려진 대안들 사이에서 자리를 잡고 주목할만한 경쟁 상대가 될 수 있는 것으로 생각합니다. 이제 한 번 시도해보시고 새로운 스타로서의 피드백을 기다리겠습니다.

# 간단하게 이야기하기 🚀

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

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 클로하고 팔로우해주세요 👏
- 저희를 팔로우해주세요: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요
