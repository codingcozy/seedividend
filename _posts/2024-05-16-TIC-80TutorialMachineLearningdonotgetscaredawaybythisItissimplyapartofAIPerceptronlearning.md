---
title: "TIC-80 튜토리얼 머신 러닝걱정하지 마세요 이것은 AI의 일부일 뿐입니다  퍼셉트론 학습"
description: ""
coverImage: "/assets/img/2024-05-16-TIC-80TutorialMachineLearningdonotgetscaredawaybythisItissimplyapartofAIPerceptronlearning_0.png"
date: 2024-05-16 16:52
ogImage:
  url: /assets/img/2024-05-16-TIC-80TutorialMachineLearningdonotgetscaredawaybythisItissimplyapartofAIPerceptronlearning_0.png
tag: Tech
originalTitle: "TIC-80 Tutorial: Machine Learning (do not get scared away by this: It is simply a part of AI) | Perceptron learning"
link: "https://medium.com/@njihiadavid02/tic-80-machine-learning-perceptron-learning-bb0523cdca3d"
isUpdated: true
---

![공포를 느끼지 마세요. 그냥 AI의 일부입니다.](/assets/img/2024-05-16-TIC-80TutorialMachineLearningdonotgetscaredawaybythisItissimplyapartofAIPerceptronlearning_0.png)

[페이지에 시각적인 풍미를 위해 만든 예쁜 3D 모델]

신경망의 경우, 퍼셉트론 학습은 소개 알고리즘 중 가장 간단한 것 중 하나입니다.

이것은 간단한 이진 분류에 사용됩니다. 이는 물건을 그룹화하는 데 사용될 수 있다는 것을 의미합니다.

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

게임을 개발하면서 여러 아이디어가 떠오를 수 있습니다. 이것은 무작위로 생성된 레벨을 더 멋지게 디자인하거나 플레이어의 입력에 따라 난이도를 조절하거나 더 나은 적을 제공하는 방법일 수 있어요.

---

![나만의 랜덤 애니메이션](https://miro.medium.com/v2/resize:fit:200/1*J6hWD17Q6PPkhnd0E5rkgw.gif)

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

간단히 말해서, 퍼셉트론은 입력을 받아 처리한 후 출력을 내놓습니다.

- 퍼셉트론 학습은 입력을 받는 간단한 신경망입니다.

2. 일정한 가중치가 있습니다 (랜덤으로 생성됩니다. 가중치가 동일하지 않도록 하기 위한 것이며, 학습이 이루어질 수 있도록 항상 모두 마스터할 필요는 없습니다).

3. 그런 다음 가중합을 얻습니다 (이는 단순히 가중치*입력과 가중치*입력의 합을 의미합니다).

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

그리고 마지막으로 출력을 결정하는 활성화 함수를 포함합니다.

다음은 코드입니다:

```js
rnd = math.random
-- 가중치 초기화
local weight1 = rnd(1) - 0.5
local weight2 = rnd(1) - 0.5

-- 활성화 함수 (계단 함수)
function activate(sum)
    if sum > 0 then
        return 1
    else
        return 0
    end
end

-- 메인 루프
function TIC()

cls()
    -- 입력 값 샘플 (이 값을 변경할 수 있음)
    local input1 = 1
    local input2 = 0

    -- 가중합 계산
    local weightedSum = input1 * weight1 + input2 * weight2

    -- 퍼셉트론 활성화
    local output = activate(weightedSum)

    -- 출력 표시
    print("Output: " .. output, 20, 20, 15)
end
```

이 활성화 함수는 신경망 세계에서 꽤 한정적인 단계 활성화 활성화 함수이지만, 창의적으로 사용하면 멋진 것들을 만들 수 있다고 생각합니다.
