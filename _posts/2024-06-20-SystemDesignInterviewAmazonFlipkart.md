---
title: "시스템 디자인 면접 아마존 플립카트"
description: ""
coverImage: "/assets/img/2024-06-20-SystemDesignInterviewAmazonFlipkart_0.png"
date: 2024-06-20 01:08
ogImage:
  url: /assets/img/2024-06-20-SystemDesignInterviewAmazonFlipkart_0.png
tag: Tech
originalTitle: "System Design Interview: Amazon  Flipkart"
link: "https://medium.com/gitconnected/system-design-interview-amazon-flipkart-efe5c3f1666b"
isUpdated: true
---

## 다루는 주제:

- 아키텍처는 홈/검색 플로우, 추천 시스템, 주문 관리 및 재고 서비스와 같은 구성 요소를 포함합니다.
- 비구조화된 데이터에는 MongoDB, 검색에는 Elasticsearch, 주문 트랜잭션에는 MySQL, 완료된 주문에는 카산드라와 같은 데이터베이스의 사용이 강조됩니다. Kafka와 Spark는 실시간 데이터 처리 및 분석에 사용됩니다.

# 전자 상거래 시스템 아키텍처

- 우버나 에어비앤비의 백엔드와 마찬가지로 아마존 및 기타 전자 상거래 플랫폼도 시스템에 대한 두 가지 면을 갖고 있습니다.
- 아마존의 고객인 경우, 아마존의 자체 격리된 스토어를 통해 제품을 판매하거나 다른 판매자들이 제공하는 제품을 구매할 수 있습니다.

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

## 기능 요구 사항

- 판매자 작업: 판매자는 제품을 추가, 삭제 및 수정할 수 있습니다.
- 제품 카탈로그: 구매자가 제품을 이름, 키워드 또는 카테고리로 검색할 수 있는 포괄적인 카탈로그입니다.
- 장바구니: 구매자는 장바구니에 제품을 추가, 삭제 또는 업데이트할 수 있습니다.
- 주문 처리: 구매자는 제품을 구매하고 결제할 수 있습니다.
- 주문 내역: 구매자는 이전 주문 내역을 확인할 수 있습니다.
- 리뷰 및 평점: 구매자는 제품을 리뷰하고 평가할 수 있습니다.

## 비기능 요구 사항

- 높은 가용성: 시스템은 연중무휴로 운영되어야 합니다.
- 높은 일관성: 시스템 전체의 정확한 데이터를 보장하며 특히 재고 및 거래에 대해 정확성을 유지해야 합니다.
- 낮은 지연 시간: 원활한 사용자 경험을 위해 빠른 응답 시간이 필요합니다.

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

제가 말한 것과 같이, Markdown 형식의 표로 변경해 보겣습니다:

| Component            | Priority | Description                                             |
| -------------------- | -------- | ------------------------------------------------------- |
| Payment service      | High     | Highly consistent                                       |
| Inventory management | High     | Highly consistent                                       |
| Search service       | High     | Highly available and low latency, eventually consistent |
| Availability         | Low      | Low priority                                            |

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

- 사용자/구매자는 전자 상거래 웹 사이트를 방문하여 홈페이지에 도착할 것입니다.
- 홈페이지는 추천 서비스에 의해 구동됩니다. 사용자가 무언가를 검색하면 시스템의 검색 서비스를 호출할 것입니다.
- 고객이 검색을 완료하고 주문을 하려고 하면 주문 배치 아키텍처가 처리할 것입니다.
- 시스템의 구매 단의 설계를 간단하게하기 위해 홈페이지/검색 아키텍처와 주문 배치 아키텍처를 따로 논의할 것입니다.

## 홈 화면 및 검색 페이지

우리가 제공할 두 가지 UI가 있을 것입니다.

- 홈 화면에는 몇 가지 추천 사항이 있을 것입니다. 반환 사용자인지 새 사용자인지에 따라 개인화된 추천이거나 일반 추천일 수 있습니다.
- 검색 페이지에서 사용자는 일부 검색 텍스트를 기반으로 결과를 볼 수 있습니다.

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

![이미지1](/assets/img/2024-06-20-SystemDesignInterviewAmazonFlipkart_0.png)

![이미지2](/assets/img/2024-06-20-SystemDesignInterviewAmazonFlipkart_1.png)

