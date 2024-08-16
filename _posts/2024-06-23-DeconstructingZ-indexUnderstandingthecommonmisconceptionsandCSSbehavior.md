---
title: "Z-index 완벽 이해하기 - 흔한 오해와 CSS 작동 원리 분석"
description: ""
coverImage: "/assets/img/2024-06-23-DeconstructingZ-indexUnderstandingthecommonmisconceptionsandCSSbehavior_0.png"
date: 2024-06-23 14:16
ogImage: 
  url: /assets/img/2024-06-23-DeconstructingZ-indexUnderstandingthecommonmisconceptionsandCSSbehavior_0.png
tag: Tech
originalTitle: "Deconstructing Z-index — Understanding the common misconceptions and CSS behavior."
link: "https://medium.com/themoondevs/deconstructing-z-index-understanding-the-common-misconceptions-and-css-behavior-90cad9f98d24"
isUpdated: true
---




UI 버그는 최고의 개발자들조차 괴롭히는 법이죠. 왜냐하면 백엔드 문제와는 달리, UI 문제를 디버깅하는 것은 코드 수정을 넘어 사용자가 보고 상호 작용하는 것이 완벽한지 확인하는 것이 중요하기 때문입니다. 화면 크기, 브라우저 버전 또는 심지어 사용자의 기기 등과 같은 요소에 영향을 받는 UI 버그는 사용자를 좌절시키고 브랜드 인식을 훼손시키며 전환을 방해할 수 있습니다. 심지어 보이는 것 같이 간단한 스타일링 문제조차 심각한 문제로 커질 수 있습니다.

이러한 도전을 직접 경험할 수 있는 한 분야는 웹 페이지 스타일링입니다. CSS는 복잡하고 섬세할 수 있으며, 해당 속성을 오해하거나 잘못 사용하면 중대한 디버깅 노력을 필요로 합니다.

## "UI 혼란의 공통 원인은 z-index 속성입니다. z-index의 기본 동작 및 작동을 이해하는 것이 중요합니다. z-index가 어떻게 작동하는지 확실하게 이해하지 않으면 개발자들은 의도한대로 요소가 층으로 배치되지 않는 예상치 못한 레이아웃 문제를 쉽게 만날 수 있습니다."

## Z-Index 속성

<div class="content-ad"></div>

위 내용을 여러 번 읽으시는 것을 권장합니다. 정의 자체가 모든 것을 설명해 주지만, 코드를 작성할 때 종종 세부 사항을 놓치곤 합니다.

이 속성은 웹 페이지의 요소 쌓임 순서를 제어하는 데 중요한 역할을 합니다. 그러나 요소의 위치 지정과 그들을 포함하는 컨테이너의 표시 속성과 같은 여러 요소에 의해 행동이 영향을 받을 수 있습니다.

# 자세히 살펴보겠습니다:

## 위치 지정된 요소:

<div class="content-ad"></div>

z-index가 작동하려면 요소의 position 속성을 기본 값(static)이 아닌 다른 값으로 설정해야 합니다. 요소는 relative, absolute, fixed 또는 sticky 위치여야 합니다.

![이미지](/assets/img/2024-06-23-DeconstructingZ-indexUnderstandingthecommonmisconceptionsandCSSbehavior_0.png)

## Z-순서:

이것은 화면에 수직인 z축을 따라 요소의 순서를 의미합니다. 이는 서로 위에 쌓인 종이 층으로 생각할 수 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-23-DeconstructingZ-indexUnderstandingthecommonmisconceptionsandCSSbehavior_1.png" />

## 자손:

z-index는 위치가 지정된 요소 내의 모든 자식 요소에도 영향을 미칩니다. 이는 쌓임 순서가 요소 자체뿐만 아니라 해당 자식 요소에도 적용된다는 것을 의미합니다.

<img src="/assets/img/2024-06-23-DeconstructingZ-indexUnderstandingthecommonmisconceptionsandCSSbehavior_2.png" />

<div class="content-ad"></div>

# 정적 위치 지정에서 — 'Z-Index는 무시됩니다'

기본적으로 요소들은 정적으로 위치 지정되어 있어 HTML 마크업에 나타나는 순서대로 렌더링됩니다. 이 상황에서 z-index 속성은 전혀 영향을 미치지 않고, 요소들은 DOM 트리 내에서의 위치에 따라만 쌓입니다.

이는 DOM 트리에서 나중에 나타나는 요소가 항상 앞에 나타나는 요소 위에 일관되게 표시된다는 것을 의미합니다.

![이미지](/assets/img/2024-06-23-DeconstructingZ-indexUnderstandingthecommonmisconceptionsandCSSbehavior_3.png)

<div class="content-ad"></div>

# 정적(static) 이외의 위치 지정 - 'Z-index가 예상대로 작동합니다.'

요소들이 position: relative, position: absolute, position: sticky 또는 position: fixed와 같은 속성을 사용하여 명시적으로 위치 지정된 경우, z-index 속성이 적용됩니다. 더 높은 z-index 값을 가진 요소는 낮은 z-index 값을 가진 요소 위에 나타납니다.

