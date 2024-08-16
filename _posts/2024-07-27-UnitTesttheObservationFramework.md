---
title: "관찰 프레임워크 단위 테스트하는 방법"
description: ""
coverImage: "/assets/img/2024-07-27-UnitTesttheObservationFramework_0.png"
date: 2024-07-27 14:02
ogImage: 
  url: /assets/img/2024-07-27-UnitTesttheObservationFramework_0.png
tag: Tech
originalTitle: "Unit Test the Observation Framework"
link: "https://medium.com/better-programming/unit-test-the-observation-framework-d0f0fe240944"
isUpdated: true
---





![Screenshot](/assets/img/2024-07-27-UnitTesttheObservationFramework_0.png)

When I heard about the new Observation framework in WWDC 2023, like all good fans of Combine (we still exist!), I was naturally horrified.

Combine is no longer an implementation detail of SwiftUI. Our hard-earned knowledge of testing @Published properties is deprecated.

Today, we’re going to discover how to unit test @Observable view models.


<div class="content-ad"></div>

제 작품 'Swift에서의 비동기 단위 테스트'의 후속작입니다. 내 믿음직한, 술취한 사이드 프로젝트인 Bev을 iOS 17로 업데이트할 예정이며, 모든 테스트 커버리지를 유지할 것입니다.

# 관측 프레임워크

Combine을 대체할 것이다.

SwiftUI의 성능의 만병통치약.

<div class="content-ad"></div>

부기내용 부담하세요.

여기에 오신 것은 아마도 이런 걸 위해서는 아닌데, 그래서 소중한 두뇌 시간을 낭비하지 않을 거예요. 여기에 보이는 내용을 이렇게 변환할 수 있다는 것을 설명하는 데요: