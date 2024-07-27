---
title: "CSS Grid와 CSS Flexbox의 역사 지금까지의 여정"
description: ""
coverImage: "/ui-log-2/assets/no-image.jpg"
date: 2024-07-09 18:08
ogImage: 
  url: /ui-log-2/assets/no-image.jpg
tag: Tech
originalTitle: "History of CSS Grid and CSS Flexbox"
link: "https://medium.com/@BennyOgidan/history-of-css-grid-and-css-flexbox-658ae6cfe6d2"
---


2018년 초에 발표된 WesBos CSS Grid를 앞서 소개한 이후, 트위터는 이를 향한 리뷰와 열정으로 가득 찼습니다. 이로 인해 일부 개발자들이 Flex와 Grid 레이아웃을 비교하기 시작했습니다. 이러한 유사성으로 인해 '이미 Flex를 알고 있기 때문에 Grid를 배워야 할까?’라는 질문이 나오게 되었습니다.

그래서 이 질문에 대한 짧은 대답은 "예"입니다. 만약 여러분이 여기까지 읽기 싫다면 여기서 멈춰도 괜찮지만, 왜 Grid를 배워야 하는지에 대해 몇 가지 이유를 언급하는 것이 도움이 될 것입니다. 하지만 이에 앞서, 이 레이아웃이 어떻게 발전해왔는지에 대한 역사와 같은 몇 가지 기초적인 지식이 중요합니다.

이 문서는 제가 연구한 두 가지 기사를 요약한 것입니다. 그 내용은 다음과 같이 요약할 수 있습니다:

오늘날 사용되는 Flexbox 레이아웃은 처음 제안된 것과 매우 다릅니다. CSS Working Group은 2008년에 Flex 레이아웃을 제안하고, 2009년에 첫 번째 작동 초안을 발표했습니다. 이 원래의 명세는 Firefox가 UI 디자인을 제작하는 데 사용되는 XUL을 기반으로 했습니다. 그러나, flex 레이아웃 및 그리드 레이아웃의 주된 저자로 불리는 Tab Atkins Jr에 따르면, 이는 지정되지 않은 채로 남아 있던 것이었습니다. 레이아웃 알고리즘은 느리고 Webkit과 Firefox 두 가지 구현 사이에는 다양한 세부 사항들이 많았습니다. 그리고 두 구현에서 차이가 있었습니다.

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

2011년에 Atkins이 등장하여 flexbox의 전체 명세를 다시 작성했습니다. 그의 주요 목표는 웹 개발자로서 습득해야 했던 모든 미친 float/table/inline-block 등의 해킹 방법에 대한 의존성을 제거하는 것이었습니다 (많은 프론트엔드 개발자들이 익숙해진 것). 2012년 버전의 Flexbox 명세는 W3C 후보 권고안으로 제안되었습니다.

2013년에 Atkins은 새로운 명세 사항을 수용하기 위해 2013년에 편집자 초안을 다시 작성했습니다. 새로운 명세의 버전 (2012년 버전/2013년 편집자 초안)은 Flexbox의 기능을 더 잘 설계하고 알고리즘을 강화하며 Flexbox의 효율성을 높였습니다.

CSS 그리드의 경우, 마이크로소프트가 CSS Working Group에 제출한 제안으로 처음 소개되었습니다. CSS를 Håkon Wium Lie와 함께 공동 창작한 Dr. Bert Bos에 따르면 그리드 기반 레이아웃은 초안 이전부터 상당 시간 동안 그의 관심사였습니다. 그러나 이러한 구현이 너무 복잡하다고 판단되어서, 이에도 불구하고 두 창조자가 일부 예비 노력을 기울인 바 있습니다. 하지만, 이러한 제안은 어떤 브라우저에도 배포되지 않았습니다. 그럼에도 불구하고, 이러한 제안에 대한 열정이 높았던 Advanced Layout Module (2005)은 나중에 Template Layout Module이 되었습니다. 그리드 개념들이 CSS Working Group에 꾸준히 제시되었지만, 사람들은 결국 그 중 하나가 성공적으로 구현될 것을 기대했습니다. 다행히도, 2016년에 후보 권고안으로 시행되었고 Tab Atkins Jr이 주 저자로 활약했습니다.

다음 글에서는 각각의 차이와 장단점을 살펴보겠습니다.