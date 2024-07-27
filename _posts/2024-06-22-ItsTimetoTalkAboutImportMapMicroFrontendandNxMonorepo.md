---
title: " Import Map, Micro Frontend, Nx Monorepo에 대해 이야기할 시간"
description: ""
coverImage: "/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_0.png"
date: 2024-06-22 05:47
ogImage: 
  url: /assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_0.png
tag: Tech
originalTitle: "⏰ It’s Time to Talk About Import Map, Micro Frontend, and Nx Monorepo"
link: "https://medium.com/javascript-in-plain-english/its-time-to-talk-about-import-map-micro-frontend-and-nx-monorepo-0b8e2c07568a"
---


## Native Import Map Overrides를 활용하여 마이크로 프론트엔드 아키텍처에 상당한 이점을 얻는 방법

![이미지](/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_0.png)

이 기사에서는 대규모 기업의 복잡한 인프라 및 팀 조직을 위한 소프트웨어 개발에 대한 내 인식을 근본적으로 바꾼 아키텍처에 대해 공유하고 있습니다.

오랜 시간 동안 이 기사를 쓰고 싶었는데, 이제 그 때입니다! 언제나 표준을 준수하는 것을 중요시해왔고, 최신 도구로 이 아키텍처를 올바르게 다룰 준비가 되었다고 믿습니다.

<div class="content-ad"></div>

esbuild의 등장, 브라우저에서 ES 모듈의 네이티브 지원, import map의 널리 퍼져가는 채택, Native Federation과 같은 도구의 등장, 그리고 Nx 생태계가 모두 결합되어 유연하고 잘 유지되는 Micro Frontend Architecture를 형성하고 있습니다.

제가 다룰 내용은:
- 실제 이야기!
- 브라우저에 대한 간단한 상기
- 간략한 Micro Frontend Architecture 소개
- Import Map이란 무엇인가?
- Import Maps와 Overrides의 전체 잠재력 탐색
- Nx가 확장 가능한 Micro Frontend Architecture를 가능하게 하는 이유
- Native Federation은 무엇일까?
- 마지막으로

# 실제 이야기!

컨텍스트를 조금 더 제공해 드리기 위해, 여러 개의 AngularJS 애플리케이션을 더 최신의 Angular 프레임워크로 마이그레이션하도록 주도했습니다. 클라이언트는 AngularJS가 폐기되었다는 공지를 받은 후에 마침내 그 결정을 내렸습니다 (최신 정보 확인을 부탁드려요 🙏).

<div class="content-ad"></div>

일반적인 마이그레이션 프로세스를 사용하는 것이 불가능했어요. 여러 시나리오를 조사한 후에 마이크로 프론트엔드 아키텍처를 선택했어요. 저희가 본 것처럼, 이는 점진적인 마이그레이션을 용이하게 하고, 격리를 제공하며, 여러 팀의 앱을 하나의 통합 플랫폼으로 통합할 수 있도록 도와줄 수 있어요.

당시에는 마이크로 프론트엔드 아키텍처가 아직 인기가 없었고, single-spa 라이브러리만 충분히 성숙했어요. 이는 AngularJS와 Angular을 포함한 여러 프레임워크를 지원하여 우리에게 완벽한 선택이었어요!

Single-spa는 기능 플래그를 기반으로 AngularJS 또는 Angular 구현체 간에 전환하여 마이크로 프론트엔드를 조정해줘요:

![이미지](/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_1.png)

<div class="content-ad"></div>

single-spa를 사용하면서 마이크로 프론트엔드 아키텍처를 구현하는 것에 대한 이해가 크게 향상되었고, 특히 import map 및 마이크로 프론트엔드 오버라이드의 중요한 이점을 강조했습니다. 이러한 도구들은 로컬 개발, 테스트, 배포 경험을 크게 향상시켰습니다.

# 브라우저에 대한 간단한 알림

