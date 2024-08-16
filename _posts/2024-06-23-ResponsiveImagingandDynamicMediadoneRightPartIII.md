---
title: "반응형 이미지와 동적 미디어 제대로 구현하기  Part III"
description: ""
coverImage: "/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_0.png"
date: 2024-06-23 14:37
ogImage: 
  url: /assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_0.png
tag: Tech
originalTitle: "Responsive Imaging and Dynamic Media done Right — Part III"
link: "https://medium.com/@achimkoch/responsive-imaging-and-dynamic-media-done-right-part-iii-945a09794709"
isUpdated: true
---




# 동적 미디어 및 HTML 5

오늘날의 웹사이트는 다양한 기기에서 경험됩니다. 화면 크기는 물론 해상도, 방향 및 종횡비도 다양합니다.

![ResponsiveImagingandDynamicMediadoneRightPartIII_0](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_0.png)

다양한 기기를 위해 이미지를 다른 해상도와 포맷으로 제공해야 합니다. HTML5는 이를 어떻게 수행할 수 있는지에 대한 일부 힌트를 제공합니다. 그러나 표준은 다소 복잡하며 오류를 발생시키기 쉽습니다. 또한 HTML5는 약간 정적이며 AEM Dynamic Media를 사용할 때 활용할 수 있는 고급 렌더링 기능을 완전히 활용하지 못합니다.

<div class="content-ad"></div>

이 글은 네 부분 시리즈의 세 번째 파트입니다. 시리즈는 아래와 같이 나뉘어 있습니다:

- 첫 번째 파트: 반응형 이미징이란 무엇인가? 왜 필요한지 그리고 어떤 사용 사례가 있는지.
- 두 번째 파트: AEM Dynamic Media를 사용하여 페이지 로딩 성능을 높이는 방법은?
- 세 번째 파트: HTML 5로 Dynamic Media를 어떻게 구현할 수 있는가?
- 네 번째 파트: HTML 5 이상: 사용자 정의 이미지 로더를 사용하여 페이지 로딩 시간을 단축하는 방법.

# Responsive Images를 위한 HTML 마크업

아직 여기 있나요? 멋지네요. 여태까지 오신 것을 기뻐해요. 이 장에서는 반응형 이미지의 HTML 부분에 중점을 둘 것입니다. HTML5 표준은 반응형 이미지를 지원하는 몇 가지 새로운 태그를 제공합니다. 경험 많은 웹 개발자라면 아마도 srcset 속성과 `picture` 태그를 이미 사용해 본 적이 있을 것입니다. 이것이 우리가 작업할 것입니다.

<div class="content-ad"></div>

앞서 이 태그들에 익숙하다 해도, 여기 머무르는 것을 초대해요. 이 마크업 유형에는 잘 알지 못하는 몇 가지 숨은 기능이 있을 수 있어요. 그리고 나중에는, 앱이나 정적 웹사이트에서 사용하는 기술이 콘텐츠 관리 시스템(CMS)에서 생성된 사이트에 적용 가능하지 않을 수도 있다고 주장할 거예요.

# 유동 및 반응형 레이아웃의 이미지

지금쯤이면 개별 이미지를 잘라내거나 크기 조절하는 방법을 알고 계실 거에요. 각 이미지는 개별 URL로 참조될 수 있어요. 그렇다면 브라우저는 어떤 URL을 특정 레이아웃에 사용해야 할지 어떻게 알 수 있을까요?

이는 사용 사례에 따라 다릅니다. 설명하기 위해 몇 가지 전형적인 사용 사례를 다루는 간단한 레이아웃을 만들었어요. 이 레이아웃은 유동적이고 반응형입니다.

<div class="content-ad"></div>

"Fluid"은 모든 너비 정의가 %로 되어 있음을 의미합니다. 브라우저 창의 크기를 줄이면 페이지 상의 모든 요소의 너비가 비례하여 줄어듭니다.

"반응형": 어느 순간 – 전형적인 모바일 기기용 브레이크포인트에 도달하면 약간 다른 레이아웃이 적용됩니다. 즉, 다중 열 요소가 쌓이게 됩니다:

![이미지](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_1.png)

# 사용 사례들

<div class="content-ad"></div>

A: 화면 너비의 100%를 차지하는 히어로 배너입니다. 크기는 실제 화면 너비에 맞게 조정됩니다. 모든 기기에서 종횡비 3:1이 동일합니다.

B: 옆에 표시된 두 개의 작은 티저 구성 요소입니다. 이미지는 사용 가능한 너비의 50%를 차지하고 비례하여 확대됩니다. 좁은 화면을 가진 모바일 기기에서는 티저가 쌓이게 표시되며 화면 너비의 100%를 차지합니다. 종횡비 1:1이 동일합니다.

C: 텍스트-이미지 구성 요소입니다. 데스크톱 해상도에서 이미지는 텍스트 오른쪽에 표시되며 뷰포트 너비의 33%를 차지합니다. 모바일 기기에서 이미지는 텍스트 위에 표시되며 종횡비가 1:1에서 3:1로 변경됩니다.

D: 텍스트와 이미지가 있는 큰 티저입니다. 데스크톱에서 이미지는 화면 너비의 33%를 사용합니다. 모바일 화면에서 이미지는 쌓이고 화면 너비의 100%를 사용하며 3:1로 표시됩니다. 텍스트 이미지 구성 요소와 달리, 이미지의 높이는 가변적입니다. 이미지의 높이는 텍스트 블록의 높이에 따라 정의됩니다. 더 긴 복사 텍스트는 더 늘어진 형식을 유도합니다. 이미지는 모든 종횡비를 가질 수 있으며 미리 정의된 형식 중 하나에 부합되지 않습니다.

<div class="content-ad"></div>

테스트 환경

5 페이지에 간단한 테스트 페이지 세트를 준비해두었어요. 이를 따라가며 제 결과물을 검증할 수 있어요.

여러 브라우저를 병렬로 사용하는 것을 추천해요. 각각 약간 다르게 작동하기 때문이에요. 새로운 개념을 익히기에는 Firefox가 최적이라고 생각해요. Chrome은 몇 가지 성능 최적화를 적용하고 핵심 기능을 가리는 특징이 있어요. 이 점이 약간 혼란스러울 수 있어요.

실험을 위해 dummyimage.com을 사용하여 테스트 이미지를 생성하고 있어요. 이 이미지들은 내재적인 크기를 표시해요.

<div class="content-ad"></div>

dummyimage.com에 차원 매개변수를 사용하여 요청을 보내면 이렇게 됩니다:

https://dummyimage.com/300x100/000/fff

이는 300x100 픽셀 이미지를 렌더링하고 이미지 콘텐츠로 차원을 표시합니다. 즉, 다음과 같이 됩니다:


![image](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_2.png)


<div class="content-ad"></div>

이것은 곧 유용할 것입니다.

프로덕션에서는 물론 실제 이미지를 제공하는 Dynamic Media를 사용할 것입니다.

## Hero 배너

![Hero 배너](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_3.png)

<div class="content-ad"></div>

간단한 확장 - 순진한 방법

히어로 배너는 화면 너비의 100%를 차지합니다. 종횡비는 3:1입니다. 먼저 간단한 방법으로 시작해보죠. 웜업을 해봅시다. 간단한 `img` 태그를 사용해 봅시다:

```js
<style>
  .hero{
    width: 100%;
  }
…
</style>

<div class="hero">
  <img src="https://dummyimage.com/300x100/D3C8D9/000" id="hero" class="hero"/>
</div>
```

결과는 이와 같습니다:

<div class="content-ad"></div>


![Responsive Image](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_4.png)

Also, check out [this link](https://ackoch.github.io/image-zoo/001-hero-naive.html).

It looks like the image quality is not great. The image appears blurry because we are loading an image with an intrinsic size of 300x100, which is smaller than what your screen can handle in terms of pixel display.

I've also included some additional metrics on the test page using JavaScript. You will see the total viewport width, the logical dimension of the image, and the physical dimension. The "logical" dimension is what the browser uses for layout calculations, while "physical" represents the actual pixel density of the screen. I am currently using a MacBook with a "Retina" display, which has a higher pixel density compared to the layout elements. This means that images and fonts are rendered sharper on my screen.

This pixel density is expressed as the device pixel ratio (DPR), which is also displayed on the test page. A higher DPR value is common on modern screens, with most starting above 1. Entry-level devices may have a DPR of 1.5, while an iPhone 14 has a DPR of 3.0.


<div class="content-ad"></div>

결론: 이미지를 선명하고 선명하게 보이게 하려면 더 높은 해상도의 이미지가 필요합니다.

그냥 이미지의 크기를 1500x500으로 늘리면 될 것 같아요:

```js
<div class="hero">
  <img src="https://dummyimage.com/1500x500/D3C8D9/000" id="hero" class="hero"/>
</div>
```

<img src="/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_5.png" />

<div class="content-ad"></div>

위의 링크를 참조해 보세요. (https://ackoch.github.io/image-zoo/001-hero-naive-2.html)

이제 이미지가 매우 선명해 보입니다. 위 스크린샷에서 창 너비를 450px로 줄인 것을 알아챘을 겁니다. 지금은 1500px 이미지를 불러오고 있습니다. 하지만 900px 이미지로도 충분히 좋았을 것입니다. 소개에서 기억하실 것처럼, 파일 크기의 증가는 차원에 비해 과도하게 높습니다: 여기서 많은 대역폭을 낭비하고 있는 것입니다. 특히, 좁은 화면이 모바일 기기에서 더 많이 발견될 가능성이 높다는 점을 고려하면 대역폭이 귀중한 환경에서 더욱 그렇습니다.

"srcset" 접근법

표준 해결책은 간단합니다: 하나 이상의 이미지를 제공해야 합니다 — 이미지 집합, 소스 세트를 제공해야 합니다:

<div class="content-ad"></div>

```js
<img srcset="https://dummyimage.com/300x100/D3C8D9/000 300w,
             https://dummyimage.com/600x200/D3C8D9/000 600w,
             https://dummyimage.com/900x300/D3C8D9/000 900w,
             https://dummyimage.com/1200x400/D3C8D9/000 1200w,
             https://dummyimage.com/1500x500/D3C8D9/000 1500w"
  id="hero"/>
```

여기에는 브라우저가 선택할 수 있는 다양한 해상도의 후보 이미지가 제공됩니다. 브라우저는 각 이미지의 실제 너비를 알 수 없기 때문에 각 후보에 이 정보를 추가해야 합니다.

예를 들어, 다음 표현식

```js
https://dummyimage.com/300x100/D3C8D9/000 300w
```

<div class="content-ad"></div>

위 URL에서 제공하는 이미지가 300픽셀 너비(300w)로 되어있음을 알려줍니다.

첫 번째 테스트를 진행해 보겠습니다:
- Firefox에서 페이지를 엽니다 (정말로 Firefox에서).
- 캐시를 비활성화합니다 (개발 도구 / 네트워크 / 캐시 비활성화).
- 개발 도구 창을 열어둡니다 (!).
- 창 크기를 변경하여 확인합니다.

로딩된 이미지가 필요한 물리적 크기에 맞는지 확인할 수 있습니다. 또한 Firefox가 항상 다음으로 큰 후보를 로딩하고 있다는 것을 알 수 있습니다. 1040픽셀 뷰포트에서 1200픽셀 이미지를 로드하는 등 약간의 대역폭이 낭비되긴 하지만, 수용할만 합니다.

<div class="content-ad"></div>

아래는 Markdown 형식의 테이블입니다.


<img src="/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_6.png" />

Firefox에서 창 크기 변경하기

Firefox와 Chrome이 다르게 작동하는 것을 말씀드렸나요? 아래 예시를 보세요.

이제 Chrome에서 같은 작업을 해봅시다:


<div class="content-ad"></div>

- 크롬에서 페이지를 열어주세요.
- 캐시를 비활성화하세요 (개발자 도구 / 네트워크 / 캐시 사용 안 함)
- 개발자 도구 창을 열어둡시다!
- 창 크기를 변경할 때 창 테두리를 드래그하세요.

작은 창에서 시작하여 차츰 창 크기를 키울 때, 크롬은 더 큰 이미지를로드합니다.

그러나 그 이후에 다시 크기를 줄이면 페이지가 가장 큰 크기로 "붙어" 있습니다. 페이지를 강제 새로 고침할 때만 크롬이 이미지의 작은 버전을 다시로드합니다. 개발자 도구를 닫은 상태에서는 크롬이 다시로드 할 때조차 다시평가하지 않습니다.

<div class="content-ad"></div>

https://ackoch.github.io/image-zoo/001-hero.html을(를) 참고하세요.

이것은 버그가 아닌 기능입니다. 크롬은 이미 더 큰 후보가 메모리에 있을 때 작은 버전의 이미지를 로드하지 않고 다운 샘플링할 수 있습니다. 이것은 성능에 좋지만 새로운 HTML 기능이 어떻게 작동하는지 이해하려고 할 때 혼란스러울 수 있습니다.

그래서 반응형 이미지를 다룰 때는 Firefox를 선호합니다. 이것이 테스트를 조금 더 쉽게 만들어주기 때문입니다.

참고: "sizes" 매개변수를 놓치셨다면. 그렇습니다. 다음 챕터에서 목적을 더 잘 설명하기 위해 고의로 실수한 것입니다.

<div class="content-ad"></div>

# 작은 티저 ½와 ½에서 

![Small Teasers](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_8.png)

우리가 배운 것을 두 작은 티저 구성 요소에 적용해 보겠습니다. 이 두 요소는 50%씩 나란히 표시되어야 합니다:

```js
<div class="flex-container">
  <div class="card">

    <img srcset="https://dummyimage.com/600x600/D5E8D4/000 600w,
                 https://dummyimage.com/800x800/D5E8D4/000 800w,
                 https://dummyimage.com/1200x1200/D5E8D4/000 1200w,
                 https://dummyimage.com/1500x1500/D5E8D4/000 1500w"
         id="card1">

    <p id="dimensions-card1"></p>

  </div>

  <div class="card">
    <img srcset="… 위와 동일하게 …" src="…" id="card2">
    <p id="dimensions-card2"></p>
  </div>

</div>
```

<div class="content-ad"></div>

`800px` 스크린에서 `flex-container`를 감싸도록 스타일에 미디어 쿼리가 있습니다:

```js
@media(max-width: 800px){
  .flex-container{
    flex-wrap: wrap;
  }
}
```

브라우저에서 데모 페이지를 열고 창 크기를 변경해보세요.

![이미지](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_9.png)

<div class="content-ad"></div>

위 링크를 참조해보세요:  [링크](https://ackoch.github.io/image-zoo/002-small-teaser-naive.html)

첫눈에는 모든 것이 잘 보일 것입니다. 그러나 주의 깊게 살펴보면, 로드된 이미지가 이미지의 실제 너비에 맞추어 정렬되지 않는 것을 알 수 있을 겁니다. 이미지 해상도가 뷰포트의 실제 너비에 맞추어 정렬됩니다.

옆으로 나열된 경우에도 브라우저가 1500px 이미지를 로드하고 있습니다. 그러나 800px 이미지로도 충분히 표시될 수 있습니다. 줄바꿈된 경우에도 1200px 이미지가 로드되는 것을 보실 수 있을 겁니다. 이 경우에도 800px 후보 이미지로도 충분합니다.

이게 왜 발생하는 걸까요?

<div class="content-ad"></div>

브라우저는 가능한 빨리 이미지를 로드합니다: `img` 태그를 구문 분석할 때입니다. 그 시점에는 문서가 완전히 로드되지 않았기 때문에 브라우저는 페이지 레이아웃을 완전히 수행할 수 없고 어떤 후보 이미지를로드해야 하는지 결정할 수 없습니다. 따라서 이미지 품질을 잃지 않도록 발견한 가장 큰 후보를로드합니다.

브라우저가 문서가 로드되고 페이지가 완전히 렌더링된 후에 결정하는 것이 더 나을 수 있다고 주장할 수 있습니다. 그러나 이렇게 하면:

a) 이미지로드가 약간 지연되었고 인지적 성능이 느려질 수 있습니다.

b) 이미지가 주변 `div`에 의해 제약되지 않았을 경우(예: width: 100%로 수행한 것처럼) 일부 다시 렌더링이 필요할 수 있습니다.

<div class="content-ad"></div>

브라우저가 조금 더 작은 정보로 이미지를 미리로드하는 것은 성능 및 교환의 상과 관련이 있습니다.

실제로 이 동작은 HTML5 표준에 따라 이루어집니다.

제가 일부러 여기에 오류를 만들었어요. 포인트를 증명하기 위해서 말이에요. MDN의 srcset 문서를 확인해보세요 [6]:

srcset에 "w" 설명자가 포함된 경우, 브라우저는 이 설명자를 sizes 속성과 함께 사용하여 리소스를 선택함니다.

<div class="content-ad"></div>

번역해 드릴게요: "브라우저는 요소 내 이미지의 너비를 모르기 때문에 크기 속성을 명시적으로 정의해야 합니다."

자, 그것을 해봐요:

```js
<div class="card">
  <img srcset="https://dummyimage.com/600x600/D5E8D4/000 600w,
               https://dummyimage.com/800x800/D5E8D4/000 800w,
               https://dummyimage.com/1200x1200/D5E8D4/000 1200w,
               https://dummyimage.com/1500x1500/D5E8D4/000 1500w"
       sizes="40vw"
       id="card1">
       ...
</div>
```

이 속성 sizes="40vw"는 이미지가 뷰포트 너비의 40%를 차지한다는 것을 의미합니다.

<div class="content-ad"></div>

이미지가 화면 가장자리까지 표시되지 않고 양옆과 가운데에 약간의 여백이 남아 있기 때문에 50%가 아닌 40%를 선택했어요. 40%는 대략적인 추정입니다. 의심스러우시다면 더 큰 값을 선택하여 품질을 희생하지 마세요. 이미지가 정확하게 일치할 필요는 없습니다. 왜냐하면 이미지 후보자들은 우리 예제에서 대략 200px 간격으로 있거든요.

이제 이미지들은 sizes 속성에서 정의된 대로 맞춰졌어요:


<img src="/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_10.png" />


https://ackoch.github.io/image-zoo/002-small-teaser-sizes.html

<div class="content-ad"></div>

데스크톱 모드에서는 적어도 문제가 세세해도 어색함이 없지만, 모바일 모드에서는 여전히 괜찮아 보이지 않아요. 이 차이는 크기를 출력하지 않으면 놓칠 수 있는 부분일 거에요:

![Responsive Image Example](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_11.png)

렌더링된 이미지의 물리적 너비는 1000픽셀이에요. 하지만 브라우저는 600픽셀 후보를 불러옵니다. 40vw 미디어 쿼리를 평가하여 1298px * 40% = 519px 이 되기 때문이에요. 따라서 가장 적합한 후보는 600픽셀 이미지예요.

sizes 속성을 개선해야 해요:

<div class="content-ad"></div>

```js
<div class="card">
  <img srcset="https://dummyimage.com/600x600/D5E8D4/000 600w,
               https://dummyimage.com/800x800/D5E8D4/000 800w,
               https://dummyimage.com/1200x1200/D5E8D4/000 1200w,
               https://dummyimage.com/1500x1500/D5E8D4/000 1500w"
       sizes="(max-width: 800px) 90vw,
              (min-width: 801px) 40vw"
       id="card2">
  ...
</div>
```

`sizes` 속성은 미디어 쿼리 / 너비 쌍의 목록을 가져옵니다. 여기서 우리는 다음을 지정합니다:

- 뷰포트의 800px까지 이미지는 뷰포트 너비의 90%를 차지합니다 (간격 포함한 단일 열).
- 801px 이상부터 40%만으로도 충분합니다 (간격을 고려한 두 열).

이제 모든 경우가 적절한 이미지 차원으로 렌더링됩니다.

<div class="content-ad"></div>


![Image](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_12.png)

See: [link](https://ackoch.github.io/image-zoo/002-small-teaser-sizes-responsive.html)

# Interlude: The CMS Point of View

Let’s take a short break here.


<div class="content-ad"></div>

지난 섹션에서 브라우저가 이미지를 즉시 로드할 수 있도록 몇 가지 추가적인 마크업이 필요하다고 설명했습니다. 브라우저의 관점에서는 합리적인 접근 방식입니다. 그러나 아키텍처적인 측면에서는 이 해결책이 최적이라고 생각하지 않습니다. 특히 CMS 애플리케이션의 맥락에서는:

a) 구성 요소는 적합한 미디어 쿼리를 렌더링할 수 있도록 렌더링되는 컨텍스트를 인지해야 합니다. 뷰포트 너비의 1/1을 차지하는 페이지와 너비의 1/3만 차지하는 여백 열에서 동일한 탄성 "이미지" 구성 요소를 재사용하려면 해당 다른 컨텍스트에 대해 명시적으로 구성해야 합니다. (예를 들어 AEM에서 컴포넌트 정책을 사용할 수 있습니다). 이미지 구성 요소를 1/3 뷰포트 너비만 사용하는 티저로 재사용하는 경우 더 복잡해집니다.

b) 일반적으로 CSS에서 분리되어 유지되는 미디어 쿼리 정의가 HTML 마크업으로 누설됩니다. 이제 CSS와 HTML에서 미디어 쿼리를 일치시켜야 하며, 이는 다중 테넌트 플랫폼에서 공유된 컴포넌트 라이브러리를 재사용하기 더 복잡하게 만듭니다. 다른 스타일링을 위해 CSS만 변경할 수 없습니다. 컴포넌트의 렌더링을 매개변수화해야 합니다.

c) "버그"를 발견하기 어렵습니다. 우리의 예에서, 해상도가 너무 높거나 너무 낮은지 확인하는 것은 상대적으로 쉬웠습니다. 그래나 이미지의 고유한 크기를 알려주기 때문에 가능했습니다. 사진에서는 문제가 너무 낮은 해상도일 때만 발생합니다. 우리가 해상도를 "과다 할당"하고 있는지 파악하기가 훨씬 더 어렵습니다.

<div class="content-ad"></div>

또한, 브라우저 캐시는 혼란을 가중시킵니다. 테스트는 정말로 어렵고 거의 모든 테스터들이 반응형 이미징 개념을 잘 이해하지 못합니다.

# 텍스트 이미지

![텍스트 이미지](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_13.png)

아직 끝나지 않았습니다. 다음 사용 사례, 텍스트 이미지 구성 요소에는 다른 측면이 있습니다.

<div class="content-ad"></div>

데스크톱 화면에서는 이미지의 너비가 33%이고 1:1 비율을 갖도록 설정되어야 합니다. 모바일 장치에서는 이미지가 100%로 표시되며 3:1 형식으로 표시됩니다. 단순 축소만으로는 도움이 되지 않습니다.

우리는 주위에 `div`를 사용하여 높이를 제한하고 `img`를 "object-fit: cover"로 설정할 수 있습니다. 하지만 그렇게 하면 여전히 전체 이미지를 전송하고 그 중 2/3을 버려야 합니다. 그리고 잘라내기는 간단히 중심을 자를 것입니다.

다행히도 두 가지 고정된 종횡비만 있는 것을 미리 알고 있습니다. 그리고 언제 어떤 것을 적용해야 하는지 정확히 알고 있습니다. 그래서 `picture` 태그를 사용할 수 있습니다:

```jsx
<picture class="image">
  <source srcset="
      https://dummyimage.com/100x100/C0CCDE/000&text=square+500 500w,
      https://dummyimage.com/200x200/C0CCDE/000&text=square+600 600w,
      https://dummyimage.com/300x300/C0CCDE/000&text=square+700 700w,
      https://dummyimage.com/600x600/C0CCDE/000&text=square+800 800w,
      https://dummyimage.com/800x800/C0CCDE/000&text=square+900 900w,
      https://dummyimage.com/1000x1000/C0CCDE/000&text=square+1000 1000w,
      https://dummyimage.com/1200x1200/C0CCDE/000&text=square+1200 1200w,
      https://dummyimage.com/1500x1500/C0CCDE/000&text=square+1500 1500w"
    sizes="30vw"
    media="(min-width: 801px)">

  <source srcset="
      https://dummyimage.com/500x166/C0CCDE/000&text=panorama+700 700w,
      https://dummyimage.com/600x200/C0CCDE/000&text=panorama+800 800w,
      https://dummyimage.com/900x300/C0CCDE/000&text=panorama+900 900w,
      https://dummyimage.com/900x300/C0CCDE/000&text=panorama+1000 1000w,
      https://dummyimage.com/900x300/C0CCDE/000&text=panorama+1200 1200w,
      https://dummyimage.com/1500x500/C0CCDE/000&text=panorama+1500 1500w"
      sizes="85vw"
      media="(max-width: 800px)">

  <img src="https://dummyimage.com/900x300/C0CCDE/000&text=panorama+900" 
       id="card3" >

</picture>
```

<div class="content-ad"></div>

이 예시의 표 태그를 Markdown 형식으로 변경하세요.

<div class="content-ad"></div>


![Responsive Image and Dynamic Media](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_14.png)

이런! 이미지를 30vw로 구성했던 것 같아요. viewport 너비의 30%로 설정했었지만, 실제로는 주요 콘텐츠 영역의 30%만 필요한 거 같네요. 낮은 해상도에서는 콘텐츠 영역과 viewport가 동일한 너비이기 때문에 문제가 없었어요. 1024px 이상에서는 콘텐츠 영역의 너비가 고정되어 확장되지 않아요. 우리는 잘못된 참조점을 사용하여 필요한 이미지 너비를 불필요하게 늘리고 있어요: 1024px * 30% ~ 300px 크기의 이미지가 필요한데, 1500px 너비의 viewport에서는 1500px * 30% ~ 500px 이미지를 요청하고 있어요 (또는 2배 레티나 디스플레이를 사용하는 경우 약 600px 대 약 1000px). 

문제는 주요 콘텐츠 영역의 max-width 제약이 소스 요소의 미디어 쿼리에 반영되지 않는다는 것이에요. 이를 수정하기 위해 1024px 이상의 다른 브레이크포인트를 추가하는 것으로 해결할 수 있어요:


```js
<source srcset="https://dummyimage.com/500x500/C0CCDE/000&text=square+600"
        media="(min-width: 1024px)">
```

<div class="content-ad"></div>

여기를 참고해 주세요: https://ackoch.github.io/image-zoo/003-text-image-art-direction.html


![이미지](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_15.png)


내 컴퓨터에서는 잘 작동하고 아마 당신의 것에서도 잘 작동할 것입니다. 그러나 브라우저의 논리적 해상도보다 이미지에서 두 배 더 많은 픽셀을 표시할 수 있는 화면이 있음을 기억하세요. 위 예제에서는 2배의 장치 픽셀 비율(1024 x 33% * 2 ≈ 675)을 가정합니다.

고정 크기 이미지에 대해 서로 다른 장치 픽셀 비율을 구분하려면 srcset 정의에서 약간 다른 구문을 사용합니다.

<div class="content-ad"></div>

```js
<source srcset="https://dummyimage.com/300x300/C0CCDE/000&text=square+300 1x,
                https://dummyimage.com/600x600/C0CCDE/000&text=square+600 2x"
        media="(min-width: 1024px)">
```

여기에서는 저해상도 화면에 300px 이미지를 사용하고 고해상도 화면에는 600px 변형을 사용합니다.

결과는 여기에서 확인할 수 있습니다: https://ackoch.github.io/image-zoo/003-text-image-art-direction-capped-dpr.html

# 사이드노트: 파라미터 가져오는 방법

<div class="content-ad"></div>

`picture` 및 `srcset`를 사용하려면 정의해야 할 많은 매개변수가 있습니다. 이러한 매개변수를 어떻게 얻을까요? 이는 상황에 따라 다릅니다. 아주(!) 잘 설계된 스타일 가이드가 있다면 해당 스타일 가이드에서 미디어 쿼리를 계산할 수도 있습니다. 그러나 저는 구현된 페이지를 자세히 살펴보고 상식을 적용하는 것이 더 실용적이라고 생각했습니다. 일반적으로 100px 또는 200px 간격으로 이미지 후보를 제공합니다. 그래서 그것은 정확한 과학은 아닙니다. 특정 브레이크포인트에서 이미지가 뷰포트의 약 1/3을 차지한다는 것을 알고 있고, 요소 사이의 공간을 고려하여 sizes="30vw"로 안전하게 정의할 수 있습니다. 일부 실험을 통해 이를 28%로 낮출 수도 있습니다.

