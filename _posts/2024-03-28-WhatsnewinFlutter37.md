---
title: "플러터 37에서 새롭게 추가된 내용들 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Whats new in Flutter 37"
link: "https://medium.com/flutter/whats-new-in-flutter-3-7-38cbea71133c"
isUpdated: true
---

## Material 3 업데이트, iOS 개선사항 및 그 밖의 많은 업데이트!

2023년에 Flutter 3.7 릴리스로 시작하는 것을 기대하고 있습니다! Flutter 3.7에서 우리는 커뮤니티로서 프레임워크를 계속 개선하며 새로운 기능을 추가했습니다. 사용자 정의 메뉴 바, 카스캐이딩 메뉴, 국제화를 지원하는 도구, 새로운 디버깅 도구 등과 같이 훌륭한 새로운 기능이 추가되었습니다.

또한 전역 선택, 더 빠른 렌더링의 Impeller, 개발 도구 및 항상 개선되는 성능과 같은 기능을 지속적으로 개선하고 있습니다.

Flutter 3.7의 새로운 기능들을 탐험하기 위해 함께 빠른 여행을 떠나 봅시다!

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

# 향상된 Material 3 지원

3.7 버전에서 다음 위젯들을 이주하여 Material 3 지원이 크게 향상되었습니다:

- Badge
- BottomAppBar
- Filled 및 Filled Tonal 버튼
- SegmentedButton
- Checkbox
- Divider
- Menus
- DropdownMenu
- Drawer 및 NavigationDrawer
- ProgressIndicator
- 라디오 버튼
- Slider
- SnackBar
- TabBar
- TextFields 및 InputDecorator
- Banner

이러한 새로운 기능을 사용하려면 응용 프로그램의 ThemeData 위젯에서 useMaterial3 플래그를 켜세요. M3 지원을 최대한 활용하려면 완전한 M3 색상 구성이 필요합니다. 직접 제공하거나 새 테마 빌더 도구를 사용하거나, Flutter는 ThemeData 생성자의 colorSchemeSeed 매개변수를 사용하여 단일 시드 색상에서 자동으로 생성할 수 있습니다:

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
MaterialApp(
  theme: ThemeData(
     useMaterial3: true,
    colorSchemeSeed: Colors.green,
  ),
  // …
);
```

플러터의 Material 3 지원에 대한 최신 세부 정보는 GitHub의 통합 이슈를 참조하세요.

이 컴포넌트들을 직접 사용해보려면, 모든 새로운 M3 기능을 보여주는 대화형 데모를 확인해보세요:

<img src="/assets/img/WhatsnewinFlutter37_0.png" />

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

# 메뉴 바 및 계층적 메뉴

Flutter는 이제 메뉴 바와 계층적 컨텍스트 메뉴를 생성할 수 있습니다.

macOS에서는 PlatformMenuBar 위젯을 사용하여 플랫폼 네이티브 메뉴 바를 생성할 수 있습니다. 이는 macOS에서 Flutter 대신 macOS에 의해 렌더링된 플랫폼 네이티브 메뉴 바를 의미합니다.

또한 모든 플랫폼에서는 Material Design 메뉴를 정의할 수 있습니다. 이 메뉴는 계층적 메뉴 바(MenuBar)를 제공하거나 다른 사용자 인터페이스 요소에 의해 트리거된 독립적인 계층적 메뉴(MenuAnchor)를 정의할 수 있습니다. 이러한 메뉴는 완전히 사용자 정의할 수 있으며 메뉴 항목은 사용자 지정 위젯이거나 새로운 메뉴 항목 위젯(MenuItemButton, SubmenuButton)을 사용할 수 있습니다.

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

![WhatsnewinFlutter37_1](/assets/img/WhatsnewinFlutter37_1.png)

# 임펠러 미리보기

저희 팀은 새로운 임펠러 렌더링 엔진이 iOS의 stable 채널에서 미리보기로 준비되었음을 기쁘게 발표합니다. 우리는 Impeller의 성능이 대부분의 앱에서 Skia 렌더러를 능가하거나 또는 동등할 것으로 믿습니다. 그리고 신뢰성 측면에서는 Impeller가 여러분이 사용하는 대부분의 경우를 구현했으나 드물게 사용되는 코너 케이스 중 소수만 미구현 상태입니다. 앞으로 예정된 stable 버전에서 Impeller를 기본 렌더러로 설정할 것으로 예상되므로 GitHub에서 Impeller 피드백을 계속 남겨주시기 바랍니다.

iOS에서 Impeller가 대부분의 기존 Flutter 앱들의 렌더링 요구를 충족할 것임에 확신을 가지고 있지만, 아직 API 커버리지에는 몇 가지 미흡한 부분이 있습니다. 남은 소수의 미해결된 부분은 Flutter 위키에 명시되어 있습니다. 사용자들은 Skia와 Impeller 사이에 렌더링에 미세한 시각적 차이를 발견할 수 있을 것입니다. 이러한 미세한 차이는 버그일 수 있으니 문제를 신고하는 데 주저하지 마세요.

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

저희 Impeller 프로젝트는 커뮤니티의 기여로 인해 크게 발전하였습니다. 특히, GitHub 사용자인 ColdPaleLight, guoguo338, JsouLiang 및 magicianA가 이 릴리스에 관련된 291개 중 37개(`12%)의 Impeller 패치에 기여했습니다. 감사합니다!

