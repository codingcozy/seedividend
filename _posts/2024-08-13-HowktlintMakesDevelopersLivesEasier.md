---
title: "ktlint 개발자가 알아둬야하는 팁"
description: ""
coverImage: "/assets/img/2024-08-13-HowktlintMakesDevelopersLivesEasier_0.png"
date: 2024-08-13 11:55
ogImage: 
  url: /assets/img/2024-08-13-HowktlintMakesDevelopersLivesEasier_0.png
tag: Tech
originalTitle: "How ktlint Makes Developers Lives Easier"
link: "https://medium.com/@michalankiersztajn/how-ktlint-makes-developers-lives-easier-e96c3f31c6b9"
isUpdated: true
updatedAt: 1723864000358
---


## 더 깨끗한 코드베이스와 빠른 코드 리뷰

![이미지](/assets/img/2024-08-13-HowktlintMakesDevelopersLivesEasier_0.png)

Ktlint은 Pinterest에서 만들고 유지보수하는 내장 자동 포매터가 있는 Kotlin용 추가 린터입니다. 이미 모두가 Android Studio, IntelliJ IDEA 또는 다른 IDE에 어떤 린터를 가지고 있습니다.

## 그렇다면 이점은 무엇인가요?

<div class="content-ad"></div>

- IDE에서 잡아내지 못하는 많은 추가 규칙 확인 사항이 있습니다.
- CI 확인을 통해 규칙을 강제할 수 있습니다.
- .editorconfig를 통해 구성이 필요하지 않지만 가능합니다.
- 사용자 정의 규칙 세트로 확장할 수 있습니다.
- 대부분의 문제를 해결할 수 있는 내장 포매터가 있습니다.
- 일관성을 유지하면 코드베이스를 살펴보기가 훨씬 쉬워집니다.
- 세밀하게 린트 규칙을 활성화/비활성화할 수 있습니다.

ktlint가 얼마나 멋진지 알았으니, 이제 프로젝트에 설정해 보세요.

# 설정

자신을 위해 예제 리포지토리를 가져 오려는 분들을 위해 이 프로젝트를 복제하세요: https://github.com/AndroBrain/KtlintExample.

<div class="content-ad"></div>

## 1. 플러그인 선언

당신의 libs.versions.toml에 다음을 추가해주세요:

```js
[versions]
# 이 글을 작성하는 시점에서의 가장 최신 버전입니다
ktlint = "12.1.1" 
[plugins]
ktlint = { id = "org.jlleitschuh.gradle.ktlint", version.ref = "ktlint" }
```

ktlint의 가장 최신 버전을 여기에서 찾을 수 있습니다.

<div class="content-ad"></div>

## 2. 플러그인 적용

프로젝트의 build.gradle 내부:

```js
plugins {
      alias(libs.plugins.ktlint) apply false
      ...
}
```

모듈의 build.gradle 내부:

<div class="content-ad"></div>

```js
plugins {
    alias(libs.plugins.ktlint)
    ...
}
    
ktlint { // 키 구성 포인트를 강조하는 기능이 있지만 실제로 추가할 필요가 없음
    android = true
    ignoreFailures = false // 빌드가 실패하도록 하기 위한 것, 단순히 출력하는 것이 아님
    reporters {
        reporter(ReporterType.PLAIN)
        reporter(ReporterType.HTML)
        reporter(ReporterType.SARIF)
    }
}
```

만약 멀티 모듈 환경에서 작업하고 있고, 이것을 모든 모듈에 추가하려면, 프로젝트 build.gradle 내의 subprojects에 작성하십시오.

## 3. ktlint 실행

ktlint를 실행하는 가장 쉬운 방법은 Gradle을 열고 `Gradle 작업 실행`을 선택하는 것입니다. 


<div class="content-ad"></div>


![ktlintCheck](/assets/img/2024-08-13-HowktlintMakesDevelopersLivesEasier_1.png)

A window should pop up, and inside of it, write ktlintCheck:

![ktlintFormat](/assets/img/2024-08-13-HowktlintMakesDevelopersLivesEasier_2.png)

If you want to use the auto-formatted, change it to ktlintFormat:


<div class="content-ad"></div>


![How ktlint Makes Developers Lives Easier - Image 3](/assets/img/2024-08-13-HowktlintMakesDevelopersLivesEasier_3.png)

It will still print an error if something cannot be safely auto-formatted.

![How ktlint Makes Developers Lives Easier - Image 4](/assets/img/2024-08-13-HowktlintMakesDevelopersLivesEasier_4.png)

If you need the version of the command that can be used for your CI:


<div class="content-ad"></div>

```js
./gradlew ktlintCheck
```

## Github 저장소 예시:

읽어 주셔서 감사합니다. 새로운 것을 배우신다면, 더 많은 컨텐츠를 위해 저를 팔로우해주세요!

## 기반: