---
title: "앵귤러에서 마이크로 프론트엔드 애플리케이션 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-27-AGuidetoModuleFederationandMicro-FrontendApplicationsinAngularPart1_0.png"
date: 2024-05-27 19:02
ogImage:
  url: /assets/img/2024-05-27-AGuidetoModuleFederationandMicro-FrontendApplicationsinAngularPart1_0.png
tag: Tech
originalTitle: "A Guide to Module Federation and Micro-Frontend Applications in Angular — Part 1"
link: "https://medium.com/@hurkanugur/a-guide-to-module-federation-and-micro-frontend-applications-in-angular-part-1-1ec0a62191b5"
isUpdated: true
---

<img src="/assets/img/2024-05-27-AGuidetoModuleFederationandMicro-FrontendApplicationsinAngularPart1_0.png" />

# 안내 내용

이 안내서에서 다룰 내용은 다음과 같습니다:

- Angular에서 Micro-Frontend 애플리케이션 소개
- Angular에서 간단한 호스트 및 Micro-Frontend 애플리케이션 생성

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

# 소개

크고 화려한 생일 파티를 준비한다고 상상해보세요. 엄청나게 큰 케이크를 굽고, 장식을 꾸미고, 게임을 설치하고, 음식을 준비해야 합니다. 이 모든 것을 혼자 다 처리하려고 하면 압도될 수 있습니다. 하지만 친구들에게 작업을 분담할 수 있다면 어떨까요? 한 명은 케이크를 굽고, 다른 한 명은 장식을 하고, 또 다른 한 명은 게임을 설치하고, 한 명은 음식을 책임지죠. 모두가 독립적으로 일하지만 모여서 멋진 파티를 만들어냅니다.

웹 애플리케이션이 커지고 복잡해지면 단일 대규모 코드베이스를 유지하는 것이 어려워질 수 있습니다. 이러한 문제를 해결하기 위해 마이크로 프론트엔드와 모듈 연합이라는 개념이 소개되었습니다. 이러한 개념을 활용하면 개발자들이 모듈식, 확장 가능하며 유지보수가 쉬운 웹 애플리케이션을 만들 수 있습니다. 이 기사에서는 마이크로 프론트엔드의 기본 개념, Webpack 5의 기능, 그리고 Angular 프로젝트에서 모듈 연합을 구현하는 방법에 대해 자세히 살펴보겠습니다.

# 마이크로 프론트엔드란 무엇인가요?

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

마이크로 프론트엔드 아키텍처를 생각해보면 번화한 쇼핑몰의 푸드코트와 비슷합니다. 각 음식점(마이크로 프론트엔드)은 독립적으로 운영되어 독특한 요리를 제공합니다. 피자 전문점, 스시 전문점, 햄버거 전문점 등이 있습니다. 각 음식점은 독립적으로 관리되고 운영되며 재고가 구비되지만, 함께하면 쇼핑몰 방문객들에게 즐거운 다이닝 경험을 선사합니다.

마이크로 프론트엔드는 이 개념을 웹 애플리케이션에 적용한 것입니다. 큰 웹 애플리케이션을 더 작고, 준 독립적인 "마이크로" 애플리케이션으로 분할합니다. 각 마이크로 프론트엔드는 별도로 개발, 배포, 유지보수할 수 있습니다. 이 접근 방식을 통해 서로 다른 팀이 서로 다른 프론트엔드 부분에 작업을 할 수 있으며, 서로 간섭하지 않게 되어 확장성, 유지보수성이 향상되며 동일한 애플리케이션 내에서 다른 기술을 사용할 수 있습니다.

# 웹팩 5이란?

캠핑용품을 준비하는 것과 같습니다. 텐트, 음식, 옷, 캠핑 장비가 필요합니다. 이 모든 것을 하나의 큰 가방에 랜덤하게 넣는 대신, 특정 카테고리에 지정된 여러 작은 가방을 사용합니다. 이렇게 하면 물건을 싸고, 찾고, 사용하는 것이 훨씬 쉽고 효율적입니다.

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

웹팩 5은 자바스크립트 애플리케이션을 위한 궁극적인 패킹 시스템 같아요. 자바스크립트 파일, 스타일, 이미지, 그리고 다른 에셋들을 효율적으로 정리하고 패킹하는 모듈 번들러에요. 아래는 웹팩 5의 주요 기능들이에요:

- 모듈 연맹: 다른 캠퍼들 사이에서 공급을 공유하는 것처럼, 모듈 연맹은 여러 웹팩 빌드가 함께 작동하도록 하여, 애플리케이션 간의 코드 공유를 가능하게 함.
- 개선된 캐싱: 미래의 패킹을 빠르게 만들어주는, 잊지 않게 해주는 매우 체계적인 체크리스트와 같은 것으로 생각해봐요.
- Tree Shaking: 가방에서 불필요한 물건을 제거하여 가벼우고 효율적으로 만드는 것과 같아요.
- 에셋 모듈: 에셋 파일(예: 이미지와 폰트)을 다루기 쉽게 해주어 모든 것이 제 위치에 있도록 해요.
- 웹 어셈블리 지원: WebAssembly에 대한 향상된 지원으로, 여러 가지 고급 캠핑 가전들을 위한 특별한 칸나 있는 것처럼 생각해봐요.

# 독립형 컴포넌트란 무엇인가요?

레고 블럭을 사용해 건물을 지을 때, 각각의 레고 블럭은 독립적인 부분으로, 독립적으로 사용하거나 다른 블럭들과 결합하여 더 큰 것을 만들 수 있어요. 각 블럭이 어느 세트에서 왔는지 고민할 필요는 없어요; 어디에 놓든 그대로 작동해요.

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

Angular에서 독립형 컴포넌트는 다양하고 다재다능한 레고 블록과 같습니다. 이들은 특정 NgModule에 바인딩되지 않은 Angular 컴포넌트로, NgModule 선언 내에서 명시적으로 가져오기 및 내보내기가 필요 없이 응용 프로그램의 여러 부분에서 사용할 수 있습니다.

- 높은 재사용성: 레고 블록처럼 독립형 컴포넌트는 서로 다른 모듈 및 프로젝트에서 사용할 수 있습니다.
- 관계 단순화: 복잡한 가져오기/내보내기 관계가 제거되어 컴포넌트 계층 구조가 단순화됩니다.
- 지연 로드 모듈과 함께 작동: 독립형 컴포넌트는 지연 로드된 모듈과 원활하게 통합됩니다.
- 제3자 라이브러리 통합: NgModule 선언을 수정하지 않고 제3자 라이브러리와 함께 사용할 수 있습니다.
- 복잡성 감소: 의존성 관리가 쉬워지며, 마치 레고 모형을 조직하는 것과 같습니다.
- 더 깔끔한 코드 분리 유도: 코드베이스가 깔끔하고 모듈식으로 유지되어, 마치 레고 모형의 구분된 섹션을 구성하는 것과 같습니다.
- 더 이동 가능: 독립형 컴포넌트는 이동, 리팩토링 또는 이주가 쉽습니다. 마치 레고 조각을 재배열하는 것과 같습니다.

독서해 주셔서 감사합니다. 즐거운 코딩되세요! :)

# 관련 링크:

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

- **Angular에서 모듈 연합 및 마이크로 프론트엔드 애플리케이션 가이드 - 파트 1**
- **Angular에서 모듈 연합 및 마이크로 프론트엔드 애플리케이션 가이드 - 파트 2**
