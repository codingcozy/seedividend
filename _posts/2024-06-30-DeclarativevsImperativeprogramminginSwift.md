---
title: "Swift에서 선언형 프로그래밍과 명령형 프로그래밍 비교분석"
description: ""
coverImage: "/assets/img/2024-06-30-DeclarativevsImperativeprogramminginSwift_0.png"
date: 2024-06-30 22:52
ogImage: 
  url: /assets/img/2024-06-30-DeclarativevsImperativeprogramminginSwift_0.png
tag: Tech
originalTitle: "Declarative vs Imperative programming in Swift"
link: "https://medium.com/@dev.iayush27/declarative-vs-imperative-programming-in-swift-1fc2f9a20262"
---


선언적 및 명령형 프로그래밍은 코드 작성 방식에 영향을 미치는 두 가지 패러다임입니다. 이 두 패러다임이 Swift에서 어떻게 나타나는지 비교해보겠습니다:

![이미지](/assets/img/2024-06-30-DeclarativevsImperativeprogramminginSwift_0.png)

## 선언적 프로그래밍

선언적 프로그래밍은 프로그램이 어떤 일을 수행해야 하는지 명시적으로 어떻게 달성해야 하는지를 명시하지 않고 요구 사항에 초점을 맞춥니다. Swift에서는 SwiftUI 및 Combine과 같은 프레임워크에서 선언적 프로그래밍이 종종 볼 수 있습니다.

<div class="content-ad"></div>

## 특징:

- 무엇을 해야 하는지 설명합니다: 원하는 상태를 설명하고, 프레임워크가 하부 구현을 처리합니다.
- 높은 수준의 추상화: 세부 사항을 추상화하는 고수준 구조를 사용합니다.
- 불변성: 종종 불변 데이터 구조를 활용합니다.

## Swift (SwiftUI)에서의 예시:

![이미지](/assets/img/2024-06-30-DeclarativevsImperativeprogramminginSwift_1.png)

<div class="content-ad"></div>

이 SwiftUI 예제에서는 사용자 인터페이스 및 동작을 선언하지만 UI를 렌더링하고 업데이트하는 단계를 명시적으로 지정하지 않습니다.

# 명령형 프로그래밍

명령형 프로그래밍은 원하는 결과를 달성하는 방법에 초점을 둡니다. 작업을 수행하는 데 필요한 단계와 논리를 명시적으로 작성합니다. UIKit은 Swift에서 일반적으로 사용되는 명령형 스타일의 예입니다.

## 특징:

<div class="content-ad"></div>

- 수행 방법 설명: 결과물을 얻는 방법에 대해 자세한 지침을 제공합니다.
- 하위 수준 제어: 실행 세부 사항에 대해 더 많은 제어를 제공합니다.
- 가변성: 종종 가변 상태와 변수를 사용합니다.

## Swift에서의 예시 (UIKit):

<img src="/assets/img/2024-06-30-DeclarativevsImperativeprogramminginSwift_2.png" />

UIKit 예시에서는 UI 구성 요소가 어떻게 생성되고, 뷰에 추가되며 배치되는지 명시적으로 정의합니다.

<div class="content-ad"></div>

# Summary

- Declarative: *Focuses on what to do.* Higher-level, more abstract, often immutable.
- Imperative: *Focuses on how to do it.* Lower-level, more control, often mutable.

In Swift, declarative style is becoming more prominent with frameworks like SwiftUI, which allows for more concise and readable code that is easier to reason about. However, both paradigms have their place, and understanding when to use each is key to effective Swift programming.