---
title: "플러터에서 텍스트 스케일링을 적절히 다루는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-ProperlyhandlingtextscalinginFlutter_0.png"
date: 2024-05-17 03:37
ogImage:
  url: /assets/img/2024-05-17-ProperlyhandlingtextscalinginFlutter_0.png
tag: Tech
originalTitle: "Properly handling text scaling in Flutter"
link: "https://medium.com/@pomis172/properly-handling-text-scaling-in-flutter-313fe717816c"
isUpdated: true
---

이 튜토리얼은 가장 쉽고 영향력이 큰 해결책을 먼저 제시하도록 구성되어 있어요. 후속 섹션에는 구현이 어려우면서 전반적인 영향이 더 낮은 해결책들이 포함되어 있지만, 특정 경우에 대응하기 위해 유용해요.

![이미지](/assets/img/2024-05-17-ProperlyhandlingtextscalinginFlutter_0.png)

## 텍스트 스케일링 가능 범위 제한

MaterialApp에 최소 및 최대 스케일 팩터를 설정할 수 있어요. 이렇게 하면 모든 텍스트가 지정한 범위 내에서 스케일링된다는 것을 보장할 수 있어요. 더 빈번한 경계는 가독성과 미적 감각을 유지하는 데 덜 노력이 필요해요. 그러나 경계 선택은 대상 사용자에 따라 달라져야 해요. 예를 들어 노인 사용자를 대상으로 한 앱의 경우, 그들의 요구를 수용하기 위해 더 넓은 범위를 사용하는 것을 고려해야 해요.

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
    MaterialApp(
      ...
      builder: (_, child) => MediaQuery(
        data: MediaQuery.of(context).copyWith(
          textScaler: MediaQuery.of(context)
              .textScaler
              .clamp(minScaleFactor: 0.8, maxScaleFactor: 1.6),
        ),
        child: child!,
      ),
    );
```

## 텍스트를 포함하는 요소에 고정 높이를 사용하지 마세요

다음 코드를 살펴보세요:

```js
          //DON'T
          SizedBox(
            height: 100,
            child: Card(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text("Title", style: TextStyle(fontSize: 30), maxLines: 1),
                    Text("Subtitle", maxLines: 1),
                  ],
                ),
              ),
            ),
          ),
```

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

문제가 발생할 수 있습니다.

예상하신 대로, 텍스트 크기를 키우면 SizedBox의 내용이 너무 많은 공간을 차지할 수 있습니다.

![image](/assets/img/2024-05-17-ProperlyhandlingtextscalinginFlutter_1.png)

컨텐츠 높이 및 패딩에 기반한 아이템의 높이를 만드는 것이 더 좋습니다. 게다가 ConstrainedBox를 사용하여 최소 높이를 설정할 수도 있습니다.

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
ConstrainedBox(
  constraints: const BoxConstraints(minHeight: 100),
  child: const Card(
    child: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text("Title", style: TextStyle(fontSize: 30), maxLines: 1),
          Text("Subtitle", maxLines: 1),
        ],
      ),
    ),
  ),
),
```

결과적으로 100% 배율에서 동일한 레이아웃을 얻고, 160%에서도 유효한 레이아웃을 얻을 수 있습니다.

<img src="/assets/img/2024-05-17-ProperlyhandlingtextscalinginFlutter_2.png" />

ListView에도 동일한 사항이 적용됩니다. itemExtent를 사용하는 경우, 폰트 스케일을 고려하여 계산하거나 prototypeItem을 제공하는 것이 좋습니다. 이에 대해 자세히 설명된 내용은 이 기사에서 확인할 수 있습니다.

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

계속 진행해 봅시다. 다음 레이아웃을 상상해보세요:

![Image1](/assets/img/2024-05-17-ProperlyhandlingtextscalinginFlutter_3.png)

아이템 A는 이전 예시에서 나왔어요. 아이템 B는 약간의 간격을 가지고 있고 텍스트 확대에 대응할 수 있어야해요. 화면 하단에는 충분한 공간이 있어요. 그래서 어떤 문제가 발생할 수 있을까요?

![Image2](/assets/img/2024-05-17-ProperlyhandlingtextscalinginFlutter_4.png)

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

화면이 작은 폰들도 고려해주세요. 또한, 언어를 바꿀 때 텍스트 길이가 달라질 수 있어요.

## 컨텐츠를 스크롤할 수 있도록 만들기

먼저, 모든 컨텐츠에 접근 가능하도록 오버플로우를 제거해야 해요. 간단한 SingleChildScrollView를 추가하면 이 문제를 해결할 수 있어요.

## 마진과 패딩에 대해 적응적인 값을 사용하는 것을 고려해보세요

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

이것은 논란이 될 수 있는 방법일 수 있지만, 자신이 더 큰 글꼴을 사용해야 하는 사용자로 상상해보세요. 사용되지 않는 공간을 많이 보고 싶으신가요 아니면 텍스트를 명확하게 읽고 싶으신가요?

텍스트를 표시하는 논리적 픽셀의 수에 따라 값들을 사용해봅시다. smallScreenThreshold를 응용 프로그램에 가장 적합한 값으로 조절할 수 있습니다.

