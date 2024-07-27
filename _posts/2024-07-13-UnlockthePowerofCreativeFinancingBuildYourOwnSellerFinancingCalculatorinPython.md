---
title: "파이썬으로 셀러 파이낸싱 계산기 만들기 창의적 금융의 힘을 활용하는 방법 "
description: ""
coverImage: "/TIL/assets/img/2024-07-13-UnlockthePowerofCreativeFinancingBuildYourOwnSellerFinancingCalculatorinPython_0.png"
date: 2024-07-13 19:45
ogImage: 
  url: /TIL/assets/img/2024-07-13-UnlockthePowerofCreativeFinancingBuildYourOwnSellerFinancingCalculatorinPython_0.png
tag: Tech
originalTitle: "Unlock the Power of Creative Financing: Build Your Own Seller Financing Calculator in Python 🏠💡"
link: "https://medium.com/@analyticsariel/unlock-the-power-of-creative-financing-build-your-own-seller-financing-calculator-in-python-97759329e9e0"
---


<img src="/TIL/assets/img/2024-07-13-UnlockthePowerofCreativeFinancingBuildYourOwnSellerFinancingCalculatorinPython_0.png" />

# 크리에이티브 파이낸스 소개 📊

크리에이티브 파이낸스는 전통적인 은행 대출과 모기지를 넘어 부동산을 사고 판매하는 혁신적인 방법을 가리킵니다. 이러한 방법들은 종종 구매자와 판매자 양쪽에 유연성과 혜택을 제공하여 부동산 투자에서 특히 매력적입니다.

높은 가격, 높은 이자율, 그리고 낮은 재고로 특징 지어지는 현재 시장에서는, 크리에이티브 파이낸싱 전략은 이러한 도전에 대처하고자 하는 부동산 투자자에게 특히 가치 있는 솔루션일 수 있습니다 🚀.

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

# 판매자 융자란 무엇인가요? 🤔

![이미지](/TIL/assets/img/2024-07-13-UnlockthePowerofCreativeFinancingBuildYourOwnSellerFinancingCalculatorinPython_1.png)

판매자 융자는 판매자가 구매자를 위해 구매를 융자하는 거래로, 은행 대출을 받는 대신 구매자가 직접 판매자에게 지불하는 방식을 말합니다 🤝.

이는 구매자가 부동산을 쉽게 구입하고, 판매자가 그렇지 않으면 어려운 부동산을 판매하는 데 도움을 줄 수 있습니다.

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

# 왜 판매자 금융이 부동산 투자자에게 가장 좋은 선택인가요?

- 유연한 조건 📝: 투자자는 이자율, 계약금 및 지불 일정 등 양쪽 모두에게 가장 적합한 조건을 협상할 수 있습니다.
- 쉬운 자격 요건 ✔️: 전통 은행 대출에 자격이 없는 구매자도 부동산을 구매할 수 있습니다.
- 판매자에게 더 높은 수익률 📈: 판매자들은 금융된 금액에 대한 이자를 받아 더 높은 수익을 올릴 수 있습니다.
- 현재 시장 상황 🌟: 높은 가격, 높은 이자율 및 낮은 재고가 특징인 현재 기후 속에서 판매자 금융은 중요한 장점을 제공할 수 있습니다. 이는 투자자들이 여전히 수익성 있는 부동산을 찾고 자금을 조달할 수 있도록 거래를 창의적으로 구조화할 수 있게 해줍니다.

# 실시간 판매자 금융 계산기 ⏱️

파이썬으로 직접 판매자 금융 계산기를 작성하기에 들어가기 전에, Streamlit 앱을 소개하고 싶습니다 💻.

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

이 앱은 여기에서 이용할 수 있으며, 우리가 살펴볼 동일한 코드를 실시간으로 사용할 수 있게 해줍니다. 매개변수를 입력하고 결과를 즉시 확인할 수 있어 잠재적 거래를 분석하는 강력한 도구가 될 것입니다.

# Python으로 판매자 금융 계산기 만들기 🐍

