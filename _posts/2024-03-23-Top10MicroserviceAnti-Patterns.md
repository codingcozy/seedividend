---
title: "micro service 안티패턴 10가지와 해결하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Top 10 Microservice Anti-Patterns"
link: "https://blog.bitsrc.io/10-microservice-anti-patterns-278bcb7f385d"
isUpdated: true
---

## 10가지 흔한 안티 패턴 및 그 회피 방법

# 소개

잘 구축된 마이크로서비스 아키텍처 기반 애플리케이션은 확장 가능하고 유연하며 대부분의 문제에 강건하여 시간의 시험을 견딜 수 있습니다.

이것이 말하고자 하는 바는 마이크로서비스 아키텍처가 실패하고 효과적이지 못해지는 방법이 항상 있을 수 있다는 것입니다.

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

이 기사에서는 마이크로서비스 기반 아키텍처 내에서 문제점을 가져올 수 있는 가장 일반적인 안티패턴 또는 디자인 패턴을 살펴볼 것입니다.

# 1. 마이크로서비스에서의 모놀리스

마이크로서비스를 구축하려고 하는데 모놀리스 아키텍처를 보존하려고 하면 확장성, 장애 허용성 및 더 많은 문제에 직면하게 됩니다. 이는 주로 다음과 같은 이유로 발생합니다:

- 공유 데이터베이스: 마이크로서비스를 구축할 때 서비스마다 데이터베이스를 따로 두는 것이 좋은 아이디어입니다. 이렇게 함으로써 데이터베이스 유형, 스키마 규칙, 서비스별 IOPS 용량을 조절할 수 있어 스케일링에 대한 미세한 제어가 가능합니다. 그러나 모든 서비스에 대해 단일 데이터베이스를 사용하면 애플리케이션을 성장시키는 것이 어려워집니다.
- 복잡한 배포: 더 작은 서비스로 분해되었지만 배포 프로세스는 여전히 복잡하며 시간이 많이 소요되며, 여러 팀 간의 협조와 수동 참여가 필요합니다. 이는 마이크로서비스를 구현했을 때 얻은 민첩성과 유연성을 제한합니다.
- 충분하지 못한 서비스 경계: 명확히 지정되지 않은 서비스 경계는 중복 기능과 명확하지 않은 소유자 관계로 이어질 수 있습니다. 이는 업무 중복과 아키텍처를 제어하고 개선하기 어렵게 만들 수 있습니다.

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

그러니까, 마이크로서비스에서 모놀리스를 피하기 위해서는 도메인 주도 설계를 통해 마이크로서비스마다 단일 데이터베이스를 사용하고 명확한 소유권을 정의하는 것을 추천합니다.

## 2. 수다쟁이 마이크로서비스

마이크로서비스의 특성 상 서로가 분리되어 있기 때문에 애플리케이션의 작업을 처리하기 위해 서로 통신하는 경우가 많습니다. 통신은 중요하지만, 마이크로서비스 간의 지나친 대화 또는 비효율적인 대화는 효율성을 떨어뜨릴 수 있습니다.

효율성을 현저히 감소시킬 수 있는 몇 가지 시나리오를 살펴봅시다.

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

- 자주 발생하는 인터 서비스 통신: 시스템 내의 마이크로서비스가 작은 작업을 수행하거나 작은 양의 데이터를 얻기 위해 다른 마이크로서비스로 많은 수의 요청을 보내는 경우. 이는 대규모의 네트워크 트래픽을 생성하고 응답 지연을 증가시킬 수 있습니다.
- 세밀한 API: 마이크로서비스는 세밀한 API를 제공하며, 단일 사용자 요청이나 비즈니스트랜잭션을 완료하기 위해 많은 호출이 필요한 경우가 있습니다. 각 호출마다 직렬화, 네트워크 오버헤드, 심지어 블로킹 I/O 작업이 필요할 수 있어 성능 문제가 발생할 수 있습니다.
- 호출의 연쇄: 단일 사용자 요청이나 트랜잭션이 여러 마이크로서비스 사이에서 일련의 호출을 발생시키며, 각 서비스는 다른 서비스가 처리를 완료하기 위해 서로 의존합니다. 이는 한 서비스의 실패 또는 지연이 다른 서비스로 전파되어 시스템 전체의 악화로 이어질 수 있습니다.

