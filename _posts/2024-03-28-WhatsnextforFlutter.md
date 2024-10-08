---
title: "플러터의 앞으로의 비전"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Whats next for Flutter"
link: "https://medium.com/flutter/whats-next-for-flutter-b94ce089f49c"
isUpdated: true
---

## 내로비에서 개최된 Flutter Forward 이벤트에서 우리의 비전을 제시합니다

오늘은 우리의 Flutter 비전을 나누기 위해 기쁜 마음으로 여러분을 초대합니다. 이 개발자 이벤트는 케냐 나이로비에서 라이브 스트리밍되며 전 세계의 개발자들이 직접 참석하거나 온라인으로 모여 Flutter의 미래 방향에 대해 배우게 됩니다.

Flutter는 모바일, 웹 및 데스크톱용 앱을 한 곳에서 개발할 수 있게 해주는 UI 툴킷입니다. Flutter를 사용하면 화면의 모든 화소를 완벽하게 제어할 수 있어 아름다운 앱을 만들 수 있습니다. 또한 하드웨어 가속된 그래픽 지원 및 네이티브 컴파일된 머신 코드를 활용하여 빠르게 작동합니다. 또한 stateful hot reload와 같은 기술을 통해 코드 변경 사항을 즉시 앱에서 확인할 수 있어 생산성이 높습니다. 이식성이 뛰어나 동일한 소스 코드로 다양한 플랫폼에 배포할 수 있으며 예기치 않은 문제없이 동작합니다. 또한 라이선스 비용이 없으며 개발 도구를 사용하기 위한 비용도 없습니다.

Flutter는 현재 70만 개 이상의 앱이 출시되면서 인기를 얻고 있습니다. 작은 스타트업부터 중요한 요구사항을 가진 기업까지 다양한 조직이 사용하고 있습니다. Google에서도 Flutter를 중요한 도구로 인식하고 있으며 Google Classroom 팀을 포함한 다양한 팀이 이를 활용하여 모바일 및 웹 사용자에게 고품질의 솔루션을 제공하고 있습니다. 또한 Google 광고, Google 지도, Google 페이, 그리고 Firebase를 비롯한 다른 개발 도구에서도 이를 지원하고 있습니다.

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

플러터의 첫 번째 릴리스는 안드로이드와 iOS에서 모바일 앱을 구축하는 UI 도구 세트를 제공했지만, 플러터 3에서는 Windows, macOS, Linux 및 웹에 대한 프로덕션 지원을 확대했습니다. 또한 임베디드 플랫폼이 플러터를 사용할 수 있도록 지원하고 있습니다. 그 위에 서, 이번 주에 우리는 최신 안정 버전인 플러터 3.7을 출시했는데, 이 버전은 iOS에 새로운 렌더링 엔진, Material 3 및 iOS 스타일 위젯을 위한 향상된 지원, 국제화를 위한 개선된 지원, 백그라운드 처리 개선, 그리고 개발자 도구 업데이트를 포함한 다양한 새로운 기능을 추가했습니다.

하지만 이번 이벤트에서는 앞으로 기대되는 부분을 살펴보며, 플러터에 대한 우리의 투자의 다음 파동을 미리 보여드리고 있습니다. 통풍이 충청만점인 그래픽 성능, 웹 및 모바일을 위한 심플한 통합, 새로운 및 떠오르는 아키텍처에 대한 초기 지원, 그리고 계속해서 개발자 경험에 초점을 맞추고 있습니다. 저희가 이번 기간 동안 점진적으로 전달할 작업들을 소개하고 있으며, 이를 통해 모든 픽셀이 그려지는 곳이라면 어디서든 빛나는 사용자 경험을 구축하고자 하는 개발자를 위한 강력한 도구로서의 플러터에 대해 열정을 느끼길 바랍니다.

주의: 여기서 미리 보여드리는 기능들은 아직 개발 중이며, 이후 몇 달 동안 변화될 수 있습니다. 이러한 조기 단계에서 이를 보여주는 것은 조기 도입자들이 기여할 기회를 제공하기 위한 것입니다.

![다음플러터발전](/assets/img/WhatsnextforFlutter_0.png)

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

# 혁신적인 그래픽 성능

과거에는 크로스 플랫폼 프레임워크가 추상화 레이어를 만드는 과정에서 시각적으로 타협해야 했습니다. 대부분과는 달리 Flutter는 자체 렌더링 레이어를 갖춘 하드웨어 가속 그래픽을 제공하며 모든 기기에서 일관된 시각적 외관을 제공하는 다른 접근 방식을 채택했습니다. 앞으로는 Flutter의 그래픽 성능을 혁신적으로 향상시킬 것이며, 이는 이미 이 분야에서의 Flutter의 강점을 확장할 것입니다.

