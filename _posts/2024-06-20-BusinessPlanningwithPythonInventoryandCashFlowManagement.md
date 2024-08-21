---
title: "파이썬을 활용한 비즈니스 계획 - 재고 및 현금 흐름 관리"
description: ""
coverImage: "/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_0.png"
date: 2024-06-20 01:50
ogImage:
  url: /assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_0.png
tag: Tech
originalTitle: "Business Planning with Python — Inventory and Cash Flow Management"
link: "https://medium.com/towards-data-science/business-planning-with-python-inventory-and-cash-flow-management-4f9beb7ecbec"
isUpdated: true
---

## 데이터 분석을 활용하여 소기업이 재고를 관리하고 유동성 요구를 예측하며 수익을 극대화하는 방법은 무엇인가요?

![Business Planning with Python: Inventory and Cash Flow Management](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_0.png)

현금 흐름 관리란 현금 수거액에서 현금 비용을 뺀 순액을 모니터링하고 최적화하는 프로세스로 정의될 수 있습니다.

중소기업을 경영하는 친구와 대화한 후, 성장에 있어 현금이 가장 큰 병목 현상일 수 있다는 것을 알게 되었습니다.

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

공급망 데이터 과학자로서, 나는 이 문제를 공급망, 재고 관리 및 유통 계획에 빠르게 연결했습니다.

이 기사에서는 이 문제의 간단한 모델링을 구축하는 데 사용된 접근 방식과 도구를 공유하겠습니다.

![Business Planning with Python Inventory and Cash Flow Management](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_1.png)

우리는 제 친구의 소규모 사업을 예로 들 것입니다. 그들은 재생 가능한 재료로 만든 컵을 커피숍과 유통업체에 판매합니다.

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

💌 무료로 새로운 기사를 이메일로 받아보세요: 뉴스레터
📘 공급망 분석에 대한 완벽한 가이드: 분석 요약 시트

```js
요약

I. 문제 상황: 비즈니스 계획
재생 에코 컵을 판매하는 회사를 돕기 위해 비즈니스 분석을 어떻게 사용할 수 있을까요?
  1. 재고 관리 시뮬레이션
고객 수요를 충족시키기 위한 재고 관리 규칙을 실행합니다.
  2. 재무 분석: 비용 및 수익
비용 및 수익을 포괄하는 모든 재무 흐름을 연도별로 매핑합니다.
  3. 현금 흐름 시뮬레이션
비즈니스를 운영하기 위해 매주 가지고 있을 현금은 얼마나 될까요?
II. 비즈니스 계획 최적화
유동성 및 수익성 문제를 해결하기 위해 무엇을 할 수 있을까요?
  1. 시나리오 1: 주문 수량 최적화
주문 수량을 8주에서 6주로 줄인다면 어떻게 될까요?
  2. 시나리오 2: 인바운드 물류용 항공화물
항공화물을 사용해 재생 재고의 리드타임을 단축한다면 어떨까요?
  3. 시나리오 3: 판매 채널 최적화
대리점에 판매함으로써 영업 대표를 뛰어넘을 수 있다면 어떨까요?
  4. 최적 시나리오
두 가지 최상의 옵션을 결합해 봅시다.
III. 결론
진보된 분석 솔루션을 통해 지속가능성과 수익성을 향상시키세요
```

# 문제 상황: 비즈니스 계획

이 부분은 내 친구의 비즈니스 모델을 이해하기 위해 수집한 요소들을 간단히 소개합니다.

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

이러한 포인트들이 포함되어 있습니다:

- 재고 관리: 제품 주문, 수령, 보관 및 배송
  ❓ 고객 수요를 충족시키려면 언제 주문해야 할까요?
- 재무: 비용 및 수익 흐름
  💡 주간 손익 분석.
- 상업: 판매 채널, 서비스 수준 협약 및 수수료
  ❔ XXX에 판매하면 얼마의 이익을 올릴까요?

![이미지](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_2.png)

우리는 이러한 요소를 모델링하여 서로 어떻게 상호 작용하고 전체 가치 사슬을 최적화할 수 있는지 이해할 것입니다.

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

## 재고 관리 시뮬레이션

먼저, 우리는 고객의 요구를 가장 낮은 비용으로 충족시키기 위해 모델의 핵심에 재고 관리 규칙을 구현할 것입니다.

![image](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_3.png)

재고 관리 규칙은 기계 속의 한 부분입니다.

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

- 재고는 상업 성장을 막을 수 있어요.
  손에 없는 아이템은 발송할 수 없어요.
- 충전 능력은 재무 상황으로 제한됩니다.
  주문 지불을 위해 손에 있는 현금이 필요해요.
- 전략적 결정은 재고 관리 방식에 영향을 미칩니다.
  예를 들어, 화물(항공, 해상) 소요 시간이 재고의 안정성에 영향을 줍니다.

이 모듈은 고객 수요, 자기 시간, 그리고 안전 재고 매개변수에 기반하여
보충 주문을 생성합니다.

![이미지](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_4.png)

이 연습에서는 2023년의 역사적 판매 데이터를 사용하여
최적의 재고 관리가 무엇이었을 지 모사했어요.

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

안녕하세요! 이 요청에 대한 답변으로 지속적 검토 정책인 (s, Q)을 소개해보려고 해요.

- 지속적 검토는 재고 팀이 매일 재고 수준을 확인하는 것을 의미해요.
- (s, Q)는 만약 재고 수준이 특정 수준 s(Pallets) 아래로 내려가면, Q(Pallets)를 주문해야 한다는 것이에요.

![이미지](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_5.png)

재주문 지점은 발주가 도착할 때까지 고객 요구를 충족하기 위해 필요한 재고 수준을 의미해요.

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

![이미지](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_6.png)

재고 보충 소요시간, 목표 주기 서비스 레벨 및 고객 수요의 표준 편차를 사용하여 정의합니다.

결과는 아래 차트와 같습니다.

![이미지](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_7.png)

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

📈 전설

- 파란색 산점도는 최적 주문 정책을 나타냅니다.
- 녹색 플롯은 창고에 보관된 파레트 수인 재고 현황(ioh)을 의미합니다.
- 세 번째 차트의 점선은 재주문 점 s를 나타냅니다.

재고 현황이 점선을 넘어갈 때 보충 주문이 있는 것을 관찰할 수 있습니다.

💡 관찰 결과

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

- 이 정책이 최적인지 확실하지 않아요.
  우리는 내 친구의 표준 운영 모델을 알고리즘으로 번역할 뿐이에요.
- 주문 수량과 보충 리드 타임을 최소화하기 위해 조정할 수 있다는 것을 염두에 두세요.

재주문 시기를 알게 되었으니, 현금 보유액을 시각화하기 위해 재무 흐름을 포함할 수 있어요.

## 재무 분석: 비용 및 수익

이전 섹션은 재무 흐름을 고려하지 않고 물류 관점에서 비즈니스를 설명해 왔어요.

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

하지만 내 친구의 주요 문제는 재고를 보충하기 위해 주문 가능한 유동성이 제한된 것입니다.

![Business Planning with Python Inventory and Cash Flow Management](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_8.png)

그래서 우리는 재무 흐름을 매핑하여 매주 보유 현금을 계산할 것입니다.

수익
역사적 판매액은 판매 채널 별로 분할됩니다.

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

- 배급업체는 출하 후 4 주 후 지급합니다.
  각 판매 후 4 주 후, 송장 금액 (단가 x 수량)이 입금됩니다.
- 커피숍은 주문 시 지불합니다.
  매주 끝날 때 마다, 송장 금액 (단가 x 수량)이 입금됩니다.

![이미지](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_9.png)

💡 관찰 사항
직전 연도의 판매 수치를 고려하지 않으므로, 배급 채널이 처음 4 주 동안 수익을 얻지 못하는 것은 정상입니다.

고정 및 가변 비용

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

- 조달 및 인바운드 물류 비용
  공급업체 및 화물 운송업자는 공장에서 선적이 이뤄지면 지불되어야 합니다.

![이미지](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_10.png)

💡 관찰
주문은 생성된 후 일주일 후에 선적 준비가 됩니다.

- 보관 및 구조 비용
  이에는 팔레트 보관(팔레트당 단위 가격 사용) 및 인력 비용, 설비 비용 등과 같은 반복 비용이 포함됩니다.

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

![](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_11.png)

💡 관찰
내 친구는 창고에 팔렛을 보관하는 데 최소 요금을 지불할 필요가 없었다고 운이 좋았어요.

