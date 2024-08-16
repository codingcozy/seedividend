---
title: "Google IO Kotlin Multiplatform을 지원 발표 내용 정리"
description: ""
coverImage: "/assets/img/2024-05-17-ItwasclaimedatGoogleIOthattheyofficiallysupportKotlinMultiplatform_0.png"
date: 2024-05-17 03:41
ogImage: 
  url: /assets/img/2024-05-17-ItwasclaimedatGoogleIOthattheyofficiallysupportKotlinMultiplatform_0.png
tag: Tech
originalTitle: "It was claimed at Google I O that they officially support Kotlin Multiplatform"
link: "https://medium.com/@callmeryan/it-was-claimed-at-google-i-o-that-they-officially-support-kotlin-multiplatform-545b2178b638"
isUpdated: true
---




## 그러나 Dagger/Hilt는 아직입니다.

![이미지](/assets/img/2024-05-17-ItwasclaimedatGoogleIOthattheyofficiallysupportKotlinMultiplatform_0.png)

요즘 구글 I/O 2024를 놓치셨다면:

"여러분이 코틀린을 얼마나 사랑하는지 잘 알고 있습니다! 커뮤니티의 성장과 열정을 보는 것이 정말 즐거웠습니다. 오늘, 안드로이드에서 Kotlin Multiplatform을 위한 일류 도구 및 라이브러리 지원으로 나아가는 미래로 큰 한걸음을 내딛었다는 것을 기쁘게 알려드립니다!"

<div class="content-ad"></div>

우리는 Datastore와 같은 선택된 JetPack 라이브러리에 Kotlin Multiplatform 지원을 추가해왔고, 이제는 Room과 같은 즐겨 사용하는 라이브러리로 확대하고 있습니다. Google에서는 Google Docs 앱을 Kotlin Multiplatform을 사용하여 Android, iOS 및 Web 간에 비즈니스 로직을 공유하기 위해 이주 작업을 진행 중입니다.

Workspace 팀은 앞으로 나머지 앱들에 Kotlin Multiplatform을 사용하여 투자할 수 있는 기회에 대해 흥분하고 있습니다. Google 앱들과의 작업을 통해 많은 것을 배우고 있으며, JetBrains 및 Kotlin 개발자 커뮤니티와 협력하여 KMP의 혜택을 여러분 모두에게 제공할 예정입니다. Kotlin Multiplatform은 플랫폼 간에 비즈니스 로직을 공유함으로써 생산성을 높일 것입니다.

# 두 주 전에 Dagger 팀에게 KMP 지원 로드맵에 대해 물어보았습니다

![이미지](/assets/img/2024-05-17-ItwasclaimedatGoogleIOthattheyofficiallysupportKotlinMultiplatform_1.png)

<div class="content-ad"></div>

더 알아보니 Dagger/Hilt는 여전히 KSP 지원을 수정하는 데 어려움을 겪고 있지만, 적어도 두 주 전까지 KMP를 지원할 계획이 없었다고 합니다.

# DI(Dependency Injection) 방법에 대해 사람들의 선호도가 아주 강하다는 것을 알고 있어요

직접적인 의존성 주입, 서비스 로케이터, Dagger/Hilt, 그리고 Koin 사이의 논쟁은 제가 업무에서 어떤 DI 프레임워크를 사용하기 전에도 훨씬 일찍 시작되었을 겁니다. 저는 Koin을 시도해보고, 그리고 3년 전에 Dagger와 Hilt를 사용해 봤어요.

이 주제는 새로운 것이 아니죠. 제가 처음 보는 것 처럼 논쟁하지는 않을 거에요. 당신이 선호하는 것/반대하는 것을 쉽게 검색해서 찾아볼 수 있어요. 제 생각과 다르지만 몇 가지 무작위 검색 결과를 여기에 정리해 봤어요.

<div class="content-ad"></div>

# 흥미로운 포인트?

KMP로 이동할 때 DI 프레임워크를 전환하는 것만이 관심사가 아닙니다. 사람들이 네이티브 안드로이드에서 /app에서 KMP의 /composeApp으로 소스 코드를 이동할 때 논리적 추론을 어떻게 했는지를 보여줍니다.

이 모든 해외에서 과거와 새로운 선호도를 지원하기 위한 의존성 주입에 대한 긴 기술적 토론을 어떻게 잊었을까요? DI 자체를 지원하기 위해 어떤 프레임워크를 선택하는 것보다 이게 더 흥미롭습니다.

DI 프레임워크의 가용성 때문에 KMP 이주를 망설일 정도로 잘 알고 있는 사람들도 있습니다. 웹에서 검색할 수 있는 토론들이 분명 있을 것입니다.

<div class="content-ad"></div>

# 하지만 현재 이러한 대안들도 있어요:

- Kodein
- kotlin-inject
- Koject
- DI.kt
- PopKorn

그리고 당연히 의존성 주입을 위해 Koin을 사용하고 있어요.

돈을 벌어야 해서 Koin을 사용하고 있지만, 시간이 될 때 다른 대안들을 시도해볼 수 있는지 보겠어요.

<div class="content-ad"></div>

위에서 언급한 것 중에 시도해 본 적이 있는 경우에는 경험을 공유해 주세요!