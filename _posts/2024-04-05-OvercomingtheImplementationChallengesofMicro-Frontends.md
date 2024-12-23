---
title: "마이크로 프론트엔드 구현 하기 "
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Overcoming the Implementation Challenges of Micro-Frontends"
link: "https://medium.com/@drpicox/overcoming-the-implementation-challenges-of-micro-frontends-a739b1630f43"
isUpdated: true
---

![Micro-Frontends Implementation Challenges](/assets/img/OvercomingtheImplementationChallengesofMicro-Frontends_0.png)

마이크로 프론트엔드는 우리가 웹 애플리케이션을 구축하는 방식에 대한 패러다임 변화를 나타내며, 진정한 분리된 영역에 맞게 정렬된 UI 구성 요소를 제공합니다. 확장성과 유연성을 향상시킬 수 있는 잠재력에도 불구하고, 마이크로 프론트엔드를 구현하는 것에는 일련의 도전 과제가 있습니다. 본 기사에서는 주요 개념을 소개하고, 그들이 왜 중요한지, 그리고 성공적인 마이크로 프론트엔드 아키텍처를 갖기 위해 어떻게 대응할 수 있는지 알아보겠습니다.

마이크로 프론트엔드가 어떻게 작동하며 적용할 수 있는 패턴에 대해 논의하기 전에, 중요한 두 가지에 대해 먼저 이야기하는 것이 중요합니다: 도메인 주도 설계(Domain-Driven Design)와 마이크로서비스. 도메인 주도 설계에 대해서는 간단히 소개할 것이며, 이 방법론이 어디에 들어맞는지를 이해하는 데 필요합니다. 마이크로서비스는 ‘마이크로’ 아키텍처의 요구 사항을 이해하기 위해 탐구할 것이며, 이러한 요구 사항은 이미 마이크로서비스에서 다뤄졌기 때문에, 마이크로 프론트엔드 수준에서 해야 할 일을 더 잘 이해하게 도와줄 것입니다.

# 도메인 주도 설계

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

도메인 주도 설계(DDD)는 전략과 전술 두 가지 기본 부분으로 나뉘는 소프트웨어 구축 방법론입니다. 전술은 모두가 생각하는 것: 마이크로 아키텍처 구현을 가능하게 하는 코드 패턴이지만 전략이 근본입니다.

DDD의 기본 전략은 회사 구조가 어떻게 작동하는지 이해하고 그 안에 존재하는 경계를 활용하여 소프트웨어를 구조화하는 것입니다. 이러한 장벽을 여러 개를 건너는 단일 소프트웨어 대신, 각각의 장벽 내에 여러 개를 가지고 있어 독립적인 구조를 만듭니다. 이는 회사 구조가 코드 수준까지 반영되는 것을 의미하며, 따라서 이 방법론은 도메인 주도 설계(Domain-Driven Design)라고 불리며, 코드 디자인은 비즈니스 도메인을 기반으로 합니다.

이 방법론은 소프트웨어를 여러 개의 작은 소프트웨어, 우리가 '마이크로'라고 부르는 것들로 나누며, 이러한 '마이크로'들은 회사 내에서 소통하는 것처럼 서로 소통해야 합니다: 동일 도메인 내에서는 매우 강하게, 서로 다른 도메인 간에는 매우 느슨하게.

# 마이크로서비스

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

마이크로서비스는 DDD에서 도메인 내의 서비스를 구성하는 메커니즘이며, 그 전략을 따릅니다. 전술에서 각 마이크로서비스는 여러 집합으로 구성됩니다. 집합은 마이크로서비스를 구성하는 데 사용되는 소프트웨어 패턴으로, 요약하면 가능한 가장 작은 마이크로서비스입니다. 그러나 개발 및 실행 비용 면에서 효율성을 위해 같은 도메인의 모든 집합은 단일 마이크로서비스로 결합됩니다.

마이크로서비스가 가져야 하는 특성 중 하나를 구분해본다면, 그것은 독립성입니다. 마이크로서비스는 다른 서비스에 의존하지 않고 진화할 수 있어야 합니다. 한편, DDD의 방법론과 전략은 이미 어느 정도의 자율성을 제공하지만 전술 - 패턴 및 구현 - 는 목표를 완전히 달성하기 위해 필수적입니다. 이를 위해, 마이크로서비스가 다른 마이크로서비스에 직접 종속되지 않도록하는 것이 중요합니다. 즉, 다른 데이터베이스, 코드 공유, 리포지토리 등에 접근해서는 안 됩니다.

