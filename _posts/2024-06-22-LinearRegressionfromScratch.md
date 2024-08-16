---
title: "파이썬으로 선형 회귀 직접 구현하기 기초부터 완성까지"
description: ""
coverImage: "/assets/img/2024-06-22-LinearRegressionfromScratch_0.png"
date: 2024-06-22 04:46
ogImage: 
  url: /assets/img/2024-06-22-LinearRegressionfromScratch_0.png
tag: Tech
originalTitle: "Linear Regression from Scratch"
link: "https://medium.com/@pdasedano/linear-regression-from-scratch-2f25c1ab21ea"
isUpdated: true
---





![Linear Regression](/assets/img/2024-06-22-LinearRegressionfromScratch_0.png)

안녕하세요! 가장 간단한 머신 러닝 기술 중 하나인 선형 회귀로 시작합니다. 이 게시물의 수학적 부분은 선형 대수와 미적분의 좋은 이해력이 필요할 것입니다. 이 부분은 다음 시리즈에도 해당될 것이죠. 이는 머신 러닝의 많은 부분을 뒷받침하고 있고, 깊은 이해를 위한 선행 요건입니다. 그렇다면 함께 알아보도록 하죠!

# 단순 선형 회귀

선형 회귀는 여러 점들을 고려하여 최적의 선을 찾는 과제입니다. 최적의 선을 찾는 방법을 알아내기 전에, 이것이 실제로 무엇을 의미하는지를 이해해야 합니다.


<div class="content-ad"></div>

그림 1의 선이 이 선보다 더 데이터에 잘 맞는 것을 직관적으로 알 수 있어요:

![Figure 1](/assets/img/2024-06-22-LinearRegressionfromScratch_1.png)

왜냐하면 그림 1의 점들이 그림 2의 점들보다 선으로부터 더 멀리 떨어져 있어요. 이 직관을 수학적으로 어떻게 형식화할지 알아보도록 할게요. 이렇게 하면 “가장 잘 맞는”이 무엇을 의미하는지 명확하게 정의할 수 있을 거예요.

간단하고 시각화하기 쉽게 하기 위해, 2차원에서 시작할게요. 이 경우 데이터 포인트는 (x, y) 쌍이고 위의 그림처럼 그래프에 표시할 수 있어요. 우리는 데이터를 가장 잘 나타내는 f(x) = kx와 같은 선형 함수를 찾고 싶어해요. 이 모델은 원점을 통과하는 선을 가정해요. 우리는 아직 원점 이외의 교차점의 가능성에 대해 고려하지 않을 거예요.

<div class="content-ad"></div>

n개의 데이터 포인트가 있는 컬렉션이 있다고 가정해 보겠습니다.

![Linear Regression from Scratch 2](/assets/img/2024-06-22-LinearRegressionfromScratch_2.png)

각 x값에 대해 모델을 사용하여 예측된 y값을 얻을 수 있습니다. 이러한 상황은 하나의 독립 변수(x)와 하나의 종속 변수(y)만 있는 단순 선형 회귀로 알려져 있습니다. 예측된 y값과 실제 y값을 구분하기 위해 프라임 기호를 사용할 것입니다. 따라서 특정 x값에 대한 모델의 예측된 y값은 다음과 같은 공식으로 표시됩니다.

![Linear Regression from Scratch 3](/assets/img/2024-06-22-LinearRegressionfromScratch_3.png)

<div class="content-ad"></div>

이제 x 값들을 하나의 벡터에, y 값들을 다른 벡터에 넣어봅시다.

![image](/assets/img/2024-06-22-LinearRegressionfromScratch_4.png)

이를 벡터화(Vectorization)라고 합니다. 데이터 과학 문제에 대한 많은 이점이 있습니다. 여러 개별 값을 벡터로 결합하면 수학 공식이 훨씬 더 간결하고 이해하기 쉬워집니다. 코드에서의 벡터화도 성능을 향상시킵니다. 큰 값 배열에 대해 벡터 산술을 수행하는 것이 각각 하나씩 처리하는 루프를 거쳐 동작하는 것보다 훨씬 빠릅니다. Numpy와 같은 많은 숫자 계산 라이브러리가 빠른 벡터 산술을 위해 설계되었습니다. 벡터화는 또한 GPU와 같은 하드웨어를 사용한 병렬화도 가능하게 합니다. 여러 개의 배열 요소에 동시에 연산을 수행합니다. 한 번 더 언급하자면, 각 연산이 하나씩 차례로 이루어지는 루프를 사용하지 않고는 이것이 불가능할 것입니다.

