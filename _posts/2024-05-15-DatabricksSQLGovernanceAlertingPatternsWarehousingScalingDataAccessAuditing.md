---
title: "데이터브릭스 SQL 관리 경고 패턴 - 데이터 웨어하우징 확장  데이터 액세스 감사"
description: ""
coverImage: "/assets/img/2024-05-15-DatabricksSQLGovernanceAlertingPatternsWarehousingScalingDataAccessAuditing_0.png"
date: 2024-05-15 11:02
ogImage: 
  url: /assets/img/2024-05-15-DatabricksSQLGovernanceAlertingPatternsWarehousingScalingDataAccessAuditing_0.png
tag: Tech
originalTitle: "Databricks SQL Governance Alerting Patterns — Warehousing Scaling + Data Access Auditing"
link: "https://medium.com/dbsql-sme-engineering/databricks-sql-governance-alerting-patterns-warehousing-scaling-data-access-auditing-674275024908"
---


아래와 같이 Markdown 형식으로 표 태그를 변경해주세요.


| Tag | Description |
| --- | ----------- |
| `<html>` | Defines an HTML document |
| `<body>` | Defines the body of the HTML document |
| `<h1>` | Defines a large heading |




워크스페이스 관리자로서, 사용자들에게 원활하고 성능이 우수한 데이터브릭 경험을 제공하는 것이 중요합니다. 동시에 데이터 접근 권한에서 최소 권한 원칙을 따르지 않는 위험한 행동을 방지해야 합니다. 데이터브릭 API, 시스템 테이블 및 데이터브릭 SQL (DBSQL)의 강력함으로 워크스페이스 관리자와 데이터 관리자는 데이터브릭 플랫폼에서의 사용 사항 거의 모든 측면을 추적할 수 있습니다. 이 블로그에서는 워크스페이스 관리자가 데이터 창고 성능을 모니터링하고 데이터 접근 권한이 높고 과도하게 허용되는 것을 모니터링하기 위한 알람을 설정하는 방법을 살펴보겠습니다.

# 사례 1 — 컴퓨팅 성능 모니터링

데이터브릭 SQL 웨어하우스에서는 시스템을 가로 및 세로로 확장할 수 있습니다. 우리는 티셔츠 사이즈(x-small, small, medium 등)를 통해 세로로 확장하여 주어진 쿼리에 대해 CPU 및 메모리를 추가할 수 있습니다. 또한 웨어하우스는 웨어하우스에 더 많은 클러스터를 추가함으로써 가로로 확장됩니다. 이는 웨어하우스 생성자가 오토스케일링을 활성화한 경우 자동으로 발생합니다. 그러나 웨어하우스 구성의 티셔츠 사이즈와 오토스케일링 범위(웨어하우스의 최소 및 최대 클러스터 수)를 이해하는 것은 종종 시범 및 오류 연습일 수 있습니다. 특히 웨어하우스의 사용이 쿼리 복잡성, 쿼리된 테이블 크기 또는 동시 사용자 수의 변화로 인해 시간이 지남에 따라 변하는 경우, 성능 메트릭에 대한 경고는 웨어하우스 생성자가 구성을 조정해 사용자에게 더 나은 쿼리 성능을 제공할 시기를 이해하도록 도와줄 수 있습니다.

이 첫 번째 연습에서는 쿼리 기록 API(공식 시스템 테이블 —  비공개 미리보기 예정)을 활용하여 큰 수의 쿼리가 대기 중인 경우나 쿼리가 디스크로 데이터를 쓰는 경우에 웨어하우스 관리자에게 알림을 보낼 수 있는 테이블을 만들 것입니다.



쿼리 기록 데이터를 수집하는 파이프라인 설정하기

저희의 웨어하우스 사용량 및 크기에 기반한 알림을 설정하기 위해 먼저 쿼리 기록 API를 수집할 파이프라인을 생성해야 합니다 (참고: 이 플랫폼에 곧 도입될 쿼리 기록 시스템 테이블이 있습니다. 이 테이블을 통해 API를 사용하지 않고도 이 정보를 얻을 수 있을 것입니다. 현재 개인 미리보기 상태입니다). 이 API에는 워크스페이스 내에서 실행된 모든 쿼리에 대한 데이터가 포함되어 있습니다. 웨어하우스 ID나 사용자 ID와 같은 기본 정보부터 쿼리 프로파일러 UI에서 찾을 수 있는 성능 지표까지 포함됩니다(API를 호출할 때 "include_metrics" 플래그를 True로 설정하여 이러한 메트릭이 반환되도록 해야 합니다). Databricks Python SDK를 사용하여 작성된 노트북을 통해 지난 1시간 동안 실행된 모든 쿼리를 추출할 수 있습니다.

```js
#import and setup the SDK
from databricks.sdk import WorkspaceClient
from databricks.sdk.service import sql

w = WorkspaceClient()


#현재 시간과 관심 시간 창의 시작점을 반환하는 함수
#(이 경우 지난 1시간 동안 실행된 모든 쿼리를 가져올 것입니다)
import datetime
import time

def get_current_time_and_minus_one_hour():
  current_time = datetime.datetime.now()
  current_time_sub_hour = current_time - datetime.timedelta(hours=1)

  current_time_ms = int(time.mktime(current_time.timetuple()))*1000
  current_time_sub_hour_ms = int(time.mktime(current_time_sub_hour.timetuple()))*1000

  return current_time_ms, current_time_sub_hour_ms


#API를 호출하여 지난 1시간 동안 실행된 모든 쿼리 기록을 가져옴
import json
import pandas as pd
from pyspark.sql.functions import lit

current_time_ms, current_time_sub_hour_ms = get_current_time_and_minus_one_hour()

#SDK를 사용하여 API를 호출
queries = w.query_history.list(
    filter_by=sql.QueryFilter(
        query_start_time_range=sql.TimeRange(
            start_time_ms=current_time_sub_hour_ms, end_time_ms=current_time_ms
        ) #지난 1시간의 시간 범위로 필터링
    ),
    include_metrics=True  #쿼리의 메트릭을 포함
)

#반환된 쿼리 기록을 사전으로 변환
queries_as_dicts = [query.as_dict() for query in queries]

#pandas 데이터프레임을 생성한 다음 pySpark 데이터프레임으로 변환
queries_pandas = pd.DataFrame(queries_as_dicts)
queries_df = spark.createDataFrame(queries_pandas)

#향후 분석을 위해 쿼리가 속한 시간 창을 추가
queries_df_with_window = queries_df.withColumn("start_window", lit(current_time_sub_hour_ms)).withColumn("end_window", lit(current_time_ms))

#알림 및 분석에 사용할 테이블에 데이터프레임 추가
queries_df_with_window.write.mode("append").saveAsTable("shared.tomasz_alerts.query_history")
```

이 노트북을 통해 워크스페이스에서 지난 1시간 동안 실행된 모든 쿼리 기록을 수집하고 Delta 테이블에 추가하는 수집 프로세스를 설정했습니다. 이제 이 테이블은 모니터링을 위해 쿼리할 수 있으며 더 중요한 것은 사용자가 쿼리 실행 시 성능이 저하될 때 경고를 설정할 수 있습니다. 이제 이 테이블을 사용하여 웨어하우스를 변경하는 시기를 결정하는 방법을 살펴보겠습니다.



## 대기열에서 막힌 쿼리를 찾는 방법

웨어하우스가 많은 사용자 사이에서 공유되기 때문에 너무 많은 동시 쿼리가 발생하면 웨어하우스가 처리할 수 있는 리소스가 이용 가능할 때까지 대기열이 발생할 수 있습니다. 이러한 병목 현상은 대부분 자동으로 오토스케일링을 통해 해결될 수 있지만, 관리자는 주어진 SLA에 맞는 허용 가능한 최대 클러스터 개수의 건장한 상한선을 찾아야 합니다. 따라서, 관리자는 웨어하우스의 적절한 크기를 결정하기 위해 최소 클러스터 설정을 늘리고 자주 발생하는 스케일 업을 줄이며 최대 클러스터 설정을 늘려 대기열 병목 현상을 제거해야 합니다.

