---
title: "플러터 프로젝트 dependencies와 dev_dependencies 차이점 비교"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "What are dependencies , dev_dependencies in a flutter project How they are different from each other"
link: "https://medium.com/@chetan.akarte/what-are-dependencies-dev-dependencies-in-a-flutter-project-480d4877d719"
isUpdated: true
---

# 플러터 프로젝트에서, 의존성은 pubspec.yaml 파일에 정의되며 주로 두 가지 유형으로 분류됩니다: dependencies와 dev_dependencies. 두 가지 모두 외부 패키지를 프로젝트에 포함시키는 데 사용되지만, 각각 다른 목적으로 사용되며 개발 수명 주기에서 구별된 역할을 갖습니다.

이 글은 "The Flutter Foundation: 기술 면접 및 그 이상을 위한 포괄적인 가이드"의 일환입니다! 무료로 다운로드할 수 있어요! @ https://chetanakarte.gumroad.com/l/the_flutter_foundation

![의존성 및 dev_dependencies가 플러터 프로젝트에서 어떻게 다른지에 대해 설명한 이미지](/assets/img/Whataredependencies-dev_dependenciesinaflutterprojectHowtheyaredifferentfromeachother_0.png)

Dependencies

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 목적: 의존성 섹션에서는 프로젝트가 실행되기 위해 필요한 패키지를 나열합니다. 이러한 라이브러리 및 프레임워크는 애플리케이션이 기능을 추가하기 위해 코드에 가져오고 사용하는 항목들로, HTTP 요청, 상태 관리 솔루션, 이미지 로딩 라이브러리 등이 포함됩니다.

- 런타임 요구 사항: 의존성 아래에 나열된 패키지는 앱의 컴파일 프로세스에 포함되며 컴파일 및 실행을 위해 필수입니다.

```js
dependencies:
  flutter:
    sdk: flutter
  http: ^0.13.3
  provider: ^5.0.0
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 목적: dev_dependencies 섹션은 개발 중에 사용되지만 최종 컴파일된 앱에 필요하지 않은 패키지를 위한 공간입니다. 일반적으로 이에는 테스팅, 코드 린팅, 빌드 프로세스 또는 예제 또는 문서에서만 사용되는 패키지 등이 포함됩니다.

- 개발용만: 이러한 의존성은 제품용으로 컴파일될 때 앱 빌드에 포함되지 않습니다. 이들은 단위 테스트, 통합 테스트 및 코드 분석과 같은 작업에 사용됩니다.

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter

  flutter_lints: ^2.0.0
  build_runner: ^1.10.0
```

의존성과 개발 의존성의 차이

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 프로덕션 코드 포함: 정규 의존성은 최종 앱 빌드에 포함되며 앱이 올바르게 작동하는 데 필수적입니다. 반면에 dev_dependencies는 앱의 프로덕션 빌드에 포함되지 않으며 개발 중에만 사용됩니다.

1. 사용 상황: dependencies는 앱 코드에서 직접 사용되는 기능을 제공하는 라이브러리 및 프레임워크에 사용됩니다. dev_dependencies는 앱이 실행되는 데 필수적이지는 않지만 개발 프로세스에서 도움을 주는 도구 및 라이브러리에 사용됩니다.

2. 컴파일 및 런타임: dependencies는 앱 패키지의 일부이기 때문에 앱의 컴파일 및 런타임 동작에 영향을 줍니다. dev_dependencies는 개발 환경 및 프로세스에 영향을 주지만 앱의 런타임 동작에는 영향을 주지 않습니다.

이 두 종류의 의존성 간의 차이를 이해하는 것은 Flutter 프로젝트의 패키지를 효율적으로 관리하는 데 중요합니다. 의존성을 올바르게 분류하면 제품 빌드가 최적화되어 앱이 실행되는 데 필요한 것만 포함되며 깔끔하고 효율적인 개발 환경을 유지하는 데 도움이 됩니다.
