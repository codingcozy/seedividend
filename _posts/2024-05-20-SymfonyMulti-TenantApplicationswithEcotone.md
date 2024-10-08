---
title: "Ecotone을 활용한 Symfony 다중 테넌트 애플리케이션"
description: ""
coverImage: "/assets/img/2024-05-20-SymfonyMulti-TenantApplicationswithEcotone_0.png"
date: 2024-05-20 23:21
ogImage:
  url: /assets/img/2024-05-20-SymfonyMulti-TenantApplicationswithEcotone_0.png
tag: Tech
originalTitle: "Symfony Multi-Tenant Applications with Ecotone"
link: "https://medium.com/dev-genius/symfony-multi-tenant-applications-with-ecotone-8cc15d2715e2"
isUpdated: true
---

<img src="/assets/img/2024-05-20-SymfonyMulti-TenantApplicationswithEcotone_0.png" />

비즈니스 도메인에 따라 멀티 테넌시를 어떻게 구현하는지가 달라집니다. 데이터베이스를 공유해야 할 수도 있고 완전히 격리된 별도의 데이터베이스를 필요로 할 수도 있습니다. 테넌트가 몇 개뿐인 경우도 있지만 수백 개인 경우도 있습니다. 주어진 테넌트의 성능에 대한 쿼터링 또는 성능 향상이 필요할 수 있습니다. 이 모든 것은 멀티 테넌시가 기술적인 측면 뿐만 아니라 비즈니스적인 고려 사항이기도 함을 의미합니다.

이전 기사에서는 최소한의 노력으로 Laravel 및 Ecotone을 사용하여 멀티 테넌트 시스템을 구축하는 방법에 대해 설명했습니다. 이번에는 Symfony 프레임워크에 대해 동일한 작업을 수행할 것입니다.

이 기사의 시나리오는 각 섹션의 끝에 연결된 데모와 함께 제시될 것입니다. 이렇게 하면 예제를 논의할 뿐만 아니라 실행 가능한 데모를 참고할 수도 있게 됩니다.

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

# 테넌트별 데이터베이스로 메시지 전송

만약 전자 상거래 도메인에서 활동 중이고 각각이 별도의 데이터베이스를 가지고 있는 두 개의 테넌트가 있다고 가정합시다(DB per Tenant 전략).
E-커머스 시스템에서 가장 먼저 발생해야 하는 것은 새로운 고객 등록이며, 이것에 대해 지금 집중하겠습니다.

새로운 고객을 등록하는 과정은 다음과 같이 진행됩니다:

![이미지](/assets/img/2024-05-20-SymfonyMulti-TenantApplicationswithEcotone_1.png)

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

우리는 Command Handler로 등록 고객 Command Message를 보낼 것입니다.

Command Bus를 사용하여 Command Handler에 등록 고객 Command를 보내서 새로운 고객을 데이터베이스에 저장할 것입니다. 중요한 부분은 주어진 테넌트와 관련된 데이터베이스에 고객을 저장하려고 한다는 것입니다.

시작하기 위해 Symfony용 Ecotone을 설치해 봅시다:

이를 통해 Ecotone의 Symfony 통합 및 데이터베이스 지원 도구를 제공받을 수 있습니다.

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

# 테넌트에 대한 연결 매핑

우리는 예제로 Doctrine ORM을 사용할 것입니다. 각 테넌트는 자체 데이터베이스 연결을 갖게 될 것이므로, 먼저 각 테넌트에 대한 Doctrine 구성을 정의해야합니다(doctrine.yaml).

연결이 정의되면, 이제 어떻게 테넌트 이름에 매핑될지 설정할 수 있습니다. Ecotone의 ServiceContext 속성으로 표시된 구성 방법을 사용하여 수행합니다.

이것이 기본적으로 전부입니다. Ecotone은 이제 지정된 테넌트 이름이 지정된 연결에 매핑되는 방법을 알게 됩니다. 따라서 어떤 종류의 메시지(명령/쿼리/이벤트)를 보내면 어떤 연결을 사용해야 하는지 알 수 있습니다.

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

# Multi-Tenant Command Handler

우리는 다중 테넌트 시스템에 Ecotone의 CQRS를 사용할 것입니다. 이를 통해 다중 테넌트 시스템에서 사용할 수 있는 다양한 기본 기능을 제공받습니다.

우리의 Register Customer Command Handler를 정의해봅시다:

Command Handler를 보면 특별한 것이 없는 것을 알 수 있습니다. PHP 속성으로 표시된 비즈니스 로직을 수행하는 메서드일 뿐입니다. 우리의 Command Handler는 Command Class를 가져와 Doctrine ORM을 사용하여 고객을 저장합니다. 이 코드는 단일 테넌트 환경에서도 문제없이 작동할 것입니다.

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

그러나 꼼꼼한 부분은 특정 Tenant에 대한 ObjectManager/EntityManager를 사용해야 한다는 것입니다. 각 Tenant마다 자체 데이터베이스 연결이 있기 때문입니다. #[MultiTenantObjectManager] 속성을 추가함으로써 Ecotone에게 현재 활성화된 Tenant에 대한 ObjectManager를 주입하도록 알려줍니다. 이렇게 하면 고객을 올바른 Tenant의 데이터베이스에 저장하고 코드를 Multi-Tenancy에 대해 직관적으로 유지할 수 있습니다.

이제 RegisterCustomer Command Class를 정의해봅시다:

Command Class는 간단한 POPO (Plain Old PHP Object)이며 특정 프레임워크 클래스를 확장하거나 구현하지 않습니다. Command에는 고객 등록에 필요한 모든 데이터가 포함되어 있습니다.

# Multi-Tenant Message Bus

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

우리 코드베이스에 Command Handler를 소개한 후에는 이제 주어진 테넌트에 대해 Command를 보낼 수 있습니다.
우리는 주어진 테넌트의 문맥에서 주어진 Command를 실행할 것입니다:

여기서는 Command를 Command Bus를 통해 보내고 메타데이터 (메시지 헤더)를 사용하여 테넌트 이름을 전달합니다. 이렇게 하면 Ecotone이 해당 Command Handler를 주어진 테넌트의 데이터베이스 context에서 수행하고 있다는 것을 이해할 것입니다. 일반적으로 HTTP 도메인 또는 사용자 세션을 기반으로 여기서 테넌트 이름을 해결할 것입니다.

이것이 말 그대로 다중 테넌트 환경에서 고객을 저장하는 데 필요한 모든 것입니다. 기본적으로 우리의 코드는 단일 테넌트 또는 다중 테넌트 모두에 대해 작동할 것입니다. 다중 테넌시에 완전히 중립적이기 때문입니다. 이제 우리의 다중 테넌트 시스템에서 필요할 수 있는 더 많은 시나리오를 확인해 봅시다.

데모 구현은 이 링크에서 찾을 수 있습니다.

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

# 공유 및 다중 데이터베이스 테넌트

기본적으로 우리는 각 테넌트를 동일한 데이터베이스에 넣지만, 고객이 프리미엄을 구매하면 별도의 데이터베이스 인스턴스를 받게되는 비즈니스 모델을 가질 수 있습니다.

이러한 경우를 처리하기 위해 Ecotone은 기본 연결을 제공합니다. 따라서 주어진 테넌트 이름에 대한 매핑이 없는 경우 기본값이 사용됩니다:

# 메시지 핸들러에서 현재 테넌트에 액세스하기

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

특정 시나리오에서는 실행이 수행되는 테넌트의 맥락을 인식해야 할 수도 있습니다. 예를 들어, 특정 테넌트가 고급 상점을 가지고 있을 때는 주문 후 즉시 배송이 이뤄져야 하지만, 다른 테넌트에게는 시간이 중요하지 않을 수도 있습니다.

Ecotone의 경우, 메시지 헤더(메타데이터)를 통해 전송하는 모든 것은 메시지 핸들러 수준에서 접근할 수 있습니다. 따라서 필요에 따라 특정 메타데이터를 무시하거나 접근할 수 있습니다. 그리고 메시지 헤더를 통해 테넌트 이름을 전송하므로 필요한 경우 이를 접근할 수 있습니다:

헤더 속성은 접근하려는 메시지 헤더를 나타냅니다. 우리의 경우, 우리가 이전에 커맨드 버스를 통해 전송한 테넌트 헤더에 접근하려고 합니다.

# 테넌트 전환에 연결하기

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

이미 멀티 테넌트 애플리케이션이 실행 중이라면, 사용자 정의 라이브러리나 통합을 사용하고 있을 가능성이 높습니다. 이러한 경우 특정 테넌트가 활성화되거나 비활성화될 때 일부 코드를 트리거해야 할 수도 있습니다.

Ecotone은 테넌트 전환 프로세스에 훅을 걸 수 있는 가능성을 엽니다. 여기에서 활성화될 Connection과 테넌트 이름을 제공할 수 있습니다.

