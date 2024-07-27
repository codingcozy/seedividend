---
title: "데이터 엔지니어링 로드맵 2024년 최신 가이드"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-DataEngineeringRoadmap_0.png"
date: 2024-07-09 19:48
ogImage:
  url: /assets/img/2024-07-09-DataEngineeringRoadmap_0.png
tag: Tech
originalTitle: "Data Engineering Roadmap"
link: "https://medium.com/@gaurav-adarshi/data-engineering-roadmap-f28eb1817b05"
---

<img src="/TIL/assets/img/2024-07-09-DataEngineeringRoadmap_0.png" />

## 1. Foundational Knowledge

- Familiarize with database concepts (SQL and NoSQL)

- SQL — SQL databases are commonly used in data engineering for structured data storage and querying, providing ACID compliance and strong consistency. — (1 week).
- NoSQL — NoSQL databases are favored for their scalability and flexibility in handling unstructured or semi-structured data, often used in distributed systems for high-volume and high-velocity data processing. — (1 week).

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 분산 컴퓨팅 원칙에 대한 지식 습득

- 데이터 엔지니어가 확장 가능하고 내결함성이 있는 시스템을 설계하기 위해 분산 컴퓨팅 원칙을 이해하는 것은 중요합니다. 병렬 처리와 분산 저장를 활용하여 방대한 데이터세트를 효율적으로 관리하고 데이터 처리 작업에서 고가용성과 신뢰성을 보장합니다. — (1–2 주).

![이미지](/TIL/assets/img/2024-07-09-DataEngineeringRoadmap_1.png)

## 2. 데이터 모델링

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 다양한 데이터 모델링 기술에 대해 배우세요 (예: 관계형, 네트워크...)

- 관계형 및 차원 모델링과 같은 데이터 모델링 기술은 데이터 엔지니어링에서 데이터를 구조화하여 특정 분석 및 보고 요구 사항을 충족시키기 위해 중요합니다. 최적의 성능과 데이터 검색 용이성을 보장합니다. — (1-2 주).

- 정규화와 역정규화를 이해하세요

- 정규화와 역정규화 원칙을 이해하면 데이터 엔지니어들이 데이터베이스를 설계할 때 중복을 최소화하고 데이터 무결성을 유지하는 균형을 맞추는 데 도움이 됩니다. 데이터 엔지니어링 파이프라인에서 저장 공간을 최적화하고 쿼리 성능을 최적화할 수 있습니다. — (1 주).

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 다양한 사용 사례에 대한 스키마 디자인 탐색

- 스키마 디자인 고려 사항은 데이터 엔지니어링에서 중요한 역할을 하며, 다양한 사용 사례에 걸쳐 데이터 저장, 검색 및 분석 효율에 영향을 미치며, 다양한 응용 프로그램 시나리오에서 데이터 시스템의 확장 가능성, 유연성 및 유지 관리 가능성을 보장합니다. — (1–2 주).

![이미지](/TIL/assets/img/2024-07-09-DataEngineeringRoadmap_2.png)

## 3. 데이터 저장

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 데이터베이스 관리 및 최적화 분야에서 전문 지식 습득하기.

- 데이터베이스 관리 및 최적화 능력은 데이터 엔지니어들이 데이터 시스템의 효율성과 대응력을 극대화하기 위해 인덱싱, 쿼리 최적화 및 자원 할당 전략을 구현하여 데이터베이스 성능을 관리하고 세밀하게 조정하는 능력을 제공합니다. — (2–3 주).

![이미지](/TIL/assets/img/2024-07-09-DataEngineeringRoadmap_3.png)

## 4. 데이터 처리

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 배치 처리 프레임워크 (예: Apache Spark, Hadoop MapReduce)를 탐색해보세요.

- Apache Spark 및 Hadoop MapReduce와 같은 배치 처리 프레임워크는 대규모 데이터를 효율적으로 처리하기 위한 데이터 엔지니어링에서 필수적이며 예약된 일괄 작업을 통해 데이터 집약적 작업에 대한 병렬 계산 및 장애 허용 기능을 제공합니다. - (1-2 주).

- 스트림 처리 프레임워크 (예: Apache Kafka, Apache Flink)에 대해 배우세요.

