---
title: "localhost와 127001의 차이점은"
description: ""
coverImage: "/assets/img/2024-07-28-WhatstheDifferenceBetweenlocalhostand127001_0.png"
date: 2024-07-28 14:04
ogImage: 
  url: /assets/img/2024-07-28-WhatstheDifferenceBetweenlocalhostand127001_0.png
tag: Tech
originalTitle: "Whats the Difference Between localhost and 127001"
link: "https://medium.com/stackademic/whats-the-difference-between-localhost-and-127-0-0-1-4102ba05d494"
---


<img src="/assets/img/2024-07-28-WhatstheDifferenceBetweenlocalhostand127001_0.png" />

프론트엔드 개발자들이 로컬에서 디버깅을 할 때, 종종 localhost와 상호 작용하며 브라우저에서 웹페이지를 열기 위해 간단히 npm run을 실행합니다. 이때 주소 표시줄에는 http://localhost:xxx/index.html과 같은 내용이 표시됩니다.

많은 사람들이 두 가지의 차이를 심사숙고하지 않고 사용할 수 있습니다.

과거 개발자들과의 협업 경험 중 이 둘의 차이를 명확히 이해하지 못하는 사람들이 많았기 때문에 이 주제에 대해 알릴 필요성을 느꼈습니다.

<div class="content-ad"></div>

# 로컬호스트란 무엇인가요?

로컬호스트는 인터넷 접속에 사용되는 도메인 이름과 본질적으로 다르지 않지만, 기억하기 쉬운 점을 제외하고는 거의 차이가 없습니다.

로컬호스트의 범위는 로컬 기기로 제한됩니다. 그 이름에서도 알 수 있듯이 "로컬"이라는 용어는 해당 지역 내에 있는 것을 가리킵니다.

존 스미스와 제인 도는 각각의 기기에서 로컬호스트를 사용하여 서로를 방해하지 않고 개별 페이지 콘텐츠에 액세스할 수 있습니다.

<div class="content-ad"></div>


# 도메인 이름부터 프로그램까지

로컬호스트를 정말로 이해하려면 도메인 이름을 통해 사용자가 프로그램에 접근하는 방법에 대해 이야기해야 합니다.
