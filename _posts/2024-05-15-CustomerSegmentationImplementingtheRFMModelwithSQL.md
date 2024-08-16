---
title: "고객 세분화 SQL로 RFM 모델 구현하기"
description: ""
coverImage: "/assets/img/2024-05-15-CustomerSegmentationImplementingtheRFMModelwithSQL_0.png"
date: 2024-05-15 16:08
ogImage: 
  url: /assets/img/2024-05-15-CustomerSegmentationImplementingtheRFMModelwithSQL_0.png
tag: Tech
originalTitle: "Customer Segmentation: Implementing the RFM Model with SQL"
link: "https://medium.com/@shirvaron/customer-segmentation-implementing-the-rfm-model-with-sql-8d07fd990d32"
isUpdated: true
---




<img src="/assets/img/2024-05-15-CustomerSegmentationImplementingtheRFMModelwithSQL_0.png" />

현재의 데이터 기반 비즈니스 환경에서는 고객 행동을 이해하는 것이 성공에 중요합니다. 여러 산업의 기업들은 고객의 선호도, 구매 패턴, 충성도를 파악하여 정보에 기반한 결정을 내리고 성장을 이끌기 위해 노력합니다. 고객 행동을 분석하는 가장 강력한 방법 중 하나는 RFM 모델입니다. 이 모델을 통해 기업은 기존 고객층의 구매 행동에 대한 더 나은 통찰력을 얻어 고객 분할을 실시하고 각 세그먼트의 성과를 향상시키기 위한 점수 시스템을 적용할 수 있습니다.

RFM 모델을 통해 기업은 중요한 소비 및 광범위한 쇼핑 요구를 가진 고객(즉, 가장 활동적인 구매자)를 식별할 수 있으며, 최근 접촉 기회가 적은 고객들을 재참여시키고, 리텐션 비율을 개선하고, 사용자 이탈을 방지하며, 데이터 기반 접근 방식을 사용하여 세그먼트 간의 마케팅 예산 할당을 향상시킬 수 있습니다.

## RFM 모델 이해하기



RFM 모델은 고객 분할 기술로, 고객 행동의 세 가지 주요 요소인 Recency(최근성), Frequency(빈도), Monetary Value(금액)을 평가합니다.

- Recency(최근성, R): 고객이 회사에서 마지막 구매 또는 상호 작용 이후로 경과한 시간을 측정하는 메트릭입니다. 구매가 더 최근에 이루어지면 재구매 및 고객 참여 가능성이 높아집니다.
- Frequency(빈도, F): 이 메트릭은 고객이 주어진 기간 동안 구매를 얼마나 자주하거나 회사와 상호 작용하는지를 추적합니다. 더 높은 구매 빈도를 갖는 고객들은 일반적으로 더 충성도가 높고 가치가 있는 고객입니다.
- Monetary Value(금액, M): 이 메트릭은 고객이 회사에서 지출한 총 금액을 정량화합니다. 높은 금액은 종종 수익에 크게 기여하는 더 유리한 고객을 나타냅니다.

이 세 가지 요소 (R, F, & M)를 결합하여 RFM 모델은 각 고객에게 점수를 할당하여 비즈니스가 고객 기반을 분할하고 그에 맞게 전략을 조정할 수 있도록 돕습니다.

## RFM 모델의 비즈니스 영향



RFM 모델은 고객 관계와 마케팅 노력을 최적화하려는 비즈니스에 다양한 이점을 제공합니다:

- 고가치 및 위험한 고객 식별: RFM 모델을 사용하면 비즈니스가 가장 가치 있는 고객과 이탈 위험이 있는 고객을 식별할 수 있습니다. 이 정보를 활용하여 자원 할당 및 선제적 유지 노력을 가이드할 수 있습니다.
- 타겟 마케팅 및 고객 유지 전략: RFM 점수를 기준으로 고객을 세분화하여, 각 세그먼트의 요구 사항과 행동에 맞는 타겟 마케팅 캠페인 및 유지 전략을 개발할 수 있습니다.
- 자원 할당 및 캠페인 효과성 최적화: 가장 유망한 고객 세그먼트에 마케팅 노력과 자원을 집중함으로써, 비즈니스는 투자 대비 최대 수익률(ROI)과 캠페인 효과를 극대화할 수 있습니다.

## 데이터 준비

RFM 모델을 구현하기 전에 고객 데이터의 무결성과 품질을 보장하는 것이 중요합니다. 이 글에서는 학습 목적으로 흔히 사용되는 샘플 데이터베이스인 SQL Server의 Northwind 데이터베이스를 사용할 것입니다.



노스윈드 데이터베이스에는 주문, 고객, 제품과 같은 가상 거래 회사와 관련된 엔티티에 대한 테이블이 포함되어 있습니다. 저희의 분석에서는 주문, 주문 상세 및 고객 테이블에 초점을 맞출 것입니다. 이 테이블들은 고객 구매 및 고객 세부 정보에 관한 정보가 포함되어 있습니다.

데이터 준비 단계에서는 누락된 값 처리, 다른 소스에서 데이터 통합 및 데이터 일관성 보장과 같은 작업이 포함될 수 있습니다. 데이터가 준비되면 SQL Server 쿼리를 사용하여 RFM 모델을 구현할 수 있습니다.

![RFM Model](/assets/img/2024-05-15-CustomerSegmentationImplementingtheRFMModelwithSQL_1.png)

Customers: 이 테이블은 회사의 등록 고객에 대한 포괄적인 세부 정보를 저장하며, 아직 구매를 안 한 고객도 포함됩니다.



주문: 이 테이블은 고객이 주문한 모든 주문의 기록을 포함하며, 주문 날짜, 필요 날짜, 배송 주소 및 관련 주문 세부 정보와 같은 세부 사항이 포함되어 있습니다.

주문 세부 정보: 이 테이블은 각 주문에 포함된 개별 제품 및 수량에 대한 섬세한 정보를 저장하며, 단위 가격 및 적용된 할인과 같은 세부 사항이 포함되어 있습니다.

## SQL Server로 RFM 모델 구현

노스윈드 데이터베이스의 각 고객에 대한 RFM 점수를 계산하기 위해 SQL 쿼리를 작성할 것입니다. 이 쿼리들은 데이터베이스 테이블에서 필요한 정보를 추출하기 위해 다양한 SQL 함수와 기술을 활용할 것입니다.



Step 1: 노스윈드 데이터베이스 설정

다음 GitHub 저장소에서 instnwnd.sql 스크립트를 다운로드하여 SQL Server용 노스윈드 샘플 데이터베이스를 생성하고 로드합니다. 노스윈드 데이터베이스를 사용하기 전에 SQL Server Management Studio나 유사한 도구를 사용하여 다운로드한 instnwnd.sql 스크립트 파일을 실행하여 SQL Server의 인스턴스에 데이터베이스를 다시 만들어야 합니다. 저장소의 README 파일 안내에 따라 진행하십시오.

Step 2: 고객 테이블 준비:

```js
WITH customers_cte AS (
  SELECT 
    c.CustomerID
   ,COUNT(DISTINCT o.OrderID) AS orders
   ,SUM(od.UnitPrice * od.Quantity * (1 - od.Discount)) AS order_value
   ,MAX(o.OrderDate) AS last_order_date
   FROM Customers c 
   LEFT JOIN Orders o ON (c.CustomerID = o.CustomerID)
   LEFT JOIN [Order Details] od ON (o.OrderID = od.OrderID)
   GROUP BY  c.CustomerID
  )


SELECT * FROM customers_cte
```



RFM 모델 구현의 첫 번째 부분인이 쿼리는 데이터베이스의 각 CustomerID에 대해 RFM 분석에 필요한 주요 지표를 계산합니다.

- 이 쿼리는 Customers 테이블과 Orders / Order Details 테이블을 CustomerID 열을 기준으로 왼쪽 조인합니다. 이렇게 함으로써 모든 고객이 결과에 포함되도록 보장합니다. 심지어 주문 내역이 없는 경우에도 포함됩니다.
- MAX(o.OrderDate)를 사용하여 고객의 가장 최근 주문 날짜를 찾고 last_order_date의 별칭으로 할당합니다.
- 각 고객이 한 번 이상 주문한 고유 주문 수를 COUNT(DISTINCT o.OrderID)로 계산하고 orders의 별칭을 할당합니다.
- 고객이 주문한 모든 주문의 총 금액을 다음 표현식을 사용하여 계산합니다: SUM(od.UnitPrice * od.Quantity * (1 - od.Discount)). 이 표현식은 각 주문 라인 항목 (Order Details 테이블)에 대해 단가, 수량 및 할인 요소(1 - 할인)의 곱셈을 합산합니다. 결과는 order_value의 별칭으로 할당됩니다.

단계 3: 최신성, 빈도 및 경제적 가치 점수 계산:

```js
WITH rfm_cte AS (
   SELECT *
   ,PERCENT_RANK() OVER (Order by last_order_date) AS recency
   ,PERCENT_RANK() OVER (Order by orders) AS frequency
   ,PERCENT_RANK() OVER (Order by order_value) AS monetary
   FROM customers_cte
  )


SELECT * FROM rfm_cte
```



이 쿼리는 PERCENT_RANK() 창 함수를 사용하여 각 고객의 Recency, Frequency 및 Monetary Value 점수를 계산합니다. PERCENT_RANK() 함수는 지정된 순서대로 각 행을 순위 매기고 해당 파티션의 행 중에서 상대적 위치를 나타내는 0에서 1 사이의 백분위 순위 값을 각 행에 할당합니다.

- PERCENT_RANK() OVER (ORDER BY last_order_date): 이는 last_order_date로 정렬된 모든 고객의 각 고객 last_order_date의 백분위 순위를 계산합니다. 더 최근 주문을 한 고객일수록 더 높은 순위를 갖습니다.
- PERCENT_RANK() OVER (ORDER BY orders): 이는 주문 횟수로 모든 고객의 주문 횟수의 백분위 순위를 계산합니다. 주문이 더 많은 고객일수록 더 높은 순위를 갖습니다.
- PERCENT_RANK() OVER (ORDER BY order_value): 이는 주문 가치로 모든 고객의 주문 가치의 백분위 순위를 계산합니다. 주문 가치가 높은 고객일수록 더 높은 순위를 갖습니다.

0부터 1 사이의 이러한 점수를 정규화하는 이유는 세 가지 RFM 요인이 최종 점수에 동등하게 기여하도록하고 값의 크기나 척도의 차이로 인해 어떤 단일 요인도 우위를 선점하지 못하도록하기 위함입니다.

단계 4: RFM 점수 결합하기:



```js
WITH score_cte AS (
   SELECT *
   ,(0.2 * recency) + (0.4 * frequency) + (0.4 * monetary) AS rfm_wights
   ,PERCENT_RANK() OVER (ORDER BY (0.2 * recency)
                                + (0.4 * frequency)
                                + (0.4 * monetary)) AS norm rfm_score
   FROM rfm_cte
   )

 SELECT * FROM score_cte
```

이 쿼리는 각 고객에 대해 Recency, Frequency, Monetary Value 점수를 지정된 가중치를 사용하여 결합하여 가중 RFM 점수를 계산합니다.

- recency*0.2 + frequency*0.4 + monetary*0.4 AS rfm_weights: 이것은 R-F-M 값 점수의 가중 합계를 계산합니다. 이 예에서, 빈도 및 통화 가치가 내 비즈니스에서 동일하게 중요하며 Recency 수직보다 더 중요하다고 결정했습니다. 따라서 빈도 및 통화 가치 점수는 각각 40%의 가중치가 주어지고, Recency 점수는 오직 20%의 가중치가 주어집니다. 가중 합계는 rfm_weights 별칭에 할당됩니다. 이 가중치는 특정 비즈니스 및 사용 사례에 대한 RFM 모델의 각 요소의 상대적 중요도를 기반으로 조정할 수 있습니다.
- 그런 다음 PERCENT_RANK 함수를 사용하여 가중 RFM 점수를 다시 0과 1 사이의 값으로 정규화합니다. 이것은 norm_rfm_score 별칭에 할당됩니다. 결과적인 norm_rfm_score 열은 각 고객에 대한 전반적인 RFM 점수를 나타내며, 나중에 고객 분할 및 분석에 사용할 수 있습니다 (다음 단계에서 설명하겠습니다).

