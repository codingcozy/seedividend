---
title: "Flutter에서 전역 변수를 사용하여 상태를 관리하면 안되는 이유"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Why We Never Manage State with Global Variable in Flutter"
link: "https://medium.com/@chooyan/why-we-never-manage-state-with-global-variable-in-flutter-3e92f41ac8fa"
---



플러터 앱의 상태를 전역 변수로 관리하는 사람이 아무도 없다고 생각해요. 상태 관리 패키지나 플러터의 기본 위젯인 InheritedWidget이나 StatefulWidget 같은 것들이 우리의 플러터 앱에 필요하다는 것에는 의심의 여지가 없어요.

하지만, 우리는 정말로 이러한 패키지가 상태 관리에 어떤 가치가 있는지 이해하고 있을까요? 상태 관리에 대해 생각할 때 고려해야 할 주제는 무엇일까요?

이 글에서는 의도적으로 전역 변수를 사용하여 상태 관리를 하는 간단한 카운터 앱을 만들어볼 거에요. 이 도전은 우리가 상태 관리 패키지가 어떤 문제를 해결하려고 하는지 이해하는 데 도움이 될 거예요.

# 정수 값의 전역 변수를 사용한 카운터 앱

<div class="content-ad"></div>

아래에 있는 간단한 카운터 앱부터 시작하겠습니다.

```js
import 'package:flutter/material.dart';

void main() => runApp(const MainApp());

var counter = 0;

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text(counter.toString()),
        ),
        floatingActionButton: FloatingActionButton(
          child: const Icon(Icons.add),
          onPressed: () {
            counter++;
          },
        ),
      ),
    );
  }
}
```

전역 변수로 선언된 counter를 제외하고는 간단한 카운터 앱이어야 합니다.

물론 Text는 항상 0만 표시됩니다. 왜냐하면 FloatingActionButton을 누를 때마다 count를 증가시키기만 하고 리빌드를 발생시키지 않기 때문이죠.

<div class="content-ad"></div>

# 리빌드 메커니즘 이해하기

앱이 작동하도록 진행하기 전에 리빌드가 어떻게 발생하는지에 대해 논의하는 것이 다음 논의를 이해하는 데 중요합니다.

먼저 모든 위젯이 빌드 단계에서 해당 Element를 생성한다는 점을 이해해야 합니다. 그리고 Element는 해당 위젯이 다음 프레임에서 다시 빌드해야 하는지를 관리하는 플래그인 \_dirty를 가지고 있습니다.

\_dirty는 markNeedsBuild 메서드로 수정되므로 이제 우리가 필요한 것은 FloatingActionButton이 눌렸을 때 카운터 앱을 다시 빌드하는 방법을 호출하는 것입니다.

<div class="content-ad"></div>

# StatefulWidget의 setState

markNeedsBuild를 호출하는 가장 편한 방법은 StatefulWidget의 setState를 호출하는 것입니다.

StatefulWidget의 상태는 Element와 마찬가지로 StatefulWidget에 의해 생성되며 Element와 위젯 간의 일대일 관계를 구성합니다. setState는 아래의 코드처럼 해당 Element의 markNeedsBuild를 호출하여 해당 StatefulWidget를 다시 빌드합니다.

```js
@protected
void setState(VoidCallback fn) {
  final Object? result = fn() as dynamic;
  _element!.markNeedsBuild();
}
```

<div class="content-ad"></div>

그래서 우리가 필요한 것은 MainApp을 StatefulWidget으로 만들고 FloatingActionButton의 onPressed에서 setState를 호출하는 것입니다.

```js
onPressed: () {
  setState(() => counter++);
},
```

좋아요! 우리는 카운터 앱을 우리가 기대한대로 작동하도록 만들었습니다.

