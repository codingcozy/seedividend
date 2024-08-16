---
title: "HNG 챔피언십을 위한 내 모바일 앱 개발 여정"
description: ""
coverImage: "/assets/img/2024-06-30-MyMobileAppDevelopmentJourneyAQuestforHNGChampionship_0.png"
date: 2024-06-30 22:52
ogImage: 
  url: /assets/img/2024-06-30-MyMobileAppDevelopmentJourneyAQuestforHNGChampionship_0.png
tag: Tech
originalTitle: "My Mobile App Development Journey (A Quest for HNG Championship!)"
link: "https://medium.com/@victorakanmidu/my-mobile-development-journey-a-quest-for-hng-championship-30e74f459912"
isUpdated: true
---




저는 Victor Akanmidu이고, 인구 밀집 지역인 HNG 인턴십에서 모바일 앱 개발이라는 위대한 모험에 도전하고 있어요!

### HNG 인턴십

HNG 인턴십이 다시 시작되었어요. 제게는 낯설지 않지만, 매년 HNG 인턴십에서 기술을 연마할 수 있는 새로운 기회가 주어지고 있어요. 이 집중 프로그램은 저와 같은 개발자 지망생이 기술을 향상시키고 기술 분야에서 경력을 쌓을 수 있도록 도와준다고 해요. 빠르게 진행되는 학습 환경과 재능 있는 멘토들과의 협력 기회로 유명하죠. 흥미롭죠? 제가 개발 여정을 나아가는 동안 주시할게요.

### 나의 훈련 과정: 모바일 개발 플랫폼

<div class="content-ad"></div>

이제 원래 목표로 돌아갑시다! 우리 여행의 첫번째 정착지는 모바일 개발 플랫폼의 세계입니다. 이러한 플랫폼은 특정 운영 체제용 앱을 개발하는 데 필요한 도구와 프레임워크를 제공합니다. 여기 주요 두 가지 범주가 있습니다:

- Native Development: 이 접근 방식은 각 운영 체제(안드로이드 및 iOS)에 대해 플랫폼별 언어(안드로이드에는 자바/코틀린, iOS에는 스위프트/Objective-C)를 사용하여 별도의 앱을 빌드하는 것을 포함합니다.
- 장점: Native 앱은 최고의 성능, 사용자 경험 및 모든 기기 기능에 액세스를 제공합니다.
- 단점: 여러 언어와 프레임워크에 대한 전문 지식이 필요하여 개발 시간과 비용이 증가합니다.
- Cross-Platform Development: 여기서는 Android 및 iOS 모두에 대한 앱을 빌드하는 데 사용할 수 있는 단일 코드베이스를 작성합니다. 인기있는 프레임워크로는 React Native, Flutter, Xamarin 등이 있습니다.
- 장점: 단일 코드베이스를 사용하여 개발 시간과 비용을 절약합니다. 두 플랫폼 모두에 대해 앱을 유지 관리하고 업데이트하기 더 쉽습니다.
- 단점: 성능이 네이티브 앱만큼 좋지 않을 수 있습니다. 장치별 기능에 액세스하는 데 제약 사항이 있을 수 있습니다.

기반 구축: 소프트웨어 아키텍처 패턴

플랫폼을 선택했다면, 앱을 위한 구조적 청사진을 결정할 차례입니다. 일반적인 패턴은 다음과 같습니다:

<div class="content-ad"></div>

- Model-View-Controller (MVC): 이 전통적인 패턴은 앱을 Model(데이터), View(사용자 인터페이스) 및 Controller(사용자 상호작용 처리)의 세 부분으로 분리합니다.
- 장점: 간단하고 이해하기 쉽며, 코드 유지보수를 장려합니다.
- 단점: 대규모 앱에서 복잡해질 수 있으며, Model과 View 간의 강한 결합으로 인해 테스트가 어려울 수 있습니다.
- Model-View-ViewModel (MVVM): MVC의 진화로, MVVM은 Model과 View 사이에서 중개자로 작용하는 ViewModel을 소개합니다.
- 장점: 관심사 분리가 개선되고, 테스트가 더 쉬워지며, 코드 재사용을 장려합니다.
- 단점: MVC에 비해 설정이 약간 복잡할 수 있습니다.
- Clean Architecture: 이 패턴은 핵심 비즈니스 로직을 플랫폼별 세부사항으로부터 분리하는 데 초점을 둡니다.
- 장점: 높은 유지보수 가능성 및 테스트 가능한 코드베이스, 느슨하게 결합된 구성 요소를 장려합니다.
- 단점: 소프트웨어 설계 원칙에 대한 좋은 이해가 필요하며, 높은 학습 곡선이 있을 수 있습니다.

나의 개발 상태

나는 아직 모바일 개발 여정의 초기 단계에 있으므로, 내게 가장 잘 맞는 여러 플랫폼과 아키텍처를 실험할 예정입니다. 내가 겪는 도전, 발견하는 해결책 및 아마도 건설하게 될 멋진 앱들과 함께 여기에 내 경험을 문서화할 계획입니다.

상상해보세요 — 새롭게 습득한 기술을 시험해보고, 훌륭한 머릿속과 협력하여 혹은 심지어 변화를 가져올 앱을 구축하는 것입니다.

<div class="content-ad"></div>

그럼, 이 모험에 함께 하세요! https://hng.tech 에서 가입하실 수 있어요. 모바일 개발의 흥미진진한 세계를 함께 탐험해봐요. 궁금한 점이나 제안이 있으시면 아래에 댓글을 남겨주세요. 혹시 당신도 모바일 개발 여정을 시작하고 있다면, 서로서로 알려주고 배울 수 있을지 모르겠네요!