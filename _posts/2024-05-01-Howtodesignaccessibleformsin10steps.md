---
title: "접근성 준수하는 폼을 디자인하는 10가지 방법"
description: ""
coverImage: "/assets/img/2024-05-01-Howtodesignaccessibleformsin10steps_0.png"
date: 2024-05-01 22:33
ogImage:
  url: /assets/img/2024-05-01-Howtodesignaccessibleformsin10steps_0.png
tag: Tech
originalTitle: "How to design accessible forms in 10 steps"
link: "https://medium.com/user-experience-design-1/how-to-design-accessible-forms-in-10-steps-22232d65de18"
isUpdated: true
---

양식을 작성하는 것은 보통 사용자에게 재미있는 작업은 아닐 수 있지만, 종종 프로세스의 필수 단계입니다. 예를 들어, 사용자는 물품을 구매하기 위해 지불 세부 정보가 포함된 짧은 양식을 작성하라고 요청받을 수도 있고, 취업 지원서 일환으로 양식을 작성해야 할 수도 있습니다.

디자이너로서, 우리는 사용자의 삶을 더 편리하게 만들 수 있습니다. 모든 사용자가 접근하고 이해하기 쉬운 형태로 양식을 디자인함으로써 접근성을 확보할 수 있습니다. 보조 기술을 사용하는 사용자 등 모든 사용자가 양식의 구성 요소에 접근하고 이해할 수 있도록 하는 것은 사용자뿐만 아니라 디자이너가 일하는 비즈니스에도 이로운 점이 많습니다. 예를 들어, 접근성이 제공되지 않아 접근 시 힘든 사용자가 결제 단계를 완료할 수 없을 경우, 사용자가 당혹스러울뿐만 아니라 해당 비즈니스에도 부정적인 영향을 끼칠 수 있습니다.

다음은 접근성을 고려한 양식 디자인에 대한 몇 가지 실용적인 팁입니다:

## 1. 긴 양식을 짧은 여러 페이지 양식으로 나누기

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

한 페이지에 많은 필드가 있는 긴 폼은 피하는 것이 좋습니다. 대신 필드를 여러 개의 짧은 폼 사이에 나누어 시도해보세요. 긴 폼은 이해하기 어렵고, 특히 디지털 리터러시가 낮은 사람들과 주의력결핍과 과잉행동장애(ADHD)와 같은 인지 장애가 있는 사람들에게 특히 어려울 수 있습니다. 관련된 필드를 논리적으로 그룹화하여 인지 부하를 줄이도록 노력해보세요.

여러 페이지로 나뉘면 각 페이지에 사용자가 어떻게 진행해야 하는지 설명이 나타나도록 해야 합니다. 이렇게 함으로써 사용자가 폼의 지침을 기억하도록 의존할 필요가 없어지며, 대부분의 사람들에게 어려울 수 있고, 기억력에 영향을 미치는 인지 장애가 있는 사람들에게는 더 어려울 수 있습니다.

여러 폼 페이지를 추가하면 사용자가 폼 작성의 진행 상황을 이해하기 더 어려워질 수 있으므로, 완료한 정도를 어떤 방식으로 시각화하는 것이 도움이 될 때가 많습니다.

![이미지](/assets/img/2024-05-01-Howtodesignaccessibleformsin10steps_0.png)

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

## 2. 입력 필드에 라벨을 상단 정렬하기

시각적 라벨은 사용자에게 해당 입력 필드가 무엇을 의미하는지 알려주고, 사용자들이 양식을 작성하는 데 도움을 줍니다. 시각적 라벨을 사용하면 스크린 리더도 입력 필드를 식별할 수 있습니다. 스크린 리더가 라벨을 입력 필드와 연결하려면 `input`에 식별자를 설정하여 `label`의 for 속성과 일치하도록 해야 합니다. 일부 지원 기술이 지원하지 않을 수 있으므로 `input`을 `label` 안에 중첩하는 것은 좋지 않습니다. `label`을 사용할 수 없는 경우 ARIA 라벨(aria-labelledby 및 aria-label)을 사용할 수 있습니다.

일반적으로 시각적 라벨을 입력 필드 위에 위치시키는 것이 좋습니다. 사용자가 라벨과 입력 필드를 별도로 살펴볼 필요가 없기 때문에 사용자가 편리하게 사용할 수 있습니다. 줌 기능을 사용하는 시각 장애인 사용자들에게는 입력 필드 위에 라벨을 위치시키는 것이 수평으로 페이지를 스크롤하여 모든 양식 필드를 작성할 필요가 없게 해줍니다.

<img src="/assets/img/2024-05-01-Howtodesignaccessibleformsin10steps_1.png" />

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

