---
title: "Kotlin 멀티플랫폼 개발을 위한 IDE 선택 무엇이 최고일까"
description: ""
coverImage: "/assets/img/2024-07-01-LetsTalkAboutMyIDEChoiceforKotlinMultiplatformDevelopment_0.png"
date: 2024-07-01 16:50
ogImage:
  url: /assets/img/2024-07-01-LetsTalkAboutMyIDEChoiceforKotlinMultiplatformDevelopment_0.png
tag: Tech
originalTitle: "Let’s Talk About My IDE Choice for Kotlin Multiplatform Development"
link: "https://medium.com/@callmeryan/lets-talk-about-my-ide-choice-for-kotlin-multiplatform-development-6fc2b11a8a64"
isUpdated: true
---

<img src="/assets/img/2024-07-01-LetsTalkAboutMyIDEChoiceforKotlinMultiplatformDevelopment_0.png" />

# 계속하기 전에 명확히 해야 할 사항

Kotlin Multiplatform (KMP)은 Android, iOS, 데스크톱, 웹, 서버 등 다중 플랫폼에서 개발을 지원합니다. 가장 일반적인 사용 사례는 Android 및 iOS를 타겟팅하는 것이지만, 모바일 요소 없이 웹 및 서버에 집중하는 KMP 프로젝트를 만드는 것도 기술적으로 가능합니다. 따라서 KMP를 위한 최적의 IDE는 특정 프로젝트와 해당 요구 사항에 따라 다릅니다.

저는 먼저 데스크톱 개발에 집중한 후 Android 및 iOS로 기능을 확장합니다. KMP의 웹 지원은 아직 알파 단계이기 때문에 사용 및 호환성 문제가 고려 사항이 될 수 있는 복잡성을 더하며, 따라서 일회성 장난감 앱이나 데모용으로 더 적합하다고 생각합니다. 현재로서는 특별히 그에 흥미를 느끼지는 않습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

중요한 점은 JetBrains가 Kotlin Multiplatform을 소유하고 있으며, JetBrains와 Google은 별개의 기업이라는 것입니다. 그들은 안드로이드 스튜디오, Kotlin, 그리고 안드로이드 개발자를 위한 Jetpack Compose를 개발하기 위해 긴밀히 협력하고 있지만, 독립적으로 운영되고 있습니다.

# Kotlin Multiplatform의 공식 IDE는 JetBrains의 Fleet입니다

안드로이드 스튜디오는 일부 KMP와의 호환성을 추가 플러그인을 통해 제공하지만, 구글 안드로이드에서 유지보수되고 있습니다. 반면 Fleet은 Kotlin Multiplatform을 위해 특별히 JetBrains에서 처음부터 개발한 새로운 IDE입니다.

의도된 부정적인 내용 없이, Fleet은 처음부터 다시 시작하여 바퀴를 다시 발명하는 것으로 보입니다. 심지어 IntelliJ IDEA 플러그인은 Fleet과 호환되지 않습니다. 경험 많은 안드로이드 개발자들은 Eclipse ADT에서 안드로이드 스튜디오로 이주하는 초기 어려움을 기억할 수 있을 것인데, 그 당시에는 여러 해가 걸렸습니다. Fleet이 다른 기존 IDE 옵션들과 비교 가능해지기까지 얼마나 시간이 걸릴지 궁금합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

JetBrains의 혁신 노력에 감사드립니다. 그러나 Fleet은 현재 Android Studio와 Xcode를 대체할 수 없습니다. Fleet은 코드 편집기를 넘어서는 범위를 가지고 있지만, Android Studio와 Xcode는 오랫동안 코드 편집기 이상의 역할을 해왔습니다. Google과 Apple의 독점 플랫폼 도구들 때문에 JetBrains가 Fleet을 자급자족시키고 개발자 경험을 맞춰 나갈 계획은 무엇인지 궁금합니다, 특히 유료 제품으로서 어떻게 할 생각인지요.

