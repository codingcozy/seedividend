---
title: "플러터 테마 확장 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Mastering Theme Extensions Elevating Flutter App Customization to the Next Level"
link: "https://medium.com/@technicatalyst78/mastering-theme-extensions-elevating-flutter-app-customization-to-the-next-level-820ba31aa19e"
isUpdated: true
---

많은 시간에, 매우 구체적이고 상세한 디자인 시스템이 포함될 수 있습니다. 이것들은 색상, 텍스트 스타일, 그림자, 그라데이션 등을 포함할 수 있습니다.

이상적인 세상에서는 UI 디자이너들이 안드로이드 앱용 재료 가이드 라인이나 iOS 앱용 인터페이스 가이드 라인에 따라 디자인을 할 거라면 Flutter에 내장된 네이밍 컨벤션을 사용할 수 있었을텐데, 그러나 아쉽게도 우리는 이상적인 세상에 살지 않습니다. 그것이 불가능에 가깝겠죠. 그러나 해결 방법이 있습니다.

Flutter은 확장(extension)을 사용하여 테마 클래스의 능력을 확장할 수 있는 옵션을 제공합니다. 이를 활용하는 완벽한 사용 사례는 너무 많은 코드를 작성하지 않고도 밝은 모드와 어두운 모드 간에 전환하는 것입니다.

함께 코드를 살펴보고 themeExtensions가 제공하는 가능성을 탐험해보겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
class XDesignSystem extends ThemeExtension<XDesignSystem> {
  Color? textColor;
  BoxDecoration? defaultBoxShadow;
  List<Color>? defaultGradients;
  TextStyle? defaultTextStyle;

   XDesignSystem({
    this.textColor,
    this.defaultBoxShadow,
    this.defaultGradients,
    this.defaultTextStyle,
  });

  @override
  ThemeExtension<XDesignSystem> copyWith({
    Color? textColor,
    BoxDecoration? defaultBoxShadow,
    List<Color>? defaultGradients,
    TextStyle? defaultTextStyle,
  }) {
    return XDesignSystem()
      ..textColor = textColor ?? this.textColor
      ..defaultBoxShadow = defaultBoxShadow ?? this.defaultBoxShadow
      ..defaultGradients = defaultGradients ?? this.defaultGradients
      ..defaultTextStyle = defaultTextStyle ?? this.defaultTextStyle;
  }

  @override
  ThemeExtension<XDesignSystem> lerp(
      covariant ThemeExtension<XDesignSystem>? other, double t) {
    if (other is XDesignSystem){
      return XDesignSystem()
        ..textColor = Color.lerp(textColor, other.textColor, t)
        ..defaultBoxShadow = BoxDecoration.lerp(defaultBoxShadow, other.defaultBoxShadow, t)
        ..defaultGradients = defaultGradients
        ..defaultTextStyle = TextStyle.lerp(defaultTextStyle, other.defaultTextStyle, t);
    }
    return XDesignSystem()
      ..textColor = textColor
      ..defaultBoxShadow = defaultBoxShadow
      ..defaultGradients = defaultGradients
      ..defaultTextStyle = defaultTextStyle;
  }
}
```

여기서 앱에서 사용할 몇 가지 속성을 포함하는 클래스를 선언했습니다. 이 클래스와 그 속성들은 특정 규칙에 제한되지 않습니다. 다음으로 할 일은 이를 테마에 추가하는 것입니다.

```js
final lightTheme = ThemeData(
  extensions: [
    XDesignSystem()
      ..textColor = Colors.green
      ..defaultBoxShadow = BoxShadow(color: Color(0xff393B3D),blurRadius: 20, spreadRadius: 0, offset: Offset(0, 2))
      ..defaultGradients = [Colors.green, Colors.red]
      ..defaultTextStyle = TextStyle(fontSize: 18, color: Colors.black),
  ]
);
```

이제 MaterialApp 위젯에 이를 연결하여 계속 진행할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
ThemeData theme = ThemeData(
  extensions: [
    XDesignSystem()
      ..textColor = Colors.green
      ..defaultBoxShadow = BoxShadow(color: Color(0xff393B3D), blurRadius: 20, spreadRadius: 0, offset: Offset(0, 2))
      ..defaultGradients = [Colors.green, Colors.red]
      ..defaultTextStyle = TextStyle(fontSize: 18, color: Colors.black),
  ]
);

class MyApp extends StatelessWidget {
  const MyApp({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: theme,
      home: Scaffold(
        body: Center(
          child: Text('Hello, World!'),
        ),
      ),
    );
  }
}
```

이 클래스는 아래 코드를 사용하여 쉽게 액세스할 수 있습니다.

```js
Theme.of(this).extension<DesignSystem>().textColor
```

하지만 이렇게 하는 것이 그렇게 쉽지는 않죠. 조금 더 깔끔하게 만들기 위해 BuildContext에 확장(extension)을 생성할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
확장팩으로 BuildContext에 디자인 시스템을 추가합니다.

이제 이 확장을 사용하여 어디에서든 컨텍스트를 통해 쉽게 액세스할 수 있습니다. 아래 예시를 확인해보세요!

Container(
  decoration: context.designSystem.defaultBoxShadow,
)

Text("일부 텍스트",
  style: context.designSystem.defaultTextStyle,
)

그리고 완료! 매우 간단하죠?

<!-- seedividend - 사각형 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 구현은 밝은 테마와 어두운 테마 간의 전환을 쉽게 만들 뿐만 아니라 사용자가 테마로 사용할 색상을 결정할 수 있도록 하는 것도 쉽게 만듭니다.

사용자가 색상 선택기를 사용할 수 있다고 가정하면, 해당 구현 또한 매우 쉽습니다.

theme.copyWith(
  defaultTextColor: // 사용자가 선택한 색상 뭐시기
);

상태 관리 기술은 여러분에게 맡기겠습니다. 그러나 이가 다소 직관적이었기를 희망합니다.

<!-- seedividend - 사각형 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

내 소셜 미디어 계정을 팔로우하는 걸 잊지 마세요!

- LinkedIn
- Twitter
```
