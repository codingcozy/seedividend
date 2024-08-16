---
title: "플러터에서 코드를 작성하는 간단한 방법"
description: ""
coverImage: "/assets/img/2024-05-20-ASimplewaytoorganizeyourcodeinFlutter_0.png"
date: 2024-05-20 23:16
ogImage: 
  url: /assets/img/2024-05-20-ASimplewaytoorganizeyourcodeinFlutter_0.png
tag: Tech
originalTitle: "A Simple way to organize your code in Flutter"
link: "https://medium.com/@kanellopoulos.leo/a-simple-way-to-organize-your-code-in-flutter-e175e7004fb5"
isUpdated: true
---




<img src="/assets/img/2024-05-20-ASimplewaytoorganizeyourcodeinFlutter_0.png" />

플러터를 개발 앱에 매일 사용하는 과정에서 앞으로도 문제가 되지 않도록 코드를 체계적으로 구성할 방법을 찾고 있었습니다. 여러 프로젝트를 유지하는 것은 언제나 쉽지 않은 일이며, 코드가 깨끗할수록 쉬워집니다. 그래서 이전에 네이티브 안드로이드, Apache Flex, 심지어 PHP와 같은 기술을 경험한 바탕으로 체계적인 프로젝트 구조를 만들었습니다. 여러분에게도 도움이 되었으면 합니다.

# 앱의 구조

저는 모든 프로젝트에서 사용하는 이 구조를 사용하여 프로젝트 간의 이동이 쉽고 물건의 위치를 파악하기 위해 더 이상 찾아다니지 않아도 됩니다. 저희 팀은 이 구조에 익숙해져 있어, 제작량을 최소화하여 며칠 안에 앱을 개발할 수 있는 수준까지 줄일 수 있었습니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-05-20-ASimplewaytoorganizeyourcodeinFlutter_1.png)

자, 좀 더 구조에 대해 이야기해 봐요:

화면: 이 폴더에는 일반적으로 앱의 모든 화면이 들어갑니다. 스크린샷에서 볼 수 있듯이, 각 화면에는 각각의 폴더가 있습니다. 이 구체적인 예에서 이 앱에는 하단 내비게이션 바를 사용하는 홈 화면과 4개의 주요 화면(war, news, major_orders, game)이 있습니다. 이 부분에 대해 나중에 더 자세히 설명하겠습니다.

위젯: 이 폴더에는 일반적으로 앱의 재사용 가능한 위젯이 들어갑니다. 이 폴더에는 custom_scaffold와 "리사이클러" 또는 리스트 아이템 위젯과 같은 파일을 저장합니다.

<div class="content-ad"></div>

서비스: 나는 내가 만드는 앱에서 사용하는 모든 외부 서비스를 가지고 있는 DIO 폴더로 알려진 것이다. 여기에는 보통 앱에 데이터를 공급하는 REST API에 연결하는 클래스들이 포함되어 있습니다.

모델: 서비스 폴더를 따라서 항상 나는 모델(객체 클래스)들을 Models라는 별도의 폴더에 유지합니다. 과거에 Flex 또는 AIR를 사용한 사람들을 위해, 이곳은 예전에 내 ValueObjects 폴더였습니다. 사전 용어에 대한 모델 예시:

```js
class TermVO {
  int? id;
  String? title;
  String? description;
  String? language;

  TermVO({this.id, this.title, this.description, this.language});

  TermVO.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    title = json['title'];
    description = json['description'];
    language = json['language'];
  }
}
```

유틸리티: 이 폴더는 외부 API나 로컬 라이브러리를 위한 "도우미" 파일들의 집입니다. 여기에는 Firebase 헬퍼 클래스, OneSignal 헬퍼 클래스 또는 우리 프로젝트에서 문자열을 포맷하는 함수를 포함하는 내 StringHelper 클래스와 같은 것들이 들어갈 것입니다.

<div class="content-ad"></div>


Styles: 테마와 스타일을 포함하므로 직관적입니다.

Commons.dart: 이 파일은 앱에서 사용되는 모든 것을 주요 "import"로 사용합니다. 이렇게 하면 파일에서 하나의 파일만 가져오면 빠른 리팩터링, 변경 또는 라이브러리 추가에도 도움이 됩니다.

![이미지](/assets/img/2024-05-20-ASimplewaytoorganizeyourcodeinFlutter_2.png)

이 구조를 사용하면 큰 프로젝트조차도 상당히 조직화하여 귀하의 삶을 훨씬 쉽게 만들 수 있습니다.

<div class="content-ad"></div>

# UI와 코드의 분리