Flutter Forward에서는 Impeller, Flutter의 차세대 렌더링 엔진에 대한 더 많은 진전을 보여드리고 있습니다. Impeller는 Flutter에 최적화되어 있어 그래픽 파이프라인에 대한 유연성과 제어를 더 많이 제공하며 우리에게 새로운 기회를 열어줍니다. Impeller는 런타임에서 셰이더 컴파일로 인해 발생하는 프레임 떨어짐을 완화하는 사전 컴파일된 셰이더를 사용하여 더 예측 가능한 성능을 제공합니다. 또한 iOS와 안드로이드의 현대적인 저수준 API인 Metal 및 Vulkan에서 기본 기능을 활용하며, 단일 프레임 워크로드를 스레드에 분산시켜 효과적으로 활용합니다.

Impeller는 부드러운 UI를 제공하는 것에 더해 특정 시나리오에서 성능을 극적으로 향상시킬 수 있습니다. 한 데모(아래 표시됨)는 이를 가장 잘 보여주는 예시입니다. 왼쪽은 현재 기본 렌더러를 사용하여 구축된 SVG 클리핑을 사용하는 플라워 앱입니다. 페이지를 아래로 스크롤하면 렌더링 속도가 느려져 프레임 예산보다 오랜 시간이 걸리고, 초당 7~10프레임의 프레임 속도를 보입니다. 오른쪽은 Impeller에서 실행 중인 동일한 앱을 보여주는데, 여기서는 60fps의 끊김없이 렌더링됩니다.

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

초석부터 쌓는 장점 중 하나는 아키텍처가 새로운 사용 사례를 지원할 수 있다는 점입니다. 사용자 정의 셰이더를 지원하는 새로운 기능이 이미 플러터 위젯 계층과 원활히 통합되는 멋진 새로운 데모를 제공하고 있습니다. 여기서의 작업은 모바일 장치에만 국한되지 않습니다. 지금은 웹에서도 사용자 정의 셰이더를 초기 지원하고 있으며, 동일한 코드가 이제 iOS, Android 및 브라우저에서 하드웨어 가속화된 경험을 제공합니다.

![이미지](/assets/img/WhatsnextforFlutter_1.png)

그리고 이제 플러터를 통해 3D를 지원하기 위한 초기 작업을 시작했습니다. 키노트에서 보여준 것처럼 Blender로 만든 모델을 가져오고, Blender를 실시간으로 사용하여 수정하고 실행 중인 앱에서 결과를 볼 수 있습니다. 아직 초기 단계이지만, 초기 성능과 3D를 다른 플러터 경험에 통합할 수 있는 잠재력에 대해 흥분하고 있습니다.

3D 및 사용자 정의 셰이더를 추가하면 휴대용 UI 툴킷의 그래픽 성능이 새로운 수준으로 높아집니다. 이러한 새로운 기능을 활용할 때 귀하께서 어떤 일을 할지 매우 기대되어집니다.

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

# 웹 및 모바일을 위한 완벽한 통합

플러터(Flutter)와 다트(Dart)를 사용하여 앱을 완전히 작성할 수 있지만, 대부분의 복잡한 프로젝트는 다른 코드와 연결해야 합니다. 웹에서는 플러터가 더 큰 앱 내에 임베드된 구성 요소로 사용될 수 있고, 모바일에서는 앱이 시스템 API를 호출하거나 다른 언어로 작성된 코드와 통합될 수 있습니다. 따라서 우리의 두 번째 중요한 투자 주제는 웹 및 모바일을 위한 완벽한 통합입니다.

웹에서는 "요소 임베딩"이라고 부르는 새로운 기능을 미리 볼 수 있으며, 이를 통해 Flutter 콘텐츠를 표준 웹 `div`에 추가할 수 있습니다. 이렇게 임베드된 경우, Flutter는 웹 컴포넌트가 되어 웹 DOM과 깔끔하게 통합되며, 심지어 CSS 선택기와 변형을 사용하여 부모 Flutter 개체를 스타일링할 수 있습니다.

또한 js 패키지에 몇 가지 큰 변경을 가하고, JavaScript와 Dart 코드 간의 완벽한 상호 운용성을 제공합니다. js를 사용하면 Dart 코드에서 @JSExport 속성을 가진 함수를 어떤 함수에도 주석 처리하여 작성한 다음 JavaScript 코드에서 호출할 수 있습니다.

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

이 두 가지 새로운 기능을 결합하면 Flutter를 웹에서 사용하는 새로운 흥미로운 시나리오가 열립니다. Flutter Forward에서 시연한 개념 증명 데모에서는 HTML 기반 웹 페이지에 임베드된 간단한 Flutter 앱을 볼 수 있습니다. CSS를 사용하여 애니메이션 회전 효과를 적용하고 있습니다. 회전하는 동안에도 Flutter 콘텐츠는 상호 작용 가능합니다. 데모에서는 HTML 버튼 및 JavaScript 이벤트 핸들러를 사용하여 Flutter 상태를 변경하거나 그 반대도 가능한 것을 보여줍니다. 이 작업이 완료되면 Flutter를 사용하여 기존 웹 앱에 상호 작용성을 추가하는 새로운 기회가 열릴 것으로 기대됩니다.

![image](/assets/img/WhatsnextforFlutter_2.png)

안드로이드 및 iOS로 돌아와서 Flutter는 시스템 API와의 통합을 오랫동안 지원해왔습니다. 이는 코틀린 또는 스위프트와 같은 언어로 작성된 코드와 통신하기 위한 메시지 기반 접근 방식인 플랫폼 채널을 사용합니다. 이를 통해 해당 라이브러리에 액세스할 수 있지만, 여러 언어에 능통해야 하며 상당한 양의 보일러 플레이트 코드가 필요합니다.

지금은 라이브러리를 직접 호출할 수 있는 시스템 상호 운용성에 대한 새로운 접근 방식을 개발하고 있습니다. iOS에서는 C 상호 운용성을 위해 FFI 작업을 기반으로하며, Swift 및 Objective-C 라이브러리를 지원합니다. Android에서는 Kotlin으로 작성된 Jetpack 라이브러리로 이어지는 JNI를 사용합니다. 새로운 명령을 통해 Dart는 자동으로 크로스 언어 상호 운용성을 위한 바인딩을 생성하고 데이터 클래스를 적절하게 변환합니다. 이 작업이 완료되면, Flutter 개발자가 플러그인을 사용하거나 다른 API 구문을 학습할 필요 없이 새로운 Jetpack 또는 iOS 라이브러리를 호출할 수 있도록 해주며, 플러그인 작성자의 작업을 크게 용이하게 할 것으로 기대됩니다. 자세한 내용은 샘플을 확인해보세요!

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

# 새로운 아키텍처에 대한 초기 작업

Dart는 다양한 프로세서 아키텍처를 넓게 지원하고 있으며, 고도로 최적화된 JavaScript 컴파일러 덕분에 Flutter는 이미 다양한 장치 및 형태 요소에서 작동할 수 있습니다. 그러나 앞으로의 흥미로운 옵션이 있을 것으로 기대되는 새로운 아키텍처를 초기 지원하기 위해 우리의 세 번째 테마는 이쪽으로 나아가고 있습니다.

WebAssembly는 플랫폼 중립적 이진 명령어 형식으로 성숙도가 높아지고 있으며, 현대 브라우저에서의 지원이 점점 늘어나고 있습니다. 흥미로운 점은 WebAssembly가 웹 플랫폼을 JavaScript 이외의 다른 언어로 확장시킨다는 것입니다. 최근 몇 달 동안 Chrome 팀 및 기타 WebAssembly 파트너들과 협력하여 Dart와 같은 가비지 수집 언어를 위한 초기 지원을 추가하였습니다. 이 새로운 WebAssembly 확장은 최신 Chrome의 개발 빌드에서 플래그로 지원됩니다. Flutter Forward에서는 Flutter 컴파일을 WebAssembly로 초기 지원하는 것을 발표하며, 웹 지원을 위한 속도 및 크기 최적화를 더욱 가능케 할 것입니다.

또 다른 눈길을 끌고 있는 플랫폼 아키텍처는 RISC-V로, 널리 사용될 수 있도록 설계된 오픈 표준 명령 집합 아키텍처(ISA)입니다. 안드로이드 팀이 최근 RISC-V 지원에 관한 발표를 하였으며, 저희도 마찬가지로 Flutter가 RISC-V 장치에서 작동할 수 있도록 지원하는 내용을 발표하는 것을 기쁘게 여기고 있습니다. 제작용 RISC-V 하드웨어는 아직 초기 단계에 있지만, Flutter Forward에서는 리눅스를 실행하는 패키지형 터미널인 ClockworkPi DevTerm Kit R-01에서 현재까지 진행된 작업을 소개했습니다. Flutter가 다양한 필요에 대한 강력한 UI 툴킷을 제공할 수 있는 임베디드 시나리오에서 특히 관심을 끌 것으로 기대됩니다.

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

