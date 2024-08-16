---
title: "Flutter에서 스크롤, 그리드 만드는 방법Listviewbuilder"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Listviewbuilder in Flutter"
link: "https://medium.com/@flutterdynasty/listview-builder-in-flutter-e54a8fa2c7a0"
isUpdated: true
---





ListView.builder는 효율적으로 스크롤 가능한 목록이나 그리드를 만드는 데 사용되는 강력한 Flutter 위젯입니다. 사용자가 스크롤 할 때 필요에 따라 항목을 생성하여 메모리 사용량을 줄이고 성능을 향상시킬 수 있어 많은 수의 항목을 처리할 때 특히 유용합니다. 여기에 주요 구성 요소에 대한 설명이 있습니다:

- itemCount: 이 속성은 목록의 항목 수를 정의합니다. itemBuilder 함수가 호출될 횟수를 지정합니다.
- itemBuilder: 이 콜백 함수는 목록의 각 항목에 대해 호출됩니다. 두 인수를 사용합니다: BuildContext 및 int index. 주어진 인덱스의 항목에 대한 위젯을 반환하는 것은 사용자의 책임입니다.
- shrinkWrap: true로 설정하면 ListView는 자식을 표시하는 데 필요한만큼의 수직 공간만 차지합니다. ListView가 다른 스크롤 가능한 위젯 내에 배치된 경우 유용할 수 있습니다.
- physics: 스크롤 동작을 정의합니다. 원하는 스크롤 방식에 따라 BouncingScrollPhysics, ClampingScrollPhysics 등 다양한 옵션을 선택할 수 있습니다.
- scrollDirection : 목록이 스크롤할 방향을 지정합니다. 수직 목록의 경우 Axis.vertical(기본값) 또는 수평 목록의 경우 Axis.horizontal일 수 있습니다.

```js
ListView.builder(
  itemCount: items.length,
  itemBuilder: (BuildContext context, int index) {
    return ListTile(
      title: Text(items[index]),
    );
  },
)
```

ListView.builder는 일반적으로 다음 시나리오에서 사용됩니다:

<div class="content-ad"></div>

- 동적 데이터 표시: 메시지, 연락처 또는 API에서 가져온 제품 목록과 같이 크기가 변경될 수 있는 항목 목록이 있는 경우, ListView.builder를 사용하면 각 항목에 대한 UI 요소를 동적으로 생성할 수 있습니다.
- 성능 최적화: 많은 수의 항목을 처리할 때, ListView.builder는 가시 항목에 대해서만 위젯을 생성하기 때문에 정적 위젯 목록을 생성하는 것보다 메모리를 더 효율적으로 사용합니다.
- 무한 스크롤: 사용자가 스크롤할 때 새 항목이 로드되는 애플리케이션에서 무한 스크롤을 구현하는 데 자주 사용됩니다. 이는 소셜 미디어 피드와 같은 경우입니다.

아래는 ListView.builder를 사용한 간단한 예시입니다:

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*tH6teEqAw_NXp3LELGBcdA.gif)

```js
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: Text('Multiple Lists with Cards'),
        ),
        body: ListsWithCards(),
      ),
    );
  }
}

class ListsWithCards extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // 세 가지 목록을 위한 샘플 데이터
    List<List<String>> listsData = [
      ['아이템 1', '아이템 2', '아이템 3'],
      ['아이템 A', '아이템 B', '아이템 C', '아이템 D'],
      ['아이템 X', '아이템 Y', '아이템 Z'],
      ['아이템 P', '아이템 Q', '아이템 R'],
      ['아이템 M', '아이템 N', '아이템 O'],
    ];

    return ListView.builder(
      itemCount: listsData.length,
      itemBuilder: (context, index) {
        return CardList(listData: listsData[index]);
      },
    );
  }
}

class CardList extends StatelessWidget {
  final List<String> listData;

  CardList({required this.listData});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.all(10.0),
      child: Column(
        children: [
          ListTile(
            title: Text('목록 ${listData[0]}'),
          ),
          Divider(),
          ListView.builder(
            itemCount: listData.length,
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            itemBuilder: (context, index) {
              return ListTile(
                title: Text(listData[index]),
              );
            },
          ),
        ],
      ),
    );
  }
}
```

<div class="content-ad"></div>

이 코드에서:

- ListsWithCards는 여러 데이터 목록을 포함하는 ListView.builder를 생성하는 위젯입니다. listsData 목록을 사용자 지정할 수 있습니다.
- CardList는 카드가 있는 단일 목록을 표시하는 위젯이며, 해당 특정 목록의 데이터인 listData 매개변수를 사용합니다.
- CardList 내에서 각 목록마다 Card 위젯을 생성합니다. 목록 제목으로 ListTile을 포함하고 해당 목록 내의 항목을 표시하기 위해 중첩된 ListView.builder를 사용합니다.
- 중첩된 ListView.builder는 shrinkWrap: true 및 physics: NeverScrollableScrollPhysics()로 설정되어 각 카드 내에서 독립적으로 스크롤하지 않지만 전체 목록으로 스크롤할 수 있도록 합니다.

특정 디자인 기호에 맞게 UI를 더 맞춤화할 수 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:996/1*qtGTaKs5VoWOOHScCHOtmQ.gif)
