---
title: "Flutter와 Firebase로 픽셀 아트 앱 만들기"
description: ""
coverImage: "/assets/img/2024-05-18-BuildaCollaborativePixelArtAppWithFlutterandFirebase_0.png"
date: 2024-05-18 22:24
ogImage: 
  url: /assets/img/2024-05-18-BuildaCollaborativePixelArtAppWithFlutterandFirebase_0.png
tag: Tech
originalTitle: "Build a Collaborative Pixel Art App With Flutter and Firebase"
link: "https://medium.com/better-programming/build-a-collaborative-pixel-art-app-with-flutter-and-firebase-d4a027b4534b"
isUpdated: true
---




## 자신만의 r/place 만들기

![이미지](/assets/img/2024-05-18-BuildaCollaborativePixelArtAppWithFlutterandFirebase_0.png)

# 소개

요즘 r/place나 z/place에 대해 들어보셨을 것 같은데, 듣지 못했다면 무슨 얘길 하는 건지 궁금하실 것입니다. 이것들은 협업 프로젝트이자 소셜 실험이며, 사용자들이 한 번에 한 픽셀의 색을 변경하여 캔버스를 편집할 수 있는 프로젝트입니다. 행사가 끝나면 대개 2~3일 후에 아름다운 픽셀 아트 작품이 완성됩니다. 모든 정보는 위키백과에서 찾아볼 수 있습니다.

<div class="content-ad"></div>

음, 저의 GitHub 계정에서 전체 프로젝트를 찾을 수 있어요! 이 프로젝트는 클린 아키텍처 패턴을 따르지만 몇 가지 변형이 있어요. 이 글을 위해 완전히 맹목적이 될 필요를 느끼지 않았답니다.

# 받게 되는 것

# 필수 요구 사항

- 픽셀을 그리고 색상을 선택하는 방법.
- 픽셀을 저장하고 가장 중요한 것은 변경이 발생할 때 사용자에게 알릴 수 있는 실시간 데이터베이스.

<div class="content-ad"></div>

## 당신처럼 나를 그려주세요...

![image](/assets/img/2024-05-18-BuildaCollaborativePixelArtAppWithFlutterandFirebase_1.png)

먼저, 픽셀을 설명하는 클래스를 생성해봅시다. 별로 복잡한 건 아닙니다. 그저 2D 위치를 설명하는 Offset이 필요한데요, 이것은 그릴 위치와 현재 색상을 알려줍니다. 고급 섹션에서는 추가 정보도 더할 수 있습니다.

픽셀을 그리기 위해서는 캔버스를 제공하는 위젯이 필요합니다. 그것이 CustomPaint가 하는 일이며, 표현하고자 하는 내용과 방법을 지정하기 위해 CustomPainter가 필요합니다.

<div class="content-ad"></div>

기본적으로 CustomPaint는 화면 전체를 차지하지만, 모두에게 동일한 그리기 경험을 제공하고 싶으므로 그냥 1920x1080으로 고정하겠습니다. 이는 200만 픽셀 이상이 됩니다. 충분할 거예요! 흥미로운 사실은 사용하지 않는 두 가지 추가 속성이 있답니다. isComplex와 willChange입니다. 열광적으로 개발한다면 캐시 이점을 얻기 위해 true로 설정해보세요.

그런 다음, 우리는 CustomPainter와 그 Paint 설정을 생성해야 합니다.

조금 더 복잡해졌어요. 우리의 painter는 CustomPainter를 확장한다는 점을 보실 수 있죠. 이렇게 함으로써 paint와 shouldRepaint 메서드를 재정의해야 합니다. 그리려는 List`Pixel`을 매개변수로 받아서... 그뿐이에요. repaint 인수는 필요하지 않습니다. 픽셀 목록이 업데이트될 때마다 뷰가 다시 빌드될 거에요. 그런 다음 간단합니다, 픽셀 목록을 반복하고 각각의 해당 좌표에 그려주기만 하면 되죠.

게다가, 픽셀 좌표를 결정하는 방법이 필요해요. 가장 쉬운 방법은 CustomPaint를 Listener 위젯으로 감싸고 onPointerDown 콜백을 구현하는 겁니다. 그렇게 함으로써 localePosition 이벤트 매개변수를 활용하여 커서 위치를 얻을 수 있어요. position을 사용하지 마세요. 그렇게 하면 절대 위치가 아닌 캔버스 내에서의 상대 위치를 얻을 거에요.

