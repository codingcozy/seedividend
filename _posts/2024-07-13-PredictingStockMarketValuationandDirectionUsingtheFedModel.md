---
title: "Fed 모델을 이용한 주식 시장 가치 평가 및 방향 예측 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-PredictingStockMarketValuationandDirectionUsingtheFedModel_0.png"
date: 2024-07-13 19:06
ogImage: 
  url: /TIL/assets/img/2024-07-13-PredictingStockMarketValuationandDirectionUsingtheFedModel_0.png
tag: Tech
originalTitle: "Predicting Stock Market Valuation and Direction Using the Fed Model"
link: "https://medium.com/ai-advances/predicting-stock-market-valuation-and-direction-using-the-fed-model-85576b3228a2"
---


![image](/TIL/assets/img/2024-07-13-PredictingStockMarketValuationandDirectionUsingtheFedModel_0.png)

코르델 태니(Cordell Tanny)는 금융 서비스 분야에서 24년 이상의 경험을 보유한 전문가로, 주로 양적 금융에 특화되어 있습니다. 코르델는 이전에 주요 캐나다 기관에서 양적 분석가 및 포트폴리오 매니저로 근무하며 20억 달러 규모의 다자산 소매 투자 프로그램을 관리했습니다.

현재 코르델는 Trend Prophets의 대표이사이자 공동 창립자로 활동하고 있으며, 양적 금융 및 AI 솔루션 기업인 DigitalHub Insights의 경영 이사로도 활동하고 있습니다. 또한, 코르델는 맥길 대학(McGill University)에서 생물학 학사 학위를 취득한 바 있습니다. 그는 CFA 채터홀더로서 금융 리스크 관리자 자격증을 보유하고 있으며, 금융 데이터 전문가 자격증을 소지하고 있습니다.

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

trendprophets.com을 방문하여 더 많은 정보를 얻을 수 있어요.

이 기사에 대한 모든 Python 코드는 code templates를 등록하면 여기에서 찾을 수 있어요 (페이지 하단의 code templates에 등록하기란 부분에 있어요).

S&P 500의 역사적 PE 데이터는 macrotrends.net의 공짜 다운로드로 이용 가능해요.

GitHub 저장소에도 이용 가능해요.

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

## 간단 버전

요약

Fed Model Basics: S&P 500의 수익률을 10년 만기 미국 국채 수익률과 비교하여 시장의 매력도를 평가합니다.

스프레드 해석: 양의 스프레드는 주식이 저평가되었음을 나타내고, 음의 스프레드는 채권이 더 매력적이라는 것을 시사합니다.

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

인기를 얻은 Ed Yardeni에 의해 만들어진 이 모델은 혼돈스럽지만 여전히 유용한 가치평가 도구로 남아 있습니다.

중요한 점

투자 전략: 이 스프레드를 이해하면 투자자가 주식과 채권 간 자산배분에 관한 판단을 내릴 수 있습니다.

현재 시장 상황: 16년 만에 처음으로 스프레드가 마이너스로 전환되었으며, 이는 주식이 과대평가되었을 가능성과 채권의 매력성을 시그널하는 신호입니다.

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

인플레이션의 역할: 그레인저 인과관계 검정 결과에 따르면, 과거 CPI 인플레이션율은 연방준비제도 모형 차이를 예측할 수 있어 시장 예측에 통찰을 제공합니다.

자세한 내용과 전체 이야기를 원하시는 분은 아래를 참조해주세요.

# 큰 그림

## 소개

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

Fed Model은 주식이 채권보다 더 매력적인지 여부를 식별하는 데 도움을 주는 두 가지 지표를 사용하는 비교적 단순한 분석 기법입니다. 또한 시장 타이밍 모델로 활용될 수 있습니다. 이 두 가지 지표는 다음과 같습니다:

- S&P 500의 주당 순이익률(주가 이익 비율의 역수)
- 최근 10년 만기 미국 국채의 수익률

Fed Model은 주당 순이익률과 채권 수익률의 차이로 계산됩니다. 주당 순이익률은 지수가 얼마나 많이 벌어들이고 있는지(지수 안의 회사들의 모든 기업 이익의 합)를 나타내며 인덱스의 달러 가치당 가격의 누적 가치(인덱스 내의 모든 기업들의 가치의 누적 달러 가치)를 나타냅니다. 높은 주당 순이익률은 투자자들이 총 가격의 백분율로 초과 이익을 획득하고 있다는 것을 시사합니다.

## 스프레드 해석과 그 영향

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

Fed 모델은 S&P 500의 수익률과 10년 만기 미국 국채의 이자율 간의 차이로 정의됩니다. 이 차이는 투자자가 주식과 채권 간 상대적 매력성을 비교하는 데 도움을 줍니다.

- 양수 차이: S&P 500의 수익률이 10년 만기 미국 국채의 수익률보다 높을 때 차이가 양수입니다. 이는 주식에 대한 투자자가 채권 대비 더 높은 수익을 얻고 있음을 나타냅니다. 양수 차이는 주식이 적정 가치에 있을 수도 있거나 상대적으로 안전한 채권 대비 주식 시장이 더 나은 성장 가능성을 제공할 수 있다는 점을 시사합니다.

- 음수 차이: 반대로, 수익률이 10년 만기 국채의 이자율보다 낮을 때 차이는 음수입니다. 이 상황은 주식 대비로 채권이 더 매력적인 것을 시사할 수도 있습니다. 주식 시장이 과도하게 평가되었거나 경제 전망이 불확실할 경우 투자자들은 채권의 안전성을 추구할 수 있습니다.

## Fed 모델의 (매우) 간단한 역사

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

내가 가장 좋아하는 투자 전략가 중 한 명이 페드 모델을 인기 있게 만들었어. 에드 야르데니는 주식 시장 수익과 장기 국채 수익률 사이의 관계를 분석한 작업을 기반으로 상당한 양의 작업물을 제작했지. 페드는 주식 수익률과 채권 수익률 사이의 관계를 보여주는 그래프를 많이 제작했지만, 그것을 모델로 형식화하거나 발표하거나 공식적으로 보증한 적은 없었어. 앨런 그린스팬은 중앙은행을 이끌 때 몇몇 기자회견에서 그에 대해 언급했어.

이 모델의 간단함이 매우 매력적이지. 스프레드가 양수이면 주식을 사고, 음수이면 채권을 사라고. 시간 지표로서의 신뢰성은 조금 불안정하지만. 특히 2008년 대공황의 시간을 잘 맞추지 못했어. 그러나 완벽한 지표는 없으니까 우리는 항상 다른 지표들로부터 확인을 받아보는 게 좋지. 그러나 이는 확실하게 채권과 주식 사이의 상대적 가치 측정 수단이야.

## 모델 시간에 따른 간단한 검토

![이미지](/TIL/assets/img/2024-07-13-PredictingStockMarketValuationandDirectionUsingtheFedModel_1.png)

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

제 1표는 1991년 이후 레세션 밴드가 중첩된 Fed 모델의 플롯을 보여줍니다. 우리는 또한 스프레드가 음수가 될 때를 나타내기 위해 y=0에 수평선을 그렸습니다. 이제 이는 스프레드이므로 양수 또는 음수의 판독이 발생할 수 있다는 점을 기억해야 합니다.

- 주식 가격이 급격히 상승하여 과대평가가 되는 경우 (또는 그 반대).
- 채권 금리가 너무 낮아 전혀 매력적이지 않은 경우.
- 위의 요소들의 조합.

1991년을 살펴보면, 연간 기준으로 인플레이션이 6% 이상이었지만 비교적 강한 어음 수입이 있었습니다 (우리는 침체 상황에서여서 가격이 꽤 떨어져 있었습니다). 높은 인플레이션은 엄격한 Fed 정책과 높은 이자율을 초래함으로써 해당 수십년 동안 음수 스프레드를 설명했습니다. 90년대 후반에는 어음 수입이 급락하여 닷컴 붐으로 인해 "이성을 잃은 열정"으로 유명한 앨런 그린스펀이 유명하게 부른 것과 유사한 상황이 발생했습니다.

닷컴 붕괴 이후 2002년부터 2007년까지의 회복을 고려해봅시다. 인플레이션은 낮았으며 채권 금리는 3-5% 범위 내에 유지되었으며 어음 수입은 한 시점에서 6%를 초과했습니다. 2007년, 스프레드가 처음으로 부호를 바꾸고 2002년 이후 처음으로 음수로 전환된 것을 볼 수 있습니다. 2008년 침체가 곧 발생했습니다. 물론, 그때는 약간의 음수 지역에 빠질 정도가 아무것도 표시하지 않았을 것입니다. 오늘날 예지의 혜택이 주어져 있습니다.

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

우리는 이제 최저 금리의 10년대에 접어들었습니다. 그래서 다음 10년 동안 스프레드가 그렇게 높게 유지되는 것은 놀라운 일이 아닙니다. 채권은 단순히 수익을 제공하지 않았습니다. 올해에는 16년 만에 처음으로 스프레드가 음수로 전환되었습니다.

그래서, 중요한 질문은, 이것이 의미하는 바가 있는지입니다.

현재 상황을 살펴보겠습니다:

- 고 인플레이션 시기.
- 매우 오랜 시간 동안 보지 못한 수준의 급증한 이자율과 채권 금리.
- 주식 시장이 역대 최고치를 경신하고 있습니다.

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

