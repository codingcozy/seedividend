---
title: "이미지가 표시되지 않아요"
description: ""
coverImage: "/assets/img/2024-06-20-Imagesnotdisplaying_0.png"
date: 2024-06-20 03:13
ogImage: 
  url: /assets/img/2024-06-20-Imagesnotdisplaying_0.png
tag: Tech
originalTitle: "Images not displaying"
link: "https://medium.com/@meganelise_23551/images-not-displaying-07683b97dad4"
isUpdated: true
---




음식 레시피와 농담을 가져오는 애플리케이션을 개발하면서 우리 팀은 흥미로운, 귀찮은, 작지만 크고 매우 눈에 띄는 문제에 직면했어요.

백그라운드 이미지가 VSC의 Live Server 플러그인으로 코드를 테스트할 때만 나타나는 문제가 있었죠. Github 페이지 배포나 로컬 환경에서는 이미지가 나타나지 않았어요.

디버깅을 위해 우리는 배경이 없는 페이지에서 인스펙터를 열고 에러 (1)를 확인했어요 - 파일을 찾을 수 없음. 그리고 CSS를 확인해보니 이미지 위치를 지정한 위치 (2)와 소스 탭도 봤어요. CSS는 브라우저에게 존재하지 않는 폴더 (3)에서 찾도록 지시하고 있었어요. 루트 디렉토리(C 드라이브)에 assets/images 폴더가 없네요.

<div class="content-ad"></div>


![이미지가 표시되지 않는 이유](/assets/img/2024-06-20-Imagesnotdisplaying_1.png)

왜 이런 일이 발생하는 걸까요?

CSS(2)에서 절대 경로를 사용하고 있는데, 경로 시작 부분에 슬래시( / )가 있어서 assets 폴더가 루트 디렉토리 안에 바로 있는 디렉토리에서 이미지를 찾고 있는 것 같아요. 하지만 해당 assets 폴더가 실제로는 존재하지 않는 것 같습니다.

CSS에서 경로를 아래와 같이 상대 경로로 변경하면, ..으로 시작해서 CSS 파일의 부모 디렉토리를 가리키게 되므로, 브라우저가 우리의 배경 이미지 위치를 올바르게 가리킬 수 있게 됩니다.


<div class="content-ad"></div>

![이미지](/assets/img/2024-06-20-Imagesnotdisplaying_2.png)

Live Server를 통해 절대 경로를 사용하면 문제가 가려질 수 있습니다. 루트 디렉토리에 assets라는 디렉토리가 있기 때문에 경로는 유효한 것입니다.

![이미지](/assets/img/2024-06-20-Imagesnotdisplaying_3.png)

이 문제에 대한 해결책을 검색할 때 많은 사람들이 같은 질문을 하지만 완전한 답변을 찾기 어렵습니다. 상대 경로와 절대 경로는 혼란스러울 수 있으며, 처음 시작할 때 충분히 고려되지 않는 경우가 많습니다. 이 기사가 조금이나마 도움이 되길 바라겠습니다!

<div class="content-ad"></div>

읽어 주셔서 감사합니다! 코딩 즐겁게 하세요!