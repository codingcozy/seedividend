---
title: "초보자를 위한 P-해킹 시작 가이드"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-P-HackingforBeginners_0.png"
date: 2024-07-12 19:45
ogImage: 
  url: /TIL/assets/img/2024-07-12-P-HackingforBeginners_0.png
tag: Tech
originalTitle: "P-Hacking for Beginners"
link: "https://medium.com/@epiren/p-hacking-for-beginners-996d0e8f5094"
---


생명 통계학의 모든 주제 중에서 학생들에게 설명하기 가장 어려운 것은 p-값의 개념입니다. 본질적으로 p-값은 영 가설을 기각하는 확률입니다. 간단히 말하면, 우리가 관찰하고 있는 것 사이에 연관성이 없을 때에도 두 가지 사이에 연관성이 있다고 말할 확률이죠. 이것은 우리가 보고 있는 것이 우연히 발생한 것일 확률이기도 합니다.

내가 말했지만, 설명하기 어려울 거야.

기본적으로 통계 분석을 할 때는 매우 낮은 p-값을 원합니다. 값이 낮을수록 좋습니다... 값이 낮을수록 두 가지 이상의 것이 연관성이 있는 것처럼 보일 확률이 줄어듭니다. 그리고 우리는 0.05의 p-값을 기준으로 삼습니다. 왜냐하면 5%의 확률로 잘못될 우리가 받아들일 수 있기 때문이죠.

0.051이면 정말이지 말이 안 돼야지요.

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

다음은 그것이죠. 연구의 디자인을 조작하여 수행하는 통계 분석의 p-값을 0.05 미만으로 만들 수 있습니다. 그렇게 함으로써 결과가 "통계적으로 유의하다"로 판정될 수 있지만, 분석에서 보는 관련성의 강도는 바뀌지 않을 수도 있습니다. 예를 들어볼까요?

## 감자 샐러드를 먹었지요? 

작은 파티에서 섭취한 음식으로 인한 식중독 발작을 조사하고 있습니다. 파티에 8명이 참석했고, 그들에게 무엇을 먹었는지 물어보았습니다. 감자 샐러드를 먹은 대부분의 사람들이 병에 걸린 것을 주목했습니다. 감자 샐러드를 먹고 병이든지의 연관성을 결정하기 위해 카이 제곱 독립성 검정을 수행하기로 결정했습니다. 다음은 결과입니다:

- 감자 샐러드를 먹은 사람 5명 중 4명이 병에 걸렸습니다.
- 감자 샐러드를 먹지 않은 사람 3명 중 1명이 병에 걸렸습니다.

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

꽤 명확하죠? 샐러드를 먹은 사람 중에 병에 걸릴 확률은 4/1인 반면, 샐러드를 먹지 않은 사람 중에 병에 걸릴 확률은 1/2입니다. 이 확률들의 비율(즉, "오즈비")은 8입니다. 샐러드를 먹은 사람들은 병에 걸릴 오즈가 8배 높습니다.

하지만 여기 한 가지를 알려드릴게요. 이 오즈비의 p-값은 0.468로, 0.05 임계값을 크게 넘는 숫자에요. 이 결과는 통계적으로 유의하지 않습니다. 보고 있는 것이 우연히 발생한 것일 가능성이 높습니다. (다시 말해, 이것은 단순한 설명입니다. 만약 전문 용어로 설명을 원하신다면: "p-값은 귀무가설이 참이라고 할 때, 관측된 결과나 그 이상을 관측할 확률을 측정합니다.")

다음은 R 코드입니다 (뒤에 코드 전체 및 이와 유사한 분석을 하는 Python 코드도 포함하겠습니다):

```js
# 필요한 라이브러리를 로드합니다
library(dplyr)

# 카이제곱 검정을 수행하고 결과를 출력하는 도우미 함수
analyze_data <- function(counts_multiplier) {
  # 데이터 생성
  exposure <- rep(c("Ate", "Did Not Eat"), each = 2)
  status <- rep(c("Ill", "Not Ill"), times = 2)
  count <- c(4, 1, 1, 2) * counts_multiplier
  data <- data.frame(exposure, status, count)
  
  # 올바른 교차표를 만들기 위해 데이터 요약
  summarized_data <- data %>%
    group_by(exposure, status) %>%
    summarise(count = sum(count), .groups = 'drop')
  
  # chisq.test 함수에서 예상하는 행렬 형식으로 변환
  contingency_table <- xtabs(count ~ exposure + status, data = summarized_data)
  
  # 카이제곱 검정 수행
  chi_test_result <- chisq.test(contingency_table,simulate.p.value = T,correct = T)
  
  # 결과 출력
  cat("배수", counts_multiplier, "배로 조정한 카이제곱 검정 결과:\n")
  cat("카이제곱 통계량:", chi_test_result$statistic, ", p-값:", chi_test_result$p.value, "\n")
  print(contingency_table)
  cat("\n")
}

# 다양한 count 배수에 대해 데이터 분석
analyze_data(1)  # 5개 케이스와 3개 컨트롤을 사용하여
analyze_data(2)  # 10개 케이스와 6개 컨트롤을 사용하여
analyze_data(3)  # 15개 케이스와 9개 컨트롤을 사용하여
analyze_data(4)  # 20개 케이스와 12개 컨트롤을 사용하여
```

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

