---
title: "HTML | 구분자 정리"
description: ""
coverImage: "/assets/img/2024-05-02-TheHTMLdivider_0.png"
date: 2024-05-02 00:37
ogImage: 
  url: /assets/img/2024-05-02-TheHTMLdivider_0.png
tag: Tech
originalTitle: "The HTML | divider"
link: "https://medium.com/@mikael-ainalem/the-html-divider-e724ad7f82d8"
---


## 섹션 구분기를 활용한 창의적인 방법에 관한 이야기

![이미지](/assets/img/2024-05-02-TheHTMLdivider_0.png)

현재 많은 웹 페이지들이 섹션으로 구성되어 있습니다. 이는 웹 페이지를 디자인하는 매우 자연스러운 방법입니다. 서로 다른 제품, 주제 또는 아이디어를 소개하는 각 섹션은 웹 사이트 컨텐츠의 특정 측면을 독자에게 안내합니다.

대부분의 경우, 이러한 섹션에는 명확한 구분선이 포함되어 있습니다. 두 섹션을 분리하는 수직 선이 일반적으로 있습니다. 이 구분은 서로 다른 배경색을 사용하여 만드는 것이 전형적인 방법입니다. 독자에게 뚜렷한 차이점을 알려줌으로써 웹 페이지를 통해 읽는 동안 한 섹션에서 다른 섹션으로 이동하고 있다는 것을 분명하게 알려줍니다.

<div class="content-ad"></div>

그러나 수직선이 꼭 필요한가요? 이 구분선을 조금 다양하게 바꿔볼까요? 이 기사에서는 창의적으로 구분선의 모양을 변경하는 방법을 살펴봅니다. 함께 해봐요!

예를 들어, medium.com/business 페이지를 살펴보겠습니다. 이 페이지는 페이지 상단에 두 개의 별도 섹션이 있습니다. 상단 섹션은 명확한 노랑 오렌지 배경색을 가지고 있으며, 그 다음 섹션은 흰색 배경을 가지고 있습니다. 아래에서 확인해 보세요:

![Medium](https://miro.medium.com/v2/resize:fit:1000/1*Nr3WmUVmPTnJ7TlWxS_Ejw.gif)

## 대각선 상에

<div class="content-ad"></div>

먼저 가장 명백한 것은 줄을 기울이는 것입니다. 회전 및 기울인 웹 콘텐츠를 만드는 몇 가지 방법이 있습니다. 어떻게 하면 이와 같은 분할자를 만들 수 있는지 살펴보겠습니다. SVG를 사용하여 위와 같은 분할자가 어떻게 보이는지 확인해 봅시다. 내 의견으로는 SVG가 간단한 2D 그래픽 및 자체 콘텐츠 그리기 작업에 가장 쉬운 방법이라고 생각합니다.

다음은 SVG 코드에서 대각선 선(삼각형)을 만드는 코드입니다.

```js
<svg
  viewBox="0 0 100 100"
  style="width: 100%; height: 120px;position: relative;display: block;"
  preserveAspectRatio="none"
>
  <rect x="0" y="0" width="100" height="100" fill="white"></rect>
  <path fill="#ffc017" d="M 0 0 L 100 0 L 100 100 Z"></path>
</svg>
```

위 코드는 100x100 단위의 크기 조정 가능한 벡터를 구성합니다. SVG 컨테이너 내부에는 배경에 해당하는 사각형(rect)과 삼각형을 형성하는 path가 있습니다. 삼각형만 만들고 컨테이너의 CSS 배경색 규칙을 설정할 수도 있었지만, 위의 방법이 더 가독성이 좋습니다. 삼각형은 사실상 네 개의 선으로 세 점(0, 0), (100, 0), (100, 100)을 연결하는 채워진 경로(path)입니다.

<div class="content-ad"></div>

여기서 또 하나 중요한 점은 preserveAspectRatio 속성이 있는데, 이 값은 none으로 설정되어 있습니다. 이 속성은 분할 요소를 늘리고, 따라서 웹 페이지를 크기 조정할 때 분할선이 반응형으로 만들어집니다.

위 내용이 삽입되고 복사하여 웹 페이지에 붙여넣을 때 어떻게 보이는지 살펴보겠습니다. 한번 봐볼까요:

![대각선 라인 예시](https://miro.medium.com/v2/resize:fit:920/1*ySxzc9-j0F-F6BE7P0rr7g.gif)

참 멋지죠? 대각선 라인 하나만으로도 웹 페이지가 돋보이고 조금 덜 평범해 보입니다.

<div class="content-ad"></div>

## 곡선 구분선

이제 그것을 휘게 만들어 봅시다! 직선 대각선은 구분선을 조금 더 재미있게 만듭니다. 그러나 SVG의 진정한 장점은 곡선 또는 베지에 곡선이라 불리는 것을 만드는 것이 얼마나 쉬운지입니다. SVG를 약간 수정함으로써 훨씬 부드럽게 만들 수 있습니다.

Inkscape(오픈 소스 벡터 편집 도구)에서 삼각형을 곡선 구분선으로 변환하는 것은 어떻게 되는지 보겠습니다. 우리가 해야 할 일은 추가 노드를 하나 추가하고 곡선 노드로 만드는 것뿐입니다. 이렇게 보입니다:

![image](https://miro.medium.com/v2/resize:fit:920/1*uvW3JsTN9zd-WUlOgrb7CA.gif)

<div class="content-ad"></div>

Inkscape의 XML 편집기(편집 - XML 편집기)를 살펴보면 다음과 같은 마크업이 나타납니다.

```html
<svg
  viewBox="0 0 100 100"
  style="width: 100%; height: 120px;position: relative;display: block;"
  preserveAspectRatio="none"
>
  <rect x="0" y="0" width="100" height="100" fill="white"></rect>
  <path fill="#ffc017" d="M 0,0 H 100 V 100 C 100,100 92.831192,62.058256 65,35 37.168808,7.941744 0,0 0,0 Z"></path>
</svg>
```

웹 페이지에 복사하면 다음과 같은 결과가 나타납니다.

![이미지](https://miro.medium.com/v2/resize:fit:1000/1*XKSRA8gwMwCtptNrmNMfxw.gif)

<div class="content-ad"></div>

## 창의적으로 생각하기

다른 멋진 옵션은 CSS 패턴입니다. 이 사이트에서 생성한 배경 패턴을 복사해보면 다음과 같습니다:

![Background Pattern](https://miro.medium.com/v2/resize:fit:1000/1*ZXrSvHFVjU-d0PjeNc6TsA.gif)

그럼 이만 마치도록 하겠습니다! 지금까지 읽어주셔서 감사합니다. HTML 디바이더가 어떻게 보일지, 행운을 빕니다.

<div class="content-ad"></div>

이런 기사를 즐기셨다면 꼭 클랩(clap), 공유하고 제 작품을 지원해주세요. 건배!