![GIF](https://miro.medium.com/v2/resize:fit:1400/1*MrlJNCgHD2PD-PJZ19MAjA.gif)

<div class="content-ad"></div>

위 내용에 대한 한국어 번역은 다음과 같습니다:

GitHub 저장소에서 코드의 변경 사항 및 전체 코드를 확인할 수 있어요.

# 앱 상태 관리

모든 문제를 해결했나요? 물론 그렇지 않아요.

다른 문제가 발생하는데요, 여러 위젯 간에 상태를 공유할 때 문제가 발생해요.

<div class="content-ad"></div>

또 다른 화면 위젯을 만들어서 FirstPage라는 이름을 주고, 기존 위젯을 SecondPage로 추출해보세요. 두 페이지 모두 화면 가운데에 카운트를 보여줍니다. 하지만 FirstPage의 FloatingActionButton은 SecondPage로 이동하는 것이고, SecondPage의 경우는 카운터를 증가시킵니다.

여기에서 변경 사항을 확인할 수 있습니다. 아래에 데모를 제공합니다.

![데모](https://miro.medium.com/v2/resize:fit:1400/1*JzHdKOiaBi8bBYF2nBKKHg.gif)

지금까지 논의한 내용에 따르면, FirstPage가 항상 0을 보여주는 이유가 분명해졌습니다. FirstPage의 markNeedsBuild가 호출되지 않기 때문입니다.

<div class="content-ad"></div>

FirstPage은 확실히 상태 카운터를 참조하며 처음에는 해당 값을 표시하지만 업데이트를 알 수 없습니다. 다시 말해, 상태를 참조할 수 있는 것만으로는 상태 관리에는 충분하지 않고 해당 업데이트도 필수적입니다.

## ValueNotifier 와 ValueListenableBuilder

다음 도전 과제는 FirstPage가 카운터의 업데이트를 알지 못하는 문제를 해결하는 것입니다. 이를 해결하기 위해 ValueNotifier와 ValueListenableBuilder가 있습니다.

ValueNotifier는 값을 보존하는 업데이트를 알리고, ValueListenableBuilder는 ValueNotifier의 알림을 수신하고 setState를 호출하는 위젯입니다.

<div class="content-ad"></div>

먼저, ValueNotifier를 확장한 클래스인 Counter로 카운터 변수를 업데이트합니다.

```dart
final counter = Counter();

class Counter extends ValueNotifier<int> {
  Counter() : super(0);

  void increment() => value++;
}
```

위와 같이 increment 메서드를 노출시켜 값을 증가시킬 수 있도록 하였습니다. 값을 위젯에서 직접적으로 업데이트할 수 없기 때문에 이렇게 구현하였습니다.

다음으로는 FirstPage의 Text를 ValueListenableBuilder로 감싸줍니다.

<div class="content-ad"></div>

```js
child: ValueListenableBuilder(
  valueListenable: counter,
  builder: (context, value, child) {
    return Text(value.toString());
  },
),
```

마침내, FirstPage와 SecondPage 간에 counter를 완벽하게 공유할 수 있게 되었습니다. 전체 변경 사항은 여기에서 확인하고 아래 데모를 확인해보세요.

![데모](https://miro.medium.com/v2/resize:fit:1400/1*eUrPqJBGwB84DRtOKNqA4w.gif)

# 여러 상태 결합하기

<div class="content-ad"></div>

그럼 이제 모든 문제를 해결했나요? 여전히 아니에요, 물론이죠.

다음 문제는 여러 상태를 결합하는 문제입니다. 우리는 MultipliedCounter가 카운터 값의 두 배를 노출하도록 하고 싶어요. 이제 위젯 외부의 Counter의 알림을 ValueListenableBuilder 없이 잡을 방법을 고안해야 해요.

다음은 다른 ValueNotifier의 업데이트를 듣기 위한 트릭입니다.

```js
final multipleCounter = MultipliedCounter(counter);

class MultipliedCounter extends ValueNotifier<int> {
  MultipliedCounter(Counter counter) : super(0) {
    counter.addListener(() {
      multiply(counter.value);
    });
  }

  void multiply(int base) => value = base * 2;
}
```

<div class="content-ad"></div>

MultipliedCounter가 해야 할 작업은 Counter에 리스너를 추가하는 것이기 때문에, 생성자를 통해 Counter 객체를 받아와서 addListener를 호출하고, multiply 메소드를 호출하는 함수를 전달해야 합니다. 이 트릭을 사용하면 MultipliedCounter가 Counter의 업데이트를 받아들이고, 기본값 \* 2로 값을 업데이트할 수 있습니다.

다음은 FirstPage에서 multipliedCounter를 사용하는 예시입니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*E_Q3KHZgdkS4xS2l2gL3Hw.gif)

전체 코드는 여기에서 확인할 수 있습니다.

<div class="content-ad"></div>

# State 해제

아직 해결되지 않은 많은 문제가 있습니다. 하나는 상태(State)를 어떻게 처리할 지에 대한 문제입니다.

일반적으로, 우리는 더 이상 필요하지 않을 때 상태(State)를 해제해야 합니다. 그러나 우리의 counter나 multipliedCounter는 앱이 살아있는 한 계속 유지되는 전역 변수로 정의되어 있기 때문에 자동으로 해제되지 않습니다.

만약 사용하지 않을 때 이들이 해제되기를 바란다면, 우리는 어떤 메서드를 호출하여 수동으로 해제해주어야 합니다.

<div class="content-ad"></div>

우리는 이 경우에 counter에 새로운 객체를 할당하는 것이 완전히 무관하다는 것을 인식해야 합니다.

```js
// disposing용으로 이것을 하지 마세요
counter = Counter();
```

곱해진 카운터(multipliedCounter)나 ValueListenableBuilder가 이미 기존의 Counter 객체를 참조하고 있기 때문에 counter 변수에 새 Counter 객체를 할당하더라도 자동으로 참조가 변경되지 않는다는 점을 명심해야 합니다.

그러면, 언제 initialize 메서드를 제공하고(dispose는 이미 ValueNotifier에서 정의되어 있습니다) \_SecondPageState의 dispose 내에서와 같은 적절한 시점에 이 메서드를 호출하는 것은 어떨까요?

<div class="content-ad"></div>

```js
class Counter extends ValueNotifier<int> {
  Counter() : super(0);

  void increment() => value++;

  void initialize() => value = 0; // 초기화하는 메서드를 제공합니다.
}
```

```js
@override
void dispose() {
  counter.initialize();
  super.dispose();
}
```

그런데 여기서 initialize를 호출해도 안전한 걸까요? 우리는 multipliedCounter도 counter를 듣고 있다는 것을 기억해야 합니다. \_SecondPageState는 그 사실을 알지 못하며 그 반대도 마찬가지입니다. 다시 말해, 아무도 "counter는 더 이상 아무도 사용하지 않는다"는 사실을 인지하지 못합니다.

그래서 먼저 counter를 듣고 있는 사람들을 관리하는 메커니즘을 구축해야 합니다. 그러나 이를 어떻게 해야 할까요?

<div class="content-ad"></div>

이 문제는 꽤 어려운 문제이며, 이 기사에서는 답변하지 않습니다.

# 테스트

마지막으로 남은 문제는 테스트입니다.

위젯 테스트로 SecondPage를 테스트하려고 하면 작동하지 않음을 빨리 발견할 것입니다.

<div class="content-ad"></div>

```js
void main() {
  testWidgets('SecondPage shows 0 first and 1 after tapping button', (widgetTester) async {
    await widgetTester.pumpWidget(const MaterialApp(home: SecondPage()));
    expect(find.text('0'), findsOneWidget);

    final incrementButton = find.byIcon(Icons.add);
    await widgetTester.tap(incrementButton);
    await widgetTester.pumpAndSettle();

    expect(find.text('1'), findsOneWidget);
  });
}
```

간단한 위젯 테스트를 살펴보면, 모든 테스트를 통과하는 것으로 보이며 실제로도 통과하는 것 같습니다.

```js
$ flutter test test/second_page_test.dart
00:00 +0: loading /path/to/global_variable_counter/test/second_page_test.dart
00:01 +0: SecondPage
00:01 +1: SecondPage
00:01 +1: All tests passed!
```

그러나 아래와 같이 다른 testWidgets를 추가하면,```

<div class="content-ad"></div>

```js
void main() {
  testWidgets('SecondPage에서 버튼을 탭한 후 0이 나타나고 1이 나타납니다',
      (widgetTester) async {
    await widgetTester.pumpWidget(const MaterialApp(home: SecondPage()));
    expect(find.text('0'), findsOneWidget);

    final incrementButton = find.byIcon(Icons.add);
    await widgetTester.tap(incrementButton);
    await widgetTester.pumpAndSettle();

    expect(find.text('1'), findsOneWidget);
  });

  testWidgets('SecondPage에서 버튼을 탭한 후 0이 나타나고 1이 나타납니다',
      (widgetTester) async {
    await widgetTester.pumpWidget(const MaterialApp(home: SecondPage()));
    expect(find.text('0'), findsOneWidget);

    final incrementButton = find.byIcon(Icons.add);
    await widgetTester.tap(incrementButton);
    await widgetTester.pumpAndSettle();

    expect(find.text('1'), findsOneWidget);
  });
}
```

아래 테스트 실패 내용이 표시됩니다.

```js
══╡ EXCEPTION CAUGHT BY FLUTTER TEST FRAMEWORK ╞════════════════════════════════════════════════════
다음과 같은 TestFailure가 테스트 실행 중에 발생했습니다:
예상값: 위젯 트리에 정확히 일치하는 노드 하나
  실제값: _TextFinder:<zero widgets with text "0" (ignoring offstage widgets)>
  의미: 찾은 것이 없지만 하나가 예상되었습니다

예외가 발생했을 때 스택은 다음과 같습니다:

...
```

이는 global 변수가 main()에서 계속 유지되어 각 테스트에서 동일한 객체가 공유된다는 이유입니다. 따라서 각 testWidget 이전에 모든 상태를 초기화해주어야 합니다.```

<div class="content-ad"></div>

# 결론

지금까지 글로벌 변수를 상태 관리 전략으로 사용하여 카운터 앱을 만들어 보았습니다. 상태 초기화, 업데이트, 감시 및 해제에 관한 많은 문제를 발견했습니다. 게다가 글로벌 변수로 인해 위젯 테스트가 어려워졌습니다.

이러한 문제를 하나씩 해결하려는 사람들은 없다고 생각합니다. 이러한 문제들을 해결해 주는 Riverpod, BLoC, GetX 등의 상태 관리 패키지가 있어야 합니다.

이러한 패키지들이 이 글에서 논의된 문제에 대한 해결책을 제공하기 때문에, 우리는 그러한 문제와 싸우느라 시간을 낭비할 필요가 없습니다. 해야 할 일은 어떤 종류의 상태 관리 문제가 존재하며, 이러한 문제를 어떻게 패키지를 사용하여 적절히 해결할 수 있는지 이해하는 것입니다.

<div class="content-ad"></div>

이 글을 읽어 주셔서 감사합니다. 각 상태 관리 패키지가 어떤 문제를 다루는지에 대해 더 작성하고 싶습니다. 이를 통해 프로젝트와 사용에 가장 적합한 상태 관리 패키지를 찾을 수 있을 것입니다.