또한 우리가 예측한 y 값들을 모두 담은 벡터를 생성할 수 있습니다:

<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-LinearRegressionfromScratch_5.png" />

<img src="/assets/img/2024-06-22-LinearRegressionfromScratch_6.png" />

최적 적합 선을 찾기 위해서는 y'와 실제 값인 y의 벡터 사이의 거리를 알아야 합니다. 이 두 벡터의 차이를 살펴볼 수 있습니다: y' - y. 그러나 이것은 벡터 자체이며, 모델의 오류를 나타내는 단일 숫자를 원합니다. 우리는 제곱합 오류(SSE)를 사용할 것입니다. SSE는 ||y' - y||²로, 차이 벡터의 제곱 크기와 같습니다. 이것은 "제곱합"으로 불립니다. 왜냐하면 y' - y의 제곱된 항목들의 합과 같기 때문입니다:

<img src="/assets/img/2024-06-22-LinearRegressionfromScratch_7.png" />

<div class="content-ad"></div>

왜 ||y’ — y||²을 사용하는지 궁금하다면 단순히 ||y’ — y||만 사용하는 것보다 제곱 크기를 사용하는 게 훨씬 간단하다는 점이 하나의 답일 수 있습니다. ||y’ — y||는 합계 외부에 하나의 추가 제곱근 기호가 있습니다:


<img src="/assets/img/2024-06-22-LinearRegressionfromScratch_8.png" />


이로 인해 미분을 할 때 공식을 처리하는 것이 훨씬 더 까다로워집니다.

이제 선형 회귀 모델의 오차를 정의했으니, 이를 최소화하는 방법을 찾아야 합니다. SSE에 대한 표현을 확장해 보겠습니다.

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-22-LinearRegressionfromScratch_9.png)

방정식 1에 따라 y'에 kx를 대입하면,

![이미지](/assets/img/2024-06-22-LinearRegressionfromScratch_10.png)

x와 y를 일정한 값으로 유지할 때 오차를 최소화하는 k의 값을 찾아야 합니다. 이를 위해서는 식 1의 k에 대한 미분값을 0으로 설정하고 해를 구할 수 있습니다:


<div class="content-ad"></div>


![Linear Regression 1](/assets/img/2024-06-22-LinearRegressionfromScratch_11.png)

![Linear Regression 2](/assets/img/2024-06-22-LinearRegressionfromScratch_12.png)

이를 통해 제곱 오차의 합을 최소화하는 k 값을 알 수 있습니다. 이 지식을 바탕으로 SimpleLinearRegressor를 코딩할 수 있습니다. 이것은 단 하나의 인스턴스 변수를 갖게 될 것입니다 — 기울기, k.

```js
class SimpleLinearRegressor:
    """단순 선형 회귀를 수행합니다."""

    def __init__(self):
        self.k = None
```

<div class="content-ad"></div>

```python
def predict(self, x):
    """
    입력값 x 또는 x 값 벡터를 사용하여 예측된 y값을 제공합니다.
    :param x: 입력 값(들).
    :return: 예측된 y값(들).
    """

    if self.k is None:
        raise RegressionModelNotFitError('앗! 모델이 아직 피팅되지 않았어요!')

    return self.k * x
```

또한 x와 y 벡터를 사용하여 Equation 2를 기반으로 k의 적절한 값을 찾는 fit 메서드가 필요합니다. 이것이 클래스의 본질입니다.

```python
def fit(self, x, y):
    """
    주어진 x 값과 y 값 벡터를 기반으로 모델을 맞춥니다.
    :param x: x값 벡터.
    :param y: y값 벡터.
    :return: 적합된 모델의 제곱 오차 합.
    """

    self.k = x @ y / (x @ x)
    diff = self.predict(x) - y
    return diff @ diff
```

