---
title: "셀렉터 명시도Selector Specificity란 무엇인가요"
description: ""
coverImage: "/assets/img/2024-07-09-WhatisSelectorSpecificity_0.png"
date: 2024-07-09 14:11
ogImage:
  url: /assets/img/2024-07-09-WhatisSelectorSpecificity_0.png
tag: Tech
originalTitle: "What is Selector Specificity"
link: "https://medium.com/@kithma/what-is-selector-specificity-b9fef8729d94"
---

<img src="/assets/img/2024-07-09-WhatisSelectorSpecificity_0.png" />

최근 면접에서 CSS 특이성에 대해 설명하라는 질문을 받았는데, 이에 대해 알고 있었지만 흐릿한 기억으로 명확히 설명하지 못해 실패했다. 따라서 나와 같이 기억이 가물가물하거나 아무것도 모르는 경우를 위해 CSS 특이성에 대한 설명을 공유하려고 한다.

# CSS 선언이란 무엇인가

특이성에 대해 들어가기 전에, 이 기사에서 사용될 용어인 CSS 선언이 무엇인지 이해해보자.
간단히 말해서 CSS 선언은 CSS 속성과 그 값의 키-값 쌍이다.

<div class="content-ad"></div>

위는 CSS 선언의 예입니다. "border-radius"는 속성이고 "50%"는 값입니다. 이를 사용하여 특정 요소에 스타일 속성을 설정합니다. 이제 CSS 선언이 무엇인지 알게 되었으니, 특이성으로 넘어가 봅시다.

# 셀렉터란

CSS에서 셀렉터는 원하는 HTML 요소를 대상으로 하는 데 사용되는 것입니다. 셀렉터의 예로는 id, class, 요소, 속성 등이 있습니다.