활성화할 메소드를 OnTenantActivation 또는 OnTenantDeactivation으로 표시하기만 하면 되며, 지정된 메소드는 트리거될 것이며 이에 따라 작업이 수행됩니다. 이 방법으로 특정 어트리뷰트로 메소드를 표시함으로써, 흐름에 훅을 걸고 필요한 로직을 수행할 수 있습니다.

데모 구현은 다음 링크에서 찾을 수 있습니다.

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

# 이벤트 및 테넌트 전파

고객이 등록되면 환영 메시지가 포함된 이메일을 보내는 등 부수 효과를 발생시키고 싶을 수 있습니다. 이러한 상황에서는 이벤트 및 이벤트 핸들러를 정의할 수 있습니다.

고객이 등록되면 Event Bus를 사용하여 CustomerWasRegistered 이벤트 메시지를 발행합니다. 그런 다음 구독하는 이벤트 핸들러에 대한 모든 메서드(첫 번째 매개변수는 구독하는 이벤트를 지정)가 실행됩니다.

Ecotone을 사용하면 이벤트 핸들러에서 테넌트 메시지 헤더에 액세스할 수 있습니다. 이는 Ecotone의 메타데이터 전파 기능 덕분에 가능합니다.

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

아래 링크에서 데모 구현을 찾을 수 있습니다.

# 컨텍스트 및 메타데이터 전파

Ecotone은 기본적으로 모든 메시지 헤더를 자동으로 전파합니다. 이를 통해 컨텍스트인 테넌트를 보존합니다. 우리의 경우, 고객 등록이 진행된 테넌트의 컨텍스트에서 알림을 보낼 것입니다:

![이미지](/assets/img/2024-05-20-SymfonyMulti-TenantApplicationswithEcotone_2.png)

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

메타데이터는 명령에서 발행된 이벤트로 자동 전파됩니다.

물론 우리는 Event Handlers에서 또한 테넌트 이름에 접근할 수 있습니다.

## 비동기 이벤트

우리는 기본적으로 이벤트 핸들러를 동기적으로 실행할 수 있지만 비동기적으로 실행할 수도 있습니다. Ecotone은 RabbitMQ, Redis, Database 채널과 같은 비동기 처리를 위한 통합 세트를 제공하며 Symfony Messenger Transport를 사용할 수도 있습니다.

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

우리는 데이터베이스 채널을 사용하려고 합니다. 이는 주어진 테넌트의 메시지를 해당 테넌트의 데이터베이스에 저장할 것으로 기대됩니다. 이를 위해 Ecotone의 데이터베이스 메시지 채널을 사용할 것입니다. 이는 멀티 테넌시를 지원하기 때문에 사용합니다.

![Image](/assets/img/2024-05-20-SymfonyMulti-TenantApplicationswithEcotone_3.png)

이제 이벤트 핸들러를 비동기적으로 처리하도록 표시해 봅시다.

해당 이벤트 핸들러는 이제 비동기적으로(백그라운드에서) 처리된다는 것을 의미하고, 이벤트 메시지는 "notifications" 메시지 채널로 전송될 것입니다. 그래서 이 채널을 데이터베이스 큐로 정의합시다:

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

해당 이벤트 핸들러를 비동기로 구성하는 데 필요한 모든 작업은 여기까지입니다. 이제 이벤트 핸들러가 실행될 때마다 이벤트 메시지가 주어진 테넌트의 데이터베이스 대기열로 먼저 이동한 다음 비동기적으로 소비될 것입니다.

# 비동기 메시지 소비자 실행

비동기 메시지 채널(우리 경우 데이터베이스 대기열)에 메시지를 발행하면 이를 소비해야 합니다.
메시지 소비자를 실행하기 위해 내장된 콘솔 명령 "ecotone:run"을 사용할 것입니다:

이 명령은 "notifications" 채널로 오는 메시지를 가져와 실행하는 별도의 메시지 소비 프로세스가 실행될 것입니다.

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

여러 테넌트 환경에서 운영 중이며 우리의 "알림"은 데이터베이스 큐입니다. 이는 각 테넌트마다 별도의 대기열을 가진 별도의 데이터베이스가 있음을 실제로 의미합니다. 이것은 소비 과정에서 고려되어야 합니다.

작업 중인 비즈니스 도메인에 따라 수백 개의 테넌트가 있을 수 있으므로 수백 개의 메시지 소비자를 실행하는 것이 이상적이라고는 할 수 없습니다. 이러한 상황에서 Ecotone은 기본적으로 라운드로빈 전략을 사용하여 단일 프로세스를 사용하여 수용합니다. 이는 각 테넌트에서 순서대로 가져올 것을 의미합니다:

![이미지](/assets/img/2024-05-20-SymfonyMulti-TenantApplicationswithEcotone_4.png)

Ecotone은 다중 테넌트에서 메시지를 소비하는 데 라운드 로빈 전략을 사용합니다.

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

이 방법으로 소비하는 것은 즉시 작동합니다. 이를 실현하기 위해 고객 구성을 할 필요가 없습니다. 메시지 소비 속도를 높이고 싶다면 해당 프로세스를 여러 개 실행할 수 있습니다.
사실, 우리는 특정 프리미엄 테넌트의 메시지 소비 속도를 높이거나, 많은 메시지를 생성하는 테넌트의 제어를 가져가서 전체 프로세스를 관리할 수 있습니다. 그러나 이 부분은 별도의 기사에서 탐구할 것입니다.

데모 구현은 이 링크에서 찾을 수 있습니다.

# 데이터베이스 트랜잭션 및 아웃박스 패턴

시스템을 장애에 강하게 만들기 위해 데이터베이스 트랜잭션을 활성화하고 싶을 수 있습니다. 물론 우리의 경우에는 트랜잭션을 지정된 테넌트의 데이터베이스에 대해 시작하길 원할 것입니다.

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

<img src="/assets/img/2024-05-20-SymfonyMulti-TenantApplicationswithEcotone_5.png" />

Command Bus가 실행될 때 자동으로 데이터베이스 트랜잭션이 시작됩니다.

우리가 Command를 실행할 때 Ecotone은 올바른 테넌트 데이터베이스를 자동으로 시작하기 위해 데이터베이스 트랜잭션을 시작합니다. 이것은 Symfony Starter와 함께 설치된 Dbal Module에서 사용 가능한 기능으로, 추가 구성이 필요하지 않습니다. 트랜잭션을 구성하는 방법에 대해 더 알고 싶다면 문서를 참조해 주세요.

이벤트를 데이터베이스 큐로 비동기적으로 발행할 때 이 역시 트랜잭션으로 처리됩니다. 이렇게 함으로써 예외가 발생한 경우 모든 과정이 함께 롤백될 것임을 확신할 수 있습니다.

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

![SymfonyMulti-TenantApplicationswithEcotone_6](/assets/img/2024-05-20-SymfonyMulti-TenantApplicationswithEcotone_6.png)

이 작업은 Multi-Tenant 시스템에서 Outbox 패턴으로 작동합니다. 이외에도 Ecotone은 메시지가 데이터베이스에서 메시지 브로커(예: RabbitMQ, Redis, SQS)로 자동으로 이동될 수 있는 결합된 메시지 채널을 제공합니다. 이렇게 하면 메시지 처리가 메시지 브로커 소비자(그리고 그것들을 확장할 수 있음)를 위해 이루어지고, 데이터베이스 소비자가 아닙니다.

# Dbal Business Methods

Dbal 모듈은 Business Interface를 제공하는데, 이는 추상화된 형태로 감춰진 데이터베이스 쿼리를 쉽게 작성할 수 있는 방법입니다.

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

우리는 이루고 싶은 것의 인터페이스를 정의하고 Ecotone이 해결방안을 처리합니다. 이것은 우리가 해야 할 일은 인터페이스를 작성하는 것뿐이며 구현은 제공되며 의존성 컨테이너에 등록될 것임을 의미합니다.
비즈니스 인터페이스는 메시지 핸들러(Command/Query/Event Handlers)에서 호출될 때 자동으로 테넌트의 연결을 상속받습니다.

더 많은 정보를 알고 싶다면 Dbal을 기반으로 한 비즈니스 인터페이스 사용에 대한 이 기사를 읽어보세요.

# 명령을 직접 모델로 보내기

Ecotone은 명령을 우리의 Doctrine ORM Entity에 직접 보내는 것을 지원합니다. 이 방법으로는 어떤 위임 수준의 코드도 작성할 필요가 없습니다.
물론, 이는 멀티 테넌시와 함께도 작동합니다:

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

