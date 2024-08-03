---
title: "플러터 SDK 구축하기 Part2 pubdev 알아보기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Building a Flutter SDK Part 2 A Deep Dive Into pubdev"
link: "https://medium.com/flutter-community/building-a-flutter-sdk-part-2-a-deep-dive-into-pub-dev-03f8339fbc2c"
---



## 모든 측면을 배우고 자신만의 Flutter 패키지를 만들어보세요

![이미지](/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_0.png)

# 소개

Flutter SDK 빌드는 스크래치부터 자신의 Flutter 패키지 및 SDK를 만드는 시리즈입니다. 이 시리즈의 기사들은 Stream Flutter 팀이 우리 자신의 Flutter SDK를 만들면서 배운 교훈을 문서화합니다. 시리즈는 두 개의 SDK를 사용하여 실제 상황을 더 자세히 살펴볼 수 있는 예시로 사용합니다.

<div class="content-ad"></div>

- Stream Chat Flutter
- Stream Video Flutter

시리즈의 일환으로 플러터 패키지를 분석하는 제1부는 플러터 패키지의 모든 측면을 다룹니다. 기존 파일의 목적을 탐구하고 나만의 패키지를 발행하는 방법까지 살펴 봤습니다. 이제 패키지를 빌드하고 발행하는 방법을 이해했으므로, 분배 방법에 주목할 차례입니다.

개발자들이 플러터에서 앱을 빌드하는 학습을 시작할 때 의존성 추가는 처음에 다루는 항목 중 하나입니다. 오늘날 매우 적은 프로젝트가 어떠한 의존성도 없이 존재할 수 없지만, 플러터에서 외부 패키지는 각 플랫폼별로 고유한 네이티브 코드를 포함하고 있기 때문에 더욱 중요합니다.

구글이 Fuchsia를 출시하기 전까지 네이티브 코드는 Dart 이외의 언어로 작성될 것입니다. 플러터가 여러 플랫폼을 지원하므로 모든 플랫폼에 대한 네이티브 코드를 개발자가 작성하는 것은 불합리합니다. 이 어려움은 모든 플랫폼이 응용 프로그램을 다르게 처리하기 때문에 더욱 어려워집니다. 예를 들어, Windows는 응용 프로그램을 위한 여러 창을 가질 수 있지만, Android와 iOS는 그렇지 않습니다. 외부 패키지는 모든 앱의 중요한 요소이며, 이를 위한 적절한 배포 소스가 플러터 프레임워크 자체의 웰빙에 중요합니다.

<div class="content-ad"></div>

pub.dev 또는 간단히 "Pub"은 모든 공개적인 Flutter 패키지의 주된 Google 호스팅 저장소입니다. 만약 Flutter SDK를 개발 중이라면, 여러분의 모든 패키지는 아마도 대부분의 경우에 pub에 올라가게 될 것입니다. 패키지를 게시하는 다른 방법도 있지만, 이후에 살펴보겠지만 거의 대부분의 SDK/패키지 개발자들은 단순히 패키지를 pub에 게시하는 것을 선호합니다.

이 글에서는 pub.dev에 대해 모든 것을 알아보겠습니다. 시작해봅시다.

# 패키지 저장소에 대해

패키지를 관리하고 배포하는 것은 항상 쉬운 작업이 아닙니다. Flutter 개발자로서는 조금 지루할 수 있지만, Android 및 iOS를 살펴보면 어려움이 더욱 분명해집니다. 두 플랫폼의 대부분 패키지는 여러 패키지 배포 사이트를 통해 배포될 수 있으며 프로젝트에 다양한 방법으로 통합될 수도 있습니다.

<div class="content-ad"></div>

안녕하세요! 안드로이드 라이브러리들은 보통 Maven Central, Google Maven Repository, 그리고 과거에는 JCenter와 같은 플랫폼에 출판됩니다. 개발자들은 종종 Gradle 또는 Maven과 같은 도구를 사용하여 종속성을 관리하고 이러한 라이브러리를 Android 프로젝트에 포함시킵니다.

