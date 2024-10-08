---
title: "파이썬으로 하는 예상 향상 및 가우시안 프로세스 회귀 최적화에 대한 실습"
description: ""
coverImage: "/assets/img/2024-06-19-HandsOnOptimizationwithExpectedImprovementandGaussianProcessRegressioninPython_0.png"
date: 2024-06-19 23:38
ogImage:
  url: /assets/img/2024-06-19-HandsOnOptimizationwithExpectedImprovementandGaussianProcessRegressioninPython_0.png
tag: Tech
originalTitle: "Hands On Optimization with Expected Improvement and Gaussian Process Regression, in Python"
link: "https://medium.com/towards-data-science/hands-on-optimization-with-expected-improvement-and-gaussian-process-regression-in-python-3c416eaa84f3"
isUpdated: true
---

<img src="/assets/img/2024-06-19-HandsOnOptimizationwithExpectedImprovementandGaussianProcessRegressioninPython_0.png" />

저희 아내는 비즈니스 전공자인데요, "인공지능이 뭐에요?"라고 물어보면 이렇게 답합니다:

그리고 이게 사람들이 인공지능을 설명하는 방식과 매우 일치한다고 생각해요. 조금 수정하면 진실과 많이 다르지 않을 거예요.

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

이제, 만약 수학자나 물리학자와 이야기를 나누면, 답변은 훨씬 더 기술적이고 아마 지루할 것입니다 (나는 물리학자이기 때문에 그렇게 말할 수 있어요). 만약 AI를 정의한다면 이렇게 말할 거예요:

...내가 말했던 것처럼 좀 지루하죠. 무슨 말일까요?

# 0. 기계 학습은 최소화 문제로

우리가 가상 지능을 사용해 집값을 예측한다고 가정해봅시다. 가상 지능을 사용하기 전에는 실제로 여러 요소들(위치, 크기, 건축 연도 등)을 기반으로 집 값 평가를 하는 사람이 있습니다. 우리 모두가 알다시피, 가상 지능에는 데이터가 필요하죠. 그래서 트레이닝 세트를 만들기 위해 이 일을 수많은 번 반복해야 합니다.
다음과 같은 내용이겠지요:

# 0. 기계 학습은 최소화 문제로

우리가 가상 지능을 사용해 집값을 예측한다고 가정해봅시다. 가상 지능을 사용하기 전에는 실제로 여러 요소들(위치, 크기, 건축 연도 등)을 기반으로 집 값 평가를 하는 사람이 있습니다. 우리 모두가 알다시피, 가상 지능에는 데이터가 필요하죠. 그래서 트레이닝 세트를 만들기 위해 이 일을 수많은 번 반복해야 합니다.

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

이미지 파일: /assets/img/2024-06-19-HandsOnOptimizationwithExpectedImprovementandGaussianProcessRegressioninPython_1.png

이 집 모음과 해당하는 가격은 머신러닝 모델을 최적화하는 데 사용됩니다. 예를 들어, 우리가 사는 매우 단순한 상상 속 세계에서 집 값은 오직 크기에만 의존한다고 가정해 봅시다. 예를 들어, 만약 크기가 x이고 해당하는 가격이 y라면 다음과 같습니다:

이미지 파일: /assets/img/2024-06-19-HandsOnOptimizationwithExpectedImprovementandGaussianProcessRegressioninPython_2.png

따라서 크기가 x = 2인 집은 가격이 50x2 = 100(임의의 단위)인 것입니다.

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

이제 머신러닝 모델을 사용할 때 다음과 같이 가정해 봅시다:

![이미지](/assets/img/2024-06-19-HandsOnOptimizationwithExpectedImprovementandGaussianProcessRegressioninPython_3.png)

예를 들어, 크기가 x = 1인 새 집이 있다고 가정하면,
w 대비 오류(Error) 플롯은 다음과 같습니다:

![이미지](/assets/img/2024-06-19-HandsOnOptimizationwithExpectedImprovementandGaussianProcessRegressioninPython_4.png)

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

당연히 이제 우리는 오차를 0으로 만들고 싶습니다. 집의 정확한 가격을 예측하는 데 우리는 머신러닝 모델을 가지고 싶습니다.

실제로는 이 그림에서 보는 것과 같이 플롯이 없습니다. 실제로는 랜덤한 w(또는 랜덤한 벡터 w)를 선택하고 최소 오차를 찾기 위해 최적화합니다.

머신러닝 애호가라면 이 이야기가 낯설지 않을 것입니다. 예를 들어, 그레디언트 디센트라는 것을 들어본 적이 있을 수 있습니다.

