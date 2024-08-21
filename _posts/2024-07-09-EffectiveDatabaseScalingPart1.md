---
title: "효과적인 데이터베이스 스케일링 방법 파트 1"
description: ""
coverImage: "/assets/img/2024-07-09-EffectiveDatabaseScalingPart1_0.png"
date: 2024-07-09 09:34
ogImage:
  url: /assets/img/2024-07-09-EffectiveDatabaseScalingPart1_0.png
tag: Tech
originalTitle: "Effective Database Scaling: Part 1"
link: "https://medium.com/@pujapandey73020/effective-database-scaling-part-1-fd3b216c6a69"
isUpdated: true
---

# 성능 및 용량 향상 전략

데이터베이스는 응용 프로그램이 원할하게 실행되도록 데이터를 저장, 관리 및 검색하는 데 중요합니다. 응용 프로그램이 성장하고 사용자 수가 증가함에 따라 데이터베이스는 더 많은 데이터 양, 동시 사용자 수 및 복잡한 쿼리를 처리해야 합니다.

효과적인 데이터베이스 확장은 성능과 사용자 경험을 유지하는 데 중요합니다. 이는 데이터 분산, 쿼리 최적화 및 하드웨어 자원을 효율적으로 활용하는 다양한 기술을 통해 부하를 증가시키기 위한 데이터베이스 인프라를 적응시키는 것을 포함합니다.

올바른 데이터베이스 확장 전략을 선택하는 것이 중요합니다. 잘못된 선택은 오히려 해를 끼칠 수 있으므로 올바른 접근 방식을 이해하고 구현하는 것이 성공의 핵심입니다.

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

데이터베이스 스케일링 전략은 응용 프로그램이 성장함에 따라 증가하는 부하를 관리하고 최적의 성능을 보장하는 기술입니다. 일반적으로 사용하는 몇 가지 전략은 다음과 같습니다:

예시 :

만약 제품명으로 제품을 자주 검색해야 하는 경우 아래와 같은 구조의 products 테이블이 있다고 가정해봅시다.

```js
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    in_stock INT
);

-- product_name 열에 인덱스 생성
CREATE INDEX idx_product_name ON products(product_name);
```

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

![Effective Database Scaling Part 1](/assets/img/2024-07-09-EffectiveDatabaseScalingPart1_0.png)

혜택 :

- I/O 작업 감소: 인덱스를 사용하여 검색해야 하는 데이터의 양을 줄이면 입력 및 출력 작업을 최소화하여 쿼리 실행을 빠르게 할 수 있습니다.
- 향상된 사용자 경험: 빠른 데이터 검색은 더 부드럽고 더 반응이 빠른 사용자 경험으로 이어지며, 이는 상호 작용이 많은 응용 프로그램에 중요합니다.
- 증가된 동시성: 인덱스를 통해 데이터베이스는 더 많은 쿼리를 처리하고 더 많은 동시 사용자를 수용할 수 있으므로, 데이터베이스가 대규모 사용자를 다루어야 하는 시나리오에서 유용합니다.
- 빠른 쿼리 성능: 인덱싱은 데이터 검색 속도를 크게 높여주어 데이터베이스가 전체 테이블을 스캔하지 않고 원하는 행을 빠르게 찾을 수 있습니다. 인덱스를 사용하면 특정 데이터에 대한 액세스가 더 효율적으로 이루어지며, 수백만 개의 레코드가 있는 대규모 데이터베이스에 특히 중요합니다. 인덱스는 데이터를 더 효율적으로 정렬하여 ORDER BY 및 GROUP BY 작업의 성능을 향상시킵니다. 인덱스는 책에서 특정 주제를 빠르게 찾기 위해 책의 색인을 사용하는 것과 유사하게 데이터베이스 내에서 빠른 검색을 가능하게 합니다. 인덱스는 테이블 결합에 대한 성능을 크게 향상시킬 수 있으며, 테이블을 결합하는 데 사용되는 키에 빠르게 액세스할 수 있습니다.

거래오프 :

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

인덱스를 저장하려면 본 테이블과 다른 별도의 테이블이 필요하며, 각 인덱스에는 디스크에 추가적인 공간이 필요합니다.

테이블에 데이터가 삽입, 업데이트 및 삭제될 때 해당 인덱스도 업데이트, 삭제 또는 삽입되어 데이터 일관성과 정확성을 유지해야 합니다.

예시:

다음 구조로 판매 테이블이 있는 경우:

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

