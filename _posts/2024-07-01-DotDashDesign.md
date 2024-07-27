---
title: "도트와 대시 디자인 2024년 최신 디자인 트렌드와 활용 방법"
description: ""
coverImage: "/assets/img/2024-07-01-DotDashDesign_0.png"
date: 2024-07-01 20:03
ogImage: 
  url: /assets/img/2024-07-01-DotDashDesign_0.png
tag: Tech
originalTitle: "Dot. Dash. Design"
link: "https://medium.com/proandroiddev/dot-dash-design-c30928484f79"
---


## PathEffect로 Jetpack Compose에서 선을 특화하세요

![이미지](/assets/img/2024-07-01-DotDashDesign_0.png)

Jetpack Compose에서 UI를 생성할 때 선을 그리는 경우가 많습니다. 때로는 일부 공간을 구분하는 구분선으로, 때로는 더 복잡한 모양이나 디자인의 일부로 시각적으로 사용됩니다. 보통은 단순한 직선일 필요가 없을 때도 있습니다. 점 또는 대시를 사용하면 단순한 직선보다 덜 혹독한 효과를 줄 수 있으며 재미있는 모양이나 스타일 적용된 선 끝을 사용하면 디자인을 더욱 섬세하게 꾸밀 수 있습니다.

만약 선이 모스 부호처럼 점과 대시로 표시되길 원한다면, 선의 스타일링 비밀을 해독하는 방법을 계속 읽어보세요!

<div class="content-ad"></div>

# 기본 사항.

서로 이해하기 위해 기본적인 Jetpack Compose에서 선을 그리는 방법을 알려드리겠습니다:

여기서 선은 수평적이며 캔버스 내부에 있으며 시작 및 끝 오프셋이 있습니다. strokeWidth는 픽셀 값을 설정하며 (제 경우에는 dp에서 변환된 값), 색상을 설정할 수 있습니다. 단색 대신 브러시를 사용하는 버전을 사용하면 더 흥미로운 색상 효과를 적용할 수 있습니다.

![선](/assets/img/2024-07-01-DotDashDesign_1.png)

<div class="content-ad"></div>

좌표가 (0,0)에서 시작하여 상단 왼쪽에 있으며 하단 오른쪽이 캔버스의 (너비, 높이) 지점입니다.

![image](/assets/img/2024-07-01-DotDashDesign_2.png)

Jetpack Compose 및 DrawScope에서 Canvas에 그리는 방법에 대한 기본 안내서는 공식 문서를 확인해보세요.

이제 선이 그려졌으니, 좀 더 정교하게 만드는 방법은 무엇일까요?

<div class="content-ad"></div>

## 선 끝 처리

첫 번째로 할 수 있는 것은 선에 더 정교한 선 끝을 적용하는 것입니다.

여기서 선택할 수 있는 옵션은 StrokeCap.Butt로, 이는 기본값으로 아무 확장 없이 직사각형 끝이 있는 것입니다. 또한, 선을 반원으로 연장하는 StrokeCap.Rounded와 선을 사각형 모양으로 연장하는 StrokeCap.Square이 있습니다 (이는 Butt처럼 보이지만 연장된 부분이 사각형 모양이다).

![이미지](/assets/img/2024-07-01-DotDashDesign_3.png)

<div class="content-ad"></div>

모르는 것은 물어보세요. 실수를 겁내지 말아요. 편하게 물어보세요.

<div class="content-ad"></div>

Markdown 형식으로 표 태그를 변경해주세요.

<div class="content-ad"></div>

## 모스 부호

여기서는 dashPathEffect에 더 많은 간격을 추가하여 대시를 조금 더 복잡하게 만들 수 있습니다:

재미있고 흥미로운 선을 얻을 수 있어요:

![이미지](/assets/img/2024-07-01-DotDashDesign_6.png)

<div class="content-ad"></div>

# 스탬핑 시간

만약 여러 줄로 이루어진 선을 원하지 않는다면 어떨까요? 대신에, stampedPathEffect를 사용하여 선 a아에 특정 모양을 찍어낼 수 있습니다. 여기서 원하는 모양을 구성하고, 모양 사이의 간격 (advance, 이전과 같은 상태 및 StampedPathEffectStyle을 사용하여 모양을 설정합니다.

원 모양을 찍어내는 경우, 우리는 원형 점들의 라인을 <img src="/assets/img/2024-07-01-DotDashDesign_7.png" /> 처럼 갖게 됩니다.

<div class="content-ad"></div>

StampedPathEffectStyle.Translate은 선을 따라 움직이며 모양을 이전에 정의한 대로 유지합니다. 다른 유형의 StampedPathEffectStyle에 대해서는 나중에 설명하겠습니다. 직선을 보고 있을 때는 실제로 다른 유형이 적용되지 않습니다.

좀 더 화려하게 만들기 위해 모양을 다양하게 만들어보세요:

![image](/assets/img/2024-07-01-DotDashDesign_8.png)

# 짹짹? 파도?

<div class="content-ad"></div>

그럼 이런 라인을 만드는 방법이 무엇이 있을까요:


![image](/assets/img/2024-07-01-DotDashDesign_9.png)


선을 그리기 위해 경로를 만들고 모든 지그재그를 포인트로 계산하고 그릴 수도 있지만, 이 경로 모양을 한 번 생성한 다음 위에서 한 것처럼 이 경로를 찍으면 됩니다.

첫 번째 시도에서는 모양을 만들고 선을 따라 모양을 찍습니다 (전체 모양과 같은 너비의 진행을 사용하여)

<div class="content-ad"></div>

이것은 예상치 못한 (그러나 좋지 않은 결과는 아닙니다) 결과를 제공합니다:


![image](/assets/img/2024-07-01-DotDashDesign_10.png)


보통, 이를 경로로 그릴 때는 `DrawStyle.Stroke` 스타일을 사용하여 `drawPath`를 사용할 수 있고 선으로 직선으로 그립니다. 그러나 이것을 모양으로 사용하고 있기 때문에 자동으로 채워집니다. 이를 수정하기 위해 경로를 닫아주어야 합니다.

이것을 줄에 넣으면:

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-01-DotDashDesign_11.png)

여기서 실제 선이 점 (0,0)에서 그려지는 것을 알 수 있습니다. 이로 인해 지그재그 모양이 아래에 매달리고 실제 선의 끝에서 확장됩니다. 이를 더 쉽게 확인할 수 있습니다. 직선 경로를 함께 추가하면:

![이미지](/assets/img/2024-07-01-DotDashDesign_12.png)

더욱 정확하게 그리고 싶다면 Offset을 사용하여 경로를 변환해 지정한 선 위에 정확하게 그릴 수 있습니다:


<div class="content-ad"></div>

달콤한 톤으로 한국어로 번역하면:

<img src="/assets/img/2024-07-01-DotDashDesign_13.png" />

지그재그 선의 전체 코드:

# 물론, 직선뿐만 아니라요!

<div class="content-ad"></div>

이제 우리는 직선을 그리는 것에 숙달했어요! 만약 이를 도형으로 넣고 싶다면 어떻게 해야 할까요? 그럼 drawRect나 drawCircle 또는 drawPath를 사용해서 원하는 모양을 얻을 수 있어요:

![도형 이미지](/assets/img/2024-07-01-DotDashDesign_14.png)

## 모서리에서는 어떻게 될까요?

모서리에서 무슨 일이 일어나나요?

이전에 StampedPathEffectStyle에 대해 언급했었는데, 이것은 직선만 그리지 않을 때 유용해요. 이는 라인이 방향을 바꿀 때 스탬프 경로에게 무엇을 해야 하는지 알려줘요.

<div class="content-ad"></div>

예를 들어, 하트 경로를 사용하여 서로 다른 스타일을 볼 수 있습니다:

<img src="/assets/img/2024-07-01-DotDashDesign_15.png" />

번역한 것은 직역이며, 하트 모양의 오프셋을 수정하지 않았기 때문에 모양이 정확한 직사각형 윤곽을 따르지 않아 넘어집니다. 회전 스타일은 그 넘어짐을 수정하는 방식으로 모양을 회전시키지만, 서로 더 가깝거나 멀리 떨어져 있는 일부 하트가 생성됩니다. Morph의 경우에는 진동 경로로 더 쉽게 확인할 수 있습니다:

<img src="/assets/img/2024-07-01-DotDashDesign_16.png" />

<div class="content-ad"></div>

여기서는 차이가 더 두드러지며, 회전은 하트 경로에 대해서는 잘 작동하지만 스탬프 모양이 연결된 지그재그에서는 구멍이 모서리에 뚜렷하게 나타납니다(그리고 일부 지점에서 겹침). Morph는 모서리를 따라 변형하여 간극을 해결하고(대부분의 경우 — 좌하단 코너 참조) 보다 부드러운 선 효과를 제공합니다. 하트 경로와 마찬가지로 하트들도 모서리에서 조금 작아져 모서리 주변을 이동할 수 있도록 허용됩니다.

# 선. 마스터했다.

지금은 Jetpack Compose에서 선을 스타일링하고 흥미로운 모양과 경로에서 사용하는 여러 방법을 볼 수 있습니다.

점과 대시로 즐거운 모스 부호를 만들고 사용자들에게 비밀 메시지를 보내세요!

<div class="content-ad"></div>

여기서 사용된 모든 샘플 코드를 내 GitHub 실험에서 찾을 수 있습니다:

옹골지는 사람들은 PathEffect.chainPathEffect에 대해 논의하지 않았다는 것을 알아차릴 수도 있습니다. 솔직히 말해서, 저는 이를 잘 사용할 수 있는 좋은 예제를 구성하지 못했고 다른 사람들이 그것을 사용한 예제를 찾을 수도 없었습니다(심지어 Gemini도 시도했습니다!) 좋은 예제를 발견하면 제게 공유해 주시기 바랍니다.

어쩌면 언젠가 chainPathEffect에 대한 따로 두 번째 파트를 작성할 수도 있을 것입니다!