![이미지](/assets/img/2024-06-23-DeconstructingZ-indexUnderstandingthecommonmisconceptionsandCSSbehavior_4.png)

## 플렉스(flex) 또는 그리드(grid) 레이아웃 컨테이너

<div class="content-ad"></div>

플랙스 또는 그리드 컨테이너에서 요소의 쌓임 순서는 z-index, 항목 순서 및 정렬을 결합한 요소로 결정됩니다. 요소들이 정적으로 배치되어 있더라도 z-index 속성은 컨테이너 내에서의 쌓임 순서에 영향을 줍니다.

![이미지](/assets/img/2024-06-23-DeconstructingZ-indexUnderstandingthecommonmisconceptionsandCSSbehavior_5.png)

이제 z-index 동작에 대한 기본적인 이해를 갖고 있으니, 스택 컨텍스트, 그 원리, 그리고 CSS가 코드를 어떻게 해석하거나 이해하는지에 대해 더 심층적으로 살펴보겠습니다.

# 스택 컨텍스트란 무엇인가요?

<div class="content-ad"></div>

CSS의 쌓이는 컨텍스트는 웹페이지의 요소들을 위한 레이어 시스템입니다. 이는 요소들이 서로 어떻게 겹치는지를 결정합니다.

한 페이지의 컨테이너 안에 객체들이 담겨 있다고 상상해보세요. 기본적으로, 그들을 넣은 순서대로 보이게 됩니다. 마치 접시 쌓아놓은 것처럼 말이죠. z-index 속성은 특별한 라벨 같은 것으로, 일부 접시에 붙일 수 있는 것입니다. 이것은 컨테이너 내에서만 영향을 미치며, 특정 컨테이너 안에서 다른 접시들 위에 라벨이 붙은 접시들이 나타나는 순서를 정할 수 있게 해줍니다.

# 또한 쌓이는 컨텍스트를 폴더를 만들고 각 폴더가 자체적인 컨텍스트를 가지는 디렉토리 시스템으로 생각할 수 있습니다. 쌓이는 컨텍스트는 폴더를 만들 수 있고, 각 폴더가 자체적인 컨텍스트를 가질 수 있습니다. 쌓이는 컨텍스트는 폴더 안에 하위 폴더를 만들 수 있는 것처럼 중첩될 수 있습니다.

![image](/assets/img/2024-06-23-DeconstructingZ-indexUnderstandingthecommonmisconceptionsandCSSbehavior_6.png)

<div class="content-ad"></div>

## 새로운 쌓임 맥락은 무엇을 만들까요?

새로운 쌓임 맥락은 여러 가지 방법으로 생성됩니다. 예를 들어:

- 특정 CSS 속성을 사용하는 경우(static이 아닌 값으로 position, 값이 있는 z-index, 불투명도가 1 미만).
- `iframe`과 같은 특정 요소 또는 transform, filter 또는 will-change와 같은 CSS 속성이 있는 요소.
- 전체 목록을 보려면 이 곳을 방문하세요.

# 예상치 못한 숨겨진 UI 요소: 쌓임 맥락에 대한 오해에서 발생하는 흔한 문제

<div class="content-ad"></div>

다음 예제를 고려해 보세요:

```js
<div class=”rectangular-bg”>
 <div class=”circle”></div>
 <div class=”triangle”></div>
</div>
```

우리가 `.circle`에 음수 z-index와 position: relative를 적용하면 이미지에 표시된 대로 원이 사라집니다. 그 원은 실제로 부모인 직사각형 배경 뒤에 숨겨져 있습니다.

<img src="/assets/img/2024-06-23-DeconstructingZ-indexUnderstandingthecommonmisconceptionsandCSSbehavior_7.png" />

<div class="content-ad"></div>

여기가 이유입니다: position: relative와 함께 z-index: -1을 추가하면 원에 대한 새로운 쌓임 맥락이 생성됩니다. 이 새로운 쌓임 맥락은 기본 루트 쌓임 맥락(전체 페이지)의 일부입니다.

원의 z-index 속성은 해당 부모 쌓임 맥락에 대해 동작합니다. 부모 요소(직사각형 배경)에 z-index가 없기 때문에 원은 그 뒤에 렌더링됩니다.

## - z-index는 부모 컨테이너에 상대적입니다

![이미지](/assets/img/2024-06-23-DeconstructingZ-indexUnderstandingthecommonmisconceptionsandCSSbehavior_8.png)

<div class="content-ad"></div>

지금 원의 부모 쌓임 문맥은 z-index가 1인 직사각형 배경이며, 따라서 원의 z-index는 직사각형 배경 쌓임 문맥을 기준으로 계산됩니다. 즉, 1+(-1) = 0이 됩니다.

## - 투명도를 사용한 쌓임 문맥

원을 삼각형 위로 올리고 싶습니다. z-index를 사용하지 않고 이를 어떻게 구현할 수 있을까요?

<img src="/assets/img/2024-06-23-DeconstructingZ-indexUnderstandingthecommonmisconceptionsandCSSbehavior_9.png" />

<div class="content-ad"></div>

동그라미의 불투명도를 1보다 작게 설정하거나 변형 속성을 사용하여 설정할 수 있습니다. 이전에 논의했던 대로 이는 새로운 콘텍스트를 생성하게 됩니다. 이것으로 원이 삼각형 위에 올라가게 됩니다.

# 스택 컨텍스트와 다양한 복잡한 시나리오에서의 z-index 동작에 대한 흥미로운 예시들을 살펴봅시다.

## z-index로 스택 컨텍스트 만들기

모양이라는 div가 자체 스택 컨텍스트를 가지고 있다고 가정해 봅시다.

<div class="content-ad"></div>

삼각형이 지금은 사각형과 원 위에 있어요.

- 사각형 위에 있는 이유는, 도형들과 관련해서 삼각형이 1층 위에 있기 때문이에요.
- 원 위에 있는 이유는, 원이 z-index를 설정하지 않았고, 동생 폴리곤과 동일한 쌓임 맥락에 속하기 때문이에요. 즉, 원의 z-index는 부모 도형으로부터 전달된 1의 값을 가지고 있어요.

이제 삼각형이 사각형 위에 위치하되 원 위에 위치하지 않게 하고 싶다고 해보죠. 이를 해결하기 위해서, 폴리곤의 z-index나 원의 z-index를 변경할 수 있어요. 아래 이미지를 확인해주세요.

이미지의 두 번째 예시에서는 원의 z-index가 사각형보다 높은 값을 가지고 있어요.

<div class="content-ad"></div>

삼각형이 원 앞에 나타나길 원한다면, 삼각형에 높은 z-index를 설정하는 것만으로는 동작하지 않습니다. 어떤 값이든 상관없이 삼각형의 z-index는 그 쌓임 맥락(다각형) 내에서만 적용되기 때문입니다.

z-index에 대해 까다로운 점은 요소의 쌓임 맥락 내에서만 작동한다는 것입니다. 우리의 경우, 우리는 삼각형이 다각형 쌓임 맥락의 일부인 채로 원(다른 쌓임 맥락) 앞에 나타나길 원합니다. 이것은 불가능합니다.

삼각형이 원 앞에 나타나게 하려면, 다각형에서의 쌓임 맥락을 제거해야 합니다.

이제 삼각형과 원은 동일한 쌓임 맥락을 공유하게 되어, 높은 z-index로 삼각형이 원 앞에 나타나도록 할 수 있습니다.

<div class="content-ad"></div>

# 주요 학습 내용:

- 위치 지정이 필요한 속성: z-index 속성은 요소의 위치를 상대적, 절대적, 고정된 또는 고정 흐름 속성으로 설정해야 합니다.
- 플렉스 및 그리드 컨테이너: 이러한 컨테이너 내에서도 z-index는 항목 순서와 정렬에 영향을 받아 쌓이는 순서를 제어합니다.
- Z-순서: 이것은 요소의 z 축을 따라 순서를 결정합니다. 높은 z-index 값은 위에 표시됩니다.
- 쌓임 컨텍스트: 요소들을 위한 특별한 레이어입니다. 동일한 쌓임 컨텍스트 내의 요소는 z-index를 사용하여 쌓일 수 있지만 다른 쌓임 컨텍스트 내의 요소는 직접적으로 서로의 쌓임 순서에 영향을 줄 수 없습니다.
- 쌓임 컨텍스트 생성: 불투명도, 변형, 필터 및 will-change와 같은 CSS 속성을 사용하여 새로운 쌓임 컨텍스트를 생성할 수 있습니다.

# 결론:

CSS는 복잡할 수 있으며 z-index와 같은 속성의 세부 사항을 이해하지 못하면 중대한 디버깅 노력을 초래할 수 있습니다. 요소들의 층을 올바르게 제어하는 방법을 알고 있다면 일반적인 함정을 피하고 시간을 절약하며 웹사이트에서 사용자 경험을 향상시킬 수 있습니다. 이러한 원칙을 구현하여 요소가 정확히 표시되고 의도한 대로 쌓이며 매끄럽고 매력적인 시각적 프레젠테이션에 기여하도록 할 것입니다.

<div class="content-ad"></div>

# 참고 자료:

- https://web.dev/learn/css/z-index
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context
- https://ishadeed.com/article/understanding-z-index/

# 저자 소개:

Kshitij은 React, Next.js 및 TypeScript에 튼튼한 기반을 갖춘 프론트엔드 개발자입니다. 그는 React와 WebGL의 힘을 활용하여 사용자 경험과 비즈니스 목표를 일치시키는 몰입형 웹 경험을 개발하는 전문가입니다. 대화형 3D 랜딩 페이지부터 복잡한 암호 웹 앱까지 다양한 20개 이상의 프로젝트에 참여했습니다.

<div class="content-ad"></div>

더문데브 블로그 편집팀은 이 기사에서 제시된 코드 샘플 및 기술적 콘텐츠를 검토해 주신 수바카르 티키레디에게 감사의 마음을 전합니다.