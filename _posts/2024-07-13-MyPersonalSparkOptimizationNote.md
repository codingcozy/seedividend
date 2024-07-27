---
title: "나만의 Spark 최적화 노트"
description: ""
coverImage: "/assets/img/2024-07-13-MyPersonalSparkOptimizationNote_0.png"
date: 2024-07-13 21:18
ogImage: 
  url: /assets/img/2024-07-13-MyPersonalSparkOptimizationNote_0.png
tag: Tech
originalTitle: "My Personal Spark Optimization Note"
link: "https://medium.com/@kevinchwong/my-intensive-spark-optimization-study-checklist-308dc8ae55e9"
---



![이미지](/assets/img/2024-07-13-MyPersonalSparkOptimizationNote_0.png)

여기에는 상세 설명과 파이썬 소스 코드가 포함된 전체 버전이 있습니다.

# 선행 조건

## 데이터 프레임


<div class="content-ad"></div>

- 데이터프레임 생성: 열, 스키마 및 RDD를 사용하여 데이터프레임 생성 방법을 배웁니다.
- 데이터프레임 표시: 스키마, 구조 및 요약을 표시하는 방법을 살펴봅니다.
- 열 선택: 특정 데이터프레임 열을 선택하는 다양한 기술을 살펴봅니다.
- 데이터 필터링: 데이터프레임 행을 필터링하는 조건을 적용하는 방법을 학습합니다.
- 데이터프레임 쓰기 및 읽기: 데이터의 지속성 및 검색 기술을 탐색합니다.
- struct() 사용: 새로운 복잡한 데이터 유형으로 데이터프레임을 보강합니다.

<img src="/assets/img/2024-07-13-MyPersonalSparkOptimizationNote_1.png" />

자세한 설명 및 파이썬 소스 코드가 포함된 전체 버전은 여기에 있습니다

## 그룹화 및 집계

<div class="content-ad"></div>

- 기본부터 고급 집계: `count(), max(), min(), avg(), sum()`과 같은 기술 탐색하기.
- `collect_list()` 및 `collect_set()` 사용하기.
- 사용자 정의 집계 함수 (UDAF).
- 복잡한 조건: `when()` 사용하기.
- 집계 후 GroupBy로 RDD + map() 함수 사용하기

![이미지](/assets/img/2024-07-13-MyPersonalSparkOptimizationNote_2.png)

**상세 설명 및 파이썬 소스 코드는 [여기](소스코드링크)에서 확인할 수 있습니다.**

## 다른 쿼리들

<div class="content-ad"></div>

- rollup() 및 cube() 활용: 다차원 집계에 사용됩니다.
- groupBy() 및 pivot(): Pivot 테이블처럼 행을 열로 변환합니다.
- row_number() 및 rank(): 행 집합 윈도우를 기준으로 한 고급 데이터 그룹핑 및 계산을 적용합니다.

![이미지](/assets/img/2024-07-13-MyPersonalSparkOptimizationNote_3.png)

자세한 설명 및 Python 소스 코드를 보려면 여기를 클릭하세요.

# Spark를 최적화하는 방법?

<div class="content-ad"></div>

## 건강한 파이프라인

- 불필요한 원시 데이터 삭제
- 캐시 사용
- 하드코드 스키마 사용
- spark.sql() 사용
- 더 나은 파일 형식
- 더 나은 변환:
    - 조인(join()) 및 agg() 전에 이전 선택 및 필터 사용
    - limit() 사용
    - RDD, ReduceByKey() + map() 사용

![이미지](/assets/img/2024-07-13-MyPersonalSparkOptimizationNote_4.png)

**자세한 설명 및 파이썬 소스 코드는 [여기](링크)에서 확인할 수 있습니다**

<div class="content-ad"></div>

## 파티션 → 병렬화

데이터 동시성 실행 가능하도록 설정해주세요.

- partitionBy() 사용
- salted 키 사용

![이미지](/assets/img/2024-07-13-MyPersonalSparkOptimizationNote_5.png)

<div class="content-ad"></div>

여기에 전체 버전과 모든 설명, 파이썬 소스 코드가 있습니다

## 데이터 셔플링 최소화

비용이 많이 드는 셔플링에 사용된 시간을 피하거나 줄입니다.

- Broadcast 조인 사용
- 병렬처리 증가를 위해 Repartition 사용
- 파티션 감소를 위해 Coalesce 사용

<div class="content-ad"></div>


![2024-07-13-MyPersonalSparkOptimizationNote_6](/assets/img/2024-07-13-MyPersonalSparkOptimizationNote_6.png)

**THE FULL VERSION WITH FULL EXPLANATION AND PYTHON SOURCE CODE IS HERE**

## 성능 모니터링 및 세부 튜닝

- 자원 및 네트워크 관리
- 동적 할당 및 메모리 관리
- 네트워크 최적화: 데이터 전송 효율 향상
- 쿼리 실행 적응: 쿼리 계획에 대한 동적 조정
- Spark UI를 통한 작업 및 단계 모니터링: 성능 및 리소스 사용 추적
- SQL 성능 튜닝: Catalyst 옵티마이저 활용
- 가비지 컬렉션 튜닝: 메모리 관리 최적화


<div class="content-ad"></div>

<img src="/assets/img/2024-07-13-MyPersonalSparkOptimizationNote_7.png" />

# 읽어 주셔서 감사합니다

만약 이 글이 마음에 드셨다면:

- 박수 👏 한 번 또는 여러 번으로 지지해 주세요!
- 이 가이드를 친구들과 공유해 주세요.
- 여러분의 피드백은 소중합니다 — 미래 글의 영감이자 지침이 됩니다.
- 또는 메시지를 남겨주세요: https://www.linkedin.com/in/kevinchwong
- 완전한 설명과 Python 소스 코드가 포함된 전체 버전은 여기에 있습니다.