<div class="content-ad"></div>

드디어 색상을 선택하기 위해 flutter_colorpicker 패키지를 사용하기로 결정했어요. 제가 직접 위젯을 구현할 수도 있었지만, 어차피 이미 만들어진 것을 다시 만들 필요 없잖아요.

별 다른 얘길 할 게 없어요. BlockPicker 위젯은 Scaffold AppBar에 위치해 있고, onColorChanged가 트리거될 때마다 새로운 색상을 저장하여 CustomPainter에 제공하고 있어요. 저는 제가 필요에 맞게 하나를 만들었지만, 기본 레이아웃을 사용하셔도 되요.

# 지속성

![이미지](/assets/img/2024-05-18-BuildaCollaborativePixelArtAppWithFlutterandFirebase_2.png)

<div class="content-ad"></div>

데이터베이스를 빠르게 설정하는 가장 빠른 방법 중 하나는 아마도 Firebase를 사용하는 것입니다. 사용하기 쉽고 잘 문서화되어 있으며 기본적인 용법 대부분에 대해 무료로 제공됩니다. Firebase 콘솔에서 프로젝트를 만들고 Firebase 실시간 데이터베이스를 활성화하고 플러터 프로젝트에서 Firebase 데이터베이스를 구성하면 됩니다. 현재는 권한에 대해 걱정할 필요가 없습니다. 그냥 누구든지 데이터베이스를 읽고 쓸 수 있도록 허용하십시오.

```js
{
  "rules": {
    ".read": true,
    ".write": true,
  }
}
```

최악의 경우 캔버스를 잃을 수도 있습니다. 하지만 우리는 그것을 대처할 수 있을 거예요, 분명합니다.

# 네트워크 레이어

<div class="content-ad"></div>

빠르고... 깔끔하게 진행해 봅시다! BLoC와 FirebasePixelsRepository를 설정하여 각각 프레젠테이션 레이어와 Firebase 데이터베이스와 상호 작용하도록 해보세요.

저장소부터 시작해 봅시다. 소개에서 언급했듯이, 데이터베이스에서 변경 사항이 발생할 때마다 알림을 받아야 합니다. 그래서 우리는 실시간 데이터베이스와... 스트림을 사용합니다. 목표는 데이터 변경 사항을 수신하고 그에 따라 반응하는 것입니다.

PixelsRepository는 간단한 인터페이스입니다. 실용적으로 생각해 봅시다. 우리에겐 두 가지 기능만 필요합니다.

- createPixel은 좌표를 기반으로 한 고유 해시로 참조된 픽셀을 만듭니다. 이를 통해 색상을 변경할 때 쉽게 액세스할 수 있으며 계속해서 새로운 픽셀을 무조건적으로 만드는 것을 방지합니다.
- listenPixels는 데이터베이스 내의 추가 또는 변경 사항에 구독하고, 스트림에 푸시하여 새로운 픽셀이 생성되거나 업데이트될 때 알립니다. StreamGroup에 대해 자세히 알아보세요.

<div class="content-ad"></div>

PixelModel은 다음과 같습니다. (역)직렬화 개체를 원활하게 수행하기 위해 두 개의 컨버터를 만들었습니다. 비용이 거의 들지 않습니다. 많이 도와줍니다.

이제, 저장소와 표현 계층 사이에 작은 다리를 만들어 봅시다. 관심사의 분리 원칙... 당신은 이미 알고 계시겠지만요!

무서워하지 마세요! 정말 아무것도 아닙니다. 저희 BLoC는 PixelsEventListen 및 PixelsEventAdd에 대응하여 저장소 메서드를 수신합니다. 또한 customStream과 `Map<int, Pixel>`을 생성하여 이를 스트림을 통해 표현 계층에 제공합니다.

언급할 가치가 있는 두 가지 사항: 먼저, 우리는 listen을 사용하여 스트림을 구독합니다. 두 번째, 우리는 cancelOnError를 사용하지 않습니다. (데이터의) 흐름을 계속 유지합시다.

<div class="content-ad"></div>

BLoC를 뷰에 추가하고 Stream을 StreamBuilder 위젯에 제공하세요. 그런 다음 데이터를 캔버스로 전송하세요. 여러 창에서 실행하고 하나에서 픽셀을 만들면 다른 창에서도 복제되는 것을 볼 수 있어야 합니다.

# Make It Shine