우리 시스템의 소비자 중 하나는 상품 서비스입니다

## 상품 서비스

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

- Item 서비스는 Kafka를 청취하여 새 항목을 추가하고 업데이트하고 가져오는 API를 노출합니다.
- 이 서비스는 해당 항목 관련 데이터가 비구조적이기 때문에 MongoDB에 위치합니다.
- "비구조적"이라는 의미는 다양한 유형의 항목이 서로 다른 속성을 가질 것이라는 것입니다. 예를 들어, 셔츠에는 사이즈, 원단, 색상 속성이 있고, TV에는 화면 크기, 색상 기술, 무게, 해상도 등의 속성이 있을 수 있습니다.

새 항목이 온보딩되자마자,

- 검색 소비자는 해당 항목이 사용자에 의해 쿼리될 수 있도록 확인합니다. 새 항목을 읽고 처리하여 데이터베이스에 저장될 수 있도록 형식화하고 검색 시스템이 이해할 수 있도록합니다.
- 형식화가 완료되면 검색 소비자는 이 데이터를 ElasticSearch 데이터베이스에 넣습니다.
- 여기서 텍스트 기반 검색에 매우 효율적이고 원활한 사용자 경험을 위해 필요한 유사 검색을 지원하는 ElasticSearch를 사용합니다.

이제 Search 서비스,

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

- 이 ElasticSearch와 상호 작용하면 제품을 필터링, 정렬, 검색하는 API가 노출됩니다.
- 기능 요구 사항에서 '배송 예상 시간으로 검색'을 언급했습니다. 이를 확장하여 사용자에게 전달할 수 없는 검색 결과를 표시하지 말아야 한다는 요구 사항으로 확장할 수 있습니다. 그렇지 않으면 사용자 경험이 좋지 않을 것입니다.
- 이를 위해 검색 서비스는 Serviceability 및 TAT 서비스라는 것과 대화할 것입니다. Serviceability 및 TAT 서비스는 제품이 배송될 창고를 확인하고, 창고와 사용자의 우편번호 사이에 경로가 있는지, 그리고 그 경로를 통해 이 제품을 운반할 수 있는지를 확인합니다. 또한, 대략적인 배송 일정을 파악하고 이 모든 정보를 검색 서비스에 전달합니다. 검색 서비스는 이 정보를 사용자에게 추가로 전달할 것입니다.

## 사용자 검색이 생성되는 방법

- 이 검색 결과 또는 추천은 앞서 논의한 전자 상거래 애플리케이션의 다른 공급 업체, 상점 또는 판매자에 의해 생성됩니다.
- 다이어그램의 가장 오른쪽에 상자로 표시된 판매 끝 부분을 찾을 수 있습니다.
- 실제로, 판매 끝 부분 자체가 일련의 마이크로서비스로 완성된 아키텍처입니다.
- 판매 끝 부분은 모든 상점에서 데이터를 가지고 있습니다.
- 새로운 상점이 시스템에 합류하거나 기존 상점이 재고에 새 제품을 추가할 때마다 Kafka 대기열이 해당 이벤트를 가져올 것입니다.
- Kafka 대기열에서 데이터를 읽는 일련의 Kafka 소비자가 이러한 데이터 변경 사항을 가져와서 Amazon 검색 페이지의 검색 결과를 제어하는 ElasticSearch에 통합할 것입니다.

## 찜 목록 및 카트 서비스

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

- 검색 결과가 표시된 후 사용자는 서로 다른 제품의 속성을 확인하고 비교할 수 있습니다.
- 다음으로, 사용자는 무언가를 선택하고 '위시리스트'나 '장바구니'에 추가할 수 있습니다. '위시리스트'에 추가하면 위시리스트 서비스가 호출되어 해당 항목을 위시리스트 MySQL 데이터베이스에 추가합니다.
- 사용자가 항목을 장바구니에 추가하면 카트 서비스를 통해 카트 MySQL 데이터베이스에 저장됩니다.
- 위시리스트와 장바구니에는 따로 데이터베이스를 사용하는 것이 타당합니다. 위시리스트는 장바구니에 있는 객체보다 훨씬 긴 기간 동안 저장될 수 있기 때문입니다.

중요한 점을 다시 이해하세요,

