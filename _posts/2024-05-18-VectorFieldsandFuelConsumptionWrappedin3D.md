---
title: "3D로 감싼 벡터 필드와 연료 소비"
description: ""
coverImage: "/assets/img/2024-05-18-VectorFieldsandFuelConsumptionWrappedin3D_0.png"
date: 2024-05-18 21:52
ogImage:
  url: /assets/img/2024-05-18-VectorFieldsandFuelConsumptionWrappedin3D_0.png
tag: Tech
originalTitle: "Vector Fields and Fuel Consumption Wrapped in 3D"
link: "https://medium.com/better-programming/vector-fields-and-fuel-consumption-wrapped-in-3d-475a8a9fd57c"
isUpdated: true
---

![image](/assets/img/2024-05-18-VectorFieldsandFuelConsumptionWrappedin3D_0.png)

푸아송 방정식, 벡터 필드 및 특수 신경망 사이의 연결을 탐구하면서, 사용자 정의 벡터 필드 시각화를 만들기로 결정했습니다. 미적분의 몇 가지 경험적인 응용을 소개하고 싶습니다. 보트, 비행기 또는 차량을 보유하고 계신다면, 이 글을 마치면 돈을 아끼기 위해 어느 경로를 선택하고 언제 출발해야 하는지를 결정할 수 있을 겁니다. 대개의 여정에서 강한 해풍보다 강한 꼬리풍이 더 좋습니다.

본 글의 목표는 공간을 통과하는 가장 일치하는 경로를 찾는 것입니다. 이를 달성하기 위해 일반적인 작업과 비용 함수 같은 기본적인 개념을 사용할 것입니다. 최적 제어의 의미에서 최적 경로를 찾는 것이 목표가 아니므로 글의 끝에 우리는 정확한 비행 또는 항해 당 소비량을 알지 못할 것입니다. 그러나 “주어진 벡터 필드에 대해, 이 경로는 최소한의 저항을 줄 것”이라고 말할 수 있을 것입니다. 하지만 나중에 특히 신경망과 결합하여 최적 제어 개념을 다시 살펴볼 수도 있을 것입니다. 이러한 분야는 매우 관련이 깊습니다.

본 글에서 제시된 솔루션은 WebGL2와 TypeScript의 조합입니다. WebGL 개념은 제가 직접 구현했지만, 일부 계산 부분은 직접 구현하기 번거로울 수 있습니다. 즉, 방정식의 상징적 조작이나 노이즈 생성과 같은 부분은 제작자의 이해로 하여금 코드를 이해하는 데 아무런 영향을 끼치지 않아야 합니다.

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

# 소리를 내보세요

보통 날씨 예보나 현재 바람 상황은 바람 깃발을 통해 설명됩니다. 이 바람 깃발은 특정 위치(경도, 위도, 고도)에서의 바람의 방향과 속도를 기본적으로 제공합니다. 이러한 데이터 포인트들은 벡터 필드를 형성합니다(공간의 각 점에서의 관련 스칼라 값과 방향). 하지만 스칼라 필드 같은 다른 종류의 필드들도 있습니다. 즉, 공간의 각 점에서의 온도와 같은 것입니다. 제 집 프로젝트에서는 벡터 필드 데이터가 저가 해결하고 있는 문제들에 해당하지만 연료 소비에 대한 경우와 이 게시물에서는 소음을 생성기로 사용할 것입니다.

벡터 필드를 생성하기 위해 Simplex 소음을 사용할 것입니다. Simplex 소음의 중요한 성능 특성 중 하나는 생성된 소음의 차원과 매우 잘 조화를 이룬다는 것입니다. 다른 것들과 대조적으로, 예를 들어 퍼린 소음과 같은 것들과는 다르게요. 우리의 벡터 필드는 시간에 따라 변할 것이므로, 4차원 소음을 생성해야 하며 매 프레임은 사실상 그 4차원 공간에서의 3차원 슬라이스가 될 것입니다. Simplex 소음이 더 나은 성능을보일 수 있는 이유에 대해 상세히 다루는 공간이 없기 때문에 그것에 대한 자세한 내용을 다루지 않겠습니다. 그건 또 다른 전체 블로그 글이 될 것이지만 웹에서 많은 정보를 찾을 수 있습니다.

