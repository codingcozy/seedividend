---
title: "고급 데이터 구조 및 알고리즘 더미용 신경망"
description: ""
coverImage: "/assets/img/2024-06-20-AdvancedDataStructuresandAlgorithmNeuralNetsforDummies_0.png"
date: 2024-06-20 01:15
ogImage:
  url: /assets/img/2024-06-20-AdvancedDataStructuresandAlgorithmNeuralNetsforDummies_0.png
tag: Tech
originalTitle: "Advanced Data Structures and Algorithm: Neural Nets for Dummies"
link: "https://medium.com/bitsrc/advanced-data-structures-and-algorithm-neural-nets-for-dummies-66224f278687"
isUpdated: true
---

## 자바스크립트에서 첫 번째 신경망 구현하기

![image](/assets/img/2024-06-20-AdvancedDataStructuresandAlgorithmNeuralNetsforDummies_0.png)

신경망은 매력적이고 흥미로운 것처럼 들립니다. 하지만 정확히 무엇이고, 어떻게 그런 마법을 달성하는 걸까요? 그리고 무엇보다 중요한 건, 전문적인 데이터 과학자가 아니어도 하나를 만들 수 있을까요?

이 기사에서는 신경망의 기본 원리와 기존 도구를 사용하여 직접 구현하는 방법을 보여드리겠습니다.

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

이 기사는 매우 실용적 일 것입니다. 마지막에 여러분께 자신만의 신경망을 만들어 터미널에서 기본 ASCII 그림을 그리는 방법을 안내해 드리겠습니다.

시작해 봅시다!

## 신경망 이해하기

신경망은 "뉴런(neurons)"으로 알려진 개별 요소로 구성된 특수한 유형의 데이터 구조입니다. 뉴런은 레이어로 그룹화되어 있으며 다른 레이어의 다른 뉴런과 연결됩니다.

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

가장 기본적인 신경망 구조 중 하나는 피드포워드 신경망입니다. 이들은 입력 레이어, 하나 이상의 은닉 레이어 및 출력 레이어로 구성되어 있으며, 정보는 한 방향으로만 흐릅니다 (입력 레이어에서 출력 레이어로).

이것이 무엇을 의미하는지 보여주는 기본 다이어그램이 있습니다:

![다이어그램](/assets/img/2024-06-20-AdvancedDataStructuresandAlgorithmNeuralNetsforDummies_1.png)

기본적으로 입력 정보는 입력 레이어에 입력되고, 거기서 "가중치"라고 불리는 값과 특정 활성화 함수(값을 취하여 0과 1 사이의 값을 출력하는 함수)를 사용하여 데이터가 변환됩니다.

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

이러한 뉴런 그룹을 결합하고 가중치를 적절하게 조정하면 (즉, 네트워크를 "학습"할 때 하는 것), 결합된 출력은 제공한 입력에 기초해 기대한 출력(또는 거의 동일한 값)이 됩니다.

예를 들어, XOR 방정식을 해결하는 기본적인 예는 다음과 같습니다:

[0,0] => 0
[0,1] => 1
[1,0] => 1
[1,1] => 0

하지만 2개의 입력과 1개의 출력 뉴런을 가진 피드포워드 네트워크를 만들면, 한 번 학습되면 0 또는 1의 모든 조합을 입력하고 실제로 XOR 동작을 프로그래밍하지 않고도 예상한 XOR 출력을 얻을 수 있습니다.

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

그것이 왜 신경망을 사용하고 싶어하는지의 주된 이유입니다. 실제로 모든 규칙을 코딩하지 않고도 일반화된 행동을 달성하기 위해서입니다.

## 신경망의 종류

다양한 종류의 신경망이 있으며, 각각의 특징과 용도가 있습니다. 여기에서 모든 종류를 나열하고 그들을 사용하고 구현하는 방법에 대해 깊게 설명하는 것은 이 글의 실용적인 접근을 방해할 수 있습니다.

따라서 가장 흔한 신경망 유형의 목록을 여기에 제시합니다. (다른 유형도 있다는 것을 염두에 두세요):

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

