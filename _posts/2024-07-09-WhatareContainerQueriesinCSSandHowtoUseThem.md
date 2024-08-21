---
title: "CSS의 컨테이너 쿼리란 무엇이며 어떻게 사용하나요"
description: ""
coverImage: "/assets/img/2024-07-09-WhatareContainerQueriesinCSSandHowtoUseThem_0.png"
date: 2024-07-09 08:53
ogImage:
  url: /assets/img/2024-07-09-WhatareContainerQueriesinCSSandHowtoUseThem_0.png
tag: Tech
originalTitle: "What are Container Queries in CSS and How to Use Them"
link: "https://medium.com/stackademic/what-are-container-queries-in-css-and-how-to-use-them-ee909d7e8781"
isUpdated: true
---

웹 개발 분야에서 미디어 쿼리는 반응형 디자인을 만드는 데 기본 도구로 활용되어 왔습니다. 그러나 웹 디자인의 복잡성이 증가함에 따라 스타일을 적용하는 방법에 대한 보다 큰 유연성이 필요해졌습니다. 여기서 컨테이너 쿼리가 등장합니다. 이 글에서는 컨테이너 쿼리가 무엇인지, 어떻게 작동하는지, 그리고 더 적응 가능하고 유연한 웹 디자인을 만드는 데 어떻게 활용할 수 있는지 살펴보겠습니다.

![이미지](/assets/img/2024-07-09-WhatareContainerQueriesinCSSandHowtoUseThem_0.png)

컨테이너 쿼리는 CSS의 새로운 기능으로, 브라우저 창의 크기가 아닌 컨테이너의 크기에 기반해 스타일을 적용할 수 있게 해줍니다. 이 기능은 다양한 컨테이너 크기에 맞춰 적응해야 하는 재사용 가능한 구성 요소에 특히 유용하며, 디자인에서 더 큰 모듈성과 유연성을 제공합니다.

이는 레이아웃 내에서 사용되는 위치에 관계없이 사용 가능한 공간에 자동으로 적응하는 구성 요소를 설계할 수 있다는 것을 의미합니다.

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

# 실제 예시

## HTML 구조

컨테이너 쿼리가 어떻게 작동하는지 보여주기 위해 간단한 HTML 구조부터 시작해 보겠습니다. 우리는 안에 요소가 있는 카드를 생성할 것입니다.
