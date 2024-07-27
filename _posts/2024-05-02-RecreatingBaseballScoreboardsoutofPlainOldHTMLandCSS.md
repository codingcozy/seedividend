---
title: "평범한 HTML과 CSS로 야구 스코어보드 만들기"
description: ""
coverImage: "/assets/img/2024-05-02-RecreatingBaseballScoreboardsoutofPlainOldHTMLandCSS_0.png"
date: 2024-05-02 00:25
ogImage: 
  url: /assets/img/2024-05-02-RecreatingBaseballScoreboardsoutofPlainOldHTMLandCSS_0.png
tag: Tech
originalTitle: "Recreating Baseball Scoreboards out of Plain Old HTML and CSS"
link: "https://medium.com/on-building-software/recreating-baseball-scoreboards-out-of-plain-old-html-and-css-55576f771920"
---


웹 디자인을 시작할 때는 HTML과 CSS만으로 사이트를 멋지게 꾸밀 방법이 많지 않았어요. 그래서 Photoshop 이미지를 잘라서 'table'로 페이지에 고정하는 것이 많은 사람들이 사이트를 만드는 방법이었죠.

하지만 요즘 CSS의 기능은 매우 확장되었어요.

작년에는 웹사이트나 SaaS 제품과는 관련이 없는 작은 취미로 시작했어요. HTML과 CSS만으로 야구 점수판을 재현하기로 했죠.

저는 항상 점수판과 오래된 경기장에 매혹을 느꼈어요. 아마 그것이 제가 디자인에 대한 오리지널한 열정을 얻게 된 곳인지도 몰라요. 그래서 디자인과의 관계가 전체적으로 다시 원점에 돌아온 것 같아요.

<div class="content-ad"></div>

이 프로젝트를 통해 나는 보통 깨끗하고 조직적인 코드를 작성하는 내 성향을 떨쳤어. 웹 표준, DRY 코드, 심지어 성능도 고려하지 않았어 — 나에게 중요한 건 페이지가 최종적으로 어떻게 렌더링되는지 뿐이었어. 이것은 나의 항상 사용해온 자료들을 새롭고 자유분방한 방법으로 활용하는 재미있는 방법이었어.

내 첫 번째 시도들의 스크린샷을 아래에서 확인할 수 있어. 바로 페이지로의 직접적인 링크도 있어.

내 첫 번째 완성작은 1941년의 Wrigley Field야. 난 팀 펜런트들이 바람에 흔들리는 듯한 CSS 애니메이션을 추가했어. 그리고 스코어보드 시계는 심지어 10분쯤 움직여 (매우 빨리), 오후 하늘에 구름이 짙어지고 날씨가 흐려지면서 비가 첫방울 떨어질 때를 볼 수 있어.

나는 원근 명령어를 사용해 전체적으로 오른쪽으로 기울어진 모습을 만들기 위해 변환 속성과 회전을 사용했어. 솔직히 말하면, 나는 원근이 어떻게 작용하는지 정말 이해하지 못해 — 이건 순전히 시행착오로 이루어진 거였어. (보통 나는 무슨 일이 벌어지는지 이해하려고 노력하지!)

<div class="content-ad"></div>

페이지를 방문하시려면 여기를 클릭해주세요: https://kawaicheung.io/scoreboards/wrigley-1941.html.

제 두 번째 완성작은 1978년 Comiskey Park입니다. 아침이 이른 오후로 변합니다.

원본 스코어보드에는 많은 세부 정보가 있습니다. 여기에 그것을 전달할 수 있기를 희망합니다. 각 스코어보드 전구는 고유한 `div`로 표현되며 클래스를 추가하여 각 전구를 "켤" 수 있습니다. 옛 사진을 찾아 스코어보드에 적절한 행과 열 수를 가지고 있는지 확인하는 것이 재미있었습니다.

스코어보드에 깊이감을 주기 위해 상단을 덮고 있는 조명, 그리고 하단의 울타리와 레일 시스템 아래에 그림자 속성을 상당히 사용하고 있습니다.

<div class="content-ad"></div>

아래 가로선에 선형 그라데이션을 적용했어요. 이렇게 하면 그것들이 자연스럽고 경고적으로 보일 거예요. 그렇지 않으면 전체 화면에 1픽셀 직선으로 보이게 될 거예요.

그리고 화면 가장 아래 부분, 흰색 전구로 이루어진 역삼각형 모양을 주목해 주세요. 몇몇 전구들이 다른 것보다 어둡게 보이는데, 마치 소멸된 것처럼 보이는 거죠. 적어도 그것이 제 목표였어요.

페이지를 방문하려면 여기를 클릭해 주세요: https://kawaicheung.io/scoreboards/comiskey-1978.html

각 나라볼판에는 각자의 이야기와 독특한 어려움이 있어요. 이 프로젝트를 계속 진행할지는 확신이 없지만, 계속하게 된다면 이 곳에서 볼 수 있을 거에요:

<div class="content-ad"></div>

읽어 주셔서 감사합니다!