다음 내용을 이해하기 위해 먼저 브라우저가 웹 애플리케이션을 실행하는 기본 흐름에 대한 기본 사항을 상기하는 것이 중요하다고 생각합니다:

![웹 브라우저 플로우](/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_2.png)

<div class="content-ad"></div>

- 첫 번째 단계는 언제나 애플리케이션을 시작하는 데 필요한 모든 것을 갖춘 index.html 파일을 가져오는 것입니다.
- 그런 다음, 브라우저는 index.html에서 지시한 모든 파일을 로드합니다. 이로는 주로 JavaScript 및 스타일 시트와 같은 애플리케이션의 주 파일들이 포함됩니다.
- 그 후에는 애플리케이션 또는 사용자 상호작용에 의해 더 많은 요청이 발생하고, 예를 들어 API를 호출하거나 필요한 기능을 로드하는 것이 있습니다.

# 간단히 말하는 마이크로 프론트엔드 아키텍처

간단한 정의부터 시작해봅시다: 마이크로 프론트엔드 아키텍처는 프론트엔드 애플리케이션을 더 작고 관리하기 쉬운 조각으로 나누는 것을 포함합니다. 각 조각은 애플리케이션의 특정 기능이나 도메인을 담당합니다. 이는 종종 마이크로서비스 개념과 비교되지만 프론트엔드 레이어에서 이루어집니다.

애플리케이션이 마이크로 프론트엔드 아키텍처를 따르는지 정확히 판단하는 것은 마이크로서비스의 이상적 크기를 정의하는 것과 마찬가지로 어려울 수 있습니다.

<div class="content-ad"></div>

핵심은 여러 기능을 통합해 하나의 애플리케이션을 만들 수 있는 플랫폼을 갖는 것입니다. 이러한 기능들이 Lazy-loaded 구성 요소이든 마이크로 프론트엔드이든, 원칙은 본질적으로 동일합니다.

## 언제 잘 어울리나요?

마이크로 프론트엔드 아키텍처가 유용한 다양한 사용 사례가 있습니다:

![마이크로 프론트엔드 사용 예시](/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_3.png)

<div class="content-ad"></div>

- 다양한 프레임워크: 가장 일반적인 사용 사례는 다양한 기술을 하나의 제품으로 통합하는 것인데, 특히 분리된 시스템을 통합하는 데 유용합니다.
- 팀 분산화: 팀이 독립적으로 작동할 때, 모놀리폴더(monorepo) 내에서 작동하거나 다른 저장소에서 작동하는 경우, 마이크로 프론트엔드는 그들의 작업을 하나의 일관된 제품으로 통합하기를 쉽게 만들어줍니다.
- 관심사의 분리: 응용 프로그램을 격리된 도메인 및 기능으로 구성하여 더 나은 조직을 위한 이상적입니다.
- 복잡한 인프라: 기존 환경에 마이크로 프론트엔드를 플러그인하는 능력은 개발 경험을 크게 향상시킬 수 있습니다! 나중에 이 이미유에 대해 자세히 다루겠습니다.

## 주요 개념

마이크로 프론트엔드 아키텍처에서는 각기 다른 개념을 따르는 다양한 종류의 엔터티를 구분합니다:

<div class="content-ad"></div>

- 마이크로 프론트엔드(또는 마이크로 앱)은 호스트가 탐색 또는 라우팅 시에 로드됩니다. 각 마이크로 프론트엔드는 응용 프로그램 내에서 구분된 기능 또는 도메인에 대해 책임을 집니다. 다른 앱과 마찬가지로 자식 라우트와 여러 컴포넌트를 포함할 수 있습니다.
- 파셀(컴포넌트 또는 노출로도 불림)은 필요 시 독립적으로 로드됩니다. 공유 컴포넌트나 공유 서비스가 될 수 있으며 어디에서나 플러그인할 수 있습니다.

## 도구/프레임워크

