---
title: "CSS로 만드는 만화 효과 라인 쉽게 그리는 방법"
description: ""
coverImage: "/assets/img/2024-07-02-CSSSurpriseMangaLines_0.png"
date: 2024-07-02 21:41
ogImage:
  url: /assets/img/2024-07-02-CSSSurpriseMangaLines_0.png
tag: Tech
originalTitle: "CSS Surprise Manga Lines"
link: "https://medium.com/@alvaromontoro/css-surprise-manga-lines-a70f57bc6faa"
isUpdated: true
---

<img src="/assets/img/2024-07-02-CSSSurpriseMangaLines_0.png" />

만화나 애니메이션에서 놀란, 충격을 받은 또는 역겨워하는 사람의 얼굴에서 선들이 얼굴에서 캔버스로 방사되어 그들의 표정을 강조하는 흔한 효과가 있습니다.

나는 그 효과를 좋아하고, 이것을 `canvas`나 SVG를 사용하여 웹 기술로 수행된 것을 본 적이 있어, CSS만을 사용하여 가능한지 확인하고 싶었습니다. 답은 예입니다... 그러나 그것은 매우 효율적이지는 않습니다. 제작에는 추천하지 않습니다.

아래 비디오에서 효과가 표시됩니다.

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

두 개의 요소를 사용하여 코드를 작성했어요 (하지만 Temani Afif나 Ana Tudor는 테이블 태그를 사용하는 방법을 찾을 수 있을 거라고 확신해요). 하나는 이미지이고, 다른 하나는 해당 이미지를 감싸는 컨테이너예요. 선은 이미지 위에 겹쳐진 ::before 및 ::after 가상 요소로 그려졌어요.

특히, 반복된 원뿔 그라데이션 (3개)을 사용했고, 여러 CSS 사용자 정의 속성을 사용하여 그라데이션을 강화했어요. 이렇게 함으로써 여러 가지를 제어할 수 있었어요:

- 선 사이의 간격
- 선의 두께
- 원뿔 그라데이션의 중심점
- 선을 자르는 타원의 크기

마지막 두 가지 포인트가 중요해요: 중심점과 "face 캔버스"의 크기를 설정할 수 있도록 하면, 이 효과를 쉽게 사용자 정의할 수 있으며 어떤 이미지에도 적용할 수 있어요.

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

더 많은 사용자 정의 속성을 추가할 수 있었는데(선 색상 설정이나 더 많은 옵션 등), 그건 자제했어요.

CodePen에서 데모를 확인해보세요:

모든 사용자 정의 속성이 준비되면, 다양한 지점에서 그것을 업데이트하는 애니메이션을 추가하고, 서로 다른 속도, 지연 및 타이밍 함수를 적용하여 더욱 강렬한 무작위성 인상을 줄 수 있게 의사 요소에 적용했어요.

이 효과는 완벽에서는 거리가 있고, 원뿔 그라데이션 및 타이밍을 변경함으로써 개선할 수 있어요... 그래도, 이렇게 빠른 애니메이션 - 게다가 배경 이미지까지 사용하면 더욱 비효율적일 수 있어요. 더 좋은 효과를 낼 수 있지만 그래도 성능면에서 좋은 것은 아닐 수도 있어요.

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

더 좋은 방법은 GIF를 생성하고 이미지 위에 이를 적절하게 배치하는 것입니다(이와 같은 변수를 사용하여). 브라우저는 이러한 비용이 많이 드는 CSS 애니메이션보다는 이에 최적화되어 있을 것입니다.

이 미니 프로젝트는 배경, 사용자 정의 속성 및 애니메이션을 연습하는 재미있는 방법이었습니다. CSS로 다양한 효과를 사용하여 무언가를 만드는 것을 좋아하신다면 이 다른 기사를 확인해보세요:
