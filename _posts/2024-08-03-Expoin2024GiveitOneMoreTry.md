---
title: "2024년에 Expo를 다시 시도해야 하는 5가지 이유"
description: ""
coverImage: "/assets/img/2024-08-03-Expoin2024GiveitOneMoreTry_0.png"
date: 2024-08-03 19:14
ogImage:
  url: /assets/img/2024-08-03-Expoin2024GiveitOneMoreTry_0.png
tag: Tech
originalTitle: "Expo in 2024 Give it One More Try"
link: "https://medium.com/@rolique/expo-in-2024-give-it-one-more-try-1c70dee4391b"
isUpdated: true
---

![이미지](/assets/img/2024-08-03-Expoin2024GiveitOneMoreTry_0.png)

**이 글은 Rostyslav Moroziuk이 쓰고 원본은 여기에서 확인할 수 있습니다.**

# 소개

React Native Expo는 모바일 앱 개발 분야에서 많은 관심을 받고 있습니다. 빠른 성장, 원활한 크로스 플랫폼 호환성, 활기찬 커뮤니티를 약속하며 React Native Expo는 전 세계 개발자들의 선택으로 자리잡았습니다. 그러나 어떤 기술이든 도전과 비판을 겪었습니다. 하지만 2024년의 새해가 밝아오면, React Native Expo에 다시 기회를 주는 것이 좋을 시기입니다.

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

# 옛날 문제들

이전 버전의 React Native Expo에서 개발자들이 개발 경험에 영향을 미친 여러 가지 문제와 제약 사항에 직면했습니다. 여러 개발자들이 경험한 주요 문제 몇 가지를 살펴봅시다:

- 네이티브 모듈 접근 제한. Expo의 이전 버전에서 주요 우려사항 중 하나는 네이티브 모듈 및 기기 기능에 대한 접근 제한이었습니다. Expo는 Expo SDK를 통해 넓은 범위의 미리 구축된 구성 요소 및 API를 제공했지만, 개발자들은 종종 네이티브 코드가 필요한 추가 기능이 필요했습니다. 사용자 정의 네이티브 모듈을 쉽게 통합할 수 없는 경우, 개발자들은 때로는 Expo에서 탈출하고 순수한 React Native 개발로 전환해야 할 수도 있습니다. Expo에서 탈출함으로써, 개발자들은 앱의 네이티브 코드에 대한 완전한 제어권을 되찾을 수 있으며 필요에 따라 사용자 정의 네이티브 모듈을 통합할 수 있습니다. 그러나 이 결정은 증가된 복잡성, 가파른 학습 곡선 및 Expo의 편의 기능 손실을 포함한 트레이드 오프를 야기했습니다. 내 경험상으로는 모든 Expo 프로젝트가 탈출됨으로써 끝나게 되었습니다.
- 성능 / 크기 병목 현상. Expo는 원시 개발 프로세스의 복잡성을 추상화하여 React Native 애플리케이션을 편리하게 구축하고 관리하는 방법을 제공합니다. 그러나 이 추상화에는 포함된 트레이드 오프가 있으며, 이는 React Native CLI 앱보다 큰 번들 크기를 가질 수도 있다는 것을 의미합니다. 성능 문제는 느린 사용자 인터페이스, 더 긴 로드 시간 및 전반적인 앱 응답 속도 감소로 이어질 수 있습니다.
- 빌드 프로세스에 대한 제어 부족. Expo는 Expo SDK를 통해 다양한 미리 구축된 구성 요소 및 API를 제공했지만, 개발자들은 기본 네이티브 코드를 직접 수정하거나 액세스할 수 없었습니다. 이 제한으로 인해 사용자 정의 네이티브 모듈을 통합하거나 네이티브 코드를 변경해야 하는 저수준 최적화를 수행하는 것이 어려워졌습니다. 개발자들은 프로젝트에서 사용하는 종속성의 특정 버전을 덜 제어할 수 있었습니다. 어떤 경우에는 이 제어 부족이 호환되지 않거나 오래된 종속성으로 인한 문제를 초래할 수도 있습니다.

당연히, 예전 Expo 버전의 제약으로 인해 몇 년 전에 개발자들이 Expo 사용을 중단한 것은 타당합니다. 많은 개발자들에게 편리성과 사용 편의성을 제공하는 한편, Expo는 개발 및 빌드 프로세스에 대한 미세 조정을 필요로 하는 프로젝트에는 항상 적합하지는 않았을 수 있습니다.

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

그 때부터 Expo가 계속 발전하고 개선되고 있다는 사실을 주목할 가치가 있어요. Expo 팀은 개발자들이 제기한 많은 우려점에 대응하며 새로운 기능, 최적화 및 유연성을 소개하여 이후 버전에서 업그레이드되었어요. Expo는 이제 교차 플랫폼 애플리케이션을 빌드하고 배포하며 관리하기 위한 포괄적인 플랫폼으로 발전했어요.

스포일러: Expo가 가지고 있던 모든 개발 문제가 해결되었거나 개선되었어요.

# 요즘 Expo는 무엇인가요?

![Expo](/assets/img/2024-08-03-Expoin2024GiveitOneMoreTry_1.png)

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

# Managed Workflow 및 Bare Workflow

Managed Workflow. Managed Workflow에서는 네이티브 코드나 빌드 구성을 관리할 필요 없이 Expo의 인프라를 사용하여 앱을 빌드, 테스트 및 배포할 수 있습니다. Expo는 over-the-air 업데이트, 푸시 알림 및 자산 최적화를 처리하여 개발자가 앱 개발에 집중할 수 있도록 지원합니다.

Bare Workflow. Expo는 더 많은 사용자 정의 및 네이티브 코드 액세스가 필요한 프로젝트를 위해 베어 워크플로우를 제공합니다. Bare Workflow에서 개발자는 앱의 네이티브 코드를 완벽히 제어할 수 있으며 필요에 따라 사용자 정의 네이티브 모듈, 플랫폼별 기능 및 타사 라이브러리를 통합할 수 있습니다. 이 접근 방식은 Expo의 개발 도구와 서비스를 활용하면서도 유연성과 제어권을 제공합니다. 기존의 React Native 앱에서 Expo SDK와 EAS를 사용할 수 있습니다.

네이티브 코드에 직접 액세스할 수 있는 경우 베어 프로젝트입니다. 다시 말해, android와(또는) ios 폴더가 있는 경우에는 베어 워크플로우를 사용합니다.

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

Managed Workflow은 플랫폼의 핵심 기능으로, 개발자들에게 간소화된 개발 경험을 제공합니다. Expo 팀은 가능한 많은 프로젝트에 적합하도록 만들기 위해 많은 노력을 기울였습니다.

# 쉬운(어려운) 설정

Expo 프로젝트를 설정하는 것은 Expo CLI 도구 덕분에 비교적 간단합니다. 이 도구는 프로세스를 간소화합니다.

노드(Node)와 왓치맨(Watchman) 도구를 설치하고 npx create-expo-app 명령을 실행해야 합니다.

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

그게 다예요. 이제 응용 프로그램을 사용할 준비가 되었어요. 디렉토리로 이동해서 다음 명령 중 하나를 실행하세요:

```js
- yarn android
- yarn ios
```

Android 또는 iOS 기기에서 프로젝트를 열려면 상점에서 Expo Go라는 앱을 다운로드해야 해요.

# Expo 애플리케이션 서비스 (EAS)

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

Expo EAS는 모바일 앱 개발을 위한 다양한 유용한 기능과 향상 사항을 제공하여 업데이트 중에서 제가 가장 선호하는 업데이트입니다. 코드를 클라우드에서 빌드하고 사인하고 배포할 수 있습니다. 그 강력함과 편의성으로 개발 프로세스가 훨씬 더 효율적이고 즐겁고 빨라지게 됩니다.

다음은 EAS의 주요 구성 요소 및 기능 몇 가지입니다:

- 빌드 서비스: EAS는 iOS 및 Android용 네이티브 앱 바이너리를 자동으로 빌드하는 클라우드 기반 빌드 서비스를 제공합니다. EAS Build를 사용하면 자체 빌드 인프라를 설정하고 유지 관리하지 않고도 클라우드에서 앱을 빌드할 수 있습니다. EAS Build는 관리 및 베어 워크플로를 모두 지원하여 특정 요구 사항에 따라 앱을 빌드하고 사용자화할 수 있습니다.
- iOS 앱을 빌드하기 위해 Mac이 필요하지 않습니다. Expo는 iOS 빌드를 위해 기본적으로 M1 워커를 사용하며 빌드 시간을 거의 두 배 빠르게 개선합니다. 대규모 iOS 빌드는 M2에서 실행되며 빌드 프로세스를 더욱 가속화시킵니다.
- 제출 서비스: EAS는 앱을 Apple App Store 및 Google Play Store에 제출하는 프로세스를 간소화하는 제출 서비스를 제공합니다. EAS Submit을 사용하여 코드 서명, 앱 스토어 프로비저닝 및 메타데이터 관리를 자동화할 수 있습니다. 터미널이나 CI에서 단일 명령을 사용하여 앱을 제출할 수 있습니다.
- OTA 업데이트: EAS를 사용하면 새 버전을 앱 스토어에 제출하지 않고도 필요한 경우 앱 업데이트를 온라인으로 배포할 수 있습니다. EAS 업데이트를 통해 배포 프로세스가 간소화되며 사용자가 최신 기능 및 버그 수정을 빠르고 효율적으로 받을 수 있습니다.
- 내부 배포: EAS Build는 iOS에서 ad hoc 프로비저닝을 사용하고 Android에서 표준 APK 사이드로딩을 통해 앱 스토어를 거치지 않고 내부 배포를 위한 빌드용 공유 가능한 URL을 제공합니다.

Expo 프로젝트에 네이티브 코드를 포함하는 라이브러리를 추가하고 싶을 때, EAS Build를 활용하여 Expo의 간소화된 개발 환경을 유지할 수 있습니다. 게다가 Pods 및 기타 네이티브 라이브러리 구성을 조정할 필요가 없습니다. 모든 것이 EAS Build에서 처리됩니다. 그러므로 더 이상 앱을 분리할 필요가 없습니다. 그런데 Expo 팀은 이 프로세스의 이름을 변경했습니다. expo eject 명령은 더 이상 존재하지 않으며 expo prebuild로 대체되었습니다.

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

Expo를 사용하려면 항상 오픈 소스이며 무료인 Expo EAS가 필요하지 않습니다. 다른 CI/CD 서비스를 선택할 수 있습니다. 게다가, 제가 언급한대로, Expo의 오픈 소스 도구를 사용하든 말든 React Native 프로젝트 모두에 EAS를 사용할 수 있습니다.

앱을 로컬로 빌드하려면 가능합니다. 빌드 명령에 특별한 플래그 eas build --local을 전달하기만 하면 됩니다.

개인 또는 취미 프로젝트에는 항상이 놀라운 서비스를 무료로 사용할 수 있습니다. 더 많은 가격 정보는 여기에서 확인할 수 있습니다.

# 개발용 빌드

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

당신의 애플리케이션을 위해 커스텀 개발 클라이언트를 만들면 표준 Expo Go 런타임에서 제공하는 기능을 확장하고 사용자 정의할 수 있습니다. 다른 말로 하면, 그것은 당신 버전의 "Expo Go"입니다.

개발 빌드를 사용하면 네이티브 종속성을 설치하고 Expo를 변경하지 않고 사용할 수 있습니다. 이는 사용자 정의 네이티브 모듈이나 Expo Go가 지원하지 않는 구성이 필요한 기능에 대해 테스트 및 반복 작업이 필요할 때 특히 유용합니다 (예: Firebase). 이는 즉, 네이티브 코드를 포함하는 라이브러리를 설치해야 할 때 Expo Go 사용에서 커스텀 개발 빌드로 전환하기만 하면 됩니다. 개발 빌드는 매번 만들 필요가 없으며 새로운 네이티브 라이브러리가 추가되거나 네이티브 코드의 구성이 변경될 때만 재생성하면 됩니다.