# 1. 그레디언트 디센트와 그 한계

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

Gradient descent은 함수의 오류를 반복적으로 최소화하는 기술로, 기울기의 반대 방향을 따라가면서 이루어집니다. 이런식으로 말이죠:

![이미지는 생략합니다]

수식으로 지루하게 하고 싶진 않지만, 알고리즘의 논리는 다음과 같습니다:

- 랜덤 매개 변수 벡터로 시작합니다. 위의 경우에는 매개 변수가 하나뿐인데, 모델의 차원은 보통 훨씬 더 큽니다 (백만 또는 십억 차원 벡터)
- 랜덤 매개 변수에 대한 손실 함수의 기울기를 추정합니다.
- 기울기 방향으로 한 걸음 움직입니다 (위의 그림에서 보는 것처럼)
- "수렴에 도달"하면 중단하고, 그렇지 않으면 단계 2와 3을 반복합니다.

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

그림에서 볼 수 있듯이, 기울기가 함수가 증가하는 곳을 알려주는 것이라면, "기울기의 반대"는 함수가 감소하는 곳을 알려줍니다: 손실 함수(최소화해야 하는 함수)의 감소 경로를 따르면 게임에 이기는 것이죠.

하지만 모두가 그렇지는 않을까요? 그렇지 않거나, 적어도 항상은 아닙니다. 핵심은 4단계의 "수렴에 도달할 경우"라는 문장에 있습니다. "수렴"이란 무엇을 의미할까요? "수렴"이란 "지역 수렴"이나 원한다면 "지역 최소값으로의 수렴"을 의미합니다. 매우 혼란스럽죠. 알겠어요. 잠깐 인간처럼 이야기해 볼게요.

위에서 보여드린 함수에 여러 가지 단순화가 있습니다. 단순화 중 하나는 1차원만 있다는 것입니다(이미 이야기했죠). 다른 큰(매우 큰) 단순화는 해당 함수에 최소값이 하나뿐이라는 것입니다. 많은(모든 것 같다고 말할게요) 기계 학습 사례에서는 여러 최솟값이 있는 손실 함수가 있고, 경사 하강 알고리즘을 실행하면 "지역 최소값에 갇힌다"는 것을 여기 비볼록 함수에서 볼 수 있습니다:

<img src="/assets/img/2024-06-19-HandsOnOptimizationwithExpectedImprovementandGaussianProcessRegressioninPython_6.png" />

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

빨간 케이스에서는 알고리즘의 끝에 있는 파란 십자가가 실제로는 최소값이지만 지역 최소값입니다. 다시 말하면, 오차를 최소화하기 위해 노력하고 있지만 이를 부분적으로만 달성하고 있습니다: 문제의 전역 최소값을 찾지 못하고 있습니다.

이것은 머신 러닝 커뮤니티에서 잘 알려진 문제이지만 사실 더 일반적인 문제입니다:

이 문서에서는 예상 개선 방법을 사용합니다. 환영합니다! 🚂

## 2. 가우시안 프로세스 회귀

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

실제 Global Minimum Search를 시작하기 전에 친구인 Gaussian Process Regression(GPR) 또는 Kriging을 알아야 합니다. 이름에서 알 수 있듯이 GPR은 회귀 알고리즘으로, 이 모델의 입력은 벡터이고 출력은 실수(필수적으로 정수일 필요는 없음)입니다.

나는 Gaussian Process Regression을 너무 좋아해서 말을 멈추지 않으면 내 아내가 나를 떠나겠죠. 또한 Gaussian Process Regression을 이상치 탐지 알고리즘으로 사용하는 방법과 생성 모델로 사용하는 방법에 대해 기사를 쓰기도 했습니다.

가우시안 프로세스는 매력적이어서 이에 관해 전문적인 연구를 할만한 충분한 자료가 있으나, Medium 기사를 통해 GPR의 아름다운 세계를 소개하려면 GPR을 기계학습 커뮤니티에서 유명하게 한 Christopher K. I. Williams와 Carl Edward Rasmussen의 말을 사용할 것입니다:

정말 엄청 복잡하잖아요? 간단하게 만들어 볼게요. 내가 이전에 말한 것을 기억하나요? 입력이 벡터이고 출력이 실수인 것에 대해요? 출력이 실수뿐만 아니라 평균 값(평균)과 분산이라고 상상해봐요.

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