```js
class Dimens {
  static const smallScreenThreshold = 300;
  static bool isSmallWidth(BuildContext context) {
    return MediaQuery.of(context).size.width /
            MediaQuery.textScalerOf(context).scale(1) <
        smallScreenThreshold;
  }

  static double small(BuildContext context) => isSmallWidth(context) ? 4 : 8;
  static double medium(BuildContext context) => isSmallWidth(context) ? 8 : 16;
  static double large(BuildContext context) => isSmallWidth(context) ? 16 : 32;
}
```

만약 Human Interface Guidelines와 Material Design을 따르고 싶다면, 이 값들은 4로 나눌 수 있는 값이어야 합니다.

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

이러한 Dimens에 기반하여 간격에 대한 클래스를 만들 수 있습니다:

```js
class Insets {
  static EdgeInsets small(BuildContext context) =>
      EdgeInsets.all(Dimens.small(context));

  static EdgeInsets medium(BuildContext context) =>
      EdgeInsets.all(Dimens.medium(context));

  static EdgeInsets large(BuildContext context) =>
      EdgeInsets.all(Dimens.large(context));
}
```

그리고 코드에서 다음과 같이 대체합니다:

```js
//padding: const EdgeInsets.all(16),
padding: Insets.medium(context),

//SizedBox(height: 16),
SizedBox(height: Dimens.medium(context)),
```

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

결과적으로 화면에 텍스트를 그릴 수 있는 공간이 조금 더 확보되었습니다:

![이미지](/assets/img/2024-05-17-ProperlyhandlingtextscalinginFlutter_5.png)

## 제목의 텍스트 크기 확장을 제한하세요

글꼴 크기를 크게 하는 주된 목적은 시력이 약해진 사람들에게 콘텐츠를 가독성 있게 만드는 것입니다. 그러나 제목과 같은 앱의 일부는 이미 글꼴이 크기 때문에 접근성이 좋을 수 있습니다. 이를 해결하기 위해 텍스트가 확대될 수 있는 범위를 제한할 수 있습니다. 이를 달성하는 한 가지 방법은 제목용 사용자 정의 위젯을 만드는 것입니다:

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
class TitleText extends StatelessWidget {
  final String text;
  final TextStyle style;

  const TitleText(this.text, {required this.style, super.key});

  static const double maxRealFontSize = 30;

  @override
  Widget build(BuildContext context) {
    if (MediaQuery.textScalerOf(context).scale(style.fontSize!) >
        maxRealFontSize) {
      return Text(
        text,
        style: style.copyWith(
          fontSize: maxRealFontSize / MediaQuery.textScalerOf(context).scale(1),
        ),
      );
    }
    return Text(text, style: style);
  }
}
```

이렇게 하면 가독성을 유지하면서 공간을 더 확보할 수 있어요. 앱에 더 적합한 값으로 maxRealFontSize를 변경할 수 있어요.

<img src="/assets/img/2024-05-17-ProperlyhandlingtextscalinginFlutter_6.png" />

## 최대 줄 수 및 텍스트 오버플로우 지정하기

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

큰 화면에서 일반적인 텍스트 스케일로 보기 좋을 수도 있지만, 다른 조건에서는 수직 공간을 더 많이 차지할 수 있음을 잊지 마세요. 그러나 제목(Subtitle)과 같은 곳은 항상 전체 내용을 표시할 필요가 없습니다. Text 위젯에 maxLines 값을 추가하여 원하는 줄 수로 설정할 수 있습니다.

![Properly handling text scaling in Flutter](/assets/img/2024-05-17-ProperlyhandlingtextscalinginFlutter_7.png)

1로 설정된 maxLines로 보기 좋네요. 주요 정보는 여전히 잘 보입니다.

## 문자열의 대안 버전 사용하기

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

하지만 항상 유용한 정보를 포함하는 방식으로 문자열을 줄이는 것이 가능한 것은 아닙니다. 게다가, 단어 순서는 다른 언어들에서 다르게 변할 수 있습니다. 영어에서의 첫 번째 단어가 다른 언어에서는 문장의 끝에 올 수도 있습니다. 이번에는 국제화(i18n) 문자열을 고려해보는 것이 중요합니다:

```js
        "tasksDone": {
            "one": "할 일 중 $completed 개 완료",
            "other": "할 일 중 $completed 개 완료"
        },
        "tasksDoneShort": {
            "one": "$completed/$n 작업 완료",
            "other": "$completed/$n 작업 완료"
        },
```

가장 의미 있는 부분은 숫자를 나타낸 부분입니다. 더 짧은 버전에서 숫자를 앞에 두고 전체 문자열을 더 짧게 만들었습니다. 코드에서는 다음과 같이 사용할 수 있습니다:

```js
        Text(
          Dimens.isSmallWidth(context)
              ? t.tasksDoneShort(n: 10, completed: 5)
              : t.tasksDone(n: 10, completed: 5),
          maxLines: 1,
        )
```

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

![Screenshot](/assets/img/2024-05-17-ProperlyhandlingtextscalinginFlutter_8.png)

스크린샷을 보시면, 단축된 버전을 사용하면 필요한 정보를 보여주는 데 도움이 됩니다.

이 기사가 유용하게 느껴졌으면 좋겠네요. 더 유용한 기술을 찾으면 업데이트할 예정입니다. 코드는 이 저장소에서 찾을 수 있습니다.

![Screenshot](/assets/img/2024-05-17-ProperlyhandlingtextscalinginFlutter_9.png)
