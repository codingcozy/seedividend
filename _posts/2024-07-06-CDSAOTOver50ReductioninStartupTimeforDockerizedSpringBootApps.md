---
title: "CDS  AOT 도커로 배포된 스프링 부트 애플리케이션의 시작 시간을 50 이상 줄이는 방법"
description: ""
coverImage: "/assets/img/2024-07-06-CDSAOTOver50ReductioninStartupTimeforDockerizedSpringBootApps_0.png"
date: 2024-07-06 11:19
ogImage: 
  url: /assets/img/2024-07-06-CDSAOTOver50ReductioninStartupTimeforDockerizedSpringBootApps_0.png
tag: Tech
originalTitle: "CDS + AOT: Over 50% Reduction in Startup Time for Dockerized Spring Boot Apps"
link: "https://medium.com/itnext/cds-aot-over-50-reduction-in-startup-time-for-dockerized-spring-boot-apps-e417aa68d936"
isUpdated: true
---




## 자바 | JVM | CDS | AOT | 도커

![이미지](/assets/img/2024-07-06-CDSAOTOver50ReductioninStartupTimeforDockerizedSpringBootApps_0.png)

이 기사에서는 스프링 부트의 클라우드 네이티브 빌드팩과 Paketo Java 빌드팩을 사용하여 CDS-AOT 최적화된 도커 이미지를 생성하는 방법을 알아볼 것입니다. 이 도커 이미지는 greetings-app이라는 Java 스프링 부트 애플리케이션을 위한 것입니다.

성능 향상을 측정하기 위해 두 개의 도커 이미지를 생성할 것입니다: 하나는 표준 설정으로, 다른 하나는 스프링 부트 메이븐 플러그인을 통해 Class Data Sharing (CDS)와 Ahead of Time (AOT) 최적화가 활성화된 이미지입니다. 마지막으로 두 도커 이미지의 시작 시간, 성능 및 메모리 사용량을 비교해 보겠습니다.

<div class="content-ad"></div>

위 연결된 글에서 greeting-app의 완전한 코드와 구현 방법을 확인하실 수 있어요.

다른 글에서는 Dockerfile을 사용하여 greeting-app의 두 이미지를 도커화했답니다.