Fleet이 더 성숙해지면 다시 고려해볼 수 있을 것 같습니다. 현재는 다음과 같은 이유로 개발 시간을 투자하기에는 한계가 있어 보입니다:

- Fleet에서의 개발 경험이 Android Studio나 Xcode의 실제 사용과 맞지 않습니다.
- AGP 지원이 제한적입니다. Fleet이 아직 자급자족하지 못한 상태에서, Android Studio가 문제없이 처리할 수 있는 AGP를 프로젝트에서 Fleet을 사용하기 위해 다운그레이드하는 것은 불필요할 수 있습니다.

![My IDE Choice for Kotlin Multiplatform Development](/assets/img/2024-07-01-LetsTalkAboutMyIDEChoiceforKotlinMultiplatformDevelopment_1.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 플러그인 지원 부족 - Fleet은 IntelliJ IDEA 플러그인과 호환되지 않습니다. 예를 들어, SQLDelight 플러그인은 많은 사람들에게 필수적입니다. 또한, 포맷팅 및 명명된 인자를 지원하는 기타 Kotlin 플러그인들도 있습니다.

![이미지](/assets/img/2024-07-01-LetsTalkAboutMyIDEChoiceforKotlinMultiplatformDevelopment_2.png)

- Compose Desktop 미리 보기 기능이 제한적입니다. 심지어 미리 보기 기능을 작동시키는 것조차 문제가 될 수 있습니다.
- 벡터 드로어블 가져오기를 지원하지 않습니다. Multiplatform 리소스는 성숙해졌지만, Fleet는 여전히 벡터 드로어블을 변환하고 미리 보기할 수 있는 기능이 부족합니다.
- Fleet는 완전한 개발 주기를 독립적으로 처리할 수 없습니다. Android Studio와 Xcode는 언젠가 필요합니다. 이미 확립된 IDE들과 함께 추가 IDE를 실행하는 것은 중복된 작업처럼 보입니다.

# IntelliJ IDEA

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

나는 처음에 컴포즈 데스크톱 앱을 만들 때 IntelliJ IDEA를 사용했는데, 안드로이드 스튜디오도 처리할 수 있다는 걸 몰랐어. IntelliJ IDEA의 장점 중 하나는 대부분의 안드로이드 스튜디오 플러그인과 호환된다는 것이야. Compose Multiplatform 플러그인을 사용하면 UI를 개발할 수 있지만 레이아웃 미리보기 기능이 제한된다는 점이 있어.

안드로이드를 대상으로 하지 않는 프로젝트의 경우에는 IntelliJ IDEA가 좋아. 안드로이드 관련 애드온이 없는 상태에서 더 깔끔하고 반응이 빠르거든. 하지만 안드로이드 스튜디오가 사실상 IntelliJ IDEA의 향상된 버전이기 때문에 내 KMP 프로젝트가 안드로이드를 대상으로 할 경우에는 IntelliJ IDEA 대신 안드로이드 스튜디오를 사용하는 게 더 합리적이야.

게다가 IntelliJ IDEA는 최신 AGP 버전에 대해 제한적인 지원을 하고 있어, JetBrains가 아직 해결되지 못한 알려진 문제랍니다.

![이미지](/assets/img/2024-07-01-LetsTalkAboutMyIDEChoiceforKotlinMultiplatformDevelopment_3.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 안드로이드 스튜디오

일부 개발자는 안드로이드 경험이 제한된 상태에서 코틀린 멀티플랫폼 세계로 진입할 수 있습니다. 그러나 안드로이드 개발에 다양한 경험을 가진 사람들에게는 네이티브 안드로이드 개발과 안드로이드 스튜디오의 혜택을 포기하는 것이 업계 표준과 관행에서 손해일 수 있습니다.

안드로이드 스튜디오는 코틀린 멀티플랫폼 및 Compose 멀티플랫폼 플러그인을 지원합니다. 비안드로이드 부분에 대한 expect/actual 선언을 처리하고, 데스크톱(JVM) 앱을 실행하며, 다양한 타겟에 대한 유닛 테스트를 수행할 수 있습니다. 저는 잠시 웹 개발을 해보았는데, 안드로이드 스튜디오에서 웹 앱을 실행하는 것이 가능했습니다.

## 데이터베이스 지원

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

SQLDelight 플러그인은 안드로이드 스튜디오에서 작동합니다. Room Multiplatform을 사용할 때는 일부 해결책을 활용하여 Android 타겟에서 Database Inspector를 여전히 사용할 수 있습니다.

![이미지](/assets/img/2024-07-01-LetsTalkAboutMyIDEChoiceforKotlinMultiplatformDevelopment_4.png)

## 기존 안드로이드 개발 도구

Ktor 클라이언트로 OkHttp를 사용하면 내장된 네트워크 인스펙터를 여전히 사용할 수 있습니다. JetBrains Compose 대신 Jetpack Compose을 사용하는 공통 UI 코드에서도 레이아웃 인스펙터는 제대로 동작합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

안녕하세요! 안드로이드 스튜디오는 상용급 제품 앱을 개발하는 데 필요한 모든 도구를 제공합니다. 런처 아이콘을 생성하고 베이스라인 프로필을 만드는 등의 기능을 제공합니다. Android Studio는 벡터 그래픽을 가져와 변환하는 경우에도 최고의 통합개발환경(IDE)입니다.

![이미지](/assets/img/2024-07-01-LetsTalkAboutMyIDEChoiceforKotlinMultiplatformDevelopment_5.png)

## 미리 보기

IntelliJ IDEA의 Compose Multiplatform 플러그인 및 Fleet를 통해 Compose Multiplatform 미리 보기는 여전히 기본적인 수준입니다. CommonMain에서 Compose Multiplatform composables의 미리 보기를 보기 위해 해결책이 필요할 수 있습니다. 미리 보기는 Fleet 및 IntelliJ IDEA에서 제공되는 제한적인 Compose Desktop 미리 보기와 동일합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

안녕하세요! Android Studio 데스크톱 앱의 한 가지 제한 사항은 IDE에서 데스크톱 앱을 실행하는 경우 데스크톱 앱을 닫기 전에는 Compose Desktop 미리보기를 빌드하거나 새로 고칠 수 없다는 점입니다.

# 안드로이드 앱 품질과 개발자 경험을 손상시킬 이유가 없습니다

우리의 안드로이드 앱은 KMP 프로젝트에서 대부분의 코드가 공유되지만, 여전히 네이티브 안드로이드 앱입니다. 코틀린 멀티플랫폼 때문에 안드로이드 개발 표준과 관행을 후퇴하는 것은 불합리합니다.

# … 그리고 iOS용 Xcode

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

iOS 대상의 경우, 이유는 안드로이드 스튜디오와 비슷합니다. 저는 Xcode를 사용하고 있으며, 네이티브 iOS 앱을 빌드하고 제공하는 데 필요한 모든 것을 제공합니다. KMP 코드는 Gradle을 사용하여 컴파일되며, iOS 네이티브 기능을 널리 사용하지 않더라도 제 요구 사항에 충분합니다. Android 스튜디오와 Xcode만 사용해도 이동 및 데스크톱 앱을 제공하는 데 충분하며, MacBook Pro의 메모리와 디스크 공간을 절약할 수 있습니다.

# 결론

JetBrains에게 성가시운 사람으로 인식될 수 있지만, 제 코멘트는 수십만 파운드에 달하는 중요한 실제 개발 노력에 기반을 두고 있습니다.

이 기사는 이해관계로 인해 몇몇 사람들을 성가시게 할 수 있지만, 특히 Kotlin Multiplatform에 대해 자신의 환경에서 실제로 사용해 보는 것이 중요하다는 점을 강조해야 합니다. 실직적 경험 없이 KMP를 지나치게 찬양하거나 비판하는 것은 실제 사용 사례를 반영하지 못합니다.
