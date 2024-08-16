---
title: "핵심 구성 요소 경쟁사 분석에서 배운 것들"
description: ""
coverImage: "/assets/img/2024-05-15-BuildingBlocksLearningsfromtheCompetitorAnalysis_0.png"
date: 2024-05-15 03:15
ogImage: 
  url: /assets/img/2024-05-15-BuildingBlocksLearningsfromtheCompetitorAnalysis_0.png
tag: Tech
originalTitle: "Building Blocks: Learnings from the Competitor Analysis"
link: "https://medium.com/@achinthaisuru444/building-blocks-learnings-from-the-competitor-analysis-23309770a093"
isUpdated: true
---




## Asgardeo Android SDK 개발 여정 — 에피소드 2

![Image](/assets/img/2024-05-15-BuildingBlocksLearningsfromtheCompetitorAnalysis_0.png)

이전 에피소드에서 Asgardeo Android SDK 개발 여정 중 모바일 SDK를 통한 응용프로그램 네이티브 인증의 경쟁사 분석에 대해 논의했습니다.

아직 읽지 않으셨다면 아래 링크에서 확인할 수 있습니다.



https://achinthaisuru444.medium.com/a-deep-dive-into-mobile-sdks-for-app-native-authentication-a-competitor-analysis-d315f0ba89b9

안녕하세요! 이번 에피소드에서는 Android SDK 개발 과정 중에 우리가 한 아키텍처 결정 사항에 대해 자세히 살펴보도록 하겠습니다.

## 네이티브 우선 접근

우리의 경쟁사 분석 결과, 현재 트렌드는 Flutter나 React Native와 같은 크로스 플랫폼 개발 도구를 향해 가고 있지만, 산업은 여전히 안정성과 지원을 갖춘 네이티브 Android 및 iOS를 활용한 네이티브 개발을 주로 중점적으로 다루고 있음을 확인했습니다. 따라서, 고객에게 최상의 서비스를 제공하기 위한 조직으로서, 우리는 네이티브 프로그래밍 언어에 우선 순위를 두기로 결정했습니다.



안녕하세요! 안드로이드가 전 세계적으로 우세한 플랫폼이기 때문에 먼저 안드로이드 SDK를 개발하기로 결정했습니다. 이후 iOS SDK 개발에 이어 교차 플랫폼 개발 기술을 위한 SDK를 개발할 예정입니다.

## 코어 vs UI Kit

대부분의 경쟁사들은 UI 키트가 아닌 코어 SDK에 초점을 맞춘 이유는 앱 네이티브 인증을 선택하는 고객들이 종종 제공된 UI가 아닌 자체 UI를 개발하는 것을 선호하기 때문입니다. 이러한 통찰을 바탕으로, 저희는 먼저 코어 SDK 개발을 우선순위로 두고, 이후 UI 키트 개발을 계획하게 되었습니다.

## 프로젝트 전체 디자인




![Architecture](/assets/img/2024-05-15-BuildingBlocksLearningsfromtheCompetitorAnalysis_1.png)

우리는 위 다이어그램에 표시된대로 총 모바일 SDK 아키텍처를 설계했습니다. 이 아키텍처를 통해 안드로이드와 iOS에서 앱 네이티브 인증 로직을 구현하고 이를 크로스 플랫폼 기술에서 재사용함으로써 개발 프로세스를 간소화할 수 있습니다.

## 저장소 아키텍처

대부분의 경쟁사는 SDK를 독립된 저장소에서 개발하는 반면, 우리는 모든 모바일 SDK에 대해 단일 저장소를 사용하기로 결정했습니다. 이 결정은 네이티브 및 크로스 플랫폼 SDK 간 변경 사항의 전파를 용이하게 하기 위해 내려졌습니다. 우리가 예상하는 한 가지 도전 과제는 다양한 SDK를 다른 플랫폼 (예: 안드로이드는 Maven Central 및 Flutter는 pub.dev로)에 발행해야 한다는 점입니다. 우리는 이 도전 과제를 각 기술에 대해 별도의 GitHub actions를 실행하여 해결할 계획입니다.




## 결론

저희의 건축적인 결정은 산업 트렌드와 사용자 선호도에 대한 깊은 이해를 반영하고 있습니다. 네이티브 우선 접근과 핵심 기능 중심으로 우선순위를 정하면 맞춤화를 위한 견고한 기반을 마련할 수 있습니다. 단일 저장소(monorepo)의 도입은 플랫폼 간 통합을 간소화합니다. 다음 회에서는 이러한 통찰력을 적용 가능한 단계로 번역하여 보다 향상된 인증 경험을 제공할 예정입니다. 함께 기대해 주세요.