- 피드포워드 신경망: 앞에서 이미 다루었습니다. 이들은 가장 흔하고 간단한 신경망이지만 여전히 유효한 사용 사례가 있습니다.
- 합성곱 신경망(CNNs): 이미지 인식 및 처리 작업용으로 설계된 신경망입니다. 이미지 데이터에서 특징을 학습하는 데 효과적이며 컴퓨터 비전 응용 프로그램에서 일반적으로 사용됩니다.
- 순환 신경망(RNNs): 언어 번역이나 음성 인식과 같은 순차 데이터 처리 작업용으로 설계된 신경망입니다. 순차 데이터의 패턴을 학습하는 데 효과적이며 자연어 처리(NLP) 응용 프로그램에서 일반적으로 사용됩니다.
- 오토인코더: 차원 축소 및 특성 학습 작업용으로 설계된 신경망입니다. 입력 레이어, 은닉 레이어 및 출력 레이어로 구성되어 입력 데이터를 출력 레이어에서 재구성하도록 훈련됩니다.
- 생성적 적대 신경망(GANs): 가상 데이터 생성용으로 설계된 신경망입니다. 생성자 네트워크가 가상 데이터를 생성하고, 식별자 네트워크가 가상 데이터를 실제 데이터와 구분하려고 합니다.
- 트랜스포머: NLP 및 텍스트 생성에 매우 효과적입니다. 많은 자연어 처리 작업에 대해 최첨단 결과를 크게 개선했으며 이 분야에서 널리 사용되고 있습니다. 예를 들어, ChatGPT는 훈련 과정에서 이러한 유형의 NN(신경망)을 사용했습니다.

원하는 행동 유형에 따라 하나를 선택합니다. 이 기사에서는 간단하게 유지하고 첫 번째 신경망에 초점을 맞출 것입니다.

읽어주셔서 감사합니다! 제 무료 뉴스레터를 구독해보시겠어요? IT 산업에서 20년 동안의 지혜를 모두가 공유하는 "The Rambling of an old developer"에 가입해보세요!

# 첫 번째 신경망 구현

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

이것이 우리의 첫 번째 시도이므로 실용적인 방법을 찾고 있기 때문에, 바퀴를 다시 발명할 필요가 없다고 생각해요. 우리가 원하는 것을 달성하는 데 도움이 되는 도구들이 많이 있으니, 우리가 지금 바로 선택하면 돼요.

제 경우에는 저는 Synaptic을 선택했어요. 낮은 수준의 인터페이스를 제공하지만 기본적인 구성 요소는 이미 갖춰져 있어요. 그래서 심층 수학에 신경 쓸 필요없이 NN을 구축하는 데 필요한 요소를 잘 이해할 수 있어요.

우리의 NN을 사용하여 XOR 방정식을 해결하는 대신, 그것을 사용하여 터미널에 ASCII 이미지를 "그리고" 싶었어요. 이미지는 상대적으로 작아서 교육 시간을 짧게 유지하려고 해요.

![이미지](/assets/img/2024-06-20-AdvancedDataStructuresandAlgorithmNeuralNetsforDummies_2.png)

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

이것이 그려고 하는 행렬 또는 더 정확히 말하자면, NN에게 그리는 방법을 배우도록 요청하는 것입니다. 그래서 우리가 할 일은 이전과 동일한 3개의 레이어를 가진 NN을 생성할 것입니다:

- X와 Y 좌표를 위한 2개의 뉴런이 있는 입력 레이어.
- 15개의 뉴런이 있는 은닉 레이어.
- 그리고 각 좌표 세트마다 1 또는 0을 출력해야 하는지 이해하기 위해 1개의 뉴런만 있는 출력 레이어.

우리는 Synaptic을 사용하여 NN을 다음과 같이 설정할 것입니다.

이제 훈련에 대해, 가중치 간의 학습률을 0.3으로 설정할 것입니다. 이는 뉴런 간의 가중치가 각 반복에서 0.3씩 값을 조정할 것을 의미합니다. 그런 다음 그 결과를 출력해야 하는 것과 비교하고, 다음 반복에서 이에 따라 조정할 것입니다.

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

상수 이미지에는 내가 원하는 출력이 포함되어 있어요. 이를 사용하여 네트워크를 훈련할 거에요. 0과 1로 이루어진 8x6 매트릭스에요.

그런 다음 훈련을 위해 30,000회의 반복을 실행할 거에요. 매 "픽셀"마다 activate 메소드를 호출할 거에요. 이 메소드는 입력을 입력 레이어에 넣고 NN을 실행해요. 그런 다음 propagate 메소드를 사용하여 learningRate와 마지막 활성화값에 대한 예상 값을 사용해 네트워크가 자신을 조정하게 할 거에요.

참고로, "y _ 8 + x"라는 작은 공식은 직교 좌표를 사용하여 1차원 배열을 탐색하는 작은 속임수에요. 더 자세히 말하면 "`y 좌표` _ `폭` + `x 좌표`"이고, 2차원 배열이 더 이상 필요하지 않아요.

훈련이 끝나면 좌표를 다시 통과시키고 activate할 차례에요. 이번에는 결과를 출력할 거에요. 그를 위해 다음과 같은 함수를 만들었어요:

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

모든 Y 좌표에 대해 활성화 결과를 리스트에 저장하고, 한 행이 완료되면 (해당 Y에 대한 모든 X 좌표를 거쳤을 때) 출력합니다.

여기서 Math.round를 사용하고 있는 이유는 NN의 출력이 0 또는 1이 아니라 둘 사이의 숫자일 것이기 때문입니다.

결과를 보세요:

![이미지](/assets/img/2024-06-20-AdvancedDataStructuresandAlgorithmNeuralNetsforDummies_3.png)

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

위의 결과가 완벽하지 않음을 알 수 있어요. 그 이미지에는 2개의 오류가 있다는 걸 주목해주세요. 조금 더 훈련을 시키면 더 나은 결과를 얻을 수 있을지도 모르지만, 이것은 저가 얻은 최상의 결과 중 하나에요.

정확한 알고리즘을 코딩하지 않고도 일반적인 행동을 달성하려고 노력하는 만큼, 항상 올바른 답을 얻을 수 있는 것은 아니며 그 유사한 정도에 그치게 될 거예요.

그래서 Dall-e나 Midjourney로 이미지를 생성할 때 이상한 손이 나타나거나, ChatGPT가 가끔 사실이 아닌 문장을 작성하거나 버그가 있는 코드를 생성하는 이유에 대해 이해할 수 있어요. 그들의 훈련 결과에 기반하여 유사한 정도의 답변을 제시할 뿐이기 때문이에요.

신경망은 입력값의 다양한 수를 적응시켜야 하는 행동을 달성하려는 경우나 특정하게 코딩하는 데 많은 노력이 필요할 때 매우 유용할 수 있어요.

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

그 대신, 적절한 유형의 입력을 사용하여 훈련을 통해 충분히 가까운 결과를 얻을 수 있어요.

이전에 NN을 사용해 보셨나요? 그것들을 어떤 목적으로 사용했나요?

# 레고처럼 재사용 가능한 구성 요소로 앱을 만들어 보세요

![이미지](/assets/img/2024-06-20-AdvancedDataStructuresandAlgorithmNeuralNetsforDummies_4.png)

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

비트의 오픈 소스 도구는 25만 명 이상의 개발자들이 컴포넌트로 앱을 만들 수 있게 도와줍니다.

어떤 UI, 기능 또는 페이지든 재사용 가능한 컴포넌트로 변환하고 여러 응용 프로그램 간에 공유하세요. 협업하고 빠르게 개발하기가 더욱 쉬워집니다.

→ 더 알아보기

앱을 컴포넌트로 분할하여 앱 개발을 더 간단하게 만들고 원하는 작업 흐름에 대해 최상의 경험을 누리세요:

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

## → 마이크로 프론트엔드

## → 디자인 시스템

## → 코드 공유 및 재사용

## → 모노 레포

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

# 더 알아보기
