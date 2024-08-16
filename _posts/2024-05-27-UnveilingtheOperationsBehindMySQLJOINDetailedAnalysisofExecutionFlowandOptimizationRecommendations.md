---
title: "MySQL JOIN 뒤의 작업 공개 실행 흐름의 상세 분석과 최적화 권고사항"
description: ""
coverImage: "/assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_0.png"
date: 2024-05-27 19:27
ogImage: 
  url: /assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_0.png
tag: Tech
originalTitle: "Unveiling the Operations Behind MySQL JOIN: Detailed Analysis of Execution Flow and Optimization Recommendations"
link: "https://medium.com/itnext/unveiling-the-operations-behind-mysql-join-detailed-analysis-of-execution-flow-and-optimization-61ea0cc24225"
isUpdated: true
---




MySQL JOIN 실행 프로세스의 복잡성을 탐색하고 데이터베이스 성능을 향상시키기 위해 깊이있는 분석과 실용적인 최적화 기술을 제공해 드립니다. 쿼리 작업을 원활하게 하는 비밀에 대해 해체하고 있습니다.

![MySQL JOIN 동작의 세부 분석과 실행 흐름 및 최적화 권장 사항](/assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_0.png)

MySQL의 JOIN 작업에 대해 실행 프로세스를 고찰해 보거나 자신의 이해력에 대해 의문을 품어 보셨나요? 확인하는 방법이 불분명하다면, 다음 질문에 답하려고 시도해 보십시오.

- MySQL이 주도 테이블을 선택하는 방법은 고찰할 가치가 있는 문제입니다. 그것은 라인업에서 첫 번째 테이블부터 시작하여 왼쪽에서 오른쪽 순차적인 순서로 선택됩니까?
- 다중 테이블 조인을 수행할 때, 어떤 기준이 테이블을 조인하는 순서를 선택하는 데 도움이 되나요?

<div class="content-ad"></div>

시작하기 전에 주행 테이블의 개념을 이해하는 것이 중요합니다.

다중 테이블 조인 쿼리의 맥락에서 주행 테이블은 처리되는 첫 번째 테이블을 가리키며, 베이스 테이블이라고도 알려져 있습니다. 이 테이블의 레코드는 다른 테이블과 연관 지을 때 사용됩니다.

주행 테이블을 선택하는 것은 원칙을 준수합니다: 최종 결과 집합에 영향을 주지 않는 한 가장 작은 결과 집합을 가진 테이블을 우선적으로 주행 테이블로 선택합니다.

이 원칙은 이해하기 어려울 수 있습니다. 가장 작은 결과 집합을 추정하는 것은 가능하지만, 이것이 최종 결과 집합에 영향을 주지 않는 것을 판단하는 것은 더 복잡합니다. 그러나 이 과정은 파악할 수 있는 패턴이 존재합니다.

<div class="content-ad"></div>

LEFT JOIN은 일반적으로 왼쪽 테이블을 주도 테이블로 삼습니다 (RIGHT JOIN은 일반적으로 오른쪽 테이블을 포함합니다).

INNER JOIN에서는 결과 세트가 더 작은 테이블이 일반적으로 주도 테이블로 선택됩니다.

의문이 남는 경우, EXPLAIN을 사용하여 주도 테이블을 식별할 수 있습니다. 결과에서 첫 번째 테이블은 주도 테이블로 간주됩니다.

그러나 EXPLAIN이 항상 정확하지는 않을 수 있음을 유의해야 합니다.

<div class="content-ad"></div>

실행 계획은 실제 실행 중에 변경될 수 있습니다.

데이터 준비 중입니다.

InnoDB 엔진을 사용하여 MySQL 버전 5.7을 실행 중입니다.

데이터에 대한 초기 SQL은 다음과 같습니다:

<div class="content-ad"></div>

```js
DROP TABLE IF EXISTS tb_user;

CREATE TABLE tb_user (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50) NOT NULL,
  gender TINYINT(1) NOT NULL,
  created_at datetime NOT NULL,
  updated_at datetime NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO tb_user(user_name, gender, created_at, updated_at) VALUES
('Girvan', 1, NOW(), NOW()),
('Paul', 0, NOW(), NOW()),
('Max', 1, NOW(), NOW()),
('Brogan', 0, NOW(), NOW()),
('Aydan', 1, NOW(), NOW()),
('Colm', 0, NOW(), NOW()),
('Jason', 1, NOW(), NOW()),
('Quillan', 0, NOW(), NOW()),
('Donnacha', 1, NOW(), NOW()),
('Iarla', 0, NOW(), NOW());

DROP TABLE IF EXISTS tb_login_log;

CREATE TABLE tb_login_log (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50) NOT NULL,
  ip VARCHAR(15) NOT NULL,
  created_at datetime NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO tb_login_log(user_name, ip, created_at) VALUES
('Girvan', '192.168.1.101', '2024-01-01 12:01:01'),
('Girvan', '192.168.1.102', '2024-01-02 12:02:02'),
('Girvan', '192.168.1.103', '2024-01-03 12:03:33'),
('Paul', '192.168.1.104', '2024-01-04 12:00:01'),
('Max', '192.168.1.105', '2024-01-05 12:00:01'),
('Brogan', '192.168.1.106', '2024-01-06 12:00:01'),
('Aydan', '192.168.1.107', '2024-01-07 12:00:01'),
('Colm', '192.168.1.108', '2024-01-08 12:00:01');

SELECT * FROM tb_user;
SELECT * FROM tb_login_log;
``` 

단일 테이블 쿼리 실행 과정이 비교적 간단하며 다음과 같이 요약할 수 있습니다:

![query_execution_flow](/assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_1.png)

조인 알고리즘.

<div class="content-ad"></div>

MySQL의 조인 알고리즘은 중첩 루프 알고리즘에서 파생되었으며, 다양한 조건에 따라 선택된 일련의 알고리즘을 포함하고 있습니다.

인덱스 기반 조인을 사용할 때는 두 가지 알고리즘인 인덱스 중첩 루프 조인과 일괄 키 액세스 조인이 있습니다.

인덱스 기반 조인이 없을 때는 두 가지 알고리즘인 단순 중첩 루프 조인과 블록 중첩 루프 조인이 있습니다.

# 1. 단순 중첩 루프.

<div class="content-ad"></div>

간단한 중첩 루프 조인, 줄여서 SNL이라고도하는 것은 한 번에 한 레코드씩 일치시키는 것을 포함하며, 순차적으로 한 번에 하나씩 진행됩니다.

```js
for each row in t1 matching range {
  for each row in t2 matching reference key {
    for each row in t3 {
      if row satisfies join conditions, send to client
    }
  }
}
```

![MySQL 조인의 실행 흐름 및 최적화 권장사항에 대한 자세한 분석 이미지](/assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_2.png)

이 알고리즘은 직관적이지만 성능이 떨어지며, 시간 복잡성 측면에서 테이블의 레코드 수를 N, 조인된 테이블의 수를 M이라고 할 때 N의 M 제곱에 비례합니다.

<div class="content-ad"></div>

이를 최적화하기 위해 MySQL은 조인 쿼리에 대해 이러한 알고리즘을 사용하지 않습니다. WHERE 조건이 없고 ON 조인 키에 인덱스가 없는 경우에도 이 알고리즘을 사용하지 않습니다.

# 2. 블록 중첩 루프.

블록 중첩 루프 조인, 줄여서 BNL,은 SNL의 최적화 방법입니다.

주행 테이블의 여러 행을 한꺼번에 조인 버퍼에 캐싱하는 것을 포함합니다. 그런 다음, 조인 버퍼의 데이터가 일치하도록 매치할 수 있게 배치되며, 이는 내부 루프에서 검색한 데이터와 유사한 방식으로 작동합니다.

<div class="content-ad"></div>

```js
for each row in t1 matching range {
  for each row in t2 matching reference key {
    store used columns from t1, t2 in join buffer
    if buffer is full {
      for each row in t3 {
        for each t1, t2 combination in join buffer {
          if row satisfies join conditions, send to client
        }
      }
      empty join buffer
    }
  }
}

if buffer is not empty {
  for each row in t3 {
    for each t1, t2 combination in join buffer {
      if row satisfies join conditions, send to client
    }
  }
}
```

내부 루프에서 검색된 각 행을 버퍼의 모든 레코드와 비교함으로써 내부 루프에서의 테이블 읽기 횟수를 줄일 수 있습니다.

예를 들어, Join 버퍼가 없을 경우 주도 테이블이 30개 레코드를 가지고 있고 대입 테이블에 50개 레코드가 있을 때 내부 루프는 30 * 50 = 1500 개의 테이블 읽기를 요구합니다.

그러나 Join 버퍼가 있고 10개 레코드를 저장할 수 있는 경우 (Join 버퍼에는 주도 테이블로부터 쿼리에서 사용된 열이 저장되며, SELEC 열, ON 열, WHERE 열이 포함됩니다), 내부 루프는 30 / 10 * 50 = 150 개의 테이블 읽기만 필요합니다.

<div class="content-ad"></div>

주어진 테이블이 수행해야 하는 읽기 작업의 수를 한 차원 줄입니다.

이 알고리즘은 주어진 테이블이 조인 키에 인덱스가 없고 WHERE 필터링 조건에도 인덱스가 없는 경우에 자주 사용됩니다. 이러한 경우에는 다음과 같이 접근합니다:

![이미지 1](/assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_3.png)

![이미지 2](/assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_4.png)

<div class="content-ad"></div>

# 3. 인덱스 중첩 루프.

인덱스 중첩 루프 조인(약어: INL)은 조인을 수행하기 위해 주도 테이블의 인덱스를 기반으로 하는 알고리즘입니다.

이 알고리즘에서는 주도 테이블의 레코드가 주도 테이블의 인덱스와 일대일로 일치하도록 하나씩 매칭됩니다.

이렇게 하면 주도 테이블의 모든 레코드와 비교할 필요가 없어져 주도 테이블과의 매칭 작업 수를 줄일 수 있습니다. 일반적인 프로세스는 아래 다이어그램에 설명되어 있습니다:

<div class="content-ad"></div>

![image 5](/assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_5.png)

실제 예제를 살펴보겠습니다. 먼저 쿼리를 사용하여 tb_login_log 테이블에 인덱스를 추가해 봅시다. ALTER TABLE tb_login_log ADD INDEX idx_user_name (user_name). 그 후에 조인을 위한 실행 계획을 확인해 봅시다.

![image 6](/assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_6.png)

tb_login_log 테이블에 대한 인덱스가 현재 작용하는 것을 관찰할 수 있습니다.

<div class="content-ad"></div>

우리는 WHERE 조건을 포함한 쿼리를 테스트하기로 하겠습니다.

![image](/assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_7.png)

흥미로운 사건이 발생했습니다: 주도 테이블이 tb_login_log로 변경되었고, tb_user가 이제 기동 테이블이 되었습니다.

tb_login_log의 인덱스를 거쳐 결과 집합을 얻은 후, BNL 알고리즘이 이 결과 집합과 tb_user 테이블을 일치시키는 데 사용됩니다.

<div class="content-ad"></div>

MySQL의 이 최적화는 tb_login_log에서의 인덱스 필터링을 통해 얻은 결과 집합이 tb_user의 레코드 수보다 작기 때문에 발생합니다. 결과적으로 MySQL은 주도 테이블로 tb_login_log를 선택했습니다.

## 4. 배치 키 액세스.

배치 키 액세스(Batched Key Access) 또는 BKA는 인덱스 중첩 루프(INL) 알고리즘의 최적화입니다.

배치 키 액세스(BKA)가 인덱스 중첩 루프(INL) 알고리즘에 제공하는 최적화는 배치 키 액세스가 단순 중첩 루프(SNL) 알고리즘에 제공하는 향상과 유사합니다. 그러나 둘 사이에는 구별점이 있습니다.

<div class="content-ad"></div>

먼저, 다음 쿼리를 사용하여 tb_user 테이블에 인덱스를 추가하세요: ALTER TABLE tb_user ADD INDEX i_aaa(user_name);.

그 다음, 다음 쿼리를 사용하여 실행 계획을 확인하세요: EXPLAIN SELECT * FROM tb_login_log tl LEFT JOIN tb_user tu ON tl.user_name = tu.user_name.

결과는 다음 다이어그램과 비슷해야 합니다:

<img src="/assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_8.png" />

<div class="content-ad"></div>

지금 시점에서 조인 알고리즘은 INL입니다. 그 이유는 tb_login_log 테이블의 user_name 열에 색인이 없기 때문입니다.

결과적으로, user_name 열에서 tb_login_log 테이블에서 검색된 값은 정렬되지 않습니다.

tb_user와 연관시킬 때 일치 과정은 아래 다이어그램과 유사한 i_aaa 색인에 무작위 액세스를 포함합니다.

![다이어그램](/assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_9.png)

<div class="content-ad"></div>

BKA 기능은 기본적으로 비활성화되어 있습니다 (batched_key_access=off). 이를 활성화하려면 다음 명령을 실행하세요:

```js
SET optimizer_switch='mrr=on,mrr_cost_based=off,batched_key_access=on';
```

![이미지](/assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_10.png)

tb_login_log에서 검색된 user_name의 값은 먼저 조인 버퍼에 배치됩니다.

<div class="content-ad"></div>

조인 버퍼가 가득 차거나 데이터 검색이 완료되면 조인 버퍼의 값이 정렬됩니다.

이후에 버퍼는 tb_user와 연관시켜 사용되어, i_aaa 인덱스와 연속적으로 일치시킵니다. 아래 다이어그램과 유사한 방식입니다.

![다이어그램](/assets/img/2024-05-27-UnveilingtheOperationsBehindMySQLJOINDetailedAnalysisofExecutionFlowandOptimizationRecommendations_11.png)

요약.

<div class="content-ad"></div>

- Index Nested-Loop join (INL)는 주테이블의 각 행을 드라이븐 테이블의 인덱스와 비교하여 레코드를 매칭하는 알고리즘입니다.
- Batched Key Access join (BKA)는 INL의 최적화로, 주테이블의 값들이 먼저 조인 버퍼에 배치되고 정렬된 후 드라이븐 테이블의 인덱스와 순차적으로 매칭에 사용됩니다.
- 조인 쿼리의 최적화를 위해 MySQL은 사용 가능한 인덱스, 결과 집합 크기 및 필터링 조건과 같은 요소를 기반으로 가장 효율적인 알고리즘을 동적으로 선택할 수 있습니다.
- 실행 계획을 이해하고 EXPLAIN을 사용하며 인덱스를 고려하는 것은 MySQL에서 조인 쿼리의 성능을 최적화하고 분석하는 데 도움이 됩니다.

이런 이야기를 좋아하시고 제 지원을 원하신다면, 박수를 부탁드립니다.

여러분의 지원은 저에게 매우 중요합니다. 감사합니다.