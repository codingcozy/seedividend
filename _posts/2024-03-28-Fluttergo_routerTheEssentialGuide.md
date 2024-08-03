---
title: "플러터 go_router 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Flutter go_router The Essential Guide"
link: "https://medium.com/@antonio.tioypedro1234/flutter-go-router-the-essential-guide-349ef39ec5b3"
---



![Fluttergo_routerTheEssentialGuide_0](/assets/img/Fluttergo_routerTheEssentialGuide_0.png)

Go_router은 Flutter에서 라우팅을 위한 서드 파티 패키지로, 기본 제공되는 라우팅 옵션보다 더 유연하고 쉽게 사용할 수 있는 솔루션을 제공하고 있습니다. 앱에서 루트가 정의되고 관리되는 방식에 대해 더 많은 제어를 원한다면 유용할 수 있습니다. 웹에 대한 좋은 지원을 제공하기 때문에 애플리케이션에 좋은 선택입니다.

URL 패턴을 정의하고, URL을 사용하여 탐색하며, 딥 링크를 처리하고 다른 네비게이션 관련 시나리오도 처리할 수 있습니다.

# 특징

<div class="content-ad"></div>

GoRouter에는 네비게이션을 간단하게 만드는 여러 기능이 있습니다:

- 템플릿 구문을 사용하여 경로와 쿼리 매개변수 구문 분석
- 목적지에 대해 여러 화면 표시(하위 라우트)
- 리디렉션 지원 - 애플리케이션 상태에 따라 사용자를 다른 URL로 리디렉션할 수 있습니다. 예를 들어 사용자가 인증되지 않은 경우 로그인 페이지로 리디렉션할 수 있습니다.
- StatefulShellRoute를 사용한 중첩 탭 네비게이션 지원
- Material 및 Cupertino 앱 모두 지원
- NavigatorAPI와의 하위 호환성

# 시작하기

시작하려면 pubspec.yaml에 go_router를 추가하십시오. 이 문서에서는 ^7.1.1을 사용할 것입니다.

<div class="content-ad"></div>

```yaml
dependencies:
  go_router: ^7.1.1
```

# 라우트 구성

이제 그렇게 한 다음에 GoRouter 설정을 앱에 추가해 봅시다:

```dart
import 'package:go_router/go_router.dart';

// GoRouter 구성
final _router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      name: 'home', // 선택사항, 라우트에 이름을 추가합니다. 이름으로 경로 이동 가능
      path: '/',
      builder: (context, state) => HomeScreen(),
    ),
    GoRoute(
      name: 'page2',
      path: '/page2',
      builder: (context, state) => Page2Screen(),
    ),
  ],
);
```

<div class="content-ad"></div>

그럼 MaterialApp.router 또는 CupertinoApp.router 생성자 중 하나를 사용하고 routerConfig 매개변수를 GoRouter 구성 객체로 설정할 수 있어요:

```js
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
    );
  }
}
```

이 정도면 🙂 GoRouter를 사용할 준비가 끝났어요!!!

## 매개변수

<div class="content-ad"></div>

경로 매개변수를 지정하려면, 경로 세그먼트 앞에 : 문자를 붙이고, 고유한 이름(예: :userId)을 사용하세요. 빌더 콜백에 제공된 GoRouterState 객체를 통해 매개변수 값을 액세스합니다:

```js
GoRoute(
  path: '/fruits/:id',
  builder: (context, state) {
     final id = state.params['id'] // URL에서 "id" 매개변수 가져오기
     return FruitsPage(id: id);
  },
),
```

GoRouterState를 사용하여 쿼리 문자열 매개변수에도 액세스할 수 있습니다. 예를 들어, /fruits?search=antonio와 같은 URL 경로는 search 매개변수를 읽을 수 있습니다:

```js
GoRoute(
  path: '/fruits',
  builder: (context, state) {
    final search = state.queryParams['search'];
    return FruitsPage(search: search);
  },
),
```

