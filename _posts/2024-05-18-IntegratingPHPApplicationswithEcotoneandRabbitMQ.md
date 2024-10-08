---
title: "Ecotone과 RabbitMQ를 활용한 PHP 애플리케이션 통합"
description: ""
coverImage: "/assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_0.png"
date: 2024-05-18 22:28
ogImage:
  url: /assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_0.png
tag: Tech
originalTitle: "Integrating PHP Applications with Ecotone and RabbitMQ"
link: "https://medium.com/dev-genius/integrating-php-applications-with-ecotone-and-rabbitmq-df60f93eb1db"
isUpdated: true
---

<img src="/assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_0.png" />

PHP 애플리케이션(서비스) 간의 통합은 정말 어려울 수 있습니다. 많은 것들이 망가지고 실패할 수 있는 영역으로 진입하게 됩니다. 종종 서로 다른 팀이 소유한 서로 다른 애플리케이션이라는 점이 해결을 더 어렵게 만드는데요. 이러한 통합을 만들기 위해서는 의사소통 방식에 동의해야 하며, 양쪽이 서로 이해할 수 있도록 해야 합니다.

가장 흔한 두 가지 통합 방법은 "HTTP" 또는 "Message Broker"입니다. HTTP 통합 시 고려해야 할 잠재적인 문제가 있지만, 이에 대한 논의는 이 글의 범위를 벗어납니다. 이 글에서는 Message Broker를 사용한 통합에 중점을 두고 있고, 보다 구체적으로는 RabbitMQ에 초점을 맞출 것입니다.

Message Broker를 사용한 통합은 메시징 및 경로 지정 패턴에 대한 다양한 지식이 필요하며 쉽게 복잡해질 수 있습니다. 그로 인해 종종 서비스 간의 통합이 복잡한 작업이 되어 논의가 많아지고 실패한 시도와 변경사항이 여러 번 일어나며 종종 몇 일 간이나 더 나쁜 경우에는 몇 주에 걸칠 수도 있습니다.

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

이 문제의 해결책은 더 높은 수준의 추상화에서 작업하는 데에 있습니다. 우리가 메시지 브로커에서 저수준 라우팅 패턴을 직접 처리할 필요가 없도록 충분히 높은 수준의 추상화를 사용합니다. 목표는 진입 장벽을 낮추고 통합을 쉽게 이해하고 수행할 수 있도록 하는 것입니다. 따라서 통합은 몇 시간이나 몇 분 안에 완료될 수 있습니다. 이 글의 목표는 당신에게 PHP 및 RabbitMQ를 사용하여 Ecotone을 활용하는 방법과 도구를 제공하는 것입니다.

그러나 Ecotone의 솔루션이 어디서 나왔는지 이해하려면 먼저 시스템의 논리적 부분과 물리적 부분 사이의 근본적인 차이를 이해해야 합니다.

# 시스템의 논리적 부분과 물리적 부분

우리가 서비스를 통합할 때, 우리는 시스템의 논리적 부분 또는 물리적 부분에 초점을 둘 수 있습니다.

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

- 논리 부분은 비즈니스 측면입니다. 여기에서는 "결제 서비스에서 결제가 처리되면 배송 서비스가 주문을 전달할 것"과 같은 비즈니스 개념을 사용하여 논의합니다.
- 물리 부분은 기술적 세부 정보에 관한 것입니다. 여기에서는 "소프트웨어.public.payment.order’라는 주제 기반 교환을 생성하고 'payment.ordered' 라우팅 키를 사용하여 메시지를 발행해 'order_shipping' 큐가 이에 바인딩할 수 있도록 해야 한다"와 같은 메시지 브로커 특정 개념을 사용하여 논의합니다.

우리가 작업하는 추상화 수준이 낮을수록, 논리적인 부분이 아닌 물리적인 부분에 더 많은 초점을 둘 것입니다. 이는 우리가 일을 하는데 더 많은 시간을 코드와 구성 작성, 유지 관리 및 이해에 투자할 것을 의미합니다. 이로 인해 왜 특정 작업을 수행하는지 추적하기 어려워질 수 있으며, 우리의 초점이 세부 사항에 맞추어지고 높은 수준의 그림이 아닙니다.

# Ecotone의 분산 버스

Ecotone의 각 서비스는 "shipping_service" 또는 "payment_service"라는 지정된 이름으로 배포 메커니즘에 연결됩니다.
여기서 논리적인 부분이 필요합니다. 실제로 비즈니스 경계(응용 프로그램)에 대한 명명을 정의합니다.

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

우리는 이 이름을 사용하여 Ecotone의 분산 버스를 통해 서비스 간에 통신할 것입니다. 분산 버스는 높은 수준의 추상화를 제공하여 우리가 시스템의 논리적 부분에 집중할 수 있게 해줍니다. 이전에는 메시지 브로커의 저수준 개념에 주의를 기울였던 것과 달리, 분산 버스를 사용하면 더 많은 일을 수행할 수 있습니다.

분산 버스를 사용하면 두 가지 다른 유형의 메시지인 명령(Command)과 이벤트(Event)와 함께 작동하게 됩니다. 이 둘 사이의 차이점은 중요하며, 곧 그 이유를 알게 될 것입니다.

이제 분산 버스를 통해 명령 메시지를 보내는 것으로 시작해 봅시다.

## Ecotone의 분산 메커니즘 활성화하기

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

Distributed Bus를 통해 메시지(명령 및 이벤트)를 전송하기 시작하려면 먼저 활성화해야 합니다. Ecotone의 ServiceContext 구성을 사용하여 RabbitMQ를 위해 활성화할 것입니다:

결과적으로 의존성 컨테이너에 DistributedBus가 등록되어 바로 사용할 수 있게 됩니다.

Distributed Bus로부터 메시지를 받으려면 Distributed Consumer를 활성화하고 싶습니다:

이로 인해 새로운 메시지 컨슈머(작업 프로세스)가 등록되어, "ecotone:run" 콘솔 명령을 사용하여 실행할 수 있게 됩니다. 메시지 컨슈머의 이름은 이전에 정의한 서비스 이름과 동일할 것입니다:

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

Symfony:

Laravel:

# 명령어 전송

우리가 "order_service"에서 새 주문을 처리한다고 가정해봅시다. 주문을 받은 후에는 결제를 진행하고 싶습니다. 결제를 진행하기 위해 별도의 "payment_service" 서비스를 사용할 것입니다.
특정 서비스에서 작업을 트리거하고 싶을 때는 명령어를 사용합니다.

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

만약 명령어(Command)에 대한 개념에 익숙하지 않다면, 이 문서에서 더 자세한 내용을 확인할 수 있습니다.

![Command Concept](/assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_1.png)

이제 한 번 위 다이어그램을 살펴보고 잠시 멈춰서 생각해 봅시다. 이 다이어그램에는 우리가 다음 질문에 대답하는 데 도움이 되는 두 가지 논리적인 지점이 있습니다:

- 어디로 명령을 보내고 싶은가? — 우리는 명령을 결제 서비스로 보냅니다.
- 거기서 어떤 조치를 취하고 싶은가? — 우리는 결제를 진행하기 원합니다.

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

위의 내용은 우리가 어떤 경계로 상호작용하며 어떻게 하는지를 설명하는 중요한 정보입니다.

실제로 Ecotone의 분산 버스를 사용하여 이를 가능하게 합시다:

코드는 위 다이어그램과 같은 질문에 답하므로 더 높은 수준의 관점을 이해하기 위해서는 필요하지 않습니다. 우리는 결제 서비스에 명령을 보내어 결제를 수행하는 것을 쉽게 이해할 수 있습니다.
분산 버스가 트리거되면 명령 메시지가 "payment_service"로 전송됩니다.

# 명령 수신

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

이제 Payment Service에서 명령을 받을 수 있게 되었으니, 분산 Command Handler를 등록합시다:

여기서 CommandHandler 및 Distributed 속성을 사용하여 다음을 수행합니다:

- 주어진 메서드를 CommandHandler 속성으로 표시함으로써 로컬 CommandBus에 의해 트리거될 수 있도록 합니다.
- Distributed 속성을 추가함으로써 분산 Command Handler가 DistributedBus에서도 사용 가능하도록 지정합니다.

이제 이 Command Handler는 "payment.take" 라우팅 키를 사용하여 분산 통신에 사용할 수 있습니다.
Ecotone을 사용하여 서비스 간 통신을 위해 할 일은 여기까지입니다.

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

# 명령어는 어떻게 작동합니까

저희가 RabbitMQ와 직접 통합을 작성하지는 않겠지만, 더 높은 수준의 코드에서 작업 중이므로 사실상 어떻게 작동하는지 알아두는 것이 여러분에게 도움이 될 것입니다.

명령어를 보낼 때, 사실은 서비스 이름을 라우팅 키로 하는 메시지를 보내는 것입니다:

![image](/assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_2.png)

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

Service가 소비자로서 Ecotone의 분산 메커니즘에 연결되면 자동으로 해당 서비스 이름에 의해 바인딩된 Queue가 생성됩니다:

![Queue Creation](/assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_3.png)

이것은 결제 서비스로 명령이 전송될 때 이 서비스의 Queue로 전달됨을 의미합니다.
그런 다음 결제 서비스 Queue에서 메세지가 소비되면 우리의 분산 명령 핸들러를 트리거합니다.

# 이벤트 메세지 발행

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

지금까지 명령에 대해 논의했지만, 두 번째 유형의 메시지인 이벤트 메시지도 있습니다. 이벤트는 특정 서비스에 보내는 대신 게시되며, 관심이 있는 누구나 구독할 수 있습니다. 따라서 이벤트 메시지는 여러 서비스에 전달될 수 있습니다.

이벤트 개념에 익숙하지 않다면 다음 기사에서 자세한 내용을 확인할 수 있습니다.

성공적인 결제의 결과로 주문을 고객에게 전달하려고 합니다. 결제는 "payment_service"에서 처리되고 배송은 "shipping_service"에서 이루어집니다.

우리가 이벤트 메시지를 게시할 때는 Ecotone의 분산 교환에 라우팅 키를 제공하여 메시지를 보내는 것입니다.

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

![Image](/assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_4.png)

# 이벤트 메시지 구독

분산 이벤트를 구독하는 것은 매우 간단합니다. 라우팅 키 이름과 분산 속성을 EventHandler에 제공합니다.

Ecotone은 내부적으로 우리 서비스의 큐를 주어진 라우팅 키로 바인딩합니다:

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

<img src="/assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_5.png" />

모든 작업이 명령 및 이벤트를 사용하여 통신하는 데 필요한 것은, Ecotone을 사용하는 것이 매우 직관적이며 시스템의 논리 부분에 집중하려면 이것이어야 하는 방법입니다. Ecotone 분산 모듈을 설치하는 방법은 문서 페이지에서 읽을 수 있습니다.

이제, 분산 통신을 시작할 때 자주 논의되는 몇 가지 다른 시나리오를 살펴볼 수 있습니다.

# 이벤트 비공개 유지

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

시스템은 분산 통신을 명시적으로 처리하지 않는 경우가 많습니다. 이러한 상황에서 외부 서비스는 우리의 이벤트에 단순히 바인딩되어 있으며, 때로는 우리의 통제 없이 연결될 수 있습니다. 이벤트가 노출될지 여부가 결정되지 않은 상태에서 외부 서비스가 이벤트에 바인딩되면 추적하기 힘들어집니다.

이에 따라 외부 서비스에 의해 소비되는 것이 무엇이고 어떻게 되는지 쉽게 잊어버릴 수 있으며, 명시적 서비스 경계가 퇴화될 수 있습니다:

- 우연히 다른 시스템을 손상시킴 — 다른 서비스가 우리의 내부 이벤트에 직접 바인딩될 수 있으면, 그 서비스는 우리의 이벤트를 소비하는 측이 됩니다. 이벤트 구조를 변경하면 외부 서비스가 우연히 손상될 수 있습니다.
- 현대화의 부재 — 우리의 이벤트는 공용 이벤트가 되었으므로, 우리는 더 이상 완전히 소유권을 가지지 않게 됩니다. 결과적으로 변경할 수 있는 것을 실제로 논의하고 상담해야 합니다. 이는 종종 사람들이 이벤트를 변경하려는 뜻을 내지 않게 만들어, 시간이 너무 많이 소요된다는 이유에서 그렇습니다.
- 논리적 부분 손실 — 경계를 논의하고 비즈니스 언어를 사용한 서비스 간 통신은 종종 잊혀지거나 이해하기 어려울 수 있습니다. 우리는 비즈니스 개념이 적용되지 않는 저수준 프로그래밍으로 빠지게 되는 것입니다.

반면 분산 버스를 사용하면 사항을 명확하게 처리하고 서비스 경계가 존중됩니다. 우리가 외부로 발행하고 싶은 것과 비공개로 유지하고 싶은 것을 명시적으로 명시합니다. 이러한 방식으로 팀 내 모두에게 경계의 가장자리에 무엇이 존재하고 무엇이 내부에 유지되는지 명확하게 보여줄 수 있습니다.

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

# 모든 이벤트 배포하기

기본적으로 모든 시스템은 외부로 모든 이벤트를 발행하는 여러 시스템이 있습니다. 이는 위에서 설명한 문제를 상속받기 때문에 권장되지 않지만, 이미 해당 방식으로 시스템이 작동 중이라면 필요할 수 있습니다.

