---
title: "Pytorch에서 텐서 고급 선택 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-AdvancedSelectionfromTensorsinPytorch_0.png"
date: 2024-07-12 20:32
ogImage: 
  url: /TIL/assets/img/2024-07-12-AdvancedSelectionfromTensorsinPytorch_0.png
tag: Tech
originalTitle: "Advanced Selection from Tensors in Pytorch"
link: "https://medium.com/towards-data-science/advanced-selection-from-tensors-in-pytorch-f012e52eef80"
---


가끔은 파이토치(Pytorch)로 고급 색인 및 선택을 해야 할 때가 있습니다. 예를 들어 "텐서 A에서 텐서 B에 지정된 색인을 따라 요소를 선택하는 방법"과 같은 질문에 답변할 수 있습니다.

이 게시물에서는 이러한 작업을 수행하는 가장 일반적인 세 가지 방법인 torch.index_select, torch.gather 및 torch.take를 소개합니다. 우리는 이러한 방법을 자세히 설명하고 서로 비교합니다.

![이미지](/TIL/assets/img/2024-07-12-AdvancedSelectionfromTensorsinPytorch_0.png)

솔직히 말해서, 이 게시물의 동기 중 하나는 어떤 기능을 언제 사용해야 하는지를 잊어버려 구글링하거나 스택 오버플로우를 찾아보거나, 내 의견으로는 비교적 간단하고 그리 도움이 되지 않는 공식 설명서를 보는 것 때문입니다. 그래서 여기에서는 언급한 바와 같이 이러한 기능에 대해 심층적으로 알아보겠습니다: 언제 어떻게 사용해야 하는지 동기부여를 해주고, 2D 및 3D에서 예제를 제공하며, 결과적으로 선택된 요소를 그래픽으로 표시할 것입니다.

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

이 게시물이 해당 기능에 대한 명확성을 가져다 주고 추가 탐구가 필요 없도록 도와줄 것을 희망합니다 — 읽어 주셔서 감사합니다!

그리고 이제, 더 이상 어색함 없이 함수를 하나하나 살펴보겠습니다. 먼저, 모든 것을 2D 예제로 시작하여 결과 선택을 시각화한 후, 3D에서 조금 더 복잡한 예제로 넘어갑니다. 그 이후에는 간단한 파이썬에서 실행된 작업을 재구현합니다 — 이를 통해 이러한 함수가 무엇을 하는지에 대한 다른 정보원인 유사한 의사코드를 참고할 수 있게 됩니다. 마지막으로, 함수들과 해당 차이점들을 표로 요약합니다.

# torch.index_select

torch.index_select는 한 차원을 따라 요소를 선택하는 동시에 다른 차원을 유지합니다. 다시 말해, 다른 모든 차원의 모든 요소를 유지한 채 목표 차원에서 인덱스 텐서를 따라 요소를 선택합니다. 우리는 2D 예제로 이를 보여줍니다. 여기서는 1차원을 따라 선택하겠습니다:

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
num_picks = 2

values = torch.rand((len_dim_0, len_dim_1))
indices = torch.randint(0, len_dim_1, size=(num_picks,))
# [len_dim_0, num_picks]
picked = torch.index_select(values, 1, indices)
```

그 결과 텐서는 형태 [len_dim_0, num_picks]를 가집니다: 차원 0을 따라 각 요소에 대해 차원 1에서 동일한 요소를 선택했습니다. 이를 시각화해 봅시다:

![image](/TIL/assets/img/2024-07-12-AdvancedSelectionfromTensorsinPytorch_1.png)

이제 세 가지 차원으로 이동합니다. 이것은 기계 학습 / 데이터 과학의 세계에 더 가까워지며, 형상이 [batch_size, num_elements, num_features]인 텐서를 상상해 보겠습니다. num_elements 요소가 있고 num_feature 특징이 있으며 모든 것이 배치 처리됩니다. torch.index_select를 사용하여 모든 배치 / 특징 조합에 대해 동일한 요소를 선택할 수 있습니다:


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
import torch

batch_size = 16
num_elements = 64
num_features = 1024
num_picks = 2

values = torch.rand((batch_size, num_elements, num_features))
indices = torch.randint(0, num_elements, size=(num_picks,))
# [batch_size, num_picks, num_features]
picked = torch.index_select(values, 1, indices)
```

어떤 사람들은 index_select가 하는 일을 코드 형태로 이해하는 것을 선호할 수 있습니다. 따라서, 간단한 for 루프를 사용하여 이 함수를 다시 구현할 수 있는 방법을 설명해 드리겠습니다:

```js
picked_manual = torch.zeros_like(picked)
for i in range(batch_size):
    for j in range(num_picks):
        for k in range(num_features):
            picked_manual[i, j, k] = values[i, indices[j], k]

assert torch.all(torch.eq(picked, picked_manual))
```

# torch.gather


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

다음으로 torch.gather로 이동해 보겠습니다. gather는 index_select와 유사하게 작동하지만 이제 원하는 차원에서 요소 선택이 다른 차원에 따라 종속적입니다. 다시 말해 우리의 머신러닝 예제를 재사용하는 것입니다: 매 batch 인덱스마다, 그리고 매 feature마다, "element" 차원에서 다른 요소를 선택할 수 있습니다. 하나의 텐서에서 다른 텐서의 인덱스를 따르면서 요소를 선택합니다.

ML 프로젝트를 진행하면서 이런 사용 사례를 자주 만나게 되었는데, 하나의 구체적인 예시는 어떤 조건에 따라 트리에서 노드를 선택하고, 각 노드가 일부 feature로 지정된다고 할 때, 배치 차원에 선택할 요소를 넣는 인덱스 선택 행렬을 생성하고 해당 값을 feature 차원을 따라 반복하는 것입니다. 즉, 각 batch 인덱스마다 조건에 따라 다른 요소를 선택할 수 있으며, 우리의 예시에서 이 조건은 배치 인덱스에만 의존하지만 feature 인덱스에도 의존할 수 있습니다.

하지만 먼저, 2D 예제로 다시 시작해 보겠습니다:

```js
num_picks = 2

values = torch.rand((len_dim_0, len_dim_1))
indices = torch.randint(0, len_dim_1, size=(len_dim_0, num_picks))
# [len_dim_0, num_picks]
picked = torch.gather(values, 1, indices)
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

이를 시각화할 때, 우리는 이제 선택이 직선으로 특징지어지지 않고, 차원 0의 각 인덱스마다 차원 1의 다른 요소가 선택된다는 것을 관찰할 수 있습니다:

![image](/TIL/assets/img/2024-07-12-AdvancedSelectionfromTensorsinPytorch_2.png)

이를 바탕으로 세 가지 차원으로 이동하고, 또한 Python 코드를 통해 이 선택을 다시 구현해보겠습니다:

```python
import torch

batch_size = 16
num_elements = 64
num_features = 1024
num_picks = 5
values = torch.rand((batch_size, num_elements, num_features))
indices = torch.randint(0, num_elements, size=(batch_size, num_picks, num_features))
picked = torch.gather(values, 1, indices)

picked_manual = torch.zeros_like(picked)
for i in range(batch_size):
    for j in range(num_picks):
        for k in range(num_features):
            picked_manual[i, j, k] = values[i, indices[i, j, k], k]

assert torch.all(torch.eq(picked, picked_manual))
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

## torch.take

torch.take는 소개된 세 가지 기능 중 가장 이해하기 쉬운 것일 수 있습니다. 이 함수는 입력 텐서를 평평하게 취급하고 이 목록에서 요소를 선택합니다. 예를 들어, 입력 텐서의 모양이 [4, 5]이고 인덱스 6과 19를 선택할 때, 우리는 평평한 텐서의 6번째와 19번째 요소를 얻습니다. 즉, 제 2행의 2번째 요소와 맨 마지막 요소를 의미합니다.

2D 예시:

```js
num_picks = 2

values = torch.rand((len_dim_0, len_dim_1))
indices = torch.randint(0, len_dim_0 * len_dim_1, size=(num_picks,))
# [num_picks]
picked = torch.take(values, indices)
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

아래에서 볼 수 있듯이, 우리는 이제 두 개의 요소만 얻게 되었습니다:

![image](/TIL/assets/img/2024-07-12-AdvancedSelectionfromTensorsinPytorch_3.png)

다음은 3D 선택 후 재구현입니다. 인덱스 텐서는 이제 임의의 모양을 가질 수 있으며, 결과 선택은 이 모양으로 제공됩니다:

```python
import torch

batch_size = 16
num_elements = 64
num_features = 1024
num_picks = (2, 5, 3)

values = torch.rand((batch_size, num_elements, num_features))
indices = torch.randint(0, batch_size * num_elements * num_features, size=num_picks)
# [2, 5, 3]
picked = torch.take(values, indices)

picked_manual = torch.zeros(num_picks)
for i in range(num_picks[0]):
    for j in range(num_picks[1]):
        for k in range(num_picks[2]):
            picked_manual[i, j, k] = values.flatten()[indices[i, j, k]]

assert torch.all(torch.eq(picked, picked_manual))
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

# 결론

이 게시물에서는 Pytorch에서 세 가지 일반적인 선택 방법인 torch.index_select, torch.gather 및 torch.take을 살펴보았습니다. 이러한 방법을 사용하면 조건에 따라 텐서에서 요소를 선택하거나 색인 할 수 있습니다. 모든 경우에 우리는 간단한 2D 예제로 시작하여 결과 선택을 시각적으로 표현했습니다. 그런 다음, 어느 정도 더 복잡하고 현실적인 3D 시나리오로 이동했습니다. 이 시나리오에서는 [batch_size, num_elements, num_features] 모양의 텐서에서 선택해야 하는 경우가 있습니다. 이는 모든 ML 프로젝트에서 일반적으로 발생할 수 있는 사용 사례입니다.

이 게시물을 마무리하면 이러한 함수들 간의 차이점을 테이블로 요약하고 싶습니다. 이 테이블은 간단한 설명 및 샘플 모양을 포함하며, 샘플 모양은 이전에 언급한 3D ML 예제에 맞게 조정되어 있습니다. 색인 텐서의 필요한 모양과 결과적으로 출력될 모양을 나열할 것입니다:

<img src="/TIL/assets/img/2024-07-12-AdvancedSelectionfromTensorsinPytorch_4.png" />

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

읽어 주셔서 감사합니다!