아래 쿼리는 이전 단계에서 생성한 테이블을 호출할 것입니다. 가장 최근의 시간대 창을 사용하며, 1초 이상 대기열 단계에 갇힌 쿼리를 필터링합니다.

```js
select
  sum(
    metrics.query_compilation_start_timestamp - metrics.overloading_queue_start_timestamp
  ) as waiting_for_compute_duration_ms,
  count(*) as count_queries_waiting_for_compute,
  warehouse_id
from
  query_history
where
  end_window = (
    select
      max(end_window)
    from
      query_history
  )
  and metrics.query_compilation_start_timestamp - metrics.overloading_queue_start_timestamp > 1000
group by
  warehouse_id
order by
  waiting_for_compute_duration_ms desc
```



위 쿼리 결과를 기반으로 하여 창고 관리자는 SQL 창고 모니터링 페이지를 검토하여 대기 시간이 매우 긴 경우를 확인할 수 있습니다. 창고가 최대 클러스터 수로 확장되었을 때 많은 쿼리 대기가 발생했다면, 관리자는 이 최대 제한을 늘려야 합니다. 반면에, 창고가 설정된 최대 클러스터 수에 도달하지 않았을 경우, 대기열의 원인은 아마도 빈번한 오토스케일링 때문일 것입니다. 이 경우, 관리자는 창고의 최소 클러스터 설정값을 더 높은 값으로 조정해야 합니다.

디스크 스피룰링이 발생하는 창고 식별

좋지 않은 쿼리 성능의 일반적인 원인 중 하나는 사용 중인 창고가 수평 스케일링(티셔츠 사이징) 면에서 적절하게 크기가 조정되지 않은 경우입니다. 이는 쿼리 실행 시간을 원하는 SLA와 비교하여 측정할 수 있습니다. 그러나 먼저, 이 문제가 있는지 여부를 결정하는 일반적인 전략은 쿼리가 자주 디스크로 스피릴하는 경우 트리거되는 경고를 설정하는 것입니다. 이는 클러스터가 단순히 메모리에 데이터를 처리하기에 너무 작거나 데이터에 중요한 스키가 있는 경우일 수 있음을 의미합니다.

다음 쿼리는 우리의 쿼리 히스토리 테이블을 사용하여 디스크로 스피릴하는 쿼리의 수와 평균 및 최대 값에 대한 카운트를 반환합니다.



```sql
select
  avg(metrics.spill_to_disk_bytes) as avg_spill_to_disk_bytes,
  max(metrics.spill_to_disk_bytes) as max_spill_to_disk_bytes,
  count(*) as count_queries_spilled,
  warehouse_id
from
  query_history
where
  end_window = (
    select
      max(end_window)
    from
      query_history
  )
group by
  warehouse_id
having
  avg_spill_to_disk_bytes > 0
order by
  avg_spill_to_disk_bytes desc
```

해당 쿼리 결과를 통해 데이터 웨어하우스 관리자는 많은 양의 디스크 스파일이 발생하는 웨어하우스를 확인할 수 있습니다. 이를 기반으로 해당 웨어하우스 클러스터를 더 큰 크기로 구성하여 더 많은 메모리 용량을 추가하고, 디스크 스파일을 줄이거나 제거할 수 있습니다.

## 데이터 적재 및 경보 파이프라인 설정

데이터를 적재하고 웨어하우스 관리자에게 사이즈를 재구성해야 할 때를 알려주는 경보를 활성화하는 Databricks 워크플로우를 설정할 수 있습니다. 이를 위해 먼저 위의 쿼리들 각각에 대한 두 개의 경보를 설정할 수 있습니다. 여기 예시에서는 임계값을 0보다 큰 고유한 웨어하우스로 설정하여, 디스크 스파일이나 대기 시간 초과가 발생할 때마다 경보가 트리거됩니다.





![Databricks SQL Governance Alerting Patterns Warehousing Scaling Data Access Auditing 1](/assets/img/2024-05-15-DatabricksSQLGovernanceAlertingPatternsWarehousingScalingDataAccessAuditing_1.png)

![Databricks SQL Governance Alerting Patterns Warehousing Scaling Data Access Auditing 2](/assets/img/2024-05-15-DatabricksSQLGovernanceAlertingPatternsWarehousingScalingDataAccessAuditing_2.png)

쿼리 임계값(디스크로 스파일되는 크기 및 대기 시간)과 경고 임계값은 성능이 느린 쿼리에 대한 허용 수준에 따라 조정할 수 있습니다. 또한 쿼리 스파일 비율이나 쿼리 스파일 빈도에 따라 경고도 트리거할 수 있으며, 이는 데이터 웨어하우스를 확장하거나 쿼리 자체의 문제를 식별할 필요가 있음을 더 잘 나타낼 수 있습니다. 이러한 경고가 설정되면 먼저 쿼리 이력 API 데이터 처리 노트북을 실행하고 이러한 경고를 새로 고침하는 워크플로우를 생성할 수 있습니다. 워크플로에 경고를 추가하려면 "작업 추가" 버튼을 클릭한 후 SQL - 경고 옵션을 선택합니다. 이전 단계에서 생성한 경고를 선택하여 최종 워크플로 작업 다이어그램을 얻을 수 있습니다.

이 워크플로는 데이터 웨어하우스의 성능 허용 수준에 따라 매 시간 또는 매일 실행되도록 예약할 수 있습니다. 쿼리 이력 시스템 테이블이 공개 미리보기로 제공되면 데이터 처리를 제거하고 이러한 경고를 DBSQL에서 직접 실행하도록 트리거할 수 있습니다!




디스크 스피릴과 대기열 간의 관계

수직으로 확장된 창고는 수평으로 확장할 필요성을 제거할 수 있다는 점을 강조해야 합니다. 예를 들어, 창고에서 쿼리가 완료되기까지 매우 오랜 시간이 걸릴 수 있으며, 위의 디스크로 스피릴이라는 경보로 나타날 수 있습니다. 이러한 상황에서 초기 실행 중인 쿼리가 완료될 때까지 신규 쿼리가 대기열에 들어가 있을 수 있습니다. 따라서 예를 들어 중간 규모에서 대형 클러스터로 수직으로 확장되면, 초기 실행 중인 쿼리가 더 빨리 완료되는 것 뿐만 아니라 대기 중인 쿼리 수도 줄어들 확률이 높습니다.

동일한 맥락에서 창고를 가로로 확장하여 클러스터를 더 추가함으로써 복잡한 쿼리에 더 많은 전용 자원을 할당할 수 있으며, 작은 쿼리는 다른 클러스터로 리디렉션할 수 있습니다. 따라서 창고에 더 많은 클러스터를 추가하여 수평으로 확장함으로써 동적 쿼리 실행 중 발생하는 디스크 스피릴 양도 줄일 수 있습니다.

# Use Case 2 — 모니터링 액세스 제어



Databricks 웨어하우스를 사용할 때 설정할 수 있는 또 다른 유용한 경고는 액세스 제어와 관련된 것입니다. 데이터 관리자 및 지배 관리자의 주요 관심사 중 하나는 사용자가 너무 허용적인 액세스를 허용받은 경우에 대해 이해하는 것입니다. 모베스트 프랙티스에서 벗어나는 권한 부여에 대한 경고를 설정하기 위한 기본 작업을 수행하려면 조직은 사용자가 일반적인 액세스 영역을 벗어나 데이터에 액세스해야 하는 방법을 정의하는 프로토콜 집합을 미리 정의해야 합니다. 이러한 관행이 정의된 상태에서 경고를 사용하여 표준 운영 절차에서 벗어나는 경우를 이해할 수 있습니다. 아래 예에서는 시스템 테이블에 대한 경고를 사용하여 관리자가 사용자가 민감한 PII 데이터에 액세스를 허용했을 때와 사용자에게 읽기 권한 대신 쓰기 액세스를 부여받았을 때 모니터링할 수 있습니다.

