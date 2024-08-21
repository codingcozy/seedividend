---
title: "Angular에서 Command 패턴 소개"
description: ""
coverImage: "/assets/img/2024-06-23-IntroductiontoCommandPatterninAngular_0.png"
date: 2024-06-23 14:12
ogImage:
  url: /assets/img/2024-06-23-IntroductiontoCommandPatterninAngular_0.png
tag: Tech
originalTitle: "Introduction to Command Pattern in Angular"
link: "https://medium.com/a-layman/introduction-of-command-pattern-in-angular-bdef4038ac48"
isUpdated: true
---

<img src="/assets/img/2024-06-23-IntroductiontoCommandPatterninAngular_0.png" />

# 소개

작업을 위임하는 몇 가지 방법이 있습니다. 이 상황에서는 드롭다운 옵션을 선택했을 때 경로 시각화의 표시 모드가 변경됩니다.

직접적인 해결책은 컨트롤러 패널에서 SVG 경로로 작업을 위임하기 위해 옵저버 패턴을 사용하는 것입니다.

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

그러나 이 시나리오에 관찰자 패턴을 적용하는 데는 여전히 일부 단점이 있습니다. 이 글에서는 명령 패턴의 소개와 왜 더 나은 해결책이라고 생각했는지를 공유하고 싶습니다.

## 안건

이 글에는 몇 가지 주제가 있습니다.

- 토론: 관찰자 패턴 vs 명령 패턴
- 구현: 명령 패턴으로 제어 패널 리팩터링
- RxJS를 사용한 실행 취소 및 재설정 구현
- 데모

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

## 이 시리즈에 대해

이 시리즈는 프론트엔드 프레임워크와 디자인 패턴을 어떻게 사용하는지 배우는 데 목표를 두고 있습니다.

- 기사 1. React에서 Angular로: 전략 패턴 및 동적 렌더링 구현
- 기사 2. Angular에서 빌더 패턴과 책임 연쇄 패턴을 사용하여 객체 생성 프로세스를 리팩터링
- 기사 3. Observer 패턴을 사용하여 다른 조상 React 컴포넌트 간의 통신 구현
- 기사 4. Angular에서 Command 패턴 소개 (이 기사)

# 토론: Observer 패턴 vs Command 패턴

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

## 옵저버 패턴

옵저버 패턴의 주요 역할을 보여주는 다음 다이어그램입니다.

![Observer Pattern Diagram](/assets/img/2024-06-23-IntroductiontoCommandPatterninAngular_1.png)

옵저버 패턴은 옵저버와 서브젝트로 구성되어 있습니다. 우리의 시나리오에 이 패턴을 어떻게 매핑할 수 있는지 쉽게 상상해볼 수 있습니다.

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

- 드롭다운 선택이 변경되면 Subject가 Observer에게 알림을 보냅니다.
- Subject에는 이벤트 유형과 필요한 매개변수가 포함됩니다.
- 그런 다음 Observer는 이벤트에 따라 해당 작업을 수행할 수 있습니다.

그러나 이 시나리오에이 패턴을 적용할 때 일부 단점이 있습니다.

- 컨트롤 패널이 커질수록 SVG 경로 구성 요소가 커집니다 (해당 작업을 수행하기 전에 Subject를 분석해야 하기 때문)
- 되돌리기 기능을 구현하는 것이 직접적이지 않습니다 (Observer 패턴이 자연스럽게 이벤트를 캡슐화하고 저장하지 않기 때문)

![이미지](/assets/img/2024-06-23-IntroductiontoCommandPatterninAngular_2.png)

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

## Command Pattern

Command 패턴의 주요 역할을 보여주는 다음 다이어그램입니다.

![Command Pattern Diagram](/assets/img/2024-06-23-IntroductiontoCommandPatterninAngular_3.png)

Command 패턴의 Subject는 Observer에 이벤트와 분리된 매개변수를 보내는 대신, 매개변수를 하나의 객체로 캡슐화하고 Receiver를 직접 조작하기 위해 실행합니다.

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

- 해당 명령은 작업에 필요한 매개변수와 명령 유형을 분석하는 논리를 캡슐화합니다. 드롭다운 선택이 변경되면 인보커가 생성된 명령을 실행합니다.
- 수신자(SVG 경로의 구성 요소)는 명령에 따라 해당 작업을 수행합니다.

여러 가지 이점이 있습니다.

- 제어 패널이 커질 때 SVG 경로의 구성 요소가 커지지 않습니다 (분석 논리가 명령 객체로 이동되기 때문)
- Undo 기능에 대해 간단합니다 (명령 패턴이 명령을 캡슐화하고 저장하기 때문)

![이미지](/assets/img/2024-06-23-IntroductiontoCommandPatterninAngular_4.png)

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

# 구현: 명령 패턴을 사용하여 제어 패널 다시 구성하기

