---
title: "css 애니메이션을 위한 베지에 곡선(Bezier Curves) 이해하기"
description: ""
coverImage: "/assets/img/2024-05-17-UnderstandingBzierCurves_0.png"
date: 2024-05-17 21:20
ogImage:
  url: /assets/img/2024-05-17-UnderstandingBzierCurves_0.png
tag: Tech
originalTitle: "Understanding Bézier Curves"
link: "https://medium.com/@mmrndev/understanding-b%C3%A9zier-curves-f6eaa0fa6c7d"
isUpdated: true
---

![Understanding Bézier Curves](/assets/img/2024-05-17-UnderstandingBzierCurves_0.png)

베지에 곡선은 어디에나 있어요. 당신의 CSS 애니메이션 타이밍 함수부터 그래픽 편집기, 타이포그래피, 자동차 디자인 등등 많은 곳에서 사용돼요. 부드러운 곡선을 모델링하려면, 아마도 베지에 곡선을 사용하게 될 거에요.

저에게는 이러한 곡선들이 개발자로서 일상생활에 수학적 영향을 직접 보여주는 완벽한 예이에요. 우리가 추상화의 산천 아래에 무엇이 있는지 정확하게 이해하길 바라는 것은 아니더라도, (저는 확실히 하고 싶지 않지만) 약간의 관심을 가지고 깊게 이해하면 가치가 있다고 생각해요.

이 글의 목표는 바로 이에요. 이후에 베지에 곡선이 정확히 무엇인지, 왜 사용하는지, 어떻게 동작하는지에 대한 수학적이고 직관적인 이해를 가지게 될 거에요.

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

# 베지에 곡선이란?

베지에 곡선은 매개변수 곡선으로 (매개변수 t가 0부터 1까지 변하는) 제어점 세트에 의해 정의된 곡선입니다. 이러한 점들 간의 위치는 곡선의 모양을 정의합니다.

![베지에 곡선](/assets/img/2024-05-17-UnderstandingBzierCurves_1.png)

만약 Adobe Illustrator나 Figma와 같은 그래픽 편집 소프트웨어를 사용해본 적이 있다면, 이미 이러한 제어점들이 어떻게 작용하는지 보았을 겁니다. 아래 gif에서 각 점이 움직일 때 곡선의 모양이 그에 따라 어떻게 변하는지 주목해보세요.

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

