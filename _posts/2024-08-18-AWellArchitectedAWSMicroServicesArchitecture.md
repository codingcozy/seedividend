---
title: "AWS Microservices 아키텍처 구조 설계방법 모놀리틱 vs 마이크로서비스 비교 정리"
description: ""
coverImage: "/assets/img/2024-08-18-AWellArchitectedAWSMicroServicesArchitecture_0.png"
date: 2024-08-18 11:29
ogImage:
  url: /assets/img/2024-08-18-AWellArchitectedAWSMicroServicesArchitecture_0.png
tag: Tech
originalTitle: "A Well Architected AWS Micro Services Architecture"
link: "https://medium.com/aws-tip/a-well-architected-aws-micro-services-architecture-c652d169719b"
isUpdated: true
updatedAt: 1724032672762
---

<img src="/assets/img/2024-08-18-AWellArchitectedAWSMicroServicesArchitecture_0.png" />

## 웰 아키텍처 클라우드 애플리케이션의 주요 특성을 살펴보겠습니다.

- 마이크로 서비스는 ECS FARGATE 클러스터를 사용하여 여러 가용 영역에 배포됩니다.(중복성)
- 마이크로 서비스는 독립적이고 느슨하게 결합되어 있으며 실패 시나리오는 지수 백오프 재시도로 처리됩니다.(장애 허용성)
- 마이크로 서비스는 미국 동부와 서부 지역에 모두 배포됩니다.(서비스 중복성)
- 모든 마이크로 서비스는 지속적으로 복제되는 글로벌 테이블인 더나모 DB에 데이터를 수집합니다.(데이터 복구 및 데이터 중복성)
- 마이크로 서비스는 Elastic로드 밸런서 및 오토 스케일링 그룹 뒤에 있으며 더 나은 복원력 및 오토 스케일링을 위해 최소 및 최대 작업 수를 구성할 수 있습니다.(부하 분산 및 오토 스케일링)
- Lambda 아키텍처를 사용하여 지역 내의 장애 조치를 수행하도록 설계되었습니다.(지역 격리 및 재해 복구)
- 특정 지역에서 요청 수가 500을 초과할 때 클라우드 워치 알람이 트리거되도록 구성되었습니다. (모니터링)
- 지역 장애 조치가 수행되면 페일오버 람다가 장애 조치를 수행하고 트래픽을 다른 지역으로 전환하는 데 사용됩니다.(재해 복구)

# 중복성 및 복제:

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

- 마이크로 서비스는 데이터를 여러 지역에 복제하기 위해 DynamoDB 글로벌 테이블을 사용하고 있습니다. Amazon DynamoDB의 글로벌 테이블은 완전히 관리되며, 멀티 리전 및 멀티 마스터 데이터베이스 솔루션으로서 여러 AWS 리전 전반에 걸쳐 완전히 복제되고 고가용성 및 낮은 지연 시간을 제공합니다.

![이미지](/assets/img/2024-08-18-AWellArchitectedAWSMicroServicesArchitecture_1.png)

## 서비스 여유성:

싱글 포인트 오브 실패를 피하기 위해 여러 가용 영역 또는 리전에 서비스의 다중 인스턴스를 실행하는 것입니다. 아래 다이어그램에서 볼 수 있듯이, 서비스들은 다중 가용 영역에서 여유롭게 구성되어 있습니다.

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

아래는 Markdown 형식으로 표를 변환한 것입니다.

![이미지](/assets/img/2024-08-18-AWellArchitectedAWSMicroServicesArchitecture_2.png)

## 로드 밸런싱:

- 여러 서버 또는 인스턴스 간에 들어오는 트래픽을 분산하여 단일 서버가 병목 현상이 되지 않도록하고 신뢰성이 높은 장애 조치를 제공합니다.

## 자동 확장:

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

- 현재 수요에 따라 트래픽 증가를 처리하고 성능을 유지하기 위해 활성 서버 또는 인스턴스 수를 자동으로 조절합니다.

## 장애 허용성:

- 구성 요소 장애가 발생해도 시스템이 정상적으로 작동하도록 설계합니다. 이는 완만한 저하와 재시도 메커니즘과 같은 기술을 사용하는 것을 포함합니다.

## 재해 복구:

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

- 재해 발생 시 서비스 및 데이터를 빠르게 복구하기 위해 백업 및 복구 솔루션을 구현합니다. 이는 정기적인 백업, 자동 복구 절차, 그리고 재해 복구 계획 검토를 포함합니다. 데이터는 중복이 되어 여러 지역으로 스트리밍되어 지역 장애 조치를 수행합니다.

# 지역 장애 조치는 어떻게 작동합니까.

- 지역 장애 조치를 위해 Failover Lambda가 생성되었습니다.
- ECS 서비스는 지속적으로 클라우드 워치로 메트릭을 제공합니다.
- 클라우드 워치는 메트릭과 임계값을 계속해서 검토하고 있습니다.
- 한 지역에서 클라우드 워치 알람이 작동되면, 해당 이벤트가 SNS 토픽으로 전송됩니다.
- 이벤트가 SNS 토픽에 도착하면, Failover Lambda가 트리거되고 건전한 지역을 가리키도록 A 레코드를 변경하기 위해 라우트 53와 상호작용합니다.

## 건전하지 않은 지역은 어떠한 트래픽도 받지 않게 됩니다.

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

- 모니터링 및 경고: 마이크로 서비스는 지속적으로 로그를 로그 포워더로 전송한 다음 스플렁크로 전송합니다. 스플렁크는 다중 리전 및 다중 가용 영역에 배포되어 있습니다.

![이미지](/assets/img/2024-08-18-AWellArchitectedAWSMicroServicesArchitecture_3.png)

# 분리 및 마이크로 서비스:

- 마이크로 서비스 아키텍처를 사용하여 애플리케이션을 디자인하는 것, 여기서 서비스들이 느슨하게 결합되어 있고 독립적으로 작동할 수 있습니다. 이를 통해 한 구성 요소의 실패가 다른 구성 요소로 연쇄적으로 전파되지 않도록 보장합니다.

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

# 보안 및 규정 준수:

- PII 데이터와 취약성을 스캔하는 보안 스캔이 코드 빌드 및 체크인 중에 진행됩니다.

이 글을 읽는 데 많은 노력을 기울였습니다. 제가 준비한 내용을 좋아해주시고 감사하게 생각할 것입니다. 모든 삽화는 저작권이 있으며 독창적이어서 새로운 시각을 제공합니다. 읽어 주셔서 감사합니다. 클랩(clap)도 감사합니다.