iOS의 경우, 라이브러리들은 주로 CocoaPods 또는 Carthage를 통해 배포됩니다. CocoaPods는 Swift 및 Objective-C Cocoa 프로젝트를 위한 의존성 관리자이며, Carthage는 특히 Swift 프로젝트를 위한 다른 의존성 관리자입니다. 개발자들은 각각의 프로젝트의 Podfile 또는 Cartfile에 종속성을 지정한 후 CocoaPods나 Carthage를 사용하여 이러한 라이브러리를 iOS 프로젝트에 가져와 통합할 수 있습니다. 또한 iOS 라이브러리를 바이너리 프레임워크로 배포하거나 수동 통합을 통해 제공할 수도 있습니다.

과거 양 플랫폼 모두 언어 전환을 경험했습니다; 안드로이드는 Java에서 Kotlin으로, iOS는 Objective-C에서 Swift로 전환했습니다. 두 언어 간의 상호 운용성에 대한 적절한 지원은 있지만 종종 오래된 패키지를 새로운 앱에서 사용할 때 문제가 발생할 수 있습니다.

상기한 플랫폼들과 비교했을 때, 현재 기준으로 Flutter는 패키지를 위한 보다 간단한 배포 및 통합 시스템을 갖고 있습니다. 현재 시점에서 pub이라는 유일한 주요 Flutter 패키지 배포 사이트이며, pub로부터 패키지를 가져오는 것이 강제되는 것은 아니지만, 그러나 널리 사용되고 있습니다.

<div class="content-ad"></div>

# pub.dev이란 무엇인가요?

![Building a Flutter SDK Part 2: A Deep Dive Into pub.dev](/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_1.png)

Pub.dev은 Google의 Flutter 팀에서 개발하고 유지 보수하는 Dart와 Flutter의 공식 패키지 저장소입니다. Dart 및 Flutter 프로젝트에서 패키지를 발견하고 공유하며 사용할 수 있는 중앙 허브로 작용합니다.

# pub에서의 패키지 점수

<div class="content-ad"></div>

패키지 소스 코드를 매번 탐색하는 것은 꽤 어렵기 때문에, 개발자가 패키지의 품질을 판단하는 방법이 오랜 시간을 들이지 않고도 가능해야 합니다. 이를 위한 다양한 방법이 있지만, 대부분의 방법에는 의구심을 품는 사람들이 있습니다. 팀을 포함하는 리뷰 시스템은 종종 논란이 될 수 있으며, 오픈 소스 시스템에서는 관련 가이드라인이 너무 엄격하게 보일 수 있습니다.

pub가 정착한 방법은 세 가지 주요 지표를 갖춘 시스템입니다: 두 개는 pub에 의해 자동 생성되고 업데이트되는 패키지 지표 세트이며, 세 번째는 커뮤니티가 패키지에 대한 승인을 표시하는 "좋아요" 수입니다.

패키지 안에서 이러한 지표를 다음과 같이 표시할 수 있습니다:

![Building a Flutter SDK Part 2: A Deep Dive into pub.dev](/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_2.png)

<div class="content-ad"></div>

좋아요 수는 쉽게 이해할 수 있지만, 보드의 다른 메트릭은 그다지 명확하지 않을 수 있어요. 플러터 문서를 인용하자면, 인기 메트릭은 다음과 같이 정의됩니다:

문서는 또한 미래에 절대 사용 횟수가 제공될 수 있다고 언급합니다. 절대 카운트가 없는 것은 종종 문제가 될 수 있는데, 이는 패키지 메트릭이 스트림과 같은 서비스용 SDK를 구축할 때 상당히 중요하기 때문이에요. 사용 통계가 있다면 패키지 개발자들에게 SDK를 다운로드하는 개발자 수와 실제 사용자 수의 차이를 보여줌으로써 SDK의 사용 편의성과 채택률을 더 잘 파악할 수 있게 해줄 거예요.

마지막으로, "퍼브 포인트" 메트릭은 패키지에서 생성된 자동 점수에요. 패키지의 퍼브 포인트를 높이는 조건들은 다음과 같아요:

<!-- Markdown 형식으로 변경 -->

![BuildingaFlutterSDKPart2ADeepDiveIntopubdev_3](/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_3.png)

