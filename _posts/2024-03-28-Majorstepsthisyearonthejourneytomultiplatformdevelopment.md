---
title: "Dart 32와 Flutter 316 릴리즈 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Major steps this year on the journey to multiplatform development"
link: "https://medium.com/flutter/major-steps-this-year-on-the-journey-to-multiplatform-development-b9218b17f0f7"
isUpdated: true
---





오늘은 Dart 3.2와 Flutter 3.16의 두 개의 새로운 SDK 릴리스와 Flutter Casual Games Toolkit의 주요 업데이트를 발표해 기쁩니다.

![이미지](/assets/img/Majorstepsthisyearonthejourneytomultiplatformdevelopment_0.png)

# Flutter와 Dart의 가치 제안

올해 초에 케냐 나이로비에서 열린 Flutter Forward에서 Flutter와 Dart의 새로운 로드맵을 소개했습니다. 두 로드맵 모두 다음 네 가지 고수준 테마에 초점을 맞추었습니다: 돌파적인 그래픽 경험, 웹 및 모바일 플랫폼과의 원활한 통합, 새로운 아키텍처에 대한 초기 접속 및 신흥 아키텍처, 그리고 개발자 경험에 대한 지속적인 집중입니다.

<div class="content-ad"></div>

![이번 해 멀티플랫폼 개발 여정에서 큰 발전](/assets/img/Majorstepsthisyearonthejourneytomultiplatformdevelopment_1.png)

5월의 Google I/O에서 우리는 이 비전을 향한 상당한 진전을 발표했습니다. (하지만 이에 국한되지 않음) iOS에서 렌더링 성능 개선(임펠러), 웹에서 요소 임베딩 지원, 그리고 Dart 3에서 100% 널 안전성으로의 여정 마무리를 포함한 중요한 발전이 있었습니다.

올해 말이 다가오면서 이후의 진전 상황에 대한 또 다른 업데이트가 있습니다.

# Flutter와 Dart로 사용자 가치 제공하기

<div class="content-ad"></div>

새로운 기능, 개선, 또는 버그 수정이 있을 때마다, 전체 목표는 변하지 않습니다: 강력한 언어와 프레임워크를 매칭하여 아름답고 풍부하며 빠른 앱을 구축할 수 있도록 하는 것입니다. 그리고 이를 하나의 공유 코드 베이스에서 수행할 수 있으며, 모바일, 웹, 데스크탑 앱 사용자들에게 제공할 수 있습니다. 제품 로드맵을 단편화하지 않고 제품의 발전하는 데에 올인할 수 있습니다. 또한, 라이선스 비용 없이 오픈 소스에 헌신하며, 개방성과 협력에 의해 뒷받침된 풍부한 생태계를 개발하기 위해 노력합니다.

이 목표는 구글 내부뿐만 아니라 전 세계적으로 Flutter 생태계에서 개발자들에게 공감을 일으킵니다. 올해 구글 앱 중 많은 멋진 앱들이 Flutter로 제작되어 출시되었습니다:

- Flutter Forward에서 발표한 대로, Google Classroom 팀은 iOS에서 라이브로 제공되는 Flutter를 사용한 모바일 앱을 개발했으며 Android에서는 베타 버전을 제공합니다. 이들은 새로운 Impeller 렌더링 엔진으로 성능이 크게 향상되었다고 감지하고 있습니다.
- Google에서 출시한 또 다른 새로운 Flutter 앱인 YouTube Create는 8개 국가에서 베타 버전으로 사용할 수 있습니다. 이 앱은 Flutter 위젯 라이브러리의 유연성을 활용하여 필터, 효과, 음악 및 보이스오버 편집을 포함한 완전한 비디오 편집 경험을 제공합니다.
- Google Earth 10 - 이제 Flutter로 구동되며 - 사용자들은 웹뿐만 아니라 Android 및 iOS 모바일 및 태블릿 기기에서 지도 및 지리 데이터를 쉽게 만들고 협업하며 정리할 수 있습니다! 새로운 디자인에 대한 Google Earth 게시물을 확인하고, 지구 팀이 Flutter를 사용하여 앱을 어떻게 구축했는지에 대한 미래 블로그 게시물을 기대해보세요.

![올해 멀티플랫폼 개발 여정에서 큰 발전](/assets/img/Majorstepsthisyearonthejourneytomultiplatformdevelopment_2.png)

<div class="content-ad"></div>

Flutter의 도입은 구글 이외에서도 글로벌로 계속 확대되고 있습니다:

- 올해 출시된 앱들 중에는 스웨덴의 Skandia와 폴란드의 Credit Agricole 같은 은행 앱, 미국의 MarketWatch Virtual Stock Exchange 투자 교육 앱, 네덜란드의 CZ 건강 보험 앱, 그리고 캐나다의 Kijiji 분류 광고 마켓 앱이 포함됩니다. 이러한 팀들이 Flutter를 선택한 공통 테마는 안드로이드와 iOS 간 일관된 기능 집합을 제공하면서도 풍부하고 매력적인 UI 경험을 전달하고자 했다는 것입니다.
- 중국에서는 Tencent이 클라우드 채팅이라는 새로운 풍부한 채팅 SDK 및 UI 라이브러리를 출시했으며 현재 중국의 채팅 서비스 시장에서 1위를 차지하고 있으며 국제적으로 확장 중입니다.
- 브라질에서 SOMA 패션 그룹이 Farm 브랜드의 주요 디지턈 혁신을 시작하면서 Flutter의 유연성을 깨달았으며, 이를 통해 그룹 내의 다른 브랜드에도 확장할 수 있었습니다. 미국에서는 Caribou Coffee가 Flutter와 Firebase를 결합하여 생산성을 가속화했고, Lucid Motors는 Flutter를 사용하여 소규모 팀으로 두 개의 모바일 앱을 제공할 뿐만 아니라 Flutter의 웹 지원을 통해 내부적으로 프로토타입을 공유할 수 있는 기회를 얻었습니다.

이러한 앱들의 진화를 목격할 수 있어 기쁩니다. 핵심 프레임워크에서 이루어지고 있는 계속된 진전에 대해 알아보세요.

# 획기적인 그래픽 성능

<div class="content-ad"></div>

저희는 멀티플랫폼 개발이 개발자나 최종 사용자들에게 경험이 저하되지 않아야 한다고 확신합니다. 그래서 이 소망을 이루기 위해 최선을 다하고 있어요. Flutter Forward에서는 Impeller 엔진을 소개했어요. 이 엔진은 속도와 성능을 위해 그래픽 렌더링 아키텍처를 완전히 재설계하고 재구현했어요. Flutter 3.10에서는 Impeller가 iOS에서 기본으로 활성화되었다고 발표했고, 오늘 Flutter 3.16에서 Impeller가 Android에서 안정 버전 채널에서 미리보기 피드백을 위해 준비되었다는 소식을 전해드립니다. 지난 1년 동안 성능이 크게 향상되었는데요. Impeller에서 레스터화 성능을 측정한 Flutter Gallery 벤치마크는 1년 전보다 대략 2배 빨라졌어요. Impeller를 활성화하는 방법에 대한 자세한 내용은 Flutter 3.16 게시물을 참조해주세요.

![이미지](/assets/img/Majorstepsthisyearonthejourneytomultiplatformdevelopment_3.png)

## 캐주얼 게임 툴킷

특히 빠르고 강력한 그래픽 렌더링이 필요한 앱 카테고리 중 하나는 게임입니다. 2022년에 저희는 초기 Flutter 캐주얼 게임 툴킷을 출시했어요. 오늘은 카드 게임부터 러너 유형 게임까지 다양한 새로운 템플릿과 리더보드, 모네타이제이션, 텔레메트리와 같은 게임 서비스 개발자 리소스를 제공하는 중요한 업데이트를 발표합니다. 더 자세한 내용은 캐주얼 게임 툴킷 블로그 게시물을 확인해주세요.

<div class="content-ad"></div>

