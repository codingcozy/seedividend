---
title: "NextJs 14에서 Route Groups이란 무엇인가?"
description: ""
coverImage: "/assets/img/2024-05-18-WhatareRouteGroupsinNextJs14_0.png"
date: 2024-05-18 22:26
ogImage: 
  url: /assets/img/2024-05-18-WhatareRouteGroupsinNextJs14_0.png
tag: Tech
originalTitle: "What are Route Groups in NextJs 14?"
link: "https://medium.com/@prachigarg1923/what-are-route-groups-in-nextjs-14-221dd5460da1"
isUpdated: true
---




안녕하세요 여러분! Next.js에서는 종종 페이지를 앱 디렉토리 내의 폴더로 구성하죠, 맞죠? 그런데 만약 URL 경로를 지저분하게 하지 않고 관련된 경로를 그룹화하고 싶다면 어떻게 할까요? 바로 Route Groups가 등장합니다!

그러니 함께 살펴봅시다. NextJs의 이 개념에 익숙하실 것입니다. 우리는 각 폴더에 page.tsx 파일을 포함하여 앱 디렉토리 안에 폴더를 만들 수 있습니다. 이를 통해 URL 경로에 폴더 이름을 추가할 수 있게 됩니다. 아래는 이를 설명하는 예시입니다:

![Route Groups in NextJs](/assets/img/2024-05-18-WhatareRouteGroupsinNextJs14_0.png)

이것은 앱 폴더 내의 폴더 디렉토리로, 'button'이라는 폴더를 만들고 그 안에 page.tsx 파일을 만들었습니다.

<div class="content-ad"></div>

/button으로 이동하면 page.tsx에 있는 내용을 볼 수 있습니다.

기본 사항을 잘 이해하셨으니, 여기서 라우트 그룹이 어떻게 작용하는지 알아보겠습니다. 많은 경우, 우리는 만들어 둔 폴더를 표시하고 싶지 않거나 URL을 깔끔하게 유지하면서 관련 폴더를 그룹화해야 할 때가 있습니다. 이때 라우트 그룹이 마법을 부리는 시점입니다! 라우트 그룹을 사용하면 경로에 추가하지 않고 폴더 이름을 생성할 수 있습니다. 유일한 제한 사항은 NextJS가 어떤 이름을 회피해야 하는지 알기 위해서는 폴더 이름을 원형 괄호로 감싸야 한다는 것입니다.

다음은 예시입니다:

![라우트 그룹 예시](/assets/img/2024-05-18-WhatareRouteGroupsinNextJs14_1.png)

<div class="content-ad"></div>

우리가 처음에 논의한 것에 따르면, 페이지.tsx의 콘텐츠를 표시할 때 URL이 example/button과 같아야 했지만 example이 괄호 안에 있기 때문에 NextJS는 경로에 포함할 필요가 없다는 것을 알고 있어 URL은 /button이 됩니다.

그래서 언제 경로 그룹을 사용해야 할까요?
1. 간소화된 URL 경로: 관련된 route를 그룹화하여 폴더에 넣고 URL 경로를 그룹 폴더의 이름으로 복잡하지 않게 만들고 싶을 때 사용합니다.

2. 사용자 정의 레이아웃: 특정 폴더에 대해 다른 레이아웃을 사용하고 싶을 때 사용합니다. 한 폴더에 속하는 모든 파일은 레이아웃.tsx를 따르며 이를 통해 각 폴더에 맞게 사용자 정의 레이아웃을 가질 수 있습니다!

경로 그룹에 대해 더 알아보려면, 공식 NextJS 문서를 읽는 것을 추천합니다: [NextJS 문서](https://nextjs.org/docs/app/building-your-application/routing/route-groups)