우리의 사용 사례에 대해, 저는 이 소스에서 Simplex 구현을 사용했습니다. 이 결정의 뒤에 있는 이유는 쉐이더에서 직접 계산을 사용할 수 있는 가능성과 코드가 상당히 읽기 쉽기 때문입니다. 우리의 소음 기능인 N(x, y, z, t)는 `0, 1.0` 사이의 값입니다. 내부적으로 벡터 당 세 개의 랜덤 값이 필요합니다:

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

- XY 평면 각도
- XZ 평면 내 각도
- 벡터 크기

각 쌍은 z 매개변수에 대한 다른 상수 오프셋 샘플링을 통해 얻어집니다. 오프셋은 값이 교차하지 않도록 선택되므로 XY 각도는 N(x, y, z, t), XZ 각도는 N(x, y, z + 오프셋, t)이고 벡터 크기는 N(x, y, z + 2\*오프셋, t)입니다. 중요 참고 사항은 서로 다른 노이즈 구현은 서로 다른 함수 범위를 가질 수 있으므로 항상 `0`, `1.0` 사이의 값을 얻을 수 없을 수도 있습니다.

아래 벡터 필드의 시각화를 확인할 수 있습니다. 벡터 외에도 텍스처로 렌더링된 노이즈를 볼 수 있습니다 - 회색으로 분리되거나 RGB로 세 개의 채널로 결합됩니다.

공간은 Z 축을 따라 n 개의 평면으로 분할되며, 각 평면은 그럼으로써 렌더링됩니다. 일반적으로 전체 노이즈 필드를 렌더링할 필요는 없지만, 시각화 목적으로 그렇게 합니다. 아래에서 보듯이, 하단 레이어는 노이즈 필드가 실제로 어떻게 보이는지 보여줍니다; 시간에 따라 변하는 회색 이미지입니다. 그런 다음 오프스크린 텍스처를 가져와서 우리의 벡터를 그릴 수 있습니다 (현재 각 평면당 400개의 벡터). 벡터의 각도와 크기는 쉐이더에서 텍셀을 추출하여 텍스처로부터 얻어집니다. 사용자 인터페이스에서 동적으로 더 많은 레이어를 추가할 수 있습니다.

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

# 플로우, 느껴보세요!

벡터는 현재 벡터 필드 상태를 시각화하는 데 좋지만 때로는 전체 시스템의 시간 간격 기반 동작을 얻기 위해 플로우 필드 시각화를 하는 것이 더 나을 수도 있어요. 그리고 그것이 바로 우리의 세 번째 시각화 도구이기도 해요. WebGL은 약간 제한적인 프레임워크이기 때문에 (컴퓨팅 또는 지오메트리 쉐이더의 사용은 야생 서부와 같다), 우리는 플로우 필드를 텍스처에 렌더링할 거에요. 간단화된 파이프라인은 다음과 같아요:

- 시간 T에서 공간 내에서 N개의 랜덤한 점을 생성하고 위치를 버퍼 B1과 B2에 저장하기
- B1의 점들을 텍스처에 그리기
- 텍스처 렌더링 후 텍스처의 알파 값을 낮추어 시간에 따라 입자의 꼬리를 얻기
- 현재 벡터 필드(우리의 Noise 함수)를 기반으로 시간 T+Epsilon에서 점들의 위치 계산하고 결과를 B2에 저장하기, 기본적으로 B2 = Noise('B1')
- 버퍼 B1과 B2 교체하기
- 두 번째 단계로 이동하기

그러나 이 단계에서는 우리가 노이즈를 렌더링할 때와 같이 오프스크린 텍스처를 사용하지는 않을 거에요. 우리는 데이터셋(점으로 표현된 입자) 위에서 계산하는 것에만 관심이 있기 때문에 WebGL의 Transform Feedback 기능을 사용할 거예요. 이 접근 방식은 GPGPU에 대한 텍스처 핑퐁보다 약간 더 나아요. 우리는 데이터와 직접 작업할 수 있어 샘플링 모호성을 방지할 수 있어요. 텍스처나 텍셀 페치의 샘플링이 어떻게 깨졌다는 것은 전혀 말하고 싶지 않아, 하지만 얻은 데이터의 정확성과 특정 방식으로 보간되지 않을 것임을 내 인생을 건다고 말할 수는 없겠어요. 하지만 아마도 저는 너무 의심이 많을지도 모르겠어요. :] 빨간색은 더 빠른 입자를 나타냅니다.

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

말씀드린 대로, 저희 Noise 함수는 셰이더에서 구현되어 있어서 Transform feedback과 함께 Noise를 사용하는 것은 간단합니다. 저는 성능을 깊게 테스트하지는 않았지만, 우리는 입자들을 두 번만 접촉하고 새로운 위치를 계산하고 드로우 콜을 하기 때문에 규모 확장 관점에서 꽤 좋을 것입니다. 이 특정 경우에는 플로우 시각화가 그다지 흥미로운 것은 아니지만, 이것을 2D 평면상의 투사 표면 기울기 필드의 시각화로 사용하고 있으며 3D 공간을 탐색하는 것보다 더 유용합니다.

## 비행기는 어디죠, 류보스키?

그래서 저희는 벡터 필드를 갖고 있고, 몇 가지 시각화 기술 집합도 있습니다. 필요한 것은 실제 비행기와 비행 경로뿐입니다. 일반적으로, 어떤 경로를 선택하든 여행 비용을 계산할 수 있어야 하지만, 실제 생활과 적어도 어느 정도 유사한 케이스를 만들기 위해 실제 비행과 비슷한 경로를 선택해야 합니다.

저는 Bump 함수부터 시작하기로 결정했습니다. 이 함수는 대칭적이며, 도메인 크기에 비해 오랜 플랫폼을 갖고 있을 수 있으며, 공격적인 이륙 또는 착륙을 나타낼 수 있습니다.

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

웹지엘에서 경로 시각화는, 잘, 이상적이지 않아요. 우리는 공간에서 경로 표현에 많은 시간을 쏟을 수 있지만, 저는 더 중요한 일이 있어서 악마와 협상을 통해 LINE_STRIP를 통한 표현으로 만족해야 합니다. 어떤 함수든 주어졌을 때, 프로그램은 N개의 점에서 함수를 샘플링하고 벡터 필드를 통해 스트립을 만듭니다. 보면서 알 수 있듯이, 어떤 샘플 점에서든 해당 시간에 벡터 값도 시각화됩니다.

<img src="/assets/img/2024-05-18-VectorFieldsandFuelConsumptionWrappedin3D_1.png" />

## 비행 비용

나중에 더 복잡한 내용을 다룰 예정이지만, 먼저 입자가 일정 경로를 따라 벡터 필드를 통해 이동할 때 수행되는 작업의 기본적인 정의를 사용할 것입니다. 그래서 우리 경우에 비행기가 단순히 입자로 가정합시다. 직관적으로, 이 적분은 현재 시간에 따른 벡터 필드와 얼마나 잘 맞는지를 말합니다. 즉, 양수가 나오면 풍향이 더 세다는 것을 의미하고, 음수가 나오면 역풍이 더 강했다는 것을 의미합니다.

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

![Vector Fields and Fuel Consumption Wrapped in 3D](/assets/img/2024-05-18-VectorFieldsandFuelConsumptionWrappedin3D_2.png)

r는 우리 경로를 통해 매개변수화된 함수이며, F는 노이즈 함수에 의해 정의된 우리의 벡터 필드이며, 경로에서 계산된 것이며 시간 t에 대해 적분하고 싶습니다. 또한 적분하기 전에는 매개변수화된 함수의 도함수와 점곱을 해야 합니다. 이 모든 것은 전부 좋고 훌륭한데, 식을 적분하기 시작하기 전까지만요. 이를 해결하는 데 여러 문제가 있습니다. 하지만 그 문제에 들어가기 전에, 우리의 노이즈 함수를 살펴봅시다.

## Akima? 네!

심플렉스 노이즈의 정의는 기본적으로 우리의 섀이더에 작성되어 있으므로, 이를 적분의 입력으로 사용해도 괜찮다고 생각할 수 있습니다. 결국, 노이즈 계산을 단순화할 때 논리적으로 증명하기 위해서, 이는 적분하기 쉽게 다루기 쉬운 다항식들에 대한 멋진 작업들뿐인 것이기 때문입니다.

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

문제는 벡터 계수를 얻으려면 사인 및 코사인 함수를 적용해야 한다는 것입니다. 그리고 이러한 함수를 적분하면, 일반화된 프레넬 적분 영역에 들어가게 됩니다. 이러한 적분을 해결하고 나열할 수는 있지만, 많은 작업이 필요합니다. 그리고 궁금증은 Matlab이나 Scipy와 같은 백엔드를 사용하지 않고도 비슷한 프로젝트에서 복소해석을 다루고 싶은지에 대한 문제입니다.

그러나 다른 방법으로 이 문제를 해결하는 또 다른 주장이 있습니다. 종종 수천 개의 센서에서 얻은 데이터때문에 벡터 필드의 정의를 알 수 없는 경우가 많습니다. 그리고 예, 동적 시스템을 어떻게든 모델링하거나, 뉴럴 네트워크를 학습시키거나 오버피팅하여 꽤 좋은 상미분 방정식 또는 편미분 방정식을 얻을 수는 있지만, 그것은 쉬운 작업이 아닙니다.

대신, 우리는 다음과 같이 할 것입니다. 경로 r을 따라 노이즈 함수를 N개의 점에서 샘플링하여 무작위 삼중 세트 (XY 각도, XZ 각도, 벡터 크기)를 얻습니다. 그런 다음, 우리는 벡터의 성분을 얻기 위해 사인/코사인 변환을 적용할 것입니다. 마지막으로, 우리는 그 데이터 점에 Akima 스플라인 보간을 적용하여 세 개의 연속적인 조각 이차 다항 함수를 얻을 것입니다 (총 N-1 다항 함수가 각 성분당).

Akima 스플라인은 계산이 매우 빠르고 특히 연속 도함수의 n차 순도 같은 강력한 요구사항이 없는 경우 특히 유용한 유형의 스플라인이기 때문에 흥미로운 유형의 스플라인입니다. 우리의 경우, 우리는 처음 도함수만 필요합니다. 이것은 잘 동작하며 평균 오차가 작으며 종종 그러한 다항 함수들이 선형이거나 일정할 수도 있습니다.

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

이는 단일 적분이 N-1개의 적분으로 분할되어 함께 요약해야 한다는 것을 의미합니다. 이론적으로 각 근사치에 스텝 함수 또는 헤비사이드 함수의 해석적 근사치를 곱해서, 스플라인이 해당 도메인에서만 "활성화"되도록 할 수 있습니다. 그러나 이는 최종 적분을 더욱 복잡하게 만들 수 있습니다.

# 버프 함수가 손을 놓고 있지 않습니다

지금까지는 벡터 필드가 다항식으로 근사되어 왔고 이제는 매개변수화된 경로 함수 r의 미분을 어떻게 처리할지 신경 써야 합니다. 우리의 내적 부분을 살펴봅시다:

![image](/assets/img/2024-05-18-VectorFieldsandFuelConsumptionWrappedin3D_3.png)

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

Akima의 보간 (다항식)이 있는 벡터 필드에 따른 경로의 pol, 그리고 g(t)는 t에 관한 매개변수화된 경로의 z 성분입니다. 아래에서 g(t) 함수의 두 예시를 볼 수 있습니다. 하나는 상수 0이고, 다른 하나는 sin(t)입니다. 이제 우리는 벡터 필드를 통해 의미 있는 경로를 구성할 수 있습니다.

범프 함수의 유도는 나쁘지 않지만, 우리는 이것이 다항식들과의 내적에서 곱해질 것이며, 그것이 우리의 다음 문제라는 것을 깨닫게 되어야 합니다. 그러한 적분은 수치적으로만 해결할 수 있고, 그것은 우리가 꼭 하고 싶어하는 것은 아닙니다.

그래서, 우리는 매개변수화된 경로 함수의 유도를 Akima 스플라인을 통해 보간할 것입니다. 이제 내적은 최대 6차수의 다항식을 생성하고, 다항식의 적분은 괜찮고 잘 되며, 결국 언어로도 따지지 않고 잘 될 것입니다.

