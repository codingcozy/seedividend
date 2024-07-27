---
title: "신경망이란 무엇인가요"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_0.png"
date: 2024-07-09 19:51
ogImage:
  url: /assets/img/2024-07-09-WhatIsaNeuralNetAnyway_0.png
tag: Tech
originalTitle: "What Is a Neural Net, Anyway?"
link: "https://medium.com/ai-advances/what-is-a-neural-net-anyway-4fc8692f2d28"
---

![Image](/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_0.png)

인공지능과 기계학습의 세계를 두르고 있는 다양한 용어 중에서, 신경망과 같은 용어는 '멋진 요소'를 지니는 것 같아요.

과학 소설의 세계가 이 용어를 빌려와서 매우 발달한 로봇과 안드로이드의 내부 작동 원리를 묘사하는데 기회를 마련한 결과입니다. 아놀드 슈워제네거의 터미네이터가 T2: 심판의 날에서 코너 가족과 나눈 대화를 기억하지 않는 사람이 누구죠?

존 코너:
프로그램되어 있지 않은 내용을 배우는 것이 가능한가요? 그러면... 더 인간적이고, 항상 꼴좋지가 않다고요?

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

터미네이터:
내 CPU는 신경망 프로세서야; 학습 컴퓨터지. 그러나 Skynet은 우리를 홀로 보낼 때 스위치를 읽기 전용으로 설정해.

Sarah Connor:
너무 많이 생각하지 않기를 원치 않는 거야, 그렇지?

터미네이터:
그래.

![이미지](/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_1.png)

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

아마도 신경망이라는 아이디어가 기계 세계와 인간 두뇌 세계 사이의 보통의 엄격한 분리를 흐리게 한다는 것 때문에 그럴 수도 있습니다. 인간/기계 경계를 넘어가는 이러한 아이디어들은 우리를 항상 매혹시키거나 흥분시킵니다.

오늘날의 신경망은 그 자체로 인간 두뇌의 영감으로부터 그 존재를 갚고 있습니다.

# 두뇌에서 바이트로

1943년에는 두 번째 세계대전의 치열한 시기였으며 소련이 스탈린그라드 전투에서 나치 독일을 이겼던 해였는데, 신경생리학자 워렌 S. 맥컬럭과 인지 심리학자 월터 H. 피트가 함께 논문을 작성하여 두뇌의 작동을 추상적인 수학적 용어로 설명하려고 노력했습니다.

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

![신경망이란 무엇인가요](/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_2.png)

제목은 "신경 활동에 내재된 아이디어의 논리적 논리" (아니요, 목이 나가는 제목으로는 점수를 주지 않습니다)였고, 논문의 통찰 중 하나는 뇌 속 신경세포를 더 간단한 논리 문으로 취급하여 입력에 따라 발화하거나 발화하지 않는 간단한 논리 게이트로 제안한 것이었습니다.

뇌의 작동을 추상 수학으로 변환하는 아이디어가 기계 학습으로 자연스럽게 진화하는 과정을 볼 수 있습니다. 뇌가 수학으로 변환되고, 수학이 프로그래밍 언어를 통해 컴퓨터 코드로 변환되는 것입니다.

신경망의 개념과 1950년대 Frank Rosenblatt의 패턴 인식 퍼셉트론, 1970년대 백프로파게이션 도입부터 2010년대 GPU 기반 딥 러닝의 출현에 이르기까지 수년간의 혁신은 우리를 인공 신경망(ANN)과 기계 학습에서의 역할이 단순히 퍼지는 세상으로 이끌었습니다.

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

실제로 신경망은 다른 형태의 기계 학습과 유사합니다. 목표는 데이터를 입력하고 해당 데이터를 기반으로 패턴을 추출하거나 예측을 수행하는 것입니다. 예를 들어, 주택 가격을 예측하는 전형적인 사용 사례가 있습니다. 면적, 침실 수, 그리고 대지 크기와 같은 데이터를 입력하면 데이터 세트 내의 주택에 대한 예측된 가격을 얻게 됩니다.

신경망은 이러한 예측을 어떻게 하는 것이 가장 좋은지를 학습 데이터로부터 배우며, 결국 충분한 학습을 통해 합리적인 정확도로 예측을 할 수 있게 됩니다.

하지만 이 신경망이 정확히 무엇이며, 인공 뉴런은 무엇인가요? 이런 기계 학습 사용 사례를 해결하기 위해 신경망이 어떻게 작동하는 걸까요?

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

이 질문에 대한 복잡하고 수학적인 답변들이 많이 있어요. 이 개념들을 초심자 친화적인 방식으로 탐색할 거에요. 즉, 초심자 친화적인 언어와 코드를 사용할 거에요.

이 수업을 듣고 나면 기계 학습 닌자가 되지는 않겠지만, 뇌신경망이 인공지능에 어떻게 적용되는지 확실하게 상상할 수 있고, 코드를 통해 실험도 할 수 있을 거예요.

그 말을 기억하며, 시작해 봐요!

# 기본적인 내용

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

인공 신경망의 핵심은 뉴런 개념에 있으므로 우리 여행을 시작하는 가장 좋은 곳처럼 보입니다. 아래에는 유기 뉴런의 구조를 왼쪽에, 인공 뉴런을 오른쪽에 보여주는 멋진 이미지가 있습니다:

![What is a Neural Net Anyway](/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_4.png)

생물학적 뉴런의 경우, 세포체 주변의 작은 줄기 모양의 가지(dendrites)는 '입력'으로 생각할 수 있으며, 축삭(axon)은 '출력'으로 생각할 수 있습니다.

하지만 우리는 인공 뉴런을 탐구하고 싶으므로 오른쪽 이미지에 주목해봅시다. 약간 위압감을 주는 것 같지 않나요? 처음에는 확실히 그랬어요. 아마 숫자를 나타내는 글자 아래에 있는 작은 숫자들, 게다가 그리스 문자도 있습니다.

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

수학이 나타납니다...

하지만 이 뉴런 개념을 가장 기본적인 형태로 축소해서 훨씬 간단하게 만들어볼 수 있습니다. 몇 가지 — 전부는 아니지만 — 무서운 문자들을 제거해볼까요? (고등학교 수학이 평생에 걸쳐 상처를 남긴 것을 깨달고 계신가요?)

아래는 매우 간단한 뉴럴 네트워크에 대한 시각화입니다. 이것은 딱 한 개의 '뉴런'으로 구성되어 있습니다. 뉴럴 네트워크의 가장 간단한 표현이며, 깊은 학습의 아버지인 Frank Rosenblatt가 만든 용어 '퍼셉트론'으로 잘 알려져 있습니다.

<img src="/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_5.png" />

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

자, 이 사진은 다소 이해하기 쉬워 보이네요.

이제 우리는 신경망이 학습을 하도록 설계되었고 생물학적 뉴런을 기반으로 한다는 것을 알았으니, 우리 뉴런이 입력(정보)을 받고 출력을 제공해야 한다는 합리적인 추론을 할 수 있습니다. 이미지에서 이것을 어느 정도 볼 수 있습니다. 왼쪽에는 몇 개의 상자가 있고 가운데에는 일부 내용이 있으며 오른쪽에는 출력이 있습니다.

왼쪽에 있는 입력부터 시작해봅시다. 일반적으로 'x'로 표시되는데요. 따라서 x1과 x2가 있는 것입니다. 이것은 우리의 입력이 2가지 특징을 가진 '것들'이라는 뜻입니다. 예를 들어 달콤함과 단단함에 기반을 둔 과일이 사과인지 바나나인지 예측할 수 있습니다.

지금은 입력이 무엇인지가 중요한 게 아니라, 그 입력이 2가지 특징을 가지고 있다는 것입니다.

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

# 가중치 & 편향

저희의 입력 변수(x1과 x2) 각각에는 해당하는 w 값(w1과 w2)이 있습니다. 이것들은 가중치를 나타냅니다.

![image](/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_6.png)

가중치는 우리의 뉴런에서 매우 중요한 부분이며, 입력으로 들어오는 각 특성에 얼마나 중요성을 부여할지 결정합니다. 그래서 각 특성당 하나의 가중치가 있습니다. 예를 들어 주택 가격 예측 예제에서 침실 수가 위치보다 가격을 더 잘 예측하는 경우, 해당 특성의 가중치는 귀하의 신경망을 교육하고 결과적으로 높아질 것입니다.

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