- Apache Kafka 및 Apache Flink와 같은 스트림 처리 프레임워크는 실시간 데이터 처리 및 분석을 가능하게 하며, 낮은 대기 시간 데이터 수신을 용이하게 하고 지속적인 데이터 스트리밍 애플리케이션을 지원하여 데이터 엔지니어링에서 중요한 역할을 합니다. - (1-2 주).

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- ETL (Extract, Transform, Load) 프로세스 및 도구를 이해합니다.

- ETL 프로세스 및 도구를 이해하는 것은 데이터 엔지니어링에서 매우 중요합니다. 이는 다양한 소스에서 데이터를 추출하고, 유용한 형식으로 변환한 뒤, 대상 데이터베이스나 데이터 웨어하우스에로드하여 데이터 품질, 일관성, 접근성을 보장하고 분석 및 보고 목적에 활용합니다. — (2–3 주).

![Data Engineering Roadmap 4](/TIL/assets/img/2024-07-09-DataEngineeringRoadmap_4.png)

## 5. 데이터 통합

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 다양한 소스(데이터베이스, API, 파일)에서 데이터 수집에 대한 전문 지식을 습득합니다.

- 데이터 엔지니어링은 데이터베이스, API 및 파일과 같은 다양한 소스에서 데이터를 수집하여 데이터를 분석하기 위해 데이터를 모으고 중앙 집중화하는 전문 지식에 의존합니다. 이를 통해 포괄적인 데이터 범위와 접근성이 확보되며, (1~2주 소요됩니다).

- 데이터 통합 패턴 및 모범 사례에 대해 학습합니다.

- 데이터 엔지니어링에서 데이터 통합 패턴과 최상의 사례를 이해하는 것은 이질적인 데이터 소스를 조화롭게 하고 정확한 통찰력과 의사 결정을 위한 시스템 간의 데이터 흐름과 상호 운용성을 용이하게하기 위한 중요한 요소입니다. (2~3주 소요됩니다).

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 데이터 통합 및 동기화 도구를 탐색해보세요.

- 데이터 통합 및 동기화 도구를 탐색하는 것은 데이터 엔지니어에게 데이터 워크플로우를 자동화하고 플랫폼 간 데이터를 동기화하며 데이터 일관성과 무결성을 유지하는 능력을 제공하여 데이터 엔지니어링 파이프라인에서 효율성과 신뢰성을 향상시킵니다. — (2–4 주).

![DataEngineeringRoadmap_5.png](/TIL/assets/img/2024-07-09-DataEngineeringRoadmap_5.png)

## 6. 데이터 변환

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- SQL, Python 또는 전문 도구(예: Apache Beam)를 사용하여 마스터 데이터 변환 기술 습득

- 데이터 엔지니어링에서 SQL, Python 또는 Apache Beam과 같은 전문 도구를 활용한 데이터 변환 기술에 능통한 것은 다양한 데이터 세트 간의 호환성과 일관성을 보장하기 위해 데이터를 조작하고 재구성하는 데 중요합니다. — (2~4 주)

- 데이터 클렌징, 정규화 및 데이터 풍부화 과정을 이해

- 데이터 엔지니어링에서 데이터 클렌징, 정규화 및 데이터 풍부화 과정을 이해하는 것은 데이터 품질, 무결성 및 사용 가능성을 향상시키는 데 중요합니다. 데이터를 자신 있고 정확하게 분석하고 의사 결정을 내릴 수 있도록 데이터를 준비합니다. — (1~2 주)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 데이터 파이프라인 조정 및 일정에 대해 배워보세요.

- 데이터 파이프라인 조정 및 일정을 배우면 데이터 엔지니어들은 조직의 데이터 인프라 전반에 걸쳐 시간적이고 신뢰할 수 있는 데이터 처리 및 전달을 보장하며 복잡한 데이터 워크플로우를 자동화하고 관리할 수 있습니다. — (1–2 주).

![이미지](/TIL/assets/img/2024-07-09-DataEngineeringRoadmap_6.png)

## 7. 데이터 품질 및 거버넌스

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 데이터 품질 측정 및 모니터링 기술을 이해합니다.

