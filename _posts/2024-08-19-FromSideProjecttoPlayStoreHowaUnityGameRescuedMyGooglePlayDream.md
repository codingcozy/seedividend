---
title: "유니티로 만든 게임 플레이 스토어에 배포하는 방법"
description: ""
coverImage: "/assets/img/2024-08-19-FromSideProjecttoPlayStoreHowaUnityGameRescuedMyGooglePlayDream_0.png"
date: 2024-08-19 03:19
ogImage: 
  url: /assets/img/2024-08-19-FromSideProjecttoPlayStoreHowaUnityGameRescuedMyGooglePlayDream_0.png
tag: Tech
originalTitle: "From Side Project to Play Store How a Unity Game Rescued My Google Play Dream"
link: "https://medium.com/@developerswork/from-side-project-to-play-store-how-a-unity-game-rescued-my-google-play-dream-71a3638180fa"
isUpdated: true
updatedAt: 1724032904226
---


## 오래된 프로젝트를 되살린 것의 놀라운 이점(그리고 당신도 해야 하는 이유)

![이미지](/assets/img/2024-08-19-FromSideProjecttoPlayStoreHowaUnityGameRescuedMyGooglePlayDream_0.png)

## 앱 개발 초기 날로의 회상

홈랩과 함께 한 내 여정처럼(아직 읽지 않았다면, 꼭 해보세요! 여기를 클릭하세요), 내 앱 개발 모험도 졸업 당시부터 시작했습니다. 구글 플레이 개발자 계정에 $25(그당시 일이었죠!)을 내고 안드로이드 스튜디오와 신뢰할 수 있는 Java로 안드로이드 앱을 개발하는 일에 머리를 갈기고 뛰어들었네요.

<div class="content-ad"></div>

내 첫 작품? 좋은 오래된 Tic Tac Toe 게임이지. 코드는 오픈 소스이니까 부디 es에 눈팅하러 와. 만약 1년 전이라면 나는 아마도 이것을 내 첫 "게임"이라고 불렀을텐데, 시각이 변하니까 그렇지 않니? 하지만 그건 이야기를 나중에 하도록 하지.

어쨌든, 난 어플리케이션을 Play Store에 게시했고, 초심자의 노력에 대해 어느 정도의 사랑을 받았어. 시간이 흘러서, 내가 두 개 더 어플리케이션을 만들었지. 하나는 계산기 어플이었어 (게시되지 않았지만, 코드는 여기: github/Calculator), 그리고 다른 하나는 실시간 COVID-19 데이터를 보여주기 위한 어플이었어 (github/Covid19-Projections). 안타깝게도 후자는 구글 리뷰어들에 의해 정지시킨 거야... 아시다시피, 그 전염병 상황으로 인해서 말야.

## 두려운 무작위 이메일

몇 달 전, 나는 구글 Play Console 지원센터로부터 그 두려운 이메일을 받았어. 아시는 그 이메일을... 이러면 당신 개발자 계정이 불활성화 될 수 있다는 내용의 이메일을 말야. 그들은 나에게 60일 내로 이 문제에 대해 어떤 조치를 취하라고 했어, 그렇지 않으면 내 계정이 영구정지될 거란다. 이 말은 즉, 내가 다시 Play Store에 게시하기 원한다면 다시 $25를 내야 한다는 뜻이지.

<div class="content-ad"></div>

![사진](/assets/img/2024-08-19-FromSideProjecttoPlayStoreHowaUnityGameRescuedMyGooglePlayDream_1.png)

우선 떠오른 생각은 "노코드" 웹사이트 빌더 중 하나를 사용하여 빠르게 앱을 만드는 것이었습니다. 간단한 카운터 앱이 되어야 할 것 같았죠 — 탭하면 카운터가 증가합니다. 쉽죠, 그렇죠? 음, 그렇게 간단하지 않았습니다. "노코드" 플랫폼조차도 탐색하기에 귀찮은 부분이 있었습니다. 그래서 결국 첫 단계로 돌아가야 했습니다.

이제 여러분은 아마도 이렇게 생각하실지도 모릅니다. "그냥 예전 앱 중 하나를 업데이트하고 다시 게시하면 되지 않나요?" 문제는 코딩이 아니었습니다; 설정이었습니다. Android Studio는 항상 드라이버 문제와 암호화된 오류가 나타나는 등 설정하는 데 약간 골치아팠죠. 당시에는 심지어 기본 앱을 컴파일하는 것조차 헤라클레스가 해야 할 작업처럼 느껴졌고, 아직도 그 때의 기억이 좀 남아 있기도 합니다.

그때 갑자기 깨닫게 되었습니다 — 게임 개발 학습 단계에서 몇 가지 모바일 호환 게임을 만들었습니다. 그 중 하나가 Fruit Collector 3D(github/Fruit-Collector-3D)였습니다. Unity로 만들어졌고 다양한 디자인 패턴을 보여주기 위한 프로토타입이었습니다. 하지만, APK로 컴파일하여 여러 Android 기기에서 테스트해 본 결과, 작동했습니다! 적어도, 크래시나 오류가 나지 않았죠.

<div class="content-ad"></div>

## 구글 플레이를 위한 앱 준비하기

이제 앱이 잘 준비되었으니, 구글 플레이 스토어에 패키징할 차례입니다. 나는 여러 개의 YouTube 튜토리얼을 따라가 보았고, 솔직히 말하자면 유니티의 UI 덕분에 모든 것이 매우 간편해졌어. 이제 프로세스를 자세히 알아볼게:

- Android로 전환하기: Build Settings로 이동해서 플랫폼을 Android로 변경합니다. 처음 해보는 거라면, 유니티가 안드로이드 SDK에 맞게 게임을 다시 컴파일할 수 있어.
- 플레이어 설정: Build Settings 메뉴에서 Player Settings로 이동합니다. 기본 정보를 작성하고 앱 아이콘을 설정하세요 — Play Store는 이것 없이 출시를 허용하지 않아.
- 안드로이드 전용 설정: Player Settings (Android) → Other Settings에서 다음 사항에 주의하세요:
  - 패키지 이름: 유니티에서 조정할 수 있지만, Play Store에서는 앱별로 고유하고 영구적인 값을 원해.
  - 버전: 표준 버전 형식 (예: 1.0.0)을 유지하세요.
  - 번들 버전 코드: 이것이 중요해요! 새 버전을 업로드할 때마다 이 값을 증가시켜야 합니다. Play Store가 앱 번들을 추적하는 방법이죠.
  - 최소 API 레벨: 게임 기능과 대상 기기에 따라 다릅니다.
  - 대상 API 레벨: Play Store는 최신 API 레벨을 사용하도록 요구하니, 이것을 최신 상태로 유지하세요.
  - 스크립팅 백엔드: IL2CPP로 설정하세요. 다음 설정을 위해 필요합니다.
  - 대상 아키텍처: 앱 번들이 ARM64를 지원해야 하며, 이를 위해 IL2CPP가 필요합니다.

<div class="content-ad"></div>

- 배포 설정: Player 설정(Android) → 배포 설정에서 해당 프로젝트에 로컬 키스토어를 사용했지만, 키스토어를 생성하고 관리하는 표준 프로세스를 따르는 것이 좋습니다.
- 빌드 설정으로 돌아가세요: "Build APP Bundle"을 선택했는지, "Create symbols.zip"이 "public"으로 설정되어 있는지, 그리고 "Development Build"가 선택 해제되어 있는지 확인해주세요.

![이미지](/assets/img/2024-08-19-FromSideProjecttoPlayStoreHowaUnityGameRescuedMyGooglePlayDream_3.png)

- 빌드해보세요! 마지막으로 빌드 버튼을 클릭하세요. 이것은 다음 파일을 생성합니다:

![이미지](/assets/img/2024-08-19-FromSideProjecttoPlayStoreHowaUnityGameRescuedMyGooglePlayDream_4.png)

<div class="content-ad"></div>

## 구글 플레이 콘솔 탐색하기

이미 개발자 계정을 설정했기 때문에 이 부분은 건너뛰었습니다. 하지만 이를 처음 하는 경우, 다음 링크를 따라 가셔서 자신의 구글 플레이 스토어 개발자 계정을 만들 수 있습니다: [여기를 클릭하세요](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en).

구글 플레이 콘솔에 들어가서, "과일 수집가 3D"라는 새 앱을 만들고 앱 설정에서 평범한 것들을 채웠습니다. 하지만 여기서 조금 더 복잡해집니다. 이제는 앱을 직접 게시할 수 없으며 여러 단계가 있습니다. 각각을 설명해 드리겠습니다:

- 내부 테스트: 최대 100명까지의 사람들을 선택하여 앱을 다운로드하고 실행해보며 테스트할 수 있습니다. 테스터들은 제공된 링크를 통해 가입하며, 앱에서는 여전히 리뷰되지 않았다는 것을 명확히 표시합니다.
- 제한된 테스트: 발표가 이 단계로 이동하려면 구글에 의해 검토되어야 합니다. 그들이 승인을 내리기 전까지 닫힌 테스트를 위해 게시할 수 없습니다.
- 공개 테스트: 이제 누구나 앱을 다운로드할 수 있지만, 테스트 중임을 경고하며 안정성이 보장되지 않을 수 있음을 알려줍니다.
- 제품 출시: 이는 최종 안정 버전입니다. 더 이상 경고 없이 누구나 다운로드하고 설치할 수 있습니다.

<div class="content-ad"></div>

![image](/assets/img/2024-08-19-FromSideProjecttoPlayStoreHowaUnityGameRescuedMyGooglePlayDream_5.png)

하지만 모든 변경 사항은 실제로는 몇 일이 걸릴 수 있는 리뷰가 필요하다는 점이 함정입니다.

## 그리고 이겁니다! (지금은)

그래서 이 특별한 사가의 끝입니다. 여러분도 궁금할 것입니다. "계정 폐쇄 문제가 어떻게 해결되었는가?" 딱 "리뷰 제출" 버튼을 누를 때, 문제가 마법처럼 사라졌습니다! 구글은 내가 어떤 조치를 취하길 원했던 것 같군요.

<div class="content-ad"></div>

이제 Play Store의 복잡한 릴리스 프로세스를 거쳐왔으니, 길을 나선 동안 만든 몇 가지 게임을 더 출시하기로 결심했어요. 일단은 오픈 테스팅을 유지할 예정이라 누구나 쉽게 확인할 수 있게 할 거예요.

그런데 이야기가 나왔으니, 지금 바로 Play Store에서 'Fruit Collector 3D'를 다운로드하고 테스트해 볼 수 있어요! 여기 링크 있어요: [Fruit Collector 3D 다운로드 링크](https://play.google.com/store/apps/details?id=work.thedevelopers.game.prototype.FruitCollector3D)

저희 다음 작품이 궁금하시다면, 저를 여기 팔로우 하세요. 그리고 궁금한 점이 있거나 그냥 이야기하고 싶으시다면, LinkedIn에서 저와 연락해주세요. 기술 대화를 즐기는 제가 항상 기다릴게요! 제 LinkedIn 프로필은 여기 있어요: [DevelopersWork LinkedIn 프로필](https://www.linkedin.com/in/developerswork/)

참고: 본 글은 Gemini AI가 텍스트 세분화와 조직을 돕는 데 도움을 준 것에 감사드립니다.