<div class="content-ad"></div>

## 자식 경로 추가하기

일치하는 경로는 Navigator에서 여러 화면이 표시되도록 할 수 있습니다. 이는 push()를 호출하는 것과 동일하며, 새 화면이 이전 화면 위에 표시되며 AppBar 위젯에 앱 내부 뒤로 가기 버튼이 제공됩니다.

이를 수행하기 위해 자식 경로와 해당 상위 경로를 추가합니다:

```js
GoRoute(
  path: '/fruits',
  builder: (context, state) {
    return FruitsPage();
  },
  routes: <RouteBase>[ // 자식 경로 추가
    GoRoute(
      path: 'fruits-details', // 참고: 라우터의 상위에 "/" 문자를 명시할 필요가 없습니다.
      builder: (context, state) {
        return FruitDetailsPage();
      },
    ),
  ],
)
```

<div class="content-ad"></div>

## 화면 간 이동

go_router를 사용하여 목적지 간에 이동하는 여러 가지 방법이 있습니다.

새 화면으로 전환하려면 URL을 지정하여 context.go()를 호출하세요:

```js
build(BuildContext context) {
  return TextButton(
    onPressed: () => context.go('/fruits/fruit-detail'),
  );
}
```

<div class="content-ad"></div>

이름으로 URL 대신에 이동할 수도 있어요. `context.goNamed()`를 호출해 보세요.

```dart
build(BuildContext context) {
  return TextButton(
    // 라우트에 "name"을 추가하는 것을 잊지 마세요
    onPressed: () => context.goNamed('fruit-detail'),
  );
}
```

쿼리 매개변수를 포함한 URI를 만들려면 Uri 클래스를 사용할 수 있어요:

```dart
context.go(
  Uri(
    path: '/fruit-detail',
    queryParameters: {'id': '10'},
  ).toString(),
);
```

<div class="content-ad"></div>

현재 화면을 context.pop()를 통해 닫을 수 있어요.

# 중첩된 탭 내비게이션

일부 앱은 화면의 하위 섹션에 대상을 표시합니다. 예를 들어 화면 간에 이동할 때 화면 상에 남아있는 BottomNavigationBar와 같은 것들이 있어요.

StatefulShellRoute를 사용하여 중첩된 내비게이션을 설정해봅시다.

<div class="content-ad"></div>

StatefulShellRoute 클래스는 루트 네비게이터와 다른 네비게이터에 하위 라우트를 배치합니다. 그러나 이 라우트 클래스는 각 중첩된 브랜치마다 별도의 네비게이터를 생성하여 병렬 네비게이션 트리(즉, 병렬 네비게이션 트리)를 만들면서 상태가 있는 중첩된 네비게이션을 구축할 수 있습니다.

예를 들어 BottomNavigationBar를 사용하여 UI를 구현할 때 각 탭마다 지속적인 네비게이션 상태를 사용해야 할 때 편리합니다.

StatefulShellRoute는 루트 네비게이터 및 가지의 전역 네비게이터 키(GlobalKey)와 선택적 초기 위치를 제공하는 각각 다른 상태가 있는 브랜치를 나타내는 StatefulShellBranch 항목의 목록을 지정하여 생성됩니다.

이를 어떻게 구현하는지 살펴보겠습니다 🙂

<div class="content-ad"></div>

저희는 라우터를 생성하는 것으로 시작합니다. 라우트에 StatefulShellRoute.indexedStack()를 추가할 건데, 이 클래스는 중첩된 네비게이션을 만드는 역할을 담당합니다.

StatefulShellRoute.indexedStack()은 중첩된 네비게이터를 위해 IndexedStack을 사용하는 StatefulShellRoute를 구성합니다.

이 생성자는 분기 네비게이터를 나타내는 위젯을 관리하는 데 사용되는 컨테이너(navigatorContainerBuilder)에 대한 IndexedStack 기반 구현을 제공합니다.