- 데이터 엔지니어링에서 데이터 품질 측정 및 모니터링 기술을 이해하는 것은 데이터의 정확성, 완전성 및 일관성을 평가하고 유지하는 데 중요합니다. 의사 결정을 지원하기 위한 믿을 수 있는 통찰력을 보장합니다. — (1-2 주).

- 데이터 지배 원칙 및 프레임워크에 대해 배웁니다.

- 데이터 지배 원칙 및 프레임워크를 배우는 것은 데이터 엔지니어링에서 핵심적이며 데이터 자산을 효과적으로 관리하기 위한 정책, 프로세스 및 통제를 수립하여 데이터 수명주기 전반에 걸쳐 준수, 보안 및 책임성을 증진하는 데 중요합니다. — (1-2 주).

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 데이터 품질 점검 및 유효성 검사 프로세스를 구현하세요.

- 데이터 품질 점검 및 유효성 검사 프로세스를 구현하는 것은 데이터 엔지니어가 데이터 이상과 불일치를 자동으로 감지하고 해결할 수 있도록 하여 분석 및 보고를 위한 고품질 데이터 입력을 보장하고 데이터 기반 통찰력의 전반적인 신뢰성을 향상시킵니다. — (3–4 주간).

![Data Engineering Roadmap](/TIL/assets/img/2024-07-09-DataEngineeringRoadmap_7.png)

## 8. 클라우드 기술

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 클라우드 플랫폼 (AWS, Azure, GCP)에 대한 숙련도 향상.

- AWS, Azure 및 GCP와 같은 클라우드 플랫폼에 대한 능숙성은 대규모 데이터 세트의 비용 효율적인 저장, 처리 및 분석을 가능케 하기 위해 데이터 엔지니어링에서 중요합니다. — (3–4 주).

- 클라우드 기반 데이터 저장 및 처리 서비스에 대해 배우기.

- 클라우드 기반 데이터 저장 및 처리 서비스 학습을 통해 데이터 엔지니어들은 클라우드에서 확장 가능한 저장 솔루션과 분산 처리 프레임워크를 활용하여 효율적인 데이터 관리와 분석 워크플로우를 용이하게 할 수 있습니다. — (2–3 주).

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 클라우드 보안 및 규정 요구사항을 이해합니다.

- 데이터 엔지니어링에서 클라우드 보안과 규정 요구사항을 이해하는 것은 강력한 보안 조치를 시행하여 데이터의 기밀성, 무결성 및 가용성을 보장하고 규제 규준과 업계 모범 사례를 준수하는 데 중요합니다. — (4–5 주).

![이미지](/TIL/assets/img/2024-07-09-DataEngineeringRoadmap_8.png)

## 9. 빅데이터 기술

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 분산 저장 시스템(예: Hadoop HDFS, Amazon S3)을 탐색해보세요.

- Hadoop HDFS 및 Amazon S3와 같은 분산 저장 시스템을 탐색하는 것은 데이터 엔지니어링에서 매우 중요합니다. 이를 통해 분산 환경에서 대량의 데이터를 저장하고 관리하여 고가용성과 확장성을 보장할 수 있습니다. - (1-2 주).

- 분산 컴퓨팅 프레임워크(예: Apache Spark, Apache Flink)에 대한 전문 지식을 습득하세요.

- Apache Spark 및 Apache Flink와 같은 분산 컴퓨팅 프레임워크에 전문 지식을 습득하면 데이터 엔지니어는 대규모 데이터 세트를 병렬로 처리하고 분산 컴퓨팅 자원을 활용하여 효율적인 데이터 처리 및 분석을 수행할 수 있습니다. - (4-5 주).

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 컨테이너화 및 오케스트레이션 기술(Docker, Kubernetes 등) 이해하기

- Docker 및 Kubernetes와 같은 컨테이너화 및 오케스트레이션 기술을 이해하는 것은 데이터 엔지니어링에서 중요합니다. 다양한 컴퓨팅 환경에 걸쳐 일관되게 데이터 기반 애플리케이션 및 워크플로를 패키징하고 배포하여 확장성, 이식성 및 자원 이용을 향상시킵니다. — (3–4 주).