마이크로서비스를 독립적으로 만들기 위해 집합 방법론은 다음과 같은 구분을 만듭니다:

- 데이터베이스: 각 서비스는 자체 데이터베이스를 가지며 공유하지 않습니다.
- 데이터 쿼리: 다른 마이크로서비스에서 데이터를 요청하는 유일한 방법은 REST 작업(또는 SOAP 또는 유사한 방법)을 통해 이루어집니다.
- 명령 실행: 주체로부터 또는 때로는 다른 마이크로서비스로부터 명령을 실행하기 위해서는 REST 작업(또는 SOAP 또는 유사한 방법)을 통해 이루어집니다.
- 도메인 이벤트 발생 및 수신: 마이크로서비스 간 일관성을 유지하기 위해 도메인 이벤트가 전송됩니다.

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

<img src="/assets/img/OvercomingtheImplementationChallengesofMicro-Frontends_1.png" />

이것은 마이크로서비스가 결국 쿼리나 명령을 받아 실행할 엔드포인트, 상태를 저장할 데이터베이스 및 일관성을 유지하기 위한 통신 버스를 갖게 될 것을 의미합니다.

# 마이크로프론트앤드 아키텍처 계획

마이크로서비스를 구현하는 방법을 생각할 때, 우리는

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

따라서, 우리는 동일한 측면을 고려해야 합니다. 그러나 한 가지 다시 강조하고 싶은 것은 이것이 전술에 대한 것이며, 앞서 언급한 것처럼 단단한 전략을 갖는 것이 매우 중요하다는 점입니다.

마이크로프론트엔드의 아키텍처에 관한 것은 마이크로서비스와 마찬가지로 기본적인 요구사항을 공유합니다:

- 데이터베이스: 수신 및 내부 데이터를 저장하는 데 사용됩니다.
- 데이터 쿼리: 다른 마이크로프론트엔드에서 데이터를 제공하거나 가져오기 위한 용도로 사용됩니다.
- 명령 실행: 수행할 작업을 요청하거나 다른 마이크로프론트엔드에서 작업을 실행하기 위한 메커니즘입니다.
- 도메인 이벤트: 상태를 업데이트하기 위해 이벤트를 발생시키고 반응하는 데 사용됩니다.

이 경우, 마이크로서비스가 API에 대한 진입점으로 기능하는 엔드포인트가 있다는 것을 논의했지만, 마이크로프론트엔드는 이러한 것이 없습니다. 대신, 그들은 그래픽 컴포넌트를 사용하여 사용자와 직접 상호 작용하며, 반면에 다른 마이크로프론트엔드에서 접근할 수 있도록 API를 게시해야 합니다. 명백하게, 도메인 이벤트를 위한 버스 구현도 중요합니다.

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

# 마이크로 프론트엔드 데이터베이스

우리가 강력한 마이크로 프론트엔드 아키텍처를 계획하기 위해 고려해야 할 첫 번째 요소에 대해 자세히 살펴보겠습니다: 데이터베이스입니다.

일반적으로 프론트엔드를 언급할 때 데이터베이스에 대해 생각하지 않는다고는 하지만, 두 가지 별도의 문제에 직면하게 됩니다:

- 지속 데이터: 프론트엔드는 표시할 데이터를 가져오기 위해 해당 마이크로서비스에 액세스해야 하며, 변경을 유발하는 조치를 전달해야 합니다.
- 세션 데이터: 프론트엔드는 세션에서 사용되는 데이터를 임시로 저장하는 작은 공간도 필요합니다. 덧붙여 말하자면, 프론트엔드는 쿠키, localStorage 및 유사한 메커니즘에 데이터를 저장할 수도 있습니다.

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

영속 데이터에 관해서는, 마이크로프론트엔드 자체의 데이터베이스로서 마이크로서비스를 고려할 수 있습니다. 데이터를 가져오기 위해 GET을 수행하고, 업데이트를 위해 POST/PUT/DELETE를 수행하며, 마이크로서비스가 영속성을 처리하여 사용자들이 브라우저를 변경하더라도 계속 액세스할 수 있도록 합니다.

세션 데이터에 관해서는 이 데이터는 마이크로프론트엔드가 데이터를 저장할 수 있는 곳에 저장되어야 합니다. 가장 기본적인 프론트엔드들은 특별한 것을 사용하지 않고, 어떤 것은 심지어 HTML 자체를 사용하여 상태를 저장합니다. 그러나 더 고급 프론트엔드는 자체 MVC를 갖고 있으며, 모델이 바로 이 '데이터베이스'인 경우도 있습니다. Redux와 같은 솔루션을 고려해본다면, 그것은 그 상태가 될 것입니다. 신호를 사용한다면, 이 신호의 내용이 될 것입니다.

이는 마이크로서비스 데이터베이스 정의와 마찬가지로, 해당 마이크로서비스에 대해서만 비공개로 유지되어 다른 서비스와 공유되지 않아야 한다고 말한 것과 같습니다. 따라서 한편으로는 내부 메모리는 다른 마이크로프론트엔드에 직접적으로 액세스되거나 쿼리되어서는 안 되지만, 다른 한편으로는 DDD 전략을 따르며, 각 마이크로프론트엔드는 도메인 경계에 맞게 자신의 마이크로서비스에만 연결해야 합니다.

각 마이크로프론트엔드에 독립적인 Redux 상태를 만들어야 할지 아니면 서로 공유해야 할지는 상황에 따라 다릅니다. 각 마이크로프론트엔드가 각자의 Redux 스토어(또는 Zustand 등)를 가져야 한다는 것이 맞다고는 할지라도, 나중에 살펴볼 것처럼, 각 마이크로프론트엔드 간에 도메인 이벤트를 통신하는 데 필요한 공유 매개체가 필요합니다.

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

<img src="/assets/img/OvercomingtheImplementationChallengesofMicro-Frontends_2.png" />

# 마이크로 프런트엔드 데이터 조회

프런트엔드에서 다른 마이크로서비스에서 데이터를 조회하는 GET 방식의 동등한 기능이 필요합니다. 이는 다른 마이크로 프런트엔드와 통신하고 필요한 데이터를 요청할 수 있는 능력을 의미합니다.

마이크로 프런트엔드 환경과 마이크로서비스 환경 사이에는 두 가지 주요한 차이점이 있습니다:

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

- 모든 마이크로 프론트엔드는 동일한 컴퓨터에서 실행됩니다. 일반적으로 메모리 공간을 공유하며 직접 메소드 호출이 가능한 반면, 마이크로서비스는 별도의 메모리 공간에서 실행됩니다(예: 서로 다른 가상 머신에서). 따라서 서로의 메소드를 직접 호출할 수 없고 REST와 같은 원격 프로토콜을 사용하여 데이터를 가져와야 합니다.
- 마이크로 프론트엔드는 반응적입니다. 사용자는 변경 발생 후 즉시 데이터가 업데이트되어야 하며 모든 뷰가 업데이트되어야 합니다. 따라서 마이크로서비스가 데이터를 요청하고 해당 시점에 가지고 있는 데이터를 사용하는 전략은 적용할 수 없습니다.

따라서 다른 마이크로 프론트엔드에서 데이터를 쿼리하려면 명확한 계약으로 게시된 메소드를 호출하고, 변경 사항을 시각화하는 관찰자 시스템을 통해 이를 이상적으로 수행할 수 있습니다. Redux와 유사한 환경에서는 셀렉터에 해당할 것입니다.

그러나 해당 도메인 이벤트가 도착할 때 내부 상태를 업데이트하는 방식으로 마이크로서비스가 하는 것과 같이 반응성을 구현하는 가능성도 고려해야 합니다. 이 경우, 추가적인 관찰자 메커니즘을 구현할 필요가 없으므로 셀렉터가 필요하지 않으며, 해당 도메인 이벤트가 도착할 때마다 마이크로 프론트엔드는 단순히 뷰를 다시 계산할 것입니다.

이러한 마지막 가능성은 마이크로 프론트엔드 간의 결합을 낮출 수 있도록 하여 각 마이크로 프론트엔드가 독립적으로 관리되고 프론트엔드를 위한 마이크로서비스의 구조와 패턴을 재현할 수 있도록 합니다.

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