<div class="content-ad"></div>

모델을 테스트하기 위해 데이터를 생성해야 합니다. 범위 내에서 임의의 x 값을 생성하고 선형 모델을 사용하여 해당하는 y 값을 계산한 다음 이 y 값에 가우시안 노이즈를 추가하는 함수를 만들겠습니다.

```js
def generate_noisy_data(n_points, slope, x_range, noise_stddev):
    """
    추가된 가우시안 노이즈를 이용해 선형 관계에 기반한 데이터 점을 생성합니다.
    :param n_points: 생성할 데이터 점의 수.
    :param slope: 직선의 기울기.
    :param x_range: x 값을 추출할 범위.
    :param noise_stddev: 각 y 값에 추가할 가우시안 노이즈의 표준 편차.
    :return: x 값과 y 값의 벡터.
    """

    x = np.random.uniform(*x_range, n_points)
    y = slope * x + np.random.normal(scale=noise_stddev, size=n_points)
    return x, y
```

SimpleLinearRegressor가 무작위로 생성된 데이터에서 원래의 기울기를 얼마나 잘 복원하는지 살펴봅시다. 시각화를 위해 matplotlib를 사용하겠습니다.

```js
x_range = np.array([0, 5])
x, y = generate_noisy_data(n_points=20, slope=0.42, x_range=x_range, noise_stddev=0.5)
plt.scatter(x, y)

regressor = SimpleLinearRegressor()
fit = regressor.fit(x, y)
slope = regressor.k
plt.plot(x_range, [0, 2 * x_range[1]], color='red')
plt.text(3, 0, f'오차: {"{:.2f}".format(fit)}\n예측된 기울기: {"{:.2f}".format(slope)}')
plt.show()
```

<div class="content-ad"></div>

아래는 한 번의 실행 결과입니다:

![Linear Regression](/assets/img/2024-06-22-LinearRegressionfromScratch_13.png)

보이시다시피, 이 모델은 훌륭한 작업을 합니다! 회귀 모델에 의해 예측된 기울기는 `generate_noisy_data`에 입력된 기울기와 소수점 셋째 자리까지 일치합니다.

# 다중 선형 회귀

<div class="content-ad"></div>

하나의 독립 변수 x와 하나의 종속 변수 y로 선형 회귀를 수행하는 방법을 배웠습니다. 이제 y가 m개의 독립 변수에 의존한다고 가정해 보겠습니다. 따라서 우리는 (m + 1)차원 데이터를 다루게 됩니다. 우리가 가진 데이터가 다음과 같은 n개의 데이터 포인트일 수 있습니다:


![image](/assets/img/2024-06-22-LinearRegressionfromScratch_14.png)


여기서 x_ij는 i번째 데이터 포인트에서 j번째 독립 변수의 값을 나타냅니다.

데이터를 벡터화하여 정리하는 것은 항상 좋은 첫 번째 단계입니다.

<div class="content-ad"></div>

우리는 이전과 마찬가지로 모든 y 값들을 벡터로 모아낼 수 있어요:

이제는 x 데이터가 두 개의 인덱스를 가지고 있기 때문에 xs에 대해 벡터를 사용하는 것이 더 이상이 아니에요. 대신, 각 행이 하나의 데이터 포인트인 행렬로 모아낼 수 있어요:

<div class="content-ad"></div>

이제부터 이 행렬의 항목을 나타내는 변수로 대문자 X_ij와 소문자 x_ij를 서로 바꿔 사용할 거에요.

지금 데이터에 맞추려고 하는 선형 모델은 조금 더 복잡해 보여요:

![image](/assets/img/2024-06-22-LinearRegressionfromScratch_17.png)

독립 변수 각각에 대한 계수 또는 "기울기"인 βs가 있는 m개의 계수가 있어요.

<div class="content-ad"></div>

각 데이터 포인트의 벡터를 만들 수 있어요.

![Vector](/assets/img/2024-06-22-LinearRegressionfromScratch_18.png)

행렬 X는 이러한 벡터를 각각의 행으로 갖고 있다고 생각할 수 있어요.

![Matrix X](/assets/img/2024-06-22-LinearRegressionfromScratch_19.png)

<div class="content-ad"></div>

β 계수들의 벡터를 만들어보세요.


Equation 3은 매우 간결하게 다음과 같이 표현될 수 있습니다.


<div class="content-ad"></div>

하지만 각 예측 값 y'_i에 대한 방정식을 모두 예측 값의 벡터로 결합하여보다 간결하게 할 수 있습니다.

![image](/assets/img/2024-06-22-LinearRegressionfromScratch_22.png)

![image](/assets/img/2024-06-22-LinearRegressionfromScratch_23.png)

단순 선형 회귀와 마찬가지로, 우리는 제곱 오차의 합 ||y' - y||²를 최소화하려고 합니다.

<div class="content-ad"></div>

등식 4를 사용하여 SSE 공식을 X, y, 그리고 β를 사용하여 확장할 수 있습니다.

![Equation-24](/assets/img/2024-06-22-LinearRegressionfromScratch_24.png)

익숙하게 느껴지나요? 이는 단순 선형 회귀에서의 오차 공식과 매우 비슷합니다. 우리는 그것을 최소화하는 β의 값을 찾아야 합니다. 먼저 ||y||² 항은 β에 영향을 미치지 않으므로 무시됩니다. 따라서 실제로 최소화해야 할 값은 다음과 같습니다.

![Equation-25](/assets/img/2024-06-22-LinearRegressionfromScratch_25.png)

<div class="content-ad"></div>

우리는 여기서 멈출 수 있습니다. Numpy에는 X와 y만 입력으로 사용하여 β의 적절한 값을 찾을 수 있는 numpy.linalg.lstsq 메서드가 있습니다. 기술적으로는 Python과 Numpy만 사용해야 한다는 내 규칙을 위반하는 것은 아니지만, 이것은 "처음부터 선형 회귀"에 대한 포스트에서 속임수 같아 보입니다. 대신, 수학적인 부분으로 들어가겠습니다.

Expression 2를 최소화하기 위해 그래디언트를 β에 대해 제로로 설정하고 해결해야 합니다. 이를 위해 Expression 2를 구성별 형식으로 변환한 다음, β의 각 구성 요소에 대해 개별적으로 미분을 수행할 것입니다.

점곱의 구성별 공식을 사용하여,

<div class="content-ad"></div>

행렬-벡터 곱셈의 경우,

![matrix-vector multiplication](/assets/img/2024-06-22-LinearRegressionfromScratch_27.png)

식 2를 요소별 형태로 변환할 수 있습니다:

![componentwise form](/assets/img/2024-06-22-LinearRegressionfromScratch_28.png)

<div class="content-ad"></div>

이제 특정  β_l  컴포넌트에 대한 식 3의 미분을 취해 봅시다:

![image](/assets/img/2024-06-22-LinearRegressionfromScratch_30.png)

![image](/assets/img/2024-06-22-LinearRegressionfromScratch_31.png)

<div class="content-ad"></div>

식 4를 단순화하려면 두 합의 미분을 취해야 합니다:

![식1](/assets/img/2024-06-22-LinearRegressionfromScratch_32.png)

그리고

![식2](/assets/img/2024-06-22-LinearRegressionfromScratch_33.png)

<div class="content-ad"></div>

각각을 개별적으로 다루어 봅시다.

식 5 미분

식 5는 다음과 같이 확장할 수 있습니다:

![image](/assets/img/2024-06-22-LinearRegressionfromScratch_34.png)

<div class="content-ad"></div>

위의 내용을 번역해 드리겠습니다.

영어로 된 내용은 "j나 k 둘 중 하나가 l과 같지 않은 부분, 그리고 k는 l과 같지만 j는 아닌 부분, 그리고 j가 l과 같지만 k는 아닌 부분, 그리고 j와 k가 모두 l과 같은 부분"을 뜻합니다. j와 k 둘 다 l과 같거나 같지 않아야 하기 때문에, 이 네 항목은 모든 가능성을 포함합니다. 이 모든 부분이 결합하여 Expression 5의 원래 합계와 동일합니다.

