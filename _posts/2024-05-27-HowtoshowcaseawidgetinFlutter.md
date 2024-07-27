---
title: "플러터에서 위젯을 showcase 하는 방법"
description: ""
coverImage: "/assets/img/2024-05-27-HowtoshowcaseawidgetinFlutter_0.png"
date: 2024-05-27 19:18
ogImage: 
  url: /assets/img/2024-05-27-HowtoshowcaseawidgetinFlutter_0.png
tag: Tech
originalTitle: "How to showcase a widget in Flutter?"
link: "https://medium.com/nonstopio/how-to-showcase-a-widget-in-flutter-3b0a25fac1bb"
---


<img src="/assets/img/2024-05-27-HowtoshowcaseawidgetinFlutter_0.png" />

특정 기능을 소개한 후에는 종종 앱에서 특정 위젯을 집중적으로 보여주고 싶어합니다. 이는 일반적으로 사용자를 특정 위젯으로 안내하거나 특정 위젯의 중요성을 사용자에게 보여주기 위해 수행됩니다. 보통 온보딩 화면이나 튜토리얼에서 수행됩니다. 이 기능은 "가이드라인" 또는 "코치마크"라고도 합니다.

따라서 이곳의 목표는 특정 위젯에 초점을 맞추거나 보여주어야 합니다. 화면의 다른 부분에 그림자를 만들어 특정 위젯을 강조하는 것입니다. 그러려면 위젯의 위치와 크기를 알아야 합니다. 그런 다음 오버레이를 그려서 대상이 있는 곳을 구멍으로 만들고 나머지 영역에 그림자를 만들어야 합니다. 기술적인 내용으로 들어가 봅시다...

RenderBox 클래스를 사용하여 대상의 위치를 가져올 수 있습니다. localToGlobal 메서드를 사용하여 위젯의 위치를 얻고 `size` 속성을 사용하여 위젯의 크기를 얻습니다. 이 정보를 사용하여 해당 위젯을 중점으로 하는 사각형을 그릴 수 있습니다.
아래 코드 스니펫을 고려해 보세요:

<div class="content-ad"></div>

클래스 Clipper는 CustomClipper<Path>를 확장합니다. getClip 메서드를 재정의하여 대상 위젯 주변에 사각형을 그립니다.
대상 위젯의 위치와 크기를 인수로 사용하여 오버레이를 그릴 경로를 반환합니다. PathFillType.evenOdd를 사용하여 사각형 외부 영역을 채웁니다.

```js
..addRect(
    Rect.fromLTWH(
        offset.dx,
        offset.dy,
        width,
        height,
    ),
)d
```

다른 사각형은 오버레이의 크기를 정의합니다. Offset 클래스의 & 연산자를 사용하여 offset 자체와 우측 항에서 크기를 사용하여 Rect 객체를 만듭니다.

<div class="content-ad"></div>

```js
..addRect(Offset.zero & size);
```

오버레이를 그리는 데에 필요한 모든 것입니다. 이 클리퍼를 위젯에서 사용하여 대상 위젯을 쇼케이스할 수 있습니다. 다음 과제는 대상의 위치를 파악하는 것입니다.
대상 위젯의 위치를 얻기 위해 RenderBox를 사용합니다. element 클래스의 findRenderObject 메서드를 사용하여 대상 위젯의 RenderBox 객체를 가져옵니다. 그런 다음 localToGlobal 메서드를 사용하여 위젯의 위치를 전역 좌표계로 가져옵니다. (모든 RenderBox는 부모에 대한 상대적인 자신의 위치만 추적하므로 절대 위치를 얻으려면 이를 전역 좌표로 변환해야 합니다.)

```js
Position getOffsetAndSize(BuildContext context) {
  final RenderBox renderBox = context.findRenderObject() as RenderBox;
  final topLeft = renderBox.localToGlobal(Offset.zero);

  final height = renderBox.size.height;
  final width = renderBox.size.width;

  return (
    Offset(
      topLeft.dx,
      topLeft.dy,
    ),
    height,
    width,
  );
}
```

이 함수를 사용하여 대상 위젯의 위치와 크기를 가져와서 해당 주변에 오버레이를 그릴 수 있습니다. 버튼이나 다른 트리거를 사용하여 쇼케이스를 토글할 수 있습니다.

<div class="content-ad"></div>

글로벌 키를 사용하여 대상 위젯의 현재 컨텍스트를 가져옵니다. 그러나 위젯의 컨텍스트를 가져오기 위해 위젯의 컨텍스트 속성을 사용하는 등 다른 방법을 사용할 수도 있습니다.
사용자 정의 스택을 만들어 오버레이를 표시했습니다. 이는 오버레이의 범위를 현재 페이지로 유지하고자 하는 것입니다. 페이지가 변경되면 오버레이가 사라져야 합니다. 대안으로 `Overlay` 위젯을 사용할 수도 있습니다. 이 위젯은 자재 애플리케이션에 기본 제공됩니다. 이 위젯은 MaterialApp의 오버레이 글로벌 스택에 오버레이를 삽입합니다.
나머지 코드는 상당히 간단합니다. 쇼케이스를 토글할 버튼과 탭하여 쇼케이스를 닫기 위한 GestureDetector가 있습니다. 위젯의 상태를 업데이트하고 위젯 트리를 다시 빌드하기 위해 setState 메서드를 사용합니다.

전체 코드:

여기까지입니다!! 이제 위젯을 쇼케이스하는 방법을 배웠습니다. 동일한 기술을 사용하여 위젯 위에 앵커를 만드는 데 사용할 수도 있습니다.