마이크로 프론트엔드 아키텍처의 여러 구현이 있으며, 여기서 세 가지 주목할 만한 것에 대해 알아보겠습니다:

![이미지](/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_5.png)

<div class="content-ad"></div>

- Single-spa: 이 프레임워크는 간단하게 유지되며 여러 기술과 함께 작동합니다. 하지만 그 간단함은 한 가지 기술만 사용하는 경우 더 많은 작업을 해야 할 수도 있음을 의미할 수 있습니다.
- Webpack Module Federation: 거의 모두가 Webpack을 사용하며, 모듈 페더레이션 기능으로 이 사용자들에게 마이크로 프론트엔드를 쉽게 만들어줍니다. 하지만 다른 도구를 사용하는 경우 다른 해결책을 찾아야 할 수도 있습니다.
- Native Federation: 이 방법은 Webpack의 방법론의 쉬움을 최신 도구인 esbuild나 Vite와 결합하여, 현대적인 개발 관행과 잘 어울리면서 마이크로 프론트엔드 아키텍처를 지원합니다.

# Import Map이란 무엇인가요?

가장 흥미로운 측면부터 시작해보죠. 내 의견으로는, 임포트 맵은 브라우저 기술 중에서 과소평가된 기술입니다. 모든 브라우저와 호환되며, 브라우저에서 직접 JavaScript 모듈을 지원하는 데 역할을 합니다.

![이미지](/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_6.png)

<div class="content-ad"></div>

## 어떻게 작동합니까?

원리는 매우 간단합니다. ES 모듈이 JavaScript 생태계에 도입된 이후로, 우리 모두가 다음과 같은 구문을 사용하기 시작했습니다:

```js
import moment from "moment";
import { partition } from "lodash";  
```

그러나 브라우저에서 ES 모듈을 네이티브로 사용할 때는 JS 파일의 전체 경로를 지정해야 합니다. 다음과 같이:

<div class="content-ad"></div>

```js
import moment from "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/moment.min.js";
import { partition } from "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js";
```

이 방식은 가독성이나 유지보수 측면에서 좋지 않죠? 그래서 라이브러리 이름을 URL에 매핑하는 import map이 만들어졌습니다:

```js
<script type="importmap">
{
  "imports": {
    "moment": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/moment.min.js",
    "lodash": "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
  }
}
</script>
```

이것은 TypeScript의 경로 매핑과 유사하게 동작하지만 브라우저에서 직접 작동합니다. 이제 동일한 구문을 사용하여 모듈을 로컬로 불러오거나 브라우저에서 불러올 수 있습니다.

<div class="content-ad"></div>

이 임포트 맵은 다음과 같이 인라인으로 지정하거나 외부 파일로 지정할 수 있습니다.

```js
<script type="importmap" src="assets/shared.importmap.json"></script>
<script type="importmap" src="assets/remotes.importmap.json"></script>
```

## 이것이 마이크로 프론트엔드 아키텍처와 어떤 관련이 있나요?

제가 언급한대로, 마이크로 프론트엔드 아키텍처는 브라우저에서 번들을 동적으로로드하고 실제 앱에 통합하는 방법일 뿐입니다.

<div class="content-ad"></div>

이 관리는 호스트의 역할입니다. 그러나 호스트가 ES 모듈을 로드해야 할 때는, 간단히 JS import 시스템을 활용하여, import 맵의 도움을 받아 해당 모듈을 위치에 매핑할 수 있습니다.

비슷하게, 파셀의 경우, 필요할 때 컴포넌트를 로드해야 할 경우, import 맵은 JS import를 현재 위치로 매핑할 것입니다.

## Import Maps은 덮어쓸 수 있습니다!

동일한 HTML에서 여러 import 맵을 선언할 수 있습니다. 이는 두 개의 import 맵이 동일한 키를 선언할 경우, 마지막 것이 이전 것을 덮어쓸 것입니다.

