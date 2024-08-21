---
title: "SwiftUI에서 커스텀 시각 효과 적용하는 방법"
description: ""
coverImage: "/assets/img/2024-08-04-CustomVisualEffectsinSwiftUI_0.png"
date: 2024-08-04 19:26
ogImage:
  url: /assets/img/2024-08-04-CustomVisualEffectsinSwiftUI_0.png
tag: Tech
originalTitle: "Custom Visual Effects in SwiftUI"
link: "https://medium.com/@paulocsb/custom-visual-effects-in-swiftui-4c088c7cb20f"
isUpdated: true
---

![CustomVisualEffectsinSwiftUI](/assets/img/2024-08-04-CustomVisualEffectsinSwiftUI_0.png)

# 시각 효과

SwiftUI는 사용자 인터페이스를 구축하는 방식을 혁신하여 사용자에게 아름답고 매력적인 경험을 제공할 수 있게 만들었습니다. 그렇다면 다음 단계로 나아가 볼까요? 사용자를 놀라게 할 커스텀 시각 효과를 앱에 추가할 수 있다면 어떨까요? 이 게시물에서는 SwiftUI를 사용하여 커스텀 시각 효과를 생성하는 방법을 살펴보겠습니다.

# 커스텀 시각 효과 생성하기

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

SwiftUI에서 사용자 정의 시각 효과를 만들려면 visualEffect 뷰 수정자를 사용해야 합니다. 이 수정자는 EmptyVisualEffect의 인스턴스를 반환하는 클로저를 사용합니다. 이 클로저 내에서 initial 매개변수를 사용하여 다양한 효과를 적용할 수 있습니다.

다음은 예시입니다:

```js
RoundedRectangle(cornerRadius: 24)
    .fill(.purple)
    .visualEffect({ content, proxy in
        content
            .hueRotation(Angle(degrees: proxy.frame(in: .global).origin.y / 10))
    })
```

위 코드가 하는 일을 살펴보겠습니다:

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

- RoundedRectangle(cornerRadius: 24): 24포인트로 설정된 둥근 모서리가 있는 직사각형 모양을 만듭니다.
- .fill(.purple): 사각형을 보라색으로 채웁니다.
- .visualEffect(' content, proxy in … '): 사각형에 시각적 효과를 적용합니다. 여기서 재밌는 부분이 시작됩니다.

클로저 내에서 content는 사각형 자체를 나타내고, proxy는 사각형이 표시되는 컨텍스트에 대한 추가 정보를 제공합니다(예: 위치, 크기).

.hueRotation(Angle(degrees: …)) 수정자는 사각형의 색상에 회전 효과를 적용합니다. 구체적으로 다음과 같습니다:

- 회전 각도는 원점의 y 좌표(proxy.frame(in: .global).origin.y)를 10으로 나눈 값으로 계산됩니다.
- 이는 아래로 스크롤할수록(y 좌표가 증가함) 색상이 더 빠르게 회전하여 사이킬델릭 효과를 만들어냅니다.

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

사용자 상호작용에 반응하는 대화형 및 시각적으로 매력적인 UI 구성 요소를 생성합니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*gq4VX2QKH3G_o9vFh5JWXA.gif)

# 결론

visualEffect 뷰 수정자 덕분에 SwiftUI로 사용자 정의 시각적 효과를 만드는 것이 이전보다 쉬워졌습니다. 여러 효과를 단일 클로저로 결합하여 고유한 시각적 요소를 만들어 앱의 사용자 경험을 향상시킬 수 있습니다. 다양한 효과 조합 및 애니메이션 기술을 실험하여 디자인을 더욱 향상시켜보세요!

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

이 도움이 되었으면 좋겠어요! 궁금한 점이 있거나 더 설명이 필요하면 언제든지 말씀해주세요.
