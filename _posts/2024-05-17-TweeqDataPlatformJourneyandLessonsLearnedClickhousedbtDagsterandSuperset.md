---
title: "투윅 데이터 플랫폼 여정과 배운 점 Clickhouse, dbt, Dagster 및 Superset"
description: ""
coverImage: "/assets/img/2024-05-17-TweeqDataPlatformJourneyandLessonsLearnedClickhousedbtDagsterandSuperset_0.png"
date: 2024-05-17 04:01
ogImage: 
  url: /assets/img/2024-05-17-TweeqDataPlatformJourneyandLessonsLearnedClickhousedbtDagsterandSuperset_0.png
tag: Tech
originalTitle: "Tweeq Data Platform: Journey and Lessons Learned: Clickhouse, dbt, Dagster, and Superset"
link: "https://medium.com/tweeq-engineering/tweeq-data-platform-journey-and-lessons-learned-clickhouse-dbt-dagster-and-superset-fa27a4a61904"
isUpdated: true
---




<img src="/assets/img/2024-05-17-TweeqDataPlatformJourneyandLessonsLearnedClickhousedbtDagsterandSuperset_0.png" />

본문에서는 Tweeq 데이터 플랫폼의 여정을 살펴보겠습니다. 특정 디자인 선택사항으로 이어지는 요구 사항 및 제품 운영 중에 배운 교훈에 대해 설명합니다.

# 요구 사항:

제품 설계에 앞서 고려해야 할 기술적, 규정적 요구 사항이 있었습니다.

<div class="content-ad"></div>

- 규제 요구 사항을 준수하기 위해 데이터 플랫폼은 해당 지역 내에서 호스팅되어야 합니다.
- 미래의 클라우드 공급 업체 이주를 위해 클라우드에 중립적인 데이터 플랫폼이어야 합니다.
- 데이터 플랫폼은 고객을 위한/앱 내 분석 및 비즈니스 인텔리전스(BI)/데이터 분석을 포함한 분석적 사용에 최적화되어야 합니다.
- 데이터 플랫폼은 오픈 소스 도구를 활용해야 합니다.
- 데이터 플랫폼은 고가용성을 유지하고 데이터를 다중 노드에 저장하여 데이터 복제를 지원해야 합니다.
- 데이터 플랫폼은 어느 정도의 관찰 가능성을 달성해야 합니다.

# 데이터 플랫폼 아키텍쳐:

이 섹션에서는 Tweeq 제품 시스템, 전체 데이터 스택, 설계 선택 사항 및 여정을 통해 배운 교훈에 대해 설명합니다. 

<img src="/assets/img/2024-05-17-TweeqDataPlatformJourneyandLessonsLearnedClickhousedbtDagsterandSuperset_1.png" />

<div class="content-ad"></div>

투잉 프로덕션 시스템:

투잉은 데이터가 서비스 수준 데이터베이스에 분산되어 있기 때문에 어떤 고객을 위한 기능에서도 테이블을 결합하는 것이 비용이 많이 소요되므로, 데이터 웨어하우스를 통해 데이터 결합/집계가 필요한 모든 기능에 의지한 선택을 하였습니다.

데이터 웨어하우스 저장소 - Clickhouse:

고객을 위한 기능에 사용해야 하는 몇 가지 뷰들 때문에, 컬럼 스토어 데이터베이스가 저희의 첫 번째 선택이었습니다.

<div class="content-ad"></div>

AWS 및 GCP 도구인 Redshift 및 BigQuery는 데이터를 해당 지역 내에 저장해야 한다는 규정 때문에 거론되지 않았지만, Tweeq는 미래의 클라우드 이관을 대비해 준비되어야 했습니다. Clickhouse는 필요한 모든 요건을 충족시켰습니다. 게다가 Altinity ClickHouse K8s Operator를 사용하여 클라우드에 독립적인 데이터 웨어하우스를 구축할 수 있었습니다.

EtLT 접근 방식 — Kafka:

Tweeq 데이터 플랫폼은 EtLT(엑스트랙트, transform -작은 t 사용-, Load, Transform) 접근 방식을 사용합니다. 이는 우리가 일부 PII(Personal Identifiable Information) 데이터를 제외한 상태로 원시 데이터를 배송한다는 것을 의미합니다.

