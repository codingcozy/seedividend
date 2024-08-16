---
title: "Flutter 초보자를 위한 테스트 및 디버깅 가이드"
description: ""
coverImage: "/assets/img/2024-07-01-FlutterTestingandDebuggingABeginnersGuide_0.png"
date: 2024-07-01 17:08
ogImage: 
  url: /assets/img/2024-07-01-FlutterTestingandDebuggingABeginnersGuide_0.png
tag: Tech
originalTitle: "Flutter: Testing and Debugging (A Beginner’s Guide)"
link: "https://medium.com/@cloderaldo/flutter-testing-and-debugging-a-beginners-guide-1178aa0a5dbc"
isUpdated: true
---




소프트웨어 개발에서 테스트와 디버깅은 중요한 구성 요소입니다. 이들을 통해 애플리케이션이 의도한 대로 작동하고 사용자에게 원활한 경험을 제공할 수 있습니다. 이 블로그에서는 플러터(Flutter)에서의 유닛 테스트, 통합 테스트 및 위젯 테스트에 대해 탐구할 것입니다. 만약 플러터에서의 테스트가 처음이라면, 이 안내서가 처음 시작하는 데 도움이 될 것입니다.

![Flutter Testing and Debugging](/assets/img/2024-07-01-FlutterTestingandDebuggingABeginnersGuide_0.png)

## 왜 테스트가 중요한가요?

구체적인 내용에 대해 들어가기 전에, 테스트가 왜 중요한지 이해하는 것이 중요합니다.

<div class="content-ad"></div>

- 품질 보증: 테스트는 앱이 올바르게 작동하는지 확인하는 데 도움이 됩니다.
- 초기 버그 검출: 개발 초기에 버그를 찾아 고치면 시간과 노력을 절약할 수 있습니다.
- 코드 안정성: 테스트를 거친 코드는 새로운 기능이 추가될 때 덜 고장날 가능성이 높습니다.
- 문서화: 테스트는 코드의 다른 부분이 어떻게 작동해야 하는지 설명하는 문서로써의 역할을 할 수 있습니다.

## 플루터의 테스트 유형

플루터는 세 가지 주요 테스트 유형을 지원합니다:

- 단위 테스트: 단일 함수, 메서드 또는 클래스를 테스트합니다.
- 위젯 테스트: UI 구성 요소를 테스트합니다.
- 통합 테스트: 전체 앱 또는 앱의 큰 부분을 테스트합니다.

<div class="content-ad"></div>

# 플러터에서의 유닛 테스트

유닛 테스트는 가장 간단한 형태의 테스트입니다. 개별 함수나 메서드에 집중하여 예상한 출력을 생성하는지 확인합니다.

## 유닛 테스트 설정

먼저, pubspec.yaml 파일에 test 패키지를 추가하세요:

<div class="content-ad"></div>

```js
dev_dependencies:
  flutter_test:
    sdk: flutter
  test: ^1.16.0
```

프로젝트 루트에 테스트 디렉토리를 만들어 보세요. 만약 해당 디렉토리가 없다면 새로 생성해주세요. 이 디렉토리 안에 테스트를 위한 새 파일을 만들어 보세요. 예를 들어, `calculator_test.dart`와 같이 만들 수 있습니다.

## 단위 테스트 작성하기

간단한 덧셈 메소드를 가진 계산기 클래스가 있다고 가정해봅시다:


<div class="content-ad"></div>


```js
class Calculator {
  int add(int a, int b) {
    return a + b;
  }
}
```

이제, 이 메소드에 대한 단위 테스트를 작성해 봅시다:

```js
import 'package:test/test.dart';
import 'package:my_app/calculator.dart';

void main() {
  group('Calculator', () {
    test('두 수를 더하기', () {
      final calculator = Calculator();
      expect(calculator.add(2, 3), 5);
    });
  });
}
```

이 테스트에서는:


<div class="content-ad"></div>

- 테스트 패키지 및 Calculator 클래스를 가져옵니다.
- Calculator를 위한 테스트 그룹을 정의합니다.
- add 메서드가 올바른 합계를 반환하는지 확인하는 테스트를 작성합니다.

## 단위 테스트 실행

다음 명령을 사용하여 단위 테스트를 실행할 수 있습니다:

```js
flutter test
```

<div class="content-ad"></div>

# 위젯 테스트 작성

위젯 테스트(또는 컴포넌트 테스트)는 개별 위젯을 테스트합니다. 이를 통해 위젯의 UI가 예상대로 보이고 작동하는지 확인할 수 있습니다.

## 위젯 테스트 설정하기

Flutter에는 기본적으로 flutter_test 패키지가 포함되어 있으므로 수동으로 추가할 필요가 없습니다.

<div class="content-ad"></div>

## 위젯 테스트 작성

간단한 카운터 앱을 위한 위젯 테스트를 작성해 봅시다:

```js
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/main.dart';

void main() {
  testWidgets('카운터 증가 스모크 테스트', (WidgetTester tester) async {
    await tester.pumpWidget(MyApp());

    // 카운터가 0에서 시작하는지 확인합니다.
    expect(find.text('0'), findsOneWidget);
    expect(find.text('1'), findsNothing);

    // '+' 아이콘을 탭하고 프레임을 트리거합니다.
    await tester.tap(find.byIcon(Icons.add));
    await tester.pump();

    // 카운터가 증가했는지 확인합니다.
    expect(find.text('0'), findsNothing);
    expect(find.text('1'), findsOneWidget);
  });
}
```

이 테스트에서는:  

<div class="content-ad"></div>

- 필요한 패키지를 import하세요.
- 카운터의 초기 상태를 확인하는 테스트를 작성하세요.
- '+' 아이콘을 탭하는 것을 모의로 시뮬레이트하세요.
- 카운터가 올바르게 증가하는지 확인하세요.

## 위젯 테스트 실행하기

동일한 명령어인 유닛 테스트를 사용하여 위젯 테스트를 실행할 수 있습니다:

```js
flutter test
```

<div class="content-ad"></div>

# 통합 테스트 작성하기

통합 테스트는 앱의 모든 위젯과 서비스가 정확히 함께 작동하는지를 보장합니다. 이 테스트는 완전한 앱이나 그 중요한 부분을 테스트합니다.

## 통합 테스트 설정하기

pubspec.yaml 파일에 integration_test 패키지를 추가하세요:

<div class="content-ad"></div>

요청하신 내용은 다음과 같습니다.

```yaml
dev_dependencies:
  integration_test:
    sdk: flutter
  flutter_test:
    sdk: flutter
```

프로젝트 루트에 test_driver 디렉토리를 만드세요. 해당 디렉토리 안에 app_test.dart와 같은 새 파일을 생성하세요.

## 통합 테스트 작성

동일한 카운터 앱을 대상으로 통합 테스트를 작성해봅시다.

<div class="content-ad"></div>

```js
import 'package:integration_test/integration_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/main.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('Counter increments smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(MyApp());

    // Verify that the counter starts at 0.
    expect(find.text('0'), findsOneWidget);
    expect(find.text('1'), findsNothing);

    // Tap the '+' icon and trigger a frame.
    await tester.tap(find.byIcon(Icons.add));
    await tester.pump();

    // Verify that the counter has incremented.
    expect(find.text('0'), findsNothing);
    expect(find.text('1'), findsOneWidget);
  });
}
```

이 테스트에서는 위젯 테스트와 유사한 단계를 따르지만, 이번에는 통합 테스트로 실행됩니다.

## 통합 테스트 실행하기

새 파일 test_driver/integration_test.dart를 생성하세요.

<div class="content-ad"></div>

```js
import 'package:integration_test/integration_test_driver.dart';

Future<void> main() => integrationDriver();
```

아래 명령어를 사용하여 통합 테스트를 실행하세요:

```bash
flutter drive --driver=test_driver/integration_test.dart --target=test_driver/app_test.dart
```

# 결론


<div class="content-ad"></div>

플러터 개발자에게는 테스트와 디버깅이 필수적인 기술입니다. 단위 테스트, 위젯 테스트, 통합 테스트를 작성함으로써 앱이 의도한 대로 작동하고 사용자에게 뛰어난 경험을 제공할 수 있습니다. 테스트를 통해 더 많은 경험을 쌓으면 코드베이스를 유지하고 확장하기가 더 쉬워질 것입니다.

즐거운 테스트하세요!