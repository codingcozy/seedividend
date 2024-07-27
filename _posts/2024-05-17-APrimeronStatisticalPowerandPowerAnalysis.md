---
title: "통계적 파워와 파워 분석 개요"
description: ""
coverImage: "/assets/img/2024-05-17-APrimeronStatisticalPowerandPowerAnalysis_0.png"
date: 2024-05-17 20:47
ogImage: 
  url: /assets/img/2024-05-17-APrimeronStatisticalPowerandPowerAnalysis_0.png
tag: Tech
originalTitle: "A Primer on Statistical Power and Power Analysis"
link: "https://medium.com/@keith-mcnulty/a-primer-on-statistical-power-and-power-analysis-bdce41e97475"
---


만약 내 경험이 너의 것과 비슷하다면, 너도 일할 때 '통계적 파워'에 대해 다양한 사람들이 이야기하는 것을 들어본 적이 있을 거야. 대부분의 경우, 이들 사람들은 더 큰 표본 크기를 주장하면서 보통 더 많은 n이 항상 좋다는 모호한 개념을 기반으로 이야기하는 것 같아.

하지만 이들 중 얼마나 많은 사람이 실제로 '통계적 파워'가 무엇인지 정의할 수 있는지 알고 있을까? 이 기사에서는 통계적 파워의 개념과 정의를 살펴보고 이것이 측정 수단으로 어디에 유용한지 확인해보려고 해.

## 가설 검정

‘통계적 파워’라는 용어는 가설 검정을 할 때만 의미가 있어. 아마도 네가 기억할 수 있듯이, 가설 검정은 데이터 샘플의 통계적 특성을 사용해 그 샘플이 추출된 전체 모집단에 대한 진술의 확신 수준을 결정하는 것을 포함해. 예를 들어보자. 사람들 분석 데이터 R 패키지의 세일즈인 사원들의 데이터 셋은 기술 회사의 샘플 세일즈인들의 데이터를 포함하고 있어, 이들의 연간 매출액(천 달러)과 최근에 증가하는 순서 척도의 평가 등급을 포함하고 있어. 처음 몇 행을 살펴보자.

<div class="content-ad"></div>

```R
library(peopleanalyticsdata)
salespeople <- salespeople[complete.cases(salespeople), ]
head(salespeople)

##          promoted sales customer_rate performance
## 1        0        594   3.94          2
## 2        0        446   4.06          3
## 3        1        674   3.83          4
## 4        0        525   3.62          2
## 5        1        657   4.40          3
## 6        1        918   4.54          2
```

이제 이 문장을 살펴봅시다. 최상위 성과 영업 사원의 평균 매출액은 전체 인구의 최하위 성과 영업 사원들과 다를 수 있다는 것입니다. 이 문장을 검증하기 위해, 우리는 최상위 성과자와 최하위 성과자의 평균 매출액이 동일하다고 가정하고, 이를 귀무 가설이라고합니다. 그런 다음 귀무 가설이 전체 인구에서 사실일 때 샘플이 보이는 방식의 최대 확률을 설정하기 위해 테스트를 수행하고, 이를 테스트의 p값이라고합니다. 이 경우, 균등한 분산을 가진 두 샘플을 비교하기 위해 Welch의 t-테스트를 수행합니다.

```R
# 최상위 성과자의 매출
sales4 <- salespeople$sales[salespeople$performance == 4]

# 최하위 성과자의 매출
sales1 <- salespeople$sales[salespeople$performance == 1]

# 두 평균이 동일하다는 귀무 가설의 p값
t.test(sales4, sales1)$p.value

## 1.093244e-05
```

위 결과는 만일 우리의 귀무 가설이 전체 인구에서 사실이라면, 우리의 샘플이 보이는 방식은 매우 잘 나타나지 않을 가능성이 있다는 것을 의미합니다. 우리는 귀무 가설을 기각하기로 합의하는 확률 수준을 정의하고, 이를 알파로 알려집니다. 종종 알파 값은 0.05이지만, 때로는 더 낮을 수도 있습니다. 여기서 알파 값을 0.05로 설정하면, 귀무 가설을 편안하게 기각하고 대립 가설을 결론 내리게 됩니다 — 즉, 인구에서 낮은 성과자와 높은 성과자 간 평균 매출액에 차이가 있다는 것입니다. 알파 값을 0.05로 선택함으로써, 평균적으로 20번 중 1회 틀린 결론을 내리게 될 것이라는 것을 유의하십시오. 가설 검정은 확률에 관한 것이며, 확신에 관한 것이 아닙니다.

<div class="content-ad"></div>

## 통계적 유의성 정의

우리는 가설 검정이 우리가 존재하는 모집단의 차이를 결론 내릴만큼 충분히 확신하는 수준에 대한 것임을 알 수 있습니다. 이는 우리가 그 모집단의 샘플만을 관측할 수 있다는 것을 인정하는 것입니다. 본질적으로 미 관측 모집단에 대해 100% 확실한 것은 없으며, 따라서 네 가지 경우가 발생할 수 있습니다:

- 귀무 가설이 모집단에 대해 사실이고, 그것이 샘플을 기반으로 기각되지 않음
- 귀무 가설이 모집단에 대해 사실이고, 그것이 샘플을 기반으로 기각됨 (1종 오류)
- 귀무 가설이 모집단에 대해 부정하고, 그것이 샘플을 기반으로 기각되지 않음 (2종 오류)
- 귀무 가설이 모집단에 대해 부정하고, 그것이 샘플을 기반으로 기각됨