- 검색 화면에서 사용자는 제품을 위시리스트에 추가하거나 장바구니에 넣을 수 있어야 합니다. 이는 위시리스트 서비스와 카트 서비스를 통해 이루어집니다.
- 위시리스트 서비스는 우리 시스템의 모든 위시리스트 저장소이고, 카트 서비스는 모든 장바구니 저장소입니다.
- 이 두 서비스는 서로 완전히 동일한 방식으로 구축될 것이며, 각각 위시리스트나 장바구니에서 항목을 가져오고 업데이트하고 추가 또는 삭제할 API를 제공하며, 둘 다 MySQL DB에 저장될 것입니다.
- 이들은 동일한 하드웨어 위에서 구축될 수 있지만, 특히 할인이 다가올 때 위시리스트가 매우 길어지는 경향이 있기 때문에 이 서비스들을 위한 별도의 하드웨어를 사용하는 것이 좋습니다. 이렇게 하면 각 서비스에 대한 하드웨어 확장이 훨씬 쉬워집니다.

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

- 사용자의 검색, 장바구니 및 위시리스트 항목은 추천 서비스를 지원하는 중요한 자원입니다.
- 이러한 이벤트들은 사용자의 관심을 반영하며 해당 사용자에 맞는 추천을 만드는 데 활용될 수 있습니다.
- 위 다이어그램에서 확인할 수 있듯이, 검색 서비스, 장바구니 서비스 및 위시리스트 서비스는 모두 발생하는 이벤트를 카프카 큐로 보내고 있습니다.
- Spark Streaming 소비자는 실시간으로 카프카에서 읽어와 하둡 클러스터에 저장할 보고서를 생성하여 분석 목적으로 사용됩니다. 사용자가 가장 많이 검색하거나 위시리스트에 추가한 항목과 같은 특정 분석을 통해 이 사용자에게 추천을 생성할 수 있습니다.

중요한 점을 다시 이해하면,

- 우리의 카프카 서비스는 최근 시간 단위나 일별로 가장 인기 있는 제품, 가장 원하는 항목, 가장 많은 주문이 발생한 지역, 수익을 최대화하는 범주 등과 같은 실시간 보고서를 생성할 스파크 스트리밍 소비자에 연결될 것입니다.
- 카프카에서 제공된 모든 이 데이터는 일반적인 추천을 제공할 수 있도록 ALS와 같은 표준 알고리즘을 실행할 수 있는 하둡 클러스터에 저장될 것입니다. 과거 구매 내역을 기반으로 사용자가 다음에 구매할 필요가 있는 제품을 식별하고 그에 따라 우리는 그들을 위해 개인 맞춤형 추천을 생성할 수 있습니다.
- 또한 다른 비슷한 사용자가 검색한, 위시리스트에 추가한 또는 구매한 제품들에 대해 알려줄 것이며, 이를 특정 사용자에 대한 추천에 추가할 수 있습니다.
- 이러한 추천이 생성되면 스파크 클러스터가 추천 서비스와 대화하는데, 이것은 시스템의 모든 추천을 포함하고 일반적인 추천 또는 제품 범주에 기반한 특정 사용자 ID에 대한 추천일 수 있습니다.
- 이렇게 하면 사용자들은 홈페이지에서 일반적인 추천을 볼 수 있지만, 특정 제품 범주를 탐색 중인 경우 추천이 필터링될 것입니다.

## 사용자 위치 데이터

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

- 시스템은 사용자 데이터도 저장합니다.
- 사용자 위치 정보를 통해 시스템이 특정 제품을 사용자에게 배달할 수 있는지 여부를 결정할 수 있습니다.
- 예를 들어, 생활 필수품인 냉동식품의 배송이 원격 지역에서 제한될 수 있습니다.
- 이러한 항목들은 추천 또는 검색 결과에 나타나지 않습니다.
- 이는 추천 서비스와 검색 서비스가 사용자 데이터를 필요로 하여 사용자에게 특화된 결과를 생성해야 함을 의미합니다.
- 이 서비스들은 초기에 REDIS와 통신합니다.
- 사용자 데이터가 그곳에 저장되어 있으면, 이를 직접 서비스로 보냅니다. 캐시에 없다면 REDIS는 데이터베이스에서 정보를 불러와 서비스로 전달합니다.

다시 한 번 중요한 점을 이해하세요,