- 비반복 비용
  이 비용은 일시불로 지불되며, 마케팅 자료 구매, 특별 직원 보너스 또는 유통업체 벌금을 포함할 수 있습니다.
- 수수료 비용
  내 친구는 커피숍에 대한 판매 시 독립적인 영업 대행사와 함께 일하며, 이들은 매출의 30%의 수수료를 받습니다.

![](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_12.png)

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

만약 요약하자면, 다음과 같습니다:

- 수익 흐름에는 두 채널에서의 매출이 포함됩니다.
  총 매출 = (유통업체 매출 + 커피 샵 매출)
- 총 비용에는 고정비용, 가변비용 및 비반복 비용이 모두 포함됩니다.
  총 비용 = (가변 비용 + 고정 비용 + 비반복 비용)

![이미지](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_13.png)

💡 관찰 사항

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

- 우리는 구조 비용이 매우 낮습니다. 고정 비용의 10% 미만입니다.
- 수수료는 두 번째로 큰 비용 항목을 차지합니다.

## 현금 흐름 시뮬레이션

주간 현금 흐름을 계산하면 연말까지 이 활동을 유지하기 위해 얼마나 많은 현금이 필요한지 이해할 수 있습니다.

- 현금 흐름 = 매출액 — 비용

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

![이미지](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_14.png)

💡 관찰 사항

- 현금 흐름은 공급 업체 및 화물 수송업자에게 지불할 때를 제외하고 항상 양수입니다.

만약 우리가 현금이 없는 상태에서 연도를 시작한다고 가정해보자 (나쁜 아이디어),

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

아래는 Markdown 형식으로 변경된 내용입니다.

![Business Planning with Python](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_15.png)

- 현금 최소 잔고는 -124,733 달러입니다.
- 현금 잔고가 3주차와 4주차에 음수입니다.

💡 결론

활동을 원활하게 운영하고 제 시간에 공급 업체에 지불하려면 적어도 연초에 125,000 달러 이상이 필요합니다.

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

다음 섹션에서는 여러 성과 지표를 정의하고 시나리오를 시뮬레이션하여 데이터 기반 비즈니스 통찰력을 제공할 것입니다.

# 비즈니스 기획 최적화

모델이 마련되었으므로 매개변수를 조절하고 다양한 시나리오를 시뮬레이션할 수 있습니다.

각 시나리오는 네 가지 지표를 사용하여 평가될 것입니다.

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

<img src="/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_16.png" />

- Initial cash on hand needed at the beginning of the year: coh_0 ($)
Initial Scenario: coh_0 = 124,733 ($)
- Average cost of goods sold (COGS): cogs ($/Pallet)
Initial Scenario: cogs = 5,057 ($/Pallet)
- Average logistics costs per pallet: log_cost ($/Pallet)
Initial Scenario: log_cost= 417 ($/Pallet)
- Average profitability per pallet: avg_profit ($/Year)
Initial Scenario: avg_profit = 3,686 ($/Year)

The idea is to measure the business and operational performance along the value chain versus the initial scenario.

## Scenario 1: Order Quantity Optimization

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

공급망 엔지니어로서, 나는 물류 흐름과 재고 관리 규칙을 조사해보겠어요.

친구가 유동성 문제를 설명할 때, 내 첫 반응은 주문 수량에 대해 의심해 보는 것이었어요.

평균 8주 분량을 주문하는 것은 그가 재고 부족에 대해 걱정하지 않고 출고 취소(즉, 재고 부족으로 인한 주문 취소)를 피하기 위한 방법이에요.

이제 우리가 안전 재고를 갖춘 최적의 재고 관리 규칙을 갖고 있으니, 주문 수량을 Q = 6주 용량으로 줄일 수 있을 거예요.

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

![BusinessPlanningwithPythonInventoryandCashFlowManagement](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_17.png)

예상 재고 손실을 방지하여 수익에 미치는 영향이 무시할 수 없습니다.

- 연습 시작 시 손에 현금이 더 적게 필요합니다.
  시나리오 1: coh_0 = 74,733($) | -41%
- 매출원가(COGS)가 크게 감소합니다.
  시나리오 1: cogs = 4,928($/파렛) | -2.6%
- 각각의 판매 팔렛당 더 나은 이익을 창출합니다.
  시나리오 1: avg_profit = 3,815($/팔렛) | +3%

