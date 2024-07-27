---
title: "실제 사용자 모니터링RUM"
description: ""
coverImage: "/assets/img/2024-05-12-RealUserMonitoringRUM_0.png"
date: 2024-05-12 19:00
ogImage: 
  url: /assets/img/2024-05-12-RealUserMonitoringRUM_0.png
tag: Tech
originalTitle: "Real User Monitoring(RUM)"
link: "https://medium.com/@anilvermaspeaks/real-user-monitoring-rum-aa96d5858788"
---


애플리케이션의 최종 사용자 경험을 추적하고 측정합니다. 앱 성능 및 API 호출에 소요된 시간을 파악합니다. 웹사이트의 최종 사용자 경험을 향상시키는 데 도움이 되는 실행 가능한 데이터 중심 세부 정보를 제공합니다.

![이미지](/assets/img/2024-05-12-RealUserMonitoringRUM_0.png)

![이미지](/assets/img/2024-05-12-RealUserMonitoringRUM_1.png)

## APM (Application Performance Monitoring/ Real user monitoring tool)—



웹 애플리케이션 성능에 대한 통찰력을 얻는 데 도움이 되며 다양한 모니터링 기능을 활용합니다.

- 실시간 가시성 - 응답 시간, 페이지 로드 시간, 페이지 조회수, 처리량 등 주요 지표를 추적하여 웹 사이트의 실시간 성능을 간단히 확인할 수 있습니다.
- 지리별 사용자 경험 - 세계지도상에서 각 나라별로 웹 사이트의 성능을 시각화하여 웹 사이트 성능에 영향을 받고 있는 위치를 빠르게 파악할 수 있습니다. 응답 시간, 오류 횟수, 처리량을 분석하여 사용자가 영향을 받고 있는 지역 확인 가능합니다.

![웹사이트 성능 모니터링](/assets/img/2024-05-12-RealUserMonitoringRUM_2.png)

- 지연 거래 감지 - 웹 사이트의 페이지 조회수와 개별 거래에 대한 오류를 주의 깊게 살펴 잠재적인 문제를 식별할 수 있습니다.
- 사용자 세션 추적 - 웹 사이트에 연결된 사용자 세션 수를 파악할 수 있습니다. 또한 각 세션의 상태를 파악하여 사용자 세션의 기간과 품질을 결정할 수 있습니다.
- 스크립트 오류 감지 - 실시간으로 웹 사이트의 성능에 영향을 주는 JS 오류를 식별할 수 있습니다.




![Monitoring solutions such as New Relic come with built-in dashboards. We can also build our own custom dashboards based on the metrics that matters most to us.
other tools — AppDynamics Browser RUM, Retrace, Datadog](/assets/img/2024-05-12-RealUserMonitoringRUM_3.png)

## How real user monitoring works

Real user monitoring works by injecting code into an application to capture metrics while the application is in use. Client side applications are monitored by injecting Javascript code.



네이티브 모바일 애플리케이션은 모니터링 라이브러리를 모바일 애플리케이션 패키지에 직접 추가하여 모니터링됩니다.