커스텀 개발 클라이언트는 Expo Go와 동일한 기능과 도구를 제공합니다. 커스텀 개발 클라이언트를 활용하면 Expo CLI를 통해 프로젝트 관리를 계속할 수 있습니다. 앱을 실행하는 것은 QR 코드를 스캔하거나 최근 활성화된 프로젝트 목록에서 선택하는 것만큼 간단합니다.

사용을 시작하는 단계는 단 두 가지뿐입니다:

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

```js
// 특수 라이브러리 설치
npx expo install expo-dev-client

// EAS를 사용하여 개발용 빌드 생성
eas build --profile development

// Expo.dev에서 계정으로부터 앱 다운로드하기
```

개발용 빌드는 프로젝트 초기 단계를 제외하고 Expo 개발 프로세스의 미래입니다.

# Expo 라우터

Expo 팀은 라우팅 시스템을 빠르고 쉽게 만들어서 중첩된 네이티브 네비게이션 앱을 만들고 유지 및 확장하기 쉽게 하려고 노력했습니다.

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

Exp􀑼 􀑽􀑢 Ro􀑣er􀀉 나􀑼􀀉 털머 앱용 웹 􀑵로ㅕ 􀑽스템입니다. 􀑣적􀀉 모􀑼 및 웹 어플리케이션을 위해 설􀀉된 파일 지향적 라우팅 솔루션입니다.

파일 시􀀉 기반 라우터를 활용한 아이디어는 웹 개발􀑳(PHP 및 Ne􀑽.js 등)에 친숙합니다. 그러나 모바일 개발에 이를 적용한 것은 최근의 혁신입니다. 주요 기능은 앱 내의 화면 간 원활한 네비게이션을 가능하게 하여 사용자가 앱의 사용자 인터페이스의 다양한 섹션 사이를 원할하게 이동할 수 있도록 하는 것입니다.

Expo Ro􀑣er를 도입함으로써 개발􀑼는 웹 개발􀀈의 파일 시􀀉 라우팅 원칙의 효율성을 활용하고 이를 적용하여 유니버셜 어플리케이션을 만들 수 있습니다.

Expo Ro􀑣er 네비게이션은 본연적􀀉 네이티브하며 각 플랫폼에 최적화되어 있습니다. 앱 내의 모든 화면은 자동적으로 딥 링킹을 지원하므로 어떤 루트도 링크를 통해 쉽게 공유할 수 있습니다.

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

웹 애플리케이션에서 SEO에 친화적입니다.

Expo CLI는 Expo Router 애플리케이션의 각 라우트에 대한 정적 유형 정의를 지속적으로 생성할 수 있어 자동 TS 정의가 가능합니다.

비동기 라우트를 지원합니다. 모두 한 번에 번들링하는 대신 페이지별로 앱을 번들링할 수 있습니다. 이 기능은 많은 화면을 포함하는 대규모 앱 내 협업이나 관리에 매우 유용합니다.

Expo Router는 전체 네비게이션 구조를 빠르게 에뮬레이션할 수 있는 Jest 유틸리티 세트를 제공합니다.

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

엑스포는 API 라우트를 발표했어요 —

모든 이런 기능을 가지고, 엑스포 라우터는 이제 첫 번째 유니버설 풀스택 리액트 라우팅 시스템이 되었어요.

# 푸시 알림

푸시 알림은 엑스포의 푸시 알림 서비스를 사용하여 모바일 앱에 쉽게 통합할 수 있어요. 엑스포는 앱에서 푸시 알림을 설정하고 사용하는 방법에 대한 포괄적인 문서 및 안내서를 제공해요. 새 앱을 개발하거나 기존 앱에 푸시 알림을 추가하는 경우, 엑스포의 푸시 알림 서비스를 사용하면 사용자와 소통하고 중요한 업데이트와 이벤트에 대해 정보를 제공하는 것이 쉬워져요.

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

