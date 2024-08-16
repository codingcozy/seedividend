---
title: "플러터에서의 마이크로 프론트엔드 모듈화 응용 프로그램"
description: ""
coverImage: "/assets/img/2024-05-27-MicroFrontendsinFlutterModularizationApplication-Part2_0.png"
date: 2024-05-27 19:17
ogImage: 
  url: /assets/img/2024-05-27-MicroFrontendsinFlutterModularizationApplication-Part2_0.png
tag: Tech
originalTitle: "Micro Frontends in Flutter: Modularization Application -Part 2"
link: "https://medium.com/@tungnd.dev/micro-frontends-in-flutter-modularization-application-part-2-e15c72ca2555"
isUpdated: true
---



이전 부분에서는 장단점을 논의하고 구현해야 할 아이디어를 기록했습니다. 이 기사를 처음으로 본 독자들도 있을 것이므로, 우선 part 1을 읽어보세요. 물론, 다시 언급해야 할 부분이 있어요. 시작하기 전에 모두 완료해야 할 체크리스트가 있는지 확인하세요.

![image](/assets/img/2024-05-27-MicroFrontendsinFlutterModularizationApplication-Part2_0.png)

# 구현

이번 파트에서 (마지막인지는 확실하지 않아요 😀), 전통적인 템플릿에 따라 프로젝트를 모듈화해 보겠습니다. 여기에 간단한 프로젝트를 만들었습니다. 로그인 및 홈 화면이 있고 목록보기가 딸려 있는 Clean Architecture를 따릅니다.
말만 하는 것보다는 코드를 보여줘! 라는 '하드코더'들을 위해, 이번 모듈화 후 프로젝트의 전체 소스 코드입니다. 이 기사를 읽은 후에 먼저 확인해보세요.

<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:960/1*xv3Fj652XewSzSdgdXmniw.gif" />

1. 패키지 관리
   프로젝트 내의 모든 패키지를 관리하기 위해 패키지 관리가 필요합니다. 예를 들어, 각 모듈에서 한 번에 pub get, build_runner 또는 gen-l10n을 실행할 수 있습니다. 다행히도, invertase에서 개발한 melos를 알아내다.

```js
name: flutter-micro-frontend
packages:
  - modules/*
command:
  bootstrap:
    runPubGetInParallel: false
scripts:
  gen-l10n:
    exec: flutter gen-l10n
    ignoreErrors: true
```

위와 같은 구성이 필요하므로, melos bootstrap을 실행하여 모든 패키지 내의 종속성을 가져올 수 있고, melos gen-l10n을 실행하여 언어 파일을 생성할 수 있습니다. 아주 쉽죠.

<div class="content-ad"></div>

2. UI 모듈

- 참고: 패키지와 Dart 패키지의 생성에 대해 알아보고, 패키지와 Dart 패키지의 구조를 배우세요.

![이미지](/assets/img/2024-05-27-MicroFrontendsinFlutterModularizationApplication-Part2_1.png)

이것은 UI 모듈의 작은 버전입니다. 물론 큰 프로젝트나 다른 비즈니스 프로젝트의 경우 구조가 다를 수 있습니다. 이 모듈 내부에는 다음 사항을 확인하세요:

- 너무 복잡한 로직이 아니라 UI 요소만 존재합니다.
- 각 카테고리(대화 상자, 목록보기 등)에 대해 모든 구체적 요소를 내보내는 내보내기 파일이 있어야 합니다.

<div class="content-ad"></div>

```js
export 'grid_view_load_more.dart';
export 'list_view_load_more.dart';
```

- 전체 앱에서 font를 사용하기 위해 여기에 추가하고 ui_theme에 추가해야 합니다. package/ui/assets/fonts/SFProText-Regular.ttf와 같이 경로 앞에 항상 package/ui가 있어야 합니다.
- Main App의 localizationsDelegates 안에 추가하기 위해 LocalizationsDelegate를 export해야 합니다.

이게 전부에요. 이 package에 대해 더 이상 논의할 주제는 없습니다.

3. Core Module

<div class="content-ad"></div>

![이미지](/assets/img/2024-05-27-MicroFrontendsinFlutterModularizationApplication-Part2_2.png)

앱 전체와 다른 모듈의 뼈대입니다. 이 모듈 내의 코드를 추가하거나 수정할 때 신중히 고려해 주세요. 몇 가지 주의 사항이 있어요:

- 기존 프로젝트에서는 상태 관리, 네비게이션 및 종속성 주입에 Get을 사용했지만, 모듈화할 때는 순수한 Flutter 네비게이션과 get_it을 사용합니다. 이는 모듈을 만들 때 다른 라이브러리에 너무 의존하지 않도록 하기 위함입니다. 모듈을 많은 곳에서 재사용하려면 심지어 파트너 앱 내에서도 모듈을 사용한다는 보장이 없으므로 Get을 사용하고 있다는 가정을 할 수 없습니다. 따라서 모듈이나 패키지를 만들 때 다른 라이브러리에 가능한 많이 의존하지 않도록 노력해 주세요.
- 여전히 상태 관리에 Get을 사용했기 때문에 여기에는 일부 베이스 뷰와 베이스 컨트롤러가 있습니다. BLoC를 선호하는 경우 BLoC용 베이스 코드도 있습니다. 그러나 이상적으로는 동기화를 위해 모든 모듈에 하나의 상태 관리만 사용해야 합니다.
- 이 모듈은 여전히 Clean Architecture를 따릅니다. API 호출을 위해 Dio와 Retrofit을 사용했습니다. 따라서 여기서 dio와 일부 설정을 만들겠습니다.
- core 내에서 사용한 모든 기타 서드파티 패키지를 내보내는 libs.dart가 있습니다. 다른 패키지 내에서 이를 사용하거나 수정해야 할 경우, 핵심 모듈을 가져오기만 하면 됩니다.