훈련을 통해 언급하는 이유는 처음에 신경망이 우리의 예측에 가장 중요한 특징이 무엇인지 모르기 때문입니다. 그래서 이 가중치 매개변수의 값은 작은 (랜덤) 값으로 시작합니다. 들어오는 데이터로 신경망을 계속 훈련시켜서 이러한 가중치가 시간이 지남에 따라 변하고 (더 정확해지게) 할 수 있습니다. 이러한 무작위 값을 선택하는 방법은 신경망을 구성할 때 사용하는 방식에 따라 다릅니다만, 일반적인 예로는 다음과 같은 것들이 있습니다:

- 균일 분포: 숫자는 작은 범위 사이에서 균일하게 분포될 것이며, 예를 들어, -0.05부터 0.05 사이일 수 있습니다.
- 정규 분포: 값은 평균이 0이고 표준 편차가 작은 (예를 들어 0.01) 정규 분포에서 추출된 작은 숫자일 수 있습니다.

일단은 훈련하기 전에 w1과 w2에는 특별히 유용하지 않은 숫자가 있다고 가정해 봅시다.

그런데 빠르게 사이드 노트를 하자면 — ‘훈련’이라고 말할 때 어떤 의미일까요? 실제로 무슨 일이 일어나고 있을까요? 일반적으로 기계 학습 모델을 훈련하는 것은 여러 epoch를 사용하여 수행됩니다. 여기서 말하는 epoch는 ‘제공한 모든 훈련 데이터를 한 번 통과하는 것’을 의미하는 용어로, 우리의 경우 데이터를 신경 세포에 뭉쳐주고 다른 쪽으로 내보내는 것입니다.

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

이러한 epoch의 끝에서 매개변수가 업데이트되므로 이상적으로는 다음 번 훈련에서 예측이 좋아지도록 손실(잘못된 예측)이 줄어든다. 계속해서 좋은 예측 능력을 갖게 될 때까지!

![이미지](/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_7.png)

간단한 다이어그램을 돌아보면 우리의 입력과 함께 'b'로 표시된 것을 알 수 있습니다. b는 편향(bias)을 나타내며, 또 하나의 중요한 기계 학습 개념입니다. 저희의 가중치와 마찬가지로, 신경망 훈련 과정 중에 변경되는 '매개변수'입니다.

저희의 간단한 예제에서, 그리고 많은 실제 사례에서, 편향은 훈련을 시작하기 전에 0에서 시작하지만 각 epoch을 처리할 때마다 편향이 잠재적으로 업데이트될 것입니다. 하지만 무엇을 위해? 그리고 왜 그렇게 되는 걸까요?

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

그래도 일반적인 편향 설명을 찾아보면 "편향 항은 활성화 함수가 왼쪽이나 오른쪽으로 이동할 수 있게 합니다." 정도의 내용이 나올 거에요. 하지만 좀 더 쉽게 이해할 수 있게 설명해볼게요.

트레이닝 과정에서 각 반복마다 오차가 발생하는데, 이것이 기계 학습의 본질이자 같은 데이터 조각들을 반복해서 훈련하고 학습해야 하는 이유입니다. 목표는 시간이 지남에 따라 이러한 오차를 줄이는 것입니다.

편향(가중치와 마찬가지로)는 각 훈련 단계마다 조정될 수 있는데, 이 조정된 값은 다음 반복을 '중립적이지 않은' 위치에서 시작하게 만들어줍니다. 기본적으로 다음 훈련 단계에 약간의 편향(따라서 이름이 붙여진 것)을 도입하여, 예측을 처음에 한 방향으로 이동시키고 다른 방향으로 이동시키는 데 도움이 되도록 하는 것이 목표입니다. 예를 들어 모델이 바나나를 예측할 때(0으로 표현) 실제 값이 사과(1로 표현)인데 너무 많은 오류를 발생시키고 있다면, 편향이 조금씩 0에서 1 방향으로 조정되어 다음 에포크를 돕는 역할을 할 수 있습니다.

# 어이쿠, Σ 주소 변경할 시간이에요.

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

이해해줘서 고마워요! 가능한 한 그리스어 문자를 너와 나로부터 멀리하려고 노력했어. 숫자 주변이나 떠다니는 재미있는 작은 기호들의 말장난으로부터 보호막처럼 행동했거든.

하지만 이젠 그 시간이야. 우리 뉴런 속의 'Σ'에 대해 다뤄야 해. 괜찮아요, 난 부드럽게 다가갈게요.