엑스포는 iOS 및 Android 플랫폼에 대한 푸시 알림 설정 시에 발생하는 복잡성의 많은 부분을 추상화 처리합니다. Apple (APNs - Apple Push Notification service) 및 Google (FCM - Firebase Cloud Messaging)로부터 푸시 알림 자격 증명을 획들한 후, 종속성을 설치하고, 기기의 푸시 알림 토큰을 수신하고, 알림 핸들러를 설정하기만 하면 됩니다. 엑스포는 앱의 푸시 알림 설정 방법에 대한 상세 문서를 제공합니다. 앱은 설정 구성에서 어떠한 복잡성도 없이 백그라운드 및 포그라운드 알림을 수신할 수 있습니다. 네이티브 코드 구성, 네이티브 라이브러리의 설치 및 해당 피어 종속성에 대해 걱정할 필요가 없습니다.

푸시 알림이 설정되면, 엑스포의 Push API를 사용하여 앱 사용자에게 알림을 보낼 수 있습니다. 이는 서버에서 프로그래밍적으로 또는 엑스포의 웹 대시보드를 통해 수행할 수 있습니다. 개발자는 개별 기기, 기기 그룹 또는 앱을 설치한 모든 기기에 알림을 보낼 수 있습니다.

# OTA(Over-the-Air) 업데이트

Expo 업데이트는 Expo 플랫폼의 라이브러리로, Expo로 제작된 모바일 앱에 대해 OTA(Over-the-Air) 업데이트를 관리하고 제공하는 데 설계되었습니다. 이를 통해 개발자는 전통적인 앱 스토어 업데이트 프로세스를 거치지 않고 사용자의 기기로 앱 업데이트를 직접 배포할 수 있습니다. 이는 버그 수정, 성능 향상 및 새로운 기능을 신속하고 효율적으로 출시하는 데 매우 유용합니다.

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

엑스포 업데이트는 엑스포의 관리되는 workflow와 완벽하게 호환되어 개발자들이 bare workflow로 이동하지 않아도 기능을 활용할 수 있습니다. 이로 인해 입문자부터 경험 있는 전문가까지 다양한 개발자와 프로젝트에서 접근할 수 있습니다.

구성 프로세스는 매우 빠르고 쉽습니다. EAS 업데이트 서비스를 이용하여 빌드에 업데이트를 게시할 수 있습니다. 엑스포 업데이트는 롤백 기능도 지원하여 실수로 배포된 회귀로부터 안전하게 보호받을 수 있습니다. 제작 앱에 특정 버전을 사용하도록 지시하고 OTA 업데이트를 무시하도록 설정할 수 있습니다.

개발 빌드에서 새로운 Extensions 탭을 통해 EAS 업데이트를 직접 확인하고 테스트할 수 있습니다.

# 디버깅

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

앱의 JavaScript 코드를 디버깅하려면 Chrome 개발자 도구를 사용할 수 있어요. 개발 빌드와 기본 엔진인 Hermes 엔진을 사용하여 웹 디버깅의 모든 기능을 활용할 수 있어요: 콘솔, 중단점, 소스 탭 및 네트워크 요청 검사 등을 할 수 있어요.

Expo Go에서도 네트워크 디버깅이 가능해요. Expo CLI에서 직접 시작할 수 있어요.

Expo Tools VS Code 확장 프로그램을 사용하면 디버깅과 앱 구성 자동완성이 더 편리해요. VS Code에서 앱을 직접 디버깅할 수 있어요. 또한 eas.json 또는 app.json과 같은 설정 파일을 편집하고, app.json 또는 app.config.js의 변경이 native 파일인 AndroidManifest.xml, Info.plist 등에 어떻게 영향을 미치는지 보여줍니다.

Expo 팀은 Expo Dev Tools 플러그인을 출시했어요. 이 API를 사용하면 라이브러리 제작자와 앱 개발자가 라이브러리 또는 애플리케이션의 다양한 측면을 디버깅하고 상호 작용할 수 있는 브라우저 기반 플러그인을 구성할 수 있어요. 이미 Expo 팀이 Apollo Client, TanStack Query, TinyBase, React Native Async Storage, React Navigation 등과 같은 잘 알려진 도구를 위한 몇 가지 플러그인을 만들었어요.

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