단계 5: RFM 모델을 사용한 고객 분할 적용하기



```js
SELECT 
 CustomerID
,orders
,ISNULL(order_value,0) AS order_value
,CAST(last_order_date AS DATE) AS last_order_date
,recency
,frequency
,monetary
,norm_rfm_score
,CASE WHEN orders = 0 THEN 'E'
   WHEN norm_rfm_score >= 0.95 THEN 'A'
   WHEN norm_rfm_score >= 0.80 THEN 'B'
   WHEN norm_rfm_score >= 0.50 THEN 'C'
   ELSE 'D'
   END AS segment
FROM score_cte
ORDER BY norm_rfm_score DESC
```

이 최종 쿼리는 RFM 모델 결과를 제시하고 계산된 RFM 정규화 점수를 기반으로 고객 세분화를 제안합니다:


CASE WHEN orders = 0 THEN `E` WHEN norm_rfm_score `= 0.95 THEN `A` WHEN norm_rfm_score `= 0.80 THEN `B` WHEN norm_rfm_score `= 0.50 THEN `C` ELSE `D` END AS segment: 각 고객에 대한 RFM 점수를 기준으로 세그먼트 레이블을 할당하는 CASE 문입니다.

A. 상위 5%의 고객으로 RFM 점수가 0.95 이상인 고객



B. RFM 점수가 0.8에서 0.95 사이인 고객 중 상위 15%

C. RFM 점수가 0.5에서 0.8 사이인 고객 중 상위 30%

D. RFM 점수가 0.5 미만인 고객 중 하위 50%

E. 아무 주문이 없는 고객(주문 횟수 = 0)



## RFM 점수 및 세분화 해석

RFM 점수를 계산하고 나면 결과를 해석하고 고객 베이스를 적절히 분할할 수 있습니다. 일반적으로 높은 RFM 점수를 받은 고객은 최고 가치가 있거나 충성도가 높은 고객으로 간주됩니다. 왜냐하면 최근에 구매를 한 경우가 많고 비즈니스와 자주 상호 작용하며 상당한 금전적 가치를 제공하기 때문입니다. 반면에 낮은 RFM 점수를 받은 고객은 최근에 구매를 하지 않았거나 구매 빈도가 낮으며 상대적으로 낮은 금전적 가치를 제공할 수 있어 이탈 위험에 처해 있을 수 있습니다.

RFM 점수와 고객 세그먼트의 분포를 분석함으로써, 기업은 고객 유지, 유치, 교차 판매/상위 판매를 위한 타겟팅된 전략을 개발할 수 있습니다.

## 분석 시각화



RFM 행렬은 RFM 모델로부터 통찰력을 얻고 해석하는 데 강력한 도구입니다. 데이터 기반의 의사결정을 용이하게 하며 고객 관계 관리 전략을 최적화합니다.

RFM 행렬은 고객 세그먼트의 시각적 표현을 제공하여 기업이 패턴, 이상값 및 기회 영역을 식별할 수 있도록 돕습니다. 행렬을 통해 고객이 분산되는 상황을 분석함으로써, 기업은 각 세그먼트에 대해 리텐션 노력, 위험에 노출된 고객을 되찾는 캠페인, 미표시된 세그먼트에 대한 확보 전략 등을 개발할 수 있습니다.

RFM 산점도 행렬 분석

RFM 산점도 행렬은 최근성, 빈도 및 금액 가치 차원 간의 분포와 관계를 시각화합니다. 이 강력한 시각화 도구는 대각선 상에 각 개별 RFM 차원의 분포를 나타내며, 비대각선 도표는 이러한 차원 쌍 간의 관계를 설명합니다.



<img src="/assets/img/2024-05-15-CustomerSegmentationImplementingtheRFMModelwithSQL_2.png" />

색으로 구분된 세그먼트는 서로 다른 고객 그룹의 특성에 대한 소중한 통찰력을 제공합니다. 가장 가치 있는 고객을 대표하는 'A' 세그먼트(파란 점)는 상위 우측 모서리에 집중되어 있어 높은 최근성(Recency), 빈도(Frequency), 그리고 통화가치(Monetary Value) 점수를 나타냅니다. 반면에, 상대적으로 가치가 낮거나 비활성화된 고객을 대표하는 'D'와 'E' 세그먼트(주황색 및 빨간 점)는 낮은 점수를 보이는 하향 좌하단에 집중되어 있습니다.

색상 점의 분포와 패턴을 분석함으로써, 타겟 마케팅 전략, 고객 유지 노력, 또는 고객 유치 캠페인을 위한 잠재적인 영역을 식별할 수 있습니다. 예를 들어, 평균적인 최근성과 빈도를 가진 'C' 세그먼트(초록 점)의 고객을 파악함으로써, 효과적인 교차 판매 또는 업셀링 캠페인에 기회를 발견할 수 있습니다.

참여: 최근성/빈도 매트릭스(ERF)



ERF 행렬은 최신성과 빈도 점수를 기반으로 한 고객 세그먼트의 포괄적인 전망을 제공합니다. 이 시각화는 다음을 기반으로 합니다:

- 참여: 위 예에서 참여 활동은 구매로 정의됩니다. 사용자가 더 많이 구매할수록 비즈니스에 더 많이 참여하게 됩니다. 그러나 참여는 사용자가 비즈니스와 참여를 보이기 위해 수행하는 모든 활동(예: 이메일 오픈, 푸시 알림, 장바구니에 상품 추가 등)로 정의될 수 있습니다.
- 최신성: 사용자가 참여 활동을 마지막으로 수행한 시간.
- 빈도: 사용자가 참여 활동을 수행한 횟수.

ERF 분석은 R-F 점수 임계값을 사용하여 구성 가능한 세그먼트 정의로 9가지 가능한 세그먼트를 가진 3x3 행렬을 제안하며, 세그먼트 정의는 다음 다이어그램에서 확인할 수 있습니다:

![다이어그램](/assets/img/2024-05-15-CustomerSegmentationImplementingtheRFMModelwithSQL_3.png)



섹션을 구성한 후에는 아래에 플로팅된 ERF 매트릭스를 시각화할 수 있습니다.

![ERF Matrix](/assets/img/2024-05-15-CustomerSegmentationImplementingtheRFMModelwithSQL_4.png)

## 결론 및 향후 방향

RFM 모델은 최근성(Recency), 빈도(Frequency), 금액(Monetary Value) 메트릭을 평가하여 고객 기반을 이해하고 세분화하는 강력한 도구입니다. 이 모델을 구현함으로써 기업은 고객 행동에 대한 가치 있는 통찰력을 얻을 수 있고, 고가치 고객 및 위험 고객을 식별하며, 타겟 마케팅 전략을 개발할 수 있습니다. RFM 매트릭스 및 ERF 매트릭스와 같은 도구를 활용하여 이러한 세그먼트를 시각화하면 의사결정력을 높이고 고객 관계 관리를 최적화할 수 있습니다.



기업들이 데이터 중심의 세계에서 계속 발전함에 따라, 고객 세분화의 미래는 K-평균 모델 및/또는 계층적 군집 덴드로그램과 같은 보다 고급분석과 머신러닝 기술을 통합할 것입니다. 이러한 방법들은 RFM 모델의 개념을 활용하면서 고객 행동에 대한 더 깊은 통찰력과 더 정확한 예측을 제공할 수 있습니다.

실시간 데이터와 AI의 통합은 기업들이 전례 없는 규모로 전략을 동적으로 조정하고 고객 상호작용을 개인화하는 데 도움이 될 것입니다. 앞으로는 RFM 모델을 이러한 고급 기술과 결합하여 기업들이 경쟁력을 유지하고 고객 참여 노력을 향상시킬 수 있습니다.