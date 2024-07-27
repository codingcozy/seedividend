---
title: "Xcode 16에 새로 추가된 기능은"
description: ""
coverImage: "/assets/img/2024-07-01-WhatsNewinXcode16_0.png"
date: 2024-07-01 20:09
ogImage: 
  url: /assets/img/2024-07-01-WhatsNewinXcode16_0.png
tag: Tech
originalTitle: "What’s New in Xcode 16"
link: "https://medium.com/simform-engineering/whats-new-in-xcode-16-5c981927d68e"
---


WWDC 24에서 공개된 Xcode 16의 새로운 기능을 알아보세요.

![Xcode 16 새로운 기능](/assets/img/2024-07-01-WhatsNewinXcode16_0.png)

매번 새로운 버전이 출시될 때마다 Apple 플랫폼을 위한 통합 개발 환경(IDE)인 Xcode는 계속 변화합니다. 이 블로그에서는 Xcode 16에 추가된 새로운 기능을 살펴보겠습니다. Xcode 16 베타 버전을 다운로드하려면 Mac이 macOS 버전 14.5 이상을 실행 중인지 확인하세요. Xcode 16을 여기서 다운로드할 수 있습니다.

# 편집:

<div class="content-ad"></div>

Xcode 16에서 편집 기능 중 새로운 점 세 가지에 대해 이야기해 봅시다.

- 코드 완성: Xcode 16이 macOS Sequoia에서 실행 중일 때, 더 철저한 코드 제안을 제공하고 주변 코드 컨텍스트(함수 이름 및 주석)를 활용합니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*kBBk_DqXZa-mbx22vp7yig.gif)

- Swift 6 업데이트: Swift 6의 새로운 언어 모드는 동시성 안전 보증을 위한 새로운 언어 모드를 제공합니다. 데이터 경주를 런타임 문제로 변환합니다. 이제 각 다가오는 언어 기능에 대해 경고를 점진적으로 활성화하는 방법을 확인해 봅시다.

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-01-WhatsNewinXcode16_1.png)

예를 들어: Isolated Global Variables를 true로 설정하면 동시성 보안을 위해 이슈 탐색기에서 경고가 제공됩니다.

![이미지](/assets/img/2024-07-01-WhatsNewinXcode16_2.png)

- 미리보기 개선: 미리보기 개선을 위한 두 개의 새 API가 제공됩니다.


<div class="content-ad"></div>

@Previewable Macro: State와 같은 프로퍼티 래퍼를 첨부하여 미리보기 블록 내에서 직접 사용할 수 있게 합니다. 래퍼 뷰 작성이 필요하지 않습니다.

<img src="/assets/img/2024-07-01-WhatsNewinXcode16_3.png" />

2. PreviewModifier: 미리보기를 위해 환경이나 데이터를 쉽게 공유할 수 있게 됩니다. 중복 코드를 줄이는 데 도움이 되며 미리보기 시스템이 데이터를 캐시할 수 있도록 도와줍니다.

<img src="/assets/img/2024-07-01-WhatsNewinXcode16_4.png" />

<div class="content-ad"></div>

# 빌드:

Xcode 16에서는 명시적 모듈을 제공하여 개선된 병렬성, 더 나은 진단 및 빠른 디버깅을 제공할 것입니다. Objective-C는 기본 명시적 모듈을 제공하지만 Swift에서는 빌드 설정에서 명시적으로 빌드된 모듈을 활성화해야 합니다.

![Xcode 16의 신기능](/assets/img/2024-07-01-WhatsNewinXcode16_5.png)

Xcode 16에서는 Swift 패키지 통합이 개선되어 빌드 패키지 해결이 완료될 때까지 기다릴 필요 없이 빌드를 큐로 업데이트할 수 있습니다.

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-01-WhatsNewinXcode16_6.png)

