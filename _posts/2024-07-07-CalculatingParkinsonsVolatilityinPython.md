---
title: "파이썬으로 파킨슨 변동성 계산하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-CalculatingParkinsonsVolatilityinPython_0.png"
date: 2024-07-07 02:29
ogImage:
  url: /assets/img/2024-07-07-CalculatingParkinsonsVolatilityinPython_0.png
tag: Tech
originalTitle: "Calculating Parkinson’s Volatility in Python"
link: "https://medium.com/@kaabar-sofien/calculating-parkinsons-volatility-in-python-477ec5f13a1b"
---

![Parkinson’s volatility](/TIL/assets/img/2024-07-07-CalculatingParkinsonsVolatilityinPython_0.png)

파킨슨 변동성은 특정 기간 동안 금융 상품의 고가 및 저가를 활용한 역사적 변동성의 측정입니다. 일일 가격 범위를 반영하여 내일의 가격 변동에 대한 추가 정보를 제공하기 때문에 표준 종가 대 종가 변동성 추정치보다 더 효율적이라고 여겨집니다.

이 기사에서는 이 변동성 측정 방법을 자세히 소개하고 Python을 사용하여 시계열에서 롤링 계산을 하는 방법을 보여줍니다.

# 파킨슨 변동성 이해하기

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

복잡한 변동성 모델을 논의하기 전에, 항상 역사적 표준편차라는 가장 기본적인 변동성 모델(또는 계산)을 완전히 이해하는 것이 좋습니다. 역사적 메소드를 사용한 표준편차는 과거 가격 데이터를 기반으로 금융 상품의 변동성을 측정하는 일반적인 방법입니다.

이는 값의 변동이나 분산의 양을 측정합니다. 금융 분야에서는 일반적으로 일별 수익의 평균 주변의 변동을 측정합니다. 표준편차를 계산하는 방법은 다음과 같습니다:

- 차분(첫 번째...
