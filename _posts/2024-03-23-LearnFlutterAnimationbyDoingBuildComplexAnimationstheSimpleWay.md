---
title: "플러터 애니메이션 배우기 - 간단한 방법으로 복잡한 애니메이션 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Learn Flutter Animation by Doing  Build Complex Animations the Simple Way"
link: "https://itnext.io/learn-flutter-animation-by-doing-build-complex-animations-the-simple-way-d580bdf35221"
isUpdated: true
---

아마도 기본 애니메이션을 Flutter에서 만드는 방법에 대해 이미 알고 계실 것입니다. 하지만 이러한 간단한 위젯들을 멋진 애니메이션으로 변환하는 것은 어떠세요? 함께 알아보고, 아래에서 볼 수 있는 멋진 애니메이션부터 시작해보죠 👇

![animation](https://miro.medium.com/v2/resize:fit:512/1*cUtGMspuEwSFT05zelLt2A.gif)

## 그래서, 시작해봅시다

새로운 Flutter 프로젝트를 생성하거나 기존 프로젝트를 사용할 수 있습니다. 애니메이션의 검은 구멍은 사실 이미지이므로 해당 이미지를 프로젝트에 추가해봅시다. 그 다음, 애니메이션 페이지를 생성해봅시다. 제가 그것을 CardHiddenAnimationPage라고 부를 것입니다.

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
class CardHiddenAnimationPage extends StatefulWidget {
  const CardHiddenAnimationPage({Key? key}) : super(key: key);

  @override
  State<CardHiddenAnimationPage> createState() =>
      CardHiddenAnimationPageState();
}

class CardHiddenAnimationPageState extends State<CardHiddenAnimationPage>
    with TickerProviderStateMixin {
  final cardSize = 150.0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          FloatingActionButton(
            onPressed: () {},
            child: const Icon(Icons.remove),
          ),
          const SizedBox(width: 20),
          FloatingActionButton(
            onPressed: () {},
            child: const Icon(Icons.add),
          ),
        ],
      ),
      // TODO: add body
    );
  }
}
```

이것은 TickerProviderStateMixin을 사용한 StatefulWidget이며, 우리는 오른쪽 하단에 두 개의 플로팅 버튼을 가지고 cardSize = 150을 정의했습니다.

## 블랙홀 애니메이션

계획은 간단합니다. 마이너스 버튼을 클릭하면 블랙홀이 나타나고 잠시 후 사라집니다. 이러한 시나리오에서 Tween 위젯은 매우 유용합니다. 이를 보여드리겠습니다.

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
늦은 최종 holeSizeTween = Tween<double>(
  begin: 0,
  end: 1.5 * cardSize,
);
늦은 최종 holeAnimationController = AnimationController(
  vsync: this,
  duration: const Duration(milliseconds: 300),
);
double get holeSize => holeSizeTween.evaluate(holeAnimationController);
```

다음으로, 애니메이션 변경 사항을 청취하고 더 이상 필요하지 않을 때 적절히 dispo‌se해야 합니다.

```js
@override
void initState() {
  holeAnimationController.addListener(() => setState(() {}));
  super.initState();
}

@override
void dispose() {
  holeAnimationController.dispose();
  super.dispose();
}
```

애니메이션 설정이 완료되었습니다. 이제 페이지에 넣어 보겠습니다. 아래 코드에서 TODO: add body를 변경하세요.👇

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
body: Center(
  child: SizedBox(
    height: cardSize * 1.25,
    width: double.infinity,
    // TODO: ClipPath로 Stack을 랩핑하세요
    child: Stack(
      alignment: Alignment.bottomCenter,
      clipBehavior: Clip.none,
      children: [
        SizedBox(
          width: holeSize, // 블랙홀 애니메이션 적용
          child: Image.asset(
            'images/hole.png',
            fit: BoxFit.fill,
          ),
        ),
        // TODO: Hello world 카드
      ],
    ),
  ),
),
```

시작할 시간이에요! 마이너스 플로팅 액션 버튼으로 돌아가서 onPressed 함수를 비동기로 만들어 봅시다.

```js
FloatingActionButton(
  onPressed: () async {
    await holeAnimationController.forward();
    Future.delayed(const Duration(milliseconds: 200),
        () => holeAnimationController.reverse());
  },
  ....
)
```

여기서 해야 할 것은 애니메이션이 먼저 끝나도록 하고, 200밀리초를 기다린 후에 애니메이션을 역방향으로 실행하는 것입니다.

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

![Card animation](https://miro.medium.com/v2/resize:fit:1000/1*mJXfx3gxflS9-j9aNHtR7Q.gif)

## 카드 애니메이션

먼저, 카드를 만들어 봅시다. 이를 HelloWorldCard라고 지어보겠습니다.

```js
class HelloWorldCard extends StatelessWidget {
  const HelloWorldCard({
    Key? key,
    required this.size,
    required this.elevation,
  }) : super(key: key);

  final double size;
  final double elevation;

  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: elevation,
      borderRadius: BorderRadius.circular(10),
      child: SizedBox.square(
        dimension: size,
        child: DecoratedBox(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            color: Colors.blue,
          ),
          child: const Center(
            child: Text(
              'Hello\nWorld',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.white, fontSize: 18),
            ),
          ),
        ),
      ),
    );
  }
}
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

지금까지 다 했습니다. 블랙홀과 헬로 월드 카드를 추가했습니다. 사용자가 마이너스 버튼을 클릭하면, 카드가 아래로 이동하여 약간 회전하고 고도가 증가할 계획입니다. 이를 위해 홀 크기를 애니메이션하는 데 사용한 Tween 기술을 사용할 것입니다.

```js
late final cardOffsetAnimationController = AnimationController(
  vsync: this,
  duration: const Duration(milliseconds: 1000),
);

late final cardOffsetTween = Tween<double>(
  begin: 0,
  end: 2 * cardSize,
).chain(CurveTween(curve: Curves.easeInBack));
late final cardRotationTween = Tween<double>(
  begin: 0,
  end: 0.5,
).chain(CurveTween(curve: Curves.easeInBack));
late final cardElevationTween = Tween<double>(
  begin: 2,
  end: 20,
);

double get cardOffset =>
    cardOffsetTween.evaluate(cardOffsetAnimationController);
double get cardRotation =>
    cardRotationTween.evaluate(cardOffsetAnimationController);
double get cardElevation =>
    cardElevationTween.evaluate(cardOffsetAnimationController);
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

initState에서 변경 사항을 관찰하는 리스너를 추가하세요.

```js
cardOffsetAnimationController.addListener(() => setState(() {}));
```

더 이상 필요하지 않을 때 dispose하는 것을 잊지 마세요.

```js
cardOffsetAnimationController.dispose();
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

우리의 HelloWorldCard로 돌아가서 offset, angle, elevation 값을 업데이트해 봅시다. 이러한 변경을 완료하면 다음과 같이 보일 것입니다👇

```js
Positioned(
  child: Center(
    child: Transform.translate(
      offset: Offset(0, cardOffset), // Offset 업데이트
      child: Transform.rotate(
        angle: cardRotation, // angle 업데이트
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: HelloWorldCard(
            size: cardSize,
            elevation: cardElevation, // elevation 업데이트
          ),
        ),
      ),
    ),
  ),
),
```

마이너스 버튼으로 돌아가서 클릭하면 카드 애니메이션도 시작해 보세요

```js
holeAnimationController.forward();
await cardOffsetAnimationController.forward();
Future.delayed(const Duration(milliseconds: 200),
    () => holeAnimationController.reverse());
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

카드 오프셋 애니메이션 컨트롤러의 기간이 1000밀리초로 설정되어 있습니다. 홀 애니메이션이 끝나면 카드 애니메이션이 완료될 때까지 기다려서 그 후에 역방향으로 실행하고 싶다면 카드 오프셋 애니메이션 컨트롤러 앞에 await를 넣어주시면 됩니다.

마지막으로, 플러스 버튼을 누를 때 할 일은 모든 애니메이션을 역방향으로 실행하는 것뿐입니다.

```js
cardOffsetAnimationController.reverse();
holeAnimationController.reverse();
```

![애니메이션](https://miro.medium.com/v2/resize:fit:960/1*biIYYvKWmvCFKiGD0dgysg.gif)

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

## 벽 - CustomClipper

블랙홀이 표시되고 카드가 예상대로 애니메이션이 되지만, 우리가 목표로 하는 효과를 완전히 만들지는 못하고 있어요. 우리는 카드가 블랙홀 쪽으로 이동한 후 다시 블랙홀에서 돌아오는 느낌을 줄 것을 원해요. 이것은 ClipPath와 CustomClipper로 해결할 수 있어요. 먼저, CustomClipper인 'BlackHoleClipper'를 만들어봅시다.

```js
class BlackHoleClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    final path = Path();
    path.moveTo(0, size.height / 2);
    path.arcTo(
      Rect.fromCenter(
        center: Offset(size.width / 2, size.height / 2),
        width: size.width,
        height: size.height,
      ),
      0,
      pi,
      true,
    );
    // 높이에 상관없이 카드가 위쪽에서 잘림을 방지하기 위해 -1000을 사용합니다
    path.lineTo(0, -1000);
    path.lineTo(size.width, -1000);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(BlackHoleClipper oldClipper) => false;
}
```

`// TODO:` 구간에 Stack을 ClipPath로 감싸고, Stack 위젯을 ClipPath로 감싸고 BlackHoleClipper를 클리퍼로 지정해주세요.

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
ClipPath(
  clipper: BlackHoleClipper(),
  child: Stack( .... ),
)
```

<img src="https://miro.medium.com/v2/resize:fit:960/1*kBJprwps2mBgkypDYgb_Ng.gif" />

우리 성공했어요! 🎉 이제 우리가 의도한 대로 정확하게 보입니다. 내 눈에는 매끄럽고 만족스럽게 보입니다. 참고로 여기에 전체 소스 코드가 있습니다. 제 지시를 따르는 데 어려움이 있으면 알려주세요.

뭔가 잘못된 부분이 있는가요? 댓글로 알려주세요. 개선할 수 있어서 기쁠 거예요.

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