Xcode 16부터는 소스 파일을 컴파일하는 중에 그것을 포함할 것이기 때문에, 모듈 문제로 빌드에 실패하면 명확한 오류 메시지를 얻게 될 것입니다. 더 많은 정보를 원하신다면 빌드 모듈에 대해 자세히 알아보세요: [https://developer.apple.com/videos/play/wwdc2024/10171](https://developer.apple.com/videos/play/wwdc2024/10171).

# 디버깅:

- macOS Sequoia 또는 iOS 18으로 배포에 빌드할 때 DWARF5가 이제 기본 디버그 심볼 형식입니다. 따라서 dSYM 번들이 더 작아지고 심볼이 더 빠르게 보입니다.
- Xcode 16에서 코드를 디버깅할 때, 스레드 성능 확인기가 더 강화되었습니다.


<div class="content-ad"></div>

- 메인 스레드가 멈춤: 디버그바에서 통합 백트레이스 뷰를 활성화할 수 있습니다. 호출 스택을 시각화하여 멈춤 문제를 찾는 데 도움이 될 것입니다.

2. 디스크 쓰기 진단: 문제의 영향을 서로 다른 앱 버전에서 어떻게 변경되었는지 확인할 수 있습니다.

3. 시작 진단: 이는 조직자의 새로운 카테고리입니다. 앱의 시작 진단 로그를 확인하는 데 사용될 것입니다. Xcode는 앱 시작이 시간이 오래 걸리는 이유를 보여줄 것입니다.

# 테스트:

<div class="content-ad"></div>

Swift Testing을 사용하면 표현력 있는 API를 포함하는 새로운 프레임워크를 통해 테스트 작성이 간단해집니다. 이 테스트는 XCTests와 함께 완벽하게 작동할 것입니다.

![Xcode 16.7의 새로운 기능](/assets/img/2024-07-01-WhatsNewinXcode16_7.png)

SwiftTesting 프레임워크를 사용하면 결과를 확장하여 테스트가 실패한 이유에 대한 자세한 설명을 확인할 수 있습니다. Swift Testing 프레임워크에 대해 더 알아보려면 "Swift Testing"으로 진행하고, "Meet Swift Testing"을 확인해보세요.

Xcode에서의 StoreKit 테스트

<div class="content-ad"></div>

- 앱 정책 구성: StoreKit.configuration 파일에 사용자 라이선스 동의서 및 로컬라이즈된 개인정보 보호 정책을 추가하여 StoreKit 뷰에 표시되도록합니다.
- Win-Back Offers 테스트: StoreKit.configuration 파일에서 구성하여 자동 갱신 멤버십용 윈백 오퍼를 설정합니다.

# Instrument 툴을 사용하여 성능 최적화:

Instrument 16의 새로운 Flame 그래프 프레임은 추적 실행의 고수준 개요를 제공합니다.

![이미지](/assets/img/2024-07-01-WhatsNewinXcode16_8.png)

<div class="content-ad"></div>

이제 Xcode 16의 기능에 대해 더 자세히 이야기해봅시다.

## 프로젝트와 워크스페이스

- 프로젝트 네비게이터의 컨텍스트 메뉴에서 확인 대화 상자 없이 빠르게 스위프트 파일을 생성할 수 있습니다.
- 편집 메뉴의 복사, 붙여넣기, 복제 옵션을 사용하여 기존 파일을 기반으로 새 파일을 빠르게 생성할 수 있습니다.
- 소스 편집기에서 원하는 텍스트를 잘라내어 프로젝트 네비게이터의 컨텍스트 메뉴에서 "클립보드로부터 새 파일 만들기" 명령을 선택하기 전에 Option 키를 눌러 소스 파일의 일부로부터 빠르게 새 파일을 생성할 수 있습니다.

## 기기와 시뮬레이터

<div class="content-ad"></div>

- 업그레이드된 시뮬레이터로 비전 OS에서 FaceTime 및 SharePlay 지원이 가능합니다.
- 다운로드가 중단되어도 시뮬레이터 업데이트가 재개되므로 Xcode에서 프로젝트를 빠르게 시작할 수 있습니다. 또한, 'Components' 메뉴를 통해 다운로드 가능한 구성 요소를 관리할 수 있습니다.

# 자산 관리

- Xcode 16에서 iOS용 새로운 다크 모드와 틴티드 앱 아이콘을 추가할 수 있습니다.

# Xcode 클라우드

<div class="content-ad"></div>

- 사용자 정의 별칭 설정을 정의할 것입니다. Xcode 및 macOS 구성을 중앙 집중화합니다. 또한 Xcode 클라우드에서 빌드 보고서를 열어 Xcode의 보고서 탐색기 아래에서 커버리지 데이터를 볼 수 있습니다.

## 지역화

- Xcode 16은 문자열 카탈로그에 대한 새로운 기능을 제공합니다. 예를 들어 인라인 진단 및 번역하지 않을 문자열로 표시하는 기능이 있습니다.

## 결론

<div class="content-ad"></div>

Xcode 16은 Apple의 개발 도구에서 주요한 진보를 이룬 것으로, 개발자 생산성을 향상시키고 코딩을 간소화하는 강력한 새로운 기능을 소개했습니다. 코드 완성 및 테스트를 위한 고급 AI 기능, Swift 6과의 더 깊은 통합, 그리고 SwiftUI 및 기타 프레임워크에 걸쳐 개선 사항이 포함되어 있습니다. 이러한 개선으로 앱 개발이 더 효율적이고 즐거워집니다.

참고: 현재 Xcode 16은 베타 버전입니다. 몇 가지 충돌 문제가 있을 수 있으므로 사용하기 전에 한 번 확인해주십시오.