![Build a Collaborative Pixel Art App with Flutter and Firebase](/assets/img/2024-05-18-BuildaCollaborativePixelArtAppWithFlutterandFirebase_3.png)

<div class="content-ad"></div>

이제 조금 빨리 진행하겠습니다. 실제 r/place 규칙에 더 가까운 몇 가지 추가 기능을 제공하기 위해 노력할 거에요. 너무 제한적이지 않으면서도 사용자가 이를 변경할 수 없게 할 생각이에요.

## 사용자 인증

firebase_auth 패키지를 추가하고, firebase 콘솔에서 인증 기능을 활성화하고 익명을 로그인 방법으로 허용해주세요. 그런 다음 firebase_auth_repository를 만들어 처리하도록 해봐요. 물론, 이메일, Google 등의 다른 가입 수단을 추가해도 되요.

우리가 매우 기본적인 인증 개념을 가졌기 때문에 보안 규칙을 조금 업그레이드할 수 있어요.

<div class="content-ad"></div>

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

와우! 이제 인증된 사용자만 픽셀 쓰기가 가능합니다. 다음으로 뷰와 상호 작용할 AuthCubit을 생성하고 해당에 버튼을 추가하면 끝입니다!

Cubit을 사용하면 BLoC과 달리 사용자 정의 이벤트를 만들 필요가 없습니다. 메소드를 바로 호출하면 됩니다!

## 수정 이력


<div class="content-ad"></div>

픽셀이 추가되거나 수정될 때마다 모든 변경 사항을 추적할 시간입니다. 우리가 픽셀을 저장하는 데 사용한 것과 동일한 Realtime 데이터베이스를 사용해 봅시다. 이를 위해 단순히 createPixel 메서드를 업데이트하면 됩니다.

완료했습니다. 픽셀을 생성하는 동시에 새로운 고유한 참조를 푸시하고 해당 픽셀 정보를 설정합니다. 유일한 차이점은 모든 변경 사항을 영원히 유지할 것이라는 것입니다. 그것들을 사용하여 재생을 생성하는 데 사용할 수도 있겠죠?

픽셀 생성에 했던 것과 마찬가지로 전용 스트림을 작성해 주세요. 프레젠테이션 레이어에서는 각각이 픽셀 업데이트인 ListTile 목록을 포함하는 ListView에 데이터를 제공하면 됩니다. 구현에 대한 레포지토리를 확인하시고, 쉬우니까요.

## 확대/축소

<div class="content-ad"></div>

이건 조금 어려울 거에요. 지금까지 사용자들은 전체 1920x1080 캔버스를 볼 수 있기 위해 매우 큰 스크린을 갖고 있어야 했어요. 이 문제를 해결하기 위해, 먼저 수직 및 수평 스크롤을 위한 double SingleChildScrollView 위젯을 추가하고 싶을 수 있지만, 이것은 실수일 수 있고 어차피 부드럽게 작동하지 않아요.

캔버스를 InteractiveViewer 위젯 내에 감싸야 해요. constrained 속성을 false로 설정하고 minScale 및 maxScale을 필요에 맞게 조정해야 해요. 이렇게 하면 화면 크기에 상관없이 원하는 곳으로 이동할 수 있을 거예요. 자세한 정보는 문서를 참고해주세요.

레이아웃 제약 조건을 처리하고 위젯을 올바르게 배치하는 방법에 대한 정보는 저장소를 확인해주세요.

## 호스팅

<div class="content-ad"></div>

정말 간단해요. 공식 문서를 따라하기만 하면 돼요.

먼저 flutter build web --release 명령어를 실행하고, firebase init hosting 명령어를 실행해서 몇 가지 질문에 답하면 호스팅 URL을 얻을 수 있어요. 도메인을 더 세밀하게 설정하려면 Firebase 콘솔의 호스팅 구성을 확인하세요.

```js
? What do you want to use as your public directory? build/web
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
✔ Wrote build/web/404.html
```

build/web을 공개 저장소로 설정하는 것이 중요해요. 여기에 소스 파일이 저장돼 있어요. 그런 다음 firebase deploy를 실행하면 웹사이트가 공개돼요!

<div class="content-ad"></div>

제가 작성하는 것만큼 읽는 데 즐거움을 느끼셨기를 바랍니다. 이 글은 조밀하게 쓰여 있어 몇 가지 세부 내용을 건너뛴 것 같지만 필요하다면 저장소를 확인해 주세요.

## 더 알고 싶으신가요?