라이브 데모나 소스 코드를 함께 살펴보거나 플레이하려고 계획하시는 경우, FlightHelper 클래스에 임의의 경로를 추가할 수 있습니다. 사용하고 싶은 기호적 표현을 사용할 수 있지만, Nerdamer와 호환되어야 합니다. 이전 그림에서 본 함수들에 대한 정의는 다음과 같습니다:

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

```js
static init() {
  this.flightPaths = new Array<FlightPath>()
  this.flightPaths.push(
    new FlightPath("sin(3x)", "e^(-1/(1-x^2))")
  )

  for (let i = 0; i < 5; i++) {
    let offset = "" + (1 + 0.1 * i) + "*"
    this.flightPaths.push(
      new FlightPath("0", offset + "e^(-1/(1-x^2))")
    )
  }
}
```

# 결과가 나타납니다!

정수 안정성과 계산된 작업이 정확하게 될지에 대해 약간 불안했던 점을 인정해야 했습니다. 특히 여러 Akima 보간법을 사용하는 경우입니다. 그 결과는 생각보다 나아졌습니다. 아래 비디오에서 확인할 수 있습니다.

벡터 필드가 우리의 경로와 일치하는 경우, 작업 결과는 2가 되며 정확히 도메인 크기가 2이기 때문에 합리적입니다. 벡터 필드가 우리에게 반대로 작용할 때 작업 결과는 -2이고 수직일 때는 작업이 0입니다. 다음 비디오에서는 벡터 필드가 잡음에 의해 무작위로 개선되었을 때의 계산을 볼 수 있습니다. 완료되면 최적의 경로는 검은색으로 표시되며 각 경로의 비용은 왼쪽 상단에 표시됩니다.

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

# 하지만 비행기는 단순히 한 점이 아닙니다

지금까지 우리는 벡터 필드가 우리의 경로와 얼마나 일치하는지 계산할 수 있었습니다. 우리의 계산은 정확한 모델은 아니지만, 이제 어느 경로가 에너지적인 관점에서 어떻게 더 나은지 또는 나쁜지를 말할 수 있습니다. 우리가 프라하에서 도쿄로 사선비행기로 날아갈 때 언제 출발할지 선택한다면, 날씨 예측을 기반으로 작업 계수를 계산하여 가장 일치하는 예측을 선택했기 때문에 연료를 절약할 수 있습니다. 그러나 다른 교통 수단으로도 그렇게 할 수 있습니다. 예를 들어 보트를 소유하고 있다면, 바람 날씨 예측 데이터 대신에 파도 속도를 바람 예측과 결합하여 사용할 수 있으며, 작업은 동일하지만 차원이 적어집니다.

연료 소비의 정확한 모델보다는 계산을 개선할 수 있는 한 가지 방법이 있습니다. 작업 적분 뿐만 아니라, 우리의 적분에 다른 함수를 추가해 보겠습니다. 이를 '비용'이라고 부르겠습니다:

<img src="/assets/img/2024-05-18-벡터필드와연료소비의3D포장.png" />

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

이 함수는 다음과 같은 전체 동적 특성을 나타낼 수 있어요:

- 45도에서의 역풍은 45도에서의 유동풍과는 다른 영향을 줄 수 있어요.
- 이륙 단계에서는, 벡터 필드에서의 어떤 역풍이 최종 작업 적분에 더 큰 영향을 줄 거에요.
- 비행 시간이 길수록, 연료를 소모하기 때문에 바람이 더 큰 영향을 줄 거에요.
- 비행기의 공기역학 프로필을 전파할 수도 있어요. 즉, 각도별로 다른 계수를 사용할 수 있어요.
- 지금까지 비행기의 추진력을 고려하지 않았는데, 이 또한 벡터 필드의 영향에 대해 동적 시스템일 수 있어요.

비용 함수는 매우 복잡할 수 있으며, 물리적인 비행기나 상세한 모델이 없으면 예측하기 어려울 수 있어요. 그러나 서로 다른 아이디어로 실험해 볼 수 있으며, 포아송 방정식과 관련해 이 개념을 해결하는 동안 다양한 경우에 대해 실험해 볼 수 있어요. 또한 비용 함수의 적용은 다른 경우에 따라 다르며, 곱셈뿐만 아니라 비용이 작업자 역할을 할 수도 있어요.

# 길을 보여주세요, 나의 주여

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

지금은 목적지로 비행할 때 언제 출발할지 선택할 수 있는 위치에 있습니다. 경로도 선택할 수 있습니다 — 보통 이는 사실이 아니며, 항공 공간은 무질서가 아닙니다. 수학적 관점에서 우리는 작업 적분의 전역 최솟값을 찾고, 해당 최솟값 후보를 얻기 위해 도함수가 영과 같은 도함수를 찾을 수 있습니다:

![image](/assets/img/2024-05-18-VectorFieldsandFuelConsumptionWrappedin3D_5.png)

이 문제를 해결하는 것은 쉽지 않을 수 있습니다. 특히 비용 함수가 복잡해질 때입니다 — 이것은 개념/아이디어로만 간주하십시오. 실제로 이러한 문제는 다르게 해결됩니다. 그러나 실제 세계에서 효과적으로 작동할 수 있는 다른 옵션들이 있습니다. 지금까지 이러한 옵션은 프로젝트에 아직 구현되지 않았습니다. 왜냐하면 저는 그것들이 필요하지 않았기 때문이지만, 나중에 추가할 수도 있습니다.

하나의 해결책은 세상을 3D 그리드로 분할하고 그래프상에서 최적의 경로를 찾는 것입니다. 그리드가 정칙적이므로 경로에 스플라인 보간을 적용할 수도 있습니다. 게다가 규칙 세트도 갖고 있을 수 있습니다:

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

- 경로 시작점으로부터 현재 위치까지의 유클리드 거리는 항상 증가해야 하며, 동시에 현재 위치로부터 경로 끝까지의 유클리드 거리는 항상 감소해야 합니다.
- 격자 위의 어떤 점도 반드시 어떤 봉투 안에 있어야 합니다.

또 다른 해결책은 "몬테 칼로"와 비슷한 접근 방식일 수 있습니다. n개의 경로를 생성하고, 각각의 작업을 계산한 다음 어떤 최상의 하위 집합을 선택하고, 각 하위 집합에 대해 비슷한 경로 집합을 생성합니다. 반복 횟수는 사용자에 달려 있으며, 얼마나 정확한 결과가 필요한지에 따라 다릅니다. 벡터 필드가 연속적일 것이고 해당 필드의 어떤 측정도 마찬가지로 연속적일 것이므로, 우리 비행용으로는 꽤 좋은 후보를 선정할 수 있어야 합니다. 마지막 문장은 매우 가정적이지만, 바람이나 어떤 자연 현상에 관한 이야기라면, 같은 지역 내에서 비용이 많이 드는 경로들이 많은 지역이 아니라 특별한 계곡이 있는 것이 상식적으로 보이지 않습니다.

<img src="/assets/img/2024-05-18-VectorFieldsandFuelConsumptionWrappedin3D_6.png" />

# 미래 계획

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

초반에는 포아송 방정식에 관한 글을 작성하려 했지만 결국 시각화 작업이 예상보다 더 오랜 시간이 걸렸고 중간에 더 많은 기능을 추가하기도 했어요. 그래도 어쨌든 결과적으로 이런 식으로 끝나서 기뻐요. 이런 작은 작업조차 흥미로운 부분이 많거든요. GitHub에서 실시간 데모와 소스 코드를 확인할 수 있어요. 해당 프로젝트 관련 모든 것은 webgl2 폴더에 있어요. 아직 몇 가지 부분을 더 최적화하고 싶어해요 (노이즈 계산/경로 비용 속도 향상, 더 나은 궤도 카메라, 드로우 호출 감소 (인스턴스 어레이, 중복된 유니폼 제거) 등). 현재로서는 데스크탑/노트북에서의 사용이 선호돼요.

다음 블로그 글에서는 신경망과 포아송 방정식에 관한 몇 가지 아이디어를 소개하고 WebGL에서 WebGPU로 전환하고 싶어해요. 이번에는 데스크탑 애플리케이션으로 개발할 거라 C++ 또는 Rust를 사용할 거에요. 그 중에서 Rust가 더 재미있어 보이네요. 시간 내 주셔서 감사합니다. 자유롭게 의겢거나 댓글을 남겨주세요. 그리고 제 LaTeX 기술이 녹슨 것 같아서 LaTeX OG들에게 일으킨 피해에 대해 정말 죄송해요.