<div class="content-ad"></div>

'img' 태그를 Markdown 형식으로 바꿔보세요.


![이미지](/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_7.png)

HTML에 새로운 import map을 주입함으로써, 어떤 번들이든 후킹/매핑할 수 있습니다. 따라서, 마이크로 프론트엔드, 구성 요소, 심지어 공유 라이브러리를 대체할 수 있습니다!

## 보안

웹 응용 프로그램에서 import map을 덮어 쓰는 것은 보안을 감소시키지 않습니다. 왜냐하면 모든 프론트엔드 자산은 공개되어 있고 클라이언트 측에서 수정할 수 있기 때문입니다. 그러나 여러 서버로부터 자산을로드하는 응용 프로그램의 경우, Content-Security-Policy (CSP)를 구성하는 것이 중요합니다.


<div class="content-ad"></div>

CSP는 신뢰할 수 있는 도메인 목록을 화이트리스트로 지정하여 크로스사이트 스크립팅(XSS) 및 기타 보안 위협의 위험을 크게 줄입니다. 이 보안 조치는 클라이언트 측 수정이 가능하더라도 응용 프로그램의 무결성과 사용자 안전을 유지합니다.

# Import Maps 및 Overrides의 전체 잠재력 탐색

임포트 맵 및 번들 로딩을 브라우저에서 직접 오버라이드할 수 있다는 원리를 이해했으니, 이 개념을 개발 프로세스 내에서 어떻게 활용할 수 있는지 알아봅시다:

![image](/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_8.png)

<div class="content-ad"></div>

## 로컬 개발

대규모 조직에서 복잡한 로컬 환경을 설정하는 것은 종종 다음과 같은 일들을 수반합니다:

- 로컬 머신 설정을 위해 하루 이상 소요될 수 있음.
- 백엔드 시스템, 로컬 데이터베이스 또는 외부 환경과의 연결, 로컬 대기 시스템 등과 같은 다양한 소프트웨어 설치.
- 다중 테넌트에 대한 설정 조정.
- 아침에 로컬 환경이 부팅될 때까지 기다리면서 커피를 마시며 그 날을 유지될 것을 기대하는 것.

특히 UI를 소량 수정해야 할 때 이러한 복잡성은 상당히 괴로울 수 있습니다. 이 정확한 도전에 대처하기 위해 마이크로 프론트엔드 아키텍처와 import 맵 오버라이드를 결합한 방식으로 대응하려고 노력했습니다.

<div class="content-ad"></div>

복잡한 전체 시스템을 실행하는 대신, 로컬 환경을 외부 환경에 연결하여 이미 구축된 복잡성을 사용할 수 있습니다.

이렇게 하려면 로컬에서 마이크로 프론트엔드를 제공하고 원격 환경에서 임포트 맵 오버라이드 원칙을 사용하면 됩니다.

새로 고침 후 브라우저에서 로드되는 마이크로 프론트엔드는 원격 서버에 있는 것이 아니라 로컬 컴퓨터에 있는 것입니다.

중요한 점은 최신 메인 브랜치를 포함하는 실제 환경에 코드를 직접 통합하고 있다는 것입니다. 이는 우리가 "내 컴퓨터에서는 작동하는데!"라는 유명한 시나리오를 넘어설 수 있음을 의미합니다.

<div class="content-ad"></div>

## 풀 리퀘스트

구현을 완료했고 (그리고 테스트까지 완료했다😋), 주로 공유 코드베이스로 코드를 병합하기 위해 풀 리퀘스트를 생성합니다.

리뷰 용이성
다시 한 번 중요한 것은, 리뷰 프로세스를 더 쉽게 만들기 위해 import map overriding의 이점을 활용할 수 있습니다. 리뷰어들이 배포하거나 로컬로 코드를 클론할 필요 없이 변경 사항을 확인할 수 있도록 해줍니다:

이 단계에서 CI는 앱을 빌드하고 수정된 마이크로 프론트엔드를 위한 새 번들을 생성합니다. 또한 업데이트된 번들로 영향을 받는 importmap.json을 생성할 수 있습니다.

<div class="content-ad"></div>

UI e2e 테스트를 간소화하세요
UI 테스트 (모의)에 영향을 받은 import 맵을 사용할 수도 있습니다. 이 시나리오에서 생성된 영향을 받은 importmap.json은 Playwright 또는 Cypress와 같은 도구에 주입되어 영향을 받은 마이크로 프론트엔드를 직접 테스트할 수 있습니다.

## 승인

이 단계는 코드가 프로덕션 배포 준비가 되었는지 확인해야 하는 시점을 의미합니다. 이를 CI에서 자동화하거나 수동으로 할 수 있습니다 (자동화 부탁드려요 🙏).

일반적으로 이는 하루에 여러 번 실행되며, 가장 최신의 코드베이스가 프로덕션을 모방하는 환경에서 실행됩니다. 이 시나리오에서는 모든 번들의 최신 버전을 포함하는 importmap.json을 생성할 것입니다:

<div class="content-ad"></div>

만약 생성된 최근 importmap.json이 성공적이라면, 이는 프로덕션을 위한 릴리스 후보가 될 수 있습니다.

## 프로덕션

릴리스가 검증되고 준비가 되었다면, 프로덕션으로 배포를 고려할 수 있습니다. 여기에서도 importmap.json을 갖는 것은 상당한 장점을 제공합니다.

![이미지](/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_9.png)

<div class="content-ad"></div>

시큐리티에 배포
프로덕션 환경으로 번들을 언제든지 배포하거나 업로드할 수 있습니다. importmap.json이 그들을 참조할 때까지 로드되지 않습니다. 그러므로 배포는 최신 import map을 수정하고 업로드하는 것만으로 이루어집니다. 이 배포 과정은 단순히 1초만 소요되며 동결이 필요하지 않으며 사용자에게는 완전히 투명합니다.

이전 번들은 캐시에 유지
또한 importmap.json은 이전 버전의 번들을 아직 참조할 수 있다는 점이 중요합니다. 사실, 일부 마이크로 프론트엔드가 수정되지 않았다면 그들을 위한 새 버전을 생성할 필요가 없습니다.

이는 사용자들이 그들의 브라우저에 이미 캐시되어 있는 기존 버전을 다시로드할 필요가 없다는 것을 의미합니다. 반면, importmap.json은 절대로 캐시되어서는 안됩니다!

카나리아 배포 및 A/B 테스팅
importmap.json의 마지막이자 무시할 수 없는 혜택은 동적으로 생성될 수 있다는 것입니다. 이는 마이크로 프론트엔드가 이전 버전 또는 새 버전을 로드해야 할지 결정할 수 있음을 의미합니다.

<div class="content-ad"></div>

결과적으로, 특징 플래그나 인증 사용자 기준에 따라 A/B 테스트나 카나리 배포를 쉽게 진행할 수 있습니다!

# Nx가 확장 가능한 마이크로 프론트엔드 아키텍처를 가능하게 합니다

이 글에서는 Nx의 모든 이점에 대해 깊이 파헤치지는 않겠습니다. 이에 관한 내용은 이전 글에서 상세히 다루었으니, 더 자세한 정보는 Nx 웹사이트를 참고하시기 바랍니다.

JavaScript/TypeScript 저장소에만 한정되지 않고 어떤 코드베이스에도 제공되는 가치에 대한 나의 확신은 확고합니다. 공유, 가시성, 성능 향상, 그리고 관행 준수를 강화하는 Nx의 장점은 보편적으로 적용 가능합니다.

<div class="content-ad"></div>

# 표 형식을 Markdown 형식으로 변경해 보세요.

## Monorepo와 Micro Frontend은 정반대인가요?