위의 예시에서 보듯이 정적 팩토리 메서드를 생성했습니다. 이 방법으로 Ecotone에게 이 팩토리 메서드 "register"가 새로운 고객을 생성한다고 알려줍니다. 이 메서드가 실행된 후, Ecotone은 해당 테넌트에 대해 EntityManager를 사용하여 올바른 데이터베이스에 저장합니다.
이것은 더 이상 이와 같은 코드를 작성할 필요가 없다는 것을 의미합니다:

컨트롤러 측에서는 아무 것도 바뀌지 않고 이전과 똑같이 보냅니다:

중요한 점은 이것이 Action 기반 메서드에 대해서도 작동하며, 일부 시나리오에서 Command 클래스를 완전히 없앨 수 있게 합니다:

그리고 다음과 같이 Command Bus를 실행할 수 있습니다:

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

metadata를 통해 aggregate.id를 전달하여 어떤 Customer 인스턴스에서 메서드를 실행할지를 나타낼 수 있습니다. 이 주제에 대해 더 알아보려면 Doctrine ORM을 Aggregate로 사용하는 방법에 대해 이 기사에서 읽을 수 있습니다.

데모 구현은 이 링크에서 찾을 수 있습니다.

# 이벤트 소싱

시스템에서 다른 뷰를 구축하거나 변경 사항을 감사하는 경우, Event Sourcing을 사용할 수 있습니다.

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

Ecotone는 다양한 테넌트 시스템을 위해 프로덕션에 적합한 이벤트 소싱 애플리케이션을 신속하게 구현할 수 있는 완전한 이벤트 소싱 지원이 제공됩니다.

이 프로세스는 이전에 살펴본 Doctrine ORM 집합체와 동일하게 작동합니다. 차이점은 이벤트 소싱된 집합체가 내부 상태를 변경하는 대신 이벤트 클래스를 반환한다는 것입니다.

## Auto-Setup

물론, 각 테넌트의 이벤트를 저장할 곳이 필요한데, 이를 위해 테넌트의 데이터베이스에 이벤트 저장소를 사용합니다.

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

에코톤은 이벤트의 직렬화와 역직렬화, 주어진 테넌트 데이터베이스에 이벤트 스토어 설정(포스트그레SQL, MySQL, MariaDB에 내장된 지원) 및 리드 모델 프로젝션 설정을 도와줍니다.

## 리드 모델 프로젝션

프로젝션은 이벤트에서 다양한 뷰를 만드는 데 사용됩니다. 각 프로젝션은 데이터베이스의 별도의 테이블이나 테이블 세트일 수 있으며 동적으로 생성됩니다:

이벤트가 발행되면 관련 프로젝션이 트리거됩니다. 메타데이터에 기반하여 에코톤은 어떤 테넌트와 관련이 있는지 이해하고 이전에 발생하지 않은 경우 프로젝션을 초기화할 것입니다.
초기화 후 우리 프로젝션의 이벤트 핸들러가 트리거됩니다:

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

기본적으로 모든 작업은 동기적으로 발생하며, 이는 이벤트 소싱을 작업하기 매우 쉽게 만듭니다. 필요한 경우 프로젝션을 비동기적으로 실행하도록 전환할 수도 있습니다.

더 많은 내용을 알고 싶다면 문서를 참조하세요. 이벤트 소싱 주제에 대해 더 탐구하고 싶다면 데모 구현은 다음 링크에서 찾을 수 있습니다.

# 요약

이 문서에서는 미리 계획된 코드를 사용하여 Multi-Tenant 친화적인 Symfony 애플리케이션을 구축하는 방법을 활성화했습니다. 이 방식을 통해 우리가 작성한 코드는 어떠한 변경 없이도 단일 테넌트 및 멀티 테넌트 환경에서 작동할 수 있어 애플리케이션을 쉽게 구축하고 유지할 수 있습니다. Ecotone은 컨텍스트 전파를 처리해 줍니다. 따라서 코드가 동기적인지 비동기적인지에 상관없이 작업이 실행되는 테넌트의 컨택스트가 우리를 위해 유지됩니다.

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

비동기 처리와 백그라운드 작업을 시작하게 되면 더 정교한 큐 기반 솔루션이 필요할 수 있습니다. 메시지를 너무 많이 생성하는 테넌트의 처리량을 제어하고, "프리미엄" 테넌트의 처리 속도를 높이며, 쉽게 작업할 수 있는 방식으로 실패 및 재시도를 처리하고자 할 때 이러한 문제가 발생할 수 있습니다. Ecotone은 이를 제공하지만, 이 주제는 별도의 글이 필요합니다.