다행히도 이건 꽤 쉬운 부분이에요. 그리스 글자 'Σ'는 시그마(Sigma)라고 불리며, 수학 용어로는 합계를 나타냅니다. 기본적으로 더해주는 개념이죠. 그래서 우리 뉴런의 이 부분에서:

<img src="/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_8.png" />

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

우리는 가중치 입력을 합산하고 편향을 더하는 중입니다.

이는 Σ(Wi \* xi) + b로 계산됩니다. 여기서 Wi와 xi는 가중치와 입력을 가리키며, b는 편향을 의미합니다. 간단히 말하면 우리는 각 입력을 해당하는 가중치로 곱한 뒤 더하고, 마지막으로 편향을 더하는 것입니다.

이후에는 '시그모이드 활성화'로 넘어갑니다. 시그모이드 활성화 또는 시그모이드 함수는 '압축' 함수로도 불립니다. 모든 합산과 더하기를 끝낸 후, 매우 큰 음수 또는 양수 값이 나올 수 있으며 해석하기 어렵을 수 있습니다.

시그모이드 함수는 이 숫자를 0과 1 사이의 값으로 '압축'하여 의미 있는 숫자로 변환합니다. 이는 이론적으로 사과인지 바나나인지 등을 판별하는 기계 학습 문제와 같은 분야에서 특히 유용합니다. 이는 이진 분류 문제입니다.

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

그러면 마지막으로 묶어보는 시간이에요! 결과물을 보자구요! 그냥 최종 예측값을 가져와 출력하는 거에요! 그러면 우리의 뉴런을 통해 모험을 끝내게 돼요.

보셨죠? 그렇게 어려운 건 아니죠! 물론 처음에 말한 것으로 돌아가는 것도 중요해요. 이것은 굉장히 간단한 예제에요. 이건 하나의 뉴런 신경망 - '퍼셉트론'이에요. 이건 간단한 분류 문제에 유용하지만, 더 많은 뉴런/노드를 추가할 때 진짜 신경망의 힘이 나타나요.

뉴런은 레이어에 더 많이 추가할 때 더 복잡한 문제에 대한 예측 능력이 더 커져요:

![neural net image](/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_9.png)

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

위의 이미지에서는 훨씬 많은 것이 발생하고 있습니다. 이 신경망에는 여러 개의 레이어가 있습니다. 입력 레이어와 출력 레이어에 추가로 두 개의 숨겨진 레이어가 있으며, 각 레이어에는 여러 개의 뉴런이 내부에 있습니다. 이 모든 것에 더해 더 복잡한 신경망에서 뉴런 간의 연결이 있는데 이를 시냅스라고 하며 '가중치'를 가지고 한 뉴런의 출력이 다른 뉴런의 입력에 미치는 영향을 제어합니다.

그러나 이 모든 것에 대해 자세히 들어가는 것은 매력적이지만 이 글의 범위를 벗어나므로 단일 뉴런 예시에 집중하고 코드로 최고이며 가장 재미있는 부분으로 돌아갑시다!

# 뉴런 만들기

![image](/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_10.png)

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

| 제목 | Korean Translation                      |
| ---- | --------------------------------------- |
| 문제 | 표 태그를 Markdown 형식으로 변경하세요. |

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

그러나 걱정하지 마세요. 저장소를 열어도 아무것도 이해되지 않는다면, 우리는 데이터와 코드를 검토하고 단계별로 문제를 해결할 것입니다. 코드를 더 잘 이해할 수 있도록 뇌세포(neuron), 신경망(neural net), 그리고 교육 루프의 기본을 조금이나마 알아본 후에 말이죠.

우리의 실험에서는 Kaggle에서 가져온 합성 데이터셋을 사용할 것입니다. 이 데이터셋에는 다음이 포함되어 있습니다:

![그림](/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_11.png)

이 데이터의 아이디어는 각 행이 학생의 시험 1과 시험 2의 결과라는 것입니다. 패스(pass) 열은 해당 학생이 3번째 시험에 통과했는지 여부를 나타냅니다. 우리가 신경망을 사용해 예측하고자 하는 것은 바로 이 열입니다. 실제로는 학생이 처음 두 시험에서의 결과를 기반으로 3번째 시험을 통과할지 예측하려고 하는 것이죠.

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

저장소에서 exam_scores.csv라는 파일을 찾을 수 있어요. 이 데이터를 모델을 훈련하고 테스트하는 데 사용할 거예요. 저장소에 있는 유일한 다른 것은 실제 파이썬 노트북뿐이에요. 하나씩 차근차근 살펴보죠!

처음으로, 노트북에 기본으로 설치되어 있지 않은 라이브러리를 설치해야 해요:

```js
# 1) 이미 설치되어 있지 않은 필요한 라이브러리 추가
!pip install keras-visualizerya
```

keras-visualizerya를 사용하면 우리의 신경망의 기본 이미지를 볼 수 있어요. 단일 뉴런이라 그다지 화려하지는 않겠지만, 아예 없는 것보다는 낫죠!

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

다음으로, 데이터 세트와 모델을 설정합니다.

여기서 조금 복잡한 부분이 있습니다. 데이터를 형성하는 데 도움이 되는 몇 가지 라이브러리를 가져왔습니다. Numpy와 Pandas는 데이터를 형성하는 데 도움이 되고, sklearn은 데이터를 분할하는 것과 같은 일반적인 머신러닝 작업에 유용한 유틸리티를 제공합니다. 그리고 tensorflow.keras는 정말 중요한 라이브러리입니다.

원한다면 순수 파이썬을 사용하여 신경망을 만들 수도 있습니다. 그러나 이 문서는 초심자에게 친숙하게 설계되었으므로, 텐서플로위에 위치한 고수준 라이브러리인 케라스를 선택한 것입니다. 케라스는 텐서플로우 위의 머신러닝 라이브러리이며, 이는 파이썬 위에 있는 라이브러리입니다.

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

저희는 데이터를 70% 훈련 및 30% 테스트 데이터로 나누는 70/30 비율을 만들고 있어요. 이것은 일반적인 머신러닝 실천 방법으로, 데이터의 30%를 모델이 얼마나 잘 학습했는지 확인하는 데 사용합니다.

마지막으로 - 그리고 가장 기대되는 부분은 - 모델을 정의하는 것입니다. 여기서 우리는 신경망을 만드는 곳입니다. Sequential 신경망을 만들고 있는데, 이는 이 모델에 추가된 레이어가 서로 직접 쌓여서 입력부터 출력까지 데이터가 선형 경로로 흐를 수 있는 피드포워드 네트워크를 형성한다는 의미입니다. 그리고 우리는 하나의 유닛(뉴런)을 추가하고 있어요.

```js
model = Sequential([
    Dense(units=1, input_shape=(2,), activation='sigmoid')
])
```

입력 모양은 신경망에 데이터가 어떤 모양인지 알려줍니다. 이 경우 input_shape(2,)은 Keras에게 각 데이터 레코드가 2개의 피쳐를 가질 것이라고 알려주는 것입니다. 마지막으로 활성화 함수를 'sigmoid'로 정의하고 있는데, 이는 0과 1 사이의 출력을 제공하기 위한 '압축' 함수입니다.

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

마침내, 모델을 컴파일합니다. 'Adam' (적응 적 모멘트 추정) 옵티마이저를 사용 중이며 다른 여러 옵티마이저도 있습니다. 옵티마이저는 서로 다른 메커니즘을 사용하여 가중치를 업데이트하거나 '손실' 개념을 측정함으로써 학습 프로세스를 돕는 알고리즘 또는 방법입니다. 옵티마이저는 또한 학습 속도를 제어합니다 (우리 예제에서는 0.01로 설정되어 있음).

![이미지](/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_12.png)

학습률은 다른 개념과 깊게 연결되어 있는데, 여기서 많이 다루지는 않았지만 손실 기욘(gradient)입니다. 간단히 말해서, 손실 기욘은 학습 에포크의 끝에 우리가 얼마나 성공적인 예측에 가까이 갔는지를 측정하는 것입니다. 앞에서 알 수 있듯이, 신경망은 다음 반복 전에 가중치를 조정할 수 있습니다.

학습률은 가중치가 손실 그래디언트에 대해 얼마나 큰 변화를 겪을지를 제어합니다. 높은 학습률은 빠르게 학습하고 좋은 '적합(fit)'에 빨리 도달할 수 있는 기회를 제공하지만, 최소 손실을 지나치게 초과하여 학습 프로세스의 불안정이나 기능을 예측하는 합리적 능력에 수렴하지 못하는 상황을 일으킬 수도 있습니다.

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

