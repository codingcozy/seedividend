---
title: "모바일 개발자를 위한 필수 애니메이션 기술 목록 플러터 예제 포함"
description: ""
coverImage: "/assets/img/2024-08-18-EssentialAnimationsEveryMobileDeveloperShouldKnowWithFlutterExamples_0.png"
date: 2024-08-18 11:47
ogImage: 
  url: /assets/img/2024-08-18-EssentialAnimationsEveryMobileDeveloperShouldKnowWithFlutterExamples_0.png
tag: Tech
originalTitle: "Essential Animations Every Mobile Developer Should Know With Flutter Examples"
link: "https://medium.com/@cloderaldo/essential-animations-every-mobile-developer-should-know-with-flutter-examples-8044659194f4"
isUpdated: false
---


안녕하세요, 모바일 개발자 여러분! 🖐️ 앱에 조금의 마법을 더하려면 준비가 되셨나요? 애니메이션은 좋은 앱을 훌륭한 앱으로 만들어줄 수 있어요. 상호작용을 더 부드럽게 만들어주고, 사용자를 안내해주며, 모든 것이 더 멋지게 느껴지게 해줘요. 이제 몇 가지 꼭 알아야 할 필수 애니메이션을 알아보고, 쉬운 플러터 예제와 함께 살펴보아요!

![Essential Animations Every Mobile Developer Should Know With Flutter Examples](/assets/img/2024-08-18-EssentialAnimationsEveryMobileDeveloperShouldKnowWithFlutterExamples_0.png)

## 1. 로딩 애니메이션 🚀

빈 화면을 바라보는 건 아무도 좋아하지 않아요. 어떤 재미있는 애니메이션으로 컨텐츠가 로딩될 동안 사용자와 연결을 유지해보세요.

<div class="content-ad"></div>

- 스피너: 클래식 로딩 애니메이션입니다.

```js
CircularProgressIndicator()
```

- 진행 막대: 사용자들이 얼마나 기다려야 하는지 알 수 있도록 합니다.

```js
LinearProgressIndicator()
```

<div class="content-ad"></div>

스켈레톤 화면: 콘텐츠가 로드될 때 임시 레이아웃을 표시합니다.

```js
참고: 이 부분에서는 flutter pub add shimmer 명령을 실행해야 합니다.
```

```js
SizedBox(
  width: 200.0,
  height: 100.0,
  child: Shimmer.fromColors(
    baseColor: Colors.red,
    highlightColor: Colors.yellow,
    child: Text(
      'Shimmer',
      textAlign: TextAlign.center,
      style: TextStyle(
        fontSize: 40.0,
        fontWeight: FontWeight.bold,
      ),
    ),
  ),
);
```

## 2. 페이지 전환 📱

<div class="content-ad"></div>

화면 전환시 자연스럽고 매끄럽게 느껴지도록 만들어 보세요.

- 슬라이드 전환: 새로운 페이지를 측면에서 슬라이드합니다.

```js
Navigator.push(
  context,
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => SecondPage(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      const begin = Offset(1.0, 0.0);
      const end = Offset.zero;
      const curve = Curves.ease;

      var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));

      return SlideTransition(
        position: animation.drive(tween),
        child: child,
      );
    },
  ),
);
```

페이드 전환: 새로운 화면을 부드럽게 페이드인 시킵니다.

<div class="content-ad"></div>

```js
Navigator.push(
  context,
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => SecondPage(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return FadeTransition(
        opacity: animation,
        child: child,
      );
    },
  ),
);
```

줌 트랜지션: 줌 효과로 약간의 매력을 더해보세요.

```js
Navigator.push(
  context,
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => SecondPage(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return ScaleTransition(
        scale: animation,
        child: child,
      );
    },
  ),
);
```

## 3. 버튼 애니메이션 🎮

<div class="content-ad"></div>

버튼을 보다 상호작용적이고 누르기가 재미있는 느낌으로 만들어보세요.

- 리플 효과: 버튼을 누른 곳에서 퍼져나가는 파도 모양의 효과입니다.

```js
ElevatedButton(
  onPressed: () {},
  child: Text('리플 효과'),
)
```

색상 변경: 버튼을 누르면 버튼의 색상이 변경됩니다.

<div class="content-ad"></div>

```js
 GestureDetector(
      onTapDown: (_) => setState(() => isPressed = true),
      onTapUp: (_) => setState(() => isPressed = false),
      child: AnimatedContainer(
        duration: Duration(milliseconds: 200),
        color: isPressed ? Colors.blue : Colors.grey,
        child: Center(child: Text('Press Me')),
        padding: EdgeInsets.all(16.0),
      ),
    )
```