<div class="content-ad"></div>

Google의 Flutter 팀은 SDK가 가져야 하는 몇 가지 품질을 설정했습니다:

Dart 규칙 준수: 유효한 pubspec.yaml, README.md, CHANGELOG.md 및 공개 소스 라이센스 보유. 사용자 정의 라이센스를 사용하면 현재 시스템에서 패키지 점수가 10 점 낮아집니다.

문서 제공: 패키지의 공개 API의 20%에 대한 문서 주석(“///”은 문서 주석)을 제공해야 합니다. 또한 패키지 루트에 예제 폴더를 통해 예제를 제공해야 합니다. 이론적으로 하나의 파일(example/lib/main.dart)만 작성해도 pub이 이를 유효한 예제로 인정할 수 있습니다. 그러나 사용자가 테스트를 수행하고 향후 문제를 줄이기 위해 완전한 예제를 추가하는 것을 권장합니다.

플랫폼 지원: 패키지가 더 많은 플랫폼을 지원하면 추가 pub 포인트를 얻을 수 있습니다. 대부분의 Dart 패키지는 비교적 쉽게 이를 할 수 있지만, 플러그인은 모든 플랫폼에 네이티브 코드를 필요로 할 수 있습니다.

<div class="content-ad"></div>

정적 분석 통과: 패키지가 업로드되면 pana 명령이 실행되어 패키지에서 정적 오류를 확인합니다. 오류, 경고, 린트 오류 또는 형식 지정 문제가 있으면 pub 포인트가 낮아질 수 있습니다.

최신 종속성 지원: 이 체크는 모든 종속성 및 전반적인 패키지가 최신 Dart 및 Flutter SDK를 지원하는지 확인합니다. 이를 확인하려면 다음 명령을 실행할 수 있습니다: dart pub outdated --no-dev-dependencies --up-to-date --no-dependency-overrides.

# 메타데이터 관리

모든 패키지에는 패키지에 대해 자세히 알아볼 수 있는 잠재적인 사용자를 위한 메타데이터가 포함되어 있습니다. 이는 문서, 웹 사이트, 이슈 트래커 및 기타 리소스를 액세스할 수 있도록 합니다. 패키지에 추가할 수 있는 모든 종류의 메타데이터가 아니라 패키지에 추가할 수 있는 가시적 메타데이터를 다루는 내용은 이전 시리즈의 [pubspec.yaml](https://getstream.io/blog/breaking-down-flutter-package/) 섹션을 참조해주세요.

<div class="content-ad"></div>

패키지 목록에서 메타데이터로 추가할 수 있는 주요 사항은 해당 패키지가 다루는 주제입니다. 저희 Video SDK의 경우, 패키지가 비디오, 오디오, 라이브 스트리밍 등을 다룰 수 있다는 것을 나타내고 싶었는데, 이는 다음과 같이 나타납니다:

<img src="/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_4.png" />

Flutter 패키지에 주제를 추가하려면, 다음과 같이 pubspec.yaml 파일의 루트에 topics 태그를 추가하십시오:

```js
topics: -video - audio - audioroom - webrtc - livestream;
```

<div class="content-ad"></div>

패키지 안에는 측면에 메타데이터가 표시됩니다. flutter_bloc의 메타데이터를 살펴봅시다.

![metadata](/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_5.png)

메타데이터에는 패키지 설명, 홈페이지, 저장소, 이슈 트래커, 기여 페이지, 주제 및 문서가 포함됩니다. 이러한 모든 내용은 pubspec.yaml 파일에서 설정할 수 있습니다. 이전 글에서 확인할 수 있었던 것처럼요.

또한 이에 추가로, 스크린샷을 패키지에 메타데이터로 추가할 수도 있습니다. 이는 README.md 파일에 추가한 스크린샷과 다릅니다. 이 스크린샷은 메타데이터 위에 표시됩니다.

<div class="content-ad"></div>

<img src="/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_6.png" />

열어보면 스크린샷을 스와이프하면서 모두 확인할 수 있고 이에 설명을 추가할 수도 있어요:

<img src="/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_7.png" />

스크린샷을 추가하려면 pubspec.yaml 파일의 루트에 동일한 필드를 추가해야 해요:

<div class="content-ad"></div>

```yaml
screenshots:
  - description: The flutter bloc package logo.
    path: screenshots/logo.png
```

이미지에 대한 설명은 동일한 태그의 필드로 추가할 수 있습니다.

# 플러터 Favorites에 대해

출판 웹 사이트에서 Flutter Favorites라는 프로그램이 다음과 같이 나열된 특정 패키지와 함께 표시됩니다:```

<div class="content-ad"></div>

![Building a Flutter SDK Part 2: A Deep Dive into pub.dev](/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_8.png)

플러터 Favorites 프로그램은 널리 사용되는 패키지 및 플러그인을 강조하며, 앱을 개발할 때 고려할 것을 추천하는 팀입니다. 제목이 자체 구현에 적합하다는 것을 의미하지는 않는다는 점을 주의해야 합니다. 항상 패키지 및 플러그인이 앱 요구사항과 일치하는지 확인하세요.

패키지 목록을 추천하는 시스템을 정의하는 것은 종종 어렵습니다. 인기 있고 유지보수되는 패키지를 선택해야 한다고 생각하기 쉽지만, 여러 인기 패키지는 앱을 만들 때 단축키와 안티 패턴을 촉진해 나준힌 이후에 개발 속도를 느리게 할 수 있습니다.

개인적으로, 내가 올바른 패키지를 추천하는 완벽한 해결책이 있는지 모릅니다. 그러나 지금은 GDE들과 주요 플러터 전문가 팀이 목록의 패키지를 선정합니다. 그들 중 몇몇을 알고 있기 때문에 그들의 추천을 받아들일 것입니다. 🙂

<div class="content-ad"></div>

프로그램에 패키지를 추가하려면 필요한 항목을 여기에 소개하고 있어요:

- 전체적인 패키지 점수
- 허용되는 라이선스, Apache, Artistic, BSD, CC BY, MIT, MS-PL, 그리고 W3C를 비롯한 기타 라이선스
- GitHub 버전 태그가 pub.dev의 현재 버전과 일치해야 합니다. 이렇게 하면 패키지의 소스를 정확하게 확인할 수 있어요.
- 기능 완성도 - '베타' 또는 '개발 중'과 같은 레이블로 표시되지 않아야 해요.
- 검증된 배포자
- 개요, 문서, 샘플/예제 코드, 그리고 API 품질과 관련된 일반적인 사용 편의성
- CPU 및 메모리 사용과 관련된 우수한 런타임 동작
- 고품질 의존성

# 배포자

이전에는 모든 패키지를 업로더에 연결하는 간단한 시스템을 사용했어요. 그러면 업로더가 발행한 모든 패키지를 확인할 수 있었어요. 그러나 각 업로더는 하나의 이메일 주소와 연결되어 있었죠. 이 시스템은 Stream이나 Invertase와 같이 많은 패키지를 유지하는 여러 사람이 있는 기관에 적합하지 않았어요. 배포자는 플러터 팀이 이 문제를 해결하기 위해 고안한 솔루션이었어요.

<div class="content-ad"></div>

A publisher is an entity tied to a domain that can publish multiple packages and have multiple emails associated with it. It also adds authenticity to your packages and avoids displaying your personal email address. To create a verified publisher, pub.dev uses DNS (domain name system) domains as an identification token.

For example, Stream publishes under the getstream.io publisher, which contains all our packages beneath it.

![Image](/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_9.png)

# 패키지 비게시, 중단, 철회 및 삭제

<div class="content-ad"></div>

pub에서 지원을 중단하거나 전체적으로 배포된 패키지 중 하나를 제거해야 하는 상황이 발생할 수 있습니다. 이러한 경우에는 패키지를 원활하게 중단할 수 있는 여러 가지 방법이 있습니다.

# pub에서 패키지 중단하기

개발자들에게 더 이상 이 패키지를 지원하지 않지만 pub.dev에 유지할 것임을 알리려면 해당 패키지를 중단했다는 표시를 선택할 수 있습니다. 이는 패키지 설정을 통해 수행할 수 있습니다:

![이미지](/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_10.png)

<div class="content-ad"></div>

사용자에게 패키지가 더 이상 지원되지 않고 업데이트를 받지 않을 것임을 명확히 알리는 중단된 패키지가 있습니다. 이전 버전의 'sensors' 패키지 예시는 다음과 같습니다:

![BuildingaFlutterSDKPart2ADeepDiveIntopubdev_11](/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_11.png)

이 패키지가 더 이상 사용되지 않는 이유와 기존 사용자가 이동할 수 있는 대체 제품이 있는지 설명하는 것이 좋습니다. 동일한 패키지에서 개발자들은 패키지에 대한 폐기 알림을 추가했습니다:

![BuildingaFlutterSDKPart2ADeepDiveIntopubdev_12](/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_12.png)

<div class="content-ad"></div>

# pub에서 패키지를 비공개 상태로 변경

만약 패키지를 완전히 삭제하는 것이 너무 급박하다고 생각된다면, 패키지를 비공개 상태로 변경할 수 있습니다. 비공개 상태로 변경된 패키지는 일반 pub 목록에 나타나지 않습니다. 이 설정은 패키지 설정을 통해 할 수 있습니다:

![이미지](/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_13.png)

조금 역설적으로, pub 검색을 통해 원하는 경우 비공개 상태로 된 패키지를 검색할 수 있습니다. 그러니까 개발자가 이 패키지를 발견하는 것을 일시적으로 막거나, 일반적으로 공개적인 시야에서 숨길 때 사용할 수 있는 임시 조치임을 명심하세요. 비공개 상태로 된 패키지는 여전히 직접 링크를 통해 볼 수 있고, 일반적인 종속성처럼 가져올 수 있습니다.

<div class="content-ad"></div>

# pub에서 패키지 취소하기

만약 발행한 패키지 버전에 실수가 있다면, 발행 후 일주일 이내에 pub에서 해당 패키지를 취소할 수 있습니다. 이 경우에는 해당 버전이 pub에서 취소됩니다만, dependency_overrides에 추가하면 종속성으로 가져올 수 있습니다. 이는 패키지에 중요한 부분이 빠져 있는 경우와 같이 극단적인 경우에만 이루어집니다. 대부분의 경우에는 간단한 수정 버전으로 문제를 해결할 수 있습니다.

취소는 이전 섹션의 설정과 동일한 패키지 설정에서 찾을 수 있습니다:

![이미지](/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_14.png)

<div class="content-ad"></div>

# 패키지 삭제하기

여기서 조금 복잡해지는 부분입니다. 메시지에 언급된 대로, 패키지를 게시하면 영구적으로 출판됩니다. Pub에는 패키지를 간단히 삭제할 수 있는 직접적인 메커니즘이 없습니다. 이것은 아마도 그 이유가 있을 것입니다. 모든 현대 프로젝트에서 모든 종속성이 종종 다른 종속성에 의존하며, 다시 그러합니다. 이러한 층 중 가장 낮은 곳에서 작은 벽돌 하나를 빼면 전체 생태계에 큰 혼란을 초래할 수 있습니다.

위에서 언급한 시나리오는 조금 과장된 듯할 수 있지만, 'leftpad'라는 작은 패키지에서 발생한 경우에 대한 비디오를 시청하는 것을 권장합니다. 그래서, pub에서 패키지를 삭제할 수 있을까요? 아니요... 하지만, 아마도 가능합니다.

어떤 방법으로도 패키지를 직접 삭제할 방법은 없습니다. 그러나 드물게, Google에 직접 요청을 보내면 그들이 대신 삭제해 줄 수도 있습니다. 아직 그런 일을 해본 적은 없지만, 그들이 각 사례를 검토하고 삭제가 정당한지 심사하는 것으로 보입니다. 이 GitHub 이슈에서 무슨 일이 발생했는지 예시를 확인할 수 있습니다.

<div class="content-ad"></div>

# Pub CLI

Pub CLI는 이전 기사에서 flutter pub publish 명령을 사용하여 패키지를 게시하는 데 사용했던 것입니다. 그러나 pub CLI로 수행할 수 있는 작업에는 깊이가 있고, 이 섹션에서는 일부 옵션을 탐색합니다. 이 섹션이 우리가 전체 Flutter 패키지를 논의한 지난 기사에 포함되어야 할지 고려했지만, 나는 pub을 컨셉으로 탐구하기 때문에 여기에 추가하기로 결정했습니다. Pub CLI는 원래 독립 명령으로 사용되었으므로 패키지를 발행하려면 flutter pub publish / dart pub publish 대신 pub publish를 사용해야 했지만, 지금은 flutter 또는 dart 명령을 통해 액세스할 수 있습니다.

# 패키지 추가 및 제거

pubspec.yaml 파일에 패키지를 수동으로 추가하지 않고 추가하려면 pub add 하위 명령을 사용할 수 있습니다.

<div class="content-ad"></div>

````js
플러터 패키지 관리자를 통해 stream_chat_flutter를 추가할 수 있어요.

```js
flutter pub add stream_chat_flutter
````

같은 방식으로 제거하려면 pub remove 하위 명령어를 사용하세요:

```js
flutter pub remove stream_chat_flutter
```

# 종속성 업그레이드 / 다운그레이드

<div class="content-ad"></div>

어떤 프로젝트에 있는 의존성들은 시간이 지남에 따라 구식이 될 수 있어요. 새로운 업데이트가 출시되면 더 이상 최신이 아닌 패키지를 업그레이드하려면 다음을 사용할 수 있어요:

```js
flutter pub upgrade
```

비슷하게, 구식 의존성을 찾으려면 `pub outdated` 서브명령어를 사용할 수 있어요:

```js
flutter pub outdated
```

<div class="content-ad"></div>

이 명령어는 모든 구버전 패키지와 최신 버전을 보여줄 거에요:

![이미지](/assets/img/BuildingaFlutterSDKPart2ADeepDiveIntopubdev_15.png)

또한 특정 패키지를 제외하고 모든 패키지를 다운그레이드하는 명령어도 있어요:

```js
flutter pub downgrade
```

<div class="content-ad"></div>

# 전역 스크립트 실행

하나의 프로젝트에만 적용하는 대신 몇 가지 Dart 패키지를 전역으로 활성화할 수 있습니다. pub CLI의 전역 옵션을 사용하면 패키지 내부가 아닌 경우에도 명령줄에서 Dart 스크립트를 실행할 수 있습니다.

전역으로 필요한 패키지를 활성화하기 위해 일반적으로 다음과 같이 사용됩니다:

```js
flutter pub global activate melos
```

<div class="content-ad"></div>

# Pub Cache

Pub은 의존성을 한 번 내려받으면 로컬로 저장합니다. 패키지 캐시에서 패키지를 수동으로 추가하거나 제거할 수도 있습니다. 이를 위해 `flutter pub cache add` 및 `flutter pub cache clean` 명령을 사용하세요:

```js
flutter pub cache add stream_chat_flutter
flutter pub cache clean
```

가끔은 이러한 로컬 파일들이 어떤 이유로 인해 변경될 수 있습니다. 이런 상황에서는 캐시를 복원하여 문제를 해결할 수 있습니다:

<div class="content-ad"></div>

```js
flutter pub cache repair
```

# Pub Token

현재 pub이 의존성을 관리하는 유명한 방법입니다만, 동일한 일을 수행할 수 있는 제3자 사이트를 사용할 수도 있습니다. 이를 위해 pub token 하위 명령어를 사용하여 제3자 사이트와 인증하는 토큰을 추가해야 합니다. 이 섹션은 Flutter 문서의 예시를 사용합니다.

pub token add를 사용하여 토큰을 추가할 수 있습니다.

<div class="content-ad"></div>

```js
dart pub token add https://some-package-repo.com/my-org/my-repo
```

```js
결과: 비밀 토큰 입력하십시오: <stdin에 토큰 입력>
     "https://some-package-repo.com/my-org/my-repo"로의 요청은 이제
     비밀 토큰을 사용하여 인증됩니다.
```

이미 추가된 토큰을 확인하고 제거할 수도 있습니다:

```js
flutter pub token list
flutter pub token remove -all
```

<div class="content-ad"></div>

# 몇 가지 문제점에 대한

일반적으로 나는 플러터에서 종속성을 처리하는 문제에 pub이 깨끗하고 간단하며 사용하기 쉬운 해결책이라고 생각합니다. 그러나 그게 완벽한 플랫폼이라는 의미는 아닙니다. Stream에서 Stream을 통해 일부 문제에 직면해 왔고, 이 섹션에서는 이에 대해 다룹니다. 다른 사람들이 마주칠 수도 있는 더 많은 문제가 있으며, 이것은 철저한 목록이 아닙니다.

우리가 Stream에서 pub에 대한 주요 문제 중 하나는 메트릭과 관련이 있습니다. pub의 인기 메트릭은 두 개의 패키지를 비교하거나 패키지가 대략 얼마나 인기 있는지 알고 싶을 때 꽤 좋은 측정 지표입니다. 그러나 SDK를 제작하는 회사들에 대해서는 종종 실제 인기의 측정 지표로서 충분하지 않을 수 있습니다. 다운로드 수와 같은 직접적인 숫자가 패키지 개발자에게만 표시된다 해도 패키지의 실제 인기에 대해 더 알 수 있는 놀라운 방법이 될 것입니다. 시간에 따른 변화 같은 더 많은 메트릭이 더 나은 방법일 것이지만, 우선 기본적인 기대부터 시작해 봅시다.

또 다른 문제는 우리가 겪은 것이며, 또한 몇몇 패키지 유지 관리자도 겪은 것으로 볼 수 있는 패키지의 정적 분석 검사입니다. 플러터 패키지는 일반적으로 여러 가지 플러터 SDK 버전을 지원하며, 새로운 플러터 SDK 버전은 패키지를 망가뜨릴 수 있는 파괴적인 변경 사항을 소개할 수 있습니다. 이것은 모든 패키지 사용자에게 분석 문제로 표시되어 신뢰를 줄일 것입니다.

<div class="content-ad"></div>

이 문제가 더 복잡해지는 요인으로, 기존의 Flutter 패키지 버전을 지원 중단하고 주요 버전을 업데이트해야 하는 경우가 있었습니다. 이 문제에 대한 해결책은 여러 가지가 있을 수 있지만, 가장 간단한 해결책은 최근 몇 가지 Flutter 버전에 대한 분석 체크를 도입하는 것일 것입니다. 이를 통해 최소한 개발자들이 이 패키지가 어떤 버전과 호환되는지 알 수 있고, 새로운 Flutter 버전이 패키지를 급격히 오류로 표시하지 않을 것입니다.

또한 패키지 점수 부분에서 제가 동의하지 않는 몇 가지 사항이 있습니다. 그럼에도 불구하고, 패키지 순위를 결정하는 마법같은 해결책은 없다는 점에 동의합니다. 그래서 Flutter 팀은 모든 이해관계자가 가장 이해하기 쉬운 해결책을 실행할 것으로 예상됩니다.

# 결론

패키지 개발 방법을 알고 있는 것이 중요할 뿐만 아니라, 어떻게 패키지를 배포하고 유지보수하며, 필요한 경우 제거하는 방법을 완전히 이해하는 것도 중요합니다. 이 문서가 pub.dev 생태계에 관해 모든 것을 명확히 해주고 패키지 릴리스를 더 잘 다루도록 돕기를 바랍니다.

<div class="content-ad"></div>

패키지와 배포에 대한 분석이 마무리되었으니, 다음 글에서는 패키지 구축, 상태 관리, 아키텍처, 문서 작성 등의 모범 사례에 대해 더 깊이 알아볼 것입니다. 그 다음 글에서 만나요.

# 추가 자료

- Dart 패키지 문서: https://dart.dev/guides/packages
- Flutter 패키지 및 플러그인: https://docs.flutter.dev/packages-and-plugins/developing-packages
- Stream Chat Flutter 저장소: https://github.com/GetStream/stream-chat-flutter
- Stream Video Flutter 저장소: https://github.com/GetStream/stream-video-flutter