Impeller에 대한 Vulkan 백엔드의 진행 상황은 계속되고 있으며, 이전 장치에서 OpenGL로 대체되기도 합니다. 그러나 Android에서 Impeller를 미리 볼 수 있는 상태가 아직 아닙니다. Android 지원은 활발히 개발 중에 있으며, 미래 릴리스에서 데스크톱 및 웹 지원에 대한 자세한 내용을 더 공유할 계획입니다.

GitHub의 Impeller 프로젝트 보드에서 진행 상황을 계속해서 확인해 주세요.

# iOS 릴리스 확인

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

iOS 앱을 출시할 때는 App Store에 제출하기 전에 업데이트해야 할 설정들을 확인하는 체크리스트가 있습니다.

flutter build ipa 명령어는 이제 이러한 설정 중 일부를 유효성 검사하며, 출시 전에 앱에 가해야 할 변경 사항이 있는지 알려줍니다.

![이미지](/assets/img/WhatsnewinFlutter37_2.png)

# DevTools 업데이트

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

이 릴리스에서는 새로운 툴링 기능과 전반적인 개선 사항이 여럿 있어요. DevTools 메모리 디버깅 도구가 완전히 새롭게 변경되었어요. Profile, Trace, Diff 세 가지 새로운 기능 탭이 추가되었고, 이전에 지원되던 모든 메모리 디버깅 기능을 지원하고 디버깅을 더 쉽게 할 수 있도록 더 많은 기능이 추가되었어요.

새로운 기능으로는 현재 앱의 메모리 할당을 클래스와 메모리 유형별로 분석할 수 있고, 해당 클래스 세트에 대해 런타임 중 메모리를 할당하는 코드 경로를 조사하며, 두 시점 간의 메모리 관리를 이해하기 위해 메모리 스냅샷을 비교하는 기능 등이 있어요.

![이미지](/assets/img/WhatsnewinFlutter37_3.png)

모든 이러한 새로운 메모리 기능에 대한 자세한 내용은 docs.flutter.dev에서 문서를 확인해 주세요.

또한 성능 페이지에도 몇 가지 주목할 만한 새로운 기능이 있어요. 성능 페이지 상단에 새로 추가된 Frame Analysis 탭은 선택한 Flutter 프레임에 대한 통찰을 제공해 줘요. 특정 Flutter 프레임의 부분이 어떻게 비싼지 자세히 추적하는 방법에 대한 제안이 포함될 수도 있으며, Flutter 프레임에서 감지된 비용이 많은 작업에 대한 경고도 포함될 수 있어요.

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

<img src="/assets/img/WhatsnewinFlutter37_4.png" />

위는 몇 가지 강조된 사항에 불과하지만, 이 릴리스에는 여기에 언급된 기능 외에도 여러 버그 수정 및 개선 사항이 포함되어 있습니다. 인스펙터, 네트워크 프로파일러, CPU 프로파일러를 위한 중요한 버그 수정 사항도 포함되어 있습니다. 더 자세한 업데이트 목록은 Flutter 3.7에 반영된 DevTools 변경 사항을 확인하려면 릴리스 노트를 확인해보세요.

- Flutter DevTools 2.17.0 릴리스 노트
- Flutter DevTools 2.18.0 릴리스 노트
- Flutter DevTools 2.19.0 릴리스 노트
- Flutter DevTools 2.20.0 릴리스 노트

# 커스텀 컨텍스트 메뉴

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

이제 플러터 앱에서 사용자 정의 컨텍스트 메뉴를 만들 수 있어요. 이를 사용하여 기본적인 컨텍스트 메뉴를 수정할 수도 있어요!

