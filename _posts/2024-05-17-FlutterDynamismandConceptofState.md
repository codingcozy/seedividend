---
title: "플러터 동적성과 상태 개념"
description: ""
coverImage: "/assets/img/2024-05-17-FlutterDynamismandConceptofState_0.png"
date: 2024-05-17 21:38
ogImage:
  url: /assets/img/2024-05-17-FlutterDynamismandConceptofState_0.png
tag: Tech
originalTitle: "Flutter: Dynamism and Concept of State"
link: "https://medium.com/devtechie/flutter-dynamism-and-concept-of-state-a6d8da4cdcd8"
---

<img src="/assets/img/2024-05-17-FlutterDynamismandConceptofState_0.png" />

이 기사는 플러터(Flutter)에서 상태와 상태 관리의 개념에 대해 다룹니다.

# 상태(State)

기억해 보면, 객체 지향 프로그래밍 패러다임에서 객체는 상태를 가지고 있습니다. 객체의 상태는 응용 프로그램 실행 중 특정 시간에 해당 객체의 속성(속성, 즉, 변수) 값 집합입니다. 따라서 객체의 상태는 속성 값 중 하나가 변경될 때 변화합니다. 따라서 상태는 객체에 대한 정보를 전달하는 것입니다. 객체의 수명 동안 상태는 사용자 인터페이스를 통해 해당 객체와 상호 작용하거나 응용 프로그램의 다른 객체들과 상호 작용함으로 인해 변경될 수 있습니다.

<div class="content-ad"></div>

여기서 물어볼 수 있습니다. 왜 Flutter 기사에서 객체 지향 프로그래밍과 객체에 대해 이야기하는 걸까요? 현재 모든 프레임워크는 객체지향 프로그래밍 패러다임에만 근거하거나 함수형 프로그래밍 패러다임과 결합한 상태로 구성되어 있습니다. 지금은 프로그래밍 패러다임에 대해 자세히 논의하지 않겠습니다. 간단히 말하자면, 모든 위젯은 클래스를 통해 정의됩니다. 따라서 Flutter 앱이 실행 중일 때 위젯은 객체입니다. 이렇기 때문에 앱이 상태를 유지하고 싶다면 객체만이 가능합니다. 이는 반응형(동적) 어플리케이션을 구현하는 데 필수적입니다. React.js도 반응형 어플리케이션 개발을 위해 상태(state) 개념을 사용합니다. 그래서 React.js가 반응형 프레임워크로 알려져 있습니다. Flutter 또한 반응형 프레임워크이므로 상태(state) 개념을 채택하고 있습니다.

그렇다면 위젯의 상태란 무엇일까요? 상태란 앱을 생성하고 수정하며 실행하는 동안 위젯에 포함된 정보의 집합입니다(위젯 내에서 변수, 객체 값 등). 위젯의 구조를 업데이트하거나 변경하려면 해당 정보를 업데이트해야 합니다. 즉, 그 위젯의 상태를 업데이트해야 합니다. 예를 들어, 버튼(위젯)을 클릭했을 때 해당 색상이 변경되기를 원한다면요.

따라서 위젯의 상태는 위젯이 생성(초기화)될 때 읽어들일 수 있는 정보이며, 앱의 수명 주기 동안 변경될 수 있습니다. 객체는 다른 객체와 상호작용하거나 사용자 입력에 응답하여 상태를 변경합니다. Flutter는 위젯의 상태 변화를 반영하기 위해 setState() 메서드를 사용합니다. Flutter는 setState() 메서드를 사용하여 객체의 내부 상태가 변경되었음을 프레임워크에 알리고, 상태의 최신 변화에 따라 사용자 인터페이스를 업데이트(새로 고침)합니다.

상태와 그 중요성에 대해 이야기했지만, 어플리케이션이 위젯의 상태를 유지할 필요가 없을 수도 있습니다. Flutter는 이를 허용합니다. 따라서 Flutter 위젯은 두 가지 클래스로 그룹화할 수 있습니다. Stateless 위젯과 Stateful 위젯입니다. Flutter는 이를 가능하게 하기 위해 두 내부 원시 위젯(StatelessWidget 및 StatefulWidget)을 가지고 있습니다. Flutter에서 모든 위젯은 StatelessWidget 또는 StatefulWidget에서 파생될 수 있으며, 각각의 파생된 위젯은 각각 stateless 위젯 또는 stateful 위젯이라고 부릅니다. 상태와 상태 관리 개념은 상호작용적인 어플리케이션을 구축하기 위한 매우 중요한 절차입니다.

<div class="content-ad"></div>

상태 관리는 플러터 프레임워크의 중요하고 필수적인 개념입니다. stateless 위젯은 내부 상태가 없습니다. 한 번 빌드된 후에는 초기화될 때까지 변경하거나 수정할 수 없습니다. 반면에 stateful 위젯은 동적이며 상태를 갖고 있습니다. 따라서 라이프사이클 동안 쉽게 수정할 수 있습니다. setState() 메서드는 화면의 UI를 redraw합니다. setState() 메서드는 상태 객체의 속성을 설정하여 해당 객체(위젯)의 상태 변경으로 이어질 수 있습니다.

상태 유지가 필요한 모든 위젯은 widget (클래스) StatefulWidget에서 파생되어야 합니다. StatefulWidget 클래스로부터 파생된 stateful 위젯(즉, StatefulWidget 클래스로부터 파생된 위젯)은 상태가 변경될 때마다 화면 자동으로 다시 렌더링됩니다. 플러터 프레임워크는 이전과 새로운 UI의 차이를 감지하고 필요한 변경 사항만 렌더링함으로써 다시 렌더링 프로세스를 최적화합니다. 따라서 상태와 상태 관리 개념은 단일 위젯의 상태가 변경될 때마다 전체 애플리케이션을 다시 렌더링하는 것을 피할 수 있도록 도와줍니다.

상태 관리는 애플리케이션 라이프사이클에서 가장 인기 있는 필수적인 프로세스 중 하나입니다. 앱의 현재 상태는 앱의 모든 위젯 개별 상태의 집합으로 정의됩니다. 앱 상태는 화면에 있는 앱의 UI를 제어합니다. 아래 그림에서 그겨서 표현됩니다.

![img](/assets/img/2024-05-17-FlutterDynamismandConceptofState_1.png)

<div class="content-ad"></div>

상태 및 상태 관리 개념은 예를 통해 더 잘 이해할 수 있어요. 예를 들어, 제품 목록을 선택해야 하는 앱을 개발 중이라고 상상해봅시다. 제품을 선택하는 과정은 하나씩 제품을 추가해야 합니다. 고객의 선택 목록에 제품이 추가될 때마다 목록 상태가 변경되고, 이로 인해 목록 갱신 작업이 자동으로 트리거됩니다. 상태 관리가 없는 경우, 목록의 갱신은 사용자가 수동으로 트리거해야 합니다. 예를 들어 동일한 화면을 다시 방문하는 방식으로 갱신할 수 있습니다. 그래서 앱의 동적 대화식 동작은 상태와 상태 관리의 도움으로 구현할 수 있어요. 이러한 앱을 동적 또는 반응형 앱이라고 부릅니다.

# 상태 관리

이 글을 읽으셨다면, 여기서 상태와 상태 관리의 차이가 무엇인지 궁금해하실 수 있어요. 위젯(객체)에 포함된 정보는 상태입니다. 즉, 각 속성(속성 - 변수)의 값 집합입니다. 상태를 만들거나 변경하고, 상태 변경을 모니터링하거나, 상태 변경 이벤트에 응답하기 위해 필요한 모든 작업(또는 작업)은 상태 관리라고 합니다. 예를 들어, 상태 변경 이벤트에 응답하여 화면 상의 위젯 뷰를 갱신/업데이트하기 위해 함수를 호출하는 것이 상태 관리의 한 예시입니다.

Flutter 애플리케이션은 위젯으로 구성되며, 상태 관리도 위젯의 도움으로 이루어집니다.

<div class="content-ad"></div>

이전에 논의했던 대로, 위젯은 StatefulWidget으로부터 상속을 받아 상태와 해당 자식들의 상태를 유지할 수 있습니다. StatefulWidget은 Flutter에서 상태와 상태 관리로의 문을 열어줍니다. StatefulWidget은 다음과 같은 방법들을 제공합니다: (1) 상태 생성 및 (2) 상속 위젯의 상태 업데이트(변경).

Stateful 위젯은 상속된 위젯의 상태를 생성하기 위해 createState() 메서드를 호출하고, 상속된 위젯의 상태 변경을 setState() 메서드를 통해 용이하게 합니다. createState() 메서드는 상속된 위젯이 처음 생성될 때 실행되고, setState() 메서드는 상속된 위젯의 상태가 변경될 때마다 실행됩니다. 상태 변경은 setState() 메서드에 의해 이루어집니다. 예를 들어, 제품의 평가를 변경하려면 평가 위젯에서 별을 탭하는 방식으로 이루어질 수 있습니다.

특정 상태가 응용 프로그램에서 지속되는 기간에 따라, Flutter는 상태 관리를 다음 두 가지 유형으로 분류합니다:

- Ephemeral 상태
- App 상태

<div class="content-ad"></div>

# 단명한 상태

단명한 상태는 몇 초 동안 지속되는 상태를 가리킵니다. 예를 들어, 현재 애니메이션의 상태와 같은 것입니다. 이는 특정 위젯과 관련된 상태 유형이며, 단명한 상태는 하나의 위젯에 대한 상태이기도 합니다. 따라서 단명한 상태는 로컬에서 필요한 상태 정보입니다. 그래서 단명한 상태는 로컬 상태로도 알려져 있습니다. 또한 단명한 상태는 UI 상태로도 알려져 있습니다. 이 상태의 일반적인 예는 Text 위젯입니다. 또 다른 예는 앱의 페이지 뷰입니다.

단명한 상태는 하나의 위젯에 포함(배치)될 수 있는 상태입니다. 그러나 해당 단일 위젯은 상태 정보를 유지하기 위해 클래스로부터 파생되어야 합니다 (클래스는 객체지향 용어에서 위젯을 가리킵니다). 즉, 상태 변수가 상태 위젯 내에서 선언될 때 단명한 상태로 알려집니다. 다른 페이지, 화면 및 뷰에서는 이 상태에 액세스할 필요가 없습니다.

단명한 상태는 제3자 상태 관리 기술이 필요하지 않습니다. 이는 하나의 위젯에서 관리 가능한 상태입니다. 이는 단명한 상태를 유지하는 데 setState() 메서드만 필요하다는 것을 의미합니다.

<div class="content-ad"></div>

아래 프로그램은 상태를 생성하는 stateful 위젯을 보여주는 예제입니다.

```js
import "package:flutter/material.dart";
```

```js
void main() {
  runApp(const MyApp());
}
class MyApp extends StatelessWidget {
  const MyApp({super.key});
  // 이 위젯은 앱의 루트(위젯 트리)입니다.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      // 간소화를 위해 MaterialApp의 다른 속성은 여기에서 사용되지 않습니다.
      home: MyStatefulWidget()
    );
  }
}
class MyStatefulWidget extends StatefulWidget {
  const MyStatefulWidget({Key? key}) : super(key: key);
  @override
  State<MyStatefulWidget> createState() => _MyStatefulWidgetState();
}
class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  String stateInfo = "Sleeping";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Stateful widget'),
      ),
      body: ElevatedButton(
          child: Text(stateInfo),
          onPressed: () {
            setState(() {
              stateInfo = "Awaken";
            });
          }),
    );
  }
}
```

위 프로그램에서 변수 stateInfo는 일시적인 상태를 나타냅니다. setState() 메서드는 MyStatefulWidget이라는 stateful 위젯의 상태를 다시 렌더링하는 역할을 합니다.

<div class="content-ad"></div>

사용자가 단추(위젯 ElevatedButton)를 클릭할 때 setState() 메소드가 호출됩니다. 이 버튼은 처음에 변수 stateInfo의 초기 값인 "sleeeping"을 캡션으로 가지고 있습니다. setState()의 실행은 stateInfo의 값을 수정합니다.

텍스트 위젯은 앱 바의 제목과 버튼 캡션을 표시하는 데 사용됩니다.

이 메소드가 실행되면 위젯의 상태가 업데이트된 값 "Awaken"을 변수 stateInfo의 새 값을 표시하는 새로운 상태로 대체되어 버튼의 캡션으로 표시됩니다.

아래 이미지에서 출력이 표시됩니다. (가시성을 높이기 위해 에뮬레이터 창이 확대되었습니다)

<div class="content-ad"></div>

위 앱에서는 내장 위젯 StatefulWidget을 확장하고 createState() 메서드를 오버라이드하여 MyStatefulWidget이라는 상태 보존 위젯이 생성됩니다. StatefulWidget 클래스의 createState() 메서드는 위젯 MyStatefulWidget의 가변 상태를 생성하는 역할을 합니다. 가변 상태를 생성하기 위해 createState() 메서드는 State 클래스로부터 파생된 다른 클래스의 객체를 필요로 합니다. 위 예제 프로그램에서는 \_MyStatefulWidgetState를 createState() 메서드에 전달했습니다. 실제 상태 정보는 State 클래스인 \_MyStatefulWidgetState에서 유지됩니다. 이것이 왜 변수 stateInfo가 \_MyStatefulWidgetState에 선언되는지에 대한 이유입니다.

setState() 메서드 내에서 setInfo 변수(위젯의 상태)가 수정되지만 setInfo 변수(위젯의 상태)는 setState() 외부에서도 수정될 수 있습니다. 실제로 \_MyStatefulWidgetState 내부 어디에서든지 수정할 수 있습니다. 아래 업데이트된 프로그램이 이 사실을 보여줍니다.

```js
import "package:flutter/material.dart";
```

<div class="content-ad"></div>

```js
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // 이 위젯은 이 앱의 뿌리(위젯 트리)입니다.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
        // 간소화를 위해 MaterialApp의 다른 속성은 여기서 사용되지 않음
        home: MyStatefulWidget());
  }
}

class MyStatefulWidget extends StatefulWidget {
  const MyStatefulWidget({Key? key}) : super(key: key);

  @override
  State<MyStatefulWidget> createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  String stateInfo = "Sleeping";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Stateful widget'),
      ),
      body: ElevatedButton(
          child: Text(stateInfo),
          onPressed: () {
            stateInfo = "Awaken";  // 이전 프로그램과 다른 부분은 여기에 있습니다.
            setState(() {});
          }),
    );
  }
}
```

위 프로그램과 이전 프로그램간의 차이점은 stateInfo="Awaken" 문이 setState() 메소드 바깥으로 이동한 것입니다.

아래 이미지에서 확인할 수 있듯, 프로그램의 출력 결과가 변경되지 않았습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*g3h8jKupmu3SVn2XH2gSRw.gif)

<div class="content-ad"></div>

```js
import "package:flutter/material.dart";
```

```js
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // 이 위젯이 앱의 루트(위젯 트리) 역할을 합니다.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
        // 다른 MaterialApp 속성들은 여기서 간단히 사용되지 않았습니다.
        home: MyStatefulWidget());
  }
}

class MyStatefulWidget extends StatefulWidget {
  const MyStatefulWidget({Key? key}) : super(key: key);

  @override
  State<MyStatefulWidget> createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  String stateInfo = "Sleeping";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Stateful widget'),
      ),
      body: ElevatedButton(
          child: Text(stateInfo),
          onPressed: () {
            stateInfo = "Awaken";
            // setState(() {}); // setState() 호출 금지를 위해 주석 처리
          }),
    );
  }
}
```

위 코드의 출력은 아래 이미지에서 확인할 수 있습니다.

![image](https://miro.medium.com/v2/resize:fit:1028/1*iaVpA4GAfn6J7Ej966TsLQ.gif)

<div class="content-ad"></div>

위의 이미지에서 알 수 있듯이, 수면 버튼을 여러 번 클릭해도 버튼의 캡션이 "깨어나"로 변경되지 않았습니다. 이 동작의 이유는 setState() 메서드가 호출되지 않았기 때문에 변수 stateInfo의 값은 업데이트되지만 위젯(MyApp)의 업데이트(다시 렌더링)가 트리거되지 않았기 때문입니다.

# 앱 상태

일회성 상태와 달리, 앱 상태는 한 앱의 서로 다른 화면(페이지) 간에 공유되는 상태이거나 상태가 다른 사용자 세션 간에 액세스 가능해야합니다. 따라서 앱 상태는 전역적으로 사용할 수있는 상태 정보입니다. 이는 애플리케이션 상태 또는 공유된 상태라고도합니다. 사용자 환경 설정, 로그인 정보, 쇼핑 카트 정보, 최근 이커머스 앱에서 방문한 항목, 앱 알림 등이 앱 상태의 몇 가지 예입니다. 플러터에서는 앱 상태를 관리하기 위해 써드파티 패키지가 필요합니다. 어떤 패키지가 필요한지는 응용프로그램의 복잡성에 따라 다릅니다.

다음 다이어그램은 일회성 상태와 앱 상태의 차이를 설명합니다.

<div class="content-ad"></div>

![Flutter Dynamic and Concept of State](/assets/img/2024-05-17-FlutterDynamismandConceptofState_2.png)

# 요약

이 기사는 일시적 상태와 앱 상태의 차이점에 대해 이야기했습니다. 일시적 상태는 단일 위젯에 특정하며 해당 위젯을 StatefulWidget에서 상속하고 createState() 메서드를 재정의하여 관리합니다. createState() 메서드는 State 클래스로부터 파생된 클래스의 인스턴스를 가져오는데 사용됩니다. State 클래스로부터 파생된 클래스는 실제 상태 정보를 유지하고 업데이트하며 화면에 상태를 다시 렌더링하기 위해 setState() 메서드를 사용합니다. 따라서 위젯은 StatefulWidget로부터 상속받아야 하며 상태 정보를 나타내기 위해 Flutter의 State 클래스도 사용해야 합니다.

앱 상태는 본 기사의 범위를 벗어나는 서드파티 패키지가 필요합니다.