Shape Morphing: Smoothly change the shape of the button.

```js
GestureDetector(
      onTap: () => setState(() => isPressed = !isPressed),
      child: AnimatedContainer(
        duration: Duration(milliseconds: 200),
        width: isPressed ? 100.0 : 200.0,
        height: 50.0,
        decoration: BoxDecoration(
          color: Colors.blue,
          borderRadius: BorderRadius.circular(isPressed ? 50.0 : 8.0),
        ),
        child: Center(child: Text('Press Me', style: TextStyle(color: Colors.white))),
      ),
    )
```

## 4. Navigation Drawer Animations 📂

<div class="content-ad"></div>

앱의 메뉴를 열고 닫을 때 부드럽고 세련되게 만들어보세요.

- Slide In/Out: 사이드에서 화면으로 쓱쓱 슬라이딩되는 서랍 메뉴입니다.

```js
Scaffold(
  drawer: Drawer(
    child: ListView(
      children: <Widget>[
        DrawerHeader(
          child: Text('Header'),
          decoration: BoxDecoration(color: Colors.blue),
        ),
        ListTile(
          title: Text('Item 1'),
          onTap: () {},
        ),
      ],
    ),
  ),
  appBar: AppBar(title: Text('Slide In Drawer')),
  body: Center(child: Text('Content here')),
)
```

Fade In/Out: 서랍 메뉴가 서서히 사라지거나 나타납니다.

<div class="content-ad"></div>

```js
주의: 여기서 flutter zoom drawer를 추가해야 합니다.

ZoomDrawer(
      controller: ZoomDrawerController,
      style: DrawerStyle.defaultStyle,
      menuScreen: MenuScreen(),
      mainScreen: MainScreen(),
      borderRadius: 24.0,
      showShadow: true,
      angle: -12.0,
      drawerShadowsBackgroundColor: Colors.grey[300],
      slideWidth: MediaQuery.of(context).size.width*.65,
      openCurve: Curves.fastOutSlowIn,
      closeCurve: Curves.bounceIn,
    )

스케일 애니메이션: 서랍이 나타날 때 메인 콘텐츠가 축소됩니다.

ZoomDrawer(
      controller: ZoomDrawerController,
      style: DrawerStyle.style2,
      menuScreen: MenuScreen(),
      mainScreen: MainScreen(),
      borderRadius: 24.0,
      showShadow: true,
      angle: -12.0,
      drawerShadowsBackgroundColor: Colors.grey[300],
      slideWidth: MediaQuery.of(context).size.width*.65,
      openCurve: Curves.fastOutSlowIn,
      closeCurve: Curves.bounceIn,
    )

<div class="content-ad"></div>

## 5. Pull-to-Refresh 🔄

재미있는 Pull-to-Refresh 애니메이션으로 컨텐츠를 새로 고칠 수 있어요.

- 화살표에서 스피너로: 사용자가 아래로 당기면 화살표 아이콘이 스피너로 변합니다.

RefreshIndicator(
  onRefresh: () async {
    // 여기에 리프레시 로직을 작성하세요
  },
  child: ListView.builder(
    itemCount: 30,
    itemBuilder: (context, index) {
      return ListTile(title: Text('아이템 $index'));
    },
  ),
)

<div class="content-ad"></div>

이탄성 효과: 아래로 당길 때 바운스 효과를 추가하여 재미있는 상호 작용을 제공합니다.

// flutter_pulltorefresh와 같은 패키지 사용
PullToRefreshNotification(
  onRefresh: () async {
    // 여기에 새로 고침 로직 구현
  },
  child: CustomScrollView(
    slivers: <Widget>[
      PullToRefreshContainer((info) {
        return SliverToBoxAdapter(
          child: Container(
            height: 60.0,
            alignment: Alignment.center,
            child: Text('당겨서 새로 고침'),
          ),
        );
      }),
      SliverList(
        delegate: SliverChildBuilderDelegate(
          (context, index) => ListTile(title: Text('항목 $index')),
          childCount: 30,
        ),
      ),
    ],
  ),
)

# 마무리

아직 다루지 않은 더 많은 애니메이션이 있지만, 아마 다음에! 애니메이션은 모바일 앱의 매력 요소입니다. 사용자를 즐겁게 유지하며 상호 작용을 직관적으로 만들어주고 작업에 전문성을 더합니다. Flutter를 사용하면 내장된 다양한 도구와 패키지 덕분에 이러한 애니메이션을 쉽게 만들 수 있습니다.

<div class="content-ad"></div>

어떤 멋진 애니메이션 팁이나 꿀팁이 있나요? 댓글로 공유해주세요! 함께 앱을 멋지게 만들어봐요. ✨