테스트하는 모니터의 디바이스 픽셀 비율을 알아야 합니다. 즉, 특정 브레이크포인트에서 논리적인 차원을 300px부터 800px 사이로 측정한다면, 1x 모니터와 좁은 뷰포트를 위해 300px 이미지 후보를 제공하고 넓은 화면 2x 모니터를 위해 1600px 버전을 제공해야 합니다.

# 큰 티저

![이미지](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_16.png)

<div class="content-ad"></div>

첫눈에는 Large Teaser가 텍스트와 이미지 구성요소처럼 보입니다. 그러나 여기서는 이미지의 높이를 항상 텍스트 상자의 높이에 맞추고 싶습니다.

데스크톱에서 이미지는 화면 너비의 33%를 사용합니다. 모바일 화면에서는 이미지가 쌓이고 화면 너비의 100%를 사용하며 3:1로 표시됩니다. 텍스트 이미지 구성요소와는 달리 이미지의 높이는 가변적입니다. 이미지의 높이는 텍스트 블록의 높이로 정의됩니다. 긴 복사 텍스트는 보다 늘어진 형식으로 이어집니다:

![이미지 1](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_17.png)

![이미지 2](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_18.png)

<div class="content-ad"></div>


![Image](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_19.png)

The image can have any aspect ratio and does not conform to any of the pre-defined formats. We can see that it’s getting dynamically narrower the longer the text gets. Remember, that Dynamic Media’s Smart Cropping requires an exact and pre-defined aspect ratio.

There are two ways to solve that:

## Dynamic Cropping without Dynamic Media


<div class="content-ad"></div>

Dynamic Media를 사용하지 않으면 이미지의 크기를 제한하기 위해 `img` 주위에 래핑 된 `div`를 만들 수 있습니다. 그런 다음 `img` 태그는 다음과 같이 스타일을 지정할 수 있습니다.

```js
height: 100%;
width: 100%;
object-fit: cover;
position: absolute;
```

기본적으로 이미지는 상대적인 측면에서 고르게 잘립니다. object-position 매개변수로 영향을 받을 수 있습니다.

```js
object-position: 50% 50%;
```

<div class="content-ad"></div>

가운데 맞춤 자르기를 나타냅니다.

`object-position: 0% 100%;`은 이미지를 왼쪽에서 0%, 위쪽에서 100% (즉, 아래에서) 위치에 배치하며, 이는 기본적으로 오른쪽 상단에서 자르는 것을 의미합니다. 다시 말해, 이는 남서쪽 사분면에 초점이 있음을 가정합니다.

<div class="content-ad"></div>

브라우저에서는 여전히 전체 이미지를 전송하지만 가장자리가 잘립니다. 따라서 여기에서는 대역폭을 낭비하고 있습니다.

각 이미지마다 객체 위치를 정의해야 합니다. 전역 스타일 시트에서 이를 정의하는 것은 의미가 없습니다. 각 이미지에는 다른 자르기 매개변수가 필요합니다.

콘텐츠 관리 시스템에서는 일반적으로 작성자에게 이러한 매개변수를 제공하도록 요청합니다. 예를 들어 Part I에서 제안한 3x3 매트릭스로요. 또는 작성자에게 모든 가장자리에서 안전하게 자를 수 있는 이미지만 사용하도록 권장할 수도 있습니다.

![Responsive Image](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_20.png)

<div class="content-ad"></div>

왼쪽의 사진은 중앙에 아무것도 없습니다. 기본 모드에서 브라우저는 사진의 흥미로운 부분을 자르게 될 것입니다. 오른쪽의 이미지는 안전하게 제거할 수 있는 가장자리의 많은 배경이 있습니다.

# Dynamic Media로 동적 자르기

Dynamic Media는 실시간으로 스마트 자르기를 적용할 수는 없지만, 저자 경험 및 성능을 향상시키는 몇 가지 기능을 제공합니다:

- 안전하게 중앙에서 자를 수 있는 영역을 정의하기 위해 스마트 사전 자르기를 사용할 수 있습니다.
- 서버 측에서 동적 자르기를 적용하여 수행할 수 있습니다. 이를 통해 브라우저에서의 (가중치가 지정된) 중앙 자르기와 동일한 시각적 결과를 얻을 수 있습니다. 다만 이 작업은 서버에서 수행됩니다. 따라서 전송되는 이진 데이터가 작아지며 페이지 렌더링이 더욱 빨라집니다.

<div class="content-ad"></div>

스마트 프리크롭은 제품 설명서에 나오는 기능이 아니에요. 일반 스마트 크롭핑을 적용할 수 있는 간단한 방법이에요.

![이미지](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_21.png)

원본 이미지로 스마트 크롭을 먼저 만들어 브라우저에 전달해서 나머지 부분을 자르는 것이 아이디어에요. 첫 번째로 스마트 크롭(그리고 수동 보정도 함께)을 사용하면 가장자리가 충분한 영역을 쉽게 찾을 수 있어요.

# 다이나믹 크롭

<div class="content-ad"></div>

Dynamic Media에는 또 다른 강점이 있습니다. 우리는 다음과 같은 URL을 사용하여 서버 측에서 자르기를 할 수 있습니다:

https://techsupporteu.scene7.com/is/image/AEMEMEAPractice/AdobeStock_636568731?fit=crop&wid=300&hei=100

fit=crop 매개변수는 Dynamic Media에게 이미지를 너비와 높이로 정의된 사각형에 맞추어 그려진 명시적들을 잘라 제거하세요.

만약 우리가 HTML5만으로 후보 중 하나를 선택하고 있다면, 이것은 특별히 유용하지 않을 수 있습니다. 우리가 동적 자르기를 위해 필요한 정적 URL이나 URL의 범위를 정의할 수 없기 때문입니다. 우리가 사용자 지정 이미지 로더를 구현할 때 Dynamic Media의 동적 자르기 기능을 완전히 최대한 활용하는 방법과 다이나믹 자르기 기능을 완전히 활용하는 방법에 대해 다룬 이 시리즈의 제4부를 참고하십시오.

<div class="content-ad"></div>

# AEM 코어 컴포넌트 만들기

우리는 이제 모든 중요한 사용 사례를 모두 조합했습니다.

어차피 AEM 코어 컴포넌트를 사용하는 게 어떨까요? 그게 편하지 않을까요?

안타깝지만 그렇지 않아요. AEM 코어 컴포넌트는 다이나믹 미디어를 위한 제한된 지원만 제공합니다. 또한 컴포넌트마다 지원하는 정도가 다릅니다. 지원하는 내용의 몇 가지 예시는 다음과 같습니다:

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-23-ResponsiveImagingandDynamicMediadoneRightPartIII_22.png)

이미지 구성 요소는 스마트 크로핑을 지원합니다. 그러나 비율적인 스케일링은 허용되지 않습니다. 모든 뷰포트 크기에서 원본 해상도를 사용합니다. 아트 방향이나 브라우저 크로핑은 지원되지 않습니다. 하지만 이러한 구성 요소에는 대개 필요하지 않습니다.

이미지 목록은 브라우저에서 크로핑되며 이는 스마트 크로핑에 이상적인 사용 사례일 것입니다. 적어도 이미지를 축소합니다.

티저는 브라우저에서만 크로핑됩니다. 이는 스마트 사전 크로핑에 좋은 후보였을 것입니다. 이미지에 대한 아트 방향을 지원하지 않지만 데스크탑과 모바일의 형식은 매우 다릅니다. 다시 말해, 기본 크로핑만 적용되어 대역폭을 낭비하며 최적의 결과를 얻지 못합니다.


<div class="content-ad"></div>

모든 구성 요소의 스케일링 단계는 이미지 코어 구성 요소의 정책에서 정의됩니다. 이 구성은 모든 구성 요소에 적용되어야 하므로 srcset에 후보 URL이 매우 긴 목록으로 생성됩니다. 기본적으로 100px에서 1600px까지 13개의 후보 이미지가 있습니다. 저는 각 구성 요소에 개별적인 srcset을 구성하는 것이 더 나았을 것 같아요. 이것은 조금은 미학적인 문제입니다. 전체 HTML이 조금은 늘어납니다만 너무 많이 늘지는 않아요.

지원이 더 좋을 수 있다는 것을 깨달은 첫 번째 사람은 아니에요. wcm.io [7] 프로젝트에는 동적 미디어에 대한 더 나은 지원을 약속하는 고급 미디어 핸들러가 있습니다. 하지만 아직 시도해보지는 않았어요.

# 결론

파트 IV에서는 동적 미디어의 대역폭을 최대한 끌어내는 사용자 정의 이미지 로더를 구현하는 방법에 대해 다룰 예정입니다.

<div class="content-ad"></div>

# 감사의 말

친애하는 동료들인 Eryk Lagun과 Rob Freeman에게 영감, 교정 및 사실 확인에 대해 감사드립니다.

# 참고 문헌

[1] https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

<div class="content-ad"></div>

[2] [Adobe Dynamic Media Developer Resources - Image Serving API - HTTP Protocol Reference - Command Reference](https://experienceleague.adobe.com/docs/dynamic-media-developer-resources/image-serving-api/image-serving-api/http-protocol-reference/command-reference/c-command-reference.html)

[3] [Adobe Experience Manager Learn - Smart Crop Feature Video Use](https://experienceleague.adobe.com/docs/experience-manager-learn/assets/dynamic-media/images/smart-crop-feature-video-use.html)

[4] [Adobe Experience Manager Cloud Service - Dynamic Media Image Profiles](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/assets/dynamicmedia/image-profiles.html)

[5] [Image Zoo GitHub Repository](https://github.com/ackoch/image-zoo/blob/master/README.md)

<div class="content-ad"></div>

[6] https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset

[7] https://wcm.io/handler/media/usage.html