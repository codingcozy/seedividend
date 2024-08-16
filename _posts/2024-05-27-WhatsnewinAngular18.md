---
title: "Angular 18의 새로운 기능 알아보기"
description: ""
coverImage: "/assets/img/2024-05-27-WhatsnewinAngular18_0.png"
date: 2024-05-27 18:51
ogImage: 
  url: /assets/img/2024-05-27-WhatsnewinAngular18_0.png
tag: Tech
originalTitle: "What’s new in Angular 18?"
link: "https://medium.com/@singhsharp/whats-new-in-angular-18-cead7972dce7"
isUpdated: true
---




![image](/assets/img/2024-05-27-WhatsnewinAngular18_0.png)

2024년 5월 23일에 릴리스된 Angular의 새로운 버전인 Angular 18은 개발을 간소화하고 성능을 향상시키며 보다 동적인 웹 애플리케이션을 작성할 수 있도록 개선 사항을 가져왔습니다. 주요 기능들을 살펴보고 Angular 경험을 더 높여줄 수 있는 기능들을 살펴보겠습니다.

## 독립형 컴포넌트 — 더 간단하고 재사용 가능한 구성 요소

Angular 18은 독립형 컴포넌트를 소개하여 NgModules의 제약 없이 재사용 가능한 컴포넌트를 만들 수 있게 했습니다. 이를 통해 프로젝트 구조를 간소화하고 보일러플레이트 코드를 줄이며 모듈식 접근 방식을 사용할 수 있습니다. 더 작고 독립적인 컴포넌트로 복잡한 UI를 구축하고 이를 유지 보수하고 응용 프로그램의 다른 영역 간에 공유하기 쉽게 만들어보세요.

<div class="content-ad"></div>

아래에는 기본 독립형 컴포넌트를 보여주는 코드 예제가 있습니다:

![DatePickerComponent](/assets/img/2024-05-27-WhatsnewinAngular18_1.png)

이 예제에서 DatePickerComponent는 NgModule이 필요하지 않습니다. 직접 가져와서 애플리케이션의 루트 모듈이나 다른 컴포넌트에서 사용할 수 있습니다. 이를 통해 UI를 구축하는 더 가벼운 방식과 조립 가능한 방식을 촉진합니다.

## Zone-less Change Detection — 성능 향상 (실험적)

<div class="content-ad"></div>

Angular 18은 실험적 기능으로 Zone-less 변화 감지를 소개했습니다. Zone.js에 대한 의존성을 제거함으로써, 이 방식은 특히 대규모 애플리케이션에서 성능 향상을 이끌어낼 수 있습니다. Zone.js는 특정 시나리오에서 오버헤드를 일으킬 수 있으며, Zone-less 변화 감지는 Angular 애플리케이션 내에서 변화 감지에 대한 대안적 접근 방식을 제공합니다.

## 함수를 이용한 라우트 리다이렉트 — 유연한 라우팅 제어

함수를 정의할 수 있는 기능을 통해 라우트 리다이렉트는 더 많은 기능을 얻습니다. 이를 통해 애플리케이션의 라우팅 전략 내에서 더 동적이고 조건부적인 리다이렉션 로직을 구현할 수 있습니다. 사용자 역할, 인증 상태 또는 기타 동적 조건에 따라 리다이렉트를 생성하는 상황을 상상해보세요.

![이미지](/assets/img/2024-05-27-WhatsnewinAngular18_2.png)

<div class="content-ad"></div>

## 개선된 디버깅 도구 — 문제 해결이 쉬워집니다

Angular 18은 디버깅 도구를 개선했으며 의존성 주입 계층 구조에 대한 더 나은 가시성과 DI 관련 문제에 대한 개선된 오류 메시지를 제공합니다. 복잡한 Angular 애플리케이션의 디버깅은 때로는 어려울 수 있습니다. 개선된 디버깅 도구는 의존성 주입과 관련된 문제를 더 쉽게 식별할 수 있도록 도와주며 디버깅 프로세스를 간소화합니다.

## 새롭고 업데이트된 웹 사이트

Angular.io가 Angular.dev로 대체되었습니다. 기능인 문서, 튜토리얼 및 새로운 기능을 살펴볼 수 있는 플레이그라운드와 함께 재정의된 사용자 인터페이스를 제공합니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-05-27-WhatsnewinAngular18_3.png" />

## 강조점 너머

이것들은 Angular 18의 많은 흥미로운 기능 중 일부입니다. 다른 주목할만한 개선 사항은 다음과 같습니다:

- 향상된 AOT 컴파일: 더 효율적인 AOT 컴파일 프로세스로 대규모 응용 프로그램의 빌드 시간을 단축하고 실행 시간 성능을 향상시킬 수 있습니다.
- ng-content 기본 콘텐츠: 컴포넌트 템플릿의 유연성을 높이기 위해 ng-content 태그 내에서 기본 콘텐츠를 직접 정의할 수 있습니다. 이를 통해 구성 요소의 구조를 단순화하고 콘텐츠가 어떻게 투영되는지에 대한 더 많은 제어권을 제공할 수 있습니다.
- TypeScript 5.5 지원: TypeScript의 최신 기능과 개선 사항을 활용할 수 있습니다.

<div class="content-ad"></div>

## 앵귤러 개발의 미래에 도전하세요

성능, 개발자 경험 및 모듈성에 초점을 맞춘 Angular 18은 우수한 웹 애플리케이션을 구축할 수 있도록 돕습니다. 이러한 기능에 대해 자세히 살펴보고 다음 프로젝트에서 Angular 18의 전체 잠재력을 발휘하기 위해 공식 Angular 문서를 탐험해보세요.

기억하세요, 이것은 시작에 불과합니다. Angular 18은 탐험할 다양한 기능을 제공합니다. 포괄적인 세부 정보 및 코드 예제를 위해 공식 문서를 참조해보세요.

원문: [https://cheeseblogger.com](https://cheeseblogger.com), 2024년 5월 25일에 게시됨