![image](https://miro.medium.com/v2/resize:fit:1400/1*j6VPAteSfVSRWswKIeQtPw.gif)

You can also use as many control points as you like. The more control points you add, the greater the control you have over the final shape of your curve. As an example, the cubic-bezier function in CSS uses a bézier curve with 4 points (hence cubic) that describe the evolution of your animation.

## What’s going on?

That’s great and all, but how do we get a curve from just positioning a bunch of points around?

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

그 답은 베지에 곡선의 수학적 기초인 버네스타인 다항식에 있습니다. n차 버넨스타인 다항식은 각각 버넨스타인 계수에 의해 곱해진 버넨스타인 기저 다항식의 합으로 정의됩니다.

![그림 1](/assets/img/2024-05-17-UnderstandingBzierCurves_2.png)

![그림 2](/assets/img/2024-05-17-UnderstandingBzierCurves_3.png)

이러한 공식들에 집착하지 마세요. 필요한 것은 이 중에서 몇 가지 주요한 점뿐이에요.

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

먼저, 그들의 목적이 무엇인가요? 얼마나 간략하게 말씀드릴까요? Bernstein 다항식은 처음에는 닫힌 구간 내의 임의의 연속 함수를 근사화하는 방법으로 사용되었습니다 (자세한 내용은 Stone-Weierstrass 정리를 참조하세요). 다시 말해, 이러한 다항식을 사용함으로써 우리는 원하는 거의 모든 함수(어떤 곡선도 모델링 가능)를 근사화할 수 있습니다. 이는 다항식이 일반적으로 다른 유형의 함수보다 훨씬 간단하게 계산하고 조작할 수 있기 때문에 정말 유용합니다.

![이미지](https://miro.medium.com/v2/resize:fit:440/1*hoKuMOP-U-V2RSLGzwvatg.gif)

둘째, 이 근사화는 정확히 어떻게 일어날까요? Bernstein 계수를 기억하시나요? 그것이 그들의 역할입니다! 수식에서 기저 다항식이 항상 같은 것을 주목하세요 (차수 n에 따라만 달라집니다) - 계수가 실제로 대상 함수를 근사하는 역할을 합니다. 함수 f를 근사하는 정확한 공식은 다음과 같습니다:

![이미지](/assets/img/2024-05-17-UnderstandingBzierCurves_4.png)

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

베지에 곡선이 정확히 무엇인가요? 베르슈타인 다항식이며, 여기서 베르슈타인 계수는 제어점이 됩니다! 따라서 베지에 곡선을 구축할 때 우리는 사실적인 함수를 근사하는 것이죠! 이것은 베르슈타인 다항식의 직접적인 응용입니다.

이것이 바로 베지에 곡선의 명시적/수학적 정의라고 알려진 것입니다. 이제 살펴볼 또 다른 방법으로는 베지에 곡선을 볼 때 더 강력하고 직관적인 방식이 있습니다.

# 다른 접근 방법

베지에 곡선에는 각각의 차수(제어점 수)에 따라 구분되는 몇 가지 유명한 형식이 있습니다. 선형, 이차 및 삼차 베지에 곡선이 그 중 몇 가지입니다. 이 주제를 공부할 때, 베르슈타인 다항식에 기반한 공식을 적용하여 얻을 수 있는 이들의 공식을 아마도 만날 것입니다.

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

![UnderstandingBézierCurves_5](/assets/img/2024-05-17-UnderstandingBzierCurves_5.png)

다시 말하지만, 이러한 공식에 집착하지 마세요. 이 중요한 점 하나만 기억하면 됩니다.

선형 베지어 곡선의 수식에 주목하세요. (1-t)와 t가 어떤 것의 곱으로 나타나는 것을 주의깊게 살펴보세요. 맥락 없이는 그저 기본적인 선형 함수일뿐입니다. 그러나 이차 공식에서 약간 이동하면 어떻게 되는지 살펴보세요:

![UnderstandingBézierCurves_6](/assets/img/2024-05-17-UnderstandingBzierCurves_6.png)

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

패턴 (1-t) 및 t가 반복됩니다. 우리는 이차 곡선 P0P1P2를 (1-t) _ (베지에(P0P1)) + t _ (베지에(P1P2))로 표현하고 있습니다. (다양한 종류의 베지에 곡선이 있는 이전 이미지로 돌아가서 제어점을 연결하는 선에 주목해주세요). 실제로 이를 높은 차수의 곡선에 대해 테스트해보면 그것이 성립함을 볼 수 있습니다. 여기서 새로운 재귀적인 방법으로 베지에 곡선을 정의할 수 있습니다:

![image](/assets/img/2024-05-17-UnderstandingBzierCurves_7.png)

또한 수학적 정의 (버너스타인 다항식)에서 비롯된 원래 방식과 다른 베지에 곡선의 점을 평가하는 새로운 방법을 얻을 수 있습니다.

우리가 이차 베지에 곡선에서 t=0.5 지점을 계산하려고한다고 상상해보세요. 방금 본 바와 같이, 우리는 이 곡선을 P0, P1 및 P1, P2가 되는 두 개의 선형 베지에 곡선으로 표현할 수 있습니다. 새로운 재귀 공식에 0.5를 대입함으로써, 우리는 P0P1 선상의 t=0.5를 계산하고, 다음으로 P1P2 선상의 t=0.5를 계산합니다. 이로서 우리는 두 개의 새로운 점을 얻게 되는데, 이 두 중간점을 다시 다른 선으로 연결하고 (더 작은 차수의 곡선을 곱하는 (1-t) 및 t를 기억하세요) t=0.5의 최종 위치를 계산할 수 있게 됩니다.

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

현재 상황을 시각화해 드릴게요:

![Visualization 1](https://miro.medium.com/v2/resize:fit:480/1*MTvJLHEDRpAcAFY25iQeww.gif)

각 평가된 지점 t마다, 먼저 작은 차수 곡선들 각각에서 이를 계산한 후 이들을 연결하여 결과 선상에서 원하는 지점을 계산합니다. 이러한 패턴은 더 높은 곡선들에서도 반복됩니다:

![Visualization 2](https://miro.medium.com/v2/resize:fit:480/1*NUV8KWFfKmevb_Z_L2A1hQ.gif)

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

![image](https://miro.medium.com/v2/resize:fit:480/1*jFpYqpzDRr0F6HppPpr9kA.gif)

이것을 이해하는 것은 중요합니다. 왜냐하면 Bézier 곡선을 공부할 때 항상 나오는 특별한 주제인 De Casteljau 알고리즘의 설명이기 때문입니다.

## De Casteljau의 알고리즘

이 알고리즘은 곡선의 각 점을 평가하기 위해 이 재귀적 정의를 사용합니다. 이는 계산을 단계별로 나누며, 첫 번째 단계에는 개별 제어점이 있고, 최종 단계에는 원하는 점이 있으며, 중간 단계에는 재귀적 정의를 통해 계산하는 모든 중간 점들이 있습니다. 어떻게 3차 곡선에서 작동하는지 살펴봅시다:

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

![UnderstandingBzierCurves_8](/assets/img/2024-05-17-UnderstandingBzierCurves_8.png)

따라서, 레벨 0의 각 포인트가 제어 포인트 자체임을 감안할 때, 레벨 j의 임의의 점 Pi에 대해, De Casteljau 알고리즘은 해당 값이 다음과 같을 것을 알려줍니다:

![UnderstandingBzierCurves_9](/assets/img/2024-05-17-UnderstandingBzierCurves_9.png)

언제나, 이것이 베지에 곡선에서 재귀 패턴을 사용하고 있다는 점을 기억해 주세요. 이는 버너스타인 다항식에서 유도되었습니다.

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

# 왜 베지에 곡선인가요?

우리가 베지에 곡선에 대해 이야기한 모든 것을 고려할 때, 그것들이 왜 중요한 것인지 궁금하십니까? 왜 우리는 그것들을 이렇게 많이 사용하는 걸까요?

기본적으로 이들은 무한대로 확장 가능한 곡선을 작성하는 방법입니다. 우리는 원하는 대로 세부적으로 만들 수 있기 때문에, 수퍼 고차 커브를 만들지 않고 작은 차수의 커브를 이어붙이기만 하면 거의 모든 원하는 커브를 얻을 수 있습니다.

타이포그래피의 대표적인 예를 들어보겠습니다. 베지에 곡선은 우리에게 간단한 고정폭 서체에서부터 아름다운 표시 서체까지 다양한 서체를 만들 수 있게 해줍니다!

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

<img src="/assets/img/2024-05-17-UnderstandingBzierCurves_10.png" />

# 마무리

이 글에서 배운 모든 것을 요약해보면:

- Bézier 곡선은 제어점 집합에 의해 정의된 매개변수 곡선입니다.
- 그들의 수학적 기원은 Bernstein 다항식에서 왔는데, 이것은 실제 함수를 근사하는 방법입니다.
- Bézier 곡선은 제어 점이 Bernstein 계수 자리를 차지하는 Bernstein 다항식입니다.
- Bézier 곡선은 재귀적이며, Pn 점으로 된 각 Bézier는 Bézier 곡선 P0Pn-1 및 P1Pn의 선형 보간(선)으로 나타낼 수 있습니다.
- De Casteljau 알고리즘은 임의의 Bézier 곡선의 점을 계산하기 위해 이 재귀 관계를 사용합니다.
- Bézier 곡선은 무한대로 확장이 가능하며, 원하는 거의 모든 곡선을 만들 수 있게 해줍니다.
