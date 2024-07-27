---
title: "CSS3만 사용해서 동적 글꼴 크기 설정하는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-Dynamicfont-sizeusingonlyCSS3_0.png"
date: 2024-07-09 17:52
ogImage:
  url: /assets/img/2024-07-09-Dynamicfont-sizeusingonlyCSS3_0.png
tag: Tech
originalTitle: "Dynamic font-size using only CSS3"
link: "https://medium.com/@bogdanfromkyiv/dynamic-font-size-using-only-css3-757ea901d0fe"
---

<img src="/ui-log-2/assets/img/2024-07-09-Dynamicfont-sizeusingonlyCSS3_0.png" />

이미 2023년이네요, 시간이 참 빠르죠! 화면 해상도에 따라 텍스트 크기를 몇 픽셀이나 조정하려고 CSS 미디어 쿼리를 계속 사용하는 거 짜증나시죠? 그러지 말고 동적 폰트 크기를 사용해보세요!

# 동적 폰트 크기란?

동적 폰트 크기는 사용자의 뷰포트 너비에 비례하여 텍스트 크기가 변경되는 것을 의미합니다. 단지 폰트 크기의 최소값, 최대값, 그리고 크기가 조절될 두 지점을 제공하면 됩니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

예를 들어, 보이는 영역 너비가 768픽셀일 때 텍스트의 글꼴 크기를 20px로 하고, 최대 크기인 1920픽셀일 때는 36px로하려고 합니다. 그러나 보이는 영역의 너비가 768픽셀 미만이면 글꼴 크기가 16px보다 작아지지 않도록하고, 1920픽셀을 초과하면 글꼴 크기가 48px에서 멈추도록하려고 합니다.

말로만 설명하기는 복잡하죠. 아래 사진을 확인해보세요.

보이는 영역의 너비가 768픽셀이면 글꼴 크기는 20px입니다:

![이미지](/ui-log-2/assets/img/2024-07-09-Dynamicfont-sizeusingonlyCSS3_1.png)

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

뷰포트 너비가 768px보다 큰 경우, 글꼴 크기가 비례하여 조정됩니다:

![image 1](/ui-log-2/assets/img/2024-07-09-Dynamicfont-sizeusingonlyCSS3_2.png)

1920px에서는 글꼴 크기가 36px로 변합니다:

![image 2](/ui-log-2/assets/img/2024-07-09-Dynamicfont-sizeusingonlyCSS3_3.png)

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

768px보다 작은 화면일 때, 글ꔴ 크기는 16px보다 작지 않습니다:

[동적 글ꔴ 크기를 CSS3만 사용하여 변경하는 이미지](/ui-log-2/assets/img/2024-07-09-Dynamicfont-sizeusingonlyCSS3_4.png)

1920px보다 큰 화면일 때, 글ꔴ 크기는 48px보다 크지 않습니다:

[동적 글ꔴ 크기를 CSS3만 사용하여 변경하는 이미지](/ui-log-2/assets/img/2024-07-09-Dynamicfont-sizeusingonlyCSS3_5.png)

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

너무 멋있지 않니 😁?

# 비밀은 뭐야?

그것을 달성하기 위해 한 줄의 CSS만 필요해:

```js
font-size: clamp(16px, calc(20px + (36–20) * (100vw - 768px)/(1920–768)), 48px);
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

여기서는 세 개의 매개변수를 받는 네이티브 CSS3 함수 clamp()를 사용합니다:
최솟값, 원하는 값 및 최댓값입니다. 위 예제에서 최솟값은 16px로, 최댓값은 48px로 설정합니다.

가장 까다로운 부분은 원하는 값입니다. 이를 위해 서로 다른 CSS 값 사이의 계산을 수행하는 CSS 함수 calc()를 사용합니다.

![이미지](/ui-log-2/assets/img/2024-07-09-Dynamicfont-sizeusingonlyCSS3_6.png)

폰트 크기에 대한 최솟값은 20px(또는 20)입니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

36 — 폰트 크기의 최대 값;

768px (768) — 하한 지점;

1920 — 상한 지점;

100vw는 사용자 뷰포트의 전체 너비를 반환 (1vw = 뷰포트 폭의 1%).

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이 공식이 작동하는지 확인하려면 우리의 브레이크포인트 값(768px 및 1920px)에 대해 테스트해 보겠습니다.

따라서 사용자의 뷰포트 폭이 768px로 변할 때, 100vw = 768px가 됩니다. 100vw를 768px로 교체하면 정확히 20px(공식의 오른쪽 부분은 0px가 됩니다)가 됩니다.

이를 1920px 뷰포트 폭에서도 똑같이 해 보면, font-size의 값으로 정확히 36px를 얻게 됩니다(공식의 오른쪽 부분은 16px가 됩니다).

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

![Image](/ui-log-2/assets/img/2024-07-09-Dynamicfont-sizeusingonlyCSS3_8.png)

# 데모

CSS3만 사용하여 동적 글꼴 크기를 지정할 수 있음을 보실 수 있습니다. clamp() 및 calc() 함수를 사용하여 가능합니다. 동적 글꼴 크기에 대한 다양한 솔루션에 대해 좀 더 알고 싶다면, 이 글을 읽어보시기를 강력히 추천드립니다: https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/ .

읽어 주셔서 감사합니다!
안전하고 평화로운 하루 되세요!
