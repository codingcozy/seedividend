---
title: "Dart에서 Annotations 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-27-ExploringAnnotationsinDartProgramming_0.png"
date: 2024-05-27 19:20
ogImage:
  url: /assets/img/2024-05-27-ExploringAnnotationsinDartProgramming_0.png
tag: Tech
originalTitle: "Exploring Annotations in Dart Programming"
link: "https://medium.com/nonstopio/exploring-annotations-in-dart-programming-ae6a8e4b8624"
---

![Exploring Annotations in Dart Programming](/assets/img/2024-05-27-ExploringAnnotationsinDartProgramming_0.png)

Dart에서 주석은 개발자가 코드에 메타데이터를 추가할 수 있는 기능입니다. 이 메타데이터는 도구, 라이브러리 및 런타임에서 코드 생성, 유효성 검사 및 문서화와 같은 다양한 작업을 수행하는 데 사용될 수 있습니다. 이 블로그에서는 Dart에서 주석이 작동하는 방법, 사용 방법 및 사용자 정의 주석을 만드는 방법을 살펴보겠습니다.

## Annotations이란?

Dart에서 주석은 클래스, 메서드, 필드 등과 같은 다양한 프로그램 요소에 첨부할 수 있는 메타데이터 형식입니다. 컴파일러 또는 런타임에서 처리될 수 있는 추가 정보를 제공합니다.

<div class="content-ad"></div>

다트(Dart)에서 어노테이션은 상수 값이나 생성자 호출을 참조하는 '@' 기호로 표현됩니다. 이 값은 타입(type), 클래스의 인스턴스(instance) 또는 리터럴(literal)일 수 있습니다.

## 일반적인 사용 사례

- 문서화: 어노테이션은 자동으로 문서를 생성하는 데 사용될 수 있습니다.
- 코드 생성: build_runner와 같은 도구는 어노테이션을 사용하여 생성된 보일러플레이트 코드를 생성합니다.
- 유효성 검사: 어노테이션은 데이터 유효성 검사 또는 코딩 표준 적용에 도움을 줄 수 있습니다.

## 내장된 어노테이션

<div class="content-ad"></div>

Dart는 몇 가지 내장 주석을 제공합니다:

- @override: 메서드가 수퍼 클래스의 메서드를 재정의하기 위해 의도된 것을 나타냅니다.
- @deprecated: 기능을 사용하지 말아야 함을 나타내어 폐기 예정으로 표시합니다.

```js
class Parent {
  void doSomething() {
    print('Parent에서 작업 중');
  }
}

class Child extends Parent {
  @override
  void doSomething() {
    print('Child에서 작업 중');
  }
}

void main() {
  var child = Child();
  child.doSomething();  // 출력: Child에서 작업 중
}
```

## 사용자 정의 주석 만들기

<div class="content-ad"></div>

다트(Dart)에서 사용자 정의 어노테이션을 만드는 것은 간단합니다. 어노테이션을 클래스로 정의한 후에 인스턴스화하면 됩니다.

다음은 사용자 정의 어노테이션의 예시입니다:

```js
// 사용자 정의 어노테이션 클래스
class RequiresPermission {
  final String permission;
  const RequiresPermission(this.permission);
}

// 권한 상수
const String INTERNET_PERMISSION = "인터넷";
const String CAMERA_PERMISSION = "카메라";

// RequiresPermission 어노테이션을 사용한 예시 클래스
class NetworkService {
  @RequiresPermission(INTERNET_PERMISSION)
  void fetchData() {
    // 인터넷에서 데이터 가져오기
    print("인터넷에서 데이터 가져오는 중...");
  }

  void localDataProcessing() {
    // 로컬 데이터 처리
    print("로컬 데이터 처리 중...");
  }
}

class CameraService {
  @RequiresPermission(CAMERA_PERMISSION)
  void takePicture() {
    // 카메라를 사용하여 사진 찍기
    print("사진 찍는 중...");
  }

  void processImage() {
    // 이미지 처리
    print("이미지 처리 중...");
  }
}

// 예시 사용법
void main() {
  NetworkService networkService = NetworkService();
  CameraService cameraService = CameraService();

  // 메소드 호출 전 권한 확인하는 예시
  if (hasPermission(INTERNET_PERMISSION)) {
    networkService.fetchData();
  } else {
    print("인터넷 권한이 필요합니다.");
  }

  if (hasPermission(CAMERA_PERMISSION)) {
    cameraService.takePicture();
  } else {
    print("카메라 권한이 필요합니다.");
  }

  networkService.localDataProcessing();
  cameraService.processImage();
}

// 더미 권한 확인 함수
bool hasPermission(String permission) {
  // 실제 권한 확인하는 부분
  // 이 예시에서는 모든 권한이 허용된 것으로 가정합니다
  return true;
}
```

이 예시에서:

<div class="content-ad"></div>

- `RequiresPermission` 커스텀 어노테이션이 정의되었으며 이 어노테이션은 권한 문자열을 가져옵니다.
- `NetworkService` 클래스에는 `@RequiresPermission`으로 어노테이트된 메서드들이 있어서 `fetchData` 메서드가 인터넷 권한이 필요하다는 것을 나타냅니다.
- `CameraService` 클래스에는 `@RequiresPermission`으로 어노테이트된 메서드들이 있어서 `takePicture` 메서드가 카메라 권한이 필요하다는 것을 나타냅니다.
- 주요 함수는 이러한 어노테이트된 메서드들을 호출하기 전에 권한을 확인하여, 실행 전에 필요한 권한이 부여되었는지를 확인합니다.

우리의 지식을 공유하여 커뮤니티를 더 강하게 만들어가요. 최신 웹 및 모바일 기술 분야에서 업데이트된 정보를 얻기 위해 저와 제 팀을 팔로우해주세요.