Expression 7의 두 가운데 항목은 인덱스 변수의 이름이 다를 뿐 동일합니다 (j vs k). 이름이 임의적이므로 우리는 세 번째 합에 있는 인덱스 변수의 이름을 j로 변경할 수 있으며, 따라서 두 항목은 같은 값을 갖습니다. 따라서 식은 다음과 같이 다시 쓸 수 있습니다.

<img src="/assets/img/2024-06-22-LinearRegressionfromScratch_35.png" />

이제 미분을 할 수 있습니다.

<div class="content-ad"></div>


![image](/assets/img/2024-06-22-LinearRegressionfromScratch_36.png)

![image](/assets/img/2024-06-22-LinearRegressionfromScratch_37.png)

첫 번째 항이 베타_l을 포함하지 않기 때문에 0이 됩니다.

식 6 미분


<div class="content-ad"></div>

식 6의 도함수를 찾는 것은 훨씬 간단합니다:

![](/assets/img/2024-06-22-LinearRegressionfromScratch_38.png)

![](/assets/img/2024-06-22-LinearRegressionfromScratch_39)

여기에서 두 번째 합계를 다시 β_l을 포함하는 부분과 β_l을 포함하지 않는 부분으로 분할하였습니다. 후자는 미분 중에 0으로 만들어집니다.

<div class="content-ad"></div>

모든 것을 합해 봅시다

이제 방금 발견한 미분식, Expression 8과 9를 식 4에 대입하고 간단히 정리해 보겠습니다. 그런 다음, 구성 요소 형식에서 벡터 형식으로 다시 변환할 수 있습니다.

![image](/assets/img/2024-06-22-LinearRegressionfromScratch_40.png)

![image](/assets/img/2024-06-22-LinearRegressionfromScratch_41.png)

<div class="content-ad"></div>

이 시점에서 우리는 다음 항등식을 사용할 수 있습니다.


![식1](/assets/img/2024-06-22-LinearRegressionfromScratch_42.png)


이를 통해 방정식 5를 더 변형할 수 있습니다.


![식2](/assets/img/2024-06-22-LinearRegressionfromScratch_43.png)


<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-LinearRegressionfromScratch_44.png" />

그러면 끝났어요! 에러의 기울기가 영인 경우 β는 반드시 방정식 6을 따라야 합니다.

기울기를 영으로 설정하면 실제로 최적의 해결책을 보장하는지 궁금할 수 있습니다. 결국, 이는 단지 전역 최소값이 아닌 지역 최소값을 찾을 수도 있습니다. 다행히 선형 회귀는 볼록 최적화 문제입니다. 이 수학 스택 익스체인지 답변에서 증명이 제공됩니다. 볼록 최적화 문제의 중요한 특성 중 하나는 어떤 지역 최소값도 전역 최소값이 될 수 있다는 것이기 때문에 걱정할 것이 없습니다.

솔루션이 올바름을 확인했으므로, 이제 방정식 6을 β에 대해 해결해야 합니다. Numpy에는 numpy.linalg.solve 함수가 제공되지만, 이 방정식이 하나의 솔루션만 있는 경우에만 작동합니다. 다른 옵션으로는 행렬을 축소된 행 사다리꼴 형태로 변환하는 것이 있지만, 놀랍게도 Numpy에는 이를 위한 유틸리티가 없습니다. 일부 조사를 한 결과, numpy.linalg.qr이라는 것을 발견했는데, 이 함수는 입력 행렬의 QR 분해를 수행합니다. 수학 스택 익스체인지의 답변 및 그 댓글이 방정식 풀이에 QR 분해를 사용하는 방법을 배우는 데 도움이 되었습니다.

<div class="content-ad"></div>

