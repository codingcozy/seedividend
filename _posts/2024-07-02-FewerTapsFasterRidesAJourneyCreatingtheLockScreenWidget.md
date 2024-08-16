---
title: "잠금 화면 위젯 제작 여정 더 적은 탭으로 더 빠른 이동"
description: ""
coverImage: "/assets/img/2024-07-02-FewerTapsFasterRidesAJourneyCreatingtheLockScreenWidget_0.png"
date: 2024-07-02 22:19
ogImage: 
  url: /assets/img/2024-07-02-FewerTapsFasterRidesAJourneyCreatingtheLockScreenWidget_0.png
tag: Tech
originalTitle: "Fewer Taps, Faster Rides: A Journey Creating the Lock Screen Widget"
link: "https://medium.com/ridedott/fewer-taps-faster-rides-a-journey-creating-the-lock-screen-widget-00dc943c9592"
isUpdated: true
---





![Lock Screen Widget](/assets/img/2024-07-02-FewerTapsFasterRidesAJourneyCreatingtheLockScreenWidget_0.png)

우리의 한 가지 중점은 일일 이용자들을 위한 라이딩 경험을 향상시키는 것입니다.

최근에 우리는 Lock Screen 위젯을 도입했습니다. 이를 통해 사용자들은 앱을 직접 열고 QR 코드를 스캔하여 이동 중에 라이딩을 즐길 수 있습니다.

본 문서에서는 아이디어 제시로부터 릴리스까지의 여정을 안내해 드리겠습니다.


<div class="content-ad"></div>

# 잠금 화면 위젯

잠금 화면 위젯은 iOS 16에서 소개되었으며, 자주 사용하는 앱 작업을 더 쉽게 액세스할 수 있도록 탭을 줄여줍니다. 이미 많은 인기있는 앱이 이 기능을 채택하고 있습니다.

일반적으로 위젯이 사용되는 방식을 이해하기 위해 기존 위젯을 두 가지 유형으로 분류했습니다.

- 빠른 액세스 — 빠른 액세스 제공 (카메라 실행 또는 음악 듣기와 같은 기능)
- 실시간 업데이트 — 실시간 데이터 표시 (읽지 않은 이메일 수 또는 배터리 잔량과 같은 정보)

<div class="content-ad"></div>

Dott 앱을 위해, Live update 위젯을 관리해야 하는 시간표를 증가시키고 제품 범위를 늘릴 수 있는 더 복잡한 작업이 필요하다는 이유로 Quick access 위젯을 탐색하며 시작했습니다.

# 언락 플로우 최적화

떠오르는 아이디어 중 하나는 차량 언락 플로우를 최적화하는 것이었습니다. 이전에는 길거리에서 원하는 차량을 발견해도 즉시 차량을 이용할 수 없었습니다.

이 언락 플로우에는 세 단계가 포함되어 있었습니다:

<div class="content-ad"></div>

- 전화 잠금 해제
- 돗 앱 열기
- "주행을 스캔하려면" 버튼을 탭하세요

나는 이러한 상호 작용을 줄이기 위해 잠금 화면에서 직접 빠른 액세스를 제공하는 것을 상상했습니다. 잠금 화면 위젯을 통해 라이더가 스쿠터를 한 단계로 잠금 해제할 수 있습니다:

- 잠금 화면 위젯을 탭하세요

자세한 내용은 아래 이미지를 참조하세요:
![이미지](/assets/img/2024-07-02-FewerTapsFasterRidesAJourneyCreatingtheLockScreenWidget_1.png)

<div class="content-ad"></div>

개발에 깊이 몰입하기 전에, 간단한 프로토타입을 만들었어요. Dott 앱을 여는 바로 가기를 만들어서 Lock Screen 위젯으로 설정했죠.

앱을 여는 간단한 작업이지만, 매일의 루틴에서 바로 앱에 접근하고 싶은 상황이 있는지 실험해 볼 만한 가치가 있어요. 위젯을 구현하기 전에 이 작업을 시도해보는 걸 적극 추천합니다.

디자이너와 개발자 동료들로부터 긍정적인 피드백을 받아, 공식 Lock Screen 위젯의 디자인과 구현으로 나아가게 되었어요.

<div class="content-ad"></div>

# 위젯을 활성화하기

애플의 위젯킷 문서는 프로젝트에 위젯을 추가하는데 좋은 시작점이었어요. 그러나 몇 가지 함정에 빠졌답니다:

## 버전 관리

앱 버전과 위젯의 빌드 버전은 앱 대상의 버전과 동일해야 합니다. 그렇지 않으면 AppStoreConnect에 빌드를 업로드할 때 ITMS-90473: CFBundleVersion Mismatch 또는 ITMS-90473: CFBundleShortVersionString Mismatch 오류가 발생할 수 있어요.

<div class="content-ad"></div>

## 장치로 테스트 중

앱을 실행할 때 위젯 확장 기능이 포함된 앱 중 일부 경우 선택기에 앱이 표시되지 않거나 표시되어도 위젯이 최신 변경 사항을 반영하지 않을 때가 있습니다. 이런 경우에는 앱을 삭제한 다음 앱을 다시 실행하여 해결하는 경우가 대부분입니다.

## 위젯 사용 추적하기

사용자가 잠금 화면에 위젯을 추가할 때를 감지하는 API가 없어 위젯 사용 및 프로젝트 성공을 추적하는 것이 어려울 수 있습니다. 위젯 타임라인 새로 고침을 추적하는 것을 고려해봤으나, 신중하게 제어하지 않으면 많은 양의 분석 이벤트가 생성될 수 있습니다.

<div class="content-ad"></div>

앱 타겟에서 getCurrentConfigurations(_:)를 사용하여 추가되거나 제거된 위젯을 추적했어요.

# 성공적인 릴리스와 그 이후

잠금 화면 위젯이 포함된 버전이 출시되었고, 탑승객들이 이를 활용하는 모습을 보게 된 것에 기쁨을 느낍니다.

초반 결과가 약속되어 있으며, 이 기능이 더 나은 이용 경험을 보장하는 방향으로 어떻게 발전하는지 기대됩니다.

<div class="content-ad"></div>

앞으로 오는 업데이트들을 기대해 주세요!