라우트에 StatefulShellRoute.indexedStack()을 추가했는데, 이것은 분기를 생성하고 사용자 정의 쉘(이 경우 BottomNavigationBar)을 반환하는 역할을 합니다.

<div class="content-ad"></div>

- 빌더에서: (컨텍스트, 상태, 네비게이션 셸)을 반환하여 사용자 정의 셸을 생성합니다. 기본적으로 하단 네비게이션 바가 있는 Scaffold를 반환합니다. 이 페이지에는 다른 분기로 이동하기 위해 해당 페이지로 이동할 수 있는 navigationShell을 전달하는 것을 기억해 주세요 (예: 홈 == 쇼핑).
- 분기:[]에서는 StatefulShellBranch(분기) 목록을 제공합니다. 이전에 생성한 \_sectionNavigatorKey를 navigatorKey 속성에 전달하지만 첫 번째 분기에만 사용되며, 다른 분기에는 기본 키가 사용됩니다. 또한 해당 분기에 지원되는 경로인 RouteBase 목록을 제공합니다.

빌더가 하단 네비게이션 바를 포함하는 사용자 정의 셸을 반환하는 것을 볼 수 있습니다. 따라서 다음을 만들어 봅시다 👇🏿

기본적으로 하단 네비게이션 바가 있는 Scaffold를 반환하며, 본문은 라우터에서 얻은 navigationShell이 될 것입니다.

\_onTap(index)에는 navigationShell.goBranch(index)를 사용하여 분기 간에 전환할 수 있습니다.

<div class="content-ad"></div>

그게 다야, 이제 당신의 프로젝트에 구현할 준비가 됐어요 🥳🎉

완벽한 예제는 아래 저장소를 확인해보세요 👇🏿

# 가드

특정 경로를 보호하기 위해, 예를 들어 인증되지 않은 사용자로부터, 전역 리디렉션이 GoRouter를 통해 설정될 수 있습니다. 가장 일반적인 예제는 /login이 아닌 모든 경로를 보호하는 리디렉션 설정이며, 사용자가 인증되지 않은 경우 /login으로 리디렉트됩니다.

<div class="content-ad"></div>

리다이렉트는 GoRouterRedirect 유형의 콜백입니다. 응용 프로그램 상태에 따라 들어오는 위치를 변경하려면 GoRouter 또는 GoRoute 생성자에 콜백을 추가하십시오:

```js
GoRouter(
  redirect: (BuildContext context, GoRouterState state) {
    final isAuthenticated = // 사용자가 인증되어 있는지 확인하는 논리
    if (!isAuthenticated) {
      return '/login';
    } else {
      return null; // 리다이렉트 없이 의도된 경로를 표시하려면 "null"을 반환합니다.
     }
   },
  ...
```

- GoRouter 생성자에서 리다이렉트를 정의할 수 있습니다. 모든 네비게이션 이벤트 전에 호출됩니다.
- GoRoute 생성자에서 리다이렉트를 정의할 수 있습니다. 네비게이션 이벤트가 라우트를 표시하기 전에 호출됩니다.

# 전환 애니메이션

<div class="content-ad"></div>

GoRouter는 각 GoRoute에 대한 전환 애니메이션을 사용자 정의할 수 있게 해줍니다. 사용자 정의 전환 애니메이션을 구성하려면 GoRoute 생성자에 pageBuilder 매개변수를 제공하세요:

```js
GoRoute(
  path: '/fruit-details',
  pageBuilder: (context, state) {
    return CustomTransitionPage(
      key: state.pageKey,
      child: FruitDetailsScreen(),
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        // 애니메이션 값에 따라 화면의 불투명도를 변경하여 사용자 정의 전환 효과 만들기
        return FadeTransition(
          opacity: CurveTween(curve: Curves.easeInOutCirc).animate(animation),
          child: child,
        );
      },
    );
  },
),
```

전체 예시는 transition animations 샘플을 참고하세요.

