---
title: "플러터 3.22에 새로 추가된 내용 정리"
description: ""
coverImage: "/assets/img/2024-05-20-WhatsnewinFlutter322letsdiscussthetop10newthings_0.png"
date: 2024-05-20 23:13
ogImage:
  url: /assets/img/2024-05-20-WhatsnewinFlutter322letsdiscussthetop10newthings_0.png
tag: Tech
originalTitle: "What’s new in Flutter 3.22: let’s discuss the top 10 new things"
link: "https://medium.com/@shirsh94/whats-new-in-flutter-3-22-let-s-discuss-the-top-10-new-things-03f6d12eed38"
isUpdated: true
---

## 플러터 3.22 릴리스는 웹 어셈블리, 불칸 그래픽, 위젯 상태 향상 등을 포함하고 있습니다

![이미지](/assets/img/2024-05-20-WhatsnewinFlutter322letsdiscussthetop10newthings_0.png)

이 글에서는 플러터 3.22의 새로운 기능을 알아보겠습니다. 플러터 3.22에서는 성능 향상을 위해 웹 어셈블리 지원과 안드로이드에서 더 부드러운 그래픽을 위한 불칸 백엔드가 소개되었습니다. 위젯 상태 관리가 **위젯 상태 속성**과 함께 강화되었으며, **동적 뷰 크기 조정**으로 UI 적응성이 향상되었습니다. 또한 **개선된 폼 유효성 검증**을 통해 사용자 입력 처리를 강화했습니다.

**플레이버 조건부 자산 번들링**을 통해 앱 플레이버를 기반으로 선택적 자산 번들링이 가능하게 되었으며, **Gradle Kotlin DSL 지원**은 코드 편집을 개선했습니다. iOS에서 플랫폼 뷰 성능이 **스크롤링에 특히 더 나아졌습니다.** Firebase Dart SDK 미리보기를 통해 **Vertex AI**를 활용한 AI 기능을 구현할 수 있으며, **Google Mobile Ads SDK 5.0.1**은 **UMP SDK** 및 더 많은 중재 파트너에 대한 향상된 지원을 제공합니다. 이러한 업데이트는 플러터에서 앱 성능, 사용자 경험 및 개발자 생산성을 향상시키기 위해 종합적으로 목표로 하고 있습니다.

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

그래서, 플러터 3.22 릴리스에서의 탑 10 업데이트를 소개할게요:

1. WebAssembly 지원

