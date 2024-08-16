---
title: "SQL 쿼리 성능 향상을 위한 최적화 방법 7가지"
description: ""
coverImage: "/assets/img/2024-07-13-OptimizingSQLQueriesforBetterPerformance_0.png"
date: 2024-07-13 21:21
ogImage: 
  url: /assets/img/2024-07-13-OptimizingSQLQueriesforBetterPerformance_0.png
tag: Tech
originalTitle: "Optimizing SQL Queries for Better Performance"
link: "https://medium.com/dev-genius/optimizing-sql-queries-for-better-performance-ad9ccefdb0c0"
isUpdated: true
---




SQL 쿼리는 데이터베이스가 효율적이고 빠르게 작동할 수 있도록 하는 데 중요합니다. 이 포스트에서는 우리 시스템에서 수행한 특정 예시를 통해 쿼리 최적화의 장점을 살펴보고 최적화된 쿼리가 얼마나 성능 향상에 도움이 되는지 보여줄 것입니다.

![Optimizing SQL Queries](/assets/img/2024-07-13-OptimizingSQLQueriesforBetterPerformance_0.png)

## 시나리오

Products라는 테이블에서 가장 비싼 상품 10개를 가져오고 싶다고 가정해 보겠습니다. 처음에 잘못된 쿼리는 다음과 같을 수 있습니다:

<div class="content-ad"></div>

```sql
SELECT TOP 10 * FROM Products ORDER BY Price DESC;
```

쿼리는 간단하지만 대량의 데이터셋이 있는 경우 효율적이지 않을 수 있습니다. 대신, ROW_NUMBER()를 사용하여 성능을 개선할 수 있습니다:

```sql
SELECT * 
FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY Price DESC) AS RowNum
    FROM Products
) AS RankedProducts
WHERE RowNum <= 10;
```

제품을 가격별로 순위를 매기도록 쿼리를 최적화하여 결과 집합에 대한 전체 정렬이 필요하지 않습니다.

<div class="content-ad"></div>

## 제품 테이블 생성 및 데이터 삽입

이제 실제 사용 사례를 모방하기 위해 제품 테이블을 생성하고 몇 가지 더미 데이터를 삽입하겠습니다.

```js
-- 테이블이 이미 있는 경우 삭제
DROP TABLE IF EXISTS Products;

-- 제품 테이블 생성
CREATE TABLE Products (
    ProductID INT IDENTITY(1,1) PRIMARY KEY,
    ProductName NVARCHAR(100),
    Price DECIMAL(10, 2)
);

-- 제품 테이블에 샘플 데이터 삽입
INSERT INTO Products (ProductName, Price)
VALUES
('제품 A', 10.00),
('제품 B', 20.00),
('제품 C', 30.00),
('제품 D', 40.00),
('제품 E', 50.00),
('제품 F', 60.00),
('제품 G', 70.00),
('제품 H', 80.00),
('제품 I', 90.00),
('제품 J', 100.00),
('제품 K', 110.00),
('제품 L', 120.00),
('제품 M', 130.00),
('제품 N', 140.00),
('제품 O', 150.00),
('제품 P', 160.00),
('제품 Q', 170.00),
('제품 R', 180.00),
('제품 S', 190.00),
('제품 T', 200.00);

-- 테이블 크기를 증가시키기 위해 더 많은 샘플 데이터 삽입
DECLARE @j INT = 1;
WHILE @j <= 100000
BEGIN
    INSERT INTO Products (ProductName, Price)
    VALUES ('제품 ' + CAST(@j + 1026 AS NVARCHAR(10)), 10.00 + (RAND() * 1000));
    SET @j = @j + 1;
END;
```

## 성능 지표 수집

<div class="content-ad"></div>

이 하위 최적화 및 최적화된 쿼리의 성능을 비교하여 쿼리가 사용하는 실행 시간 메트릭, 쿼리에 의해 소비된 논리 읽기 또는 사용된 CPU 시간을 수집할 수 있습니다.

```js
-- 통계 활성화
SET STATISTICS TIME ON;
SET STATISTICS IO ON;

-- 쿼리 1: 하위 최적화 쿼리
PRINT '쿼리 1: 하위 최적화 쿼리';
GO
SELECT TOP 10 * FROM Products ORDER BY Price DESC;
GO

-- 쿼리 2: ROW_NUMBER()을 사용한 최적화된 쿼리
PRINT '쿼리 2: 최적화된 쿼리';
GO
SELECT * 
FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY Price DESC) AS RowNum
    FROM Products
) AS RankedProducts
WHERE RowNum <= 10;
GO

-- 통계 비활성화
SET STATISTICS TIME OFF;
SET STATISTICS IO OFF;
```

# 결과 분석

<img src="/assets/img/2024-07-13-OptimizingSQLQueriesforBetterPerformance_1.png" />

<div class="content-ad"></div>

쿼리 1: 서브옵티멀 쿼리 SQL Server 실행 시간은 CPU 시간 = 0 ms, 경과 시간 = 41 ms입니다. 'Products' 테이블. 스캔 횟수 12, 논리 읽기 15202, 물리 읽기 6., 페이지 서버 읽기-6039(버퍼 풀로 인해 줄어듦), 순차 읽기 사전 로드 7992, lobtree 폭 3192.

쿼리 2: 최적화된 쿼리 SQL Server 실행 시간은 CPU 시간 = 109 ms, 경과 시간 = 11 ms입니다. 'Worktable' 테이블. 스캔 횟수 0, 논리 읽기 0, 물리 읽기 0. 'Products' 테이블. 스캔 횟수 9, 논리 읽기 861, 물리 읽기 0, 사전 로드된 읽기 0, lob 논리 읽기 0, lob 물리 읽기 0, lob 사전 로드된 읽기 0.

## 결론

결과를 통해 우리는 다음과 같이 관찰할 수 있습니다:

<div class="content-ad"></div>

- 경과 시간: 최적화된 쿼리 (11ms)는 최적이 아닌 쿼리(41ms)보다 현저히 빠릅니다.
- 논리적 읽기: 두 쿼리 모두 동일한 논리적 읽기 수(861)를 갖고 있지만, 최적화된 쿼리는 미리 읽기를 제거합니다.
- CPU 시간: 최적화된 쿼리는 ROW_NUMBER()에서의 연산으로 인해 더 높은 CPU 시간을 갖지만, 감소한 경과 시간으로 상쇄됩니다.

## 혜택 요약

- 경과 시간 감소: 최적화된 쿼리는 결과를 더 빠르게 반환하여 사용자 경험을 향상시킵니다.
- 효율적인 데이터 처리: 최적화된 쿼리는 불필요한 미리 읽기를 피해 고용량 데이터 시나리오에 유용합니다.