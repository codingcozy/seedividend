---
title: "동적이고 확장 가능한 마이크로 프런트엔드 모듈 페더레이션 사용 방법"
description: ""
coverImage: "/assets/img/2024-06-22-DynamicScalableMicro-FrontendswithModuleFederation_0.png"
date: 2024-06-22 03:06
ogImage:
  url: /assets/img/2024-06-22-DynamicScalableMicro-FrontendswithModuleFederation_0.png
tag: Tech
originalTitle: "Dynamic , Scalable: Micro-Frontends with Module Federation"
link: "https://medium.com/@jaisadarsh/dynamic-scalable-micro-frontends-with-module-federation-8197f09921e5"
isUpdated: true
---

![DynamicScalableMicro-FrontendswithModuleFederation_0](/assets/img/2024-06-22-DynamicScalableMicro-FrontendswithModuleFederation_0.png)

안녕하세요!

KredX는 내국 (인보이스 할인) 및 국제 (글로벌 무역 금융 거래소)에서 접근성을 보장하는 공급망 금융(SCF) 플랫폼입니다.

인도의 중소기업 및 중소기업(MSME) 부문의 급속한 성장을 고려해, KredX는 이 섹터의 모든 금융 요구에 대한 일괄 해결책으로 나타났습니다. 우리는 SCF 및 현금 관리 솔루션(CMS) SaaS 생태계의 다양한 측면에서 빠르게 발전하고 있습니다.

성장에는 주의가 필요합니다!
비즈니스의 보다 광범위한 요구를 충족하기 위해, 저희의 SCF 제품 중 하나인 인보이스 할인(ID)의 코드베이스는 거대한 단일체(monolith)가 되었으며, 이로 인해 개발자의 생산성을 저해하고 독자적인 변경이 적게 유연해졌습니다.

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

마크다운 포맷으로 위의 텍스트를 번역하겠습니다.

![이미지](/assets/img/2024-06-22-DynamicScalableMicro-FrontendswithModuleFederation_1.png)

매일 개발하는 것이 얼마나 어려워졌는지 이해하는 데 도움이 되었으면 좋겠습니다. 우리의 ID 프론트엔드 코드 빌드 시간이 거의 50-55분이 걸리고, 프로젝트를 로컬에서 실행하는 데 약 8-12분이 소요됩니다.

오늘날, 프로젝트는 너무 끌려다붙었다고 할 정도로 심각해졌는데, 우리의 단일 내부 모듈 중 하나에 문제가 발생하면 전체 앱에 영향을 줄 수도 있습니다(무하랏 모듈의 단일 문제가 금융가 및 관리자 대시보드 전체를 다운시키는 문제가 발생) 그리고 때로는 여러 제품에도 영향을 미칠 수 있습니다(재사용할 수 없는 인증 과정으로 인해 여러 제품에 영향을 미침).

기존 단일체 아키텍처의 고통
코드베이스가 커짐에 따라 여러 문제가 시작되었습니다:

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

- 빌드 시간이 길어짐: 코드베이스의 크기가 커지면 개발 서버를 시작하는 데와 HMR이 개발자 변경 사항을 반영하는 데 더 오래 걸립니다.
- 높은 인지 부담: 여러 앱의 코드가 동일한 저장소에 있기 때문에, 개발자가 이해해야 하는 코드 영역이 증가하여 개발자의 인지 부담이 커집니다.
- 단일 장애점: 모놀리스의 어떤 부분에서 버그가 발생하면 전체 애플리케이션을 다운시키는 결과를 가져옵니다. 즉, 모든 다양한 사용자 설정이 영향을 받아 신뢰성이 떨어지고 수동 및 자동화된 테스트에 더 많은 부담이 생깁니다.
- 독립적인 CI/CD 부재: 금융 자금 할인용으로 사용되는 동일한 ID 코드베이스가 운영자용 대시보드, IPA용 대시보드, GTX용 인증 흐름, KredX Financier 앱에 대한 일반 코드, 그리고 그 이외 많은 곳에도 사용됩니다. 한 모듈의 작은 변경이 전체 코드베이스의 배포를 필요로 합니다.