여기 결과입니다:

```js
> analyze_data(1)  # 5명의 사례와 3명의 대조군을 대상으로 함
1배 분석 결과 카이제곱 테스트:
카이제곱 통계량: 1.742222, p-값: 0.4682659
             상태
노출         병에 걸림 건강한 상태
  먹음           4         1
  안 먹음       1         2
```

(이안의 얀트스의 연속 보정(Yates' continuity correction)에 대해 궁금한 점이 있다면, 여기서 이와 같은 사용 사례를 읽어볼 수 있습니다: https://www.jstor.org/stable/2983604. 혹은 왜 피셔의 정확 테스트(Fisher's Exact Test)를 사용했는지 궁금하다면, 여기서 확인해보세요: https://online.stat.psu.edu/stat504/lesson/4/4.5. 이러한 것들은 이 게시물의 범위를 벗어난 복잡한 통계 개념들입니다.)

<img src="/TIL/assets/img/2024-07-12-P-HackingforBeginners_0.png" />

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

p-값을 계산하기 위해 정규 분포가 아닌 카이 제곱 분포를 사용한다는 점을 유의하세요. 이들은 결국 카테고리별 사람 수이기 때문에 연속적인 숫자가 아닙니다. 위 분포에서 곡선 아래 약 47%가 X 축의 1.74 오른쪽에 있습니다. 이는 우리가 데이터에서 계산한 검정 통계량입니다. 샘플 크기가 이 계산에 어떤 영향을 미치는지 확인하면서 그래프를 다시 참조하세요.

## p-값 부풀리기!

p-값을 낮추려면 무엇을 해야 할까요? 당연히 샘플 크기를 증가시키면 됩니다! 분석 중인 내용의 샘플 크기를 늘리면 p-값이 낮아지는 통계적 효과가 이미 알려져 있습니다. 테스트 통계량을 계산하는 데 사용하는 수학 때문에 샘플 크기는 데이터의 표준 오차 — 또는 데이터의 변동성 — 공식의 분모에 있습니다. 샘플이 커질수록 변동성이 줄어들고 우리의 관측이 더 정밀해집니다. 더 정밀하면 우리가 본 것이 우연히 발생한 것일 가능성이 더 적어집니다.

그래서 10건의 사례와 6건의 대조군으로 샘플 크기를 증가시키겠습니다. 여기에 결과가 있습니다:

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
> analyze_data(2)  # 10 cases and 6 controls 지정
2배로 증가 시킨 Chi-square 테스트 결과:
Chi-square 통계량: 3.484444 , p-값: 0.1164418 
             상태
노출    아프다 아프지 않다
  먹음      8       2
  안 먹음   2       4
```

이제 p-값은 0.116입니다. 0.05에 가까워졌지만 아직은 그 정도는 아닙니다. 오즈 비는 8로 유지됩니다.

초기 표본 크기를 세 배로 증가 시킨 15개 케이스와 9개 컨트롤의 경우 어떻게 될까요?

```js
> analyze_data(3)  # 15 cases and 9 controls 지정
3배로 증가 시킨 Chi-square 테스트 결과:
Chi-square 통계량: 5.226667 , p-값: 0.03898051 
             상태
노출    아프다 아프지 않다
  먹음      12       3
  안 먹음   3       6
```

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

와! p-값은 0.018(반올림)로 나왔어요. 정말 놀이로 초기 샘플 크기의 네 배를 늘려보겠어요:

```js
> analyze_data(4)  # 20개의 사례와 12개의 대조군을 가지고
4 배로 증가한 데이터를 바탕으로 카이제곱 테스트의 결과:
카이제곱 통계량: 6.968889, p-값: 0.017991
             상태
노출           아픔 안아픔
  먹은 음식       16       4
  먹지 않은 음식   4       8
```

와우! p-값이 0.05 이하에 있어서 통계적으로 유의미해졌어요. 하지만 우리의 연관성 측정 방법인 오즈비는 변하지 않았어요. 여전히 8.0으로 유지돼요. 이게 무슨 뜻일까요?

## “통계적으로 유의하지 않음” 대 “연관성 없음”

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

각 예시에서 보았듯이, 음식을 먹고 아플 가능성과의 연관성은 표본 크기에 상관없이 동일했습니다. 표본 크기를 변경함으로써 우리는 p-값을 낮추고 결과를 "통계적으로 유의미하게" 만들었습니다. 그러나 전염병 역학자로서, 나는 감자 샐러드를 원망하기만 하지 않을 겁니다. 다른 음식들과 함께 그 음식을 테스트하러 가고, 대규모 유통업체 문제가 아닌지 집고 조사할 것입니다. 집에서 직접 만든 감자 샐러드가 아닌 경우에는 슈퍼마켓에서 제품을 회수하고 리콜 프로세스를 시작할 것입니다.

p-값이 유의미한 수준에 도달할 때까지 기다리지 않을 겁니다. 왜냐하면 발병은 이미 발생한 것이기 때문입니다. 초기 8명만 파티에 참석했습니다. 파티에 가지 않은 더 많은 사람들을 찾아볼 수 없습니다. 그러나 만약 지역 사회의 더 많은 사람이 상업적인 출처인 감자 샐러드를 먹은 사실을 발견한다면 이론적으로 더 많은 사람들과 함께 더 큰 연구를 할 수 있습니다.

유감스럽지만, 결과가 인상적인 연구들은 통계 분석 결과가 0.05보다 높거나 비슷해서 발표되지 않는 경우가 많습니다. 이는 연구자들도 결과에 대한 방법론적 치가와 p-값의 오해 때문입니다. 모든 p-값이 하는 일은 결과의 확신 정도를 알려주는 것뿐이며 결과가 참인지 아닌지는 말해주지 않습니다.

결과의 통계적 유의성만큼 중요한 많은 다른 요소들이 연구에 영향을 미칩니다. 예를 들어, 데이터를 그룹별로 분리하는 것을 잊었는지, 심슨의 역설을 유발할 가능성이 있나요?

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

참여자를 선택하는 방식에서 베크슨 편향에 빠지지는 않았는지 확인했나요?

원인과 결과 사이의 관련성을 제대로 설명하는 데 있어 데이터에 혼재변수와 같은 요인이 있었나요?

## 더 나쁜 p-값 조작이 있다

일부 불성실한 사람들은 표본 크기를 증가시키는 것 이상으로 데이터를 조작합니다. 다른 사람들과 마찬가지로, 통계적 유의성을 관련성의 강도와 동일시하거나, 논문이 특정 범위 내의 p-값을 갖고 있을 때만 게재되도록 받아내려고 합니다. 그들은 데이터를 잘라내어 연관성이 실제로 없는 상황에서 연관성이 갑자기 나타나게 만듭니다.

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

2020년 미국 연방 선거를 교란하려고 한 사람들이 법정에서 자신들의 주장을 뒷받침하기 위해 p-해킹을 사용했었다면서요.

게다가 더 심각한 것은, 출판된 논문 가운데 취소된 연구들이 많이 존재합니다 (그리고 일부는 아직도 사전 인쇄 및 블로그 글의 야생에 살아 있습니다). 이들의 저자들이 합법적인 출판을 위해 사악한 p-해킹을 사용했거나, 치료법이 작동한다고 보이기 위해 가짜 결과를 제시한 경우도 있었으며, 또는 다른 이유를 주장하기 위해 사용한 경우도 있습니다.

그러므로 p-값이나 그와 관련된 95% 신뢰구간에 모든 책임을 떠밀지 말아야 합니다. 표본 크기를 확인해보세요. 제안된 내용의 생물학적 타당성을 살펴보세요. 해당 연구가 다른 곳에서 재현되었는지 확인해보세요. 그리고 표본 추출 방법이나 데이터 집계 방식에서 생기는 편향을 확인하세요.

하지만, 이 글로부터 아무것도 배우지 못했다면 이것만은 꼭 기억하세요: 상온에 보관되는 식품은 따뜻하게 하고, 냉장보관할 것이거나, 보관하지 말아야 합니다.

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

아래는 분석 예제에 대한 R 코드입니다: https://gist.github.com/RFNajera/c571c7b9d21be2dbabbad085af3333eb

Python 코드는 여기에서 확인할 수 있습니다: https://gist.github.com/RFNajera/3762c8bc27f2e930c74d44869717d875

저 같은 선생이 마음에 드셨다면 또한 Medium의 글도 마음에 드시나요? 멤버십 가입하여 저희 작품을 지원해보는 건 어떨까요? 자세한 정보는 여기를 클릭해주세요: https://medium.com/membership
감사합니다!

René F. Najera, MPH, DrPH는 공중보건 의사, 역학학자, 아마추어 사진작가, 러닝/사이클링/수영 애호가, 남편, 아버지이자 "모두에게 친근한 친구"입니다. 그는 현재 공중보건 센터의 이사로 일하거나, 지역 타코 가게에서 타코를 즐기거나, 버지니아 북부의 대학에서 지역 및 국제 보건학 부서에서 부교수로 가르치거나, 세계 최고의 공중보건 학교에서 역학학 부서에서 조교수로 일하고 있을 수 있습니다. 이 블로그 글에 담긴 모든 의견은 Dr. Najera의 의견이며, 반드시 고용주, 친구, 가족 또는 지인들의 의견을 대변하는 것은 아닙니다.