💡 결론
이 빠른 승리는 유동성 요구 사항에 대한 여유를 제공하고 추가 수익을 가져다줍니다.

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

이 피드백으로 인해 이 비즈니스 가치 사슬의 전략적 비전에 대해 심층적으로 고찰하게 되었습니다.

- 🙋‍♂️ 왜 인바운드 물류를 항공 운송으로 전환하지 않을까요?
  항공 운송은 매우 비싸지만 더 많은 유연성을 제공합니다. 즉, 평균 재고가 낮아집니다.
- 🙋‍♀️ 유통 업체에만 판매해야 할까요?
  유통업체의 지불 조건은 더 길지만(4주), 영업 수수료를 지불할 필요가 없고, 아웃바운드 물류 비용이 낮아집니다.

이런 의문점들은 합당하지만, 이에 답하기 위해서는 복잡한 계산이 필요하며, 우리 모델이 이를 완벽히 자동화할 수 있습니다.

## 시나리오 2: 인바운드 물류용 항공 운송

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

내 경험상, 항공 화물 운송은 주로 빠른 배송이 필요한 고가 제품에 사용됩니다(주로 명품이나 자동차 부품).

그러나 제 친구에게 운동하라고 제안했습니다

- 화물 중개인이 제안한 항공 운송 요금은 3배 높음
- 배송 리드타임은 4주에서 1주로 단축됨

이제 주문 수량을 8주에서 3주로 줄일 수 있습니다.

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

<img src="/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_18.png" />

💡 관찰 사항

- 평균 재고 수준이 이전보다 낮아졌습니다. 이는 저장 비용을 줄일 수 있습니다.
- 주문 빈도가 더 높고 수량이 적습니다.

안타깝게도, 이는 고비용의 항공 운송 비용을 상쇄하지 못합니다.

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

- 이로 인해 판매원가(COGS)가 증가합니다.
  시나리오 2: cogs = 5,511 ($/팔렛) | +8 %
- 이로 인해 팔렛 당 수익성이 낮아집니다.
  시나리오 2: avg_profit = 3,232 ($/팔렛) | -12 %
- 다행히도, 연초에 필요한 현금이 줄어듭니다.
  시나리오 2: coh_0 = 17,288 ($) | -86 %

요약하면, 장기적으로 수익성이 감소하므로 이 아이디어는 좋은 아이디어가 아닙니다.

## 시나리오 3: 판매 채널 최적화

마지막 시나리오에서는 판매 채널 전략에 초점을 맞출 것입니다.

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

현재 상황에서는 바로 커피숍에 직접 판매하는 것과 유통업체와의 협력이 혼합되어 있습니다.

![2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_19.png](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_19.png)

만약 우리가 유통업체만 사용한다면,

- 출하 후 4주 후에 결제를 받게 됩니다.
- 판매 수수료를 지불할 필요가 없습니다.
  - 직접 판매의 경우 30%의 판매 수수료 vs. 0%의 판매 수수료
- 결합 출하로 배송을 최적화할 수 있습니다.
- 직접 판매와 비교했을 때 경비 운송 비용이 50% 절감됩니다.

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

첫 번째 영향은 처음 지불을 받기까지 4주를 기다려야 한다는 것이며, 이는 유동성 요구에 영향을 미칩니다.

<img src="/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_20.png" />

- 연습 시작 시 더 많은 현금이 필요합니다.
  시나리오 3: coh_0 = 197,602 달러 | -58 %

그러나 수수료 비용을 줄이고 수익성을 향상시키고 있습니다.

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

- Cost of Goods Sales (COGS)에 큰 영향.
  새 시나리오: cogs = 3,172 ($/Pallet) | -38 %
- 판매 당 더 나은 수익성.
  새 시나리오: avg_profit = 5,068 ($/Pallet) | +37 %

## 최적 시나리오

이 작은 연습은 비즈니스에 영향을 미치지 않고 수익을 극대화하는 데 더 나은 가시성과 통찰력을 제공합니다.

![이미지](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_21.png)

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

친구가 비즈니스 수익을 극대화하고 싶다면

- 유통 업체로부터 주문을 더 받아야 하며 직접 판매는 중지해야 합니다.
- 공급 업체로부터 주문 시 6주분의 재고를 유지해야 합니다.

이 계획을 따른다면 데이터에 따르면 수익을 33% 증가시킬 수 있을 것입니다.

# 결론

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

이 방법은 애매한 운영 절차와 비즈니스 관행을 간단한 모델로 번역할 수 있게 해줍니다.

이 모델을 통해 가치 사슬의 각 구성 요소가 서로 상호 작용하는 방식을 이해할 수 있습니다.

![이미지](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_22.png)

한 번의 클릭으로 질문에 대한 답변을 제공하는 것이 목표였습니다.

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

- 바다 화물에서 항공 화물로 바꾸면 어떨까요?
- 최고의 판매 채널이 무엇인가요?
- 물류 비용이 전체 수익에 미치는 영향은 무엇인가요?

이 간단한 모형은 전략적인 통찰력을 제공하지만 제한 사항이 있습니다.

- 구매 비용 구조에는 MOQ 및 감소 가격이 포함되어야 합니다.

이러한 구조를 바탕으로 제품을 주문하고 수령하는 비용을 최소화하는 최적 주문 수량을 찾을 수 있습니다.

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

이 기사에는 더 많은 세부 내용이 있습니다.

- 화물운송업체와 운송회사는 용량과 서비스 수준 계약에 따라 청구서를 작성합니다.

물류 서비스 제공업체들이 유연성을 제공한다면, 자신들의 경로를 최적화하고 가격을 줄일 수 있는 기회가 더 많아질 것입니다.

저는 공급망 솔루션 매니저로 일하면서 이와 같은 연습을 자주 했습니다; 이 기사에 예시가 있습니다.

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

- 고정 비용은 범주별로 구체적으로 나누어야 합니다: CAPEX, 인력, 공과금 등

저는 제 YouTube 채널에서 창고 운영 비용 분석 예시를 공유했습니다.

- 판매 가격에는 결제 기간이 짧은 경우의 할인이나 주문량에 따라 감소하는 금액이 포함될 수 있습니다.
- 판매 대상을 다수의 품목으로 확장하고 비용과 수익을 최적화하기 위해 다양한 제품 조합을 고려할 수 있습니다.

우리는 선형 프로그래밍과 Python을 사용하여 제 친구가 올바른 품목을 판매하면서 유동성, 저장 공간, 공급 업체 용량 제약을 고려하여 수익을 극대화하는 데 도움을 줄 수 있습니다.

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

이 방법론에 대해 더 자세히 알고 싶다면, 이 기사를 참고해보세요.

- 우리는 수익성 또는 지속 가능성 제한을 기반으로 공급 업체 선정을 최적화할 수 있습니다.

초기 모델은 커피잔을 위한 단일 공급 업체를 고려하고 있습니다. 그러나 제 친구는 세계 각지의 공급 업체를 자격을 부여하여 소싱을 다각화하는 작업을 하고 있습니다.

이러한 다양한 공급 업체로부터 데이터를 수집한 후, 저희는 제가 개발한 간단한 웹 애플리케이션을 사용하여 최적의 공급망 네트워크를 설계하는 데 도움을 받을 수 있습니다.

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

<img src="/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_23.png" />

특정 환경 메트릭 또는 비용 최소화를 목표로 하는 경우, 알고리즘은 자동으로 최적의 공급업체를 선택합니다.

<img src="/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_24.png" />

이는 귀하의 고객에게 제품을 생산하고 전달하기 위한 공급망 흐름을 생성합니다.

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

더 많은 세부 정보를 보려면 이 기사를 확인해보세요.

## 다음은 무엇인가요?

이 아이디어는 수익을 극대화하고 환경 영향을 줄이며 유동성에 대한 압력을 피하기 위해 사용할 수 있는 모든 개선 도구들을 수집하는 것입니다.

![이미지](/assets/img/2024-06-20-BusinessPlanningwithPythonInventoryandCashFlowManagement_25.png)

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

다음 기사에서는 제 친구가 그의 비즈니스에 도입한 변화와 모델화에 대한 업데이트를 공유할 것입니다.

# 나에 대해

LinkedIn 및 Twitter에서 연락해요. 저는 데이터 분석을 사용하여 물류 영업을 개선하고 비용을 줄이는 공급망 엔지니어입니다.

데이터 분석과 공급망에 관심이 있다면 제 웹사이트를 방문해주세요.
