---
title: "플러터 플래시 에러 메시지 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Flutter Custom Error Message  Flash Message"
link: "https://itnext.io/flutter-custom-error-message-flash-message-c2ea430c595"
isUpdated: true
---





<img src="/assets/img/Flutter-Custom-Error-Message-—-Flash-Message_0.png" />

내가 어떻게 커스텀 플래시 메시지를 만드는지 보여줄게. 플러터에서는 이를 스낵바라고 부르기도 해. 사용자에게 에러, 성공 또는 어떤 경고 메시지를 보여주는 데 상당히 편리해.

## 프로젝트 설정

나와 함께 따라오고 싶다면 시작 프로젝트(전체 프로젝트)를 다운로드해. assets 디렉토리에는 우리의 모든 에셋이 있고, lib 디렉토리에는 main.dart와 flash_message_screen.dart가 들어있어.

<div class="content-ad"></div>

## 코딩을 시작해봐요

FlashMessageScreen은 아무것도 아닌데, 가운데 버튼이 있는 간단한 화면이에요.

![Flash Message](/assets/img/Flutter-Custom-Error-Message-—-Flash-Message_1.png)

이미 Flutter에는 이와 같은 오류나 경고 메시지를 보여주는 SnackBar 위젯이 있어요. 이것을 ScaffoldMessenger를 사용해서 표시할 거에요. SnackBar 안에는 간단한 텍스트 내용이 포함돼요.

<div class="content-ad"></div>

![Flutter-Custom-Error-Message](/assets/img/Flutter-Custom-Error-Message-—-Flash-Message_2.png)

메시지 보이기 버튼을 클릭하면 하단에 스낵바가 표시됩니다. 너무 간단하게 보일 수 있지만 걱정하지 마세요. 우리가 멋지게 만들어 보겠습니다.

![Flutter SnackBar](https://miro.medium.com/v2/resize:fit:1400/1*dPSkMJa3QyaSjA7LaB9g3w.gif)

먼저 동작을 SnackBarBehavior.floating으로 변경해봅시다. Text 위젯을 Container로 감싼 후, 높이를 90으로 설정하고 색상을 빨간색으로 지정해주세요. Container에 16만큼의 패딩을 추가하세요. 꼭지가 둥근 형태로 만들기 위해 20의 원형 모서리를 적용해주세요.

<div class="content-ad"></div>

![Flutter Custom Error Message Flash Message](/assets/img/Flutter-Custom-Error-Message-—-Flash-Message_4.png)

버튼을 클릭해서 미리보기를 확인해보세요. 하지만 우리가 기대한 것과는 달라요!

![GIF](https://miro.medium.com/v2/resize:fit:1400/1*4kMprG4ubecV3uB90CmKNg.gif)

그 문제를 해결하려면 SnackBar 배경색을 투명으로 설정하고 elevation을 0으로 설정해야 해요.

<div class="content-ad"></div>

![Flutter-Custom-Error-Message](/assets/img/Flutter-Custom-Error-Message-—-Flash-Message_6.png)

모든 것이 사라졌어요. 이제 그림자나 흰 테두리가 없어졌어요.

![Example GIF](https://miro.medium.com/v2/resize:fit:1400/1*g9lwMCF66DLU6A5GTUJ7ag.gif)

이제 Text 위젯을 Column으로 감싸고 다른 텍스트를 추가하고, 폰트 크기를 18로, 색상을 흰색으로 설정해주세요. 그리고 다음 것도 똑같이, 폰트 색상을 흰색으로, 폰트 크기를 12로 설정해주세요. 마지막으로, 최대 2줄의 텍스트가 들어갈 것이에요. 또한, TextOverflow.ellipsis로 overflow를 설정해주세요. CrossAxisAlignment를 CrossAxisAlignment.start로 설정해주세요.

<div class="content-ad"></div>

![이미지](/assets/img/Flutter-Custom-Error-Message-—-Flash-Message_8.png)

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*W0IgbvGpUxQuOrToM-AACw.gif)

왼쪽에 버블과 닫기 아이콘을 배치할 여유 공간이 필요합니다. Column을 Row로 감싸세요, SizedBox를 정의하고 너비를 48로 설정하세요. 또한 Column을 Expanded 위젯으로 감싸세요.

![이미지](/assets/img/Flutter-Custom-Error-Message-—-Flash-Message_10.png)

<div class="content-ad"></div>

이제 왼쪽에 충분한 공간이 생겼어요.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*xKFx7vhCb0Dox8bHdSrHpw.gif)

버블을 배치하려면 전체 컨테이너를 스택 위젯으로 감싸세요. 버블은 간단한 SVG 이미지입니다. 하지만 Flutter는 기본적으로 SVG를 지원하지 않습니다. 이미 시작 프로젝트에 flutter_svg 패키지를 추가했어요. 이제 이미지 경로를 복사한 다음 컨테이너 위젯 뒤에 추가하세요.

높이를 48, 너비를 40으로 설정하고 색상을 더 진한 빨간색으로 설정하세요. 우리의 버블을 왼쪽 아래로 원하는데, Positioned 위젯으로 감싸서 아래를 0으로 설정하세요. 왼쪽 아래를 20으로 설정하여 둥글게 만들어 보세요.

<div class="content-ad"></div>

<img src="/assets/img/Flutter-Custom-Error-Message-—-Flash-Message_12.png" />

거의 다 왔어요!

<img src="https://miro.medium.com/v2/resize:fit:1400/1*jUlXWLKz5NVr5MzMZ8g4Jg.gif" />

마지막으로, failed.SVG라는 다른 SVG 이미지를 추가하고 높이를 40으로 설정하세요. 이를 위해 이미지를 Positioned 위젯으로 감싸고, top을 -20으로, left를 0으로 설정하세요. 또한 stack의 clipBehavior를 Clip.none으로 설정하세요.

<div class="content-ad"></div>

이 상단 버블에 닫기 아이콘을 넣으려면 Stack 위젯으로 감싸세요. 그 안에 children에는 close.SVG라는 SVG 이미지를 추가하고 높이를 16으로 설정하세요. 우측 상단에 있는 닫기 아이콘을 가운데 정렬하려면 스택 정렬을 Alignment.center로 설정하세요. 그래도 가운데에 위치하지 않으면 닫기 SVG 이미지를 Position 위젯으로 감싸서 top을 10으로 설정하세요.

<img src="/assets/img/Flutter-Custom-Error-Message-—-Flash-Message_14.png" />

거의 다 왔어요.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*9cuRE5sYHhaZr9p9EOTOoQ.gif" />

<div class="content-ad"></div>

Flutter에서 사용자 정의 플래시 메시지를 마쳤어요. 이 플래시 메시지를 어떤 앱에서든 많은 곳에서 사용해야 해요. 재사용 가능하게 만들기 위해, 스낵바 콘텐츠를 추출할 거예요. 이걸 CustomSnackBarContent라고 부를 거에요. 에러 텍스트를 필수 매개변수로 만들고, 그런 다음 에러를 전달하세요.

![CustomSnackBarContent](/assets/img/Flutter-Custom-Error-Message-—-Flash-Message_16.png)

이제 우리 앱 어디서든 쉽게 사용할 수 있어요!

![CustomSnackBarContent Usage](/assets/img/Flutter-Custom-Error-Message-—-Flash-Message_17.png)

<div class="content-ad"></div>
