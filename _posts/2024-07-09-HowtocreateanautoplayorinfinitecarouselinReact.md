---
title: "React에서 자동 재생 또는 무한 캐러셀 만드는 방법 "
description: ""
coverImage: "/assets/img/2024-07-09-HowtocreateanautoplayorinfinitecarouselinReact_0.png"
date: 2024-07-09 14:19
ogImage:
  url: /assets/img/2024-07-09-HowtocreateanautoplayorinfinitecarouselinReact_0.png
tag: Tech
originalTitle: "How to create an autoplay or infinite carousel in React 👀"
link: "https://medium.com/@divyakoneti0001/how-to-create-an-autoplay-or-infinite-carousel-in-react-d9f9bff11048"
isUpdated: true
---

프로젝트를 진행하며 React에서 자동 재생되는 캐러셀을 구현해야 했어요. 프로젝트에서 작은 기능을 위해 사전 제작된 라이브러리를 사용하고 싶지 않았기 때문에, 몇 가지 아이디어를 고안하고 기능을 이해하기 위해 몇 가지 기사를 읽었어요.

![이미지](/assets/img/2024-07-09-HowtocreateanautoplayorinfinitecarouselinReact_0.png)

## 캐러셀이란?

캐러셀은 여러 콘텐츠가 하나의 공간을 차지할 수 있게 해줍니다. 캐러셀은 일반적으로 그리드 형태의 콘텐츠를 표시하고, 정의된 차원 내에 콘텐츠를 맞출 수 있도록 스크롤할 수 있어요. 사용자 경험을 향상시키고 앱을 보다 인터랙티브하게 만들어 줍니다.

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

어떤 해결책을 찾기 전에, 자동 재생 카루셀을 만드는 단계별 프로세스를 이해해봅시다.

![이미지](/assets/img/2024-07-09-HowtocreateanautoplayorinfinitecarouselinReact_1.png)

- 카루셀-컨테이너: 카루셀 전체의 차원을 정의하는 컨테이너가 필요합니다. 카루셀의 높이와 너비, 항목의 배치는 이 컨테이너에서 정의됩니다.
- 카루셀-트랙: 항목을 무한한 스트립에 보관해야 하며, 항목의 넘침을 숨겨서 카루셀에 필요한 수의 항목만 표시합니다.
- 카루셀-아이템: 아이템은 이미지나 이미지와 일부 텍스트, 또는 내용을 설명하는 아이콘 등 어떤 내용이든 포함할 수 있습니다.

구현할 시간입니다! 🥳

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

- create-react-app을 사용하여 React 프로젝트를 설정하세요. 머신에 Node `= 14.0.0 및 npm `= 5.6이 필요합니다. 프로젝트를 생성하려면 다음을 실행하세요:

2. AutoplayCarousel.js 및 CarouselItem.js라는 파일을 src 폴더에 만드세요.

3. 캐러셀 항목 섹션에서 콘텐츠 구성을 정의하기 위해 carousel-config.js 파일을 만드세요.

## 작동 방식 🤯

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

- 우리는 두 개의 컴포넌트 - CarouselContainer와 CarouselItem이 필요합니다.
- CarouselContainer는 캐러셀 항목을 제어하는 부모 컴포넌트가 될 것입니다.
- CarouselItem은 캐러셀 내 개별 항목의 내용을 표시하는 데 사용될 것입니다.
- CarouselContainer 컴포넌트에서는 항목 목록의 복제본이 필요한데, 이는 두 개의 목록을 연달아 렌더링하여 무한 캐러셀을 형성하는 것을 의미합니다.
- 이제 컴포넌트에 일부 스타일을 추가해 봅시다.

## 스타일링 🎨

- 실제 캐러셀의 크기인 높이와 너비를 정의하는 부모 div를 "carousel-container" 클래스로 씁니다.
- 캐러셀 컨테이너의 오버플로우 속성을 "hidden"으로 설정하여 트랙에서 오버플로우하는 항목을 숨깁니다.
- 캐러셀 이동을 돕는 "carousel-track" 클래스가 있는 다른 div를 생성하고, 이를 캐러셀 컨테이너의 두 배인 너비(200%)로 설정하여 무한 목록 형태로 만듭니다.

6. 다음 단계는 캐러셀의 슬라이드 전환을 정의하는 것입니다. 우리는 carousel-track에 전환을 추가합니다.

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

마우스를 호버하면 캐러셀이 일시 정지되도록 hover에 animation-play-state를 추가했어요. 사용자가 캐러셀에서 항목을 선택할 수 있도록하여 더 나은 사용자 경험을 제공합니다.

![이미지](https://miro.medium.com/v2/resize:fit:1200/1*3xXqQeXPGJa15Mlcjg8pjA.gif)

여기까지입니다 😬 코딩 즐기세요! 궁금한 점이나 의견은 언제든지 환영합니다.