![image](https://miro.medium.com/v2/resize:fit:1400/0*3DmGJe1yD4eKdnfs.gif)

# 원활한 통합

플러터 애플리케이션은 일반적으로 플랫폼 간에 매우 높은 수준의 코드 공유를 제공하며, 많은 개발자들이 95-99%의 공유를 보고하고 있습니다. 그럼에도 불구하고, 플랫폼별 기능을 지원하는 것이 중요하다고 믿습니다. iOS에서 앱 확장은 사용자가 다른 앱에서의 작은 버전의 앱과 상호 작용하는 방법을 제공합니다. 우리의 최신 안정 버전에서는 플러터 앱을 위한 홈 및 잠금 화면 위젯을 구축하는 데 도움이 되는 새로운 자원을 출시했습니다. Flutter 3.16에서는 Flutter를 사용하여 일부 iOS 앱 확장의 사용자 인터페이스를 렌더링할 수 있도록 지원을 추가했습니다. 예를 들어, 공유 확장기능입니다. Android 14에서는 사용자가 뒤로 스와이프(왼쪽으로 스와이프)할 때 앱 뒤의 시스템 UI를 엿볼 수 있는 새로운 예측 제스처가 추가되었습니다. Flutter 3.16은 이러한 제스처를 지원합니다.

# 개발자 경험에 대한 지속적인 집중

<div class="content-ad"></div>

현대적인 장치는 다양한 형태로 나타납니다 — 휴대전화, 접이식 폰, 태블릿 등 — 이는 화면 크기의 다양성을 가지며, 키보드와 마우스와 같은 외부 입력 장치를 지원합니다. 사용자들이 훌륭한 사용자 경험을 갖도록 보장하기 위해서는 이를 고려하는 것이 중요합니다. 최근 안드로이드 팀과 협업하여 대형 화면 가이드라인을 지원하도록 추가한 내용을 공개했습니다. 대형 화면 지원을 추가함으로써 얻은 학습이나 여러 가지 화면 크기를 지원하도록 Wonderous 레퍼런스 앱을 업데이트하거나 플러터 프레임워크에서 키보드, 마우스, 트랙패드 입력과 같은 요소를 더 잘 지원하기 위한 여러 개선 사항을 적용했습니다. 새로운 API를 사용하여 디스플레이의 크기와 픽셀 비율을 확인하고 멀티 윈도우 랜더링을 지원할 수 있습니다.

올해 동안 Material 3를 완전히 지원한 작업을 수행했습니다. Material 3는 Material Design 디자인 시스템의 최신 버전입니다. Flutter의 Material 위젯은 이제 Material 3를 완전히 지원하며, Flutter 3.16에서 Material 3가 기본 스타일로 변경되었습니다. Material은 앱에 신선한 느낌을 더해주며, 새로운 색 구성은 시각적으로 매력적이며 접근성을 위한 대비 요건을 준수합니다. 실제로 체험해 보려면 Material 3 갤러리를 확인해 보세요.

![이미지](/assets/img/Majorstepsthisyearonthejourneytomultiplatformdevelopment_5.png)

개발자 도구 개선 사항 중 두 가지 중요한 요소는 VS Code의 새로운 사이드바와 DevTools에 확장 프로그램 추가 지원이 있습니다. 이 사이드바는 새 프로젝트 생성, 핫 리로드 호출, DevTools 열기 또는 대상 장치 선택과 같은 핵심 Flutter 도구 작업을 쉽게 찾을 수 있도록 도와줍니다. DevTools 확장 프로그램은 DevTools에 삽입되는 새로운 사용자 지정 도구를 생성할 수 있는 프레임워크를 제공하며, 추가적인 프레임워크별 기능을 제공합니다. Provider, Patrol, ServerPod는 DevTools 확장 프로그램을 개발하고 있는 프레임워크 중 몇 가지의 예시입니다.

<div class="content-ad"></div>

![여기](/assets/img/Majorstepsthisyearonthejourneytomultiplatformdevelopment_6.png)

플러터 애착 프로그램을 재시작했고, flame, flutter_animate, flutter_rust_bridge, riverpod, video_player, macos_ui 및 fpdart를 새로운 Flutter 애착으로 지정했습니다. 8월에는 50명 이상의 구글 외부 및 구글러 기여자들이 참석한 패키지 생태계를 위한 첫 가상 서밋을 개최했습니다.

또한 강력한 새로운 패키지와 플러그인들이 등장했습니다. 제 개인적으로 좋아하는 몇 가지는 카메라 플러그인의 CameraX 지원, 고성능 2D 스크롤 가능한 TableView, 그리고 디자이너와 개발자가 드래그 앤 드롭으로 UI 구성 요소를 만들고 그것을 Flutter 위젯 코드로 내보낼 수 있는 flutterflow_ui 패키지입니다. 또한 google_maps 패키지는 이제 클라우드 맵 스타일을 지원하여 개발자들이 Google Cloud Console에서 스타일을 업데이트할 수 있고, home_widget 패키지는 상호작용 iOS 홈 화면 위젯을 생성할 수 있습니다.

# 새롭고 떠오르는 아키텍처들

<div class="content-ad"></div>

## Dart 상호 운용성

Dart는 다양한 플랫폼에서 실행되는 다중 플랫폼 Dart 코드를 가능하도록 하는 핵심 약속을 기반으로 합니다. 그러나 종종 이를 보완하기 위해 기존 코드와 상호 운용할 수 있는 능력이 필요합니다. 이 코드는 이전 프로젝트로부터 오거나 다른 라이브러리나 시스템 API에서 제공되는 API일 수 있습니다. Dart는 네이티브 C API와의 상호 운용을 제공하며, Java + Kotlin 및 Objective C + Swift와의 상호 운용을 지원하기 위해 노력하고 있습니다. 자세한 내용은 오늘의 Dart 3.2 블로그 게시물을 확인해보세요.

## WebAssembly로의 길

Wasm(또는 WebAssembly로도 알려진)은 현대 브라우저에서 실행될 이동 가능하고 플랫폼 중립적인 바이너리 코드 형식을 제공하는 웹 브라우저용 새로운 흥미로운 명령어 형식입니다. Dart와 같은 고수준 관리 언어는 가비지 컬렉션을 사용하며, 이는 WebAssembly 표준에 추가되고 있습니다. Chrome 119부터 WebAssembly의 가비지 컬렉션 지원(Wasm-GC)이 기본적으로 활성화되어 있습니다. Wasm-GC 지원은 Firefox 120에서도 지원될 예정이며, 이는 그들의 다음 안정 버전입니다.

<div class="content-ad"></div>

다트 컴파일러가 Wasm 지원이 거의 완전한 기능을 갖추었고, 플러터 웹은 새 렌더링 엔진을 사용하며 모든 렌더링이 WebAssembly 코드로 처리되도록 합니다. 더 많은 작업이 남아 있고 지원이 여전히 실험적인 것으로 간주되지만, 이미 Material 3 데모와 같은 일부 앱을 실행할 수 있습니다. Dart 3.2 블로그 글에는 더 자세한 정보가 있습니다.

# 활기찬 커뮤니티의 힘

오늘의 블로그 글은 지난 몇 분기 동안 이뤄진 수천 개의 개선 사항 중 일부만 살펴본 것입니다. 더 중요한 것은, 구글 외부 개발자들이 기여한 개선 사항이 점점 더 많아지고 있다는 점입니다. 최근 발표된 2023 GitHub 옥토버스 보고서에 따르면 오픈 소스 활동에서 플러터 프로젝트가 모든 GitHub 오픈 소스 프로젝트 중 상위 3위에 올랐습니다.

![Majorstepsthisyearonthejourneytomultiplatformdevelopment_7.png](/assets/img/Majorstepsthisyearonthejourneytomultiplatformdevelopment_7.png)

<div class="content-ad"></div>

귀하의 놀라운 지원 덕분에 올해는 훌륭한 한 해였습니다. 다트와 플러터 커뮤니티의 다양성, 열정 및 친절한 정신에 감사드립니다. 여러분의 노력이 제품의 성공에 중요한 역할을 하고 있다는 것을 알고 있습니다. 다음에 여러분이 어떤 것을 만드는지 기대가 됩니다. 다음 업데이트까지, 감사합니다 🙏 즐겁게 코딩하세요!
