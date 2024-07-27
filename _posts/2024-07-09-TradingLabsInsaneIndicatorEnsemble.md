---
title: "TradingLab의 Insane 지표 모음 활용법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-TradingLabsInsaneIndicatorEnsemble_0.png"
date: 2024-07-09 14:48
ogImage:
  url: /assets/img/2024-07-09-TradingLabsInsaneIndicatorEnsemble_0.png
tag: Tech
originalTitle: "TradingLab’s “Insane“ Indicator Ensemble"
link: "https://medium.com/coinmonks/i-backtested-tradinglabs-indicator-that-you-ll-ever-need-f66d0b312e0b"
---

<img src="/TIL/assets/img/2024-07-09-TradingLabsInsaneIndicatorEnsemble_0.png" />

여러분 안녕하세요! 또 다른 백테스트 결과로 돌아왔어요. TradingLab이 "꼭 시도해봐야 할"이라고 한 미친 듯한 지표 앙상블을 사용한 비디오를 올렸던데요. 여기서 비디오를 보실 수 있어요:

하지만, 저는 그의 전략이 정말 그렇게 좋을지 궁금해졌어요. 그래서 테스트를 해보려고 해요. 함께 해요!

# 어떤 지표를 사용할까요?

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

TradingLab은 TradingView에서 사용 가능한 두 지표에 중점을 둡니다:

## 1) colinmck가 만든 EMA Trend Meter

이 지표(또는 사용될 부분)은 단순히 종가를 기반으로 네 개의 EMA를 활용하고 모든 세 EMA가 기준선 EMA 위에 있는지 확인합니다. Python 코드는 다음과 같습니다:

```js
import talib

def ema_trend_meter(close, len0=13, len1=21, len2=34, len3=55):
    ema0 = talib.EMA(close, timeperiod=len0)
    ema1 = talib.EMA(close, timeperiod=len1)
    ema2 = talib.EMA(close, timeperiod=len2)
    ema3 = talib.EMA(close…
```