![Micro-Frontend 구현 도전 과제 극복](/assets/img/OvercomingtheImplementationChallengesofMicro-Frontends_3.png)

# 마이크로 프론트엔드 명령 실행

마이크로서비스와 마찬가지로 사용자가 행동을 일으키는 일이 마이크로 프론트엔드에서도 발생합니다. 그러나 이 경우에는 더 강렬해질 수 있으며, 우리가 마이크로서비스에서 보았던 자연스러운 경계가 흐릿해질 수 있습니다.

이는 POST/PUT/DELETE REST 명령이 아니라는 것을 의미하므로, 마이크로 프론트엔드에는 이러한 명령이 없습니다. 대신 사용자가 클릭하거나 글자를 입력하거나 단어를 선택할 때마다 마이크로 프론트엔드에서 작업을 트리거하여 상태를 변경하고 도메인 이벤트를 생성합니다.

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

마이크로서비스와 달리, 이러한 이벤트들은 특별한 진입점이 필요하지 않습니다; 대신에:

반면에, 때때로 마이크로프론트엔드가 다른 마이크로프론트엔드에서 작업을 실행해야 할 필요가 있을 수 있습니다. 여기서, 데이터 조회와 마찬가지로 마이크로프론트엔드가 메모리 공간을 공유하고 이를 위한 함수를 게시할 수 있다는 사실을 활용할 수 있습니다. 이와 관련된 예로, Redux와 같은 경우, 각 액션은 마이크로프론트엔드에서 수행할 명령이 될 수 있는 액션 디스패처 자체일 수 있습니다.

또한, 이 마지막 레이어는 공유되지 않을 수 있지만, 브라우저 구성과 마이크로프론트엔드의 동작을 격리시키는 것이 매우 권장되며, 테스트와 이후 유지보수를 용이하게 합니다.

![OvercomingtheImplementationChallengesofMicro-Frontends_4](/assets/img/OvercomingtheImplementationChallengesofMicro-Frontends_4.png)

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

# 마이크로프론트엔드 도메인 이벤트 발행 및 수신

이 측면은 마이크로프론트엔드 아키텍처에서 핵심 요소입니다.

이 메커니즘은 마이크로프론트엔드 간의 결합을 풀어내어 다른 프론트엔드가 존재하는지 알 필요가 없게 하지만 그들이 최신 정보를 유지하고 기능적으로 동작할 수 있게 합니다.

또한, 전통적인 프로그래밍에서 도메인 이벤트는 의존성을 뒤집는 이상적인 방법으로, 옵저버 패턴과 유연하게 유사한 기능을 제공합니다. 따라서, 마이크로프론트엔드가 아닌 표준 프론트엔드로 프로그래밍 중이더라도 도메인 이벤트의 원칙을 검토하고 적용하는 것이 좋은 실천일 수 있습니다.

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

다음으로, 우리가 다양한 마이크로 프론트엔드를 연결하여 도메인 이벤트를 전달할 수 있는 통신 버스를 어떻게 만들 수 있는지에 대해 알아보겠습니다. 이러한 마이크로 프론트엔드 특성에 대한 이전 포인트들과 달리, 이 도메인 이벤트 버스는 의존하지 않고 연결되어야 합니다. 즉, 어플리케이션 수준에서 작동해야 하며, 이는 이제 표준화가 필요하다는 것을 의미합니다. 쿼리, 커맨드 또는 데이터베이스에서 각 마이크로 프론트엔드가 서로 다른 메커니즘을 사용할 수 있지만(권장되지는 않지만 가능합니다), 도메인 이벤트 버스에서는 이를 할 수 없습니다. 여기서 도메인 이벤트는 전역적으로 발생하여 다른 알 수 없는 마이크로 프론트엔드가 반응할 수 있도록 합니다. 이것은 의존성 역전의 일환으로, 모든 마이크로 프론트엔드가 합의하거나 함께 작업할 수 있도록 어댑터를 갖추도록 하는 표준이 필요합니다.

![이미지](/assets/img/OvercomingtheImplementationChallengesofMicro-Frontends_5.png)

