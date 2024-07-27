---
title: "PostgreSQL 쿼리를 최적화하는 방법 "
description: ""
coverImage: "/assets/img/2024-06-22-HowtoOptimizePostgreSQLQueries_0.png"
date: 2024-06-22 13:57
ogImage: 
  url: /assets/img/2024-06-22-HowtoOptimizePostgreSQLQueries_0.png
tag: Tech
originalTitle: "How to Optimize PostgreSQL Queries"
link: "https://medium.com/@nodeteam/how-to-optimize-postgresql-queries-226e6ff15f72"
---


<img src="/assets/img/2024-06-22-HowtoOptimizePostgreSQLQueries_0.png" />

PostgreSQL은 강력하고 높은 사용자 정의 가능성을 가진 오픈 소스 관계형 데이터베이스 관리 시스템입니다. PostgreSQL은 높은 효율성을 갖도록 설계되었지만, 쿼리 성능을 최적화하여 개선할 수 있습니다. PostgreSQL 쿼리를 최적화하는 몇 가지 팁은 다음과 같습니다:

## 1. 인덱스 사용

이메일로 사용자를 자주 검색하는 경우, “users”라는 테이블이 있고 “id”, “name”, “email” 열이 있다고 가정해보겠습니다. 이 경우 “email” 열에 인덱스를 생성할 수 있습니다.

<div class="content-ad"></div>


```js
CREATE INDEX users_email_idx ON users (email);
```

## 2. Use EXPLAIN

Suppose you have a query that joins two tables and returns the total number of rows:

```js
EXPLAIN SELECT COUNT(*) FROM table1 JOIN table2 ON table1.id = table2.table1_id;
```  


<div class="content-ad"></div>

EXPLAIN 명령은 쿼리의 실행 계획을 출력하여 성능 문제를 식별하는 데 도움이 됩니다.

## 3. 와일드카드 문자 사용을 피하세요

예를 들어 email 주소가 "@example.com"으로 끝나는 모든 사용자를 검색하는 쿼리가 있다고 가정해봅시다:

```js
SELECT * FROM users WHERE email LIKE '%@example.com';
```

<div class="content-ad"></div>

이 쿼리는 "users" 테이블 전체를 순차적으로 스캔하여 실행되며, 테이블이 크다면 느릴 수 있습니다. 이 쿼리를 최적화하려면 다음과 같이 다시 작성할 수 있습니다:

```js
SELECT * FROM users WHERE email LIKE '@example.com%';
```

이 쿼리는 1단계에서 생성된 인덱스를 사용하고 훨씬 더 빠른 인덱스 스캔을 수행할 것입니다.

## 4. 반환된 행의 수 제한:

<div class="content-ad"></div>

"users" 테이블에서 모든 사용자를 반환하는 쿼리가 있다고 가정해보세요:

```js
SELECT * FROM users;
```

이 쿼리는 테이블이 큰 경우 느리고 자원을 많이 사용할 수 있습니다. 이 쿼리를 최적화하려면 LIMIT 절을 사용하여 반환되는 행 수를 제한할 수 있습니다:

```js
SELECT * FROM users LIMIT 100;
```

<div class="content-ad"></div>

이 쿼리는 성능을 향상시킬 수 있도록 처음 100개의 행만 반환합니다.

## 5. 적절한 데이터 유형 사용:

만일 "users" 테이블에 사용자의 나이를 정수로 저장하는 "age"라는 열이 있다고 가정해보겠습니다. 사용자의 평균 연령을 자주 계산한다면 "integer" 대신 "smallint"와 같은 더 작은 데이터 유형을 사용하여 성능을 최적화할 수 있습니다:

```js
ALTER TABLE users ALTER COLUMN age TYPE smallint;
```

<div class="content-ad"></div>

표 태그를 마크다운 형식으로 변경하면 메모리 사용량을 줄일 수 있어 성능을 향상시킬 수 있어요.

## 6. 서브쿼리 최적화

특정 도시에 거주하는 고객에 대한 모든 주문을 검색하는 쿼리가 있다고 가정해보세요:

```js
SELECT * FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE city = '뉴욕');
```

<div class="content-ad"></div>

이 쿼리는 뉴욕에 거주하는 고객들의 고객 ID를 검색하기 위해 서브쿼리를 사용합니다. 이 쿼리를 최적화하기 위해 JOIN으로 다시 작성할 수 있습니다:

```js
SELECT orders.* FROM orders JOIN customers ON orders.customer_id = customers.id WHERE customers.city = 'New York';
```

이 쿼리는 서브쿼리 대신 JOIN을 수행하며, "orders" 테이블에 많은 행이 있는 경우 더 빠를 수 있습니다.

## 7. 준비된 문을 사용하세요

<div class="content-ad"></div>

특정 이름을 가진 모든 사용자를 검색하는 쿼리가 있다고 가정해봅시다:

```js
SELECT * FROM users WHERE name = 'John';
```

여러 번 다른 이름으로 이 쿼리를 실행한다면, 준비된 문을 사용하여 성능을 개선할 수 있습니다:

```js
PREPARE get_users_by_name (text) AS SELECT * FROM users WHERE name = $1;
EXECUTE get_users_by_name('John');
EXECUTE get_users_by_name('Jane');
```

<div class="content-ad"></div>

이렇게 하면 각 후속 실행에 대해 쿼리를 준비하고 실행 계획을 재사용할 수 있어 성능을 향상시킬 수 있습니다.

제가 언급한 옵션을 사용하여 PostgreSQL 쿼리를 최적화하는 방법을 명확하게 설명하는 데 도움이 되기를 바랍니다!

## 8. 연결 풀 사용

연결 풀을 사용하면 데이터베이스 연결을 생성하고 해제하는 오버헤드를 줄여 성능을 향상시킬 수 있습니다.

<div class="content-ad"></div>

커넥션 풀링은 각 데이터베이스 요청마다 새로운 연결을 생성하고 해제하는 대신 데이터베이스 연결 풀을 관리하는 기술입니다. 기존 연결을 재사용함으로써 커넥션 풀링은 새로운 연결을 맺는 데 필요한 오버헤드를 줄일 수 있어 PostgreSQL 쿼리의 성능을 향상시킬 수 있습니다.

다음은 PostgreSQL에서 커넥션 풀링을 사용하는 예시입니다:

- 커넥션 풀링 라이브러리 설치: PostgreSQL용 여러 커넥션 풀링 라이브러리가 있습니다. pgBouncer, pgpool-II, 그리고 Pgpool 등이 있습니다. 요구 사항에 가장 적합한 라이브러리를 선택하고 서버에 설치합니다.
- 커넥션 풀 구성: 데이터베이스에 대한 최대 연결 수와 최대 휴대 중인 연결 수를 지정하도록 커넥션 풀을 구성합니다. 또한 일정 시간 후 휴대 중인 연결을 자동으로 닫도록 풀을 구성할 수도 있습니다.
- 응용 프로그램 코드 수정: 응용 프로그램 코드를 수정하여 각 데이터베이스 요청마다 새로운 연결을 생성하는 대신에 커넥션 풀을 사용하도록 수정합니다. 선택한 커넥션 풀 라이브러리에 따라 연결 문자열이나 데이터베이스 URL을 수정해야 할 수도 있습니다.

다음은 pgBouncer를 사용한 커넥션 풀링 사용 예시입니다:

<div class="content-ad"></div>

- pgBouncer 설치: 패키지 관리자를 사용하거나 소스에서 컴파일하여 서버에 pgBouncer를 설치합니다.
- 연결 풀 구성: pgBouncer 구성 파일을 편집하여 데이터베이스에 대한 연결 최대 수와 최대 휴식 연결 수를 지정합니다. 또한 일정 시간이 지난 후 자동으로 휴식 연결을 닫도록 pgBouncer를 구성할 수 있습니다.
- 응용 프로그램 코드 수정: 응용 프로그램 코드를 수정하여 기본 PostgreSQL 연결 문자열 대신 pgBouncer 연결 문자열을 사용하도록 합니다. 다음은 PostgreSQL 연결 문자열의 예시입니다:

```js
postgres://username:password@hostname:port/database
```

다음은 pgBouncer 연결 문자열의 예시입니다:

```js
postgres://username:password@hostname:6432/database
```

<div class="content-ad"></div>

포트 번호가 다르고 호스트 이름이 PostgreSQL 서버가 아닌 pgBouncer 서버를 가리키는 것을 유의해 주세요.

pgBouncer와 같은 커넥션 풀을 사용하면 데이터베이스 연결을 생성하고 해제하는 오버헤드를 줄일 수 있어 PostgreSQL 쿼리의 성능을 향상시킬 수 있습니다.

## 9. 테이블 분석 및 VACUUM

분석과 VACUUM은 데이터베이스 통계를 업데이트하고 디스크 공간을 회수하여 PostgreSQL 쿼리의 성능을 향상시킬 수 있는 두 가지 중요한 유지 관리 작업입니다. 각 작업에 대한 간단한 설명은 다음과 같습니다:

<div class="content-ad"></div>

- 분석: 테이블에 인덱스를 생성하거나 데이터를 필터링하거나 정렬하는 쿼리를 실행할 때, PostgreSQL은 통계를 사용하여 조건과 일치하는 행 수를 추정합니다. 데이터베이스 통계에는 데이터의 분포에 대한 정보가 포함되어 있습니다. 즉, 고유한 값의 수 및 각 값의 빈도가 포함됩니다. 이러한 통계는 pg_statistic이라는 시스템 카탈로그에 저장됩니다. 통계가 오래되거나 부정확할 경우, 쿼리 플래너가 잘못된 결정을 내리고 효율적이지 않은 쿼리 계획을 생성할 수 있습니다.

통계를 업데이트하려면 테이블이나 전체 데이터베이스에 ANALYZE 명령을 실행할 수 있습니다. ANALYZE는 테이블을 스캔하고 pg_statistic에서 통계를 업데이트합니다. 대규모 테이블의 경우, 이 작업은 상당한 시간이 소요될 수 있지만, 이는 일회성 비용이며 혜택이 상당할 수 있습니다.

- 박강작업: 테이블에 행을 삽입, 업데이트 또는 삭제할 때, PostgreSQL은 이전 행이 사용한 디스크 공간을 즉시 해제하지 않습니다. 대신, 해당 공간을 재사용 가능하다고 표시하고 새 행이 그 공간을 채울 때까지 기다립니다. 이를 "불필요한" 공간이라고 하며 시간이 지남에 따라 축적되어 단편화와 성능 저하로 이어질 수 있습니다. 박강작업은 불필요한 공간을 회수하여 운영 체제가 다시 사용할 수 있도록 하는 과정입니다.

PostgreSQL에서 테이블을 박강하는 여러 옵션이 있습니다. 가장 간단한 옵션은 VACUUM 명령을 실행하는 것으로, 전체 테이블을 스캔하고 불필요한 공간을 제거합니다. 다른 옵션은 VACUUM ANALYZE 명령을 실행하는 것으로, 분석과 박강 작업의 혜택을 결합한 명령입니다.

<div class="content-ad"></div>

이제 PostgreSQL에서 테이블을 분석하고 VACUUM하는 방법을 알아볼게요:

```js
-- 테이블 분석하기
ANALYZE mytable;

-- 테이블 VACUUM하기
VACUUM mytable;
```

정기적으로 테이블을 분석하고 VACUUM하면 데이터베이스 통계가 최신 상태를 유지하고 디스크 공간을 효율적으로 사용할 수 있어요. 이는 PostgreSQL 쿼리의 성능을 향상시키고 더 나은 쿼리 계획을 생성하며 데이터를 읽고 쓰기 위해 필요한 디스크 I/O 양을 줄이는 데 도움이 될 수 있어요.

이 글에 대한 궁금한 점이나 피드백이 있으면 언제든지 댓글을 남겨주세요.
읽어주셔서 감사합니다. 함께 NodeTeam에 참여해보세요!