---
title: "consolelog 대신 이 서비스 사용을 시작해야 하는 이유"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-StopUsingconsolelogandStartUsingThisService_0.png"
date: 2024-07-07 19:25
ogImage:
  url: /assets/img/2024-07-07-StopUsingconsolelogandStartUsingThisService_0.png
tag: Tech
originalTitle: "Stop Using console.log and Start Using This Service!"
link: "https://medium.com/stackademic/stop-using-console-log-and-start-using-this-service-0d3eaddfde45"
---

![Logging Image](/TIL/assets/img/2024-07-07-StopUsingconsolelogandStartUsingThisService_0.png)

로그 기록은 모든 소프트웨어 개발 과정에서 중요한 부분입니다. 이는 개발자가 응용 프로그램을 디버깅하고 작업 흐름을 이해하며 문제를 추적하는 데 도움이 됩니다. 그러나 Angular 응용 프로그램에서 로깅을 위해 console.log에만 의존하면 개발 환경에서 제품 환경으로 넘어갈 때 문제가 발생할 수 있습니다.

이 글에서는 Angular 응용 프로그램에 쉽게 통합할 수 있는 로깅 서비스를 소개하겠습니다. 이 서비스를 이용하면 환경 구성에 따라 로그 레벨을 제어할 수 있어 개발 중에는 상세한 로깅을 사용할 수 있지만 제품 환경에서는 최소화되거나 비활성화될 수 있도록 보장합니다.

# console.log 사용을 그만두어야 하는 이유

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

코드 전체에 흩어진 console.log 문을 사용하면 여러 문제가 발생할 수 있습니다:

- 성능 문제: 프로덕션 환경에서 지나치게 많은 로깅은 성능을 저하시킬 수 있습니다.
- 보안 위험: 민감한 정보가 로깅되어 노출될 수 있습니다.
- 혼란: 로그가 빠르게 혼란스러워지며 관련 정보를 찾기 어려울 수 있습니다.

구조화된 로깅 서비스를 사용하면 이러한 문제를 완화하고 언제 어떤 내용을 기록할지에 대해 더 많은 제어를 할 수 있습니다.

# Log Service 소개
