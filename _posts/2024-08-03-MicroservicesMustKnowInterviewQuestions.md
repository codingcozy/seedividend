---
title: "마이크로서비스 인터뷰 필수 질문 30선"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-08-03 18:46
ogImage:
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Microservices Must Know Interview Questions"
link: "https://medium.com/@mpavani667/microservices-must-know-interview-questions-442506cb4e69"
isUpdated: true
---

# 1. 마이크로서비스에서 데이터 일관성을 어떻게 다루시나요?

마이크로서비스에서 데이터 일관성을 다루는 것은 독립성과 분산 구조에도 불구하고 데이터가 서로 일치하는지 확인하는 것을 말합니다. 다음과 같은 기술이 사용됩니다:

- 최종 일관성: 데이터가 시간이 흐름에 따라 일치해야 한다고 받아들입니다. 이벤트 소싱과 CQRS(명령 쿼리 책임 분리)와 같은 메커니즘을 활용합니다.
- 분산 트랜잭션: 트랜잭션을 여러 작은 단계로 나눈 Saga 패턴을 구현합니다. 각 단계는 서로 다른 서비스가 처리합니다.
- 서비스별 데이터베이스: 각 서비스는 자체 데이터베이스를 관리하지만 서비스 간 통신을 통해 데이터 무결성을 보장합니다.
- 멱등 연산: 반복된 연산이 단일 연산과 동일한 효과를 나타내도록 하는 멱등성을 보장합니다.

# 2. Saga 패턴과 그 종류를 설명해주세요.

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

사가 패턴은 분산 트랜잭션을 여러 서비스 간에 관리하는 방법으로, 트랜잭션을 여러 개의 작은 트랜잭션으로 나누어 각각 다른 서비스에서 관리합니다. 각 서비스는 자체 트랜잭션을 수행하고 다음 단계를 트리거하는 이벤트를 발행합니다.

- 사가의 종류:
  - 코레오그래피 기반 사가: 사가에 참여하는 각 서비스가 이벤트를 발행하고 수신합니다. 중앙 조정자가 없습니다.
  - 오케스트레이션 기반 사가: 중앙 조정자인 사가 오케스트레이터가 각 참가자에게 어떤 지역 트랜잭션을 실행할지 알려줍니다.

## 3. 마이크로서비스 아키텍처에서 어떻게 장애 허용성을 보장할 수 있나요?

답변: 마이크로서비스에서의 장애 허용성을 보장하는 것은 시스템이 실패가 발생해도 올바르게 작동하도록 설계하는 것을 의미합니다.

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

- 회로 차단기 패턴: 서비스가 실패할 가능성이 높으면 호출을 중단하여 서비스가 회복할 수 있도록 합니다.
- 지수 백오프 재시도: 실패한 요청을 지연 시간을 늘리면서 자동으로 다시 시도합니다.
- 대체 응답: 서비스가 실패했을 때 대안적인 응답을 제공합니다.
- 분리된 쉘파임 패턴: 일부에서 발생한 장애는 전체 시스템을 다운시키지 않도록 리소스를 격리합니다.
- 헬스 체크: 서비스의 건강 상태를 정기적으로 모니터링하고, 서비스가 다운되었을 때 트래픽을 재경로화합니다.

# 4. 마이크로서비스에서 서비스 간 통신을 어떻게 다루겠습니까?

답변: 마이크로서비스에서 서비스 간 통신은 동기적 또는 비동기적 방법을 사용하여 처리할 수 있습니다.

- 동기 통신:
  - HTTP/REST: 간단하고 널리 사용되지만, 강한 결합 및 지연 증가의 가능성이 있습니다.
  - gRPC: 효율적이며 여러 언어를 지원하며, 저지연 및 고처리량 시나리오에 유용합니다.
- 비동기 통신:
  - 메시지 브로커: 메시지 큐(RabbitMQ, Kafka 등)를 사용하여 분리되고 신뢰할 수 있고 확장 가능한 통신을 구현합니다.
  - 이벤트 기반 아키텍처: 서비스들이 이벤트를 발행하고 구독함으로써 통신하며, 분리 및 확장성을 향상시킵니다.

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

# 5. 마이크로서비스 아키텍처에서 API 게이트웨이의 역할은 무엇인가요?

답변: API 게이트웨이는 모든 클라이언트와의 상호작용에 대한 단일 진입점 역할을 하며 다음과 같은 여러 가지 장점을 제공합니다:

- 요청 라우팅: 들어오는 요청을 적절한 마이크로서비스로 보냅니다.
- 부하 분산: 서비스의 여러 인스턴스 사이에서 요청을 고르게 분산시킵니다.
- 보안: 인증 및 요청 제한과 같은 보안 정책을 강요합니다.
- 집계: 여러 서비스의 응답을 하나의 응답으로 결합합니다.
- 프로토콜 변환: HTTP에서 WebSocket과 같은 다양한 프로토콜 간 변환을 수행합니다.

# 6. 마이크로서비스 환경에서 로깅 및 모니터링을 어떻게 구현하나요?

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

로그 및 모니터링은 옵저버빌리티를 유지하고 마이크로서비스 아키텍처의 건강을 유지하기 위해 중요합니다.

- 중앙화된 로깅: ELK 스택 (Elasticsearch, Logstash, Kibana) 또는 Splunk과 같은 도구를 사용하여 모든 서비스의 로그를 중앙 시스템으로 집계합니다.
- 분산 추적: Jaeger 또는 Zipkin과 같은 도구를 사용하여 여러 서비스를 거치는 요청을 추적하여 성능 병목 현상을 식별합니다.
- 메트릭 수집: Prometheus, Grafana, 또는 Datadog를 사용하여 메트릭(CPU, 메모리 사용량, 응답 시간)을 수집하고 분석합니다.
- 헬스 체크 및 알림: 서비스에 대한 헬스 체크를 구현하고 서비스가 다운되었거나 성능이 저하될 때 알림 메커니즘을 설정합니다.

# 7. 마이크로서비스 아키텍처에서 서비스 버전 관리를 어떻게 다룰 것인지 설명하십시오.

답변: 서비스 버전 관리는 역호환성을 보장하고 업데이트하거나 기능을 추가할 때 원활한 전환을 도와줍니다.

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

- URL 버전 관리: URL 경로에 버전 번호를 포함하세요 (예: /api/v1/resource).
- Header 버전 관리: HTTP 헤더에 버전 번호를 지정하세요.
- 시맨틱 버전 관리: 시맨틱 버전 관리 (주요.부수.수정)를 사용하여 하위 호환 및 비호환 변경을 나타내세요.
- 배포 전략: 블루-그린 배포 또는 카나리아 릴리스와 같은 전략을 활용하여 새 버전을 점진적으로 배포하고 영향을 모니터링하세요.

모두가 내용을 좋아했으면 좋아요나 박수를 댓글로 남겨주세요! 저를 팔로우해주시면 더욱 힘이 납니다 :) 재밌는 콘텐츠가 더 많이 올라올 예정이니 기대해주세요. 다음 기사로 다시 만나뵙겠습니다. 감사합니다.
