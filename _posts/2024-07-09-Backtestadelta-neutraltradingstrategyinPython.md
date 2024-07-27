---
title: "Python으로 델타 뉴트럴 트레이딩 전략 백테스트 하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-Backtestadelta-neutraltradingstrategyinPython_0.png"
date: 2024-07-09 14:50
ogImage:
  url: /assets/img/2024-07-09-Backtestadelta-neutraltradingstrategyinPython_0.png
tag: Tech
originalTitle: "Backtest a delta-neutral trading strategy in Python"
link: "https://medium.com/@tng-daryl/backtest-a-delta-neutral-trading-strategy-in-python-602cd85e22e0"
---

![image](/TIL/assets/img/2024-07-09-Backtestadelta-neutraltradingstrategyinPython_0.png)

옵션의 가장 강력한 사용 방법 중 하나는 투자 포트폴리오를 기본 자산의 방향성 스윙으로부터 격리시키는 능력입니다.

Apple 주식을 매수하면 다음과 같은 상황이 발생합니다:

- Apple 주식이 상승하면 가치가 증가합니다.
- Apple 주식이 하락하면 가치가 감소합니다.

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

<img src="/TIL/assets/img/2024-07-09-Backtestadelta-neutraltradingstrategyinPython_1.png" />

당신의 포지션은 방향성 노출이 있으며 델타가 1이라고 합니다.

그냥 포지션을 유지하면 주식에서 미실현 이익과 손실에 노출됩니다.

대부분의 소액 투자자들에게 작은 손실은 투자의 일부입니다.

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

그러나 대형 기관 투자자들은 특정 투자 규정(예: 미 실현 손실이 15%를 초과해서는 안 된다)에 따라, 미 실현 손실이 발생하는 것은 금물입니다.

# 델타 제거하기

다행히도, 우리가 보게 될 것처럼, 주식 보유량과 옵션을 조합하여 보유 위치에서 델타를 부분적/전적으로 제거하는 것이 가능합니다. 이를 적극적으로 관리하여 가능합니다.

옵션 용어에서는 이를 델타 헷징이라고 합니다.

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

## 방향성 노출 조정하기

현재 인벤토리에 주식 보유 중이라면, 방향성 노출을 조정하는 간편한 방법은 콜 옵션을 매수하거나 공매도하는 것입니다.

![이미지1](/TIL/assets/img/2024-07-09-Backtestadelta-neutraltradingstrategyinPython_2.png)

![이미지2](/TIL/assets/img/2024-07-09-Backtestadelta-neutraltradingstrategyinPython_3.png)

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

특정 계약에서 콜의 델타는 0.77이며, 완전히 델타 중립이 되기 위해 주식 대 콜 옵션의 비율은 77:100이어야 합니다.

많은 옵션 계약에서는 100단위의 주식/상품/자산을 표현합니다. 따라서, 각 콜 옵션을 판매할 때마다 77주를 구매/보유해야 합니다.

보유 주식 수 = 매도한 콜 옵션 수 _ 100 _ 델타

다음 날/주에 콜의 델타가 0.80으로 증가하면, 각 콜 당 추가로 3주를 더 매입해야 합니다.

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

엄밀히 말하면 역방향도 가능합니다. 매수하거나 빌림으로써 주식 보유량과 델타를 일치시킬 수 있습니다.

그러나 콜 옵션은 100주의 주식을 나타내므로 델타의 정확한 가치를 제어할 수 있는 기회가 줄어듭니다. (예: 0.2개의 콜 옵션을 구매하여 20주의 델타를 확보할 수는 없습니다).

# 델타 헷지 전략 테스트 중

위의 비디오에서 사용된 예시는 John Hull의 다음 교과서에 나와 있습니다.

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

![image](/TIL/assets/img/2024-07-09-Backtestadelta-neutraltradingstrategyinPython_4.png)

이 예제에서는 1000개의 숏 콜(short calls)을 시작으로 책이 시작됩니다. 이것은 10만 주의 가치가 있는 숏 포지션을 나타냅니다.

이 연습의 목표는 콜의 델타에 기반하여 매주 포트폴리오를 리밸런싱하는 것입니다.

![image](/TIL/assets/img/2024-07-09-Backtestadelta-neutraltradingstrategyinPython_5.png)

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