결코 그렇지 않아요! Monorepo는 코드 유지 보수, 빌드 및 통합 프로세스를 향상시키는 가치를 더합니다. 반면, 마이크로 프론트엔드 아키텍처는 실행 시 혜택을 제공합니다.

두 전략 모두 관심사 분리와 재사용성을 지지하며, 마이크로 프론트엔드를 모노레포에 포함시킴으로써 상당한 이점을 보여줍니다.

## 영향을 받는 마이크로 프론트엔드

<div class="content-ad"></div>

녋스에서 중요한 개념은 영향을 받은 코드에서 작업을 수행하는 능력입니다. 이 기능은 로컬 개발을 간소화하여 원격 환경에서 한 번에 하나의 마이크로 프론트엔드에 작업할 수 있도록 도와줍니다.

빌드, 린트, 테스트와 같은 작업을 영향을 받은 마이크로 프론트엔드에만 제한함으로써 CI/CD 프로세스의 효율성을 크게 향상시킬 수 있습니다. 영향을 받은 마이크로 프론트엔드를 나열하는 영향 파일(importmap.json)을 활용하면 기존 환경에서 PR을 테스트하고 e2e 테스트를 실행하며 점진적인 배포를 용이하게 할 수 있습니다.

## 단일 버전 정책

독립성과 격리는 마이크로 프론트엔드 아키텍처의 핵심 원칙이지만, 일부 서비스와 컴포넌트를 모든 인스턴스 간에 공유하는 것은 불가피합니다.

<div class="content-ad"></div>

단일 버전 정책과 결합된 모노 레포 접근 방식은 마이크로 프론트엔드가 서로 호환되어 융성적인 생태계를 유지하도록 보장합니다.

# Native Federation에 대해 어떻게 생각하세요?

처음에 언급한 것처럼, 이제 생태계가 충분히 성숙해져 Angular이나 esbuild를 사용하는 다른 프레임워크를 사용하여 Nx 모노레포 내에서 Native Federation을 적용할 수 있습니다.

![이미지](/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_10.png)

<div class="content-ad"></div>

죄송하지만 Native Federation과 함께 import map overrides를 구현하지 못했습니다. 그러나 이 문제는 현재 GitHub에서 논의 중입니다:

해당 원칙은 변함없이 유지됩니다. importmap.json을 직접 사용하는 대신 federation.manifest.json을 재정의할 수 있는 옵션이 있습니다. 이는 응용 프로그램 내에서 사용자 정의 코드를 생성하여 번들 재정의를 활성화해야 합니다.

## 해보고 싶으신가요?

- 먼저, 내 GitHub 저장소를 복제하세요:

<div class="content-ad"></div>

```js
git clone git@github.com:jogelin/nx-nf.git && cd nx-nf
```

2. 원하는 패키지를 설치하기 시작하세요:

```js
pnpm install
```

3. 다음으로, mf-admin과 같이 마이크로 프론트엔드 하나를 시작할 수 있습니다:

<div class="content-ad"></div>

```js
npx nx run mf-admin:serve
```

4. 그런 다음, 이미 배포된 애플리케이션의 URL인 https://nx-nf-a2d7c.web.app/admin 에 접속하세요. 아래의 이미지와 같이 애플리케이션을 확인할 수 있을 거예요:

![애플리케이션 이미지](/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_11.png)

5. 이제, 즐겨 사용하는 브라우저 디버깅 도구를 열고 로컬 서버를 원격 애플리케이션에 연결하려면 로컬 스토리지에 이 항목을 추가하세요:

<div class="content-ad"></div>

```js
localStorage.setItem('native-federation-override:mfAdmin', 'http://localhost:4203/remoteEntry.json') // mfAdmin을 로컬 서버로 오버라이드합니다
```