![WhatsnextforFlutter_3](/assets/img/WhatsnextforFlutter_3.png)

# 개발자 경험에 대한 지속적인 초점

우리가 위에서 설명한 모든 것의 기반은 개발자 생산성이며, 플러터의 특징 중 하나인 상태 보존 핫 리로드와 함께 그간부터 이어져왔습니다. 우리의 미래에 대한 네 번째이자 마지막 투자 영역은 Flutter와 Dart를 모두 포함한 개발자 경험에 대한 지속적인 초점입니다.

Flutter Forward에서는 언어의 적정진화에 대한 우리의 헌신을 보여주는 일부 주요한 새로운 Dart 언어 기능 중 일부를 예고하고 있습니다. 개발 채널에서는 레코드(record)와 패턴(patterns) 같이 특히 잘 동작하는 두 가지 새로운 향상 기능에 대한 초기 지원이 이제 가능합니다.

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

![WhatsnextforFlutter_4.png](/assets/img/WhatsnextforFlutter_4.png)

우리는 또한 언어에 sound null safety를 도입하는 작업의 결정체인 Dart 3을 공식으로 발표합니다. Dart 3는 언어를 더 현대화하기 위해 다른 오랫동안 사용되었던 기능들도 삭제합니다. 우리는 Dart 3의 알파 품질 빌드를 게시하기 시작했고, Flutter 빌드와 함께 제공하여 개발자들이 패키지와 앱을 테스트할 수 있도록 했습니다. Dart 3에 대한 자세한 정보는 Dart 채널의 별도 블로그 게시물을 확인해주세요.

물론 Flutter 개발자 경험에도 투자하고 있습니다. 지난 해 I/O에서 발표한 캐주얼 게임 툴킷의 성공을 바탕으로, 뉴스 퍼블리셔 및 다른 콘텐츠 제공 업체가 앱을 제작하지 않고도 모바일 사용자에게 도달하고 싶어하는 사람들을 위해 개발된 첫 번째 버전의 뉴스 툴킷을 공유하고 있습니다. 이 툴킷은 내비게이션과 검색, 인증, 광고 통합, 알림, 프로필 및 구독이 포함된 기사 중심 앱을 구축하는 데 필요한 모든 기능을 제공하며, Google News Initiative의 연구 결과를 적극적으로 도입하고 있습니다. 오늘은 이 툴킷을 기반으로 앱을 제작하는 아프리카의 세 명의 초기 채택 브랜드인 모로코 최대 뉴스 사이트인 Hespress, 인기 있는 나이지리아 스포츠 사이트 Bold Sports, 케냐 최고의 신문인 The Standard에 대해 소개하고 있습니다.

# 함께 앞으로 나아가요

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

우리가 플러터의 발전 방향에 대해 갖고 있는 열정을 함께 나누기를 희망합니다. 우리는 핵심 개발자 경험에 대한 투자를 계속하면서 플러터를 통해 더욱 강력한 경험을 만들 수 있도록 기초적인 개선을 이어가고 있습니다.

이미지는 우리의 방향을 요약합니다:

![Flutter의 다음 단계](/assets/img/WhatsnextforFlutter_5.png)

우리 자체 개발 주제를 넘어, Flutter 생태계가 계속 확장되고 있다는 사실이 기쁩니다. FlutterFlow는 네이티브 모바일 애플리케이션을 개발하기 위한 로우코드 빌더이며, Widgetbook은 디자이너와 개발자가 사용자 인터페이스 개발에 협업할 수 있는 유연한 도구를 제공합니다.

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

마지막으로 케냐를 방문하고 현지 개발자들의 기업가 정신과 재능을 보게 되어 정말 멋졌습니다. 아프리카의 플러터 커뮤니티의 활기는 특별합니다. 플러터 케냐 사용자 그룹만 해도 1,000명 이상의 개발자가 모여 있습니다. 그리고 아프리카 전역의 개발자들이 빠르게 성장하는 앱 시장에 참여할 수 있는 새로운 기회를 제공할 수 있다는 점이 기쁩니다. Klasha는 플러터를 활용하여 빠르게 시장에 진출하고 현지 문제를 해결하는 이러한 약속의 좋은 예입니다. 이곳에서 그들의 플러터 경험을 담은 비디오가 있습니다:
