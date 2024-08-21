---
title: "CLEAN Feature-Sliced 를 사용하는 Agile Flutter 프로젝트 확장 가능한 모델로 만들기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "CLEAN and Agile Flutter Projects with the CLEAN Feature-Sliced Scalable Model"
link: "https://medium.com/@jovazcode/clean-and-agile-flutter-projects-with-the-clean-feature-sliced-scalable-model-79e524248322"
isUpdated: true
---

![CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_0](/assets/img/CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_0.png)

💙 🚀 점점 더 많은 어플리케이션과 프로젝트들이 플러터로 등장하고 있습니다. 그 흐름을 멈출 수 없어요. 중요한 앱을 갖는 대규모 비즈니스 프로젝트뿐만 아니라 더 혁신적이고 많은 기능 변경이 있는 프로젝트들, 예를 들어 MVP나 SaaS용 UI 앱 같은 소규모 프로젝트들도 많이 나오고 있어요.

플러터는 이러한 상황에 이상적인데요, 다른 기술보다 시간과 노력을 적게 들여 고성능 애플리케이션을 만들 수 있기 때문이죠.

유일한 문제는 /lib 폴더 아래에서 개발자로서 우리가 조직화하고 혼란스럽게 만들 수 있다는 것이에요.

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

실제로 회사에서 앱의 수명 주기가 길거나 빈번한 변경이 필요한 경우와 같이 전문적인 환경에서는 프로젝트를 조직하는 방식이 품질, 유지 관리성 및 기능 확장성 측면에서 중요합니다. 때때로 이 둘을 동시에 다루어야 하는 경우도 있어요! 😅

이 글에서는 "프론트엔드" 애플리케이션에 초점을 맞춰볼 거에요. 특히 규모와/또는 복잡성 때문에 소스 코드를 구성하고 구조화해야 하는데, 또한 SOLID, DRY 등 기술 요구 사항을 충족하는 강력하고 견고한 소프트웨어 아키텍처가 필요하며, 잘 정립된 디자인 패턴 및 확장 가능한 프로그래밍 원칙을 준수해야 합니다.

## 💪 Clean Architecture (“CLEAN Architecture”)

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

프로젝트 구조화에 대해 이야기하기 전에, 먼저 적용할 기본 소프트웨어 아키텍처를 확립하는 것이 중요합니다.

소프트웨어 아키텍처는 프로젝트의 기반, 서로 다른 레이어 및 구성 요소를 정의하며, 어떤 방식으로든 프로젝트의 구성에 영향을 미치고 심지어 물리적으로도 영향을 줍니다. 이는 폴더와 파일의 이름, 그리고 팀 간 작업 분배 방식에 영향을 줍니다.

<img src="/assets/img/CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_1.png" />

여기에서 제안된 참조 프레임워크는 "CLEAN Architecture"의 일부인데, 구체적으로 다음과 같은 레이어를 가지고 있습니다:

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

- “애플리케이션”은 사용자 상호작용, 그래픽 요소, 대화형 요소, 사용자 요청을 위한 관리 및 조정 컨트롤러, 사용자에게 표시될 상태 및 데이터 관리 구성 요소가 모두 위치하는 곳입니다. 이것은 단순히 한 레이어 이상을 나타내는 것이 아니라 실제로 THE Flutter 앱 “프론트엔드” 프로젝트를 나타내며, 다른 레이어는 더 많은 “프론트엔드” 앱이 생성될 수 있는 “라이브러리”(“패키지”)입니다.
- “도메인”은 사용자에게 가치를 제공하기 위해 “프론트엔드” 애플리케이션이 필요로 하는 모든 비지니스 개념과 로직이 위치하는 곳입니다. 시간이 지남에 따라 변화가 가장 적게 일어나는 레이어로, 이것이 소프트웨어의 중심 레이어인 이유입니다.
- “데이터”는 정보가 실제로 저장되는 서비스 및 데이터의 인프라로, 쿼리, 트랜잭션 및 네이티브 플랫폼 액세스가 수행되는 곳이며 비지니스 프로세스가 제어되고 실행되는 곳입니다. 이 레이어는 “도메인” 레이어의 유물이 “현실화”되는 곳입니다.

**"CLEAN"의 서브셋을 왜 선택하나요?**

우리는 사실, 큰 이론을 제외하고 상식을 적용할 때, 좋은 아키텍처는 그 이상도 그 이하도 아닐 수 있다고 말할 수 있습니다.

우리는 대부분의 개발에서 "과도한 엔지니어링"을 피하기 위해 “CLEAN Architecture”의 일부를 유지할 것입니다.

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

어쨌든, 원하신다면 또는 언젠가 프로젝트가 필요로 하는 경우, 이 기사에서 소개된 프로젝트 조직 방식은 이미 배포 및 운영 중인 것을 변경하지 않고, 원하는 "CLEAN" 구현 수준까지 확장할 수 있습니다.

만약 "CLEAN Architecture"에 익숙하지 않거나 좀 더 심층적으로 알고 싶다면, "Uncle Bob" 자신이 작성한 다음 POST를 확인해보세요: The CLEAN Architecture

## 상태 관리

Flutter 프로젝트에서 프레임워크를 구축하는 데 있어서 또 다른 중요한 문제는 상태 관리입니다 (React 프로젝트와 마찬가지)! 😅

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

우리가 다 아는 대로, Bloc, Riverpod, MobX 등 여러 대안들이 있습니다. 각각의 장단점과 팬들이 있죠.

특정 전략을 선택하는 것은 필수도 아니며 본 문서의 목적도 아닙니다. 하지만 특정 프로젝트 조직 모델을 표현하는 목적으로 나아가기 위해서는 이제부터 "어플리케이션" 레이어의 상태와 "도메인" 레이어의 비즈니스 컴포넌트 호출을 관리할 방법을 정립하는 것이 필요합니다 😐

따라서 이후의 모든 내용(다이어그램, 설명 및 소스 코드)에서 상태 관리를 위해 BLoC에 대해 이야기할 것입니다(저의 개인적인 선택입니다).

하지만 사실은, 원한다면:

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

<img src="/assets/img/CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_2.png" />

지금까지, 그리고 “애플리케이션” 층에서 상태 관리자로 BLoC를 선택한 점을 고려할 때, 이 기사에서 소개된 조직 및 아키텍처 모델은 매우 좋은 벤처스(뉴욕, 2018년)의 사람들이 권장하고 사용하는 아키텍처와 매우 유사하다고 말할 수 있습니다 🦄 심지어 BLoC의 아버지인 Felix Angelov(시카고)도 플러터와 함께 공유하는 자습서, 데모 및 프로젝트에서 사용한 아키텍처와 같습니다.

사실 그런 것 같아요!… 기술 및 기술 문제에만 중점을 둔 조직 및 구조화 접근 방식을 따를 때, 대부분의 개발자 및 엔지니어들은 어떻게 보면 플러터 프로젝트의 유사한 구조에 도달합니다 🤓

하지만, 우리는 (단지) 여기서 멈출 수는 없습니다 👇

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

## Layer Organization vs “Features” Organization

플러터 커뮤니티 내에는 두 가지 주요(상반된) "스쿨"이 있습니다(리액트와 앵귤러와 같은 다른 “프런트엔드” 기술 커뮤니티에서도 같은 일이 일어납니다),

- 한편으로는 기술적인 기준에 따라 코드를 구성하는 사람들이 있습니다; 우리의 경우에는 "CLEAN," 그 층, 디자인 패턴 및 구성 요소 유형에 따라 코드를 구성하는 사람들이겠죠:

![CLEAN](/assets/img/CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_3.png)

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

- 그리고 또 다른 사람들은 폴더를 논리적 섹션과 기능(또는 "기능")으로 매핑합니다:

![이미지](/assets/img/CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_4.png)

레이어와 구성 요소 사이의 결합을 관리하는 것은 기술적으로 중요합니다(결합이 적을수록 더 좋습니다... 일정한 한계까지), 물론 기능적으로 관련된 구성 요소 간의 응집 또한 중요합니다(조직적으로 응집이 커질수록... 또한 일정한 한계까지, 가능한 변경에 대비하여 머리 아픔을 줄이고 더 큰 효과를 얻을 것입니다).

응용 프로그램의 모든 코드를 기술적 고려사항(패턴, 구성 요소 유형 및 해제)에만 기반하여 구성하는 것은 애플리케이션이 실제로 무엇을 제공하는지(및 어떻게)에 대한 시야 손실을 일으킵니다.

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

⚠️ 그러나 주의하세요. "기능 중심" 코드 구조의 경우 종종 밑바닥 의존성이 명확하게 표시되지 않을 수 있습니다!!

그리고 어느 날 변경을 해야 할 때가 오면, 처음 보기에는 "완벽하게 조직화된" 것처럼 보이는 폴더 뒷면을 깊게 살펴보게 되는데, "오!"라는 경험을 통해 그 속에는 매우 가혹하고 불쾌한 것이 숨겨져 있을 수 있다는 것을 깨닫게 됩니다. 예를 들어 "순환 의존성"과 같이. 😱 이런 문제를 이미 다뤄본 소프트웨어 엔지니어에게는 진짜 흑마귀 같은 것들이 되는 영역들입니다!!

## 🍰 "기능 중심 설계" (FSD)

"기능 중심 설계" (FSD)는 "프론트엔드" 소프트웨어 앱을 위한 아키텍처 방법론으로, 기능을 중심으로 구조화하고 "층"과 "의존성"에 대해 표준화하고 규칙을 설정합니다.

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

"Feature-Sliced" 디자인에 대해 익숙하지 않다면, 여기 👈 공식 페이지를 자세히 살펴보세요.

"Feature-Sliced Design"를 통해 우리는 일상적인 충실도와 결합성 사이에 이상적인 균형을 달성할 수 있습니다. 이는 코드베이스를 높게 (완전히는 아니지만) 일관성 있게 유지하면서, 꽤 (전적으로는 아니지만) 결합을 느슨하게 하는 것이 중요합니다.

![이미지](/assets/img/CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_5.png)

## "CLEAN Feature-Sliced" (CFS): 견고하고 민첩한 모델

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

그 모든 것을 고려하면서 항상 해당 분야의 전문 건축가와 개발자들이 공유한 최상의 관행을 선호하는 것이 가장 중요합니다. 여기에는 Flutter를 사용하여 UI 앱을 개발하는 데 가장 적합한 조합이 아마도 제시됩니다. 이 조합은 기술적인 관점에서 견고함과 질서, 그리고 관리적인 관점에서 민첩성과 다재다능성을 모두 제공합니다.

양쪽의 장점을 결합한 것:

- “CLEAN” Architecture 💪 :: 좋은 관행(패턴)에 중점을 둔 소프트웨어 엔지니어링의 기술적 개념과 원리
- “Feature-Sliced” Model 🍰 :: 비즈니스 기준과 현실 세계 사용자가 보고 하는 내용에 중점을 둔 모델

"CLEAN" 계층 간의 관심사를 명확히 분리하며 "기능"으로 명확하고 표준화된 분해를 통해 개발의 민첩성과 모듈성을 증가시킨다는 방식입니다.

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

이 "프론트엔드" 앱을 위한 아키텍처 및 프로젝트 구조화 모델인 "CLEAN Feature-Sliced"는 제가 플러터 개발에 적용하기로 결정한 혼합 방법론입니다. 이 방법론은 "CLEAN Architecture"의 원칙과 "Feature-Sliced Design" 방법론의 기준을 결합하여 구성되었습니다.

"CFS"("CLEAN Feature-Sliced")를 통해 "CLEAN Architecture"와 "Feature-Sliced Design" 간의 융합을 통해 모든 이해관계자(비즈니스 및 개발자)가 여러 측면에서 이길 수 있습니다:

- 워크플로와 팀 간 협업에 대한 더 많은 민첩성,
- 최종 제품이 사용자 요구에 더 잘 맞음,
- 변경에 대한 큰 적응성,
- 새로운 기능을 쉽게 구현할 수 있음,
- 기존 시스템의 변경으로부터 최소한의 간섭.

## BLoC 라이브러리의 공식 문서에서 예시 앱 "Todos"

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

공식 BLoC 라이브러리의 문서에서 "Todos" 앱을 예시로 삼기로 결정했어요. 여기 👈 에서 찾을 수 있어요.

![이미지](/assets/img/CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_6.png)

내가 한 일은 "CLEAN Feature-Sliced" 기준에 따라 완전히 리팩토링했어요. 그래서 여기서 코드를 쇼케이스하고 플러터 커뮤니티와 함께 Github를 통해 공유할 수 있게 되었어요.

![이미지](/assets/img/CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_7.png)

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

⚠️️️️ FSD는 이 앱과 같은 작은 앱에는 적용하기 어렵고 전혀 쓸모가 없습니다 → 이것은 단지 연습용으로, 매우 적은 코드로 FSD의 "레이어", "스라이스", "세그먼트"가 플러터 애플리케이션 내에서 어떻게 작동하는지를 보여주는 예제입니다!!!

기본적으로 "CLEAN Architecture"에 기반한 다른 응용 프로그램처럼 CFS "Todos" 앱 버전은 "application", "domain", "data" 3개 레이어로 분해되며 "domain"이 모든 다른 레이어가 의존하는 중심적인 레이어로 작용합니다:

![CLEAN Architecture Layers](/assets/img/CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_8.png)

이 경우, 앞서 언급한 대로 플러터 "프런트엔드" 프로젝트는 "application" 레이어이며 다른 레이어("domain" 및 "data")는 플러터 패키지로 선언된 종속성입니다:

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

![CLEAN and Agile Flutter Projects with the CLEAN Feature-Sliced Scalable Model 9](/assets/img/CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_9.png)

So far, the approach is more or less “standard” and well known by everyone in the community.

The most notable and “novel” (at least for the Flutter ecosystem) comes in the “application” layer, where the standard criteria for code structuring and organization defined by the “Feature-Sliced Design” methodology are implemented:

![CLEAN and Agile Flutter Projects with the CLEAN Feature-Sliced Scalable Model 10](/assets/img/CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_10.png)

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

"FSD" 방법론은 "프론트엔드" 애플리케이션을 계층으로 분해하고, 이를 다시 "슬라이스"로 나누며, 이를 또 "세그먼트"로 분해합니다:

- 각 계층은 표준화된 이름을 가지며, 각각 역할이나 작업이 있습니다:

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

- FSD에서는 레이어들이 의존성과 관련하여 완벽하게 정렬되어 있습니다 (shared는 다른 레이어에서 참조할 수 있지만, pages는 applayer에서만 참조할 수 있음).

![](/assets/img/CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_13.png)

- 각 레이어는 상위 레이어에서 참조하고 사용할 수 있는 컴포넌트를 명시적으로 내보내는 "배럴" 파일을 제시해야 합니다. 이를 통해 각 레이어의 API가 무엇인지 정확히 파악할 수 있으며, 어디서 확인할 수 있는지도 알 수 있습니다!
- 각 레이어는 "스라이스(slices)"로 분해되어 있으며 이를 통해 코드를 "비즈니스 범위"(또는 "모듈"이라고도 부르는 것)별로 논리적으로 분할하여 관련된 컴포넌트 간의 "응집성(cohesion)"을 유지하고 보장합니다.
- "결합(couplings)"과 순환 종속성을 제한하기 위한 황금 규칙: 동일한 레이어 내에서, 한 "스라이스"는 다른 "스라이스"를 참조하거나 사용할 수 없습니다. (FSD는 "기능 우선" 패러다임을 훨씬 넘어서 규칙과 규범을 제시합니다.)
- 마지막으로, 각 "스라이스"는 "세그먼트"로 더 분해되어 있으며, 이는 "blocs," "presentation," "models," "helpers," "lib" 등과 같은 기술 기준에 따라 코드를 구성하는 부분을 구성합니다. 이 곳에서는 코드를 익숙한 방식으로 자유롭게 구성할 수 있습니다.

각 레이어의 책임을 좀 더 자세히 살펴봅시다:

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

- app: 애플리케이션 및 그 종속 항목을 초기화하는 곳입니다. 이것이 모든 것의 시작점입니다. 여기서 저는 애플리케이션의 "모듈"을 명시적으로 반영하며, 페이지, 경로, 기능 및 엔티티가 모두 조직되는 애플리케이션의 계층입니다.
- pages: 이 계층에는 앱의 페이지가 포함되어 있습니다. 이것은 플러터 세계에서 위젯 트리의 시작점이며 사용자에게 제공되는 기능 및 데이터의 진입점입니다.
- widgets: 기능적으로 그리고 그래픽적으로 "진화한" 구성 요소(사용자 인터액션 + UI 요소)로, 다른 3개의 하위 계층에서 기본 구성 요소를 조립합니다.
- features: 사용자에게 가치를 제공하는 기능 시나리오와 사용 사례입니다. 예를 들어, 콘텐츠 공유, 댓글 작성, "게시물" 평가 등이 있습니다.
- entities: "게시물", "댓글", "기사"와 같은 비즈니스 엔티티입니다. 이 계층은 각 엔티티에 맞게 맞춰진 "scaffold" 타입 위젯을 포함하며, 예를 들어 테이블에서 "게시물"을 나타내는 "Card"나 목록에서 "댓글"을 나타내는 "Tile"이 있습니다("scaffold"은 상위 계층의 위젯과 기능을 위한 슬롯을 제공합니다).
- shared: 특정 비즈니스 로직에 종속되지 않은 재사용 가능한 구성 요소 및 유틸리티입니다(기본 위젯, API, 익스텐션, 유틸리티 등).

여기에서 우리는 "FSD"의 규칙과 일반을 적용하여, 플러터 애플리케이션을 "기능적인 조각"으로 분해하여 삽입하거나 교체하기 쉬운 이상적인 균형을 달성합니다!!

 <img src="/assets/img/CLEANandAgileFlutterProjectswiththeCLEANFeature-SlicedScalableModel_14.png" />

## 결론

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

이 글에서는 React와 Vue와 같은 "프런트엔드" 기술에서 적용되는 "Feature-Sliced Design" 🍰 방법론을 발견했어요. 이 방법론이 가져다주는 혜택을 살펴보았고, "CLEAN Architecture"와 BLoC 상태 관리자를 기반으로 한 Flutter 💙 애플리케이션을 통한 구현 예시도 살펴보았어요.

우리는 "CLEAN"과 "FSD" 사이의 융합으로부터 나온 결과 모델을 "CLEAN Feature-Sliced"라고 이름 붙였어요: 💪 "CLEAN"은 프로젝트를 겹치지 않는 레이어와 컴포넌트(Entities, Interfaces, Repositories, Data Sources 등)로 구성하고, 다른 프레임워크, 라이브러리, 백엔드와 독립성을 우선으로 하는 견고하고 적응 가능한 기반을 제공함으로써, 🍰 "FSD" 방법론은 우리에게 "애플리케이션" 레이어를 작은, 격리된, 모듈화된 "기능"으로 분해할 수 있게 해줍니다. 또한, 레이어 간 및 "슬라이스" 사이의 상호 의존성을 잘 정의한 관리도 가능해요.

이 모든 것은 Flutter 프로젝트에 특히 효과적인 이 새로운 아키텍처적, 조직적 모델("CLEAN Feature-Sliced")을 만들어냅니다. 이 모델은 코드 품질이나 애플리케이션의 견고성을 희생하지 않으면서도 적응성과 속도가 필요한 Flutter 프로젝트에 특히 효율적이에요(예: 중요한 기업 앱 및 스타트업의 MVP).

이 글이 여러분의 프로젝트에 도움이 되기를 희망합니다!!

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