![이미지](/TIL/assets/img/2024-07-09-DataEngineeringRoadmap_9.png)

## 10. 데이터 시각화 및 보고

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 데이터 시각화 도구 및 기술 (예: Tableau, Power BI)를 탐색해 보세요.

- Tableau 및 Power BI와 같은 데이터 시각화 도구를 탐험하는 것은 복잡한 데이터셋을 통찰력 있는 시각적 표현으로 변환하는 데 필수적입니다. 이는 데이터 기반 의사 결정 및 커뮤니케이션을 용이하게 합니다. — (1–2 주).

- 대시보드 디자인 및 데이터 스토리텔링에 대해 학습하세요.

- 대시보드 디자인 및 데이터 스토리텔링에 대해 학습함으로써 데이터 엔지니어는 주요 통찰과 트렌드를 이해 관계자 및 의사 결정자에게 효과적으로 전달하는 매력적이고 유익한 대시보드를 만들 수 있습니다. — (1–2 주).

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 상호 작용형 시각화 및 보고서 작성에 대한 전문 지식 습득하기.

- 상호 작용형 시각화 및 보고서 작성에 대한 전문 지식을 갖는 것은 데이터 엔지니어가 동적이고 사용자 친화적인 데이터 제품을 개발하는 데 도움이 되며, 다양한 수준의 청중들에게 데이터 엔지니어링 프로젝트 전반에 걸쳐 데이터 기반 인사이트의 참여와 이해를 높일 수 있습니다. — (2–3 주).

![이미지](/TIL/assets/img/2024-07-09-DataEngineeringRoadmap_10.png)

## 11. 고급 주제

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 실시간 분석, 데이터 레이크 및 그래프 데이터베이스와 같은 고급 주제를 탐험해보세요.

- 복잡한 데이터 처리 문제를 해결하고 다양한 데이터 원본에서 새로운 통찰을 얻기 위해 데이터 엔지니어링에서 실시간 분석, 데이터 레이크 및 그래프 데이터베이스와 같은 고급 주제를 탐색하는 것이 중요합니다. — (2–4 주).

- 분야의 새로운 기술 및 트렌드를 따라가세요.

- 분야의 새로운 기술 및 트렌드를 파악함으로써 데이터 엔지니어는 최신 도구와 방법론을 활용하여 혁신을 이루고 데이터 엔지니어링 프로세스를 최적화하여 지속적인 개선을 추구하고 빠르게 변화하는 환경에서 선도할 수 있습니다. — (3–5 주).

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 12. Practical Projects and Experience

- 실제 데이터 엔지니어링 프로젝트를 수행하여 여러분의 기술을 적용하세요.

- 실제 데이터 엔지니어링 프로젝트를 수행하면, 산업 분야에서 데이터 처리, 통합 및 분석에 대한 실무 경험을 쌓아가며 실전 시나리오에서 기술을 적용할 수 있습니다. (5–6 주간 진행).

- 오픈 소스 프로젝트에서 동료들과 협업하거나 해커톤에 참여하세요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 동료들과 오픈 소스 프로젝트에서 협업하거나 해커톤에 참여하는 것은 데이터 엔지니어들이 아이디어를 교환하고 복잡한 문제를 해결하며 혁신적인 데이터 엔지니어링 솔루션 개발에 기여할 수 있는 협력적인 환경을 조성합니다.

- 데이터 엔지니어링 역할에서 실무 경험을 쌓기 위해 인턴십이나 취업 기회를 찾아보세요.

- 인턴십이나 취업 기회를 찾는 것은 희망하는 데이터 엔지니어들에게 실무적인 경험을 쌓을 기회를 제공하여 이론적 지식을 적용하고 전문 기술을 개발하며 데이터 엔지니어링 역할과 책임에 대한 가치 있는 통찰력을 얻을 수 있습니다.

# 앞으로 나아가기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

위에서 나열된 전체 여정을 소비 가능한 크기의 기사로 나눠서 소개할 거에요. 시리즈에 대해 업데이트를 받으려면 저를 따라오세요. 이 여정에 동참하게 될 거에요. 즐거운 학습되세요!!!