예를 들어, 사용자가 이메일 주소를 선택했을 때 나타나는 기본 텍스트 선택 도구 모음에 "이메일 보내기" 버튼을 추가할 수 있어요 (코드 참조). TextField와 같이 기본적으로 컨텍스트 메뉴를 표시하는 기존 위젯에 contextMenuBuilder 매개변수가 추가되었으니 확인해보세요. contextMenuBuilder에서 원하는 위젯을 반환할 수 있어요. 이를 통해 기본 플랫폼에 맞춘 컨텍스트 메뉴를 수정할 수 있어요.

이 새로운 기능은 텍스트 선택 이외의 경우에도 작동해요. 예를 들어, 오른쪽 클릭하거나 길게 눌렀을 때 Save 버튼이 표시되는 Image 위젯을 만들 수도 있어요 (코드 참조). ContextMenuController를 사용하여 현재 플랫폼의 기본 컨텍스트 메뉴나 사용자 정의 메뉴를 어디서든 표시할 수 있어요.

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

<img src="/assets/img/WhatsnewinFlutter37_6.png" />

Flutter의 샘플 리포지토리에 있는 다양한 예제를 확인해보세요.

# CupertinoListSection 및 CupertinoListTile 위젯

Github 사용자 Campovski의 노력 덕분에 Cupertino에 새로운 두 가지 위젯인 CupertinoListSection 및 CupertinoListTile이 추가되었습니다. 이 위젯들은 iOS 스타일의 스크롤 가능한 위젯 목록을 보여주는데 사용됩니다. 이들은 Material의 ListView 및 ListTile의 Cupertino 버전입니다.

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

<img src="/assets/img/WhatsnewinFlutter37_7.png" />

<img src="/assets/img/WhatsnewinFlutter37_8.png" />

# 스크롤링 개선사항

이번 릴리스에서 다수의 스크롤링 업데이트가 도착했습니다: 트랙패드 상호작용을 위한 다듬고 정제된 업데이트, Scrollbars와 DraggableScrollableSheet와 같은 새로운 위젯, 그리고 스크롤링 컨텍스트 내에서의 텍스트 선택을 위한 향상된 처리가 포함되어 있습니다.

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

맥OS 앱은 새로운 스크롤링 물리학을 추가함으로써 이제 데스크톱 플랫폼과 더 높은 충실도를 경험할 수 있습니다.

새로운 AnimatedGrid 및 SliverAnimatedGrid 위젯은 목록에 추가되거나 제거되는 항목을 애니메이션화합니다.

![이미지](/assets/img/WhatsnewinFlutter37_9.png)

마지막으로, 우리는 ListView와 같은 여러 스크롤링 위젯의 builder 생성자에서 하강된 부분을 수정했습니다. Flutter 프레임워크의 NNBD 이주 중에, 사용자가 필요에 따라 위젯을 제공할 수 있게 해주는 itemBuilder가 IndexedWidgetBuilder로 이주되었습니다. 이는 과거에 리스트의 끝을 표시하는 데 사용되던 null을 더 이상 리턴할 수 없게 되었다는 의미였습니다. 이 기능은 NullableIndexedWidgetBuilder로 복구되었습니다. 마이그레이션 이후 몇 년이 지난 후에도 이를 발견하고 수정을 보내 준 @rrousselGit님께 감사드립니다!

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

# 국제화 도구 및 문서

국제화 지원이 완전히 새롭게 업그레이드되었습니다! 우리는 gen-l10n 도구를 완전히 다시 작성하여 다음을 지원합니다:

- 설명적 문법 오류.
- 중첩/다중 복수, 선택 및 자리 표시자를 포함한 복잡한 메시지.

![이미지](/assets/img/WhatsnewinFlutter37_10.png)

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

더 많은 정보를 보려면 최신 업데이트된 플러터 앱의 국제화 페이지를 참조해주세요.

## 전역 선택 기능 개선

SelectionArea가 이제 키보드 선택을 지원합니다. shift+right와 같은 키보드 단축키로 기존 선택을 확장할 수 있습니다.

## 백그라운드 독립체

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