따라서 이 문제를 피하려면 서비스가 분리되어 더 확장 가능하도록 아키텍처를 설계해야 합니다. 아마존 SQS, 아마존 SNS 및 아마존 이벤트브릿지와 같은 서비스를 활용하여 메시지 대기열, 이벤트 버스 또는 이벤트 토픽을 도입할 수 있습니다.

주문 승인 마이크로서비스가 발송, 재고 및 알림 마이크로서비스와 통신하는 것을 확인할 수 있습니다. 그러나 이러한 서비스들과 직접 통신하지 않습니다. 대신, 통신 동작을 분리하기 위해 SQS와 SNS와 같은 중계 서비스를 사용합니다.

# 3. 분산 단일체

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

이 안티 패턴은 분산 시스템으로 설계되고 구현된 애플리케이션에 적용되며, 여러 연결된 구성 요소나 서비스로 구성되어 서로 강하게 결합되어 있어 미크로서비스가 실제 독립성이 없는 상태를 가리킵니다.

이 안티 패턴의 주요 특성 중 일부는 다음과 같습니다:

- 서비스 자율성 부족: 분산 시스템의 각 구성 요소는 완전한 자율성이 부족하며 작동을 위해 다른 구성 요소에 많이 의존합니다. 이러한 독립성 부족으로 인해 요소를 독립적으로 확장, 배포 및 발전시키는 것이 어려워집니다.
- 복잡한 상호의존성: 분산 시스템의 구성 요소는 복잡한 상호의존성을 가지며, 한 요소가 올바르게 기능하기 위해 다수의 다른 요소에 의존합니다. 이는 관리하고 이해하기 어려운 관계망을 초래하여 복잡성과 위험을 증가시킵니다.
- 공유 상태: 분산 시스템의 구성 요소는 공유 데이터나 상태를 직접 공유하며, 공유 데이터는 공유 데이터베이스, 캐시 또는 직접 통신을 통해 전달될 수 있습니다. 이러한 공유 상태는 데이터 일관성 문제, 경합 조건 및 확장 어려움을 초래할 수 있습니다.

예를 들어, 다음과 같은 아키텍처를 고려해 보겠습니다:

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

<img src="/assets/img/Top-10-Microservice-Anti-Patterns_0.png" />

세 가지 서비스를 호출하고 있어요 — OrderService, PaymenrService 및 InvoiceService. 이 세 가지 서비스는 독립적으로 작동하도록 만들어졌지만, 이렇게 호출을 연쇄시키면 이 서비스들을 이 하나의 작업에 결합시키는 문제가 발생합니다. 이렇게 함으로써 선형 확장과 불필요한 상호 의존성을 만들어내게 됩니다.

다시 말하지만, SNS, SQS와 같은 서비스를 사용하여 마이크로서비스 간의 결합을 없앨 수 있습니다.

# 4. 너무 많은 마이크로서비스

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

마이크로서비스 기반 아키텍처를 디자인할 때 가장 흔한 오해 중 하나는 각 기능을 마이크로서비스로 분리하는 것; 심지어 가장 간단한 기능조차!

이는 필요하지 않은 곳에 마이크로서비스를 도입하고 필요 이상으로 이를 추구하여 애플리케이션 전체 성능에 악영향을 줄 수 있습니다. Domain-Driven Design 원칙을 따르면서 필수적인 요소에만 마이크로서비스를 나누는 것이 중요합니다.

"과도한 마이크로서비스" 안티패턴의 주요 특징은 다음과 같습니다:

- 과도한 조각화: 시스템이 상당 수의 마이크로서비스로 분할되어, 수십 개 또는 수백 개의 서비스로 이어질 수 있습니다. 각 마이크로서비스는 기능의 작은 부분만 캡슐화할 수 있으며, 이로 인해 너무 세분화된 분해가 될 수 있습니다.
- 낮은 응집도: 개별 마이크로서비스에 일관성이 부족하며, 이는 논리적으로 관련된 또는 일치하는 기능 집합이 포함되지 않을 수 있음을 의미합니다. 이는 흩어지고 조각난 비즈니스 로직을 야기하여 시스템 전체를 이해하고 관리하기 어렵게 만들 수 있습니다.
- 높은 결합도: 마이크로서비스로 분할되었음에도 불구하고 서비스 간 상호작용과 상호의존으로 인해 서비스들이 꽤 밀접하게 결합될 수 있습니다. 한 마이크로서비스의 변경으로 많은 다른 마이크로서비스에 변경이 필요할 수 있으며, 복잡성과 위험이 증가할 수 있습니다.

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

