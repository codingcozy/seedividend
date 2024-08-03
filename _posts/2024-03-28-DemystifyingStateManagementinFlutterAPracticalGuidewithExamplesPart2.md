---
title: "플러터에서의 상태 관리 실제 예제로 알아보는 실용적 가이드 파트 2"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Demystifying State Management in Flutter A Practical Guide with Examples Part 2"
link: "https://medium.com/@mahmoudsaeed395.395/demystifying-state-management-in-flutter-a-practical-guide-with-examples-part-2-a3720ddeeff8"
---



InheritedWidget 및 Provider: InheritedWidget은 위젯 트리 전체에서 상태를 공유하는 내장 메커니즘입니다. 이를 통해 prop drilling이 필요하지 않고 효율적으로 데이터를 전달할 수 있습니다. 그러나 InheritedWidget을 직접 사용하면 장황하고 복잡할 수 있습니다. Provider 패키지는 InheritedWidget을 내부적으로 사용하여 상태를 관리하고 소비하는 데 대한 고수준 API를 제공하여이 프로세스를 단순화합니다.

이제 Provider 패키지를 사용하여 여러 위젯 간에 계수 상태를 공유하는 카운터 앱을 확장해 보겠습니다:

먼저 ChangeNotifier를 확장하는 Counter 클래스를 만듭니다.

```js
class Counter with ChangeNotifier {
  int _count = 0;

  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}
```

<div class="content-ad"></div>

notifyListeners() 메서드는 앱 내의 리스너를 다시 빌드하기 때문에 중요합니다.

둘째로, ChangeNotifierProvider로 앱을 감싸고 이 경우에는 Counter를 생성된 프로바이더로 전달하세요.

```js
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => Counter(),
      child: CounterApp(),
    ),
  );
}

class CounterApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Counter App with Provider'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                'Counter:',
              ),
              Consumer<Counter>(
                builder: (context, counter, child) {
                  return Text(
                    '${counter.count}',
                    style: Theme.of(context).textTheme.headline4,
                  );
                },
              ),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Provider.of<Counter>(context, listen: false).increment();
          },
          tooltip: 'Increment',
          child: Icon(Icons.add),
        ),
      ),
    );
  }
}
```