이제 플랫폼 채널은 어느 아이솔레이트에서든 호출할 수 있습니다. 이전에는 사용자가 Flutter의 기본 이솔레이트(main isolate)에서만 플랫폼 채널을 호출할 수 있었던 것으로 기억합니다. 이 변경으로 플러그인 또는 애드투앱(Add-to-app)에서 아이솔레이트 및 호스트 플랫폼 코드를 다루는 작업이 더 편리해졌습니다. 더 많은 정보를 원하신다면 flutter.dev의 Writing custom platform-specific code 페이지나 무료로 제공되는 미디엄(Medium)의 Introducing background isolate channels에 대한 심도있는 기사를 확인해보세요.

# 텍스트 확대기

이제 안드로이드와 iOS에서 텍스트 선택 중에 나타나는 돋보기 아이콘이 Flutter에서도 작동합니다. 모든 텍스트 선택 앱에 대해 기본으로 활성화되어 있지만, 이 기능을 비활성화하거나 사용자 정의하려면 magnifierConfiguration 속성을 확인해주세요.

![이미지](/assets/img/WhatsnewinFlutter37_11.png)

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

<img src="/assets/img/WhatsnewinFlutter37_12.png" />

# 플러그인을 위한 Swift 이관

애플이 자체 API에서 Swift에 집중하고 있으므로, Flutter 플러그인 개발자들이 Swift로 이관하거나 새로운 플러그인을 개발할 수 있도록 도움이 되는 자료를 개발하고자 했습니다. quick_actions 플러그인은 Objective-C에서 Swift로 이관되었으며, 최고의 실천 방법을 시연할 수 있습니다. 1P 플러그인을 이관하는 데 관심이 있다면 위키의 Swift 이관 섹션을 참조해주세요.

iOS 개발자들을 위한 자원

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

iOS 개발자를 위한 새로운 리소스를 여러 개 공개했어요. 아래는 포함된 내용들이에요:

- SwiftUI 개발자를 위한 Flutter
- Swift 개발자를 위한 Dart
- Swift 개발자를 위한 Flutter 병행 처리
- 기존 SwiftUI 앱에 Flutter 추가
- Flutter를 이용한 플레이버(Flavor) 생성 (Android 및 iOS 모두 포함)

# Bitcode 폐기

Xcode 14부터는 watchOS 및 tvOS 애플리케이션에는 더 이상 bitcode가 필요하지 않으며, App Store는 Xcode 14에서 bitcode 제출을 더 이상 허용하지 않습니다. 그에 따라 bitcode 지원이 Flutter에서 제거되었어요.

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

기본 설정에서 Flutter 앱에는 비트코드가 활성화되어 있지 않습니다. 이는 대부분의 개발자들에게 영향을 미치지 않을 것으로 예상됩니다. 그러나 Xcode 프로젝트에서 수동으로 비트코드를 활성화한 경우, Xcode 14로 업그레이드할 때 즉시 비활성화하십시오. 이 작업은 ios/Runner.xcworkspace 파일을 열고 Enable Bitcode를 No로 설정하여 수행할 수 있습니다. Add-to-app 개발자들은 호스트 Xcode 프로젝트에서 이를 비활성화해야 합니다.

![Flutter 37.13 변경 사항](/assets/img/WhatsnewinFlutter37_13.png)

비트코드 배포에 대해 더 알아보려면 Apple의 문서를 확인해보세요.

# iOS PlatformView BackdropFilter

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

네이티브 iOS 뷰가 플러터 위젯 아래에서 블러 처리되도록 기능이 추가되었고, UiKitView 위젯은 이제 BackdropFilter 내에 래핑될 수 있습니다.

![이미지](/assets/img/WhatsnewinFlutter37_14.png)

자세한 내용은 iOS PlatformView BackdropFilter 설계 문서를 참조하세요.

# 메모리 관리

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

이번 업데이트에서는 메모리 관리에 대한 몇 가지 개선 사항을 소개하였습니다. 이러한 개선 사항은 가비지 컬렉션 일시 중단으로 인한 지연을 줄이고, 할당 속도와 백그라운드 GC 스레드로 인한 CPU 사용률을 낮추며, 메모리 풋프린트를 줄이는 효과가 있습니다.

예를 들어, 특정 dart:ui Dart 객체를 뒷받침하는 네이티브 리소스를 수동으로 할당 해제하는 방법을 확장했습니다. 이전에는 네이티브 리소스가 Flutter 엔진에서 Dart VM이 Dart 객체를 가비지 컬렉션할 때까지 유지되었습니다. 사용자 애플리케이션 및 자체 벤치마크 분석을 통해 일반적으로 이 전략이 부적시에 발생하는 GC를 피하고 과도한 메모리 사용을 회피하기에는 충분하지 않다는 결론을 내렸습니다. 따라서 이번 업데이트에서는 Flutter 엔진이 Vertices, Paragraph, 그리고 ImageShader 객체에서 유지되는 네이티브 리소스를 명시적으로 할당 해제하는 API를 추가했습니다.

![이미지](/assets/img/WhatsnewinFlutter37_15.png)

Flutter 프레임워크의 이 API로 이관된 벤치마크에서, 이러한 개선 사항으로 90% 프레임 빌드 시간이 30% 이상 감소되어 사용자가 더 부드러운 애니메이션과 적은 지연을 경험할 것으로 기대됩니다.

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

또한, 플러터 엔진은 이제 GPU 이미지의 크기를 Dart VM과 등록하지 않습니다. 앞에서 언급했듯이, 이러한 이미지는 더 이상 필요하지 않을 때 framework에 의해 수동으로 할당 해제되었으므로 Dart's GC 정책에게 Dart 힙 객체의 GPU 메모리 크기를 알려줌으로써 불필요하게 Dart 힙 메모리 압력이 증가하고 메모리를 추가로 수집할 수 없는 일시적인 GCs를 유발했습니다. 비슷한 맥락으로, 이제 플러터 엔진은 dart:ui Dart 객체의 네이티브 객체의 얕은 크기만을 Dart VM에게 보고합니다.

![이미지](/assets/img/WhatsnewinFlutter37_16.png)

저희의 벤치마크에서는, 이 변경으로 인해 위젯이 GPU에 상주하는 이미지를 생성할 때 프레임 구축 중 동기식 GC 작업이 제거되었습니다.

이번 릴리스에서는, 플러터 엔진이 Flutter 애플리케이션 상태에 대한 정보를 Dart VM에 동적으로 더 잘 업데이트하는 작업을 수행합니다. 특히, Flutter는 이제 Dart VM의 RAIL 스타일 API를 사용하여 route 전환 애니메이션 중에 저지연 모드에 진입합니다. 이 저지연 모드에서 Dart VM의 메모리 할당기는 GC 일시 중단을 피하기 위해 힙 성장을 우선시하므로 GC 일시 중단으로 전환 애니메이션을 방해하지 않습니다. 이 변경은 현저한 성능 향상을 가져오진 않았지만, 앞으로 더 많은 릴리스에서 이 모델의 사용을 확대하여 예기치 않은 GC 일시 중단을 더욱 제거할 계획입니다. 게다가, 플러터 엔진이 idle 상태인지를 Dart VM에 통보하는 결정 논리의 오류를 수정했습니다. 이러한 오류 수정은 또한 GC 관련 혼란을 방지합니다. 마지막으로, add-to-app 플러터 애플리케이션의 경우, 플러터 엔진은 이제 Flutter 뷰가 더 이상 표시되지 않을 때 Dart VM에 통보합니다. 이제 이로 인해 Dart VM은 뷰와 관련된 Isolate에 대한 최종 메이저 GC를 트리거합니다. 이 변경으로 인해 Flutter 뷰가 보이지 않을 때 Flutter의 메모리 풋프린트가 줄어듭니다.

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

# macOS 10.11부터 10.13까지 지원 중단

이전에 발표된 대로, Flutter는 이제 macOS 10.11 및 10.12 버전을 더 이상 지원하지 않습니다. 이 공지 이후 추가 분석을 통해 10.13 버전 지원을 중단하면 추가적인 영향을 제한하고 팀이 코드베이스를 크게 간소화하는 데 도움이 될 것으로 밝혀졌습니다. 이는 이번 릴리스부터 안정적인 Flutter SDK로 빌드된 앱이 이러한 버전에서 작동하지 않게 되며, Flutter의 최소 macOS 버전은 10.14 Mojave로 늘어납니다.

이에 따라, Flutter가 지원하는 모든 iOS 및 macOS 버전이 Metal 지원을 포함하므로 OpenGL 백엔드가 iOS 및 macOS embedder에서 제거되었습니다. 이러한 백엔드 제거로 Flutter 엔진의 압축 크기가 약 100KB 줄었습니다.

# toImageSync

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