만약 A가 정사각 행렬이고(X^TX도 정사각이어야 함), 선형 방정식 Ax = b를 해결하려면 먼저 직교하는 정사각 행렬 Q와 상삼각 행렬 R을 찾아야 합니다. 여기서 QR = A가 성립합니다. Ax = b 방정식은 QRx = b로 변환됩니다. Q가 역행렬이어야 하므로 방정식은 Rx = Q^-1b로 더욱 단순화될 수 있습니다. R은 상삼각 행렬이고, 오른쪽 부분은 단순히 벡터이므로 Uv = w를 해결할 수 있는 능력이 있으면 충분합니다.

저는 작업 수행을 위해 solve_upper_triangular 함수를 만들었습니다. 선형 방정식을 해결하는 방법에 대해서는 자세히 설명하지 않겠습니다. 단순히 행의 마지막에서 시작하여 역방향으로 작업하며, 각 행에서 이전에 설정된 변수 값들을 대체하고, 남은 변수 중 계수가 0이 아닌 변수에 대해 하나를 제외한 모든 변수에 값을 1로 할당하고, 다른 변수들에 대한 마지막 변수를 나머지 변수들을 이용하여 구합니다.

```js
def solve_upper_triangular(a, b):
    """
    선형 방정식 ax = b를 x에 대해 해결합니다.
    :param a: 크기가 n x n인 상삼각 행렬.
    :param b: n 차원 벡터.
    :return: ax = b를 만족하는 x 벡터.
    """

    tracker = np.zeros(a.shape[1])
    result = np.zeros(a.shape[1])

    for row, val in zip(a[::-1], b[::-1]):
        unset_var_indices = np.where((tracker == 0) & (row != 0))[0]

        if len(unset_var_indices) == 0:
            if np.isclose(result @ row, val):
                continue
            else:
                raise UnsolvableError('주어진 a와 b 값으로 인해 해결할 수 없는 방정식입니다.')

        tracker[unset_var_indices] = 1
        result[unset_var_indices[1:]] = 1
        i = unset_var_indices[0]
        result[i] = (val - result @ row) / row[i]

    return result
```

이제 MultipleLinearRegressor를 생성할 준비가 되었습니다.

<div class="content-ad"></div>

```js
class MultipleLinearRegressor:
    """다중 선형 회귀를 수행합니다."""

    def __init__(self):
        self.beta = None
```

단순 선형 회귀와 마찬가지로 predict 메서드와 fit 메서드를 갖게 될 것입니다.

predict 메서드는 간단히 행렬 X 또는 벡터 x와 β 사이의 행렬 곱을 계산합니다.

```js
def predict(self, x):
    """
    주어진 x값 배열로부터 예측된 y값을 제공합니다.
    :param x: x값의 벡터 또는 행렬.
    :return: 예측된 y값의 벡터.
    """

    if self.beta is None:
        raise RegressionModelNotFitError('앗! 모델이 적합되지 않았습니다!')

    return x @ self.beta
```

<div class="content-ad"></div>

fit 메소드는 방정식 6을 해결하기 위해 X^TX를 QR 분해한 다음 solve_upper_triangular을 사용하여 Rβ = Q^-1X^Ty의 해를 찾습니다. 또한 적합한 모델의 제곱 오차의 합을 반환합니다.

```js
def fit(self, x, y):
    """
    x-값 행렬과 해당 y-값 벡터를 기반으로 모델을 적합합니다.
    :param x: x-값 행렬.
    :param y: y-값 벡터.
    :return: 적합된 모델의 제곱 오차의 합.
    """

    x_t = x.transpose()
    q, r = np.linalg.qr(x_t @ x)
    vec = np.linalg.inv(q) @ x_t @ y
    self.beta = solve_upper_triangular(r, vec)
    diff = self.predict(x) - y
    return diff @ diff
```

다중 선형 회귀기의 성능을 살펴봅시다. 이전과 매우 유사한 generate_noisy_data 함수를 만들겠습니다. 이 함수는 매개변수 벡터 β를 받아들이고 X 행렬과 데이터 포인트의 y-값 벡터를 생성한 다음 이전과 같이 각 y-값에 가우시안 노이즈를 추가합니다.