이 문제를 해결하는 한 가지 방법은 도메인 주도 설계(Domain Driven Design)를 마이크로서비스에 도입하고 앱의 특정 도메인을 위한 마이크로서비스를 만드는 것입니다. DDD에 대한 자세한 안내는 여기를 확인해보세요:

### 5. 단일 책임 원칙 위반

![이미지](/assets/img/Top-10-Microservice-Anti-Patterns_1.png)

이것은 객체지향 설계에서 함수의 책임의 기본적인 위반이다. 이것은 단일 함수 또는 마이크로서비스가 여러 책임이나 관심사를 담당하고 있을 때 발생한다. 예를 들어, 결제 처리 마이크로서비스가 사용자 등록도 처리하는 경우입니다.

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

이 메시지는 코드 구조를 꼬이게 만드는 일부 시나리오를 살펴보려 합니다:

- 디자인 원칙 인식 부족: 개발자들이 단일 책임 원칙(SRP)과 같은 디자인 개념을 완전히 이해하지 못하거나 낮설게 느낄 수 있습니다. 또는 코드베이스 내에서 애플리케이션을 우선순위에 두지 못할 수도 있습니다.
- 불충분한 계획: 소프트웨어 디자인 초기 단계에서 충분한 계획이나 분석이 이루어지지 않으면 구성 요소에 대한 임무를 명확히 할 수 없어지고, 동일한 구성 요소 내에서 여러 가지 관심사가 섞일 수 있습니다.
- 요구 사항 오인: 요구 사항을 오해하거나 오인할 경우 구성 요소 내에 불필요하거나 관련 없는 기능이 도입될 수 있으며, 이는 단일 책임 원칙(SRP) 위반으로 이어질 수 있습니다.

# 6. 스파게티 아키텍처

일부 안티패턴은 직관적으로 보이는데, 그 중 하나가 스파게티 아키텍처입니다. 스파게티 아키텍처는 명확한 구조와 조직이 부족하여 서로 얽힌 구성 요소, 모듈 또는 레이어의 엉키는 혼란으로 이어지는 소프트웨어 아키텍처를 가리킵니다.

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

“스파게티 아키텍처” 안티 패턴의 주요 특성은 다음과 같습니다:

- 역할 분리의 부재: 아키텍처가 업무 논리, 프레젠테이션 논리, 데이터 액세스 논리 및 기타 기능을 동일한 구성 요소 또는 모듈 내에서 섞어놓기 때문에 서로 다른 역할이나 책임을 분리하지 못합니다.
- 복잡한 제어 흐름: 아키텍처의 제어 흐름이 복잡하고 얽힌 상태로, 구성 요소 간의 의존성 및 상호 작용이 추적하거나 이해하기 어려울 수 있습니다. 이는 예측할 수 없는 동작 및 의도하지 않은 결과를 낳을 수 있습니다.
- 높은 결합도: 앞서 살펴본 것과 유사하게, 아키텍처 내의 구성 요소나 모듈들이 긴밀하게 연결되어 서로에게 매우 의존적입니다. 한 구성 요소에 대한 변경이 때때로 다른 여러 구성 요소에 대한 변경을 필요로 하며, 시스템 전체에 파급효과를 일으킬 수 있습니다.

# 7. 분산 데이터 불일치

이는 데이터가 여러 노드나 서비스에 복제되어 있고, 이러한 복제본들 간의 업데이트의 지연 또는 실패로 인해 일관성이 깨져서 서로 다른 부분에서 접근되는 부정확하거나 오래된 정보로 이어지는 상황을 말합니다. 결과적으로 부정확한 동작, 데이터 손상 또는 무결성 위반이 발생할 수 있습니다.

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

"Distributed Data Inconsistency" 앤티 패턴의 주요 특징은 다음과 같습니다:

- 비동기 업데이트: 데이터 업데이트가 분산 시스템의 복제본 또는 노드 전체에 비동기적으로 전파됩니다. 이는 변경 사항을 실행한 후에도 모든 데이터 사본에 반영되기까지 지연이 발생할 수 있습니다.
- 네트워크 분할: 예기치 못한 이유로 네트워크 분할이나 장애가 발생할 수 있어 모든 복제본으로 업데이트가 전파되지 못하거나 불완전한 업데이트로 인해 복제본 간 불일치가 발생할 수 있습니다.
- 상충되는 작업: 여러 노드에서 동시에 동일한 데이터에 대해 동시 작업이 발생할 경우 충돌이 발생할 수 있으며 이는 적절하게 처리되지 않아 일관성이 없거나 손상된 데이터로 이어질 수 있습니다.