이 릴리스에서는 dart:ui에 메서드 Picture.toImageSync 및 Scene.toImageSync를 추가했습니다. 이는 비동기 방식의 Picture.toImage 및 Scene.toImage 메서드와 유사하게 작동합니다. Picture.toImageSync는 동기적으로 Picture에서 Image 핸들을 반환하며, 이미지의 래스터화는 백그라운드에서 비동기적으로 수행됩니다. GPU 컨텍스트가 있는 경우 이미지는 GPU에 상주하게 되어 toImage로 생성된 이미지와 비교하여 그리기 속도가 빨라집니다. (toImage로 생성된 이미지도 GPU에 상주할 수 있지만, 이 최적화가 아직 해당 시나리오에 구현되지 않았습니다.)

새로운 toImageSync API는 다음과 같은 사용 사례를 지원합니다:

- 여러 프레임에서 다시 사용할 수 있도록 비용이 많이 드는 이미지를 빠르게 캡처하는 것.
- 이미지에 다중 패스 필터를 적용하는 것.
- 사용자 정의 셰이더를 적용하는 것.

예시로, Flutter 프레임워크는 Android에서 페이지 전환의 성능을 향상시키기 위해 이 API를 사용하며, 발생하는 프레임 래스터화 시간을 거의 절반으로 줄이고 지연을 감소시킴으로써 해당 리프레시 속도를 지원하는 디바이스에서 90/120fps에 해당하는 애니메이션을 제공합니다.

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

# 커스텀 셰이더 지원 개선 사항

이번 릴리스에서는 Flutter의 커스텀 프래그먼트 셰이더 지원에 대한 다양한 개선 사항이 포함되어 있습니다. Flutter SDK에는 이제 pubspec.yaml 파일에 나열된 GLSL 셰이더를 대상 플랫폼에 맞는 백엔드 특정 형식으로 컴파일하는 셰이더 컴파일러가 포함되어 있습니다. 더불어 편리한 개발 주기를 위해 커스텤 셰이더를 히트 리로드할 수도 있습니다. 또한, iOS에서는 Skia 및 Impeller 백엔드에서 커스텀 셰이더를 지원합니다.

우리는 이미 커뮤니티에서 공유한 데모에 아주 감명을 받았으며, Flutter에서 커스텀 셰이더를 더욱 혁신적으로 활용한 사례를 기대하고 있습니다:

https://twitter.com/reNotANumber/status/1599717360096620544

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

https://twitter.com/reNotANumber/status/1599810391625719810

https://twitter.com/wolfenrain/status/1600242975937687553

https://twitter.com/iamjideguru/status/1598308434608283650

https://twitter.com/rxlabz/status/1609975128758026247

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

https://twitter.com/RealDevOwl/status/1528357506795421698

https://twitter.com/TakRutvik/status/1601380047599808513

https://twitter.com/wolfenrain/status/1600601043477401606

Flutter에서 사용자 정의 fragment shader를 작성하고 사용하는 방법에 대한 자세한 설명서는 docs.flutter.dev에서 확인할 수 있습니다. 또한 유틸리티 패키지인 flutter_shaders는 pub.dev에서 제공됩니다.

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

# 폰트 자산 핫 리로드

이전에는 pubspec.yaml 파일에 새 글꼴을 추가하면 애플리케이션을 다시 빌드해야만 그것들을 볼 수 있었습니다. 다른 자산 유형은 핫 리로드가 가능했지만 폰트 매니페스트에 변경 사항을 추가하는 것을 포함하여 새로운 글꼴을 추가할 수 있게 되어 애플리케이션에 실시간으로 반영할 수 있습니다.

# iOS 기기에서 애니메이션 지연 줄이기

luckysmg의 오픈 소스 기여 덕분에 iOS에서 애니메이션 지연이 줄어들었습니다. 특히, 제스처 중에 메인 스레드에 더미 CADisplayLink를 추가하면 현재 새로 고치는 속도를 최대로 강제로 새로 고침합니다. 또한 키보드 애니메이션은 이제 CADisplayLink의 새로 고침 속도를 Flutter 엔진의 애니메이터가 사용하는 동일한 새로 고침 속도로 설정합니다. 이 변경 사항 덕분에 사용자들은 120Hz iOS 기기에서 더 일관되게 부드러운 애니메이션을 더 많이 경험할 것입니다.

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

# 요약

Flutter가 현재 멋진 경험이 되기까지 재능 있고 열정적인 기여자들의 커뮤니티 없이는 불가능하다는 말은 과언이 아닙니다. 우리가 함께 이 여정을 이어가는 동안, Google의 Flutter 팀은 여러분 없이는 이것을 할 수 없다는 것을 알려드립니다. 감사합니다!

모멘텀은 느려지지 않고 앞으로의 업데이트를 기대해 주세요!