단계별로 판매자 금융 계산기를 만드는 과정을 살펴보겠습니다. Python을 사용하여 기능을 구현할 것입니다. 사용 사례의 매개변수는 다음과 같습니다:

- sale_price = 379900
- down_payment_rate = 10
- annual_interest_rate = 3.5
- loan_term_years = 30
- balloon_due_years = 5
- interest_only_years = False

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

## 단계 1: 초기 대출 금액 설정 💵

우선, 계산해야 하는 것은 계약금 및 초기 대출 금액입니다.

```js
# 매개변수
sale_price = 379900
down_payment_rate = 10

# 초기 대출 금액 계산
down_payment = int(sale_price * (down_payment_rate / 100))
loan_amount = sale_price - down_payment

# 결과 출력
print(f"계약금: ${down_payment:0,.0f}")
print(f"대출 금액: ${loan_amount:0,.0f}")
```

설명: 우리는 판매 가격과 계약금 비율에 기반하여 계약금을 계산하고, 판매 가격에서 계약금을 뺀 결과를 통해 대출 금액을 결정합니다.

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

## 단계 2: 매월 상환액 계산하기 📅

이제, 매월 지불해야 하는 주택담보 대출 상환액을 계산합니다.

```js
# 추가 매개변수
연간 이자율 = 3.5
대출 기간(년) = 30

# 월 이자율
월 이자율 = 연간 이자율 / 100 / 12
# 총 상환 횟수
총 상환 횟수 = 대출 기간(년) * 12

# 완전 상환 대출의 매월 상환액 계산
if 월 이자율 > 0:
    매월 상환액 = 대출금액 * 월 이자율 / (1 - (1 + 월 이자율) ** -총 상환 횟수)
else:
    매월 상환액 = 대출금액 / 총 상환 횟수

# 결과 출력
print(f"매월 상환액: ${매월 상환액:0,.2f}")
```

해설: 대출금액, 연간 이자율 및 대출 기간을 사용하여 매월 상환액을 계산합니다. 이 단계에서는 월 이자율을 결정하고 완전 상환 대출의 매월 상환액 공식을 사용합니다.

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

## 단계 3: 분할 상환 표 작성하기 📊

이제 대출 기간 동안 지불을 추적하기 위한 분할 상환 표를 생성합니다.

```js
import pandas as pd

# 분할 상환 표 생성
amortization_table = []
balance = loan_amount
for month in range(1, total_payments + 1):
    interest_payment = balance * monthly_interest_rate
    principal_payment = monthly_payment - interest_payment
    balance -= principal_payment
    amortization_table.append([month, round(monthly_payment, 2), round(interest_payment, 2), round(principal_payment, 2), max(round(balance, 2), 0)]

# DataFrame으로 변환하여 분할 상환 표 표시
df_amortization_table = pd.DataFrame(amortization_table, columns=["월", "매월 상환액", "이자", "원금", "잔여 대출 잔액"])

# 분할 상환 표의 처음 몇 행을 출력
df_amortization_table.head()
```

설명: 월별 지불의 이자 및 원금 부분을 계산하고 남은 대출 잔액을 업데이트합니다. 이 정보는 분할 상환 표에 저장되며 DataFrame을 사용하여 표시됩니다.

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

## 단계 4: 풍선 상환 및 이자 전만기 처리하기 🎈

풍선 상환 또는 이자 전만기가 있는 시나리오를 처리해야 합니다.

```js
# 추가 매개변수
balloon_due_years = 5
interest_only_years = False

# 풍선 상환을 위해 분할상환표 조정
if balloon_due_years:
    total_payments_balloon = balloon_due_years * 12
    amortization_table_balloon = amortization_table[:total_payments_balloon]
    balloon_payment = amortization_table_balloon[-1][-1]
    amortization_table_balloon[-1][-1] = 0  # 풍선 상환 후 잔액은 0으로 설정

    # DataFrame으로 변환
    df_amortization_table = pd.DataFrame(amortization_table_balloon, columns=["월", "월 상환액", "이자", "원금", "잔여 잔액"])

    # 조정된 분할상환표의 처음 몇 행 출력
    print(df_amortization_table.head())
    print(f"풍선 상환금: ${balloon_payment:0,.2f}")

# 총 지급 이자
total_interest_paid = df_amortization_table["이자"].sum()
print(f"총 이자 지급액: ${total_interest_paid:0,.2f}")

# 총 지급액
total_payments_made = df_amortization_table["월 상환액"].sum() + (balloon_payment if balloon_due_years else 0)
print(f"총 지급액: ${total_payments_made:0,.2f}")
```

설명: 풍선 상환금이 있을 경우, 분할상환표를 이에 맞게 조정합니다. 풍선 상환 후 잔금은 0으로 설정됩니다. 또한 총 지급 이자와 총 지급액을 계산합니다.

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

# 완성된 코드 구현 🖥️

판매자 금융 계산기의 전체 코드입니다:

```js
import pandas as pd

# 매개변수
sale_price = 379900
down_payment_rate = 10
annual_interest_rate = 3.5
loan_term_years = 30
balloon_due_years = 5
interest_only_years = False

# 초기 대출액 계산
down_payment = int(sale_price * (down_payment_rate / 100))
loan_amount = sale_price - down_payment

# 월 이자율
monthly_interest_rate = annual_interest_rate / 100 / 12
# 총 상환 횟수
total_payments = loan_term_years * 12

# 완전상환 대출의 월 상환액 계산
if monthly_interest_rate > 0:
    monthly_payment = loan_amount * monthly_interest_rate / (1 - (1 + monthly_interest_rate) ** -total_payments)
else:
    monthly_payment = loan_amount / total_payments

# 분할 상환 테이블 생성
amortization_table = []
balance = loan_amount
for month in range(1, total_payments + 1):
    interest_payment = balance * monthly_interest_rate
    if interest_only_years and month <= interest_only_years * 12:
        principal_payment = 0
        monthly_payment_during_interest_only = loan_amount * monthly_interest_rate
        amortization_table.append([month, monthly_payment_during_interest_only, interest_payment, principal_payment, balance])
    else:
        principal_payment = monthly_payment - interest_payment
        balance -= principal_payment
        amortization_table.append([month, round(monthly_payment, 2), round(interest_payment, 2), round(principal_payment, 2), max(round(balance, 2), 0)])
    if balloon_due_years and month == balloon_due_years * 12:
        balloon_payment = balance
        amortization_table.append([month, round(monthly_payment, 2), round(interest_payment, 2), round(principal_payment, 2), 0])
        break

# 표시를 위해 분할 상환 테이블을 DataFrame으로 변환
df_amortization_table = pd.DataFrame(amortization_table, columns=["Month", "Monthly Payment", "Interest", "Principal", "Remaining Balance"])

# 결과 출력
print(df_amortization_table.head())

# 지불된 총 이자
total_interest_paid = df_amortization_table["Interest"].sum()
print(f"지불된 총 이자: ${round(total_interest_paid, 2)}")

# 총 지불액
total_payments_made = df_amortization_table["Monthly Payment"].sum() + (balloon_payment if balloon_due_years else 0)
print(f"총 지불 금액: ${round(total_payments_made, 2)}")
```

# 결론

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

이 단계를 따라가면 Python에서 강력한 판매자 금융 계산기를 만들 수 있어요.

이 도구는 여러 금융 시나리오를 분석하고 부동산 투자에 있어 판단력 있는 결정을 내릴 수 있게 도와줄 거예요.

# Cash Flowing Seller Finance 거래 찾기

창조적인 금융 전략을 활용할 기회를 찾고 다음 투자를 성공적으로 이루는 Coffee Clozers Creative을 확인해보세요! 👉

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

# 노트북 복제

# 커뮤니티에 참여하세요

부동산 기술 페이스북 그룹에 가입하여 기술, 데이터 및 부동산 관련 토론에 참여해 보세요.