우리에게는 코드베이스를 더 작고 독립적인 모듈로 분리할 수 있는 해결책이 필요하다는 점이 매우 명확했습니다. 각 모듈은 유연하여 매끄럽게 플러그인하고 플러그아웃할 수 있어야 하며, 개발, 테스트 및 배포를 독립적으로 수행할 수 있어야 합니다.

기술적인 탐색은 이곳에서 시작됩니다.
동적이고 확장 가능한 솔루션을 찾기 위한 연구

해당 솔루션에 대한 고민에 들어가기 전에 솔루션이 어떻게 보일지에 대한 몇 가지 기준을 결정했습니다:

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

- 좋은 개발자 경험: 이 솔루션은 전반적인 개발자 경험을 향상시켜야 합니다.
- 최소한의 아키텍처 변경: 기존 웹 아키텍처에 급격한 수정이 필요하지 않아야 합니다.
- 구성의 용이성: 솔루션을 비교적 쉽게 구성할 수 있어야 합니다.
- 점진적인 학습 곡선: 개발자들에게 순차적인 학습 곡선을 가지며 빠른 도입을 용이하게 해야 합니다.
- 미래 기술 이전: 미래 기술 이전을 위해 솔루션을 쉽게 분리할 수 있어야 합니다.
- 커뮤니티 지원 및 미래 비전: 강력한 커뮤니티 지원과 미래 비전을 가져야 합니다.

다양한 접근법
문제를 자세히 고려하여, 우리는 몇 가지 실행 가능한 접근법을 식별했습니다:

![Dynamic Scalable Micro-Frontends with Module Federation](/assets/img/2024-06-22-DynamicScalableMicro-FrontendswithModuleFederation_2.png)

우리가 시도한 솔루션 중에, Module Federation과 Monorepo가 모든 영역을 충족하고 그 이상을 제공하는 솔루션이라는 것을 발견했습니다.

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

결국, 모듈 페더레이션이 무엇인가요?
믿어봐요, 기다릴 가치가 있어요!

모듈 페더레이션은 Webpack 및 Rspack의 고급 기능으로, JavaScript 애플리케이션을 분산화하는 아키텍처 패턴을 제공하여 (서버 측의 마이크로서비스와 유사하게) 다른 애플리케이션(또는 마이크로 프론트엔드)로부터 코드를 동적으로 로드할 수 있는 방법을 제공합니다. 이는 다음과 같은 이점을 제공할 수 있어요:

- 코드 중복 감소
- 코드 유지 관리성 향상
- 애플리케이션 전체 크기 감소
- 애플리케이션 성능 향상

모듈 페더레이션의 주요 요소
모듈 페더레이션 애플리케이션에서는 이해해야 할 여러 요소가 있지만, 아키텍처를 설명할 수 있는 3가지 요소가 있어요:

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

- 호스트 또는 셸: 이름 그대로, 이것은 여러 연합된 원격 모듈과 결합될 수 있는 컨테이너입니다. (그 자체가 연합된 모듈임)
- 원격: 자바스크립트, 기본 값, 복잡한 값 또는 전체 모듈 모두 일 수 있습니다. 원격에서 노출하고자 하는 내용은 무엇이든 될 수 있습니다. 기본적으로 이러한 원격 모듈은 최종 조각을 만들기 위해 셸 안에 결합됩니다.
- 공유 의존성: 다른 원격들 간에 공유되는 패키지/라이브러리와 같은 종속성입니다. 이로 인해 중복이 줄어들고 코드 크기도 작아집니다.

모든 이러한 설정은 웹팩 구성 내에서 이루어집니다.

![이미지1](/assets/img/2024-06-22-DynamicScalableMicro-FrontendswithModuleFederation_3.png)

![이미지2](/assets/img/2024-06-22-DynamicScalableMicro-FrontendswithModuleFederation_4.png)

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

여러 가지 방법으로 모듈 연합을 활용할 수 있습니다.
연합 모듈을 사용하는 방법에는 다음과 같은 다양한 유연성이 있습니다.

- 도메인 수준: 여기에 각 연합 모듈은 별도의 도메인에 호스팅되어 독립적으로 사용됩니다.
- 위젯/컴포넌트 수준: 이 방법을 통해 어떤 앱에서든 다른 앱으로부터 어떤 위젯(예: 작은 코드 조각)을 추가할 수 있습니다.
- 하이브리드 수준: 첫 번째와 두 번째 방법을 함께 사용할 수 있습니다.

![이미지](/assets/img/2024-06-22-DynamicScalableMicro-FrontendswithModuleFederation_5.png)

저희는 우리의 요구에 하이브리드 방법을 선택했습니다. 이곳에서 호스트는 여러 마이크로 프론트엔드(원격)간의 탐색 로직 뿐만 아니라 루트의 지연 로딩도 처리합니다.

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

우리는 다양한 리모트들 사이에서 모든 공통 유틸, 컴포넌트, 훅 등을 처리하는 일반 위젯/컴포넌트 페더레이티드 모듈도 만들었습니다.

그저 하나의 웹팩 플러그인을 추가하면 끝이라고요? 그 답은: 네와 아니요 둘 다!

네, 의심의 여지가 없이 이것은 극적인 변화를 일으키지 않으며, 모듈을 레고처럼 간단하게 만들어 코드베이스에 쉽게 꽂아 넣고 뺄 수 있게 만들어 줍니다. 게다가, 다른 웹팩 플러그인 옆에 앉아서 단순히 연결하기만 하면 됩니다.

하지만, 아니요, 저희 팀이 이를 해결하느라 겪은 일부 고통스러운 문제가 있었습니다. 주요 문제로는 오류 처리, 버전 리소스 및 버전 관리, HMR, 타입 안전성 등이 있었어요.

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

각각의 내부 요구사항과 접근법에 따라 이 문제에 대한 여러 가지 다른 방법을 얻을 수 있습니다. 간단히 말씀드리면, 오늘은 가장 일반적이고 귀찮은 문제인 Type-Safety에 대해 이야기해 볼 거예요. 우리는 개발자가 로컬에서 코드를 작성할 때 타입 안전성과 자동 완성을 원하며, 추가로 타입 확인을 실행하여 TS 오류가 없는지 확인하고 싶어해요.

타입 안전성을 되찾아보자!

우리는 모노 저장소 구조를 사용하기 때문에 생성된 .d.ts 파일들을 참조하려고 노력했어요. 작동은 했지만 모노 저장소 구조와 결합되었고 외부 모듈에 독립적으로 사용할 수 없었어요.

그 다음으로 시도한 것은 타입을 NPM 패키지로 내보내는 것이었지만 이 문제가 우리에게 큰 장애물이었어요.

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

마침내 확장 가능한 솔루션이다. 이 솔루션에는 웹팩 구성 내부에 다음 도구가 포함되어 있습니다.

- dts-loader: 모든 d.ts 파일을 별도의 폴더에 생성하는 데 사용됨
- ExternalTemplateRemotesPlugin: 원격지에서 생성된 타입 tar 파일을 다운로드함

![이미지](/assets/img/2024-06-22-DynamicScalableMicro-FrontendswithModuleFederation_6.png)

기본적으로 자바스크립트와 함께 생성된 유형의 tar 파일을 번들링하며, 해당 원격지가 사용된 곳에서 ExternalTemplateRemotesPlugin을 통해 해당 파일을 다운로드합니다.

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

저희가 새로운 애플리케이션을 만들었는데 ID의 모든 경우/기능이 다 다뤄지지 않았기 때문에 이 결과는 사전 보드 결과와 비슷할 것입니다. 지금은 대략적인 방향을 얻을 수 있습니다;

![이미지](/assets/img/2024-06-22-DynamicScalableMicro-FrontendswithModuleFederation_7.png)

축하합니다! 성공하셨네요!
의문이나 제안이 있으면 댓글에 남겨주세요. 또는 제 소셜 미디어 ID 중 하나로 메시지를 남겨주세요. 이처럼 도전을 해결하는 것을 즐기신다면, 저희 채용 페이지 https://www.kredx.com/join-our-team을 꼭 확인해보세요.