레거시 시스템에서 Ecotone으로 마이그레이션할 때, 더 큰 변경을 피하기 위해 이 동작을 유지하고 싶을 수 있습니다. 이러한 상황에서는 대부분 이벤트 버스를 사용합니다. 이러한 상황에서는 현재의 이벤트 버스를 Ecotone의 이벤트 버스로 대체하여 내부적으로 이벤트를 발행할 수 있습니다.

그리고 간단히 "object"에 구독하여 모든 이벤트를 구독하여 분배할 수 있습니다:

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

객체 대신에 여기에 구현된 이벤트 집합을 전달하는 인터페이스를 사용할 수도 있습니다. 또는 이벤트 클래스의 합집합으로도 전달할 수 있습니다:

# 비공개 대 공용 이벤트

일반적으로 분산 이벤트(공용)와 단일 서비스 수준에서 처리해야 하는 이벤트(비공개) 사이의 구별을 따르는 것이 좋습니다.
이렇게 하면 내부적으로만 사용되는 이벤트를 안전하게 변경할 수 있는지 여부를 알 수 있고 변경하기 전에 특별한 주의를 요하는 이벤트를 알 수 있습니다.

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

이벤트 분배 중에 우리는 더 많은 단계를 거쳐 Public Event에 사용자 정의 구조를 제공할 수 있습니다. 이렇게 하면 내부 이벤트 구조가 외부 서비스와 완전히 분리될 것입니다.

# 분리된 메시지 클래스

어떤 프레임워크에서는 발행 및 수용 측에서 동일한 클래스를 사용해야 합니다. 즉, 이벤트나 명령을 역직렬화하려면 각 참여 서비스에서 동일한 이름과 네임스페이스를 가진 클래스가 필요합니다. 이는 서비스 간에 강력한 결합을 만들어내기 때문에 이 클래스 이름이 변경되면 쉽게 깨질 수 있습니다.

Ecotone에서는 메시지가 클래스가 아닌 라우팅을 기반으로 전달됩니다. 역직렬화해야 할 클래스는 메시지 핸들러 실행 전에 메서드의 매개변수를 기반으로 결정됩니다. 따라서 각 서비스에서 클래스 이름이 다르더라도 이를 역직렬화할 수 있습니다. 이는 더 나아 가서, 배열로 역직렬화할 수 있기 때문에 실제로 클래스를 사용할 필요가 없습니다.

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

게시 측면이 분리되는 것처럼 원하는 유형을 사용할 수 있습니다. 예를 들어, 배열:

서비스를 분리하는 방법에 대해 더 알고 싶다면, 해당 내용을 다룬 이전 기사 중 하나를 읽어보세요.

# 한 번에 더 많은 이벤트를 구독

주어진 서비스가 더 많은 이벤트를 구독할 때는 \*, 즉 별표를 사용할 수 있습니다.

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

이렇게하면 "billing." 접두사가 포함된 모든 이벤트에 등록합니다.
"billing.order_charged", "billing.refund.made"가 포함됩니다.

# 오류 모드

주어진 메시지 처리에 문제가 발생하는 경우, Ecotone은 오류 처리를 제공합니다. 오류 처리는 서비스 수준 비동기 처리와 정확히 동일하게 작동합니다.
예외가 발생하는 경우 구성에 따라 처리를 차단하거나 지연된 재시도를 사용할 수 있습니다:

![이미지](/assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_6.png)

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

딜레이 재시도가 초과되면 메시지를 삭제하거나 Dead Letter Database에 저장할 수 있습니다.

![image](/assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_7.png)

재시도와 Dead Letter에 대해 더 읽고 싶다면 문서 페이지를 확인해주세요.

## 사용자 정의 오류 메커니즘 제공

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

에러 핸들링 프로세스를 완전히 맡을 수도 있습니다. 사용자 정의 에러 채널을 정의하여:

그런 다음 서비스 활성화기를 사용하여 연결할 수 있습니다.

# 누락된 명령 핸들러

명령 라우팅 키가 실제로 변경되었거나 명령 핸들러가 단순히 삭제되었을 수 있습니다. 이러한 상황에서 메시지가 그냥 버려지거나 무시되는 것을 원치 않으며, 이는 해결해야 할 잠재적인 버그이므로 데이터를 보존해야 합니다.

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

<img src="/assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_8.png" />

서비스 이름을 통해 명령이 라우팅되기 때문에 대상 서비스로 메시지가 전달됩니다. 대상 서비스에서 라우팅이 변경되어도 Ecotone은 실패 모드를 시작하며 해당 명령을 Dead Letter에 저장합니다.

# Outbox Pattern을 사용하여 안전하게 이벤트 배포하기