![이미지](/assets/img/2024-05-27-MicroFrontendsinFlutterModularizationApplication-Part2_3.png)

<div class="content-ad"></div>

4. 주요 애플리케이션
   주요 애플리케이션으로 돌아갑니다. UI 모듈에서 말했듯이, MaterialApp에 localizationsDelegates 및 테마를 추가해야 합니다. 이것이 앱 구성에 관한 전부입니다. 임시로 빈 Splash 화면과 홈 화면을 만듭니다. 기능 모듈을 몇 개 개발하고 그것에 추가할 것입니다.

좋은 준비가 되었습니다. 이제 첫 번째 모듈을 구현하기 시작합니다. 대부분의 시스템이 필요로 하는 인증입니다.

5. 인증 모듈
   의존성은 Auth.start(context)를 호출하면 됩니다. 그런 다음 다음 비즈니스를 위한 결과를 얻습니다. 로그인, 등록, 비밀번호 재설정, OTP 등과 같은 모든 로직 또는 UI 페이지는 이 모듈에서 구현될 것입니다. 이것이 놀랍군요. 주요 앱은 인증에 대한 어떤 로직도 알지 못했습니다.

<div class="content-ad"></div>

- 보시다시피, 리포지토리, 클라이언트 또는 유스케이스와 같은 각 클래스/파일에 auth 접두사를 추가할 필요가 없습니다.
- 세션 관리, 액세스 토큰 저장, 리프레시 토큰과 같은 것은 이 모듈 안에서만 구현했습니다.
- 전체 인증 모듈의 모든 로직을 관리하는 AuthController가 있습니다. 이는 모든 다른 클래스가 호출할 수 있는 전역 스트림과 같은 것입니다. 그 안에 있는 코드 일부를 살펴보겠습니다.

```js
  late Completer completer;

  Future<void> auth(BuildContext context) {
    completer = Completer();
    final result = CheckIsLoggedInUseCase(GetIt.instance.get<Repository>()).execute();
    result.fold((left) {
      if (left) {
        completer.complete();
      } else {
        Navigator.pushAndRemoveUntil(context, Routes.checkPhone(), (route) => false);
      }
    }, (right) {
      showError(context, right);
    });
    return completer.future;
  }

  void loginSuccessfully() {
    if (!completer.isCompleted) {
      completer.complete();
    }
  }
```

다른 화면이 loginSuccessfully()를 호출할 때마다, AuthController가 결과를 반환하고 인증 프로세스를 완료합니다.

메인 애플리케이션의 스플래시 화면으로 돌아와서, auth 함수를 호출하기만 하면 됩니다:

<div class="content-ad"></div>

```js
class SplashController extends BaseController {
  @override
  void onReady() async {
    super.onReady();
    await Auth.start(Get.context);
    _goToHome();
  }

void _goToHome() {
    Get.offNamedUntil(MainRouteName.home, (route) => false);
  }
}
```

너무 좋네요! 인증 프로세스가 완료되면 홈 화면이 열릴 거예요. 완벽해요!!!

6. 제품 모듈
   이것은 데모하고 싶은 샘플 모듈뿐이에요. 거의 모든 일반 모듈이 동일한 개념을 가지고 있어요:

![이미지](/assets/img/2024-05-27-MicroFrontendsinFlutterModularizationApplication-Part2_5.png)

<div class="content-ad"></div>

이 데모에서는 홈 화면용 HomeProductWidget을 export해야 합니다. 이 모듈에 대해 이전 모듈을 알고 있다면 더 이상 언급할 것이 없습니다. 홈 화면 안에서 다음과 같이 호출하기만 하면 됩니다:

```js
import 'package:product/product.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const HomeProductWidget();
  }
}
```

여기서 앱을 완전히 모듈화했습니다.

모듈화된 프로젝트의 전체 소스 코드입니다.

<div class="content-ad"></div>

# 결론

모듈화는 앱 개발에서 모듈화, 코드 재사용성 및 확장성을 장려하는 아키텍처 패턴으로 인기를 얻고 있습니다. 물론, 비즈니스와 리소스에 따라 전통적인 아키텍처를 사용하거나 패키지로 분리할 수도 있습니다.

이 글에서 무언가를 배웠다면 좋아요를 눌러주시기 바랍니다. 만일 앱을 모듈화하는 과정에서 혼란이 있거나 문제가 발생한다면 댓글을 남겨주시고 함께 공부해보도록 하겠습니다.