![image](https://miro.medium.com/v2/resize:fit:1400/1*JPFkftr0XrFTo1zLm8U3WQ.gif)

플러터 3.22의 WebAssembly (Wasm) 지원은 웹 앱 개발에 큰 도약이에요. Wasm은 코드를 브라우저가 효율적으로 실행할 수 있는 바이너리 형식으로 컴파일함으로써, 플러터 웹 앱이 거의 네이티브 속도로 실행되도록 해줍니다.

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

전통적인 웹 기술과 비교했을 때, 이는 혁신적인 성능 향상을 가져옵니다. 게다가, Wasm은 주요 웹 브라우저에서 널리 지원되어 Flutter 웹 앱에 대한 광범위한 호환성을 보장합니다. Wasm을 활용함으로써 Flutter는 코드 크기를 줄이고 빠른 로드 시간 및 향상된 전반적인 성능을 제공합니다. 게다가, Wasm은 빠르게 발전하는 기술로, 앞으로 더 많은 향상이 기대됩니다.

전반적으로, Flutter 3.22에서의 Wasm 지원은 웹 개발을 위한 플랫폼 기능을 향상시켜 개발자에게 고성능 웹 애플리케이션을 구축하는 강력하고 효율적인 도구를 제공합니다.

2. Impeller를 위한 Vulkan Backend

Flutter 3.22에서 Impeller의 Vulkan 백엔드는 안드로이드에서 Flutter 앱에서 사용되는 렌더링 엔진에 대한 중요한 향상입니다. Vulkan은 현대적인 GPU에 대한 고효율적이고 크로스 플랫폼 액세스를 제공하는 저부하, 크로스 플랫폼 3D 그래픽 및 컴퓨팅 API입니다.

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

임펠러에 Vulkan을 통합함으로써, 플러터는 Vulkan의 능력을 활용하여 그래픽을 더 효율적으로 렌더링할 수 있어 안드로이드 기기에서 플러터 앱의 그래픽이 더 부드럽고 성능이 향상될 수 있습니다. 이 향상은 특히 애니메이션과 풍부한 전환 효과를 갖는 앱에 유용하며, 부드러운 프레임 속도를 유지하고 전반적인 사용자 경험을 향상시킵니다.

### 위젯 상태 속성

플러터 3.22의 위젯 상태 속성은 위젯이 외관과 동작을 어떻게 추적하는지에 관한 것입니다. 플러터는 이를 관리하는 특별한 방법인 "매터리얼 상태(MaterialState)"라는 것을 갖고 있습니다. 이번 업데이트에서 매터리얼 상태는 "위젯 상태(WidgetState)"로 이름이 변경되었으며 플러터의 더 많은 부분에서 사용할 수 있습니다.

이 변경으로 개발자는 위젯이 어떻게 보이고 작동하는지를 더 쉽게 제어할 수 있게 되었으며, 이는 잘 작동하고 멋지게 보이는 플러터 앱을 만드는 데 중요합니다.

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

4. 동적 뷰 크기 조정

Flutter 3.22에서의 동적 뷰 크기 조정은 반응형 레이아웃을 처리하는 프레임워크의 기능을 향상시키는 기능입니다. 이 기능은 위젯이 사용 가능한 화면 공간에 기반하여 크기를 조절하도록 개선합니다. 이는 작은 스마트폰부터 큰 태블릿까지 다양한 기기에 걸쳐 일관적이고 매력적인 사용자 인터페이스를 만들 때 특히 유용합니다.

이 업데이트 이전에, 개발자들은 종종 다양한 화면 크기에서 올바르게 표시되도록 위젯의 크기를 수동으로 계산하고 설정해야했습니다. 동적 뷰 크기 조정을 통해, 개발자들은 `Expanded`, `Flexible`, `MediaQuery`와 같은 기능을 사용하여 레이아웃을 생성할 수 있습니다. 이를 통해 위젯 크기를 화면의 차원에 따라 동적으로 조정할 수 있습니다.

예를 들어, `Expanded` 또는 `Flexible` 컨테이너로 래핑된 위젯은 자동으로 확장 또는 축소하여 사용 가능한 공간을 채울 수 있어 반응형 디자인을 쉽게 만들 수 있습니다. 마찬가지로, `MediaQuery` 클래스를 사용하면 현재 화면 크기를 조회하고 위젯 크기를 조정할 수 있습니다.

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

동적 뷰 크기 조정은 반응형 플러터 레이아웃을 만드는 프로세스를 간단화해줍니다. 이는 다양한 기기와 화면 크기에서 일관된 사용자 경험을 제공하는 앱을 결과적으로 만들어냅니다.

5. 폼 유효성 검사 개선

Flutter 3.22에서 개선된 폼 유효성 검사는 사용자 입력을 다루는 더 유연하고 견고한 방법을 제공합니다. 이러한 향상된 기능은 개발자들이 사용자 입력을 어떻게 유효성을 검사할지 더 많은 제어력을 제공하며, 특정 애플리케이션 요구에 맞게 사용자 정의 유효성 검사 로직을 구현할 수 있게 해줍니다.

이 개선된 유효성 검사 능력은 더 사용자 친화적인 경험으로 이어지며, 잘못된 데이터를 입력할 때 앱이 사용자에게 보다 정확한 피드백을 제공할 수 있도록 합니다.

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

또한, 이러한 향상된 기능은 인젝션 공격과 같은 보안 취약점을 예방하여 증가된 보안을 제공합니다. 총괄적으로 말하면, Flutter 3.22에서 개선된 양식 유효성 검사는 Flutter 앱의 사용성, 보안 및 유연성을 강화하며, 더 견고하고 사용자 친화적인 애플리케이션을 개발하는 데 강력한 도구를 제공합니다.

6. 플레이버 조건부 자산 번들링

Flutter 3.22의 플레이버 조건부 자산 번들링은 개발자들이 앱의 여러 버전 또는 "플레이버" 간에 효과적으로 자산을 관리할 수 있는 기능입니다. 이 기능을 통해 개발자는 앱의 플레이버에 기초하여 어떤 자산(예: 이미지, 폰트, 또는 설정 파일)을 앱 번들에 포함해야 하는지 지정할 수 있습니다.

이는 특정 버전의 앱에 특정한 자산(예: 브랜드 자산 또는 설정 파일)을 포함시킬 수 있으면서 다른 버전의 앱에 영향을 미치지 않게 됨을 의미합니다.

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

자산을 이렇게 정리함으로써, 개발자들은 더 깔끔하고 조직화된 코드베이스를 유지할 수 있어 필요할 때 자산을 관리하고 업데이트하기가 더 쉬워집니다. 또한 각 버전에 필요한 자산만 포함함으로써, 앱 번들의 전체 크기를 줄일 수 있어 사용자들에게 빠른 다운로드 및 시작 시간을 제공할 수 있습니다.

전반적으로, Flavor-Conditional Asset Bundling은 개발 프로세스를 향상시키고 Flutter 앱의 성능을 향상시키는 가치 있는 기능입니다.

7. Gradle Kotlin DSL 지원

Flutter 3.22에서의 Gradle Kotlin DSL 지원은 개발자들이 Gradle 빌드 스크립트를 작성할 때 Groovy 대신 Kotlin을 사용할 수 있게 해주는 기능입니다.

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

Kotlin은 Groovy보다 여러 가지 이점을 제공하는 현대적이고 표현력 있는 프로그래밍 언어입니다. 이점으로는 더 나은 타입 안전성, 널 안전성, 그리고 향상된 도구 지원이 있습니다. Gradle Kotlin DSL 지원을 통해, 개발자들은 Flutter 프로젝트용 빌드 스크립트를 작성할 때 이러한 이점을 활용할 수 있습니다.

이는 더 읽기 쉽고 유지보수하기 쉽며 견고한 빌드 스크립트로 이어져, 결국 Flutter 개발자들의 전체 개발 경험을 향상시킬 수 있습니다.

8. 플랫폼 뷰 성능 개선 (iOS)

Flutter 3.22에서의 플랫폼 뷰 성능 개선은 iOS 앱 내에서 플랫폼 뷰의 성능을 향상시키는 데 초점을 맞춥니다. 플랫폼 뷰는 지도나 웹 뷰와 같은 네이티브 구성 요소를 Flutter 앱에 통합하는 데 필수적입니다.

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

다음 업데이트는 주로 여러 플랫폼 뷰가 자주 사용되는 스크롤 뷰 내의 성능을 대상으로 합니다. 개선 사항에는 GPU 사용량이 50% 감소하여 배터리 효율성이 향상되고 사용자 상호 작용이 더 부드러워질 수 있는 잠재적인 이점이 포함되어 있습니다.

게다가, 평균 프레임 렌더 시간이 1.66ms만큼 줄어든 것으로 (33%의 향상), 최악의 경우 렌더 시간은 3.8ms만큼 감소하여 (21%의 향상) 스무스한 애니메이션과 스크롤 중에 버벅임이 줄어들어 더 나은 경험을 제공하게 되었습니다.

이러한 최적화는 iOS 기기에서 플랫폼 뷰를 활용하는 Flutter 앱의 성능을 현저히 향상시키도록 설계되었으며, 사용자에게 더 부드럽고 반응성 있는 경험을 제공합니다.

9. Firebase Dart SDK 미리보기용 Vertex AI

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

![image](/assets/img/2024-05-20-WhatsnewinFlutter322letsdiscussthetop10newthings_1.png)

플러터 3.22에 대한 Vertex AI for Firebase Dart SDK 미리보기는 제니미 API를 소개합니다. 이를 통해 개발자들은 자체 Dart 또는 Flutter 앱에 생성 AI 기능을 통합할 수 있습니다.

이 SDK는 생산 수준의 성능과 확장성을 제공하며 Firebase App Check와의 통합으로 보안을 강화합니다. 개발자들은 이 SDK를 사용하여 이미지 및 텍스트 생성과 같은 제니미 API의 기능을 앱에서 사용할 수 있습니다.

이 미리보기 릴리스는 프로모션 코드로 무료로 제공되며, 개발자들은 앱에 통합하기 전에 SDK의 기능을 탐색하고 테스트할 수 있습니다.

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

10. Google Mobile Ads SDK 5.0.1

플러터 3.22의 Google Mobile Ads SDK 5.0.1은 광고로 Flutter 앱을 수익화하는 개발자들을 위한 여러 개선 사항을 가져왔어요.

이 업데이트에는 사용자 메시징 플랫폼 (UMP) SDK에 대한 향상된 지원이 포함되어 있어요. 개인화된 광고에 대한 동의 수집 프로세스를 간소화하기 위한 새로운 API가 제공돼요. 게다가 이제 SDK는 Unity, Meta, AppLovin, Iron Source, Mintegral, Pangle, DT Exchange, InMobi, Liftoff를 포함한 확장된 중개 파트너를 지원해요.

이러한 통합은 개발자들에게 더 많은 기회를 제공하여 앱 수익을 극대화하는 광고 수익화 옵션을 확대시켜 줘요.

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

요약하자면, Flutter 3.22는 앱 개발자들을 위한 몇 가지 큰 개선 사항을 가져왔습니다. 그들은 그래픽 및 애니메이션에 특히 빠르고 부드러운 사용을 가능하게 만들었습니다. 또한 이미지 및 폰트와 같은 앱 자산을 구성하고 관리하는 새로운 방법을 추가하여 앱을 구축하고 유지하는 것을 더 쉽게 만들었습니다. 게다가 Android 및 iOS용으로 더 나은 딥 링크 지원 및 부드러운 스크롤링을 위한 멋진 새로운 기능이 추가되었습니다.

전반적으로, Flutter 3.22는 훌륭한 앱을 만드는 것을 더 쉽고 재미있게 만들어줍니다. 또한 이 정보는 다양한 웹사이트를 조사하여 수집했습니다. 잘못된 정보나 오해된 정보가 있는 경우 아래 댓글로 알려주시면 감사하겠습니다.

내용 중 오류가 있었다면 댓글에 언급해주세요. 개선하고 싶어합니다. 여러분의 지원은 저에게 매우 큰 의미를 갖습니다! 만족스러우셨다면 구독 고려해 주시면 감사하겠습니다.

저는 Sherish Shukla입니다, 창의적인 개발자이자 기술 애호가입니다. LinkedIn에서 저를 찾을 수도 있고 Twitter에서도 팔로우할 수 있으며 자세한 내용을 보려면 포트폴리오로 가보세요. 물론 GitHub에서도 팔로우해 주시면 감사하겠습니다.

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

좋은 하루 되세요!🙂
