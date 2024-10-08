---
title: "현대 프론트엔드 디자인 시스템의 구조"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "The Architecture of a Modern Frontend Design System"
link: "https://medium.com/bitsrc/the-architecture-of-a-modern-frontend-design-system-cc884bd9c1a0"
isUpdated: true
---

## 통합 구성 요소 아키텍처를 위한 현대 프런트엔드 디자인 시스템 청사진

현대 디자인 시스템은 미학을 넘어 일관된 사용자 인터페이스를 만드는 기반으로 작용합니다. 디자이너와 개발자가 조화롭게 협업할 수 있도록 상세한 가이드라인, 구성 요소 및 도구를 제공합니다.

동시에 프런트엔드 디자인 시스템의 아키텍처는 개선된 개발자 경험과 함께 고도로 기능적인 사용자 인터페이스를 만드는 데 중요한 역할을 합니다. 현대 디자인 시스템 아키텍처의 주요 특성은 다음과 같습니다.

- 기존 라이브러리 및 프레임워크와 호환성이 있어야 합니다.
- 복잡한 구성 요소를 구축하기 위해 여러 구성 요소를 조합할 수 있어야 합니다.
- 애플리케이션 구성 요소로 확장할 수 있어야 합니다.
- 사용하는 구성 요소에 대한 종속성만 추가할 수 있어야 합니다.

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

# 기존 라이브러리 및 프레임워크 호환성

현대적인 디자인 시스템은 HTML, CSS 및 JavaScript의 모음이나 UI 라이브러리의 확장뿐만 아니라 React, Angular 또는 Vue와 같은 프레임워크에 대한 구체적인 지원을 제공합니다.

예를 들어, Bootstrap UI 라이브러리를 사용하여 React와 호환되는 디자인 시스템을 만든다고 가정해 보겠습니다. 디자인 시스템에 포함할 Bootstrap 요소마다 React 컴포넌트를 작성하고 Bootstrap의 일반적인 스타일과 규칙을 사용자 정의하는 디자인 토큰을 만들어야 합니다.

마찬가지로 Material UI를 사용하여 디자인 시스템을 만든다면, 모든 컴포넌트가 React를 기반으로 하기 때문에 작업이 훨씬 간답해질 수 있습니다. 그러나 디자인 시스템 내부의 컴포넌트를 선택하고 누락된 부분을 작성하며 테마, 타이포그래피 등을 사용자 정의해야 합니다.

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

# 복잡한 요소를 구성하기 위한 여러 구성 요소 조합 능력

현대적인 디자인 시스템에는 아래에서 위로 구축된 구성 요소가 포함되어 있습니다. 이는 우리가 여러 구성 요소를 재사용하고 결합하여 더 복잡한 것들을 구축할 수 있다는 것을 의미합니다.

![이미지](/assets/img/TheArchitectureofaModernFrontendDesignSystem_0.png)

이러한 구성 요소를 조합하여 복잡한 것들을 구축할 때 우리가 마주하는 한 가지 도전은 복잡성이 증가함에 따라 재사용하고 추가로 조합할 수 있는 능력이 줄어든다는 것입니다. 따라서 우리는 의미 있는 방식으로 그들을 구조화하고 정리하여 조합 가능성을 용이하게 해야 합니다.

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

좋은 예시는 원자 구조로 반복적이며 확장 가능한 컴포넌트 컬렉션을 정의하고 개발팀 간 커뮤니케이션을 용이하게 하는 Atomic Design입니다.

![그림](/assets/img/TheArchitectureofaModernFrontendDesignSystem_1.png)

이 구조는 주테이블로부터의 변환을 따라 의미 있는 구조를 만들어내는 데 도움이 됩니다.

# 어플리케이션 컴포넌트로 확장 가능함

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