데이터는 우리의 프로덕션 CockroachDB 데이터베이스에서 Kafka 클러스터인 버퍼 레이어로 푸시됩니다. 이는 CockroachDB에서 기본 제공되는 Change Data Capture (CDC) 및 changefeed 작업을 활용하여 달성됩니다.

<div class="content-ad"></div>

클릭하우스는 Kafka 테이블과 유사한 소비자 역할을 하는 Kafka 엔진 테이블을 제공합니다. 이를 통해 제3자 싱크 도구를 사용하지 않아도 될 정도로 우리를 도왁이해 주었습니다. 그러나 Kafka 엔진 테이블의 주요 제한 중 하나는 스키마 변경을 관리하는 것입니다. 다운 타임 없이 테이블을 삭제하고 다시 만드는 작업은 번거로울 수 있습니다.

데이터 모델링 — dbt:

데이터를 올바른 형식으로 제공하기 위해 차원 모델링(사실 & 차원) 접근 방식을 따라 데이터 웨어하우스를 모델링하기로 결정했습니다. 우리는 고객에게 제공되는 기능 및 비즈니스 인텔리전스 용도를 위해 사실, 차원 및 데이터 마트(미리 계산된, 선행 집계된 테이블)으로 데이터를 모델링했습니다. 그러나 데이터 분석가들은 자체 데이터 마트를 생성할 수 있는 자유를 가지고 있습니다.

데이터 모델링은 dbt를 통해 이루어졌습니다. 우리는 사실 및 차원 모델의 신선도를 보장하기 위해 dbt가 제공하는 점진적 로드 기능을 활용했습니다. 테스트 목적으로 로컬 모크를 만들기 위해 시드 기능을 활용했습니다.

<div class="content-ad"></div>

dbt은 강력하고 개발자 친화적이며 쿼리가 버전 관리된다는 점에서 유용하지만, dbt가 Clickhouse 클러스터에 쓰기를 하는 데 문제가 있었습니다. 데이터를 하나의 노드에 저장하여 일부 타협해야 했지만, 이후 새로운 dbt 버전에서 문제가 해결되었습니다.

파이프라인 오케스트레이션 - Dagster:

우리는 고객을 대상으로 하는 모델(사실, 차원 및 데이터 마트)을 매 5분마다 업데이트하고 데이터 웨어하우스 모델을 하루에 한 번은 업데이트해야 했습니다.

우리는 Dagster를 사용하여 이를 달성할 수 있었습니다. 우리는 dbt와 매우 원활하게 통합되는 데이터 파이프라인 전용으로 개발된 오케스트레이션 도구인 Dagster를 선택했는데, K8s 위에 배포할 수 있고 데이터 라인어지 기능과 사용하기 쉬운 UI를 갖고 있는 것이 그 이유입니다.

<div class="content-ad"></div>

태그 기능을 사용하여 대시보드별로 데이터의 신선도 간격을 구분했어요. 개발된 파이프라인의 실패를 모니터링하기 위해 센서를 사용했고, 실패 메시지는 Slack 채널로 전송됩니다.

Dagster의 유일한 단점은 k8s에서의 초기 설정 부분인데요, 그러나 커뮤니티는 매우 도움이 되고 응답이 신속해요.

데이터 시각화 — Superset:

K8s 위에 배포할 수 있는 오픈 소스 도구인 Superset을 선택했어요. 또한 사용자 관리를 위해 GoogleAuth와 통합할 수 있습니다.

<div class="content-ad"></div>

초반에는 UI가 조금 복잡해 보일 수도 있지만, 시각화 옵션들은 충분히 좋습니다. 우리는 제품 중심의 분석을 위해 Posthog와 같은 제품 분석 도구도 사용해야 했습니다.

마지막으로, 당신이 Tweeq 데이터 플랫폼을 구축하는 여정을 즐겼으면 좋겠습니다. 댓글이나 메시지를 자유롭게 남겨주세요.

Abdulaziz Almalki, Mashail Almuzaini 그리고 Reem Albiridi에게 특별한 감사를 전합니다.