## 개별 사용자에 대한 편집 권한

Unity Catalog를 활용할 때 일반적인 모베스트 프랙티스는 개별 사용자에 직접 권한을 부여하는 대신 사용자 그룹을 통해 데이터 액세스를 관리하는 것입니다. 카탈로그는 팀 또는 프로젝트를 위해 생성되어야 하고 해당 카탈로그에 대한 소유자, 편집자 및 판독자 사용자 그룹이 데이터 액세스에 사용되어야 합니다. 그러나 다른 팀의 동료가 해당 카탈로그에 ad-hoc 액세스가 필요한 경우, 지배 관리자는 임시적인 권한 부여를 위해 그들을 기존 그룹 중 하나로 추가하길 원하지 않을 수 있습니다. 이 경우에는 이러한 사용자를 위해 사전에 생성된 게스트 사용자 그룹을 만들어 임시 액세스를 부여할 수 있습니다. 이를 통해 액세스를 사용자 계정을 통해 직접 제공하는 것과 비교할 때 지배를 더 쉽게 할 수 있습니다.

지배 모베스트 프랙티스가 정립된 후에는 표준을 벗어나는 권한 부여 행동을 감시하기 위해 경고를 설정할 수 있습니다. 따라서 ad hoc 사용자 권한을 위해 게스트 그룹을 사용하는 모베스트 프랙티스에 따라 사용자 계정(사용자 그룹이 아닌 사용자 계정)이 카탈로그, 스키마 또는 테이블에 직접 액세스를 제공받았을 때 식별하기 위한 쿼리를 설정할 수 있습니다. 이 예에서는 권한을 MODIFY 또는 ALL_PRIVILEGES만 필터링하지만 구성 규칙이 조직 내에서 얼마나 엄격한지에 따라 READ 권한을 포함할 수 있습니다.



```js
-- 테이블, 스키마 또는 카탈로그 수준에서 직접 사용자 계정에 부여된 모든 쓰기 권한 (MODIFY 또는 ALL_PRIVILEGES)를 가져오십시오.
SELECT
  event_time,
  user_identity.email as granter,
  request_params.changes as perm_changes,
  audit.request_params.securable_type as securable_type,
  request_params.securable_full_name as securable_full_name
FROM
  system.access.audit
WHERE
  audit.service_name = "unityCatalog"
  AND audit.action_name = "updatePermissions"
  AND audit.request_params.securable_type in ("catalog", "schema", "table")
  AND audit.event_time > (current_timestamp() - INTERVAL 70 MINUTES)
  AND audit.response.status_code = 200
  AND request_params.changes:[*].principal like "%@databricks.com%" -- 조직 이메일 도메인
  AND (
    array_contains(
      flatten(
        from_json(
          request_params.changes:[*].add,
          'array<array<string>>'
        )
      ),
      "MODIFY"
    )
    OR array_contains(
      flatten(
        from_json(
          request_params.changes:[*].add,
          'array<array<string>>'
        )
      ),
      "ALL_PRIVILEGES"
    )
  )
```

이 문서에서는 조직의 도메인("databricks.com")을 사용하여 사용자 계정이 데이터 자산에 직접 쓰기 액세스 권한이 부여된 것을 식별합니다. 이 예시에서는 매 시간마다 스케줄을 설정했으므로, 70분 전까지의 감사 테이블을 확인하는 필터가 있습니다(감사 테이블 업데이트에 지연이 있기 때문입니다).

이 쿼리를 매 시간 실행하고 결과 레코드가 반환되면 데이터의 행 수를 선택하여 반환된 값이 0보다 크면 경고를 설정할 수 있습니다.