우리 모두 알다시피, Flutter는 의견이 강제되지 않아서 코드를 자유롭게 작성할 수 있습니다. Flutter에서 부족하다고 생각했던 한 가지는 Native Android(xml + kt 파일)나 심지어 사랑하는 과거 기술인 Apache Flex(MXML으로 UI를 작성하고 코드는 AS로 분리)처럼 코드와 UI를 분리하는 것이었습니다. 개발자 친구와 함께 이를 논의한 결과, Roipeker님의 제안을 토대로 이 아이디어를 실현했습니다. 이것이 바로 우리가 여기에 있는 이유입니다(Roipeker님 감사합니다).
이 아이디어의 핵심은 각 화면이 UI를 포함하는 한 개의 파일과 화면의 모든 기능, 변수, 작동 코드를 포함하는 다른 파일로 분리된다는 것입니다.
REST API에서 뉴스 목록이 포함된 화면의 예시를 살펴보겠습니다.

![News screen](/assets/img/2024-05-20-ASimplewaytoorganizeyourcodeinFlutter_3.png)

"뉴스" 화면은 UI를 포함하는 *_screen.dart 파일과 기능을 포함하는 *_controller.dart 파일로 나뉘어 있음을 확인할 수 있습니다. 이를 달성하기 위해, screen.dart에서 "part 'news_controller.dart'"를 사용하고, controller.dart 파일에서는 "part of 'news_screen.dart'"를 사용합니다. 이렇게 두 파일이 하나처럼 작동합니다.

<div class="content-ad"></div>


![image1](/assets/img/2024-05-20-ASimplewaytoorganizeyourcodeinFlutter_4.png)

You can see that the first file is simple and only contains the UI part.

![image2](/assets/img/2024-05-20-ASimplewaytoorganizeyourcodeinFlutter_5.png)

This is the controller file which is used to load the news and sort them. As you can see, the newsList is loaded with content in the `controller.dart` and used in the `screen.dart`.


<div class="content-ad"></div>

이것은 간단한 예제이지만 코드를 정리하고 깨끗하게 유지하는 두 파일을 가지는 가치를 볼 수 있습니다.

더 나아가서 개발 시간을 최소화하는 것을 목표로 이를 더 발전시키기 위해 Android Studios에서 File 및 Code 템플릿으로 통합했습니다. 이렇게 하면 각 새로운 화면을 빠르게 만들 수 있습니다.

# 2개 파일의 화면 구조에 대한 템플릿 만들기

이를 템플릿에 추가하려면 다음 단계를 따라야 합니다:

<div class="content-ad"></div>


![screenshot](/assets/img/2024-05-20-ASimplewaytoorganizeyourcodeinFlutter_6.png)

- 파일 — 설정 — 코드 스타일 — 파일 및 코드 템플릿
- 새 항목 추가
- 아무 이름으로 지정 (저는 뷰 상태를 이름으로 사용했습니다)

![screenshot](/assets/img/2024-05-20-ASimplewaytoorganizeyourcodeinFlutter_7.png)

- 파일 이름은 $'NAME'_screen이어야 합니다
- 확장자는 dart여야 합니다
- 메인 파일 (screen.dart)에 대한 다음 코드 사용


<div class="content-ad"></div>


#set($class = ${NAME})
#set($class_start = $class.substring(0,1).toUpperCase())
#set($class_rest = $class.substring(1).toLowerCase())
#set($class = $class_start + $class_rest)

part '${NAME}_controller.dart';

class ${class}Screen extends StatefulWidget {
  const ${class}Screen({Key? key}) : super(key: key);

  @override
  createState() => _${class}Screen();
}

class _${class}Screen extends ${class}Controller {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}


7. 메인 파일 아래에 다음 코드와 함께 자식 템플릿 파일을 만듭니다.


#set($class = ${NAME})
#set($class_start = $class.substring(0,1).toUpperCase())
#set($class_rest = $class.substring(1).toLowerCase())
#set($class = $class_start + $class_rest)

part of '${NAME}_screen.dart';

abstract class ${class}Controller extends State<${class}Screen> {

  @override
  void initState() {
    // TODO: initState 구현
    super.initState();
  }

  @override
  void dispose() {
    // TODO: dispose 구현
    super.dispose();
  }
}


8. 자식 템플릿 파일을 '$'NAME'_controller.dart'로 명명하고 확장자는 이전과 동일한 dart로 설정합니다.
  

<div class="content-ad"></div>


![이미지](/assets/img/2024-05-20-ASimplewaytoorganizeyourcodeinFlutter_8.png)

9. 적용 및 확인을 눌러 완료합니다

이후에는 폴더로 이동하여 새로운 테스트 폴더(screens-test)를 생성한 다음 해당 폴더에서 마우스 오른쪽 버튼을 클릭하여 — 새로 만들기 — View State — 이름을 지정하세요.
그러면 name_screen 및 name_controller 두 파일이 생성됩니다.

제가 앞서 말했듯이, 이것은 제 팀이 코드를 구성하는 방식일 뿐이며 다양한 방법이 있지만, 2019년 첫 번째 Flutter 프로젝트의 엉망으로부터 잘 구성되고 유지 관리가 빠른 방식으로 나아가게 도와준 것을 잠시 공유하고 싶었습니다.


<div class="content-ad"></div>

이 메서드를 좋아하신다면, 귀하의 프로젝트에 통합하고 플러터 개발자 동료들과 공유하며 박수 치는 것을 잊지 마세요.