---
title: "시계열 예측을 위한 범용 머신 러닝 프레임워크"
description: ""
coverImage: "/TIL/assets/img/2024-07-06-AGeneralizedMachineLearningFrameworkforTimeSeriesForecasting_0.png"
date: 2024-07-06 02:23
ogImage:
  url: /assets/img/2024-07-06-AGeneralizedMachineLearningFrameworkforTimeSeriesForecasting_0.png
tag: Tech
originalTitle: "A Generalized Machine Learning Framework for Time Series Forecasting"
link: "https://medium.com/towards-artificial-intelligence/a-generalized-machine-learning-framework-for-time-series-forecasting-54f839546d9e"
---

/assets/img/2024-07-06-AGeneralizedMachineLearningFrameworkforTimeSeriesForecasting_0.png

# 소개

시계열 예측은 예측 모델링에서 필수적이며 데이터 과학자들의 큰 관심을 끕니다. 그 응용 분야는 공급망 수요 예측부터 금융 시장 예측까지 다양합니다. 전통적인 모델과는 달리, 시계열 예측 모델은 시간의 고유한 변동성으로 인해 불안정할 수 있습니다.

최근 게시한 글, '시계열 예측: SARIMAX, RNN, LSTM, Prophet, 그리고 Transformer의 비교 분석'에서 여러 시계열 예측 방법을 비교 분석했습니다. 기계 학습 접근 방법을 포함해야 했으나 글이 너무 길어졌습니다. 따라서 이 논문을 발표하여 그 갭을 해결하고자 합니다.

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

이 게시물에서는 시계열 모델을 계속 탐구하겠습니다. 이 모델들은 어떻게 작동하는지, 그리고 왜 특성 엔지니어링을 사용하여 거래 데이터를 예측하기 위한 일반화된 머신러닝 프레임워크를 제안했는지에 대해 계속 알아보겠습니다. 머신러닝을 시계열 예측에 적용하는 것은 새로운 것은 아니지만, 제안하는 일반화된 프레임워크는 다양한 시나리오에서 실제 시계열 예측에 대한 도전 과제를 해결하려고 합니다.

# 1: 예측의 개요 대 ...
