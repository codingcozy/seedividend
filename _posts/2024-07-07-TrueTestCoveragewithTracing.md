---
title: "추적을 통한 진정한 테스트 커버리지 달성 방법"
description: ""
coverImage: "/assets/img/2024-07-07-TrueTestCoveragewithTracing_0.png"
date: 2024-07-07 22:03
ogImage: 
  url: /assets/img/2024-07-07-TrueTestCoveragewithTracing_0.png
tag: Tech
originalTitle: "True Test Coverage with Tracing"
link: "https://medium.com/itnext/true-test-coverage-with-tracing-af0a5fee1ded"
---


소프트웨어 엔지니어링에서 테스트 커버리지의 중요성에 대한 의심은 없습니다. 오늘날에는 마이크로서비스 아키텍처와 분산 시스템의 인기가 높아지면서 그 중요성이 더 커졌습니다. 이 글에서는 분산 시스템의 중요한 구성 요소 중 하나인 Tracing을 활용하여 테스트 커버리지를 높이는 방법을 살펴보고자 합니다. 또한 Java와 Spring Boot을 사용하여 구현된 샘플 프로젝트에서의 모베스트 프랙티스와 도구를 살펴볼 것입니다.

![](/assets/img/2024-07-07-TrueTestCoveragewithTracing_0.png)

# 테스트 커버리지란?

테스트 커버리지를 향상시키기 위해 Tracing과의 관련성을 논의하기 전에 정확히 무엇인지 알아보는 것이 좋습니다. 요약하여 말하면