# Expo SDK 업그레이드

Expo 프로젝트를 업그레이드하는 것은 최신 Expo 도구와 라이브러리와 호환성을 보장하기 위해 다양한 종속성 및 구성 요소를 업데이트하는 과정을 포함합니다. 하지만 이 글에서 익숙해져 오신대로, 모든 복잡하고 시간이 많이 소요되는 작업은 항상 몇 줄의 코드로 빠르게 완료됩니다. 더욱이 이 작업은 벡시 React Native보다 훨씬 빠릅니다.

```js
// EAS CLI 업그레이드
npm i -g eas-cli

// expo 버전 업그레이드
yarn add expo@latest

// 종속성 업그레이드
npx expo install --fix
```

그게 다입니다. Expo는 항상 중요한 변경 사항을 발표합니다(예: https://expo.dev/changelog/2024/01-18-sdk-50#notable-breaking-changes). 업그레이드 중 문제가 발생하면 Expo 문서, 릴리스 노트 또는 커뮤니티 포럼을 참조하여 이를 해결하는 데 도움을 받을 수 있습니다. 코드, 구성 또는 종속성을 조정하여 호환성 문제를 해결해야 할 수도 있습니다.

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

Expo CLI은 종속성을 스캔하고 미해결된 문제를 강조하는 npx expo-doctor@latest라는 하나의 명령어를 제공합니다.

Expo 팀은 폐지 예정인 기능/기능을 약 6개월 전에 정기적으로 블로그나 문서에서 업데이트를 통해 발표하며 모든 릴리스 계획을 준수합니다.

# 성능 향상

React Native Expo에서 가장 주목할 만한 개선 사항 중 하나는 성능 향상입니다. Expo 팀은 프레임워크를 최적화하는 데 매진하여 시작 시간을 줄이고 렌더링 성능을 향상시키며 메모리 사용량을 최소화했습니다. 이러한 노력 덕분에 Expo 앱은 요구가 많은 시나리오에서도 더욱 부드럽고 빠르게 실행됩니다.

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

헤르메스는 이제 기본 JavaScript 엔진이 됐어요. 안드로이드 기기에서 React Native 앱을 실행하기 위해 최적화된 오픈 소스 JavaScript 엔진이에요. Facebook에서 개발된 헤르메스는 다양한 최적화 기술을 활용하여 React Native 앱의 성능과 시작 시간을 향상시키기 위해 노력하고 있어요. 헤르메스는 메모리 효율성에 최적화되어 있어 다른 JavaScript 엔진과 비교했을 때 메모리 오버헤드를 줄일 수 있어요.

그러나 app.json 파일에 jsEngine 속성을 추가함으로써 다시 JSC 엔진으로 전환하는 것도 항상 가능해요.

expo-crypto, expo-haptics, expo-localization 등 일부 모듈은 JSI로 이동했어요. React Native에서 자바스크립트와 네이티브 코드를 원활하게 연결하기 위한 강력한 기능인 JSI를 소개했어요. JSI를 사용하면 개발자들이 자바스크립트에서 네이티브 코드를 직접 호출하고 그 반대로도 가능해져 두 환경 간 효율적인 통신이 가능해져요.

또한, Expo CLI가 훨씬 더 빨라지고 가벼워졌다는 것을 언급할 가치가 있어요.

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

# 강력한 SDK

Expo SDK는 iOS, Android 및 Web용으로 전체 앱을 구축하기 위해 Expo가 제공하는 도구, API 및 구성 요소의 집합입니다. Expo SDK는 이제 대부분의 장치 및 시스템 기능을 지원하며, 오디오 및 비디오 재생을 위한 API, 백그라운드 다운로드와 함께 파일 시스템, 장치 모션 센서, 안전한 저장소, 음성 인식기, 사용자를 추적하기 위한 권한 요청을 위한 라이브러리, 런타임에서 루트 뷰 배경색을 수정하기 위한 라이브러리 등의 기능을 제공합니다.

Expo는 FlashList, Lottie, MapView, Reanimated, Skia, Stripe 등과 같은 다양한 사전 설계된 UI 구성 요소를 제공하여 개발자가 앱의 사용자 인터페이스를 만들기 위해 사용할 수 있습니다.

# 커뮤니티

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

React Native Expo는 전 세계적으로 강력한 온라인 공개를 자랑합니다. 전문 포럼, 토론, 그리고 Discord를 통한 실시간 소통이 있습니다. Reddit 및 Stack Overflow와 같은 플랫폼은 열정적인 개발자들이 아이디어를 교환하고 문제를 해결하며 동료 애호가들에게 지원을 제공하는 활발한 커뮤니티를 운영합니다.

종합적인 문서와 자습서는 어떠한 기술의 성공에 있어서 매우 중요한 요소이며, React Native Expo는 이 분야에서 뛰어난 성과를 보여줍니다. 공식 Expo 문서는 자세한 안내서, API 참조 및 코드 샘플을 제공하여 개발자가 효과적으로 플랫폼의 기능을 탐색할 수 있도록 돕습니다.

Expo 팀이 작성한 블로그 게시물은 React Native Expo를 최대한 활용하기 위한 모범 사례, 꿀팁 및 노하우에 대한 통찰을 제공합니다. 이러한 리소스들은 개발자들이 프레임워크를 빠르게 시작하고 학습 곡선을 가속화하는 데 도움을 줍니다.

Expo 팀은 정기적으로 베타 버전을 출시하고 여기서 개발자로부터 피드백을 수집합니다. 따라서 모든 개발자가 Expo의 개발에 직접적으로 영향을 미칠 수 있습니다. 그들은 또한 Expo Router와 같은 새로운 모듈에 대한 토론에 개발자들을 환영합니다.

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

# 기타 유용한 기능

- 모노레포 설정을 지원하는 도구 및 기능을 제공합니다.
- React를 사용하여 풀 스택 웹 사이트를 만드는 데 탁월한 지원을 제공합니다. Expo 웹 사이트는 정적으로 렌더링되어 SEO 및 성능을 향상하거나 클라이언트 측에서 렌더링되어 브라우저 내에서 애플리케이션과 유사한 경험을 제공할 수 있습니다.
- Expo Modules API — 커스텀 네이티브 코드를 작성하는 데 강력한 API 및 유틸리티 세트입니다.

# 결론

![Expoin2024GiveitOneMoreTry_2](/assets/img/2024-08-03-Expoin2024GiveitOneMoreTry_2.png)

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

미래를 바라볼 때, React Native Expo의 방향은 매우 밝아 보입니다. 성능, 네이티브 통합 및 커뮤니티 지원을 기반으로 한 튼튼한 기반을 갖춘 Expo는 앞으로도 성장하고 발전할 수 있는 위치에 있습니다. 경험이 풍부한 개발자이든 막 시작한 개발자이든 React Native Expo는 아름답고 성능이 우수하며 기능이 풍부한 크로스 플랫폼 애플리케이션을 구축하는 데 매력적인 플랫폼을 제공합니다.

그러나 Expo가 모든 프로젝트나 개발 시나리오에 완벽히 맞는 것은 아직 아닐 수도 있습니다. 개발 도구와 프레임워크의 선택은 프로젝트 요구 사항, 팀 환경 및 개발자의 개별 경험에 따라 다릅니다. 각 옵션의 장단점을 신중히 평가하고 프로젝트 목표 및 개발 철학과 가장 일치하는 방법을 선택하는 것이 중요합니다. 아직 시도해보지 않았다면, Expo를 다시 검토해볼 가치가 있을 수 있으며 현재 여러분의 요구 사항과 더 잘 부합하는지 살펴볼 수 있습니다.

Expo는 모바일 개발을 넘어 JS 개발의 전 영역(모바일 및 웹 애플리케이션, 심지어 백엔드까지)을 점유하려는 것으로 보입니다.