메시지를 RabbitMQ로 보내고 데이터베이스에 변경 사항을 저장하는 동시에 한 번에 변경사항을 저장하면 일관되지 않은 상태에 빠질 수 있습니다. 이는 두 개의 저장소에서 동시에 변경사항을 수행하고 있기 때문에 한쪽이 실패할 수 있기 때문입니다.

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

![Image](/assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_9.png)

In the code, it would look like this:

To solve this, we can use Ecotone's inbuilt feature to send messages over the Database:

![Image](/assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_10.png)

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

먼저 에코톤(Event Bus)을 사용하여 이벤트를 내부적으로 발행할 것입니다.

각 Command Handler는 기본적으로 데이터베이스 트랜잭션으로 랩핑되므로 주문(Order)과 메시지(Message)가 함께 커밋됩니다.
그런 다음 내부 이벤트를 구독하고 분배합니다.

이벤트 핸들러가 데이터베이스에 메시지를 저장하려면 "orders"를 데이터베이스 메시지 채널로 정의해야 합니다.

더 많은 내용을 보고 싶다면, 이전 게시물 중 하나를 읽어보세요.

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

# 메타데이터 전송

명령 또는 이벤트와 함께 메타데이터를 전송하고 싶을 때가 있습니다. 이는 실행자 ID, 타임스탬프 또는 요청이 발생한 이벤트 HTTP 도메인과 같은 세부 정보일 수 있습니다.

이러한 세부 정보는 주로 메시지 처리 관점에서 중요하지 않을 수 있지만, 나중에 트리거된 감사, 디버깅 또는 사이드 이펙트와 같은 부작용을 위해 중요할 수 있습니다. 이러한 정보를 명령 또는 이벤트에 직접 넣으면 목적이 흐릿해질 수 있고 전달하기 번거로울 수 있습니다.

Ecotone은 메타데이터를 주요 역할로 취급하여 명령과 이벤트와 함께 전달되도록 하여 이 문제를 해결합니다.

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

Distributed Event Handlers로 직접 액세스할 수 있습니다.

Metadata 및 전파는 메시지 기반 시스템에서 중요하며 Ecotone은 여기에 표시된 것보다 더 많은 기능을 지원합니다. 해당 주제를 깊이 있게 탐구하고 싶다면, Laravel의 Multi-Tenant 또는 Symfony의 Multi-Tenant를 읽어보는 것을 추천합니다. 이 주제에 대해 더 자세히 설명되어 있습니다.

# 별도의 대기열 및 처리

지금까지 우리는 단일 메시지 대기열의 맥락에서 분산 메시지 처리에 대해 논의해 왔습니다. 그러나 대규모 시스템에서는 실제로 일부 메시지를 다른 것들과 별도로 또는 더 높은 우선순위로 처리하길 원할 수도 있습니다.

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

메시지 소비자를 따로 확장하려면 Taken Payments와 Failed Payments에 관련된 것을 분리할 수 있습니다. 그런 다음 이를 서로 다른 메시지 채널(큐)로 분리할 수 있습니다:

![Image](/assets/img/2024-05-18-IntegratingPHPApplicationswithEcotoneandRabbitMQ_11.png)

서비스 수준의 코드는 다음과 같이 보일 것입니다:

그런 다음 Service Context 구성을 사용하여 "taken_payments" 및 "failed_payments" 메시지 채널을 정의합니다:

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

이를 통해 우리는 결제 요청에 대한 메시지 소비자를 확장할 수 있고 실패한 지불로부터 독립적으로 처리할 수 있으며 분산 큐를 단순한 프록시로 다룰 수 있습니다.

# 개요

우리가 작업하는 코드의 수준이 낮을수록 시스템의 논리적 부분에 높은 희생을 감수해야 할 것입니다. 기술적 세부 사항에 집중할수록 비즈니스 부분에 집중하기 어려워집니다.

반면에 Ecotone은 우리에게 더 높은 수준의 추상화로 작업할 수 있는 도구를 제공하여 더 빠르게 제공하고, 덜 구성이 필요하며 비즈니스에 더 많은 초점을 둘 수 있습니다. 비즈니스 중심적인 접근은 강요되지 않아야 하며, 통합에 덜 시간을 쓰면 자연스럽게 비즈니스 부분에 초점을 맞출 것입니다. 이렇게 하면 사람들이 비즈니스 요구에 부합하는 고품질 소프트웨어를 생산할 수 있는 환경을 조성할 수 있습니다.

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

이 저장소의 분산 통신 예시 구현과 Symfony 및 Laravel로 작성된 완전한 애플리케이션 예시를 분산 버스를 통합하여 찾아 볼 수 있습니다.