이 구현은 이 기사의 예시 D3.js 프로젝트 (데모)를 기반으로 합니다. 이전에는 범례, 노드 및 엣지가 단일 구성 요소에 있었기 때문에 서로 다른 구성 요소 간의 작업을 위임할 필요가 없었습니다.

이제 제어 패널 항목들을 독립적인 구성 요소 (호출자)로 이동하고 작업을 SVG 경로 구성 요소 (수신기)로 위임하는 명령 패턴을 구현하고자 합니다.

## 준비하기

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

- 필요한 패키지 설치하기

```js
npm install @ng-select/ng-select@^9.1.0
npm install lodash@^4.17.21
```

- 필요한 컴포넌트 및 서비스 생성하기

```js
ng g c topology
ng g c topology/topology-controller/topology-controller-assistant
ng g s topology/topology-controller/topology-controller-assistant
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

- 필요한 모델을 생성하세요

- Invoker, Receiver, 그리고 Command에 대한 필요한 인터페이스와 클래스를 생성하세요

## Invoker 구현: 드롭다운 컴포넌트 업데이트

이 경우에 Invoker는 ng-select 컴포넌트입니다.

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

- topology-controller-assistant.component.html을 업데이트하십시오.

구현 세부 정보는 공개하지 않지만, Invoker가 어떻게 작동하는지에만 집중하세요.

- topology-controller-assistant.service.ts를 업데이트하십시오.
  — 서비스는 드롭다운 컴포넌트에 옵션을 제공합니다 (라인 5 ~ 10)

- topology-controller-assistant.component.ts를 업데이트하십시오.
- 이 컴포넌트는 TopologyCommandInvoker 인터페이스를 구현해야 합니다.
- 초기화할 때, 이 컴포넌트는 리소스를 검색할 것입니다 (라인 42)
- Invoker는 호출할 때 커맨드를 스택에 저장할 것입니다 (라인 88)

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

## 수신기 구현: SVG 경로 구성 요소 업데이트

- topology.component.ts 파일을 업데이트하세요.
- 이 구성 요소의 자세한 코드는 이 기사를 참조해주세요.
- 이 구성 요소는 TopologyCommandReceiver 인터페이스를 구현해야합니다.

## 클라이언트 구현: 루트 구성 요소 업데이트

클라이언트는 Invokers와 Receivers 간의 다리 역할을 하며 ViewChild를 사용합니다.

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

- app.component.html 파일을 업데이트하세요.
- app.component.ts 파일을 업데이트하세요.
- ViewChild를 사용하여 Invokers 및 Receivers를 검색하세요 (11 ~ 12번 라인).
- commandStack 및 makeCommand를 Invokers와 Receivers에 위임하세요 (17 ~ 18번 라인).

# RxJS를 이용한 실행 취소 및 재설정의 구현

마지막 섹션에서 명령을 호출할 때 이미 명령을 스택에 푸시했습니다.

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

`undo` 기능을 구현할 때는 최신 Command를 제거하고 이전 Command를 되돌리는 Command를 실행하면 된다. `reset` 기능을 구현할 때는 스택을 지우고 이전 명령을 모두 되돌리면 된다.

![CommandPattern](/assets/img/2024-06-23-IntroductiontoCommandPatterninAngular_5.png)

## Undo 버튼 구현: 루트 컴포넌트 업데이트

- app.component.html 파일 업데이트
- undo 및 reset을 위한 새로운 버튼 추가 (라인 15 ~ 18)
- undoConfiguration$ 및 resetConfiguration$를 input() 매개변수로 전달 (라인 8 ~ 9)

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

- app.component.ts 파일을 업데이트해주세요

## 옵저버 구현: 드롭다운 컴포넌트 업데이트하기

- topology-controller-assistant.component.ts 파일을 업데이트해주세요
- undoConfiguration$ 및 resetConfiguration$를 구독해주세요 (19 ~ 20번 라인)

# 데모

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

- 리팩터링 전

- 리팩터링 후

# 참고

- Callback/Command vs EventListener/Observer Pattern

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

# 개요

끝까지 참아주셔서 감사합니다. 저는 션입니다. 소프트웨어 엔지니어로 일하고 있어요.

이 글은 제 노트입니다. 실수가 있으면 자유롭게 조언해주세요. 피드백을 기다리고 있겠습니다.

- 구독하기

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

- 기사를 위한 Facebook 페이지

- 데일리 러닝 웹사이트

- 데일리 러닝 라인 봇

![image](/assets/img/2024-06-23-IntroductiontoCommandPatterninAngular_6.png)

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

# 관련 주제

Knout.js 및 ReactJS에서 양방향 바인딩을 사용하는 방법

SignalR을 활용하여 채팅방 애플리케이션 만드는 법을 배워보세요

'Effective SQL'에 대한 제 생각:

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

IT 및 네트워크:
