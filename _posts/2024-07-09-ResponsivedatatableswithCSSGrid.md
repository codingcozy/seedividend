---
title: "CSS Grid로 반응형 데이터 테이블 쉽게 만드는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-ResponsivedatatableswithCSSGrid_0.png"
date: 2024-07-09 17:59
ogImage:
  url: /assets/img/2024-07-09-ResponsivedatatableswithCSSGrid_0.png
tag: Tech
originalTitle: "Responsive data tables with CSS Grid"
link: "https://medium.com/evodeck/responsive-data-tables-with-css-grid-3c58ecf04723"
isUpdated: true
---

![CSS Grid](https://miro.medium.com/v2/resize:fit:1400/1*jTLeBdCKKscV-GR2nVSy2w.gif)

이 글은 CSS Grid에 대한 통찰력을 제공하고 일상적인 업무에서 어떻게 활용되는지에 대한 몇 가지 예를 제시하기 위해 작성되었습니다.

Grid Layout은 새로운 CSS 기능으로, 열과 행의 시스템을 사용하여 아름답고 간단한 레이아웃을 만들어 웹 페이지의 디자인을 쉽게 만들어줍니다! 2017년 10월 이후로 모든 주요 브라우저에서 지원됩니다.

Wes Bos의 멋진 강좌에서 CSS Grid에 대한 팬이 되었습니다!

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

Evodeck에서 일한 프로젝트 중 하나에서 Grid Layout을 사용하여 데이터 테이블을 구현할 기회를 보았고 시도해 보기로 결정했습니다. 개발 프로세스와 애플리케이션의 진행에 큰 영향을 미치지 않는 방식으로 롤백하거나 다른 요소로 변경할 수 있도록 작은 것을 선택했어요.

시각적인 목적으로 CSS Grid를 사용하는 것이 얼마나 쉬운지 작은 예제를 보여드릴게요. 아래에는 몇 가지 가상의 사용자 데이터로 구성된 테이블이 있어요.

![Image](/assets/img/2024-07-09-ResponsivedatatableswithCSSGrid_0.png)

이 테이블에는 몇 줄의 CSS 코드가 있는지 알아 맞춰 보세요!

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

![이미지](/assets/img/2024-07-09-ResponsivedatatableswithCSSGrid_1.png)

12줄! 맞아요, CSS 코드가 단 12줄밖에 안 나와요. 신비한 일이 일어나는 건 바로 2번째와 3번째 줄에서, 거기에 있어요. 여기에서 우리는 grid 클래스로 지정된 HTML 요소는 그리드로 내용을 표시하고 가용 공간의 1분의 1(1fr)을 차지하는 5개의 열을 가지도록 설명했어요! 😲 그리고 다른 것 없이도 기본적으로 반응형이에요! 또한 CSS repeat() 함수도 사용했는데, 더 자세한 정보를 알고 싶다면 여기를 확인해보세요.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*38Jo6O4-7ZBLrq0fXVRvOA.gif)

좋아요, 이 신비한 표현 "1 fr"은 요소가 가용 공간의 1분의 1을 차지할 것이라는 뜻이에요! 이를 통해 우리는 필요한 만큼 많은 공간을 갖는 열을 생성하고 고정 너비로 작업할 필요가 없어지게 해줘요! 😮

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

이제 각 열의 너비를 다르게 설정하려면 다음과 같이 지정하면 됩니다:

![ResponsivedatatableswithCSSGrid_2](/assets/img/2024-07-09-ResponsivedatatableswithCSSGrid_2.png)

여기서 의미하는 것은

- "Id" 열은 사용 가능한 공간의 1 분수를 차지해야 합니다.
- "Full Name" 및 "Email" 열은 사용 가능한 공간의 3 분수를 차지해야 합니다.
- "Country" 및 "Created at" 열은 사용 가능한 공간의 2 분수를 차지해야 합니다.

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

결과는:

![image](/assets/img/2024-07-09-ResponsivedatatableswithCSSGrid_3.png)

그리고 더 많은 일을 할 수 있어요! 분수 대신 고정 너비로 작업하려면 minmax() 함수를 사용할 수도 있어요. 예를 들어, 첫 번째 열에 50px 최소 너비와 100px 최대 너비를 갖도록 고정 너비를 원한다면, 코드는 이렇게 보일 거에요:

![image](/assets/img/2024-07-09-ResponsivedatatableswithCSSGrid_4.png)

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

그리고 마지막 결과물은 아래와 같습니다:

![image](/assets/img/2024-07-09-ResponsivedatatableswithCSSGrid_5.png)

![image](/assets/img/2024-07-09-ResponsivedatatableswithCSSGrid_6.png)

CSS Grid의 가장 일반적인 사용 방법은 grid-template-areas를 사용하여 레이아웃을 구축하는 것이지만, 테이블에도 매우 유용하다고 생각해요!

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

간단히 말해서, CSS Grid을 사용하면 매우 유용하고 쉽게 작업할 수 있다고 발견했어요. 제 의견으로는, 이 기술은 미래를 향해 나아갈 것이며 커뮤니티에서 매우 잘 받아들여질 것이에요!

왜 Grid를 플렉스박스나 테이블 대신 선택해야 하는지에 대해 자세히 설명하거나 논의에 들어가지 않을 거에요. 저는 Grid를 선택한 이유는 매우 사용하기 쉽다고 생각했고, 테이블보다 코드를 적게 사용하며, 플렉스박스보다 덜 복잡하고, 마지막으로 기본적으로 많은 기능을 제공한다고 생각했기 때문이에요. 단지 어떻게 그 기능을 최대한 활용하는 방법을 알아야 한다는 것뿐이죠! 저는 보통 이렇게 말해요:

그리고 Phillip Sweet가 말하듯, 항상 배우기에 열려 있어야 해요!

제가 유용하다고 생각하는 여러 리소스를 공유하고 싶습니다:

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

- CSS-TRICKS의 Grid에 대한 완벽한 가이드
- MDN 웹 문서의 CSS Grid 레이아웃 참조

글을 읽어 주셔서 감사합니다. 의견, 제안 또는 아이디어가 있으면 아래 댓글에 공유해주세요!

추신: 이 이야기는 제 웹사이트 https://www.danielsalvado.com/blog/responsive-data-tables-with-css-grid/에서도 찾을 수 있습니다.