입력 데이터(학습 데이터) 세트는 확률의 조건부 조건으로 사용됩니다. 이것은 𝜇(𝑥), 𝐶(𝑥,𝑥′) 및 학습 데이터로부터 시작하여 다음 점에 대한 y의 예측을 제공합니다.

예를 통해 이해해 보겠습니다.

## 2.1 가우시안 프로세스 회귀 구현

다음에 대한 매우 간단한 이 방정식부터 시작합시다:

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

![image](/assets/img/2024-06-19-HandsOnOptimizationwithExpectedImprovementandGaussianProcessRegressioninPython_7.png)

우리가 Python과 일부 라이브러리 친구들을 사용하여 그래프를 그리면 이렇게 됩니다:

말씀드리는 대로, 확률 과정이 데이터를 평균 함수와 위에서 설명한 공분산 함수로 모델링한다고 가정할 수 있습니다. 아름다운 이야기입니다. 이제 새 데이터로 사전 확률을 업데이트할 것입니다. 지금 제가 철학을 하고 있는 것처럼 들릴 수 있지만, 실제로 말하고 싶은 것은 사전 확률(위에서 정의한 평균과 공분산)과 훈련 세트 사이의 조건부 확률을 작성하는 것입니다. 저와 같은 수학 좋아하는 사람들에게는 이것이 아이디어입니다:

![image](/assets/img/2024-06-19-HandsOnOptimizationwithExpectedImprovementandGaussianProcessRegressioninPython_8.png)

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

f*'x\*'가 모든 가능한 결과이며, k∗는 테스트 포인트와 트레이닝 포인트 간의 공분산 벡터이며, 요소는 𝑘∗(𝑖)=𝑘(𝑥𝑖,𝑥∗)이며, K는 공분산 행렬이며, \sigma*'n'²는 잡음 값입니다. 요약하자면, 언제나 해야 할 것처럼, 훈련 세트와 테스트 세트가 필요합니다. 이를 수행하는 데는 몇 줄만 있으면 됩니다:

그리고 이것이 플롯입니다:

이제 이 함수를 최소화하려고 한다고 가정해 봅시다. 해당 평균과 분산을 얻기 위해 방정식 [2]를 적용합니다. 이 작업은 아주 몇 줄로 이루어집니다:

이 그림에서:

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

- 오렌지색 함수는 대상입니다: 우리가 모델링하려는 알 수 없는 함수입니다 (실제로는 알 수 없음)
- 짙은 파란색 선과 음영은 평균과 2배의 표준 편차이며, 약 95%의 불확실성을 나타냅니다. 이는 오렌지색 선이 파란 음영 사이에 위치할 것이라는 것을 의미합니다.
- 훈련 세트는 빨간 십자가 세트입니다. 불확실성은 항상 빨간 십자가에서 0입니다.
- 테스트 세트는 파란 십자가 세트입니다.

## 3. 전역 최적화

좋아요, 하지만 최적화 문제를 약속했어요. 그게 어디에 있나요?

이전 그림의 예측을 살펴보면, 예측된 최솟값이 있지만 지역 최솟값이며 올바른 전역 최솟값이 아닙니다. 이는 파란색 선의 최솟값이 2에서 4 사이에 위치하기 때문입니다. 오렌지색 선의 최솟값은 0에서 2 사이에 있습니다. 어떻게 찾을까요?

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

여기 요령이 있어요: 가운데 큰 불확실성(큰 음영 영역)을 보세요. 이것은 해당 영역에서 무슨 일이 일어날지 전혀 모른다는 것을 의미합니다. 불확실성이 너무 커서 무엇이 발생하는지 알아보아야 해요! 우리는 추정을 개선할 수 있는 영역이 어디인지 알려주는 양을 발견해야 해요. 이를 '예상 향상'이라고 부릅니다.

수학적 내용을 지루하게 설명하고 싶지 않아요(어쨌든 매우 간단해요)만 예상 향상은 다음과 같은 양으로 계산돼요:

그림을 그려볼게요:

초록 선을 보고 이를 위에 있는 GPR 그래프와 비교한다면, 매우 큰 불확실 영역이 있는데 경계가 매우 크고 따라서 예상 향상이 크다는 것을 알 수 있어요. 와! 그것이 우리가 필요한 것이에요.

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

가장 큰 향상이 예상되는 영역에 1점을 추가할 예정이에요. 최소값의 변화가 더 이상 크게 없을 때까지 계속 이를 반복합니다. 9회 반복 예제를 보여드릴게요:

사용할 이 블랙 박스 함수를 정의해볼게요:

지금부터 블로그 게시물 아이디어는 아래 코드 라인에 있어요:

![image](/assets/img/2024-06-19-HandsOnOptimizationwithExpectedImprovementandGaussianProcessRegressioninPython_9.png)

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

결과를 분석해 보겠습니다. 빨간 점은 GPR 예측을 학습하기 위해 사용된 이전 점으로, 파란색 선은 예측을 나타내며 파란색 음영은 불확실성 경계를 보여줍니다. 실제로는 모르는 검은 상자 함수는 주황색입니다. 다음 점은 초록색 점입니다.

첫 번째 그림은 새로운 점을 지역 최소점에 추가하는 것을 보여줍니다.
두 번째 그림은 도메인의 오른쪽 부분을 탐험하는 것을 보여줍니다 (거의 탐험되지 않은 부분).
세 번째 그림은 알고리즘이 공간을 계속 탐색하여 지역 최소점을 찾는 것을 보여줍니다.
네 번째 그림은 도메인의 왼쪽 부분을 탐색하는 것을 보여줍니다.
다섯 번째 그림부터 아홉 번째 그림까지 알고리즘이 0과 2 사이의 최소값을 찾는 과정을 볼 수 있습니다. 이것이 우리의 전역 최소값입니다. 성공했습니다!

# 4. 결론

이 블로그 포스트에서는 글로벌 최적화 문제에 대해 논의했습니다. 다음 단계를 따라 수행했습니다:

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

- 저희는 머신 러닝을 최적화 문제로 정의했어요. 특히, 주택 가격에 대한 선형 회귀의 매우 단순한 예제로, ML 알고리즘을 오차 함수의 최소화로 형식화할 수 있는 방법을 보여드렸어요.
- 저희는 경사 하강 알고리즘을 설명했어요. 경사 하강은 오차 함수를 수치적으로 최소화하는 기술이에요. 안타깝게도, 이 방법은 알고리즘의 성능이 저하될 수 있어요, 지역 (전역이 아닌) 최솟값에 갇힐 수 있기 때문이죠.
- 저희는 GPR을 소개했어요. 이는 결과를 예측하는 것뿐만 아니라 불확실성을 측정하는 멋진 방법이에요. 아주 멋져요. 만점 받았네요. :)
- 저희는 Expected Improvement (EI)을 정의했어요. 이는 우리가 가장 불확실한 지역을 탐색하도록 안내하는데 도움이 돼요. 결국, 이는 가능한 지역 최솟값을 갖는 영역을 탐색하도록 도와 전역 최솟값을 찾을 확률을 높여줘요.
- 저희는 전역 최솟값 탐색 알고리즘을 수행했어요. 파이썬을 사용해 함수의 최솟값을 시각화와 함께 단계별로 찾는 방법을 보여드렸어요.

# 7. 나에 대해!

다시 한 번 시간 내어 주셔서 감사합니다. 정말로 소중해요 ❤

제 이름은 Piero Paialunga이고, 이 사진 속에 제가 있어요:

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

![image](/assets/img/2024-06-19-HandsOnOptimizationwithExpectedImprovementandGaussianProcessRegressioninPython_10.png)

안녕하세요! 저는 신시내티 대학교 항공우주공학부의 박사 후보이자 Gen Nine의 기계 학습 엔지니어입니다. 제 블로그 게시물과 LinkedIn에서 AI 및 기계 학습에 대해 이야기합니다. 만약 이 글을 좋아하시고 기계 학습에 대해 더 알고 싶으시다면:

A. 제 LinkedIn을 팔로우해주세요. 거기서 제 이야기를 모두 공유합니다.
B. 제 뉴스레터를 구독하세요. 새로운 이야기에 대한 최신 소식을 전해드리고 문의사항이나 의문을 보내주시면 모두 답변해드립니다.
C. 추천 회원이 되어주세요. 그러면 매월 "최대 이야기 수"라는 제한이 없어지며, 전 세계의 기계 학습 및 데이터 과학 최고 작가들이 새로운 기술에 대해 쓴 글을 자유롭게 읽으실 수 있습니다.
D. 저와 함께 일하고 싶으신가요? Upwork에서 내 요율과 프로젝트를 확인해보세요!

질문이나 협업을 원하시면 메시지를 남겨 주시거나 LinkedIn에서 연락해주세요. 부담없이 문의 주시길 바랍니다!

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

피에로 파이아룽가님, 전자 메일 주소를 제공해 주셔서 감사합니다. 호환성을 위해 표 태그를 마크다운 형식으로 변경해 드리겠습니다. 만약 추가로 도움이 필요하시면 언제든지 문의해 주세요.
