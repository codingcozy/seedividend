---
title: "ListViews에서 흔히 범하는 실수들"
description: ""
coverImage: "/assets/img/2024-05-15-CommonmistakeswithListViewsinFlutter_0.png"
date: 2024-05-15 03:10
ogImage:
  url: /assets/img/2024-05-15-CommonmistakeswithListViewsinFlutter_0.png
tag: Tech
originalTitle: "Common mistakes with ListViews in Flutter"
link: "https://medium.com/@pomis172/common-mistakes-with-listviews-in-flutter-f22e7dacfaf7"
---

스크롤을 부드럽게 유지하기 위해 피해야 할 몇 가지 사항

## 1. NeverScrollableScrollPhysics로 ListView.builder를 축소 래핑하기

ListView.builder를 사용하는 주된 이점은 화면에 표시해야 하는 항목만 초기화하는 최적화 메커니즘이다. 이는 수천 개의 항목을 처리할 때도 수십 개의 항목을 처리할 때와 마찬가지로 부드럽게 작동하게 만든다.

만약 표시하려는 목록이 다른 스크롤 뷰에 포함되어야 하는 경우 어떻게 해야 할까요? 스크롤을 비활성화하여 NeverScrollableScrollPhysics를 추가하고 shrinkWrap을 true로 설정함으로써 스크롤을 사용하지 않는 것은 일반적인 실수입니다. 이 접근 방식은 모든 항목을 한꺼번에 초기화하므로 문제가 될 수 있습니다. 이 문제를 확인하기 위해 간단한 실험을 진행할 수 있습니다.

```js
SingleChildScrollView(
  child: Column(
    children: [
      const Card(child: Text("헤더 카드")),
      ListView.builder(
        physics: const NeverScrollableScrollPhysics(),
        itemCount: 1000,
        shrinkWrap: true,
        itemBuilder: (context, index) {
          print("항목 빌드 중 #${index}");
          return Card(child: Text(index.toString()));
        },
      ),
      const Card(child: Text("푸터 카드")),
    ],
  ),
)
```

<img src="/assets/img/2024-05-15-CommonmistakeswithListViewsinFlutter_0.png" />

출력에서 확인할 수 있듯이, 모든 항목이 동시에 초기화되어 성능 손실이 발생합니다. 이는 전체 목록이 한꺼번에 렌더링되어 보이는 부분만 렌더링되는 것이 아니기 때문에 발생합니다.

그렇다면 대신 어떻게 해야 할까요? 권장하는 방법은 Slivers를 사용하는 것입니다. Slivers를 사용하면 화면에 현재 표시되는 항목만 빌드하여 더 효율적으로 렌더링할 수 있습니다. 이를 통해 대용량 목록도 부드러운 성능을 유지할 수 있습니다.

```js
CustomScrollView(
	slivers: [
		const SliverToBoxAdapter(child: Card(child: Text("Header card"))),
		SliverList.builder(
			itemBuilder: (context, index) {
				print("building item #${index}");
				return Card(child: Text(index.toString()));
			},
		),
		const SliverToBoxAdapter(child: Card(child: Text("Footer card"))),
	],
)
```

<img src="/assets/img/2024-05-15-CommonmistakeswithListViewsinFlutter_1.png" />

보시는 바와 같이 화면에 표시될 항목들만 초기화하고 더 부드러운 스크롤을 위해 약간 더 초기화합니다.

## 2. 목록의 각 항목이 자체 높이를 결정하도록 하는 것.

플러터 UI 렌더링에서 가장 비용이 많이 드는 작업 중 하나는 위젯 크기를 계산하는 것입니다. 목록을 그릴 때는 모든 항목이 동일한 높이를 갖는 목록의 경우를 특히 고려하여 과도한 계산을 피할 수 있습니다.

두 가지 속성을 사용할 수 있습니다:

- prototypeItem — 모든 목록 항목에 사용될 높이를 가진 위젯.
- itemExtent — 각 항목의 높이를 지정하는 숫자 값.

많은 자습서에서 itemExtent를 사용할 것을 추천하지만, 종종 간과되는 단점이 있습니다. 일정한 값을 제공하고 목록 항목에 텍스트가 포함된 경우, 사용자가 OS 설정에서 글꼴 크기를 증가시킬 때 레이아웃이 깨질 수 있습니다.

![Screenshot 1](/assets/img/2024-05-15-CommonmistakeswithListViewsinFlutter_2.png)

원하는 크기를 계산하려면 OS 텍스트 스케일에 폰트 크기를 곱하고 패딩을 추가하는 것이 좋습니다. 이것은 귀찮고 유지 관리가 어려울 수 있습니다. 더 나은 방법이 있습니다:

```js
        ListView.builder(
          itemCount: 1000,
          prototypeItem: const Card(child: Text("")),
          itemBuilder: (context, index) {
            return Card(child: Text(index.toString()));
          },
        )
```

![Screenshot 2](/assets/img/2024-05-15-CommonmistakeswithListViewsinFlutter_3.png)

실버 목록의 경우 프로토타입을 제공할 수도 있습니다:

```js
            SliverPrototypeExtentList.builder(
              itemBuilder: (context, index) {
                return Card(child: Text(index.toString()));
              },
              prototypeItem: const Card(child: Text("")),
            ),
```

코드는 여기에서 확인할 수 있습니다: https://github.com/Pomis/flutter_native_ui_examples/tree/main/lib/3_list_view_mistakes

이 기사가 여러분의 스크롤링을 조금 더 부드럽게 만드는 데 도움이 되기를 바랍니다.

이전 게시물:

Flutter 앱이 보다 네이티브하게 보이도록 만들기. 파트 1: 탭 효과

Flutter 앱이 보다 네이티브하게 보이도록 만들기. 파트 2: 새로 고침 인디케이터

![이미지](/assets/img/2024-05-15-CommonmistakeswithListViewsinFlutter_4.png)