- 사용자 서비스는 모든 사용자의 저장소이며 시스템에서 사용자를 가져오거나 업데이트, 추가, 삭제하기 위한 API도 제공합니다.
- 해당 서비스는 MySQL 데이터베이스에 위치하며 Redis 캐시를 유지합니다.
- 따라서 검색 서비스가 서비스 가능성 서비스에 통신하기 위해 사용자의 우편번호를 가져오려면, 사용자 서비스는 먼저 Redis에서 확인하고, 정보가 없다면 MySQL 데이터베이스에서 조회하여 사용자 정보를 가져와 Redis에 저장하고, 그 정보를 검색 서비스에 반환합니다.

## 창고 서비스

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

- 창고 서비스는 다양한 상점을 위해 창고에 있는 모든 제품에 대한 인덱스를 유지합니다.
- 이 정보는 검색 서비스에 의해 가져와서 제품이 현재 사용 가능한지 여부를 표시하는 데 사용됩니다.

# 구매 및 체크아웃 흐름

![이미지](/assets/img/2024-06-20-SystemDesignInterviewAmazonFlipkart_2.png)

- 사용자가 주문을 배치하려고 할 때, 요청은 대규모 주문 관리 시스템의 일부인 주문 수신 서비스로 이동합니다.
- 주문 관리 시스템은 MySQL 데이터베이스에 있습니다. 우리는 고객 테이블, 제품 테이블, 주문 테이블 등 여러 테이블을 예상대로 가지고 있으며, 이러한 테이블을 통해 다양한 거래가 진행됩니다.
- 이제 우리는 데이터베이스가 변화를 즉시 반영하지 못해 창고에서 최신 AirPods의 마지막 제품을 두 명의 사용자가 주문할 수 없도록 하고 싶습니다. 이것은 관계형 데이터베이스의 ACID 특성이 필요하므로 MySQL이 필요합니다.

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

주문 수신 서비스가 호출되면,

- Redis에 주문 ID, 주문이 만들어진 날짜 및 시간, 주문 ID의 만료 시간이 포함된 레코드가 생성됩니다.
- 이러한 세부 정보와 함께 해당 주문 ID에 대한 상태도 있을 것입니다. 일단이 상태는 "생성됨"이라고 가정합니다.
- 다음 단계는 재고 서비스를 호출하는 것입니다. 예를 들어, 주문이 생성되기 전에 5개의 소니 65인치 스마트 TV가 재고에 있었습니다.
- 주문을 배치한 후, 제품의 재고 수는 4로 감소하며, 이후에 사용자가 결제 페이지로 리디렉션됩니다.
- 그러나 왜 결제가 완료되기 전에 재고를 업데이트하는 걸까요? 만약 5대가 아닌 1대만 재고가 있고 3명이 구매를 시도한다면 어떨까요? 결제 흐름으로 이동하기 전에 재고 수를 줄이면, 3명 중 2명은 상품이 이미 품절되었음을 알게 되어 결제 페이지로 이동하기 전에 흐름이 종료될 것입니다.
- 이 제약 조건을 유지하여 재고 수가 음수가되면 주문을 배치할 수 없도록 충분히 쉽게 구현할 수 있습니다.

# 서로 다른 서비스가 사용하는 데이터베이스:

전형적인 전자 상거래 아키텍처에서 각 서비스가 사용하는 데이터베이스를 분석하겠습니다:

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

## 1. 제품 카탈로그

- 데이터베이스: 관계형 데이터베이스 (예: MySQL, PostgreSQL) 또는 NoSQL 데이터베이스 (예: MongoDB)
- 목적: 제품의 이름, 설명, 가격, 이미지 및 속성과 같은 상세 정보를 저장합니다.
- 참조: 제품 세부 정보를 빠르게 검색하고 확장성을 다루기 위해 사용됩니다 (Java Challengers) (CodeKarle).

## 2. 사용자 관리

- 데이터베이스: 관계형 데이터베이스 (예: MySQL, PostgreSQL) 및 캐싱 레이어 (예: Redis)
- 목적: 사용자 계정, 인증 및 권한을 관리합니다. 사용자 정보, 예를 들어 이름, 주소 및 결제 방법을 저장합니다.
- 참조: 관계형 데이터베이스는 ACID 속성을 유지하기 위해 사용되고, Redis는 성능을 향상시키기 위해 캐싱에 사용됩니다 (CodeKarle).

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