이러한 문제를 해결하기 위해서는 Saga Pattern과 같은 마이크로서비스 패턴을 활용하여 마이크로서비스에서 분산 트랜잭션을 생성하고 관리하는 것이 중요합니다.

# 8. 강한 결합

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

테이블 태그를 Markdown 형식으로 변경하면 다음과 같습니다.

| Anti-pattern                   |
| ------------------------------ |
| Monolithic Architecture        |
| Spaghetti Architecture         |
| God Object                     |
| Distributed Data Inconsistency |
| Vendor Lock-in                 |

# 9. 관측 능력 부족

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

응용 프로그램이 내부 상태, 작업 및 성능에 대한 충분한 통찰력을 제공하지 않는 경우가 있습니다. 개발자나 관리자가 응용 프로그램의 성능을 관찰하거나 문제를 효율적으로 해결하기가 어려워집니다.

"관찰 불가능성" 안티패턴의 주요 특징은 다음과 같습니다:

- 제한된 로깅: 시스템은 중요한 이벤트, 오류 및 발생하는 작업을 포착하기 위한 체계적인 로깅 메커니즘이 부족합니다. 실행 흐름을 추적하고 문제를 식별하는 것이 훨씬 어려워집니다.
- 부족한 지표: 시스템은 성능, 리소스 사용 및 기타 중요한 지표에 대한 유용한 메트릭 또는 텔레메트리 데이터를 제공하지 않습니다. 이 정보가 없으면 시스템의 상태를 평가하고 가능한 병목 현상이나 개선 사항을 식별하기 어렵습니다.
- 소극적인 추적: 시스템은 여러 서비스 또는 구성 요소 간의 요청 및 트랜잭션 흐름을 추적하는 데 분산 추적 능력이 없습니다. 이로 인해 성능 급등, 지연 문제 및 분산 시스템의 장애를 감지하기가 더 어려워집니다.

AWS X-Ray나 New Relic과 같은 클라우드 네이티브 도구를 사용해 보는 것을 고려해보세요.

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

이렇게 함으로써 시스템 오류에 대한 중요한 통찰을 얻고 성능 및 확장성 문제를 선제적으로 식별할 수 있습니다.

# 10. 인적 비용을 무시하는 것

이것은 기본 목표가 기술적 목표와 마감일을 충족시키는 데 중점을 둔 채 프로젝트에 참여한 팀이나 개인의 웰빙, 사기 및 업무-생활 균형에 미치는 영향을 충분히 고려하지 않는 경우입니다.

“인적 비용을 무시하는 것” 안티패턴의 주요 특징은 다음과 같습니다:

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

- 과로: 팀원들이 프로젝트 마감일을 준수하거나 예상치 못한 문제를 해결하기 위해 저녁이나 주말, 공휴일을 포함한 연장근무를 해야 하는 경우가 자주 발생합니다. 이로 인해 심리적으로 지치고 생산성이 감소할 수 있습니다.
- 비현실적인 기대: 팀의 기존 자원, 기술 능력을 고려하지 않고 프로젝트 일정과 성과물이 설정됩니다. 이는 합리적이지 않은 기대를 만들어내며 팀원들에게 쥬그리하게 느끼게 하고 타이트한 일정 하에서 실행하도록 압박을 받게 합니다.
- 세세한 관리: 관리자나 팀 리더가 팀원들의 업무에 과도한 통제나 세세한 관리를 가합니다. 이는 자율성, 창의성, 의지를 약화시킵니다.
- 지원의 부재: 업무에서 문제나 어려움을 마주했을 때, 팀원들은 관리자나 동료들로부터 지원을 받지 못한다고 느낍니다. 이는 고립감, 긴장 및 불참감을 증가시킬 수 있습니다.

# 마무리

우리는 초보적인 마이크로서비스 여정을 시작하는 조직이나 전통적인 아키텍처에서 점진적으로 개선해 가고 있는 조직에서 발견되는 일반적인 안티패턴 몇 가지를 살펴보았습니다.

그러므로 우리는 마이크로서비스 아키텍처가 확장성, 유연성, 탄력성을 가능하게 하여 의도한 대로 작동하도록 하기 위해 이러한 문제들을 피해야 합니다.

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

이 내용이 도움이 되었으면 좋겠어요.

읽어 주셔서 감사합니다!

# 더 알아보기
