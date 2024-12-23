---
title: "Redis를 활용한 NodeJs에서 이벤트 주도 시스템 사용하기"
description: ""
coverImage: "/assets/img/2024-05-17-UsingDistributedLockingwithRedisinNodeJsinanEvent-DrivenSystem_0.png"
date: 2024-05-17 20:27
ogImage:
  url: /assets/img/2024-05-17-UsingDistributedLockingwithRedisinNodeJsinanEvent-DrivenSystem_0.png
tag: Tech
originalTitle: "Using Distributed Locking with Redis in NodeJs in an Event-Driven System"
link: "https://medium.com/@shubham.sinha2512/using-distributed-locking-with-redis-in-nodejs-in-an-event-driven-system-26f8dd4fae50"
isUpdated: true
---

<img src="/assets/img/2024-05-17-UsingDistributedLockingwithRedisinNodeJsinanEvent-DrivenSystem_0.png" />

공유 리소스를 작업할 때 분산 시스템을 다루다보면 어려움이 있을 수 있어요. 분산 락킹 개념은 일반적으로 데이터베이스, 공유 파일 시스템 및 분산 컴퓨팅 환경에서 사용됩니다.

최근에 저는 직장에서 현재 인보이스 및 결제 시스템에서 작업 중인 시스템에서 경쟁 조건 문제를 마주쳤어요. 이는 실제 결제 인보이스를 덮어쓰고 막대한 고통이 되었습니다. 결제는 실시간으로 이루어지며, 때문에 추적 가능성과 책임 추적이 중요합니다.

맥락을 이해하기 위해 프로세스 및 시스템 아키텍처에 대해 간단히 설명하겠어요. 서비스는 NodeJS로 작성되었으며 Kubernetes 클러스터에 배포되어 있으며 언제든 동일한 서비스의 여러 인스턴스가 실행됩니다. 인보이스 시스템은 단계별로 분할되어 각 이벤트에 의해 순차적으로 실행되는 유한 상태로 구성되어 있습니다. 결제 프로세스는 언제든지 어느 상태에 있을 수 있습니다. 먼저 결제해야 할 최종 금액이 계산됩니다. 그런 다음 인보이스가 생성되며, 마지막으로 해당 인보이스에 대한 결제가 즉시 이루어집니다. 어떤 결함이 있을 경우 여러 인보이스가 생성되는 것을 피하기 위해 여러 체크 및 균형이 유지되고 있지만 여전히 무언가가 잘못되고 있었습니다.

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

이 문제의 근본 원인은 여러 팟에서 송장 생성 상태를 동시에 실행했기 때문에, 이를 추적하는 것이 조금 까다로웠습니다. RabbitMQ는 메시지 패킷이 지정된 기간 내에 확인되지 않으면 재큐됩니다. 이 조건은 멀티 팟이 활성화되고 API 호출이 느릴 가능성이 높을 때 시스템에서만 발생했습니다. 상태 실행이 예상보다 오래 걸려 timeout이 발생하고 실행이 진행 중일 때 이벤트가 재큐됩니다. 부하 상태에서 API 호출이 실패하면 상태가 예외 상태로 전환되고, 상태를 다시 시도하는 새 이벤트가 대기열에 추가됩니다. 이는 대기열에 두 개 이상의 중복 이벤트가 결과로 생기게 되며, 다른 팟이 소비하면 동시 실행이 발생하여 양쪽 실행이 모두 확인을 통과하고 마지막 실행이 이전 송장을 덮어쓰지만 결제가 이미 완료된 상태에 대해 발생합니다. 다행히도, 우리는 결제 중에 결제가 성사된 경우에 대한 추가 확인 사항이 있었습니다. 휴!

나는 이 문제에 대한 해결책을 찾기 위해 연구를 시작했고, 내 첫 번째 생각은 상태에 잠금을 구현하는 것이었습니다. 그 후에 Redis를 사용한 분산 잠금 개념을 알게 되었는데, 이미 산업계에서 다양한 응용 분야에 널리 사용되고 있습니다. 그래서 표준 구현을 사용하고 우리의 필요에 맞게 적용하기로 결정했습니다. 이것이 간단하고 영리한 Redis 사용이 얼마나 강력할 수 있는지 흥미롭습니다. 기본 개념은 리소스 실행 시작 시 Redis에 키가 설정되며, 그 키는 실행이 끝날 때 지워질 수 있습니다. 키는 리소스에 고유해야 합니다. 실행 전마다 Redis에서 해당 키가 있는지 확인하여 이미 잠그인 리소스가 있으면 실행을 계속하지 말아야 합니다. 데드락을 피하려면 잠금에 만료 시간을 설정해야 하는 몇 가지 유의사항이 있습니다. 또한, 잠금 키에 대해 매번 고유한 값을 설정하고 이를 해제 시 검사하여 잠금된 리소스를 시도하는 것을 보장해야 합니다. 이러한 기능들은 모두 쉽게 구현할 수 있습니다. 더불어 분산 Redis 클러스터에 구현하는 것은 훨씬 더 까다로울 것입니다. 서로 다른 프레임워크용 많은 라이브러리가 이미 제공되고 있어 같은 기능을 제공합니다. NodeJS의 경우, 공식 권장 라이브러리는 RedLock입니다.

Redis는 다양한 용도로 확장할 수 있는 다재다능한 도구입니다.