함께 하면 우리는 주식이 기업 실적 추격을 못하고 높은 수준에 이르렀으면서, 채권은 안정적인 이율을 제공하고 있다는 결론을 내릴 수 있습니다. 여전히 미 연방준비제도(Federal Reserve)의 계획이 불확실한 상황에서 채궘으로의 주요 자금 회전이 없다는 것을 감안하면, 현재 채권이 꽤 매력적으로 보입니다.

그래서 현재 주식은 고평가되었고 채권이 매력적으로 보입니다. 이것에 놀라지 말아야 합니다.

## 인플레이션은 채권 모델에 영향을 미칩니까?

다음으로, 저는 인플레이션과 연방 모델 간의 관계를 조사하고 그 유무를 확인하고 싶었습니다. 직관적으로, 우리는 인플레이션이 두 자산 클래스의 가치에 영향을 미쳤다는 것을 알기 때문에 관련성이 있어야 하며, 이것은 몇 가지 양적 기법을 시도해보는 기회를 제공했습니다.

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

먼저, 연간 기준 소비자물가지수(CPI) 플롯을 Fed 모델과 함께 살펴보겠습니다 (그림 2). 흥미로운 그래프군요. 경기 침체 시에는 분명한 관련성이 있습니다. 그러나 이 그래프에서 어떤 결론을 도출하는 것은 매우 어렵습니다.

![Figure 2](/TIL/assets/img/2024-07-13-PredictingStockMarketValuationandDirectionUsingtheFedModel_2.png)

그림 3은 각 시리즈의 월별 값에 대한 산점도를 보여줍니다. 두 값 사이에 상관관계가 전혀 없음을 알 수 있습니다 (로 = -0.11). 그러나 이 관계는 선형일 필요는 없으며, 연이어 발생하는 상관관계를 고려하지 않았습니다. 선형 관계가 없으므로 표준 회귀 분석도 도움이 되지 않을 것입니다.

![Figure 3](/TIL/assets/img/2024-07-13-PredictingStockMarketValuationandDirectionUsingtheFedModel_3.png)

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

The Granger Causality Test

그레인저 인과관계 검정은 한 시계열이 다른 시계열을 예측할 수 있는지를 결정하기 위해 사용되는 통계적 가설 검정입니다. 이 방법은 그레인저라는 사람에 의해 개발되었는데, 이 기법에 대한 작업으로 노벨 경제학상을 수상했습니다. 이 검정은 변수 X가 변수 Y를 그레인저 인과로 유발한다면, X의 과거값은 Y의 과거값만으로는 예측할 수 없는 Y를 예측하는 데 도움이 되는 정보를 포함해야 한다는 원리에 기초합니다.

이 분석에서는 과거 소비자물가지수(CPI) 인플레이션율이 Fed 모델차와를 예측할 수 있는지를 검정합니다. 결과는 3~4개월의 지연으로 중요한 예측력을 보여주며, 이는 지난 인플레이션 데이터가 Fed 모델에 의한 시장 가치평가를 예측하는 데 도움이 되는 것으로 나타납니다 (테이블 1, Python 함수에서의 결과). 이는 인플레이션의 과거값(3 또는 4개월 전)이 Fed 모델의 미래 방향을 추론하는 데 사용될 수 있다는 것을 시사합니다!
  
![image](/TIL/assets/img/2024-07-13-PredictingStockMarketValuationandDirectionUsingtheFedModel_4.png)

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

## 일부 생각

구현 중이던 코드를 다시 살펴볼 때, 페드 모델을 새롭게 살펴보기로 결정했고, 이제 한동안 보지 않았다는 것을 깨달았는데, 워렌 버핏식으로 매우 흥미로워 보입니다. 어디에 서 있는지 보는 것이 재미있을 것 같았어요.

하지만 이러한 결과를 예상하지 못했습니다.

최종 결론:

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

- 지난 몇 년 동안 페드 모델에 대한 언급을 많이 보지 못했는데, 16년 만에 처음으로 부정적으로 전환된 사실을 전략가들이 주목해야 합니다.
- 인플레이션을 잠재적 요인으로 확인하는 것은 직관적입니다. 더 많은 변수를 테스트하고 아마도 regime classification에 도움이 될 멋진 비지도 학습 모델을 만들어 볼 수 있을 것입니다.

그리고 이는 또 다른 데이터 과학 프로젝트의 주제가 될 것입니다!

한 테스트 결과에 결론을 내리기 위해 완전히 의존할 수는 없다는 것을 기억하세요. 이 잠재적 관련성에 대해 더 명확하게 이해하기 위해 다른 기법을 테스트해 보았지만, 그것이 쉽지는 않습니다. 이것이 왜 양적 금융이 재미있는 이유입니다.

본문의 모든 Python 코드는 여기서 코드 템플릿을 등록하면 찾을 수 있습니다(페이지 하단의 "코드 템플릿 등록" 부분).

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

LinkedIn이나 Medium에서 나를 팔로우해 주세요!