```js
CREATE TABLE sales (
    transaction_id INT PRIMARY KEY,
    transaction_date DATE,
    product_id INT,
    quantity INT,
    amount DECIMAL(10, 2)
);
```

## 문제 설명

매번 계산할 필요 없이 매월 매출 총액을 빠르게 검색하고 싶습니다.

```js
-- 월별 매출 총액용 머티얼라이즈 뷰 생성
CREATE MATERIALIZED VIEW mv_monthly_sales_totals AS
SELECT
    DATE_TRUNC('month', transaction_date) AS month,
    SUM(amount) AS total_sales
FROM
    sales
GROUP BY
    DATE_TRUNC('month', transaction_date);
```

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

```js
-- 매월 판매 총액을 계산하기 위해 materialized view를 쿼리합니다.
SELECT * FROM mv_monthly_sales_totals;
```

장점:

- 쿼리 성능 향상: Materialized view는 미리 계산된 결과를 저장하여 데이터 검색 속도를 높입니다. 복잡한 쿼리나 집계에 대해 계산 시간이 오래 걸리는 경우에 유용합니다.
- 테이블에 대한 데이터베이스 부하 감소: 계산된 데이터를 저장함으로써, materialized view는 빈번하고 자원 집약적인 쿼리 실행이 필요하지 않습니다. 이는 전체 데이터베이스 부하를 낮추고 사용자 쿼리의 응답 시간을 개선하는 데 도움이 됩니다.

양보 사항:

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

- 추가 저장 공간을 사용하는 양
- 머티얼라이즈 뷰를 새로 고침하는 것은 특히 많은 데이터 세트를 사용할 수 있습니다.
- 머티얼라이즈 뷰는 소스 데이터와 이벤처얼 일관성을 가지고 있어서, 일정 기간 동안 오래된 데이터를 포함할 수 있습니다.

## 시나리오 예제: 웹 페이지 캐싱

웹 애플리케이션이 자주 홈페이지에 인기 제품 목록을 표시하는 시나리오를 고려해 봅시다. 사용자가 홈페이지를 방문할 때마다 데이터베이스에서 이 목록을 가져오는 대신, 애플리케이션은 캐싱을 사용하여 제품 목록을 빠르게 저장하고 검색합니다.

## 캐싱에 관련된 단계:

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

초기 요청:

- 사용자가 첫 방문 시 홈페이지에 방문하면, 웹 애플리케이션은 데이터베이스에서 인기 제품 목록을 가져옵니다.
- 이 데이터 검색은 필요한 정보를 수집하기 위해 복잡한 쿼리를 실행할 수도 있습니다.

데이터 캐싱:

- 제품 목록이 데이터베이스에서 검색되면, 웹 애플리케이션은 이 목록을 지정된 캐시 메모리나 저장 영역에 저장(또는 캐시)합니다. 일반적인 캐싱 메커니즘에는 Redis 또는 Memcached와 같은 메모리 내 캐시뿐만 아니라 브라우저 캐시도 포함됩니다.

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

나중에 나오는 요청:

- 홈페이지로 나오는 나중의 요청들에 대해서는, 데이터베이스를 다시 쿼리하는 대신, 웹 애플리케이션은 먼저 캐시를 확인합니다.
- 제품 목록이 캐시에 발견되고 만료되지 않았거나 무효화되지 않은 경우, 응용 프로그램은 캐시에서 직접 가져옵니다.

캐시 새로 고침:

- 주기적으로 또는 변경 사항이 발생할 때마다 (예: 새 제품이 인기를 얻을 때), 웹 애플리케이션이 캐시된 제품 목록을 업데이트합니다.
- 이 프로세스는 시간 간격에 기반하여 자동화될 수 있거나 데이터베이스의 제품 데이터에 변경 사항이 있을 때 수동으로 트리거될 수 있습니다.

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

혜택:

- 빠른 페이지 로드 시간: 제품 목록을 캐시에서 빠르게 검색하기 때문에 데이터베이스 쿼리를 기다리지 않아도 되어 사용자들이 빠른 로드 시간을 경험할 수 있습니다.
- 향상된 확장성: 웹 응용 프로그램은 캐시로부터 많은 요청을 직접 제공하여 데이터베이스를 과부하시키지 않고 더 많은 동시 사용자를 처리할 수 있습니다.
- 데이터베이스 부하 감소: 정적 또는 덜 자주 변경되는 데이터에 대한 데이터베이스 쿼리의 빈도를 줄임으로써, 캐시는 데이터베이스 서버의 부하를 줄여 전반적인 성능을 향상시킵니다.
- 일관된 사용자 경험: 캐시된 데이터로 인해 사용자들은 빈번하게 접근하는 정보에 빠르게 액세스할 수 있어 일관되고 반응성 있는 성능을 경험할 수 있습니다.