# 에러 처리 (404 페이지)

<div class="content-ad"></div>

go_router는 기본적으로 MaterialApp 및 CupertinoApp을 위한 기본 오류 화면과 사용되지 않은 경우의 기본 오류 화면이 함께 제공됩니다. 또한 errorBuilder 매개변수를 사용하여 기본 오류 화면을 대체할 수도 있습니다:

```js
GoRouter(
  /* ... */
  errorBuilder: (context, state) => ErrorPage(state.error),
);
```

# 타입 안전한 라우트

URL 문자열(context.go("/auth")) 대신 go_router는 go_router_builder 패키지를 사용하여 타입 안전한 라우트를 지원합니다.

<div class="content-ad"></div>

시작하려면 pubspec.yaml 파일의 dev_dependencies 섹션에 go_router_builder, build_runner, 그리고 build_verify를 추가해주세요:

```js
dev_dependencies:
  go_router_builder: ^1.0.16
  build_runner: ^2.3.3
  build_verify: ^3.1.0
```

## 라우트 정의하기

그런 다음, 각 라우트를 GoRouteData를 확장한 클래스로 정의하고 build 메서드를 오버라이드하세요.

<div class="content-ad"></div>

```dart
class HomeRoute extends GoRouteData {
  const HomeRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) => const HomeScreen();
}
```

## Route 트리

Route 트리는 각 최상위 route에 속성으로 정의됩니다:

```dart
import 'package:go_router/go_router.dart';

part 'go_router.g.dart'; // 생성된 파일의 이름

// Route 트리(경로 및 하위 route)를 정의합니다
@TypedGoRoute<HomeScreenRoute>(
    path: '/home',
    routes: [ // 하위 route를 추가하세요
      TypedGoRoute<SongRoute>(
        path: 'song/:id',
      )
    ]
)

// "GoRouteData"를 확장하고 "build"를 @override하는 route 스크린을 생성하세요
@immutable
class HomeScreenRoute extends GoRouteData {
  @override
  Widget build(BuildContext context) {
    return const HomeScreen();
  }
}

@immutable
class SongRoute extends GoRouteData {
  final int id;
  const SongRoute({required this.id});

  @override
  Widget build(BuildContext context) {
    return SongScreen(songId: id.toString());
  }
}
```

<div class="content-ad"></div>

생성된 파일을 빌드하려면 build_runner 명령어를 사용하십시오:

```js
flutter pub global activate build_runner // 선택 사항, 이미 build_runner를 활성화한 경우 이 단계를 건너뛸 수 있습니다
flutter pub run build_runner build
```

이동하려면 필요한 매개변수로 GoRouteData 객체를 만들고 go()를 호출하십시오:

```js
TextButton(
  onPressed: () {
    const SongRoute(id: 2).go(context);
  },
  child: const Text('노래 2로 이동'),
),
```

<div class="content-ad"></div>

# 가기 전에!!!

go_router의 아직 멋진 기능이 있습니다. NavigatorObserver를 GoRouter에 추가하여 Navigator의 동작을 감시할 수 있습니다. 언제 어떤 경로가 푸시, 팝 또는 교체되었는지 듣기 위해 클래스를 확장하는 방법은 다음과 같습니다 :

```js
class MyNavigatorObserver extends NavigatorObserver {
  @override
  void didPush(Route<dynamic> route, Route<dynamic>? previousRoute) {
    log('did push route');
  }

  @override
  void didPop(Route<dynamic> route, Route<dynamic>? previousRoute) {
    log('did pop route');
  }
}
```

이제 MyNavigatorObserver를 GoRouter에 추가해 보겠습니다.

<div class="content-ad"></div>

```js
GoRouter(
  ...
  observers: [ // 네비게이터 옵저버를 추가하세요
    MyNavigatorObserver(),
  ],
...
)
```

이러한 이벤트가 트리거될 때마다 네비게이터에 알림이 전송됩니다.