우리의 '손실 함수'는 'binary_crossentropy'로 설정되어 있어요 (옆에 알림 - 여기서 새로운 용어를 많이 배우고 있죠? 칭찬해도 돼요!). 손실 함수는 주로 우리 모델의 성능을 측정하고, 잘못된 값을 선택하는 것에 대해 처벌하는 역할을 합니다 (이 경우 이진 분류 문제에 대해).

마지막으로 모델 컴파일 문에서 metrics를 '정확도'로 설정했어요. 이것은 훈련 중 정확도 지표를 모니터링하고 싶다는 의미에요. metrics 매개변수 - 그리고 컴파일 문의 거의 모든 것 -에는 다양한 값과 선택지가 있습니다. 이러한 선택 - 학습률, 손실 함수 및 옵티마이저와 같은 것들에 대한 - 이것들이 모델을 '조정'하거나 '하이퍼파라미터' 튜닝한다는 것을 읽을 때 조정되는 몇 가지 중요한 요소입니다. 이러한 매개변수들에서 최선을 내기 위한 지식이 필요하므로, 일단 이런 것들을 조정할 수 있다는 것만 알아두세요. 지금은 기본값이나 '일반적'인 값으로 진행하죠.

보너스로, 노트북의 다음 셀에는 우리의 신경망을 시각적으로 표시하는 멋진 방법이 포함되어 있어요. 불행히도 우리의 단일 뉴런에 대해 매우 매료적인 이미지는 아니에요;

<img src="/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_13.png" />

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

그 의미는, 우리가 원하는 것에 근접한 것 같아요. 2개의 입력 특성과 출력, 시그모이드 활성화 기능을 볼 수 있어요. 완벽하지는 않지만, 더 복잡한 신경망에는 더 잘 보일지도 몰라요.

# 훈련 시간

다음 셀이 활약할 때입니다! 훈련할 시간이에요! 코드를 살펴보면, 1000회 에폭을 실행할 거라는 것을 알 수 있어요. 많아 보일 수도 있지만, 15초 정도 안에 끝날 거예요. 훈련이 끝나면 다음과 같은 내용을 볼 수 있어요:

```js
Test Loss: 0.22098664939403534, Test Accuracy: 0.8833333253860474
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

저희의 훈련 결과입니다! 그리 나쁘지 않죠! 정확도는 0.88 또는 88%이며 손실은 0.22입니다. 좋은 처음 결과이지만, 향상할 여지가 분명히 있어요. 몇 가지 매개변수를 조정/변경하여 더 나은 결과를 얻을 수 있을지도 모르겠어요.

노트북의 마지막 셀은 테스트 데이터셋에서 몇 가지 값을 선택하여 직접 테스트하여 예측을 확인할 수 있는 기회를 제공합니다. 이상적으로는 테스트 세트에서 임의로 값들을 선택하여 학생이 3회 시험을 통과할 것인지(1) 아닌지(0) 예측하는데 높은 확률로 정확한 예측을 얻을 수 있어야 하며, 모델이 예측이 올바른지 얼마나 확신하는지의 신뢰도 점수도 얻을 수 있어야 합니다.

여기 데이터에서 테스트하려는 데이터의 샘플을 numpy 배열로 업데이트해주세요:

```js
# 새 시험 점수를 사용한 예제
new_samples = np.array([
    [74.71, 61.49],  # 예제 점수
    [79.42, 67.92],   # 예제 점수
    [62.75, 97.53]
])
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

여기 있습니다! 여러분은 전체 모험을 무사히 마치고 미쳐 날뛰는 그리스 문자나 방정식에게 습격당하거나 끌려가지 않고 이것을 해내셨습니다.

![Neural Net](/TIL/assets/img/2024-07-09-WhatIsaNeuralNetAnyway_14.png)

잘 했어요! 여러분은 신경망의 역사에 대한 간략한 개요를 보고 오늘날까지 어떻게 이르렀는지 살펴보고, 뉴런을 구성하는 추상적인 내용을 탐험하며, 심지어 자신만의 (간단한) 신경망을 만들고 훈련하고 검토하셨습니다!

여정을 즐기셨기를 바라며, 항상 읽는 것을 즐겼다면 박수를 보내고 댓글을 남기거나 소프트웨어 엔지니어링, 클라우드 및 AI/ML 콘텐츠를 더 보기 위해 팔로우해 주시기 바랍니다.

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

다음에 또 뵙겠습니다!