<img src="/assets/img/2024-05-15-DatabricksSQLGovernanceAlertingPatternsWarehousingScalingDataAccessAuditing_3.png" />




<img src="/assets/img/2024-05-15-DatabricksSQLGovernanceAlertingPatternsWarehousingScalingDataAccessAuditing_4.png" />

## 민감한 개인 식별 정보(PII) 테이블에 대한 권한

다른 일반적인 Unity 카탈로그 패턴은 데이터에 민감한 PII(개인 식별 정보)가 포함되어 있음을 나타내는 테이블이나 열에 태그를 붙이는 것입니다. 따라서 이러한 데이터는 특정 사용자 집합에만 제한되어야 합니다. "pii" 태그가 있는 모든 테이블과 열을 찾아서 해당 테이블 및 스키마, 카탈로그 목록을 가져올 수 있는 정보 스키마 시스템 테이블을 사용할 수 있습니다. 그런 다음 이 목록을 권한 부여를 통해 교차 참조할 수 있습니다. 이 쿼리에 대한 알림을 설정하면 관리자는 이러한 민감한 자산에 추가된 모든 권한을 알 수 있어 잘못된 권한이 설정되지 않았는지 확인할 수 있습니다.

```js
-- "pii"를 포함하는 열 태그 또는 테이블 태그가 있는 모든 테이블(및 해당 카탈로그와 스키마) 찾기
WITH table_tags_union AS (
  SELECT
    explode(
      array(
        catalog_name,
        CONCAT(catalog_name, ".", schema_name),
        CONCAT(catalog_name, ".", schema_name, ".", table_name)
      )
    ) as securable_full_name
  FROM
    system.information_schema.column_tags
  WHERE
    tag_name LIKE "%pii%"
    OR tag_value LIKE "%pii%"
  GROUP BY
    all
  UNION
    DISTINCT
  SELECT
    explode(
      array(
        catalog_name,
        CONCAT(catalog_name, ".", schema_name),
        CONCAT(catalog_name, ".", schema_name, ".", table_name)
      )
    ) as securable_full_name
  FROM
    system.information_schema.table_tags
  WHERE
    tag_name LIKE "%pii%"
    OR tag_value LIKE "%pii%"
  GROUP BY
    all
) 
-- "pii" 태그가 있는 시큐러블과 권한 추가가 있었던 감사 로그를 조인
SELECT
  event_time,
  user_identity.email,
  request_params.changes,
  request_params.securable_type,
  request_params.securable_full_name
FROM
  system.access.audit
  INNER JOIN table_tags_union ON audit.request_params.securable_full_name = table_tags_union.securable_full_name
WHERE
  audit.service_name = 'unityCatalog'
  AND audit.action_name = 'updatePermissions'
  AND audit.event_time > (current_timestamp() - INTERVAL 70 MINUTES)
  AND audit.response.status_code = 200
  AND audit.request_params.changes:[*].add is not null
```




이전 설정에서와 마찬가지로, PII 데이터에 액세스가 허용된 경우 트리거되는이 쿼리에 대한 경고를 생성할 수 있습니다.

![Alert Image 5](/assets/img/2024-05-15-DatabricksSQLGovernanceAlertingPatternsWarehousingScalingDataAccessAuditing_5.png)

![Alert Image 6](/assets/img/2024-05-15-DatabricksSQLGovernanceAlertingPatternsWarehousingScalingDataAccessAuditing_6.png)

# 결론



쿼리 히스토리 API, 시스템 테이블, DBSQL 및 Databricks Workflows 등을 통해 관리자가 워크스페이스를 모니터링하여 플랫폼의 최종 사용자들에게 원활하고 안전한 경험을 제공하는 데 활용할 수 있는 다양한 방법의 몇 가지 예시에요. 이러한 쿼리와 알림은 조직의 요구 사항에 따라 성능 및 거버넌스에 관한 부분을 수정할 수 있어요. 원하는 거버넌스 및 모니터링 주제가 있으시면 직접 연락해 주세요!