이것은 전체 응용 프로그램을 구성 요소 집합으로 구축하는 새로운 컨셉입니다. 우리가 디자인 시스템을 유사하게 작성하면, 전체 응용 프로그램은 가장 작은 요소부터 복잡한 페이지까지 모두 컴포넌트의 집합으로 구성될 것입니다.

당신의 코드베이스의 모든 모듈이 컴포넌트로 정의된 세계를 상상해보세요. 이것은 응용 프로그램의 각 부분이 공유 가능하고 재사용 가능하며 자체 수명주기를 기본적으로 가지게되는 것을 의미합니다.

![Frontend Design System Architecture](/assets/img/TheArchitectureofaModernFrontendDesignSystem_2.png)

이 접근법의 아름다운 점은 동일한 구조가 응용 프로그램으로 확장될 수 있으며, 더 복잡한 UI 컴포넌트를 다른 컴포넌트들의 조합으로 작성하여 자체 패키지로 게시할 수 있다는 것입니다.

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

![The Architecture of a Modern Frontend Design System](/assets/img/TheArchitectureofaModernFrontendDesignSystem_3.png)

Bit는 이 아키텍처 스타일을 구현하기 위한 도구 체인과 빌드 시스템을 제공합니다. Bit에서 모든 것은 컴포넌트이며, 결국 bit.cloud 컴포넌트 레지스트리에 저장됩니다. 따라서 bit.cloud에서 컴포넌트 컬렉션(범위)을 구성하고, 업데이트 및 게시 권한을 부여하고, 변경 및 버전을 추적하며 필요한 경우 의존성 그래프를 시각화할 수 있습니다.

디자인 시스템을 위한 별도의 스코프를 생성하고, 응용 프로그램 스코프에서 컴포넌트를 사용할 수 있습니다. 그 후, 디자인 시스템의 컴포넌트를 해당 문서와 함께 bit.cloud의 원격 스코프에 게시할 수 있습니다.

이렇게 하면 개발자들이 컴포넌트와 이에 대한 문서를 찾아보고 필요할 때 기여할 수 있게 됩니다.

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

# 사용하는 컴포넌트에 대한 의존성만 추가하세요

우리가 만드는 디자인 시스템은 조직 내 여러 응용 프로그램에서 일반적으로 사용됩니다. 따라서 한 응용 프로그램이 디자인 시스템의 모든 컴포넌트를 사용할 것을 기대하기는 어렵습니다.

그러므로 응용 프로그램은 사용하는 컴포넌트와 해당 의존성을 선택할 수 있어야 합니다. Webpack을 사용하는 경우 번들러가 트리 쉐이킹을 수행하고 필요한 의존성을 선택할 수 있습니다. 그러나 번들러들은 완벽하지 않기 때문에 응용 프로그램의 의존성을 알고 있는 것이 중요합니다.

일부 UI 라이브러리는 사용하는 컴포넌트로 정적 번들을 빌드할 수 있는 방법을 제공합니다. 그러나 이 방법은 새로운 번들을 개발해야 하는 상황에서 컴포넌트를 추가하는 유연성을 제한합니다.

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

![이미지](/assets/img/TheArchitectureofaModernFrontendDesignSystem_4.png)

Bit를 사용하면 각 컴포넌트가 격리되어 재사용 가능하기 때문에 기본 기능을 제공받게 됩니다. 따라서 필요한 컴포넌트를 선택하고 그들의 종속성 그래프를 시각화할 수 있습니다.

# 결론

요약하면, 현대 프론트엔드 디자인 시스템의 아키텍처는 디자인과 개발의 융합입니다. 시각적으로 매력적뿐만 아니라 견고하고 확장 가능하며 사용자 친화적인 애플리케이션을 만들기 위한 청사진을 제공합니다.

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

당신이 당신의 조직을 위해 하나를 구축한다면, 적절한 구조를 만들고 디자인 및 개발자 협업을 확립하기 위해 최상의 사례를 따르는 데 투자하는 가치가 있어요.

감사합니다!

## 더 알아보기
