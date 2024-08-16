---
title: "m3u 및 m3u8 재생목록 재생을 위한 온라인 비디오 플레이어 만들기"
description: ""
coverImage: "/assets/img/2024-05-16-CreatinganOnlineVideoPlayerform3uandm3u8PlaylistPlayback_0.png"
date: 2024-05-16 17:04
ogImage: 
  url: /assets/img/2024-05-16-CreatinganOnlineVideoPlayerform3uandm3u8PlaylistPlayback_0.png
tag: Tech
originalTitle: "Creating an Online Video Player for m3u and m3u8 Playlist Playback"
link: "https://medium.com/@igorfedorchuk/creating-an-online-video-player-for-m3u-and-m3u8-playlist-playback-on-ios-07e98daa1e51"
isUpdated: true
---




저는 m3u 및 m3u8 형식의 재생 목록을 재생할 수 있는 플레이어를 만든 경험을 공유하고 싶어요.

아이디어의 기원

몇 년 전, 축구 중계 시청이 비싼 구독료나 많은 광고로 제한되어 있을 때, 작은 비용으로 다양한 채널을 제공하는 서비스를 사용하기 시작했어요. 해당 서비스는 m3u8 형식의 파일을 제공했죠. iOS에서는 이 형식의 재생 목록을 재생하는 옵션이 제한되어 있었어요: 사용 가능한 앱은 유료이거나 세션 당 여러 차례 보이는 광고로 가득 찼었어요. 또한, 서비스에서 제공한 파일을 파싱할 수 없는 VLC 플레이어 문제도 있었고 OttPlayer는 일시적으로 앱 스토어에서 사라져 있었는데 (지금은 다시 이용 가능해요), 이러한 상황으로 인해 나만의 플레이어를 만들게 되었어요.

첫 번째 버전의 개발

<div class="content-ad"></div>

세 개월 동안 플레이어의 첫 번째 버전을 개발했어요. 디자인과 네비게이션은 인기 앱에서 영감을 받았어요. 애플리케이션의 아이콘은 스톡 자원에서 구매하고, 앱 아이콘은 온라인 편집기를 사용하여 만들었어요. iOS의 내장 AVPlayerViewController를 비디오 재생의 기초로 선택했어요. 처음 몇 달 동안 앱은 다운로드 숫자가 적었지만, 아시아 블로거가 자신의 텔레그램 채널에서 언급한 후 상황이 바뀌었어요.

![이미지](/assets/img/2024-05-16-CreatinganOnlineVideoPlayerform3uandm3u8PlaylistPlayback_0.png)

개선사항과 새로운 기능

이후에 플레이리스트 작업을 위한 많은 기능이 추가되었어요. 검색, 편집, 링크 기반로딩을 포함해서 말이에요. 하지만 이는 다운로드의 큰 증가로 이어지지 않았어요. 그래서 사용자 정의와 비디오 로딩/버퍼링 추적에 관한 문제점을 해결하여 플레이어를 개선하기로 결정했어요.

<div class="content-ad"></div>

기존 AVPlayer를 기반으로 한 향상된 플레이어가 만들어졌으며 전체 화면 모드, AirPlay 기능 및 화면 내 화면 모드를 지원합니다. 새 버전은 앱의 안정성을 향상시키고 비디오 로딩 상태를 추적하거나 플레이어에 새 기능을 추가하는 문제를 해결했습니다. 이 라이브러리는 MIT 라이선스 하에 링크를 통해 사용할 수 있습니다.

사용자 정의 플레이어 버전으로 전환한 후, 안정성 비율(크래시 없음)이 95%로 감소했습니다. 스택 추적을 분석해도 명확한 해결책을 제시하지 않았고, 에러를 내 기기에서 재현할 수 없었습니다. 로딩 프로세스를 추적하기 위해 KVO를 사용한 부분에 의심이 생겼습니다. KVO 구독의 존재를 기록하는 변수를 추가함으로써 문제를 해결했습니다. 이는 구독해지 프로세스를 적절히 관리할 수 있도록 했습니다. 이 핫픽스를 구현하면 크래시가 완전히 없어졌습니다.

형식 지원 확장

AVPlayer는 다양한 비디오 형식을 지원하지 않습니다. 이로 인해 일부 채널에서는 재생되지 않거나 다른 채널은 오디오는 있지만 비디오가 없는 경우가 있습니다. 이 문제에 대한 해결책을 찾는 과정에서 LGPLv2.1 라이선스 하에 배포되는 오픈 소스 VLC 플레이어를 찾았습니다. 이 라이선스로 인해 소프트웨어 상에서 라이브러리를 사용할 수 있지만 해당 변경 사항이 있을 경우 라이브러리를 오픈해야 하는 제약이 있음을 이해하는 데 시간이 걸렸습니다. 이에 반해 GPLv2는 모든 코드를 동일한 라이선스 하에 공개해야 하지만 해당 변경 사항을 공개해야 하는 요구는 없습니다.

<div class="content-ad"></div>

VLCKit 통합에 관한 이슈입니다. VLCKit은 Cocoapods와 Carthage를 통해 설치가 가능하지만, 제 프로젝트는 Swift Package Manager (SPM)를 사용하고 있습니다. GitHub에서 VLCKit을 SPM용으로 패키징한 저장소를 발견했지만, 최신 버전의 라이브러리를 포함하고 있지 않았습니다. 그래서 포크를 생성하고 VLCKit을 최신 버전으로 업데이트했습니다.

이제는 라이브러리를 프로젝트에 통합하는 일만 남았습니다. 구독을 통해 별도의 향상된 플레이어를 개발 및 판매하려는 아이디어가 있었지만, VLCKit은 PIP(화면 내 화면) 기능을 지원하지 않았고, AirPlay 기능도 오디오만 전송했습니다. 결과적으로 AVPlayer를 기반으로 한 플레이어를 사용하여 링크를 열기로 결정했습니다. 재생이 실패하거나 비디오 스트림이 누락된 경우에는 VLCKit이 도움을 줍니다. 만약 VLCKit도 실패한다면 사용자에게 채널을 이용할 수 없다는 안내가 제공됩니다. VLC 지원을 한 라이브러리는 여기에서 이용 가능합니다.

일부 수치

앱의 대부분 사용자는 중국과 러시아에 있지만, 지난 달 미국의 다운로드가 크게 증가했습니다. 트래픽 유입에 투자하지 않았습니다. 지역화 전략과 사용자가 리뷰를 남길 수 있는 새로운 기능 도입이 특히 효과적이었습니다. 피드백 수집을 위해 앱 내평가 시스템을 사용하고 있지만, 대부분의 사용자가 텍스트 리뷰 대신 앱에 평가를 내리고 있습니다. 앞으로 사용자들이 적극적으로 리뷰를 작성하도록 유도하는 매커니즘을 개발해야 하며, 이는 앱 스토어에서 앱의 가시성 향상에 도움이 될 것입니다.

<div class="content-ad"></div>


![image1](/assets/img/2024-05-16-CreatinganOnlineVideoPlayerform3uandm3u8PlaylistPlayback_1.png)

![image2](/assets/img/2024-05-16-CreatinganOnlineVideoPlayerform3uandm3u8PlaylistPlayback_2.png)

![image3](/assets/img/2024-05-16-CreatinganOnlineVideoPlayerform3uandm3u8PlaylistPlayback_3.png)

![image4](/assets/img/2024-05-16-CreatinganOnlineVideoPlayerform3uandm3u8PlaylistPlayback_4.png)


<div class="content-ad"></div>

Monetization

저는 AdMob에서 세 가지 유형의 광고를 실험해 보았습니다: 피드에 통합된 네이티브 광고, 인터스티셜 광고 및 앱 오픈 광고입니다. 처음에는 네이티브 광고를 사용했지만 수익은 미미했습니다. 그런 다음 앱 오픈 광고로 전환했는데, 지표가 약간 향상되었지만 여전히 기대에 못 미쳤습니다. 마지막으로 사용한 것은 인터스티셜 광고였습니다. 앱 오픈 광고가 앱 시작 시 표시되는 용도라는 것을 고려하면 이상적이지는 않지만, 그들의 eCPM은 상당히 높았습니다. 현재 앱을 열 때 3시간마다 한 번 광고가 표시됩니다.

![이미지](/assets/img/2024-05-16-CreatinganOnlineVideoPlayerform3uandm3u8PlaylistPlayback_5.png)

프로젝트 개발을 위한 계획은 무엇입니까?

<div class="content-ad"></div>

먼저, 플랜은 온보딩을 추가하는 것입니다. 이를 통해 인터넷에서 재생 목록을 검색하는 방법을 설명하고, 가능하다면 비디오를 통해 시연할 것입니다. 애플의 가이드라인에 따라 비디오가 거절될 수 있지만 시도해 볼 가치가 있습니다. 추가로 비디오 재생을 멈추는 타이머가 도입되고, 화면 방향 잠금 기능도 추가될 예정입니다.

여기까지 입니다. 주목해 주셔서 감사합니다!

PS: 앱 링크입니다.