## 3. 힌트 텍스트 사용하기

양식 입력란 내부의 플레이스홀더 텍스트는 사용자에게 도움이 되도록 의도되었지만 종종 많은 사용성 및 접근성 문제를 유발합니다. 플레이스홀더 텍스트는 보통 정보를 입력한 후에 필드에서 사라지기 때문에 사용자가 힌트를 기억하고 수정하는 것이 더 어려워집니다.

일부 사용자에게는 플레이스홀더 텍스트에 완전히 접근할 수 없는 경우도 있습니다. 예를 들어, 플레이스홀더 텍스트는 보조 기술에서 널리 지원되지 않으며 오래된 웹 브라우저에서도 표시되지 않습니다. 게다가, 사용되는 기본 색상은 옅은 회색이며 이는 대부분의 배경 색상과의 색 대조가 낮아 사용자에게 시각적으로 읽기 어렵거나(불가능하게) 만들 수 있습니다.

플레이스홀더 텍스트 대신, 입력란 위나 아래에 힌트 텍스트를 사용하여 도움이나 추가 정보를 제공해 보세요. 이 텍스트는 항상 보이기 때문에 보조 기술에서 더 쉽게 인식될 확률이 높습니다.

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

![2024-05-01-Howtodesignaccessibleformsin10steps_2.png](/assets/img/2024-05-01-Howtodesignaccessibleformsin10steps_2.png)

## 4. 네이티브 폼 컨트롤 사용하기

네이티브 HTML을 사용하면 다양한 브라우저에서 작동하고 스크린 리더와 같은 다양한 보조 기술과 함께 더 잘 작동하는 코드를 만들 수 있습니다. 네이티브 HTML 요소는 기본적으로 접근성이 있기 때문에 네이티브 HTML 폼 컨트롤을 사용하면 디자인 중인 폼을 완전히 액세스할 수 있는 지원 기술을 보장할 수 있습니다.

커스텀 폼 컨트롤을 만들어야 하는 경우에는 WAI-ARIA 기술을 사용하여 속성을 수동으로 추가하세요. 커스텀 폼 컨트롤을 스크린 리더 및 키보드만으로 액세스할 수 있도록 보장하기 위해 수동으로 테스트를 진행하세요.

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

## 5. 포커스를 강조하는 요소

웹 사이트를 키보드로만 탐색하는 사용자를 위해 포커스 영역을 명확하게 강조하는 것은 사용자가 양식을 쉽게 탐색할 수 있도록 해줍니다.

포커스가 있는 `input`을 명확하게 강조하고, 강조하기 위해 선택한 색상이 배경색과 충분한 색 대비를 가지도록합니다.

![이미지](/assets/img/2024-05-01-Howtodesignaccessibleformsin10steps_3.png)

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

## 6. 스타일 및 오류 올바르게 작성하기

사용자가 양식의 필드에서 오류를 만나면 무엇이 잘못되었는지 및 어떻게 수정할 수 있는지 알 수 있어야 합니다. 이것은 액세스 요구사항이 있는 사용자와 없는 사용자 모두에게 적용됩니다. 그러나 제대로 스타일이 적용되지 않거나 잘못 작성된 오류는 일부 액세스 요구사항을 가진 사용자가 오류를 이해하고 수정하는 것이 불가능하게 할 수 있습니다.

스타일링
일반적으로 오류가 발생하면 입력 테두리 색상이 빨간색으로 변경됩니다. 하지만 이것만으로 오류를 처리하는 것은 두 가지 이유로 접근성이 떨어집니다. 첫째, 색맹 사용자에게 색상 변경이 명확하지 않을 수 있고, 둘째, 색상 변경은 보조 기술에 노출되지 않을 수 있습니다. 기호는 오류가 있음을 나타내는 데 도움이 될 수 있지만 사용자가 왜 필드가 잘못되었는지 이해하는 데 도움이 되진 않을 것입니다. 사용자에게 오류를 강조하는 가장 접근성이 높은 방법은 문제가 무엇인지 명확하게 나타내는 수반 텍스트입니다.

내용
오류 메시지는 평문으로 작성하고 기술 용어를 피하여 오류가 이해하기 쉽도록 해야 합니다. 메시지는 사용자가 오류를 어떻게 수정할 수 있는지에 대한 적절한 제안을 제공해야 합니다.

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

화면 판독기가 필드가 잘못되었음을 이해할 수 있도록 ARIA 속성 aria-invalid="true"을 사용하세요. 이 속성은 화면 판독기가 해당 컨트롤을 "잘못됨"이나 주의가 필요한 상태로 인식하도록 합니다. 어떤 인라인 오류가 양식 필드와 연결되어 있는지 지정하려면 aria-describedby를 사용하세요.

![Form Example](/assets/img/2024-05-01-Howtodesignaccessibleformsin10steps_4.png)

## 7. 그룹 내 관련 필드에 레이블 지정

가끔 양식은 관련된 필드 요소들로 이루어질 수 있습니다. 예를 들어, 주소 입력을 구성하는 여러 요소나 라디오 버튼에는 여러 옵션이 있을 수 있습니다. 이러한 상황에서 관련 필드 그룹에 적절한 레이블을 붙이면 화면 판독기가 필드의 관계를 식별할 수 있습니다.

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

필드셋과 레전드를 사용할 수 있습니다. 레전드는 일반적으로 질문이나 요청되는 그룹의 레이블로 사용될 수 있으며, 화면 판독기가 필드와 그룹의 레이블을 들을 수 있도록 합니다. 필드셋은 폼 컨트롤을 함께 그룹화하는 데 사용됩니다.

![이미지](/assets/img/2024-05-01-Howtodesignaccessibleformsin10steps_5.png)

## 8. 지침 제공

지침은 사용자가 폼이나 개별 요소를 완료하는 방법을 이해하는 데 중요하며, 모든 사용자가 접근할 수 있어야 합니다.

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

사용자가 양식을 시작하기 전에 상황에 맞는 정보를 제공하는 것이 도움이 됩니다. 예를 들어, 양식을 완료하는 데 사용자가 필요한 것이 있는지 여부를 설명하거나 시간 제한이 있는지를 설명할 수 있습니다. 이러한 지침은 화면 판독기에서 읽혀지도록 `form` 요소 앞에 표시되어야 합니다.

인라인 지침은 필수 필드를 식별하고 어떤 형식으로 필드를 완료해야 하는지 사용자가 이해할 수 있도록 도와줍니다. 화면 판독기 사용자에게 지침을 표시하려면 aria-describedby 속성을 사용하세요. 지시 사항이 양식 필드에 바인딩되어 있지 않으면 일부 보조 기술에서 정보를 놓칠 수 있습니다.

## 9. 필수 항목을 명확히 식별하기

양식에서 필수 항목은 명확히 식별되어야 합니다. 가장 적게 발생하는 경우에 따라 필수 필드나 선택적 필드를 보여줌으로써 이를 수행할 수 있습니다.

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

필수 속성은 양식 컨트롤에 추가할 수 있으며 프로그램적으로 해당 양식 필드가 필수임을 나타낼 수 있습니다. 웹 브라우저가 HTML5을 지원하는 경우, 필드를 작성하지 않은 상태로는 양식을 제출할 수 없습니다. aria-required 속성을 사용하여 보조 기술에 필수 컨트롤에 대한 정보를 전달하여 사용자에게 알릴 수 있습니다. HTML5를 지원하는 대부분의 브라우저는 HTML5 required 속성이 존재할 때 자동으로 값을 true로 설정하지만, aria-required를 포함하면 오래된 웹 브라우저도 지원됩니다.

![image](/assets/img/2024-05-01-Howtodesignaccessibleformsin10steps_6.png)

## 10. 가능한 경우 사용자가 양식을 작성하도록 하는 시간 제한을 피하십시오.

접근성 요구사항을 가진 많은 사용자들은 양식을 작성하는 데 더 많은 시간이 필요할 수 있습니다. 예를 들어 시각 장애가 있는 사용자는 페이지에서 정보를 찾고 읽는 데 더 많은 시간이 필요할 것이며 타임아웃 경고 메시지를 보지 못할 수도 있습니다. 인지나 학습 장애가 있는 사용자는 양식의 내용을 읽고 이해하는 데 더 많은 시간이 필요할 수 있습니다. 청각 장애가 있는 사용자는 청각 정보를 처리하거나 영어가 주 언어가 아닐 때(예: 영어가 아닌 사용자 또는 수화 언어 사용자) 이해하는 데 더 많은 시간이 필요할 수 있습니다.

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

시간 제한이 필요한 경우 (예: 보안상의 이유로), 사용자는 이를 꺼거나 시간 제한을 연장할 수 있어야 합니다. 사용자는 양식을 시작할 때 시간 초과와 시간 제한이 무엇인지에 대해 알려져야 합니다.

## 마무리

여기까지 접근성 있는 양식을 디자인하는 데 도움이 되는 팁을 제공했습니다. 이 포인트들이 모든 사용자가 여러분의 양식을 사용할 수 있도록 도와주길 바라요. 이는 결국 사용자와 비즈니스 양쪽에 혜택이 되므로 정말 이유가 없습니다!