마이크로 프론트엔드 간 상호 통신을 위해 도메인 이벤트 버스를 구현하는 가능한 방법은:

- 브라우저의 이벤트 사용: 클릭을 모방하는 대신, 사용자 정의 이벤트를 창에 던지면 모두가 수신할 수 있습니다.
- postMessage API 사용: 메시지를 보내고 받을 수 있으며, iframe 간에도 통신이 가능하며, 이는 마이크로 프론트엔드의 공통 측면입니다.
- Redux와 같은 라이브러리 사용: 액션은 저장소를 통해 전달되었을 때 도메인 이벤트가 될 수 있습니다.

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

다른 대안이 훨씬 더 많이 있습니다. 그저 그것들이 더 빈번하게 사용되는 것뿐입니다. 다른 방법으로는 localStorage와 같은 다른 브라우저 API를 사용할 수도 있습니다. 이는 탭 간 통신을 가능하게 합니다. 라이브러리에 관해서는 필요한 라이브러리를 사용할 수 있고, 필요하다면 사용자 정의 라이브러리를 사용해도 좋습니다. 다만 Redux가 제공하는 브라우저 도구의 장점을 고려해보세요. 이 도구는 액션 체인을 디버깅하기 쉽게 해줍니다.

# 마이크로 프론트엔드 배포

여기에서는 마이크로서비스와 마이크로프론트엔드의 운영 방식이 완전히 달라지는 매우 특별한 상황을 마주하게 됩니다.

우리가 말했던 것처럼 시작해보겠습니다:

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

배포는 자율성을 우선시해야 하며, 팀은 다른 팀을 기다리지 않고 배포할 수 있어야 합니다. 이러한 맥락에서 팀이 자체 환경을 관리하고 마이크로서비스를 독립적으로 배포하는 것이 일반적입니다. 마이크로서비스는 실행할 수 있는 머신만 있으면 됩니다. 머신이 있으면 사용할 사람에게 엔드포인트를 제공하고, 그게 전부입니다. 이를 통해 여러 응용 프로그램이 동일한 마이크로서비스를 사용할 수 있게 해줍니다. 마이크로서비스는 누가 사용할지 알 필요가 없습니다.

그래서, 마이크로 프론트엔드의 경우에는 자연적인 종속성이 역전됩니다. 이는 마이크로 프론트엔드가 자체 환경에서 실행되는 것이 아니라 브라우저에서 실행되며, 각 응용 프로그램의 요구에 따라 다른 많은 요소들과 공간을 공유하기 때문입니다. 이는 즉, 업데이트가 발생할 때 팀이 배포할 때마다 응용 프로그램을 업데이트해야 한다는 것을 의미합니다. 그러므로, DDD 전술을 유지하기 위해 다른 배포 전략을 만들어야 합니다.

마이크로 프론트엔드 배포 전략은 이러한 자연적 종속성을 역전시켜야 합니다. 이 경우, 마이크로서비스 방법론을 따르고 다음을 고려해야 합니다:

이러한 배포는 응용 프로그램에서 일어나서는 안 됩니다. 따라서 이 목표를 달성하기 위해, 마이크로 프론트엔드를 배포하려면 웹 서버(또는 CDN)에 게시하고 응용 프로그램이 시작될 때 최신 버전을 로드하도록 허용해야 합니다. 각 마이크로 프론트엔드를 자체 환경에서 로드하는 것입니다. 하지만,

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

이 과정에서 브라우저 제한 사항으로 인해 마이크로 프론트엔드에 변경 사항이 없을 경우 브라우저에서 캐시를 지원해야 하며 사용자가 콘텐츠를 매번 다시로드하는 것을 강제해서는 안 됩니다. 그러나 새로운 배포를 할 때 사용자가 로드하는 애플리케이션이 업데이트되도록 하고 싶습니다. 따라서 새로운 배포가 이루어졌는지 확인할 수 있는 서버가 필요하며 사용자의 버전을 업데이트할 수 있도록 하는 절묘한 전략이 필요합니다(팀에게는 투명하게).

아래는 이미지입니다.
![Overcoming the Implementation Challenges of Micro-Frontends](/assets/img/OvercomingtheImplementationChallengesofMicro-Frontends_6.png)

