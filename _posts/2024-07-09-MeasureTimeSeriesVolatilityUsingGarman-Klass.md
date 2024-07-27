---
title: "Garman-Klass를 사용해 시계열 변동성 측정하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-MeasureTimeSeriesVolatilityUsingGarman-Klass_0.png"
date: 2024-07-09 09:09
ogImage:
  url: /assets/img/2024-07-09-MeasureTimeSeriesVolatilityUsingGarman-Klass_0.png
tag: Tech
originalTitle: "Measure Time Series Volatility Using Garman-Klass"
link: "https://medium.com/@kaabar-sofien/measure-time-series-volatility-using-garman-klass-865901ba9322"
---

![Garman-Klass volatility estimator](/TIL/assets/img/2024-07-09-MeasureTimeSeriesVolatilityUsingGarman-Klass_0.png)

가만-클라스(Grarman-Klass) 변동성 추정기는 고가, 저가, 시가 및 종가를 사용하여 금융 자산의 변동성을 추정하는 방법입니다. 이 방법은 종가만 사용하는 기존 방법보다 변동성을 더 정확하게 추정하는 데 설계되었습니다.

이 기사에서는 이 변동성 측정 방법을 자세히 설명하고 Python을 사용하여 시계열에 대한 롤링 계산을 코드화하는 방법을 보여줍니다.

# 가만-클라스(Grarman-Klass) 변동성 이해하기

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

복잡한 변동성 모델을 논의하기 전에, 먼저 기본적인 변동성 모델(또는 계산)인 역사적 표준 편차에 대해 완벽히 이해하는 것이 좋습니다. 역사적 방법을 사용한 표준 편차는 과거 가격 데이터를 기반으로 금융 상품의 변동성을 측정하는 일반적인 방법입니다.

이는 값들의 변동이나 분산의 양을 측정합니다. 금융 분야에서는 보통 일일 수익률의 평균 주변의 분산을 측정합니다. 표준 편차를 계산하려면 다음 단계를 따르세요:

- 차분(첫 번째 함수) 또는 로그 방법(두 번째 함수)을 사용하여 수익을 계산합니다.
