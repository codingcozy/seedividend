---
title: "Flutter에서 clean code를 작성하는 방법"
description: ""
coverImage: "/assets/img/2024-05-20-Whyshouldweusecleancodeinflutter_0.png"
date: 2024-05-20 23:18
ogImage: 
  url: /assets/img/2024-05-20-Whyshouldweusecleancodeinflutter_0.png
tag: Tech
originalTitle: "Why should we use clean code in flutter?"
link: "https://medium.com/@sanjaysharmajw/why-should-we-use-clean-code-in-flutter-6d6fb204f269"
---


![image](/assets/img/2024-05-20-Whyshouldweusecleancodeinflutter_0.png)

플러터에서 깨끗한 코드를 사용하는 것은 유지보수성, 가독성, 확장성 및 디버깅의 용이성을 포함한 여러 가지 이유로 중요합니다. 아래에는 깨끗한 코드의 중요성을 설명하기 위한 몇 가지 구체적인 예와 함께 자세한 설명이 나와 있습니다.

- 유지보수성

깨끗한 코드는 이해하기 쉽고 수정하기 쉽습니다. 코드베이스가 커질수록 잘 구성되고 이해하기 쉬운 코드를 가지고 있으면 버그를 수정하고 새로운 기능을 추가하기가 더 쉬워집니다.

<div class="content-ad"></div>

```js
// .......................코드 작성이 잘못된 부분............................

Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text('내 앱'),
    ),
    body: Column(
      children: [
        Text('내 앱에 오신 것을 환영합니다', style: TextStyle(fontSize: 24)),
        RaisedButton(
          onPressed: () {
            // 복잡한 로직
          },
          child: Text('눌러보세요'),
        ),
      ],
    ),
  );
}

// .......................깔끔한 코드...................................

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: _buildBody(),
    );
  }

  AppBar _buildAppBar() {
    return AppBar(
      title: Text('내 앱'),
    );
  }

  Widget _buildBody() {
    return Column(
      children: [
        _buildWelcomeText(),
        _buildPressMeButton(),
      ],
    );
  }

  Widget _buildWelcomeText() {
    return Text(
      '내 앱에 오신 것을 환영합니다',
      style: TextStyle(fontSize: 24),
    );
  }

  Widget _buildPressMeButton() {
    return RaisedButton(
      onPressed: _handlePressMeButton,
      child: Text('눌러보세요'),
    );
  }

  void _handlePressMeButton() {
    // 복잡한 로직
  }
}
```

깔끔한 코드 예제에서, build 메서드는 더 작고 더 집중된 메서드로 분해되어 유지보수가 더 쉽습니다.

2. 가독성

깔끔한 코드는 더 읽기 쉽고 이해하기 쉽습니다. 이는 코드가 작성되기보다는 더 자주 읽히기 때문에 중요합니다.

<div class="content-ad"></div>

```js
// .......................작성된 코드가 좋지 않습니다............................

void updateUserProfile(User user) {
  if (user.name != null && user.email != null) {
    // 프로필 업데이트
  }
}


// ............................깨끗한 코드................................

void updateUserProfile(User user) {
  if (_isUserProfileValid(user)) {
    _updateProfileInDatabase(user);
  }
}

bool _isUserProfileValid(User user) {
  return user.name != null && user.email != null;
}

void _updateProfileInDatabase(User user) {
  // 프로필 업데이트
}
```

깨끗한 코드 예제는 조건을 잘 명명된 메서드로 추상화하여 가독성을 향상시킵니다.

3. 확장성

프로젝트가 확장될수록, 깨끗한 코드는 코드베이스의 품질을 저하시키지 않고 새로운 기능을 추가하는 것을 더 쉽게 만듭니다.
  

<div class="content-ad"></div>

```js
// ..........잘못 작성된 코드.........

void performAction(String action) {
  if (action == 'login') {
    // 로그인 로직
  } else if (action == 'logout') {
    // 로그아웃 로직
  } else if (action == 'signup') {
    // 가입 로직
  }
}

// ...........깔끔한 코드...............

void performAction(String action) {
  switch (action) {
    case 'login':
      _login();
      break;
    case 'logout':
      _logout();
      break;
    case 'signup':
      _signup();
      break;
    default:
      _handleUnknownAction();
  }
}

void _login() {
  // 로그인 로직
}

void _logout() {
  // 로그아웃 로직
}

void _signup() {
  // 가입 로직
}

void _handleUnknownAction() {
  // 알 수 없는 동작 처리
}
```

깔끔한 코드 예시는 switch 문을 사용하여 동작을 각각의 메서드로 분리하여 새로운 동작을 추가하기 쉽게 만듭니다.

4. 디버깅 용이성

깔끔한 코드는 더 직관적으로 코드를 추적하고 실행 흐름을 이해하기 쉬워져 디버깅을 단순화합니다.

<div class="content-ad"></div>

잘못 작성된 코드:

```js
// ...........잘못 작성된 코드..............

void processOrder(Order order) {
  if (order.isValid()) {
    if (order.total > 100) {
      applyDiscount(order);
    }
    // 주문 처리
  }
}


// ...........깨끗한 코드..............

void processOrder(Order order) {
  if (!order.isValid()) {
    return;
  }
  _applyDiscountIfEligible(order);
  _processOrderDetails(order);
}

void _applyDiscountIfEligible(Order order) {
  if (order.total > 100) {
    applyDiscount(order);
  }
}

void _processOrderDetails(Order order) {
  // 주문 처리
}
```

깨끗한 코드 예시에서는 로직이 작고 관리하기 쉬운 메소드로 분해되어 있어 이해하고 디버그하기가 더 쉽습니다.

추가 예시: 변수

<div class="content-ad"></div>

```js
// ........잘못 작성된 코드......

int a;
String b;

// ........깔끔한 코드..........

int productCount;
String activeUserName;
```

함수:

```js
// ........잘못 작성된 코드.......

void doSomething();
String getSomething();

// ........깔끔한 코드..........

void updateProductCount() {
  // ...
}

String getUserName() {
  // ...
}
```

클래스:

<div class="content-ad"></div>


// ......잘못 작성된 코드....

class MyClass {
  // ...
}

// ........깔끔한 코드..........

class VideoList {
  // ...
}

class UserAccount {
  // ...
}


## 결론

Flutter에서 깔끔한 코드를 사용하면 코드베이스가 유지 가능하고 가독성이 높고 확장 가능하며 쉽게 디버깅할 수 있습니다. 깔끔한 코드 원칙을 준수하면 애플리케이션의 전반적인 품질을 향상시켜 미래에 코드를 작업할 때 자신과 다른 사람들이 더 쉽게 작업할 수 있게 됩니다.

<img src="/assets/img/2024-05-20-Whyshouldweusecleancodeinflutter_1.png" />


<div class="content-ad"></div>

이 기사를 즐겁게 보셨기를 바라요! 제공된 정보를 감사하게 여기신다면, 'Buy Me A Coffee'로 저를 지원할 수 있어요! 여러분의 센스에 감사드릴 거예요!