이러한 모든 것에 대한 대안은 팀이 업데이트가 있을 때마다 중앙 목록으로 이동하고 각 사용자 응용 프로그램이 수동으로 유지하는 것입니다. 그러나 이렇게 하면 병목 현상과 의존성이 발생하여 모든 팀의 작업이 늦어지게 됩니다.

# 마이크로 프론트엔드 엔드포인트 및 구성요소

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

최종적으로 다룰 문제는 아마도 마이크로프론트엔드 환경의 가장 어려우면서도 독특한 면 중 하나일 것입니다. 마이크로서비스 전술을 에뮬레이션하여 배포를 관리했을 수도 있지만, 여기에서는 완전히 새로운 도전에 직면합니다.

마이크로서비스의 영역에서 소비자의 주요 관심사는 각 경우에 어떤 엔드포인트를 사용해야 하는지 알아야 했지만, 이는 순수하게 소프트웨어 간 상호 작용이었습니다. 미학이나 사용자 경험은 고려되지 않았고, 그저 모든 소프트웨어가 액세스할 수 있는 API뿐이었습니다. 그러나 마이크로프론트엔드는 시각화가 기능만큼 중요한 소프트웨어-인간 상호 작용이 필요한 도메인으로 들어갑니다.

문제를 설명하기 위해 상품 세부 정보를 담당하는 마이크로프론트엔드를 고려해보세요. 상품 정보 페이지를 제공하며 쇼핑 카트를 추가하려는 쇼핑 카트를 위한 다른 두 마이크로프론트엔드와, 유사한 제품 옵션을 제공하려는 업셀링을 위한 다른 마이크로프론트엔드가 있습니다. 상품 마이크로프론트엔드가 다른 두 마이크로프론트엔드를 통합한다면 이상적입니다. 그러나 통합은 종종 역방향으로 이루어지며, 카트 및 업셀링 마이크로프론트엔드는 스스로를 상품 마이크로프론트엔드에 추가해야 합니다. 그러면 문제가 생깁니다. 스스로를 어디에 배치해야 하는지 어떻게 알 수 있을까요?

이러한 종류의 API와 요구 사항은 마이크로서비스에서는 없었습니다. 따라서 마이크로프론트엔드에서 이러한 자리 표시자는 다른 마이크로프론트엔드가 구성 요소를 동적으로 통합할 수 있도록 나열된 공간입니다. 이것은 의존성 역전과 우리가 추구하는 해제 결합의 적절한 사용을 요구합니다. 그러므로 한 마이크로프론트엔드는 자리 표시자를 제공하고, 다른 마이크로프론트엔드(첫 번째 마이크로프론트엔드가 모르는)는 이러한 자리 표시자를 사용하여 자체 구성 요소를 추가합니다.

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

위 예에서 설명한 대로, 제품 마이크로 프론트엔드는 제품 푸터와 제품 정보 푸터 두 가지 자리 표시자를 제공할 수 있습니다. 장바구니 마이크로 프론트엔드에서는 구매 버튼을 제품 정보 푸터 자리 표시자에 배치하고, 업셀링 마이크로 프론트엔드에서는 제품 푸터에 제공을 배치할 것입니다.

![microfrontend](/assets/img/OvercomingtheImplementationChallengesofMicro-Frontends_7.png)

중요한 고려 사항은 로딩 순서입니다. 마이크로서비스에서는 네트워크 장애와 관련하여 처리해야 할 것이 있지만, 마이크로 프론트엔드에서는 코드가 비동기적으로 로드되고 (강력히 추천됨), 의존성이 의존 항목보다 먼저 로드될 수 있습니다.

따라서, 마이크로 프론트엔드가 아직 존재하지 않는 자리 표시자에 구성 요소를 추가하려고 시도하면 실패할 수 있습니다. 다행히도 이런 문제는 쉽게 해결할 수 있습니다. 해결 방법에는 레거시 분석과 유사한 메커니즘이 포함되어 있습니다. 코드가 없으면 요소를 대기열에 추가하는 배열을 생성하거나, 로드를 조율하는 시스템을 사용하여 각 마이크로 프론트엔드가 의존성을 지정하고 로드되었을 때 알림을 받는 등의 방법이 있습니다.

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

플레이스홀더가 맥락을 제공하는 것이 중요합니다:

예를 들어, 제품 정보를 설명할 때 한 페이지에 동일한 페이지에 서로 다른 제품 세부 정보가 있을 수 있습니다. 이러한 경우에는 각 인스턴스마다 표시되는 제품 세부 정보에 대한 정보를 제공해야 합니다. React와 같은 솔루션을 사용하면 이를 context로 (가능하다면 props보다는) 구현할 수 있어서, 각 컴포넌트가 필요한 모든 관련 컨텍스트 정보에 액세스할 수 있습니다.

동적 플레이스홀더의 다른 대안으로는 구성 구성 요소 의존성 트리를 지정하는 중앙 구성을 사용하는 오케스트레이터들이 있습니다. 이러한 도구들은 시각적 미학을 더 쉽고 세분화된 것으로 만들어 주지만, 이러한 도구들은 각 팀이 모든 부분을 등록하고 유지해야 하는 병목현상을 만들어냅니다.

# 요약

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

이 기사에서는 마이크로 프론트엔드를 구성하는 모든 요소에 대해 폭넓게 살펴보았습니다. 마이크로서비스에서 이미 알고 있던 기초부터 이 아키텍처에 특화된 요소까지 모두 포함하여 일반적인 아이디어를 제공했습니다.

그러나 마이크로서비스가 거의 해결된 문제인 반면 마이크로 프론트엔드의 개념은 여전히 상대적으로 발전이 되지 않았고, 이 아키텍처는 일반 대중에게는 대체로 알려지지 않았습니다.

일반적으로 말해, 마이크로 프론트엔드를 위해 다음이 필요합니다:

- 데이터를 저장하고 액세스하는 공간. 이는 Redux와 해당 마이크로서비스에 액세스할 수 있는 전용 스토어일 수 있습니다.
- 다른 마이크로 프론트엔드에서 데이터에 액세스하는 방법, 간단한 메서드 호출부터 Redux 셀렉터와 같은 옵저버 패턴 시스템까지 다양할 수 있습니다.
- 주로 사용자로부터 나오지만 다른 마이크로 프론트엔드에서도 나올 수 있는 명령을 실행하는 시스템. 이는 Redux 디스패처일 수 있습니다.
- 다양한 마이크로 프론트엔드의 상태를 분리된 방식으로 조정하기 위한 도메인 이벤트 버스.
- 각 팀이 자체 마이크로 프론트엔드를 독립적으로 배포할 수 있도록 분리된 배포 시스템.
- 마지막으로 사용자 친화적인 뷰를 구축하기 위한 컴포넌트 및 플레이스홀더 시스템.

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

리덕스는 몇 가지 이유로 여러 번 언급되는데, 그 이유는 DDD에서 핵심적인 패턴인 애그리게이트의 속성과 일치하기 때문입니다. 이에 대해 더 알고 싶다면 아래의 글을 참고해주세요.

그리고 도메인 주도 개발(DDD)에서 기본 전략을 갖는 것이 중요한데, 최고의 기술적 설계(전술)만 있어서는 안 되며, 팀 구성이 이 설계를 지원하는지 확인하는 것도 중요합니다. 이것이 없으면 구현이 성공할 수 없습니다.

전략 측면을 보다 광범위하게 설명하는 기사를 쓰는 것이 필요하지만, DDD 내에서 마이크로 프론트엔드를 통합하는 필요성에 대한 이유는 이전 기사에서 논의되었습니다.

따라서 이 기사에서는 DDD 전술을 마이크로 프론트엔드의 생성에 어떻게 적용하고 모든 관련된 도전에 대해 개요를 제시했습니다. 이 글은 철저한 안내서가 아니라 올바르게 구축하기 위해 필요한 모든 결정을 살펴보는 초선 맛보기 역할을 합니다.

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

텍스트를 읽어 주셔서 감사합니다. 보통 나는 소프트웨어 엔지니어링을 이해하고 적용하는 방식에 대해 생각하고 개선할 수 있는 부분에 대해 고민하는 이야기를 쓰는 것을 좋아해요. 이 기사가 마음에 드셨다면 박수나 댓글을 잊지 마세요. 더 많은 통찰과 토론을 위해 제 매체에서 가장 성공적인 이야기들을 살펴보세요.