통계적 유의성은 4번과 관련이 있습니다 — 이는 모집단에 대해 거짓이라는 것이 주어졌을 때 샘플을 기반으로 귀무 가설이 기각될 확률입니다. 직관적으로, 이는 샘플의 크기, 실제(미관측) 모집단의 차이(적절히 정규화된), 그리고 귀무 가설을 기각하는 확신의 수준(알파)에 따라 달라집니다. 예를 들어 실제 모집단의 차이가 더 클 경우, 더 작은 샘플에서 확인할 수 있습니다. 알파가 작을 경우, 더 큰 모집단 차이나 더 높은 'n'이 필요할 수 있습니다.

<div class="content-ad"></div>

이 방에 있는 코끼리는 물론 우리는 인구 차이를 결코 알 수 없을 것입니다. 우리는 우리 샘플의 차이만을 알고 있습니다. 따라서 보통 우리는 우리 샘플에서 관측된 통계적인 파워를 만족시키고 자신을 다스립니다. 여기서 우리의 영업사원 예시를 들어 보면, 이것이 t-검정이기 때문에 우리는 Cohen의 효과 크기 d를 정규화된 관측된 차이로 사용합니다. 이를 샘플 크기와 알파 0.05와 결합하여 우리의 가설 검정을 위한 통계적인 파워를 0.996로 계산할 수 있습니다. 우리는 귀무가설이 정확하게 기각될 것이라고 매우 확신할 수 있습니다.

```js
library(effectsize)
library(WebPower)

# sample sizes
n4 <- length(sales4)
n1 <- length(sales1)

# cohen's effect size d
d <- cohens_d(sales4, sales1)$Cohens_d

# statistical power
wp.t(n4, n1, d = d, type = "two.sample.2n")


## Unbalanced two-sample t-test
##
## n1 n2         d alpha    power
## 55 60 0.8741483 0.05     0.996347
```

## 통계적인 파워를 사용하는 경우

솔직히 말해서 그렇게 자주 사용되지는 않습니다. 당신이 샘플들과 데이터들을 가지고 이미 가설 테스트를 진행한 상황에서, 통계적인 파워는 실제로 단지 얼마나 잘 알파 바를 넘어섰는지를 나타내는 지표일 뿐입니다. 알파가 덜 엄격할수록 파워가 높아집니다. 한번 확인해보세요.

<div class="content-ad"></div>

```r
library(ggplot2)

# 통계적 파워
test <- WebPower::wp.t(n4, n1, d = d, type = "two.sample.2n", 
                       alpha = seq(0.05, 0.0001, by = -0.0001))

test_df <- data.frame(
  Alpha = test$alpha,
  Power = test$power
)


# 알파에 대한 파워 플롯
ggplot(test_df, aes(x = Alpha, y = Power)) +
  geom_point(color = "pink") +
  theme_minimal()
```

<img src="/assets/img/2024-05-17-APrimeronStatisticalPowerandPowerAnalysis_0.png" />

샘플 데이터를 가져오지 않았거나 가설 검정을 수행하지 않았다면, 실험이나 연구를 계획 중이고 많은 작업이 필요한 경우 통계적 파워는 도움이 될 수 있습니다. 샘플 크기가 역할을 하기 때문에 이론적으로 특정 알파 기준을 달성하기 위한 최소 샘플 크기를 계산할 수 있습니다.

하지만 실제로는 관측된 효과 크기를 알아야 하는데, 물론 아직 실험을 실행하지 않았기 때문에 알 수가 없습니다. 따라서 통계적 파워 계산에서 나오는 대부분의 샘플 크기 추정은 민감도 범위의 형태를 취하는 경향이 있습니다.


<div class="content-ad"></div>

실험은 조직하고 자원을 조달하기 어려울 수 있으며, 통계적 파워는 필요한 규모를 결정하는 데 도움이 될 수 있습니다. 또한 샘플 크기를 테스트할 때 중요한 부분에서 추가적인 n이 파워에 큰 영향을 미치지 않는 지점이 있는지 보여줄 수도 있습니다. 예를 들어, 중간 효과 크기와 알파 0.05를 가진 쌍체 t-테스트에서 여러 샘플 크기 범위를 시험하면, 추가적인 n이 파워에 큰 차이를 만들지 않는 시점을 볼 수 있습니다.

```js
# 여러 샘플 크기를 테스트
sample_sizes <- 20:100
power <- wp.t(n1 = sample_sizes, d = 0.5, type = "paired")

power_df <- data.frame(
  n = power$n,
  Power = power$power
)

# 샘플 크기에 따른 파워 플롯
ggplot(power_df, aes(x = n, y = Power)) +
  geom_point(color = "lightblue") +
  theme_minimal()
```

<img src="/assets/img/2024-05-17-APrimeronStatisticalPowerandPowerAnalysis_1.png" />

전반적으로, 통계적 파워는 총명치인 도구입니다. 이것은 주로 실험 디자인과 관련된 특정 상황에서만 유용한 가설 검정의 '볼트온'으로 생각할 수 있습니다.

<div class="content-ad"></div>

만약 통계적 역량 및 검정 및 회귀 모델에서 사용되는 다양한 통계에 대해 더 자세히 탐구하고 싶다면, People Analytics의 Handbook of Regression Modeling의 11장을 확인해보세요.

![이미지](/assets/img/2024-05-17-APrimeronStatisticalPowerandPowerAnalysis_2.png)