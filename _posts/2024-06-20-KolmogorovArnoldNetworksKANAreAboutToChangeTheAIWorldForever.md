---
title: "콜모고로프-아놀드 네트워크KAN가 인공지능 세계를 영원히 바꿀 것입니다"
description: ""
coverImage: "/assets/img/2024-06-20-KolmogorovArnoldNetworksKANAreAboutToChangeTheAIWorldForever_0.png"
date: 2024-06-20 04:51
ogImage:
  url: /assets/img/2024-06-20-KolmogorovArnoldNetworksKANAreAboutToChangeTheAIWorldForever_0.png
tag: Tech
originalTitle: "Kolmogorov–Arnold Networks (KAN) Are About To Change The AI World Forever"
link: "https://medium.com/accredian/kolmogorov-arnold-networks-kan-are-about-to-change-the-ai-world-forever-687f6d0b4d93"
isUpdated: true
---

## 신경망에 대해 알고 있던 모든 것을 잊어버리세요, KAN이 규칙을 다시 쓸 예정입니다

![image](/assets/img/2024-06-20-KolmogorovArnoldNetworksKANAreAboutToChangeTheAIWorldForever_0.png)

# 소개:

머신 러닝의 계속 변화하는 풍경 속에서 최근 발표된 "KAN: Kolmogorov-Arnold Network"라는 연구 논문은 열광적인 열기를 불러일으켰습니다. 이 혁신적인 접근 방식은 다층 퍼셉트론(MLP)의 전통적인 지혜에 도전하여 신경망 구조에 대한 새로운 시각을 제공합니다.

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

# 콜모고로프-아놀드 네트워크 (KAN's)란 무엇인가요:

이 혁신적인 개념의 핵심에는 Vladimir Arnold와 Andrey Kolmogorov가 개발한 수학 이론인 콜모고로프-아놀드 표현 정리가 있습니다. 이 정리는 복잡한 다변수 함수를 보다 간단한 일차원 함수로 분해할 수 있음을 주장하여 KAN의 독특한 구조의 기초를 제공합니다.

![이미지](/assets/img/2024-06-20-KolmogorovArnoldNetworksKANAreAboutToChangeTheAIWorldForever_1.png)

이제 당연한 질문은 이 "더 간단한 일차원 함수"가 무엇인가요. 수학 또는 컴퓨터 그래픽을 조금 알고 있는 사람이라면, 우리가 말하는 것은 옛날부터 신뢰받는 조각별 다항식인 Spline입니다.

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

![image](https://miro.medium.com/v2/resize:fit:1400/1*1VcxJSh_CYAPc9-0os2-pA.gif)

# KAN의 시크릿 소스, 스플라인!

스플라인은 연속 점들을 연결하여 부드러운 곡선을 생성할 수 있는 수학적 함수입니다. 스플라인은 인접 세그먼트 사이의 연속성과 부드러움을 보장하면서 곡선의 모양을 조절하는 유연성을 제공합니다.

스플라인을 생성하기 위해 일반적으로 곡선의 경로를 정의하는 일련의 제어점을 시작점으로 삼습니다. 그런 다음, B-스플라인이나 베지에 곡선과 같은 기저 함수를 사용하여 이러한 제어점 사이의 경로를 보간하거나 근사합니다.

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

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*B1MXmHF8xD_WP3GJNwbfDQ.gif)

기본적으로 스플라인은 복잡한 곡선이나 표면을 정밀하고 유연하게 표현하는 다재다능한 도구를 제공하여 다양한 분야에서 귀중하게 활용됩니다.

하지만, KAN 아키텍처에서 이러한 스플라인을 어떻게 사용하고 적용할까요?

# KAN 작동 방식을 이해하는 가장 간단한 방법

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

전통적인 MLP들과 달리 KAN은 고정된 활성화 함수를 학습 가능한 기능(B-Splines)으로 대체하여 네트워크의 가장자리를 따라 작동합니다.

이 적응형 아키텍처를 통해 KAN은 복잡한 함수를 효과적으로 모델링하면서 해석 가능성을 유지하고 필요한 매개변수의 수를 줄일 수 있습니다.

![image](https://miro.medium.com/v2/resize:fit:1200/1*5hfRk7kjl-CZvyhpbfKlsw.gif)

MLP의 경우 신호를 전달하는 수동적인 수단으로 기능하는 것과 달리, KAN의 뉴런들은 학습 프로세스의 적극적인 참여자로서 동적으로 동작을 조정하여 마주치는 데이터에 대응합니다.

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

네트워크의 가장자리에 배치된 학습 가능한 활성화 함수를 도입하여 가능해진 이 혁신적인 전환은, 네트워크의 에지에 배치된 학습 가능한 활성화 함수를 통해 가능케 되었습니다.

![이미지](/assets/img/2024-06-20-KolmogorovArnoldNetworksKANAreAboutToChangeTheAIWorldForever_2.png)

B-스플라인의 표현력을 이용하여, 이러한 함수들은 KAN에 무궁무진한 유연성과 적응성을 부여하여, 복잡한 데이터 환경을 쉽게 탐색할 수 있게 만들어줍니다.

# KAN의 주요 장점:

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

## 향상된 확장성

KAN은 특히 고차원 데이터 시나리오에서 MLP에 비해 우수한 확장성을 보여줍니다. 복잡한 함수를 간단한 구성 요소로 분해하는 능력으로 대용량 데이터를 효율적으로 처리할 수 있어서 방대한 양의 정보가 포함된 작업에 이상적입니다.

## 향상된 정확성

더 적은 매개변수를 사용하더라도 KAN은 다양한 작업에 걸쳐 전통적인 MLP보다 더 높은 정확도와 낮은 손실을 달성합니다. 이는 데이터 내에서 관계를 적응적으로 모델링하는 능력 때문에, 보다 정확한 예측과 보다 잘 일반화된 결과를 얻을 수 있다고 이해됩니다.

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

## 해석 가능한 모델

KAN의 구조는 해석 가능성을 용이하게 하여 연구자들이 학습된 패턴을 효과적으로 나타내는 상징적인 공식을 도출할 수 있게 합니다. 블랙박스 모델과는 달리, KAN은 입력 특성이 네트워크 전반에 걸쳐 어떻게 변환되는지에 대한 통찰을 제공하여 투명성과 이해를 높입니다.

이제 KAN이 무엇이며 왜 인공지능 분야에서 큰 문제인지를 알게 되었지만, 세상은 이론과 논문에서 멋져 보이는 모델로만 움직이는 것이 아닙니다.

하지만 KAN의 가장 좋은 점은 새로운 Python 라이브러리 "PyKAN"을 사용하여 자신의 데이터 과학 문제에 쉽고 간단하게 적용할 수 있다는 것입니다.

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

위의 텍스트를 친근한 어조로 한국어로 번역하겠습니다.

우리의 토론을 파이썬으로 이 아키텍처를 어떻게 구현할 수 있는지 예제와 함께 마무리해봅시다.

# Python에서 KAN의 구현 (PyKAN):

우리의 데모를 위해 분류 문제를 사용해봅시다.

## 데이터셋 생성

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

sklearn 라이브러리의 "make_moons" 함수를 사용하여 합성 데이터 세트를 생성할 예정이에요.

```js
import matplotlib.pyplot as plt
from sklearn.datasets import make_moons
import torch
import numpy as np

dataset = {}
train_input, train_label = make_moons(n_samples=1000, shuffle=True, noise=0.1, random_state=None)
test_input, test_label = make_moons(n_samples=1000, shuffle=True, noise=0.1, random_state=None)

dataset['train_input'] = torch.from_numpy(train_input)
dataset['test_input'] = torch.from_numpy(test_input)
dataset['train_label'] = torch.from_numpy(train_label)
dataset['test_label'] = torch.from_numpy(test_label)

X = dataset['train_input']
y = dataset['train_label']
plt.scatter(X[:,0], X[:,1], c=y[:])
```

## 결과 (시각화된 데이터셋)

<img src="/assets/img/2024-06-20-KolmogorovArnoldNetworksKANAreAboutToChangeTheAIWorldForever_3.png" />

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

## KAN 생성 및 훈련

```js
from kan import KAN

model = KAN(width=[2,2], grid=3, k=3)

def train_acc():
    return torch.mean((torch.argmax(model(dataset['train_input']),
    dim=1) == dataset['train_label']).float())

def test_acc():
    return torch.mean((torch.argmax(model(dataset['test_input']),
    dim=1) == dataset['test_label']).float())

results = model.train(dataset, opt="LBFGS", steps=20,
          metrics=(train_acc, test_acc),
          loss_fn=torch.nn.CrossEntropyLoss())
```

## 모델로부터 심볼릭 공식 획득

이후, 모델이 데이터로부터 학습한 내용을 나타내는 심볼릭 공식이 유도됩니다.

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

```python
formula1, formula2 = model.symbolic_formula()[0]
```

## 정확도 계산하기

마지막으로 학습된 공식에서 정확도를 얻을 수 있습니다.

```python
def acc(formula1, formula2, X, y):
    batch = X.shape[0]
    correct = 0
    for i in range(batch):

        logit1 = np.array(formula1.subs('x_1', X[i,0]).subs('x_2', X[i,1])).astype(np.float64)
        logit2 = np.array(formula2.subs('x_1', X[i,0]).subs('x_2', X[i,1])).astype(np.float64)

        correct += (logit2 > logit1) == y[i]

    return correct/batch

# 정확도 출력
print('학습 데이터 정확도:', acc(formula1, formula2, dataset['train_input'], dataset['train_label']))

print('테스트 데이터 정확도:', acc(formula1, formula2, dataset['test_input'], dataset['test_label']))
```

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

## 결과

```js
수식의 학습 정확도: tensor(0.9700)
수식의 테스트 정확도: tensor(0.9660)
```

# 결론

요약하자면, 콜모고로프-아놀드 네트워크(KANs)는 신경망 구조에서 패러다임 전환을 나타냅니다. KANs는 잠재력을 최대로 발휘하기 위해 추가 연구와 실험이 필요하지만, 앞으로 몇 년 동안 기계 학습과 과학적 발견을 진전시키는 데 유용한 도구로서의 가능성을 갖고 있습니다.

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

계속 발전하는 이 분야에서 KAN은 혁신의 선두에 서 있습니다. 지능 시스템의 미래를 형성하고 복잡한 데이터 분석과 모델링 방식을 혁명화하고 있습니다.