6. 이후에, mf-admin 마이크로 프론트엔드에 수정을 가해주세요. 예를 들어, "어드민 페이지에 오신 것을 환영합니다" 메시지를 "로컬 어드민 페이지에 오신 것을 환영합니다"로 변경하세요.

![이미지](/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_12.png)

7. 변경 사항을 적용한 후 페이지를 새로고침하면, 원격 서버에 즉시 변경 사항이 반영된 것을 확인할 수 있습니다!

<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_13.png" />

8. 변경 사항을 되돌리려면 로컬 스토리지에서 항목을 제거하고 페이지를 새로 고쳐서 원래 상태를 다시 확인하실 수 있습니다.

```js
localStorage.removeItem('native-federation-override:mfAdmin');
```

이 방법을 사용하여 모든 마이크로 프론트 엔드를 재정의할 수 있습니다. 그러나 앞서 말씀드린 대로, 네이티브 페데레이션을 사용하는 방법은 import 맵의 기본 동작을 사용하지 않기 때문에 완전히 네이티브한 것은 아닙니다.

<div class="content-ad"></div>

저의 GitHub 저장소에서 Native Federation, Angular 및 Nx를 활용한 모든 코드를 찾아볼 수 있어요.

# 최종 생각

이 탐구를 통해 브라우저의 네이티브 JavaScript 생태계의 강력함을 발견하고 네이티브 ES 모듈에 대한 지원이 더 빠른 빌드 시간 이상의 개발 경험을 향상시킨다는 것을 강조했어요.

import 맵 원칙의 단순함과 효과적인 접근 방식은 우아한 해결책으로 복잡한 문제를 해결하는 방법을 보여줍니다. 향후 개발이 더 원활하고 직관적으로 되는 곳을 힌트로 알려주며, 네이티브 브라우저 기능을 선호함으로써 맞춤형 프레임워크 구현에 대한 의존성이 줄어드는 미래를 예측합니다.

<div class="content-ad"></div>

게다가, 이 생태계의 일부로서 Nx의 사용은 개발자들이 증진된 민첩성과 정밀성으로 복잡한 프로젝트에 접근할 수 있도록 강력한 도구 모음을 제공합니다.

이와 같은 네이티브 기능들에 대한 더 많은 기대가 높아지고 있으며, 더 간단하면서도 더 강력한 개발 환경이 약속되고 있습니다. Nx와 브라우저 기능의 발전으로, 우리는 고도의 웹 애플리케이션을 구축하는 것이 더욱 접근 가능하고 효율적인 미래로 나아가고 있습니다.

🚀 기대해 주세요!

# 크레딧

<div class="content-ad"></div>

## 조엘 데닝

조엘 데닝은 single-spa의 비전을 이루어낸 인물로, 웹의 진정한 메커니즘에 대한 깊은 통찰력을 자랑하며, 내 의견으로는 마이크로 프론트엔드 아키텍처의 선구자입니다. single-spa 웹사이트와 그의 유튜브 채널을 꼭 확인해보시길 권해드립니다. 비디오가 초창기로 보일지라도, 조엘은 시대를 앞서가고 있으며, 내용은 오늘날에도 여전히 매우 관련성 있습니다.

![이미지](/assets/img/2024-06-22-ItsTimetoTalkAboutImportMapMicroFrontendandNxMonorepo_14.png)

## 만프레드 슈타이어

<div class="content-ad"></div>

Manfred는 엔지니어, 건축가, 강연가, 트레이너, 컨설턴트 및 작가로, 이야기를 잘 알고 있습니다. Angular뿐만 아니라 모든 사람들을 위해, 마이크로 프런트엔드 및 웹 아키텍처에 관심이 있는 분들에게 Manfred의 책 'Enterprise Angular: Micro Frontends and Moduliths with Angular'과 Angular Architect 팀의 블로그를 살펴보기를 적극 권유합니다.

# 관련 정보

# 쉽게 이해하기 🚀

<div class="content-ad"></div>

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 박수와 팔로우 해주세요 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기