## 3. 쇼핑 카트 및 위시리스트

- 데이터베이스: 예를 들어 MySQL과 같은 관계형 데이터베이스(영속성을 위해); 캐싱을 위해 Redis 사용
- 목적: 쇼핑 카트와 위시리스트에 추가된 항목을 관리합니다. 항목을 가져오거나 업데이트하고, 추가하거나 삭제하는 API를 제공합니다.
- 참고: 관계형 데이터베이스는 카트와 위시리스트 데이터의 일관성과 신뢰성을 보장하며, Redis는 빠른 액세스와 확장성에 도움이 됩니다. (CodeKarle).

## 4. 주문 처리

- 데이터베이스: 관계형 데이터베이스 (예: MySQL)
- 목적: 항목 가용성을 확인하고, 트랜잭션을 처리하며, 재고를 업데이트하고, 주문 세부 정보를 저장합니다.
- 참고: 관계형 데이터베이스 사용은 트랜잭션을 처리하고 주문 프로세스 중 데이터 무결성을 유지하는 데 중요한 ACID 속성을 보장합니다 (CodeKarle).

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

## 5. 결제 게이트웨이

- 데이터베이스: 외부 결제 제공업체에 의존하기 때문에 특정 데이터베이스 명시되지 않음.
- 목적: 외부 결제 제공업체와 통신하여 안전한 결제 처리를 담당.
- 참조: 데이터베이스 관리보다는 안전한 통신에 더 초점을 둠.

## 6. 재고 관리

- 데이터베이스: 관계형 데이터베이스 (예: MySQL)
- 목적: 제품 가용성을 추적하고 주문에 따라 재고를 업데이트.
- 참조: 재고 수준을 정확하고 일관되게 추적함(CodeKarle).

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

## 7. 검색 기능

- 데이터베이스: 검색 엔진 플랫폼 (예: Elasticsearch)
- 목적: 빠르고 정확한 검색 결과 제공.
- 참조: Elasticsearch는 효율적인 검색과 검색 결과를 제공하기 위해 설계되었으며, 이는 전자 상거래 플랫폼(Java Challengers)에 적합합니다.

## 8. 리뷰 및 평점

- 데이터베이스: 관계형 데이터베이스 (예: MySQL, PostgreSQL)
- 목적: 제품에 대한 사용자 리뷰 및 평점을 저장합니다.
- 참조: 리뷰와 평점이 일관되고 신뢰할 수 있게 저장 및 검색되도록 보장합니다.

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

## 9. 추천 시스템

- 데이터베이스: NoSQL 데이터베이스 (예: Cassandra, HBase) 및 데이터 처리를 위한 Hadoop
- 목적: 사용자의 행동 및 선호도에 기반한 맞춤형 추천 제공
- 참고: NoSQL 데이터베이스와 Hadoop은 확장성 및 대규모 데이터셋을 효율적으로 처리할 수 있는 능력 때문에 사용됨 (CodeKarle).

## 10. 분석 및 모니터링

- 데이터베이스: 데이터 웨어하우스 (예: Amazon Redshift, Google BigQuery) 및 대규모 데이터 처리를 위한 Hadoop
- 목적: 사용자 상호작용, 매출 및 시스템 성능에 대한 데이터 수집 및 분석
- 참고: 데이터 웨어하우스와 Hadoop은 대용량 데이터를 처리하고 복잡한 분석 쿼리를 수행하기에 적합함

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

## 11. 캐싱과 콘텐츠 전달

- 데이터베이스: 콘텐츠 전달 네트워크(CDN) 및 캐싱 레이어 (예: Redis, Memcached)
- 목적: 정적 콘텐츠를 캐싱하여 성능을 향상시키고 웹 서버 부하를 줄임.
- 참고: CDN 및 캐싱 레이어는 자주 요청되는 데이터에 빠르게 접근하여 사용자 경험을 향상시킴.

## 참고,

- https://www.systemdesignnotes.com/amazon-ecommerce-design
- https://www.codekarle.com/system-design/Amazon-system-design.html

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

# 전자 상거래 응용프로그램의 판매자용 아키텍처

- 자세한 내용은 [이 기사](https://medium.com/double-pointer/system-design-interview-amazon-flipkart-ebay-or-similar-e-commerce-applications-35a0bc764421)를 확인해주세요!