# 캐싱 사용의 희생해야 할 것들

- 메모리 오버헤드: 캐싱은 캐시된 데이터를 저장하기 위한 추가 메모리 자원이 필요합니다. 캐싱이 제대로 관리되지 않으면 대용량 데이터 세트나 자주 변경되는 데이터의 캐싱은 메모리 사용량과 자원 충돌 가능성이 증가할 수 있습니다.
- 캐시 무효화: 캐시된 데이터가 정확하고 최신 상태로 유지되도록 하는 것이 어려울 수 있습니다. 기본 데이터가 변경되면 캐시된 사본을 새로 고쳐야 하거나 무효화하여 사용자에게 오래된 정보를 제공하는 것을 방지해야 합니다.
- 일관성 문제: 캐싱은 캐시에서 새롭거나 오래된 데이터가 갱신되기 전에 제공될 때 일관성 문제를 야기할 수 있습니다. 이는 데이터 무결성 및 실시간 업데이트가 필수적인 응용 프로그램에서 특히 중요합니다.
- 구현 복잡성: 캐싱 전략을 구현하고 유지하는 것은 응용 프로그램 아키텍처에 복잡성을 추가합니다. 개발자들은 캐싱 메커니즘, 제거 정책 및 분산 시스템 간의 캐시 동기화를 고려해야 합니다.
- 캐시 미스 가능성: 데이터가 캐시에서 찾을 수 없을 때 (캐시 미스), 응용 프로그램은 기본 데이터 소스에서 가져오도록 되돌아가야 합니다. 이는 직접적인 캐시 히트에 비해 임시로 성능을 저하시킬 수 있습니다.
- 캐시 일관성: 분산 환경에서 여러 캐시 인스턴스나 노드 간의 캐시 일관성을 유지하는 것은 어려울 수 있습니다. 모든 캐시가 가장 최신의 데이터 상태를 반영하도록 보장하려면 신중한 동기화 및 일관성 메커니즘이 필요합니다.
- 개발 및 유지 관리 노력 증가: 효과적인 캐싱 전략을 디자인, 구현 및 유지 관리하는 데는 추가 개발 노력이 필요하며 성능 최적화 및 잠재적인 문제에 대응하기 위해 지속적인 모니터링이 필요합니다.

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

# 트레이드 오프 완화하기

- 캐시 관리 도구: 자동 캐시 무효화, 제거 정책, 모니터링 기능과 같은 기능을 제공하는 캐싱 프레임워크 및 도구를 사용하여 관리 부담을 완화합니다.
- 일관성 전략: 캐시 만료 시간, 캐시 무효화 이벤트 등 캐시와 주 데이터 원본 간의 데이터 일관성을 유지하기 위해 캐시 버전 관리와 같은 전략을 구현합니다.
- 성능 모니터링: 히트 비율, 제거 비율, 메모리 사용량 등 캐시 성능 메트릭스를 정기적으로 모니터링하여 캐싱 구성을 최적화하고 잠재적인 병목 현상을 식별합니다.
- 테스트 및 튜닝: 전체 시스템 성능 및 사용자 경험에 미치는 캐싱의 영향을 평가하고 이익이 트레이드 오프를 상회하는지 확인하기 위해 철저한 테스트와 성능 튜닝을 실시합니다.

## 고려 사항:

- 캐시 무효화: 캐시된 데이터가 정확하고 최신 상태를 유지하는 것이 중요합니다. 만료 시간 설정 또는 데이터 변경 시 수동으로 캐시 항목을 무효화하는 전략이 중요합니다.
- 캐시 제거 정책: 캐싱 시스템은 종종 캐시 크기를 관리하고 가장 자주 액세스될 가능성이 높은 데이터를 우선하는 제거 정책(예: LRU - 가장 최근에 사용된 것 우선)을 사용합니다.

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

앞으로 미래에 더 많은 콘텐츠를 기대해 주세요. 데이터 및 프로그래밍 관련 주제에 대한 업데이트 및 추가 정보를 위해 저를 팔로우해 주세요.

즐거운 학습 되세요!
