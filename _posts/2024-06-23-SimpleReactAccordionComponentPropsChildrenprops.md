---
title: "간단한 React 아코디언 컴포넌트 만들기Props와 Children props 사용"
description: ""
coverImage: "/assets/img/2024-06-23-SimpleReactAccordionComponentPropsChildrenprops_0.png"
date: 2024-06-23 13:38
ogImage:
  url: /assets/img/2024-06-23-SimpleReactAccordionComponentPropsChildrenprops_0.png
tag: Tech
originalTitle: "Simple React Accordion Component(Props, “Children” props)"
link: "https://medium.com/@mastermusili/simple-react-accordion-component-props-children-props-e0f077c4d8fd"
isUpdated: true
---

![SimpleReactAccordionComponentPropsChildrenprops](/assets/img/2024-06-23-SimpleReactAccordionComponentPropsChildrenprops_0.png)

간단한 기본 React 아코디언을 만들 때에는 React의 기본 지식만 필요합니다. React props 및 useState를 사용하여 상태 관리하는 데 일부 기본 기술이 필요합니다.

React 컴포넌트는 props를 사용하여 서로 통신합니다. 모든 부모 컴포넌트는 자식 컴포넌트에 정보를 전달할 수 있습니다. 부모 컴포넌트에서 자식 컴포넌트로 데이터를 매핑하여 아코디언 항목을 표시하겠습니다.

이 프로젝트에서는 정적 데이터를 사용할 것이며, 외부 API에서 데이터를 전달할 수도 있습니다. 아래는 사용할 데이터입니다.

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

![Img1](/assets/img/2024-06-23-SimpleReactAccordionComponentPropsChildrenprops_1.png)

첫 번째 할 일은 부모 Accordion.jsx 컴포넌트를 생성하는 것입니다. 이 컴포넌트에서 데이터를 AccordionItem.jsx 컴포넌트로 매핑할 것입니다;

![Img2](/assets/img/2024-06-23-SimpleReactAccordionComponentPropsChildrenprops_2.png)

참고: 스타일링은 tailwind css를 사용했습니다

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

위의 구성 요소에서는 "currOpen" 상태를 사용하여 데이터 배열에서 현재 열린 데이터를 결정하므로 true이면 표시되고, 그렇지 않으면 표시되지 않습니다.

데이터를 accordionItem 구성 요소에 매핑할 때 항목과 상태를 프롭으로 전달했는데, 이를 사용하여 자식 구성 요소에서 아코디언을 열고 닫을 수 있습니다.

# 자식 구성 요소 내에서 프롭 읽기

항목, currOpen 및 setCurrOpen과 같은 이름의 프롭을 ('와 ') 사이에 쉼표로 구분하여 AccordionItem 함수 바로 뒤에 나열하여 AccordionItem 코드 내에서 변수처럼 사용할 수 있습니다.

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

![SimpleReactAccordionComponentPropsChildrenprops](/assets/img/2024-06-23-SimpleReactAccordionComponentPropsChildrenprops_3.png)

참고: 내 경우에는 외부 버튼 구성 요소를 사용했지만, 일반 버튼 요소를 사용하고 아코디언 상태를 변경하기 위한 onclick 메서드를 추가할 수도 있습니다.

첫 번째로 하는 일은 "item.Id"를 "currOpen"으로 설정하는 것입니다. 이렇게 하면 한 번에 하나의 아코디언만 열리도록 보장되며, 동시에 두 개의 아코디언을 열 수 없습니다. 이는 상태 관리가 부모 구성 요소에서 제어되기 때문에 가능합니다.

toggleClick 메서드는 아코디언을 열고 해당 아코디언이 열려 있는지 확인하고 다시 클릭되었는지 확인한 후 상태가 null로 설정되어 아코디언이 닫힙니다.

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

아코디언이 열리지 않았을 경우, onclick 메서드를 사용하여 toggleClick이 항목의 id를 "currOpen"으로 설정한 후 아코디언을 엽니다.

<img src="/assets/img/2024-06-23-SimpleReactAccordionComponentPropsChildrenprops_4.png" />

페이지에서는 다른 아코디언은 닫힌 채로 두고 두 번째 아코디언만 열려 있습니다. 쉽죠!

코딩 즐기세요!
