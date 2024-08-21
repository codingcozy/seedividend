---
title: "HTML CSS, JavaScript로 반응형 카드 슬라이더 만드는 방법"
description: ""
coverImage: "/assets/img/2024-07-06-HowtoCreateResponsiveCardSliderinHTMLCSSJavaScript_0.png"
date: 2024-07-06 02:16
ogImage:
  url: /assets/img/2024-07-06-HowtoCreateResponsiveCardSliderinHTMLCSSJavaScript_0.png
tag: Tech
originalTitle: "How to Create Responsive Card Slider in HTML CSS , JavaScript"
link: "https://medium.com/@codingnepal/how-to-create-responsive-card-slider-in-html-css-javascript-1da1f5ddb78e"
isUpdated: true
---

/assets/img/2024-07-06-HowtoCreateResponsiveCardSliderinHTMLCSSJavaScript_0.png

다양한 웹 사이트에서 카드 또는 이미지 슬라이더를 본 적이 있을 것입니다. 하지만 자체적으로 만들어 본 적이 있나요? 이러한 종류의 슬라이더를 만드는 것은 간단합니다. 특히 SwiperJS를 사용하면 더욱 간편합니다. SwiperJS는 최신, 터치 친화적이며 반응형 슬라이더를 제공하는 주요 라이브러리입니다.

이 블로그 포스트에서는 HTML, CSS 및 JavaScript(SwiperJS)를 사용하여 반응형 카드 슬라이더를 만드는 방법과 글래스모피즘 효과를 적용하여 어떻게 매력적으로 만들 수 있는지 안내해 드리겠습니다. 이 포스트를 마치면 시각적으로 매력적이고 상호작용이 가능한 슬라이더를 웹 사이트 프로젝트 또는 포트폴리오에 적용할 수 있게 될 것입니다.

SwiperJS를 사용하지 않고 바닐라 JavaScript로 슬라이더를 만들고 싶다면, HTML CSS & JavaScript를 사용한 반응형 이미지 슬라이더 블로그 포스트를 확인해보세요. 바닐라 JavaScript로 슬라이더를 만드는 것은 슬라이더의 기본 메커니즘을 이해하고 JavaScript 기술을 향상시킬 수 있습니다.

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

# HTML CSS 및 JavaScript를 사용한 반응형 카드 슬라이더 비디오 강좌

만약 비디오 강좌를 선호하신다면, 위의 YouTube 비디오는 훌륭한 자원입니다. 각 코드 라인을 설명하고 프로젝트를 만드는 과정을 쉽게 이해할 수 있도록 주석이 달려 있습니다. 만약 읽는 것을 선호하거나 단계별 안내가 필요하다면, 계속해서 이 포스트를 따라가보세요.

# HTML 및 JavaScript를 사용한 반응형 카드 슬라이더 생성 단계

HTML, CSS, 그리고 JavaScript (SwiperJS)를 사용하여 반응형 카드 슬라이더를 만들기 위해 이 간단한 단계별 지침을 따라해 보세요.

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

- 마음에 드는 이름의 폴더를 만들어 주세요. 예를 들면 card-slider 같은 이름으로 지어주세요.
- 폴더 안에 index.html, style.css, script.js 파일을 만들어주세요.
- 이미지 폴더를 다운로드하고 프로젝트 디렉토리에 넣어주세요. 이 폴더에는 카드 슬라이더를 만들 때 필요한 모든 이미지가 들어있습니다. 물론 별도의 이미지를 사용해도 상관없어요.

index.html 파일에는 다양한 의미 있는 태그와 SwiperJS CDN 링크를 추가하여 카드 슬라이더 레이아웃을 만들어주세요. 스타일.css 파일에는 카드 슬라이더를 디자인하고 세련되고 현대적인 유리 효과를 줘보세요. 색상, 글꼴, 배경 등 다양한 CSS 속성을 실험하여 슬라이더를 더 매력적으로 만들어보세요.

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
/* 구글 폰트(Montserrat) 가져오기 */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: url("images/bg.jpg") #030728 no-repeat center;
}

.slider-wrapper {
  overflow: hidden;
  max-width: 1200px;
  margin: 0 70px 55px;
}

.card-list .card-item {
  height: auto;
  color: #fff;
  user-select: none;
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  backdrop-filter: blur(30px);
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.card-list .card-item .user-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 40px;
  border: 3px solid #fff;
  padding: 4px;
}

.card-list .card-item .user-profession {
  font-size: 1.15rem;
  color: #e3e3e3;
  font-weight: 500;
  margin: 14px 0 40px;
}

.card-list .card-item .message-button {
  font-size: 1.25rem;
  padding: 10px 35px;
  color: #030728;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  background: #fff;
  border: 1px solid transparent;
  transition: 0.2s ease;
}

.card-list .card-item .message-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #fff;
  color: #fff;
}

.slider-wrapper .swiper-pagination-bullet {
  background: #fff;
  height: 13px;
  width: 13px;
  opacity: 0.5;
}

.slider-wrapper .swiper-pagination-bullet-active {
  opacity: 1;
}

.slider-wrapper .swiper-slide-button {
  color: #fff;
  margin-top: -55px;
  transition: 0.2s ease;
}

.slider-wrapper .swiper-slide-button:hover {
  color: #4658ff;
}

@media (max-width: 768px) {
  .slider-wrapper {
    margin: 0 10px 40px;
  }

  .slider-wrapper .swiper-slide-button {
    display: none;
  }
}
```

스크립트 파일인 script.js에 SwiperJS를 초기화하는 JavaScript 코드를 추가하고, 카드 슬라이더를 작동시키세요.

```js
const swiper = new Swiper(".slider-wrapper", {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,

  // 페이지네이션 버튼
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // 네비게이션 화살표
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // 반응형 뷰포인트
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
```

설정을 마쳤습니다! 코드를 올바르게 추가했다면, 카드 슬라이더를 확인할 준비가 되었습니다. 브라우저에서 index.html 파일을 열어 슬라이더를 확인해보세요.

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

# 결론과 마지막으로

이러한 단계를 따라가면, HTML, CSS 및 JavaScript(SwiperJS)를 사용하여 반응형 카드 슬라이더를 만들었습니다. 이 슬라이더 프로젝트는 웹 개발의 기본을 이해하는 데 도움이 되는 동시에 라이브러리를 사용하여 쉽게 상호작용 및 유용한 웹 구성 요소를 만드는 능력을 보여줍니다.

슬라이더를 자유롭게 사용자 정의하고 다양한 설정으로 실험하여 나만의 것으로 만들어보세요. 더 많은 사용자 정의 세부 사항을 알아보려면 SwiperJS 문서를 확인해보세요.

추가 영감을 얻으려면 소스 코드와 함께 제가 작성한 10+개의 최고 이미지 슬라이더 블로그 게시물을 확인해보세요. 이 중 일부 슬라이더는 SwiperJS를 활용하고, 다른 것들은 Owl Carousel을 사용하며 다른 것은 순수 JavaScript로 작성되었으며, 학습할 수 있는 다양한 예시를 제공합니다.

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

슬라이더를 만드는 동안 문제가 발생하면 "다운로드" 버튼을 클릭하여이 프로젝트의 소스 코드 파일을 무료로 다운로드할 수 있습니다. 또한 "실시간 보기" 버튼을 클릭하여 실시간 데모를 볼 수도 있습니다.

실시간 데모 보기

코드 파일 다운로드

원문은 2024년 7월 5일에 https://www.codingnepalweb.com에서 게시되었습니다.