```js
def generate_noisy_data(n_data_points, n_independent_variables, beta, x_range, noise_stddev):
    """
    가우시안 노이즈가 추가된 선형 관계를 기반으로 데이터 포인트를 생성합니다.
    :param n_data_points: 생성할 데이터 포인트 수.
    :param n_independent_variables: 각 데이터 포인트에서의 독립 변수 수.
    :param beta: 독립 변수의 계수 벡터.
    :param x_range: x-값을 추출할 범위.
    :param noise_stddev: 각 y-값에 추가할 가우시안 노이즈의 표준 편차.
    :return: x-값 행렬과 y-값 벡터.
    """

    x = np.random.uniform(*x_range, (n_data_points, n_independent_variables))
    y = x @ beta + np.random.normal(scale=noise_stddev, size=n_data_points)
    return x, y
```  

<div class="content-ad"></div>

이제 데이터를 생성하고 회귀자가 원래 β를 얼마나 잘 복원하는지 살펴보는 시간입니다.

```js
regressor = MultipleLinearRegressor()
x, y = generate_noisy_data(n_data_points=500,
                           n_independent_variables=10,
                           beta=np.array([-10, 5, -8, -2, 1, -3, 4, -5, -1, 3]),
                           x_range=np.array([-100, 100]),
                           noise_stddev=50)
sse = regressor.fit(x, y)
print(f'Sum Squared Error: {sse}')
print(f'Beta: {regressor.beta}')
```

한 번 실행한 결과는 다음과 같습니다.

```js
Sum Squared Error: 1259196.6403705715
Beta: [-9.95436533  5.02469925 -7.95431319 -1.97266714  1.03726794 -2.95935233
  4.03854255 -4.98106051 -1.01840914  3.0410695]
```

<div class="content-ad"></div>

위에서 확인할 수 있듯이, 원래 매개변수 값에 꽤 가까운 결과를 얻는 데 잘 작동하는 것 같습니다.

## 편향(bias)에 대하여

지금까지 y절편이 0인 회귀 모델에 대해만 논의했습니다. 그러나 이는 모든 데이터에 적합한 것은 아닙니다. 만약 x⋅β + b와 같은 모델인 f(x) = x⋅β + b를 원한다면 어떻게 해야 할까요? 여기서 b는 0이 아닌 상수입니다. 기계 학습의 맥락에서 이 값 b를 편향(bias)이라고 부르며, 모든 모델 입력이 0일 때에도 데이터를 특정 값으로 '편향'시킨다는 의미입니다.

이러한 고려 사항은 회귀 모델에 편향을 추가하는 데 많은 노력이 필요하지 않다는 것으로 추가 사항으로 남겨두었습니다: 회귀 모델에 편향을 추가하는 것은 데이터에 항상 1로 설정된 추가 독립 변수를 추가하는 것과 동일합니다. 예를 들어, 우리가 2차원 데이터를 가지고 있고 회귀자에 편향을 추가하려는 경우, f(x) = kx 형태의 모델을 적합시키는 대신에

<div class="content-ad"></div>


![image](/assets/img/2024-06-22-LinearRegressionfromScratch_45.png)

변수 x_1은 원본 데이터를 나타내고, x_2는 모든 데이터 포인트에서 1로 설정됩니다. 데이터 포인트 (x, y)는 이렇게 (x_1, x_2, y) = (x, 1, y)가 됩니다. x_1 = x이고 x_2 = 1을 대입하면, 방정식 7은 다음과 같이 단순화됩니다.

![image](/assets/img/2024-06-22-LinearRegressionfromScratch_46.png)

여기서 β_1은 기울기이고, β_2는 바이어스입니다. 우리는 다중 선형 회귀를 사용하여 이 모델을 적합시킬 수 있습니다. 고차원 데이터의 경우, 이 과정은 비슷하게 작동합니다.


<div class="content-ad"></div>

# 결론

여기서 한 가지! 이것이 바로 처음부터 선형 회귀입니다. 즐겁게 즐겼고 무언가를 배웠으면 좋겠어요. 어떤 피드백과 건설적인 비평도 환영합니다. 다음 포스트에서는 선형 분류에 대해 다룰 예정이니 기대해주세요.

모든 코드는 github에서 확인하실 수 있습니다.