통화물이 처음으로 주 0에 구입되었을 때, 해당 통화물의 델타는 0.522입니다. 따라서 모든 통화물의 델타 합은 52,200입니다.

주식 한 주의 델타가 1이라면, 우리는 이를 완벽하게 균형을 이루기 위해 52,200주를 구입하거나 보유해야 합니다.

이 과정은 이후의 모든 주에도 계속됩니다.

## 주의

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

주식 가격이 1주차와 2주차에 하락하는 것을 관찰하실 수 있습니다.

하지만, 우리는 주식을 판매하고 있습니다.

이로 인해 주식 거래에서 손실이 발생합니다.

그러나 우리의 숏 콜 포지션은 네거티브 델타를 가지고 있습니다. (주식 가격이 하락함에 따라 가치가 증가), 우리는 콜 옵션을 더 낮은 가격에 다시 매수하여 우리의 숏 포지션에서 이익을 실현할 수 있습니다.

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

네트 효과는 포트폴리오에서 발생하는 어떤 이익도 손실을 상쇄합니다.

## 왜 필요할까요

델타 헷징의 대부분 목표는 알 수 없는 방향 위험을 절연하는 것입니다.

이러한 경우는 주로 선거나 정부 발표와 같은 이벤트가 예정되어 있는 경우에 발생합니다.

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

곰계의 소식이 나쁜 경우에는 포트폴리오 자산에 손실이 발생할 수 있지만, 옵션 거래에서의 수익은 그 손실을 일부 또는 전체로 상쇄시킬 것입니다.

## Python 코드

Hull 교재에서는 델타 값과 가격들의 시리즈를 제공했습니다.

델타 값은 양수로 표기되어 있으며, 공매도를 할 경우 해당 값을 음수로 바꿔야 합니다.

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

```js
delta_values = np.array(delta_values)
delta_values=list(-delta_values) if apple.long_short_option == 'Short'
else delta_values
```

```js
import numpy as np
prices = [49, 48.12, 47.37, 50.25, 51.75, 53.12, 53, 49.88, 48.5,
          49.88, 50.37, 52.13, 51.88, 52.87, 54.87, 54.62, 55.87, 57.25]
delta_values = [0.522, 0.458, 0.4, 0.596, 0.693, 0.774, 0.771, 0.706, 0.674, 0.787, 0.550,
                0.413, 0.542, 0.591, 0.768, 0.759, 0.865, 0.978, 0.990, 1, 1]

delta_values = np.array(delta_values)

class Position:
    def __init__(self, current_pos_delta,
                 option_contracts,
                 shares_held,
                 cash,
                 long_short_option,
                 PnL
                 ):
        self.current_pos_delta = current_pos_delta
        self.option_contracts = option_contracts
        self.shares_held = shares_held
        self.cash = cash
        self.long_short_option = long_short_option
        self.PnL = PnL
        pass

apple = Position(0, 1000, 0, 0, 'Short', 0)

def buy_sell(long_short, price, quantity):
    if long_short=="Long":
        apple.cash -= price*quantity
        pass

    elif long_short=='Short/Sell':
        apple.cash += price*quantity
        pass

def delta_hedge(option_contracts,
                option_delta,
                shares_held,
                price
                ):
    new_pos_delta = option_contracts*option_delta*100
    delta_hedge = new_pos_delta - apple.current_pos_delta
    long_short = "Short/Sell" if delta_hedge>0 else "Long"
    shares_held += -new_pos_delta
    holdings_value = shares_held*price

    buy_sell(long_short=long_short, price=price, quantity=abs(int(delta_hedge)))
    apple.PnL = holdings_value+apple.cash

    print("|Delta to hedge: ", delta_hedge, "|",
          "Shares/Tokens to" ,long_short,": " ,abs(int(delta_hedge)),"|",
          "Shares Held: ", int(shares_held), "|",
          "Value of Holdings: $", holdings_value ,"|",
          "Cash holdings: $", apple.cash, "|",
          "PnL: $", apple.PnL, "|")
    apple.current_pos_delta = new_pos_delta
    pass

delta_values=list(-delta_values) if apple.long_short_option == 'Short' else delta_values

for (delta, price) in zip(delta_values, prices):
    delta_hedge(option_contracts=apple.option_contracts,
                option_delta=delta,
                shares_held=apple.shares_held,
                price=price)
```

위 코드를 실행하여 command line에서 출력되는 내용은 다음과 같습니다.
